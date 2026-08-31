# Qualified Enquiry — Operational Definition

**Session:** 08 — CRO & Qualified-Enquiry Funnel Specification
**Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 6 is not passed by this document.
**Governed by:** `docs/01-business/BUSINESS_STRATEGY.md` (frozen), `docs/01-business/ICP.md` (frozen), `docs/07-cro/FUNNEL_ARCHITECTURE.md`.

The frozen business outcome is **measurable qualified enquiries**. This document turns that phrase into something a system can evaluate and a person can audit. Without it, "qualified" is marketing language and the outcome is unmeasurable.

---

## 1. The distinction that governs everything

**The website cannot determine whether a prospect is a good client. It can determine whether an enquiry is real, reachable and in-context.** Those are different jobs and conflating them produces either a dishonest metric or a form nobody completes.

| | **Website-Qualified Enquiry (WQE)** | **Sales-Qualified Enquiry (SQE)** |
|---|---|---|
| **Set by** | The system, at submission, automatically | A human, after contact |
| **Evaluates** | Is this a real, reachable, in-context business enquiry? | Does this prospect meet the `ICP.md` §2 conditions? |
| **Evidence** | Machine-checkable facts | Conversation, judgement, and data the prospect supplies |
| **Is it the website's conversion?** | **Yes. This is the primary conversion and the business metric the site is accountable for** | No. It is a downstream lifecycle stage |
| **Can it be gamed by asking more questions?** | No — the criteria are verifiable | Yes, which is why the form does not attempt it |

**The uncomfortable and important consequence, stated plainly.** `ICP.md` §2 names **value per opportunity** as "the single most important qualifier". **The website cannot verify it.** A self-reported budget or deal-size dropdown is an unverified claim that adds friction and produces a number no one should trust. It is therefore **excluded from the WQE definition** and handled in the sales conversation. Any future report that implies the website qualified on economics would be false.

---

## 2. Website-Qualified Enquiry — the operational definition

An enquiry is **Website-Qualified** when **all five** conditions hold at the moment of server-side processing, **and no hard disqualifier (§4) applies.** Each is machine-evaluable; none depends on interpretation.

| # | Condition | How it is evaluated | Why it is in the definition |
|---|---|---|---|
| **1** | **Passes abuse screening** | Honeypot empty · submission-timing plausible · rate limits not exceeded · message passes link/abuse heuristics (`FORM_AND_BOOKING_SPEC.md` §8) | Spam that counts as a conversion destroys the metric |
| **2** | **Reachable identity** | A name is present, and an email that is **syntactically valid** and **not on the known-disposable list**. Domain/MX verification is **advisory and fails open** — see §2A | An enquiry MappedSkills cannot reply to is not an enquiry |
| **3** | **Business context present** | **At least one** of: a company name, a website URL, or a non-free-mail email domain | See §3 — deliberately permissive |
| **4** | **Stated need present** | A message of at least a minimum meaningful length, **or** an explicit service/problem selection | Distinguishes an enquiry from a blank ping |
| **5** | **Not a duplicate** | No existing open enquiry from the same email within the deduplication window | Prevents one buyer inflating the count |

**Both conversion surfaces are evaluated against the same five conditions.** A meeting booking meeting all five is a Website-Qualified Enquiry.

### 2A. Qualification and attribution are independent dimensions

> **Attribution completeness is NOT a qualification condition.** A commercially legitimate enquiry is qualified whether or not the measurement system succeeded in capturing where it came from.

Every enquiry therefore carries **two independent statuses**:

| Dimension | Values | What it answers |
|---|---|---|
| **`qualification_status`** | `qualified` · `unqualified` · `spam` · `review_required` | Is this a real, reachable, in-context business enquiry? |
| **`attribution_status`** | `complete` · `partial` · `unavailable` | How much do we know about where it came from? |

| `attribution_status` | Meaning |
|---|---|
| **`complete`** | First-touch and conversion-touch context both present |
| **`partial`** | Some context present — e.g. conversion page known, first-touch expired or missing; source derived from referrer rather than declared |
| **`unavailable`** | No usable acquisition context — direct entry, no referrer, consent declined, storage unavailable, or a manually received enquiry |

