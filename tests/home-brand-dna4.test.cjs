const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const { load } = require('./helpers/ts-loader.cjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
Module._extensions['.css'] = () => {};

/* Brand DNA 4.0 homepage refinements (DEC-118): type minimums, the two featured case studies, the removed buyer-path diagram,
 * meaning-led headline emphasis and punctuation. */

const { ResolveHomeR3 } = load('components/resolve-home-r3/ResolveHomeR3.tsx');
const { HOME_CASES } = load('components/resolve-home-r3/home-cases.ts');
const css = fs.readFileSync('components/resolve-home-r3/resolve-home-r3.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const src = fs.readFileSync('components/resolve-home-r3/ResolveHomeR3.tsx', 'utf8');

const CARDS = [
  { slug: 'google-ads-for-online-courses', href: '/portfolio/google-ads-for-online-courses', client: 'AnybodyCanBake', eyebrow: 'Google Ads · Education',
    art: { src: '/images/resolve-r3/anybodycanbake-listing.webp', alt: 'AnybodyCanBake, Google Ads.', w: 1586, h: 992 }, fig: { v: '1,410', c: 'paid enrolments', period: 'A period', note: '' }, summary: 'S' },
  { slug: 'wanderlooms-meta-ads', href: '/portfolio/wanderlooms-meta-ads', client: 'Wanderlooms', eyebrow: 'Meta Ads · D2C and ecommerce',
    art: { src: '/images/case-studies/wanderlooms.webp', alt: 'Wanderlooms, Meta Ads.', w: 1585, h: 992 }, fig: null, summary: 'An adventure apparel brand.' },
];
const showcase = { id: 'rv3-work-h', aliases: [], eyebrow: 'Featured work', heading: ['', ''], tone: 'light', wrapClass: 'rv3-wrap', cards: CARDS, viewAll: { href: '/work', label: 'View All Case Studies' } };
const html = renderToStaticMarkup(React.createElement(ResolveHomeR3, { showcase }));
const fallback = renderToStaticMarkup(React.createElement(ResolveHomeR3, { showcase: null }));
const section = (h, id) => h.slice(h.indexOf(`aria-labelledby="${id}"`), h.indexOf('</section>', h.indexOf(`aria-labelledby="${id}"`)));

test('labels are at least 12 px and explanatory captions at least 14 px (platform mock-ups excepted)', () => {
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const [sel, body] = [m[1].trim(), m[2]];
    if (/rv3-serp|rv3-feed/.test(sel)) continue;
    for (const r of body.matchAll(/(?:font-size:|font:\s*\d+\s+)\s*([\d.]+)rem/g)) assert.ok(+r[1] >= 0.75, `${sel}: ${r[1]}rem is under 12 px`);
  }
  for (const sel of ['.rv3-hero-fig small', '.rv3-s-cap', '.rv3-w-note', '.rv3 .cl-note']) {
    const rule = css.match(new RegExp(sel.replace(/[.]/g, '\\.') + '\\s*\\{([^}]*)\\}'));
    assert.ok(rule, sel);
    assert.match(rule[1], /font-size: \.875rem/, `${sel} caption at 14 px`);
  }
});

test('featured work: AnybodyCanBake Google Ads and Wanderlooms Meta Ads, each linked to its own page, artwork whole with no chip', () => {
  assert.deepStrictEqual(HOME_CASES.preferred, ['/portfolio/google-ads-for-online-courses', '/portfolio/wanderlooms-meta-ads']);
  assert.equal(HOME_CASES.fillService, undefined, 'no other study fills a gap');
  const work = section(html, 'rv3-work-h');
  assert.ok(work.indexOf('AnybodyCanBake') < work.indexOf('Wanderlooms'));
  assert.match(work, /href="\/portfolio\/google-ads-for-online-courses"[^>]*>Read the Google Ads Case Study/);
  assert.match(work, /href="\/portfolio\/wanderlooms-meta-ads"[^>]*>Read the Meta Ads Case Study/);
  assert.match(work, /href="\/work"[^>]*>View All Case Studies/);
  assert.doesNotMatch(work, /rv3-logo|rv3-w-note|Explore Our Work/, 'no logo chip, conceptual note or /work card link over approved artwork');
  assert.match(work, /class="rv3-w-art"><img[^>]*width="1586" height="992"/, 'intrinsic size, shown whole');
  assert.match(work, /class="rv3-w-fig">1,410</);
  assert.match(work, /An adventure apparel brand\./, 'summary when there is no figure');
  assert.doesNotMatch(work, /A period|[–—]/, 'no separate period line (the definition carries it; the library label uses a dash)');
});

test('featured work fallback: without the library the earlier approved cards show and go to /work', () => {
  const work = section(fallback, 'rv3-work-h');
  assert.match(work, /Wanderlooms/);
  assert.match(work, /Om Sai Developer/);
  assert.doesNotMatch(work, /href="\/portfolio\//);
});

test('the buyer-path diagram is gone; its scope sentence and "tests and reviews" close the journey', () => {
  assert.equal(fs.existsSync('components/resolve-home-r3/PathFlow.tsx'), false);
  assert.doesNotMatch(html + css + src, /rv3-pflow|rv3-legend|rv3-glyph|PathFlow|FlowGlyph|buyer’s path/);
  const journey = section(html, 'rv3-journey-h');
  assert.match(journey, /MappedSkills plans, manages, tests and reviews advertising within the agreed scope\. Your business owns the offer, the website and the follow up\./);
  assert.match(journey, /MappedSkills tests and reviews/);
  assert.equal((html.match(/within the agreed scope/g) || []).length, 1, 'stated once');
  const proc = section(html, 'rv3-proc-h');
  assert.match(proc, /You receive a monthly performance report with ongoing management, and review calls as agreed in your proposal\./);
  assert.match(proc, /href="\/how-it-works"/);
});

test('headline emphasis by meaning, punctuation by sentence', () => {
  assert.match(html, /<h1 id="rv3-h1">More of the right customers\. <em>Not just more traffic\.<\/em><\/h1>/, 'Batch 1 hero');
  assert.match(html, /<h2 id="rv3-journey-h">From a search or a scroll <em>to an enquiry or a sale<\/em><\/h2>/);
  assert.match(html, /<h2 id="rv3-work-h">See the work behind the offer<\/h2>/);
  assert.match(html, /<h2 id="rv3-clients-h">Businesses we’ve worked with<\/h2>/);
  assert.match(html, /<h2 id="rv3-price-h">Know what your <em>proposal includes\.<\/em><\/h2>/);
  assert.doesNotMatch(src, /DESIGN EXPERIMENT|labelled placeholders/);
  assert.doesNotMatch(src + css, /[–—]/);
});

test('the client wall keeps its place: after featured work, before the process', () => {
  const i = (id) => html.indexOf(`aria-labelledby="${id}"`);
  assert.ok(i('rv3-work-h') < i('rv3-clients-h') && i('rv3-clients-h') < i('rv3-proc-h'));
});
