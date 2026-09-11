# Page Structure Matrix — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Reconciles against:** `docs/06-IA/PAGE_INVENTORY.md` §0 (approved, `DEC-010`) and `docs/09-content-pages/PAGE_COPY_INDEX.md` §0 (approved, `DEC-014`).

**No route was added, removed, renamed or reclassified in this session.**

---

## 0. Route reconciliation

| Figure | Approved IA | Approved copy index | This matrix | Match |
|---|---|---|---|---|
| Unconditional indexable launch pages | **22** | **22** | **22** | ✔ |
| Conditional launch pages | **2** | **2** | **2** | ✔ |
| Non-indexable launch routes | **5** | **5** | **5** | ✔ |
| Total routes if the manufacturing gate clears | 29 | 29 | **29** | ✔ |
| Total if it does not | 27 | 27 | **27** | ✔ |

**Column key.** **Evidence level** = the apparatus state that governs the page (`17` §3). **Figure** = the figure opportunity, with Tier. **Owner blocker** and **Technical blocker** name what is missing, not what is assumed. **Status** is the approved copy status, carried unchanged.

---

## 1. Unconditional indexable launch pages (22)

### 1.1 Homepage

| Route | `/` |
|---|---|
| **Page type** | Homepage |
| **Primary intent** | N — brand and entity. **Targets no service or category term** |
| **First-screen job** | The standard the firm accepts. **Four elements, no fifth — the dated item does not render at launch** *(revised 2026-09-02, `24`)* |
| **Required sections** | Hero · recognition · mechanism · accountability boundary · capability routing · what can be checked · fit · action |
| **Optional sections** | None. All eight are approved and load-bearing |
| **Primary CTA** | PRIMARY, both surfaces |
| **Secondary CTA** | PROOF → `/how-it-works` |
| **Evidence level** | **ABSENT on the first screen** *(revised 2026-09-02 — the permitted exception is unspent at launch)* · ADJACENT-SECONDARY at the boundary · IMMEDIATE at Block 6 |
| **Figure** | **F1 (T1)** full weight at Block 3; **F4 (T1)** as a state on it at Block 4. F16 (T3) optional |
| **Owner blocker** | Team/people · response owner and hours · published phone · `DEC-007` decision (metadata) |
| **Technical blocker** | Own-site fixes (Block 6 link) · analytics |
| **Mobile note** | Four elements. The run has a genuine vertical form; the boundary stays expanded |
| **Status** | **PARTIALLY BLOCKED.** H1 approved as copy |

### 1.2 Commercial (8)

