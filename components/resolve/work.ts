/**
 * Case-study cards shared by THE RESOLVE pages (About now, /work in Stage 3). Copy and destinations are the approved B2
 * About wording; no outcomes, figures or testimonials. Artwork is used only where it is already approved for the frozen
 * homepage (conceptual, and disclosed as such); a study without approved artwork gets the text-led fallback.
 * The frozen homepage keeps its own copy of the Om Sai artwork data and is not changed.
 */
import type { Motif } from '../case-study/CaseArt';
import type { Client } from '@/lib/clients';

export type WorkArt = {
  src: string;
  alt: string;
  note: string;
  logo?: { src: string; alt: string; w: number; h: number; fit: 'wide' | 'square' };
};

export type WorkStudy = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  art?: WorkArt;
  /** A code-drawn conceptual illustration (listing only, set by components/b2/work-cards.ts); About does not set it. */
  motif?: Motif;
  /** The client's logo from the register (lib/clients.ts), laid over the illustration on /work only. */
  clientLogo?: Client;
};

export const STUDIES: Record<'om-sai' | 'anybodycanbake', WorkStudy> = {
  'om-sai': {
    id: 'om-sai',
    eyebrow: 'Meta Ads · Real estate',
    title: 'Om Sai Developer',
    body: 'A Chembur developer that needed enquiries from people interested in its project.',
    href: '/portfolio/om-sai-developer-meta-ads',
    cta: 'Read the Meta Ads case study',
    art: {
      src: '/images/resolve-r3/omsai-work.webp',
      alt: 'Conceptual artwork of a contemporary residential tower with landscaped balconies at dusk',
      note: 'Conceptual artwork. Not a photograph of the project.',
      logo: { src: '/images/resolve-r3/omsai-logo.jpg', alt: 'Omsai Group', w: 400, h: 400, fit: 'square' },
    },
  },
  anybodycanbake: {
    id: 'anybodycanbake',
    eyebrow: 'Google Ads · Education and training',
    title: 'AnyBodyCanBake',
    body: 'A Pune online baking school that needed more students for its eggless and healthy baking courses.',
    href: '/portfolio/google-ads-for-online-courses',
    cta: 'Read the Google Ads case study',
  },
};
