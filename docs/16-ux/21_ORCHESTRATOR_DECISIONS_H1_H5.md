# Orchestrator Decisions H1–H5 — APPROVED UX DECISIONS

**Session:** 13 — Orchestrator correction / gate-scope reconciliation pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **APPROVED UX DECISIONS.** Recorded by the orchestrator on the five open questions raised in `20_GATE_9B_QUALITY_GATE.md` Part H.

> **These are UX decisions, not gate approvals.** Recording them does not pass Gate 9B, and does not authorise visual design.
>
> **`DECISION_LOG.md` was not modified** — recording a decision there is an orchestrator action outside this session's permitted file set. These decisions live here and in `CURRENT_STATE.md` until the orchestrator records them formally.

---

## H1 — Homepage primary CTA — **APPROVED**

> **The homepage primary enquiry action routes to `/contact`. The full enquiry form is NOT placed inline on the homepage.**

**Reason, as given:** the homepage should explain, route and establish confidence. **`/contact` is the dedicated enquiry surface.** A booking action may remain available as a secondary action where already approved.

### What changes

Nothing structural. `04_HOMEPAGE_UX.md` §8 already specifies Block 8 as two surfaces plus direct contact, with no inline form. **This decision confirms it and closes the question.**

### Scope note — recorded, not assumed

The orchestrator's wording names **the homepage**. Session 13's original open decision (`05` §7 D1) was broader: whether **any** commercial page carries an inline form or routes to `/contact`.

**Claude's reading, flagged for confirmation rather than treated as settled:** the stated reason — *"the contact page is the dedicated enquiry surface"* — is a general principle, and **H2 independently routes the header CTA to the same surface**. On that basis the broader D1 is resolved in the same direction: **commercial pages route to `/contact` with page context preserved, and carry no inline form.**

**If the orchestrator intended H1 to settle the homepage only and leave commercial pages open, that requires one word to say so.** Until then this document treats the routing rule as sitewide, and `05` §7 D1 is marked resolved accordingly.

**Unchanged either way:** service/problem context is derived from the page the visitor converted from and is **never asked** — so the transition costs the visitor nothing.

---

## H2 — Header CTA — **APPROVED**

> **The header CTA routes to the enquiry/contact surface.**

**Prohibited, as stated:**
- a form embedded in navigation;
- booking embedded in navigation;
- an aggressive persistent sales control.

**UX role:** a direct route to enquiry. **Final visual treatment remains a later design decision** and is not made here.

### What changes

`08_CTA_SYSTEM.md` §9 decision 1 is resolved: **one header control, sitewide, identical, routing to `/contact`.** Its label must remain changeable when the entry-offer decision is made, without altering the navigation structure.

**Consistent with H4:** the header CTA is the enquiry route. It is **not** a contact-method cluster, and phone/WhatsApp do not sit inside it as a second control competing for the same slot.

---

## H3 — Sticky header — **APPROVED DEFAULT: NON-STICKY**

> **Non-sticky is the approved default. Do not assume sticky navigation.**
>
> **A restrained compact sticky navigation MAY be tested during low-fidelity wireframe validation on genuinely long commercial pages, if it improves orientation. That is an experiment to evaluate, not the approved default.**
>
> **No persistent sticky sales CTA is introduced by default.**

### What changes

`07_NAVIGATION_ARCHITECTURE.md` §4 recommended non-sticky; **that recommendation is now the approved default.**

### The experiment, scoped so it cannot drift

If the wireframe pass tests a compact sticky navigation, it is bound by all of the following. **Failing any one ends the experiment.**

| # | Constraint |
|---|---|
| 1 | **Long commercial pages only.** Never on `/how-it-works`, `/research`, `/research/*`, `/blog`, `/blog/*` — B16 is a HARD ban and this experiment does not reach it |
| 2 | **Orientation only.** It exists to tell a reader where they are and how to leave. **It must not carry a conversion prompt** — see constraint 3 |
| 3 | **No sticky sales CTA.** If the compact bar carries the primary CTA, it *is* a persistent sales control, which H2 prohibits and B16 constrains. **The experiment therefore tests navigation without the CTA** |
| 4 | **Compact and quiet.** Never expanding, pulsing, animating or changing on scroll |
| 5 | **Never two sticky elements at once**, and never obscuring content, a form field, the submit control, or anything while a mobile keyboard is open (U6) |
| 6 | **It must be evaluable against a stated question:** *does a reader on a long commercial page lose orientation without it?* If the wireframe pass cannot answer that from structure alone, **the experiment does not run** — it becomes a post-launch question with real traffic, not a design preference |

**Default if the experiment is inconclusive: non-sticky.** An inconclusive experiment does not promote itself.

---

