import type { Metadata } from 'next'
import { Bricolage_Grotesque, Manrope } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnalyticsRouteListener } from '@/components/analytics/AnalyticsRouteListener'
import { ConsentProvider } from '@/components/analytics/ConsentProvider'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'
import { GoogleTagManager } from '@/lib/gtm'
import { MetaPixel } from '@/lib/meta-pixel'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/schema'
import { siteMetadata } from '@/lib/metadata'
import { CONSENT_BOOTSTRAP_SCRIPT } from '@/lib/consent'
import './globals.css'

// THE RESOLVE — display + body. Self-hosted and preloaded by next/font, so
// there is no runtime request to Google Fonts. Both are variable fonts; weight
// is set in CSS rather than by shipping extra static cuts.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'MappedSkills - Performance Marketing for SaaS',
  description: 'Accelerate your SaaS growth with data-driven performance marketing. Google Ads, social media, lead generation, and conversion optimization.',
  generator: 'v0.app',
  icons: {
    icon: siteMetadata.faviconPath,
    apple: siteMetadata.faviconPath,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={`${bricolage.variable} ${manrope.variable}`}>
      <head>
        {/*
          SESSION 33 — PHASE H2 — GOOGLE CONSENT MODE v2 DEFAULTS.

          THIS MUST STAY THE FIRST ELEMENT IN THIS HEAD. It is a plain,
          synchronous, inline script rather than a `next/script` element
          precisely so that its ordering is a property of the DOCUMENT and not
          of a framework strategy: it executes before the body parses, before
          React hydrates, and before any other script this application inserts.

          It puts `consent default` with ALL FOUR SIGNALS DENIED —
          `analytics_storage`, `ad_storage`, `ad_user_data`,
          `ad_personalization` — at the front of `dataLayer`, then replays a
          stored acceptance as a `consent update`. A Google tag therefore cannot
          observe a granted state that the visitor never chose, no matter when
          or whether a container loads.

          It sets no cookie, sends no request and loads nothing. Every value in
          it is a literal from `lib/consent.ts`; nothing is interpolated.
        */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP_SCRIPT }} />
        {/* Global Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className={`${bricolage.variable} ${manrope.variable} font-sans antialiased bg-background text-foreground`}>
        <a href="#main" className="skip-link">Skip to main content</a>
        {/*
          SESSION 33 — PHASE H2 — ANALYTICS SURFACES, AND EXACTLY WHAT EACH IS.

          `ConsentProvider` — the single source of truth for the visitor's
          decision, read once from `localStorage` after mount and shared by the
          banner, the footer's preferences control and the container loader. The
          DENIED DEFAULT does not depend on it: that is already in `dataLayer`,
          pushed by the inline bootstrap in the head above, before this tree
          exists.

          `ConsentBanner` — placed here, immediately after the skip link, so a
          keyboard or screen-reader visitor reaches the question in two tabs
          rather than after the whole header. It is painted at the bottom of the
          viewport, is not a dialog, traps no focus, blocks no navigation and no
          form, and renders nothing at all once a decision is on record.

          `GoogleTagManager` — the container script, and the ONE provider
          integration this application has. TWO GATES, BOTH REQUIRED:
          `NEXT_PUBLIC_GTM_ID` must be set AND the visitor must have accepted
          analytics. Undecided and declined both load nothing — no script
          element, no request to Google. This is the boundary every application
          event goes through: `lib/analytics.ts` pushes to `window.dataLayer`,
          the container decides which vendor hears about it. No `gtag`, no GA4
          script and no vendor SDK is loaded from application code, and no
          `window.gtag` global is defined by this application.

          `MetaPixel` — LEFT EXACTLY AS FOUND, UNCONFIGURED, AND STILL WITHOUT A
          CONSENT GATE. Whether Meta Pixel is retained at all is an open OWNER
          decision (`EVENT_TAXONOMY.md` §9 decision 4) and this phase does not
          enable advertising, so this session neither removes it nor wires it to
          the consent state. It renders nothing while
          `NEXT_PUBLIC_META_PIXEL_ID` is empty.

          ⚠ `NEXT_PUBLIC_META_PIXEL_ID` MUST NOT BE SET. The consent work in this
          session covers GOOGLE ONLY. Setting that variable would load
          `fbevents.js` and fire `PageView` for every visitor regardless of what
          they chose, because this component never reads the consent state. Its
          two other recorded defects also stand: it fires once per DOCUMENT and
          so misses every App Router client navigation.

          `@vercel/analytics` WAS REMOVED HERE in Session 32. It posts to
          `/_vercel/insights/event`, an endpoint that exists only on Vercel's
          platform. This site is served by `server.cjs` under cPanel/Passenger —
          there is no `vercel.json`, no `.vercel` directory and a dedicated
          `build:cpanel` script — so every beacon it sent could only 404.
        */}
        <ConsentProvider>
          <ConsentBanner />
          <GoogleTagManager />
          <MetaPixel />
          <AnalyticsRouteListener />
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ConsentProvider>
      </body>
    </html>
  )
}
