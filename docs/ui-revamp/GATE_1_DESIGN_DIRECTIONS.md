# MappedSkills UI Revamp — Gate 1: Visual & Motion Direction

| | |
|---|---|
| **Gate** | 1 — Visual & Motion Direction (design direction only; no application code changed) |
| **Date** | 2026-10-08 |
| **Branch** | `ui-revamp` @ `142b9c8` (uncommitted Gate 1 work on top; nothing committed, pushed or merged) |
| **Governing decisions** | `DEC-005`, `DEC-012`, `DEC-018`, `DEC-019`, `DEC-022`, `DEC-029`–`DEC-033` |
| **Package** | `docs/ui-revamp/gate-1/` — prototypes, screenshots, motion frames, README |
| **Status** | **COMPLETE WITH EXCEPTIONS** (see §15). **Awaiting owner review.** Nothing in this document is an approved decision |

Evidence labels follow `CLAUDE.md`. In this document:
- **VERIFIED FACT** means one of two things. Either it was read in the repository, or it was measured on the Gate 1 prototypes in a real browser (Playwright Chromium, `playwright-core` borrowed from another local project, as Gate 0 did; nothing was installed in this repository).
- **DESIGN PROPOSAL** is the designer's recommendation. It is a **WORKING HYPOTHESIS** until the owner decides.

---

## 1. Summary

Gate 1 developed **three evolutionary directions within THE RESOLVE** (`DEC-029`). Each one is a working, responsive HTML prototype. Each prototype covers the hero, a strategy section, proof, the services overview, a detailed service page (`/seo`), the conversion close, global chrome (header, services panel, mobile menu, footer), three 390px mobile compositions, a live motion demonstration and a system sheet.

| | Direction | Organising idea | Character |
|---|---|---|---|
| **A** | **Ledger** | Every page is an accountable record: rail · entry · margin | Editorial, documentary, calm |
| **B** | **Instrument** | The six-station chain *is* the grid | Diagrammatic, diagnostic, precise |
| **C** | **Resolution** | THE RESOLVE's one move, anonymous → named, becomes the system grammar | Confident, asymmetric, evidential |

**Recommendation (DESIGN PROPOSAL): Direction C — Resolution, with Direction A's ledger adopted as the long-form register for case studies, research and articles.**

C is the only direction that makes the approved positioning — *judge us on the enquiries, not the traffic* — the structure of the system itself. It is also the most continuous with the validated homepage, the most robust across page families and breakpoints, and the cheapest to implement safely. The owner may choose A, B or C, ask for a hybrid, ask for refinement, or reject all three (§14).

---

## 2. Authority applied

| Source | How it constrained Gate 1 |
|---|---|
| `DEC-029` | Directions are **evolutions within THE RESOLVE**. Any change to a `00_ACTIVE_DIRECTION.md` §4 binding trait must be named for approval (§13 lists them) |
| `DEC-018` / `00_ACTIVE_DIRECTION.md` §4 | Light-first ivory; one tangerine accent with a contrast ramp; Bricolage + Manrope; **no monospace**; four marks; no images, shadows, sticky/fixed elements, looping or ambient motion; hatch/dash pattern fills kept as honesty devices. **Item 9:** the brand must not read as a journal, textbook, audit report or document |
| `02_RESOLVE_MOTION_BUDGET.md` | T1–T4 tiers; per-page maxima; zero ambient, zero pinned; once resolved stays resolved; two easings |
| `DEC-030` | `1557f74` behaviour is **not** the baseline. All three directions use a **non-sticky** header, fluid rhythm, opener compositions and a capped measure |
| `DEC-031` / `DEC-012` | **No client figures anywhere**, including as placeholders. The only numbers used are first-party and already published (§4.4) |
| `DEC-032` / `DEC-005` / `SERVICE_ARCHITECTURE.md` | The seven approved capabilities, in Capture / Convert / Measure order. No web-development or social-media-management line. AI search is a capability, not the category |
| `PROGRAMME_RISKS_AND_LIVE_ISSUES.md` | `LIVE-1`, `LIVE-2`, `PROC-1` stay open and untouched. The LIVE-2 contradictory headline is **not reproduced** in any prototype; a labelled placeholder stands in |

---

## 3. The design problem, solved structurally

Each Gate 0 finding is answered by a **system rule**, not a page patch. These rules are shared by all three directions unless a direction section says otherwise.

