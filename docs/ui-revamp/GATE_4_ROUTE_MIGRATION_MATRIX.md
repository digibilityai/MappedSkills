# MappedSkills UI Revamp — Gate 4: Route Migration Matrix

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Status** | **PLANNING ONLY. Nothing here is approved for implementation.** Gate 4 begins only on a separate owner instruction (`DEC-036`) |
| **Branch / commits inspected** | `ui-revamp` @ `352bb25` (governance), application at `23c937d` |
| **Companion documents** | `GATE_4_MASTER_ROLLOUT_PLAN.md` (start here) · `GATE_4_DESIGN_SYSTEM_ARCHITECTURE.md` · `GATE_4_CHROME_MIGRATION_STRATEGY.md` · `GATE_4_MOTION_SPECIFICATION.md` · `GATE_4_QA_ACCEPTANCE_MATRIX.md` · `GATE_4_IMPLEMENTATION_SEQUENCE.md` |

Evidence labels follow `CLAUDE.md`. Every row in §2 was read from the route's source file on 2026-10-08 (**VERIFIED** by
repository inspection). Production page lengths and CMS entry counts come from the Gate 0 audit §4 and are dated 2026-10-07.
Proposed treatments are **WORKING HYPOTHESES** until the owner approves the batch that contains them.

---

## 1. Inventory method and totals

- **Source:** `find app -name page.tsx`, `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts`, `next.config.mjs` redirects,
  and an import and composition scan of every route file.
- **Totals (VERIFIED):**
  - 28 rendered route templates: 27 `page.tsx` files (26 under `app/(pages)/` plus `app/page.tsx`) and `not-found.tsx`;
  - 5 of them are dynamic CMS templates: `/blog/[slug]`, `/portfolio/[slug]`, `/research/[slug]` (reports **and** category listings), `/press/[slug]`;
  - 1 API route (`/api/enquiry`), plus `sitemap.ts` and `robots.ts`. None of these is a UI surface;
  - 9 legacy redirects plus www→apex in `next.config.mjs`. They have no UI and are out of scope.

### 1.1 Three render systems exist today

| System | What it is | Routes | Labelled |
|---|---|---|---|
| **Direction C** | `components/direction-c/*`, `app/direction-c.css` (chrome, global), `app/direction-c-pages.css` (bodies, imported by `primitives.tsx`) | `/`, `/services`, `/seo` | VERIFIED |
| **Resolve (pre-revamp)** | `components/commercial/*`, `components/routes/*`, Tailwind utilities on `--resolve-*` tokens, legacy `Header`/`Footer` | 21 templates (§2), including 404 and the internal `/launch-checklist` | VERIFIED |
| **Legacy (pre-Resolve)** | `components/Section`, `Container`, `ui/card`, `ui/button`, `CTASection`, `blog/*`, `case-study/*`, `lucide-react` icons, off-palette `blue-50` cards | `/blog/[slug]`, `/portfolio/[slug]`, `/privacy-policy`, `/terms` | VERIFIED |

The Resolve and Direction C systems share one palette (Direction C tokens map onto `--resolve-*`) and one heading model:
a real `<h2>` chapter label above a display statement in `<p>`. The **legacy** routes do not. They carry their own heading
scale, cards and icons, so those four are rebuilds, not translations.

### 1.2 Category key

| Key | Category | Count |
|---|---|---|
| **A** | Already migrated to Direction C | 3 |
| **B** | Standard service (capability) page | 5 |
| **C** | Commercial landing or decision page | 2 |
| **D** | About, trust or method page | 3 |
| **E** | Contact or conversion page | 3 |
| **F** | Editorial: blog, research, press | 6 templates |
| **G** | Utility, legal or system page | 4 |
| **H** | **Proof** (hub + case studies). Justified as its own category because `DEC-012`/`DEC-031` withholding, `lib/case-study-proof.ts` and `LIVE-2` govern it, and nothing else does | 2 |

### 1.3 Complexity scale

| Score | Meaning |
|---|---|
| **S** | Resolve route; every section maps one-for-one onto an existing Direction C primitive |
| **M** | Resolve route; needs one or two new primitives, or one figure/table re-framed |
| **L** | A client island, a form, an analytics emitter, CMS rich text, or several new primitives |
| **XL** | Legacy system, CMS-driven, structured data built in the page, interactive sidebar or proof-governed content |

