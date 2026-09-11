# Content Cluster Architecture — PROPOSED

**Session:** 09 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Corrected:** 2026-09-01 (orchestrator correction pass — launch article 2 remapped; §4 and §4A affected).
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 7 is not passed by this document.
**Governed by:** `docs/06-IA/WEBSITE_INFORMATION_ARCHITECTURE.md` §12 and `docs/03-search/SEARCH_ARCHITECTURE.md` §5, both of which this document implements without altering.

**No cluster is added, removed or reclassified relative to the approved IA.** This document assigns each cluster its content job, its anchor, its launch volume, its cadence obligation and its explicit boundaries.

---

## 1. The restraint principle

**MappedSkills has six capabilities. It does not get six content silos.**

A cluster exists where three things are simultaneously true:
1. a query family with **recorded Session 03 evidence** supports it;
2. an approved anchor page exists to receive the traffic and the internal links;
3. MappedSkills can produce **information gain** in it today, from evidence it actually holds.

Two clusters clear all three at launch. One clears them conditionally.

**One narrow exception, created by the correction pass and recorded rather than hidden:** the **measurement and search-to-enquiry** cluster launches with a single article that **fails condition 1** — no query family supports it. It is admitted on conditions 2 and 3 alone, carried entirely by **buyer education and conversion support**, with **PRIMARY SEARCH TARGET = UNVALIDATED** on the record. It is **published for credibility, never for traffic**, and it does not open the door to further evidence-free clusters (§4A).

Everything else waits or is refused.

---

## 2. Cluster classification

| Cluster | Anchor | Class | Launch volume | Cadence obligation |
|---|---|---|---|---|
| **Website enquiry conversion** | `/problems/traffic-but-no-enquiries` | **LAUNCH** | 1 article | **Sustained.** Freshness is a live ranking lever on this SERP — results dated "4 days ago" and "1 week ago" were observed ranking. Without a cadence the anchor decays |
| **AI-assisted discovery** | `/ai-seo` | **LAUNCH** | **1 article** | **Scheduled review.** The fastest-decaying topic on the site. Dates and findings refreshed on a defined schedule, or the content becomes wrong rather than merely stale |
| **Measurement and the search-to-enquiry chain** | `/how-it-works` | **LAUNCH — 1 article** *(promoted from PHASE 2 in the correction pass)* | 1 article | **Event-triggered only.** Published for credibility, never for traffic |
| **Industrial / B2B acquisition** | `/industries/manufacturing` | **LAUNCH — CONDITIONAL** | 1 article, conditional **with its parent page** | Slower decay. **Depth matters more than frequency.** Both defer to PHASE 2 together if the manufacturing validation gate does not clear before content freeze |
| **Search demand capture / B2B SEO** | `/seo` | **PHASE 2** | 0 | `b2b seo` / `enterprise seo` is clean but small. The anchor page ships; the cluster does not |
| **AI crawler access and citability** | `/ai-seo` | **PHASE 2** | 0 | Clean diagnostic family, few strong incumbents, and MappedSkills' own audit is the credential. Pairs with `/tools/ai-crawler-access-check` |
| **India / Pune cost transparency** | `/pricing` | **PHASE 2** | 0 | Genuine under-served family. **Ship the page at launch, the article later** — and if the intent split between them cannot be sustained, ship only the page |
| **Paid demand capture** | `/google-ads` | **FUTURE — support only, never a cluster** | 0 | Off company positioning. Existing pages are supported; no editorial stream is built around them |
| **GEO / AEO / AIO explainers, glossaries and comparisons** | — | **DO NOT BUILD** | — | Institutionally owned SERPs (Coursera, PwC, Forbes, HubSpot, Ahrefs, Semrush, a16z, Contentful); upstream intent is course, meaning, jobs and certification |
| **Location / city content** | — | **DO NOT BUILD** | — | The Local Pack decides the query; ChatGPT answered the same intent with a 16-entry local business list. **This is an off-site problem** |
| **Marketing automation / lead response** | — | **DO NOT BUILD** | — | `lead automation` is fully career-contaminated; `how to improve lead response time` returns **(NONE)**; a parked expired domain ranks page 1 for `marketing automation agency india` |
| **AI visibility scores, checkers, rankings** | — | **DO NOT BUILD** | — | Rejected on the classic SERP, inside AI answers, and methodologically |

**Launch totals: 3 unconditional clusters carrying 3 articles — one article each; 1 conditional cluster carrying 1 article.**

**Exactly one launch article is primarily AI Search.** AI Search is a highly visible supporting capability, **not the company category**, and the editorial set must not make it look like one.

**Changed by the correction pass, and nothing else:** AI-assisted discovery dropped from 2 articles to 1, and the measurement territory was promoted from PHASE 2 (0 articles) to LAUNCH (1 article) to receive the replacement. **No cluster was added or removed, no article was added, and no other classification changed.**

