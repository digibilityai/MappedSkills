# Navigation, Buttons and Controls — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED
**The IA and navigation architecture are approved (`DEC-010`, `DEC-016`) and are NOT reopened.**
This document gives them visual treatment only.

---

## 1. Header

**Non-sticky on every page. There is no persistent sticky sales CTA anywhere on the site.**

| Element | Treatment |
|---|---|
| Ground | The primary field. No bar, no border, no backdrop, no blur |
| Identity | Display face, 700, ~1.16rem, tight tracking, `text-primary` |
| Nav items | Interface face, 500, ~0.96rem, `text-secondary`; `text-primary` on hover/focus |
| Primary control | The one PRIMARY action, sitewide, identical — a **filled amber button** |
| Padding | ~24px vertical at WIDE, ~16px at NARROW |

### 1.1 The two-control rule — carried unchanged
**The dropdown parent is a real link; the disclosure is a separate adjacent control** with
`aria-expanded` and its own accessible name. This fixes the recorded production defect where
`/services` was unreachable from the navigation. **Collapsing these back into one element is a
defect, not a simplification.**

| Dropdown | |
|---|---|
| Panel | Raised surface, hairline edge, no shadow, radius ≤ 2px |
| Items | Interface 400, `text-primary`, generous vertical spacing |
| Open/close | Click or `Enter`/`Space`. Hover may open on pointer devices as an enhancement, **never as the only way** |
| Dismissal | `Escape` closes and **returns focus to the disclosure**; outside click closes |
| Motion | Feedback only — opacity/transform, 120–200ms. No slide-down theatre |

### 1.2 Narrow navigation
- A **two-row bar**: identity + menu control, then the primary action at full width. *(One row
  clipped the menu control entirely at 390px — a real defect found by rendering.)*
- The panel **opens in place, not as a modal**, and carries **all six items, all children and the
  primary action**. **Mobile removes nothing.**
- `Escape` and an explicit close both work; focus returns to the trigger.
- The page beneath does not scroll while the panel is open.
- Touch targets ≥ 44px with real spacing between them.

### 1.3 Current page
Indicated by a **2px amber underline** on the item **and** by `aria-current="page"`.
**Never by colour alone.**

---

## 2. Actions

**Three kinds. There is no fourth, and no colour variant of any of them.**

| Kind | Treatment | Use |
|---|---|---|
| **Primary** | Filled `commercial-accent`, ground-colour label, 2px border, 2px radius, min-height 52px (44px compact) | The conversion action. **Max 2 objects per page** — the first screen and the conversion moment |
| **Secondary** | Transparent, 2px `border-control` outline, `text-primary` label, same geometry | The peer route — booking beside the form. **Equal confidence, never framed as lesser** |
| **Textual** | An accent-coloured label with a transparent 2px underline that becomes solid on interaction | Proof and contextual routes. **Deliberately a link** — a button would make an offer look like a step |

### 2.1 States

| State | Primary | Secondary | Textual |
|---|---|---|---|
| Hover | lift 2px | border → `text-primary` | underline becomes solid |
| Active | settles to 0 | — | — |
| Focus | **3px amber ring, 3px offset** — sitewide, on every interactive element | same | same |
| Disabled | Only where a control is genuinely unavailable. Recessive fill and label, `pointer-events: none`, and **the reason is stated in text** | | |

**Verified in the browser:** the focus ring renders as `3px solid #FF8A1E` at `3px` offset and
matches `:focus-visible`.

### 2.2 Binding action rules
1. **The primary commercial action is always visually obvious.** No page hides the conversion.
2. **Energy comes from contrast against restraint** — never from size, saturation, gradients,
   arrows, shadows or pills. **There is no pill and no rounded button in this system.**
3. **Feedback is a 2px lift and a colour change, and nothing else.** No ripple, no particle burst,
   no magnetic cursor, no "arrival" animation on a button. *THE ARRIVAL language belongs to the
   argument, not to the chrome — using it on buttons is exactly how it becomes a gimmick.*
4. **No action animates on scroll**, ever.
5. **On the amber inversion the polarity flips**: the primary becomes ground-coloured with a
   ground-coloured border; the secondary becomes outlined in the ground colour.

---

## 3. The two signature controls

Both are ordinary `<button>` elements with text labels. **Signature interactions are budgeted:
max 2 on the homepage, 1 on a service page, 0 on editorial** (`06` §3).

| Control | What it does | Rules |
|---|---|---|
| **Re-run the system** | Resets the arrival ledger and restores the field | A real button with a plain-language label. **Never the only way to understand the region** — the first pass runs unprompted |
| **Reveal the evidence** | Lights the substrate beneath a claim | `aria-expanded` + `aria-controls`; the label **names what it reveals** and changes to name the reverse when open. **Never "More", never a bare chevron** |

---

## 4. Links in copy

- Body links are **accent-coloured with a 1px underline at ~0.18em offset**, thickening on
  interaction. **Underlined, so the affordance never depends on colour.**
- Footer links are underlined for the same reason — this fixes the recorded sitewide colour-only
  link defect.
- **No hover-only reveals of anything that matters, anywhere.**

---

## 5. Skip link
First in the DOM, visually hidden until focused, then rendered as an amber block with ground-colour
ink at the top-left. Present on every page.
