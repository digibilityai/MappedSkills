# Accessibility Requirements — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** Project Rule 13 (**WCAG 2.2 AA is a release requirement, not an enhancement**) · `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` (approved, `DEC-015`) · `FORM_AND_BOOKING_SPEC.md` §7 · `PAGE_TYPE_CRO_RULES.md` §11.5.

> **This document states requirements. It is not a compliance assessment and must not be read as one.**
> **No accessibility test, automated scan, assistive-technology test or contrast measurement was run in this session**, on MappedSkills' site or on any other. No claim of conformance is made anywhere here.

---

## 1. The governing position

> **Accessibility is a property of the direction, not a remediation applied to it.**

Two decisions already in the approved creative direction make much of this true by construction, and the UX must not undo them:

- **Type, rule and space carry the hierarchy** — not colour, tint or elevation. A hierarchy built from size and structure survives greyscale, high-contrast mode, zoom and a screen reader.
- **The focus indicator is part of the identity**, not a compliance addition — which is what makes it unlikely to be removed for aesthetic reasons.

**Where a requirement below has a value attached to it — a ratio, a size — that value belongs to Gate 10.** This document states *what must be true*, not *at what number*.

---

## 2. Semantic structure

| Requirement | Detail |
|---|---|
| **One `<h1>` per page**, matching the page's subject | Four current service pages hand-roll their `<h1>`; the heading hierarchy across 600–700-line page files was never fully traced |
| **Genuine, sequential heading hierarchy** — no level skipped for visual reasons | Headings describe their sections, so **heading-only navigation delivers the argument** |
| **Landmarks** — `header`, `nav`, `main`, `footer`, and `<section>` only where it names something | Present today; unlabelled |
| **Every `<nav>` has a distinguishing accessible name** | **VERIFIED defect:** the current site renders three unlabelled `<nav>` elements — desktop, mobile and the table of contents |
| **`<main>` has an id** | **VERIFIED defect:** it does not, so no skip link could target it without a change |
| **Lists are lists, tables are tables** | A structure rendered as styled paragraphs is invisible to assistive technology |
| **DOM order matches reading order at every width** | Claim, then apparatus. Always |

---

## 3. Keyboard operation

| Requirement | Detail |
|---|---|
| **Full keyboard parity** | Every route, control, disclosure, figure interaction and form can be reached and operated by keyboard alone |
| **A skip link to main content** | **VERIFIED defect: none exists anywhere.** Keyboard and screen-reader users currently traverse the full header, including the Services dropdown, on every page |
| **Logical focus order** | Following the visual and DOM order |
| **No keyboard traps** | **Including inside the booking embed.** A third-party embed does not inherit an exemption |
| **The dropdown parent is a link and the disclosure is a separate control** | **VERIFIED defect:** the current trigger is a button, so `/services` is unreachable by keyboard from the header |
| **`Escape` closes any expanded menu or panel and returns focus to its trigger** | |
| **Focus is never lost when a disclosure expands or collapses** | It stays on the control |
| **The mobile nav panel is the only permitted focus containment**, and it is escapable | |

---

## 4. Focus visibility

| Requirement |
|---|
| Visible, distinctive and consistent on **every** interactive element, in one recognisable treatment |
| **Never removed. Never reduced to a low-contrast browser default** |
| Not lost when content expands, when a figure is interacted with, or when an error moves focus |
| Present on links inside body text, inside figures, inside tables and inside the footer — not only on buttons |

---

## 5. Colour and contrast

| Requirement | Detail |
|---|---|
| **Colour is never the sole carrier of meaning, anywhere** | Every evidence status carries **shape + label**, with colour at most a third channel |
| **Links are distinguishable without colour** | **VERIFIED defect:** the current global rule colours every `<a>` brand red with underline on hover only — a colour-only distinction, and it applies to navigation and footer links too |
| **The current page indication in navigation is not colour alone** | |
| **Required form fields are not marked by colour alone** | Nor by an asterisk alone |
| **Errors are not signalled by colour alone** | |
| **No red-amber-green anywhere on the site** | Serves honesty (colour never grades a result) and colour-blind access simultaneously |
| **The apparatus register is not low-contrast** | It is smaller and different in character; it is **not** grey-on-grey. Pale provenance would defeat the entire evidence argument and fail contrast at the same time |
| **Limits and scope notes meet the same contrast as claims** | No exception |
| **Contrast targets** | AAA for body text where achievable, AA as the floor. **Values are set at Gate 10; no ratio is measured here** |

**Architectural risk carried forward, recorded rather than resolved:** the current stylesheet contains an override block existing specifically to rescue text colour on light surfaces under a forced dark mode, so any light-background utility not on that list renders light text on a light background. **The redesign should remove the cause — forced dark mode — rather than extend the rescue list.**

---

## 6. Forms

Carried from the approved specification and binding here.

