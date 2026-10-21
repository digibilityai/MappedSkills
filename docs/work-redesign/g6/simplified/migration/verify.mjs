#!/usr/bin/env node
// G6 simplified (from G6-S2B, logic unchanged) — strictly read-only verification of Contentful `staging` against `master`. Prepared for owner review; NOT EXECUTED.
//
//   CONTENTFUL_MANAGEMENT_TOKEN=<from verify.sh> node verify.mjs --space <id> --prod-space <id> --out <new dir>
//
// Read-only by construction: the only HTTP method in this file is GET, enforced again at the single request point,
// which also restricts paths to this space and to a fixed list of read endpoints. It imports only the pure
// functions of the simplified migration (same functions as S2-R1) (no client, no write method). It never prints or stores the token, and
// the report holds IDs, slugs, statuses, counts and schema field names only, never entry content.

import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import {
  CONTENT_TYPE_ID, LINKED_CONTENT_TYPES, LOCALE, assertId, diffFields, inspectContentType, makeRedactor, scanEntries, slugPreflight,
} from './migration.mjs';

export const CMA_BASE = 'https://api.contentful.com';
export const LEGACY_ENTRIES = Object.freeze({
  '4DpPjLCWdakD6tBmZNMnko': 'portfolio/seo-ameba-software',
  '4zQL4P8SR2xogxHN4qFfUl': 'seo-for-home-decor-brand',
  '6Ycb7aYvXrslOXKchQnqmi': 'google-ads-for-online-courses',
});

export class VerifyGuardError extends Error {}
export class VerifyApiError extends Error {}

/** The one request function. GET only; this space only; read endpoints only. */
export function createReadOnlyClient({ token, spaceId, fetchImpl = globalThis.fetch, sleep = (ms) => new Promise((r) => setTimeout(r, ms)) }) {
  if (!token) throw new VerifyGuardError('CONTENTFUL_MANAGEMENT_TOKEN is not set (run verify.sh, which prompts for it).');
  assertId('space ID', spaceId);
  const redact = makeRedactor(token);
  const base = `/spaces/${encodeURIComponent(spaceId)}`;
  const allowed = [
    new RegExp(`^${base}$`),
    new RegExp(`^${base}/environments$`),
    new RegExp(`^${base}/environment_aliases$`),
    new RegExp(`^${base}/environments/(master|staging)/content_types/[A-Za-z0-9]+$`),
    new RegExp(`^${base}/environments/(master|staging)/entries\\?content_type=[A-Za-z0-9]+&limit=100&skip=\\d+&order=sys\\.createdAt$`),
  ];
  const requests = [];
  async function get(path, { allow404 = false } = {}) {
    if (!allowed.some((rx) => rx.test(path))) throw new VerifyGuardError(`Refused request outside the read-only allow-list: GET ${path}`);
    requests.push(`GET ${path}`);
    for (let attempt = 0; ; attempt++) {
      let res;
      try { res = await fetchImpl(CMA_BASE + path, { method: 'GET', headers: { Authorization: `Bearer ${token}` } }); }
      catch (e) { throw new VerifyApiError(redact(`GET ${path}: network error: ${e?.message ?? e}`)); }
      if (res.status === 429 && attempt < 5) { await sleep(2000); continue; }
      if (allow404 && res.status === 404) return null;
      const text = await res.text();
      let json = null; try { json = text ? JSON.parse(text) : null; } catch { /* non-JSON */ }
      if (!res.ok) throw new VerifyApiError(redact(`GET ${path}: HTTP ${res.status} ${json?.sys?.id ?? ''} ${json?.message ?? ''}`.trim()));
      return json;
    }
  }
  const env = (e) => `${base}/environments/${e}`;
  return {
    requests, redact,
    getSpace: () => get(base),
    listEnvironments: () => get(`${base}/environments`),
    listAliases: () => get(`${base}/environment_aliases`, { allow404: true }),
    getContentType: (e, id) => get(`${env(e)}/content_types/${encodeURIComponent(id)}`, { allow404: true }),
    async listEntries(e, contentType) {
      const items = [];
      for (let skip = 0; ; skip += 100) {
        const page = await get(`${env(e)}/entries?content_type=${encodeURIComponent(contentType)}&limit=100&skip=${skip}&order=sys.createdAt`);
        items.push(...page.items);
        if (items.length >= page.total || page.items.length === 0) return items;
      }
    },
  };
}

const mask = (id) => (id.length > 6 ? `${id.slice(0, 3)}…${id.slice(-3)}` : '***');

