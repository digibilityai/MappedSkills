import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';
const siteName = 'MappedSkills';
const author = 'MappedSkills';

export function createMetadata(
  title: string,
  description: string,
  path: string = '/'
): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = `${title}`;

  return {
    title,
    description,
    // SESSION 33 — PHASE I. A stray top-level `canonical` key was here. It is
    // not part of Next's `Metadata` type, emitted nothing, and was the source of
    // a standing TypeScript error. The canonical link is produced by
    // `alternates.canonical` below, which is the supported field and was already
    // present — so no route's canonical output changes.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export const siteMetadata = {
  siteName,
  author,
  baseUrl,
  // Official MappedSkills lockup (M mark + "Mapped" in ink + "Skill" in
  // tangerine), supplied as two contrast variants. `logoPath` carries dark
  // ink text for light surfaces (the header); `logoPathOnDark` carries white
  // text for dark surfaces (the footer). Replaces the legacy crimson
  // "MappedSkills Marketing / Clicks to Customers" mark, which predates THE
  // RESOLVE and does not use the brand's tangerine accent.
  logoPath: '/mappedskills-logo-light-bg.webp',
  logoPathOnDark: '/mappedskills-logo-dark-bg.webp',
  faviconPath: '/ms_icon.png',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'info@mappedskills.com',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 9873232662',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Pune, Maharashtra, India',
};

export const offices = [
  {
    city: 'Pune',
    label: 'Pune Office',
    addressLines: [
      'Tower C3, #503',
      'Nyati Esteban I',
      'Near Country Club, Undri',
      'Pune, Maharashtra 411060',
    ],
    phone: '+919873232662',
    phoneDisplay: '+91 9873232662',
  },
  {
    city: 'Mumbai',
    label: 'Mumbai Office',
    addressLines: [
      '#1002, Casa Urbano-O Wing',
      'Lodha Palava Phase 2',
      'Off Khoni-Taloja Bypass',
      'Dombivli (E), Maharashtra 421 204',
    ],
    phone: '+919272189706',
    phoneDisplay: '+91 9272189706',
  },
] as const;

// Analytics IDs
export const analytics = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
};

// Social URLs
export const socialLinks = {
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '',
};

// Calendly
export const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

