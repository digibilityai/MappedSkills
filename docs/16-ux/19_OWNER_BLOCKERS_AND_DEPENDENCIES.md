# Owner Blockers and Dependencies — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `OWNER_INPUT_REGISTER.md` (Session 09) · `COPY_PLACEHOLDER_STANDARD.md` §1 item 19 · the approved page copy's placeholder sections.

> **The binding rule for this whole document:** **do not fill a placeholder with a plausible default, and do not reshape the UX so that a missing load-bearing fact stops being needed.**
>
> Reshaping is the subtler failure and the one a UX session is most likely to commit. A structure that quietly routes around a blocked fact has not preserved the blocker — it has disposed of it.

**Format.** Each blocker states its **DEFAULT STRUCTURE** (what the UX does now), its **BLOCKED CONTENT SLOT** (what is reserved and renders nothing), and **WHAT OWNER INPUT UNLOCKS IT**.

**A blocked slot renders nothing.** It is not an empty container, not a placeholder, not a silhouette, not "coming soon" (B15, U15).

---

## 1. The real delivery process

**Blocks:** `/how-it-works` (BLOCKING) · `/services` sequence · **F17, which must not be designed** · `/blog` article 2's dependency.

| | |
|---|---|
| **DEFAULT STRUCTURE** | `/how-it-works` retains its full section architecture: the diagnostic argument, what is measured, what is not, **what cannot be attributed at a third of the page's weight**, where human judgement enters, where capabilities sit, what the client provides, the uncertainty block, and the action at the end. **Those sections are unblocked and carry the page's proof value.** |
| **BLOCKED CONTENT SLOT** | §2, the stages — what happens, what is needed from the client, what is produced, what is measured, **what cannot be concluded from it**, per stage. **Renders nothing.** |
| **WHAT UNLOCKS IT** | The owner describing what genuinely happens on a real engagement, stage by stage, including what cannot be concluded from each stage. |

**Do not design around it.** The approved stage outline is the architecture, **not a description of what happens**, and drawing it would fabricate the exact content the page exists to prove — in a form more likely to be screenshotted and cited than a paragraph.

---

## 2. Company facts and complete NAP

**Blocks:** `/contact` §4 (BLOCKING) · `/about` §6 (BLOCKING) · the footer entity block · all `Organization`/`LocalBusiness` schema · every directory profile.

| | |
|---|---|
| **DEFAULT STRUCTURE** | `/contact` retains the form, the direct-contact section, the cross-link and the "what happens next" heading. `/about` retains sections 1, 2, 3, 5, 7 and 8. The footer retains its four columns. |
| **BLOCKED CONTENT SLOT** | Legal entity name · complete registered postal address **including a real postal code** · published phone · published email · founding year. **The entity block renders nothing rather than a partial address.** |
| **WHAT UNLOCKS IT** | The exact legal entity name as used in contracts, the complete registered address, the phone and email to publish, and the founding year. |

**Two specific prohibitions.** The current schema's `postalCode` field contains the word **"India"**, which is malformed on its own terms — **it must not be carried forward, and it must not be treated as a partial answer.** AI systems report a founding year of **2016 from LinkedIn**, which is **NOT VERIFIED** in this programme and **must not be used as a default.**

---

## 3. Team, people and authorship

**Blocks:** `/` Block 6 people element · `/about` §4 (BLOCKING) · every article byline · every research entry byline · `Person` schema · the responder portrait on `/contact` and `/schedule-call`.

| | |
|---|---|
| **DEFAULT STRUCTURE** | `/` Block 6 lists the method, the AI-visibility measurement and (when unblocked) the own-site diagnostic. `/about` retains its other seven sections. Research entries and articles retain their full structure. |
| **BLOCKED CONTENT SLOT** | Named people, real roles, genuinely relevant expertise, real portraits · bylines · the responder portrait. **Renders nothing — no placeholder, no silhouette, no stock substitute, no "our team" without names.** |
| **WHAT UNLOCKS IT** | Who works at MappedSkills now, in what role, with what genuinely relevant expertise; who authors each asset; whether a genuine second reviewer exists. |

