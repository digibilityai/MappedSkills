# F2 and F3, Re-Run Against the Complete Homepage — Session 15 — PROPOSED

**Session:** 15 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Specimen:** `prototype/homepage.html`, rendered with **no validation chrome**
**Rubric:** `docs/17-visual-validation/09_VISUAL_WEIGHT_RUBRIC.md` — **applied unchanged.**

> ### The rubric was not modified, re-scoped or reinterpreted to make this page pass.
> No class boundary, no channel order, no verdict condition and no threshold was touched. The
> register-label rule (`08_REGISTER_LABEL_RULE.md`) was likewise applied as written. **The rubric
> file is unmodified on disk and this document changes nothing in it.**

---

## 1. Method, stated so it can be checked or disputed

The page was divided into consecutive bands **one rendered viewport height tall**, at each width,
counted from the top of the page content. For every rendered text node the script recorded its
geometry, computed font size and computed weight; each was classified **COMMERCIAL / LIMIT /
EVIDENTIAL / FIGURE** by the rubric's §4 definitions, using DOM ancestry:

- **FIGURE** — anything inside a figure's SVG, its caption or its tabular equivalent, plus the
  figure's own rendered box.
- **EVIDENTIAL** — anything inside an apparatus block, a register label, a status mark or a
  disclosure.
- **LIMIT** — anything inside the always-open limits region.
- **COMMERCIAL** — everything else.

**Axis 1 (emphasis)** applies the rubric's ordered channels: typographic scale first, then computed
weight, then position in reading order. **Axis 2 (area)** totals rendered area by class per band.
Closed navigation panels are excluded, since they are not on screen.

**Limits of the method, carried with the verdict.** It reads three of the rubric's six emphasis
channels — scale, weight and reading position. It does not model isolation, interactive prominence
or ground change, and where those would matter the result is a judgement a reviewer could dispute.
A figure's contribution to *area* is its bounding box, which over-counts whitespace inside the
drawing. **This is a structured reading of a rendered page, not eye-tracking and not evidence about
a real reader.**

---

## 2. F2 — FIRST FIXATION

### 2.1 WIDE — 1400 × 900 — nine bands

| Band | Heaviest element | px | Class |
|---|---|---|---|
| 0 | "Judge us on the enquiries, not the traffic." | **88** | COMMERCIAL |
| 1 | "That reads like three problems. It behaves like one." | 38 | COMMERCIAL |
| 2 | body prose of the mechanism section | 18 | COMMERCIAL |
| 3 | "What we are accountable for, and where that stops" | 30 | COMMERCIAL |
| 4 | "Where each discipline comes in" | 30 | COMMERCIAL |
| 5 | "What you can check before you commit" | 30 | COMMERCIAL |
| 6 | "The method, in full" | 19 | COMMERCIAL |
| 7 | "Who this is built for" | 30 | COMMERCIAL |
| 8 | footer routing | 18 | COMMERCIAL |

**COMMERCIAL 9 · LIMIT 0 · EVIDENTIAL 0.**

### 2.2 NARROW — 390 × 844 — thirteen bands

| Band | Heaviest element | px | Class |
|---|---|---|---|
| 0 | "Judge us on the enquiries, not the traffic." | **36** | COMMERCIAL |
| 1 | "That reads like three problems. It behaves like one." | 24 | COMMERCIAL |
| 2 | "How the work produces an enquiry" | 22 | COMMERCIAL |
| 3 | body prose of the mechanism section | 18 | COMMERCIAL |
| 4 | "What we are accountable for, and where that stops" | 22 | COMMERCIAL |
| 5 | "Where you give us your close data…" | 18 | **LIMIT** |
| 6 | "Where each discipline comes in" | 22 | COMMERCIAL |
| 7 | "What you can check before you commit" | 22 | COMMERCIAL |
| 8 | "The method, in full" | 19 | COMMERCIAL |
| 9 | "Who this is built for" | 22 | COMMERCIAL |
| 10 | "Two ways to start" | 22 | COMMERCIAL |
| 11 | footer routing | 18 | COMMERCIAL |
| 12 | footer routing | 18 | COMMERCIAL |

**COMMERCIAL 12 · LIMIT 1 · EVIDENTIAL 0.**

### 2.3 Verdict

> ### **F2 — PASS at WIDE. PASS at NARROW.**

**On no band, at either width, is the heaviest element a date, a sample, a status mark, a method
note, a provenance line or a register label.** The Session 14 sparse-band failure does not recur:
the configuration that produced it — a labelled region with no heading of its own — cannot occur
under RL-1, and both of this page's labels sit beneath a rule and above a heading 6–14px larger.

