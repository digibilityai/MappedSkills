# Session 33 — Phase I — Functional and Launch Hardening

**Session:** 33 · **Date:** 2026-09-06 · **Branch:** `test_branch`
**Starting HEAD:** `6a7def3` — *refactor: remove dormant direct gtag emitters*
**Result: PASS — READY FOR CONTROLLED PRODUCTION DEPLOYMENT.**

---

## 0. Two deviations from the brief, recorded first

**1. THE BRIEF EXPECTED HEAD `c816633`. THE ACTUAL HEAD WAS `6a7def3`.** The session was stopped
at §2 as instructed and the divergence put to the owner, who directed that Phase I proceed from
`6a7def3`. The two intervening commits — `e956d2d` (Consent Mode v2 and consent-gated GTM delivery)
and `6a7def3` (removal of the dormant `window.gtag` emitters) — are additive and dormant, and they
**already satisfy the brief's §20 analytics freeze**: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID` and
`NEXT_PUBLIC_META_PIXEL_ID` are all empty, and the GTM loader requires an id **and** explicit
consent before it requests anything.

**2. THIS DOCUMENT IS `21_`, NOT `20_`.** The `20_` slot is `20_PHASE_H2A_CONSENT_AND_GTM.md`.
The brief's "Session 33" label also collides with labels already used in that document; the session
identifier is kept as the brief states it and the collision is recorded rather than silently
renumbered.

---

## 1. Starting state — VERIFIED FACT

| Item | Observed |
|---|---|
| Working directory | `/Users/amitguptaamit/gitrepo/mappedskills` |
| Branch | `test_branch` |
| HEAD | `6a7def3` |
| `origin/test_branch` | `4780d4b` — local ahead by 22, **nothing pushed** |
| Working tree | Clean apart from untracked `README.md` and `mappedskills-cpanel-20260906-101820.zip` |
| `README.md` | **Untouched, unmodified, unstaged — and still so at session end** |

---

## 2. Launch-debt reconciliation

Reconciled against the actual repository, not against the summaries.

| # | Finding | Source | State found | Phase I action | Classification |
|---|---|---|---|---|---|
| A | `postalCode: 'India'` in Organization **and** LocalBusiness | Brief §5A | **Confirmed, both entities** | Address rebuilt from the published Pune office | **FIXED** |
| A2 | `streetAddress: 'Pune, Maharashtra, India'` — not a street | Repository | Confirmed | Real street lines used | **FIXED** |
| A3 | `priceRange: '₹₹'` — a pricing claim | Repository | Confirmed | Removed | **FIXED** |
| A4 | Two unlinked entities for one company | Repository | Confirmed | Merged to one `Organization` with `@id` | **FIXED** |
| B1 | F10 systemic commercial double-close | `16_PHASE_F` §F10 | Confirmed — `CommercialClose` records that Phase F could not fix the footer | Footer CTA strip removed | **FIXED** |
| B2 | "improve ROI" in footer blurb | Brief §5B | Confirmed, sitewide | Replaced with the homepage's approved description | **FIXED** |
| B3 | "Performance Marketing \| Lead Generation \| SEO \| CRO" | Brief §5B | Confirmed, sitewide | Removed, not replaced | **FIXED** |
| B4 | Footer 2 → 4 heading jump sitewide | Brief §5B | Confirmed | Column headings `h4` → `h2`; strip's `h2` gone | **FIXED — 0 jumps on 20 routes** |
| B5 | "free strategy call" CTA | Brief §5B | Confirmed, sitewide | Removed with the strip | **FIXED** |
| B6 | Footer second commercial ask on `/thank-you` | Brief §5B | Confirmed | Removed with the strip | **FIXED** |
| B7 | A **third** ask — "Schedule Call →" in the contact column | Repository | Found this session | Removed | **FIXED** |
| B8 | Footer printed `+919873232662` (raw `tel:` value) | Repository | Found this session | `phoneDisplay` used | **FIXED** |
| B9 | Footer labelled `/work` "Case Studies" | Repository | Found this session | Relabelled "Work" | **FIXED** |
| C | `public/robots.txt` shadows `app/robots.ts`; GPTBot/CCBot latent trap | Brief §5C, `10_PHASE_A0` §5, **R20** | **Confirmed** | Static file deleted **and** GPTBot/CCBot rules removed in the same change | **FIXED — policy unchanged** |
| C2 | `Disallow: /admin/` and `/api/` grouped under SemrushBot — never in force | Repository | Found this session | Applied to `*` as intended | **FIXED (declared delta)** |
| D | Sitemap incomplete | Brief §5D | Confirmed — 4 live routes missing | Rebuilt from indexable set | **FIXED** |
| D2 | Sitemap listed `/work`, which is `noindex` | Repository | Found this session | Removed | **FIXED** |
| D3 | `changefreq` misspelled; `lastModified: new Date()` always "now" | Repository | Found this session | Both removed | **FIXED** |
| E | `/work` must be NOINDEX until real proof exists | Brief §5E | **Already correct** — Phase G added it | None needed | **ALREADY FIXED** |
| F | www and apex both 200, no redirect | Brief §5F, `10_PHASE_A0` | Confirmed | 308 www → apex in `next.config.mjs` | **FIXED (app) + deployment verification required** |
| G | `immutable` one-year HTML cache | Brief §5G, Phase A | **Already corrected by Phase A** | Re-verified on the production server | **ALREADY FIXED — one residual, §11** |
| H | CSP absent | Brief §5H | Confirmed | Four safe directives added; `script-src` staged | **PARTIALLY FIXED — staged by design** |
| H2 | `X-XSS-Protection: 1; mode=block` — deprecated | Repository | Confirmed | Set to `0` | **FIXED** |
| I | Empty `/blog`, empty `/work`, broken blog links | Brief §5I | **Already handled honestly** by Phase F/G empty states | None | **ALREADY FIXED** |
| I2 | **`/research/ai-visibility-baseline` 404, linked from `/` and `/ai-seo` (3 links)** | **Found this session by crawling the built site** | **Live defect** | All three links removed | **FIXED** |
| J | Image optimisation disabled | Brief §5J | Confirmed | **Deliberately unchanged** — §16 | **NO CHANGE, REASONED** |
| K | Migration 002 a deployment prerequisite | Brief §5K | Confirmed | Runbook §21 | **DOCUMENTED** |
| L | Booking owner-blocked | Brief §5L | **URL now verified to resolve** — §14 | Classification corrected | **NON-BLOCKING OWNER INPUT** |
| M | Transactional email absent | Brief §5M | Confirmed | None | **NON-BLOCKING** |
| N | Analytics provider activation | Brief §5N | Confirmed dormant | None | **ANALYTICS-DEFERRED** |
| O | Legacy fabricated claims in `lib/constants.ts`, `SocialProofStrip`, `HeroDashboard` | Found this session | **Not imported anywhere — dead code** | Left in place, recorded | **POST-LAUNCH** |
| P | Six "free audit" offers in blog CTA config | Found this session | Renders on zero routes today | Removed | **FIXED** |
| Q | Root layout `generator: 'v0.app'` and "for SaaS" positioning | Found this session | Confirmed in document head | Removed / replaced | **FIXED** |
| R | Footer nav links 19px tall (programme floor is 40px) | Found this session | Pre-existing Phase B chrome | Reported, not changed — §18 | **POST-LAUNCH** |

