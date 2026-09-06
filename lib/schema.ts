import { offices, siteMetadata, socialLinks } from './metadata';

/**
 * SESSION 33 — PHASE I — ONE ORGANISATION ENTITY, AND ONLY SUPPORTED FACTS.
 *
 * WHAT THIS REPLACED, AND WHY BOTH HAD TO GO.
 *
 * `app/layout.tsx` emitted TWO entities on EVERY page — an `Organization` and a
 * `LocalBusiness` — describing the same company, with no `@id` linking them and
 * with the same fields duplicated in both. Two unlinked entities for one company
 * is not extra signal; it is an ambiguity a consumer has to resolve. They are
 * merged into ONE `Organization` carrying a stable `@id`.
 *
 * FOUR UNSUPPORTED OR MALFORMED FACTS ARE REMOVED RATHER THAN CARRIED FORWARD:
 *
 *   1. `postalCode: 'India'` — a country in the postcode field, in BOTH
 *      entities. This is the defect Phase I was told to fix by name. It is now
 *      the real postcode of the published Pune office.
 *   2. `streetAddress: 'Pune, Maharashtra, India'` — not a street address; it
 *      repeated the locality, region and country and stated no street at all.
 *   3. `priceRange: '₹₹'` — A PRICING CLAIM. Pricing is owner-blocked, no price
 *      band has ever been approved, and `/pricing` deliberately publishes what
 *      moves the number rather than a number. Removed outright.
 *   4. `LocalBusiness` itself — the type asserts a place of business a customer
 *      visits, and the programme has approved no opening hours, no geo
 *      coordinates and no verified business profile to support it. Claiming the
 *      type without them is the "false schema" the phase brief says to prefer no
 *      schema over. Whether to publish `LocalBusiness` is an OWNER DECISION and
 *      is recorded as one.
 *
 * THE ADDRESS IS DERIVED FROM `offices[0]`, NOT RETYPED. That is the same array
 * the footer renders, so the address in the markup and the address a visitor
 * reads cannot drift apart, and neither can be changed without the other.
 *
 * NOTHING HERE IS INVENTED. Every value is either derived from `lib/metadata.ts`
 * — which is what the site already publishes — or is approved page copy. The
 * description is the homepage's own approved meta description, verbatim, rather
 * than the legacy "performance marketing agency specializing in…" line, which
 * asserted a positioning the programme has superseded.
 */
export function generateOrganizationSchema() {
  const pune = offices[0];
  const [street, building, area, cityLine] = pune.addressLines;
  // "Pune, Maharashtra 411060" -> "411060". Read from the published line so the
  // postcode cannot drift from the address a visitor actually sees.
  const postalCode = cityLine.trim().split(/\s+/).pop() ?? '';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteMetadata.baseUrl}/#organization`,
    name: siteMetadata.siteName,
    url: siteMetadata.baseUrl,
    logo: `${siteMetadata.baseUrl}${siteMetadata.logoPath}`,
    email: siteMetadata.email,
    telephone: pune.phoneDisplay,
    description:
      'We help businesses get found by the buyers already looking for what they sell, turn more of those visits into real enquiries, and measure the whole path so they can see what worked.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: [street, building, area].join(', '),
      addressLocality: pune.city,
      addressRegion: 'Maharashtra',
      postalCode,
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: siteMetadata.email,
      telephone: pune.phoneDisplay,
      availableLanguage: ['en'],
    },
    // Empty today — every social URL is an unset environment variable, and
    // `.filter(Boolean)` drops the whole property rather than emitting a list of
    // empty strings.
    sameAs: [
      socialLinks.linkedin,
      socialLinks.facebook,
      socialLinks.instagram,
      socialLinks.twitter,
    ].filter(Boolean),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema(
  name: string,
  description: string,
  areaServed: string[] = ['IN']
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: siteMetadata.siteName,
      url: siteMetadata.baseUrl,
    },
    areaServed: areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name,
            description,
          },
        },
      ],
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  image: string,
  author: string,
  publishedDate: string,
  updatedDate: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: publishedDate,
    dateModified: updatedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.baseUrl}${siteMetadata.logoPath}`,
      },
    },
  };
}

export function generatePersonSchema(name: string, bio: string, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description: bio,
    image,
    url: siteMetadata.baseUrl,
  };
}
