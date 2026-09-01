# Decision Log

Use this file only for meaningful project decisions.

## Template
### DEC-000
- **Date:** YYYY-MM-DD
- **Status:** Proposed / Approved / Rejected / Superseded
- **Decision:**
- **Reason:**
- **Evidence:**
- **Impacted files:**
- **Supersedes:**
- **Approved by:**

---

### DEC-001
- **Date:** 2026-08-30
- **Status:** Approved
- **Decision:** Run the website transformation as a documentation-first, multi-session Claude program with ChatGPT orchestrating and reviewing specialist execution.
- **Reason:** Reduce context drift, improve quality control, and make long-running work token-efficient.
- **Evidence:** Owner operating requirements.
- **Impacted files:** `CLAUDE.md`, all project documentation.
- **Supersedes:** Ad-hoc single-session website redesign approach.
- **Approved by:** Project owner.

### DEC-002
- **Date:** 2026-08-30
- **Status:** Approved
- **Decision:** Repository documentation, not Claude conversation history, will be the durable source of project context.
- **Reason:** Avoid long-session context bloat and memory inconsistency.
- **Evidence:** Owner operating requirements.
- **Impacted files:** `CLAUDE.md`, `CONTEXT_INDEX.md`, `SESSION_HANDOFF_TEMPLATE.md`.
- **Supersedes:** None.
- **Approved by:** Project owner.

### DEC-003
- **Date:** 2026-08-30
- **Status:** Approved
- **Decision:** Initial Claude work must audit the existing website/codebase before redesign or implementation.
- **Reason:** Existing routes, functionality, integrations, SEO equity, and architecture must be understood and protected.
- **Evidence:** Owner requirement to preserve existing website structure/functionality unless justified.
- **Impacted files:** future `CURRENT_CODEBASE_AUDIT.md`.
- **Supersedes:** Starting with visual design before codebase audit.
- **Approved by:** Project owner.

### DEC-004
- **Date:** 2026-08-30
- **Status:** **SUPERSEDED by DEC-005 (2026-08-31).** Never approved; closed as a working hypothesis that research did not support.
- **Decision:** Evaluate MappedSkills around three pillars: AI + Search Visibility, CRO, and Marketing Automation.
- **Reason:** Potential focus, scalability, SEO acquisition opportunity, and service expansion path.
- **Evidence:** Strategic discussion only; required market and search validation, which was subsequently performed in Sessions 02–04.
- **Impacted files:** business, search, content, IA.
- **Supersedes:** Broader performance/revenue-marketing architecture if later approved.
- **Superseded by:** `DEC-005`.
- **Approved by:** Never approved. Closed as **not adopted**.
- **Outcome of validation (recorded, not rewritten):** The customer journey logic — attract demand, convert it, then extend — survived. The **three-pillar structure**, the **"AI + Search Visibility" spearhead category**, the **"CRO" service label**, and **marketing automation as a pillar** did not. Sessions 02, 03 and 04 each reached that conclusion from an independent evidence base (competitor positioning; search behaviour; direct observation of AI answers). Full reasoning is preserved in `docs/01-business/STRATEGIC_VALIDATION.md`, `docs/03-search/SEARCH_STRATEGY_VALIDATION.md`, `docs/04-ai-visibility/AI_STRATEGIC_VALIDATION.md` and `docs/01-business/FINAL_STRATEGY_SYNTHESIS.md`. **This history is not rewritten. DEC-004 was a reasonable hypothesis that evidence changed.**

---

