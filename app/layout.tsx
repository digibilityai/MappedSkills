import type { Metadata } from 'next'
import { Bricolage_Grotesque, Manrope } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnalyticsRouteListener } from '@/components/analytics/AnalyticsRouteListener'
import { GoogleTagManager } from '@/lib/gtm'
import { MetaPixel } from '@/lib/meta-pixel'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/schema'
import { siteMetadata } from '@/lib/metadata'
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
          SESSION 32 — PHASE H2 — ANALYTICS SURFACES, AND EXACTLY WHAT EACH IS.

          `GoogleTagManager` — the container script, and the ONE provider
          integration this application has. It renders `null` unless
          `NEXT_PUBLIC_GTM_ID` is set, which it is not in `.env.example`, so no
          third-party script loads today. This is the boundary every application
          event goes through: `lib/analytics.ts` pushes to `window.dataLayer`, the
          container decides which vendor hears about it. No `gtag`, no GA4 script
          and no vendor SDK is loaded from application code.

          `MetaPixel` — LEFT EXACTLY AS FOUND, and unconfigured. Whether Meta
          Pixel is retained at all is an open OWNER decision
          (`EVENT_TAXONOMY.md` §9 decision 4), so this session neither removes it
          nor wires anything to it. It renders nothing while
          `NEXT_PUBLIC_META_PIXEL_ID` is empty. Two defects are recorded rather
          than repaired, because repairing them would mean building on a provider
          nobody has chosen: it fires `PageView` once per DOCUMENT and so misses
          every App Router client navigation, and it has NO CONSENT GATE.

          CONSENT — UNRESOLVED, AND THE REASON THIS SECTION IS SAFE TODAY.
          No consent mechanism exists on this site and choosing one is an owner
          and legal decision. NEITHER `NEXT_PUBLIC_GTM_ID` NOR
          `NEXT_PUBLIC_META_PIXEL_ID` MAY BE SET IN PRODUCTION UNTIL IT DOES:
          setting either loads a third-party script unconditionally. Until then
          the site loads zero analytics scripts, and `dataLayer` is a first-party
          array in the visitor's own tab that sets no cookie and sends no request.

          `@vercel/analytics` WAS REMOVED HERE. It posts to
          `/_vercel/insights/event`, an endpoint that exists only on Vercel's
          platform. This site is served by `server.cjs` under cPanel/Passenger —
          there is no `vercel.json`, no `.vercel` directory and a dedicated
          `build:cpanel` script — so every beacon it sent could only 404. It was a
          third-party script and a dependency that could never produce a number.
        */}
        <GoogleTagManager />
        <MetaPixel />
        <AnalyticsRouteListener />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
