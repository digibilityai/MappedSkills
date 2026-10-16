/**
 * C+ Google Ads (/google-ads) — the customer-facing copy, revision 2 (docs/google-ads-redesign/
 * GOOGLE_ADS_G1_VISUAL_REDESIGN_PROPOSAL_R2.md, owner-approved decisions A to J; owner decisions OD-01 to OD-11 and the
 * F-2 service boundary, recorded as DEC-053).
 *
 * Rules this copy follows (guarded by tests/google-ads-copy.test.cjs):
 *   - management and oversight are covered by the management fee; website, landing-page and tracking implementation is
 *     agreed separately, and nothing here says or implies that a problem we identify is fixed automatically;
 *   - ad spend is paid directly to Google and the management fee is separate; no amounts and no fee schedule;
 *   - no ROI, figures, guarantees, case studies, testimonials, free offers, response times or call lengths;
 *   - the word "conversion" is used exactly once, and explained (OD-11); elsewhere the copy says "recorded action";
 *   - the title, description, canonical and structured data are not part of this module (they stay in page.tsx);
 *   - no section kickers: none are approved. The hero kicker is the only one.
 *
 * Headings are stored as { a, b }: `a` is set in the plain colour and `b` in orange (the C+ two-colour heading). Joined
 * with a space, `a` and `b` are the heading text.
 */

