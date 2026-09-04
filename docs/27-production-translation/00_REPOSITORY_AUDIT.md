# Session 21 — Production Application Audit

**Session:** 21 — Production Translation / Implementation Planning · **Date:** 2026-09-04
**Branch:** `test_branch` · **HEAD at audit:** `91a82b7`
**Status:** **PLANNING ARTEFACT. No production file was created, modified or staged.**

Every statement below is a **VERIFIED FACT** read out of the repository at `91a82b7`, unless it
carries an explicit label. Where a fact's *runtime consequence* could not be observed without
deploying, it is labelled **RESEARCH REQUIRED** rather than asserted.

---

## 1. Stack

| | |
|---|---|
| **Framework** | **Next.js `16.2.6`**, React `^19`, React DOM `^19` |
| **Router** | **App Router.** `app/layout.tsx`, `app/page.tsx`, a single `(pages)` route group, `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`. **No `pages/` directory** |
| **Language** | **TypeScript `5.7.3`**, `strict: true`, `jsx: react-jsx`, path alias `@/*` → `./*`. **`next.config.mjs` sets `typescript.ignoreBuildErrors: true`** — the build does not enforce the type checker |
| **Bundler** | **Webpack, explicitly** — `next dev --webpack`, `next build --webpack`. Turbopack is not in use. `next.config.mjs` adds a manual `@` webpack alias "even if tsconfig paths are missing on host" |
| **Styling** | **Tailwind CSS v4** (`tailwindcss ^4.2.0`, `@tailwindcss/postcss ^4.2.0`). **CSS-first configuration — there is no `tailwind.config.*` file.** Tokens live in `app/globals.css` under `@theme inline`. `tw-animate-css` is present |
| **Component kit** | **shadcn/ui**, `new-york` style, `rsc: true`, `baseColor: neutral`, `cssVariables: true`, icons `lucide-react`. **56 files under `components/ui/`**, backed by 30 `@radix-ui/*` packages |
| **Animation library** | **NONE.** No Framer Motion, no GSAP, no `motion`, no Lenis, no Lottie — verified against `package.json` |
| **Content layer** | **Contentful**, via the **GraphQL Content Delivery API** called with `fetch` in `lib/contentful/client.ts`. No Contentful SDK dependency. Fails soft: `getContentfulConfig()` returns `null` and `contentfulGraphql` warns and returns `null` when env vars are absent |
| **Deployment** | **Custom Node server** — `server.cjs` (`createServer` + `next({dev:false})`), `npm start` → `node server.cjs`. A **cPanel / CloudLinux shared-host path** exists: `build:cpanel` forces `workerThreads:false`, `cpus:1`, `RAYON_NUM_THREADS=1`, `UV_THREADPOOL_SIZE=1`, `--max-old-space-size=512`. `prebuild` runs `scripts/verify-server-files.cjs`. A `pack:cpanel` PowerShell packer exists |
| **Analytics** | `@vercel/analytics` (production-gated in `layout.tsx`), plus **GTM** (`lib/gtm.tsx`) and **Meta Pixel** (`lib/meta-pixel.tsx`), both env-gated and rendering `null` when unset |

> **Implication for THE RESOLVE.** The stack imposes **no constraint** on the validated experience.
> The prototype needs CSS custom properties, CSS transitions, `IntersectionObserver` and one
> `requestAnimationFrame` scroll handler. All four are available without adding a dependency.
> **A custom Node server means route handlers and server actions are fully available** — the
> absence of a form backend is *unbuilt work*, not a platform limitation.

## 2. Routes as they exist

**21 `page.tsx` files + `not-found.tsx`.**

| Route | Notes |
|---|---|
| `/` | `revalidate = 60`; awaits `getBlogListPosts()` |
| `/about` `/faq` `/how-it-works` `/services` `/pricing` `/work` | static |
| `/seo` `/google-ads` `/social-media-ads` `/lead-generation` `/conversion-optimization` | commercial |
| `/contact` `/schedule-call` `/thank-you` | conversion surfaces |
| `/blog` · `/blog/[slug]` | `revalidate = 60`, `generateStaticParams` |
| `/portfolio/[slug]` | `revalidate = 60`, `generateStaticParams`. **No `/portfolio` index route** |
| `/privacy-policy` `/terms` `/launch-checklist` | `noindex` |
| `not-found.tsx` | `noindex` |

**`noindex` is set on 5 routes:** `/thank-you`, `/privacy-policy`, `/terms`, `/launch-checklist`,
`not-found`.

