import type { Metadata } from 'next'
import { Bricolage_Grotesque, Manrope } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AnalyticsRouteListener } from '@/components/analytics/AnalyticsRouteListener'
import { ConsentProvider } from '@/components/analytics/ConsentProvider'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'
import { GoogleTagManager } from '@/lib/gtm'
import { MetaPixel } from '@/lib/meta-pixel'
import { generateOrganizationSchema } from '@/lib/schema'
import { CONSENT_BOOTSTRAP_SCRIPT, CONSENT_PENDING_SCRIPT } from '@/lib/consent'
import { ChromeSwitch } from '@/components/direction-c/ChromeSwitch'
import { SiteHeader } from '@/components/direction-c/SiteHeader'
import { SiteFooter } from '@/components/direction-c/SiteFooter'
import './globals.css'
// UI Revamp Gate 2 (DEC-034): Direction C. Every class and token is `dc-`
// prefixed, so it styles only elements that opt in; see the file header.
import './direction-c.css'

// THE RESOLVE — display + body. Self-hosted and preloaded by next/font, so
// there is no runtime request to Google Fonts. Both are variable fonts; weight
// is set in CSS rather than by shipping extra static cuts.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});
// OBS-19 (DEC-047): next/font's automatic fallback sizes Arial REGULAR once
// for every weight (bold synthesised), so buttons, labels and the consent
// banner re-wrapped when Manrope arrived late. It is replaced by the
// weight-specific, calibrated "Manrope Fallback" faces in app/globals.css
// (Arial for 100–500, Arial Bold for 600–900). Manrope itself is unchanged.
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  adjustFontFallback: false,
  fallback: ['"Manrope Fallback"'],
});

/*
  SESSION 33 — PHASE I. THIS IS A FALLBACK AND NOTHING MORE: every route in this
  application exports its own `metadata`, so nothing a visitor or a crawler sees
  comes from here. It carried "Performance Marketing for SaaS" and "Accelerate
  your SaaS growth" — a positioning the programme has superseded, and a segment
  claim ("SaaS") that appears nowhere else on the site. Both are replaced with
  the homepage's own approved title and description rather than a new line.

  `generator: 'v0.app'` is removed. It named the tool the original site was
  scaffolded with, is inaccurate for this codebase, and is published in the
  document head.
*/
export const metadata: Metadata = {
  title: 'MappedSkills | Judge Us on the Enquiries, Not the Traffic',
  description: 'We help businesses get found by the buyers already looking for what they sell, turn more of those visits into real enquiries, and measure the whole path so they can see what worked.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={`${bricolage.variable} ${manrope.variable}`} suppressHydrationWarning>
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
        {/* Sets `data-consent-pending` on <html> before first paint when no choice is stored (see lib/consent.ts). */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_PENDING_SCRIPT }} />
        {/*
          SESSION 33 — PHASE I — ONE global entity, not two.

          This emitted an `Organization` AND a `LocalBusiness` on every page,
          unlinked, describing the same company with the same fields duplicated
          — and both carried `postalCode: "India"`, a fake `streetAddress`, and
          a `priceRange` pricing claim that is owner-blocked. They are merged
          into one `Organization` with a stable `@id`, built from the same
          `offices` array the footer renders. See `lib/schema.ts`.

          Page-level `BreadcrumbList` (Phase F/G primitives) and the `/faq`
          `FAQPage` are unchanged: both are generated from the visible content
          on their own page, so neither can assert something a reader cannot
          see.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${bricolage.variable} ${manrope.variable} font-sans antialiased bg-background text-foreground`}>
        {/*
          OBS-19 (DEC-047) — Firefox does not load a later @font-face in a
          family list while an earlier one is loading, so while Manrope
          downloads it skipped "Manrope Fallback" and set the text in
          system-ui. One hidden element per calibrated face, in flow BEFORE any
          content, names that face first, so laying it out loads the face (the
          OBS-18 mechanism, components/direction-c/primitives.tsx). Zero
          height, `visibility: hidden`, `aria-hidden`, glyph from CSS
          generated content (app/globals.css, `.site-font-prime`); no script.
        */}
        <span aria-hidden="true" className="site-font-prime site-font-prime--regular" />
        <span aria-hidden="true" className="site-font-prime site-font-prime--bold" />
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

          `MetaPixel` — UNCONFIGURED, and now behind the SAME TWO GATES as the
          container: `NEXT_PUBLIC_META_PIXEL_ID` must be set AND the visitor
          must have accepted analytics. Whether Meta Pixel is retained at all
          remains an open OWNER decision (`EVENT_TAXONOMY.md` §9 decision 4);
          the gate does not pre-empt it, it only makes "retained" safe. It
          renders nothing while `NEXT_PUBLIC_META_PIXEL_ID` is empty.

          The repository-audit session added that consent gate. Until then this
          component read no consent state, so setting that one variable would
          have loaded `fbevents.js` and fired `PageView` for every visitor
          regardless of what they chose — a ⚠ comment was the only thing
          preventing it. Its other recorded defect still stands: it fires once
          per DOCUMENT and so misses every App Router client navigation.

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
          {/* UI Revamp Gate 4 B1 (DEC-037): Direction C chrome on every route.
              The legacy Header and Footer render only for a pathname in the
              (empty) LEGACY_CHROME_ROUTES rollback list. B11 removes the seam. */}
          <ChromeSwitch legacy={<Header />} next={<SiteHeader />} />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <ChromeSwitch legacy={<Footer />} next={<SiteFooter />} />
        </ConsentProvider>
      </body>
    </html>
  )
}
