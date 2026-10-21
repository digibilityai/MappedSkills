import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import type { CrumbStep } from '@/components/direction-c/primitives';
import { routeTrailJsonLd } from '@/components/routes/primitives';
import { CplusPage } from '@/components/cplus/CplusPage';
import { WorkBody } from '@/components/cplus/work/WorkBody';
import { FEATURED_SLUG } from '@/components/cplus/work/content';
import { splitStudies } from '@/components/cplus/work/studies';
import { fetchContentfulCaseStudies } from '@/lib/contentful/case-studies';

export const revalidate = 60;

/**
 * `/work` — the owner-approved C+ G1 R3 design (docs/work-redesign/g1-r3/), implemented in G2.
 *
 * - The URL, title, description and indexing (SEO-001) are unchanged.
 * - The studies are the published Contentful entries, read by the same listing query as before (one request) and
 *   shown in Contentful order with one featured. Any number renders; nothing is invented or hard-coded.
 * - Withheld proof stays withheld: the page reads only the client, industry, problem statement, challenges and
 *   services provided (`components/cplus/work/studies.ts`). No figure, result, testimonial or rating (DEC-031).
 * - "Check us" (method, AI visibility, enquiry path) is removed from this page only.
 * - Breadcrumb Home → Case studies (WK-D5): the visible breadcrumb and the `BreadcrumbList` come from one trail.
 */
export const metadata: Metadata = {
  ...createMetadata(
    'Work | MappedSkills',
    'Explore selected MappedSkills client projects, marketing challenges and approaches.',
    '/work'
  ),
};

const TRAIL: CrumbStep[] = [
  { name: 'Home', href: '/' },
  { name: 'Case studies', href: '/work' },
];

export default async function WorkPage() {
  const { featured, rest } = splitStudies(await fetchContentfulCaseStudies(), FEATURED_SLUG);

  return (
    <CplusPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: routeTrailJsonLd(TRAIL) }} />
      <WorkBody featured={featured} rest={rest} />
    </CplusPage>
  );
}