| Requirement |
|---|
| Every input has a programmatically associated visible `<label>`. **Placeholder is never the only label** |
| **VERIFIED defect:** the current blog newsletter email input has no label — placeholder only |
| Required conveyed in text **and** via `aria-required` |
| Errors associated with their field via `aria-describedby`, and announced through a live region |
| **The submit result — success or failure — announced via a status region**, not conveyed only by visual change. **VERIFIED defect:** the current form has no `role="alert"` or live region on either state |
| Focus moves to the first error on failed submit, and to the confirmation on success |
| Instructions and format hints available **before** entry, not only after an error |
| Correct `autocomplete` tokens on every field |
| Touch targets comfortably above minimum, **including the consent checkbox** |
| **The booking experience meets the same bar.** If a third-party embed cannot, an accessible alternative path to the same outcome must exist on the page |

---

## 7. Disclosure behaviour

| Requirement |
|---|
| Native, semantic disclosure with programmatic expanded state |
| **Content present in the DOM whether open or closed** |
| Operable by keyboard; **nothing requires a pointer** |
| **Nothing load-bearing is revealed by hover** |
| No layout shift that moves the text the reader is currently reading |
| A fragment link targeting a closed disclosure **opens it and moves focus to it** |
| **Limits are never collapsible**, at any width |
| **`/faq` is the one page type where a collapsed-on-load accordion is permitted**, because each item is a genuine discrete question |

---

## 8. Figures and data

The figures are the site's most citable assets and the most likely to be quoted by systems that cannot see them.

| Requirement |
|---|
| **Every figure has a text or tabular equivalent** conveying the same information — **not a decorative alt string** |
| Readable in greyscale |
| **Labels are on the figure**, as real text, not only in a legend requiring cross-reference |
| **Values readable without hover** |
| Keyboard-reachable where interactive; **never keyboard-only-reachable or pointer-only-reachable** |
| **No text rendered as an image**, ever — including headlines, figure labels and quoted evidence excerpts |
| **The `not testable` state is distinguishable from a measured zero without colour, in the figure and in its text equivalent** — the one accessibility rule on this site that is also an honesty rule |
| **VERIFIED defect for context:** only 8 `alt` attributes exist across the entire current `app/` and `components/` tree |

---

## 9. Motion

| Requirement |
|---|
| `prefers-reduced-motion` respected everywhere. **VERIFIED defect: no reduced-motion handling exists anywhere in the current codebase**, while `scroll-smooth` is set globally and cards apply translate transitions on hover |
| **The static state is the primary state.** A motion whose information is only available in motion is **disqualified**, not merely wrapped in a media query |
| **Nothing on the first screen animates**, and nothing gates first paint |
| **No number ever moves** |
| No scroll-jacking, no scroll-scrubbed narrative, no parallax, no page-transition animation |

---

## 10. Content and cognitive load

| Requirement |
|---|
| The reading column is protected at every width |
| **No section runs past four paragraphs without a heading, list, table or figure** |
| One argument per screen; one figure of full weight per page |
| **Nothing important is hidden behind a hover, a tooltip, a modal or an accordion that starts collapsed.** Modals and interstitials are banned outright independently |
| Link text describes its destination — **no "Learn more", "Click here" or "Read more"** |
| Plain language, which the approved voice already requires |

---

## 11. Announcements and dynamic content

| Requirement |
|---|
| Form submission result announced via a status region |
| Validation errors announced |
| A change in a figure's selected variant announced |
| A change in the problem page's recorded-outcome state announced, if that affordance is built |
| **No announcement is used for marketing content** — a live region is for state, never for a message the reader did not cause |

---

## 12. Where accessibility and honesty are the same requirement

Recorded because these three are the ones most likely to be treated as a compliance checkbox and traded away.

1. **Not-testable versus measured zero must be distinguishable without colour.** Colour-only would simultaneously fail a colour-blind reader and make a false claim about two AI systems.
2. **Limits at the same contrast and size as claims.** A smaller, greyer limit fails contrast and is the prohibited disclaimer treatment at once.
3. **Every figure's text equivalent.** It serves screen-reader users, print, and the retrieval systems the strategy depends on — the same asset, three audiences.

---

## 13. Verified accessibility defects in the current site

**Recorded as inherited context. These are architectural gaps a redesign should address structurally rather than patch.** Source: the approved Session 01 audit, read-only.

| # | Defect |
|---|---|
| 1 | **No skip link anywhere** |
| 2 | **`<main>` has no id**, so no skip link could target it |
| 3 | **Three unlabelled `<nav>` elements** |
| 4 | **No `prefers-reduced-motion` handling anywhere**, alongside global smooth scroll and hover transitions |
| 5 | **Only 8 `alt` attributes** across `app/` and `components/` |
| 6 | **The blog newsletter input has no label** |
| 7 | **The Services dropdown trigger is a button**, so `/services` is unreachable by keyboard from the header |
| 8 | **Colour-only link distinction sitewide** |
| 9 | **Contrast unverified and at architectural risk** under forced dark mode |
| 10 | **Heading hierarchy not fully verified** in the large page files |
| 11 | **No `role="alert"` or live region** on the contact form's success or error state |

**None of these is fixed by this document.** Each is a requirement above, and each becomes a design and implementation obligation at Gates 10 and 13.

---

## 14. What this document does not do

It does not measure, test, or certify anything. It sets no ARIA implementation pattern, no contrast value, no target size, no testing tool and no audit schedule — those belong to Gate 10, the implementation phase and `docs/14-qa/`.

**No conformance claim is made, and none may be made until a real audit has been run against a real build.**
