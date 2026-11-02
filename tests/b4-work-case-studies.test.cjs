// B4: /work and the case-study template (typography floors, H1 emphasis, date format, CTA labels, filters, breadcrumb JSON-LD, sitemap).
// Runs the real application TypeScript through tests/helpers/ts-loader.cjs. No network, no Contentful.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { load, root } = require('./helpers/ts-loader.cjs');

const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const L = load('lib/case-study-library.ts');
const H = load('lib/case-study-headline.ts');

// The 21 published H1s as served on 2 November 2026 (public pages), used only to prove the emphasis phrases are exact runs inside them.
const TITLES = {
  'om-sai-developer-meta-ads': 'Meta ads for a Chembur housing developer',
  'classpe-social-media-strategy': 'Approximately 95 percent student growth in four months',
  'insuryo-organic-growth': 'From an idea to four major projects and a ₹20 crore valuation',
  'seo-ameba-software': '75.34 percent more organic clicks and 55.88 percent more enquiries',
  'google-ads-for-online-courses': '1,410 paid enrolments attributed to Google Ads',
  'anybodycanbake-meta-ads': 'Adapting course advertising as learning preferences changed',
  'ekoching-google-ads': 'Google Ads linked to 178 paid enrolments for a coaching institute',
  'klenzmo-meta-ads': 'Meta Ads linked to 3,957 products sold for Klenzmo',
  'bakersville-google-ads': 'Google Ads linked to 4,324 products sold for Bakersville',
  'phoenix-laundry-google-ads': 'Google Ads linked to 640 new customers for Phoenix Laundry',
  'hutnhomes-meta-ads': 'Meta Ads linked to 329 site visits and 23 reported sales for HutnHomes',
  'anybodycanbake-seo': '25.49 percent more organic clicks and 46.15 percent more course enquiries',
  'advit-prints-meta-ads': '874 attributed orders from Meta Ads at ₹411.90 per order',
  'meticulous-business-plan-google-ads': '27 signed engagements from Google Ads at ₹13,333.33 each',
  'libros-library-meta-ads': '540 new paid memberships at ₹400 per member',
  'bakedemy-google-ads': '627 paid enrolments from learners searching for baking education',
  'bakedemy-meta-ads': '738 paid enrolments by turning baking interest into learning intent',
  'bblewrap-google-ads': '6 signed design projects from Google Ads',
  'talreja-talreja-google-ads': '19 signed engagements from Google Ads at ₹9,473.68 each',
  'wanderlooms-meta-ads': '6,607 attributed orders and 3.12× revenue ROAS from Meta Ads',
  'seo-for-home-decor-brand': 'SEO for eCommerce Home Decor Brand',
};

test('B4-02: H1 runs always rejoin to the exact title; only a listed result phrase is emphasised', () => {
  for (const [slug, title] of Object.entries(TITLES)) {
    const r = H.headlineRuns(slug, title);
    assert.strictEqual(r.before + r.em + r.after, title, slug);
    if (r.em) assert.strictEqual(r.em, H.HEADLINE_RESULT_PHRASES[slug], slug);
  }
  for (const [slug, phrase] of Object.entries(H.HEADLINE_RESULT_PHRASES)) {
    assert.ok(TITLES[slug].includes(phrase), `${slug}: the phrase is an exact run of the title`);
    assert.match(phrase, /\d/, `${slug}: a result phrase states a figure`);
  }
});

test('B4-02: no client name, qualifier or unlisted study is emphasised', () => {
  const none = ['om-sai-developer-meta-ads', 'classpe-social-media-strategy', 'insuryo-organic-growth', 'seo-ameba-software', 'anybodycanbake-meta-ads', 'anybodycanbake-seo', 'seo-for-home-decor-brand'];
  for (const slug of none) assert.strictEqual(H.headlineRuns(slug, TITLES[slug]).em, '', slug);
  for (const [slug, phrase] of Object.entries(H.HEADLINE_RESULT_PHRASES)) {
    const client = /for ([A-Z][\w ]+)$/.exec(TITLES[slug]);
    if (client) assert.ok(!phrase.includes(client[1]), slug);
  }
  // the qualifiers the titles carry stay inside the emphasised run
  assert.ok(H.headlineRuns('advit-prints-meta-ads', TITLES['advit-prints-meta-ads']).em.includes('attributed'));
  assert.ok(H.headlineRuns('wanderlooms-meta-ads', TITLES['wanderlooms-meta-ads']).em.includes('attributed'));
  assert.ok(H.headlineRuns('hutnhomes-meta-ads', TITLES['hutnhomes-meta-ads']).em.includes('reported'));
  // a title that changes so the phrase no longer matches falls back to one colour
  assert.deepStrictEqual({ ...H.headlineRuns('ekoching-google-ads', 'A different title') }, { before: 'A different title', em: '', after: '' });
});

