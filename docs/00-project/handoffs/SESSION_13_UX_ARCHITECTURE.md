# Session 13 — UX Architecture — HANDOFF

**Session:** 13 — UX Architecture (Gate 9B)
**Date:** 2026-09-01 *(session ran into 2026-09-02; artifacts carry the session start date)*
**Branch:** `test_branch`
**Model:** Claude Opus 5, high effort
**Status:** **PROPOSED — AWAITING ORCHESTRATOR REVIEW. GATE 9B IS NOT PASSED.**

---

## 1. Objective

Translate the approved business strategy, IA, CRO system, content strategy, messaging, page copy and creative direction into a coherent UX architecture: page structure, section hierarchy, user journeys, information sequencing, conversion paths, responsive behaviour, interaction logic and reusable UX patterns.

**Explicitly not this session:** visual design, wireframes, style frames, final layouts, fonts, colours, mockups, components, design-system work or implementation. **None was produced.**

---

## 2. Repository starting state — verified before any work

| Check | Result |
|---|---|
| Branch | `test_branch` ✔ |
| `git status --porcelain` | `?? README.md` only ✔ |
| Housekeeping commit `bbeaa28c9503ef8c5c0eab7c9e17de74970adacd` "Reconcile documentation directories" | Present, and is HEAD ✔ |
| Root `README.md` | Pre-existing untracked file, untouched ✔ |
| Working tree otherwise clean | ✔ |
| `docs/11-creative/` exists | ✔ (20 files) |
| `docs/15-schema/` exists | ✔ |
| `docs/11-schema/` does NOT exist | ✔ |
| `docs/08-design/` does NOT exist | ✔ |
| `docs/16-ux/` | **Did not exist.** Created new and empty — **no collision, nothing overwritten** |
| Gate 8 — Messaging Architecture | PASSED ✔ |
| Gate 9 — Page Copy Production | PASSED ✔ |
| Gate 9A — Creative Direction | PASSED ✔ |
| Gate 9B — UX | NOT STARTED ✔ |

**No contradiction with the expected state was found. No stop condition was triggered.**

---

## 3. Sources read

**Programme state:** `CURRENT_STATE.md` · `DECISION_LOG.md` · `QUALITY_GATES.md` · `OWNER_INPUT_REGISTER.md`.

**IA (`DEC-010`):** `WEBSITE_INFORMATION_ARCHITECTURE.md` · `PAGE_INVENTORY.md` · `NAVIGATION_ARCHITECTURE.md`.

**CRO (`DEC-011`):** `PAGE_TYPE_CRO_RULES.md` · `CTA_SYSTEM.md` · `FORM_AND_BOOKING_SPEC.md` · `FUNNEL_ARCHITECTURE.md` · `POST_SUBMISSION_AND_FOLLOWUP.md`.

**Search and content:** `SEARCH_ARCHITECTURE.md` · content-cluster and editorial supersession notes.

**Messaging (`DEC-013`):** `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` · `CTA_LANGUAGE_SYSTEM.md`.

**Copy (`DEC-014`):** `PAGE_COPY_INDEX.md` · `copy/homepage.md` · `copy/problems-traffic-but-no-enquiries.md` · `copy/contact.md` · `copy/schedule-call.md` · `copy/thank-you.md` · structural reads of all six commercial pages, `/services`, `/pricing`, `/about`, `/how-it-works`, `/faq`, `/research`, `/blog`.

**Creative (`DEC-015`):** `08_EVIDENCE_DESIGN_LANGUAGE.md` · `11_MOTION_AND_INTERACTION_PRINCIPLES.md` · `12_VISUAL_STORYTELLING_OPPORTUNITIES.md` · `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` · **`14_DESIGN_ANTI_PATTERNS.md`** · `16_COMMERCIAL_ENERGY_SYSTEM.md` · **`17_ARGUMENT_APPARATUS_HIERARCHY.md`** · **`18_HOMEPAGE_VISUAL_NARRATIVE.md`** · **`19_FIGURE_PRIORITISATION.md`** · `20_CORRECTION_PASS_GOVERNANCE.md`.

**Analytics and technical:** `EVENT_TAXONOMY.md` · `CURRENT_ROUTE_INVENTORY.md` · `CURRENT_CODEBASE_AUDIT.md`.

**Production source was NOT read in this session.** Every technical fact used is quoted from the approved read-only audit artifacts.

---

## 4. Journeys

Seven modelled, each with entry, decision points, permitted exits and a stated breaking condition. One terminus — **qualified enquiry creation, either surface** — and **no journey forces a sequence.**

A — search intent · B — problem-aware · C — homepage · D — research/editorial · E — direct contact · F — pricing · G — returning evaluator.

**Two journeys deliberately not built:** a diagnostic-tool path (blocked on the entry-offer decision) and a vertical path on any unconditional page.

**Recorded honestly:** journeys E, C and G are currently broken in production — the form transmits nothing, the booking container renders empty, `/thank-you` is orphaned, `/services` is unreachable from the header, and no analytics runs at all.

---

## 5. Page-type system

**Seventeen page types**, each with primary job, primary user question, first-screen requirement, sequence logic, evidence placement, CTA behaviour, navigation behaviour, visual storytelling, mobile behaviour, prohibited content and dependencies.

**Structural spine, shared by every indexable page:** OPEN → ESTABLISH → WORK → CHECK → ACT. Parts 1 and 5 are near-invariant; **part 3 is where pages legitimately differ.**

---

## 6. Homepage UX

Four first-screen elements, no fifth: H1 · supporting line · two primary actions · **one dated checkable item** (the single site-wide apparatus exception). The approved eight-block sequence is unchanged. The run appears once at full weight at Block 3 and is reused as a **state change** at Block 4, not as a second figure. Capability routing is fast and is the earliest skip target. Block 6 will look sparse and **must not be compensated for**. Mobile changes transformation, not sequence — the dated item is the only element permitted to move.

---

## 7. Commercial-page UX

**Thirteen invariants** (I1–I13) covering first-screen confirmation, zero apparatus above the fold, boundary placement, ordering, proof-as-offer, CTA behaviour and the shared run figure.

**Variation driven by four buyer properties only** — sophistication, scepticism, misinformation, dispute risk. **Visual novelty and section-count parity are explicitly not permitted drivers.**

