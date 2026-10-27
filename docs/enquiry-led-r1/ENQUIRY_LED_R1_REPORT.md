# Enquiry-Led Businesses R1: content-first local preview report

27 October 2026. Local preview only. Nothing committed, pushed, merged or deployed. No production route, metadata, sitemap, navigation or `/lead-generation` change. Worktree: `MappedSkills-home-r2`.

Labels follow `CLAUDE.md`. All copy and design choices are WORKING HYPOTHESES until the owner approves them.

## 1. Preview

- **Local URL:** `http://localhost:3412/enquiry-led-preview-r1` (dev server of this worktree).
- **Isolation (VERIFIED, local dev):** `<meta name="robots" content="noindex, nofollow">`; no canonical link; the only JSON-LD on the page is the site-wide Organization node from the root layout, with no page-specific schema; not in `app/sitemap.ts`; not in `components/direction-c/nav.ts`; no route at `app/(pages)/who-we-help/enquiry-led-businesses`.
- **404 in production (NOT run as a build):** the page calls `notFound()` when `NODE_ENV === 'production'`, the same mechanism as the Education, D2C and Real Estate previews. A production build was not run, because it would overwrite the `.next` folder the dev server is using. A static test asserts the guard.

## 2. Screenshots (`docs/enquiry-led-r1/screenshots/`)

| File | View |
|---|---|
| `desktop-1440-hero-problem.jpg` | Hero (illustration finished) and start of the problem section |
| `desktop-1440-problem.jpg`, `desktop-1440-who.jpg` | Problem, audience |
| `desktop-1440-path.jpg` | The narrowing path, finished |
| `desktop-1440-platforms.jpg`, `desktop-1440-method.jpg`, `desktop-1440-faq-close.jpg` | Platforms, method and measurement, FAQs and close |
| `mobile-390-hero.jpg`, `mobile-390-path-a.jpg`, `mobile-390-path-b.jpg` | 390 px hero and the vertical path |
| `mobile-320-method.jpg`, `tablet-768-path.jpg` | 320 px method panel, 768 px path |

Screenshots were taken before three small copy lengthenings and a hero-card contrast tweak (see section 7); they are a close, not exact, match. The decisions section was not captured by screenshot.

## 3. Complete page copy

### Metadata (preview recommendation)
- Title (59): Google & Meta Ads for Enquiry-Led Businesses | MappedSkills
- Description (157): Google Ads and Meta Ads for businesses where customers enquire before they buy. Reach relevant people and judge advertising by conversations, not form fills.

### 1. Hero
Eyebrow: Who we help: enquiry-led businesses
**H1:** More enquiries are good. Better conversations are worth more.
Google Ads and Meta Ads help relevant potential customers discover your business and take a sensible next step, so your team spends time on conversations worth having.
CTAs: "Discuss Your Advertising" to /contact; "Request a call" to /contact?intent=call
Caption: Illustration of the idea. Not a result.

### 2. A form submission is not yet a conversation.
People enquire for many reasons. Advertising works best when it helps the right ones find you, and the wrong ones decide early.
- **Some are only browsing.** Early research and price checking produce enquiries that were never going to become customers, however many arrive.
- **Some are not a fit.** Unclear messaging attracts people who want something you do not offer, and your team pays for that in time.
- **Some are ready to talk.** These are the enquiries that matter. Clear messaging and a simple way to ask make them easier to start.

### 3. Businesses where people ask before they buy.
You may be a fit if customers usually take a step like these before they decide.
- **Request information.** They want details on what you offer, how it works or whether it suits them before going further.
- **Discuss requirements.** Their needs are specific, so a conversation with you shapes what you recommend, quote or deliver.
- **Arrange a consultation.** They book time, ask for a call or visit, or message you to talk it through.
- **Ask for a quote or proposal.** The price or scope depends on the job, so they ask for a quote or proposal before they commit.
For example: Consultancies, Specialist services, Made-to-order work, Appointment-based services. Examples only, to help you recognise your own situation.
- Selling products online? [See D2C brands](/who-we-help/d2c)
- Teaching or training? [See education](/who-we-help/education)
- Developing property? [See real estate](/who-we-help/real-estate)

