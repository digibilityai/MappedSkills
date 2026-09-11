# Evidence as a Design Material — APPROVED

**Session:** 12 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** APPROVED — 2026-09-01 (Gate 9A, `DEC-015`).
**Revised 2026-09-01** by the orchestrator correction / stress-test pass: §4 gains the **intervention/changed** state, and §8 gains rules 13–15. Reasoning: `16_COMMERCIAL_ENERGY_SYSTEM.md` and `20_CORRECTION_PASS_GOVERNANCE.md` §1.

**Why this is the most important document in the set.** MappedSkills has a proof deficit, and the design must not hide it behind visual confidence. This document specifies how methodology, research, sources, observed data, sample sizes, limitations, validation status, measured zeroes, unattributed enquiries and owner-supplied downstream data become **deliberate design material** rather than legal disclaimers.

---

## 1. The governing idea

> **The apparatus of checking leaves the prose and becomes a designed, persistent, recognisable layer of the site.**

Three consequences, all of them intended:

1. **The prose gets shorter.** The owner's requirement.
2. **The honesty gets more visible.** A repeating designed feature is noticed; a qualifying clause is skimmed past.
3. **It becomes the differentiator.** A visible evidence apparatus was observed on **none** of the six competitor entry screens (2026-09-01). A competitor copying it would first have to publish its own provenance.

And one rule that makes or breaks all three:

> **The apparatus is set at the same typographic quality as the prose it supports. Never smaller-grey-italic. Never a footnote. Never a disclaimer treatment.**

Homepage Block 4 already prohibits "a disclaimer typeface treatment" for the accountability boundary. This document makes that prohibition systemic rather than page-specific.

---

## 2. The apparatus — its fixed vocabulary

Five elements. **The set is closed.** A page uses the ones that apply and omits the rest; it does not invent new ones. Consistency is what makes the apparatus readable at a glance.

| Element | What it carries | Example of the content it holds *(not final copy)* |
|---|---|---|
| **Provenance line** | What · when · where · how many · by whom | Four systems · 28 unbranded runs · one day · Pune · English · signed out |
| **Status mark** | The epistemic standing of the statement | *measured* · *observed* · *inferred* · *owner-supplied* · *unmeasured* · *not testable* · *unattributed* |
| **Scope note** | What this does and does **not** support | "One measurement is not a trend" |
| **Version stamp** | Dated version; previous versions remain readable | Per `/research` §1: "versions, not edits" |
| **Source** | Where it came from, and whether primary or secondary | Primary documentation, vendor-published, client-supplied |

**Where it lives.** In the apparatus column beside the claim on wide screens; as an inline, expandable disclosure directly beneath the claim on narrow screens. **It is never in a footer, never behind a tooltip carrying meaning the sentence should have carried** (`VOICE_AND_TONE.md` §5.2 already prohibits that in copy), and never in a modal.

---

## 3. What the apparatus is not

- **Not a citation system for everything.** A page where every sentence carries an apparatus is unreadable and looks defensive. The apparatus attaches to **claims, findings, figures and limits** — not to ordinary prose.
- **Not a compliance layer.** It is not there to protect the firm legally. It is there because a reader can use it.
- **Not aggregatable.** No coverage percentage, no evidence score, no completeness meter, no summary badge. That is the score `AI_SEARCH_LANGUAGE.md` §4.3 and `POSITIONING.md` §8 prohibit, arrived at by the back door.
- **Not a substitute for proof.** An immaculate apparatus around a thin evidence base is still a thin evidence base, and the site says so in words (homepage Block 6: "We have no case studies to show you").

---

## 4. The status vocabulary

Seven states, drawn directly from the evidence labels this programme already uses (`CLAUDE.md`, `CLAIMS_LADDER.md`, `CLAIMS_AND_EVIDENCE_GOVERNANCE.md`). **Nothing new is invented.**

