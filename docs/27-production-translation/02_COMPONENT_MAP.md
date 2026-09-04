# Session 21 — Component Reuse Audit, Homepage Map and Design-System Map

**Session:** 21 · **Date:** 2026-09-04 · **Status:** **PLANNING ARTEFACT — PROPOSED.**

Classifications: **A** keep as-is · **B** keep + restyle · **C** keep structure / replace
presentation · **D** refactor · **E** replace · **F** remove / retire · **G** new component required.

---

## 1. Existing component reuse audit

### 1.1 Layout and chrome

| Component | Class | Current role | Reasoning | Resolve action | Risk |
|---|:--:|---|---|---|---|
| `components/*.tsx` **re-export shims** (27) | **A** | One-line aliases to `sections/`, `layout/`, `cards/`, `forms/`, `filters/` | 22 call sites import `@/components/Section` alone. The shim is the **swap seam** — a Resolve implementation slots in behind it without touching pages | Keep every shim. Re-point them as targets are replaced | **LOW** |
| `layout/Container.tsx` | **B** | `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8` | Correct shape, wrong numbers. Resolve wrap is `min(1400px,100%)` with `clamp(18px,3.4vw,56px)` padding | Change the two values; keep the API | **LOW** |
| `layout/Section.tsx` | **D** | `<section className="py-16">` | A fixed 64px rhythm cannot express per-chapter `clamp()` spacing, and the Resolve chapters carry *energy*, not uniform padding | Add a `tone` (`light`/`dark`/`accent`) and `rhythm` prop; keep `id` for skip targets | **LOW** |
| `layout/Header.tsx` | **E** | Sticky, backdrop-blur, Radix dropdown, crimson accent | **Two hard conflicts.** (1) `sticky top-0 z-50` — the approved page has **0 sticky/fixed** and the direction requires a non-sticky header at every width. (2) The *Services* parent is a `DropdownMenuTrigger` **button**, so `/services` is unreachable from the desktop nav — the exact Session 01 structural defect the prototype fixes | Replace with `ResolveHeader`: non-sticky, **parent is a real link + a separate adjacent disclosure with `aria-expanded`**, hover as a fine-pointer enhancement only, `Escape` closes and restores focus | **MEDIUM** — nav is on every route |
| `layout/Footer.tsx` | **C** | Link columns + entity block | Structure is right; presentation and the mobile grid are not. 18C measured the stacked footer at **two full mobile screens, 21% of the page** | Keep the four columns; **two columns on NARROW**, larger row gap, deeper top margin, ≥40px targets. Entity block **renders nothing** while NAP is owner-blocked | **LOW** |
| `components/Logo.tsx` | **B** | `'use client'`, raster logo | The prototype's logo is **display type at 800 weight, `-0.045em`**, not an image — and it measures 32px today, under the 40px floor | Restyle; keep the raster only if the owner requires the exact mark. Must reach 40×40 | **LOW** |

### 1.2 Sections

| Component | Class | Current role | Reasoning | Resolve action | Risk |
|---|:--:|---|---|---|---|
| `sections/Hero.tsx` | **E** | Generic hero: badge + h1 + description + 2 CTAs + right-column slot. Three blurred `bg-accent/5` radial divs | The blur washes are **decorative atmosphere** — prohibited. The Resolve hero is a two-state surface carrying the page's only T1 and its only signature interaction. Nothing of the internals survives | Replace with `ResolveHero` (homepage) and `CommercialHero` (archetype) | **HIGH** — 13 call sites |
| `sections/HeroDashboard.tsx` | **F** | Fabricated dashboard visual | It is a **manufactured metrics display**. Quantity safety prohibits any magnitude that is not a measured fact | Retire | **LOW** |
| `sections/SocialProofStrip.tsx` | **F** | Trust metrics row | The homepage rules prohibit logo wall · client count · testimonial · rating · award · "trusted by" · any business-performance metric | Retire | **LOW** |
| `sections/CTASection.tsx` | **C** | End-of-page CTA band | The role is exactly right and it is used **14 times**. The presentation is not: the Resolve close is a **full-bleed tangerine surface inversion** with arriving marks | Keep the seam and the API; replace the presentation with `ResolveClose` | **MEDIUM** |
| `sections/FAQSection.tsx` | **B** | Radix accordion + `FAQPage` schema | Disclosure is legitimate here and the schema is worth keeping | Restyle to Resolve rules: hairlines not cards, no icons, ≥40px triggers | **LOW** |

