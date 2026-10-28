/** /google-ads, THE RESOLVE R4.1 review variant (owner review draft, 27 October 2026). NOT live.
 * R4.1 changes only the hero paragraph, the "Why Google Ads" section and the campaign-type selector layout. Everything else
 * is re-exported unchanged from R4 (and through it R3). Copy rule: no dashes used as punctuation.
 */
import { INTENT as INTENT_R4, TYPES as TYPES_R4 } from '../google-ads-r4/content';

export { META, FAQS, WORK, CLOSE, SEARCH_DEMO, MANAGE, JOURNEY, MEASURE, PROCESS } from '../google-ads-r4/content';

export const HERO = {
  eyebrow: 'Google Ads management',
  h1: ['Reach customers when they’re looking for ', 'what you sell.'],
  lede: 'Reach people searching for what you sell. We manage Google Ads to help turn relevant searches into enquiries and purchases.',
  cta: 'Discuss Your Google Ads',
  secondary: 'Request a call',
  caption: 'Illustrative journey with a generic business. Not every search becomes an enquiry.',
} as const;

/** Same three approved examples and meanings as R4; only the surrounding explanation is shorter. */
export const INTENT = {
  ...INTENT_R4,
  lede: 'What people search for decides the ad, and what happens next.',
  note: 'Not every search becomes an enquiry. The aim is to meet existing demand with the right message.',
} as const;

export const TYPES = {
  ...TYPES_R4,
  h2: ['Five ways to appear on Google. ', 'Pick what fits.'],
  lede: 'We manage all five. Most businesses need one or two.',
} as const;

/** Approved Google Ads working price (Pricing R3, commit 0a8561e). No setup fees, GST terms, minimum budgets, contract periods,
 * guarantees or add-on prices are stated, because none were approved. */
export const PRICE = {
  eyebrow: 'Google Ads pricing',
  h2: ['One monthly fee ', 'for a clearly defined scope'],
  lede: 'The management fee covers the work listed here. Your ad spend is paid separately, directly to Google.',
  points: [
    'The fee covers the monthly scope listed here.',
    'Ad spend is paid separately, to Google.',
    'Extra campaigns, creatives or technical work are quoted separately.',
    'Extra work starts only after you approve the quote.',
  ],
  card: {
    label: 'Google Ads management',
    fee: '₹14,999',
    per: 'a month',
    figs: [
      'Up to 2 campaigns active at a time',
      'Up to 6 ad groups',
      '2 static ad creatives',
      '1 carousel, up to 5 cards',
      'Up to 6 new ad-copy variations',
    ],
    note: 'Ad spend is not included in this fee.',
  },
  cta: 'Discuss Your Google Ads',
  compare: { href: '/pricing', label: 'Compare Google, Meta and combined plans' },
  scope: {
    summary: 'Everything included each month',
    items: [
      'Up to 2 concurrently active campaigns',
      'Up to 6 ad groups',
      '2 static ad creatives',
      '1 carousel, maximum 5 cards',
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
      'Not every Google Ads campaign uses every creative format. Search campaigns are mostly text, so they may not need image or carousel creatives. The creative allowances apply to the campaigns that use them.',
      'Reels and videos are supplied by you or quoted separately.',
      'Creative allowances reset every month and do not carry forward.',
      'New tracking setup and landing-page development are quoted separately.',
    ],
  },
} as const;
