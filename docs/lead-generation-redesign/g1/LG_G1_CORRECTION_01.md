# LG Owner Correction 01 (17 Oct 2026)

- **Source:** owner, "ABCB | Lead Generation G1 | Owner Correction 01", after reviewing the G1 mockup.
- **Status:** **APPROVED CORRECTION to G1** (OWNER REQUIREMENT). It does **not** approve any other part of the redesign. LG-D01 to LG-D25 otherwise stay pending.
- **Superseded in part by `LG_G1_CORRECTION_02.md` (same day):** the four-step journey, "They confirm it", the hero caption "confirmation standard" and the FAQ "matched to" wording described below no longer exist in G1. The removal of manual review stands. Kept unaltered as history.
- **Scope:** G1 review materials only. No production code, commit, push, merge or deployment.

## Owner instructions (as given)
1. Remove step 4, "We review it."
2. **MappedSkills does not manually review leads.**
3. Remove both the "Passed on" and "Kept aside" cards entirely.
4. Remove the notion that the MappedSkills team reviews leads from the entire page.

## What changed in the mockup

| Where | Before (G1) | After (Correction 01) |
|---|---|---|
| Standard section: steps | 5 steps; step 4 "We review it / Someone on our team checks it." | **4 steps:** 1 No spam or repeats · 2 Right for you · 3 They confirm it · 4 Your team gets it. Descriptions unchanged. No replacement step |
| Standard section: list name | "The five checks" | "The four steps" |
| Standard section: intro | "… five checks before an enquiry reaches your team." | "… four steps before an enquiry reaches your team." |
| Standard section: outcome cards | "Passed on: Confirmed and checked / Sent to your sales team." and "Kept aside: Not confirmed in time · Not what you’re looking for · Spam or a repeat / Not sent to your team." | **Removed.** Nothing replaces them. Layout rebalanced: 4 columns at desktop (2 at medium, 1 on mobile), 30 px gaps, taller tiles, more space above the two closing lines. Section height at 1440 went from 994 to 815 px |
| Accountability: "Our part" | Find buyers ▸ Bring them to you ▸ Check each enquiry | Find buyers ▸ Bring them to you |
| Hero caption | "Illustration of the checking standard we’re introducing." | "Illustration of the confirmation standard we’re introducing." |
| FAQ answer 1 (live copy) | "… confirmed by the prospect and checked against criteria agreed with you …" | "… confirmed by the prospect and matched to criteria agreed with you …" (LG-D25) |

## Page audit for manual review, approval or sorting (proposed page)

Method: read every section, every illustration label, every journey, every aria-label and the FAQ. Then an automated search of the rendered `<main>` text for: "We review it", "Someone on our team", "Passed on", "Kept aside", "Confirmed and checked", "Check each enquiry", "operator", "Reviewed by us", "checked against", "reject". **Result: 0 matches.**

The remaining words containing check, review or approve were each read in context; none implies MappedSkills reviews leads:
- "We don’t phone your leads to check them." This is a denial, matching the live "We don’t make qualification calls".
- "A monthly report and a review call." This is the monthly client call (`DEC-051`).
- "Work starts once you approve." This is the client approving the proposal.

| Area | Result |
|---|---|
| Hero journey (It arrives · They confirm it · Your team gets it) | No review step. The chip "Sent to your team" says what happens, not who decides |
| Problem | "More of the same only means more sorting." This is the client's own inbox, not MappedSkills sorting |
| What we do | No lead review. "We test that enquiries reach you" is about test enquiries to the form, not reviewing leads (still needs confirmation: LG-D08) |
| Standard | Corrected (above) |
| Accountability | "Check each enquiry" removed |
| Questions | One word changed (LG-D25) |
| Close | No review implication |

## Claims still needing owner confirmation (not presented as established)
- **LG-D26 (new, FC):** step 1 "No spam or repeats: A real contact, asking once." and step 2 "Right for you: It matches what you told us counts." both imply that spam, repeat and criteria filtering happens **somehow**. With manual review ruled out, the page does not say how (automated or otherwise). **The owner needs to confirm** that these filters exist as described, or the steps should be reworded (for example, step 2 as the criteria agreed up front, with no filtering claim).
- **LG-D21 (FC, unchanged):** the standard is described as "being introduced".

## Conflicts this correction creates with earlier records (flagged, not changed)
- **The live production page** (`components/cplus/lead-generation/content.ts`) still says "Reviewed by us: A MappedSkills operator checks the evidence. No calls." and "the evidence checked — no calls". That is the claim the owner has now ruled out. **LG-D24 (new, OA):** correct production in G2, or sooner as a separate fix. Not changed here.
- The WP-5 draft decision (`602a7a0`, never recorded in `DECISION_LOG.md`) said "a named MappedSkills operator … authorises every handoff". This correction overrides that for website copy. Record it when the owner records the G1 outcome.
