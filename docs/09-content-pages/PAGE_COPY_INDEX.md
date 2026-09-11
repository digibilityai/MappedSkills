# Page Copy Index — APPROVED

**Session:** 11 — Page Copy Production · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **APPROVED — 2026-09-01. Quality Gate 9 (Page Copy Production) PASSED — see `DEC-014` in `DECISION_LOG.md`.** Approval covers the copy system and the routes marked APPROVED below. **It is not publication approval for any PARTIALLY BLOCKED, BLOCKED or CONDITIONAL route — those statuses are unchanged.**
**Revised:** 2026-09-01, second-reader / orchestrator correction pass, and again by the final orchestrator-directed check (2026-09-01). **Statuses below are the reassigned post-review statuses, not the original writer's statuses**, and remain the current statuses after Gate 9 approval.
**Reconciles against:** `docs/06-IA/PAGE_INVENTORY.md` §0 (approved, Gate 5, `DEC-010`) and `docs/05-content/LAUNCH_CONTENT_INVENTORY.md` (approved, Gate 7, `DEC-012`).

**Copy files live in `docs/09-content-pages/copy/`. The briefs in `docs/09-content-pages/briefs/` are the planning layer and were not modified.**

---

## 0. Route reconciliation

| Figure | Approved IA | This index | Match |
|---|---|---|---|
| Unconditional indexable launch pages | **22** | **22** | ✔ |
| Conditional launch pages | **2** | **2** | ✔ |
| Non-indexable launch routes | **5** | **5** | ✔ |
| Total routes if the manufacturing gate clears | 29 | 29 | ✔ |
| Total if it does not | 27 | 27 | ✔ |

**No route was added, removed, renamed or reclassified in this session.**

### Scope of Session 11, stated so the coverage gaps are legible rather than accidental

Session 11 produced **website page copy**. It deliberately did **not** produce:

- **the three unconditional launch articles** (assets 16–18) — the Session 11 brief §15 excludes editorial production, and each has its own approved brief in `docs/05-content/editorial-briefs/`;
- **the two research entries** (assets 13–14) — research assets governed by `docs/05-content/research-briefs/`, one of which is sequence-blocked until the own-site fixes ship;
- **the conditional pair** (C1, C2) — see §3;
- **the five non-indexable routes** — none has a page brief; their content requirements are recorded in `LAUNCH_CONTENT_INVENTORY.md` §3.

**17 copy files were produced in the first pass**, covering every route with an approved page brief except the conditional vertical page. **The correction pass added an 18th — `/thank-you` — on orchestrator instruction**, drafted against the content requirement in `LAUNCH_CONTENT_INVENTORY.md` §3 rather than against a page brief, since none exists. **No route was added: `/thank-you` is an existing non-indexable launch route.**

---

## 1. Unconditional indexable launch pages (22)

**Every page below requires orchestrator review. None is approved.**

