import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { CplusPage } from '@/components/cplus/CplusPage';
import { SeoBody } from '@/components/cplus/seo/SeoBody';

/**
 * `/seo` — the redesigned, visually led C+ SEO page. The URL, canonical, Open Graph/Twitter generation, the global
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
    <CplusPage>
      <BreadcrumbJsonLd label="Search" path="/seo" />
      <SeoBody />
    </CplusPage>
  );
}
