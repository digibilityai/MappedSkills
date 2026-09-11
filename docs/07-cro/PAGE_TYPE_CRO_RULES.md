# Page-Type CRO Rules

**Session:** 08 · **Date:** 2026-08-31 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Rules by page *type*, not by URL** — so the approved 22-page architecture does not need 22 separate funnels, and so a new page inherits its rules rather than inventing them.

**Friction tolerance** = how much the page may ask of the visitor before it costs more than it earns.

---

## 1. Homepage — `/`

| | |
|---|---|
| **Visitor state** | Mixed, mostly mid-funnel. Arrives from brand search, referral, a directory listing, or a deeper page. **Not primarily a cold organic entry point** |
| **Conversion objective** | Make the proposition legible, make a reason to believe it visible, then route or convert |
| **Primary CTA role** | PRIMARY |
| **Secondary CTA role** | PROOF |
| **Proof requirement** | Published method · own diagnostics · named people. **No logo wall, no metric, no testimonial** — none exists |
| **Friction tolerance** | Low. This visitor has not declared a need |
| **Measurement** | `page_view`, `primary_cta_clicked`, onward route taken |
| **Sticky CTA** | Permitted |

---

## 2. Commercial pages — `/services`, `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`

| | |
|---|---|
| **Visitor state** | Has declared a need by choosing this page. Commercial-investigation or transactional intent |
| **Conversion objective** | **Qualified enquiry, directly.** This is where the funnel earns |
| **Primary CTA role** | PRIMARY — both surfaces offered |
| **Secondary CTA role** | PROOF, and CONTEXTUAL to the matching problem page |
| **Proof requirement** | **Proof in context, beside the claims it supports**, plus prominent links to `/how-it-works` and the relevant `/research` entry. **Never a required step** |
| **Friction tolerance** | **Highest on the site.** A declared need justifies the four-field form |
| **Measurement** | Full form/booking funnel, with `service` set from page context |
| **Sticky CTA** | Permitted |

---

## 3. Problem pages — `/problems/*`

| | |
|---|---|
| **Visitor state** | **Problem-aware, not vendor-selecting.** Arrived from a symptom query, has not named the discipline and may not know an agency is the answer |
| **Conversion objective** | Be genuinely useful first; convert second |
| **Primary CTA role** | **DIAGNOSTIC** |
| **Secondary CTA role** | LOW-COMMITMENT, then PRIMARY at the end |
| **Proof requirement** | The own-site diagnostic as a worked example |
| **Friction tolerance** | **Low.** A hard sell above the fold breaks the page's job |
| **Measurement** | Read depth, `primary_cta_clicked`, form funnel |
| **Sticky CTA** | Permitted, below the fold only |

**Binding constraint:** the page must contain **a real diagnostic sequence the reader can follow without hiring anyone**. A service pitch behind a question-shaped headline is a doorway page and Project Rule 10 forbids it. **This is a CRO constraint, not only an SEO one** — a page that fails it will not convert either.

---

## 4. Pricing — `/pricing`

| | |
|---|---|
| **Visitor state** | Price-stage. Frequently late-stage, sometimes a price-shopper |
| **Conversion objective** | Qualified enquiry, with self-selection *before* the enquiry |
| **Primary CTA role** | PRIMARY, **booking emphasised** — price-stage buyers want a person |
| **Secondary CTA role** | PROOF |
| **Proof requirement** | **The highest on the site.** MappedSkills displays ₹50K–₹2L/month with zero case studies, no reviews and no directory profiles. This page carries the largest credibility gap on the site |
| **Friction tolerance** | High |
| **Measurement** | `pricing_cta_clicked`, and whether `/pricing` was viewed before any enquiry — a strong soft signal |
| **Sticky CTA** | Permitted |

**Recorded caveat:** transparent pricing attracts price-shoppers into a market with $199/month packages. **The `ICP.md` fit criteria are the mitigation, not the page.** A rising unqualified rate from this page is expected and is not a defect.

---

## 5. Methodology / proof — `/how-it-works`

| | |
|---|---|
| **Visitor state** | Evaluating. Also journalists, AI systems and anyone checking whether the claims are real |
| **Conversion objective** | Establish credibility. Convert only those already convinced |
| **Primary CTA role** | **PROOF** |
| **Secondary CTA role** | PRIMARY, at the end |
| **Proof requirement** | **This page IS the proof** — including the explicit statement of what cannot be attributed |
| **Friction tolerance** | Medium |
| **Measurement** | `proof_opened`, read depth, onward conversion |
| **Sticky CTA** | **Not permitted.** A persistent sales prompt undercuts the credibility this page exists to build |

---

## 6. Research — `/research`, `/research/*`