**RL-5 specifically:** the two register labels are dominated in their own bands at both widths.
At WIDE, band 3's label (16px) sits against a 30px heading; band 5's label (16px) against a 30px
heading and a 26px statement. At NARROW the same pairs are 16 vs 22, and 16 vs 22 and 20.

---

## 3. F3 — VISUAL PROPORTION / WEIGHT

Area is reported as the rubric requires — **as a distribution that informs, never as a verdict.**

### 3.1 WIDE — area by class, per band (%)

| Band | C | L | E | F | Emphasis class |
|---|---|---|---|---|---|
| 0 | 100 | 0 | 0 | 0 | COMMERCIAL |
| 1 | 100 | 0 | 0 | 0 | COMMERCIAL |
| 2 | 20.6 | 0 | 13.1 | **66.3** | COMMERCIAL |
| 3 | 7.5 | **45.8** | 1.1 | 45.5 | COMMERCIAL |
| 4 | 24.2 | 0 | 0 | **75.8** | COMMERCIAL |
| 5 | 95.5 | 0 | 4.5 | 0 | COMMERCIAL |
| 6 | 42.0 | 0 | **58.0** | 0 | COMMERCIAL |
| 7 | 100 | 0 | 0 | 0 | COMMERCIAL |
| 8 | 100 | 0 | 0 | 0 | COMMERCIAL |

### 3.2 NARROW — area by class, per band (%)

| Band | C | L | E | F | Emphasis class |
|---|---|---|---|---|---|
| 0–2 | 100 | 0 | 0 | 0 | COMMERCIAL |
| 3 | 9.7 | 0 | 26.2 | **64.1** | COMMERCIAL |
| 4 | 7.3 | 32.1 | 1.9 | **58.7** | COMMERCIAL |
| 5 | 0 | 31.8 | 0 | **68.2** | **LIMIT** |
| 6 | 100 | 0 | 0 | 0 | COMMERCIAL |
| 7 | 92.5 | 0 | 7.5 | 0 | COMMERCIAL |
| 8 | 87.6 | 0 | 12.4 | 0 | COMMERCIAL |
| 9 | 26.6 | 0 | **73.4** | 0 | COMMERCIAL |
| 10–12 | 100 | 0 | 0 | 0 | COMMERCIAL |

### 3.3 The three verdict conditions, applied as written

| Condition | WIDE | NARROW |
|---|---|---|
| **1 — No band is emphasis-dominated by an EVIDENTIAL object** | **HOLDS** — 0 of 9 | **HOLDS** — 0 of 13 |
| **2 — COMMERCIAL dominant in more bands than LIMIT + EVIDENTIAL combined** | **HOLDS** — 9 vs 0 | **HOLDS** — 12 vs 1 |
| **3 — No contiguous run of ≥ 2 bands led by LIMIT or EVIDENTIAL on *both* axes** | **HOLDS** — no band is led by either on emphasis at all | **HOLDS** — see below |

**NARROW condition 3, worked through.** Band 5 is the only band led by LIMIT on emphasis. On the
area axis that same band is led by **FIGURE** (68.2 vs 31.8), so LIMIT does not lead it on both
axes; and it is a single band regardless, which the rubric explicitly names as *a moment in a page*
rather than a sustained experience. Bands 4 and 5 are contiguous, but band 4 is emphasis-led by
COMMERCIAL. **No run of two exists on either axis pairing.**

### 3.4 Verdict

> ### **F3 — PASS at WIDE. PASS at NARROW.**

---

## 4. Two observations reported rather than buried

**4.1 One band is 73.4% evidential by area (NARROW band 9), and one is 58.0% (WIDE band 6).** Both
are the block 6 provenance apparatus. The rubric is explicit that evidence occupying more area than
commercial content **is not a failure** — *"emphasis is commercial, presence is evidential"* is
precisely that rendered. Both bands are nonetheless emphasis-led by a commercial heading, and
neither has a neighbour in the same condition. **It is the closest this page comes to the failure
the rule exists to prevent, and it is worth re-checking on any future page that carries more
evidence than this one.**

**4.2 FIGURE area is over-counted.** A figure contributes its bounding box, which includes the
whitespace inside the drawing. That inflates FIGURE in bands 2, 3 and 4 at WIDE and 3, 4 and 5 at
NARROW. It never changes a verdict here — FIGURE is not one of the classes conditions 1–3 test — but
a future page where FIGURE and LIMIT compete on the area axis would need a tighter measure.

---

## 5. What these results do not establish

They are one page, measured once, at two widths, by one reviewer using a partial implementation of
the rubric's emphasis channels. **They say nothing about the other 21 routes, about cumulative
effect across a session of browsing, or about any real reader.** Real-reader testing remains
outstanding and is not substituted for by anything here.

**And they do not pass Gate 10.**