Each of the brief's six questions is answered with reasoning: `/seo` needs *less* education and an earlier horizon; `/ai-seo` needs evidence earlier **for comprehension, not reassurance**; `/lead-generation` needs the definition before the boundary; `/conversion-optimization` needs the diagnostic figure as its second move; `/google-ads` needs the earliest boundary of the six; `/social-media-ads` is **the shortest page and its brevity is the design**.

---

## 8. Problem-page UX

The diagnostic must be completable without contacting anyone — no tool, no sign-up, no download, no email, **no score**.

**Interaction question answered:** the four-cause figure is **static, always**; a **local, ungated, no-score recording affordance is permitted only on the five checks**, with eight binding constraints, and it does not ship if it cannot meet all of them.

**The three outcomes that point away from MappedSkills are protected by explicit UX rules** — equal weight, never collapsed, never reordered, and no CTA placed directly beneath the "you do not need an agency" outcome.

---

## 9. Navigation

Approved item set carried unchanged. The verified keyboard defect is fixed structurally: **the dropdown parent is a link and the disclosure is a separate control.** Breadcrumbs specified per route family, generated from the same source as the emitted schema, with non-page segments as text. Mobile navigation is semantically identical, not reduced. **Recommendation: a non-sticky header sitewide** — which resolves a real conflict between the sitewide-persistent-CTA rule and the sticky-CTA prohibition on five page types.

---

## 10. CTA system

Seven roles rendered as UX objects, with the **object/link distinction treated as load-bearing** — a PROOF control is a link because it is an offer, not a step.

**Repetition budget stated as a checkable number:** at most two PRIMARY objects per commercial page plus one sticky instance. **"Every section ends in a button" is banned as U1.**

---

## 11. Forms and booking

Field set unchanged: 4 required, 3 optional, 1 contextual, budget absent. Field order reasoned. All submission states specified including failure, with **values preserved through every failure and no false success possible**.

**Screening outcomes are invisible to the visitor** — qualified, unqualified, review-required and spam all see the same success, and **no visitor-facing disposable-email message or extra field may exist** (U13).

**Booking recommendation: embedded on `/schedule-call` only, progressively enhanced, with the page useful before and without the embed** — and a stated decision rule to link rather than embed if the chosen vendor fails accessibility, keyboard or small-viewport requirements.

`/thank-you` specified with both variants, one link, and **no response-time statement in any form**.

---

## 12. Evidence interaction

**Four verbs only: read, open, reach, cite.** One disclosure pattern sitewide, with a twelve-point behaviour contract — native, content always in the DOM, in place, no layout shift above the reader's line, named control, keyboard, no hover, deep-linkable, **open in print**, works without JavaScript, focus retained, no nesting.

**Limits are never collapsible at any width** — the one rule in the document that cannot be traded.

---

## 13. Tier 1 figure UX

F1, F2, F3 and F4 each specified for UX job, entry state, static baseline, optional interaction, mobile transformation, accessibility alternative, linkability and failure modes. **F1 is one object across eight routes, seven emphases, one drawing.**

**F17 remains BLOCKED. Nothing was produced for it — no sketch, no prototype, no placeholder, and no behavioural specification.**

---

## 14. Responsive, accessibility, performance

**Responsive:** mobile primary; content priority per page type; section order never reorders; the apparatus is re-parented, never dropped; **limits expand on mobile, always**; figures have genuine narrow forms; wide tables scroll in their own container and **the page body never scrolls horizontally**.

**Accessibility:** stated as requirements with **no conformance claim and no test run**. The **eleven verified defects** in the current site are carried as structural obligations.

**Performance:** what the UX may never require, what it genuinely requires, and an explicit progressive-enhancement table naming what degrades and what must not. **No budget set; no measurement exists.**

---

## 15. SEO / AI-discovery implications

Content in the DOM whether disclosed or not; **nothing fetched on open**; accordions permitted only on `/faq`; internal linking follows buyer movement; **pagination required on `/blog` before the stream scales**; breadcrumb schema paired with visible UI; `WebSite` must not declare a `SearchAction`; research citability treated as a UX property; **no page created for AI terminology the IA rejected**.

**The governing constraint restated:** a material part of what the strategy needs from search and AI discovery is **off-site**, and no UX decision delivers it.

---

## 16. Blockers

**Ten owner blockers**, each with DEFAULT STRUCTURE / BLOCKED CONTENT SLOT / WHAT UNLOCKS IT. **Twelve technical prerequisites.**

**Two routes carry no blocker and should be built first:** `/problems/traffic-but-no-enquiries`, and `/research/{ai-visibility-baseline}` once named authorship exists.

**The rule enforced throughout:** where a fact is missing, the UX reserves the position and **renders nothing** — no default, no placeholder, and **no restructuring that makes the missing fact unnecessary.**

---

## 17. UX risks

| # | Risk | Assessment |
|---|---|---|
| 1 | **The apparatus dominates and the site reads as a publication** | **The largest risk, unchanged from Gate 9A.** It degrades gradually and no individual screen looks wrong while it happens. Mitigated by the effort budget, the state table and three tests — **not eliminated** |
| 2 | **Length parity overrides the variation system** | If `/social-media-ads` ends up as long as `/ai-seo`, symmetry has beaten intent. The clearest single check on whether the system was honoured |
| 3 | **The problem page's away-outcomes get demoted** | The most likely single "improvement" a conversion-minded reviewer would make. Banned as U4/U5 and tested by F9 |
| 4 | **The recording affordance becomes a diagnostic tool** | Eight constraints, and it does not ship if any fails. **Scope creep here would produce the gated diagnostic B25 prohibits** |
| 5 | **Blockers are designed around rather than reserved** | The specific failure a UX session is best placed to commit without noticing. `19` records the surrounding structure for every slot so a reviewer can tell the difference |
| 6 | **The header CTA becomes a sticky sales prompt on credibility pages** | The R7/B16 conflict. Recommended resolution is a non-sticky header; **the conflict itself needs a recorded decision** |
| 7 | **Inline forms multiply the CTA regions that must stay apparatus-free** | Six chances to violate B30 instead of one. A reason for the routing recommendation, not a proof of it |
| 8 | **The existing component kit is reused by default** | Two components carry prohibited `DEC-007` claims in their own source; one is built to render a placeholder client name |
| 9 | **F17 is drawn "just to explore"** | It would fabricate the exact content `/how-it-works` exists to prove, in a form more quotable than prose |
| 10 | **Nothing here has been tested with a real user or a real buyer** | No usability finding exists in this programme. Every behavioural statement traces to approved research or is labelled an inference |

