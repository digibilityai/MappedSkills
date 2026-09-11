# Current Route Inventory

**Status:** Session 01 read-only audit output
**Date:** 2026-08-31
**Branch:** `test_branch`
**HEAD:** `566d3e36d69354861b4656aa73ef1eedac1a9370`
**Basis:** Repository inspection only. No live crawl, no production HTTP verification, no Search Console data.

## Evidence Labelling
- **VERIFIED FACT** — established by reading repository files.
- **INFERENCE** — reasoned from code, not directly observed in production.
- **UNKNOWN** — cannot be established from the repository.

All routes below are **VERIFIED FACT** as to their existence in source. Their live behaviour, indexation status, and traffic are **UNKNOWN**.

---

## 1. Routing Model

**VERIFIED FACT:** The application uses the Next.js **App Router** exclusively. There is no `pages/` directory.

- Root layout: `app/layout.tsx`
- Route group: `app/(pages)/` — a non-URL-emitting group; `(pages)` does **not** appear in any URL.
- Global 404: `app/not-found.tsx`
- Metadata routes: `app/robots.ts`, `app/sitemap.ts`
- **VERIFIED FACT:** There is no `middleware.ts` anywhere in the repository.
- **VERIFIED FACT:** There are no `route.ts` / `route.tsx` API handlers anywhere in the repository (`app/api/` does not exist).
- **VERIFIED FACT:** There are no Server Actions (`'use server'` appears nowhere).
- **VERIFIED FACT:** `trailingSlash` is not configured in `next.config.mjs`, so the Next.js default (`false`, no trailing slash) applies.

Total page files: **21** `page.tsx` files, plus `app/not-found.tsx`.

---

## 2. Public Route Table

