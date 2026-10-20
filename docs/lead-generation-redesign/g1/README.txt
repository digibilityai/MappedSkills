MappedSkills Lead Generation G1 package (G1 APPROVED by the owner 2026-10-17, DEC-057; G2 implemented on branch feat/lead-generation-g2)
Page: /lead-generation. Prepared 17 Oct 2026 for the G1 owner-review gate; updated the same day for LG Owner Corrections 01 and 02 and Confirmations 03 and 04.

What is in Git (docs/lead-generation-redesign/):
  g1/LG_G1_DECISIONS.md   decision register LG-D01 to LG-D30 with the approval marks of DEC-057
  g1/LG_G1_COPY.md        every headline, paragraph, tile label, caption and CTA; live vs proposed
  g1/LG_G1_FEEDBACK_AND_ARCHITECTURE.md  owner-feedback mapping, existing-page assessment, architecture, quality gate
  g1/LG_G1_CORRECTION_01.md, _02.md, LG_G1_CONFIRMATION_03.md, _04.md  the owner corrections and confirmations (04 holds the final copy and the owner-approval checklist)
  g1/LG_G1_FORM_IMPACT.md budget-line removal: the live hero panel was an illustration, not a form
  g1/LG_PRODUCTION_CORRECTION_PROPOSAL.md  separate, narrow proposal for the live-page factual claims (LG-D24; NOT authorised)
  g1/owner-pdf/LG_owner_review.pdf  the owner's annotated review (only surviving copy of the original; keep)
  g1/mockup/              the approved interactive mockup (open mockup/index.html in a browser; flags ?motion=reduce ?step=N ?banner=0;
                          header and footer menu links are root-relative and do not work from disk)
  g1/screenshots/         JSON results and the captured live page baseline (live-info, live-fold, live-chrome, live-main.html, g1-checks.json, checks.json)
  g1/tools/build.cjs      rebuilds mockup/index.html from mockup/src/parts (node tools/build.cjs, run inside g1)
  g2/LG_G2_REPORT.md      G2 implementation report, verification results, deviations
  g2/tools/               portable verification scripts (see the report, "Reproduce")
  g2/screenshots/         result JSON only: checks.json, metrics.json, compare/summary.json

What is NOT in Git (repository weight, non-portable local paths): the 192 review screenshots (G1 before/proposed/storyboard, G2 g1/g2/compare,
the owner PDF page images), the two review pages (LG_G1_REVIEW.html, LG_G2_REVIEW.html), and seven superseded G1 tools. They are in the evidence
archive LG_G1_G2_evidence_archive.zip (created 17 Oct 2026, 204 files, SHA-256 manifest inside), stored outside the repository.
Restore: unzip it at the repository root; the review pages then open from disk with their screenshots.
Regenerate the screenshots with the G2 tools against a running page and a static server for g1/mockup.
