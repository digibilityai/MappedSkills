# Site-wide experience review, revision 2 (31 October 2026): proposal only

No application code, commit, push, CMS write or deployment. Revision 2 follows the owner's correction (DEC-111): no strict fold rule; seven quality checks instead. The completed audit is reused, not repeated.

| File | What it is |
|---|---|
| `EXPERIENCE_REVIEW_R2.pdf` (and `.html`) | The revised review: change list, seven checks, journeys, motion, previews, quality-check results, discarded items, plan, decisions |
| `preview/index.html` | Revised interactive previews for /blog, /press, /research (open the file, or http://localhost:3601/) |
| `SECTION_HEIGHTS.md` | Reference data from the earlier audit: heights, words and real reading flags per section. Not a score |
| `data/` | `measure.json`, `analysis.json` (earlier audit), `preview-quality.json` (revision 2 checks), `content.json` (recorded copy used by the previews) |
| `qualitycheck.cjs`, `frames.cjs`, `build-report.cjs`, `preview/build.cjs`, `measure.cjs`, `analyze.cjs` | Scripts (the preview server must run on 3601 for the checks; `measure.cjs` needs the dev server on 3500) |

Superseded and removed: revision 1 (`EXPERIENCE_REVIEW.pdf`, `FOLD_AUDIT.md`, fold scoring).

Limits: sections are the outermost `section` elements; /thank-you and /launch-checklist have none; collapsed states only; real-device and screen-reader checks were not run.

**Status (31 October 2026):** revision 2 approved for local editorial implementation (with three refinements); implemented as `DEC-112`. Report: `docs/editorial-redesign/r3/batch2/IMPLEMENTATION_REPORT.md`. Other page types remain proposals.
