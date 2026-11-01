// The eight case studies of the 31 October 2026 local review batch (AnybodyCanBake SEO, Advit Prints, Meticulous Business Plan, Libros
// Library, Bakedemy Google Ads, Bakedemy Meta Ads, Bblewrap, Talreja & Talreja), from MappedSkills_8_Final_Case_Studies_and_Image_Briefs.docx.
// Local preview only: the copy is a development fixture (lib/case-study-local-batch.ts) and the images are supplied artwork. Checks the
// mapping, every number against the supplied inputs, the metric-definition rules, the placements and the image files. No Contentful calls.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { load, root } = require('./helpers/ts-loader.cjs');
Module._extensions['.css'] = () => {};

const textOf = (n) => (n.nodeType === 'text' ? n.value : (n.content || []).map(textOf).join(' '));
const withEnv = (env, fn) => {
  const saved = { NODE_ENV: process.env.NODE_ENV, CASE_STUDY_LOCAL_PREVIEW: process.env.CASE_STUDY_LOCAL_PREVIEW };
  for (const [k, v] of Object.entries(env)) v === undefined ? delete process.env[k] : (process.env[k] = v);
  try { return fn(); } finally { for (const [k, v] of Object.entries(saved)) v === undefined ? delete process.env[k] : (process.env[k] = v); }
};
const DEV = { NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: '1' };

// document order -> client -> service -> industry -> sector -> service key
const MAP = {
  'anybodycanbake-seo': { n: 1, client: 'AnybodyCanBake', service: 'SEO', industry: 'Education and training', sector: 'education', serviceKey: '/seo' },
  'advit-prints-meta-ads': { n: 2, client: 'Advit Prints', service: 'Meta Ads', industry: 'D2C and ecommerce', sector: 'ecommerce-retail', serviceKey: '/social-media-ads' },
  'meticulous-business-plan-google-ads': { n: 3, client: 'Meticulous Business Plan', service: 'Google Ads', industry: 'Professional services', sector: 'professional-services', serviceKey: '/google-ads' },
  'libros-library-meta-ads': { n: 4, client: 'Libros Library', service: 'Meta Ads', industry: 'Online Library', sector: null, serviceKey: '/social-media-ads' },
  'bakedemy-google-ads': { n: 5, client: 'Bakedemy', service: 'Google Ads', industry: 'Education and training', sector: 'education', serviceKey: '/google-ads' },
  'bakedemy-meta-ads': { n: 6, client: 'Bakedemy', service: 'Meta Ads', industry: 'Education and training', sector: 'education', serviceKey: '/social-media-ads' },
  'bblewrap-google-ads': { n: 7, client: 'Bblewrap', service: 'Google Ads', industry: 'Professional services', sector: 'professional-services', serviceKey: '/google-ads' },
  'talreja-talreja-google-ads': { n: 8, client: 'Talreja & Talreja', service: 'Google Ads', industry: 'Professional services', sector: 'professional-services', serviceKey: '/google-ads' },
};
const KEYS = Object.keys(MAP);
const entries = () => withEnv(DEV, () => load('lib/case-study-local-batch.ts').batchPreviewEntries().slice(6));

test('eight cases in document order, unique routes, appended after the six, through the real eligibility rule', () => {
  const B = load('lib/case-study-paid-batch.ts');
  assert.deepStrictEqual(B.PAID_CASES.slice(6).map((c) => c.key), KEYS);
  for (const c of B.PAID_CASES.slice(6)) {
    const m = MAP[c.key];
    assert.strictEqual(c.href, `/portfolio/${c.key}`); assert.strictEqual(c.client, m.client); assert.strictEqual(c.service, m.service); assert.strictEqual(c.industry, m.industry);
  }
  assert.strictEqual(new Set(B.PAID_CASES.map((c) => c.href)).size, 14);
  withEnv(DEV, () => {
    const E = entries();
    assert.deepStrictEqual(E.map((e) => e.slug), KEYS);
    assert.ok(E.every((e) => e.sys.id.startsWith('local-preview-')), 'IDs are plainly not Contentful IDs');
    const { selectPublic } = load('lib/case-study-eligibility.ts');
    const { mapContentfulCaseStudyToCms } = load('lib/contentful/mappers.ts');
    const pub = selectPublic(E.map(mapContentfulCaseStudyToCms));
    assert.strictEqual(pub.length, 8); assert.ok(pub.every((s) => s.layout === 'new'));
    const { SECTORS, SERVICE_FILTERS } = load('lib/case-study-library.ts');
    for (const e of E) {
      const m = MAP[e.slug];
      assert.strictEqual(e.serviceKey, m.serviceKey); assert.ok(e.serviceKey in SERVICE_FILTERS);
      assert.strictEqual(e.sector, m.sector); if (e.sector) assert.ok(e.sector in SECTORS);
      assert.strictEqual(e.industry.name, m.industry);
    }
  });
});