| Route | Source | Page type | Content source | Metadata | Forms | Primary CTA | SEO notes | Migration sensitivity |
|---|---|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | Homepage | `lib/constants.ts` (hard-coded) + Contentful blog list | `createMetadata(...,'/')`; title `Performance Marketing Agency \| 300%+ ROI \| MappedSkills` | None | Schedule Free Strategy Call → `/schedule-call` | `revalidate = 60` (ISR). No page-level JSON-LD beyond global Organization/LocalBusiness in layout. Title contains an unsubstantiated "300%+ ROI" claim. | **Critical** — root URL; highest equity |
| `/services` | `app/(pages)/services/page.tsx` | Service hub | `lib/constants.ts` | `createMetadata(...,'/services')` | None | Schedule Free Strategy Call | Emits `Service` ×6, `Offer` ×5, `OfferCatalog`, `FAQPage`, `BreadcrumbList`, `Organization`. Richest schema page. Redirect target of `/digital-marketing-services`. | **Critical** |
| `/google-ads` | `app/(pages)/google-ads/page.tsx` | Service landing | `lib/constants.ts` (`GOOGLE_ADS_*`) | `createMetadata(...,'/google-ads')`; title contains "300%+ ROI" | None | Get Free Google Ads Audit → `/schedule-call` | **No JSON-LD at all.** No `Service` or `FAQPage` schema despite on-page FAQ content. Redirect target of `/google-ads-service`. | **Critical** |
| `/social-media-ads` | `app/(pages)/social-media-ads/page.tsx` | Service landing | `lib/constants.ts` (`SOCIAL_MEDIA_ADS_*`) | `createMetadata(...,'/social-media-ads')` | None | `/schedule-call` (bespoke inline hero) | **No JSON-LD at all.** Redirect target of `/social-media-advertising`. | **Critical** |
| `/lead-generation` | `app/(pages)/lead-generation/page.tsx` | Service landing | `lib/constants.ts` (`LEAD_GEN_*`) | `createMetadata(...,'/lead-generation')` | None | `/schedule-call` (bespoke inline hero) | **No JSON-LD at all.** Redirect target of `/lead-generation-services`. | **Critical** |
| `/seo` | `app/(pages)/seo/page.tsx` | Service landing | `lib/constants.ts` (`SEO_*`) | `createMetadata(...,'/seo')` | None | `/schedule-call` (bespoke inline hero) | **No JSON-LD at all.** Redirect target of `/seo-services`. | **Critical** |
| `/conversion-optimization` | `app/(pages)/conversion-optimization/page.tsx` | Service landing | `lib/constants.ts` (`CRO_*`) | `createMetadata(...,'/conversion-optimization')` | None | `/schedule-call` (bespoke inline hero) | **No JSON-LD at all.** | **Critical** |
| `/how-it-works` | `app/(pages)/how-it-works/page.tsx` | Process / MOFU | `lib/constants.ts` (`PROCESS_STEPS`) | `createMetadata(...,'/how-it-works')` | None | Start Your Free Strategy Audit | `FAQPage` (6 Q&A) + `BreadcrumbList`. No `HowTo` schema. | High |
| `/pricing` | `app/(pages)/pricing/page.tsx` | Commercial | `lib/constants.ts` (`PRICING_PLANS`) | `createMetadata(...,'/pricing')` | None | Get Custom Pricing Quote | `FAQPage` (6 Q&A) + `BreadcrumbList`. No `Product`/`Offer` schema despite stated ₹50K/month entry price. | High |
| `/work` | `app/(pages)/work/page.tsx` | Case-study index | Contentful `caseStudiesCollection` | `createMetadata(...,'/work')` | None | Schedule Free Strategy Call | `revalidate = 60`. `Organization`, `ContactPoint`, `BreadcrumbList`. Index lives at `/work` but details live at `/portfolio/[slug]` — inconsistent URL family. Redirect target of `/results`. | High |
| `/portfolio/[slug]` | `app/(pages)/portfolio/[slug]/page.tsx` | Case-study detail | Contentful | `generateMetadata` → `createMetadata(metaTitle, metaDescription, href)` | None | n/a (in-page links) | `revalidate = 60`, `generateStaticParams`. **No JSON-LD at all** — no `Article`, `CaseStudy`, or `BreadcrumbList`. **No `/portfolio` index route exists** (bare `/portfolio` would 404). Redirect target of `/results/:slug`. | **Critical** — slug set is CMS-driven and externally linkable |
| `/blog` | `app/(pages)/blog/page.tsx` | Blog index | Contentful `postCollection` | `createMetadata(...,'/blog')` | Inert `<form>` (see note) | Get Free Marketing Audit | `revalidate = 60`. `CollectionPage`, `ItemList`, `BlogPosting`, `FAQPage` (4 Q&A), `BreadcrumbList`. Accepts `?category=` via `searchParams`; canonical is static `/blog`, so filtered variants self-canonicalise correctly. **No pagination** — all posts rendered, Contentful `limit` hard-capped at 100. Redirect target of `/content-marketing-services`. | **Critical** |
| `/blog/[slug]` | `app/(pages)/blog/[slug]/page.tsx` | Article | Contentful (rich text) | `generateMetadata` — the richest metadata on the site: `metaTitle`, `keywords`, `alternates.canonical`, OG `article` with `publishedTime`/`modifiedTime`/image (1200×630), Twitter `summary_large_image`, `authors`, `publisher` | Newsletter form (non-functional) | Contextual CTA blocks | `revalidate = 60`, `generateStaticParams`. Emits `Article`, `BreadcrumbList`, `FAQPage`, `ImageObject`, `Person`, `Organization`, `WebPage`. Canonical from `mappers.ts`: `${NEXT_PUBLIC_SITE_URL}/blog/${slug}`. | **Critical** — highest-volume URL family |
| `/about` | `app/(pages)/about/page.tsx` | Trust / entity | Hard-coded in page | `createMetadata(...,'/about')` | None | Schedule Free Strategy Call | `Organization` ×2, `Person` ×2, `FAQPage` (5 Q&A), `ContactPoint`, `BreadcrumbList`. Not linked from the header nav — footer only. | High |
| `/contact` | `app/(pages)/contact/page.tsx` | Conversion | `lib/metadata.ts` (`offices`) | `createMetadata(...,'/contact')` | **`ContactForm`** (8 fields) | Schedule Free Strategy Call | `FAQPage` + `BreadcrumbList`. Redirect target of `/contact-us`. | **Critical** — primary lead capture |
| `/schedule-call` | `app/(pages)/schedule-call/page.tsx` | Conversion | Hard-coded | `createMetadata(...,'/schedule-call')` | **Calendly embed** | Book My Free Call | `FAQPage` + `BreadcrumbList`. Site-wide primary CTA destination. | **Critical** — primary conversion endpoint |
| `/faq` | `app/(pages)/faq/page.tsx` | Support / AEO | `lib/constants.ts` (`FAQs`) | `createMetadata(...,'/faq')` | None | Schedule Free Strategy Call | `FAQPage` (1 Question emitted) + `BreadcrumbList`. Schema appears to under-emit relative to on-page FAQ volume — verify. | Medium |
| `/thank-you` | `app/(pages)/thank-you/page.tsx` | Post-conversion | Hard-coded | `createMetadata(...)` + `robots: 'noindex, nofollow'` | None | Schedule Free Strategy Call | Correctly noindexed; excluded from sitemap. **Orphaned** — no code path links or redirects to it; `ContactForm` shows an inline success state instead. | Medium — conversion-tracking implications |
| `/privacy-policy` | `app/(pages)/privacy-policy/page.tsx` | Legal | Hard-coded | `createMetadata(...)` + `robots: 'noindex, nofollow'` | None | n/a | `BreadcrumbList` only. Noindexed — note that noindexing legal pages is a choice, not a requirement. | Low |
| `/terms` | `app/(pages)/terms/page.tsx` | Legal | Hard-coded | `createMetadata(...)` + `robots: 'noindex, nofollow'` | None | n/a | `BreadcrumbList` only. Noindexed. | Low |
| `/launch-checklist` | `app/(pages)/launch-checklist/page.tsx` | Internal QA | Hard-coded | `robots: { index: false, follow: false }` only — **no title, no description** | None | n/a | Gated: calls `notFound()` unless `NODE_ENV === 'development'` or `ENABLE_INTERNAL_PAGES === 'true'`. Excluded from sitemap. | Low |
| `/404` (catch-all) | `app/not-found.tsx` | Error | Hard-coded link lists | `createMetadata(...,'/404')` + `robots: 'noindex, nofollow'` | None | Explore Services / Schedule Call | Rich recovery page with curated links. Hard-codes three blog URLs (see §4). | Medium |

