# Form & Meeting-Booking Specification

**Session:** 08 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Behaviour and data specification only.
**Explicitly not in this document:** visual design, layout, field copy, labels, placeholder text, error wording, or any vendor selection.

---

## 0. What exists today, and why it matters here

**VERIFIED FACT (Sessions 01/01B, repository + live).** The production `/contact` form has **8 fields, 5 of them required — name, email, phone, service and budget** — and **no `action` and no `method`.** It simulates submission with a `setTimeout` and shows a success state. There is **no `app/api/` directory and no route handler anywhere in the repository**, so there is nowhere for a form to POST. The `/schedule-call` Calendly container renders **empty**, because the code calls the **badge** widget API against an **inline** widget container.

**Two consequences govern this specification:**
1. **The most important requirement is not a field choice — it is that a backend must exist at all.** Everything below presumes a server endpoint that does not currently exist.
2. **The current form requires budget.** That is the highest-friction field on the page, it collects an unverifiable self-reported number, and `QUALIFIED_ENQUIRY_DEFINITION.md` §1 explains why it cannot qualify anything. **It is removed from the required set** — a deliberate change to existing production behaviour, flagged as such.

---

## 1. Field specification — the enquiry form

**Required: 4. Optional: 3. Automatic (never shown): 9+.**

### 1.1 Required fields (4)

| Field | Input type | Why it exists | Qualification role | Attribution role |
|---|---|---|---|---|
| **Name** | text | Someone must be addressable by name | WQE condition 2 (reachable identity) | None |
| **Work email** | email | The reply channel, and the primary identity key across enquiry, CRM and deduplication | WQE conditions 2, 3 (domain type), 6 (dedup key) | Joins the enquiry to the CRM record |
| **Company** | text | Establishes business context at minimal cost — one word satisfies it | WQE condition 3 | None |
| **What you're trying to fix** | textarea | The enquiry itself. Also the single most useful input for a human reading the record | WQE condition 4 (stated need) | None |

**Why exactly these four.** Each maps to a distinct WQE condition that nothing else can supply. Remove any one and a condition becomes unevaluable. Add a fifth and it must justify itself against measurable friction — which, at MappedSkills' expected volume, cannot be measured for a long time.

### 1.2 Optional fields (3)

| Field | Why optional |
|---|---|
| **Phone / WhatsApp** | **Deliberately optional on the form and required on the booking surface.** Phone is a genuinely preferred channel in this market and for the industrial segment, so it must be easy to give — but requiring it costs completions and invites junk numbers. Supplying it voluntarily is recorded as a positive soft signal |
| **Website** | Highly useful to MappedSkills (it is what would be diagnosed) and it satisfies WQE condition 3 independently — but requiring a URL from a buyer on a phone is real friction |
| **Marketing consent** | An unticked, separate opt-in. **Never bundled with submission** — see `POST_SUBMISSION_AND_FOLLOWUP.md` §7 |

### 1.3 Contextual, pre-filled — not asked

| Field | How it is set |
|---|---|
| **Service / problem interest** | **Derived from the page the visitor converted on.** Someone enquiring from `/ai-seo` has already told the system what they want; asking again is friction that also produces a worse answer than the page context. Rendered as a visible, editable pre-selection where a page maps to more than one, and silently recorded where it maps to one |

### 1.4 Fields NOT to ask at first contact

