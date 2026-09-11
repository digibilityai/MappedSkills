# Post-Submission Experience, Response & Failure Handling

**Session:** 08 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**No email copy, no page copy, no UI is written here.**

---

## 0. The governing principle

> **A legitimate enquiry must never be silently lost because a secondary integration failed.**

This is not a theoretical concern. **VERIFIED FACT (Sessions 01/01B):** the production form currently shows a success state while transmitting nothing. Every enquiry submitted since that code shipped was lost, and the visitor was told it succeeded. The architecture below exists specifically so that cannot recur.

### The persist-first rule

Server-side processing happens in a fixed order, and **only step 2 may block the success response**:

```
1. Receive submission
2. Validate + screen for abuse + PERSIST to durable storage   ← the only blocking step
3. Return success to the visitor
4. Then, asynchronously and independently:
     · internal notification
     · acknowledgement email
     · CRM create/update
     · server-side conversion event
```

**Rules:**
- **Success is shown only after step 2 confirms durable persistence.** Never optimistically, never on a client-side timer.
- **Any failure in step 4 is logged, queued and retried. It never fails the visitor's submission** and never discards the record.
- **If persistence itself fails**, the visitor sees an explicit failure with their values preserved and a retry available — plus a fallback contact route. **A false success is the one outcome that is never acceptable.**

---

## 1. Qualified form submission

| Step | Behaviour |
|---|---|
| Confirmation | Server-confirmed success state |
| `/thank-you` | The post-enquiry destination. **Currently orphaned — nothing links or redirects to it.** It must be wired up |
| Booking offered after? | **Yes — as an optional accelerator, not a second ask.** The conversion is already complete; this only shortens time-to-conversation for those who want it |
| Response expectation | Communicated in plain language with business hours and timezone. **No numeric SLA** (§5) |
| Acknowledgement email | Immediate, transactional. Restates what was sent, so the enquiry has a record |
| Internal notification | Immediate, with the full record and its attribution |
| CRM | Create or update, per `CRM_DATA_CONTRACT.md` |
| Analytics | `lead_form_submitted` — **server-side, on confirmed persistence** (§9) |
| Next-best content | One relevant link. **Never a second conversion ask** |

---

## 2. Meeting booking

| Step | Behaviour |
|---|---|
| Confirmation | The booking system's confirmation, plus calendar attachment |
| Qualification | Evaluated against the **same five WQE conditions**. A booking whose attribution did not survive is **still a qualified enquiry**, recorded with `attribution_status = unavailable` (`QUALIFIED_ENQUIRY_DEFINITION.md` §2A) |
| Internal notification | Immediate, including the custom attribution fields |
| CRM | Create or update, with `conversion_surface = booking` |
| Analytics | `meeting_booked` — **server-side, from the booking webhook**, not from a client confirmation screen |
| Reminders | Before the meeting |
| Reschedule / cancel | `meeting_rescheduled` / `meeting_cancelled`. **A cancelled meeting does not retroactively un-qualify the enquiry** — the enquiry was real |
| No-show | Recorded as a lifecycle outcome, not a conversion reversal |

---

## 3. Unqualified submission

Someone who fails a hard disqualifier is still a person who wrote in.

- **Same success state.** No visitor is told they were judged unqualified.
- Persisted, and included in a low-priority digest rather than an immediate notification.
- CRM record created with `qualification_status = unqualified` and the reason.
- **`lead_form_submitted` fires with `qualification_status = unqualified`** — so the submission is visible in the funnel while **not counting toward the qualified-enquiry business metric**. Both facts matter: hiding it would make form performance unreadable; counting it would corrupt the outcome metric.

---

## 4. Spam and technical failure

