# B1 shared components: implementation report

**Status:** implemented locally and in a draft PR for owner review. Not merged, not deployed. Base: `main` at `d40f9dd` (after B0, DEC-119).
**Authority:** Brand DNA 4.0 revision 4 (DEC-118), DEC-091, DEC-119, and the B1 section of `../sitewide-audit/SITEWIDE_BRAND_DNA4_AUDIT.md`. No DEC entry is added here, because B1 is not yet approved.

## Changed files

| File | Change |
|---|---|
| `app/direction-c.css` | Header `.dc-label` 11.84 to 12 px; footer group labels (`.dc-ftr-h`) 11.52 to 12 px; footer chain label 11.2 to 12 px; footer base line 13.76 to 14 px |
| `components/case-showcase/case-showcase.css` | Heading emphasis no longer a second colour; "View all" is a 44 px target; spacing for the section number |
| `components/case-showcase/CaseShowcase.tsx` | Section number rendered without a dash; every period passes through `plainRange` |
| `lib/case-study-library.ts` | New pure helper `plainRange` (long dash between dates becomes "to"). `periodLabel` is unchanged |
| `tests/case-showcase.test.cjs` | Three new tests (formatter and dashes, heading colour and target, chrome type floors) |

No page template, CMS content, URL, redirect, metadata, consent banner, link or link order changed.

## Compliance checklist

Measured on the built site (`next start`), computed styles, iframes at 1440, 1280, 390 and 360 px, ten routes: `/`, `/google-ads`, `/social-media-ads`, `/services`, `/work`, the four `/who-we-help/*` pages, `/seo`. 40 route and width combinations.

| Rule | Before | After |
|---|---|---|
| A3 labels at least 12 px (header, footer, showcase) | Footer group labels 11.52 px on every page; header panel label 11.84 px; footer chain 11.2 px | 0 text under 12 px in any combination (see note 1) |
| D-03 explanatory captions at least 14 px | Footer base line 13.76 px | 14 px. Showcase captions were already 15 px |
| A4 and D-10 emphasis by meaning | Showcase H2 "we have done" in a second colour on 6 pages (and the `/seo` heading) | Heading is one colour on every page. Wording unchanged |
| A9 no long dash | Showcase periods "Apr 2026 – Sep 2026", "Feb 2020 – Aug 2021", "Nov 2025 – Aug 2026" and the `/seo` "May–July 2026" override; `/seo` eyebrow "03 —" | "to" in every period; section number has no dash. 0 long dashes in showcase output |
| A12 mobile targets at least 44 px | Showcase "View all" 21 px at 390 | 44 px. 0 header, footer or showcase targets under 44 px at 390 and 360 (see note 2) |
| No horizontal overflow | Not re-tested before | None at any of the 40 combinations |
| Mobile menu | Walked open at 390 | No text under 12 px, no target under 44 px |
| Consent banner (DEC-085) | Unchanged | Unchanged. At 1280 x 720 the banner still covers the hero CTA until a choice is made; after "Reject analytics" it is removed and the CTA sits at 630 px of 720. This is the accepted DEC-085 behaviour |

Notes:
1. The audit script reports the three social icon links at 0 px. They are icon-only links whose text label is visually hidden; this is a measurement artefact, not visible text.
2. At 1440 and 1280 the footer email link is 32 px tall. It is an inline text link in a desktop pointer layout, was not changed, and is not a mobile target. Raising it would add height to the footer on every page, so it is left for the owner (question 3).

## Tests

| Check | Result |
|---|---|
| `npm test` | 621 tests, 620 pass, 0 fail, 1 skipped (the skip pre-dates this change) |
| `npm run typecheck` | Clean |
| `npm run lint` | 0 errors, 14 warnings, all in files this PR does not touch |
| `npm run build` | Succeeds |
| Representative consumers inspected | `/`, `/google-ads`, `/social-media-ads`, `/services`, `/work`, `/who-we-help/d2c`, `/seo`, mobile menu |

Not run: reduced-motion emulation, keyboard focus walk, screen reader, Safari, Firefox, real devices, `verify:build:production` (needs `NEXT_PUBLIC_GTM_ID`, absent locally).

## Evidence

`before/` and `after/`, JPEG element captures at 1440, 390 and 360 px: header, case showcase and footer for home, google-ads, social-media-ads, services, work, d2c and seo (pages without a showcase have none). Names are `<width>-<page>-<part>.jpg`. Regenerate with `node capture.mjs <baseUrl> <outDir>`; `audit.js` is the measurement script. 1280 x 720 was checked live in the browser pane (banner and first screen), not captured as files.

## Left unchanged, with approval questions

1. **`periodLabel` still writes an en dash** for `/work` cards and the 20 case pages (it feeds them directly). Changing it alters those templates, so it belongs to B4. The new `plainRange` can be adopted there in one line. Approve moving it into B1 instead?
2. **Showcase heading wording** is untouched, including "and how we measured it." on `/seo`. Only the colour changed. Any wording change is a copy decision (OD-09 family).
3. **Footer email link height on desktop (32 px).** Raise to 44 px, accepting a taller footer on all pages?
4. **Header primary CTA text is 13.4 px.** It is button text, not a label or caption, so no rule requires a change; noted for completeness.
5. **Per-page showcase configs** (`components/*/showcase.ts`) still contain the heading strings and `/seo` still carries its override period text with an en dash; the formatter handles the output, and no config file was edited.
