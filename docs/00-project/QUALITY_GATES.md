# Quality Gates

No phase should advance merely because an artifact exists.

## Gate Status Summary (as at 2026-09-01)

| Gate | Status |
|---|---|
| **Gate 1 — Existing Site Audit** | Artifacts delivered (Sessions 01/01B). **Orchestrator review pending.** Not marked passed |
| **Gate 2 — Business / Market Validation** | **PASSED — 2026-08-31** |
| **Gate 3 — Search Opportunity Validation** | Artifacts delivered (Session 03). Conclusions consumed by the approved strategy. **Orchestrator review pending.** Not marked passed |
| **Gate 4 — AI Visibility Strategy** | Artifacts delivered (Session 04). Conclusions consumed by the approved strategy. **Orchestrator review pending.** Not marked passed |
| **Gate 5 — Information Architecture** | **PASSED — 2026-09-01** |
| **Gate 6 — CRO Architecture** | **PASSED — 2026-09-01** |
| **Gate 7 — Content Architecture** | **PASSED — 2026-09-01** |
| **Gates 8–22** | **NOT STARTED, NOT APPROACHED, NOT PASSED** |

**Session 06 marked Gate 2 only.** Gates 5, 6 and 7 were approved by the orchestrator on 2026-09-01, recorded in `DECISION_LOG.md` as `DEC-010`, `DEC-011` and `DEC-012`. No gate from 8 onwards is passed, approached or implied by any of these approvals.

## Gate 1 — Existing Site Audit
**Status: artifacts delivered; orchestrator review pending. NOT marked passed.**
**Required:** codebase/site audit, route inventory, SEO inventory, integrations, analytics, performance risks.
**Acceptance:** evidence-backed, read-only, identifies unknowns and migration risks.
**Do not proceed to:** structural redesign decisions before audit review.

## Gate 2 — Business / Market Validation
**Status: PASSED — 2026-08-31 (Session 06).**

**Required:** market, competitor, buyer, category, commercial opportunity research.
**Acceptance:** clear evidence, alternatives compared, hypotheses challenged.
**Do not proceed to:** final positioning before owner approval.

### Why this gate passes
| Acceptance criterion | Evidence |
|---|---|
| Clear evidence gathered | `docs/02-research/MARKET_RESEARCH.md`, `COMPETITOR_RESEARCH.md`, `SOURCE_REGISTER.md`, plus corroborating search (Session 03) and AI-answer (Session 04) evidence bases |
| Alternatives compared | Three complete strategic models compared in `docs/01-business/FINAL_STRATEGY_SYNTHESIS.md` §3–§5, with a stated comparison matrix and stated trade-offs |
| Hypotheses challenged | Session 02 was explicitly instructed to look for evidence the hypothesis was wrong, and returned **MODIFY**. Sessions 03 and 04 independently corroborated from different evidence bases. `DEC-004` was closed as **not adopted** |
| Owner approval obtained | **APPROVED DECISION `DEC-005`, 2026-08-31:** *MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries*, with its full set of approved strategic principles |
| Repository reflects the approved strategy consistently | `BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md` and `OFFER_ARCHITECTURE.md` rewritten together in one pass (`DEC-006`); `DECISION_LOG.md`, `CURRENT_STATE.md` and `ASSUMPTIONS_AND_OPEN_QUESTIONS.md` updated; the documentation contradiction live since Session 02 is closed |
| Evidence integrity preserved | No research artifact was modified. `FINAL_STRATEGY_SYNTHESIS.md` is preserved as the pre-approval record. History was not rewritten to make the approved strategy look inevitable |

