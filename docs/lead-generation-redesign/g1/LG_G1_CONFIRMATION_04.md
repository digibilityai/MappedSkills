# LG Owner Confirmation 04 and Final Copy Consolidation (17 Oct 2026)

- **Source:** owner, "ABCB | Lead Generation G1 | Owner Confirmation 04 and Final Copy Consolidation".
- **Status:** **RECORDED OWNER REQUIREMENT** (two operating facts). It supplies the wording boundaries used below. It does **not** approve G1 copy, and it does **not** approve the five recommendations in §3.
- **Scope:** G1 only. No production code changed; nothing committed, pushed, merged or deployed; G2 not started.

## 1. Confirmed facts (OWNER REQUIREMENT)

| # | Fact | Boundary the page must respect |
|---|---|---|
| 1 | MappedSkills tests the enquiry delivery route **when the client’s setup allows it or the engagement includes it** | Conditional, **not** a universal promise. The page says "Where the setup allows, we test that enquiries reach the right destination." It never implies every client’s route is tested, never says verified or guaranteed |
| 2 | MappedSkills provides a **monthly campaign performance report** to Lead Generation clients | The page says "You receive a monthly report on campaign performance." A **monthly review call is not confirmed** and is not presented as a standard commitment (removed everywhere) |
| (03) | Enquiries go to the client’s own lead form, CRM or WhatsApp, depending on setup; MappedSkills does not routinely receive, review, approve, reject or release them | Unchanged and carried forward |

## 2. Final G1 copy (PROPOSED; final approval pending)

| Place | Wording now in the mockup | Source |
|---|---|---|
| Hero H1 | Lead generation, where the unit is an enquiry you can actually act on. (live H1) | LG-D01 recommendation |
| Hero lede | Enquiries from potential customers, sent straight to your team. We don’t buy in lists of names and forward them. | LG-D02 |
| Hero journey | 1 Someone sees your ad · 2 They send an enquiry · 3 Your team receives it | Owner |
| Hero chips | Ad seen · Enquiry sent · Received | LG-D05 |
| What we do H2 | We don’t sell you a list. We bring potential customers to you. | Owner |
| Stops | Reach the people you want · Make it easy to enquire (Into your own form, CRM or WhatsApp.) · **Check delivery (Where the setup allows, we test that enquiries reach the right destination.)** · See where it came from (Where we can tell, which work brought it in.) | LG-D08 |
| Section 4 | Enquiries go straight to your team. Intro: Enquiries go to your own form, CRM or WhatsApp, depending on your setup. Steps: Someone sees your ad (Your campaign reaches the people you want to reach.) · They send an enquiry (They tell you what they need.) · Your team receives it (In your own form, CRM or WhatsApp.) | LG-D09, D10, D27 |
| Targeting | You tell us who you want to reach. We build campaigns around them. | LG-D28 (pending) |
| No calls | We don’t call your enquiries to qualify them. Your team has the sales conversation. | live-approved position |
| Accountability | We manage the campaigns. Your team handles the enquiries. Our part: Run the campaigns ▸ Bring people to you · Mark: An enquiry, sent to your team · Your part: The conversation ▸ The quote ▸ The sale | LG-D13 |
| Reporting | You receive a monthly report on campaign performance. | LG-D30 |
| Won’t promise | A set number of enquiries · A fixed cost per lead · How many become sales. These depend on your market and your sales team too. | LG-D13 |
| FAQ 1 | …Our alternative is to reach the people you want and make it easy to enquire, so enquiries go straight to your team. | LG-D25 |
| FAQ 3 | No. We don’t make qualification calls. Enquiries go straight to your team, and your sales team handles the sales conversation. | LG-D25 |
| Meta (not implemented) | Option A recommended (LG-D19) | §3 |

## 3. Recommendations for owner approval (recorded, **NOT approved**)

| ID | Recommendation | Status | What the mockup shows |
|---|---|---|---|
| LG-D01 | Retain the existing H1 | **Recommended; pending owner approval** | Live H1 (the alternative is a measured screenshot only) |
| LG-D03 | Add "Book a call" → `/schedule-call` (hero and close) | **Recommended; pending owner approval** | Present |
| LG-D19 | Use meta description option A | **Recommended; pending owner approval; not implemented** | Not in the mockup (metadata is unchanged) |
| LG-D22 | Scope the outdated privacy-policy "Marketing budget range" reference separately | **Recommended; pending owner approval** | Nothing |
| LG-D29 | Scope the outdated "published definition" references separately, without rewriting shared accountability positioning | **Recommended; pending owner approval** | Nothing |

## 4. Decision records updated

| ID | Record |
|---|---|
| LG-D27 | Confirmed standard direct delivery model; not verified for every integration |
| LG-D08 | Delivery-route testing is **conditional**; stop 3 reworded |
| LG-D30 | Monthly campaign performance reporting **confirmed**; monthly review call **not confirmed** |
| LG-D28 | Owner’s preferred targeting wording applied; **final G1 copy approval pending** |
| LG-D02, D09, D13 | Reworded (no "real enquiries" claim; "Enquiries go straight to your team."; accountability H2; review call removed) |
| LG-D01, D03, D19, D22, D29 | Recommendations recorded as **P · recommendation**, not approved |

## 5. Contradiction audit (complete G1)

Test: nothing suggests MappedSkills reviews, filters, approves or rejects client leads; confirmation is not mandatory before delivery; no claim that enquiries are genuine, qualified, relevant or will convert; no promise that every route is tested or every integration verified; no review-call commitment.

