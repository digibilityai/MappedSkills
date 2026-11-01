# Evidence basis section removed from every case-study page (31 October 2026)

**OWNER REQUIREMENT.** Remove the standalone "Evidence basis" section from every case-study detail page. **LOCAL**, nothing committed, pushed, deployed, published or written to Contentful. Decision record: `DEC-107`.

## What changed
- `components/case-study/CaseStudyTemplate.tsx`: the `<aside class="ct-evidence">` with its "Evidence basis" heading and the `ct-h-ev` anchor are removed; the impact block is no longer opened by the note alone; the empty "tail" wrapper is rendered only when the outcome list leaves explanatory text, so no empty block or spacing remains. The hero link no longer says "outcomes and evidence" (now "All N outcomes" / "See the outcome"); it still jumps to `#ct-outcomes`, the outcomes board, which is not the removed section.
- `components/case-study/case-study.css`: the `.ct-evidence` rules are deleted.
- Not relocated: the notes are not rendered anywhere else. The `evidenceNote` data field, its Contentful query and mapper are left as they are (no CMS change); it is simply no longer displayed. The legacy template, the page file and the related cards never rendered it.
- **Metric definitions kept in the main narrative** (small additions to the local fixtures only, no figure changed): "Revenue return is not profit" now sits with every ROAS bullet that lacked it (AnybodyCanBake Google Ads, EKoching, Klenzmo, Bakersville, Phoenix Laundry; AnybodyCanBake Meta Ads reads "ROAS alone does not establish profit"); "These are ratios of period totals, not a tracked cohort" on the conversion-rate paragraphs (Meticulous, Bakedemy x2, Bblewrap, Talreja, Libros); "this compares two periods and does not show that the work alone caused the change" on Ameba and AnybodyCanBake SEO; ClassPe's growth is stated as "not growth attributed to social content alone". Already in the narrative and unchanged: reporting periods, "attributed", the InsurYo valuation kept separate from revenue, funding and marketing results, and Libros lifetime value kept apart from campaign revenue and ROAS. Provenance sentences ("supplied by", "not independently checked") and "not supplied" limitations lived only in the removed section and are not carried over, as requested.

## Verification
| Check | Result |
|---|---|
| All 21 case routes (20 listed plus unlisted Home Decor) at 1440, 390 and 360: HTTP 200, no "Evidence basis" text, no `.ct-evidence` or `#ct-h-ev`, no empty impact wrapper, no overflow, no page error | **PASS** (63 page loads, 0 failures) |
| Tests: 573, 572 pass, 0 fail, 1 skipped (existing). New `tests/case-study-no-evidence-section.test.cjs` (3 tests: template and CSS, other templates, narrative definitions) | **PASS** |
| `tsc --noEmit` | **PASS** |
| Fresh production build (isolated copy, no preview flag): exit 0, no built file contains "Evidence basis" | **PASS** |
| Contentful writes | none |
