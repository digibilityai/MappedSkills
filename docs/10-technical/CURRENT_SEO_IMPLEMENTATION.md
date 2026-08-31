# Current SEO Implementation Baseline

**Status:** Session 01 read-only audit output
**Date:** 2026-08-31
**Branch:** `test_branch`
**HEAD:** `566d3e36d69354861b4656aa73ef1eedac1a9370`
**Scope:** This document describes the **current implementation only**. It does not propose a future SEO system, does not evaluate keyword targeting, and contains no ranking, traffic, or search-volume data — none was available to this session.

**Method:** Static reading of repository files. No live crawl, no rendered-HTML verification, no Search Console or third-party tool data. Every statement about production behaviour was therefore an INFERENCE and is labelled as such.

**Session 01B update (2026-08-31):** a narrowly scoped read-only live verification pass has since confirmed or corrected several items below. Live-verified findings are marked **[LIVE 01B]**. The production site is **`https://mappedskills.com`** (OWNER-SUPPLIED FACT). No crawl, no Lighthouse, and no Search Console data was gathered — those remain absent.

---

## 0. Session 01B Live Verification Summary

| Item | Repository finding | Live finding | Status |
|---|---|---|---|
| Canonical host | Ambiguous: `mappedskills.com` vs `ms.mappedskills.com` | `https://mappedskills.com` — canonical tag and all 15 sitemap URLs agree | **CLEARED** |
| HTTPS enforcement | Not in app config | `http://` → **301** → `https://` on both apex and `www`; HSTS `max-age=63072000; includeSubDomains` present | **CLEARED** |
| `www` normalisation | Not configured | `https://www.mappedskills.com` returns **200**, not a redirect — byte-identical content, identical `etag`. Mitigated: it self-canonicalises to the apex | **NEW — Medium** |
| HTML `Cache-Control` | Inferred `immutable` one year | **Confirmed** on `/`, `/seo`, `/contact`, `/schedule-call`, `/blog`. `/sitemap.xml` gets the intended `max-age=3600, must-revalidate` | **CONFIRMED** |
| Which robots.txt wins | Unknown | **`public/robots.txt`** — static, LiteSpeed-served, no `x-nextjs-*` headers. `app/robots.ts` inert | **RESOLVED** |
| GPTBot / CCBot blocked? | `app/robots.ts` blocks both | **Not blocked in production** — no AI-crawler directive is live | **CLEARED (latent)** |
| Sitemap `lastModified` | All `new Date()` | All 15 identical: `2026-08-21T05:37:56.228Z` | **CONFIRMED** |
| Sitemap `changefreq` | Invalid field, likely dropped | **0 occurrences** in live XML | **CONFIRMED** |
| Sitemap `priority` | Valid, should render | Present on all 15 | **CONFIRMED** |
| Sitemap CMS URLs | Depends on Contentful | **Zero** blog and **zero** case-study URLs | **CONFIRMED** |
| 404 status code | Expected correct | `/this-page-does-not-exist-xyz` → **404** ✓ | **CONFIRMED** |
| Redirects | 9 configured, 308 | `/seo-services` → **308** → `/seo`, single hop | **CONFIRMED** |
| `/portfolio` has no index | Expected 404 | **404** ✓ | **CONFIRMED** |
| 404 page's hard-coded blog links | Existence unknown | `/blog/seo-vs-ppc` and `/blog/facebook-ads-not-working` both **404** | **CONFIRMED broken** |
| CSP | Absent | **Absent** — confirmed live | **CONFIRMED** |

---

## 1. Metadata

**VERIFIED FACT:** All 21 `page.tsx` files plus `app/not-found.tsx` export metadata. There are no pages missing a metadata export.

**VERIFIED FACT:** 19 of them route through the shared helper `createMetadata(title, description, path)` in `lib/metadata.ts`. The exceptions are:
- `app/layout.tsx` — hand-written root `Metadata` object.
- `app/(pages)/launch-checklist/page.tsx` — exports only `robots: { index: false, follow: false }`, with **no title and no description**.

**VERIFIED FACT — what `createMetadata` produces:**

