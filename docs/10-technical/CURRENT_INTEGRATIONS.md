# Current Integrations Inventory

**Status:** Session 01 read-only audit output
**Date:** 2026-08-31
**Branch:** `test_branch`
**HEAD:** `566d3e36d69354861b4656aa73ef1eedac1a9370`
**Basis:** Repository inspection only. No live network verification, no vendor dashboards consulted.

## Secret Handling
**VERIFIED FACT:** No secret values were found committed to the repository. `.env.example` contains variable names with empty or non-sensitive default values only. The only pattern matches for credential-shaped strings were the placeholders `GTM-XXXXXXX` and `G-XXXXXXXXXX` inside `app/(pages)/launch-checklist/page.tsx`. No secret values are reproduced in this document.

**VERIFIED FACT:** `.gitignore` excludes `.env*.local`. `git ls-files` shows only `.env.example` tracked. No `.env` or `.env.local` file is present in the working tree.

---

## 1. Integration Table

| Integration | Purpose | Location | Environment variables | Current status | Migration sensitivity |
|---|---|---|---|---|---|
| **Contentful (GraphQL Delivery API)** | Blog posts and case studies — the only CMS in the system | `lib/contentful/client.ts`, `posts.ts`, `case-studies.ts`, `queries.ts`, `mappers.ts`, `types.ts`, `case-study-sections.ts` | `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_ENVIRONMENT` (defaults `master`) | **Implemented and load-bearing.** Fails soft: `getContentfulConfig()` returns `null` when credentials are absent, `contentfulGraphql` logs a warning and returns `null`, and pages render empty. Fetches use `next: { revalidate: 60 }`. Query limits hard-capped at 100 items. | **Critical** — sole source of all blog and case-study URLs |
| **Google Tag Manager** | Container for all downstream analytics/ads tags | `lib/gtm.tsx`, mounted in `app/layout.tsx` | `NEXT_PUBLIC_GTM_ID` | **Implemented, conditional.** Renders `null` when the ID is unset. Loads with `next/script` `strategy="afterInteractive"`, plus a `<noscript>` iframe. Exposes `dataLayer` helpers: `trackEvent`, `trackCTAClick`, `trackFormSubmit`, `trackFormError`, `trackPhoneClick`, `trackEmailClick`, `trackCalendlyBooking`. | **Critical** — measurement continuity |
| **GA4** | Web analytics | No direct implementation | `NEXT_PUBLIC_GA4_ID` | **Declared but not wired in code.** The variable exists in `.env.example` and `lib/metadata.ts` `analytics.ga4Id`, but nothing reads it to inject a GA4 tag. Components call `window.gtag(...)` directly in five places, which only functions if GTM (or another loader) has defined `gtag`. **INFERENCE:** GA4 is expected to be deployed via the GTM container, not via code. **UNKNOWN:** whether the GTM container actually contains a GA4 tag. | **Critical** |
| **Meta Pixel** | Facebook/Instagram ads conversion tracking | `lib/meta-pixel.tsx`, mounted in `app/layout.tsx` | `NEXT_PUBLIC_META_PIXEL_ID` | **Implemented, conditional.** Injects the pixel via a manually created `<script>` in a `useEffect`, then fires `init` + `PageView`. Helper `trackMetaPixelEvent` exported. Also fired ad-hoc as `fbq('track','Lead')` and `fbq('track','Subscribe')` inside `lib/tracking.ts` — which is itself dead code (see below). | High |
| **Vercel Analytics** | Page-view analytics | `app/layout.tsx` — `<Analytics />` from `@vercel/analytics/next`, gated on `NODE_ENV === 'production'` | none | **Implemented but almost certainly inert.** `doc/cpanel-deploy.md` and `.github/workflows/deploy.yml` show deployment to a cPanel/Passenger host over SSH, not to Vercel. **INFERENCE:** on non-Vercel hosting this ships a third-party script that cannot report. | Low — safe to remove, but confirm hosting first |
| **Calendly** | Meeting booking on `/schedule-call` | `components/forms/CalendlyEmbed.tsx`, `components/forms/CalendlyButton.tsx` | `NEXT_PUBLIC_CALENDLY_URL` | **Implemented with a defect and a fallback.** When the URL is unset, renders a fallback card offering phone/email. When set, it loads `assets.calendly.com/assets/external/widget.js` and calls `Calendly.initBadgeWidget(...)` — the **badge** widget API — while rendering a `div.calendly-inline-widget` container. **INFERENCE:** the inline embed will not populate; the API called does not match the container rendered. Requires live verification. | **Critical** — primary conversion path |
| **Google Search Console** | Site verification | No implementation | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | **Declared but not wired.** The variable exists in `.env.example` but nothing in `app/layout.tsx` or `lib/metadata.ts` emits a verification meta tag. **INFERENCE:** verification is likely handled by DNS or file upload. **UNKNOWN:** whether the property is verified. | High |
| **Google Fonts** | Montserrat + Inter | `app/layout.tsx` via `next/font/google` | none | **Implemented well.** Self-hosted at build time by `next/font`, `display: 'swap'`, exposed as `--font-montserrat` / `--font-inter`. No render-blocking external font request. | Low |
| **Contentful image CDN** | Blog/case-study imagery | `next.config.mjs` `images.remotePatterns` allows `images.ctfassets.net` | none | **Configured**, but see Performance note: `images.unoptimized: true` is set globally, so Next.js image optimisation is disabled for all sources including this one. | Medium |
| **GitHub Actions → cPanel over SSH** | CI/CD | `.github/workflows/deploy.yml` | Repo secrets: `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`, `SSH_PORT` | **Implemented.** Triggers on push to `main` and on manual dispatch. `rsync --delete` to `/home/$SSH_USER/mappedskills.com/`, excluding `.git/`, `node_modules/`, `.next/`, `tmp/`, `.env`, `.env.*`. Then remotely runs `npm install && npm run build:cpanel` and touches `tmp/restart.txt` to restart Passenger. | **Critical** — the only deployment path |

