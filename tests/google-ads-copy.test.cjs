// Guards for the /google-ads v4 copy module (G0, DEC-053): owner-approved wording, the service boundary and the claim
// limits. Copy only: this does not test markup, and the module is not imported by the page yet. No framework needed.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const source = read('components/cplus/google-ads/copy.ts');
const copy = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const page = read('app/(pages)/google-ads/page.tsx');

// Typographic apostrophes and quotes are the site's style; the owner's wording is compared ignoring that difference.
const plain = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
const text = plain(copy);

// Every string literal in the module, for checks on customer-facing words only (keys and structure are excluded).
const strings = [...copy.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)].map((m) => plain(m[1] ?? m[2]));
const prose = strings.filter((s) => /\s/.test(s)).join('\n');

test('H1 and the supporting copy are the owner-approved wording', () => {
  assert.ok(text.includes("h1: { a: 'We run your ads.', b: 'We look beyond the click.' }"));
  assert.ok(
    text.includes(
      "'We manage your Google Ads, including your ads, searches and budget. We also check whether your website makes it easy for people to enquire.'"
    )
  );
  assert.ok(
    text.includes(
      "'If we find a problem with your website or tracking, we'll explain what needs fixing. Any additional work is agreed with you separately.'"
    )
  );
  assert.ok(text.includes("kicker: 'Google Ads'"));
});

test('both approved CTAs are present, in the hero and the close', () => {
  assert.strictEqual((text.match(/primary: 'Tell us what you're trying to fix'/g) || []).length, 2);
  assert.strictEqual((text.match(/secondary: 'Book a call'/g) || []).length, 2);
});

test('the page keeps seven blocks in the approved order', () => {
  assert.ok(text.includes("blocks: ['hero', 'factors', 'path', 'scope', 'answer', 'reporting', 'next']"));
});

test('the service boundary: management and oversight in the fee, implementation agreed separately', () => {
  assert.ok(text.includes('What our management fee covers'));
  assert.ok(text.includes("separately: 'Fixes to your website or tracking: agreed separately'"));
  assert.ok(text.includes('Management and oversight are covered by our management fee.'));
  assert.ok(text.includes('is agreed separately.'));
  for (const item of [
    'Creating or changing landing pages',
    'Fixing your website or enquiry forms',
    'Setting up new tracking, or repairing it',
  ]) {
    assert.ok(text.includes(item), item);
  }
  // Where a page or tracking problem is found, the copy says the change is agreed separately.
  assert.ok(text.includes('Changing the page is agreed separately.'));
  assert.ok(text.includes('Tracking repairs are agreed separately.'));
  assert.ok(text.includes('Making the changes is agreed separately.'));
  assert.ok(text.includes('Making them is agreed separately.'));
});

test('nothing says or implies that we automatically fix or build what we find', () => {
  assert.ok(!/\bwe (will |always |automatically )?(fix|build|implement|rebuild|install)\b/i.test(prose));
  assert.ok(!/\b(fixed|built|implemented) (for you|by us)\b/i.test(prose));
  assert.ok(!/\bincluded in (the |our )?(fee|price)\b/i.test(prose) || /Management and oversight are covered/.test(prose));
});

test('"conversion" is used exactly once, and explained', () => {
  const hits = prose.match(/\bconversions?\b/gi) || [];
  assert.strictEqual(hits.length, 1);
  assert.ok(text.includes('Google Ads calls a recorded action a "conversion".'));
});

test('the Path Figure separates a recorded action from a genuine enquiry', () => {
  assert.ok(text.includes("Google Ads reports what it's set up to record. That isn't always the same as a genuine enquiry."));
  assert.ok(text.includes('Only where tracking is set up.'));
  assert.ok(text.includes('Whether each recorded action was a genuine enquiry'));
  assert.strictEqual((text.match(/key: '/g) || []).length, 4);
});

test('qualifications: no promised volume or cost, no claim that every enquiry can be traced', () => {
  assert.ok(text.includes('We cannot promise a number of enquiries or what each will cost.'));
  assert.ok(text.includes('Not every enquiry can be traced to an ad.'));
  assert.ok(text.includes('as far as your tracking allows'));
  // (?<!not ) lets the approved qualification "Not every enquiry can be traced" through, and catches the positive claim.
  assert.ok(!/(?<!not )\b(every|all) enquir(y|ies) (is|are|can be|will be) (tracked|traced|attributed)\b/i.test(prose));
});

test('monthly report and review call, a recorded starting point and the process', () => {
  assert.ok(text.includes('A performance report and a review call every month.'));
  assert.ok(text.includes("we record your starting performance, where it's available"));
  assert.ok(text.includes('You see our findings, a recommended plan and a proposal before any work starts.'));
  for (const step of ['Get in touch', 'Discovery call', 'Audit', 'Proposal', 'Your approval', 'Work begins']) {
    assert.ok(text.includes(`t: '${step}'`), step);
  }
  assert.ok(text.includes('We reply by email or WhatsApp.'));
});

test('claim limits: no ROI, figures, guarantees, free offers, response times or call lengths', () => {
  assert.ok(!/\bROI\b|return on|\bROAS\b|\bCPC\b|\bCPL\b/i.test(prose));
  assert.ok(!/\bguarantee/i.test(prose));
  assert.ok(!/\bfree\b/i.test(prose));
  assert.ok(!/\d/.test(prose), 'the customer-facing copy contains no digits');
  assert.ok(!/response time|within (a |an |one |two |\w+ )?(hour|day|minute)s?|minutes? (long|call)|call length/i.test(prose));
  assert.ok(!/case stud|testimonial|results? we (got|delivered)|clients? (saw|achieved)/i.test(prose));
});

test('no jargon the owner asked to remove', () => {
  assert.ok(!/match types?|negative keywords?|budget pacing|extensions?\b|impression share|quality score/i.test(prose));
});

test('the page metadata is untouched by this stage', () => {
  assert.ok(page.includes("'Google Ads Measured on the Enquiries, Not the Clicks | MappedSkills'"));
  assert.ok(
    page.includes(
      "'Account structure, search terms, ad copy, bidding and budget — plus the page the click lands on, whether the enquiry completes, and whether you can see where it came from.'"
    )
  );
  assert.ok(page.includes("'/google-ads'"));
  assert.ok(page.includes('<BreadcrumbJsonLd label="Paid search" path="/google-ads" />'));
});
