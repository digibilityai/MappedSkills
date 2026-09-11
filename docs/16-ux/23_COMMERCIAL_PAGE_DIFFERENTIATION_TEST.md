# Commercial-Page Differentiation Stress Test — PROPOSED

**Session:** 13 — Orchestrator correction / gate-scope reconciliation pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Extends `05_COMMERCIAL_PAGE_UX.md`; does not replace it.

> **No page copy was rewritten, reordered or renumbered in this pass.** The approved copy files were read only. Where this test finds a risk, the fix is to the **UX sequence**, never to the words.

---

## 1. The test

Six pages, six questions each. **A page fails if its answers could be swapped with another page's without either page becoming wrong.**

---

## 2. The comparison table

| | **/seo** | **/ai-seo** | **/google-ads** | **/social-media-ads** | **/lead-generation** | **/conversion-optimization** |
|---|---|---|---|---|---|---|
| **1. Buyer's first question** | *Do you do this, and are you going to spend twelve months of my money before anything happens?* | *Is any of this real, or is someone about to sell me a score?* | *What am I paying you, as against what I am paying Google?* | *Should I even be doing paid social for what I sell?* | *What am I actually getting — and will any of it be worth quoting for?* | *Where am I losing them?* |
| **2. Unique second move** | **The horizon.** Organic is a 12-month-plus engine, stated as a position before the work is described | **Separating the four layers.** The argument that a single score is the wrong instrument | **The fee / spend / measurement boundary.** The category's most common dispute, settled | **The honest channel answer.** This channel is often wrong for a considered purchase | **Publishing the definition** of a qualified enquiry — the unit itself | **The four loss zones.** Diagnosis as the second move, not the first impression |
| **3. What appears earlier here than on the other five** | **A temporal risk.** No other page leads with time | **Evidence, as a named section**, and the strongest boundary on the site | **The money boundary** — the earliest boundary of the six | **The argument against buying it.** The only page whose second move may talk a reader out | **The definition, before the boundary** — inverting the usual order, legitimately | **The diagnostic figure** — earlier than on any other commercial page |
| **4. Deliberately omitted or delayed** | An SEO primer *(the buyer is sophisticated)* · evidence *(compressed — the own-site technical diagnosis carries it)* · **all local/Pune framing** | The rejected acronyms in any form · **the removed AI-referral share statistic, which must not be reintroduced** · any score | The problem move *(compressed)* · evidence *(minimal)* · any ROAS or ROI figure · **"performance marketing" in any form, including denial** | The problem move, evidence and objections — **all minimal** · **any figure at all** | What the work involves *(compressed)* · any volume promise · **any lead score, grade or rating** | **"CRO" from the body entirely** · the deep diagnostic *(that is the problem page's job)* · the five checks |
| **5. Figure justified?** | **PARTIAL RUN — discovery segment.** F11 (horizon) stays a plain table, Tier 3 | **F3, central and full weight. NO RUN** | **F9 (fee/spend/measurement), full weight. NO RUN** | **NONE.** No page-specific figure, no run | **F5, rendered as a STATE on the chain's terminus** | **F2 shallow = PARTIAL RUN, landing/enquiry segment** — one object, not two |
| **6. What would make it a clone** | Opening on "we do SEO and we measure enquiries", then a generic scope list — that is `/social-media-ads` with a different noun | The four layers becoming a feature list and the boundary becoming a caveat paragraph — that is `/seo` with "AI" prefixed | Dropping the fee/spend boundary to mid-page — the page then has no second move of its own | **Padding it to `/google-ads` length.** Length parity is the tell | The definition rendered as a bulleted taxonomy rather than a promise-boundary — that is `/services` in miniature | Running the problem page's full diagnostic — the boundary that makes both pages viable collapses |

---

## 3. Sequence comparison — the clone check

**Each page's move order, as UX sequence.** Bold marks the distinctive move.

> **NARROW CORRECTION — 2026-09-02 (orchestrator ruling A, remediation pass).** The `/ai-seo` row previously placed the strong boundary **before** the evidence section. That contradicted the approved page-specific rule in **`05_COMMERCIAL_PAGE_UX.md` §4.2**, which states that evidence appears earlier on `/ai-seo` than on any other commercial page because **F3 is the argument** and the boundary is stated against a reader who has already seen the four layers kept separate. **`05` §4.2 controls this sequence.** The row below is corrected so that only one binding `/ai-seo` sequence exists in the repository. **No other sequence in this table is changed, and nothing else in this document is reopened.** The wireframe that implements the corrected order is `37_WIREFRAME_VARIANT_AI_SEO.md`.


| Page | Sequence |
|---|---|
| `/seo` | confirm → bridge → problem → work → **horizon boundary** → measurement → objections → convert |
| `/ai-seo` | confirm → bridge → problem → work → **evidence section (F3)** → **strong boundary** → measurement → **objections section** → convert |
| `/google-ads` | confirm → bridge → **boundary (F9)** → work → measurement → convert |
| `/social-media-ads` | confirm → bridge → work → **channel-fit boundary** → convert |
| `/lead-generation` | confirm → bridge → problem → **definition (F5)** → boundary → measurement → objections → convert |
| `/conversion-optimization` | confirm → bridge *(on the loss)* → **four zones (F2)** → experimentation boundary → measurement → evidence → convert |

**Result: no two sequences are the same.** Each differs in its second move, in where the boundary sits, and in which moves are present at all.

### The one pair to watch

**`/seo` and `/social-media-ads` are the closest pair.** Both are *confirm → bridge → work → boundary → convert* with the boundary as the distinctive move.

**They are sufficiently differentiated, and here is exactly why:**
- **The boundaries are different in kind** — one is temporal (a 12-month horizon), one is a fit judgement (this channel may be wrong for you).
- **`/seo` carries three moves `/social-media-ads` does not** — the problem move, measurement, and objections.
- **`/seo` carries a figure; `/social-media-ads` carries none.**

**The failure condition, stated so it is checkable at the wireframe pass:** if `/social-media-ads` acquires a problem move, a measurement section, an objections section or any figure, **it becomes `/seo` and the differentiation has collapsed.** Its brevity is not an omission to be corrected later — **it is the design.**

---

## 4. Architectural findings from this test

**Three findings. Two are fixes; one is a confirmation.**

### F-1 — The run was over-applied. **FIXED.**

Three of the six pages were previously assigned the run and had their own justified figure as well. That is two figures on a page whose rule is one of full weight, and it is the ambient-repetition risk in practice.

**Fix:** `/ai-seo`, `/google-ads` and `/social-media-ads` are reclassified to **NONE**; `/lead-generation` becomes a **STATE**. Recorded in `22_F1_USAGE_TAXONOMY.md`; `11` and `16` amended.

### F-2 — `/lead-generation`'s figure risked becoming a taxonomy. **FIXED.**

F5 specified as a standalone object invites a four-box classification diagram, which is one step from the lead grading B26 prohibits.

**Fix:** F5 is rendered as a **state at the chain's terminus** — enquiry becoming *qualified* enquiry. That keeps it a **commercial promise-boundary** — what you are buying and what we will answer for — which is what the approved copy requires.

### F-3 — Boundary position is the primary differentiator, and it was already correct. **CONFIRMED, no change.**

Across the six, the boundary sits at four different positions: earliest (`/google-ads`), early-and-strongest (`/ai-seo`), above-midpoint (`/seo`, `/social-media-ads`, `/conversion-optimization`), and after the definition (`/lead-generation`). **This is doing more differentiation work than any other variable**, and it is worth naming so a later pass does not normalise it.

---

## 5. Consequences for the wireframe pass

1. **Three commercial wireframes are required, not one** — the standard master (`/seo`), the high-scepticism variant (`/ai-seo`), and the minimal variant (`/social-media-ads`). The third exists specifically to prove the system permits a short page.
2. **The diagnostic-led variant (`/conversion-optimization`) is a fourth**, because its figure arrives at a position no other commercial page uses.
3. **Lay all commercial wireframes side by side and check three things:** the second move differs · the boundary sits at a different position · **the run does not appear on all of them**.
4. **Do not equalise their lengths.** If they end up the same length, symmetry has overridden intent.

---

## 6. What this test did not do

It did not rewrite, reorder or renumber any approved copy · did not change any page's message moves · did not change any route, target query or positioning · did not add or remove a page · did not resolve any owner blocker. **The two fixes are UX-sequence and figure-assignment fixes only.**