test('B4-02: displayed date ranges use "to", values are unchanged, no long dash', () => {
  assert.strictEqual(L.periodLabel('2024-09-12', '2025-03-02'), 'Sep 2024 to Mar 2025');
  assert.strictEqual(L.periodLabel('2024-09-12', '2024-09-30'), 'Sep 2024');
  assert.strictEqual(L.periodLabel('2024-09-12', null), 'Since Sep 2024');
  assert.strictEqual(L.periodLabel(null, '2025-03-02'), '');
  assert.ok(!/[–]/.test(read('components/b2/WorkLibrary.tsx')), 'no en dash left in the library component (the range was the rendered one)');
  assert.match(read('components/b2/WorkLibrary.tsx'), /`Showing \$\{\(p - 1\) \* PAGE_SIZE \+ 1\} to \$\{Math\.min\(p \* PAGE_SIZE, n\)\}`/);
});

test('B4-03: closing and mid-page labels by service, one destination each, Request a Call secondary', () => {
  const t = read('components/case-study/CaseStudyTemplate.tsx');
  assert.match(t, /route === '\/google-ads' \? 'Discuss Your Google Ads' : route === '\/social-media-ads' \? 'Discuss Your Meta Ads' : 'Discuss Your Advertising'/);
  assert.match(t, /const GENERAL_CTA = 'Discuss Your Advertising';/);
  assert.match(t, /<Link href=\{CONTACT_HREF\} className="ct-prompt-a">\s*\{GENERAL_CTA\} <Arrow \/>/);
  assert.match(t, /<ActionLink href=\{BOOKING_HREF\} variant="text">\s*Request a Call/);
  assert.strictEqual((t.match(/Request a Call/g) || []).length, 1, 'one secondary action, not repeated mid-page');
  assert.doesNotMatch(t, /Contact us|Request a call|Goals/);
  const prim = read('components/direction-c/primitives.tsx');
  assert.match(prim, /BOOKING_HREF = '\/contact\?intent=call'/);
  assert.match(prim, /CONTACT_HREF = '\/contact'/);
  const w = read('components/cplus/work/content.ts');
  assert.match(w, /primary: 'Discuss Your Advertising'/);
  assert.match(w, /secondary: 'Request a Call'/);
});

test('B4-05: service labels and filter order', () => {
  assert.deepStrictEqual(Object.keys(L.SERVICE_FILTERS).slice(0, 3), ['/google-ads', '/social-media-ads', '/seo']);
  assert.strictEqual(L.SERVICE_FILTERS['/social-media-ads'], 'Meta Ads');
  assert.strictEqual(L.caseServiceLabel('/social-media-ads', 'Social Media Ads'), 'Meta Ads');
  assert.strictEqual(L.caseServiceLabel('/google-ads', 'Google Ads'), 'Google Ads');
  assert.strictEqual(L.caseServiceLabel('/seo', 'SEO'), 'SEO');
  assert.strictEqual(L.caseServiceLabel('/lead-generation', 'Lead Generation'), 'Lead Generation');
  const mk = (serviceKey) => ({ search: '', sector: null, serviceKey });
  const f = L.facets([mk('/seo'), mk('/social-media-ads'), mk('/google-ads'), mk('/lead-generation'), mk(null)]);
  assert.deepStrictEqual(f.services.map((o) => o.label), ['Google Ads', 'Meta Ads', 'SEO', 'Lead generation']);
  assert.deepStrictEqual(f.services.map((o) => o.value), ['google-ads', 'social-media-ads', 'seo', 'lead-generation'], 'URL values (the internal keys) are unchanged');
  // a study with no service (ClassPe, InsurYo) is in no service filter
  assert.deepStrictEqual(L.filterStudies([mk(null), mk('/google-ads')], { q: '', sector: null, service: '/google-ads' }).length, 1);
  assert.strictEqual(L.filterStudies([mk(null)], { q: '', sector: null, service: '/social-media-ads' }).length, 0);
});

