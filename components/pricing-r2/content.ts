/**
 * `/pricing` copy. Fees and monthly scope are the founder-approved working prices for this implementation. No setup fees,
 * minimum ad budgets, GST treatment, contract terms, guarantees or add-on prices are stated, because none were approved.
 *
 * Tone: plain English for a business owner who is not a marketer. Visual benchmark: How It Works R2.2.
 */

export const PRICING_R2 = {
  hero: {
    kicker: 'Pricing',
    h1: { a: 'One fixed monthly fee', b: 'for Google and Meta ads management.' },
    lede: 'Each plan has a clear list of what we deliver every month. Extra work is quoted and approved by you first. Your ad spend is paid separately, to the platform.',
    ledgerLabel: 'Monthly management fee',
    ledger: [
      { k: 'Google Ads', v: '₹14,999', unit: 'a month' },
      { k: 'Meta Ads', v: '₹14,999', unit: 'a month' },
      { k: 'Google Ads + Meta Ads', v: '₹26,999', unit: 'a month' },
    ],
    ledgerNote: 'Ad spend is not included in these fees.',
    parts: [
      { n: '1', t: 'Fixed monthly fee', d: 'You pay the same fee each month for a defined scope.' },
      { n: '2', t: 'Deliverables listed', d: 'Every plan lists exactly what we do and make for you.' },
      { n: '3', t: 'Extra work is quoted', d: 'Anything beyond the plan is quoted, and you approve it before it starts.' },
      { n: '4', t: 'Ad spend is separate', d: 'You pay your ad budget directly to Google or Meta, not to us.' },
    ],
  },

  plans: {
    kicker: 'Compare the plans',
    h2: { a: 'One fee for each plan,', b: 'with the same list to compare.' },
    intro: 'The five things most buyers compare are on each card. The full scope is in the table below the cards.',
    items: [
      {
        k: 'Google Ads',
        title: 'Google Ads',
        fee: '₹14,999',
        per: 'a month',
        note: 'Ad spend is paid to Google.',
        rows: [
          { k: 'Active campaigns managed', v: '2 active at a time' },
          { k: 'Static creatives', v: '2 a month' },
          { k: 'Carousels', v: '1 a month, up to 5 cards' },
          { k: 'Reporting and optimisation', v: 'Weekly optimisation, monthly report and review' },
        ],
        featured: false,
      },
      {
        k: 'Meta Ads',
        title: 'Meta Ads',
        fee: '₹14,999',
        per: 'a month',
        note: 'Ad spend is paid to Meta.',
        rows: [
          { k: 'Active campaigns managed', v: '3 active at a time' },
          { k: 'Static creatives', v: '3 a month' },
          { k: 'Carousels', v: '1 a month, up to 5 cards' },
          { k: 'Reporting and optimisation', v: 'Weekly optimisation, monthly report and review' },
        ],
        featured: false,
      },
      {
        k: 'Google Ads + Meta Ads',
        title: 'Google Ads + Meta Ads',
        fee: '₹26,999',
        per: 'a month',
        note: 'Ad spend is paid to Google and Meta.',
        rows: [
          { k: 'Active campaigns managed', v: '5 active at a time' },
          { k: 'Static creatives', v: '5 a month' },
          { k: 'Carousels', v: '2 a month, up to 5 cards each' },
          { k: 'Reporting and optimisation', v: 'Weekly optimisation, monthly report and review' },
        ],
        featured: true,
      },
    ],
    compare: {
      label: 'Full scope comparison',
      heads: ['Google Ads', 'Meta Ads', 'Google Ads + Meta Ads'],
      rows: [
        { k: 'Monthly management fee', v: ['₹14,999', '₹14,999', '₹26,999'] },
        { k: 'Active campaigns', v: ['2 active at a time', '3 active at a time', '5 active at a time'] },
        { k: 'Ad groups or ad sets', v: ['Up to 6 ad groups', 'Up to 6 ad sets', 'Up to 12 ad groups and ad sets'] },
        { k: 'Static creatives', v: ['2 a month', '3 a month', '5 a month'] },
        { k: 'Carousels', v: ['1 a month, up to 5 cards', '1 a month, up to 5 cards', '2 a month, up to 5 cards each'] },
        { k: 'New ad-copy variations', v: ['Up to 6 a month', 'Up to 6 a month', 'Up to 12 a month'] },
        { k: 'Monitoring', v: 'Every business day' },
        { k: 'Optimisation', v: 'Weekly review' },
        { k: 'Reporting', v: 'Monthly report and review meeting' },
        { k: 'Tracking and landing pages', v: 'Basic tracking review and landing-page recommendations' },
        { k: 'Revisions', v: 'One round for each creative' },
        { k: 'Creative allowances', v: 'Reset monthly, no carry forward' },
      ],
    },
    related: {
      label: 'Read more about each service:',
      google: { href: '/google-ads', label: 'Google Ads' },
      meta: { href: '/social-media-ads', label: 'Meta Ads' },
    },
  },

  included: {
    kicker: 'What management includes',
    h2: { a: 'The same rhythm', b: 'every month.' },
    cadence: [
      {
        when: 'Every business day',
        t: 'Monitoring',
        d: 'We check that your campaigns are running as planned and flag anything that needs attention.',
      },
      {
        when: 'Every week',
        t: 'Optimisation review',
        d: 'We look at what is working and make changes to campaigns and ads.',
      },
      {
        when: 'Every month',
        t: 'Report and meeting',
        d: 'You get one performance report and one review meeting. Creative allowances reset for the new month.',
      },
    ],
    scopeLabel: 'Good to know before you start',
    scope: [
      'Campaign allowances count campaigns that are active at the same time.',
      'Creative allowances reset every month and do not carry forward.',
      'Each included creative has one revision round.',
      'Reels and videos are supplied by you or quoted separately.',
      'Landing-page recommendations are included. Landing-page development is extra.',
      'New technical tracking implementation is quoted separately.',
      'Additional work needs a quote and your approval before we start.',
    ],
  },

  creative: {
    kicker: 'Creative work',
    h2: { a: 'Static designs and carousels are included.', b: 'Reels and videos are not.' },
    included: {
      label: 'Included in each plan',
      items: [
        'Static designs and carousels, as listed in your plan.',
        'Ad-copy variations, as listed in your plan.',
        'One revision round for each creative.',
        'Allowances reset every month and do not carry forward.',
      ],
    },
    excluded: {
      label: 'Reels and videos',
      items: ['You can supply them, or we quote for them separately.'],
    },
  },

  extra: {
    kicker: 'What costs extra',
    h2: { a: 'Need more than your plan includes?', b: 'We quote it first.' },
    intro: 'Work beyond your plan is quoted separately. We quote first, and nothing starts until you approve.',
    items: [
      'More campaigns, ad groups or ad sets',
      'More static designs or carousels',
      'More ad-copy variations',
      'Reels and videos, unless you supply them',
      'Extra revision rounds',
      'Tracking setup',
      'Landing-page building',
    ],
    outside: {
      label: 'Not included in the monthly fee',
      items: [
        'Reel and video production',
        'New technical tracking implementation',
        'Landing-page development',
        'Creative beyond the monthly allowance',
        'Campaigns beyond the active-campaign allowance',
      ],
    },
  },

  split: {
    kicker: 'How media spend and fees work',
    h2: { a: 'Ad spend goes', b: 'straight to the platform.' },
    intro: 'Your ad budget and our management fee are kept apart. The ad budget is not part of our fee.',
    youLabel: 'You',
    paths: [
      { to: 'Google', what: 'Your Google Ads spend', how: 'Paid directly to Google.', kind: 'media' },
      { to: 'Meta', what: 'Your Meta Ads spend', how: 'Paid directly to Meta, for Facebook and Instagram.', kind: 'media' },
      { to: 'MappedSkills', what: 'Our management fee', how: 'The monthly fee for your plan, shown above.', kind: 'fee' },
    ],
  },

  faq: {
    kicker: 'Pricing questions',
    h2: { a: 'Asked before', b: 'you choose a plan.' },
    items: [
      {
        q: 'What does the management fee cover?',
        direct: 'The work listed in your plan: running and optimising your ads, weekly reviews, monitoring every business day, and a monthly report and meeting.',
        body: 'Each plan lists its campaigns, designs and ad copy above. Anything beyond the list is quoted separately and approved by you first.',
      },
      {
        q: 'Is the ad budget part of your fee?',
        direct: 'No. Your ad budget is paid directly to Google or Meta.',
        body: 'Our management fee is separate from what you spend on ads.',
      },
      {
        q: 'Who creates the ad designs?',
        direct: 'We make the static designs and carousels listed in your plan, with one revision round for each.',
        body: 'Reels and videos are supplied by you or quoted separately.',
      },
      {
        q: 'What happens if I need more than my plan includes?',
        direct: 'We quote the extra work first.',
        body: 'You approve the quote before anything starts. Creative allowances reset every month and do not carry forward.',
      },
    ],
    more: { href: '/faq', label: 'More questions and answers' },
  },

  close: {
    kicker: 'Not sure which plan fits?',
    h2: 'Tell us where your advertising is today.',
    body: 'We will tell you which plan fits your business and what it covers.',
  },

  links: {
    primary: 'Discuss Your Advertising',
    secondary: 'Request a call',
  },
} as const;
