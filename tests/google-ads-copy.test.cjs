// Guards for the /google-ads copy module, revision 2 (DEC-053 and the owner-approved R2 proposal). These check the module's
// STRUCTURE, not just that strings exist somewhere: the service boundary (what sits in the fee and what is agreed
// separately), the spend/fee separation, every accountability commitment, the qualifications, which journey ending carries
// which "agreed separately" marker, the process, no score, and the claim limits. Copy only: this does not test markup.
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
const heading = (h) => `${h.a} ${h.b}`;

test('the eight approved sections exist, in order; no section carries an unapproved kicker', () => {
  const order = ['hero', 'factors', 'path', 'scope', 'answer', 'reporting', 'process', 'close'];
  assert.deepStrictEqual(GA.blocks, order);
  assert.deepStrictEqual(Object.keys(GA).sort(), ['blocks', ...order].sort());
  let kickers = 0;
  (function walk(v) {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { if (k === 'kicker') kickers++; walk(x); }
  })(GA);
  assert.strictEqual(kickers, 1);
  assert.strictEqual(GA.hero.kicker, 'Google Ads');
});

test('H1, the hero paragraph and every heading are the approved wording (two-colour split, joined text unchanged)', () => {
  assert.strictEqual(heading(GA.hero.h1), 'We run your ads. We look beyond the click.');
  assert.strictEqual(
    GA.hero.lede,
    "We manage your Google Ads: your ads, searches and budget. We also check that your website makes it easy to enquire. If we find a problem with your website or tracking, we'll explain it. Fixing it is agreed separately."
  );
  assert.deepStrictEqual(
    [GA.factors.h, GA.path.h, GA.scope.h, GA.answer.h, GA.reporting.h, GA.process.h, GA.close.h].map(heading),
    [
      'What we look at before suggesting Google Ads.',
      'From your budget to an enquiry — and where it can go wrong.',
      'What the work covers.',
      'What we answer for.',
      'What you learn each month, and what we do with it.',
      'What happens after you get in touch.',
      'Already running Google Ads, or thinking about it?',
    ]
  );
});

test('both approved CTAs are present, in the hero and the close', () => {
  for (const b of [GA.hero, GA.close]) {
    assert.strictEqual(b.primary, "Tell us what you're trying to fix");
    assert.strictEqual(b.secondary, 'Book a call');
  }
});

test('service boundary: core service and oversight are in the fee; website, landing-page and tracking work is agreed separately', () => {
  const { core, oversight, separate } = GA.scope;
  assert.deepStrictEqual(core.items.map((i) => i.full), [
    'Set up and manage your Google Ads',
    'Write and improve your ads',
    'Manage your advertising budget',
    'Review search performance and improve your campaigns',
  ]);
  assert.deepStrictEqual(oversight.items.map((i) => i.full), [
    'Review the page people land on',
    'Check whether visitors can make an enquiry',
    'Spot problems with your website, enquiry route or tracking',
    'Explain what we find and recommend improvements',
  ]);
  assert.deepStrictEqual(separate.items.map((i) => i.full), [
    'Creating or changing landing pages',
    'Fixing your website or enquiry forms',
    'Setting up new tracking, or repairing it',
  ]);
  assert.deepStrictEqual(separate.items.map((i) => i.chip), ['Landing pages', 'Website and form fixes', 'New or repaired tracking']);
  assert.strictEqual(separate.k, 'Agreed separately');
  assert.strictEqual(GA.scope.frame, 'Covered by our management fee');
  // None of the separately agreed work may appear in the lists that are covered by the fee (full text or chip).
  for (const item of [...core.items, ...oversight.items]) {
    for (const s of [item.full, item.chip]) {
      assert.ok(!/landing pages?\b.*\b(creat|chang)|fix(ing)? your website|enquiry forms?|setting up new tracking|repair|new or repaired/i.test(s), s);
    }
  }
  assert.strictEqual(
    GA.scope.sub,
    "Management and oversight are covered by our management fee. Anything we'd build or fix on your website or tracking is agreed separately."
  );
  assert.ok(!('callout' in GA.scope), 'the callout duplicates the hero and was removed (decision E)');
});

test('the receipt: spend to Google, a separate fee, what the fee covers, fixes agreed separately, and the four stages', () => {
  const r = GA.hero.receipt;
  assert.strictEqual(r.topTag, 'Paid to Google');
  assert.strictEqual(r.bottomTag, 'Paid to us, separately');
  assert.strictEqual(r.bottomK, 'What our management fee covers');
  assert.deepStrictEqual(r.top, ['Someone searches for what you sell', 'Your ad appears', 'They click it']);
  assert.deepStrictEqual(r.bottom, [
    'Choosing which searches your ads show for',
    'Writing and improving your ads',
    'Managing your budget',
    'Checking your website and enquiry route',
  ]);
  for (const line of r.bottom) assert.ok(!/\b(fix|fixes|repair|build|implement)/i.test(line), `a ticked line implies fixing: ${line}`);
  assert.strictEqual(r.separately, 'Fixes to your website or tracking: agreed separately');
  assert.strictEqual(r.tear, 'The click');
  assert.deepStrictEqual(GA.hero.stages.map((s) => s.label), ['Search', 'Click', 'Visit', 'Enquiry']);
  assert.deepStrictEqual(GA.path.stations.map((s) => s.label), ['Search', 'Click', 'Visit', 'Enquiry']);
});