test('the two Bakedemy studies and the two AnybodyCanBake studies of this program stay distinguishable', () => {
  const B = load('lib/case-study-paid-batch.ts');
  const g = B.paidCaseFor('/portfolio/bakedemy-google-ads'); const m = B.paidCaseFor('/portfolio/bakedemy-meta-ads');
  assert.notStrictEqual(g.href, m.href); assert.notStrictEqual(g.card.eyebrow, m.card.eyebrow); assert.notStrictEqual(g.card.body, m.card.body); assert.notStrictEqual(g.metaDescription, m.metaDescription);
  assert.match(g.card.eyebrow, /^Google Ads/); assert.match(m.card.eyebrow, /^Meta Ads/);
  assert.notStrictEqual(B.paidCaseFor('/portfolio/anybodycanbake-seo').href, '/portfolio/google-ads-for-online-courses');
  assert.notStrictEqual(B.paidCaseFor('/portfolio/anybodycanbake-seo').href, '/portfolio/anybodycanbake-meta-ads');
});

test('every supplied number follows from the supplied inputs (two decimals, half up)', () => {
  const f2 = (n) => (Math.round(n * 100 + 1e-9) / 100).toFixed(2);
  // 1 AnybodyCanBake SEO: two matched three-month periods (May to July 2026, August to October 2026)
  assert.strictEqual(f2((20580 / 16400 - 1) * 100), '25.49'); assert.strictEqual(f2((20039 / 15348 - 1) * 100), '30.56'); assert.strictEqual(f2((133 / 91 - 1) * 100), '46.15');
  assert.strictEqual(20580 - 16400, 4180); assert.strictEqual(20039 - 15348, 4691); assert.strictEqual(133 - 91, 42); assert.strictEqual(f2((20039 / 20580) * 100), '97.37');
  // 2 Advit Prints
  assert.strictEqual(f2(360000 / 874), '411.90'); assert.strictEqual(f2(1136200 / 874), '1300.00'); assert.strictEqual(f2(1136200 / 360000), '3.16');
  // 3 Meticulous Business Plan
  assert.strictEqual(f2(360000 / 287), '1254.36'); assert.strictEqual(f2(360000 / 27), '13333.33'); assert.strictEqual(f2(1215000 / 360000), '3.38');
  assert.strictEqual(f2((94 / 287) * 100), '32.75'); assert.strictEqual(f2((27 / 94) * 100), '28.72'); assert.strictEqual(f2((27 / 287) * 100), '9.41'); assert.strictEqual(1215000 / 27, 45000);
  // 4 Libros Library (lifetime value is not revenue and gives no ROAS)
  assert.strictEqual(f2(216000 / 2204), '98.00'); assert.strictEqual(f2(216000 / 540), '400.00'); assert.strictEqual(f2((540 / 2204) * 100), '24.50'); assert.strictEqual(4800 / 400, 12);
  // 5 Bakedemy Google Ads
  assert.strictEqual(f2(2400000 / 5620), '427.05'); assert.strictEqual(f2(2400000 / 627), '3827.75'); assert.strictEqual(f2((627 / 5620) * 100), '11.16'); assert.strictEqual(f2(9405000 / 2400000), '3.92'); assert.strictEqual(9405000 / 627, 15000);
  // 6 Bakedemy Meta Ads
  assert.strictEqual(f2(2700000 / 4800), '562.50'); assert.strictEqual(f2(2700000 / 738), '3658.54'); assert.strictEqual(f2((738 / 4800) * 100), '15.38'); assert.strictEqual(f2(11070000 / 2700000), '4.10'); assert.strictEqual(11070000 / 738, 15000);
  // 7 Bblewrap
  assert.strictEqual(f2(440000 / 348), '1264.37'); assert.strictEqual(f2(440000 / 6), '73333.33'); assert.strictEqual(f2(1200000 / 440000), '2.73'); assert.strictEqual(f2((42 / 348) * 100), '12.07'); assert.strictEqual(f2((6 / 42) * 100), '14.29'); assert.strictEqual(1200000 / 6, 200000);
  // 8 Talreja & Talreja
  assert.strictEqual(f2(180000 / 580), '310.34'); assert.strictEqual(f2(180000 / 19), '9473.68'); assert.strictEqual(f2(570000 / 180000), '3.17'); assert.strictEqual(f2((127 / 580) * 100), '21.90'); assert.strictEqual(f2((19 / 127) * 100), '14.96'); assert.strictEqual(570000 / 19, 30000);
});