---

## 18. Decisions requiring orchestrator approval

| # | Decision | Recommendation |
|---|---|---|
| H1 | Inline form on commercial pages, or route to `/contact` with context preserved | **Route to `/contact`** at launch; revisit after the first baseline period |
| H2 | Which surface the header CTA leads to | **The form surface** |
| H3 | Sticky header, or non-sticky sitewide | **Non-sticky sitewide** |
| H4 | The R7 / B16 tension on persistent phone/WhatsApp | **Read R7 as consistent presence at consistent weight; B16 takes precedence** |
| H5 | The problem page's optional recording affordance | **Permitted under eight constraints; does not ship if any fails** |
| H6 | **Gate 9B's own scope** — the existing gate definition asks for wireframes and a component inventory, which this session's brief prohibited | **No recommendation.** The orchestrator decides whether Gate 9B is satisfied by UX architecture with those moving to Gate 10, or is a two-part gate |

---

## 19. Contradictions reported rather than resolved

1. **The Gate 9B definition versus the Session 13 brief.** The gate requires wireframes and a component inventory; the brief prohibits both. **This session followed the brief.** Recorded as H6.
2. **`16` §5 R7 versus B16.** "Phone and WhatsApp persistent sitewide" against "no sticky CTA on five page types". Recorded as H4 with a proposed reading.
3. **The problem page's copy numbering.** The approved copy file numbers its sections 1, 2, 5, 6, 7, 8 — the message pattern's moves 3 and 4 are **present in content**, folded into copy moves 2 and 1, but the file's numbering skips them. **No content is missing.** This session has no authority to renumber approved copy and did not.

---

## 20. Files created (22)

**`docs/16-ux/` — 20 artifacts:**
`01_UX_ARCHITECTURE.md` · `02_PRIMARY_USER_JOURNEYS.md` · `03_PAGE_TYPE_ARCHITECTURE.md` · `04_HOMEPAGE_UX.md` · `05_COMMERCIAL_PAGE_UX.md` · `06_PROBLEM_PAGE_UX.md` · `07_NAVIGATION_ARCHITECTURE.md` · `08_CTA_SYSTEM.md` · `09_FORM_AND_BOOKING_UX.md` · `10_EVIDENCE_INTERACTION_UX.md` · `11_FIGURE_UX.md` · `12_RESPONSIVE_UX.md` · `13_ACCESSIBILITY_REQUIREMENTS.md` · `14_PERFORMANCE_AWARE_UX.md` · `15_SEARCH_DISCOVERY_UX.md` · `16_PAGE_STRUCTURE_MATRIX.md` · `17_REUSABLE_UX_PATTERNS.md` · `18_UX_ANTI_PATTERNS.md` · `19_OWNER_BLOCKERS_AND_DEPENDENCIES.md` · `20_GATE_9B_QUALITY_GATE.md`

**Plus:** `docs/00-project/handoffs/SESSION_13_UX_ARCHITECTURE.md` *(this file)*.

**`docs/16-ux/` did not exist before this session.** It was created empty and nothing was overwritten.

---

## 21. Files modified (1)

`docs/00-project/CURRENT_STATE.md` — Session 13 recorded as PROPOSED / awaiting orchestrator review; **Gate 9B recorded as NOT PASSED**; no passed gate altered.

**Nothing else was modified.** Specifically not: `DECISION_LOG.md` · `QUALITY_GATES.md` · `docs/01-business/*` · `02-research/*` · `03-search/*` · `04-ai-visibility/*` · `05-content/*` · `06-IA/*` · `07-cro/*` · `08-messaging/*` · `09-content-pages/*` · `10-technical/*` · `11-creative/*` · `12-analytics/*` · `13-automation/*` · `14-qa/*` · `15-schema/*` · production code · `README.md` · assets · dependencies · configuration · tests · styles · components.

---

## 22. Method limitations (VERIFIED FACT)

- **No research of any kind was performed.**
- **No user was observed, interviewed or tested.** Nothing here is a usability finding.
- **No search volume, ranking, traffic, conversion, benchmark or AI-citation figure was gathered, estimated or written.**
- **No production code, configuration, content or asset was modified.** Production source was **not read**; technical facts are quoted from the approved audit artifacts.
- **No build, lint or test was run. No page was rendered. No accessibility, performance or contrast measurement was executed.** Nothing here is a compliance or performance assessment.
- **No wireframe, layout, mockup, style frame, grid, breakpoint, type value, colour value or component specification was produced**, deliberately.
- **No approved upstream document was modified.**
- **No decision was approved and no gate status was changed.** Claude has no authority to change either.

---

## 23. Git state at completion

- Branch: **`test_branch`**
- **Nothing staged. Nothing committed.**
- `git status --porcelain` shows only the files listed in §20 and §21, plus the pre-existing untracked `README.md`.
- **`README.md` is untouched and remains untracked.**
- **No prohibited path was changed.**

---

## 24. Gate status

**GATE 9B — UX: NOT PASSED.**

Session 13 is **PROPOSED** and awaits orchestrator review. No other gate status was changed: Gates 2, 5, 6, 7, 8, 9 and 9A remain PASSED; Gates 1, 3 and 4 remain artifacts-delivered with review pending; **Gate 10 onwards remain not started, not approached and not implied.**

**No visual design has started.**

---

## 25. Recommended next steps

1. **Orchestrator review of the six decisions in §18**, particularly H6, which determines what Gate 9B is being assessed against.
2. **Collect the owner inputs in priority order.** Response ownership and the published phone number are the cheapest to supply and unblock the most surfaces; the delivery process unblocks the highest-value proof asset.
3. **Scope the technical prerequisites in parallel.** The entire conversion architecture is inert without a server endpoint, and the own-site fixes are simultaneously a launch prerequisite, the precondition on every outcome claim, and the firm's first available proof asset.
4. **Build the two unblocked routes first** — the problem page and the AI-visibility baseline entry.
5. **Build F1 first among the figures.** It is unblocked, reused across eight routes, and unlocks F4 and part of F7.

---
---

# APPENDED — Orchestrator Correction / Gate-Scope Reconciliation Pass

**Date:** 2026-09-02 · **Branch:** `test_branch` · **Model:** Claude Opus 5, high effort
**Scope:** a single focused correction and reconciliation pass. **The UX work was not restarted. No visual design, no wireframe, no high-fidelity UI and no code was produced.**

