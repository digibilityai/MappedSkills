// The final four case studies of the 31 October 2026 local review (ClassPe, InsurYo, Ameba Software, Wanderlooms), from
// MappedSkills_4_Additional_Case_Studies_and_Image_Briefs.docx. Local preview only: the copy is a development fixture
// (lib/case-study-local-final-four.ts). Checks the mapping, every figure against the supplied inputs and its arithmetic, the metric-definition
// rules, the placements, the image files, the owner's "no ClassPe / InsurYo dashboard" correction and production inertness. No Contentful calls.
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
// the release gate (lib/case-study-release.ts, DEC-117) is the CONTENT: a study with the approved final summary gets its code-resident artwork and copy; no environment variable is involved

// document order -> client -> service -> industry -> sector -> service key (null: organic work is not a catalogue service)
const MAP = {
  'classpe-social-media-strategy': { key: 'classpe-social-media', client: 'ClassPe', industry: 'Education and training', sector: 'education', serviceKey: null, dashboard: false },
  'insuryo-organic-growth': { key: 'insuryo-organic-growth', client: 'InsurYo', industry: 'Insurance', sector: 'financial-services', serviceKey: null, dashboard: false },
  'seo-ameba-software': { key: 'ameba-software-seo', client: 'Ameba Software, Chandigarh', industry: 'Software and technology', sector: 'software-technology', serviceKey: '/seo', dashboard: true },
  'wanderlooms-meta-ads': { key: 'wanderlooms-meta-ads', client: 'Wanderlooms', industry: 'Adventure apparel', sector: 'ecommerce-retail', serviceKey: '/social-media-ads', dashboard: true },
};
const SLUGS = Object.keys(MAP);
const specs = () => withEnv(DEV, () => load('lib/case-study-local-final-four.ts').FINAL_FOUR_SPECS);
const spec = (slug) => specs().find((s) => s.slug === slug);
const whole = (s) => [s.title, s.summary, textOf(s.problem), textOf(s.whatWeDid), textOf(s.impact), s.evidenceNote].join(' ');

test('the four cases and their mapping: client, industry, sector, service key; ClassPe and InsurYo carry no service tag', () => {
  assert.deepStrictEqual(specs().map((s) => s.slug), SLUGS);
  for (const [slug, m] of Object.entries(MAP)) {
    const s = spec(slug);
    assert.strictEqual(s.client, m.client, slug); assert.strictEqual(s.industry, m.industry, slug);
    assert.strictEqual(s.sector, m.sector, slug); assert.strictEqual(s.serviceKey, m.serviceKey, slug);
  }
  const L = load('lib/case-study-library.ts');
  for (const s of specs()) { assert.ok(s.sector in L.SECTORS, s.slug); if (s.serviceKey) assert.ok(s.serviceKey in L.SERVICE_FILTERS, s.slug); }
});

test('the three existing routes are preserved and Wanderlooms follows the <client>-<service> slug convention with no earlier entry', () => {
  const F = load('lib/case-study-final-four.ts');
  assert.deepStrictEqual(F.FINAL_FOUR.map((c) => c.href), SLUGS.map((s) => `/portfolio/${s}`));
  const E = load('lib/case-study-eligibility.ts');
  assert.ok(E.SLUG_PATTERN.test('wanderlooms-meta-ads'));
  assert.ok(!E.RESERVED_CASE_STUDY_ROUTES.has('wanderlooms-meta-ads'));
});