---

## 2. Summary matrix

| # | Route | Cat. | System today | Indexable | Complexity | Proposed batch | Treatment (one line) |
|---|---|---|---|---|---|---|---|
| 1 | `/` | A | Direction C | yes (ISR 60s) | — | done | Chrome only changes in B1 (the global flip) |
| 2 | `/services` | A | Direction C | yes | — | done | — |
| 3 | `/seo` | A | Direction C | yes | — | done | Reference composition for category B |
| 4 | `/google-ads` | B | Resolve | yes | S | **B2** | `/seo` pattern; `BoundaryBlock` → reverse boundary |
| 5 | `/social-media-ads` | B | Resolve | yes | S | **B2** | `/seo` pattern; the shortest service page, so do **not** pad it |
| 6 | `/ai-seo` | B | Resolve | yes | M | B3 | `/seo` pattern + two data figures (`AiLayers`, `CrawlerTable`) |
| 7 | `/lead-generation` | B | Resolve | yes | M | B3 | `/seo` pattern + numbered conditions + `ChainTerminus` |
| 8 | `/conversion-optimization` | B | Resolve | yes | M | B3 | `/seo` pattern + `ChainLossZones` |
| 9 | `/problems/traffic-but-no-enquiries` | C | Resolve | yes | M | B4 | Diagnostic register: causes → checks → findings |
| 10 | `/pricing` | C | Resolve | yes | M | B4 | Decision register: factor matrix, "not for", stated list |
| 11 | `/how-it-works` | D | Resolve | yes | L | B5 | Method register; signature-motion candidate (`MethodChain`) |
| 12 | `/about` | D | Resolve | yes | S | B5 | Firm register; `StateComparison` |
| 13 | `/faq` | D | Resolve | yes | M | B5 | Question register; `FAQPage` JSON-LD from visible content |
| 14 | `/contact` | E | Resolve + `ContactForm` | yes | L | B6 | Form register; inputs to Direction C; field contract frozen |
| 15 | `/schedule-call` | E | Resolve + `BookingLink` | yes | M | B6 | Booking register; `BookingLink` kept as the wrapper |
| 16 | `/thank-you` | E | Resolve | **no** | S | B6 | Quiet confirmation; no second ask |
| 17 | `/blog` | F | Resolve | yes (ISR) | M | B7 | Editorial index (`EntryList` → Direction C entry rows) |
| 18 | `/research` | F | Resolve | yes (ISR) | M | B7 | Publication index + finding list |
| 19 | `/research/[slug]` | F | Resolve + rich text | yes (ISR) | L | B7 | Report register: summary, findings, method, limits; category variant |
| 20 | `/press` | F | Resolve | yes (ISR) | S | B7 | Index (0 entries on production) |
| 21 | `/press/[slug]` | F | Resolve + rich text | yes (ISR) | M | B7 | Release register |
| 22 | `/blog/[slug]` | F | **Legacy** | yes, or `noindex` when not found | **XL** | B8 | Long-form article register; full rebuild |
| 23 | `/work` | H | Resolve | yes | M | B9 | Proof hub; `LIVE-2` sentence preserved unless separately authorised |
| 24 | `/portfolio/[slug]` | H | **Legacy** | yes, or `noindex` when not found | **XL** | B9 | Case register with plates; withholding enforced |
| 25 | `/privacy-policy` | G | **Legacy** | **no** | L | B10 | Document register with in-page contents |
| 26 | `/terms` | G | **Legacy** | **no** | L | B10 | Same as #25 |
| 27 | 404 `not-found` | G | Resolve | **no** (canonical `/404`) | S | B10 | Recovery register |
| 28 | `/launch-checklist` | G | Internal (`ENABLE_INTERNAL_PAGES`) | **no** | S | B10, optional | Out of the public surface; leave or minimal; owner choice |

Batches are defined in `GATE_4_IMPLEMENTATION_SEQUENCE.md`. B0 (QA harness and baselines) and B1 (global chrome) touch
every route's chrome but no route's body.

---

## 3. Shared attributes (apply to every route unless the row says otherwise)

