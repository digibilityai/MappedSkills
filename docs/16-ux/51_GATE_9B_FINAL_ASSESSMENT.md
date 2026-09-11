# Gate 9B — Assessment Against All 51 Proposed Criteria and the Durable Definition — Deliverable E — PROPOSED

**Session:** 13 — Gate 9B remediation and re-assessment pass, plus a final narrow closure pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED. GATE 9B IS NOT PASSED, AND THIS DOCUMENT DOES NOT PASS IT.**

> **REBUILT 2026-09-02.** The previous version of this file gave a **file-by-file verdict on 17 files** and reported every one as PASS. **That is not an assessment against the gate.** `20_GATE_9B_QUALITY_GATE.md` states **51 criteria** across six parts, and none of them was individually assessed. **The previous PASS distribution is not inherited.** Every criterion below was assessed afresh against the corrected artefacts.
>
> **NARROWLY CLOSED 2026-09-02.** A second remediation pass applied six orchestrator rulings to the four PARTIAL and one NOT ASSESSABLE items this rebuild produced. See §7 and §8 for the recomputed verdicts, and §9 row 13 for the ruling-by-ruling record.
>
> **Claude does not pass gates.** The orchestrator records gate approval in `DECISION_LOG.md`, and that has not occurred. **The only conclusion this document is permitted to reach is whether the artefacts are ready for orchestrator review.**

**Verdict scale**

| Verdict | Meaning |
|---|---|
| **PASS** | The criterion is satisfied, and the satisfying evidence is **visible in a named artefact** — not inferred |
| **PARTIAL** | Substantially satisfied with a named, specific gap that is stated rather than smoothed over |
| **FAIL** | Not satisfied |
| **NOT ASSESSABLE** | The criterion requires something this fidelity or this authority cannot produce — a rendered visual hierarchy, a user test, or an orchestrator decision |

---

## 1. Part A — Journeys and structure (A1–A8)

| # | Verdict | Evidence | Reasoning |
|---|---|---|---|
| **A1** | **PASS** | `02` §A–§G | Seven journeys, each with an entry, decision points, permitted exits and an explicit *"what breaks this journey"* condition. None forces a sequence; `02` §H treats them as one system |
| **A2** | **PASS** | `31`, `32`, `33`, `34`, `36`, `37`–`42` | Every first-screen block in the set is `[ARG]` or the page's own commercial statement. **No artefact opens on machinery** |
| **A3** | **PASS** *(recomputed 2026-09-02, orchestrator ruling 1)* | `10`, `40`, `45`, `50` §9 | Apparatus is subordinate, present sitewide and reachable in one action, and `45` demonstrates all four states including no-JavaScript. **Previous verdict: PARTIAL**, on the reading that `40`'s use of DEFERRED introduced a fourth evidence-disclosure state absent from `10`'s model. **The orchestrator ruled: DEFERRED describes *when* approved apparatus enters the page sequence, not a fourth disclosure behaviour — once it appears it still uses IMMEDIATE, ADJACENT-SECONDARY or EXPANDABLE, as appropriate.** `40` received the minimum documentation clarification needed so it does not read as introducing an unsupported fourth state (see `40` margin notes and diagram, and `50` §9). No new state was added to `10`, and no authority was exceeded |
| **A4** | **PASS** | `32`, `37`, `38`, `39`, `48` §M2 | I1 holds on every commercial artefact: capability confirmed in the searcher's own word, bridge within two sentences, both in the first screen, at every width class. **The M2 copy-length finding is a reporting obligation, not a structural exception** |
| **A5** | **PASS** *(recomputed 2026-09-02, orchestrator ruling 2)* | `31`, `24` §4 | A mixed-intent visitor can **convert** and **route** from the first screen; routing to the checkable material (Block 6) remains available through navigation. **Previous verdict: PARTIAL**, on the reading that A5 requires a first-screen *check* action. **The orchestrator ruled: Gate 9B does not require the homepage to expose a separate diagnostic/check action on the first screen** — the approved first screen deliberately prioritises commercial meaning, the primary CTA to `/contact`, and the secondary booking action; routing remains available through navigation. Assessed against the approved architecture rather than treating the absence of a first-screen check action as a defect, A5 is satisfied |
| **A6** | **PASS** | `33`, `06` §4–§5, `48` §M3 | The diagnostic is static, ungated, scoreless, printable and completable without contact. All six findings carry equal weight, openness and position priority at every width class; H5's recording affordance stays NOT APPROVED |
| **A7** | **PASS** | `32` §2, `37`–`39` margin notes, `23`, `50` §2 | **Every difference now names its driver in words** — sophistication, scepticism, misinformation, dispute risk — rather than citing `05` §3 by reference. Four distinct sequences, four distinct boundary positions, three distinct F1 classes |
| **A8** | **PASS** | `03`, `16` | Every route in the matrix has a page type and every page type has rules; `16` reconciles to **22 unconditional / 2 conditional / 5 non-indexable**, totalling **29 / 27** |

