# Funnel & Conversion Architecture — PROPOSED

**Session:** 07 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 5 open (Gate 6 is a separate, later gate and is not approached here).
**Governed by:** `docs/01-business/BUSINESS_STRATEGY.md` and `OFFER_ARCHITECTURE.md` (both frozen).

**No CTA copy, button text, form copy or page design is written here.** CTAs are defined by **function**.

---

## 0. The precondition that governs this entire document

> **VERIFIED FACT (Session 01B, live): neither documented conversion path currently functions.**
> The production contact form has **no `action` and no `method`** and transmits nothing. The `/schedule-call` Calendly container renders **empty, with zero iframes**, and the pre-hydration HTML shows a "not configured yet" fallback. **No analytics of any kind runs in production** — `dataLayer`, `gtag` and `fbq` are all undefined.

Every conversion and micro-conversion below is **unmeasurable today**. The frozen strategy makes this a hard rule: nothing outcome-based may be sold, to a client or on MappedSkills' own site, before analytics and enquiry-source capture work.

**Consequence for this architecture:** the funnel is not a redesign deliverable. **It is a launch prerequisite.** A repositioned website with a form that transmits nothing would change the words on a site that still cannot receive an enquiry.

---

## 1. The offer-model constraint

The **free / paid / hybrid entry-offer decision is still open** (`OFFER_ARCHITECTURE.md` §2), and the Session 05 labels "Enquiry Diagnostic" and "Enquiry System" are **naming hypotheses, not approved names**.

**Architectural response: the funnel is model-agnostic.**

- There is **one primary conversion action** on every page. Its *label*, its *gating* (free, paid, or qualified-then-paid) and its *fulfilment* can all change without altering the funnel structure, the page inventory or the navigation.
- **No page, URL or navigation item encodes the entry model.** There is no `/free-audit` and no `/book-a-paid-diagnostic` URL.
- **No self-serve diagnostic tool ships at launch** — building one would price the analysis at zero and pre-empt an unresolved commercial decision with an architecture decision.

---

## 2. Conversion definitions

| Level | Definition | Where measured |
|---|---|---|
| **PRIMARY CONVERSION** | **Qualified enquiry creation** — a captured enquiry carrying sufficient source, context and qualification data to be measured. **Mechanism-independent** | Either conversion surface below |
| **Conversion surfaces** (both roll into the primary conversion) | **(a) Qualified contact/enquiry form submission** · **(b) Qualified meeting booking** | `/contact` → `/thank-you`; `/schedule-call` → confirmed booking |
| **Secondary conversions** | Direct phone or WhatsApp contact initiated · pricing enquiry · research/insight subscription | `tel:`/WhatsApp handlers, `/pricing`, `/research`, `/blog` |
| **Micro-conversions** | Read depth on problem, research and vertical pages · methodology page viewed · pricing viewed · FAQ expanded · research entry opened · article scroll completion · return visit | Event instrumentation across the site |
| **Qualification points** | Signals captured in the enquiry itself and used to assess `ICP.md` fit | The enquiry form; the follow-up conversation |

### Why the conversion is defined by outcome, not by mechanism

The approved business outcome is **measurable qualified enquiries**. That is a statement about the *unit of value*, not about which control the visitor clicks.

**A qualified meeting booking is a qualified enquiry**, provided it captures the same source, landing context, interest and qualification data as a form submission. Forcing every visitor through a contact form would discard buyers who prefer to book — a real preference, not an edge case — and would make the architecture depend on one mechanism that is, today, one of two broken paths in production.

**Architectural rule:** the funnel requires **one primary conversion outcome** and **does not require a particular mechanism**. Both surfaces must eventually capture:

- **source** (channel, referrer, campaign);
- **landing context** (entry page and path);
- **service or problem interest** (which capability, vertical or problem brought them);
- **qualification information** (the signals below).

Analytics distinguishes the mechanisms — `lead_form_submitted` versus `meeting_booked` — while both roll into one business-level **qualified-enquiry** model. A booking that cannot carry this data is a booking, not a qualified enquiry, and must not be counted as one.

**Not designed here:** the forms, the booking flow, field sets, or how qualification is split between the two surfaces. Those are CRO-phase decisions (Gate 6).

### Qualification signals to capture at enquiry

Derived from `ICP.md` §2 — the seven strong-fit conditions. These are **fields and follow-up questions**, not marketing copy.

| Signal | Maps to ICP condition |
|---|---|
| What the business sells, and to whom | Considered purchase |
| Typical order or contract value band | **Meaningful value per opportunity — the single most important qualifier** |
| Current enquiry volume, and whether it is known at all | Existing demand signal; also a direct measurement-maturity signal |
| Whether analytics exists and access can be granted | **Measurement access — non-negotiable** |
| Who follows up enquiries today | Ability to handle enquiries |
| Who can approve site and measurement changes | Internal capacity to act |