---

## 2. Integrations Declared but Absent

| Integration | Evidence of expectation | Status |
|---|---|---|
| **Contact form backend** | `.env.example` declares `CONTACT_NOTIFICATION_EMAIL=info@mappedskills.com`; `lib/tracking.ts` POSTs to `/api/contact`; `components/forms/ContactForm.tsx` contains a commented-out `fetch('/api/contact')` | **Does not exist.** There is no `app/api/` directory and no `route.ts` anywhere. `lib/tracking.ts` is never imported by any page or component — it is dead code. The live form simulates submission with `await new Promise(r => setTimeout(r, 1000))`. |
| **Newsletter / email service** | `components/forms/BlogNewsletterForm.tsx` comment: "In production, integrate with email service (Mailchimp, ConvertKit, etc)" | **Does not exist.** The handler fires a `gtag` event, then sets a success message. No network call is made. |
| **CRM** | No code reference | **Does not exist.** No CRM, no lead routing, no webhook, no lead-source or attribution field capture anywhere in the codebase. |
| **Consent management / cookie banner** | `app/(pages)/privacy-policy/page.tsx` line 264 states a banner "should be added before launch" | **Does not exist.** GTM and Meta Pixel load unconditionally on every page with no consent gate. |
| **OG image generation** | `lib/og-image.ts` builds URLs pointing at `/api/og` and a default asset `/og-default.jpg` | **Does not exist.** No `/api/og` route; no `og-default.jpg` in `public/`. The entire module is dead code — never imported. |
| **LinkedIn Insight Tag** | none | Not implemented |
| **Microsoft / Bing UET** | none | Not implemented |
| **Google Ads conversion tag (direct)** | none | Not implemented in code. **INFERENCE:** expected via GTM. |
| **Session recording / heatmaps** (Hotjar, Clarity, etc.) | none | Not implemented |
| **Call tracking** | none | Not implemented. Phone numbers are static `tel:` links. |
| **Spam protection** (reCAPTCHA, Turnstile, honeypot, rate limiting) | none | Not implemented on any form |

