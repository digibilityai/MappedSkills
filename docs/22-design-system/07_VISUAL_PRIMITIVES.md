# Visual Primitives — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED

> **These are design semantics, not a component list.** Do not create a React component for every
> visual noun here. Several are drawing behaviours inside one canvas; several are CSS on ordinary
> elements. The implementation shape is a Gate 13/14 decision.

---

## 1. The twelve primitives

| # | Primitive | What it is | Where it may appear |
|---|---|---|---|
| 1 | **Signal field** | A masked band of travelling light on the dark ground | Only where demand/capture/conversion/measurement is the subject. **Budgeted** (`06` §3) |
| 2 | **Horizon** | A very faint full-width line at the field's centre | Wherever a field appears. It is what makes the field a *plane* rather than a scatter |
| 3 | **Capture line** | A 2px amber vertical rule that draws itself down | Once per field. It is where demand becomes commercially meaningful |
| 4 | **Threshold** | A thin light column with a soft vertical falloff, plus a text label | The conversion sequence. **Max 3 per field** |
| 5 | **Arrival ledger** | A stack of named rows: mark + fixed-length bar + label | Beside a capture line. **Rows are identical in length** (`05` §1) |
| 6 | **Stall marker** | An open square drawn where a signal stopped | Only at a threshold |
| 7 | **Tagged marker** | A solid amber head on a streak | Only past a measurement threshold |
| 8 | **Unattributed marker** | An open or dashed square, never amber | Anywhere an arrival has no usable trail |
| 9 | **Evidence substrate** | The surface *beneath* a claim, lit with a warm falloff | Only under a claim being inspected. **Max 2 per page** |
| 10 | **Commercial inversion** | A full-bleed amber surface with dark ink | The conversion moment. **Exactly 1 per page** |
| 11 | **Visual seam** | A thin band where an amber rule **passes across** and a single line lands | Between major movements. **Max 2 per page** |
| 12 | **State label** | Uppercase, tracked, 0.8rem, in the interface face | Orientation metadata. **Never monospace** |

---

## 2. The rule that keeps the field a composition

> **The signal field must participate in the composition. It is never a background behind a
> headline and two buttons.**

Concretely, at least **two** of these must be true wherever a field appears:

- The field's **band is bounded by real layout** — it starts where a text region ends and ends at
  an apparatus.
- The field is **masked** so it emerges from the content rather than sitting on it.
- A **capture line or threshold is a layout element** — a column edge, a rule the grid respects.
- The **arrival ledger is a column of the page grid**, not an overlay.
- The **copy is upstream of the transformation**, so the reader's eye travels the same path the
  signals do.

**In the approved prototype all five hold**: the field runs between the supporting copy and the
capture apparatus, masked left-to-right, with the ledger as the hero's right-hand column.

---

## 3. Primitive detail

### 3.1 Signal field
- **A band, not a viewport.** Centre-weighted vertical distribution with soft top and bottom
  falloff, so it reads as a designed plane.
- **Streaks, not dots.** A dot field is a starfield; a streak has direction and therefore meaning.
- **One axis per field.** Signals travel one way. Cross-traffic is noise.
- **Density is a constant**, never a variable carrying meaning.
- **Calm state required** — the field reduces once its point is made.
- **Off-screen pause** is mandatory.
- **Reduced motion:** one composed still.
- **Prohibited:** as page background · behind reading text · in chrome · as a loader or page
  transition · more than one field visible at once.

### 3.2 Horizon
A ~10% opacity line at the band's centre, fading at both ends. **Cheap, and it does more than
anything else to stop the field reading as a particle demo.** Present wherever a field is.

### 3.3 Capture line
Amber, 2px, drawn top-to-bottom on entry over ~1.1s. **One per field.** It is a composition element
— content aligns to it. It is never decorative and never appears without a ledger beside it.

### 3.4 Threshold
A thin vertical light column with a gradient falloff and an uppercase text label. Brightens when the
argument reaches it. **Never drawn as a gate, a door, a funnel neck or a machine part.**

### 3.5 Arrival ledger
Rows of *mark · fixed-length bar · label*. **Every bar is the same length** — they name kinds. Rows
arrive one at a time, **paced ~1s apart**. Every row is named; an unnamed arrival is meaningless.
At least one row in any full ledger should be the **unattributed** state, because that is the
honest case.

### 3.6 Evidence substrate
The ground **under** a claim, lit with a warm amber falloff from the top edge. **No border, no
radius, no shadow, no card.** It opens by a real control, and it is where provenance and limitations
live. **Max 2 per page.**

### 3.7 Commercial inversion
Full-bleed amber, ground colour as ink. **Exactly one per page, at the conversion moment.** The
arrivals land on it. It is the only full-colour surface in the system.

### 3.8 Visual seam
A thin band in which an amber rule **passes across** (left→right→out, ~1.1s) and one line of type
lands after it. It **passes through**; it does not park. *(A seam that parks on amber hid its own
accent text — a real defect found by rendering.)*

---

## 4. Prohibited primitives

Cards as a general container · icons of any kind · gradient blobs, meshes, orbs, glows ·
glassmorphism · bento grids · fake dashboards, gauges, axes or legends · funnels and tapers of any
kind · pipelines with boxes and arrows · circuit, node-graph, brain or Matrix motifs · starfields ·
3D objects · stock photography · abstract "innovation" illustration · parallax · cursor effects ·
page-transition animations.

---

## 5. Composition patterns these primitives support

| Pattern | Primitives |
|---|---|
| **Hero apparatus** | field + horizon + capture line + ledger + state label |
| **Conversion sequence** | field + horizon + thresholds + stall/tagged/unattributed markers + progression rail |
| **Commercial argument** | raised surface + departing marks + one owned claim on an amber rule |
| **Evidence moment** | claim + evidence substrate + status marks |
| **Conversion moment** | commercial inversion + landed marks |
| **Region handoff** | visual seam |

**Six compositions from twelve primitives.** If a seventh is needed, it is a design decision worth
recording — not a new primitive invented in passing.
