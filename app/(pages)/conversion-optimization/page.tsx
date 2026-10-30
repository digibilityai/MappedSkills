import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { ConversionBody } from '@/components/cplus/conversion-optimization/ConversionBody';

/**
 * `/conversion-optimization`: the owner-approved G1 content (DEC-055) as five THE RESOLVE scenes (Stage 4 Batch 2D, DEC-097). The URL, metadata (title, description, canonical,
 * Open Graph/Twitter), the H1, the global structured data and this route's `BreadcrumbList` (same trail, same helpers)
 * are unchanged. The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Conversion Rate Optimization: Find Where Visits Are Lost | MappedSkills',
  'Conversion rate optimization services that start with diagnosis, because in at least two of the four places demand gets lost, changing the page is the wrong intervention.',
  '/conversion-optimization'
);

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd label="The enquiry path" path="/conversion-optimization" />
      <ConversionBody />
    </>
  );
}
