/**
 * C+ Social Media Ads (/social-media-ads) — customer-facing copy. Originated in the approved prototype (proto/direction-c-plus 0a8b611,
 * SA_PLAIN); refined 2026-10-16 under the owner-approved Paid Social refinement (G-1 to G-12). H1, metadata, CTA text and the
 * commercial boundaries are unchanged.
 */

export const SA_PLAIN = {
  crumb: 'Paid social',
  kicker: 'Paid social',
  h1: { a: 'Paid social, judged on', b: 'the enquiries it produces.' },
  lede: 'We run social media ads where they make business sense, and we’ll tell you when they don’t. We focus on the enquiries they generate, not just views, likes or clicks.',
  primary: 'Tell us what you’re trying to fix',

  /* hero illustration: a four-stop route (ad, tap, page, enquiry). No figures. */
  route: {
    runK: 'We run the ads',
    nextK: 'We look at what happens next',
    posts: ['A friend’s photo', 'A recipe video'],
    ad: { tag: 'Sponsored', t: 'Your ad' },
    page: 'Your page',
    enquiry: 'An enquiry',
    steps: ['Your ad appears in their feed', 'They tap', 'They visit your page', 'They get in touch'],
    cap: 'Illustration. No figures.',
  },

  /* 2 — what we do (ink): the five approved responsibilities as a route */
  scopeKicker: 'What we do',
  scopeH: { a: 'From who sees your ad', b: 'to where they land.' },
  scope: [
    { t: 'Choose who sees it', d: 'We decide which people your ads should reach.' },
    { t: 'Set up the campaigns', d: 'We organise them so each one has a clear job.' },
    { t: 'Try different ads', d: 'We test messages and visuals when enough people see them to compare.' },
    { t: 'Pace the budget', d: 'We control how quickly your money is spent.' },
    { t: 'Check where they land', d: 'We review the page people reach after clicking and recommend improvements that could help turn visits into enquiries.' },
  ],
  scopeMeas: 'Where technically possible, we set up tracking for meaningful enquiry actions, not just clicks.',
  billing: 'Your ad spend goes directly to the platform. Our management fee is separate.',

  /* 3 — the channel-fit boundary (paper): the page's most valuable content */
  bdKicker: 'When we’d advise against it',
  bdH: { a: 'Cheap clicks are', b: 'not the same as enquiries.' },
  noes: [
    {
      t: 'A big decision, a small audience, buyers who search for you by name.',
      d: 'We’d put that budget into search ads instead.',
    },
    {
      t: 'No reliable way to tell what the ads brought in.',
      d: 'Likes and views look like progress. They aren’t enquiries.',
    },
    {
      t: 'Running your social media pages.',
      d: 'We don’t do posting calendars, community management or brand campaigns.',
    },
  ],
  principle: 'We won’t claim one advertising channel works better than another for your business before seeing your results.',
  principleD: 'Without that evidence, it would be a guess.',
  methodLink: { href: '/how-it-works', label: 'How we measure, and what can’t be traced' },
  related: {
    a: 'Also see:',
    links: [
      { href: '/google-ads', label: 'Google Ads' },
      { href: '/services', label: 'All our services' },
    ],
  },

  /* close — the live close */
  close: {
    h: 'Ready to make your social ads work harder?',
    body: 'Tell us what you’re trying to achieve. We’ll talk through whether social ads are right for your business.',
  },
};