test('figures: every number is one the owner supplied, and every derived figure re-computes', () => {
  const r2 = (n) => Math.round(n * 100) / 100;
  // Ameba Software: growth = (later - earlier) / earlier
  assert.strictEqual(r2(((12800 - 7300) / 7300) * 100), 75.34);
  assert.strictEqual(r2(((8940 - 5200) / 5200) * 100), 71.92);
  assert.strictEqual(r2(((53 - 34) / 34) * 100), 55.88);
  assert.strictEqual(12800 - 7300, 5500); assert.strictEqual(53 - 34, 19); assert.strictEqual(8940 - 5200, 3740);
  // Wanderlooms
  assert.strictEqual(r2(3600000 / 6607), 544.88);
  assert.strictEqual(r2(11232000 / 6607), 1700.02);
  assert.strictEqual(r2(11232000 / 3600000), 3.12);
  const a = whole(spec('seo-ameba-software'));
  for (const f of ['7,300', '12,800', '75.34%', '5,200', '8,940', '71.92%', '34', '53', '55.88%', '5,500', '19 more', '3,740']) assert.ok(a.includes(f), f);
  const w = whole(spec('wanderlooms-meta-ads'));
  for (const f of ['6,607', '₹36,00,000', '₹1,12,32,000', '₹544.88', '₹1,700.02', '3.12×', '₹3.12']) assert.ok(w.includes(f), f);
  const c = whole(spec('classpe-social-media-strategy'));
  assert.ok(/approximately 95%/i.test(c) && c.includes('≈95%'));
  const i = whole(spec('insuryo-organic-growth'));
  for (const f of ['four major projects', '₹20 crore', 'September 2025', 'Bihar and the Gorakhpur area']) assert.ok(i.includes(f), f);
  assert.ok(!i.includes('November 2025'), 'the earlier November 2025 start is replaced and the draft note is not public');
  // no earlier-draft example figure carried over
  for (const s of specs()) assert.doesNotMatch(whole(s), /six month|example|placeholder|hypothetical/i, s.slug);
});

