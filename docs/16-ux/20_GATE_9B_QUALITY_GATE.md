# Gate 9B — UX — PROPOSED QUALITY GATE

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED. GATE 9B IS NOT PASSED.**

> **Claude does not pass gates.** This document proposes the criteria against which the orchestrator may assess Session 13's output. **Gate 9B remains NOT PASSED until the orchestrator records approval in `DECISION_LOG.md`.**

**Existing gate definition, carried unchanged from `QUALITY_GATES.md`:**
> **Required:** wireframes/page templates, responsive behaviours, component inventory.
> **Acceptance:** clear hierarchy, usable at target breakpoints, aligned to CRO. **Binding input:** the refined `14_DESIGN_ANTI_PATTERNS.md`.

**A scope discrepancy to resolve before assessment — reported, not resolved by this session.** The existing definition asks for **wireframes** and a **component inventory**. **Session 13's brief explicitly prohibited both** — "this is NOT high-fidelity visual design", "do not create polished mockups", "do not create production components", "do not start design-system implementation" — and directed UX architecture instead. **This session followed the brief.** The orchestrator should decide whether Gate 9B is (a) satisfied by UX architecture, with wireframes and the component inventory moving to Gate 10, or (b) a two-part gate of which this is the first part. **Nothing in this document assumes either answer.**

---

## Part A — Journeys and structure

| # | Criterion | Evidence to check |
|---|---|---|
| A1 | **User journeys are coherent and non-linear** — each has an entry, decision points, permitted exits and a stated breaking condition; none forces a sequence | `02_PRIMARY_USER_JOURNEYS.md` |
| A2 | **Commercial meaning leads on every page type** — every first screen carries a commercial statement, not machinery | `01` §5, `03`, `04` §1 |
| A3 | **Evidence is subordinate but genuinely accessible** — the apparatus is present sitewide at a cost of at most one action, and never leads | `10`, `01` §6 |
| A4 | **Search-landing intent is confirmed immediately** on every commercial page, in the searcher's own word, with the bridge inside the first screen | `05` §2 I1 |
| A5 | **The homepage route is understandable** — a mixed-intent visitor can convert, route or check from the first screen | `04` §2 |
| A6 | **The problem page is genuinely useful** — completable without contacting anyone, with the away-pointing outcomes protected | `06` §4–§5 |
| A7 | **Commercial pages are differentiated by intent, not by novelty** — the variation table names a driver for every difference | `05` §3–§5 |
| A8 | **The system scales across all approved routes** — every route in the matrix has a page type, and every page type has rules | `03`, `16` |

---

## Part B — Conversion

| # | Criterion | Evidence to check |
|---|---|---|
| B1 | **The primary conversion is valid** — one outcome, two surfaces, mechanism-independent, on every page that converts | `08` §4 |
| B2 | **No mandatory proof detour anywhere** — proof is an offer on every page that offers it | `01` P3, `18` U2/U3 |
| B3 | **Forms are simple** — four required fields, one step, budget absent, no field added without displacing one | `09` §1–§2 |
| B4 | **Every form state is specified honestly**, including failure, and **no false success is possible** | `09` §5 |
| B5 | **Screening outcomes are invisible to the visitor** — qualified, unqualified, review-required and spam see the same success | `09` §6 |
| B6 | **Pricing and contact are practical** — a buyer can place themselves before enquiring; a decided visitor is not offered routes away | `03` §5, §12 |
| B7 | **CTA repetition is bounded** — at most two PRIMARY objects plus one sticky instance per commercial page; **no section-end CTA rhythm** | `08` §3, `18` U1 |
| B8 | **`/thank-you` is a real post-conversion state** — no second ask, no response-time statement, one link, `noindex`, and no conversion event from a pageview | `09` §9 |
| B9 | **Direct contact is a peer** wherever contact is offered, and its blocked state renders nothing rather than a placeholder | `08` §5, `19` §5 |

---

## Part C — Navigation and discovery

| # | Criterion | Evidence to check |
|---|---|---|
| C1 | **Navigation is understandable** — six items, one dropdown, no mega-menu, and the approved item set unchanged | `07` §1 |
| C2 | **The dropdown parent is a link and the disclosure is a separate control** — the verified keyboard defect is fixed structurally | `07` §2 |
| C3 | **Breadcrumbs are visible and generated from the same source as the emitted schema**, with non-page segments rendered as text | `07` §6 |
| C4 | **No essential content is hidden** — disclosures keep content in the DOM; nothing is fetched on open; no carousel carries core information | `15` §1–§2, `18` U7 |
| C5 | **Internal linking follows buyer movement**, with no padded modules and no link farm | `15` §3–§4 |
| C6 | **Indexable and non-indexable routes are correct**, `/work` carries no placeholder, and conditional links are removable in one change | `15` §9, `16` §2 |
| C7 | **No page is created for AI terminology the IA rejected**, and no score, checker or dashboard appears anywhere | `15` §11 |

