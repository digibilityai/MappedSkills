# Form, Booking and Thank-You UX — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `FORM_AND_BOOKING_SPEC.md` and `POST_SUBMISSION_AND_FOLLOWUP.md` (approved, `DEC-011`) · `QUALIFIED_ENQUIRY_DEFINITION.md` · the approved copy for `/contact`, `/schedule-call` and `/thank-you`.

> **Nothing in this document is buildable today.** There is no `app/api/` directory, no route handler, no server endpoint, no durable storage and no transactional email anywhere in the repository. **Every behaviour below is marked where it depends on infrastructure that does not exist.** No backend capability is invented here.

---

## 1. The field set, unchanged

**Required: 4 · Optional: 3 · Contextual and never asked: 1 · Automatic: 9+**

| Group | Field | Status |
|---|---|---|
| **Who you are** | Your name | Required |
| | Work email | Required |
| | Company | Required |
| **What you need** | What you're trying to fix | Required |
| **How to reach you** *(optional)* | Phone / WhatsApp | Optional on the form; **required on the booking surface** |
| | Website | Optional |
| **Permission** *(separate)* | Marketing consent | Optional, **unticked, never bundled with submission** |
| **Never asked** | Service / problem interest | **Derived from the page the visitor came from** |

**Budget is not asked.** It is currently required in production, is unverifiable, cannot qualify anything, and is the highest-friction field on the page. **It must never be re-added as required.**

**No field may be added without displacing one.**

---

## 2. Field grouping and order

**One step. Four required fields do not justify multi-step, and every additional step is an abandonment surface.**

**Order, and the reasoning for it:**

1. **Your name** — lowest cost, establishes the exchange is between people.
2. **Work email** — the reply channel and the identity key. Second because it is expected second.
3. **Company** — one word satisfies it. Kept adjacent to email because both establish business context.
4. **What you're trying to fix** — **last among the required fields, and the largest control on the form.** It is the enquiry itself and the single most useful input for the human who reads it. Putting the largest ask last means the reader has already invested three trivial answers before reaching it.
5. **Optional group**, visually and semantically separated, **clearly marked optional in words**.
6. **Consent**, separate from everything, unticked.
7. **Privacy statement**, adjacent to the submit control, distinct from the consent control.
8. **Submit.**

**Two grouping rules:**
- **Optional fields are grouped together and after the required set.** Interleaving them makes the form look longer than it is.
- **The consent control is never adjacent to the submit control in a way that implies submission grants consent.**

**Prohibited in grouping:** a "step 1 of 2" indicator · progressive disclosure of required fields · a multi-select service list, which reproduces the rejected service-menu framing at the point of conversion.

---

## 3. Labels, help and required marking

| Requirement | Detail |
|---|---|
| **Every input has a programmatically associated visible label** | **Placeholder text is never the only label** |
| **Required is conveyed in words** | Not by an asterisk alone, not by colour alone, and also via `aria-required` |
| **Helper text appears before entry**, not only after an error | Format hints and expectations are instructions, not error recovery |
| **Autocomplete tokens on every field** | `name`, `email`, `tel`, `organization`, `url` |
| **Input types and `inputmode`** | `email`, `tel` with a numeric keypad. **Not cosmetic** — it is the difference between one tap and five on a phone |
| **The service/problem pre-selection** | Visible and editable where a page maps to more than one; silently recorded where it maps to one. **Never a hidden field the reader cannot see or change when it is shown to them** |

---

## 4. Validation behaviour

| Aspect | Requirement |
|---|---|
| **Timing** | Format checks **on blur**; completeness **on submit**. **Never validate a field the visitor has not yet touched** |
| **Error content** | Field-level, adjacent to the field, describing **how to fix it** — not merely that it is wrong |
| **Error announcement** | Associated via `aria-describedby` and announced through a live region |
| **On failed submit** | A summary at the top listing the failures, each linking to its field; focus moves to the first error |
| **Error visibility on mobile** | Visible without scrolling away from the field |
| **Recovery** | An error clears as soon as the field becomes valid, not only on resubmit |
| **Client validation is a convenience** | **Never trusted.** Server-side validation of every field is required *(depends on a server that does not exist)* |

