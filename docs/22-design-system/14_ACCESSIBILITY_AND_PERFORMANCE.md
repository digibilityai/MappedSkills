# Accessibility and Performance — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED
**Target:** WCAG 2.2 AA, per the programme's Gate 18 definition.

> **Creative ambition never buys an exemption**, and equally: accessibility is never used as an
> argument for removing the direction. Both failures are available and this system rejects both.

---

## PART 1 — ACCESSIBILITY

## 1. Binding requirements

| # | Requirement |
|---|---|
| **A1** | **Contrast:** body and small text ≥ 4.5:1; display text (≥24px, or ≥18.66px at 700) ≥ 3:1; focus indicator ≥ 3:1 against the element and its surround. `shape-recessive` is confined to shapes and display type |
| **A2** | **No colour-only meaning anywhere.** Every signal and evidence state is distinguished by **shape and word**. Verified across all eight signal states and all five status marks |
| **A3** | **Visible focus on every interactive element** — 3px accent ring at 3px offset, one treatment sitewide, never removed |
| **A4** | **Keyboard parity.** Everything reachable and operable; `Escape` closes disclosures and returns focus to the control that opened them; focus is never trapped |
| **A5** | **No hover-only critical content.** Hover is supplementary only |
| **A6** | **Nothing meaningful renders below 12px**, and evidence text is never smaller than body-adjacent size |
| **A7** | **Targets ≥ 44px** with real spacing between adjacent controls |
| **A8** | **Semantic controls.** Real `<button>`, `<a>`, `<label>`, `<dl>`; `aria-expanded` / `aria-controls` on disclosures; `aria-current="page"` on the current nav item |
| **A9** | **Reduced motion is a first-class mode.** No meaning depends on animation; every state resolves; ambient motion stops; pinned sequences unpin |
| **A10** | **Canvas is `aria-hidden`, and everything it conveys is also in the DOM** — ledger names, beat copy, region labels for passed and stalled, the "kinds, not counts" note |
| **A11** | **Figures carry `role="img"` with a `<title>` and a substantive `<desc>`**, plus a text/tabular equivalent that is in the DOM, keyboard-reachable and open in print |
| **A12** | **Text resize to 200% must not break layout or hide content.** *(Requirement stated; untested.)* |
| **A13** | **One `<main>`, labelled landmarks, `lang` set, heading order with no skipped level, a skip link first in the DOM** |
| **A14** | **Errors are in words**, associated with their field, announced, and never colour-only |

## 2. What has been verified, and how

Measured in a browser on the approved prototype at **1440×900** and **390×844**:

| Check | Result |
|---|---|
| Text below the WCAG threshold | **0** of 73 text-bearing elements, at both widths |
| Rendered text below 12px | **0** |
| Horizontal body overflow | **none** at either width |
| Focus indicator | **3px solid `#FF8A1E` at 3px offset**, `:focus-visible` matched, visible in the render |
| Colour-only meaning | **none** — shape carries every state |
| `<img>`, icon fonts, `position: fixed` | **0** of each |
| Monospace elements | **0** |
| Landmarks and heading order | one `<main>`, labelled `<nav>`, `lang="en-IN"`, H1 → H2 → H3, no skipped level |
| Reduced motion / no-JS | **Structurally exercised.** Pinned sequence unpins; the ledger, owned claim, seam, **all six evidence rows** and conversion marks retain real geometry |

## 3. Not tested — and not claimed

**No screen reader has been run.** No real device. No browser other than the rendering engine used
here. No print output. No 200% text resize. No colour-vision simulation beyond the shape audit.
**No user testing of any kind.**

**These are the first items on the Gate 18 list**, and no accessibility claim in this system should
be read as covering them.

### 3.1 One open risk, named
**Dark-first has an untested reach cost.** Contrast passes comfortably, but comprehension in bright
outdoor light, and for some low-vision readers, is unknown. It is an open item, not a defect.

---

## PART 2 — PERFORMANCE

## 4. Design-level constraints

| Constraint | Rule |
|---|---|
| **Canvas** | Permitted **only** for the signal field. Never for text, layout, figures, charts or decoration |
| **WebGL / 3D** | **Prohibited.** The concept does not require it |
| **Animation libraries** | **Prohibited by default.** The system is expressible in CSS transitions plus a small amount of vanilla JavaScript |
| **Animated properties** | `transform` and `opacity` first; colour-token cross-fades where a surface changes. **Never** width/height/top/left/box-shadow/filter on a per-frame basis |
| **Per-frame JavaScript** | At most one `rAF`-throttled scroll handler per page, writing at most two properties |
| **Off-screen pause** | **Mandatory.** Every field stops when its region leaves the viewport |
| **Reduced motion** | The animation loop **never starts**; one still frame is drawn |
| **Low-power devices** | Same path as reduced motion. *(Stated as intended production behaviour; no device signal is implemented in the prototype)* |
| **Video / background media** | **Prohibited** |
| **Images** | None in the system's own furniture. Photography only where the approved direction permits a real, identified person or place |
| **Fonts** | Two variable faces, **self-hosted and subset**, `font-display: swap`, preloaded. The prototype's Google Fonts links are a convenience only |
| **Progressive enhancement** | Every page must deliver its copy, navigation, actions and evidence with JavaScript off |

## 5. The signal budget

| | WIDE | MEDIUM | NARROW |
|---|---|---|---|
| Hero field | 78 | ~55 | 30 |
| Sequence field | 92 | ~64 | 34 |
| **Total live** | **170** | ~119 | **64** |

> **These are PROTOTYPE EVIDENCE, not automatic production limits.** They rendered without error in
> an emulated desktop viewport. **They have not been profiled on real hardware.**

Each signal is a single gradient-filled 1.5px rectangle — no shadows, no blurs, no filters.

## 6. Validation required before implementation

**Binding: none of this may be treated as a performance claim until these are done.**

1. **Profile the field on a real mid-range Android** and a low-end laptop. Record frame timing with
   the field on screen and while scrolling. **This is the single most important open item in the
   system.**
2. **Set the production signal budget from that measurement**, not from the prototype.
3. **Measure LCP, INP and CLS** on a page carrying the hero apparatus, with the fonts self-hosted.
4. **Confirm the off-screen pause** actually zeroes the main-thread cost.
5. **Verify the reduced-motion path draws once and never loops.**
6. **Agree a performance budget with the orchestrator** before the design system is implemented —
   Gate 17 owns the numbers.

**If the field cannot hold the agreed budget on a mid-range Android, the design must change — the
budget does not.**
