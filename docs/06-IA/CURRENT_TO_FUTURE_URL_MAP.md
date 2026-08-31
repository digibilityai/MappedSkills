# Current → Future URL Map — PROPOSED

**Session:** 07 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** No redirect, route or configuration was changed. This is a migration plan, not an implementation.
**Basis:** `docs/10-technical/CURRENT_ROUTE_INVENTORY.md` (21 `page.tsx` files + `not-found.tsx`, 9 redirects) and `CURRENT_SEO_IMPLEMENTATION.md`.

---

## 0. The limitation that governs every decision below

> **No backlink, ranking, impression, click or traffic data exists for any URL on this site.**
> There is no Search Console access, no backlink tool, and **no analytics of any kind runs in production**.

Every classification below is therefore made on **intent, redirect history, schema value and strategic fit** — **not** on measured equity. Equity for every URL is recorded as **UNKNOWN**.

**Consequence, stated as a rule:** **nothing is retired and nothing is merged in this plan.** Removing or consolidating a URL whose external links cannot be measured would destroy value that nobody can quantify. The counts below reflect that deliberate conservatism, not an absence of opinion.

---

## 1. Action counts

| Action | Count | Note |
|---|---|---|
| **KEEP** — same URL, same purpose | **12** | |
| **REPOSITION** — same URL, materially changed purpose/content | **9** | The core of the transformation |
| **MERGE** — consolidated into another page | **0** | **Deliberate.** See §4 |
| **REDIRECT** — retired but equity preserved | **11** | 9 existing rules retained (1 re-pointed) + 2 new |
| **RETIRE / 410** | **0** | Nothing is genuinely worthless, and nothing can be proven worthless |
| **INVESTIGATE** — evidence insufficient | **4 flags** | Applied to items already classified above; see §5 |

**Total distinct current URLs and rules covered: 32** — 22 application routes (21 `page.tsx` + `not-found.tsx`), plus `/portfolio` (bare, currently 404), plus the 9 existing redirect rules. Every route in `CURRENT_ROUTE_INVENTORY.md` appears.

*(§3 restates the two `/portfolio*` rows from §2 as redirect rules. They are the same two URLs, shown once as current routes and once as the rules that implement their action — they are not counted twice.)*

---

## 2. Current application routes (22)

