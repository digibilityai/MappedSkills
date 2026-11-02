// Guards for the reusable case showcase and its pilot on /social-media-ads and /seo (DEC-115).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
Module._extensions['.css'] = () => {};
const realLoad = Module._load;
Module._load = function (request, ...rest) {
  if (request === 'next/font/local' || request === 'next/font/google') return () => ({ className: '', variable: '', style: {} });
  return realLoad.call(this, request, ...rest);
};
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const { selectCases, viewAllTarget, viewAllFor, SHOWCASE_MAX } = load('components/case-showcase/select.ts');
const { ShowcaseTrack } = load('components/case-showcase/ShowcaseTrack.tsx');

const S = (href, serviceKey) => ({ href, serviceKey });
const META = ['/portfolio/om-sai-developer-meta-ads', '/portfolio/klenzmo-meta-ads', '/portfolio/anybodycanbake-meta-ads'];

test('selection: the page\'s cases in its order, only those in the public library, at most three, none twice', () => {
  const lib = [S('/a', null), S(META[2], '/social-media-ads'), S(META[0], '/social-media-ads'), S(META[1], '/social-media-ads'), S('/z', '/social-media-ads')];
  assert.deepStrictEqual(selectCases(lib, META).map((s) => s.href), META);
  assert.deepStrictEqual(selectCases(lib, [...META, META[0]]).map((s) => s.href), META, 'no duplicates');
  assert.deepStrictEqual(selectCases(lib.filter((s) => s.href !== META[1]), META).map((s) => s.href), [META[0], META[2]], 'an unpublished case is skipped');
  assert.deepStrictEqual(selectCases(lib.filter((s) => s.href === META[0]), META).map((s) => s.href), [META[0]], 'one case');
  assert.deepStrictEqual(selectCases([S('/a', null)], META), [], 'none: the section hides');
  assert.strictEqual(SHOWCASE_MAX, 3);
  assert.strictEqual(selectCases([...lib, S('/y', '/social-media-ads')], [], { fillService: '/social-media-ads' }).length, 3, 'filling stops at three');
  assert.deepStrictEqual(selectCases(lib, [META[0]], { fillService: '/social-media-ads' }).map((s) => s.href)[0], META[0], 'preferred first, then the fill');
});

test('View all: the real /work filter keys, and a filter is promised only when the library can honour it', () => {
  const many = (n, k) => Array.from({ length: n }, (_, i) => S('/s' + i, i === 0 ? k : null));
  const meta = viewAllTarget(many(7, '/social-media-ads'), '/social-media-ads', 'View all Meta Ads case studies');
  assert.deepStrictEqual(meta, { href: '/work?service=social-media-ads', label: 'View all Meta Ads case studies', filtered: true });
  const seo = viewAllTarget(many(20, '/seo'), '/seo', 'View all SEO case studies');
  assert.strictEqual(seo.href, '/work?service=seo');
  const low = viewAllTarget(many(6, '/seo'), '/seo', 'View all SEO case studies');
  assert.deepStrictEqual(low, { href: '/work', label: 'View all case studies', filtered: false }, 'production today has six public studies: no filter promise');
  assert.strictEqual(viewAllTarget(many(20, '/google-ads'), '/seo', 'x').href, '/work', 'no study of that service: plain link');
  const { SERVICE_FILTERS } = load('lib/case-study-library.ts');
  assert.ok('/social-media-ads' in SERVICE_FILTERS && '/seo' in SERVICE_FILTERS);
});

test('the track: previous and next buttons and a status for two or more cards, none for one', () => {
  const li = (n) => React.createElement('li', { key: n }, 'card ' + n);
  const three = renderToStaticMarkup(React.createElement(ShowcaseTrack, { count: 3, trackId: 't', label: 'Case studies' }, [li(1), li(2), li(3)]));
  assert.ok(three.includes('aria-label="Previous case study"') && three.includes('aria-label="Next case study"') && three.includes('Case 1 of 3') && three.includes('role="status"'));
  assert.ok(three.includes('aria-controls="t"') && three.includes('disabled=""'), 'previous is disabled at the start');
  const one = renderToStaticMarkup(React.createElement(ShowcaseTrack, { count: 1, trackId: 't', label: 'Case studies' }, [li(1)]));
  assert.ok(!one.includes('Next case study'));
  const js = code(read('components/case-showcase/ShowcaseTrack.tsx'));
  assert.ok(!/setInterval|setTimeout|autoplay/i.test(js), 'nothing moves by itself');
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /io\.disconnect\(\)/, 'the reveal runs once');
});