### 1.3 Cards — the largest single deletion

| Component | Class | Reasoning |
|---|:--:|---|
| `cards/TestimonialCard.tsx` | **F** | No permissioned testimonial exists. Prohibited on the homepage outright |
| `cards/StatCard.tsx` · `cards/BeforeAfterMetric.tsx` | **F** | Both render a **magnitude**. Every number needs its sample, date, location and method; neither carries one |
| `cards/CaseStudyCard.tsx` | **C** | **Zero case studies are published.** Keep the structure for `/work`; it renders nothing until a permissioned study exists. `/work` must stay `noindex` and out of the sitemap until then |
| `cards/ServiceCard.tsx` · `cards/IndustryCard.tsx` · `cards/ValueCard.tsx` | **E** | The approved capability treatment is **one line per capability with a hairline, no icons, no cards, no equal-weight grid**. A card grid is prohibited (B14) |
| `cards/ProblemCard.tsx` | **E** | Becomes the friction/recognition composition, not a card |
| `cards/ProcessStepCard.tsx` | **E** | Steps become the CAPTURE/CONVERT/MEASURE tablist. **F17 stays BLOCKED — do not draw the `/how-it-works` stages** |
| `cards/PricingCard.tsx` | **C** | Structure retained, **owner-blocked on every figure**. Do not invent a tier |
| `cards/TeamCard.tsx` | **C** | Structure retained; **renders nothing** while people are owner-blocked. No silhouette, no stock, no "our team" without names |
| `cards/BlogCard.tsx` | **B** | Legitimate editorial index item. Restyle |

### 1.4 Forms and conversion

| Component | Class | Reasoning | Risk |
|---|:--:|---|---|
| `forms/ContactForm.tsx` | **E** | **It submits nowhere** — a `setTimeout` then a success screen. Wrong field set (8/5 required, includes budget). Fires `window.gtag` directly, before the await. Nothing here should be carried forward | **HIGH** |
| `forms/CalendlyEmbed.tsx` | **E** | Calls `Calendly.initBadgeWidget` against an **inline** container, so the container never fills. Vendor selection is an open decision (`FORM_AND_BOOKING_SPEC.md` §3) | **HIGH** |
| `forms/CalendlyButton.tsx` | **C** | A CTA that happens to open a booking surface. Keep the seam, re-point at whatever vendor is chosen | LOW |
| `forms/BlogNewsletterForm.tsx` | **D** | Needs the same real backend and the same abuse screening | MEDIUM |

### 1.5 Content, blog, utility