**Recorded cost, because it is larger than it looks.** Without visible named people the site has **no staffing signal**. A publication has authors; a firm has people who answer the phone. Of everything blocking the homepage, this is the input that most affects whether the page reads as a firm.

**A staff name surfaced by Google AI Mode is NOT VERIFIED and must not be used.** **If no second reviewer genuinely exists, assets publish without a "reviewed by" byline** rather than with a manufactured one.

**The responder portrait is approved in principle only** for `/contact` and `/schedule-call`, and its implementation is blocked on this same input.

---

## 4. Enquiry-response ownership and business hours

**Blocks:** `/` Block 8 · `/contact` §2 · `/thank-you` §2 · `/how-it-works` §9 · `/schedule-call` §1.

| | |
|---|---|
| **DEFAULT STRUCTURE** | Each page keeps the section and its heading. `/thank-you` states plainly that the enquiry arrived and that a person will read it. `/contact` and `/` keep their action blocks intact. |
| **BLOCKED CONTENT SLOT** | Who reads and responds, what they do with it, what the first reply contains, and the business hours — **if any are to be published**. **Renders nothing.** |
| **WHAT UNLOCKS IT** | Who owns enquiry response, and the business hours to publish. |

**All five surfaces must say the same thing once unblocked.** They are the same fact, and a divergence between them is a defect.

**Absolutely prohibited as a default, on all five:** any response-time statement in any form — **not in hours, not in days, not as "shortly", "soon" or "as quickly as we can".** No response-time distribution has been measured, and `/thank-you` is the page where an unmeasured promise would be most tempting and least defensible.

---

## 5. The published phone number

**Blocks:** every DIRECT CTA sitewide — `/` Block 8 · `/contact` §3 · `/schedule-call` §5 · `/thank-you` §3 · the header utility · the footer · the conditional vertical page, where it is elevated.

| | |
|---|---|
| **DEFAULT STRUCTURE** | Every contact block retains the form and booking surfaces at full weight, and retains the direct-contact region's position. |
| **BLOCKED CONTENT SLOT** | The number itself, and **the WhatsApp action, which shares the same number and is blocked with it**. **Neither renders a placeholder** (U14 — a control with no destination does not render). |
| **WHAT UNLOCKS IT** | The phone number to publish. |

**Structural consequence to record** *(revised 2026-09-02, H4 — direct contact is available, not omnipresent)*: while the number is blocked, **the India-first buyer's most natural contact route is missing from `/contact`, `/schedule-call` and every action region on the site.** That is where it is required, and its absence there is **a launch-affecting gap, not a cosmetic one.**

---

## 6. Pricing — prices, inclusions, minimum, spend versus fee

**Blocks:** `/pricing` (BLOCKING) · `/faq` three answers · `/google-ads` move 5.

