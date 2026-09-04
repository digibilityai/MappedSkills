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
  // CACHE POLICY — corrected in Session 23 (Phase A).
  //
  // Session 22 OBSERVED that the previous configuration served
  // `Cache-Control: public, max-age=31536000, immutable` on every HTML
  // document, because its intended exemption (`/:path*.(html|xml)`) matches a
  // file extension and App Router document routes have none. `immutable`
  // suppresses revalidation, so a redeploy would not have reached returning
  // visitors for up to a year.
  //
  // The policy now is: STOP OVERRIDING WHAT NEXT.JS ALREADY GETS RIGHT.
  //   - Documents carry NO application-level Cache-Control. Next.js sets the
  //     correct per-route policy itself, which is also what preserves the
  //     `no-store` behaviour already OBSERVED on 404s. Overriding it is what
  //     caused this defect; the fix is to stop overriding it.
  //   - `/_next/static/*` is NOT listed here either, for the same reason.
  //     Next.js already serves content-hashed assets as
  //     `public, max-age=31536000, immutable` in production, and as
  //     `no-cache, must-revalidate` under `next dev` — and it applies neither
  //     if something else has already set the header
  //     (node_modules/next/dist/server/lib/router-server.js, the
  //     `matchedOutput.type === 'nextStaticFolder'` branch). An explicit rule
  //     here is therefore redundant in production and actively wrong in
  //     development, where it would pin dev chunks as immutable. `next build`
  //     warns about exactly this.
  //   - `.xml` surfaces (the sitemap) keep the short revalidating policy that
  //     was already working live, because Next.js does not set one for them.
  headers: async () => [
    {
      // Security headers on every response. No caching policy here.
      source: '/:path*',
      headers: [
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
      ],
    },
    {
      // Sitemap and any other XML surface.
      source: '/:path*.xml',
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
