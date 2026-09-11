import { offices, siteMetadata, socialLinks } from './metadata';

/**
 * SESSION 34 — PHASE I CLOSURE — THE ORGANIZATION ENTITY CARRIES NO POSTAL
 * ADDRESS, BECAUSE NO POSTAL ADDRESS HAS APPROVED PROVENANCE.
 *
 * WHAT SESSION 33 DID, AND WHY IT IS REVERSED HERE.
 *
 * Session 33 correctly removed `postalCode: 'India'` and the non-street
 * `streetAddress: 'Pune, Maharashtra, India'`. It then REBUILT the address
 * from `offices[0]` in `lib/metadata.ts` — "Tower C3, #503 / Nyati Esteban I /
 * Near Country Club, Undri / Pune, Maharashtra 411060" — on the reasoning that
 * the legacy site already published it, so the markup and the visible footer
 * could not drift apart.
 *
 * THAT REASONING IS EXPLICITLY FORBIDDEN BY THE GOVERNING RECORD.
 * `docs/05-content/OWNER_INPUT_REGISTER.md` item 2 ("Verified company facts")
 * is **BLOCKING** and unanswered. It requires from the OWNER "the complete
 * registered postal address INCLUDING A REAL POSTAL CODE", names "all
 * Organization/LocalBusiness schema" among what it blocks, and states in terms:
 *
 *     "Nothing here may be inferred from the existing site, because the
 *      existing site is part of the problem."
 *
 * and, as rule 1 of that register:
 *
 *     "No item here is answered by inference, BY READING THE EXISTING SITE, or
 *      by a plausible default."
 *
 * `docs/08-messaging/COPY_PLACEHOLDER_STANDARD.md` classifies the same item as
 * **BLOCKS COPY** for the NAP and entity blocks, naming the footer and all
 * Organization schema. `docs/16-ux/26_OWNER_BLOCKED_STRUCTURE_RULE.md` puts
 * `/contact` in case 0 on "complete NAP (owner)".
 *
 * `offices[0]` is legacy data: it is present unchanged at commit `14767db`,
 * the third-party push that predates this programme. It has never been
 * verified, approved or recorded as a programme decision. Deriving the
 * postcode from a legacy string is still inference from the existing site —
 * the mechanism is neater than typing "411060", the provenance is identical.
 *
 * WHAT IS REMOVED: the whole `PostalAddress` node — `streetAddress`,
 * `addressLocality`, `addressRegion`, `postalCode`, `addressCountry`. An
 * unverified locality and region are entity facts on exactly the same footing
 * as the postcode, and a `PostalAddress` reduced to a bare country asserts an
 * address while stating none. AN INCOMPLETE BUT TRUTHFUL ORGANIZATION IS
 * PREFERRED OVER A COMPLETE-LOOKING ONE BUILT ON UNSUPPORTED FACTS.
 *
 * WHAT IS RETAINED, AND ON WHAT BASIS:
 *   - `name` — the brand this site publishes under. NOT `legalName`: no legal
 *     entity name is asserted, because none is approved.
 *   - `url`, `@id`, `logo` — properties of this website, self-evidencing.
 *   - `email`, `telephone`, `contactPoint` — contact ROUTES, not entity
 *     location claims: each is a live channel a reader can use and the site
 *     already publishes them in the footer on every page. They remain listed
 *     as an owner item (register item 2 also asks the owner to confirm the
 *     published phone and email), but they assert no address.
 *   - `description` — the homepage's own approved meta description, verbatim.
 *   - `sameAs` — still filtered to `[]` while the social env vars are unset.
 *
 * NOT REINSTATED: `LocalBusiness`, `priceRange`, `areaServed`. Session 33's
 * reasoning for removing those stands and is not reopened.
 *
 * THE VISIBLE FOOTER ADDRESS IS NOT TOUCHED BY THIS CHANGE. It is published
 * page content whose disposition belongs to the owner-input register, not to
 * structured data; this file's scope is what the site ASSERTS TO MACHINES as a
 * verified entity fact.
 *
 * TO RESTORE THE ADDRESS: when register item 2 is answered and recorded in
 * `DECISION_LOG.md`, put the approved address in `lib/metadata.ts` and add the
 * `address` node back here, citing that decision id.
 */
export function generateOrganizationSchema() {
  const pune = offices[0];

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
