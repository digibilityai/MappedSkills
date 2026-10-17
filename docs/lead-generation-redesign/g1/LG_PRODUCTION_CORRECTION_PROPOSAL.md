# Lead Generation: production factual correction (PROPOSAL ONLY, NOT AUTHORISED)

- **Status:** **PROPOSAL. Not implemented. Not to be deployed without explicit owner authorisation.** Nothing in production, in the repository source, in git or on the server was changed to prepare this.
- **Page:** `https://mappedskills.com/lead-generation` · **Source:** `components/cplus/lead-generation/content.ts` (`LG_PLAIN`), `LeadGenBody.tsx`, `app/(pages)/lead-generation/page.tsx`.
- **Basis:** LG Owner Corrections 01 and 02 and Confirmation 03: MappedSkills does not manually review leads; enquiries go directly to the client’s own lead form, CRM or WhatsApp, depending on their setup; confirmation is not a prerequisite; MappedSkills does not routinely receive, review, approve, reject or release individual enquiries.
- **Purpose:** remove inaccurate claims **only**. It is not the G1 redesign and must not be bundled with it.

## 1. What is inaccurate on the live page (VERIFIED FACT, from `content.ts` and the 17 Oct 2026 capture)

| Claim on the live page | Where | Contradicts |
|---|---|---|
| "Reviewed by us · A MappedSkills operator checks the evidence. No calls." | `checks[3]` | Correction 01 (manual review) |
| "Reviewed by us · the evidence checked — no calls"; stamp "Reviewed" | `card.notes[3]`, `card.stamp` | Correction 01 |
| "Confirmed by the prospect · They confirm … by email reply, or in a WhatsApp conversation they start." | `checks[2]`, `card.notes[2]` | Correction 02 (confirmation as prerequisite) |
| "No confirmation, no qualified status." | `rule` | Correction 02 |
| H2 "The standard we are introducing: confirmed by the prospect and checked by us before it reaches your sales team." | `defH` | Corrections 01 and 02 |
| "Captured and screened … Spam and repeat enquiries are kept out."; "Checked against criteria agreed with you"; "Only qualified enquiries go to your sales process."; "qualified enquiries only" | `checks[0,1,4]`, `card.notes[0,1,4]` | Correction 02 (no holding or filtering by MappedSkills) |
| Statuses "Qualified: Eligible, confirmed and reviewed", "Pending verification", "Expired — unverified (48 hours in the pilot)", "Unqualified", "Duplicate" | `statuses` | Corrections 01 and 02 |
| "…confirmation messages would carry your brand, and MappedSkills would manage the process." | `split.agreed.d` | Correction 02 |
| Rail "Eligibility and confirmation", "Review"; mark "The qualified enquiry"; H2 "We are accountable up to the qualified enquiry." | `rail`, `bdH` | Corrections 01 and 02 |
| FAQ 1 "confirmed by the prospect and checked against criteria agreed with you"; FAQ 3 "the prospect would confirm digitally" | `questions[0].a`, `questions[2].a` | Correction 02 |
| Meta, Open Graph and Twitter description: "with a published definition of what counts as one, and that definition is the number we report" | `page.tsx` | Correction 02 (the definition no longer appears) |

Structured data: only `BreadcrumbList` on this route. **No structured-data change is needed.**

## 2. Narrowest change that removes every claim

Text and list edits in `content.ts` where possible. Same page, same URL, same components, form, CTAs, links and tracking hooks. No new design.

| Item | Proposed replacement |
|---|---|
| Hero stamp | "Received" (instead of "Reviewed") |
| Hero notes (5) | 3 notes, in order: "Someone sees your ad", "They send an enquiry", "Your team receives it" (the `fields[].n` markers re-pointed to 1 to 3) |
| Section kicker | "How an enquiry reaches you" |
| Section H2 (`defH`) | "Enquiries go straight to your team." (owner-recommended wording, Confirmation 04) |
| Intro (`defIntro`) | "Enquiries go to your own form, CRM or WhatsApp, depending on your setup." |
| Checks (5 → 3) | Someone sees your ad · They send an enquiry · Your team receives it (descriptions as in G1 section 4, step 1 "Your campaign reaches the people you want to reach."; step 3 "In your own form, CRM or WhatsApp.") |
| Rule line, status list and its heading | Removed. This touches `LeadGenBody.tsx` (drop two blocks) and `lead-gen.css` (unused rules) |
| Split panels | Left: "You tell us who you want to reach. We build campaigns around them." (owner’s preferred wording, LG-D28; final approval pending) Right: "We don’t call your enquiries to qualify them. Your team has the sales conversation." |
| Rail | Ours: "Run the campaigns", "Bring people to you". Mark: "An enquiry, sent to your team". `bdH` → "We manage the campaigns. Your team handles the enquiries." |
| FAQ 1 and 3 | As in G1 `LG_G1_COPY.md` §6 |
| Meta, OG, Twitter description | Separate owner decision (LG-D19). Options A, B and C are in `LG_G1_CONFIRMATION_03.md` §4 (recommended A: "Lead generation that brings in enquiries worth calling back. We manage the campaigns; enquiries go directly to your own form, CRM or WhatsApp.") |

Reporting and delivery testing are **not** added by this correction. If the owner wants them on the live page they are separate copy decisions: "You receive a monthly report on campaign performance." (LG-D30, confirmed) and "Where the setup allows, we test that enquiries reach the right destination." (LG-D08, conditional). A monthly review call must **not** be stated (not confirmed).

Everything else on the page stays as it is. This proposal does **not** include the G1 redesign (new hero, problem, "What we do", close, journeys).

## 3. Risks and effects
- **SEO (WORKING HYPOTHESIS):** the H2 and body copy change; the `h1`, title, canonical, URL, links and breadcrumb schema stay. Heading `lg-h-def` text changes; the `lg-status-k` heading is removed (LG-D20: check GTM/E6 references first). Internal links unchanged.
- **Heading outline:** H2 > H3 "Where each enquiry stands" disappears; no skipped levels result.
- **Dependencies to inspect before editing:** `components/cplus/lead-generation/*`, `proto`/test fixtures that assert the removed text, `lib/has-content.ts`, any copy tests. **UNKNOWN until inspected.**
- **Other pages:** audited read-only in `LG_G1_CONFIRMATION_03.md` §5 (LG-D29). Not part of this correction. Note that this correction removes the "published definition" from `/lead-generation`, which leaves `/faq`, the 404 list, a blog CTA and a header description pointing at a definition that is no longer there.
- **Delivery claim:** "directly to your own lead form, CRM or WhatsApp" is the confirmed standard arrangement (LG-D27, Confirmation 03). The page must not say it is verified or guaranteed for every setup.

## 4. Release steps once authorised (not started)
1. Owner authorises in chat: scope (this table), the meta wording, and that it ships separately from G1.
2. New branch from `main`; implement; run type check, lint, the repo’s tests, a production build.
3. Release by the established dispatch workflow (see the deploy-workflow records); main ruleset requires a PR.
4. Verify on production: rendered text search for the §1 phrases (expect 0), `BreadcrumbList` intact, the form at `/contact` unchanged, Core Web Vitals not regressed.
5. Rollback: previous release symlink (release chain recorded in the deploy notes).

## 5. Needed from the owner
1. Authorise or decline this narrow correction. 2. Approve or replace the meta description. 3. Confirm any exceptions to direct delivery (LG-D27), and LG-D08 / LG-D30 wording. 4. Say whether to ship before, or with, the G2 redesign.