| Gate 0 finding (audit ref) | Structural answer in Gate 1 |
|---|---|
| Two visual systems coexist (§1, H1) | One token set and one component family per direction, demonstrated on homepage, services, a capability page **and** a case-study record. Legacy cards, icon tiles and gradient surfaces have no place in any direction |
| Three left edges, 112 / 52 / 80px (§8, R7) | **One container** (1360px max, `clamp(16px,4vw,56px)` gutter) used by header, content and footer. VERIFIED (measured): header logo, page content and footer logo share one left edge in B and C at 1440/1024/390 (x = 96 / 41 / 16). In A the logo and footer align to the rail (96) and the H1 to the entry track (349), by design |
| 61 ad-hoc type sizes (§6) | **Seven type roles** per direction (hero, statement/entry, title, lede, body, note, label) as fluid tokens |
| 13 literal breakpoints (§8) | **Three breakpoint tokens: 600 / 900 / 1200** |
| 104–161-character lines (§6, R8) | Measure is a token on every running paragraph (C 58ch, A 62ch, B 56ch) |
| Hero composition weakened; empty right 40% (§8, `DEC-030`) | Opener compositions restored as named modes. The `/seo` hero in C uses **split**: the second lede paragraph fills the right column. That keeps I2/B27 (no apparatus above the fold) |
| Repetitive label → display → body grammar (§10) | C: four named compositions (split · reverse · statement · wide). A: entries with marginalia. B: blocks spanning stations |
| Weak proof presentation (§11, H4) | A shared **proof taxonomy** (§4.3), rendered differently by each direction |
| Header overflow 1024–1080 (R2) | Full navigation only at ≥1200px. Below that: Contact Us + Menu. VERIFIED: zero overflow at 1024 in all three |
| Mobile menu CTAs unreachable (LIVE-1) | Header **not sticky**. Menu in normal page flow. **Contact Us and Book a call are the first items in the open menu.** This structure cannot reproduce LIVE-1. (LIVE-1 itself is not fixed by Gate 1) |
| Input borders 1.30:1; `--resolve-gap` text 3.13:1 (§14) | Two new tokens: `--control #8A8174` (**3.47:1** on ground) for component boundaries; `--gap-text #6E6778` (**4.90:1**) for small not-measured text. `#8E8798` stays for marks only. VERIFIED by contrast computation |
| Four primary-button styles; two focus styles (§7, §14) | One action family per direction. One focus style: 3px ink outline, re-pointed on dark/tangerine |
| Footer list indentation; global `ul` rule (R6) | No global list padding. The footer is composed on the same grid |
| Chain label collisions (R3/R4) | Stage labels get their own row; the boundary label hangs inside its rule; below 900px the chain recomposes as a vertical spine. Checked visually in the 1440 and 390 captures; not measured programmatically |
| Underdeveloped motion outside the homepage (§13) | Per-direction four-level motion system (§8), inside the existing budget except where §13 says otherwise |

---

## 4. Shared foundation (all three directions)

### 4.1 Preserved, unchanged in meaning
- Palette roles and the contrast-driven tangerine ramp: `#FF5B04` fills · `#D94400` display · `#A83400` small text (6.02:1).
- Bricolage Grotesque (display) and Manrope (body). **No monospace.**
- The four marks: **named** (ink), **anonymous** (dim, 42%), **open/unattributed** (dashed), **owned** (tangerine). Plus the **45° hatch** for "a state that is not a value".
- The approved hero copy, CTA labels and destinations, and service names and descriptions. Copy is taken verbatim from the repository wherever it exists.
- CTA architecture: Contact primary, booking secondary, no third button, no sticky bar.

### 4.2 Proposed system-wide additions (DESIGN PROPOSAL)
| Addition | Reason |
|---|---|
| `--gap-text #6E6778`, `--control #8A8174` | Fix WCAG 1.4.3 / 1.4.11 failures without changing the palette's character |
| One container, three breakpoints, seven type roles, one spacing rhythm token | Removes the debt that drives most revamp cost (audit §18) |
| One action family; marks inside actions (C only) | Replaces four primary-button styles |
| Services disclosure as a **disclosure of links**, not `role="menu"` | Fixes the audit §14 ARIA mismatch |

### 4.3 Proof taxonomy — CLAIM · EVIDENCE · METHOD · OUTCOME · LIMITATION
All three directions separate the five parts. They differ in presentation.

