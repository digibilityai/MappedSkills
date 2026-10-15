# MappedSkills UI Revamp — Gate 4: Component and Design-System Architecture

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Status** | **PLANNING ONLY.** Proposes how Direction C extends to the remaining routes. Nothing here is approved for implementation |
| **Reference implementation** | `app/direction-c.css`, `app/direction-c-pages.css`, `components/direction-c/*` at `23c937d` (approved by `DEC-036`) |
| **Approved visual reference** | `docs/ui-revamp/gate-1/prototypes/direction-c-resolution-approved.html` (frozen, `DEC-034`) |
| **Governing decisions** | `DEC-018`/`DEC-022` (THE RESOLVE), `DEC-029` (evolution, not replacement; §4 binding characteristics), `DEC-031` (proof), `DEC-032` (taxonomy), `DEC-034`–`DEC-036` |

The aim is the Master Handoff's own success test: *the same MappedSkills strategy, content and website, made more deliberate*.
The architecture therefore has **three tiers**, and the rule that separates them is the main protection against a "generic
template" outcome:

1. **Global primitives.** Tokens, type roles, marks, actions, focus, the grid and the chrome. Identical everywhere.
2. **Section components.** Reusable compositions with a fixed meaning: a boundary, a plate, a scope row, a question row, a close.
   Shared across routes.
3. **Route compositions.** The order, pairing and emphasis of sections. These **differ by communication purpose** (the
   "registers" in §6) and are never a shared page template.

---

## 1. What the reference implementation already provides (VERIFIED)

| Layer | Provided at `23c937d` | Gate 4 status |
|---|---|---|
| Tokens | `--dc-*` colour roles mapped onto `--resolve-*`, plus two Gate 1 contrast tokens (`--dc-gap-text` 4.90:1, `--dc-control` 3.47:1); fluid type scale; `--dc-measure: 58ch`; wrap 1360, pad, column gap, rhythm; four durations and two easings | **Reuse as is.** Global already |
| Scope | `.dc` root, `:where()` zero-specificity resets, unlayered rules that beat the legacy `@layer base` element rules (`section { py-[50px] }`, `ul { pl-6 }`, `a { text-accent }`) | **Reuse.** Every migrated body must sit inside `DcPage` |
| Type roles | `dc-label`, `dc-display` (opsz 96), `dc-statement` (opsz 72), `dc-title`, `dc-lede`, `dc-body`, `dc-note`, `dc-num`, `dc-inline-link`; three metric-calibrated display fallbacks | Reuse. **The fallbacks are tuned to the approved display copy of three routes** (Gate 3 X2). See §3.3 |
| Marks | `dc-mk` with `named`, `owned`, `anon`, `open`, `withheld` | Reuse. Usage rule still to be written (Gate 2 E6) — §4.4 |
| Actions | `dc-btn` (primary/secondary, A1 wrap fix), `dc-tlink`, `dc-actions`; `ActionPair` hard-codes `/contact` + `/schedule-call` | Reuse. **`BookingLink` integration needed** for `/schedule-call` (§4.2) |
| Grid | `dc-g12`, column helpers `main` / `side` / `half` / `rev-*`, three breakpoints 600 / 900 / 1200 | Reuse |
| Sections | `Section` (ground/paper, rule, tight), `Label`, `Statement`, `Lede`, `Body`, `Note`, `TLink`, `InlineLink`, `Crumb`, `ServiceOpener`, `Plate`/`PlateRow`, `NotPromised`, `Fit`, `ScopeRows` (static or `ScopeDisclosure`), `QuestionRows`, `Close`, `ServiceBands` | Reuse; extend in place (§5) |
| Motion | `DcMotion` (one-shot below-fold reveal via `IntersectionObserver`), `HeroStage` (homepage T1), CSS transitions on chrome | Reuse. Rules in `GATE_4_MOTION_SPECIFICATION.md` |
| Chrome | `SiteHeader` (client; non-sticky; disclosure, not `role=menu`; `inert` closed panels; Escape returns focus), `SiteFooter`, `nav.ts` (one data source) | Becomes global in B1 (`GATE_4_CHROME_MIGRATION_STRATEGY.md`) |

