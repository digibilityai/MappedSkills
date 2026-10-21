// G6 simplified — offline tests (from the reviewed S2-R1 suite). Simulated Management API; no network, no Contentful, no token.
// Run: node --test docs/work-redesign/g6/simplified/migration/migration.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  GuardError, MIGRATION_ID, NEW_FIELDS, SLUG_PATTERN, SUPERSEDED_FIELD_IDS, assertAllowedEnvironment, createCmaClient,
  inspectContentType, routeSlug, runForward, runRollback, scanEntries,
} from './migration.mjs';
import { parseArgs } from './cli.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const TOKEN = 'CFPAT-synthetic-test-token-0123456789abcdef';
const SPACE = 'testspace01';
const ENV = 'staging';

// --- fixtures (shape of TF-01 §5.1; IDs from TF-01 follow-up §2.1) -----------------------------------------------
const link = (id, target, required = true) =>
  ({ id, name: id, type: 'Link', linkType: 'Entry', localized: false, required, disabled: false, omitted: false,
    validations: [{ linkContentType: [target] }] });
const baselineFields = () => [
  { id: 'title', name: 'Title', type: 'Symbol', localized: false, required: true, validations: [] },
  { id: 'slug', name: 'Slug', type: 'Symbol', localized: false, required: true, validations: [] },
  link('clientName', 'caseClient'), link('industry', 'caseIndustry'), link('size', 'caseCompanySize'),
  link('audience', 'caseTargetAudience'), link('targetArea', 'caseGeographicTarget'),
  { id: 'content', name: 'Content', type: 'RichText', localized: false, required: false, validations: [] },
  link('review', 'caseTestimonial'),
  { id: 'conclusion', name: 'Conclusion', type: 'RichText', localized: false, required: false, validations: [] },
];
const entry = (id, slug, { published = true, extra = {}, drop = [] } = {}) => {
  const fields = { slug: { 'en-US': slug } };
  for (const l of ['clientName', 'industry', 'size', 'audience', 'targetArea', 'review']) {
    if (!drop.includes(l)) fields[l] = { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: `${id}-${l}` } } };
  }
  for (const [k, v] of Object.entries(extra)) fields[k] = { 'en-US': v };
  return { sys: { id, version: published ? 5 : 3, publishedVersion: published ? 4 : undefined }, fields };
};
const legacyEntries = () => [
  entry('4DpPjLCWdakD6tBmZNMnko', 'portfolio/seo-ameba-software'),
  entry('4zQL4P8SR2xogxHN4qFfUl', 'seo-for-home-decor-brand'),
  entry('6Ycb7aYvXrslOXKchQnqmi', 'google-ads-for-online-courses'),
  entry('historicalDraft000001', 'portfolio/older-study', { published: false }),
];

