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
