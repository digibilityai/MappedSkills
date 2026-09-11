# Claims Ladder — APPROVED

**Session:** 10 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **APPROVED — 2026-09-01 (Gate 8, `DEC-013`).**
**Governed by:** `docs/05-content/CLAIMS_AND_EVIDENCE_GOVERNANCE.md` (approved, Gate 7), `SOURCE_AND_EVIDENCE_POLICY.md`, Project Rules 15 and 18, `DEC-007`.

> **This document does not replace `CLAIMS_AND_EVIDENCE_GOVERNANCE.md`.** That document classifies a claim by **the evidence behind it**. This ladder classifies the same claim by **how strongly it may be said**. Both are assigned at brief stage, and §2 maps them onto each other. **Where they appear to conflict, the governance document governs.**

---

## 1. The ladder

| Level | Name | Definition | Publication rule |
|---|---|---|---|
| **A** | **FACT** | Directly verifiable by the reader, from a primary source or from something checkable about MappedSkills itself | **Statable plainly**, with the source and its retrieval date where it is external |
| **B** | **OBSERVATION** | First-party measurement MappedSkills performed | **Statable with sample size, date, location, method and run counts attached.** Never without them |
| **C** | **CAPABILITY** | Something MappedSkills can demonstrably do | **Statable as what the firm does** — never as what it will achieve |
| **D** | **EXPECTED EFFECT** | A reasonable causal expectation, qualified | **Statable only as a labelled judgement**, with the mechanism named and **no number** |
| **E** | **CLIENT OUTCOME** | A result produced for a client | **Requires permissioned client evidence meeting the ten-point threshold.** None exists today, so **nothing at this level may currently be published** |
| **F** | **PROHIBITED / UNSUPPORTED** | Anything that cannot be placed at A–E | **Removed, or rewritten downward to D as an explicit judgement.** Never smuggled through as a fact |

---

## 2. Mapping to the evidence-class model

The two systems are orthogonal and are used together. **A sentence carries one governance class and one ladder level.**