| # | Route | Page type | Copy file | Status | Principal intent | Primary evidence dependency | Owner blocker | Orchestrator review |
|---|---|---|---|---|---|---|---|---|
| 1 | `/` | Homepage | `copy/homepage.md` | **PARTIALLY BLOCKED** | Brand / entity; comprehension then conversion | Published method · both own diagnostics · named people | Team and people · enquiry-response owner and hours · published phone · production-claims decision (metadata) | **Required.** **H1 approved as a copy direction — *"Judge us on the enquiries, not the traffic."*** Hero supporting copy was rewritten in the correction pass so "traffic" cannot read as an SEO-only positioning |
| 2 | `/services` | Core proposition hub | `copy/services.md` | **FINAL-CANDIDATE** | CI — no query target, deliberately | `/how-it-works` | None for the copy; sequence-dependent on `/how-it-works` | Required |
| 3 | `/seo` | Capability | `copy/seo.md` | **FINAL-CANDIDATE** | CI/T — `b2b seo`, `enterprise seo` | Own-site technical diagnostic · the method | None | Required |
| 4 | `/ai-seo` | Capability | `copy/ai-seo.md` | **FINAL-CANDIDATE** *(one validation-required claim, not publication-ready until re-verified)* | CI/T — `ai seo agency` | AI-visibility baseline · crawler taxonomy · Google's published position | None; two re-verification checks before publication | **Required — highest-risk page on the site** |
| 5 | `/google-ads` | Capability (demand source) | `copy/google-ads.md` | **PARTIALLY BLOCKED** | T — paid-search provider intent | The method · the measurement chain | Fee/spend separation · production-claims decision (title) | Required |
| 6 | `/social-media-ads` | Capability (demand source) | `copy/social-media-ads.md` | **FINAL-CANDIDATE** | T — paid-social provider intent | The method · channel-fit reasoning | None | Required |
| 7 | `/lead-generation` | Capability (demand source) | `copy/lead-generation.md` | **FINAL-CANDIDATE** | T/CI — `lead generation agency` | The published qualification definition | None | Required |
| 8 | `/conversion-optimization` | Capability | `copy/conversion-optimization.md` | **FINAL-CANDIDATE** | CI — residual category intent only | Own-site diagnostic · the experimentation boundary | None; own-diagnostic link is sequence-blocked | Required |
| 9 | `/pricing` | Commercial + cost transparency | `copy/pricing.md` | **PARTIALLY BLOCKED** | CI→T — cost intent | `/how-it-works` · the accountability boundary | **Prices, inclusions, minimum, spend/fee — BLOCKING** · entry-offer model | Required |
| 10 | `/problems/traffic-but-no-enquiries` | Problem | `copy/problems-traffic-but-no-enquiries.md` | **FINAL-CANDIDATE** | PA — three symptom families consolidated | Own-site diagnostic as the worked example | None. Entry-offer model affects CTA wording only | Required |
| 11 | `/how-it-works` | Published methodology | `copy/how-it-works.md` | **BLOCKED** | CI/I — not a keyword target | **This page is the proof** | **The real delivery process — BLOCKING** · people per stage · response ownership | **Required — the single most consequential blocker** |
| 12 | `/research` | Research index | `copy/research-hub.md` | **CONDITIONAL** | I — not a keyword target | The entries themselves | Named authorship · which entries publish | Required |
| 13 | `/research/{ai-visibility-baseline}` | Original research | **Not produced in Session 11** | **NOT DRAFTED — out of session scope** | I — method and results | Session 04 dataset. **READY to publish** | Named authorship | Required at its own production |
| 14 | `/research/{own-site-enquiry-diagnostic}` | Original research | **Not produced in Session 11** | **NOT DRAFTED — out of session scope** | I — the diagnostic applied to itself | First-party diagnosis | **Technical prerequisite: fixes shipped** | Required at its own production |
| 15 | `/blog` | Editorial index | `copy/blog-index.md` | **CONDITIONAL** | N/I — not a keyword target | The three articles existing | Named authorship · technical prerequisites on the index | Required |
| 16 | `/blog/{ai-search-guide-1}` | Article | **Not produced in Session 11** | **NOT DRAFTED — out of session scope** | PA/I — `how to appear in chatgpt` | AI-visibility baseline | Named authorship | Required at its own production |
| 17 | `/blog/{enquiry-measurement-article}` | Article | **Not produced in Session 11** | **NOT DRAFTED — out of session scope** | PA/I — **PRIMARY SEARCH TARGET = UNVALIDATED** | `/how-it-works` · own-site diagnostic | Named authorship · the validation check | Required at its own production |
| 18 | `/blog/{enquiry-conversion-article}` | Article | **Not produced in Session 11** | **NOT DRAFTED — out of session scope** | PA — verification sub-intent; **primary phrasing RESEARCH REQUIRED** | Problem page · own-site diagnostic | Named authorship | Required at its own production |
| 19 | `/about` | Entity / trust | `copy/about.md` | **PARTIALLY BLOCKED** | N/I — brand and people | Named individuals · method · research · verified entity facts | **People and company facts — BLOCKING** | Required |
| 20 | `/contact` | Conversion — form surface | `copy/contact.md` | **PARTIALLY BLOCKED** | T/N | Minimal by design | **Complete NAP — BLOCKING** · response ownership · consent wording | Required |
| 21 | `/schedule-call` | Conversion — booking surface | `copy/schedule-call.md` | **PARTIALLY BLOCKED** | T — brand navigational | Minimal by design | Who takes calls · length · availability · entry-offer model | Required |
| 22 | `/faq` | Support / entity | `copy/faq.md` | **PARTIALLY BLOCKED** | I — long-tail, no single family | `/how-it-works` · `/pricing` · `/lead-generation` · `/ai-seo` | Prices · spend/fee · minimum commitment | Required |

---

