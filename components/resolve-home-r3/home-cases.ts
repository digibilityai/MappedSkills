import type { ShowcaseConfig } from '@/components/case-showcase/CaseShowcase';

/**
 * The homepage's two featured case studies (Brand DNA 4.0, D-05 and D-06): one per core service, each linked to its own detail page.
 * Read through the shared showcase loader, so the cards use each study's approved listing artwork, client name, figure or summary from the
 * PUBLIC library (the set `/work` shows); an unpublished study can never appear. The homepage keeps its own featured-work layout.
 */
export const HOME_CASES: ShowcaseConfig = {
  id: 'rv3-work-h',
  eyebrow: 'Featured work',
  heading: ['See the work behind the offer', ''],
  preferred: ['/portfolio/google-ads-for-online-courses', '/portfolio/wanderlooms-meta-ads'],
  viewAll: { label: 'View All Case Studies' },
  wrapClass: 'rv3-wrap',
};
