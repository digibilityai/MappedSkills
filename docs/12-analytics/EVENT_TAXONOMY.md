# Event Taxonomy

**Session:** 08 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Specification only — no tag, container or code is implemented.

**Distinction that governs this document:**
- **Analytics events** — anonymous, aggregate, behavioural. **Never contain PII.**
- **CRM lifecycle fields** — identified, per-person, business records. See `CRM_DATA_CONTRACT.md`.

They are separate systems with separate rules. The join key between them is an **opaque `enquiry_id`**, never an email address.

---

## 1. Naming conventions

| Rule | Specification |
|---|---|
| Case | `snake_case`, lowercase |
| Structure | `object_action`, past tense — `lead_form_submitted`, not `submitLeadForm` |
| Stability | **Event names are a contract.** Renaming breaks historical continuity. Deprecate rather than rename |
| Parameters | `snake_case`, consistent meaning across every event |
| No PII | §7 |

---

## 2. Event list

**Core conversion events are marked ★.** These are the events the business metric depends on; the rest are diagnostic.

| # | Event | Fires when | Where fired |
|---|---|---|---|
| 1 | `primary_cta_clicked` | Any PRIMARY or DIAGNOSTIC CTA is activated | Client |
| 2 | `lead_form_started` | First meaningful interaction with a form field | Client |
| 3 | `lead_form_validation_error` | Client- or server-side validation rejects a field | Client |
| 4 | `lead_form_abandoned` | Form started, then the page is left without submission | Client |
| 5 | ★ `lead_form_submitted` | **Server confirms durable persistence** | **Server** |
| 6 | `meeting_started` | Booking surface opened | Client |
| 7 | ★ `meeting_booked` | **Booking webhook confirms the booking** | **Server** |
| 8 | `meeting_rescheduled` | Reschedule webhook | Server |
| 9 | `meeting_cancelled` | Cancellation webhook | Server |
| 10 | `phone_clicked` | A `tel:` link is activated | Client |
| 11 | `email_clicked` | A `mailto:` link is activated | Client |
| 12 | `proof_opened` | `/how-it-works` or an in-page proof module is opened | Client |
| 13 | `research_opened` | A `/research` entry is opened | Client |
| 14 | `pricing_cta_clicked` | A CTA on `/pricing` is activated | Client |
| 15 | `research_subscribed` | Research/insight subscription completed | Server |
| 16 | `meeting_no_show` | Attendance outcome recorded | Server |

**`lead_form_step_completed` is specified but not implemented at launch** — the form is single-step (`FORM_AND_BOOKING_SPEC.md` §2). It is reserved so a future multi-step form does not require a taxonomy change.

### Why the two conversion events are server-side

**Client-side conversion tracking is not evidence a conversion happened.** It fires on ad-blocked sessions inconsistently, can be triggered by a refresh, and — most importantly — would fire even when persistence failed. **The two ★ events fire only from the server, on confirmed persistence or a confirmed webhook.** This is what makes the funnel report trustworthy and is the direct fix for the current production defect where a success screen is shown while nothing is transmitted.

---

## 3. Standard parameters

Present on every event where applicable.

| Parameter | Values | Purpose |
|---|---|---|
| `page_type` | `homepage`, `commercial`, `problem`, `vertical`, `pricing`, `methodology`, `research`, `editorial`, `about`, `contact`, `booking` | Maps directly to `PAGE_TYPE_CRO_RULES.md` |
| `page_path` | Path only | Never a full URL with query string (§7) |
| `service` | The capability context — e.g. `seo`, `ai_seo`, `paid`, `conversion`, `lead_gen`, `none` | Set from page context, not asked |
| `problem` | The problem context, or `none` | |
| `content_cluster` | `enquiry_conversion`, `ai_discovery`, `industrial_b2b`, `none` | Aligns to `SEARCH_ARCHITECTURE.md` §5 |
| `cta_location` | `header`, `hero`, `inline`, `section_end`, `sticky`, `footer`, `content` | Where the control sat |
| `cta_role` | `primary`, `diagnostic`, `proof`, `research`, `contextual`, `low_commitment`, `direct` | From `CTA_SYSTEM.md` §1 |
| `conversion_surface` | `form`, `booking`, `manual` | Which surface created the conversion |
| `device_class` | `mobile`, `tablet`, `desktop` | |
| `first_source`, `first_medium`, `first_campaign` | Lowercase | First-touch (`ATTRIBUTION_MODEL.md` §3.1) |
| `latest_source`, `latest_medium`, `latest_campaign` | Lowercase | Conversion-touch |
| `landing_page` | Path only | First landing page |
| `enquiry_id` | **Opaque identifier** | **The only join key to the CRM. Never an email** |

### Conversion-event-only parameters

