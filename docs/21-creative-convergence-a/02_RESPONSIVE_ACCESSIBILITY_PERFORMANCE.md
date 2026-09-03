# Responsive, Accessibility and Performance — Session 15D — PROPOSED

**Date:** 2026-09-03 · **Prototype:** `prototype/convergence-a.html`
**Everything below was rendered and measured in a browser at 1440×900 and 390×844.**

---

## 1. Responsive

| | **WIDE — 1440×900** | **NARROW — 390×844** |
|---|---|---|
| Document scroll width | **1425** | **390** |
| **Horizontal body overflow** | **none** | **none** |
| Elements exceeding the viewport | **0** | **0** |
| Hero | H1 full width, then a two-column row: copy + actions left, the capture apparatus right; the field runs between them into the capture line | Single column: H1, copy, both actions, then the capture apparatus with its amber line down the left |
| **The field** | 78 signals, centre-weighted across the full row, masked left-to-right so it emerges from the copy | **30 signals**, recomposed into a **tight horizontal band** (`midN 0.52`, `spreadN 0.085`) that feeds the ledger, at 50% opacity so labels stay clean |
| Sequence field | 92 signals, banded, three thresholds | **34 signals**, wider band (`spreadN 0.17`) so the thresholds still read on a narrow plane |
| The three beats | Pinned, 300vh | Pinned, 300vh; step rail stacks vertically |
| Boundary | Two columns — five refusals left, the commitment right | Stacked; the departing marks travel a shorter distance (`clamp(140px,22vw,340px)`) so they still leave the frame |
| Evidence | Claim, then illuminated substrate | Identical behaviour, full width |
| CTA | Four landing marks at 20px, then headline and actions | Marks at 15px, same sequence |

**This is a recomposition, not a stack.** The narrow field is a different drawing — a band that
feeds the ledger — rather than the wide field with fewer particles.

---

## 2. Accessibility — measured

### 2.1 Contrast

**Element-level sweep, 73 text-bearing elements, at both widths: 0 elements below the WCAG
threshold, 0 rendered text under 12px.**

Token pairs, computed directly:

| Pair | Ratio | |
|---|---|---|
| `--bone` on `--void` — body and display | **17.36** | AAA |
| `--bone-2` on `--void` — secondary | **8.69** | AAA |
| `--bone-4` on `--void` — small recessive text | **6.58** | AA / AAA large |
| `--bone-3` on `--void` — **display type and shapes only** | **4.28** | AA large only |
| `--amber` on `--void` — accent text, links, focus ring | **8.43** | AAA |
| `--bone` on `--void-2` — lifted surface | **16.39** | AAA |
| `--bone-2` on `--void-2` | **8.20** | AAA |
| `--amber` on `--void-2` | **7.96** | AAA |
| `--void` on `--amber` — the CTA panel | **8.43** | AAA |
| CTA body `#3D1E00` on amber | **6.43** | AA |

**One contrast defect was found by measuring and fixed:** `--bone-3` (4.28:1) was being used for
the inactive step labels and the footer at 12.8–14.4px. A separate token, **`--bone-4 #9C938A`
(6.58:1)**, was added for small recessive text; `--bone-3` is now restricted to **display type**
(where 3:1 applies) and to **drawn shapes**, exactly as the earlier sessions restricted their
recessive stroke.

### 2.2 Verified in the browser

| Check | Result |
|---|---|
| **Focus indicator** | **3px solid amber at 3px offset, `:focus-visible` matched, and visible in the render** on the *Run it again* control |
| Keyboard | Skip link first; every link and button is a real `<a>` or `<button>`; the two controls carry `aria-expanded` / are plain buttons with text labels |
| **Colour-only meaning** | **None.** *Unattributed* and *not measured* are **open or dashed squares** with their own words; *caught* is a filled square. Removing colour loses nothing |
| Hover-only content | **None.** Nothing is revealed by hover |
| Rendered text under 12px | **0** |
| Horizontal overflow | **none at either width** |
| `<img>` / icon fonts | **0** |
| `position: fixed` elements | **0** |
| **Monospace elements** | **0** — the technical register is absent by rule |
| Landmarks | one `<main>`, one labelled `<nav>`, `<footer>`, `lang="en-IN"`, heading order H1 → H2 → H3 with no skipped level |
| Canvas accessibility | Both canvases are `aria-hidden="true"`; **every meaning they carry is also stated in text** — the ledger names, the beat copy and the standing "kinds, not counts" note |