| Current URL | Current Purpose | Future URL | Action | Reason | Redirect Requirement | Risk |
|---|---|---|---|---|---|---|
| `/` | Homepage; title `Performance Marketing Agency \| 300%+ ROI \| MappedSkills` | `/` | **REPOSITION** | Category and claim are both now prohibited (`DEC-005`, `DEC-007`). Becomes the entity anchor and outcome proposition; **must not target service terms** | None | **CRITICAL** — highest-equity URL. Title/H1 change alters the strongest ranking signal on the site with no baseline to compare against. **The "300%+ ROI" claim is a live exposure being redistributed by AI systems, so leaving it is also a risk** |
| `/services` | Service hub / agency catalogue. Richest schema on the site | `/services` | **REPOSITION** | Becomes the core proposition page — the enquiry system, not a menu. Reuses existing schema and an existing 308 target | None | **CRITICAL** — 308 target from `/digital-marketing-services`. Moving it would create a chain; it is not moved |
| `/seo` | SEO service landing page | `/seo` | **REPOSITION** | Retained as a capability page targeting `b2b seo` / `enterprise seo` intent. **`seo company in pune` is not its target** — that SERP is tenure-gated | None | **CRITICAL** — 308 target from `/seo-services`. **Currently emits no structured data at all** |
| `/google-ads` | Google Ads service landing page | `/google-ads` | **REPOSITION** | Paid retained as a capability; **removal for positioning reasons is forbidden** by the frozen strategy. Becomes a demand-source page | None | **CRITICAL** — 308 target from `/google-ads-service`. Title contains "300%+ ROI"; no JSON-LD |
| `/social-media-ads` | Paid social service landing page | `/social-media-ads` | **REPOSITION** | Same rationale. **Weakest independent search evidence of the three paid pages** and the strongest future merge candidate — not merged, because backlink data is UNKNOWN | None | **CRITICAL** — 308 target from `/social-media-advertising`. No JSON-LD |
| `/lead-generation` | Lead-gen service landing page | `/lead-generation` | **REPOSITION** | `lead generation agency` is the live Indian phrasing for demand-generation intent, and the closest existing URL to the approved outcome word | None | **CRITICAL** — 308 target from `/lead-generation-services`. No JSON-LD |
| `/conversion-optimization` | CRO service landing page | `/conversion-optimization` | **REPOSITION** | Holds residual category intent under `DEC-008`; the acquisition route moves to `/problems/traffic-but-no-enquiries`. **Body copy must drop the acronym** | None | **CRITICAL** — the only service page with **no** legacy redirect pointing at it, so its external-link profile is entirely UNKNOWN. No JSON-LD |
| `/how-it-works` | Process / MOFU page | `/how-it-works` | **REPOSITION** | Becomes the **published methodology**, including what cannot be attributed. Avoids creating a competing `/methodology` URL | None | HIGH — content change is substantial; the URL and its `FAQPage` schema are retained |
| `/pricing` | Pricing page, ₹50K–₹2L/month tiers | `/pricing` | **REPOSITION** | Adds cost-transparency search intent (PAA asks twice; a ranking snippet quotes Pune pricing). **Premium price currently displayed with zero proof is a live exposure** | None | HIGH — attracts price-shoppers; `ICP.md` fit criteria are the mitigation |
| `/work` | Case-study index; currently renders **zero** case studies | `/work` | **KEEP** | 308 target from `/results` — must survive. Purpose unchanged | None | HIGH — **must be `noindex` and out of the sitemap until ≥1 permissioned case study exists**, or it is an indexed empty hub against a premium price |
| `/portfolio/[slug]` | Case-study detail; currently **zero** published | `/work/[slug]` | **REDIRECT** | Consolidates the split family (index at `/work`, detail at `/portfolio/`). **Safe now precisely because zero case studies are published** | `/portfolio/:slug` → `/work/:slug`, 301 | **CRITICAL — and blocked.** The slug set is CMS-driven and UNKNOWN. `mappers.ts` implements slug-variant tolerance (`normalizeCaseStudySlug`, `caseStudySlugCandidates`) whose behaviour must be understood first |
| `/portfolio` (bare) | **No route — currently 404s** | `/work` | **REDIRECT** | Removes a soft edge; a plausible hand-typed and link-truncation target | `/portfolio` → `/work`, 301 | LOW |
| `/blog` | Blog index; currently renders **"No articles found"** | `/blog` | **KEEP** | 308 target from `/content-marketing-services`. Renaming to `/insights` would create a chain and discard the site's best-implemented SEO surface for no search benefit | None | **CRITICAL** — accepts `?category=`; canonical is static `/blog`, which is correct. **No pagination; Contentful capped at 100 items** |
| `/blog/[slug]` | Article; the richest metadata and schema on the site | `/blog/[slug]` | **KEEP** | Pattern unchanged. Existing implementation carried forward | None | **CRITICAL** — highest-volume URL family. **Slug set UNKNOWN**; production publishes zero. `dateModified` maps to any CMS republish and should be corrected |
| `/about` | Trust / entity page; **footer-only, absent from header** | `/about` | **KEEP** | URL and purpose unchanged; **promoted into the primary navigation** and strengthened as the entity anchor | None | HIGH — Session 04 found working branded retrieval and zero unbranded discovery; branded AI answers are built from first-party sources, and this is the page they read |
| `/contact` | Primary lead capture | `/contact` | **KEEP** | 308 target from `/contact-us`. Purpose unchanged | None | **CRITICAL** — **the production form has no `action` and no `method` and transmits nothing.** Also carries the NAP; the entity declaration's `postalCode` contains the word "India" |
| `/schedule-call` | Booking; site-wide CTA destination | `/schedule-call` | **KEEP** | Purpose unchanged | None | **CRITICAL** — **the Calendly container renders empty (zero iframes); pre-hydration HTML shows a "not configured yet" fallback** |
| `/faq` | Support / AEO page | `/faq` | **KEEP** | Purpose unchanged; value is as a first-party source surface | None | MEDIUM — emits `FAQPage` for **one** Question against a larger on-page set. FAQ rich-result eligibility must be re-verified at implementation |
| `/thank-you` | Post-conversion page, `noindex`, **orphaned** | `/thank-you` | **KEEP** | Must become the post-enquiry destination and conversion-measurement endpoint | None | MEDIUM — conversion-tracking depends on it; nothing currently links or redirects to it |
| `/privacy-policy` | Legal, `noindex` | `/privacy-policy` | **KEEP** | Retained. **Indexability is an open decision** | None | LOW — the site's own privacy policy states a consent banner is required before launch; that is a separate pre-launch blocker |
| `/terms` | Legal, `noindex` | `/terms` | **KEEP** | Unchanged | None | LOW |
| `/launch-checklist` | Internal QA, environment-gated, `noindex`, not in sitemap | `/launch-checklist` | **KEEP** | Internal tooling; not a public route | None | LOW — has no title and no description; harmless while gated |
| `/404` (`not-found.tsx`) | Error recovery, `noindex` | `/404` | **KEEP** | Purpose unchanged | None | MEDIUM — **hard-codes three blog slugs that all currently return 404**, so the recovery page links to further 404s. Links must be generated from live routes |

