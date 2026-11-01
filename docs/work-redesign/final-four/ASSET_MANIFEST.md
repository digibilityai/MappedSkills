# Asset manifest: final four case studies (local review, 31 October 2026)

Status: **LOCAL, not released.** Nothing committed, pushed, deployed, published or written to Contentful.
Label for every statement: **VERIFIED FACT** (file and repository inspection, 2026-10-31) unless marked otherwise.

## Mapping: client to service to industry to route to artwork

| # | Client | Service (document) | Industry (page) / sector key / service key | Route | Card | Hero (supplied) | Hero 2.6:1 | Dashboard |
|---|---|---|---|---|---|---|---|---|
| 01 | ClassPe | Social Media Management | Education and training / `education` / none | `/portfolio/classpe-social-media-strategy` (existing) | `classpe-social-media-card.webp` | `classpe-social-media-hero.webp` | `classpe-social-media-hero-wide.webp` | **none (not published)** |
| 02 | InsurYo | Organic Growth Strategy | Insurance / `financial-services` / none | `/portfolio/insuryo-organic-growth` (existing) | `insuryo-organic-growth-card.webp` | `insuryo-organic-growth-hero.webp` | `insuryo-organic-growth-hero-wide.webp` | **none (not published)** |
| 03 | Ameba Software | SEO | Software and technology / `software-technology` / `/seo` | `/portfolio/seo-ameba-software` (existing) | `ameba-software-seo-card.webp` | `ameba-software-seo-hero.webp` | `ameba-software-seo-hero-wide.webp` | `ameba-software-seo-dashboard.webp` |
| 04 | Wanderlooms | Meta Ads | Adventure apparel / `ecommerce-retail` / `/social-media-ads` | `/portfolio/wanderlooms-meta-ads` (new) | `wanderlooms-meta-ads-card.webp` | `wanderlooms-meta-ads-hero.webp` | `wanderlooms-meta-ads-hero-wide.webp` | `wanderlooms-meta-ads-dashboard.webp` |

Files are in `public/images/case-studies/`. Originals (PNG, as supplied, never modified) are in `docs/work-redesign/final-four/source-originals/`.

## Conversions

| Output | Source | Source SHA-256 (first 12) | Output |
|---|---|---|---|
| `classpe-social-media-card.webp` | `source-originals/classpe-social-media-card.png` | `1be262842fc0` | 1586x992, 107 KB |
| `classpe-social-media-hero.webp` | `source-originals/classpe-social-media-feature.png` | `0ad2eb3ed704` | 1672x941, 120 KB |
| `classpe-social-media-hero-wide.webp` | crop of the supplied hero (rows 95 to 738) | `cd766571d913` | 1672x643, 95 KB |
| `insuryo-organic-growth-card.webp` | `source-originals/insuryo-organic-growth-card.png` | `246bb47531aa` | 1586x992, 101 KB |
| `insuryo-organic-growth-hero.webp` | `source-originals/insuryo-organic-growth-feature.png` | `ba37c831cb21` | 1672x941, 146 KB |
| `insuryo-organic-growth-hero-wide.webp` | crop of the supplied hero (rows 70 to 713) | `8a3699de2f79` | 1672x643, 114 KB |
| `ameba-software-seo-card.webp` | `source-originals/ameba-software-seo-card.png` | `23fdc985a1ef` | 1586x992, 118 KB |
| `ameba-software-seo-hero.webp` | `source-originals/ameba-software-seo-feature.png` | `eb6f7b3e55a5` | 1672x941, 91 KB |
| `ameba-software-seo-hero-wide.webp` | crop of the supplied hero (rows 90 to 733) | `66699aa23d7a` | 1672x643, 71 KB |
| `ameba-software-seo-dashboard.webp` | `edits/ameba-software-seo-dashboard.edited.png` (see below) | `caa45985d63c` | 1586x992, 83 KB |
| `wanderlooms-meta-ads-card.webp` | `source-originals/wanderlooms-meta-ads-card.png` | `237d023a23cc` | 1585x992, 133 KB |
| `wanderlooms-meta-ads-hero.webp` | `source-originals/wanderlooms-meta-ads-feature.png` | `1296c67018be` | 1672x940, 166 KB |
| `wanderlooms-meta-ads-hero-wide.webp` | crop of the supplied hero (rows 150 to 793) | `e61c6d466d4f` | 1672x643, 120 KB |
| `wanderlooms-meta-ads-dashboard.webp` | `source-originals/wanderlooms-meta-ads-dashboard.png` | `c6abf7f95ac4` | 1586x992, 74 KB |

- The supplied files are smaller than the briefed 1600 x 1000 / 1920 x 1080 / 1920 x 1200; they are used at their own pixels (never upscaled), as in the earlier batches. Wanderlooms was supplied 1 px smaller (card 1585 x 992, hero 1672 x 940) and is declared as supplied.
- **Hero 2.6:1 derivatives are plain crops** (no repaint, move or scale): a first attempt with the earlier batches' text-moving tool left a smear on the Wanderlooms hillside, and these four headlines fit above the lower fifth in a single window. Tool: `tools/make-wide-heroes-final-four.cjs` (copy each `<name>-feature.png` to `wide-work/src/<name>-hero.png`, run it into `wide-work/out/`, then run `tools/convert-assets-final-four.cjs`; those two scratch folders are not kept). Narrow screens show the supplied hero whole; the sharing image is the supplied hero.
- **One edit to supplied artwork:** the printed caption "Recreated agency report" (bottom right) is removed from the Ameba Software dashboard, the owner's rule being no visible recreated-image captions. Only those text pixels were refilled (same method as the AnybodyCanBake dashboard, `tools/convert-assets-final-four.cjs`); the edited PNG is in `edits/`. The Wanderlooms dashboard carries no such caption.
- No visible conceptual or recreated caption, and no full-size image action, appears on any of the four pages; alt text is accurate (`lib/case-study-final-four.ts`).

## Supplied files not published

| File | Reason |
|---|---|
| `classpe-social-media-dashboard.png`, `insuryo-organic-growth-dashboard.png` | Owner correction, 31 October 2026: not published. Not copied into the repository. |
| `anybodycanbake-seo-dashboard.png` (14:53, SHA `7d1d2a368614`) | Not one of the four cases. It differs from the published, edited AnybodyCanBake SEO dashboard (`b50cfb11d9ed`) and labels the periods "Earlier 90 days / Later 90 days" where the approved case uses May to July and August to October 2026. **Not applied; kept in `source-originals/not-published/`. See the report, question 2.** |
