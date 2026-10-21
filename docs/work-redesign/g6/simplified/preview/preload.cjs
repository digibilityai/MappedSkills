// Simplified-G6 case-study PREVIEW fixtures. Loaded with NODE_OPTIONS=--require <this file> into `next dev`/`next start`.
// Answers only Contentful GraphQL case-study queries, from the invented FIXTURE entries below; every other request
// passes through. No Contentful service is reached and no credential is used: CONTENTFUL_SPACE_ID and
// CONTENTFUL_ACCESS_TOKEN must be the placeholder "fixture". Every text here is labelled FIXTURE; nothing is a real
// client, result, quote or permission. The three legacy entries borrow the real IDs and slugs only to prove the URLs.
const doc = (...paras) => ({ nodeType: 'document', data: {}, content: paras.map((t) => ({ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: t, marks: [], data: {} }] })) });
const h2 = (t) => ({ nodeType: 'heading-2', data: {}, content: [{ nodeType: 'text', value: t, marks: [], data: {} }] });
const p = (t) => ({ nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: t, marks: [], data: {} }] });
const pub = { publishedVersion: 3, publishedAt: '2026-10-01T00:00:00Z', firstPublishedAt: '2026-09-01T00:00:00Z' };
const FX = 'FIXTURE — layout review only, not real content.';

const legacy = (id, slug, title, extra = {}) => ({
  sys: { id, ...pub }, title, slug,
  clientName: { clientName: 'Fixture Client Ltd, a placeholder, Nowhere', date: 'FIXTURE timeline' },
  industry: { name: 'Fixture industry' },
  content: { json: { nodeType: 'document', data: {}, content: [
    h2('Problem Statement'), p(`${FX} Legacy-template problem statement.`),
    h2('Strategy and Tactics'), p(`${FX} Legacy-template strategy text.`),
    h2('Results & Metrics'), p('FIXTURE LEGACY METRIC TEXT — must be withheld on the three legacy URLs.'),
  ] } },
  ...extra,
});
const fresh = (id, slug, title, over = {}) => ({
  sys: { id, ...pub }, title, slug,
  summary: `${FX} Short editor-written summary for ${title}.`,
  problem: { json: doc(`${FX} The problem, written by the editor.`, 'A second paragraph to check spacing on mobile.') },
  whatWeDid: { json: doc(`${FX} What was done, written by the editor.`) },
  impact: { json: doc(`${FX} The impact, exactly as approved. No figure is computed by the site.`) },
  evidenceNote: '', showTestimonial: false, ...over,
});
const review = (quote) => ({ name: 'Fixture Person', testimonial: quote });

const ITEMS = [
  // The three existing URLs. Ameba carries a review + new fields to prove: legacy template stays, testimonial withheld.
  legacy('4DpPjLCWdakD6tBmZNMnko', 'portfolio/seo-ameba-software', 'FIXTURE legacy study A (Ameba URL)', {
    review: review('FIXTURE LEGACY QUOTE — must NOT appear.'), ...fresh('x', 'x', 'x'), sys: { id: '4DpPjLCWdakD6tBmZNMnko', ...pub }, slug: 'portfolio/seo-ameba-software',
    title: 'FIXTURE legacy study A (Ameba URL)',
  }),
  legacy('4zQL4P8SR2xogxHN4qFfUl', 'seo-for-home-decor-brand', 'FIXTURE legacy study B'),
  legacy('6Ycb7aYvXrslOXKchQnqmi', 'google-ads-for-online-courses', 'FIXTURE legacy study C'),
  // New template: full, testimonial approved and enabled, optional links present.
  fresh('fxNewFull000000000001', 'fixture-new-full', 'FIXTURE new study (testimonial enabled)', {
    showTestimonial: true, review: review('FIXTURE APPROVED QUOTE — shown because the flag is ticked.'),
    evidenceNote: `${FX} Evidence note: what the impact text rests on.`,
    clientName: { clientName: 'Fixture Client Ltd, placeholder', date: 'FIXTURE 2026' }, industry: { name: 'Fixture industry' },
    size: { size: 'FIXTURE size' }, audience: { audience: 'FIXTURE audience' }, targetArea: { target: 'FIXTURE area' },
  }),
  // New template: review linked but flag off, no optional links, no evidence note.
  fresh('fxNewBare000000000002', 'fixture-new-bare', 'FIXTURE new study (flag off, no optional links)', {
    review: review('FIXTURE QUOTE — must NOT appear (flag off).'),
  }),
  // Must stay hidden everywhere:
  fresh('fxHidIncomplete00003', 'fixture-incomplete', 'FIXTURE HIDDEN incomplete', { impact: { json: doc('   ') } }),
  fresh('fxHidUnpublished0004', 'fixture-unpublished', 'FIXTURE HIDDEN was published', { sys: { id: 'fxHidUnpublished0004', publishedVersion: null, publishedAt: '2026-09-01T00:00:00Z', firstPublishedAt: '2026-09-01T00:00:00Z' } }),
  fresh('fxHidDraft0000000005', 'fixture-draft', 'FIXTURE HIDDEN draft', { sys: { id: 'fxHidDraft0000000005', publishedVersion: null, publishedAt: null, firstPublishedAt: null } }),
  fresh('fxHidCollideA0000006', 'portfolio/fixture-collision', 'FIXTURE HIDDEN collision A'),
  fresh('fxHidCollideB0000007', 'fixture-collision', 'FIXTURE HIDDEN collision B'),
  fresh('fxHidBadSlug00000008', 'Fixture_Bad_Slug', 'FIXTURE HIDDEN invalid slug'),
];

const realFetch = globalThis.fetch;
globalThis.fetch = async function fixtureFetch(input, init) {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input?.url;
  if (url && url.startsWith('https://graphql.contentful.com/')) {
    let body = init?.body;
    if (!body && input && typeof input === 'object' && 'text' in input) body = await input.text();
    const { query = '' } = JSON.parse(String(body || '{}'));
    const op = (/query\s+(\w+)/.exec(query) || [])[1] || '';
    const data = op === 'GetAllCaseStudies' ? { caseStudiesCollection: { total: ITEMS.length, items: ITEMS } } : {};
    return new Response(JSON.stringify({ data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  return realFetch(input, init);
};
