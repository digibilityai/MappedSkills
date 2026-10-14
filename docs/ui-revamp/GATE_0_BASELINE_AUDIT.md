# MappedSkills UI Revamp — Gate 0: Baseline & Full-Site UI Audit

| | |
|---|---|
| **Gate** | 0 — Baseline & Full-Site UI Audit (audit only; no design or code changes) |
| **Date** | 2026-10-07/08 |
| **Branch / HEAD** | `ui-revamp` @ `b05d1ea` (= `main` `e51c753` + one docs commit) |
| **Controlling documents** | `docs/ui-revamp/MappedSkills_UI_Revamp_Master_Handoff.md`, `docs/ui-revamp/MappedSkills_UI_Revamp_Implementation_Plan.md` |
| **Evidence** | `docs/ui-revamp/gate-0-evidence/screenshots/` (44 files: local baseline + read-only production captures + defect crops) |
| **Status** | **COMPLETE WITH EXCEPTIONS** — see §22 and §23 |
| **Closure** | **Gate 0 CLOSED 2026-10-08** (`DEC-033`). The owner answered §21.0 Q1–Q4 as `DEC-029`–`DEC-032`; see **§24**. The findings below are retained as originally recorded |

**Evidence labels** follow `CLAUDE.md`: **VERIFIED FACT**, **OWNER REQUIREMENT**, **APPROVED DECISION**, **WORKING HYPOTHESIS**, **RESEARCH REQUIRED**, **UNKNOWN**. Unless a finding says otherwise, *VERIFIED* means one of three checks:
- it was read in source at the cited path;
- it was measured in a rendered page (local dev server, `localhost:3000`);
- it was read from the **public production site** (`mappedskills.com`) with GET requests only.

Nothing was submitted, no consent was granted on production, and no data was written anywhere.

---

## 1. Executive Summary

MappedSkills already has a deliberate, unusually principled visual system: **THE RESOLVE** (`DEC-018`, validated at Gate 10 `DEC-019`, extended by Phase J `DEC-022`). Its traits are:
- light-first ivory ground and warm ink;
- one tangerine accent, set as a contrast-driven three-step ramp;
- Bricolage Grotesque for display and Manrope for body;
- hairline-ruled editorial lists;
- four semantic "mark" states (named / anonymous / unattributed / owned);
- an honesty-first proof posture.

The homepage is the most considered surface on the site. Its hero, its CAPTURE → CONVERT → MEASURE chain and its accountability boundary should be **preserved and elevated, not replaced**.

The current site is not a weak design. It is **a strong core idea that has fractured at the edges**:

1. **Two visual systems coexist.** The marketing routes run on THE RESOLVE primitives. Blog articles, case studies, legal pages and the shared header and footer still run on the legacy shadcn/"v0" layer:
   - `max-w-7xl` container, rounded shadowed `Card`, hover-lift cards, cycled icon boxes;
   - a decorative gradient card;
   - a different primary button.

   At 1440px the header, the page content and the footer start at **three different left edges** (112px / 52px / 80px). *(VERIFIED)*

2. **Undocumented post-acceptance changes have regressed the approved system.** Commit `1557f74` (2026-10-05, outside the decision log) made four changes:
   - made the header `sticky` (THE RESOLVE records "0 fixed/sticky" as binding);
   - flattened all section rhythm to a fixed `py-[50px]`;
   - removed the Phase J opener modes;
   - removed the reading-measure cap on hero ledes.

   Results include ~104-character hero lines on every commercial route, paragraphs up to ~161 characters, and **a critical mobile-menu defect**: with the menu open on a phone-height viewport, the primary "Contact Us" CTA cannot be reached. *(VERIFIED)*

3. **Proof is honest, but under-designed and now self-contradictory.**
   - All three published case studies have their figures deliberately withheld (`lib/case-study-proof.ts`, `DEC-012`).
   - The verified evidence assets are first-party methodology and self-measurement (28 AI runs, 0 mentions; a 120-site measurement study). They are presented almost entirely as running text.
   - The homepage says *"We have no case studies to show you."* and `/work` opens *"There are no published case studies here…"*. Yet in production `/work` lists three published case studies directly beneath that sentence. *(VERIFIED on production)*

4. **Responsive behaviour is mostly genuine on the homepage, but mostly "stacked" elsewhere.** There are confirmed defects:
   - header overflow and nav wrapping at 1024px;
   - chain-figure label collisions at 1440px and 390px;
   - footer list indentation leaking from a global `ul` rule;
   - very long mobile pages (`/how-it-works` ≈ 14.6 screens at 390px).

5. **Design-system debt is high, and it is the main cost driver for the revamp:**
   - 1,676 arbitrary-value utilities (452 distinct);
   - 40 distinct `clamp()` type sizes plus 21 fixed `text-[…]` sizes;
   - 13 hand-written pixel breakpoints, while the two declared breakpoint tokens are used **0** times;
   - 175 inline `style` props;
   - 60 of 141 component files imported by nothing.

**Gate 1 readiness:** the audit itself is complete. **Before Gate 1 designs directions, three owner decisions are needed** (§21.0):
- whether the revamp elevates *within* THE RESOLVE or may propose directions beyond it;
- how to treat the undocumented October UI changes;
- whether the deploy-on-push workflow is acceptable given the programme's staging gate.

---

## 2. Baseline Verification

| Check | Result | Label |
|---|---|---|
| Branch | `ui-revamp` | VERIFIED |
| Working tree at start | clean (`git status --porcelain` empty) | VERIFIED |
| HEAD | `b05d1ea` "docs: establish UI revamp programme" (2026-10-07) | VERIFIED |
| Relationship to `main` | `ui-revamp` = `origin/main` (`e51c753`) + 1 docs-only commit; `origin/main` == local `main` after `git fetch` | VERIFIED |
| Concurrent change risk at audit time | none on `ui-revamp`; `main` is actively committed to by a second author (`anikesh-dev`, 2026-10-05 → 10-07) | VERIFIED |
| Node / npm (local) | Node **24.16.0**, npm **11.13.0** | VERIFIED |
| Node (CI + host) | **22** (`.github/workflows/deploy.yml` `NODE_VERSION: '22'`) — local/CI version gap | VERIFIED |
| `npm run typecheck` | exit 0 | VERIFIED (run this session) |
| `npm run lint` | exit 0, no output (the recorded 21-error backlog in `CURRENT_STATE.md` is now cleared by `517fdac`/`04d2f67`) | VERIFIED (run this session) |
| `npm test` | **11 passed, 0 failed** (`tests/crm-delivery.test.cjs`) | VERIFIED (run this session) |
| Local dev site | `localhost:3000` serving; all 23 static routes return 200, unknown route 404 | VERIFIED |
| `npm audit` / `audit fix` | **not run**, by instruction | — |
| Git stashes | `git stash list` is **empty** in this clone. `CURRENT_STATE.md` records two UI stashes (`c1acf87`, `b36b243`) as preserved owner-review candidates; they are not present here | VERIFIED (absence) / UNKNOWN (where they live) |
| Contentful locally | the dev server returns **no** Contentful entries (blog index, research, press and `/work` list are empty; sitemap carries no dynamic URLs). CMS families were therefore inspected on production, read-only | VERIFIED |

### 2.1 Documentation-currency gap (important context)

`docs/00-project/DECISION_LOG.md` ends at **`DEC-028` (2026-09-18)** and `CURRENT_STATE.md`'s live block describes 2026-09-18. Since then `main` has received the following, none of it recorded in either file:
- routing releases R1–R4;
- CRM webhook delivery (`e02cca4`);
- research and press routes (`24c7ecf`);
- Contentful preview support (`37d7bce`);
- a site-wide styling change (`1557f74`);
- lint fixes;
- re-enabled deploy-on-push (`eff9704`);
- OG image work (`e51c753`).

Under the Master Handoff's source-of-truth hierarchy, those changes rank as *implemented production behaviour* (rank 4), **below** the approved decisions they contradict (rank 1). This audit therefore records them as **divergences**, not as the approved baseline (§22).

---

## 3. Architecture & Stack

| Area | Implementation | Label |
|---|---|---|
| Framework | **Next.js 16.2.12** App Router, webpack builds (`next dev --webpack`, `next build --webpack`) | VERIFIED |
| UI runtime | React **19.2.7**, TypeScript **5.7.3** | VERIFIED |
| Styling | **Tailwind CSS v4.3.2** via `@tailwindcss/postcss`; no `tailwind.config` — tokens in `@theme inline` in `app/globals.css`; `tw-animate-css`; shadcn/ui "new-york" (`components.json`) | VERIFIED |
| Token source | `app/globals.css` — `--resolve-*` primitives → shadcn semantic names → Tailwind `--color-*` bridge. Declared as "the ONLY design-token source" | VERIFIED |
| Motion layer | `app/resolve-motion.css` (558 lines, `.rsv-*`-scoped, unlayered, homepage only) + `hooks/use-resolve-motion.ts` (IntersectionObserver registry, reduced-motion state, 4 s failsafe) | VERIFIED |
| Fonts | `next/font/google` — Bricolage Grotesque + Manrope, variable, self-hosted, `display: swap`, latin subset (`app/layout.tsx`) | VERIFIED |
| Icons | `lucide-react` (39 files import it) | VERIFIED |
| Routing | `app/page.tsx` + route group `app/(pages)/*` (26 page files incl. 4 dynamic `[slug]`), `app/not-found.tsx`, `app/robots.ts`, `app/sitemap.ts`, one API route `app/api/enquiry/route.ts` | VERIFIED |
| Rendering | static/ISR (`revalidate = 60` on CMS-backed and home routes); production shows `x-nextjs-cache: HIT`, `x-nextjs-prerender: 1` | VERIFIED |
| CMS | Contentful (GraphQL; `lib/contentful/{client,queries,mappers,types,posts,case-studies,case-study-sections,research,press}.ts`), rich text via `@contentful/rich-text-react-renderer`; **Preview API** support added in `37d7bce` | VERIFIED |
| Database | MariaDB/MySQL via `mysql2` (`lib/db.ts`, `lib/enquiries.ts`, `db/migrations`, `scripts/db-migrate.cjs`) | VERIFIED |
| CRM | signed webhook + cron retry (`lib/crm-delivery.cjs`, `scripts/crm-retry.cjs`) — the only unit-tested surface | VERIFIED |
| Analytics | GTM only (`lib/gtm.tsx`), consent-gated; Consent Mode v2 bootstrap inline in `<head>`; Meta Pixel component present but unconfigured and consent-gated (`lib/meta-pixel.tsx`) | VERIFIED |
| Hosting | cPanel/Passenger custom server (`server.cjs`, `app.js`); release swap scripts in `scripts/deploy/` | VERIFIED |
| Images | `next.config.mjs` `images.unoptimized: true` — **no Next image optimisation anywhere** | VERIFIED |
| Security headers | partial CSP (`base-uri`, `object-src`, `frame-ancestors`, `form-action`), nosniff, SAMEORIGIN, referrer policy, permissions policy; www→apex 308 + 9 legacy redirects | VERIFIED |
| Client components | 64 `'use client'` files, of which 41 are `components/ui/*`. App-level clients: Header, Logo, ContactForm, Calendly*, filters, ScopeDisclosure, SocialShare, CopyActions, 5 analytics components, and 4 homepage motion leaves | VERIFIED |

