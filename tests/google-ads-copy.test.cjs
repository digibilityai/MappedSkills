// Guards for the /google-ads v4 copy module (G0 / G0.1, DEC-053). These check the module's STRUCTURE, not just that strings
// exist somewhere: the service boundary (what sits in the fee and what is agreed separately), the spend/fee separation,
// every approved commitment and qualification, the Path Figure cases, the process, and the claim limits. Copy only: this
// does not test markup, and the module is not imported by the page yet. No framework needed.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/google-ads/page.tsx');

// Typographic apostrophes and quotes are the site's style; the owner's wording is compared ignoring that difference.
const plain = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');

// Load the module as data: strip comments, drop `export const GA_COPY =`, evaluate the object literal.
const source = read('components/cplus/google-ads/copy.ts')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '');
const literal = source.slice(source.indexOf('=', source.indexOf('GA_COPY')) + 1).trim().replace(/;\s*$/, '');
const GA = JSON.parse(JSON.stringify(new Function(`return (${literal});`)()), (k, v) => (typeof v === 'string' ? plain(v) : v));

// Every customer-facing string (any string with a space), for claim-limit checks.
const strings = [];
(function walk(v) {
  if (typeof v === 'string') {
    if (/\s/.test(v)) strings.push(v);
  } else if (Array.isArray(v)) v.forEach(walk);
  else if (v && typeof v === 'object') Object.values(v).forEach(walk);
})(GA);
const prose = strings.join('\n');

test('only the seven approved blocks exist, in the approved order, and no section carries an unapproved kicker', () => {
  const order = ['hero', 'factors', 'path', 'scope', 'answer', 'reporting', 'next'];
  assert.deepStrictEqual(GA.blocks, order);
  assert.deepStrictEqual(Object.keys(GA).sort(), ['blocks', ...order].sort());
  for (const k of order.filter((b) => b !== 'hero')) assert.ok(!('kicker' in GA[k]), `${k} has an unapproved kicker`);
  assert.strictEqual(GA.hero.kicker, 'Google Ads');
});

test('H1 and the supporting copy are the owner-approved wording', () => {
  assert.strictEqual(`${GA.hero.h1.a} ${GA.hero.h1.b}`, 'We run your ads. We look beyond the click.');
  assert.deepStrictEqual(GA.hero.lede, [
    "We manage your Google Ads, including your ads, searches and budget. We also check whether your website makes it easy for people to enquire.",
    "If we find a problem with your website or tracking, we'll explain what needs fixing. Any additional work is agreed with you separately.",
  ]);
});

test('both approved CTAs are present, in the hero and the close', () => {
  for (const b of [GA.hero, GA.next]) {
    assert.strictEqual(b.primary, "Tell us what you're trying to fix");
    assert.strictEqual(b.secondary, 'Book a call');
  }
});

test('service boundary: core service and oversight are in the fee; website, landing-page and tracking work is agreed separately', () => {
  const { core, oversight, separate } = GA.scope;
  assert.deepStrictEqual(core.items, [
    'Set up and manage your Google Ads',
    'Write and improve your ads',
    'Manage your advertising budget',
    'Review search performance and improve your campaigns',
  ]);
  assert.deepStrictEqual(oversight.items, [
    'Review the page people land on',
    'Check whether visitors can make an enquiry',
    'Spot problems with your website, enquiry route or tracking',
    'Explain what we find and recommend improvements',
  ]);
  assert.deepStrictEqual(separate.items, [
    'Creating or changing landing pages',
    'Fixing your website or enquiry forms',
    'Setting up new tracking, or repairing it',
  ]);
  assert.strictEqual(separate.k, 'Agreed separately');
  // None of the separately agreed work may appear in the lists that are covered by the fee.
  for (const item of [...core.items, ...oversight.items]) {
    assert.ok(!/landing pages?\b.*\b(creat|chang)|fix(ing)? your website|enquiry forms?|setting up new tracking|repair/i.test(item), item);
  }
  assert.strictEqual(
    GA.scope.sub,
    "Management and oversight are covered by our management fee. Anything we'd build or fix on your website or tracking is agreed separately."
  );
  assert.strictEqual(
    GA.scope.callout,
    "If we find a problem, we'll explain what needs fixing. Any additional work is agreed with you separately."
  );
});

test('the receipt: spend to Google, a separate fee, what the fee covers, and fixes agreed separately', () => {
  const r = GA.hero.receipt;
  assert.strictEqual(r.topTag, 'Paid to Google');
  assert.strictEqual(r.bottomTag, 'Paid to us, separately');
  assert.strictEqual(r.bottomK, 'What our management fee covers');
  assert.deepStrictEqual(r.bottom, [
    'Choosing which searches your ads show for',
    'Writing and improving your ads',
    'Managing your budget',
    'Checking your website and enquiry route',
  ]);
  for (const line of r.bottom) assert.ok(!/\b(fix|fixes|repair|build|implement)/i.test(line), `a ticked line implies fixing: ${line}`);
  assert.strictEqual(r.separately, 'Fixes to your website or tracking: agreed separately');
  assert.strictEqual(r.tear, 'The click');
});

test('spend is paid to Google and the management fee is separate, with no amounts', () => {
  assert.strictEqual(GA.answer.fee.text, 'Our management fee is separate from your ad spend. What it depends on is on the');
  assert.deepStrictEqual(GA.answer.fee.link, { href: '/pricing', label: 'pricing page' });
  assert.ok(!/[₹$£€]|\blakh|\bcrore/i.test(prose));
});