| Part | Rule |
|---|---|
| **Claim** | Display or statement type. Never carries a number on its own |
| **Evidence** | What the claim stands on. A number appears only if it is first-party, published and scoped |
| **Method** | How the evidence was produced (systems, runs, date, location, state) |
| **Outcome** | What was found or what changed. For withheld case studies this is a **hatched withheld state**, never a blurred or greyed number |
| **Limitation** | Always visible, never collapsed. Marked with a tangerine rule or label in every direction |

**Evidence status is encoded with the existing mark language**, so honesty is part of the visual grammar rather than footnotes:

| Mark | Evidence status |
|---|---|
| ■ ink (named) | Verified first-party measurement |
| ■ tangerine (owned) | Our commitment / accountability |
| ■ dim (anonymous) | Context |
| ▢ dashed (open) | Not measured / unattributed |
| ▨ hatched | Withheld under our evidence standard |

**Quotation slot:** a quotation component renders **only** with written publication approval. None is approved, so it renders **nothing**: no empty frame and no "coming soon".

### 4.4 Numbers used in the prototypes — complete list
Every number below is a **published first-party measurement**, shown with its scope. VERIFIED as published claims in the repository (`HomepageAccountability.tsx`, `/seo`, `SERVICE_ARCHITECTURE.md`, audit §11).
- 4 AI assistants · 28 unbranded runs · one day · Pune · English · signed out
- named **0 of 28** · directory/listing sources present in **15 of 28** · **2** systems untestable
- own site: **4 of 5** published enquiry-path checks failed; the old form showed success and transmitted nothing
- Ameba case study context fields as published: February 2020, 20–30 employees, India/USA/Australia. **Outcome withheld.**

**Not used**, by design: the 120-site measurement study. Audit §11 labels it *RESEARCH REQUIRED before any visual re-use*.

**Illustrative mark fields** (C hero, B panel) are captioned on the page: *"Marks are illustrative, not counts."*

### 4.5 Placeholder discipline
Text in **[square brackets]** in the prototypes is structural placeholder written to demonstrate a component (for example a limitation sentence for the own-site check, or the withheld-state wording). It is **not proposed copy**. Copy is LOCKED; Gate 2 needs approved wording or must reuse existing copy.

### 4.6 Imagery (all directions)
- **No photography, illustration, stock or AI-generated imagery** is proposed. `§4.5` binding: 0 images.
- Graphics are **diagrams built from marks, rules and type** (chains, fields, tallies, strips), drawn in HTML/CSS. No canvas, no WebGL.
- Icons: none, apart from a text arrow. The 39 `lucide-react` imports belong to the legacy layer and would retire with it (REVIEW at Gate 4E).
- The logo is shown as a typographic placeholder. The asset question (audit L3 / X11) is unchanged and remains an owner item.

---

## 5. Direction A — LEDGER

Prototype: `gate-1/prototypes/direction-a-ledger.html`

**A. Design idea.** MappedSkills as the firm that keeps the record. Every page is a set of **entries**: a rail says what the entry is, the entry column says it, and a margin column holds scope, limits and definitions. It strengthens the perception of **accountability and auditability**: nothing is said without its conditions beside it.

**B. Typography.**
- Display: Bricolage 700, deliberately calmer. The hero tops out at 81.6px, below the current 102px homepage T1.
- Entry heads: 25.6–44px, max 24ch.
- Body: Manrope 17px/1.62 at a 62ch measure.
- Margin notes: 14.4px with a 2px rule.
- Labels: 11.8px caps, +0.14em.
- Numbers: tabular lining everywhere; tables are the numeric surface.
- Scale ratio about 1.25; density medium-high; weight contrast lower than C.

**C. Grid & composition.** Three tracks: rail 13.5rem · entry fluid · margin 16rem, aligned from header to footer (the logo sits in the rail, navigation in the entry track, actions in the margin track). Entries open with a 1px **ink** rule; the page closes with a **double rule**. Asymmetry is constant: the reading column is always offset by the rail. Long pages avoid stacked-template monotony by varying what the margin carries (definitions, limits, horizon) and by alternating prose entries with tables.

**D. Colour & surfaces.**
- Ground only. No cards and no plates.
- Paper appears only in the open services panel and the mobile limitation cell.
- Borders: ink rules for structure; `--line` for row separators.
- Accent: one tangerine block for the ask, plus tangerine rules on limitations.
- Inversions: footer only.
- **When not to use a surface:** almost always. The table and the rule are the containers.

**E. Components.**
- Header on the three tracks.
- Services panel as a stage/capability/contribution **table**.
- Rectangular 2px-radius buttons with an arrow nudge.
- Links: an ink underline that fills tangerine on hover.
- Forms (not shown separately): same field spec as C.
- Case study: a ledger row.
- Testimonial: quotation slot rule.
- CTA: closing entry with a tangerine block.
- Footer on the same tracks.