### 2.3 Reduced motion and no-JavaScript — verified structurally

The reduced-motion rules and the `html:not(.js)` fallback were **exercised in the browser** by
applying the block and removing the `js` class, then measuring geometry rather than trusting
opacity:

| | Result |
|---|---|
| Pinned sequence | **unpins** — `.rail` collapses from 300vh to 389px, `.stage` becomes `position: relative` |
| Hero ledger rows | present with real geometry (694 × 20) |
| The commitment block | present (682 × 191) |
| Seam heading | present (517 × 57) |
| Evidence substrate | **all 6 provenance rows present and open** (1246 × 51 each) |
| CTA landing marks | present (20 × 20) |
| Horizontal overflow | none |

**Nothing disappears in either fallback.** The OS-level `prefers-reduced-motion` preference itself
was **not** toggled in this session, so this is **reviewed and structurally exercised, not fully
tested**.

### 2.4 Not tested, and not claimed

Screen readers · real devices · touch hardware · browsers other than the rendering engine used
here · print · text resize to 200% · **any user testing whatsoever.**

### 2.5 Measurement caveat, recorded so the numbers can be trusted

This browser environment returns **stale computed styles** after an attribute- or class-driven
change while its tab is backgrounded, and it throttles `requestAnimationFrame`. Several apparent
failures in earlier sessions were traced to that. Every number above was therefore taken either
**after a forced repaint on a settled state**, **from geometry** (`getBoundingClientRect`), or
**computed directly from the tokens** with no DOM involved. Where the field's motion could not be
observed live, it was advanced deterministically through an exposed `step()` and inspected frame
by frame.

---

## 3. Performance

**A is inherently more performance-sensitive than B, and that was treated seriously.**

| | |
|---|---|
| **Rendering technique** | 2D canvas for the two fields; **CSS transforms and opacity for everything else** |
| **WebGL / 3D** | **none** |
| **Video / images** | **none** |
| **Animation libraries** | **none.** ~170 lines of inline vanilla JavaScript |
| **DOM animated at once** | fewer than ten elements in any single event |

### 3.1 The signal budget, as implemented

| | Wide (≥1200) | Mid (720–1199) | **Narrow (<720)** |
|---|---|---|---|
| Hero field | **78** | 55 | **30** |
| Sequence field | **92** | 64 | **34** |
| **Total live signals** | **170** | 119 | **64** |

Each signal is a single gradient-filled 1.5px rectangle — no shadows, no blurs, no compositing
tricks. The budget is applied on every resize.

### 3.2 The five performance rules, all implemented

1. **Off-screen pause.** `IntersectionObserver` cancels `requestAnimationFrame` when a field leaves
   the viewport and restarts it when it returns. **Nothing runs where nobody is looking.**
2. **Mobile budget.** Signal counts drop to 64 total below 720px.
3. **Calm states.** The hero drops to 28% speed once resolved; the sequence to 55% at the measure
   beat. A resolved field is doing a fraction of the work.
4. **Reduced motion.** `requestAnimationFrame` is never started; **one still frame is drawn and the
   loop never runs.**
5. **Low-power fallback.** The same path as reduced motion: the composed still. *(Stated as the
   intended production behaviour — a device-level low-power signal was not detected in the
   prototype, and that is an implementation item, not a design one.)*

### 3.3 Production notes

- Self-host the two variable webfonts and subset them; the prototype uses Google Fonts for
  convenience.
- Build the canvases after first paint; neither is needed for LCP.
- The concept does **not** require WebGL, a framework, or hundreds of objects. The energy comes
  from *what the signals do*, not from how many there are.
