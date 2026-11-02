import type { ShowcaseConfig } from '@/components/case-showcase/CaseShowcase';
import { SEO_PLAIN as S } from './content';

/**
 * The /seo case showcase (DEC-115). Cases in order. Each case's figure, definition and period come from its own library entry (as on /work); these
 * are the page's approved wordings where they differ, and the one qualification that belongs to each case. A figure is shown only while the study
 * has one, so Ameba Software shows its approved summary (no figure) until its proof is released. The heading and its id are the page's existing ones.
 */
const ACB = '/portfolio/anybodycanbake-seo';
export const SEO_SHOWCASE: ShowcaseConfig = {
  id: 'sk-h-proof',
  number: '03',
  eyebrow: S.proofKicker,
  heading: (hrefs) => (hrefs.includes(ACB) ? [`${S.proofH.a} `, S.proofH.b] : [`${S.proofHAlt.a} `, S.proofHAlt.b]),
  preferred: [ACB, '/portfolio/seo-ameba-software'],
  fillService: '/seo',
  viewAll: { service: '/seo', label: 'View all SEO case studies' },
  tone: 'light',
  wrapClass: 'pa-wrap',
  overrides: {
    [ACB]: {
      outcome: { v: '46.15%', c: 'more tracked organic course enquiries, from 91 to 133.' },
      period: 'May to July 2026 versus August to October 2026',
      note: 'A comparison of two periods, not proof that the work alone caused the change. The figures were supplied by MappedSkills and have not been independently checked.',
    },
    '/portfolio/seo-ameba-software': {
      note: 'A comparison of two three-month periods, not proof that the work alone caused the change.',
      summary: 'A B2B software company that wasn’t being found in search for the solutions it sells. We do not publish figures for this engagement.',
    },
  },
};
