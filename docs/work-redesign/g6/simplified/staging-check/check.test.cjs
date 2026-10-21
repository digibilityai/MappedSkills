// Offline tests for check.cjs. Simulated Delivery API only: no network, no Contentful, no real token.
// Run: node --test docs/work-redesign/g6/simplified/staging-check/check.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { guardedFetch, runChecks, report, loadAppFrom, GuardError, LEGACY } = require('./check.cjs');

const REPO = path.resolve(__dirname, '../../../../..');
const SPACE = 'stagespace01';
const TOKEN = 'synthetic-delivery-token-0123456789';
const DRAFTS = ['xudVmwDraft0000000001', 'B63etvDraft0000000002'];
const SECRET_TEXT = 'ENTRY BODY TEXT MUST NOT APPEAR';

const p = (t) => ({ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: t, marks: [], data: {} }] });
const legacyItem = (id, slug, over = {}) => ({
  sys: { id, publishedVersion: 39, publishedAt: '2026-10-01T00:00:00Z', firstPublishedAt: '2026-09-01T00:00:00Z' },
  title: `Legacy ${id}`, slug, clientName: { clientName: 'C', date: 'D' }, industry: { name: 'I' },
  content: { json: { nodeType: 'document', data: {}, content: [p(SECRET_TEXT)] } },
  summary: null, problem: null, whatWeDid: null, impact: null, evidenceNote: null, showTestimonial: null, ...over,
});
const scalar = (name) => ({ kind: 'SCALAR', name, ofType: null, fields: null });
const rich = (name) => ({ kind: 'OBJECT', name, ofType: null, fields: [{ name: 'json' }, { name: 'links' }] });

function world({ items, types, status = 200 } = {}) {
  const fieldTypes = types ?? {
    title: scalar('String'), slug: scalar('String'), summary: scalar('String'), problem: rich('CaseStudiesProblem'),
    whatWeDid: rich('CaseStudiesWhatWeDid'), impact: rich('CaseStudiesImpact'), evidenceNote: scalar('String'), showTestimonial: scalar('Boolean'),
  };
  const all = items ?? Object.entries(LEGACY).map(([id, slug]) => legacyItem(id, slug));
  const calls = [];
  const realFetch = async (url, init) => {
    const { query } = JSON.parse(init.body);
    calls.push({ url, method: init.method, auth: init.headers.Authorization, query });
    const body = query.includes('__type') ? { data: { __type: { fields: Object.entries(fieldTypes).map(([name, type]) => ({ name, type })) } } }
      : { data: { caseStudiesCollection: { total: all.length, items: all } } };
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  };
  const requests = [];
  const fetchImpl = guardedFetch({ spaceId: SPACE, realFetch, requests });
  return { calls, requests, fetchImpl };
}

async function run(opts = {}, draftIds = DRAFTS) {
  const w = world(opts);
  const saved = { ...process.env }; const savedFetch = globalThis.fetch;
  Object.assign(process.env, { CONTENTFUL_SPACE_ID: SPACE, CONTENTFUL_ACCESS_TOKEN: TOKEN, CONTENTFUL_ENVIRONMENT: 'staging', CONTENTFUL_CASE_STUDY_NEW_FIELDS: '1' });
  // Left set on purpose: the application must still use the Delivery token for case studies (asserted below).
  process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = 'a-preview-token-that-must-not-be-used';
  globalThis.fetch = w.fetchImpl;
  try {
    const checks = await runChecks({ spaceId: SPACE, token: TOKEN, fetchImpl: w.fetchImpl, draftIds, loadApp: loadAppFrom(REPO) });
    return { ...w, checks, md: report(checks, w.requests, 't') };
  } finally { process.env = saved; globalThis.fetch = savedFetch; }
}
const failed = (r) => r.checks.filter((c) => c.level === 'FAIL').map((c) => c.id);