**Prohibited:** validating on every keystroke · a red border as the only error signal · an error summary that does not link to its fields · blocking submission without saying which field is at fault · any error text that blames the visitor.

---

## 5. Submission states

**The persist-first order is a strategy rule, and the UX exists to express it honestly.**

```
1  Receive submission
2  Validate → screen for abuse → PERSIST to durable storage   ← the only step that may block success
3  Return success to the visitor
4  Then, asynchronously: notification · acknowledgement email · CRM · server-side conversion event
```

| State | UX behaviour | Depends on |
|---|---|---|
| **Idle** | Submit control enabled, no busy state | — |
| **Busy** | Enters a busy state **immediately** and is disabled for the duration. The state is announced, not only shown | — |
| **Success** | Shown **only after the server confirms durable persistence.** Never on a client-side timer, never optimistically. Focus moves to the confirmation, which is announced via a status region | **Server endpoint + durable storage — DOES NOT EXIST** |
| **Validation failure** | Values preserved; summary and field errors; focus to first error | — |
| **Server error** | **Explicit failure. Every typed value preserved.** Retry available, plus a fallback route — email and phone. *"This was a fault at our end, not yours."* | — |
| **Network failure** | Same as server error. **Never a silent failure and never a false success** | — |
| **Double submission** | Disabled control **plus** a client-generated idempotency key enforced server-side. **A disabled button alone does not survive a double-tap or a retry** | **Server-side enforcement — DOES NOT EXIST** |
| **Suspected spam** | **The same success state as a legitimate submission.** Telling a bot it failed teaches it to adapt. **Detection logic is never revealed to the submitter** | Server-side screening — does not exist |

> **The single most important rule on this page:** **losing a typed message is the most severe recoverable defect this form can have, and a false success is the one outcome that is never acceptable.** The production form currently does the second of those, and the firm's own published diagnostic uses it as the worked example.

---

## 6. Behaviours the visitor must never see

These are qualification and screening outcomes. **They are invisible by design, and the UX must not leak them.**

| Backend outcome | What the visitor sees |
|---|---|
| **Qualified** | Success |
| **Unqualified** (a hard disqualifier applies) | **Success. Identical.** No visitor is told they were judged unqualified |
| **Review Required** (disposable domain, uncertain signal) | **Success. Identical.** No warning, no second question, no "please use a work email" |
| **Confident spam** | **Success. Identical** |
| **Email verification unavailable** (DNS, network or API failure) | **Success. Identical** — verification is advisory, asynchronous and **fails open** |

**Consequence for the UI:** there is **no visitor-facing disposable-email message, no domain warning, no "corporate email required" hint, and no new field of any kind** to support screening. Every one of those would either insult a legitimate enquirer or teach an abuser what to change.

**The one thing the visitor may see** is an ordinary format error — *this does not look like an email address* — which is validation, not screening.

---

## 7. Mobile form behaviour

| Requirement | Detail |
|---|---|
| **The four-field set is itself the mobile strategy** | Nothing further is removed for small screens |
| **Keyboards** | Correct type per field. A numeric keypad for phone |
| **Touch targets** | Comfortably above minimum for every control, **including the consent checkbox** |
| **Sticky elements** | Must not obscure any field or the submit control, and **must not cover content while the keyboard is open** |
| **Errors** | Visible without scrolling away from the field |
| **Zoom** | The form must not trigger unwanted zoom on focus, and must remain usable at increased text size |
| **Performance** | **The form must not depend on a heavy third-party script to function** |

---

## 8. Booking UX

**No vendor is selected. The current implementation is broken** — the container renders empty because the code calls the badge widget API against an inline widget container, and non-JavaScript clients see a "not configured yet" fallback.

### 8.1 The relationship between form and booking

> **EXTENDED 2026-09-02.** The full separation between `/contact` and `/schedule-call` — primary jobs, who each is best for, the five structural separations that stop them duplicating, vendor-failure behaviour, and the `/thank-you` routing asymmetry by conversion type — is in **`25_CONTACT_BOOKING_THANKYOU_RELATIONSHIP.md`**.

