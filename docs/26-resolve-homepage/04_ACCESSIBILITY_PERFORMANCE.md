# THE RESOLVE — Complete Homepage — Accessibility and Performance

**Session:** 18 · **Date:** 2026-09-03 · **Status:** PROPOSED. Gate 10 NOT PASSED.

Everything below was **measured on the rendered page**, not asserted.

---

## 1. Colour contrast — audited, and three failures fixed

A sweep of **129 rendered text nodes** plus all SVG figure text plus the figure's graphical
objects, computing each element's ratio against its true painted background.

**Result: 0 text failures, 0 SVG text failures.**

### Failures found and fixed

| # | Element | Was | Needed | Fix |
|---|---|---:|---:|---|
| 1 | The chapter numeral (01/02/03), 122px | **1.30:1** | 3:1 | It started in `--line` and only became tangerine if a cascade override fired. Made `--tang-ink` unconditionally — it is the chapter number and has no reason to start invisible |
| 2 | *"It is a poor fit where"* heading, 13px | **3.13:1** | 4.5:1 | `--gapc` → `--dim` |
| 3 | *"we do not promise"* label, 13px | **3.13:1** | 4.5:1 | `--gapc` → `--dim` |
| 4 | The prototype note on the dark footer, 14px | **4.32:1** | 4.5:1 | `#7E7789` → `#9C95A8` |

**`--gapc` (`#8E8798`) is now used only for non-text graphical objects and pattern fills**, where
it measures **3.13:1** and clears the 3:1 non-text floor. It is no longer used for any small text.

### The figure's graphical objects (WCAG 1.4.11, 3:1 floor)

| Object | Ratio |
|---|---:|
| Chain, points, boundary rule, client-data double line (`--ink`) | **16.80:1** |
| The qualified-enquiry point and the intervention ticks (`--tang-ink`) | **3.97:1** |
| The unattached arrival and the dashed unmeasured stretches (`--gapc`) | **3.13:1** |

**`--tang` (`#FF5B04`) measures 2.81:1 on ivory and is therefore never used for a graphical object
or text on a light ground** — only as a fill on dark grounds and in the tangerine close region.
The three-step ramp exists because of contrast, not taste, and it is preserved.

## 2. Structure

| Check | Result |
|---|---|
| `<h1>` count | **1** |
| Heading level jumps | **0** — one H2→H4 jump was found in the evidence block and fixed |
| Heading-only navigation | Delivers **the approved block headings in approved order** |
| Landmarks | `header`, `main`, `footer`, `nav[aria-label="Primary"]` |
| Skip link | Present, first in tab order, targets `#main` |
| `lang` | `en-IN` |
| Text rendered as an image | **0** — zero `<img>`, zero canvas |
| Figure alternatives | 3 SVG `<title>` + 3 `<desc>`, each giving the six points in order, which stretches are unmeasured, where accountability begins and ends, which segment is the client's, and that one arrival has no upstream segment |

**A structural change made for accessibility.** The approved block headings were originally set as
`<span class="lab">` eyebrows with a large display line as the `<h2>`. They are now the real
`<h2>` elements, and the display lines beneath them are approved body copy set at scale. Heading-only
navigation now delivers the argument, which is the approved skip mechanism (`04_HOMEPAGE_UX.md` §9).

## 3. Reduced motion — verified by rendering it

**Reduced motion does not freeze; it resolves.** Verified at both 1440 and 390:

- The page opens **already resolved**; the lattice is `display:none` and is never built.
- All four named hero objects present. **The signature control still works** — states swap with no
  transition (confirmed: clicking *Traffic* changes the state).
- All 23 reveal elements composed. The re-read **rests on reading 03** with all six rows present.
- **The friction alignment is composed, not animated**: at 1440 all three outcomes measure to
  `right: 1364px`, identical to the outcome rule. The alignment is a layout fact, not an animation.
- F1 is at full scale, fully drawn, with the boundary and the Block 4 state present.
- The close marks are present.

**No meaning disappears, no navigation is lost, no figure becomes unreadable.**

## 4. No JavaScript — verified by rendering it

Tested by serving the page with the script removed, so `html` never receives `.js`.

| Check | Result |
|---|---|
| Reveal elements visible | **23/23** |
| Hero named objects | **4/4**, lattice removed, control hidden (it would do nothing) |
| The re-read | **6/6 rows, and all 18 labels visible** — every one of the three readings is readable as text, each prefixed with its reading name |
| F1 | Fully drawn, `stroke-dashoffset: 0`, boundary and Block 4 state present |
| Evidence substrate | **Open**, all six provenance rows visible, the toggle hidden |
| Navigation | Every destination reachable; the mobile sub-menu is unhidden (a gap found and fixed) |
| Close marks | **5/5** |
| Horizontal overflow | none |

