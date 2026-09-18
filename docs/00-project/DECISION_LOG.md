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