**What is missing for the remaining routes** (VERIFIED by mapping every section in `GATE_4_ROUTE_MIGRATION_MATRIX.md` §4):
a data-table primitive; a figure frame for the inherited SVG figures; entry/listing rows; a finding row; a two-state
comparison; form fields; a long-form prose renderer skin; an in-page contents block; a document layout for legal text; a
disclosure-group for FAQ; a crumb that accepts any trail. That is **eleven** additions (§5.2). Everything else is reuse.

---

## 2. Tier 1 — global design primitives

### 2.1 Tokens

| Group | Rule for Gate 4 |
|---|---|
| Colour | **No raw hex values in route or component code.** Only `--dc-*` roles. Text never uses `--dc-gap` (3.13:1 = marks only); not-measured text uses `--dc-gap-text`. Input and plate boundaries use `--dc-control`. This retires the Gate 0 contrast failures (input 1.30:1; gap-as-text 3.13:1) **by migration**, not by a separate fix |
| Surfaces | Four: `ground` (ivory), `paper`, `ink` (reverse) and `tangerine` (close). **At most two counted inversions per page** (ink or tangerine bands), as on `/` (`GATE_2_IMPLEMENTATION.md` D8). Paper/ground alternation marks a turn in the argument, never decoration |
| Accent | Tangerine has three roles: `--dc-tang` (fills), `--dc-tang-display` (large type and marks), `--dc-tang-small` (small text and hover, contrast-safe). One accent only (`DEC-029` §4 binding) |
| Spacing | `--dc-rhythm` between sections, `--dc-rhythm-tight` for openers and dense sections, `dc-stack-{sm,md,lg}` inside. **No literal pixel padding on sections** (this is the 4C correction of the `1557f74` `py-[50px]` regression, `DEC-030`) |
| Measure | Running text ≤ `58ch` (`--dc-measure`); display measures in `em` (Gate 3 R2: `ch` resolves from the wrong face). This is the 4A/4C correction of the 104–161 cpl lines (`DEC-030`, Gate 0 R8) |

### 2.2 Typography

| Role | Element | Rule |
|---|---|---|
| Hero display | the route `<h1>` | `dc-display` + `--dc-t-hero` only on `/`. Every other route's H1 uses `dc-display` at the opener size (the `/seo` and `/services` scale), so the homepage stays the loudest page |
| Statement | `<p>` under a chapter label | `dc-statement`. Never promoted to a heading (approved heading model) |
| Chapter label | `<h2>` | `Label`. It **is** the section heading |
| Title | `<h3>` inside sections | `dc-title` |
| Body / lede / note | `<p>` | `dc-body`, `dc-lede`, `dc-note` |
| Numbers | any figure | `dc-num` (tabular, lining) |
| Prose (rich text) | CMS `h2`–`h4`, `p`, lists, quotes, tables, images | A new scoped skin, `dc-prose` (§5.2). It maps CMS headings onto `dc-title` / `dc-label` sizes **without changing the element** the renderer emits |

### 2.3 Grid and responsive rules

- One 12-column grid (`dc-g12`) inside `dc-wrap` (max 1360px, fluid gutter 16–56px). Breakpoints **600 / 900 / 1200** only.
  Gate 4 adds **no** new breakpoints. Behaviour at the QA widths (320–1440) is checked against these three.
- Compositions: `main` (1–7) + `side` (9–12); `half` + `half`; `rev-side` (1–4) + `rev-main` (6–12); full-width `statement`.
  Below 900px everything stacks **in DOM order**, which equals reading order. A composition may not rely on visual reordering.
- **Mobile is composed, not stacked.** Per Master Handoff: each migrated route gets explicit ≤599px decisions about what
  leads, what follows the CTAs (e.g. the `/seo` horizon panel) and how wide figures behave.
- Wide figures and tables: never page-level horizontal scroll. A contained scroll region is allowed only when the content
  cannot reflow, and then it is focusable, labelled, and has a visible edge cue.

