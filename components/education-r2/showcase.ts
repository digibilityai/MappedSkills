import type { ShowcaseConfig } from '@/components/case-showcase/CaseShowcase';

/**
 * The /who-we-help/education case showcase (DEC-116): AnybodyCanBake Google Ads, EKoching, Bakedemy Meta Ads (not Bakedemy Google Ads); any other public
 * education study fills a gap. Replaces the bespoke AnyBodyCanBake card and the related list. View all filters /work by the existing "Education and training" industry.
 */
export const EDUCATION_SHOWCASE: ShowcaseConfig = {
  id: 'edr2-wk-h',
  aliases: ['edr2-more-h', 'client-work'],
  eyebrow: 'Relevant client work',
  heading: ['Education and training work ', 'we have done'],
  preferred: ['/portfolio/google-ads-for-online-courses', '/portfolio/ekoching-google-ads', '/portfolio/bakedemy-meta-ads'],
  fillAudience: 'education',
  viewAll: { sector: 'education', label: 'View all education case studies' },
  tone: 'light',
  wrapClass: 'rv3-wrap',
};
