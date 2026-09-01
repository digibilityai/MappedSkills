# Launch Content Inventory — PROPOSED

**Session:** 09 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Corrected:** 2026-09-01 (orchestrator correction pass — asset 17 replaced; counts unchanged).
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 7 is not passed by this document.
**Reconciles against:** `docs/06-IA/PAGE_INVENTORY.md` §0 (proposed, Gate 5 open).

**No indexable URL is added, removed or renamed by this session.** Every asset below corresponds one-to-one with an approved-architecture page. Slugs in braces are indicative and were set by the IA; final slugs belong to the writing phase.

---

## 0. Reconciliation with the approved architecture

| Figure | IA (Session 07) | This inventory | Match |
|---|---|---|---|
| **Unconditional indexable launch pages** | **22** | **22** | ✔ |
| **Conditional launch pages** | **2** | **2** | ✔ |
| **Non-indexable launch routes** | **5** | **5** | ✔ |
| Total routes if the manufacturing gate clears | 29 | 29 | ✔ |
| Total routes if it does not | 27 | 27 | ✔ |

**Brief coverage: 22 of 22 unconditional assets have a brief, and 2 of 2 conditional assets have a brief.**

17 page briefs in `docs/09-content-pages/briefs/` · 3 unconditional editorial briefs in `docs/05-content/editorial-briefs/` · 2 research briefs in `docs/05-content/research-briefs/` · 1 conditional page brief and 1 conditional editorial brief.

**Correction pass (2026-09-01):** asset 17 was replaced. The withdrawn article *"Which sources AI systems actually cite when recommending a supplier"* would have reproduced the AI Visibility Baseline dataset at a second URL; its brief was **deleted**, not left alongside the replacement. **Counts are unchanged: 22 unconditional, 2 conditional, exactly 3 unconditional editorial articles, exactly 1 of which is primarily AI Search.**

**Legend.**
*Evidence status:* **READY** — the evidence exists now · **SEQUENCED** — exists but depends on an earlier stage · **OWNER** — requires owner input · **CONDITIONAL** — requires a gate.
*Priority:* the production stage from `CONTENT_STRATEGY.md` §15.

---

## 1. Unconditional launch content — 22 assets

### 1.1 Homepage (1)

| # | URL | Type | Content job | Target intent | Evidence status | Brief | Owner input | Dependency | CTA role | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `/` | Homepage | Conversion support · proof · routing | **Brand / entity only.** Not a service-term target | **OWNER** | `briefs/homepage.md` | Company facts · people · the claims decision | `/how-it-works`, both research entries | PRIMARY; secondary PROOF | **7** |

### 1.2 Commercial (8)

| # | URL | Type | Content job | Target intent | Evidence status | Brief | Owner input | Dependency | CTA role | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| 2 | `/services` | Core proposition hub | Conversion support · buyer education | **CI** — the enquiry system itself; not a keyword target | SEQUENCED | `briefs/services.md` | Delivery process | `/how-it-works` | PRIMARY; PROOF | **5** |
| 3 | `/seo` | Capability | Search demand capture | **CI/T** — `b2b seo`, `enterprise seo` | SEQUENCED | `briefs/seo.md` | — | `/services`, own-site diagnostic | PRIMARY; PROOF | 5 |
| 4 | `/ai-seo` | Capability | Search demand capture · authority | **CI/T** — `ai seo agency` + city variants | SEQUENCED | `briefs/ai-seo.md` | Systems funded for measurement | AI baseline research entry | PRIMARY; PROOF | 5 |
| 5 | `/google-ads` | Capability (demand source) | Search demand capture | **T** — Google Ads provider intent | SEQUENCED | `briefs/google-ads.md` | — | `/services` | PRIMARY; PROOF | 5 |
| 6 | `/social-media-ads` | Capability (demand source) | Search demand capture | **T** — paid social provider intent | SEQUENCED | `briefs/social-media-ads.md` | — | `/services` | PRIMARY; PROOF | 5 |
| 7 | `/lead-generation` | Capability (demand source) | Search demand capture | **T/CI** — `lead generation agency` | SEQUENCED | `briefs/lead-generation.md` | — | `/services` | PRIMARY; PROOF | 5 |
| 8 | `/conversion-optimization` | Capability | Search demand capture (residual) | **CI** — `cro agency india` residual only | SEQUENCED | `briefs/conversion-optimization.md` | — | Problem page, own-site diagnostic | PRIMARY; PROOF | 5 |
| 9 | `/pricing` | Commercial + cost transparency | Search demand capture · conversion support | **CI** — `seo services cost`, `how much does SEO cost in Pune` | **OWNER** | `briefs/pricing.md` | **Confirmed prices — BLOCKING** | `/how-it-works` | PRIMARY (booking emphasised); PROOF | **6** |

