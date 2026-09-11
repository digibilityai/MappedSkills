# Route
`/thank-you`

**Session:** 11 (second-reader / orchestrator correction pass) · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED COPY — NOT APPROVED. PARTIALLY BLOCKED.**
**Created on orchestrator instruction.** No page brief exists for this route; its content requirement comes from `LAUNCH_CONTENT_INVENTORY.md` §3, and its behaviour from `POST_SUBMISSION_AND_FOLLOWUP.md` and `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §8.4.

> **`[TECHNICAL PREREQUISITE — this page is reached only after the server confirms the enquiry has been durably stored.]`** It must never be reached on a client-side timer, and no conversion event may fire from a view of this page alone. The route currently exists in production and **nothing links or redirects to it.**
>
> **Indexation: `noindex`, excluded from the sitemap.** Unchanged. **Route counts are unchanged by this file.**

---

# Page Role
Post-enquiry confirmation. Confirm the enquiry arrived, say what happens next only as far as it is genuinely known, and offer one useful thing to do next.

# Primary Intent
Reassurance. **The conversion has already happened.**

# Search Intent / Search Status
**None. Non-indexable.** It has no query target and is not written to acquire anything.

# Primary Audience
Someone who has just sent an enquiry or booked a call, and wants to know it worked.

# Primary Message
It arrived, and a person will read it.

# H1
Your enquiry has arrived.

# Hero Supporting Copy
It is with us, and a person will read it before anyone replies. `[OWNER INPUT REQUIRED — who reads and responds to enquiries]`

# Primary CTA
**None.** The conversion has happened and there is no second ask on this page.

# Secondary CTA
**One LOW-COMMITMENT link only**, chosen from the page the visitor enquired from.

---

## Section 1 — Confirmation

### Heading
Your enquiry has arrived

### Copy
We have it. Nothing else is needed from you.

### Supporting Elements
- Where the enquiry carried a reference, show it plainly so the person can quote it.
- **Booking variant:** where the visitor booked a call rather than sent a form, the confirmation says the booking is made and repeats the time in their own timezone. `[TECHNICAL PREREQUISITE — the booking tool must return a confirmed slot server-side.]`
- **Prohibited:** celebration language · exclamation marks · a progress bar or "step 3 of 3" · anything implying the enquiry has been assessed.

---

## Section 2 — What happens next

### Heading
What happens next

### Copy
`[OWNER INPUT REQUIRED — who responds, and the real sequence: who reads it first, what they do with it, and what the first reply contains.]`

`[OWNER INPUT REQUIRED — the business hours to publish, if any are to be published.]`

**What this section will say, once unblocked:** what happens and who it reaches. **It will not say when.**

**No response-time statement of any kind appears here** — not in hours, not in days, not as "shortly", "soon" or "as quickly as we can". No response-time distribution has been measured, and this is the page where an unmeasured promise would be most tempting and least defensible.

**Also absent, deliberately:** any promise of a meeting, any statement about whether the enquiry qualifies, any offer of an audit or diagnostic, and any description of a document or report that will be sent. None of those is decided, and inventing one here would set an expectation the first reply then has to break.

---

## Section 3 — If you need us sooner

### Heading
If it is urgent

### Copy
If you would rather talk now: `[OWNER INPUT REQUIRED — published phone number]`, or WhatsApp on the same number.

### Supporting Elements
- **DIRECT contact only.** No form, no booking prompt, no second enquiry route.
- **Prohibited:** business hours until the owner confirms them.

---

## Section 4 — One useful thing to read

### Heading
While you wait

### Copy
One link, chosen from where the enquiry came from — the method for someone who enquired from a commercial page, the diagnostic for someone who came through the problem page, the research for someone who was reading the measurement.

### Supporting Elements
- **Exactly one link. No grid, no "related pages", no newsletter sign-up, no download.**
- **Prohibited:** a second ask of any kind · an upsell · a referral request · a review request · social follow prompts.

---

# Evidence / Claim Notes

**No claim is made on this page, deliberately.** The only factual statements are that the enquiry arrived and who will read it — the first is guaranteed by the technical prerequisite above, and the second is owner-blocked.

**The claim that must never appear here** is a response time, because it is the one number a visitor at this moment most wants and the one this business has never measured.

# Owner-Input Placeholders
1. `[OWNER INPUT REQUIRED — who reads and responds to enquiries]` — hero and section 2.
2. `[OWNER INPUT REQUIRED — the real post-enquiry sequence]` — section 2. **This is the same input that blocks `/how-it-works` §9 and `/contact` §2, and all three must say the same thing.**
3. `[OWNER INPUT REQUIRED — business hours, if any are published]`
4. `[OWNER INPUT REQUIRED — published phone number]`
5. `[TECHNICAL PREREQUISITE — durable server-side persistence before this page is reached; `/thank-you` wired up as the post-submission destination; the conversion event fired from the server, never from a view of this page.]`
6. `[EVIDENCE REQUIRED — a measured response-time distribution]`, before any timing statement is ever added.

# Internal-Link Intent
**Out:** one contextual link, set from the page the enquiry came from. Ordinary site navigation remains.
**In:** the form submission and the booking confirmation. **Nothing else links here**, and it stays out of the sitemap.

# Copy Status
**PARTIALLY BLOCKED.** The confirmation is written and judgeable; the "what happens next" section cannot be completed without owner input 1 and 2, and must not be filled with a plausible default.