```ts
{
  title, description,
  canonical: url,                    // ← see defect below
  robots: { index: true, follow: true,
            googleBot: { index: true, follow: true,
                         'max-video-preview': -1,
                         'max-image-preview': 'large',
                         'max-snippet': -1 } },
  openGraph: { title, description, url, siteName: 'MappedSkills',
               type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: url },
}
```

**VERIFIED FACT — defect:** `createMetadata` sets a top-level `canonical` key. `canonical` is not a field in the Next.js `Metadata` type; only `alternates.canonical` is honoured. The same invalid top-level `canonical` is repeated in `app/not-found.tsx` and `app/(pages)/thank-you/page.tsx`. Because `alternates.canonical` is *also* set correctly, **INFERENCE:** canonical tags do render correctly and the stray key is inert. This would normally surface as a TypeScript error, but `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so it is not caught at build time.

**VERIFIED FACT — root layout title is a static string,** `'MappedSkills - Performance Marketing for SaaS'`, with no `title.template` and no `title.default`. Page-level titles are full strings that each independently append `| MappedSkills`, so there is no template mechanism enforcing consistency. **VERIFIED FACT:** `/social-media-ads` is titled `Facebook & Instagram Ads Management | Meta Ads Agency` — it does **not** carry the brand suffix that the other pages do.

**VERIFIED FACT — root layout also declares `generator: 'v0.app'`.**

**VERIFIED FACT — title claims requiring substantiation.** Two indexable titles assert a numeric performance outcome:
- `/` — `Performance Marketing Agency | 300%+ ROI | MappedSkills`
- `/google-ads` — `Google Ads Management Agency | 300%+ ROI | MappedSkills`

No supporting evidence for the "300%+ ROI" figure exists in the repository. Under `PROJECT_RULES.md` Rule 15 this must be substantiated or removed before it is carried into a redesign; this audit makes no claim about whether it is true.

**VERIFIED FACT — richest metadata is on `/blog/[slug]`.** `generateMetadata` there is the only implementation that supplies `keywords`, OG `type: 'article'`, `publishedTime`, `modifiedTime`, OG images with explicit 1200×630 dimensions and alt text, Twitter images, `authors`, and `publisher`. It is materially better than the site-wide helper.

---

## 2. Canonicalisation

| Aspect | Implementation |
|---|---|
| Static pages | `alternates.canonical = ${NEXT_PUBLIC_SITE_URL}${path}`, absolute, self-referencing |
| Blog articles | `alternates.canonical = post.canonicalUrl` from `lib/contentful/mappers.ts` → `${SITE_URL}/blog/${slug}` |
| Case studies | via `createMetadata(metaTitle, metaDescription, href)` where `href = /portfolio/${slug}` |
| `metadataBase` | **Not set anywhere.** Not in `app/layout.tsx`, not in `createMetadata`. |
| Base URL fallback | `https://mappedskills.com` hard-coded as the fallback in five files |
| `?category=` filtered blog URLs | Inherit the static `/blog` canonical — correct self-canonicalisation behaviour |
| Trailing slash | Not configured; Next.js default `false` applies |

**~~VERIFIED FACT — domain ambiguity.~~ RESOLVED [LIVE 01B].** **OWNER-SUPPLIED FACT:** production is **`https://mappedskills.com`**. Live corroboration: the homepage emits `<link rel="canonical" href="https://mappedskills.com/"/>` and all 15 sitemap URLs use that host. The `ms.mappedskills.com` reference in `doc/cpanel-deploy.md` is a repository/deployment artifact, not a live-hostname question.

**[LIVE 01B] — residual host-normalisation issue.** `https://www.mappedskills.com/` returns **HTTP 200**, not a redirect, serving byte-identical content with an identical `etag`; `https://www.mappedskills.com/seo` also returns 200. The site is fully reachable on two hostnames. This is substantially mitigated — the `www` response self-canonicalises to `https://mappedskills.com/`, and `www`'s `robots.txt` declares the apex sitemap — so it is recorded as **Medium**, not Critical. `http://` correctly 301s to `https://` on both hosts, and HSTS (`max-age=63072000; includeSubDomains`) is present on all HTTPS responses.

**VERIFIED FACT:** No `alternates.languages`, no `hreflang`, no i18n configuration. `openGraph.locale` is hard-coded `en_US` while the business address, currency (₹), phone numbers, and `areaServed: ['IN']` are all India-focused.

