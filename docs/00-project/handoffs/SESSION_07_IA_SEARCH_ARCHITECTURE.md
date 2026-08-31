# Claude Session Handoff — Session 07

## Session
- **Session ID:** 07 — Website IA, Search Architecture & Page System
- **Date:** 2026-08-31
- **Model:** Claude Opus 5 (high effort)
- **Branch:** `test_branch`
- **Role:** Website Information Architect · Technical SEO Architect · Search Strategist · Conversion Architect · Content-System Strategist
- **Purpose:** Determine the complete website architecture required to deliver the approved business strategy. **Architecture only — no design, no copy, no implementation.**

---

## 0. Correction pass — 2026-08-31

A narrow orchestrator correction pass was applied within this same session, after the initial architecture audit. **The architecture was not reopened, no research was performed, and no page was added.** Four corrections:

1. **Manufacturing reclassified LAUNCH — CONDITIONAL.** `/industries/manufacturing` and its supporting article are architected now but ship only if the manufacturing validation gate clears before content freeze. Otherwise both move to PHASE 2 with no other change. Launch counts now separate unconditional from conditional.
2. **The mandatory proof checkpoint is removed.** Commercial pages convert directly; proof is prominently available and integrated in context, never a required navigational step. Buyer intent determines evaluation depth.
3. **Primary conversion redefined as qualified enquiry creation**, mechanism-independent — reachable through a qualified form submission **or** a qualified meeting booking. Analytics distinguishes `lead_form_submitted` from `meeting_booked`; both roll into one business-level measure.
4. **IA directory cleanup.** `docs/06-information-architecture/` contained only a two-line placeholder README from scaffold commit `566d3e3` and no substantive artifact; it was removed under explicit owner authorisation. **The project standardises on `docs/06-IA/`.**

Everything else — commercial-page decisions, problem-page decisions, geographic strategy, the AI-search cluster, research/proof architecture, schema recommendations, and all current→future URL decisions — is unchanged.

---

## 1. Status

**PROPOSED — NOT APPROVED.** Claude does not approve information architecture. **Quality Gate 5 (Information Architecture) is now open** and awaits orchestrator and owner review. No later gate is approached.

The approved business strategy (`DEC-005`/`DEC-006`) was **not reopened**. Every architecture decision below derives from it.

---

## 2. Architecture recommendation in five decisions

1. **The site is organised around one outcome, not a service menu.** `/services` is repositioned from an agency catalogue into the page that *is* the proposition. Capability pages sit beneath it as demand-source and delivery pages.
2. **Existing flat URLs are preserved wherever they carry equity.** Five commercial pages are already 308 targets; moving them to `/services/*` would create two-hop chains for no search benefit. Directory prefixes (`/problems/`, `/industries/`, `/research/`) are introduced only for genuinely new, scalable families.
3. **Launch scope is deliberately small — 22 unconditional indexable pages, plus 2 conditional.** The binding constraint is proof, not page count. Conditional pages are counted separately and never folded into the launch total.
4. **Search landing pages and company positioning are architecturally separate** (`DEC-008`). `/seo` and `/ai-seo` exist and target their query families; neither is the company's category.
5. **The proof deficit is designed into the architecture.** `/research` launches with MappedSkills' own published diagnostics; `/how-it-works` becomes the published methodology including what cannot be attributed; **`/work` exists as a route but is not indexable until at least one real case study exists.**

---

## 3. Proposed launch inventory

| Figure | Count |
|---|---|
| **Unconditional indexable launch pages** | **22** |
| **Conditional launch pages** | **2** |
| **Non-indexable launch routes** | **5** |
| **Total routes if the manufacturing gate clears** | **29** |
| Total routes if it does not | 27 |

Of the 22 unconditional pages, 13 already exist; 9 are new. Both conditional pages are new.

| Group | Count | Pages |
|---|---|---|
| Homepage | 1 | `/` |
| Commercial | 8 | `/services` · `/seo` · `/ai-seo`\* · `/google-ads` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · `/pricing` |
| Problem | 1 | `/problems/traffic-but-no-enquiries`\* |
| Proof | 4 | `/how-it-works` · `/research`\* · 2 research entries\* |
| Editorial | 4 | `/blog` + 3 articles\* |
| Company / conversion | 4 | `/about` · `/contact` (form surface) · `/schedule-call` (booking surface) · `/faq` |
| **CONDITIONAL** | **2** | `/industries/manufacturing`\* · `/blog/{industrial-b2b-article}`\* |
| Non-indexable | 5 | `/work` (held back) · `/thank-you` · `/privacy-policy` · `/terms` · 404 |