**Method:** (a) read every rendered section, illustration label, aria-label, FAQ and closing line; (b) automated search of the rendered `<main>` text for 42 terms, including review, approve, reject, confirm, verif, screen, spam, repeat, criteria, filter, standard, introducing, qualified, genuine, guarantee, review call, right buyers, right people, real enquiries, confirmed buyer, calling back, every enquiry, all enquiries, we test that enquiries reach you, we receive, handed to us, we forward, we hold, release: **0 matches**; (c) read the metadata proposal and the review documents.

| Area | Result |
|---|---|
| Hero and enquiry illustration | Fictional example, labelled "Not a real enquiry". Chips Ad seen · Enquiry sent · Received. **Fixed:** "Real enquiries from people who need what you sell" (claimed genuine and relevant) → "Enquiries from potential customers…" |
| Problem | "Too few … or too many of the wrong ones?" describes the client’s situation, not a claim about our enquiries. "More sorting" refers to the client’s inbox |
| What we do | **Fixed:** "right buyers" → "the people you want"; "buyers" → "potential customers"; delivery testing now conditional |
| Journey | The owner’s three steps; no confirmation step; no holding, filtering or review |
| Accountability | **Fixed:** H2, relay and report tile; "review call" removed; no promise of numbers, cost or conversion (kept as "won’t promise") |
| FAQ | **Fixed:** answer 1 "…so enquiries go straight to your team." Answer 2 and 3 compatible |
| Closing | "How many are any good?" asks the **client** to assess their own enquiries; no claim about quality. "What happens next" is MappedSkills replying to a prospective **client** (`DEC-051` item 5), not a campaign enquiry. Kept |
| Proposed metadata | Option A says "enquiries worth calling back". This is an aspiration, **not** a claim that every enquiry is, but it is the closest remaining quality implication. Flagged for the owner (LG-D19). The live meta is unchanged and still contradicts the page |
| Review documents | Current-state statements are consistent. Older text that mentions confirmation, review or the five checks appears only as **live quotes** or as **history** in the Correction 01 and 02 records and in `LG_G1_COPY.md` "Live" columns. The production proposal now uses the Confirmation 04 wording and explicitly excludes the review call |
| Live H1 | "an enquiry you can actually act on" is live wording; it mildly implies usable enquiries. Not a guarantee; flagged under LG-D01 |

## 6. Checks run (17 Oct 2026, Chromium via Playwright, local preview)

| Check | Result |
|---|---|
| Timing | Gaps between steps measured at 2,002 to 2,004 ms in all four journeys (hero, What we do, section 4, What happens next); first step visible on load; plays once and keeps its final state |
| Keyboard | Enter on "Show step 2" shows step 2; the sequence stops and stays there after 2.6 s; 15 labelled step buttons |
| Reduced motion | All four journeys static |
| No JavaScript | Nothing hidden; all FAQ items closed; chip and "Your ad" strip visible |
| Responsive and overflow | 1440, 1366, 390 and 320: no horizontal overflow. Hero fits above the fold at 1440×900 (ends 611 px), 1366×768 (600) and 1280×720 (587) |
| Console | 0 errors at all four widths |
| Dashes | 0 long or double dashes in the page copy |
| Copy audit | 0 forbidden terms |
| **Not run** | Screen-reader testing, browsers other than Chromium, real-device touch |

## 7. Unverified claims and unresolved decisions
- **UNKNOWN / not claimed:** that any particular client’s integration works; the data basis of the monthly report; whether the shared "qualified enquiry" check applies to client campaigns.
- **Not confirmed (removed):** a monthly review call. The earlier `DEC-051` item 5 reading is now contradicted by the owner; record this when G1 is decided.
- **Live-copy phrases kept:** "Where we can tell, which work brought it in." (attribution hedge), "an enquiry you can actually act on" (H1), "We don’t call your enquiries to qualify them".
- **Open decisions:** the five recommendations in §3; LG-D28 wording approval; LG-D24 production correction authorisation (still **not authorised**; the proposal is refreshed); LG-D23 (breadcrumb stays "Enquiry generation"); final G1 approval of every other LG-D item.

## 8. Owner-approval checklist (tick = approve; nothing is pre-approved)
1. ☐ **G1 direction** and the revised copy in §2 (each LG-D item answers separately; visual approval is not copy approval).
2. ☐ **LG-D28** targeting wording: "You tell us who you want to reach. We build campaigns around them."
3. ☐ **LG-D08** conditional delivery-testing wording: "Where the setup allows, we test that enquiries reach the right destination."
4. ☐ **LG-D30** reporting wording: "You receive a monthly report on campaign performance." (no review call)
5. ☐ **LG-D27** delivery wording; list any exceptions to direct delivery if they should be stated.
6. ☐ **LG-D01** retain the live H1.
7. ☐ **LG-D03** add "Book a call" → `/schedule-call`.
8. ☐ **LG-D19** meta description option A (implementation separately authorised).
9. ☐ **LG-D22** scope the privacy-policy budget reference separately.
10. ☐ **LG-D29** scope the "published definition" references separately; leave shared accountability positioning alone.
11. ☐ **LG-D24** authorise or decline the narrow production correction (proposal in `LG_PRODUCTION_CORRECTION_PROPOSAL.md`).
12. ☐ Authorise G2 (not started).