---

## 3. robots.txt

**VERIFIED FACT — two conflicting sources exist.**

**Source A — `public/robots.txt` (static file):**
```
User-agent: *            → Allow: /,  Crawl-delay: 0.1
User-agent: Googlebot    → Allow: /,  Crawl-delay: 0
User-agent: Bingbot      → Allow: /,  Crawl-delay: 1
User-agent: MJ12bot      → Disallow: /
User-agent: AhrefsBot    → Disallow: /
User-agent: SemrushBot   → Disallow: /
Disallow: /admin/ , /api/     ← stray directives, outside any User-agent group
Allow: /api/sitemap , /api/rss
Sitemap: https://mappedskills.com/sitemap.xml
```

**Source B — `app/robots.ts` (generated route):**
```
User-agent: *       → Allow: /,  Disallow: /admin, /api/internal, /private
User-agent: GPTBot  → Disallow: /
User-agent: CCBot   → Disallow: /
Sitemap: ${NEXT_PUBLIC_SITE_URL}/sitemap.xml
Host:    ${NEXT_PUBLIC_SITE_URL}
```

**VERIFIED FACT:** Both files target the same URL, `/robots.txt`.

**[LIVE 01B] — RESOLVED. Source A (`public/robots.txt`) wins.** `https://mappedskills.com/robots.txt` returns the static file: `content-length: 681` matching it exactly, `content-type: text/plain`, `last-modified: Fri, 21 Aug 2026 05:37:20 GMT`, and — decisively — **no `x-nextjs-*` and no `x-powered-by` header**, meaning LiteSpeed serves it directly and the request never reaches Next.js. **`app/robots.ts` is entirely inert dead code.**

**Live crawler-policy answers:**
- **`GPTBot` is NOT blocked.** No directive for it exists in the served file; `User-agent: *  Allow: /` applies.
- **`CCBot` is NOT blocked.** Same.
- **`OAI-SearchBot` is not addressed.**
- **No AI-crawler directive of any kind is live** — no `Google-Extended`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Applebot-Extended`, `Bytespider`, or others.
- **Sitemap declared correctly:** `Sitemap: https://mappedskills.com/sitemap.xml`.
- **Contradictions confirmed live**, exactly as read from source: the bare `Disallow: /admin/` and `Disallow: /api/` lines fall under the `SemrushBot` group and so apply to SemrushBot only; `Allow: /api/sitemap` and `/api/rss` reference endpoints that do not exist; `Crawl-delay: 0.1` is a non-integer value.

**Latent risk introduced by this resolution:** `app/robots.ts` still contains the site-wide `GPTBot`/`CCBot` block. Deleting `public/robots.txt` — a plausible redesign cleanup — would silently hand `/robots.txt` to the Next.js route and activate that block with no code change and no review.

**VERIFIED FACT — the two sources disagree materially:**
- Source A permits `GPTBot` and `CCBot` implicitly (via `User-agent: *  Allow: /`); Source B blocks both outright.
- Source A blocks `AhrefsBot`, `SemrushBot`, `MJ12bot`; Source B does not.
- Source A's bare `Disallow: /admin/` and `Disallow: /api/` lines appear after a `User-agent: SemrushBot` group, so by robots.txt grammar they apply to **SemrushBot only**, not globally — almost certainly not the intent.
- Source A's `Allow: /api/sitemap` and `/api/rss` reference endpoints that **do not exist** in this codebase.
- Source A's `Crawl-delay: 0.1` is a non-integer value; **INFERENCE:** likely ignored by parsers that honour the directive at all. Googlebot ignores `Crawl-delay` entirely.

**VERIFIED FACT — a conflict exists in the repository** between `app/robots.ts` (which blocks `GPTBot` site-wide) and the `PROJECT_CHARTER.md` requirement that the site be "optimized for visibility and citation potential across relevant AI search and answer systems."

**[LIVE 01B] — the conflict is NOT active in production.** Because `public/robots.txt` is the file actually served, no AI crawler is currently blocked. The charter conflict is a latent repository defect rather than a live restriction. **This remains an observed gap only — no implementation change is recommended by this session, and no claim is made here about whether allowing or blocking any given crawler produces a ranking or citation benefit.**

