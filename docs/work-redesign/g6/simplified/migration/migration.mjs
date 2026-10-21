// G6 simplified — `caseStudies` schema migration for the Contentful `staging` environment.
// STATUS: adapted from the reviewed G6-S2-R1 package, 2026-10-21. NOT EXECUTED.
// Supersedes s2r1-migration/ (nine fields incl. the signed `approval`), which is kept unchanged as history.
// Unchanged from S2-R1: guards, read-only plan, slug preflight (route collisions, pattern), verification, rollback.
//
// What it does (and nothing else):
//   - adds the six simplified fields (simplified/SIMPLIFIED_SCHEMA_CONTRACT.md);
//   - makes `review`, `size`, `audience`, `targetArea` optional (TF-01 S-1/S-2, follow-up D3/D3b);
//   - adds `unique` and a pattern to `slug` (TF-01 S-3, follow-up §2.3). No slug is renamed or edited.
// It never writes entries and never touches another content type.
//
// Dependencies: none (Node >= 20, built-in fetch). Talks to the Content Management API directly so every
// request is visible in this file. The token is read by cli.mjs from CONTENTFUL_MANAGEMENT_TOKEN only.

export const MIGRATION_ID = 'g6-simplified-case-studies-v1';
export const CONTENT_TYPE_ID = 'caseStudies';
export const LOCALE = 'en-US';
export const CMA_BASE = 'https://api.contentful.com';

// The only environment this migration may target. Anything else, `master` included, is rejected before any request.
export const ALLOWED_ENVIRONMENTS = Object.freeze(['staging']);

// ---------------------------------------------------------------------------------------------------------------
// 1. Expected schema
// ---------------------------------------------------------------------------------------------------------------

// Existing `caseStudies` fields as read on 2026-10-21 (TF-01 §5.1, Delivery API `/content_types`). The preflight
// checks type, link type and `localized`; existing validations are preserved as found.
export const BASELINE_FIELDS = Object.freeze([
  { id: 'title', type: 'Symbol' },
  { id: 'slug', type: 'Symbol' },
  { id: 'clientName', type: 'Link', linkType: 'Entry', linkContentType: 'caseClient' },
  { id: 'industry', type: 'Link', linkType: 'Entry', linkContentType: 'caseIndustry' },
  { id: 'size', type: 'Link', linkType: 'Entry', linkContentType: 'caseCompanySize' },
  { id: 'audience', type: 'Link', linkType: 'Entry', linkContentType: 'caseTargetAudience' },
  { id: 'targetArea', type: 'Link', linkType: 'Entry', linkContentType: 'caseGeographicTarget' },
  { id: 'content', type: 'RichText' },
  { id: 'review', type: 'Link', linkType: 'Entry', linkContentType: 'caseTestimonial' },
  { id: 'conclusion', type: 'RichText' },
]);

export const LINKED_CONTENT_TYPES = Object.freeze([
  'caseClient', 'caseIndustry', 'caseCompanySize', 'caseTargetAudience', 'caseGeographicTarget', 'caseTestimonial',
]);

// Never to be created by this migration. The first two were superseded before S2; the last four belong to the
// superseded nine-field S2-R1 migration. Finding any of them means another migration ran here: resolve manually.
export const SUPERSEDED_FIELD_IDS = Object.freeze([
  'approvedContentHash', 'publicationApprovals', 'approval', 'outcomeType', 'serviceKey', 'listingOrder',
]);

export const LINKS_TO_MAKE_OPTIONAL = Object.freeze(['review', 'size', 'audience', 'targetArea']);

// Must equal SLUG_PATTERN_SOURCE in lib/case-study-eligibility.ts. Allows Ameba's legacy `portfolio/` prefix.
export const SLUG_PATTERN = '^(portfolio/)?[a-z0-9]+(-[a-z0-9]+)*$';

const RICH_TEXT_VALIDATIONS = [
  { enabledMarks: ['bold', 'italic'], message: 'Only bold and italic are allowed.' },
  {
    // "Paragraphs and lists only" (contract). Paragraph, list item and text are always allowed. Everything not
    // listed here (headings, quotes, rules, tables, hyperlinks, embedded entries/assets, entry/asset links) is disabled.
    enabledNodeTypes: ['unordered-list', 'ordered-list'],
    message: 'Only paragraphs and lists are allowed.',
  },
];