**Part A: 8 PASS · 0 PARTIAL · 0 FAIL · 0 NOT ASSESSABLE**

---

## 2. Part B — Conversion (B1–B9)

| # | Verdict | Evidence | Reasoning |
|---|---|---|---|
| **B1** | **PASS** | `08` §4, `31`, `32`, `34`, `41` | One outcome, two surfaces, on every page that converts; neither surface depends on the other's mechanism |
| **B2** | **PASS** | `50` §8 (F8), `31`–`42` | No page interposes proof before conversion. Proof is a link placed at the claim it supports (I6) |
| **B3** | **PASS** | `34`, `09` §1–§2 | Four required fields, one step, optional group marked in words, **no budget field**, no field added without displacing one |
| **B4** | **PASS** | `43` | Six states — idle, focused, busy, success, validation failure, server failure — plus three annotated identical-UI states. Values preserved through every failure; success depends on server-confirmed durable persistence |
| **B5** | **PASS** | `43`, `09` §6 | Qualified / unqualified / review-required / spam all render the success state identically — **and `43`'s analytics contract now also prevents the outcome leaking through a client-side event, a response body, a redirect URL or a readable cookie** |
| **B6** | **NOT ASSESSABLE — OWNER-BLOCKED** *(recomputed 2026-09-02, orchestrator ruling 3)* | `40`, `34`, `26` §3 | Structurally the criterion is met: `/pricing` is arranged so a buyer places themselves before enquiring, and `/contact` offers a decided visitor no routes away. **Previous verdict: PARTIAL.** **The orchestrator ruled this NOT ASSESSABLE / owner-blocked rather than PARTIAL:** demonstrating pricing-based self-placement requires prices, packages, minimums, engagement values, spend or buyer-placement thresholds that are **case 0 owner-blocked facts** (`26` §3), and the programme's non-negotiable rules forbid inventing them. The inability to demonstrate self-placement is caused entirely by missing owner-approved commercial facts, not by a UX defect, **and per the ruling this must not prevent Gate 9B approval** |
| **B7** | **PASS** | `50` §4 | Counted, not asserted: **two PRIMARY conversion regions** per commercial page plus the sitewide header control, with three page types carrying a required different number. No section-end CTA rhythm anywhere |
| **B8** | **PASS** | `44`, `09` §9 | No second ask, no response-time statement in any form, one link on the form variant and none on the booking variant, `noindex`, and no conversion event from a pageview |
| **B9** | **PASS** | `31`, `47`, `08` §5 | DIRECT contact is a peer wherever contact is offered — **one instance per page** (H4) — and its blocked state renders **nothing**, proved side by side in `47` |

**Part B: 8 PASS · 0 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE**

---

## 3. Part C — Navigation and discovery (C1–C7)

| # | Verdict | Evidence | Reasoning |
|---|---|---|---|
| **C1** | **PASS** | `46` STATE 1–3, `07` §1 | Six items, one dropdown, no mega-menu, item set unchanged, nothing removed on mobile for width |
| **C2** | **PASS** | `46` §5 | The parent is a **link**; the disclosure is a **separate control** carrying `aria-expanded`. The same two-control rule holds in the mobile panel. This is the structural fix for the verified production defect |
| **C3** | **PASS** | `46` §3, `07` §6 | The full approved breadcrumb model is now carried on the artefact: one source shared with `BreadcrumbList`, hierarchy permitted where the URL is flat, non-page segments as text. Per-wireframe placement listed |
| **C4** | **PASS** | `45`, `48` §M7, `15` §1–§2 | Content always in the DOM, never fetched on open, **and reachable with no JavaScript**. The one wide comparison is a scroll container with everything present and keyboard-reachable — not a carousel |
| **C5** | **PASS** | `15` §3–§4, `31`–`42` | Links sit at the claim they support, never at fixed intervals. No related-content module on any commercial page; a module that cannot be filled does not render |
| **C6** | **PASS** | `15` §9, `16` §2, `46` STATE 2, `26` §3 | `/work` carries no placeholder; the conditional sixth dropdown item is a config flag removable in one change |
| **C7** | **PASS** | `15` §11, whole set | No route exists for rejected AI terminology, and **no score, checker, dashboard or grade appears in any artefact** — checked explicitly against B7 and B26 in `50` §8 |

