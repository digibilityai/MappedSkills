import { siteMetadata, socialLinks } from './metadata';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.siteName,
    url: siteMetadata.baseUrl,
    email: siteMetadata.email,
    telephone: siteMetadata.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pune, Maharashtra, India',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: 'India',
      addressCountry: 'IN',
    },
    sameAs: [
      socialLinks.linkedin,
      socialLinks.facebook,
      socialLinks.instagram,
      socialLinks.twitter,
    ].filter(Boolean),
    description: 'Performance marketing agency specializing in Google Ads, social media ads, lead generation, SEO, and conversion optimization.',
    areaServed: ['IN'],
    priceRange: '₹₹',
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteMetadata.baseUrl}/#business`,
    name: siteMetadata.siteName,
    image: `${siteMetadata.baseUrl}${siteMetadata.logoPath}`,
    description: 'Performance marketing agency specializing in Google Ads, social media ads, lead generation, SEO, and conversion optimization.',
    url: siteMetadata.baseUrl,
    telephone: siteMetadata.phone,
    email: siteMetadata.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pune, Maharashtra, India',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: 'India',
      addressCountry: 'IN',
    },
    sameAs: [
      socialLinks.linkedin,
      socialLinks.facebook,
      socialLinks.instagram,
      socialLinks.twitter,
    ].filter(Boolean),
    areaServed: {
      '@type': 'City',
      name: ['Pune', 'Mumbai', 'India'],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: siteMetadata.phone,
      email: siteMetadata.email,
      availableLanguage: ['en', 'hi'],
    },
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