/** Pure: runs every check and returns { checks, facts }. */
export async function verify(client, { spaceId, prodSpaceId }) {
  const checks = [];
  const add = (id, ok, text, level = ok ? 'PASS' : 'FAIL') => checks.push({ id, level, text });

  // 1. space
  const space = await client.getSpace();
  add('V1a', space?.sys?.id === spaceId, `Space ${mask(spaceId)} resolved as "${space?.name}".`);
  add('V1b', spaceId === prodSpaceId, spaceId === prodSpaceId
    ? 'Space ID equals the production space ID the owner supplied from the production configuration.'
    : 'Space ID differs from the production space ID the owner supplied. STOP.');

  // 2. environments and aliases
  const envs = (await client.listEnvironments()).items ?? [];
  const byId = new Map(envs.map((e) => [e.sys.id, e]));
  const status = (e) => e?.sys?.status?.sys?.id;
  add('V2a', status(byId.get('master')) === 'ready', `master: ${byId.has('master') ? status(byId.get('master')) : 'NOT FOUND'}.`);
  add('V2b', status(byId.get('staging')) === 'ready', `staging: ${byId.has('staging') ? status(byId.get('staging')) : 'NOT FOUND'}.`);
  const aliases = await client.listAliases();
  const aliasRows = (aliases?.items ?? []).map((a) => ({ alias: a.sys.id, target: a.environment?.sys?.id }));
  const stagingAliased = aliasRows.some((a) => a.alias === 'staging' || a.target === 'staging') || (byId.get('staging')?.sys?.aliases ?? []).length > 0;
  add('V2c', !stagingAliased && byId.get('staging')?.sys?.id === 'staging',
    `staging is a real environment, not an alias and not an alias target. Aliases in space: ${aliases === null ? 'feature not enabled' : aliasRows.length ? aliasRows.map((a) => `${a.alias}→${a.target}`).join(', ') : 'none'}.`);
  add('V2d', true, `Environments present: ${[...byId.keys()].sort().join(', ')}.`, 'INFO');

  // 3. content model
  const [mct, sct] = [await client.getContentType('master', CONTENT_TYPE_ID), await client.getContentType('staging', CONTENT_TYPE_ID)];
  add('V3a', Boolean(mct) && Boolean(sct), `caseStudies exists in master: ${Boolean(mct)}; in staging: ${Boolean(sct)}.`);
  if (mct && sct) {
    const changed = diffFields(mct.fields, sct.fields).filter((d) => d.change !== 'unchanged');
    add('V3b', changed.length === 0, changed.length ? `Model differs master vs staging in: ${changed.map((d) => `${d.id} (${d.change})`).join(', ')}.`
      : `caseStudies fields identical in master and staging (${sct.fields.length} fields).`);
    add('V3c', mct.displayField === sct.displayField && mct.name === sct.name, 'caseStudies name and displayField match.');
    const si = inspectContentType(sct); const mi = inspectContentType(mct);
    // `partial` is acceptable only when no new field exists yet and the changes already in place are settings of
    // EXISTING fields (a link already optional, a slug validation already present). Those are kept as found by plan,
    // apply and rollback alike. Any new field present, any drift or any draft still fails.
    const ids = (i, status) => i.changes.filter((c) => c.status === status).map((c) => c.id);
    const preExisting = ids(si, 'applied');
    const onlyExistingSettings = preExisting.every((id) => !id.startsWith('add:'));
    add('V3d', (si.state === 'pristine' || (si.state === 'partial' && onlyExistingSettings)) && !si.draftPending && si.problems.length === 0,
      `staging schema state "${si.state}"${si.draftPending ? ', UNACTIVATED DRAFT' : ''}${si.problems.length ? `; problems: ${si.problems.join(' | ')}` : ''}` +
      `${preExisting.length ? `; already at target before migration: ${preExisting.join(', ')}${onlyExistingSettings ? ' (existing-field settings only; kept as found)' : ' (includes a new field: a migration has run here)'}` : ''}. ` +
      '(Expected: "pristine", or "partial" with existing-field settings only.)');
    add('V3h', true, `Change status — staging: applied [${ids(si, 'applied').join(', ') || 'none'}], pending [${ids(si, 'pending').join(', ') || 'none'}], ` +
      `drift [${ids(si, 'drift').join(', ') || 'none'}]; master: applied [${ids(mi, 'applied').join(', ') || 'none'}].`, 'INFO');
    add('V3e', mi.state === si.state, `master schema state "${mi.state}" (staging "${si.state}").`);
    add('V3f', !mi.draftPending, `master has no unactivated draft: ${!mi.draftPending}.`);
  }
  const missing = [];
  for (const id of LINKED_CONTENT_TYPES) if (!(await client.getContentType('staging', id))) missing.push(id);
  add('V3g', missing.length === 0, missing.length ? `Linked content types missing in staging: ${missing.join(', ')}.` : 'All six linked content types exist in staging.');

  // 4. entries
  const mEntries = scanEntries(await client.listEntries('master', CONTENT_TYPE_ID));
  const sEntries = scanEntries(await client.listEntries('staging', CONTENT_TYPE_ID));
  add('V4a', mEntries.total === sEntries.total, `caseStudies entries: master ${mEntries.total}, staging ${sEntries.total}.`);
  const mRow = new Map(mEntries.rows.map((r) => [r.id, r])); const sRow = new Map(sEntries.rows.map((r) => [r.id, r]));
  const diffs = [...new Set([...mRow.keys(), ...sRow.keys()])].filter((id) => {
    const a = mRow.get(id); const b = sRow.get(id);
    return !a || !b || a.slug !== b.slug || a.status !== b.status;
  });
  add('V4b', diffs.length === 0, diffs.length ? `Entries that differ (ID, slug or status) master vs staging: ${diffs.join(', ')}.` : 'Entry IDs, slugs and statuses identical in master and staging.');
  for (const [id, slug] of Object.entries(LEGACY_ENTRIES)) {
    const r = sRow.get(id);
    add(`V4-${id.slice(0, 5)}`, Boolean(r) && r.slug === slug && r.status !== 'archived',
      r ? `${id}: staging slug "${r.slug}" (${r.status}); expected "${slug}".` : `${id}: NOT FOUND in staging.`);
  }

  // 5/6. slug safety on staging (the same gate as migration plan)
  const blockers = slugPreflight(sEntries);
  add('V6a', blockers.length === 0, blockers.length ? `${blockers.length} slug blocker(s) in staging (see list).` : 'No route collisions and no invalid slugs in staging.');
  const facts = {
    space: { id: mask(spaceId), name: space?.name }, aliases: aliasRows, entryCounts: { master: mEntries.total, staging: sEntries.total },
    entryStatuses: Object.fromEntries(['draft', 'published', 'changed', 'archived'].map((s) => [s, sEntries.rows.filter((r) => r.status === s).length])),
    blockers, missingSlugs: sEntries.missingSlugs.map((m) => m.id), requests: client.requests.length, locale: LOCALE,
  };
  return { checks, facts };
}

