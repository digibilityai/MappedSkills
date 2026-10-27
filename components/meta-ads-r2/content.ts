/** /social-media-ads, Meta Ads R2 review variant (27 October 2026). NOT live. Only the client-work section differs from R1;
 * everything else is re-exported unchanged. No client imagery exists, so the two cards use labelled conceptual illustrations.
 * No outcomes, figures, testimonials or deliverables. Copy rule: no dashes used as punctuation.
 */
export { META, HERO, FEED_DEMO, INTENT, FORMATS, JOURNEY, MANAGE, MEASURE, PROCESS, FAQS, CLOSE } from '../meta-ads-r1/content';

export const WORK = {
  eyebrow: 'Relevant client work',
  h2: ['Meta Ads work ', 'we have done'],
  label: 'Conceptual illustration, not client work',
  items: [
    { id: 'om-sai', scene: 'home', tag: 'Real estate', name: 'Om Sai Developer, Mumbai',
      body: 'Selling 2 and 3 BHK apartments in Chembur to a specific buyer brief. We moved the campaign from broad property ads to creative and messaging built around the project’s lifestyle, to reach relevant buyers.',
      link: { href: '/portfolio/om-sai-developer-meta-ads', label: 'Read the case study' }, fact: null },
    { id: 'wanderlooms', scene: 'trail', tag: 'Adventure apparel', name: 'Wanderlooms',
      body: 'Meta advertising for an adventure apparel brand.',
      link: null, fact: 'Featured on Shark Tank India' },
  ],
  note: 'These examples show our approach, not guaranteed results.',
  all: { href: '/work', label: 'See our work' },
} as const;