## 5. A light-first defect found and fixed

The page carried no `color-scheme` declaration, so a browser in **forced/auto dark mode inverted
the entire design** — which destroys the direction, because the dark hero stage is a *counted
inversion inside a light page* and carries meaning. Fixed with `<meta name="color-scheme"
content="light">` and `html{color-scheme:light}`.

**This would have shipped invisible.** It only appeared because the preview surface happened to be
in dark mode.

## 6. Performance

| Metric | Measured |
|---|---|
| DOM nodes | **1,036** total — **440 of them are the lattice**, built after first paint and never built at all under reduced motion |
| Scripts | **1**, inline, no libraries, no framework, no polyfill |
| External requests | **1** stylesheet (Google Fonts) |
| Images / video / canvas / WebGL | **0** |
| Looping animations | **0** |
| Scroll handlers | **1**, rAF-throttled, writing two properties, and disabled under reduced motion |
| `IntersectionObserver` instances | 8, each unobserving its target on first hit |

**The lattice is the only item worth budgeting.** It is a **one-off transition, not a running
animation** — up to 440 elements resolving once on a staggered `transform` + `opacity` transition,
with no steady-state cost. It is built after the state is set, capped at 440, and skipped entirely
under reduced motion.

**Not yet done, and required before implementation:** profiling on real hardware, and a Core Web
Vitals measurement. The cap is evidence from the direction prototype, **not a production limit**.
Font loading is `display=swap` from Google Fonts; production should self-host and subset.

---

# SESSION 18A UPDATE — regression run after refinement

**Date:** 2026-09-03. Every Session 18 check was re-run on the refined page at WIDE and NARROW.

## No regressions

| Check | WIDE (1425) | NARROW (390) |
|---|---|---|
| Text nodes checked | **129** | **121** |
| **Contrast failures** | **0** | **0** |
| SVG text failures | **0** | **0** |
| Heading level jumps | **0** | **0** |
| `<h1>` count | 1 | 1 |
| `<h4>` count | 0 | 0 |
| Touch targets < 40px | — | **0** |
| Horizontal overflow | **none** | **none** |
| `position: fixed` / `sticky` | **0** | **0** |
| `infinite` animations | **0** | **0** |
| `<img>` / `<canvas>` | 0 / 0 | 0 / 0 |
| Scripts | 1 | 1 |

## The new material, audited

| New element | Check | Result |
|---|---|---|
| Intervention map — marked stretch | non-text graphical, 3:1 floor | `--tang-ink` on ivory, **3.97:1** |
| Intervention map — "here" / "all of it" label | small text, 4.5:1 | `--tang-sm`, **passes** |
| Intervention map — recessive chain and points | decorative-adjacent, but informational | `--ink` at 34% opacity; the marked stretch and active points carry the meaning at full strength |
| Intervention map — accessible name | `role="img"` + `<title>` | Each of the three states where its group acts in words |
| The admission at 86px | large text, 3:1 | **16.8:1** |
| Boundary and fit state marks | non-text graphical | `--tang-ink` **3.97:1**, `--gapc` **3.13:1** — both clear 3:1 |

## Reduced motion — re-verified by rendering it

Composed at 390px including all new material: page opens resolved, lattice `display:none`, all four
hero objects present, **the signature control still works** (clicking *Traffic* changes the state),
23/23 reveals composed, the re-read rests on reading 03, F1 at full scale and fully drawn with the
Block 4 state, **the three intervention maps render their marked stretches at 28 / 172 / 287px**,
the friction outcomes are aligned at 370px with their ticks shown, and the close marks are present.

## No JavaScript — re-verified by rendering it

23/23 reveals, 4/4 hero objects, 6/6 re-read rows with **all 18 labels readable**, F1 fully drawn,
**3/3 intervention maps with 11 active points**, the admission, the fit marks, 5/5 boundary items,
the friction alignment with its ticks and caption, the evidence substrate open, 5/5 close marks,
and **15 navigation links in the mobile panel**.

**The intervention maps need no script at all** — the visual progression is pure composition.

## Performance after refinement