---

## 4. XML Sitemap

**VERIFIED FACT:** `app/sitemap.ts` generates `/sitemap.xml` via the Next.js `MetadataRoute.Sitemap` convention. It is a single flat sitemap — there is no sitemap index and no per-type splitting.

**[LIVE 01B] — live sitemap verified.** HTTP 200, `content-type: application/xml`, `cache-control: public, max-age=3600, must-revalidate`. It contains **exactly 15 `<loc>` entries**, all on `https://mappedskills.com` — the correct hostname. All five service pages are present. **Zero blog URLs and zero case-study URLs appear**, meaning the dynamic Contentful branches contributed nothing. Every `<lastmod>` is the identical value `2026-08-21T05:37:56.228Z` (the build timestamp), `changefreq` appears **0 times**, and `<priority>` appears on all 15 — confirming all three defects below.

Composition:
- 15 hard-coded static paths with hand-assigned `changefreq` and `priority`.
- Blog entries from `getBlogListPosts()` (Contentful, `limit: 100`).
- Case-study entries from `getCaseStudyListCards()` (Contentful, `limit: 100`).

**VERIFIED FACT — defects (all three now confirmed live):**
1. **`lastModified` is `new Date()` for every single URL,** including all blog posts and case studies. Every URL therefore reports "modified now" on every regeneration. The correct values exist and are already mapped — `post.publishedAtISO` and `post.updatedAtISO` are populated in `lib/contentful/mappers.ts` — but are not used here. This makes the `lastmod` signal uninformative across the whole sitemap.
2. **`changefreq` and `priority` are set on the static-page objects** but `MetadataRoute.Sitemap` does not include `changefreq`; the supported field is `changeFrequency`. **INFERENCE:** the `changefreq` key is dropped from the emitted XML. `priority` is a valid field and should render.
3. **Hard-coded page list will drift.** Adding a route requires remembering to edit this array; nothing derives it from the filesystem.
4. **100-item ceiling** on both Contentful collections. Blog and case-study URLs beyond 100 will silently never appear in the sitemap.

**VERIFIED FACT:** The static list correctly excludes the four noindexed routes (`/thank-you`, `/terms`, `/privacy-policy`, `/launch-checklist`).

---

## 5. Redirects

**VERIFIED FACT:** Nine redirects in `next.config.mjs`, all `permanent: true` (Next.js emits **308**, not 301). Full table in `CURRENT_ROUTE_INVENTORY.md` §3.

**VERIFIED FACT:** No `rewrites` are configured. No middleware exists to perform redirect logic.

**UNKNOWN:** Whether host-level redirects exist in the cPanel/Passenger `.htaccess`. `doc/cpanel-deploy.md` references an `.htaccess` "block cPanel/Passenger generated" that must be preserved, but no `.htaccess` is committed. Its contents must be retrieved from the server before migration planning.

**VERIFIED FACT — no HTTP→HTTPS or www→non-www normalisation exists in the application layer.** **INFERENCE:** this is handled at the host or CDN. **UNKNOWN:** how, and whether correctly.

---

## 6. Structured Data

**VERIFIED FACT — global, from `app/layout.tsx` on every page:** `Organization` and `LocalBusiness`, generated by `lib/schema.ts`, injected as two `<script type="application/ld+json">` blocks in `<head>`.

**VERIFIED FACT — per-page emission,** by `@type`:

| Route | Types emitted |
|---|---|
| `/services` | `Service` ×6, `Offer` ×5, `OfferCatalog`, `FAQPage` (4 Q&A), `BreadcrumbList`, `Organization`, `Country` |
| `/about` | `Organization` ×2, `Person` ×2, `FAQPage` (5 Q&A), `ContactPoint`, `BreadcrumbList` |
| `/blog` | `CollectionPage`, `ItemList`, `BlogPosting`, `FAQPage` (4 Q&A), `BreadcrumbList` |
| `/blog/[slug]` | `Article`, `BreadcrumbList`, `FAQPage`, `ImageObject`, `Person`, `Organization`, `WebPage` |
| `/how-it-works` | `FAQPage` (6 Q&A), `BreadcrumbList` |
| `/pricing` | `FAQPage` (6 Q&A), `BreadcrumbList` |
| `/contact` | `FAQPage`, `BreadcrumbList` |
| `/faq` | `FAQPage` (1 Question), `BreadcrumbList` |
| `/schedule-call` | `FAQPage`, `BreadcrumbList` |
| `/work` | `Organization`, `ContactPoint`, `BreadcrumbList` |
| `/privacy-policy`, `/terms`, `/thank-you` | `BreadcrumbList` only |
| **`/google-ads`** | **none** |
| **`/social-media-ads`** | **none** |
| **`/lead-generation`** | **none** |
| **`/seo`** | **none** |
| **`/conversion-optimization`** | **none** |
| **`/portfolio/[slug]`** | **none** |
| `/` (homepage) | none beyond the global layout schema |

