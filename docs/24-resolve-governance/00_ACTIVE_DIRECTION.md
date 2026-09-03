# ACTIVE VISUAL DIRECTION — THE RESOLVE (Session 15C)

**Session:** 17A — Owner direction correction · **Date:** 2026-09-03 · **Branch:** `test_branch`
**Status:** **BINDING as the active direction** (`DEC-018`). This document is governance, not a
design system.

---

## 0. READ THIS BEFORE ANYTHING IN `docs/22-design-system/`

> ### The active visual direction is **THE RESOLVE**, from **Session 15C**.
> ### It is **NOT** THE ARRIVAL, and it is **NOT** dark-first.

`docs/22-design-system/` is a **17-document design system built for THE ARRIVAL**. It is retained
as history. **Its Arrival-specific rules — dark-first, the espresso ground, amber, the eight
signal states, the horizon/ledger/capture-line primitives, the canvas field — are SUPERSEDED and
must not be applied to THE RESOLVE.** Which of its rules survive is settled, rule by rule, in
`01_SESSION16_AUDIT.md`. **Do not open `docs/22` without reading that audit first.**

## 1. What happened

| | |
|---|---|
| **2026-09-03** | `DEC-017` recorded **THE ARRIVAL (Session 15D)** as the approved direction, on the owner's reported words *"Yes, 15D is clearly better."* Session 16 then built a design system on it |
| **2026-09-03, subsequently** | The owner **reopened the actual browser prototypes** and clarified that the earlier reference was a **mistaken prototype label**. The owner's words: **“Yes this is the one. I like THE CONVERGENCE — ‘The Resolve’.”** |
| **Therefore** | The prototype the owner intended to approve is **Session 15C — THE CONVERGENCE — “THE RESOLVE”**. `DEC-018` records the correction |

**This was a labelling error, not a change of mind.** `DEC-017` is retained unchanged as
historical record; it is superseded for *active creative direction* only.

## 2. The direction, in one paragraph

> **Traffic is a field of identical, anonymous marks. Enquiries are a few distinct, named
> objects. The site's one move is RESOLUTION — the same population, resolved.**

The central move is **resolution**: the same population **changes meaning and state**. It is never
swapped for an unrelated illustration. The experience runs **anonymous activity → commercial
resolution**, which is the approved positioning — *"Judge us on the enquiries, not the traffic"* —
made visible.

## 3. The reference is the prototype, not this document

> ### `docs/20-creative-convergence/prototype/convergence.html`

**That file is the visual reference.** It is self-contained: one HTML file, ~709 lines, no
libraries, no images, ~120 lines of inline vanilla JavaScript. **It must not be modified.** Where
this document and the prototype disagree, **the prototype wins** and this document is wrong.

Supporting Session 15C documents, all retained unchanged:
`docs/20-creative-convergence/00_CONVERGENCE_RATIONALE.md` · `01_MOTION_LANGUAGE.md` ·
`02_RESPONSIVE_ACCESSIBILITY_PERFORMANCE.md` · `03_SELF_CRITIQUE_AND_TESTS.md`.

## 4. Binding visual characteristics — verified against the prototype

**Everything in this section was read out of `convergence.html`, not carried over from a brief.**

### 4.1 Ground — light-first, with a dark hero stage

| | |
|---|---|
| **Body ground** | `--ivory: #F7F3EC` — **verified**: the rendered `body` background is `rgb(247,243,236)` |
| **Raised light surface** | `--paper: #FFFDF9` |
| **The hero stage** | A **dark surface** inside the light page. It opens in the *traffic* state, dark, and **inverts to light as the population resolves** |
| **The closing CTA** | A **full-bleed tangerine** region, followed by a dark footer strip |

> **THE RESOLVE IS LIGHT-FIRST.** The dark hero stage is a **counted inversion inside a light
> page**, and it carries meaning — dark is the anonymous-traffic state. It is **not** a dark-first
> site. Anyone applying Session 16's `B1 — Dark-first` to this direction has broken it.

### 4.2 Ink and accent

| Token | Value | Role |
|---|---|---|
| `--ink` | `#141219` | Type and structure |
| `--tang` | `#FF5B04` | **The mark** — fills, and text on the dark ground |
| `--tang-ink` | `#D94400` | The same mark, darkened for **display** text on light |
| `--tang-sm` | `#A83400` | Darkened again for **small** text, to clear 4.5:1 |
| `--dim` | `#5C5665` | The **traffic** register — anonymous, undifferentiated |
| `--gapc` | `#8E8798` | **Not measured / unattributed** |
| `--line` | `#DED6C8` | Rules |

**One accent, and it is tangerine.** It marks resolution — where anonymous activity becomes a
named commercial object. It is never a mood, a wash, a gradient or a grade. **There is no second
accent and no amber.**

