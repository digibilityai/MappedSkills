// Guards for /conversion-optimization (owner-approved G1 design, implemented in G2; DEC-055): unchanged H1 and metadata,
// no long or double dashes, the owner's revised claims (no routine A/B testing, no absolute "every enquiry was lost"),
// the 2 s once-only sequences that start on step 1, and unchanged CTA and link destinations.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/conversion-optimization/page.tsx');
const body = read('components/cplus/conversion-optimization/ConversionBody.tsx');
const journeys = read('components/cplus/conversion-optimization/Journeys.tsx');
const content = read('components/cplus/conversion-optimization/content.ts');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const copy = code(content);

test('metadata and H1 are unchanged', () => {
  assert.match(page, /'Conversion Rate Optimization: Find Where Visits Are Lost \| MappedSkills'/);
  assert.match(page, /changing the page is the wrong intervention\.'/);
  assert.match(page, /'\/conversion-optimization'/);
  assert.match(copy, /a: 'Plenty of visitors, not enough enquiries\?', b: 'We find out why\.'/);
});

test('customer-facing copy has no long dashes or double hyphens', () => {
  assert.doesNotMatch(copy, /[—–]|--/);
  assert.doesNotMatch(code(journeys) + code(body), /[—–]/);
});

test('revised claims: no routine A/B testing, no absolute loss claim', () => {
  const all = copy + code(journeys) + code(body);
  assert.doesNotMatch(all, /A\/B|two versions|side by side|Every enquiry was lost|luck can look/i);
  assert.match(copy, /We make improvements\./);
  assert.match(copy, /Then we measure what changes\./);
  assert.match(copy, /We check how visitors respond after the changes and compare the results with what was happening before\./);
  assert.match(copy, /a: 'Our own enquiry form', b: 'wasn’t working\.'/);
  assert.match(copy, /That’s why one of our first checks is simple: send a test enquiry and see if it arrives\./);
  assert.match(copy, /We make the agreed changes, with your input where needed\./);
});

test('verdict replaces the toggle', () => {
  assert.match(journeys, /It can help with <b>2<\/b> and <b>3<\/b>\. It won’t fix <b>1<\/b> or <b>4<\/b>\./);
  assert.doesNotMatch(body + journeys + copy, /PressToggle|Show what a website redesign can fix|The last one is the hardest/);
});

test('sequences: 2 s, step 1 shown from the start, played once, no replay control', () => {
  assert.match(journeys, /stepMs: 2000, first: 0/);
  assert.doesNotMatch(code(journeys), /setInterval|Replay|Pause/);
});

test('CTA and link destinations are unchanged', () => {
  assert.match(body, /ActionPair primaryLabel=\{HOME\.hero\.primary\}/);
  assert.match(copy, /Tell us what you’re trying to fix/);
  assert.match(copy, /href: '\/problems\/traffic-but-no-enquiries'/);
  assert.match(copy, /href: '\/how-it-works'/);
});

test('what happens next uses only confirmed facts (no time, price or guarantee)', () => {
  const next = /next: \[([\s\S]*?)\]/.exec(copy)[1];
  assert.match(next, /We reply by email or WhatsApp\./);
  assert.doesNotMatch(next, /hour|day|£|\$|₹|free|guarantee|within/i);
});
