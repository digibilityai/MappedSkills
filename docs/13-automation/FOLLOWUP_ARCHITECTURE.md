# Follow-Up Architecture

**Session:** 08 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**No email copy is written here.**

**Scope constraint, and it is a hard one.** `BUSINESS_STRATEGY.md` §10 confines automation to *enquiry routing, lead notifications, response-time workflows, email/WhatsApp follow-up, basic qualification and simple handoff automation*. `SERVICE_ARCHITECTURE.md` §8 excludes lifecycle architecture, RevOps and sequence programmes. **Everything below stays inside that boundary — for MappedSkills' own use as much as for clients.**

---

## 1. The five automated touches — and nothing else

| # | Touch | Trigger | Automated? | Purpose |
|---|---|---|---|---|
| 1 | **Acknowledgement** | Enquiry persisted | **Yes** | Confirms receipt, restates what was sent, sets timing expectations honestly |
| 2 | **Internal notification** | Enquiry persisted | **Yes** | Full record with attribution, to the assigned owner |
| 3 | **No-response follow-up** | No human response within the internal target | **Yes** | Escalation to the owner. **Internal, not to the prospect** |
| 4 | **Meeting reminder** | Before a booked meeting | **Yes** | Reduces no-shows |
| 5 | **No-show re-book offer** | Meeting marked no-show | **Yes, once** | One offer, then a human decision |

**That is the complete automated set at launch.**

---

## 2. Human follow-up

**The first real response to any enquiry is always a person.** No automated message may imply a human has read the enquiry.

| Aspect | Specification |
|---|---|
| Owner | Assigned at creation. **Every enquiry has exactly one** |
| First response | **Internal target: within one business day.** Not published as an SLA (§4) |
| Escalation | Untouched past the target escalates to the owner |
| Prospect-facing follow-up if no reply | **At most two touches, then stop.** A third is pursuit, not follow-up |
| After hours | The acknowledgement is automatic and honest about timing |

---

## 3. WhatsApp

Permitted within the approved scope, and worth noting as the one live Indian commercial automation signal Session 03 found. **But:**

- **Only to a phone number the prospect volunteered**, and only in a business context they initiated.
- **Never as a cold or automated outbound channel.**
- Consent and platform policy apply. **Flagged for legal review.**
- **Not a launch requirement.** It is an option the architecture permits, not something to build before there are enquiries to respond to.

---

## 4. Response-time targets

**Internal operating target and public promise are deliberately different.**

| | Internal | Public |
|---|---|---|
| Acknowledgement | Immediate, automatic | Stated |
| First human response | **Within one business day** | **Business hours and timezone only — no numeric SLA** |

**Why no public SLA yet.** MappedSkills sells enquiry effectiveness. **Publishing a response promise it has never measured, and might miss, would be a live demonstration of the failure it sells the fix for.** `BUSINESS_STRATEGY.md` §11 forbids unsupported claims becoming reasons-to-believe.

**Publish one only after the first baseline period produces a real distribution.** At that point it becomes a genuine proof asset — and one no competitor examined publishes.

---

## 5. What is NOT built

| Not built | Why |
|---|---|
| **Nurture sequences** | Would need content that does not exist, and drifts toward the lifecycle-marketing programme the strategy rejects |
| **Drip campaigns, behavioural triggers, re-engagement programmes** | Outside the approved automation scope |
| **Automated lead scoring** | No data to calibrate |
| **Newsletter automation beyond a simple research/insight subscription** | A subscription is a secondary conversion; a programme is not in scope |
| **Multi-branch workflows** | At launch volume this is complexity without benefit |
| **Automated proposal or quote generation** | Not an enquiry-stage capability |

**Nurture eligibility is *recorded*** — marketing consent given, and not disqualified — **so nurture remains possible later without re-architecture. It is not built.**

---

## 6. Failure handling

| Failure | Behaviour |
|---|---|
| Acknowledgement email fails | Logged, retried, alerted. **The enquiry still exists and the internal notification still goes out** |
| Internal notification fails | **Alert raised immediately — this is the failure most likely to lose a real enquiry silently** |
| Both fail | Escalate. The enquiry is in durable storage and appears in the review queue regardless |
| Reminder fails | Logged. Non-critical |
| Email provider unavailable | Queue and retry. **Never fails the visitor's submission** |

**Core principle, carried throughout:** a secondary integration failure must never cause a legitimate enquiry to disappear.

---

## 7. Open decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **Transactional email provider.** The site has **no email-sending capability of any kind** today | Technical phase |
| 2 | **Who is the default owner, and the published business hours** | Owner |
| 3 | **Whether WhatsApp follow-up is in launch scope** | Owner. Recommended **not** at launch |
| 4 | **Consent and platform policy for WhatsApp** | **Legal review required** |