The three-step tangerine ramp exists **because of contrast, not taste**: the same mark darkens as
the type gets smaller so that small text clears 4.5:1. Preserve the ramp, not the hexes.

### 4.3 Typography

| Role | Family |
|---|---|
| Display | **Bricolage Grotesque** |
| Body | **Manrope** |

**No monospace anywhere** — verified: zero monospace declarations in the prototype. Monospace is
the register that produced both the document reading and the developer-tool reading, and it stays
prohibited.

### 4.4 Structure — the prototype's eight regions

`hero` → `handoff` → `act 01 CAPTURE` → `act 02 CONVERT` → `act 03 MEASURE` → `boundary` →
`evidence` → `close`.

**CAPTURE → CONVERT → MEASURE is a sequential resolution**, not three feature cards. The boundary
region (*"Five things fall away. One does not."*) states what the firm will not promise. Evidence
is treated as **claim / what-it-stands-on**.

### 4.5 Verified absent

Each of these was checked in the prototype source, not assumed:

| Absent | Evidence |
|---|---|
| **Canvas** | 0 — the only occurrence of the word is a comment saying *"no canvas"* |
| **Images / icon fonts** | 0 `<img>` |
| **Shadows** | `box-shadow` is **never set**; it appears once inside a `transition` property list and nowhere else |
| **Fixed / sticky elements** | 0 `position: fixed`, 0 `position: sticky` |
| **Looping animation** | 0 `infinite`. Two `@keyframes` exist (`ripple`, `pass`); both are finite, one-shot, `both`-filled |
| **Monospace** | 0 |
| **Ambient motion** | 0. A continuous idle shimmer existed in an earlier draft and **was deliberately removed as gratuitous** |

### 4.6 One correction to the shorthand — read this before "removing gradients"

The shorthand list says *"no gradients"*. **The prototype uses `repeating-linear-gradient` four
times, and every one of them is load-bearing.** They are **pattern fills, not colour gradients**:

- a **5px-on / 5px-off dashed pattern** encoding **not measured / unattributed**;
- a **45° hatch** on a square, encoding a state that is not a value.

> **These are honesty devices, not decoration. Do not strip them while "removing gradients."**
> What is prohibited is the **decorative colour gradient** — a wash, a mesh, a glow, a fade used
> as atmosphere. A patterned fill that encodes an epistemic state is required, not tolerated.

## 5. What is NOT binding

These are implementation decisions a later session may change with reasoning, provided §4 holds.

- Exact hex values — **provided the semantic roles and the measured contrast floors survive**.
- Exact type sizes per breakpoint, and the two typefaces (replaceable for a concrete technical or
  licensing reason, provided the display/body role split holds and **no monospace** returns).
- Exact mark counts, lattice density, stagger values and durations, within the ranges in
  `docs/20-creative-convergence/01_MOTION_LANGUAGE.md`.
- Section padding, grid ratios, gutters — provided reading widths survive.
- The composition of any individual secondary page, subject to `02_RESOLVE_MOTION_BUDGET.md`.
- **The prototype's own page composition.** It is a creative-direction prototype, not the approved
  homepage. **No homepage is approved.**

## 6. THE RECORD — unchanged, and subordinate

> **THE RECORD is a CREDIBILITY SYSTEM. It is not the art direction.**

It governs evidence, provenance, measurement, limitations and accountability. It does **not** set
typography, geometry or atmosphere. Evidence supports the commercial experience and never
dominates it.

**MappedSkills must never again read as a journal, textbook, audit report, publication or
document.** That reading is what the owner rejected on sight in Session 15, and it is the drift
this programme has already made once.

## 7. What Sessions 15D and 16 now mean

| | Status |
|---|---|
| **Session 15D — THE ARRIVAL** (`docs/21-creative-convergence-a/`) | **Retained exploration.** Not the active direction. The prototype stays openable and unchanged. It was never wrong work — it was correctly built against a mistaken label |
| **Session 16 — the Arrival design system** (`docs/22-design-system/`) | **Historical / partially reusable.** Its Arrival-specific rules are **superseded**; its direction-independent governance may survive **subject to the audit in `01_SESSION16_AUDIT.md`** |
| **`DEC-017`** | **Retained unchanged** as historical record. Superseded by `DEC-018` for active creative direction only |
| **Sessions 14, 14A, 15, 15B** | Unchanged. Decision trail |

## 8. What this document does not do

It does not create a design system, approve a homepage, pass Gate 10, modify the Session 15C
prototype, or reopen strategy, IA, messaging, copy, the UX architecture or the F1 taxonomy.
**Gate 10 remains NOT PASSED — IN PROGRESS.**