**VERIFIED FACT — the five commercial service landing pages and the case-study detail template carry no page-level structured data whatsoever.** No `Service`, no `FAQPage` (despite all five rendering FAQ content from `lib/constants.ts`), no `BreadcrumbList`. These are the highest commercial-intent URLs on the site.

**VERIFIED FACT — `lib/schema.ts` is largely unused.** It exports seven generators. Only `generateOrganizationSchema` and `generateLocalBusinessSchema` are imported anywhere (by `app/layout.tsx`). `generateServiceSchema`, `generateFAQSchema`, `generateBreadcrumbSchema`, `generateArticleSchema`, and `generatePersonSchema` are **never imported**. Every page that emits schema builds its JSON-LD inline instead, and `app/(pages)/blog/[slug]/page.tsx` defines its own local `generateArticleSchema`, `generateFAQSchema`, and `generateBreadcrumbSchema` functions that shadow the library's names.

**VERIFIED FACT — data-quality defects in `lib/schema.ts`:**
- `Organization` and `LocalBusiness` both set `address.streetAddress` to the full string `'Pune, Maharashtra, India'` while also setting `addressLocality: 'Pune'`, `addressRegion: 'Maharashtra'`, `addressCountry: 'IN'` — the street address is a duplicated region string, not a street address.
- `postalCode: 'India'` — a country name in the postal-code field.
- `LocalBusiness.areaServed` is a single `{ '@type': 'City', name: ['Pune','Mumbai','India'] }` — one City node with an array name, rather than separate nodes.
- `sameAs` is filtered from `socialLinks`, which reads env vars that are empty in `.env.example`. If unset in production, `sameAs` is `[]` while the footer visibly links to three social profiles.
- `Organization` has no `@id` and no `logo`; `LocalBusiness` has `@id` and `image` but no `logo`. There is no `WebSite` schema and no `SearchAction` anywhere.

**VERIFIED FACT:** No `Product`, `AggregateRating`, `Review`, or `HowTo` schema is emitted anywhere. `/pricing` states a ₹50K/month entry price in metadata with no corresponding `Offer` markup.

---

## 7. Open Graph and Social Metadata

**VERIFIED FACT — from `createMetadata` (19 pages):** `og:title`, `og:description`, `og:url`, `og:site_name`, `og:type=website`, `og:locale=en_US`; `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`.

**VERIFIED FACT — no OG image is set on any page except `/blog/[slug]`.**
- `createMetadata` sets no `openGraph.images` and no `twitter.images`.
- `twitter:card` is declared `summary_large_image` — a card type that requires an image — with no image supplied.
- No default social image asset exists: `public/` contains no `og-default.jpg` or equivalent.
- `lib/og-image.ts` was written to solve this (`generateOGImageUrl`, `getOGMetadata`, referencing `/api/og` and `/og-default.jpg`) but is **never imported by anything**, and neither the route nor the asset exists.

**INFERENCE:** every page except blog articles currently shares to social platforms and messaging apps with no image.

**VERIFIED FACT:** No `twitter:site` / `twitter:creator` handle is set anywhere. No `article:author` or `article:section` beyond what `/blog/[slug]` provides via `authors` and `publishedTime`/`modifiedTime`.

---

## 8. Internal Linking Architecture

**VERIFIED FACT — header (`components/layout/Header.tsx`), on every page:**
- Services dropdown → `/google-ads`, `/social-media-ads`, `/lead-generation`, `/seo`, `/conversion-optimization`
- Direct links → `/how-it-works`, `/work`, `/pricing`, `/blog`, `/contact`
- Persistent CTA → `/schedule-call`