**Part C: 7 PASS · 0 PARTIAL · 0 FAIL · 0 NOT ASSESSABLE**

---

## 4. Part D — Craft constraints (D1–D8)

| # | Verdict | Evidence | Reasoning |
|---|---|---|---|
| **D1** | **PASS** | `48` §2, §3 | **All three width classes are now demonstrated for all six master types**, including the previously missing W6 narrow case. Nothing informational disappears; the apparatus is **re-parented, not dropped**, and MEDIUM is where that transformation is shown rather than asserted |
| **D2** | **PASS *(specified, not executed)*** | `13` §3–§4, `46`, `45`, `43` | Full parity, skip link required, one permitted focus containment which is escapable, no trap in the booking embed, focus retained on disclosure, focus never moved while typing. **No keyboard testing was performed — nothing was rendered or run** |
| **D3** | **PASS** | `48` §4 check 11 | Nothing hover-only at any width class: figure labels are real text, status carries shape and label, disclosures activate on click/keypress, field hints appear on **focus** |
| **D4** | **PASS** | `11` §0–§4, `31`, `32`, `37`, `38`, `42` | Each Tier 1 figure has a static primary state, a structured text equivalent, a narrow form and stated failure modes in `11`; the wireframes carry placement, role and static-state requirement only. **No figure is drawn — that is required by `28` §8, not a shortfall** |
| **D5** | **PASS** | `10` §5, `48` §4 check 3 | Limits are never collapsible at **any of the three width classes**, never below a CTA, never in a disclaimer treatment. Verified per instance |
| **D6** | **PASS** | `14` §2 | No hero video, autoplay, scroll-jacking, decorative 3D, heavy client state or charting dependency is required by any artefact |
| **D7** | **PASS** | `14` §4, `45` STATE 4, `43` | Progressive enhancement is specified with an explicit degradation list, **and `45` now draws the no-JavaScript state rather than describing it** |
| **D8** | **PASS** | `13` §13 | Requirements only, **no conformance claim anywhere**, and all **eleven** verified defects carried as obligations |

**Part D: 8 PASS · 0 PARTIAL · 0 FAIL · 0 NOT ASSESSABLE**

---

## 5. Part E — Preservation (E1–E10)