const field = (id, name, type, validations, extra = {}) =>
  ({ id, name, type, localized: false, required: false, disabled: false, omitted: false, validations, ...extra });

export const NEW_FIELDS = Object.freeze([
  field('summary', 'Summary', 'Text', []),
  field('problem', 'The Problem', 'RichText', RICH_TEXT_VALIDATIONS),
  field('whatWeDid', 'What We Did', 'RichText', RICH_TEXT_VALIDATIONS),
  field('impact', 'The Impact', 'RichText', RICH_TEXT_VALIDATIONS),
  field('evidenceNote', 'Evidence note', 'Text', []),
  // The default applies to entries created after activation. Existing entries keep no value; the site reads absent as false.
  field('showTestimonial', 'Show testimonial', 'Boolean', [], { defaultValue: { [LOCALE]: false } }),
]);

const SLUG_VALIDATIONS = [{ unique: true }, { regexp: { pattern: SLUG_PATTERN } }];

// ---------------------------------------------------------------------------------------------------------------
// 2. Guards and secret handling
// ---------------------------------------------------------------------------------------------------------------

export class GuardError extends Error {}
export class PreconditionError extends Error {}
export class VerificationError extends Error {}
export class CmaError extends Error {}

const ID_RE = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/;

/** Local check, before any network request. No default: the caller must name the environment. */
export function assertAllowedEnvironment(environmentId) {
  if (typeof environmentId !== 'string' || environmentId === '') {
    throw new GuardError('No environment given. Pass --environment staging explicitly; there is no default.');
  }
  if (/^master/i.test(environmentId)) throw new GuardError(`Refusing environment "${environmentId}": master is never a target.`);
  if (!ALLOWED_ENVIRONMENTS.includes(environmentId)) {
    throw new GuardError(`Refusing unrecognised environment "${environmentId}". Allowed: ${ALLOWED_ENVIRONMENTS.join(', ')}.`);
  }
}

export function assertId(kind, value) {
  if (typeof value !== 'string' || !ID_RE.test(value)) throw new GuardError(`Invalid or missing ${kind}.`);
}

/** Removes anything token-shaped. Applied to every log line, error message and output file. */
export function makeRedactor(secret) {
  return (text) => {
    let s = String(text);
    if (secret) s = s.split(secret).join('[REDACTED]');
    return s.replace(/CFPAT-[A-Za-z0-9_-]+/g, '[REDACTED]').replace(/Bearer\s+\S+/gi, 'Bearer [REDACTED]');
  };
}

// ---------------------------------------------------------------------------------------------------------------
// 3. Content Management API client (writes are impossible in read-only mode)
// ---------------------------------------------------------------------------------------------------------------