---

## Part D — Craft constraints

| # | Criterion | Evidence to check |
|---|---|---|
| D1 | **Mobile is viable, not compressed** — content priority stated per page type; nothing informational disappears; the apparatus is re-parented, not dropped | `12` |
| D2 | **Keyboard flow is viable** — full parity, skip link, no traps including in the booking embed, focus never lost on disclosure | `13` §3–§4 |
| D3 | **No hover dependency anywhere** — evidence, figure labels, status meanings, navigation and CTAs all reachable by tap and keyboard | `12` §13, `13` |
| D4 | **Figures work statically** — each Tier 1 figure has a complete static state, a text equivalent, a mobile form and stated failure modes | `11` |
| D5 | **Evidence limits cannot be hidden incorrectly** — limits are never collapsible at any width, never below a CTA, never in a disclaimer treatment | `10` §5 |
| D6 | **The performance burden is reasonable** — no hero video, autoplay, scroll-jacking, decorative 3D, heavy client state or charting dependency required | `14` §2 |
| D7 | **Progressive enhancement is specified**, with an explicit list of what degrades and what must not | `14` §4 |
| D8 | **Accessibility is stated as requirements, with no conformance claim**, and the eleven verified current defects are carried as obligations | `13` |

---

## Part E — Preservation

**These are the criteria that decide whether the session stayed inside its authority.**

| # | Criterion | Test |
|---|---|---|
| E1 | **IA preserved** | Route counts reconcile — **22 unconditional, 2 conditional, 5 non-indexable, 29/27 totals**. No route added, removed, renamed or reclassified. Navigation items, destinations and exclusions unchanged |
| E2 | **Copy preserved** | No approved copy rewritten, reordered or renumbered. **The one copy-numbering observation on the problem page is reported, not resolved** |
| E3 | **CRO system preserved** | CTA roles, placement, sticky permissions, form field set, booking capabilities and post-submission architecture all carried unchanged |
| E4 | **Creative Direction preserved** | The argument/apparatus hierarchy, the five visibility states, the four untradeable rules, the homepage narrative, Tier 1 figure constraints and R1–R10 all applied without dilution |
| E5 | **Anti-patterns preserved** | A1–A23 and B1–B32 carried in full; the UX additions state a harm and name their source; **no taste-based ban was introduced** |
| E6 | **Owner blockers not invented around** | Every blocked slot has a default structure, renders nothing, and names what unlocks it. **No plausible default was substituted, and no page was reshaped so a missing fact stopped being needed** |
| E7 | **F17 remains BLOCKED** | No sketch, prototype, placeholder, exploratory version or behavioural specification exists for the `/how-it-works` stage figure |
| E8 | **No strategy reopened** | No repositioning, no new category, no new page, no new query target, no changed positioning |
| E9 | **Scope respected** — ***criterion amended 2026-09-02, see the note beneath this table*** | **Wireframes and the UX pattern inventory are REQUIRED Gate 9B deliverables and are no longer prohibited by this criterion.** What remains prohibited: layout, mockup, style frame, grid, numeric breakpoint, type value, colour value, component specification, or any rendered drawing of F1–F4. **F17 must not appear in any form.** No production code touched |
| E10 | **No fabrication** | No search volume, ranking, traffic, conversion, benchmark, AI-citation figure, client result, testimonial or proportion invented anywhere, including in any figure specification |

> **NARROW AMENDMENT TO E9 — 2026-09-02 (orchestrator ruling B, remediation pass).** E9 was written on 2026-09-01, when Session 13's brief prohibited wireframes and a component inventory — the scope discrepancy flagged at the top of this document. **That discrepancy was resolved on 2026-09-02 by H6 and `27_GATE_9B_SCOPE_RECONCILIATION.md`: the durable gate is not reinterpreted, not narrowed and not weakened — it is completed.** `27` §4 and `28_WIREFRAME_SCOPE_AND_FIDELITY.md` therefore make **low-fidelity structural wireframes** and the **UX pattern inventory** required Gate 9B deliverables. E9's original wording, read literally, would fail the gate for producing exactly what the gate requires. **E9 is amended above so it cannot be read as prohibiting the Gate 9B wireframe work.** The fidelity boundary it now enforces is the one in `28` §7–§8. **No other criterion in this gate is amended, and the gate is not otherwise rewritten.**