| # | Verdict | Evidence | Reasoning |
|---|---|---|---|
| **E1** | **PASS** | `16` | Route counts reconcile — 22 / 2 / 5, totalling 29 / 27. **No route added, removed, renamed or reclassified in this pass.** Navigation items, destinations and exclusions unchanged |
| **E2** | **PASS** | whole set | **No approved copy was rewritten, reordered or renumbered.** The corrections in this pass are to UX sequence labels and wireframe notation, never to words on a page. The problem-page copy-numbering observation remains reported, not resolved |
| **E3** | **PASS** | `08`, `09`, `43`, `44` | CTA roles, placement, sticky permissions, the four-field set, booking capabilities and the post-submission architecture are all carried unchanged. `43`'s analytics section **restates** `EVENT_TAXONOMY.md` §6–§7; it creates no new policy |
| **E4** | **PASS** | `22`, `11`, `31`, `24` | The argument/apparatus hierarchy, the five visibility states, the homepage narrative and block order, Tier 1 figure constraints and R1–R10 are applied without dilution. **Ruling D corrected a class declaration to match the approved taxonomy rather than departing from it** |
| **E5** | **PASS** | `18`, `50` §8 | A1–A23 and B1–B32 carried in full; every prohibition in every artefact names its source rule. **No taste-based ban was introduced in this pass** |
| **E6** | **PASS** | `26`, `47`, `31`, `33`, `34`, `40`, `41`, `44` | Every blocked slot resolves to case 0, A or B, renders nothing, and names what unlocks it. **Strengthened in this pass:** blocked-slot notation was removed from eight artboards, so no diagram now reserves a visible position for content that does not exist. **No plausible default was substituted and no page was reshaped so a missing fact stopped being needed** |
| **E7** | **PASS** | grep across `30`–`51` | **F17 is named only as prohibited** — in `30` §1 and §3, `35`'s margin note, `49` P13 fields 3 and 11, `50` §3 and here. **No sketch, prototype, placeholder, exploratory version or behavioural specification of it exists**, and no `/how-it-works` artboard exists at all |
| **E8** | **PASS** | whole set | No repositioning, no new category, no new page, no new query target, no changed positioning. **The four orchestrator rulings resolved contradictions between existing approved documents; none created new strategy** |
| **E9** | **PASS** *(criterion as amended by ruling B)* | `28` §7–§8, whole set | **Wireframes and the pattern inventory are required Gate 9B deliverables and are no longer prohibited by E9** (`20` E9 as amended 2026-09-02). What remains prohibited is absent: **no font, colour, spacing token, grid, numeric breakpoint, component specification or rendered figure drawing appears anywhere in `30`–`51`.** No production code was touched |
| **E10** | **PASS** | whole set | **No search volume, ranking, traffic, conversion, benchmark, AI-citation figure, client result, testimonial or proportion is invented anywhere**, including in figure specifications and including in `48`, which states width classes and no numbers |

**Part E: 10 PASS · 0 PARTIAL · 0 FAIL · 0 NOT ASSESSABLE**

---

## 6. Part F — The nine behavioural tests (F1–F9)

| # | Verdict | Evidence | Reasoning |
|---|---|---|---|
| **F1 standalone** | **PASS** | `31`–`42` | Hiding every `[EVD]` element leaves a page that still sells: the apparatus qualifies claims, it never carries them. The commercial spine is `[ARG]` throughout |
| **F2 first-fixation** | **NOT ASSESSABLE AT GATE 9B** *(disposition confirmed 2026-09-02, orchestrator ruling 5)* | — | *"On any screen the eye lands first on a date, sample, status mark or method note."* **This is a perceptual test and it requires a rendered visual hierarchy — type scale, weight and contrast — which is a Gate 10 output and which `28` §8 forbids this pass from producing.** What *is* assessable at this fidelity is satisfied: **no apparatus element is first in reading order on any commercial page, the homepage, the problem page or any conversion surface.** **The orchestrator ruled this cannot be honestly proven from the low-fidelity UX architecture and DEFERS it to visual validation at Gate 10, where a mandatory re-test is required. Per the ruling, this NOT ASSESSABLE status must NOT prevent Gate 9B approval** |
| **F3 proportion** | **NOT ASSESSABLE AT GATE 9B** *(recomputed 2026-09-02, orchestrator ruling 4)* | `50` §8, `31`–`42` | The **structural portion — count and order — is assessed at Gate 9B and PASSES**: no page accumulates more limit and gap material than capability material by section count or sequence position. **Previous verdict: PARTIAL. The orchestrator ruled the exact visual weight/proportion cannot be honestly proven from low-fidelity wireframes** — a limits block set in the same size and contrast as the claims it qualifies (`13` §5, `49` P5 field 6) could still out-weigh them once type and spacing exist, and no styling may be invented to make it assessable now. **The perceptual portion is recorded as NOT ASSESSABLE AT GATE 9B**, with a mandatory re-test on rendered screens at Gate 10, and per the ruling this must NOT prevent Gate 9B approval |
| **F4 empty-container** | **PASS** | `47` | Directly proved: State A contains **no container, heading, dotted outline or placeholder** that could later hold proof MappedSkills does not have. Fix 7.4 in `50` removed the last notational counter-examples |
| **F5 greyscale** | **PASS** | `35`, `37`, `48` §M7, `43` STATE 2 | The set is greyscale by construction. **Not-testable carries a distinct shape and a label, distinguishable from a measured zero without colour**; the form's focus indicator is likewise not colour-only |
| **F6 screenshot** | **PASS** | `11` §0, `31` Block 3 | Every figure is complete and readable statically. The one optional reveal on the homepage's F1 is non-blocking and the figure is complete without it |
| **F7 no-script, no-hover, greyscale** | **PASS** | `45` STATE 4, `48` §4 check 11 | **This is the criterion this pass changed.** The evidence remains reachable with no script — either the native disclosure still operates, or the content renders open and the control is not drawn. **A control that renders but cannot be operated is now explicitly prohibited.** Limits are never inside a disclosure, so no script failure can hide one. Nothing is hover-only; nothing is colour-only |
| **F8 detour** | **PASS** | `31`–`42` | Every page reaches a conversion surface in one action, and nothing is interposed before it |
| **F9 away-outcome** | **PASS** | `33`, `48` §2.3 | The three away-pointing outcomes hold equal weight, equal openness and equal position priority. **A constraint was found and recorded rather than glossed:** at MEDIUM width a two-column arrangement of the six findings would make one column read as secondary, so `48` §2.3 requires a single column unless equal position priority is demonstrably preserved |

