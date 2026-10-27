import { breadcrumbJsonLd } from '@/components/commercial/primitives';
import { generateFAQSchema } from '@/lib/schema';
import { FAQS as D2C_FAQS } from '@/components/d2c-r1/content';

const safe = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

/** /who-we-help/d2c structured data: BreadcrumbList (Home, D2C brands; there is no /who-we-help hub) and FAQPage matching the * visible questions of the frozen design. No Service node (this is an audience page), and no prices, ratings, reviews or results. */
export function D2CJsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd([{ name: 'Home', href: '/' }, { name: 'D2C brands', href: '/who-we-help/d2c' }]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(generateFAQSchema(D2C_FAQS.map(({ question, answer }) => ({ question, answer })))) }} />
    </>
  );
}
