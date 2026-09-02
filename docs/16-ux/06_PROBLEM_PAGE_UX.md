# Problem-Page UX — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Reference route:** `/problems/traffic-but-no-enquiries`
**Governed by:** the approved copy (`copy/problems-traffic-but-no-enquiries.md`, `DEC-014`) · `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §5 · `PAGE_TYPE_CRO_RULES.md` §3 · `19_FIGURE_PRIORITISATION.md` F2 and F6 · anti-pattern B25.

---

## 1. Why this page type gets its own document

**It sits on the most winnable results page observed anywhere in this programme** — no HubSpot, no Semrush, no Forbes, no CXL; peer-level incumbents; freshness a live ranking lever. It is also **the page MappedSkills can write with unusual authority**, having diagnosed exactly this failure on its own site.

**And it is the page most easily ruined by conversion instinct.** The binding constraint is a strategy rule, not a preference:

> **The diagnostic must be completable by the reader without contacting anyone.** No tool, no sign-up, no download, no email, no score.

A service pitch behind a question-shaped headline is a doorway page (Project Rule 10), and **it would not convert either** — which is why this is a CRO constraint as much as an SEO one.

---

## 2. The reader, and what they have not done

The visitor is **problem-aware and not vendor-selecting**. They have not named a discipline. They may not think an agency is the answer. They arrived from a symptom query typed in their own words.

**Three UX consequences follow directly:**

1. **Nothing above the fold may assume they are buying.** No PRIMARY CTA, no booking prompt, no "get a free audit", no sticky element.
2. **The page must earn the right to sell, and the earning is measurable in content** — the reader must have an answer before any commercial transition appears.
3. **Friction tolerance is low.** A hard sell above the fold breaks the page's job and its ranking argument simultaneously.

---

## 3. The sequence, as a UX structure

The approved copy's moves, restated as what each does to the reader. **The copy is not reordered and not rewritten.**

| Move | UX job | Reader state after | Apparatus |
|---|---|---|---|
| **Hero** | Name the symptom; promise the checks are on this page and runnable today | "This is my situation, and there is something here I can do" | **ABSENT** |
| **1 — What this looks like** | Self-identification across five symptom patterns, **without implying a cause** | "More than one of those is me" | **ABSENT** |
| **2 — It is one of four things** | **The page's distinctive move.** Refuse the assumption that the website is the problem | "I do not actually know which one I have" | **ABSENT** |
| **5 — Five checks you can run today** | Hand over the instrument | "I have run these and I have outcomes" | **ADJACENT-SECONDARY** on each observable outcome |
| **6 — What each finding means** | Convert outcomes into direction, **including three outcomes that point away from the firm** | "I know what my next move is" | ADJACENT-SECONDARY |
| **7 — What we found on ourselves** | The worked example, as evidence that the instrument is real | "They ran it on themselves and published the failure" | EXPANDABLE |
| **8 — If you would rather we ran it** | The commercial transition, **only now** | Decided, or usefully finished | **ABSENT in the CTA region** |

**Copy-numbering observation, reported not resolved.** The approved copy file numbers its sections 1, 2, 5, 6, 7, 8 — the message pattern's moves 3 (the four loss zones) and 4 (self-identification) are **present in content**, folded into copy moves 2 and 1 respectively, but the file's numbering skips 3 and 4. **No content is missing.** This is a numbering artefact in an approved document; **this session has no authority to renumber approved copy and has not done so.** Recorded for the orchestrator.

---

## 4. The interaction question, answered

> **The brief asks: does interaction improve comprehension here, or is static explanation better?**

**Determination: static is the primary and sufficient state for the four causes. A local, ungated, no-score recording affordance is permitted — and only — on the five checks.**

**Reasoning, split by figure because the two are doing different jobs.**

### 4.1 The four causes (F2) — static, always

The four-cause structure is a **comprehension aid**. The reader's job is to understand that four distinct failures exist and that they need different fixes. That is a fact about the world, delivered by reading.

- **Interaction adds nothing to comprehension here** and costs the two things this page cannot afford: it makes the page's core value dependent on JavaScript, and it makes the structure harder to screenshot, print, quote and cite — on a page whose freshness and citability are its ranking argument.
- **A branching interactive tree also invites the failure the strategy prohibits**: a reader who clicks through branches expects an answer at the end, and the figure is explicitly forbidden from **producing a diagnosis rather than a direction**.
- **Binding:** followable top-to-bottom with no interaction; vertical on narrow screens; **never horizontally scrolled**; measurement marked as the one to check first **with its reason visible**.

### 4.2 The five checks (F6) — static only at launch

> **REVISED 2026-09-02 — H5: NOT APPROVED FOR LAUNCH UX.**
> The orchestrator has ruled the recording affordance out for launch. **The five-check diagnostic remains ungated, usable without interaction, printable and saveable by ordinary browser behaviour, and complete as static content.**
> **Prohibited outright at launch:** local saved state · checklist persistence · scoring · completion tracking · browser-storage state · a diagnostic account · email capture · a gated result.
> **Reason given:** the interaction adds complexity without evidence that it improves buyer comprehension or decision quality. **Recorded as a PHASE 2 / RESEARCH-REQUIRED POSSIBILITY ONLY.**
> **The page loses nothing** — the checks were already complete and sufficient as static content, each ending in a named observable outcome, and this document said so.
> **One requirement this adds:** printability becomes explicit. The checks, their outcomes and all six findings must print cleanly, in order, with every disclosure open, and the reader must be able to save the page by ordinary browser behaviour with nothing lost.
> The analysis below is preserved as the decision trail. **The eight constraints are the conditions any future Phase 2 version would have to satisfy; they are not approval.**

The five checks are **an instrument the reader operates**, not a diagram they read. Each already ends in a named observable outcome. A reader working through five checks in sequence, on a phone, in a different tab from their analytics, has a genuine memory burden — and that is the one thing an affordance can legitimately reduce.

**What is permitted:**
- The reader records the outcome of each check as they go.
- The page then indicates **which of the four causes their answers point toward** — as a **direction**, phrased as such.

**What is prohibited, and every one of these is a hard rule:**

| Prohibited | Rule |
|---|---|
| Any gate — email, sign-up, download, account | **B25** |
| A score, grade, percentage, rating or "your result is X/10" | **B7, B26** |
| A traffic-light or red-amber-green treatment of any outcome | **B6** |
| A diagnosis presented as certain | `19` F2 — *narrows the question, never certifies an answer* |
| Any implication the four causes are mutually exclusive | `19` F2 — a business can have more than one |
| Any implication of frequency or likelihood | `19` F2 — **no data exists on how common each cause is** |
| Sending the recorded outcomes to a server, or using them to pre-fill an enquiry without the reader's explicit action | Privacy, and it converts a public instrument into a lead-capture device |
| The recording affordance being required to reach the outcomes | The static state must carry everything |

**Binding implementation constraints:**
- **The static page is complete without it.** All five checks, all observable outcomes, and all six findings in Move 6 are fully present, readable and printable with no interaction and no JavaScript.
- **State is local to the reader's browser and is never transmitted.** It may be discarded on reload without harm, because nothing depends on it.
- **Keyboard operable, no hover, touch targets adequate, and announced to assistive technology when a selection changes.**
- **Reduced motion:** no transitions on outcome selection.

**If the affordance cannot be built to all of these constraints, it does not ship, and the page loses nothing that matters.**

---

## 5. The honest outcomes, and how the UX protects them

Move 6 contains **three outcomes that do not route to MappedSkills**:

1. *"If check 1 found no analytics, or check 2 found the form is not delivering — those are bounded jobs. Whoever built your site can do them, usually in a day. You do not need an agency for that."*
2. *"If the traffic is the wrong traffic — conversion work will not help you, and anyone who sells it to you at this point is selling the wrong thing."*
3. *"If the checks disagree, or there is too little to go on — no honest diagnosis is available yet."*

**These are the page's credibility, and they are the first thing a conversion-minded revision would weaken.** The UX rules protecting them:

- **Equal visual weight to the outcomes that do route to the firm.** Not smaller, not greyer, not italic, not a footnote.
- **Never collapsed by default, never behind a disclosure, never below the CTA.**
- **Never reordered so the routing outcomes come first.** The order is the copy's.
- **The self-fix outcome is not followed immediately by a CTA.** Placing an ask directly beneath "you do not need an agency for this" is confirmshaming by adjacency.

**Acceptance test:** delete the commercial transition entirely. **The page must still be worth publishing.** If it is not, it was marketing.

---

## 6. CTA behaviour on this page type

| Position | Permitted | Notes |
|---|---|---|
| **Above the fold** | **Nothing.** No PRIMARY, no DIAGNOSTIC, no booking, no sticky | The reader has not declared a need |
| **Inside the checks section** | **Nothing.** No CTA, no sticky, no prompt | The reader is working. Interrupting an instrument is the fastest way to make it look like a sales device |
| **Move 6** | Contextual links only, where a finding genuinely points to another page — `/seo` for a demand finding, `/conversion-optimization` for a page finding | These are routes, not asks |
| **Move 7** | LOW-COMMITMENT to the own-site diagnostic; PROOF to `/how-it-works` — **an offer, never a step** | |
| **Move 8** | **DIAGNOSTIC**, then **PRIMARY at the very end** | Wording is blocked on the entry-offer decision; **structure survives any answer** |
| **Sticky** | **Permitted below the fold only**, and suppressed while the checks section is in view | |

**The last thing on the page is a route to something useful, not a form wall.**

---

## 7. Mobile

The problem page is the page most likely to be read on a phone, by a founder, while looking at a second thing — and the firm's own published advice inside it is to test your form *"from a phone, on mobile data rather than office wifi."* **A page that gives that advice must be beyond reproach on a phone.**

| Element | Mobile behaviour |
|---|---|
| **Four causes (F2)** | Genuine vertical form. Never a scaled-down horizontal branching graph. Never horizontal page scroll |
| **Five checks** | One check per section, linear, each ending in its observable outcome. **Not an accordion** — the checks are sequential content, not a menu of choices |
| **Check outcomes** | ADJACENT-SECONDARY, expanded |
| **Move 6 findings** | All six visible. **The three honest outcomes are never the ones that collapse** |
| **Recording affordance**, if built | Touch targets adequate; selection state visible without colour; no hover anywhere |
| **Sticky CTA** | Below the fold, suppressed during the checks, never obscuring content |
| **Worked example** | Full text. The four own-site failures are the page's proof and do not truncate |

---

## 8. Cross-page relationships

| Relationship | Direction | UX requirement |
|---|---|---|
| `/conversion-optimization` ↔ this page | Both | The four-zone figure must be **visibly the same object at two depths**. A reader arriving from one to the other must recognise it |
| `/seo` → this page | One way | From the demand-related finding |
| `/ai-seo`, `/lead-generation` → this page | One way | Contextual |
| Homepage symptom list → this page | One way | From the last symptom, where the copy names it |
| Launch article 3 → this page | One way | Cluster relationship |
| This page → `/how-it-works` | One way | **Offer, never a step** |
| This page → `/research/{own-site-enquiry-diagnostic}` | One way | **TECHNICAL PREREQUISITE** — the link and its sentence do not render until the fixes ship. The finding stands either way |
| **Primary navigation** | **Absent** | A "Problems" menu would advertise a family with one member |

---

## 9. Dependencies

| Dependency | Type | Effect |
|---|---|---|
| Entry-offer model (free / paid / hybrid) | **DECISION REQUIRED** | Changes the DIAGNOSTIC CTA wording only. **No candidate may say "free" until it is recorded.** Page structure and every check survive any answer |
| Own-site fixes shipped | **TECHNICAL PREREQUISITE** | The research-entry link does not render. The worked example itself is unaffected |
| Cadence owner | **OPERATIONAL** | Freshness is a live ranking lever on this results page. The page needs a named review owner at publication — recorded in the approved copy, not resolved here |

**No owner input blocks this page**, which is why it can be produced early and should be. It is the most winnable surface in the programme and the one with the fewest dependencies.

---

## 10. Acceptance tests for this page type

1. **The no-contact test.** A reader completes all five checks and reaches a specific finding without contacting anyone, without an email address, without a tool, and without JavaScript.
2. **The deletion test.** Remove the commercial transition. The page is still worth publishing.
3. **The honest-outcome test.** The three outcomes that point away from MappedSkills carry the same visual weight, the same openness and the same position priority as the ones that do not.
4. **The instrument test.** Every check ends in something the reader can observe, and no check requires anything they do not already have.
5. **The doorway test.** Remove the page's headline and its CTAs. What remains is a genuine diagnostic guide, not a service description.
