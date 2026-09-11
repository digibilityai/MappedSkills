# PHASE J — IMPLEMENTATION RECOMMENDATION

**Date:** 2026-09-07 · **Status:** **PROPOSED — AWAITING OWNER / ChatGPT VISUAL APPROVAL**
**This document recommends. It does not authorise, and no part of it has been implemented.**

---

## 1. The recommendation in one paragraph

**Approve J9 (composition) and J8 (progressive disclosure) first, and treat new figures as the
smaller, later half of Phase J.** The audit's largest measured finding — 98.2% of sections
beginning at the same pixel — is a **composition** problem that needs no figure, no motion, no
JavaScript and no copy change, and it reaches ~104 sections through one shared component. The
second-largest — 16 of 18 routes with nothing a reader can examine — is answered by a disclosure
pattern **already accepted at Gate 10**. Both are low-risk. New diagrams are where the cost, the
proof risk and the mobile-height risk live, and Prototype B measured that cost honestly.

---

## 2. What Phase J should NOT do

1. **Do not reopen the homepage.** It passed Gate 10 with the owner's verdict on mobile. It is the
   only route already carrying motion and interaction, and its score is the best on the site
   (longest text-only run: **1**). It should be **last, and conditional**.
2. **Do not build J6 (sticky narrative).** Blocked by `DEC-018` §4.5 and `DEC-019` — see
   `02_INTERACTION_GRAMMAR.md` §3.
3. **Do not invent `/google-ads`'s F9 figure.** The fact is owner-blocked.
4. **Do not add a figure to `/social-media-ads`** without reopening a binding taxonomy.
5. **Do not touch `/contact`, `/schedule-call` or `/thank-you`** beyond shared chrome.
6. **Do not add analytics to any interaction.** A tab selection is not a conversion.
7. **Do not widen the reading measure.** Composition moves the column; it never stretches the line.

---

## 3. Recommended rollout order

| Stage | Scope | Why here | Risk | Reversible |
|:--:|---|---|:--:|:--:|
| **J-1** | **J9 composition variants on `CommercialSection`** | Largest finding, ~104 sections, zero JS, zero motion, zero copy change | **Low** | Yes — one component |
| **J-2** | **J8 + J4 on `ScopeList`** *(Prototype A)* | One component → six capability routes | **Low–med** | Yes |
| **J-3** | **`/about`** — J7 fit boundary *(Prototype C)*, then J2 *(Prototype B)* **if approved** | Worst structural score; lowest SEO risk | **Low** (C) / **Med** (B) | Yes |
| **J-4** | **`/faq`** — J8 on the answer set | Densest figure-less route | **Med** — `FAQPage` structured data must be re-verified | Yes |
| **J-5** | **`/how-it-works`** — J4 on CAPTURE → CONVERT → MEASURE | Tallest page; largest comprehension gain | **Med** | Yes |
| **J-6** | `/conversion-optimization`, `/problems/…`, `/ai-seo` — J8 on existing figures | Figures already exist and are approved | **Med** | Yes |
| **J-7** | `/pricing`, `/lead-generation` — J7 boundaries | | **Med** — no price geometry | Yes |
| **J-8** | `/services` — composition only | Chain figure is already class A | **Low** | Yes |
| **J-9** | **`/` — conditional** | Only if the site-wide result makes it necessary. Requires explicit before/after regression evidence | **HIGH** | — |

**A gate after J-2.** J-1 and J-2 together should be measurable against this baseline before
anything else proceeds. If distinct left-starts and right-third occupancy do not move, the rest of
the plan is wrong and should be re-cut rather than continued.

---

## 4. Re-measurement contract

Phase J implementation must be judged against `01_QUANTITATIVE_BASELINE.md` using the **same
script, the same viewport and the same definitions**. Targets are stated as **directions with
floors**, not as invented percentages:

| Metric | Baseline | Floor to clear |
|---|:--:|---|
| Sections at the modal left-start | **98.2%** | **< 70%** |
| Routes with 0% right-third occupancy | **9 of 18** | **≤ 4** |
| Routes breaching the run-of-2 rhythm rule | **12 of 18** | **≤ 6** |
| Routes with zero interactive sections | **16 of 18** | **≤ 9** |
| Visible words, site-wide | **14 612** | **must not fall below ~14 000** — Phase J is composition, not copy deletion |
| Mobile section height | per §2 of the review | **no section may exceed its baseline height by more than 25% at 390 px** |
| Motion tiers per secondary page | 0 | **T2 ≤ 1, T3 ≤ 2, T1 = 0, pinned = 0** |

The word-count **floor** is deliberate. A later session could hit every composition target by
deleting copy, and that would damage the SEO surface this programme built.

---

## 5. Protected systems — the pre-flight list

Before any Phase J implementation commit, re-verify:

`/api/enquiry` · enquiry persistence · idempotency · migration 002 · attribution ·
`page_view`, `lead_form_started`, `lead_form_validation_error`, `lead_form_submitted`,
`meeting_started` · consent architecture · GTM loading · GA4 · Calendly · `robots.ts` ·
`sitemap.ts` · redirects · indexability · structured data (`BreadcrumbList`, `FAQPage`) ·
security headers · deployment.

**None was touched by this design-gate pass.**

---

## 6. Owner decisions required

| # | Decision | Phase J recommendation |
|:--:|---|---|
| **1** | **Approve the six-primitive grammar** (J2, J4, J5, J7, J8, J9)? | Approve |
| **2** | **J6 sticky narrative** — build it by reopening `DEC-018` §4.5 and `DEC-019`, or drop it? | **Drop it.** J8 delivers the intent without pinning |
| **3** | **Secondary-page motion budget** — Phase J proposes **no increase**. If several sections of one service page should be interactive, T2 = 1 must be reopened | Keep the budget. Scarcity is what makes the gesture legible |
| **4** | **`/google-ads` F9** — supply the fee/spend fact, or accept the route stays text-led? | Supply the fact if it exists; **never invent it** |
| **5** | **`/social-media-ads`** — reopen the D—NONE taxonomy, or accept a short honest page? | Accept it |
| **6** | **Prototype B's mobile cost** (+508 px, +84% at 390 px) — accept, run at MEDIUM+ only, or drop B? | Owner's call. **C and A are recommended regardless** |
| **7** | **Homepage** — in or out of Phase J? | **Out**, unless the site-wide result forces it |
| **8** | **Rollout sequencing** — approve the J-1 … J-9 order and the gate after J-2? | Approve |

---

## 7. What happens next

**Nothing, until this gate is answered.** No production application file has been changed, nothing
has been pushed, no rollout has begun, and no page other than the three prototype sections has been
touched in any form.

On approval, a **separate Phase J implementation prompt** should be issued, scoped to **J-1 and
J-2 only**, ending at the re-measurement gate in §4.
