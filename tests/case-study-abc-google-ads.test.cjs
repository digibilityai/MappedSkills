// AnybodyCanBake (Google Ads) case study revision, 30 October 2026. Local preview only: the revised copy is a development
// fixture (lib/case-study-local-preview.ts) and the images are supplied artwork. Checks the facts, the copy rules, the image
// slots and that nothing here can reach a production build. No Contentful calls.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { load, root } = require('./helpers/ts-loader.cjs');
Module._extensions['.css'] = () => {};

const HREF = '/portfolio/google-ads-for-online-courses';
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const textOf = (n) => (n.nodeType === 'text' ? n.value : (n.content || []).map(textOf).join(' '));
const withEnv = (env, fn) => {
  const saved = { NODE_ENV: process.env.NODE_ENV, CASE_STUDY_LOCAL_PREVIEW: process.env.CASE_STUDY_LOCAL_PREVIEW };
  for (const [k, v] of Object.entries(env)) v === undefined ? delete process.env[k] : (process.env[k] = v);
  try { return fn(); } finally { for (const [k, v] of Object.entries(saved)) v === undefined ? delete process.env[k] : (process.env[k] = v); }
};

test('the confirmed totals are consistent: cost per enrolment and ROAS follow from spend, revenue and enrolments', () => {
  const spend = 1266390, revenue = 6636000, enrolments = 1410;
  assert.strictEqual((spend / enrolments).toFixed(2), '898.15');
  assert.strictEqual((revenue / spend).toFixed(2), '5.24');
  assert.strictEqual((revenue / 100000).toFixed(2), '66.36');
});

test('the preview entry parses to exactly the five approved figures, each with its context, and no testimonial', () => {
  withEnv({ NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: '1' }, () => {
    const P = load('lib/case-study-local-preview.ts');
    const O = load('lib/case-study-outcomes.ts');
    const entry = P.abcPreviewEntry();
    const takeawayRemoved = { ...entry.impact.json, content: entry.impact.json.content.slice(2) };
    const r = O.splitImpact(takeawayRemoved);
    assert.deepStrictEqual(r.outcomes.map((o) => [o.kind, o.lead]), [
      ['figure', '5.24×'], ['figure', '1,410'], ['figure', '₹66,36,000'], ['figure', '₹12,66,390'], ['figure', '₹898.15'],
    ]);
    assert.ok(r.outcomes.every((o) => o.context.length > 20), 'every figure travels with its metric and period');
    assert.strictEqual(entry.showTestimonial, false);
    assert.strictEqual(entry.review, undefined);
  });
});

test('the copy has no long or double dashes, no banned claims, and the approved evidence wording', () => {
  const P = load('lib/case-study-local-preview.ts');
  const all = [P.ABC_SUMMARY, P.ABC_EVIDENCE_NOTE, textOf(P.ABC_PROBLEM), textOf(P.ABC_WHAT_WE_DID), textOf(P.ABC_IMPACT)].join('\n');
  assert.doesNotMatch(all, /[—–]|--/);
  assert.doesNotMatch(all, /eggless|healthy baking|testimonial|click-through|impressions|conversion rate|growth|reduc|\bsaved\b/i);
  assert.match(P.ABC_EVIDENCE_NOTE, /not a before-and-after comparison/);
  assert.match(P.ABC_EVIDENCE_NOTE, /does not represent profit/);
  assert.match(P.ABC_SUMMARY, /1,410 paid enrolments and ₹66\.36 lakh in reported revenue\.$/);
  assert.ok(P.ABC_SUMMARY.length > 250, 'the visible introduction is not shortened for metadata');
  const meta = load('lib/case-study-presentation.ts').presentationFor(HREF).metaDescription;
  assert.ok(meta.length >= 150 && meta.length <= 160, `meta description length ${meta.length}`);
  assert.match(meta, /Google Ads/); assert.match(meta, /online baking courses/); assert.match(meta, /1,410 paid enrolments/); assert.match(meta, /reported revenue/);
  assert.match(P.ABC_EVIDENCE_NOTE, /business records/); assert.match(P.ABC_EVIDENCE_NOTE, /reconciled enrolments and revenue with Google Ads advertising data/);
  assert.match(P.ABC_EVIDENCE_NOTE, /revenue excludes refunds/); assert.match(P.ABC_EVIDENCE_NOTE, /not been independently audited/); assert.match(P.ABC_EVIDENCE_NOTE, /do not show how much revenue advertising alone caused/);
  assert.doesNotMatch(all, /AnyBodyCanBake/, 'DEC-102: the brand is AnybodyCanBake');
  assert.strictEqual(P.abcPreviewEntry().title, '1,410 paid enrolments attributed to Google Ads');
});

test('the preview fixture is inert outside development with the flag, and never in production or test', () => {
  const run = (env) => withEnv(env, () => load('lib/case-study-local-preview.ts').withLocalPreview([]).length);
  assert.strictEqual(run({ NODE_ENV: 'production', CASE_STUDY_LOCAL_PREVIEW: '1' }), 0);
  assert.strictEqual(run({ NODE_ENV: 'test', CASE_STUDY_LOCAL_PREVIEW: '1' }), 0);
  assert.strictEqual(run({ NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: undefined }), 0);
  assert.strictEqual(run({ NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: '1' }), 1);
});