| State | Meaning | Live example from the approved material |
|---|---|---|
| **Measured** | First-party measurement, method published | 0 appearances in 28 unbranded runs |
| **Observed** | Directly inspected, not statistically sampled | The production form has no `action` attribute |
| **Inferred** | Reasoned from evidence; labelled as reasoning | "There are buyers for what you sell, and most of them never reach you" |
| **Owner-supplied** | Provided by the client from their system | Deals and revenue reported from the client's own close data |
| **Unmeasured** | Could be measured; has not been | Any metric with no baseline captured before the work began |
| **Not testable** | Could not be measured at all | Claude and Grok — sign-up gated, no answer returned |
| **Unattributed** | Real, counted, and with no usable acquisition trail | Direct entry, missing referrer, consent declined, phone calls |
| **Changed** *(added 2026-09-01)* | A state that was found broken, was acted on, and is now different — carrying **what it was, what was done, when, and by whom** | The production form displayed a success screen and transmitted nothing → it delivers, and delivery is verified |

**Why `changed` was added.** The original seven states describe a world; none of them describes anyone acting on it. That gap is what made the territory read as an observer rather than a firm (`16_COMMERCIAL_ENERGY_SYSTEM.md` §1). `changed` is the state that carries the **intervention record** — the firm's strongest available evidence, because a dated record of something repaired is stronger than a measurement. **Constraints:** it is a **state pair, never a metric pair**; it carries a date and an owner; it is used on MappedSkills' own property until a client gives written permission; and it never implies a result the client's own data has not recorded.

### The four rules that govern them

**1. Never colour alone.** Every state carries **shape + label**, with colour at most a third channel. This is a WCAG requirement and it is also the honest choice: a state is a fact, and a fact should be readable in greyscale, in print, and by a colour-blind reader.

**2. Never a traffic light.** No green/amber/red. *Unmeasured* is not a warning. *Measured* is not a pass. The moment the states look like grades, the site is scoring itself.

**3. Never aggregated.** See §3.

**4. `Not testable` is never rendered as zero.**
This is the single most specific honesty rule on the site, and it is a **design** requirement, not only a copy one.

> **VERIFIED FACT (Session 04):** four systems were measured and returned zero appearances across 28 unbranded runs. Two further systems — Claude and Grok — returned **no testable result at all**. `AI_SEARCH_LANGUAGE.md` §2 permits no claim of any kind about either.

A chart that plots six bars at zero would be false. A chart that plots four bars at zero and omits two would be misleading by omission. **The correct rendering shows six systems, four with a measured zero and two in a visually distinct not-testable state that cannot be read as a value.** If a designer cannot draw that distinction, the figure is wrong and must not ship.

---

## 5. Rendering the hard cases

Each of these is a specific thing MappedSkills must publish, and each has a specific failure mode.

### 5.1 The measured zero
**The case:** zero appearances in 28 unbranded runs across four systems, one dated day, Pune, English, signed out.

**Render it as a result, at full size, with its method attached.** It is a finding, not a failure, and `/research` §1 already commits to publishing adverse findings. It must not be shrunk, apologised for, buried below the fold, softened with a "but", or set in a smaller type than a favourable number would receive.

**Failure modes:** treating zero as an empty state · rendering it in a warning colour · surrounding it with mitigating copy · omitting the two untestable systems.

### 5.2 The unattributed enquiry
**The case:** homepage Block 4 — "Some enquiries arrive with no usable trail at all… We record those as unattributed rather than assigning them to a channel — and a gap in the measurement never takes an enquiry out of the count."

**Render the gap at true proportion.** On the run, an unattributed enquiry arrives at the enquiry node **with no upstream segment attached**. In any source breakdown, *unattributed* is a real category with real visual weight — never a thin residual slice, never "other", never omitted so the categories sum to a tidy 100%.

**This is the most distinctive evidence rendering available to MappedSkills**, because drawing it requires admitting it.

**Failure modes:** assigning unattributed volume to "direct" · rounding it away · rendering it in a lighter tint that reads as less real.

### 5.3 What cannot be attributed
**The case:** `/how-it-works` §4 — five categories of things that are not measured and cannot be.

**Render it as a section with the same visual status as "what we measure"** — ideally paired with it, adjacent, at equal weight. `/how-it-works`'s own hero copy says the attribution section "is not a disclaimer at the bottom — it is a third of the reason this page is here." The design must make that literally true: a third of the page's visual weight, not a paragraph at the end.

**Failure modes:** small grey text · an accordion that starts collapsed · placement below the CTA · a lighter type weight than the claims it qualifies.

### 5.4 Owner-supplied downstream data
**The case:** deals and revenue reported from the client's own system.

