# Motion Language and Budget — Session 15D — PROPOSED

**Date:** 2026-09-03 · **Prototype:** `prototype/convergence-a.html`

> Session 15C correctly identified **repetition** as the unsolved risk and did not solve it.
> **This document solves it with stated numbers.**

---

## 1. The five motion types

| # | Type | What it is | Where it is allowed |
|---|---|---|---|
| **1** | **AMBIENT** | The signal field running. It exists to say *demand is happening whether or not you are watching* | **Very sparingly.** Two regions on the homepage; **zero** on secondary pages |
| **2** | **RESPONSIVE** | The system answers a deliberate action | The catch control; the evidence control |
| **3** | **TRANSFORMATIONAL** | A commercial state visibly changes — a signal is caught, stalls, or gains a source | The hero catch; the three beats; the boundary pass-through |
| **4** | **SCROLL-TRIGGERED** | A new part of the argument becomes active | Each beat, once; the seam; the boundary; the CTA landing |
| **5** | **FEEDBACK** | A control acknowledges input | Buttons, links, focus |

## 2. Two easings, four durations. Nothing else.

| Token | Value | Used for |
|---|---|---|
| `--e-move` | `cubic-bezier(.22,.85,.24,1)` | something travels or arrives |
| `--e-state` | `cubic-bezier(.62,0,.3,1)` | a state changes |
| `--t-fb` | **160ms** | feedback |
| `--t-state` | **520ms** | a state change |
| `--t-move` | **760ms** | an arrival |
| `--t-big` | **1100ms** | a structural draw (the capture line; a signal departing) |

---

## 3. THE BUDGET — stated as numbers so it can be checked

| Budget | Homepage | Commercial / service page | Editorial, research, legal |
|---|---|---|---|
| **Ambient regions** *(a field that runs on its own)* | **max 2** | **max 1** | **0** |
| **Major motion events** *(a transformation the reader will notice)* | **max 5** | **max 2** | **max 1** |
| **Signature interactions** *(a control that re-runs the system)* | **max 2** | **max 1** | **0** |
| **Full-colour events** *(the amber surface)* | **1** | **1** | **0 or 1** |
| **Scroll-pinned sequences** | **max 1** | **0** | **0** |
| **Distinct motion behaviours in the whole system** | **6** | inherited, never extended | inherited |

### 3.1 What the homepage prototype actually spends

| | Count | Budget | |
|---|---|---|---|
| Ambient regions | **2** — the hero field, the sequence field | 2 | at budget |
| Major motion events | **5** — the catch · the seam sweep · the three-beat sequence · the boundary pass-through · the CTA landing | 5 | at budget |
| Signature interactions | **2** — *Run it again* · *Light it from beneath* | 2 | at budget |
| Full-colour events | **1** — the CTA panel | 1 | at budget |
| Pinned sequences | **1** — capture/convert/measure | 1 | at budget |
| Distinct behaviours | **6** | 6 | at budget |

### 3.2 Where stillness is MANDATORY

- **The reading columns** — the boundary's three approved paragraphs and the evidence rows do not
  move once revealed.
- **After a resolution.** The hero field drops to **28%** once the ledger is full; the sequence
  field drops to **55%** at the measure beat. A resolved system is a quiet system.
- **Off screen.** Both fields **stop entirely** — `IntersectionObserver` cancels the animation
  frame. Nothing runs where nobody is looking.
- **The footer and all legal/utility regions.**
- **Once an act has resolved it stays resolved.** Scrolling back does not replay anything.

### 3.3 How secondary pages get quieter

Secondary pages **inherit the language and do not replay the show**:
- the palette, the type, the mark vocabulary and the six drawn states are identical;
- **the field appears as a single composed still** — the same drawing, not running;
- **one** major motion event maximum, and it is the evidence reveal if the page has a claim;
- no pinned sequence, no catch interaction, no ambient region.

**The homepage is the only page that gets the full expression.** That is the rule this session
exists to write.

---

## 4. Rhythm — anticipation and release

```
CALM (load)
  → EVENT  the capture line draws, the catch begins (~1.2s)
  → RELEASE  four arrivals, one at a time
  → STILLNESS  the field calms to 28%
  → EVENT  the seam sweeps
  → STILLNESS
  → EVENT  beat 01, then 02 (thresholds appear, stalls become visible)
  → EVENT  beat 03 (survivors gain a source) → field calms to 55%
  → STILLNESS
  → EVENT  five signals depart, one commitment resolves
  → STILLNESS  three paragraphs, entirely static
  → [on demand] EVENT  the claim is lit from beneath
  → STILLNESS
  → EVENT  the arrivals land on amber
  → STILLNESS  footer
```

**Five major events across a page-length read, each followed by stillness.** Nothing loops.
Nothing is decorative. The field never runs "just for atmosphere" — it runs where demand is the
subject, and it calms as soon as the point is made.

---

## 5. Scroll

- **No scroll hijacking.** One pinned sequence, 300vh, and the reader can leave at any time.
- Nothing waits for an animation to finish; every action is reachable throughout.
- Scroll causes exactly two things: the beat changes (three times), and on-view reveals fire once.
- The beat handler is `requestAnimationFrame`-throttled and does nothing when the beat is unchanged.

---

## 6. Reduced motion

Declared in CSS **and** in JavaScript, and it does not merely freeze:

- Every transition collapses to 1ms and all delays to 0 — states **resolve immediately**.
- Both fields draw **one composed still frame** (`still()`): signals distributed across the plane,
  the horizon drawn, the thresholds shown at their final beat. **The diagram is complete and
  readable, not blank.**
- The hero ledger is shown **fully populated** with all four named kinds.
- The pinned sequence **unpins** — `.rail` height becomes auto and the stage becomes static.
- The seam sweep is removed rather than played instantly.
- The boundary's departing marks stay in place at full opacity; the commitment is visible.
- **The controls still work.** *Run it again* repopulates instantly; the evidence still opens.

**No meaning is lost, no navigation disappears, and no diagram becomes unreadable.**

## 7. Progressive enhancement

With JavaScript off (`html:not(.js)`) the pinned sequence unpins, every state is shown resolved,
the evidence substrate is open, and all copy, navigation and actions are present. **Verified
structurally in the browser** — see `02_RESPONSIVE_ACCESSIBILITY_PERFORMANCE.md` §4.
