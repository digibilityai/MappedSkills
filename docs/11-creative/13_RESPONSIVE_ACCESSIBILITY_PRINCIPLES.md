# Responsive and Accessibility Principles — APPROVED

**Session:** 12 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** APPROVED — 2026-09-01 (Gate 9A, `DEC-015`). **Direction level only. No breakpoint, no measurement, no implementation spec appears here.**

**Standing requirement, not created here:** WCAG 2.2 AA is Project Rule 13 and is already binding on every page's conversion elements (`PAGE_TYPE_CRO_RULES.md` §11.5). This document states what the *creative direction* must do so that AA is achievable without the design being rebuilt to get there.

---

## 1. The governing principle

> **Accessibility is a property of the direction, not a remediation applied to it.**

Two decisions already in the direction make this largely true by construction:

- **Type, rule and space carry the hierarchy** — not colour, tint or elevation. A hierarchy built from size and structure survives greyscale, high-contrast mode, zoom, and a screen reader.
- **The annotation tie doubles as the focus indicator** (`07_VISUAL_GRAMMAR.md` §6.1). The most commonly neglected accessibility affordance on the web becomes a recognisable part of the identity rather than a compliance addition.

---

## 2. Accessibility at direction level

### 2.1 Contrast
Light-first, warm neutral ground with near-black ink. **Target AAA (7:1) for body text where it is achievable, with AA (4.5:1) as the floor** — the direction has no stylistic reason to sit near the floor, since it uses no tinted text for effect.

**Two rules with teeth:**
- **The apparatus register is not low-contrast.** It is smaller and different in character; it is **not** grey-on-grey. Setting provenance in pale text would defeat the entire evidence-design argument and would fail contrast simultaneously.
- **Limits and scope notes meet the same contrast as claims.** No exception.

### 2.2 Readable type
Comfortable body size on every device with no requirement to zoom. **A measure of roughly 60–75 characters** on the reading column. Generous leading. **Nothing important is set below the body's minimum size** — including apparatus, captions, figure labels and legal text.

### 2.3 Motion sensitivity and reduced motion
`prefers-reduced-motion` is respected everywhere. **And the stricter rule from `11_MOTION_AND_INTERACTION_PRINCIPLES.md` §2 governs: the static state is the primary state.** A motion whose information is only available in motion is disqualified, not merely wrapped in a media query. Nothing on the first screen animates; no number ever moves.

### 2.4 Colour independence
**Colour is never the sole carrier of meaning, anywhere.**
- Every evidence status carries **shape + label**, with colour at most a third channel.
- Every figure is readable in greyscale and has a text or tabular equivalent.
- Links are distinguishable without colour.
- **No red-amber-green anywhere on the site**, which serves honesty (`08_EVIDENCE_DESIGN_LANGUAGE.md` §4 rule 2) and colour-blind access at the same time.

### 2.5 Focus visibility
Visible, distinctive and consistent, on every interactive element, in a single recognisable treatment. It is part of the identity. Focus is never removed, never reduced to the browser default at low contrast, and never lost when a disclosure expands.

### 2.6 Touch targets
Comfortably above the minimum, with real spacing between adjacent targets. **This matters most on the enquiry form, the booking surface, and the phone and WhatsApp actions** — the India-first buyer uses those on a phone, and `PAGE_TYPE_CRO_RULES.md` §10 requires them to be genuinely prominent for the industrial segment.

### 2.7 Responsive behaviour
See §3 in full.

### 2.8 Data-visualisation accessibility
The figures are the site's most citable assets and the most likely to be quoted by systems that cannot see them.

- Every figure has a **text or tabular equivalent** conveying the same information — not a decorative alt string.
- Readable in greyscale.
- Labels are **on** the figure, not only in a legend that must be cross-referenced.
- Values are readable without hover.
- Keyboard-reachable where interactive; **never keyboard-only-reachable or pointer-only-reachable**.
- **The `not testable` state must be distinguishable from a measured zero without colour**, in the text equivalent as well as in the figure. This is the one accessibility rule on this site that is also an honesty rule.

### 2.9 Line length, hierarchy and cognitive load
- The reading column is protected at every width.
- Heading hierarchy is genuine and sequential; headings describe their sections (`VOICE_AND_TONE.md` §4.2) so heading-only navigation delivers the argument.
- **No section runs past four paragraphs without a heading, list, table or figure** (§3 of the same document) — a readability rule and a cognitive-load rule at once.
- One argument per screen. One figure of full weight per page.
- **Nothing important is hidden behind a hover, a tooltip, a modal or an accordion that starts collapsed.** Modals and interstitials are already banned outright (`PAGE_TYPE_CRO_RULES.md` §11.4).