| Metric | Session 18 | **Session 18A** |
|---|---:|---:|
| DOM nodes, WIDE | 1,036 | **1,078** |
| DOM nodes, NARROW | — | **848** |
| Scripts | 1 | **1** |
| External requests | 1 (fonts) | **1** |
| Images / canvas / WebGL / video | 0 | **0** |
| `@keyframes` blocks | 2 | **1** *(the wipe's `pass` was removed with it)* |

The three intervention maps are **inline SVG totalling 33 elements** and cost **no measurable
height** (1,750px → 1,740px). One `@keyframes` block was deleted along with the cut transition.

**Still outstanding, unchanged from Session 18:** real-hardware profiling, a Core Web Vitals
measurement, a cross-browser pass (Chromium only), and a screen-reader pass.

---

# SESSION 18B UPDATE — regression run after compression

**Date:** 2026-09-03.

| Check | WIDE (1425) | NARROW (390) |
|---|---|---|
| Text nodes checked | 91 | 83 |
| **Contrast failures** | **0** | **0** |
| SVG text failures | **0** | **0** |
| Heading level jumps | **0** | **0** |
| `<h1>` / `<h4>` | 1 / 0 | 1 / 0 |
| Touch targets < 40px | — | **0** |
| Horizontal overflow | none | none |
| `fixed` / `sticky` / `infinite` | 0 / 0 / 0 | 0 / 0 / 0 |
| `<img>` / `<canvas>` | 0 / 0 | 0 / 0 |

**One contrast failure was found and fixed:** the unselected stage numerals at **3.13:1** in
`--gapc`, moved to `--dim`. `--gapc` remains restricted to non-text graphical objects.

## The system view's accessibility

- The stages are a **tablist**: `role="tablist"` / `role="tab"` / `aria-selected` / `aria-controls`,
  operable by click **and by arrow key with focus following** (verified by driving both).
- **The chain is complete and static from first paint.** Nothing in it is revealed only by
  interaction; the stages change *emphasis*, never content.
- The three drawings carry `role="img"` with `<title>` and a `<desc>` that states the six points in
  order, which stretches are unmeasured, where accountability begins and ends, which segment is the
  client's, that one arrival has no upstream segment, and what each stage marks.
- **Every capability link is 40px minimum** at narrow.

## Reduced motion — re-verified by rendering it

The page opens resolved, the lattice is `display:none`, all four hero objects are present, **both
controls still work**, the friction outcomes are aligned, the chain is at full scale and fully
drawn — and **all three stages compose open** (panel heights 156 / 108 / 132), so no deeper-page
route sits behind an interaction.

## No JavaScript — re-verified by rendering it

20/20 reveals, 4/4 hero objects, **all three stages open, 7/7 capability links reachable**, the
chain fully drawn at full scale, the friction alignment with its ticks and caption, the five
boundary items, the admission, the evidence substrate open with its toggle hidden, both check
links, 5/5 close marks, and 15 navigation links in the mobile panel.

## Performance

| Metric | 18A | **18B** |
|---|---:|---:|
| DOM nodes, WIDE | 1,078 | **895** |
| Scripts | 1 | **1** |
| External requests | 1 | **1** |
| `@keyframes` blocks | 1 | **1** |
| Images / canvas / WebGL / video | 0 | **0** |

**Still outstanding, unchanged:** real-hardware profiling, Core Web Vitals, a cross-browser pass
(Chromium only), and a screen-reader pass.

---

# SESSION 18C UPDATE — regression run after the mobile pass

**Date:** 2026-09-03. Run at 360, 390, 430, 845 and 1425.

| Check | 390 | 360 | 430 | 1425 |
|---|---|---|---|---|
| Text nodes checked | 78 | 78 | 78 | 91 |
| **Contrast failures** | **0** | **0** | **0** | **0** |
| SVG text failures | **0** | — | — | **0** |
| Touch targets < 40px | **0** | **0** | **0** | — |
| Horizontal overflow | none | none | none | none |
| Heading jumps / `<h1>` / `<h4>` | 0 / 1 / 0 | — | — | 0 / 1 / 0 |
| `fixed` / `sticky` / `infinite` | 0 | — | — | 0 |
| `color-scheme` | `light` | — | — | `light` |

**No regressions.** The capability links keep a 40px minimum height after losing their pill
outlines, and the reduced legend removed only entries the figure's own labels already carry — no
honesty distinction was simplified away.

**Keyboard:** the stage tablist still moves selection with arrow keys and focus follows.

**Reduced motion @390:** resolved on open, lattice removed, both controls work, **all three stages
compose open with 7/7 capability links**, chain fully drawn, friction outcomes aligned at 370px.

**No JavaScript @390:** 20/20 reveals, three stage panels open, **7/7 capability links at 40px**,
chain drawn, friction aligned with ticks and caption, evidence substrate open, 18 footer links,
15 panel links.

**Performance:** 665 DOM nodes at 390 (down from 848), one script, one external request, zero
images, zero canvas, zero looping animation. Desktop unchanged at 1,078.