---

## 3. Structured data

| Item | Before | After |
|---|---|---|
| Entities on every page | `Organization` **and** `LocalBusiness`, unlinked | **One `Organization`** with `@id` `…/#organization` |
| `postalCode` | `'India'` in both | `411060`, parsed from the published Pune address |
| `streetAddress` | `'Pune, Maharashtra, India'` | `Tower C3, #503, Nyati Esteban I, Near Country Club, Undri` |
| `priceRange` | `'₹₹'` | **Removed** — pricing is owner-blocked |
| `description` | "Performance marketing agency specializing in…" | The homepage's own approved meta description, verbatim |
| `areaServed` | `['IN']` on Organization; `City: ['Pune','Mumbai','India']` on LocalBusiness — "India" is not a city | **Removed** — the address states where the firm is |
| `logo` | absent | added (`/ms_Logo.webp`, an existing asset) |
| `sameAs` | four empty env strings, filtered | unchanged — still filtered to `[]` |

**The address is derived from `offices[0]` in `lib/metadata.ts`, the same array the footer renders**,
so the marked-up address and the visible address cannot drift apart.

**`LocalBusiness` was removed rather than repaired.** The type asserts a place of business a customer
visits, and no opening hours, geo coordinates or verified business profile have been approved to
support it. **Whether to publish `LocalBusiness` is an owner decision** and is listed in §22.

**Other JSON-LD, all left unchanged and all appropriate:**

| Surface | Type | Verdict |
|---|---|---|
| Phase F `Breadcrumb`, Phase G `RouteBreadcrumb` | `BreadcrumbList` | **Keep.** Visible crumb and markup are generated from the same array, so they cannot drift |
| `/privacy-policy`, `/terms` | `BreadcrumbList` | **Keep.** Hand-written and host-hardcoded rather than env-derived — cosmetic inconsistency, recorded |
| `/faq` | `FAQPage` | **Keep.** Generated from the visible Q&A. Note: Google restricted FAQ **rich results** to government and health sites in 2023, so no rich result is expected; the markup remains useful to AI/answer systems, which is on-strategy |
| `/blog/[slug]` | `FAQPage`, `BreadcrumbList`, article schema | Conditional — renders on zero routes today |
| `lib/schema.ts` | `generateServiceSchema`, `generateArticleSchema`, `generatePersonSchema`, and the library `FAQ`/`Breadcrumb` helpers | **Unused dead exports.** No `Service`, `Review` or `AggregateRating` schema is emitted anywhere |

**No `Review`, `AggregateRating`, `Offer` or `Service` claim is emitted by this site.**

---

## 4. Metadata and canonicals

Every one of the 23 routes exports its own `metadata` through `createMetadata`.

| Item | Result |
|---|---|
| Titles | One per route, route-specific |
| Descriptions | One per route |
| Canonicals | **Verified in served HTML** — `https://mappedskills.com/`, `/contact`, `/pricing` … apex host, path-exact |
| Open Graph | `title`, `description`, `url`, `siteName`, `type`, `locale` on every route; Twitter `summary_large_image` |
| Duplication | None found |
| Legacy metadata removed | Root-layout fallback title "Performance Marketing for SaaS" and description "Accelerate your SaaS growth…" (superseded positioning, and a "SaaS" segment claim made nowhere else); `generator: 'v0.app'` (named the scaffolding tool, published in the head) |
| Invalid key removed | A stray top-level `canonical` in `createMetadata` — not part of Next's `Metadata` type, emitted nothing, and was a standing TypeScript error. `alternates.canonical` was already present and is unchanged, so **no route's canonical output changed** |

---

## 5. Indexability matrix

Reconciled against each route's own emitted `<meta name="robots">`, read from the production server.