### 4. How a stranger becomes a conversation.
Fewer people at every step is normal. Advertising can help the right people move forward, and the others move on sooner.
1. **Has a need or question.** Someone needs something or wants to understand their options. They may not know your business exists yet.
2. **Looks around and compares.** They search, scroll and read about providers. Advertising can put you in front of them while they decide.
3. **Sees a possible fit.** Clear messaging helps them judge whether you suit their situation. Some decide you do not, which saves time on both sides.
4. **Chooses to enquire.** A few ask a question, request information or share what they need, using the route you offer.
5. **A conversation may follow.** Your team replies and talks through what they need. That conversation, and what comes of it, is yours.
Caption: Illustration of the idea. The dots are not data. Not every enquiry becomes a conversation or a sale.

### 5. Two platforms. Two moments.
People reach an enquiry in different ways. We recommend which platform, or both, after we understand your customers.
- **Google Ads: When they are already looking.** Reach people searching for what you offer, at the moment they compare providers and decide to ask. *Fits when* Customers search for your service or the problem it solves.
- **Meta Ads: Before they start looking.** Introduce your business to people who match your audience on Facebook and Instagram, and invite them to enquire or message you. *Fits when* Your service is considered, visual or needs explaining.
Click-to-WhatsApp is available on Meta where it suits your customers.
Links: Explore Google Ads (/google-ads), Explore Meta Ads (/social-media-ads)

### 6. The choices that shape the enquiries you get.
Good enquiries come from a handful of clear decisions, made before and during the campaign.
- **Who you want to reach.** The customers, places and situations that suit your business, and the ones that do not.
- **What you say.** An offer and message that make it easy to see what you do, and who it is for.
- **How people ask.** A form, a call or a WhatsApp message, matched to how your customers prefer to get in touch.
- **What counts as relevant.** Your team’s view of a good enquiry, which guides how we judge and improve the campaigns.
- **How quickly you reply.** Enquiries cool fast. Knowing who answers, and how soon, helps the advertising do its job well.
- **Budget and pace.** How much you can invest, and how fast to learn, before deciding what to scale.

### 7. An advertising method, not a promise.
This is how we work. It describes our approach, not results we have achieved for any client.
Panel label: Method panel. Our approach, not client results.
1. **Understand.** Your offer, your customers and how they usually enquire.
2. **Plan.** Choose the platforms, audiences, messages and budget.
3. **Test.** Try messaging and targeting to see what people respond to.
4. **Review.** Look at the results available to us, and what you tell us.
5. **Improve.** Adjust the campaigns, then repeat.
Then back to the start, with more to go on.
**Judge it by more than the lead count.** Where you share the information, we look beyond enquiries received.
- **Enquiries received.** The starting point, and never the whole story.
- **Enquiries your team finds relevant.** Your judgement of fit, shared with us where you can.
- **Conversations that move forward.** What your team sees after the first reply.

### 8. FAQs
- **Is this the same as your lead generation service?** No. This page is about the businesses we help: those whose customers enquire before buying. Our lead generation page explains how enquiries reach your own form, CRM or WhatsApp. [Read about lead generation](/lead-generation)
- **Do you speak to or qualify our enquiries?** No. Enquiries go to your team, who hold the conversation, the quote and the sale. We manage the advertising and review the information you share with us.
- **Can you guarantee enquiries, quality or sales?** No. Results also depend on your offer, pricing, website, competition and how quickly you reply. We agree the work and how progress is judged, and promise no set numbers.
- **Where do enquiries go, and what about tracking?** To your own form, phone or WhatsApp, depending on your setup. We review available data and recommend improvements. New tracking, form or CRM work is scoped separately unless your proposal includes it.
- **Can people message us on WhatsApp from an ad?** Yes, Click-to-WhatsApp ads on Meta can suit businesses where your team can reply quickly. Your team handles the chat. Chat automation and CRM integration are not included unless your proposal says so.
- **Do you specialise in our industry?** We start from how your customers buy, not your industry. We have no case studies for this audience to show you yet, so we explain our approach clearly and you judge the fit.
- **What do reports and costs look like?** You receive a monthly performance report with ongoing management, and review calls as agreed in your proposal. Ad spend is paid directly to Google or Meta. Our fee is separate. [Our pricing approach](/pricing)