**Mark it as theirs.** A distinct provenance treatment that says *this number came from your system, not ours*, alongside what MappedSkills did and did not control. This protects the firm and is also more useful to the reader.

**Failure modes:** presenting client data in the same treatment as first-party measurement · implying MappedSkills produced the revenue.

### 5.5 Sample sizes, run counts and limits
**Always adjacent, never inside the sentence** where the apparatus can carry them. This is the mechanism that shortens the prose.

### 5.6 Validation status of the strategy itself
The programme distinguishes **VERIFIED FACT · OWNER REQUIREMENT · APPROVED DECISION · WORKING HYPOTHESIS · RESEARCH REQUIRED · UNKNOWN**. Public-facing pages must never imply a hypothesis is settled. Where a page states a position rather than a finding, the apparatus says so — e.g. the 12-month-plus organic horizon, which the approved copy classifies as a position, not a schedule.

---

## 6. Methodology as a named surface

**Recommended, on the evidence of R-01 (The Markup's "Show Your Work", observed 2026-09-01):**

`/how-it-works` and `/research` should share **one visible standard and one recognisable label system**, so that method reads as an accumulating body of work rather than as two isolated pages.

What that means concretely:
- The same apparatus vocabulary on both.
- The same metadata schema on every research entry card: **date · systems or scope · sample · version**. This is already required by `/research` §3 and by reference R-08 (metadata-forward cards).
- A consistent label on every methodology-bearing asset, so a reader recognises the type instantly.

**Not recommended:** inventing a branded name for it. `POSITIONING.md` §8 states plainly that a named framework or methodology name is **not a moat**, and `MESSAGING_ARCHITECTURE.md` §3 Level 4 prohibits inventing one. The Markup's *name* is theirs; only the principle transfers.

---

## 7. A note on what the site will look like at launch

Honest, and worth stating so nobody is surprised.

At launch the apparatus will carry: two research entries at most (one of them technically blocked until the own-site fixes ship), the published method (partly BLOCKED pending owner input on the delivery process), named people (BLOCKED pending owner input), and a set of stated limits. **It will look sparse.**

**That is the correct appearance and the design must not compensate for it.** Homepage Block 6 already says so in words: "We have no case studies to show you. That is the honest position, and writing around it would be the first thing you should not trust us on." The visual equivalent of writing around it is filling the apparatus with volume — related links, tags, generic citations, "sources" that are vendor blogs. Do not.

**The apparatus should be built to hold more than it currently holds, and left visibly not-full.** A firm whose evidence layer grows is a better story than a firm whose evidence layer was always exactly as full as it needed to look.

---

## 8. Rules summary — binding

1. Apparatus at the same typographic quality as the prose. Never smaller-grey-italic.
2. Closed vocabulary: provenance · status · scope · version · source. No additions per page.
3. Attaches to claims, findings, figures and limits. Not to every sentence.
4. Never colour alone: shape + label always.
5. Never a traffic light. Colour never grades.
6. Never aggregated into a score, percentage or badge.
7. `Not testable` is never rendered as zero, in any figure, ever.
8. Unattributed volume is drawn at true proportion, never as a residual.
9. Limits get equal visual weight to claims, adjacent to them, never below the CTA, never collapsed by default.
10. Client-supplied data is visually marked as the client's.
11. No proof container without proof in it.
12. Sparse is correct. Do not fill.
13. **No visual amplification of a claim classified at ladder level D or E** *(added 2026-09-01)*. Inference-class statements may be set plainly in the argument register. They must never be enlarged into a typographic graphic, pulled out as a display statement, set as a figure caption, animated, or used as a section opener at display scale. **Amplification converts a hedged inference into an assertion.** See `20_CORRECTION_PASS_GOVERNANCE.md` §1 for the live example that produced this rule.
14. **No invented proportion in any figure** *(added 2026-09-01)*. Where no measured proportion exists, a figure shows categories and relationships and must not imply a quantity. A plausible-looking attribution split is a fabricated statistic in graphic form.
15. **The proportion rule** *(added 2026-09-01)*. Gaps and limits must not out-weigh what the firm does and is accountable for. `17_ARGUMENT_APPARATUS_HIERARCHY.md` §4.4; anti-pattern B32.