test('the page copy carries those figures, the board shows at most six figures led by the headline result, and nothing is invented', () => {
  const { splitImpact } = load('lib/case-study-outcomes.ts');
  const E = Object.fromEntries(entries().map((e) => [e.slug, e]));
  const lead = {
    'anybodycanbake-seo': ['25.49%', '30.56%', '46.15%', '16,400 → 20,580', '15,348 → 20,039', '91 → 133'],
    'advit-prints-meta-ads': ['874', '₹411.90', '3.16×', '₹11,36,200', '₹3,60,000', '₹1,300.00'],
    'meticulous-business-plan-google-ads': ['27', '₹13,333.33', '3.38×', '287', '₹12,15,000', '₹3,60,000'],
    'libros-library-meta-ads': ['540', '₹400.00', '24.50%', '2,204', '₹2,16,000', '₹4,800'],
    'bakedemy-google-ads': ['627', '₹3,827.75', '3.92×', '5,620', '₹94,05,000', '₹24,00,000'],
    'bakedemy-meta-ads': ['738', '₹3,658.54', '4.10×', '4,800', '₹1,10,70,000', '₹27,00,000'],
    'bblewrap-google-ads': ['6', '₹73,333.33', '2.73×', '348', '₹12,00,000', '₹4,40,000'],
    'talreja-talreja-google-ads': ['19', '₹9,473.68', '3.17×', '580', '₹5,70,000', '₹1,80,000'],
  };
  for (const [slug, expected] of Object.entries(lead)) {
    const r = splitImpact({ ...E[slug].impact.json, content: E[slug].impact.json.content.slice(1) });
    assert.ok(r, slug);
    assert.deepStrictEqual(r.outcomes.map((o) => [o.kind, o.lead]), expected.map((l) => ['figure', l]), slug);
    assert.ok(r.outcomes.every((o) => o.context.length > 20), `${slug}: every figure travels with its context`);
  }
  // figures that sit in the sentence, not on the board, are still in the page text
  const T = (slug) => [E[slug].title, E[slug].summary, textOf(E[slug].impact.json)].join(' ');
  assert.match(T('anybodycanbake-seo'), /4,180 more organic clicks[^]*42 more tracked course enquiries[^]*4,691[^]*97\.37%/);
  assert.match(T('advit-prints-meta-ads'), /₹1,300/);
  assert.match(T('meticulous-business-plan-google-ads'), /94 were qualified[^]*32\.75%[^]*28\.72%[^]*9\.41%[^]*₹45,000/);
  assert.match(T('libros-library-meta-ads'), /₹98\.00[^]*one twelfth/);
  for (const re of [/11\.16%/, /₹15,000/, /₹427\.05/]) assert.match(T('bakedemy-google-ads'), re);
  for (const re of [/15\.38%/, /₹15,000/, /₹562\.50/]) assert.match(T('bakedemy-meta-ads'), re);
  assert.match(T('bblewrap-google-ads'), /42 were qualified[^]*12\.07%[^]*14\.29%[^]*₹2,00,000/);
  assert.match(T('talreja-talreja-google-ads'), /127[^]*21\.90%[^]*14\.96%[^]*₹30,000/);
});