---

## 3. Responsive character

**Mobile is the primary case, not the compromise.** India-first, owner-led buyers, mixed connections, and — per `PAGE_TYPE_CRO_RULES.md` §3 Check 2 in the approved problem-page copy — a firm whose own published advice is to test your form *"from a phone, on mobile data rather than office wifi."* A site that gives that advice must be beyond reproach on a phone.

### 3.1 What scales naturally
- The single reading column — it is already the mobile layout.
- The type hierarchy, since it comes from size and space.
- Rules and vertical rhythm.
- Metadata-forward cards.
- Evidence status marks — small, shape-based, label-bearing.
- Plain first screens.

### 3.2 What needs simplification — and the one that matters most

> **The apparatus column is the single biggest responsive risk in this direction, and it must be designed as a content relationship, not as a desktop layout feature.**

On wide screens it is a margin beside the claim. On narrow screens it **collapses to an inline, expandable disclosure directly beneath the statement it belongs to.**

Three binding constraints:
1. **It never disappears.** Dropping the apparatus on mobile would remove the site's differentiator for the majority of visitors.
2. **It never becomes a footer.** Provenance detached from its claim is a disclaimer, which is the exact treatment prohibited.
3. **The reading order must be correct in the DOM regardless of visual position** — the claim, then its apparatus. A screen-reader user and a mobile user get the same relationship a desktop user gets.

Also simplified on narrow screens: the run figure reorients to vertical; multi-column comparisons become stacked or horizontally scrollable **within their own container**, never causing the page body to scroll horizontally; dense tables get a linearised form.

### 3.3 What should disappear on narrow screens
- Decorative rules that only exist to structure a wide grid.
- Any margin-position annotation that has been re-parented inline.
- Secondary navigation chrome that competes with the reading column.

**Nothing that carries information disappears.** If something can be dropped on mobile, that is evidence it was decoration, and it should be reconsidered on desktop too.

### 3.4 What must never depend on hover
- Evidence disclosure.
- Figure labels and values.
- Status meanings.
- Navigation.
- Any CTA.

**Hover reveals supplementary detail only, and everything it reveals is reachable by tap and by keyboard.**

### 3.5 What could become unusable on narrow screens — flagged for the UX phase
- **The run figure**, if drawn as a wide horizontal path. It must have a genuine vertical form, not a scaled-down horizontal one, and **must never require horizontal scrolling of the page**.
- **The four-cause decision tree**, if drawn as a wide branching graph. A vertical, sequential form is likely the correct mobile answer.
- **Per-system comparisons** across four systems plus two not-testable states, if built as a wide table.
- **The five-check diagnostic**, if it depends on holding several states side by side.
- **Any paired explanation-and-artefact layout** (the Stripe Docs pattern), which is inherently two-column and must have a designed stacked form where the artefact stays tied to its step.

---

## 4. Constraints the direction imposes on itself for accessibility and performance

1. **No text rendered as an image**, ever — including headlines, figure labels and quoted evidence excerpts.
2. **Figures are resolution-independent and readable at small sizes**, with real text rather than baked-in labels.
3. **No motion on the first screen; nothing gates first paint.** Directly informed by the Linear observation (2026-09-01), and by the Core Web Vitals requirement in `CLAUDE.md`.
4. **No layout shift when an evidence disclosure opens** that moves the text the reader is currently reading.
5. **Photography is highly selective**, so image weight is low by direction rather than by optimisation.
6. **No icon font, no decorative icon set** — the direction removes the need for one (`10_IMAGERY_PHOTOGRAPHY_ILLUSTRATION.md` §4).
7. **Print and screenshot fidelity is a requirement, not a nicety.** The figures exist to be cited.

---

## 5. What this document does not decide

Breakpoints · type sizes · contrast values · spacing · touch-target dimensions · ARIA patterns · component behaviour · testing tooling. Those belong to Gate 9B (UX), the design-system phase, and `docs/14-qa/`.

**No accessibility test was run in this session on MappedSkills' site or on any external site**, and nothing in these artifacts should be read as a compliance assessment of the current production website.