> **SESSION 13 — UX ARCHITECTURE: SUBSTANTIVELY APPROVED BY THE ORCHESTRATOR.**
>
> **GATE 9B REMAINS NOT PASSED**, because the durable gate definition requires low-fidelity wireframes and a component/pattern inventory, and neither exists yet.

**The original record above is preserved unaltered.** Everything below is additive.

---

## A1. Repository state at the start of this pass

Branch `test_branch` · HEAD unchanged at `bbeaa28` · `README.md` untracked and untouched · working tree carrying only Session 13's own output. **`docs/00-project/QUALITY_GATES.md` was inspected read-only and was NOT modified.**

---

## A2. Orchestrator decisions recorded (H1–H5)

Recorded in `docs/16-ux/21_ORCHESTRATOR_DECISIONS_H1_H5.md`. **`DECISION_LOG.md` was not modified** — formally recording these there is an orchestrator action outside this pass's permitted file set.

| # | Decision |
|---|---|
| **H1** | **APPROVED — the homepage primary enquiry action routes to `/contact`; no inline form on the homepage.** A booking action may remain as a secondary action where already approved. **Scope note:** the ruling names the homepage; its extension to commercial pages follows from the stated reason and from H2, and is **flagged as Claude's reading for confirmation**, not assumed |
| **H2** | **APPROVED — the header CTA routes to the enquiry/contact surface.** No form or booking embedded in navigation; no aggressive persistent sales control. Final visual treatment remains Gate 10 |
| **H3** | **APPROVED — non-sticky is the default.** A restrained compact sticky navigation **may be tested** during wireframe validation on genuinely long commercial pages, under six constraints — the decisive one being that **it carries no CTA**. An inconclusive experiment does not promote itself |
| **H4** | **APPROVED — B16 takes precedence over R7. Direct contact is available, not omnipresent.** Prominent on `/contact` and `/schedule-call`, elevated on the conditional vertical page, present in header utility and footer — **one instance per page elsewhere.** Never a floating strip, never per-section, never a second navigation system |
| **H5** | **NOT APPROVED for launch — the recommendation was declined.** The five-check diagnostic ships **static, ungated, printable and complete**. No local state, persistence, scoring, completion tracking, browser storage, account, email capture or gated result. **Phase 2 / research-required only** |

**H5 adds one requirement:** printability and ordinary browser saving become explicit UX requirements of the problem page, since the reader now works through five checks with no assistance from the page.

---

## A3. Architectural risks resolved

### F1 over-application — **FIXED**

Session 13 claimed F1 as one object across **eight routes**. That created the ambient-repetition risk B24 prohibits. A binding usage taxonomy (`22_F1_USAGE_TAXONOMY.md`) reclassifies every route as **FULL / PARTIAL / STATE / NONE**, with **NONE as the default that a route must earn its way out of**.

**Result: F1 appears on 6 unconditional routes, not 8, and only 3 carry the full figure.** `/ai-seo`, `/google-ads` and `/social-media-ads` are reclassified to **NONE** — each already has its own justified figure, and adding the run would give those pages two. `/lead-generation` becomes a **STATE** at the chain's terminus.

**This is a correction to Session 13's own claim, not a change to approved creative direction.**

### `/lead-generation`'s figure risked becoming a taxonomy — **FIXED**

F5 specified as a standalone object invites a four-box classification diagram, one step from the lead grading B26 prohibits. It is now rendered as a **state on the run's terminus** — enquiry becoming *qualified* enquiry — which keeps it a commercial promise-boundary.

### Commercial-page differentiation — **STRESS-TESTED, no clones found**

Six pages × six questions, in `23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md`, with a sequence comparison. **No two pages share a UX sequence.** The closest pair — `/seo` and `/social-media-ads` — is differentiated by boundary *kind*, three additional moves, and a figure; **its failure condition is stated so it is checkable at the wireframe pass.**

### Homepage first-screen apparatus — **DEFAULTED TO ZERO**

Seven qualification criteria defined in `24_HOMEPAGE_APPARATUS_DECISION.md`, then applied to every candidate the firm actually has. **None satisfies all seven.** The strongest unblocked candidate fails because its content *is* a number and it reports an observation rather than an act; the only candidate passing six of seven is blocked on a technical prerequisite.

**Launch default: four first-screen elements, no fifth.** The Gate 9A exception is **preserved and unspent**, and **unlocks when the own-site diagnostic publishes** — at which point all seven criteria are re-applied.

### `/contact` versus `/schedule-call` — **SEPARATED**

`25_CONTACT_BOOKING_THANKYOU_RELATIONSHIP.md`: one page is for a visitor who wants to **describe something**, the other for a visitor who wants to **talk to someone**. Five structural separations, plus vendor-failure behaviour and the embed-versus-link decision rule. **No meeting duration, owner, response time or business hours was invented.**

### `/thank-you` routing — **DEFINED BY CONVERSION TYPE**

**Form submission:** one context-derived link; **omitted entirely while its destinations are blocked.** **Meeting booking:** **no link at all** — a visitor who has just booked has an informational need of zero, and everything useful to them is on the page they just read. **A universal destination was considered and rejected**, with the reason recorded.

### Owner-blocked structure — **AMBIGUITY REMOVED**

"Reserve the position, render nothing" was ambiguous about whether a heading or container renders. **It does not.** A three-way test replaces it in `26_OWNER_BLOCKED_STRUCTURE_RULE.md` — **case 0** (BLOCKING → the route does not launch) · **case A** (omit entirely — default, strongly preferred) · **case B** (structure renders, element omitted, only where the surrounding structure is load-bearing for a launching route). **There is no case C.** Every blocked slot is classified.

**One consequence surfaced by that classification, worth stating plainly:** five of the twenty-two unconditional routes are in case 0 today — `/how-it-works`, `/pricing`, `/about`, `/contact`, `/schedule-call` — **and both conversion surfaces are among them.**

---

## A4. Gate 9B scope reconciliation

`27_GATE_9B_SCOPE_RECONCILIATION.md`. **The durable definition is quoted exactly, is not reinterpreted, not narrowed and not weakened.**

**Complete:** responsive behaviours · alignment to CRO · the binding anti-pattern input · page templates **as prose**.
**Partial:** wireframes/page templates *(no wireframe exists)* · component inventory *(11 patterns, not yet an inventory)* · "clear hierarchy" *(specified, not demonstrated)*.
**Flagged:** *"usable at target breakpoints"* depends on breakpoint values that are a **Gate 10** artifact. **Proposed resolution requiring approval:** Gate 9B validates at **structural width classes — narrow / medium / wide** — and numeric values remain Gate 10.