test('metric definitions are kept: revenue return is not profit, lifetime value is not revenue, the two Bakedemy channels are never combined, no invented cause', () => {
  const E = Object.fromEntries(entries().map((e) => [e.slug, e]));
  const all = (slug) => JSON.stringify(E[slug]);
  for (const slug of KEYS.filter((k) => k !== 'libros-library-meta-ads' && k !== 'anybodycanbake-seo')) assert.match(all(slug), /Revenue return is not profit|revenue return is not profit/, slug);
  // Libros: the supplied lifetime value is separate from campaign revenue; no revenue and no ROAS figure is shown
  const lib = all('libros-library-meta-ads');
  assert.match(textOf(E['libros-library-meta-ads'].impact.json), /lifetime value is not revenue collected during the campaign/);
  assert.match(E['libros-library-meta-ads'].evidenceNote, /not multiplied by the number of memberships[^]*not presented as revenue[^]*no revenue ROAS/);
  assert.doesNotMatch(lib, /\d(\.\d+)?×/, 'no ROAS multiple');
  assert.doesNotMatch(lib, /₹2,59,20,000|2\.59 crore|revenue of ₹/, 'lifetime value is not multiplied into revenue');
  // Talreja: ₹30,000 is first contracted fee revenue per engagement, never a lifetime value; INR equivalent is kept
  const tal = textOf(E['talreja-talreja-google-ads'].impact.json) + ' ' + E['talreja-talreja-google-ads'].evidenceNote;
  assert.match(tal, /Average first contracted fee revenue per engagement was ₹30,000/); assert.match(tal, /it is not a lifetime value/); assert.match(tal, /INR equivalent/);
  // Meticulous: ₹45,000 is revenue per engagement, not acquisition cost
  assert.match(textOf(E['meticulous-business-plan-google-ads'].impact.json), /₹45,000 is revenue per engagement, not acquisition cost/);
  // Bblewrap: ₹2,00,000 is average revenue per signed project, distinct from the cost
  assert.match(textOf(E['bblewrap-google-ads'].impact.json), /₹2,00,000\. That is distinct from the ₹73,333\.33 advertising cost/);
  // Bakedemy: separate studies, overlapping periods, no unduplicated total
  for (const k of ['bakedemy-google-ads', 'bakedemy-meta-ads']) assert.match(E[k].evidenceNote, /overlap[^]*not combined into an unduplicated total/);
  assert.doesNotMatch(JSON.stringify([E['bakedemy-google-ads'], E['bakedemy-meta-ads']]), /1,365|₹2,04,75,000|₹51,00,000/, 'no combined total of the two channels');
  // AnybodyCanBake SEO (owner-confirmed 31 October 2026): May to July 2026 and August to October 2026, "three-month periods", never "90 day"; no day boundary, October not described as completed
  const seoE = E['anybodycanbake-seo']; const seoAll = JSON.stringify(seoE) + JSON.stringify(load('lib/case-study-paid-batch.ts').paidCaseFor('/portfolio/anybodycanbake-seo'));
  assert.doesNotMatch(seoAll, /90[- ]day|90 days|earlier window|later window|latest 90/i, 'no 90 day wording anywhere in this case');
  assert.match(textOf(seoE.impact.json), /May 2026 to July 2026[^]*August 2026 to October 2026/); assert.match(seoE.evidenceNote, /three-month periods[^]*exact day boundaries were not supplied[^]*October is not described as a completed month/);
  assert.strictEqual(seoE.periodStart, '2026-05-01'); assert.strictEqual(seoE.periodEnd, '2026-10-01');
  assert.doesNotMatch(seoAll, /31 July|1 August|30 April|31 October 2026 to|to 31 October/i);
  assert.match(seoE.evidenceNote, /not proof that the work alone caused the change/);
  assert.doesNotMatch(textOf(seoE.impact.json), /including 4,691|ranking|position \d|keyword position/i);
  // the Search and Display label on four of the dashboards is not claimed in any copy (it is not in the documents)
  assert.doesNotMatch(JSON.stringify(Object.values(E)), /Search and Display|Search \+ Display|Performance Max|Shopping/);
  // Talreja: service neutral and no identity claim (the entity is unconfirmed)
  assert.doesNotMatch(all('talreja-talreja-google-ads'), /account(ant|ancy)|tax\b|chartered|audit|jurisdiction|government/i);
});

