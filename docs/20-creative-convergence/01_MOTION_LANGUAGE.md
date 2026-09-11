# Motion Language — "THE RESOLVE" — Session 15C — PROPOSED

**Date:** 2026-09-02 · **Prototype:** `prototype/convergence.html`

> **Two easings, four durations, six behaviours. Nothing else in the prototype animates.**
> Every animated property is `transform`, `opacity`, `background-color`, `color` or `width` —
> all compositor- or paint-cheap. There is no canvas, no animation library, no scroll scrubbing
> and no per-frame JavaScript except one throttled `requestAnimationFrame` for the hero's exit.

---

## 1. The two easings

| Token | Curve | Used for |
|---|---|---|
| `--e-state` | `cubic-bezier(.65,0,.35,1)` | A state changes. Symmetrical, decisive, no overshoot |
| `--e-arrive` | `cubic-bezier(.2,.85,.25,1)` | Something arrives. Fast out, settles late |

## 2. The four durations

| Token | Value | Meaning |
|---|---|---|
| `--t-micro` | **180ms** | A control responds to you |
| — | **420–560ms** | An object arrives |
| `--t-state` | **620ms** | The surface changes state |
| `--t-resolve` | **900ms** | The population resolves |

Stagger is **11ms per mark** in the field (modulo 17, so the lattice resolves in waves rather than
as one block) and **90–110ms per row** in the acts.

---

## 3. The six behaviours

| # | Behaviour | What it is | What it means |
|---|---|---|---|
| **1** | **ENTRY** | On load the page opens in traffic; one ripple crosses the lattice at 420ms | Traffic is activity |
| **2** | **THE RESOLVE** | Every mark travels to the object it becomes and fades; the ground inverts; the named objects arrive | The same population, resolved |
| **3** | **STATE CHANGE** | Ground, ink, marks and the H1's rule cross-fade together in 620ms | A change of subject, not a change of styling |
| **4** | **HANDOFF** | The hero's stage drifts up 46px and fades as the reader leaves; a tangerine bar passes across the next band before its line lands | The same demand, followed on |
| **5** | **ON-VIEW RESOLUTION** | Each act resolves once as it is reached; the spine fills to its share | Progression through a system |
| **6** | **REVEAL** | The claim block lifts; the substrate opens; provenance rows resolve 60ms apart | Evidence is what a claim stands on |

**Micro-interactions**, deliberately only two: an action lifts 3px on hover and settles 1px on
press; a control's pressed segment fills with the accent.

---

## 4. Rhythm — stillness is part of the system

The page is **not** in constant motion. Its shape is:

```
CALM (load)  →  EVENT (the resolve, 1.45s)  →  CALM
             →  EVENT (handoff bar passes)  →  CALM
             →  EVENT (act 01 resolves)     →  CALM
             →  EVENT (act 02 resolves)     →  CALM
             →  EVENT (act 03 resolves)     →  CALM
             →  EVENT (five rules drawn, one claim resolves) → CALM
             →  [on demand] EVENT (the claim lifts) → CALM
             →  EVENT (the marks land)      →  CALM
```

**Eight events in a page-length experience, each followed by stillness.** Nothing loops, nothing
idles, nothing is ambient. Once an act has resolved it stays resolved — scrolling back does not
replay it, so the page never nags.

---

## 5. Scroll

- **No scroll hijacking.** No pinned section, no scroll scrubbing, no forced sequence, no waiting.
- Scroll causes **two** things: the hero's stage departs (a throttled `rAF` writing one transform
  and one opacity), and each act resolves the first time it is 40% in view.
- Every CTA is reachable at any moment; nothing is gated behind an animation completing.

---

## 6. Reduced motion

Declared, and it **does not merely freeze**:

- Durations collapse to 1ms and all delays to 0 — every transformation **resolves immediately**.
- The hero does **not** open in traffic and does not auto-resolve; it starts in the enquiries state
  with the lattice removed and the four named objects present.
- The handoff bar is removed rather than played instantly.
- The acts, the boundary's drawn rules, the claim reveal and the CTA marks are all shown complete.
- **The control still works**, so a reduced-motion reader can still see both states — they simply
  swap without a transition.

**No meaning disappears, no navigation is lost, no diagram becomes unreadable.**

---

## 7. Progressive enhancement

With JavaScript disabled (`html:not(.js)`), the lattice is removed, every resolved state is shown,
the evidence substrate is open, and all copy, navigation and actions are present. **Motion is an
amplifier here, never the carrier.**

---

## 8. Production realism

| | |
|---|---|
| **Animated properties** | `transform`, `opacity`, plus token cross-fades on `background-color` / `color`, and one `width` on the spine |
| **Per-frame work** | One throttled `rAF` handler writing two properties on one element, only while the hero is on screen |
| **Elements animated at once** | The hero lattice: 190 (narrow) to **440 (capped)** tiny `<i>` elements, **once**, on a staggered transform+opacity transition. Every other behaviour animates fewer than ten elements |
| **Libraries** | none. ~120 lines of inline vanilla JS |
| **Media** | no video, no canvas, no WebGL, no images, no icon font |
| **Known cost to manage in production** | The lattice is the one thing worth budgeting: it is capped at 440 marks here, build it after first paint, and skip it entirely under reduced motion (already the case). It is a one-off transition, not a running animation, so it has no steady-state cost |