\* new.

**PHASE 2:** 11 pages (13 if the manufacturing gate does not clear). **FUTURE:** 8. **DO NOT BUILD:** 17 named rejections.

---

## 4. Key architectural determinations

| Question | Determination |
|---|---|
| **Homepage role** | Entity anchor and outcome proposition. **Brand-query surface only — it must not rank for service terms**, or it cannibalises every capability page. Its current title (`Performance Marketing Agency \| 300%+ ROI`) violates `DEC-005` and `DEC-007` |
| **Commercial pages** | 8 + `/pricing`. **Analytics/attribution gets no page** (no query family exists anywhere in Session 03). **Follow-up automation gets no page** (`how to improve lead response time` returns **(NONE)**) |
| **Problem pages** | **One at launch.** Three lead-symptom families consolidated into `/problems/traffic-but-no-enquiries` — the most winnable SERP observed in the programme. Two more are PHASE 2, evidence-gated |
| **AI Search** | A four-surface minimum cluster: one commercial page (`/ai-seo`), two buyer-question guides, one published baseline, plus a PHASE 2 technical guide + checker. **No page per acronym. No score, ever** |
| **Manufacturing** | **One indexable page at `/industries/manufacturing`, classified LAUNCH — CONDITIONAL.** Architected now; ships only if the validation gate clears before content freeze, otherwise PHASE 2 alongside its supporting article. Not a cluster, not a grid, **no `/industries` hub until a second vertical exists.** Remains **candidate beachhead #1, not an approved specialisation** — search evidence is not a business decision |
| **Geography** | **No location pages of any kind.** Local demand is decided by a Local Pack and by local listing data — Google Business Profile, reviews and complete NAP. Replaced with entity architecture, not page architecture |
| **`/blog` vs `/insights` vs `/research`** | **Hybrid.** `/blog` retained (existing 308 target; the best-implemented SEO surface in the codebase). `/research` added as a distinct family because the job, cadence, schema and evidence standard differ |
| **Tools** | **Zero at launch.** `/tools/` namespace reserved. AI crawler checker is PHASE 2; an AI visibility checker is DO NOT BUILD as an indexable asset |
| **Navigation** | Six primary items + CTA. `/services` becomes reachable from the header (it currently is not); `/about` promoted from footer-only; **"Case Studies" removed until case studies exist** |
| **Primary conversion** | **Qualified enquiry creation** — outcome-defined and **mechanism-independent.** Two surfaces: a qualified form submission **or** a qualified meeting booking, both capturing source, landing context, interest and qualification data. Analytics distinguishes `lead_form_submitted` from `meeting_booked`; both roll into one business-level measure. Model-agnostic, so neither the free/paid/hybrid entry decision nor a change of mechanism forces re-architecture |
| **Proof in the funnel** | **Prominently available and integrated in context on commercial pages — never a required navigational step.** Commercial page → qualified enquiry is the default path; commercial page → method/research → enquiry is available for evaluators who choose it. **Buyer intent determines evaluation depth** |

---

## 5. Current URL decisions

**32 routes and redirect rules covered. Every current route appears in `CURRENT_TO_FUTURE_URL_MAP.md`.**

| Action | Count |
|---|---|
| KEEP | 12 |
| REPOSITION | 9 |
| MERGE | **0** |
| REDIRECT | 11 (9 existing retained, 1 of those re-pointed; 2 new) |
| RETIRE / 410 | **0** |
| INVESTIGATE | 4 flags |

**Why nothing is merged or retired:** there is **no backlink, ranking, impression or traffic data for any URL on this site**, and no analytics in production. Every classification is made on intent, redirect history and strategic fit. Removing or consolidating an unmeasured URL would destroy value nobody can quantify. This is the largest limitation of the session.

**The one structural change:** `/portfolio/{slug}` consolidates into `/work/{slug}`, with the legacy `/results/:slug` rule **re-pointed directly** so no chain is created. Safe **only** because zero case studies are currently published — and **blocked** on enumerating the Contentful slug set.

---

## 6. Files created

- `docs/06-IA/WEBSITE_INFORMATION_ARCHITECTURE.md`
- `docs/06-IA/PAGE_INVENTORY.md`
- `docs/06-IA/PAGE_REASON_TO_EXIST_MATRIX.md`
- `docs/06-IA/CURRENT_TO_FUTURE_URL_MAP.md`
- `docs/06-IA/NAVIGATION_ARCHITECTURE.md`
- `docs/03-search/SEARCH_ARCHITECTURE.md`
- `docs/07-cro/FUNNEL_ARCHITECTURE.md`
- `docs/00-project/handoffs/SESSION_07_IA_SEARCH_ARCHITECTURE.md` (this file)