| Route | Expected | Actual | Action | Result |
|---|---|---|---|---|
| `/` | index | index | — | ✅ |
| `/services` | index | index | — | ✅ |
| `/seo` · `/ai-seo` · `/google-ads` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` | index | index | — | ✅ |
| `/problems/traffic-but-no-enquiries` | index | index | **added to sitemap** | ✅ |
| `/how-it-works` · `/pricing` · `/about` · `/faq` · `/contact` · `/schedule-call` | index | index | — | ✅ |
| `/blog` | index | index | — | ✅ (honest empty state) |
| `/blog/[slug]` | index | index | conditional — 0 pages today | ✅ |
| `/portfolio/[slug]` | conditional | index | conditional — 0 pages today; **owner note in §22** | ⚠ conditional |
| `/work` | **noindex** — proof policy | `noindex, nofollow` | **removed from sitemap** | ✅ |
| `/thank-you` | **noindex** | `noindex, nofollow` | already out of sitemap | ✅ |
| `/privacy-policy` · `/terms` | noindex | `noindex, nofollow` | — | ✅ |
| `/launch-checklist` | not public | **404 in production** (gated on `ENABLE_INTERNAL_PAGES`) + `noindex` | — | ✅ |
| 404 | noindex | `noindex, nofollow` | — | ✅ |
| `/api/enquiry` | not a content surface | POST-only, `Cache-Control: no-store` | now `Disallow: /api/` | ✅ |
| `/robots.txt` · `/sitemap.xml` | served | 200 | — | ✅ |

**Routes without exactly one `<h1>`: 0. Heading jumps across 20 routes: 0.**

---

## 6. Robots

| Item | Result |
|---|---|
| Authoritative implementation | **`app/robots.ts` — one source, served at `/robots.txt`** |
| `public/robots.txt` | **DELETED.** Phase A0 verified it shadowed the route handler in production |
| GPTBot | **Not mentioned — permitted, exactly as live today.** The `disallow` that sat unreachable in `app/robots.ts` is removed |
| CCBot | **Not mentioned — permitted, exactly as live today.** Same |
| Unresolved policy | **Whether to block GPTBot/CCBot remains an OWNER / PROGRAMME DECISION (R20).** Phase I did not decide it. The one-line change either way is written into the file's header comment |
| Bad-bot blocks preserved | `MJ12bot`, `AhrefsBot`, `SemrushBot` — all live today, all carried over |
| Bing `Crawl-delay: 1` | Preserved (Bing honours it) |
| Dropped as no-ops | `Crawl-delay: 0.1` on `*`, `Crawl-delay: 0` on Googlebot, a Googlebot group whose only rule `*` already grants, and `Allow: /api/sitemap` / `/api/rss` for routes that do not exist |
| **Declared delta from live** | `Disallow: /admin/` and `Disallow: /api/` now apply to `*`. They were written after `User-agent: SemrushBot` with no new agent line, so robots.txt grouping attached them to SemrushBot — which is already fully disallowed, making them dead lines. **No content route is affected, and robots.txt governs crawling, not form submission** |

**Why the two changes had to ship together.** Deleting the static file alone would have activated a
site-wide GPTBot/CCBot block as a side effect — the exact trap **R20** was re-rated to describe.
Removing the rules alone would have left two robots sources. Live crawler behaviour is unchanged.

---

## 7. Sitemap

| Item | Result |
|---|---|
| Implementation | `app/sitemap.ts` |
| URL count | **16** static + Contentful entries (0 today) |
| Canonical host | `https://mappedskills.com` throughout — verified |
| Non-indexable routes included | **None.** `/work`, `/thank-you`, `/privacy-policy`, `/terms`, `/launch-checklist` and 404 all excluded, each checkable against the route's own `robots` metadata |
| Broken URLs | **None — all 16 return 200**, verified against the production server |
| Added | `/ai-seo`, `/problems/traffic-but-no-enquiries` |
| Removed | `/work` |
| `changefreq` / `priority` | **Removed.** They were emitted under the wrong key (`changefreq` vs `changeFrequency`) and were therefore silently dropped anyway; Google states it ignores both; and the values were invented |
| `lastModified` | **Removed.** It was `new Date()` — every page claiming to have changed at build time |
| Fabricated entries | **None.** Blog and case-study URLs come only from Contentful, which returns `[]` today |

---

## 8. Host canonicalisation

| Item | Result |
|---|---|
| Apex | `https://mappedskills.com` — the canonical host, unchanged |
| www | Previously 200 with no redirect (Phase A0) |
| Redirect | **Implemented** in `next.config.mjs` — `has: [{ type: 'host', value: 'www.mappedskills.com' }]` → `https://mappedskills.com/:path*`, permanent |
| Verified | **308**, tested against the production server with a `Host:` header |
| HTTPS | Preserved — destination scheme is explicit `https://` |
| Path preserved | ✅ `/problems/traffic-but-no-enquiries` → same path |
| Query preserved | ✅ `?utm_source=x&utm_medium=y` carried through intact |
| Loop safe | ✅ One exact source host, a different destination host — cannot re-match |
| Local/dev safe | ✅ `localhost` and the apex both returned 200, untouched |
| **Deployment-owned** | **This only fires if www actually reaches the Node process.** If LiteSpeed/cPanel answers `www.` from a different document root or does not proxy that hostname, the rule never runs. **Verify on the live host** — command in §21 |

---

## 9. Redirects

All eight legacy redirects verified against the production server. **No chains, no loops, all 308.**

| Source | Status | Destination | Destination exists |
|---|---|---|---|
| `/seo-services` | 308 | `/seo` | ✅ 200 |
| `/google-ads-service` | 308 | `/google-ads` | ✅ 200 |
| `/social-media-advertising` | 308 | `/social-media-ads` | ✅ 200 |
| `/lead-generation-services` | 308 | `/lead-generation` | ✅ 200 |
| `/content-marketing-services` | 308 | `/blog` | ✅ 200 |
| `/digital-marketing-services` | 308 | `/services` | ✅ 200 |
| `/contact-us` | 308 | `/contact` | ✅ 200 |
| `/results` | 308 | `/work` | ✅ 200 (`noindex`) |
| `/results/:slug` | 308 | `/portfolio/:slug` | ⚠ **404 today** |
| **www → apex** (new) | 308 | apex, path + query preserved | ✅ |

