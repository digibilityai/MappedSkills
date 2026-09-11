# Visual Anti-Pattern Audit — Session 14 — PROPOSED

**Session:** 14 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** The selected direction, tested against every named drift and against
the eight tests in `14_DESIGN_ANTI_PATTERNS.md` §D.

**Method.** Each row is checked against the **rendered** proof, not against intent. Where a
prohibition is enforced by the stylesheet rather than by discipline, that is stated, because a
structural guarantee and a promise are not the same evidence.

---

## 1. The ten drifts the brief names

| # | Drift | Verdict | Evidence in the rendering |
|---|---|---|---|
| 1 | **Academic / archive** | **RESISTED — with the direction's named residual risk** | No serif, no cream, no paper texture, no letterpress, no masthead, no column rules, no running heads, no folios, no typewriter face, no file/dossier/index-card metaphor, no "issue" or "volume" framing. Rules are **horizontal only and rationed**. Register labels are lowercase and plain, not small-caps section headers. **Residual:** the vocabulary is generative — a designer who adds a rule and a label to every block gets a spec sheet. The mitigation is that rules and labels are **countable** |
| 2 | **Newspaper** | **RESISTED** | No vertical column rules anywhere · no multi-column text · no masthead · no deck/kicker structure · no justified setting · body is one protected column at 66ch |
| 3 | **SaaS** | **RESISTED — structurally** | No fill, no elevation, no shadow, no gradient, no glass, no pill, no tile. Radius capped at 2px. The evidence band has **one edge, not four** — it is a bounded region, not a card. No product shell, no nav rail, no chrome |
| 4 | **Generic agency** | **RESISTED** | No gradient · no hero image · no logo wall · no rating strip · no testimonial · no counter · no icon grid · no bento · no "trusted by". The distinctive material is the apparatus, the drawn status vocabulary and the instrument-scale figures |
| 5 | **Dashboard** | **RESISTED — structurally** | No KPI tile, gauge, sparkline, chart furniture, panel, filter bar or date picker. **The status vocabulary cannot aggregate**: there is no score, percentage, badge, meter or traffic light in the vocabulary, so the dashboard cannot be assembled from the parts |
| 6 | **AI cliché** | **RESISTED** | No purple, no gradient, no brain, no robot, no sparkle, no chat bubble, no neural wallpaper, no prompt field, no dark AI shell. AI systems appear as **plain words in ordinary prose**. The accent is a petrol ink chosen partly to sit away from both SaaS blue and AI purple |
| 7 | **Over-cardification** | **RESISTED** | **Zero cards in all four slices.** Grouping is by rule and space. The one card pattern the direction permits — research/article index entries — is not one of these four content types and does not appear |
| 8 | **Excessive apparatus** | **RESISTED** | Zero apparatus above the homepage fold and above the `/seo` fold · zero apparatus in or beside any CTA region · mid-page provenance is **expandable and closed by default**, so the resting state of a commercial page shows the argument and a control, not machinery |
| 9 | **Evidence becoming decorative** | **RESISTED** | Every apparatus element on screen carries a date, a sample, a source, a scope note or a status. There is no ornamental provenance, no decorative citation mark and no "evidence-flavoured" graphic. The dashed line has exactly one meaning and appears only where something is genuinely not measured |
| 10 | **Commercial hierarchy lost** | **RESISTED** | The largest object on every screen is a commercial statement. The **consequence statement out-ranks the section heading by design**, which is what makes `16` §4 A3 enforceable. See `06_GATE10_DEFERRED_F2_F3_RETEST.md` |

---

## 2. The MappedSkills-specific prohibitions, checked individually

