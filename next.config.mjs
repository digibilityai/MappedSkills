/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isCpanelBuild = process.env.CPANEL_BUILD === '1'

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Shared hosts (CloudLinux) kill Next worker processes during static generation.
  // Force a single worker when CPANEL_BUILD=1.
  ...(isCpanelBuild
    ? {
        experimental: {
          workerThreads: false,
          cpus: 1,
        },
      }
    : {}),
  // Explicit alias so webpack resolves @/ even if tsconfig paths are missing on host
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }
    return config
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
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
      source: '/results',
      destination: '/work',
      permanent: true,
    },
    {
      source: '/results/:slug',
      destination: '/portfolio/:slug',
      permanent: true,
    },
  ],
}

export default nextConfig
