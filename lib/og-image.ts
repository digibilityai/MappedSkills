import { type ReactNode } from 'react';

interface OGImageConfig {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

/**
 * Generate Open Graph image with text overlay
 * Used for social sharing optimization
 */
export function generateOGImageUrl(config: OGImageConfig): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';
  
  // Use Vercel OG Image generation or a default image
  const params = new URLSearchParams({
    title: config.title,
    description: config.description || '',
  });

  // Option 1: Use Vercel's built-in OG image generation
  // This requires setting up the /api/og endpoint
  return `${baseUrl}/api/og?${params.toString()}`;
}

/**
 * Get optimized OG metadata for a page
 */
export interface OGMetadata {
  'og:title': string;
  'og:description': string;
  'og:image': string;
  'og:image:alt': string;
  'og:type': string;
  'og:url': string;
  'twitter:card': string;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:image': string;
}

export function getOGMetadata(
  title: string,
  description: string,
  url: string,
  imageUrl?: string
): Partial<OGMetadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com';
  const fullUrl = `${baseUrl}${url}`;
  const ogImage = imageUrl || `${baseUrl}/og-default.jpg`;

  return {
    'og:title': title,
    'og:description': description,
    'og:image': ogImage,
    'og:image:alt': title,
    'og:type': 'website',
    'og:url': fullUrl,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': ogImage,
  };
}
