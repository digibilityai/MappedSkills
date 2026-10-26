import { siteMetadata } from '@/lib/metadata';
import { generateFAQSchema } from '@/lib/schema';
import { CARDS } from '../services/content';
import { META_FAQS } from './content';

const safe = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

/** /social-media-ads structured data added by the paid-advertising revamp: FAQPage (the seven visible questions) and the one
 * Meta Ads Service node, the same entity (same @id and fields) as the one /services emits. The existing BreadcrumbList
 * (route file) is unchanged. */
export function MetaAdsJsonLd() {
  const base = siteMetadata.baseUrl;
  const c = CARDS.find((x) => x.id === 'meta')!;
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(generateFAQSchema([...META_FAQS])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe(service) }} />
    </>
  );
}