| Case | Behaviour |
|---|---|
| **Confident spam** | **Same success state** — detection logic is never revealed. **Quarantined under a defined retention policy, then deleted or anonymised.** No conversion event, **no CRM lead, no sales notification.** Contributes to a reported spam-rate metric so silent over-blocking is visible |
| **Suspicious but uncertain** | **Review Required, not quarantine.** The cost of wrongly discarding a real buyer far exceeds the cost of a human glance |
| **Persistence fails** | Explicit failure, **values preserved**, retry available, fallback contact route shown. Alert raised. **The only case where the visitor sees a failure** |
| **Notification fails** | Visitor unaffected. Logged, queued, retried, alerted |
| **CRM unavailable** | Visitor unaffected. Record queued for reconciliation. **The enquiry exists in durable storage regardless** |
| **Booking provider unavailable** | The booking surface degrades to the form surface, which must remain independently functional. **The two surfaces must not share a single point of failure** |
| **Analytics unavailable** | Visitor unaffected. The enquiry is still created. **Measurement loss is never allowed to become enquiry loss** |
| **Consent declined** | The enquiry is still created, serviced **and qualified normally**. Analytics identifiers are not written; `attribution_status` becomes `partial` or `unavailable`. **Qualification is untouched** (`QUALIFIED_ENQUIRY_DEFINITION.md` §2A) |
| **Attribution storage fails** | The enquiry proceeds and is qualified normally with `attribution_status = unavailable`. **A measurement failure must never become an enquiry failure** |
| **Email verification unavailable** | **Fails open.** The enquiry passes condition 2 with an advisory flag. A DNS, network or API outage never rejects a legitimate enquiry (`QUALIFIED_ENQUIRY_DEFINITION.md` §2B) |
| **Duplicate submission** | Deduplicated server-side by idempotency key. One record, one notification, **one conversion event** |

---

## 5. Response-time architecture

**The internal operating target and the public promise are deliberately different, and the difference is honest rather than evasive.**

| | Internal operating target | Public statement |
|---|---|---|
| Acknowledgement | Automatic and immediate | "You'll get a confirmation straight away" |
| First human response | **Within one business day** | Business hours and timezone stated. **No numeric SLA** |
| Escalation | Enquiry untouched past the target is escalated to the owner | Not stated publicly |

**Why no public numeric SLA.** MappedSkills is small, has no measured response history, and sells enquiry effectiveness. **Publishing an unmet response promise would be a live demonstration of the failure it sells the fix for.** `BUSINESS_STRATEGY.md` §11 forbids unsupported claims becoming reasons-to-believe — a response-time promise is exactly that until it has been measured.

**Publish an SLA only after** the first baseline period produces a real distribution of response times. **That is then a genuine proof asset** — and one no competitor examined publishes.

**Ownership:** every enquiry has exactly one named owner from creation. Unowned enquiries are the documented failure mode this business exists to fix.

**After hours:** the acknowledgement is automatic and honest about timing. **No automated reply may imply a human has seen it.**

---

## 6. Retention and review

- **Every legitimate submission is persisted** — Qualified, Unqualified and Review Required alike, and none is ever deleted for being unqualified.
- **Confident spam is quarantined separately** under a defined retention policy and then deleted or anonymised (`QUALIFIED_ENQUIRY_DEFINITION.md` §7A). **Retention duration is a privacy and security decision requiring review**, not set here.
- **Review Required is worked to zero on a defined cadence.** An unresolved backlog silently suppresses the business metric.
- **A rising Unqualified or Spam rate is a signal about traffic or protection, not a reason to loosen the definition.**
- **A rising `attribution_status = unavailable` share is a measurement problem to fix, never a quality problem.** It must never be addressed by moving enquiries out of the qualified count.
- **Quarantine is sampled for false positives.** A legitimate enquiry found there is restored and the detection layer adjusted.

---

## 7. Privacy and consent — architecture level

**Not legal advice. Every item below requires legal review before launch.**

