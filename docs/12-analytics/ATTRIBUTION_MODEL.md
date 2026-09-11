# Attribution Model

**Session:** 08 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `BUSINESS_STRATEGY.md` §5–6 (frozen), which makes measurement a mandatory foundation and requires connecting, *where technically and operationally possible*: discovery/source → landing experience → interaction → enquiry → qualified enquiry → opportunity → client-supplied revenue.

The phrase **"where technically and operationally possible"** is load-bearing. This document specifies what is achievable and states plainly what is not.

---

## 1. What this model must do

1. Record `attribution_status` (`complete` / `partial` / `unavailable`) on every enquiry. **Attribution is NOT a qualification condition** — a legitimate enquiry is qualified whether or not attribution succeeded (`QUALIFIED_ENQUIRY_DEFINITION.md` §2A). This model's job is to capture as much as is reliably available and to **make what is missing visible**, never to gate the conversion.
2. Let a qualified enquiry be traced back to the acquisition that produced it.
3. Carry enough context into the CRM that the chain can later reach opportunity and revenue.
4. **State its own limits**, because measurement honesty is a differentiator MappedSkills intends to sell, and a model that overclaims would contradict the position.

---

## 2. Model choice

**First-touch and conversion-touch, both stored. No weighted multi-touch model.**

| Why not multi-touch | |
|---|---|
| **No data to calibrate it** | MappedSkills has zero historical conversions. Any weighting would be invented — `SOURCE_AND_EVIDENCE_POLICY.md` forbids manufacturing a proxy |
| **Volume will not support it** | At expected enquiry volume, fractional credit across touchpoints produces noise presented as insight |
| **It would contradict the positioning** | A model that assigns 0.3 of an enquiry to a channel implies a precision that cannot be defended to a client |

**Storing both ends is the honest maximum.** First-touch answers "what brought them into the orbit"; conversion-touch answers "what they were doing when they enquired". Everything between is recorded as session context, not as credit.

---

## 3. The two touch records

### 3.1 First-touch — written once, never overwritten

| Field | Source |
|---|---|
| `first_landing_page` | Path of the first page of the first session |
| `first_referrer` | `document.referrer`, external only |
| `first_source`, `first_medium`, `first_campaign`, `first_content`, `first_term` | UTMs, or derived from referrer when absent (§6) |
| `first_touch_timestamp` | ISO 8601 with timezone |
| `first_device_class` | mobile / tablet / desktop |

### 3.2 Conversion-touch — written at submission

| Field | Source |
|---|---|
| `conversion_page` | Path where the enquiry was created |
| `conversion_surface` | `form` / `booking` / `manual` |
| `latest_source`, `latest_medium`, `latest_campaign` | Most recent external acquisition session |
| `latest_referrer` | Most recent external referrer |
| `conversion_timestamp` | ISO 8601 with timezone |
| `page_type`, `service`, `problem`, `content_cluster` | Page metadata at conversion |
| `cta_location`, `cta_role` | The control that initiated the conversion |
| `session_page_count`, `pricing_viewed`, `proof_viewed` | Session context — soft signals, not credit |

---


### 3.3 `attribution_status` — the completeness flag

Derived at submission from what was actually captured, and stored on the enquiry record.

| Value | Set when |
|---|---|
| **`complete`** | First-touch and conversion-touch context both present |
| **`partial`** | Some context present — conversion page known but first-touch missing or expired; source derived from referrer rather than declared; consent limited what could be stored |
| **`unavailable`** | No usable acquisition context — direct entry with no referrer, consent declined, storage unavailable, a booking tool that could not carry custom fields, or a manually received enquiry |

**`attribution_status` never affects `qualification_status`.** The two are independent dimensions (`QUALIFIED_ENQUIRY_DEFINITION.md` §2A). This flag exists so that measurement gaps are **reported**, not so that enquiries can be excluded.

**Reporting rule:** any figure broken down by source shows `unavailable` as an explicit bucket. **Dropping it from the denominator would silently overstate every measurable channel** — the most common way a channel report becomes flattering and wrong.

## 4. Persistence

| Aspect | Specification |
|---|---|
| **Storage** | First-party only. No third-party cookies, no cross-site identifiers, no data-broker enrichment |
| **First-touch lifetime** | Set on first external landing; persists across sessions for a defined window; **never overwritten while it exists** |
| **Latest-touch lifetime** | Updated **only** when a new *external* acquisition session begins |
| **Consent interaction** | Where analytics consent is declined, analytics identifiers are not written. **The enquiry proceeds and is qualified normally.** `attribution_status` becomes `partial` or `unavailable` — it never blocks, delays or downgrades the conversion |
| **Server-side capture** | The attribution payload is sent with the submission and **stored server-side on the enquiry record**. Client-side storage is the collection mechanism, never the system of record |

---

## 5. The internal-overwrite rule

> **Internal navigation must never overwrite acquisition attribution.**

This is the most commonly broken rule in practice and the one that silently destroys attribution quality.

| Rule | Specification |
|---|---|
| **Internal links must not carry UTM parameters.** Ever | A UTM on an internal link makes the site appear to be its own traffic source |
| **UTM values are accepted only when the referrer is external or absent** | The mechanism that enforces the rule above |
| **First-touch is write-once** | A later external session updates *latest*-touch only |
| **Self-referral exclusion** | The site's own hostnames, including `www` and any staging subdomain, are excluded as referrers. **Both matter here: `www.mappedskills.com` currently returns HTTP 200 rather than redirecting, and `testing.mappedskills.com` was observed being cited by Perplexity** |
| **Internal campaign tracking, if ever needed, uses a separate parameter namespace** | Never `utm_*` |

