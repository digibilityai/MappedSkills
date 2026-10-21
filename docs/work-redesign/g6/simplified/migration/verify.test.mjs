// G6 simplified (from G6-S2B) — offline tests for verify.mjs / verify.sh. Fake fetch only: no network, no token, no Contentful.
// Run: node --test docs/work-redesign/g6/simplified/migration/verify.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LEGACY_ENTRIES, VerifyGuardError, createReadOnlyClient, reportMarkdown, verify } from './verify.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const TOKEN = 'CFPAT-synthetic-test-token-0123456789abcdef';
const SPACE = 'prodspace01';

const link = (id, target) => ({ id, name: id, type: 'Link', linkType: 'Entry', localized: false, required: true, disabled: false, omitted: false, validations: [{ linkContentType: [target] }] });
const fields = () => [
  { id: 'title', name: 'Title', type: 'Symbol', localized: false, required: true, validations: [] },
  { id: 'slug', name: 'Slug', type: 'Symbol', localized: false, required: true, validations: [] },
  link('clientName', 'caseClient'), link('industry', 'caseIndustry'), link('size', 'caseCompanySize'),
  link('audience', 'caseTargetAudience'), link('targetArea', 'caseGeographicTarget'),
  { id: 'content', name: 'Content', type: 'RichText', localized: false, required: false, validations: [] },
  link('review', 'caseTestimonial'),
  { id: 'conclusion', name: 'Conclusion', type: 'RichText', localized: false, required: false, validations: [] },
];
const entry = (id, slug, published = true) => ({ sys: { id, version: published ? 5 : 3, publishedVersion: published ? 4 : undefined }, fields: { slug: { 'en-US': slug } } });
const legacy = () => [...Object.entries(LEGACY_ENTRIES).map(([id, s]) => entry(id, s)), entry('historicalDraft000001', 'portfolio/older-study', false)];

function world(over = {}) {
  const w = {
    space: { sys: { id: SPACE }, name: 'MappedSkills' },
    envs: [{ sys: { id: 'master', status: { sys: { id: 'ready' } } } }, { sys: { id: 'staging', status: { sys: { id: 'ready' } } } }],
    aliases: { items: [{ sys: { id: 'master' }, environment: { sys: { id: 'master' } } }] },
    cts: { master: fields(), staging: fields() },
    entries: { master: legacy(), staging: legacy() },
    linked: ['caseClient', 'caseIndustry', 'caseCompanySize', 'caseTargetAudience', 'caseGeographicTarget', 'caseTestimonial'],
    ...over,
  };
  const calls = [];
  const json = (status, body) => ({ status, ok: status < 400, headers: { get: () => null }, text: async () => JSON.stringify(body) });
  const fetchImpl = async (url, { method }) => {
    calls.push({ method, url });
    const p = url.replace('https://api.contentful.com', '');
    let m;
    if (p === `/spaces/${SPACE}`) return json(200, w.space);
    if (p === `/spaces/${SPACE}/environments`) return json(200, { items: w.envs });
    if (p === `/spaces/${SPACE}/environment_aliases`) return w.aliases ? json(200, w.aliases) : json(404, {});
    if ((m = p.match(/environments\/(\w+)\/content_types\/(\w+)$/))) {
      if (m[2] === 'caseStudies') return w.cts[m[1]]
        ? json(200, { sys: { id: 'caseStudies', version: 11, publishedVersion: 10 }, name: 'Case Studies', displayField: 'title', fields: w.cts[m[1]] }) : json(404, {});
      return w.linked.includes(m[2]) ? json(200, { sys: { id: m[2], version: 2, publishedVersion: 1 }, name: m[2], fields: [] }) : json(404, {});
    }
    if ((m = p.match(/environments\/(\w+)\/entries\?/))) { const items = w.entries[m[1]]; return json(200, { total: items.length, items }); }
    return json(404, {});
  };
  return { w, calls, client: createReadOnlyClient({ token: TOKEN, spaceId: SPACE, fetchImpl }) };
}
const run = async (over, prod = SPACE) => { const h = world(over); const r = await verify(h.client, { spaceId: SPACE, prodSpaceId: prod }); return { ...h, ...r }; };
const failed = (r) => r.checks.filter((c) => c.level === 'FAIL').map((c) => c.id);

