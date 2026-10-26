import { breadcrumbJsonLd } from '@/components/commercial/primitives';
import { siteMetadata } from '@/lib/metadata';
import { generateFAQSchema } from '@/lib/schema';
import { CARDS, SERVICES_FAQS } from './content';

const safe = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

/** /services structured data, each node matching visible content: BreadcrumbList, FAQPage (the six visible questions) and
 * one Service per core service. areaServed is a Country (India). No prices, ratings, reviews or client figures. */
export function ServicesJsonLd() {
  const base = siteMetadata.baseUrl;
  const services = CARDS.map((c) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${base}/services#${c.id}-ads`,
    name: `${c.name} management`,
    serviceType: `${c.name} management`,
    description: c.benefit,
    url: `${base}${c.href}`,
    provider: { '@id': `${base}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
  }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd([{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }]) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(generateFAQSchema([...SERVICES_FAQS])) }} />
      {services.map((s) => <script key={s['@id']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(s) }} />)}
    </>
  );
}
