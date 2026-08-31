# CRM Data Contract

**Session:** 08 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** This becomes the implementation contract once a CRM is chosen.

**No CRM vendor is selected.** **VERIFIED FACT:** no CRM exists, no CRM is referenced anywhere in the codebase, and there is no lead routing, webhook, or attribution capture of any kind. Nothing forces a vendor choice, so none is made here.

**Scope boundary, carried from the frozen strategy.** `BUSINESS_STRATEGY.md` §10 and `SERVICE_ARCHITECTURE.md` §8 confine automation to a **limited downstream expansion capability** and exclude CRM implementation, platform migration, RevOps and lifecycle architecture — **including for MappedSkills itself.** This contract specifies **what the website must send**. It does not design a CRM.

**The boundary that keeps this coherent:** *enquiry-source capture is measurement and belongs to the core engagement; nurture and lifecycle work is automation and belongs to expansion.* Everything below is the first half.

---

## 1. Prerequisite

**There is no backend.** No `app/api/` directory, no route handler, no server action, no email-sending capability. **Every field below presumes a server endpoint that does not exist yet.** This contract is what that endpoint must produce — it is not a description of anything currently working.

---

## 2. Field categories

Legend — **R** required · **O** optional · **S** system-generated · **V** visitor-entered

### 2.1 Contact

| Field | R/O | Source | Note |
|---|---|---|---|
| `full_name` | **R** | V | |
| `email` | **R** | V | **Primary identity and deduplication key** |
| `email_domain_type` | S | S | `business` / `free_mail` / `disposable` — a soft signal, never a disqualifier (`QUALIFIED_ENQUIRY_DEFINITION.md` §3) |
| `phone` | O | V | Optional on the form, **required on the booking surface** |
| `role_title` | O | V/human | **Not asked at first contact**; captured in conversation |

### 2.2 Company

| Field | R/O | Source | Note |
|---|---|---|---|
| `company_name` | **R** | V | One of the three business-context signals |
| `company_website` | O | V | Highly useful — it is what would be diagnosed |
| `industry` | O | human | **Never a form dropdown** — that would imply a vertical commitment the strategy has not made |
| `country`, `region` | O | S/human | Derived where reliable. **Not a qualification filter** — India-first is go-to-market, not a gate |

### 2.3 Enquiry

| Field | R/O | Source | Note |
|---|---|---|---|
| `enquiry_id` | **R** | S | Opaque. **The only join key to analytics** |
| `message` | **R** | V | The enquiry itself. **Never sent to analytics** |
| `service_interest` | **R** | S | From page context, not asked |
| `problem_interest` | O | S | From page context |
| `conversion_surface` | **R** | S | `form` / `booking` / `manual` |
| `submitted_at` | **R** | S | ISO 8601 with timezone |
| `idempotency_key` | **R** | S | Prevents duplicate records on retry |

### 2.4 Qualification

| Field | R/O | Source | Note |
|---|---|---|---|
| `qualification_status` | **R** | S | `qualified` / `unqualified` / `review_required`. **Confident spam never reaches the CRM at all** (§2.10) |
| `wqe_conditions_met` | **R** | S | Which of the five passed — **makes the automatic decision auditable rather than a black box** |
| `email_validation_outcome` | **R** | S | `valid_looking` / `verification_unavailable` / `disposable` / `suspicious` / `invalid`. **Advisory. `verification_unavailable` never blocks qualification** (`QUALIFIED_ENQUIRY_DEFINITION.md` §2B) |
| `unqualified_reason` | O | S | Disqualifier category |
| `soft_signals` | O | S | The `QUALIFIED_ENQUIRY_DEFINITION.md` §5 list |
| `state_override_by`, `state_override_reason`, `state_override_at` | O | human | **Every human override is recorded.** A pattern of overrides means the definition needs changing |

### 2.5 Attribution

Per `ATTRIBUTION_MODEL.md` §3. **All system-generated; none is asked.**

| Field | R/O | Note |
|---|---|---|
| `first_landing_page`, `first_referrer`, `first_touch_timestamp` | **R** | Write-once |
| `first_source`, `first_medium`, `first_campaign`, `first_content`, `first_term` | **R** where available | Lowercase |
| `conversion_page`, `conversion_timestamp` | **R** | |
| `latest_source`, `latest_medium`, `latest_campaign`, `latest_referrer` | **R** where available | |
| `attribution_status` | **R** | `complete` / `partial` / `unavailable`. **Independent of `qualification_status` — it never affects it** (`QUALIFIED_ENQUIRY_DEFINITION.md` §2A) |
| `attribution_derived` | **R** | **Boolean — was source declared via UTM or inferred from referrer?** A derived value must never look like a declared one |
| `page_type`, `content_cluster`, `cta_location`, `cta_role` | O | |
| `session_page_count`, `pricing_viewed`, `proof_viewed` | O | Soft signals |
| `device_class` | O | |

**Where attribution is unavailable** — consent declined, storage failure, an untagged booking, or a manually received enquiry — fields are `unknown` and `attribution_status = unavailable`. **They are never inferred and never silently assigned to a channel, and the enquiry is qualified normally.**

