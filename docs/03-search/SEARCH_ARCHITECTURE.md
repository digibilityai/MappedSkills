# Search Architecture — PROPOSED

**Session:** 07 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 5 open. This is not an approved keyword map or content roadmap.
**Evidence base:** Sessions 03 and 04 artifacts, unmodified. **No new research was performed in this session** and no volume, difficulty, ranking, traffic or citation figure appears here.
**Governed by:** `docs/01-business/BUSINESS_STRATEGY.md` (frozen) and `DEC-008`.

---

## 1. The governing distinction

**`DEC-008`: a page may target a search term that the company does not use as company-level positioning.**

| Layer | What it is | Rule |
|---|---|---|
| **Company positioning** | What MappedSkills says it *is* | Demand capture → measurable qualified enquiries. **No technique category. No acronym.** Appears on `/`, `/about`, `/services`, and in all company-level messaging |
| **Search landing pages** | What a page is *about* | May target `seo agency`, `ai seo agency`, `lead generation`, `conversion rate optimization`, `google ads`, `seo agency for manufacturing companies`. Appears on capability, vertical and problem pages |

**The architectural test:** if the homepage or `/services` reads as an SEO, GEO, AEO or AI-search agency, this architecture has been violated — regardless of what `/seo` and `/ai-seo` say.

---

## 2. Query family → page assignment

One page per intent. Every assignment traces to a Session 03 priority band.

| Priority | Query family | Assigned page | Launch | Why this page and not another |
|---|---|---|---|---|
| **P1** | `seo agency for manufacturing companies`, `seo for manufacturing industry`, `digital marketing agency for b2b manufacturing companies` | `/industries/manufacturing` | **LAUNCH — CONDITIONAL** | 8 variants, 6 provider-seeking, **zero contamination** — the only family with that property. Open SERP; specialisation observed beating tenure. **Ships only if the manufacturing validation gate clears before content freeze; otherwise PHASE 2.** Manufacturing remains candidate beachhead #1, not an approved specialisation — **search evidence is not a business decision** |
| **P1** | `why your website gets traffic but no leads`, `why is my website not generating leads`, `how to get more leads from website` | `/problems/traffic-but-no-enquiries` | **LAUNCH** | One consolidated page for three families with one intent. The most winnable SERP observed; freshness-rewarded |
| **P1** | `how to appear in chatgpt` (8 clean variants) | `/blog/{ai-search-guide-1}` | **LAUNCH** | Informational SERP shape (Reddit, YouTube, HubSpot, OpenAI Help Centre) — a guide, not a service page |
| **P1** | `how to get cited by ai` (8 clean variants) | `/blog/{ai-search-guide-2}` | **LAUNCH** | Distinct family: citation and mention, not appearance |
| **P2** | `ai seo agency` + Pune/city/neighbourhood variants | `/ai-seo` | **LAUNCH** | The one AI category term with genuine provider intent. **Listicle-gated, not authority-gated** — see §5 |
| **P2** | `b2b seo`, `enterprise seo` | `/seo` | **LAUNCH** | The cleanest generic-SEO sub-family: no course, jobs or acronym contamination |
| **P2** | `seo services cost`, `how much does seo cost in pune`, `how much does ai seo cost` | `/pricing` + a PHASE 2 article | **LAUNCH (page)** | PAA asks it twice; a ranking snippet already quotes Pune pricing; under-served. **Caveat: attracts price-shoppers** |
| **P2** | `ai crawler access checker`, crawler/retrieval governance | PHASE 2 guide + `/tools/ai-crawler-access-check` | PHASE 2 | Narrow, technical, few strong incumbents — and MappedSkills' own audit is the credential |
| **P2** | Manufacturing enquiry/RFQ benchmark | `/research/{manufacturing-rfq-benchmark}` | **FUTURE** | Gated on client data MappedSkills does not hold |
| **P3** | `digital marketing agency pune`, `performance marketing agency pune` | **No page.** Off-site: Google Business Profile, reviews, listings | — | Real demand MappedSkills is not capturing, but the barrier is **tenure, reviews and GBP** — incumbents trading since 1998 and 2004 with hundreds of reviews. **No page wins this** |
| **P3** | `cro agency india`, `conversion rate optimization services` | `/conversion-optimization` (residual only) | LAUNCH | Winnable but low value; the acronym is broken in India. The real route is the problem page |
| **P3** | `whatsapp automation for business` | **No page** | — | Real Indian demand, poor strategic fit. Delivery capability, not an acquisition target |
| **DEFER** | `geo vs seo`, `aeo vs seo` | **No page** | — | Real demand; SERP held by Forbes, PwC, Semrush, a16z, Contentful. Revisit only with genuine authority |
| **DEFER** | Healthcare / education vertical families | **No page** | — | Healthcare's autocomplete is as clean as manufacturing's; **its SERP has never been tested** |
| **DEFER** | `marketing automation agency india` | **No page** | — | A parked expired domain ranks page 1. Easy to rank, unlikely to convert |
| **REJECT** | `generative engine optimization`, `answer engine optimization`, `aeo`, `llm seo` as category terms | **No page, ever** | — | Ranking here delivers **students, job-seekers and competitors** |
| **REJECT** | `ai visibility`, `ai visibility checker`, `llm visibility`, `chatgpt visibility` | **No page. No indexable tool** | — | Page 1 is **ten free tools** led by Ahrefs and Semrush |
| **REJECT** | `search visibility`, `search growth agency`, `organic growth agency` | **No page, ever** | — | Owned by other industries: profile settings and follower services |
| **REJECT** | `seo consultant`, `technical seo`, `lead automation`, `crm automation`, `ai marketing automation` | **No page** | — | Career and education audiences. **`how to improve lead response time` returns (NONE)** |
| **REJECT** | `reduce cost per lead` | **No page** | — | A paid-media problem in buyers' minds, not organic or conversion |
| **REJECT** | City grids, `seo for exporters`, `growth marketing agency`, `revenue marketing agency`, `revops agency` | **No page** | — | Non-queries, or terms with no independent identity. **`seo for exporters` returns (NONE)** |

