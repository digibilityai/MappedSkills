// The six paid-advertising case studies of the 30 October 2026 local review batch (AnybodyCanBake Meta Ads, EKoching, Klenzmo,
// Bakersville, Phoenix Laundry, HutnHomes). Local preview only: the copy is a development fixture (lib/case-study-local-batch.ts) and
// the images are supplied artwork. Checks the mappings, the numbers, the copy rules, the placements and that nothing here can reach a
// production build. No Contentful calls.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { load, root } = require('./helpers/ts-loader.cjs');
Module._extensions['.css'] = () => {};

const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const textOf = (n) => (n.nodeType === 'text' ? n.value : (n.content || []).map(textOf).join(' '));
const withEnv = (env, fn) => {
  const saved = { NODE_ENV: process.env.NODE_ENV, CASE_STUDY_LOCAL_PREVIEW: process.env.CASE_STUDY_LOCAL_PREVIEW };
  for (const [k, v] of Object.entries(env)) v === undefined ? delete process.env[k] : (process.env[k] = v);
  try { return fn(); } finally { for (const [k, v] of Object.entries(saved)) v === undefined ? delete process.env[k] : (process.env[k] = v); }
};
const DEV = { NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: '1' };

const KEYS = ['anybodycanbake-meta-ads', 'ekoching-google-ads', 'klenzmo-meta-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads', 'hutnhomes-meta-ads'];
// document -> client -> service -> industry -> detail route -> sector -> service key
const MAP = {
  'anybodycanbake-meta-ads': { doc: '02', client: 'AnybodyCanBake', service: 'Meta Ads', industry: 'Education and training', sector: 'education', serviceKey: '/social-media-ads' },
  'ekoching-google-ads': { doc: '04', client: 'EKoching', service: 'Google Ads', industry: 'Education and training', sector: 'education', serviceKey: '/google-ads' },
  'klenzmo-meta-ads': { doc: '05', client: 'Klenzmo', service: 'Meta Ads', industry: 'D2C and ecommerce', sector: 'ecommerce-retail', serviceKey: '/social-media-ads' },
  'bakersville-google-ads': { doc: '06', client: 'Bakersville', service: 'Google Ads', industry: 'D2C and ecommerce', sector: 'ecommerce-retail', serviceKey: '/google-ads' },
  'phoenix-laundry-google-ads': { doc: '07', client: 'Phoenix Laundry', service: 'Google Ads', industry: 'Local services', sector: null, serviceKey: '/google-ads' },
  'hutnhomes-meta-ads': { doc: '08', client: 'HutnHomes', service: 'Meta Ads', industry: 'Real estate', sector: 'real-estate', serviceKey: '/social-media-ads' },
};
// all fourteen, in order: the six of 30 October, then the eight of 31 October (tests/case-study-paid-batch-2.test.cjs covers those)
const ALL_KEYS = [...KEYS, 'anybodycanbake-seo', 'advit-prints-meta-ads', 'meticulous-business-plan-google-ads', 'libros-library-meta-ads', 'bakedemy-google-ads', 'bakedemy-meta-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads'];
const hrefOf = (k) => `/portfolio/${k}`;

test('six unique cases with unique routes that do not collide with AnybodyCanBake Google Ads, Om Sai or each other', () => {
  const B = load('lib/case-study-paid-batch.ts');
  assert.deepStrictEqual(B.PAID_CASES.map((c) => c.key), ALL_KEYS, 'the six keep their place; the second batch is appended');
  assert.strictEqual(new Set(B.PAID_CASES.map((c) => c.href)).size, 14);
  for (const c of B.PAID_CASES.slice(0, 6)) {
    assert.strictEqual(c.href, hrefOf(c.key));
    assert.notStrictEqual(c.href, '/portfolio/google-ads-for-online-courses');
    assert.notStrictEqual(c.href, '/portfolio/om-sai-developer-meta-ads');
    const m = MAP[c.key];
    assert.strictEqual(c.client, m.client); assert.strictEqual(c.service, m.service); assert.strictEqual(c.industry, m.industry);
  }
  withEnv(DEV, () => {
    const E = load('lib/case-study-local-batch.ts').batchPreviewEntries().slice(0, 6);
    assert.deepStrictEqual(E.map((e) => e.slug), KEYS);
    assert.strictEqual(new Set(E.map((e) => e.sys.id)).size, 6);
    assert.ok(E.every((e) => e.sys.id.startsWith('local-preview-')), 'IDs are plainly not Contentful IDs');
    const { selectPublic } = load('lib/case-study-eligibility.ts');
    const { mapContentfulCaseStudyToCms } = load('lib/contentful/mappers.ts');
    const pub = selectPublic(E.map(mapContentfulCaseStudyToCms));
    assert.strictEqual(pub.length, 6, 'all six are complete and public through the real eligibility rule');
    assert.ok(pub.every((s) => s.layout === 'new'));
  });
});

