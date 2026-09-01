# Research Content Strategy — PROPOSED

**Session:** 09 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 7 is not passed by this document.
**Corrected:** 2026-09-01 (orchestrator correction pass — §6A added).
**Surface:** `/research` and `/research/{slug}` — new at launch, with **two genuine entries**.

**Substantive scope unchanged by the correction pass.** Both launch entries keep the scope defined here and in their briefs.

---

## 1. Why `/research` exists, and what it is funded for

`/research` is separate from `/blog` because the job, cadence, schema and evidence standard differ. Mixing them weakens both and makes the research harder to cite.

**It is funded for vertical authority, sales credibility and client trust.** It is **not** funded for AI-citation acquisition — Session 04 looked for research assets being cited in 28 unbranded AI runs and **found none**. That is not a refutation (the prompt universe was vendor-selection-weighted), but it is the only direct evidence available and the architecture must not be justified against an expectation the evidence does not support.

**The single most important property:** research must remain useful to a reader who never hires MappedSkills. An asset that is only valuable as a sales artefact is not research, and it will be read as marketing.

---

## 2. What qualifies as MappedSkills Research

All five conditions must hold.

| # | Condition |
|---|---|
| 1 | **It reports first-party observation or measurement** that MappedSkills performed itself |
| 2 | **The method is published in enough detail to be reproduced** by a competent reader with the same access |
| 3 | **Every number carries its sample size, date, location, method and run counts** |
| 4 | **Limitations are stated in the asset**, including what was not measurable and why |
| 5 | **It is useful to a non-buyer** — someone could act on it without contacting MappedSkills |

## 3. What does NOT qualify

| Not research | Where it belongs, if anywhere |
|---|---|
| A compilation of other companies' statistics | **Nowhere.** DO NOT BUILD |
| A vendor benchmark restated as MappedSkills' finding | Nowhere. Prohibited by `DEC-007` and the source policy |
| An opinion piece, however well argued | A labelled interpretation section inside a research or methodology asset |
| A client case study | `/work`, when a permissioned one exists |
| A "state of the industry" report with no underlying dataset | Nowhere |
| A survey with an undisclosed sample or an unstated method | Nowhere |
| A one-off observation presented as a trend | Nowhere. **One measurement is not a trend** |
| A tool output dressed as a study | Nowhere |

---

## 4. Evidence standards

Binding on every entry, and visible on `/research` itself rather than buried inside entries.

1. **Sample size, date, location, language and access tier** on every measurement.
2. **Run counts published beside every frequency.** A number without its *n* is not a measurement.
3. **Per-system reporting, never blended.** Cross-system agreement collapsed in direct measurement; averaging destroys the only stable signal.
4. **Frequency, never rank.** Order was unstable in every repeated prompt. **"Average AI rank" and any blended "AI Visibility Score" are prohibited outputs**, in research as everywhere else.
5. **Stability stated per prompt or per measure.** Membership stability ranged from ~100% to ~40% *within one system on one day*. Reporting a fragile measure with the same confidence as a stable one is the category's core dishonesty.
6. **Explicit non-coverage.** Every entry names what it could not measure — for the AI baseline, that includes **two of the six charter systems, which were not testable at all**.
7. **No causal claim without causal evidence.** Consistency is not causation, and the entries must say so.
8. **Adverse findings are published.** An entry that only contains flattering results is not credible and will not be treated as research.

---

## 5. Source standards

Applies to any external source cited inside a research entry, in priority order:

1. Official platform and standards documentation;
2. First-party company material from the entity concerned;
3. MappedSkills' own primary measurement;
4. Credible research organisations with a published method;
5. Strong secondary reporting, labelled as secondary;
6. Community and practitioner sources, **labelled as sentiment, never as evidence for a high-stakes factual claim**.

**Every cited source records:** URL, publisher, title, publication date, retrieval date, the specific claim it supports, and whether it is primary or secondary. **A source is never cited for a claim it does not support.** Where sources conflict, the conflict is shown and the preference is justified — it is not silently resolved.

**Two named prohibitions carried from the programme's evidence record:** the Ahrefs 23× and Buffer 185% AI-visitor conversion multipliers must never be quoted as benchmarks — they are single-company figures with self-selecting audiences. The ~0.28% AI-referral-traffic figure is a **vendor blog citing an unaudited third-party panel** and must be re-verified before any client-facing use, with that caveat travelling with it.

---

## 6. Versioning, updating and citation practice

| Requirement | Specification |
|---|---|
| **Versioning** | Each measurement round is a **new version with its own date**, not an edit. Prior versions remain accessible. **Editing a published measurement destroys the trend the asset exists to establish** |
| **Update policy** | Corrections are made and **labelled as corrections**, with what changed and when. Substantive additions create a version; typo fixes do not |
| **Method freeze** | A recurring measurement uses a **frozen, pre-registered prompt or protocol set**, including items the subject is expected to fail. Changing the method starts a new series and says so |
| **Stable URLs** | A research entry's URL does not change. If a series continues, versions are additive |
| **Citation format** | Every entry states how it should be cited — title, author, organisation, date, version, URL — so a third party referencing it gets it right |
| **Dataset availability** | Where a genuine, non-confidential dataset exists, publish it in a plain machine-readable form alongside the entry. `Dataset` schema **only where a genuine dataset with provenance is published** — it is not decoration |
| **Confidentiality** | No client data, no client identity and no internal commercial material is published without written permission. Where a dataset would expose a client, it is aggregated or not published |