## H4 — Phone / WhatsApp and direct contact — **APPROVED**

> **Anti-pattern B16 takes precedence over `16_COMMERCIAL_ENERGY_SYSTEM.md` §5 R7 where they conflict.**
>
> **Direct contact is available, not omnipresent.**

**Direct contact must be easy to find where it is commercially relevant** — particularly `/contact`, `/schedule-call`, and mobile contact surfaces.

**It must NOT become:**
- a persistent floating contact strip;
- a repeated CTA on every section;
- a second competing navigation system;
- a high-pressure conversion device.

### What this corrects in Session 13

Session 13 carried R7's wording — *"phone and WhatsApp persistent and at equal weight to the form, sitewide"* — into `08_CTA_SYSTEM.md` §5 and `17_REUSABLE_UX_PATTERNS.md` P8. **That wording is now superseded by this decision.** Both files are amended.

### The corrected rule

| Surface | Direct contact |
|---|---|
| **`/contact`** | **Prominent, at equal weight to the form.** Its own section |
| **`/schedule-call`** | **Prominent, at equal weight to booking.** Its own section, and the fallback when the booking surface fails |
| **`/thank-you`** | Present, as the **only** onward action — the urgent route |
| **The conditional vertical page** | **Elevated** — this segment calls, and the approved CRO rule requires it genuinely prominent there |
| **Homepage Block 8, and the action block on commercial pages** | **Present as a peer within the action region.** One instance per page, in that region only |
| **Header utility** | Present, visually subordinate to the CTA |
| **Footer entity block** | Present, as part of the NAP |
| **Everywhere else** | **Absent.** No per-section repetition, no floating strip, no second contact system |

**One instance per page outside the two conversion surfaces.** That is the operative rule, and it is checkable.

**Unchanged:** `tel:` is one tap on mobile · a phone or email click is **conversion intent, never a qualified enquiry** · the published phone number is **OWNER-BLOCKED and renders no placeholder**, and the WhatsApp action is blocked with it.

---

## H5 — Problem-page recording affordance — **NOT APPROVED FOR LAUNCH UX**

> **The five-check diagnostic remains ungated, usable without interaction, printable and saveable by ordinary browser behaviour, and complete as static content.**

**Prohibited outright at launch:**

- local saved state;
- checklist persistence;
- scoring;
- completion tracking;
- browser-storage state;
- a diagnostic account;
- email capture;
- a gated result.

**Reason, as given:** the interaction adds complexity without evidence that it improves buyer comprehension or decision quality.

**Recorded as: PHASE 2 / RESEARCH-REQUIRED POSSIBILITY ONLY.**

### What changes

`06_PROBLEM_PAGE_UX.md` §4.2 proposed the affordance under eight constraints. **It is now not approved for launch**, and §4.2 is amended to record the decision and its reasoning. The eight constraints are preserved as the conditions any future Phase 2 version would have to satisfy — **they do not constitute approval.**

**What is unchanged, and is the whole point:** the five checks were already **complete and sufficient as static content**, each ending in a named observable outcome. **The page loses nothing.** Session 13 said so explicitly — *"if the affordance cannot be built to all of these constraints, it does not ship, and the page loses nothing that matters."*

### Requirement this adds

**Printability becomes an explicit UX requirement of the problem page**, since the reader will now work through five checks with no assistance from the page. The checks, their observable outcomes and all six findings must print cleanly, in order, with every disclosure open — **and the reader must be able to save the page by ordinary browser behaviour with nothing lost.**

**No print stylesheet detail is specified here.** The requirement is stated; execution belongs to the design and implementation phases.

---

## Status of the sixth open question

**H6 — Gate 9B's scope — is resolved by the orchestrator's instruction opening this pass:** the durable gate definition stands, **Gate 9B cannot pass until low-fidelity wireframes and a UX component/pattern inventory exist**, and the gate is not weakened. See `27_GATE_9B_SCOPE_RECONCILIATION.md`.

---

## Decisions summary

| # | Question | Decision |
|---|---|---|
| **H1** | Homepage primary CTA | **Routes to `/contact`. No inline form on the homepage.** Read as sitewide for commercial pages, flagged for confirmation |
| **H2** | Header CTA | **Routes to the enquiry/contact surface.** No form or booking in navigation; no aggressive persistent control |
| **H3** | Sticky header | **Non-sticky by default.** A compact orientation-only sticky nav may be *tested* on long commercial pages, under six constraints, carrying no CTA |
| **H4** | Phone / WhatsApp | **B16 takes precedence over R7. Available, not omnipresent** — one instance per page outside the two conversion surfaces |
| **H5** | Problem-page recording affordance | **NOT APPROVED for launch.** Static, ungated, printable. Phase 2 / research-required only |
