// G7 case-study library: paging past 100, exclusions, flag-off behaviour, legacy pages unchanged, failure handling,
// static pages and search agreeing, a clean public index, and test data kept out of the application.
// Runs the real application TypeScript through tests/helpers/ts-loader.cjs with a mocked network. No Contentful calls.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { load, root } = require('./helpers/ts-loader.cjs');

// --- test inputs, generated at run time (no stored fixture data). Every text is marked as test data. ----------------
const MARK = 'SYNTHETIC';
const para = (t) => ({ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: t, marks: [], data: {} }] });
const head = (n, t) => ({ nodeType: `heading-${n}`, data: {}, content: [{ nodeType: 'text', value: t, marks: [], data: {} }] });
const doc = (...b) => ({ nodeType: 'document', data: {}, content: b });
const pub = { publishedVersion: 3, publishedAt: '2026-10-01T00:00:00Z' };
const iso = (y, m, d = 1) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}T00:00:00.000Z`;
const SECTOR_KEYS = ['real-estate', 'education', 'financial-services', 'software-technology', 'ecommerce-retail', 'healthcare', 'manufacturing-industrial', 'professional-services', 'hospitality-food'];
const SERVICE_KEYS = ['/seo', '/google-ads', '/social-media-ads', '/lead-generation', '/conversion-optimization', '/ai-seo', null];
const NAMES = ['Northwind', 'Bluepeak', 'Copperleaf', 'Harbourline', 'Kestrel', 'Lumen', 'Meadowbrook', 'Orchid', 'Pinewood'];
const KINDS = ['Homes', 'Academy', 'Assurance', 'Labs', 'Store', 'Clinics', 'Works', 'Partners', 'Kitchens'];

/** `count` complete, published new-template studies; priorities 1 and 2 on studies 07 and 13. */
function syntheticStudies(count) {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    const s = i % SECTOR_KEYS.length;
    const client = `${NAMES[i % NAMES.length]} ${KINDS[s]} ${n}`;
    return {
      sys: { id: `synth${n}xxxxxxxxxxxxxxx`.slice(0, 22), ...pub, firstPublishedAt: iso(2026, 1 + (i % 9), 1 + (i % 27)) },
      title: `${MARK} study ${n}`, slug: `synthetic-study-${n}`,
      clientName: { clientName: `${client} (${MARK}), Example City`, date: null },
      industry: { name: `${MARK} industry ${s}` },
      summary: `${MARK} summary ${n}.`,
      problem: { json: doc(para(`${MARK} problem.`)) }, whatWeDid: { json: doc(para(`${MARK} work.`)) }, impact: { json: doc(para(`${MARK} impact.`)) },
      evidenceNote: '', showTestimonial: false,
      sector: SECTOR_KEYS[s], serviceKey: SERVICE_KEYS[i % SERVICE_KEYS.length],
      periodStart: i % 5 === 4 ? null : iso(2024, 1 + (i % 12)), periodEnd: null,
      listingOrder: i === 6 ? 1 : i === 12 ? 2 : null,
    };
  });
}
/** The three published legacy studies: real entry IDs and slugs, test text, every new field filled in. */
function legacyStudies() {
  return [
    ['4DpPjLCWdakD6tBmZNMnko', 'portfolio/seo-ameba-software', 'software-technology'],
    ['4zQL4P8SR2xogxHN4qFfUl', 'seo-for-home-decor-brand', 'ecommerce-retail'],
    ['6Ycb7aYvXrslOXKchQnqmi', 'google-ads-for-online-courses', 'education'],
  ].map(([id, slug, sector], i) => ({
    sys: { id, ...pub, firstPublishedAt: iso(2025, 7 + i) }, title: `${MARK} legacy ${i}`, slug,
    clientName: { clientName: `${MARK} legacy client ${i}, Example City`, date: 'SYNTHETIC timeline' },
    industry: { name: `${MARK} legacy industry` }, audience: { audience: `${MARK} legacy audience` },
    review: { name: `${MARK} reviewer`, testimonial: `${MARK} LEGACY QUOTE` },
    content: { json: doc(head(2, 'Problem Statement'), para(`${MARK} legacy problem. Second sentence.`), head(2, 'Results & Metrics'), para(`${MARK} LEGACY METRIC`)) },
    summary: `${MARK} LEGACY SUMMARY`, sector,
    problem: { json: doc(para(`${MARK} legacy R3 problem.`)) }, whatWeDid: { json: doc(para(`${MARK} legacy R3 work.`)) }, impact: { json: doc(para(`${MARK} legacy R3 impact.`)) },
  }));
}
/** Never public: the four unpermissioned drafts (one re-published), a reserved route, an incomplete study. */
function hiddenStudies() {
  const full = syntheticStudies(1)[0];
  const draft = { publishedVersion: null, publishedAt: null, firstPublishedAt: null };
  return [
    ['7eQ2t6t7qzpTkp3mScfi6C', 'seo-healthfirst', draft],
    ['6iXOA9jVUPJ1YZRpqorzJu', 'portfolio/local-seo-service-usa', draft],
    ['B63etvFne4B1vL7XyOZiF', 'google-ppc-for-real-estate', draft],
    ['xudVmwI50zzAYhucWzuY9', 'google-ads-for-ecommerce', { ...pub, firstPublishedAt: iso(2026, 9) }],
    ['hiddenReserved0000001', 'google-ppc-for-real-estate', pub],
    ['hiddenReserved0000002', 'portfolio/seo-healthfirst', pub],
    ['hiddenIncomplete00003', 'synthetic-incomplete', pub],
  ].map(([id, slug, sys]) => ({
    ...full, sys: { id, ...sys }, slug, title: `${MARK} HIDDEN ${slug}`,
    ...(id === 'hiddenIncomplete00003' ? { impact: { json: doc(para('  ')) } } : {}),
  }));
}

const LEGACY_ROUTES = ['google-ads-for-online-courses', 'seo-ameba-software', 'seo-for-home-decor-brand'];
const lib = () => load('lib/case-study-library.ts');

/** A Contentful mock that honours limit/skip like the real API. `fail` = HTTP status to answer with. */
function setup(items, { newFields = '1', fail = 0, configured = true } = {}) {
  const calls = [];
  if (configured) {
    process.env.CONTENTFUL_SPACE_ID = 'spacetest01';
    process.env.CONTENTFUL_ACCESS_TOKEN = 'delivery-token-test';
  } else {
    delete process.env.CONTENTFUL_SPACE_ID;
    delete process.env.CONTENTFUL_ACCESS_TOKEN;
  }
  delete process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  if (newFields) process.env.CONTENTFUL_CASE_STUDY_NEW_FIELDS = newFields; else delete process.env.CONTENTFUL_CASE_STUDY_NEW_FIELDS;
  global.fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    calls.push({ query: body.query, variables: body.variables });
    if (fail) return { ok: false, status: fail, json: async () => ({}) };
    const { skip = 0, limit = 100 } = body.variables;
    // Like the real API, a field that is not requested is not returned.
    const NEW = ['summary', 'problem', 'whatWeDid', 'impact', 'evidenceNote', 'showTestimonial', 'sector', 'serviceKey', 'periodStart', 'periodEnd', 'listingOrder'];
    const shape = (it) => Object.fromEntries(Object.entries(it).filter(([k]) => !NEW.includes(k) || new RegExp(`\\b${k}\\b`).test(body.query)));
    const page = items.slice(skip, skip + limit).map(shape);
    return { ok: true, status: 200, json: async () => ({ data: { caseStudiesCollection: { total: items.length, items: page } } }) };
  };
  return { calls, api: load('lib/contentful/case-studies.ts'), work: () => load('components/cplus/work/studies.ts') };
}
const routes = (studies) => studies.map((s) => s.slug).sort();

test('more than 100 studies: every one is read, page by page, nothing truncated', async () => {
  const items = [...legacyStudies(), ...syntheticStudies(130), ...hiddenStudies()];
  const s = setup(items);
  const studies = await s.api.fetchContentfulCaseStudies();
  assert.strictEqual(studies.length, 133);
  assert.deepStrictEqual(s.calls.map((c) => c.variables.skip), [0, 100]);
  for (const c of s.calls) assert.strictEqual(c.variables.limit, 100);
  assert.match(s.calls[0].query, /skip: \$skip/);
  assert.match(s.calls[0].query, /order: \[sys_firstPublishedAt_DESC, sys_id_ASC\]/, 'a tie-breaker keeps pages stable');
});

test('drafts, the four unpermissioned studies, reserved routes and incomplete studies are never public', async () => {
  const s = setup([...legacyStudies(), ...syntheticStudies(5), ...hiddenStudies()]);
  const slugs = routes(await s.api.fetchContentfulCaseStudies());
  for (const hidden of ['seo-healthfirst', 'local-seo-service-usa', 'google-ppc-for-real-estate', 'google-ads-for-ecommerce', 'synthetic-incomplete'])
    assert.ok(!slugs.includes(hidden), hidden);
  assert.strictEqual(slugs.length, 8);
  assert.strictEqual(await s.api.getCaseStudyDetail('google-ads-for-ecommerce'), null, 'a re-published draft stays 404');
  const { evaluateCaseStudies } = load('lib/case-study-eligibility.ts');
  const v = evaluateCaseStudies([{ id: 'anyNewEntry0000000001', slug: 'portfolio/seo-healthfirst', publishedVersion: 1, publishedAt: 'x', hasSummary: true, hasProblem: true, hasWhatWeDid: true, hasImpact: true }]);
  assert.deepStrictEqual(v.get('anyNewEntry0000000001'), { public: false, reason: 'excluded' });
});

test('flag OFF: no G6/G7 field is requested and only the three legacy studies are public', async () => {
  const s = setup([...legacyStudies(), ...syntheticStudies(20), ...hiddenStudies()], { newFields: '' });
  assert.deepStrictEqual(routes(await s.api.fetchContentfulCaseStudies()), LEGACY_ROUTES);
  for (const f of ['summary', 'sector', 'serviceKey', 'periodStart', 'periodEnd', 'listingOrder']) assert.ok(!s.calls[0].query.includes(f), f);
  const on = setup(legacyStudies());
  await on.api.fetchContentfulCaseStudies();
  for (const f of ['sector', 'serviceKey', 'periodStart', 'periodEnd', 'listingOrder']) assert.ok(on.calls[0].query.includes(f), f);
});

test('flag ON: the three legacy studies use the new template with their approved summary; flag OFF keeps them legacy', async () => {
  const off = setup(legacyStudies(), { newFields: '' });
  const before = await off.api.fetchContentfulCaseStudies();
  const on = setup(legacyStudies());
  const after = await on.api.fetchContentfulCaseStudies();
  for (const route of LEGACY_ROUTES) {
    const a = before.find((x) => x.slug === route);
    const b = after.find((x) => x.slug === route);
    assert.strictEqual(a.layout, 'legacy');
    assert.strictEqual(b.layout, 'new');
    for (const k of ['title', 'href', 'clientName', 'clientDate'])
      assert.strictEqual(b[k], a[k], `${route}.${k} (identity and URL never change)`);
    assert.strictEqual(b.metaDescription, 'SYNTHETIC LEGACY SUMMARY');
  }
  const page = fs.readFileSync(path.join(root, 'app/(pages)/portfolio/[slug]/page.tsx'), 'utf8');
  assert.ok(page.includes('const audience = caseStudy.audience;'), 'audience row kept for legacy only');
  assert.ok(!/audience/i.test(fs.readFileSync(path.join(root, 'components/case-study/CaseStudyTemplate.tsx'), 'utf8')), 'the new template never shows the free-text audience');
  assert.ok(page.includes("caseStudy.clientDate ? { label: 'Timeline', value: caseStudy.clientDate } : null"), 'legacy context row unchanged');
});

test('Contentful failure: a configured site throws (keeps the last good page); an unconfigured one is empty', async () => {
  const failing = setup(legacyStudies(), { fail: 500 });
  const { CaseStudyFetchError } = failing.api;
  await assert.rejects(failing.api.fetchContentfulCaseStudies(), CaseStudyFetchError);
  await assert.rejects(failing.api.getCaseStudyDetail('seo-ameba-software'), CaseStudyFetchError);
  const none = setup(legacyStudies(), { configured: false });
  assert.deepStrictEqual(await none.api.fetchContentfulCaseStudies(), []);
  assert.strictEqual(none.calls.length, 0);
  assert.match(fs.readFileSync(path.join(root, 'app/sitemap.ts'), 'utf8'), /getCaseStudyListCards\(\)\.catch\(\(\) => \[\]\)/, 'sitemap stays fail-soft');
});

test('static pages and search agree: one order, 12 per page, featured first, filters only narrow', async () => {
  const s = setup([...legacyStudies(), ...syntheticStudies(56), ...hiddenStudies()]);
  const { libraryStudies, libraryPage } = s.work();
  const { PAGE_SIZE, pageCount, filterStudies, facets, CONTROLS_MIN_STUDIES } = lib();
  const all = libraryStudies(await s.api.fetchContentfulCaseStudies(), 'seo-ameba-software');
  assert.strictEqual(all.length, 59);
  assert.strictEqual(PAGE_SIZE, 12);
  assert.strictEqual(pageCount(all.length), 5);
  assert.strictEqual(all[0].slug, 'synthetic-study-07', 'listing priority 1 is featured');
  assert.strictEqual(all[1].slug, 'synthetic-study-13', 'listing priority 2 comes next');
  const pages = Array.from({ length: 5 }, (_, i) => libraryPage(all, i + 1).items).flat();
  assert.deepStrictEqual(pages.map((x) => x.slug), all.map((x) => x.slug), 'the pages, joined, are the index');
  assert.strictEqual(libraryPage(all, 5).items.length, 11);
  const seo = filterStudies(all, { q: '', sector: null, service: '/seo' });
  assert.ok(seo.length > 0 && seo.every((x) => x.serviceKey === '/seo'));
  assert.ok(seo.some((x) => x.slug === 'seo-ameba-software'), 'legacy studies keep their approved service');
  const q = filterStudies(all, { q: 'KESTREL störe', sector: null, service: null });
  assert.ok(q.length > 0 && q.every((x) => x.search.includes('kestrel') && x.search.includes('store')), 'case- and accent-insensitive');
  assert.deepStrictEqual(filterStudies(all, { q: 'zzzz-no-match', sector: null, service: null }), []);
  const f = facets(all);
  assert.ok(f.services.every((o) => ['seo', 'ai-seo', 'google-ads', 'social-media-ads', 'conversion-optimization', 'lead-generation'].includes(o.value)));
  assert.ok(f.sectors.every((o) => o.count >= 2));
  assert.ok(all.length >= CONTROLS_MIN_STUDIES);
  // Without a listing priority, the approved featured slug leads, as before G7.
  const plain = setup([...legacyStudies(), ...syntheticStudies(4).map((x) => ({ ...x, listingOrder: null }))]);
  assert.strictEqual(plain.work().libraryStudies(await plain.api.fetchContentfulCaseStudies(), 'seo-ameba-software')[0].slug, 'seo-ameba-software');
});

test('the public index carries preview fields only: no withheld proof, body, review or audience', async () => {
  const s = setup([...legacyStudies(), ...syntheticStudies(8), ...hiddenStudies()]);
  const all = s.work().libraryStudies(await s.api.fetchContentfulCaseStudies(), 'seo-ameba-software');
  const keys = ['slug', 'href', 'title', 'client', 'detail', 'industry', 'service', 'stage', 'challenge', 'changed', 'outcomes', 'figures', 'sector', 'serviceKey', 'period', 'search'];
  for (const st of all) assert.deepStrictEqual(Object.keys(st).sort(), [...keys].sort());
  const json = JSON.stringify(all);
  for (const banned of ['LEGACY METRIC', 'LEGACY QUOTE', 'legacy audience', 'HIDDEN']) assert.ok(!json.includes(banned), banned);
  const route = fs.readFileSync(path.join(root, 'app/(pages)/work/index.json/route.ts'), 'utf8');
  assert.match(route, /loadLibrary\(\)/);
  assert.match(route, /'X-Robots-Tag': 'noindex'/);
});

test('library helpers: services equal the catalogue, unknown values ignored, no invented periods, URL state round-trips', () => {
  const L = lib();
  const { SERVICES } = load('lib/services.ts');
  assert.deepStrictEqual(Object.keys(L.SERVICE_FILTERS).sort(), Object.keys(SERVICES).sort());
  assert.strictEqual(L.asService('/web-design'), null);
  assert.strictEqual(L.asSector('religion'), null);
  assert.strictEqual(L.asListingOrder(0), null);
  assert.strictEqual(L.asListingOrder(2.5), null);
  assert.strictEqual(L.periodLabel(null, '2026-02-01'), '');
  assert.strictEqual(L.periodLabel('2024-09-12', '2026-02-28'), 'Sep 2024 – Feb 2026');
  assert.strictEqual(L.periodLabel('2025-11-01', null), 'Since Nov 2025');
  const state = { q: 'real estate', sector: 'real-estate', service: '/google-ads', page: 3 };
  assert.deepStrictEqual(L.parseLibraryQuery(L.libraryQuery(state)), state);
  assert.deepStrictEqual(L.parseLibraryQuery('?industry=nope&service=web-design&p=-4'), { q: '', sector: null, service: null, page: 1 });
  assert.strictEqual(L.pageHref(1), '/work');
  assert.strictEqual(L.pageHref(4), '/work/page/4');
});

test('pagination routes: /work/page/1 redirects, unknown pages 404 with noindex, pages are self-canonical', () => {
  const src = fs.readFileSync(path.join(root, 'app/(pages)/work/page/[n]/page.tsx'), 'utf8');
  assert.match(src, /if \(n === 1\) permanentRedirect\('\/work'\);/);
  assert.match(src, /if \(!library\) notFound\(\);/);
  assert.match(src, /robots: 'noindex, nofollow'/);
  assert.match(src, /`\/work\/page\/\$\{n\}`/);
  assert.match(src, /export const revalidate = 60;/);
  assert.match(src, /\/\^\[1-9\]\[0-9\]\{0,3\}\$\//, 'only plain page numbers');
});

test('synthetic data never reaches the application code', () => {
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
  const files = ['app', 'lib', 'components'].flatMap((d) => walk(path.join(root, d))).filter((f) => /\.(t|j)sx?$|\.css$/.test(f));
  for (const f of files) {
    const s = fs.readFileSync(f, 'utf8');
    assert.ok(!s.includes(MARK) && !/(require\(|from )['"][^'"]*tests\//.test(s), path.relative(root, f));
  }
});
