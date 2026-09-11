# Page Inventory — PROPOSED

**Session:** 07 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 5 open.
**Companion documents:** `WEBSITE_INFORMATION_ARCHITECTURE.md` (reasoning), `PAGE_REASON_TO_EXIST_MATRIX.md` (mandatory per-page justification), `CURRENT_TO_FUTURE_URL_MAP.md` (migration).

**Classification:** **LAUNCH** (required for first release) · **LAUNCH — CONDITIONAL** (architected now; ships at launch only if a named gate clears before content freeze, otherwise moves to PHASE 2) · **PHASE 2** (valuable after launch) · **FUTURE** (requires evidence, data or market validation) · **DO NOT BUILD** (explicitly rejected).

---

## 0. Counts

**Conditional pages are counted separately and are never folded into the launch total.**

| Class | Indexable | Non-indexable | Total routes |
|---|---|---|---|
| **LAUNCH — unconditional** | **22** | 5 | **27** |
| **LAUNCH — CONDITIONAL** | **2** | 0 | **2** |
| PHASE 2 | 11 (+2 if the condition fails) | 0 | 11–13 |
| FUTURE | 8 | 0 | 8 |
| DO NOT BUILD | — | — | 17 named rejections |

| Figure | Count |
|---|---|
| **Unconditional indexable launch pages** | **22** |
| **Conditional launch pages** | **2** |
| **Non-indexable launch routes** | **5** |
| **Total routes if the manufacturing gate clears** | **29** |
| Total routes if the gate does not clear | 27 |

Of the 22 unconditional pages, **13 already exist** as routes (repositioned or kept) and **9 are new**. Both conditional pages are new.

### The condition
`/industries/manufacturing` and `/blog/{industrial-b2b-article}` ship at launch **only if the manufacturing validation gate clears before content freeze**: (1) absolute volume verification with a real keyword tool, (2) a healthcare SERP comparison on the same basis, (3) one completed industrial engagement with a publishable result *(owner action)*.

**Manufacturing / industrial B2B remains candidate vertical beachhead #1 and is NOT an approved specialisation.** If the gate does not clear, both pages move to PHASE 2 and **no other part of the launch architecture changes**. The two move together because the article exists to give the beachhead depth and would be orphaned without its parent page.

---

## 1. LAUNCH — indexable, unconditional (22)

### 1.1 Homepage (1)

| # | URL | Type | Job | Status |
|---|---|---|---|---|
| 1 | `/` | Homepage | E, D | EXISTS — reposition |

### 1.2 Commercial (8 unconditional)

| # | URL | Type | Job | Status |
|---|---|---|---|---|
| 2 | `/services` | Core proposition hub | A, E | EXISTS — **reposition** from agency catalogue to the enquiry system |
| 3 | `/seo` | Capability | A | EXISTS — reposition |
| 4 | `/ai-seo` | Capability | A, C | **NEW** |
| 5 | `/google-ads` | Capability (demand source) | A | EXISTS — reposition, demote |
| 6 | `/social-media-ads` | Capability (demand source) | A | EXISTS — reposition, demote |
| 7 | `/lead-generation` | Capability (demand source) | A | EXISTS — reposition |
| 8 | `/conversion-optimization` | Capability | A | EXISTS — reposition |
| 9 | `/pricing` | Commercial + cost transparency | A, E | EXISTS — reposition |

### 1.3 Problem (1)

| # | URL | Type | Job | Status |
|---|---|---|---|---|
| 10 | `/problems/traffic-but-no-enquiries` | Problem | B, E | **NEW** |

### 1.4 Proof (4)

| # | URL | Type | Job | Status |
|---|---|---|---|---|
| 11 | `/how-it-works` | Published methodology (incl. what cannot be attributed) | D, E | EXISTS — **reposition** |
| 12 | `/research` | Research index | D, C | **NEW** |
| 13 | `/research/{ai-visibility-baseline}` | Original research | D, C | **NEW** — MappedSkills' own AI-visibility baseline |
| 14 | `/research/{own-site-enquiry-diagnostic}` | Original research | D, C | **NEW** — MappedSkills' own site diagnostic, published and fixed in public |