// --- simulated CMA -----------------------------------------------------------------------------------------------
function fakeCma({ fields = baselineFields(), entries = legacyEntries(), envOverride, aliases = null,
  draftPending = false, errorBody } = {}) {
  const linked = ['caseClient', 'caseIndustry', 'caseCompanySize', 'caseTargetAudience', 'caseGeographicTarget', 'caseTestimonial'];
  const cts = new Map(linked.map((id) => [id, { sys: { id, version: 2, publishedVersion: 1 }, name: id, fields: [] }]));
  const ct = { sys: { id: 'caseStudies', version: draftPending ? 12 : 11, publishedVersion: 10 }, name: 'Case Studies',
    displayField: 'title', fields: structuredClone(fields) };
  let published = structuredClone(ct.fields);
  cts.set('caseStudies', ct);
  const calls = [];
  const json = (status, body) => ({ status, ok: status < 400, headers: { get: () => null }, text: async () => JSON.stringify(body) });
  const fetchImpl = async (url, { method, headers, body }) => {
    const path = url.replace('https://api.contentful.com', '');
    calls.push({ method, path, headers });
    if (headers.Authorization !== `Bearer ${TOKEN}`) return json(401, { sys: { id: 'AccessTokenInvalid' } });
    if (errorBody) return json(500, errorBody);
    if (path === `/spaces/${SPACE}/environments/${ENV}`) {
      return json(200, envOverride ?? { name: ENV, sys: { id: ENV, status: { sys: { id: 'ready' } }, aliases: [] } });
    }
    if (path === `/spaces/${SPACE}/environment_aliases`) return aliases ? json(200, { items: aliases }) : json(404, { sys: { id: 'NotFound' } });
    const m = path.match(/content_types\/([^/?]+)(\/published)?$/);
    if (m) {
      const c = cts.get(m[1]);
      if (!c) return json(404, { sys: { id: 'NotFound' } });
      if (method === 'GET') return json(200, c);
      if (Number(headers['X-Contentful-Version']) !== c.sys.version) return json(409, { sys: { id: 'VersionMismatch' } });
      if (m[2]) { // activate
        for (const f of c.fields) {
          if (f.deleted && !published.find((p) => p.id === f.id)?.omitted) return json(422, { sys: { id: 'ValidationFailed' } });
        }
        c.fields = c.fields.filter((f) => !f.deleted);
        published = structuredClone(c.fields);
        c.sys.publishedVersion = c.sys.version;
        c.sys.version += 1;
        return json(200, c);
      }
      const b = JSON.parse(body);
      c.fields = b.fields; c.sys.version += 1;
      return json(200, c);
    }
    if (path.includes('/entries?')) return json(200, { total: entries.length, items: entries });
    return json(404, { sys: { id: 'NotFound' } });
  };
  return { fetchImpl, calls, ct, writes: () => calls.filter((c) => c.method !== 'GET') };
}

function harness(cma, mode, extra = {}) {
  const files = {}; const logs = [];
  const client = createCmaClient({ token: TOKEN, spaceId: SPACE, environmentId: ENV,
    readOnly: mode.endsWith('plan'), fetchImpl: cma.fetchImpl, sleep: async () => {} });
  const ctx = { client, mode, spaceId: SPACE, environmentId: ENV, log: (l) => logs.push(l),
    write: async (n, c) => { files[n] = c; }, now: () => '2026-10-21T00:00:00.000Z', ...extra };
  return { ctx, files, logs };
}
const fieldOf = (cma, id) => cma.ct.fields.find((f) => f.id === id);
const assertNoSecret = (h) => {
  for (const s of [...h.logs, ...Object.values(h.files)]) assert.ok(!s.includes(TOKEN) && !s.includes('CFPAT-'), 'token leaked');
};

// --- environment guards ------------------------------------------------------------------------------------------
test('rejects master, unrecognised and missing environments locally', () => {
  for (const env of [undefined, '', 'master', 'Master', 'master-2026-10-21', 'production', 'staging2', 'Staging', 'dev']) {
    assert.throws(() => assertAllowedEnvironment(env), GuardError, String(env));
    assert.throws(() => createCmaClient({ token: TOKEN, spaceId: SPACE, environmentId: env, readOnly: true }), GuardError);
  }
  assert.doesNotThrow(() => assertAllowedEnvironment('staging'));
});

test('CLI: no default environment, confirmation required for writes, tokens never accepted as arguments', () => {
  assert.throws(() => parseArgs(['plan', '--space', SPACE, '--out', 'x']), GuardError);
  assert.throws(() => parseArgs(['plan', '--space', SPACE, '--environment', 'master', '--out', 'x']), GuardError);
  assert.throws(() => parseArgs(['apply', '--space', SPACE, '--environment', ENV, '--out', 'x']), GuardError);
  assert.throws(() => parseArgs(['apply', '--space', SPACE, '--environment', ENV, '--out', 'x', '--confirm', 'staging']), GuardError);
  assert.throws(() => parseArgs(['plan', '--space', SPACE, '--environment', ENV, '--out', 'x', '--token', TOKEN]), GuardError);
  assert.throws(() => parseArgs(['plan', '--space', TOKEN, '--environment', ENV, '--out', 'x']), GuardError);
  assert.throws(() => parseArgs(['migrate', '--space', SPACE, '--environment', ENV, '--out', 'x']), GuardError);
  assert.throws(() => parseArgs(['rollback', '--space', SPACE, '--environment', ENV, '--out', 'x', '--confirm', `${SPACE}/${ENV}`]), GuardError);
  assert.equal(parseArgs(['apply', '--space', SPACE, '--environment', ENV, '--out', 'x', '--confirm', `${SPACE}/${ENV}`]).mode, 'apply');
});