| Requirement | Specification |
|---|---|
| **Necessary processing vs marketing** | **Strictly separated.** Submitting an enquiry authorises responding to it. It does **not** authorise marketing |
| **Marketing consent** | A **separate, unticked, optional** control. **Never bundled with submission and never a condition of it** |
| **Disclosure at the point of collection** | Short statement adjacent to submit, linking to `/privacy-policy` |
| **Consent record** | Text version, timestamp, source page and mechanism stored with the enquiry — so what was agreed to, and when, is reconstructable |
| **Analytics/cookie consent** | No consent mechanism exists. **Repository code contains GTM and Meta Pixel implementation, while Session 01B live verification found no active third-party analytics scripts in production — `dataLayer`, `gtag` and `fbq` were all undefined.** The site's own privacy policy states a banner is required before launch. **Consent must be implemented before any analytics or advertising tracking requiring consent is activated. This is a pre-launch blocker, not a live breach** |
| **Interaction with the enquiry** | Declining analytics consent **must not** prevent, delay or downgrade an enquiry. Attribution degrades to `partial` or `unavailable`; **`qualification_status` is unaffected and the enquiry is never sent to Review Required for that reason** |
| **Data minimisation** | The four-field required set is the practical expression of this |
| **Retention** | A defined retention period per record type, with spam retained only long enough for review. **Legal review required** |
| **PII in analytics** | **Prohibited.** No name, email, phone, company or message text in any analytics event (`EVENT_TAXONOMY.md` §7) |

---

## 8. Follow-up architecture

**Deliberately minimal. `BUSINESS_STRATEGY.md` §10 confines automation to a limited downstream expansion capability, and `SERVICE_ARCHITECTURE.md` §8 excludes lifecycle architecture entirely — including for MappedSkills itself.**

| Stage | Automated? | Detail |
|---|---|---|
| **Immediate acknowledgement** | **Yes** | Transactional. Sets expectations honestly |
| **Internal notification** | **Yes** | Immediate, with owner assignment |
| **Human follow-up** | **No — human** | The first real response is always a person |
| **No-response follow-up** | **Yes, minimally** | **At most two touches**, then stop. A third is pursuit, not follow-up |
| **Meeting reminder** | **Yes** | Before the meeting |
| **No-show handling** | **One** automated re-book offer, then a human decision |
| **Longer-term nurture** | **NOT AT LAUNCH** | Eligibility recorded (marketing consent + not disqualified) so it remains possible later. **It is not built**, because it would require content that does not exist and would drift toward the lifecycle-marketing programme the strategy rejects |

**What is deliberately absent:** lead scoring automation, multi-branch sequences, behavioural triggers, re-engagement campaigns, drip programmes. Adding any of these would make MappedSkills' own site a demonstration of the positioning it rejected.

---

## 9. Measurement QA

How a future implementation proves the funnel is telling the truth.

| Check | Requirement |
|---|---|
| **Events fire exactly once** | Verify no duplicate on double-submit, retry, browser back, or page refresh |
| **`/thank-you` does not create conversions** | **The conversion event is server-side on confirmed persistence — never a `/thank-you` pageview.** A bookmarked or refreshed thank-you page must not inflate anything. This is the single most common false-conversion source |
| **UTM persistence** | First-touch survives internal navigation and is not overwritten by internal links (`ATTRIBUTION_MODEL.md` §5) |
| **Attribution failure does not disqualify** | Submit with storage cleared, consent declined and no referrer. **The enquiry must be Qualified with `attribution_status = unavailable`** |
| **Email verification fails open** | Simulate a DNS/API timeout. **The enquiry must pass condition 2 with an advisory flag, not be rejected or delayed** |
| **CRM parity** | Submission count reconciles to CRM record count for a sample period. **Any gap is a lost enquiry until proven otherwise** |
| **Qualification flows correctly** | Each of the four states appears in the CRM as assigned, and Unqualified/Spam do **not** count toward the business metric |
| **Bookings retain source** | A test booking carries UTMs and landing page end-to-end into the CRM. **If it cannot, bookings are still qualified but arrive with `attribution_status = unavailable`** — a measurement loss, not a qualification failure (`FORM_AND_BOOKING_SPEC.md` §3.2) |
| **Consent captured** | Consent text, timestamp and source present on records where given; absent where declined |
| **Spam creates no conversions** | Seeded spam appears in quarantine and in the spam-rate metric, **and in no conversion count, no CRM lead and no sales notification** |
| **Quarantine retention runs** | Records past the retention period are deleted or anonymised as policy states |
| **Internal traffic excluded** | Team and agency testing filtered from reporting — **and excluded before, not after, the baseline period begins** |
| **Failure paths exercised** | CRM down, notification down, booking down: the enquiry still exists in every case |