### DEC-005
- **Date:** 2026-08-31
- **Status:** **APPROVED**
- **Decision:** **MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries.**

  This is the fundamental business direction. It is a strategic foundation, **not** final homepage copy or a tagline. Later messaging work may find a sharper buyer-facing articulation; the underlying meaning must be preserved.

  The approved strategic principles adopted with it:

  1. **Primary commercial outcome — measurable qualified enquiries.** MappedSkills improves the client's ability to capture buyer demand and convert it into qualified business enquiries.
  2. **Primary buyer — considered-purchase businesses** where each qualified opportunity has meaningful economic value, and which already have, or can reasonably access, market demand. **Not designed primarily for businesses that need demand invented from zero.**
  3. **Core spearhead — capture existing buyer/search demand and turn it into enquiries.** Search is currently the strongest acquisition spearhead. **The business is not defined as an SEO agency.**
  4. **Search / SEO — a primary acquisition capability;** SEO is an implementation discipline beneath the proposition. MappedSkills is **not** positioned company-wide as an SEO, GEO, AEO or LLMO agency. SEO/GEO/AEO terminology remains usable on relevant service, search-intent and educational pages.
  5. **AI Search — an important, highly visible supporting capability and differentiator,** operating as delivery capability, methodology, diagnostic component, content-authority surface and proof mechanism. **It is not the company category.** **No universal "AI Visibility Score" as the core proposition.**
  6. **Conversion — integrated into the core delivery system,** expressed in buyer/business language rather than the acronym "CRO". Statistically valid experimentation must not be promised where traffic is insufficient.
  7. **Measurement and attribution — a mandatory foundation of the operating model.** Connect, where technically and operationally possible: discovery/source → landing experience → interaction → enquiry → qualified enquiry → opportunity → customer/revenue data supplied by the client. Revenue may be reported where reliable client data exists. **Revenue MappedSkills does not control must not be promised.**
  8. **Paid media — retained as an acquisition capability, removed from company-level positioning.** It may accelerate demand capture, create near-term enquiry volume, support testing, generate data and complement organic acquisition. **Existing paid-media URLs must not be removed merely because paid media is no longer company positioning;** final URL decisions belong to the later IA phase.
  9. **Automation — a limited downstream expansion capability:** enquiry routing, lead notifications, response-time workflows, email/WhatsApp follow-up, basic qualification, simple handoff automation. MappedSkills must **not** become broadly positioned as a RevOps consultancy, a CRM implementation company, or a lifecycle-automation consultancy.
  10. **Vertical strategy — horizontal business proposition with vertical beachheads.** Manufacturing / industrial B2B is **candidate vertical beachhead #1 — not approved exclusive specialisation.** MappedSkills does **not** become a manufacturing agency. Other verticals may later be evaluated on evidence.
  11. **Geography — India-first.** International work remains strategically possible. **No international SEO or location strategy is to be created yet.**
  12. **Revenue — measured, attributed where possible, reported and analysed; NOT the core promised outcome.** The core promised outcome is measurable qualified enquiries.
  13. **Proof strategy — until strong case-study inventory exists, trust is built through real** methodology, diagnostics, audits, research, experiments, benchmarks, transparent measurement, founder expertise, process transparency, third-party authority, and client evidence where permission exists. **Never fabricate proof.**
  14. **Explicitly rejected company-level positioning:** full-service digital marketing agency · generic performance marketing agency · SEO agency · GEO/AEO/LLMO agency · marketing automation agency · RevOps consultancy · AI visibility dashboard company. **Capabilities may exist without defining the company.**
- **Reason:** Three independent research sessions converged on the same conclusion: the technique category cannot carry the proposition, the outcome can. The outcome is commercially meaningful without translation, causally close enough to the work to be measured honestly, and it forces conversion and measurement into the core engagement rather than leaving them as upsells.
- **Evidence:** `docs/01-business/STRATEGIC_VALIDATION.md` (Session 02, competitor and category evidence); `docs/03-search/SEARCH_STRATEGY_VALIDATION.md` (Session 03, search-behaviour evidence); `docs/04-ai-visibility/AI_STRATEGIC_VALIDATION.md` (Session 04, direct observation of AI answers); `docs/01-business/FINAL_STRATEGY_SYNTHESIS.md` (Session 05 synthesis, preserved unmodified as the pre-approval record); `docs/02-research/SOURCE_REGISTER.md`.
- **Impacted files:** `docs/01-business/BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, `OFFER_ARCHITECTURE.md` (all rewritten in Session 06); `docs/00-project/CURRENT_STATE.md`, `ASSUMPTIONS_AND_OPEN_QUESTIONS.md`, `QUALITY_GATES.md`; and every subsequent IA, content, CRO, design, copy and development phase.
- **Supersedes:** `DEC-004`, and the "Emerging Business Hypothesis" section of `PROJECT_CHARTER.md` (the charter is a historical framing document and was not modified; where it conflicts with `DEC-005`, `DEC-005` governs).
- **Approved by:** Project owner, 2026-08-31.

---

### DEC-006
- **Date:** 2026-08-31
- **Status:** **APPROVED**
- **Decision:** The five business documents — `BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, `OFFER_ARCHITECTURE.md` — are **frozen** as the authoritative business layer for the transformation programme. `BUSINESS_STRATEGY.md` is the primary strategic source of truth; where another document conflicts with it, it governs (except `DECISION_LOG.md`, which governs the record of approvals).
- **Reason:** Every subsequent phase — information architecture, search architecture, content, CRO, design, copy, development — must build on one consistent, approved business definition rather than on a documentation set that contradicted itself.
- **Evidence:** Session 06 rewrite; the pre-existing contradiction was recorded as a live risk in `FINAL_STRATEGY_SYNTHESIS.md` §23 risk 14 and in `CURRENT_STATE.md`.
- **Impacted files:** the five business documents; `CURRENT_STATE.md`; `QUALITY_GATES.md`.
- **Supersedes:** the deliberate documentation contradiction recorded after Session 02.
- **Approved by:** Project owner, 2026-08-31.

