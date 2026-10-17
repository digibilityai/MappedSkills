// Guards for /how-it-works (owner-approved G1 R2 design, implemented in G2; DEC-058): the approved HW-D08 title and
// description; unchanged H1 and path; the exact HW-D01 reporting sentence; no qualified-enquiry ledger (HW-D02) and no
// "what we do not know" block (HW-D06); no guarantee, timeline or metric; no long or double dashes; the limits section
// that other pages link to; the 1.5 s once-only sequences that start on step 1; the CTA and link destinations; the
// unchanged analytics page type.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/how-it-works/page.tsx');
const body = read('components/cplus/how-it-works/MethodBody.tsx');
const journeys = read('components/cplus/how-it-works/Journeys.tsx');
const sort = read('components/cplus/how-it-works/PrioritySort.tsx');
const content = read('components/cplus/how-it-works/content.ts');
const analytics = read('lib/analytics.ts');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const copy = code(content);
const all = copy + code(journeys) + code(body) + code(sort);

test('approved title and description (HW-D08); path and H1 unchanged', () => {
  assert.match(page, /'How It Works: From First Call to Monthly Review \| MappedSkills'/);
  assert.match(page, /'How working with MappedSkills runs: a discovery call, an audit, a plan you approve, then the work and a monthly report\. Including what tracking can’t show\.'/);
  assert.match(page, /'\/how-it-works'/);
  assert.match(copy, /h1: \{ a: 'No mystery about', b: 'what happens next\.' \}/);
  assert.doesNotMatch(page, /What We Cannot Tell You|Written to be checked/);
});

test('customer-facing copy has no long dashes or double hyphens', () => {
  assert.doesNotMatch(all.replace(/'--[a-z-]+'/g, ''), /[—–]|--/); // CSS custom property names are code, not copy
});

test('HW-D01: the exact reporting sentence, and no other review-call wording', () => {
  assert.ok(copy.includes("t: 'A monthly performance report, and a review call where your service includes one.'"));
  assert.strictEqual((copy.match(/review call/gi) || []).length, 1);
});

test('HW-D02 and HW-D06: no qualified-enquiry ledger, accountability line or "what we do not know" block', () => {
  assert.doesNotMatch(copy, /qualified|accountable|Accountable up to here|six points|What we do not know|keyword tool|analytics only began|12-month|one round/i);
  assert.doesNotMatch(copy, /we review|we qualify|we check every|entered by a person/i);
});

test('no guarantee, timeline or metric is promised', () => {
  assert.doesNotMatch(copy.replace("q: 'Can you guarantee more enquiries or sales?'", ''), /guarantee/i);
  assert.match(copy, /a: 'No\. We can’t control your prices, your sales team or your market\./);
  assert.doesNotMatch(copy, /\b\d+\s*(days?|weeks?|months?|hours?)\b|within \d|%|response time|free audit/i);
});

test('the limits section that other pages link to is present and visible (not a disclosure)', () => {
  assert.match(copy, /h: 'What the numbers can’t always show'/);
  assert.match(body, /id="hw-h-gaps"/);
  assert.doesNotMatch(body.split('hw-h-gaps')[1].split('hw-h-qs')[0], /<details/);
});

test('sequences: 1.5 s, step 1 shown from the start, played once, no pause or replay control', () => {
  assert.match(journeys, /stepMs: 1500, first: 0/);
  assert.match(journeys, /from '\.\.\/ai-seo\/Sequence'/);
  assert.doesNotMatch(code(journeys), /setInterval|Replay|Pause|aria-live/);
});

test('CTA and link destinations; analytics page type unchanged', () => {
  assert.match(body, /ActionPair primaryLabel=\{HOW\.primary\}/);
  assert.match(copy, /primary: 'Tell us what you’re trying to fix'/);
  for (const href of ['/services', '/pricing', '/faq']) assert.ok(copy.includes(`href: '${href}'`), href);
  assert.match(analytics, /if \(path === '\/how-it-works'\) return 'methodology';/);
});
