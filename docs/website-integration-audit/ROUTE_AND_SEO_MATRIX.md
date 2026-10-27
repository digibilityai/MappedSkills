# Route and SEO Matrix

27 October 2026. Read-only. Live data fetched with `curl` against `https://mappedskills.com`; preview data from the dev server on `:3412`; source from `next.config.mjs`, `app/sitemap.ts`, `app/robots.ts` and each `page.tsx` in this worktree.
No production SEO configuration was changed. Rankings, traffic, Search Console and backlink data are **not available** and are marked as evidence gaps (EG) rather than estimated.

Risk scale: **Low** (no indexed URL or signal changes), **Medium** (indexed page, visible copy or schema changes), **High** (indexed URL, title or canonical at stake, or no verified fallback).

## 1. Route-by-route migration matrix

| Current URL | Approved destination | Action | Redirect required? | SEO risk | Verification needed |
|---|---|---|---|---|---|
| `/` (live 200, `index, follow`, title "Google Ads & Meta Ads for Growing Businesses", self-canonical `https://mappedskills.com`, Organization only) | `/` with Homepage R3 | Swap the component inside the existing page; keep live title, description, canonical, OG and Twitter; keep Organization JSON-LD. Do not ship the preview title ("THE RESOLVE R3 homepage preview"). Fix the review-call sentence (P1-04) | No | **Medium.** H1 is identical to live ("Paid advertising built around how your customers buy."), so the visible signal is stable; the body, FAQ (4 items) and internal links change. A homepage `FAQPage` does not exist today and adding one is a new decision | Before and after head diff; H1 count equals 1; internal links to audience and service routes preserved; no `?design=` rewrite reaches production |
| `/google-ads` (live 200, title "Google Ads Measured on the Enquiries, Not the Clicks", H1 "Reach people already searching for what you sell.", Organization + BreadcrumbList + FAQPage (7) + Service) | `/google-ads` with R4.1 | Swap component; keep wrapper, JSON-LD and metadata unless D1 says otherwise. Regenerate FAQPage from the rendered FAQ (preview shows 6, live schema has 7) | No | **Medium.** Preview title and H1 differ from live (P1-02). `DEC-079` preserves live metadata pending Search Console review. EG: current ranking and CTR | Head and JSON-LD diff; FAQ text equals schema; breadcrumb unchanged; `/google-ads-service` still 308 to it |
| `/social-media-ads` (live 200, "Paid Social, Judged on the Enquiries It Produces", H1 "Turn attention into business opportunities.", BreadcrumbList label "Paid social", FAQPage (7), Service) | `/social-media-ads` with Meta Ads R2.2 | Swap component; keep URL (no `/meta-ads` page, per `DEC-080`), breadcrumb label and metadata unless D1 says otherwise | No | **Medium.** Preview title "Meta Ads Management for Businesses in India" and H1 differ from live. URL still says "social media", visible name is "Meta Ads"; a deliberate, recorded trade-off. EG: queries driving the URL | Same as above; `/social-media-advertising` still 308 to it |
| `/who-we-help/d2c` (live 200, "Paid Advertising for D2C Brands in India", BreadcrumbList + FAQPage (7)) | `/who-we-help/d2c` with R1.1 | Swap component; keep wrapper JSON-LD; add nothing the live page lacks | No | **Medium.** New page (published 26 Oct), little indexing history. Preview title and H1 differ. FAQ 7 equals 7. Preview lacks BreadcrumbList (wrapper has it) | Head and JSON-LD diff; `/pricing` link retained |
| `/who-we-help/education` (live 200, "Google Ads & Meta Ads for Education Businesses in India", BreadcrumbList + FAQPage (7)) | `/who-we-help/education` with R2B | Swap component; regenerate FAQPage for the 10 visible questions | No | **Medium.** Title and H1 differ; FAQ 10 vs 7 schema. Live page is brand new, so little equity at stake (EG) | Schema equals visible FAQ; AnyBodyCanBake link `/portfolio/google-ads-for-online-courses` retained |
| `/who-we-help/real-estate` (live 200, "Real Estate Google & Meta Ads Agency in India", BreadcrumbList + FAQPage (7); named by the owner as existing and indexed) | `/who-we-help/real-estate` with R2.1 | Swap component; keep metadata (title already matches); regenerate FAQPage for 9 visible questions; keep BreadcrumbList | No | **Medium to High.** Title and H1 are identical to live, which lowers risk, but preview emits Organization only and FAQ is 9 vs 7. Replacing the wrapper would drop schema. Om Sai link `/portfolio/om-sai-developer-meta-ads` must stay | JSON-LD diff; eyebrow and body use "property developers and Channel Partners"; `/work` and Om Sai links work |
| `/who-we-help/enquiry-led-businesses` (**404**) | `/who-we-help/enquiry-led-businesses` with R1.1 | **Create** route (`page.tsx`, metadata, `BreadcrumbList`, `FAQPage` of 7, self-canonical), add to `app/sitemap.ts`, add commercial page-type, link from nav, footer and homepage | No (new URL) | **Low** for URL equity (nothing exists). **Medium** for cannibalisation with `/lead-generation` (WORKING HYPOTHESIS; the earlier audit judged the slug collision risk real and chose `enquiry-led-businesses` for it). EG: no keyword or SERP data for the title | 200, one canonical, `index, follow`; in `sitemap.xml`; JSON-LD valid; internal links resolve |
| `/lead-generation` (live 200, "Lead Generation Where the Unit Is an Enquiry You Can Act On", BreadcrumbList; redesigned G1, `DEC-057`) | `/lead-generation` unchanged | **Preserve.** No edit unless the owner approves the reciprocal link (P2-06). Keep `/lead-generation-services` 308 | No | **High if touched, Low if left alone.** Inbound links are the real exposure (P1-07): none from core pages or global navigation. EG: rankings and backlinks | URL, title, canonical, JSON-LD and sitemap entry byte-identical; at least one site-wide inbound link after D3 |
| `/services` (live 200, "Google Ads and Meta Ads Management in India") | unchanged | Preserve. Deferred wording follow-up (`DEC-080`) is not part of this release | No | Low | Head diff |
| `/seo`, `/ai-seo`, `/conversion-optimization`, `/problems/traffic-but-no-enquiries` (live 200, indexable, in sitemap) | unchanged | Preserve. Subject to D3 (inbound links) | No | **Medium.** No crawlable inbound links from the core pages or global chrome today. EG: size of any impact | Same as `/lead-generation` |
| `/who-we-help` (404) | none | **Do not create.** `DEC-081`: no hub; "See how we help each business" links to `/#who-we-help` | No | Low | 404 stays; the dropdown overview link resolves to the homepage anchor, and the anchor id exists on R3 (`id="who-we-help"`) |
| `/ppc-marketing` (404) | none | Remains a register entry, not implemented (`DEC-079`) | No | Low | No change |
| `/work`, `/portfolio/*` (live 200; sitemap lists `om-sai-developer-meta-ads`, `classpe-social-media-strategy`, `insuryo-organic-growth`, `seo-ameba-software`, `seo-for-home-decor-brand`, `google-ads-for-online-courses`) | unchanged | Preserve. Case links used by the new pages: Om Sai and AnyBodyCanBake | No | Low | Each linked case returns 200 |
| `/contact`, `/contact?intent=call` | unchanged | Final destination of every CTA | No | Low | CTA hrefs resolve; `/schedule-call` and `/contact/call` still 308 |
| Legacy redirects in `next.config.mjs` (12 rules): host canonical to `mappedskills.com`; `/seo-services`, `/google-ads-service`, `/social-media-advertising`, `/lead-generation-services`, `/content-marketing-services`, `/digital-marketing-services`, `/contact-us`, `/results`, `/results/:slug`, `/schedule-call`, `/contact/call` | unchanged | Preserve. The only uncommitted change to this file is a development-only rewrite block | No | Low if the dev block is removed (P1-05) | `git diff main -- next.config.mjs` shows no redirect edits |
| Preview routes (15 under `app/*-preview*`) | none | 404 in production (browser-tested); delete after release (P2-07) | No | Low | Production build returns 404 on all 15; none in sitemap |
| `/?design=…` | none | Development-only rewrite; remove (P1-05). In production it serves the normal homepage, canonical without the query | No | Low | Same |
| `/sitemap.xml` | add one line | Add `/who-we-help/enquiry-led-businesses` only. Nothing is removed | No | Low | New URL present; no preview URL; count of static paths +1 |
| `/robots.txt` | unchanged | Unchanged. `Disallow: /admin/ /api/`; AhrefsBot, SemrushBot, MJ12bot blocked; GPTBot and CCBot not named (open programme decision) | No | Low | Byte-identical |