**F. Proof language.** The **evidence ledger**: one table with columns *Claim · Evidence · Method · Outcome · Limitation*. The limitation column carries a tangerine rule; a withheld outcome is a hatched cell. Below 1024px each row becomes a labelled record. The 28-run **tally** (15 filled, 13 dashed) sits inside the evidence cell, so the number never leaves its scope.

**G. Imagery / graphic language.** Tables, tallies and the chain drawn as an **account table** (six stations × "we answer for" / "if no trail"). No figures beyond that.

**H. Motion.** Calm, clerical, exact.

| Level | Behaviour |
|---|---|
| L1 micro | Link rule fills tangerine (180ms); arrows nudge 4px |
| L2 scroll | **Row reconciliation**: an entry's rows lift from 35% to full in order (110ms stagger), and their state marks resolve |
| L3 data | Tally: the 15 directory runs fill in run order (35ms stagger); the scope text is visible throughout |
| L4 signature | **The reconcile**: a tangerine scan line crosses the report table once (900ms) and leaves the enquiry column resolved and the traffic column receded |

**I. Responsive.**

| Width | Behaviour |
|---|---|
| 1440 | Three tracks |
| 1024 | Margin drops under the entry as a note row; header compacts |
| 768 | Tables reflow to records; the rail becomes a heading line |
| 430 / 390 / 360 | One column; the report table drops its traffic column; the chain becomes a list with the boundary as a tangerine rule |

VERIFIED: no overflow at any of the six widths. Prototype height is 9.5 screens at 390.

**Named risk.** `DEC-018` item 9 rules out the brand reading as a journal, audit report or document. **This is the direction closest to that reading.** It is the right register for long-form (§11), and a risky one for the homepage and commercial routes.

---

## 6. Direction B — INSTRUMENT

Prototype: `gate-1/prototypes/direction-b-instrument.html`

**A. Design idea.** MappedSkills as a precision instrument for the route from demand to enquiry. **The six-station chain is the page grid**: S1 discovery & source · S2 landing · S3 interaction · S4 enquiry · S5 qualified enquiry · S6 opportunity & revenue (client data). Every block is positioned on the stations it acts on, and a **chain strip** states that scope. It strengthens the perception of **diagnosis and causality**.

**B. Typography.**
- Bricolage at the **width axis 78** (condensed), 700, for display and statements (hero up to 105.6px, leading 0.94).
- A new **station code** role: Bricolage 800 at width 75 (S1–S6).
- Readings show counted values in condensed Bricolage tabular, with a Manrope scope line beneath every value.
- Body Manrope 16px at 56ch, denser than A or C.
- Labels 11.5px caps.

**C. Grid & composition.** Six columns at ≥900px, one per station. The hero copy sits on S1–S4 with the lede on S5–S6. Services span their stations, like a route map. The diagnosis places three friction lines on the chain with a **break marker** at the failing station. The measurement rail runs beneath S1–S5. Below 900px the chain becomes a vertical spine.

**D. Colour & surfaces.**
- Ground for reading.
- **Ink instrument panels** for figures, the services panel and reading heads.
- Paper for reading bodies; 1px `--control` borders on readings.
- Tangerine for the accountability boundary, break markers, the limitation outline and the close.
- **Surface budget pressure:** the homepage carries more ink than the current two-inversion budget allows (§13).

**E. Components.**
- Header with a station-coded Services trigger.
- Services panel = the chain map.
- Squared buttons with a tangerine baseline that draws on hover.
- Strips as a recurring component.
- Readings as the proof component; service tiles sized by station span.
- Close = the chain ending at "S4 You write to us".
- Footer grouped Capture / Convert / Company.

**F. Proof language.** **Readings.**
- Each reading has an ink head stating where on the chain it was taken.
- The claim sits on the left; a scope **spec grid** sits on the right (systems 4 · runs 28 · window 1 day · untested 2).
- Results are drawn **to scale** as bars (0/28, 15/28).
- The limitation sits in a tangerine-outlined box.
- The case study is a reading taken at S1–S2 with a hatched withheld outcome.
- Risk: spec grids invite numbers, and most pages have none to give.

**G. Imagery / graphic language.** The chain everywhere: strips, the stations diagram, the route map and break markers. Most "data-like" of the three, without inventing data.

**H. Motion.** Kinetic, causal, directional.

