# B3: Industry pages to Brand DNA 4.0

**Date:** 2 November 2026. **Branch:** `feat/b3-industry-brand-dna4` from `main` `2f2a7f046c40f532fef506c22b4785db0016dd55`. **Decision:** DEC-121.
**Status:** draft PR for owner visual review. Not merged, not deployed, no CMS change.
**Pages:** `/who-we-help/d2c`, `/who-we-help/education`, `/who-we-help/real-estate`, `/who-we-help/enquiry-led-businesses`.

## 1. Audit summary (baseline)

A read-only audit of `main` `2f2a7f0` (production build, measured at 1440 x 900, 1280 x 720, 390 x 844 and 360 x 800) rated all four pages PARTIAL against Brand DNA 4.0. Structure was sound (one H1, no skipped levels, no overflow, no long dashes, visible focus, reduced motion respected, FAQPage in sync). The defects behind the PARTIAL ratings:

- FAQ answer links on Education, Real Estate and Enquiry-Led used the light-ground link colour #A83400 on the Ink Deep FAQ: **2.90:1** (WCAG AA needs 4.5:1).
- 17 labels at 11.5 to 11.8 px (floor 12 px) and 7 captions at 13.1 to 13.8 px (floor 14 px).
- "A few questions before we talk" was two-colour on all four pages; "shape every campaign" and "shape every enquiry" emphasised non-outcomes.
- The D2C and Education hero "See our work" link went to the unfiltered `/work` although industry filters exist.
- The D2C campaign-roles section was the tallest on any industry page (1,328 px at 1440, 2,171 px at 390).
- On Enquiry-Led the showcase sat on Paper directly after the Paper "How we work" section.

The owner approved these five correction groups as B3 Scope v1.0. Everything else from the audit is deferred (section 6).

## 2. Changes by page

| Group | D2C | Education | Real Estate | Enquiry-Led |
|:-|:-|:-|:-|:-|
| B3-01 FAQ links | (no FAQ link) | `rv3-tl rv3-tl--dark` | `rv3-tl rv3-tl--dark` | `rv3-tl rv3-tl--dark` (both links) |
| B3-02 labels to .75rem | `.d2c1-receipt-l`, `.d2c1-chan`, `.d2c1-plat` | `.edr2-chart-l`, `.edr2-tag`, `.edr2-chan`, `.edr2-plat`, `.edr2-h-tag` | `.rer2-tag` | `.e11-inbox-h`, `.e11-convo-h`, `.e11-row-tag`, `.e11-ask-l`, `.e11-ex-l`, `.e11-plat` (and its moment span), `.e11-bridge-l` |
| B3-02 captions to .875rem | `.d2c1-ledger`, `.d2c1-receipt-c`, `.d2c1-role-f` | `.edr2-legend`, `.edr2-cap`, `.edr2-role-f`, `.edr2-h-sm` | | |
| B3-02 emphasis | FAQ H2 one colour | FAQ H2 one colour | FAQ H2 and "Five decisions shape every campaign." one colour | FAQ H2 and "Five choices shape every enquiry." one colour |
| B3-03 work link | hero link follows the showcase's verified View all target | same | | |
| B3-04 roles layout | margin fix, two-column ownership lists from 1081 px, label beside the name up to 560 px | | | |
| B3-05 showcase ground | | | | showcase on Ground, cards on Paper (page-scoped CSS) |

Heading text, levels and ids are unchanged; only the `<em>` wrappers were removed, as B2 did. Visible page text is byte-identical to `main` on all four pages.

**B3-03 detail.** The showcase already computes its "View all" link with `viewAllFor`: `/work?industry=<sector>` only when the public library shows its filters and offers that sector, otherwise plain `/work`. The hero now reuses that value (`showcase?.viewAll.href`), falling back to `/work` when there is no showcase. No URL, filter or study was added. Result: D2C `/work?industry=ecommerce-retail` (4 studies: Klenzmo, Bakersville, Advit Prints, Wanderlooms), Education `/work?industry=education` (7 entries). Both return 200 and apply the filter on a hard load and on in-app navigation (checked in headless Chrome and by clicking the link in the preview). Label "See our work" unchanged.

**B3-04 detail.** The site-wide `li` rule gives every list item except the last a 12 px bottom margin. In this section it made four of the five role cards 12 px shorter than the fifth and added 12 px under every ownership-list row. Resetting it fixes the uneven cards and removes that unintended space. On wide screens each ownership list flows into two columns (5 items in 3 rows, 4 in 2). On phones the platform label sits on the same row as the campaign name (source order unchanged, so screen readers still read the label first). No copy, item, illustration or section order changed; no fixed heights; spacing tokens untouched (A5).

**B3-05 detail.** `.e11 section.cs` takes the Ground token and `.e11 .cs .cs-card` the Paper token, with the existing Line border (the A13 raised-card pattern). The sequence is now Ground (Decisions), Paper (How we work), Ground (showcase), Ink Deep (FAQ). The shared component, its cards, links, figures, eligibility and View all are unchanged.

## 3. Measurements

### D2C campaign-roles section (`d2c1-hp`)

