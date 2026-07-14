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
    canonical: url,
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
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'info@mappedskills.com',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 9873232662',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Pune, Maharashtra, India',
};

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