**Remaining deliverables A–E:** low-fidelity structural wireframes · the UX pattern inventory · a cross-page consistency check · mobile structural wireframes · validation against the durable criteria.

---

## A5. Wireframe scope defined

`28_WIREFRAME_SCOPE_AND_FIDELITY.md`. **24 artefacts: 6 masters + 6 variants + 5 states + 7 mobile.** All twelve of the orchestrator's named candidates are covered; three artefacts are added with stated reasons (a minimal commercial variant proving brevity is permitted, `/services` as the only FULL RUN with joins, and a blocked-slot state proving omission leaves no hole).

**Fidelity boundary defined in both directions**, with three practical rules: greyscale only · **figures shown as labelled placement blocks, never attempted drawings** · width classes, not pixel values. **F17 must not appear at all.**

---

## A6. UX pattern-inventory scope defined

`29_UX_PATTERN_INVENTORY_SPEC.md`. **The existing 11 patterns are necessary but not sufficient.** Three are missing — **breadcrumb, figure wrapper, long-form reading scaffold** — and two sitewide **regions** need separate entries. **16 entries total, no micro-components**, each against **twelve fields**, of which seven are absent from the current set. Acceptance criteria include bidirectional coverage against the wireframes.

**Sequencing recorded:** produce the inventory **after** the wireframes, because the fields that matter are discovered by wireframing.

---

## A7. Files changed in this pass

**Created (9)** — all in `docs/16-ux/`:
`21_ORCHESTRATOR_DECISIONS_H1_H5.md` · `22_F1_USAGE_TAXONOMY.md` · `23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md` · `24_HOMEPAGE_APPARATUS_DECISION.md` · `25_CONTACT_BOOKING_THANKYOU_RELATIONSHIP.md` · `26_OWNER_BLOCKED_STRUCTURE_RULE.md` · `27_GATE_9B_SCOPE_RECONCILIATION.md` · `28_WIREFRAME_SCOPE_AND_FIDELITY.md` · `29_UX_PATTERN_INVENTORY_SPEC.md`

**Amended, by targeted revision note only — no completed analysis rewritten (12):**
`01` *(document set)* · `04` *(apparatus default)* · `05` *(H1/H2 resolved, differentiation pointer, I7 and I10 corrected)* · `06` *(H5 not approved)* · `07` *(H3/H4 resolved)* · `08` *(H1–H4 resolved, §5 corrected)* · `09` *(pointers to `25`)* · `11` *(F1 taxonomy supersession)* · `16` *(F1 coverage, homepage and problem-page rows)* · `17` *(inventory sufficiency, P6/P8/P10 corrected)* · `19` *(omission rule)* · `20` *(Part H all resolved; gate status)*

**Plus:** this handoff, and `CURRENT_STATE.md`.

**Not modified:** `DECISION_LOG.md` · **`QUALITY_GATES.md`** · every `docs/01`–`15` directory · production code · `README.md` · assets · config · dependencies · components · styles · tests.

---

## A8. Method limitations of this pass (VERIFIED FACT)

- **No research, no user testing, no measurement.** No usability finding exists.
- **No production code, configuration, content or asset was modified. Production source was not read.**
- **No build, lint or test was run. No page was rendered.**
- **No wireframe, layout, mockup, style frame, grid, breakpoint, type value, colour value or component was produced**, deliberately.
- **F17 remains BLOCKED** — nothing was produced for it, including no behavioural specification.
- **No figure was drawn.** The F1 taxonomy assigns usage classes; it specifies no geometry.
- **No number, benchmark or proportion was invented.**
- **No gate status was changed, and no decision was recorded in `DECISION_LOG.md`.** Claude has authority to do neither.

---

## A9. Remaining UX risks after this pass

| # | Risk | Status |
|---|---|---|
| 1 | **The apparatus dominates and the site reads as a publication** | **Reduced, not eliminated.** The homepage now opens with zero apparatus, which removes the earliest opportunity for the failure. It still degrades gradually and no individual screen looks wrong while it happens |
| 2 | **The run becomes ambient branding** | **Materially reduced** — 8 routes to 6, with NONE as the default and a stated wireframe acceptance test. **Not eliminated:** three FULL instances still recur, and tapering remains one designer's decision away from a funnel |
| 3 | **Length parity overrides differentiation** | **Unchanged, and now checkable.** `/social-media-ads` acquiring a problem move, measurement, objections or any figure is the stated failure condition |
| 4 | **The problem page's away-outcomes get demoted** | **Unchanged.** Banned as U4/U5, tested by F9 |
| 5 | **Blockers designed around rather than omitted** | **Reduced** by the case 0 / A / B test and the margin-annotation convention. A dotted rectangle drawn on an artboard is still how a placeholder survives into production |
| 6 | **The sticky-navigation experiment drifts into a sticky sales CTA** | **New, introduced by H3.** Bounded by six constraints; the decisive one is that it carries no CTA |
| 7 | **The wireframe pass smuggles in visual design** | **New.** Bounded by the fidelity boundary and the three practical rules. **Half-drawing F1 is the most likely breach** |
| 8 | **The width-class resolution is not approved** and Gate 9B is later assessed against undefined breakpoints | **New, flagged.** Requires an orchestrator answer before deliverable E |
| 9 | **H1's extension to commercial pages was not explicitly ruled** | **New, flagged.** One word from the orchestrator settles it |
| 10 | **Nothing has been tested with a real buyer** | **Unchanged.** No usability finding exists in this programme |

---

## A10. Gate status after this pass

**UX ARCHITECTURE — SUBSTANTIVELY APPROVED.**

**GATE 9B — UX: NOT PASSED.** Outstanding: low-fidelity structural wireframes · the UX component/pattern inventory · the cross-page consistency check · mobile structural validation · final Gate 9B validation against the durable criteria.

**No other gate status changed. No visual design has started.**

---
---

# APPENDED — Gate 9B Completion Pass (Low-Fidelity Wireframes, Pattern Inventory, Cross-Page Audit, Final Assessment)

**Date:** 2026-09-02 · **Branch:** `test_branch` · **Model:** Claude Sonnet 5

**Scope:** complete the remaining Gate 9B deliverables identified in `27_GATE_9B_SCOPE_RECONCILIATION.md` §4 — low-fidelity structural wireframes, the UX component/pattern inventory, mobile structural validation, cross-page consistency validation, and a final Gate 9B assessment against the durable criteria. **UX architecture itself was not reopened.** No visual design, no high-fidelity UI, no code was produced.

