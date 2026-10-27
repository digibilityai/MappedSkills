import { createMetadata } from '@/lib/metadata';
import { EnquiryLedR11 } from '@/components/enquiry-led-r11/EnquiryLedR11';
import { EnquiryLedJsonLd } from '@/components/enquiry-led-r11/EnquiryLedJsonLd';
import { META } from '@/components/enquiry-led-r11/content';

/**
 * `/who-we-help/enquiry-led-businesses`: the Enquiry-Led Businesses audience page (frozen R1.1 design, 27 October 2026; D2).
 * A new route with no legacy SEO to preserve (`/who-we-help` has no hub). The title and description are working metadata
 * and are to be validated against search results before release; `/lead-generation` stays the service page. Header and footer
 * come from the root layout.
 */
export const metadata = createMetadata(META.title, META.description, '/who-we-help/enquiry-led-businesses');

export default function Page() {
  return (
    <>
      <EnquiryLedJsonLd />
      <EnquiryLedR11 />
    </>
  );
}