test('remote guard: aliased environment, alias pointing at it, or a resolved ID mismatch is refused', async () => {
  const cases = [
    { envOverride: { sys: { id: ENV, status: { sys: { id: 'ready' } }, aliases: [{ sys: { id: 'master' } }] } } },
    { aliases: [{ sys: { id: 'master' }, environment: { sys: { id: ENV } } }] },
    { envOverride: { sys: { id: 'master-2026', status: { sys: { id: 'ready' } } } } },
    { envOverride: { sys: { id: ENV, status: { sys: { id: 'queued' } } } } },
  ];
  for (const c of cases) {
    const cma = fakeCma(c);
    await assert.rejects(runForward(harness(cma, 'apply').ctx), GuardError);
    assert.equal(cma.writes().length, 0);
  }
  // an unrelated alias is fine
  const cma = fakeCma({ aliases: [{ sys: { id: 'master' }, environment: { sys: { id: 'master-2026' } } }] });
  assert.equal(await runForward(harness(cma, 'plan').ctx), 0);
});

// --- dry run -----------------------------------------------------------------------------------------------------
test('plan: pristine schema, every change pending, zero writes, diff produced', async () => {
  const cma = fakeCma();
  const h = harness(cma, 'plan');
  assert.equal(await runForward(h.ctx), 0);
  assert.equal(cma.writes().length, 0);
  const plan = JSON.parse(h.files['plan.json']);
  assert.equal(plan.inspection.state, 'pristine');
  assert.equal(plan.inspection.counts.pending, 12);
  const diff = h.files['planned-diff.md'];
  for (const f of NEW_FIELDS) assert.match(diff, new RegExp(`\\| \`${f.id}\` \\| added`));
  for (const f of ['review', 'size', 'audience', 'targetArea']) assert.match(diff, new RegExp(`\\| \`${f}\` \\| changed \\| required \\| \`true\` \\| \`false\``));
  assert.match(diff, /\| `content` \| unchanged/);
  const report = JSON.parse(h.files['before-entries-report.json']);
  assert.equal(report.total, 4);
  assert.equal(report.patternFailures.length, 0);
  assertNoSecret(h);
});

test('read-only client refuses writes structurally', async () => {
  const cma = fakeCma();
  const c = createCmaClient({ token: TOKEN, spaceId: SPACE, environmentId: ENV, readOnly: true, fetchImpl: cma.fetchImpl });
  await assert.rejects(c.putContentType('caseStudies', 11, {}), GuardError);
  await assert.rejects(c.activateContentType('caseStudies', 11), GuardError);
  assert.equal(cma.calls.length, 0);
});

// --- apply and idempotence ---------------------------------------------------------------------------------------
test('apply: adds six fields, relaxes four links, adds slug validations, preserves everything else', async () => {
  const cma = fakeCma();
  const before = structuredClone(cma.ct.fields);
  const h = harness(cma, 'apply');
  assert.equal(await runForward(h.ctx), 0, h.logs.join('\n'));
  assert.deepEqual(cma.writes().map((w) => w.method + w.path.replace(/.*content_types/, '')),
    ['PUT/caseStudies', 'PUT/caseStudies/published']);
  assert.equal(cma.ct.fields.length, 16);
  assert.deepEqual(cma.ct.fields.slice(0, 10).map((f) => f.id), before.map((f) => f.id)); // order kept
  for (const id of ['review', 'size', 'audience', 'targetArea']) {
    assert.equal(fieldOf(cma, id).required, false);
    assert.deepEqual(fieldOf(cma, id).validations, before.find((f) => f.id === id).validations); // link targets kept
  }
  for (const id of ['title', 'slug', 'clientName', 'industry']) assert.equal(fieldOf(cma, id).required, true);
  for (const id of ['title', 'clientName', 'industry', 'content', 'conclusion']) {
    assert.deepEqual(fieldOf(cma, id), before.find((f) => f.id === id));
  }
  assert.deepEqual(fieldOf(cma, 'slug').validations, [{ unique: true }, { regexp: { pattern: SLUG_PATTERN } }]);
  assert.deepEqual(fieldOf(cma, 'showTestimonial').defaultValue, { 'en-US': false });
  for (const id of SUPERSEDED_FIELD_IDS) assert.ok(!cma.ct.fields.some((f) => f.id === id), id);
  assert.ok(h.files['applied-diff.md'] && h.files['after-content-type.json']);
  assert.equal(inspectContentType(cma.ct).state, 'applied');
  assertNoSecret(h);

  const again = harness(cma, 'apply');
  const writesBefore = cma.writes().length;
  assert.equal(await runForward(again.ctx), 0);
  assert.equal(cma.writes().length, writesBefore, 'second run must be a no-op');
  assert.ok(again.logs.some((l) => l.includes('Already applied')));
});