### Explicitly NOT passed by this gate
Final messaging and homepage copy · taglines · information architecture and sitemap · URL architecture · keyword map · content plan · offer names, packaging and pricing · the free/paid/hybrid entry model · design direction · the technical migration plan · **manufacturing as an exclusive or company-level specialisation** (candidate beachhead #1 only, gated on three tests) · any international strategy.

### Conditions carried forward, not resolved by the gate
1. **No publishable client proof exists.** The last remaining owner blocker; gates all premium positioning.
2. **Analytics, enquiry capture and a working conversion path are absent in production** and are a hard precondition of any outcome-based claim, including on MappedSkills' own site.
3. **"300%+ ROI", "₹100Cr+", "₹10Cr+"** must not be used as reasons-to-believe (`DEC-007`); production remediation remains an open owner decision.
4. **Manufacturing beachhead volume is UNKNOWN** — no keyword tool has ever been available in this programme.

## Gate 3 — Search Opportunity Validation
**Status: artifacts delivered; conclusions consumed by the approved strategy (`DEC-005`); orchestrator review pending. NOT marked passed.**
**Required:** keyword universe, SERP analysis, intent classification, difficulty/feasibility methodology, topic clusters.
**Acceptance:** traceable data and prioritized opportunity matrix.
**Do not proceed to:** final site architecture based on unresearched keywords.

## Gate 4 — AI Visibility Strategy
**Status: artifacts delivered; conclusions consumed by the approved strategy (`DEC-005`); orchestrator review pending. NOT marked passed.**
**Required:** baseline, prompt universe, crawler policy, entity/citation strategy, measurement method.
**Acceptance:** platform-specific evidence; no unsupported ranking guarantees.

## Gate 5 — Information Architecture
**Status: PASSED — 2026-09-01.** See `DEC-010` in `DECISION_LOG.md`.
**Required:** sitemap, URL architecture, navigation, page inventory, internal linking logic.
**Acceptance:** every page has audience, intent, funnel role, target topic, CTA.

### Why this gate passes
Session 07 delivered the required artifacts; an orchestrator correction pass made manufacturing launch-conditional, removed the mandatory proof detour, made qualified-enquiry creation mechanism-independent, and resolved the duplicate IA directory. Launch counts were reconciled. Session 09 later refined the topic occupying one existing editorial slot (`DEC-009`) — that refinement changed no route, no count, no navigation entry and no commercial intent, and did not reopen this gate. The orchestrator approved the corrected architecture.

## Gate 6 — CRO Architecture
**Status: PASSED — 2026-09-01.** See `DEC-011` in `DECISION_LOG.md`.
**Required:** visitor journeys, CTA hierarchy, form strategy, trust architecture, funnel architecture.
**Acceptance:** page journeys mapped by intent and conversion goal.

### Why this gate passes
Session 08 was reviewed and corrected so that Website Qualified and Sales Qualified remain distinct; attribution completeness is independent of commercial qualification; both a form and a meeting booking can create a qualified enquiry, with booking never automatically qualified merely by existing; the four required form fields stand with budget removed and phone optional; email/MX verification fails open; spam handling is controlled; attribution is first-touch + conversion-touch; the CRM lifecycle stays simple; analytics carries no unnecessary PII; a legitimate enquiry cannot be silently lost to a secondary-integration failure; and the production analytics wording was reconciled with Session 01B live verification. The orchestrator approved the corrected specification.

## Gate 7 — Content Architecture
**Status: PASSED — 2026-09-01.** See `DEC-012` in `DECISION_LOG.md`.
**Required:** content pillars, clusters, launch content roadmap, editorial standards, evidence standards.
**Acceptance:** supports commercial pages, topical authority, AI citation potential, and user usefulness.

### Why this gate passes
Session 09 was reviewed through its original strategy, an editorial correction pass, and a cross-gate reconciliation pass. The final approved unconditional editorial launch set is: (1) AI-assisted discovery / appearing in ChatGPT, (2) search → qualified enquiry / measurement, (3) the website enquiry-loss diagnostic — plus one conditional industrial/B2B article paired with the conditional manufacturing page. AI Search remains a supporting capability, not the company category. The AI Visibility Baseline remains the canonical research home for the Session 04 dataset. Article 2's search target remains **UNVALIDATED** — no search demand may be claimed for it until targeted validation supports it. `how to get cited by ai` is unbuilt at launch, reconsiderable only in PHASE 2 if it can support a distinct, non-duplicating asset. The own-site diagnostic remains research, not a case study. `/research` may launch with one genuine entry if the second research asset is not ready. No fabricated evidence was accepted, and claims/evidence governance is binding. The orchestrator approved the corrected content strategy.

## Gate 8 — Creative Direction
**Required:** visual principles, references, data-visualization language, imagery policy, motion philosophy.
**Acceptance:** distinctive, coherent, avoids generic agency/AI clichés.

## Gate 9 — UX
**Required:** wireframes/page templates, responsive behaviours, component inventory.
**Acceptance:** clear hierarchy, usable at target breakpoints, aligned to CRO.

## Gate 10 — UI / Design System
**Required:** typography, colors, spacing, grids, controls, states, charts, forms, accessibility patterns.
**Acceptance:** reusable, implementation-ready, responsive.

## Gate 11 — Homepage
**Required:** approved final homepage design/prototype.
**Acceptance:** world-class visual quality, understandable positioning, excellent conversion flow.

## Gate 12 — Service Landing Pages
**Required:** final designs/content for each approved core service.
**Acceptance:** search intent aligned, high-conversion structure, sufficient proof/evidence.

## Gate 13 — Development Architecture
**Required:** current-to-target mapping, component plan, migration plan, performance budget.
**Acceptance:** preserves critical functionality and SEO equity.

## Gate 14 — Technical Implementation
**Required:** implemented approved pages/components.
**Acceptance:** visual fidelity, tests run, no regression.

## Gate 15 — Analytics / Automation
**Required:** event taxonomy, GTM/GA4 plan, CRM flow, attribution fields.
**Acceptance:** critical funnel actions measurable.

## Gate 16 — SEO / Schema
**Required:** metadata, canonicalization, schema, sitemap, robots, redirects, internal links.
**Acceptance:** crawl and validation checks pass.

## Gate 17 — Performance
**Required:** lab testing + real-world plan.
**Acceptance:** agreed performance budgets met or documented exceptions approved.

## Gate 18 — Accessibility
**Required:** keyboard, semantics, contrast, forms, reduced motion, screen-reader checks.
**Acceptance:** WCAG 2.2 AA target substantially met.

## Gate 19 — Browser / Device QA
**Required:** agreed device/browser matrix.
**Acceptance:** no critical layout/function issues.

## Gate 20 — Staging
**Required:** full crawl, forms, tracking, redirects, noindex/index controls, legal/privacy checks.
**Acceptance:** release checklist passed.

## Gate 21 — Launch
**Required:** approved production release plan.
**Acceptance:** monitoring, rollback, search-console/indexing checks ready.

## Gate 22 — Post-Launch Validation
**Required:** indexing, crawl, performance, analytics, AI visibility, conversion monitoring.
**Acceptance:** no critical regression and baseline metrics captured.

---

## Rule on Gate Advancement
A gate is passed only when an owner or orchestrator approves it and the approval is recorded in `DECISION_LOG.md`. **Claude has no authority to approve a gate on its own judgement**, and no gate may be marked passed because the phase after it looks ready to start.
