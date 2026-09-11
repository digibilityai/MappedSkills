# Pattern Inventory — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED

> **This does not invent a new inventory.** The approved Gate 9B inventory
> (`docs/16-ux/49_UX_PATTERN_INVENTORY.md`, `DEC-016`) already defines 14 patterns and 2 regions
> with their content, interaction, responsive, accessibility and evidence requirements. **Those are
> not reopened.** This document gives each one its **visual behaviour and motion allowance** inside
> THE ARRIVAL — nothing more.

**Bounded by construction:** the inventory is the approved 16. **No pattern is added here.** If a
future page needs a seventeenth, that is a UX decision, not a visual one.

---

## 1. The approved patterns, given visual behaviour

| ID | Pattern | Visual behaviour in THE ARRIVAL | Motion allowance |
|---|---|---|---|
| **P1** | Commercial opener | Display H1 + lede + two actions on the primary field. Where the page's subject is the chain, the **hero apparatus** (field + capture line + ledger) is the composition's second column | **1 major event** (the catch) on the homepage; **0** elsewhere. No apparatus on pages whose subject is not the chain |
| **P2** | Capability routing | A routing list on the primary field: one line per capability, grouped by contribution. **Not cards, not a grid, no icons** | Feedback only |
| **P3** | The run wrapper (F1) | The approved figure, drawn in the system's stroke and mark language. See `12_FIGURES.md` | Optional single on-view reveal; **never ambient** |
| **P4** | Evidence disclosure | **The claim, and the substrate beneath it.** Opens by a real control | **1 responsive event.** Substrate lights, rows resolve in sequence |
| **P5** | The limits block | Argument register, full type quality, **always open, never collapsible**. On a raised surface where it is the region's subject | None. **Stillness is mandatory** |
| **P6** | Problem diagnostic | Raised surface, display statement, argument list. May use **departing marks** where the content is a list of things the firm does not do | **1 scroll-triggered event** maximum |
| **P7** | Fit test | Reading region on the primary field. Deliberately the quietest pattern in the system | **None** |
| **P8** | Contact block | Actions on the primary field, or inside the commercial inversion where it is the page's conversion moment | Feedback only |
| **P9** | Metadata-forward entry card | The **one place a card-like container is permitted** — research and article entries. Raised surface, hairline edge, **no shadow, no radius above 4px** | Feedback only. **No ambient, ever** |
| **P10** | Conversion surface | **The commercial inversion.** Full-bleed amber, landed marks, the conversion line, two actions | **1 scroll-triggered event** (the marks land) |
| **P11** | Return-to-decision link | An inline textual action in the accent, underlined on interaction | Feedback only |
| **P12** | Breadcrumb | State-label register — uppercase, tracked, `text-secondary`. Current page in `text-primary` | None |
| **P13** | Figure wrapper | Hairline-edged region on the primary or raised field, caption in `text-secondary`, expandable text equivalent | Inherits the figure's allowance |
| **P14** | Long-form reading scaffold | Reading region at `reading-max` on the primary field, generous space. **No field, no ambient, no metadata margin** | **None** |
| **R1** | Header and primary navigation | See `09_NAVIGATION_AND_ACTIONS.md`. **Non-sticky** | Feedback only |
| **R2** | Footer and entity block | Primary field, hairline top edge, `text-tertiary`. Entity block per the approved architecture | **None** |

---

## 2. Three visual compositions the direction adds

These are **not new patterns** — they are the visual expression the approved UX already calls for,
named so they can be reused consistently.

| Composition | Serves | Rules |
|---|---|---|
| **The hero apparatus** | P1 on pages whose subject is the chain | field + horizon + capture line + ledger + state label. **Homepage only unless a later decision extends it** |
| **The conversion sequence** | The approved capture → convert → measure sequence | field + horizon + up to 3 thresholds + stall/tagged/unattributed markers + a progression rail. **One pinned sequence, homepage only** |
| **The departing list** | P6 and the accountability boundary | Each list item carries a signal mark; on entry the marks travel out of frame while **the words stay at full contrast**. Beside it, the one owned claim on an amber rule |

**The departing list carries a hard rule:** *the marks leave, the words do not fade.* An earlier
draft dropped the words to 34% opacity, pushing approved copy far below readability. **Approved copy
is never dimmed to make a visual point.**

---

## 3. Pattern budget per page

To prevent the site becoming repeated modular blocks:

| | Max distinct patterns | Max repeats of any one pattern |
|---|---|---|
| Homepage | **9** | 2 |
| Service / commercial page | **7** | 2 |
| Editorial / research | **5** | unlimited for P9 in a listing |
| Utility (`/thank-you`, legal, 404) | **3** | 1 |

**A page that needs more patterns than this is usually a page that needs less content, or two
pages.**

---

## 4. Prohibited pattern behaviour

- **No pattern repeats its signature motion in every section.** A signature used more than twice on
  one page is a tic.
- **No card grid.** P9 is the only card-like pattern and it exists for one content type.
- **No feature-card repetition**, no bento, no icon-plus-title-plus-two-lines block anywhere.
- **No pattern may introduce a new colour, a new type role, or a new motion behaviour.** If it
  needs one, it is not a pattern — it is a direction change.
- **No pattern carries evidence apparatus into a conversion region.** Carried unchanged from the
  approved CRO rules.