**9 permanent redirects** in `next.config.mjs` (`permanent: true` → Next emits **308**):
`/seo-services`→`/seo` · `/google-ads-service`→`/google-ads` ·
`/social-media-advertising`→`/social-media-ads` · `/lead-generation-services`→`/lead-generation` ·
`/content-marketing-services`→`/blog` · `/digital-marketing-services`→`/services` ·
`/contact-us`→`/contact` · `/results`→`/work` · `/results/:slug`→`/portfolio/:slug`.

**Routes required by the approved IA that do not exist:** `/ai-seo` ·
`/problems/traffic-but-no-enquiries` · `/research` · `/research/{ai-visibility-baseline}` ·
`/research/{own-site-enquiry-diagnostic}` · `/work/[slug]` · `/portfolio` (bare).

**Zero `loading.tsx`, zero `error.tsx`, zero `template.tsx` in the entire `app/` tree.**

## 3. Global styling — the single largest translation surface

`app/globals.css` (330 lines) is imported by `app/layout.tsx` as `'./globals.css'`.
**`styles/globals.css` (125 lines) is imported by nothing** — verified orphan.

### 3.1 The site is currently forced-dark

`app/layout.tsx` renders `<html lang="en" className={`dark scroll-smooth …`}>`. The `dark` class
is **hard-coded, not toggled** — `next-themes` is a dependency and `components/theme-provider.tsx`
exists, but neither is mounted in the layout.

`globals.css` then carries a **manual light-surface repair block**: a 20-selector list
(`.bg-white`, `.bg-ms-light`, `.bg-red-50`, `.bg-orange-50/50`, `.from-red-50`, …) that locally
re-declares `--foreground`, `--primary`, `--muted-foreground`, `--border` and a literal
`color: #1a1a1a`, because those Tailwind utilities paint a light background under a dark token
set. A second block does the inverse for `html.dark .dark\:bg-*-950\/20` callouts.

> **This is the most important finding in the audit.** THE RESOLVE is **light-first by decision**
> (`DEC-018` §4.1). Going light is therefore not a palette swap on top of the current system — it
> **deletes the reason those two repair blocks exist**. They must be removed *with* the flip, in
> the same change, or they will fight the new ground. See `01_TRANSLATION_ARCHITECTURE.md` §3.

### 3.2 Current tokens (to be replaced)

| Current | Value | Resolve replacement |
|---|---|---|
| `--ms-red` / `--accent` / `--ring` | `#C41E3A` crimson | `--tang` `#FF5B04` + its two darkened ramp steps |
| `--background` (dark) | `#0F0F0F` | `--ivory` `#F7F3EC` |
| `--foreground` (dark) | `#f5f5f5` | `--ink` `#141219` |
| `--font-sans` | `var(--font-inter)` | Manrope |
| `--font-heading` | `var(--font-montserrat)` | Bricolage Grotesque |
| `--font-mono` | `'Geist Mono'` | **removed — no monospace anywhere** |
| `--radius` | `0.75rem` | pill CTAs (`100px`); no card radius system |
| chart-1…5 | 5 hues incl. `#cc00ff` | not part of THE RESOLVE |

`lib/design-system.ts` duplicates the same palette and type stack **in TypeScript**, a second
source of truth that must move or go.

### 3.3 Global element rules that will fight the Resolve composition

Inside `@layer base` in `globals.css`:

- **`section { @apply py-16 }`** — every `<section>` on the site gets 64px vertical padding.
  THE RESOLVE's section rhythm is `clamp()`-driven and per-chapter.
- **`a { @apply text-accent hover:text-accent/80 … underline-offset-4 hover:underline }`**, declared
  **twice**. Every link on the site is accent-coloured. The Resolve prototype sets `a{color:inherit}`
  and colours links deliberately, per context.
- **`h1`–`h4` @apply font-heading font-bold** with a fixed responsive size ladder.
- **`ul, ol { @apply space-y-3 pl-6 }`** — global list indentation.
- **`input:focus … @apply ring-2 ring-accent ring-offset-2`** vs the prototype's
  `:focus-visible{outline:3px solid var(--ink);outline-offset:3px}`.

**Monospace usage in production is 2 occurrences:** `app/(pages)/launch-checklist/page.tsx:142`
(internal, `noindex`) and `components/ui/chart.tsx:236` (a shadcn internal). Neither is on a public
Resolve surface, so the "no monospace" rule is cheap to honour.

## 4. Fonts and images