---

## 3. Search intent conflict check

Every proposed launch page was tested against every other for overlap.

| Risk pair | Verdict | Resolution |
|---|---|---|
| `/` vs `/services` | **Real risk** | The homepage targets **brand and entity only** and does not target service terms. `/services` targets the proposition. Enforced by the homepage's ranking role in the IA document |
| `/seo` vs `/ai-seo` | **Checked — materially different** | Different SERP composition, different modifiers, different barriers: `seo company in pune` is tenure-gated and local; `ai seo agency` is listicle-gated with its own city and neighbourhood modifiers. Separate pages are justified |
| `/ai-seo` vs the two AI guides | **Manageable** | Commercial (`ai seo agency`, provider-seeking) vs informational (`how to appear in chatgpt`, question-shaped). Different SERPs entirely. Guides link up to `/ai-seo`; `/ai-seo` does not attempt to rank for the questions |
| `/conversion-optimization` vs `/problems/traffic-but-no-enquiries` | **Real risk** | Different intent (**CI** vs **PA**), different SERPs, different funnel stage. **The problem page must not target `conversion rate optimization`, and the commercial page must not target the buyer-symptom sentence** — this must be stated in both content briefs |
| The three lead-symptom families | **Would have been severe** | **Pre-empted by consolidation into one page.** Three near-identical pages would have cannibalised each other on a SERP where freshness and consolidation both matter |
| `/lead-generation` vs `/google-ads` vs `/social-media-ads` | **Moderate, pre-existing** | Retained as distinct channel/outcome intents. Not resolved by merging, because **backlink data is UNKNOWN** — see the URL map §4. Re-examine once Search Console data exists |
| `/industries/manufacturing` vs `/seo` and `/lead-generation` *(applies only if the conditional page ships)* | **Manageable** | The vertical page targets `... for manufacturing companies` phrasings; the capability pages target unqualified terms. **No sub-vertical pages**, which is where a grid would create real cannibalisation |
| `/pricing` vs a PHASE 2 cost article | **Real risk if both ship carelessly** | The page targets commercial price-stage intent; the article targets the informational `how much does SEO cost in Pune` question. **If the split cannot be sustained, ship only the page** |
| `/research` vs `/blog` | **Low** | Neither is a keyword target. Different jobs, cadences and evidence standards |
| `/about` vs `/` | **Low** | Both are brand-shaped; `/about` carries people and entity depth, `/` carries the proposition |
| Location duplication | **None — by construction** | No location pages exist |
| Vertical duplication | **None — by construction** | One vertical page, no sub-verticals, no `/industries` hub |
| Acronym/platform duplication | **None — by construction** | One AI commercial page. No page per acronym or per platform |

---

## 4. Where search cannot deliver, and what replaces it

Recorded so the architecture is not asked to do a job it cannot do.

