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
  assert.strictEqual(`${GA.hero.h1.a} ${GA.hero.h1.b}`, 'We run your ads. We look beyond the click.');
  assert.strictEqual(
    GA.hero.lede,
    "We manage your Google Ads: your ads, searches and budget. We also check that your website makes it easy to enquire. If we find a problem with your website or tracking, we'll explain it. Fixing it is agreed separately."
  );
  assert.deepStrictEqual(
    [GA.factors.h, GA.path.h, GA.scope.h, GA.answer.h, GA.reporting.h, GA.process.h, GA.close.h].map(heading),
    [
      'What we look at before suggesting Google Ads.',
      'From ad spend to enquiries. Where does it break?',
      'What the work covers.',
      'What we answer for.',
      'Clear reports. Clearer decisions.',
      'What happens after you get in touch.',
      'Already running Google Ads, or thinking about it?',
    ]
  );
});

test('both approved CTAs are present, in the hero and the close, and the old primary label is gone', () => {
  for (const b of [GA.hero, GA.close]) {
    assert.strictEqual(b.primary, 'Tell us about your Google Ads');
    assert.strictEqual(b.secondary, 'Book a call');
  }
  assert.ok(!/trying to fix/i.test(prose.replace(/Fixes to your website[^\n]*/g, '')), 'the old primary CTA wording must not remain in the copy');
});

test('service boundary: three responsibilities; the first two are in the fee, the third is agreed separately; details hold the exact lists', () => {
  const S2 = GA.scope;
  assert.deepStrictEqual(S2.nodes.map((n) => [n.key, n.t, n.d, n.tag]), [
    ['run', 'Run the ads', 'Core Google Ads management', 'Included in the management fee'],
    ['beyond', 'Look beyond the click', 'Website, enquiry-route and tracking oversight', 'Included in the management fee'],
    ['separate', 'Agree additional fixes separately', 'Landing-page creation, website and form repairs, and tracking implementation', 'Agreed separately'],
  ]);
  assert.deepStrictEqual(S2.core.items, [
    'Set up and manage your Google Ads',
    'Write and improve your ads',
    'Manage your advertising budget',
    'Review search performance and improve your campaigns',
  ]);
  assert.deepStrictEqual(S2.oversight.items, [
    'Review the page people land on',
    'Check whether visitors can make an enquiry',
    'Spot problems with your website, enquiry route or tracking',
    'Explain what we find and recommend improvements',
  ]);
  assert.deepStrictEqual(S2.separate.items, ['Creating or changing landing pages', 'Fixing your website or enquiry forms', 'Setting up new tracking, or repairing it']);
  assert.strictEqual(S2.separate.k, 'Agreed separately');
  assert.strictEqual(S2.frame, 'Covered by our management fee');
  assert.strictEqual(S2.detailsSummary, 'See what’s included'.replace(/[‘’]/g, "'"));
  for (const item of [...S2.core.items, ...S2.oversight.items, ...S2.nodes.slice(0, 2).map((n) => n.d)]) {
    assert.ok(!/landing pages?\b.*\b(creat|chang)|fix(ing)? your website|enquiry forms?|setting up new tracking|repair|implementation/i.test(item), item);
  }
  assert.strictEqual(
    S2.sub,
    "Management and oversight are covered by our management fee. Anything we'd build or fix on your website or tracking is agreed separately."
  );
  assert.ok(!('callout' in S2) && !('chips' in S2));
});

test('the commercial labels are always visible: the responsibilities render outside the collapsible details; only the lists collapse', () => {
  const chain = body.indexOf('className="ga-chain"');
  const tag = body.indexOf('ga-node-tag');
  const details = body.indexOf('<details className="ga-det">');
  assert.ok(chain > -1 && tag > chain && details > tag, 'the node tags come before, and outside, the details element');
  const inside = body.slice(details, body.indexOf('</details>'));
  assert.ok(!inside.includes('ga-node-tag') && !inside.includes('C.nodes'), 'no node or tag inside the details');
  assert.ok(inside.includes('C.core.items') && inside.includes('C.oversight.items') && inside.includes('C.separate.items'));
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
  assert.deepStrictEqual(GA.path.stations.map((s) => s.label), ['Search', 'Click', 'Visit', 'Outcome']);
});

