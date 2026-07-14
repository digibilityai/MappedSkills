/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        // Security Headers
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        // Performance Headers
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    // Override cache for HTML pages (more frequent updates)
    {
      source: '/:path*.(html|xml)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        },
      ],
    },
  ],
  redirects: async () => [
    // Legacy URL redirects
    {
      source: '/seo-services',
      destination: '/seo',
      permanent: true,
    },
    {
      source: '/google-ads-service',
      destination: '/google-ads',
      permanent: true,
    },
    {
      source: '/social-media-advertising',
      destination: '/social-media-ads',
      permanent: true,
    },
    {
      source: '/lead-generation-services',
      destination: '/lead-generation',
      permanent: true,
    },
    {
      source: '/content-marketing-services',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/digital-marketing-services',
      destination: '/services',
      permanent: true,
    },
    {
      source: '/contact-us',
      destination: '/contact',
      permanent: true,
    },
    {
      source: '/work',
      destination: '/results',
      permanent: true,
    },
  ],
}

export default nextConfig