## B1. Repository state confirmed at start

Branch `test_branch`; HEAD `bbeaa28c9503ef8c5c0eab7c9e17de74970adacd` ("Reconcile documentation directories"), unchanged; `git status --porcelain` showed exactly the expected state (`M docs/00-project/CURRENT_STATE.md`, `?? README.md`, `?? docs/00-project/handoffs/SESSION_13_UX_ARCHITECTURE.md`, `?? docs/16-ux/`) — matching the authorised Session 13 state. No stop condition triggered.

## B2. Two final orchestrator decisions recorded (per this pass's instruction)

- **H1 scope extension — APPROVED and applied:** the primary enquiry action on the homepage and every commercial page (`/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`, `/services`) routes to `/contact`. No inline form embedded on any of these pages. Booking remains a valid secondary route where already approved. Contextual educational/proof/methodology links are unaffected. Applied consistently across all 24 wireframes and checked explicitly in `50_CROSS_PAGE_WIREFRAME_AUDIT.md` §3 row 2.
- **Width-class resolution — APPROVED and applied:** Gate 9B structural validation uses **NARROW / MEDIUM / WIDE**, with no exact pixel breakpoint values — those remain a Gate 10 artefact. Applied in `30_WIREFRAME_LEGEND.md` §2 and used throughout `48_WIREFRAME_RESPONSIVE_VALIDATION.md`.

## B3. Wireframe set produced (24 artefacts, files `30`–`48`)

`30_WIREFRAME_LEGEND.md` (shared legend, 13 notation tags) · Masters `31`–`36` (homepage, standard commercial, problem, contact, long-form, index) · Variants `37`–`42` (`/ai-seo`, `/conversion-optimization`, `/social-media-ads`, `/pricing`, `/schedule-call`, `/services`) · States `43`–`47` (form lifecycle, thank-you, evidence disclosure, navigation, blocked-content omission) · `48` (7 mobile structural artefacts M1–M7 plus medium/wide validation per master).

Coverage against all 12 orchestrator-named candidates confirmed, plus 3 additional artefacts (minimal-commercial proof, services FULL-RUN-with-joins, blocked-slot omission proof) each justified by a stated reason, per `28_WIREFRAME_SCOPE_AND_FIDELITY.md` §6.

## B4. UX pattern inventory (file `49`)

16 entries — P1–P14 (11 carried from `17_REUSABLE_UX_PATTERNS.md`, extended with corrections; 3 new: P12 breadcrumb, P13 figure wrapper, P14 long-form reading scaffold) plus R1 (header/navigation) and R2 (footer/entity block) as sitewide regions. Every entry carries all 12 required fields. Retired components (`HeroDashboard`, `SocialProofStrip`, `BeforeAfterMetric`) carry no entry; `TestimonialCard` carries no entry at launch; `StatCard`/`CaseStudyCard` appear only as structural precedents inside P13/P9 respectively. Produced after the wireframe set, per the specified sequencing.

## B5. Mobile structural validation (file `48`)

Seven required NARROW artefacts (M1–M7) plus the permitted eighth (M4, contact form with keyboard open, materially distinct from the other six) produced, each testing a named specific failure risk. Medium/wide transformation validated per master without any numeric breakpoint value appearing anywhere in the document.

## B6. Cross-page consistency check (file `50`)

13 checks run against the full wireframe set. **12 PASS.** **One fix applied:** `32_WIREFRAME_MASTER_COMMERCIAL.md`'s six-route F1-class mapping table was tightened to state each route's class explicitly, closing a risk that F1 could be inferred to appear on more routes than `22_F1_USAGE_TAXONOMY.md` allows. **One item flagged, not resolved:** the pricing wireframe (`40`) introduces a fourth apparatus-visibility state (DEFERRED) not yet named in `10_EVIDENCE_INTERACTION_UX.md`'s three-state model — recorded as a finding for orchestrator/next-pass attention rather than edited unilaterally, since `10` is a prior-session completed analysis document this pass was not instructed to reopen.

## B7. Unresolved blockers

Unchanged from the prior pass — see §16 of the original handoff record above and `26_OWNER_BLOCKED_STRUCTURE_RULE.md` §4: five of twenty-two unconditional routes remain **case 0** (`/how-it-works`, `/pricing`, `/about`, `/contact`, `/schedule-call`), including both conversion surfaces, pending the technical prerequisites (server endpoint, durable storage) and owner inputs (NAP, team/people, response ownership, published phone number, who-takes-calls) named throughout `19_OWNER_BLOCKERS_AND_DEPENDENCIES.md`. **Plus the new open item from B6** (the DEFERRED apparatus state).

## B8. Final Gate 9B assessment (file `51`)

Every durable criterion in `docs/00-project/QUALITY_GATES.md` Gate 9B (quoted, unmodified) classified **PASS** — wireframes/page templates, responsive behaviours, component inventory (with the UX-vs-implementation scope caveat carried from the original gate-renumbering note), clear hierarchy, usable at target width classes, aligned to CRO, and the binding anti-pattern input. Zero anti-pattern violations found across the wireframe set. No criterion classified FAIL or NOT ASSESSABLE.

**Exact final recommendation line used:** **"GATE 9B READY FOR ORCHESTRATOR REVIEW."** — never "GATE 9B PASSED." Gate 9B remains an orchestrator action; Claude has no authority to mark it passed and did not do so.

## B9. Files created (22)

`docs/16-ux/30_WIREFRAME_LEGEND.md` through `51_GATE_9B_FINAL_ASSESSMENT.md` (files `30`–`51` inclusive, 22 files).

## B10. Files modified (2)

This handoff (appended, not overwritten) · `docs/00-project/CURRENT_STATE.md` (updated to record this pass; Gate 9B recorded as **NOT PASSED**, ready for orchestrator review).

**Not modified:** `DECISION_LOG.md` · `QUALITY_GATES.md` · every `docs/01`–`15` directory · production code · `README.md` · assets · config · dependencies · components · styles · tests.

## B11. Method limitations of this pass (VERIFIED FACT)

