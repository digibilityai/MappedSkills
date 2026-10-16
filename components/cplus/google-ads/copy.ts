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
 * G1.3a (owner-approved scope and decisions B to E, 2026-10-16): sections 1, 3, 4, 5, 6 and 8 carry the approved G1.3 copy;
 * sections 2 (factors) and 7 (process) are unchanged.
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
    primary: 'Tell us about your Google Ads',
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

  /* 3 — from ad spend to enquiries: one search, four outcomes, one explanation panel */
  path: {
    h: { a: 'From ad spend to enquiries.', b: 'Where does it break?' },
    lede: 'A click isn’t a customer. We look at what happens after someone clicks your ad — and where potential enquiries are lost.',
    stations: [
      { key: 'search', label: 'Search', icon: 'search' },
      { key: 'click', label: 'Click', icon: 'cursor' },
      { key: 'visit', label: 'Visit', icon: 'page' },
      { key: 'outcome', label: 'Outcome', icon: 'target' },
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
    /* the one use of the word (OD-11), explained in plain language; shown in the fourth outcome's panel */
    term: 'Google Ads calls a recorded action a “conversion”.',
    tabsLabel: 'Ways one search can end',
    /* stop: the station where the search ended (0 to 3); recorded: whether Google Ads recorded an action; genuine: yes / no / not.
       Only the first outcome reaches a genuine enquiry. */
    cases: [
      {
        key: 'intended',
        tab: 'Genuine enquiry',
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
        tab: 'Unsuitable click',
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
        tab: 'Website problem',
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
        tab: 'Recorded action that is not a genuine enquiry',
        icon: 'eyeoff',
        stop: 3,
        recorded: true,
        genuine: 'not',
        text: 'Google Ads records an action that, on inspection, was spam, a mistake or someone with no real interest. We tell you what we find and what needs fixing.',
        actor: 'We find and recommend.',
        separately: 'Tracking repairs are agreed separately.',
      },
    ],
  },

  /* 4 — what the work covers: three connected responsibilities; the first two are covered by the management fee, the third is
     agreed separately. The detailed lists sit in a disclosure (owner exception to the UX rule on collapsed content, decision 7). */
  scope: {
    h: { a: 'What the work', b: 'covers.' },
    sub: 'Management and oversight are covered by our management fee. Anything we’d build or fix on your website or tracking is agreed separately.',
    frame: 'Covered by our management fee',
    nodes: [
      { key: 'run', t: 'Run the ads', d: 'Core Google Ads management', tag: 'Included in the management fee', icon: 'target' },
      { key: 'beyond', t: 'Look beyond the click', d: 'Website, enquiry-route and tracking oversight', tag: 'Included in the management fee', icon: 'search' },
      {
        key: 'separate',
        t: 'Agree additional fixes separately',
        d: 'Landing-page creation, website and form repairs, and tracking implementation',
        tag: 'Agreed separately',
        icon: 'wrench',
      },
    ],
    detailsSummary: 'See what’s included',
    core: {
      k: 'Core service',
      t: 'We run your Google Ads',
      items: [
        'Set up and manage your Google Ads',
        'Write and improve your ads',
        'Manage your advertising budget',
        'Review search performance and improve your campaigns',
      ],
    },
    oversight: {
      k: 'Oversight',
      t: 'We look beyond the click',
      items: [
        'Review the page people land on',
        'Check whether visitors can make an enquiry',
        'Spot problems with your website, enquiry route or tracking',
        'Explain what we find and recommend improvements',
      ],
    },
    separate: {
      k: 'Agreed separately',
      items: ['Creating or changing landing pages', 'Fixing your website or enquiry forms', 'Setting up new tracking, or repairing it'],
    },
    /* the spend-versus-fee explanation and the pricing link moved here from the accountability section (decision 8) */
    fee: {
      text: 'Your ad spend is paid directly to Google. Our management fee is separate. What it depends on is on the',
      link: { href: '/pricing', label: 'pricing page' },
    },
  },

  /* 5 — what we answer for: four pledges and one closing line */
  answer: {
    h: { a: 'What we', b: 'answer for.' },
    lede: 'These are ours to get right.',
    pledges: [
      { t: 'Your budget', icon: 'target', line: 'We review spending and adjust campaigns when performance calls for it.' },
      { t: 'Clear reasons', icon: 'message', line: 'We explain significant changes and why we make them.' },
      { t: 'Honest reporting', icon: 'chart', line: 'A monthly performance report and review call.' },
      { t: 'Corrective action', icon: 'wrench', line: 'When results disappoint, we discuss what isn’t working and recommend improvements.' },
    ],
    closing: 'We explain our decisions, discuss poor results and recommend what to change. We cannot promise a number of enquiries or what each will cost.',
  },

  /* 6 — monthly reporting: a compact finding-to-action example; the baseline commitment (OD-07) and the attribution limit live here */
  reporting: {
    h: { a: 'Clear reports.', b: 'Clearer decisions.' },
    lede: 'Every month you get a performance report and a review call. We review your Google Ads performance with you and explain what needs attention.',
    covers: 'Where the data allows, it covers campaigns, searches and how performance compares with the starting point we recorded.',
    baseline: 'Before we make significant changes, we record your starting performance, where it’s available.',
    tabsLabel: 'Findings',
    findingsK: 'For example',
    decisionLabel: 'What we do',
    findings: [
      { key: 'noenq', find: 'Clicks, but few enquiries', do: 'Review the searches and adjust or exclude those that aren’t relevant.', separately: '' },
      { key: 'works', find: 'Searches bringing enquiries', do: 'Review what’s working and consider where to focus the budget.', separately: '' },
      {
        key: 'page',
        find: 'Visits, but no enquiries',
        do: 'Check the landing-page experience and recommend improvements.',
        separately: 'Making the changes is agreed separately.',
      },
    ],
    limit: 'Not every enquiry can be traced to an ad. Where we cannot tell, we say so.',
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

  /* 8 — the close: one invitation, both actions */
  close: {
    h: { a: 'Already running Google Ads,', b: 'or thinking about it?' },
    body: 'Let’s discuss what your business needs and whether Google Ads is the right fit.',
    primary: 'Tell us about your Google Ads',
    secondary: 'Book a call',
  },
};
