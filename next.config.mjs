/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isCpanelBuild = process.env.CPANEL_BUILD === '1'

const STATIC_CACHE = {
  key: 'Cache-Control',
  value: 'public, max-age=31536000, immutable',
}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // Critters inlines above-the-fold CSS and defers the rest (PageSpeed
    // render-blocking CSS). Build-time only; not required on the Passenger host.
    optimizeCss: true,
    // Tree-shake lucide (and similar barrel packages) so Header/Footer icons
    // do not pull the whole icon set into every page chunk.
    optimizePackageImports: ['lucide-react'],
    ...(isCpanelBuild
      ? {
          workerThreads: false,
          cpus: 1,
        }
      : {}),
  },
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
          // SESSION 33 — PHASE I. Was `1; mode=block`. The XSS Auditor this
          // enables was REMOVED from Chrome and Edge, is not implemented by
          // Firefox, and in the browsers that still honour it the filter has
          // itself been a source of vulnerabilities — it can be induced to
          // strip legitimate script or to leak cross-origin information.
          // `0` is the value OWASP recommends: explicitly disable the legacy
          // filter and let the CSP below carry the protection. The header is
          // kept rather than deleted so a browser that has a default-on filter
          // is told to turn it off.
          key: 'X-XSS-Protection',
          value: '0',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          /*
            SESSION 33 — PHASE I — A DELIBERATELY PARTIAL CONTENT-SECURITY-POLICY.

            WHAT IS HERE, AND WHY EACH DIRECTIVE IS SAFE TO SHIP TODAY:

              `base-uri 'self'`      An injected `<base>` tag can silently
                                     repoint every relative URL on the page —
                                     including the contact form's action — at an
                                     attacker's origin. Nothing in this
                                     application sets `<base>`.
              `object-src 'none'`    No `<object>`, `<embed>` or `<applet>`
                                     exists anywhere in this codebase. Closes the
                                     legacy plugin injection class outright.
              `frame-ancestors 'self'` The modern replacement for
                                     `X-Frame-Options`, which is kept above for
                                     browsers that do not read CSP. Nothing
                                     embeds this site.
              `form-action 'self'`   There is exactly ONE `<form>` in the
                                     application, it has no `action` attribute
                                     and it posts to same-origin
                                     `/api/enquiry`. Stops an injected form from
                                     posting a visitor's enquiry off-site.

            WHAT IS DELIBERATELY ABSENT, AND WHY — this is the staged part.

            THERE IS NO `default-src`, NO `script-src` AND NO `style-src`. That
            is not an oversight and it is not laziness. Next.js injects inline
            bootstrap and hydration scripts into every document; restricting
            `script-src` without allowing them requires a per-request nonce, and
            a per-request nonce requires DYNAMIC RENDERING — which would convert
            all 25 statically prerendered routes of this site into
            server-rendered ones. Trading the site's entire static-rendering
            model for a directive is not a hardening win, and the alternative —
            `script-src 'self' 'unsafe-inline'` — permits exactly the injection
            it appears to prevent while looking like protection. The phase brief
            asks for a documented staged plan over a knowingly wrong policy.

            Because no `default-src` is declared, the directives above are the
            ONLY ones that apply: scripts, styles, images, fonts, frames and
            connections are unrestricted, so nothing here can break a page.

            STAGE 2, when analytics is reopened: add `script-src`,
            `connect-src`, `img-src` and `frame-src` covering
            `*.googletagmanager.com` and `*.google-analytics.com`, decided
            together with the nonce-vs-static-rendering trade-off. Adding it
            before the container's tag set is settled would produce a policy
            that has to be rewritten the day analytics goes live.
          */
          key: 'Content-Security-Policy',
          value: [
            "base-uri 'self'",
            "object-src 'none'",
            "frame-ancestors 'self'",
            "form-action 'self'",
          ].join('; '),
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
    // Public files in /public are served by Node under Passenger and previously
    // had no Cache-Control at all (PageSpeed: /ms_Logo.webp TTL none). Do NOT
    // apply this to HTML documents or to /_next/static (Next already sets the
    // hashed-asset policy, and overriding it is wrong in `next dev`).
    {
      source: '/ms_Logo.webp',
      headers: [STATIC_CACHE],
    },
    {
      source: '/ms_icon.png',
      headers: [STATIC_CACHE],
    },
    {
      source: '/icon.svg',
      headers: [STATIC_CACHE],
    },
    {
      source: '/mappedskills-logo-light-bg.webp',
      headers: [STATIC_CACHE],
    },
    {
      source: '/mappedskills-logo-dark-bg.webp',
      headers: [STATIC_CACHE],
    },
    {
      source: '/mappedskills-logo-light-bg.png',
      headers: [STATIC_CACHE],
    },
    {
      source: '/mappedskills-logo-dark-bg.png',
      headers: [STATIC_CACHE],
    },
    {
      source: '/images/:path*',
      headers: [STATIC_CACHE],
    },
  ],
  redirects: async () => [
    /*
      SESSION 33 — PHASE I — HOST CANONICALISATION, www -> apex.

      THE DEFECT: Phase A0 observed www and apex both answering 200 with no
      redirect between them, while every canonical link on the site points at
      the apex. That is textbook host duplication — two addresses for one page,
      and a canonical that contradicts one of them.

      WHY IT IS IMPLEMENTED HERE. `has: [{ type: 'host' }]` is matched by Next's
      own request handler, which `server.cjs` delegates to, so this works under
      the cPanel/Passenger custom-server deployment without any hosting change.
      `:path*` preserves the path, Next forwards the query string unmodified,
      and the destination is written with an explicit `https://` scheme so the
      redirect can never downgrade a secure request.

      NO LOOP AND NO DEV BREAKAGE ARE POSSIBLE. The condition matches ONE exact
      host, `www.mappedskills.com`, and sends it to a DIFFERENT host, so the
      destination can never re-match. `localhost`, `127.0.0.1`, a preview host
      and the apex itself all fail the condition and are untouched.

      ⚠ DEPLOYMENT-OWNED PRECONDITION, NOT SATISFIED BY THIS FILE. This only
      fires if the www request actually reaches the Node process. If LiteSpeed
      or cPanel answers `www.` from a different document root, terminates it, or
      does not proxy that hostname to the app at all, this rule never runs and
      the duplication remains. It must be verified against the real deployment:

          curl -sSIL https://www.mappedskills.com/pricing | grep -i '^HTTP/\|^location:'

      Expect a 308 to https://mappedskills.com/pricing, then a 200. If the first
      response is a 200 instead, the redirect belongs at the hosting layer and
      must be added there. It is NOT faked in application code.
    */
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.mappedskills.com' }],
      destination: 'https://mappedskills.com/:path*',
      permanent: true,
    },
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
