# Route
`/contact`

**Session:** 11 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED COPY — NOT APPROVED. PARTIALLY BLOCKED, and launch-blocked on a technical prerequisite.**
**Governed by:** `briefs/contact.md` · `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §8.1 · `FORM_AND_BOOKING_SPEC.md` §1 · `MESSAGE_CONSISTENCY_MATRIX.md` row 14.

> **`[TECHNICAL PREREQUISITE — a server endpoint, durable persistence and transactional email.]` VERIFIED: the production form has no `action` and no `method`, transmits nothing, and displays a success screen. Every enquiry it has received was lost while the visitor was told it had worked. No copy fixes this, and success copy must not be written as though the path worked.**

---

# Page Role
Conversion — the form surface. Complete the qualified enquiry, and carry the entity data that local and AI-answer discovery depend on.

# Primary Intent
T / N. **The visitor has decided. The only job left is not to lose them.**

# Search Intent / Search Status
Brand navigational only.

# Primary Audience
Anyone ready to enquire.

# Primary Message
Tell us what you're trying to fix — and here is the evidence this is a real business at a real address.

# H1
Tell us what you're trying to fix.

# Hero Supporting Copy
Four questions, and the more useful the fourth answer is, the more useful our first reply will be. If you would rather talk than type, the booking page and the phone number are below.

# Primary CTA
**Role: PRIMARY only — the form surface.** No competing goal on this page.

# Secondary CTA
Cross-link to `/schedule-call`. **DIRECT** — phone and WhatsApp — always visible.

---

## Section 1 — The form

### Heading
Send us your situation

### Copy
The most useful thing you can put in the last box is what is actually happening — what you are getting, what you are not, and what you can currently see. Not a brief. We will read it before anyone replies.

### Supporting Elements
**Field labels — plain nouns, required marked in words, never by an asterisk alone.**

| Field | Label | Helper text |
|---|---|---|
| Name | **Your name** *(required)* | — |
| Email | **Work email** *(required)* | Where the reply goes |
| Company | **Company** *(required)* | So we know what business we are looking at — a name is enough |
| Message | **What you're trying to fix** *(required)* | What is happening now, and what you would like to be different |
| Phone | **Phone or WhatsApp** *(optional)* | Only if you would rather we called |
| Website | **Website** *(optional)* | It is what we would look at first |
| Consent | **Send me new research when we publish it** *(optional, unticked)* | Separate from this enquiry. `[LEGAL REVIEW REQUIRED — consent wording]` |

- **Service or problem is pre-filled from the page the visitor came from and is never asked.**
- **Budget is not asked.** It cannot be verified, it is the highest-friction field on the page, and the price bands are published so the reader can place themselves before enquiring.
- Privacy line, adjacent to the submit control: *"We use this to reply to you and to keep a record of the enquiry. Nothing else. [Privacy policy]"* — distinct from the marketing consent control.
- **Submit label:** *Send this*.

---

## Section 2 — What happens next

### Heading
What happens after you send it

### Copy
`[OWNER INPUT REQUIRED — who reads and responds to enquiries, and the business hours to publish.]`

**What this section will say, once unblocked:** who it reaches, what they do with it, and what the first reply will contain. **It will not say when.** No response-time number is published until one has been measured — publishing an unmeasured promise would demonstrate exactly the failure this business sells the fix for.

### Supporting Elements
- **Prohibited:** "we reply within 24 hours" or any variant · any availability claim.

---

## Section 3 — Direct contact

### Heading
Or call us

### Copy
Phone and WhatsApp are real routes here, not a fallback. If it is easier to explain out loud, use them.

### Supporting Elements
- `Call [OWNER INPUT REQUIRED — published phone number]`
- `WhatsApp us` — same number, one tap on mobile.
- `[OWNER INPUT REQUIRED — business hours]`
- **Recorded, not shown to the visitor:** a phone or email click is a conversion-intent event, never a qualified enquiry.

---

## Section 4 — Where we are. BLOCKED

### Heading
Where we are

### Copy
`[OWNER INPUT REQUIRED — legal entity name.]`
`[OWNER INPUT REQUIRED — complete registered postal address, including a real postal code. The current declaration's postal code field contains the word "India".]`
`[OWNER INPUT REQUIRED — the phone number and email address to publish.]`

**Binding:** identical to `/about`, the footer and the structured data. This is the fact set that local discovery and branded AI answers are assembled from.

### Supporting Elements
- A real map or a real photograph of a real location **only if one exists.** No stock office imagery.
- **No rating, review count or client count.** None exists, and `aggregateRating` must not be added without genuine permissioned first-party review data.

---

## Section 5 — Cross-link to the other surface

### Heading
If you would rather talk

### Copy
Booking a time reaches the same place as this form and is usually faster if you have questions rather than a description.

### Supporting Elements
- Link → `/schedule-call`. **Minimal outbound linking otherwise — do not offer routes away from a decided visitor.**

---

## Section 6 — Form states

### Heading — success state
### Copy
**Your enquiry has arrived.** It is with `[OWNER INPUT REQUIRED — who responds]`, who will read it before replying.

`[TECHNICAL PREREQUISITE — this message is shown only after the server confirms the enquiry has been durably stored. It must never be shown on a client-side timer.]`

One thing worth reading while you wait: `[the most relevant next page, set from the page they enquired from]`.

**Prohibited here:** a second ask · a response-time number · an upsell · celebration language.

### Heading — failure state
### Copy
**That did not send.** Nothing you typed has been lost — it is still in the form below.

Try again, or send the same thing to `[OWNER INPUT REQUIRED — published email address]`, or call `[OWNER INPUT REQUIRED — published phone number]`.

This was a fault at our end, not yours.

**Prohibited here:** a false success · a silent failure · an error code as the whole message · blame directed at the visitor · humour.

---

# Evidence / Claim Notes

Nothing on this page makes a claim requiring evidence, deliberately. **Proof here is a distraction** — no case studies, no logos, no testimonials, no evidence modules, no ratings.

The single factual assertion is the entity data, and all of it is owner-blocked.

# Owner-Input Placeholders
1. `[OWNER INPUT REQUIRED — legal entity name]` — **BLOCKING.**
2. `[OWNER INPUT REQUIRED — complete registered postal address with a real postal code]` — **BLOCKING.**
3. `[OWNER INPUT REQUIRED — phone number and email to publish]` — **BLOCKING.**
4. `[OWNER INPUT REQUIRED — who responds to enquiries, and business hours]`
5. `[LEGAL REVIEW REQUIRED — consent wording]`
6. `[TECHNICAL PREREQUISITE — server endpoint, durable persistence, transactional email]` — **LAUNCH-BLOCKING for the route, not for this copy.**
7. `[EVIDENCE REQUIRED — a measured response-time distribution]` — before any timing statement is ever published.

# Internal-Link Intent
**Out:** `/schedule-call` · `/privacy-policy`. **Nothing else.**
**In:** every page — header CTA, footer, utility navigation.

# Copy Status
**PARTIALLY BLOCKED**, and the route is **launch-blocked on the technical prerequisite** independently of the copy.
