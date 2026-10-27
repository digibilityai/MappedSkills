// Guards for /faq (owner-approved G1 design, implemented in G2; DEC-063): unchanged title, description and path; the
// approved H1 and lede (FQ-D5); every live question and group anchor kept; the FQ-D3 answer verbatim; the FQ-D7
// qualifications; no review-call, booking or self-test figures left over; FAQPage built from the rendered data; contact
// primary and /schedule-call secondary ("Request a call", FQ-D4); 150 ms feedback; a page stylesheet that cannot reach
// other pages.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/faq/page.tsx');
const body = read('components/cplus/faq/FaqBody.tsx');
const data = read('components/cplus/faq/faqData.ts');
const content = read('components/cplus/faq/content.ts');
const css = read('components/cplus/faq/faq.css');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const copy = code(data) + code(content);

test('title, description and path unchanged; approved H1 and lede', () => {
  assert.match(page, /'Questions We Get Asked, Answered Plainly \| MappedSkills'/);
  assert.match(page, /'Including the ones with answers that lose us work: what we are accountable for, why we will not guarantee results, what we cannot tell you about where an enquiry came from, and what counts as a qualified enquiry\.'/);
  assert.match(page, /'\/faq'/);
  assert.match(copy, /h1: \{ a: 'Before we work together,', b: 'you should know\.' \}/);
  assert.match(copy, /lede: 'How we work, what it costs, what to expect—and what we won’t promise\.'/);
  assert.match(body, /<h1 id="faq-h1"/);
});

test('every live anchor survives', () => {
  const live = [
    'g-commercial', 'g-outcome', 'g-measurement', 'g-fit', 'g-ai-search',
    'q-what-does-this-cost-and-what-changes-that-number', 'q-what-is-the-minimum-commitment',
    'q-what-are-you-accountable-for-and-what-will-you-not-promise', 'q-why-wont-you-guarantee-results',
    'q-how-long-before-anything-changes', 'q-how-do-you-know-an-enquiry-came-from-your-work-and-what-cant-you-tell',
    'q-what-counts-as-a-qualified-enquiry-here-and-who-decides', 'q-what-access-do-you-need-and-what-do-we-keep',
    'q-who-is-this-for-and-who-is-it-not-for', 'q-can-you-get-our-business-into-chatgpt-and-ai-answers',
    'q-is-geo-or-aeo-a-separate-discipline-from-seo',
  ];
  for (const id of live) assert.ok(copy.includes(`'${id}'`), id);
  // B2 adds four questions (which first, readiness, campaigns already running, ad creative): 14 live ids + 4.
  for (const id of ['q-which-first', 'q-is-my-business-ready', 'q-campaigns-we-already-run', 'q-who-creates-the-ad-creative']) assert.ok(copy.includes(`'${id}'`), id);
  assert.equal([...copy.matchAll(/\bid: 'q-/g)].length, 18);
});

test('FQ-D3 verbatim and FQ-D7 qualifications', () => {
  assert.ok(copy.includes('It depends on the work.'));
  assert.ok(copy.includes('Some projects have a defined scope and finish line; ongoing services need enough time to measure progress and make improvements. We’ll explain the proposed duration and terms before you commit.'));
  assert.ok(copy.includes('Where you share usable sales data and tracking allows, we can report through to revenue'));
  assert.ok(!/\bweeks\b|\bdays\b/.test(copy), 'no weeks/days promises');
  assert.ok(copy.includes('doesn’t automatically extend to every third-party tool or agency asset'));
});

test('no outdated or contradictory claims', () => {
  // review calls appear only as "when agreed"
  assert.equal((copy.match(/review call/gi) || []).length, 2);
  assert.match(copy, /Review calls happen when we agree them in your proposal, not automatically every month\./);
  assert.match(copy, /calls: \{ t: 'Review calls', tag: 'When agreed' \}/);
  // no booking, no mandatory discovery call, no self-test figures, no retired /lead-generation link
  for (const bad of [/Book a call/, /\bbook/i, /Discovery call/i, /\b28\b/, /Pune/, /published definition/i]) assert.ok(!bad.test(copy), String(bad));
});

test('FAQPage is built from the rendered data', () => {
  assert.match(page, /mainEntity: QAS\.map/);
  assert.match(page, /name: qa\.q/);
  assert.match(page, /text: plainAnswer\(qa\)/);
  assert.match(data, /\[qa\.direct, \.\.\.\(qa\.rows \?\? \[\]\)/);
  assert.match(body, /<details id=\{qa\.id\} className="faq-d">/);
});

test('contact primary, /schedule-call secondary labelled Request a call', () => {
  assert.match(body, /<ActionPair primaryLabel=\{c\.primary\} secondaryLabel=\{c\.secondary\} \/>/);
  assert.match(copy, /secondary: 'Request a call'/);
});

test('150 ms feedback and reduced motion', () => {
  const durations = [...css.matchAll(/(\d+)ms/g)].map((m) => Number(m[1]));
  assert.ok(durations.length > 5 && durations.every((d) => d === 150), String(durations));
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('every stylesheet rule is scoped to a faq- class', () => {
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').match(/[^{}]+\{/g) || [];
  for (const r of rules) {
    const sel = r.slice(0, -1).trim();
    if (sel.startsWith('@') || /^(from|to|\d+%)$/.test(sel)) continue;
    for (const part of sel.split(',')) assert.match(part, /\.faq-/, part.trim());
  }
});