test('clean clone passes every check and every request is a GET', async () => {
  const r = await run();
  assert.deepEqual(failed(r), []);
  assert.ok(r.calls.length > 10 && r.calls.every((c) => c.method === 'GET'));
});

test('client refuses anything outside the read-only allow-list (writes, other paths, other spaces, other envs)', async () => {
  const { client } = world();
  const g = client; // only exposes named reads; there is no way to pass a method
  assert.deepEqual(Object.keys(g).sort(), ['getContentType', 'getSpace', 'listAliases', 'listEntries', 'listEnvironments', 'redact', 'requests']);
  await assert.rejects(() => g.getContentType('production-copy', 'caseStudies'), VerifyGuardError);
  await assert.rejects(() => g.listEntries('master', 'caseStudies; DROP'), VerifyGuardError);
  assert.throws(() => createReadOnlyClient({ token: '', spaceId: SPACE }), VerifyGuardError);
});

test('source contains no write verb, no apply/rollback and no secret persistence', () => {
  for (const f of ['verify.mjs', 'verify.sh']) {
    const src = readFileSync(join(here, f), 'utf8').split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('#')).join('\n');
    for (const bad of ['PUT', 'POST', 'DELETE', 'PATCH', 'putContentType', 'activateContentType', 'rollback', ' apply ', 'dotenv', ".env'", '.env"', 'history', 'console.log(token', 'writeFile(join(out, \'token']) {
      assert.ok(!src.includes(bad), `${f} contains ${bad}`);
    }
  }
  const sh = readFileSync(join(here, 'verify.sh'), 'utf8');
  assert.ok(sh.includes('read -rs') && sh.includes(' plan ') && !/\bset -x\b/.test(sh.replace('set +x', '')));
});

test('production-space mismatch fails V1b', async () => assert.ok(failed(await run({}, 'someotherspace')).includes('V1b')));
test('staging missing or not ready fails V2b', async () => {
  assert.ok(failed(await run({ envs: [world().w.envs[0]] })).includes('V2b'));
  const notReady = [world().w.envs[0], { sys: { id: 'staging', status: { sys: { id: 'inProgress' } } } }];
  assert.ok(failed(await run({ envs: notReady })).includes('V2b'));
});
test('staging as an alias or alias target fails V2c', async () => {
  const asAlias = { items: [{ sys: { id: 'staging' }, environment: { sys: { id: 'master' } } }] };
  assert.ok(failed(await run({ aliases: asAlias })).includes('V2c'));
  const target = { items: [{ sys: { id: 'master' }, environment: { sys: { id: 'staging' } } }] };
  assert.ok(failed(await run({ aliases: target })).includes('V2c'));
  assert.ok(!failed(await run({ aliases: null })).includes('V2c'), 'aliases not enabled is acceptable');
});
test('content-model drift between master and staging fails V3b', async () => {
  const s = fields(); s.find((f) => f.id === 'slug').validations = [{ unique: true }];
  assert.ok(failed(await run({ cts: { master: fields(), staging: s } })).includes('V3b'));
});
test('already-migrated or drafted staging schema fails V3d', async () => {
  const s = fields(); s.push({ id: 'summary', name: 'Summary', type: 'Text', localized: false, required: false, disabled: false, omitted: false, validations: [] });
  assert.ok(failed(await run({ cts: { master: fields(), staging: s } })).includes('V3d'));
});
test('missing legacy entry, or changed slug, fails; entry count or slug difference master vs staging fails', async () => {
  const noAmeba = legacy().filter((e) => e.sys.id !== '4DpPjLCWdakD6tBmZNMnko');
  const r = await run({ entries: { master: legacy(), staging: noAmeba } });
  assert.ok(failed(r).includes('V4-4DpPj') && failed(r).includes('V4a') && failed(r).includes('V4b'));
  const renamed = legacy(); renamed[1].fields.slug['en-US'] = 'other-slug';
  assert.ok(failed(await run({ entries: { master: legacy(), staging: renamed } })).includes('V4-4zQL4'));
});
test('staging slug collision and invalid slug fail V6a with IDs', async () => {
  const bad = [...legacy(), entry('collide0000000000001', 'seo-for-home-decor-brand', false), entry('badslug000000000001', 'Bad_Slug', false)];
  const r = await run({ entries: { master: bad, staging: bad } });
  assert.ok(failed(r).includes('V6a'));
  assert.ok(r.facts.blockers.some((b) => b.includes('collide0000000000001')) && r.facts.blockers.some((b) => b.includes('badslug000000000001')));
});
test('report holds no token, no full space ID and no entry content', async () => {
  const e = legacy(); e[0].fields.content = { 'en-US': { secret: 'CLIENT-CONFIDENTIAL-TEXT' } };
  const r = await run({ entries: { master: e, staging: e } });
  const md = r.client.redact(reportMarkdown(r, '2026-01-01T00:00:00Z'));
  assert.ok(!md.includes(TOKEN) && !md.includes(SPACE) && !md.includes('CLIENT-CONFIDENTIAL-TEXT'));
  assert.ok(md.includes('PASS'));
});
test('API error text that echoes the token is redacted', async () => {
  const client = createReadOnlyClient({ token: TOKEN, spaceId: SPACE, fetchImpl: async () => ({ status: 401, ok: false, headers: { get: () => null }, text: async () => JSON.stringify({ message: `bad ${TOKEN}` }) }) });
  await assert.rejects(() => client.getSpace(), (e) => !e.message.includes(TOKEN));
});

