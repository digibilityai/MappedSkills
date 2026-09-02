# UX Architecture — PROPOSED

**Session:** 13 — UX Architecture · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Model:** Claude Opus 5 (high effort)
**Status:** **PROPOSED — NOT APPROVED. Gate 9B is NOT PASSED.** Claude does not approve UX architecture.

**Governed by, and not reopened:** `BUSINESS_STRATEGY.md` and the four frozen business documents (`DEC-005`, `DEC-006`) · the approved IA (`DEC-010`) · the approved CRO system (`DEC-011`) · the approved content architecture (`DEC-012`) · the approved messaging architecture (`DEC-013`) · the approved page copy (`DEC-014`) · the approved creative direction (`DEC-015`), including `14_DESIGN_ANTI_PATTERNS.md`, `16_COMMERCIAL_ENERGY_SYSTEM.md`, `17_ARGUMENT_APPARATUS_HIERARCHY.md`, `18_HOMEPAGE_VISUAL_NARRATIVE.md` and `19_FIGURE_PRIORITISATION.md`.

**Not produced in this session:** wireframes · layouts · style frames · mockups · grids · breakpoint values · type or colour values · component specifications · design-system work · any production code. **No approved document outside the permitted file set was modified.**

---

## 1. What this session is deciding, and what it is not

**UX architecture is the layer between an approved argument and a drawn screen.** It decides what a page must do, in what order, with what available to whom, at what cost in attention — and it stops before deciding what any of it looks like.

| This session decides | This session does not decide |
|---|---|
| Page structure and section sequencing logic | Layout, grid, position, dimension |
| What must be on the first screen, and what must not | How the first screen is composed visually |
| How evidence is reached, and at what cost in effort | How evidence is drawn |
| What a figure must do as an interface | What a figure looks like |
| CTA roles, placement rules and repetition logic | CTA appearance, size or colour |
| Form field grouping, order, states and failure behaviour | Form styling, field widths, label typography |
| Responsive content priority and transformation rules | Breakpoints, spacing, type scale |
| Accessibility requirements the design must satisfy | ARIA implementation patterns, tested compliance |
| Which interactions are permitted and which are optional | Animation timing, easing, library |

**Two judgement rules govern everything below,** carried from the session brief because they are the ones most likely to be violated by well-intentioned work:

> **A user journey is not a forced sequence.** The architecture makes the right next action obvious and leaves every informed buyer free to move non-linearly.
>
> **Consistency is not structural identity.** Six commercial pages sharing a spine is consistency. Six commercial pages with identical section order is a template pretending to be a system.

---

## 2. The UX problem, stated once

MappedSkills must sell a considered, premium engagement to a sceptical India-first buyer **while carrying a documented proof deficit** — no case studies, no reviews, no directory profiles, no analytics baseline — and while publishing more honest limitation than any competitor in the category. The approved creative direction resolves this by putting a permanent evidence apparatus beside a plain commercial argument.

**That resolution creates the UX problem.** Every mechanism that makes the site credible — provenance, dates, samples, limits, not-testable states, unattributed volume — is also a mechanism that can bury the commercial argument, slow the first screen, lengthen every page, and make a firm that intervenes look like an institute that observes. The UX system's central job is to make the apparatus **universally present and never first**, and to do that at a cost in reader effort close to zero.

**The second, smaller problem is that two of the site's most important routes do not currently work at all.** The enquiry form transmits nothing; the booking surface renders empty. The UX below specifies the desired behaviour of both and labels every part of it that depends on infrastructure that does not exist.

---

## 3. The seven buyer questions the system must answer

From the session brief. Each is mapped to where the architecture answers it, and to how fast.

| # | Buyer question | Answered by | Reader effort |
|---|---|---|---|
| 1 | **Is this relevant to my problem?** | The first screen of every page — search-intent confirmation on commercial pages, symptom naming on the problem page, the accountability standard on `/` | Seconds. No scroll |
| 2 | **What does MappedSkills actually do?** | The commercial opener, then the run (F1) | One scroll |
| 3 | **Is this company credible?** | The apparatus, present beside every claim, plus `/how-it-works` and `/research` as destinations | Zero for the impression; one action for any single proof |
| 4 | **How does it approach the work?** | The run on the page they are on; `/how-it-works` for depth | Optional |
| 5 | **Is this appropriate for my business?** | The fit test on `/`, `/pricing`, and the boundary move on every commercial page | One scroll from the end |
| 6 | **What happens if I contact them?** | The conversion surfaces and `/thank-you` — **currently owner-blocked and structurally reserved, never invented** | One action |
| 7 | **What should I do next?** | One primary conversion outcome per page, two surfaces, direct contact at equal weight | One action, from anywhere |

**The forty-second test governs all seven** (`18` §9.1): a founder who scrolls a page for forty seconds without opening a single disclosure must be able to answer 1, 2, 5 and 7. If reaching them requires the apparatus, the argument register is incomplete and `17` §1 Test 1 has failed.

