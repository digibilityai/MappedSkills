// Simplified G6: which case studies may be public, and that detail / listing / sitemap / static params agree.
// Runs the real application TypeScript through tests/helpers/ts-loader.cjs with a mocked network. No Contentful calls.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { load, root } = require('./helpers/ts-loader.cjs');

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const DELIVERY = 'delivery-token-test';
const PREVIEW = 'preview-token-test';
const AMEBA = '4DpPjLCWdakD6tBmZNMnko';
const HOME = '4zQL4P8SR2xogxHN4qFfUl';
const COURSES = '6Ycb7aYvXrslOXKchQnqmi';

const doc = (text) => ({ nodeType: 'document', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: text, marks: [], data: {} }] }] });
const emptyDoc = () => ({ nodeType: 'document', data: {}, content: [{ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: '  ', marks: [], data: {} }] }] });
const published = { publishedVersion: 4, publishedAt: '2026-10-01T00:00:00Z', firstPublishedAt: '2026-09-01T00:00:00Z' };

/** A raw Contentful (GraphQL) case-study item. */
function item(id, slug, over = {}) {
  const { sys, ...rest } = over;
  return { sys: { id, ...published, ...sys }, title: `Study ${id}`, slug, ...rest };
}
const newContent = (over = {}) => ({
  summary: 'A short, editor-written summary.', problem: { json: doc('The problem.') }, whatWeDid: { json: doc('What we did.') },
  impact: { json: doc('The impact, as approved.') }, evidenceNote: '', showTestimonial: false, ...over,
});
const legacyItems = () => [
  item(AMEBA, 'portfolio/seo-ameba-software'),
  item(HOME, 'seo-for-home-decor-brand'),
  item(COURSES, 'google-ads-for-online-courses'),
];

function setup(items, { delivery = DELIVERY, preview = PREVIEW, newFields = '' } = {}) {
  const calls = [];
  process.env.CONTENTFUL_SPACE_ID = 'spacetest01';
  process.env.CONTENTFUL_ENVIRONMENT = 'master';
  if (delivery) process.env.CONTENTFUL_ACCESS_TOKEN = delivery; else delete process.env.CONTENTFUL_ACCESS_TOKEN;
  if (preview) process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN = preview; else delete process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  if (newFields) process.env.CONTENTFUL_CASE_STUDY_NEW_FIELDS = newFields; else delete process.env.CONTENTFUL_CASE_STUDY_NEW_FIELDS;
  global.fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    calls.push({ url, auth: init.headers.Authorization, preview: body.variables.preview, query: body.query });
    return { ok: true, status: 200, json: async () => ({ data: { caseStudiesCollection: { total: items.length, items } } }) };
  };
  return { calls, api: load('lib/contentful/case-studies.ts') };
}
const elig = () => load('lib/case-study-eligibility.ts');
const input = (id, slug, over = {}) => ({ id, slug, publishedVersion: 3, publishedAt: '2026-01-01', hasSummary: true, hasProblem: true, hasWhatWeDid: true, hasImpact: true, ...over });
const verdict = (list) => { const m = elig().evaluateCaseStudies(list); return (id) => m.get(id); };

// --- publication status ------------------------------------------------------------------------------------------
test('currently published only: draft, unpublished-after-publishing and archived-looking entries are hidden', () => {
  const v = verdict([
    input('a', 'one'),
    input('b', 'two', { publishedVersion: null, publishedAt: '2026-01-01' }), // was published once, now unpublished
    input('c', 'three', { publishedVersion: undefined, publishedAt: null }), // never published
    input('d', 'four', { publishedVersion: 3, publishedAt: null }),
    input('e', 'five', { publishedVersion: 0 }),
  ]);
  assert.deepStrictEqual(v('a'), { public: true, layout: 'new' });
  for (const id of ['b', 'c', 'd', 'e']) assert.deepStrictEqual(v(id), { public: false, reason: 'not-published' }, id);
});

// --- completeness ------------------------------------------------------------------------------------------------
test('new-layout entries need summary, problem, whatWeDid and impact', () => {
  for (const missing of ['hasSummary', 'hasProblem', 'hasWhatWeDid', 'hasImpact']) {
    const v = verdict([input('x', 'new-study', { [missing]: false })]);
    assert.deepStrictEqual(v('x'), { public: false, reason: 'incomplete' }, missing);
  }
  assert.deepStrictEqual(verdict([input('x', 'new-study')])('x'), { public: true, layout: 'new' });
});

