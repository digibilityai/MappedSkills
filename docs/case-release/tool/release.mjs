// Case-study release owner-run Contentful tool (DEC-117; adapted from the batch-five tool; zero dependencies, Node >= 20). Drafts until the `publish` mode.
// Source: docs/case-release/manifest/manifest.json (generated read-only from the approved local entries and the live published content).
//
//   check            read-only (GET only): space/master, default locale, live schemas; validates every planned value (rich text, links,
//                    dates), the new IDs, duplicates, and each existing entry's state (published, no pending draft, targets empty or equal).
//   create           NEW entries only (industries, clients, then 15 case studies as UNPUBLISHED drafts with fixed IDs). Writes are refused for any other ID.
//   snapshot         read-only: saves the existing entries that will change (ClassPe, InsurYo, Ameba, AnybodyCanBake Google Ads), exactly as they are.
//   stage-existing   writes DRAFT changes to those four published entries. Never publishes; the live site keeps serving the published versions.
//   restore-existing puts those four drafts back to the snapshot (no publish).
//   publish          RELEASE STEP. Publishes exactly the planned entries in dependency order. Preflights everything first; retry-safe.
//   rollback-publish Puts the four existing entries back live on the snapshot and unpublishes the new case studies (drafts kept; nothing deleted).
//
// Retry-safe: fixed entry IDs, every write preceded by a read, an entry already in the target state is skipped, an entry in any third state stops the run.
// The Management token is read only from CONTENTFUL_MANAGEMENT_TOKEN and never printed or written to disk. Home Decor and Om Sai are never written.
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const SPACE = 'owww06rzpjnj';
export const ENVIRONMENT = 'master';
export class Abort extends Error {}
const must = (c, m) => { if (!c) throw new Abort(m); };
export const canon = (v) => JSON.stringify(v, (_k, x) => (x && typeof x === 'object' && !Array.isArray(x)
  ? Object.fromEntries(Object.keys(x).sort().map((k) => [k, x[k]])) : x));
const clean = (o) => Object.fromEntries(Object.entries(o ?? {}).filter(([k, v]) => v !== null && v !== undefined && !k.startsWith('_')));
const localise = (fields, L) => Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, { [L]: v }]));
const unlocalise = (fields, L) => Object.fromEntries(Object.entries(fields ?? {}).map(([k, v]) => [k, v?.[L]]));
const link = (id) => ({ sys: { type: 'Link', linkType: 'Entry', id } });

/** Existing case studies this release changes (entry IDs are the live ones; slugs and URLs are never changed). */
export const EXISTING_IDS = {
  'classpe-social-media-strategy': 'b5-classpe-study', 'insuryo-organic-growth': 'b5-insuryo-study',
  'seo-ameba-software': '4DpPjLCWdakD6tBmZNMnko', 'google-ads-for-online-courses': '6Ycb7aYvXrslOXKchQnqmi',
};
/** Never written by this tool, whatever the source says. */
export const NEVER_WRITE = new Set(['Cv42tYFJsR1br2z5gsjtT', '4zQL4P8SR2xogxHN4qFfUl']);
export const STUDY_FIELDS = ['title', 'summary', 'problem', 'whatWeDid', 'impact', 'evidenceNote', 'showTestimonial', 'sector', 'serviceKey', 'periodStart', 'periodEnd', 'listingOrder'];
const ID_RE = /^[a-zA-Z0-9\-_.]{1,64}$/;

/**
 * API wrapper. `allowWrite` is the set of entry IDs this mode may write; any other non-GET request is refused before a
 * network call is made. Only `publish` and `rollback-publish` can reach `/published`, and only for their own entry IDs.
 */