| Level | Behaviour |
|---|---|
| L1 micro | Tangerine baseline draws under buttons (180ms); map tiles' left edge turns tangerine |
| L2 scroll | **Strip activation**: stations light left to right as a block enters (620ms, 80ms per station); break markers drop onto their station 500ms later |
| L3 data | Reading bars draw to scale |
| L4 signature | **The trace**: one tangerine mark travels S1 → S5 along the line and stops at the boundary (1500ms); then the enquiries resolve at S4 |

**I. Responsive.**

| Width | Behaviour |
|---|---|
| 1440 | Six stations |
| 1024 | Hero copy stacks above the lede; stations hold |
| 768 and below | Panel station names wrap to 3 × 2; the trace is not shown; strips shrink to codes; the stations diagram becomes a spine; readings stack with a two-column spec grid |

VERIFIED: no overflow at any of the six widths (after one fix during Gate 1). 9.4 screens at 390.

**Named risks.**
- Strips on every block could become the sitewide tic the motion budget was written to prevent (`02_RESOLVE_MOTION_BUDGET.md` §1).
- **Station spans are scope claims** (e.g. "SEO acts on S1–S2"). Each one would need owner confirmation.
- The trace exceeds the 900ms expressive ceiling.
- The width axis adds font payload.

---

## 7. Direction C — RESOLUTION (recommended)

Prototype: `gate-1/prototypes/direction-c-resolution.html`

**A. Design idea.** THE RESOLVE has one move: the same population, resolved. Direction C makes that move the **grammar of the whole system** at four scales:
- the hero population resolving (T1);
- sections resolving (T2);
- marks resolving inside controls (T4);
- evidence status shown as mark states.

Each claim is paired with **what it stands on**. It strengthens the perception that MappedSkills **turns activity into accountable outcomes**, which is `DEC-005` made visible.

**B. Typography.**
- **Hero:** Bricolage 800 at optical size 96, 40.8–102px, leading 0.98, −0.035em. This is the validated homepage voice, kept.
- **Statement:** 29.6–62px, 800.
- **Title:** 700, 20.8–28px.
- **Lede:** Manrope 500/700, 17.6–20.8px.
- **Body:** 17px/1.6 at **58ch**.
- **Note:** 15px.
- **Label:** 12.5px caps, +0.15em.
- **Keyword states:** named words in tangerine-display, traffic words in dim. This is THE RESOLVE's typographic signature, used sparingly.
- **Numbers:** tabular lining in text. A single counted figure may use Bricolage 800, only beside its scope.
- Scale ratio about 1.333; high contrast between statement and body; medium density.

**C. Grid & composition.** A **two-speed asymmetric 12-column grid** with a wide statement column (7) and a narrow stands-on column (4–6), arranged by four named compositions:
- **split**: statement left, evidence right;
- **reverse**: boundary left, statement right;
- **statement**: full measure;
- **wide**: figure across the container.

These formalise Phase J's opener and section modes (`DEC-022`) and restore what `1557f74` removed. The services overview narrows literally: four Capture marks, then two Convert, then one Measure. Page rhythm follows THE RESOLVE's calm → event → calm: statements and plates alternate, and only the hero and close are loud.

**D. Colour & surfaces.**
- **Surface ladder:**
  - ground for the page;
  - paper for plates and alternate sections;
  - ink for the hero stage (inverting to paper as it resolves) and the footer;
  - tangerine for the full-bleed close.
- **Inversions:** homepage 2, secondary pages 1, which is **within the current budget**.
- **Borders:** `--control` 1px around proof plates (they are objects); `--line` for decoration only; 3px ink for band openers.
- **No shadows and no gradients**, except the withheld hatch.
- **When not to use a surface:** never put a statement or running prose in a container. Only evidence becomes an object.

**E. Components.**
- **Header and navigation:** non-sticky. The current page is marked with a tangerine square. Services is a three-group disclosure in chain order.
- **Mobile menu:** in page flow, CTAs first.
- **Buttons:** **one pill family** carrying a mark. On hover/focus the mark **resolves**: dim → white on primary, dashed → tangerine on secondary (180ms).
- **Links:** underline thickens.
- **Forms:** 48px fields with 3.47:1 boundaries, one focus style, errors marked with the owned mark.
- **Cards:** none. Proof plates are the only bordered objects.
- **Case study:** challenge → intervention → outcome triptych; the outcome is hatched and withheld.
- **Testimonial:** quotation slot rule.
- **Metrics:** counts only, inside plates.
- **CTA:** full-bleed tangerine with arrival marks.
- **Footer:** ink, on the same 12 columns; mobile links in two columns to cut length.

