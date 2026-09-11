# Creative Direction Quality Gate — Gate 9A (PASSED)

**Session:** 12 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PASSED — 2026-09-01, see `DEC-015` in `DECISION_LOG.md`.**
**Revised 2026-09-01** by the orchestrator correction / stress-test pass: **Part H added** (commercial energy and the argument/apparatus hierarchy), and §4's self-assessment updated. Parts A–G are unchanged.

> **No phase advances merely because an artifact exists.** That is the standing principle of `QUALITY_GATES.md`, and it applies to this session's own output. The fifteen documents in `docs/11-creative/` do not pass this gate; **only the orchestrator and owner can pass it, recorded in `DECISION_LOG.md`.**

**Claude's self-assessment against these items is recorded in §4. It is a declaration of what was attempted, not a pass.**

---

## 1. What this gate tests

Gate 9A asks one question: **is the creative direction specific enough to guide UX and design, and constrained enough that it cannot drift into the things the strategy rejects — without predetermining layouts?**

It does **not** test whether anybody likes it. Aesthetic preference is a legitimate owner decision and is handled in §3, separately, so that taste and correctness are not confused.

---

## 2. The gate items

Each must be answered **PASS · FAIL · NOT YET ASSESSABLE**, with a reason. **Any FAIL blocks the gate.**

### Part A — Strategic fidelity

| # | Test | Evidence to check |
|---|---|---|
| **A1** | Does the direction express the approved business strategy — capture demand, convert it into enquiries, measure the chain — rather than a technique category? | `06` §2; `07` §5 |
| **A2** | Does it support the approved messaging architecture, including the company-message versus search-landing-message distinction? | `06` §2.6; `07` §7; `04` T1.L |
| **A3** | Does it keep AI search **visible and subordinate**, with no AI section, hero, hype block or visual theme? | `09` §2; `14` B12 |
| **A4** | Does it avoid reducing the company to SEO? | `07` §7; `04` T1.L |
| **A5** | Does it preserve the approved H1 and page copy without restyling, rewriting or fragmenting them? | `04` T1.K; `12` scope statement |
| **A6** | Does it introduce **no** new company category, branded framework, methodology name or stage name? | `14` B18 |
| **A7** | Does it respect every approved CRO constraint that has a visual consequence — sticky-CTA prohibitions, no modals, no exit-intent, proof-free conversion surfaces? | `14` B16, B17, A18 |

### Part B — Credibility without fabricated proof

| # | Test | Evidence to check |
|---|---|---|
| **B1** | Does it feel commercially credible to a considered-purchase buyer **without** case studies, logos, ratings, awards or client counts? | `06` §3 |
| **B2** | Can it **survive without fake proof** — is there no container anywhere that requires proof MappedSkills does not have? | `14` B15 and test D2 |
| **B3** | Does it support evidence **honestly**, giving limits the same visual weight as claims? | `08` §5.3; `14` B5 |
| **B4** | Does it render absence — measured zero, unmeasured, unattributed, **not testable** — as distinct visual states, none of them a blank? | `08` §4–5 |
| **B5** | Is a not-testable system impossible to confuse with a measured zero, **including in greyscale and in the text equivalent**? | `08` §4 rule 4; `13` §2.8; `14` B1 |
| **B6** | Does it avoid inventing a dashboard, product UI, score, index or coverage figure? | `14` A3, B7 |
| **B7** | Does it prohibit every prohibited claim shape — rankings, trends from one measurement, blended cross-system figures, guarantees? | `09` §2.4; `14` B8–B10 |

### Part C — Differentiation

| # | Test | Evidence to check |
|---|---|---|
| **C1** | Is it visually differentiated from the category, on evidence rather than assertion? | `03` §4; `06` §5 |
| **C2** | Does it avoid agency clichés — funnels, arrows, growth metaphors, stock office photography, logo walls, superlatives, service tile grids? | `14` A11, A13, A16, A22, B2 |
| **C3** | Does it avoid **SaaS cosplay** — dark-for-credibility, product-UI heroes, bento grids, glassmorphism, terminal aesthetics? | `14` A2, A4, A5, A14 |
| **C4** | Does it pass the **swap test**: replace every word with a competitor's, and does the design still work? | `14` test D1 |
| **C5** | Is the differentiation **expensive in honesty rather than in craft** — i.e. hard to copy without publishing one's own provenance? | `06` §5 |

