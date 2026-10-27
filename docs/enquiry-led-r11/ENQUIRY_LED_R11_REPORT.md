# Enquiry-Led Businesses R1.1: storytelling and motion refinement

27 October 2026. Local preview only. Nothing committed, pushed, merged or deployed. No live page, production SEO, sitemap, navigation or redirect changed. R1 is left untouched beside R1.1 so the two can be compared.

Labels follow `CLAUDE.md`. All copy and design choices are WORKING HYPOTHESES until the owner approves them.

## 1. Preview

- **R1.1 (new):** `http://localhost:3412/enquiry-led-preview-r11`
- **R1 (before, unchanged):** `http://localhost:3412/enquiry-led-preview-r1`
- **Isolation (VERIFIED in the dev browser and by test):** `noindex, nofollow`; no canonical; the only JSON-LD is the site-wide Organization node; the page calls `notFound()` when `NODE_ENV === 'production'`; absent from `app/sitemap.ts` and `components/direction-c/nav.ts`; no `app/(pages)/who-we-help/enquiry-led-businesses`. A production build was not run (it would overwrite the dev server's `.next` folder).
- **Owner request 1 done:** the sentence "Illustration of the idea. The dots are not data. Not every enquiry becomes a conversation or a sale." is removed. So are the hero caption "Illustration of the idea. Not a result.", "Our approach, not client results" and the FAQ line about having no case studies. A test asserts none of them appears.

## 2. Audit of R1 (before changes)

Reviewed at 1440 and 390 px. Screenshots: `screenshots/before/`.

| # | Section in R1 | What the visitor learns | Weakness found | Motion worth having? |
|---|---|---|---|---|
| 1 | Hero | Four identical faint forms, then a conversation. The message "enquiries vs conversations" is implied, not shown | Too abstract. Four equal grey cards say nothing about *which* enquiry matters. Low contrast. Nothing says what an enquiry is | Yes, short: one enquiry rising out of many |
| 2 | Problem ("A form submission is not yet a conversation") | Three kinds of enquiry, as three text cards | A paragraph per card for one idea. Quantity versus relevance is told, not seen. Three bordered cards read as a feature list. Lede and card text partly repeat each other | Selective interaction: sorting the same list |
| 3 | Who this is for | Four behaviours, an examples row, three sibling links | Behaviours were abstract labels ("Discuss requirements") with a definition each. Visitors recognise their business by what customers *say*, not by a label. Four identical columns, little hierarchy | No. Reveal only |
| 4 | Narrowing path | Five stages with groups of marks that shrink | Needed a caption to explain it (owner point). The marks that dropped out simply vanished, so narrowing was implied by smaller clusters rather than seen. Stage icons absent, so five text columns carried the story | Yes, once, in order |
| 5 | Google and Meta | Two static cards, each with a generic icon | Said "two platforms" but not why they complement each other. No customer situation shown. Cards were near twins. Icon, label, heading, paragraph, fit line all stacked | Yes, once: each moment, then how they combine |
| 6 | Campaign decisions | Six numbered text items | Six disconnected feature cards. No link between audience, offer, location, message and next step. Items 5 and 6 (reply speed, budget) were not "decisions that shape the ad" | Yes, once: choices assembling into one ad |
| 7 | Method and measurement | Five numbered steps in a row, then a three-item ladder | Looked like the path again (a horizontal sequence). "Method panel. Our approach, not client results." was defensive. Learning was not shown informing the next round | Yes, once: steps that rise, then a return |
| 8 | FAQs and close | Seven FAQs and a CTA | FAQ 6 volunteered "no case studies for this audience", defensive and unhelpful. Close line "Tell us how your customers enquire" did not build on the story | No |

**Flow problems found.** Section 2 and section 3 both opened with a definition-style lede. Sections 5 and 6 repeated the same card pattern. The page never said *why* an enquiry sorting matters before moving to recognising the business, so the order "Why enquiry relevance matters" was missing as its own beat.

## 3. Section by section: what changed and why

| # | R1.1 section | Change | Why it follows the previous section |
|---|---|---|---|
| 1 | Hero | The illustration is now an inbox of five plain enquiries, four dimmed (browsing, price check, something you do not do, a job seeker) and one highlighted ("Needs what you offer and wants to talk") that opens into a short conversation. Replaces four abstract cards. No names, counts or ratios | Shows the headline: many enquiries, one worth a conversation |
| 2 | Why relevance matters (new beat) | One inbox, two views, switched with "All enquiries" and "Relevant to you" (CSS only radios, works without script). In the second view the irrelevant rows fade and three are tagged "Relevant". A closing line states the benefit. Replaces the three text cards | Turns the hero's idea into something the visitor can try |
| 3 | Recognise your business | The four behaviours become what customers say first: "Can you send me more details?", "This is what I need. Can you help?", "Could we talk this week?", "What would this cost for my situation?". Examples recast as "You might run": a consultancy, a specialist service, made-to-order work, an appointment-based service. Sibling links kept | Moves from "which enquiries" to "is this you?" in the customer's voice. No industry expertise implied |
| 4 | Narrowing path | Same idea, clearer. Every stage now shows the same crowd of 15 places: the people still moving are solid, those who moved on stay as faint places, so the narrowing is visible. A small icon sits above each stage heading (question, search, tick, envelope, speech bubble). Caption removed | Follows from "they ask before they buy": here is how they get from a need to the ask |
| 5 | Two moments, one customer | Two situations drawn as skeleton scenes: someone searching on Google (a search bar and a result) and someone browsing Meta (a feed post). Below, "How the two can work together": Meta introduces you, They search for you on Google, They enquire | Takes the path's "looks around and compares" and shows where each platform meets the customer |
| 6 | Five choices that make the ad | Six cards became five connected choices (Audience, Offer, Location, Message, Next step), each with a question and a short line, beside one ad that assembles piece by piece with matching numbers. On hover a choice outlines its part. Reply speed folds into Next step; relevance moves to measurement; budget stays an FAQ and proposal matter | Moves from "where we reach them" to "what we decide so the ad and the enquiry work" |
| 7 | How each round teaches the next | Five steps now rise like a staircase (not another horizontal row), ending in a dark "Improve", with a dashed return arrow "What we learn shapes the next plan." Below, what each round draws on: campaign data we can see plus enquiry feedback you share, leading to clearer next decisions. No claim of automatic optimisation or access to unshared sales data | Follows the decisions with how they get better over time |
| 8 | FAQs | Same seven. New first question "How would you approach our business?" replaces the defensive case-study answer. Order now practical first | Answers the natural next worry |
| 9 | Close | "Let’s work out what a good enquiry looks like for you." builds on the page's central idea. Same single CTA | Ends on the page's own question |

## 4. Animation explanation (frames in `frames/`)

All motion is once-only, short, CSS-driven, and ends in the same picture the page shows without it. Nothing loops, nothing is sticky or scroll-linked, no `scrollIntoView`, no scroll hijack.

| Where | What plays | Length | Frames |
|---|---|---|---|
| Hero | The four unwanted rows ease to half strength, the relevant row lights up, a dashed line drops and a conversation appears, then the reply | about 2.5 s from load (pure CSS, so it also runs without script) | `hero-1-start`, `hero-2-conversation-appearing`, `hero-3-settled` |
| Relevance | No timed animation. Interaction only: the toggle fades rows over 0.35 s | n/a | `screenshots/after/desktop-1440-relevance-all`, `...-relevant` |
| Narrowing path | A quiet outline first (marks faint, text faint). On entering view, stage 1's marks settle, then stage 2, 3, 4 and 5 at 0.5 s intervals, each with its text | about 2.7 s | `path-1-quiet-outline`, `path-2-stage-one`, `path-3-stage-two`, `path-4-settled` |
| Two moments | Search bar fills, then the result appears; Meta post appears 0.3 s later; then the three-step strip lights in order | about 2.5 s | (shown in the settled screenshot `desktop-1440-moments`) |
| Five choices | Ad parts appear in order 1 to 5, 0.3 s apart, with their matching list items | about 1.8 s | `decisions-1-assembling`, `decisions-2-settled` |
| Method | Steps rise left to right 0.25 s apart, then the return arrow fades in | about 2 s | `method-1-rising`, `method-2-settled` |

**Fallbacks.**
- *No JavaScript:* script is the only thing that arms the quiet starting states, so without it everything is already in its final state. Simulated in the browser by removing the arming attributes: every mark, step, ad part, scene and strip step was fully visible. The relevance toggle works because it uses radio inputs and CSS. The hero animation is CSS-only and runs, or is skipped, with no script.
- *Reduced motion:* script does not arm anything, and the CSS disables the hero animation and every transition. **Not browser-emulated here** (the pane cannot set the preference); verified by code.
- *Mobile (860 px and below):* the path becomes a vertical strip with the words beside it; the staircase becomes an indented list; the ad sits below its five choices.
- *Accessibility:* decorative marks, scenes and the ad are `aria-hidden`; the hero illustration has a text alternative; stage lists are real ordered lists; the toggle is a labelled radio group with a visible keyboard focus ring and a polite live region.
- *Layout shift:* measured CLS on load was 0 at 390 px; animations change opacity and transform only.

**Note on the capture tool.** The preview pane throttles CSS animations when it is not actively rendering, so some screenshots taken right after load show a stale early frame (the hero conversation absent). A later screenshot and the computed styles confirmed the settled state. In a normal browser the sequence runs on its own.

## 5. Copy changes

| Where | R1 | R1.1 |
|---|---|---|
| Hero caption | "Illustration of the idea. Not a result." | removed |
| Path caption | "Illustration of the idea. The dots are not data. Not every enquiry becomes a conversation or a sale." | removed (owner request) |
| Hero lede | "...help relevant potential customers discover your business..." | "...help relevant people discover your business and take a sensible next step, so your team spends time on conversations worth having." |
| Section 2 | "A form submission is not yet a conversation." with three cards | "Not every enquiry is worth the same." Same inbox, two views. Closing line: "Advertising can help the right people ask, and clear messaging helps the others decide early." |
| Section 3 heading and lede | "Businesses where people ask before they buy." / "You may be a fit if customers usually take a step like these before they decide." | "Your customers ask before they buy." / "If you hear things like these first, this page is for you." |
| Behaviours | Request information; Discuss requirements; Arrange a consultation; Ask for a quote or proposal (each with a definition) | The same four labels, each with a customer line (see section 3) |
| Examples | "For example" plus four chips and the note "Examples only, to help you recognise your own situation." | "You might run" plus four chips; note removed |
| Path lede | "Fewer people at every step is normal. Advertising can help the right people move forward, and the others move on sooner." | "Fewer people move forward at every step. Advertising helps the right ones find you." |
| Roles | "Two platforms. Two moments." / "People reach an enquiry in different ways..." | "Two moments. One customer." / "The same person can discover you on Meta and look for you on Google. We recommend where to start." Two situation cards plus the strip |
| Decisions | "The choices that shape the enquiries you get." with six items | "Five choices shape every enquiry." with five connected choices and the ad |
| Method | "An advertising method, not a promise." / "...It describes our approach, not results we have achieved for any client." / panel label "Method panel. Our approach, not client results." | "Each round teaches the next one." / "We learn from the campaign data we can see and the enquiry feedback you share, then decide what to change." / label removed |
| Measurement | "Judge it by more than the lead count" ladder | "What each round draws on": campaign data we can see, enquiry feedback you share, clearer next decisions, and "The more you share, the more we can learn." |
| FAQ 1 | "Is this the same as your lead generation service?" | "How would you approach our business?" (new, first) |
| FAQ 6 | "Do you specialise in our industry?" with "We have no case studies for this audience to show you yet..." | removed; lead-generation difference question moved to sixth |
| Close | "Tell us how your customers enquire." | "Let’s work out what a good enquiry looks like for you." |

Full copy: `components/enquiry-led-r11/content.ts` (it is the single source). Preview metadata is unchanged from R1: title "Google & Meta Ads for Enquiry-Led Businesses | MappedSkills" (59 characters) and the same 159-character description; heading hierarchy: one H1, one H2 per section, H3 for items, no production SEO touched.

## 6. QA results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Passed |
| `npx eslint` on the new files | Passed |
| New test `tests/enquiry-led-r11-preview.test.cjs` | 9 of 9 passed: isolation, removed sentences, story order, no proof or figures or dashes, no-JS toggle, path markup, five choices and ad parts, 15 to 25 word descriptions, link destinations |
| Full suite `npm test` | 502 tests, 501 passed, 0 failed, 1 skipped (pre-existing) |
| Horizontal overflow | None at 320, 360, 390, 768, 1024 and 1440 px (`scrollWidth` equals `clientWidth` at each) |
| Layout shift | CLS 0 on load at 390 px (PerformanceObserver) |
| Initial scroll | `scrollY` was 0 after load; the page has no scroll code |
| Hero | Viewed at 1440 and 390 px, settled and mid-animation |
| Sections and animations | Each section viewed at 1440 and 390 px, settled; path, decisions and method also viewed mid-play at 1440 px |
| Relevance toggle | Operated in the browser: radio state, row dimming, tags and summary text all switch |
| FAQ interaction | A question opens and closes (native details) |
| CTA destinations | Listed from the page: `/contact`, `/contact?intent=call`, `/google-ads`, `/social-media-ads`, `/pricing`, `/lead-generation`, and the three sibling pages. Not clicked |
| No JavaScript | Simulated by removing the arming attributes: all animated elements at full opacity. Not run with script truly disabled |
| Reduced motion | Not emulated in a browser; verified by code |
| Unverified proof | None: no client, logo, testimonial, figure, case card, image or fake dashboard. Test-asserted |
| Not done | Real devices, screen readers, Firefox and Safari, contrast measurement, Lighthouse, production build, visual review at 320, 360, 768 and 1024 px (R1.1 was reviewed visually at 1440 and 390 px only; the other four widths were checked for overflow, not by eye) |

## 7. Exact files changed

New, untracked (nothing committed; R1 files from the earlier task are unchanged):
- `app/enquiry-led-preview-r11/page.tsx`
- `components/enquiry-led-r11/EnquiryLedR11.tsx`
- `components/enquiry-led-r11/InViewOnce.tsx` (copy of the earlier helper, kept isolated)
- `components/enquiry-led-r11/content.ts`
- `components/enquiry-led-r11/enquiry-led-r11.css`
- `tests/enquiry-led-r11-preview.test.cjs`
- `docs/enquiry-led-r11/ENQUIRY_LED_R11_REPORT.md`, `docs/enquiry-led-r11/screenshots/before`, `.../after` and `docs/enquiry-led-r11/frames/`

No existing file was modified. Reuses, without editing, `components/resolve-home-r3/resolve-home-r3.css` and `RvReveal3`. To remove the preview: delete the files above (and the R1 set if R1 is no longer needed).

## 8. Remaining concerns

1. **Visual approval** of R1.1, desktop and mobile, and in particular the inbox hero, the relevance toggle, the ghost-place path, the ad assembly and the staircase.
2. **The relevance toggle** uses `:has()`; older browsers show only the "All enquiries" view (the content is still readable). Acceptable?
3. **Example rows in the hero and the toggle** ("Looking for a job, not a service", "Outside the area you serve") are generic illustrations, not claimed client data. Confirm the wording.
4. **Interaction on touch.** The ad-part highlight on hover is a desktop extra; on touch the numbers alone link choices to ad parts.
5. **Meta and Google scenes** are skeleton drawings with no brand marks. Confirm that level of abstraction.
6. **Reduced-motion and true no-JavaScript** need a real-browser check before approval of motion.
7. **Carried forward from R1:** SERP and autocomplete validation before the title and description are final; the production route, homepage card and navigation entries need a decision record; YouTube remains unconfirmed and unmentioned.
8. **Records owed** from earlier audits (D2C R1.1, Education R2B and Real Estate R2.1 approvals, production release of the bundle) remain absent from `DECISION_LOG.md`.