| Attribute | Current state (VERIFIED) | Rule for Gate 4 |
|---|---|---|
| Navigation and footer | `ChromeSwitch`: Direction C chrome on rows 1–3; legacy sticky `Header` and dark `Footer` on every other route | B1 makes Direction C chrome global (`GATE_4_CHROME_MIGRATION_STRATEGY.md`) |
| Metadata | `createMetadata(title, description, path)` per static route; `generateMetadata` on `[slug]` routes | **Unchanged.** Inventory diff must be byte-identical |
| Global JSON-LD | One `Organization` from `app/layout.tsx` | Unchanged |
| Analytics | `page_view` via `AnalyticsRouteListener` (path → `pageTypeOf`). DOM-level emitters exist **only** in `ContactForm` (3 events) and `BookingLink` (`meeting_started`) | Path-based events are unaffected by UI. Rows 14–15 are the only analytics-sensitive bodies. GTM DOM triggers: **E6, RESEARCH REQUIRED** |
| Consent | Bootstrap first in `<head>`; `ConsentBanner` fixed at the bottom until a decision is stored (the one deliberate fixed exception); `ConsentPreferencesLink` in both footers | Behaviour LOCKED. Any restyle of the banner = REVIEW, outside the default scope |
| Heading model | One `<h1>`; chapter labels are `<h2>`; display statements are `<p>` (approved, `DEC-028`) | Direction C `Label`/`Statement` use the same model, so the heading sequence must not change |
| Copy | Approved per `docs/09-content-pages`, `docs/16-ux` | LOCKED. **No new visible microcopy**, including structural labels, without owner approval (`DEC-034` ruling 3 precedent) |
| Primary CTA | `/contact`, label carried by the route; secondary `/schedule-call` "Book a call"; no third button, no sticky bar | LOCKED (Gate 0 §16.3). Direction C `ActionPair`/`Close` already enforce it |

---

## 4. Route detail by category

Columns: **Layout and components** · **Content structure** (section sequence, in order) · **Primary conversion** ·
**Interactive features** · **SEO / structured data** · **Analytics** · **Accessibility notes** · **Complexity** ·
**Recommended Direction C treatment**.

### 4.1 Category A — already migrated (reference set)

| Route | Notes |
|---|---|
| `/` | `DcPage` → `HomeHero` (`HeroStage` client T1 signature) → departure → `HomeStrategy` (chain as HTML `<ol>`) → boundary (reverse) → evidence plate → fit → tangerine close. `revalidate = 60`. Uses `DcMotion` |
| `/services` | Split opener → unit → parts + `ChainFull` (legacy SVG figure, reused) → boundary (reverse) → `ServiceBands` (4/2/1) → later / not-done → testing → fit → close |
| `/seo` | `Crumb` (shared `BreadcrumbList`) → `ServiceOpener` → horizon panel (`DEC-035` placement) → work (`ScopeRows` → `ScopeDisclosure`, legacy client island) → measurement + `ChainDiscovery` → questions (reverse) → close |

Known carried items: A3 (SVG caption under text spacing), A4/X5 (logo name, R8, 11px SVG text), X1, X3, X4.
Owner-visible changes in Gate 4: **none** to their bodies. Only B1 touches them (chrome is already Direction C), and B11 touches
them if fonts are consolidated.

### 4.2 Category B — capability pages

All five share the commercial vocabulary: `Breadcrumb` (+`BreadcrumbList`) → `CommercialHero` → `CommercialSection`
modes (`split` / `wide` / `reverse` / `statement`) → `ScopeList` / `BoundaryBlock` / `QuestionList` → `CommercialClose`.
That vocabulary maps onto Direction C almost one for one (`GATE_4_DESIGN_SYSTEM_ARCHITECTURE.md` §5). **Analytics:**
`page_view` only, `page_type = commercial`. **Primary conversion:** `CommercialClose` → `/contact` + `/schedule-call`.

