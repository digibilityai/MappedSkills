// Guards for /work (owner-approved G1 R3, implemented in G2): unchanged title, description and path; one trail,
// Home → Case studies, for the visible breadcrumb and the BreadcrumbList (WK-D5); the approved copy; studies from
// Contentful with no fixed count, no hard-coded client facts and no withheld proof; no filter; "Check us" removed;
// the close to /contact and /contact?intent=call; no reveal, 150 ms only; a page stylesheet that cannot reach other pages.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/work/page.tsx');
const body = read('components/cplus/work/WorkBody.tsx');
const content = read('components/cplus/work/content.ts');
const studies = read('components/cplus/work/studies.ts');
const css = read('components/cplus/work/work.css');
const nav = read('docs/16-ux/07_NAVIGATION_ARCHITECTURE.md');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
const copy = code(content);
const all = code(page) + code(body) + copy + code(studies);

test('title, description, path and revalidate unchanged', () => {
  assert.match(page, /'Work \| MappedSkills',\n\s+'Explore selected MappedSkills client projects, marketing challenges and approaches\.',\n\s+'\/work'/);
  assert.match(page, /export const revalidate = 60;/);
  assert.doesNotMatch(page, /noindex/);
});

test('WK-D5: one trail, Home → Case studies, for the breadcrumb and the BreadcrumbList', () => {
  const trail = code(page).match(/const TRAIL: CrumbStep\[\] = \[([\s\S]*?)\];/)[1];
  const steps = [...trail.matchAll(/\{ name: '([^']+)', href: '([^']+)' \}/g)].map((m) => [m[1], m[2]]);
  assert.deepStrictEqual(steps, [['Home', '/'], ['Case studies', '/work']]);
  assert.match(page, /routeTrailJsonLd\(TRAIL\)/);
  assert.match(body, /<Breadcrumb current=\{S\.crumb\} \/>/);
  assert.match(copy, /crumb: 'Case studies'/);
  assert.match(nav, /\| `\/work` \| \*\*Yes\*\* \| Home → Case studies/);
});

test('approved R3 copy and the G2 close', () => {
  assert.match(copy, /h1: \{ a: 'Real work\.', b: 'Judge it for yourself\.' \}/);
  assert.match(copy, /lede: 'Explore the challenges businesses brought to us, what we changed, and how we approached the work\.'/);
  assert.match(copy, /h: 'Real challenges\. Real work\.'/);
  assert.match(copy, /intro: 'See what businesses needed help with, how we approached the problem, and what we changed\.'/);
  assert.match(copy, /h: 'Good work deserves honest evidence\.'/);
  assert.match(copy, /h: 'Tell us what you’re trying to fix\.'/);
  assert.match(copy, /body: 'Tell us what you’re working towards\. We’ll help you figure out where to start\.'/);
  assert.match(copy, /primary: 'Contact us'/);
  assert.match(copy, /secondary: 'Request a call'/);
  assert.match(body, /<Link href=\{CONTACT_HREF\} className="dc-btn dc-btn-primary">/);
  assert.match(body, /<Link href=\{BOOKING_HREF\} className="dc-btn dc-btn-secondary">/);
});

test('removed: the hero index, the filter, "Check us" and the old statements', () => {
  assert.doesNotMatch(all, /On this page|wk-index|wk-filter|aria-pressed|Filter by|Check us|wk-check|\/ai-seo|\/how-it-works|traffic-but-no-enquiries/);
  assert.doesNotMatch(all, /What we can show you|Permission, not results|no published case studies|Book a call/i);
});

test('studies come from Contentful: no fixed count, no hard-coded client facts', () => {
  assert.match(page, /splitStudies\(await fetchContentfulCaseStudies\(\), FEATURED_SLUG\)/);
  assert.doesNotMatch(all, /Ameba Software|AnybodyCanBake|Home decor|Chandigarh|Bangalore|Pune|\b(two|three|four|five|six) (projects|case studies|studies)\b/i);
  assert.doesNotMatch(all, /placeholder/i);
});

test('withheld proof cannot reach the page (DEC-031)', () => {
  assert.doesNotMatch(code(studies), /resultsMetrics|beforeAfter|highlightResult|review|businessGoals|summary|conclusion/);
  assert.match(code(studies), /study\.sections\.problemStatement/);
  assert.doesNotMatch(copy, /\d+\s*%|₹|ROI|testimonial|guarantee|★/i);
});

test('no reveal on this page, every duration 150 ms, reduced motion handled', () => {
  assert.doesNotMatch(code(body), /data-rv/);
  const ms = [...code(css).matchAll(/(\d+)ms/g)].map((m) => Number(m[1]));
  assert.ok(ms.length > 0 && ms.every((n) => n === 150), String(ms));
  assert.doesNotMatch(css, /animation|@keyframes/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('the page stylesheet is scoped to this page', () => {
  const sels = code(css).match(/(^|\}|\{)\s*([^{}@]+)\{/g) || [];
  assert.ok(sels.length > 40, String(sels.length));
  for (const s of sels.map((x) => x.replace(/^[}{]?\s*/, '').replace(/\{$/, '').trim())) {
    for (const part of s.split(',')) assert.match(part, /\.wk-|:has\(\.wk-hero\)/, part);
  }
});

test('listing previews carry no year or date', () => {
  assert.doesNotMatch(code(studies), /\byear\b|clientDate/);
  assert.doesNotMatch(code(body), /\.year\b|\bdate\b/i);
});