**`/results/:slug` is left unchanged and recorded rather than repaired.** Its destination is correct
in shape and will resolve the moment a case study exists in Contentful; repointing it at `/work`
would break that. No page on this site links to it, so no visitor is routed into the 404 by the
site's own navigation — it is reachable only from an external legacy link.

---

## 10. Internal links

**The built site was crawled from 21 seed routes on the production server.**

| Item | Result |
|---|---|
| Internal routes reached | 22 |
| Internal link instances followed | **634** |
| **Broken (404)** | **0** — the only 404 is a deliberate probe URL |
| Redirecting | 0 internal links point at a redirect |
| External links | `calendly.com/mappedskills`, `linkedin.com/company/mappedskills`, `facebook.com/mappedskills`, `instagram.com/mappedskills` |

**THE DEFECT THIS FOUND, AND IT WAS A REAL ONE.** `/research/ai-visibility-baseline` returned **404**
and was linked **three times**: twice from the homepage (`HomepageAccountability`) and once from
`/ai-seo`. That route has never existed, and `PAGE_COPY_INDEX.md` records both research entries as
**NOT DRAFTED**. `/how-it-works` had already reached the same conclusion in its own words — *"link
to both /research entries; neither route exists, so no link"* — so the homepage and `/ai-seo` were
the two surfaces that had not caught up.

**All three links are removed, and the research page was NOT fabricated to satisfy them.** The
measurement each link supported is unchanged and still stands on its own: the run count, the date,
the location, the signed-out condition and the explicit absence of a confidence interval are all
stated inline. What was removed is a promise of a document that does not exist.

**Social profile URLs were not verified** — they are hard-coded in `Footer.tsx` rather than read
from the (empty) `NEXT_PUBLIC_*_URL` variables. Recorded in §22.

---

## 11. Cache

Measured on the production server (`node server.cjs`, the actual deployment entry point).

| Surface | `Cache-Control` | Verdict |
|---|---|---|
| HTML, ISR routes (`/`, `/blog`, `/work`) | `s-maxage=60, stale-while-revalidate=31535940` | ✅ correct |
| HTML, static routes (`/contact`, `/thank-you`) | `s-maxage=31536000` | ⚠ see below |
| 404 | `private, no-cache, no-store, max-age=0, must-revalidate` | ✅ |
| `/api/enquiry` success | `no-store` | ✅ |
| `/_next/static/*` | `public, max-age=31536000, immutable` | ✅ correct for content-hashed assets |
| `/sitemap.xml` | `public, max-age=3600, must-revalidate` | ✅ |
| `/robots.txt` | `public, max-age=0, must-revalidate` | ✅ |

**No HTML is served `immutable`, and none carries a browser `max-age`.** The Phase A defect —
`public, max-age=31536000, immutable` on documents — is gone and did not return.

**The one residual, stated plainly rather than papered over.** Next.js emits `s-maxage=31536000` on
fully-static prerendered documents. **`s-maxage` is ignored by browsers** and applies to shared
caches only, so no visitor holds a stale page. **But a CDN or LiteSpeed cache in front of the app
would hold a document for a year with no purge mechanism on this deployment.** It was NOT overridden
here: Phase A's recorded decision is "stop overriding what Next.js already gets right", and the
previous override is what caused the original defect. **It is a deployment verification instead** —
§21 step 12.

---

## 12. Security headers

| Header | Value | Owner |
|---|---|---|
| `Content-Security-Policy` | `base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'` | **Application — NEW** |
| `X-Content-Type-Options` | `nosniff` | Application |
| `X-Frame-Options` | `SAMEORIGIN` | Application (kept for browsers that do not read CSP) |
| `X-XSS-Protection` | **`0`** (was `1; mode=block`) | Application |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Application |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Application |
| `HSTS` | **Not set by the application** — Phase A0 verified it is live from the host with a 2-year max-age and `includeSubDomains` | **Hosting — do not duplicate** |

**All verified present on a real response from the production server.**

### 12.1 The CSP is deliberately partial, and this is the staged plan

**Shipped now**, because each is zero-risk against this codebase:

- `base-uri 'self'` — an injected `<base>` silently repoints every relative URL, including the
  contact form's. Nothing sets `<base>`.
- `object-src 'none'` — no `<object>`, `<embed>` or `<applet>` exists anywhere.
- `frame-ancestors 'self'` — nothing embeds this site.
- `form-action 'self'` — **there is exactly one `<form>`**, it has no `action` attribute, and it
  posts to same-origin `/api/enquiry`. Verified by search.

**Deliberately absent: `default-src`, `script-src`, `style-src`.** Next.js injects inline bootstrap
and hydration scripts into every document. Restricting `script-src` without allowing them requires a
per-request nonce, and a nonce requires **dynamic rendering** — which would convert all 25 statically
prerendered routes into server-rendered ones. That trade is not a hardening win. The alternative,
`script-src 'self' 'unsafe-inline'`, permits exactly the injection it appears to prevent. The brief
asks for a documented staged plan over a knowingly wrong policy, and this is it.

**Because no `default-src` is declared, only the four directives above apply** — scripts, styles,
images, fonts, frames and connections are unrestricted, so nothing here can break a page. Verified:
every route renders, the contact form submits, and no CSP violation appears in the console.

**Stage 2, when analytics is reopened:** add `script-src`, `connect-src`, `img-src` and `frame-src`
covering `*.googletagmanager.com` and `*.google-analytics.com`, decided together with the
nonce-versus-static-rendering trade-off.

---

## 13. Database deployment — migration 002

