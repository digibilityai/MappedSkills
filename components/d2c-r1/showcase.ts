import type { ShowcaseConfig } from '@/components/case-showcase/CaseShowcase';

/**
 * The /who-we-help/d2c case showcase (DEC-116): Klenzmo, Bakersville, Advit Prints; any other public eCommerce and retail study fills a gap (the rule the old
 * related list used). Replaces the Wanderlooms card and the related list WHILE THIS HAS CASES; with none public the page keeps its existing Wanderlooms card.
 * View all filters /work by the existing "eCommerce and retail" industry.
 */
export const D2C_SHOWCASE: ShowcaseConfig = {
  id: 'd2c1-wk-h',
  aliases: ['d2c1-more-h', 'client-work'],
  eyebrow: 'Relevant client work',
  heading: ['D2C and ecommerce work ', 'we have done'],
  preferred: ['/portfolio/klenzmo-meta-ads', '/portfolio/bakersville-google-ads', '/portfolio/advit-prints-meta-ads'],
  fillAudience: 'd2c',
  viewAll: { sector: 'ecommerce-retail', label: 'View all eCommerce and retail case studies' },
  tone: 'light',
  wrapClass: 'rv3-wrap',
};