| Route | Content structure (VERIFIED order) | Interactive | SEO | A11y notes | Cx | Recommended treatment |
|---|---|---|---|---|---|---|
| `/google-ads` | crumb "Paid search" → hero → split → boundary (paper) → scope (wide) → split with `ProofLink` (max-width frame) → close | none | `BreadcrumbList` | `BoundaryBlock` measure was 104–161 cpl (Gate 0 R8): Direction C caps it at 58ch | S | `ServiceOpener` + `NotPromised`-style reverse boundary + `ScopeRows` (static rows; a disclosure only where `/seo` uses one) + `Close`. Keep the boundary **before** the scope, as production orders it |
| `/social-media-ads` | crumb "Paid social" → hero → split → boundary → plain section with `ProofLink` → close | none | `BreadcrumbList` | — | S | Same as above. At 3.1 screens it is the shortest capability page. **Do not add sections or figures to equalise length**: the depth difference is content, which is LOCKED |
| `/ai-seo` | crumb "AI search" → hero → split → scope (wide) + **`CrawlerTable`** → **`AiLayers`** (wide) → boundary → split → questions (reverse) → close | none | `BreadcrumbList` | Table scrolls horizontally on mobile at 600px min-width (contained; Gate 0 §12.2). Needs a caption, `scope` headers and a focusable scroll region | M | `/seo` pattern + a new **`DataTable`** primitive (Direction C rules, mobile stacked-row variant, no horizontal scroll at 320 if feasible without changing cell content) + `AiLayers` as a **`Figure`**-framed composition |
| `/lead-generation` | crumb "Enquiry generation" → hero → split → numbered `ScopeList` + **`ChainTerminus`** → boundary + `ProofLink` → questions (reverse) → close | none | `BreadcrumbList` | `Mark` used inline; mark semantics must follow the legend | M | `/seo` pattern; `ScopeRows numbered`; `ChainTerminus` reused inside `Figure` (redraw is 4G, not this batch) |
| `/conversion-optimization` | crumb "The enquiry path" → hero → split → **`ChainLossZones`** (wide) → scope (wide) → boundary → split → close | none | `BreadcrumbList` | SVG figure text size (X5 class) | M | `/seo` pattern; `ChainLossZones` in `Figure`. Breadcrumb label stays "The enquiry path" (JSON-LD trail is locked); the nav label is "Conversion optimisation" (`DEC-036`, D4) |

### 4.3 Category C — commercial landing and decision pages

| Route | Layout / content | Primary conversion | Interactive | SEO | Analytics | A11y | Cx | Treatment |
|---|---|---|---|---|---|---|---|---|
| `/problems/traffic-but-no-enquiries` | `RouteBreadcrumb` → `RouteHero` → split → **`CauseZones`** (wide) → **`CheckSequence`** (wide) → `FindingList` (reverse) → split with `ProofLink` + inline `ActionPair` "Tell us what you're trying to fix" | `/contact` (inline pair, **not** `CommercialClose`) | none: the route has no `use client` (stated in the file) | `BreadcrumbList` from `RouteBreadcrumb` (separate trail builder) | `page_type = problem` | 12 screens on mobile (Gate 0). "How that work runs" target was 23px | M | **Diagnostic register.** Direction C crumb that wraps `RouteBreadcrumb`'s trail function (do not merge the two trail builders). `CauseZones` and `CheckSequence` become `Figure`/`Sequence` compositions. Signature-motion **candidate** (§`GATE_4_MOTION_SPECIFICATION.md` §6). The inline action pair stays where it is; it does not become a tangerine close unless the owner approves a composition change |
| `/pricing` | `RouteHero` → split + `ProofLink` → split → **`FactorMatrix`** (wide) → statement → `StatedList` "not for" (reverse) → split + `ProofLink` → close | `CommercialClose` | none | no page JSON-LD | `page_type = pricing` | Matrix scrolls horizontally on mobile at 620px. Same table rules as `/ai-seo` | M | **Decision register.** `FactorMatrix` → `DataTable`. "Not for" → `NotPromised`-class list. **No price figures or tiers may be invented** (owner-blocked pricing claims, Gate 0) |

### 4.4 Category D — about, trust and method