test('copy rules: no long or double dashes, no internal notes, no testimonial, no unfinished drafting wording; cards carry no figure', () => {
  const B = load('lib/case-study-paid-batch.ts');
  for (const e of entries()) {
    const all = [e.title, e.summary, e.evidenceNote, textOf(e.problem.json), textOf(e.whatWeDid.json), textOf(e.impact.json)].join('\n');
    assert.doesNotMatch(all, /[—–]|--/, e.slug);
    assert.doesNotMatch(all, /Production note|image brief|Calculation corrections|Recreated agency report source note|owner review|Confirm the client|Platform exports were not supplied|stale/i, e.slug);
    assert.doesNotMatch(all, /testimonial|guarantee|instagram/i, e.slug);
    assert.doesNotMatch(all, /remain to be confirmed|not yet been supplied|to be confirmed|TBC|placeholder|lorem/i, `${e.slug}: no unfinished drafting wording`);
    assert.strictEqual(e.showTestimonial, false); assert.strictEqual(e.review, undefined);
    assert.ok(e.evidenceNote.length > 400, `${e.slug}: the evidence note carries the basis and its limits`);
    assert.match(e.evidenceNote, /not been independently checked/, e.slug);
  }
  for (const c of B.PAID_CASES.slice(6)) {
    const all = [c.card.eyebrow, c.card.body, c.card.cta, c.metaDescription, c.alt.card, c.alt.hero, c.dashboard.alt, B.PAID_CASE_CLOSE_BODY[c.key], B.PAID_CASE_CLOSE_CTA[c.key]].join('\n');
    assert.doesNotMatch(all, /[—–]|--/, c.key);
    assert.doesNotMatch(c.card.body, /\d/, `${c.key}: the card text carries no figure`);
    assert.ok(c.metaDescription.length >= 120 && c.metaDescription.length <= 160, `${c.key}: meta ${c.metaDescription.length}`);
    assert.ok(c.metaDescription.includes(c.client === 'Talreja & Talreja' ? 'Talreja' : c.client) && c.metaDescription.includes(c.service), c.key);
    assert.match(c.alt.card, /[Ii]llustrative/); assert.match(c.alt.hero, /[Ii]llustrative/); assert.match(c.dashboard.alt, /recreated agency dashboard/i);
    assert.ok(c.alt.card.includes(c.client) && c.alt.hero.includes(c.client) && c.dashboard.alt.includes(c.client), 'alt text names the client');
    assert.ok(c.alt.card.includes(c.service) && c.alt.hero.includes(c.service) && c.dashboard.alt.includes(c.service), 'alt text names the service');
  }
  // the closing wording is the final document's call to action, with the service named in the button
  const { presentationFor } = load('lib/case-study-presentation.ts');
  assert.strictEqual(presentationFor('/portfolio/anybodycanbake-seo').close.cta, 'Discuss Your SEO Goals');
  assert.strictEqual(presentationFor('/portfolio/advit-prints-meta-ads').close.cta, 'Discuss Your Meta Ads Goals');
  assert.strictEqual(presentationFor('/portfolio/talreja-talreja-google-ads').close.cta, 'Discuss Your Google Ads Goals');
  assert.ok(presentationFor('/portfolio/libros-library-meta-ads').close.secondary, 'the existing "Request a call" stays');
});

test('images: each case has its own card, hero, 2.6:1 hero and dashboard, at their own pixels, in the right slots, with no caption and no zoom', async () => {
  const sharp = require('sharp');
  const B = load('lib/case-study-paid-batch.ts'); const I = load('lib/case-study-images.ts'); const X = load('lib/case-study-presentation.ts');
  const dim = async (f) => { const m = await sharp(path.join(root, 'public', f)).metadata(); return [m.format, m.width, m.height]; };
  for (const c of B.PAID_CASES.slice(6)) {
    const base = `images/case-studies/${c.key}`;
    assert.deepStrictEqual(await dim(`${base}-card.webp`), ['webp', 1586, 992]); assert.deepStrictEqual(await dim(`${base}-dashboard.webp`), ['webp', 1586, 992]);
    assert.deepStrictEqual(await dim(`${base}-hero-wide.webp`), ['webp', 1672, 643]);
    const hero = await dim(`${base}-hero.webp`); assert.strictEqual(hero[1], 1672); assert.ok([940, 941].includes(hero[2]), 'Libros and Bakedemy Meta heroes were supplied 940 px high; used as supplied');
    const s = I.imageSlotsFor(c.href); const x = X.presentationFor(c.href);
    assert.strictEqual(s.card.src, `/${base}-card.webp`); assert.strictEqual(s.feature.src, `/${base}-hero-wide.webp`); assert.strictEqual(s.feature.narrow.src, `/${base}-hero.webp`); assert.strictEqual(s.feature.ogSrc, `/${base}-hero.webp`);
    assert.strictEqual(x.impactMedia.src, `/${base}-dashboard.webp`); assert.strictEqual(x.impactMedia.caption, undefined); assert.strictEqual(s.feature.note, undefined);
    assert.ok(s.feature.still && s.feature.whole && s.feature.og && s.card.whole);
  }
  const srcs = B.PAID_CASES.flatMap((c) => { const s = I.imageSlotsFor(c.href); return [s.card.src, s.feature.src, s.feature.narrow.src, X.presentationFor(c.href).impactMedia.src]; });
  assert.strictEqual(new Set(srcs).size, srcs.length, 'no file is shared between cases, in any slot');
  // the originals' conversion is recorded and the supplied pixels are not re-sized: the lossless sources are in the manifest
  assert.match(fs.readFileSync(path.join(root, 'docs/work-redesign/paid-case-batch/ASSET_MANIFEST.md'), 'utf8'), /Second batch/);
});

