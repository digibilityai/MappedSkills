import type { ShowcaseConfig } from '@/components/case-showcase/CaseShowcase';
import { WORK } from './content';

/**
 * The /social-media-ads case showcase (DEC-115): real estate enquiries, D2C purchases, education enrolments, most relevant first. A case that is not in
 * the public library is skipped. The heading and its id (mr1-work-h) are the page's existing ones; the old auto list's id (mr22-more-h) stays as an alias.
 * Each card's figure, definition and period come from the study's own library entry, exactly as `/work` shows them.
 */
export const META_SHOWCASE: ShowcaseConfig = {
  id: 'mr1-work-h',
  aliases: ['mr22-more-h'],
  eyebrow: WORK.eyebrow,
  heading: WORK.h2,
  preferred: ['/portfolio/om-sai-developer-meta-ads', '/portfolio/klenzmo-meta-ads', '/portfolio/anybodycanbake-meta-ads'],
  fillService: '/social-media-ads',
  viewAll: { service: '/social-media-ads', label: 'View all Meta Ads case studies' },
  tone: 'light',
  wrapClass: 'rv3-wrap',
};