---

## 3. Existing redirect rules (9) + new rules (2)

**VERIFIED FACT:** all nine current redirects are `permanent: true`, which Next.js emits as **308**, not 301.

| Current URL | Current Purpose | Future URL | Action | Reason | Redirect Requirement | Risk |
|---|---|---|---|---|---|---|
| `/seo-services` | Legacy service URL | `/seo` | **REDIRECT — unchanged** | Destination is repositioned, not moved. No chain created | Existing 308 retained | MEDIUM — legacy URLs are the ones most likely to hold external backlinks. **Backlink profile UNKNOWN** |
| `/google-ads-service` | Legacy service URL | `/google-ads` | **REDIRECT — unchanged** | Same | Existing 308 retained | MEDIUM |
| `/social-media-advertising` | Legacy service URL | `/social-media-ads` | **REDIRECT — unchanged** | Same | Existing 308 retained | MEDIUM |
| `/lead-generation-services` | Legacy service URL | `/lead-generation` | **REDIRECT — unchanged** | Same | Existing 308 retained | MEDIUM |
| `/content-marketing-services` | Legacy service URL | `/blog` | **REDIRECT — unchanged** | **This rule is the single strongest argument for keeping `/blog` as the editorial URL** | Existing 308 retained | MEDIUM — an intent mismatch (a service URL pointing at a blog index) that predates this project. Recorded, not changed |
| `/digital-marketing-services` | Legacy service hub | `/services` | **REDIRECT — unchanged** | Destination repositioned, not moved | Existing 308 retained | MEDIUM |
| `/contact-us` | Legacy contact URL | `/contact` | **REDIRECT — unchanged** | Same | Existing 308 retained | LOW |
| `/results` | Legacy case-study index | `/work` | **REDIRECT — unchanged** | Destination kept | Existing 308 retained | MEDIUM |
| `/results/:slug` | Legacy case-study detail | **`/work/:slug`** | **REDIRECT — RE-POINTED** | Re-pointed **directly** from `/portfolio/:slug` to `/work/:slug`. **This is the whole reason the consolidation is safe: it creates no chain** | Existing rule edited, 308→ new destination | **CRITICAL** — the legacy `/results/:slug` slug set is **UNKNOWN**. Must be reconstructed before this ships |
| `/portfolio/:slug` | Current case-study detail | `/work/:slug` | **REDIRECT — NEW** | Safety net for any historically indexed detail URL | New 301 | HIGH — depends on the Contentful slug enumeration |
| `/portfolio` | Currently 404 | `/work` | **REDIRECT — NEW** | Removes a soft edge | New 301 | LOW |

---

## 4. Why nothing is merged and nothing is retired

Both actions were considered and both were rejected **on evidence grounds, not on preference**.

