# Repetition and Drift Audit — Complete Homepage — Session 15 — PROPOSED

**Session:** 15 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Specimen:** `prototype/homepage.html`
**Method:** every count below was **taken from the rendered page**, not from the source or from
memory. THE RECORD is a system of discipline, not decoration, and the discipline is checkable
because the failure modes are integers.

---

## 1. Repetition census — the whole page

| Device | Count | Budget | Verdict |
|---|---|---|---|
| **Hairline rules** | **4** | unrationed, but never decorative | Each opens an ordinary section. **Four rules across nine WIDE screens / thirteen NARROW screens** |
| **Set-piece rules** | **2** | max 2 | **At budget** |
| **Register labels** | **2** | max 2 (RL-4) | **At budget.** Both on set-pieces with their own headings (RL-1); neither dominant in any band (RL-5) |
| **Ground changes** | **2** | max 2 | **At budget** — the boundary and the action region |
| **Annotation ties** | **3** | one per apparatus block | Three apparatus blocks: the disclosure body, the figure caption, the block 6 provenance |
| **Evidence disclosures** | **2** | — | **Both closed by default.** Nothing load-bearing is inside either |
| **Limits regions** | **1** | — | Always open. **0 inside a disclosure** |
| **Figures** | **2 elements, 1 object** | 1 full-weight figure per page | Block 3 FULL + block 4 STATE on the same chain. Only one is full weight |
| **Rendered drawings** | **2** at any width | — | The horizontal and vertical forms of each figure are alternatives; only one of each pair renders |
| **Status marks** | **2** | — | `measured`, `not testable`. Both in one apparatus block |
| **Dashed strokes** | **8** | figures only | All eight are inside figures. **Zero dashed rules anywhere else** |
| **Cards** | **0** | — | |
| **Icons** | **0** | — | No capability icon, no heading icon, no CTA icon, no icon font |
| **Images / photographs** | **0** | — | |
| **Shadows, elevations, radii > 2px** | **0** | — | Checked across every element on the page |
| **Fixed or sticky elements** | **0** | — | Non-sticky header; no sticky CTA anywhere |
| **PRIMARY action objects** | **2** | max 2 | First screen and end of page |
| **Peer action objects** | **2** | — | Beside each primary, at equal confidence |
| **Textual actions** | **4** | placed at the argument, not at a rhythm | Blocks 2, 3, 4 and 7. **Three of eight sections end with no CTA at all** |
| **Running animations** | **0** | — | |
| **Elements with a transition or animation** | **0** | — | |
| **Scripts** | **1** (~15 lines, navigation only) | — | Nothing depends on it |

**Two devices were removed during this session because the census caught them**, not because they
looked wrong:

- **Four per-item hairlines** on the capability routing list — rules with no meaning attached. The
  page would have carried **8** hairlines instead of 4.
- **A footer legal line** that was drawing content in the blocked entity block's space.

**Excluded from the census, and why.** The narrow navigation panel adds eleven separator rules when
it is open. It is a **transient interaction state**, not page chrome, and it is not on screen while
the page is read. It is recorded here rather than silently dropped.

---

## 2. Cumulative visual fatigue — the honest reading

**Where the page is genuinely disciplined.** Four hairlines and two register labels across thirteen
mobile screens is sparse by any measure. Three of eight sections carry no evidence apparatus at all.
Block 7 carries no device of any kind. There is no card, no icon, no photograph and no motion.

**Where the page is at its densest, and it is one place.** Block 4 into block 6. Between them they
carry both set-piece rules, both register labels, one ground change, two of the three ties, both
status marks, the state figure and the whole provenance apparatus. If this page has a fatigue
problem, that is where it is — and the measured evidence is that **block 5 sits between them**,
carrying no apparatus at all, which is what stops the two set-pieces from reading as one long
machinery section.

**A risk this page does not yet prove is solved.** The homepage is the route most entitled to spend
both register labels and both ground changes, because it has two genuinely epistemic set-pieces. It
spends every budget to its limit. **A page that spends every budget cannot absorb a later addition,
and there is no evidence yet about what twenty-two pages at this density feel like in sequence.**
That is carried to `07_OPEN_DESIGN_RISKS.md` rather than resolved by assertion.

---

## 3. Drift test — what does this page read as?

Assessed by looking at the rendered page at both widths, against the seven named perceptions.

| Perception | Present? | Evidence from the page |
|---|---|---|
| **Modern commercial marketing firm** | **YES — dominant** | The largest object on the page is a commercial imperative at 88px. The first screen offers two conversion actions and nothing else. Every section heading is a buyer's question. The page routes to seven commercial pages. Nine of nine WIDE bands are emphasis-led by commercial content |
| **Archive** | **No** | Four rules on a page nine screens long; no entry list, no index, no dates as structure, no catalogue numbering, no monospace outside metadata, no reverse-chronological anything. The one dated thing on the page is a single measurement's provenance |
| **Publication / editorial** | **No, with one honest caveat** | No byline, no author, no article furniture, no pull quote, no drop cap, no rule-and-serif masthead, no reading-time, no "related reading". **The caveat:** the reading column plus a right-hand apparatus margin is a form that also appears in editorial design. What distinguishes it here is that the margin holds provenance rather than commentary, appears **once**, and collapses inline below 1000px |
| **Research organisation** | **No** | No abstract, no method section, no citation apparatus, no figure numbering, no references list, no footnotes. Provenance appears at **one** place on the page and is attached to a claim rather than presented as a finding |
| **SaaS** | **No** | No card grid, no feature matrix, no pricing table, no gradient, no product screenshot, no dashboard, no illustration set, no rounded pill, no shadow, no "trusted by" strip |
| **Consultancy** | **No** | No named framework, no process diagram of three tidy stages, no capability wheel, no maturity model, no partner photography |
| **Generic digital agency** | **No** | No logo wall, no metric tiles, no testimonial carousel, no case-study grid, no award badges, no stock imagery, no animated counter |

### 3.1 The one thing that could become drift, named rather than rationalised

**The apparatus margin is the page's only editorial-adjacent form.** It is safe here because it is
used once, on the page's one mechanism claim, and because it disappears below 1000px. **It would
stop being safe if a later page used it on every claim.** The correct guard is a budget on the
margin form itself, and there is not one yet — recorded in `07`.

### 3.2 What the drift test cannot tell us
It is one page, judged by the person who designed it. **The cumulative question — what twenty-two
pages of this read as, in sequence, to someone who has not read the doctrine — is not answered and
is not claimed to be.**

---

## 4. Verdict

> ### **No material drift from the intended perception.**
> ### **No major repetition problem on this page.**
> ### **One named repetition risk carried forward: every device budget is spent to its limit, and there is no headroom for a later addition.**
