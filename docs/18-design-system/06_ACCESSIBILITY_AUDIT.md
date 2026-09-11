# Accessibility Audit — Complete Homepage — Session 15 — PROPOSED

**Session:** 15 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Specimen:** `prototype/homepage.html`

> **What was actually done.** Everything in §1–§7 was **measured or exercised in a browser** this
> session. Contrast ratios were computed by rasterising each element's computed colour and its
> actual rendered background and applying the WCAG formula — not estimated, and not inherited from
> Session 14. **§8 lists what was not tested. No user testing occurred and none is claimed.**

---

## 1. Text contrast — measured

| Element | Size / weight | Measured ratio | AA | AAA |
|---|---|---|---|---|
| H1, headings, body copy, action labels, nav links, footer links | 18–88px | **15.89 : 1** | ✔ | ✔ |
| Consequence statement | 38px / 600 | **15.89 : 1** | ✔ | ✔ |
| Statement | 26px / 600 | **15.89 : 1** | ✔ | ✔ |
| Limits copy, on the set ground | 18px / 400 | **14.45 : 1** | ✔ | ✔ |
| Provenance, status-mark text, figure caption, footer column labels | 16px / 400–500 | **8.81 : 1** | ✔ | ✔ |
| **Register label** | 16px / 400 | **8.81 : 1** on ground · **8.01 : 1** on the set ground | ✔ | ✔ |
| Figure point labels | 17px / 600 | **15.89 : 1** | ✔ | ✔ |
| Figure annotations, recessive labels | 16px / 400 | **8.81 : 1** | ✔ | ✔ |
| Disclosure control, figure mark annotations, links (accent) | 16–17px | **6.60 : 1** | ✔ | — |
| Focus ring against the ground | 3px | **6.60 : 1** | ✔ | — |
| `--ink-recess` | — | **4.44 : 1** | — | — |

**`--ink-recess` sits below the 4.5:1 text floor and is therefore restricted to figure *strokes*.**
It is never used for text anywhere in the stylesheet; recessive figure *labels* use the apparatus
ink at 8.81:1. This is a constraint discovered by computation, not a preference, and it is enforced
by the stylesheet rather than by convention.

**The ground change is 1.10 : 1 against the page ground** — deliberately near-invisible as a colour
event. It marks a set-piece; it is never the channel that carries meaning, and each set-piece also
carries a rule and a heading.

---

## 2. Minimum text size

**No rendered text on the page is below 16px**, with two exceptions, both checked:

- the navigation disclosure's chevron glyph (12.8px), which is `aria-hidden`, purely decorative, and
  accompanied by a real accessible name;
- the visually-hidden label text used for that control's accessible name, which is not rendered.

**The apparatus is at 16px — the body minimum — everywhere.** Nothing is shrunk to signal
subordination.

---

## 3. Focus

**Verified with real keyboard `Tab` presses, not asserted.** After tabbing into the navigation
dropdown, the focused link reported a computed outline of **`3px solid oklch(0.46 0.078 218)` at
3px offset**, matched `:focus-visible`, and was visible in the rendered screenshot.

One treatment, sitewide, on every focusable element, never removed, never the low-contrast browser
default. The focus indicator is the annotation tie's colour — accessibility is part of the identity
rather than a compliance layer bolted on.

---

## 4. Keyboard

| Behaviour | Result |
|---|---|
| Skip link to main content | Present, first in the DOM, visible on focus |
| Tab order | Follows DOM order; DOM order is reading order at every width |
| Navigation parent | A **real link**, reachable and activatable by keyboard |
| Navigation disclosure | A **separate `<button>`** with `aria-expanded` and its own accessible name |
| `Escape` on the WIDE dropdown | **Closes it and returns focus to the disclosure** — verified |
| `Escape` on the NARROW panel | **Closes it and returns focus to the summary** — verified |
| Evidence disclosures | Native `<details>`; open, close and reachable with no script |
| Focus trap | **None anywhere.** The narrow panel does not trap focus |
| Content reachable only by hover | **None.** No `:hover` rule reveals any content |

---

## 5. Colour is never the only channel

- **Links are underlined**, in body copy, in navigation panels and in the footer — the sitewide
  colour-only link defect is not reproduced.
- **The current page is marked by a rule**, not by colour.
- **Status marks are a drawn shape plus a word.** Colour contributes nothing to them at all.
- **Figure semantics are stroke pattern and weight**: solid = measured, dashed = not measured,
  lighter = recessive. No stage has a colour of its own.
- **Form errors are stated in words** and carry the annotation tie, not a red fill.

**Greyscale check.** The page was rendered with all colour removed and inspected at the two densest
points — the full figure and the block 6 apparatus. **Every distinction survived:** filled vs
hatched status marks, solid vs dashed vs doubled strokes, the accountability boundary, the
intervention marks, the annotation tie, and every link.

---

## 6. Structure and semantics

`lang="en-IN"` · one `<main>` · two labelled `<nav>` landmarks · `<header>` and `<footer>` ·
heading order H1 → H2 → H3 with **no skipped level and no second H1** · every figure carries
`role="img"` with a `<title>` and a substantive `<desc>` conveying the same relationships as the
drawing, plus an expandable table · every disclosure control **names what it reveals** rather than
saying "More" · no `<img>` and no `<iframe>` on the page.

---

## 7. Motion, layout stability and resilience

- **0 running animations; 0 elements with a transition or animation declared.** The
  reduced-motion block therefore has nothing to suppress, and the static state is the only state.
- **No horizontal body overflow at 1400, 1024, 768 or 390.** Wide figures are replaced by vertical
  drawings rather than scrolled or scaled.
- **Disclosures open downward, in place, with no layout shift above the reader's line.**
- **The limits region is never inside a disclosure and is open at every width**, so no script
  failure and no collapsed state can hide it.
- **With JavaScript disabled**, every destination remains reachable, both disclosures still work,
  and no content is lost. The single script only adds `Escape` and outside-click dismissal.
- Action objects and form fields are **48px minimum** in height.

---

## 8. Not tested — stated plainly

- **No screen-reader was run.** Semantics were inspected structurally; that is not the same thing.
- **No real assistive technology, no real device, no touch hardware.**
- **One rendering engine only.** No cross-browser testing.
- **Print output not verified** — the print rules are declared and unexercised.
- **Text resize to 200% and browser zoom not tested.**
- **Reduced-motion preference not exercised**, because there is no motion to suppress.
- **Colour-vision simulation beyond greyscale not run.**
- **No user testing of any kind occurred, and no claim is made about any real reader.**

---

## 9. Blockers

> ### **None found.**

No accessibility blocker was identified in what was tested. **That statement is bounded by §8** —
in particular, the absence of a screen-reader pass means this audit cannot claim the page is
verified for assistive technology, only that its structure, contrast, focus, keyboard behaviour and
non-colour channels were measured and hold.