### 3.1 Environment-variable expectations (names only; no values read)

From `.env.example`:
- **Build-time public:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GTM_ID` (required for production), `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID` (must stay empty), `NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_BUSINESS_*`, `NEXT_PUBLIC_*_URL` socials.
- **Build + runtime:** `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_ACCESS_TOKEN`, `CONTENTFUL_ENVIRONMENT`.
- **Runtime:** `DB_*`.
- **Tooling:** `PORT`, `HOSTNAME`, `ENABLE_INTERNAL_PAGES`, `CPANEL_BUILD`.

`.env.local` exists locally and defines the same names. **UI work never needs to touch any of them.**

### 3.2 Repository scripts

`dev`, `build`, `build:cpanel`, `pack:cpanel`, `verify:cpanel`, `verify:build`, `verify:build:production` (asserts GTM is compiled in), `typecheck`, `lint`, `test`, `db:verify|status|migrate`, `start`, `start:next`.

**There is no visual-regression, accessibility or end-to-end test suite.** The only automated tests cover CRM delivery.

---

## 4. Page-Family Map

Discovered from `app/`, `app/sitemap.ts` and production's sitemap. *Screens* = document height ÷ 900px viewport, measured locally.

| # | Family | Routes | System | Purpose / conversion role | Screens 1440 / 390 |
|---|---|---|---|---|---|
| F1 | **Homepage** | `/` | Resolve (bespoke `components/homepage/*`, the only motion) | Thesis + whole-route explanation; primary `/contact`, secondary `/schedule-call` | 7.8 / 8.7 |
| F2 | **Services overview** | `/services` | Resolve commercial primitives + `ChainFull` | Routes to capabilities via CAPTURE / CONVERT / MEASURE groups | 8.1 / 11.5 |
| F3 | **Capability (service) pages** | `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization` | Resolve commercial primitives (`CommercialHero`, `CommercialSection` modes, `ScopeList`, `BoundaryBlock`, `QuestionList`, `ChainFigure` variants, `CommercialClose`) + JSON-LD breadcrumb | Searched-capability landing pages; close → `/contact` | 3.1–7.7 / 5.0–10.7 |
| F4 | **Problem page** | `/problems/traffic-but-no-enquiries` | Resolve route primitives (`CauseZones`, `CheckSequence`) | Diagnostic entry from homepage and SEO | 8.5 / 12.0 |
| F5 | **Method / trust pages** | `/how-it-works`, `/about`, `/pricing`, `/faq` | Resolve route primitives (`MethodChain`, `StageSystem`, `StateComparison`, `FactorMatrix`, native `<details>`) | Evidence of method; objection handling; FAQ carries `FAQPage` JSON-LD | how-it-works 10.6 / **14.6** |
| F6 | **Conversion pages** | `/contact`, `/schedule-call`, `/thank-you` | Resolve sections + `ContactForm` (client) + `BookingLink` (Calendly) | Primary lead capture; booking; post-conversion (noindex, "no second ask") | 3.0 / 4.1 (contact) |
| F7 | **Proof hub + case studies** | `/work`, `/portfolio/[slug]` (3 live on production) | **Hub: Resolve. Detail: legacy** (`Section`, `Container`, `Card`, `CaseStudyContent`, `CTASection`) | Proof discovery. All three studies **withhold** figures, testimonials and stars | prod case study ≈ 4.9 screens at 1440 |
| F8 | **Blog** | `/blog`, `/blog/[slug]` (7 live) | **Index: Resolve. Article: legacy** (`BlogHero`, `RichTextContent`, `TableOfContents`, `StickySidebarCTA`, `SocialShare`, `AuthorBio`, `RelatedPosts`, `RelatedServices`, `FAQSection`, `BlogNewsletterForm`, `CTASection`) | SEO acquisition; article schema built page-locally | prod article **≈ 21.7 screens** at 1440 |
| F9 | **Research** | `/research`, `/research/[slug]` (2 live, incl. category listing) | Resolve (`ResearchRichText`, `ResearchFindingEmbed`, `ResearchDownloads`, `ResearchAuthor`, `CopyActions`) | First-party data publication; `ResearchReport` schema | — |
| F10 | **Press** | `/press`, `/press/[slug]` (0 entries live) | Resolve + `JournalistsCta` | Media; `NewsArticle` schema | 1.9 |
| F11 | **Legal** | `/privacy-policy`, `/terms` | **Legacy** (`Section`, `Container`, `Card`, `Button`) with in-page anchors; `noindex, nofollow` | Compliance | ~9.2 / — |
| F12 | **System** | `not-found` (404, `noindex`, canonical `/404`), `/launch-checklist` (internal, `ENABLE_INTERNAL_PAGES`) | Resolve | Recovery navigation | 3.6 |

**Shared chrome:** `Header` (sticky, client), `Footer` (dark strip), `ConsentBanner` (fixed bottom, until a decision is stored), skip link.

### 4.1 Per-family assessment

| Family | Strengths | Weaknesses / exceptions |
|---|---|---|
| F1 Homepage | Strongest typographic voice. The population toggle is a genuinely meaningful interactive figure. There are three bespoke width-native SVG compositions of the chain. The accountability "we do not promise" list is distinctive. The tangerine close is a counted inversion | Statement lines are `<p>` under small-label `<h2>` (approved, but it limits heading-only scanning — §16). The proof section says "no case studies" (§11). Chain labels collide (§12). Large `clamp(66px,9vw,152px)` gaps create long empty runs. The mobile hero gap is `clamp(84px,26vw,112px)` between CTAs and the figure |
| F2 Services | Clear routing groups; one figure; explicit scope boundaries | Long, text-dominant. Three paragraphs run at 104–161 characters (§7). Repetitive hairline-list rhythm |
| F3 Capability | A shared component vocabulary keeps the route set coherent. The `BoundaryBlock` and "three questions" moves are good editorial devices | Since `1557f74` every hero is the same left 60vw column with an empty right 40% at 1440. All share the identical close. `/social-media-ads` is 3.1 screens against `/ai-seo` at 7.7 — uneven depth. Tables on `/ai-seo` and `/pricing` scroll horizontally on mobile (contained, acceptable) |
| F4 Problem | Diagnostic structure (cause zones, check sequence) is the best "analytical thinking" content on the site | 12 screens on mobile |
| F5 Method/trust | Content depth is a credibility asset | `/how-it-works` is 10.6 / 14.6 screens of mostly uniform text sections. Sticky-header anchor offsets are unverified on the legal and FAQ anchors |
| F6 Conversion | Form semantics are excellent (labels, hints, `aria-invalid`/`describedby`, error summary, honeypot, 2xx-only success) | At 1440 the form occupies the left half and the right half is empty. Input borders are 1.30:1 (§14). The submit button style differs from every other primary CTA |
| F7 Proof | Withholding policy is principled and documented | The detail page is the **legacy** visual system: icon-box cards, a gradient strategy card, centred CTA, hover-lift on non-interactive cards. There is no outcome or evidence section at all. Production copy in the Ameba study names "TechWave Solutions" (CMS content error — UNKNOWN origin) |
| F8 Blog | Long-form SEO content exists; has TOC and `scroll-mt-28` anchors | Legacy typography and cards. Very long articles. Raw 1600px Contentful JPEGs (≈217 KB) with no responsive sizes |
| F9 Research | Real first-party data. Already on the Resolve system | The finding is presented as text; data visualisation is minimal |
| F11 Legal | — | Legacy system; 27–29 sub-40px targets on desktop (9 of them are the shared header items; the rest are in-page TOC anchors) |

---

## 5. Current Visual-System Map

```
app/globals.css  (single token source)
├─ :root  --resolve-* primitives
│    ground #F7F3EC · paper #FFFDF9 · ink #141219 · ink-deep #0F0D14
│    line #DED6C8 · rule #2C2833 · dim #5C5665 · gap #8E8798
│    accent #FF5B04 · accent-deep #D94400 · accent-dark #A83400
│    motion: 2 easings, t-micro 180 / t-state 620 / t-resolve 900 ms
│    layout: --resolve-pad clamp(18px,3.4vw,56px) · --resolve-wrap 1400px
│            --resolve-measure 58ch · --resolve-target 40px
├─ semantic layer (shadcn names → resolve)   --accent = #A83400 (!)
├─ legacy aliases --ms-* (8, re-pointed)     --chart-1..5, --sidebar-*
├─ @theme inline: fonts, --color-resolve-*, breakpoints ms-med 761 / ms-wide 1081 (UNUSED)
├─ @layer base: global h1–h4 scale, p/li/label, :focus-visible 3px ink,
│               a{text-accent hover:underline}, reduced-motion floor,
│               dark-surface token re-pointing, LEGACY: section{py-[50px]}
│               ul,ol{space-y-3 pl-6}, h*+p margins, .card-hover, .badge…
└─ @layer components/utilities: .skip-link, .resolve-target, accent-on-dark fix

Component layers
├─ RESOLVE  components/homepage/* · components/commercial/* · components/routes/* · components/research/*
├─ LEGACY   components/layout/{Container,Section} (max-w-7xl) · components/ui/{card,button,badge,…}
│           components/blog/* · components/case-study/* · components/sections/* · components/cards/*
└─ CHROME   components/layout/{Header,Footer} — legacy container, Resolve colours
```

---

## 6. Typography Findings

| Finding | Evidence | Label |
|---|---|---|
| Two families, well chosen and self-hosted: Bricolage Grotesque (display, `font-extrabold`, tracking ≈ −0.035em) and Manrope (body) | `app/layout.tsx`, `app/globals.css` `@theme` | VERIFIED |
| **There is no type scale.** 40 distinct `text-[clamp(…)]` sizes and 21 distinct fixed `text-[…rem]` sizes are hand-written across `app/` and `components/`. The homepage alone renders **26 distinct computed font sizes**; commercial routes render 6–16 each | grep counts; rendered measurement | VERIFIED |
| Near-duplicate sizes with no semantic difference: `.8rem`, `0.8rem`, `.82rem`, `.84rem`, `.86rem`, `.88rem`; `.94rem`, `.95rem`, `.96rem`, `.98rem`, `1rem`, `1.0rem`, `1.02rem` | grep | VERIFIED |
| Tracking: 10 distinct arbitrary values (−0.04em … 0.18em). Leading: 22 distinct arbitrary values (0.95 … 1.6) | grep | VERIFIED |
| A **global heading scale** in `@layer base` (`h1 text-4xl/5xl/6xl`, `h2 3xl/4xl/5xl`, …) fights every Resolve heading. Components override it locally, and the footer resorts to `!text-sm !font-bold` to defeat it | `app/globals.css:229–232`, `components/layout/Footer.tsx` | VERIFIED |
| The **eyebrow/label** treatment (`.82rem` · semibold · uppercase · `tracking-[0.16em]` · dim) is the most repeated type role. It is copy-pasted ~30 times instead of composed from `ChapterLabel` | `components/commercial/primitives.tsx:351`, homepage, routes | VERIFIED |
| Display hierarchy is coherent on the homepage: T1 hero `clamp(2.55rem,7vw,6.4rem)` then section statements `clamp(2rem,5vw,4.3rem)`. Commercial routes sit deliberately one rank lower (`clamp(2rem,4.6vw,3.9rem)`) — documented intent | `HomepageHero.tsx`, `CommercialHero.tsx` | VERIFIED |
| **Measure regression.** `1557f74` removed `max-w-[58ch]` from the hero lede in `CommercialHero` and `RouteHero` and capped the column at `60vw`. Measured lines: ≈104 characters at 1440 and ≈118 at 1024 on every commercial and route hero. `BoundaryBlock` and `/services` "What we do not do" paragraphs run at ≈161 and ≈130 characters (`max-w-none`). The programme token `--resolve-measure: 58ch` is used **once** | rendered measurement; `components/commercial/CommercialHero.tsx:53`, `components/routes/primitives.tsx:129`, `app/(pages)/services/page.tsx:225,287` | VERIFIED |
| Legacy article typography (blog, case study, legal) uses Tailwind defaults: `text-3xl font-bold` h2, `text-base sm:text-lg` body, `font-bold` rather than `extrabold`. It reads as a different site | `components/case-study/CaseStudyContent.tsx`, `components/blog/RichTextContent.tsx` | VERIFIED |
| Buttons and navigation type: header nav `text-sm font-medium` muted. Resolve CTAs are `text-base font-bold`; header CTA `Button size=lg` is `text-base font-semibold`; form submit is semibold | source + screenshots | VERIFIED |
| Metrics typography: **no metric/number style exists** in the live Resolve system. The legacy `StatCard`, `BeforeAfterMetric` and `ui/stat` are unused | §9 | VERIFIED |
| Wrapping: `text-balance` is used on the hero H1 and `whitespace-nowrap` keeps keyword+punctuation together. At 1024 the header nav wraps to 2–3 lines ("How / It / Works") | screenshot `defect-header-nav-wrap-overflow-1024.jpg` | VERIFIED |
| Font loading: dev console warns that two preloaded `woff2` files were "not used within a few seconds of load". The font variables are applied to both `<html>` and `<body>` | console; `app/layout.tsx` | VERIFIED (dev) · RESEARCH REQUIRED (production) |
| The logo lockup tagline ("TURN DEMAND INTO OPPORTUNITY") renders ≈4px tall at the header's `h-7` (28px). The wordmark reads **"MappedSkill"** while every page says "MappedSkills" | `public/mappedskills-logo-light-bg.webp` | VERIFIED (render) · UNKNOWN (whether the wordmark is intentional) |

---

## 7. Colour & Surface Findings

| Finding | Evidence | Label |
|---|---|---|
| The palette is small, semantic and documented — a genuine strength. The accent ramp exists **for contrast**: `#A83400` clears 6.02:1 as small text on the ground, and `#FF5B04` is reserved for fills and dark grounds | `app/globals.css`, `docs/24-resolve-governance/00_ACTIVE_DIRECTION.md §4.2` | VERIFIED |
| **Primary CTA colour is inconsistent** across three styles: homepage pill = bright `#FF5B04` with ink text; commercial/route `ActionPair` pill = `#A83400` with white text; header "Contact Us" = shadcn `Button` `bg-accent` (`#A83400`) **rounded-lg rectangle** (not a pill), 48px tall. The form submit is a fourth, full-width rounded rectangle | `HomepageHero.tsx`, `commercial/primitives.tsx:412`, `components/ui/button.tsx`, screenshots | VERIFIED |
| Colour is applied through **175 inline `style` props** (81 `style={{…}}`), e.g. `style={{ color: 'var(--resolve-accent-deep)' }}` ×35. Hex literals remain in TSX (`#141219` ×12, `#C0B9CA` ×2, `#FFFFFF` ×2, legacy crimson `#C41E3A` in `components/forms/CalendlyEmbed.tsx:46`) | grep | VERIFIED |
| Two ink tokens are referenced as raw values instead of tokens (`#C0B9CA` muted-on-dark is not a token; `#A29BAC` lives only in the dark re-pointing rule) | `HomepageAccountability.tsx`, `globals.css` | VERIFIED |
| Surfaces: ground / paper alternation plus hairline `border-t` is the main section separator. There is one dark band (homepage), one dark proof card (homepage), the tangerine close (homepage) and the dark footer. Commercial routes alternate ground and paper only, so long routes feel tonally flat | screenshots | VERIFIED |
| Legacy surfaces still render on case-study, blog and legal pages: `rounded-xl … shadow-sm hover:shadow-lg hover:-translate-y-1` cards. A **decorative colour gradient** (`bg-gradient-to-br from-accent/5 via-background to-secondary/20`) violates the approved "no decorative gradient" rule (`00_ACTIVE_DIRECTION §4.6`). There are tinted icon tiles | `components/ui/card.tsx:10`, `components/case-study/CaseStudyContent.tsx:189` | VERIFIED |
| Interaction colours: links default to `text-accent hover:text-accent/80 hover:underline` globally. The footer hovers to `text-accent` (re-pointed to `#FF5B04` on dark). Header items hover from muted to ink. There is no shared hover/active token | `globals.css` base `a`, Header, Footer | VERIFIED |
| Contrast is measured and documented for ink, dim, accent-dark and the dark re-points (all ≥ 4.5:1). See §14 for failures | §14 | VERIFIED |
| `--radius: 0.75rem` drives shadcn radii. Resolve uses `rounded-full` pills, `rounded-[20px]` for one card and square marks — **12+ radius variants** in use | grep | VERIFIED |

---

## 8. Spacing & Layout Findings

| Finding | Evidence | Label |
|---|---|---|
| **Three container systems.** Legacy `Container` (`max-w-7xl` = 1280 + `px-4/6/8`); Resolve wrap (`max-w-[1400px] px-[var(--resolve-pad)]`, hand-written in 15 files); footer (`max-w-7xl` inside its own `px-4/6/8`). At 1440: **header logo x=112, page content x=52, footer logo x=80; header CTA right edge 1328 vs content right edge 1388** | rendered measurement on `/services` | VERIFIED |
| `--resolve-wrap` (1400px) is referenced once. Every Resolve section re-declares `max-w-[1400px]` literally | grep | VERIFIED |
| **Section rhythm was flattened.** `1557f74` changed `section { py-16 }` → `py-[50px]` globally, `Section` → `py-[50px]`, every homepage section → `py-[50px]`, and both hero components to fixed `pb-[65px] pt-[70px]` (previously fluid `clamp(…)`). Mobile and 1440 now share identical vertical padding, while in-section gaps remain fluid up to 152px — so **inter-section rhythm is tighter than intra-section gaps** on the homepage | `git show 1557f74` | VERIFIED |
| 81 distinct `clamp()` spacing values. No spacing scale | grep | VERIFIED |
| **13 hand-written breakpoints** (`min-[1081px]` ×67, `max-[761px]` ×31, `min-[900px]` ×18, `min-[761px]` ×12, `min-[700px]`, `min-[1100px]`, `max-[520px]`, `min-[760px]`, `min-[1180px]`, `min-[1060px]`, `min-[1000px]`, `max-[760px]`, `max-[1080px]`) alongside Tailwind `sm` ×149, `md` ×45, `lg` ×27. The declared tokens `ms-med` / `ms-wide` are used **0** times | grep | VERIFIED |
| Breakpoint mismatch: the header switches to desktop nav at `lg` (1024), Resolve layouts at 1081. At 1024–1080 the full desktop nav plus two CTAs do not fit (§12) | Header + measurement | VERIFIED |
| Grids: Resolve uses `20ch`/`26ch` rail + `1fr` reading column (`split` / `reverse` / `wide` / `statement` modes in `CommercialSection`). Phase J measured that 98.2% of commercial sections began at one x-coordinate before these modes; the modes survive for sections but **were removed for heroes** by `1557f74` (the `mode` prop is now ignored) | `components/commercial/primitives.tsx`, `CommercialHero.tsx` | VERIFIED |
| A global `ul, ol { space-y-3 pl-6 }` base rule leaks into chrome. The footer link lists are indented 24px relative to their column headings, and components must reset `p-0` repeatedly | `globals.css:319`, screenshot `local-home-390-full.jpg` (footer) | VERIFIED |
| Large empty regions at desktop width: the commercial hero right 40% (by the I2/B27 "no apparatus above the fold" rule — approved), `/contact` right half, and the homepage friction rows (marks occupy ≈10% of row width) | screenshots | VERIFIED (observation) · approved constraint for heroes |

---

## 9. Component-System Findings

### 9.1 Reusable components that carry real system responsibility (Resolve)

| Component | Role | Notes |
|---|---|---|
| `commercial/primitives.tsx` — `Mark`, `Breadcrumb` (+ JSON-LD), `CommercialSection` (5 modes), `ChapterLabel`, `Display`, `Lede`, `Body`, `Note`, `ProofLink`, `ActionPair` | **De facto design system** for 15+ routes | Good API discipline (modes partition children by identity; DOM order preserved). `ActionPair` encodes the frozen CTA architecture |
| `commercial/CommercialHero`, `CommercialClose`, `ScopeList`, `ScopeDisclosure`, `BoundaryBlock`, `QuestionList`, `AiLayers`, `ChainFigure` (4 variants, 619 lines) | Capability-page moves | `ChainFigure` is the site's signature diagram family |
| `routes/primitives.tsx` — `RouteBreadcrumb`, `RouteHero`, `FindingList`, `StatedList`, `StageSystem`, `StateComparison`, `EntryList` + `MethodChain`, `CauseZones`, `CheckSequence`, `FactorMatrix` | Non-commercial routes | `RouteHero` duplicates `CommercialHero` almost line for line |
| `homepage/*` (10 files) | Bespoke homepage | Not reusable by design (documented) |

### 9.2 Legacy components still in the render path

`layout/Container`, `layout/Section`, `ui/card`, `ui/button`, `ui/badge`, `ui/input`, `ui/textarea`, `ui/avatar`, `sections/CTASection`, `cards/CaseStudyCard` (via `filters/ResultsFilter`), `case-study/CaseStudyContent`, all `blog/*`, `forms/BlogNewsletterForm`.

### 9.3 Dead and duplicated code

| Finding | Label |
|---|---|
| **60 of 141 component files are imported by nothing.** This includes 39 `components/ui/*` primitives (sidebar 723 lines, chart, carousel, calendar, command, menubar, navigation-menu, tabs, select, …); all `cards/*` except `CaseStudyCard` (Stat, BeforeAfterMetric, Testimonial, Pricing, Service, Team, Value, Industry, Problem, ProcessStep, Blog); `sections/FAQSection`, `sections/Hero`; `forms/CalendlyEmbed`, `forms/CalendlyButton`; `filters/ResultsFilter`. It also includes 3 unused root re-export shims | VERIFIED (static import graph; dynamic imports: none found) |
| **10 root-level re-export shims** (`components/Header.tsx` → `layout/Header`, etc.) create two import paths for the same component | VERIFIED |
| Duplicates: `components/blog/FAQSection` vs `components/sections/FAQSection`; `components/CTASection`/`sections/CTASection` vs `blog/CTABlock` vs `commercial/CommercialClose` (four "close" implementations); `CommercialHero` vs `RouteHero` vs `sections/Hero` vs `blog/BlogHero`; `commercial/Breadcrumb` vs `routes/RouteBreadcrumb` vs hand-written crumbs in `portfolio/[slug]` and `blog/[slug]`; blog page-local `generateArticleSchema` / `generateBreadcrumbSchema` / `generateFAQSchema` vs `lib/schema.ts` | VERIFIED |
| Dead API: `CommercialHero`/`RouteHero` still accept `mode` but ignore it. `OPENER_GRID`/`OPENER_RAIL`/`OPENER_MAIN` are now used only by `CommercialClose` | VERIFIED |
| Over-abstraction: none significant. **Under-abstraction is the problem.** CTA pills, eyebrows, ink cards, mark swatches, Resolve wrap and proof links are re-typed inline rather than composed | VERIFIED |
| Unused dependencies kept only by dead `ui/*` files: `recharts`, `embla-carousel-react`, `cmdk`, `vaul`, `react-day-picker`, `input-otp`, `sonner`, `react-resizable-panels`, `react-hook-form`, `@hookform/resolvers`, `zod` (only `ui/form.tsx`), `next-themes`, ~25 `@radix-ui/*` packages. They are tree-shaken from bundles, but Tailwind v4 scans those files, so their classes are compiled into the 181 KB stylesheet (§15) | VERIFIED (imports) · WORKING HYPOTHESIS (CSS contribution size) |

### 9.4 Component inventory against the Master Handoff checklist

| Pattern | Current implementation | State |
|---|---|---|
| Header / mobile nav | `layout/Header.tsx` (client, sticky, inline mobile expansion) | Defects §12, §14 |
| Footer | `layout/Footer.tsx` (server, dark, 4 columns, 19 links) | Legacy container; indented lists |
| Buttons | 4 visual variants for one primary action | Fragmented |
| Links | global `a` style + `ProofLink` (44px, underline-border) + inline underline links | Mostly coherent |
| Cards | Resolve has almost none (deliberate); legacy `Card` with hover-lift on case study, blog and legal | Fractured |
| Forms | `ContactForm` (excellent semantics), `BlogNewsletterForm` (legacy) | Visual weak spots §14 |
| CTAs | `ActionPair`, `CommercialClose` (4 modes), homepage close, `CTASection`, `CTABlock`, `StickySidebarCTA` | Six implementations |
| Accordions/tabs | native `<details>` (`/faq`, `ScopeList` one-at-a-time), `SystemStages` ARIA tabs, `ScopeDisclosure` | Good, consistent semantics |
| Testimonials | `TestimonialCard` (unused); case-study review block (withheld for all live studies) | Not presentable today |
| Metrics / proof blocks | none live in Resolve; homepage dark proof card is bespoke | Missing system |
| Badges / labels | `ChapterLabel` + inline eyebrows; legacy `badge` pill on case study / blog | Mixed |

---

## 10. Visual Hierarchy & Composition

**Works well — preserve:**
- The homepage hero: big confident H1 with the two keyword states (tangerine "enquiries" vs dim "traffic"), a single primary CTA pair, and the toggle figure as the hero's "proof of thinking".
- The one dark band ("The same demand, followed all the way down") as a section transition.
- Hairline rule lists with large type — an editorial, non-card idiom that avoids the generic agency look.
- The chain figure as a unifying diagram across `/`, `/services` and the capability pages.
- The tangerine close as the single loud surface.

**Weaknesses (observed):**
1. **Uniform section grammar.** Almost every section is: small uppercase label → large display line → dim body → underline link, on ground or paper, separated by a hairline. Over 8–14 screens this becomes monotonous, especially on `/how-it-works`, `/services` and `/problems/*`. *(VERIFIED via full-page screenshots)*
2. **Hierarchy is carried almost entirely by type size.** There are few compositional changes of scale, density, figure/ground or column structure after the hero. Phase J's composition modes partially address this for sections; the hero modes were reverted.
3. **Weak transitions between sections on commercial routes.** Ground/paper alternation plus a 1px `#DED6C8` rule (1.30:1) is a very quiet change.
4. **Proof is not visually differentiated from claims.** Evidence sentences (e.g. "28 unbranded runs … zero times") are set as `Note` body text in the same dim paragraph style as positioning copy (`/seo` §6). Only the homepage gives evidence its own surface.
5. **CTA competition is low (good).** Each page has one close plus the header. However, the header shows *two* asks (Book a call text + Contact Us button) and every hero shows the pair again in the first viewport.
6. **Overlong screenfuls on mobile.** The homepage mobile hero places a `clamp(84px,26vw,112px)` gap between the CTA block and the figure. Long text-only stretches have no visual anchors.
7. **Generic places:** the case-study detail (icon-box card grids), the blog article (default shadcn prose + sidebar card) and the legal pages.

---

## 11. Proof & Data Presentation

### 11.1 What proof exists (repository and production evidence)

| Asset | Where | Status |
|---|---|---|
| **Client case studies** | 3 on production (`seo-ameba-software`, `seo-for-home-decor-brand`, `google-ads-for-online-courses`) | **Figures, headline result, testimonials and star ratings WITHHELD** by `lib/case-study-proof.ts` (owner decisions WORK-011…026; `DEC-012` evidence standard). They show client, timeline, size, area, problem, goals, challenges, strategy, services and tools — **no outcome**. VERIFIED |
| **AI visibility self-test** | `/`, `/seo`, `/work`, `/about` | 4 assistants, 28 unbranded runs, one day, Pune, English, signed out → **named 0 times**; directories in 15/28; 2 systems untestable. First-party; presented with explicit limits. VERIFIED (as published claim) |
| **Own enquiry-path diagnosis** | `/work`, `/problems/*` | 4 of 5 published checks failed on own site; the old form showed success and transmitted nothing. VERIFIED (as published claim) |
| **Measurement study** | `/research/marketing-measurement-gap-indian-business-websites` | 120 Indian business websites; ">4 in 10 had no observable Google Analytics"; "97.5% preserved UTM parameters". VERIFIED as published on production; underlying data not re-checked here (RESEARCH REQUIRED before any visual re-use) |
| **Method** | `/how-it-works`, chain figures, "we do not promise" lists | Methodology-as-proof. VERIFIED |
| Testimonials, logos, ratings, client counts | — | **None exist**, by explicit policy (`/work` Note). VERIFIED |

### 11.2 Assessment

| Question | Finding |
|---|---|
| Easy to discover? | Partly. `/work` is in the nav ("Case Studies"). The strongest data asset (the 120-site study) is reachable only via the footer → Research. The homepage evidence section links to `/how-it-works`, not to research |
| Contextualised? | **Yes — exceptionally.** Every number carries scope ("one day, one location, counts not rates") |
| Visually differentiated from claims? | **No**, except the homepage dark card. Elsewhere evidence is body text |
| Prominent? | Low on commercial routes (compressed into a `Note` by design: W2 §2) |
| Credible? | High in tone. **Undermined by the contradiction**: homepage "We have no case studies to show you." and `/work` hero "There are no published case studies here" sit beside three live published case studies (production). Case-study pages that are reached show no result, which can read as an empty proof page |
| Reusable as a system? | No. There is no claim / evidence / context / limit component; the homepage proof card is bespoke. Legacy metric cards exist but are unused and conflict with the evidence policy |

> **Constraint for every later gate (APPROVED DECISION `DEC-012` + `lib/case-study-proof.ts`):** there are currently **no verified client performance numbers** to visualise. "Data/performance motion" can only use first-party, scoped measurements, or structural (non-quantitative) diagrams like the chain. Animated counters, before/after bars or uplift figures for clients are **not available** and must not be designed as if they were.

---

## 12. Responsive Findings

Measured at 1440 / 1024 / 768 / 430 / 390 / 360 (iframe measurement for all 23 static routes at 1440 and 390; key routes at every width; Playwright screenshots in `gate-0-evidence/`).

### 12.1 Confirmed defects

| # | Defect | Widths | Evidence | Severity |
|---|---|---|---|---|
| R1 | **Mobile menu CTAs unreachable.** The header is `sticky top-0` (`components/layout/Header.tsx:98`) and the mobile menu renders *inside* it. Open, the header is **800px** tall. On a 700px-tall viewport, "Contact Us" sits at y=672–720 and "Book a call" below the fold; scrolling cannot reveal them because the sticky header stays pinned. They only appear when the page is scrolled to its very end. Typical phone browser viewports are shorter than 800 CSS px | 390×700 (any phone height < ~800px) | `defect-mobile-menu-sticky-header-390x700.jpg`; JS measurement | **CRITICAL** |
| R2 | **Header overflows at 1024–~1080.** Desktop nav shows from `lg` (1024). The nav plus two CTAs need more room: "How It Works" wraps to 3 lines, "Case Studies" to 2, and "Contact Us" right edge = 1021px > 1009px client width → horizontal page overflow on every route | 1024 | `defect-header-nav-wrap-overflow-1024.jpg`; `scrollWidth 1021 > clientWidth 1009` on `/`, `/services`, `/seo` | HIGH |
| R3 | Chain figure (WIDE): "arrived with no usable trail" label collides with "WE ANSWER FOR THIS MUCH" | 1440 | `defect-home-chain-label-collision-1440.jpg`; `HomepageIntervention.tsx:223` | MEDIUM |
| R4 | Chain figure (NARROW): "WE ANSWER FOR THIS MUCH" overprints the chain line and the qualified-enquiry square | 390 | `defect-home-chain-boundary-label-overlap-390.jpg`; `HomepageIntervention.tsx:148` | MEDIUM |
| R5 | Friction rule label sits on the section rule; the vertical rule clips the final letter | 1440 | `defect-home-friction-label-on-rule-1440.jpg` | LOW |
| R6 | Footer link lists indented 24px by the global `ul { pl-6 }` | all | `local-home-390-full.jpg` | LOW |
| R7 | Header/content/footer left edges misaligned (112 / 52 / 80 px) | ≥1280 | §8 | MEDIUM |
| R8 | Reading measure ≈104–161 characters (heroes, `BoundaryBlock`, `/services`) | 1024–1440 | §6 | HIGH |

### 12.2 Classification

| Category | Where |
|---|---|
| **Genuine responsive design** | Homepage chain (three separately composed SVGs: NARROW / MEDIUM / WIDE); `PopulationToggle` field density (189 vs 440 marks); `SystemStages` mobile title scaling; `StageLinks` pill → underline at narrow; friction rule as per-row ticks at narrow; `StateComparison` stacking |
| **Acceptable adaptation** | `CommercialSection` split/reverse → single column below 1081 (DOM-order preserved); data tables in `overflow-x-auto` (`/ai-seo` 600px, `/pricing` 620px min-width) |
| **Desktop merely stacked** | All capability pages below 1081; `/contact` (form column + empty right half becomes one column); case-study and blog detail (legacy grids collapse 4→2→1); footer (4 columns → 1 long column of 19 links + contact block ≈1.5 screens on mobile) |
| **Overlong on mobile** | `/how-it-works` 14.6 screens, `/problems/*` 12.0, `/services` 11.5, `/ai-seo` 10.7; production blog article ≈21.7 screens at desktop (longer on mobile) |

### 12.3 Other observations

- No page-level horizontal overflow at 1440, 768, 430, 390 or 360 on any measured route (only 1024 fails). *(VERIFIED)*
- The consent banner covers ≈25% of a 390×900 viewport on first visit and overlaps the hero CTA. It is non-modal and dismissible (approved behaviour). *(VERIFIED)*
- Touch targets in `main` meet the 40px floor at 390 on all marketing routes. The header logo link (108×28) is under the floor on every route. Other exceptions: homepage `SystemStages` tab buttons (24px and 19px tall at 360–390 — the full-width row is the target, but the box is short), and "How that work runs" (23px) on `/problems/*`. *(VERIFIED)*
- **Tablet (768):** the header shows "Book a call", "Contact Us" and the hamburger together. The homepage hero figure rows are spaced far apart (`justify-between` in a tall box).

---

## 13. Motion & Interaction Findings

### 13.1 Inventory

| Layer | Implementation | Assessment |
|---|---|---|
| Homepage signature | `PopulationToggle` field → rows resolve (timed ≥900px, on-view below); hero stage parallax/fade on scroll (`HeroSurface`, rAF, transform+opacity); `SystemStages` auto-advancing tabs (2.1 s / 4.2 s) + chain draw-on (`stroke-dashoffset`); friction marks with a "hold"; departure band; tangerine close arrival marks; `.rsv-rv` reveals (≈21) | **Coherent, meaningful, restrained.** Tokenised easings and timings, one-shot, finite. Reduced motion collapses to the composed state; no-JS renders composed; 4 s failsafe; visibility-change settles everything |
| Pre-paint | Inline `HERO_FIRST_PAINT` script sets `html[data-rsv-hero=traffic]` | Produces a **React hydration-attribute warning** in dev on every homepage load (`data-rsv-hero` on `<html>`). Intentional pre-paint, but noisy and a hydration-mismatch class issue (VERIFIED dev console) |
| Commercial / route pages | None by design (static server components); `ScopeList` one-at-a-time native disclosure; `ScopeDisclosure` | Minimal, coherent with the motion budget (`02_RESOLVE_MOTION_BUDGET.md`) |
| Micro-interactions | `transition-colors` ×54, `transition-all` ×16, Tailwind `duration-200/300` — **not** the `--resolve-t-*` tokens. Logo `group-hover:scale-105`; legacy `Card` hover-lift; header chevron rotate | **Fragmented**: homepage uses tokens, everything else uses Tailwind defaults (150 ms) |
| Navigation motion | Dropdown and mobile menu appear and disappear with no transition | Abrupt but accessible |
| Focus | Global `:focus-visible` 3px ink outline (re-pointed to ground on dark). Header, input and `Button` override it with `focus-visible:outline-none` + 2px `ring-accent` (31 `outline-none` uses) → **two focus styles** | Inconsistent (§14) |
| Smooth scroll | `html { scroll-smooth }` | Disabled under reduced motion (global floor) |
| Reduced motion | Global floor (durations → 0.01 ms) + `resolve-motion.css @media (prefers-reduced-motion)` + JS `useResolveMotion` | **Strong** |

### 13.2 Assessment

The homepage motion system is coherent, performant (transform/opacity/dashoffset, IntersectionObserver, no library) and accessible. Outside the homepage there is effectively no motion system, only default transitions. The motion language the Master Handoff names (Performance · Optimisation · Progress · Measurement · Precision · Clarity) is already partly embodied by the resolve and chain moments.

### 13.3 Future opportunities (identified, not designed)

| Class | Opportunity | Constraint |
|---|---|---|
| Micro-interaction | One token-driven hover/press/focus timing set for all links, CTAs, disclosures and nav; dropdown/menu open-close transitions; form field state transitions | Use existing `--resolve-t-micro` and easing tokens |
| Scroll storytelling | Capability-page chain variants (`ChainDiscovery`, `ChainLossZones`, `ChainTerminus`) could draw on view like the homepage chain; `/how-it-works` `MethodChain` as a stepped, scroll-linked walkthrough; `/problems/*` cause zones as a diagnostic progression | Must keep no-JS / reduced-motion composed state; no scroll hijack; no pinning (approved "no sticky") |
| Data/performance motion | Animate **only** first-party, scoped figures (28 runs / 0 named; 15/28 directories; 120-site study proportions), with their limits visible during and after motion | No client figures exist (§11). Counts, not rates |
| Signature motion | The existing **traffic → enquiries resolve** is already a signature moment; the **chain draw-on** is a second. A third candidate: the "we answer for this much" boundary as a recurring accountability gesture | Approximately 2–3 total; homepage motion budget already documented |

---

## 14. Accessibility Findings

### 14.1 Confirmed issues

| Issue | Evidence |
|---|---|
| **Mobile-menu CTAs unreachable** under the sticky header on short viewports (also a WCAG 1.4.10 Reflow / 2.1.1 practical failure) | §12 R1 |
| **Form input boundaries 1.30:1** (`border-border` #DED6C8 on ground/paper) — below the 3:1 non-text contrast requirement (WCAG 1.4.11) | `components/ui/input.tsx`, `/contact` screenshot |
| **Small text in `--resolve-gap` #8E8798: 3.13:1 on ground, 3.41:1 on paper.** Used as text in `/about:182`, `/work:145` (`.94rem` limitation notes), `routes/primitives.tsx:82,288,361` (breadcrumb current item, stage captions, unmet state) — fails 4.5:1 | contrast computation + grep |
| Header nav items are 31px tall and the services toggle is 32×32 — below the programme's own 40px floor (desktop/pointer only) | rendered measurement |
| Desktop services dropdown uses `role="menu"` / `menuitem` without arrow-key handling, so it does not implement the menu pattern it declares (a disclosure of links is the appropriate pattern) | `components/layout/Header.tsx:126` |
| Two focus treatments (global 3px ink outline vs `outline-none` + 2px accent ring on header, inputs and `Button`) | grep (31 `outline-none`) |
| The consent banner's `<h2>Analytics cookies</h2>` precedes the page `<h1>` in DOM order on every first visit | rendered heading list |

### 14.2 Probable risks (need dedicated testing)

- `SystemStages` replaces the SSR `<ol>` with `<h3>` stage titles with an ARIA `tablist` after hydration. Heading-only navigation loses the three stage headings, and the swap is a layout-shift candidate.
- The `display: none` chain variants are correctly removed from the accessibility tree, but each SVG relies on a long `<desc>`. Screen-reader verbosity is untested.
- Sticky header + in-page anchors (`/privacy-policy`, `/terms` TOCs, the form error-summary links to `#name` etc.) have no `scroll-margin-top` except the blog and research headings (`scroll-mt-28`). Targets may land under the 65px header.
- Footer social links 40×40 with 4px gap. The legal row relies on flex height.
- Homepage section statements are `<p>` elements under label-`<h2>`s (approved, documented as load-bearing). Screen-reader users get short labels, not the argument.

### 14.3 Strengths (verified)

- Skip link is the first focusable element.
- One `<h1>` per route on all 23 static routes; no heading-level jumps measured in `<main>`.
- Labelled form with hints, `aria-invalid`/`aria-describedby` and an `aria-live` error summary.
- Marks are `aria-hidden` with meaning in adjacent text.
- `forced-colors` and `print` handling in `resolve-motion.css`.
- Global reduced-motion floor.
- No image is missing `alt` on measured routes.

### 14.4 Requires later dedicated testing

Screen readers (VoiceOver / NVDA), real devices, 200% zoom/reflow, Windows High Contrast, keyboard-only full journeys including Calendly hand-off. The programme record states none of these has been performed (`CURRENT_STATE.md`).

---

## 15. UI Performance Risks

| Risk | Evidence | Label |
|---|---|---|
| **JS on static pages.** Production `/seo` (no page-level client code) ships 620 KB raw / 194 KB wire JS in 11 chunks; `/` 633 / 198 KB; blog article 647 / 203 KB. The baseline is mostly framework + the client header + consent/analytics providers | production fetch | VERIFIED |
| **CSS: one 181 KB (raw) stylesheet on every route.** Tailwind v4 scans all of `components/`, including the 60 unused files and the 452 distinct arbitrary utilities | production fetch | VERIFIED (size) · WORKING HYPOTHESIS (cause share) |
| **No image optimisation** (`images.unoptimized: true`). Contentful article images ship as original 1600×900 JPEGs (≈217 KB) to every viewport with no `srcset` or format negotiation. The logo is a 555×144 WebP rendered at 108×28 | `next.config.mjs:34`; production HEAD | VERIFIED |
| **4.0 MB of unreferenced public assets**: `images/contact-hero.png` 1.3 MB, `schedule-call-hero.png` 0.97 MB, `blog-dashboard.png` 0.97 MB, `services-ecosystem.png` 0.76 MB, plus `placeholder*`, `icon.svg`, `ms_icon-1.png` (and legacy `ms_Logo.webp`). Not shipped to users unless requested, but repository/deploy weight | grep of references | VERIFIED |
| Layout-shift candidates: `SystemStages` SSR→client DOM swap; `PopulationToggle` pre-paint state with a 4 s failsafe; `Header` client component; font `swap` | source | WORKING HYPOTHESIS (no CLS measured) |
| Homepage field: 440 `<i>` marks with per-mark CSS variables and transition delays — cheap at rest, one bounded animation | source | VERIFIED (design) · not profiled |
| Header `'use client'` for menu state means the whole header hydrates on every route. `Logo` is also `'use client'` with no client behaviour | source | VERIFIED |
| Core Web Vitals | **Never measured** in this programme (no LCP/CLS/INP figures exist in any record) | UNKNOWN — RESEARCH REQUIRED |

---

## 16. SEO / Analytics / Conversion Protection Map (LOCKED for UI work)

### 16.1 SEO

| Surface | Implementation | Protection rule for later gates |
|---|---|---|
| Metadata | `lib/metadata.ts` `createMetadata(title, description, path)` per route; root fallback in `app/layout.tsx`; dynamic `generateMetadata` on `[slug]` routes | Do not change titles, descriptions or paths |
| Canonicals | via `createMetadata`; 404 canonicalises to `/404` | Keep |
| Robots meta | `/thank-you`, `/privacy-policy`, `/terms` → `noindex, nofollow`; 404 → `noindex` | Keep |
| OG / Twitter images | `lib/og-image.ts`, `resolveOgImageUrl` (Contentful image or favicon fallback, `e51c753`) | Keep |
| Structured data | `Organization` (global, `lib/schema.ts`); `BreadcrumbList` emitted by `commercial/Breadcrumb` and `routes/RouteBreadcrumb` (visible crumb and JSON-LD from the same array); `FAQPage` on `/faq` (built from visible content); blog Article/Breadcrumb/FAQ (page-local); `ResearchReport`; `NewsArticle` | Breadcrumb components carry schema — **restyling them must not change the trail arrays** |
| Heading structure | exactly one `<h1>` per route (fixed `DEC-028`); `ChapterLabel` = real `<h2>`, display line = `<p>` (approved) | Do not promote or demote headings without an SEO review |
| Sitemap / robots | `app/sitemap.ts` (static + Contentful), `app/robots.ts` | Untouched by UI |
| Redirects | `next.config.mjs` (www→apex + 9 legacy) | Untouched |
| Internal links | nav arrays in `Header.tsx` / `Footer.tsx` (owner NAV-011…041 decisions), `lib/internal-links.ts`, `lib/services.ts`, `lib/blog-services.ts`, `lib/case-study-services.ts` | Labels and targets are owner decisions |
| SEO-critical copy | all route copy (approved per `docs/16-ux`, `docs/09-content-pages`) | LOCKED |

### 16.2 Analytics

| Surface | File | Rule |
|---|---|---|
| Consent bootstrap (must stay first in `<head>`) | `app/layout.tsx`, `lib/consent.ts` (`CONSENT_BOOTSTRAP_SCRIPT`, key `ms.consent.v1`) | LOCKED |
| Consent UI | `components/analytics/ConsentProvider`, `ConsentBanner`, `ConsentPreferencesLink` (footer) | Visual restyle = REVIEW; behaviour LOCKED |
| GTM loader | `lib/gtm.tsx` (two gates: env ID + granted) → GA4 `G-6H7WFH2BHQ` inside container | LOCKED |
| Meta Pixel | `lib/meta-pixel.tsx` (unconfigured, consent-gated) | LOCKED (owner decision pending) |
| Events | `lib/analytics.ts` — `page_view`, `lead_form_started`, `lead_form_validation_error`, `lead_form_submitted`, `meeting_started` (approved five-event taxonomy) | LOCKED |
| Route listener | `components/analytics/AnalyticsRouteListener` | LOCKED |
| Attribution / UTM | `lib/attribution.ts` (first-touch, referrer, UTM → form payload) | LOCKED |
| Booking tracking | `components/analytics/BookingLink` (fires `meeting_started`) | Must wrap every booking link that is restyled |

### 16.3 Conversion

| Mechanism | Where | Rule |
|---|---|---|
| Primary CTA → `/contact` | Header button, `ActionPair`, homepage hero/close, `CommercialClose`, `CTASection` | Destination and primacy LOCKED (frozen CTA architecture: contact primary, booking secondary, no third button, no sticky CTA bar) |
| Secondary → `/schedule-call` → Calendly (`NEXT_PUBLIC_CALENDLY_URL`, default `calendly.com/mappedskills/client-discovery`) | `ActionPair`, header text link, `/schedule-call` `BookingLink` | LOCKED |
| Enquiry form | `components/forms/ContactForm.tsx` → `POST /api/enquiry` → MariaDB → `/thank-you`; 4 required + 2 optional fields + newsletter opt-in + honeypot `contactReference`; success only on 2xx | Field set, names, order, validation and submission LOCKED; visual layer REVIEW |
| Newsletter | `forms/BlogNewsletterForm` (blog only) | REVIEW (verify submission path before any change) |
| Email / phone | footer `mailto:` + `tel:` (Pune, Mumbai) from `lib/metadata.ts` `offices`; schedule-call, legal, journalists CTA | LOCKED values |
| WhatsApp | **No `wa.me` link exists.** The form's phone field is labelled "Phone or WhatsApp" | VERIFIED |
| `/thank-you` | no second ask (approved) | LOCKED |

---

## 17. Backend & Integration Boundaries (do not modify in UI gates)

- `app/api/enquiry/route.ts`, `lib/enquiries.ts`, `lib/enquiry-validation.ts`, `lib/rate-limit.ts`, `lib/db.ts`, `db/migrations/*`, `scripts/db-migrate.cjs`.
- `lib/crm-delivery.cjs`, `scripts/crm-retry.cjs` (signed webhook + cron retry; the only unit tests).
- `lib/contentful/*` (queries, mappers, types; Preview API). Rich-text renderers (`components/blog/RichTextContent.tsx`, `components/research/ResearchRichText.tsx`, `components/case-study/CaseStudyContent.tsx`) are **presentation** and in UI scope, but must preserve the node → element mapping, heading IDs, link handling (`linkTargetProps`) and proof withholding.
- `lib/case-study-proof.ts` (owner-governed withholding list) — LOCKED.
- `server.cjs`, `app.js`, `scripts/deploy/*`, `.github/workflows/deploy.yml`, `next.config.mjs` (headers, CSP, redirects, images) — LOCKED.
- Environment variables (§3.1) — no UI change requires any.

---

## 18. Design-System Debt

| Debt | Quantity | Impact on the programme |
|---|---|---|
| Arbitrary-value utilities | 1,676 (452 distinct) | Every global workstream (4A–4C) must touch most route files. A token layer must come first or the rollout re-creates fragmentation |
| Type sizes | 40 clamp + 21 fixed; 10 tracking; 22 leading | 4A needs a scale and role tokens (display, statement, label, body, note, caption, metric) |
| Spacing | 81 distinct clamp spacings; global `section` padding; fixed hero padding | 4C needs a rhythm scale; remove the global `section`/`ul`/`h*+p` base rules (they silently affect every page) |
| Breakpoints | 13 literal + 3 Tailwind; tokens unused | Choose one breakpoint set; align the header switch with layout breakpoints |
| Containers | 3 systems; `--resolve-wrap` unused | One container primitive; fixes edge misalignment |
| Inline styles | 175 `style=` props, 35× accent-deep, hex literals | Colour cannot be re-themed centrally until these become classes/tokens |
| Global base-layer legacy | `h1–h4` sizes, `section`, `ul/ol`, `.card-hover`, `.badge`, `.description`, `.subtitle` | Specificity fights (`!text-sm` in footer); hidden coupling |
| Duplicate components | 4 heroes, 6 CTA/close variants, 3 breadcrumbs, 2 FAQ sections, duplicate schema builders | 4E consolidation; schema-bearing duplicates need SEO care |
| Dead code | 60 unused component files; ~15 unused dependencies; 4 MB unused images | Inflates CSS; misleads future sessions (legacy cards look "available") |
| Dead API | `mode` on `CommercialHero`/`RouteHero` | Misleading; Phase J docs describe behaviour that no longer exists |
| Undocumented divergence | `1557f74` (sticky header, rhythm, hero modes, measure) | Must be reconciled with `DEC-018`/`DEC-022` before Gate 1 can treat any state as the baseline |
| Two visual systems | Resolve vs legacy (case study, blog article, legal, chrome container) | 4F must migrate F7, F8 and F11 detail templates, not just restyle them |

---

## 19. Existing Strengths Worth Preserving

1. **THE RESOLVE identity:** ivory/ink/tangerine, the contrast-driven accent ramp, Bricolage + Manrope, no monospace, no decorative gradients, no ambient motion.
2. **The four mark states** (named / anonymous / unattributed-dashed / owned) as a semantic visual vocabulary — rare, ownable, and honest.
3. **The homepage hero and population toggle** — the clearest expression of "judge us on enquiries, not traffic".
4. **The chain figure family** and its width-native compositions (a real responsive-design achievement).
5. **Evidence honesty:** scope statements on every number, explicit "we do not promise", withheld unverifiable proof.
6. **Hairline editorial lists** instead of card grids.
7. **Motion engineering:** tokenised, one-shot, no library, reduced-motion and no-JS composed states, failsafes.
8. **Form semantics and conversion integrity** (2xx-only success, five-event taxonomy, consent-first analytics).
9. **Documentation discipline in code** — intent is recorded beside implementation.
10. **`CommercialSection` composition modes** (Phase J) as a working answer to single-left-edge monotony.

---

## 20. Ranked UI Opportunity Map

| Rank | Opportunity | What happens now | Why it matters | Affected | Owner workstream |
|---|---|---|---|---|---|
| **CRITICAL** | C1 Mobile navigation reachability | Sticky header + inline menu traps "Contact Us"/"Book a call" off-screen on phones | Blocks the primary conversion path from navigation on most phones | All routes | 4D (navigation). **Flag to owner now; production is affected** |
| **CRITICAL** | C2 Proof contradiction | Homepage and `/work` say "no case studies" while three are published | Credibility: the site's core promise is honesty | `/`, `/work`, `/portfolio/*` | Owner copy decision (LOCKED copy) → 4G |
| **CRITICAL** | C3 Baseline ambiguity | `1557f74` changed approved behaviour without a decision record | Gate 1 cannot design against an undefined baseline | Global | Owner decision before Gate 1 |
| **HIGH** | H1 Unify the two visual systems | Case study, blog article and legal render in legacy cards/gradient/icon tiles | Perceived quality drops sharply on proof and SEO pages | F7, F8, F11 | 4F + 4G (+ 4E) |
| **HIGH** | H2 Token foundation (type scale, spacing scale, container, breakpoints, CTA variants) | 1,676 arbitrary utilities; 3 containers; 4 primary-button styles | Without this, every later workstream is hand-editing hundreds of call sites | Global | Gate 1 definition → 4A/4B/4C/4E |
| **HIGH** | H3 Reading measure & hero composition | 104–161 character lines; empty 40% hero right side | Readability and the "deliberate" feel the handoff targets | F2–F6, F9, F10 | 4A + 4C (hero figure rule I2/B27 is approved: compose within it) |
| **HIGH** | H4 Proof/evidence component system | Evidence is dim body text; no claim/evidence/context/limit primitive | The brand's differentiator (checkable honesty) is visually invisible | `/`, F3, F5, F7, F9 | 4G |
| **HIGH** | H5 Header at 1024–1080 and chrome alignment | Overflow and wrapping; three left edges | Tablet-landscape and small-laptop credibility | Global chrome | 4D |
| **MEDIUM** | M1 Section rhythm & variety on long routes | Uniform label→display→body grammar for 10–14 screens | Monotony; fatigue on method pages | F2, F4, F5 | 4F |
| **MEDIUM** | M2 Accessibility contrast fixes | Inputs 1.30:1; gap text 3.13:1; dual focus styles | WCAG 1.4.3 / 1.4.11 | Forms, notes, breadcrumbs | 4B (+ 4E) |
| **MEDIUM** | M3 Figure label collisions | Chain labels overlap at 1440 and 390 | Undermines the precision story | `/` (and check `ChainFigure` variants) | 4G / Gate 5 |
| **MEDIUM** | M4 Micro-interaction system | Homepage tokens vs Tailwind defaults elsewhere; abrupt menus | Coherence; "precision" motion language | Global | 4H |
| **MEDIUM** | M5 Image delivery | Unoptimised 1600px CMS JPEGs on mobile | LCP on blog and case studies | F7, F8 | Technical sub-task inside 4F (REVIEW: `next.config.mjs` is LOCKED) |
| **MEDIUM** | M6 Mobile length | 12–14.6 screens on method/problem pages | Engagement, CTA reach | F4, F5 | 4F (compose; copy LOCKED) |
| **LOW** | L1 Global base-layer cleanup (`ul` indent, `section` padding, heading scale) | Leaks into chrome | Hidden coupling | Global | 4A/4C |
| **LOW** | L2 Dead code/assets removal | 60 files, 4 MB images, unused deps | CSS weight, maintainability | Repo | Gate 4E/6 (REVIEW for deps) |
| **LOW** | L3 Logo lockup legibility at header size | Tagline ≈4px; "MappedSkill" wordmark | Brand polish | Chrome | Owner asset question → 4D |
| **LOW** | L4 Hydration warning from hero pre-paint attribute | Dev console error each load | Noise; masks real hydration errors | `/` | 4H |

---

## 21. Gate 1 Design Questions

### 21.0 Must be answered by the owner before Gate 1 starts

> **RESOLVED 2026-10-08.**
>
> | Question | Answered by |
> |---|---|
> | Q1 | `DEC-029` — evolution within THE RESOLVE; substantial elevation allowed |
> | Q2 | `DEC-030` — unapproved regressions; not the baseline; no wholesale revert |
> | Q3 | `DEC-031` — `DEC-012` governs; the copy fix is separately authorised (`LIVE-2`) |
> | Q4 | `DEC-032` — approved positioning governs |
>
> See §24. The questions are retained below as asked.

1. **Scope of "direction".** `DEC-018` (THE RESOLVE) is an approved, binding visual direction, and the Master Handoff asks Gate 1 for "2–3 coherent visual + motion directions". Should the directions be:
   - (a) three elevations *within* THE RESOLVE's binding characteristics (`00_ACTIVE_DIRECTION.md §4`); or
   - (b) may one or more depart from them?

   This audit's evidence favours (a) — the strengths in §19 *are* THE RESOLVE — but it is an owner decision.
2. **October changes.** Are `1557f74`'s sticky header, fixed section padding, removed hero modes and removed measure cap approved (record a decision), or regressions (restore the `DEC-022` state as the baseline)? The sticky header conflicts with `§4.5 "0 sticky"` and causes defect R1.
3. **Proof copy.** How should the homepage and `/work` describe three published-but-figure-withheld case studies? (Copy is LOCKED; the visual system depends on the answer.)
4. **Business-context wording.** The Master Handoff lists "websites" and "social media" as business lines. Approved positioning on `/services` excludes standalone web development and social media management, and `ASSUMPTIONS_AND_OPEN_QUESTIONS.md` records "GET FOUND → CONVERT → AUTOMATE → GROW" as **superseded** (while `CLAUDE.md` still presents it as the working hypothesis). Confirm that approved positioning governs.

### 21.1 Questions the 2–3 directions must explore (from this site's evidence)

1. **Typography character:** how far to push Bricolage's display voice (the homepage T1) vs a calmer editorial rank for long method pages. Is there a third role for evidence and numbers (a figure/caption register) without breaking "no monospace"?
2. **Editorial vs system-led composition:** Phase J's rail/reverse/statement/wide modes vs a stricter modular grid. How do heroes gain composition while honouring I2/B27 "zero apparatus above the fold"?
3. **Density:** how to shorten 10–15-screen routes visually (grouping, disclosure, side-by-side comparison) without cutting LOCKED copy.
4. **Surface philosophy:** ground/paper/hairline only, or a fuller surface ladder (ink panels, tinted evidence surfaces)? How many counted inversions per page are allowed outside the homepage?
5. **Proof/data language:** a claim → evidence → context → limit component; how to visualise *first-party, scoped* numbers (28 runs, 120 sites) and structural diagrams with **no client metrics**; and how withheld case studies present without looking empty.
6. **Navigation character:** sticky or not (see 21.0-2); a mega-menu vs a simple disclosure for six capabilities; the 1024–1080 range; the mobile menu as a full-height sheet vs an inline expansion.
7. **Imagery/illustration philosophy:** the site is image-free by direction (`§4.5`). Do the directions stay diagrammatic (marks, chains, fields), or introduce photography or illustration (team, workspace, artefacts) — and what does that do to performance?
8. **Asymmetry:** controlled asymmetry is already present (0.92fr/1.08fr hero, 20ch rails). Where does more asymmetry help (heroes, closes) and where does it hurt (forms, legal)?
9. **Motion personality:** extend the resolve/draw-on language to capability pages (scroll storytelling), or keep commercial routes static and invest in micro-interactions only? Which 2–3 signature moments?
10. **Component philosophy for proof pages:** migrate case-study and blog templates into Resolve primitives, or design a distinct "document" register (long-form, research, case study) inside the same system?
11. **Technical ambition / performance trade-offs:** stay library-free (the current motion has none) or justify GSAP / Motion for scroll storytelling? Image-optimisation strategy given `images.unoptimized` (LOCKED config). JS budget for the header (client component on every page).
12. **Footer role:** pure chrome (current, approved after Phase I) vs a structured site index. What is the mobile footer length budget?

---

## 22. Risks / Exceptions / Unknowns

| # | Item | Label | Consequence |
|---|---|---|---|
| X1 | **Deploy-on-push re-enabled.** `eff9704` (2026-10-06) changed `.github/workflows/deploy.yml` so a **push to `main` deploys to production**, and it downgraded the missing required-reviewer check from a hard failure to a warning. This contradicts `DEC-026` ("a push to `main` … cannot deploy") and the Master Handoff path (… → QA → **staging** → production). Merging `ui-revamp` into `main` would ship straight to production | VERIFIED (diff) | Must be resolved by the owner **before any merge to `main`** (Gate 7/8). Not a Gate 0 blocker |
| X2 | Decision log / current state stale since 2026-09-18 (§2.1) | VERIFIED | Future sessions may treat superseded statements as current |
| X3 | `1557f74` diverges from approved decisions (sticky header vs `DEC-018 §4.5`; hero modes and measure vs `DEC-022`) | VERIFIED | Baseline ambiguity (21.0-2) |
| X4 | Proof-copy contradiction on production (§11) | VERIFIED | Credibility risk now, independent of the revamp |
| X5 | Mobile menu CTA unreachable on production (sticky header is live — production HTML contains `sticky top-0`) | VERIFIED | Live conversion defect, independent of the revamp |
| X6 | Contentful Preview API (`37d7bce`): `.env.example` states drafts are "fetched alongside published content" when `CONTENTFUL_PREVIEW_ACCESS_TOKEN` is provided. Whether production sets that token is unknown | UNKNOWN | Possible publication of draft content; outside UI scope — owner/technical check |
| X7 | Production deploy state: memory and records show manual releases through R4 (`eb4ab32`). It is unknown which later commits are live (CI SSH port issue recorded separately). Production visibly includes `1557f74` (sticky header) | UNKNOWN (exact SHA) | Screenshots of production may not equal `ui-revamp` HEAD |
| X8 | CMS families were audited on production only (no local Contentful data) | Limitation | Local visual regression for F7–F10 needs CMS access or fixtures |
| X9 | Two UI stashes recorded in `CURRENT_STATE.md` are absent from this clone | UNKNOWN | Owner to confirm their location if they still matter |
| X10 | Case-study CMS copy names "TechWave Solutions" inside the Ameba study | VERIFIED (production text) / UNKNOWN (origin) | Content-integrity owner check |
| X11 | Logo wordmark reads "MappedSkill" | UNKNOWN (intent) | Brand asset question |
| X12 | No Core Web Vitals, real-device, screen-reader, cross-browser or user testing has ever been done | VERIFIED (absence in records) | All performance and accessibility statements are code- or lab-derived |
| X13 | Local Node 24 vs CI/host Node 22 | VERIFIED | Build parity risk for later gates |
| X14 | Audit tooling: rendered measurement used same-origin iframes and Playwright (`playwright-core` from another local project; nothing installed here). The dev server shows a Next.js dev "1 Issue" badge (the hydration warning) in screenshots | Limitation | Dev-mode artefacts are not production defects unless stated |

---

## 23. Gate 0 Conclusion

**Status: COMPLETE WITH EXCEPTIONS.**

The repository, every static route, the CMS-driven families (via production), the visual system, components, responsive behaviour, motion, accessibility, UI performance and the protected SEO/analytics/conversion/backend surfaces have been audited. Baseline checks pass. No application code, dependency or protected system was changed. The only artefacts are this document and `docs/ui-revamp/gate-0-evidence/`.

**Exceptions:**
- three live production defects found during the audit (R1 mobile menu, C2 proof contradiction, R2 1024 header);
- a release-pipeline conflict with the programme's staging gate (X1);
- an undocumented divergence from the approved direction (X3);
- CMS families audited on production only (X8).

**Gate 1 readiness:** ready **once the owner answers §21.0 (questions 1–4)**. Gate 1 should then design its 2–3 directions against §19 (preserve), §20 (rank) and §21.1 (questions), under the constraint in §11 that no client performance data exists to visualise.

---

## 24. Gate 0 Closure — Owner Decisions and Resolutions (2026-10-08)

Added at closure. **Every finding in §§1–23 stands as originally recorded**; this section records how each open point was decided.

### 24.1 Decisions

| Audit point | Decision | Effect on later gates |
|---|---|---|
| §21.0 Q1 — scope of "direction" | **`DEC-029`** | Gate 1 proposes 2–3 **evolutionary** directions **within THE RESOLVE**:<br>• Substantial elevation is allowed (type, composition, grid, hierarchy, spacing, surfaces, proof, interaction, motion, responsive composition).<br>• Ivory/ink/tangerine restraint, evidence-first communication, the marker language, proof honesty and anti-generic aesthetics are preserved.<br>• Strategy, positioning, service taxonomy, conversion, SEO and analytics architecture are not reopened.<br>• Changing any `00_ACTIVE_DIRECTION.md` §4 binding trait must be named and justified for owner approval |
| §21.0 Q2 / §22 X3 — October changes | **`DEC-030`** | `1557f74`'s sticky header, fixed section/hero padding, removed opener modes and removed measure cap are **unapproved regressions**:<br>• The Gate 1 baseline is the `DEC-018`/`DEC-022` intent, not current `main`.<br>• No wholesale revert. Each item is corrected in its workstream: 4D sticky header; 4C rhythm and hero padding; 4C/4F opener modes; 4A/4C measure.<br>• Recorded in full in `DEC-030` |
| §21.0 Q3 / §11 / §22 X4 — proof | **`DEC-031`** | `DEC-012` governs:<br>• No client figures may be invented, restored, inferred or exposed, including as prototype placeholders.<br>• Gate 1 must design proof that works without numbers: qualitative outcomes, approved quotations, methodology, challenge/intervention/outcome narrative, verified facts, scoped first-party measurement.<br>• The copy contradiction is acknowledged and tracked as `LIVE-2`, not fixed here |
| §21.0 Q4 — business-context wording | **`DEC-032`** | `DEC-005` + `SERVICE_ARCHITECTURE.md` govern:<br>• "Websites"/"social media" in the Master Handoff are context only (annotated in place).<br>• `CLAUDE.md`'s "Current Strategic Status" reflects superseded `DEC-004` framing; `DEC-005` governs |
| §20 C1 / §12 R1 / §22 X5 — mobile menu | **`DEC-033` → `LIVE-1`** | Live defect, separately authorised; not a redesign trigger |
| §22 X1 — deploy on push | **`DEC-033` → `PROC-1`** | Process risk; **no merge to `main` while open** |

### 24.2 Authority chain for Gate 1 and later sessions

Read in this order. A higher entry overrides a lower one.

1. `docs/00-project/DECISION_LOG.md` — especially `DEC-005`, `DEC-012`, `DEC-018`, `DEC-022`, `DEC-026` and `DEC-029`–`DEC-033`.
2. `docs/ui-revamp/PROGRAMME_RISKS_AND_LIVE_ISSUES.md` — open live defects and process risks.
3. `docs/ui-revamp/MappedSkills_UI_Revamp_Master_Handoff.md` and `…_Implementation_Plan.md` (`.md`, with their 2026-10-08 annotations; the `.pdf` copies are unannotated).
4. `docs/24-resolve-governance/00_ACTIVE_DIRECTION.md` (§4 binding, §5 non-binding).
5. This audit — the factual baseline.
6. `docs/00-project/CURRENT_STATE.md` — its 2026-09-18 production block predates the activity in §2.1.
7. Implemented code on `main`. Note that `1557f74` is a regression, not intent.
8. Older documentation.

`CLAUDE.md` remains the operating-rule file. Its "Current Strategic Status" paragraph is superseded on substance by `DEC-005`/`DEC-032`.

### 24.3 Closure status

**Gate 0: CLOSED — COMPLETE WITH EXCEPTIONS.**

Outstanding exceptions, none of which blocks Gate 1 design work:
- `LIVE-1`, `LIVE-2` and `PROC-1` are open;
- the documentation gap (X2) is acknowledged but not back-filled;
- X6, X7, X9, X10, X11, X12 and X13 remain open.
