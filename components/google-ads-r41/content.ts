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