| # | Prohibition | Verdict |
|---|---|---|
| **B1** | Not-testable rendered as a zero | **PASS.** Hatched square + the words *not testable* + `This is not a zero.` **No mark, no bar and no position on any scale.** Distinguishable in greyscale, verified |
| **B2** | Funnel or taper | **PASS — structurally.** Constant stroke, identical node size, equal spacing. The stylesheet offers no taper |
| **B3** | Three-step process graphic reading as three services | **PASS.** Six points, no numbering, no icons, no chevrons, unequal-length segments only where a PARTIAL emphasises one |
| **B4** | Designing F17 | **PASS.** Nothing anywhere. No diagram could be mistaken for a delivery process — the run is explicitly labelled as what is measured, and its marks are labelled *work is done here*, not stages of a service |
| **B5** | Disclaimer typeface treatment for limits | **PASS.** Limits are argument register, body size, full measure, always open, with a set-piece rule above them. Nothing about them is smaller, greyer or italic |
| **B6** | Red-amber-green, or colour that grades | **PASS.** No hue carries meaning anywhere. Verified in greyscale |
| **B7** | Aggregating evidence status | **PASS.** No score, percentage, badge, coverage meter or summary. The vocabulary has no aggregate form |
| **B8** | Ranking / leaderboard / position graphic | **PASS.** None. Nothing is ordered by value |
| **B9** | A single blended figure across AI systems | **PASS.** No per-system figure was built at all — F3 is out of scope, and the measurement is presented at its approved aggregate wording with its provenance |
| **B10** | A trend from one measurement | **PASS.** No line, arrow, delta or change indicator. The scope note *"one measurement is not a trend"* is rendered |
| **B11** | Hub-and-spoke with the client's site at the centre | **PASS.** None |
| **B12** | AI as a visual theme | **PASS.** None |
| **B13** | Search iconography as decoration | **PASS.** No magnifier, no engine logo, no SERP wallpaper |
| **B14** | Capability card grid on `/` or `/services` | **PASS.** No capability block was designed in these four slices, and no card exists in the vocabulary to build one from |
| **B15** | A proof container without proof in it | **PASS.** Every apparatus region in the proof contains real approved content. **No empty container exists** — see §5 |
| **B16** | Sticky CTA on credibility pages | **PASS.** Nothing is sticky anywhere; the header is non-sticky by default |
| **B17** | Proof on `/contact` or `/schedule-call` | **N/A.** Neither surface is in these four slices |
| **B18** | A branded name for the method, chain, run or any stage | **PASS.** Every label is a plain description. No coined term appears anywhere, in copy or in a figure |
| **B19** | Reusing the prohibited production claims | **PASS.** Not present |
| **B20** | Manufactured urgency, response-time promises, countdowns | **PASS.** None |
| **B21** | Industries grid or manufacturing imagery | **PASS.** None |
| **B22** | A gap illustrated as an empty state, spinner, "coming soon" or error | **PASS.** The measured zero is set at consequence scale as a **finding**; the unattributed arrival is drawn as a real arrival; the not-testable state is a labelled condition. No empty-state grammar anywhere |
| **B23** | A dashed line used decoratively | **PASS — enforced beyond the requirement.** There is no decorative dashed rule in the stylesheet, and the **validation chrome was deliberately drawn solid** so the convention is not diluted even in a document nobody ships |
| **B24** | Making the run ambient | **PASS.** It appears once, as a figure. Not in a header, background, divider, loader, transition or pattern |
| **B25** | A gated diagnostic | **N/A.** Not in these four slices |
| **B26** | A lead score, grade or quality rating | **PASS.** None |
| **B27** | Apparatus above the fold on a commercial page | **PASS.** Zero on both the homepage hero and above the `/seo` fold |
| **B28** | A limit before the capability it limits | **PASS.** `/seo`: work → boundary → measurement → measurement limits. Homepage: mechanism → boundary |
| **B29** | A collapsible or collapsed limits section | **PASS — structurally.** Limits are not inside a disclosure at any width, in print, or with script disabled. There is no state in which a limit is closed |
| **B30** | Apparatus in or beside a CTA region | **PASS.** The `/seo` action region carries no provenance, scope note or limit |
| **B31** | Archival or paper skeuomorphism | **PASS.** Enumerated in §1 row 1 |
| **B32** | Honesty by volume | **PASS.** See `06_…_RETEST.md` §3 |

### 2.1 Generic anti-patterns with a non-obvious result

| # | Note |
|---|---|
| **A12** *(oversized empty hero)* | **PASS — but it failed first.** At the initial H1 measure the hero left the right half of the frame empty, which is the exact device the anti-pattern cites. Corrected by widening the H1 measure so the headline occupies the width. **Recorded because it demonstrates the anti-pattern is live, not theoretical** |
| **A19** *(carousels)* | **PASS.** No paged region. The one scroll container — a wide figure at MEDIUM — has all content in the DOM and is keyboard-reachable, which A19 as amended explicitly permits |
| **A20 / B29** *(collapsed load-bearing content)* | **PASS.** The `EXPANDABLE` apparatus pattern is used for provenance only. No limit, no attribution honesty and no methodology statement is ever inside a control |
| **A23** *(section banding)* | **PASS, and counted.** One deliberate ground change on the `/seo` section (the boundary set-piece) and one on the evidence specimen sheet. **Never alternating, never per-section.** The budget is two per page and it is not exceeded |
| **A14** *(fake terminal / code aesthetic)* | **PASS — with a live risk.** Monospace is used, at 16px, for metadata only. It never appears in a headline, in body copy, in a CTA, on a dark ground, or with a caret or prompt. **The risk is real and the guard is a size and role boundary, not a structural impossibility** |

---

## 3. Test 6 — The standalone test

> *Hide every apparatus element. The page must still sell.*

**Run against each slice.**