| Candidate | Why it looked mergeable | Why it is not merged |
|---|---|---|
| `/social-media-ads` → `/google-ads` | Paid social has the weakest independent search evidence of the three paid pages, and paid media is off company positioning | It is a 308 target from `/social-media-advertising`; its backlink profile is **UNKNOWN**; and the frozen strategy explicitly forbids removing paid URLs for positioning reasons. **Revisit once Search Console and backlink data exist** |
| `/conversion-optimization` → `/problems/traffic-but-no-enquiries` | The category term is weak in India and the problem page is the real acquisition route | Different intent (**CI** vs **PA**) and different funnel stage. Merging would surrender the residual category intent that `DEC-008` explicitly permits pursuing |
| `/faq` → `/how-it-works` | Overlapping trust content | `/faq` serves long-tail question phrasings and functions as a first-party source surface for AI answers. Distinct job |
| `/services` → `/` | The homepage will carry the proposition | The homepage must not rank for service terms. Merging would collapse the entity anchor into the commercial hub and cannibalise both |
| Any route → 410 | Several routes have no measurable value | **No route can be shown to be worthless, because no measurement exists.** A 410 is irreversible in a way a redirect is not |

---

## 5. INVESTIGATE — evidence insufficient (4)

These do not change any classification above; they must be resolved **before** the migration ships.

| # | Item | Why it matters | How to resolve |
|---|---|---|---|
| 1 | **The full `/blog/[slug]` slug set** | Highest-volume URL family. Production publishes zero, and whether the cause is missing Contentful credentials or an empty space is **UNKNOWN** — the observable outcome is identical | One look at the Contentful space or one build log |
| 2 | **The full `/portfolio/[slug]` and legacy `/results/:slug` slug sets** | The `/work/{slug}` consolidation is blocked on this. Slug-variant tolerance in `mappers.ts` must also be understood | Contentful enumeration + reading `normalizeCaseStudySlug` |
| 3 | **Host-level redirects** | No `.htaccess` is committed, but `doc/cpanel-deploy.md` references a cPanel/Passenger-generated one. Unknown host rules can silently create chains or loops with application rules | Retrieve `.htaccess` from the server |
| 4 | **`www` host normalisation** | `https://www.mappedskills.com/` returns **HTTP 200**, not a redirect — the site is fully reachable on two hostnames. Mitigated by self-canonicalisation to the apex, but it doubles every URL in this map | Host or CDN configuration; decide apex-canonical and enforce a 301 |

---

## 6. SEO equity safety requirements

Requirements for the technical phase. **None is implemented here.**

1. **No redirect chains.** `/results/:slug` is re-pointed directly rather than layered onto `/portfolio/:slug`. Every proposed rule must be tested for chains **against host-level rules as well as application rules** (§5.3).
2. **Redirect status consistency.** Existing rules emit **308**; the two new rules are specified as **301**. Mixing is not harmful, but the migration should decide one convention and document why.
3. **Canonical consistency.** Canonicals are currently absolute and self-referencing, which is correct. `metadataBase` is **not set anywhere** and the base URL is hard-coded as a fallback in five files — consolidate to one source before any URL changes.
4. **Locale correctness.** `openGraph.locale` is hard-coded `en_US` for an India-only business. No `hreflang` and no i18n exist, and none should be added — India-first, no international strategy.
5. **Sitemap consistency.** The current sitemap has four verified defects: `lastModified` is `new Date()` for **every** URL; `changefreq` is an invalid key and is dropped; the static page list is hard-coded and will drift; and both Contentful collections are capped at 100 items. All four must be fixed, and `/work` must be excluded while it is `noindex`.
6. **Internal link updates.** Every internal link to `/portfolio/*` must be rewritten to `/work/*` in the same release as the redirect, so no internal link resolves through a redirect.
7. **Preserve `public/robots.txt`.** **Deleting it hands `/robots.txt` to the inert `app/robots.ts` and silently activates a site-wide `GPTBot`/`CCBot` block** — an opt-out of OpenAI training with no code change and no review. This is the single most dangerous latent action in the migration.
8. **Contentful compatibility.** The integration **fails silently**: missing credentials produce HTTP 200 with an empty blog, empty case studies and a 15-URL sitemap, with no error and no build failure. A migration could ship exactly that. Add a build-time failure or an alert before launch.
9. **Baseline capture before anything changes.** Verify Search Console, capture whatever index and query data exists, and export the live sitemap and route list. **Today there is no baseline at all**, which means a regression would be undetectable.
10. **Pagination before the editorial stream scales.** The 100-item Contentful ceiling silently truncates the blog index, `generateStaticParams` and the sitemap simultaneously.