| # | Route | Type | Intent | First-screen job | Required | Optional | Primary CTA | Secondary | Evidence | Figure | Owner blocker | Technical | Mobile note | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2 | `/services` | Hub | CI — **no query target, deliberately** | The outcome as the page's subject | Outcome · three parts · boundary · capability routing · expansion · what we do not do · scope honesty · fit · action | — | PRIMARY, both | PROOF; CONTEXTUAL → problem page | ABSENT above fold · EXPANDABLE mid · ADJACENT at boundary | **F1 (T1)** joins marked; F14 (T3) plain list | None for copy | — | Routing reachable within 1–2 screens | **FINAL-CANDIDATE**, sequence-blocked behind `/how-it-works` |
| 3 | `/seo` | Capability | CI/T — `b2b seo`, `enterprise seo` | Confirm SEO, bridge to enquiries | Moves 1,2,3,4,5,6,8,9 | 7 compressed | PRIMARY, both | PROOF; CONTEXTUAL → problem page | ABSENT above fold · EXPANDABLE mid · **horizon ADJACENT, always open** | F1 segment; **F11 (T3) — a table is sufficient** | None | — | Confirmation + bridge must fit first screen | **FINAL-CANDIDATE** |
| 4 | `/ai-seo` | Capability | CI/T — `ai seo agency` | Confirm AI search, bridge | **All nine moves** | — | PRIMARY, both | PROOF → the baseline entry | ABSENT above fold · **evidence section early** · ADJACENT at boundary | **F3 (T1) central**; F12 (T3) **already tabular — no figure needed** | None | Two re-verifications before publication | Six-system view stacks or scroll-contains | **FINAL-CANDIDATE** · one `[VALIDATION REQUIRED]` claim · **highest-risk page** |
| 5 | `/google-ads` | Capability | T — paid-search provider | Confirm Google Ads, bridge | Moves 1,2,4,5,6,9 | 3 compressed; 7 minimal | PRIMARY, both | PROOF | ABSENT above fold · **boundary earliest of the six** | **F9 (T2)** fee/spend/measurement | **Fee/spend separation** · `DEC-007` (title) | — | Boundary figure linearises | **PARTIALLY BLOCKED** |
| 6 | `/social-media-ads` | Capability | T — paid-social provider | Confirm paid social, bridge | Moves 1,2,4,5,9 | 3,7,8 minimal | PRIMARY, both | PROOF | ABSENT above fold · ADJACENT at boundary | **NONE — no figure and no run** *(revised 2026-09-02, `22`)* | None | — | **Shortest page. Brevity is the design** | **FINAL-CANDIDATE** |
| 7 | `/lead-generation` | Capability | T/CI — `lead generation agency` | Confirm, bridge to the enquiry unit | Moves 1,2,3,5,6,8,9 | 4 compressed | PRIMARY, both | PROOF; CONTEXTUAL → problem page | ABSENT above fold · definition before boundary | **F5 (T2) central** — a promise-boundary, **never a taxonomy or a score** | None | — | Definition figure stacks | **FINAL-CANDIDATE** |
| 8 | `/conversion-optimization` | Capability | CI — residual only | Open on **the loss**, not the discipline | Moves 1,2,3,5,6,7,9 | 4 compressed | PRIMARY, both | PROOF → own-site diagnostic; CONTEXTUAL → problem page | ABSENT above fold · evidence beside the claim | **F2 (T1) shallow, early** — visibly the same object as the problem page's | None | Own-diagnostic link | Four-zone figure vertical | **FINAL-CANDIDATE** |
| 9 | `/pricing` | Commercial | CI→T — cost intent | What is bought, then the horizon, then the price | What is bought · horizon · price · what moves it · what it needs from you · who it is not for · hardest objection · action | — | PRIMARY, **booking emphasised** | PROOF | **DEFERRED entirely** to "what moves the number" | **F8 (T2)** factor matrix — **not a calculator**; F15 (T3) | **Prices, inclusions, minimum, spend/fee — BLOCKING** · entry-offer model | — | Price is the largest element on its own screen | **PARTIALLY BLOCKED** |

### 1.3 Problem (1)

| Route | `/problems/traffic-but-no-enquiries` |
|---|---|
| **Page type** | Problem |
| **Primary intent** | PA — three symptom families consolidated |
| **First-screen job** | Name the symptom; promise runnable checks. **No CTA, no apparatus, no sticky** |
| **Required sections** | Symptom validation · the four causes · the five checks · what each finding means · the worked example · commercial transition |
| **Optional sections** | **None.** *(Revised 2026-09-02, H5: the outcome-recording affordance is **NOT APPROVED for launch** — Phase 2 / research-required only. The page is complete as static content and must print and save cleanly.)* |
| **Primary CTA** | DIAGNOSTIC, below the fold, after an answer exists |
| **Secondary CTA** | LOW-COMMITMENT, then PRIMARY at the very end |
| **Evidence level** | ABSENT at the opening · ADJACENT-SECONDARY on each observable outcome |
| **Figure** | **F2 (T1)** full depth · **F6 (T2)** the five checks as an instrument |
| **Owner blocker** | Entry-offer model — **CTA wording only** · a named cadence owner at publication |
| **Technical blocker** | Own-site fixes (the research link only; the finding stands either way) |
| **Mobile note** | Four causes vertical; checks linear, not an accordion |
| **Status** | **FINAL-CANDIDATE.** **No owner input blocks this page** |