**VERIFIED FACT:** The Services dropdown trigger is a `DropdownMenuTrigger` button, **not a link to `/services`**. The `/services` hub page — the site's most schema-rich page — is not reachable from the primary navigation at all.

**VERIFIED FACT — footer (`components/layout/Footer.tsx`)** links to all five service pages plus `/services`, `/how-it-works`, `/work`, `/pricing`, `/about`, `/blog`, `/faq`, `/privacy-policy`, `/terms`, `/schedule-call`, `/contact`, `mailto:`, `tel:`, and three hard-coded external social profiles.

**VERIFIED FACT:** `/about` and `/faq` are footer-only — absent from the header.

**VERIFIED FACT — contextual linking exists on blog articles** via `components/blog/RelatedPosts.tsx`, `RelatedServices.tsx`, `CTABlock.tsx`, `StickySidebarCTA.tsx`, and `TableOfContents.tsx` (built from H2/H3 extraction in `mappers.ts`, anchor IDs `section-N`).

**VERIFIED FACT — structural gaps:**
- No breadcrumb **UI** component anywhere. `BreadcrumbList` schema is emitted on 11 routes with no corresponding visible breadcrumb trail. A `components/ui/breadcrumb.tsx` primitive exists but is imported by nothing.
- No pagination on `/blog` or `/work`; `components/ui/pagination.tsx` exists but is unused.
- No category, tag, or author archive routes. `?category=` filtering on `/blog` produces no crawlable, linkable hub URLs.
- `/thank-you` is orphaned — nothing links or redirects to it.
- `/portfolio` has no index; only `/portfolio/[slug]` exists.
- Anchor styling in `app/globals.css` applies `text-accent` (brand red `#C41E3A`) to **every** `<a>` globally, including navigation and footer links, and adds `hover:underline` — link affordance is styling-driven rather than semantic.

---

## 9. Blog SEO Implementation

**VERIFIED FACT:** `/blog/[slug]` is the most completely implemented SEO surface in the codebase.

| Element | Implementation |
|---|---|
| Title | `post.seoTitle` from Contentful, falling back to `post.title` |
| Description | `excerptFromDocument(...)` — derived from body content, not an authored meta description field |
| Keywords | `post.keyword` from Contentful, emitted as `keywords` |
| Canonical | `${SITE_URL}/blog/${slug}` |
| OG | `type: 'article'`, `publishedTime` (`sys.firstPublishedAt`), `modifiedTime` (`sys.publishedAt`), image 1200×630 with alt |
| Twitter | `summary_large_image` with image |
| Author | `authors: [{ name }]`; `Person` schema; `components/blog/AuthorBio.tsx` |
| Schema | `Article`, `BreadcrumbList`, `FAQPage`, `ImageObject`, `WebPage` |
| TOC | Auto-generated from H2/H3 via `extractTocFromDocument` |
| Reading time | `estimateReadingTime` at 200 wpm |
| Rendering | ISR `revalidate = 60` + `generateStaticParams` |

**VERIFIED FACT — limitations:**
- Meta description is auto-derived from the body excerpt. There is no dedicated authored meta-description field in the Contentful query (`POST_CARD_FRAGMENT` selects `seoTitle` and `keyword` but no `seoDescription`).
- `dateModified` maps to `sys.publishedAt`, which changes on any CMS republish — not necessarily a substantive content update.
- Category exists as a Contentful reference and drives related-post selection and CTA type, but has **no archive route**.
- Blog list and slug queries are capped at `limit: 100`. Beyond 100 posts, `generateStaticParams`, the blog index, and the sitemap all silently truncate.
- `/blog` renders all posts with no pagination.

---

## 10. Image SEO

**VERIFIED FACT:** `next.config.mjs` sets `images.unoptimized: true`. Next.js image optimisation — resizing, format negotiation, AVIF/WebP conversion — is **disabled site-wide**, including for Contentful assets from `images.ctfassets.net`.

**VERIFIED FACT:** Only five files import `next/image`: `components/Logo.tsx`, `app/(pages)/blog/page.tsx`, `contact/page.tsx`, `schedule-call/page.tsx`, `services/page.tsx`.

