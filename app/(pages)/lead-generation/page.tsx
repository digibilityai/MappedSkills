import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { CplusPage } from '@/components/cplus/CplusPage';
import { LeadGenBody } from '@/components/cplus/lead-generation/LeadGenBody';

/**
 * `/lead-generation` — the approved C+ Lead generation design (proto/direction-c-plus 0a8b611) in production. The URL, metadata
 * (title, description, canonical, Open Graph/Twitter), the global structured data and this route's `BreadcrumbList`
 * (same trail, same helpers) are unchanged. The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Lead Generation Where the Unit Is an Enquiry You Can Act On | MappedSkills',
  'Enquiries from real businesses, with a real need, worth picking up the phone about — with a published definition of what counts as one, and that definition is the number we report.',
  '/lead-generation'
);

export default function Page() {
  return (
    <CplusPage>
      <BreadcrumbJsonLd label="Enquiry generation" path="/lead-generation" />
      <LeadGenBody />
    </CplusPage>
  );
}