### 1.4 Proof (4)

| # | Route | Type | Intent | First-screen job | Required | Primary CTA | Evidence | Figure | Owner blocker | Technical | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | `/how-it-works` | Methodology | CI/I — not a keyword target | State that the page exists to be checked | Diagnostic argument · **stages [BLOCKED]** · what is measured · what is not · **what cannot be attributed** · human judgement · where capabilities sit · what the client provides · **after an enquiry [BLOCKED]** · uncertainty · action last | **PROOF**; PRIMARY at end only. **No sticky (B16)** | **IMMEDIATE throughout** | **F1 (T1)** · **F4 (T1)** full · **F17 BLOCKED — must not be designed** | **The real delivery process — BLOCKING** · people per stage · response ownership | — | **BLOCKED** |
| 12 | `/research` | Index | I — not a keyword target | The standard, then the entries | Standard · what is and is not research here · entries · how to cite · what this is not yet | RESEARCH. **No sticky** | **IMMEDIATE on every card** | **F10 (T2)** — card image is a crop of the actual figure | Named authorship · which entries publish | — | **CONDITIONAL** |
| 13 | `/research/{ai-visibility-baseline}` | Research | I — method and results | The question and why it was asked | Question · method · findings · interpretation, labelled · limitations · commercial relevance, last | RESEARCH. **No sticky** | **IMMEDIATE** | **F3 (T1) canonical, full depth** | Named authorship | — | **NOT DRAFTED.** Data **READY** — needs no owner input or client permission |
| 14 | `/research/{own-site-enquiry-diagnostic}` | Research | I — the diagnostic applied to itself | Same | Same | RESEARCH. **No sticky** | **IMMEDIATE** | **F7 (T2)** the intervention record — **a state pair, never a metric pair** | Named authorship | **Fixes shipped — BLOCKING** | **NOT DRAFTED** |

### 1.5 Editorial (4)

| # | Route | Type | Intent | First-screen job | Primary CTA | Evidence | Owner blocker | Status |
|---|---|---|---|---|---|---|---|---|
| 15 | `/blog` | Index | N/I — not a keyword target | What is written about here | LOW-COMMITMENT. **No sticky** | Byline on each card | Named authorship | **CONDITIONAL** · **pagination required before the stream scales** |
| 16 | `/blog/{ai-search-guide-1}` | Article | PA/I — `how to appear in chatgpt` | The article's own opening. **No CTA before the answer** | LOW-COMMITMENT after the answer | **EXPANDABLE**, byline IMMEDIATE | Named authorship | **NOT DRAFTED** |
| 17 | `/blog/{enquiry-measurement-article}` | Article | PA/I — **PRIMARY SEARCH TARGET = UNVALIDATED** | Same | Same | Same | Named authorship · the validation check | **NOT DRAFTED** |
| 18 | `/blog/{enquiry-conversion-article}` | Article | PA — **primary phrasing RESEARCH REQUIRED** | Same | Same | Same | Named authorship | **NOT DRAFTED** |

### 1.6 Company and conversion (4)

