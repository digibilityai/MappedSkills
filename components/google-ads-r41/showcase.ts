import type { ShowcaseConfig } from '@/components/case-showcase/CaseShowcase';

/**
 * The /google-ads case showcase (DEC-116): AnybodyCanBake, Meticulous Business Plan, Bakersville; any other public Google Ads study fills a gap.
 * Replaces the bespoke `ga3-work` card and the "More Google Ads case studies" list; both old heading ids stay as anchors. Dark tone: the neighbours are paper.
 */
export const GOOGLE_ADS_SHOWCASE: ShowcaseConfig = {
  id: 'ga3-work-h',
  aliases: ['ga41-more-h'],
  eyebrow: 'Relevant client work',
  heading: ['Google Ads work ', 'we have done'],
  preferred: ['/portfolio/google-ads-for-online-courses', '/portfolio/meticulous-business-plan-google-ads', '/portfolio/bakersville-google-ads'],
  fillService: '/google-ads',
  viewAll: { service: '/google-ads', label: 'View all Google Ads case studies' },
  tone: 'dark',
  wrapClass: 'rv3-wrap',
};