| Component | Class | Reasoning |
|---|:--:|---|
| `blog/RichTextContent.tsx` · `blog/TableOfContents.tsx` · `blog/AuthorBio.tsx` · `blog/RelatedPosts.tsx` · `blog/FAQSection.tsx` · `blog/RelatedServices.tsx` · `blog/CTABlock.tsx` · `blog/BlogIntroduction.tsx` · `blog/BlogHero.tsx` | **B** | Working Contentful rendering with real schema. Restyle only. `AuthorBio` **renders nothing** while authorship is owner-blocked — **no manufactured byline** |
| `blog/StickySidebarCTA.tsx` | **E** | **Sticky.** Editorial surfaces get **1 T3 and no sticky element**. Becomes an in-flow contextual CTA |
| `blog/SocialShare.tsx` | **B** | Fine; must reach 40×40 |
| `filters/CategoryFilter.tsx` · `filters/ResultsFilter.tsx` | **B** | Legitimate client controls. Restyle to Resolve; keyboard + 40×40 |
| `case-study/CaseStudyContent.tsx` | **C** | Retain; nothing published |
| `lib/utils.ts` (`cn`) | **A** | Keep |
| `hooks/use-mobile.ts` · `hooks/use-toast.ts` | **A** | Keep |
| `lib/design-system.ts` | **F** | The **second source of truth** for colour and type. Retire into CSS variables |
| `components/theme-provider.tsx` | **F** | Unmounted, and **no dark mode is offered**. Retire with `next-themes` |
| `styles/globals.css` | **F** | **Orphan** — imported by nothing |
| `components/ui/*` (56) | **A / B** | shadcn primitives. **Do not rewrite the kit.** Restyle `button`, `input`, `textarea`, `label`, `select`, `accordion`, `badge`, `separator` via tokens. Leave the ~45 unused primitives alone — they cost nothing and touching them is pure regression risk |
| `components/ui/chart.tsx` | **F (deferred)** | Recharts + a `font-mono` class. Not used on any Resolve surface. Retire when `recharts` is dropped |

### 1.6 New components required (G)

`ResolveHeader` · `ResolveFooter` · `ResolveHero` · `TrafficEnquiriesControl` · `ResolveField`
(the lattice) · `Departure` · `FrictionRuns` · `SystemStages` (tablist) · `ChainFigure` (F1) ·
`BoundaryBlock` · `EvidenceDisclosure` · `FitBlock` · `ResolveClose` · `Mark` · `ChapterLabel` ·
`SkipLink` · `useResolveOnView` · `useReducedMotion`.

---

## 2. Homepage production map

**Prototype chapter → production component → reuse scope.** Ten chapters, eight rendered regions.

| # | Chapter (prototype `id`) | Production component | Kind | Reuse scope |
|---:|---|---|---|---|
| — | `#hdr` / `.nav` | `ResolveHeader` | **client leaf** | **Site-wide, all 22 routes** |
| — | skip link + `<main id="main">` | `SkipLink` in `app/layout.tsx` | server | Site-wide |
| 1 | `#hero` — the population | `ResolveHero` (server shell) wrapping `ResolveStage` (client) | **client leaf** | **Homepage only.** The site's one T1 |
| 1a | the `traffic`/`enquiries` control | `TrafficEnquiriesControl` | client | **Homepage only. The one signature interaction** |
| 1b | `#field` — the lattice | `ResolveField` | client | Homepage only |
| 2 | `#dep` — the departure | `Departure` | server + `.on` via observer | Homepage only |
| 3 | `#recog` — the friction | `FrictionSection` wrapping `FrictionRuns` (client) | **client leaf** | Pattern reusable on `/problems/*` |
| 4 | `#system` — CAPTURE/CONVERT/MEASURE | `SystemSection` wrapping `SystemStages` (client) | **client leaf** | Homepage; the **tablist pattern** is reusable |
| 5 | the descent — F1 | `ChainFigure` | server DOM + client `.on` | **`/`, `/services`, `/how-it-works` (FULL); `/seo`, `/conversion-optimization` (PARTIAL); `/lead-generation` (STATE)** |
| 6 | `#bound` — the boundary | `BoundaryBlock` | **server, fully static** | **Reusable — every commercial page** |
| 7 | capabilities (inside `#system`) | `CapabilityList` | server | **Reusable — `/services`** |
| 8 | `#evidence` — what can be checked | `EvidenceDisclosure` | **client leaf** | **Reusable — every page making a claim** |
| 9 | `#fit` — who this is for | `FitBlock` | **server, fully static** | **Reusable — commercial + pricing** |
| 10 | `#cta` — the close | `ResolveClose` | server + `.on` | **Reusable — behind the `CTASection` shim (14 sites)** |
| — | `.foot` | `ResolveFooter` | server | Site-wide |