| # | Route | Type | Intent | First-screen job | Required | Primary CTA | Evidence | Owner blocker | Technical | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 19 | `/about` | Entity | N/I — brand and people | Who we are and what we can actually show you | Why the firm exists · accountability · how we work · **people [BLOCKED]** · what you can check · **company facts [BLOCKED]** · who it is for · where the firm is today | PROOF; PRIMARY secondary | **ADJACENT-SECONDARY** | **People and company facts — BLOCKING** | — | **PARTIALLY BLOCKED** |
| 20 | `/contact` | Conversion — form | T/N | The ask and the form. **Zero apparatus, zero proof** | Form · **what happens next [BLOCKED]** · direct contact · **where we are [BLOCKED]** · cross-link | PRIMARY only | **ABSENT** | **Complete NAP — BLOCKING** · response ownership · consent wording | **Endpoint, persistence, email — BLOCKING** | **PARTIALLY BLOCKED**, route launch-blocked |
| 21 | `/schedule-call` | Conversion — booking | T — brand navigational | What the call is, and the route into booking | **What the call is [BLOCKED]** · what you get either way · what it is not · what to have to hand · the other route | PRIMARY only | **ABSENT** | Who takes calls · length · availability · entry-offer model | **A working booking surface with runtime custom fields and a server-side webhook — BLOCKING** | **PARTIALLY BLOCKED**, route launch-blocked |
| 22 | `/faq` | Support | I — long-tail | Purpose, then the first group | Grouped questions · action | LOW-COMMITMENT; PRIMARY at end | **EXPANDABLE** — the one page where a collapsed accordion is permitted | Prices · spend/fee · minimum commitment | — | **PARTIALLY BLOCKED** · one `[VALIDATION REQUIRED]` claim |

---

## 2. Conditional launch pages (2)

**Ship only if the manufacturing validation gate clears before content freeze. If it does not, both move to PHASE 2 together and nothing else in the launch architecture changes.**

| # | Route | Type | Intent | First-screen job | Required | Primary CTA | Evidence | Figure | Blocker | Mobile note | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| C1 | `/industries/manufacturing` | Vertical beachhead — **candidate #1, not an approved specialisation** | T — `seo agency for manufacturing companies` | Confirm in this segment's terms, **phone/WhatsApp genuinely prominent** | Moves 1,2,3,4,5,8,9. **Move 5 must say plainly that no manufacturing result exists** | PRIMARY with **DIRECT elevated** | ABSENT above fold · ADJACENT at boundary | F1 segment emphasis | **The gate**, including one completed industrial engagement with a publishable result | Phone at top and bottom | **CONDITIONAL — NOT DRAFTED** |
| C2 | `/blog/{industrial-b2b-article}` | Article supporting C1 | I/PA | The article's own opening | Standard article | LOW-COMMITMENT | EXPANDABLE, byline IMMEDIATE | — | The gate. **Orphaned without C1** | — | **CONDITIONAL — NOT DRAFTED** |

**Reversibility requirement, binding on the UX:** every internal link to C1 is **removable in a single change**, the dropdown **must render correctly with five children**, and **no unconditional page may reference either page in a way that breaks if the gate does not clear.** The homepage explicitly does not link to C1.

---

## 3. Non-indexable launch routes (5)

| Route | Indexation | UX requirement | Blocker | Status |
|---|---|---|---|---|
| `/work` | **`noindex`**, out of the sitemap, out of navigation | **No content. No "coming soon" placeholder.** Enters navigation the day the first permissioned case study publishes | **Owner: publishable client evidence** | Held back |
| `/thank-you` | `noindex`, out of the sitemap | Confirmation · **what happens next [BLOCKED]** · urgent route · **exactly one useful link**. **No second ask. No response-time statement in any form** | Response ownership · phone · **reached only after confirmed durable persistence** | **PARTIALLY BLOCKED** |
| `/privacy-policy` | `noindex` today; **indexability is an open IA decision** | Accurate policy reflecting what actually runs | **Legal review, not copywriting** | **NOT DRAFTED** |
| `/terms` | `noindex` | Accurate | **Legal review** | **NOT DRAFTED** |
| 404 | `noindex` | **Recovery links generated from live routes.** Primary navigation, `/services`, the problem page, the two surfaces. No search box, no conversion push | — | **NOT DRAFTED** — a technical fix with a small copy component |

`/launch-checklist` remains environment-gated and is not a public route.
**`/industries` resolves to 404 at launch** — one child, no hub. An accepted, recorded condition.

---

## 4. Blocker summary across all routes

### 4.1 Owner blockers, by how many routes each affects