test('every approved accountability commitment is present, in wording', () => {
  assert.deepStrictEqual(
    GA.answer.items.map((i) => `${i.t} ${i.d}`),
    [
      'Your budget. We manage it, and adjust your campaigns when the results call for it.',
      "A starting point. Before we make significant changes, we record your starting performance, where it's available.",
      'Your website and enquiry route. We review them and recommend improvements. Making the changes is agreed separately.',
      'Clear reasons. We explain significant changes and why we made them.',
      'Straight answers. If results disappoint, we tell you and recommend what to change.',
      'A monthly review. A performance report and a review call every month. We use what they show to decide what to do next.',
    ]
  );
  assert.strictEqual(GA.answer.lede, 'You pay Google for the clicks. You pay us to run the work well. These are ours to get right.');
});

test('one qualification: no promised volume or cost; and no claim that every enquiry can be traced', () => {
  assert.strictEqual(
    GA.answer.qualification,
    'We cannot promise a number of enquiries or what each will cost. Your market, prices, competitors and how quickly you answer all play a part.'
  );
  assert.strictEqual(
    GA.reporting.limit,
    'Not every enquiry can be traced to an ad. A phone call after someone saw your ad is a common example. Where we cannot tell, we say so. We do not claim those enquiries, and we do not hide them.'
  );
  assert.strictEqual(
    GA.path.close,
    'So we look past the report to the enquiries your business receives, as far as your tracking allows. Not every enquiry can be traced to an ad.'
  );
  assert.ok(!/(?<!not )\b(every|all) enquir(y|ies) (is|are|can be|will be) (tracked|traced|attributed)\b/i.test(prose));
  assert.ok(!/we (can|will) (always )?(track|trace|attribute) (every|all)/i.test(prose));
});

test('the Path Figure separates a recorded action from a genuine enquiry, and says who acts in each case', () => {
  const p = GA.path;
  assert.strictEqual(p.lede, "Google Ads reports what it's set up to record. That isn't always the same as a genuine enquiry.");
  assert.strictEqual(p.term, 'Google Ads calls a recorded action a "conversion".');
  assert.strictEqual(p.laneAds.note, 'Only where tracking is set up.');
  assert.strictEqual(p.laneYou.item, 'Whether each recorded action was a genuine enquiry — a real person, reachable, asking about your work.');
  assert.strictEqual(p.steps.length, 5);
  assert.deepStrictEqual(
    p.cases.map((c) => [c.key, c.actor, c.separately]),
    [
      ['intended', '', ''],
      ['searches', 'We manage this.', ''],
      ['page', 'We find and recommend.', 'Changing the page is agreed separately.'],
      ['record', 'We find and recommend.', 'Tracking repairs are agreed separately.'],
    ]
  );
  // The calm state describes the steps and makes no commitment; only the problem cases carry "we".
  assert.ok(!/\bwe\b/i.test(p.cases[0].text));
  assert.ok(/review the searches and change your campaigns/.test(p.cases[1].text));
  assert.ok(/what we'd change/.test(p.cases[2].text));
  assert.ok(/what needs fixing/.test(p.cases[3].text));
});

test('reporting: monthly report and call, the three questions, and findings that lead to decisions, not promises', () => {
  const r = GA.reporting;
  assert.strictEqual(r.lede, 'Each month you get a report and a review call. Where the data allows, it covers:');
  assert.deepStrictEqual(r.questions, [
    'Which campaigns brought enquiries',
    'Which searches brought them',
    'How that compares with the starting point we recorded',
  ]);
  assert.strictEqual(r.pairs.length, 3);
  assert.ok(r.pairs.every((x) => /^We (look|check)/.test(x.do)), 'each decision starts as an investigation');
  assert.ok(r.pairs[2].do.endsWith('Making them is agreed separately.'));
  assert.strictEqual(r.pairsK, 'For example');
});

test('next step: both audiences and the confirmed process, in order, with no free offer or timing', () => {
  const n = GA.next;
  assert.deepStrictEqual(n.steps.map((s) => s.t), ['Get in touch', 'Discovery call', 'Audit', 'Proposal', 'Your approval', 'Work begins']);
  assert.strictEqual(n.steps[0].d, 'You send a message. We reply by email or WhatsApp.');
  assert.strictEqual(n.line, 'You see our findings, a recommended plan and a proposal before any work starts.');
  assert.strictEqual(n.h, 'Already running Google Ads, or thinking about it?');
  assert.ok(n.already.t && n.thinking.t);
});

test('suitability factors are an educational list: six factors, no score and no verdict', () => {
  assert.strictEqual(GA.factors.items.length, 6);
  assert.strictEqual(
    GA.factors.close,
    "There's no score. We talk these through with you before we recommend Google Ads, including when something else may suit you better."
  );
  // The word "score" may appear only in the closing line that says there is none.
  for (const s of strings.filter((x) => /\bscore/i.test(x))) assert.strictEqual(s, GA.factors.close);
  assert.ok(!/\b(suitable for you|you should|you are ready|not suitable|recommended for you|verdict)\b/i.test(prose));
});

test('"conversion" is used exactly once, and explained', () => {
  assert.strictEqual((prose.match(/\bconversions?\b/gi) || []).length, 1);
  assert.ok(GA.path.term.includes('"conversion"'));
});

test('nothing says or implies that we automatically fix, build or include website or tracking work', () => {
  assert.ok(!/\bwe (will |always |automatically )?(fix|build|implement|rebuild|install|set up)\b/i.test(prose));
  assert.ok(!/\b(fixed|built|implemented) (for you|by us)\b/i.test(prose));
  assert.ok(!/\bincluded\b/i.test(prose));
  assert.ok(!/\bat no (extra )?(cost|charge)\b/i.test(prose));
});

test('claim limits: no ROI, figures, guarantees, free offers, response times, call lengths or proof claims', () => {
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