// --- legacy compatibility by immutable entry ID ------------------------------------------------------------------
test('the three legacy IDs stay public without new fields; a lookalike ID or slug does not', () => {
  const { LEGACY_CASE_STUDY_IDS } = elig();
  assert.deepStrictEqual([...LEGACY_CASE_STUDY_IDS].sort(), [AMEBA, HOME, COURSES].sort());
  const blank = { hasSummary: false, hasProblem: false, hasWhatWeDid: false, hasImpact: false };
  const v = verdict([
    input(AMEBA, 'portfolio/seo-ameba-software', blank),
    input('impostor', 'seo-for-home-decor-brand-2', blank),
    input('impostor2', 'seo-ameba-software-copy', blank),
  ]);
  assert.deepStrictEqual(v(AMEBA), { public: true, layout: 'legacy' });
  assert.deepStrictEqual(v('impostor'), { public: false, reason: 'incomplete' });
  // legacy still has to be currently published
  assert.deepStrictEqual(verdict([input(AMEBA, 'x', { ...blank, publishedVersion: null })])(AMEBA), { public: false, reason: 'not-published' });
});

test('legacy studies stay on the legacy template even when new fields are filled; only the code-level list moves them', () => {
  const { evaluateCaseStudies, LEGACY_IDS_ON_NEW_TEMPLATE } = elig();
  assert.deepStrictEqual([...LEGACY_IDS_ON_NEW_TEMPLATE].sort(), [AMEBA, HOME, COURSES].sort(), 'G7 batch five moves exactly the three legacy studies');
  const blank = { hasSummary: false, hasProblem: false, hasWhatWeDid: false, hasImpact: false };
  for (const id of [AMEBA, HOME, COURSES]) {
    // new copy not yet published: stays legacy, so deploying the code before the publish changes nothing visible
    assert.deepStrictEqual(verdict([input(id, 'any-valid-slug', blank)])(id), { public: true, layout: 'legacy' }, id);
    assert.deepStrictEqual(verdict([input(id, 'any-valid-slug')])(id), { public: true, layout: 'new' }, id);
  }
  const moved = evaluateCaseStudies([input(AMEBA, 'portfolio/seo-ameba-software')], new Set([AMEBA]));
  assert.deepStrictEqual(moved.get(AMEBA), { public: true, layout: 'new' });
  // listed but content incomplete: still legacy, never a half-empty new page
  const partial = evaluateCaseStudies([input(AMEBA, 'portfolio/seo-ameba-software', { hasImpact: false })], new Set([AMEBA]));
  assert.deepStrictEqual(partial.get(AMEBA), { public: true, layout: 'legacy' });
  // non-legacy entries are unaffected by the list
  assert.deepStrictEqual(evaluateCaseStudies([input('n', 'new-one')], new Set([AMEBA])).get('n'), { public: true, layout: 'new' });
});

// --- slugs and collisions ----------------------------------------------------------------------------------------
test('slug validity: the Ameba prefix is allowed; malformed, empty and missing slugs are hidden', () => {
  for (const ok of ['portfolio/seo-ameba-software', 'example-case-study', 'a1']) assert.ok(elig().SLUG_PATTERN.test(ok), ok);
  for (const bad of ['Upper', 'a_b', 'a--b', '-a', 'a-', 'a/b', '/a', 'portfolio/portfolio/a', 'portfolio/', '']) assert.ok(!elig().SLUG_PATTERN.test(bad), bad);
  const v = verdict([input('a', 'Bad_Slug'), input('b', ''), input('c', null), input('d', '   ')]);
  for (const id of ['a', 'b', 'c', 'd']) assert.deepStrictEqual(v(id), { public: false, reason: 'invalid-slug' }, id);
});

