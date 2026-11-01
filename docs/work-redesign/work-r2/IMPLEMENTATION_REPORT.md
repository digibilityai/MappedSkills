# /work R2: implementation report (31 October 2026)

**Status: LOCAL**, `feat/paid-case-studies-six-local`, port 3500 running. Nothing committed, pushed, merged, deployed or written to Contentful. Decision: `DEC-108`. Design: owner-approved `docs/editorial-redesign/PROPOSAL_WORK_R2` (`PROPOSAL_WORK_R2.pdf`, section 9 of `EDITORIAL_AND_WORK_PROPOSAL.md`). Scope: `/work` and its pagination and filter states only.

## What was built
| Approved item | Implementation |
|---|---|
| Two columns desktop, one mobile | `.wk-grid` 2 columns above 720 px (so tablet is 2), 1 below; `components/b2/work.css` |
| Compact heading, introduction, controls, count | `Work.tsx` top block; `WorkLibrary.tsx`: Search, Service select, Industry select, "Clear filters", and a count line ("20 case studies", "Showing 1–12" / "13–20"; "2 of 20 case studies match") |
| Images whole | `WorkLibCard.tsx` renders `next/image` at each file's own width and height, `height: auto`; no fill, crop, overlay, badge, border or hover transform |
| Name, accurate service, one line | client name (the one link), service from the existing card eyebrow words ("Meta Ads", "Google Ads", "SEO") only when the study has a catalogue service key, then the line below |
| Outcome as readable HTML | the study's own **lead figure** (the first item of its outcome list when it is a figure), shown as `<strong>figure</strong> its definition and period`, exactly as the editor wrote it (`lead` in `components/cplus/work/studies.ts`); otherwise the short approved summary |
| Withheld proof stays withheld | `lead` is null while `isCaseStudyProofWithheld(slug)`; so Ameba Software shows its summary in production, and its figure only behind the final-four release switch |
| No hover zoom | none; hover underlines the name in tangerine, keyboard focus draws a 3 px tangerine outline around the whole card (the link is stretched over the image) |
| ClassPe, InsurYo | no service line (not catalogue services) |
| Removed | client-logo strip, route panel, "start here" block, chapter headings, evidence-rule copy, industry eyebrows, "Read case study" links, service chips, card frames |
| Shared card | `components/resolve/WorkCard.tsx` is untouched and no longer used by `/work`; home, about and service pages keep it |
| Preserved | all 20 studies, order, routes, asset associations, 12 per page (12 + 8), search, combined filters, `?service= &industry= q p` URLs, pagination links, Home Decor unlisted, metadata, indexing, production preview guards |

Files: new `components/b2/WorkLibCard.tsx`; rewritten `components/b2/{Work.tsx,WorkLibrary.tsx,work.css}`; changed `components/b2/work-cards.ts` (adds `toLibCard`), `components/cplus/work/{studies.ts,content.ts}` (adds `lead`; deletes the unused route, featured, library and evidence strings); tests `work-page`, `case-study-library`, `case-study-paid-batch`.

## Verification (`verify-work-r2.cjs`, `verification-results.txt`: 100 checks, 0 failures)
| Check | Result |
|---|---|
| Widths 1440, 820 (tablet), 390, 360; pages 1 and 2: 12 and 8 cards, 2 columns (1440, 820) and 1 (390, 360), one link per card, no overflow, 0 console errors, no broken image, text 15 px or more | **PASS** |
| Images whole: rendered ratio equals natural ratio (largest drift 0.01%) | **PASS** |
| No eyebrow, logo strip, route panel or "Read case study" text | **PASS** |
| Count line text; Service = SEO (2: Ameba Software, AnybodyCanBake, both labelled SEO); SEO + Education (1); SEO + Real estate (empty state); "Show all"; search "wanderlooms" (1, "Meta Ads"); empty search ("0 of 20"); "Clear filters" resets all controls; Education (7, ClassPe with no service line) | **PASS** at 1440 and 390 |
| Shareable link `?service=google-ads&industry=education` restores 3 cases; opening a case, **Back** restores the filtered view, **Forward** returns to the case | **PASS** at 1440 and 390 |
| Next goes to `/work/page/2` ("Showing 13–20"), Previous returns to page 1; `/work/page/2?service=social-media-ads` shows 8 results incl. Wanderlooms | **PASS** at 1440 and 390 |
| Keyboard: tabbing reaches a card link and draws a 3 px solid tangerine outline; hover underlines the name in tangerine; the image has no transform | **PASS** |
| Tests 573 (572 pass, 1 existing skip, 0 fail; `tests/work-page.test.cjs` rewritten for R2); `tsc --noEmit` clean; ESLint clean on changed files | **PASS** |
| Fresh production build (isolated copy, no `.env.development.local`, no preview flag): exit 0; `/work` shows the 5 published studies on one page, no logo strip or route panel, no Wanderlooms, no final-four figure or copy, conceptual illustrations kept for ClassPe, InsurYo and Ameba, and **no lead figure for Ameba** (proof withheld); Om Sai and AnybodyCanBake Google Ads show their existing lead figures | **PASS** |
| Manual screen-reader, real-device and cross-browser checks (Safari, Firefox) | **BLOCKED**: not run here |

## Notes and unresolved points
1. **Lead figures are the study's own first outcome.** For example Wanderlooms "6,607 attributed orders from Meta Ads, April 2026 to September 2026", AnybodyCanBake Google Ads "5.24× return on advertising spend … Revenue return is not profit." Where the first outcome is the efficiency figure, the image shows a different headline (1,410 paid enrolments); both are approved. Longer lines (up to four on mobile) are the ones that carry a definition. If a different outcome should lead on a card, change the order of that study's outcome list (a content decision, not code).
2. **Service wording:** cards say "Meta Ads" (the existing card copy) while the Service select says "Social media ads" (the catalogue name). Left as is; no taxonomy renamed.
3. **Industry select** offers an industry only when two or more studies use it (existing rule), so Software and technology, Financial services and insurance and Professional services appear only if they meet it; InsurYo and Ameba are found by search and the Service filter, not the Industry select.
4. **Om Sai Developer's logo chip** that used to sit over its photo is no longer shown (no overlays), and its photo is slightly shorter than the 8:5 cards, so that row's text sits about 10 px higher.
5. **AnybodyCanBake Meta Ads** artwork still prints a small "illustrative" caption inside the image (asset, unchanged).
6. The count line is new on `/work` (the earlier rule that no count is shown was superseded by the approved design).
7. Release: no new dependency on Contentful beyond the final-four requirements already recorded (DEC-106); the lead figures read each study's existing outcome list.

Screenshots: `screenshots/work-*-{1440,820,390,360}.png` (page 1, page 2, SEO, combined, empty search; 390 and 360 at 2x) and `WORK_R2_LOCAL_REVIEW.pdf`.