**VERIFIED FACT — two raw `<img>` tags** bypass `next/image` entirely: `components/blog/RichTextContent.tsx:69` (embedded Contentful assets) and `components/cards/TeamCard.tsx:24`.

**VERIFIED FACT:** Only 8 `alt=` attributes appear across all of `app/` and `components/`.

**VERIFIED FACT:** `components/Logo.tsx` declares `width={1080} height={48}` while rendering at `h-7 w-auto`. The declared aspect ratio (22.5:1) is a layout hint only; combined with `unoptimized`, the full-resolution `ms_Logo.webp` is served on every page.

**VERIFIED FACT:** Blog featured images have alt text from Contentful (`featuredImageAlt` in `mappers.ts`) and explicit 1200×630 OG dimensions.

**VERIFIED FACT:** `public/` contains 13 files, four of which are unused `placeholder.*` assets. There is no `favicon.ico`; `app/layout.tsx` points both `icon` and `apple` at `/ms_icon.png`. An unreferenced `public/icon.svg` also exists.

---

## 11. Error and 404 Behaviour

**VERIFIED FACT:** `app/not-found.tsx` is a full recovery page — `robots: 'noindex, nofollow'`, a hero, six service links, six popular-page links, three blog suggestions, and a closing CTA. It is one of the better-built pages on the site.

**VERIFIED FACT:** It hard-codes three blog URLs (`/blog/how-to-calculate-google-ads-roi`, `/blog/facebook-ads-not-working`, `/blog/seo-vs-ppc`). **UNKNOWN:** whether those slugs exist in Contentful; if not, the 404 page links to further 404s.

**VERIFIED FACT:** There is no `app/error.tsx` and no `app/global-error.tsx`. Unhandled render errors fall back to the framework default. `server.cjs` catches request-handler throws and returns a plain-text `500 Internal Server Error` with no styling and no navigation.

**VERIFIED FACT:** There is no `loading.tsx` at any level.

**VERIFIED FACT:** `/portfolio/[slug]` and `/blog/[slug]` call `notFound()` for missing slugs, correctly returning the 404 page with a 404 status.

---

## 12. Crawler Directives — Full Current Inventory

**Explicitly named crawlers in the repository:**

| Crawler | Where | Directive |
|---|---|---|
| `*` | `app/robots.ts` | Allow `/`; Disallow `/admin`, `/api/internal`, `/private` |
| `*` | `public/robots.txt` | Allow `/`; `Crawl-delay: 0.1` |
| `Googlebot` | `public/robots.txt` | Allow `/`; `Crawl-delay: 0` |
| `Bingbot` | `public/robots.txt` | Allow `/`; `Crawl-delay: 1` |
| `GPTBot` | `app/robots.ts` | **Disallow `/`** |
| `CCBot` | `app/robots.ts` | **Disallow `/`** |
| `MJ12bot` | `public/robots.txt` | Disallow `/` |
| `AhrefsBot` | `public/robots.txt` | Disallow `/` |
| `SemrushBot` | `public/robots.txt` | Disallow `/` |

**VERIFIED FACT — not mentioned anywhere in the repository:** `OAI-SearchBot`, `ChatGPT-User`, `Google-Extended`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `PerplexityBot`, `Perplexity-User`, `Applebot-Extended`, `Bytespider`, `Amazonbot`, `meta-externalagent`, `Bingbot`'s AI variants.

**VERIFIED FACT:** No `llms.txt` file exists. No `.well-known/` directory exists. No AI-specific structured content, no `X-Robots-Tag` header configuration, and no per-crawler content negotiation exist anywhere.

**Explicit note per session scope:** the absence of `llms.txt` or any AI-crawler allowance is recorded here as a **baseline observation only**. This session makes **no claim** that `llms.txt`, any crawler allowance, or any AI-specific mechanism confers a ranking, citation, or visibility benefit. Whether any of it is worth implementing is **RESEARCH REQUIRED** and belongs to a later, evidence-gathering phase.

---

## 13. Security-Adjacent Headers Affecting SEO