// The 20 public studies in the order served before the B4 reorder (live /work/index.json, 2 November 2026).
const LIVE = ['om-sai-developer-meta-ads', 'classpe-social-media-strategy', 'insuryo-organic-growth', 'seo-ameba-software', 'google-ads-for-online-courses', 'anybodycanbake-meta-ads', 'ekoching-google-ads', 'klenzmo-meta-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads', 'hutnhomes-meta-ads', 'anybodycanbake-seo', 'advit-prints-meta-ads', 'meticulous-business-plan-google-ads', 'libros-library-meta-ads', 'bakedemy-google-ads', 'bakedemy-meta-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads', 'wanderlooms-meta-ads'];
const APPROVED_12 = ['om-sai-developer-meta-ads', 'google-ads-for-online-courses', 'anybodycanbake-meta-ads', 'ekoching-google-ads', 'klenzmo-meta-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads', 'hutnhomes-meta-ads', 'seo-ameba-software', 'anybodycanbake-seo', 'classpe-social-media-strategy', 'insuryo-organic-growth'];
const SERVICE = { 'om-sai-developer-meta-ads': '/social-media-ads', 'classpe-social-media-strategy': null, 'insuryo-organic-growth': null, 'seo-ameba-software': '/seo', 'google-ads-for-online-courses': '/google-ads', 'anybodycanbake-meta-ads': '/social-media-ads', 'anybodycanbake-seo': '/seo' };

test('B4-04: the approved lead order, owner-approved, code only', () => {
  assert.deepStrictEqual([...L.APPROVED_LEAD_ORDER], APPROVED_12);
  for (const slug of APPROVED_12) assert.ok(LIVE.includes(slug), `${slug} matches a published study`);
  const out = L.leadOrdered(LIVE, (s) => s);
  assert.deepStrictEqual(out.slice(0, 12), APPROVED_12, 'exact first 12');
  assert.deepStrictEqual(out.slice(12), LIVE.slice(12), 'positions 13 to 20 keep their relative order');
  assert.strictEqual(out.length, LIVE.length);
  assert.deepStrictEqual([...out].sort(), [...LIVE].sort(), 'nothing added or removed');
  assert.ok(out.indexOf('classpe-social-media-strategy') < 12 && out.indexOf('insuryo-organic-growth') < 12, 'ClassPe and InsurYo stay on page 1');
  assert.deepStrictEqual(L.leadOrdered(out, (s) => s), out, 'idempotent');
  assert.ok(!out.includes('seo-for-home-decor-brand'), 'the unlisted study is not promoted');
  assert.deepStrictEqual(L.leadOrdered(['x', 'klenzmo-meta-ads', 'om-sai-developer-meta-ads'], (s) => s), ['om-sai-developer-meta-ads', 'klenzmo-meta-ads', 'x'], 'a slug that is not published is skipped, never invented');
  const cs = read('lib/contentful/case-studies.ts');
  assert.match(cs, /leadOrdered\(orderStudies\(selectPublic\(await fetchAllCaseStudiesRaw\(\)\), \(s\) => s\.library\.listingOrder\), \(s\) => s\.slug\)/);
  assert.doesNotMatch(read('lib/case-study-library.ts').split('export function leadOrdered')[1].split('export function orderStudies')[0], /contentful|fetch|listingOrder/i);
  assert.doesNotMatch(read('lib/case-study-eligibility.ts'), /classpe|insuryo/i);
});

test('B4-04: filters, search and paging behave on the approved order', () => {
  const out = L.leadOrdered(LIVE, (s) => s);
  const rows = out.map((slug) => ({ slug, search: slug.replace(/-/g, ' '), sector: null, serviceKey: slug in SERVICE ? SERVICE[slug] : slug.includes('google-ads') ? '/google-ads' : '/social-media-ads' }));
  for (const svc of ['/google-ads', '/social-media-ads']) {
    const hit = L.filterStudies(rows, { q: '', sector: null, service: svc }).map((r) => r.slug);
    assert.ok(!hit.includes('classpe-social-media-strategy') && !hit.includes('insuryo-organic-growth'), svc);
    assert.deepStrictEqual(hit, out.filter((x) => hit.includes(x)), 'a filter only narrows and keeps the order');
  }
  assert.deepStrictEqual(L.filterStudies(rows, { q: 'bakedemy', sector: null, service: null }).map((r) => r.slug), ['bakedemy-google-ads', 'bakedemy-meta-ads']);
  assert.deepStrictEqual(L.pageSlice(out, 1), APPROVED_12);
  assert.deepStrictEqual(L.pageSlice(out, 2), LIVE.slice(12));
  assert.strictEqual(L.pageCount(out.length), 2);
});

