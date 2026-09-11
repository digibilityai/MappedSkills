# Responsive Findings — Complete Homepage — Session 15 — PROPOSED

**Session:** 15 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Specimen:** `prototype/homepage.html`
**Method:** rendered in a browser at real emulated viewports and **measured**, not described.
Widths inspected: **1400 (WIDE) · 1024 (MEDIUM) · 768 (MEDIUM) · 390 (NARROW)**.

> An earlier sweep in this session that changed `documentElement.style.width` rather than the real
> viewport produced false overflow readings, because `100vw` does not follow that property. **It was
> discarded and every number below comes from a real viewport resize.** Recorded so the method can
> be checked.

---

## 1. Measured, at each width

| | **1400 × 900** | **1024 × 900** | **768 × 900** | **390 × 844** |
|---|---|---|---|---|
| Document scroll width | 1385 | 1024 | 768 | 390 |
| **Horizontal body overflow** | **none** | **none** | **none** | **none** |
| Elements exceeding the viewport | **0** | **0** | **0** | **0** |
| Page height | 7757 | 8408 | — | 10479 |
| Viewport-height bands | 9 | — | — | 13 |
| Header form | inline, six items | inline, six items | two-row narrow | two-row narrow |
| Apparatus margin | two columns | **inline beneath claim** | inline | inline |
| Figure form | **horizontal** | **vertical** | vertical | vertical |
| Footer columns | 4 | 2 | 2 | 1 |
| Capability groups | 2 columns | 1 | 1 | 1 |

---

## 2. The three transformation thresholds, and why each is where it is

**None of these is proposed as programme doctrine.** Each is **derived from the width the content
itself requires**, and each is a *container* query, not a viewport media query — so a component
placed in a narrow region behaves narrowly even in a wide window.

| Threshold | What changes | Why that number |
|---|---|---|
| **container ≥ 1180px** | The figure takes its **horizontal** form | The horizontal drawing needs 1120px to hold its labels at 16px. Below that it would have to be scaled, and scaling an SVG pushes its labels below the body minimum |
| **container ≥ 1000px** | The apparatus margin becomes a second column | 66ch reading column + 48px gap + a 240px minimum margin. Below this the margin would be narrower than its own 56ch measure allows |
| **container ≥ 900px** | The header takes its inline form | The six items plus the primary control stop fitting on one row below this |

---

## 3. Verified behaviours

- **Hero wrapping.** H1 wraps to 2 lines at WIDE and MEDIUM, 3 at NARROW. The break keeps *"not the
  traffic."* intact at every width.
- **CTA visibility at NARROW.** Both hero actions clear the 844px fold — the second ends at **738px**.
- **Navigation.** All six items, all five children and the primary control are present at every
  width. Nothing is removed for space. The narrow panel opens in place, over the content, and the
  page beneath does not shift.
- **Reading order.** Identical at every width. **DOM order is claim → apparatus everywhere**, so
  the apparatus margin's re-parenting changes nothing in the accessibility tree.
- **Apparatus placement.** Never detached, never in a modal, never moved to a footer. At NARROW it
  sits immediately beneath the claim it belongs to.
- **The limits region is fully expanded at every width** and is never inside a disclosure.
- **Figure transformation.** Swap, not scroll. Both figures have genuine vertical drawings. **No
  figure scrolls sideways at any width, and no figure label falls below 16px at any width.**
- **Section rhythm survives.** The isolation gap before the action region remains the largest gap on
  the page at NARROW.
- **Footer.** Columns stack 4 → 2 → 1. No content is hidden at any step.

---

## 4. Defects found by rendering, and fixed

Recorded because a responsive report with no defects has usually not been looked at.

### 4.1 The narrow header pushed its own menu control off-screen — **FIXED**
On one row, the primary control's label (*"Tell us what you're trying to fix"*) plus the identity
mark exceeded 390px, and the sheet's horizontal clip made the menu control **unreachable** — every
destination on the site was gone at NARROW.

**Fix:** the bar is two rows — *identity + menu*, then *the primary control at full width*.
**Neither the label nor the menu was shortened, hidden or moved into the other.**

### 4.2 The second hero action fell below the NARROW fold — **FIXED**
A fixed 20px hero support line plus 96px of hero top padding pushed *"Book a call"* past 844px.

**Fix:** the lede scales toward the body size at narrow (never below it), and the hero's vertical
padding steps down below the 900px container threshold. Measured after: 738px.

### 4.3 The ground-change band stopped short of the viewport edge — **FIXED**
At 1400px the set-piece band ended 124px before the right edge, because it inherited the
left-anchored spine's width. It read as a rendering bug, not as asymmetry.

**Fix:** ground changes bleed to the viewport (`100vw`) while their content stays on the spine, with
`overflow-x: clip` on the sheet so the page body still never scrolls horizontally.

### 4.4 Four figure-label collisions — **FIXED**
At WIDE the state figure's *"state 3"* annotation ran through *"accountability ends here"*, and its
arrival stroke lay almost parallel to the chain, reading as a second chain. At NARROW the full
figure's *"see — not measured"* sat on *"discovery and source"*, and *"we answer up to here"* ran
through the client-data stretch. The vertical state figure's arrival stroke crossed its own label.

**Fix:** four label layouts re-cut and both arrival strokes re-angled so each enters its node
cleanly. Re-rendered and re-inspected at both widths.

---

## 5. MEDIUM — inspected for structural breakage

**No separate polished deliverable was produced for MEDIUM, and none is claimed.** Both 1024 and
768 were rendered and inspected.

**No breakage found.** At 1024 the apparatus margin collapses inline, the figure swaps to its
vertical form, the footer goes to two columns, and the header still fits inline. At 768 the header
takes its narrow two-row form. **Zero elements exceed the viewport at either width**, and the
reading order is unchanged.

**One honest observation, not a defect:** between roughly 1000px and 1180px the page is at its least
efficient — the apparatus margin has collapsed but the wide figure region has not yet been earned,
so a tall vertical figure sits in a wide window. It reads as a tablet layout rather than as a
broken one, and it is listed as an open item rather than fixed by inventing a third figure form.

---

## 6. Not tested

Real devices · touch interaction on real hardware · browsers other than the rendering engine used
here · print output · very wide viewports beyond 1400 · landscape phone · text-resize to 200% ·
users of any kind. **No user testing occurred and none is claimed.**