---

## 3. Cluster 1 — Website enquiry conversion

| | |
|---|---|
| **Anchor** | `/problems/traffic-but-no-enquiries` |
| **Buyer** | Founder/owner or marketing lead with traffic and no enquiries, who has not yet named the discipline |
| **Job** | Search demand capture (1) · buyer education (2) · conversion support (6) |
| **Why it launches** | The **most winnable SERP observed anywhere in the programme** — no HubSpot, no Semrush, no Forbes, no CXL; incumbents are peer-level small agencies; freshness is rewarded |
| **Information gain available today** | MappedSkills diagnosed exactly this failure on its own site, with dated, reproducible, first-party evidence |
| **Commercial pages supported** | `/conversion-optimization` (primary) · `/lead-generation` · `/seo` |
| **Proof asset it rests on** | `/research/{own-site-enquiry-diagnostic}` |
| **Launch assets** | Anchor page + 1 article |
| **PHASE 2 expansion, evidence-gated** | `/problems/organic-traffic-dropped` (SERP untested) · `/problems/poor-quality-enquiries` (no query family tested) |
| **Boundary** | The anchor owns the three head symptom phrasings. The article takes a **narrower sub-intent** and links up. **Neither targets `conversion rate optimization`** — that residual category intent belongs to `/conversion-optimization` |
| **Failure mode to avoid** | The anchor becoming a service pitch behind a question-shaped headline. That is a doorway page, Project Rule 10 forbids it, and it would also fail to convert |

---

## 4. Cluster 2 — AI-assisted discovery

| | |
|---|---|
| **Anchor** | `/ai-seo` |
| **Buyer** | A marketer or owner asking, in their own words, why their business does not appear in AI answers |
| **Job** | Search demand capture (1) · authority (3) · proof (5) · conversion support (6) |
| **Why it launches** | `how to appear in chatgpt` returns **8 clean variants**, PRIORITY 1, buyer-phrased, COMPETITIVE BUT POSSIBLE |
| **Information gain available today** | A 39-run first-party measurement, per-system, with run counts, dates, location and stated limits — including MappedSkills' own **measured zero** |
| **Commercial pages supported** | `/ai-seo` (primary) · `/seo` |
| **Proof asset it rests on** | `/research/{ai-visibility-baseline}` |
| **Launch assets** | Anchor page + **1 article** + 1 research entry |
| **PHASE 2 expansion** | Crawler access and citability guide, paired with `/tools/ai-crawler-access-check` |
| **Hard boundaries** | **No page or article per acronym.** **No page or article per platform.** **No score, no rank, no blended cross-system figure, ever.** No guarantee of appearance or citation. **And exactly one launch article — a second AI article was withdrawn in the correction pass because it would have republished the research dataset** (`CONTENT_STRATEGY.md` §6A) |
| **Canonical-research boundary** | **`/research/{ai-visibility-baseline}` is the canonical home for the Session 04 measured dataset, method, findings, charts and limitations.** The article summarises only what its own argument needs, links to the canonical entry, and adds application the entry does not contain. `how to get cited by ai` remains an **unbuilt** family — available to PHASE 2 only if an asset can be written that does not reproduce the baseline |
| **The subordination rule** | AI Search is visible in four surfaces and is the company's category in none. **If the homepage or `/services` ever reads as an AI-search agency, this cluster has been built wrongly** — regardless of what `/ai-seo` says |
| **Decay risk, stated** | This is the fastest-decaying content on the site. A cluster that is not refreshed on schedule becomes actively wrong, which is worse than absent |

---

## 4A. Cluster 3 — Measurement and the search-to-enquiry chain

**Promoted from PHASE 2 to LAUNCH in the correction pass, to receive the replacement article. It carries one article and no more.**