test('placement: each case appears on the service and industry pages it belongs to; the first six are unchanged', () => {
  const R = load('lib/case-study-related.ts'); const B = load('lib/case-study-paid-batch.ts');
  const sectorOf = Object.fromEntries(withEnv(DEV, () => load('lib/case-study-local-batch.ts').batchPreviewEntries()).map((e) => [e.slug, e.sector]));
  const studies = B.PAID_CASES.map((c) => ({ href: c.href, serviceKey: { 'Google Ads': '/google-ads', 'Meta Ads': '/social-media-ads', SEO: '/seo' }[c.service], sector: sectorOf[c.key], industry: c.industry }));
  const pick = (by) => R.relatedStudies(studies, by).map((s) => s.href.replace('/portfolio/', ''));
  assert.deepStrictEqual(pick({ service: '/seo' }), ['anybodycanbake-seo']);
  assert.deepStrictEqual(pick({ service: '/google-ads' }), ['ekoching-google-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads', 'meticulous-business-plan-google-ads', 'bakedemy-google-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads']);
  assert.deepStrictEqual(pick({ service: '/social-media-ads' }), ['anybodycanbake-meta-ads', 'klenzmo-meta-ads', 'hutnhomes-meta-ads', 'advit-prints-meta-ads', 'libros-library-meta-ads', 'bakedemy-meta-ads']);
  assert.deepStrictEqual(pick({ audience: 'education' }), ['anybodycanbake-meta-ads', 'ekoching-google-ads', 'anybodycanbake-seo', 'bakedemy-google-ads', 'bakedemy-meta-ads']);
  assert.deepStrictEqual(pick({ audience: 'd2c' }), ['klenzmo-meta-ads', 'bakersville-google-ads', 'advit-prints-meta-ads']);
  assert.deepStrictEqual(pick({ audience: 'real-estate' }), ['hutnhomes-meta-ads']);
  assert.deepStrictEqual(pick({ audience: 'enquiry-led' }), ['phoenix-laundry-google-ads', 'meticulous-business-plan-google-ads', 'libros-library-meta-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads']);
  // 31 October 2026 (/seo narrative redesign): /seo no longer lists studies through the auto-populating cards; one composed proof section shows
  // AnybodyCanBake SEO and Ameba Software, each only while its case is published (components/cplus/seo/showcase.ts + the shared showcase). Neither is shown twice.
  const seo = fs.readFileSync(path.join(root, 'components/cplus/seo/SeoBody.tsx'), 'utf8');
  const seoPage = fs.readFileSync(path.join(root, 'app/(pages)/seo/page.tsx'), 'utf8');
  assert.doesNotMatch(seo, /RelatedCaseCards|<Suspense/, '/seo has no auto-populating card section and no streamed boundary');
  assert.match(seoPage, /await loadCaseShowcase\(SEO_SHOWCASE\)/);
  assert.match(seo, /<CaseShowcase data=\{showcase\} \/>/, 'the showcase reads the public library only, so each case shows only while it is published');
});

