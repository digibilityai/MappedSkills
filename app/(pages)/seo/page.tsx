import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { CplusPage } from '@/components/cplus/CplusPage';
import { SeoBody } from '@/components/cplus/seo/SeoBody';

/**
 * `/seo` — the approved C+ SEO design (proto/direction-c-plus 0a8b611) in production. The URL, metadata
 * (title, description, canonical, Open Graph/Twitter), the global structured data and this route's `BreadcrumbList`
 * (same trail, same helpers) are unchanged. The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'SEO Judged on the Enquiries It Produces | B2B & Enterprise SEO | MappedSkills',
  'Technical foundations, structure and content aimed at searches that indicate someone wants to buy — then the page they land on, the enquiry they send, and the measurement that proves it happened.',
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
