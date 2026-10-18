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

---

### DEC-013
- **Date:** 2026-09-01
- **Status:** **Approved — gate approval.**
- **Decision:** **Quality Gate 8 — Messaging Architecture — PASSED**, on the corrected Session 10 messaging architecture, with the following decisions approved individually:
  1. **Corrected internal positioning** — approved.
  2. **Homepage strategic hero territory — *"Judged on the enquiries."*** — **approved as a strategic territory, not final homepage copy.** Session 11 must determine the actual homepage headline/copy within the approved territory; the phrase itself is not frozen as launch copy.
  3. **Engagement-model safeguards / five prohibited absolutes** — approved.
  4. **"Enquiries" as the default buyer-facing noun; "qualified enquiries" where qualification can be explained** — approved.
  5. **"AI search" as umbrella terminology, with GEO/AEO/LLMO constrained as documented** — approved.
  6. **Prohibited/restricted language system** — approved.
  7. **Claims ladder** — approved.
  8. **Twenty-item Message Quality Gate** — approved and **binding on Session 11**.
- **Reason / basis:** Session 10 delivered the messaging architecture, including a narrow orchestrator correction pass that reopened no research, expanded no scope and wrote no page copy. The orchestrator reviewed the corrected artifacts and approved them. The existing-demand idea represented by Territory 2 may support the hero/subhero architecture, as documented, without replacing the approved primary territory.
- **Evidence:** `docs/08-messaging/MESSAGING_ARCHITECTURE.md`, `POSITIONING_MESSAGE_SYSTEM.md`, `VALUE_PROPOSITION_ARCHITECTURE.md`, `PROBLEM_AND_OUTCOME_LANGUAGE.md`, `CAPABILITY_LANGUAGE.md`, `AI_SEARCH_LANGUAGE.md`, `CLAIMS_LADDER.md`, `VOICE_AND_TONE.md`, `TERMINOLOGY_DICTIONARY.md`, `CTA_LANGUAGE_SYSTEM.md`, `HOMEPAGE_MESSAGE_ARCHITECTURE.md`, `COMMERCIAL_PAGE_MESSAGE_PATTERN.md`, `MESSAGE_CONSISTENCY_MATRIX.md`, `COPY_PLACEHOLDER_STANDARD.md`, `MESSAGE_QUALITY_GATE.md`; `handoffs/SESSION_10_MESSAGING_ARCHITECTURE.md`.
- **Impacted files:** `QUALITY_GATES.md`, `CURRENT_STATE.md`.
- **Supersedes:** the "PROPOSED — NOT APPROVED" / "THE MESSAGING GATE IS NOT PASSED" status recorded at the end of Session 10.
- **Approved by:** Project orchestrator, 2026-09-01.

---

### DEC-014
- **Date:** 2026-09-01
- **Status:** **Approved — gate approval.**
- **Decision:** **Quality Gate 9 — Page Copy Production — PASSED**, on the Session 11 page-copy system, copy standards, approved substantive page copy, homepage messaging direction and documented blocker handling. **Gate approval is explicitly NOT publication readiness for every route.**
  1. **Substantive copy APPROVED** for: `/services` · `/seo` · `/ai-seo` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · `/problems/traffic-but-no-enquiries`.
  2. **Homepage H1 APPROVED as actual copy:** *"Judge us on the enquiries, not the traffic."* The revised homepage supporting direction is approved. **The homepage retains its documented PARTIALLY BLOCKED status** — unresolved owner inputs remain elsewhere on the page (team/people, enquiry-response owner and hours, published phone, the production-claims decision).
  3. **PARTIALLY BLOCKED, preserved:** `/` · `/google-ads` · `/pricing` · `/about` · `/contact` · `/schedule-call` · `/faq` · `/thank-you`.
  4. **BLOCKED, preserved:** `/how-it-works` — the single most consequential blocker (the real delivery process).
  5. **CONDITIONAL, preserved:** `/research` · `/blog` · `/industries/manufacturing` (copy not drafted, pending the manufacturing gate).
  6. **Evidence rules preserved:** the ~0.28% AI-referral statistic stays removed from `/ai-seo`, with no replacement figure invented. Google's published position on generative-AI optimisation and SEO remains flagged **`[VALIDATION REQUIRED]`** on `/ai-seo` and `/faq` and is **not publication-ready evidence** until re-verified against the primary source.
  7. **All documented owner-input blockers are preserved**, including: the real delivery process; verified company facts; team/people/authorship; pricing/inclusions/minimums; spend vs fee; the entry-offer model; the enquiry-response owner; business hours; the production-claims decision; client permissions; and the manufacturing gate. Documented technical prerequisites are likewise preserved. **No blocker was resolved by inventing an answer.**
- **Reason / basis:** Session 11 delivered the page-copy production system, including a second-reader/orchestrator correction pass and a final orchestrator-directed check. The orchestrator's independent review approved the copy standards, the approved routes' substantive copy, and the homepage H1 and supporting direction, while confirming that gate passage does not upgrade any page's blocked, partially blocked or conditional status and does not make an unvalidated claim publication-ready.
- **Evidence:** `docs/09-content-pages/PAGE_COPY_INDEX.md`, `docs/09-content-pages/PAGE_COPY_AUDIT.md`, `docs/09-content-pages/copy/*`; `handoffs/SESSION_11_PAGE_COPY_PRODUCTION.md`; governed by `docs/08-messaging/MESSAGE_CONSISTENCY_MATRIX.md` and `MESSAGE_QUALITY_GATE.md` (Gate 8, `DEC-013`) and `docs/05-content/CONTENT_QUALITY_GATE.md` (Gate 7, `DEC-012`).
- **Impacted files:** `QUALITY_GATES.md`, `CURRENT_STATE.md`.
- **Supersedes:** the "PROPOSED — NOT APPROVED" status recorded on `PAGE_COPY_INDEX.md`, `PAGE_COPY_AUDIT.md` and the Session 11 handoff.
- **Approved by:** Project orchestrator, 2026-09-01.

---