### Part D — Comprehension and commercial function

| # | Test | Evidence to check |
|---|---|---|
| **D1** | Is it understandable — does a first-time buyer learn what the firm does within about five seconds, in plain words, before any apparatus? | `04` T1.C; `06` §6.1 |
| **D2** | Does the **argument register lead every page**, so the site does not read as an academic paper? | `06` §6.1 |
| **D3** | Is it appropriate for an **India-first, owner-led** buyer, with phone and WhatsApp genuinely prominent? | `06` §6.9; `05` §2 item 11 |
| **D4** | Does it support conversion without hype — no manufactured urgency, no giant CTA, no counters? | `09` §3; `14` B20 |
| **D5** | Is the enquiry-arrival state treated as a designed surface rather than an afterthought? | `09` §3.3; `12` V-22 |

### Part E — Scale and content

| # | Test | Evidence to check |
|---|---|---|
| **E1** | Does it **scale across all approved page types** — 22 unconditional launch pages plus conditionals — without every page becoming identical? | `04` T1.L; `07` §7 |
| **E2** | Does it work for **research and editorial**, at length, without becoming exhausting? | `04` T1.M |
| **E3** | Does it **support visual explanation**, with the copy's own flagged opportunities identified and classified? | `12` §2–3 |
| **E4** | Does it ensure the site **does not have to be text-heavy** in order to be honest? | `01` §4 |
| **E5** | Does it define density behaviour per page type rather than applying one density everywhere? | `07` §7 |

### Part F — Craft, feasibility and standards

| # | Test | Evidence to check |
|---|---|---|
| **F1** | Is there a **coherent motion philosophy**, with essential, optional and prohibited classes separated? | `11` §3–5 |
| **F2** | Does every explanatory motion have a **complete static state** carrying the same information? | `11` §2 Q3, §7.3 |
| **F3** | Is it **feasible** on the current Next.js/Tailwind stack, without a research project? | `05` §2 item 15 |
| **F4** | Is it **accessible** — WCAG 2.2 AA achievable by construction, colour never the sole channel, focus visible, no hover dependence? | `13` §2 |
| **F5** | Is it **responsive**, with the apparatus surviving narrow screens as a content relationship rather than a layout feature? | `13` §3.2 |
| **F6** | Is it compatible with **very high page performance and Core Web Vitals** — nothing gating first paint, no heavy imagery, no text as image? | `13` §4 |

### Part H — Commercial energy and the argument/apparatus hierarchy *(added 2026-09-01)*

| # | Test | Evidence to check |
|---|---|---|
| **H1** | Does the visual system show that MappedSkills **acts**, not only measures — is there a vocabulary for intervention, consequence and dated change? | `16` §4A; `08` §4 *changed* state; `19` F7 |
| **H2** | Does **every page open fast**, with no page opening slow? | `16` §4B |
| **H3** | Is the emphasis hierarchy commercial — buyer problem and consequence first, methodology last — while the apparatus remains present everywhere? | `16` §4C; `17` §1 |
| **H4** | Do CTAs feel **prominent enough to sell, not aggressive, and not buried in editorial treatment**? | `16` §4D |
| **H5** | Do the commercial pages read as a supplier rather than a research institute — especially `/pricing`, `/contact` and `/schedule-call`? | `16` §4E |
| **H6** | Is there **visible human presence** sufficient to establish a working commercial organisation rather than a publication? | `16` §4F. **Currently blocked on the team/people owner input** |
| **H7** | **The standalone test.** Hide every apparatus element — does the page still sell? | `17` §1 Test 1 |
| **H8** | **The first-fixation test.** On every screen, does the eye land first on a commercial statement rather than on machinery? | `17` §1 Test 2 |
| **H9** | **The proportion test.** Do gaps, limits and not-testable states stay lighter in cumulative weight than what the firm does and is accountable for? | `17` §4.4; B32 |
| **H10** | Is the territory name's archival failure mode actively prevented — no paper, print, newspaper, typewriter or dossier styling? | `16` §7; B31 |
| **H11** | Is the direction **India-first appropriate** without resorting to colours, motifs, skylines or localisation gimmicks — with phone, WhatsApp and price genuinely prominent? | `16` §5 |

### Part G — The two meta-tests