| Slice | With all apparatus removed | Verdict |
|---|---|---|
| **1 — hero** | Unchanged. There is no apparatus above the fold | **PASS, trivially** |
| **2 — evidence** | Reduces to: *"We have no case studies to show you… What we do have is published, dated and checkable."* and *"Zero appearances, in twenty-eight unbranded runs."* Both are argument-register statements and both still make the case | **PASS** |
| **3 — F1** | The chain, its six points, the boundary and the unattached arrival are the **figure**, not apparatus. The figure caption is apparatus and its removal costs nothing | **PASS** |
| **4 — `/seo`** | Reduces to: the boundary (argument register), *"After that, the report is enquiries"*, the measurement paragraphs, the figure, and the attribution limit. **The section still sells** — what is lost is the method disclosure and the provenance lines | **PASS** |

**The apparatus is pure addition in all four slices.** No slice depends on it to make its
argument. This is the rule Session 12 identified as most likely to erode; it has not eroded here.

---

## 4. Test 1 — The swap test

> *Replace every word with a competitor's. If the design still works, it fails.*

**Result: it fails to work, which is the pass condition.**

A competitor putting their copy into this system inherits: a register label naming a region called
*the boundary*; an always-open limits block set at the same weight as their claims; a status
vocabulary containing *not testable*, *unmeasured* and *unattributed*; a figure with a dashed
segment meaning "we do not measure this" and a drawn point where accountability stops; and a
provenance line demanding what · when · where · how many · by whom.

**Every one of those is a place a competitor would have to publish something they do not have,**
or delete the element and leave the layout visibly short. The design does not survive the swap,
because the design is shaped around admissions.

---

## 5. Test 2 — The empty-container test

> *Point at every container. If any could hold proof MappedSkills does not have, remove the
> container — not just its contents.*

| Container in the proof | Could it hold absent proof? |
|---|---|
| Evidence band | Only if it contains a provenance line, and it does. **An empty band renders as nothing** — it has one edge and no dimensions of its own |
| Status mark | It is a mark plus a word. There is no empty state |
| Limits block | Plain text at full measure. Empty, it is absent |
| Figure | Drawn from approved relationships. **No quantity is drawn anywhere in any figure** |
| Homepage fifth first-screen slot | **Nothing is drawn.** No container, no placeholder, no outline, no label — the launch default is four elements |

**No container in the vocabulary reserves a position for proof that does not exist.** The six
production components that render exactly these containers — `HeroDashboard`, `SocialProofStrip`,
`StatCard`, `TestimonialCard`, `BeforeAfterMetric`, `CaseStudyCard` — have **no counterpart** in
this visual language.

---

## 6. Test 4 — The "how do you know that?" test

Asked of every number and figure in the proof.

| Number or figure | Visible answer |
|---|---|
| *28 unbranded runs* | Provenance line: four AI assistants · 28 unbranded runs · one day, 2026-08-31 · Pune · English · signed out |
| *Zero appearances* | Same provenance line, adjacent, plus `measured` status and the scope note *one measurement is not a trend* |
| *Claude and Grok* | `not testable` status plus the stated reason — sign-up gated, no answer returned — plus the explicit refusal to claim anything further |
| *12-month-plus* | Expandable: stated as a **position, not a schedule**, with its basis and the statement that **no month is promised** |
| F1, both states | Figure caption plus a full tabular equivalent, including an explicit row stating that **no quantity is drawn** |
| F1 PARTIAL | Tabular equivalent, including a row explaining **why the recessive remainder is not dropped** |

**There is no number anywhere in the proof without its provenance attached, and no figure that
implies a quantity.**

---

## 7. Tests 3, 5 and 7 — briefly

- **Test 3, greyscale:** run in the browser. No status, state or figure becomes ambiguous.
  Measured zero and not testable remain distinct by shape and word. **PASS.**
- **Test 5, screenshot with motion disabled:** trivially satisfied. There is no motion; every
  screenshot in this session *is* the primary state. **PASS.**
- **Test 7, first fixation:** `06_GATE10_DEFERRED_F2_F3_RETEST.md` §2.

---

## 8. Where the audit is weakest

Recorded so this document reads as an assessment rather than a defence.

1. **Four slices are not a site.** Card-drift, banding-drift and apparatus-accumulation are all
   **cumulative** failures. Four screens cannot demonstrate their absence across twenty-two
   routes; they can only demonstrate that the vocabulary does not force them.
2. **The archive-drift verdict is the direction's own named residual risk, not a clean pass.**
   The vocabulary is generative and the guard is a counting discipline that has to be applied at
   every review.
3. **The monospace guard is a boundary, not an impossibility.** Nothing structurally prevents a
   later designer from enlarging it into a credibility signal.
4. **The `changed` state pair was not visually validated at all** — the asset is blocked, and
   rendering an "after" condition would have fabricated it. The territory's strongest evidence of
   intervention therefore remains untested.
5. **No user testing occurred and none is claimed.** Every perceptual verdict in this document is
   a structured design judgement against a stated rule, not a measurement of a real reader.