---

## 4. The five UX principles

Derived from approved material; none is new strategy.

**P1 — Commercial meaning leads; evidence stands beside it.**
Emphasis is commercial, presence is evidential (`17` §1). The apparatus is everywhere and never first. Every screen passes the first-fixation test.

**P2 — Every page opens fast. A page may have a slow middle. No page opens slow.**
(`16` §4B.) The first screen of every page is a small number of elements at high contrast, carrying a commercial statement and a route onward. Nothing gates it, nothing animates, no apparatus sits above the fold on a commercial page.

**P3 — Proof is offered, never interposed.**
No page may place `/how-it-works`, `/research`, a figure, a disclosure or a proof section between a visitor and the conversion. This is the rule most likely to be violated quietly during design, and it is a strategy rule (`DEC-010` restriction 5c), not a preference.

**P4 — Nothing that carries information depends on hover, JavaScript, colour, motion or a wide viewport.**
Every figure has a complete static state and a text equivalent. Every disclosure has a keyboard and touch path. Every status is shape-plus-label. The apparatus on a phone is the apparatus, re-parented — never the apparatus deleted.

**P5 — Structure follows the argument, not a template.**
Section shape follows what the section is doing (A15). Consistency lives in the spine — first-screen job, CTA behaviour, evidence behaviour, boundary placement, conversion routing — and variation lives in sequence and depth, driven by buyer intent.

---

## 5. The site's structural spine

Every indexable page is built from the same five-part spine. **What varies is depth, order within the middle, and which parts are present.**

```
1  OPEN          fast · commercial · no apparatus · one clear route onward
2  ESTABLISH     what this is, in this buyer's terms
3  WORK          the mechanism, the scope, the boundary — the slow middle
4  CHECK         evidence, in context, as an offer
5  ACT           one conversion outcome · two surfaces · direct contact as a peer
```

**Binding ordering rule** (`17` §4.2, B28): within part 3, **capability precedes accountability precedes limit**. A page that qualifies before it claims has argued itself down before the reader knows what is on offer.

**Binding proportion rule** (`17` §4.4, B32): across parts 3 and 4, the cumulative weight of gaps, limits, unmeasured states and not-testable markers must not exceed the weight of what the firm does and answers for.

**Parts 1 and 5 are near-invariant across the site. Part 3 is where pages legitimately differ.** That is the whole of the consistency-versus-variation answer, stated once here and elaborated in `05_COMMERCIAL_PAGE_UX.md`.

---

## 6. Reader effort as a designed budget

The apparatus is credible because it is present, and commercial because it is cheap. **Effort is therefore a first-class UX variable**, and each apparatus visibility state (`17` §2) is defined by it.

| State | Reader effort | Where it is correct |
|---|---|---|
| IMMEDIATE | None | `/how-it-works` · research entries and index cards |
| ADJACENT-SECONDARY | None | Limits and the accountability boundary, everywhere · problem-page check outcomes · `/about` |
| EXPANDABLE | One deliberate action, in place, no navigation | Mid-page claims on commercial pages · article sourcing · `/faq` bases |
| DEFERRED | Scroll to a signposted section of the same page | `/pricing` — "what moves the number" |
| ABSENT | n/a | Every first screen · every CTA region · `/contact`, `/schedule-call`, `/thank-you` |

**The one budget rule that cannot be traded:** the accountability boundary, the attribution limits and what is not promised are **never EXPANDABLE and never collapsed**, at any screen size (B29). Everything else in the apparatus may cost one action.

---

## 7. What the UX system deliberately does not include

Recorded so their absence reads as judgement rather than omission.

| Not included | Why |
|---|---|
| A site search | No real site search exists, and `WebSite` schema must not declare a `SearchAction` for one that does not (IA §15) |
| A mega-menu | 22 indexable pages. One dropdown with five or six children is proportionate (`NAVIGATION_ARCHITECTURE.md` §1.2) |
| Modals, interstitials, exit-intent, entry pop-ups | Prohibited outright (`PAGE_TYPE_CRO_RULES.md` §11.4, A18) |
| A multi-step form | Four required fields. Every step is an abandonment surface (`FORM_AND_BOOKING_SPEC.md` §2) |
| A quiz, score, grade, meter or diagnostic result | B7, B25, B26. The diagnostic narrows a question; it never certifies an answer |
| Any tool | Zero tools at launch (IA §11). `/tools/` is a reserved namespace, not a build |
| An `/industries` hub | One child. A hub with one child is navigation theatre (IA §7) |
| A "Problems" nav menu | One member. It would advertise a family that does not exist yet |
| Personalisation, saved state, accounts, logins | Nothing in the approved architecture requires one, and each is a privacy and consent surface for no gain |
| Dark mode as the brand | A5. Permitted only as a user preference, and the current site's forced-dark implementation is a defect to unwind, not a direction to keep |

