/**
 * C+ Social Media Ads (/social-media-ads) — customer-facing copy, verbatim from the approved prototype
 * (proto/direction-c-plus 0a8b611, components/proto-cplus/socialAdsContent.ts, SA_PLAIN). The prototype's internal review register
 * is not carried over.
 */

export const SA_PLAIN = {
  crumb: 'Paid social',
  kicker: 'Paid social',
  h1: { a: 'Paid social, judged on', b: 'the enquiries it produces.' },
  lede: 'We run paid social advertising, and we will tell you when it is the wrong channel for your business. Search reaches people who have already decided they want something. Social interrupts people who have not.',
  side: 'Where it genuinely fits, it is one demand source inside the same outcome as everything else here, and we are accountable for the enquiries it produces rather than for reach, clicks or engagement.',
  primary: 'Tell us what you’re trying to fix',

  /* hero illustration: a feed — the ad is one interruption among other things; the reactions look like progress */
  feed: {
    label: 'A feed',
    posts: ['A friend’s photo', 'Match highlights', 'A recipe video'],
    ad: { tag: 'Sponsored', t: 'Your ad', note: 'They were thinking about something else.' },
    reactsK: 'Looks like progress',
    reacts: ['Reach', 'Likes', 'Shares', 'Comments'],
    countsK: 'What counts',
    counts: 'An enquiry you could quote for',
    cap: 'Illustration. No figures.',
  },

  /* 2 — scope (ink) */
  scopeKicker: 'What is in scope',
  scopeH: { a: 'The campaign,', b: 'and the page the click arrives on.' },
  scope: [
    'Audience definition',
    'Creative and message testing, within the volume available',
    'Campaign structure',
    'Budget pacing',
  ],
  scopeLanding: 'The landing experience the click arrives on',
  scopeMeas: 'Conversion tracking configured around meaningful enquiry actions, where technically feasible.',
  billing: 'Your advertising spend is paid directly to the platform. Our management fee is separate.',

  /* 3 — the channel-fit boundary (paper): the page's most valuable content */
  bdKicker: 'When we would tell you not to do this',
  bdH: { a: 'Cheap clicks are', b: 'not the same as enquiries.' },
  noes: [
    {
      t: 'A considered purchase, a small audience, buyers who search by name.',
      d: 'Our judgement in that situation is that the same budget works harder in search. Social reaches people while they are thinking about something else.',
    },
    {
      t: 'No reliable way to measure what the spend produced.',
      d: 'Reach and engagement figures look like progress. They are not enquiries.',
    },
    {
      t: 'Social media management.',
      d: 'We do not do content calendars, community management or brand-building campaigns. Those are different jobs with a different unit of value.',
    },
  ],
  principle: 'We do not claim one channel outperforms another for your business.',
  principleD: 'Nothing has been measured on your account yet, and a claim made before that would be invented.',
  methodLink: { href: '/how-it-works', label: 'The method, including what cannot be attributed' },
  related: {
    a: 'Related:',
    links: [
      { href: '/google-ads', label: 'paid search as the alternative source' },
      { href: '/services', label: 'the whole system' },
    ],
  },

  /* close — the live close */
  close: {
    label: 'Tell us what you are running now',
    h: 'What it costs, and what it brings.',
    body: 'If paid social is already running, the useful first message is what it costs, what it brings, and whether any of it turns into an enquiry you could quote for. If the honest answer is that you cannot tell, that is the finding worth starting from.',
  },
};