**Two doors to one outcome.** A qualified meeting booking **is** a qualified enquiry, not a lesser conversion. Neither surface is presented as the fallback for the other, and each cross-links to the other once.

### 8.2 Can booking independently satisfy the primary conversion?

**Yes** — provided it meets the five WQE conditions. **Attribution completeness does not determine qualification.** A booking whose attribution does not survive is still a qualified enquiry, recorded with `attribution_status = unavailable`.

**What is lost without runtime custom fields and a server-side webhook is channel measurement, not the conversion.** That is the reason to insist on those capabilities — not a threat to demote the surface.

### 8.3 What must be known before scheduling

| Collected at booking | Why |
|---|---|
| Name, email, **phone (required here)**, company | A meeting needs a fallback channel |
| One free-text context question | Satisfies the stated-need condition for this surface |
| Carried invisibly: first-touch and conversion-touch attribution, landing page, page context, CTA location | **Requires runtime custom fields — capability 1** |

**Nothing else is asked.** No budget, no role, no company size, no timeframe dropdown, no "how did you hear about us?"

### 8.4 Embedded or linked — decision

> **Recommendation: embedded on `/schedule-call`, progressively enhanced, with a usable non-script path always present on the page. Loaded on that route only.**

**Reasoning.** An embed keeps the conversion on MappedSkills' own page, which is where the context and the attribution live, and it avoids handing a decided visitor to a third-party domain. **But an embed is a third-party script that can fail, can be blocked, can be inaccessible, and is not under the firm's control** — and this exact embed is currently the site's second broken conversion path.

**The binding conditions on embedding, all of which must hold:**

1. **The page is useful before the embed loads and if it never loads.** What the call is, what you get from it, what it is not, what to have to hand, the cross-link to the form, and phone/WhatsApp are all server-rendered page content — never inside the embed.
2. **The embed loads only on this route.** A sitewide booking script is a performance cost on 21 pages that do not use it, and the current codebase has a sitewide-CTA pattern worth not repeating.
3. **It meets the same accessibility bar as the rest of the site.** A third-party embed does not inherit an exemption. **If it cannot, an accessible alternative path to the same outcome must exist on the page** — and that path is the form plus direct contact, which must therefore always be visible here.
4. **No keyboard trap.** Focus must be able to enter and leave the embed.
5. **It must be usable at the smallest supported width.** A booking embed that only works on desktop fails a mandatory capability.

**The decision rule, stated so it can be applied later without reopening this document:**

> **If the selected vendor cannot satisfy conditions 3, 4 and 5, do not embed it. Link to it, and make the page's own content carry the whole explanation.**

### 8.5 Booking states

| State | Requirement |
|---|---|
| **Loading** | An honest pending state. **Never an empty container** — the current defect |
| **Failed to load** | An explicit statement that the booking tool did not load, plus the form route and direct contact. **Never a silent empty region** |
| **No availability** | Stated plainly, with the form and direct contact offered. **No "check back later" without a route** |
| **Timezone** | Defaults to the visitor's detected zone **with the zone shown explicitly**. An India-first business that will take export-facing enquiries cannot get this wrong |
| **Confirmed** | Confirmation plus calendar attachment; reschedule and cancel via a link that requires no account |
| **Conversion event** | Fires **server-side from the booking webhook**, never from a client confirmation screen |

**Owner blockers that must not be designed around:** meeting duration · who takes the calls · real availability · business hours. **No default may be substituted for any of them.**

---

## 9. `/thank-you` UX

### 9.1 What it is

**A real post-conversion state**, reached only after the server confirms durable persistence — or, for the booking variant, after a confirmed booking. **It is currently orphaned in production: nothing links or redirects to it.**

**`noindex`, excluded from the sitemap, never in navigation.** Unchanged.

### 9.2 Structure

| Section | Content | Status |
|---|---|---|
| **Confirmation** | It arrived. Nothing else is needed. Show a reference where one exists | Complete |
| **What happens next** | Who reads it and what they do with it. **It will not say when** | **OWNER-BLOCKED** |
| **If it is urgent** | Phone and WhatsApp only | **OWNER-BLOCKED** (number) |
| **One useful thing to read** | **Exactly one link**, chosen from the page the enquiry came from | Complete |

