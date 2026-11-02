import type { ShowcaseConfig } from '@/components/case-showcase/CaseShowcase';

/**
 * The /services case showcase (B2, DEC-120): the shared CaseShowcase replaces the bespoke work cards. One case per core service, the same pair the
 * homepage features (DEC-118): AnybodyCanBake Google Ads and Wanderlooms Meta Ads. Read from the public library only, so a case that is not published
 * and eligible is skipped (the section hides at zero). No fill: the SEO case studies stay on /seo. The heading and its id are the page's existing ones;
 * the old section id (our-work) stays as an anchor. Paper tone: the neighbours are the dark core services section and the ground terms section.
 */
export const SERVICES_SHOWCASE: ShowcaseConfig = {
  id: 'sx-work',
  aliases: ['our-work'],
  eyebrow: 'Our work',
  heading: ['The work ', 'behind the offer'],
  preferred: ['/portfolio/google-ads-for-online-courses', '/portfolio/wanderlooms-meta-ads'],
  viewAll: { label: 'View all case studies' },
  tone: 'light',
  wrapClass: 'pa-wrap',
};