| # | Test | Why it exists |
|---|---|---|
| **G1** | Is it **specific enough to guide UX and design** — could a designer who has read only these fifteen documents make correct decisions without inventing strategy? | A direction that is only adjectives cannot be applied or checked |
| **G2** | Is it **flexible enough not to predetermine layouts** — has it decided principles, prohibitions and relationships rather than screens, grids, components and values? | A direction that has already designed the site is not a direction. Gate 9B must retain real decisions |

**G1 and G2 pull against each other on purpose.** A direction that fails G1 is vague; one that fails G2 has done UX's job. Both are failures.

---

## 3. Owner and orchestrator judgement — kept separate from the gate

These are legitimate decisions that are **not** gate items, and the gate must not be used to settle them.

1. **Aesthetic preference.** Whether the owner likes The Record.
2. **Territory selection.** T1 is recommended; the orchestrator may select another, in which case documents `06`–`14` are superseded and must be rewritten against the selected territory.
3. **India-first register.** T1's weakest score (3/5) is a genuine risk. The owner is better placed than any Claude session to judge whether the record register will land with a Pune owner-buyer.
4. **Investment level.** The figures are the site's principal assets and require real craft. Whether that budget exists is an owner decision.
5. **Photography.** Whether named-person portraits will be produced, and of whom, depends on the blocked team input.
6. **The `docs/11-creative` / `docs/11-schema` / `docs/08-design` numbering and overlap.** A repository-hygiene decision, not a creative one. **Resolved 2026-09-01** — `docs/08-design/` retired, `docs/11-schema/` moved to `docs/15-schema/`, `docs/11-creative/` unchanged.

---

## 4. Claude's self-assessment — a declaration, not a pass

| Part | Claude's view | Notes |
|---|---|---|
| **A — Strategic fidelity** | Believed satisfied | Every rule traced to a frozen or approved document. No approved decision reopened. No copy altered |
| **B — Credibility without fabricated proof** | Believed satisfied | **B5 is the item most likely to be violated later in implementation.** It is a design requirement, an accessibility requirement and an honesty requirement simultaneously |
| **C — Differentiation** | Believed satisfied, on directly observed evidence | Six competitor entry screens and eleven references observed 2026-09-01. **Limit: entry screens only, desktop only, one day, one location** |
| **D — Comprehension** | **Believed satisfied, with a stated residual risk.** | **Updated 2026-09-01.** D3 remains the weakest point, now scored **4/5** after refinements R1–R10 (`16` §5). **It is not resolved:** the register stays more restrained than the category norm and **has never been tested with a real Indian buyer.** Mitigations are specified; they are mitigations, not proof |
| **H — Commercial energy** *(added 2026-09-01)* | **Believed satisfied as direction; NOT YET ASSESSABLE as outcome.** | The correction pass found and fixed a genuine contradiction — the territory had no vocabulary for action. **H6 is blocked** on the team/people owner input. **H7 and H8 are the two items most likely to fail silently in execution**, because the apparatus degrades gradually and no single screen looks wrong while it does |
| **E — Scale and content** | Believed satisfied | 22 flagged and additional visual opportunities identified against actual approved copy |
| **F — Craft and standards** | **NOT YET ASSESSABLE in part.** | F3, F4, F5 and F6 are *design intentions* here. **No build was run, no page was rendered, no contrast was measured and no accessibility or performance test was executed in this session.** They become assessable at Gate 9B and in `docs/14-qa/` |
| **G — Meta-tests** | Believed satisfied | No layout, grid, component, font, colour value or type scale is specified anywhere in `docs/11-creative/` |

**Nothing above is a claim that any test was run.** No test was run. **Do not read this table as evidence of compliance.**

---

## 5. Gate status

> **Gate 9A — Creative Direction: NOT PASSED.**
>
> Artifacts delivered. Orchestrator and owner review pending. Passing this gate is an orchestrator and owner action recorded in `DECISION_LOG.md`, which this session did not and must not modify.

**On approval, the following become binding on Gate 9B and the design-system phase:** `14_DESIGN_ANTI_PATTERNS.md` in full · the ten protections in `06_RECOMMENDED_ART_DIRECTION.md` §6 · the twelve evidence rules in `08_EVIDENCE_DESIGN_LANGUAGE.md` §8 · the three motion rules in `11_MOTION_AND_INTERACTION_PRINCIPLES.md` §7.
