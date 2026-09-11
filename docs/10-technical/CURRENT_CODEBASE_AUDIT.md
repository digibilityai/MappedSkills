# Current Codebase Audit — MappedSkills

**Session:** 01 — Existing Website & Codebase Audit
**Date:** 2026-08-31
**Model:** Claude Opus 5
**Type:** Read-only inspection. No application code, config, asset, or content file was modified.
**Branch:** `test_branch`
**HEAD:** `566d3e36d69354861b4656aa73ef1eedac1a9370`

## Companion Documents
- `docs/10-technical/CURRENT_ROUTE_INVENTORY.md`
- `docs/10-technical/CURRENT_INTEGRATIONS.md`
- `docs/10-technical/CURRENT_SEO_IMPLEMENTATION.md`

## Evidence Labels Used
- **VERIFIED FACT** — established by direct inspection of repository files in this session.
- **OWNER-SUPPLIED FACT** — asserted by the project owner in existing project documentation.
- **INFERENCE** — reasoned from code; plausible but not directly observed running.
- **UNKNOWN** — cannot be established from the repository.

## Method and Its Limits
This audit read repository files only. **No build was run, no linter was run, no test suite was run, and no page was loaded in a browser.** `node_modules/` is not installed in this working tree and `.next/` does not exist; the session was instructed not to install packages for the audit, so no build-derived evidence was available.

Consequently this document contains **no Lighthouse scores, no Core Web Vitals measurements, no bundle sizes, no rankings, no traffic data, no conversion data, and no keyword data.** None were available and none have been estimated. Every statement about production runtime behaviour is labelled INFERENCE or UNKNOWN.

---

## 0. Session 01B — Live Production Verification (2026-08-31)

**Added by Session 01B.** A narrowly scoped, read-only verification pass against the live site. It resolves the production uncertainties that materially affected this audit. Everything in this section is **LIVE PRODUCTION EVIDENCE** unless labelled otherwise. Sections 1–22 below remain **repository evidence** as originally written, except where a subsection is explicitly annotated with a Session 01B update.

**OWNER-SUPPLIED FACT:** the production website visitors use is **`https://mappedskills.com`**. The `ms.mappedskills.com` reference in `doc/cpanel-deploy.md` is therefore a repository/deployment artifact, not a live-hostname uncertainty. Unknown #1 in §20 is **resolved**.

**Method:** a small number of `curl` requests plus one browser session. No crawler, no Lighthouse, no load testing, no form submission, no booking, no hosting-panel access, no Contentful access. Verified: `/`, `/seo`, `/contact`, `/schedule-call`, `/blog`, `/work`, `/robots.txt`, `/sitemap.xml`, two blog slugs, `/portfolio`, one redirect, one 404, and the `www` host.

### 0.1 Hosting and Transport — LIVE
**VERIFIED FACT (live):** `Server: LiteSpeed`, HTTP/2 with HTTP/3 advertised (`alt-svc: h3=":443"`). Next.js is running behind it (`x-powered-by: Next.js`, `x-nextjs-cache`, `x-nextjs-prerender: 1`, `x-nextjs-stale-time: 300`).

This **corrects an inference in §16**: the audit inferred Apache/Phusion Passenger from `doc/cpanel-deploy.md`. The live edge is LiteSpeed. Server-side ISR is demonstrably working — `x-nextjs-cache` returned `HIT` and `STALE` across requests.

### 0.2 Hostname and Redirects — LIVE
| Check | Result |
|---|---|
| `http://mappedskills.com` | **301** → `https://mappedskills.com/` ✓ |
| `http://www.mappedskills.com` | **301** → `https://www.mappedskills.com/` ✓ (to www HTTPS, not to apex) |
| `https://www.mappedskills.com` | **200** — no redirect to apex |
| `https://mappedskills.com/seo-services` | **308** → `https://mappedskills.com/seo` — single hop, correct |
| `https://mappedskills.com/this-page-does-not-exist-xyz` | **404** ✓ correct status |
| `https://mappedskills.com/portfolio` | **404** — confirms §5 finding |

**VERIFIED FACT (live) — `www` is not redirected to the apex.** `https://www.mappedskills.com/` returns 200 with byte-identical content and an identical `etag` to the apex. `https://www.mappedskills.com/seo` also returns 200. The site is fully reachable on two hostnames.

**Mitigating VERIFIED FACT (live):** the `www` response self-canonicalises correctly — `<link rel="canonical" href="https://mappedskills.com/"/>` — and `www`'s `/robots.txt` declares the apex sitemap. The duplicate-hostname exposure is therefore largely neutralised by correct canonical tags. It is recorded as a **Medium** issue (host normalisation absent), not a Critical one.

**VERIFIED FACT (live):** HTTPS is enforced and `Strict-Transport-Security: max-age=63072000; includeSubDomains` is present on every HTTPS response. This header is **not** in `next.config.mjs` — it is added at the host/LiteSpeed layer. The §15 finding "no `Strict-Transport-Security` header" is **cleared for production**; it remains true of the repository configuration.

### 0.3 Cache-Control — C2 CONFIRMED
**VERIFIED FACT (live).** Actual headers observed:

| URL | `Cache-Control` |
|---|---|
| `/` | `public, max-age=31536000, immutable` |
| `/seo` | `public, max-age=31536000, immutable` |
| `/contact` | `public, max-age=31536000, immutable` |
| `/schedule-call` | `public, max-age=31536000, immutable` |
| `/blog` | `public, max-age=31536000, immutable` |
| `/sitemap.xml` | `public, max-age=3600, must-revalidate` |
| `/robots.txt` | *(static file — served by LiteSpeed, no Next.js cache header)* |

**The repository finding is confirmed exactly.** Every HTML document is served with a one-year `immutable` directive. `/sitemap.xml` receives the intended 1-hour override, which demonstrates that the `/:path*.(html|xml)` rule matches the `.xml` branch but **not** extensionless App Router HTML routes — precisely the mechanism the audit inferred.

**Confirmed consequence:** server-side ISR is working (`x-nextjs-stale-time: 300`), but browsers and intermediary caches are instructed not to revalidate HTML for a year. Content updates will not reach returning visitors.

### 0.4 robots.txt — C3 RESOLVED AND RECLASSIFIED
**VERIFIED FACT (live):** `https://mappedskills.com/robots.txt` returns **the static `public/robots.txt`**, not the `app/robots.ts` output. Evidence: `content-length: 681` matching the static file, `last-modified: Fri, 21 Aug 2026 05:37:20 GMT`, `content-type: text/plain`, and the **absence** of any `x-nextjs-*` or `x-powered-by` header — it is served directly by LiteSpeed, bypassing Next.js.

**Consequences — this materially changes the Session 01 finding:**

| Question | Live answer |
|---|---|
| Which implementation wins? | **`public/robots.txt`.** `app/robots.ts` is entirely inert dead code. |
| Is `GPTBot` blocked? | **No.** The served file contains no `GPTBot` directive; `User-agent: *  Allow: /` applies. |
| Is `CCBot` blocked? | **No.** Same reason. |
| Is `OAI-SearchBot` addressed? | **No.** Not mentioned. |
| Other AI crawler directives? | **None.** No `Google-Extended`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Applebot-Extended`, `Bytespider`, or any other. |
| Sitemap declared? | **Yes** — `Sitemap: https://mappedskills.com/sitemap.xml`, correct hostname. |
| Contradictions? | **Yes**, as documented from source: the bare `Disallow: /admin/` and `Disallow: /api/` lines sit under the `SemrushBot` group and therefore apply to SemrushBot only; `Allow: /api/sitemap` and `/api/rss` reference endpoints that do not exist; `Crawl-delay: 0.1` is a non-integer value. |

**The Critical risk is reclassified.** The live crawler policy does **not** block AI crawlers, so the direct conflict with the charter's AI-visibility requirement is **not currently active in production**. What remains is a **latent Medium risk**: `app/robots.ts` still exists and still contains the `GPTBot`/`CCBot` site-wide block. If `public/robots.txt` were ever deleted — for instance during a redesign that cleans up `public/` — the Next.js route would silently take over and begin blocking those crawlers with no code change and no review.

*Per session scope, no future AI-crawler policy is recommended here. This is current-state verification only.*

### 0.5 Sitemap — LIVE
**VERIFIED FACT (live):** `/sitemap.xml` returns 200, `content-type: application/xml`, and contains **exactly 15 `<loc>` entries**.

| Check | Result |
|---|---|
| Accessible | Yes, HTTP 200 |
| URL count | **15** |
| Hostname | `https://mappedskills.com` on all 15 — correct |
| All five service pages present | **Yes** — `/google-ads`, `/social-media-ads`, `/lead-generation`, `/seo`, `/conversion-optimization` |
| Blog article URLs present | **None — zero** |
| Case-study URLs present | **None — zero** |
| `<lastmod>` | Every entry identical: `2026-08-21T05:37:56.228Z` |
| `changefreq` | **Absent — 0 occurrences** |
| `<priority>` | Present on all 15 |

**This confirms three repository findings at once (§9, §17):** the `lastModified: new Date()` defect (all 15 timestamps identical, frozen at the 2026-08-21 build), the `changefreq` key being dropped as an invalid `MetadataRoute.Sitemap` field, and `priority` rendering correctly.

The 15 entries are exactly the hard-coded static list. **The dynamic Contentful branches contributed nothing.**

### 0.6 Live CMS Content — C4 CONFIRMED
**VERIFIED FACT (live):**
- `/blog` returns 200 and renders the text **"No articles found"**. Zero `href="/blog/<slug>"` links in the document.
- `/work` returns 200 and contains **zero** `href="/portfolio/<slug>"` links.
- The three blog URLs hard-coded in `app/not-found.tsx` return **404**: `/blog/seo-vs-ppc` → 404, `/blog/facebook-ads-not-working` → 404. The 404 recovery page links to further 404s, as §5 warned it might.
- `/blog`'s `ItemList` JSON-LD is emitted but carries no items.

**The production site currently publishes no blog articles and no case studies.** The blog, the case-study index, and the sitemap's dynamic sections are all empty.

**UNKNOWN — the cause.** Two explanations remain open and this session was scoped not to inspect Contentful:
1. Contentful credentials are absent or invalid in the production build environment, triggering the silent-failure path documented in §4.3; or
2. Contentful is connected correctly but contains no published `post` or `caseStudies` entries.

Either way, the observable outcome is identical — HTTP 200, empty content, no error — which is itself the confirmation of the C4 silent-failure risk. Distinguishing the two requires one look at the Contentful space or the build log.

### 0.7 Contact Form — CONFIRMED, DELIVERY NOT VERIFIED
**VERIFIED FACT (live):** the rendered form on `/contact` is `<form class="space-y-6">` with **no `action` attribute and no `method` attribute**, carrying 10 form controls (`name`, `email`, `phone`, `company`, `website`, `message`, plus the service and budget selects). No CAPTCHA, hCaptcha, Turnstile, or reCAPTCHA is present anywhere in the document. No privacy or consent checkbox is bound to the form.