- **Fonts:** `next/font/google` — `Montserrat` and `Inter`, both `display: 'swap'`, exposed as
  `--font-montserrat` / `--font-inter` and applied on `<html>` *and* `<body>`.
  `next/font` self-hosts and preloads; **this mechanism is correct and should be kept**, with the
  two families swapped for Bricolage Grotesque + Manrope.
- **Images:** `next.config.mjs` sets **`images.unoptimized: true`**, with a `remotePatterns` entry
  for `images.ctfassets.net`. `public/` holds 4 PNGs, `ms_Logo.webp`, `ms_icon.png` and 5
  placeholder assets. There is also a **4.1 MB `public.zip`** committed at the repository root.

> The approved homepage renders **zero `<img>`**, so image optimisation is **not** a homepage
> rollout dependency. It becomes one for `/blog` and `/work`.

## 5. Client / server boundaries

53 files carry `'use client'`. Of those, **50 are `components/ui/*`, `hooks/*` or the two
tag-manager files.** The genuinely page-level client components are only:

`components/layout/Header.tsx` · `components/Logo.tsx` · `components/forms/ContactForm.tsx` ·
`components/forms/CalendlyEmbed.tsx` · `components/forms/CalendlyButton.tsx` ·
`components/forms/BlogNewsletterForm.tsx` · `components/filters/CategoryFilter.tsx` ·
`components/filters/ResultsFilter.tsx` · `components/blog/SocialShare.tsx`.

**Every page component and every section/card component is a server component.** This is a healthy
starting point and the Resolve interaction islands can be added without inverting it.

## 6. The component tree is not duplicated — it is aliased

`components/` appears to hold 27 duplicate pairs (`components/Hero.tsx` *and*
`components/sections/Hero.tsx`). **It does not.** Every root-level file is a one-line re-export:

```
components/Hero.tsx      →  export { Hero } from '@/components/sections/Hero'
components/Container.tsx →  export { Container } from '@/components/layout/Container'
```

Application code imports the **root alias** (`@/components/Section` — 22 call sites;
`@/components/Container` — 22; `@/components/CTASection` — 14; `@/components/Hero` — 13), and each
categorised file is imported exactly once, by its own shim.

> **Consequence for planning: do not budget a de-duplication project.** The shim layer is a
> working indirection seam and is genuinely useful here — a Resolve replacement can be swapped in
> behind the alias without touching 22 call sites.

## 7. Forms and booking — the state of the conversion surfaces

**`components/forms/ContactForm.tsx` does not submit anywhere.**

```
// Simulate API call - in production, replace with actual backend endpoint
await new Promise((resolve) => setTimeout(resolve, 1000));
setIsSuccess(true);
```

The commented-out `fetch('/api/contact', …)` names an endpoint that does not exist.
**`app/api/` does not exist. There is no route handler and no `'use server'` action anywhere in
the repository.** `lib/tracking.ts` exports `submitContactForm()`, which POSTs to that same
non-existent `/api/contact`; it is **not imported by any component**.

Current field set: **8 fields, 5 required — name, email, phone, service, budget.**
Approved Gate 6 set: **4 required — name, work email, company, "what you're trying to fix"**, with
phone, website and consent optional and **no budget field at all**.

**No CAPTCHA, no honeypot, no rate limiting, no idempotency key** — zero matches for
`captcha|turnstile|hcaptcha` across the repository and `.env.example`.

**`components/forms/CalendlyEmbed.tsx` calls `Calendly.initBadgeWidget({…})`** — the floating
*badge* API — while the component renders an **inline** container. The inline container is
therefore never filled. Without `NEXT_PUBLIC_CALENDLY_URL` the component renders a
*"Calendly booking link is not configured yet."* card.

## 8. Analytics — instrumented client-side, unconfirmable server-side

- `lib/gtm.tsx` injects GTM `afterInteractive` with a `<noscript>` iframe, and exports
  `trackEvent` → `dataLayer.push({event, ...})`.
- `lib/tracking.ts` wraps it in ~12 named helpers.
- `ContactForm.tsx` **bypasses both** and calls `window.gtag(...)` directly for
  `contact_form_submit` / `contact_form_error` — a **third** event surface, using an API (`gtag`)
  that GTM does not guarantee, and firing `contact_form_submit` **before** the simulated await.

**Two PII defects, verified in source:**

| Location | Defect |
|---|---|
| `lib/tracking.ts` `createTrackableEmailLink` | `trackEvent('email_click', { email })` — **pushes a raw email address into `dataLayer`** |
| `lib/tracking.ts` `createTrackablePhoneLink` | pushes a digit-stripped phone number |