| Route | Layout / content | Interactive | SEO | A11y | Cx | Treatment |
|---|---|---|---|---|---|---|
| `/how-it-works` | `RouteHero` → split → **`StageSystem` + `MethodChain`** + `FindingList` (wide) → boundary → split + **`MethodChainState`** → `StatedList` (reverse) → split → `StatedList` (reverse) → split → close. "No sticky CTA" is stated in the file | none | none | 14.6 screens at 390 (the longest marketing route). `routes/primitives.tsx` uses `--resolve-gap` as small text (3.13:1; Gate 0 §14) | L | **Method register.** The chain becomes the page's spine. This is the strongest **signature-motion** candidate (measured joins drawing into place). Contrast tokens corrected to `--dc-gap-text`. Length is content and stays. Composition must give the long page waypoints (labelled chapters), not fewer words |
| `/about` | `RouteHero` → five alternating split/statement sections, two `ProofLink`s → **`StateComparison`** (wide) → split → close | none | none | `/about:182` gap-coloured small text (3.13:1) | S | **Firm register.** `StateComparison` → `Compare` primitive (two-state, side by side ≥900px, stacked below). No portraits, imagery or team cards (no approved assets; `DEC-029` imagery is a §4 characteristic) |
| `/faq` | `RouteHero` → one section per question group, alternating paper/ground, native `<details>` → split → close. **`FAQPage` JSON-LD generated from the visible Q&A** | native `<details>` (works without JS) | `FAQPage` + must stay generated from the same data | Anchors under the legacy sticky header were unverified (Gate 0 §14.2). B1 removes the sticky header | M | **Question register.** Reuse `QuestionRows` where answers are always visible, or a Direction C **`Disclosure`** (native `<details>`, the `/seo` scope pattern) where production collapses them. Keep the collapsed/expanded default exactly as production. JSON-LD source array unchanged |

### 4.5 Category E — contact and conversion

| Route | Layout / content | Primary conversion | Interactive | SEO | Analytics | A11y | Cx | Treatment |
|---|---|---|---|---|---|---|---|---|
| `/contact` | `RouteHero` → `Container` + **`ContactForm`** → section | **The enquiry form** → `POST /api/enquiry` → MariaDB → `router.push('/thank-you')`; success **only** on 2xx | client form: 4 required + 2 optional fields + marketing consent + honeypot `contactReference`; error summary; `aria-invalid`/`describedby` | indexable | **`lead_form_started` (once), `lead_form_validation_error`, `lead_form_submitted` (2xx only)**, plus attribution/UTM into the payload (`lib/attribution.ts`) | Input borders 1.30:1 (fails 1.4.11). Submit button differs from every other primary CTA (Gate 0). Right half empty at 1440 | L | **Form register.** Restyle the **presentation layer only**: Direction C `Field` primitive (label, hint, error, `--dc-control` 3.47:1 boundary), submit button = `dc-btn-primary`. **Frozen:** field set, `name` attributes, order, required/optional status, validation messages, honeypot, consent wording, endpoint, success condition, event calls. Two-column composition at ≥900px using **existing** route copy only |
| `/schedule-call` | `RouteHero` + **`BookingLink`** → `Container` + second `BookingLink` → `StatedList` "covers" → paper → `StatedList` "bring" → section. File notes `CalendlyEmbed` was deliberately removed | `/schedule-call` → Calendly (`NEXT_PUBLIC_CALENDLY_URL`) via `BookingLink` | `BookingLink` fires `meeting_started` on activation | indexable | **`meeting_started`** | 0 fixed/sticky elements stated in the file | M | **Booking register.** Every booking anchor stays a `BookingLink` (the component is the analytics boundary). Its `className` takes Direction C button classes. No embed is reintroduced |
| `/thank-you` | `RouteHero` → section with one link to `/how-it-works` | none: "no second ask" (approved) | none | **`noindex, nofollow`**, not in sitemap | `page_type = other` | — | S | **Quiet confirmation.** Ground surface, a statement and the single existing link. **No** action pair and no tangerine close |

### 4.6 Category F — editorial (blog, research, press)

CMS data comes from Contentful with `revalidate = 60`. Helpers fail soft (`[]`) when Contentful is unconfigured, so a local
build **without credentials renders these routes empty** (Gate 2 §6, VERIFIED). This is a QA constraint (§5).

