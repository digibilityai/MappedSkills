/**
 * C+ Google Ads (/google-ads) — the final customer-facing copy (storyboard v4,
 * docs/google-ads-redesign/GOOGLE_ADS_COPY_AND_VISUAL_STORYBOARD.md; owner decisions OD-01 to OD-11 and the F-2 service
 * boundary, recorded as DEC-053).
 *
 * G0: THIS MODULE IS NOT IMPORTED BY THE PAGE YET. The live page still renders `content.ts`; nothing here changes what a
 * visitor sees. A later stage (G1) switches the page body to this module and retires `content.ts`.
 *
 * Rules this copy follows (guarded by tests/google-ads-copy.test.cjs):
 *   - management and oversight are covered by the management fee; website, landing-page and tracking implementation is
 *     agreed separately, and nothing here says or implies that a problem we identify is fixed automatically;
 *   - ad spend is paid directly to Google and the management fee is separate; no amounts and no fee schedule;
 *   - no ROI, figures, guarantees, case studies, testimonials, free offers, response times or call lengths;
 *   - the word "conversion" is used exactly once, and explained (OD-11); elsewhere the copy says "recorded action";
 *   - the title, description, canonical and structured data are not part of this module (they stay in page.tsx);
 *   - no section kickers: none are in the approved storyboard (v4), so none are added here. The hero kicker is the only one.
 *     A kicker can be added later only with owner approval.
 */