### 1.3 Problem (1)

| # | URL | Type | Content job | Target intent | Evidence status | Brief | Owner input | Dependency | CTA role | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| 10 | `/problems/traffic-but-no-enquiries` | Problem | Search demand capture · buyer education | **PA** — three symptom families, consolidated | SEQUENCED | `briefs/problems-traffic-but-no-enquiries.md` | — | `/how-it-works`, own-site diagnostic | **DIAGNOSTIC**; LOW-COMMITMENT then PRIMARY | **4** |

### 1.4 Proof (4)

| # | URL | Type | Content job | Target intent | Evidence status | Brief | Owner input | Dependency | CTA role | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| 11 | `/how-it-works` | Published methodology | Proof · authority · conversion support | **CI/I** — not a keyword target | **OWNER** | `briefs/how-it-works.md` | **The real delivery process — BLOCKING** | Nothing. **It is the root dependency** | PROOF; PRIMARY at the end | **2** |
| 12 | `/research` | Research index | Proof · citation value | **I** — not a keyword target | SEQUENCED | `briefs/research-hub.md` | — | At least one entry existing | **RESEARCH**; PROOF | **9** |
| 13 | `/research/{ai-visibility-baseline}` | Original research | Proof · citation value · authority | **I** — measurement method and results | **READY** | `research-briefs/ai-visibility-baseline.md` | — | **None. Publishable now** | RESEARCH; no sticky CTA | **3** |
| 14 | `/research/{own-site-enquiry-diagnostic}` | Original research | Proof · citation value | **I** — the diagnostic protocol applied to itself | **SEQUENCED** | `research-briefs/own-site-enquiry-diagnostic.md` | — | **Blocked until the fixes are shipped** | RESEARCH; no sticky CTA | **3** |

### 1.5 Editorial (4)

| # | URL | Type | Content job | Target intent | Evidence status | Brief | Owner input | Dependency | CTA role | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| 15 | `/blog` | Editorial index | Navigation · authority | **N/I** — not a keyword target | SEQUENCED | `briefs/blog-index.md` | — | The three articles existing | LOW-COMMITMENT | **9** |
| 16 | `/blog/{ai-search-guide-1}` | Article | Search demand capture · buyer education | **PA/I** — `how to appear in chatgpt` (8 clean variants) | **READY** | `editorial-briefs/article-1-appear-in-chatgpt.md` | — | AI baseline entry | LOW-COMMITMENT | **8** |
| 17 | `/blog/{enquiry-measurement-article}` | Article | **Buyer education · conversion support** | **PA/I** — search → qualified enquiry → measurement. **PRIMARY SEARCH TARGET = UNVALIDATED** | SEQUENCED | `editorial-briefs/article-2-is-seo-producing-enquiries.md` | — | `/how-it-works`, own-site diagnostic | LOW-COMMITMENT | 8 |
| 18 | `/blog/{enquiry-conversion-article}` | Article | Buyer education · conversion support | **PA** — a narrower verification sub-intent. **Primary phrasing RESEARCH REQUIRED** | SEQUENCED | `editorial-briefs/article-3-losing-enquiries.md` | — | Problem page, own-site diagnostic | LOW-COMMITMENT | 8 |

### 1.6 Company and conversion (4)

| # | URL | Type | Content job | Target intent | Evidence status | Brief | Owner input | Dependency | CTA role | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| 19 | `/about` | Entity / trust | Proof · conversion support | **N/I** — brand and people | **OWNER** | `briefs/about.md` | **People and company facts — BLOCKING** | — | PROOF; PRIMARY | **7** |
| 20 | `/contact` | Conversion — form surface | Conversion | **T/N** | **OWNER** | `briefs/contact.md` | **Complete NAP — BLOCKING** | Working backend | PRIMARY only | **7** |
| 21 | `/schedule-call` | Conversion — booking surface | Conversion | **T** | SEQUENCED | `briefs/schedule-call.md` | Business hours, responder | Working booking tool | PRIMARY only | 7 |
| 22 | `/faq` | Support / entity | Buyer education · conversion support | **I** — long-tail questions, no single family | **OWNER** | `briefs/faq.md` | Scope, prices, process | `/how-it-works`, `/pricing` | LOW-COMMITMENT | 7 |

