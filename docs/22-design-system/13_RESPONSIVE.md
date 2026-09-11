# Responsive System — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED

> **Behaviour is specified; the numbers are an implementation output.** The approved UX validates
> responsive behaviour through **structural width classes — NARROW, MEDIUM, WIDE** — and exact
> breakpoint values remain a deliberately deferred decision (`DEC-016`). This document keeps that
> convention.

> ### **NARROW IS NOT DESKTOP STACKED VERTICALLY.**
> Where a region's meaning depends on a spatial relationship, NARROW gets **a different drawing**,
> not a smaller one.

---

## 1. The three width classes

| Class | Roughly | Character |
|---|---|---|
| **WIDE** | large laptop and up | The full expression. Split regions, the horizontal field, the full apparatus |
| **MEDIUM** | tablet and small laptop | Structure preserved, split regions may collapse, density reduced |
| **NARROW** | phone | **Recomposed.** Single column, banded field, reduced motion density |

**Prototype evidence:** verified at **1440×900** and **390×844**, with no horizontal overflow at
either. MEDIUM behaviour is specified below but **has not been rendered for this direction** — that
is an outstanding validation item.

---

## 2. What changes, by system

### 2.1 Signal density
| | WIDE | MEDIUM | NARROW |
|---|---|---|---|
| Hero field | 78 | ~55 | **30** |
| Sequence field | 92 | ~64 | **34** |
| **Total live signals** | **170** | ~119 | **64** |

The budget is applied on every resize. **These are prototype figures, not production limits** —
see `14` §3.

### 2.2 Motion density
- **NARROW reduces motion density without removing the creative idea.** Fewer signals, shorter
  travel, lower field opacity.
- **A timed reveal that sits below the fold becomes an on-view reveal.** *(The hero's catch fires
  on a timer at WIDE, where the apparatus is on the first screen, and on view at NARROW, where it
  is not. A moment played to an empty screen is not a moment.)*
- **The motion budget does not change by width.** The maximums are per page, not per viewport.

### 2.3 The visual stage — recomposition
This is the rule that distinguishes recomposition from stacking:

| | WIDE | NARROW |
|---|---|---|
| Field | Centre-weighted across the whole region, masked left-to-right so it emerges from the copy | **A tight horizontal band** positioned immediately above the apparatus it feeds, at reduced opacity so labels stay clean |
| Capture line | A vertical rule at the right column's edge | A vertical rule down the **left** of the stacked apparatus |
| Ledger | The hero's right-hand column | A full-width stack beneath the actions |
| Thresholds | Three across the field's width | The same three, on a **wider band** so they still read on a narrow plane |

### 2.4 Type
Fluid within its range; **hierarchy never inverts; body never scales below its floor**; display
reaches its maximum only at WIDE; ledes may compress toward body size but never below it; labels do
not scale. See `03` §4.

### 2.5 Layout
Split regions become one column in the same reading order · multi-column detail collapses to one ·
gutters shrink to their minimum · reading measure is preserved · the inversion is unchanged.

### 2.6 CTA
Both actions remain **above the fold at NARROW** — verified. They stack full-width with real
spacing. The header's primary control moves to its own row rather than being shortened or hidden.
**Nothing is removed for space.**

### 2.7 Evidence
Identical behaviour at every width — the claim, the control, the substrate. Rows reflow to a single
column at NARROW with the term above its description. **Nothing is truncated, collapsed further, or
moved to a footer.**

### 2.8 Navigation
WIDE: six items inline plus the primary control. NARROW: a two-row bar and a disclosure panel
carrying **all six items, all children and the primary control**. See `09` §1.2.

### 2.9 Figures
**Recompose, never scale.** Below the width a horizontal drawing needs, it is replaced by its
genuine vertical form. Labels stay at the body minimum at every width. See `12` §4.

### 2.10 Reading widths
`reading-max` 56–60ch and `lede-max` 40–44ch hold at every width; at NARROW the gutter, not the
measure, is what gives way.

---

## 3. Binding responsive rules

1. **No horizontal body overflow at any width.** Verified at 1440 and 390; must be re-verified on
   every new page.
2. **Nothing is removed for space.** Navigation, evidence, limitations and actions are complete at
   every width.
3. **Where meaning is spatial, NARROW gets a different drawing.**
4. **Touch targets ≥ 44px** with real spacing.
5. **Timed moments below the fold become on-view moments.**
6. **The reading order is identical at every width**, and DOM order is claim-then-evidence
   everywhere.

---

## 4. Outstanding validation

- **MEDIUM has not been rendered** for this direction. Specified, not verified.
- **No real device has been used** — only emulated viewports.
- **Landscape phone, foldables and very wide displays** are unassessed.
- **Text resize to 200%** is untested.
