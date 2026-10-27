import { siteMetadata } from '@/lib/metadata';
import { generateFAQSchema } from '@/lib/schema';
import { CARDS } from '../services/content';
import { FAQS as GOOGLE_FAQS } from '@/components/google-ads-r41/content';

const safe = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

/** /google-ads structured data added by the paid-advertising revamp: FAQPage (the visible questions of the frozen design) and the one
 * Google Ads Service node. The Service node is the same entity (same @id, name, description, provider, areaServed) as the
 * one /services emits, so the two pages do not conflict. The existing BreadcrumbList (route file) is unchanged. */
export function GoogleAdsJsonLd() {
  const base = siteMetadata.baseUrl;
  const c = CARDS.find((x) => x.id === 'google')!;
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${base}/services#${c.id}-ads`,
    name: `${c.name} management`,
    serviceType: `${c.name} management`,
    description: c.benefit,
    url: `${base}${c.href}`,
    provider: { '@id': `${base}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(generateFAQSchema(GOOGLE_FAQS.map(({ question, answer }) => ({ question, answer })))) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(service) }} />
    </>
  );
}