test('apply resumes an interrupted run whose unactivated draft is exactly this migration', async () => {
  const cma = fakeCma();
  const h = harness(cma, 'apply');
  await runForward(h.ctx);
  const applied = structuredClone(cma.ct.fields);
  const resumed = fakeCma({ fields: applied, draftPending: true });
  const h2 = harness(resumed, 'apply');
  assert.equal(await runForward(h2.ctx), 0, h2.logs.join('\n'));
  assert.deepEqual(resumed.writes().map((w) => w.path.endsWith('/published')), [true]);
});

test('apply aborts with no writes on drift or unsafe state', async () => {
  const withField = (f) => [...baselineFields(), f];
  const cases = {
    supersededField: { fields: withField({ id: 'approvedContentHash', type: 'Symbol', validations: [] }) },
    nineFieldApproval: { fields: withField({ id: 'approval', type: 'Symbol', validations: [] }) },
    nineFieldListingOrder: { fields: withField({ id: 'listingOrder', type: 'Integer', validations: [] }) },
    defaultValueDiffers: { fields: withField({ ...NEW_FIELDS[5], defaultValue: { 'en-US': true } }) },
    newFieldDifferentSpec: { fields: withField({ ...NEW_FIELDS[0], validations: [{ size: { max: 999 } }] }) },
    unexpectedField: { fields: withField({ id: 'seoTitle', type: 'Symbol', validations: [] }) },
    typeChanged: { fields: baselineFields().map((f) => (f.id === 'title' ? { ...f, type: 'Text' } : f)) },
    localised: { fields: baselineFields().map((f) => (f.id === 'slug' ? { ...f, localized: true } : f)) },
    otherSlugPattern: { fields: baselineFields().map((f) => (f.id === 'slug' ? { ...f, validations: [{ regexp: { pattern: '^x$' } }] } : f)) },
    wrongLinkTarget: { fields: baselineFields().map((f) => (f.id === 'review' ? link('review', 'somethingElse') : f)) },
    foreignDraft: { draftPending: true },
    duplicateSlugs: { entries: [...legacyEntries(), entry('dupe0000000000000001', 'seo-for-home-decor-brand', { published: false })] },
  };
  for (const [name, c] of Object.entries(cases)) {
    const cma = fakeCma(c);
    const h = harness(cma, 'apply');
    assert.equal(await runForward(h.ctx), 2, name);
    assert.equal(cma.writes().length, 0, name);
    assert.ok(h.files['planned-diff.md'], `${name}: diff still written for review`);
  }
});

test('entries scan reports route collisions and pattern failures (and plan refuses, exit 2)', async () => {
  const cma = fakeCma({ entries: [...legacyEntries(),
    entry('collide0000000000001', 'seo-ameba-software', { published: false }),
    entry('badslug000000000001', 'Bad_Slug/', { published: false })] });
  const h = harness(cma, 'plan');
  assert.equal(await runForward(h.ctx), 2);
  const r = JSON.parse(h.files['before-entries-report.json']);
  assert.deepEqual(r.normalisedCollisions.map((c) => c.slug), ['seo-ameba-software']);
  assert.deepEqual(r.patternFailures.map((p) => p.id), ['badslug000000000001']);
  assert.equal(cma.writes().length, 0);
});