---

## 2. Conditional launch content — 2 assets

**LAUNCH — CONDITIONAL.** Ships only if the **manufacturing validation gate** clears before content freeze: (1) absolute volume verification with a real keyword tool, (2) a healthcare SERP comparison on the same basis, (3) one completed industrial engagement with a publishable result *(owner action)*. If it does not clear, **both move to PHASE 2 together and no other part of this inventory changes.**

| # | URL | Type | Content job | Target intent | Evidence status | Brief | Owner input | Dependency | CTA role | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| C1 | `/industries/manufacturing` | Vertical beachhead | Search demand capture · conversion support | **T** — `seo agency for manufacturing companies` (8 variants, 6 provider-seeking, zero contamination) | **CONDITIONAL** | `briefs/industries-manufacturing.md` | **The gate** | `/services`, `/how-it-works` | PRIMARY, phone/WhatsApp prominent; PROOF | C |
| C2 | `/blog/{industrial-b2b-article}` | Article | Buyer education · authority | **I/PA** — industrial buyer search behaviour and RFQ paths | **CONDITIONAL** | `editorial-briefs/article-4-conditional-industrial-rfq.md` | **The gate** | **C1. Orphaned without it** | LOW-COMMITMENT → C1 | C |

**Constraints on both:** neither may frame MappedSkills as a manufacturing agency · neither may imply a manufacturing case study exists · **every internal link into this pair must be removable in a single change.**

---

## 3. Non-indexable launch routes — 5

No content brief is required; each has a content requirement.

| URL | Content requirement at launch |
|---|---|
| `/work` | **No content.** `noindex`, excluded from the sitemap, absent from navigation until ≥1 permissioned case study exists. **No "coming soon" placeholder** |
| `/thank-you` | Confirmation content, what happens next, and a realistic expectation **with no numeric SLA**. Next-best content only — **no second ask**. `noindex` |
| `/privacy-policy` | Accurate policy reflecting what actually runs. **Indexability is an open IA decision** |
| `/terms` | Accurate. `noindex` |
| 404 | Recovery content generated from **live** routes. **Must stop hard-coding three blog slugs that currently return 404** |

---

## 4. Publication priority — the launch sequence

Derived in `CONTENT_STRATEGY.md` §15. Numbers are stages, not dates.

| Stage | Assets |
|---|---|
| **0** | Owner inputs (`OWNER_INPUT_REGISTER.md`) · off-site listings and reviews programme *(parallel, blocked by nothing)* |
| **1** | Ship the conversion and measurement fixes *(technical, not content — but it gates asset 14 and every outcome claim)* |
| **2** | `/how-it-works` (11) |
| **3** | `/research/{ai-visibility-baseline}` (13) · `/research/{own-site-enquiry-diagnostic}` (14) |
| **4** | `/problems/traffic-but-no-enquiries` (10) |
| **5** | `/services` (2), then `/seo` (3), `/ai-seo` (4), `/conversion-optimization` (8), `/lead-generation` (7), `/google-ads` (5), `/social-media-ads` (6) |
| **6** | `/pricing` (9) |
| **7** | `/about` (19), `/contact` (20), `/schedule-call` (21), `/faq` (22), `/` (1) |
| **8** | Articles 16, 17, 18 |
| **9** | `/blog` (15), `/research` (12) — indexes describe what exists |
| **C** | C1 and C2, at stages 5 and 8, **only if the gate clears** |

---

## 5. What this inventory deliberately does not contain

- **No new indexable URL.** Adding one would change the approved architecture.
- **No PHASE 2 or FUTURE asset.** Those remain as classified in `PAGE_INVENTORY.md` §3–§4.
- **No fourth unconditional article** invented to cover the conditional slot. Whether a PHASE 2 article is promoted if the gate does not clear is an orchestrator decision.
- **No publication dates.** They depend on owner inputs and on technical prerequisites that do not exist yet.
- **No word counts, no volume figures, no traffic expectations.**