| Owner input | Routes affected |
|---|---|
| **Enquiry-response owner and business hours** | `/` · `/contact` · `/thank-you` · `/how-it-works` · `/schedule-call` — **and all must say the same thing** |
| **Team, people and authorship** | `/` · `/about` · `/how-it-works` · `/research` · all 4 research/article routes |
| **Published phone number** | Every page carrying a DIRECT CTA — **sitewide** |
| **The real delivery process** | `/how-it-works` (BLOCKING) · `/services` (sequence) · F17 (blocked from design) |
| **Complete NAP and legal entity name** | `/contact` · `/about` · the footer · all entity schema |
| **Prices, inclusions, minimum, spend/fee** | `/pricing` · `/faq` · `/google-ads` |
| **Entry-offer model** | The DIAGNOSTIC and PRIMARY **wording** on the problem page, `/schedule-call` and every commercial page. **No page structure depends on it** |
| **`DEC-007` production-claims decision** | The homepage title and metadata · `/google-ads` title · the sitewide default title |
| **Publishable client evidence** | `/work` indexation · every proof claim · `/pricing` credibility |
| **The manufacturing validation gate** | C1 and C2 only |

### 4.2 Technical blockers

| Prerequisite | Routes inert without it |
|---|---|
| **A server endpoint, durable persistence, transactional email** | `/contact` · `/thank-you` · the conversion on every page |
| **A working booking surface** with runtime custom fields and a server-side webhook | `/schedule-call` · the booking surface everywhere it is offered |
| **Analytics and a consent mechanism** | Every route's measurement. **No claim on any page is verifiable until this exists** |
| **Own-site fixes shipped** | `/research/{own-site-enquiry-diagnostic}` · the worked-example link on `/` and the problem page · F7 |
| **Pagination on `/blog`** | The editorial index, once it scales past the 100-item ceiling |
| **Visible breadcrumb UI** | 8 route families currently emitting schema with no visible breadcrumb |
| **Contentful slug inventory** | `/work/{slug}` consolidation |

### 4.3 Routes with no blocker at all

**Two, and they are the ones to build first:**

1. **`/problems/traffic-but-no-enquiries`** — copy is FINAL-CANDIDATE, no owner input blocks it, and it sits on the most winnable surface in the programme. Only the DIAGNOSTIC CTA wording waits on the entry-offer decision, and the page structure survives any answer.
2. **`/research/{ai-visibility-baseline}`** — the dataset is READY, needs no owner input and no client permission, and carries the site's sharpest differentiator. **It needs named authorship**, which is an owner input, but nothing else.

---

## 5. Figure coverage across the matrix

| Figure | Tier | Routes carrying it | Status |
|---|---|---|---|
| **F1 — the run** | 1 | **CORRECTED 2026-09-02 (`22_F1_USAGE_TAXONOMY.md`, binding): 6 unconditional routes, not 8.** **FULL** — `/` · `/services` · `/how-it-works`. **PARTIAL** — `/seo` · `/conversion-optimization` *(+`/industries/manufacturing`, conditional)*. **STATE** — `/` Block 4 · `/lead-generation`. **NONE** — `/ai-seo`, `/google-ads`, `/social-media-ads` and all others | **Unblocked. Build first** |
| **F2 — the four causes** | 1 | `/problems/…` full · `/conversion-optimization` shallow | **Unblocked** |
| **F3 — the four AI layers** | 1 | `/ai-seo` · `/research/{ai-visibility-baseline}` canonical | **Unblocked. Publishable today** |
| **F4 — what cannot be attributed** | 1 | `/how-it-works` full · `/` as a state on F1 | **Unblocked for categories. No invented proportion** |
| F5–F10 | 2 | Per `19` §3 | F7 blocked on the own-site fixes |
| F11–F16 | 3 | Prose or a plain table is sufficient initially | — |
| **F17 — the stage sequence** | **BLOCKED** | `/how-it-works` | **Must not be designed, sketched or prototyped** |