| Field | Why not |
|---|---|
| **Budget / spend band** | **Currently required in production; removed.** Unverifiable, high-friction, and it cannot qualify anything (`QUALIFIED_ENQUIRY_DEFINITION.md` §1). MappedSkills already publishes price bands on `/pricing`, so the buyer can self-select before enquiring — the honest place for the price conversation |
| **Job title / role** | An `ICP.md` dimension, but self-reported and better established in conversation. In owner-led businesses the answer is usually "owner", which the message reveals anyway |
| **Company size / revenue / employees** | High friction, frequently declined or falsified, and `ICP.md` §9 explicitly declines to set revenue or headcount thresholds |
| **Timeframe / urgency dropdown** | Self-reported, poorly correlated with reality, and it invites a performative answer |
| **"How did you hear about us?"** | **The system knows this** (`ATTRIBUTION_MODEL.md`). Asking transfers a measurement failure onto the visitor and produces worse data than the referrer |
| **Industry dropdown** | Would imply a vertical commitment the frozen strategy has not made; manufacturing is a **candidate** beachhead |
| **Multi-select service checkboxes** | Reproduces the rejected service-menu framing at the point of conversion |

---

## 2. Form experience requirements

Behaviour only. No visual design, no copy.

| Aspect | Requirement |
|---|---|
| **Steps** | **Single step.** Four required fields do not justify multi-step, and every additional step is an abandonment surface. Revisit only if the field set genuinely grows |
| **Validation timing** | On blur for format checks; on submit for completeness. **Never validate a field the visitor has not yet touched** |
| **Errors** | Field-level, adjacent to the field, describing how to fix it — not merely that it is wrong. A summary at the top on submit failure, focus moved to the first error |
| **Value preservation** | **All entered values survive any validation failure, server error or network failure.** Losing a typed message is the most severe recoverable defect this form can have |
| **Loading state** | Submit control enters a busy state immediately and is disabled for the duration |
| **Double submission** | Disabled control **plus** an idempotency key generated client-side and enforced server-side — a disabled button alone does not survive a double-tap or a retry |
| **Network failure** | Explicit failure state, values preserved, retry available. **Never a silent failure and never a false success** |
| **Success** | Shown **only after the server confirms durable persistence** (§7). See `POST_SUBMISSION_AND_FOLLOWUP.md` §1 |
| **Spam rejection** | Suspected spam receives the **same success state** as a legitimate submission. Telling a bot it failed teaches it to adapt |
| **Autofill** | Correct `autocomplete` tokens on every field — `name`, `email`, `tel`, `organization`, `url` |
| **Keyboard** | Fully completable and submittable by keyboard alone, in a logical tab order |
| **Privacy** | A short privacy statement adjacent to the submit control with a link to `/privacy-policy`, distinct from the marketing consent control |

---

## 3. Meeting booking — required capabilities

**No vendor is selected.** The current Calendly implementation is broken, and whether it is repaired or replaced is an implementation decision. These are the capabilities the chosen system must have.

### 3.1 Mandatory — required for a booking to be *measurable* (qualification does not depend on them)

| # | Capability | Why it is mandatory |
|---|---|---|
| 1 | **Accepts hidden/custom fields set at runtime and persists them on the booking record** | The load-bearing **measurement** requirement. Without it, UTMs, landing page and page context cannot reach the booking, and **every booking is recorded with `attribution_status = unavailable`.** Note the corrected consequence: such a booking is **still a qualified enquiry** if it meets the five conditions — attribution does not gate qualification (`QUALIFIED_ENQUIRY_DEFINITION.md` §2A). What is lost is the ability to say which channel produced it |
| 2 | **Exposes the completed booking to a server-side webhook or API**, including those custom fields | Client-side confirmation is not evidence a booking exists. The CRM record and the conversion event must originate server-side |
| 3 | **Collects name, email, phone and company** at booking | Phone **is** required here — a meeting needs a fallback channel |
| 4 | **One free-text context question** | Satisfies WQE condition 4 for the booking surface |
| 5 | **Correct timezone handling**, defaulting to the visitor's detected zone with the zone shown explicitly | An India-first business that will take export-facing enquiries cannot get this wrong |
| 6 | **Confirmation to both parties**, with calendar attachment |
| 7 | **Reschedule and cancel** via a link that does not require an account |
| 8 | **Reminders** before the meeting |
| 9 | **Abuse controls** — email verification or equivalent, and rate limiting on repeat bookings |
| 10 | **Attendance outcome retrievable** (attended / no-show), by webhook or export | No-show tracking is a lifecycle input; without it the qualified-enquiry count silently overstates real conversations |