---

### DEC-007
- **Date:** 2026-08-31
- **Status:** **APPROVED** (strategic rule). Remediation of production content is **NOT** performed and **NOT** approved by this entry.
- **Decision:** The unsupported claims present in MappedSkills' own material — **"300%+ ROI", "₹100Cr+", "₹10Cr+"** — **must not be relied upon or reused as strategic reasons-to-believe** in any strategy, positioning, service, offer, content, copy or design work until provenance and evidence are established.
- **Reason:** The claims are of unknown provenance and violate Project Rule 15. **VERIFIED FACT (Session 04):** Google AI Mode surfaced, and Perplexity repeated, the "300%+ ROI" claim as a description of the company — branded AI answers are built largely from first-party sources, so whatever the site asserts is what AI systems redistribute.
- **Evidence:** `docs/04-ai-visibility/AI_STRATEGIC_VALIDATION.md`; `docs/01-business/STRATEGIC_VALIDATION.md`.
- **Impacted files:** the five business documents (rule recorded); future content and copy phases.
- **Supersedes:** any implicit prior use of these figures as proof.
- **Approved by:** Project owner, 2026-08-31.
- **Open, and requiring separate owner action:** whether and when to remove or substantiate the claims in production. **No production content was changed in Session 06.**

---

### DEC-008
- **Date:** 2026-08-31
- **Status:** **APPROVED**
- **Decision:** **A page may target a search term that the company does not use as company-level positioning.** MappedSkills may compete for, rank for and publish pages addressing searches involving SEO agencies, AI SEO agencies, lead generation, conversion and similar categories **without defining itself as any of them.**
- **Reason:** Buyers search in category vocabulary that the company deliberately does not adopt as its identity. Without this rule, the approved positioning would either surrender the highest-intent commercial queries, or drift back into the rejected category positioning.
- **Evidence:** `SEARCH_STRATEGY_VALIDATION.md` §§1–8 (buyer vocabulary, contamination patterns, winnability); `AI_STRATEGIC_VALIDATION.md` §6.
- **Impacted files:** `POSITIONING.md` §2 and §9; `SERVICE_ARCHITECTURE.md`; all subsequent IA, search architecture, content and copy phases.
- **Supersedes:** None.
- **Approved by:** Project owner, 2026-08-31.

---

### DEC-009
- **Date:** 2026-09-01
- **Status:** **Approved — refinement.** **This is a content-topic refinement, not a company-level strategic decision, not an IA decision, and not a gate approval.**
- **Refines:** the Session 07 editorial slot assignment recorded in `docs/06-IA/PAGE_INVENTORY.md` §1.5, `docs/06-IA/PAGE_REASON_TO_EXIST_MATRIX.md` §5, `docs/06-IA/WEBSITE_INFORMATION_ARCHITECTURE.md` §10 and §12, and `docs/03-search/SEARCH_ARCHITECTURE.md` §2 and §5. **Those artifacts are annotated, not rewritten.**
- **Decision:** The **second unconditional editorial launch slot** no longer carries the `how to get cited by ai` family. It carries an article on the relationship between **search / organic visibility → enquiries → qualified enquiries → measurement**, working concept *"how to tell whether SEO is actually producing qualified enquiries"*.

  **`how to get cited by ai` is UNBUILT at launch.** It may be reconsidered in **PHASE 2 only** if it can support a distinct asset **without duplicating** the canonical `/research/{ai-visibility-baseline}` dataset, methodology, findings, charts or conclusion.

- **Earlier state, recorded so the change is legible:** Session 07 associated the second editorial launch slot with the `how to get cited by ai` family — 8 clean autocomplete variants, PRIORITY 1 on Session 03 evidence.

