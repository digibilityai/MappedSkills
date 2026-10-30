# THE RESOLVE: typography and headline conventions (Stage 4 Batch 1)

Status: **reference for future pages. Documents existing CSS; changes none.** Recorded by `DEC-091`.
Authority: THE RESOLVE (`DEC-018`, `DEC-019`). The approved homepage is the canonical reference.
Tokens live in `app/globals.css` (`:root`, lines 28-41). Homepage values are in `components/resolve-home-r3/resolve-home-r3.css`.

Evidence labels: **VERIFIED** = read from the CSS named. **PENDING FOUNDER APPROVAL** = proposal, not a rule.

## 1. Fonts

| Role | Family | Source |
|---|---|---|
| Headings, numerals | Bricolage Grotesque, 800 | `--f-head` (`.rv3`), `--font-heading` (global) |
| Body, labels, buttons, forms | Manrope | `--f-body` (`.rv3`), `--font-sans` (global) |

## 2. Homepage scale (VERIFIED, `resolve-home-r3.css`)

All sizes are fluid `clamp()`. There are no breakpoint-specific heading sizes; the media queries at 1080 / 760 / 420 px change layout only.

| Role | Weight | Size | Line height | Tracking | Selector |
|---|---|---|---|---|---|
| H1 (hero) | 800 | `clamp(2.5rem, 4.8vw, 4.3rem)`, max 15ch | .99 | -.025em | `.rv3-hero h1` (:60) |
| H2 (section) | 800 | `clamp(2rem, 4vw, 3.5rem)`, max 18ch | 1.05 | -.025em | `.rv3-head h2` (:41) |
| H2 (variants) | 800 | `clamp(2rem, 3.6vw, 3.1rem)` fit/price, `clamp(2rem, 4.4vw, 4rem)` closing band | 1-1.05 | -.025em | `.rv3-fit-price h2`, `.rv3-close h2` |
| H3 (card) | 800 | `clamp(1.3rem, 2vw, 1.9rem)`; featured `clamp(1.6rem, 2.7vw, 2.5rem)`; small `clamp(1.05rem, 1.4vw, 1.25rem)` | 1.05-1.2 | -.015 to -.025em | `.rv3-a h3`, `.rv3-a--1 h3`, `.rv3-j h3` |
| Hero lead | 600 | `clamp(1.1rem, 1.6vw, 1.4rem)`, max 38ch | 1.45 | none | `.rv3-lede` (:61) |
| Body | 400 | 1rem; blocks `.95-1.05rem` | 1.6 | none | `:where(.rv3) p` (:20) |
| Supporting text | 400 | 1.02rem | 1.6 | none | `.rv3-support` (:62) |
| Eyebrow | 800 | .74rem, uppercase | 1.4 | .16em | `.rv3-eyebrow` (:38) |
| Caption / note | 600-700 | .78-.84rem | 1.35-1.4 | none | `.rv3-w-note`, `.rv3-hero-fig small` |
| Button | 800 | 1rem, min-height 52px, pill | 1.2 | none | `.rv3-btn` (:45) |

Reading width: body copy 46-54ch; global token `--resolve-measure: 58ch`; page wrap `--resolve-wrap: 1400px`, padding `--resolve-pad`.

Approved contextual variants (do not "correct" them): B2 pages use the same H1 `clamp(2.5rem, 4.4-4.5vw, 4.3rem)` with line-height .99 (`components/b2/b2.css`, `about.css`, `work.css`, `how-it-works.css`); `.pa` pages use `clamp(2.6rem, 4.5vw, 4.6rem)` / 1.04 (`components/paid-advertising`); case-study H1 is `components/case-study/case-study.css:245`; audience and ads pages tune H2 inside their own scope (`.ga41`, `.mr22`, `.d2c1`, `.edr2`). Per `DEC-091`, these stay.

## 3. Supporting roles already in the codebase (VERIFIED)

Breadcrumb and form-text values stay subject to verification against the actual components before any page adopts them.

