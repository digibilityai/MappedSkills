# Enquiry Lifecycle

**Session:** 08 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**

**Deliberately minimal.** `BUSINESS_STRATEGY.md` §7 rejects MappedSkills becoming a RevOps consultancy, and `SERVICE_ARCHITECTURE.md` §8 excludes lifecycle architecture from scope — **including for MappedSkills itself**. A lifecycle that is more elaborate than the business needs would be a demonstration of the positioning the strategy rejects.

---

## 1. The stages

```
                        ┌──► Spam            (system, terminal)
                        │
New Enquiry ────────────┼──► Unqualified     (system or human, terminal-ish)
   (system)             │
                        ├──► Review Required ──► (resolves into one of the others)
                        │
                        └──► Website Qualified ──► Sales Qualified ──► Opportunity ──► Won
                              ★ THE BUSINESS            (human)          (human)      (human)
                                METRIC                                       └──────► Lost
                                (system)
```

**Seven states. No sub-stages, no branching workflows, no scoring gates.**

---

## 2. Stage definitions

| Stage | Meaning | Set by | Minimum information required | Automatic? |
|---|---|---|---|---|
| **New Enquiry** | Received and persisted. Exists for the instant before evaluation, and as the resting state if evaluation cannot run | **System** | A persisted record | **Yes** |
| **Spam** | Failed abuse screening **with confidence** | **System** | Which spam layer triggered | **Yes.** **Quarantined under a defined retention policy then deleted or anonymised; no CRM lead, no notification, no conversion event** (`QUALIFIED_ENQUIRY_DEFINITION.md` §7A). Uncertain cases go to Review Required instead |
| **Unqualified** | A hard disqualifier applies, or a WQE condition definitively fails | **System**, or human override | The disqualifier category | **Yes.** Notified in a low-priority digest |
| **Review Required** | Cannot be determined automatically — an ambiguous condition, a disposable domain, or a specific negative identity signal. **Never set because attribution was missing, and never because a verification service was unreachable** | **System** | The reason it could not be resolved | **Yes.** Notified. **Does not count while unresolved** |
| **Website Qualified** | All five WQE conditions met, no disqualifier | **System** | The full WQE record | **Yes — ★ this is the business conversion, at any `attribution_status`** |
| **Sales Qualified** | A human judges the prospect against the seven `ICP.md` §2 conditions after contact | **Human** | Contact made, and a judgement recorded | **No — never automatic** |
| **Opportunity** | A real, scoped commercial conversation with a defined potential engagement | **Human** | Scope and an indicative value | **No** |
| **Won / Lost** | Outcome | **Human** | `lost_reason` on Lost | **No** |

---

## 3. What is automatic and what is human

| Automatic — system, at submission | Human judgement |
|---|---|
| New Enquiry · Spam · Unqualified · Review Required · **Website Qualified** | Sales Qualified · Opportunity · Won / Lost · **any override of a system state** |
| Owner assignment | Resolving Review Required |
| Attribution capture, and setting `attribution_status` | `lost_reason` |
| Notification and CRM delivery | Whether the prospect meets the ICP |

**The line is drawn where verification stops.** The system decides what it can verify — reachability, business context, stated need, non-duplication. **It never guesses at fit, economics, authority or intent — and it never treats a measurement gap as a quality judgement.** Those need a conversation, and pretending otherwise would produce exactly the fake precision `QUALIFIED_ENQUIRY_DEFINITION.md` §6 rejects.

---

## 4. Transition rules

1. **Every state change is timestamped and attributed** to the system or a named person.
2. **A human may override any system state**, with a recorded reason. **A pattern of overrides means the definition needs revising — not that the reviewer should keep correcting it.** Overrides are reviewed periodically for exactly this reason.
3. **Review Required is worked to zero on a defined cadence.** An unresolved backlog silently suppresses the business metric.
4. **Unqualified is not permanent.** A job applicant who returns two years later as a buyer is a new enquiry.
5. **A cancelled or no-show meeting does not reverse Website Qualified.** The enquiry was real; attendance is a separate outcome.
6. **Won/Lost does not close the record** — it is the input to the revenue chain the frozen strategy requires.

---

## 5. What is deliberately absent

| Not built | Why |
|---|---|
| **Marketing Qualified Lead (MQL)** | It would sit between Website Qualified and Sales Qualified and add a stage nobody would use at this volume. **Website Qualified already does its job, and does it verifiably** |
| **Lead scoring / grading** | No data to calibrate. `QUALIFIED_ENQUIRY_DEFINITION.md` §6 |
| **Nurture and re-engagement stages** | Nurture is not built at launch (`FOLLOWUP_ARCHITECTURE.md` §5) |
| **Sub-stages within Opportunity** | A sales-process design decision, not a website architecture decision |
| **Automated stage progression past Website Qualified** | Every stage beyond it requires human judgement. Automating it would manufacture pipeline |
| **Separate lifecycles per service or vertical** | One lifecycle. Service and vertical are **fields on the record**, not separate funnels |

---

## 6. Reporting rule

**Every lifecycle report shows all four submission states — Qualified, Unqualified, Spam, Review Required — never Qualified alone, and breaks Qualified down by `attribution_status` (complete / partial / unavailable).**

The composition is itself a health signal: a rising Unqualified rate on editorial traffic is expected and acceptable (the target query families are career- and course-contaminated); a rising Unqualified rate on **commercial** traffic is a problem worth investigating.

**Conversion rates between stages are reported as counts with their denominator**, never as a rate alone. At launch volume, "one in three" is not a rate — it is three enquiries.

---

## 7. Open decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **Who resolves Review Required, and on what cadence** | Owner — an operating commitment |
| 2 | **The controlled `lost_reason` list** | Owner + sales |
| 3 | **Whether Opportunity carries an indicative value from the start** | Owner. Needed for the revenue chain, but **must not become a guess recorded as data** |
| 4 | **How long Unqualified records are retained, and the quarantine retention period for confident spam** | **Privacy and security review required.** Spam quarantine is retention-bound and ends in deletion or anonymisation — the duration is not set here |
