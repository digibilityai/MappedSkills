# Wireframe — VARIANT 04 — Pricing (V4, `/pricing`) — of W2 — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`. Structurally distinct from, but grouped as a variant of, W2 per `28` §2.
**Source of structure:** `03_PAGE_TYPE_ARCHITECTURE.md` §5 · `26_OWNER_BLOCKED_STRUCTURE_RULE.md` §3 (case 0 — the price itself).

---

## Margin notes

- **Page type:** Pricing. **Structural difference: apparatus DEFERRED entirely; booking emphasised; the price as the largest element on its screen; the blocked price slot omitted.**
- **First screen:** what is actually being bought → horizon → **price**. Sparse, confident, undecorated. **Apparatus scheduling: DEFERRED — absent from the first screens and reintroduced at "what moves the number".** DEFERRED describes *when* the apparatus enters the page sequence, not a fourth evidence-disclosure behaviour; once it appears, it uses one of the three approved behaviours in `10` §3 (**clarified 2026-09-02, orchestrator ruling 1, remediation pass**).
- **F1 class:** **D — NONE.** F8 (factor matrix) is the page's figure; a chain diagram would slow its opening (`22` §3).
- **CTA roles/locations:** [ACT] with **booking emphasised** (price-stage buyers want a person) · [SEC] PROOF secondary.
- **Omitted slots — margin annotation only; the artboard carries no `[BLK]` tag** (`30` §4.1). **The price is case 0** (`26` §3): the whole route does not launch without it, so there is no omitted state of this page to draw. Every figure on the route — prices, inclusions, exclusions, whether ad spend is separate, minimum engagement — is owner-blocked. The diagram is the **FILLED** state at structural completeness. **No band, no "from", no range and no "contact for pricing" stands in for the number anywhere**, on the artboard or in the annotation.
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P1 · P4 *(resumes at "what moves the number")* · P5 *(fit section)* · P7 · P8 · P13 *(F8 factor matrix)* · R1 · R2. **P3 is NOT used** — D — NONE.
- **Width class shown:** WIDE (primary). NARROW: price is the largest element on its own screen; factor matrix linearises, never a horizontally scrolled table of the whole page (`03` §5).
- **What this artefact uniquely proves:** apparatus can be legitimately **scheduled later in the page sequence** — absent from the first screens, reintroduced at "what moves the number" using an approved evidence behaviour (`10` §3) — without breaking the evidence-interaction contract; the blocked price slot is a case-0 route, not a case-A/B omission within a launching page.

---

## WIDE structural diagram

```
┌───────────────────────────────────────────────────────────┐
│ [NAV] Header — primary nav item, no breadcrumb (top level)  │
├───────────────────────────────────────────────────────────┤
│ WHAT IS ACTUALLY BEING BOUGHT                       [ARG]   │
├───────────────────────────────────────────────────────────┤
│ THE HORIZON                                         [ARG]   │
├───────────────────────────────────────────────────────────┤
│ THE PRICE — largest element on its own screen       [ARG]   │
│  [no apparatus on this screen — scheduled later]             │
├───────────────────────────────────────────────────────────┤
│ WHAT MOVES THE NUMBER              [EVD: IMMEDIATE — F8 factor│
│  matrix and its provenance, visible on arrival, no action]     │
├───────────────────────────────────────────────────────────┤
│ WHAT THE ENGAGEMENT NEEDS FROM YOU                  [ARG]    │
├───────────────────────────────────────────────────────────┤
│ WHO THIS IS NOT FOR                       [P7 — fit test]     │
├───────────────────────────────────────────────────────────┤
│ THE HARDEST OBJECTION                               [ARG]    │
├───────────────────────────────────────────────────────────┤
│ ACT — [ACT] BOOKING EMPHASISED   [SEC] PROOF (form secondary) │
│  sticky permitted                                              │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer                                                    │
└───────────────────────────────────────────────────────────┘
```

**Prohibited on this wireframe (checked):** a decorated price, a calculator or value estimator, an ROI/payback figure, disparagement of cheaper suppliers, urgency/scarcity framing, a "contact for pricing" placeholder standing in for a real price (`26` §3 — case 0 forbids any placeholder band, range or "from" value), **and no `[BLK]` tag or placeholder drawn on the artboard** (`30` §4.1).