| | |
|---|---|
| **Anchor** | `/how-it-works` |
| **Buyer** | An owner, marketing lead or commercial lead already paying for search work who cannot answer whether it is producing enquiries worth having |
| **Job** | **Buyer education (2) · conversion support (6).** **Not search demand capture** |
| **Search evidence** | **NONE. PRIMARY SEARCH TARGET = UNVALIDATED.** No recorded Session 03 family covers this intent, and `how to improve lead response time` — the nearest measurement-adjacent phrasing tested — returns **(NONE)**. **No search demand was invented** |
| **Why it launches anyway** | It states the approved proposition in the buyer's own commercial terms — rankings and traffic are not the outcome, qualified enquiries are — and it is the bridge between the acquisition pages and the measurement half of the method. **It is published for credibility and conversion support, never for traffic** |
| **Information gain available today** | A published, machine-evaluable qualified-enquiry definition; the independence of qualification and attribution; and MappedSkills' own audited absence of any measurement layer |
| **Commercial pages supported** | `/seo` · `/services` · `/lead-generation` — plus `/problems/traffic-but-no-enquiries` and `/how-it-works` |
| **Proof asset it rests on** | `/research/{own-site-enquiry-diagnostic}` |
| **Launch assets** | Anchor page *(already a launch proof page)* + 1 article |
| **Validation requirement** | A **targeted** India-lens check on the candidate phrasings before final copy. **Not broad keyword research.** If nothing clean and non-cannibalising is found, the UNVALIDATED label stays and no query target is claimed |
| **Boundaries** | It does not restate `/how-it-works`; it applies it. It does not take the problem page's head phrasings. It does not become a service pitch for `/seo` |
| **Expansion rule** | **This cluster does not grow on the strength of one unvalidated article.** A second asset requires either validated demand or a distinct, evidenced buyer question |

**Why this exception does not open a door.** It is admitted on two of the three §1 conditions, it is capped at one article, its class is recorded as unvalidated rather than asserted, and its cadence obligation is event-triggered. **A cluster with no search evidence and no buyer question still earns nothing**, and no other territory is promoted on this precedent.

## 5. Cluster 4 — Industrial / B2B acquisition — **CONDITIONAL**

| | |
|---|---|
| **Anchor** | `/industries/manufacturing` |
| **Status** | **LAUNCH — CONDITIONAL.** Ships only if the manufacturing validation gate clears before content freeze: (1) absolute volume verification with a real keyword tool, (2) a healthcare SERP comparison on the same basis, (3) one completed industrial engagement with a publishable result *(owner action)* |
| **Buyer** | Indian industrial / manufacturing B2B decision-maker; frequently the owner or the commercial lead |
| **Job** | Search demand capture (1) · buyer education (2) · conversion support (6) |
| **Why it is a candidate** | The **cleanest commercial query family observed anywhere in the programme** — 8 variants, 6 provider-seeking, **zero contamination** — on an open SERP where a 3-year-old, 17-review specialist holds a Local Pack slot beside 486- and 507-review generalists |
| **Information gain available today** | Domain fluency on RFQ paths, specifications, dealer and export journeys. **No client result and no benchmark data** |
| **Adverse evidence, recorded** | Absolute volume is **UNKNOWN**; manufacturing was the **least stable** AI prompt tested (2 of ~5 names recurring); every observed entry route was **a directory or a single listicle, not vertical content**; healthcare has never been SERP-tested |
| **Launch assets if the gate clears** | Anchor page + 1 article. **One article, not a cluster** |
| **If the gate does not clear** | Both move to PHASE 2 together. **No other part of the launch content architecture changes** |
| **Reversibility requirement** | Every internal link into this cluster must be removable in a single change, and no unconditional asset may depend on it |
| **Hard boundary** | **MappedSkills is never described as a manufacturing agency**, and no company-level page may be written as though the beachhead were settled. Manufacturing is candidate beachhead #1, not an approved specialisation |

---

## 6. Why not more clusters

Recorded so the question is not reopened by assumption.

- **Six capabilities do not justify six silos.** Two of the six — measurement/attribution and follow-up automation — have **no supporting query family at all**, and one of them has a family that returns **(NONE)**. Measurement carries **one** launch article on buyer-education grounds with its search target labelled UNVALIDATED (§4A); follow-up automation carries **none**, and gets none.
- **A cluster with no cadence is worse than no cluster.** Both launch clusters carry a cadence obligation, and MappedSkills' publishing capacity is finite and unproven — it currently publishes zero articles.
- **The proof deficit caps useful volume.** Every additional asset is another surface making claims the site cannot yet verify, on a site whose analytics do not exist.
- **The authority side of the job is off-site and is not solved by clusters.** A material part of search and AI-discovery authority cannot be created through owned-site publishing alone — directory sources appeared in **15 of 28** unbranded AI runs and MappedSkills is on none.

---

## 7. Cluster health — what would justify expansion

Stated in advance so expansion is a decision rather than a drift. **None of these can be evaluated until analytics exists.**

| Trigger | Consequence |
|---|---|
| A launch cluster reaches its cadence for two consecutive quarters **and** its anchor page holds impressions | Add the next article in that cluster before opening a new one |
| Search Console shows a consistent, unserved query family adjacent to a launch cluster | Evaluate a PHASE 2 asset against §1 — not automatically build it |
| The manufacturing gate clears | Cluster 3 activates as specified. **Still one article, not a grid** |
| Three published manufacturing results exist | Only then may a second vertical be evaluated (`ICP.md` §7) |
| A launch cluster misses its cadence for two quarters | **Stop adding clusters.** Fix the cadence or retire the obligation honestly |
