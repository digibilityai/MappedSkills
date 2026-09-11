# `/contact`, `/schedule-call` and `/thank-you` — Relationship and Routing — PROPOSED

**Session:** 13 — Orchestrator correction / gate-scope reconciliation pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Extends `09_FORM_AND_BOOKING_UX.md`; does not replace it.

> **Nothing invented here:** no meeting duration, no meeting owner, no response time, no business hours. Each remains **OWNER-BLOCKED** and is named as such.

---

## 1. The risk

Two conversion surfaces, one conversion outcome, and both currently broken in production. **The failure mode is that they become duplicate pages** — two forms, two explanations, two versions of the same ask — which doubles the maintenance surface, splits the entity data, and gives a decided visitor a choice they did not want to make.

**The rule that prevents it:**

> **They are not two ways to say the same thing. They are two different commitments, and a visitor arrives already knowing which one they want.**
>
> `/contact` is for a visitor who wants to **describe something**. `/schedule-call` is for a visitor who wants to **talk to someone**.

Each page's job is to serve that preference without arguing for the other.

---

## 2. `/contact`

| | |
|---|---|
| **Primary job** | Complete the qualified enquiry through the form surface, and carry the entity data local and AI-answer discovery depend on |
| **Best for** | A visitor with a **situation to describe** — they have detail, context, or a specific question, and writing it is faster than explaining it. Also anyone who does not want to commit to a time |
| **Form role** | **The page.** Four required fields, one step, context pre-filled from the page they came from, never asked |
| **Direct-contact role** | **Prominent, at equal weight to the form, in its own section** (H4). Phone and WhatsApp are genuine routes here, not fallbacks |
| **Secondary booking route** | **One cross-link, once, stated neutrally** — booking reaches the same place and is usually faster if the visitor has questions rather than a description |
| **Apparatus / proof** | **Zero. Page-wide** (B17) |
| **Outbound links** | `/schedule-call` and `/privacy-policy`. **Nothing else** — do not offer routes away from a decided visitor |
| **Entity data** | Complete NAP, **byte-identical to `/about`, the footer and the structured data** |

**Owner-blocked on this page:** legal entity name · complete registered postal address including a real postal code · published phone and email · who responds to enquiries and the business hours.
**Technically blocked:** a server endpoint, durable persistence, transactional email. **The route is launch-blocked independently of its copy.**

---

## 3. `/schedule-call`

| | |
|---|---|
| **Primary job** | Complete the qualified enquiry through the booking surface. **A qualified booking is a qualified enquiry, not a lesser conversion** |
| **Best for** | A visitor who would **rather talk than write** — commonly the industrial segment, and price-stage buyers arriving from `/pricing`, where booking is the emphasised surface |
| **Booking role** | **The page's conversion.** Embedded on this route only, progressively enhanced |
| **Fallback form/contact route** | **One cross-link to `/contact`, stated as an equal** — the form reaches the same place and neither route is a lesser one. **Phone and WhatsApp prominent, at equal weight to booking** |
| **Apparatus / proof** | **Zero. Page-wide** (B17) |
| **What the page must carry as its own content** | What the call is · what you get from it either way · what it is not · what to have to hand · the other route. **All server-rendered, none of it inside the embed** |

### Vendor-failure behaviour — the decision rule

**The page must be useful before the embed loads, and if it never loads.** Three failure states, each explicit:

| State | Behaviour |
|---|---|
| **Loading** | An honest pending state. **Never an empty container** — that is the current production defect |
| **Failed to load, or blocked** | An explicit statement that the booking tool did not load, plus the form route and direct contact. **Never a silent empty region** |
| **No availability** | Stated plainly, with the form and direct contact offered. **No "check back later" without a route** |

**And the embed-versus-link rule, restated so a later phase can apply it without reopening this:**

> **If the selected vendor cannot meet the accessibility bar, cannot be escaped by keyboard, or is unusable at the smallest supported width — do not embed it. Link to it, and let the page's own content carry the whole explanation.**

