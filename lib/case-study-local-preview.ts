import type { Document } from '@contentful/rich-text-types';
import type { ContentfulCaseStudy } from '@/lib/contentful/types';

/**
 * DEVELOPMENT-PREVIEW ONLY. The revised AnybodyCanBake (Google Ads) study as Contentful fields, so the founder can review
 * the page and its listing card before Contentful is changed. It applies only when `NODE_ENV === 'development'` AND
 * `CASE_STUDY_LOCAL_PREVIEW=1`; `next build`, `next start`, the tests and every deployment ignore it, so it can never reach
 * production. It replaces the one entry with this ID (or is the only entry when Contentful is not configured) and goes
 * through the same mapper, eligibility rule and template as a real entry. These fields are the owner-run field package
 * (docs/work-redesign/abc-google-ads/ABC_FIELD_PACKAGE.md), unchanged.
 *
 * Remove this file (and its call in `lib/contentful/case-studies.ts`) once the entry is updated in Contentful.
 * Source of every statement: the founder's approval draft (30 October 2026) and the confirmed facts recorded in the field
 * package. Nothing here is invented; no testimonial is included.
 */
export const ABC_ENTRY_ID = '6Ycb7aYvXrslOXKchQnqmi';

type Run = string | { b: string };
const t = (value: string, bold = false) => ({ nodeType: 'text', value, marks: bold ? [{ type: 'bold' }] : [], data: {} });
const runs = (parts: Run[]) => parts.map((p) => (typeof p === 'string' ? t(p) : t(p.b, true)));
const p = (...parts: Run[]) => ({ nodeType: 'paragraph', data: {}, content: runs(parts) });
const li = (...parts: Run[]) => ({ nodeType: 'list-item', data: {}, content: [p(...parts)] });
const ul = (...items: ReturnType<typeof li>[]) => ({ nodeType: 'unordered-list', data: {}, content: items });
const doc = (...content: unknown[]) => ({ nodeType: 'document', data: {}, content }) as unknown as Document;

export const ABC_SUMMARY =
  'AnybodyCanBake wanted direct purchases for its online baking courses. MappedSkills managed Search and Display campaigns and made changes to keywords, ads, targeting and landing pages. From February 2020 to August 2021, Google Ads was credited with 1,410 paid enrolments and ₹66.36 lakh in reported revenue.';

export const ABC_EVIDENCE_NOTE =
  'Engagement details and results were supplied by MappedSkills founder Amit Gupta, who confirmed the figures from business records and reconciled enrolments and revenue with Google Ads advertising data. Figures cover February 2020 to August 2021, and revenue excludes refunds. Cost per enrolment and ROAS are calculated from the reported totals. These are whole-period results, not a before-and-after comparison. They have not been independently audited and do not show how much revenue advertising alone caused. ROAS reflects reported revenue divided by advertising spend; it does not represent profit or include management fees and other business costs.';

export const ABC_PROBLEM = doc(
  p({ b: 'Turning interest in online baking into paid enrolments' }),
  p('AnybodyCanBake needed to reach potential learners and turn their interest into direct course purchases. There were no earlier recorded Google Ads campaigns to provide a performance baseline.'),
  ul(
    li({ b: 'Reach relevant learners:' }, ' The advertising needed to connect with people interested in the school’s online baking offering.'),
    li({ b: 'Give people a reason to enrol:' }, ' The ads and landing pages needed to help prospective learners understand the offer and take the next step.'),
    li({ b: 'Measure purchases:' }, ' The objective was paid enrolments, rather than clicks or enquiry volume alone.'),
  ),
);

export const ABC_WHAT_WE_DID = doc(
  p({ b: 'Work on the ads and the page together' }),
  p('We managed Google Search and Display campaigns with direct course purchases as the objective. The work covered both how people reached the website and the pages they saw after clicking.'),
  ul(
    li({ b: 'Keyword changes:' }, ' We revised the keywords used in the campaigns to support the course-purchase objective.'),
    li({ b: 'Ad and targeting changes:' }, ' We changed the ads and targeting to improve how the learning offer was presented to potential students.'),
    li({ b: 'Landing page changes:' }, ' We changed the landing pages as part of the same campaign effort, rather than treating the ad click as the end of the journey.'),
  ),
);

export const ABC_IMPACT = doc(
  p({ b: '1,410 paid enrolments and ₹66.36 lakh in reported revenue' }),
  p('Across February 2020 to August 2021, the reported Google Ads results were 1,410 paid enrolments and ₹66,36,000 in revenue on ₹12,66,390 of advertising spend.'),
  ul(
    li({ b: '5.24×' }, ' return on advertising spend. About ₹5.24 of reported revenue for each ₹1 of advertising spend. Calculated from the reported totals, February 2020 to August 2021.'),
    li({ b: '1,410' }, ' paid enrolments attributed to Google Ads, February 2020 to August 2021.'),
    li({ b: '₹66,36,000' }, ' in reported revenue, excluding refunds, February 2020 to August 2021.'),
    li({ b: '₹12,66,390' }, ' in advertising spend, February 2020 to August 2021.'),
    li({ b: '₹898.15' }, ' cost per paid enrolment. Advertising spend divided by paid enrolments, calculated from the reported totals.'),
  ),
);

/** The Contentful-shaped entry. Published fields are those the page reads; `content` is the legacy body and is left empty. */
export const abcPreviewEntry = (): ContentfulCaseStudy => ({
  sys: { id: ABC_ENTRY_ID, firstPublishedAt: '2026-10-30T00:00:00.000Z', publishedAt: '2026-10-30T00:00:00.000Z', publishedVersion: 2 },
  title: '1,410 paid enrolments attributed to Google Ads',
  slug: 'google-ads-for-online-courses',
  clientName: { clientName: 'AnybodyCanBake, Pune, India', date: '' },
  industry: { name: 'Education and training' },
  summary: ABC_SUMMARY,
  problem: { json: ABC_PROBLEM },
  whatWeDid: { json: ABC_WHAT_WE_DID },
  impact: { json: ABC_IMPACT },
  evidenceNote: ABC_EVIDENCE_NOTE,
  showTestimonial: false,
  sector: 'education',
  serviceKey: '/google-ads',
  periodStart: '2020-02-01',
  periodEnd: '2021-08-31',
});

const enabled = () => process.env.NODE_ENV === 'development' && process.env.CASE_STUDY_LOCAL_PREVIEW === '1';

/** Outside the local preview this returns its input unchanged. */
export function withLocalPreview(entries: ContentfulCaseStudy[]): ContentfulCaseStudy[] {
  if (!enabled()) return entries;
  const others = entries.filter((e) => e.sys.id !== ABC_ENTRY_ID);
  return [...others, abcPreviewEntry()];
}

export const localPreviewActive = enabled;