test('B4-06: case-study BreadcrumbList, page 2 title, sitemap and unchanged indexing rules', () => {
  const t = read('components/case-study/CaseStudyTemplate.tsx');
  assert.match(t, /routeTrailJsonLd\(\[\s*\{ name: 'Home', href: '\/' \},\s*\{ name: 'Case studies', href: '\/work' \},\s*\{ name: client, href: study\.href \},\s*\]\)/);
  const { routeTrailJsonLd } = load('components/routes/primitives.tsx');
  const ld = JSON.parse(routeTrailJsonLd([{ name: 'Home', href: '/' }, { name: 'Case studies', href: '/work' }, { name: 'Klenzmo', href: '/portfolio/klenzmo-meta-ads' }]));
  assert.strictEqual(ld['@type'], 'BreadcrumbList');
  assert.deepStrictEqual(ld.itemListElement.map((i) => [i.position, i.name]), [[1, 'Home'], [2, 'Case studies'], [3, 'Klenzmo']]);
  assert.ok(ld.itemListElement[2].item.endsWith('/portfolio/klenzmo-meta-ads'));
  const p2 = read('app/(pages)/work/page/[n]/page.tsx');
  assert.match(p2, /`Work, page \$\{n\} \| MappedSkills`/);
  assert.doesNotMatch(p2, /[–—]/);
  assert.match(p2, /`\/work\/page\/\$\{n\}`/, 'self-canonical');
  assert.ok(p2.indexOf("return createMetadata(") > p2.indexOf("noindex, nofollow"), 'only the not-found branch is noindex; the real page goes through createMetadata');
  assert.strictEqual((p2.match(/noindex/g) || []).length, 2, 'the two mentions are the not-found branch and its comment');
  const sm = read('app/sitemap.ts');
  assert.match(sm, /Array\.from\(\{ length: pageCount\(caseStudies\.length\) - 1 \}, \(_, i\) => \(\{ url: `\$\{baseUrl\}\$\{pageHref\(i \+ 2\)\}` \}\)\)/);
  assert.strictEqual(L.pageHref(2), '/work/page/2');
  assert.strictEqual(L.pageCount(20), 2);
  assert.strictEqual(L.pageCount(12), 1, 'no page 2 listed until a thirteenth study exists');
  assert.match(read('app/(pages)/portfolio/[slug]/page.tsx'), /UNLISTED_CASE_STUDY_IDS\.has\(caseStudy\.id\) \? \{ \.\.\.metadata, robots: \{ index: false, follow: true/);
});

test('B4-01: typography floors on the case-study template and /work', () => {
  const sizes = (css, re) => [...css.matchAll(re)].map((m) => ({ sel: m[1].trim().slice(0, 60), rem: Number(m[2]) }));
  for (const f of ['components/case-study/case-study.css', 'components/b2/work.css']) {
    const css = read(f);
    // every `font:` shorthand and `font-size` in rem on a text selector is at least 12 px (.75rem); em-relative sizes inside a figure are not text labels
    const found = [...sizes(css, /([^{}]+)\{[^}]*?font(?:-size)?:\s*(?:[0-9]+\s+)?(0?\.[0-9]+)rem/g)];
    for (const s of found) assert.ok(s.rem >= 0.75, `${f}: ${s.sel} is ${s.rem}rem`);
    for (const m of css.matchAll(/([^{}]*figcaption[^{}]*)\{[^}]*font-size:\s*([0-9.]+)rem/g)) assert.ok(Number(m[2]) >= 0.875, `${f}: caption ${m[1].trim()} is ${m[2]}rem`);
  }
  const w = read('components/b2/work.css');
  assert.doesNotMatch(w, /#3a3542/);
  assert.match(w, /h1 span \{ color: var\(--resolve-accent-deep\); \}/);
  assert.match(read('app/globals.css'), /--resolve-accent-deep: #D94400;/);
  assert.match(read('components/case-study/case-study.css'), /\.ct-prompt-a \{[^}]*min-height: 52px;[^}]*border-radius: 999px/);
});

test('B4: printing a case study shows every entrance settled (nothing armed or pending prints hidden)', () => {
  const css = read('components/case-study/case-study.css');
  const print = css.slice(css.indexOf('@media print {'));
  assert.ok(css.includes('@media print {'), 'case-study.css has a print block');
  // each hidden start state set by PaReveal (data-pending) or HwSequence (data-anim=armed) is reversed for print
  assert.match(print, /\[data-reveal\]\[data-pending\] \{ opacity: 1 !important; transform: none !important;/);
  assert.match(print, /\.ct-stage-frame\[data-anim='armed'\] \.ct-stage-img \{ clip-path: none !important; \}/);
  for (const sel of [".ct-stage-frame[data-anim='armed'] .ct-stage-mark", ".ca-host[data-anim='armed'] .ca-rise", ".ca-host[data-anim='armed'] .ca-pop", ".ca-host[data-anim='armed'] .ca-draw"]) {
    assert.ok(print.includes(sel), `print restores ${sel}`);
  }
  assert.ok(print.includes(".ct-said[data-anim='armed'] > li::before") && print.includes('.ct-take[data-pending]::before'), 'print draws the card rules and takeaway bars');
  // the screen motion itself is unchanged: the armed clip still exists for normal visitors
  assert.match(css, /\.ct-stage-frame\.is-photo\[data-anim='armed'\] \.ct-stage-img \{ animation: none; clip-path: inset\(0 0 100% 0\); \}/);
});