**Component-boundary rule.** Avoid both failure modes: **one giant `page.tsx`** and **forty
micro-components with no reuse value**. The line drawn here is: *a chapter is a component; a
chapter's interactive behaviour is a client leaf inside it; a repeated visual atom (`Mark`,
`ChapterLabel`) is a component; nothing else is.*

**Server/client rule.** Every chapter renders its **complete, composed, resolved DOM on the
server**. Client components attach behaviour to DOM that already exists and already means the
right thing. **No copy, no link and no figure may be created by client JavaScript.** This is what
makes the no-JS floor structural rather than a fallback that has to be remembered.

---

## 3. Reusable Resolve design-system map

**Rule: every component below maps to an approved page use. Nothing generic is invented.**

### Layout primitives
| Component | Used by |
|---|---|
| `Wrap` (`min(1400px,100%)` + `--ms-pad`) | every route |
| `Section` (tone + rhythm) | every route |
| `Split` (`.92fr/1.08fr` ≥1000px; even variant) | `/`, commercial, `/about`, `/how-it-works` |
| `TwoState` surface (declares both palettes; a state change is a token change) | `/` hero, `/` close |

### Typography
| Component | Used by |
|---|---|
| `Display` (the large approved line — **body copy at scale, not a heading**) | `/`, commercial heroes |
| `ChapterLabel` (`.lab` — uppercase, `.16em`, **the section's real heading element**) | every Resolve section |
| `Lede` (44–46ch) · `Body` (58ch) · `Note` (52ch) | every route |

> The `.lab`/display split is **load-bearing for accessibility**: the small label is the real
> `<h2>` so heading-only navigation delivers the argument, and the large line beneath is approved
> body copy set at scale. Do not "fix" this by promoting the display line to a heading.

### Actions
| Component | Used by |
|---|---|
| `CTA` (pill, `min-height:52px`, tangerine) | every route |
| `CTA --outline` (`currentColor` border; inverts on hover) | every route |
| `CTA --sm` (44px, nav) | header |
| `ProofLink` (underlined text — **an offer, never a gate, and never a third button**) | `/`, commercial, `/pricing` |

### Navigation
`ResolveHeader` (non-sticky) · `NavDisclosure` (link + separate control) · `MobilePanel`
(in-place, not modal; scrolls itself; body locked; the **one permitted, escapable** focus
containment) · `Breadcrumb` (commercial, problem, editorial — **not** `/`, not `/services`).

### Evidence and honesty
`EvidenceDisclosure` (claim → what it stands on: what, when, where, how many, by whom, limits) ·
`ProvenanceList` (two-column `<dl>`, stacks on NARROW) · `LimitNote` ·
`UnmeasuredFill` / `UntestableFill` (the two `repeating-linear-gradient` honesty devices) ·
`BlockedSlot` (**renders nothing** — not an empty container, not a placeholder, not a silhouette,
not "coming soon").

### Figures
`ChainFigure` with `variant="full" | "partial" | "state"` and `segment="discovery" | "paid" |
"landing" | "attribution"` · `Mark` with the four states (`named`, `anonymous`, `unattributed`,
`open`) · `FigureLegend` (**drops to one item on NARROW**).

### Disclosure and control
`StageTabs` (roving `tabindex`, arrows + Home/End, `inert` on collapsed panels, **open and
non-inert with no JS and under reduced motion**) · `Accordion` (restyled shadcn) ·
`SegmentedControl` — **used exactly once, on `/`. The budget for signature interactions is 1.**

### Forms
`Field` · `TextField` · `TextArea` · `ConsentCheckbox` (separate, unticked, never bundled) ·
`FormErrorSummary` (top, focus moved to the first error) · `SubmitButton` (busy state) ·
`PrivacyNote`.

### Explicitly NOT in the system
No card grid · no icon set · no logo wall · no stat tile · no testimonial · no badge/pill cluster
on mobile · no sticky CTA · no toast for conversion confirmation · no skeleton loaders (there is
no client-fetched content on a Resolve surface).
