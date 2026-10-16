# AI Search R3: implementation report (G2, local commit on `feat/ai-search-redesign`, PR #14)

Baseline: `6e7a65e`. Owner approval: R3 design approved 2026-10-16 with one adjustment (1.5 s between steps). Recorded as `DEC-054` (including the DEC-015 clarification for the relocated self-test). Nothing pushed, merged or deployed.

## What changed (all inside `components/cplus/ai-seo/` plus the test and the decision log)
- `Sequence.tsx` (new, client): one sequencer, `STEP_MS = 1500`. Starts after 400 ms in view, plays once, stops on the last step (which stays highlighted), no controls, no live region, no focus movement. Numbered steps are real buttons once interactive; choosing one stops the sequence at once. Reduced motion or no IntersectionObserver: everything shown complete and still. Server render and no-JavaScript: everything complete.
- `Journey.tsx` (rewritten, client): the approved five steps and copy; Pause/Play/Replay removed.
- `IndustryExamples.tsx`, `Scenario.tsx`, `ReportingSteps.tsx` (new, client): the approved R3 sections.
- `AiSeoBody.tsx`: nine sections in the approved order; the hero, shortlist, FAQ and close are untouched.
- `content.ts`: R3 copy. The 31 August 2026 record is kept in full (plus the "asked about us by name" result, previously shown above the disclosure, now inside it). `RUNS`, the old test block, old reporting and "fit" content removed.
- `ai-seo.css`: R3 styles ported from `r3/mockup/src/r3.css`; obsolete rules for the removed sections deleted.
- `tests/ai-seo-page.test.cjs`: rewritten for R3 (14 tests).
- `docs/00-project/DECISION_LOG.md`: `DEC-054`.

## Deliberate deviations from the approved mockup
1. Animation 1.5 s (was 2 s): owner adjustment.
2. The tracking example carries a visible "Illustrative example" label (owner instruction). Reporting section is 18 px taller at 1440 (23 px at 375). The empty table header cell has the screen-reader text "Question" (axe `empty-table-header`).
3. The static (no-JavaScript or reduced-motion) journey shows the finished state: full orange rail and undimmed text. The mockup's static state showed a dashed, dimmed rail (a mockup quirk, fixed the same way in G2).
4. At 380 px and narrower the example table's cells may wrap and use a smaller size so nothing is clipped at 320 px (the mockup was not tested at 320).
5. Choosing a step in the scenario or industry story shows the whole story with that step highlighted (the mockup's `?step=N` preview froze later beats hidden; that flag is a review aid and not in production).

## Verification (production build, BUILD_ID `lGbNgwq6eXsFZUeLmtS9B`; scripts in `tools/verify-impl.cjs`, `pixeldiff.cjs`, `state-diff.cjs`)
- Static: `tsc --noEmit` 0 errors; `eslint .` 0 problems; `npm run build` OK; `verify:build` OK; `npm test` 109 tests, 108 pass, 0 fail, 1 skipped (pre-existing).
- Timing (mean gap between steps, Chromium / Firefox / WebKit): five steps 1502 / 1507 / 1501 ms; reporting 1506 / 1512 / 1495; scenario 1506 / 1498 / 1497; industry 1501 / 1506 / 1503. Every sequence ends on its last step; none loops; no Pause, Play or Replay button.
- Interaction: choosing a step stops the run and highlights it at once; Space and Enter on a focused step button work in all three engines; focus outline 3 px; autoplay never moved focus; 0 live regions. Note: Safari skips buttons in the Tab order by default (browser setting), so there Option+Tab or the setting is needed.
- Reduced motion: nothing moves, nothing hidden, steps still selectable. No JavaScript: all 28 sequence items visible, all four industries shown, record rows present.
- Layouts 1440 × 780, 1280 × 720, 900 × 800, 375 × 812, 320 × 640 in 3 engines: no horizontal overflow, no off-screen elements, no console errors. Hero CTA above the consent banner at 1440 × 780 (570 vs 653) and 1280 × 720 (544 vs 593).
- axe (WCAG 2.0 to 2.2 A/AA and best practice): 0 violations in all 3 engines.
- Fidelity: hero and shortlist 0.01 % pixels differ (1440), 0.04 % (375); industry and scenario (complete state) 0 %; five steps with a step chosen 0.12 % (1440), 0.00 % (375); reporting differs only by the added label.
- Regression: 7 routes (/, /google-ads, /social-media-ads, /seo, /ai-seo, /services, /contact) × 3 widths × 3 engines = 63 loads: all 200, one H1 each, no overflow, no console errors.
- Not verified: VoiceOver/TalkBack (SR-1 to SR-5), real devices (E1), GTM container Preview (E6).
