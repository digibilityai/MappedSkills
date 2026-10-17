# /how-it-works G0: owner decision register

Source report: `HIW_G0_AUDIT.html` (§5 factual audit, §12 decisions). Scope: `/how-it-works` only.

| ID | Subject | Status | Decision |
|---|---|---|---|
| HW-D01 | Monthly review call (finding F1) | **DECIDED** (owner, 2026-10-17) | Use option A: "A monthly performance report, and a review call where your service includes one." Fold it into G1. **Do not correct the live page separately**: the current wording ("A monthly performance report and a monthly review call") stays live until the redesign is released. |
| HW-D02 | Qualified-enquiry ledger and the "reported" claim (F2) | **APPROVED** (owner, 2026-10-18) | Removed from this page, with "Accountable up to here" and "every one of the six points is reported". `DEC-005` wording elsewhere unchanged. |
| HW-D03 | Enquiry logging, universal audit, channel advice (F3, F4, F13) | Resolved in G1 (approved with R2) | Logging claim removed; audit step kept; channel line softened to "If we don't think something suits your business, we'll say so." |
| HW-D04 | G1 section architecture (§9) | **APPROVED** with R2 (2026-10-18) | Seven sections as in the R2 mockup. |
| HW-D05 | Limits section: visible and condensed, or a disclosure | Resolved in G1 (approved with R2) | Visible and condensed: five items. |
| HW-D06 | Where "What we do not know" goes | **APPROVED** (owner, 2026-10-18) | Removed from this page. |
| HW-D07 | Journey timing (1.5 s or 2 s) | Resolved in G1 (approved with R2) | 1.5 s between steps. |
| HW-D08 | H1, title, description, BreadcrumbList, service links | **APPROVED** (owner, 2026-10-18) | H1 kept. Title "How It Works: From First Call to Monthly Review \| MappedSkills". Description "How working with MappedSkills runs: a discovery call, an audit, a plan you approve, then the work and a monthly report. Including what tracking can’t show." No `BreadcrumbList` added. In-body links to /services, /pricing and /faq. Applied in G2 only. |

## Notes on HW-D01
- **Basis:** `DEC-051` item 5 (report and call), `DEC-053` OD-03 (Google Ads: report and call), `DEC-057` item 4 (Lead Generation: call not confirmed).
- **What it changes:** the wording to use in G1 only. It does not say which services include a call, and the G1 copy must not name any. It does not change `/lead-generation`, `/google-ads` or any other page.
- **Not authorised:** G1 work itself (awaits the remaining decisions and owner approval), any live-page edit, commits, push or deployment.
- **Decision log:** to be entered in `docs/00-project/DECISION_LOG.md` together with the G1 approval, as for the other pages (`DEC-055`, `DEC-057`). It is not entered now because this audit is read-only and the current checkout is `feat/ai-search-redesign`, not `main`.

## Status (2026-10-18)
G1 R2 is approved, including HW-D08. G2 planning is done (`../g2/HIW_G2_IMPLEMENTATION_PLAN.md`). **Implementation is not authorised yet.** The `DECISION_LOG.md` entry (`DEC-058`, drafted in the plan §8) is to be appended on the G2 branch.