export function reportMarkdown({ checks, facts }, now) {
  const failed = checks.filter((c) => c.level === 'FAIL');
  const lines = [
    '# G6 simplified read-only verification report (redacted)', '',
    `Generated: ${now}. Mode: read-only (GET only; ${facts.requests} requests). Contains no credentials and no entry content.`, '',
    `**Result: ${failed.length ? `FAIL — ${failed.length} check(s) failed. STOP; do not run apply.` : 'PASS — all checks passed.'}**`, '',
    '| Check | Result | Detail |', '|---|---|---|',
    ...checks.map((c) => `| ${c.id} | ${c.level} | ${c.text.replace(/\|/g, '\\|')} |`), '',
    `Entry statuses in staging: ${JSON.stringify(facts.entryStatuses)}. Entries without a slug: ${facts.missingSlugs.length ? facts.missingSlugs.join(', ') : 'none'}.`, '',
  ];
  if (facts.blockers.length) lines.push('## Slug blockers (staging)', '', ...facts.blockers.map((b) => `- ${b}`), '');
  return `${lines.join('\n')}\n`;
}

async function main() {
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const redact = makeRedactor(token);
  const log = (s) => process.stdout.write(`${redact(s)}\n`);
  try {
    const a = process.argv.slice(2); const o = {};
    for (let i = 0; i < a.length; i += 2) {
      const k = a[i]?.startsWith('--') ? a[i].slice(2) : null;
      if (!['space', 'prod-space', 'out'].includes(k) || a[i + 1] === undefined) throw new VerifyGuardError(`Unknown or incomplete argument "${a[i]}". Tokens are never accepted as arguments.`);
      o[k] = a[i + 1];
    }
    if (!o.space || !o['prod-space'] || !o.out) throw new VerifyGuardError('Required: --space, --prod-space, --out <new directory>.');
    if (a.some((x) => /CFPAT-|token/i.test(x))) throw new VerifyGuardError('Arguments look like they contain a token.');
    const out = resolve(o.out);
    await mkdir(out, { recursive: true });
    if ((await readdir(out)).length) throw new VerifyGuardError(`--out ${out} is not empty. Use a new directory.`);
    const client = createReadOnlyClient({ token, spaceId: o.space });
    const result = await verify(client, { spaceId: o.space, prodSpaceId: o['prod-space'] });
    const md = redact(reportMarkdown(result, new Date().toISOString()));
    await writeFile(join(out, 'verification-report.md'), md, { flag: 'wx' });
    log(md);
    process.exitCode = result.checks.some((c) => c.level === 'FAIL') ? 2 : 0;
  } catch (e) {
    log(`${e instanceof VerifyGuardError ? 'REFUSED' : e instanceof VerifyApiError ? 'API ERROR' : 'ERROR'}: ${e.message}`);
    process.exitCode = e instanceof VerifyGuardError ? 1 : 3;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