**Part F: 7 PASS · 0 PARTIAL · 0 FAIL · 2 NOT ASSESSABLE**

---

## 7. Totals across all 51 criteria

> **RECOMPUTED 2026-09-02 (Gate 9B narrow closure pass).** Six orchestrator rulings were applied to the four PARTIAL and one NOT ASSESSABLE items carried by the previous version of this document. A3 and A5 recompute to PASS. B6 recomputes to NOT ASSESSABLE / owner-blocked. F3 recomputes to NOT ASSESSABLE AT GATE 9B (its structural portion PASSES; its perceptual portion defers to Gate 10, alongside F2). **No verdict was changed to manufacture a PASS** — each change is a named orchestrator ruling resolving a scope or authority question this pass could not resolve on its own.

| Verdict | Count |
|---|---|
| **PASS** | **48** |
| **PARTIAL** | **0** |
| **FAIL** | **0** |
| **NOT ASSESSABLE** | **3** |
| **Total** | **51** |

**By part:** A — 8/0/0/0 · B — 8/0/0/1 · C — 7/0/0/0 · D — 8/0/0/0 · E — 10/0/0/0 · F — 7/0/0/2.

**The three NOT ASSESSABLE items, in one place:**

| # | Verdict | The gap, stated plainly | Whose gap it is |
|---|---|---|---|
| **B6** | NOT ASSESSABLE — owner-blocked | A buyer cannot place themselves before enquiring, because the price and the factor values are **case 0 owner-blocked** *(orchestrator ruling 3)* | **Owner input.** A wireframe does not supply a missing fact. Does not prevent Gate 9B approval |
| **F3** | NOT ASSESSABLE AT GATE 9B *(perceptual portion only — structural portion PASSES)* | Proportion passes on count and order; **visual weight cannot be measured without a rendered type and spacing system** *(orchestrator ruling 4)* | **Gate 10.** Must be re-run on rendered screens. Does not prevent Gate 9B approval |
| **F2** | NOT ASSESSABLE AT GATE 9B | First-fixation is perceptual and needs a rendered visual hierarchy *(orchestrator ruling 5)* | **Gate 10.** The reading-order half is satisfied now; the perceptual half is not yet testable. Does not prevent Gate 9B approval |

**Resolved this pass, carried for the record:**

| # | Previous verdict | New verdict | Ruling | Why the evidence supports the change |
|---|---|---|---|---|
| **A3** | PARTIAL | PASS | Ruling 1 | DEFERRED is a scheduling term for *when* apparatus enters the sequence, not a fourth disclosure behaviour; `40` was clarified to use IMMEDIATE/ADJACENT-SECONDARY/EXPANDABLE once the apparatus appears, consistent with `10` §3 |
| **A5** | PARTIAL | PASS | Ruling 2 | Gate 9B does not require a first-screen check action; the approved first screen deliberately prioritises commercial meaning and the two conversion actions, and routing remains available through navigation |
| **B6** | PARTIAL | NOT ASSESSABLE — owner-blocked | Ruling 3 | The gap is a missing owner-approved commercial fact (price/packages/minimums), not a structural defect; the programme forbids inventing it, so the criterion cannot be assessed rather than partially failed |
| **F3** | PARTIAL | NOT ASSESSABLE AT GATE 9B (structural portion PASSES) | Ruling 4 | Visual weight cannot be honestly proven from low-fidelity wireframes; the assessable structural portion (count/order) already passes and is preserved in the reasoning |

