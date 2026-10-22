// Guards for /research (owner-approved G1 R1 design, implemented in G2): title, description, canonical path, revalidation
// and structured data unchanged; research facts only from the existing Contentful getters; the report shown once; the
// figure drawn only from the published statistic and sample size; the lead section in reading order; the owner's close
// to /contact and the call request; the media enquiry kept; 150 ms feedback and a stylesheet that cannot reach other pages.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('./helpers/ts-loader.cjs');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/research/page.tsx');
const body = read('components/cplus/research/ResearchBody.tsx');
const content = read('components/cplus/research/content.ts');
const css = read('components/cplus/research/research.css');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

test('metadata, path and revalidation unchanged; no structured data added', () => {
  assert.match(page, /'MappedSkills Research',\n\s*'Original MappedSkills research on how businesses are found, measured, and converted — published with method, limits, and the data behind each finding\.',\n\s*'\/research'/);
  assert.match(page, /export const revalidate = 60;/);
  assert.ok(!/application\/ld\+json|routeTrailJsonLd/.test(code(page) + code(body)), 'no JSON-LD added');
});

test('research facts come only from the existing Contentful getters', () => {
  for (const g of ['getFeaturedResearchCards', 'getResearchListCards', 'getResearchCategories', 'getLatestResearchFindings', 'getResearchReportBySlug'])
    assert.ok(page.includes(g), g);
  assert.match(page, /report\?\.keyFindings\.length \? report\.keyFindings : feed/);
  // no statistic, sample or count is written into the page code or copy
  for (const src of [code(body), code(content), code(page)]) assert.ok(!/\d+(\.\d+)?%|\bn=\d|\b(120|51|69|67)\b/.test(src.replace(/\d+(\.\d+)?(px|rem|em|ch|ms|vw)\b/g, '')), 'no hard-coded research figure');
});

test('the figure is drawn only when the statistic and sample reconcile', () => {
  const { sampleField } = load('components/cplus/research/sample.ts');
  assert.deepEqual(sampleField('42.5%', 120), { total: 120, marked: 51, rest: 69, cols: 12 });
  assert.equal(sampleField('66.7% vs 6.7%', 120), null, 'paired statistic');
  assert.equal(sampleField('42.4%', 120), null, 'not a whole number of websites');
  assert.equal(sampleField('42.5%', undefined), null, 'no sample size');
  assert.equal(sampleField('50%', 125), null, 'sample does not split into ten rows');
  assert.equal(sampleField('0%', 120), null);
  assert.equal(sampleField('100%', 120), null);
});

test('lead section: head, figure, body in DOM order; notes only beside their own headline', () => {
  const i = (s) => body.indexOf(s);
  assert.ok(i('className="rs-lead-head"') < i('<figure className="rs-fig"') && i('<figure className="rs-fig"') < i('className="rs-lead-body"'));
  assert.ok(!/display:\s*contents|\border\s*:/.test(css.replace(/border[\w-]*\s*:/g, '')), 'no visual reordering');
  assert.match(body, /LEAD_NOTES\[lead\.headline\]/);
  assert.match(css, /grid-template-areas: "head fig" "body fig"/);
});

test('the report is shown once; lists only when more than one exists', () => {
  assert.match(page, /latest\.filter\(\(r\) => r\.slug !== card\?\.slug\)/);
  assert.match(body, /\{others\.length \? \(/);
  assert.match(body, /\{categories\.length > 1 \? \(/);
  assert.equal((body.match(/className="rs-card"/g) || []).length, 1);
  assert.match(body, /#methodology/);
  assert.match(body, /#limitations/);
});

test('approved H1 and the owner close; media enquiry kept and secondary', () => {
  const c = code(content);
  assert.ok(c.includes("h1: { a: 'We look at real business websites.', b: 'Then we publish what we find.' }"));
  assert.ok(c.includes("h: 'Not sure what your marketing is actually measuring?'"));
  assert.ok(c.includes("body: 'We can help you understand what’s visible, what’s missing and what to look at next.'"));
  assert.ok(c.includes("primary: 'Talk to MappedSkills'"));
  assert.ok(c.includes("secondary: 'Request a call'"));
  assert.match(body, /href=\{CONTACT_HREF\} className="dc-btn dc-btn-primary"/);
  assert.match(body, /href=\{BOOKING_HREF\} className="dc-btn dc-btn-secondary"/);
  assert.ok(c.includes("subject: 'Media enquiry: MappedSkills Research'"));
  assert.ok(c.includes("body: 'For media enquiries, embargoed materials, or comment, email'"));
  assert.equal((body.match(/<h1\b/g) || []).length, 1);
  for (const bad of [/Book a call/i, /guarantee(d|s)?\b(?! *\.)/i, /Discovery/i]) assert.ok(!bad.test(c.replace('never restated as guarantees', '')), String(bad));
});

test('150 ms feedback, reduced motion, and rules scoped to this page', () => {
  assert.match(css, /150ms/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /prefers-reduced-motion: no-preference\) \{ \.rs-fig \{ animation: rs-fade 150ms/);
  assert.ok(!/data-rv|data-count/.test(code(body)), 'no reveal or count-up');
  for (const sel of code(css).split('}').map((r) => r.split('{')[0].trim()).filter((s) => s && !s.startsWith('@') && !/^(from|to)$/.test(s)))
    for (const part of sel.split(',')) assert.ok(/\.rs-/.test(part), `unscoped selector: ${part.trim()}`);
});
