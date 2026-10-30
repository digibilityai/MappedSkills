import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { LeadGenBody } from '@/components/cplus/lead-generation/LeadGenBody';

/**
 * `/lead-generation`: the owner-approved G1 content (DEC-057) as six THE RESOLVE scenes (Stage 4 Batch 2C, DEC-095). The URL, title, canonical, H1, the global structured data
 * and this route's `BreadcrumbList` (same trail, same helpers) are unchanged. The meta description (and so the Open Graph
 * and Twitter description) is the owner-approved option A (LG-D19). The Direction C header and footer come from the root
 * layout.
 */
export const metadata = createMetadata(
  'Lead Generation Where the Unit Is an Enquiry You Can Act On | MappedSkills',
  'Lead generation that brings in enquiries worth calling back. We manage the campaigns; enquiries go directly to your own form, CRM or WhatsApp.',
  '/lead-generation'
);

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd label="Enquiry generation" path="/lead-generation" />
      <LeadGenBody />
    </>
  );
}
