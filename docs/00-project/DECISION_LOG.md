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
