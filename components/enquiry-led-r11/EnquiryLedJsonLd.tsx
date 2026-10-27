import { breadcrumbJsonLd } from '@/components/commercial/primitives';
import { generateFAQSchema } from '@/lib/schema';
import { FAQS } from './content';

const safe = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

/** /who-we-help/enquiry-led-businesses structured data: BreadcrumbList (Home, Enquiry-led businesses; no /who-we-help hub) and
 * FAQPage matching the visible questions. No Service node, ratings, prices, reviews or results. */
export function EnquiryLedJsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd([{ name: 'Home', href: '/' }, { name: 'Enquiry-led businesses', href: '/who-we-help/enquiry-led-businesses' }]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(generateFAQSchema(FAQS.map(({ question, answer }) => ({ question, answer })))) }} />
    </>
  );
}