### 9. Close
**Tell us how your customers enquire.** Share what you offer and how people usually ask about it. We will tell you honestly whether advertising suits you. CTA: "Discuss Your Advertising" to /contact.

## 4. The narrowing-path animation

**Idea.** One tapering band runs left to right (top to bottom on mobile). Five stages sit along it, each showing a group of identical marks. The group gets smaller at every stage, which is the point: fewer people move forward, and that is normal. Grey marks are people with a need. Marks turn to tangerine outlines (seeing a possible fit), then solid tangerine (chose to enquire). The last stage is a single dashed ring holding a speech-bubble icon, dashed because a conversation *may* follow.

**What it avoids.** It never says advertising qualifies people or guarantees sales. The caption states the dots are not data. It does not reuse Education's three parallel routes or Real Estate's five-step ring with a handoff.

**Motion (once only).** With script and no reduced-motion preference, the section arms a quiet outline: marks at 20% strength and small, text at 35%, the band edge present. When 30% of the section is in view, stage 1 settles, then each later stage follows at 0.55 s intervals (marks stagger by 35 ms); total about 3 s. Nothing loops, nothing is sticky, no scroll-linked behaviour, no scroll jump.

**Fallbacks.**
- *No JavaScript:* the armed state is only ever set by script, so the page shows the finished picture.
- *Reduced motion:* the observer exits before arming, and transitions are disabled; finished picture shown.
- *Mobile (860 px and below):* the band becomes a vertical strip on the left holding the marks, with the words beside it; same order, same once-only play.
- *Accessibility:* the marks are `aria-hidden`; the real content is an ordered list with headings. The hero illustration has a text alternative.

**Hero illustration.** Several identical quiet enquiry forms fade in, then one conversation (two speech bubbles) comes to full strength once, about 2 s. It has no text, numbers or ratios. Under reduced motion it shows the finished state.

## 5. SEO differentiation from `/lead-generation`

