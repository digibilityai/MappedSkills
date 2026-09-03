# Claude Session Handoff

## Session
- Session ID: 14 — Bounded Visual Validation of the Approved Creative Territory ("THE RECORD")
- Date: 2026-09-02
- Model: Claude Opus 5
- Role: Visual validation. **Not** design-system production, not implementation.
- Purpose: Answer one question — can THE RECORD express the approved MappedSkills strategy and UX
  visually, without academic/archive drift, SaaS drift or generic-agency drift?

## Context Read
- Files read: `CLAUDE.md` · `docs/00-project/CONTEXT_INDEX.md` · `CURRENT_STATE.md` ·
  `QUALITY_GATES.md` · `SESSION_HANDOFF_TEMPLATE.md` ·
  `docs/11-creative/` — `06_RECOMMENDED_ART_DIRECTION.md`, `07_VISUAL_GRAMMAR.md`,
  `08_EVIDENCE_DESIGN_LANGUAGE.md`, `10_IMAGERY_PHOTOGRAPHY_ILLUSTRATION.md`,
  `11_MOTION_AND_INTERACTION_PRINCIPLES.md`, `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md`,
  `14_DESIGN_ANTI_PATTERNS.md`, `16_COMMERCIAL_ENERGY_SYSTEM.md`,
  `17_ARGUMENT_APPARATUS_HIERARCHY.md`, `18_HOMEPAGE_VISUAL_NARRATIVE.md`,
  `19_FIGURE_PRIORITISATION.md`, `02_VISUAL_RESEARCH.md` (reference table) ·
  `docs/16-ux/` — `22_F1_USAGE_TAXONOMY.md`, `30_WIREFRAME_LEGEND.md`,
  `31_WIREFRAME_MASTER_HOMEPAGE.md`, `32_WIREFRAME_MASTER_COMMERCIAL.md`,
  `45_WIREFRAME_STATE_EVIDENCE_DISCLOSURE.md`, `48_WIREFRAME_RESPONSIVE_VALIDATION.md`,
  `51_GATE_9B_FINAL_ASSESSMENT.md` ·
  `docs/09-content-pages/copy/homepage.md`, `copy/seo.md` ·
  `docs/08-messaging/AI_SEARCH_LANGUAGE.md` (system permissions) ·
  `docs/04-ai-visibility/AI_VISIBILITY_BASELINE.md`, `AI_ACCESS_CAPABILITY.md`,
  `AI_CITATION_RESEARCH.md` (measurement facts and their limits).
- Repository areas inspected, read-only, for technical reality only: `app/globals.css`,
  `package.json` dependency list, top-level directory structure. **No production file was
  modified and none was read for the purpose of changing it.**

## Completed Work
1. Safety check: branch `test_branch`, HEAD `a68dfaec673e2698653296b531bbd133ccb10d57`, nothing
   staged, `README.md` pre-existing and untracked.
2. **Three materially different interpretations of THE RECORD** developed and documented, each
   against the seven required questions.
3. **One selected** — Direction 2, "THE WORKING SHEET" — with the other two rejected on stated
   grounds and **not merged**.
4. **A provisional visual language** defined to the minimum needed for the proof, with palette
   contrast ratios **computed** rather than estimated.
5. **Four rendered visual proofs**, each at WIDE and NARROW, built as self-contained static HTML.
6. **A full anti-pattern audit** against the ten named drifts, all 32 B-series prohibitions, the
   relevant A-series prohibitions, and the eight tests in `14` §D.
7. **The two Gate-9B-deferred perceptual tests re-run against rendered screens**, using
   measurement in the browser rather than assertion. **Neither was passed automatically; F3 was
   not passed.**
8. Verdict: **B — PROMISING, NARROW CORRECTIONS REQUIRED.**

### Tests actually run (in a browser, against the rendered proof)
- WCAG contrast, computed from the OKLCH values: ink **15.86:1**, apparatus ink **8.77:1 (AAA)**,
  accent **6.58:1**, set-piece rule **8.06:1** on the ground. `--ink-recess` measured at
  **4.43:1** and consequently restricted to figure strokes, never text.
- Horizontal body scroll at **1400px / 900px / 390px**: none at any width.
- Apparatus margin collapse at MEDIUM: confirmed; DOM order unchanged.
- Focus indicator: `3px solid` accent at `3px` offset, read from computed style.
- Type: body 18px Archivo, apparatus 16px IBM Plex Mono, H1 76px at WIDE, `tabular-nums
  lining-nums` active on `body` — all read from computed style.