| Role | Value | Selector |
|---|---|---|
| Form label | Manrope 700, 1rem / 1.3, Ink | `.ct-label` (`components/cplus/contact/contact.css:38`) |
| Form hint | .9375rem / 1.4, dim | `.ct-hint` (:40) |
| Form error | Manrope 700, .9375rem / 1.4, `--dc-tang-small` (#A83400) | `.ct-err` (:46) |
| Direction-C label | Manrope 700, .78rem, .15em, uppercase | `.dc-label` (`app/direction-c.css:121`) |
| Footer group label | Manrope 700, .72rem, .15em, uppercase | `.dc-ftr h2, .dc-ftr .dc-ftr-h` (`app/direction-c.css:391`) |
| Breadcrumb | defined in `components/cplus/Breadcrumb.tsx`; no single reference selector extracted | UNVERIFIED: remains subject to verification against the actual component |

## 4. H1-H6: semantics versus look

- **Outline** is chosen by document structure: one `h1`, then `h2`, then `h3`. Never skip a level for size.
- **Look** is chosen by class. Reuse the homepage class for the role you need.
- Text that names a group of links, a dialog or a form region is **not a section heading**. Use a `p` (or `span`) with the `aria-labelledby` relationship, not a heading element. See section 6.
- **H4 / H5 / H6: the proposed visual scale is provisionally accepted (`DEC-091`).** It is not permission for global CSS overrides or for changes to frozen pages; apply it only through scoped classes on new or later-batch pages. Heading levels must reflect document structure, and eyebrow styling does not automatically imply H6. Existing usage: `.b2-lrow h4` is a small uppercase label (Manrope 800, .7188rem, .14em). Proposal, only if a page needs a fourth level: H4 uses the small-H3 size (`clamp(1.05rem, 1.4vw, 1.25rem)`, 800, 1.2); H5 is 1rem Manrope 800; H6 is not used for outline. Nothing in the codebase has been changed to implement this.
- The global base layer (`app/globals.css:243-251`) sets large defaults for `h1`-`h4` (h1 up to `text-6xl`). Every page family overrides them; do not rely on them, and do not edit them (it would restyle frozen pages).

## 5. Dual-colour headline convention

Reference (VERIFIED, `resolve-home-r3.css:34-37`, `:96`):

| Ground | Headline | Emphasis phrase | Token |
|---|---|---|---|
| Light (Ground `#F7F3EC`, Paper `#FFFDF9`) | Ink `#141219` | `<em>` in burnt orange `#D94400` | `--resolve-accent-deep` |
| Dark (Ink Deep `#0F0D14`) | White `#fff` | `<em>` in tangerine `#FF5B04` | `--resolve-accent` |

Rules:
1. **The emphasised phrase carries the customer outcome or the meaningful contrast** (what they get, or the "this, not that"). It is not "the last words". Pick it by meaning first, then check it reads.
2. **Selective:** about five words at most, and less than the whole heading. If the whole heading would be coloured, leave it single-colour.
3. Use `<em>` (reset to `font-style: normal`), not an inline style or a `span` with colour.
4. **Contrast:** `#D94400` is for large display type on light. Small text on light uses `#A83400` (`--resolve-accent-dark`, token comment: clears 4.5:1). `#FF5B04` is for dark grounds only. The exact ratio of `#D94400` on `#F7F3EC` was not recomputed in this batch (UNVERIFIED).
5. Keep `text-wrap: balance`; do not force a line break inside the emphasised phrase.
6. **Single-colour headings remain valid** and are preferred for editorial and article pages, legal pages, FAQ, short labels, card titles and case-study section headings.
7. Approved per-page treatments and colour exceptions are kept as they are. Existing headlines are not rewritten by this batch, and no heading is globally recoloured.

Implementation note: the rule is currently scoped (`.rv3 h2 em`). A future page adds the same two lines to its own scope. A shared utility is **not** added now (nothing needs it yet; adding it would be unused code). Add one when the first new page needs it.

## 6. Shared heading semantics, as corrected in Batch 1

| Element | Before | After | Appearance |
|---|---|---|---|
| Footer column titles (`components/direction-c/SiteFooter.tsx`): Services, Who We Help, Company, Insights, Contact | `h2` | `p.dc-ftr-h`; each `nav` / `section` keeps `aria-labelledby` | unchanged (computed-style identical) |
| Consent banner title (`components/analytics/ConsentBanner.tsx`) | `h2` | `p`, still the `aria-labelledby` target of `role="region"` | unchanged |
| Header Services panel and mobile menu stage labels (`components/direction-c/SiteHeader.tsx`) | `h2.dc-label` | `p.dc-label`; `section` / `ul` keep `aria-labelledby` | unchanged |
| Legacy footer (`components/layout/Footer.tsx`, renders only on routes listed in `LEGACY_CHROME_ROUTES`, currently none) | `h2` | `p` | unchanged |

The shared chrome no longer adds headings to any page's outline. Page-body headings are untouched.
