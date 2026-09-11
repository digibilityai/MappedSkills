# Session 21 — Page Archetypes, F1 Translation and Content Dependencies

**Session:** 21 · **Date:** 2026-09-04 · **Status:** **PLANNING ARTEFACT — PROPOSED.**
**Governed by:** Gate 9B architecture (`docs/16-ux/03_PAGE_TYPE_ARCHITECTURE.md`, `DEC-016`) ·
`docs/16-ux/22_F1_USAGE_TAXONOMY.md` (BINDING) · `docs/06-IA/PAGE_INVENTORY.md` ·
`docs/16-ux/19_OWNER_BLOCKERS_AND_DEPENDENCIES.md`.

**No page is designed here.** This maps approved architecture onto production routes.

---

## 1. The archetypes

| # | Archetype | Routes | Shared structure | Unique Resolve needs | Motion budget | Blockers |
|---:|---|---|---|---|---|---|
| **1** | **Homepage** | `/` | The full eight-region composition | The **only** T1, the **only** signature interaction, both surface inversions, F1 FULL + STATE | T1 1 · T2 3 · T3 4 · sig 1 | People block · own-site diagnostic link · phone/response ownership · `DEC-007` metadata |
| **2** | **Proposition hub** | `/services` | Header · commercial hero · argument · **F1 FULL with the joins marked** · boundary · capability routing · fit · close | The joins **are** the argument — a figure of three tidy stages and no seams states the opposite of the page | T1 0 · T2 1 · T3 2 | **Sequence-dependent on `/how-it-works`, which is BLOCKED** |
| **3** | **Commercial / capability** | `/seo` · `/ai-seo`* · `/google-ads` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` | Breadcrumb · confirmation hero (intent in the searcher's word) · bridge within two sentences · the nine message moves · boundary **above the midpoint** · evidence · fit · close | F1 by class only (§3). **Zero apparatus on the first screen. No figure, no proof module above the fold** | T1 0 · T2 1 · T3 2 | `/google-ads` fee-vs-spend **OWNER-BLOCKED** · `/ai-seo` carries a `[VALIDATION REQUIRED]` claim · `/conversion-optimization` own-diagnostic link is a **technical prerequisite** |
| **4** | **Problem diagnostic** | `/problems/traffic-but-no-enquiries`* | Breadcrumb · symptom in the reader's words · four causes (F2) · self-identification · runnable checks · what each finding means · worked example · commercial transition **last** | F2 at full depth; the checks as an **operable instrument**. **No CTA above the fold. No gate of any kind — no email wall, no score, no grade** | T1 0 · T2 1 · T3 2 | DIAGNOSTIC CTA wording blocked on the entry-offer decision — **the structure survives any answer** |
| **5** | **Methodology / proof** | `/how-it-works` · `/research`* · `/research/{…}`* ×2 | Header · argument · **F1 FULL + STATE (F4)** · what cannot be attributed at a third of the page's weight · evidence · close | The chain and its measured/unmeasured boundary **are** the subject | T1 0 · T2 1 · T3 2 | **F17 — the real stage content — BLOCKED and undrawn. The §2 stage slot RENDERS NOTHING** |
| **6** | **Pricing** | `/pricing` | What is bought → horizon → **price** → what moves the number → what the engagement needs → who this is not for → hardest objection → act | Sparsest surface on the site. **The price is the largest element on its own screen at NARROW.** F8 factor matrix — **not a calculator, produces no quote** | T1 0 · T2 0 · T3 1 | **EVERY FIGURE OWNER-BLOCKED** — prices, inclusions, exclusions, spend separation, minimum engagement |
| **7** | **Conversion surfaces** | `/contact` · `/schedule-call` | Minimal chrome · the surface · what happens next · direct contact | **Mandatory stillness (M6). Zero figures. Zero resolves. Zero T2.** | T1 0 · T2 0 · T3 1 | NAP/entity **OWNER-BLOCKED** · responder portrait blocked on people · **backend does not exist** |
| **8** | **Post-conversion** | `/thank-you` | Confirmation · what happens next · one onward route | `noindex`. **Zero motion.** The conversion-measurement endpoint | — | Currently **orphaned** — nothing links or redirects to it |
| **9** | **Index** | `/work` · `/blog` · `/research`* | Header · index hero · filter · list · close | Hairline rows, not card grids. `CaseStudyCard` **renders nothing** | T1 0 · T2 0 · T3 1 | **`/work` must stay `noindex` and out of the sitemap until ≥1 permissioned case study exists** |
| **10** | **Longform / editorial** | `/blog/[slug]` · `/research/{…}`* | Breadcrumb · article hero · TOC · rich text · FAQ · related · contextual CTA | **Editorial budget: T3 = 1, T1/T2 = 0.** `StickySidebarCTA` becomes in-flow — **no sticky element** | T3 1 | Bylines **OWNER-BLOCKED** — assets publish with **no** "reviewed by" rather than a manufactured one |
| **11** | **Entity / support** | `/about` · `/faq` | Header · argument · evidence · close | `/about` is the page AI systems read for branded answers. `/faq` emits `FAQPage` | T3 1 | `/about` §4 people **BLOCKED** · entity NAP **BLOCKED** · `/faq` currently emits schema for **one** Question against a larger on-page set |
| **12** | **Legal / system** | `/privacy-policy` · `/terms` · `not-found` · `/launch-checklist` | Header · prose · footer | Token restyle only. **`/404` currently hard-codes three blog slugs that all 404** — links must be generated from live routes | T3 0 | Privacy policy states a consent banner is required before launch |
| **13** | **Conditional vertical** | `/industries/manufacturing`* · `/blog/{industrial-b2b}`* | As archetypes 3 and 10 | **DO NOT BUILD** until the manufacturing gate clears. Every internal link must be removable in a **single change** | — | Manufacturing validation gate — **OPEN** |

`*` = route does not exist in production today.

**Archetype 3 warning.** `PAGE_TYPE_CRO_RULES` permits a sticky CTA on several archetypes. **THE
RESOLVE budgets `position:sticky` at 0 and the header is non-sticky at every width.** Where the two
disagree, the visual direction governs presentation: **no sticky CTA is implemented.** Recorded
here rather than silently resolved.

---

## 2. Route work required

| Action | Routes |
|---|---|
| **Create** | `/ai-seo` · `/problems/traffic-but-no-enquiries` · `/research` · `/research/{ai-visibility-baseline}` · `/research/{own-site-enquiry-diagnostic}` · `/work/[slug]` |
| **Redirect (new)** | `/portfolio/:slug` → `/work/:slug` (301) · `/portfolio` → `/work` (301) |
| **Redirect (re-point)** | `/results/:slug` → **`/work/:slug`** — re-pointed *directly*, which is precisely why the consolidation creates **no chain** |
| **Retire route** | `/portfolio/[slug]` — **safe now only because zero case studies are published.** Its slug set is Contentful-driven and **UNKNOWN**; `mappers.ts` `normalizeCaseStudySlug` / `caseStudySlugCandidates` must be understood first |
| **Keep unchanged** | the 9 existing redirects (all `permanent:true` → **308**) |
| **Never merge / never retire** | Nothing. **No backlink, ranking, impression or click data exists for any URL**, so equity is UNKNOWN and consolidation would destroy unquantifiable value |

---

## 3. F1 production translation

### 3.1 The binding assignment (unchanged — this session does not redesign F1)

| Route | Class |
|---|---|
| `/` | **A — FULL** (Block 3) **+ C — STATE** (Block 4, *the same instance*) |
| `/services` | **A — FULL**, joins marked |
| `/how-it-works` | **A — FULL + C — STATE** (as F4) |
| `/seo` | **B — PARTIAL**, discovery segment |
| `/conversion-optimization` | **B — PARTIAL**, landing/enquiry segment (the shallow four-zone variant — *the same object* as F2-shallow, not two figures) |
| `/lead-generation` | **C — STATE** at the chain's terminus |
| **Every other unconditional route (16)** | **D — NONE** |

**F1 appears on 6 of 22 routes. Three carry the full figure. D is the default.**

### 3.2 What production F1 must retain

- **The contextual implementation philosophy.** The isolated F1 prototype was **rejected as bland**;
  the integrated homepage F1 **passed in context**. F1 is therefore never built or judged alone —
  it is built as the answer to the question the preceding chapter opens.
- **The descent** — beginning at `scale(0.44)` / `opacity(0.42)` and scaling to full **is the
  figure's meaning**: the page gets closer to what it has been looking at. It is not an entrance
  animation.
- **The Block 4 STATE on the same instance** — the pre-boundary chain recedes to 34% opacity, the
  boundary rule thickens, two limit annotations appear. **One object in a changed condition, not a
  second figure.**
- **The four mark states**, each carrying **one** meaning everywhere: named · anonymous ·
  unattributed · open. The double line means *your data* in both places it appears.
- **Dashed stretches** for unmeasured spans, **at least one unattached arrival**, and the
  accountability boundary drawn.
- **Quantity safety.** Run lengths encode **how far a route gets**, never how much demand exists,
  and the standing note on the page says so. **No bar, width or magnitude that is not a measured
  fact.**

### 3.3 What must NOT be copied from the isolated 17B / 17C work

- The **isolated presentation** — F1 as a standalone showpiece with its own hero and its own
  ceremony. That is what was rejected.
- **17C's defect where all three drawings rendered at once.** Exactly one drawing is visible at
  every width, and this is verified by **measuring rendered widths**, not by reading CSS.
- Any **motion added to make the isolated figure feel less static.** The fix was *context*, not
  more animation.

### 3.4 F1 versus the Resolve signature — how they stay distinct

| | Resolve signature | F1 |
|---|---|---|
| **What changes** | *What a population is* — anonymous marks become named objects | *The reader's distance from a structure* |
| **Ground** | **Inverts** the surface | Never touches the ground |
| **Reader control** | Reader-driven (the one segmented control) | Not reader-driven |
| **Frequency** | **Once, on `/` only** | 6 routes, 3 classes |
| **Tier** | T1 | T3 (descent) + a still STATE |

F1 must never become **a logo, watermark, background, texture, section divider, rule motif, page
transition, loader or header element**, and **must never taper** — *the distance between "the run"
and "a funnel" is one designer's decision about tapering.*

### 3.5 Narrow re-composition and fallback

- **Three genuine drawings**, selected by width, not one drawing scaled:
  `d-wide` ≥1100 (`1000×216`, horizontal) · `d-med` 700–1099 (`640×458`, **genuine vertical form**)
  · `d-narrow` ≤699 (`330×524`, vertical, **constant 80-unit node interval**).
- **The legend drops to one item on NARROW** — the join tick. The chain's own labels already name
  *demand we cannot see* and *one with no usable trail*. **Honesty distinctions kept; only
  redundant legend entries go.**
- **Static fallback:** the complete chain is in the server-rendered DOM, drawn, at full scale. With
  no JS and under reduced motion **the figure is fully composed and fully readable** — the descent
  is the only thing lost, and the descent is an amplifier.

---

## 4. Content and route dependencies

### 4.1 READY — approved copy exists and no factual block remains

| Route | Note |
|---|---|
| **`/`** | The **validated baseline**. Its blocked slots (people, own-site diagnostic, phone) already render nothing in the approved page — the page is complete without them |
| `/services` | Copy approved. **Sequence-dependent on `/how-it-works`**, so ship after it, or accept a weaker onward route |
| `/seo` · `/social-media-ads` · `/lead-generation` | Approved copy, no unresolved factual block |
| `/problems/traffic-but-no-enquiries` | Approved copy. CTA **wording** blocked; **structure survives any answer** |
| `/about` (§§1,2,3,5,7,8) · `/faq` · `/privacy-policy` · `/terms` · `/thank-you` · `not-found` | |
| `/blog` · `/blog/[slug]` · `/work` | Templates ready; `/work` **`noindex` + out of sitemap** until a permissioned study exists |

### 4.2 PARTIALLY BLOCKED — build the page, leave the slot rendering nothing

| Route | Blocked slot | Unlocked by |
|---|---|---|
| `/` | People/authorship element · own-site diagnostic link · published phone and response ownership | Owner: who works there, in what role; the diagnostic being published |
| `/about` | §4 — named people, real roles, real portraits | Same. **No silhouette, no stock, no "our team" without names.** A staff name surfaced by Google AI Mode is **NOT VERIFIED** |
| `/contact` · `/schedule-call` | §4 entity block — legal name, complete address **with a real postal code**, published phone/email, founding year. Responder portrait | Owner. The current `postalCode` contains the word **"India"** and **must not be carried forward**. The LinkedIn founding year of **2016 is NOT VERIFIED** and must not be defaulted |
| Footer + all `Organization`/`LocalBusiness` schema | The entity block | Same. **Renders nothing rather than a partial address** |
| `/google-ads` | Fee vs spend separation | Owner |
| `/ai-seo` | One `[VALIDATION REQUIRED]` claim | Validation |
| `/conversion-optimization` | Own-site diagnostic link | Technical prerequisite |
| `/research/*` | Bylines | Owner. **Publish with no byline rather than a manufactured one** |

### 4.3 BLOCKED — do not build the blocked part, and do not route around it

| Route / element | Status |
|---|---|
| **`/pricing` — every figure** | **OWNER-BLOCKED.** Prices, inclusions, exclusions, spend separation, minimum engagement. **Do not invent a tier, a range, a "from" price or a placeholder** |
| **`/how-it-works` §2 — F17, the real stages** | **OWNER-BLOCKED and UNDRAWN.** The page's other sections are unblocked and carry its proof value. **The approved stage outline is architecture, not a description of what happens — drawing it would fabricate the exact content the page exists to prove** |
| **`/industries/manufacturing` + `/blog/{industrial-b2b}`** | **CONDITIONAL.** Ship only if the manufacturing gate clears. They ship or defer **as a pair** |
| **Case studies** | Zero published and **none may be invented** |

> **The binding rule, restated:** *do not fill a placeholder with a plausible default, and do not
> reshape the UX so that a missing load-bearing fact stops being needed.* Reshaping is the subtler
> failure. A structure that quietly routes around a blocked fact has **disposed of the blocker**,
> not preserved it. **A blocked slot renders nothing** — not an empty container, not a placeholder,
> not a silhouette, not "coming soon".