**None of the following may ever reduce `qualification_status`:** direct traffic · a missing referrer · privacy or tracking restrictions · blocked or unavailable analytics · unavailable campaign information · attribution-storage failure · a booking tool that cannot carry custom fields.

**Why this separation is correct, not a relaxation.** The business outcome is *measurable qualified enquiries*, and it is tempting to read "measurable" as a gate on "qualified". It is not. **A real buyer who arrives by typing the domain into a browser is exactly as commercially valuable as one who arrives on a tagged campaign link** — and a large share of the demand this strategy depends on (direct, dark social, word of mouth, and the directory listings that appeared in 15 of 28 unbranded AI runs) arrives with weak or absent attribution by nature. Downgrading those enquiries would understate the business, misdirect channel decisions, and let a measurement failure masquerade as a demand failure.

**Measurement incompleteness is made visible, not hidden.** Every report of qualified enquiries is broken down by `attribution_status`, so a rising `unavailable` share is legible as **a measurement problem to fix** — never as a quality problem, and never silently absorbed by moving enquiries out of the qualified count.

**The system still preserves as much first-touch and conversion-touch context as is reliably available** (`ATTRIBUTION_MODEL.md`). Nothing about this correction reduces what is captured; it changes only what a capture failure is allowed to do to the enquiry.

---

## 2B. Email validation — five outcomes, failing open

**No additional visitor-facing field is introduced.** This is entirely server-side handling of the email already collected.

| Outcome | Detection | Result |
|---|---|---|
| **Syntactically invalid** | Format check | **Fails condition 2 → `unqualified`.** Deterministic and safe |
| **Known disposable / temporary domain** | Maintained domain list | **→ `review_required`**, not automatic rejection. A disposable domain is a real spam signal *and* is occasionally used by legitimate people. A human decides |
| **Valid-looking** | Passes format, not on the disposable list | **Passes condition 2** |
| **Verification unavailable** | DNS/MX lookup or a validation API times out, errors, or is rate-limited | **Passes condition 2 — fail open.** Flagged advisory on the record so the gap is visible. **Infrastructure trouble must never cost a legitimate enquiry** |
| **Suspicious, where justified** | A verification service returns a specific negative signal — e.g. a confirmed non-existent mailbox — with sufficient confidence | **→ `review_required`.** Never automatic rejection on a probabilistic third-party verdict |

**Rules:**
- **Domain/MX verification is advisory, never a hard gate.** If used at all, it should run **asynchronously** so it cannot block or delay submission.
- **A temporary DNS, network or API failure must never cause an enquiry to be rejected, downgraded or lost.** The enquiry is persisted first regardless (`POST_SUBMISSION_AND_FOLLOWUP.md` §0).
- **`review_required` is the safe landing state** for every uncertain case. It protects a legitimate enquiry from an automatic decision the system is not entitled to make.

---

## 3. Why condition 3 is deliberately permissive

Requiring a corporate email domain is the conventional B2B qualification rule. **It is wrong for this ICP.**

`ICP.md` identifies owner-led considered-purchase businesses, with Indian industrial/manufacturing B2B as the candidate beachhead, and names the **founder/owner** as a primary buyer role — frequently the same person as the commercial lead. In this segment a Gmail address on a real ₹-crore business is ordinary. A rule that auto-rejects free-mail would disqualify the target buyer and flatter the quality metric by discarding real demand.

**Condition 3 therefore accepts any one of three independent signals of business context** and treats free-mail as a **soft signal for review**, never a disqualifier (§5).

---

## 4. Hard disqualifiers

An enquiry meeting these is **Unqualified**. It is **stored, notified and reviewable** — never silently discarded — but it does not count toward the business metric.

