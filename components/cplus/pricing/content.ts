/**
 * C+ Pricing (/pricing), revision 2 — customer-facing copy, verbatim from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/pricingContent.ts, PR_PLAIN). The prototype's internal review register
 * is not carried over.
 */

export const PR_PLAIN = {
  kicker: 'Pricing',
  h1: { a: 'Your price depends on', b: 'what your business actually needs.' },
  lede: 'We don’t sell fixed packages. We look at where you are now, then quote for the work that will actually help.',
  primary: 'Get a scoped estimate',
  secondary: 'Book a time to talk',

  /* hero illustration: two businesses, two stacks of work — no prices */
  stacks: {
    label: 'Two businesses, two quotes',
    items: [
      { k: 'Business A', need: 'Its website works. It needs more of the right visitors.', blocks: ['Getting found'] },
      { k: 'Business B', need: 'Visitors arrive, but enquiries don’t, and nothing is tracked.', blocks: ['Tracking enquiries', 'Fixing the enquiry form', 'Getting found'] },
    ],
    cap: 'Illustration. Different needs, different quotes. No prices.',
  },

  /* 2 — what changes the price (paper) */
  facKicker: 'What changes the price',
  facH: { a: 'Five things', b: 'decide the quote.' },
  factors: [
    { t: 'How much needs doing', d: 'Fixing one problem is a smaller job than fixing several.', less: 'One thing to fix', more: 'Several things to fix' },
    { t: 'The size of your website', d: 'More pages means more to check and improve.', less: 'A small site', more: 'A large site' },
    { t: 'What already works', d: 'If tracking and your enquiry form already work, there is less to set up.', less: 'Tracking and forms work', more: 'Nothing set up yet' },
    { t: 'Who writes the pages', d: 'Writing pages takes time. If you do it, the quote is lower.', less: 'You write them', more: 'We write them' },
    { t: 'How busy your market is', d: 'Standing out among many competitors takes more work.', less: 'Few competitors', more: 'Many established competitors' },
  ],
  lessK: 'Costs less',
  moreK: 'Costs more',

  /* 3 — what you pay separately (ink) */
  payKicker: 'What you pay separately',
  payH: { a: 'Your ad spend goes', b: 'straight to the platform.' },
  payIntro: 'When we run ads for you, the money for the ads and our fee are kept apart.',
  payYou: 'You',
  pay: [
    { to: 'Google', what: 'Your Google Ads spend', how: 'Paid directly to Google.' },
    { to: 'The social platform', what: 'Your social ads spend', how: 'Paid directly to the platform.' },
    { to: 'MappedSkills', what: 'Our management fee', how: 'Charged separately.', ours: true },
  ],

  /* 4 — how to get an estimate (paper) */
  stepsKicker: 'How to get an estimate',
  stepsH: { a: 'Three steps,', b: 'before any work starts.' },
  steps: [
    { t: 'Tell us what’s going on', d: 'What you sell, and what is or isn’t working.' },
    { t: 'We talk and take a look', d: 'A call, then a review of your site and your enquiries.' },
    { t: 'You get a plan and a quote', d: 'Our findings, a recommended plan and a proposal. You decide from there.' },
  ],

  /* close */
  close: {
    label: 'Get an actual number',
    h: 'A real number comes from a real conversation.',
    body: 'Two businesses of the same size can need very different work. Tell us about yours.',
  },
};