| Item | State |
|---|---|
| `001_create_enquiries.sql` | Present. Creates `enquiries` |
| `002_add_enquiry_attribution.sql` | Present. **14 NULLable columns + one index. Additive only** |
| Runner | `scripts/db-migrate.cjs` — ledger table `schema_migrations`, idempotent, **refuses any file containing DROP / TRUNCATE / DELETE**, detects edits to already-applied files, never prints a credential or a driver message |
| Commands | `npm run db:verify` · `npm run db:status` · `npm run db:migrate` |
| Application compatibility | **`lib/enquiries.ts` INSERTs the 002 columns.** Deploying this code against a database with only 001 makes **every enquiry fail with an honest 503** — no false success, but no enquiries either |
| Reversibility | Additive and NULLable, so the safer rollback is **application rollback, not schema rollback** |

**`npm run db:migrate` must run before or with the application deploy.** Runbook §21.

---

## 14. Booking — status corrected this session

| Item | Result |
|---|---|
| Vendor | Calendly — **in use, but never recorded as an approved programme selection** |
| URL | `https://calendly.com/mappedskills`, from `NEXT_PUBLIC_CALENDLY_URL` with a hard-coded default (the variable is empty, so the default ships) |
| **URL verified** | **YES — HTTP 200, titled "Calendly - MappedSkills Marketing", carrying the firm's own branding and description.** This is a live page belonging to this business |
| Bookable event types | **NOT VERIFIED** — the page is client-rendered and the served HTML is a 2.9 KB shell |
| Webhook / server-side confirmation | **Absent.** `meeting_booked` cannot be measured and is not implemented |
| User journey | **Not broken.** `/schedule-call` renders "Open the booking page" with no availability claim, no slot count, no duration and no confirmation — and the destination is real |
| Classification | **NON-BLOCKING OWNER INPUT** |
| Blocks launch | **No.** Contact is the primary enquiry path and is fully functional |

**This is a correction to the prior "unverified URL" classification.** The URL was checked with a
read-only request this session and it resolves to this firm's own branded booking page.

---

## 15. Email notification

| Item | Result |
|---|---|
| Provider | **None chosen.** No credential, no library installed |
| Durable persistence independent of email | **YES** — verified by code path: the 201 is returned after the driver acknowledges the INSERT, and no notification step exists between them |
| Classification | **NON-BLOCKING OPERATIONAL DEBT** |
| Blocks launch | **No** |

**Enquiries are stored. Nobody is automatically told.** The owner must monitor the database or
`CONTACT_NOTIFICATION_EMAIL`'s inbox by other means until a provider is chosen.

---

## 16. Image optimisation — deliberately unchanged

| Item | Finding |
|---|---|
| Current | `images.unoptimized: true` |
| `next/image` call sites | **One** — `components/Logo.tsx` |
| Raw `<img>` tags | 2 |
| The only optimisable asset | `/ms_Logo.webp` — **76 KB and already WebP** |
| Changed | **No** |

**Reasoning.** Enabling the optimizer under cPanel/Passenger with a custom Node server requires
`sharp` (a large native dependency not currently installed) or the slower wasm fallback, plus a
writable image cache directory, on a host with a 512 MB memory profile. **The return would be
approximately zero**: one already-compressed WebP logo. This is legacy configuration that happens to
be the correct configuration for this deployment.

---

## 17. Contentful failure mode

| Check | Result |
|---|---|
| Unconfigured behaviour | `lib/contentful/client.ts` returns `null` and warns **naming the variables, never a value** |
| Critical route crash | **None.** All 25 routes build and render with Contentful absent |
| Empty content | `/blog` and `/work` render honest empty states written in Phase F/G — no "coming soon", no placeholder cards |
| Fake fallback content | **None** |
| Sitemap | Degrades to the 16 static URLs |

---

## 18. Responsive and accessibility

### 18.1 Responsive — 180 automated checks, zero failures

18 routes × 10 widths, measured as `scrollWidth − clientWidth` in a viewport-sized frame.