- Greyscale: measured zero (filled square) vs not testable (hatched square) remain distinct with
  all colour removed.
- Script-free: verified zero `<script>` tags and zero inline handlers across all five pages.
- **F2** first-fixation: heaviest element per ~900px band, measured and classified.
- **F3** proportion: limit vs capability totals by raw rendered area **and** by
  emphasis-weighted area.

### Not tested
Print output was **not** produced or inspected. No user testing occurred. No production page,
build, lint or test was run.

## Files Created
```
docs/17-visual-validation/00_VISUAL_VALIDATION_BRIEF.md
docs/17-visual-validation/01_DIRECTION_EXPLORATIONS.md
docs/17-visual-validation/02_DIRECTION_DECISION.md
docs/17-visual-validation/03_PROVISIONAL_VISUAL_LANGUAGE.md
docs/17-visual-validation/04_VISUAL_PROOFS.md
docs/17-visual-validation/05_VISUAL_ANTI_PATTERN_AUDIT.md
docs/17-visual-validation/06_GATE10_DEFERRED_F2_F3_RETEST.md
docs/17-visual-validation/07_VISUAL_VALIDATION_ASSESSMENT.md
docs/17-visual-validation/prototype/README.md
docs/17-visual-validation/prototype/the-record.css
docs/17-visual-validation/prototype/index.html
docs/17-visual-validation/prototype/01-homepage-hero.html
docs/17-visual-validation/prototype/02-evidence-apparatus.html
docs/17-visual-validation/prototype/03-f1-the-run.html
docs/17-visual-validation/prototype/04-seo-commercial-section.html
docs/00-project/handoffs/SESSION_14_VISUAL_VALIDATION.md
```

## Files Modified
`docs/00-project/CURRENT_STATE.md` — a factual Session 14 status annotation only. **No gate
status was changed and no prior record was rewritten.**

**Not modified, deliberately:** `DECISION_LOG.md` · `QUALITY_GATES.md` · anything in
`docs/16-ux/` · anything in `docs/11-creative/` · any approved messaging or copy · strategy · IA ·
the production application, components, styles, assets or configuration · `README.md`.

## Decisions Proposed
- **Adopt Direction 2, "THE WORKING SHEET", for the bounded visual proof.** Not a design-system
  approval.
- **The apparatus is set at the body minimum in a different register, never at a smaller size.**
- **Figures are never scaled down to fit** — below the width they need they scroll inside their
  own container, and at NARROW they are replaced by a genuine vertical drawing.
- **A register label never appears without an argument-register element of greater weight in the
  same region** — the F2 correction.
- **The programme must define what "visual weight" means** before F3 can be decided either way.

## Decisions Approved During Session
**None.** Claude does not approve. Gate 10 is not passed, approached or implied.

## Evidence Gathered
Listed under "Tests actually run" above. All measurements are reproducible from
`prototype/the-record.css` and the four HTML files.

## Unresolved Issues
1. **F3 — proportion — NOT PASSED.** Emphasis-weighted 51.9% capability / 48.1% limits; raw area
   37.5% / 62.5%. The two measures disagree, and the programme has not defined which governs.
2. **F2 — passes on dense screens, fails on sparse ones.** Correction proposed, not applied.
3. **Hero action weighting** — the Session 14 brief §7 says "secondary booking"; approved
   `31`/`21` H1 say two `[ACT]` at equal confidence. Rendered per the approved artefact.
   **Reported, not fixed.**
4. **AI system enumeration** — approved copy says "four AI assistants" and "two systems we could
   not test"; the research baseline records 28 runs across five surfaces and "two of the six
   systems named in the charter". Probably reconcilable; **not written down anywhere, and F3
   (the figure) cannot be drawn until it is.** Reported, not fixed.
5. **The `changed` state pair (F7) was not visually validated** — blocked asset; rendering an
   "after" condition would have fabricated it.
6. Print behaviour implemented but unverified.

## Risks / Regressions
**No regression risk to production.** Nothing in the application was touched and the prototype is
imported by nothing.