---

## 6A. Canonical research — one dataset, one URL

**Binding, and it applies to editorial as much as to research.**

> **An original first-party dataset or measured study has exactly one canonical research URL.** That URL owns the dataset, the methodology, the findings, the charts, the conclusions and the limitations.

**`/research/{ai-visibility-baseline}` is the canonical home for the Session 04 measured dataset** — the 39 runs, the per-system results, the source-domain frequencies, the variance observations and every stated limitation. **No other asset republishes it.**

**Editorial may interpret or apply a research entry only where it serves a materially different user intent**, and when it does it must:
1. **summarise only what is necessary** for its own argument;
2. **link to the canonical research** as the source of the dataset and the method;
3. **add materially different application or interpretation** — a different question, audience or decision.

**It must not reproduce substantially the same dataset, methodology, findings, charts or conclusion** in order to create another search page.

**The test, applied at brief stage:** if the article were published and the research entry deleted, **would the article still have a distinct reason to exist?** If not, it is a duplicate.

**Why this matters more here than on most sites.** MappedSkills has exactly one substantial original dataset. Publishing it at two URLs would split the authority of the single most distinctive thing it owns, make the reference ambiguous for anyone citing it, and produce two weaker assets in place of one strong one.

**Applied during the Session 09 correction pass:** a proposed editorial article built on the same 28-run findings was **withdrawn and replaced**. `how to get cited by ai` remains an unbuilt family, available to PHASE 2 only if an asset can be written that does not reproduce the baseline.

## 7. Author and method ownership

Every entry names an author and a **method owner** — the person accountable for how the measurement was run and for re-running it. `Person` schema is extended to research entries. A measurement with no named owner cannot be defended when questioned, which defeats the point of publishing it.

---

## 8. Commercial CTA rules on research

Carried from `PAGE_TYPE_CRO_RULES.md` §6 and made binding on content.

| Rule | |
|---|---|
| Primary CTA role | **RESEARCH** — open the entry, or subscribe to future ones |
| Secondary | PROOF, then PRIMARY **well below the fold** |
| **Sticky CTA** | **Not permitted** |
| **Mid-method interruption** | **Prohibited.** A research asset must not become an advert halfway through the methodology |
| Commercial links in body | **One or two contextual links maximum**, placed where genuinely relevant |
| Gating | **Never.** No email wall, no download gate, no "get the full report" |

**Why the restraint is commercial, not modest:** the launch entries publish MappedSkills' own **measured zero** — identified in 7 of 8 branded runs, 0 of 28 unbranded — as evidence of measurement honesty. A hard conversion push on that page contradicts the exact quality it exists to demonstrate, and any reader capable of judging the research will notice.

---

## 9. Launch entries

Two, both first-party, neither requiring client data or client permission. Full briefs in `research-briefs/`.

| Entry | What it publishes | Dependency |
|---|---|---|
| **`/research/{ai-visibility-baseline}`** | MappedSkills' own AI-discovery baseline across four systems and 39 runs, per system, with run counts, prompt universe, dates, location, access tier and stated non-coverage — including a **measured zero** in 28 unbranded runs | **Ready now.** The measurement exists |
| **`/research/{own-site-enquiry-diagnostic}`** | The documented, dated, reproducible diagnostic MappedSkills ran on its own site, the defects found, and what was changed | **Blocked until the fixes are actually shipped.** Published earlier it is a list of live defects, not proof |

**If the own-site fixes slip, `/research` launches with one entry.** That is preferable to publishing an unremediated defect list as though it were evidence of competence. `/research` still earns its navigation slot with one genuine entry; it would not earn it with zero.

---

## 10. What research must never become

- A lead magnet with a gate.
- A ranking, a score, or a league table of anyone.
- A "top agencies" list — MappedSkills has no standing to arbitrate a category it appears in zero times out of 28.
- A trend claim from a single measurement.
- A vehicle for a claim the underlying data does not support.
- A place where an unflattering result is quietly dropped between versions.

---

## 11. Future research, and one honest caution

`/research/{manufacturing-rfq-benchmark}` is classified **FUTURE** and is gated on client data MappedSkills does not hold. Sessions 02 and 03 rate a longitudinal vertical benchmark the strongest available content asset; Session 04 found **no evidence** that research assets earn AI citations for agency prompts in this market.

**Both are carried, and the resolution is recorded in `POSITIONING.md` §8:** fund the benchmark for vertical authority, sales credibility and client trust — **or not at all.** It must not be funded on an AI-citation expectation.
