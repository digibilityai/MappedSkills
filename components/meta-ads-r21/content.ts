/** /social-media-ads, Meta Ads R2.1 review variant (27 October 2026). NOT live. R2 with the client images reused directly from
 * the approved THE RESOLVE R3 homepage (components/resolve-home-r3/ResolveHomeR3.tsx, WORK_ASSETS): same files, same alt text, same
 * disclosure notes. Both are conceptual artwork, so the notes stay. No outcomes or figures. No dashes used as punctuation.
 */
export { META, HERO, FEED_DEMO, INTENT, FORMATS, JOURNEY, MANAGE, MEASURE, PROCESS, FAQS, CLOSE } from '../meta-ads-r2/content';
import { WORK as WORK_R2 } from '../meta-ads-r2/content';

const IMG = {
  'om-sai': { src: '/images/resolve-r3/omsai-work.webp', alt: 'Conceptual artwork of a contemporary residential tower with landscaped balconies at dusk', note: 'Conceptual artwork. Not a photograph of the project.' },
  wanderlooms: { src: '/images/resolve-r3/wanderlooms-work.webp', alt: 'Conceptual artwork of two riders in adventure touring gear looking over a mountain valley at sunset beside an adventure motorcycle', note: 'Conceptual artwork. Not an actual campaign creative.' },
} as const;
const LOGO = {
  'om-sai': { src: '/images/resolve-r3/omsai-logo.jpg', alt: 'Omsai Group', w: 400, h: 400 },
  wanderlooms: { src: '/images/resolve-r3/wanderlooms-logo.png', alt: 'Wanderlooms', w: 500, h: 149 },
} as const;

export const WORK = {
  ...WORK_R2,
  items: WORK_R2.items.map((w) => ({ ...w, img: IMG[w.id as keyof typeof IMG], logo: LOGO[w.id as keyof typeof LOGO] })),
} as const;
