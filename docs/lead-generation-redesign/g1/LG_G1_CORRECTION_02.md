# LG Owner Correction 02 (17 Oct 2026)

- **Source:** owner, "ABCB | Lead Generation | Owner Correction 02".
- **Status:** **APPROVED CORRECTION to G1** (OWNER REQUIREMENT). It does **not** approve any other part of the redesign. LG-D01 to LG-D29 otherwise stay pending.
- **Followed by `LG_G1_CONFIRMATION_03.md`** (same day), which confirms the operating model and updates LG-D27, D28, D19, D29. Some wording below (for example the left line and the intro) was refined there.
- **Scope:** G1 review materials only. No production code, commit, push, merge or deployment. A separate production proposal is prepared and **not authorised**: `LG_PRODUCTION_CORRECTION_PROPOSAL.md`.
- **Owner requirement:** enquiries generated through MappedSkills campaigns go **directly to the client**. This supersedes the confirmation parts of Correction 01 and the WP-5 draft standard for website copy.

## Owner instructions → what was done

| # | Owner instruction | Done in G1 |
|---|---|---|
| 1 | Replace the four-step verification journey with a three-step enquiry journey: "Someone sees your ad", "They send an enquiry", "Your team receives it" | Section 4 and the hero journey now use exactly these three steps. 2 s between steps |
| 2 | Remove customer confirmation as a mandatory prerequisite | Step "They confirm it", the chip "Confirmed", the reply bubble "Yes, that’s my enquiry." and every FAQ sentence about the prospect confirming are removed |
| 3 | Remove all claims that MappedSkills holds, filters, reviews, approves, rejects or releases individual enquiries | "No spam or repeats", "Right for you", "matches what you told us counts", "criteria agreed", "matched to", "A confirmed enquiry" are removed. Automated search of the rendered page: 0 matches (list below) |
| 4 | Replace "No confirmation, no handover" with "Every enquiry, straight to your team." | H2 of section 4 (two colours: "Every enquiry," ink · "straight to your team." orange) |
| 5 | Remove the claim that a confirmation standard is being introduced, unless separately documented and owner-approved | Removed everywhere (intro, hero caption, FAQ 1 and 3). No separate documented, owner-approved reason was found: `docs/00-project/DECISION_LOG.md` has no entry on a verification or confirmation standard (searched), and the WP-5 draft was never recorded there. LG-D21 is superseded |
| 6 | Audit hero illustration, accountability, FAQ, closing section, SEO copy and structured data | See audit below |
| 7 | Keep two-second progression, reduced-motion support and accessibility behavior | Kept (LG-D17). Re-measured and re-tested (below) |
| 8 | Update copy, decision register, screenshots, review page and ZIP | `LG_G1_COPY.md`, `LG_G1_DECISIONS.md`, `LG_G1_FEEDBACK_AND_ARCHITECTURE.md`, `screenshots/`, `LG_G1_REVIEW.html`, `LG_G1_review_package.zip` (screenshots, review page and ZIP are now archived outside Git, see `README.txt`) |
| 9 | Record as LG Owner Correction 02 and identify every affected LG-D decision | This file, and the list below |

## Affected decisions

| Decision | Effect |
|---|---|
| **LG-D05** hero illustration | Revised: three steps; chips Ad seen / Enquiry sent / Received; "Your ad" strip; reply bubble removed |
| **LG-D09** standard section headline and intro | Revised: owner headline; "introducing" intro removed |
| **LG-D10** the steps | Revised: three steps; confirmation and spam/criteria steps removed |
| **LG-D11** statuses | Reworded: confirmation logic gone as well (still removed, no replacement) |
| **LG-D12** two lines | Left line reworded (no criteria language); right line reworded |
| **LG-D13** accountability | Relay mark "A confirmed enquiry" → "An enquiry, sent to you" |
| **LG-D14** FAQ | No longer "unchanged": answers 1 and 3 rewritten |
| **LG-D17** journeys | Retained (instruction 7); re-measured |
| **LG-D19** meta description | Now inconsistent with the page ("published definition"); proposal to rewrite later, not changed |
| **LG-D21** operating status of the standard | **Superseded** (no standard is mentioned) |
| **LG-D24** live page claims | **Extended**: live page also claims mandatory confirmation |
| **LG-D25** FAQ wording | **Extended**: answer 3 added; "matched to" replaced |
| **LG-D26** filtering mechanism | **Superseded** (both steps removed) |
| **New LG-D27** | Confirm "direct to the client" holds for every campaign (route undocumented) |
| **New LG-D28** | Confirm the targeting wording that replaces "criteria agreed" |
| **New LG-D29** | Other pages (e.g. `/faq`) describe system qualification of the company’s own enquiries; not audited here |