export function makeApi({ space, token, base = 'https://api.contentful.com', fetchImpl = fetch, allowWrite = new Set(), allowPublish = new Set(), allowUnpublish = new Set() }) {
  const root = `${base}/spaces/${encodeURIComponent(space)}`;
  const writes = [];
  const api = async (method, path, { version, body, contentType, env = true } = {}) => {
    if (method !== 'GET') {
      const m = /^\/entries\/([^/?]+)(\/published)?$/.exec(path);
      const id = m && decodeURIComponent(m[1]);
      const ok = m && (m[2]
        ? (method === 'PUT' && allowPublish.has(id)) || (method === 'DELETE' && allowUnpublish.has(id))
        : method === 'PUT' && allowWrite.has(id));
      must(ok, `refused: ${method} ${path} is outside this mode's write allowlist`);
      writes.push(`${method} ${path}`);
    }
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/vnd.contentful.management.v1+json' };
    if (version !== undefined) headers['X-Contentful-Version'] = String(version);
    if (contentType) headers['X-Contentful-Content-Type'] = contentType;
    const res = await fetchImpl(`${root}${env ? `/environments/${ENVIRONMENT}` : ''}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { const e = new Abort(`${method} ${path} -> HTTP ${res.status} ${json?.sys?.id ?? ''} ${json?.message ?? ''}`.trim()); e.status = res.status; throw e; }
    return json;
  };
  api.writes = writes;
  return api;
}

/* ------------------------------------------------------------------ validation against the live schema */

/**
 * Structural nodes Contentful always allows: `enabledNodeTypes` never lists them. The live caseStudies schema says
 * `enabledNodeTypes: ["unordered-list", "ordered-list"]` with the message "Only paragraphs and lists are allowed", and
 * the published Om Sai entry (paragraph + list-item) passed Contentful's own publish validation.
 */
const ALWAYS_ALLOWED_NODES = new Set(['document', 'text', 'paragraph', 'list-item']);

function richTextUse(node, types = new Set(), marks = new Set()) {
  if (!node || typeof node !== 'object') return { types, marks };
  if (node.nodeType && !ALWAYS_ALLOWED_NODES.has(node.nodeType)) types.add(node.nodeType);
  for (const m of node.marks ?? []) marks.add(m.type);
  for (const c of node.content ?? []) richTextUse(c, types, marks);
  return { types, marks };
}

export function checkValue(def, value) {
  const p = [];
  const id = def.id;
  const vals = def.validations ?? [];
  if (def.disabled || def.omitted) p.push(`${id}: field is disabled/omitted in the schema`);
  const t = def.type;
  if (t === 'Symbol' || t === 'Text') {
    if (typeof value !== 'string') return [...p, `${id}: expected string`];
    if (t === 'Symbol' && value.length > 256) p.push(`${id}: Symbol longer than 256`);
    for (const v of vals) {
      if (v.in && !v.in.includes(value)) p.push(`${id}: "${value}" not in allowed values`);
      if (v.size && ((v.size.max !== undefined && value.length > v.size.max) || (v.size.min !== undefined && value.length < v.size.min))) p.push(`${id}: length ${value.length} outside ${canon(v.size)}`);
      if (v.regexp && !new RegExp(v.regexp.pattern, v.regexp.flags ?? '').test(value)) p.push(`${id}: does not match /${v.regexp.pattern}/`);
    }
  } else if (t === 'RichText') {
    if (value?.nodeType !== 'document') return [...p, `${id}: expected a rich-text document`];
    const { types, marks } = richTextUse(value);
    for (const v of vals) {
      if (v.enabledNodeTypes) for (const n of types) if (!v.enabledNodeTypes.includes(n)) p.push(`${id}: node type ${n} is not enabled`);
      if (v.enabledMarks) for (const m of marks) if (!v.enabledMarks.includes(m)) p.push(`${id}: mark ${m} is not enabled`);
    }
  } else if (t === 'Boolean') { if (typeof value !== 'boolean') p.push(`${id}: expected boolean`);
  } else if (t === 'Date') { if (typeof value !== 'string' || Number.isNaN(Date.parse(value))) p.push(`${id}: expected an ISO date`);
  } else if (t === 'Integer' || t === 'Number') {
    if (typeof value !== 'number' || (t === 'Integer' && !Number.isInteger(value))) p.push(`${id}: expected ${t}`);
    for (const v of vals) if (v.range && ((v.range.min !== undefined && value < v.range.min) || (v.range.max !== undefined && value > v.range.max))) p.push(`${id}: ${value} outside ${canon(v.range)}`);
  } else if (t === 'Link') { if (value?.sys?.type !== 'Link') p.push(`${id}: expected a link`);
  } else p.push(`${id}: unsupported field type ${t}`);
  return p;
}

/** `complete`: the fields object is the whole entry, so required fields must be present. */
export function validateFields(ct, fields, { complete = true } = {}) {
  const defs = new Map(ct.fields.map((f) => [f.id, f]));
  const p = [];
  for (const [k, v] of Object.entries(fields)) {
    const d = defs.get(k);
    if (!d) { p.push(`${ct.sys.id}.${k}: no such field in the live content type`); continue; }
    p.push(...checkValue(d, v).map((x) => `${ct.sys.id}.${x}`));
  }
  if (complete) for (const d of ct.fields) if (d.required && !(d.id in fields)) p.push(`${ct.sys.id}.${d.id}: required but not provided`);
  return p;
}

function linkTarget(ct, fieldId) {
  const f = ct.fields.find((x) => x.id === fieldId);
  must(f && f.type === 'Link', `caseStudies.${fieldId} is not a link field in the live schema`);
  const ids = (f.validations ?? []).flatMap((v) => v.linkContentType ?? []);
  must(ids.length === 1, `caseStudies.${fieldId}: cannot resolve one linked content type ([${ids.join(', ')}])`);
  return ids[0];
}

/* ------------------------------------------------------------------ plan */

const routeOf = (r) => r.replace(/^\/portfolio\//, '');
/** Turns the manifest into the exact writes. Pure; unit-tested. */
export function buildPlan(src) {
  must(Array.isArray(src?.entries) && src.entries.length === 20 && src.publicListing === 20, 'manifest must carry the 20 public entries');
  const created = [];
  const ids = new Set();
  const addId = (id, what) => { must(typeof id === 'string' && ID_RE.test(id), `invalid planned entry id ${id} (${what})`); must(!ids.has(id), `duplicate planned entry id ${id}`); ids.add(id); };
  for (const i of src.linkedEntriesToCreate?.newIndustries ?? []) { addId(i.id, 'industry'); created.push({ key: `industry.${i.id}`, role: 'industry', id: i.id, fields: clean({ name: i.name }) }); }
  for (const c of src.linkedEntriesToCreate?.newClients ?? []) { addId(c.id, 'client'); created.push({ key: `client.${c.id}`, role: 'client', id: c.id, fields: clean({ clientName: c.clientName }) }); }
  const staged = [];
  for (const e of src.entries) {
    const slug = routeOf(e.route); const f = e.fields;
    if (e.action.startsWith('NO CHANGE')) { must((e.changedFields ?? []).length === 0, `${slug}: marked no change but lists changed fields`); continue; }
    must(f.showTestimonial === false, `${slug}: showTestimonial must be false`);
    must(Number.isInteger(e.listingOrder) && e.listingOrder >= 1 && e.listingOrder <= 20, `${slug}: invalid listingOrder`);
    must(!(e.missingAssets ?? []).length, `${slug}: missing repository assets ${e.missingAssets}`);
    const clientId = e.clientEntry.id, industryId = e.industryEntry.id;
    if (e.action.startsWith('CREATE')) {
      addId(e.entryId, 'study');
      must(e.clientEntry.create || e.clientEntry.reuse, `${slug}: client plan`); must(e.industryEntry.create || e.industryEntry.reuse, `${slug}: industry plan`);
      const set = clean({ title: f.title, slug: e.slug, summary: f.summary, problem: f.problem, whatWeDid: f.whatWeDid, impact: f.impact, evidenceNote: f.evidenceNote, showTestimonial: false, sector: f.sector, serviceKey: f.serviceKey, periodStart: f.periodStart, periodEnd: f.periodEnd, listingOrder: e.listingOrder });
      created.push({ key: `study.${slug}`, role: 'study', id: e.entryId, fields: { ...set, clientName: link(clientId), industry: link(industryId) } });
    } else if (e.action.startsWith('UPDATE')) {
      must(EXISTING_IDS[slug] === e.entryId, `${slug}: entry id ${e.entryId} is not the known live id`);
      must(!NEVER_WRITE.has(e.entryId), `${slug}: never written`);
      const names = (e.changedFields ?? []).filter((k) => STUDY_FIELDS.includes(k));
      must(names.length > 0, `${slug}: no changed fields`);
      const set = Object.fromEntries(names.map((k) => [k, k === 'listingOrder' ? e.listingOrder : f[k]]));
      if (e.clientEntry.replaces) { must(e.clientEntry.create, `${slug}: replacement client must be created`); set.clientName = link(clientId); }
      staged.push({ key: slug, id: e.entryId, set: clean(set), expect: { slug: e.slug } });
    } else must(false, `${slug}: unknown action ${e.action}`);
  }
  must(src.unlisted?.length === 1 && src.unlisted[0].entryId === '4zQL4P8SR2xogxHN4qFfUl', 'Home Decor must be the one unlisted entry and is not written');
  return { created, staged };
}

const find = async (api, type, params) =>
  (await api('GET', `/entries?${new URLSearchParams({ content_type: type, limit: '100', ...params })}`)).items ?? [];
const getOrNull = async (api, id) => {
  try { return await api('GET', `/entries/${encodeURIComponent(id)}`); } catch (e) { if (e.status === 404) return null; throw e; }
};
const isPublishedClean = (e) => Boolean(e.sys.publishedVersion) && e.sys.version === e.sys.publishedVersion + 1;

/* ------------------------------------------------------------------ check */

export async function runCheck({ api, src }) {
  const problems = []; const info = [];
  const def = ((await api('GET', '/locales')).items ?? []).filter((l) => l.default);
  must(def.length === 1, 'cannot determine the default locale');
  const L = def[0].code;
  const sp = await api('GET', '', { env: false });
  const env = await api('GET', '');
  must(env.sys?.id === ENVIRONMENT, `environment is ${env.sys?.id}, expected ${ENVIRONMENT}`);
  info.push(`space "${sp.name}" (${sp.sys.id}), environment ${env.sys.id}, default locale ${L}`);

  const cts = new Map(((await api('GET', '/content_types?limit=1000')).items ?? []).map((c) => [c.sys.id, c]));
  const studyCt = cts.get('caseStudies');
  must(studyCt, 'content type caseStudies not found');
  const types = { study: 'caseStudies', client: linkTarget(studyCt, 'clientName'), industry: linkTarget(studyCt, 'industry') };
  for (const t of Object.values(types)) must(cts.has(t), `content type ${t} not found`);
  info.push(`content types: ${canon(types)}`);

  const plan = buildPlan(src);

  // New entries: schema, fixed-ID state, duplicates by natural key.
  const newState = {};
  for (const c of plan.created) {
    const type = types[c.role];
    problems.push(...validateFields(cts.get(type), c.fields).map((x) => `${c.key}: ${x}`));
    const e = await getOrNull(api, c.id);
    if (!e) newState[c.key] = 'absent (will be created)';
    else {
      const same = e.sys.contentType?.sys?.id === type && canon(clean(unlocalise(e.fields, L))) === canon(c.fields);
      if (e.sys.publishedVersion || e.sys.archivedVersion) problems.push(`${c.key}: ${c.id} exists and is published/archived`);
      else if (!same) problems.push(`${c.key}: ${c.id} exists with different content; resolve manually`);
      newState[c.key] = same ? 'exists as an identical draft (will be skipped)' : 'exists, DIFFERENT';
    }
    const key = c.role === 'study' ? { 'fields.slug': c.fields.slug } : c.role === 'client' ? { 'fields.clientName': c.fields.clientName } : { 'fields.name': c.fields.name };
    const dupes = (await find(api, type, key)).filter((x) => x.sys.id !== c.id);
    if (dupes.length) problems.push(`${c.key}: other ${type} entries already use ${canon(key)}: ${dupes.map((x) => x.sys.id).join(', ')}`);
  }

  // Existing entries: published with no pending draft; untouched fields stay valid; targets empty or already equal.
  const existingState = {};
  for (const s of plan.staged) {
    const e = await api('GET', `/entries/${encodeURIComponent(s.id)}`);
    const cur = unlocalise(e.fields, L);
    if (e.sys.contentType?.sys?.id !== 'caseStudies') problems.push(`${s.key}: ${s.id} is not a caseStudies entry`);
    for (const [k, v] of Object.entries(s.expect)) if (cur[k] !== v) problems.push(`${s.key}: ${k} is ${JSON.stringify(cur[k])}, expected ${JSON.stringify(v)} (unchanged)`);
    problems.push(...validateFields(studyCt, s.set, { complete: false }).map((x) => `${s.key}: ${x}`));
    const fieldState = Object.keys(s.set).map((f) => (cur[f] === undefined ? 'empty' : canon(cur[f]) === canon(s.set[f]) ? 'equal' : 'DIFFERENT'));
    const staged = fieldState.every((x) => x === 'equal');
    if (!e.sys.publishedVersion) problems.push(`${s.key}: ${s.id} is not published`);
    else if (!isPublishedClean(e) && !staged) problems.push(`${s.key}: ${s.id} has unpublished draft changes (version ${e.sys.version}, published ${e.sys.publishedVersion})`);
    existingState[s.key] = { id: s.id, version: e.sys.version, publishedVersion: e.sys.publishedVersion ?? null, targets: staged ? 'already staged' : `will replace ${Object.keys(s.set).filter((_, i) => fieldState[i] !== 'equal').join(', ')}` };
  }

  // Listing order: no entry outside this plan may carry a listingOrder (Om Sai keeps its live order 1; Home Decor has none).
  const planned = new Set([...plan.created.map((c) => c.id), ...plan.staged.map((x) => x.id), 'Cv42tYFJsR1br2z5gsjtT']);
  const ordered = (await find(api, 'caseStudies', { 'fields.listingOrder[exists]': 'true' })).filter((x) => !planned.has(x.sys.id));
  if (ordered.length) problems.push(`listing order: other caseStudies entries already have listingOrder: ${ordered.map((x) => x.sys.id).join(', ')}`);

  return { ok: problems.length === 0, problems, info, locale: L, types, plan, newState, existingState };
}

/* ------------------------------------------------------------------ create (new entries only) */

export async function runCreate({ api, src, log }) {
  const r = await runCheck({ api, src });
  must(r.ok, `check failed, nothing written:\n- ${r.problems.join('\n- ')}`);
  const { locale: L, types, plan } = r;
  const out = {};
  for (const c of plan.created) {
    const type = types[c.role];
    const e = await getOrNull(api, c.id);
    if (e) {
      must(!e.sys.publishedVersion && canon(clean(unlocalise(e.fields, L))) === canon(c.fields), `${c.key}: ${c.id} changed since check`);
      out[c.key] = { id: c.id, created: false }; log(`${c.key}: identical draft already exists ${c.id} (skipped)`); continue;
    }
    await api('PUT', `/entries/${encodeURIComponent(c.id)}`, { contentType: type, body: { fields: localise(c.fields, L) } });
    out[c.key] = { id: c.id, created: true }; log(`${c.key}: created draft ${c.id}`);
  }
  return { out, verify: await verifyCreated({ api, r }) };
}

export async function verifyCreated({ api, r }) {
  const res = {};
  for (const c of r.plan.created) {
    const e = await api('GET', `/entries/${encodeURIComponent(c.id)}`);
    res[c.key] = {
      id: c.id, contentType: e.sys.contentType?.sys?.id, version: e.sys.version, unpublished: !e.sys.publishedVersion,
      archived: Boolean(e.sys.archivedVersion), fieldsMatch: canon(clean(unlocalise(e.fields, r.locale))) === canon(c.fields),
      typeMatch: e.sys.contentType?.sys?.id === r.types[c.role],
      extraLocales: Object.values(e.fields ?? {}).some((v) => Object.keys(v).some((l) => l !== r.locale)),
    };
  }
  res.ok = Object.values(res).every((x) => x.unpublished && !x.archived && x.fieldsMatch && x.typeMatch && !x.extraLocales);
  return res;
}

/* ------------------------------------------------------------------ snapshot / stage / restore (existing entries) */

const sanitise = (e) => ({ sys: { id: e.sys.id, contentType: e.sys.contentType?.sys?.id, version: e.sys.version, publishedVersion: e.sys.publishedVersion ?? null, archivedVersion: e.sys.archivedVersion ?? null }, fields: e.fields ?? {} });

export async function runSnapshot({ api }) {
  const def = ((await api('GET', '/locales')).items ?? []).filter((l) => l.default);
  must(def.length === 1, 'cannot determine the default locale');
  const entries = {}; const problems = [];
  for (const [k, id] of Object.entries(EXISTING_IDS)) {
    const e = await api('GET', `/entries/${encodeURIComponent(id)}`);
    entries[k] = sanitise(e);
    if (!isPublishedClean(e)) problems.push(`${k}: not in a clean published state (version ${e.sys.version}, published ${e.sys.publishedVersion ?? 'never'})`);
  }
  return { ok: problems.length === 0, problems, defaultLocale: def[0].code, takenAt: new Date().toISOString(), entries };
}

/** The draft fields after staging: the snapshot's fields (all locales, untouched) plus the targets in the default locale. */
const mergedFields = (snap, set, L) => ({ ...snap.fields, ...localise(set, L) });

async function moveExisting({ api, src, snapshot, log, direction }) {
  must(snapshot?.ok === true && snapshot.entries, 'snapshot is not an ok snapshot');
  const L = snapshot.defaultLocale;
  const plan = buildPlan(src);
  const status = {};
  // Preflight: read all four, decide each one's state before any write.
  const steps = [];
  for (const s of plan.staged) {
    const snap = snapshot.entries[s.key];
    must(snap?.sys?.id === s.id, `snapshot lacks ${s.key}`);
    const want = mergedFields(snap, s.set, L);
    const e = await api('GET', `/entries/${encodeURIComponent(s.id)}`);
    must(e.sys.publishedVersion === snap.sys.publishedVersion, `${s.key}: published version changed since the snapshot (${snap.sys.publishedVersion} -> ${e.sys.publishedVersion}); take a new snapshot`);
    const atSnap = canon(e.fields) === canon(snap.fields);
    const atTarget = canon(e.fields) === canon(want);
    must(atSnap || atTarget, `${s.key}: draft differs from both the snapshot and the target; someone edited it. Nothing written.`);
    must(!atSnap || e.sys.version === snap.sys.version, `${s.key}: entry version changed since the snapshot (${snap.sys.version} -> ${e.sys.version}); take a new snapshot. Nothing written.`);
    const target = direction === 'stage' ? want : snap.fields;
    steps.push({ s, e, target, done: canon(e.fields) === canon(target) });
  }
  for (const { s, e, target, done } of steps) {
    if (done) { status[s.key] = 'already in target state (skipped)'; log(`${s.key}: skipped`); continue; }
    await api('PUT', `/entries/${encodeURIComponent(s.id)}`, { version: e.sys.version, body: { fields: target } });
    status[s.key] = direction === 'stage' ? 'draft staged' : 'draft restored to snapshot'; log(`${s.key}: ${status[s.key]}`);
  }
  // Verify: draft content, published version unchanged, legacy fields byte-identical to the snapshot.
  const problems = [];
  for (const { s, target } of steps) {
    const e = await api('GET', `/entries/${encodeURIComponent(s.id)}`);
    const snap = snapshot.entries[s.key];
    if (canon(e.fields) !== canon(target)) problems.push(`${s.key}: draft not in the expected state`);
    if (e.sys.publishedVersion !== snap.sys.publishedVersion) problems.push(`${s.key}: published version changed`);
    for (const [f, v] of Object.entries(snap.fields)) if (!(f in s.set) && canon(e.fields[f]) !== canon(v)) problems.push(`${s.key}: untouched field ${f} changed`);
  }
  return { ok: problems.length === 0, problems, status };
}
export const runStage = (o) => moveExisting({ ...o, direction: 'stage' });
export const runRestore = (o) => moveExisting({ ...o, direction: 'restore' });

/* ------------------------------------------------------------------ publish / rollback-publish (release step) */

/**
 * PUBLISH ORDER. Contentful publishes ONE ENTRY AT A TIME: there is no transaction across entries, so a release is a sequence and any call can fail
 * part-way. The order is therefore chosen so that EVERY intermediate state is valid and presentable:
 *   1. industries, then clients (a published entry may only link to published entries);
 *   2. the four existing studies (their final copy and listing order 2 to 5; Ameba links its new client). The gate in the code opens per entry;
 *   3. the 15 new studies in listing order 6 to 20, so the public listing is always a contiguous run 1..n and never has gaps or odd ordering.
 * Re-running after any failure is safe: published entries are skipped and everything is re-checked first.
 */
function publishOrder(plan) {
  const byRole = (r) => plan.created.filter((c) => c.role === r).map((c) => ({ key: c.key, id: c.id, isNew: true, c }));
  const studies = byRole('study').sort((x, y) => x.c.fields.listingOrder - y.c.fields.listingOrder);
  return [...byRole('industry'), ...byRole('client'), ...plan.staged.map((s) => ({ key: s.key, id: s.id, isNew: false, s })), ...studies];
}
const isClean = (e) => Boolean(e.sys.publishedVersion) && e.sys.version === e.sys.publishedVersion + 1;

/** Reads all ten and classifies each: 'published' (final), 'ready' (draft in the target state), or 'other' (stop). */
async function classifyAll({ api, src, snapshot, direction }) {
  must(snapshot?.ok === true && snapshot.entries, 'snapshot is not an ok snapshot');
  const L = snapshot.defaultLocale;
  const plan = buildPlan(src);
  const items = [];
  for (const o of publishOrder(plan)) {
    const e = await getOrNull(api, o.id);
    must(e, `${o.key}: ${o.id} not found; nothing written`);
    let state = 'other'; let why = '';
    if (o.isNew) {
      const same = e.sys.contentType?.sys?.id && canon(clean(unlocalise(e.fields, L))) === canon(o.c.fields);
      const noExtraLocales = !Object.values(e.fields ?? {}).some((v) => Object.keys(v).some((l) => l !== L));
      if (e.sys.archivedVersion) why = 'archived';
      else if (!same || !noExtraLocales) why = 'content differs from the approved plan';
      else if (direction === 'publish') state = e.sys.publishedVersion ? (isClean(e) ? 'published' : 'other') : 'ready';
      else state = e.sys.publishedVersion ? (isClean(e) ? 'published' : 'other') : 'draft';
      if (state === 'other' && !why) why = 'published with unpublished changes';
      items.push({ ...o, e, state, why });
    } else {
      const snap = snapshot.entries[o.s.key];
      const target = mergedFields(snap, o.s.set, L);
      const atTarget = canon(e.fields) === canon(target); const atSnap = canon(e.fields) === canon(snap.fields);
      if (e.sys.archivedVersion) why = 'archived';
      else if (direction === 'publish') {
        if (!atTarget) why = 'draft is not the staged target (staged? edited since?)';
        else if (isClean(e) && e.sys.publishedVersion > snap.sys.publishedVersion) state = 'published';
        else if (e.sys.publishedVersion === snap.sys.publishedVersion && e.sys.version === snap.sys.version + 1) state = 'ready';
        else why = `unexpected versions (version ${e.sys.version}, published ${e.sys.publishedVersion}; snapshot ${snap.sys.version}/${snap.sys.publishedVersion})`;
      } else {
        if (atSnap && isClean(e)) state = 'published'; // already back on the snapshot content, live
        else if (atSnap || atTarget) state = 'ready';
        else why = 'draft differs from both the snapshot and the target';
      }
      items.push({ ...o, e, snap, target, state, why });
    }
  }
  const bad = items.filter((i) => i.state === 'other');
  must(bad.length === 0, `preflight stopped, nothing written:\n- ${bad.map((i) => `${i.key}: ${i.why || 'unexpected state'}`).join('\n- ')}`);
  return { L, plan, items };
}

const publishOne = (api, i) => api('PUT', `/entries/${encodeURIComponent(i.id)}/published`, { version: i.e.sys.version });

export async function runPublish({ api, src, snapshot, log }) {
  const { L, items } = await classifyAll({ api, src, snapshot, direction: 'publish' });
  const status = {};
  for (const i of items) {
    if (i.state === 'published') { status[i.key] = 'already published (skipped)'; log(`${i.key}: skipped`); continue; }
    const fresh = await api('GET', `/entries/${encodeURIComponent(i.id)}`);
    must(fresh.sys.version === i.e.sys.version, `${i.key}: changed since preflight (version ${i.e.sys.version} -> ${fresh.sys.version}); re-run`);
    const r = await publishOne(api, i);
    status[i.key] = `published (version ${r.sys.publishedVersion})`; log(`${i.key}: ${status[i.key]}`);
  }
  const problems = []; const live = {};
  for (const i of items) {
    const e = await api('GET', `/entries/${encodeURIComponent(i.id)}`);
    live[i.key] = { id: i.id, publishedVersion: e.sys.publishedVersion ?? null, previousPublishedVersion: i.snap?.sys.publishedVersion ?? null };
    if (!isClean(e)) problems.push(`${i.key}: not cleanly published (version ${e.sys.version}, published ${e.sys.publishedVersion ?? 'never'})`);
    if (i.isNew ? canon(clean(unlocalise(e.fields, L))) !== canon(i.c.fields) : canon(e.fields) !== canon(i.target)) problems.push(`${i.key}: published content is not the approved target`);
    if (!i.isNew) for (const [f, v] of Object.entries(i.snap.fields)) if (!(f in i.s.set) && canon(e.fields[f]) !== canon(v)) problems.push(`${i.key}: untouched field ${f} changed`);
  }
  return { ok: problems.length === 0, problems, status, live };
}

export async function runRollbackPublish({ api, src, snapshot, log }) {
  const { items } = await classifyAll({ api, src, snapshot, direction: 'rollback' });
  const status = {};
  const unpublish = async (i) => {
    if (i.state === 'draft') { status[i.key] = 'already unpublished (skipped)'; log(`${i.key}: skipped`); return; }
    const e = await api('GET', `/entries/${encodeURIComponent(i.id)}`);
    await api('DELETE', `/entries/${encodeURIComponent(i.id)}/published`, { version: e.sys.version });
    status[i.key] = 'unpublished (draft kept)'; log(`${i.key}: ${status[i.key]}`);
  };
  const newStudies = items.filter((x) => x.isNew && x.c.role === 'study').reverse(); // highest listing order first, so the listing stays contiguous
  const newLinked = items.filter((x) => x.isNew && x.c.role !== 'study').reverse();    // clients, then industries, after nothing links to them
  // 1. the new studies unpublished (drafts are kept)
  for (const i of newStudies) await unpublish(i);
  // 2. the four existing entries back to the snapshot content, live (restore the draft, then publish it); Ameba links its old client again
  for (const i of items.filter((x) => !x.isNew).reverse()) { // highest listing order first, so the listing stays contiguous while orders are removed
    if (i.state === 'published') { status[i.key] = 'already on snapshot content (skipped)'; log(`${i.key}: skipped`); continue; }
    let e = await api('GET', `/entries/${encodeURIComponent(i.id)}`);
    must(e.sys.version === i.e.sys.version, `${i.key}: changed since preflight; re-run`);
    if (canon(e.fields) !== canon(i.snap.fields)) e = await api('PUT', `/entries/${encodeURIComponent(i.id)}`, { version: e.sys.version, body: { fields: i.snap.fields } });
    const r = await publishOne(api, { id: i.id, e });
    status[i.key] = `restored and republished (version ${r.sys.publishedVersion})`; log(`${i.key}: ${status[i.key]}`);
  }
  // 3. the new clients and industries unpublished (nothing links to them any more)
  for (const i of newLinked) await unpublish(i);
  const problems = [];
  for (const i of items) {
    const e = await api('GET', `/entries/${encodeURIComponent(i.id)}`);
    if (i.isNew) { if (e.sys.publishedVersion) problems.push(`${i.key}: still published`); continue; }
    if (canon(e.fields) !== canon(i.snap.fields)) problems.push(`${i.key}: content is not the snapshot`);
    if (!isClean(e)) problems.push(`${i.key}: not cleanly published`);
  }
  return { ok: problems.length === 0, problems, status };
}

/* ------------------------------------------------------------------ CLI */

const MODES = ['check', 'create', 'snapshot', 'stage-existing', 'restore-existing', 'publish', 'rollback-publish'];
export const CONFIRM = {
  create: (sp) => `${sp}/${ENVIRONMENT}`,
  'stage-existing': (sp) => `STAGE ${sp}/${ENVIRONMENT}`,
  'restore-existing': (sp) => `RESTORE ${sp}/${ENVIRONMENT}`,
  publish: (sp) => `PUBLISH ${sp}/${ENVIRONMENT}`,
  'rollback-publish': (sp) => `ROLLBACK ${sp}/${ENVIRONMENT}`,
};

export async function main(argv, env, fetchImpl = fetch) {
  const [mode, ...rest] = argv;
  const a = Object.fromEntries(rest.reduce((acc, x, i, arr) => (x.startsWith('--') ? [...acc, [x.slice(2), arr[i + 1]]] : acc), []));
  must(MODES.includes(mode), `usage: release.mjs ${MODES.join('|')} --space ID --out DIR [--source JSON] [--snapshot JSON] [--confirm TEXT]`);
  must(a.space === SPACE, `this tool is restricted to space ${SPACE}`);
  const needs = { check: ['source'], create: ['source'], snapshot: [], 'stage-existing': ['source', 'snapshot'], 'restore-existing': ['source', 'snapshot'], publish: ['source', 'snapshot'], 'rollback-publish': ['source', 'snapshot'] }[mode];
  for (const k of ['out', ...needs]) must(a[k], `--${k} is required`);
  if (CONFIRM[mode]) must(a.confirm === CONFIRM[mode](a.space), `--confirm must equal "${CONFIRM[mode](a.space)}"`);
  const token = env.CONTENTFUL_MANAGEMENT_TOKEN;
  must(token, 'CONTENTFUL_MANAGEMENT_TOKEN is not set');
  const src = a.source ? JSON.parse(readFileSync(a.source, 'utf8')) : null;
  const plan = src ? buildPlan(src) : null;
  const existingIds = plan?.staged.map((s) => s.id) ?? []; const newIds = plan?.created.map((c) => c.id) ?? [];
  const allowWrite = new Set(mode === 'create' ? newIds : mode.endsWith('-existing') || mode === 'rollback-publish' ? existingIds : []);
  const allowPublish = new Set(mode === 'publish' || mode === 'rollback-publish' ? [...newIds, ...existingIds] : []);
  const allowUnpublish = new Set(mode === 'rollback-publish' ? newIds : []);
  const api = makeApi({ space: a.space, token, base: a.base, fetchImpl, allowWrite, allowPublish, allowUnpublish });
  const log = (m) => process.stderr.write(`${m}\n`);
  mkdirSync(a.out, { recursive: true, mode: 0o700 });
  const w = (n, d) => writeFileSync(join(a.out, n), `${JSON.stringify(d, null, 2)}\n`, { mode: 0o600 });

  if (mode === 'check') {
    const r = await runCheck({ api, src });
    w('check.json', { ok: r.ok, problems: r.problems, info: r.info, types: r.types, newState: r.newState, existingState: r.existingState, writes: api.writes });
    r.info.forEach((i) => log(`INFO  ${i}`));
    Object.entries(r.newState).forEach(([k, v]) => log(`NEW   ${k.padEnd(18)} ${v}`));
    Object.entries(r.existingState).forEach(([k, v]) => log(`EXIST ${k.padEnd(18)} ${v.id} v${v.version} published v${v.publishedVersion} targets ${v.targets}`));
    r.problems.forEach((p) => log(`BLOCK ${p}`));
    log(r.ok ? 'CHECK PASSED (read-only, nothing written)' : 'CHECK FAILED');
    return r.ok ? 0 : 2;
  }
  if (mode === 'snapshot') {
    const r = await runSnapshot({ api });
    w('snapshot.json', r);
    log(r.ok ? `SNAPSHOT SAVED: ${join(a.out, 'snapshot.json')}` : `SNAPSHOT SAVED WITH PROBLEMS (stage will refuse it):\n- ${r.problems.join('\n- ')}`);
    return r.ok ? 0 : 2;
  }
  if (mode === 'create') {
    let r;
    try { r = await runCreate({ api, src, log }); } catch (e) { w('create.json', { ok: false, problems: [e.message], writes: api.writes }); throw e; }
    w('create.json', { ...r, writes: api.writes });
    log(JSON.stringify(r.verify, null, 2));
    log(r.verify.ok ? 'CREATE + VERIFY PASSED (unpublished drafts; nothing published; existing entries untouched)' : 'VERIFY FAILED');
    return r.verify.ok ? 0 : 3;
  }
  const snapshot = JSON.parse(readFileSync(a.snapshot, 'utf8'));
  const run = { 'stage-existing': runStage, 'restore-existing': runRestore, publish: runPublish, 'rollback-publish': runRollbackPublish }[mode];
  let r;
  try { r = await run({ api, src, snapshot, log }); } catch (e) { w(`${mode}.json`, { ok: false, problems: [e.message], writes: api.writes }); throw e; }
  w(`${mode}.json`, { ...r, writes: api.writes });
  r.problems.forEach((p) => log(`PROBLEM ${p}`));
  const tail = mode === 'publish' ? 'planned entries published; nothing else touched' : mode === 'rollback-publish' ? 'live content back on the snapshot; new entries unpublished' : 'drafts only; published versions unchanged';
  log(r.ok ? `${mode.toUpperCase()} + VERIFY PASSED (${tail})` : `${mode.toUpperCase()} VERIFY FAILED`);
  return r.ok ? 0 : 4;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv.slice(2), process.env).then((c) => process.exit(c), (e) => { process.stderr.write(`ABORT: ${e.message}\n`); process.exit(1); });
}
