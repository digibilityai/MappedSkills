# /conversion-optimization: G2 implementation report (local, not pushed)

Decision: `DEC-055`. Branch `feat/conversion-optimization-redesign`, cut from `origin/main` 77e6d9d (contains the AI Search release, PR #14).
Preview: production build, `PORT=3107 node server.cjs` from `MappedSkills-co`. Review page: `G2_REVIEW.html`.

## Changed files
- `components/cplus/conversion-optimization/ConversionBody.tsx` (rewritten; server component)
- `components/cplus/conversion-optimization/Journeys.tsx` (new; client components for the six animated stories)
- `components/cplus/conversion-optimization/content.ts` (rewritten copy)
- `components/cplus/conversion-optimization/conversion.css` (replaced; all classes `co-*`)
- `app/(pages)/conversion-optimization/page.tsx` (doc comment only; metadata, canonical, H1 unchanged)
- `tests/conversion-page.test.cjs` (new, 7 tests)
- `docs/00-project/DECISION_LOG.md` (DEC-055)
- `docs/conversion-redesign/g1/` (copy of the G1 copy, decisions, review page, mockup source and tools; the original folder in the main checkout is untouched) and `docs/conversion-redesign/g2/` (this report, screenshots, tools)
Not touched: `ai-seo/Sequence.tsx` (imported as is), any shared component, any other page.

## Deviations from the approved G1 design (all follow owner instructions)
1. Section 4 ("Did it work?") is no longer the luck/two-versions story. It is Improve → Measure → Review (CO-D06 revised). The G1 branch "Plenty each month: we test two versions side by side" is removed.
2. Section 5 headline and takeaway use the CO-D07 wording; the "Every enquiry was lost" claim is gone.
3. Kept from G1 section 4: kicker "How do we know a change worked?", the caption "We tell you what we saw. We don't claim more than we can prove.", and the `/how-it-works` link line. Review-tile and measure-tile descriptions ("We make the agreed changes.", "We see how visitors respond.", "We compare it with what came before.") are new, derived from the owner's supporting copy. **Owner to confirm.**
4. The numbered stations show the numbers the verdict refers to (CO-D04 confirmation): yes, "2" and "3" tiles carry "A redesign can help"; "1" and "4" carry "Not the website".
5. Bars in the Measure tile are deliberately neutral (no rising bar) so nothing implies improvement.

## Verification (run in this worktree)
- `tsc --noEmit`: pass. `npm run lint`: pass. `npm test`: 117 tests, 116 pass, 0 fail, 1 skipped (pre-existing skip).
- `npm run build` + `npm run verify:build`: pass. BUILD_ID `ihcC_v__YUuXofmCYGFWS`. `verify:build:production` (GTM required) was not run: no production GTM env here.
- Chromium 1440/1024/768/390/320, Firefox and WebKit 1440/390: no horizontal overflow, no console or page errors (`screenshots/verify-results.json`).
- Timing, six journeys, desktop and 390 and 320: step 1 is active at load, then steps at 1,500 ms intervals (revised from 2,000 ms, DEC-055 CO-D11 and DEC-056) (final measurement after the revision: 1,500 ms +/- 20 ms between steps; transitions 400 ms entrance, 200 ms hover and state). Plays once, finishes on the last step.
- Reduced motion: nothing highlighted or hidden, all four "How we work" pictures shown. No JavaScript: full content, 0 step buttons, nothing hidden (`checks.json`).
- Keyboard: 15 step buttons with labels; Enter stops the sequence and shows the chosen step; 3px focus outline.
- CTAs: `/contact`, `/schedule-call` (hero and close); in-body links `/problems/traffic-but-no-enquiries`, `/how-it-works`. Title, description, canonical and 2 JSON-LD blocks unchanged.
- Regression (loaded at 1440 and 390): `/`, `/google-ads`, `/social-media-ads`, `/ai-seo`, `/seo`, `/how-it-works`, `/contact`: 200, no overflow, no console errors (`tools/regress.cjs`). The AI Search animations were not modified.

## Outstanding risks
- Consent banner: the shared fixed banner covers the lower part of the screen until a choice is made, on every page. At 320 x 700 it is 255 px tall, and focusing an element near the bottom can leave it behind the banner (same as other pages). Not changed (shared component).
- Safari/VoiceOver and TalkBack checks (SR-1 to SR-5) and a container-level GTM Preview check (E6) remain manual.
- The meta description still says "changing the page is the wrong intervention" (unchanged, flagged in G1).
- The evidence wording "wasn't working" rests on `CURRENT_CODEBASE_AUDIT.md` C1 (old form only simulated sending). No new claim was added.