## 7. Files modified

- `docs/00-project/CURRENT_STATE.md`

**Not modified:** all frozen business strategy documents · all research artifacts (`docs/02-research/`, `docs/03-search/` existing files, `docs/04-ai-visibility/`) · `docs/10-technical/` · `DECISION_LOG.md` · `QUALITY_GATES.md` · all application code, configuration and content.

## 7B. Files removed (correction pass)

- `docs/06-information-architecture/README.md` — and with it the now-empty `docs/06-information-architecture/` directory.

**Verified before removal:** the directory contained exactly one file, a 115-byte two-line placeholder README committed in the original scaffold commit `566d3e3`, with **no substantive artifact** and no reference from any code or configuration. Removal was explicitly authorised by the owner. **The project now standardises on `docs/06-IA/`, and only one IA directory exists.**

---

## 8. Evidence gathered

**None. No fresh research was performed.** Per brief §30, research is largely closed and fresh checks are permitted only where an architecture question cannot be answered from existing evidence. Every question was resolved from Sessions 01–06 artifacts:

- `/blog` vs `/insights` — decided on redirect-target and existing-implementation grounds.
- Whether a Pune page is warranted — answered by `SERP_RESEARCH.md` §2 and `AI_CITATION_RESEARCH.md` §3.
- Whether `seo` and `ai seo` are materially different intent — answered by `SERP_RESEARCH.md` §1 vs §2.
- Whether the three lead-symptom families are one intent — answered by `KEYWORD_UNIVERSE.md` §6.

**No search volume, keyword difficulty, ranking, traffic, backlink or AI-citation figure was gathered or estimated, and none appears in any Session 07 artifact.**

## 9. Tests actually run

**None.** No build, no lint, no test, no browser session, no HTTP request, no crawl. No application file was read for modification and none was changed.

---

## 10. Method limitations

1. **No backlink, ranking, impression or traffic data exists for any URL.** No Search Console, no backlink tool, **no analytics in production**. Every KEEP/MERGE/REDIRECT judgement is made without measured equity.
2. **Absolute search volume is UNKNOWN everywhere**, as in every prior session.
3. **The `/blog/{slug}` and `/portfolio/{slug}` slug sets are UNKNOWN.** Production publishes zero of each; whether the cause is missing Contentful credentials or an empty space is unresolved.
4. **Host-level redirects are UNKNOWN.** No `.htaccess` is committed.
5. **No international lens.** Every search judgement inherits Session 03's Pune-locked egress.
6. **AI Overview and AI-answer evidence is a single-day, single-location, signed-out sample**, with two of six charter systems never testable.

---

## 11. Biggest SEO migration risks

1. **No baseline exists to detect a regression against.** No analytics, no verified Search Console data. A traffic loss after launch would be invisible and unattributable. **Capture a baseline before anything changes.**
2. **Deleting `public/robots.txt` silently activates a site-wide `GPTBot`/`CCBot` block** from the inert `app/robots.ts` — an opt-out of OpenAI training with no code change and no review.
3. **The `/results/:slug` and `/portfolio/{slug}` slug sets are UNKNOWN**, and `mappers.ts` implements slug-variant tolerance that must be understood before URL generation changes. The `/work/{slug}` consolidation is blocked on this.
4. **Homepage title and H1 change** on the highest-equity URL, with no baseline — while the existing title carries a claim (`300%+ ROI`) that AI systems are actively redistributing, so leaving it is also a risk.
5. **Contentful fails silently.** Missing credentials produce HTTP 200 with an empty blog, empty case studies and a 15-URL sitemap, with no error and no build failure. A migration could ship exactly that.
6. **Host-level `.htaccess` rules are unknown** and could create chains or loops with application redirects; `www` currently returns HTTP 200 rather than redirecting, doubling every URL.
7. **Six of the nine legacy 308 sources point at pages being repositioned.** The URLs do not move, but the content behind them changes materially and simultaneously — and their backlink profiles are UNKNOWN.

---

## 12. Restrictions future sessions must respect