Both violate `docs/12-analytics/EVENT_TAXONOMY.md` §7. Neither event name matches the approved
taxonomy (`email_clicked`, `phone_clicked`).

**No event fires from a server.** The taxonomy's two ★ conversion events —
`lead_form_submitted` and `meeting_booked` — are **specified as server-only** and are currently
**unimplementable**, because no server ever sees a submission.

## 9. SEO / technical implementation

| Item | State |
|---|---|
| **Metadata** | `lib/metadata.ts` `createMetadata()` — OG, Twitter, robots, `alternates.canonical`. **It also sets a top-level `canonical` key, which is not a field of Next's `Metadata` type** — inert, and only invisible because `ignoreBuildErrors` is on |
| **Root title** | `layout.tsx` still declares `generator: 'v0.app'` and a SaaS-positioned description contradicted by the approved messaging |
| **Homepage title** | `'Performance Marketing Agency \| 300%+ ROI \| MappedSkills'` — **carries the `DEC-007`-prohibited claim** |
| **Structured data** | `generateOrganizationSchema` + `generateLocalBusinessSchema` injected globally in `<head>`. Per the owner-blocker register the entity NAP is **BLOCKED** and the current `postalCode` is malformed |
| **Sitemap** | `app/sitemap.ts`, 15 static + Contentful blog + case studies. **`/work` is included while it renders zero case studies**; `/thank-you`, `/terms`, `/privacy-policy`, `/launch-checklist` correctly absent |
| **robots** | `app/robots.ts` — **`GPTBot: disallow /` and `CCBot: disallow /`.** Also a static `public/robots.txt` exists alongside the route |
| **Redirects** | 9 rules, all `permanent: true` → **308, not 301** |
| **www / apex** | **No canonical-host redirect anywhere** in `next.config.mjs` or `server.cjs` |
| **Security headers** | `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`. **No CSP. No HSTS** |
| **Consent** | **No consent mechanism of any kind**, while GTM and Meta Pixel both load |

### 9.1 The caching rule — flagged, and honestly bounded

**VERIFIED FACT (configuration):** `next.config.mjs` applies

```
source: '/:path*'   →   Cache-Control: public, max-age=31536000, immutable
```

to **every** path, and its intended override matches only `'/:path*.(html|xml)'` — a pattern that
**cannot match App Router document routes**, which have no `.html` extension. On the config's own
terms, `/`, `/seo` and every other page route fall under the one-year immutable rule.

**RESEARCH REQUIRED (runtime):** Next.js sets its own `Cache-Control` on rendered/ISR responses,
and whether the custom header or the framework's value survives on this deployment **was not
observed in this session and must not be assumed either way.** It must be verified against a real
response before the redesign ships, because if the custom header wins, **returning visitors would
be served the pre-redesign page for up to a year.**

## 10. Accessibility and quality tooling

- `.github/workflows/` exists (1 directory).
- No test framework, no Playwright/axe/Lighthouse config, no `eslint.config.*` (`npm run lint`
  calls `next lint`, whose built-in support is removed in this Next major — **RESEARCH REQUIRED**).
- No skip link in `app/layout.tsx`; `<main>` has no `id`. The prototype ships both.
- `Header` is `sticky top-0 z-50` with `backdrop-blur`. The approved homepage has
  **0 `position:fixed` and 0 `position:sticky`** and the direction requires a **non-sticky header
  at every width** (`03_RESPONSIVE.md` §4). **This is a direct conflict and a deliberate decision
  point**, recorded in `02_COMPONENT_MAP.md`.
- `Header`'s *Services* parent is a `DropdownMenuTrigger` **button**, not a link — so `/services`
  is unreachable from the desktop nav. The prototype fixes exactly this (parent is a link, the
  disclosure is a separate adjacent control).

## 11. Summary — what the audit changes about the plan

1. The stack is **sufficient and unblocking**. No library needs to be added for THE RESOLVE.
2. The **single riskiest change is the forced-dark → light-first flip**, because it is global and
   entangled with a hand-written repair block.
3. The **component alias layer is an asset**, not debt — it is the swap seam.
4. **Forms and analytics are not "to be restyled" — they are to be built**, server-side, for the
   first time.
5. Three items are **existing technical debt that the redesign inherits and must not be blamed
   for**: the caching rule, the AI-crawler disallow, and the absent consent mechanism.