**F. Proof language.** **Claim + plate.**
- The claim is set in statement type, left.
- The **plate** sits right: paper, `--control` border, a status head showing the evidence-class mark, then rows Evidence · Method · Outcome · **Limitation** (the limitation row sits on ground and is never collapsed).
- The 28-run evidence is 28 dashed marks: none named. The count "0 of 28" sits beside them, and the scope sits in the next rows.
- Qualitative and quantitative evidence use the same plate. Only the Evidence row changes, so unsupported evidence never takes a number-shaped form.
- The withheld outcome is a hatched plate with no number-shaped type.

**G. Imagery / graphic language.** Marks as the only graphic vocabulary:
- the hero field;
- friction runs that stop at a rule;
- the chain with its boundary;
- the 28-run plate;
- service-band counts;
- marks inside buttons.

Diagrams use marks only where the mark state means something. The rule against **marks as decorative bullets** is a refinement item (§11).

**H. Motion.** Resolution at four scales.

| Level | Behaviour |
|---|---|
| L1 micro | The mark inside a control resolves on hover/focus (180ms); link underline thickens; the services chevron rotates; the panel arrives (420ms) |
| L2 scroll | Friction runs arrive and stop at the rule (T3, 420ms); the chain line draws and its points resolve in sequence (T2, 620–900ms); the close's three marks land (T3) |
| L3 data | **28-run plate**: marks change from pending to their recorded state in run order (35ms stagger, 420ms). The limitation is visible before, during and after. Nothing counts up |
| L4 signature | **The hero resolve** (T1, 900ms, once): the dark stage of anonymous marks inverts to paper; three marks become tangerine and their source labels arrive with drawn bars. The Traffic/Enquiries toggle replays it on demand |

**I. Responsive.**

| Width | Behaviour |
|---|---|
| 1440 | Statement over split hero; plates beside claims |
| 1024 | Compact header; compositions keep two columns |
| 768 | One reading column; the chain becomes a vertical spine with the boundary as a tangerine rule; the hero stage goes full-bleed **after** the CTAs |
| 430 / 390 / 360 | Field reduces to 60 marks (5 rows × 12); plate rows stack label over value; footer links in two columns; menu button becomes icon-only with an accessible name |

VERIFIED: no overflow at any of the six widths. Prototype height is 13.1 screens at 390: it carries the most demonstrated content, including the full services overview and `/seo` excerpt.

---

## 8. Motion system — comparison and budget compliance

**Timing categories (shared tokens):**

| Category | Duration | Use |
|---|---|---|
| Instant | 0ms | Pressed state, focus ring |
| Fast | 180ms | T4 micro (= existing `--resolve-t-micro`) |
| Standard | 420ms | T3 transitions |
| State | 620ms | T2 sectional (= `--resolve-t-state`) |
| Expressive | 900ms | T1 only (= `--resolve-t-resolve`) |

**Easings:** two only, `state` (in-out) and `arrive` (out).

**Implementation rules (all three directions):**
- Animate transform, opacity and colour only.
- IntersectionObserver, one-shot.
- No library.
- **Complete at rest:** with no JS or with reduced motion, every element renders resolved. VERIFIED: all screenshots in `screenshots/` were taken with `prefers-reduced-motion: reduce` and show composed states.

| | A · Ledger | B · Instrument | C · Resolution |
|---|---|---|---|
| Character | Clerical, exact | Kinetic, causal | Resolving, calm → event → calm |
| Homepage T1 | Reconcile scan (900ms) | Trace + resolve (1500ms) ⚠ | Stage resolve (900ms) |
| T2 count, homepage | 3 (friction, chain, ledger) | 4+ (diagnosis, stations, readings ×3) ⚠ | 3 (chain, 28-run plate, friction) |
| Secondary page | 0 T2 needed | Strip on each block ⚠ | 1 T2 (e.g. capability chain) |
| Budget fit | Within | **Exceeds** (T1 duration, T2 count, inversions) | **Within** |
| Motion evidence | `screenshots/motion/a-*` | `screenshots/motion/b-*` | `screenshots/motion/c-*` |

**Avoided in all three:**
- scroll hijacking and pinning;
- parallax;
- cursor effects;
- looping or ambient motion;
- text-splitting animation;
- loading sequences;
- counters;
- generic fade-ups. Nothing fades up for its own sake: every reveal is a state change.

---

