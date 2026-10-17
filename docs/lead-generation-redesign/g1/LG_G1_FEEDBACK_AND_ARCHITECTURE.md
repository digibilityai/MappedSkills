# Lead Generation G1: owner-feedback mapping, existing-page assessment, proposed architecture

- **Date:** 2026-10-17 · **Owner PDF:** `owner-pdf/LG_owner_review.pdf` (7 pages; source `~/Downloads/Untitled document.pdf`, 3,133,774 bytes),
  rendered page by page to page images (archived outside Git, see `README.txt`) and inspected visually.
- **Live baseline:** https://mappedskills.com/lead-generation, captured 17 Oct 2026 (screenshots archived outside Git, see `README.txt`; `screenshots/before/live-*.json` and `live-main.html` are kept); source on `main` `0fe87b2`.

## A. Owner-feedback mapping

> **LG Owner Correction 01 (17 Oct 2026, APPROVED):** MappedSkills does not manually review leads. Row 9 below and `LG_G1_CORRECTION_01.md`.
>
> **LG Owner Correction 02 (17 Oct 2026, APPROVED, supersedes parts of 01):** enquiries from MappedSkills campaigns go **directly to the client**. Three-step enquiry journey; no customer confirmation; no holding, filtering, reviewing, approving, rejecting or releasing by MappedSkills. Row 10 below and `LG_G1_CORRECTION_02.md`.

| # | PDF page / screenshot | Live section (source) | Owner annotation | Current problem (verified) | Proposed solution | Trade-off / open |
|---|---|---|---|---|---|---|
| I-1 to I-8 | p1, instruction list | Whole page | Brand DNA; little text; no jargon; customer language; short; no double or long dash; each section tells its story; journeys auto-progress 2 s; dual-colour tiles | 6 long dashes in the page copy; "qualified", "eligibility", "attributed", "calibrate", "verification standard" | All copy rewritten in plain words; 0 dashes in rendered copy; 4 journeys at 2,000 ms; every tile cream or ink | The meta description still has a dash (LG-D19) |
| 1 | p1 to p2, hero screenshot | Hero `.lg-hero` (`LeadGenBody.tsx` §1) | "Hero section is too big and does not fit into the above the fold" | Measured hero **1,157 px** tall (73 → 1,230) at 1440×900 and **1,146 px** at 1366×768. The illustration alone is 956 px (five fields, stamp, handoff and five margin notes) | Compact hero. It ends at **569 px** (1440×900) and **565 px** (1366×768); also fits at 1280×720 | None at desktop. On mobile the hero scrolls naturally (CTA visible on the first screen) |
| 2 | p2 | Hero illustration `card.fields` | "Remove the budget line. Form height can be reduced" | It is an illustration, not a form. Blank inputs make it look fillable | Budget removed; example shown filled in; 4 rows; 3-step journey; height 956 → 429 px | LG-D04, LG-D05; dependency check in `LG_G1_FORM_IMPACT.md` |
| 3 | p2 | Hero H1 + lede + side text | "Shorten the title and the description below" | H1 13 words on 4 lines; lede 16 words + side paragraph 27 words | H1 8 words on 3 lines; one 18-word lede; side paragraph removed | H1 change is SEO-relevant (LG-D01). The fold does not depend on it |
| 4 | p3, "The situation" | `.lg-sit` | "Title is technically correct, but user may not get the problem statement" | "Two versions, and they need different work." does not name the problem | "Too few enquiries, or too many of the wrong ones?" with two inbox illustrations | LG-D06, LG-D07 |
| 5 | p4 (both screenshots), note on p5 top | `.lg-def` (standard, rule, statuses, split) | "Title is too long and doesn't follow the two-color title format. Section too long … less text" | 21-word single-colour H2; 229 words; 12 tiles; three separate ideas in one section | Two-colour H2 **"Every enquiry, straight to your team."** (Correction 02); **three steps** (Someone sees your ad · They send an enquiry · Your team receives it); statuses removed with no replacement; 2 split panels → 2 lines | Removes pilot detail (48 h, status names): LG-D11, LG-D12 |
| 6 | p5, "What we answer for" | `.lg-bd` | "Too much of text … really simple" | Rail plus two technical explanations ("score", "calibrate", "attributed") plus 4 not-promised items | One takeaway: "We bring the enquiry. Your team makes the sale." One handover bar; 3 won’t-promise chips; one "what you do get" tile | LG-D13 removes two technical statements |
| 7 | p6, Questions | `.lg-q` | (no annotation) | Fine; native `<details>` closed on load | Unchanged | LG-D14 |
| 9 | Owner Correction 01 (after G1 review) | Standard section, accountability bar, hero caption, FAQ answer 1 | "Remove step 4 We review it … MappedSkills does not manually review leads … remove Passed on and Kept aside … remove the notion that the team reviews leads from the entire page" | G1 showed an operator review step and accepted/kept-aside cards. The live page also claims "Reviewed by us" (LG-D24) | 4 steps; both cards removed with no replacement; "Check each enquiry" removed; "checking" → "confirmation" in the caption; FAQ "checked against" → "matched to" | Filtering mechanism for steps 1 and 2 needs confirmation (LG-D26) |
| 10 | Owner Correction 02 (after Correction 01) | Hero illustration and journey, standard section, accountability bar, FAQ answers 1 and 3 | "Enquiries … should go directly to the client." Three-step journey; remove customer confirmation as a prerequisite; remove every claim that MappedSkills holds, filters, reviews, approves, rejects or releases enquiries; new headline; remove the "standard we are introducing" | G1 (after 01) still had a four-step verification journey, "They confirm it", "No confirmation, no handover", "introducing", the reply bubble "Yes, that's my enquiry" and FAQ text about confirmation and criteria matching | Three-step journey in the hero and in section 4; confirmation, spam/repeat/criteria steps, "introducing" and the headline removed; FAQ 1 and 3 rewritten; accountability mark → "An enquiry, sent to you" | Delivery route (LG-D27), criteria wording (LG-D28), meta description (LG-D19) need confirmation |
| 11 | Owner Confirmation 03 (after Correction 02) | Section 3 stops 2 and 3, section 4 intro, step 3, left line; FAQ 1 | "Enquiries are delivered directly to the client’s own lead form, CRM or WhatsApp, depending on their setup. MappedSkills does not routinely receive, … review, approve, reject or release individual enquiries." | Page implied MappedSkills supplies the page and form, tests every enquiry and "sends" them | Destination named in the page; "We test the route to your team"; owner wording for the targeting line; no verification or guarantee claim | LG-D08, D19, D27, D28, D29, D30 |
| 12 | Owner Confirmation 04 and final copy consolidation | Section 3 (stops 1, 3, H2), hero lede, section 4 H2/intro/step 1/step 3, accountability H2/relay/report tile, FAQ 1; H1 | Delivery testing is conditional; monthly report confirmed, review call not; "potential customers", not "buyers"; no claim that enquiries are genuine, qualified or relevant; recommendations on LG-D01, D03, D19, D22, D29 | G1 still said "Real enquiries from people who need what you sell", "Reach the right buyers", "We test the route to your team" (reads as universal) and "A monthly report and a review call" | Wording per the owner’s recommended text; live H1 retained as the recommendation; review call removed | LG-D01, D02, D03, D08, D09, D13, D19, D22, D27, D28, D29, D30 |
| 8 | p7, close | `.b-close` | "The title needs to be simplified and direct" | "How many, and how many are worth quoting for." is elliptical; the body has a long dash | "How many enquiries do you get? How many are any good?" Body without a dash. Adds "What happens next" | LG-D15, LG-D16 |