Design risks carried forward: archive drift via rule and register-label proliferation (the
direction's own named residual risk, mitigated by both being countable) · monospace drifting up in
size or out of metadata · cumulative drift across a full site, which four slices cannot disprove ·
the hero composition when the fifth first-screen element eventually arrives.

## Assumptions Introduced
1. **Archivo and IBM Plex Mono are provisional stand-ins**, chosen to make the two registers
   testable. No family is approved and the proof does not depend on either.
2. **The palette values are provisional.** The *ratios* are computed and real; the hues are
   proposals.
3. **The Session 14 brief did not intend to alter approved UX** where its wording differs from
   an approved artefact. The approved artefact was followed and the difference reported.
4. **The F2/F3 emphasis proxy** (size² × width × boldness, and area × size × boldness) is a
   structured approximation of optical weight, not eye-tracking and not a perceptual measurement.
5. **No new live external site inspection was performed in this session.** Reference reasoning
   draws on the already-approved, already-dated observations R-01 to R-11 in
   `docs/11-creative/02_VISUAL_RESEARCH.md`. **No new dated observation of any external site is
   claimed anywhere in the Session 14 artefacts.**

## Recommended Next Task
An orchestrator review of `07_VISUAL_VALIDATION_ASSESSMENT.md`, then:
1. Rule on the two reported items.
2. **Define "visual weight"** for the proportion rule — it blocks F3 now and will block it again.
3. Decide whether Direction 2 proceeds to Gate 10, or whether one further bounded proof — **a
   complete page rather than a section pair**, which is the only artefact that can settle F3 — is
   wanted first.

## Next Session Should Read
1. `docs/17-visual-validation/07_VISUAL_VALIDATION_ASSESSMENT.md`
2. `docs/17-visual-validation/02_DIRECTION_DECISION.md` and `03_PROVISIONAL_VISUAL_LANGUAGE.md`
3. `docs/17-visual-validation/06_GATE10_DEFERRED_F2_F3_RETEST.md`, then open
   `docs/17-visual-validation/prototype/index.html` in a browser

## Stop Condition
**Stopped at the completion of the bounded visual validation.** The four slices are rendered, the
audit is complete, both deferred perceptual tests were re-run, and the verdict is recorded as
**B — PROMISING, NARROW CORRECTIONS REQUIRED**.

The next session must not begin full-site visual production, must not build the design system,
must not implement production code, and must not treat this session as approving Gate 10. Nothing
was staged, committed or pushed.

---

# SESSION 14A — NARROW VISUAL CLOSURE — appended 2026-09-02

## Session
- Session ID: 14A — Visual-weight definition + complete-page validation
- Model: Claude Opus 5 · Role: narrow closure of Session 14's two open issues
- Purpose: resolve the register-label defect and settle F3, and answer honestly whether Direction 2 carries a COMPLETE commercial page.

## Result
**A — VISUAL TERRITORY READY FOR DESIGN-SYSTEM DEVELOPMENT**, subject to `11_SESSION_14A_CLOSURE_ASSESSMENT.md` §5. This supersedes Session 14's **B** verdict. **Gate 10 is not passed, approached or implied.**

## What was done
1. **Register-label rule defined** (`08_REGISTER_LABEL_RULE.md`) — five binding parts derived from the defect's mechanism, not fitted to a rendering. RL-1 (never without a heading) is the operative fix; RL-4 rations labels to at most two per page on set-piece regions.
2. **Visual weight defined at programme level** (`09_VISUAL_WEIGHT_RUBRIC.md`) — separates STRUCTURAL AREA from PERCEPTUAL EMPHASIS; establishes *emphasis governs, area informs*; a decision procedure with **no numeric pass thresholds**; the viewport-height band as the unit.
3. **Complete `/seo` page rendered** (`prototype/05-seo-complete.html`) — all approved moves, header, breadcrumb, action region and footer, no validation chrome.
4. **F2 and F3 re-run** at 1400x900 and 390x844 against the rendered page, using the rubric written first.
5. Drift test, accessibility checks, and a repetition census.

### Ordering discipline, verifiable by timestamp
`08` (14:23:02) and `09` (14:23:45) were saved **before** `05-seo-complete.html` (14:25:54). No threshold or verdict condition was chosen after seeing a result.

## Tests actually run (browser, on the rendered complete page)
- **F2** — heaviest element per viewport band. WIDE: COMMERCIAL 5 / LIMIT 1 / EVIDENTIAL 0 of 6. NARROW: COMMERCIAL 8 / LIMIT 1 / EVIDENTIAL 0 of 9. **PASS both.**
- **F3** — all three rubric conditions met at both widths. **PASS both.** Narrowest margin: NARROW bands 3–4, one band.
- Repetition census: 4 hairline rules, 1 set-piece rule, **1 register label**, 2 ground changes, 2 ties, 2 disclosures (both closed by default), 1 figure, **0 cards, 0 icons, 0 scripts**.
- Contrast: ink 15.86:1, apparatus 8.77:1 (AAA), accent 6.58:1.
- Focus: verified with **real keyboard Tab** — `:focus-visible` true, solid 3px accent, 3px offset. (Programmatic `.focus()` does not match `:focus-visible` in Chrome and returns "none"; an earlier reading of "none" was that artefact.)
- No horizontal body scroll at 1400 / 900 / 390. No hover rule reveals content (all four inspected). Greyscale inspected at WIDE.
- NARROW first screen: move 1 + move 2 + one PRIMARY above the fold; the peer booking action ends 63px below it.

### Not tested
Print output was not produced or inspected. No user testing. No production build, lint or test.

## Three defects found by rendering, and fixed
1. **The figure's tabular equivalent occupied a full screenful** — moved into an EXPANDABLE disclosure (still in the DOM, crawlable, open in print). `19` §6 requires a figure to replace structure-carrying prose, not sit beside it.
2. **The figure scrolled sideways at NARROW** — replaced by a genuine vertical drawing below the width the horizontal form needs. Applies Session 14's own finding F-R1.
3. **There was no narrow header**, so a wrapped link list consumed half the first screen and pushed both hero actions below the fold. Replaced with the approved `46` STATE 3 native `<details>` panel — no script.

## Files created
```
docs/17-visual-validation/08_REGISTER_LABEL_RULE.md
docs/17-visual-validation/09_VISUAL_WEIGHT_RUBRIC.md
docs/17-visual-validation/10_COMPLETE_PAGE_PROOF.md
docs/17-visual-validation/11_SESSION_14A_CLOSURE_ASSESSMENT.md
docs/17-visual-validation/prototype/05-seo-complete.html
```

## Files modified
`prototype/the-record.css` (three additions, all applying existing findings) · `prototype/README.md` (pointer) · `07_VISUAL_VALIDATION_ASSESSMENT.md` (supersession annotation only — nothing rewritten) · `docs/00-project/CURRENT_STATE.md` (factual status annotation).

**Not modified:** `DECISION_LOG.md` · `QUALITY_GATES.md` · anything in `docs/16-ux/` or `docs/11-creative/` · approved messaging or copy · strategy · IA · any production file · `README.md`.

## Correction to Session 14's own reasoning
`02_DIRECTION_DECISION.md` §2.3 named the register label as Direction 2's scan layer. **Under RL-4 it appears at most twice per page and cannot be that.** Scannability is carried by the rationed hairline rules, the verb-led headings and the type-scale jumps. The selection reason was partly wrong and is corrected in `08` §5 rather than defended. The direction holds on its other three reasons; **the comparison against Directions 1 and 3 was not re-run.**

## Unresolved
1. Only **one** complete page exists. The homepage was not assembled as a complete page — its distinctive elements were rendered in Session 14 but never together.
2. Cumulative drift across 22 routes cannot be tested from one page.
3. The `changed` state pair (F7) remains unvalidated — blocked asset.
4. Print unverified. No user testing; F2 should be re-run with real buyers.
5. F3's NARROW margin is one band — re-check if the boundary copy grows or the ground-change allocation changes.
6. Upstream, reported not fixed: the hero action-weighting wording difference (does not affect `/seo`), and the AI-system enumeration (does not affect `/seo`, but **still blocks F3, the figure**).

## Recommended next task
Begin design-system development on Direction 2, and **make the complete homepage the first specimen** — re-running F2 and F3 against it with `09_VISUAL_WEIGHT_RUBRIC.md` unchanged. It carries F1 FULL, the F1 STATE pair and the first-screen apparatus exception, and is the only remaining structure that could surprise this territory.

## Stop condition
Stopped at the completion of the narrow closure. The design system was not begun, no full-site design was produced, no production code was implemented, and Gate 10 was not passed. Nothing was staged, committed or pushed.