| | |
|---|---|
| **DEFAULT STRUCTURE** | `/pricing` retains every non-numeric section: what is actually being bought, the horizon, **what moves the number** *(the page's most useful section and fully drafted)*, what the engagement needs from the client, who this is not for, the hardest objection, and the action block with booking emphasised. |
| **BLOCKED CONTENT SLOT** | §3, the price itself. Inclusions and exclusions. Minimum engagement. Whether ad spend is separate. **Renders nothing — no band, no "from", no range, no "contact for pricing" substitute presented as a price.** |
| **WHAT UNLOCKS IT** | Confirmation that the displayed bands are current, what each includes and excludes, what changes the price, whether spend is separate, and the minimum engagement length. |

**No price may be invented, changed, rounded or inferred by any session.** The production page currently displays bands; **their currency is unconfirmed**, and an unconfirmed production figure is not an owner answer.

**The `/google-ads` fee/spend separation is a scope boundary, not a price** — but it is blocked by the same input and must not be written from an assumption.

---

## 7. The entry-offer model — free, paid or hybrid

**Blocks:** PRIMARY and DIAGNOSTIC **wording** on every page · `/schedule-call` §2 · the problem page's Move 8 · whether a diagnostic tool is ever built.

| | |
|---|---|
| **DEFAULT STRUCTURE** | **Unaffected. Every page structure, every journey and every CTA role survives any answer** — this is the one blocker the architecture was deliberately built to absorb. The funnel is model-agnostic, and no page, URL or navigation item encodes the entry model. |
| **BLOCKED CONTENT SLOT** | The CTA labels themselves, wherever a diagnostic or entry offer is implied. **No candidate may say "free" until the decision is recorded.** |
| **WHAT UNLOCKS IT** | The owner's decision: free, paid, or hybrid. |

**Prohibited as a default:** "free audit" · "free strategy session" · "complimentary" · any framing implying a deliverable that has not been scoped.

**Recorded:** every competitor examined offers a free audit, and **the current free-consultation model has not been generating enquiries.** The evidence pulls both ways and is recorded rather than resolved.

---

## 8. The `DEC-007` production-claims decision

**Blocks:** the homepage title and metadata · `/google-ads` title · the sitewide default title · and, at component level, six existing components.

| | |
|---|---|
| **DEFAULT STRUCTURE** | **No page body in the new copy carries any prohibited claim.** The UX system has no place for one — no stats block, no logo wall, no metric tile, no counter. |
| **BLOCKED CONTENT SLOT** | Page titles and metadata for the affected routes. **The homepage cannot ship over a live contradiction between its body and its title.** |
| **WHAT UNLOCKS IT** | A decision to remove or substantiate "300%+ ROI", "₹100Cr+" and "₹10Cr+". |

**Exposure is wider than the page level.** The prohibited claims are **hard-coded inside `HeroDashboard` and `SocialProofStrip`**, which are imported by six routes — the mechanism beneath the seven documented page surfaces. **Remediation is an owner decision, and no code was touched in this session.**

---

## 9. Publishable client evidence

**Blocks:** `/work` indexation and its entry into navigation · every proof claim on every commercial page · `/pricing` credibility · `TestimonialCard`'s only legitimate use.

| | |
|---|---|
| **DEFAULT STRUCTURE** | Every commercial page ships on **method and own-diagnostic proof only**. `/work` exists, `noindex`, out of the sitemap and out of navigation. The homepage states the position plainly: *"We have no case studies to show you."* |
| **BLOCKED CONTENT SLOT** | `/work/{slug}` case studies · any client result, named or anonymised · any testimonial · any logo, rating or review count. **Renders nothing. `/work` carries no "coming soon" placeholder — no content is the correct content there.** |
| **WHAT UNLOCKS IT** | Which client results may be published, with written permission from the right person at each. |

**This is the last remaining Session 02 owner blocker and it gates all premium positioning.** `/work` enters navigation the day the first permissioned case study publishes — **no redesign required**, which is the reason the navigation excludes it now rather than holding a slot.

---

## 10. The manufacturing validation gate

**Blocks:** C1 `/industries/manufacturing` and C2 `/blog/{industrial-b2b-article}` — **and nothing else.**

| | |
|---|---|
| **DEFAULT STRUCTURE** | The launch architecture is complete at 22 unconditional pages without them. The dropdown **renders correctly with five children**. No unconditional page links to C1 — **the homepage explicitly does not**. |
| **BLOCKED CONTENT SLOT** | Both pages. **Copy is deliberately NOT DRAFTED**, and this session designed no UX for their content beyond the page-type rules they would inherit. |
| **WHAT UNLOCKS IT** | (1) absolute volume verification with a real keyword tool, (2) a healthcare SERP comparison on the same basis, (3) one completed industrial engagement with a publishable result. |

**Reversibility is a UX requirement:** every internal link to C1 is **removable in a single change**, and the conditional dropdown item is **a config flag, not a layout change**.

**If the gate does not clear**, the editorial stream launches with 3 articles rather than 4. **Whether that is accepted, or a PHASE 2 article is promoted to hold the floor at 4, is an orchestrator decision and is not made here.**

---

## 11. Technical prerequisites — not owner blockers, but launch blockers

**These are not owner decisions. They are work that has not been done, and no UX decision substitutes for any of them.**

| Prerequisite | What is inert | Current state |
|---|---|---|
| **A server endpoint** | Every submission behaviour on `/contact` | **No `app/api/`, no route handler, no Server Actions anywhere in the repository** |
| **Durable persistence** | The success state · the conversion event · the persist-first rule | Does not exist |
| **Transactional email** | Acknowledgement · internal notification | Does not exist |
| **Server-side idempotency and spam screening** | Double-submission protection · the identical-success rule | Does not exist |
| **A working booking surface** meeting capabilities 1–10 | `/schedule-call` · channel measurement on every booking | **Renders empty; the code calls the badge widget API against an inline container** |
| **`/thank-you` wired as the post-conversion destination** | The whole post-conversion journey | **Orphaned — nothing links or redirects to it** |
| **Analytics and a consent mechanism** | All measurement, every journey | **No analytics of any kind runs in production** |
| **Own-site fixes shipped** | The own-site research entry · the worked-example link on `/` and the problem page · F7 | Not started |
| **Visible breadcrumb UI** | 8 route families emitting `BreadcrumbList` with no visible breadcrumb | Not built |
| **Pagination on `/blog`** | The editorial index past the 100-item ceiling | Not built |
| **Contentful slug inventory** | The `/work/{slug}` consolidation | Unknown |
| **Recovery links generated from live routes** | The 404 page | **Hard-codes three slugs that all return 404** |

---

## 12. Blocker impact summary

| Blocker | Routes affected | Blocks structure, or only content? |
|---|---|---|
| The real delivery process | 3 + F17 | **Structure** — one whole section, and a figure that must not be drawn |
| Company facts / NAP | 4 + schema | Content, in a reserved position |
| Team, people, authorship | 8+ | Content — **but its absence costs the site its staffing signal** |
| Response ownership and hours | 5 | Content, in a reserved position |
| Published phone number | **Sitewide** | Content — **but it removes an entire contact route** |
| Pricing figures | 3 | Content — one section of one page |
| Entry-offer model | Sitewide | **Wording only. No structure depends on it** |
| `DEC-007` decision | 3 titles + 6 components | Metadata and existing code, not new page structure |
| Publishable client evidence | `/work` + all proof claims | **Structure** — it decides whether a route is indexable and in navigation |
| The manufacturing gate | 2 | **Structure** — two pages ship or defer together |

**Two routes carry no blocker at all and should be built first:** `/problems/traffic-but-no-enquiries`, and `/research/{ai-visibility-baseline}` once named authorship exists.

---

## 13. The rule this document exists to enforce

> **SHARPENED 2026-09-02.** "Reserve the position and render nothing" was ambiguous about whether a heading or container renders. **It does not.** The corrected rule is a three-way test — **case 0** *(the blocker is BLOCKING, so the route does not launch)* · **case A** *(omit the slot entirely — the default and strongly preferred)* · **case B** *(structure renders, the blocked element does not, only where the surrounding structure is load-bearing for a launching route)* — **and there is no case C.** Every blocked slot is classified in **`26_OWNER_BLOCKED_STRUCTURE_RULE.md`**.

> **Where a fact is missing, the UX reserves the position and renders nothing.**
>
> It does not substitute a default, does not soften the requirement into something the firm can answer, and does not restructure the page so the missing fact is no longer needed.

**A UX session is well placed to commit the third of those without noticing.** Every blocked slot above is therefore recorded with the structure that surrounds it, so that supplying the input is a **content change and not a redesign** — and so that a later reviewer can check whether a blocker was resolved or merely disposed of.
