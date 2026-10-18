# /about G0: owner decision register

Source report: `AB_G0_AUDIT.html` (§7). Scope: `/about` only.

**Owner, 2026-10-18:** "Approved: AB-D01 to AB-D09 as recommended. Start the G1 mockup. I will send the founder facts separately."

| ID | Subject | Status | Decision |
|---|---|---|---|
| AB-D01 | Structure and visual direction | **APPROVED** | Five sections (hero; why we work this way; where our job starts and ends; who you'll work with; close), with the "one line" visual story. |
| AB-D02 | H1 | **APPROVED** | "Judge us on the enquiries, not the traffic." The live H1's idea moves to section 2. |
| AB-D03 | Founder/team introduction | **APPROVED (include)** | Section 4 introduces the founder/team using **only facts the owner supplies**. Until they arrive, the G1 mockup shows clearly marked placeholders; nothing is invented. |
| AB-D04 | "0 of 28" self-measurement | **APPROVED (remove from /about)** | Stays, dated and complete, on `/ai-seo`. The research is not altered. |
| AB-D05 | "Qualified enquiry" positioning | **APPROVED** | Stated once, as the aim. No definition block; no claim that clients receive qualified enquiries (DEC-005 within DEC-057). |
| AB-D06 | Scope wording of the line | **APPROVED** | "The parts you hire us for"; no website-build or full-bundle implication; HW-D01 report wording. Fixes F1 to F6. |
| AB-D07 | Title and description | **APPROVED (draft in G1)** | New wording drafted in G1 for owner approval. URL, canonical and JSON-LD unchanged. |
| AB-D08 | Live-page issues F1 to F8 | **APPROVED (fold into redesign)** | No separate live correction. |
| AB-D09 | CTAs and timing | **APPROVED** | Contact (primary) and "Book a call" in the hero and close; "What happens next" from confirmed facts only; 150 ms micro-interactions. |

## G1
- **R1 visual direction APPROVED** (owner, 2026-10-18). It supersedes the R0 hero H1 (AB-D02: "Judge us on the enquiries, not the traffic." is the homepage H1), the R0 "one line" toggle (now a still comparison) and, pending confirmation, the AB-D09 CTA label and the fit section. Record: `../g1/AB_G1_NOTES.md`.
- **R3 APPROVED as the final G1 design and copy** (owner, 2026-10-18). Confirmed facts: independently operated digital marketing agency; a wider team led by four principal team heads; plans and coordinates the services a client hires it to manage (not an outcome guarantee).
- **R4 process copy confirmed** (owner, 2026-10-18): points 2, 4, 6 and 7 approved as worded in `AB_G1_NOTES.md` (R4 table); points 1, 3 and 5 keep their qualified wording. Copy only; G1 remains approved.
- **R4 APPROVED; G1 FROZEN** (owner, "/about — R4 Approval", 2026-10-18): "the form" is included alongside email and WhatsApp; the implied mandatory call is removed from "What happens next"; "Book a call" stays the secondary CTA. The R4 copy and the approved G1 design are frozen.
- **G2 AUTHORISED** (owner, "About Page | G2 Implementation Authorization", 2026-10-18): implement `/about` in the website codebase at G1 R4 (frozen), with four clearly marked team-head placeholders kept easy to replace. Scope: About page files only; reuse existing components; no new sections, no copy rewrite, no new dependencies; preserve navigation, metadata, accessibility and functionality. **The page must not be released publicly with unfinished team placeholders.** The brief's stop gate was received truncated ("Authorized: G2 local i…"), so it is read as local implementation and verification only. Not authorised: commit, push, PR, merge, deployment.
- **G2 APPROVED** (owner, 2026-10-18: "G2 implementation for /about approved. Stop here; commit not yet authorised."). Commit, push, PR, merge and deployment are not authorised.
- **G2 review decisions** (owner, 2026-10-18): title "About MappedSkills | Our Team & Approach"; description "Meet the team behind MappedSkills. Discover how we connect digital marketing services, turn interest into enquiries and measure what matters."; screenshots kept outside Git (`../README.md`).
- **R5 copy APPROVED as shown** (owner, 2026-10-18): simplified copy in "Why we work this way" and "What you can count on us for" (`../g2/AB_G2_REPORT.md`, R5). It supersedes the R4 wording of those two sections only, including the removal of the "where tracking allows" and review-call qualifiers and the wording "Managing your marketing." Everything stays uncommitted.
- **LOCAL COMMIT AUTHORISED** (owner, 2026-10-18): one local commit on `feat/about-g2`. Push, PR, merge and deployment are not authorised.
- **Release blockers:** real profiles for the four team heads (photo, name, role, one-sentence introduction) and written photo consent from each person shown.
- *(earlier)* **Awaiting the owner:** the factual confirmations in `AB_G1_NOTES.md` §3 and §4, and the team details for the four People cards.

## Open inputs
- Founder/team facts (AB-D03): names, roles, photograph or none, "why we started" in the owner's words, optional background, location wording. **Awaited from the owner.**

## Not authorised
Push, PR, merge, deployment, and any live-page edit. The `DECISION_LOG.md` entry is to be written with the G1 approval, as for `/how-it-works` (DEC-058) and `/services` (DEC-059).
