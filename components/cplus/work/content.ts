/**
 * `/work` copy: the owner-approved G1 R3 design (docs/work-redesign/g1-r3/WORK_G1_R3_NOTES.md), with the close body
 * and CTA labels from the G2 brief. Case-study facts are not here: they come from Contentful (see `studies.ts`).
 */
export const WORK = {
  crumb: 'Case studies',
  hero: {
    h1: { a: 'Real work.', b: 'Judge it for yourself.' },
    lede: 'Explore the challenges businesses brought to us, what we changed, and how we approached the work.',
  },
  work: {
    kicker: 'Client work',
    h: 'Real challenges. Real work.',
    intro: 'See what businesses needed help with, how we approached the problem, and what we changed.',
  },
  labels: {
    featured: 'Featured case study',
    challenge: 'The challenge',
    blockers: 'What stood in the way',
    changed: 'What we changed',
    stage: 'Where the work sat',
    read: 'Read the full case study',
  },
  note: {
    h: 'Good work deserves honest evidence.',
    body: 'We share what we did and what we can substantiate. Where results aren’t independently verified, we don’t present them as proven outcomes.',
  },
  close: {
    kicker: 'Have a problem like these?',
    h: 'Tell us what you’re trying to fix.',
    body: 'Tell us what you’re working towards. We’ll help you figure out where to start.',
    primary: 'Contact us',
    secondary: 'Request a call',
  },
} as const;

/** The featured study (R2-D2: the only named B2B client, with the richest published detail). If it is not
    published, the first study in Contentful order is featured instead. */
export const FEATURED_SLUG = 'seo-ameba-software';