**[LIVE 01B] — CONFIRMED IN PRODUCTION.** Actual observed `Cache-Control` values: `/` , `/seo`, `/contact`, `/schedule-call`, and `/blog` all return **`public, max-age=31536000, immutable`**. `/sitemap.xml` returns `public, max-age=3600, must-revalidate`. This proves the `/:path*.(html|xml)` override matches the `.xml` branch but **not** extensionless App Router HTML routes — precisely the inferred mechanism. Server-side ISR is functioning (`x-nextjs-cache: HIT`/`STALE`, `x-nextjs-stale-time: 300`), so the failure is confined to browser and intermediary caches, where it is total. **The inference below is no longer an inference — it is verified.**

**VERIFIED FACT:** `next.config.mjs` applies to `source: '/:path*'` — i.e. **every route including HTML documents** — the header:

```
Cache-Control: public, max-age=31536000, immutable
```

An override exists for `source: '/:path*.(html|xml)'` setting `max-age=3600, must-revalidate`. **INFERENCE — the override does not match App Router HTML routes.** App Router paths (`/`, `/seo`, `/blog/some-post`) do not end in a literal `.html` extension, so the pattern will not match them. `/sitemap.xml` and `/robots.txt` are separate cases: `/sitemap.xml` should match the `.xml` branch; `/robots.txt` matches neither and falls under the one-year immutable rule.

**INFERENCE — consequence:** every HTML page and `/robots.txt` may be served with a one-year `immutable` cache directive. `immutable` instructs caches never to revalidate for the freshness lifetime. This would render the ISR `revalidate = 60` setting on the homepage, blog, and case studies ineffective for any client or intermediary honouring the header, and would make content updates invisible to returning visitors and to shared caches. **This requires live `curl -I` verification against production as the single highest-priority follow-up in this document.**

**VERIFIED FACT — other headers set globally:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection: 1; mode=block` (a deprecated header), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

**VERIFIED FACT — not set in `next.config.mjs`:** `Content-Security-Policy`, `Strict-Transport-Security`, `Cross-Origin-Opener-Policy`.

**[LIVE 01B]:** `Strict-Transport-Security: max-age=63072000; includeSubDomains` **is** present on production responses — supplied at the LiteSpeed/host layer rather than by the application. `Content-Security-Policy` is **confirmed absent** in production. The live edge is `Server: LiteSpeed` with HTTP/2 and HTTP/3 advertised — not Apache/Passenger as the repository documentation implied.

---

## 14. Summary of Current SEO Implementation

**Implemented and working:**
- App Router metadata on every route, via a shared helper
- Self-referencing absolute canonicals via `alternates.canonical`
- Nine permanent redirects preserving a prior URL architecture
- A generated XML sitemap combining static and CMS-driven URLs
- Organization + LocalBusiness schema site-wide
- Substantial JSON-LD on 11 routes
- A genuinely well-implemented blog article template
- Self-hosted fonts via `next/font` with `display: swap`
- Correct noindex on the four routes that warrant it
- A rich, correctly noindexed 404 recovery page

**Absent or defective (observations only — no fixes proposed by this session):**
- Two conflicting robots.txt sources with contradictory crawler policy
- `GPTBot` and `CCBot` blocked, against the charter's stated AI-visibility objective
- No structured data on the five service landing pages or the case-study template
- `lib/schema.ts` largely unused; schema built inline and inconsistently
- No OG image on any page except blog articles, with `summary_large_image` declared regardless
- `metadataBase` never set
- Sitemap `lastModified` uniformly `new Date()`; `changefreq` key likely dropped
- Global one-year `immutable` cache header probably applied to HTML
- Image optimisation disabled site-wide
- Very few `alt` attributes
- No breadcrumb UI despite breadcrumb schema on 11 routes
- No pagination, no category/tag/author archives; 100-item CMS ceiling
- `/services` unreachable from the primary navigation
- ~~Unresolved production-domain ambiguity~~ — **resolved [LIVE 01B]:** production is `https://mappedskills.com`; residual issue is that `www` serves 200 without redirecting (mitigated by correct self-canonical)
- **[LIVE 01B]** The blog and case-study sections are **empty in production** — `/blog` renders "No articles found", `/work` shows no case studies, and the sitemap carries zero CMS URLs
- **[LIVE 01B]** The 404 page's three hard-coded blog links all return **404**
- Unsubstantiated "300%+ ROI" claims in two indexable titles