test('service, sector and industry per case follow the existing taxonomy', () => {
  withEnv(DEV, () => {
    const E = load('lib/case-study-local-batch.ts').batchPreviewEntries().slice(0, 6);
    const { SECTORS, SERVICE_FILTERS } = load('lib/case-study-library.ts');
    for (const e of E) {
      const m = MAP[e.slug];
      assert.strictEqual(e.serviceKey, m.serviceKey); assert.ok(e.serviceKey in SERVICE_FILTERS);
      assert.strictEqual(e.sector, m.sector); if (e.sector) assert.ok(e.sector in SECTORS);
      assert.strictEqual(e.industry.name, m.industry);
    }
  });
});

test('every case has its own card, hero, 2.6:1 hero and (where supplied) dashboard, at their own pixels, and the slots never cross', async () => {
  const sharp = require('sharp');
  const B = load('lib/case-study-paid-batch.ts');
  const I = load('lib/case-study-images.ts');
  const X = load('lib/case-study-presentation.ts');
  const dim = async (f) => { const m = await sharp(path.join(root, 'public', f)).metadata(); return [m.format, m.width, m.height]; };
  for (const c of B.PAID_CASES) {
    assert.deepStrictEqual(await dim(`images/case-studies/${c.key}-card.webp`), ['webp', 1586, 992]);
    const hero = await dim(`images/case-studies/${c.key}-hero.webp`); // two second-batch heroes (Libros, Bakedemy Meta) were supplied 1 px short, 940; used as supplied
    assert.deepStrictEqual([hero[0], hero[1]], ['webp', 1672]); assert.ok(hero[2] === 941 || hero[2] === 940, `${c.key}: ${hero[2]}`);
    assert.deepStrictEqual(await dim(`images/case-studies/${c.key}-hero-wide.webp`), ['webp', 1672, 643]);
    const slots = I.imageSlotsFor(c.href);
    assert.strictEqual(slots.card.src, `/images/case-studies/${c.key}-card.webp`);
    assert.strictEqual(slots.feature.src, `/images/case-studies/${c.key}-hero-wide.webp`, 'desktop and tablet: the 2.6:1 derivative');
    assert.strictEqual(slots.feature.narrow.src, `/images/case-studies/${c.key}-hero.webp`, 'narrow screens: the supplied hero whole');
    assert.strictEqual(slots.feature.ogSrc, `/images/case-studies/${c.key}-hero.webp`, 'sharing: the supplied hero');
    assert.ok(slots.card.whole && slots.feature.whole && slots.feature.still && slots.feature.og);
    assert.strictEqual(slots.card.position, '0% 50%');
    assert.ok(slots.card.alt.includes(c.client) && slots.feature.alt.includes(c.client), 'alt text names the client');
    assert.ok(slots.card.alt.includes(c.service) && slots.feature.alt.includes(c.service), 'alt text names the service');
    assert.match(slots.card.alt + slots.feature.alt, /[Ii]llustrative/, 'generated scenes are described as illustrative');
    assert.strictEqual(slots.feature.note, undefined, 'owner instruction 2026-10-30: no visible hero caption');
    const x = X.presentationFor(c.href);
    {
      assert.deepStrictEqual(await dim(`images/case-studies/${c.key}-dashboard.webp`), ['webp', 1586, 992]);
      assert.strictEqual(x.impactMedia.src, `/images/case-studies/${c.key}-dashboard.webp`);
      assert.match(x.impactMedia.alt, /recreated agency dashboard/i); assert.ok(x.impactMedia.alt.includes(c.client));
      assert.strictEqual(x.impactMedia.caption, undefined);
    }
    assert.ok(x.close.secondary && x.close.cta === (B.PAID_CASE_CLOSE_CTA[c.key] ?? 'Discuss Your Advertising') && x.close.title === 'Tell us what you are trying to fix');
  }
  // every dashboard is supplied
  assert.ok(B.PAID_CASES.every((c) => c.dashboard));
  // no file is shared between cases
  const srcs = B.PAID_CASES.flatMap((c) => { const s = I.imageSlotsFor(c.href); return [s.card.src, s.feature.src, s.feature.narrow.src]; });
  assert.strictEqual(new Set(srcs).size, srcs.length);
  // the existing studies keep their own artwork
  assert.match(I.imageSlotsFor('/portfolio/google-ads-for-online-courses').card.src, /resolve-r3\/anybodycanbake-listing\.webp$/);
  assert.match(I.imageSlotsFor('/portfolio/om-sai-developer-meta-ads').card.src, /omsai-work\.webp$/);
});

