import type { ShowcaseConfig } from '@/components/case-showcase/CaseShowcase';

/**
 * The /who-we-help/enquiry-led-businesses case showcase (DEC-116): Meticulous Business Plan, Phoenix Laundry, Talreja & Talreja; any other public study the old
 * related list matched (local services, professional services, Online Library) fills a gap. No existing /work filter represents this group (the library has no
 * "enquiry-led" service or industry, and professional services alone would leave out local services), so View all is the plain library link.
 */
export const ENQUIRY_LED_SHOWCASE: ShowcaseConfig = {
  id: 'e11-more-h',
  eyebrow: 'Relevant client work',
  heading: ['Enquiry-led business ', 'work we have done'],
  preferred: ['/portfolio/meticulous-business-plan-google-ads', '/portfolio/phoenix-laundry-google-ads', '/portfolio/talreja-talreja-google-ads'],
  fillAudience: 'enquiry-led',
  viewAll: { label: 'View all case studies' },
  tone: 'light',
  wrapClass: 'rv3-wrap',
};