| Route | Layout / content | Primary conversion | Interactive | SEO / structured data | A11y | Cx | Treatment |
|---|---|---|---|---|---|---|---|
| `/blog` | `RouteHero` → `EntryList` (reverse) → split with links to `/ai-seo` and `/problems/…` | contextual links | none | indexable, kept even when empty (honest empty state) | — | M | **Editorial index.** Direction C `EntryRows` (date, title, standfirst; whole-row link with one accessible name). The empty state stays as production words it |
| `/blog/[slug]` | **Legacy.** `BlogHero` → `Section`/`Container` grid: `BlogIntroduction`, `TableOfContents`, `RichTextContent`, `CTABlockFromType`, `SocialShare`, `RelatedPosts`, `RelatedServices`, `AuthorBio`, `FAQSection`, **`BlogNewsletterForm`**; sidebar **`StickySidebarCTA`** (`sticky top-8`); trailing `CTASection` | `CTABlock` by `ctaType`; sidebar "Book a call" | `SocialShare` (client); newsletter form (client; submission path **UNKNOWN**, verify before change); TOC anchors (`scroll-mt-28`) | **Page-local** `Article`, `BreadcrumbList` and `FAQPage` JSON-LD; `generateMetadata`; `resolveOgImageUrl`; `noindex` when not found | ≈21.7 screens at 1440 (production). Raw 1600px Contentful JPEGs with no responsive sizes (performance) | **XL** | **Long-form article register.** Reading column at `--dc-measure`; TOC as an in-flow contents block (≥1200px may sit in a side column, **not sticky**: the Resolve budget is 0 sticky, and `StickySidebarCTA` "renders on zero routes today" per its own comment, so retiring stickiness is a REVIEW item, not a behaviour loss). `RichTextContent` restyled **without changing node → element mapping, heading IDs or link handling**. Schema functions untouched. Image sizing = performance REVIEW item, not part of the visual batch |
| `/research` | `RouteHero` → `EntryList` → `FindingList` → `EntryList` ×2 → three sections → `JournalistsCta` | `JournalistsCta` (`mailto` with subject, `/contact`) | none | indexable | — | M | **Publication index.** `EntryRows` + `FindingRows` |
| `/research/[slug]` | **Two variants in one template:** a report (crumb → hero → findings → executive summary → body → methodology → limitations → downloads → `CopyActions` → author → journalists → related → `ProofLink`) and a **category listing** (crumb → hero → `EntryList`) | `JournalistsCta`; `ProofLink` → `/conversion-optimization` | **`CopyActions` (client: copy citation/URL)**; downloads | `ResearchReport` JSON-LD; `generateMetadata`; `RouteBreadcrumb` trail including the category | Raw `<img>` elements; `scroll-mt-28` headings | L | **Report register.** Finding embeds become **evidence plates** (`Plate`: Evidence · Method · Limitation, `DEC-035`). Limitations are never collapsed. Category listing = `EntryRows`. `ResearchRichText` restyled with the same mapping constraints as blog |
| `/press` | `RouteHero` → `EntryList` → two sections → `JournalistsCta` | `JournalistsCta` | none | indexable; **0 entries on production** | — | S | Index + empty state |
| `/press/[slug]` | `RouteBreadcrumb` → header section → `RichTextContent` → `ResearchAuthor` → `ResearchDownloads` | — | downloads | `NewsArticle` JSON-LD | raw `<img>` | M | **Release register.** Shares the report register's reading column. No live entry exists to verify against (§5) |

### 4.7 Category H — proof

| Route | Layout / content | Governing rules | SEO | Cx | Treatment |
|---|---|---|---|---|---|
| `/work` | `RouteHero` → `EntryList` (reverse) → split → split with `ProofLink` (to `/how-it-works`, `/problems/…`). Carries the **`LIVE-2`** sentence *"There are no published case studies here…"* above three published studies | `DEC-012`, `DEC-031`, `LIVE-2` (copy LOCKED) | indexable since SEO-001 (R4); the only hub for `/portfolio/*` | M | **Proof hub.** `EntryRows` for studies. **The `LIVE-2` sentence is preserved verbatim** unless the owner separately authorises the correction wording. Do not add counts, logos or outcome teasers |
| `/portfolio/[slug]` | **Legacy.** Hand-written crumb section → `CaseStudyContent` → `Section` → `Card` "hover-lift" strategy card → `CTASection` | `lib/case-study-proof.ts` withholds figures, the derived headline result, testimonials and star ratings for all three live slugs. **LOCKED**. X10: Ameba copy names "TechWave Solutions" (owner check) | `generateMetadata`; `noindex` + no canonical when not found; no page JSON-LD | **XL** | **Case register.** Challenge → intervention → outcome narrative in the reading column; any evidence as `Plate` with Limitation visible; withheld items **absent**, not blurred, hatched or "redacted" (a hatched mark already means "a state that is not a value", Gate 2 E6). `CTASection` → `Close`. Breadcrumb: the hand-written crumb emits no JSON-LD today, so adding `BreadcrumbList` would be a **structured-data change** = owner approval, not a default |