### 3.2 The fallback rule

**If the selected system cannot satisfy capabilities 1 and 2, every booking is blind to acquisition** — recorded as a qualified enquiry with `attribution_status = unavailable`. **Bookings remain a primary conversion surface**, because attribution completeness does not determine qualification (`QUALIFIED_ENQUIRY_DEFINITION.md` §2A).

**What is genuinely lost is channel measurement**, and at scale that is severe: a large and growing share of qualified enquiries would be unattributable, making it impossible to say which acquisition work is producing them. **That is the reason to insist on capabilities 1 and 2 — not a threat to demote the surface.** The condition was flagged in the Session 07 correction pass and remains open.

---

## 4. Form vs booking routing

**Rules by page type, not by URL.** Full detail in `PAGE_TYPE_CRO_RULES.md`.

| Page type | Form | Booking | Rationale |
|---|---|---|---|
| Homepage | **Primary** | Offered | Mixed intent; the lower-commitment surface leads |
| Commercial pages | **Primary** | Offered | The visitor has declared a need; capture it in context |
| Conditional vertical page | **Primary** | Offered, **with phone/WhatsApp prominent** | The industrial segment calls. Only if the page ships |
| Problem pages | **Primary**, diagnostic-framed | Secondary, below the fold | Problem-aware, not yet vendor-selecting |
| `/pricing` | Offered | **Emphasised** | Price-stage buyers want to talk to a person |
| `/how-it-works`, `/research` | Available | Available, unemphasised | Evaluation surfaces. A hard conversion push here undercuts the credibility the page exists to build |
| `/blog`, editorial | Contextual link only | **No** | Low-commitment stage. A booking prompt on an article is a mismatch |
| `/about` | **Primary** | Offered | Late-stage evaluators |
| `/contact` | **The form surface** | Cross-link | — |
| `/schedule-call` | Cross-link | **The booking surface** | — |

**Neither surface appears on** `/thank-you`, legal pages, or the 404 page — beyond ordinary recovery navigation.

---

## 5. Qualification without friction — what is captured automatically

**Rule: never ask a visitor for something the system can reliably know.**

| Captured | Source |
|---|---|
| First landing page, first referrer, first-touch UTMs, first-touch timestamp | First session; persisted (`ATTRIBUTION_MODEL.md` §4) |
| Conversion page, conversion-touch UTMs, conversion timestamp | Submission |
| Page type, service/problem context, content cluster | Page metadata |
| CTA location and CTA role | The control that opened or submitted the form |
| Device class, viewport class | Client |
| Session page count, whether `/pricing` was viewed, whether a proof page was viewed | Session, first-party |
| Conversion surface (`form` / `booking`) | Submission |
| Idempotency key, submission timestamp, user-agent class | Client + server |

**Not captured:** cross-site behaviour, third-party enrichment, or anything requiring a data broker. **Where consent is declined, analytics identifiers are not written — but the enquiry record still stores the fields it needs to service the enquiry** (`POST_SUBMISSION_AND_FOLLOWUP.md` §7).

---

## 6. Mobile requirements

| Requirement | Detail |
|---|---|
| Field count | The four-field required set is itself the mobile strategy |
| Input types | `type="email"`, `type="tel"`, `inputmode` set so the correct keyboard appears. A numeric keypad for phone is not cosmetic |
| Touch targets | Minimum 44×44 CSS px for every control, including the consent checkbox |
| Sticky CTA | Permitted, but it must not obscure form fields or the submit control, and must not cover content while the keyboard is open |
| Modals | **Avoid.** No interstitials, no exit-intent overlays, no entry pop-ups (`FUNNEL_ARCHITECTURE.md` prohibitions) |
| Phone interaction | `tel:` links must be one tap. On mobile, calling is often the fastest legitimate path |
| Booking | The booking surface must be usable on a small viewport. **A booking embed that only works on desktop fails capability 5** |
| Errors | Visible without scrolling away from the field; focus moves to the first error |
| Performance | The form must not depend on a heavy third-party script to function. **The booking embed must not be loaded on pages that do not use it** — a current sitewide-CTA pattern worth not repeating |

