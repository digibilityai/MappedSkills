# B1 shared components: implementation report

**Status:** implemented, final review corrections applied, draft PR #76 awaiting owner visual approval. Not merged, not deployed. Base: `main` at `d40f9dd` (after B0, DEC-119).
**Authority:** Brand DNA 4.0 revision 4 (DEC-118), DEC-091, DEC-119, and the B1 section of `../sitewide-audit/SITEWIDE_BRAND_DNA4_AUDIT.md`. No DEC entry is added here, because B1 is not yet approved.

## Changed files

| File | Change |
|---|---|
| `app/direction-c.css` | Footer email link is a 44 px target that adds no layout height (`min-height: 44px; margin-block: -6px`). Header `.dc-label` 11.84 to 12 px; footer group labels (`.dc-ftr-h`) 11.52 to 12 px; footer chain label 11.2 to 12 px; footer base line 13.76 to 14 px |
| `components/case-showcase/case-showcase.css` | Heading emphasis no longer a second colour; "View all" is a 44 px target; spacing for the section number |
| `components/case-showcase/CaseShowcase.tsx` | Section number rendered without a dash; every period passes through `plainRange` |
| `lib/case-study-library.ts` | New pure helper `plainRange` (long dash between dates becomes "to"). `periodLabel` is unchanged |
| `tests/case-showcase.test.cjs` | Four new tests (formatter and dashes, heading colour and target, chrome type floors, email target) |

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

## Owner decisions applied (final review)

1. `periodLabel` stays unchanged. Its use on `/work` and the case pages belongs to B4.
2. Footer email link target raised to 44 px on desktop. Measured: link 44 px inside a 32 px row at 1440 and 1280; footer height unchanged by this rule at 1440, 1280, 390 and 360 (tested by switching the rule off in the page). At 390 and 360 the row was already 44 px.
3. `/seo` showcase heading wording unchanged. No page-specific copy changed.

Footer height after B1 (home): 1440 px wide 739 to 740 px, 390 wide 1365 to 1368, 360 wide 1380 to 1405. All of it comes from the 12 px label and chain floor wrapping, not from the email target. The 360 px change (+25 px) is the largest and is worth a visual look.

## Tests and checks (final)

| Check | Result |
|---|---|
| `npm test` | 622 tests, 621 pass, 0 fail, 1 skipped (pre-existing) |
| `npm run typecheck` | Clean |
| `npm run lint` | 0 errors, 14 warnings, none in touched files |
| `npm run build` | Succeeds |
| Responsive audit, 10 routes at 1440, 1280, 390, 360 (40 combinations) | 0 text under 12 px, 0 long dashes, 0 split-colour showcase headings, 0 targets under 44 px, no horizontal overflow |
| Keyboard (real Tab presses, headless Chrome, `/`, `/google-ads`, `/seo` at 1440 and 390; `a11y-check.mjs`) | Every stop in header, showcase and footer shows a focus ring and is visible; DOM order header, showcase, footer; stop counts 90 to 104 per page; no stop without a ring |
| Reduced motion (`prefers-reduced-motion: reduce`, `/google-ads`, `/seo`) | No clip-path hold on artwork, no rule transform, transitions at the browser's 0.00001 s reduce override; showcase fully visible |
| Consent (DEC-085) | No consent file changed. 1280 x 720: banner covers the hero button until a choice, then is removed and the button sits at 630 px of 720 (unchanged behaviour) |
| Navigation, case links, SEO, layout | The diff against `main` touches only `app/direction-c.css`, the showcase component and stylesheet, `plainRange` in `lib/case-study-library.ts`, and tests: no link, label text, order, route, metadata, JSON-LD or CMS code. Showcase hrefs come from the same data as before. Layout checked by the overflow audit and by footer heights above |

Not run: Safari, Firefox, real devices, screen reader, `verify:build:production` (needs `NEXT_PUBLIC_GTM_ID`).

## Evidence

Committed: `before/` and `after/`, six representative captures each (1440 and 390: home header, home footer, Google Ads showcase at 1440, SEO showcase at 390; plus the 390 header). Names are `<width>-<page>-<part>.jpg`. The full set (54 before, 54 after, all seven pages at 1440, 390, 360) is kept locally and untracked in `full-evidence/` of the B1 worktree. Regenerate with `node capture.mjs <baseUrl> <outDir>`; `audit.js` measures; `a11y-check.mjs` runs the keyboard and reduced-motion check. 1280 x 720 was checked live, not captured.

## Remaining for owner visual approval

1. Footer at 360 px is 25 px taller because the 12 px labels wrap; confirm it looks right.
2. Showcase headings are now one colour on all seven pages; confirm.
3. "to" in showcase periods (`/work` and case pages keep their en dash until B4).
4. Header primary button text is 13.4 px (a button, not a label); no change made.
