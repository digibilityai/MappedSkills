// Guards for /problems/traffic-but-no-enquiries (owner-approved G1, implemented in G2; DEC-072): unchanged title,
// description and path; one trail, Home → page, for the visible breadcrumb and the BreadcrumbList (TB-D1); "Request a
// call" to the call state and the primary CTA to /contact (TB-D2); no reveal, no staged motion, 150 ms only (TB-D3); the
// approved copy trims and service tags (TB-D4); a page stylesheet that cannot reach other pages.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/problems/traffic-but-no-enquiries/page.tsx');
const body = read('components/cplus/traffic/TrafficBody.tsx');
const content = read('components/cplus/traffic/content.ts');
const css = read('components/cplus/traffic/traffic.css');
const nav = read('docs/16-ux/07_NAVIGATION_ARCHITECTURE.md');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
const copy = code(content);

test('title, description and path unchanged', () => {
  assert.match(page, /'Traffic but No Enquiries\? 3 Causes to Check \| MappedSkills'/);
  assert.match(page, /'Getting website visitors but few enquiries\? Explore three possible causes, three practical checks, and what to investigate next\.'/);
  assert.match(page, /'\/problems\/traffic-but-no-enquiries'\n\);/);
  assert.match(copy, /h1: \{ a: 'People visit your website\.', b: 'So why don’t they get in touch\?' \}/);
});

test('TB-D1: one trail, Home → page; "Problems" is not a step and no hub is linked', () => {
  const trail = code(page).match(/const TRAIL: CrumbStep\[\] = \[([\s\S]*?)\];/)[1];
  const steps = [...trail.matchAll(/\{ name: '([^']+)', href: '([^']+)' \}/g)].map((m) => [m[1], m[2]]);
  assert.deepStrictEqual(steps, [['Home', '/'], ['Traffic but no enquiries', '/problems/traffic-but-no-enquiries']]);
  assert.doesNotMatch(trail, /Problems|null/);
  assert.match(body, /<Breadcrumb current=\{S\.crumb\} \/>/);
  assert.match(copy, /crumb: 'Traffic but no enquiries'/);
  assert.doesNotMatch(code(body) + copy, /href[=:] ?['"{]?\/problems['"}]/);
  assert.match(nav, /\| `\/problems\/\{slug\}` \| \*\*Yes\*\* \| Home → \*page\* until a problems hub exists/);
});

test('TB-D2: primary CTA to /contact, "Request a call" to /contact?intent=call', () => {
  assert.match(copy, /primary: 'Tell us what you’re trying to fix'/);
  assert.match(copy, /secondary: 'Request a call'/);
  assert.doesNotMatch(copy, /Book a call|\bbook\b/i);
  assert.match(body, /<Link href=\{CONTACT_HREF\} className="dc-btn dc-btn-primary">/);
  assert.match(body, /<Link href=\{BOOKING_HREF\} className="dc-btn dc-btn-secondary">/);
  const prim = read('components/direction-c/primitives.tsx');
  assert.match(prim, /export const CONTACT_HREF = '\/contact';/);
  assert.match(prim, /export const BOOKING_HREF = '\/contact\?intent=call';/);
});

test('TB-D3: no scroll reveal on this page, no staged motion, every duration 150 ms', () => {
  assert.doesNotMatch(code(body), /data-rv|tb-dot|tb-nudge/);
  assert.doesNotMatch(css, /tb-dot|tb-flag|tb-pop|tb-nudge|rv-pre|rv-in|animation-delay/);
  const ms = [...code(css).matchAll(/(\d+)ms/g)].map((m) => Number(m[1]));
  assert.ok(ms.length > 0 && ms.every((n) => n === 150), String(ms));
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\) \{\n  \.tb-fig \{ animation: tb-fade 150ms/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('TB-D4: kicker removed, lede shortened, "What helps" folded into action links with service tags', () => {
  assert.doesNotMatch(copy, /kicker: 'Traffic but no enquiries'|What helps|help:/);
  assert.match(copy, /lede: 'Visitors arrive, look around and leave\. Not everyone should get in touch\. But if the right people don’t, something is stopping them\.'/);
  const links = [...copy.matchAll(/link: \{ href: '([^']+)', label: '([^']+)', service: '([^']+)' \}/g)].map((m) => m.slice(1));
  assert.deepStrictEqual(links, [
    ['/seo', 'Get found by the right people', 'SEO'],
    ['/conversion-optimization', 'Make your page clearer', 'Conversion optimisation'],
    ['/conversion-optimization', 'Make enquiring easier', 'Conversion optimisation'],
  ]);
  for (const p of ['seo', 'conversion-optimization']) assert.ok(fs.existsSync(path.join(__dirname, '..', 'app/(pages)', p, 'page.tsx')), p);
});

test('no guarantee, figure or result claim in the copy', () => {
  assert.doesNotMatch(copy, /guarantee|\d+\s*%|ROI|\bbest\b|more enquiries/i);
});

test('the page stylesheet is scoped to this page', () => {
  const sels = code(css).replace(/@keyframes[^{]+\{(?:[^{}]*\{[^}]*\})*\s*\}/g, '').match(/(^|\})\s*([^{}@]+)\{/g) || [];
  assert.ok(sels.length > 30, String(sels.length));
  for (const s of sels.map((x) => x.replace(/^\}?\s*/, '').replace(/\{$/, '').trim())) {
    for (const part of s.split(',')) assert.match(part, /\.tb-|:has\(\.tb-hero\)/, part);
  }
});