| Demand | Why a page cannot capture it | What actually works |
|---|---|---|
| Pune local agency demand | The SERP serves a **Local Pack**; ChatGPT answers with a **16-entry local business list** driven by ratings, review counts, categories and addresses | **Google Business Profile, genuine reviews, complete and consistent NAP.** Off-site |
| Category-term visibility (`ai seo agency`, `b2b seo agency india`) | Listicles and directories appeared on **8 of 10** SERPs, frequently outranking the agencies they list | **Being listed and reviewed** — Clutch, Semrush Agency Partners, GoodFirms; and outreach into third-party listicles |
| AI answer inclusion | Directory sources appeared in **15 of 28** unbranded AI runs; MappedSkills is on none. Crawler access is already full and produced zero appearances | **The same directory and listings programme.** Access is necessary and demonstrably not sufficient |
| Near-term enquiry volume | Organic is a **12-month-plus** engine on three independent evidence bases | **Paid media** (retained capability), owner network, outbound |

**This table is the most important page in this document.** Roughly half of what the approved strategy needs from "search" is not a page and cannot be built by this project.

---

## 5. Content-cluster sequencing

| Cluster | Anchor | Launch volume | Cadence requirement |
|---|---|---|---|
| Website enquiry conversion | `/problems/traffic-but-no-enquiries` | 1 article | **Freshness is a live ranking lever here** — results dated "4 days ago" rank. Requires a sustained cadence or the page decays |
| AI-assisted discovery | `/ai-seo` | 2 articles | **Fastest-decaying topic on the site.** Refresh dates and findings on a defined schedule |
| Industrial / B2B acquisition **(conditional)** | `/industries/manufacturing` | 1 article, **conditional with its parent page** | Slower decay. Depth matters more than frequency. **Both defer to PHASE 2 together if the gate does not clear** |
| Search demand / B2B SEO | `/seo` | 0 at launch | PHASE 2 |
| Crawler access and citability | `/ai-seo` | 0 at launch | PHASE 2, paired with the tool |
| India/Pune cost transparency | `/pricing` | 0 at launch | PHASE 2 |
| Measurement and attribution | `/how-it-works` | 0 at launch | PHASE 2. **Publish for credibility, not for traffic** — no demand evidence exists |
| Paid demand capture | `/google-ads` | 0 | Support existing pages only. No cluster |
| GEO/AEO explainers, glossaries, comparisons | — | **Never** | Institutionally owned SERPs |

---

## 6. Technical search architecture requirements

Requirements for the technical phase. **Nothing is implemented here.**

1. **Structured data on commercial pages.** Five service pages and `/portfolio/[slug]` currently emit **no structured data at all**.
2. **Sitemap correctness.** Four verified defects: `lastModified` is `new Date()` for every URL; `changefreq` is an invalid key and is dropped; the static list is hard-coded and will drift; both Contentful collections are capped at 100. `/work` must be excluded while `noindex`.
3. **Canonical source consolidation.** `metadataBase` is unset; the base URL is hard-coded as a fallback in five files.
4. **Host normalisation.** `https://www.mappedskills.com/` returns **HTTP 200**, not a redirect.
5. **Cache headers.** `Cache-Control: public, max-age=31536000, immutable` is served on production **HTML** — browsers and intermediaries are told not to revalidate pages for a year.
6. **`robots.txt` governance.** Preserve `public/robots.txt`; deleting it silently activates a site-wide `GPTBot`/`CCBot` block from the inert `app/robots.ts`. Two pre-existing defects are also recorded: `Disallow: /admin/` and `/api/` sit under a `SemrushBot` group and therefore apply only to it, and `AhrefsBot`/`SemrushBot` are blocked site-wide. **Note: blocking `SemrushBot` has no bearing on listing at Semrush Agency Partners — they are different things.**
7. **Locale.** `openGraph.locale` is `en_US` for an India-only business. **No `hreflang` and no i18n** — India-first.
8. **Image optimisation** is disabled site-wide (`images.unoptimized: true`), including for CMS assets, with two raw `<img>` tags on article bodies. A performance and Core Web Vitals item.
9. **Measurement before claims.** **No analytics runs in production.** No search or conversion claim on any page is verifiable until this is fixed — a launch prerequisite, not an SEO nicety.
10. **Re-verify fast-changing guidance at implementation** (Project Rule 19): FAQ rich-result eligibility, AI-crawler tokens, and structured-data requirements.

---

## 7. What this document does not decide

Final keyword-to-page mapping with target queries per page · article briefs, titles and slugs · meta titles and descriptions · publishing calendar · link-building targets · the off-site listings programme's execution plan · any figure of any kind.
