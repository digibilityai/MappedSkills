# D2C R1.1: focused storytelling and motion refinement

27 October 2026. Local only. Same preview route as R1 (edited in place): http://localhost:3412/d2c-preview-r1 (noindex, 404 in production, unchanged). Nothing committed, pushed, merged or deployed. Reference: `AUDIT_JOURNEY.md`.

## 1. Before and after
| Item | R1 | R1.1 |
|---|---|---|
| Section 2 to 3 bridge | "People reach a purchase in different ways. These paths overlap, and no path is certain." | "Each route to a purchase costs something different to win, so it helps to see how people actually buy. The routes overlap, and none is certain." |
| Section 3 to 4 bridge | "We recommend the mix after understanding your products, not before. Most brands start with one or two of these." | "Each route needs a different kind of ad, so we recommend the mix after understanding your products. Most brands start with one or two." |
| CTA after readiness | None between hero and closing band | One compact row beside the closing line: "Not sure what is ready? Tell us about your store." and "Discuss Your Advertising" to `/contact` (same label and destination as the hero and closing CTAs). Closing band unchanged |
| Hero illustration | Lower half empty until 2.5 s; sequence ended at 4.0 s | Whole scene present from the first frame as a quiet outline (28% strength); each step then comes to full strength. Ends at about 3.0 s. Final state identical to R1 |
| Receipt bars | Static | Each bar grows once, in order (margin, discounts, shipping, returns, acquisition cost), 0.6 s each at 0.16 s intervals, then the dashed "What is left" outline fades in; starts when the receipt is half in view; about 1.6 s total. No new figures |
| Buying-path stagger | Unused `--i` values in markup | Removed. A stagger would suggest the three routes are sequential steps, which section 3 says they are not |
| Measurement list markers | 01 to 06 numerals in an ordered list | Neutral square markers in an unordered list |
| Wanderlooms heading | "Work with a D2C brand." | "An example from D2C advertising." Card unlinked, conceptual-artwork disclosure and copy unchanged, no ROAS or revenue |

## 2. Cookie banner at 390px (OBSERVED, not changed)
The banner is the site's deliberate fixed, non-modal consent control (its source documents this). At 390x844 it is 209 px tall and starts at y 635. The hero art spans y 532 to 763, so the lower third (the order-versus-cost card and its legend) sits under the banner until the visitor chooses or scrolls. At 320x640 the banner is 254 px tall.
I found no safe small fix: closing the gap would need the art to move up about 90 px, which means changing the approved hero layout, and restyling the banner would touch shared consent UI and its "two identical choices" rule. I made no change to the banner, its behaviour or the hero layout.
What R1.1 does help: the art is now a complete outline from the first frame, so the visible top row (search, store, cart) reads as the start of a story rather than an empty box. Verified: the banner does not block anything, all CTAs remain clickable above it.
**Decision for the owner:** accept this (recommended), or approve a mobile-only hero compaction (smaller art and tighter spacing), which still will not clear the banner on phones shorter than about 800 px.

## 3. Dev-server "reload" (RESOLVED, not a reload)
At about 640 ms every page in this dev server performs a same-document `history.replaceState` to its own URL (Next.js hydration). Measured on this preview, on the untouched `/meta-ads-preview-r22` and on the approved-route `/who-we-help/d2c`: one navigation request, same document before and after, no animation restart. Development only; no production routing touched.
Separately, in the earlier audit one frame did show a restarted hero while the dev indicator read "Compiling". That was the dev server recompiling during capture. Not reproduced in four clean 7 s runs. Unresolved only in the sense that the exact recompile trigger was not identified; it cannot occur in production.

## 4. QA (run 27 October, Chrome)
| Check | Result |
|---|---|
| 1440, 390, plus 320 and 768 spot checks | No horizontal overflow, scrollY 0 after load, CLS 0.0 at all four widths |
| Console errors | None at 320, 390, 768. One dev-only "Router action dispatched before initialization" at 1440 in a script that navigated twice during hydration; not reproduced in two clean 1440 runs |
| Settled states | Hero scene, beams and all four hero groups at opacity 1 after load; receipt bars at identity transform; dashed outline visible |
| Reduced motion | Hero groups at opacity 1 with no animation, receipt never armed, bars unscaled |
| No JavaScript | Receipt not armed (final state), 0 pending reveals, readiness CTA present |
| CTAs | Header, hero, readiness, closing: `/contact`. Hero and Wanderlooms "See our work": `/work`. Section 4: `/google-ads`, `/social-media-ads` |
| TypeScript, ESLint (new files) | Clean |
| `node --test tests/*.test.cjs` | 478 pass, 0 fail, 1 skipped |
| Dash check | No em dashes, en dashes or spaced hyphens in copy |
| Approved pages | No file outside the D2C R1 folders was edited. `git status` shows only `app/d2c-preview-r1/`, `components/d2c-r1/`, `docs/d2c-r1/` as mine; the older unrelated worktree changes (including `tests/paid-advertising-d2c.test.cjs`) were already present and untouched |
| Not run | Screen reader, Safari, Firefox, real devices |

Screenshot note: full-page captures hide the cookie banner and release scroll-reveal blocks so lazy blocks are not blank.

## 5. Evidence (`docs/d2c-r1/r11/`)
- Full pages: `d2c-r11-1440-full.png`, `d2c-r11-390-full.png`
- Hero frames: `hero-1440-t0_05.png` to `hero-1440-t3_3.png`, `hero-390-t0_05.png` to `hero-390-t3_3.png`
- Receipt frames: `receipt-1440-t0_1.png` to `receipt-1440-t2_3.png`, same for 390
- Readiness CTA: `readiness-cta-1440.png`, `readiness-cta-390.png`, `readiness-cta-320.png`

## 6. Files changed (all new in R1; edited in R1.1)
- `components/d2c-r1/content.ts` (two ledes, readiness CTA, Wanderlooms heading)
- `components/d2c-r1/D2CR1.tsx` (CTA row, receipt wrapper, markers, removed unused stagger)
- `components/d2c-r1/d2c-r1.css` (hero start state and timing, receipt animation, CTA row, markers)
- `components/d2c-r1/InViewOnce.tsx` (new, 20 lines: one-time in-view trigger, final state without script or under reduced motion)
- Reverse everything: `rm -rf components/d2c-r1 app/d2c-preview-r1 docs/d2c-r1`

## 7. Remaining issues
- Cookie banner covers the lower hero art on first mobile view (section 2; owner decision).
- Receipt and reveal animations wait for an intersection observer, so in a hidden tab they stay at their start state until the tab is shown (as other R3 pages).
- Hero line 1 still shows a linear shopper path while section 3 says routes are alternatives; the "Illustrative" caption covers it.