// --- R1 §1: route collisions ---------------------------------------------------------------------------------------
test('routeSlug equals the application normalizeCaseStudySlug (pinned fixture) on every vector', () => {
  const src = readFileSync(join(here, 'fixtures/mappers-normalize.ts'), 'utf8')
    .split('\n').filter((l) => !l.trimStart().startsWith('//') && !l.trimStart().startsWith('/**')).join('\n')
    .replace('export function normalizeCaseStudySlug(slug: string): string', 'function normalizeCaseStudySlug(slug)');
  const app = new Function(`${src}; return normalizeCaseStudySlug;`)();
  const vectors = ['slug', 'portfolio/slug', 'Portfolio/slug', 'PORTFOLIO/slug', '/slug', 'slug/', '/portfolio/slug',
    'portfolio//slug', 'portfolio/portfolio/slug', 'portfolio/', 'a/b', '//', ''];
  for (const v of vectors) assert.equal(routeSlug(v), app(v.trim()), JSON.stringify(v));
  assert.equal(routeSlug('portfolio/slug'), routeSlug('slug'));
});

for (const mode of ['plan', 'apply']) {
  test(`${mode}: portfolio/slug versus slug blocks, nothing is written (exit 2)`, async () => {
    const cma = fakeCma({ entries: [entry('aaaaaaaaaaaaaaaaaaaa01', 'portfolio/same-study'), entry('bbbbbbbbbbbbbbbbbbbb02', 'same-study')] });
    const h = harness(cma, mode);
    assert.equal(await runForward(h.ctx), 2);
    assert.equal(cma.writes().length, 0);
    assert.ok(h.logs.some((l) => l.startsWith('BLOCKER: route collision: /portfolio/same-study')
      && l.includes('aaaaaaaaaaaaaaaaaaaa01') && l.includes('bbbbbbbbbbbbbbbbbbbb02')), h.logs.join('\n'));
    assert.ok(h.files['before-entries-report.json'], 'evidence still written');
  });
}

test('apply: collision is detected for draft/archived entries and for the exact-duplicate case too', async () => {
  for (const [a, b] of [['same', 'same'], ['portfolio/same', 'portfolio/same'], ['same', 'portfolio/same']]) {
    const cma = fakeCma({ entries: [entry('aaaaaaaaaaaaaaaaaaaa01', a, { published: false }), entry('bbbbbbbbbbbbbbbbbbbb02', b)] });
    const h = harness(cma, 'apply');
    assert.equal(await runForward(h.ctx), 2, `${a} vs ${b}`);
    assert.equal(cma.writes().length, 0);
  }
});

test('apply: collision also blocks completing an unactivated draft that equals this migration', async () => {
  const first = fakeCma({ entries: legacyEntries() });
  const h1 = harness(first, 'apply');
  assert.equal(await runForward(h1.ctx), 0);
  const target = JSON.parse(h1.files['after-content-type.json']).contentType;
  const cma = fakeCma({ fields: target.fields, draftPending: true,
    entries: [entry('aaaaaaaaaaaaaaaaaaaa01', 'portfolio/dup'), entry('bbbbbbbbbbbbbbbbbbbb02', 'dup')] });
  const h = harness(cma, 'apply');
  assert.equal(await runForward(h.ctx), 2);
  assert.equal(cma.writes().length, 0);
});

test('distinct slugs and the three live slugs do not block (control)', async () => {
  const cma = fakeCma({ entries: legacyEntries() });
  assert.equal(await runForward(harness(cma, 'apply').ctx), 0);
});