| Disqualifier | Detection | Why this one |
|---|---|---|
| **Job or internship application** | Explicit role-seeking language; CV/résumé attachment intent | **Directly evidenced.** Session 03 found MappedSkills' own target vocabulary is heavily career-contaminated — `seo consultant` returns salary and jobs first; `generative engine optimization` returns jobs and certification ahead of *agency*; `lead automation` is entirely automation-engineering roles. Ranking for the approved query families **will** attract job-seekers |
| **Course, training or certification enquiry** | Explicit learning intent | Same evidence base: course and certification intent outranks agency intent across the AI-search category terms |
| **Vendor, agency or partnership outreach** | Inbound sales pitch, backlink/guest-post solicitation, tooling pitch | High-volume category noise for any agency site |
| **Student or academic request** | Dissertation, project, interview requests | Same contaminated vocabulary |
| **Explicitly out of scope** | Requests for services the frozen strategy excludes — CRM implementation, RevOps, lifecycle consulting, standalone web development, ecommerce merchandising | `SERVICE_ARCHITECTURE.md` §9 |

**Note:** a disqualifier is about the *nature of the request*, never about the size or perceived attractiveness of the business. Small, unglamorous and unfamiliar prospects are not disqualified — that judgement belongs to sales, against `ICP.md`.

---

## 5. Soft signals — recorded, never decisive

These accompany the record to help the human who reads it. **None changes the WQE status on its own** and none is combined into a score (§6).

| Signal | Source | What it suggests |
|---|---|---|
| Free-mail address on a named company | Field data | Owner-led business — **common and expected in this ICP** |
| A website URL was supplied | Field data | An acquisition presence exists to work on (`ICP.md` §2 condition 4) |
| Landing page was a commercial or vertical page | Automatic | Higher purchase intent than an editorial entry |
| Landing page was an article or research entry | Automatic | Earlier-stage; longer cycle expected |
| Entry via a directory or referral | Automatic | Arrived through the listings programme |
| Phone number supplied when optional | Field data | Willingness to talk — meaningful in this market |
| Message references a specific commercial symptom | Human read | Problem-aware |
| Message is generic or templated | Human read | Possible low intent |
| Pricing page viewed before enquiring | Automatic | Price-stage |
| Booking chosen over form | Automatic | Prefers a conversation; often the industrial segment |

---

## 6. Why there is no scoring model

**A weighted lead score is explicitly rejected at this stage.**

MappedSkills has **zero historical enquiries to calibrate against** — the production form has never transmitted anything, and no analytics has ever run. Any weights would be invented. `SOURCE_AND_EVIDENCE_POLICY.md` forbids manufacturing a proxy figure when the underlying data does not exist, and Project Rule 15 forbids fake precision presented as measurement.

**Revisit only when** at least a few dozen enquiries have been through the full lifecycle to Won/Lost, so weights can be derived from outcomes rather than assumed. Until then: **hard disqualifiers + soft signals + human review**, which is simpler, honest, and adequate at expected volume.

---

## 7. The four enquiry states

| State | Meaning | Set by | Counts as the business conversion? | Notified? |
|---|---|---|---|---|
| **Qualified** (WQE) | All five conditions met, no disqualifier | System, automatically | **Yes — at any `attribution_status`** | Yes |
| **Unqualified** | A hard disqualifier applies, or a condition definitively fails (e.g. undeliverable email) | System, automatically | No | Low-priority digest |
| **Spam** | Failed abuse screening with confidence | System, automatically | No | No individual notification; quarantined under a retention policy (§7A) |
| **Review Required** | Cannot be determined automatically — a condition is ambiguous, a disposable domain was used, or a verification service returned a specific negative signal (§2B). **Never set because attribution was missing, and never because a check failed to run** | System, automatically | **No — not until a human resolves it** | Yes |

**Rules that keep the states honest:**
1. **No legitimate enquiry is ever deleted.** Confident spam is quarantined and disposed of under a defined retention policy (§7A).
2. **A human may override any system state**, with the override and its reason recorded. Overrides are reviewed periodically — a pattern of them means the definition needs changing, not that the reviewer should keep correcting it.
3. **Review Required does not count** toward the business metric while unresolved. Counting an unresolved record would inflate the number the whole strategy rests on.
4. **Reporting always shows all four states**, never Qualified alone. The proportions are themselves a health signal.
5. **Reporting also breaks Qualified down by `attribution_status`**, so measurement gaps stay visible instead of being absorbed into the qualification count.

