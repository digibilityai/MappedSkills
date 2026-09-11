# Responsive, Accessibility and Performance — Session 15C — PROPOSED

**Date:** 2026-09-02 · **Prototype:** `prototype/convergence.html`
**Everything below was rendered and measured in a browser at 1440×900 and 390×844.**

---

## 1. Responsive

| | **WIDE — 1440×900** | **NARROW — 390×844** |
|---|---|---|
| Document scroll width | **1425** | **390** |
| **Horizontal body overflow** | **none** | **none** |
| Elements exceeding the viewport | **0** | **0** |
| Hero | H1, then a two-column row: copy + actions left, the stage right | Single column: H1, copy, both actions, then the stage |
| Lattice | up to 440 marks (capped), ~30 columns, absolutely positioned over the resolved rows | **189 marks**, fewer columns, sized to the rows' own box |
| The resolve trigger | **A timer at 1.45s** — the stage is above the fold | **On view** — the stage is below the fold, so the moment fires when the reader reaches it |
| The three acts | Copy left, run strip right | Copy, then the run strip beneath it |
| Boundary section | Two columns: the five refusals and the one commitment | Stacked; the drawn rules and the resolve are unchanged |
| Evidence | Claim lifts, substrate opens | Identical behaviour, full width |
| CTA | Marks, headline, two actions | Same, marks scaled to 16px |
| Detail paragraphs | Two columns | One column |

**Two narrow-specific fixes were made after rendering:**
1. The lattice originally had a fixed height at narrow and left a **136px empty gap** once it
   resolved. The rows now define the box and the lattice overlays exactly that area, so the
   resolve leaves nothing behind.
2. The resolve originally fired on a timer at every width, which meant on a phone it **played to an
   empty screen** before the reader had scrolled to it. It is now triggered on view below 900px.

**First screen at NARROW is intact:** H1, supporting copy and **both** primary actions are above
the 844px fold; the stage follows immediately below.

---

## 2. Accessibility — measured

### 2.1 Contrast

**Element-level sweep, enquiries state, 97 text-bearing elements at WIDE and the full page at
NARROW: 0 elements below the WCAG threshold, 0 rendered text under 12px.**

Token pairs, computed directly (not inferred):

| Pair | Ratio | |
|---|---|---|
| Ivory on ink — traffic state body | **16.80** | AAA |
| Ink on ivory — enquiries state body | **16.80** | AAA |
| Muted `#A29BAC` on ink | **6.92** | AA / AAA large |
| Dim `#5C5665` on ivory | **6.38** | AA / AAA large |
| Accent `#FF5B04` on ink | **5.97** | AA |
| Accent `#D94400` on ivory — **display text only** (≥24px) | **3.97** | AA large |
| Accent `#A83400` on ivory — **small text** | **6.02** | AA |
| Lattice `#BDB6CC` on ink | **9.49** | — |
| Ink on the tangerine CTA panel | **5.97** | AA |
| Evidence panel body | **17.45** | AAA |
| Evidence panel secondary | **9.76** | AAA |

**Two contrast defects were found by measuring and fixed:** the act eyebrows were 3.97:1 at 13px
(a dedicated darker accent token, `--tang-sm`, was added for small accent text); and the five
refusals in the boundary section originally receded to `opacity:.34`, which took approved copy far
below the readable threshold — **replaced with a drawn rule, so the words stay at full contrast.**

`--gapc #8E8798` measures 3.13:1 and is therefore **used only for drawn shapes — dashed borders and
gap bars — and never for text.** Same rule the earlier sessions applied to their recessive stroke.

### 2.2 Verified in the browser

| Check | Result |
|---|---|
| Focus indicator | **3px solid ink at 3px offset, confirmed with real keyboard `Tab`** and visible in the render; `:focus-visible` matched |
| Keyboard reach | Skip link first; all 14 links and buttons reachable; the control is a real `<button>` pair with `aria-pressed`; the evidence control is a real `<button>` with `aria-expanded`/`aria-controls` |
| Colour-only meaning | **None.** A resolved mark is a filled square; an unmeasured or unattributed one is an **open, dashed** square with its own word. The struck promises are struck by a drawn rule, not by a colour |
| Hover-only content | **None.** Nothing is revealed by hover |
| Rendered text under 12px | **0** |
| Horizontal body overflow | **none at either width** |
| `<img>`, icon fonts, fixed or sticky elements | **0 of each** |
| Landmarks | one `<main>`, one labelled `<nav>`, `<header>`, `<footer>`, `lang="en-IN"`, heading order H1 → H2 → H3 with no skipped level |
| Motion-independent content | Verified via the `html:not(.js)` path: every state resolves, the evidence substrate is open, all copy and actions present |

### 2.3 Reduced motion

The `prefers-reduced-motion` path is **implemented in both CSS and JavaScript** and was
**code-reviewed and partially exercised by injecting the equivalent rules**, which confirmed the
lattice is removed and the resolved objects are shown. **The OS-level preference itself was not
toggled in this session, so this is reviewed and partially tested — not fully tested.**

### 2.4 Not tested, and not claimed

Screen readers · real devices · browsers other than the rendering engine used here · print · text
resize to 200% · touch interaction on real hardware · **any user testing whatsoever.**

### 2.5 One measurement caveat, recorded so the numbers can be trusted

The browser environment used here returns **stale computed styles** after an attribute-driven token
change while its tab is backgrounded. Several early "failures" were traced to that, not to the
page. Every contrast number above was therefore taken either **on a settled state after a forced
repaint**, or **computed directly from the tokens** with no DOM involved. The traffic state's
element-level sweep could not be measured reliably and is reported from token arithmetic and visual
inspection instead.

---

## 3. Performance

| | |
|---|---|
| **Canvas / WebGL / video** | **none** |
| **Animation libraries** | **none.** ~120 lines of inline vanilla JavaScript |
| **Images** | **0** |
| **Steady-state animation** | **none.** Nothing loops or idles |
| **Per-frame JavaScript** | One throttled `rAF` handler writing a transform and an opacity to **one** element, only while the hero is on screen |
| **Largest single animation** | The hero lattice — 189 marks at NARROW, capped at 440 — transitioned **once**, staggered, on `transform` + `opacity` only |
| **Everything else** | Fewer than ten elements per event |

**Production notes, stated because the direction has to ship on a commercial Next.js site:**

1. **The lattice is capped at 440 marks**; build it after first paint. It is the only element count
   worth budgeting, and it is already skipped entirely under reduced motion.
2. **Self-host the two webfonts.** The prototype uses Google Fonts for convenience; both are
   variable faces and should be subset.
3. Everything else is CSS custom-property transitions and `IntersectionObserver` — both of which
   are cheap and already how a Next.js site would implement this.
4. **No concept in this direction requires heavy runtime rendering.** The energy comes from *when*
   and *why* things move, not from how much is moving.
