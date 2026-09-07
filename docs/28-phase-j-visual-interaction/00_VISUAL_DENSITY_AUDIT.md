# PHASE J — VISUAL DENSITY AUDIT

**Session:** Phase J — site-wide visual interaction · **Date:** 2026-09-07 · **Branch:** `test_branch`
**Starting HEAD:** `66dff0e` · **Status:** **PROPOSED — AWAITING OWNER / ChatGPT VISUAL APPROVAL**

> **Method.** Every number in this document and in `01_QUANTITATIVE_BASELINE.md` was measured on the
> **running application** (`next dev`, port 3111), by script, against the **rendered DOM** at a
> 1425 px viewport. Nothing here is estimated from source and nothing is carried over from an
> earlier phase's route list. The route inventory was rebuilt from `app/`, `app/sitemap.ts` and each
> route's own `robots` metadata.

---

## 1. Route inventory — rebuilt from current source

`app/(pages)/**` plus `app/page.tsx`. Indexability is each route's **own** `metadata.robots`,
cross-checked against `app/sitemap.ts`.

| Route | Type | Indexable | Current visual character |
|---|---|:--:|---|
| `/` | Homepage | yes | The only route with motion and interaction. Dark hero stage, one T1, two client leaves |
| `/services` | Commercial hub | yes | Chain figure (F1 class A, full, joins marked) + 7 text sections |
| `/seo` | Capability | yes | Chain figure (F1 class B, discovery segment) + 6 text sections |
| `/ai-seo` | Capability | yes | `AiLayers` figure + 6 text sections |
| `/google-ads` | Capability | yes | **No figure of any kind.** 6 text sections |
| `/social-media-ads` | Capability | yes | **No figure of any kind.** 5 text sections. Shortest route on the site |
| `/lead-generation` | Capability | yes | Chain figure (F1 class C, terminus state) + 5 text sections |
| `/conversion-optimization` | Capability | yes | Chain figure (F1 class B, loss zones) + 6 text sections |
| `/problems/traffic-but-no-enquiries` | Diagnostic | yes | `CauseZones` figure + 6 text sections. Highest word count of any commercial route |
| `/how-it-works` | Method | yes | `MethodChain` + 2 further figures + 7 text sections |
| `/pricing` | Commercial | yes | `FactorMatrix` + 7 text sections |
| `/about` | Entity | yes | **No figure of any kind.** 8 sections, 8 of them text-only |
| `/faq` | Support | yes | **No figure of any kind.** 8 sections, 8 of them text-only |
| `/contact` | Conversion | yes | The enquiry form. Zero figures **by rule** |
| `/schedule-call` | Conversion | yes | Booking. Zero figures **by rule**. 7 sections, 7 text-only |
| `/thank-you` | Post-conversion | **no** | Calm, 2 sections. Zero figures **by rule** |
| `/work` | Index | **no** | `noindex` on proof policy — no publishable case studies |
| `/blog` | Editorial index | yes | Honest empty state |
| `/blog/[slug]` | Editorial | yes | Contentful-driven. **No entries at launch — not measurable** |
| `/portfolio/[slug]` | Case study | yes | Contentful-driven. **No entries at launch — not measurable** |
| `/privacy-policy` | Legal | **no** | Narrow centred reading column |
| `/terms` | Legal | **no** | Narrow centred reading column |
| `/launch-checklist` | Internal | **no** | **Returns 404 in this environment** — the route calls `notFound()` unless enabled |
| `/api/enquiry` | API | n/a | Not a content surface. **Protected — untouched** |

**22 addressable routes; 18 substantive routes were measurable and all 18 were measured.**
Two dynamic routes have no entries at launch and are therefore recorded as **UNKNOWN**, not
estimated.

---

## 2. Shared components actually in production

Established by grepping `app/` for `@/components/**` imports. This matters: `components/` holds a
large legacy surface that no live route reaches, and auditing it would have produced a false
picture.

| In production | Purpose |
|---|---|
| `components/commercial/primitives.tsx` | `Mark` · `Breadcrumb` · `CommercialSection` · `ChapterLabel` · `Display` · `Lede` · `Body` · `Note` · `ProofLink` · `ActionPair` — **18 import sites, the most reused module on the site** |
| `components/commercial/ScopeList.tsx` | "What the work involves" hairline rows — **the same shape on six capability routes** |
| `components/commercial/ChainFigure.tsx` | F1 "the run" in three classes. Two genuine drawings per figure, one per width band |
| `components/commercial/BoundaryBlock.tsx` · `CommercialHero` · `CommercialClose` · `QuestionList` · `AiLayers` | Commercial archetype |
| `components/routes/*` | `MethodChain` · `CauseZones` · `FactorMatrix` · `CheckSequence` + Phase G primitives |
| `components/homepage/*` | The homepage, including its **only three client leaves**: `HeroSurface`, `SystemStages`, `HomepageMotion` |
| `components/layout/*` | `Header` (non-sticky) · `Footer` · `Container` · `Section` |
| `components/forms/ContactForm.tsx` · `components/analytics/*` | **Protected. Out of Phase J scope entirely** |

**Every Phase F and Phase G route is a Server Component with no client leaf.** There is no
observer, no start state and no hydration gap anywhere outside the homepage.

---

## 3. Section-level classification

Every one of the **112 sections** on the 18 substantive routes was classified. Full per-section
data is in `01_QUANTITATIVE_BASELINE.md` §3.