### 2.6 Consent

| Field | R/O | Source | Note |
|---|---|---|---|
| `privacy_notice_version` | **R** | S | Which text was shown |
| `marketing_consent` | **R** | V | Boolean, **defaults false**. Separate and never bundled with submission |
| `marketing_consent_text`, `marketing_consent_at`, `marketing_consent_source` | O | S | Present only when consent is given — **so what was agreed to, and when, is reconstructable** |
| `analytics_consent_state` | O | S | Affects attribution completeness |

### 2.7 Lifecycle

| Field | R/O | Source | Note |
|---|---|---|---|
| `lifecycle_stage` | **R** | S then human | Per `ENQUIRY_LIFECYCLE.md` |
| `owner` | **R** | S | **Assigned at creation. An unowned enquiry is the failure mode this business sells the fix for** |
| `first_response_at` | O | S/human | Feeds the internal response-time target |
| `stage_changed_at`, `stage_changed_by` | O | S/human | |
| `lost_reason` | O | human | Controlled list |

### 2.8 Meeting

| Field | R/O | Source | Note |
|---|---|---|---|
| `meeting_scheduled_at`, `meeting_timezone` | O | S | |
| `meeting_status` | O | S | `booked` / `rescheduled` / `cancelled` / `attended` / `no_show` |
| `meeting_external_id` | O | S | Booking-system reference |
| `meeting_attribution_complete` | O | S | Boolean. **If false, the booking is still a qualified enquiry** — it is simply recorded with `attribution_status = unavailable`. The flag exists to make the booking tool's measurement gap visible, **not to disqualify the enquiry** |

### 2.9 Technical metadata

| Field | R/O | Source | Note |
|---|---|---|---|
| `user_agent_class`, `submission_ip_country` | O | S | Abuse review. **Country only, not a stored IP address** |
| `spam_checks_passed` | **R** | S | Which layers ran and their outcome |
| `attribution_capture_errors` | O | S | Why attribution was incomplete, where known. **Diagnostic only — it never changes qualification** |
| `integration_status` | **R** | S | Which downstream deliveries succeeded — **makes a partial-failure enquiry findable rather than invisible** |
| `source_system_version` | O | S | Which form/site version produced the record |


### 2.10 What is NOT sent to the CRM

| Excluded | Why |
|---|---|
| **Confident spam** | **No lead, contact, opportunity or activity record is created, and no owner is assigned.** Quarantined separately under a defined retention policy, then deleted or anonymised (`QUALIFIED_ENQUIRY_DEFINITION.md` §7A). It also triggers no sales notification |
| Detection logic and thresholds | Never exposed to a submitter, and not needed in the CRM |

**`review_required` records ARE sent** — they are potentially legitimate enquiries awaiting a human, and losing them in a quarantine queue is exactly the failure this architecture exists to prevent. They carry `qualification_status = review_required` and are excluded from the business metric until resolved.

---

## 3. Delivery requirements

| Requirement | Specification |
|---|---|
| **Persist first** | The enquiry is written to durable storage **before** any CRM call. The CRM is a downstream consumer, never the system of record |
| **Asynchronous** | CRM delivery never blocks the visitor's success response |
| **Retry** | Failed deliveries are queued and retried with backoff |
| **Idempotent** | `idempotency_key` prevents duplicates on retry |
| **Reconcilable** | A stored enquiry with no CRM record must be discoverable by query. **`integration_status` exists for exactly this** |
| **Never lossy** | **If the CRM is unavailable, the enquiry still exists, is still notified, and is still counted.** The core principle of `POST_SUBMISSION_AND_FOLLOWUP.md` §0 |

---

## 4. CRM selection requirements

**No vendor is chosen.** Any candidate must support:

1. Custom fields for the full attribution set — **the most common reason a lightweight CRM fails this contract**
2. API or webhook creation from a server
3. Idempotent create-or-update on the email key
4. A configurable lifecycle stage field
5. Owner assignment
6. Consent fields with timestamps
7. Meeting/activity records linked to the contact
8. Export of the full record set — **no lock-in on MappedSkills' own measurement data**
9. Reporting that can group qualified enquiries by first-touch source

**Explicitly not a requirement:** marketing automation suites, lead scoring engines, sequence builders, or anything requiring a platform partnership tier. `BUSINESS_STRATEGY.md` §7 rejects becoming a CRM or RevOps firm, and adopting a heavyweight platform for MappedSkills' own use would work against that.

**A spreadsheet plus a durable enquiry store would satisfy this contract at launch volume.** That is a legitimate starting point, not a compromise — and it avoids buying a platform before there is anything to put in it.

---

## 5. Open decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **CRM selection — or the deliberate decision to defer one** | Owner |
| 2 | **Where durable enquiry storage lives**, given a cPanel/Passenger host with no current backend | Technical phase |
| 3 | **Transactional email provider** for acknowledgement and notification | Technical phase |
| 4 | **Retention periods per field category** | **Legal review required** |
| 5 | **Whether `lost_reason` uses a controlled list from launch** | Recommended — free text becomes unanalysable |