### 9.3 Form and booking variants

**They are distinguished, because they are different facts.**

- **Form variant:** the enquiry arrived and a person will read it.
- **Booking variant:** the booking is made, and **the time is repeated in the visitor's own timezone**. *(Depends on the booking tool returning a confirmed slot server-side.)*

**Nothing else differs.** No second ask on either.

### 9.4 What belongs there, and the default

> **REFINED 2026-09-02.** Routing is now defined **by conversion type**: the **form variant** carries one context-derived link *(omitted entirely while its destinations are blocked)*; the **booking variant carries no link at all**, because a visitor who has just booked has an informational need of zero and everything useful to them is on the page they just read. Reasoning in `25` §5.

> **The brief asks whether useful secondary content belongs on `/thank-you`. Determination: one link, and nothing more. Default toward restraint.**

**Reasoning.** The conversion has happened. Every additional element on this page is either a second ask (prohibited) or an attempt to extract more value from someone who has already given what was asked. **One relevant link is a courtesy; a grid of related pages is a retention mechanic on a page that needs none.**

**Prohibited here, all named in the approved copy:** a second ask of any kind · a response-time statement in **any** form, including "shortly", "soon" or "as quickly as we can" · celebration language or exclamation marks · a progress bar or "step 3 of 3" · anything implying the enquiry has been assessed · an upsell, referral request, review request or social follow prompt · a newsletter sign-up · a download.

### 9.5 The measurement rule the UX must not break

**A `/thank-you` pageview never creates a conversion.** Both conversion events fire server-side. A bookmarked or refreshed thank-you page must inflate nothing. **This is the most common false-conversion source and it is named explicitly in the approved taxonomy.**

---

## 10. Accessibility requirements specific to the conversion path

Carried from the approved specification and binding at Gate 9B, not deferred.

| Requirement |
|---|
| Every input has a programmatically associated `<label>`; placeholder is never the only label |
| Required conveyed in text and via `aria-required`, not by colour or an asterisk alone |
| Errors associated via `aria-describedby` and announced through a live region |
| The submit result — success **or** failure — announced via a status region, not conveyed only visually |
| Focus moves to the first error on failed submit, and to the confirmation on success |
| Full keyboard operation with a visible focus indicator; **no keyboard traps, including inside the booking embed** |
| Instructions and format hints available **before** entry |
| Touch targets comfortably above minimum, including the consent checkbox |
| Reduced-motion respected by any transition on the form or its states |
| **The booking experience meets the same bar.** A third-party embed does not inherit an exemption |

---

## 11. Dependency register for this document

| Dependency | Type | What is inert without it |
|---|---|---|
| A server endpoint | **TECHNICAL — DOES NOT EXIST** | Every submission behaviour |
| Durable persistence | **TECHNICAL — DOES NOT EXIST** | The success state; the conversion event; the persist-first rule |
| Transactional email | **TECHNICAL — DOES NOT EXIST** | Acknowledgement; internal notification |
| Server-side idempotency | **TECHNICAL** | Double-submission protection |
| Server-side spam screening | **TECHNICAL** | Silent screening; the identical-success rule |
| Analytics + consent mechanism | **TECHNICAL** | All measurement; consent-gated client events |
| A booking tool meeting capabilities 1–10 | **TECHNICAL + OWNER** | Channel measurement on bookings; the embed decision |
| Complete NAP | **OWNER-BLOCKED** | `/contact` §4 |
| Enquiry-response owner and business hours | **OWNER-BLOCKED** | `/contact` §2, `/thank-you` §2, `/how-it-works` §9 — **all three must say the same thing** |
| Who takes calls, call length, availability | **OWNER-BLOCKED** | `/schedule-call` §1 — the section that does the page's work |
| Published phone number | **OWNER-BLOCKED** | Every DIRECT CTA sitewide |
| Consent wording | **LEGAL REVIEW** | The consent control |
| Entry-offer model | **DECISION REQUIRED** | DIAGNOSTIC and PRIMARY wording; **not structure** |
| A measured response-time distribution | **EVIDENCE REQUIRED** | Any timing statement, anywhere, ever |