---

## 8. The document set

| # | Document | What it governs |
|---|---|---|
| 01 | This document | Principles, spine, effort budget, scope |
| 02 | `02_PRIMARY_USER_JOURNEYS.md` | The seven journeys, non-linearly |
| 03 | `03_PAGE_TYPE_ARCHITECTURE.md` | Seventeen page types, each with its own job and rules |
| 04 | `04_HOMEPAGE_UX.md` | The homepage as a structure, on the approved narrative |
| 05 | `05_COMMERCIAL_PAGE_UX.md` | What is consistent, what varies, and why |
| 06 | `06_PROBLEM_PAGE_UX.md` | The diagnostic, and the interaction question answered |
| 07 | `07_NAVIGATION_ARCHITECTURE.md` | Header, dropdown, utility, footer, breadcrumbs, mobile |
| 08 | `08_CTA_SYSTEM.md` | CTA roles as UX behaviour, placement, repetition |
| 09 | `09_FORM_AND_BOOKING_UX.md` | Form, booking, thank-you, every state |
| 10 | `10_EVIDENCE_INTERACTION_UX.md` | The apparatus as an interface |
| 11 | `11_FIGURE_UX.md` | Tier 1 figures as interfaces |
| 12 | `12_RESPONSIVE_UX.md` | Mobile as the primary case |
| 13 | `13_ACCESSIBILITY_REQUIREMENTS.md` | Requirements, not a compliance claim |
| 14 | `14_PERFORMANCE_AWARE_UX.md` | What the UX may and may not require |
| 15 | `15_SEARCH_DISCOVERY_UX.md` | UX decisions with search and AI-retrieval consequences |
| 16 | `16_PAGE_STRUCTURE_MATRIX.md` | Every launch route, in one table |
| 17 | `17_REUSABLE_UX_PATTERNS.md` | Eleven patterns, and where each is prohibited |
| 18 | `18_UX_ANTI_PATTERNS.md` | UX-specific prohibitions, each with a named harm |
| 19 | `19_OWNER_BLOCKERS_AND_DEPENDENCIES.md` | Default structure / blocked slot / what unlocks it |
| 20 | `20_GATE_9B_QUALITY_GATE.md` | The proposed gate. **NOT PASSED** |

**Added by the orchestrator correction / gate-scope reconciliation pass, 2026-09-02:**

| # | Document | What it governs |
|---|---|---|
| 21 | `21_ORCHESTRATOR_DECISIONS_H1_H5.md` | The five open decisions, now approved |
| 22 | `22_F1_USAGE_TAXONOMY.md` | **BINDING.** FULL / PARTIAL / STATE / NONE per route |
| 23 | `23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md` | The six-page stress test and its two fixes |
| 24 | `24_HOMEPAGE_APPARATUS_DECISION.md` | The first-screen exception, defined and defaulted |
| 25 | `25_CONTACT_BOOKING_THANKYOU_RELATIONSHIP.md` | The two conversion surfaces, and thank-you routing |
| 26 | `26_OWNER_BLOCKED_STRUCTURE_RULE.md` | The omission rule — case 0 / A / B |
| 27 | `27_GATE_9B_SCOPE_RECONCILIATION.md` | What is complete, what Gate 9B still requires |
| 28 | `28_WIREFRAME_SCOPE_AND_FIDELITY.md` | The 24-artefact wireframe set and the fidelity boundary |
| 29 | `29_UX_PATTERN_INVENTORY_SPEC.md` | The 16-entry inventory and its twelve fields |

---

## 9. Method limitations of this session (VERIFIED FACT)

- **No research of any kind was performed.** Every UX decision derives from Sessions 01–12 artifacts with their evidence labels intact.
- **No user was observed, interviewed or tested.** Nothing here is a usability finding. Every statement about buyer behaviour traces to `ICP.md`, Session 02/03/04 research, or the approved CRO rules — and is labelled where it is an inference.
- **No search volume, ranking, traffic, conversion, benchmark or AI-citation figure was gathered, estimated or written.**
- **No production code, configuration, content or asset was modified.** Production source was **not** read in this session; the technical facts used are quoted from the approved Session 01/01B audit artifacts, which are read-only records.
- **No build, lint or test was run. No page was rendered. No accessibility, performance or contrast measurement was executed.** Nothing here is a compliance or performance assessment.
- **No wireframe, layout, mockup, style frame, grid, breakpoint, type value, colour value or component specification was produced**, deliberately.
- **No approved upstream document was modified**, including `DECISION_LOG.md`, `QUALITY_GATES.md`, the business documents, the IA, the CRO specification, the messaging system, all page copy and all creative direction.
- **No decision was approved and no gate status was changed.** Claude has no authority to change either.