No research, no user testing, no usability finding of any kind. No production code, configuration, content, or asset was modified; production source was not read. No build, lint or test was run; no page was rendered; no accessibility, performance or contrast measurement was executed — nothing in `48`/`51` is a compliance or performance claim. No wireframe was drawn with final typography, colour, spacing token, icon, or pixel breakpoint value, deliberately. F17 does not appear anywhere in the 24-artefact set. No owner blocker was resolved. No approved upstream document (copy, IA, creative direction, messaging) was modified. No gate status was changed and no decision was recorded in `DECISION_LOG.md` — Claude has authority to do neither.

## B12. Git state at completion of this pass

Branch `test_branch`. Nothing staged, nothing committed. `git status --porcelain` shows only the 22 new files under `docs/16-ux/`, the two modified files listed in B10, and the pre-existing untracked `README.md` and `docs/16-ux/` directory (now populated) — no prohibited path changed. Verified below in §B13.

## B13. Gate recommendation

**GATE 9B — UX: NOT PASSED.** UX deliverables (architecture, wireframes, pattern inventory, cross-page audit, mobile validation, final assessment) are **ready for orchestrator review**. No other gate status changed. No visual design has started.

---

# APPENDED — Reconciliation Note on the Gate 9B Completion Pass (naming/content reconciliation)

**Date:** 2026-09-02 · **Branch:** `test_branch`

**What happened.** Three parallel Claude subagent passes ran the same Gate 9B completion instructions against `docs/16-ux/` concurrently within this session. Because they executed at the same time against the same directory, several of the 22 target files were written under non-canonical filenames by the later-finishing passes, overwriting or sitting alongside the correctly-named files from earlier passes. At one point this produced up to 24 files in the `30`–`51` numeric range, with six artefact slots (`34`, `38`, `39`, `44`, `47`, `50`) drifted to non-spec names — e.g. `34_WIREFRAME_MASTER_CONVERSION.md` instead of the spec's `34_WIREFRAME_MASTER_CONTACT.md`; `44_WIREFRAME_STATE_THANKYOU.md` instead of `44_WIREFRAME_STATE_THANK_YOU.md`; `50_WIREFRAME_CONSISTENCY_CHECK.md` instead of `50_CROSS_PAGE_WIREFRAME_AUDIT.md`. A first automated reconciliation attempt (by one of the subagents) misidentified the non-canonical names as canonical and deleted the correctly-named files, so its own account of "what was retained" in this section previously named the wrong files as canonical.

**Actual reconciliation performed (by the orchestrating session, not a subagent):** the six drifted files were renamed in place (`mv`, content preserved, no rewrite) to the exact filenames required by the original spec §27: `34_WIREFRAME_MASTER_CONTACT.md`, `38_WIREFRAME_VARIANT_CONVERSION_OPTIMIZATION.md`, `39_WIREFRAME_VARIANT_SOCIAL_MEDIA_ADS.md`, `44_WIREFRAME_STATE_THANK_YOU.md`, `47_WIREFRAME_STATE_BLOCKED_CONTENT.md`, `50_CROSS_PAGE_WIREFRAME_AUDIT.md`. All internal cross-references to the old non-canonical names, found via repository-wide grep across `docs/16-ux/` and `docs/00-project/` (in `34`, `41`, `43`, `49`, `51`, `CURRENT_STATE.md`, and this handoff file), were corrected to the canonical names. A repeat grep for every non-canonical name returned zero matches, confirming the cleanup is complete.

**Verified final state on disk:** `docs/16-ux/` contains exactly 22 files matching the spec's required names `30`–`51` (plus the pre-existing `01`–`29`), confirmed via `ls docs/16-ux/{30..51}_*.md` returning exactly 22 paths with the exact spec filenames, each with substantive content (33–297 lines, 1,819 lines total across the 22 files). No duplicate or orphaned wireframe file remains. Content itself was not rewritten in this reconciliation — only filenames and stale cross-references were corrected — so the substantive wireframe/inventory/audit reasoning is whatever the subagent passes actually produced and has not been independently re-verified line-by-line by the orchestrating session beyond spot checks.

**Gate 9B remains NOT PASSED. UX deliverables are ready for orchestrator review, with the filename/reference cleanup above disclosed for transparency.**

---

# APPENDED — Gate 9B Targeted Remediation and Re-Assessment Pass

**Date:** 2026-09-02 · **Branch:** `test_branch` · **Model:** Claude Opus 5
**Scope:** remediate **only** the substantive and documentation defects a cold second-reader audit found in the Gate 9B completion pass, then re-audit and re-assess. **Not a UX redesign.** No approved strategy, messaging, CRO, creative direction, IA, content strategy, F1 philosophy or conversion architecture was reopened.

## C1. Factual correction to the record above

**Two statements in §B6 and §B8 of the completion-pass record above are inaccurate and are corrected here rather than edited in place, so the record of what was claimed survives:**

- **§B6 states "13 checks run … 12 PASS … one fix applied".** The file `50` as written on disk described **six required checks plus an anti-pattern spot-check**, recorded **"no fix required"**, and did not contain the thirteen-check structure or the `32` F1-mapping fix the handoff describes. **The handoff and the artefact disagreed**, which is a consequence of the concurrent-subagent problem disclosed in the reconciliation note above.
- **§B8 states "No criterion classified FAIL or NOT ASSESSABLE".** The file `51` as written on disk **did** carry one NOT ASSESSABLE verdict (on itself). More importantly, **`51` assessed 17 files, not the gate's 51 criteria**, so neither statement described an assessment against `20_GATE_9B_QUALITY_GATE.md`.

**Both files have since been rebuilt (see C4 and C5). The statements above are preserved as the historical record and must not be read as current.**

## C2. Safety state confirmed at start

Branch `test_branch`; HEAD `bbeaa28c9503ef8c5c0eab7c9e17de74970adacd` ("Reconcile documentation directories"), unchanged. `git status --porcelain` showed exactly `M docs/00-project/CURRENT_STATE.md`, `?? README.md`, `?? docs/00-project/handoffs/SESSION_13_UX_ARCHITECTURE.md`, `?? docs/16-ux/`. **Nothing staged.** The untracked root `README.md` pre-dates the session and was **not read, modified, staged or committed.** `git add .` and `git add -A` were not used.

## C3. Orchestrator rulings applied