| Ladder level | Corresponding governance class(es) | Note |
|---|---|---|
| **A — FACT** | **C** (primary-source verified) · **A** (first-party measured, where the fact is about MappedSkills itself) | A fact about a platform is class C; a fact about MappedSkills' own configuration is class A |
| **B — OBSERVATION** | **A** (first-party measured) | The measurement disclosure requirements are the governance document's, unchanged |
| **C — CAPABILITY** | **A** or **C**, depending on what demonstrates the capability | A capability with nothing demonstrating it is **not** level C — it is level D at best |
| **D — EXPECTED EFFECT** | **E** (opinion / inference), always labelled | Never phrased as a finding |
| **E — CLIENT OUTCOME** | **B** (client-supplied) | Gated on `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §6, all ten items |
| **F — PROHIBITED** | **F** (unsupported), plus the named prohibitions | Includes "300%+ ROI", "₹100Cr+", "₹10Cr+" |

**Secondary-source material (governance class D)** does not have its own ladder level. It enters as **A** where the source is being reported accurately as a fact about what that source says, and as **D** wherever it is being used to support an expectation. **It never becomes B** — another company's figure is not MappedSkills' observation.

---

## 3. The verb ladder

The most common way a claim climbs a level it has not earned is through the verb. **Each level has a permitted verb register.**

| Level | Permitted verbs and constructions | Constructions that indicate the claim has climbed |
|---|---|---|
| **A** | "is" · "does" · "states" · "returns" · "allows" · "contains" | — |
| **B** | "we measured" · "we observed" · "across *n* runs on *date*" · "appeared in *x* of *y*" | "we found that businesses…" *(generalising a single-subject measurement)* |
| **C** | "we do" · "we build" · "we instrument" · "we diagnose" · "we report" | "we deliver *results*" · "we drive" · "we grow" · "we increase" |
| **D** | "should" · "is intended to" · "our judgement is" · "in our reading of the evidence" · "we would expect to see, and here is why" | "will" · "typically" · "on average" · "up to" · "proven to" |
| **E** | "the client's system recorded" · "over *dates*, against a baseline captured on *date*" | Any client outcome without permission, baseline, period and limitations |
| **F** | **None** | — |

**The rule:** a sentence may be written at a lower level than its evidence allows. **It may never be written at a higher one.**

---

## 4. MappedSkills-specific examples

Real cases from this programme's evidence base, so the ladder is usable rather than abstract.

### Level A — FACT

- "Google states that optimising for generative AI search 'is thus still SEO'." *(Source, publication date and retrieval date attached; re-verified at publication — Project Rule 19.)*
- "Google-Extended does not affect a site's inclusion in Google Search — Google states this directly."
- "`GPTBot`, `ClaudeBot`, `Google-Extended` and `CCBot` govern training. `OAI-SearchBot`, `Claude-SearchBot` and `PerplexityBot` govern retrieval."
- "Our own `robots.txt` blocks no AI crawler."
- "There is no documented way to appear in normal search snippets while excluding AI Overviews."

### Level B — OBSERVATION

- "Across 28 unbranded runs on 2026-08-31, from Pune, in English, signed out, on four systems, MappedSkills appeared zero times."
- "In 7 of 8 branded runs, the systems that could search the live web described MappedSkills substantially accurately."
- "`agencies.semrush.com` appeared as a source in 10 of those 28 runs; `clutch.co` in 5."
- "Membership was often stable within a system across repeats; order changed in every repeated prompt."
- "Our production contact form has no `action` and no `method` and transmits nothing, while showing a success screen." *(First-party diagnosis, dated.)*

**Each of these is unpublishable without its sample, date, location and method.** Stripping the qualifiers converts a level B observation into a level F claim.

### Level C — CAPABILITY

- "We instrument the path from source through to qualified enquiry, and report against a baseline we capture first."
- "We diagnose which of four things is losing a business its enquiries before recommending a fix."
- "We measure presence in AI answers per system, publish the run counts, and do not blend systems."
- "We build the enquiry path, rather than only recommending changes to it."
- "We state what cannot be attributed, in the report itself."

**Test for level C:** could MappedSkills demonstrate this to a sceptical prospect within one meeting, using something that already exists? If not, it is level D.

### Level D — EXPECTED EFFECT

- "Businesses in this position usually have the loss in one of four places, and our judgement is that measurement is what tells you which — because without it, the same symptom appears in all four."
- "Directory profiles and reviews are, on the evidence we have, where the constraint sits for a firm absent from AI answers. That is a reading of a mechanism we observed, not a guarantee that creating profiles will produce appearances."
- "Organic is a 12-month-plus horizon. That is our position from three independent evidence bases, and it is a horizon, not a schedule."

**Every level D sentence names the mechanism, and none contains a number.**

### Level E — CLIENT OUTCOME

**Currently empty. Nothing may be published at this level.**

The form a level E claim would take once permissioned: *"Between [dates], against a baseline captured on [date] from the client's own analytics, [client] recorded [figure] in their system. MappedSkills did [X] and did not control [Y]. The following could not be isolated: [list]."*

Until every one of the ten evidence-threshold items is satisfied, **no client result appears anywhere on the site in any form, including anonymised.** `/work` stays `noindex`, out of navigation and out of the sitemap, and **no CTA references case studies that do not exist.**

### Level F — PROHIBITED

- **"300%+ ROI", "₹100Cr+", "₹10Cr+"** — unsupported, of unknown provenance, and verified as being redistributed by Google AI Mode and Perplexity as fact about the company.
- "Over half of our clients continue beyond a single campaign" — an existing on-site claim recorded as **NOT VERIFIED**.
- Any guarantee of ranking, traffic, enquiry count, citation, revenue or ROI.
- Any AI Visibility Score, average AI rank or blended cross-system figure.
- Any conversion benchmark, industry average or "clients typically see" statement.
- "Best", "leading", "top", "#1", "award-winning" — no verifiable, dated, third-party basis exists.
- Any search volume, keyword difficulty or CPC figure — **none has ever been obtained in this programme.**
- Any statement about international or export winnability — **no international SERP or AI answer has ever been observed.**
- Any statement about Claude or Grok — **not testable; no baseline exists.**
- "Competitor X has no AI visibility."
- Any trend or improvement in AI visibility — **there is one measurement.**

---

## 5. Rules of use

1. **Assign at brief stage, before the sentence is written.** A page brief lists every significant claim with its governance class and its ladder level. **Level F claims are removed before writing begins.**
2. **A claim never climbs silently.** Rewriting a level D judgement in level C verbs is the most common failure and is treated as a defect, not a style choice.
3. **A claim may descend.** Where evidence is thin, write the level D version rather than dropping the point entirely — provided the mechanism is named.
4. **A number is level B or it is not written.** There is no level at which an unsourced figure is permitted.
5. **Level C requires a demonstration, not an intention.** "We can" without something that shows it is level D.
6. **The evidence-link rule applies at every level above A.** A claim that needs supporting evidence links to it; a claim whose supporting asset does not exist yet **is not written yet**.
7. **A claim nobody can classify does not publish.** Carried unchanged from `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §7.
8. **This ladder is enforced by `MESSAGE_QUALITY_GATE.md` items 6, 7, 8 and 19.**