// --- R1 §2: invalid existing slugs ---------------------------------------------------------------------------------
test('apply: any existing slug failing the pattern blocks; entry IDs and values are reported; entries untouched', async () => {
  const bad = { Upper: 'Seo-Study', underscore: 'a_b', slashes: 'a/b', double: 'a--b', trailing: 'study-', space: 'a b', empty: '' };
  const ids = Object.keys(bad).map((k, i) => `bad${String(i).padStart(2, '0')}${k}`.padEnd(22, 'x'));
  const entries = [...legacyEntries(), ...Object.values(bad).map((v, i) => entry(ids[i], v, { published: i % 2 === 0 }))];
  const cma = fakeCma({ entries });
  const before = JSON.stringify(entries);
  const h = harness(cma, 'apply');
  assert.equal(await runForward(h.ctx), 2);
  assert.equal(cma.writes().length, 0);
  assert.equal(JSON.stringify(entries), before, 'no entry was modified or renamed');
  const lines = h.logs.filter((l) => l.startsWith('BLOCKER: slug fails'));
  Object.values(bad).forEach((v, i) => assert.ok(lines.some((l) => l.includes(ids[i]) && l.includes(JSON.stringify(v))), `${ids[i]} ${v}`));
});

test('apply: one bad slug among good ones blocks; an entry with no slug is reported but does not block', async () => {
  const h1 = harness(fakeCma({ entries: [...legacyEntries(), entry('badslug000000000001', 'Bad_Slug')] }), 'apply');
  assert.equal(await runForward(h1.ctx), 2);
  const noSlug = entry('noslug0000000000001', 'x', { published: false });
  delete noSlug.fields.slug;
  const cma = fakeCma({ entries: [...legacyEntries(), noSlug] });
  const h2 = harness(cma, 'apply');
  assert.equal(await runForward(h2.ctx), 0);
  assert.deepEqual(scanEntries([noSlug]).missingSlugs.map((m) => m.id), ['noslug0000000000001']);
});

test('already-applied schema with bad slugs is a no-op, not a blocker', async () => {
  const first = fakeCma({ entries: legacyEntries() });
  const h1 = harness(first, 'apply');
  assert.equal(await runForward(h1.ctx), 0);
  const target = JSON.parse(h1.files['after-content-type.json']).contentType;
  const cma = fakeCma({ fields: target.fields, entries: [...legacyEntries(), entry('badslug000000000001', 'Bad_Slug', { published: false })] });
  assert.equal(await runForward(harness(cma, 'apply').ctx), 0);
});

// --- rollback ----------------------------------------------------------------------------------------------------
async function appliedState(entries) {
  const cma = fakeCma({ entries });
  const h = harness(cma, 'apply');
  assert.equal(await runForward(h.ctx), 0);
  return { cma, snapshot: JSON.parse(h.files['before-content-type.json']) };
}

test('rollback omit: dry run writes nothing; real run restores links and slug, hides new fields; re-apply works', async () => {
  const { cma, snapshot } = await appliedState(legacyEntries());
  const n = cma.writes().length;
  const dry = harness(cma, 'rollback-plan', { snapshot, strategy: 'omit' });
  assert.equal(await runRollback(dry.ctx), 0, dry.logs.join('\n'));
  assert.equal(cma.writes().length, n);
  const real = harness(cma, 'rollback', { snapshot, strategy: 'omit' });
  assert.equal(await runRollback(real.ctx), 0, real.logs.join('\n'));
  for (const id of ['review', 'size', 'audience', 'targetArea']) assert.equal(fieldOf(cma, id).required, true);
  assert.deepEqual(fieldOf(cma, 'slug').validations, []);
  for (const f of NEW_FIELDS) assert.equal(fieldOf(cma, f.id).omitted, true);
  assertNoSecret(real);
  const reapply = harness(cma, 'apply');
  assert.equal(await runForward(reapply.ctx), 0, reapply.logs.join('\n'));
  assert.equal(inspectContentType(cma.ct).state, 'applied');
});

test('rollback delete: refused when any entry holds a new-field value; allowed when none do', async () => {
  const withValue = [...legacyEntries().slice(0, 3), entry('newStudy000000000001', 'new-study', { published: false, extra: { summary: 'A summary.' } })];
  const a = await appliedState(withValue);
  const blocked = harness(a.cma, 'rollback', { snapshot: a.snapshot, strategy: 'delete' });
  assert.equal(await runRollback(blocked.ctx), 2);
  assert.ok(blocked.logs.some((l) => l.includes('destroy data')));

  const b = await appliedState(legacyEntries());
  const ok = harness(b.cma, 'rollback', { snapshot: b.snapshot, strategy: 'delete' });
  assert.equal(await runRollback(ok.ctx), 0, ok.logs.join('\n'));
  assert.equal(b.cma.ct.fields.length, 10);
  assert.deepEqual(b.cma.ct.fields, b.snapshot.contentType.fields);
});