---

## Part F — The seven behavioural tests

**Applied to any screen, page or prototype produced from this architecture.** The first six are carried from the approved anti-pattern list; the last three are added by `18` §4.

| # | Test | Fails if |
|---|---|---|
| F1 | **Standalone** | Hiding every apparatus element leaves a page that does not sell |
| F2 | **First-fixation** | On any screen the eye lands first on a date, sample, status mark or method note |
| F3 | **Proportion** | Gaps, limits and not-testable markers out-weigh what the firm does and answers for |
| F4 | **Empty-container** | Any container could hold proof MappedSkills does not have |
| F5 | **Greyscale** | Any status becomes ambiguous — **especially a measured zero versus a not-testable system** |
| F6 | **Screenshot** | Any figure with motion disabled no longer carries its information |
| F7 | **No-script, no-hover, greyscale** *(new)* | Any evidence is unreachable, any status ambiguous, any limit invisible, any destination unreachable |
| F8 | **Detour** *(new)* | Any page requires more than one action to reach a conversion surface, or interposes anything before it |
| F9 | **Away-outcome** *(new)* | The problem page's away-pointing outcomes differ in weight, openness or order priority from the ones that route to the firm |

---

## Part G — What this gate explicitly does NOT approve

Recorded so a passing gate is not read as more than it is.

- **Visual design of any kind** — layout, grid, type, colour, spacing, components, the design system.
- **Wireframes, mockups, style frames or prototypes**, none of which exist.
- **Publication readiness for any route.** Every PARTIALLY BLOCKED, BLOCKED and CONDITIONAL status is unchanged by this session and by this gate.
- **Resolution of any owner blocker.** A UX document does not supply a missing fact.
- **The three open design decisions in Part H.** They require explicit approval; a general gate pass does not confer it.
- **Any change to the IA, the CRO system, the messaging architecture, the page copy or the creative direction.**
- **The scope discrepancy in the gate definition itself** — see the note at the top of this document.
- **F17.** It remains BLOCKED regardless of this gate's outcome.
- **Anything about the current production site**, which was not measured, tested or modified.

---

## Part H — Decisions requiring explicit orchestrator approval — **ALL RESOLVED 2026-09-02**

> **All six were decided by the orchestrator on 2026-09-02.** Recorded in `21_ORCHESTRATOR_DECISIONS_H1_H5.md` (H1–H5) and `27_GATE_9B_SCOPE_RECONCILIATION.md` (H6). The table below carries the decision beside each original recommendation.

| # | Decision | Recommendation | Where argued |
|---|---|---|---|
| H1 | Inline form, or route to `/contact` | **APPROVED as recommended: route to `/contact`, no inline form.** The ruling names the homepage; its extension to commercial pages is flagged in `21` §H1 | `21` §H1 |
| H2 | Which surface the header CTA leads to | **APPROVED as recommended: the enquiry/contact surface.** No form or booking in navigation; no aggressive persistent control | `21` §H2 |
| H3 | Sticky header, or non-sticky | **APPROVED as recommended: non-sticky by default**, with one scoped wireframe experiment — orientation only, **carrying no CTA**, on long commercial pages | `21` §H3 |
| H4 | The R7 / B16 tension | **APPROVED as recommended: B16 takes precedence. Direct contact is available, not omnipresent** — one instance per page outside the two conversion surfaces | `21` §H4 |
| H5 | The problem page's recording affordance | **NOT APPROVED — the recommendation was declined.** The diagnostic ships static, ungated, printable and complete. **Phase 2 / research-required only** | `21` §H5 |
| H6 | Gate 9B's scope | **RESOLVED: the durable gate is not reinterpreted, not narrowed and not weakened. It is completed.** Low-fidelity wireframes and a UX pattern inventory remain outstanding | `27` |

---

## Part I — Gate status

**GATE 9B — UX: NOT PASSED.**

> **UPDATED 2026-09-02.** The **UX architecture is substantively approved** by the orchestrator, and all six Part H decisions are resolved. **Gate 9B remains NOT PASSED** because the durable definition requires low-fidelity wireframes and a component/pattern inventory, and neither exists. Remaining deliverables A–E: `27_GATE_9B_SCOPE_RECONCILIATION.md` §4.

**No gate status was changed by this session.** Gates 2, 5, 6, 7, 8, 9 and 9A remain PASSED. Gates 1, 3 and 4 remain artifacts-delivered, review pending. **Gate 10 onwards remain not started, not approached and not implied.**

**Session 13 is PROPOSED and awaits orchestrator review.**