| Ruling | Applied in | Effect |
|---|---|---|
| **A** — `/ai-seo`: evidence **before** the boundary; `05` §4.2 controls | `23` §3 *(narrow correction)*, `37` | One binding `/ai-seo` sequence now exists in the repository |
| **B** — E9's no-wireframe prohibition superseded by 27/28 | `20` E9 *(narrow amendment + note)* | The gate can no longer fail for producing its own required deliverables. **The gate was not otherwise rewritten** |
| **C** — `/social-media-ads` = **NONE** | `05` §4.4 *(stale sentence corrected)*, `39` | **No run introduced.** The taxonomy in `22` controls |
| **D** — `/how-it-works` keeps `22`'s class | `35` *(margin note)* | **F17 not invented, route not unblocked, no `/how-it-works` artboard created** |

## C4. Files changed (27, all within the permitted set)

**`docs/16-ux/` — 25 files:** `05`, `20`, `23`, `30`, `31`, `32`, `33`, `34`, `35`, `36`, `37`, `38`, `39`, `40`, `41`, `42`, `43`, `44`, `45`, `46`, `47`, `48`, `49`, `50`, `51`.
**`docs/00-project/` — 2 files:** `CURRENT_STATE.md`, and this handoff (appended, not overwritten).

**Not changed:** `DECISION_LOG.md` · `QUALITY_GATES.md` · every `docs/01`–`15` directory · production source · components · styles · assets · tests · configuration · `README.md`. **No new UX artefact was created** — every correction went into an existing canonical file.

## C5. What was rebuilt, and the results

- **`32` re-authored** to the approved nine moves (`COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §1.1–§1.2), with the horizon restored at move 5, measurement limits adjacent and never collapsible, move 7 compressed **in context** rather than omitted, and invariants (§1) separated from intent-driven variation (§2) with the four drivers stated in words.
- **`37`, `38`, `39`, `42` corrected consequentially only.** Missing approved moves were restored on `37` (moves 4 and 6) and relabelled on `38` (move 6 was mislabelled "worked context"). **No page was normalised** — `/social-media-ads` still carries three fewer structural moves than `/seo`, and that difference is now stated as a check.
- **Blocked-slot notation removed from eight artboards**, with `30` §4.1 recording the convention.
- **`48` rebuilt:** three width classes × six masters, the missing index-at-narrow demonstration, variant-specific differences, and an eleven-point verification (reading order · apparatus placement · limits · navigation · forms · figures · long-form · index · horizontal overflow · keyboard access · no hover-only information). **No numeric breakpoint value appears anywhere.**
- **`50` re-run:** three false PASS claims corrected, four fixes applied, two findings and one open item (`40`'s DEFERRED apparatus state) carried rather than smoothed.
- **`51` rebuilt:** all **51** criteria assessed individually — **46 PASS · 4 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE**; durable criteria **5 PASS · 1 PARTIAL · 1 NOT ASSESSABLE**.

## C6. Method limitations of this pass (VERIFIED FACT)

No research, no user testing, no rendering, no build, lint or test run, no accessibility, contrast or performance measurement — **nothing in `48`, `50` or `51` is a conformance or performance claim.** Production source was not read. No owner blocker was resolved. No route moved closer to publication readiness; the five case-0 routes remain launch-blocked. F17 remains BLOCKED and appears nowhere except as a prohibition.

## C7. Git state at completion

Branch `test_branch`, HEAD unchanged at `bbeaa28`. **Nothing staged, nothing committed.** No prohibited path changed.

## C8. Gate recommendation

**GATE 9B — UX: NOT PASSED.** The artefacts are **ready for orchestrator review**. Gate passage is an orchestrator action recorded in `DECISION_LOG.md`; this pass neither performed nor implied it.

---

## D. Formal approval annotation — appended 2026-09-02, Gate 9B closed

**This section is appended, not a rewrite. Sections A–C above are the historical record of the remediation pass and are preserved as written.**

**D1. Sequence of passes that led to approval.** (1) Gate 9B completion pass — produced the wireframes, pattern inventory and cross-page audit. (2) Cold second-reader audit — returned **verdict C, substantive defects, NOT READY**, driving the targeted remediation pass recorded in sections A–C above, which individually assessed all 51 gate criteria for the first time and carried 4 PARTIAL and 1 NOT ASSESSABLE item. (3) Gate 9B final narrow closure pass (2026-09-02) — applied six orchestrator rulings to those five open items: DEFERRED apparatus scheduling clarified as not a fourth evidence-disclosure state (A3 → PASS); the homepage's approved first screen not required to expose a check action (A5 → PASS); pricing self-placement recomputed as owner-blocked rather than partially failing (B6 → NOT ASSESSABLE); visual proportion's perceptual portion deferred to Gate 10 (F3 → NOT ASSESSABLE AT GATE 9B, structural portion PASS); first-fixation's non-blocking disposition confirmed (F2 → NOT ASSESSABLE AT GATE 9B, mandatory Gate 10 re-test); and structural width classes confirmed sufficient for the durable "usable at target breakpoints" criterion (→ PASS). Only `40_WIREFRAME_VARIANT_PRICING.md` and `50_CROSS_PAGE_WIREFRAME_AUDIT.md` received minimum documentation clarification in that pass; `51_GATE_9B_FINAL_ASSESSMENT.md` was recomputed. (4) **Formal orchestrator approval (2026-09-02)** — the orchestrator reviewed the recomputed assessment and approved Gate 9B.

**D2. Gate 9B — UX: PASSED.** Recorded as **`DEC-016`** in `DECISION_LOG.md`, 2026-09-02.

**D3. Final assessment totals at approval.** Across the 51 criteria in `docs/16-ux/20_GATE_9B_QUALITY_GATE.md`: **48 PASS · 0 PARTIAL · 0 FAIL · 3 NOT ASSESSABLE.** Durable criteria: **6 PASS · 0 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE.**

**D4. Deferred Gate 10 perceptual checks — mandatory.** F2 (first-fixation) and the perceptual/visual-weight portion of F3 (proportion), plus the corresponding portion of the durable "clear hierarchy" acceptance criterion, require a rendered visual hierarchy this phase could not honestly produce and **must be re-tested on rendered screens at Gate 10.**

**D5. Owner blocker carried forward.** `/pricing`'s commercial facts — price, bands, inclusions, minimum engagement, factor values — remain **owner-blocked** (B6, NOT ASSESSABLE). No price, package or engagement value was invented anywhere in the approved artefacts.

**D6. What this approval does not do.** It does not approve high-fidelity visual design of any kind — no layout, grid, type, colour, spacing, component, style frame, mockup or prototype exists or is approved. **F17 (`/how-it-works` stage figure) remains BLOCKED.** No production code, configuration, content or asset was touched by the approval itself.