**Form-design constraint:** every field costs conversions. The qualification set above is the *information required*, not a specification for a long form. How much is asked at first contact versus in follow-up is a CRO-phase decision (Gate 6), not an IA decision.

---

## 3. Primary conversion path

**High-intent buyer → commercial page → qualified enquiry.** Proof is available at the point of decision, not interposed as a step.

```
Entry (search / directory / referral / brand)
   ↓
Commercial page   /services · /seo · /ai-seo · /lead-generation · /google-ads
                  /conversion-optimization · /pricing · [/industries/manufacturing — conditional]
   │
   ├──────────────────────────────────────────────► PRIMARY CONVERSION
   │        (direct — the default path)              qualified enquiry created
   │                                                 via form OR meeting booking
   │
   └──► /how-it-works and/or /research/{entry} ────► PRIMARY CONVERSION
            (optional deeper evaluation)
```

**The visitor's intent determines the depth of evaluation.** A visitor who lands on `/seo`, understands the proposition and wants to make contact must be able to do so immediately. Requiring a detour through a proof page would cost conversions from exactly the buyers who are readiest.

**Proof is integrated, not interposed.** Every commercial page must:
- carry proof **in context** — the method summarised where it is relevant, and evidence placed near the claims it supports;
- link **prominently** to `/how-it-works` and to the relevant `/research` entry for evaluators who want depth;
- never make either link a prerequisite for reaching the conversion.

This still answers the underlying problem — MappedSkills asks a premium fee with zero case studies, no reviews and no directory profiles — but it answers it by **making commercial pages carry their own evidence**, which is a content and design requirement, rather than by adding a navigational step the buyer did not ask for.

---

## 4. Secondary conversion paths

| # | Path | Entry | Route | Conversion |
|---|---|---|---|---|
| 1 | **Problem-aware buyer** | Search: `why your website gets traffic but no leads` and siblings | `/problems/traffic-but-no-enquiries` → *(optionally `/how-it-works`)* → enquiry | Qualified enquiry, or diagnostic request |
| 2 | **Research / reader visitor** | Search or referral to an article or research entry | `/blog/{slug}` or `/research/{slug}` → relevant commercial or problem page → enquiry | Read depth → subscription → qualified enquiry |
| 3 | **Vertical buyer** — *conditional, ships only if the manufacturing gate clears* | Search: `seo agency for manufacturing companies` | `/industries/manufacturing` → *(optionally `/how-it-works`)* → enquiry | Qualified enquiry. **RFQ-shaped language is the buyer's own; this segment often prefers a call** |
| 4 | **Returning evaluator** | Brand search, directory listing, or a saved link | `/` or `/about` → `/how-it-works` → commercial page → enquiry | Qualified enquiry. **This is the path where the proof route is genuinely used — because the visitor chose it** |
| 5 | **Price-stage buyer** | Search: `how much does SEO cost in Pune` and siblings | `/pricing` → *(optionally `/how-it-works`)* → enquiry | Qualified enquiry. **Highest disqualification rate — the ICP filter does the work here** |

**Deliberately absent: a diagnostic-tool path.** It is the sixth obvious path and it is **not built at launch** — blocked on the entry-model decision (§1).

---

## 5. CTA architecture

**Functions, not copy.** Final wording belongs to the messaging phase.

| CTA role | Function | Commitment |
|---|---|---|
| **PRIMARY** | Create a qualified enquiry — **by form or by booking a meeting.** One primary conversion **outcome** per page; the page may offer both surfaces. Model-agnostic | High |
| **DIAGNOSTIC** | Find out where demand is being lost. A framing of the primary conversion for problem-aware visitors who are not yet buying | Medium |
| **PROOF** | See the method, the research, or (later) the results | Low |
| **LOW-COMMITMENT** | Read the relevant guide, benchmark or problem page | Very low |
| **DIRECT** | Call / WhatsApp. Not a lesser CTA — for the beachhead segment it is often the preferred one | High |

### CTA role by page type