test('the loader reads only the public library, shows a figure only while the study has one, and returns nothing at zero', () => {
  const c = code(read('components/case-showcase/CaseShowcase.tsx'));
  assert.match(c, /await loadLibrary\(\)/);
  assert.match(c, /const lead = s\.lead \? \(o\.outcome \?\? s\.lead\) : null;/, 'an override can never reveal a withheld figure');
  assert.match(c, /if \(!picked\.length\) return null;/);
  assert.match(c, /catch \{\s*return null;/, 'an unreadable library renders nothing');
  assert.match(c, /if \(!data \|\| !data\.cards\.length\) return null;/, 'the view hides at zero');
  for (const banned of ['case-study-local', 'case-study-final-four', 'case-study-paid-batch', 'NEXT_PUBLIC', 'process.env', 'isCaseStudyProofWithheld']) assert.ok(!c.includes(banned), 'does not touch ' + banned);
  assert.ok(!/conceptual|illustrative/i.test(c), 'no visible conceptual badge');
  assert.match(c, /alt=\{s\.art\.alt\}/, 'the accurate alt text is kept');
  assert.match(c, /width=\{s\.art\.w\} height=\{s\.art\.h\}/, 'artwork at its own size');
});

test('styles: artwork whole, no hover zoom, restrained motion off under reduced motion, no sticky, readable sizes', () => {
  const css = read('components/case-showcase/case-showcase.css');
  assert.ok(!/object-fit:\s*cover/.test(css), 'no cropping');
  assert.ok(!/scale\(1\.\d/.test(css), 'no hover zoom');
  assert.ok(!/position:\s*(sticky|fixed)/.test(css));
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*data-cs-motion="pre"/);
  assert.ok(!/animation:|@keyframes|infinite/.test(css), 'no looping or keyframe animation');
  const sizes = [...css.matchAll(/font(?:-size)?:\s*(?:\d+\s+)?(\.?\d*\.?\d+)rem/g)].map((m) => Number(m[1]));
  assert.ok(Math.min(...sizes) >= 0.75, 'labels 12px or more');
  assert.ok(!/\.\d*(?:8125|78|6875)rem/.test(css.replace(/\.8125rem/g, '')), 'no small notes');
  assert.match(css, /\.cs \.cs-per \{[^}]*font-size: \.9375rem/, 'secondary notes 15px');
  assert.match(css, /scroll-snap-type: x proximity/, 'a swipeable row that never traps');
});

test('the pilot pages: one showcase each, the right cases and View all service, the old sections gone, existing anchors kept', () => {
  const meta = read('components/meta-ads-r22/MetaAdsR22.tsx');
  assert.strictEqual((meta.match(/<CaseShowcase /g) || []).length, 1);
  assert.ok(!/RelatedCaseCards|mr2-work|WORK\.items/.test(code(meta)), 'bespoke cards and the auto list are gone');
  const mc = load('components/meta-ads-r22/showcase.ts').META_SHOWCASE;
  assert.strictEqual(mc.id, 'mr1-work-h'); assert.deepStrictEqual(mc.aliases, ['mr22-more-h']);
  assert.deepStrictEqual(mc.preferred, META);
  assert.deepStrictEqual(mc.viewAll, { service: '/social-media-ads', label: 'View all Meta Ads case studies' });
  assert.match(read('app/(pages)/social-media-ads/page.tsx'), /await loadCaseShowcase\(META_SHOWCASE\)/);
  const seo = read('components/cplus/seo/SeoBody.tsx');
  assert.strictEqual((seo.match(/<CaseShowcase /g) || []).length, 1);
  assert.ok(!/sk-proof|sk-case|sk-ameba/.test(code(seo)), 'the bespoke proof section is gone');
  const sc = load('components/cplus/seo/showcase.ts').SEO_SHOWCASE;
  assert.strictEqual(sc.id, 'sk-h-proof');
  assert.deepStrictEqual(sc.preferred, ['/portfolio/anybodycanbake-seo', '/portfolio/seo-ameba-software']);
  assert.deepStrictEqual(sc.viewAll, { service: '/seo', label: 'View all SEO case studies' });
  assert.strictEqual(sc.overrides['/portfolio/anybodycanbake-seo'].outcome.v, '46.15%');
  assert.ok(!('outcome' in sc.overrides['/portfolio/seo-ameba-software']), 'Ameba takes its figure from its own approved entry, never from the page');
  assert.strictEqual(sc.heading(['/portfolio/seo-ameba-software']).join('').includes('delivered'), true, 'a heading that does not promise results without the AnybodyCanBake case');
});

test('/work: only the select now shows a shared service filter; layout, naming and pagination untouched', () => {
  const w = read('components/b2/WorkLibrary.tsx');
  assert.match(w, /value=\{filter\.service \? filter\.service\.slice\(1\) : ''\}/);
});

// ---- DEC-116 rollout: five more pages ----
const RO = [
  ['google-ads-r41', 'GOOGLE_ADS_SHOWCASE', ['google-ads-for-online-courses', 'meticulous-business-plan-google-ads', 'bakersville-google-ads'], 'service: \'/google-ads\''],
  ['d2c-r1', 'D2C_SHOWCASE', ['klenzmo-meta-ads', 'bakersville-google-ads', 'advit-prints-meta-ads'], 'sector: \'ecommerce-retail\''],
  ['education-r2', 'EDUCATION_SHOWCASE', ['google-ads-for-online-courses', 'ekoching-google-ads', 'bakedemy-meta-ads'], 'sector: \'education\''],
  ['real-estate-r2', 'REAL_ESTATE_SHOWCASE', ['om-sai-developer-meta-ads', 'hutnhomes-meta-ads'], 'sector: \'real-estate\''],
  ['enquiry-led-r11', 'ENQUIRY_LED_SHOWCASE', ['meticulous-business-plan-google-ads', 'phoenix-laundry-google-ads', 'talreja-talreja-google-ads'], null],
];

test('rollout: each page names the owner-approved cases in order, and View all uses an existing /work filter (or the plain link for enquiry-led)', () => {
  for (const [dir, name, slugs, filter] of RO) {
    const src = code(read(`components/${dir}/showcase.ts`));
    assert.ok(src.includes(`export const ${name}`), name);
    const got = [...src.matchAll(/'\/portfolio\/([a-z0-9-]+)'/g)].map((m) => m[1]);
    assert.deepStrictEqual(got, slugs, `${name}: cases and order`);
    if (filter) assert.ok(src.includes(filter), `${name}: filter ${filter}`);
    else assert.doesNotMatch(src, /viewAll: \{[^}]*(service|sector)/, `${name}: no filter, plain link`);
    assert.ok(!/wanderlooms|home-decor/i.test(src), `${name}: neither Wanderlooms nor Home Decor`);
  }
  // Bakedemy: the education page features the Meta Ads study, never the Google Ads one
  assert.ok(!read('components/education-r2/showcase.ts').includes('bakedemy-google-ads'));
  const pages = { 'google-ads': 'GOOGLE_ADS_SHOWCASE', 'who-we-help/d2c': 'D2C_SHOWCASE', 'who-we-help/education': 'EDUCATION_SHOWCASE', 'who-we-help/real-estate': 'REAL_ESTATE_SHOWCASE', 'who-we-help/enquiry-led-businesses': 'ENQUIRY_LED_SHOWCASE' };
  for (const [route, name] of Object.entries(pages)) {
    const pg = read(`app/(pages)/${route}/page.tsx`);
    assert.match(pg, new RegExp(`await loadCaseShowcase\\(${name}\\)`), route);
    assert.match(pg, /showcase=\{showcase\}/, route);
    assert.match(pg, /export const metadata = createMetadata\(/, `${route}: metadata unchanged`);
  }
});

test('rollout: View all by industry only when /work shows its controls and offers that industry; fallback fill by audience', () => {
  const many = (n, sector) => Array.from({ length: n }, (_, i) => ({ href: '/p' + i, serviceKey: null, sector: i < 2 ? sector : null }));
  assert.deepStrictEqual(viewAllFor(many(20, 'education'), { sector: 'education' }, 'View all education case studies'), { href: '/work?industry=education', label: 'View all education case studies', filtered: true });
  const low = viewAllFor(many(5, 'education'), { sector: 'education' }, 'View all education case studies');
  assert.deepStrictEqual([low.href, low.label, low.filtered], ['/work', 'View all case studies', false], 'fewer than seven public studies: plain link');
  const one = [{ href: '/a', serviceKey: null, sector: 'education' }, ...Array.from({ length: 9 }, (_, i) => ({ href: '/b' + i, serviceKey: null, sector: null }))];
  assert.strictEqual(viewAllFor(one, { sector: 'education' }, 'x').href, '/work', 'one study of that industry: no such filter option');
  assert.strictEqual(viewAllFor(many(20, 'education'), {}, 'x').href, '/work', 'no accurate filter: plain link');
  assert.strictEqual(viewAllFor(many(20, 'education'), { service: '/seo' }, 'x').href, '/work', 'service path unchanged');
  const lib = [S('/a', null), S('/b', null), S('/c', null), S('/d', null)];
  assert.deepStrictEqual(selectCases(lib, ['/c'], { fillWhere: (s) => s.href !== '/a' }).map((s) => s.href), ['/c', '/b', '/d'], 'fill adds matching studies after the preferred ones');
  assert.deepStrictEqual(selectCases(lib, ['/zz'], { fillWhere: () => false }), [], 'nothing eligible: nothing shown');
});

test('rollout: the existing card is kept only while the showcase has nothing to show, and anchors survive', () => {
  for (const f of ['google-ads-r41/GoogleAdsR41', 'd2c-r1/D2CR1', 'education-r2/EducationR2', 'real-estate-r2/RealEstateR2']) {
    const c = read(`components/${f}.tsx`);
    assert.match(c, /showcase \? <CaseShowcase data=\{showcase\} \/> : \(\s*\n\s*<section/, f);
  }
  for (const [dir, ids] of [['d2c-r1', ['client-work', 'd2c1-more-h']], ['education-r2', ['client-work', 'edr2-more-h']], ['real-estate-r2', ['client-work', 'rer2-more-h']], ['google-ads-r41', ['ga41-more-h']]]) {
    const src = read(`components/${dir}/showcase.ts`);
    for (const id of ids) assert.ok(src.includes(`'${id}'`), `${dir}: anchor ${id} kept`);
  }
});

// --- B1 shared components (Brand DNA 4.0 revision 4: A3 label floor, A4 and D-10 emphasis by meaning, A9 no long dashes, A12 targets) ---
test('B1: showcase dates and eyebrow carry no long dash, and a range reads "to"', () => {
  const { plainRange } = load('lib/case-study-library.ts');
  assert.strictEqual(plainRange('Apr 2026 \u2013 Sep 2026'), 'Apr 2026 to Sep 2026');
  assert.strictEqual(plainRange('May\u2013July 2026 versus August\u2014October 2026'), 'May to July 2026 versus August to October 2026');
  assert.strictEqual(plainRange('Since Nov 2025'), 'Since Nov 2025', 'no dash, no change');
  assert.strictEqual(plainRange(''), '');
  const tsx = code(read('components/case-showcase/CaseShowcase.tsx'));
  assert.ok(!/[\u2013\u2014]/.test(tsx), 'no long dash in the component output');
  assert.match(tsx, /plainRange\(o\.period \?\? s\.period\)/, 'every period passes through the shared formatter');
});

test('B1: showcase heading is one colour and "View all" is a 44 px target', () => {
  const css = read('components/case-showcase/case-showcase.css');
  assert.match(css, /\.cs \.cs-head h2 em \{[^}]*color: inherit/, 'the heading is not split into two colours');
  assert.ok(!/cs-head h2 em \{[^}]*#(?:D94400|FF5B04)/i.test(css));
  assert.match(css, /\.cs \.cs-all \{[^}]*min-height: 44px/);
});

test('B1: header and footer labels are at least 12 px, footer notes at least 14 px', () => {
  const css = read('app/direction-c.css');
  const size = (re) => { const m = css.match(re); assert.ok(m, String(re)); return Number(m[1]); };
  assert.ok(size(/\.dc-hdr \.dc-label \{ font-size: (\.\d+)rem/) >= 0.75, 'header label');
  assert.ok(size(/\.dc-ftr h2, \.dc-ftr \.dc-ftr-h \{ font: 700 (\.\d+)rem/) >= 0.75, 'footer group label');
  assert.ok(size(/\.dc-ftr \.dc-brand > \.dc-ftr-chain \{[^}]*font: 700 (\.\d+)rem/) >= 0.75, 'footer chain label');
  assert.ok(size(/\.dc-ftr \.dc-base \{[^}]*font-size: (\.\d+)rem/) >= 0.875, 'footer base line');
});
