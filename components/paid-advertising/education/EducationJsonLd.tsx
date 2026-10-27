import { breadcrumbJsonLd } from '@/components/commercial/primitives';
import { generateFAQSchema } from '@/lib/schema';
import { FAQS as EDU_FAQS } from '@/components/education-r2/content';

const safe = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

/** /who-we-help/education structured data: BreadcrumbList (Home, Education businesses; no /who-we-help hub) and FAQPage matching
 * the visible questions of the frozen design. No Service node, ratings, prices, reviews or results. */
export function EducationJsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd([{ name: 'Home', href: '/' }, { name: 'Education businesses', href: '/who-we-help/education' }]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(generateFAQSchema(EDU_FAQS.map(({ question, answer }) => ({ question, answer })))) }} />
    </>
  );
}