test('rollback refused when an entry relies on a now-optional link', async () => {
  const { cma, snapshot } = await appliedState([...legacyEntries(), entry('noReview000000000001', 'no-review', { published: false, drop: ['review'] })]);
  const h = harness(cma, 'rollback', { snapshot, strategy: 'omit' });
  assert.equal(await runRollback(h.ctx), 2);
  assert.ok(h.logs.some((l) => l.includes('"review" cannot be required again')));
});

test('rollback refuses a snapshot from another environment or migration', async () => {
  const { cma, snapshot } = await appliedState(legacyEntries());
  for (const bad of [{ environmentId: 'master' }, { spaceId: 'other' }, { migrationId: 'x' }]) {
    const s = { ...snapshot, meta: { ...snapshot.meta, ...bad } };
    await assert.rejects(runRollback(harness(cma, 'rollback', { snapshot: s, strategy: 'omit' }).ctx), GuardError);
  }
});

// --- secrets, keys, constants ------------------------------------------------------------------------------------
test('API errors that echo the token are redacted', async () => {
  const cma = fakeCma({ errorBody: { sys: { id: 'Boom' }, message: `bad token ${TOKEN} Bearer ${TOKEN}` } });
  const h = harness(cma, 'plan');
  await assert.rejects(runForward(h.ctx), (e) => !e.message.includes(TOKEN) && e.message.includes('[REDACTED]'));
});

test('429 is retried; nothing else is', async () => {
  const cma = fakeCma();
  let first = true;
  const fetchImpl = async (u, o) => {
    if (first) { first = false; return { status: 429, ok: false, headers: { get: () => '1' }, text: async () => '{}' }; }
    return cma.fetchImpl(u, o);
  };
  const c = createCmaClient({ token: TOKEN, spaceId: SPACE, environmentId: ENV, readOnly: true, fetchImpl, sleep: async () => {} });
  assert.equal((await c.getEnvironment()).sys.id, ENV);
});

test('slug pattern accepts the three live slugs and rejects malformed ones', () => {
  const rx = new RegExp(SLUG_PATTERN);
  for (const s of ['portfolio/seo-ameba-software', 'seo-for-home-decor-brand', 'google-ads-for-online-courses']) assert.ok(rx.test(s), s);
  for (const s of ['', 'Seo', 'a--b', '-a', 'a-', 'a/b', 'portfolio/', '/a', 'a ', 'portfolio/portfolio/a']) assert.ok(!rx.test(s), s);
});

test('redaction covers a token without the CFPAT- prefix', async () => {
  const { makeRedactor } = await import('./migration.mjs');
  const r = makeRedactor('plainSecretValue123');
  assert.equal(r('x plainSecretValue123 y'), 'x [REDACTED] y');
});

test('apply reports VERIFY FAILED (exit 4) if a schema write changed any entry version', async () => {
  const entries = legacyEntries();
  const cma = fakeCma({ entries });
  const inner = cma.fetchImpl;
  cma.fetchImpl = async (u, o) => {
    if (o.method === 'PUT' && u.endsWith('/published')) entries[0].sys.version += 1; // simulate an unexpected side effect
    return inner(u, o);
  };
  const h = harness(cma, 'apply');
  assert.equal(await runForward(h.ctx), 4);
  assert.ok(h.logs.some((l) => l.includes('4DpPjLCWdakD6tBmZNMnko: version changed')));
});

// --- simplified schema ---------------------------------------------------------------------------------------------
test('adds exactly the six owner-approved fields with the approved types, all optional and not localised', () => {
  assert.deepEqual(NEW_FIELDS.map((f) => [f.id, f.type]), [
    ['summary', 'Text'], ['problem', 'RichText'], ['whatWeDid', 'RichText'], ['impact', 'RichText'],
    ['evidenceNote', 'Text'], ['showTestimonial', 'Boolean'],
  ]);
  for (const f of NEW_FIELDS) assert.ok(!f.required && !f.localized && !f.omitted && !f.disabled, f.id);
  assert.deepEqual(NEW_FIELDS.filter((f) => f.defaultValue).map((f) => [f.id, f.defaultValue]), [['showTestimonial', { 'en-US': false }]]);
  assert.equal(MIGRATION_ID, 'g6-simplified-case-studies-v1');
});

