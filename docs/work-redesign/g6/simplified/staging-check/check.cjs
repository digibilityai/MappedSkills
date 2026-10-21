#!/usr/bin/env node
// G6 simplified — staging integration check. READ-ONLY, owner-run. Prepared 2026-10-21.
//
//   bash check.sh <SPACE_ID> <NEW_OUT_DIR> [<run-03 before-entries-report.json>]
//
// Sends GraphQL queries to the Contentful DELIVERY API for environment `staging` only (the Delivery API cannot
// write). Every request goes through one guarded fetch that accepts only POST to that single endpoint; anything else
// (master, another space, the Management or Preview API) is refused before it leaves the machine. It runs the
// application's own query, mapper and eligibility code (lib/contentful/*, lib/case-study-eligibility.ts) with
// CONTENTFUL_ENVIRONMENT=staging and CONTENTFUL_CASE_STUDY_NEW_FIELDS=1 in this process only.
// The token is read only from CONTENTFUL_ACCESS_TOKEN (set by check.sh from a hidden prompt) and is never printed or
// stored. The report holds entry IDs, slugs, types, versions, counts and yes/no flags: no entry text.

const path = require('node:path');
const fs = require('node:fs');

const REPO = path.resolve(__dirname, '../../../../..');
const GQL = 'https://graphql.contentful.com/content/v1/spaces/';
const LEGACY = {
  '4DpPjLCWdakD6tBmZNMnko': 'portfolio/seo-ameba-software',
  '4zQL4P8SR2xogxHN4qFfUl': 'seo-for-home-decor-brand',
  '6Ycb7aYvXrslOXKchQnqmi': 'google-ads-for-online-courses',
};
// Contract: Text → String, Rich Text → object with `json`, Boolean → Boolean.
const EXPECTED = {
  summary: 'scalar:String', problem: 'richtext', whatWeDid: 'richtext', impact: 'richtext',
  evidenceNote: 'scalar:String', showTestimonial: 'scalar:Boolean',
};

class GuardError extends Error {}

function guardedFetch({ spaceId, realFetch, requests }) {
  if (!/^[A-Za-z0-9]{1,64}$/.test(spaceId || '')) throw new GuardError('Invalid or missing space ID.');
  const allowed = `${GQL}${spaceId}/environments/staging`;
  return async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input?.url;
    const method = (init.method || 'GET').toUpperCase();
    if (url !== allowed || method !== 'POST') throw new GuardError(`Refused ${method} ${url}: only POST ${allowed} is allowed.`);
    requests.push('POST environments/staging');
    return realFetch(url, { method: 'POST', headers: init.headers, body: init.body });
  };
}