- **Reason — three, in order of weight:**
  1. **Two of three unconditional launch articles would otherwise have been primarily AI Search**, which would have made AI Search read as the company category on the surface where a first-time reader forms that impression. `DEC-005` principle 5 makes AI Search a **highly visible supporting capability and not the company category**, and the editorial set is where that is most easily lost.
  2. **The proposed second AI article overlapped materially with the canonical AI Visibility Baseline research.** Both would have rested on the same 28-run measured dataset. Publishing one dataset at two URLs splits the authority of the only substantial original evidence MappedSkills holds and makes the reference ambiguous for anyone citing it.
  3. **The replacement better supports the frozen proposition** — search demand captured and turned into **measurable qualified enquiries** — by stating in the buyer's own commercial terms that rankings and traffic are not the outcome and qualified enquiries are.

- **Recorded explicitly, and load-bearing:**
  - **This decision does NOT validate search demand for the replacement article.**
  - The replacement carries **`PRIMARY SEARCH TARGET = UNVALIDATED`**. No recorded Session 03 family covers its intent, and **no search demand was invented for it**.
  - **Targeted validation is required before final copy if a search target is to be claimed.** Not broad keyword research. If nothing clean and non-cannibalising is found, the UNVALIDATED label stays and **no query target is claimed anywhere**.
  - **Publication is still justified on buyer-education and conversion-support grounds** without inventing keyword demand.
  - A derived, binding rule: **an original first-party dataset or measured study has exactly one canonical research URL.** Editorial may interpret or apply it only where the user intent is materially different, and must never reproduce substantially the same dataset, methodology, findings, charts or conclusion.

- **Explicitly NOT changed by this entry:** the launch article count (**3 unconditional + 1 conditional**) · any URL, route or page assignment · the sitemap · navigation · commercial-page targeting · the problem page · the manufacturing conditional gate · indexable and non-indexable counts · the funnel and conversion architecture · the business strategy · **and the status of any quality gate.**

- **Evidence:** `docs/05-content/EDITORIAL_STRATEGY.md` §2A and §3A · `docs/05-content/CONTENT_STRATEGY.md` §6A · `docs/05-content/RESEARCH_CONTENT_STRATEGY.md` §6A · `docs/05-content/editorial-briefs/article-2-is-seo-producing-enquiries.md`. **Session 03 and Session 04 research artifacts were not modified**; the `how to get cited by ai` evidence remains valid and intact — it is the slot assignment that is superseded, not the finding.
- **Impacted files:** the four annotated Gate 5 / search-architecture artifacts above · `docs/05-content/*` · `docs/09-content-pages/briefs/ai-seo.md` · `CURRENT_STATE.md` · `handoffs/SESSION_07_IA_SEARCH_ARCHITECTURE.md` (correction note) · `handoffs/SESSION_09_CONTENT_STRATEGY.md`.
- **Supersedes:** the editorial slot-2 topic assignment only.
- **Approved by:** Project orchestrator, 2026-09-01, as a directed content refinement. **No quality gate is passed by this entry.**

---

### DEC-010
- **Date:** 2026-09-01
- **Status:** **Approved — gate approval.**
- **Decision:** **Quality Gate 5 — Website + Search Architecture — PASSED.**
- **Reason / basis:** Session 07's architecture was reviewed and corrected: manufacturing became launch-conditional; the mandatory proof detour was removed; qualified-enquiry creation became mechanism-independent; the duplicate IA directory was resolved; launch counts were reconciled. Session 09 later refined the topic occupying one existing editorial slot (`DEC-009`); that refinement did not change routes, counts, navigation or commercial intent, and did not reopen this gate. The orchestrator reviewed the corrected architecture and approved it.
- **Evidence:** `docs/06-IA/WEBSITE_INFORMATION_ARCHITECTURE.md`, `docs/06-IA/PAGE_INVENTORY.md`, `docs/06-IA/PAGE_REASON_TO_EXIST_MATRIX.md`, `docs/06-IA/CURRENT_TO_FUTURE_URL_MAP.md`, `docs/06-IA/NAVIGATION_ARCHITECTURE.md`, `docs/03-search/SEARCH_ARCHITECTURE.md`, `docs/07-cro/FUNNEL_ARCHITECTURE.md`; `handoffs/SESSION_07_IA_SEARCH_ARCHITECTURE.md`; `DEC-009`.
- **Impacted files:** `QUALITY_GATES.md`, `CURRENT_STATE.md`.
- **Supersedes:** the "OPEN" status of Gate 5 recorded after Session 07.
- **Approved by:** Project orchestrator, 2026-09-01.