1. **Do not reopen `DEC-005`.** The business direction is frozen.
2. **Capabilities are not pages.** Do not add a page for a capability without a named query family and a reason to exist.
3. **Do not build any page in the DO NOT BUILD list** (`PAGE_INVENTORY.md` §5) — 17 named rejections, each with its evidence.
4. **The homepage must not rank for service terms** and must carry no technique category.
5. **`/work` stays `noindex` and out of navigation and the sitemap** until a permissioned case study exists.
5b. **Do not ship `/industries/manufacturing` or its supporting article** unless the manufacturing validation gate has cleared before content freeze. **Do not describe MappedSkills as a manufacturing agency anywhere**, and do not write any company-level page as though the beachhead were settled.
5c. **Do not make proof a required step** between any commercial page and the conversion. Proof is integrated and prominently linked; the visitor decides whether to take it.
5d. **Do not require one conversion mechanism.** A qualified meeting booking is a qualified enquiry when it carries the same data as a form submission.
6. **No location pages, no city grid, no `/industries` grid, no sub-vertical pages, no page per AI acronym or platform.**
7. **No AI Visibility Score** as a page, tool, product or deliverable.
8. **Do not retire or merge any current URL** until backlink and Search Console data exist.
9. **Do not create redirect chains.** Re-point legacy rules directly.
10. **Problem pages must be materially useful without hiring anyone.** A service pitch behind a question-shaped headline is a doorway page.
11. **Do not pre-empt the entry-offer decision** with a self-serve diagnostic tool or an entry-model URL.
12. **Re-verify fast-changing guidance at implementation** (Project Rule 19) — FAQ rich-result eligibility, AI-crawler tokens, structured-data requirements.
13. **No page may promise revenue, guaranteed rankings, guaranteed AI citations or guaranteed enquiry counts**, or reuse "300%+ ROI", "₹100Cr+", "₹10Cr+" (`DEC-007`).

---

## 13. Unresolved architecture decisions

1. **`/work/{slug}` consolidation** — requires the full Contentful case-study slug set.
2. **The entry-offer model (free / paid / hybrid)** — blocks the diagnostic tool; the funnel is model-agnostic so nothing else waits on it.
3. **Whether `/social-media-ads` is eventually merged** — needs backlink data.
4. **Whether `/privacy-policy` becomes indexable.**
5. **Whether blog categories get real archive URLs** — do not build both a parameter and a path.
6. **The manufacturing validation gate** — volume verification, a healthcare SERP comparison, and one publishable industrial result. **This now determines whether the two conditional pages ship at launch or move to PHASE 2**, and it needs keyword tooling that has never been available plus owner action.
6b. **If the gate does not clear: whether the editorial stream launches with 3 articles or a PHASE 2 article is promoted** to hold the floor at 4. A scope decision, not an architecture decision.
6c. **Whether the booking tool can carry source, landing context, interest and qualification data.** The two-surface conversion model depends on this being solvable; if it is not, booking degrades to a secondary conversion.
7. **FAQ schema eligibility** — re-verify at implementation.

---

## 14. Next logical phase

**Quality Gate 5 review**, then — on approval — **CRO / funnel specification (Gate 6)**: exactly how an unknown visitor becomes a measurable qualified enquiry. Visitor journeys, CTA hierarchy, the two conversion surfaces and how qualification data is split between them, form strategy, and trust architecture — building on `FUNNEL_ARCHITECTURE.md`.

Content architecture (Gate 7) follows, building on `SEARCH_ARCHITECTURE.md` §5.

**Two workstreams that do not depend on the gate and should not wait for it:**
1. **The off-site listings, profiles and reviews programme** — Clutch, Semrush Agency Partners, GoodFirms, Google Business Profile. Directory sources appeared in **15 of 28** unbranded AI runs and gate the category SERPs and the Local Pack simultaneously. **Roughly half of what the strategy needs from "search" is not a page and cannot be built by this project.**
2. **Fixing the conversion and measurement layer** — a working form, a working booking path, analytics, enquiry-source capture, and `/thank-you` wired up. This is a launch prerequisite, and it is also the first proof asset.

## 15. Next session should read

1. `docs/01-business/BUSINESS_STRATEGY.md`
2. `docs/00-project/CURRENT_STATE.md`
3. `docs/06-IA/WEBSITE_INFORMATION_ARCHITECTURE.md`
4. `docs/06-IA/PAGE_INVENTORY.md` and `PAGE_REASON_TO_EXIST_MATRIX.md`
5. `docs/03-search/SEARCH_ARCHITECTURE.md` and `docs/07-cro/FUNNEL_ARCHITECTURE.md`
6. This handoff — §12 in particular

## 16. Stop condition

**Session 07 stops here.** The architecture is proposed and Quality Gate 5 is open.

**Do not begin CRO/funnel specification, content architecture, creative direction, UX, UI, copy or development work.** **No form, booking flow, field set or CTA copy was designed in the correction pass.** **No page was designed, no copy was written, and no code was changed.** The next phase requires an explicit brief from the orchestrator.