---

## 10. Baseline before revamp

**There is no analytics baseline. `dataLayer`, `gtag` and `fbq` are all undefined in production; no GA4 tag is wired in code; and neither conversion path functions.**

**Every pre-launch conversion figure for this site is therefore UNKNOWN, and this session invents none.** Conversion rate: UNKNOWN. Enquiry volume: UNKNOWN. Traffic: UNKNOWN. Source mix: UNKNOWN.

| Requirement | Detail |
|---|---|
| **Install before or at launch** | Analytics with the event taxonomy · first-touch attribution persistence · server-side conversion events · CRM linkage · consent mechanism |
| **Verify before launch** | Search Console property verified, and whatever historical impression/query data exists exported. **Note: this gives a *search* baseline, not a *conversion* baseline** |
| **Post-launch baseline period** | A defined period after launch during which the site is measured but **no conversion-rate target is asserted**. Its output is the first honest baseline this business has ever had |
| **Honesty requirement** | **A pre/post conversion comparison is impossible and must not be presented.** Any future claim of improvement must be measured from the post-launch baseline forward. Presenting a fabricated "before" would violate Project Rule 15 and `DEC-007` |

---

## 11. Success metrics

### Business metric
**Qualified enquiries** — the count of Website-Qualified Enquiries, reported alongside Unqualified, Spam and Review Required so the composition is always visible, **and broken down by `attribution_status` (complete / partial / unavailable) so measurement gaps are legible rather than absorbed into the count.**

### Supporting conversion metrics
Visitor → enquiry rate · enquiry → website-qualified rate · qualified enquiries by acquisition source · qualified enquiries by page type · commercial-page conversion rate · form start → completion rate · booking start → completion rate · spam rate · **attribution completeness rate**.

**Reporting rule:** any rate computed *by source* has `attribution_status = unavailable` enquiries as an explicit, visible bucket — **never dropped from the denominator**, which would silently overstate the measurable channels.

### Diagnostic metrics
CTA engagement by role and location · proof engagement · pricing engagement · form validation errors by field · form abandonment point · read depth on problem and research pages.

### Downstream, human-set
Website-qualified → sales-qualified rate · sales-qualified → opportunity rate · **revenue where the client supplies reliable data — measured and reported, never promised.**

### No benchmark targets are set
**Deliberately.** MappedSkills has no historical data, and no industry conversion benchmark was gathered in this programme. Inventing a target would violate `SOURCE_AND_EVIDENCE_POLICY.md`. **Targets are set after the first baseline period, from MappedSkills' own numbers.**

### Explicitly not optimised for
Raw lead volume · submissions regardless of quality · meeting count regardless of qualification · CTA clicks as conversions · phone clicks as enquiries · time on site · pages per session · arbitrary bounce-rate targets · fake urgency · dark patterns · large forms for sales convenience.

---

## 12. Open decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **Who owns enquiry response, and the working hours published** | Owner. An operating commitment, not architecture |
| 2 | **Retention periods per record type** | **Legal review required** |
| 3 | **Consent mechanism and vendor** | Technical + legal phase |
| 4 | **Length of the post-launch baseline period** | Orchestrator |
| 5 | **Whether an acknowledgement email needs a transactional email provider**, and which | Technical phase. **The site currently has no email-sending capability of any kind** |