---

## 7. Accessibility requirements — WCAG 2.2 AA

Project Rule 13 makes this a release requirement, not an enhancement.

| Requirement |
|---|
| Every input has a programmatically associated `<label>`. **Placeholder text is never the only label** |
| Required fields are conveyed in text and via `aria-required`, not by colour or an asterisk alone |
| Errors are associated with their field via `aria-describedby`, and announced through a live region |
| The submit result — success or failure — is announced via a status region, not conveyed only by visual change |
| Focus moves to the first error on failed submit, and to the confirmation on success |
| Full keyboard operation with a visible focus indicator; no keyboard traps, including in the booking embed |
| Instructions and format hints are available before entry, not only after an error |
| Contrast and visible focus styling to be met in the design phase — flagged here, resolved there |
| Reduced-motion preference respected by any transition on the form or its states |
| **The booking experience must meet the same bar.** A third-party embed does not inherit an exemption; if it cannot, an accessible alternative path to the same outcome must exist |

---

## 8. Spam and abuse protection — layered

Ordered cheapest and least intrusive first. **No implementation library is selected.**

| Layer | Mechanism | Conversion cost |
|---|---|---|
| 1 | **Honeypot field**, hidden from users and assistive technology | None |
| 2 | **Submission-timing check** — implausibly fast submissions are suspect | None |
| 3 | **Server-side validation of every field.** Client validation is a convenience and is never trusted | None |
| 4 | **Rate limiting** by IP and by email address, with sane windows | None for humans |
| 5 | **Disposable/temporary email domain check** — routes to **Review Required**, never automatic rejection | Near zero |
| 6 | **Message heuristics** — link count, known solicitation patterns | None |
| 7 | **Duplicate detection** within the deduplication window | None |
| 8 | **Booking abuse controls** — email verification, repeat-booking limits | Low |
| 9 | **CAPTCHA — only if layers 1–8 prove insufficient after launch** | **Material.** Costs completions and creates an accessibility burden. **Not deployed by default** |

**Rules:** suspected spam receives the same success state as a legitimate submission · **confident spam is quarantined under a defined retention policy, then deleted or anonymised** (`QUALIFIED_ENQUIRY_DEFINITION.md` §7A) · **spam never counts as a conversion**, never fires a conversion event (`EVENT_TAXONOMY.md` §6), and never creates a normal CRM lead or sales notification · **suspicious but uncertain submissions go to Review Required, not quarantine** · a spam-rate metric is reported so silent over-blocking becomes visible · **detection logic is never revealed to the submitter.**

---

## 9. Open decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **Whether the backend is a Next.js route handler or an external endpoint.** There is currently no `app/api/` directory and no route handler; the deployment target is cPanel/Passenger, not Vercel | Technical phase |
| 2 | **Whether the booking vendor can satisfy capabilities 1 and 2** — repair Calendly or replace it. **The two-surface conversion model depends on this** | Technical phase + owner |
| 3 | **Whether phone should be required on the form.** Specified optional. **Honest caveat: `BUSINESS_STRATEGY.md` §7 forbids promising statistically valid experimentation below a real traffic threshold — and that applies to MappedSkills' own site. This will be a judgement for a long time, not a test result** | Owner |
| 4 | **Minimum message length and deduplication window** | Implementation, then review after the first baseline period |
| 5 | **Whether an inline form appears on commercial pages or they route to `/contact` with context preserved** | Design phase. **Either is acceptable provided page context survives the transition** |