### DEC-015
- **Date:** 2026-09-01
- **Status:** **Approved — gate approval, plus one explicitly authorised narrow cross-gate copy correction.**
- **Decision:** **Quality Gate 9A — Creative Direction — PASSED.** The following are approved:
  1. **Creative territory: The Record**, with the binding implementation qualifier *"a working record, not an archive."*
  2. **Refined thesis:** MappedSkills should look like the working record of a firm that finds what is broken, fixes it, and records what changed. **Commercial meaning leads every screen; evidence remains visible and rigorous but never competes with the commercial argument for first attention.**
  3. **Binding creative decisions** — credibility through visible checking rather than manufactured proof; argument + apparatus as two visual registers under the rule "emphasis is commercial, presence is evidential"; every page opens fast and no commercial page opens with apparatus; apparatus may be subordinate in prominence but never downgraded in typographic quality; evidence is never removed to make the site feel commercial; intervention marks are part of the visual vocabulary; the run is a bounded explanatory figure that never tapers and never becomes ambient branding; dashed always means a genuine epistemic gap; measured zero is visually distinct from not-testable; AI search receives no sci-fi visual treatment; light-first orientation; highly selective genuine photography; conventional illustration largely absent; explanatory figures are the primary visual investment; the anti-pattern framework is binding on Gate 9B; India-first refinements R1–R10 are binding; the standalone test, first-fixation test and proportion test are binding; no fake dashboards; no proof container without proof; no archival/newspaper/document cosplay; phone/WhatsApp/direct contact coexist naturally with the system; pricing and contact remain commercially explicit.
  4. **Figure priority — Tier 1:** F1 the run · F2 the four causes · F3 the four AI layers, separated per system · F4 what cannot be attributed. **Evidence constraints preserved:** F3 must never render an untested system as zero; F4 must never invent attribution proportions; no figure may imply a trend from one measurement. **F17 (`/how-it-works` stages) remains BLOCKED — no sketch, placeholder or speculative process diagram.**
  5. **Anti-pattern framework:** the refined `docs/11-creative/14_DESIGN_ANTI_PATTERNS.md`, including the A19 and A23 stress-test corrections, is **approved and binding on Gate 9B**. No additional taste-based restriction was added at closure.
  6. **Responder-portrait decision:** a real responder portrait or named human presence on `/contact` and `/schedule-call` is **approved in principle**, conditional on the person genuinely handling or owning enquiry response, treated as a conversion affordance / human-contact cue rather than testimonial or proof, with no person, role or responsibility invented. **Implementation remains BLOCKED until owner-supplied people/response-ownership information exists.**
  7. **Component-kit classification**, recorded as approved future implementation guidance, **no production code modified this session:** RETIRE — `HeroDashboard`, `SocialProofStrip`, `BeforeAfterMetric` as a metric-pair pattern; REPURPOSABLE/CONDITIONAL — `TestimonialCard`, only with genuine permissioned testimonial evidence, placeholder path must not survive future implementation; NEUTRAL PRIMITIVES SUBJECT TO REDESIGN — `StatCard`, `CaseStudyCard`.
  8. **Directory reconciliation — recommendation only, approved as future standalone housekeeping, NOT executed now:** retire or pointer-only `docs/08-design/`; move `docs/11-schema/` → `docs/15-schema/`; leave `docs/11-creative/` where it is. To occur before substantive Gate 9B work begins.
  9. **One explicitly authorised narrow correction to previously approved Session 11 copy**, without reopening homepage messaging architecture, the hero, or the approved H1. The sentence *"There are buyers for what you sell, and most of them never reach you"* (and the `/services` variant, "and most never reach you") made an unsupported second-person quantity assertion. Corrected to: **"There is buyer demand for what you sell, and some of it never reaches you."** Applied narrowly, only where the unsupported claim actually appeared, after inspection: `docs/09-content-pages/copy/homepage.md` (both occurrences), `docs/09-content-pages/copy/services.md`, `docs/09-content-pages/PAGE_COPY_AUDIT.md` (governance annotation), and `docs/08-messaging/HOMEPAGE_MESSAGE_ARCHITECTURE.md` (the illustrative headline direction and the Recommended Direction's supporting-line description, both of which were found to carry the same claim). **No other messaging or Session 11 file was touched; the H1 and hero territory are unchanged; no new positioning idea was introduced.**
- **Reason / basis:** Session 12 delivered the creative direction, including a stress-test / correction pass that found genuine anti-pattern contradictions (A19, A23), a component-level `DEC-007` exposure, a directory-numbering collision, and the unsupported homepage-copy quantity claim. The orchestrator reviewed the corrected artifacts and approved them, and separately authorised the one narrow copy correction as a bounded, explicitly scoped exception rather than a reopening of Gate 9.
- **Evidence:** `docs/11-creative/01_CREATIVE_DIRECTION.md` through `20_CORRECTION_PASS_GOVERNANCE.md`; `handoffs/SESSION_12_CREATIVE_ART_DIRECTION.md`; `docs/09-content-pages/copy/homepage.md`, `copy/services.md`, `PAGE_COPY_AUDIT.md`; `docs/08-messaging/HOMEPAGE_MESSAGE_ARCHITECTURE.md`.
- **Impacted files:** `QUALITY_GATES.md`, `CURRENT_STATE.md`, plus the narrow copy corrections listed in item 9.
- **Supersedes:** the "PROPOSED — NOT APPROVED. Gate 9A remains NOT PASSED" status recorded at the end of Session 12; the "most of them never reach you" / "most never reach you" wording in the files listed in item 9.
- **Approved by:** Project orchestrator, 2026-09-01.

### DEC-016
- **Date:** 2026-09-02
- **Status:** **Approved — gate approval.**
- **Decision:** **Quality Gate 9B — UX Architecture — PASSED.** The following are approved:
  1. **Low-fidelity structural wireframes** for all six master page types, six variants and five interaction/content states (`docs/16-ux/31`–`47`, shared legend `30`).
  2. **Responsive NARROW / MEDIUM / WIDE behaviour**, demonstrated for all six master types plus the seven mobile structural slots (`48`). Numeric breakpoint values remain a deliberately deferred Gate 10 output.
  3. **The 16-entry UX pattern inventory** — 14 patterns + 2 sitewide regions (`49`).
  4. **Commercial-page differentiation** — no two of the six commercial pages share a UX sequence; every difference names its driver in words.
  5. **F1 (the run) usage taxonomy compliance** — six unconditional routes carry F1, three at FULL, `/social-media-ads` correctly at NONE.
  6. **Conversion-surface architecture** — one outcome, two mechanism-independent surfaces, CTA repetition bounded, `/thank-you` a real post-conversion state.
  7. **Evidence, form, navigation and blocked-content states** — the evidence disclosure pattern (including the no-JavaScript state), the form lifecycle (including focus state and the analytics/privacy contract), the navigation states (including the parent-link/disclosure fix), and the blocked-content states (`43`, `44`, `45`, `46`, `47`).
  8. **The cross-page consistency check** (`50`) and the **final assessment against all 51 gate criteria and the durable gate definition** (`51`), recomputed after a final narrow closure pass applying six orchestrator rulings: **48 PASS · 0 PARTIAL · 0 FAIL · 3 NOT ASSESSABLE** across the 51 criteria; **6 PASS · 0 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE** across the durable criteria.
  9. **`/pricing`'s commercial facts (prices, bands, inclusions, minimums, factor values) remain owner-blocked** (B6, NOT ASSESSABLE). No price, package or engagement value was invented anywhere in the approved artefacts.
  10. **Perceptual hierarchy, first-fixation (F2) and the visual-weight portion of proportion (F3) move to Gate 10** as mandatory re-tests on rendered screens — they require a visual hierarchy this low-fidelity phase is prohibited from producing, and could not be honestly assessed here.
  11. **This approval does NOT approve high-fidelity visual design.** No layout, grid, type, colour, spacing, component, style frame, mockup or prototype exists or is approved by this decision. **F17 (`/how-it-works` stage figure) remains BLOCKED.**
- **Reason / basis:** Session 13 delivered the UX architecture and the Gate 9B wireframe/inventory/audit deliverables. A cold second-reader audit found documentation and assessment defects; a targeted remediation and re-assessment pass corrected them and individually assessed all 51 criteria, carrying 4 PARTIAL and 1 NOT ASSESSABLE item. A final narrow closure pass applied six orchestrator rulings resolving each: DEFERRED apparatus scheduling is not a fourth evidence-disclosure state (A3); the homepage's approved first screen is not required to expose a first-screen check action (A5); pricing self-placement is owner-blocked rather than a UX defect (B6); visual proportion and first-fixation are perceptual tests that cannot be honestly assessed pre-render and defer to Gate 10 (F3, F2); and Gate 9B validates responsive behaviour through structural width classes rather than numeric breakpoints (the durable "usable at target breakpoints" criterion). The orchestrator reviewed the recomputed assessment and approved it.
- **Evidence:** `docs/16-ux/20_GATE_9B_QUALITY_GATE.md`; `docs/16-ux/30`–`51` (wireframes, pattern inventory, cross-page audit, final assessment); `handoffs/SESSION_13_UX_ARCHITECTURE.md` and its formal-approval annotation.
- **Impacted files:** `QUALITY_GATES.md`, `CURRENT_STATE.md`.
- **Supersedes:** the "NOT PASSED — READY FOR ORCHESTRATOR APPROVAL" status recorded for Gate 9B at the end of Session 13's narrow closure pass.
- **Approved by:** Project orchestrator, 2026-09-02.

### DEC-017
- **Date:** 2026-09-03
- **Status:** **Approved — owner approval of the visual direction. NOT a gate approval.**
- **Decision:** **THE ARRIVAL (Session 15D) is the approved visual direction for MappedSkills.** The owner personally reviewed four live prototypes side by side — original Direction A (THE SIGNAL FIELD), Direction B (THE SWITCH), the Session 15C convergence, and Session 15D — and stated: *"Yes, 15D is clearly better."* The following are approved as the visual direction:
  1. **THE ARRIVAL as the creative direction.** Demand is active and travels through a dark visual field; most activity is merely activity; when demand becomes commercially meaningful its state visibly changes. The experience distinguishes **ACTIVITY from COMMERCIAL CONSEQUENCE**, which is the approved positioning — *"Judge us on the enquiries, not the traffic"* — made visible.
  2. **Direction A is the visual foundation; Direction B contributed principles only** (state transformation, commercial clarity, static quality, restraint, claim/evidence, compositional confidence) and none of its appearance.
  3. **Creative-direction exploration is closed.** There is no Session 15E. No further visual territories, no further A/B/C alternatives, no reopening of THE WORKING SHEET, and no reopening of B as the foundation.
  4. **Superseded, and retained as decision history rather than deleted:** the Session 15 homepage built on Direction 2 "THE WORKING SHEET" (rejected by the owner as reading like a document/journal/textbook), the Session 15B directions A, B and C as alternatives, and the Session 15C convergence, which started from the foundation the owner has now rejected. **All remain in the repository, unchanged and openable, as the decision trail.**
  5. **THE RECORD's strategic redefinition is retained and unchanged:** it is a **credibility system** governing evidence, provenance, measurement, limitations and accountability. **It is not the sitewide visual genre**, and MappedSkills must not return to reading as a document, journal, textbook, audit report or research paper.
  6. **The binding creative rules** recorded in `docs/22-design-system/01_CREATIVE_DIRECTION_FROZEN.md` Part 1 — dark-first; the demand/signal metaphor; activity versus commercial consequence; one accent (amber) meaning commercially meaningful; the eight signal-state semantics distinguished by shape as well as colour; commercial consequence as a state change rather than a replacement; **no fabricated quantitative visuals**; evidence as a supporting layer with no monospace register; motion roles and budgets; mandatory stillness; nothing dependent on motion; the accessibility floor; the approved upstream not reopened by design; and the anti-pattern register.
  7. **The motion budget is binding as maximums** — homepage 2 ambient regions / 5 major motion events / 2 signature interactions / 1 pinned sequence; service page 1 / 2 / 1 / 0; editorial 0 / 1 / 0 / 0 — with stillness mandatory in reading-heavy regions, after major transformations, and off-screen. **This closes the governance gap identified and left open by Sessions 14A, 15B and 15C.**
  8. **What this decision explicitly does NOT approve:** the design system produced in Session 16, which remains PROPOSED; **Quality Gate 10, which is NOT passed**; the complete homepage, which does not exist; any other route; any production code; any owner blocker; and any performance or accessibility claim beyond what was measured on one prototype at two emulated widths.
- **Reason / basis:** Sessions 14 and 14A validated the earlier territory and produced a complete `/seo` specimen; Session 15 produced a design-system foundation and a complete homepage which the **owner rejected on sight** as a document. Session 15B reset the visual expression and produced three materially different browser-rendered directions. Session 15C converged on B as the foundation and was rejected by the owner in favour of A. Session 15D reversed the convergence — A's visual world with B's commercial sophistication — and solved the AI/technology-startup drift by art direction (warm espresso ground, one amber accent, no monospace, a banded field with a horizon, reduced density) rather than by removing the signal field. The owner reviewed all four live and approved 15D.
- **Evidence:** `docs/21-creative-convergence-a/00_DIRECTION.md`, `01_MOTION_BUDGET.md`, `02_RESPONSIVE_ACCESSIBILITY_PERFORMANCE.md`, `03_SELF_CRITIQUE.md` and `prototype/convergence-a.html` (the approved prototype) plus `prototype/index.html` (the four-way comparison the owner used); the superseded trail in `docs/17-visual-validation/`, `docs/18-design-system/`, `docs/19-creative-reset/` and `docs/20-creative-convergence/`; handoffs `SESSION_14_VISUAL_VALIDATION.md`, `SESSION_15_DESIGN_FOUNDATION.md`, `SESSION_15B_CREATIVE_RESET.md`, `SESSION_15C_CREATIVE_CONVERGENCE.md`, `SESSION_15D_CREATIVE_CONVERGENCE_A.md`.
- **Impacted files:** `QUALITY_GATES.md`, `CURRENT_STATE.md`, and the new `docs/22-design-system/`.
- **Supersedes:** Direction 2 "THE WORKING SHEET" as the sitewide visual treatment (Session 14/14A/15); the Session 15 design-system foundation and homepage as the design direction; the Session 15C convergence's B-first foundation. **None of those artefacts is deleted — all are retained as decision history.**
- **Approved by:** Project owner, 2026-09-03. Recorded by the project orchestrator.

### DEC-018
- **Date:** 2026-09-03
- **Status:** **Approved — owner clarification of the visual direction. NOT a gate approval.**
- **Decision:** **THE RESOLVE (Session 15C — "THE CONVERGENCE") is the approved visual direction for MappedSkills.** The owner **reopened the actual browser prototypes**, identified the one they had intended to approve, and stated: *"Yes this is the one. I like THE CONVERGENCE — 'The Resolve'."* The following are recorded:
  1. **This is a prototype-identification correction, not a change of mind.** The earlier reference to *"15D"* recorded in `DEC-017` was a **mistaken prototype label**. The owner's intent throughout was the prototype now identified as **Session 15C**. The approved prototype is **`docs/20-creative-convergence/prototype/convergence.html`** — recorded as a **file path**, not a session label, because a session label is what failed.
  2. **THE RESOLVE as the creative direction.** *Traffic is a field of identical, anonymous marks. Enquiries are a few distinct, named objects. The site's one move is RESOLUTION — the same population, resolved.* The experience runs **anonymous activity → commercial resolution**, which is the approved positioning — *"Judge us on the enquiries, not the traffic"* — made visible.
  3. **Binding visual characteristics, verified against the prototype itself** (`docs/24-resolve-governance/00_ACTIVE_DIRECTION.md` §4): **light-first**, ivory `#F7F3EC` ground with warm near-black ink `#141219`, and a **dark hero stage that inverts to light as the population resolves**; **one accent, tangerine `#FF5B04`**, with a darkening ramp (`#D94400` display, `#A83400` small) so the same mark clears contrast at every size; **Bricolage Grotesque + Manrope**; **no monospace**; the traffic register `#5C5665` and the not-measured / unattributed register `#8E8798`; **CAPTURE → CONVERT → MEASURE** as sequential resolution; **claim / what-it-stands-on** evidence; a **full-bleed tangerine CTA**; and a **calm → event → calm** rhythm. Verified absent: canvas, images, shadows, fixed or sticky elements, looping animation and ambient motion. **One correction to the shorthand:** `repeating-linear-gradient` **is** used, four times, as **dashed and hatched pattern fills encoding "not measured" and "unattributed"** — these are honesty devices and must not be removed as "gradients"; what is prohibited is the decorative colour gradient.
  4. **`DEC-018` supersedes `DEC-017` for active creative direction only.** `DEC-017` is **retained unchanged** as historical record and is not edited, weakened or deleted.
  5. **Session 15D — THE ARRIVAL — is retained exploration.** `docs/21-creative-convergence-a/` and its prototype remain in the repository, unchanged and openable. It was not wrong work; it was correctly built against a mistaken label.
  6. **Session 16's Arrival-specific design-system decisions are SUPERSEDED** — dark-first, the espresso visual world, amber as the accent, the eight Arrival signal states, the capture line / horizon / ledger / streak / band primitives, the canvas signal field, ambient regions, pinned sequences, the Arrival colour, surface and type systems, and the Arrival motion-budget numbers. **`docs/22-design-system/` is retained as history and must not be applied to THE RESOLVE except where the audit permits.**
  7. **Direction-independent governance from Session 16 may survive, subject to the audit** in `docs/24-resolve-governance/01_SESSION16_AUDIT.md`, which classifies every material rule as DIRECTION-INDEPENDENT, RESOLVE-COMPATIBLE or ARRIVAL-SPECIFIC. Retained as written: the accessibility floor (A1–A14), the document-drift register (D1–D8), the fabricated-quantity register (Q1–Q8), no fabricated quantitative visuals, evidence as a supporting layer with no monospace register, commercial consequence as a state change rather than a replacement, activity versus commercial consequence, mandatory stillness, nothing dependent on motion, the approved upstream not reopened by design, narrow-must-recompose, the no-library / `transform`-`opacity` / one-`rAF` performance rules, and the static-quality, digital/PDF and marketing-company tests.
  8. **A Resolve-specific motion and repetition budget is recorded** at `docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md`, re-derived rather than inherited: **homepage max 1 major resolve, 3 sectional resolutions, 3 transitions, 1 signature interaction; secondary pages 0 / 1 / 2 / 0; editorial 0 / 0 / 1 / 0; and 0 ambient regions and 0 pinned sequences everywhere.** This closes the governance gap Session 15C named as its own highest risk — the resolve gesture appearing **seven times** in the prototype and becoming a sitewide tic. **The Session 15C prototype exceeds this budget by design and must not be edited to fit it**; the budget governs the design system and the homepage built from it.
  9. **THE RECORD is unchanged: a CREDIBILITY SYSTEM, not the art direction.** Evidence remains subordinate to the commercial experience, and MappedSkills must not return to reading as a journal, textbook, audit report, publication or document.
  10. **Creative-direction exploration remains CLOSED.** There is no Session 15E and no new territory. This decision selects between prototypes that already existed; it does not reopen the competition.
  11. **What this decision explicitly does NOT approve:** **Quality Gate 10, which remains NOT PASSED — IN PROGRESS**; any design system, including a future Resolve one; the complete homepage, which does not exist in THE RESOLVE; any other route; any production code; any owner blocker; and any performance, accessibility or user-testing claim.
- **Reason / basis:** `DEC-017` was recorded from a spoken session label. The owner subsequently reopened the live prototypes and identified a different one as their intended choice. The repository is therefore corrected forward — the mistaken approval is superseded rather than erased, so the record shows what happened and why.
- **Evidence:** the approved prototype `docs/20-creative-convergence/prototype/convergence.html`, verified unchanged by SHA-256 during this session; its supporting documents `docs/20-creative-convergence/00_CONVERGENCE_RATIONALE.md`, `01_MOTION_LANGUAGE.md`, `02_RESPONSIVE_ACCESSIBILITY_PERFORMANCE.md` and `03_SELF_CRITIQUE_AND_TESTS.md` (whose risk **R1** is the source of the budget in item 8); the retained Arrival trail in `docs/21-creative-convergence-a/` and `docs/22-design-system/`; and the correction layer in `docs/24-resolve-governance/`.
- **Impacted files:** `CURRENT_STATE.md`, `QUALITY_GATES.md`, and the new `docs/24-resolve-governance/`. **`DEC-017` is not modified.** **No production file is touched.**
- **Superseded by this decision:** THE ARRIVAL as the active visual direction; Session 16's Arrival-specific design-system rules; and the Session 16 motion-budget numbers as applied to THE RESOLVE. **Nothing is deleted — `DEC-017`, Session 15D and Session 16 all remain in the repository as the decision trail.**
- **Also recorded:** the uncommitted Session 17 F1-compatibility work tested F1 against THE ARRIVAL and was **removed rather than committed**, because it is no longer a valid Gate 10 test. **F1 must be revalidated against THE RESOLVE** — sequence at `docs/24-resolve-governance/03_NEXT_VALIDATIONS.md`.
- **Approved by:** Project owner, 2026-09-03, by direct browser confirmation. Recorded by the project orchestrator.

### DEC-019
- **Date:** 2026-09-04
- **Status:** **Approved — GATE 10 PASSED.** Orchestrator decision, on owner visual validation.
- **Decision:** **Quality Gate 10 — UI / Design System — is PASSED.** **THE RESOLVE is validated as the production visual and experience direction**, and the **Session 19B homepage prototype is the approved baseline**: `docs/26-resolve-homepage/prototype/index.html`. The following are recorded:
  1. **The validated baseline is a chain, not a single artefact:** THE RESOLVE (`DEC-018`) → Session 18 complete homepage → 18A refinement → 18B compression → 18C mobile refinement → 19 closure audit → 19A narrow corrections → 19B accessibility closure. The authoritative creative reference remains **`docs/20-creative-convergence/prototype/convergence.html`**, which was verified **byte-identical (`c6d29fd34cf7c5e481d8244773f7d357`) at every session** and was never modified.
  2. **The Gate 9B-deferred perceptual re-tests are now run and passed, at both widths.** **F2 — first fixation: PASS** at WIDE (the H1 at 5.05× the runner-up) and NARROW (2.05×, with the hero stage deliberately teased at the fold rather than competing with the headline). **F3 — visual proportion / weight: PASS** at WIDE and NARROW, on a type-scale rhythm of 101/48/69/69/43/86/18/93 px across the chapters and a ground change at three points.
  3. **Quantity safety: PASS.** The hero's four channel bars, which carried unequal inline widths inherited from the 15C reference, were equalised in Session 19A so the mark carries **state only**; **zero inline size styles remain**; and every comparable set on the page is non-comparative. The Session 18A intervention maps, whose proportional stretches could be read as amounts, were removed in 18B and have not reappeared.
  4. **Evidence / proof safety: PASS.** Zero fabricated case studies, testimonials, results, ROI, statistics, logos, awards or client counts. The single evidential claim is the Session 04 first-party measurement, carried with its full provenance and limits.
  5. **Accessibility and responsive: PASS.** Zero contrast failures across WIDE and NARROW; zero heading-level jumps; **zero interactive targets below 40×40 CSS px at 360, 390, 430, 760, 761, 860, 1080 and 1425**; zero horizontal overflow at any width; zero fixed or sticky elements; zero looping animation; explicit `color-scheme: light` so a forced-dark browser cannot invert a light-first direction.
  6. **No-JS and reduced motion: PASS.** Both compose the complete page — every stage open, all seven capability links reachable, the chain fully drawn with its honesty dashes intact, and both reader-driven controls operable. **Motion amplifies meaning; it never carries it.**
  7. **The three standing experience tests: PASS** — marketing-company blur, digital/PDF, and static quality.
  8. **Two reader-driven controls are ACCEPTED**, on the basis that they perform distinct informational jobs: the **Traffic / Enquiries signature**, which changes what a population *is* and inverts the surface; and the **Capture / Convert / Measure tablist**, which changes which part of a structure is under examination and changes no ground and no population. **The tablist is progressive disclosure, not a second signature.**
  9. **T3 is empirically reconciled from a proposed 3 to a validated ceiling of 4** — see the separate record below and `docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md` §5.0.
  10. **The owner's mobile verdict — *"the mobile now feels right"* — is the validated mobile state and is retained.** No further homepage creative iteration is required before production translation.
  11. **Two defects found during closure are recorded rather than hidden**, because both had survived several sessions of reporting: a **boundary transition documented as live in Sessions 18–18C had never rendered** (its selector could not match, and no script applied its class), and it was **removed rather than repaired** in 19A, taking with it a no-JS inconsistency and a **reduced-motion contrast failure of 2.66:1 against a 3:1 floor**; and **seven capability links were nested inside `<button role="tab">`**, invalid HTML whose measured consequence was a **126-character accessible name** on each tab, corrected in 19B to a valid tab/tabpanel structure with names of *"Capture"*, *"Convert"* and *"Measure"*.
- **T3 reconciliation, recorded explicitly:** the homepage T3 maximum moves **3 → 4**. The four validated live transitions are **the hero departure**, **the departure carrier**, **the chain descent and draw**, and **the close arrival**; the boundary chapter is **intentionally still**. All four meet the standard — each joins two chapters, changes the reader's distance from an object, or changes what an object means. **This is evidence-based reconciliation against a validated page, not an increase in motion allowance: 4 is the CEILING for the approved homepage, not headroom.** Secondary-page and editorial budgets are unchanged. **Ambient regions remain 0, pinned sequences remain 0, looping decorative motion remains prohibited, and the anti-tic rules M1–M7 are unchanged.** The figure of 3 was derived before any homepage existed, and the budget document itself specified that the reconciliation would be measured against the composed homepage.
- **Reason / basis:** Gate 9B deferred F2 and F3 to Gate 10 because both require a rendered visual hierarchy. That hierarchy now exists, was rendered and measured rather than argued, and passes. The owner reviewed the experience across four iterations and validated it, most recently on mobile.
- **Evidence:** `docs/26-resolve-homepage/` — `00_EXPERIENCE_CONCEPT.md`, `01_PAGE_JOURNEY.md`, `02_MOTION_SYSTEM.md`, `03_RESPONSIVE.md`, `04_ACCESSIBILITY_PERFORMANCE.md`, `05_SELF_CRITIQUE.md`, `06_REFINEMENT_18A.md`, `07_COMPRESSION_18B.md`, `08_MOBILE_REFINEMENT_18C.md`, `09_CORRECTIONS_19A.md`, `10_ACCESSIBILITY_CLOSURE_19B.md` and `prototype/index.html`; the F1 validation trail at `docs/25-resolve-f1-validation/`; and the handoffs `SESSION_17B_RESOLVE_F1_VALIDATION.md`, `SESSION_18_RESOLVE_HOMEPAGE.md` and `SESSION_20_GATE10_CLOSURE.md`.
- **Impacted files:** `QUALITY_GATES.md`, `CURRENT_STATE.md`, `docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md`. **`DEC-017` and `DEC-018` are not modified.**
- **Supersedes:** the **proposed** homepage T3 budget of 3, for the homepage only. **Nothing else is superseded.** `DEC-018` remains the active visual-direction record; `DEC-017` remains retained historical record; THE ARRIVAL remains superseded; THE RECORD remains the credibility system and not the art direction.
- **What this decision explicitly does NOT approve:** **production implementation, deployment or push of any kind**; any Next.js change; any fabricated proof, client result, testimonial, logo or metric; any **owner-blocked** content — **`/pricing` facts, the F17 `/how-it-works` real process, and the conditional manufacturing route all remain blocked and none was resolved by this gate**; publication readiness for any route; any later gate; a Resolve design system, which still does not exist as a separate deliverable; and any performance, cross-browser, screen-reader or user-testing claim beyond what was measured and reported.
- **Approved by:** Project orchestrator, 2026-09-04, on owner visual validation. Recorded by the repository worker, which has no authority to pass a gate.

### DEC-020
- **Date:** 2026-09-06
- **Status:** **Approved — OWNER DECISION.** Recorded by the repository worker in Session 33.
- **Decision:** **Consent for analytics on mappedskills.com is Google Consent Mode v2 with a first-party, self-hosted consent banner. No third-party consent-management platform is adopted.**
  1. **Default state, before any decision, on every page load:** `analytics_storage: denied` · `ad_storage: denied` · `ad_user_data: denied` · `ad_personalization: denied`.
  2. **On explicit acceptance of analytics:** `analytics_storage: granted`. **The three advertising signals remain `denied`** in this phase, unconditionally.
  3. **On rejection:** all four remain `denied`.
  4. **Meta Pixel is NOT enabled in this phase**, and no advertising tag is approved for delivery.
  5. **The decision persists in a first-party client-side mechanism** — `localStorage`, key **`ms.consent.v1`**, values `granted` / `denied`. No PII, no server write, no cookie. An unreadable or absent value is treated as undecided and grants nothing.
  6. **Refusal must be fully supported and must be as easy as acceptance**, and the banner must not block or interfere with navigation, contact-form completion or submission, server persistence, thank-you navigation, or booking-link navigation.
- **Reason / basis:** Phase H2 left consent as the open blocker on analytics delivery. The owner made the call directly in the Session 33 brief. Consent Mode v2 is the mechanism Google's own tags read, so it is the only mechanism that can restrain them correctly.
- **Implementation, and the one thing it adds beyond the decision:** implemented in Session 33 — `lib/consent.ts`, `components/analytics/ConsentProvider.tsx`, `ConsentBanner.tsx`, `ConsentPreferencesLink.tsx`, and a consent gate in `lib/gtm.tsx`. **The GTM container script itself is not requested until analytics is accepted** ("basic" rather than "advanced" consent mode). That is stricter than the decision requires, in the direction the decision points, and is recorded here rather than treated as implied.
- **Evidence:** `docs/27-production-translation/20_PHASE_H2A_CONSENT_AND_GTM.md` — live verification of ordering, storage, updates, refusal, withdrawal, accessibility across ten widths, PII audit and the analytics-failure invariant.
- **Impacted files:** `lib/consent.ts`, `components/analytics/ConsentProvider.tsx`, `components/analytics/ConsentBanner.tsx`, `components/analytics/ConsentPreferencesLink.tsx`, `lib/gtm.tsx`, `app/layout.tsx`, `components/layout/Footer.tsx`, `.env.example`.
- **What this decision explicitly does NOT approve:** publishing the GTM container; setting `NEXT_PUBLIC_GTM_ID` in production; any advertising tag, Meta Pixel or Meta consent signal; any change to the approved H2 event taxonomy; and any legal position on the banner's wording, which remains **RESEARCH REQUIRED** pending legal review.
- **Recorded blocker arising from it:** live validation found the **published `GTM-K8ZQPMXP` container fires a Meta Pixel (`983625902710561`) and an X/Twitter ads tag while advertising consent is denied**, because neither vendor's tag honours Consent Mode unless the container checks it explicitly. **This contradicts items 2, 3 and 4 above and must be resolved in GTM before the container is published.**
- **Approved by:** Project owner, 2026-09-06, in the Session 33 brief. Recorded by the repository worker, which has no authority to make a consent decision.

### DEC-021
- **Date:** 2026-09-06
- **Status:** **Approved — OWNER DECISION.** Recorded by the repository worker in Session 35.
- **Decision:** **Production measurement for mappedskills.com is activated as a Google-only stack: the existing `GTM-K8ZQ…` container, published, delivering to the existing GA4 property `G-6H7W…` (*Mapped Skills - GA4*).** The owner reopened the H2 provider activation deferred in Session 33, and directed in-session that (a) the approved event-parameter mapping be implemented before publishing, and (b) the activation be completed through to production, including the rebuild and controlled redeploy it requires.
  1. **The published container carries six active tags only** — `GA4 - Configuration` (`send_page_view = false`) and the five `GA4 - H2 - …` event tags on the five approved `CE - …` dataLayer custom-event triggers.
  2. **All 39 legacy Meta, X/Twitter, LinkedIn and legacy-GA4 tags, and `Conversion Linker`, are paused** — and, for the first time, *published* as paused. They are retained rather than deleted so the container history stays reversible.
  3. **The approved GA4 parameter mapping (`20_PHASE_H2A_CONSENT_AND_GTM.md` §8) is implemented**, via 14 Data Layer Variables, with 13 matching event-scoped custom dimensions registered in GA4 before production data began arriving. `latest_*` fields are deliberately not sent.
  4. **`lead_form_submitted` remains the single primary enquiry conversion**, emitted only after server-confirmed durable persistence. It was not renamed, and no click, validation pass, thank-you view or booking click was elevated to a conversion.
  5. **`qualification_status` is sent as `not_evaluated`**, unchanged — persistence is not qualification.
  6. **Meta Pixel is not activated.** `NEXT_PUBLIC_META_PIXEL_ID` stays unset.
- **Reason / basis:** the measurement layer was implemented, dormant and blocked only on provider-side work. The owner reopened it and made both in-session calls directly.
- **Evidence:** `docs/27-production-translation/23_PHASE_H2_ANALYTICS_ACTIVATION_ACCEPTANCE.md` — GTM Preview against a local production build, live clean-context consent verification, one live synthetic enquiry end to end, a live sabotage test, a live negative-case matrix, a PII audit and a 3-width regression sweep.
- **Resolves the blocker recorded against `DEC-020`:** verified live — accepting analytics now contacts **Google only**. No Meta, X or LinkedIn request is made in any consent state, and no advertising cookie is created. `gcs=G101` and `npa=1` confirm Google's own tag received exactly the state `DEC-020` specifies. **The cause was never the wrong tags; it was that the correct pauses had never been published.**
- **Impacted files:** none in application source. `NEXT_PUBLIC_GTM_ID` is a **build-time** input, so activation required a rebuild and a controlled manual redeploy of identical source; the container id is not committed to the repository.
- **What this decision explicitly does NOT approve:** any advertising tag, remarketing, Google Ads conversion tracking, Floodlight or Meta activation; any change to the approved five-event taxonomy; treating a persisted enquiry as a qualified one; any booking-completion measurement; deleting the paused legacy tags; and any legal position on the banner wording, which remains **RESEARCH REQUIRED**.
- **Outstanding at the moment of recording:** GA4 will not offer `lead_form_submitted` for **key-event** flagging until it has processed the event (≤24h). This is provider processing latency, not an implementation gap, and it is the only item between this decision and a fully closed reporting layer.
- **Approved by:** Project owner, 2026-09-06, in the Session 35 brief and in-session direction. Recorded by the repository worker, which has no authority to make an activation decision.

### DEC-022
- **Date:** 2026-09-07
- **Status:** **Approved — PHASE J PASSED.** Owner / orchestrator acceptance, recorded by the repository worker.
- **Decision:** **Phase J — the site-wide visual redesign — is ACCEPTED: "PHASE J PASSED — SITE-WIDE VISUAL REDESIGN ACCEPTED."** The following are recorded:
  1. **The accepted implementation is commit `15bc4ed`** on `test_branch` — the head of the five Phase J commits `f9af9ed` → `791ed6e` → `01cf53f` → `cc2c143` → `15bc4ed`. `f9af9ed` carries the prototypes and documentation only; its application source is identical to the pre-Phase-J commit `66dff0e`.
  2. **The active design language remains THE RESOLVE** (`DEC-018`). Phase J composed within it. **Neither the visual direction nor the Gate 10 record (`DEC-019`) was reopened, weakened or superseded.**
  3. **Zero material unresolved Phase J routes.** Every route with a remaining text-only run is classified **B** (deliberately text-led, with governance reasons on the record), **C** (protected conversion surface) or **D** (proof-constrained). **No route is unresolved for want of design work**, and the Class **E** count is **zero**.
  4. **The homepage remains protected and accepted.** `app/page.tsx`, `components/homepage/` and `components/layout/` are not in the Phase J diff at all; the Gate 10 homepage baseline is unchanged by Phase J.
  5. **Four primitives shipped** — J9 composition set, J8 progressive disclosure, J7 state comparison, J4 system anatomy. **J2 and J5 were proposed and never earned a place; J6 was blocked by `DEC-018` §4.5 and `DEC-019` and was never built.**
  6. **Cost: 1 242 bytes of client JavaScript in one client component, and zero new dependencies.** Zero `requestAnimationFrame`, `IntersectionObserver`, `setInterval`, infinite animation, `position: sticky`, `position: fixed`, `<canvas>` or animation library was introduced.
  7. **Protected systems were not touched:** `lib/`, `app/api/`, `components/analytics/`, `components/forms/`, `db/`, `robots.ts`, `sitemap.ts`, `next.config.mjs`, `app/globals.css`, `app/resolve-motion.css`, `scripts/`, `server.cjs` — **0 files modified by any Phase J stage.** `/contact`, `/thank-you`, `/schedule-call` and 404 are byte-identical. All five analytics events are intact.
- **Sequence of record:** the Phase J stage documents `14_STAGE5_CLOSURE.md` and `15_PHASE_J_FINAL_AUDIT.md` were written **before** this acceptance and correctly recorded their status at that time as *awaiting final owner / ChatGPT acceptance*. **Formal acceptance occurred after that audit, on 2026-09-07, and is recorded here.** The audit evidence in those files is preserved unchanged; only their status wording was reconciled to this decision.
- **Reason / basis:** the release-readiness audit is complete. The primary metric — left-third dominance — moved **83.9% → 30.4%** of sections; sections sharing one left edge moved **98.2% → 50.9%**; distinct section left-starts rose **3 → 9**; visual + interactive sections rose **17 → 26**; the average longest text-only run fell **4.17 → 3.33**; and total mobile height across 18 routes fell **121 034 px → 115 532 px (−4.5%)**, with one deliberate exception (`/how-it-works`, **+531 px**, the owner-approved `StageSystem`). Responsive: **18 routes × 10 widths = 180 checks with zero horizontal overflow, zero collisions and zero clipping.** Proof discipline: **0** fabricated numbers, percentages, charts, results, ROI or client facts; the two blocked facts (`/google-ads` F9 and `/how-it-works` §2) **still render nothing and were never invented.**
- **Evidence:** `docs/28-phase-j-visual-interaction/` — `00_VISUAL_DENSITY_AUDIT.md` through `15_PHASE_J_FINAL_AUDIT.md`, plus `prototype/`.
- **Impacted files:** `docs/00-project/CURRENT_STATE.md`, `docs/00-project/DECISION_LOG.md`, `docs/28-phase-j-visual-interaction/14_STAGE5_CLOSURE.md`, `docs/28-phase-j-visual-interaction/15_PHASE_J_FINAL_AUDIT.md`. **No application source, analytics, deployment, build, lint or TypeScript configuration was changed by this decision.**
- **Supersedes:** nothing. `DEC-018` and `DEC-019` are unmodified and remain in force.
- **What this decision explicitly does NOT approve:** **pushing `test_branch` to any remote, and deploying to production** — both remain an owner decision and neither has been taken; any change to the homepage or the Gate 10 baseline; any advertising, analytics or consent change; publication readiness for any route; resolution of any owner blocker — **`/pricing` facts, the F17 `/how-it-works` real process and the conditional manufacturing route all remain blocked**; and any Core Web Vitals, LCP, CLS, INP, screen-reader, real-device, cross-browser or comprehension claim — **none was measured in this programme and no figure for any of them appears in its records.**
- **Approved by:** Project owner / orchestrator, 2026-09-07, after the release-readiness audit. Recorded by the repository worker, which has no authority to pass a phase.

### DEC-023
- **Date:** 2026-09-07
- **Status:** **Approved — PHASE J PRODUCTION DEPLOYMENT ACCEPTED.** Owner / orchestrator authorisation, executed and verified live by the repository worker.
- **Decision:** **The Phase J site-wide visual redesign is DEPLOYED TO PRODUCTION and ACCEPTED LIVE. THE RESOLVE is active in production.** The following are recorded:
  1. **Deployed source: `d88b725`** (`d88b725fc08a6ad9a6f55c5341d74ab835662002`) on `test_branch`, pushed to `origin/test_branch` and level with it.
  2. **Production `BUILD_ID` is `wARHOSqcsryOWtyx73wCC`**, replacing `uECyJCAevQKC9-wGdaodE`. Verified on the live filesystem after the switch and again after the regression pass.
  3. **Method: the accepted manual off-host artifact deployment** — off-host build → checksum-verified `tar.gz` artifact → upload to `~/deploy_staging` → extract to a fresh `~/mappedskills.com.new` → carry across only `app.js`, the `node_modules` symlink and `tmp/` → staged verification → **controlled two-rename release-directory swap** → `cloudlinux-selector restart` plus `tmp/restart.txt` → live verification. **No GitHub Actions run. No push or merge to `main`. No build on the production host. No `npm install` on the host.**
  4. **Artifact integrity: local and server SHA-256 identical** — `93cf5d7cebab5ce4b5c139ad1809c4b728777bc67feac2c8f33947efe55f61e9`, 6,503,718 bytes, 892 entries, `mappedskills-deploy-d88b725-20260907-142705.tar.gz`.
  5. **Staged verification passed on every check before the switch:** `BUILD_ID` correct · `scripts/verify-server-files.cjs` OK · all 33 `/_next/static/*` references across 22 route HTML files present · `server.cjs` present · **no `public/robots.txt`, no `lib/constants.ts`** (the stale files that forced the swap-not-overwrite rule) · **no `.env` file of any kind** · `node_modules` symlink resolving · the `GTM-K8ZQPMXP` literal inlined in the layout chunk.
  6. **Live verification passed:** **12/12 routes 200** and an unknown path 404 · **every static asset referenced by the homepage returned 200, with zero hashed-CSS 400s** · the previous release's page CSS `c697332d8788be81.css` now returns **404**, which is the positive proof the new release is serving and not a stale cache · responsive checks at **390 · 860 · 1425** with **zero horizontal overflow** and exactly one `<h1>` per route · zero browser console errors · server log clean apart from the pre-existing `[contentful]` soft-fail notice, with **no exception and no restart loop**.
  7. **Phase J components confirmed live:** `StageSystem` on `/how-it-works` (three equal stages, caption intact) · `StateComparison` on `/about` (side by side at 1425, stacked at 390, equal columns) · `ScopeList` **one-at-a-time disclosure** on `/seo` and `/google-ads`, server-sent fully `open` so the no-JS path stays complete · `/faq` native disclosure, **11 visible summaries matching 11 `FAQPage` questions**, no duplicates.
  8. **Protected functional surfaces intact:** `/contact` renders 8 labelled fields with **no budget field**, `/schedule-call` carries the Calendly path, `/thank-you` remains `noindex, nofollow`. **No production enquiry was created for testing**, and none was needed — durable persistence was already proven at `DEC-021`.
  9. **Consent and measurement verified live from a cleared browser context:** before consent, all four Consent Mode v2 signals `denied`, **zero third-party scripts, zero cookies**; after accepting analytics, **`GTM-K8ZQPMXP` loads and GA4 `G-6H7WFH2BHQ` is active, contacting Google only** — **no Meta, X, LinkedIn or Google Ads request, no `_fbp`, no `_gcl_*`** — and the footer *Analytics preferences* control reopens the banner. **No GTM or GA4 configuration was changed.**
  10. **Nothing outside the visual layer changed:** no database change, no migration run, no environment-variable change, no dependency change, no `server.cjs`/`app.js` change, and no change to analytics semantics or the approved five-event taxonomy.
  11. **Rollback preserved and deliberately not cleaned up:** `/home/mappeds1/mappedskills.com.prev-20260907-052958` holds the `uECyJCAevQKC9-wGdaodE` release intact, alongside the earlier `mappedskills.com.prev-h2-20260906-141122`. Rollback is **application-file only** — two renames plus a restart — and **no database rollback is involved, because no migration was run.**
- **One operational fact recorded rather than left as an open question:** the artifact is 6.2 MB against the 27–29 MB of the two prior releases. The difference is **`.next/cache`**, which those artifacts shipped and this one deliberately excludes — 162 MB uncompressed in the previous release, build-time only and never read at runtime. Runtime content is identical in shape (2 stylesheets, 14 chunks). **A smaller artifact is the correct outcome here, not a thinner one.**
- **Reason / basis:** Phase J was accepted at `DEC-022` with deployment explicitly withheld as an owner decision. The owner reviewed the deployment preflight, ruled **"PASS — PRODUCTION DEPLOYMENT AUTHORIZED"**, and the release was executed exactly as authorised and verified live rather than assumed.
- **Evidence:** `docs/28-phase-j-visual-interaction/` (`00`–`15`) for the redesign itself; this session's preflight and deployment records for the release; `docs/27-production-translation/22_PRODUCTION_DEPLOYMENT_ACCEPTANCE.md` §§9–12 and `23_PHASE_H2_ANALYTICS_ACTIVATION_ACCEPTANCE.md` §15 for the deployment method this release reproduced.
- **Impacted files:** `docs/00-project/CURRENT_STATE.md`, `docs/00-project/DECISION_LOG.md`. **No application source, component, style, package, deployment script, analytics, database, migration or GitHub workflow file was changed by this decision or by the deployment.**
- **Supersedes:** only the deployment limitation recorded in `DEC-022` ("does NOT approve pushing `test_branch` to any remote, and deploying to production"). **`DEC-022` is otherwise unmodified and stands as written**, as do `DEC-018`, `DEC-019`, `DEC-020` and `DEC-021`.
- **What this decision explicitly does NOT do:**
  - **It does not authorise any additional visual redesign.** Phase J is closed. No further route work, primitive, figure or interaction is approved by it.
  - **It does not alter any frozen functional or measurement system** — forms, the enquiry API, persistence, attribution, consent, the five-event taxonomy, robots, sitemap, headers, caching and booking are all unchanged and remain governed by their own decisions.
  - **It does not claim Phase H2 GA4 Key Event completion.** **`lead_form_submitted` has NOT been confirmed as a GA4 Key Event**, that item remains open and separate, and **the H2 measurement programme must not be recorded as closed until the owner confirms it.**
  - It does not resolve any owner blocker — **`/pricing` facts, the F17 `/how-it-works` real process and the conditional manufacturing route all remain blocked.**
  - It makes no Core Web Vitals, LCP, CLS, INP, screen-reader, real-device, cross-browser or user-testing claim. **None was measured, and no figure for any of them appears in these records.**
  - It does not approve deleting the preserved previous releases or the staged artifact.
- **Approved by:** Project owner / orchestrator, 2026-09-07, on review of the deployment preflight. Executed and verified by the repository worker, which has no authority to authorise a production deployment.

### DEC-024
- **Date:** 2026-09-18
- **Status:** **Approved — EXECUTED.** Owner authorisation per step; the guarded replacement itself was run by the owner.
- **Decision:** **`main` is replaced by the canonical lineage, and the lineage it replaced is preserved on a durable remote branch.** `origin/main` now equals `ef346572a1de1974b106900da583ed4e412f27a2`; `backup/main-pre-canonical-64ecf03` permanently anchors the old `64ecf0340ca19d1b46b193ecabefbb5acb974661`.
- **Reason / basis:** `main` and `test_branch` **shared no history** — `git merge-base` was empty, `main` descending from a parentless root (`de16f5c`, imported from a macOS archive carrying 524 `__MACOSX/` files). No merge or fast-forward existed. Five unreviewed GitHub Actions deployments from that lineage had been serving production since 2026-09-12, bypassing the accepted release process. Replacement was the only mechanism available, so the loss of reachability it implies was made recoverable first rather than accepted.
- **Evidence:** empty `git merge-base HEAD origin/main`; `git log --max-parents=0 origin/main` → `de16f5c`; recovery branch created and read back by raw `ls-remote` **and** the GitHub API before `main` was touched; the replacement used `--force-with-lease=refs/heads/main:64ecf0340ca19d1b46b193ecabefbb5acb974661` — never an unconditional `--force` — and the lease held, proving `main` had not drifted from the audited SHA.
- **Impacted files:** none in the working tree; repository refs only.
- **Supersedes:** the state recorded in the 2026-09-18 repository-audit block of `CURRENT_STATE.md`, which is retained as history.
- **What this decision explicitly does NOT do:** it does not authorise deleting `backup/main-pre-canonical-64ecf03`, which requires a separate owner decision after production has stabilised; and it imports **none** of the replaced lineage's design or copy work.
- **Approved by:** Project owner / orchestrator, 2026-09-18, after a twelve-gate read-only readiness audit and a focused recheck. Recorded by the repository worker, which has no authority to approve a transition.

### DEC-025
- **Date:** 2026-09-18
- **Status:** **Approved — IN FORCE, exercised by the first canonical release.**
- **Decision:** **A dependency set is keyed by the SHA-256 of the lockfile that produced it.** An unchanged lockfile carries the live `node_modules` symlink; a changed one **requires** `~/deps/<first-12-of-sha>/node_modules`, prepared beforehand as a separate approved step, and links **only the new release** to it. The release script never runs `npm install` or `npm ci`.
- **Reason / basis:** every release directory reached `node_modules` through a symlink into **one shared cPanel nodevenv tree**. Installing into it would mutate the running release and break every retained rollback target simultaneously. Keying trees by lock identity lets application and dependencies move together through the two-rename swap and the rollback.
- **Evidence:** first exercise of the model, 2026-09-18 — `[release] dependency set CHANGED (live b7dfb3c117d7 -> staged b36d87e127cf)`, `[release] linked staged release to the isolated dependency tree ~/deps/b36d87e127cf/node_modules`, `[release] the live dependency tree was NOT modified`. Verified after activation: live symlink → `~/deps/b36d87e127cf/node_modules` at Next 16.2.12, `~/mappedskills.com.prev` → shared nodevenv at Next 16.2.6, shared tree still 16.2.6.
- **Impacted files:** `scripts/deploy/release.sh`, `.github/workflows/deploy.yml`.
- **Operational note (host, VERIFIED FACT):** the npm on the CloudLinux nodevenv PATH is `npm_wrapper`, which for `install`, `i`, `add`, `list`, `la` and `ll` — from **any** directory — deletes the live application's `node_modules` symlink, relinks it to the shared tree and installs into it. `npm ci` passes through to real npm and is not itself destructive; the risk is standing in that environment at all. Dependency trees are therefore prepared with `/opt/alt/alt-nodejs22/root/usr/bin` directly under a clean `env -i`, verified, then promoted by one atomic rename. Both instruction sites say so.
- **Supersedes:** the previous assumption that every release shares one dependency tree.
- **Approved by:** Project owner / orchestrator, 2026-09-18.

### DEC-026
- **Date:** 2026-09-18
- **Status:** **Approved — IN FORCE.**
- **Decision:** **Production deploys only by explicit, manual `workflow_dispatch` from `refs/heads/main`, naming the exact commit, and only through the `production` GitHub environment with its required-reviewer approval.** A push to `main` runs verification and build only and **cannot** deploy.
- **Reason / basis:** the replaced lineage's workflow deployed **on every push**, by `rsync --delete` into the live directory, with a host `npm install`, an overwritten `.env` and trust-on-first-use SSH. That is how production diverged from the control state without an approved release. Deployment is now a deliberate act with a named commit, a human approver and fail-closed checks.
- **Evidence:** at `ef346572`, `deploy` and `rollback` both require `github.event_name == 'workflow_dispatch' && github.ref == 'refs/heads/main'`; the job fails closed if the `production` environment lacks a required-reviewers rule, and again if the typed 7-character confirmation does not match `GITHUB_SHA`; the SSH host key is pinned from `SSH_KNOWN_HOSTS`; `NEXT_PUBLIC_GTM_ID` is a required build input, proven compiled into the bundle. Demonstrated twice on 2026-09-18: the transition push (run `35375561145`) ran verify only with deploy and rollback **skipped**; the release (run `35376858153`) required the owner's environment approval before it proceeded.
- **Impacted files:** `.github/workflows/deploy.yml`, `scripts/deploy/release.sh`.
- **Supersedes:** the deploy-on-push workflow carried by the replaced `main` lineage.
- **Approved by:** Project owner / orchestrator, 2026-09-18.

### DEC-027
- **Date:** 2026-09-18
- **Status:** **Approved — VERIFIED IN PRODUCTION.**
- **Decision:** **The cPanel/LiteSpeed process environment is authoritative for every runtime value** — `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`. **`.env` is retained as an unchanged fallback and is no longer the sole source of the Contentful credentials.**
- **Reason / basis:** the Phase J-era record (`docs/27-production-translation/22_PRODUCTION_DEPLOYMENT_ACCEPTANCE.md` §4) correctly recorded that Contentful existed **only** in `.env`, which made that file load-bearing. The owner has since migrated those names into the cPanel application environment, so a release can no longer silently break Contentful by mishandling one file.
- **Evidence:** all six names present in the host `SetEnv` configuration and on the request-serving worker's environment, with `NODE_ENV=production`; read by NAME only, **no value was read, printed or recorded**. The release carried `.env` across byte-for-byte and its hash is unchanged before and after deployment.
- **Impacted files:** none in the repository; host configuration and `docs/00-project/CURRENT_STATE.md`.
- **Supersedes:** the "`.env` is load-bearing / sole Contentful authority" statement, **as a description of the present**. The Session 34 record remains true of its own date and is unaltered.
- **Approved by:** Project owner / orchestrator, 2026-09-18.

### DEC-028
- **Date:** 2026-09-18
- **Status:** **Approved — PRODUCTION DEPLOYMENT ACCEPTED. This is the current production baseline.**
- **Decision:** **The canonical commit `ef346572a1de1974b106900da583ed4e412f27a2` is DEPLOYED TO PRODUCTION and ACCEPTED LIVE.** Production `BUILD_ID` is **`Q0DukKVy3o8Idhld4POyk`**, replacing `29BmkWTP3aquUcUXu2KrR`; live Next is **16.2.12**.
- **Reason / basis:** the final pre-deployment gate passed on repository state, GitHub configuration, the prepared dependency tree and rollback coherence; the owner then dispatched the release and approved the `production` environment gate.
- **Evidence:** workflow run `35376858153` (`workflow_dispatch`, `main`, `GITHUB_SHA ef346572…`, `action=deploy`, `confirm=ef34657`) — verify **success**, release **success**, rollback **skipped**; deployment record `6529950216` → success; `[release] swapped: live=Q0DukKVy3o8Idhld4POyk  previous=29BmkWTP3aquUcUXu2KrR`; the workflow's own smoke test reported the live site serving this build with `GTM-K8ZQPMXP` compiled in. Post-deployment verification: seven commercial routes at exactly one non-empty `<h1>`; the two-variant brand lockup live and the legacy mark unreferenced; GTM loading GA4 `G-6H7WFH2BHQ` only after consent, with the three advertising signals still denied and Meta inert; 21 routes plus `robots.txt` and `sitemap.xml` at 200; a 390/860/1425 smoke with no overflow, collision or console error.
- **Impacted files:** `docs/00-project/CURRENT_STATE.md`, `docs/00-project/DECISION_LOG.md`, `docs/00-project/handoffs/CANONICAL_PRODUCTION_CLOSURE_2026-09-18.md`. **No application source changed in this closure.**
- **Supersedes:** `DEC-023` **as the description of the current production baseline only**. `DEC-023` is retained unchanged as the record of the 2026-09-07 Phase J release.
- **What this decision explicitly does NOT do:**
  - It does not reopen or extend **Phase J**, which remains accepted (`DEC-022`, `DEC-023`), nor THE RESOLVE (`DEC-018`).
  - It does not approve either UI stash. `c1acf87` and `b36b243` remain **unapproved owner-review candidates, not deployment blockers**, and must not be applied, dropped or combined.
  - It does not clear the recorded **lint backlog** (21 errors, 7 warnings, pre-existing), which CI reports without blocking.
  - It makes no Core Web Vitals, accessibility, real-device or cross-browser claim — **none was measured**.
  - It does not authorise deleting `backup/main-pre-canonical-64ecf03`, `~/mappedskills.com.prev` or `~/deps/b36d87e127cf`.
  - It does not resolve any owner content blocker (`/pricing` facts, the `/how-it-works` real process, the conditional manufacturing route).
- **Approved by:** Project owner / orchestrator, 2026-09-18 — dispatched and environment-approved by the owner in GitHub. Verified and recorded by the repository worker, which has no authority to accept a deployment.

---

> **UI REVAMP PROGRAMME — GATE 0 CLOSURE (2026-10-08).** `DEC-029` – `DEC-033` below were made by the owner on review of
> `docs/ui-revamp/GATE_0_BASELINE_AUDIT.md`. They govern the UI revamp programme defined by
> `docs/ui-revamp/MappedSkills_UI_Revamp_Master_Handoff.md` and `…_Implementation_Plan.md`. **No application code, dependency,
> workflow or production system was changed by any of them.** Repository activity between `DEC-028` (2026-09-18) and
> 2026-10-07 was not recorded in this log at the time; it is described as audited fact in the Gate 0 audit §2.1 and is
> **not** retro-approved by these entries.

### DEC-029
- **Date:** 2026-10-08
- **Status:** **Approved.**
- **Decision:** **THE RESOLVE (`DEC-018`, validated `DEC-019`, extended by `DEC-022`) remains the approved strategic/design foundation for the UI revamp.** Gate 1 may explore **2–3 evolutionary visual and motion directions within that foundation**. These are **not limited to cosmetic variation**: they may substantially elevate typography, composition, grid, hierarchy, spacing, surfaces, proof presentation, interaction, motion and responsive composition.
  - **Must be preserved:**
    - ivory / ink / tangerine restraint;
    - evidence-first communication;
    - the analytical/performance character;
    - the marker language (named · anonymous · unattributed · owned);
    - honesty around proof;
    - strategic clarity;
    - avoidance of generic agency/AI aesthetics.
  - **Gate 1 must NOT reopen:** business strategy, approved positioning, service taxonomy, conversion architecture, SEO strategy or analytics architecture.
  - The goal is **evolution and elevation, not replacement** with an unrelated visual identity.
- **Reason / basis:** Gate 0 audit §19 found that the site's strongest qualities *are* THE RESOLVE's principles. The Master Handoff's request for "2–3 directions" needed bounding against an approved, binding direction (audit §21.0 Q1).
- **Evidence:** `docs/ui-revamp/GATE_0_BASELINE_AUDIT.md` §§1, 19, 21.0, 24; `docs/24-resolve-governance/00_ACTIVE_DIRECTION.md` §4.
- **Impacted files:** `docs/00-project/DECISION_LOG.md`, `docs/00-project/CURRENT_STATE.md`, `docs/ui-revamp/*` (annotations only).
- **Interpretation note:** `00_ACTIVE_DIRECTION.md` §5 already lists exact type sizes, section padding, grid ratios, composition and exact hex values (with contrast floors and roles preserved) as non-binding. A Gate 1 direction proposing to change a **§4 binding characteristic** — e.g. introducing sticky/fixed elements, imagery, a second accent or a monospace face — must name the characteristic and justify it for owner approval. It is not pre-authorised by this decision.
- **Supersedes:** nothing. Read with `DEC-018`.
- **Approved by:** Project owner / orchestrator, 2026-10-08 (Gate 0 closure). Recorded by the repository worker.

### DEC-030
- **Date:** 2026-10-08
- **Status:** **Approved.**
- **Decision:** **The UI changes introduced by commit `1557f74` (2026-10-05, "style: update section spacing, hero alignment, header sticky, and page-specific layout fixes") are UNAPPROVED REGRESSIONS.** No repository evidence records an approval for them. **They do not define the Gate 1 baseline.** The approved design intent is THE RESOLVE (`DEC-018`) as extended by Phase J (`DEC-022`).
  - **The commit is NOT reverted.** Each regression is to be corrected deliberately inside its owning approved workstream, not by an indiscriminate `git revert`. The commit also carries research, rich-text, Contentful-client and page-specific changes that are out of scope for this decision.
  - **Recorded regressions:**

    | Behaviour introduced by `1557f74` | Conflicts with | Owning workstream |
    |---|---|---|
    | Header `relative z-40` → **`sticky top-0 z-50`** (`components/layout/Header.tsx`). Causes the mobile-menu CTA defect (audit §12 R1) | `DEC-018` / `00_ACTIVE_DIRECTION.md` §4.5 "0 fixed / sticky elements"; frozen CTA architecture ("no sticky bar") | 4D Navigation & Global Chrome. The **live defect** is tracked separately as `LIVE-1` |
    | Global `section { py-16 }` → `py-[50px]`; `Section` → `py-[50px]`; every homepage section → `py-[50px]` | Validated Resolve rhythm (fluid section spacing, `DEC-019` homepage baseline, Phase J) | 4C Spacing & Layout |
    | `CommercialHero` and `RouteHero` fixed `pb-[65px] pt-[70px]` replacing fluid `clamp(…)` padding | Same | 4C |
    | **Phase J opener modes removed** from `CommercialHero` / `RouteHero` (`OPENER_GRID/RAIL/MAIN` no longer applied; `mode` prop now ignored) | `DEC-022` (Phase J Stage 3 opener system) | 4C / 4F |
    | **Reading-measure cap removed** from hero ledes (`max-w-[58ch]` → column at `60vw`) → ≈104–118-character lines. `BoundaryBlock` / `/services` copy also runs at ≈130–161 characters | `--resolve-measure: 58ch`; Phase J "never changes the reading measure" | 4A / 4C |
- **Reason / basis:** owner review of Gate 0 audit §§2.1, 8, 12 and 22 (X3). Per the Master Handoff hierarchy, implemented behaviour (rank 4) does not override approved decisions (rank 1).
- **Evidence:** `git show 1557f74`; audit §6, §8, §12 R1/R8, §20 C3.
- **Impacted files:** documentation only.
- **Supersedes:** nothing. **It does not approve or reject any other post-`DEC-028` commit**; those remain unrecorded audited facts.
- **Approved by:** Project owner / orchestrator, 2026-10-08. Recorded by the repository worker.

### DEC-031
- **Date:** 2026-10-08
- **Status:** **Approved.**
- **Decision:** **`DEC-012` and `docs/05-content/CLAIMS_AND_EVIDENCE_GOVERNANCE.md` remain controlling for all proof in the UI revamp.**
  - **Withheld client figures are not to be invented, restored, inferred or exposed.** This covers `lib/case-study-proof.ts`, which withholds figures, the derived headline result, testimonials and star ratings for `seo-ameba-software`, `seo-for-home-decor-brand` and `google-ads-for-online-courses`. Removing a slug from that list remains a separate owner decision.
  - **Gate 1 must design a strong proof system that works without quantitative client figures.** It may use legitimate available evidence: qualitative outcomes, client quotations (only where publication is approved in writing — currently none are), methodology, challenge / intervention / outcome narratives, verified facts, and first-party measurements shown with their stated scope and limits.
  - **Gate 1 must not fabricate dashboard metrics, charts, counters, uplift figures or performance claims**, including as "illustrative" placeholders in prototypes.
  - **The contradiction is acknowledged as a real issue but is NOT fixed by this decision.** The homepage reads *"We have no case studies to show you."* and `/work` reads *"There are no published case studies here…"*, while three case studies are published. The fix is a separately authorised content/proof correction (tracked as `LIVE-2`). The copy is LOCKED until that authorisation.
- **Reason / basis:** Gate 0 audit §11 and §21.0 Q3.
- **Evidence:** `lib/case-study-proof.ts`; `components/homepage/HomepageAccountability.tsx:108`; `app/(pages)/work/page.tsx:80`; production `/work` (three published entries, verified 2026-10-07).
- **Impacted files:** documentation only.
- **Supersedes:** nothing.
- **Approved by:** Project owner / orchestrator, 2026-10-08. Recorded by the repository worker.

### DEC-032
- **Date:** 2026-10-08
- **Status:** **Approved.**
- **Decision:** **Approved positioning (`DEC-005`) and the approved service taxonomy (`docs/01-business/SERVICE_ARCHITECTURE.md`, as rendered on `/services`) govern the UI revamp.** The Master Handoff's "Business Context" mentions "websites" and "social media". **These are contextual descriptions only and do not authorise any expansion of the service positioning.**
  - `SERVICE_ARCHITECTURE.md` explicitly excludes standalone web development and social media management as service lines.
  - Paid social appears only as an optional acquisition channel (`/social-media-ads`).
  - **The exclusions stand.**
- **Also clarified:** `CLAUDE.md` § "Current Strategic Status" still presents the three-pillar journey "GET FOUND → CONVERT → AUTOMATE → GROW" as the working hypothesis. That is the `DEC-004` framing, **superseded by `DEC-005`** (2026-08-31). Where `CLAUDE.md` and `DEC-005` disagree, **`DEC-005` governs**. `CLAUDE.md` was not edited by this decision.
- **Reason / basis:** Gate 0 audit §21.0 Q4.
- **Evidence:** `DEC-004` (superseded), `DEC-005`; `SERVICE_ARCHITECTURE.md` lines 61 and 158–169; `app/(pages)/services/page.tsx:286–290`; `docs/00-project/ASSUMPTIONS_AND_OPEN_QUESTIONS.md` §1.
- **Impacted files:** `docs/ui-revamp/MappedSkills_UI_Revamp_Master_Handoff.md` (annotation added; original wording retained), documentation only.
- **Supersedes:** nothing. Read with `DEC-005`.
- **Approved by:** Project owner / orchestrator, 2026-10-08. Recorded by the repository worker.

### DEC-033
- **Date:** 2026-10-08
- **Status:** **Approved — GATE 0 CLOSED (with exceptions).**
- **Decision:** **UI Revamp Gate 0 (Baseline & Full-Site UI Audit) is closed.**
  - **Evidence of record:** `docs/ui-revamp/GATE_0_BASELINE_AUDIT.md` and `docs/ui-revamp/gate-0-evidence/screenshots/`.
  - **Three live issues are carried forward as tracked items, outside the UI revamp design scope** (`docs/ui-revamp/PROGRAMME_RISKS_AND_LIVE_ISSUES.md`):

    | Item | Class | Problem |
    |---|---|---|
    | `LIVE-1` | live production defect | Mobile-menu CTAs are unreachable under the sticky header |
    | `LIVE-2` | live content/proof defect | Proof-copy contradiction |
    | `PROC-1` | deployment/process risk | Commit `eff9704` makes a push to `main` deploy to production and downgrades the required-reviewer check to a warning. This conflicts with `DEC-026` and with the programme's staging gate |

  - **None is fixed by this decision.** None may be absorbed into a redesign task.
- **Reason / basis:** owner review of the Gate 0 audit and closure prompt.
- **Impacted files:** documentation only.
- **What this decision explicitly does NOT do:**
  - start Gate 1;
  - approve any commit after `DEC-028`;
  - revert anything;
  - change any workflow, secret or production system.
- **Approved by:** Project owner / orchestrator, 2026-10-08. Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 1 DIRECTION SELECTION (2026-10-08).** Made by the owner on review of
> `docs/ui-revamp/GATE_1_DESIGN_DIRECTIONS.md`, `docs/ui-revamp/gate-1/mobile-refinement/MOBILE_UX_RESOLUTION.md` (pass 1) and
> `docs/ui-revamp/gate-1/mobile-refinement/pass-2/MOBILE_UX_PASS_2.md` (pass 2). It does not amend `DEC-029` – `DEC-033`.

### DEC-034
- **Date:** 2026-10-08
- **Status:** **Approved.**
- **Decision:** **Direction C — Resolution is the selected visual direction for UI Revamp Gate 2 implementation.**
  - **Approved reference (frozen):** `docs/ui-revamp/gate-1/prototypes/direction-c-resolution-approved.html`,
    sha256 `193b4ab8e536da39489f768ae8c707c560d8742cdcc9c1d71862ced28da205a3`. It is the pass-2 prototype
    (frozen byte-for-byte as `direction-c-resolution-r2.html`, sha256 `046dcc29…bf91340`) plus the two navigation
    rulings below (items 4 and 6), and nothing else. `direction-c-resolution.html` is the working copy and was identical
    to it when this entry was recorded.
  - **Scope of approval:** the visual direction, and **Gate 2 implementation** of it in the Next.js application on
    branch `ui-revamp` for the three representative pages — homepage `/`, services overview `/services` and the SEO
    service page `/seo` — including the global chrome as rendered on those three pages.
  - **Owner rulings recorded with the selection:**

    | # | Ruling | How it is applied |
    |---|---|---|
    | 1 | Direction C approved for Gate 2 | This entry |
    | 2 | **Retain the earlier placement of the `/seo` 12-month-plus horizon disclosure** (pass-2 F1, C3) | The horizon panel stays directly after the opener CTAs on mobile and first (left) beside the situation block on desktop. *Recorded interpretation:* "earlier placement" is read as the pass-2 position, which the pass-2 report recommended keeping; it is **not** read as a reversion to the pre-pass-2 order |
    | 3 | **Conditionally approve** the pass-1 §2.1 interface labels — "How to read the marks"; "One mark per run. A named run would be filled."; "4 capabilities" · "2 capabilities" · "1 capability"; "Horizon" · "If it is urgent" · "Not promised" — **subject to accuracy and consistency with the evidence standard** (`DEC-012`, `DEC-031`) | Each label is used only where it is literally true of what it labels, and is re-checked against the page it appears on |
    | 4 | **Resolve the duplicate "Contact Us"** in the mobile open-menu state, without changing destinations or tracking | While the menu is open (below 1200px) the header bar's CTA pair is withdrawn; the menu's own pair, which comes first, remains. Same destinations, same labels, nothing added |
    | 5 | **Preserve** the simplified mobile Capture/Convert chain treatment (pass-2 F3) unless usability testing shows confusion | Stage labels stay hidden below 900px |
    | 6 | **Add a simple "Company" heading** to the mobile navigation (pass-2 F4) | A "Company" group label precedes, and names, the company links |
    | 7 | **Preserve** all previously approved copy, IA, SEO, conversion, analytics and backend boundaries | Governs Gate 2 |

- **What this decision does NOT do:**
  - approve **staging or production deployment**, a merge to `main`, or any change to a workflow, secret or production system;
  - approve **Gate 3** (representative-page approval), or extend Direction C to any other route (that is Gate 4);
  - approve the prototype's **new microcopy** beyond ruling 3. The bracketed placeholder lines remain unapproved
    (`GATE_1_DESIGN_DIRECTIONS.md` §4.5), and so does other prototype-only wording that has no source in the repository;
  - adopt the Gate 1 §11 borrowings (Direction A's document register, Direction B's diagnosis figure). They remain proposals;
  - fix or absorb `LIVE-1`, `LIVE-2` or `PROC-1` (`DEC-033`).
- **Reason / basis:** owner review of the Gate 1 package and both mobile passes.
- **Evidence:** the documents named above; Gate 2 Phase A regression run `docs/ui-revamp/gate-1/mobile-refinement/gate2-phase-a/`.
- **Impacted files:** `docs/ui-revamp/gate-1/prototypes/direction-c-resolution{,-approved,-r2}.html`, `docs/ui-revamp/gate-1/README.md`, `docs/00-project/CURRENT_STATE.md`, this log.
- **Supersedes:** nothing. Read with `DEC-018`, `DEC-029`, `DEC-031`, `DEC-033`.
- **Approved by:** Project owner / orchestrator, 2026-10-08 (Direction C approval & Gate 2 authorisation). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 3 DESIGN DECISIONS AND FINAL ACCESSIBILITY CORRECTION (2026-10-08).** Made by the owner on
> review of `docs/ui-revamp/GATE_3_FINAL_ACCEPTANCE.md` (§5, decision matrix). It does not amend `DEC-034`.
> **This entry is NOT the Gate 3 approval.** Gate 3 remains unapproved until the owner records it.

### DEC-035
- **Date:** 2026-10-08
- **Status:** **Approved** (the three design decisions and the correction authorisation below). **Gate 3 itself: not approved by this entry.**
- **Decision — three Gate 3 design decisions** (`GATE_3_REVIEW.md` §5 decisions 4, 6 and 7; `GATE_3_FINAL_ACCEPTANCE.md` §5 items 5, 7 and 8):

  | # | Decision | Condition / interpretation as recorded |
  |---|---|---|
  | 1 | **Evidence / Method / Limitation / Claim plate labels are approved** on the Direction C evidence plates | **Subject to accurate evidence representation** (`DEC-012`, `DEC-031`): a label is used only where it is literally true of what it labels; Limitation is never collapsed or hidden; a plate never carries a number without its scope. Withheld figures stay withheld |
  | 2 | **The always-open Capture / Convert / Measure presentation is approved** | All rows and links visible, nothing gated. This retires the homepage's auto-advancing Phase D tablist on `/` for the Direction C implementation |
  | 3 | **The `/seo` 12-month-plus horizon panel is approved immediately after the opening CTAs** | This confirms the `DEC-034` ruling-2 interpretation (the pass-2 position). The panel carries the full approved copy, unchanged; its measure cap (Gate 3 remediation R6) stays |

- **Also authorised by the owner with this decision (implementation scope only):**
  - **A1:** fix the CTA text-spacing / narrow-screen overflow (WCAG 1.4.10 / 1.4.12) without changing CTA wording, destinations or analytics;
  - **A2:** make the Traffic / Enquiries selected state visible in forced-colours / High Contrast mode.
  - Both were implemented and verified on 2026-10-08 (`GATE_3_FINAL_ACCEPTANCE.md` §10).
- **Retained as an outstanding acceptance requirement:** real-device and cross-browser testing. That means real Android Chrome, real iPhone Safari, desktop Safari, desktop Firefox, and VoiceOver. It has **not** been performed.
- **What this decision does NOT do:**
  - approve **Gate 3** (no unconditional or conditional Gate 3 approval is recorded here);
  - approve Gate 4, a merge to `main`, staging or production deployment;
  - change approved copy, URLs, metadata, analytics or any route other than `/`, `/services`, `/seo` and their Direction C chrome;
  - close or alter `LIVE-1`, `LIVE-2` or `PROC-1` (`DEC-033`).
- **Reason / basis:** owner review of the Gate 3 final acceptance pack.
- **Evidence:** `docs/ui-revamp/GATE_3_FINAL_ACCEPTANCE.md`; `docs/ui-revamp/gate-3-acceptance/evidence/`.
- **Impacted files:**
  - `app/direction-c.css` (A1), `app/direction-c-pages.css` (A2);
  - `docs/ui-revamp/GATE_3_FINAL_ACCEPTANCE.md`, `docs/00-project/CURRENT_STATE.md`, this log.
- **Supersedes:** nothing. Read with `DEC-012`, `DEC-031`, `DEC-033`, `DEC-034`.
- **Approved by:** Project owner / orchestrator, 2026-10-08 (Gate 3 final accessibility correction brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 3 FORMAL APPROVAL (2026-10-08).** Made by the owner on review of the Gate 3 checkpoint audit
> and `docs/ui-revamp/GATE_3_FINAL_ACCEPTANCE.md` (§§10–11). It does not amend `DEC-034` or `DEC-035`.
> **This is the UI-revamp Gate 3 ("Direction Approval"). It is NOT Gate 3 of `QUALITY_GATES.md` ("Search Opportunity
> Validation"), which is unaffected.**

### DEC-036
- **Date:** 2026-10-08
- **Status:** **Approved — UI Revamp Gate 3: APPROVED WITH RECORDED EXCEPTIONS.**
- **Decision — what is approved** (build `--Lpst9W4pkiythkOhmVS`, checkpointed on `ui-revamp`):
  - **Direction C on `/`, `/services` and `/seo`**, with the approved header, navigation, mobile menu and footer as rendered on those routes;
  - the **Gate 2 implementation** and its documented intended differences (`GATE_2_IMPLEMENTATION.md` §5, D1–D12),
    including **D10**: the duplicate footer `mailto` icon is removed. The functional email link (`mailto:info@mappedskills.com`,
    with its visible address) remains in the Direction C footer on all three routes. This was verified 2026-10-08;
  - **Gate 3 remediation R1–R7** (`GATE_3_REMEDIATION.md`);
  - **accessibility corrections A1 and A2** (`GATE_3_FINAL_ACCEPTANCE.md` §10);
  - the decisions already approved in **`DEC-034`** and **`DEC-035`**, and owner directions D1–D7;
  - the approved typography, evidence presentation, navigation and interaction patterns as implemented;
  - the documented **non-blocking limitations** E2–E5 (`GATE_3_FINAL_ACCEPTANCE.md` §10.6).
- **Mandatory conditions (outstanding):**

  | # | Condition | Required before |
  |---|---|---|
  | **E1** | **Real-device and cross-browser QA:** real Android Chrome; real iPhone Safari; desktop Safari; desktop Firefox; VoiceOver; relevant larger-text and High Contrast checks (checklist `GATE_3_FINAL_ACCEPTANCE.md` §2.1 + §10.6 E1). **Any material issue found is corrected and retested** | **Staging approval** |
  | **E6** | **GTM trigger research and validation** (triggers keyed on legacy DOM). Existing analytics, conversion tracking and approved event semantics are preserved | **Staging** |
  | — | **Protected behaviour:** approved copy, URLs, headings, metadata, canonical tags, Open Graph, JSON-LD and analytics do not change without separate approval | Always |
  | — | **`LIVE-1`, `LIVE-2`, `PROC-1` remain OPEN** (`DEC-033`). **No merge of `ui-revamp` into `main` while `PROC-1` is unresolved** | Any merge |

  E1 and E6 do **not** block Gate 4 planning or controlled local implementation.
- **Also approved with this decision (checkpoint housekeeping):**
  - `docs/ui-revamp/gate-2/screenshots/app/` is **excluded from the Git checkpoint**. Its captures predate Gate 3 remediation and are superseded by later evidence. They are retained locally, not deleted;
  - `.claude/launch.json` is ignored by a narrowly scoped `.gitignore` entry;
  - QA-script portability: `playwright-core` `1.62.1` and `axe-core` `4.13.0` are added as exact-pinned `devDependencies`. Eight reusable scripts now resolve them from the project, and 21 scripts are labelled archival (`docs/ui-revamp/QA_REGRESSION_RUNBOOK.md`).
- **Gate 4 boundary:** this decision **satisfies the Gate 3 prerequisite** for Gate 4 planning and controlled local
  implementation. **Gate 4 begins only on a separate owner instruction.**
- **What this decision does NOT do:**
  - start Gate 4;
  - approve a merge to `main`, a push, or staging or production deployment;
  - close or alter `LIVE-1`, `LIVE-2` or `PROC-1`, or conditions E1 and E6;
  - extend Direction C to any route other than `/`, `/services` and `/seo`;
  - approve any copy, URL, metadata, structured-data or analytics change.
- **Reason / basis:** owner review of the Gate 3 checkpoint audit (2026-10-08). All automated suites pass on the final build, and every
  portable suite reproduced its recorded result on re-run. The approval is conditional because no WebKit, Gecko, real-device or screen-reader evidence exists (E1).
- **Evidence:** `docs/ui-revamp/GATE_3_FINAL_ACCEPTANCE.md`; `docs/ui-revamp/gate-3-acceptance/evidence/`;
  `docs/ui-revamp/QA_REGRESSION_RUNBOOK.md`.
- **Impacted files:**
  - this log; `docs/00-project/CURRENT_STATE.md`;
  - `docs/ui-revamp/GATE_3_FINAL_ACCEPTANCE.md`, `GATE_2_IMPLEMENTATION.md`, `gate-2/README.md`, `QA_REGRESSION_RUNBOOK.md`;
  - `.gitignore`; `package.json`, `package-lock.json`; the eight scripts listed in the runbook §3.
- **Supersedes:** nothing. Read with `DEC-012`, `DEC-031`, `DEC-033`, `DEC-034`, `DEC-035`.
- **Approved by:** Project owner / orchestrator, 2026-10-08 (Gate 3 formal approval and local Git checkpoint brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 · B1 AUTHORISATION (2026-10-08).** Made by the owner on review of the Gate 4 B0 checkpoint
> (`docs/ui-revamp/GATE_4_B0_QA_FOUNDATION.md`, commit `9656df7`) and `docs/ui-revamp/gate-4/b0/GATE_4_B1_ENTRY_CRITERIA.md`.
> It does not amend `DEC-033` – `DEC-036`.

### DEC-037
- **Date:** 2026-10-08
- **Status:** **Approved — Gate 4 Batch B1 (global chrome) authorised. Batch B1 only.**
- **Decision:**

  | # | Owner decision | As recorded |
  |---|---|---|
  | O1 | **B1 implementation authorised** | Direction C header, navigation, mobile menu and footer on every route. **Chrome only**: no page body changes |
  | O2 | **Chrome strategy S3** (`docs/ui-revamp/GATE_4_CHROME_MIGRATION_STRATEGY.md`) | All routes switch to Direction C chrome now. An explicit, initially empty **legacy-chrome exception list** is retained as the rollback mechanism. The legacy `Header`/`Footer` and the `ChromeSwitch` seam are **retained until B11**, which alone may remove them |
  | O3 | **Batch-by-batch migration approved** | Each later batch needs its own validation and an explicit owner instruction. B2 is **not** authorised by this entry |
  | — | **LIVE-1** | B1 may eliminate the legacy mobile-navigation defect **on the development branch**. **This does not resolve the production incident. LIVE-1 remains OPEN** pending a separate production decision (`DEC-033`) |
  | — | **High Contrast chevron border** (Gate 3 E4) | **Not added.** The optional decorative border is declined |
  | — | **E6** (GTM and consent investigation, incl. OBS-1) | Remains a **separate pre-staging requirement**. No analytics or consent code is changed in B1 |
  | — | **E1** (real-device and cross-browser QA) | Remains **mandatory before staging** |

- **What this decision does NOT do:**
  - authorise B2 or any later batch;
  - authorise any change to page bodies, approved copy, headings, URLs, routing, link destinations, forms, `BookingLink`, analytics, GTM, consent, SEO metadata, canonicals, Open Graph, JSON-LD, Contentful integration or dependencies;
  - approve staging or production deployment, a push, or a merge to `main` (`PROC-1` remains open);
  - close `LIVE-1`, `LIVE-2`, `PROC-1`, `E1`, `E6`, `KD-02` or `OBS-1`.
- **Acceptance:** `docs/ui-revamp/gate-4/b0/GATE_4_B1_ENTRY_CRITERIA.md` §B, run against the B0 baseline of record (`docs/ui-revamp/gate-4/b0/evidence/baseline/`).
- **Evidence / report:** `docs/ui-revamp/GATE_4_B1_GLOBAL_CHROME.md`; `docs/ui-revamp/gate-4/b1/evidence/`.
- **Supersedes:** nothing. Read with `DEC-030`, `DEC-033`, `DEC-034`, `DEC-036`.
- **Approved by:** Project owner / orchestrator, 2026-10-08 (Gate 4 B1 global chrome migration brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — E6-A1 R1 CONSENT SAFEGUARD: LOCAL IMPLEMENTATION AUTHORISED (2026-10-08).** Made by the owner on review of
> `docs/ui-revamp/GATE_4_E6_GTM_CONSENT_AUDIT.md` and `docs/ui-revamp/gate-4/e6/E6_R1_CONSENT_SAFEGUARD_DESIGN.md`.
> It does not amend `DEC-020`, `DEC-021` or `DEC-033` – `DEC-037`.

### DEC-038
- **Date:** 2026-10-08
- **Status:** **Approved — E6-A1 remediation R1, Approach A, local implementation and local validation only.**
- **Context:** the E6 audit found that a returning visitor who had accepted analytics, landing on a route-level `notFound()` response (served as Next's client-rendered `__next_error__` shell, in which the consent bootstrap never executes), reached the GTM container with no Consent Mode command in `dataLayer`. This breaches the application's own contract that the denied default comes first. It was observed locally against a stubbed container. **It is not established that any tag actually executed without authorisation, or that any regulatory requirement was breached.** The behaviour of the real container under unset consent is RESEARCH REQUIRED (GTM Preview).
- **Decision:**
  - **Approach A selected:**
    - the inline script that injects `gtm.js` first establishes the denied default, plus the replay of a stored grant, wherever no default exists;
    - a banner decision first establishes the denied default where none exists.
  - **Scope:** limited to consent initialisation before GTM loads (`lib/consent.ts`, `lib/gtm.tsx`, unit tests, evidence). This is a narrowly scoped exception to the locked consent implementation. The bootstrap, the two loader gates, stored values, consent choices, the advertising-denied rule, and every event name and payload remain unchanged.
  - **R2** (serving the full layout for segment `notFound()`) remains **separate and unauthorised**.
- **What this decision does NOT do:** approve staging or production deployment, a hotfix branch, a push, or a merge to `main`; change the published GTM container; start B2; close **E6, OBS-1, OBS-6, PROC-1, LIVE-1, LIVE-2 or E1**.
- **Evidence / report:** `docs/ui-revamp/gate-4/e6/E6_R1_IMPLEMENTATION_ACCEPTANCE.md`; `docs/ui-revamp/gate-4/e6/evidence/r1-impl/`.
- **Supersedes:** nothing. Read with `DEC-020`, `DEC-021`, `DEC-036`, `DEC-037`.
- **Approved by:** Project owner / orchestrator, 2026-10-08 (E6 R1 consent safeguard local implementation brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 BATCH B2 (PAID MEDIA SERVICE PAGES): LOCAL IMPLEMENTATION AUTHORISED (2026-10-08).** Made by the
> owner in the Gate 4 B2 brief. It does not amend `DEC-034` – `DEC-038`.

### DEC-039
- **Date:** 2026-10-08
- **Status:** **Approved — Gate 4 Batch B2 only: `/google-ads` and `/social-media-ads` page bodies in Direction C. Local implementation and local validation only.**
- **Decision:**
  - redesign the two existing routes with the approved Direction C system, reusing its primitives; preserve the B1 header and footer and the R1 consent safeguard;
  - motion per `GATE_4_MOTION_SPECIFICATION.md`: no new library, no new signature animation, reduced motion and no-JS respected;
  - protected without further approval: copy, CTA text and destinations, `BookingLink`, `ContactForm`, event names and payloads, GTM selectors and tracking attributes, consent initialisation, lead attribution, conversion measurement, metadata, canonicals and JSON-LD;
  - an early E1 real-device checkpoint is prepared after B2. Browser emulation does not satisfy E1.
- **What this decision does NOT do:** authorise B3 or any later batch; change the approved `/`, `/services` or `/seo` bodies, the global header/footer, consent or GTM code; approve a push, merge, staging or production deployment, or a hotfix branch; close **E1, E6, OBS-1, OBS-6, LIVE-1, LIVE-2, KD-02 or PROC-1**.
- **Evidence / report:** `docs/ui-revamp/GATE_4_B2_PAID_MEDIA_PAGES.md`; `docs/ui-revamp/gate-4/b2/evidence/`.
- **Supersedes:** nothing. Read with `DEC-034`, `DEC-036`, `DEC-037`, `DEC-038`.
- **Approved by:** Project owner / orchestrator, 2026-10-08 (Gate 4 B2 paid media service pages brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 BATCH B3 (CAPABILITY SERVICE PAGES): LOCAL IMPLEMENTATION, VALIDATION AND LOCAL CHECKPOINT AUTHORISED (2026-10-09).**
> Made by the owner in the Gate 4 B3 brief and its final-validation instruction. It does not amend `DEC-034` – `DEC-039`.

### DEC-040
- **Date:** 2026-10-09
- **Status:** **Approved — Gate 4 Batch B3 only: `/ai-seo`, `/lead-generation` and `/conversion-optimization` page bodies in Direction C, with the shared `Figure`, `DataTable` and `ScopeRows numbered` primitives introduced with these first consumers. Local implementation, local validation and local commits only, subject to every mandatory B3 acceptance criterion.**
- **Decision:**
  - recompose the three existing routes with the approved Direction C system; preserve the B1 header and footer, the R1 consent safeguard, copy, headings, CTA text and destinations, `BookingLink`, `ContactForm`, event names and payloads, metadata, canonicals and JSON-LD;
  - the existing calibrated display fallback (`dc-fallback-b`, 92%, B2) may be opted into per page where measurement requires it; no new fallback variant unless measurement requires one;
  - complete the B3 validation (navigation, E6 consent probe and I1–I9, analytics, SEO/JSON-LD, inventory, accessibility, responsive, pixel, CLS, Gate 2/3 suites, static gates, cPanel build) and create **separate local** application and documentation/evidence commits, **only if every mandatory check passes**;
  - the pre-existing missing space after some bold runs (OBS-13) is recorded separately and **not** fixed in B3.
- **What this decision does NOT do:** authorise B4; change the global header/footer, consent or GTM code; approve a LAN preview, push, merge, staging or production deployment; decide the small-text floor (E1-a R-3) or OBS-7–OBS-13; close **E1, E6, OBS-1, OBS-6, LIVE-1, LIVE-2 or PROC-1**. KD-04 may be marked resolved **on `/ai-seo` only**, on proof that its original failing checks pass.
- **Evidence / report:** `docs/ui-revamp/GATE_4_B3_SERVICE_PAGES.md`; `docs/ui-revamp/gate-4/b3/evidence/`.
- **Supersedes:** nothing. Read with `DEC-034`, `DEC-036` – `DEC-039`.
- **Approved by:** Project owner / orchestrator, 2026-10-09 (Gate 4 B3 brief; "B3 final validation, acceptance and local checkpoint" instruction). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 BATCH B4 (DECISION PAGES): LOCAL DEVELOPMENT AUTHORISED (2026-10-09).** Made by the owner in the Gate 4 B4
> brief, which also accepts Gate 4 B3 as a local checkpoint with documented exceptions. It does not amend `DEC-034` – `DEC-040`.

### DEC-041
- **Date:** 2026-10-09
- **Status:** **Approved — Gate 4 Batch B4 only: the existing `/problems/traffic-but-no-enquiries` page and `/pricing` in Direction C. Local development, local validation and local commits only, subject to every mandatory B4 check.**
- **Decision:**
  - **B3 accepted as a local checkpoint with documented exceptions** (`GATE_4_B3_SERVICE_PAGES.md`). The `/ai-seo` KD-04 correction is accepted locally; it does not establish that other tables are fixed;
  - recompose the two existing routes with the approved Direction C system, reusing B1–B3 components; preserve copy, CTAs and destinations, `BookingLink`, `ContactForm`, event names and payloads, consent bootstrap, GTM loader, attribution, global header/footer, metadata, canonicals and the meaning of structured data;
  - `/pricing` is commercially sensitive: no unapproved copy, pricing, claim or offer change, and the design must not obscure limitations or make the offer appear more inclusive than it is;
  - **R-3 typography — owner-approved working rule for newly created B4 HTML:** minimum rendered label text 12px; prefer 13px or larger where practical; do not shrink meaningful information merely to fit a layout; document any exception for owner approval. Not applied retroactively to B1–B3. Inherited SVG text below 12px remains a documented exception, not a precedent;
  - the display fallback is measured per new heading; B3's 92% is not reused automatically.
- **What this decision does NOT do:** authorise B5; approve a LAN preview, push, merge, staging or production deployment; change consent, GTM, analytics or database code; close **E1, E6, PROC-1, OBS-1, OBS-6, LIVE-1, LIVE-2** or KD-05; decide OBS-13 or a redraw of the inherited figures.
- **Outcome (recorded by the worker, not part of the authorisation):** COMPLETE WITH EXCEPTIONS. `/pricing` publishes no prices, plans, billing periods or currency, before or after (every figure is owner-blocked); copy, headings, links, CTAs, table cells, served head and JSON-LD identical. KD-04 resolved on the branch for `/pricing`. `/pricing` opts into the existing 92% fallback (measured: 0.025 @360 with 90.5%); `/problems` keeps 90.5%. Throttled CLS 0.000 in 42/42.
- **Evidence / report:** `docs/ui-revamp/GATE_4_B4_DECISION_PAGES.md`; `docs/ui-revamp/gate-4/b4/evidence/`.
- **Supersedes:** nothing. Read with `DEC-034`, `DEC-036` – `DEC-040`.
- **Approved by:** Project owner / orchestrator, 2026-10-09 (Gate 4 B4 problem/solution pages and pricing brief). Recorded by the repository worker.

### DEC-042
- **Date:** 2026-10-09
- **Status:** **Approved — Gate 4 Batch B4 owner closure: B4 accepted with documented exceptions; one text-only OBS-13 correction; CauseZones remediation deferred; screen-reader verification required before B5 reuse; Safari/WebKit layout-shift investigation authorised. Local work and local commits only.**
- **Decision (five owner decisions, recorded as given):**
  1. **B4 acceptance.** Gate 4 B4 is **owner-accepted as a completed implementation batch, with documented exceptions.** Acceptance does **not** mean every inherited defect is resolved and does **not** authorise B5;
  2. **OBS-13.** One separately scoped, **text-only** correction covering the **seven** documented missing-space instances is authorised. Restore only the missing whitespace; no rewriting, rephrasing, removal or addition of content;
  3. **CauseZones.** Redesign of the legacy `CauseZones` diagram is **deferred.** Its small SVG text and its SVG text contrast (reported 3.41:1 grey labels, 4.33:1 orange titles) are to be recorded as **known defects** for accessibility remediation in a future, separately authorised batch. `CauseZones` is not modified in the closure pass except for a verified OBS-13 whitespace correction;
  4. **Screen readers.** Manual **VoiceOver and TalkBack** verification is **required before B5 reuses the affected components** (mobile pricing table, five-check `Sequence`, `/problems` breadcrumb, the checkbox-like indicators in `NotPromised`). It may not be claimed unless it actually took place;
  5. **Safari / WebKit.** Investigation of the WebKit heading-wrap difference and its layout-shift behaviour is authorised. A different line wrap is not automatically a defect; no typography change without a verified reason and separate approval.
- **What this decision does NOT do:** authorise B5 or any new visual design work; change the Direction C design system or typography; approve a LAN preview, push, merge, staging or production deployment; close **E1, E6, OBS-1, OBS-6, OBS-15, OBS-16, LIVE-1, LIVE-2, PROC-1, KD-02, KD-05** or any other open item; authorise a performance refactor (OBS-16) or a `CauseZones` redraw.
- **Outcome (recorded by the worker, not part of the authorisation):** closure pass **COMPLETE WITH OUTSTANDING PREREQUISITES** (`docs/ui-revamp/GATE_4_B4_OWNER_CLOSURE.md`). OBS-13: the seven instances corrected by replacing each dropped literal space with `{' '}` (7 source lines, 4 files), verified 7/7 in live DOM, served HTML and the figure's accessible name; every changed text block differs from before by exactly one inserted space; layout/a11y NEW 0 × 3 engines; served head 34/34; analytics 0 diffs. An eighth candidate on `/how-it-works` (B5 route) recorded, not changed. CauseZones size/contrast registered as **KD-09/KD-10** (the contrast defect is shared by every inherited figure, incl. approved `/seo` at 3.13:1). Screen readers: **not performed** (no VoiceOver control, no Android/TalkBack in this environment); supplementary semantic checks and a manual checklist delivered. WebKit: **real Safari 26.2 and Playwright WebKit both ignore `font-variation-settings: "opsz" 96` under `font-optical-sizing: auto`**, so the display face renders ~9% wider than designed and its metric fallback no longer matches; the H1 gains a line at the font swap in 5 of 10 B4 views (31–46 px; approximate score 0.009–0.021) and in 8 of 40 views on earlier Direction C routes. Recorded as **OBS-17** (systemic, pre-existing since the Gate 3 R2 fallbacks); a one-property candidate correction was verified in real Safari by injection only and **needs owner approval**.
- **Evidence / report:** `docs/ui-revamp/GATE_4_B4_OWNER_CLOSURE.md`; `docs/ui-revamp/gate-4/b4/closure/evidence/`; `docs/ui-revamp/gate-4/b4/owner-review/`.
- **Supersedes:** nothing. Read with `DEC-041`.
- **Approved by:** Project owner, 2026-10-09 (Gate 4 B4 closure & governance instruction). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 POST-B4 REMEDIATION GATE (2026-10-09).** Made by the owner in the "Post-B4 Remediation Gate — OBS-17 Safari
> Typography + OBS-13 Final Whitespace Correction" brief, after review of `GATE_4_B4_OWNER_CLOSURE.md`. It does not amend `DEC-042` or earlier decisions.

### DEC-043
- **Date:** 2026-10-09
- **Status:** **Approved — Gate 4 post-B4 remediation only: the OBS-17 display-font correction (subject to full regression validation) and the eighth OBS-13 whitespace correction. Local work, local validation and local commits only.**
- **Decision (owner decisions, recorded as given):**
  1. **OBS-17.** A targeted remediation is approved: `font-optical-sizing: none` applied only where necessary on the Direction C display roles that set an explicit optical size, preserving the approved family, weight, hierarchy and `opsz` settings; **subject to full regression validation**. Approval of the change does **not** by itself resolve OBS-17;
  2. **OBS-13.** The eighth whitespace-only correction is approved: `/how-it-works` "AI search**occupies**" → "AI search occupies". One space; no other text change. Further candidates, if found, are documented separately and not fixed;
  3. **KD-09 / KD-10.** Remediation of the inherited SVG diagram issues (small SVG text, SVG text contrast, shared diagram text styling) is **deferred to a dedicated batch before production approval**. Both stay open; no diagram is changed;
  4. **Screen readers.** Manual VoiceOver/TalkBack verification (`GATE_4_B4_OWNER_CLOSURE.md` §F, SR-1 – SR-5) **remains mandatory before B5 reuses** the mobile pricing table, the five-check sequence, the `/problems` breadcrumb and the `NotPromised` indicators. Automated accessibility-tree inspection does not substitute for it;
  5. **B5.** Not authorised.
- **What this decision does NOT do:** authorise B5, a site-wide redesign, new motion, unrelated refactoring, or any change to fallback calibration, font size, line height, letter spacing, widths or breakpoints; relax any accessibility requirement; approve a push, merge, LAN preview, staging or production deployment; close E1, E6, KD-09, KD-10 or any other open item.
- **Outcome (recorded by the worker, not part of the authorisation):** remediation **complete; recommended PASS WITH EXCEPTIONS** (`docs/ui-revamp/GATE_4_POST_B4_REMEDIATION.md`). OBS-17: `font-optical-sizing: none` added to `.dc-display` and `.dc-statement` only; real Safari 26.2 (macOS) H1 swap re-wraps 16 → 0 over 10 Direction C routes × 7 widths, final H1 lines = Chromium 70/70; Playwright WebKit views above 0.01 8 → 0; Chromium and Firefox renders identical before/after; iOS Safari not tested. OBS-13: `/how-it-works` space restored with `{' '}`; all 8 instances verified; scan 0 candidates on 17 static routes; no wrapping consequence. Regression: layout/a11y NEW 0 ×3 engines; served head 34/34; analytics 0 diffs; inventory 849 identical + 1 declared; throttled CLS 0.000 in 42/42; build and cPanel build pass. New **OBS-18** (pre-existing; Playwright Firefox paints display roles in Arial Narrow while the face loads) recorded, not fixed. Closure of OBS-17 and OBS-13 is **recommended, not recorded**: owner to confirm.
- **Evidence / report:** `docs/ui-revamp/GATE_4_POST_B4_REMEDIATION.md`; `docs/ui-revamp/gate-4/post-b4/evidence/`.
- **Supersedes:** nothing. Read with `DEC-041`, `DEC-042`.
- **Approved by:** Project owner, 2026-10-09 (post-B4 remediation gate brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 POST-B4 CLOSURE AND OBS-18 FIREFOX DIAGNOSTIC GATE (2026-10-09).** Made by the owner in the "Post-B4 Closure &
> OBS-18 Firefox Diagnostic Gate" brief, after review of `GATE_4_POST_B4_REMEDIATION.md`. It does not amend `DEC-043` or earlier decisions.

### DEC-044
- **Date:** 2026-10-09
- **Status:** **Approved — owner acceptance of the Gate 4 post-B4 remediation gate with documented exceptions; formal closure of OBS-17 and OBS-13 within their verified scope; a diagnostic-only OBS-18 investigation in real Firefox. Governance and diagnostics only: no application, design-system or tooling change; local commits only.**
- **Decision (seven owner decisions, recorded as given):**
  - **A. Post-B4 remediation.** The post-B4 remediation gate (`DEC-043`) is **accepted with documented exceptions**;
  - **B. OBS-17.** The Safari/WebKit optical-sizing defect is **formally closed for the verified scope** (real Safari 26.2 on macOS 15.7.3 and Playwright WebKit; the 10 Direction C routes; 320–1440 px). The limitation that **no real iPhone/iOS** test took place is preserved;
  - **C. OBS-13.** The **eight verified** missing-space defects are **formally closed.** This does **not** state that every possible whitespace defect across the whole website has been excluded;
  - **D. OBS-18.** A **diagnostic investigation in real Firefox** is authorised **before** any application correction is considered;
  - **E. Playwright tooling.** Correction of `docs/ui-revamp/gate-4/qa/pixel-main.cjs` (it launches Chromium whatever `--engine` requests) is **deferred**; the tool is not edited in this assignment;
  - **F. Accessibility.** KD-09/KD-10 remain **deferred** to the dedicated pre-production remediation batch (`DEC-043`). Manual VoiceOver/TalkBack verification **SR-1 – SR-5 remains mandatory before B5 reuses the affected components**;
  - **G. B5.** **Not authorised.**
- **What this decision does NOT do:** authorise a Firefox font fix or any change to application code, CSS, font assets, fallback calibration, the Direction C design system, typography or motion; authorise an edit to `pixel-main.cjs` or other QA tooling; close OBS-18, KD-09, KD-10, E1, E6, OBS-1, OBS-6, OBS-11, OBS-15, OBS-16, LIVE-1, LIVE-2, KD-02, KD-05, PROC-1 or any other open item; authorise installing software or changing system settings; authorise B5, diagram remediation, a push, merge, LAN preview, staging or production deployment.
- **Outcome (recorded by the worker, not part of the authorisation):** governance closure recorded and the OBS-18 diagnostic completed within this environment (`docs/ui-revamp/GATE_4_OBS18_FIREFOX_DIAGNOSTIC.md`). **OBS-17 CLOSED** for the verified scope (real Safari 26.2 on macOS 15.7.3 + Playwright WebKit; 10 Direction C routes; 320–1440 px; no iOS). **OBS-13: the eight verified instances CLOSED** (`98cfc82` ×7, `0e8df27` ×1; no site-wide claim). **OBS-18: no real Firefox was available** (none installed; nothing installed). In Playwright Firefox 153.0 (1,108 runs across 3 engines and both builds): while the display face is pending, Firefox paints the display roles in Arial Narrow because Gecko does not load a later `@font-face` (the `local()` calibrated fallback) while an earlier one is loading — a rule verified in Gecko source at the release revision behind Playwright's build and in 115/128 ESR; Playwright's patch set changes no font code; removing request interception changes nothing. Late face: deterministic (27/70 views move, 19 above an approximate 0.01, max ≈ 0.041; identical pre/post `DEC-043`); normal loopback loading: the Arial Narrow state is painted for 12–53 ms in about half of loads (Chromium and WebKit: never). Runtime-only probes that load the calibrated faces first remove every re-wrap (0/70). **Classification D. UNVERIFIED** (expected real-Firefox outcome C, condition-dependent: WORKING HYPOTHESIS). Recommended next action: real-Firefox verification with the prepared harness (owner decision); a script-free candidate correction is described, not implemented. Nothing in application code or tooling changed.
- **Evidence / report:** `docs/ui-revamp/GATE_4_OBS18_FIREFOX_DIAGNOSTIC.md`; `docs/ui-revamp/gate-4/obs18/evidence/`.
- **Supersedes:** nothing. Read with `DEC-042`, `DEC-043`.
- **Approved by:** Project owner, 2026-10-09 (post-B4 closure and OBS-18 Firefox diagnostic brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 OBS-18 REAL FIREFOX VERIFICATION GATE (2026-10-09).** Made by the owner in the "OBS-18 Real Firefox Verification Gate"
> brief, after review of `GATE_4_OBS18_FIREFOX_DIAGNOSTIC.md`. It does not amend `DEC-044` or earlier decisions.

### DEC-045
- **Date:** 2026-10-09
- **Status:** **Approved — diagnostic-only real-Firefox verification of OBS-18, with authority to install official Firefox Stable. No application, design-system or tooling change; local commits only.**
- **Decision (owner decisions, recorded as given):**
  - **Approved:** installing official Mozilla Firefox Stable for diagnostic testing; using the existing OBS-18 harness; testing normal and delayed font loading; comparing official Firefox Stable with Playwright Firefox; evaluating candidate fixes through temporary runtime-only injection; creating diagnostic evidence and updating governance records;
  - **Not approved:** application CSS, JSX, JavaScript or font-file changes; permanent Firefox browser configuration changes; modifying existing Playwright QA tooling; KD-09/KD-10 diagram remediation; B5 implementation; production deployment;
  - **Unchanged:** manual VoiceOver/TalkBack verification SR-1 – SR-5 remains mandatory before B5 reuses the affected components.
- **What this decision does NOT do:** approve an application fix for OBS-18 (or OBS-19); close OBS-18; change `DEC-044` or any other decision; authorise B5, a push, merge, staging or production deployment.
- **Outcome (recorded by the worker, not part of the authorisation):** verification complete (`docs/ui-revamp/GATE_4_OBS18_REAL_FIREFOX_VERIFICATION.md`). Official **Firefox 157.0.1** (release channel; Mozilla-signed, notarised, checksum-verified) installed at `/Applications/Firefox.app`; default browser unchanged; temporary profiles only. **OBS-18 reproduces in official Firefox:** while the display face loads, the calibrated `local()` fallback stays unloaded and the display text is laid out in Arial Narrow (every painted pending run); under a late face (300 ms / 2.5 s) deterministic — 7 of 21 key views and 24 of 63 views on all Direction C routes change H1 lines, max ≈ 0.041 (geometric approximation; Firefox has no Layout Instability API), visible CTA moves up to 78 px (101 px in one run combined with OBS-19); under normal cold loopback loading the pending face was painted in 16 of 61 loads (≈ 16 ms) with H1 re-wraps in 6 views. Playwright Firefox 153 matches on face, geometry and severity; Chromium unaffected. Runtime-only candidate (four in-flow, hidden, `aria-hidden` priming spans, one per calibrated face): 0 H1 line changes in every condition and engine, accessibility tree and Tab order identical, works without JavaScript; the earlier out-of-flow form is unreliable (correction to the `DEC-044` report). **Recommended classification A — confirmed real-Firefox defect**; a narrowly scoped correction is proposed for separate owner approval. New **OBS-19**: the site `next/font` fallbacks (`Manrope Fallback`, `Bricolage Grotesque Fallback`) meet the same Gecko rule; non-H1 moves up to ≈ 0.018. No application code or tooling changed.
- **Evidence / report:** `docs/ui-revamp/GATE_4_OBS18_REAL_FIREFOX_VERIFICATION.md`; `docs/ui-revamp/gate-4/obs18-real-firefox/evidence/`.
- **Supersedes:** nothing. Read with `DEC-043`, `DEC-044`.
- **Approved by:** Project owner, 2026-10-09 (OBS-18 real Firefox verification gate brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 OBS-18 IMPLEMENTATION AND OBS-19 DIAGNOSTIC GATE (2026-10-09).** Made by the owner in the "Gate 4: OBS-18
> Implementation & OBS-19 Diagnostic" brief, after review of `GATE_4_OBS18_REAL_FIREFOX_VERIFICATION.md`. It does not amend `DEC-045` or earlier decisions.

### DEC-046
- **Date:** 2026-10-09
- **Status:** **Approved — targeted OBS-18 application correction (in-flow fallback-face priming, subject to regression testing) and a diagnostic-only OBS-19 investigation. Local work, local validation and local commits only.**
- **Decision (owner decisions, recorded as given):**
  - **Approved:** (1) targeted OBS-18 application implementation using the verified **in-flow** fallback-font priming approach, **subject to regression testing**; (2) **diagnostic-only** investigation of OBS-19; (3) local testing in official Firefox Stable, Playwright Firefox, Chromium, WebKit and real Safari where available; (4) necessary governance and evidence updates; (5) local application and documentation commits after successful verification;
  - **Not approved:** an OBS-19 application fix; a site-wide typography redesign; changes to approved font sizes, weights, optical sizing, line heights or letter spacing; new animations or conversion elements; KD-09/KD-10 remediation; changes to `pixel-main.cjs` (TOOL-1 stays deferred); starting B5; push, merge or deployment;
  - **Unchanged:** KD-09/KD-10 remain **deferred** to the dedicated pre-production accessibility batch; manual VoiceOver/TalkBack verification **SR-1 – SR-5 remains mandatory before B5 reuses** the affected components; B5 is **not authorised**.
- **Implementation detail confirmed by the owner in session (not a design change):** each priming element takes its one glyph from CSS generated content (`::before { content: "a" }`) instead of a literal text node, so no priming text enters the DOM `textContent`; the elements otherwise follow the verified in-flow form (hidden, zero height, `aria-hidden`, in flow before the page content). If that variant proved less effective than the verified literal form, the literal form was to be used and the reason recorded.
- **What this decision does NOT do:** close OBS-18 (closure requires all acceptance criteria to pass and a separate owner confirmation); close or fix OBS-19; change `DEC-042` – `DEC-045` or the `.dc-display` / `.dc-statement` optical-sizing settings (OBS-17); authorise B5, diagram remediation, a push, merge, LAN preview, staging or production deployment.
- **Outcome (recorded by the worker, not part of the authorisation):** **OBS-18 implemented and verified; every acceptance criterion passed; closure RECOMMENDED, not recorded** (`docs/ui-revamp/GATE_4_OBS18_IMPLEMENTATION.md`). Application commit **`3b333c4`**: `DcPage` renders four hidden, zero-height, `aria-hidden`, in-flow `span.dc-font-prime` (one per calibrated display fallback, glyph from `::before`) before the page content; CSS in `app/direction-c.css`; nothing else changed. The `::before` glyph proved as effective as the verified literal form (real Firefox 157.0.1 and Playwright Firefox, 0 H1 line changes each). **Official Firefox 157.0.1**, 10 Direction C routes × 7 widths × 0 / 300 / 2,500 ms: H1 line changes **10 / 25 / 25 views → 0 / 0 / 0** (672 runs, 2 excluded); calibrated face painted while pending in every after-build pending run; Playwright Firefox the same; Chromium, WebKit and **real Safari 26.2** unchanged (Safari H1 re-wraps 0 → 0; OBS-17 preserved); final loaded state identical 70/70 × 4 engines; Chromium `<main>` pixels 68/68; accessibility tree, Tab order, accessible names, headings and `<main>` text identical; 0 hydration/console errors; works without JavaScript (real Firefox 3/3). Regression: typecheck, lint, 30/30 tests, builds and cPanel build pass; layout/a11y NEW 0 except one pre-existing intermittent not-found finding (OBS-6 family, both builds); served head 34/34; analytics 0 diffs; inventory 850/850; served HTML/DOM identical apart from the declared primes and one consequential `<!-- -->` separator on `/services`; throttled CLS max 0.001 (pre-existing). Residual non-H1 Firefox moves are OBS-19. **OBS-19 diagnostic** (`docs/ui-revamp/GATE_4_OBS19_DIAGNOSTIC.md`, 2,164 runs): confirmed, site-wide, two mechanisms — (1) Firefox lays Manrope text out in system-ui while Manrope loads (the OBS-18 Gecko rule; on `/` and `/pricing` an incidental U+2192 arrow loads the fallback mid-pending); (2) `next/font`'s automatic Manrope fallback metrics do not hold line breaks in any engine when Manrope arrives late (Chromium native layout-shift up to 0.10–0.12, chiefly the first-visit consent banner). Normal first visits: Firefox painted the pending state in ≈ 20 % of cold loopback loads (moves ≤ 32 px); Chromium never. A runtime-only in-flow prime of `Manrope Fallback` removes mechanism 1 with no side effects found; it does not address mechanism 2. **Recommended classification A** (remediation proposed for a separate owner decision; not implemented). KD-09/KD-10 deferred; SR-1 – SR-5 not performed; `pixel-main.cjs` not edited; B5 not started; nothing pushed, merged or deployed.
- **Evidence / report:** `docs/ui-revamp/GATE_4_OBS18_IMPLEMENTATION.md`, `docs/ui-revamp/gate-4/obs18-impl/evidence/`; `docs/ui-revamp/GATE_4_OBS19_DIAGNOSTIC.md`, `docs/ui-revamp/gate-4/obs19/evidence/`.
- **Supersedes:** nothing. Read with `DEC-044`, `DEC-045`.
- **Approved by:** Project owner, 2026-10-09 (OBS-18 implementation and OBS-19 diagnostic brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 OBS-18 CLOSURE AND OBS-19 REMEDIATION (2026-10-10).** Made by the owner in the "Gate 4: OBS-18 Closure & OBS-19
> Remediation" brief, after review of `GATE_4_OBS18_IMPLEMENTATION.md` and `GATE_4_OBS19_DIAGNOSTIC.md`. It does not amend `DEC-046` or earlier decisions.

### DEC-047
- **Date:** 2026-10-10
- **Status:** **Approved — formal closure of OBS-18 (subject to the worker re-verifying the evidence) and a targeted OBS-19 remediation (Firefox fallback-face priming where shown necessary; weight-specific Manrope fallback-metric calibration where supported by measurement). Local work, local validation and local commits only.**
- **Decision (owner decisions, recorded as given):**
  - **Approved:** (1) formal OBS-18 closure after evidence verification; (2) targeted OBS-19 implementation; (3) Firefox fallback-face priming where demonstrated necessary; (4) weight-specific fallback-metric calibration where supported by measurements; (5) cross-browser and accessibility regression testing; (6) governance updates and local commits;
  - **Not approved:** changing the actual Manrope or Bricolage display fonts; changing loaded-font typography or approved design tokens (font sizes, weights, line heights, letter spacing, text, component spacing, breakpoints); broad CSS refactoring; reworking components to conceal layout shifts; unrelated performance optimisations; KD-09/KD-10 remediation; changes to deferred Playwright tooling (`pixel-main.cjs`, TOOL-1); B5; push, merge or deployment;
  - **Unchanged:** KD-09/KD-10 remain **deferred** to the dedicated pre-production accessibility batch; manual VoiceOver/TalkBack verification **SR-1 – SR-5 remains mandatory before B5 reuses** the affected components; B5 is **not authorised**.
- **OBS-18 closure (recorded by the worker after re-verification, 2026-10-10):** the application tree at `ad9d702` is identical to `3b333c4`; the four `span.dc-font-prime` render on exactly the ten Direction C routes and on no legacy, dynamic or not-found route (served HTML of the `3b333c4` build); the stored acceptance data (`gate-4/obs18-impl/evidence/runs/accept-summary.txt`, `run/impl-checks.txt`, `safari/safari-real-summary.txt`) support every claim of `GATE_4_OBS18_IMPLEMENTATION.md` §10 — official Firefox 157.0.1 and Playwright Firefox 0 H1 line changes in every after-build condition, final loaded state identical 70/70 × 4 engines, accessibility tree / Tab order / no-JavaScript checks identical or passing, Chromium, WebKit and real Safari 26.2 unchanged — and no contradictory evidence was found. **OBS-18 is CLOSED** for the verified scope (official Firefox 157.0.1 and Playwright Firefox 153 on macOS; the ten Direction C routes; 320–1440 px; loopback, cold cache). The historical OBS-18 reports and evidence are unchanged.
- **What this decision does NOT do:** close OBS-19 unless its acceptance criteria are met; change the OBS-17 optical-sizing settings, the Direction C display fallbacks or primes; authorise B5, diagram remediation, a push, merge, LAN preview, staging or production deployment.
- **Outcome (recorded by the worker, not part of the authorisation):** **OBS-18 CLOSED** as above. **OBS-19 partially remediated — NOT closed** (`docs/ui-revamp/GATE_4_OBS19_REMEDIATION.md`). Application commit **`46785af`**: `next/font`'s automatic Manrope fallback turned off (`adjustFontFallback: false`, `fallback: ['"Manrope Fallback"']`; emitted stack unchanged); `"Manrope Fallback"` declared in `app/globals.css` as two calibrated `local()` faces — Arial 100–500 at `size-adjust` 103.25 %, Arial Bold 600–900 at 99 % (ascent/descent reproduce Manrope's 1.066 / 0.300 em), values swept on the site's own copy (28 targets × 7 widths) in Chromium, Firefox and WebKit; two hidden, zero-height, `aria-hidden`, in-flow primes (glyph from `::before`) at the start of `<body>`. Manrope's file is byte-identical; no loaded-font style, token, text or spacing changed. **Mechanism A RESOLVED:** official Firefox 157.0.1 paints the calibrated face, never system-ui, in every pending run (normal, 300, 2,500 ms; JavaScript on and off). **Mechanism B MITIGATED:** consent banner height change 23 px → 0 (all engines and conditions); button re-wraps 28 → 0; Chromium late-Manrope native layout-shift max 0.1215 → 0.049 (views > 0.1: 3 → 0; > 0.01: 23 → 13; 3 views worse, `/blog`). **Residual:** ≈ 3 % of weight-400 element-views still change lines at a late swap in every engine (per-string Arial/Manrope variance; 3.65 → 3.28 % Chromium), paragraph moves ≤ 52 px and button moves ≤ 29 px with late Manrope, Firefox normal loads 3 of 84 views (≤ 37 px), a few Firefox views worse where system-ui happened to match; the U+2192 arrows (outside Manrope's latin subset) are drawn by the new faces even when Manrope is loaded (bold arrows 0.7 px narrower; Chromium `<main>` pixels 48/68 identical, differences confined to arrow-bearing routes). Acceptance criteria 1, 3, 6, 7, 8, 9 PASS; 4, 5, 10 PARTIAL; 2 FAIL. Regression: typecheck, lint, 30/30 tests, plain/fixture/cPanel builds pass; layout/a11y NEW 0 × 3 engines; served head 34/34; analytics 0 diffs; content 0 diffs; GTM DOM identical; a11y tree (with and without banner), Tab order and accessible names identical; 0 hydration errors; throttled CLS max 0.001 (pre-existing); OBS-17 (real Safari) and OBS-18 (official Firefox) preserved; no font-loading regression. **Recommended:** keep OBS-19 OPEN as a late-font-only residual; owner to choose between accepting the residual, `font-display: optional`, restoring the arrow rendering, or no further action (report §13). KD-09/KD-10 deferred; SR-1 – SR-5 not performed; `pixel-main.cjs` not edited; B5 not started; nothing pushed, merged or deployed.
- **Evidence / report:** `docs/ui-revamp/GATE_4_OBS19_REMEDIATION.md`, `docs/ui-revamp/gate-4/obs19-remediation/evidence/`.
- **Supersedes:** nothing. Read with `DEC-046`.
- **Approved by:** Project owner, 2026-10-10 (OBS-18 closure and OBS-19 remediation brief) and 2026-10-11 (continuation instruction). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 OBS-19 FINAL CLOSURE (2026-10-11).** Made by the owner in the "Owner Approval: OBS-19 Final Closure" brief, after review of
> `GATE_4_OBS19_FINAL_DISPOSITION.md` (local commit `66fd6a7`). It does not amend `DEC-047` or earlier decisions.

### DEC-048
- **Date:** 2026-10-11
- **Status:** **Approved — governance-only closure of OBS-19 with a documented residual exception; OBS-20 registered OPEN, NON-BLOCKING.**
- **Decision (owner decisions, recorded as given):**
  1. **Close OBS-19** for the Manrope fallback-font issue **with the explicitly documented residual exception** (below) — not a perfect or unconditional pass;
  2. **Retain `font-display: swap`** for Manrope (`font-display: optional` not adopted);
  3. **Accept the minor U+2192 arrow-glyph rendering difference** without additional application changes (the arrow-only `@font-face` experiment not adopted);
  4. **Register the pre-existing Bricolage late-font movement as OBS-20, OPEN and NON-BLOCKING**, pending relevant future performance and conversion-page QA.
- **Closure wording (owner):** OBS-19 is accepted and closed for the Manrope fallback-font remediation. The owner acknowledges that synthetic 2.5-second
  font-delay tests still produce some text reflow and element movement, including CTA movement up to approximately 29 px and Chromium layout shift up to
  0.049. Under the tested realistic-loading conditions, the remaining Manrope impact was limited, with one intermittent Firefox above-the-fold CTA movement
  observed. The calibrated fallback correction remains in place, `font-display: swap` is retained, and the minor arrow-glyph difference is accepted. This
  decision does not waive real-device testing, accessibility requirements or production release gates.
- **Documented exception (from the report, §6, §5, §8):** with Manrope held 2.5 s, ≈ 3 % of regular-weight elements may change lines; above-the-fold paragraphs
  and hero CTAs move ≤ ≈ 29 px (`/pricing` 768, `/ai-seo` 430, `/faq` 768, `/problems/traffic-but-no-enquiries` 768), lower content further below the fold;
  Chromium native ≤ 0.049; the consent banner does not change height and buttons do not re-wrap. Realistic synthetic profiles: Chromium, WebKit and real
  Safari 26.2 had Manrope ready at first paint in every run; Firefox painted the calibrated fallback 13–49 ms after first paint on some loads (one
  above-the-fold CTA case, `/ai-seo` 430, 27 px, intermittent). CTA arrows (U+2192, `aria-hidden`) 0.7 px narrower than pre-OBS-19 (1.2 px in Firefox).
- **Scope of verification the closure rests on:** macOS; Playwright Chromium 151 / Firefox 153 / WebKit 26.5, official Firefox 157.0.1, real Safari 26.2;
  synthetic loopback throttling (not field data). **Not verified:** real devices (iOS, Android), Windows/Linux, field/RUM data.
- **What this decision does NOT do:** change application code or CSS; implement `font-display: optional` or the arrow correction; begin OBS-20 remediation;
  re-run the OBS-19 campaign; waive real-device testing (E1), accessibility requirements (KD-09/KD-10 remain deferred to the pre-production accessibility
  batch; SR-1 – SR-5 remain mandatory before B5 reuse) or production release gates; authorise B5, a push, merge or deployment.
- **Evidence / report:** `docs/ui-revamp/GATE_4_OBS19_FINAL_DISPOSITION.md`, `docs/ui-revamp/gate-4/obs19-final/evidence/` (commit `66fd6a7`); `docs/ui-revamp/GATE_4_OBS19_REMEDIATION.md` (`DEC-047`).
- **Supersedes:** nothing. Read with `DEC-047`.
- **Approved by:** Project owner, 2026-10-11. Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 · A1 ACCESSIBILITY READINESS AND B5 PREPARATION (2026-10-11).** Made by the owner in the "A1: Accessibility Readiness
> and B5 Preparation" brief, after the decision to complete B5–B11 before launching the redesign. It does not amend `DEC-048` or earlier decisions.

### DEC-049
- **Date:** 2026-10-11
- **Status:** **Approved — bounded A1 accessibility engineering (KD-09 / KD-10 and known inherited figure defects) and B5 preparation only. Local work, local validation and local commits only. B5 is NOT authorised.**
- **Decision (owner, as given):**
  - **Release objective:** complete all planned Direction C batches B5–B11 before launching the redesigned website; no partial redesign release. This sets the objective only and authorises no implementation, deployment or governance change beyond this entry.
  - **Authorised:**
    - (A) fix SVG figure text below 12px and below 4.5:1 and known inherited figure defects, within the approved design, prioritising `ChainFigure`, `CauseZones`, `MethodChain` and the `/seo` figure, without changing copy or claims;
    - (B) focused verification with the existing harness;
    - (C) a concise SR-1 – SR-5 manual checklist;
    - (D) a B5 readiness review that does not modify B5 routes;
    - commits of the A1 engineering changes and concise evidence.
  - **Not authorised:**
    - B5;
    - changes to `.github/workflows/`, deployment scripts, production configuration, OBS-19 files, fonts or font loading, or unrelated routes;
    - a push, merge or deployment.
  - **Unchanged:** SR-1 – SR-5 remain mandatory before B5 reuses the affected components, and automated checks do not count as a manual screen-reader PASS. E1 remains outstanding.
- **Outcome (recorded by the worker, not part of the authorisation):** **engineering complete and verified; manual screen-reader checks BLOCKED** (`docs/ui-revamp/GATE_4_A1_ACCESSIBILITY_READINESS.md`).
  - **Files changed:** `components/commercial/ChainFigure.tsx`, `components/routes/CauseZones.tsx`, `components/routes/MethodChain.tsx`.
  - **What changed:**
    - figure text takes the existing text-grade tokens (`--dc-gap-text`, `--resolve-accent-dark`); marks keep `--resolve-gap` / `--resolve-accent-deep`;
    - vertical-drawing type is set to render ≥ 12px at a 320px viewport;
    - the `/how-it-works` drawings switch to their horizontal form at 1100px (as `ChainFull`) instead of 761px;
    - long labels break at word boundaries so they hold the WCAG 1.4.12 overrides;
    - colliding labels are moved.
  - **Measured** (6 routes × 9 widths; Playwright Chromium / WebKit / Firefox):
    - text < 12px 377 → 0; text < 4.5:1 464 → 0;
    - text–line crossings 38 → 0 (Chromium);
    - under 1.4.12 at 320–430px, clipped figure text 52 → 0 (KD-05, `layout.cjs` RESOLVED 15 × 3 engines);
    - OBS-14 resolved;
    - words and figure accessible names unchanged.
  - **Regression:** layout/a11y NEW 0 × 3 engines; inventory 850/850; served head 34/34; analytics/forms 0 diffs; accessible names identical × 3; throttled CLS max 0.004 before and after; typecheck, lint, 30/30 tests, build, cPanel build pass.
  - **Declared visible differences:**
    - darker, larger figure text;
    - narrow drawings 4–24 % taller;
    - `/how-it-works` shows its existing vertical drawings at 761–1099px;
    - moved labels.
  - **SR-1 – SR-5: not performed** (no real iPhone/Android screen-reader environment). **B5 cannot begin under the existing requirements** until they pass (or the owner revises that prerequisite) and B5 is authorised; S2 is still undecided. KD-09 / KD-10 closure (and the figure-text scope of KD-05) is **recommended, not recorded**: owner to confirm.
- **Evidence / report:** `docs/ui-revamp/GATE_4_A1_ACCESSIBILITY_READINESS.md`; `docs/ui-revamp/gate-4/a1/evidence/`.
- **Supersedes:** nothing. Read with `DEC-042`, `DEC-043`, `DEC-048`.
- **Approved by:** Project owner, 2026-10-11 (A1 brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — GATE 4 · B5 IMPLEMENTATION AND SCREEN-READER SEQUENCING EXCEPTION (2026-10-12).** Made by the owner in the "B5
> Implementation: Direction C" brief. It does not amend `DEC-049` or earlier decisions.

### DEC-050
- **Date:** 2026-10-12
- **Status:** **Approved — Gate 4 Batch B5 (`/how-it-works`, `/about`, `/faq`) implementation, local validation and local commits; and a TEMPORARY SEQUENCING EXCEPTION to the pre-B5 SR-1 – SR-5 requirement.**
- **Decision (owner, as given):**
  - B5 is authorised on `ui-revamp`. Copy, claims, metadata, analytics, consent and functional behaviour are preserved. No change to lead capture, CRM, database, deployment workflows or the R0 worktree; no unrelated refactoring; no new animation (S2 not authorised — static presentation).
  - **Manual Android TalkBack and iPhone VoiceOver testing (SR-1 – SR-5) is deferred.** This permits B5 to proceed before them. **It is not an accessibility PASS and not a permanent waiver.** SR-1 – SR-5 stay visibly outstanding for release readiness, and no claim of full accessibility or production approval is made.
- **What this decision does NOT do:** authorise B6, a push, merge, staging or production deployment; close SR-1 – SR-5, E1, KD-02, LIVE-1, LIVE-2 or PROC-1.
- **Outcome (recorded by the worker, not part of the authorisation):** **B5 COMPLETE — awaiting owner review** (`docs/ui-revamp/GATE_4_B5_TRUST_METHOD_PAGES.md`).
  - **New primitives:** `Stages`, `Compare`, `DisclosureGroup`, `StatedRows` (additions only).
  - **Fallback:** all three pages opt into the 92 % display fallback (sweep).
  - **Content:** inventory 845 identical, with 5 declared differences (shared close motion; `TLink` arrow); served head 34/34; analytics 0 diffs; accessible names identical × 3 engines.
  - **Checks:** layout/a11y NEW 0 × 3 engines, KD-03 resolved on `/how-it-works` and `/about`; FAQ disclosures 23/23 (keyboard and no-JS, × 3 engines); figure probe 0 defects; CLS max 0.028 → 0.004; B1–B4 `<main>` pixels 22/22 identical.
  - **Static gates:** typecheck, lint, 30/30 tests, build and cPanel build pass.
- **Evidence / report:** `docs/ui-revamp/GATE_4_B5_TRUST_METHOD_PAGES.md`; `docs/ui-revamp/gate-4/b5/evidence/`.
- **Supersedes:** nothing. Modifies the *sequencing* of `DEC-043` – `DEC-049` ("SR-1 – SR-5 mandatory before B5 reuse") for B5 only; the requirement itself stands for release.
- **Approved by:** Project owner, 2026-10-12 (B5 brief). Recorded by the repository worker.

---

> **UI REVAMP PROGRAMME — C+ HYBRID SELECTED AS THE FINAL CREATIVE DIRECTION; B5 OWNER ACCEPTANCE WITHHELD (2026-10-12).** Made by the
> owner after the B5 visual review and the B5 remediation assessment (Option B). It supersedes `DEC-034` only as the intended final
> creative direction (`DEC-034` stays historically valid for the earlier Direction C work); it does not amend `DEC-035` – `DEC-050`.

### DEC-051
- **Date:** 2026-10-12
- **Status:** **Approved — C+ Hybrid is the intended final creative direction; B5 owner acceptance withheld; B5 technical work retained as the integration baseline.** Direction and planning only: no implementation is authorised by this entry.
- **Decision (owner, as given):**
  1. **C+ Hybrid is the intended final creative direction** for the MappedSkills website.
  2. **Three C+ prototypes have owner VISUAL approval:** Homepage, Conversion Optimization and How It Works. They are **prototypes, not production-integrated pages**: isolated, `noindex` routes under `/proto/c-plus/…` on branch `proto/direction-c-plus` (worktree `../MappedSkills-cplus`), from `ui-revamp` `e2d5541`, branch tip `cf91ce1` when this entry was recorded.
     **Visual approval is not production approval.** Each of the following needs its own explicit owner approval at integration:
     - production copy;
     - SEO changes (H1s, titles, descriptions, canonicals, URLs, structured data, search intent);
     - claims;
     - the integration itself.
  3. **B5 owner acceptance is WITHHELD** for the Direction C versions of `/how-it-works`, `/about` and `/faq` ("changes required" on all three). The method-chain figure was not reviewed. **No further Direction C creative remediation cycle** is to be run on these pages.
  4. **Option B:** B5's verified technical and accessibility work is kept as the **integration baseline**. Its visual compositions are not repaired; the creative objections are resolved through the C+ process.
  5. **Owner-confirmed operating facts** (source: owner-confirmed C+ creative-brief information, the "checkpoint 3" brief, restated by the owner in this decision). OWNER REQUIREMENT for use in copy:
     - initial enquiry follow-up is by email or WhatsApp;
     - the process is Discovery Call → Audit → Proposal → Approval → Execution;
     - clients receive audit findings, a recommended action plan and a proposal before work begins;
     - MappedSkills handles most agreed implementation, with client input where required;
     - clients receive monthly performance reports and monthly review calls.

     **Nothing beyond these is confirmed.** No response time, guarantee, outcome, named person, personnel detail, address, company fact, document count, payment or contract term, or report metric may be stated or implied.
- **Outstanding (not decided here):**
  - **C+ designs for `/about` and `/faq`** do not exist; they need the C+ creative process and owner visual approval.
  - **Exact approved revisions:** the specific prototype commit approved for each of the three pages is to be pinned when integration is planned.
  - **Production approval of prototype content:** where a C+ prototype's copy, H1, metadata, claims or structure differs from the live approved page, its production use is a separate explicit owner decision at integration (copy, SEO and claims reviewed in their own right). This entry records **visual** approval only.
  - **`/how-it-works` §2 and §9:** the facts in item 5 may unblock parts of §2 (delivery stages) and §9 (what happens after an enquiry), within the limits stated there. §9's response-time item stays EVIDENCE REQUIRED (unmeasured).
  - **`/about` §4 (people) and §6 (company facts)** remain owner-blocked; they render nothing, with no entity JSON-LD.
  - **B1–B4:** their Direction C acceptances are not revoked. How and when those routes move to C+ is not decided here.
- **Technical requirements that must survive C+ integration** (verified in B0–B5 and the B5 addendum):
  - **SEO and metadata:**
    - URLs are preserved unless a change is explicitly approved;
    - **any changed H1, title, description, canonical, robots directive, structured data or search intent is reviewed explicitly** against the live page before integration;
    - **`FAQPage` is generated from the same array as the visible questions**, with names matching in order.
  - **Native `<details>` FAQ disclosures, closed on load**, operable by keyboard and without JavaScript. (They were already native before B5.)
  - **Headings:** C+ pages are **not** required to keep the Direction C heading outline. They must have a **logical, accessible heading hierarchy**: one H1, no skipped levels, headings that describe their sections. Changed accessible names are declared.
  - **Owner-blocked content renders nothing:** no placeholder, partial address, unverified year or "our team" filler.
  - **KD-09/KD-10 figure-text rules** where figures are used: rendered text ≥ 12px and ≥ 4.5:1; marks ≥ 3:1 non-text.
  - **Consent and analytics:**
    - the consent bootstrap comes first; the R1 safeguard (`DEC-038`) is kept;
    - the event taxonomy, `ContactForm` and `BookingLink` behaviour and CTA destinations are unchanged;
    - no new `dataLayer` events or `data-*` tracking hooks without a taxonomy decision;
    - the E6 probe must pass I1–I9 in 3 engines;
    - GTM-relevant structural changes (IDs, classes, link text, visibility behaviour) are recorded for E6, as in `gate-4/b5/evidence/addendum/`.
  - **Motion:** reduced motion is respected; no content is hidden without JavaScript; S2 (chain draw-in) is still unauthorised unless approved separately.
  - **Regression:** compare against `gate-4/baseline-pre-cplus/` (layout/a11y NEW 0 × 3 engines, inventory, served head, analytics parity), plus the static gates and the cPanel build.
- **Still OUTSTANDING (unchanged by this decision):**
  - **E6** container-level verification (GTM export and Preview);
  - **SR-1 – SR-5** manual VoiceOver/TalkBack checks (`DEC-050` deferral, required for release);
  - **E1** real-device and cross-browser release testing;
  - **production integration** of any C+ page;
  - KD-02, OBS-1, OBS-20, LIVE-1, LIVE-2 and PROC-1.
- **What this decision does NOT do:**
  - close B5, KD-09, KD-10 or OBS-6;
  - authorise B6, C+ implementation on `ui-revamp`, a merge of `proto/direction-c-plus`, or any change to application code;
  - give production approval to any prototype's copy, SEO changes or claims;
  - expand the service taxonomy (`DEC-005`, `SERVICE_ARCHITECTURE.md`);
  - approve a push, merge, staging or production deployment.
- **Evidence / context:**
  - `docs/ui-revamp/GATE_4_B5_TRUST_METHOD_PAGES.md`;
  - `docs/ui-revamp/gate-4/b5/evidence/addendum/README.md` (`3bd7e37`);
  - `docs/ui-revamp/gate-4/baseline-pre-cplus/` (`3d7f97b`);
  - on branch `proto/direction-c-plus`: `docs/ui-revamp/c-plus/README.md` and `components/proto-cplus/content.ts` (`METHOD_PLAIN` header).
- **Supersedes:** `DEC-034` **only as the intended final creative direction.** `DEC-034` remains **historically valid** for the earlier Direction C work (Gate 2, Gates 3–4, B1–B4), whose acceptances stand. Direction C remains the implemented and accepted state of B1–B4 until a later decision. Read with `DEC-034`, `DEC-036`, `DEC-038`, `DEC-050`.
- **Approved by:** Project owner, 2026-10-12 (Option B selection and C+ direction brief). Recorded by the repository worker.

### DEC-052
- **Date:** 2026-10-14
- **Status:** **Approved — lean website release with a host-only lead CSV export; Mini CRM out of scope.** Release preparation only: **no deployment, no merge and no production change is authorised by this entry.**
- **Decision (owner, as given in the "final release decisions" brief):**
  1. **Lean release.** The approved release candidate (`abcb/cplus-integration` @ `d27f464`) ships from a clean branch based on `main`, with the approved website code, the lead-export script, essential documentation and the QA tooling, and **without** bulk screenshots, test-result archives or logs. The original integration branch and its full QA history are preserved in a private, verified archive and are **not** deleted or rewritten.
  2. **Lead export.** A host-only script, `scripts/export-enquiries.cjs`, exports enquiries from the existing MariaDB `enquiries` table by date range to CSV (explicit safe columns; formula-injection safe; read-only; bounded; no personal data in logs; never modifies records). **No public admin route or dashboard.** Usage: `docs/10-technical/LEAD_EXPORT.md`.
  3. **Mini CRM remains out of scope** for this release and is not changed.
  4. **Deployment safety (PR #3, R0):** approved in principle through the normal GitHub review; branch protection is kept; `anikesh-dev` reviews; no approval bypass and no merge before the authorised reviewer approves.
  5. **Production dependencies:** keep the verified dependency-preparation procedure ready; do not modify the production host yet.
- **Implemented on:** branch `release/cplus-lean` (not pushed at recording). Every application, config and test file outside `docs/` is byte-identical to `d27f464` except the three added export files (`scripts/export-enquiries.cjs`, `tests/export-enquiries.test.cjs`, `tests/export-enquiries.db.test.cjs`).
- **Outstanding:** PR #3 review and merge; owner review of the lean file inventory; pushing the release branch and opening its PR; production dependency preparation (`~/deps/<lock sha12>`); release dispatch. Each needs its own owner go-ahead.
- **Read with:** `DEC-051`. **Approved by:** Project owner, 2026-10-14. Recorded by the repository worker.

### DEC-053
- **Date:** 2026-10-15
- **Status:** **Approved — `/google-ads` copy, commercial commitments, structure, H1 handling and visual direction (storyboard v4). Documentation and design-pass proposal authorised. Website implementation is NOT authorised.**
- **Decision (owner, "Final Owner Decision Record & ABCB Handoff", 2026-10-15; scope is the `/google-ads` page only):**
  1. **Commercial and content decisions OD-01 – OD-11 (all APPROVED; OWNER REQUIREMENT for use in `/google-ads` copy):**
     - **OD-01** the management fee covers Google Ads management **and** oversight;
     - **OD-02** advertising spend is paid directly to Google; MappedSkills charges a separate management fee;
     - **OD-03** every Google Ads management client receives a monthly performance report and monthly review call;
     - **OD-04** reporting covers campaigns, searches and performance against a recorded starting point, where data allows;
     - **OD-05** MappedSkills explains significant changes, proactively communicates poor results and recommends corrective actions;
     - **OD-06** MappedSkills reviews advertising spend and adjusts campaigns when performance indicates changes are needed;
     - **OD-07** available baseline performance is recorded before significant changes;
     - **OD-08** Google Ads enquiries follow Discovery → Audit → Proposal → Approval → Execution, with a recommended plan presented before work begins;
     - **OD-09** MappedSkills discusses suitability before recommending Google Ads, including when another approach may be more appropriate;
     - **OD-10** the secondary CTA "Book a call" appears alongside the primary enquiry CTA;
     - **OD-11** the term "conversion" may appear once, explained in plain business language.
  2. **Service boundary (F-2, Option B):** *Core service, included in the management fee* — Google Ads setup and ongoing management; writing and improving ads; managing advertising budgets; reviewing search performance and improving campaigns. *Oversight, included in the management fee* — reviewing the landing-page experience; checking whether visitors can enquire; identifying website, enquiry-route and tracking problems; explaining findings and recommending improvements. *Additional implementation, agreed separately* — landing-page creation or changes; website and enquiry-form fixes; new tracking setup; technical tracking repairs. No fee schedule is stated or implied, and the page must not imply that every technical task is included or that identified fixes are implemented automatically.
  3. **Structure (F-3):** the seven-block narrative — hero with the One Click receipt; what we look at before suggesting Google Ads; from budget to enquiry (Path Figure); what the work covers; what we answer for; what you learn each month; next step. Ruler and the implied comparison with other agencies removed; scope before accountability; attribution limits merged into reporting; positive commitments plus one concise qualification. **No sections may be added without further approval.**
  4. **H1 and metadata (F-4):** the H1 is **"We run your ads. We look beyond the click."** The earlier proposed H1 ("Google Ads, run for real enquiries — not just clicks.") is retired. "Google Ads" stays in the kicker and the first sentence of the supporting copy. **Title, meta description, canonical, URL, breadcrumbs and structured data are unchanged.** Including the product name in the H1 (Option B) is a possible future revision, not an approved change. **Post-release research (only after a separately authorised release):** review the title shown in Google results; review Search Console impressions and clicks for relevant "google ads" queries against a pre-release baseline where one exists; decide whether the H1 needs the product name. No such evidence has been collected.
  5. **Visual direction (F-5):** retain and refine the hero receipt (spend to Google, fee separately to MappedSkills, what the fee covers, website and tracking implementation agreed separately); suitability factors as an educational list, **no score and no automatic verdict**; the Path Figure is the primary interactive visual (wrong searches, website experience problems, recorded actions that are not genuine enquiries; where MappedSkills manages a problem and where implementation is agreed separately); restrained supporting visuals; purposeful, limited, accessible motion; mobile, reduced-motion, keyboard, screen-reader and no-JavaScript behaviour preserved; no unnecessary dependencies or analytics events.
  6. **CTAs:** primary "Tell us what you're trying to fix"; secondary "Book a call", which must point to a genuine, functioning booking destination (verification below). No free-consultation, audit-pricing, response-time or call-duration statements.
- **Explicit restrictions:** these approvals are **not** extended into other promises. The page must not imply that MappedSkills controls the customer's sales, guarantees enquiry volumes or costs, or can attribute every enquiry. **No ROI, figures, case studies, testimonials or outcome claims.** The service boundary is **not** broadened to other pages by this entry (including `/pricing`, `/services`, `/faq`, `/how-it-works`).
- **Evidence:** owner decision record of 2026-10-15; storyboard v4; repository inspection: the live `/schedule-call` route and its `BookingLink` (`NEXT_PUBLIC_CALENDLY_URL`, else `calendly.com/mappedskills/client-discovery`), which both returned HTTP 200 on 2026-10-15 (page reachability only; slot availability not verified); `/pricing` content ("Your Google Ads spend — paid directly to Google"; "Our management fee — charged separately").
- **Impacted files (documentation only):** `docs/google-ads-redesign/GOOGLE_ADS_COPY_AND_VISUAL_STORYBOARD.md` (v4; v1–v3 kept as `_v1`–`_v3`); `docs/google-ads-redesign/GOOGLE_ADS_DESIGN_PASS_PROPOSAL.md`. Future implementation would touch `components/cplus/google-ads/*` — **not authorised**.
- **Not approved / outstanding prerequisites:** any website source change, new component, animation, metadata change, implementation branch, merge or deployment; owner approval of the Design Pass Proposal; real-device and screen-reader checks (SR-1 – SR-5, E1); consent and analytics regression; the full pre-release gate set; post-release SEO research above; reconciliation of documentation tensions listed in the storyboard §9.
- **Supersedes:** nothing in this log. Narrows, for `/google-ads` only, the earlier unconfirmed fee/spend placeholder in `docs/09-content-pages/copy/google-ads.md` (owner-input item 1).
- **Read with:** `DEC-005`, `DEC-007`, `DEC-013`, `DEC-032`, `DEC-051`, `DEC-052`. **Approved by:** Project owner, 2026-10-15. Recorded by the repository worker.
- **Addendum (2026-10-15, design approval):** the owner approved `docs/google-ads-redesign/GOOGLE_ADS_DESIGN_PASS_PROPOSAL.md`, **including using the existing `Tabs` component (`components/cplus/Interactive.tsx`) for the Path Figure case selector** (no new client component unless `Tabs` proves unsuitable at build planning). **Implementation remains NOT authorised;** the implementation plan and commit scope are proposed in `docs/google-ads-redesign/GOOGLE_ADS_IMPLEMENTATION_PLAN.md` and await explicit owner approval.

### DEC-054
- **Date:** 2026-10-16
- **Status:** **Approved (owner) — `/ai-seo` R3 visual design, with one adjustment; local implementation on `feat/ai-search-redesign` (PR #14) authorised. No push, merge or deployment authorised.**
- **Decision (owner, "AI Search R3 Approved | G2 Implementation", 2026-10-16; scope is the `/ai-seo` page only):**
  1. **The complete R3 visual design is approved** (`docs/ai-search-redesign/r3/`; copy in `R3_COPY.md`), in this section order: hero · shortlist · industry examples · fictional-business scenario · five-step journey · reporting journey (Ask, Compare, Track) · the historical evidence record · FAQ · closing CTA. The hero, shortlist, FAQ and close are unchanged.
  2. **One adjustment: 1.5 seconds between steps** (not 2 seconds) in every animated storytelling sequence on the page. Each sequence starts when seen, plays once, has no Pause, Play or Replay control, and stops when a visitor selects a step; reduced motion and no-JavaScript show everything complete.
  3. **DEC-015 clarification (owner-approved exception for `/ai-seo` only):** the dated self-test is relocated from a headline section ("We tested this on ourselves first", "0 of 28") to a closed native disclosure, "The record", with a normal heading and the page's own typography. **The original research is not altered or deleted:** the 31 August 2026 date, scope (28 questions, five AI tools, one location, English, signed out), every figure (0 of 28 per tool; 7 of 8 by-name answers described us substantially accurately; directories cited in at least 10 of 28), the untested classification (Claude and Grok are not a zero) and all limits remain, in full. This does not change DEC-015's general rules for any other page.
  4. **Industry examples are illustrative:** Manufacturing, Jewellery, D2C brands and Real estate, with example questions only. No industry statistic is used. The third-party Reckona AI figures behind the homepage chart (verified at source on 2026-10-16: 18 of 25, 14 of 20, 16 of 25; no jewellery sector) are **not** used on `/ai-seo` (R3 decision AX-R3-D02b not adopted).
  5. **The example tracking information carries the visible label "Illustrative example"** and is not a MappedSkills dashboard, report or client result. The scenario implies no guaranteed AI recommendation.
  6. **Metadata, H1 ("When buyers ask AI, is your business in the answer?"), route and CTA destinations are unchanged.**
- **Flagged, not decided:** the former in-page links to `/seo` and `/conversion-optimization` (from the removed "Worth doing now, or later?" section) are gone. `/seo` and `/services` remain in the FAQ "Related" line; `/conversion-optimization` has no in-body link from `/ai-seo` but stays in the site header and footer and is linked from other pages. Reintroducing a link needs a flagged decision. The optional shorter journey descriptions (AX-R3-D10) were not applied.
- **GTM (for E6):** no analytics code reads these ids or classes. Heading ids are now `as-h1`, `as-h-shift`, `as-h-ind`, `as-h-scn`, `as-h-jr`, `as-h-rp`, `as-h-evi`, `as-h-qs`, `as-h-close` (removed: `as-h-src`, `as-h-rep`, `as-h-fit`; the Pause/Play/Replay button `.ax-jr-ctl` no longer exists). New numbered-step `button.ax-st-n` and industry `button.ax-chip` elements exist; new CTA link text "Ask us how your business appears" (destination `/contact`). No event, `dataLayer` push or `data-*` hook was added. A container-level GTM Preview check remains with E6.
- **Not authorised:** push, merge of PR #14, deployment, any change to other pages or shared components, new analytics events.
- **Evidence:** `docs/ai-search-redesign/r3/` (R3_REVIEW.html, R3_COPY.md, R3_DECISIONS.md, mockup); `docs/04-ai-visibility/AI_VISIBILITY_BASELINE.md` (the preserved record); `components/cplus/home/ai-visibility-data.ts` (third-party source note); `docs/ai-search-redesign/r3/R3_IMPLEMENTATION_REPORT.md`.
- **Read with:** `DEC-005`, `DEC-015`, `DEC-032`, `DEC-050`, `DEC-051`. **Approved by:** Project owner, 2026-10-16. Recorded by the repository worker.

### DEC-055
- **Date:** 2026-10-17
- **Status:** **Approved (owner) — `/conversion-optimization` G1 visual direction, consolidated copy, structure and interaction decisions, with two revisions (CO-D06, CO-D07); local implementation (G2) on `feat/conversion-optimization-redesign` authorised. No push, PR, merge or deployment authorised.**
- **Decision (owner, "ABCB | Conversion Optimization | G1 Approved, Begin G2 Implementation", 2026-10-17; scope is the `/conversion-optimization` page only):**
  1. **G1 visual direction approved** (`docs/conversion-redesign/g1/`: `CO_G1_REVIEW.html`, `CO_G1_COPY.md`, `CO_G1_DECISIONS.md`, `mockup/`). The original G1 files are preserved unchanged.
  2. **CO-D01 and CO-D08 approved:** the shorter hero introduction and the simplified closing copy, with no long or double dashes.
  3. **CO-D02 approved:** the redesigned hero illustration (three tiles), with the four-point caption removed.
  4. **CO-D03 approved:** the "What business owners usually ask us to do" section is removed; its idea is kept in the speech bubble "Can you redesign our website?".
  5. **CO-D04 approved:** the toggle is replaced by the verdict "It can help with 2 and 3. It won't fix 1 or 4." The note "The last one is the hardest…" is removed. The numbered stations 1 to 4 carry the same numbers the verdict refers to.
  6. **CO-D05 approved:** "We make the agreed changes, with your input where needed."
  7. **CO-D06 approved with a revised service description (OWNER REQUIREMENT):** MappedSkills primarily makes improvements and measures results afterwards. **Formal A/B testing is not described as a routine service.** Headline "We make improvements. Then we measure what changes." Supporting copy "We check how visitors respond after the changes and compare the results with what was happening before." Visual progression Improve → Measure → Review. The page must not imply that observed changes necessarily prove causation. The G1 "luck can look like improvement" story and its "Plenty each month: we test two versions side by side" branch are therefore **not** implemented.
  8. **CO-D07 approved with a revised evidence claim:** the first-hand evidence section is kept and rebuilt. The absolute headline "Every enquiry was lost" is replaced by "Our own enquiry form wasn't working." Supporting message: "That's why one of our first checks is simple: send a test enquiry and see if it arrives." The underlying historical evidence is not changed and no stronger claim is introduced (`CURRENT_CODEBASE_AUDIT.md` C1 found the old form only simulated sending).
  9. **CO-D09 approved:** a "What happens next" row in the close, using only the confirmed operational facts of `DEC-051` item 5 (no response time, price or guarantee).
  10. **CO-D10 approved:** cream or ink tiles with tangerine highlights; the green tick stays on the recreated confirmation screen.
  11. **CO-D11 approved, revised 2026-10-17 (owner, final timing adjustment): 1.5 seconds between steps** (originally two seconds), 400 ms entrance and 200 ms hover/state transitions, in Conversion Optimization journeys. The first meaningful step is visible immediately (never a blank start); each journey plays once, keeps its completed state, supports manual selection, and respects reduced motion. **The released `/ai-seo` animations (1.5 s, 1 s) are not changed.**
  12. **CO-D12 and CO-D13 recorded as technical notes** (below).
- **Technical notes (GTM, for E6):** no analytics code reads these ids or classes. Heading ids are now `co-h1`, `co-h-four`, `co-h-work`, `co-h-meas`, `co-h-own` and the shared `b-close-h` (previously `hs-h1`, `hs-h-brief`, `hs-h-four`, `hs-h-work`, `hs-h-thr`, `hs-h-own`). New numbered-step `button.co-n` elements exist; the tabs (`hs-steps`) and the press toggle (`hs-reach`) no longer exist. CTA text and destinations are unchanged. No event, `dataLayer` push or `data-*` tracking hook was added. A container-level GTM Preview check remains with E6. Heading outline: H1 unchanged; H2s keep their live wording except the measurement H2 (CO-D06) and the evidence H2 (CO-D07); four H3s added in "How we work"; the four station H3s are retained; the removed "usual brief" section had no heading.
- **Unchanged:** page title, meta description, canonical, URL, breadcrumb trail, structured data, H1, and all CTA and in-body link destinations (`/contact`, `/schedule-call`, `/problems/traffic-but-no-enquiries`, `/how-it-works`).
- **Not authorised:** push, PR, merge, deployment, changes to other pages or shared components, new analytics events.
- **Evidence:** `docs/conversion-redesign/g1/`; `docs/conversion-redesign/g2/` (implementation report). **Read with:** `DEC-005`, `DEC-032`, `DEC-050`, `DEC-051`, `DEC-054`. **Approved by:** Project owner, 2026-10-17. Recorded by the repository worker.

### DEC-056
- **Date:** 2026-10-17
- **Status:** **Approved (owner) — final approval of the `/conversion-optimization` redesign; push and PR authorised. No merge and no deployment authorised.**
- **Decision (owner, "Final Approval and PR Preparation", 2026-10-17):** the implementation on `feat/conversion-optimization-redesign` (local commit `b5a8ce0`, preview BUILD_ID `0005ab9f0tP4t8h-mD-P8`) is approved in full: the G1 design, copy, claims, structure and interactions as recorded in `DEC-055`, including the revised CO-D06 (improve, measure, review; no routine A/B testing) and CO-D07 ("Our own enquiry form wasn't working."), and the CO-D11 timing revision. **Approved journey settings:** 1,500 ms between steps; 400 ms entrance transitions; 200 ms hover and state transitions; step 1 visible immediately; each journey plays once and keeps its completed state; manual step selection, keyboard access and reduced-motion support. The released `/ai-seo` animations are unchanged.
- **Not authorised:** merge of the PR, deployment, further design or copy changes.
- **Read with:** `DEC-055`. **Approved by:** Project owner, 2026-10-17. Recorded by the repository worker.

### DEC-057
- **Date:** 2026-10-17
- **Status:** **Approved (owner) — `/lead-generation` G1 visual direction, structure and finalized copy; local implementation (G2) on `feat/lead-generation-g2` authorised. No commit, push, PR, merge or deployment authorised.**
- **Decision (owner, "ABCB | Lead Generation | G1 Approved, Begin G2 Implementation", 2026-10-17; scope is the `/lead-generation` page only):**
  1. **G1 approved** following Owner Confirmation 04: visual direction, section order, layout, illustrations, interactions and finalized copy (`docs/lead-generation-redesign/g1/`: `LG_G1_COPY.md`, `LG_G1_DECISIONS.md`, `LG_G1_CONFIRMATION_04.md`, `mockup/`). Prior owner records: Correction 01 (no manual lead review), Correction 02 (direct delivery, three-step journey, no confirmation prerequisite), Confirmation 03 (operating model), Confirmation 04 (conditional delivery testing; monthly report; no monthly review call).
  2. **Approved decisions:** **LG-D01** retain the existing H1; **LG-D03** add the secondary CTA "Book a call" → `/schedule-call` (hero and close); **LG-D08** delivery-route testing is conditional ("Where the setup allows, we test that enquiries reach the right destination."); **LG-D19** use meta description option A ("Lead generation that brings in enquiries worth calling back. We manage the campaigns; enquiries go directly to your own form, CRM or WhatsApp."); **LG-D27** enquiries go directly to the client's own form, CRM or WhatsApp, depending on setup; **LG-D28** the targeting wording "You tell us who you want to reach. We build campaigns around them."; **LG-D30** monthly campaign performance reporting ("You receive a monthly report on campaign performance.").
  3. **Operating facts (OWNER REQUIREMENT):** MappedSkills manages advertising campaigns; enquiries go directly to the client's team through their own form, CRM or WhatsApp; MappedSkills does not manually review, approve or release individual client enquiries (and does not routinely receive them); delivery-route testing is conditional on the client's setup or engagement; clients receive a monthly campaign performance report. **No guarantee** of lead quality, conversion, integration success or specific reporting metrics; no claim that enquiries are genuine, qualified or relevant.
  4. **`DEC-051` superseded for Lead Generation only:** the earlier reading that clients receive "monthly performance reports **and monthly review calls**" (`DEC-051` item 5) no longer applies to `/lead-generation`. A monthly review call is **not confirmed** and is not presented as a standard commitment. (The Google Ads decision `DEC-053` OD-03 is a separate record and is not changed here.)
  5. **Approved for separate correction scoping only, not for implementation in G2:** **LG-D22** (the privacy policy lists "Marketing budget range" although the form does not collect it) and **LG-D29** (outdated "published definition" references on `/faq`, the 404 list, a blog CTA, a header description and homepage accountability text; the shared "accountable up to the qualified enquiry" positioning of `DEC-005` is **not** to be rewritten).
  6. **LG-D24 remains a separately gated production factual correction** (`docs/lead-generation-redesign/g1/LG_PRODUCTION_CORRECTION_PROPOSAL.md`); it is not authorised, and `/lead-generation` G2 does not by itself deploy it.
  7. **Timing:** about two seconds between journey steps (owner instruction for this page; `/ai-seo` and `/conversion-optimization` use 1.5 s), step 1 on screen from the start, play once, reduced-motion and no-JavaScript fallbacks.
- **Technical notes (GTM, for E6):** no analytics code reads these ids or classes (`rg` over the repository). Heading ids are now `lg-h1`, `lg-h-prob`, `lg-h-do`, `lg-h-chk`, `lg-h-bd`, `lg-h-qs`, `lg-h-close` (removed: `lg-h-sit`, `lg-h-def`, `lg-status-k`). New step buttons `button.lx-n`. No new analytics events or `data-*` hooks.
- **Unchanged:** page title, canonical, URL, robots, breadcrumb trail and `BreadcrumbList`, global structured data, the H1, `/contact` and `/how-it-works` and the "Related" link destinations. **Metadata changed:** description (and so the Open Graph and Twitter description) only, per LG-D19.
- **Not authorised:** commit, push, PR, merge, deployment; changes to `/google-ads`, `/social-media-ads`, `/ai-seo`, `/conversion-optimization` or shared components; implementation of LG-D22 or LG-D29; the LG-D24 production correction; G3 or any further work.
- **Evidence:** `docs/lead-generation-redesign/g1/`; `docs/lead-generation-redesign/g2/` (implementation report, verification scripts and result JSON; the screenshots and G1 versus G2 comparison images are in the evidence archive, see the footprint addendum). **Read with:** `DEC-005`, `DEC-032`, `DEC-050`, `DEC-051`, `DEC-054`, `DEC-055`. **Approved by:** Project owner, 2026-10-17. Recorded by the repository worker.
- **Addendum (2026-10-17, G2 approval and controlled local commit; owner, "G2 Implementation Approved" and "G2 | Controlled Local Commit"):** the four authorisations are distinct.
  1. **G1 design approval** (above, unchanged): visual direction, structure and finalized copy of the `/lead-generation` G1 mockup.
  2. **G2 implementation approval:** the owner reviewed and approved the local implementation on `feat/lead-generation-g2` (`docs/lead-generation-redesign/g2/LG_G2_REPORT.md`). Automated checks only; **manual screen-reader, cross-browser and real-device testing have not been performed** and are not claimed.
  3. **Local commit authorisation:** one local commit on `feat/lead-generation-g2` (base `origin/main` `0fe87b2`) containing only the G2 implementation and its supporting documentation, subject to pre-commit verification.
  4. **Still NOT authorised:** push, pull request, merge and deployment. `LG-D24` (the live-page production factual correction) remains separately gated; `LG-D22` and `LG-D29` remain separately scoped and are not implemented. No change to `/google-ads`, `/social-media-ads`, `/ai-seo` or `/conversion-optimization`.
  5. **Repository footprint addendum (2026-10-17, owner approval of the pre-push hygiene recommendation):** the local commit was replaced by a lean one. Kept in Git: source, tests, this log, the G1 and G2 records, the approved mockup, the owner's annotated PDF (`docs/lead-generation-redesign/g1/owner-pdf/LG_owner_review.pdf`, the only surviving copy of the original), result JSON and five portable verification scripts. Moved outside Git, with no loss: 192 review screenshots, the two review pages and seven superseded or non-portable tools, in `LG_G1_G2_evidence_archive.zip` (204 files, SHA-256 manifest, verified). No approval decision or evidence was removed. Push, PR, merge and deployment remain unauthorised.

### DEC-058
- **Date:** 2026-10-18
- **Status:** **Approved (owner): `/how-it-works` G1 R2 design, copy and SEO metadata; local G2 implementation and verification on `feat/how-it-works-g2` authorised.** No commit, push, PR, merge or deployment is authorised.
- **Decision (owner, "How It Works | G1 Visual Refinement (R2)", R2 approval of 2026-10-18, and "G2 Implementation Authorization", 2026-10-18; scope is the `/how-it-works` page only):**
  1. **G1 R2 is approved:** visual design, structure, customer-facing copy, interactions and responsive layouts of the mockup in `docs/how-it-works-redesign/g1/` (`mockup/`, `HIW_G1_NOTES.md`). The audit is `docs/how-it-works-redesign/g0/HIW_G0_AUDIT.html`.
  2. **HW-D01 (approved 2026-10-17):** reporting and review-call wording, exactly: "A monthly performance report, and a review call where your service includes one." This is folded into the redesign; there is no separate live-page correction.
  3. **HW-D02:** the qualified-enquiry ledger, "Accountable up to here" and "every one of the six points is reported" are removed from this page. The `DEC-005` wording on other pages is unchanged.
  4. **HW-D06:** "What we do not know" (the keyword tool, own analytics start, the AI test round, the organic horizon) is removed from this page.
  5. **HW-D08:**
     - title "How It Works: From First Call to Monthly Review | MappedSkills";
     - meta description "How working with MappedSkills runs: a discovery call, an audit, a plan you approve, then the work and a monthly report. Including what tracking can’t show.";
     - the H1 ("No mystery about what happens next."), URL, canonical, robots and structured data are unchanged;
     - no `BreadcrumbList` is added.
  6. **HW-D03, D04, D05 and D07, as resolved in G1:**
     - the "entered by a person" logging claim is removed;
     - the audit step is kept (`DEC-051` item 5);
     - the channel line is softened to "If we don’t think something suits your business, we’ll say so.";
     - seven sections;
     - the limits section stays visible and condensed (five items), because `/conversion-optimization`, `/google-ads`, `/about` and `/faq` link here promising it;
     - 1.5 s between journey steps.
  7. **G2 scope:**
     - implement only `/how-it-works`, on `feat/how-it-works-g2` from `origin/main` `347ac5e`, following `docs/how-it-works-redesign/g2/HIW_G2_IMPLEMENTATION_PLAN.md`;
     - the analytics page type stays `methodology`;
     - no previously released page and no shared component may be modified.
- **Facts used (no new claims):** `DEC-051` item 5; HW-D01; `DEC-053` F-2 and OD-04 ("where the data allows"); `DEC-056` (no causation claim from small numbers). Not stated: response time, price, duration, guarantee, report metric, or that MappedSkills reviews or qualifies enquiries.
- **Not authorised:** commit, push, PR, merge, deployment; changes to other pages or shared components; new analytics events.
- **Read with:** `DEC-005`, `DEC-051`, `DEC-053`, `DEC-056`, `DEC-057`. **Approved by:** Project owner, 2026-10-17 (HW-D01) and 2026-10-18 (R2, HW-D02, HW-D06, HW-D08, G2 authorisation). Recorded by the repository worker.
- **Addendum (2026-10-18, owner):** G2 accepted for a local commit on `feat/how-it-works-g2` only. Review screenshots (`docs/how-it-works-redesign/g2/screenshots/`) are kept outside Git. Push, PR, merge and deployment remain unauthorised.

### DEC-059
- **Date:** 2026-10-18
- **Status:** **Approved (owner): `/services` G1 design (final visual approval); local G2 implementation and verification on `feat/services-g2` authorised.** No commit, push, PR, merge or deployment is authorised.
- **Decision (owner, "Services | G1 Final Refinement", final G1 approval, and "Services Page | G2 Implementation Authorization", 2026-10-18; scope is the `/services` page only):**
  1. **The final G1 design is approved:** `docs/services-redesign/g1/` (`mockup/`, `SV_G1_NOTES.md`). The G0 audit is `docs/services-redesign/g0/SV_G0_AUDIT.html`. There are five sections:
     - the hero, with "the route" drawn still;
     - "Where to start": the problem selector and the six service cards, in one section;
     - "One enquiry, start to finish": Capture → Convert → Measure;
     - the scope strip;
     - the tangerine close.
  2. **SV-D01:** the H1 is "Get found. Get enquiries. See what's working." The title, description, canonical, URL and structured data are unchanged.
  3. **SV-D02, D03, D04:** the selector and the cards are combined; there are three equal stages; the scope is one compact strip.
  4. **SV-D05:** concise service-card copy. The detailed qualifications stay on the dedicated service pages (for example the Google Ads fee note and the AI search limits).
  5. **SV-D06:** "Book a call" is the secondary CTA in both the hero and the close. Primary CTAs go to `/contact`.
  6. **SV-D07:** micro-interactions are 150 ms on this page (`/conversion-optimization` keeps its 200 ms from `DEC-056`). The journey shows step 1 from the start, moves on every 1.5 s, and plays once. Reduced motion and no JavaScript show it complete.
  7. **SV-D08:** the Lead generation card follows `DEC-057`: "Ad campaigns that send enquiries straight to your own form, CRM or WhatsApp."
  8. **Example:** a fictional kitchen fitter, labelled "Illustrative example. Not a real client. No real figures."
  9. **Measurement** is part of every service, not a seventh service.
  10. **Phone length:** accepted after the R1 refinement.
- **Facts used (no new claims):**
  - `DEC-051` item 5: reply by email or WhatsApp, a call, then a plan before work starts;
  - the monthly report (HW-D01, `DEC-057`);
  - "where tracking allows" (`DEC-053` OD-04);
  - SEO "usually 12 months or more" (live copy).
- **Not stated:** guarantees, lead quality, figures, response times or review calls.
- **Technical notes (GTM, for E6):**
  - no analytics code reads these ids or classes;
  - heading ids are now `sv-h1` (kept), `sv-h-pick`, `sv-h-jr`, `sv-h-scope` and `b-close-h`;
  - removed ids: `sv-h-route`, `sv-h-join`, `sv-h-lim`, `sv-h-close`;
  - new elements: `button.sx-opt[aria-pressed]` (the problem selector) and `button.sx-n` (journey steps, "Show step N: …");
  - CTA text unchanged; a "Book a call" link is new in the hero and the close;
  - no events, `dataLayer` pushes or `data-*` hooks were added;
  - the analytics page type stays `commercial`.
- **Not authorised:** commit, push, PR, merge, deployment; changes to other pages or shared components; new analytics events.
- **Read with:** `DEC-005`, `DEC-032`, `DEC-051`, `DEC-053`, `DEC-056`, `DEC-057`, `DEC-058`.
- **Approved by:** Project owner, 2026-10-18. Recorded by the repository worker.
- **Addendum (2026-10-18, owner, "G2 implementation for /services approved. Stop here; commit not yet authorised."):** the G2 implementation on `feat/services-g2` (`docs/services-redesign/g2/SV_G2_REPORT.md`) is approved. Automated checks only. **Not done:** manual screen-reader, Firefox/WebKit, real-device and GTM Preview checks. **Still not authorised:** commit, push, PR, merge and deployment.
- **Addendum (2026-10-18, owner, "Services | G2 Approval and Local Commit"):** the G2 implementation and visual design for `/services` are approved. One local commit on `feat/services-g2` is authorised. **Open before production release:** manual screen-reader testing, Firefox/WebKit verification, real-device testing and GTM Preview validation. **Still not authorised:** push, PR, merge, deployment and release workflows.

### DEC-060
- **Date:** 2026-10-18
- **Status:** **Approved (owner): `/about` G1 design and copy frozen at R4; local G2 implementation and verification on `feat/about-g2` authorised, with four team-head placeholders.** No commit, push, PR, merge or deployment is authorised.
- **Decision (owner, 2026-10-18; scope is the `/about` page only):**
  1. **G0:** AB-D01 to AB-D09 approved as recommended (`docs/about-redesign/g0/AB_G0_AUDIT.html`, `AB_G0_DECISIONS.md`). The self-measurement ("0 of 28") is removed from `/about` and stays, dated and complete, on `/ai-seo`; the research is unchanged.
  2. **G1:** R1 visual direction, R3 final design and copy, and R4 process copy approved, then frozen (`docs/about-redesign/g1/AB_G1_NOTES.md`, `mockup/`). The H1 is "A marketing partner who sees the bigger picture." (the homepage keeps "Judge us on the enquiries, not the traffic."). There are five sections: hero, a still comparison, four commitments with the boundary, four team heads, and the close.
  3. **Owner-confirmed facts (OWNER REQUIREMENT):**
     - MappedSkills is an independently operated digital marketing agency;
     - it has a wider team led by four principal team heads, who are featured without implying they are the whole team;
     - it plans and coordinates the marketing services a client hires it to manage (connected execution is how it works, not a guaranteed outcome);
     - findings, the proposed approach and the scope are shared for approval before work begins;
     - monthly performance reporting is standard, and review calls are mentioned only where the agreed service includes one;
     - MappedSkills is responsible for the marketing services it manages; the client handles responding to enquiries, quoting and selling;
     - prospects can get in touch through the form, email or WhatsApp, and work begins only after the agreed approval.
     Points 1, 3 and 5 of the R4 table keep their qualified wording.
  4. **CTAs:** "Tell us about your business" → `/contact` (primary) and "Book a call" → `/schedule-call` (secondary), in the hero and the close. No mandatory call is implied in "What happens next".
  5. **Team heads:** four clearly marked placeholders until the owner supplies real photographs, names, roles and introductions. **The page must not be released publicly with unfinished placeholders.**
- **Unchanged by G2:** URL, canonical, robots, global `Organization` JSON-LD (no BreadcrumbList, no Person JSON-LD), analytics page type `about`. Title and description: see the G2 review addendum below.
- **Technical notes (GTM, for E6):** no analytics code reads these ids or classes. Heading ids are `ab-h1` and `ab-h-why` (kept), plus `ab-h-count`, `ab-h-people` and `b-close-h`. Removed: `ab-h-hold`, `ab-h-fig`, `ab-h-how`, `ab-h-check`, `ab-h-fit`, `ab-h-close`, the figure button and `AccountFigure.tsx`. The page ships no client JavaScript of its own. No events, `dataLayer` pushes or `data-*` hooks were added.
- **Not authorised:** commit, push, PR, merge, deployment; changes to other pages or shared components.
- **Evidence:** `docs/about-redesign/` (G0, G1, `g2/AB_G2_REPORT.md`; G2 screenshots kept outside Git). **Read with:** `DEC-005`, `DEC-032`, `DEC-051`, `DEC-053`, `DEC-057`, `DEC-058`, `DEC-059`. **Approved by:** Project owner, 2026-10-18. Recorded by the repository worker.
- **Addendum (2026-10-18, owner, "G2 implementation for /about approved. Stop here; commit not yet authorised."):** the G2 implementation on `feat/about-g2` (`docs/about-redesign/g2/AB_G2_REPORT.md`) is approved. Automated checks only. **Not done:** manual screen-reader, Firefox/WebKit, real-device and GTM Preview checks. **Open before release:** the four team-head profiles and an owner decision on the title and description. **Still not authorised:** commit, push, PR, merge and deployment.
- **Addendum (2026-10-18, owner, "/about | G2 Review Decisions"):** (1) title "About MappedSkills | Our Team & Approach" and description "Meet the team behind MappedSkills. Discover how we connect digital marketing services, turn interest into enquiries and measure what matters." (Open Graph and Twitter follow through `createMetadata`; URL, canonical, robots and JSON-LD unchanged); (2) screenshots and bulky visual evidence kept outside Git (`docs/about-redesign/README.md`; archive with SHA-256 manifest; originals retained); (3) **release blockers:** real profiles for the four team heads and written photo consent; until then four marked placeholders stay local. **Still not authorised:** commit, push, PR, merge and deployment.
- **Addendum (2026-10-18, owner, "/about | G2 Copy Simplification R5"; approved as shown):** the "Why we work this way" and "What you can count on us for" copy is simplified (`docs/about-redesign/g2/AB_G2_REPORT.md`, R5), superseding the R4 wording of those two sections only. Layout, other sections, team placeholders and metadata are unchanged. **Still not authorised:** commit, push, PR, merge and deployment.
- **Addendum (2026-10-18, owner, "About Page | Commit Authorization"):** one local commit on `feat/about-g2` is authorised for the approved G2 R5 implementation and the lightweight decision records (screenshots and the evidence archive stay outside Git). **Production-release blockers:** the four team-head profiles and written photo consent. **Still not authorised:** push, PR, merge and deployment.

### DEC-061
- **Date:** 2026-10-18
- **Status:** **Approved (owner): `/pricing` G1 R0 design and copy, frozen; local G2 implementation and verification on `feat/pricing-g2` authorised.** No commit, push, PR, merge or deployment is authorised.
- **Decision (owner, 2026-10-18; scope is the `/pricing` page only):**
  1. **OWNER REQUIREMENT:** MappedSkills uses fully customised pricing. There are no standard packages, published starting prices or indicative ranges, and none may be displayed. This resolves the `/pricing` owner blocker recorded since Gate 9B **only** to this extent: no price, band, minimum or currency is to be published.
  2. **G1:** R0 approved as proposed ("G1 pricing design and copy approved as proposed. Statements in the notes table are confirmed."; `docs/pricing-redesign/g1/PR_G1_NOTES.md`, `mockup/`). H1 "The right work. A price that makes sense." Five sections: hero with a numberless price tag; three factors (what you need, what needs fixing, how much work is involved); what your fee covers; three quote steps; close.
  3. **Owner-confirmed statements (PR_G1_NOTES §4):** the fee is scope-based ("the more there is to do, the more the work costs"); the three factors; a monthly performance report comes with ongoing marketing work, review calls only where agreed in the proposal; the proposal sets out the recommended services, scope, deliverables, reporting and fees; ad budget is paid directly to the platform and the MappedSkills fee is charged separately; nothing starts until the client approves; the line "No one can honestly guarantee rankings, enquiries or revenue, so we don't."
  4. **CTAs:** hero "Discuss your requirements" → `/contact`, close "Get a proposal" → `/contact`; "Book a call" → `/schedule-call` in both.
  5. **Constraints kept:** no prices, ranges, packages, discounts, guarantees, turnaround or proposal-delivery times; no implication that every client needs every service.
- **Unchanged by G2:** URL, canonical, robots, global JSON-LD (no page-level structured data), analytics page type `pricing`. Title and description: see the addendum below.
- **Technical notes (GTM, for E6):** no analytics code reads these ids or classes. Heading ids: `pr-h1` (kept), `pr-h-aff`, `pr-h-cov`, `pr-h-how`, `b-close-h`. Removed: `pr-h-fac`, `pr-h-pay`, `pr-h-steps`, `pr-h-close` and the `data-rv` reveal hooks. The page ships no client JavaScript of its own; no events or `dataLayer` pushes were added.
- **Not authorised:** commit, push, PR, merge, deployment; changes to other pages or shared components.
- **Evidence:** `docs/pricing-redesign/` (G1 notes and mockup, `g2/PR_G2_REPORT.md`, `g2/checks.json`; screenshots kept outside Git). **Read with:** `DEC-005`, `DEC-032`, `DEC-051`, `DEC-060`. **Approved by:** Project owner, 2026-10-18. Recorded by the repository worker.
- **Addendum (2026-10-18, owner, "Approved: keep the G1 H1 and apply the proposed title and description for /pricing. Still no commit, push or deploy."):** H1 stays "The right work. A price that makes sense."; title "Pricing | Tailored Digital Marketing Quotes | MappedSkills"; description "Every MappedSkills quote is tailored to your business. See what affects your price, what your fee covers and how to get a clear proposal before work begins." Open Graph and Twitter follow through `createMetadata`; URL, canonical, robots and JSON-LD unchanged. Keyword demand for the title wording was not researched (RESEARCH REQUIRED). **Still not authorised:** commit, push, PR, merge and deployment.
- **Addendum (2026-10-18, owner, "Pricing Page | G2 Commit Authorization"):** one local commit on `feat/pricing-g2` is authorised for the approved G2 implementation (design, copy and metadata as approved) and the lightweight decision records; screenshots stay outside Git (`docs/pricing-redesign/README.md`). The cPanel build and build-output verification are to be rerun against the committed source before push or PR authorisation is requested. **Still not authorised:** push, PR, merge and deployment.