| Width | Routes | Horizontal overflow |
|---|---|---|
| **320** (WCAG 1.4.10 reflow floor, beyond the brief's matrix) | 18 | **0** |
| 360 · 390 · 430 · 760 · **761** · 860 · 1080 · **1081** · 1425 | 18 each | **0** |

**Perceptual browser inspection at 390, 860 and 1425** — the changed footer renders correctly at all
three: single column at 390, two columns at 860, four at 1425; the removed CTA strip leaves no gap;
`/thank-you` now ends with its single onward link and a footer carrying no commercial ask.

### 18.2 Accessibility — observed, not certified

| Check | Result |
|---|---|
| Exactly one `<h1>` | **20 / 20 routes** |
| Heading jumps | **0 across all 20 routes** — the sitewide 2 → 4 footer jump is closed |
| Landmarks | `header`, `nav`, `main`, `footer` — one each |
| Skip link | Present, first focusable element |
| Form labels | **8 / 8 contact fields labelled**; zero unlabelled |
| Focus | Global 3px ink `:focus-visible`, never suppressed; re-pointed to ground on dark surfaces |
| Reduced motion | Global floor collapses durations; **0 animations in the footer** |
| Contrast | Resolve token system unchanged; footer accent on dark measured at 5.97:1 in Phase A |
| Footer touch targets | ⚠ **17 footer links are 19px tall** — see below |

**The one honest failure against the programme's own stricter floor.** Footer navigation links are
19px tall, below the programme's 40×40 interaction floor. **Measured vertical pitch is 36px**, so
**WCAG 2.2 SC 2.5.8 (AA) is met via the spacing exception** (24px threshold). This is **pre-existing
Phase B shared chrome**, not introduced here — and the two links added this session (`Contact`,
`Book a call`) match the existing pattern exactly rather than introducing a new one. **It was not
fixed because enlarging 17 links would add roughly 360px to the footer on every page, which is a
footer redesign, and §16 forbids one.** Recorded as POST-LAUNCH.

**No WCAG conformance is claimed.** No screen-reader, real-device, cross-browser or 200% text-resize
testing was performed in this session; all four remain outstanding from Gate 10.

---

## 19. No-JS

Measured from the server-rendered HTML.

| Route | `h1` | Words in HTML | Landmarks | Skip link |
|---|---|---|---|---|
| `/` | 1 | 4,296 | ✅ | ✅ |
| `/services` | 1 | 5,318 | ✅ | ✅ |
| `/contact` | 1 | 1,786 | ✅ (form present) | ✅ |
| `/schedule-call` | 1 | 2,350 | ✅ | ✅ |
| `/thank-you` | 1 | 1,453 | ✅ | ✅ |

**Core information is fully readable without JavaScript on every route**, and the booking link is a
plain `<a href>` that works with JS disabled.

**⚠ THE CONTACT FORM DOES NOT SUBMIT WITHOUT JAVASCRIPT, AND THAT IS STATED RATHER THAN GLOSSED.**
It has no `action` attribute and is submitted by a React handler. The fields render and are labelled,
but a no-JS visitor cannot send an enquiry. The email address and both phone numbers are in the
footer on every page, so a contact path remains, but **the form itself is JS-dependent**. Recorded as
POST-LAUNCH in §22, not claimed as working.

**Analytics absence has no effect on anything** — with `NEXT_PUBLIC_GTM_ID` unset, the served HTML
contains **zero third-party scripts**.

---

## 20. Proof and claim audit

Searched production code and content for: `300%`, `100Cr`, `10Cr`, `₹100`, `ROAS`, `guarantee`,
`award`, `testimonial`, `rating`, `within 24 hours`, `free strategy call`, `trusted by`, `5-star`.
**Context was inspected in every case; nothing was deleted mechanically.**

| Finding | Disposition |
|---|---|
| "Book a free strategy call" / "Schedule Free Strategy Call" — **sitewide in the footer** | **REMOVED** |
| Same CTA in `/privacy-policy` and `/terms` | **REMOVED** → "Book a call", the approved `ActionPair` label |
| Six "free audit" offers in `components/blog/CTABlock.tsx` | **REMOVED** — buttons now name the destination page |
| "Schedule Free Call" in `StickySidebarCTA` | **REMOVED** |
| "Want Similar Results for Your Business?" + "Explore Other Case Studies" on `/portfolio/[slug]` | **REMOVED** — both imply published results this firm does not have |
| "improve ROI, and scale revenue" in the footer blurb | **REMOVED** |
| Two stale `{/* Tracking: contact_click */}` comments naming events that do not exist | **REMOVED** |
| `300%`, `₹100Cr`, `ROAS`, testimonials in `lib/constants.ts`, `SocialProofStrip.tsx`, `HeroDashboard.tsx` | **LEFT — verified not imported anywhere.** Dead code, never rendered, tree-shaken. Recorded as POST-LAUNCH cleanup |
| `300%`, `ROAS`, `guarantee`, `testimonial`, `trusted by` elsewhere | **LEFT — every remaining occurrence is prose that DISAVOWS the claim** (e.g. `/work`: "no logo wall, no 'trusted by' strip, no rating, no review count") or a comment recording what was removed |
| "within 24 hours" | **Only in comments recording its removal.** No response time appears anywhere on the site |

**No unsupported claim was introduced. No content was fabricated to fill any route.**

---

## 21. Deployment runbook

**Analytics activation is NOT in this runbook. It is deferred by explicit owner decision.**
**No credential appears in any step.**

| # | Step | Command / action | Expected |
|---|---|---|---|
| 1 | **Back up the database** | Host's backup tool, or `mysqldump` of `DB_NAME` | A restorable dump, timestamped |
| 2 | Confirm env names are set on the Node app | cPanel → Setup Node.js App → Environment variables | `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` present. **Do not print values** |
| 3 | Verify connectivity | `npm run db:verify` | Connects. No credential echoed |
| 4 | Inspect migration state | `npm run db:status` | `001` applied; **`002` pending** |
| 5 | **Apply migration 002** | `npm run db:migrate` | `002_add_enquiry_attribution.sql` applied |
| 6 | Re-verify | `npm run db:status` | Both applied |
| 7 | Build | `npm run build:cpanel` | Compiles; 25 routes |
| 8 | Deploy files and restart | Upload, then Restart in cPanel → Setup Node.js App | Process healthy |
| 9 | Health check | `curl -sSI https://mappedskills.com/ \| head -1` | `200` |
| 10 | **Controlled test enquiry** | Submit the real form once with test values | Redirects to `/thank-you` |
| 11 | **Confirm the durable row** | `SELECT id, created_at, attribution_status FROM enquiries ORDER BY id DESC LIMIT 1;` | Exactly one new row. **Do not select name/email/phone/message** |
| 12 | **Confirm no false success** | Temporarily point `DB_NAME` at a non-existent database, submit, restore | Form shows failure, **no redirect to `/thank-you`**, no row |
| 13 | **www redirect** | `curl -sSIL https://www.mappedskills.com/pricing \| grep -i '^HTTP\|^location:'` | 308 → `https://mappedskills.com/pricing`, then 200. **If the first response is 200, add the redirect at the LiteSpeed/cPanel layer** |
| 14 | Robots | `curl -s https://mappedskills.com/robots.txt` | Matches `app/robots.ts`. **No GPTBot or CCBot line** |
| 15 | Sitemap | `curl -s https://mappedskills.com/sitemap.xml \| grep -c '<loc>'` | 16. **No `/work`, no `/thank-you`** |
| 16 | Headers | `curl -sSI https://mappedskills.com/ \| grep -iE 'content-security\|strict-transport\|x-content\|x-frame\|referrer\|permissions'` | CSP present; **HSTS present from the host and NOT duplicated by the app** |
| 17 | **HTML cache at the edge** | `curl -sSI https://mappedskills.com/contact \| grep -i cache-control`, then redeploy and re-fetch | The new content must appear. **If a stale document is served, disable LiteSpeed caching for HTML or purge on deploy** — §11 |
| 18 | Key routes | `for p in / /services /seo /ai-seo /contact /schedule-call /pricing /faq /about; do curl -s -o /dev/null -w "$p %{http_code}\n" https://mappedskills.com$p; done` | All 200 |
| 19 | `/work` and `/thank-you` | `curl -s https://mappedskills.com/work \| grep -o 'name="robots" content="[^"]*"'` | `noindex, nofollow` |
| 20 | 404 | `curl -s -o /dev/null -w '%{http_code}' https://mappedskills.com/no-such-page` | 404 |

---

## 22. Rollback

| Layer | Plan |
|---|---|
| **Application** | Redeploy the previous build and restart. **This is the primary rollback for every scenario below** |
| **Database** | **DO NOT roll back migration 002.** It is additive and every column is NULLable, so the *previous* application runs unchanged against the *new* schema. Schema rollback would risk data loss to undo a change that costs nothing to leave. If a restore is genuinely required, use the step-1 backup |
| **Redirect** | Revert the `has: [{ type: 'host' }]` block in `next.config.mjs` and redeploy. If the redirect was added at LiteSpeed instead, remove it there |
| **Security headers** | Remove the `Content-Security-Policy` entry from `next.config.mjs` and redeploy. The four directives shipped cannot break rendering, so this should not be needed; restoring `X-XSS-Protection: 1; mode=block` is **not** recommended |
| **Robots** | Restoring `public/robots.txt` would re-create the shadow. If the crawler policy must change, edit `app/robots.ts` |

---

## 23. Remaining owner items

| Item | Classification | Blocks launch? | Exact action |
|---|---|---|---|
| GPTBot / CCBot crawler policy (**R20**) | **OWNER / PROGRAMME DECISION** | **No** — status quo preserved | Decide, then append two rules to `app/robots.ts` (the change is written in its header) |
| www redirect at the hosting layer | **DEPLOYMENT VERIFICATION** | **No** — implemented in-app | Runbook step 13 |
| HTML caching at LiteSpeed | **DEPLOYMENT VERIFICATION** | **No** | Runbook step 17 |
| **Migration 002** | **DEPLOYMENT PREREQUISITE** | **Yes, if skipped** | Runbook steps 4–6, before or with the deploy |
| Booking account current + bookable event types | NON-BLOCKING OWNER INPUT | No | Confirm; set `NEXT_PUBLIC_CALENDLY_URL` explicitly so the URL is not a code constant |
| Booking webhook (for `meeting_booked`) | OWNER / VENDOR | No | Deferred with the CRM decision |
| Transactional email provider | NON-BLOCKING OPERATIONAL DEBT | No | Choose a provider; until then, monitor the database |
| GTM / GA4 / Meta activation | **ANALYTICS-DEFERRED BY OWNER** | **No** | Resume from `20_PHASE_H2A_CONSENT_AND_GTM.md` §24 when reopened |
| `LocalBusiness` schema | OWNER DECISION | No | Requires opening hours, geo and a verified business profile before it can be published honestly |
| Social profile URLs hard-coded in `Footer.tsx` | NON-BLOCKING | No | Confirm the four accounts, then set the `NEXT_PUBLIC_*_URL` variables |
| `/portfolio/[slug]` indexable while `/work` is `noindex` | CONDITIONAL | No — zero pages today | When the first case study is published, revisit `/work`'s `noindex` in the same change |
| `/research/ai-visibility-baseline` page | CONTENT — NOT DRAFTED | No | Write and publish it, then restore the three links removed this session |
| Blog / portfolio CTA copy | CONTENT | No — zero pages today | Blocked claims are removed, but this copy has **not** been through the copy gate. Do that before publishing any article |
| Contact form requires JavaScript | POST-LAUNCH | No | A no-JS fallback would need a POST endpoint that renders a result page |
| Footer link touch targets (19px vs 40px floor) | POST-LAUNCH | No — WCAG 2.5.8 AA met via 36px spacing | Requires a footer spacing revision |
| Dead code with fabricated claims (`lib/constants.ts`, `SocialProofStrip`, `HeroDashboard`) | POST-LAUNCH | No — not imported | Delete in a follow-up |
| Screen-reader, real-device, cross-browser, 200%-resize, user testing | POST-LAUNCH | No | Outstanding since Gate 10 |

---

## 24. Environment variables — names only, no values read or printed

| Variable | Classification | Fails safely when unset |
|---|---|---|
| `DB_HOST` · `DB_USER` · `DB_PASSWORD` · `DB_NAME` | **REQUIRED FOR FUNCTION** | **No — required.** Enquiries return an honest 503; **never a false success** |
| `DB_PORT` | OPTIONAL | Yes — defaults to 3306 |
| `NEXT_PUBLIC_SITE_URL` | OPTIONAL | Yes — defaults to `https://mappedskills.com` |
| `NEXT_PUBLIC_BUSINESS_EMAIL` · `_PHONE` · `_ADDRESS` | OPTIONAL | Yes — published defaults |
| `NEXT_PUBLIC_CALENDLY_URL` | OWNER-BLOCKED | Yes — falls back to the verified hard-coded URL |
| `NEXT_PUBLIC_LINKEDIN_URL` · `_FACEBOOK_URL` · `_INSTAGRAM_URL` · `_TWITTER_URL` | OPTIONAL | Yes — `sameAs` collapses to `[]` |
| **`NEXT_PUBLIC_GTM_ID`** | **DEFERRED ANALYTICS** | **Yes — no container is requested at all** |
| **`NEXT_PUBLIC_GA4_ID`** | **DEFERRED ANALYTICS** | Yes — read by nothing, deliberately |
| **`NEXT_PUBLIC_META_PIXEL_ID`** | **DEFERRED ANALYTICS — MUST REMAIN EMPTY** | Yes, but **it has no consent gate**; setting it would load `fbevents.js` regardless of the visitor's choice |
| `CONTENTFUL_SPACE_ID` · `_ACCESS_TOKEN` · `_ENVIRONMENT` | OPTIONAL | Yes — fails soft to empty content |
| `CONTACT_NOTIFICATION_EMAIL` | OWNER-BLOCKED | Yes — nothing can send to it |
| `ENABLE_INTERNAL_PAGES` | OPTIONAL | Yes — `/launch-checklist` 404s in production |
| `PORT` · `HOSTNAME` · `NODE_ENV` · `CPANEL_BUILD` | Runtime / build | Yes |

**No value was read, printed, guessed or written. `.env.example` still contains no values.**
**Production functionality does not require GTM, GA4 or Meta.**

---

## 25. Performance

| Item | Measurement |
|---|---|
| Client JS chunks | **1.1 MB across 46 files** (uncompressed on disk) |
| Largest chunks | 220 KB · 196 KB · 188 KB (framework) · 136 KB (main) · 112 KB (polyfills) |
| **Third-party scripts in served HTML** | **ZERO** with analytics unconfigured |
| Fonts | **9 woff2, 160 KB total, self-hosted** by `next/font` — no runtime request to Google Fonts |
| Images | One 76 KB WebP logo; optimizer deliberately off (§16) |
| Route generation | 25 routes, **all still `○ Static` / `● SSG`** — no route-mode change |
| Build time | `npm run build` ~2–4 s compile · `build:cpanel` ~1.3 s compile, **5.5 s wall clock** |
| cPanel memory | **Peak RSS 745 MB measured locally for the whole process tree**, with V8 old-space capped at 512 MB by `NODE_OPTIONS` and workers forced to 1. The build completed. **RSS is not heap**, and the host's own limit governs — re-check on the host if the build ever fails there |
| Material regression | **None.** No dependency added, no client component added beyond the consent work already committed |

**No redesign was performed for Lighthouse, and no approved visual character was removed.**

---

## 26. Errors and 404

| Scenario | Behaviour |
|---|---|
| Unknown route | **404** with the Phase G recovery page — every link on it verified live |
| Database failure | **503**, body `{"ok":false,"error":"unavailable"}`. Form keeps every typed value, no redirect, no row |
| Malformed body | **400**, body `{"ok":false,"error":"malformed"}` |
| Non-POST to `/api/enquiry` | 405 with an `Allow` header |
| CMS failure | Honest empty states; no crash on any route |
| Secret leakage | **None.** Server logs record a category and an error **code** only — never the driver message, the parameters, a credential or a submitted value |

---

## 27. Files changed

| File | Action | Purpose |
|---|---|---|
| `lib/schema.ts` | Modified | One `Organization`; `LocalBusiness`, `priceRange`, fake address removed |
| `app/layout.tsx` | Modified | One JSON-LD block; legacy fallback metadata and `generator` removed |
| `lib/metadata.ts` | Modified | Invalid top-level `canonical` key removed |
| `app/robots.ts` | Modified | Single authoritative implementation; GPTBot/CCBot rules removed |
| **`public/robots.txt`** | **Deleted** | It shadowed the route handler |
| `app/sitemap.ts` | Modified | Rebuilt from the indexable set |
| `next.config.mjs` | Modified | www → apex redirect; CSP; `X-XSS-Protection: 0` |
| `components/layout/Footer.tsx` | Modified | CTA strip removed; blurb, headings, labels, phone display |
| `app/(pages)/privacy-policy/page.tsx` | Modified | "Free Strategy Call" → "Book a call" |
| `app/(pages)/terms/page.tsx` | Modified | Same |
| `app/(pages)/ai-seo/page.tsx` | Modified | Broken `/research` link removed |
| `components/homepage/HomepageAccountability.tsx` | Modified | Two broken `/research` links removed |
| `components/blog/CTABlock.tsx` | Modified | Six free-audit offers removed |
| `components/blog/StickySidebarCTA.tsx` | Modified | "Schedule Free Call" removed |
| `app/(pages)/blog/[slug]/page.tsx` | Modified | Free-call CTA removed |
| `app/(pages)/portfolio/[slug]/page.tsx` | Modified | Results claim and free-call CTA removed |
| `docs/27-production-translation/21_PHASE_I_LAUNCH_HARDENING.md` | Created | This document |

**Not touched:** `lib/analytics.ts`, `lib/consent.ts`, `lib/gtm.tsx`, the consent components,
`lib/enquiries.ts`, `lib/enquiry-validation.ts`, `app/api/enquiry/route.ts`, `db/`, `server.cjs`,
`scripts/`, every prototype and governance document, and the untracked root `README.md`.

---

## 28. Verdict

**FUNCTIONAL READINESS: PASS — WEBSITE FUNCTIONALLY READY.**
**TECHNICAL LAUNCH READINESS: PASS — LAUNCH HARDENED.**
**OVERALL PHASE I RESULT: PASS — READY FOR CONTROLLED PRODUCTION DEPLOYMENT.**

**ANALYTICS STATUS: DEFERRED BY OWNER — RETURN AFTER FUNCTIONAL SITE COMPLETION.** This is not a
Phase I failure and is not counted as one.

**Booking remains owner-blocked for MEASUREMENT only.** Contact is the functional primary enquiry
path, the booking destination is verified to exist, and no fake booking journey is presented as
working.

**Email notification remains absent.** Durable persistence is authoritative and independent of it.

**Nothing was pushed. No credential was read or printed. No content was fabricated.**