test('normalised collisions: portfolio/slug vs slug withholds both non-legacy entries; a legacy ID keeps its URL', () => {
  const v1 = verdict([input('a', 'portfolio/same-study'), input('b', 'same-study')]);
  assert.deepStrictEqual(v1('a'), { public: false, reason: 'route-collision' });
  assert.deepStrictEqual(v1('b'), { public: false, reason: 'route-collision' });
  const v2 = verdict([input('n', 'seo-for-home-decor-brand'), input(HOME, 'seo-for-home-decor-brand')]);
  assert.deepStrictEqual(v2(HOME), { public: true, layout: 'new' });
  assert.deepStrictEqual(v2('n'), { public: false, reason: 'route-collision' });
  // an unpublished entry does not claim the route
  const v3 = verdict([input('a', 'portfolio/q'), input('b', 'q', { publishedVersion: null })]);
  assert.deepStrictEqual(v3('a'), { public: true, layout: 'new' });
});

test('route normalisation equals lib/contentful/mappers.ts normalizeCaseStudySlug', () => {
  const mappers = read('lib/contentful/mappers.ts');
  assert.ok(mappers.includes("slug.replace(/^portfolio\\//i, '').replace(/^\\/+|\\/+$/g, '')"));
  const m = load('lib/contentful/mappers.ts');
  const { routeSlugOf } = elig();
  for (const s of ['x', 'portfolio/x', 'Portfolio/x', '/x', 'x/', '/portfolio/x', 'portfolio//x', 'portfolio/portfolio/x', '']) {
    assert.strictEqual(routeSlugOf(s), m.normalizeCaseStudySlug(s.trim()), JSON.stringify(s));
  }
});

// --- end to end on the real modules, mocked network ---------------------------------------------------------------
test('a Preview token never reaches case studies: Delivery token, preview:false, and no Delivery token = nothing public', async () => {
  const s = setup(legacyItems());
  await s.api.getCaseStudyListCards();
  assert.ok(s.calls.length >= 1);
  for (const c of s.calls) { assert.strictEqual(c.auth, `Bearer ${DELIVERY}`); assert.strictEqual(c.preview, false); }
  const none = setup(legacyItems(), { delivery: '', preview: PREVIEW });
  assert.deepStrictEqual(await none.api.getCaseStudyListCards(), []);
  assert.strictEqual(none.calls.length, 0, 'no request is made with the Preview token');
});

test('drafts and previously-published entries returned by the API are still withheld', async () => {
  const items = [
    ...legacyItems(),
    item('draftNew0000000000001', 'draft-study', { ...newContent(), sys: { publishedVersion: null, publishedAt: null, firstPublishedAt: null } }),
    item('unpubNew0000000000002', 'was-published', { ...newContent(), sys: { publishedVersion: null } }),
  ];
  const s = setup(items, { newFields: '1' });
  const slugs = (await s.api.getCaseStudyStaticParams()).map((p) => p.slug);
  assert.deepStrictEqual(slugs.sort(), ['google-ads-for-online-courses', 'seo-ameba-software', 'seo-for-home-decor-brand']);
  assert.strictEqual(await s.api.getCaseStudyDetail('draft-study'), null);
  assert.strictEqual(await s.api.getCaseStudyDetail('was-published'), null);
});

test('existing three URLs: legacy layout, Ameba reachable by bare and prefixed slug, unknown slug is not found', async () => {
  const s = setup(legacyItems());
  for (const slug of ['seo-ameba-software', 'portfolio/seo-ameba-software']) {
    const d = await s.api.getCaseStudyDetail(slug);
    assert.strictEqual(d.slug, 'seo-ameba-software');
    assert.strictEqual(d.href, '/portfolio/seo-ameba-software');
    assert.strictEqual(d.layout, 'legacy');
  }
  assert.strictEqual((await s.api.getCaseStudyDetail('seo-for-home-decor-brand')).layout, 'legacy');
  assert.strictEqual((await s.api.getCaseStudyDetail('google-ads-for-online-courses')).layout, 'legacy');
  assert.strictEqual(await s.api.getCaseStudyDetail('no-such-study'), null);
});

test('end to end: a legacy entry renders the new template once its new fields are published, and the legacy one before', async () => {
  const filled = [item(AMEBA, 'portfolio/seo-ameba-software', newContent()), item(HOME, 'seo-for-home-decor-brand'), item(COURSES, 'google-ads-for-online-courses')];
  const s = setup(filled, { newFields: '1' });
  assert.strictEqual((await s.api.getCaseStudyDetail('seo-ameba-software')).layout, 'new');
  assert.strictEqual((await s.api.getCaseStudyDetail('seo-for-home-decor-brand')).layout, 'legacy', 'new fields not yet published: unchanged');
});