test('client logos: the supplied approved logos are mapped to the right clients, shown, with no external link', () => {
  const C = load('lib/clients.ts');
  const have = { 'advit-prints': '/portfolio/advit-prints-meta-ads', libros: '/portfolio/libros-library-meta-ads', bakedemy: '/portfolio/bakedemy-google-ads', anybodycanbake: '/portfolio/google-ads-for-online-courses', mbp: '/portfolio/meticulous-business-plan-google-ads', bblewrap: '/portfolio/bblewrap-google-ads', 'talreja-talreja': '/portfolio/talreja-talreja-google-ads' };
  for (const [key, href] of Object.entries(have)) { const c = C.CLIENTS.find((x) => x.key === key); assert.ok(c && c.display === 'show' && c.logo, key); assert.strictEqual(c.caseStudy, href, key); assert.ok(fs.existsSync(path.join(root, 'public', c.logo.src)), `${key}: logo file`); }
  assert.strictEqual(C.CLIENTS.find((c) => c.key === 'mbp').name, 'Meticulous Business Plan');
  // supplied 31 October 2026: mbp (white ground removed), Talreja & Talreja (white ground removed), Bblewrap (own black ground kept); no service is claimed from a logo
  for (const k of ['mbp', 'bblewrap', 'talreja-talreja']) assert.deepStrictEqual(C.CLIENTS.find((c) => c.key === k).services, k === 'mbp' ? [] : [], k);
  assert.strictEqual(C.CLIENTS.find((c) => c.key === 'talreja-talreja').website, 'https://talrejaandtalreja.com/', 'owner-confirmed website (31 October 2026)');
  assert.ok(C.CLIENTS.filter((c) => c.website).length === 1, 'no other website is recorded');
  const comps = ['components/b2/Work.tsx', 'components/case-study/CaseStudyTemplate.tsx', 'components/clients/ClientLogo.tsx', 'components/clients/ClientLogoWall.tsx'].map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
  assert.doesNotMatch(comps, /\.website/, 'the website is stored, not rendered as a link');
  const css = fs.readFileSync(path.join(root, 'components/clients/client-logos.css'), 'utf8');
  assert.match(css, /img\[src\*='bblewrap'\]/, 'the black-ground mark keeps its ground like the other ground marks');
});

test('corrected dashboards: the four periods, the Talreja label and the INR equivalent are on the artwork and the alt text; the supplied originals are unchanged', () => {
  const B = load('lib/case-study-paid-batch.ts');
  const period = { 'advit-prints-meta-ads': 'February 2024 to August 2024', 'meticulous-business-plan-google-ads': 'April 2026 to September 2026', 'bblewrap-google-ads': 'September 2024 to March 2025', 'talreja-talreja-google-ads': 'March 2022 to September 2022' };
  for (const [k, v] of Object.entries(period)) { const alt = B.paidCaseFor(`/portfolio/${k}`).dashboard.alt; assert.ok(alt.includes(v), k); assert.doesNotMatch(alt, /date range not supplied/i, k); }
  const t = B.paidCaseFor('/portfolio/talreja-talreja-google-ads').dashboard.alt;
  assert.match(t, /Average first contracted fee revenue per engagement shows ₹30,000/); assert.doesNotMatch(t, /Lifetime Value/); assert.match(t, /INR equivalent/);
  for (const k of Object.keys(period)) assert.ok(fs.existsSync(path.join(root, 'docs/work-redesign/paid-case-batch/source-originals/dashboards', `${k}-dashboard.before-edit.webp`)), `${k}: the pre-edit copy is kept`);
});

test('Advit Prints stage uses the existing deeper outline stroke (the insurance and home treatment) and no other batch stage changes', () => {
  const I = load('lib/case-study-images.ts');
  assert.strictEqual(I.imageSlotsFor('/portfolio/advit-prints-meta-ads').feature.deepMark, true);
  for (const k of KEYS.filter((x) => x !== 'advit-prints-meta-ads')) assert.strictEqual(I.imageSlotsFor(`/portfolio/${k}`).feature.deepMark, undefined, k);
  const css = fs.readFileSync(path.join(root, 'components/case-study/case-study.css'), 'utf8');
  assert.match(css, /\[data-mark='deep'\] \.ct-stage-mark/);
});

test('the second batch is inert outside the development preview and leaves no production fallback', () => {
  const run = (env) => withEnv(env, () => load('lib/case-study-local-preview.ts').withLocalPreview([]).length);
  assert.strictEqual(run({ NODE_ENV: 'production', CASE_STUDY_LOCAL_PREVIEW: '1' }), 0);
  assert.strictEqual(run({ NODE_ENV: 'test', CASE_STUDY_LOCAL_PREVIEW: '1' }), 0);
  assert.strictEqual(run({ NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: undefined }), 0);
  assert.strictEqual(run(DEV), 19, 'plus the final four');
});

