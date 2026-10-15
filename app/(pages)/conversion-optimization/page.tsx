import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ConversionBody } from '@/components/cplus/conversion-optimization/ConversionBody';

/**
 * `/conversion-optimization` — the approved C+ Conversion Optimization design (proto/direction-c-plus 0a8b611) in production. The URL, metadata
 * (title, description, canonical, Open Graph/Twitter), the global structured data and this route's `BreadcrumbList`
 * (same trail, same helpers) are unchanged. The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Conversion Rate Optimization: Find Where Visits Are Lost | MappedSkills',
  'Conversion rate optimization services that start with diagnosis, because in at least two of the four places demand gets lost, changing the page is the wrong intervention.',
  '/conversion-optimization'
);

export default function Page() {
  return (
    <CplusPage>
      <BreadcrumbJsonLd label="The enquiry path" path="/conversion-optimization" />
      <ConversionBody />
    </CplusPage>
  );
}