// --- SM-1 regression (2026-10-21): master and staging identical, 10 baseline fields, state "partial" ----------------
const preExisting = {
  'optional:review': (f) => { f.find((x) => x.id === 'review').required = false; },
  'optional:size': (f) => { f.find((x) => x.id === 'size').required = false; },
  'optional:audience': (f) => { f.find((x) => x.id === 'audience').required = false; },
  'optional:targetArea': (f) => { f.find((x) => x.id === 'targetArea').required = false; },
  'slug:unique': (f) => { f.find((x) => x.id === 'slug').validations = [{ unique: true }]; },
};
test('SM-1 observed state: existing-field settings already at target pass V3d and are listed', async () => {
  for (const [id, set] of [...Object.entries(preExisting), ['all', (f) => Object.values(preExisting).forEach((s) => s(f))]]) {
    const m = fields(); const s = fields(); set(m); set(s);
    const r = await run({ cts: { master: m, staging: s } });
    assert.deepEqual(failed(r), [], id);
    const v3d = r.checks.find((c) => c.id === 'V3d').text;
    assert.match(v3d, /state "partial"/, id);
    assert.match(v3d, /existing-field settings only/, id);
    if (id !== 'all') assert.ok(v3d.includes(id), id);
    const v3h = r.checks.find((c) => c.id === 'V3h');
    assert.equal(v3h.level, 'INFO');
    assert.match(v3h.text, /pending \[add:summary, add:problem/);
  }
});
test('partial that includes a new field, or an existing setting off-target, still fails V3d', async () => {
  const withNew = fields(); preExisting['optional:review'](withNew);
  withNew.push({ id: 'summary', name: 'Summary', type: 'Text', localized: false, required: false, disabled: false, omitted: false, validations: [] });
  const r1 = await run({ cts: { master: withNew, staging: structuredClone(withNew) } });
  assert.ok(failed(r1).includes('V3d'));
  assert.match(r1.checks.find((c) => c.id === 'V3d').text, /includes a new field/);
  const otherPattern = fields(); otherPattern.find((x) => x.id === 'slug').validations = [{ regexp: { pattern: '^x$' } }];
  assert.ok(failed(await run({ cts: { master: otherPattern, staging: structuredClone(otherPattern) } })).includes('V3d'));
});
test('the report lists change status by ID only (no entry content)', async () => {
  const s = fields(); preExisting['optional:review'](s);
  const md = reportMarkdown(await run({ cts: { master: structuredClone(s), staging: s } }), 't');
  assert.match(md, /\| V3h \| INFO \| Change status — staging: applied \[optional:review\]/);
});