**None is a defect in the UX architecture, and none is concealed as a PASS.**

---

## 8. The durable Gate 9B criteria, recomputed separately

**The durable definition, quoted from `QUALITY_GATES.md` via `27` §1 — inspected read-only, not modified, not weakened:**

> **Required:** wireframes/page templates, responsive behaviours, component inventory.
> **Acceptance:** clear hierarchy, usable at target breakpoints, aligned to CRO. **Binding input:** the refined `14_DESIGN_ANTI_PATTERNS.md`.

| Durable requirement | Verdict | Evidence | Reasoning |
|---|---|---|---|
| **Wireframes / page templates** | **PASS** | `31`–`48` | 6 masters + 6 variants + 5 states + the responsive/mobile set = the 24 artefacts `28` §6 specifies, plus the shared legend. Prose page templates in `03` and `16` unchanged beneath them |
| **Responsive behaviours** | **PASS** | `48` | **NARROW, MEDIUM and WIDE demonstrated for all six master types**, plus the seven M-slots and the variant-specific differences. The earlier assertion-in-place-of-demonstration is corrected |
| **Component inventory** | **PASS** | `49` | **Exactly 16 entries** — 14 patterns + 2 sitewide regions — all twelve fields populated, and now cross-checked **bidirectionally against explicit per-wireframe pattern annotations** rather than by inference (`50` §6) |
| **Acceptance — clear hierarchy** | **NOT ASSESSABLE AT GATE 9B** *(recomputed 2026-09-02, rulings 4 & 5)* | `31`–`42`, `50` §8 | Hierarchy of **order, grouping and relative emphasis** is demonstrated in every artefact — the structural portion PASSES. **Visual hierarchy is not assessable at this fidelity** — see F2 and F3, both deferred to Gate 10 visual validation by orchestrator ruling. **No user testing occurred and none is claimed. Per the ruling this does not prevent Gate 9B approval** |
| **Acceptance — usable at target breakpoints** | **PASS** *(recomputed 2026-09-02, orchestrator ruling 6)* | `48`, `27` §2 | **The orchestrator ruled that Gate 9B validates responsive behaviour through structural width classes — NARROW, MEDIUM, WIDE — with exact numeric breakpoint values intentionally deferred to later design/implementation**, and that Gate 9B is not marked partial merely because numeric breakpoints do not yet exist. Verified: **all six master types (`48` §2.1–§2.6) genuinely demonstrate all three width classes**, so this criterion PASSES at Gate 9B under the ruling |
| **Acceptance — aligned to CRO** | **PASS** | `50` §4, `43`, `44` | Every CTA role, placement, budget, form field, booking capability and post-submission behaviour traces to `DEC-011` unchanged, and the CTA budget is now **counted per artefact** rather than asserted |
| **Binding input — the anti-pattern framework** | **PASS** | `50` §8 | A1–A23 and B1–B32 carried; seventeen anti-patterns and behavioural tests spot-checked against named artefacts, with two constraints recorded rather than smoothed |

**Durable totals: 6 PASS · 0 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE (Gate 10, non-blocking per orchestrator ruling).**

**The five deliverables `27` §4 left outstanding:** A wireframes — **delivered** (`31`–`48`) · B pattern inventory — **delivered** (`49`) · C cross-page consistency check — **delivered** (`50`) · D mobile structural set — **delivered** (`48` M1–M7) · E validation against the durable criteria — **this document**. **Present on disk is a structural claim, not an approval claim.**

---

## 9. What this pass corrected, recorded so the previous assessment is not read as current