test('spend is paid to Google and the management fee is separate, with no amounts', () => {
  assert.strictEqual(GA.answer.fee.text, 'Our management fee is separate from your ad spend. What it depends on is on the');
  assert.deepStrictEqual(GA.answer.fee.link, { href: '/pricing', label: 'pricing page' });
  assert.ok(!/[₹$£€]|\blakh|\bcrore/i.test(prose));
});

test('every approved accountability commitment is present, in wording, under the four pledges', () => {
  assert.strictEqual(GA.answer.lede, 'These are ours to get right.');
  assert.deepStrictEqual(
    GA.answer.pledges.map((p) => [p.t, ...p.lines]),
    [
      [
        'Your budget',
        'We manage it, and adjust your campaigns when the results call for it.',
        "Before we make significant changes, we record your starting performance, where it's available.",
      ],
      [
        'Clear reasons',
        'We explain significant changes and why we made them.',
        'We review your website and enquiry route and recommend improvements. Making the changes is agreed separately.',
      ],
      ['Honest reporting', 'A performance report and a review call every month. We use what they show to decide what to do next.'],
      ['Corrective action', 'If results disappoint, we tell you and recommend what to change.'],
    ]
  );
});

test('one qualification: no promised volume or cost; no claim that every enquiry can be traced', () => {
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
    'So we look past the report to the enquiries your business receives, as far as your tracking allows.'
  );
  assert.ok(!/(?<!not )\b(every|all) enquir(y|ies) (is|are|can be|will be) (tracked|traced|attributed)\b/i.test(prose));
  assert.ok(!/we (can|will) (always )?(track|trace|attribute) (every|all)/i.test(prose));
});