| Class | Definition | Count | Share |
|---|---|:--:|:--:|
| **A — KEEP TEXTUAL** | Reading is the job, or the section is a governed conversion surface | 41 | 37% |
| **B — REDUCE TEXT + ADD VISUAL** | A short visual would carry part of the claim the prose now carries alone | 33 | 29% |
| **C — CONVERT TO VISUAL EXPLANATION** | The section states a **spatial or structural** fact in prose | 14 | 13% |
| **D — CONVERT TO INTERACTIVE EXPLANATION** | The section is a **set the reader should be able to examine one member of at a time** | 17 | 15% |
| **E — REMOVE REDUNDANT EXPLANATION** | Says something an adjacent section already said | 7 | 6% |

**Class E is deliberately small.** The copy on this site was written against an approved messaging
architecture and a proof policy, and most of it is load-bearing. **Phase J is a composition and
comprehension problem far more than it is a word-count problem**, and treating it as the latter
would attack the wrong thing.

---

## 4. The five findings

### 4.1 The site has one left edge — this is the single largest finding

**110 of 112 commercial sections (98.2%) begin at exactly the same left x-coordinate.**
At 1425 px that coordinate is `56 px`; at 390 px it is `16 px`. The two exceptions are one
`/problems/…` section at 56 px→ and one homepage departure block.

This is not a subjective impression. It is a direct consequence of every route composing through
`CommercialSection` → `Container(max-w-1400) + px-var(--resolve-pad)`, and it is why the site reads
as one long column no matter how good each individual section is.

> **It is also the cheapest thing on this list to fix.** It requires no new figure, no motion, no
> interaction and **no copy change at all** — only composition variants on the shared section
> primitive.

### 4.2 Right-hand occupancy is close to zero

Measured as the share of text-bearing elements whose horizontal midpoint falls in the right third
of the viewport at 1425 px:

- **9 of 18 routes place 0% of their text in the right third.**
- The site-wide mean is **left 65% / centre 30% / right 5%**.
- `/contact` is 89/11/0, `/pricing` 82/18/0, `/about` and `/faq` both 81/19/0.

Asymmetry is encouraged by the design direction. **What exists now is not asymmetry — it is a
single column with a wide empty margin.**

### 4.3 Interaction exists on exactly one route

**16 of 18 substantive routes contain zero interactive sections.** The two that do not are the
homepage (2 — the Traffic/Enquiries signature control and the Capture/Convert/Measure tablist) and
`/contact` (1 — the enquiry form, which is a form and not an explanation).

**No commercial route lets a reader examine anything.** Every figure on the site is a static,
composed still.

### 4.4 Long unbroken text runs

Longest run of consecutive text-only sections, per route:

| Run | Routes |
|:--:|---|
| **8** | `/about`, `/faq` |
| **7** | `/schedule-call` |
| **6** | `/google-ads` |
| **5** | `/social-media-ads`, `/how-it-works` |
| **4** | `/services`, `/seo`, `/ai-seo`, `/conversion-optimization`, `/pricing`, `/problems/…` |

The Phase J brief's rhythm rule (§31) is **no more than two consecutive visually similar text-led
sections**. **Twelve of eighteen routes breach it**, and `/about` and `/faq` breach it fourfold.

### 4.5 Three of the densest pages are dense BY GOVERNED DECISION, not by oversight

This is the finding that most changes what Phase J may honestly propose.

| Route | Why it has no figure | Can Phase J fix it? |
|---|---|---|
| `/google-ads` | Its assigned figure **F9** (fee vs spend vs measurement) is **owner-blocked**: the underlying commercial fact is `[OWNER INPUT REQUIRED]` and the route header records that F9 therefore renders nothing and **no substitute figure is invented** | **No — not without the owner supplying the fee/spend fact.** Inventing one is fabrication |
| `/social-media-ads` | `docs/16-ux/22_F1_USAGE_TAXONOMY.md` §3 classifies it **D — NONE** with *"no page-specific figure at all"*, explicitly to prevent parity-driven padding | **Only by reopening a BINDING taxonomy** |
| `/contact`, `/schedule-call`, `/thank-you` | The same taxonomy: these three carry **zero figures of any kind**. The Phase J brief independently reaches the same conclusion at §§36–38 | **No — and it should not.** Brief and governance agree |

> **Recorded plainly:** the two worst text-density scores among the capability routes belong to the
> two routes Phase J is **least** free to change. Any rollout plan that quietly "fixes" them is
> either fabricating a commercial fact or breaching a binding taxonomy.

---

## 5. Strongest and weakest existing patterns

**Strongest — these are assets and Phase J should extend them, not replace them.**

1. **The four mark states** (named / anonymous / open-dashed / owned) carry one meaning each,
   everywhere, and every mark's meaning is also in adjacent text.
2. **`ChainFigure`'s two-genuine-drawings rule** — a vertical form below 761 px and a horizontal
   form above it, never one drawing scaled, with the boundary conditions written as exact
   complements so no width renders neither.
3. **`SystemStages`' progressive-disclosure contract** — server-rendered all-open fallback, real
   tablist with roving `tabindex`, `inert` on collapsed panels, auto-advance cancelled for good on
   first reader input, and all three panels composed open under reduced motion.
4. **Quantity safety** — points and joins only, nothing tapers, no length encodes a rate.
5. **The dashed register** as an honesty device for *not measured / unattributed*.

**Weakest**

1. One left edge, on 98% of sections.
2. Figures are **terminal**: they are drawn, and then the reader is returned to prose.
3. Every section silhouette is `label → display line → paragraphs`, so a reader cannot tell from
   the shape of a section what kind of thing it is.
4. `/about` and `/faq` — the two routes carrying the firm's credibility — are the two flattest.
5. Mobile inherits the desktop stack rather than being composed for touch.

---

## 6. What this audit does not do

It does not approve a direction, change any production file, reopen strategy, messaging, copy, the
IA, the F1 taxonomy or the motion budget, or begin implementation. **Gate: PROPOSED.**
