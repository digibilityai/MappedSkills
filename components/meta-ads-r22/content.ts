/** /social-media-ads, Meta Ads R2.2 review variant (27 October 2026). NOT live. R2.1 with a simplified "Why Meta Ads" section;
 * everything else is re-exported unchanged. The three ideas are illustrative possibilities, not a guaranteed sequence. No dashes as punctuation.
 */
export { META, HERO, FEED_DEMO, FORMATS, JOURNEY, MANAGE, MEASURE, WORK, PROCESS, FAQS, CLOSE } from '../meta-ads-r21/content';

export const INTENT = {
  eyebrow: 'Why Meta Ads',
  h2: ['Your next customer may not be ', 'searching for you yet.'],
  lede: 'They may discover something worth exploring while scrolling Facebook or Instagram.',
  steps: [
    { k: 'Discover', d: 'An ad catches their interest.' },
    { k: 'Explore', d: 'They learn more about the offer.' },
    { k: 'Act', d: 'They enquire or buy when ready.' },
  ],
  note: 'Illustrative possibilities, not a guaranteed sequence.',
} as const;

/** Approved Meta Ads working price (Pricing R3, commit 0a8561e). No setup fees, GST terms, minimum budgets, contract commitments,
 * guarantees or add-on prices are stated, because none were approved. */
export const PRICE = {
  eyebrow: 'Meta Ads pricing',
  h2: ['One monthly fee ', 'for a clearly defined scope'],
  lede: 'The management fee covers the work listed here. Your ad spend is paid separately, directly to Meta.',
  points: [
    'The fee covers the monthly scope listed here.',
    'Ad spend is paid separately, to Meta.',
    'Extra campaigns, creatives or technical work are quoted separately.',
    'Extra work starts only after you approve the quote.',
  ],
  card: {
    label: 'Meta Ads management',
    fee: '₹14,999',
    per: 'a month',
    figs: [
      '3 active campaigns',
      '3 static creatives',
      '1 carousel, up to 5 cards',
      'Weekly optimisation',
      'Monthly report and review',
    ],
    note: 'Ad spend is not included in this fee.',
  },
  cta: 'Discuss Your Meta Ads',
  compare: { href: '/pricing', label: 'Compare Google, Meta and combined plans' },
  scope: {
    summary: 'Everything included each month',
    items: [
      'Up to 3 concurrently active campaigns',
      'Up to 6 ad sets',
      '3 static ad creatives',
      '1 carousel, up to 5 cards',
      'Up to 6 new ad-copy variations',
      'Campaign monitoring every business day',
      'Weekly optimisation reviews',
      '1 monthly performance report',
      '1 monthly client review',
      'Basic tracking review',
      'Landing-page recommendations',
      '1 revision round per creative',
    ],
    notesLabel: 'Good to know',
    notes: [
      'Reels and videos are supplied by you or quoted separately.',
      'Creative allowances reset every month and do not carry forward.',
      'New tracking implementation, landing-page development, additional campaigns and extra creative production are quoted separately.',
      'Quoted work starts only after you approve the quote.',
    ],
  },
} as const;
