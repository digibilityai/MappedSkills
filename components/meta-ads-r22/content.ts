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
