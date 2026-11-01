import type { ShowcaseConfig } from '@/components/case-showcase/CaseShowcase';

/**
 * The /who-we-help/real-estate case showcase (DEC-116): Om Sai Developer, HutnHomes; any other public real estate study fills a gap. Replaces the bespoke Om Sai
 * card and the related list. View all filters /work by the existing "Real estate" industry.
 */
export const REAL_ESTATE_SHOWCASE: ShowcaseConfig = {
  id: 'rer2-wk-h',
  aliases: ['rer2-more-h', 'client-work'],
  eyebrow: 'Relevant client work',
  heading: ['Real estate work ', 'we have done'],
  preferred: ['/portfolio/om-sai-developer-meta-ads', '/portfolio/hutnhomes-meta-ads'],
  fillAudience: 'real-estate',
  viewAll: { sector: 'real-estate', label: 'View all real estate case studies' },
  tone: 'light',
  wrapClass: 'rv3-wrap',
};
