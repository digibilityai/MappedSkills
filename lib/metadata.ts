import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';
const siteName = 'MappedSkills';
const author = 'MappedSkills';

export function resolveOgImageUrl(image?: string | null): string {
  const fallback = siteMetadata.ogFallbackImagePath;
  const rawImage = image || fallback;

  if (!rawImage) {
    return `${baseUrl}/ms_icon.webp`;
  }

  if (rawImage.startsWith('//')) {
    return `https:${rawImage}`;
  }

  if (rawImage.startsWith('http://') || rawImage.startsWith('https://')) {
    return rawImage;
  }

  const cleanPath = rawImage.startsWith('/') ? rawImage : `/${rawImage}`;
  return `${baseUrl}${cleanPath}`;
}

export function createMetadata(
  title: string,
  description: string,
  path: string = '/',
  image?: string | null,
  imageAlt?: string
): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = `${title}`;
  const ogImageUrl = resolveOgImageUrl(image);

  return {
    metadataBase: new URL(baseUrl),
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
      images: [
        {
          url: ogImageUrl,
          alt: imageAlt || title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
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
  // DEC-069: the corrected "MappedSkills" WORDMARK (M mark + "apped" in ink +
  // "Skills" in tangerine, no tagline), vector, in TWO CONTRAST VARIANTS.
  // `logoPath` carries ink text for LIGHT surfaces (the header); `logoPathOnDark`
  // carries light text for DARK surfaces (the footer). The previous raster
  // lockups, which read "MappedSkill", stay in public/ for rollback:
  // '/mappedskills-logo-light-bg.webp' and '/mappedskills-logo-dark-bg.webp'.
  logoPath: '/mappedskills-wordmark-light-bg.svg',
  logoPathOnDark: '/mappedskills-wordmark-dark-bg.svg',
  // Structured-data logo: a PNG export of the approved light LOCKUP (1278 × 288).
  // Google requires a format Google Images supports, ≥112 × 112px, that reads
  // on white; PNG is used rather than the SVG because not every consumer of
  // schema.org markup renders SVG (LOGO_G1_GATE.md §4 step 5).
  schemaLogoPath: '/mappedskills-logo-schema.png',
  // Browser icons live in public/ (icon.svg, favicon.ico, favicon-{16x16,32x32}.png,
  // apple-touch-icon.png, site.webmanifest) and are declared in app/layout.tsx.
  // `ms_icon.webp` is the old raster favicon; it is kept ONLY as the default
  // social-share image so share cards do not change with the favicon fix.
  ogFallbackImagePath: '/ms_icon.webp',
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