export function createCmaClient({ token, spaceId, environmentId, readOnly, fetchImpl = globalThis.fetch,
  sleep = (ms) => new Promise((r) => setTimeout(r, ms)) }) {
  if (!token) throw new GuardError('CONTENTFUL_MANAGEMENT_TOKEN is not set.');
  assertId('space ID', spaceId);
  assertAllowedEnvironment(environmentId);
  const redact = makeRedactor(token);
  const spacePath = `/spaces/${encodeURIComponent(spaceId)}`;
  const envPath = `${spacePath}/environments/${encodeURIComponent(environmentId)}`;
  const writes = [];

  async function request(method, path, { body, version, allow404 = false } = {}) {
    if (readOnly && method !== 'GET') throw new GuardError(`Read-only (dry-run) client refused ${method} ${path}.`);
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/vnd.contentful.management.v1+json' };
    if (version !== undefined) headers['X-Contentful-Version'] = String(version);
    for (let attempt = 0; ; attempt++) {
      let res;
      try {
        res = await fetchImpl(CMA_BASE + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
      } catch (e) {
        throw new CmaError(redact(`${method} ${path}: network error: ${e?.message ?? e}`));
      }
      if (res.status === 429 && attempt < 5) {
        const reset = Number(res.headers?.get?.('x-contentful-ratelimit-reset')) || 1;
        await sleep(Math.min(reset, 10) * 1000);
        continue;
      }
      if (allow404 && res.status === 404) return null;
      const text = await res.text();
      let json = null;
      try { json = text ? JSON.parse(text) : null; } catch { /* non-JSON error page */ }
      if (!res.ok) {
        const detail = json ? `${json.sys?.id ?? ''} ${json.message ?? ''}`.trim() : text.slice(0, 200);
        throw new CmaError(redact(`${method} ${path}: HTTP ${res.status} ${detail}`));
      }
      if (method !== 'GET') writes.push(`${method} ${path}`);
      return json;
    }
  }

  return {
    writes,
    redact,
    getEnvironment: () => request('GET', envPath),
    listAliases: () => request('GET', `${spacePath}/environment_aliases`, { allow404: true }),
    getContentType: (id) => request('GET', `${envPath}/content_types/${encodeURIComponent(id)}`, { allow404: true }),
    putContentType: (id, version, body) =>
      request('PUT', `${envPath}/content_types/${encodeURIComponent(id)}`, { version, body }),
    activateContentType: (id, version) =>
      request('PUT', `${envPath}/content_types/${encodeURIComponent(id)}/published`, { version }),
    async listEntries(contentTypeId) {
      const items = [];
      for (let skip = 0; ; skip += 100) {
        const page = await request('GET',
          `${envPath}/entries?content_type=${encodeURIComponent(contentTypeId)}&limit=100&skip=${skip}&order=sys.createdAt`);
        items.push(...page.items);
        if (items.length >= page.total || page.items.length === 0) return items;
      }
    },
  };
}

/** Remote check: the named environment exists, is ready, and is not the target of any alias (e.g. `master`). */
export async function verifyRemoteEnvironment(client, environmentId) {
  const env = await client.getEnvironment();
  if (env?.sys?.id !== environmentId) {
    throw new GuardError(`"${environmentId}" resolved to environment "${env?.sys?.id}". It may be an alias; refusing.`);
  }
  if (env.sys.status?.sys?.id !== 'ready') throw new GuardError(`Environment "${environmentId}" is not ready.`);
  if (Array.isArray(env.sys.aliases) && env.sys.aliases.length > 0) {
    throw new GuardError(`Environment "${environmentId}" is the target of an alias; refusing (it may be serving as master).`);
  }
  const aliases = await client.listAliases(); // null = aliases not enabled for the space
  for (const a of aliases?.items ?? []) {
    if (a.sys?.id === environmentId || a.environment?.sys?.id === environmentId) {
      throw new GuardError(`Environment "${environmentId}" is linked to alias "${a.sys?.id}"; refusing.`);
    }
  }
  return { id: env.sys.id, name: env.name };
}

// ---------------------------------------------------------------------------------------------------------------
// 4. Normalisation, preflight and classification (pure)
// ---------------------------------------------------------------------------------------------------------------

const clone = (v) => JSON.parse(JSON.stringify(v));

function canon(v) {
  if (Array.isArray(v)) return `[${v.map(canon).join(',')}]`;
  if (v && typeof v === 'object') {
    return `{${Object.keys(v).sort().filter((k) => v[k] !== undefined).map((k) => `${JSON.stringify(k)}:${canon(v[k])}`).join(',')}}`;
  }
  return JSON.stringify(v);
}

function normValidations(list) {
  return (list ?? [])
    .map((v) => {
      const c = clone(v);
      if (c.regexp && (c.regexp.flags === null || c.regexp.flags === '')) delete c.regexp.flags;
      return c;
    })
    .filter((v) => !(Object.keys(v).length === 1 && v.nodes && Object.keys(v.nodes).length === 0)) // UI adds {nodes:{}}
    .map(canon)
    .sort();
}

/** Comparable form of a field: the properties this migration cares about, with defaults made explicit. */
export function normField(f) {
  return {
    id: f.id, name: f.name, type: f.type, linkType: f.linkType, items: f.items ? canon(f.items) : undefined,
    localized: !!f.localized, required: !!f.required, disabled: !!f.disabled, omitted: !!f.omitted,
    deleted: !!f.deleted, validations: normValidations(f.validations),
    defaultValue: f.defaultValue === undefined ? undefined : canon(f.defaultValue),
  };
}

const sameSpec = (a, b) => {
  const x = normField(a); const y = normField(b);
  return x.type === y.type && x.linkType === y.linkType && x.items === y.items && x.localized === y.localized &&
    x.required === y.required && canon(x.validations) === canon(y.validations) && x.defaultValue === y.defaultValue;
};

const hasValidation = (f, key) => (f.validations ?? []).some((v) => Object.prototype.hasOwnProperty.call(v, key));
const linkTargets = (f) => (f.validations ?? []).flatMap((v) => v.linkContentType ?? []);

/**
 * Checks the content type is the one TF-01 inspected, and classifies each change as pending, applied or drift.
 * Never throws for drift; the caller decides. Throws PreconditionError only for a wrong or unsafe environment state.
 */
export function inspectContentType(ct) {
  if (!ct) throw new PreconditionError(`Content type "${CONTENT_TYPE_ID}" not found in this environment.`);
  const byId = new Map(ct.fields.map((f) => [f.id, f]));
  const problems = [];
  const notes = [];

  for (const id of SUPERSEDED_FIELD_IDS) {
    if (byId.has(id)) problems.push(`Superseded field "${id}" exists. It was never meant to be created; resolve manually.`);
  }
  for (const b of BASELINE_FIELDS) {
    const f = byId.get(b.id);
    if (!f) { problems.push(`Expected field "${b.id}" is missing.`); continue; }
    if (f.type !== b.type || (b.linkType && f.linkType !== b.linkType)) {
      problems.push(`Field "${b.id}" is ${f.type}/${f.linkType ?? '-'}; expected ${b.type}/${b.linkType ?? '-'}.`);
    }
    if (f.localized) problems.push(`Field "${b.id}" is localised; TF-01 found no localised fields.`);
    if (f.omitted || f.deleted || f.disabled) problems.push(`Field "${b.id}" is omitted, disabled or deleted.`);
    if (b.linkContentType) {
      const t = linkTargets(f);
      if (t.length === 0) notes.push(`Field "${b.id}" has no linkContentType restriction (informational).`);
      else if (!t.includes(b.linkContentType)) problems.push(`Field "${b.id}" links to [${t}], expected ${b.linkContentType}.`);
    }
  }
  const known = new Set([...BASELINE_FIELDS.map((f) => f.id), ...NEW_FIELDS.map((f) => f.id)]);
  for (const f of ct.fields) {
    if (!known.has(f.id) && !SUPERSEDED_FIELD_IDS.includes(f.id)) problems.push(`Unexpected field "${f.id}".`);
  }

  const changes = [];
  for (const nf of NEW_FIELDS) {
    const f = byId.get(nf.id);
    let status;
    if (!f) status = 'pending';
    else if (f.deleted || !sameSpec(f, nf)) status = 'drift';
    else status = f.omitted ? 'pending' : 'applied'; // omitted = earlier reversible rollback; re-apply un-omits
    changes.push({ id: `add:${nf.id}`, field: nf.id, status, detail: f?.omitted ? 'present but omitted' : undefined });
  }
  for (const id of LINKS_TO_MAKE_OPTIONAL) {
    const f = byId.get(id);
    changes.push({ id: `optional:${id}`, field: id, status: !f ? 'drift' : f.required ? 'pending' : 'applied' });
  }
  const slug = byId.get('slug');
  if (slug) {
    const uniq = (slug.validations ?? []).find((v) => 'unique' in v);
    changes.push({ id: 'slug:unique', field: 'slug', status: !uniq ? 'pending' : uniq.unique === true ? 'applied' : 'drift' });
    const rx = (slug.validations ?? []).filter((v) => 'regexp' in v);
    changes.push({
      id: 'slug:pattern', field: 'slug',
      status: rx.length === 0 ? 'pending' : rx.length === 1 && rx[0].regexp.pattern === SLUG_PATTERN ? 'applied' : 'drift',
    });
  }

  const draftPending = ct.sys?.publishedVersion === undefined || ct.sys.version !== ct.sys.publishedVersion + 1;
  const counts = { pending: 0, applied: 0, drift: 0 };
  for (const c of changes) counts[c.status]++;
  const state = problems.length || counts.drift ? 'drift'
    : counts.pending === 0 ? 'applied' : counts.applied === 0 ? 'pristine' : 'partial';
  return { state, draftPending, problems, notes, changes, counts };
}

/** The target content type: current fields with only the changes above applied. Everything else is kept as found. */
export function buildTarget(ct) {
  const fields = clone(ct.fields).map((f) => {
    if (LINKS_TO_MAKE_OPTIONAL.includes(f.id)) f.required = false;
    if (f.id === 'slug') {
      f.validations = f.validations ?? [];
      for (const v of SLUG_VALIDATIONS) if (!hasValidation(f, Object.keys(v)[0])) f.validations.push(clone(v));
    }
    const nf = NEW_FIELDS.find((n) => n.id === f.id);
    if (nf && f.omitted && sameSpec(f, nf)) f.omitted = false;
    return f;
  });
  for (const nf of NEW_FIELDS) if (!fields.some((f) => f.id === nf.id)) fields.push(clone(nf));
  return { name: ct.name, description: ct.description, displayField: ct.displayField, fields };
}

// ---------------------------------------------------------------------------------------------------------------
// 5. Entries scan (read-only; IDs, slugs and presence flags only, never content)
// ---------------------------------------------------------------------------------------------------------------

/**
 * The public route segment of /portfolio/[slug] for a stored slug. MUST equal the application:
 * lib/contentful/mappers.ts `normalizeCaseStudySlug` (strip a leading `portfolio/` case-insensitively, THEN strip
 * leading and trailing slashes), applied after `.trim()` as in `mapContentfulCaseStudyToCms`.
 * Pinned by fixtures/mappers-normalize.fixture.json and by a test.
 */
export function routeSlug(slug) {
  return slug.trim().replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');
}

export function scanEntries(entries) {
  const val = (e, id) => e.fields?.[id]?.[LOCALE];
  const rows = entries.map((e) => {
    const s = e.sys;
    const status = s.archivedVersion ? 'archived' : !s.publishedVersion ? 'draft'
      : s.version === s.publishedVersion + 1 ? 'published' : 'changed';
    return {
      id: s.id, version: s.version, publishedVersion: s.publishedVersion ?? null, status,
      slug: val(e, 'slug') ?? null,
      slugMatchesPattern: typeof val(e, 'slug') === 'string' && new RegExp(SLUG_PATTERN).test(val(e, 'slug')),
      missingLinks: LINKS_TO_MAKE_OPTIONAL.filter((id) => !val(e, id)),
      newFieldsWithValues: NEW_FIELDS.map((f) => f.id).filter((id) => val(e, id) !== undefined && val(e, id) !== null),
    };
  });
  const bySlug = new Map();
  const byNormSlug = new Map();
  for (const r of rows) {
    if (r.slug === null) continue;
    bySlug.set(r.slug, [...(bySlug.get(r.slug) ?? []), r.id]);
    const n = routeSlug(r.slug);
    byNormSlug.set(n, [...(byNormSlug.get(n) ?? []), r.id]);
  }
  return {
    total: rows.length,
    rows,
    exactDuplicateSlugs: [...bySlug].filter(([, ids]) => ids.length > 1).map(([slug, ids]) => ({ slug, ids })),
    normalisedCollisions: [...byNormSlug].filter(([, ids]) => ids.length > 1).map(([slug, ids]) => ({ slug, ids })),
    // Entries that HAVE a slug which fails the new pattern. These block apply (R1). Entries with no slug at all are
    // incomplete drafts and are listed separately; they are reported, not blocking.
    patternFailures: rows.filter((r) => r.slug !== null && !r.slugMatchesPattern)
      .map((r) => ({ id: r.id, slug: r.slug, status: r.status })),
    missingSlugs: rows.filter((r) => r.slug === null).map((r) => ({ id: r.id, status: r.status })),
  };
}

// ---------------------------------------------------------------------------------------------------------------
// 6. Diff
// ---------------------------------------------------------------------------------------------------------------

export function diffFields(beforeFields, afterFields) {
  const before = new Map(beforeFields.map((f) => [f.id, normField(f)]));
  const after = new Map(afterFields.map((f) => [f.id, normField(f)]));
  const ids = [...new Set([...before.keys(), ...after.keys()])];
  return ids.map((id) => {
    const b = before.get(id); const a = after.get(id);
    if (!b) return { id, change: 'added', after: a };
    if (!a) return { id, change: 'removed', before: b };
    const props = Object.keys(a).filter((k) => canon(a[k]) !== canon(b[k]));
    return props.length ? { id, change: 'changed', props: props.map((k) => ({ prop: k, before: b[k], after: a[k] })) }
      : { id, change: 'unchanged' };
  });
}

export function diffMarkdown(title, diff) {
  const cell = (v) => (v === undefined ? '—' : `\`${Array.isArray(v) ? v.join(' ; ') : String(v)}\``).replace(/\|/g, '\\|');
  const lines = [`# ${title}`, '', '| Field | Change | Property | Before | After |', '|---|---|---|---|---|'];
  for (const d of diff) {
    if (d.change === 'added') {
      lines.push(`| \`${d.id}\` | added | type, required, validations | — | ${cell(d.after.type)}, required ${cell(d.after.required)}, ${cell(d.after.validations)} |`);
    } else if (d.change === 'removed') {
      lines.push(`| \`${d.id}\` | removed | — | ${cell(d.before.type)} | — |`);
    } else if (d.change === 'changed') {
      for (const p of d.props) lines.push(`| \`${d.id}\` | changed | ${p.prop} | ${cell(p.before)} | ${cell(p.after)} |`);
    } else {
      lines.push(`| \`${d.id}\` | unchanged | — | — | — |`);
    }
  }
  return `${lines.join('\n')}\n`;
}

// ---------------------------------------------------------------------------------------------------------------
// 7. Runs
// ---------------------------------------------------------------------------------------------------------------

async function readState(client, environmentId) {
  const environment = await verifyRemoteEnvironment(client, environmentId);
  const ct = await client.getContentType(CONTENT_TYPE_ID);
  const inspection = inspectContentType(ct);
  const missingLinked = [];
  for (const id of LINKED_CONTENT_TYPES) if (!(await client.getContentType(id))) missingLinked.push(id);
  if (missingLinked.length) inspection.problems.push(`Linked content types missing: ${missingLinked.join(', ')}.`);
  if (inspection.problems.length) inspection.state = 'drift';
  const entries = scanEntries(await client.listEntries(CONTENT_TYPE_ID));
  return { environment, ct, inspection, entries };
}

const meta = (ctx, ct) => ({
  migrationId: MIGRATION_ID, spaceId: ctx.spaceId, environmentId: ctx.environmentId, contentTypeId: CONTENT_TYPE_ID,
  capturedAt: ctx.now(), contentTypeVersion: ct?.sys?.version, contentTypePublishedVersion: ct?.sys?.publishedVersion,
});

function entryVersionDrift(before, after) {
  const a = new Map(after.rows.map((r) => [r.id, r]));
  const out = [];
  for (const r of before.rows) {
    const x = a.get(r.id);
    if (!x) out.push(`${r.id}: missing after migration`);
    else if (x.version !== r.version || x.publishedVersion !== r.publishedVersion) out.push(`${r.id}: version changed`);
  }
  if (after.total !== before.total) out.push(`entry count ${before.total} → ${after.total}`);
  return out;
}

/** Human-readable blockers: every group of entries sharing a public route, and every existing slug off-pattern. */
export function slugPreflight(entries) {
  const out = [];
  for (const c of entries.normalisedCollisions) {
    const members = c.ids.map((id) => `${id} (${entries.rows.find((r) => r.id === id).slug})`).join(', ');
    out.push(`route collision: /portfolio/${c.slug} is claimed by ${c.ids.length} entries: ${members}`);
  }
  for (const f of entries.patternFailures) {
    out.push(`slug fails ${SLUG_PATTERN}: entry ${f.id} (${f.status}) has ${JSON.stringify(f.slug)}`);
  }
  return out;
}

/**
 * plan (dry run) and apply. `ctx` = { client, spaceId, environmentId, mode: 'plan'|'apply', write, log, now }.
 * Returns an exit code: 0 ok/no-op, 2 precondition or drift, 4 post-verification failed.
 */
export async function runForward(ctx) {
  const { client, write, log } = ctx;
  const { environment, ct, inspection, entries } = await readState(client, ctx.environmentId);
  log(`Environment: ${environment.id} (verified: allow-listed, ready, not aliased)`);
  log(`Content type ${CONTENT_TYPE_ID}: version ${ct.sys.version}, state ${inspection.state}` +
    `${inspection.draftPending ? ', UNACTIVATED DRAFT PRESENT' : ''}`);
  for (const p of inspection.problems) log(`  PROBLEM: ${p}`);
  for (const n of inspection.notes) log(`  note: ${n}`);
  for (const c of inspection.changes) log(`  ${c.status.padEnd(8)} ${c.id}${c.detail ? ` (${c.detail})` : ''}`);
  log(`Entries: ${entries.total}; exact duplicate slugs ${entries.exactDuplicateSlugs.length}; ` +
    `route collisions ${entries.normalisedCollisions.length}; slugs failing new pattern ${entries.patternFailures.length}; ` +
    `entries without a slug ${entries.missingSlugs.length}`);

  const target = buildTarget(ct);
  const plannedDiff = diffFields(ct.fields, target.fields);
  await write('before-content-type.json', JSON.stringify({ meta: meta(ctx, ct), contentType: ct }, null, 2));
  await write('before-entries-report.json', JSON.stringify(entries, null, 2));
  await write('plan.json', JSON.stringify({ meta: meta(ctx, ct), inspection, target }, null, 2));
  await write('planned-diff.md', diffMarkdown(`Planned schema diff — ${ctx.environmentId}`, plannedDiff));

  if (inspection.state === 'drift') { log('ABORT: schema is not in a recognised state. No changes made.'); return 2; }
  // R1 slug preflight. Applies to plan and apply alike, so the dry run shows exactly what apply would refuse.
  // Nothing is renamed or edited automatically; the owner resolves each reported entry in Contentful first.
  const slugBlockers = slugPreflight(entries);
  const nothingToDo = inspection.state === 'applied' && !inspection.draftPending;
  if (slugBlockers.length && !nothingToDo) {
    for (const b of slugBlockers) log(`BLOCKER: ${b}`);
    log('ABORT: resolve the entries above in Contentful, then run plan again. No changes made.');
    return 2;
  }
  let pendingDraftIsTarget = false;
  if (inspection.draftPending) {
    pendingDraftIsTarget = inspection.state === 'applied';
    if (!pendingDraftIsTarget) {
      log('ABORT: the content type has unactivated changes that are not this migration. No changes made.');
      return 2;
    }
    log('The unactivated draft equals this migration (an earlier run stopped before activation).');
  }
  if (inspection.state === 'applied' && !pendingDraftIsTarget) { log('Already applied. Nothing to do.'); return 0; }

  if (ctx.mode === 'plan') { log(`DRY RUN: ${client.writes.length} writes made. Review planned-diff.md.`); return 0; }

  let version = ct.sys.version;
  if (!pendingDraftIsTarget) version = (await client.putContentType(CONTENT_TYPE_ID, version, target)).sys.version;
  await client.activateContentType(CONTENT_TYPE_ID, version);

  const after = await client.getContentType(CONTENT_TYPE_ID);
  const check = inspectContentType(after);
  const entriesAfter = scanEntries(await client.listEntries(CONTENT_TYPE_ID));
  const failures = [];
  if (check.state !== 'applied') failures.push(`state after apply is ${check.state}`);
  if (check.draftPending) failures.push('content type still has an unactivated draft');
  const residual = diffFields(target.fields, after.fields).filter((d) => d.change !== 'unchanged');
  if (residual.length) failures.push(`stored schema differs from target: ${residual.map((d) => d.id).join(', ')}`);
  failures.push(...entryVersionDrift(entries, entriesAfter));

  await write('after-content-type.json', JSON.stringify({ meta: meta(ctx, after), contentType: after }, null, 2));
  await write('after-entries-report.json', JSON.stringify(entriesAfter, null, 2));
  await write('applied-diff.md', diffMarkdown(`Applied schema diff — ${ctx.environmentId}`, diffFields(ct.fields, after.fields)));
  if (failures.length) { for (const f of failures) log(`VERIFY FAILED: ${f}`); return 4; }
  log(`Applied and verified. Writes: ${client.writes.join(' ; ')}`);
  return 0;
}

/**
 * rollback-plan (dry run) and rollback. Restores the five touched existing fields to the snapshot and either omits
 * (reversible, data kept) or deletes (only when no entry holds a value) the six new fields.
 * `ctx` additionally has `snapshot` (parsed before-content-type.json) and `strategy`: 'omit' | 'delete'.
 */
export async function runRollback(ctx) {
  const { client, write, log, snapshot, strategy } = ctx;
  if (!['omit', 'delete'].includes(strategy)) throw new GuardError('--strategy must be omit or delete.');
  const sm = snapshot?.meta;
  if (sm?.migrationId !== MIGRATION_ID || sm.spaceId !== ctx.spaceId || sm.environmentId !== ctx.environmentId ||
      sm.contentTypeId !== CONTENT_TYPE_ID) {
    throw new GuardError('Snapshot does not belong to this migration, space and environment.');
  }
  const { ct, inspection, entries } = await readState(client, ctx.environmentId);
  const snapFields = new Map(snapshot.contentType.fields.map((f) => [f.id, f]));
  const blockers = [];
  if (inspection.draftPending) blockers.push('content type has unactivated changes');
  if (inspection.problems.length) blockers.push(...inspection.problems);

  const restoreIds = [...LINKS_TO_MAKE_OPTIONAL, 'slug'];
  const expectedNow = new Map(buildTarget(snapshot.contentType).fields.map((f) => [f.id, f]));
  for (const id of restoreIds) {
    const cur = ct.fields.find((f) => f.id === id);
    const matches = (ref) => cur && ref && canon(normField(cur)) === canon(normField(ref));
    if (!matches(expectedNow.get(id)) && !matches(snapFields.get(id))) { // migrated form, or already restored
      blockers.push(`field "${id}" changed since the migration; restore it by hand`);
    }
  }
  for (const id of LINKS_TO_MAKE_OPTIONAL) {
    if (snapFields.get(id)?.required) {
      const gaps = entries.rows.filter((r) => r.missingLinks.includes(id)).map((r) => r.id);
      if (gaps.length) blockers.push(`"${id}" cannot be required again: entries without it: ${gaps.join(', ')}`);
    }
  }
  const newIds = NEW_FIELDS.map((f) => f.id).filter((id) => !snapFields.has(id) && ct.fields.some((f) => f.id === id));
  const withValues = entries.rows.filter((r) => r.newFieldsWithValues.length);
  if (strategy === 'delete' && withValues.length) {
    blockers.push(`delete would destroy data in ${withValues.length} entr${withValues.length === 1 ? 'y' : 'ies'} ` +
      `(${withValues.map((r) => `${r.id}:${r.newFieldsWithValues.join('+')}`).join(', ')}); use --strategy omit`);
  }

  const fields = clone(ct.fields).map((f) => {
    if (restoreIds.includes(f.id)) return clone(snapFields.get(f.id));
    if (newIds.includes(f.id)) f.omitted = true;
    return f;
  });
  const body = { name: ct.name, description: ct.description, displayField: ct.displayField, fields };
  await write('rollback-before-content-type.json', JSON.stringify({ meta: meta(ctx, ct), contentType: ct }, null, 2));
  await write('rollback-planned-diff.md', diffMarkdown(`Rollback diff (${strategy}) — ${ctx.environmentId}` +
    `${strategy === 'delete' ? ' — omitted fields are then deleted' : ''}`, diffFields(ct.fields, fields)));
  for (const b of blockers) log(`BLOCKER: ${b}`);
  if (blockers.length) { log('ABORT: rollback not safe. No changes made.'); return 2; }
  log(`Rollback plan: restore ${restoreIds.join(', ')}; ${strategy} ${newIds.join(', ') || '(no new fields present)'}`);
  if (ctx.mode === 'rollback-plan') { log(`DRY RUN: ${client.writes.length} writes made.`); return 0; }

  let v = (await client.putContentType(CONTENT_TYPE_ID, ct.sys.version, body)).sys.version;
  v = (await client.activateContentType(CONTENT_TYPE_ID, v)).sys.version;
  if (strategy === 'delete' && newIds.length) {
    const del = { ...body, fields: body.fields.map((f) => (newIds.includes(f.id) ? { ...f, deleted: true } : f)) };
    v = (await client.putContentType(CONTENT_TYPE_ID, v, del)).sys.version;
    await client.activateContentType(CONTENT_TYPE_ID, v);
  }
  const after = await client.getContentType(CONTENT_TYPE_ID);
  const entriesAfter = scanEntries(await client.listEntries(CONTENT_TYPE_ID));
  await write('rollback-after-content-type.json', JSON.stringify({ meta: meta(ctx, after), contentType: after }, null, 2));
  const failures = entryVersionDrift(entries, entriesAfter);
  for (const id of restoreIds) {
    const cur = after.fields.find((f) => f.id === id);
    if (canon(normField(cur)) !== canon(normField(snapFields.get(id)))) failures.push(`field "${id}" not restored`);
  }
  for (const id of newIds) {
    const cur = after.fields.find((f) => f.id === id);
    if (strategy === 'delete' ? cur : !cur?.omitted) failures.push(`field "${id}" not ${strategy === 'delete' ? 'deleted' : 'omitted'}`);
  }
  if (failures.length) { for (const f of failures) log(`VERIFY FAILED: ${f}`); return 4; }
  log(`Rolled back and verified. Writes: ${client.writes.join(' ; ')}`);
  return 0;
}