---

## 3. Environment Variables Referenced in Code

**VERIFIED FACT.** Names only; no values recorded.

| Variable | Read in | Fallback in code |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `lib/metadata.ts`, `lib/og-image.ts`, `lib/contentful/mappers.ts`, `app/robots.ts`, `app/sitemap.ts` | `https://mappedskills.com` |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | `lib/metadata.ts` | `info@mappedskills.com` |
| `NEXT_PUBLIC_BUSINESS_PHONE` | `lib/metadata.ts` | `+91 9873232662` |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | `lib/metadata.ts` | `Pune, Maharashtra, India` |
| `NEXT_PUBLIC_GTM_ID` | `lib/gtm.tsx`, `lib/metadata.ts` | none — component returns `null` |
| `NEXT_PUBLIC_GA4_ID` | `lib/metadata.ts` only (never consumed) | none |
| `NEXT_PUBLIC_META_PIXEL_ID` | `lib/meta-pixel.tsx`, `lib/metadata.ts` | none — effect returns early |
| `NEXT_PUBLIC_CALENDLY_URL` | `lib/metadata.ts` | `''` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | declared in `.env.example` only | n/a |
| `NEXT_PUBLIC_LINKEDIN_URL` / `_FACEBOOK_URL` / `_INSTAGRAM_URL` / `_TWITTER_URL` | `lib/metadata.ts` → `socialLinks` → schema `sameAs` | `''` |
| `CONTACT_NOTIFICATION_EMAIL` | declared in `.env.example` only; no consumer exists | n/a |
| `CONTENTFUL_SPACE_ID` | `lib/contentful/client.ts` | none — integration disables itself |
| `CONTENTFUL_ACCESS_TOKEN` | `lib/contentful/client.ts` | none — integration disables itself |
| `CONTENTFUL_ENVIRONMENT` | `lib/contentful/client.ts` | `master` |
| `CPANEL_BUILD` | `next.config.mjs` | unset → normal build |
| `ENABLE_INTERNAL_PAGES` | `app/(pages)/launch-checklist/page.tsx` | unset → route 404s in production |
| `NODE_ENV` | `app/layout.tsx`, `app/(pages)/launch-checklist/page.tsx` | n/a |
| `PORT`, `HOSTNAME` | `server.cjs` | `3000`, `0.0.0.0` |

---

## 4. Integration Risks for Migration

1. **Contentful is the single point of failure for every dynamic URL.** Losing or rotating the delivery token silently empties `/blog`, `/work`, all `/blog/[slug]`, all `/portfolio/[slug]`, and shrinks the sitemap to 15 URLs — with no build failure and no error page. The failure mode is a silent 200 with empty content.
2. **The lead capture path is not connected to anything.** Both forms present success states to the user without transmitting data. Any leads submitted since this code shipped were not delivered. This should be confirmed against production before any redesign work begins.
3. **`sameAs` and footer social links disagree.** Schema `sameAs` is built from `NEXT_PUBLIC_*_URL` env vars, while `components/layout/Footer.tsx` hard-codes `linkedin.com/company/mappedskills`, `facebook.com/mappedskills`, `instagram.com/mappedskills`. If the env vars are unset in production, the Organization/LocalBusiness schema carries an empty `sameAs` array while the page visibly links to those profiles — an avoidable entity-consolidation gap.
4. **Analytics continuity depends entirely on a GTM container this repository cannot see.** Any redesign must treat the container configuration as an external asset to be inventoried separately before URLs or CTA markup change.
5. **Calendly embed likely non-functional.** The site's primary CTA on every page routes to `/schedule-call`. Verify the embed renders in production before treating the booking funnel as working.
