// Guards for /services (owner-approved G1 design, implemented in G2; DEC-059): unchanged title, description and path;
// the approved H1 (SV-D01); the six service links and nothing sold as a seventh service; no guarantee, lead-quality claim
// or figure; the kitchen fitter labelled as illustrative; no long or double dashes; the 1.5 s once-only journey on the
// shared sequencer; 150 ms micro-interactions; contact primary and booking secondary in the hero and the close (SV-D06);
// the unchanged analytics page type; a page stylesheet that cannot reach other pages.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/services/page.tsx');
const body = read('components/cplus/services/ServicesBody.tsx');
const inter = read('components/cplus/services/Interactive.tsx');
const content = read('components/cplus/services/content.ts');
const css = read('components/cplus/services/services.css');
const analytics = read('lib/analytics.ts');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const copy = code(content);

// SUPERSEDED 26 October 2026 (DEC-078, owner-approved /services Content R2): the route now renders the paid-advertising page,
// so the old title, description and H1 assertions moved to tests/paid-advertising-services.test.cjs. This test keeps the
// parts that still apply: the path is unchanged and the legacy C+ components stay in the repository for history.
test('route path unchanged; the superseded C+ Services components are retained (SV-D01 history)', () => {
  assert.match(page, /'\/services'/);
  assert.doesNotMatch(page, /ServicesBody/);
  assert.match(copy, /h1: \['Get found\.', 'Get enquiries\.', 'See what’s working\.'\]/);
  assert.match(body, /<h1 id="sv-h1"/);
});

test('the six services link to their existing pages; measurement is not a seventh service', () => {
  const hrefs = [...copy.matchAll(/\{ href: '([^']+)', name: '/g)].map((m) => m[1]);
  assert.deepStrictEqual(hrefs, ['/seo', '/google-ads', '/social-media-ads', '/ai-seo', '/conversion-optimization', '/lead-generation']);
  assert.match(copy, /Part of every service, not sold separately\./);
  for (const p of ['seo', 'google-ads', 'social-media-ads', 'ai-seo', 'conversion-optimization', 'lead-generation']) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'app/(pages)', p, 'page.tsx')), p);
  }
});

test('no guarantee, lead-quality claim, figure or review-call promise', () => {
  assert.doesNotMatch(copy, /guarantee|qualified|genuine|right enquiries|more enquiries|review call|ROI|%|\bbest\b/i);
  assert.doesNotMatch(copy.replace('It usually takes 12 months or more.', ''), /\b\d+\s*(days?|weeks?|months?|hours?)\b/i);
  assert.match(copy, /where tracking allows/);
});

test('the kitchen fitter is labelled as illustrative and not a real client', () => {
  assert.match(copy, /tag: 'Illustrative example'/);
  assert.match(copy, /note: 'Not a real client\. No real figures\.'/);
});

test('customer-facing copy has no long dashes or double hyphens', () => {
  assert.doesNotMatch(copy + code(body) + code(inter).replace(/'--[a-z-]+'/g, ''), /[—–]|--/);
});

test('journey: shared sequencer, 1.5 s, step 1 from the start, once, no pause or replay; micro-interactions 150 ms', () => {
  assert.match(inter, /stepMs: 1500, first: 0/);
  assert.match(inter, /from '\.\.\/ai-seo\/Sequence'/);
  assert.doesNotMatch(code(inter), /setInterval|Replay|Pause|aria-live|dataLayer|data-track|gtag/);
  assert.doesNotMatch(css, /transition:[^;]*\b(?:0?\.2s|200ms|\.25s|\.3s)\b[^;]*;/);
  assert.match(css, /150ms/);
});

test('selector highlights without hiding; links are server-rendered', () => {
  assert.match(inter, /aria-pressed=\{pick === o\.key\}/);
  assert.match(inter, /setPick\(pick === o\.key \? null : o\.key\)/);
  assert.doesNotMatch(css, /\.is-pick[^{]*\{[^}]*(display:\s*none|visibility:\s*hidden|opacity:\s*0)/);
  assert.doesNotMatch(inter, /cards[^\n]*hidden=/);
});

test('CTAs: contact primary and booking secondary in hero and close; page type unchanged', () => {
  assert.strictEqual((body.match(/<ActionPair primaryLabel=\{SV\.primary\} \/>/g) || []).length, 2);
  assert.match(copy, /primary: 'Tell us what you’re trying to fix'/);
  assert.match(analytics, /'\/services',/);
});

test('every stylesheet rule is scoped to an sx- class', () => {
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').match(/[^{}]+\{/g) || [];
  for (const r of rules) {
    const sel = r.slice(0, -1).trim();
    if (sel.startsWith('@') || /^(from|to|\d+%)$/.test(sel)) continue;
    for (const part of sel.split(',')) assert.match(part, /\.sx-/, part.trim());
  }
});