### 2.4 Navigation and footer

Global from B1. One data source (`nav.ts`). The labels, the destinations, the Services split control and the "Company"
group are approved (`DEC-034`, `DEC-036`). Gate 4 changes **no destination and no label**. Details:
`GATE_4_CHROME_MIGRATION_STRATEGY.md`.

### 2.5 Buttons and CTA variants (closed set)

| Variant | Use | Constraint |
|---|---|---|
| `dc-btn-primary` | the route's single primary action → `/contact` | Label comes from the route (approved copy) |
| `dc-btn-secondary` | "Book a call" → `/schedule-call` | Always paired with primary, never alone except on `/schedule-call`'s own booking actions (which are `BookingLink`) |
| Header bar button | "Contact Us" | Chrome only |
| `dc-tlink` | a tertiary offer ("an offer, never a gate, never a third button") | Never styled as a button |
| `dc-inline-link` | links in running text | Underlined, 1.5px; hover 3px + `--dc-tang-small` |
| Form submit | `/contact` only | **Must use `dc-btn-primary`** (fixes Gate 0's "submit differs from every other primary CTA") |

**No new CTA variant, colour, size or position** may be introduced in Gate 4. No sticky CTA. No third button. (LOCKED, Gate 0 §16.3.)

### 2.6 Focus and interaction states

- Focus: 3px solid outline, 3px offset; ink on light, ivory on ink, ink on tangerine. **Never `outline: none`** in Direction C
  code. Legacy code has 31 `outline-none` occurrences (Gate 0 §14); they leave with the legacy components.
- Hover: colour and underline-thickness only; marks may shift by transform. No lift, shadow or scale on non-interactive
  surfaces (retires the legacy "hover-lift" cards on `/portfolio/[slug]`).
- Targets ≥ 44×44px for every interactive element (Direction C standard; Gate 0's floor was 40px).
- Forced colours: every state that is shown by a fill must also be shown by a border or system colour (A2 pattern).

---

## 3. Fonts — the one global decision Gate 4 must make

### 3.1 Current state (VERIFIED)

| Face | Loaded by | Size | Where |
|---|---|---|---|
| Bricolage Grotesque (Google, **no `opsz` axis**) | `app/layout.tsx` via `next/font/google`, preloaded | ~41 KB | every route |
| Manrope | `app/layout.tsx`, preloaded | — | every route |
| Bricolage opsz instance (self-hosted, OFL) | `components/direction-c/fonts.ts`, through `DcPage` | 75 KB, preloaded | Direction C bodies only |

So a Direction C route downloads **both** Bricolage files (139 KB of fonts). Each route that migrates adds the opsz preload.
When every route is migrated, the Google Bricolage file is used only for chrome titles and as a fallback (Gate 3 X4).

### 3.2 Options (for B11, not needed before B1)

| Option | Effect | Risk |
|---|---|---|
| **F1 — Consolidate on the opsz instance** (load it in the root layout; drop the Google Bricolage) | One display file site-wide, 75 KB. Net saving of ~41 KB per route once all bodies migrate. The chrome gains opsz rendering | Changes chrome title rendering slightly on every route (measure it). Changes `layout.tsx` (REVIEW) |
| F2 — Keep both | No change | Permanent ~41 KB duplicate on every route |
| F3 — Drop opsz | Saves 75 KB | Rejected at Gate 3 (decision 2): the display type needs it |

**Recommendation: F1, executed in the final cleanup batch (B11), with a throttled CLS run on every route.** Owner decision
required then, not now.

### 3.3 Fallback calibration does not scale by itself

The three `@font-face` fallbacks use `size-adjust` values tuned to **the exact approved display strings** of `/`, `/services`
and `/seo`. The file says so: *"if a display line changes, re-run the sweep"*. Every migrated route brings new H1 and
statement strings. Without re-calibration, an above-the-fold H1 can re-wrap when the opsz face arrives, which is CLS.

- **Rule for every batch:** run the throttled CLS check on each migrated route at all seven widths. If above-fold display
  text re-wraps, either widen the calibration window (re-sweep across the new strings) or accept a residual that is recorded
  only when it is below the fold (the X1 precedent).
- `sweep.cjs` is **archival** (`QA_REGRESSION_RUNBOOK.md` §4). B0 ports it into the reusable harness.
- Android has no Arial, so the calibration does not apply there (X2, WORKING HYPOTHESIS). This is part of the E1 device pass.

---

## 4. Tier 2 — reusable section components

### 4.1 Reused unchanged (already approved)

`Section`, `Label`, `Statement`, `Lede`, `Body`, `Note`, `TLink`, `InlineLink`, `ActionPair`, `ServiceOpener`, `Plate`/`PlateRow`,
`NotPromised`, `Fit`, `ScopeRows`, `QuestionRows`, `Close`, `Mark`, `DcMotion`.

`ServiceBands` and `HeroStage` are route-specific (§6) and are **not** reused elsewhere.

### 4.2 Extended in place (small, backwards-compatible)

| Component | Extension | Why | Guard |
|---|---|---|---|
| `Crumb` | Accept a pre-built `trail` as well as `label` + `path` | `RouteBreadcrumb` (problems, research, press) builds deeper trails; legal pages hand-write theirs | JSON-LD still comes from the **caller's** trail function. Diff it byte-for-byte |
| `ActionPair` / `Close` | Optional `secondary` render-prop, so `/schedule-call` can place a `BookingLink` | `BookingLink` is the `meeting_started` boundary | Default output on the three approved routes must stay byte-identical (served-HTML diff) |
| `ScopeRows` | `numbered` variant | `/lead-generation` uses `ScopeList numbered` | — |
| `NotPromised` | Without the strike-through (already removed, R4); accepts any "stated list" | `/pricing` "not for", `/how-it-works` lists | Text unchanged |

### 4.3 New section components (eleven, each built in the batch that first needs it)

| Component | First consumer (batch) | Responsibility | Accessibility contract |
|---|---|---|---|
| `Figure` | `/ai-seo`, `/conversion-optimization`, `/lead-generation` (B3) | A frame for the inherited SVG figures (`ChainLossZones`, `ChainTerminus`, `AiLayers`, `MethodChain`, `CauseZones`): label, caption, key, "structure only" note | Caption or `aria-describedby`; figure text never below 12px at 320px (X5 class) |
| `DataTable` | `/ai-seo` `CrawlerTable` (B3), `/pricing` `FactorMatrix` (B4) | Rules-only table (no zebra, no cards); stacked-row layout ≤599px | `<caption>`, `scope`, row headers; stacked layout keeps header association |
| `Sequence` | `/problems` `CheckSequence` (B4) | Ordered steps with a spine | `<ol>`; step numbers not announced twice |
| `FindingRows` | `/problems`, `/how-it-works`, `/research` (B4/B5/B7) | A finding with its scope | — |
| `Compare` | `/about` `StateComparison` (B5) | Two states side by side ≥900px, stacked below | Each state is a labelled group |
| `DisclosureGroup` | `/faq` (B5) | Native `<details>`, the `/seo` scope pattern; one question per row | Works without JS; summary is the accessible name |
| `Field` (+ `FieldError`, `ErrorSummary` skin) | `/contact` (B6) | The visual layer for `ContactForm` inputs | Keeps the form's existing `aria-invalid`/`describedby`/error summary wiring; boundary `--dc-control` |
| `EntryRows` | `/blog`, `/research`, `/press`, `/work`, 404 (B7, B9, B10) | Listing rows: kicker, title, standfirst, meta; one link per row | One accessible name per row; no nested interactive elements |
| `Prose` (`dc-prose`) | `/research/[slug]`, `/press/[slug]` (B7), `/blog/[slug]` (B8), `/portfolio/[slug]` (B9) | A scoped style for rich-text output | Styles elements only. **Renderer output (elements, IDs, link props) is not changed** |
| `Contents` | `/blog/[slug]` (B8), legal (B10) | In-page contents list; in flow, **not sticky** | Landmark `nav` with a label; target headings get `scroll-margin-top` |
| `DocumentLayout` | `/privacy-policy`, `/terms` (B10) | Contents + numbered clauses + one `Aside` style | — |

**Rule against speculative building:** a component is built in the batch of its first consumer and proven there. It is not
pre-built in a "component batch" with no route to verify it against.

### 4.4 Proof and evidence components (4G)

- **`Plate`** is the only proof container. Terms are `Evidence · Method · Limitation`, with `Claim` as a tag (`DEC-035`).
  Limitation is never collapsed, never hidden behind a control and never smaller than the evidence it limits.
- **No number without its scope** on the same plate. No counters, no animated totals, no illustrative dashboards (`DEC-031`).
- **Marks — usage rule** (closes Gate 2 E6, to be confirmed by the owner when first used outside the homepage):
  `named` = a counted, identified enquiry or a filled run; `anon` = traffic / unidentified; `open` = not measured or pending;
  `owned` = the client-owned segment or MappedSkills' accountable boundary, as already used in the chain; `withheld` = **a
  value that exists but is not published**. Because withheld case-study figures must not be "implied" (`DEC-031`), the case
  register **omits** withheld items rather than marking them. `withheld` is therefore not used on `/portfolio/*`.
  This rule is a **proposal** and needs owner confirmation before B9.

---

## 5. Mapping the legacy vocabularies onto Direction C

### 5.1 Resolve (pre-revamp) → Direction C

| Resolve component | Direction C equivalent | Notes |
|---|---|---|
| `CommercialSection` `tone` | `Section` `tone` | Same semantics |
| `CommercialSection` `mode="split"` | `dc-c-main` + `dc-c-side` | — |
| `mode="wide"` | full-width under the label | — |
| `mode="statement"` | `dc-c-statement` | — |
| `mode="reverse"` | `dc-c-rev-side` + `dc-c-rev-main`; or an ink band where production reverses surface | Count it against the two-inversion budget |
| `ChapterLabel` / `Display` / `Lede` / `Body` / `Note` | `Label` / `Statement` / `Lede` / `Body` / `Note` | Same elements (`h2` / `p`) |
| `CommercialHero` / `RouteHero` | `ServiceOpener` (capability pages) or a register-specific opener | Their ignored `mode` prop (Gate 0 §9.3) is not carried over |
| `Breadcrumb` / `RouteBreadcrumb` | `Crumb` (extended) | Trail functions stay where they are |
| `ScopeList` / `ScopeDisclosure` | `ScopeRows` | `ScopeDisclosure` (client) is reused as is |
| `BoundaryBlock` | reverse composition + `NotPromised` / owned statement | As on `/services` and `/` |
| `QuestionList` | `QuestionRows` | — |
| `ProofLink` | `TLink` | Same destination |
| `CommercialClose` | `Close` | Same pair, same labels |
| `ActionPair` (commercial) | `ActionPair` (Direction C) | Same destinations |
| `EntryList` / `FindingList` / `StatedList` | `EntryRows` / `FindingRows` / `NotPromised`-class list | New (§4.3) |
| `StageSystem` / `MethodChain` / `CauseZones` / `CheckSequence` / `FactorMatrix` / `StateComparison` | `Figure` / `Sequence` / `DataTable` / `Compare` | Figures reused inside `Figure`; redraws are 4G and need a separate scope |

### 5.2 Legacy (pre-Resolve) → Direction C

| Legacy | Direction C | Notes |
|---|---|---|
| `Section` / `Container` | `Section` / `dc-wrap` | — |
| `ui/card` (incl. `bg-blue-50`, hover-lift) | none, or `Plate` when the content is evidence | Cards are a Master Handoff anti-pattern ("endless rounded cards") |
| `ui/button` | `dc-btn-*` | — |
| `CTASection` / `blog/CTABlock` / `StickySidebarCTA` | `Close` (end of page) or `ActionPair` | The four "close" implementations (Gate 0 §9.3) reduce to one |
| `BlogHero` | an article opener (route composition) | — |
| `lucide-react` icons (legal pages) | none | Direction C uses no icon set (`GATE_2_IMPLEMENTATION.md` D10) |

---

## 6. Tier 3 — route compositions ("registers")

A register is a **composition grammar for a communication purpose**. Routes in one register share section components and
rhythm. They do **not** share a fixed section list, because their approved content differs.

| Register | Routes | Signature of the register | What must stay distinctive |
|---|---|---|---|
| **Thesis** | `/` | Hero stage (T1), departure line, chain, boundary, evidence, fit, tangerine close | The only hero stage and the only `--dc-t-hero` |
| **Overview** | `/services` | Narrowing bands (4/2/1) | `ServiceBands` stays unique to it |
| **Capability** | 6 service pages | Split opener → situation → work → boundary → measurement/figure → questions → close | Each page's own figure (`ChainDiscovery`, `ChainLossZones`, `ChainTerminus`, `AiLayers`) is its visual identity. **Never give two capability pages the same figure** |
| **Diagnostic** | `/problems/…` | Causes → checks → findings, with the inline action pair | The check sequence as the page's spine |
| **Decision** | `/pricing` | Factors → "not for" → close | The matrix |
| **Method** | `/how-it-works` | The chain as spine; stated lists; client-provides | Candidate second signature moment |
| **Firm** | `/about` | Statements and one comparison | Calm; the fewest components on the site |
| **Question** | `/faq` | Groups of disclosures | — |
| **Form / Booking / Confirmation** | `/contact`, `/schedule-call`, `/thank-you` | One task per page; nothing competes with the form or booking action | `/thank-you`: no second ask |
| **Index** | `/blog`, `/research`, `/press`, `/work`, 404 | Entry rows | — |
| **Report / Release** | `/research/[slug]`, `/press/[slug]` | Findings as plates; methodology and limitations as first-class sections | Limitations never collapsed |
| **Article** | `/blog/[slug]` | Reading column, contents, in-flow CTA | The longest reading experience on the site |
| **Case** | `/portfolio/[slug]` | Challenge → intervention → outcome; plates | Withholding |
| **Document** | `/privacy-policy`, `/terms` | Contents + clauses | — |

**Anti-repetition rules (acceptance criteria in `GATE_4_QA_ACCEPTANCE_MATRIX.md` §3):**
1. No two adjacent sections on a route use the same composition (split after split is allowed only if their surfaces differ).
2. No route outside `/` uses the hero stage; no route outside `/services` uses the bands.
3. Inversions ≤ 2 per route. Tangerine close only where production has a close (not `/thank-you`, not legal pages, not 404 unless production has one).
4. No equal-card grids. Repetition is expressed as rows on rules, which is the Direction C idiom.
5. Every register keeps at least one element that appears on no other register.

---

## 7. CSS architecture through Gate 4

| File | Today | During Gate 4 | After B11 (proposed) |
|---|---|---|---|
| `app/globals.css` (Tailwind v4 + `@layer base` Resolve rules) | global, 177 KB built | unchanged (legacy bodies still need it) | Reduce once no legacy body remains. Dead `components/ui/*` inflates it via Tailwind scanning (Gate 0 §9.3, WORKING HYPOTHESIS on size). Removal = REVIEW |
| `app/resolve-motion.css` (558 lines, `@import`ed by `globals.css`) | global; serves the **retired** homepage (`components/homepage/*`, unrendered since Gate 2) | unchanged | Remove with `components/homepage/*` (E16) after a selector check confirms no legacy route uses `rsv-*` |
| `app/direction-c.css` (chrome + tokens) | global | global | global |
| `app/direction-c-pages.css` (bodies) | imported by `primitives.tsx` → DC routes only | grows by batch; split per register **only if** a register's CSS exceeds ~4 KB gz | Effectively global; consider importing from the root layout |

Budget per batch: Direction C page CSS growth reported in KB gz; no route's total CSS may grow by more than the batch's new
components justify. Report numbers, do not estimate them.