Unaffected: LG-D01 to D04, D06 to D08, D15, D16, D18, D20, D22, D23.

## Audit for contradictory language (proposed page)

Method: read every section, illustration label, aria-label, FAQ answer and the closing section; then an automated search of the rendered `<main>` text (G1 `tools/checks.cjs`, archived outside Git; the same search is in `g2/tools/checks.cjs`) for: "We review it", "Someone on our team", "Passed on", "Kept aside", "Confirmed and checked", "Check each enquiry", "operator", "Reviewed by us", "checked against", "matched to", "approve the lead", "reject", "No confirmation", "no handover", "confirm", "verif", "screen", "spam", "repeat", "criteria", "filter", "we hold", "release", "introducing", "standard", "pass", "qualified", "Yes, that". **Result: 0 matches.**

Words remaining that contain review, approve, check, sort or qualif, each read in context:
- "More of the same only means more sorting." the client’s own inbox, not MappedSkills.
- "We don’t call your enquiries to qualify them." and the FAQ "We don’t make qualification calls." denials (the live, approved position).
- "A monthly report and a review call." the monthly client call (`DEC-051`).
- "Work starts once you approve." the client approving the proposal.

| Area | Result |
|---|---|
| Hero illustration | Ad seen → Enquiry sent → Received; fictional "Your ad" strip; no confirmation reply; caption "Illustration of how an enquiry reaches your team. Not a real enquiry." |
| Hero journey, aria-labels | The three owner steps; button labels "Show step N: …" use the same names |
| Problem | Nothing contradictory |
| What we do | "We test that enquiries reach you" (test enquiries to the form) is not a review of leads. Still FC LG-D08 |
| How it reaches you | Replaced (above) |
| Accountability | Mark "An enquiry, sent to you"; relay has no review step |
| FAQ | Answers 1 and 3 rewritten; answer 2 unchanged |
| Closing | "What happens next" is the client engagement (`DEC-051` item 5); nothing contradictory |
| SEO copy | Title unchanged. **Meta description contradicts** (LG-D19, not changed in G1). Open Graph and Twitter descriptions repeat it. H1 "judged on enquiries worth calling back" is consistent (the client judges) |
| Structured data | The live page emits only `BreadcrumbList` (Home › What we do › Enquiry generation), plus the site-wide data. It has **no** `FAQPage` or other schema carrying confirmation or review claims. **No structured-data change is needed.** G1 adds none |
| Other pages | `/faq` and the home/services chain figure describe system qualification of the company’s **own** enquiries. Not client campaigns, not audited here (LG-D29) |

## Verification (actually run, 17 Oct 2026)
- Journey gaps (hero 2,002 ms; what we do 2,002 and 2,003 ms; how it reaches you 2,001 ms; what happens next 2,001 to 2,003 ms); first state visible on load; plays once and keeps the final state.
- Keyboard: Enter on "Show step 2" shows step 2, stops the sequence, and it stays there after 2.6 s.
- Reduced motion: all four journeys static. No JavaScript: nothing hidden, all three FAQ details closed, chip and "Your ad" strip visible.
- Hero fits above the fold: ends at 589 px at 1440×900 and 585 px at 1366×768. No horizontal overflow at 1440, 1366, 390 or 320. 0 long or double dashes. Console errors: 0.
- Not run: screen-reader testing with assistive technology, cross-browser beyond Chromium.