The production implementation matches the repository finding in §12.1 exactly: a client-side-only handler with no submission endpoint.

**`DELIVERY NOT VERIFIED`.** No test enquiry was submitted, per session scope. Successful lead capture is **not** inferred from the success UI, and the absence of a form `action` plus the absence of any `/api/contact` route remains strong but indirect evidence. Confirming that enquiries are or are not arriving still requires the owner to check the destination inbox.

### 0.8 Schedule-Call / Calendly — H3 CONFIRMED
**VERIFIED FACT (live), server-rendered HTML:** the initial HTML for `/schedule-call` contains the **fallback** state — "Calendly booking link is not configured yet. Please contact us directly", with phone and email buttons. This is the pre-hydration state, because `hasCalendlyUrl` is `false` until the client `useEffect` runs.

**Consequence:** any crawler or AI agent that does not execute JavaScript sees the site's primary conversion page declaring its booking link is not configured.

**VERIFIED FACT (live), after hydration in a real browser:**

| Observation | Value |
|---|---|
| `window.Calendly` | defined (`object`) — the external `widget.js` loaded |
| Third-party scripts on the page | exactly one: `https://assets.calendly.com/assets/external/widget.js` |
| `.calendly-inline-widget` elements | 1, with a valid `data-url` pointing at `calendly.com` |
| Its child element count | **0** |
| Its `innerHTML` length | **0** |
| Its rendered height | **384px** — an empty box |
| `<iframe>` elements anywhere on the page | **0** |
| `.calendly-badge-widget` elements | **1** |

**The defect predicted in §12.4 is confirmed precisely.** `NEXT_PUBLIC_CALENDLY_URL` *is* configured in production, the script *does* load, but because the code calls `Calendly.initBadgeWidget(...)` — the badge API — while rendering a `calendly-inline-widget` container, the inline container is never populated. A visitor scrolling to the heading "Choose a Time That Works for You" sees a blank 384-pixel void. **No booking interface renders anywhere on the page — zero iframes.**

**Additional live defect:** `initBadgeWidget` did create a badge, which renders as a **1265×24px bar pinned to `top: 0, left: 0`**, overlapping the site header rather than floating as an intended corner badge. It is visually clipped and partially hidden behind the sticky header.

**Net production state:** the site-wide primary CTA on all 22 routes points to `/schedule-call`, where no booking UI is reachable.

### 0.9 Analytics — RECLASSIFIED, WORSE THAN THE REPOSITORY SUGGESTED
**VERIFIED FACT (live).** Checked in a real browser on both `/schedule-call` and `/contact`, after full hydration:

| Global | Value |
|---|---|
| `window.dataLayer` | **undefined** |
| `window.gtag` | **undefined** |
| `window.fbq` | **undefined** |
| Third-party scripts on `/contact` | **none — empty array** |
| GTM `<noscript>` iframe in HTML | **absent** |

**No analytics of any kind is running in production.** No Google Tag Manager, no GA4, no Meta Pixel, no Vercel Analytics.

**INFERENCE:** `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` are unset in the production environment, so `lib/gtm.tsx` returns `null` and the `lib/meta-pixel.tsx` effect returns early — the exact conditional behaviour documented in §11. The absence of the GTM `<noscript>` iframe, which renders whenever the ID is present, supports this.

**This changes the §11 and §17 assessment.** The audit treated the GTM container as an external asset whose configuration must be inventoried and protected during migration. Live evidence shows **there is nothing to protect**: no measurement is currently running, and consequently **no analytics baseline exists for this site**. There is no before/after data to preserve, and Quality Gate 22 has no historical baseline to compare against.

**One risk is materially reduced by this:** the §21 C6 consent-management exposure. With no GTM and no Meta Pixel actually loading, **no third-party tracking cookies are being set by the application today**. The code path that would fire them without a consent gate remains present and unguarded, so the finding stands as a **pre-launch blocker** rather than a live compliance breach.

### 0.10 Security Headers — LIVE
**VERIFIED FACT (live)**, on `/` and `/seo`:

| Header | Live value |
|---|---|
| `strict-transport-security` | `max-age=63072000; includeSubDomains` — **present** (host-added, not in `next.config.mjs`) |
| `x-content-type-options` | `nosniff` |
| `x-frame-options` | `SAMEORIGIN` |
| `x-xss-protection` | `1; mode=block` (deprecated) |
| `referrer-policy` | `strict-origin-when-cross-origin` |
| `permissions-policy` | `camera=(), microphone=(), geolocation=()` |
| `content-security-policy` | **absent — confirmed** |

The §15 "no HSTS" finding is **cleared in production**. The "no CSP" finding is **confirmed**.

### 0.11 What Session 01B Did Not Change
No claim in §1–§22 about repository contents was altered by this pass. No performance measurement, Lighthouse run, crawl, keyword, competitor, ranking, or traffic data was gathered — all remain out of scope and absent from this document.

---

## 1. Executive Summary

MappedSkills runs a **Next.js 16.2.6 / React 19 App Router** marketing site in TypeScript, styled with Tailwind CSS v4 and shadcn/ui, with Contentful as a headless CMS for blog posts and case studies, deployed by GitHub Actions over SSH to a **cPanel / Phusion Passenger shared host** running a custom Node server.

The codebase is more mature than a typical template site. It has 22 routes, all with metadata; a shared metadata helper; a real CSS design-token system; substantial JSON-LD on 11 routes; a genuinely well-built blog article template; nine permanent redirects preserving a prior URL architecture; and a clean re-export layer over an organised component tree.

Three findings dominate everything else.

**First, the site cannot currently capture a lead.** There is no `app/api/` directory and no route handler anywhere in the repository. `components/forms/ContactForm.tsx` — the form on `/contact` — validates input, fires a `gtag` event, waits one second via `setTimeout`, and displays "Thank You!". No data is transmitted. `components/forms/BlogNewsletterForm.tsx` behaves the same way. A third `<form>` on `/blog` has no submit handler at all. The module written to submit the form, `lib/tracking.ts`, POSTs to `/api/contact` — an endpoint that does not exist — and is imported by nothing. **INFERENCE:** every enquiry submitted through the website since this code shipped was silently discarded. This should be verified against production and against the owner's actual enquiry volume before any other work proceeds.

**Second, a global cache header very likely makes the site un-updatable for returning visitors.** `next.config.mjs` applies `Cache-Control: public, max-age=31536000, immutable` to `/:path*` — every route, HTML documents included. The intended override targets `/:path*.(html|xml)`, a pattern App Router URLs do not match, since they carry no `.html` extension. **INFERENCE:** HTML pages are served with a one-year immutable directive, which would neutralise the `revalidate = 60` ISR on the homepage, blog, and case studies and make content changes invisible to any client or intermediary honouring the header. A single `curl -I` against production settles this and should be the first action of the next session.

**Third, crawler policy is self-contradictory and points against the program's own objective.** Two files both claim `/robots.txt`: `public/robots.txt` (permissive to all, blocking SEO-tool crawlers) and `app/robots.ts` (which blocks `GPTBot` and `CCBot` from the entire site). Which one Next.js serves is UNKNOWN from source. `PROJECT_CHARTER.md` records an owner requirement for AI-search visibility; the generated robots route blocks a major AI crawler outright.

Beyond these, the significant structural gap is that **the five commercial service landing pages — the site's highest-intent URLs — carry no structured data at all**, and image optimisation is disabled site-wide.

The technical foundation is sound enough to build on. The routing model, the token system, the component organisation, the redirect map, and the blog template are all worth preserving. The failures are concentrated in the backend layer (which does not exist), the delivery configuration, and consistency of application across pages.

---

## 2. Repository Snapshot

**VERIFIED FACT:**

| Item | Value |
|---|---|
| Repository root | `/Users/amitguptaamit/gitrepo/MappedSkills` |
| Current branch | `test_branch` |
| HEAD commit | `566d3e36d69354861b4656aa73ef1eedac1a9370` |
| HEAD subject | `Add MappedSkills transformation program context` |
| Default/main branch | `main` |
| Working tree | **One pre-existing untracked file: `README.md`.** Nothing else modified, staged, or deleted. |
| `node_modules/` | Not present |
| `.next/` | Not present |

**VERIFIED FACT — pre-existing uncommitted work.** `README.md` was untracked before this session began and was left untouched. It is unrelated to this audit.

**VERIFIED FACT — recent commit history** (`566d3e3` ← `82ecf27` "resolved the deployemt error" ← `06f0e0d` "Redeploying the final code" ← `cea3a01` "confirming the automation" ← `ec548eb` "Fixed yml issue" ← `ee6fe18` "Final Deployment of yaml" ← `8832f7c` ← `16ab33b`). **INFERENCE:** the recent history is dominated by deployment-pipeline troubleshooting rather than feature work, consistent with the cPanel build constraints documented in `doc/cpanel-deploy.md`.

**VERIFIED FACT — build artifacts committed to version control:**
- `public.zip` — **4,131,050 bytes (~4.1 MB)**, tracked
- `tsconfig.tsbuildinfo` — 254,708 bytes, tracked (a TypeScript incremental-build cache)
- Both `package-lock.json` **and** `pnpm-lock.yaml` — two competing lockfiles, both tracked

---

## 3. Technology Stack