test('/work cards carry no caption under the image, on any page, and no empty note element', () => {
  const B = load('lib/case-study-paid-batch.ts'); const I = load('lib/case-study-images.ts'); const W = load('components/b2/work-cards.ts');
  for (const c of B.PAID_CASES) {
    assert.strictEqual(I.imageSlotsFor(c.href).card.note, undefined, c.key);
    const card = W.toCard({ slug: c.key, href: c.href, title: 't', client: c.client, detail: '', industry: c.industry, service: 'Google Ads', stage: null, challenge: 'x', changed: [], outcomes: [], figures: 0, sector: null, serviceKey: null, period: '', search: '' });
    assert.ok(!card.art.note, c.key); assert.ok(card.art.alt.length > 40, `${c.key}: alt text kept`);
  }
  assert.doesNotMatch(fs.readFileSync(path.join(root, 'lib/case-study-images.ts'), 'utf8'), /Illustrative artwork, not a client photograph/);
});

test('Libros is an Online Library serving customers across India: industry, enquiry-led placement, no local-only wording, results untouched', () => {
  const B = load('lib/case-study-paid-batch.ts'); const e = entries().find((x) => x.slug === 'libros-library-meta-ads');
  const c = B.paidCaseFor('/portfolio/libros-library-meta-ads');
  assert.strictEqual(e.industry.name, 'Online Library'); assert.strictEqual(c.industry, 'Online Library'); assert.match(c.card.eyebrow, /Online Library/);
  const all = JSON.stringify({ ...e, sys: undefined }) + JSON.stringify(c) + B.PAID_CASE_CLOSE_BODY['libros-library-meta-ads'];
  assert.doesNotMatch(all, /local|serviceable|households|locations the library/i, 'nothing implies a local area only');
  assert.match(textOf(e.problem.json) + textOf(e.whatWeDid.json), /online library serving (readers|customers) across India/i);
  assert.doesNotMatch(textOf(e.whatWeDid.json), /target|geograph|pin ?code|cit(y|ies)|state/i, 'no invented targeting detail');
  for (const re of [/540/, /₹400\.00/, /24\.50%/, /2,204/, /₹2,16,000/, /₹4,800/]) assert.match(textOf(e.impact.json), re);
  const R = load('lib/case-study-related.ts');
  assert.deepStrictEqual(R.relatedStudies([{ href: '/portfolio/libros-library-meta-ads', serviceKey: '/social-media-ads', sector: null, industry: 'Online Library' }, { href: '/x', serviceKey: null, sector: null, industry: 'Other' }], { audience: 'enquiry-led' }).map((s) => s.href), ['/portfolio/libros-library-meta-ads']);
});

test('/work cards carry no disclosure for Om Sai, ClassPe, InsurYo and Ameba either; their detail pages keep their own captions', () => {
  const W = load('components/b2/work-cards.ts'); const I = load('lib/case-study-images.ts');
  const card = fs.readFileSync(path.join(root, 'components/resolve/WorkCard.tsx'), 'utf8');
  assert.doesNotMatch(card, /MOTIF_NOTE/); assert.doesNotMatch(card, /rs-wc-note[^]*MOTIF/);
  for (const h of ['/portfolio/om-sai-developer-meta-ads', '/portfolio/classpe-social-media-strategy', '/portfolio/insuryo-organic-growth', '/portfolio/seo-ameba-software']) {
    const slot = I.imageSlotsFor(h).card; assert.ok(slot, h);
    const c = W.toCard({ slug: h.split('/').pop(), href: h, title: 't', client: 'c', detail: '', industry: 'i', service: null, stage: null, challenge: 'x', changed: [], outcomes: [], figures: 0, sector: null, serviceKey: null, period: '', search: '' });
    assert.ok(!(c.art && c.art.note), `${h}: no card disclosure`);
    // the detail page's stage caption (slot note) is untouched
    // (without the final-four release switch, as in every build and test, the three existing studies keep their conceptual stage and its note)
    assert.ok(I.imageSlotsFor(h).feature.note, `${h}: the detail stage keeps its note`);
  }
});