**Owner-blocked on this page:** who takes the calls, by name and role · the actual call length · real availability and business hours · the entry-offer model.
**Technically blocked:** a working booking surface that accepts runtime custom fields and exposes the completed booking server-side.

---

## 4. What keeps them from duplicating

**Five structural separations, all checkable at the wireframe pass:**

1. **Different first screens.** One opens on an ask and a form; the other opens on what the call is and a route into booking.
2. **Only one form exists on the site.** `/schedule-call` carries **no form fields of its own** outside the booking surface.
3. **Neither argues for the other.** One cross-link each, once, stated neutrally. **No comparison, no "which is right for you?", no chooser.**
4. **Different content bodies.** `/contact` carries the entity data; `/schedule-call` carries what the call is and what to bring. **Neither restates the other's content.**
5. **Both carry zero proof.** Neither can differentiate itself by adding evidence, so neither will drift into becoming a landing page.

**The failure test:** if a reader could not tell, from the first screen alone, which page they are on — the separation has collapsed.

---

## 5. `/thank-you` routing by conversion type

**The "one link only" rule holds. The destination differs by conversion type, and one type takes no link at all.**

### A — Form submission

| | |
|---|---|
| **Link** | **One, derived from the page the enquiry came from** — the context is already captured for the enquiry record, so this costs nothing and is more useful than a fixed destination |
| **Mapping** | Enquired from a commercial page → **the method** · from the problem page → **the diagnostic research entry** · from a research entry → **the research index** · from `/pricing` → **the method** |
| **Fallback where context is unknown** | *(direct entry, a restored session, a bookmark)* → **the method** |
| **While the method is BLOCKED and the diagnostic entry is unpublished** | **No link renders.** The section is omitted entirely — restraint, not a substitute (`26_OWNER_BLOCKED_STRUCTURE_RULE.md` case A) |

### B — Meeting booking

| | |
|---|---|
| **Link** | **None.** |
| **What the page carries instead** | The confirmation · **the booked time, repeated in the visitor's own timezone** · the urgent direct-contact route |

**Why the booking variant takes no link — the asymmetry is deliberate.** A visitor who has just booked has a scheduled conversation and **an informational need of zero**. Everything useful to them — what the call is, what it is not, what to have to hand — is on `/schedule-call`, which they have just read. A link here is either a repeat of what they read a minute ago, or a distraction from a commitment they have already made. **The most useful thing this page can do for them is confirm the time and get out of the way.**

### Why not one universal destination

**Because the two conversion types have different informational needs, and one of them has none.** A universal destination would either send a booked visitor somewhere they do not need, or flatten the form variant's context-derived link into something less useful. **The asymmetry costs nothing to implement — the conversion type is already known server-side — and it is more honest than a single rule applied to two different situations.**

### Prohibited on `/thank-you`, restated

Content recommendations · a newsletter · case-study promotion · social follow prompts · an upsell · a referral request · a review request · a second ask of any kind · **a response-time statement in any form, including "shortly", "soon" or "as quickly as we can"** · celebration language or exclamation marks · a progress bar or "step 3 of 3" · anything implying the enquiry has been assessed.

**And the measurement rule the UX must not break:** a `/thank-you` pageview never creates a conversion. Both conversion events fire server-side.

---

## 6. Consequence for the wireframe pass

| Wireframe | Purpose |
|---|---|
| **`/contact` — master conversion surface** | Form, direct-contact section, entity block, single cross-link |
| **`/schedule-call` — variant** | Booking region, the page's own content outside it, direct contact, single cross-link |
| **`/schedule-call` — failure state** | Embed failed to load, with the form route and direct contact present |
| **`/thank-you` — form variant** | Confirmation, one contextual link *(and the omitted-link state while blocked)* |
| **`/thank-you` — booking variant** | Confirmation, time in the visitor's timezone, urgent route, **no link** |

**Acceptance test:** place the `/contact` and `/schedule-call` wireframes side by side. **If either could be mistaken for the other at first screen, the separation has failed.**