### 1.5 Editorial (4 unconditional)

| # | URL | Type | Job | Status |
|---|---|---|---|---|
| 15 | `/blog` | Editorial index | C | EXISTS — keep URL, populate |
| 16 | `/blog/{ai-search-guide-1}` | Article | C | **NEW** — `how to appear in chatgpt` family |
| 17 | `/blog/{ai-search-guide-2}` | Article | C | **NEW** — `how to get cited by ai` family · **[SUPERSEDED — see §1.5A]** |
| 18 | `/blog/{enquiry-conversion-article}` | Article | C, B | **NEW** — supports `/problems/traffic-but-no-enquiries` |

**Slugs are indicative.** Final slugs, titles and briefs belong to the content phase.

### 1.5A Supersession note — editorial slot 17

> **SUPERSEDED BY SESSION 09 — CONTENT STRATEGY REFINEMENT (2026-09-01).**
> The **second unconditional editorial slot remains**, and its topic changed. It is now *"how to tell whether SEO is actually producing qualified enquiries"* — the search → enquiries → qualified enquiries → measurement article — carrying **`PRIMARY SEARCH TARGET = UNVALIDATED`** and classified as buyer education and conversion support, **not** as keyword-demand-led.
> **`how to get cited by ai` is UNBUILT at launch.** It may be reconsidered in PHASE 2 only if it can support a distinct asset without duplicating the canonical `/research/{ai-visibility-baseline}` dataset, methodology, findings, charts or conclusion.
> **Unchanged by this refinement:** the launch article count (3 unconditional + 1 conditional) · every URL and route · the sitemap · navigation · commercial-page targeting · the problem page · the manufacturing conditional gate · indexable and non-indexable counts. **This is a content-topic refinement, not an IA redesign.** Rationale and decision trail: `DEC-009`, `docs/05-content/EDITORIAL_STRATEGY.md` §2A.



### 1.6 Company and conversion (4)

| # | URL | Type | Job | Status |
|---|---|---|---|---|
| 19 | `/about` | Entity / trust | D | EXISTS — keep, strengthen, **promote into header nav** |
| 20 | `/contact` | Conversion — **form surface** for qualified enquiry creation | E | EXISTS — keep, **must be made functional** |
| 21 | `/schedule-call` | Conversion — **booking surface** for qualified enquiry creation | E | EXISTS — keep, **must be made functional** |
| 22 | `/faq` | Support / entity | D | EXISTS — keep |

---

## 1B. LAUNCH — CONDITIONAL (2)

**Architected now. Ships at launch only if the manufacturing validation gate clears before content freeze. Otherwise both move to PHASE 2, with no other change to the launch architecture.**

| # | URL | Type | Job | Status |
|---|---|---|---|---|
| C1 | `/industries/manufacturing` | Vertical beachhead — **candidate #1, not approved specialisation** | A | **NEW — CONDITIONAL** |
| C2 | `/blog/{industrial-b2b-article}` | Article supporting C1 | C, A | **NEW — CONDITIONAL** |

**Why both, and why together.** C2 exists to give the beachhead depth; without C1 it is an orphaned article linking to a page that does not exist. They ship or defer as a pair.

**Reversibility requirement:** every internal link to C1 must be removable in a single change, and neither page may be referenced from any unconditional page in a way that breaks if the gate does not clear.

**If the gate does not clear**, the editorial stream launches with 3 articles rather than 4. Either that is accepted or a PHASE 2 article is promoted to hold the floor — **an orchestrator decision, not made here.**

---

## 2. LAUNCH — non-indexable routes (5)

These must exist at launch but must not be indexed.