test('the supplied images are in place at their own pixels and are the study\'s listing, detail and sharing images', () => {
  const dim = (f) => { const b = fs.readFileSync(path.join(root, 'public/images/resolve-r3', f)); return b.toString('ascii', 0, 4) === 'RIFF' ? f : null; };
  for (const f of ['anybodycanbake-listing.webp', 'anybodycanbake-feature.webp', 'anybodycanbake-dashboard.webp']) assert.ok(dim(f), f);
  const I = load('lib/case-study-images.ts');
  const slots = I.imageSlotsFor(HREF);
  assert.strictEqual(slots.card.kind, 'image');
  assert.strictEqual(slots.feature.kind, 'image');
  assert.match(slots.card.src, /anybodycanbake-listing\.webp$/);
  assert.match(slots.feature.src, /anybodycanbake-feature\.webp$/);
  assert.strictEqual(slots.card.position, '0% 50%', 'the card crops from the right so the baked text on the left is never cut');
  assert.ok(slots.feature.whole && slots.feature.og);
  assert.ok(slots.card.alt.length > 40 && slots.feature.alt.length > 40);
  // only this study opts into the sharing image; Om Sai and the rest keep the site default
  for (const h of ['/portfolio/om-sai-developer-meta-ads', '/portfolio/classpe-social-media-strategy', '/portfolio/insuryo-organic-growth', '/portfolio/seo-ameba-software', '/portfolio/seo-for-home-decor-brand']) {
    assert.ok(!I.imageSlotsFor(h).feature?.og, h);
  }
});

test('presentation extras exist only for this study: the dashboard in the impact and the approved closing', () => {
  const X = load('lib/case-study-presentation.ts');
  const x = X.presentationFor(HREF);
  assert.match(x.impactMedia.src, /anybodycanbake-dashboard\.webp$/);
  assert.strictEqual(x.impactMedia.caption, 'Recreated agency dashboard showing reported campaign totals, February 2020 to August 2021.');
  assert.deepStrictEqual(x.close, { title: 'Want more paid enrolments for your courses?', body: 'Tell us what you teach and what you want your advertising to achieve.', cta: 'Discuss Your Advertising' });
  assert.deepStrictEqual(X.presentationFor('/portfolio/om-sai-developer-meta-ads'), {});
});

test('the listing card text carries no figure, and the study keeps its address and canonical', () => {
  const W = load('components/resolve/work.ts');
  const body = W.STUDIES.anybodycanbake.body;
  assert.doesNotMatch(body, /\d|eggless|healthy/);
  assert.strictEqual(W.STUDIES.anybodycanbake.href, HREF);
  const page = read('app/(pages)/portfolio/[slug]/page.tsx');
  assert.match(page, /createMetadata\(caseStudy\.metaTitle, presentationFor\(caseStudy\.href\)\.metaDescription \?\? caseStudy\.metaDescription, caseStudy\.href, og\?\.src, og\?\.alt\)/);
});

test('the template shows an image whole on the same stage as Om Sai: same frame, outlined client name behind it, no gradient over it, no logo chip', () => {
  const css = read('components/case-study/case-study.css');
  assert.doesNotMatch(css, /is-whole \{[^}]*aspect-ratio/, 'the stage keeps the shared 2.6, 2 and 1.3 ratios');
  assert.match(css, /is-whole \.ct-stage-img > img \{ object-fit: contain/);
  assert.match(css, /is-whole::after \{ display: none; \}/);
  assert.match(css, /is-whole \.ct-stage-mark \{ z-index: 0; \}/);
  assert.doesNotMatch(css, /is-whole[^{]*ct-stage-mark[^{]*\{[^}]*display: none/);
  assert.match(read('components/case-study/CaseStudyTemplate.tsx'), /art\?\.logo \|\| art\?\.whole \? null : clientForHref/);
});

test('the dashboard bars are drawn in proportion to spend and revenue (spend / revenue = 0.1908)', () => {
  const sharp = require('sharp');
  return sharp(path.join(root, 'public/images/resolve-r3/anybodycanbake-dashboard.webp')).raw().toBuffer({ resolveWithObject: true }).then(({ data, info }) => {
    const px = (x, y) => { const i = (y * info.width + x) * info.channels; return [data[i], data[i + 1], data[i + 2]]; };
    const run = (y, ok) => { let x = 476; while (ok(px(x, y))) x++; return x - 476; };
    const grey = run(680, ([r, g, b]) => Math.abs(r - 125) < 25 && Math.abs(g - 132) < 25 && Math.abs(b - 140) < 25);
    const red = run(770, ([r, g, b]) => r > 180 && g < 110 && b < 110);
    assert.ok(Math.abs(grey / red - 1266390 / 6636000) < 0.012, `${grey} / ${red}`);
  });
});