## 9. Responsive verification (VERIFIED, prototype pages in `?frame=1` design-only mode)

| Width | A | B | C |
|---|---|---|---|
| 1440 | 0 overflow | 0 overflow | 0 overflow |
| 1024 | 0 | 0 | 0 |
| 768 | 0 | 0 | 0 |
| 430 | 0 | 0 | 0 |
| 390 | 0 | 0 | 0 |
| 360 | 0 | 0 | 0 |
| Console / page errors | none | none | none |

Two defects found during Gate 1 were fixed before capture:
- the C header overflowed below 600px;
- the B panel had a negative-margin bleed below 900px.

This is lab measurement in Chromium only. **No real-device, cross-browser, screen-reader or Core Web Vitals testing was done** (UNKNOWN).

---

## 10. Comparison

| Criterion | A · Ledger | B · Instrument | C · Resolution |
|---|---|---|---|
| Strategic fit | Good: accountability. The outcome reads as reporting | Strong: whole-route thinking | **Strongest: the positioning is the system** |
| Distinctiveness | Lowest: editorial-broadsheet is a common look | **Highest** | High, if marks stay semantic |
| Credibility | High; sober | High; risks "product UI" | **High; confident and evidential** |
| Clarity | High for long-form, slower for the homepage | Medium: strips need learning | **High** |
| Performance-marketing character | Analytical, not kinetic | **Strongest: diagnosis and causality** | Strong: conversion shown as resolution |
| Proof capability without client figures | Strong; can read as a compliance table | Strong, but spec grids invite absent numbers | **Strongest: the plate works with or without a number** |
| Responsive potential | Tables must reflow | Six stations need a second composition | **Cleanest fold** |
| Motion potential | Modest | Richest, over budget | **Rich and within budget** |
| Accessibility | Semantic tables; reflow care | Strips are visual-only; meaning must be duplicated | **Marks already aria-hidden with text meaning** |
| Implementation complexity | **Lowest** | Highest | Moderate |
| Performance risk | **Lowest** | Highest (font axis, more DOM, more motion) | Low–moderate |
| Maintainability | High | Lowest: station spans per block | **High: four compositions, one plate** |
| Scales across families | Long-form excellent; homepage weak | Services strong; legal/blog forced | **All families** |
| Risk of looking generic | **Highest** | Lowest | Low |
| Continuity with THE RESOLVE | Lowest: drops the stage and the gesture | Medium | **Highest** |

**They are not equally strong.**
- **C** is the best overall system.
- **B** is the most striking and the most expensive. Its best idea, the diagnosis placed on the chain, can live inside C as a capability-page figure.
- **A** is the best long-form register and the weakest brand expression.

---

## 11. Recommendation (DESIGN PROPOSAL — not approved)

**Proceed to Gate 2 with Direction C — Resolution, with two named borrowings:**
1. **A's ledger as the "document register"** for case studies, research and blog articles (F7–F9): rail + entry + margin, the evidence ledger table, margin notes for scope. This answers audit §21.1 Q10 and confines A's "document" reading to the pages that *are* documents.
2. **B's "diagnosis on the chain"** as one figure type for `/problems/*` and capability pages, rendered as a static strip within C's grid (secondary-page budget: 1 T2).

**Why C wins.** It is the only direction where the system itself states the positioning. It keeps the validated homepage's strongest assets:
- the hero voice;
- the stage;
- the chain;
- the tangerine close;
- the four marks.

It fixes the Gate 0 findings structurally, stays inside every binding trait and the motion budget, and its proof plate is the most honest way found to make qualitative and quantitative evidence coexist.

**What it preserves.** All of §4.1 and the existing motion engineering (tokens, IntersectionObserver, reduced-motion and no-JS composed states).

**What it improves:**
- one container;
- seven type roles;
- three breakpoints;
- one button family;
- contrast fixes;
- restored opener compositions and measure;
- a reusable proof system;
- a mobile menu that cannot hide its CTAs;
- one motion language across every page, not just the homepage.

**Risks it introduces:**
- **Mark inflation.** If marks become bullets, they stop meaning anything.
- **Plate overuse.** If plates appear on non-evidence content, evidence stops standing out.
- **Statement-type fatigue** on long routes.
- **Prototype length.** The C prototype is 13 screens at 390 because it demonstrates many sections; real pages need their own length budget.