| URL | Reason | Status |
|---|---|---|
| `/work` | Existing 308 target from `/results` — **must survive**. But an indexed case-study hub with zero case studies is a credibility exposure. **`noindex` + excluded from sitemap until ≥1 permissioned case study exists**, then indexed and added to navigation | EXISTS — hold back |
| `/thank-you` | Post-enquiry destination. **Currently orphaned — nothing links or redirects to it.** Must become the conversion-measurement endpoint | EXISTS — wire up |
| `/privacy-policy` | Legal. Currently `noindex`; **indexability is an open decision** (§17.4 of the IA document) | EXISTS — keep |
| `/terms` | Legal, `noindex` | EXISTS — keep |
| 404 | Error recovery. **Must stop hard-coding three blog slugs that currently return 404** | EXISTS — fix |

`/launch-checklist` remains environment-gated and is not a public route.

---

## 3. PHASE 2 (11)

Valuable, but not required for a disciplined first release. Several are gated on evidence or on proof that does not yet exist.

| URL | Type | Gate |
|---|---|---|
| `/work/{slug}` (first case studies) | Proof | **Owner action:** permissioned client results. Gates all premium positioning |
| `/work` indexed + in navigation | Proof | ≥1 published case study |
| `/problems/organic-traffic-dropped` | Problem | A SERP check. Autocomplete is clean but shallow (2 variants); SERP untested |
| `/problems/poor-quality-enquiries` | Problem | No query family tested. Strong ICP fit, unevidenced demand |
| `/tools/ai-crawler-access-check` | Tool | The one tool with clean demand and a genuine MappedSkills credential |
| `/blog/{crawler-access-guide}` | Article | Pairs with the tool above |
| `/blog/{pune-india-seo-cost}` | Article | PRIORITY 2. **Caveat: attracts price-shoppers** |
| `/blog/{b2b-seo-cluster}` ×2–3 | Articles | `b2b seo` / `enterprise seo` — clean but small |
| `/about/{person}` author pages | Entity | Justified once a body of authored work exists |
| `/about/editorial-standards` (or a `/how-it-works` section) | Entity / proof | Unclaimed and cheap; deferred only for launch discipline |
| `/blog/category/{slug}` archives | Editorial | Only if categories get real paths. **Do not create both a parameter and a path** |
| *(conditional fallback)* `/industries/manufacturing` + `/blog/{industrial-b2b-article}` | Vertical + article | **Enter PHASE 2 automatically if the manufacturing validation gate does not clear before content freeze.** Not additional pages — the same two pages, deferred |

---

## 4. FUTURE (8)

Requires evidence, data or a market validation that does not exist today.

| URL | Type | What must be true first |
|---|---|---|
| `/industries/{second-vertical}` | Vertical | Three published results in manufacturing. **Healthcare has never been SERP-tested** |
| `/research/{manufacturing-rfq-benchmark}` | Research | Client data MappedSkills does not hold. The strongest candidate defensibility asset |
| `/tools/enquiry-diagnostic` | Tool | **Blocked on the free/paid/hybrid entry-model decision.** A free self-serve version would price the entry offer at zero |
| `/tools/attribution-readiness` | Tool | Differentiated territory, **no demand evidence at all** |
| `/tools/conversion-leak-calculator` | Tool | Low value, commodity format |
| A Pune-qualified AI-SEO page | Geographic | (a) a live, reviewed Google Business Profile **and** (b) a fresh SERP check showing a genuine organic opening. **Never as a template** |
| International / export-facing pages | Geographic | **No international SERP or AI answer has ever been observed.** Requires its own research from an international vantage point |
| `/blog/{geo-vs-seo}` comparison content | Editorial | **DEFER.** Real demand; SERP held by Forbes, PwC, Semrush, a16z, Contentful. Revisit only with genuine authority |

---

## 5. DO NOT BUILD (17)

Explicitly rejected, with the evidence that rejects each.