test('detail, /work cards, sitemap entries and static params list exactly the same studies', async () => {
  const items = [
    ...legacyItems(),
    item('newstudyA000000000001', 'example-study', newContent()),
    item('incomplete000000000002', 'half-done', newContent({ impact: { json: emptyDoc() } })),
    item('collideA0000000000003', 'portfolio/dup', newContent()),
    item('collideB0000000000004', 'dup', newContent()),
  ];
  const s = setup(items, { newFields: '1' });
  const cards = (await s.api.getCaseStudyListCards()).map((c) => c.slug).sort();
  const params = (await s.api.getCaseStudyStaticParams()).map((p) => p.slug).sort();
  assert.deepStrictEqual(cards, ['example-study', 'google-ads-for-online-courses', 'seo-ameba-software', 'seo-for-home-decor-brand']);
  assert.deepStrictEqual(params, cards);
  for (const slug of cards) assert.ok(await s.api.getCaseStudyDetail(slug), slug);
  for (const slug of ['half-done', 'dup']) assert.strictEqual(await s.api.getCaseStudyDetail(slug), null, slug);
  const sitemap = read('app/sitemap.ts'); const work = read('app/(pages)/work/page.tsx');
  // Sitemap reads the cards; /work (G7 library) reads fetchContentfulCaseStudies() through one loader, the same set.
  const loader = read('components/cplus/work/load.ts');
  assert.ok(sitemap.includes('getCaseStudyListCards()') && work.includes('loadLibraryPage(1)') && loader.includes('libraryStudies(await fetchContentfulCaseStudies(), FEATURED_SLUG)'));
  const { featured, rest } = load('components/cplus/work/studies.ts').splitStudies(await s.api.fetchContentfulCaseStudies(), 'seo-ameba-software');
  assert.deepStrictEqual([featured, ...rest].map((w) => w.slug).sort(), cards);
  const detail = await s.api.getCaseStudyDetail('example-study');
  assert.strictEqual(detail.layout, 'new');
  assert.strictEqual(detail.newLayout.impact.content[0].content[0].value, 'The impact, as approved.');
});

test('missing optional links (review, size, audience, targetArea, client, industry) do not break a new-layout study', async () => {
  const s = setup([item('newstudyA000000000001', 'example-study', newContent())], { newFields: '1' });
  const d = await s.api.getCaseStudyDetail('example-study');
  assert.strictEqual(d.review, undefined);
  assert.deepStrictEqual([d.companySize, d.audience, d.targetArea, d.clientName, d.industry], ['', '', '', '', '']);
  assert.strictEqual(d.summary, 'A short, editor-written summary.');
  assert.strictEqual(d.metaDescription, 'A short, editor-written summary.');
});

test('testimonial: new layout needs showTestimonial, a quote and no withholding; legacy rule and stars unchanged', async () => {
  const review = { name: 'A Named Person', testimonial: 'An approved quote.' };
  const s = setup([item('a0000000000000000001', 'with-flag', newContent({ showTestimonial: true, review })),
    item('b0000000000000000002', 'no-flag', newContent({ showTestimonial: false, review })),
    item('c0000000000000000003', 'null-flag', { ...newContent({ review }), showTestimonial: null })], { newFields: '1' });
  assert.strictEqual((await s.api.getCaseStudyDetail('with-flag')).newLayout.showTestimonial, true);
  assert.strictEqual((await s.api.getCaseStudyDetail('no-flag')).newLayout.showTestimonial, false);
  assert.strictEqual((await s.api.getCaseStudyDetail('null-flag')).newLayout.showTestimonial, false);
  const page = read('app/(pages)/portfolio/[slug]/page.tsx');
  assert.ok(page.includes('caseStudy.newLayout?.showTestimonial && caseStudy.review?.quote && !proofWithheld'));
  // the new template is returned before the legacy markup, and neither it nor its stylesheet can draw a star (WORK-026)
  assert.ok(page.indexOf('<CaseStudyTemplate') > 0 && page.indexOf('<CaseStudyTemplate') < page.indexOf('★'), 'no stars on the new layout (WORK-026)');
  assert.ok(!read('components/case-study/CaseStudyTemplate.tsx').includes('★'));
  assert.ok(page.includes('isCaseStudyProofWithheld(caseStudy.slug)'), 'proof withholding retained');
  const { isCaseStudyProofWithheld } = load('lib/case-study-proof.ts');
  for (const slug of ['seo-ameba-software', 'portfolio/seo-ameba-software', 'seo-for-home-decor-brand', 'google-ads-for-online-courses']) assert.ok(isCaseStudyProofWithheld(slug), slug);
});