export const GA_COPY = {
  /** Page order (decision A): the seven approved blocks, with the old block 7 split into a process section and the close. */
  blocks: ['hero', 'factors', 'path', 'scope', 'answer', 'reporting', 'process', 'close'],

  /* 1 — hero: one paragraph, and the One Click receipt that follows one search */
  hero: {
    crumb: 'Paid search',
    kicker: 'Google Ads',
    h1: { a: 'We run your ads.', b: 'We look beyond the click.' },
    lede: 'We manage your Google Ads: your ads, searches and budget. We also check that your website makes it easy to enquire. If we find a problem with your website or tracking, we’ll explain it. Fixing it is agreed separately.',
    primary: 'Tell us what you’re trying to fix',
    secondary: 'Book a call',

    /* the receipt: ticked lines are part of the service; the dashed footer is agreed separately */
    receipt: {
      title: 'One click',
      topK: 'Where your money goes',
      topTag: 'Paid to Google',
      top: ['Someone searches for what you sell', 'Your ad appears', 'They click it'],
      tear: 'The click',
      bottomK: 'What our management fee covers',
      bottomTag: 'Paid to us, separately',
      bottom: [
        'Choosing which searches your ads show for',
        'Writing and improving your ads',
        'Managing your budget',
        'Checking your website and enquiry route',
      ],
      separately: 'Fixes to your website or tracking: agreed separately',
      cap: 'Illustration. No amounts.',
    },
    /* the stage selector that lights the receipt line by line */
    stagesLabel: 'Follow one search',
    stages: [
      { key: 'search', label: 'Search', icon: 'search' },
      { key: 'click', label: 'Click', icon: 'cursor' },
      { key: 'visit', label: 'Visit', icon: 'page' },
      { key: 'enquiry', label: 'Enquiry', icon: 'form' },
    ],
  },

  /* 2 — suitability: a framework of six factors in three groups; no score, no verdict */
  factors: {
    h: { a: 'What we look at', b: 'before suggesting Google Ads.' },
    lede: 'Google Ads isn’t right for every business. Here’s what we look at.',
    tabsLabel: 'Factors we look at',
    items: [
      {
        key: 'demand',
        group: 'The market',
        label: 'Search demand',
        icon: 'search',
        q: 'Are people already searching for what you sell?',
        a: 'Google Ads reaches people who are searching. If few are, it may not be the right way to reach them.',
      },
      {
        key: 'routes',
        group: 'The market',
        label: 'Other routes',
        icon: 'arrow',
        q: 'What else could reach the same people?',
        a: 'Sometimes SEO or another channel fits better.',
        links: [
          { href: '/seo', label: 'SEO' },
          { href: '/social-media-ads', label: 'social media ads' },
        ],
      },
      {
        key: 'value',
        group: 'Your business',
        label: 'Customer value',
        icon: 'target',
        q: 'What is a new customer worth to you?',
        a: 'This shapes how much it makes sense to spend to win one.',
      },
      {
        key: 'response',
        group: 'Your business',
        label: 'Your response',
        icon: 'phone',
        q: 'Can your business answer enquiries when they arrive?',
        a: 'An enquiry only helps if someone responds to it.',
      },
      {
        key: 'route',
        group: 'Your website',
        label: 'Enquiry route',
        icon: 'form',
        q: 'Can people easily enquire on your website?',
        a: 'Ads send people to a page. If they can’t enquire there, the budget goes to waste.',
      },
      {
        key: 'tracking',
        group: 'Your website',
        label: 'Tracking',
        icon: 'chart',
        q: 'Can your enquiries be tracked?',
        a: 'Tracking lets us learn which searches bring genuine enquiries. How far it can go depends on your website and how people contact you.',
      },
    ],
    close: 'No score. We talk these through with you first, and tell you when something else may suit you better.',
  },

  /* 3 — one search, four endings: the journey, what Google Ads records, what the business sees, and who acts */
  path: {
    h: { a: 'From your budget to an enquiry —', b: 'and where it can go wrong.' },
    lede: 'Google Ads reports what it’s set up to record. That isn’t always the same as a genuine enquiry.',
    stations: [
      { key: 'search', label: 'Search', icon: 'search' },
      { key: 'click', label: 'Click', icon: 'cursor' },
      { key: 'visit', label: 'Visit', icon: 'page' },
      { key: 'enquiry', label: 'Enquiry', icon: 'form' },
    ],
    laneAds: {
      label: 'What Google Ads can record',
      items: ['Ad shown', 'Click', 'A recorded action, such as a form being sent or a button pressed'],
      note: 'Only where tracking is set up.',
    },
    laneYou: {
      label: 'What your business needs to know',
      item: 'Whether it was a genuine enquiry — a real person, reachable, asking about your work.',
      status: { yes: 'A genuine enquiry', no: 'No genuine enquiry', not: 'Not a genuine enquiry' },
    },
    /* the one use of the word (OD-11), explained in plain language */
    term: 'Google Ads calls a recorded action a “conversion”.',
    tabsLabel: 'Ways one search can end',
    /* stop: the station where the search ended (0 to 3); recorded: whether Google Ads recorded an action; genuine: yes / no / not */
    cases: [
      {
        key: 'intended',
        tab: 'A genuine enquiry',
        icon: 'check',
        stop: 3,
        recorded: true,
        genuine: 'yes',
        text: 'People search, click, visit and enquire.',
        actor: '',
        separately: '',
      },
      {
        key: 'searches',
        tab: 'The wrong person clicks',
        icon: 'user',
        stop: 1,
        recorded: false,
        genuine: 'no',
        text: 'Clicks are recorded, but few are people you’d want to hear from. We review the searches and change your campaigns.',
        actor: 'We manage this.',
        separately: '',
      },
      {
        key: 'page',
        tab: 'The page doesn’t answer',
        icon: 'page',
        stop: 2,
        recorded: false,
        genuine: 'no',
        text: 'People arrive and leave. We review the page and tell you what we find and what we’d change.',
        actor: 'We find and recommend.',
        separately: 'Changing the page is agreed separately.',
      },
      {
        key: 'record',
        tab: 'A recorded action that isn’t an enquiry',
        icon: 'eyeoff',
        stop: 3,
        recorded: true,
        genuine: 'not',
        text: 'Google Ads records an action that, on inspection, was spam, a mistake or someone with no real interest. We tell you what we find and what needs fixing.',
        actor: 'We find and recommend.',
        separately: 'Tracking repairs are agreed separately.',
      },
    ],
    close: 'So we look past the report to the enquiries your business receives, as far as your tracking allows.',
  },

  /* 4 — what the work covers: inside the frame is covered by the management fee; the dashed box is agreed separately */
  scope: {
    h: { a: 'What the work', b: 'covers.' },
    sub: 'Management and oversight are covered by our management fee. Anything we’d build or fix on your website or tracking is agreed separately.',
    frame: 'Covered by our management fee',
    core: {
      k: 'Core service',
      t: 'We run your Google Ads',
      items: [
        { chip: 'Set up and manage', full: 'Set up and manage your Google Ads', icon: 'target' },
        { chip: 'Write and improve ads', full: 'Write and improve your ads', icon: 'message' },
        { chip: 'Manage the budget', full: 'Manage your advertising budget', icon: 'chart' },
        { chip: 'Review and improve campaigns', full: 'Review search performance and improve your campaigns', icon: 'search' },
      ],
    },
    oversight: {
      k: 'Oversight',
      t: 'We look beyond the click',
      items: [
        { chip: 'Review the landing page', full: 'Review the page people land on', icon: 'page' },
        { chip: 'Check people can enquire', full: 'Check whether visitors can make an enquiry', icon: 'form' },
        { chip: 'Spot website and tracking problems', full: 'Spot problems with your website, enquiry route or tracking', icon: 'eyeoff' },
        { chip: 'Explain and recommend', full: 'Explain what we find and recommend improvements', icon: 'message' },
      ],
    },
    separate: {
      k: 'Agreed separately',
      items: [
        { chip: 'Landing pages', full: 'Creating or changing landing pages', icon: 'page' },
        { chip: 'Website and form fixes', full: 'Fixing your website or enquiry forms', icon: 'wrench' },
        { chip: 'New or repaired tracking', full: 'Setting up new tracking, or repairing it', icon: 'chart' },
      ],
    },
    tear: 'The click',
  },

  /* 5 — what we answer for: four pledges, one qualification and one fee line */
  answer: {
    h: { a: 'What we', b: 'answer for.' },
    lede: 'These are ours to get right.',
    pledges: [
      {
        t: 'Your budget',
        icon: 'target',
        lines: [
          'We manage it, and adjust your campaigns when the results call for it.',
          'Before we make significant changes, we record your starting performance, where it’s available.',
        ],
      },
      {
        t: 'Clear reasons',
        icon: 'message',
        lines: [
          'We explain significant changes and why we made them.',
          'We review your website and enquiry route and recommend improvements. Making the changes is agreed separately.',
        ],
      },
      {
        t: 'Honest reporting',
        icon: 'chart',
        lines: ['A performance report and a review call every month. We use what they show to decide what to do next.'],
      },
      {
        t: 'Corrective action',
        icon: 'wrench',
        lines: ['If results disappoint, we tell you and recommend what to change.'],
      },
    ],
    qualification: 'We cannot promise a number of enquiries or what each will cost. Your market, prices, competitors and how quickly you answer all play a part.',
    fee: { text: 'Our management fee is separate from your ad spend. What it depends on is on the', link: { href: '/pricing', label: 'pricing page' } },
  },

  /* 6 — what you learn each month: one illustrative report, one finding at a time; the attribution limit is part of it */
  reporting: {
    h: { a: 'What you learn each month,', b: 'and what we do with it.' },
    lede: 'Each month you get a report and a review call.',
    report: {
      k: 'A monthly report',
      note: 'Where the data allows',
      sections: [
        'Which campaigns brought enquiries',
        'Which searches brought them',
        'How that compares with the starting point we recorded',
      ],
      illus: 'Illustrative layout. No real figures.',
    },
    tabsLabel: 'Findings',
    findingsK: 'For example',
    findingLabel: 'Finding',
    decisionLabel: 'What we do',
    /* the first finding is the one shown on load: it shows an investigation most clearly (owner decision D1, option B) */
    findings: [
      { key: 'noenq', find: 'Some searches bring clicks but few enquiries', do: 'We check whether they’re the right searches, and decide whether to change or stop them.' },
      { key: 'works', find: 'Some searches bring enquiries', do: 'We look at why, and decide whether they deserve more of the budget.' },
      { key: 'page', find: 'A page gets visits but no enquiries', do: 'We look at what it asks people to do, and recommend changes. Making them is agreed separately.' },
    ],
    unknown: 'Source unknown',
    limit: 'Not every enquiry can be traced to an ad. A phone call after someone saw your ad is a common example. Where we cannot tell, we say so. We do not claim those enquiries, and we do not hide them.',
    link: { href: '/how-it-works', label: 'How we measure, including what can’t be traced' },
    related: {
      a: 'Related:',
      links: [
        { href: '/problems/traffic-but-no-enquiries', label: 'if the clicks arrive and the enquiries do not' },
        { href: '/services', label: 'the whole system' },
        { href: '/lead-generation', label: 'the enquiries themselves' },
      ],
    },
  },

  /* 7 — what happens after you get in touch: the confirmed process, apart from the close */
  process: {
    h: { a: 'What happens', b: 'after you get in touch.' },
    steps: [
      { t: 'Get in touch', icon: 'message', d: 'You send a message. We reply by email or WhatsApp.' },
      { t: 'Discovery call', icon: 'phone', d: 'We learn what you sell, who buys it and what you want more of.' },
      { t: 'Audit', icon: 'search', d: 'We review what we can learn about your business before recommending next steps.' },
      { t: 'Proposal', icon: 'page', d: 'The work we propose, described so you can judge it.' },
      { t: 'Your approval', icon: 'check', d: 'Agreed work starts after you approve.' },
      { t: 'Work begins', icon: 'arrow', d: 'We start the agreed work.' },
    ],
    line: 'You see our findings, a recommended plan and a proposal before any work starts.',
  },

  /* 8 — the close: short, decisive, both actions */
  close: {
    h: { a: 'Already running Google Ads,', b: 'or thinking about it?' },
    already: { k: 'Already advertising?', t: 'Tell us what you spend and what you’re getting.' },
    thinking: { k: 'Thinking about it?', t: 'Tell us what you sell and what a new customer is worth.' },
    primary: 'Tell us what you’re trying to fix',
    secondary: 'Book a call',
  },
};