| # | Rejected | Reason |
|---|---|---|
| 1 | `/geo`, `/generative-engine-optimization` | Upstream intent is course, meaning, jobs, certification. SERP held by Coursera, PwC, Forbes, Ahrefs. Indian agency supply already dense |
| 2 | `/aeo`, `/answer-engine-optimization` | Same. The bare acronym `aeo` belongs to Aeon magazine, AEON Credit and Aeon Flux |
| 3 | `/llmo`, `/llm-seo`, `/aio` | Terminology still fragmenting; buyers add a third acronym. A bet on which one survives |
| 4 | Any GEO/AEO/AIO glossary | Definitional SERPs institutionally owned |
| 5 | `/ai-visibility-score`, `/ai-visibility-checker`, any score page or dashboard | Page 1 of `ai visibility checker` is **ten free tools** led by Ahrefs and Semrush; an Indian agency already runs one; AI answers name Semrush, SE Ranking, Ahrefs and Profound ahead of any agency; cross-system agreement collapsed in direct measurement |
| 6 | A page per AI platform (`/chatgpt-seo`, `/perplexity-seo`, `/gemini-seo`, `/claude-seo`) | Thin permutations of one topic |
| 7 | City pages — `/seo-company-pune`, `/digital-marketing-agency-mumbai`, and permutations | Project Rule 10. The Pune SERP is decided by tenure, reviews and GBP; the AI answer by local listing data |
| 8 | An `/industries` grid — a page per vertical | One beachhead. A second only after three published results |
| 9 | Manufacturing sub-vertical pages | "Only after the parent page proves itself… must not become a page grid" |
| 10 | `/seo-for-exporters` | **`seo for exporters` returns (NONE).** Not a query, despite export being a real motive |
| 11 | `/marketing-automation`, `/lead-response-time`, `/revops` | `lead automation` fully career-contaminated; **`how to improve lead response time` returns (NONE)**; a parked expired domain ranks page 1 for `marketing automation agency india` |
| 12 | `/search-visibility`, `/organic-growth`, `/growth-marketing`, `/revenue-marketing` | `search growth agency` → **(NONE)**; `search visibility` → getcontact/Twitter/Instagram; `organic growth agency` → TikTok follower services; `revenue marketing agency` is not a query; `growth marketing agency` collapses into `digital marketing agency` |
| 13 | A `/resources` hub — templates, checklists, ebooks | No query family. The graveyard pattern |
| 14 | A statistics or "marketing stats" page built from borrowed figures | `DEC-007` and the source policy. Session 04 showed AI systems redistribute whatever the site asserts |
| 15 | A "best agencies in Pune"-style listicle naming competitors | Mechanism observed working, but close to Project Rule 10, a low-trust format, and MappedSkills has no standing to arbitrate a category it is absent from |
| 16 | An indexed `/work` with zero case studies | The empty-hub trap, against a live premium-price credibility exposure |
| 17 | Thin service permutations — `/seo-for-b2b`, `/ai-seo-for-manufacturing`, `/cro-for-saas` | Cannibalise their parents and produce nothing |

---

## 6. Launch scope discipline — the reasoning

**22 unconditional indexable pages — 24 if the manufacturing gate clears — is deliberately small.**

1. **The binding constraint on this business is proof, not page count.** A larger site with no analytics, no case studies, no reviews and no directory profiles is a bigger liability, not a bigger asset.
2. **Nothing outcome-based may be claimed before analytics and enquiry capture work** (`BUSINESS_STRATEGY.md` §5). Every additional page is another surface making claims the site cannot yet verify.
3. **Organic is a 12-month-plus engine.** No page in this inventory is expected to generate demand on publication, and the launch scope reflects that rather than pretending otherwise.
4. **Every page here is either an existing URL with equity, or a page with a named query family and a stated reason to exist.** Nothing is included because agencies normally have it.
5. **The largest launch-critical work is not pages at all** — it is a working contact form, a working booking path, analytics, enquiry-source capture, and the off-site listings and reviews programme. **Both conversion surfaces are launch-critical**, because a qualified enquiry may be created through either.
6. **Conditional pages are counted separately on purpose.** Folding a page whose business case is still unvalidated into the headline launch number is how search evidence quietly becomes a business decision.