| # | Correction | Files |
|---|---|---|
| 1 | **Ruling A** — `/ai-seo`'s evidence-before-boundary order restored as the single binding sequence | `23`, `37` |
| 2 | **Ruling B** — E9's no-wireframe prohibition amended so it cannot fail the gate for producing what the gate requires | `20` |
| 3 | **Ruling C** — `/social-media-ads` = NONE; the stale pre-taxonomy sentence corrected at source | `05`, `39` |
| 4 | **Ruling D** — `/how-it-works`' F1 class corrected to the approved taxonomy, **without inventing F17 or unblocking the route** | `35` |
| 5 | **The commercial master re-authored to the approved nine moves** — move 3 is the buyer's problem, move 6 is measurement, move 7 is evidence; the move-7 compression rule no longer misapplied to move 3; the 12-month-plus horizon restored and elevated; invariants separated from intent-driven variation; the four drivers stated in words | `32`, and consequentially `37`, `38`, `39`, `42` |
| 6 | **Blocked-slot notation removed from eight artboards** and replaced with margin tables; the convention recorded so the drift cannot recur | `30`, `31`, `33`, `34`, `40`, `41`, `44`, `47`, `48` |
| 7 | **Form focus state added**, plus the analytics and privacy contract — no PII, and no screening/spam/review state leaking through any client-visible channel | `43` |
| 8 | **No-JavaScript evidence state added** as a drawn fourth state, prohibiting a rendered-but-inert control | `45`, `49` P4 |
| 9 | **Breadcrumb model, non-sticky header default, the no-CTA experiment constraints, and the parent-link/disclosure separation** all carried onto the navigation artefact | `46` |
| 10 | **Responsive validation rebuilt** — three classes × six masters, the missing W6 narrow demonstration, and an eleven-point verification | `48` |
| 11 | **Cross-page audit re-run**, three false PASS claims corrected, four fixes applied, two findings and one open item carried | `50` |
| 12 | **P14's character-count measure removed** — a dimension, which the inventory's own criterion 8 forbids. **The inventory remains at exactly 16 entries** | `49` |
| 13 | **Session 13 — Gate 9B final narrow closure (2026-09-02).** Six orchestrator rulings applied to the remaining PARTIAL/NOT ASSESSABLE items: A3 and A5 recomputed to PASS; B6 recomputed to NOT ASSESSABLE/owner-blocked; F3 recomputed to NOT ASSESSABLE AT GATE 9B (structural PASS, perceptual deferred); F2's disposition confirmed non-blocking; the durable "usable at target breakpoints" criterion recomputed to PASS; the durable "clear hierarchy" criterion recomputed to NOT ASSESSABLE AT GATE 9B, non-blocking | `40`, `50`, `51` |

---

## 10. What this document does not and cannot establish

- **No visual design of any kind exists.** Layout, grid, type, colour, spacing and components remain Gate 10.
- **No route has moved closer to publication readiness.** Every case-0 route (`26` §3 — `/how-it-works`, `/pricing`, `/about`, `/contact`, `/schedule-call`) remains launch-blocked, **including both conversion surfaces**. A wireframe of a blocked route does not unblock it.
- **No owner blocker is resolved**, and none was invented around.
- **F17 remains BLOCKED.**
- **No user testing, no rendering, no build, no lint, no test run, no accessibility or performance measurement.** Nothing here is a conformance or performance claim.
- **No production code, configuration, content or asset was touched.**
- **The width-class resolution is now confirmed by orchestrator ruling** (ruling 6, 2026-09-02): Gate 9B validates responsive behaviour through structural width classes, with numeric breakpoint values remaining a Gate 10 output. This is a scope ruling on how Gate 9B is assessed, **not** a numeric breakpoint value, a visual design, or a Gate 10 deliverable produced early.
- **No gate status was changed and nothing was recorded in `DECISION_LOG.md`.** This session applied the orchestrator's rulings to the assessment; **it did not pass Gate 9B — Claude does not pass gates.**

---

## 11. Conclusion

**GATE 9B — UX: NOT PASSED.**

> **UPDATED 2026-09-02 — Gate 9B final narrow closure pass.** Six orchestrator rulings were applied to the open items carried by the previous version of this document. Across the 51 proposed criteria the result recomputes to **48 PASS · 0 PARTIAL · 0 FAIL · 3 NOT ASSESSABLE**; across the durable criteria it recomputes to **6 PASS · 0 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE**.

**All three remaining NOT ASSESSABLE items are, by explicit orchestrator ruling, items that do NOT prevent Gate 9B approval:**
- **B6** is owner-blocked — a missing commercial fact the programme forbids inventing.
- **F3**'s perceptual portion and **F2** are both perceptual tests that require a rendered visual hierarchy; both are deferred to mandatory Gate 10 visual-validation re-tests.

**No remaining item is a UX defect, and none was resolved by relaxing a criterion, inventing a fact, or producing visual design early.**

> **THE UX ARTEFACTS ARE READY FOR ORCHESTRATOR REVIEW.**
>
> **Gate 9B remains NOT PASSED. Claude does not pass gates.**