test('metric rules: growth, milestones, valuation, revenue and outcomes stay distinct; no causal overclaim; no testimonial', () => {
  const c = spec('classpe-social-media-strategy');
  assert.match(whole(c), /overall business growth/i); assert.match(c.evidenceNote, /not attributed to organic social content alone/i);
  assert.match(textOf(c.whatWeDid), /in-house team/); assert.doesNotMatch([c.summary, textOf(c.impact)].join(' '), /follower|admission source/i, 'no follower totals or admission splits');
  assert.match(c.evidenceNote, /Paid campaign execution was carried out by ClassPe’s in-house team, not by MappedSkills/);
  const i = spec('insuryo-organic-growth');
  assert.match(textOf(i.impact), /company milestone, separate from revenue, funding raised and marketing results/);
  assert.match(i.evidenceNote, /not marketing-attributed results and are not credited to MappedSkills’s work alone/);
  assert.match(textOf(i.whatWeDid), /No paid advertising formed part of this work/);
  assert.doesNotMatch(whole(i), /ROAS|return on (ad )?spend/i, 'valuation is not presented as a return');
  const a = spec('seo-ameba-software');
  assert.match(a.evidenceNote, /not proof that the work alone caused the change/);
  assert.doesNotMatch([a.summary, textOf(a.impact)].join(' '), /rankings?|impressions|sessions|backlink|audit score/i, 'no extra SEO metrics in the visible results');
  const w = spec('wanderlooms-meta-ads');
  assert.match(textOf(w.impact), /Revenue return is not profit/); assert.match(textOf(w.impact), /profitability also depends on product, fulfilment, return and other business costs/);
  for (const s of specs()) {
    assert.strictEqual(s.title.includes('internal') || /image brief|production note|listing card image/i.test(whole(s)), false, `${s.slug}: no internal notes in public copy`);
    assert.doesNotMatch(whole(s), /testimonial|“|"/, `${s.slug}: no quote`);
  }
});

test('the fixture is inert outside development with the flag; existing studies are replaced in place, Wanderlooms is appended', () => {
  const run = (env, list) => withEnv(env, () => load('lib/case-study-local-preview.ts').withLocalPreview(list));
  for (const env of [{ NODE_ENV: 'production', CASE_STUDY_LOCAL_PREVIEW: '1' }, { NODE_ENV: 'test', CASE_STUDY_LOCAL_PREVIEW: '1' }, { NODE_ENV: 'development', CASE_STUDY_LOCAL_PREVIEW: undefined }]) assert.strictEqual(run(env, []).length, 0);
  const sys = (id) => ({ id, publishedVersion: 4, publishedAt: '2026-01-01T00:00:00Z', firstPublishedAt: '2026-01-01T00:00:00Z' });
  const mk = (id, slug, extra = {}) => ({ sys: sys(id), title: `Old ${slug}`, slug, clientName: { clientName: 'Old' }, industry: { name: 'Old' }, ...extra });
  const existing = [mk('A', 'om-sai-developer-meta-ads'), mk('B', 'classpe-social-media-strategy', { listingOrder: 3 }), mk('C', 'insuryo-organic-growth'), mk('D', 'portfolio/seo-ameba-software')];
  const out = run(DEV, existing);
  assert.deepStrictEqual(out.slice(0, 4).map((e) => e.sys.id), ['A', 'B', 'C', 'D'], 'positions and identities kept');
  assert.strictEqual(out[1].listingOrder, 3, 'listing priority kept');
  assert.strictEqual(out[3].slug, 'portfolio/seo-ameba-software', 'the stored slug form is kept');
  assert.match(out[1].title, /Approximately 95 percent/); assert.match(out[3].title, /75\.34 percent/);
  assert.strictEqual(out.filter((e) => /wanderlooms/.test(e.slug)).length, 1, 'no duplicate');
  assert.ok(out.some((e) => e.slug === 'wanderlooms-meta-ads' && e.sys.id.startsWith('local-preview-')));
  // nothing imports the fixture except the preview switch
  const hits = [];
  const walk = (d) => { for (const f of fs.readdirSync(path.join(root, d), { withFileTypes: true })) {
    const rel = path.join(d, f.name);
    if (f.isDirectory()) { if (!['node_modules', '.next', 'docs', 'tests', '.git', 'public'].includes(f.name)) walk(rel); }
    else if (/\.(ts|tsx)$/.test(f.name) && fs.readFileSync(path.join(root, rel), 'utf8').includes('case-study-local-final-four')) hits.push(rel);
  } };
  walk('.');
  assert.deepStrictEqual(hits.sort(), ['lib/case-study-local-preview.ts']);
});

test('release gate: all six copy fields must be the approved final copy; the earlier copy, or a partly updated entry, leaves the three live studies exactly as before and Ameba proof withheld', () => {
  const F = load('lib/case-study-final-four.ts'); const I = load('lib/case-study-images.ts'); const X = load('lib/case-study-presentation.ts'); const proof = load('lib/case-study-proof.ts');
  const R = load('lib/case-study-release.ts'); const P = load('lib/case-study-local-final-four.ts'); const { mapContentfulCaseStudyToCms } = load('lib/contentful/mappers.ts');
  const copyOf = (sp) => ({ title: sp.title, summary: sp.summary, problem: sp.problem, whatWeDid: sp.whatWeDid, impact: sp.impact, evidenceNote: sp.evidenceNote });
  const entries = withEnv(DEV, () => P.applyFinalFour([]));
  for (const spec of P.FINAL_FOUR_SPECS.filter((x) => x.replaces)) {
    const full = copyOf(spec);
    // pinned to the approved final copy, through the code-resident source AND through the real mapper (what the site actually reads)
    assert.strictEqual(R.FINAL_COPY_FINGERPRINTS[spec.slug], R.copyFingerprint(full), `${spec.slug}: pinned`);
    const mapped = mapContentfulCaseStudyToCms(entries.find((e) => e.slug === spec.slug));
    assert.strictEqual(R.hasFinalCopy(spec.slug, R.studyCopy(mapped)), true, `${spec.slug}: the mapped entry opens the gate`);
    assert.strictEqual(R.hasFinalCopy(`portfolio/${spec.slug}`, { ...full, summary: `  ${spec.summary}\n` }), true, 'route and whitespace tolerant');
    // ANY one field left at an earlier value keeps the gate closed
    for (const k of ['title', 'summary', 'evidenceNote']) assert.strictEqual(R.hasFinalCopy(spec.slug, { ...full, [k]: 'The earlier copy.' }), false, `${spec.slug}: ${k} alone`);
    const oldDoc = { nodeType: 'document', content: [{ nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'The earlier copy.' }] }] };
    for (const k of ['problem', 'whatWeDid', 'impact']) assert.strictEqual(R.hasFinalCopy(spec.slug, { ...full, [k]: oldDoc }), false, `${spec.slug}: ${k} alone`);
    assert.strictEqual(R.hasFinalCopy(spec.slug, { ...full, impact: undefined }), false);
    assert.strictEqual(R.hasFinalCopy(spec.slug, undefined), false);
    assert.strictEqual(R.hasFinalCopy('om-sai-developer-meta-ads', full), false, 'only the three named studies');
  }
  for (const slug of ['classpe-social-media-strategy', 'insuryo-organic-growth', 'seo-ameba-software']) {
    const h = `/portfolio/${slug}`;
    assert.strictEqual(I.imageSlotsFor(h).card.kind, 'conceptual', `${slug}: conceptual card until the final copy is published`);
    assert.strictEqual(I.imageSlotsFor(h, undefined, false).feature.kind, 'conceptual');
    assert.deepStrictEqual(X.presentationFor(h), {}, `${slug}: no code-resident copy, dashboard or description until then`);
    assert.strictEqual(I.imageSlotsFor(h, undefined, true).card.kind, 'image'); assert.ok(X.presentationFor(h, true).metaDescription);
  }
  assert.strictEqual(I.imageSlotsFor('/portfolio/wanderlooms-meta-ads').card.kind, 'image', 'Wanderlooms is new and inert without a Contentful entry');
  const spec = P.FINAL_FOUR_SPECS.find((x) => x.slug === 'seo-ameba-software'); const full = copyOf(spec);
  assert.strictEqual(proof.isCaseStudyProofWithheld('seo-ameba-software'), true, 'withheld without the final copy');
  assert.strictEqual(proof.isCaseStudyProofWithheld('seo-ameba-software', { ...full, impact: { nodeType: 'document', content: [] } }), true, 'new summary beside an old impact: still withheld');
  assert.strictEqual(proof.isCaseStudyProofWithheld('seo-ameba-software', full), false, 'released only with all six fields final');
  const saved = process.env.NEXT_PUBLIC_CASE_FINAL_FOUR; process.env.NEXT_PUBLIC_CASE_FINAL_FOUR = '1';
  try { assert.strictEqual(withEnv({ NODE_ENV: 'production', CASE_STUDY_LOCAL_PREVIEW: '1' }, () => proof.isCaseStudyProofWithheld('seo-ameba-software', { ...full, summary: 'The earlier copy.' })), true, 'the old env switch is ignored'); } finally { saved === undefined ? delete process.env.NEXT_PUBLIC_CASE_FINAL_FOUR : (process.env.NEXT_PUBLIC_CASE_FINAL_FOUR = saved); }
  assert.strictEqual(proof.isCaseStudyProofWithheld('seo-for-home-decor-brand', full), true, 'Home Decor stays withheld');
  assert.ok(!/process\.env/.test(fs.readFileSync(path.join(root, 'lib/case-study-release.ts'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')), 'no environment variable in the gate');
  assert.ok(!fs.existsSync(path.join(root, '.env.production')) && !/NEXT_PUBLIC_CASE_FINAL_FOUR/.test(fs.readFileSync(path.join(root, '.env.example'), 'utf8').replace(/^#.*$/gm, '')), 'not set in any committed env file');
});

test('through the real mapper and library: four public studies, correct tags, and the organic ones are not paid-advertising', () => {
  const { selectPublic } = load('lib/case-study-eligibility.ts');
  const { mapContentfulCaseStudyToCms } = load('lib/contentful/mappers.ts');
  const L = load('lib/case-study-library.ts');
  const entries = withEnv(DEV, () => load('lib/case-study-local-preview.ts').withLocalPreview([]));
  const pub = L.orderStudies(selectPublic(entries.map(mapContentfulCaseStudyToCms)), (s) => s.library.listingOrder);
  for (const slug of SLUGS) {
    const s = pub.find((x) => x.slug === slug); assert.ok(s, slug);
    assert.strictEqual(s.layout, 'new', slug); assert.strictEqual(s.library.sector, MAP[slug].sector, slug); assert.strictEqual(s.library.serviceKey, MAP[slug].serviceKey, slug);
  }
  assert.strictEqual(pub.find((s) => s.slug === 'classpe-social-media-strategy').library.period, 'Since Jul 2026');
  assert.strictEqual(pub.find((s) => s.slug === 'insuryo-organic-growth').library.period, 'Since Sep 2025');
  assert.strictEqual(pub.find((s) => s.slug === 'seo-ameba-software').library.period, '');
  assert.strictEqual(pub.find((s) => s.slug === 'wanderlooms-meta-ads').library.period, 'Apr 2026 – Sep 2026');
});

test('images: each case has its own card, hero and 2.6:1 hero; only Ameba Software and Wanderlooms have a dashboard; no conceptual note or caption', () => {
  const F = load('lib/case-study-final-four.ts'); const I = load('lib/case-study-images.ts'); const X = load('lib/case-study-presentation.ts');
  const files = [];
  for (const c of F.FINAL_FOUR) {
    const s = I.imageSlotsFor(c.href, undefined, true);
    assert.strictEqual(s.card.kind, 'image'); assert.strictEqual(s.feature.kind, 'image');
    assert.ok(s.card.src.includes(`/${c.key}-card.webp`) && s.feature.src.includes(`/${c.key}-hero-wide.webp`) && s.feature.narrow.src.includes(`/${c.key}-hero.webp`) && s.feature.ogSrc.includes(`/${c.key}-hero.webp`), c.key);
    assert.strictEqual(s.feature.note, undefined); assert.strictEqual(s.card.note, undefined);
    assert.ok(s.card.alt.length > 60 && s.feature.alt.length > 60);
    assert.strictEqual(s.card.position, '0% 50%'); assert.ok(s.card.whole && s.feature.whole && s.feature.og);
    const x = X.presentationFor(c.href, true);
    assert.strictEqual(Boolean(x.impactMedia), MAP[c.href.split('/').pop()].dashboard, `${c.key}: dashboard only where published`);
    assert.strictEqual(x.close.title, 'Tell us what you are trying to fix');
    files.push([s.card.src, s.card.w, s.card.h], [s.feature.src, s.feature.w, s.feature.h], [s.feature.narrow.src, s.feature.narrow.w, s.feature.narrow.h]);
    if (x.impactMedia) files.push([x.impactMedia.src, x.impactMedia.w, x.impactMedia.h]);
    assert.ok(!/recreated agency (report|dashboard)\s*\.?\s*$/i.test(x.impactMedia?.alt ?? ''), 'alt text describes the image; no caption is shown');
  }
  // the files exist at the declared pixels (WebP header: VP8 / VP8L / VP8X)
  const sizeOf = (f) => { const b = fs.readFileSync(path.join(root, 'public', f)); assert.strictEqual(b.toString('ascii', 0, 4), 'RIFF'); const t = b.toString('ascii', 12, 16);
    if (t === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (t === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    const v = b.readUInt32LE(21); return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]; };
  for (const [f, w, h] of files) assert.deepStrictEqual(sizeOf(f), [w, h], f);
  assert.strictEqual(new Set(files.map((f) => f[0])).size, files.length, 'no file is shared between slots or cases');
  // the owner's correction: nothing for the ClassPe and InsurYo dashboards is in the published asset folder or the code
  for (const k of ['classpe-social-media', 'insuryo-organic-growth']) assert.ok(!fs.existsSync(path.join(root, 'public/images/case-studies', `${k}-dashboard.webp`)), k);
});

test('listing cards: own artwork, own link, no figure in the card copy, service and industry labels as mapped', () => {
  const W = load('components/b2/work-cards.ts'); const F = load('lib/case-study-final-four.ts');
  for (const c of F.FINAL_FOUR) {
    const card = W.toCard({ finalCopy: true, slug: c.href.split('/').pop(), href: c.href, title: 't', client: c.client, detail: '', industry: c.industry, service: c.serviceKey ? c.service : null, stage: null, challenge: 'x', changed: [], outcomes: [], figures: 0, sector: null, serviceKey: c.serviceKey, period: '', search: '' });
    assert.strictEqual(card.href, c.href); assert.ok(card.art.src.includes(`${c.key}-card.webp`));
    assert.doesNotMatch(`${card.eyebrow} ${card.body}`.replace(/B2B|D2C/g, ''), /\d/, `${c.key}: no figure on the card copy`);
    assert.ok(!c.card.eyebrow.includes('Social Media Management') && !c.card.eyebrow.includes('Organic Growth Strategy'), 'no service tag is invented for organic work');
  }
});
