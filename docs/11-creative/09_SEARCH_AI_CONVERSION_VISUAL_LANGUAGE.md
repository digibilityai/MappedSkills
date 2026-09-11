# Search, AI, Conversion and Measurement — Visual Language — APPROVED

**Session:** 12 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** APPROVED — 2026-09-01 (Gate 9A, `DEC-015`).

Four visual languages, one for each of the disciplines the site must express. Each states what is prohibited, what the material actually is, and how it is rendered.

---

## 1. Search

### 1.1 Prohibited
Magnifying-glass icons as a signifier of search · Google's logo or any search engine's logo as decoration · fake or generic SERP screenshots used as wallpaper or texture · ranking arrows · "#1" imagery · position numbers as graphics · a fake search field in a hero.

**Why the SERP-screenshot ban has a caveat.** A *real* search result or AI answer, dated, annotated and labelled as an excerpt, is legitimate and valuable **evidence**. The prohibition is on SERP imagery as decoration or as a generic stand-in. The distinction is: it carries a retrieval date and a source, or it does not appear.

### 1.2 What the material actually is
**Queries are typographic data.** MappedSkills has a documented keyword universe and a documented search architecture; real query strings are the most legitimate and most under-used visual material available.

- **The query itself**, set in the apparatus register, treated as a recorded string rather than as speech. Not in a search-box graphic. Not in quotation marks styled as a testimonial.
- **Intent families as grouped sets** — the several ways a buyer phrases the same need. The problem page consolidates three symptom families onto one page; showing that consolidation is a genuine explanation of how the site is built.
- **The buyer's words versus the category's words.** `POSITIONING.md` §5.2 requires plain business language over acronyms; showing the two vocabularies side by side is an argument, not a decoration.
- **The result path**: query → surface → source → business. A traced relationship, not a ranking.
- **Source authority as an off-site network.** This is the strategically important one. `AI_SEARCH_LANGUAGE.md` §5 states that appearing in AI answers is "mostly a source-authority problem", that "a material part of this work is off-site", and that "owned-site publishing cannot substitute for it."

> **The visual consequence: a business's own website must be drawn as ONE node among many third-party sources — never as the centre.** A hub-and-spoke diagram with the client's site at the centre would state the opposite of the approved strategy. This is a design rule with strategic teeth.

### 1.3 Rendering
Queries in the apparatus register. Real SERP and AI-answer excerpts as dated, annotated artefacts. Relationships as traced lines using the run's grammar. No icons.

**What is NOT drawn:** rankings, positions, or any implication of movement up a list.

---

## 2. AI search

### 2.1 Prohibited — absolutely
Glowing brains · robots · neural-network wallpaper · purple or violet "AI" gradients · chat bubbles as a motif · fake chatbot UI · a prompt field as a hero device · magic sparkles · generic AI iconography · a dark app shell borrowed from an AI product.

**Observed evidence for the last two:** Perplexity's signed-out landing (2026-09-01) is a dark app shell with a centred prompt field and a teal accent; Profound's homepage is near-black with a motion-blurred rotating platform name. That is the current product-category identity. **MappedSkills is not that product**, and borrowing the identity would over-weight AI instantly, regardless of what the copy says.

### 2.2 The governing constraint
`AI_SEARCH_LANGUAGE.md` §0 and §7 are binding and both halves are load-bearing:

- **Visible** — genuine expertise demonstrated on `/ai-seo`, in a launch article, in a published research baseline.
- **Subordinate** — **not on the homepage's first screen**, one clause among several capabilities, no AI section, no AI hero, no AI hype block, and nowhere at all on `/about`, `/contact` or `/pricing`.

> **The visual rule that enforces it:** AI systems are rendered in **exactly the same visual register as every other discovery surface**. Organic search, paid search, paid social and AI assistants sit in the same list, in the same type, with no special treatment, no accent colour, no icon and no badge. **The absence of special treatment is the design decision.**

### 2.3 The one place AI search gets a distinctive treatment — and it is honesty, not glamour

On `/ai-seo` and in the research entry, the distinctive visual move is **separation**:

**The four layers, never merged** (`AI_SEARCH_LANGUAGE.md` §6):

| Layer | The question | MappedSkills' own result |
|---|---|---|
| Retrieval | Can a system find and read the site at all? | Works — full access, served correctly |
| Discovery | Does the business appear when the buyer does not name it? | **Zero, in 28 unbranded runs** |
| Recommendation | Is the business actually recommended? | Zero |
| Citation | Is the site used as a source in an unbranded answer? | Zero |

Rendered as four separate results, never combined. As the approved document says: "The whole finding would be invisible under any single score." **That sentence is a design brief.** A figure showing retrieval working while the three layers above it are zero is the clearest possible argument that a score is the wrong instrument — and it is first-party, dated and ready to publish.

**Per system, never blended.** Four systems measured, two not testable. The not-testable pair is rendered in a visually distinct state that cannot be read as a value (`08_EVIDENCE_DESIGN_LANGUAGE.md` §4 rule 4).

**Frequency, not rank.** `/research` §1: "We report how often something appeared across repeated runs. We do not report a position, because the order changed in every repeated prompt we measured." **Therefore: no ordered list, no leaderboard, no position graphic, and no visual that implies a stable ordering.** Frequency across runs is the only shape permitted.