## 2. Metadata comparison, live vs frozen preview

| Route | Live title | Preview title | Same? | Live H1 | Preview H1 | Same? |
|---|---|---|---|---|---|---|
| `/` | Google Ads & Meta Ads for Growing Businesses | THE RESOLVE R3 homepage preview | **Preview label only** | Paid advertising built around how your customers buy. | same | Yes |
| `/google-ads` | Google Ads Measured on the Enquiries, Not the Clicks | Google Ads Management for Indian Businesses | No | Reach people already searching for what you sell. | Reach customers when they're looking for what you sell. | No |
| `/social-media-ads` | Paid Social, Judged on the Enquiries It Produces | Meta Ads Management for Businesses in India | No | Turn attention into business opportunities. | Turn attention on Facebook and Instagram into business opportunities. | No |
| `/who-we-help/d2c` | Paid Advertising for D2C Brands in India | Google Ads and Meta Ads for D2C and Ecommerce Brands | No | More orders are good. Profitable growth is better. | More orders matter. So does what they cost. | No |
| `/who-we-help/education` | Google Ads & Meta Ads for Education Businesses in India | Google & Meta Ads for Course Providers in India | No | More of the right students. | Find learners who are ready for what you teach. | No |
| `/who-we-help/real-estate` | Real Estate Google & Meta Ads Agency in India | same | Yes | More property enquiries. More of the right buyers. | same | Yes |
| `/who-we-help/enquiry-led-businesses` | none (404) | Google & Meta Ads for Enquiry-Led Businesses | New | none | More enquiries are good. Better conversations are worth more. | New |