**VERIFIED FACT**, from `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `components.json`:

| Layer | Technology |
|---|---|
| Framework | Next.js **16.2.6**, App Router |
| UI runtime | React **^19**, React DOM ^19 |
| Language | TypeScript **5.7.3**, `strict: true`, `target: ES6`, `moduleResolution: bundler` |
| Module system | ESM (`"type": "module"`) |
| Styling | Tailwind CSS **^4.2.0** via `@tailwindcss/postcss`; CSS-first config (`@theme inline`), **no `tailwind.config.js`** |
| Component library | shadcn/ui, `style: "new-york"`, `baseColor: "neutral"`, `rsc: true`, CSS variables |
| Primitives | 30 `@radix-ui/react-*` packages |
| Icons | `lucide-react` ^0.564.0 |
| Forms | `react-hook-form` ^7.54.1 + `zod` ^3.24.1 + `@hookform/resolvers` — **installed but not used by any actual form** |
| CMS | Contentful GraphQL Delivery API + `@contentful/rich-text-react-renderer` |
| Charts | `recharts` 2.15.0 — imported only by `components/ui/chart.tsx`, which no page imports |
| Analytics | `@vercel/analytics` 1.6.1 |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority`, `date-fns` 4.1.0 |
| Toasts | `sonner` ^1.7.1 |
| Theming | `next-themes` ^0.4.6 — **`ThemeProvider` is never mounted** |
| Animation | `tw-animate-css` 1.3.3 only. **No JS animation library** (no Framer Motion, no GSAP). |
| Package manager | **Ambiguous** — both lockfiles committed |
| Node runtime | Node **22** (from the GitHub Actions deploy script's `nodevenv/.../22/bin/activate`) |
| Server | Custom `server.cjs` (`node:http` + `next()` request handler), plus `app.js` shim requiring it |

**VERIFIED FACT — no testing infrastructure of any kind.** No test runner, no test files, no `test` script. `PROJECT_RULES.md` Rule 14 requires that code changes be accompanied by relevant testing; there is currently nothing to build on.

**VERIFIED FACT — no formatter or lint configuration.** `package.json` defines `"lint": "next lint"` but there is no ESLint config file, no `eslint` dependency, and no Prettier config anywhere in the repository.

**VERIFIED FACT — TypeScript errors are suppressed at build time.** `next.config.mjs` sets `typescript.ignoreBuildErrors: true`. Combined with `strict: true` in `tsconfig.json`, this means the codebase is written to a strict standard but nothing enforces it. At least one real type error is present and masked (see §9, the invalid top-level `canonical` key).

---

## 4. Application Architecture

### 4.1 Routing and Rendering
**VERIFIED FACT:** App Router only; no `pages/` directory. One route group, `app/(pages)/`, which emits no URL segment. 21 `page.tsx` files plus `app/not-found.tsx`.

**VERIFIED FACT:** No `middleware.ts`. No `route.ts`/`route.tsx` handlers. No `app/api/` directory. No Server Actions — `'use server'` appears nowhere in the repository.

**VERIFIED FACT — the entire backend surface is: nothing.** All data flows one way, at build or revalidation time, from Contentful into React Server Components. There is no write path of any kind.

**VERIFIED FACT — rendering strategy:** ISR with `revalidate = 60` on `/`, `/blog`, `/blog/[slug]`, `/work`, `/portfolio/[slug]`. All other routes are statically generated at build. `generateStaticParams` on both dynamic routes; `dynamicParams` left at the default `true`.

### 4.2 Server/Client Component Split
**VERIFIED FACT:** The split is disciplined. Only **12 non-`ui/` modules** carry `'use client'`:

`components/blog/SocialShare.tsx`, `components/filters/CategoryFilter.tsx`, `components/filters/ResultsFilter.tsx`, `components/forms/BlogNewsletterForm.tsx`, `components/forms/CalendlyButton.tsx`, `components/forms/CalendlyEmbed.tsx`, `components/forms/ContactForm.tsx`, `components/layout/Header.tsx`, `components/Logo.tsx`, `components/theme-provider.tsx`, `lib/gtm.tsx`, `lib/meta-pixel.tsx`.

Every page component is a Server Component. `components/layout/Footer.tsx` is a Server Component. This is a good foundation worth preserving.

**VERIFIED FACT:** `components/Logo.tsx` is marked `'use client'` but contains no hooks, no event handlers, and no browser API usage — it renders `next/image` inside `next/link`. It is a client component unnecessarily, and it is rendered in both the header and footer on every page.

### 4.3 Data Fetching
**VERIFIED FACT:** All CMS access goes through `lib/contentful/client.ts` → `contentfulGraphql<T>()`, a single `fetch` to the Contentful GraphQL endpoint with `next: { revalidate: 60 }`. Domain wrappers live in `posts.ts` and `case-studies.ts`; normalisation in `mappers.ts`; queries in `queries.ts`; types in `types.ts`.

**VERIFIED FACT — the integration fails silently.** When `CONTENTFUL_SPACE_ID` or `CONTENTFUL_ACCESS_TOKEN` is missing, `getContentfulConfig()` returns `null`, `contentfulGraphql` logs a `console.warn` and returns `null`, and every consumer degrades to an empty array. On HTTP failure or GraphQL errors it logs to `console.error` and returns `null` identically. There is no error boundary, no thrown exception, no build failure, and no user-visible signal. **INFERENCE:** a credential expiry or Contentful outage produces a site that returns HTTP 200 with an empty blog, an empty case-study index, and a 15-URL sitemap — a silent SEO regression that nothing would alert on.

### 4.4 State Management
**VERIFIED FACT:** No global state library. State is local `useState` within the twelve client components. `hooks/use-mobile.ts` and `hooks/use-toast.ts` exist; `components/ui/use-mobile.tsx` and `components/ui/use-toast.ts` are duplicates of them.

### 4.5 Server and Deployment Entry Points
**VERIFIED FACT:** `server.cjs` creates a `node:http` server, parses the URL, and delegates to the Next.js request handler with `dev = false` hard-coded. Errors return a plain-text `500 Internal Server Error`. `app.js` is a one-line shim (`require("./server.cjs")`) because, per its own comment, "cPanel often defaults Application startup file to app.js".

**VERIFIED FACT:** `scripts/verify-server-files.cjs` runs as a `prebuild` hook and fails the build with a diagnostic message if any of twelve required source files is missing. It exists because incomplete uploads to the shared host produced misleading `Can't resolve '@/components/Hero'` errors. **INFERENCE:** this is a workaround for a fragile manual-upload deployment path, and its presence is itself evidence of deployment instability.

**VERIFIED FACT:** `next.config.mjs` adds an explicit webpack alias for `@` → repo root, duplicating the `tsconfig.json` `paths` mapping, with the comment "even if tsconfig paths are missing on host" — another shared-host workaround.

---

## 5. Route Inventory

Full table in **`docs/10-technical/CURRENT_ROUTE_INVENTORY.md`**. Summary:

- **22 routes total** — 21 pages + the 404.
- **5 service landing pages:** `/google-ads`, `/social-media-ads`, `/lead-generation`, `/seo`, `/conversion-optimization`.
- **2 dynamic families:** `/blog/[slug]`, `/portfolio/[slug]`, both Contentful-driven.
- **4 noindexed:** `/thank-you`, `/terms`, `/privacy-policy`, `/launch-checklist`.
- **9 permanent redirects** from a prior URL architecture.
- **1 gated internal page:** `/launch-checklist` 404s unless `NODE_ENV === 'development'` or `ENABLE_INTERNAL_PAGES === 'true'`.

**VERIFIED FACT — structural inconsistencies:**
1. Case-study index at `/work`, detail at `/portfolio/[slug]`. **No `/portfolio` index route exists.**
2. `/services` is not reachable from the header — the Services nav item is a dropdown trigger button, not a link.
3. `/about` and `/faq` are footer-only.
4. `/thank-you` is orphaned; nothing links or redirects to it, because `ContactForm` renders an inline success state instead of navigating.

---

## 6. Content Architecture

**VERIFIED FACT — content lives in two entirely separate systems.**

### 6.1 Hard-coded content: `lib/constants.ts`
**1,263 lines, 46 exported constants** carrying essentially all marketing copy for the homepage and all five service pages: `PROCESS_STEPS`, `SERVICES`, `PROBLEM_CARDS`, `STATS`, `METRICS_TRACKED`, `BENEFITS`, `FEATURED_CASE_STUDIES`, `BLOG_ARTICLES`, `TESTIMONIALS`, `CASE_STUDIES`, `PRICING_PLANS`, and per-service families (`GOOGLE_ADS_*`, `SOCIAL_MEDIA_ADS_*`, `LEAD_GEN_*`, `SEO_*`, `CRO_*`), plus `RESULTS_STATS`, `WHAT_WE_MEASURE`, `PROOF_PRINCIPLES`.

Editing any service-page headline, FAQ, pricing tier, or statistic requires a code change, a commit, a push to `main`, and a full remote rebuild on a shared host that `doc/cpanel-deploy.md` documents as frequently unable to complete a build.

**VERIFIED FACT:** `lib/constants.ts` imports Lucide icon components directly, coupling content data to the icon library and to React.

**VERIFIED FACT:** `FEATURED_CASE_STUDIES`, `TESTIMONIALS`, `CASE_STUDIES`, `STATS`, and `RESULTS_STATS` are hard-coded proof assets. **RESEARCH REQUIRED / UNKNOWN:** whether the client names, testimonials, and result figures they contain are real, publishable, and contractually cleared. `PROJECT_RULES.md` Rule 15 prohibits invented proof; this session cannot determine provenance from code and flags it for owner confirmation. No claim is made here that any of it is fabricated.

### 6.2 CMS content: Contentful
**VERIFIED FACT — two content types are consumed.**

`post` — fields queried: `sys.id`, `sys.firstPublishedAt`, `sys.publishedAt`, `title`, `seoTitle`, `keyword`, `slug`, `excerpt`, `author` (`name`, `description`, `profile`), `category` (`name`, `slug`), `featuredImage` (`url`, `title`, `description`, `width`, `height`), `content` (rich-text JSON + linked block assets).

`caseStudies` — fields queried: `sys` timestamps, `title`, `slug`, `clientName`, `industry`, `size`, `audience`, `targetArea`, `review` (`name`, `testimonial`), `content`, `conclusion`.

**VERIFIED FACT — `mappers.ts` derives** reading time (200 wpm), a table of contents from H2/H3 blocks (anchor IDs `section-N`), an excerpt from the document body, a CTA type from the category name, and canonical URLs.

### 6.3 Scaling Limitations for an SEO/Content Program
**VERIFIED FACT — hard constraints found in code:**
1. **100-item ceiling.** Every Contentful query defaults to `limit: 100` with no pagination or cursoring. At post 101, the blog index, `generateStaticParams`, and the sitemap all silently truncate.
2. **No pagination UI** on `/blog` or `/work`. All items render on one page. `components/ui/pagination.tsx` exists, unused.
3. **No category, tag, or author archive routes.** Category exists as a Contentful reference and drives related-post selection, but `/blog?category=x` is a client-invisible query param with no crawlable hub URL. Author data exists per post with no author page.
4. **No authored meta-description field.** `POST_CARD_FRAGMENT` selects `seoTitle` and `keyword` but no `seoDescription`; descriptions are auto-derived from the body excerpt.
5. **`dateModified` maps to `sys.publishedAt`,** which changes on any republish — content-freshness signalling is not editorially controlled.
6. **Two content systems, two workflows.** Service-page content requires an engineer and a risky rebuild; blog content requires a CMS editor. A content program that needs to update service pages at editorial speed cannot do so.
7. **No content model for programmatic or templated pages** — no industry pages, no location pages, no comparison pages, no glossary, no tools.

**These are recorded as observed constraints, not as recommendations.** What the content architecture should become is out of scope for this session.

---

## 7. Component Architecture

**VERIFIED FACT — the structure is better than a file listing suggests.** `components/` contains 27 root-level `.tsx` files that each consist of **exactly one line**, a re-export:

```ts
export { ServiceCard } from '@/components/cards/ServiceCard'
```

These are backward-compatibility shims. All real implementations live in five organised directories. There is **no duplicated implementation** — an initial reading of the file tree suggests duplication, but every root-level file is a one-line alias.

| Directory | Contents |
|---|---|
| `components/layout/` | `Header`, `Footer`, `Container`, `Section` |
| `components/sections/` | `Hero`, `HeroDashboard`, `CTASection`, `FAQSection`, `SocialProofStrip` |
| `components/cards/` | `ServiceCard`, `BlogCard`, `CaseStudyCard`, `PricingCard`, `StatCard`, `TeamCard`, `TestimonialCard`, `ProblemCard`, `ProcessStepCard`, `IndustryCard`, `ValueCard`, `BeforeAfterMetric` |
| `components/forms/` | `ContactForm`, `BlogNewsletterForm`, `CalendlyEmbed`, `CalendlyButton` |
| `components/filters/` | `CategoryFilter`, `ResultsFilter` |
| `components/blog/` | `BlogHero`, `BlogIntroduction`, `RichTextContent`, `TableOfContents`, `AuthorBio`, `RelatedPosts`, `RelatedServices`, `CTABlock`, `StickySidebarCTA`, `SocialShare`, `FAQSection` |
| `components/case-study/` | `CaseStudyContent` |
| `components/ui/` | **57 shadcn/ui primitives** |

**VERIFIED FACT — most-reused components:** `Container` (22 imports), `Section` (22), `CTASection` (14), `Hero` (13), `FAQSection` (6), `CaseStudyCard` (4), `StatCard` (4).

**VERIFIED FACT — page-specific hacks:** Four of the five service pages — `/seo`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization` — **do not use the shared `Hero` component.** They hand-roll an inline hero with a bespoke `<h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-balance">` and duplicated CTA markup. `/google-ads` uses the shared `Hero`. Five pages that should be one template are two implementations.

**VERIFIED FACT — page files are large:** `/how-it-works` 733 lines, `/about` 716, `/` 718, `/services` 671, `/pricing` 664, `/conversion-optimization` 651, `/social-media-ads` 647, `/lead-generation` 634, `/seo` 612, `/google-ads` 593. Layout, content, and JSON-LD are interleaved in single files.

**VERIFIED FACT — dead components.** Of 57 `components/ui/` primitives, many are imported by nothing in `app/`, including `breadcrumb.tsx`, `pagination.tsx`, `chart.tsx` (which pulls `recharts`), `carousel.tsx` (`embla-carousel-react`), `calendar.tsx` (`react-day-picker`), `command.tsx` (`cmdk`), `drawer.tsx` (`vaul`), `resizable.tsx`, `input-otp.tsx`, `sidebar.tsx`, `menubar.tsx`, `context-menu.tsx`. **INFERENCE:** these are tree-shaken at build and do not ship to users, so this is repository weight and dependency-surface debt rather than a runtime performance cost.

**VERIFIED FACT — duplicated hooks:** `hooks/use-mobile.ts` ↔ `components/ui/use-mobile.tsx`, and `hooks/use-toast.ts` ↔ `components/ui/use-toast.ts`.

---

## 8. Design-System Baseline

**VERIFIED FACT — a real token system exists,** in `app/globals.css` (330 lines), using Tailwind v4's CSS-first configuration. There is no `tailwind.config.js`.

**Brand palette (`:root`):** `--ms-red #C41E3A`, `--ms-dark #2C2C2C`, `--ms-light #F5F5F5`, `--ms-white #FFFFFF`, `--ms-navy #1A2A3A`, `--ms-gray #666666`, `--ms-success #2D8C5F`, `--ms-alert #E67E22`.

**Semantic tokens** for background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, five chart colours, and a full sidebar set — defined for light in `:root` and for dark in `.dark`, then exposed to Tailwind via `@theme inline`.

**Typography:** Montserrat (headings, `--font-heading`) and Inter (body, `--font-sans`), loaded via `next/font/google` with `display: 'swap'` and subset `latin`. A responsive heading scale is set in `@layer base` (h1 `text-4xl md:text-5xl lg:text-6xl` through h4).

**Radius scale:** `--radius: 0.75rem` with derived `sm`/`md`/`lg`/`xl`.

**VERIFIED FACT — dark mode is hard-forced.** `app/layout.tsx` renders `<html lang="en" className="dark scroll-smooth ...">` as a literal string. The complete light-mode palette in `:root` is therefore **unreachable**. `next-themes` is installed and `components/theme-provider.tsx` exists, but `ThemeProvider` is **never imported or mounted** — it is dead code.

**VERIFIED FACT — a compensating hack layer exists.** Because dark mode is forced but many pages use Tailwind's light utility classes (`bg-white`, `bg-red-50`, `bg-blue-50`, …), `app/globals.css` contains a selector list of ~20 such classes that locally re-override `--foreground`, `--card-foreground`, `--primary`, `--muted-foreground`, `--border` and force `color: #1a1a1a`, plus a second block for `html.dark .dark\:bg-*-950\/20` variants. This is a fragile patch: any new light-background utility used on a page will render unreadable text until someone adds it to this list.

**VERIFIED FACT — a second, conflicting source of truth.** `lib/design-system.ts` (166 lines) re-declares the same colours, fonts, weights, and sizes as a TypeScript object. It is **imported by nothing**. Two definitions of the design system exist and can drift silently.

**VERIFIED FACT — a third dead stylesheet.** `styles/globals.css` (125 lines) is not imported anywhere. Only `app/globals.css` is loaded.

**VERIFIED FACT — global element styling is aggressive.** `@layer base` applies `section { @apply py-16; }` to every `<section>` element, and styles every `<a>` as `text-accent hover:text-accent/80 ... underline-offset-4 hover:underline` — including navigation and footer links. Two separate `a { ... }` rules and two `button { ... }` rules appear in the same layer, the later ones re-declaring the earlier.

**Assessment:** a design *token* system exists and is coherent. A design *system* — documented components, states, variants, spacing scale, breakpoint contract, accessibility patterns — does not. There is no Storybook, no component documentation, and no visual regression coverage.

---

## 9. Technical SEO Baseline

Full detail in **`docs/10-technical/CURRENT_SEO_IMPLEMENTATION.md`**. Headlines:

**Implemented:** metadata on all 22 routes via `createMetadata`; self-referencing absolute canonicals through `alternates.canonical`; nine 308 redirects; a generated `/sitemap.xml`; Organization + LocalBusiness JSON-LD site-wide; substantial schema on 11 routes; correct `noindex` on the four routes warranting it; a rich noindexed 404 page; self-hosted fonts.

**Defects and gaps (observations only):**
- **Two conflicting `/robots.txt` sources** — `public/robots.txt` vs `app/robots.ts`, with contradictory crawler policy. Which wins is UNKNOWN from source.
- **No structured data on the five service landing pages or `/portfolio/[slug]`.**
- **`lib/schema.ts` is 5/7 unused;** pages build JSON-LD inline, and `blog/[slug]` defines local functions shadowing the library's names.
- **No OG image on any page except blog articles,** while `twitter:card: summary_large_image` is declared everywhere. `lib/og-image.ts` was written to fix this and is dead code pointing at a non-existent `/api/og` and a non-existent `/og-default.jpg`.
- **`metadataBase` is never set.**
- **Sitemap `lastModified` is `new Date()` for every URL,** despite correct dates being available in `mappers.ts`. The `changefreq` key is not a valid `MetadataRoute.Sitemap` field (`changeFrequency` is) and is likely dropped.
- **Invalid top-level `canonical` key** in `createMetadata`, `not-found.tsx`, and `thank-you/page.tsx` — inert because `alternates.canonical` is also set, and unreported because TS errors are ignored.
- **`/social-media-ads` title omits the brand suffix** every other page carries.
- **`generator: 'v0.app'`** left in the root layout.
- **Unsubstantiated "300%+ ROI"** in the indexable titles of `/` and `/google-ads`.
- **No breadcrumb UI** despite `BreadcrumbList` schema on 11 routes.
- **Schema address data is malformed** — `streetAddress: 'Pune, Maharashtra, India'`, `postalCode: 'India'`, `areaServed` as one City node with an array name.
- **`sameAs` may be empty in production** (env-driven) while the footer hard-codes three social URLs.
- **No `WebSite` schema, no `SearchAction`, no `Product`/`Offer` on `/pricing`.**

---

## 10. AI Crawler / AI Search Baseline

**This section is a strict inventory of what exists today. No recommendation is made, and no claim is made that any AI-crawler mechanism confers ranking, citation, or visibility benefit. That is RESEARCH REQUIRED for a later phase.**

**VERIFIED FACT — AI-related crawler directives present:**
| Crawler | Location | Directive |
|---|---|---|
| `GPTBot` | `app/robots.ts` | **Disallow `/`** |
| `CCBot` | `app/robots.ts` | **Disallow `/`** |

**VERIFIED FACT — crawlers with no directive anywhere in the repository:** `OAI-SearchBot`, `ChatGPT-User`, `Google-Extended`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `PerplexityBot`, `Perplexity-User`, `Applebot-Extended`, `Bytespider`, `Amazonbot`, `meta-externalagent`, `Diffbot`, `Omgilibot`.

**VERIFIED FACT — absent:** no `llms.txt`; no `.well-known/` directory; no AI-specific structured content, metadata, or content negotiation; no `X-Robots-Tag` header configuration.

**VERIFIED FACT — direct conflict with a documented owner requirement.** `PROJECT_CHARTER.md` states the site must "be optimized for visibility and citation potential across relevant AI search and answer systems." `app/robots.ts` blocks `GPTBot` from the entire site. Whichever robots source production actually serves, the current crawler policy is either self-contradictory (two files disagreeing) or actively opposed to that requirement.

**VERIFIED FACT — content characteristics relevant to a later AI-visibility baseline** (recorded neutrally as observations, not as ranking factors): the site is server-rendered with content present in initial HTML; `FAQPage` schema appears on 8 routes; `Article` schema with author and dates on blog posts; `Organization`/`LocalBusiness` on every page; entity `sameAs` links possibly empty in production; no visible breadcrumb trail; no author archive pages; no original research, datasets, or tools published.

---

## 11. Analytics Baseline

Full detail in **`docs/10-technical/CURRENT_INTEGRATIONS.md`**.

**VERIFIED FACT — implemented in code:**
- **GTM** — `lib/gtm.tsx`, mounted in `app/layout.tsx`, `strategy="afterInteractive"`, conditional on `NEXT_PUBLIC_GTM_ID`, with `<noscript>` fallback. Exports seven `dataLayer` helpers.
- **Meta Pixel** — `lib/meta-pixel.tsx`, injected via `useEffect` DOM manipulation, conditional on `NEXT_PUBLIC_META_PIXEL_ID`.
- **Vercel Analytics** — `<Analytics />` gated on `NODE_ENV === 'production'`. **INFERENCE:** inert on cPanel hosting.

**VERIFIED FACT — not implemented in code:** GA4 (variable declared but never consumed), Google Ads conversion tags, LinkedIn Insight Tag, Microsoft/Bing UET, Search Console verification tag, session recording, heatmaps, call tracking.

**VERIFIED FACT — two parallel, disconnected tracking conventions coexist:**
1. `lib/gtm.tsx` `trackEvent()` → `window.dataLayer.push({ event, ...data })`
2. Direct `window.gtag('event', ...)` calls in `ContactForm`, `BlogNewsletterForm`, and `CalendlyButton`

**INFERENCE:** the `gtag` calls only function if the GTM container has loaded a tag that defines `gtag`. The event names also diverge — `lib/gtm.tsx` defines `form_submit`, while `ContactForm` fires `contact_form_submit`, and `lib/tracking.ts` (dead) defines `contact_form_started`. There is no single event taxonomy.

**VERIFIED FACT — `lib/tracking.ts` is entirely dead code.** It defines `submitContactForm` plus eleven tracking helpers (`trackServiceCTAClick`, `trackAuditCTAClick`, `trackScheduleCallClick`, `trackPricingCTAClick`, `trackBlogRelatedClick`, `trackBlogServiceClick`, `trackSocialShare`, `trackNewsletterSignup`, `trackCalendlyInteraction`, and phone/email link builders). **Not one of them is imported by any page or component.**

**VERIFIED FACT — tracking exists as comments, not code.** `app/not-found.tsx` contains a block listing seven GA4 events it intends to fire (`page_404_view`, `service_cta_click`, `schedule_call_click`, `home_cta_click`, `pricing_cta_click`, `related_article_click`, `contact_click`), and inline `{/* Tracking: ... */}` markers throughout. None of these are implemented.

**VERIFIED FACT — no consent management exists.** GTM and Meta Pixel load unconditionally on every page load. `app/(pages)/privacy-policy/page.tsx` line 264 explicitly states a cookie consent banner "should be added before launch." **Given India-focused targeting (₹ pricing, `areaServed: ['IN']`, Pune/Mumbai offices) and a `.com` domain reachable globally, the absence of any consent gate before third-party tracking loads is a compliance exposure that requires legal review, not just engineering.**

**VERIFIED FACT — no UTM handling, no lead-source capture, no attribution fields, no CRM integration** anywhere in the codebase.

---

## 12. Forms and Lead-Flow Baseline

**VERIFIED FACT — three forms exist. None transmits data.**

### 12.1 `ContactForm` — `/contact`
`components/forms/ContactForm.tsx`. Fields: `name`*, `email`*, `phone`*, `company`, `website`, `service`* (7-option select), `budget`* (5-option select, ₹-denominated), `message`*.

| Aspect | Implementation |
|---|---|
| Validation | Client-side only, hand-rolled. Email regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`; phone regex `^[\d\s\-\+\(\)]{10,}$`. `react-hook-form` + `zod` are installed but **not used**. |
| Submission | **`await new Promise(resolve => setTimeout(resolve, 1000))`** — a simulated delay. The real `fetch('/api/contact')` is present but **commented out**. |
| Destination | **None.** No endpoint, no email, no CRM, no webhook. |
| Spam protection | **None.** No CAPTCHA, no honeypot, no rate limiting. |
| Success state | Inline "Thank You!" card, auto-clearing after 5 seconds. Does not navigate to `/thank-you`. |
| Error handling | Catch block sets `errors.name` to a generic message — a submission error surfaces attached to the Name field. |
| Tracking | `window.gtag('event', 'contact_form_submit', ...)` fired **before** the simulated submission |
| Attribution | **None.** No UTM, no referrer, no landing page, no session data captured. |
| Consent | **None.** No privacy checkbox, no consent statement bound to submission. |
| Accessibility | Good: `<label htmlFor>` on every field, `aria-invalid` on error, inline error text. |
| Trust copy | Claims "✓ We respond within 24 hours" — **a promise the system cannot keep, since no one is notified.** |

### 12.2 `BlogNewsletterForm` — `/blog/[slug]`
`components/forms/BlogNewsletterForm.tsx`. Single email field, `required`. Fires `window.gtag('event','newsletter_signup', { ..., email })` — **note: this transmits the raw email address into the analytics dataLayer.** Then sets the message "Thanks! Check your email for confirmation." No network call. No confirmation email can be sent. The inline comment reads "Placeholder for actual newsletter signup". **The email is passed to analytics but never to anything that could subscribe the user** — a privacy concern (PII in analytics) paired with a false user-facing promise.

**VERIFIED FACT:** The email input has a `placeholder` but **no `<label>`** — an accessibility defect.

### 12.3 Inline newsletter form — `/blog`
`app/(pages)/blog/page.tsx:326`. A `<form>` with an email `<input>` and a submit `<Button>` and **no `onSubmit` handler at all**. **INFERENCE:** submitting it triggers a native GET form submission, navigating the user to `/blog?` — a broken interaction that also appends the email as a query parameter to a crawlable URL.

### 12.4 Calendly — `/schedule-call`
`components/forms/CalendlyEmbed.tsx`. Loads `assets.calendly.com/assets/external/widget.js`, then calls `Calendly.initBadgeWidget({ url, text, color })` — the **badge** widget API — while rendering `<div className="calendly-inline-widget" data-url={url}>`. **INFERENCE:** the inline container will not populate; the API invoked does not match the element rendered. Requires live verification. A graceful fallback card (phone + email) renders when `NEXT_PUBLIC_CALENDLY_URL` is unset.

### 12.5 Lead-Flow Summary
**Every documented conversion path on the site terminates in either a simulated success message or an embed of uncertain function.** The site-wide primary CTA on all 22 routes is "Schedule Free Strategy Call" → `/schedule-call` → the Calendly embed. The secondary path is `/contact` → `ContactForm` → `setTimeout`.

---

## 13. Performance Architecture

**No measurements were taken.** No build ran, no Lighthouse ran, no bundle was analysed. This section reports architectural factors only.

**VERIFIED FACT — favourable:**
- Server Components by default; only 12 non-`ui/` client modules.
- Fonts self-hosted by `next/font/google` with `display: 'swap'`; no external font request.
- GTM loaded via `next/script` `strategy="afterInteractive"`.
- ISR (`revalidate = 60`) on the five dynamic routes; static generation elsewhere.
- No JS animation library; CSS-only animation via `tw-animate-css`.
- Heavy `ui/` primitives (recharts, embla, react-day-picker, cmdk, vaul) are unimported by pages and **INFERENCE:** tree-shaken out.
- No video, no iframes except the GTM `<noscript>` and Calendly.

**VERIFIED FACT — unfavourable:**

1. **`images.unoptimized: true`** in `next.config.mjs` disables Next.js image optimisation site-wide — no resizing, no AVIF/WebP negotiation, no responsive `srcset` — including for Contentful assets, despite `remotePatterns` being configured for `images.ctfassets.net`. **INFERENCE:** this was likely set because the cPanel host cannot run the image optimiser, making it a hosting-driven constraint rather than an oversight.
2. **Global `Cache-Control: public, max-age=31536000, immutable` on `/:path*`.** See §1 and `CURRENT_SEO_IMPLEMENTATION.md` §13. **INFERENCE:** the `/:path*.(html|xml)` override does not match extensionless App Router URLs, so HTML is likely served immutable-for-one-year, neutralising ISR for returning visitors. **Highest-priority item to verify live.**
3. **Two raw `<img>` tags** bypassing `next/image`: `components/blog/RichTextContent.tsx:69` (Contentful body images, i.e. the largest images on article pages) and `components/cards/TeamCard.tsx:24`.
4. **`components/Logo.tsx`** declares `width={1080} height={48}` and renders `h-7 w-auto`; with optimisation disabled, the full-resolution asset is served in the header and footer of every page.
5. **Meta Pixel injects a `<script>` into `document.head` via `useEffect` and raw DOM manipulation** rather than `next/script`, bypassing Next.js loading-strategy control. Its cleanup function removes the script on unmount but cannot unload `fbq`.
6. **`@vercel/analytics`** ships a third-party script that **INFERENCE:** cannot report from cPanel hosting.
7. **Page components are very large** (593–733 lines) with content, layout, and JSON-LD interleaved.
8. **No `loading.tsx`** at any level — no streaming or suspense boundaries.
9. **Single-worker builds.** `build:cpanel` sets `RAYON_NUM_THREADS=1 UV_THREADPOOL_SIZE=1 NODE_OPTIONS='--max-old-space-size=512'` with `experimental.workerThreads: false, cpus: 1`, because "Shared hosts (CloudLinux) kill Next worker processes during static generation." **INFERENCE:** builds are slow and memory-constrained, which will worsen as content scales, and a 512 MB heap is a hard ceiling on how many pages can be statically generated.
10. **Webpack, not Turbopack.** Both `dev` and `build` scripts pass `--webpack` explicitly.

**UNKNOWN:** actual Core Web Vitals, bundle sizes, TTFB, CDN presence, compression settings, and HTTP version. All require live measurement.

---

## 14. Accessibility Baseline

**This is not a WCAG audit.** No automated scan and no assistive-technology testing were performed. Architectural observations only.

**VERIFIED FACT — positives:**
- Semantic landmarks: `<header>` and `<nav>` in `Header`, `<main>` in `app/layout.tsx`, `<footer>` in `Footer`.
- `ContactForm` uses `<label htmlFor>` on every field, `aria-invalid` on error, and inline error text.
- The mobile menu button has `aria-label` (state-dependent) and `aria-expanded`.
- Header nav links define explicit `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` styles.
- Footer social icon links carry `aria-label` ("LinkedIn", "Facebook", "Instagram", "Email").
- `app/globals.css` sets a global `outline-ring/50` and explicit `input:focus` / `textarea:focus` / `select:focus` ring styles.
- Radix primitives supply correct roles and keyboard behaviour for the dropdown, accordion, and dialog components in use.

**VERIFIED FACT — defects:**

1. **No skip link.** No "Skip to main content" anywhere. Keyboard and screen-reader users must traverse the full header — including the Services dropdown — on every page.
2. **`<main>` has no `id`,** so no skip link could target it without a change.
3. **`<nav>` elements have no `aria-label`.** `Header` renders two `<nav>` elements (desktop and mobile) and `TableOfContents` renders a third, none distinguished.
4. **No `prefers-reduced-motion` handling anywhere.** Confirmed by search across `app/`, `components/`, and `styles/`. Meanwhile `html` carries `scroll-smooth`, and cards apply `transition-all duration-300 hover:-translate-y-1`.
5. **Only 8 `alt=` attributes** across the entire `app/` and `components/` tree.
6. **The `/blog` newsletter email input has no label** — placeholder only.
7. **The Services dropdown trigger is a button, not a link,** so `/services` is unreachable by keyboard from the header.
8. **Global `<a>` styling colours every link brand red (`#C41E3A`) with underline only on hover.** Body links are distinguished from surrounding text primarily by colour, which is a WCAG 1.4.1 (Use of Colour) concern, and it applies uniformly to nav and footer links too.
9. **Contrast is unverified and at architectural risk.** The `.bg-white`/`.bg-red-50`/… override block in `globals.css` exists specifically to rescue text colour on light surfaces under forced dark mode. Any light-background utility not on that list renders light text on a light background. **UNKNOWN:** actual measured contrast ratios — no automated check was run.
10. **Heading hierarchy could not be fully verified.** The shared `Hero` renders the `<h1>` (`components/sections/Hero.tsx:53`); pages using it have exactly one. `/blog/[slug]` gets its `<h1>` from `BlogHero.tsx:39`. Four service pages hand-roll their `<h1>`. No page appears to have zero or multiple `<h1>` elements, but H2→H4 nesting order within 600–700-line pages was not exhaustively traced.
11. **`ContactForm` renders no `role="alert"` or `aria-live` region** on the success state or the error state, so neither is announced.

**Against `PROJECT_RULES.md` Rule 13 (WCAG 2.2 AA as a release requirement),** the missing skip link, missing reduced-motion support, unlabelled input, and colour-only link distinction are architectural gaps that a redesign should address structurally rather than patch.

---

## 15. Security and Privacy Baseline

**No intrusive testing was performed.** Configuration and code reading only.

**VERIFIED FACT — positives:**
- **No secrets are committed.** `.env.example` contains names with empty or non-sensitive values. `git ls-files` shows only `.env.example` tracked. `.gitignore` excludes `.env*.local`. The only credential-shaped matches in the codebase are the placeholders `GTM-XXXXXXX` and `G-XXXXXXXXXX` in `launch-checklist/page.tsx`.
- Deploy secrets live in GitHub Actions secrets (`SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`, `SSH_PORT`), never in the repository.
- The rsync deploy explicitly excludes `.env` and `.env.*`.
- Contentful credentials are server-only (no `NEXT_PUBLIC_` prefix) and read exclusively inside Server Components.
- Security headers are set: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- `/launch-checklist` is correctly gated — `notFound()` unless `NODE_ENV === 'development'` or `ENABLE_INTERNAL_PAGES === 'true'`.
- `CalendlyButton` uses `window.open(href, '_blank', 'noopener,noreferrer')`.
- No `eval`, no `new Function`. `dangerouslySetInnerHTML` is used only for `JSON.stringify`'d JSON-LD and the GTM/Meta Pixel snippets — all developer-controlled, none from user input.

**VERIFIED FACT — gaps:**

1. **No Content-Security-Policy.** With GTM, Meta Pixel, Calendly, and Vercel Analytics all injecting third-party scripts, and several injected via inline `<script>`, there is no CSP constraining what may execute.
2. **No `Strict-Transport-Security` header.**
3. **`X-XSS-Protection: 1; mode=block`** is set — a deprecated header that modern browsers ignore, and which has known bypass issues in older ones.
4. **No API input validation, because there is no API.** This is not currently exploitable, but it means the entire server-side validation and sanitisation layer must be built from zero when forms are connected.
5. **No spam or abuse protection on any form** — no CAPTCHA, no honeypot, no rate limiting. Currently moot; becomes immediately relevant the moment a real endpoint exists.
6. **No consent management.** GTM and Meta Pixel fire on every page load with no gate. The site's own privacy policy states a banner is needed. Given India-focused targeting on a globally reachable `.com`, this needs legal review.
7. **PII into analytics.** `BlogNewsletterForm` passes the raw email address into a `gtag` event payload.
8. **`zod` is installed and unused.** A validation library is available for the schema layer that does not yet exist.
9. **Dual lockfiles** (`package-lock.json` + `pnpm-lock.yaml`) make the resolved dependency set ambiguous, weakening supply-chain reproducibility. `doc/cpanel-deploy.md` even instructs `rm -f pnpm-lock.yaml` on the server to stop Next.js selecting pnpm.
10. **`--delete` rsync deploys the full working tree** to the production host, including `docs/`, `doc/`, `scripts/`, `CLAUDE.md`, `public.zip`, and `tsconfig.tsbuildinfo`. **UNKNOWN:** whether any of these are web-reachable on the server — depends on the Passenger document-root configuration, which is not in the repository. If the app root is web-exposed, internal project documentation would be publicly fetchable.
11. **No dependency scanning, no Dependabot, no `npm audit` step** in CI.

---

## 16. Deployment Baseline

**VERIFIED FACT — pipeline:** `.github/workflows/deploy.yml` triggers on push to `main` and on manual dispatch. It writes an SSH key from secrets, `ssh-keyscan`s the host, ensures `/home/$SSH_USER/mappedskills.com` exists, then `rsync -avz --delete` (excluding `.git/`, `node_modules/`, `.next/`, `tmp/`, `.env`, `.env.*`), then over SSH activates a Node 22 virtualenv (`nodevenv/mappedskills.com/22/bin/activate`) and runs `npm install && npm run build:cpanel && mkdir -p tmp && touch tmp/restart.txt`.

**VERIFIED FACT — build target:** Node server (not static export, not Vercel). Started by `server.cjs`; `app.js` is a cPanel-compatibility shim. Port from `PORT` (default 3000), host from `HOSTNAME` (default `0.0.0.0`).

**VERIFIED FACT — hosting:** cPanel with Phusion Passenger, per `doc/cpanel-deploy.md`. Restart is triggered by touching `tmp/restart.txt` — the Passenger convention. The doc names CloudLinux LVE process limits as the cause of build failures.

**VERIFIED FACT — build-environment workarounds accumulated:** `CPANEL_BUILD=1` → `experimental.workerThreads: false, cpus: 1`; `RAYON_NUM_THREADS=1`; `UV_THREADPOOL_SIZE=1`; `--max-old-space-size=512`; `prebuild` file-presence verification; an explicit webpack `@` alias duplicating tsconfig paths; `typescript.ignoreBuildErrors: true`; a PowerShell packaging script (`scripts/pack-cpanel.ps1`) for building locally and uploading a zip.

**VERIFIED FACT — two contradictory deployment procedures are documented.** `doc/cpanel-deploy.md` recommends building **locally** and uploading a zip, and states "**do not** run `npm run build`" on the server. `.github/workflows/deploy.yml` does exactly the opposite — it runs `npm run build:cpanel` on the server. **UNKNOWN:** which procedure is actually in use for production today.

**VERIFIED FACT — domain ambiguity.** `doc/cpanel-deploy.md` instructs `NEXT_PUBLIC_SITE_URL=https://ms.mappedskills.com` ("or your live URL") and refers to the app root as `ms.mappedskills.com`, while the deploy directory is `mappedskills.com` and the code fallback everywhere is `https://mappedskills.com`. **UNKNOWN:** the actual production hostname. If `NEXT_PUBLIC_SITE_URL` is unset or set to a staging host, every canonical, sitemap URL, `robots.host`, and schema `url` points somewhere other than the served page.

**VERIFIED FACT — `.htaccess` is referenced but not committed.** `doc/cpanel-deploy.md` lists it as required and says to "keep the block cPanel/Passenger generated". Its contents — which may include redirects, HTTPS enforcement, or header rules that override or conflict with `next.config.mjs` — are **UNKNOWN** and must be retrieved from the server.

**UNKNOWN:** CDN presence, compression configuration, HTTP/2 or HTTP/3 support, TLS configuration, staging environment existence, rollback procedure, uptime monitoring, error tracking. None is determinable from the repository. There is no staging configuration and no rollback mechanism in the pipeline — `rsync --delete` overwrites production directly with no versioned artifact.

---

## 17. SEO Migration Risks

Elements that must be inventoried and protected before any redesign. **No claim is made about which URLs currently rank or hold traffic — that requires Search Console and backlink data this session did not have.**

**Must be preserved:**

1. **All 22 route paths**, especially the five service pages, `/services`, `/pricing`, `/work`, `/blog`, `/how-it-works`, `/about`, `/contact`, `/schedule-call`, `/faq`.
2. **All nine existing redirects.** These map a prior URL architecture and are the most likely holders of external backlinks. Removing them severs those chains. If the redesign changes URLs again, redirects must **chain correctly** — legacy → current → new should be flattened to legacy → new, not left as multi-hop.
3. **The `/blog/[slug]` slug set.** CMS-driven, unknown in size, the highest-volume URL family. Every existing slug must be enumerated from Contentful before migration.
4. **The `/portfolio/[slug]` slug set,** plus `normalizeCaseStudySlug` / `caseStudySlugCandidates` in `mappers.ts`, which implement slug-variant tolerance whose behaviour must be understood before changing URL generation.
5. **The `/work` ↔ `/portfolio/[slug]` split.** Unifying these into one family is defensible, but requires a full redirect map.
6. **Canonical URL formats,** including the absolute-URL convention and the resolved production hostname.
7. **Existing metadata.** Titles and descriptions on all 22 routes represent prior optimisation work — inventory before replacing.
8. **Existing structured data** on the 11 routes that emit it.
9. **The GTM container.** It is an external asset not visible in this repository. Its tags, triggers, and variables are keyed to current URLs and DOM structure; changing either can silently break measurement.
10. **`public/` assets** — `ms_Logo.webp`, `ms_icon.png`, and the four `/images/*.png` files may be externally hot-linked or indexed in image search.
11. **The 404 page's hard-coded blog URLs** and `lib/constants.ts` `BLOG_ARTICLES` — verify these slugs exist before relying on them.

**Specific migration hazards identified:**

- **Domain ambiguity must be resolved first.** Migration planning cannot begin while it is unknown whether production serves `mappedskills.com` or `ms.mappedskills.com`.
- **`.htaccess` contents are unknown** and may contain host-level redirects that a redesign would silently break.
- **The robots.txt conflict must be resolved by live fetch** before any crawler-policy change, or the change may land in the file that is not being served.
- **The global immutable cache header,** if confirmed, means any migration's new content could be invisible to returning visitors and intermediary caches for up to a year. **This must be fixed before, not during, a launch.**
- **Contentful's silent-failure mode** means a migration could ship an empty blog and empty case studies with no error surfacing.
- **No analytics baseline can be captured from this repository.** Before/after comparison requires Search Console and GA4 exports taken *before* work begins.

---

## 18. Technical Debt Register

| # | Item | Evidence | Severity |
|---|---|---|---|
| 1 | No backend; three non-functional forms | No `app/api/`; `setTimeout` in `ContactForm` | Critical |
| 2 | `lib/tracking.ts` dead — POSTs to a non-existent `/api/contact`, imported by nothing | grep: zero importers | Critical |
| 3 | Global `immutable` cache header likely applied to HTML | `next.config.mjs` `/:path*` | Critical |
| 4 | Two conflicting robots.txt sources | `public/robots.txt` + `app/robots.ts` | Critical |
| 5 | `typescript.ignoreBuildErrors: true` with `strict: true` | `next.config.mjs` | High |
| 6 | No tests, no test runner, no `test` script | package.json | High |
| 7 | `next lint` script with no ESLint config or dependency | package.json | High |
| 8 | Dual lockfiles (`package-lock.json` + `pnpm-lock.yaml`) | both tracked | High |
| 9 | `images.unoptimized: true` site-wide | `next.config.mjs` | High |
| 10 | 1,263-line `lib/constants.ts` holding all service-page copy, coupled to Lucide imports | file | High |
| 11 | `lib/schema.ts` 5/7 exports unused; JSON-LD hand-built inline per page; `blog/[slug]` shadows library function names | grep | High |
| 12 | Two design-system sources of truth (`app/globals.css` + unused `lib/design-system.ts`) | files | High |
| 13 | Dark mode hard-forced in `layout.tsx`; light palette unreachable; `ThemeProvider` never mounted | `layout.tsx` | Medium |
| 14 | `.bg-white`/`.bg-*-50` token-override hack list in `globals.css` | `globals.css` | Medium |
| 15 | Four of five service pages hand-roll heroes instead of using `Hero` | page files | Medium |
| 16 | Dead files: `lib/og-image.ts`, `styles/globals.css`, `components/theme-provider.tsx`, `lib/design-system.ts`, `lib/tracking.ts` | grep | Medium |
| 17 | Duplicated hooks in `hooks/` and `components/ui/` | files | Medium |
| 18 | ~12+ unused `components/ui/` primitives pulling recharts, embla, cmdk, vaul, react-day-picker | grep | Medium |
| 19 | `react-hook-form` + `zod` + `@hookform/resolvers` installed, unused | package.json vs forms | Medium |
| 20 | `public.zip` (4.1 MB) and `tsconfig.tsbuildinfo` committed | `git ls-files` | Medium |
| 21 | Two contradictory documented deploy procedures | `doc/cpanel-deploy.md` vs `deploy.yml` | Medium |
| 22 | Invalid top-level `canonical` key in three files | `metadata.ts`, `not-found.tsx`, `thank-you` | Low |
| 23 | `generator: 'v0.app'` in root layout | `layout.tsx` | Low |
| 24 | `console.log("[v0] ...")` and v0 sandbox entries in `.gitignore` | `ContactForm.tsx`, `.gitignore` | Low |
| 25 | Duplicate `a {}` and `button {}` rules in one `@layer base` | `globals.css` | Low |
| 26 | `@vercel/analytics` shipped on non-Vercel hosting | `layout.tsx` | Low |
| 27 | `components/Logo.tsx` is `'use client'` without needing to be | file | Low |
| 28 | Unused `placeholder.*` assets in `public/` | `public/` | Low |

---

## 19. Assets and Components Worth Preserving

1. **The App Router structure and route group.** `app/(pages)/` is clean and the URL architecture is sensible.
2. **The Server/Client split.** Only 12 non-`ui/` client modules; every page is a Server Component. Genuinely good.
3. **The nine redirects in `next.config.mjs`.** Prior SEO work; must survive.
4. **`components/layout/` — `Container`, `Section`, `Header`, `Footer`.** `Container` and `Section` are used 22 times each; the layout primitive contract works.
5. **The Contentful data layer** — `client.ts`, `queries.ts`, `mappers.ts`, `types.ts`, `posts.ts`, `case-studies.ts`, `case-study-sections.ts`. Cleanly separated, typed, with real derivation logic (TOC extraction, reading time, excerpt generation, slug normalisation). Worth carrying forward largely intact; the silent-failure behaviour needs changing, not the structure.
6. **The `/blog/[slug]` template.** The best-built page on the site: full metadata, `Article`/`Breadcrumb`/`FAQ`/`ImageObject` schema, TOC, author bio, related posts, related services, contextual CTAs. It is the model the rest of the site should be brought up to.
7. **`components/blog/`** — eleven focused, single-purpose components.
8. **The CSS token system in `app/globals.css`** — brand palette, semantic tokens, `@theme inline` wiring. Solid, once the forced-dark and hack-layer issues are resolved.
9. **`next/font` setup** — Montserrat + Inter, `display: swap`, CSS variables.
10. **`components/ui/`** — 57 shadcn/ui primitives, a legitimate accessible foundation via Radix.
11. **`app/not-found.tsx`** — a well-built recovery page with curated links.
12. **`lib/metadata.ts` `createMetadata`** — the right *pattern*, needing correction (`metadataBase`, OG images, remove the stray `canonical`) rather than replacement.
13. **`lib/schema.ts`** — the right pattern, currently unused; fix the address data and adopt it.
14. **The component re-export shim layer.** It permits reorganising implementations without touching page imports — useful during migration.
15. **`scripts/verify-server-files.cjs`** — a pragmatic build guard while the current hosting persists.
16. **`app/(pages)/launch-checklist/page.tsx`** — correctly gated internal QA content worth keeping as an internal tool.

---

## 20. Unknowns Requiring Further Investigation

> **Session 01B (2026-08-31):** items 1, 2, 3, 5, 11, 15 are **RESOLVED** by live verification; items 4 and 9 are **PARTIALLY RESOLVED**; a new item 23 was added. Resolutions are marked inline. Evidence in §0.

| # | Unknown | How to resolve |
|---|---|---|
| 1 | ~~**Production hostname**~~ — **RESOLVED (01B).** OWNER-SUPPLIED FACT `https://mappedskills.com`, corroborated by live canonicals and all 15 sitemap URLs. | *Done* |
| 2 | ~~**Which robots.txt is served**~~ — **RESOLVED (01B).** `public/robots.txt` wins; `app/robots.ts` is inert. GPTBot/CCBot **not** blocked live. | *Done* |
| 3 | ~~**Actual `Cache-Control` on HTML responses**~~ — **RESOLVED (01B).** `max-age=31536000, immutable` confirmed on all five HTML pages tested. | *Done* |
| 4 | **Whether contact-form submissions were ever received** — **PARTIALLY RESOLVED (01B).** Live form confirmed to have no `action`/`method` and no endpoint exists; `DELIVERY NOT VERIFIED` as no test enquiry was sent. | Owner to check `info@mappedskills.com` and report enquiry volume |
| 5 | ~~**Whether the Calendly embed renders**~~ — **RESOLVED (01B).** It does not. Empty 384px container, zero iframes; a misplaced badge bar renders instead. | *Done* |
| 6 | **`.htaccess` contents on the server** | Retrieve via SSH/cPanel File Manager |
| 7 | **GTM container contents** — **CONTEXT CHANGED (01B).** No GTM, GA4, or Meta Pixel is loading in production at all, so there is no live container to protect and **no analytics baseline exists**. Whether a configured container exists unused remains unknown. | GTM and GA4 admin consoles |
| 8 | **Search Console verification status and property** | Search Console |
| 9 | **Which env vars are actually set in production** — **PARTIALLY RESOLVED (01B) by observed behaviour, not by panel access.** `NEXT_PUBLIC_CALENDLY_URL` **is** set; `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` appear **unset**; `NEXT_PUBLIC_SITE_URL` resolves to the correct apex. Contentful credential status still unknown. | cPanel Node.js App environment panel (out of scope for 01B) |
| 10 | **Contentful post and case-study counts and full slug lists** — **SHARPENED (01B).** Production currently publishes **zero** posts and **zero** case studies. The open question is now whether the space is empty or the credentials are missing. | Contentful admin, or one build-log check |
| 11 | ~~**Whether the three blog slugs hard-coded in `/404` exist**~~ — **RESOLVED (01B).** They do not; `/blog/seo-vs-ppc` and `/blog/facebook-ads-not-working` return **404**. | *Done* |
| 12 | **Provenance of hard-coded testimonials, client names, and result figures in `lib/constants.ts`** | Owner confirmation; contractual/legal check |
| 13 | **Substantiation for the "300%+ ROI" title claims** | Owner evidence |
| 14 | **Which deploy procedure is actually used** — CI server-build or local zip upload | Owner |
| 15 | ~~**Whether `docs/` … are web-reachable**~~ — **RESOLVED (01B).** Not reachable: unknown paths return a correct **404** (`/this-page-does-not-exist-xyz` → 404). | *Done* |
| 16 | **Whether the site builds cleanly at all** | `npm ci && npm run build` in a local environment |
| 17 | **Core Web Vitals, bundle sizes, TTFB, CDN, compression, HTTP version** | Live measurement (PageSpeed Insights / CrUX / WebPageTest) |
| 18 | **Measured colour-contrast ratios** | Automated a11y scan on the live site |
| 19 | **Current indexation, rankings, traffic, backlinks** | Search Console + a backlink tool |
| 20 | **Current AI-system visibility baseline** | A defined prompt universe per `SOURCE_AND_EVIDENCE_POLICY.md` |
| 21 | **Staging environment, rollback procedure, monitoring, error tracking** | Owner / host |
| 22 | **Full H2→H4 nesting order within the 600–700-line pages** | Rendered-HTML inspection |
| 23 | **(New, 01B)** Why `https://www.mappedskills.com` serves 200 instead of redirecting to the apex, and where host normalisation should live (LiteSpeed vs. application) | Host configuration review |

---

## 21. Ranked Risk Register

### CRITICAL

> **Session 01B reclassification (2026-08-31, live production evidence — see §0):**
> **C1 PARTIALLY VERIFIED** · **C2 CONFIRMED** · **C3 CLEARED as a live risk, downgraded to latent Medium** · **C4 CONFIRMED** · **C5 CLEARED** · **C6 PARTIALLY VERIFIED, downgraded to pre-launch blocker.**

**C1 — The site cannot capture a lead.** No `app/api/`. `ContactForm` simulates submission via `setTimeout` and displays "Thank You!" and "We respond within 24 hours"; `BlogNewsletterForm` displays "Check your email for confirmation." No data is transmitted anywhere. **INFERENCE:** every enquiry submitted since this code shipped was lost. *Verify against production immediately.*
> **01B — PARTIALLY VERIFIED.** Live `/contact` renders `<form>` with **no `action` and no `method`**, 10 controls, no CAPTCHA, no consent checkbox; no `/api/contact` route exists on production. The implementation matches the repository exactly. **`DELIVERY NOT VERIFIED`** — no test enquiry was submitted, and successful capture is not inferred from the success UI. Confirming whether enquiries arrive still requires the owner to check the destination inbox.

**C2 — Global `immutable` one-year cache header probably applied to HTML.** `next.config.mjs` `/:path*`; the `.html`-suffixed override cannot match extensionless App Router routes. **INFERENCE:** ISR is neutralised and content updates are invisible to returning visitors and caches. *One `curl -I` settles it.*
> **01B — CONFIRMED.** `cache-control: public, max-age=31536000, immutable` observed on `/`, `/seo`, `/contact`, `/schedule-call`, and `/blog`. `/sitemap.xml` correctly receives `max-age=3600, must-revalidate`, proving the `.xml` branch of the override matches while extensionless HTML routes do not — exactly the inferred mechanism. Server-side ISR is working (`x-nextjs-cache: HIT/STALE`, `x-nextjs-stale-time: 300`), so the damage is confined to client and intermediary caches, where it is total.

**C3 — Conflicting robots.txt with AI-crawler policy opposed to the charter.** Two files claim `/robots.txt`; `app/robots.ts` blocks `GPTBot` and `CCBot` site-wide while `PROJECT_CHARTER.md` requires AI-search visibility.
> **01B — CLEARED as a live risk; downgraded to latent Medium.** Production serves the **static `public/robots.txt`** (evidenced by `content-length: 681`, `last-modified: 2026-08-21`, and the absence of any `x-nextjs-*` header — LiteSpeed serves it directly). `app/robots.ts` is inert dead code. **GPTBot and CCBot are not blocked in production**, and no AI-crawler directive of any kind is live. The charter conflict is therefore not currently active. The residual risk is latent: deleting `public/robots.txt` — a plausible redesign cleanup — would silently hand `/robots.txt` back to the Next.js route and begin blocking those crawlers with no code change and no review.

**C4 — Contentful is a single point of failure that fails silently.** Missing credentials or an outage yields HTTP 200 with an empty blog, empty case studies, and a 15-URL sitemap — no error, no build failure, no alert.
> **01B — CONFIRMED, and this is the current production state.** `/blog` returns 200 rendering **"No articles found"** with zero article links; `/work` contains zero case-study links; `/sitemap.xml` contains **exactly the 15 static URLs and no CMS URLs**. The three blog slugs hard-coded in `app/not-found.tsx` return **404**, so the 404 recovery page links to further 404s. **UNKNOWN:** whether the cause is missing/invalid Contentful credentials in the build environment or an empty Contentful space — the observable outcome is identical, which is precisely the silent-failure mode this risk describes.

**C5 — Production domain is ambiguous.** If `NEXT_PUBLIC_SITE_URL` is unset or points at a staging host, every canonical, sitemap URL, `robots.host`, and schema `url` points away from the served page. Blocks all migration planning until resolved.
> **01B — CLEARED.** OWNER-SUPPLIED FACT: production is `https://mappedskills.com`. Corroborated live — the homepage canonical is `https://mappedskills.com/`, and all 15 sitemap URLs use that host. `ms.mappedskills.com` is a repository/deployment artifact only. **Residual Medium issue:** `https://www.mappedskills.com` returns 200 rather than redirecting to the apex (byte-identical content, identical `etag`), so the site is reachable on two hostnames. This is substantially mitigated by the `www` response self-canonicalising to the apex and its `robots.txt` declaring the apex sitemap. Migration planning is no longer blocked.

**C6 — No consent management with third-party tracking active.** GTM and Meta Pixel load unconditionally; the site's own privacy policy says a banner is required. Compliance exposure requiring legal review.
> **01B — PARTIALLY VERIFIED; downgraded to a pre-launch blocker.** Live browser inspection of `/contact` and `/schedule-call` found `window.dataLayer`, `window.gtag`, and `window.fbq` **all undefined**, no GTM `<noscript>` iframe in the HTML, and **zero third-party scripts on `/contact`**. **INFERENCE:** `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` are unset in production, so no third-party tracking cookies are being set today and there is no live compliance breach. The unguarded code path is unchanged and will fire the moment those variables are set, so this must be resolved before launch rather than after.

### HIGH

**H1 — No structured data on the five service landing pages or `/portfolio/[slug]`** — the highest commercial-intent URLs on the site.

**H2 — No OG image on any page except blog articles,** while `twitter:card: summary_large_image` is declared everywhere. The module written to fix this is dead code pointing at a non-existent route and asset.

**H3 — Calendly embed broken.** `initBadgeWidget` API called against a `calendly-inline-widget` container. This is the destination of the site-wide primary CTA.
> **01B — CONFIRMED live.** `NEXT_PUBLIC_CALENDLY_URL` *is* set and `widget.js` *does* load, but the `.calendly-inline-widget` element has **0 children, 0 bytes of innerHTML, and a rendered height of 384px**, and the page contains **zero iframes**. A visitor reaching the heading "Choose a Time That Works for You" sees a blank 384-pixel void. `initBadgeWidget` instead produced a badge rendered as a **1265×24px bar pinned at `top:0, left:0`**, overlapping the sticky header. Separately, the **pre-hydration HTML shows the "Calendly booking link is not configured yet" fallback**, which is what non-JS crawlers and AI agents see on the primary conversion page. **No booking interface is reachable anywhere on the site.**

**H4 — No analytics event taxonomy, and in production no analytics at all.** Two disconnected conventions (`dataLayer.push` vs direct `gtag`), divergent event names, a fully dead helper module, and seven documented-but-unimplemented events on the 404 page alone.
> **01B — escalated.** `dataLayer`, `gtag`, and `fbq` are all undefined in a real browser, and `/contact` loads no third-party scripts at all. **No GTM, GA4, Meta Pixel, or Vercel Analytics is running in production.** This inverts one migration assumption in §17: there is no GTM container configuration to protect, because no measurement is live. It also means **no analytics baseline exists for this site**, so Gate 22 has no historical data to compare against and any baseline must be established from zero.

**H5 — Image optimisation disabled site-wide,** with two raw `<img>` tags including Contentful body images on article pages.

**H6 — No tests, no lint config, and TypeScript errors suppressed.** No safety net for a redesign. Directly against `PROJECT_RULES.md` Rule 14.

**H7 — Content architecture cannot scale to an SEO program.** 100-item CMS ceiling, no pagination, no category/tag/author archives, service copy locked in a 1,263-line TypeScript file requiring a fragile shared-host rebuild to change.

**H8 — Deployment is fragile and irreversible.** Single-worker 512 MB builds on a host documented as killing build workers; `rsync --delete` straight to production; no staging, no versioned artifact, no rollback; two contradictory documented procedures.

**H9 — Unsubstantiated "300%+ ROI" claims in two indexable titles,** plus hard-coded testimonials and client results of unverified provenance. `PROJECT_RULES.md` Rule 15.

**H10 — No CSP** while third-party script-injection paths exist.
> **01B — HSTS half CLEARED, CSP half CONFIRMED.** `strict-transport-security: max-age=63072000; includeSubDomains` **is** present on production responses — added at the LiteSpeed/host layer, not by `next.config.mjs`, so the repository finding stands for the repo while the production gap is closed. `content-security-policy` is **absent, confirmed live**. Note that only Calendly actually loads a third-party script today.

### MEDIUM

**M1** — Accessibility architectural gaps: no skip link, no `prefers-reduced-motion` support, unlabelled newsletter input, colour-only link distinction, unlabelled `<nav>` elements, no `aria-live` on form status. Against Rule 13.
**M2** — Only 8 `alt` attributes across the entire codebase.
**M3** — Forced dark mode with an unreachable light palette and a fragile `.bg-*` override hack list.
**M4** — `lib/schema.ts` unused; schema hand-built inline and inconsistently; malformed address data (`postalCode: 'India'`, `streetAddress` holding a region string).
**M5** — Sitemap `lastModified` uniformly `new Date()`; `changefreq` likely dropped; hard-coded page list that will drift.
**M6** — No breadcrumb UI despite `BreadcrumbList` schema on 11 routes.
**M7** — `/services` unreachable from the header; `/about` and `/faq` footer-only; `/thank-you` orphaned; `/portfolio` has no index.
**M8** — `sameAs` may be empty in production while the footer hard-codes three social URLs — entity signals disagree.
**M9** — Four of five service pages bypass the shared `Hero`.
**M10** — Dual lockfiles; ~4.1 MB `public.zip` and a tsbuildinfo cache committed; whole repo including `docs/` and `CLAUDE.md` rsynced to the production host.
**M11** — No spam protection anywhere; becomes immediately critical when forms are connected.
**M12** — PII (raw email) pushed into the analytics dataLayer by `BlogNewsletterForm`.

### LOW

**L1** — `generator: 'v0.app'` and `[v0]` console logging left in place.
**L2** — Invalid top-level `canonical` key in three files (inert).
**L3** — `/social-media-ads` title omits the brand suffix.
**L4** — `/launch-checklist` has no title or description in metadata.
**L5** — `@vercel/analytics` shipped on non-Vercel hosting.
**L6** — Dead files: `lib/og-image.ts`, `styles/globals.css`, `components/theme-provider.tsx`, `lib/design-system.ts`, `lib/tracking.ts`.
**L7** — Duplicated hooks; ~12+ unused `ui/` primitives; unused `placeholder.*` assets.
**L8** — Deprecated `X-XSS-Protection` header.
**L9** — Duplicate `a {}` / `button {}` rules in one CSS layer.
**L10** — `components/Logo.tsx` needlessly a client component.

---

## 22. Recommended Audit Follow-Ups

Ordered. These are **investigation** tasks, not implementation tasks. No fixes are proposed by this session and none should be started before the orchestrator reviews this audit.

1. **Live production verification** — resolve C2, C3, C5 and Unknowns 1–3, 15 with a handful of HTTP requests: `curl -I` the homepage and a service page for `Cache-Control`; `curl /robots.txt`; `curl /sitemap.xml`; confirm the served hostname; test whether `docs/` is web-reachable.
2. **Confirm the lead-capture failure with the owner** (C1). Compare reported enquiry volume against site traffic and check the `info@mappedskills.com` inbox. This single answer determines whether the program has an emergency or a planned rebuild.
3. **Retrieve external configuration** — `.htaccess` from the server, the cPanel Node app's environment variables, and the GTM container export. All three are load-bearing and invisible to this repository.
4. **Search Console and GA4 baseline export** — indexation, queries, pages, and conversions *before* any change. Without this there is no before/after evidence and Gate 22 cannot be satisfied later.
5. **Full URL inventory from Contentful** — every blog and case-study slug, with counts, so the migration redirect map can be built against reality rather than assumption.
6. **Local build verification** — `npm ci && npm run build` in a clean environment to establish whether the project builds, what warnings appear (particularly any robots.txt route conflict), and what the bundle actually contains. This session could not run it.
7. **Live performance and accessibility measurement** — PageSpeed Insights / CrUX for real Core Web Vitals, and an automated a11y scan for measured contrast. No numbers should be assumed until these are run.
8. **Owner verification of proof assets** (H9) — provenance and publishability of the hard-coded testimonials, client names, and result figures, plus substantiation for "300%+ ROI".
9. **Backlink inventory** on the nine legacy redirect sources and current URLs, to quantify what the redirect map must protect.

**Explicitly out of scope for this session and not begun:** keyword research, competitor research, AI-visibility measurement, IA design, redesign, and any code fix. Per `PROJECT_RULES.md` Rule 20 and Quality Gate 1, this audit stops here pending orchestrator review.