### 4.8 Category G — utility, legal, system

| Route | Layout / content | SEO | A11y | Cx | Treatment |
|---|---|---|---|---|---|
| `/privacy-policy` | **Legacy.** Crumb section → in-page contents (`#id` anchors) → long `Section`s with seven `Card`s (some `bg-blue-50`, off-palette) → contact card (`mailto`, `tel`) → closing `Button` pair → `/contact`, `/schedule-call` | `noindex, nofollow`; page-local `BreadcrumbList` JSON-LD (VERIFIED), hand-written alongside a hand-written crumb | 27–29 sub-40px targets on desktop (Gate 0); anchors had no `scroll-margin-top` | L | **Document register.** Contents list + numbered clauses in the reading column; callouts become a single Direction C `Note`/`Aside` treatment (no colour-coded cards). Legal text LOCKED byte-for-byte. Closing pair → `ActionPair` with the same labels and destinations |
| `/terms` | Same legacy shape as privacy (fewer cards) | `noindex, nofollow`; page-local `BreadcrumbList` JSON-LD | same | L | Same as privacy, one shared `DocumentLayout` |
| 404 | `RouteHero` → recovery `EntryList` → capabilities `EntryList` → section | `noindex, nofollow`; canonical `/404` | — | S | **Recovery register.** `EntryRows`. Status code must remain 404 |
| `/launch-checklist` | Internal; `notFound()` unless `development` or `ENABLE_INTERNAL_PAGES=true`; `index: false` | not public | — | S | **Owner choice:** leave on Resolve (recommended; it is not a public surface), or apply the document register in B10 |

---

## 5. Constraints this inventory surfaces

| # | Constraint | Consequence | Label |
|---|---|---|---|
| C1 | **CMS routes render empty in a local build without Contentful credentials.** The sitemap and list helpers fail soft | Rows 17–24 cannot be visually or structurally verified locally unless a read-only delivery token is available to the QA build, or a fixture harness is used (`scripts/contentful-graphql-harness.ts` exists; its fitness for this is UNKNOWN) | VERIFIED (Gate 2 §6) |
| C2 | **`/press/[slug]` has no live entry** | No production page to compare against. Verification needs a fixture or a draft via the Preview API (and see `X6`) | VERIFIED (Gate 0 §4) |
| C3 | **Two breadcrumb trail builders** (`commercial/primitives` `breadcrumbTrail` and `routes/primitives` `RouteBreadcrumb`) plus two hand-written crumbs (`portfolio`, `blog`) | Direction C needs one visual crumb that **accepts a trail** from either builder. The builders are not merged in Gate 4 (structured-data risk) | VERIFIED |
| C4 | **Page-local schema** on `/blog/[slug]`, `/faq`, `/privacy-policy`, `/terms`, research and press | Body rebuilds must not move or regenerate these. Diff them as part of every batch | VERIFIED |
| C5 | **Analytics emitters are components, not routes** (`ContactForm`, `BookingLink`) | They are reused unchanged and only re-classed. Their DOM shape may matter to GTM triggers (E6) | VERIFIED / E6 RESEARCH REQUIRED |
| C6 | **Proof withholding is code** (`lib/case-study-proof.ts`) | The case register reads withholding from that module; it never decides it | VERIFIED |
| C7 | **Locked legacy copy** (`LIVE-2`; legal text; route copy generally) | Migration moves words, it never edits them. Content-inventory diff is a gate on every batch | OWNER REQUIREMENT |
