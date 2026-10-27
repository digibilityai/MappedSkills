import { breadcrumbJsonLd } from '@/components/commercial/primitives';
import { generateFAQSchema } from '@/lib/schema';
import { FAQS as RE_FAQS } from '@/components/real-estate-r2/content';

const safe = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

/** /who-we-help/real-estate structured data: BreadcrumbList (Home, Real Estate Developers; no /who-we-help hub) and FAQPage
 * matching the visible questions of the frozen design. No Service node, ratings, prices, reviews or results. */
export function RealEstateJsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd([{ name: 'Home', href: '/' }, { name: 'Real Estate Developers', href: '/who-we-help/real-estate' }]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(generateFAQSchema(RE_FAQS.map(({ question, answer }) => ({ question, answer })))) }} />
    </>
  );
}