test('no superseded approval-signature or nine-field requirement remains', () => {
  const src = readFileSync(join(here, 'migration.mjs'), 'utf8') + readFileSync(join(here, 'cli.mjs'), 'utf8');
  for (const s of ['node:crypto', 'generateKeyPair', 'createPrivateKey', 'privateKey', 'passphrase', 'msa1', 'APPROVAL_PATTERN', 'SERVICE_KEYS']) {
    assert.ok(!src.includes(s), s);
  }
  for (const id of ['approval', 'outcomeType', 'serviceKey', 'listingOrder']) {
    assert.ok(!NEW_FIELDS.some((f) => f.id === id), id);
    assert.ok(SUPERSEDED_FIELD_IDS.includes(id), `${id} is treated as foreign if found`);
  }
});

test('the three live entries with no new-field values and every link present plan cleanly; missing links do not block', async () => {
  const live = legacyEntries().slice(0, 3);
  const cma = fakeCma({ entries: [...live, entry('noLinks0000000000001', 'new-study', { published: false, drop: ['review', 'size', 'audience', 'targetArea'] })] });
  const h = harness(cma, 'plan');
  assert.equal(await runForward(h.ctx), 0, h.logs.join('\n'));
  const r = JSON.parse(h.files['before-entries-report.json']);
  assert.deepEqual(r.rows.slice(0, 3).map((x) => x.newFieldsWithValues), [[], [], []]);
  assert.deepEqual(r.rows[3].missingLinks, ['review', 'size', 'audience', 'targetArea']);
});

test('slug pattern equals the application SLUG_PATTERN_SOURCE (pinned fixture)', () => {
  const src = readFileSync(join(here, 'fixtures/eligibility-slug-pattern.ts'), 'utf8');
  assert.equal(src.match(/SLUG_PATTERN_SOURCE = '([^']+)'/)[1], SLUG_PATTERN);
});

// --- SM-1 regression: existing-field settings already at target (state "partial", no new field) --------------------
test('partial (links already optional, slug already unique): plan 0 writes, apply completes, rollback keeps them as found', async () => {
  const fields = baselineFields().map((f) => (['review', 'size', 'audience', 'targetArea'].includes(f.id) ? { ...f, required: false }
    : f.id === 'slug' ? { ...f, validations: [{ unique: true }] } : f));
  const cma = fakeCma({ fields });
  const before = inspectContentType(cma.ct);
  assert.equal(before.state, 'partial');
  assert.deepEqual(before.changes.filter((c) => c.status === 'applied').map((c) => c.id),
    ['optional:review', 'optional:size', 'optional:audience', 'optional:targetArea', 'slug:unique']);
  const p = harness(cma, 'plan');
  assert.equal(await runForward(p.ctx), 0, p.logs.join('\n'));
  assert.equal(cma.writes().length, 0);
  const a = harness(cma, 'apply');
  assert.equal(await runForward(a.ctx), 0, a.logs.join('\n'));
  assert.equal(inspectContentType(cma.ct).state, 'applied');
  assert.deepEqual(fieldOf(cma, 'slug').validations, [{ unique: true }, { regexp: { pattern: SLUG_PATTERN } }]); // no duplicate unique
  const snapshot = JSON.parse(a.files['before-content-type.json']);
  const rb = harness(cma, 'rollback', { snapshot, strategy: 'omit' });
  assert.equal(await runRollback(rb.ctx), 0, rb.logs.join('\n'));
  for (const id of ['review', 'size', 'audience', 'targetArea']) assert.equal(fieldOf(cma, id).required, false, `${id} restored as found`);
  assert.deepEqual(fieldOf(cma, 'slug').validations, [{ unique: true }]);
});