| Page type | Primary CTA role | Secondary CTA role |
|---|---|---|
| Homepage | PRIMARY | PROOF |
| `/services` | PRIMARY | PROOF |
| Capability pages | PRIMARY | PROOF |
| `/industries/manufacturing` *(conditional)* | PRIMARY | PROOF (+ DIRECT — this segment calls) |
| `/problems/...` | **DIAGNOSTIC** | LOW-COMMITMENT, then PRIMARY |
| `/how-it-works` | PROOF | PRIMARY |
| `/research`, `/research/{slug}` | **PROOF** | LOW-COMMITMENT (subscribe), then PRIMARY |
| `/blog`, `/blog/{slug}` | **LOW-COMMITMENT** | Contextual PRIMARY, cluster-appropriate |
| `/pricing` | PRIMARY | PROOF |
| `/about` | PROOF | PRIMARY |
| `/faq` | LOW-COMMITMENT | PRIMARY |
| `/contact` | PRIMARY (form surface) | — |
| `/schedule-call` | PRIMARY (booking surface) | — |

### Rules
1. **One primary conversion *outcome* per page.** A page may expose both the form and the booking surface, because they are two routes to the same outcome — but it must not present a second, competing *goal*. Competing goals are the most common self-inflicted conversion loss; two doors to one goal are not.
2. **CTA role matches funnel stage.** A PRIMARY CTA at the top of a TOFU article converts nobody and costs the read.
3. **Proof is reachable from every commercial page, and required by none.** A PROOF CTA is an offer, not a gate. **No page may make proof a prerequisite for reaching the primary conversion.**
4. **No CTA promises an outcome.** No guaranteed enquiries, rankings, AI citations, revenue or ROI.
5. **No CTA depends on a proof asset that does not exist.** No "see our case studies" until case studies exist.
6. **DIRECT contact is always visible.** Phone and WhatsApp are real conversion paths in this market, not fallbacks.

---

## 6. Measurement architecture requirements

The funnel is only real if it is instrumented. **None of this exists today.**

| Requirement | Why |
|---|---|
| **Analytics in production** | The absolute precondition. Currently absent entirely |
| **Enquiry-source capture in the form itself** | The approved chain begins at discovery/source. **This is measurement and belongs to the core engagement** — not automation |
| **`/thank-you` wired as the post-enquiry destination** | Currently orphaned; the form shows an inline success state instead, so submissions cannot be counted |
| **Two conversion events, one business model** | `lead_form_submitted` and `meeting_booked` are tracked as distinct events and **both roll into a single business-level qualified-enquiry measure**. Reporting must be able to show the total and the mechanism split |
| **Booking-surface data parity** | A meeting booking must carry the same source, landing context, interest and qualification data as a form submission. **A booking that cannot carry it is not a qualified enquiry and must not be counted as one** — this is a real constraint on whichever booking tool is chosen |
| **Event instrumentation for every micro-conversion in §2** | Read depth, method view, pricing view, research open, FAQ expand |
| **Referrer and landing-page capture** able to distinguish AI-assistant referrals | Distinguishes AI *referrals* from AI *crawlers* — the crawler taxonomy is what makes the separation possible |
| **UTM discipline** across paid and outbound | Paid is retained as a demand source on the same measurement layer |
| **CRM handoff carrying source through to opportunity** | The chain must reach client-supplied revenue data to be reportable |
| **Consent management** | GTM and Meta Pixel currently load unconditionally with no consent mechanism, and the site's own privacy policy states a banner is required. **A pre-launch blocker, not a live breach — because nothing currently fires** |
| **Form delivery verification** | **DELIVERY NOT VERIFIED.** No test enquiry has ever been submitted. A success UI is not proof of delivery |

**Rule carried from the frozen strategy:** MappedSkills must be able to report against a **published baseline**, and must state plainly what cannot be attributed. That statement belongs on `/how-it-works` and is a differentiator, not a disclaimer.

---

## 7. Open conversion decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **The entry-offer model — free, paid or hybrid.** Everything in §1 is structured to survive any answer, but the answer is still needed | Owner |
| 2 | **How much qualification happens in the form versus in follow-up** | CRO phase (Gate 6) |
| 3 | **How qualification data is captured on the booking surface**, and whether the current booking tool can carry it at all | CRO phase (Gate 6) + technical phase. **The two-surface model depends on this being solvable** |
| 3b | **Which surface leads on which page type** — both are primary; page-level emphasis is a design decision | CRO phase (Gate 6) |
| 4 | **What the enquiry actually reaches** — inbox, CRM, or both — and who responds, within what time | Owner. **Enquiry-routing capability is in scope; the operational commitment is not a Claude decision** |
| 5 | **Consent mechanism and vendor** | Technical / legal phase |

---

## 8. What this document does not decide

CTA copy · form field copy, labels or validation messages · **the forms themselves and the booking flow** · page layout, wireframes or visual hierarchy · form length · A/B test plans — **and note that below a real traffic threshold this work is conversion research, diagnosis and design, not statistically valid testing** · lead scoring thresholds · CRM selection · follow-up sequences (expansion capability, not core).