test('staging as migrated (three published legacy entries, drafts absent): every check passes', async () => {
  const r = await run();
  assert.deepEqual(failed(r), [], r.md);
  assert.ok(r.calls.every((c) => c.method === 'POST' && c.url === `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/staging`));
  assert.ok(r.calls.every((c) => c.auth === `Bearer ${TOKEN}`), 'Delivery token only');
  assert.ok(r.calls.some((c) => /GetAllCaseStudies/.test(c.query) && /showTestimonial/.test(c.query)), 'the application query, with the new fields');
  assert.ok(!r.md.includes(TOKEN) && !r.md.includes(SECRET_TEXT), 'no token, no entry text in the report');
});

test('guard refuses master, another space, the Preview/Management APIs and non-POST', async () => {
  const f = guardedFetch({ spaceId: SPACE, realFetch: async () => { throw new Error('must not be reached'); }, requests: [] });
  for (const url of [
    `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/master`,
    `https://graphql.contentful.com/content/v1/spaces/other/environments/staging`,
    `https://api.contentful.com/spaces/${SPACE}/environments/staging/content_types/caseStudies`,
    `https://preview.contentful.com/spaces/${SPACE}/environments/staging/entries`,
  ]) await assert.rejects(f(url, { method: 'POST' }), GuardError, url);
  await assert.rejects(f(`https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/staging`, { method: 'PUT' }), GuardError);
  assert.throws(() => guardedFetch({ spaceId: 'bad/space', realFetch: fetch, requests: [] }), GuardError);
});

test('sys.publishedVersion missing or null on a legacy entry is a release blocker (S2b and S2-* fail)', async () => {
  const items = Object.entries(LEGACY).map(([id, slug], i) => legacyItem(id, slug, i === 0 ? { sys: { id, publishedVersion: null, publishedAt: '2026-10-01T00:00:00Z' } } : {}));
  const r = await run({ items });
  assert.ok(failed(r).includes('S2b') && failed(r).includes('S2-4DpPj'));
  assert.match(r.md, /RELEASE BLOCKER/);
  assert.ok(failed(r).includes('S5a'), 'the entry is also not public, so the public set is wrong');
});

test('a draft returned by the API fails S3 but is still not publicly eligible', async () => {
  const items = [...Object.entries(LEGACY).map(([id, slug]) => legacyItem(id, slug)),
    legacyItem(DRAFTS[0], 'some-draft', { sys: { id: DRAFTS[0], publishedVersion: null, publishedAt: null } })];
  const r = await run({ items });
  assert.ok(failed(r).includes('S3'));
  assert.ok(!failed(r).includes('S5a'), 'eligibility still withholds it');
});

test('a field with the wrong type, or missing, fails S1', async () => {
  const types = { summary: scalar('String'), problem: scalar('String'), whatWeDid: rich('W'), impact: rich('I'), evidenceNote: scalar('String') };
  const r = await run({ types });
  assert.ok(failed(r).includes('S1'));
  assert.match(r.checks.find((c) => c.id === 'S1').text, /problem richtext → scalar:String.*showTestimonial scalar:Boolean → MISSING/);
});

test('HTTP 401/404 from staging (token without staging access) fails clearly', async () => {
  const r = await run({ status: 404 });
  assert.ok(failed(r).includes('S1') && failed(r).includes('S2a'));
});

test('wrapper: hidden prompt, no Management or Preview token, no write verbs; check.cjs has no Management API path', () => {
  const sh = fs.readFileSync(path.join(__dirname, 'check.sh'), 'utf8');
  assert.match(sh, /read -rs TOKEN/);
  assert.match(sh, /-u CONTENTFUL_PREVIEW_ACCESS_TOKEN -u CONTENTFUL_MANAGEMENT_TOKEN/);
  const js = fs.readFileSync(path.join(__dirname, 'check.cjs'), 'utf8');
  assert.ok(!/api\.contentful\.com|preview\.contentful\.com|method: '(PUT|DELETE|PATCH)'/.test(js));
});