test('withheld legacy studies stay withheld on /work: no result line', async () => {
  const withMetrics = item(AMEBA, 'portfolio/seo-ameba-software', { review: { name: 'X', testimonial: 'Q' } });
  const s = setup([withMetrics]);
  const [card] = await s.api.getCaseStudyListCards();
  assert.strictEqual(card.result, '');
});

// --- query safety --------------------------------------------------------------------------------------------------
test('new fields are queried only when CONTENTFUL_CASE_STUDY_NEW_FIELDS=1 (a missing field would fail the whole query)', async () => {
  const off = setup(legacyItems());
  await off.api.getCaseStudyListCards();
  for (const f of ['summary', 'whatWeDid', 'evidenceNote', 'showTestimonial']) assert.ok(!off.calls[0].query.includes(f), f);
  assert.ok(off.calls[0].query.includes('publishedVersion'));
  const on = setup(legacyItems(), { newFields: '1' });
  await on.api.getCaseStudyListCards();
  for (const f of ['summary', 'problem', 'whatWeDid', 'impact', 'evidenceNote', 'showTestimonial']) assert.ok(on.calls[0].query.includes(f), f);
});

test('the Contentful slug validation prepared for the migration equals the application slug pattern', () => {
  const { SLUG_PATTERN, SLUG_PATTERN_SOURCE } = elig();
  assert.strictEqual(SLUG_PATTERN.source.replace(/\\\//g, '/'), SLUG_PATTERN_SOURCE.slice(1) ? SLUG_PATTERN_SOURCE.replace(/^\^/, '^') : '');
  assert.ok(read('docs/work-redesign/g6/simplified/SIMPLIFIED_SCHEMA_CONTRACT.md').includes(SLUG_PATTERN_SOURCE));
});

test('/work (PR #40 redesign): a new-template study shows its approved summary; a legacy study without published new fields keeps the Problem Statement', async () => {
  const problemStatement = { json: { nodeType: 'document', data: {}, content: [
    { nodeType: 'heading-2', data: {}, content: [{ nodeType: 'text', value: 'Problem Statement', marks: [], data: {} }] },
    { nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: 'Legacy problem sentence one. Legacy sentence two.', marks: [], data: {} }] },
  ] } };
  const items = [
    item(AMEBA, 'portfolio/seo-ameba-software', { content: problemStatement, ...newContent({ summary: 'Approved Ameba summary. Second.' }) }),
    item(HOME, 'seo-for-home-decor-brand', { content: problemStatement }), item(COURSES, 'google-ads-for-online-courses'),
    item('newstudy0000000000001', 'new-study', newContent({ summary: 'Approved summary one. Approved summary two. Three.' })),
  ];
  const s = setup(items, { newFields: '1' });
  const { featured, rest } = load('components/cplus/work/studies.ts').splitStudies(await s.api.fetchContentfulCaseStudies(), 'seo-ameba-software');
  assert.strictEqual(featured.slug, 'seo-ameba-software');
  assert.strictEqual(featured.challenge, 'Approved Ameba summary. Second.', 'a legacy study on the new template shows its approved summary');
  assert.strictEqual(rest.find((w) => w.slug === 'seo-for-home-decor-brand').challenge, 'Legacy problem sentence one.', 'new fields not yet published: Problem Statement');
  const n = rest.find((w) => w.slug === 'new-study');
  assert.strictEqual(n.challenge, 'Approved summary one.');
  assert.deepStrictEqual([n.changed, n.outcomes, n.figures, n.service], [[], [], 0, null]);
  assert.strictEqual(n.href, '/portfolio/new-study');
  const { featured: none } = load('components/cplus/work/studies.ts').splitStudies([], 'seo-ameba-software');
  assert.strictEqual(none, null);
});