| Parameter | Values | Note |
|---|---|---|
| `qualification_status` | `qualified`, `unqualified`, `review_required` | **`spam` never fires a conversion event** (§6) |
| `attribution_status` | `complete`, `partial`, `unavailable` | **Independent of qualification.** Lets qualified enquiries be reported by measurement completeness without ever excluding them (`QUALIFIED_ENQUIRY_DEFINITION.md` §2A) |
| `unqualified_reason` | Disqualifier category — `job_application`, `course_enquiry`, `vendor_outreach`, `student_request`, `out_of_scope` | Category only, never free text |
| `is_duplicate` | boolean | |

### Error and abandonment parameters

| Parameter | Note |
|---|---|
| `field_name` | **The field's name only — never its value** |
| `error_type` | `required`, `format`, `server`, `rate_limited` |
| `abandonment_field` | Last field interacted with |

---

## 4. Which events count as the business conversion

| Event | Business conversion? |
|---|---|
| `lead_form_submitted` **with `qualification_status = qualified`** | **Yes — at any `attribution_status`** |
| `meeting_booked` **with `qualification_status = qualified`** | **Yes — at any `attribution_status`** |
| Either, with `qualification_status = unqualified` or `review_required` | **No** — visible in the funnel, excluded from the business metric |
| Either, with `attribution_status = unavailable` | **Yes, if qualified.** Attribution completeness never determines whether a conversion counts |
| `primary_cta_clicked`, `pricing_cta_clicked` | **No** — diagnostic |
| `phone_clicked`, `email_clicked` | **No** — conversion *intent*, not a verified enquiry (`CTA_SYSTEM.md` §5) |
| `meeting_started`, `lead_form_started` | **No** — funnel steps |
| Any spam submission | **No event fires at all** |

**A cancelled or no-show meeting does not reverse the conversion.** The enquiry was real; attendance is a separate lifecycle outcome.

---

## 5. Firing rules

1. **Exactly once per occurrence.** Deduplicated by the idempotency key on submission and by webhook ID on bookings. Verified against refresh, back-navigation, double-submit and retry.
2. **`/thank-you` pageviews never create conversions.** A bookmarked or refreshed thank-you page must inflate nothing. **The most common false-conversion source, named explicitly.**
3. **Server events are the system of record** for the two ★ conversions. A client event may exist for latency diagnostics but is never counted.
4. **No conversion event fires when persistence fails.** A failed enquiry is an alert, not a conversion.
5. **Consent-gated client events do not fire without consent.** Server-side conversion events, being necessary business records rather than tracking, are recorded on the enquiry regardless — **flagged for legal review**.
6. **Internal and team traffic is excluded** from reporting, and **excluded before the baseline period begins**, not retrospectively.

---

## 6. Spam never becomes a conversion

Confident spam is **quarantined under a defined retention policy and reported only in an aggregate spam-rate metric**, and **fires no analytics event**. If spam fired `lead_form_submitted` with a spam state, one filter mistake in a report would corrupt the business metric permanently. The exclusion is enforced at source rather than in reporting.

**Suspicious but uncertain submissions are not spam** — they go to `review_required`, fire the conversion event with that status, and are excluded from the business metric until a human resolves them.

---

## 7. PII prohibition

**Never in any analytics event, parameter, page path or URL:**

name · email address · phone number · company name · website URL · free-text message content · IP address as a stored dimension · any UTM value containing an identifier.

**Rules:**
- Only `field_name` is recorded on errors — **never `field_value`**.
- `page_path` excludes query strings, which can carry identifiers.
- The **opaque `enquiry_id`** is the only join to identified data, and resolving it requires CRM access.
- Message text is never sampled, truncated or hashed into analytics.

**Why this is a hard line rather than a preference:** MappedSkills intends to sell measurement honesty, and analytics platforms are outside its control. PII placed there cannot be reliably retrieved or deleted, which creates a compliance exposure and would contradict the position being sold.

---

## 8. Analytics events vs CRM fields

| | Analytics | CRM |
|---|---|---|
| Grain | Event | Person / enquiry |
| Identity | Anonymous, opaque `enquiry_id` | Identified |
| PII | **Never** | **Yes, by necessity** |
| Purpose | Behaviour, funnel, channel performance | Servicing the enquiry, lifecycle, revenue chain |
| Retention | Platform default | Defined policy (**legal review**) |
| Question answered | "Which pages and sources produce qualified enquiries?" | "Who enquired, what did they need, what happened?" |

**Attribution is written to both** — that is what allows a qualified enquiry to be traced to its source in aggregate *and* connected to an opportunity individually.

---

## 9. Open decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **Analytics platform and whether server-side events go via a server container or direct API** | Technical phase. **No vendor selected.** Note GA4 is declared in `.env.example` but wired nowhere in code, and the GTM container's contents are an external asset this repository cannot see |
| 2 | **Whether server-side conversion events are consent-gated** | **Legal review required** |
| 3 | **Internal-traffic exclusion mechanism** | Technical phase |
| 4 | **Whether Meta Pixel is retained at all** | Owner. **Repository code contains a Meta Pixel implementation, while Session 01B live verification found no active third-party analytics scripts in production (`fbq` undefined).** If it is ever activated it must be consent-gated first. Paid social also has the weakest evidence of the three paid capabilities |