## B. Existing-page assessment

| Area | Finding |
|---|---|
| Hero height | 1,157 px at 1440×900, so the bottom 330 px sit below the fold. The illustration (956 px) sets the height, not the text. Top and bottom padding are about 101 px each. The header is 73 px. |
| Copy clarity | Marketer language: "unit", "qualified status", "eligibility", "verification", "calibrate", "attributed". The H2s state conclusions without naming the customer’s problem. |
| Section length | The standard section has 229 words and 12 tiles; the whole page has 631 visible words. |
| Visual storytelling | The hero card's margin notes and the five check tiles repeat the same five steps (G1 now repeats one three-step journey in the hero and section 4, by design). The five statuses read as a table. The rail is the strongest visual. |
| Repetition | The five steps (including an operator review, now ruled out by Correction 01) appear twice (hero notes, then section 3); "no calls" appears three times; "introducing" three times. |
| Form friction | No form on the page; one CTA to `/contact`. The illustration looks like a form but is not one: a false affordance. |
| Mobile | Hero is 1,648 px tall at 390 px wide; the CTA is visible at 603 px; the illustration then runs about 1,000 px. |
| CTA clarity | One CTA, repeated at the end. No secondary booking route. No "what happens next". |
| Trust and proof | Honest and restrained (introducing; no promised numbers), but the honesty is buried in dense text. No invented proof (correct). |
| Accessibility | Good base: native details, labelled lists, figure captions ≥ 12 px. The blank "fields" are announced as "blank" (confusing). |

## C. Proposed page architecture

Story: **recognise the problem → see what we do → see how an enquiry reaches you → know where our job ends → questions → act, knowing what happens next.**
What makes Lead Generation different (not CO, not Google Ads): **the enquiry goes directly to you.** (Correction 02: no confirmation prerequisite, and no holding, filtering or review by MappedSkills.)