---

### DEC-011
- **Date:** 2026-09-01
- **Status:** **Approved — gate approval.**
- **Decision:** **Quality Gate 6 — CRO + Qualified-Enquiry Funnel Specification — PASSED.**
- **Reason / basis:** Session 08 was reviewed and corrected so that Website Qualified and Sales Qualified remain distinct; attribution completeness is independent of commercial qualification; both a form submission and a meeting booking can create a qualified enquiry, with booking never automatically qualified merely by existing; the four required form fields stand, with budget removed and phone optional; email/MX infrastructure fails open; spam handling is controlled; attribution is first-touch + conversion-touch; the CRM lifecycle remains simple; analytics carries no unnecessary PII; a legitimate enquiry cannot be silently lost to a secondary-integration failure; and production analytics wording was reconciled with Session 01B live verification. The orchestrator reviewed the corrected specification and approved it.
- **Evidence:** `docs/07-cro/QUALIFIED_ENQUIRY_DEFINITION.md`, `docs/07-cro/FORM_AND_BOOKING_SPEC.md`, `docs/07-cro/CTA_SYSTEM.md`, `docs/07-cro/PAGE_TYPE_CRO_RULES.md`, `docs/07-cro/POST_SUBMISSION_AND_FOLLOWUP.md`, `docs/12-analytics/ATTRIBUTION_MODEL.md`, `docs/12-analytics/EVENT_TAXONOMY.md`, `docs/13-automation/CRM_DATA_CONTRACT.md`, `docs/13-automation/ENQUIRY_LIFECYCLE.md`, `docs/13-automation/FOLLOWUP_ARCHITECTURE.md`; `handoffs/SESSION_08_CRO_FUNNEL_SPEC.md`.
- **Impacted files:** `QUALITY_GATES.md`, `CURRENT_STATE.md`.
- **Supersedes:** the "NOT PASSED" status of Gate 6 recorded after Session 08.
- **Approved by:** Project orchestrator, 2026-09-01.

---

### DEC-012
- **Date:** 2026-09-01
- **Status:** **Approved — gate approval.**
- **Decision:** **Quality Gate 7 — Content Strategy + Launch Content Architecture — PASSED.**
- **Reason / basis:** Session 09 was reviewed through its original strategy, an editorial correction pass, and a cross-gate reconciliation pass. **Final approved unconditional editorial launch set:** (1) AI-assisted discovery / appearing in ChatGPT; (2) search → qualified enquiry / measurement; (3) the website enquiry-loss diagnostic. **Conditional:** (4) the industrial/B2B article paired with the conditional manufacturing page. AI Search remains a supporting capability, not the company category. The AI Visibility Baseline remains the canonical research home for the Session 04 dataset. Article 2's search target remains **`PRIMARY SEARCH TARGET = UNVALIDATED`** — no search demand may be claimed for it until targeted validation supports it. `how to get cited by ai` is **unbuilt at launch** and may only be reconsidered in PHASE 2 if it can support a distinct asset without duplicating the canonical `/research/{ai-visibility-baseline}` dataset. The own-site diagnostic remains classified as research, not a case study. `/research` may launch with one genuine entry if the second research asset is not ready. No fabricated evidence was accepted; claims/evidence governance (`CLAIMS_AND_EVIDENCE_GOVERNANCE.md`) is binding. The orchestrator reviewed the corrected content strategy and approved it.
- **Evidence:** `docs/05-content/CONTENT_STRATEGY.md`, `LAUNCH_CONTENT_INVENTORY.md`, `CONTENT_CLUSTER_ARCHITECTURE.md`, `EDITORIAL_STRATEGY.md`, `RESEARCH_CONTENT_STRATEGY.md`, `AI_CITATION_CONTENT_PRINCIPLES.md`, `CLAIMS_AND_EVIDENCE_GOVERNANCE.md`, `CONTENT_QUALITY_GATE.md`, `OWNER_INPUT_REGISTER.md`, `CONTENT_EVIDENCE_GAPS.md`, `editorial-briefs/`, `research-briefs/`; `docs/09-content-pages/briefs/`; `handoffs/SESSION_09_CONTENT_STRATEGY.md`; `DEC-009`.
- **Impacted files:** `QUALITY_GATES.md`, `CURRENT_STATE.md`.
- **Supersedes:** the "NOT PASSED" status of Gate 7 recorded after Session 09.
- **Approved by:** Project orchestrator, 2026-09-01.
