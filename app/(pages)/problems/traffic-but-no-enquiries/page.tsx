import { createMetadata } from '@/lib/metadata';
import type { CrumbStep } from '@/components/direction-c/primitives';
import { routeTrailJsonLd } from '@/components/routes/primitives';
import { CplusPage } from '@/components/cplus/CplusPage';
import { TrafficBody } from '@/components/cplus/traffic/TrafficBody';

/**
 * `/problems/traffic-but-no-enquiries` — the approved C+ Traffic but no enquiries (revision 2) design
 * (proto/direction-c-plus 0a8b611) in production. The URL, canonical and the page's `BreadcrumbList` (same trail, same
 * trail function, so byte-identical) are unchanged; the title and description are updated (owner-approved) to describe
 * the page's three possible causes and three checks. The Direction C header and footer come from the root layout. The
 * live rule of no CTA in the first screen is kept by the design.
 */
export const metadata = createMetadata(
  'Traffic but No Enquiries? 3 Causes to Check | MappedSkills',
  'Getting website visitors but few enquiries? Explore three possible causes, three practical checks, and what to investigate next.',
  '/problems/traffic-but-no-enquiries'
);

/* "Problems" is a LABEL, not a link: no problems hub exists (`07_NAVIGATION_ARCHITECTURE.md` §6). The visible C+
   breadcrumb draws the same three steps. */
const TRAIL: CrumbStep[] = [
  { name: 'Home', href: '/' },
  { name: 'Problems', href: null },
  { name: 'Traffic but no enquiries', href: '/problems/traffic-but-no-enquiries' },
];

export default function TrafficButNoEnquiriesPage() {
  return (
    <CplusPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: routeTrailJsonLd(TRAIL) }} />
      <TrafficBody />
    </CplusPage>
  );
}