test('the 2.6:1 derivatives keep the outlined client name zone free: nothing but the picture in the lower fifth of the left column', async () => {
  const sharp = require('sharp');
  const B = load('lib/case-study-paid-batch.ts');
  for (const c of B.PAID_CASES) {
    const { data, info } = await sharp(path.join(root, 'public/images/case-studies', `${c.key}-hero-wide.webp`)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    // text is dark or orange; in the band below 79% of the height and left of 35% of the width there must be none (the name is laid over it)
    let text = 0;
    for (let y = Math.floor(info.height * 0.8); y < info.height; y++) for (let x = 0; x < Math.floor(info.width * 0.35); x++) {
      const i = (y * info.width + x) * 3; const lum = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
      if (lum < 110) text++;
    }
    // Advit Prints' hero is a full-bleed photograph of a printed throw (fabric pattern) and Bblewrap's shows a laptop corner in the lower
    // left: both are photography, not text (checked by eye; the text blocks end above 66% of the height, see make-wide-heroes.cjs)
    if (['advit-prints-meta-ads', 'bblewrap-google-ads'].includes(c.key)) continue;
    assert.ok(text < 40, `${c.key}: ${text} dark pixels in the name zone`);
  }
});

test('the numbers on each case follow from the supplied totals', () => {
  const f2 = (n) => n.toFixed(2);
  assert.strictEqual(f2(4278961 / 3892), '1099.42'); assert.strictEqual(f2(27895678 / 4278961), '6.52');
  assert.strictEqual(f2(1140000 / 4124), '276.43'); assert.strictEqual(f2(1140000 / 178), '6404.49'); assert.strictEqual(f2(5162000 / 1140000), '4.53'); assert.strictEqual(f2((178 / 4124) * 100), '4.32');
  assert.strictEqual(f2(840000 / 3957), '212.28'); assert.strictEqual(f2(4352700 / 840000), '5.18');
  assert.strictEqual(f2(900000 / 4324), '208.14'); assert.strictEqual(f2(4756400 / 900000), '5.28');
  assert.strictEqual(400000 / 1600, 250); assert.strictEqual(400000 / 640, 625); assert.strictEqual((640 / 1600) * 100, 40); assert.strictEqual(f2(768000 / 400000), '1.92');
  assert.strictEqual(f2(1500000 / 2348), '638.84'); assert.strictEqual(f2(1500000 / 845), '1775.15'); assert.strictEqual(f2(1500000 / 329), '4559.27'); assert.strictEqual(f2(1500000 / 23), '65217.39'); assert.strictEqual(f2(4615228 / 1500000), '3.08');
});

test('each impact board parses to figures that each carry their metric and period, led by the supplied headline result', () => {
  withEnv(DEV, () => {
    const E = Object.fromEntries(load('lib/case-study-local-batch.ts').batchPreviewEntries().slice(0, 6).map((e) => [e.slug, e]));
    const { splitImpact } = load('lib/case-study-outcomes.ts');
    const leads = {
      'anybodycanbake-meta-ads': ['6.52×', '3,892', '₹2,78,95,678', '₹42,78,961', '₹1,099.42'],
      'ekoching-google-ads': ['178', '4.53×', '4,124', '₹6,404.49', '₹11,40,000', '₹51,62,000'],
      'klenzmo-meta-ads': ['3,957', '5.18×', '₹8,40,000', '₹43,52,700', '₹212.28'],
      'bakersville-google-ads': ['4,324', '5.28×', '₹9,00,000', '₹47,56,400', '₹208.14'],
      'phoenix-laundry-google-ads': ['640', '₹625', '1,600', '₹4,00,000', '₹7,68,000', '1.92×'],
      'hutnhomes-meta-ads': ['329', '23', '845', '2,348', '₹15,00,000', '₹46,15,228'],
    };
    for (const [slug, expected] of Object.entries(leads)) {
      const entry = E[slug];
      const r = splitImpact({ ...entry.impact.json, content: entry.impact.json.content.slice(1) });
      assert.ok(r, slug);
      assert.deepStrictEqual(r.outcomes.map((o) => [o.kind, o.lead]), expected.map((l) => ['figure', l]), slug);
      assert.ok(r.outcomes.every((o) => o.context.length > 20), `${slug}: every figure travels with its context`);
    }
    // Phoenix: the lifetime-value estimate is never a board figure, never in revenue or ROAS, and is called an estimate
    const phx = E['phoenix-laundry-google-ads'];
    assert.ok(!splitImpact({ ...phx.impact.json, content: phx.impact.json.content.slice(1) }).outcomes.some((o) => /50,000/.test(o.lead + o.context)));
    assert.match(textOf(phx.impact.json), /₹50,000[^.]*\. It is an estimate[^]*not realised revenue[^]*not included in the revenue or ROAS/);
    assert.ok(!/₹615/.test(JSON.stringify(phx)), 'the supplied ₹615 is not published; ₹625 follows from ₹4,00,000 / 640');
  });
});

test('the copy has no long or double dashes, no production notes and none of the claims the drafts rule out', () => {
  withEnv(DEV, () => {
    const E = load('lib/case-study-local-batch.ts').batchPreviewEntries().slice(0, 6);
    const B = load('lib/case-study-paid-batch.ts');
    for (const e of E) {
      const all = [e.title, e.summary, e.evidenceNote, textOf(e.problem.json), textOf(e.whatWeDid.json), textOf(e.impact.json)].join('\n');
      assert.doesNotMatch(all, /[—–]|--/, e.slug);
      assert.doesNotMatch(all, /Notes for approval|Image brief|Editorial notes|production guidance|fictional|illustrative figures|owner review|replace the earlier/i, e.slug);
      assert.doesNotMatch(all, /instagram|testimonial|guarantee|growth|improv(ed|ement) by|up from/i, e.slug);
      assert.doesNotMatch(all, /remain to be confirmed|not yet been supplied|until the delivery details|campaign formats have not/i, `${e.slug}: no unfinished drafting wording`);
      assert.strictEqual(e.showTestimonial, false); assert.strictEqual(e.review, undefined);
      assert.match(e.evidenceNote, /Amit Gupta/, `${e.slug}: the evidence note says who supplied the figures`);
      assert.ok(e.evidenceNote.length > 200, `${e.slug}: the evidence note carries the basis and its limits`);
    }
    for (const c of B.PAID_CASES) {
      const all = [c.card.eyebrow, c.card.body, c.card.cta, c.metaDescription, c.alt.card, c.alt.hero, c.dashboard?.alt ?? '', B.PAID_CASE_CLOSE_BODY[c.key]].join('\n');
      assert.doesNotMatch(all, /[—–]|--/, c.key);
      assert.doesNotMatch(c.card.body.replace(/\b(19|20)\d{2}\b/g, ''), /\d/, `${c.key}: the card text carries no figure (a year is not a result)`);
      assert.ok(c.metaDescription.length >= 120 && c.metaDescription.length <= 160, `${c.key}: meta ${c.metaDescription.length}`);
      assert.ok(c.metaDescription.includes(c.service));
    }
    const by = Object.fromEntries(E.map((e) => [e.slug, e]));
    // metric labels that must be kept as supplied
    for (const k of ['klenzmo-meta-ads', 'bakersville-google-ads']) {
      const all = JSON.stringify(by[k]);
      assert.match(all, /products sold/); assert.match(all, /advertising cost per product sold/);
      assert.doesNotMatch(all, /\d[\d,]* (orders|purchases|unique customers)\b/i);
      assert.match(by[k].evidenceNote, /not (labelled as|assumed to equal) orders/);
    }
    assert.match(by['hutnhomes-meta-ads'].evidenceNote, /not presented as total property transaction value or confirmed brokerage income/);
    assert.doesNotMatch(JSON.stringify(by['hutnhomes-meta-ads']), /(?<!Not asserted as )completed sales?|attended visits?/i, 'completed sales and attended visits are never asserted');
    assert.match(by['ekoching-google-ads'].impact.json.content[1].content[0].value, /period-level ratio rather than a verified matched-cohort conversion rate/);
    // owner confirmation (30 October 2026): EKoching and Phoenix Laundry used Search and Display campaigns; no other format is claimed anywhere
    for (const k of ['ekoching-google-ads', 'phoenix-laundry-google-ads']) assert.match(textOf(by[k].whatWeDid.json), /managing Search and Display campaigns/, k);
    for (const k of ['anybodycanbake-meta-ads', 'klenzmo-meta-ads', 'bakersville-google-ads', 'hutnhomes-meta-ads']) assert.doesNotMatch(JSON.stringify(by[k]), /Search and Display|Shopping|Performance Max/, k);
    assert.doesNotMatch(JSON.stringify(['ekoching-google-ads', 'phoenix-laundry-google-ads'].map((k) => [by[k].impact, by[k].problem])), /keyword|landing page|remarketing|Performance Max|Shopping/i);
    // AnybodyCanBake Meta: the long relationship is context, the measured period is Sep 2021 to Oct 2026
    const abc = by['anybodycanbake-meta-ads'];
    assert.match(abc.summary, /since 2018/); assert.match(abc.summary, /September 2021 to October 2026/);
    assert.match(abc.summary, /attributed to Facebook Ads/);
    assert.match(abc.evidenceNote, /do not cover the full relationship since 2018/);
    assert.strictEqual(abc.periodStart, '2021-09-01'); assert.strictEqual(abc.periodEnd.slice(0, 7), '2026-10');
    assert.match(B.paidCaseFor('/portfolio/anybodycanbake-meta-ads').alt.hero, /September 2021 to October 2026/, 'the hero alt text states the results period the artwork lacks');
  });
});

test('the listing cards: own image, service and industry in the eyebrow, no figure, and the two AnybodyCanBake cases stay distinguishable', () => {
  const W = load('components/b2/work-cards.ts');
  const L = load('components/cplus/work/studies.ts');
  const B = load('lib/case-study-paid-batch.ts');
  const mk = (c) => ({ slug: c.key, href: c.href, title: 't', client: c.client, detail: '', industry: c.industry, service: c.service === 'Google Ads' ? 'Google Ads' : 'Social Media Ads', stage: null, challenge: 'Challenge text.', changed: [], outcomes: [], figures: 0, sector: null, serviceKey: null, period: '', search: '' });
  const cards = B.PAID_CASES.map((c) => W.toCard(mk(c)));
  cards.forEach((card, i) => {
    const c = B.PAID_CASES[i];
    assert.strictEqual(card.href, c.href); assert.strictEqual(card.title, c.client);
    assert.strictEqual(card.eyebrow, `${c.service} · ${c.industry}`); assert.strictEqual(card.art.src, `/images/case-studies/${c.key}-card.webp`);
    assert.ok(card.art.alt.length > 40); assert.ok(!card.art.note, 'owner instruction 2026-10-31: no caption under any /work card image'); assert.ok(!card.motif);
  });
  const abcMeta = cards[0];
  const abcGoogle = W.toCard(mk({ key: 'x', href: '/portfolio/google-ads-for-online-courses', client: 'AnybodyCanBake', service: 'Google Ads', industry: 'x' }));
  assert.notStrictEqual(abcMeta.eyebrow, abcGoogle.eyebrow); assert.notStrictEqual(abcMeta.href, abcGoogle.href); assert.notStrictEqual(abcMeta.art.src, abcGoogle.art.src);
  assert.ok(L.toWorkStudy, 'the library study builder is the one the cards come from');
});

test('placement: each study appears on every service and industry page it belongs to, and existing bespoke cards are never replaced', () => {
  const R = load('lib/case-study-related.ts');
  const studies = [
    ['/portfolio/google-ads-for-online-courses', '/google-ads', 'education', 'Online Baking Academy'],
    ['/portfolio/om-sai-developer-meta-ads', '/social-media-ads', 'real-estate', 'Real estate'],
    ...KEYS.map((k) => [hrefOf(k), MAP[k].serviceKey, MAP[k].sector, MAP[k].industry]),
  ].map(([href, serviceKey, sector, industry]) => ({ href, serviceKey, sector, industry }));
  const pick = (by) => R.relatedStudies(studies, by).map((s) => s.href.replace('/portfolio/', ''));
  assert.deepStrictEqual(pick({ service: '/google-ads', exclude: ['/portfolio/google-ads-for-online-courses'] }), ['ekoching-google-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads']);
  assert.deepStrictEqual(pick({ service: '/social-media-ads', exclude: ['/portfolio/om-sai-developer-meta-ads'] }), ['anybodycanbake-meta-ads', 'klenzmo-meta-ads', 'hutnhomes-meta-ads']);
  assert.deepStrictEqual(pick({ audience: 'education', exclude: ['/portfolio/google-ads-for-online-courses'] }), ['anybodycanbake-meta-ads', 'ekoching-google-ads']);
  assert.deepStrictEqual(pick({ audience: 'd2c' }), ['klenzmo-meta-ads', 'bakersville-google-ads']);
  assert.deepStrictEqual(pick({ audience: 'real-estate', exclude: ['/portfolio/om-sai-developer-meta-ads'] }), ['hutnhomes-meta-ads']);
  assert.deepStrictEqual(pick({ audience: 'enquiry-led' }), ['phoenix-laundry-google-ads']);
  // the page components wire the section in with exactly those inputs (inside a Suspense boundary, so the page renders without it)
  const comp = (f) => read(`components/${f}.tsx`);
  // DEC-116: the five rollout pages use the one shared showcase; the page's own card is kept only while no study is public (never loses its proof)
  const cfg = (f) => fs.readFileSync(path.join(root, `components/${f}/showcase.ts`), 'utf8');
  for (const f of ['google-ads-r41/GoogleAdsR41', 'education-r2/EducationR2', 'd2c-r1/D2CR1', 'real-estate-r2/RealEstateR2']) {
    assert.match(comp(f), /\{showcase \? <CaseShowcase data=\{showcase\} \/> : \(/, `${f}: showcase, with the existing card as the zero-case fallback`);
    assert.doesNotMatch(comp(f), /RelatedCaseCards/, `${f}: no second case list`);
  }
  assert.match(comp('enquiry-led-r11/EnquiryLedR11'), /<CaseShowcase data=\{showcase\} \/>/);
  assert.doesNotMatch(comp('enquiry-led-r11/EnquiryLedR11'), /RelatedCaseCards/);
  assert.match(cfg('google-ads-r41'), /fillService: '\/google-ads'/);
  assert.match(cfg('education-r2'), /fillAudience: 'education'/);
  assert.match(cfg('d2c-r1'), /fillAudience: 'd2c'/);
  assert.match(cfg('real-estate-r2'), /fillAudience: 'real-estate'/);
  assert.match(cfg('enquiry-led-r11'), /fillAudience: 'enquiry-led'/);
  // DEC-115: /social-media-ads uses the one shared case showcase (Om Sai, Klenzmo, AnybodyCanBake first, then the service's other studies), not the auto list
  assert.match(comp('meta-ads-r22/MetaAdsR22'), /<CaseShowcase data=\{showcase\} \/>/);
  assert.doesNotMatch(comp('meta-ads-r22/MetaAdsR22'), /RelatedCaseCards/);
  assert.match(fs.readFileSync(path.join(root, 'components/meta-ads-r22/showcase.ts'), 'utf8'), /fillService: '\/social-media-ads'/);
  for (const p of ['google-ads', 'social-media-ads', 'who-we-help/d2c', 'who-we-help/education', 'who-we-help/real-estate', 'who-we-help/enquiry-led-businesses']) {
    assert.doesNotMatch(read(`app/(pages)/${p}/page.tsx`), /RelatedCaseCards/, `${p}: the page file itself is unchanged`);
  }
  const card = read('components/case-study/RelatedCaseCards.tsx');
  assert.match(card, /<WorkCard s=\{toCard\(s\)\}/, 'the shared card, so the dedicated listing image and link are used');
  assert.match(card, /catch \{\s*return null;/, 'an unreadable library renders nothing');
  assert.match(card, /if \(!items\.length\) return null/, 'a page is unchanged until its studies are published');
});

test('the fixtures are inert outside development with the flag, and are reachable only through the preview switch', () => {
  const run = (env) => withEnv(env, () => load('lib/case-study-local-preview.ts').withLocalPreview([]).length);
  assert.strictEqual(run({ NODE_ENV: 'production', CASE_STUDY_LOCAL_PREVIEW: '1' }), 0);
  assert.strictEqual(run({ NODE_ENV: 'test', CASE_STUDY_LOCAL_PREVIEW: '1' }), 0);
  assert.strictEqual(run({ NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: undefined }), 0);
  assert.strictEqual(run({ NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: '0' }), 0);
  assert.strictEqual(run(DEV), 19, 'AnybodyCanBake Google Ads, the fourteen, and the final four (ClassPe, InsurYo, Ameba Software, Wanderlooms; appended here because no Contentful entry exists in this empty list)');
  // the batch fixture is imported by the preview switch and by nothing else in the application
  const importers = [];
  const walk = (d) => { for (const f of fs.readdirSync(path.join(root, d), { withFileTypes: true })) {
    const rel = path.join(d, f.name);
    if (f.isDirectory()) { if (!['node_modules', '.next', 'docs', 'public'].includes(f.name)) walk(rel); continue; }
    if (/\.(ts|tsx)$/.test(f.name) && /from '@\/lib\/case-study-local-batch'/.test(read(rel))) importers.push(rel);
  } };
  ['app', 'components', 'lib'].forEach(walk);
  assert.deepStrictEqual(importers.sort(), ['lib/case-study-local-preview.ts']);
  assert.match(read('lib/case-study-local-batch.ts'), /DEVELOPMENT-PREVIEW ONLY/);
});

test('the shared template and the existing studies are unchanged where they should be', () => {
  const t = read('components/case-study/CaseStudyTemplate.tsx');
  assert.match(t, /<ActionLink href=\{BOOKING_HREF\} variant="text">\s*Request a Call/);
  assert.match(t, /art\?\.still \? ' is-still' : ''/);
  const css = read('components/case-study/case-study.css');
  assert.match(css, /is-still\.is-photo \.ct-stage-img > img \{ animation: none; transform: none; \}/);
  assert.doesNotMatch(css, /is-whole \{[^}]*aspect-ratio/, 'the stage keeps the shared 2.6, 2 and 1.3 ratios');
  const I = load('lib/case-study-images.ts');
  assert.ok(!I.imageSlotsFor('/portfolio/google-ads-for-online-courses').feature.still, 'AnybodyCanBake Google Ads keeps its approved stage behaviour');
  assert.ok(!I.imageSlotsFor('/portfolio/om-sai-developer-meta-ads').feature.still);
  const X = load('lib/case-study-presentation.ts');
  assert.deepStrictEqual(X.presentationFor('/portfolio/om-sai-developer-meta-ads'), {});
  assert.deepStrictEqual(X.presentationFor('/portfolio/google-ads-for-online-courses').close, { title: 'Want more paid enrolments for your courses?', body: 'Tell us what you teach and what you want your advertising to achieve.', cta: 'Discuss Your Advertising' });
});

test('the dashboard bars are drawn in proportion to spend and revenue (supplied artwork, checked by measurement)', async () => {
  const sharp = require('sharp');
  const cases = [
    ['anybodycanbake-meta-ads', 476, 677, 770, 4278961, 27895678],
    ['klenzmo-meta-ads', 480, 677, 770, 840000, 4352700],
    ['bakersville-google-ads', 476, 677, 770, 900000, 4756400],
  ];
  for (const [key, x0, yGrey, yRed, spend, revenue] of cases) {
    const { data, info } = await sharp(path.join(root, 'public/images/case-studies', `${key}-dashboard.webp`)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const px = (x, y) => { const i = (y * info.width + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
    const run = (y, ok) => { let x = x0; while (x < info.width && ok(px(x, y))) x++; return x - x0; };
    const grey = run(yGrey, ([r, g, b]) => Math.abs(r - 120) < 35 && Math.abs(g - 127) < 35 && Math.abs(b - 134) < 35);
    const red = run(yRed, ([r, g, b]) => r > 170 && g < 120 && b < 120);
    assert.ok(Math.abs(grey / red - spend / revenue) < 0.015, `${key}: ${grey} / ${red} against ${(spend / revenue).toFixed(3)}`);
  }
});

test('owner instruction 2026-10-30: no dashboard or hero captions, no full-size image link, and the shared change reaches only the seven studies', () => {
  const t = read('components/case-study/CaseStudyTemplate.tsx');
  assert.doesNotMatch(t, /Open full size|ct-media-a|impactMedia\.caption|target="_blank"/);
  assert.match(t, /<figure className="ct-media">\s*<Image src=\{impactMedia\.src\}/);
  const css = read('components/case-study/case-study.css');
  assert.doesNotMatch(css, /ct-media-a|ct-media figcaption/);
  const B = load('lib/case-study-paid-batch.ts');
  const X = load('lib/case-study-presentation.ts');
  const I = load('lib/case-study-images.ts');
  const seven = ['/portfolio/google-ads-for-online-courses', ...B.PAID_CASES.map((c) => c.href)];
  for (const h of seven) { assert.ok(X.presentationFor(h).impactMedia, h); assert.strictEqual(X.presentationFor(h).impactMedia.caption, undefined, h); }
  for (const c of B.PAID_CASES) assert.strictEqual(I.imageSlotsFor(c.href).feature.note, undefined);
  // no other study has an impact image, so the template change reaches no other page
  // (without the final-four release switch the three existing studies have no dashboard; ClassPe and InsurYo never do, by owner correction of 31 October 2026)
  for (const h of ['/portfolio/om-sai-developer-meta-ads', '/portfolio/classpe-social-media-strategy', '/portfolio/insuryo-organic-growth', '/portfolio/seo-ameba-software', '/portfolio/seo-for-home-decor-brand']) assert.strictEqual(X.presentationFor(h).impactMedia, undefined, h);
  // the evidence basis stays in the case-study copy
  withEnv(DEV, () => { for (const e of load('lib/case-study-local-batch.ts').batchPreviewEntries()) assert.ok(e.evidenceNote.length > 200, e.slug); });
});

test('client logos: every client of the six studies is in the register, shown, with its own logo file and its own case-study address', () => {
  const C = load('lib/clients.ts');
  const want = { 'anybodycanbake-meta-ads': null, 'ekoching-google-ads': 'ekoching', 'klenzmo-meta-ads': 'klenzmo', 'bakersville-google-ads': 'bakersville', 'phoenix-laundry-google-ads': 'phoenix-laundry', 'hutnhomes-meta-ads': 'hut-n-homes' };
  for (const [slug, key] of Object.entries(want)) {
    if (!key) { assert.strictEqual(C.CLIENTS.find((c) => c.key === 'anybodycanbake').display, 'show'); continue; }
    const c = C.clientForHref(`/portfolio/${slug}`);
    assert.ok(c && c.key === key, slug);
    assert.ok(fs.existsSync(path.join(root, 'public', c.logo.src)), `${key}: logo file present`);
  }
  assert.strictEqual(C.clientForHref('/portfolio/google-ads-for-online-courses').key, 'anybodycanbake');
  // /work R2 (31 October 2026): the client-logo strip is removed from /work (the register itself and the other pages' walls are unchanged)
  assert.doesNotMatch(read('components/b2/Work.tsx'), /ClientLogo|clientForHref|wk-mosaic/);
});

// Existing studies stay when the preview is merged in. The "existing" entries below are TEST-ONLY stand-ins with the real slugs of the
// existing studies (never used by the application); they prove the merge, the order, the pagination and the filters, not any content.
test('the preview MERGES with existing studies: none is replaced or dropped, existing order is kept, and everything stays discoverable across pages and filters', () => {
  withEnv(DEV, () => {
    const { doc, p } = load('lib/case-study-doc-builders.ts');
    const fake = (id, slug, extra = {}) => ({ sys: { id, publishedVersion: 3, publishedAt: '2026-01-01T00:00:00Z', firstPublishedAt: '2026-01-01T00:00:00Z' }, title: `Stand-in ${slug}`, slug, clientName: { clientName: `Client ${slug}` }, industry: { name: 'Stand-in' }, summary: 'Stand-in summary.', problem: { json: doc(p('x')) }, whatWeDid: { json: doc(p('x')) }, impact: { json: doc(p('x')) }, ...extra });
    const abcId = '6Ycb7aYvXrslOXKchQnqmi';
    const existing = [
      fake('t-om', 'om-sai-developer-meta-ads', { serviceKey: '/social-media-ads', sector: 'real-estate' }),
      fake(abcId, 'google-ads-for-online-courses', { serviceKey: '/google-ads', sector: 'education' }),
      fake('t-classpe', 'classpe-social-media-strategy', { serviceKey: '/social-media-ads', sector: 'education' }),
      fake('t-insuryo', 'insuryo-organic-growth', { serviceKey: '/seo', sector: 'financial-services' }),
      ...Array.from({ length: 3 }, (_, i) => fake(`t-extra-${i}`, `stand-in-extra-${i}`)),
    ];
    const P = load('lib/case-study-local-preview.ts');
    const merged = P.withLocalPreview(existing);
    assert.deepStrictEqual(merged.slice(0, 7).map((e) => e.slug), existing.map((e) => e.slug), 'existing entries keep their place, including AnybodyCanBake Google Ads');
    // fourteen batch studies added, then Ameba Software (absent from this stand-in set) and Wanderlooms appended; ClassPe and InsurYo are REPLACED IN PLACE by the final four
    assert.strictEqual(merged.length, existing.length + 14 + 2, 'fourteen added, plus the two final-four studies the stand-in set lacks; none dropped');
    assert.deepStrictEqual(merged.slice(7, 21).map((e) => e.slug), ALL_KEYS);
    assert.deepStrictEqual(merged.slice(21).map((e) => e.slug), ['seo-ameba-software', 'wanderlooms-meta-ads']);
    const cp = merged.find((e) => e.slug === 'classpe-social-media-strategy');
    assert.strictEqual(cp.sys, existing[2].sys, 'a replaced entry keeps its own sys, so its identity and place are unchanged');
    assert.strictEqual(merged.indexOf(cp), 2, 'and its position');
    assert.match(cp.title, /Approximately 95 percent/);
    assert.match(merged[1].title, /1,410 paid enrolments/, 'only the revised AnybodyCanBake (Google Ads) fields replace that one entry');
    // through the real mapper, eligibility, ordering and library
    const { selectPublic } = load('lib/case-study-eligibility.ts');
    const { mapContentfulCaseStudyToCms } = load('lib/contentful/mappers.ts');
    const { orderStudies, PAGE_SIZE, facets, filterStudies } = load('lib/case-study-library.ts');
    const { libraryStudies, libraryPage } = load('components/cplus/work/studies.ts');
    const pub = orderStudies(selectPublic(merged.map(mapContentfulCaseStudyToCms)), (s) => s.library.listingOrder);
    assert.strictEqual(pub.length, 23);
    const all = libraryStudies(pub, 'google-ads-for-online-courses');
    assert.strictEqual(all.length, 23);
    const pages = Math.ceil(23 / PAGE_SIZE); assert.strictEqual(pages, 2);
    const where = (slug) => { for (let n = 1; n <= pages; n++) if (libraryPage(all, n).items.some((s) => s.slug === slug)) return n; return 0; };
    for (const slug of ['classpe-social-media-strategy', 'insuryo-organic-growth', 'om-sai-developer-meta-ads', ...ALL_KEYS]) assert.ok(where(slug) > 0, `${slug} appears on a page`);
    assert.strictEqual(libraryPage(all, 1).items.length + libraryPage(all, 2).items.length, 23, 'no study falls between pages');
    // filters reach studies wherever they sit
    const f = facets(all);
    const hits = (service) => filterStudies(all, { q: '', sector: null, service }).map((s) => s.slug);
    assert.ok(hits('/social-media-ads').includes('wanderlooms-meta-ads') && hits('/social-media-ads').includes('klenzmo-meta-ads'));
    assert.ok(!hits('/social-media-ads').includes('classpe-social-media-strategy'), 'organic social work is not tagged as paid advertising');
    assert.ok(hits('/seo').includes('seo-ameba-software'));
    assert.ok(filterStudies(all, { q: 'classpe', sector: null, service: null }).length >= 1, 'search finds a study on any page');
    assert.ok(f.services.length >= 3);
  });
});
