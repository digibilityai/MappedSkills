# CTA System

**Session:** 08 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**No final CTA copy is written here.** CTAs are defined by **role and behaviour**. Wording belongs to the messaging phase.
**Builds on:** `FUNNEL_ARCHITECTURE.md` §5, which established the six roles. This document adds behaviour, placement rules and measurement.

---

## 1. The six CTA roles

| Role | Function | Conversion surface | Commitment |
|---|---|---|---|
| **PRIMARY** | Create a qualified enquiry — **by form or by meeting booking** | Both | High |
| **DIAGNOSTIC** | Find out where demand is being lost. A framing of the primary conversion for problem-aware visitors not yet vendor-selecting | Both | Medium |
| **PROOF** | See the method, the research, or (later) results | None — navigational | Low |
| **RESEARCH** | Open a specific research entry, or subscribe to new ones | Subscription is a secondary conversion | Low |
| **CONTEXTUAL** | An in-content link to the relevant commercial, problem or proof page | None — navigational | Very low |
| **LOW-COMMITMENT** | Read the relevant guide, benchmark or problem page | None | Very low |
| **DIRECT** | Call or WhatsApp | Intent event only — **never a qualified enquiry** (§5) | High |

---

## 2. Governing rules

1. **One primary conversion *outcome* per page.** A page may expose both the form and the booking surface — two doors to one goal are not competing goals. It must not present a second, competing goal.
2. **PROOF and RESEARCH CTAs are offers, never gates.** No page may interpose `/how-it-works` or `/research` between itself and the conversion. Carried from the Session 07 correction pass, and it is the rule most likely to be quietly violated during design.
3. **CTA role matches funnel stage.** A PRIMARY CTA at the top of a top-of-funnel article converts nobody and costs the read.
4. **No CTA promises an outcome.** No guaranteed enquiries, rankings, AI citations, revenue or ROI (`DEC-007`, `BUSINESS_STRATEGY.md` §5).
5. **No CTA depends on proof that does not exist.** No "see our case studies" until a permissioned case study exists — `/work` is `noindex` and out of navigation until then.
6. **DIRECT contact is always reachable**, not a fallback.
7. **Every CTA emits an event carrying its role and location** (`EVENT_TAXONOMY.md` §3). A CTA that cannot be attributed to a location cannot be improved.
8. **No dark patterns.** No fake scarcity, countdowns, false social proof, manufactured urgency, exit-intent interstitials, or confirmshaming on a decline. `FUNNEL_ARCHITECTURE.md` §8 and Project Rule 15.

---

## 3. Placement and repetition

| Placement | Rule |
|---|---|
| **Header** | One persistent PRIMARY control sitewide. Mechanism-independent — which surface it leads to is a design decision |
| **Above the fold** | PRIMARY on commercial, vertical and pricing pages. **Not** on editorial or research pages |
| **Mid-content** | CONTEXTUAL on long pages, placed where the relevant point is made — not at a fixed interval |
| **End of content** | The natural home for PRIMARY on problem pages and for LOW-COMMITMENT on articles |
| **Sticky / repeated** | **Permitted on commercial, vertical and pricing pages.** **Not permitted on research, methodology or editorial pages** — a persistent sales prompt on a page whose job is credibility works against that job. Must never obscure content or the submit control, especially with a mobile keyboard open |
| **Footer** | Navigational only |
| **Interstitial / modal / exit-intent** | **Prohibited** |

---

## 4. Where NOT to push conversion

Stated explicitly because the proof deficit makes over-asking tempting.

| Context | Why restraint is correct |
|---|---|
| `/research` entries | These pages exist to be credible and citable. A hard sell on a page publishing a **measured zero** as evidence of honesty is self-defeating |
| `/how-it-works` | An evaluation surface. Its PROOF role is primary; PRIMARY is secondary and placed at the end |
| Top of any article | The visitor arrived for an answer. Interrupting before delivering it costs the read and the trust |
| `/thank-you` | The conversion has happened. Next-best content only — no second ask |
| Legal pages and 404 | Recovery navigation only |

---

## 5. Phone, email and manually received enquiries

**A phone click is not a qualified enquiry.** It is a **conversion-intent event** — evidence someone intended to make contact, not evidence contact occurred. The same applies to an email click. Conflating the two would inflate the business metric with unverified intent, which is precisely the failure mode the frozen strategy's measurement-honesty position exists to avoid.

| Signal | Event | Counts as a qualified enquiry? |
|---|---|---|
| `tel:` link clicked | `phone_clicked` | **No** — intent only |
| `mailto:` clicked | `email_clicked` | **No** — intent only |
| A call actually answered, or an email actually received | Manually entered into the CRM by a human | **Yes, if it meets the WQE criteria on human assessment** — recorded with `conversion_surface = manual` |

**Attribution limitation, stated rather than papered over.** A manually received enquiry usually arrives with **no first-touch attribution at all**. It is recorded with source `unknown` and must never be silently assigned to a channel. `ATTRIBUTION_MODEL.md` §7 carries this as a named limitation.

**Call tracking — requirement, not vendor.** If phone becomes a material enquiry channel, a call-tracking capability would materially improve attribution: dynamic number insertion keyed to the acquisition session, call-outcome capture, and a CRM write carrying the originating attribution. **Not recommended for launch** — it costs money and complexity to solve a problem whose size is currently **UNKNOWN**. Revisit once the first baseline period shows what proportion of enquiries arrive by phone.

---

## 6. CTA measurement

Every CTA emits `primary_cta_clicked` (or its role-specific equivalent) with `cta_role`, `cta_location`, `page_type` and `conversion_surface` where applicable.

**A CTA click is a diagnostic metric, never a business conversion** (`FUNNEL_ARCHITECTURE.md` §8, and §31 of the Session 08 brief). Reporting CTA clicks as conversions is the most common way a funnel report becomes flattering and useless.

---

## 7. Open decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **Whether the header CTA leads to the form surface or the booking surface** | Design phase |
| 2 | **Whether commercial pages carry an inline form or route to `/contact`** with context preserved | Design phase |
| 3 | **Final CTA wording for every role** | Messaging phase. **The entry-model decision (free/paid/hybrid) changes the PRIMARY and DIAGNOSTIC wording but not this structure** |