---

## 6. Handling missing UTMs

Most valuable traffic will arrive without UTMs — organic search, direct, and the directory listings the strategy depends on.

| Situation | Resolution |
|---|---|
| No UTM, external referrer present | Derive source/medium from the referrer; mark as **derived**, not declared |
| No UTM, no referrer | `source = direct`, `medium = none`. **Recorded honestly as ambiguous** — this bucket includes dark social, apps, email clients and privacy tooling |
| Search engine referrer | `medium = organic`, with the engine as source. **Query terms are not available and are not inferred** |
| Partial UTMs | Store what is present; do not synthesise the rest |
| Directory or listing referrer | `medium = referral` with the domain as source. **Given that directories appeared in 15 of 28 unbranded AI runs and gate the category SERPs, this bucket is strategically important and should be reported separately rather than lost inside "referral"** |

**Every derived value is flagged as derived.** A derived attribution and a declared one must never be indistinguishable in a report.

---

## 7. Stated limitations

**Published rather than hidden. `BUSINESS_STRATEGY.md` §5 requires MappedSkills to state plainly what cannot be attributed, and `/how-it-works` is where that statement lives publicly.**

1. **Attribution is not deterministic.** It reflects what a browser reported, in one session, on one device.
2. **Cross-device journeys break the chain.** Research on desktop, enquiry on mobile appears as two unrelated visitors. **Unmeasurable with first-party data alone.**
3. **Consent-declined sessions have no attribution.** The enquiry is still real.
4. **Dark social, email clients, apps and messaging referrals arrive as `direct`.** The `direct` bucket is a residual, not a channel.
5. **AI-assistant referrals are only partly identifiable.** Referrer strings vary and change. **AI *referrals* must be separated from AI *crawlers* in server logs — these are different things and conflating them would produce a badly wrong number.**
6. **Manually received enquiries (phone, email, referral) usually have no attribution at all.** Recorded as `unknown` and **never silently assigned to a channel.**
7. **Offline and word-of-mouth influence is invisible.** For a small firm relying on the owner's network, this may be a large share of real demand.
8. **Cookie lifetime limits the first-touch window.** Long consideration cycles — the norm for considered purchases — can exceed it.
9. **Revenue attribution depends entirely on client-supplied data.** `BUSINESS_STRATEGY.md` §5: revenue is reported, never promised.
10. **No historical baseline exists.** No analytics has ever run. Every pre-launch attribution figure is **UNKNOWN**.

---

## 8. UTM governance

**No campaign names are created here.**

| Rule | Specification |
|---|---|
| **Accepted parameters** | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`. **No custom `utm_*` inventions** |
| **Case** | **Lowercase always**, on write and on read. `Google` and `google` as separate sources is the most common avoidable reporting defect |
| **Separators** | Hyphens. No spaces, no underscores, no encoded characters |
| **`utm_source`** | The specific origin — the platform, publication or directory. Never a campaign |
| **`utm_medium`** | A **controlled vocabulary**, fixed before the first campaign: `cpc`, `paid_social`, `email`, `referral`, `organic`, `affiliate`, `display`. Extended only by deliberate decision |
| **`utm_campaign`** | A documented naming convention agreed before spend begins. **Retrofitting a convention across live campaigns loses data permanently** |
| **Required on paid** | **Every paid destination URL carries source, medium and campaign.** Paid media is a retained capability on the same measurement layer as everything else — untagged paid spend is unmeasurable and therefore unsellable under this strategy |
| **Never on internal links** | §5 |
| **Never carries PII** | No email addresses, names or identifiers in any UTM parameter — they land in URLs, logs and analytics |
| **Auto-tagging** | Where an ad platform auto-tags, do not double-tag. Decide one mechanism per platform and document it |

---

## 9. Chain to revenue

The frozen strategy's chain, with each link's realistic confidence stated:

| Link | Mechanism | Confidence |
|---|---|---|
| discovery/source → landing | First-touch capture | Good, with §7 limits |
| landing → interaction | Session context | Good |
| interaction → enquiry | Conversion-touch on the record | **Strong — this is the link MappedSkills is accountable for** |
| enquiry → qualified enquiry | WQE evaluation at submission | **Strong and automatic** |
| qualified enquiry → opportunity | Human, in the CRM | Moderate — depends on discipline |
| opportunity → customer/revenue | **Client-supplied data** | **Variable and outside MappedSkills' control** |

**The honest formulation, carried verbatim from the frozen strategy:** *we own the enquiry; we report through to revenue using your close data; we state plainly what cannot be attributed.*

---

## 10. Open decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **First-touch persistence window length** | Technical phase. Should reflect a considered-purchase cycle, not a default |
| 2 | **The `utm_medium` controlled vocabulary and campaign naming convention** — **fixed before the first paid campaign runs** | Owner + technical |
| 3 | **Whether server-log separation of AI crawlers from AI referrals is in launch scope** | Technical phase. Valuable but not launch-blocking |
| 4 | **Whether directory/listing referrals get their own reporting bucket** | Recommended, given the listings programme's strategic weight |
| 5 | **Consent mechanism**, which determines how much attribution survives | Technical + legal |
