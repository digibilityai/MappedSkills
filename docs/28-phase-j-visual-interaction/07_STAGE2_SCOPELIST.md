# PHASE J — STAGE 2 — SCOPELIST (J8 + J4)

**Date:** 2026-09-07 · **Branch:** `test_branch`
**Status:** **IMPLEMENTED — AWAITING OWNER / ChatGPT REVIEW.**

---

## 1. Scope correction, recorded before anything else

> **⚠ CORRECTION to the Phase J gate documents.** `01_QUANTITATIVE_BASELINE.md` §5 and the header
> comment of `prototype/prototype-a-scope-anatomy.html` both state that `ScopeList` renders on
> *"/seo, /ai-seo, /google-ads, **/social-media-ads**, /lead-generation, /conversion-optimization"*.
> **That is wrong.** Verified against source: the six instances are
> **`/seo`, `/ai-seo`, `/google-ads`, `/lead-generation`, `/conversion-optimization` and
> `/services`**. `/social-media-ads` contains no `ScopeList` at all.
>
> The count of six was right; one member was misidentified. `01_QUANTITATIVE_BASELINE.md` carries
> the fix inline. **The prototype file is left unchanged** — it is a reviewed gate artefact and the
> Phase J brief §43 requires historical prototypes not to be overwritten, so this note is its
> correction of record. `02_INTERACTION_GRAMMAR.md`, `03_PAGE_PRIMITIVE_MATRIX.md` and
> `04_PROTOTYPE_REVIEW.md` say only "six capability routes" without naming them, and are accurate
> as written.
>
> **This has no effect on the owner's ruling** — `/social-media-ads` keeps its binding
> **D — NONE** treatment either way, and nothing was added to it.

---

## 2. What was built

Two files:

| File | Kind | Purpose |
|---|---|---|
| `components/commercial/ScopeList.tsx` | **Server** | renders every item as an **open** `<details>` |
| `components/commercial/ScopeDisclosure.tsx` | **Client (new)** | collapses to one open member; nothing else |

### The threshold is a rule, not per-page configuration

**Disclosure engages at four or more items.** A set of three has no reading-burden problem to
solve, and collapsing it would hide two thirds of a short list for nothing.

| Route | Items | Treatment |
|---|:--:|---|
| `/seo` | 6 | disclosed |
| `/google-ads` | 6 | disclosed |
| `/ai-seo` | 5 | disclosed |
| `/lead-generation` | 5 | disclosed (`numbered`, order only — unchanged) |
| `/conversion-optimization` | 4 | disclosed |
| **`/services`** | **3** | **unchanged — no `<details>`, no client leaf, no change of any kind** |

`/services`' three parts are Capture → Convert → Measure, the page's central proposition. The rule
protects them without a per-page exception.

---

## 3. Why `<details>`, and why the client leaf touches only `open`

### The failure this design exists to prevent

During the design gate, Prototype A moved the selected panel into a second container and cleared
that container with `innerHTML = ''` first. Cycling the six items **destroyed two panels and
permanently deleted two paragraphs of approved copy** (`04_PROTOTYPE_REVIEW.md` §5, defect 1).

**In production that class of failure is not defended against — it is made structurally
impossible.** `ScopeDisclosure` never creates, moves, clones, replaces or removes a node. It sets a
boolean attribute on elements the server rendered. **There is no code path that can change the
document's content.**

### Why not a tablist

A tablist's non-selected panels must be hidden by script, which forces the **server** to decide
what a reader with no JavaScript sees. `<details open>` inverts that: the server sends every panel
**open**, so no-JS, a failed hydration and a non-executing crawler all receive the complete set in
raw HTML. Collapsing is then purely an enhancement.

`<summary>` is also natively focusable and natively toggled by Enter and Space, so the keyboard
contract does not depend on this file being correct.

### The native `name` attribute is deliberately NOT used

`<details name="…">` gives browsers a built-in exclusive accordion — but a browser closes all but
one member **at parse time**. That would silently collapse the page for a reader with no
JavaScript and defeat the entire reason `<details>` was chosen. Exclusivity is done in the leaf,
where it can only apply once scripting is running.

---

## 4. Interaction

| | |
|---|---|
| **Pointer** | click/tap the whole row — a full-width control, not a small glyph |
| **Keyboard** | Enter / Space toggle (native). ArrowUp / ArrowDown / Home / End rove between summaries (enhancement) |
| **Hover** | **never required for anything** |
| **Selected state** | the open row's affordance loses its vertical stroke; `<summary>` exposes expanded/collapsed to assistive technology natively |
| **ARIA** | **none added.** `<details>`/`<summary>` already carry the semantics. A hand-rolled `aria-expanded` would be ARIA papering over structure, which the Phase J rules prohibit |
| **All-closed** | permitted. A reader may close the open row; that is standard `<details>` behaviour, is reversible, and loses nothing |

### Semantic equality (§15)

Every row is the same weight, size and colour. No node size, line thickness, position, colour
intensity or progress indicator implies importance, performance, traffic, conversion or business
value — **because the approved copy establishes no such hierarchy.** The only ordering signal is
`numbered`, which was order-only before this change and still is.

### No new figure

The **collapsed set is the anatomy**: every member visible at once, in order, at equal weight, with
one expanded. **No chain is drawn.** Five of the six routes are F1 class **D — NONE** or already
carry their own figure, and adding a second path-shaped drawing would be exactly the
"figure becomes a signature" failure `docs/16-ux/22_F1_USAGE_TAXONOMY.md` §1 exists to prevent.

**This is why the production component carries no "Acts on: …" locator, which Prototype A had.**
Those locators were prototype authoring, not approved copy. **No copy was added.**

---

## 5. Motion and budget

| | |
|---|---|
| Animation | **one** CSS transition — 180 ms (T4 micro) on the affordance stroke |
| Observers, `rAF`, timers, loops | **0** — verified by grep on the leaf |
| T2 consumed | **0.** The secondary-page budget of T2 = 1 is **not spent** by Stage 2 |
| Reduced motion | the global floor in `app/globals.css` collapses `transition-duration` on `*`, `*::before` and `*::after` to 0.01 ms; the affordance resolves instantly and **no state or content depends on motion** |
| Analytics | **none.** No changed file references `gtag`, `dataLayer`, `lib/analytics` or any event name |

---

## 6. Verified

| Check | Result |
|---|---|
| **Panel destruction** — 2 full cycles + 2 extra, then **25 rapid clicks**, on all five routes | items, summaries, bodies and DOM word count **identical before and after**; **0 lost, 0 duplicated**; lead strings byte-identical |
| Keyboard on all five routes | `ArrowDown`, `End`, `Home` all correct |
| No-JS (raw server HTML) | `/seo` 6/6 open · `/ai-seo` 5/5 · `/google-ads` 6/6 · `/lead-generation` 5/5 · `/conversion-optimization` 4/4 · **0 hidden**, exactly one `<h1>` each |
| Every scope body present in raw HTML | ✅ all six checked strings on `/seo` |
| Unmount | restores every `<details>` to `open`, so a client-side navigation away and back cannot leave a page collapsed with no script running |
| Client JS added | **1 242 bytes** compiled per route chunk (uncompressed) |
| Client components on commercial routes | **0 → 1** |