## 3. Structured data comparison

| Route | Live JSON-LD | Preview JSON-LD | FAQ visible vs live schema | Action |
|---|---|---|---|---|
| `/` | Organization | Organization | 4 visible (R3), none in schema | Keep Organization only unless the owner asks for FAQPage |
| `/google-ads` | Organization, BreadcrumbList, FAQPage 7, Service | Organization, FAQPage, Service | 6 vs 7 | Keep wrapper; regenerate FAQPage from rendered FAQ |
| `/social-media-ads` | same four | same minus BreadcrumbList | 7 vs 7 | Keep wrapper |
| `/who-we-help/d2c` | Organization, BreadcrumbList, FAQPage 7 | Organization, FAQPage | 7 vs 7 | Keep wrapper |
| `/who-we-help/education` | Organization, BreadcrumbList, FAQPage 7 | Organization, BreadcrumbList, FAQPage | 10 vs 7 | Regenerate FAQPage |
| `/who-we-help/real-estate` | Organization, BreadcrumbList, FAQPage 7 | Organization | 9 vs 7 | Keep wrapper; regenerate FAQPage |
| `/who-we-help/enquiry-led-businesses` | none | Organization | 7 visible | Create BreadcrumbList and FAQPage; no Service, rating, price or review node (same rule as `DEC-081` to `DEC-083`) |

## 4. Sitemap, robots and canonicals

- **Sitemap (live):** 37 URLs (21 static routes, 7 blog, 6 portfolio, 2 research, 1 press), including all five new routes from PR #59. The Enquiry-Led URL is the single addition. `app/sitemap.ts` already lists the other six under `indexablePaths`.
- **Canonicals:** live pages are self-canonical on the apex host. Previews have no canonical (correct for `noindex`). The new route must set its own via `createMetadata`, as `real-estate/page.tsx` does.
- **Robots:** previews use `robots: { index: false, follow: false }` and 404 in production; no `Disallow` entry exists or is needed.
- **Host:** `www` to apex normalisation is an open programme item (not in scope).

## 5. Evidence gaps (do not guess)

| Gap | Why it matters | Where it would come from |
|---|---|---|
| Search Console impressions, clicks, average position per route | Needed to judge the real risk of any title or H1 change (D1) | Owner access to Search Console |
| Backlink inventory for `/lead-generation`, `/seo`, `/ai-seo`, `/conversion-optimization` | Needed to size the internal-link and URL-preservation risk | Backlink tool or Search Console links report |
| SERP and autocomplete for "enquiry-led" phrasing | The Enquiry-Led title is a working hypothesis | Keyword and SERP research session |
| Server `.htaccess` and host redirects | Redirects may exist outside `next.config.mjs` | Owner retrieval (open item since 2026-08-31) |
| Live commit, run and `BUILD_ID` | Rollback target | Deploy workflow record |