test('spend is paid to Google and the management fee is separate; the fee line and pricing link live in the scope section, with no amounts', () => {
  assert.strictEqual(
    GA.scope.fee.text,
    'Your ad spend is paid directly to Google. Our management fee is separate. What it depends on is on the'
  );
  assert.deepStrictEqual(GA.scope.fee.link, { href: '/pricing', label: 'pricing page' });
  assert.ok(!('fee' in GA.answer), 'the accountability section no longer carries the fee line');
  assert.ok(!/\/pricing/.test(JSON.stringify(GA.answer)));
  assert.ok(!/[₹$£€]|\blakh|\bcrore/i.test(prose));
});

test('the four accountability pledges and the closing line (which keeps the approved qualification) are exact', () => {
  assert.strictEqual(GA.answer.lede, 'These are ours to get right.');
  assert.deepStrictEqual(
    GA.answer.pledges.map((p) => [p.t, p.line]),
    [
      ['Your budget', 'We review spending and adjust campaigns when performance calls for it.'],
      ['Clear reasons', 'We explain significant changes and why we make them.'],
      ['Honest reporting', 'A monthly performance report and review call.'],
      ['Corrective action', "When results disappoint, we discuss what isn't working and recommend improvements."],
    ]
  );
  assert.strictEqual(
    GA.answer.closing,
    'We explain our decisions, discuss poor results and recommend what to change. We cannot promise a number of enquiries or what each will cost.'
  );
  assert.ok(!/\bmonitor/i.test(prose), '"monitor" implies oversight we have not confirmed');
  assert.ok(!/clear next steps/i.test(prose), '"clear next steps" is a commitment the owner removed');
});