test('the journey: one search, four endings; recorded action versus genuine enquiry; who acts; where the fix is agreed separately', () => {
  const p = GA.path;
  assert.strictEqual(p.lede, "Google Ads reports what it's set up to record. That isn't always the same as a genuine enquiry.");
  assert.strictEqual(p.term, 'Google Ads calls a recorded action a "conversion".');
  assert.strictEqual(p.laneAds.note, 'Only where tracking is set up.');
  assert.deepStrictEqual(p.laneAds.items, ['Ad shown', 'Click', 'A recorded action, such as a form being sent or a button pressed']);
  assert.strictEqual(p.laneYou.item, 'Whether it was a genuine enquiry — a real person, reachable, asking about your work.');
  assert.deepStrictEqual(p.laneYou.status, { yes: 'A genuine enquiry', no: 'No genuine enquiry', not: 'Not a genuine enquiry' });
  assert.deepStrictEqual(
    p.cases.map((c) => [c.key, c.tab, c.stop, c.recorded, c.genuine, c.actor, c.separately]),
    [
      ['intended', 'A genuine enquiry', 3, true, 'yes', '', ''],
      ['searches', 'The wrong person clicks', 1, false, 'no', 'We manage this.', ''],
      ['page', "The page doesn't answer", 2, false, 'no', 'We find and recommend.', 'Changing the page is agreed separately.'],
      ['record', "A recorded action that isn't an enquiry", 3, true, 'not', 'We find and recommend.', 'Tracking repairs are agreed separately.'],
    ]
  );
  // The calm state describes the steps and makes no commitment; only the problem endings carry "we".
  assert.ok(!/\bwe\b/i.test(p.cases[0].text));
  assert.ok(/review the searches and change your campaigns/.test(p.cases[1].text));
  assert.ok(/what we'd change/.test(p.cases[2].text));
  assert.ok(/what needs fixing/.test(p.cases[3].text));
});

test('reporting: monthly report and call, three questions as the report, findings that lead to decisions, source unknown', () => {
  const r = GA.reporting;
  assert.strictEqual(r.lede, 'Each month you get a report and a review call.');
  assert.strictEqual(r.report.note, 'Where the data allows');
  assert.deepStrictEqual(r.report.sections, [
    'Which campaigns brought enquiries',
    'Which searches brought them',
    'How that compares with the starting point we recorded',
  ]);
  assert.strictEqual(r.report.illus, 'Illustrative layout. No real figures.');
  // The first finding is the one shown on load (decision D1, option B): the investigation, not the assumption.
  assert.deepStrictEqual(r.findings.map((x) => x.find), [
    'Some searches bring clicks but few enquiries',
    'Some searches bring enquiries',
    'A page gets visits but no enquiries',
  ]);
  assert.ok(r.findings.every((x) => /^We (look|check)/.test(x.do)), 'each decision starts as an investigation');
  assert.ok(r.findings[2].do.endsWith('Making them is agreed separately.'));
  assert.strictEqual(r.unknown, 'Source unknown');
  assert.strictEqual(r.findingsK, 'For example');
});

test('process: both audiences and the confirmed process, in order, with no free offer or timing', () => {
  const pr = GA.process;
  assert.deepStrictEqual(pr.steps.map((s) => s.t), ['Get in touch', 'Discovery call', 'Audit', 'Proposal', 'Your approval', 'Work begins']);
  assert.strictEqual(pr.steps[0].d, 'You send a message. We reply by email or WhatsApp.');
  assert.strictEqual(pr.line, 'You see our findings, a recommended plan and a proposal before any work starts.');
  assert.strictEqual(GA.close.already.k, 'Already advertising?');
  assert.strictEqual(GA.close.thinking.k, 'Thinking about it?');
  assert.strictEqual(GA.close.already.t, "Tell us what you spend and what you're getting.");
  assert.strictEqual(GA.close.thinking.t, 'Tell us what you sell and what a new customer is worth.');
});

test('suitability factors: six, in three groups of two, an educational framework with no score and no verdict', () => {
  const f = GA.factors;
  assert.strictEqual(f.items.length, 6);
  assert.deepStrictEqual(f.items.map((i) => [i.group, i.label]), [
    ['The market', 'Search demand'],
    ['The market', 'Other routes'],
    ['Your business', 'Customer value'],
    ['Your business', 'Your response'],
    ['Your website', 'Enquiry route'],
    ['Your website', 'Tracking'],
  ]);
  assert.deepStrictEqual(f.items.map((i) => i.q), [
    'Are people already searching for what you sell?',
    'What else could reach the same people?',
    'What is a new customer worth to you?',
    'Can your business answer enquiries when they arrive?',
    'Can people easily enquire on your website?',
    'Can your enquiries be tracked?',
  ]);
  assert.ok(f.items[5].a.includes('How far it can go depends on your website and how people contact you.'));
  assert.deepStrictEqual(f.items[1].links.map((l) => l.href), ['/seo', '/social-media-ads']);
  assert.strictEqual(f.close, 'No score. We talk these through with you first, and tell you when something else may suit you better.');
  // The word "score" may appear only in the closing line that says there is none.
  for (const s of strings.filter((x) => /\bscore/i.test(x))) assert.strictEqual(s, f.close);
  assert.ok(!/\b(suitable for you|you should|you are ready|not suitable|recommended for you|verdict)\b/i.test(prose));
});

test('every icon named in the copy exists in the icon set (a missing name silently draws the fallback)', () => {
  const icons = new Set([...read('components/cplus/Icons.tsx').matchAll(/^\s{2}([a-z]+):\s*'/gm)].map((m) => m[1]));
  const used = [];
  (function walk(v) {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { if (k === 'icon') used.push(x); walk(x); }
  })(GA);
  assert.ok(used.length > 20);
  for (const i of used) assert.ok(icons.has(i), `unknown icon: ${i}`);
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

// ---- G1.1 guards: the 12 px text floor and the chips' accessible text (markup and CSS, read as source)
const css = read('components/cplus/google-ads/google-ads.css').replace(/\/\*[\s\S]*?\*\//g, '');
const body = read('components/cplus/google-ads/GoogleAdsBody.tsx');

test('no text in google-ads.css is set below 12px (the programme rule for rendered figure text)', () => {
  const toPx = (v, unit) => (unit === 'rem' || unit === 'em' ? parseFloat(v) * 16 : parseFloat(v));
  const sizes = [];
  // `font-size: <n><unit>` and the size in a `font:` shorthand (`font: 700 .75rem/1.3 ...`); a clamp() is judged on its first argument.
  for (const m of css.matchAll(/font-size:\s*(?:min\(|clamp\()?\s*(-?[\d.]+)(rem|em|px)/g)) sizes.push([m[0], toPx(m[1], m[2])]);
  for (const m of css.matchAll(/font:\s*(?:[a-z]+\s+)?\d{3}\s+(?:clamp\(|min\()?\s*(-?[\d.]+)(rem|em|px)/g)) sizes.push([m[0], toPx(m[1], m[2])]);
  assert.ok(sizes.length >= 14, 'the size declarations were found');
  for (const [decl, px] of sizes) assert.ok(px >= 12, `${decl} is ${px}px`);
});

test('each scope chip gives assistive technology its full approved sentence, once, and hides the short label from it', () => {
  assert.ok(/<span aria-hidden="true">\{it\.chip\}<\/span>\s*<span className="px-sr">\{it\.full\}<\/span>/.test(body));
  assert.ok(!/title=\{it\.full\}/.test(body), 'a title tooltip would repeat the sentence');
});