---

## 3. Redirects (configured in `next.config.mjs`)

**VERIFIED FACT:** All nine redirects are `permanent: true` (HTTP 308 under Next.js; note 308, not 301).

| Source | Destination | Type |
|---|---|---|
| `/seo-services` | `/seo` | 308 permanent |
| `/google-ads-service` | `/google-ads` | 308 permanent |
| `/social-media-advertising` | `/social-media-ads` | 308 permanent |
| `/lead-generation-services` | `/lead-generation` | 308 permanent |
| `/content-marketing-services` | `/blog` | 308 permanent |
| `/digital-marketing-services` | `/services` | 308 permanent |
| `/contact-us` | `/contact` | 308 permanent |
| `/results` | `/work` | 308 permanent |
| `/results/:slug` | `/portfolio/:slug` | 308 permanent |

**INFERENCE:** The presence of these nine redirects implies a prior URL architecture with longer, `-services`-suffixed slugs and a `/results/` case-study family. Those legacy URLs are the ones most likely to hold external backlinks.

**VERIFIED FACT:** There are no `rewrites` configured.

**UNKNOWN:** Whether any additional redirects exist at the hosting/Apache/`.htaccess` layer. `doc/cpanel-deploy.md` references an `.htaccess` file generated by cPanel/Passenger, but no `.htaccess` is committed to the repository.

---

## 4. Route-Consistency Observations

**VERIFIED FACT — `/404` hard-codes three blog URLs** that must exist in Contentful or the recovery page links to 404s:
- `/blog/how-to-calculate-google-ads-roi`
- `/blog/facebook-ads-not-working`
- `/blog/seo-vs-ppc`

These are also duplicated in `lib/constants.ts` as `BLOG_ARTICLES`. **UNKNOWN:** whether these slugs currently exist in the Contentful `postCollection`.

**VERIFIED FACT — sitemap and route set diverge.** `app/sitemap.ts` enumerates 15 static paths. It omits `/thank-you`, `/terms`, `/privacy-policy`, and `/launch-checklist` (all correctly, since all four are noindexed). It includes every indexable route. Blog and case-study entries are appended dynamically.

**VERIFIED FACT — no index route for `/portfolio`.** Case-study details live at `/portfolio/[slug]` but the listing lives at `/work`. A request to `/portfolio` resolves to the 404 page.

**VERIFIED FACT — `/about` is absent from the header navigation.** `components/layout/Header.tsx` exposes a Services dropdown (5 service pages) plus How It Works, Case Studies, Pricing, Blog, Contact. `/about`, `/faq`, and `/services` are reachable from the footer only.

**UNKNOWN — no route currently 404s by design other than gated/internal ones.** Orphaned or broken routes beyond those noted cannot be established without a live crawl.

---

## 5. Rendering Strategy per Route

| Strategy | Routes |
|---|---|
| ISR, `revalidate = 60` | `/`, `/blog`, `/blog/[slug]`, `/work`, `/portfolio/[slug]` |
| Static (SSG at build; no revalidate export) | all other pages |
| `generateStaticParams` | `/blog/[slug]`, `/portfolio/[slug]` |

**VERIFIED FACT:** `dynamicParams` is not explicitly configured on either dynamic route, so the Next.js default (`true`) applies — slugs not present at build time are rendered on demand.

**INFERENCE:** Because `getBlogStaticParams` and `getCaseStudyStaticParams` return `[]` when Contentful credentials are absent, a build without `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` produces a site with an empty blog index and an empty case-study index, and a sitemap containing only the 15 static paths.