test('qualifications: no promised volume or cost; no claim that every enquiry can be traced', () => {
  assert.ok(GA.answer.closing.endsWith('We cannot promise a number of enquiries or what each will cost.'));
  assert.strictEqual(GA.reporting.limit, 'Not every enquiry can be traced to an ad. Where we cannot tell, we say so.');
  assert.ok(!/(?<!not )\b(every|all) enquir(y|ies) (is|are|can be|will be) (tracked|traced|attributed)\b/i.test(prose));
  assert.ok(!/we (can|will) (always )?(track|trace|attribute) (every|all)/i.test(prose));
  assert.ok(!/results we can control|we don't promise results/i.test(prose));
});

test('the journey: four outcomes of one search; only the first reaches a genuine enquiry; who acts; where the fix is agreed separately', () => {
  const p = GA.path;
  assert.strictEqual(p.lede, "A click isn't a customer. We look at what happens after someone clicks your ad — and where potential enquiries are lost.");
  assert.strictEqual(p.term, 'Google Ads calls a recorded action a "conversion".');
  assert.strictEqual(p.laneAds.label, 'What Google Ads can record');
  assert.strictEqual(p.laneAds.note, 'Only where tracking is set up.');
  assert.deepStrictEqual(p.laneAds.items, ['Ad shown', 'Click', 'A recorded action, such as a form being sent or a button pressed']);
  assert.strictEqual(p.laneYou.label, 'What your business needs to know');
  assert.strictEqual(p.laneYou.item, 'Whether it was a genuine enquiry — a real person, reachable, asking about your work.');
  assert.deepStrictEqual(p.laneYou.status, { yes: 'A genuine enquiry', no: 'No genuine enquiry', not: 'Not a genuine enquiry' });
  assert.ok(!('close' in p), 'the old closing line was removed (decision C)');
  assert.deepStrictEqual(
    p.cases.map((c) => [c.key, c.tab, c.stop, c.recorded, c.genuine, c.actor, c.separately]),
    [
      ['intended', 'Genuine enquiry', 3, true, 'yes', '', ''],
      ['searches', 'Unsuitable click', 1, false, 'no', 'We manage this.', ''],
      ['page', 'Website problem', 2, false, 'no', 'We find and recommend.', 'Changing the page is agreed separately.'],
      ['record', 'Recorded action that is not a genuine enquiry', 3, true, 'not', 'We find and recommend.', 'Tracking repairs are agreed separately.'],
    ]
  );
  assert.strictEqual(p.cases.filter((c) => c.genuine === 'yes').length, 1, 'only one outcome reaches a genuine enquiry');
  assert.ok(!/\bwe\b/i.test(p.cases[0].text));
  assert.ok(/review the searches and change your campaigns/.test(p.cases[1].text));
  assert.ok(/what we'd change/.test(p.cases[2].text));
  assert.ok(/what needs fixing/.test(p.cases[3].text));
});

test('reporting: the monthly report and review call, the starting point, three findings that lead to actions, the attribution limit', () => {
  const r = GA.reporting;
  assert.strictEqual(
    r.lede,
    'Every month you get a performance report and a review call. We review your Google Ads performance with you and explain what needs attention.'
  );
  assert.strictEqual(
    r.covers,
    "Where the data allows, it covers campaigns, searches and how performance compares with the starting point we recorded."
  );
  assert.strictEqual(r.baseline, "Before we make significant changes, we record your starting performance, where it's available.");
  assert.deepStrictEqual(r.findings.map((x) => [x.key, x.find, x.do, x.separately]), [
    ['noenq', 'Clicks, but few enquiries', "Review the searches and adjust or exclude those that aren't relevant.", ''],
    ['works', 'Searches bringing enquiries', "Review what's working and consider where to focus the budget.", ''],
    ['page', 'Visits, but no enquiries', 'Check the landing-page experience and recommend improvements.', 'Making the changes is agreed separately.'],
  ]);
  assert.strictEqual(r.findings[0].key, 'noenq', 'the first finding is the one shown on load');
  assert.deepStrictEqual(r.link, { href: '/how-it-works', label: "How we measure, including what can't be traced" });
  assert.strictEqual(r.related.links.length, 3);
  assert.ok(!('report' in r) && !('unknown' in r), 'the mock report and its "Source unknown" row were removed (decision B)');
});

test('process: the confirmed six steps, in order, with no free offer or timing (unchanged)', () => {
  const pr = GA.process;
  assert.deepStrictEqual(pr.steps.map((s) => s.t), ['Get in touch', 'Discovery call', 'Audit', 'Proposal', 'Your approval', 'Work begins']);
  assert.strictEqual(pr.steps[0].d, 'You send a message. We reply by email or WhatsApp.');
  assert.strictEqual(pr.line, 'You see our findings, a recommended plan and a proposal before any work starts.');
});

test('the close: one invitation and both actions; the two old prompts are gone', () => {
  assert.strictEqual(GA.close.body, "Let's discuss what your business needs and whether Google Ads is the right fit.");
  assert.ok(!('already' in GA.close) && !('thinking' in GA.close));
});

test('suitability factors: six, in three groups of two, an educational framework with no score and no verdict (unchanged)', () => {
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
  // "included" may appear only in the two approved phrases: the fee tag on the two responsibilities that are in the fee, and the disclosure's summary.
  assert.ok(!/\bincluded\b/i.test(prose.replace(/Included in the management fee/g, '').replace(/See what's included/g, '')));
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

// ---- CSS and markup guards: the 12px text floor and the 3:1 boundary rule (read as source)
const css = read('components/cplus/google-ads/google-ads.css').replace(/\/\*[\s\S]*?\*\//g, '');
const body = read('components/cplus/google-ads/GoogleAdsBody.tsx');

test('no text in google-ads.css is set below 12px (the programme rule for rendered figure text)', () => {
  const toPx = (v, unit) => (unit === 'rem' || unit === 'em' ? parseFloat(v) * 16 : parseFloat(v));
  const sizes = [];
  for (const m of css.matchAll(/font-size:\s*(?:min\(|clamp\()?\s*(-?[\d.]+)(rem|em|px)/g)) sizes.push([m[0], toPx(m[1], m[2])]);
  for (const m of css.matchAll(/font:\s*(?:[a-z]+\s+)?\d{3}\s+(?:clamp\(|min\()?\s*(-?[\d.]+)(rem|em|px)/g)) sizes.push([m[0], toPx(m[1], m[2])]);
  assert.ok(sizes.length >= 14, 'the size declarations were found');
  for (const [decl, px] of sizes) assert.ok(px >= 12, `${decl} is ${px}px`);
});

test('no tab or selector row in google-ads.css draws its border with the decorative --dc-line token', () => {
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));
  const tabRules = rules.filter((r) => /\.px-tab\b/.test(r.sel));
  assert.ok(tabRules.length >= 8, 'the tab rules were found');
  for (const r of tabRules) {
    assert.ok(!/border[a-z-]*\s*:[^;]*var\(--dc-line\)/.test(r.body), `${r.sel} uses --dc-line for a border`);
  }
  // The unselected finding row must use the control token (3.47:1 on the ground it sits on).
  const row = rules.find((r) => /^\.ga-find \.px-tab$/.test(r.sel));
  assert.ok(row && /border:\s*2px solid var\(--dc-control\)/.test(row.body));
});