export const GA_COPY = {
  /** Page order, as approved (F-3): seven blocks, none added. */
  blocks: ['hero', 'factors', 'path', 'scope', 'answer', 'reporting', 'next'],

  /* 1 — hero */
  hero: {
    crumb: 'Paid search',
    kicker: 'Google Ads',
    h1: { a: 'We run your ads.', b: 'We look beyond the click.' },
    lede: [
      'We manage your Google Ads, including your ads, searches and budget. We also check whether your website makes it easy for people to enquire.',
      'If we find a problem with your website or tracking, we’ll explain what needs fixing. Any additional work is agreed with you separately.',
    ],
    primary: 'Tell us what you’re trying to fix',
    secondary: 'Book a call',

    /* the One Click receipt: ticked lines are part of the service; the dashed footer is agreed separately */
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
  },

  /* 2 — suitability factors: an educational list, no score and no verdict */
  factors: {
    h: 'What we look at before suggesting Google Ads.',
    lede: 'Google Ads isn’t right for every business. These are the questions we go through with you.',
    items: [
      {
        q: 'Are people already searching for what you sell?',
        a: 'Google Ads reaches people who are searching. If few are, it may not be the right way to reach them.',
      },
      {
        q: 'What is a new customer worth to you?',
        a: 'This shapes how much it makes sense to spend to win one.',
      },
      {
        q: 'Can people easily enquire on your website?',
        a: 'Ads send people to a page. If they can’t enquire there, the budget goes to waste.',
      },
      {
        q: 'Can your business answer enquiries when they arrive?',
        a: 'An enquiry only helps if someone responds to it.',
      },
      {
        q: 'Can your enquiries be tracked?',
        a: 'Tracking lets us learn which searches bring genuine enquiries. How far it can go depends on your website and how people contact you.',
      },
      {
        q: 'What else could reach the same people?',
        a: 'Sometimes SEO or another channel fits better.',
        links: [
          { href: '/seo', label: 'SEO' },
          { href: '/social-media-ads', label: 'social media ads' },
        ],
      },
    ],
    close: 'There’s no score. We talk these through with you before we recommend Google Ads, including when something else may suit you better.',
  },

  /* 3 — the Path Figure: budget to enquiry, and where it can go wrong */
  path: {
    h: 'From your budget to an enquiry — and where it can go wrong.',
    lede: 'Google Ads reports what it’s set up to record. That isn’t always the same as a genuine enquiry.',
    steps: [
      'Your budget',
      'Someone searches and clicks',
      'They visit your website',
      'They enquire',
      'We learn what worked, and decide what to change',
    ],
    laneAds: {
      label: 'What Google Ads can record',
      items: ['Ad shown', 'Click', 'A recorded action, such as a form being sent or a button pressed'],
      note: 'Only where tracking is set up.',
    },
    laneYou: {
      label: 'What your business needs to know',
      item: 'Whether each recorded action was a genuine enquiry — a real person, reachable, asking about your work.',
    },
    /* the one use of the word (OD-11), explained in plain language */
    term: 'Google Ads calls a recorded action a “conversion”.',
    tabsLabel: 'Cases to explore',
    cases: [
      {
        key: 'intended',
        tab: 'As intended',
        text: 'People search, click, visit and enquire.',
        actor: '',
        separately: '',
      },
      {
        key: 'searches',
        tab: 'The wrong people click',
        text: 'Clicks are recorded, but few are people you’d want to hear from. We review the searches and change your campaigns.',
        actor: 'We manage this.',
        separately: '',
      },
      {
        key: 'page',
        tab: 'The page doesn’t answer them',
        text: 'People arrive and leave. We review the page and tell you what we find and what we’d change.',
        actor: 'We find and recommend.',
        separately: 'Changing the page is agreed separately.',
      },
      {
        key: 'record',
        tab: 'A recorded action isn’t a genuine enquiry',
        text: 'Google Ads records an action that, on inspection, was spam, a mistake or someone with no real interest. We tell you what we find and what needs fixing.',
        actor: 'We find and recommend.',
        separately: 'Tracking repairs are agreed separately.',
      },
    ],
    close: 'So we look past the report to the enquiries your business receives, as far as your tracking allows. Not every enquiry can be traced to an ad.',
  },

  /* 4 — what the work covers: core service, oversight (both in the management fee) and work agreed separately */
  scope: {
    h: 'What the work covers.',
    sub: 'Management and oversight are covered by our management fee. Anything we’d build or fix on your website or tracking is agreed separately.',
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
      items: [
        'Creating or changing landing pages',
        'Fixing your website or enquiry forms',
        'Setting up new tracking, or repairing it',
      ],
    },
    callout: 'If we find a problem, we’ll explain what needs fixing. Any additional work is agreed with you separately.',
    tear: 'The click',
  },

  /* 5 — what we answer for: commitments, one qualification and one fee line */
  answer: {
    h: 'What we answer for.',
    lede: 'You pay Google for the clicks. You pay us to run the work well. These are ours to get right.',
    items: [
      { t: 'Your budget.', d: 'We manage it, and adjust your campaigns when the results call for it.' },
      { t: 'A starting point.', d: 'Before we make significant changes, we record your starting performance, where it’s available.' },
      { t: 'Your website and enquiry route.', d: 'We review them and recommend improvements. Making the changes is agreed separately.' },
      { t: 'Clear reasons.', d: 'We explain significant changes and why we made them.' },
      { t: 'Straight answers.', d: 'If results disappoint, we tell you and recommend what to change.' },
      { t: 'A monthly review.', d: 'A performance report and a review call every month. We use what they show to decide what to do next.' },
    ],
    qualification: 'We cannot promise a number of enquiries or what each will cost. Your market, prices, competitors and how quickly you answer all play a part.',
    fee: { text: 'Our management fee is separate from your ad spend. What it depends on is on the', link: { href: '/pricing', label: 'pricing page' } },
  },

  /* 6 — what you learn each month; the attribution limit is part of reporting */
  reporting: {
    h: 'What you learn each month, and what we do with it.',
    lede: 'Each month you get a report and a review call. Where the data allows, it covers:',
    questions: [
      'Which campaigns brought enquiries',
      'Which searches brought them',
      'How that compares with the starting point we recorded',
    ],
    pairsK: 'For example',
    pairs: [
      { find: 'Some searches bring enquiries', do: 'We look at why, and decide whether they deserve more of the budget.' },
      { find: 'Some searches bring clicks but few enquiries', do: 'We check whether they’re the right searches, and decide whether to change or stop them.' },
      { find: 'A page gets visits but no enquiries', do: 'We look at what it asks people to do, and recommend changes. Making them is agreed separately.' },
    ],
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

  /* 7 — next step: both audiences, the confirmed process, and the two CTAs */
  next: {
    h: 'Already running Google Ads, or thinking about it?',
    already: { k: 'Already advertising?', t: 'Tell us what you spend, what you’re getting, and whether you can tell which enquiries came from it.' },
    thinking: { k: 'Thinking about it?', t: 'Tell us what you sell and what one new customer is worth to you.' },
    steps: [
      { t: 'Get in touch', d: 'You send a message. We reply by email or WhatsApp.' },
      { t: 'Discovery call', d: 'We learn what you sell, who buys it and what you want more of.' },
      { t: 'Audit', d: 'We review what we can learn about your business before recommending next steps.' },
      { t: 'Proposal', d: 'The work we propose, described so you can judge it.' },
      { t: 'Your approval', d: 'Agreed work starts after you approve.' },
      { t: 'Work begins', d: 'We start the agreed work.' },
    ],
    line: 'You see our findings, a recommended plan and a proposal before any work starts.',
    primary: 'Tell us what you’re trying to fix',
    secondary: 'Book a call',
  },
};