| Viewport | Before | After | Change |
|:-|:-|:-|:-|
| 1440 x 900 | 1,328 px | 1,219 px | 109 px shorter (8.2%) |
| 1280 x 720 | 1,269 px | 1,160 px | 109 px shorter (8.6%) |
| 390 x 844 | 2,171 px | 1,946 px | 225 px shorter (10.4%) |
| 360 x 800 | 2,295 px | 2,071 px | 224 px shorter (9.8%) |

Role cards at 1440: before 311, 311, 311, 311, 323 px; after five equal cards of 311 px. D2C page height: 8,085 to 7,978 px at 1440; 11,644 to 11,425 px at 390.

### Type and contrast

| Check | Before | After |
|:-|:-|:-|
| Text under 12 px in `<main>` (all four pages, all widths) | 17 label selectors | 0 |
| Captions under 14 px | 7 | 0 (remaining sub-14 px items are 12 px labels or platform mock-up text, exempt under A3) |
| FAQ link contrast (Education, Real Estate, Enquiry-Led) | 2.90:1 | about 19.3:1 (white on #0F0D14); hover keeps white (arrow shift only); focus ring white 3 px; no visited colour rule, so visited stays white |
| Two-colour FAQ / "shape every" headings | 6 | 0 |

## 4. Verification

| Check | Result |
|:-|:-|
| `npm test` (641 tests, including the new `tests/b3-industry-pages.test.cjs`, 6 tests) | PASS: 640 pass, 1 skipped (existing), 0 fail |
| TypeScript check (`npm run typecheck`) | PASS |
| `npm run lint` | PASS: 0 errors; 14 warnings, all in files B3 does not touch |
| `npm run build` (webpack) with `NEXT_PUBLIC_GTM_ID` set in the environment only | PASS; four routes prerendered static |
| `npm run verify:build:production` | PASS: 59 prerendered pages, GTM inlined, BUILD_ID `_5BkwLjObB5jegKc1kHtE` (local) |
| No horizontal overflow at 1440, 1280, 390, 360 | PASS (0 px on all four pages at all four widths) |
| Clipped text | PASS (no fixed heights added; one-time reveals all play under a real scroll at all four widths) |
| Keyboard: every Tab stop shows a ring and is on screen (1440, 390) | PASS (92 to 106 stops; the two Enquiry-Led view radios are visually hidden and draw their ring on the label, unchanged from `main`) |
| Reduced motion | PASS: nothing running or pending; the three Enquiry-Led "Relevant" tags stay hidden by design until that view is chosen (unchanged) |
| Hero CTAs and destinations | PASS: primary CTAs unchanged (`/contact`); hero CTA positions unchanged at all widths (within 1 px); only the two "See our work" targets changed |
| SEO against `main`: titles, descriptions, canonicals, robots, OG, JSON-LD (Organization, BreadcrumbList, FAQPage), heading outline | PASS: identical on all four pages at every width |
| `sitemap.xml`, `robots.txt` | PASS: byte-identical to `main` |
| Redirects, metadata helpers, eligibility and library code | PASS: `next.config`, `app/sitemap.ts`, `lib/metadata.ts`, `lib/case-study-*`, `components/case-showcase` unchanged |
| Case-study preservation | PASS: same showcase cases, figures, periods and alt text on every page; case-study test suites pass |
| Visible page text | PASS: identical to `main` |

Not run: Safari, Firefox, real devices, screen readers, 200% zoom.

## 5. Screenshots

`before/` (`main` `2f2a7f0`) and `after/` (this branch), same names:

- `1440-d2c-roles.jpg`, `390-d2c-roles.jpg`: B3-04 (and the D2C label and caption floors).
- `1440-enquiry-led-method-showcase.jpg`, `390-enquiry-led-method-showcase.jpg`: B3-05.
- `1440-education-faq-link.jpg`, `390-education-faq-link.jpg`: B3-01 and the single-colour FAQ heading (pricing answer opened).
- `1440-real-estate-decisions.jpg`: single-colour "Five decisions shape every campaign."
- `390-enquiry-led-who-labels.jpg`: 12 px labels.

Local preview of this branch: `http://localhost:3542/who-we-help/d2c` (and the other three routes), `next start` on the production build.

## 6. For the owner

**Visual approval needed (frozen designs, DEC-085):**
1. D2C phones: the platform label (GOOGLE, META) now sits beside the campaign name instead of above it.
2. D2C wide screens: each ownership list in two columns.
3. Enquiry-Led: showcase on Ground with Paper cards.
4. The 12 px labels and 14 px captions on all four pages, and the single-colour headings.

**Limitations found:**
- `/work` applies `?industry=` after hydration (its server HTML is the unfiltered library). Visitors without JavaScript see all studies. This is existing `/work` behaviour, shared with the showcase View all links; `/work` was not touched.
- The fallback work-card notes (`.d2c1-w-note`, `.edr2-w-note`, `.rer2-w-note`, 12.5 px) are not rendered while each page has a public showcase. They were outside the measured scope and are unchanged.
- Enquiry-Led still has about 4,300 px of light sections before the FAQ; B3-05 removes the Paper-to-Paper join only.

**Deferred, as instructed:** showcase "Read the case study" tap target (35 px on mobile); animation durations (D-04 open); the 1280 x 720 consent-banner overlap (DEC-085 exception); D2C pricing and call links; copy rewrites; the one-time reveal threshold on very short viewports; the optional items in the audit (hero art, qualifier trims, Education consolidation, FAQ order, OG images).