---


## 7A. Spam handling and retention

**Confident spam is quarantined under a controlled retention policy — not kept permanently, and not destroyed on sight.**

| Rule | Specification |
|---|---|
| **Never a business conversion** | No conversion event fires at all (`EVENT_TAXONOMY.md` §6). Enforced at source, not in reporting |
| **Never a normal CRM lead** | No lead, contact or opportunity record is created in the CRM, and no owner is assigned |
| **Never a normal sales notification** | Excluded from the enquiry notification path. Aggregate spam-rate reporting only |
| **Quarantined, not filed** | Held in a separate quarantine store with enough detail for abuse monitoring, false-positive review and debugging — which layer triggered, when, and the minimum content needed to judge it |
| **Retention-bound** | Held for a defined period, then **deleted or anonymised** under that policy. **Retention duration is a privacy and security implementation decision requiring appropriate review** and is not set here |
| **Reviewable** | Sampled periodically for false positives. **A legitimate enquiry found in quarantine is restored, and the detection layer is adjusted** |
| **Opaque to the submitter** | Same success state as any other submission. Detection logic is never revealed — telling a bot how it was caught teaches it to adapt |

**Uncertain is not spam.** A submission that is suspicious but not confidently spam goes to **Review Required**, not quarantine. **The cost of wrongly quarantining a real buyer is far higher than the cost of a human glancing at a borderline record.**

---

## 8. Sales-Qualified Enquiry

Set by a human after contact, assessed against the seven `ICP.md` §2 conditions: considered purchase · meaningful value per opportunity · identifiable existing demand · a digital acquisition presence · ability to handle enquiries · **willingness to grant measurement access (non-negotiable)** · commercial maturity.

**This is a sales judgement, not a website metric.** It appears in the lifecycle (`ENQUIRY_LIFECYCLE.md`) so the chain from enquiry to opportunity to revenue can be traced, which the frozen strategy requires. **The website is never reported as having produced Sales-Qualified Enquiries.**

---

## 9. What this definition deliberately does not do

- **It does not verify opportunity economics, authority or timeframe.** All three are self-reported and unverifiable at submission; asking for them adds friction and produces numbers that cannot be trusted.
- **It does not screen by geography.** India-first is a go-to-market decision, not a filter. An international enquiry passing all five conditions is Qualified and is a sales judgement thereafter.
- **It does not screen by industry.** Manufacturing is a **candidate** beachhead, not an approved specialisation. A non-industrial enquiry is not lower quality.
- **It does not promise precision it lacks.** Email deliverability, duplicate detection and abuse screening are all probabilistic.
- **It does not let measurement failure masquerade as a quality judgement.** Where an *identity* check returns a specific negative signal, the state is **Review Required**. Where a check simply **cannot run** — infrastructure unavailable — the enquiry **passes and is flagged** (§2B). Where *attribution* is missing, `qualification_status` is untouched and only `attribution_status` records the gap (§2A).

---

## 10. Open decisions

| # | Decision | Why it is not settled here |
|---|---|---|
| 1 | **Minimum message length, and the deduplication window** | Both are calibration parameters. Setting them without a single real submission to test against would be invented precision. Propose provisional values at implementation and review after the first baseline period |
| 2 | **Whether domain/MX verification is used at all, and which service** | Advisory only, asynchronous preferred, **fails open** (§2B). A check that cannot run must never cost an enquiry. Technical-phase decision |
| 3 | **Who performs human review, and on what cadence** | An operating commitment, not an architecture decision. **Owner** |
| 4 | **Whether the diagnostic entry (free/paid/hybrid) creates a distinct state** | Blocked on the unresolved entry-model decision (`OFFER_ARCHITECTURE.md` §2). The definition is written to work under all three — see `FUNNEL_ARCHITECTURE.md` §1 |
