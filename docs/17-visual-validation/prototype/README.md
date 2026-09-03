# Session 14 Visual-Validation Prototype — READ THIS FIRST

**Session:** 14 — Bounded visual validation · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED. Not approved. Not production. Not a design system.**

---

## 1. What this is

Five static HTML files and one stylesheet that render the **four bounded validation slices**
required by the Session 14 brief. They exist so the question *"can THE RECORD express the
approved strategy and UX visually?"* can be answered by looking at something rather than by
reading a description of something.

| File | Slice |
|---|---|
| `index.html` | Entry point — the four slices |
| `01-homepage-hero.html` | Slice 1 — homepage hero, WIDE and NARROW |
| `02-evidence-apparatus.html` | Slice 2 — evidence apparatus, WIDE and NARROW |
| `03-f1-the-run.html` | Slice 3 — F1 the run: FULL, STATE, and the narrow vertical form |
| `04-seo-commercial-section.html` | Slice 4 — `/seo` moves 5–7, WIDE and NARROW |
| `05-seo-complete.html` | **Session 14A** — the COMPLETE `/seo` page. No validation chrome, so viewport bands are the bands a reader experiences. Inspect at 1400x900 and 390x844 |
| `the-record.css` | The provisional visual language. Deliberately incomplete |

## 2. What this is NOT

- **Not production.** Nothing in `app/`, `components/`, `styles/`, `public/`, `lib/`, `hooks/`
  or any configuration file was created, modified or read for the purpose of changing it.
  This directory is self-contained and is not imported by anything.
- **Not the design system.** No exhaustive token set, no component API, no full state matrix,
  no page templates, no numeric breakpoints. `the-record.css` defines only what the four
  slices need and says so at the top of the file.
- **Not Gate 10.** Nothing here approves the design system, the homepage, or any page design.

## 3. How to view it

Open `index.html` for the four Session 14 slices, or `05-seo-complete.html` for the Session 14A
complete-page specimen. It is plain static HTML with one stylesheet.

The two provisional typefaces load from Google Fonts. **With no network the pages fall back to
system faces and every structural claim in the proof still holds** — the proof does not depend
on the specific families, which are a Gate 10 decision.

To view it over HTTP instead (which is how the screenshots in `04_VISUAL_PROOFS.md` were taken):

```bash
python3 -m http.server 8931 --directory docs/17-visual-validation/prototype
```

## 4. Properties that were verified by rendering, not asserted

- **No script.** There is no `<script>` tag and no inline event handler on any page. Every
  disclosure is a native `<details>`; with JavaScript disabled the evidence is still reachable.
- **No motion.** There is no animation, transition-on-load, parallax, counter or scroll effect
  anywhere. The static state is the only state.
- **No horizontal body scroll** at WIDE, MEDIUM or NARROW. Where a figure is wider than its
  container it scrolls **inside its own container**.
- **Focus is visible** — a 3px mark-coloured ring at 3px offset, verified in the browser.
- **Contrast**, computed from the OKLCH values: ink 15.86:1, apparatus ink 8.77:1, accent
  6.58:1 against the ground. The apparatus register is AAA, not grey-on-grey.
- **Greyscale**: every evidence status is distinguishable by shape and word with all colour
  removed, including a measured zero versus a not-testable state.

## 5. Content discipline

Every claim, limit, date, sample and finding rendered in these files is **approved copy or
first-party measurement already recorded in this repository**. Nothing was invented for the
proof: no metric, no proportion, no client result, no testimonial, no logo, no rating, no
photograph, and no fabricated "after" state for the blocked intervention record.

`F17` (the `/how-it-works` stage sequence) is **BLOCKED** and appears nowhere, in any form.
