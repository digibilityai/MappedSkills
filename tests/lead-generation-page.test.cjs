// Guards for /lead-generation (owner-approved G1 design, implemented in G2; DEC-057): unchanged H1, title and CTA/link
// destinations; the approved meta description (LG-D19 option A); no long or double dashes; the operating-model boundaries
// (no review, approval, confirmation or filtering by MappedSkills; delivery testing conditional; monthly report but no
// review call; no guarantee or quality claim); and the 2 s once-only journeys that start on step 1.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/lead-generation/page.tsx');
const body = read('components/cplus/lead-generation/LeadGenBody.tsx');
const journeys = read('components/cplus/lead-generation/Journeys.tsx');
const content = read('components/cplus/lead-generation/content.ts');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const copy = code(content);
const all = copy + code(journeys) + code(body);

test('title, canonical path and H1 are unchanged; meta description is the approved option A', () => {
  assert.match(page, /'Lead Generation Where the Unit Is an Enquiry You Can Act On \| MappedSkills'/);
  assert.match(page, /'\/lead-generation'/);
  assert.match(page, /'Lead generation that brings in enquiries worth calling back\. We manage the campaigns; enquiries go directly to your own form, CRM or WhatsApp\.'/);
  assert.match(copy, /a: 'Lead generation, where the unit is', b: 'an enquiry you can actually act on\.'/);
  assert.doesNotMatch(page, /published definition/);
});

test('customer-facing copy has no long dashes or double hyphens', () => {
  assert.doesNotMatch(all, /[—–]|--/);
});

test('MappedSkills does not review, approve, confirm, filter or release client enquiries (copy)', () => {
  assert.doesNotMatch(all, /We review it|Someone on our team|Passed on|Kept aside|Reviewed by us|operator|checked against|matched to|No confirmation|no handover|introducing|verification standard|Yes, that’s my enquiry|criteria agreed|spam or repeat/i);
  assert.doesNotMatch(copy, /confirm|verif|screen|filter|approve the lead|reject|we hold|we receive|handed to us/i);
});

test('no guarantee or quality claims; no review call; no every-route promise', () => {
  assert.doesNotMatch(copy, /guarantee|genuine|qualified|right buyers|right people|real enquiries|every enquiry|all enquiries|review call|calling back/i);
  assert.doesNotMatch(copy, /we test that enquiries reach you/i);
  assert.match(copy, /Where the setup allows, we test that enquiries reach the right destination\./);
  assert.match(copy, /You receive a monthly report on campaign performance\./);
});

test('approved operating wording is present', () => {
  assert.match(copy, /Enquiries from potential customers, sent straight to your team\./);
  assert.match(copy, /We bring potential customers to you\./);
  // DEC-095: the merged "how an enquiry reaches you" section (its heading and intro) is removed; stop 2 carries the destinations.
  assert.match(copy, /Into your own form, CRM or WhatsApp\./);
  assert.match(copy, /We don’t call your enquiries to qualify them\./);
  assert.match(copy, /Your team has the sales conversation\./);
  assert.match(copy, /We build campaigns around them\./);
  assert.match(copy, /You tell us who you want to reach\./);
  assert.match(copy, /a: 'We manage the campaigns\.', b: 'Your team handles the enquiries\.'/);
  for (const s of ['Someone sees your ad', 'They send an enquiry', 'Your team receives it']) assert.ok(copy.includes(`t: '${s}'`), s);
});

test('journeys: 2 s, step 1 shown from the start, played once, no pause or replay control', () => {
  assert.match(journeys, /stepMs: 2000, first: 0/);
  assert.doesNotMatch(code(journeys), /setInterval|Replay|Pause|aria-live/);
});

test('CTA and link destinations', () => {
  assert.match(body, /ActionPair primaryLabel=\{LG\.close\.primary\}/);
  assert.match(copy, /primary: 'Tell us what you’re trying to fix'/);
  for (const h of ['/problems/traffic-but-no-enquiries', '/services', '/seo', '/google-ads', '/how-it-works']) assert.ok(copy.includes(`href: '${h}'`), h);
});

test('what happens next uses only confirmed facts (no time, price or guarantee)', () => {
  const next = /next: \[([\s\S]*?)\n    \],/.exec(copy)[1];
  assert.match(next, /We reply by email or WhatsApp/);
  assert.doesNotMatch(next, /hour|day|£|\$|₹|free|guarantee|within/i);
});

test('six scenes (DEC-095): the merged section and the duplicate steps are gone; the kept statements remain', () => {
  const ids = [...body.matchAll(/aria-labelledby="(lg-[^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(ids, ['lg-h1', 'lg-h-prob', 'lg-h-do', 'lg-h-bd', 'lg-h-qs', 'lg-h-close']);
  assert.doesNotMatch(copy, /reachH|reachIntro|reachLabel|probCap|They tell you what they need|The three steps/);
  assert.match(copy, /We capture a starting point first, so whatever happens next is measurable rather than arguable\./);
  assert.doesNotMatch(code(journeys), /ReachJourney/);
  assert.equal((body.match(/<h1\b/g) || []).length, 1);
});