## 2. Conditional launch pages (2)

**Ship only if the manufacturing validation gate clears before content freeze. If it does not, both move to PHASE 2 together and nothing else in the launch architecture changes.**

| # | Route | Page type | Copy file | Status | Principal intent | Primary evidence dependency | Owner blocker | Orchestrator review |
|---|---|---|---|---|---|---|---|---|
| C1 | `/industries/manufacturing` | Vertical beachhead — **candidate #1, not an approved specialisation** | `copy/industries-manufacturing.md` *(record only — no copy drafted)* | **CONDITIONAL — NOT DRAFTED** | T — `seo agency for manufacturing companies` | RFQ-path fluency · the method. **No manufacturing case study exists** | **The gate**, including one completed industrial engagement with a publishable result | **Required — including a decision on whether copy should have been drafted at all** |
| C2 | `/blog/{industrial-b2b-article}` | Article supporting C1 | **Not produced in Session 11** | **CONDITIONAL — NOT DRAFTED** | I/PA — industrial buyer search behaviour and RFQ paths | C1. Orphaned without it | The gate | Required at its own production |

---

## 3. Non-indexable launch routes (5)

**No page brief exists for any of these**, so none was drafted in this session. Their content requirements are recorded in `LAUNCH_CONTENT_INVENTORY.md` §3 and are unchanged.

| Route | Indexation | Content requirement at launch | Copy file | Status |
|---|---|---|---|---|
| `/work` | **`noindex`**, excluded from the sitemap, absent from navigation until ≥1 permissioned case study exists | **No content.** No "coming soon" placeholder | — | **NOT DRAFTED — correct** |
| `/thank-you` | `noindex`, excluded from the sitemap | Confirmation, what happens next, no numeric response time, next-best content only, **no second ask** | `copy/thank-you.md` | **PARTIALLY BLOCKED.** Drafted on orchestrator instruction in the correction pass. Confirmation copy is complete; the "what happens next" section is owner-blocked and must not be filled with a default. **The route stays non-indexable and the route counts are unchanged** |
| `/privacy-policy` | Currently `noindex`; **indexability is an open IA decision** | Accurate policy reflecting what actually runs | — | **NOT DRAFTED.** Requires legal review, not copywriting |
| `/terms` | `noindex` | Accurate | — | **NOT DRAFTED.** Legal |
| 404 | — | Recovery content generated from **live** routes. **Must stop hard-coding three blog slugs that currently return 404** | — | **NOT DRAFTED.** A technical fix with a small copy component |

`/launch-checklist` remains environment-gated and is not a public route.

---

## 4. Status summary

| Status | Count | Routes |
|---|---|---|
| **FINAL-CANDIDATE** | **7** | `/services` · `/seo` · `/ai-seo` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · `/problems/traffic-but-no-enquiries`. **`/ai-seo` carries one validation-required claim; the vendor AI-referral statistic was removed on orchestrator direction** |
| **PARTIALLY BLOCKED** | **8** | `/` · `/google-ads` · `/pricing` · `/about` · `/contact` · `/schedule-call` · `/faq` · `/thank-you` |
| **BLOCKED** | **1** | `/how-it-works` |
| **CONDITIONAL** | **3** | `/research` · `/blog` · `/industries/manufacturing` *(not drafted)* |

**19 copy files exist** — 18 page-copy files plus the conditional record. **Statuses were reassigned independently in the second-reader pass; four pages changed status or carried material corrections. See `PAGE_COPY_AUDIT.md` §11.**
| **Not drafted — out of Session 11 scope** | **6** | 2 research entries · 3 unconditional articles · 1 conditional article |
| **Not drafted — no brief exists** | **5** | the non-indexable routes |

---

## 5. Rules on this index

1. **Every page requires orchestrator review. FINAL-CANDIDATE means ready for review, not approved.**
2. **No route was silently added or removed.** Conditional routes remain conditional; non-indexable routes remain identified as such.
3. **A copy file with an unresolved placeholder is not publishable.** It is a complete draft awaiting an input (`COPY_PLACEHOLDER_STANDARD.md` §2.2 rule 3).
4. **Every placeholder in every draft is listed in that draft's own "Owner-Input Placeholders" section**, and consolidated in `PAGE_COPY_AUDIT.md`.
5. **The briefs are unchanged.** Where a copy file and its brief differ in emphasis, the brief governs and the difference is recorded in the audit.