| | `/lead-generation` (live, untouched) | Preview (proposed `/who-we-help/enquiry-led-businesses`) |
|---|---|---|
| Subject | A service: how enquiries are generated and reach your team | An audience: businesses where customers ask before they buy |
| Primary intent | Service, "lead generation" | Audience plus paid advertising: Google and Meta Ads for enquiry-led businesses |
| H1 | "Lead generation, where the unit is an enquiry you can actually act on." | "More enquiries are good. Better conversations are worth more." |
| Title | "Lead Generation Where the Unit Is an Enquiry You Can Act On \| MappedSkills" | "Google & Meta Ads for Enquiry-Led Businesses \| MappedSkills" (59 characters, preview recommendation) |
| Copy overlap | Operating model, delivery testing, relay graphic | None copied. Shared facts (no qualification calls, enquiries go to the client's channel, monthly report) appear as FAQ boundaries in new words |
| Cross-link | none to the preview | One contextual link in FAQ 1 to `/lead-generation`; the live page is not edited |

**Preview metadata (recommendation, not applied):** title as above; description (159 characters) "Google Ads and Meta Ads for businesses where customers enquire before they buy. Reach relevant people and judge advertising by conversations, not form fills." Heading hierarchy: one H1; one H2 per section (2 to 7 and the FAQ and close); H3 for items; the path stages are an ordered list under an H2. No Service, Review, Rating or Offer schema; BreadcrumbList and FAQPage only at launch, matching the visible questions.

**Caution (carried from the audit).** The primary keyword theme remains a WORKING HYPOTHESIS: no volumes or SERP data have been gathered. A SERP and autocomplete pass is recommended before the title and description are finalised. Avoid "lead generation agency" as a target; it belongs to the service page.

## 6. QA results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Passed (exit 0) |
| `npx eslint` on the new files | Passed (exit 0) |
| New test `tests/enquiry-led-r1-preview.test.cjs` | 6 of 6 passed: isolation, one H1, no figures or dashes or case-study markers or images, method label, five stages, 10 to 30 word descriptions, link destinations |
| Full suite `npm test` | 493 tests, 492 passed, 0 failed, 1 skipped (the skip is pre-existing). Run before the final three copy edits; the new test file was re-run after them (6 of 6 pass) |
| Horizontal overflow | None at 320, 360, 390, 768 and 1024 px (`scrollWidth` equals `clientWidth`); 1440 px checked visually only |
| Hero and content alignment | Content uses the shared `.rv3-wrap`, so edges align with the header at the widths viewed |
| Narrowing path | Viewed finished at 1440, 768 and 390 px, with marks, tapering and the dashed final ring correct. The in-view play ran in the browser pane; its frame-by-frame timing was not recorded |
| Mobile | Vertical path, method panel and hero viewed at 390 and 320 px. Remaining sections at 320, 360 and 768 px were checked for overflow only, not visually |
| Reduced motion | **Not emulated in a browser.** Verified by code: the observer returns early and transitions are disabled |
| No JavaScript | **Not tested in a browser.** Verified by design: the armed state is applied only by script; server HTML has no `data-arm` |
| FAQs and CTA destinations | Asserted in the test: `/contact`, `/contact?intent=call`, `/google-ads`, `/social-media-ads`, `/pricing`, `/lead-generation`, and the three sibling pages. Links were not clicked |
| Automatic scroll jump | None: no scroll code on the page; `scrollY` stayed at the top on load |
| Unverified proof | None: no client, logo, testimonial, figure, case card, fake dashboard or image. Checked by test |
| Live lead-generation page | Not modified by this task. No change under `app/(pages)/lead-generation`, `components/cplus` or `app/sitemap.ts`. `next.config.mjs` shows a 16-line uncommitted diff that predates this task (it was in the worktree's first status); its `/lead-generation-services` redirect is unchanged |
| Not done | Real-device and screen-reader testing, Firefox and Safari, contrast measurement, Lighthouse, production build |

## 7. Exact files changed

New (all untracked, nothing committed):
- `app/enquiry-led-preview-r1/page.tsx`
- `components/enquiry-led-r1/EnquiryLedR1.tsx`
- `components/enquiry-led-r1/InViewOnce.tsx` (copy of the Education R2 helper, kept isolated)
- `components/enquiry-led-r1/content.ts`
- `components/enquiry-led-r1/enquiry-led-r1.css`
- `tests/enquiry-led-r1-preview.test.cjs`
- `docs/enquiry-led-r1/ENQUIRY_LED_R1_REPORT.md` (this file) and `docs/enquiry-led-r1/screenshots/`

No existing file was modified by this task. (The worktree already contained other uncommitted changes, unrelated to this task, such as the header navigation edits.) Reuses, without editing: `components/resolve-home-r3/resolve-home-r3.css` and `RvReveal3`.

To remove the preview: delete the five new folders and files above.

Changes made after the screenshots: dots per row corrected (stage 1 now five per row), hero card contrast raised, the path heading widened, and three descriptions lengthened to 15 or more words.

## 8. Unresolved decisions

1. **Visual approval** of the page, desktop and mobile, and the narrowing path in particular.
2. **Example business types.** The preview uses four generic examples (consultancies, specialist services, made-to-order work, appointment-based services). Confirm, change or remove them. No health, legal or finance examples are used.
3. **FAQ 6 candour.** "We have no case studies for this audience to show you yet" is honest but could be softened or removed; approve or revise.
4. **Method and ladder step captions** are short (5 to 12 words) by design as labels; they are outside the 15 to 25 word guide.
5. **Cross-links to the other three audience pages** appear in the audience section. Keep, or drop?
6. **Production route and recording.** Needs a decision entry covering the name `/who-we-help/enquiry-led-businesses` (U1/U2 in the audit), the homepage card (the `enquiry-led` card is still Real Estate), and the header and footer Who We Help entries. None is done.
7. **SEO validation** (SERP and autocomplete pass) before any title or description is final.
8. **YouTube** remains unconfirmed and is not mentioned; "other Google Ads campaign types" is also not mentioned.
9. **Records owed** from earlier audits (D2C R1.1, Education R2B, Real Estate R2.1 approvals; production release of the bundle) are still not in `DECISION_LOG.md`.