**Refine before Gate 2:**
1. Write a **mark-usage rule**: a mark appears only where its state is true and meaningful.
2. Set a **plate budget** per page family.
3. Compose `/how-it-works` and `/problems/*` explicitly, with the document register where they are long-form.
4. Get approved wording for the withheld-state and limitation lines (§4.5).
5. Confirm the logo asset (L3/X11).
6. Decide the LIVE-2 proof headline first. C's proof section is designed to receive it.

---

## 12. Implementation and performance considerations

| | A | B | C |
|---|---|---|---|
| New dependencies | **None** | **None** | **None** |
| Fonts | Existing two families | Adds Bricolage `wdth` axis (larger variable font; RESEARCH REQUIRED on byte cost under `next/font`) | Existing two families; optical size axis already available |
| Client JS | Header + one toggle + IO | Header + toggle + trace + IO on many blocks | Header + toggle + IO; reuses `use-resolve-motion.ts` pattern |
| CSS | Tables, rules; smallest | Most: station grid, strips, panels | Moderate: four compositions, plate |
| DOM | Lowest | Highest (strips per block) | Moderate (hero field ≈112 marks; current homepage field has 189–440) |
| Images | None | None | None |
| Fit with stack | Tailwind v4 tokens in `@theme`, server components | Same, plus more client islands | Same; closest to the current `components/commercial/primitives.tsx` API (`CommercialSection` modes, `Mark`) |

**Shared prerequisite for every direction:** the token layer comes first (audit §18, H2). That means type roles, the container, breakpoints, the colour additions and the action family. Without it, any direction recreates the fragmentation.

**Header:** the non-sticky header still needs the menu to be a client component. Making `Logo` a server component is a free saving (audit §15).

---

## 13. Binding-trait changes that need explicit approval (`DEC-029` interpretation note)

| Item | A | B | C |
|---|---|---|---|
| Sticky / fixed elements | none | none | none |
| Imagery, second accent, monospace | none | none | none |
| New colour tokens (`--gap-text`, `--control`) | yes | yes | yes. §5-non-binding (hex values may change if roles and contrast floors survive). **Listed for visibility** |
| Surface-inversion budget | within | **exceeds homepage 2** | within |
| T1 duration / T2 count | within | **exceeds** | within |
| Full-bleed accent | 0 on secondary pages | 1 | 1 |
| Typeface axes | — | Bricolage width axis (§5 allows type changes with reason) | — |

**Direction C requires no binding-trait change.**

---

## 14. Owner decision points

1. **Direction:** A, B, C, a hybrid (recommended: C + A's document register + B's diagnosis figure), refinement of one, or reject all three.
2. **Proof copy:** approve or replace the bracketed withheld-state and limitation wording, and authorise the LIVE-2 headline (separately).
3. **Contrast tokens:** accept `--gap-text #6E6778` and `--control #8A8174`.
4. **Header:** confirm the full-navigation breakpoint at 1200px, with compact Contact + Menu below.
5. **Mark-usage rule and plate budget** (if C): accept as Gate 2 constraints.
6. **If B is chosen:** approve the budget exceptions in §13 and confirm each service's station span.

**Gate 2 does not start until the owner records a decision.**

---

## 15. Exceptions and unresolved questions

| # | Item | Label |
|---|---|---|
| E1 | The prompt names "Claude Design". The directions were built as hand-authored HTML/CSS prototypes in the repository, verified in Chromium, rather than in a separate design canvas. This keeps them durable, inspectable and stack-realistic | Method note |
| E2 | Screenshots were captured from the prototypes with `prefers-reduced-motion: reduce` (composed states); motion is evidenced by timed frames in `screenshots/motion/` and by the live prototypes | VERIFIED |
| E3 | Prototype copy marked in brackets is placeholder, not proposed copy (§4.5) | — |
| E4 | No real-device, cross-browser, screen-reader, CWV or user testing | UNKNOWN |
| E5 | The 120-site study was deliberately not visualised (audit §11) | RESEARCH REQUIRED |
| E6 | Logo shown as a typographic placeholder; asset question open (L3/X11) | UNKNOWN |
| E7 | `LIVE-1`, `LIVE-2`, `PROC-1` remain open and were not touched | VERIFIED |
| E8 | Prototypes load Bricolage and Manrope from Google Fonts for review only. Production self-hosts them via `next/font`, which is unchanged | VERIFIED |

---

## 16. Artefacts

See `docs/ui-revamp/gate-1/README.md` for the full index and how to open the prototypes. In short:
- `gate-1/prototypes/index.html` — comparison and links;
- three direction prototypes;
- 27 static screenshots (six widths per direction, full pages at 1440/390, menu-open at 390);
- 24 motion frames.