async function gql(fetchImpl, spaceId, token, query) {
  const res = await fetchImpl(`${GQL}${spaceId}/environments/staging`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json().catch(() => null);
  return { status: res.status, data: json?.data ?? null, errors: (json?.errors ?? []).map((e) => e.message) };
}

const INTROSPECT = `query { __type(name: "CaseStudies") { fields { name type { name kind ofType { name kind } fields { name } } } } }`;
const RAW = `query { caseStudiesCollection(limit: 100, preview: false) { total items { sys { id publishedVersion publishedAt } slug } } }`;

function classify(t) {
  const base = t.kind === 'NON_NULL' ? t.ofType : t;
  if (base?.kind === 'SCALAR') return `scalar:${base.name}`;
  if (base?.kind === 'OBJECT' && (t.fields ?? []).some((f) => f.name === 'json')) return 'richtext';
  return `${base?.kind}:${base?.name}`;
}

/** Runs every check. `fetchImpl` is the guarded fetch; `draftIds` are optional IDs known to be drafts (run 03). */
async function runChecks({ spaceId, token, fetchImpl, draftIds = [], loadApp }) {
  const checks = [];
  const add = (id, ok, text, level = ok ? 'PASS' : 'FAIL') => checks.push({ id, level, text });

  // S1 — field names and types in the staging GraphQL schema
  const intro = await gql(fetchImpl, spaceId, token, INTROSPECT);
  const fields = new Map((intro.data?.__type?.fields ?? []).map((f) => [f.name, classify(f.type)]));
  const wrong = Object.entries(EXPECTED).filter(([n, t]) => fields.get(n) !== t);
  add('S1', intro.status === 200 && wrong.length === 0, wrong.length
    ? `Field type mismatch (expected → found): ${wrong.map(([n, t]) => `${n} ${t} → ${fields.get(n) ?? 'MISSING'}`).join(', ')}. HTTP ${intro.status}${intro.errors.length ? `; errors: ${intro.errors.join(' | ')}` : ''}.`
    : `All six fields present with the contract types: ${Object.entries(EXPECTED).map(([n, t]) => `${n}=${t}`).join(', ')}.`);

  // S2/S3 — what the Delivery API returns, and sys.publishedVersion (release blocker if not numeric)
  const raw = await gql(fetchImpl, spaceId, token, RAW);
  const items = raw.data?.caseStudiesCollection?.items?.filter(Boolean) ?? [];
  add('S2a', raw.status === 200 && raw.errors.length === 0 && raw.data !== null,
    `Delivery query on staging: HTTP ${raw.status}; ${items.length} item(s) returned (total ${raw.data?.caseStudiesCollection?.total ?? '?'})${raw.errors.length ? `; errors: ${raw.errors.join(' | ')}` : ''}.`);
  for (const [id, slug] of Object.entries(LEGACY)) {
    const it = items.find((i) => i.sys?.id === id);
    const pv = it?.sys?.publishedVersion;
    add(`S2-${id.slice(0, 5)}`, Boolean(it) && it.slug === slug && Number.isInteger(pv) && pv > 0 && Boolean(it.sys.publishedAt),
      it ? `${id}: slug "${it.slug}", sys.publishedVersion ${JSON.stringify(pv)}, publishedAt ${it.sys.publishedAt ? 'present' : 'MISSING'}.`
        : `${id}: NOT returned by the Delivery API on staging.`);
  }
  const nonNumeric = items.filter((i) => !(Number.isInteger(i.sys?.publishedVersion) && i.sys.publishedVersion > 0)).map((i) => i.sys?.id);
  add('S2b', items.length > 0 && nonNumeric.length === 0, nonNumeric.length
    ? `sys.publishedVersion missing or not numeric for: ${nonNumeric.join(', ')}. RELEASE BLOCKER.`
    : `sys.publishedVersion is a positive integer for all ${items.length} returned entries.`);
  const leakedDrafts = items.filter((i) => draftIds.includes(i.sys?.id)).map((i) => i.sys.id);
  add('S3', leakedDrafts.length === 0, draftIds.length
    ? (leakedDrafts.length ? `Draft entries returned by the Delivery API: ${leakedDrafts.join(', ')}.` : `None of the ${draftIds.length} known draft entries is returned by the Delivery API.`)
    : 'No draft ID list supplied; drafts checked only through S4 (public set must be exactly the three legacy IDs).',
  draftIds.length ? undefined : 'INFO');

  // S4/S5 — the application's own code path against staging
  const appErrors = [];
  const origError = console.error; const origWarn = console.warn;
  console.error = (...a) => appErrors.push(a.map(String).join(' '));
  console.warn = (...a) => appErrors.push(a.map(String).join(' '));
  let pub = []; let cards = []; let details = {}; let queryHasNewFields = false;
  try {
    const app = loadApp();
    queryHasNewFields = app.queries.CASE_STUDY_NEW_FIELDS_ENABLED && /showTestimonial/.test(app.queries.GET_ALL_CASE_STUDIES_QUERY);
    pub = await app.caseStudies.fetchContentfulCaseStudies();
    cards = await app.caseStudies.getCaseStudyListCards();
    for (const slug of Object.values(LEGACY)) {
      const d = await app.caseStudies.fetchContentfulCaseStudyBySlug(slug.replace(/^portfolio\//, ''));
      details[slug] = d ? { id: d.id, layout: d.layout } : null;
    }
  } finally { console.error = origError; console.warn = origWarn; }
  add('S4a', queryHasNewFields, `Application query includes the six new fields: ${queryHasNewFields}.`);
  add('S4b', appErrors.length === 0, appErrors.length ? `Application logged: ${appErrors.join(' | ').slice(0, 400)}` : 'Application query returned data with no GraphQL error or warning.');
  const pubIds = pub.map((s) => s.id).sort();
  add('S5a', JSON.stringify(pubIds) === JSON.stringify(Object.keys(LEGACY).sort()) && pub.every((s) => s.layout === 'legacy'),
    `Publicly eligible: ${pub.map((s) => `${s.id} (${s.layout})`).join(', ') || 'none'}. Expected exactly the three legacy IDs on the legacy template.`);
  add('S5b', cards.length === 3, `/work cards: ${cards.length}.`);
  const badDetail = Object.entries(details).filter(([, d]) => !d || d.layout !== 'legacy');
  add('S5c', badDetail.length === 0, badDetail.length ? `Detail lookup failed for: ${badDetail.map(([s]) => s).join(', ')}.` : 'All three legacy URLs resolve to their entry on the legacy template.');
  const flags = pub.map((s) => `${s.id.slice(0, 5)}: summary ${s.eligibility.hasSummary ? 'yes' : 'no'}, problem ${s.eligibility.hasProblem ? 'yes' : 'no'}, whatWeDid ${s.eligibility.hasWhatWeDid ? 'yes' : 'no'}, impact ${s.eligibility.hasImpact ? 'yes' : 'no'}`);
  add('S6', true, `New-field content present on the legacy entries (expected all "no" after a schema-only migration): ${flags.join('; ') || 'n/a'}.`, 'INFO');
  return checks;
}

function report(checks, requests, now) {
  const failed = checks.filter((c) => c.level === 'FAIL');
  return [
    '# G6 simplified — staging integration check (redacted)', '',
    `Generated: ${now}. Delivery API, environment staging only, ${requests.length} POST request(s). No credentials, no entry text.`, '',
    `**Result: ${failed.length ? `FAIL — ${failed.map((c) => c.id).join(', ')}` : 'PASS — all checks passed.'}**`, '',
    '| Check | Result | Detail |', '|---|---|---|',
    ...checks.map((c) => `| ${c.id} | ${c.level} | ${c.text.replace(/\|/g, '\\|')} |`), '',
  ].join('\n');
}

function loadAppFrom(repo) {
  const { load } = require(path.join(repo, 'tests/helpers/ts-loader.cjs'));
  return () => ({ queries: load('lib/contentful/queries.ts'), caseStudies: load('lib/contentful/case-studies.ts') });
}

async function main() {
  const [spaceId, out, draftReport] = process.argv.slice(2);
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  const redact = (s) => (token ? String(s).split(token).join('[REDACTED]') : String(s)).replace(/Bearer\s+\S+/g, 'Bearer [REDACTED]');
  try {
    if (!token) throw new GuardError('CONTENTFUL_ACCESS_TOKEN is not set (run check.sh, which prompts for it).');
    if (process.argv.slice(2).some((a) => a.includes(token))) throw new GuardError('Token found in arguments.');
    if (!out) throw new GuardError('usage: check.cjs <SPACE_ID> <NEW_OUT_DIR> [before-entries-report.json]');
    const outDir = path.resolve(out);
    if (fs.existsSync(outDir)) throw new GuardError(`${outDir} already exists; use a new directory.`);
    const draftIds = draftReport ? JSON.parse(fs.readFileSync(draftReport, 'utf8')).rows.filter((r) => r.status === 'draft').map((r) => r.id) : [];
    const requests = [];
    const fetchImpl = guardedFetch({ spaceId, realFetch: globalThis.fetch, requests });
    // The application code reads only these; the Preview token is removed so it cannot be used even by mistake.
    Object.assign(process.env, { CONTENTFUL_SPACE_ID: spaceId, CONTENTFUL_ENVIRONMENT: 'staging', CONTENTFUL_CASE_STUDY_NEW_FIELDS: '1' });
    delete process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
    globalThis.fetch = fetchImpl;
    const checks = await runChecks({ spaceId, token, fetchImpl, draftIds, loadApp: loadAppFrom(REPO) });
    const md = redact(report(checks, requests, new Date().toISOString()));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'staging-check-report.md'), md, { flag: 'wx' });
    process.stdout.write(`${md}\n`);
    process.exitCode = checks.some((c) => c.level === 'FAIL') ? 2 : 0;
  } catch (e) {
    process.stdout.write(`${e instanceof GuardError ? 'REFUSED' : 'ERROR'}: ${redact(e.message)}\n`);
    process.exitCode = e instanceof GuardError ? 1 : 3;
  }
}

module.exports = { guardedFetch, runChecks, report, classify, loadAppFrom, GuardError, LEGACY, EXPECTED };
if (require.main === module) main();