### 2.4 Prohibited by implication, not only by imagery
No figure may imply: a guarantee of appearance · a rank in any AI system · a blended cross-system score · that crawler access, `llms.txt` or schema produce visibility · any trend or change over time (there is one measurement) · any statement about Claude or Grok.

---

## 3. Conversion

### 3.1 Prohibited
Funnels · funnel-shaped anything · giant CTA buttons · upward arrows · percentage counters · animated conversion-rate figures · a "before and after" metric pair (the existing `BeforeAfterMetric` component renders exactly this).

### 3.2 What the material actually is
Conversion here is **interruption in a continuous path**, not a narrowing shape. That difference is the whole design idea.

| Concept | Visual treatment |
|---|---|
| **Friction** | Resistance along a segment — the path continues but is impeded. Not a shape that narrows |
| **Leakage** | A departure **from** the path, drawn where it occurs. The volume that leaves is a real quantity, not an implied one |
| **Paths** | The run, with the conversion stretch emphasised |
| **Decision points** | Junctions where a real choice occurs — a page, a form, a booking |
| **Form completion** | The form's own states are the design object: a field, an error, a submission, an arrival. `/contact` is a conversion surface where proof is a distraction |
| **Booking** | The same, for the booking surface |
| **Enquiry arrival** | **The terminus, and it deserves design attention equal to the hero** |
| **Diagnosis** | The four-cause decision tree — the problem page's core value |

### 3.3 The specific recommendation this section exists to make

> **Design the enquiry-arrival state as a first-class surface, not as an afterthought.**

The firm's entire proposition is that the enquiry is the unit it answers for. **VERIFIED FACT (Sessions 01/01B):** the production form currently has no `action`, no endpoint, and displays a success screen that transmits nothing; the booking widget renders an empty 384px box. The approved problem-page copy makes this the firm's own worked example: *"A success screen is not proof of delivery. A form can display 'thank you' and transmit nothing — ours did."*

A firm that says that in copy and then ships a generic thank-you page has contradicted itself. **The `/thank-you` surface, and what it tells the person about what happens next, is a design priority — not a leftover.**

### 3.4 Also binding
No modals, no interstitials, no exit-intent (`PAGE_TYPE_CRO_RULES.md` §11.4). Sticky CTA is permitted only where the approved rules permit it, and is **prohibited** on `/how-it-works`, `/research`, `/research/*`, `/blog` and `/blog/*` — a visual constraint as much as a CRO one.

---

## 4. Measurement

### 4.1 Prohibited
Dashboard decoration · fabricated analytics screens · fake chart panels · KPI tiles · gauges · speedometers · scorecards · any invented product UI. **MappedSkills has no proprietary dashboard product** (brief §16), and inventing one visually is fabricated proof.

Real analytics screenshots may be used later where genuine, useful and permitted — dated and annotated like any other artefact.

### 4.2 What the material actually is

| Concept | Visual treatment |
|---|---|
| **Traceability** | A continuous connection from source to enquiry, drawn on the run |
| **Source → enquiry** | The connection recorded at the moment the enquiry is made — not reconstructed later. `/how-it-works` §3 makes this distinction explicitly; it is worth drawing |
| **Known vs unknown** | Continuous versus dashed. The site's most important visual distinction |
| **First-touch vs conversion-touch** | Two marks on one route, not two separate diagrams |
| **Missing attribution** | An arrival with no upstream segment, at true proportion (`08_EVIDENCE_DESIGN_LANGUAGE.md` §5.2) |
| **Evidence strength** | The status vocabulary — never a meter, never a percentage |
| **Comparison to baseline** | A marked line, labelled as captured **before** anything changed. Where no baseline was captured, the figure says so rather than starting the axis at an invented point |
| **Measured boundaries** | Where measurement stops — drawn as an edge, not implied by a blank |

### 4.3 Visualising uncertainty honestly — the rules

1. **Uncertainty is shown as extent, never as a point.** Where a value has a range, the range is the value. A single figure standing for an uncertain quantity is a false precision.
2. **No decimal precision the data does not support**, and **no mean of unstable values** — `VOICE_AND_TONE.md` §8.5, and the direct reason "rank in AI" is not reported.
3. **An axis never starts at a value chosen to make a change look larger.**
4. **A single measurement is never drawn as a trend.** One point, one dot, no line. `AI_SEARCH_LANGUAGE.md` §4.6: there is one measurement, and "one measurement is not a trend" is stated rather than implied.
5. **No blended figure across systems, ever.** Blending destroys the only stable signal.
6. **Every chart carries its sample, date, location and method in the apparatus** — not in a caption nobody reads, and not omitted because the chart "speaks for itself".
7. **Charts are readable in greyscale and have a text or tabular equivalent.** These figures are exactly what a journalist or an AI system might cite.
8. **No red-amber-green. Colour never grades a result.**

---

## 5. The single rule underneath all four

> **Every one of these disciplines is drawn as part of one system, not as four separate visual worlds.**

Search, AI search, conversion and measurement share the same run, the same apparatus, the same status vocabulary and the same register. That is not a stylistic preference — it is `MESSAGING_ARCHITECTURE.md` §3 Level 4 rendered visually: the outcome is produced by capture, conversion and measurement "as connected parts of one system, with the joins between them owned."

**If a designer produces four distinct visual languages here, the site will read as an agency with four service lines — which is the identity the strategy rejects.**
