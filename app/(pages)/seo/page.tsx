import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { SeoBody } from '@/components/cplus/seo/SeoBody';

/**
 * `/seo`: the THE RESOLVE SEO page (Stage 4 Batch 2A; was the C+ Direction B page). The URL, canonical, Open Graph/Twitter generation, the global
 * structured data and this route's `BreadcrumbList` (same trail, same helpers) are unchanged; the title and description
 * were updated to match the redesigned page (owner-approved wording, 2026-10-15). The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'SEO Judged on the Enquiries It Produces | MappedSkills',
  'We help your business appear for relevant searches, improve the pages visitors land on and measure whether organic search brings genuine enquiries.',
  '/seo'
);

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd label="Search" path="/seo" />
      <SeoBody />
    </>
  );
}