| | |
|---|---|
| **Visitor state** | Evaluators, practitioners, potential linkers. **Many will never be buyers, and that is the point** |
| **Conversion objective** | Credibility and citation. Conversion is incidental |
| **Primary CTA role** | **RESEARCH** (open / subscribe) |
| **Secondary CTA role** | PROOF, then PRIMARY well below the fold |
| **Proof requirement** | Method, sample size, date, location, run counts and stated limitations on every entry |
| **Friction tolerance** | **Lowest on the site** |
| **Measurement** | `research_opened`, subscription, read depth |
| **Sticky CTA** | **Not permitted** |

**Why the restraint is a business decision, not modesty.** The launch research entries publish MappedSkills' **own measured zero** — 0 of 28 unbranded AI runs — as evidence of measurement honesty. A hard conversion push on that page contradicts the exact quality it is published to demonstrate.

---

## 7. Blog / editorial — `/blog`, `/blog/*`

| | |
|---|---|
| **Visitor state** | Top of funnel, often informational. Many are practitioners, **and on these query families a meaningful share will be students and job-seekers** |
| **Conversion objective** | Deliver the answer, then offer one relevant next step |
| **Primary CTA role** | **LOW-COMMITMENT** |
| **Secondary CTA role** | CONTEXTUAL to the matching commercial or problem page |
| **Proof requirement** | Named authorship; honest sourcing |
| **Friction tolerance** | **Very low** |
| **Measurement** | Read depth, `research_opened`, contextual click-through |
| **Sticky CTA** | **Not permitted.** No booking prompt on an article |

**Direct evidence for the restraint.** Session 03 found MappedSkills' target vocabulary is heavily career- and course-contaminated. These pages will attract non-buyers by design, which is an acceptable cost of ranking for the buyer-phrased families — **but it means editorial conversion rate will look poor and must not be optimised by adding pressure.** The correct response is the hard disqualifier in `QUALIFIED_ENQUIRY_DEFINITION.md` §4, not a more aggressive CTA.

---

## 8. About — `/about`

| | |
|---|---|
| **Visitor state** | Late-stage evaluator, or a system resolving the organisation |
| **Conversion objective** | Establish who MappedSkills is; convert the already-convinced |
| **Primary CTA role** | PROOF |
| **Secondary CTA role** | PRIMARY |
| **Proof requirement** | Named people with real credentials. **No invented milestones** |
| **Friction tolerance** | Medium |
| **Measurement** | Onward conversion; whether viewed before enquiring |
| **Sticky CTA** | Not required |

---

## 9. Contact and booking — `/contact`, `/schedule-call`

| | |
|---|---|
| **Visitor state** | **Decided.** The only job left is not to lose them |
| **Conversion objective** | Complete the qualified enquiry |
| **Primary CTA role** | PRIMARY only — `/contact` is the form surface, `/schedule-call` the booking surface |
| **Secondary CTA role** | Cross-link to the other surface. DIRECT always visible |
| **Proof requirement** | **Minimal.** Proof here is a distraction |
| **Friction tolerance** | Highest — but **no additional fields beyond the four** |
| **Measurement** | Complete funnel: start, errors, abandonment, submission |
| **Sticky CTA** | N/A |

**`/contact` additionally carries the NAP that local and AI-answer discovery depend on** — and **the current entity declaration's `postalCode` field contains the word "India"**, a verified defect to be fixed here and in schema together.

---

## 10. Conditional vertical page — `/industries/manufacturing`

**Applies only if the manufacturing validation gate clears before content freeze.** Manufacturing remains **candidate beachhead #1, not an approved specialisation**.

| | |
|---|---|
| **Visitor state** | Industrial B2B decision-maker; frequently the owner or the commercial lead |
| **Conversion objective** | Qualified enquiry, RFQ-shaped |
| **Primary CTA role** | PRIMARY, **with phone/WhatsApp genuinely prominent** — all three AI systems used "RFQ" unprompted and this segment calls |
| **Secondary CTA role** | PROOF |
| **Proof requirement** | RFQ-path and specification fluency. **No manufacturing case study exists — the page must not imply one** |
| **Friction tolerance** | High |
| **Measurement** | Full funnel, with `service` and `industry` context set |
| **Sticky CTA** | Permitted |

---

## 11. Rules that apply to every page type

1. **Proof is available on every commercial page and required on none.**
2. **One primary conversion outcome per page**; both surfaces may be offered.
3. **Every conversion path carries page context** into the enquiry record, so nothing has to be asked twice.
4. **No modals, no interstitials, no exit-intent.**
5. **Every page's conversion elements meet WCAG 2.2 AA** — Project Rule 13.
6. **No page promises an outcome** or reuses "300%+ ROI", "₹100Cr+", "₹10Cr+" (`DEC-007`).
7. **Nothing outcome-based is claimed anywhere until analytics and enquiry capture work.** That precondition governs page content, not just reporting.