| # | Section | Purpose | Customer takeaway | Visual concept | Headline | Interaction |
|---|---|---|---|---|---|---|
| 1 | Hero (ground) | Offer and route to enquire, all above the fold | "They send me enquiries worth calling back, not bought lists." | One example enquiry, filled in, with a status chip, a "Your ad" strip and a handover tag | Lead generation, judged on **enquiries worth calling back.** | 3-step journey, 2 s, selectable |
| 2 | The problem (ink) | Name the pain in the owner's words | "That's me: it's quiet, or it's junk." | Two inboxes: a quiet one (cream) and one full of the wrong people (ink) | Too few enquiries, **or too many of the wrong ones?** | Static |
| 3 | What we do (paper) | Show the service, which the live page never states | "They work on the whole path, not just ads." | One path, four stops with drawn icons, arrows filling in tangerine | We don’t sell you a list. **We bring buyers to you.** | 4-stop journey, 2 s, selectable |
| 4 | How it reaches you (ground) | Say where the enquiry goes | "Enquiries from the campaign come straight to my team." | Three steps on one line (the last in ink); two short lines below | Every enquiry, **straight to your team.** | 3-step journey, 2 s, selectable |
| 5 | What we answer for (ink) | Set honest limits and build trust | "They won't promise numbers; they'll report monthly." | Relay bar with the handover marked in tangerine; three crossed-out chips; one report tile | We bring the enquiry. **Your team makes the sale.** | Static |
| 6 | Questions (paper) | Objections | Unchanged | Native disclosures | What people ask us | Native |
| 7 | Close (tangerine) | Act; reduce the fear of what happens next | "A rough idea is enough; here's what happens after I click." | Two-colour question H2; CTA pair; five ink tiles | How many enquiries do you get? **How many are any good?** | 5-step journey, 2 s, selectable |

## D. Hero above-the-fold measurements (proposed; header 73 px, or 65 px on mobile)

| Viewport | Hero ends at | Whole hero visible | CTA visible | H1 size / lines |
|---|---|---|---|---|
| 1440 × 900 | 569 px | **Yes** (331 px spare) | Yes | 53.6 px / 3 |
| 1366 × 768 | 565 px | **Yes** (203 px spare) | Yes | 51.8 px / 3 |
| 1280 × 720 (extra check) | 561 px | Yes | Yes | n/a |
| 390 × 844 | 1,112 px | No (by design: natural scroll) | **Yes** | 34.8 px / 3 |
| 320 × 640 | 1,172 px | No (by design) | **Yes** | 32 px / 3 |

No text was shrunk below the live sizes to achieve this. The hero H1 is 53.6 px at 1440, against the live 277 px-tall 4-line block.
The lede stays at the live lede size. The savings come from the illustration (956 → 429 px), hero padding (101 → 34 px), the H1 shortened from 4 to 3 lines, and the side paragraph removed.

## E. Quality gate (self-assessment)

| # | Question | Answer |
|---|---|---|
| 1 | Hero fully visible on a laptop? | Yes at 1440×900, 1366×768 and 1280×720 (measured) |
| 2 | Can an owner understand the service immediately? | H1 + lede + example card say: enquiries from potential customers, sent straight to your team, not bought lists |
| 3 | Is the form shorter? | There is no form on this page. The example card drops Budget and is less than half the height (956 → 429 px). The real `/contact` form is untouched |
| 4 | Is every headline simple and direct? | Yes; all H2s are two-colour, 5 to 10 words |
| 5 | Does each section have a distinct idea? | Problem / what we do / how it reaches you / where our job ends / questions / next step |
| 6 | Do visuals do more work than paragraphs? | Yes; no section has a paragraph over 18 words |
| 7 | Is the brand consistent? | Live C+ tokens, type and shared classes; cream or ink tiles; tangerine only for events |
| 8 | Is the motion purposeful? | 4 journeys, 2 s, play once; 2 sections static |
| 9 | Trust without unsupported claims? | "Introducing" and the confirmation standard removed (Correction 02); won't-promise list kept; only `DEC-051` facts; no holding, filtering or review claim (Corrections 01 and 02). Claims needing confirmation: LG-D08, LG-D19, LG-D27, LG-D28 |
| 10 | Is the next action obvious? | CTA in the hero and close, plus "What happens next" |
| 11 | Is mobile deliberate? | Re-laid out (stacked journeys, vertical arrows, full-width CTAs), not shrunk; no horizontal scroll at 320 |
| 12 | Are all decisions documented? | LG-D01 to LG-D30, plus Corrections 01 and 02 and Confirmations 03 and 04 |
