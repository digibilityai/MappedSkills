# BL-D6 · Blog Article Pages — Audit & Minimal Design Proposal (2026-10-20)

**Status:** audit, research and proposal only. No source code, Contentful entry, production data, decision log or
`CURRENT_STATE.md` was changed. Nothing committed, pushed or deployed. The `/blog` listing (DEC-066) is not reopened.

**Inputs read:** `DECISION_LOG.md` and `CURRENT_STATE.md` on `origin/main` @ `edb7c3f` (DEC-005, DEC-051, DEC-062,
DEC-063, DEC-066); `docs/blog-redesign/audit/BL_AUDIT_AND_PROPOSAL.md` (its §3 article notes are the starting point);
the article route and components on `origin/main`; production `https://mappedskills.com/blog` and all seven articles.

**Brand DNA:** still no standalone Brand DNA file in the repository (**UNKNOWN** location, as in the listing audit).
Checks use DEC-005, DEC-051 item 5, the THE RESOLVE / C+ tokens, and the approved `/faq` and `/blog` as the proxy.

**Evidence (kept outside Git, like earlier redesign evidence):** `screenshots/` (Playwright Chromium against
production, 1440 × 900 and 375 × 812, `*-fold.png`, `*-full.png` and close-ups), `live-probe.json` (headings, links,
TOC anchors, typography, overflow, claims scan, hover/focus, reduced motion), `p2.json` (section extracts, keyboard
order). Consent was neither accepted nor declined; the banner was removed from captures by DOM removal only.

Labels: **V** = verified defect (measured/observed) · **S** = subjective judgement · **O** = owner decision needed.

---

## 0. Summary

The article pages do not need a redesign. They need **one broken feature fixed, one dead block removed, the
conversion path cut from five asks to one honest one, and the reading column brought onto C+ type**. The bigger
problems are **content**, not design: two articles publish the writer's internal notes to readers, three are
city-page agency pitches outside the approved positioning, and several carry unsupported numbers.

Top five verified findings:

1. **Every table-of-contents link is broken** — 126 of 126 links across all 7 articles point to `#section-N` ids that
   do not exist (headings get text-slug ids). Clicking does nothing useful. (V, code + live)
2. **Editorial notes are published as article text** on `/blog/facebook-advertising-agency-pune` ("We also recommend
   supporting this page over time with: verified performance snapshots…") and `/blog/seo-company-in-pune` ("If you
   want this page to convert better, add first-party proof…"). (V, Contentful content)
3. **Dead newsletter block on all 7 articles** — H2 "Get More Growth Insights" over a card saying "There is no
   mailing list yet." (V)
4. **Up to five competing conversion asks** per article, two still saying "Book…" against DEC-062 — sidebar "Book a
   call", Contentful "Book a Client Discovery Call (30 minutes)". (V)
5. **Mobile: the reader scrolls ~3.6 screens before the article starts** on the SEO article (TOC 1,972 px tall at
   375 px; body starts at 2,955 px), and the sidebar CTA lands at the very bottom (21,769 of 24,093 px). (V)

**Recommendation: GO for a G1 static mockup** of the restrained article template in §4 (A-workstream only), with
B/C content corrections decided by the owner in parallel.

---

## 1. Architecture (VERIFIED FACT)

| Item | Finding |
|---|---|
| Route | `app/(pages)/blog/[slug]/page.tsx`, ISR `revalidate = 60`, `generateStaticParams` from Contentful. |
| Shell | Global C+ header/footer already render around articles. The **body** is legacy shadcn: `Section`/`Container`, `Card`, `Badge`, `Button`, Tailwind `prose`. |
| Components | `components/blog/`: `BlogHero`, `BlogIntroduction`, `TableOfContents`, `RichTextContent`, `CTABlock`, `StickySidebarCTA`, `SocialShare`, `RelatedPosts`, `RelatedServices`, `AuthorBio`, `FAQSection`; plus `components/forms/BlogNewsletterForm.tsx` and the shared `components/CTASection.tsx`. |
| Data (`lib/contentful/mappers.ts`) | Contentful fields used: `slug`, `title`, `excerpt` (also meta description), `seoTitle`, `keyword`, `category {name, slug}`, `author {name, description, profile.url}`, `featuredImage`, `content {json, links}`, `sys.firstPublishedAt/publishedAt`. **Derived in code:** reading time (200 wpm), TOC (H2/H3 text), `ctaType` (from category name), canonical. `introduction` and `faqs` are typed but not populated on any live article. |
| TOC ids | `extractTocFromDocument` assigns `id: section-${index}`; `RichTextContent` gives headings `id={slugify(text)}`. **They never match** → finding A1. |
| Related services | `lib/blog-services.ts` — owner-approved per-slug map (BLOG-007/008). 4 articles have services; 3 are approved to show none. |
| Related posts | Same Contentful category only → appears on 2 of 7 (the two "Content Marketing" articles). |
| Author | Role hard-coded "Performance Marketing Strategist"; bio fallback "contributes performance marketing insights"; avatar falls back to a hard-coded third-party cartoon `https://api.dicebear.com/10.x/toon-head/svg?seed=Alex%20Whi` (`AuthorBio.tsx:22`), which all 7 articles render. |
| SEO | Own title/description/canonical, `og:type article`, Article + BreadcrumbList JSON-LD; `og:image` falls back to `/ms_icon.webp` on 2 articles; Article `image` is `undefined` there. |
| Shared risk | `CTASection` and the shadcn primitives are used elsewhere; changes must be blog-scoped (new `components/cplus/blog-article/` files), as DEC-066 did for the listing. |

### The seven articles (production, 2026-10-20)

| # | Slug | Category | Words | Read | TOC items | Related services | Notes |
|---|---|---|---|---|---|---|---|
| 1 | `content-marketing-services-in-pune` | Content Marketing | 1,154 | 6 min | 9 | none (approved omit) | City page; "15 % in 2023" claim |
| 2 | `building-an-email-list` | Email Marketing | 623 | 3 min | 6 | none (approved omit) | Generic image; quote attributed to author |
| 3 | `importance-of-content-writing` | Brand Strategy | 1,053 | 5 min | 5 | none (approved omit) | Career-advice angle; no image (icon OG) |
| 4 | `performance-marketing-vs-digital-marketing` | Insights | 806 | 4 min | 6 | Google Ads, Paid Social | Generic image; "guarantees" claim |
| 5 | `7-proven-strategies-…-real-estate-developers` | Real Estate | 2,761 | 14 min | 22 | Lead Gen, Google Ads, SEO | Benchmarks presented as targets |
| 6 | `seo-company-in-pune` | Content Marketing (!) | 1,956 | 9 min | 40 | SEO | City page; "30 minutes"; editor note |
| 7 | `facebook-advertising-agency-pune` | PPC | 1,918 | 9 min | 38 | Paid Social | City page; client list; editor note; no image |

All 7 show **published July 16, 2026** (the Contentful migration date, not original authorship) and updated
September 2026. HTTP 200, 0 console errors, no horizontal page overflow, no text under 12 px at 1440 or 375.

---

## 2. Audit — seven dimensions

### 2.1 Visual design and brand consistency
| # | Finding | Type | Evidence |
|---|---|---|---|
| VD1 | Fonts and colours are on-brand: Bricolage Grotesque H1 (48 px/700 desktop, 36 px mobile), Manrope body, ink `#141219`, tangerine links `rgb(168,52,0)`. | V (positive) | `live-probe.json` |
| VD2 | Body components are legacy shadcn — rounded cards with shadows (TOC, in-body CTA, sidebar, author, newsletter, related cards), a pill category badge, icon meta row. The `/blog` listing a reader just came from is C+ (hairline rules, ink rule, square arrow boxes). The seam is visible on every click from the listing. | V (inconsistency) / S (weight) | `*-1440-fold.png` vs `../release/screenshots/` |
| VD3 | Five boxed cards stack at the end of each article (in-body CTA, share, author, newsletter, final CTA band), so the article ends in a pile of boxes rather than one close. | V | `building-an-email-list-1440-full.png` |
| VD4 | Inline images (where present) are full-column, rounded, with shadows; 2 articles reuse a generic stock image (`blog-details-img.webp`, `BlogDetailsA.webp`), 2 have none. | V | `live-probe.json` imgs |

### 2.2 Typography, spacing, hierarchy, mobile
| # | Finding | Type | Evidence |
|---|---|---|---|
| TY1 | **Line length too long for reading.** Body paragraphs are 795 px wide at 16 px Manrope ≈ 95–100 characters per line (comfortable long-read range ≈ 60–75). | V (measured width) / S (threshold) | probe `bodyPWidth` 795 |
| TY2 | Body text 16 px / 26 px; C+ pages use 1.0625 rem (17 px) for running text. | V | probe |
| TY3 | **Heading outline is broken on every article.** H3 "Table of Contents" precedes the first H2; Contentful H2/H3 levels are inconsistent (email article: H2 "What is an Email List?" then H3 for every other top-level section); H4s render visually **larger** than the H3 above them ("1. Personalization" vs "Top 10 Benefits…"), because `RichTextContent` styles H2/H3 but leaves H4–H5 to `prose`; CTA/sidebar/author add H2/H3/H4s after the body ("There is no mailing list yet." is an H3). | V | `heads` in probe; `building-an-email-list-1440-full.png` |
| TY4 | **Mobile front-loading.** At 375 px the SEO article's TOC is 1,972 px tall and the body begins at 2,955 px (≈ 3.6 screens after the H1); the Facebook article is similar (38 items). | V | `m-seo-pune-toc.png`, p3 output |
| TY5 | Mobile sidebar CTA is pushed to the end (21,769 / 24,093 px), after the dead newsletter block, so it duplicates the final CTA band 300 px later. | V | `m-seo-pune-end-stack.png` |
| TY6 | Tables scroll inside their own container (500 px table in a 341 px box on the Facebook article) — acceptable; no page overflow. | V (positive) | `m-fb-table.png` |
| TY7 | Inline body links are 22 px tall on mobile (normal for inline text; WCAG 2.5.8 exempts inline links). Breadcrumb links 23 px. | V (no defect) | probe |
| TY8 | Long titles wrap to 6 lines at 375 px (SEO article H1 is 82 characters); the breadcrumb repeats the full title. | V / S | `m-seo-pune-fold.png` |

### 2.3 Clear, conversational customer language
| # | Finding | Type |
|---|---|---|
| CL1 | Component copy (code) is mostly in the plain voice already ("Tell us what is actually happening…"). But headings are agency-generic: "Want Us to Review This for Your Business?", "Ready to Turn This Insight Into Action?", "Get More Growth Insights", "Need Help With This?". | V (text) / S (tone) |
| CL2 | Article bodies (Contentful) use stock marketing phrasing: "game-changer", "the real magic lies", "Prepare to take notes—these insights are designed… to deliver results!", "So why wait?". Titles/descriptions: "Boost Your Business Now", "MappedSkills gets results", "FB & Insta Ads Experts". | V (text) / S (tone) |
| CL3 | Article 3 is written for aspiring content writers ("Is Content Writing a Good Career Choice?", "Explore Freelancing Platforms"), not for the buyer the site serves. | V (text) / O |

### 2.4 Purposeful visual storytelling
| # | Finding | Type |
|---|---|---|
| VS1 | No purposeful visuals today; images are decorative stock or typographic banners. | V |
| VS2 | Real opportunities exist but are **content** work, not template work: the performance-vs-digital comparison and the SEO/Facebook "first 90 days" / timeline tables would read better as a simple, styled C+ table. The template only needs a good default table style. | S |
| VS3 | Do **not** add illustrations, hero images or animation to the template; images are too uneven across the 7 (VS1 in the listing audit). | S |

### 2.5 Contact and booking conversion journeys
Verified asks per article (1440 px, in reading order):

| Ask | Where | Destination | Shown on | Issue |
|---|---|---|---|---|
| Contentful inline "Book a Client Discovery Call (30 minutes)" | Body, twice | `/schedule-call` (SEO); **plain bold text, not a link** (Facebook) | 2 articles | DEC-062 (nothing may imply booking); 30-min duration unconfirmed (DEC-051); dead-end text on Facebook |
| In-body `CTABlock` "Need a Clear Marketing Direction?" → "Tell us what you're trying to fix" | End of body | `/contact` | 7 (all resolve to `generic`: no category contains google/social/seo/lead/cro keywords) | Fine copy; card look |
| Sidebar "Want Us to Review This for Your Business?" → **"Book a call"** | Sticky right (desktop) / bottom (mobile) | `/schedule-call` | 7 | DEC-062 D4 relabel pending; "review" implies a deliverable not defined |
| `RelatedServices` "Need Help With This?" → "Learn More" ×1–3 | After share | service pages | 4 | Vague link text ("Learn More" ×4 on the real-estate page) |
| Sidebar "Related Service" → "Learn More" | Sidebar | service page | 4 | Duplicates the block above |
| Newsletter "Get More Growth Insights" | Before close | none | 7 | **Dead block** |
| `CTASection` "Ready to Turn This Insight Into Action?" → "Tell us what you're trying to fix" / "Explore Services" | Final band | `/contact`, `/services` | 7 | Second `/contact` ask with the same label |

Result: **3 separate `/contact`/`/schedule-call` asks plus 1–4 "Learn More"** on most articles, two labelled
"Book…", and one dead section. No ask mentions what happens next. Every target resolves (HTTP 200 for
`/schedule-call`, `/contact`, `/services`, the 6 service pages and the 2 portfolio links).

### 2.6 Brand DNA, factual accuracy and credibility
| # | Finding | Type |
|---|---|---|
| BD1 | **Internal editorial notes published to readers** — Facebook article: "We also recommend supporting this page over time with: 1. verified performance snapshots… That will make the page stronger for both conversion and SEO." SEO article: "Results vary. If you want this page to convert better, add first-party proof like case study summaries, before/after examples, or reporting snapshots." | **V — highest content priority** (`m-fb-proof-editor-note.png`) |
| BD2 | **Unverified client list:** Facebook article lists "Social Media Ads for OmSaiGroup / GEMS Education / Mohali Citi Center / Advit Prints / AnybodyCanBake" as proof. Only AnybodyCanBake appears in `/work` HTML; the other four could not be found on the site. Not links. | V (absence on `/work`) / **RESEARCH REQUIRED** (owner to confirm permission and accuracy) |
| BD3 | **Unsupported or mis-sourced numbers:** "Pune's digital advertising spending grew by 15% in 2023 alone" linked to a Statista *India* outlook page (national, not Pune; figure not verified); real-estate "increasing web traffic by 20% in three months or reducing customer acquisition costs by 15%" (illustrative, reads as a benchmark); email "still one of the highest ROI channels… surpassing social media" (no source); "Most businesses start seeing meaningful movement in 3 to 6 months" (SEO; hedged with "Results vary"). | V (text) / RESEARCH REQUIRED |
| BD4 | **Misleading claims about MappedSkills itself:** "Best SEO Company in Pune" (title/H1, superlative, no basis); performance-vs-digital: "the performance marketing approach guarantees that you get what you pay for"; content-marketing conclusion "This case demonstrates…" with no case in the article. | V (text) |
| BD5 | **Positioning conflict:** 3 articles are city-page agency pitches ("…in Pune"), which `SERVICE_ARCHITECTURE.md` lists as excluded ("scaled location or city-page SEO") and DEC-005 rejects ("full-service digital marketing agency"). The content-marketing article also pitches "Pune vs Mumbai agencies" and links freelancers to fiverr.com. Location: the footer shows Pune and Mumbai offices and "India-wide consulting", so Pune is not false — but the articles read as local landing pages. | V (text) / **O** |
| BD6 | Quotes: "The money is in the list, but the relationship is in the message." is attributed to **Amit Gupta**; Perelman and Godin quotes are unsourced. | V (text) / RESEARCH REQUIRED (attribution) |
| BD7 | Author credibility: cartoon avatar seeded "Alex Whi…" stands in for the real author; role "Performance Marketing Strategist" is rejected company positioning (DEC-005 §14) and hard-coded; generic bio. | V / O (owner confirms title, photo) |
| BD8 | Dates: all 7 claim first publication on 2026-07-16 (migration date). Not false for this site, but "July 16, 2026 · Updated September 24, 2026" on every article signals bulk import. | V / O |
| BD9 | Category taxonomy inconsistent: 6 categories for 7 posts; SEO article filed under "Content Marketing"; "Insights", "Brand Strategy" are formats, not topics. Also drives related posts (2/7) and `ctaType` (all `generic`). | V |

### 2.7 Interaction feedback, keyboard, reduced motion
| # | Finding | Type |
|---|---|---|
| IX1 | Hover: TOC/body links underline with a 150 ms transition; buttons change shade. Feedback present. | V (positive) |
| IX2 | Focus: every stop is ringed, but at **3 px ink @ 50 %** (outline on links, `ring-ring/50` box-shadow on buttons) — weaker than the C+ 3 px tangerine used on `/blog` and `/faq`. | V |
| IX3 | Keyboard order (email article): breadcrumb → 6 TOC links → in-body button → share ×4 → sidebar "Book a call" → final CTAs → footer. The sidebar sits **after** the article in tab order, so its "Book a call" is reached after everything else in `<main>`. TOC links move focus nowhere (A1). | V |
| IX4 | Reduced motion: transitions collapse to 1e-05 s (global rule). The share/"Learn More" arrow nudge (`group-hover:translate-x-1`) is also neutralised. | V (positive) |
| IX5 | No skip-to-article or "back to top"; long TOCs make this worse on mobile. | V / S |
| IX6 | Not run: real screen readers, real devices, Safari/Firefox apps, GTM Preview. None is a pass. | — |

---

## 3. Known BL-D6 issues — findings

| Issue | Finding | Fix type |
|---|---|---|
| Dead newsletter block | V. All 7. Correctly honest (no false success since Session 31), but a dead end with its own H2. No newsletter is approved. | **A** — remove the section (component stays in repo, unused) |
| "Request a call" wording | V. Sidebar button says "Book a call" (`StickySidebarCTA.tsx:39`). DEC-062 D4 (sitewide relabel) is still pending; the header "Book a call" is also D4 and outside this scope. | **A** — use "Request a call" on article surfaces now (the `/blog` close already does) |
| "Book a Client Discovery Call (30 minutes)" | V. SEO article: 2 links to `/schedule-call`. Facebook article: 1 bold plain-text occurrence, no link (a dead instruction). Conflicts with DEC-062 item 1 and DEC-051 (unconfirmed duration). | **B** — Contentful edit by owner (proposed text in §5) |
| Pune SEO articles / location & ranking claims | V. "Best SEO Company in Pune" superlative; "15 % in 2023" Pune stat with a national source; Pune-vs-Mumbai agency comparison. No ranking *guarantee* is made — the SEO article correctly says agencies should not guarantee rankings. | **B/C** + **O** (keep/retitle/merge/unpublish) |
| Category consistency | V (BD9). | **B** — Contentful, owner-approved taxonomy |
| Internal linking to services | V. Body links exist on 4/7 (SEO, FB, real estate, content marketing); the 3 approved-omit articles link to nothing but `/contact`. "Learn More" link text ×1–4. Related posts appear on 2/7. | **A** (descriptive labels) + **C** (editorial links) |
| Outdated info / unsupported claims | V (BD1–BD4, BD6). "2023" stat; generic "highest ROI" claims; editor notes. | **B** |

---

## 4. Recommended direction — "One reading column, one close"

Apply the existing C+ tokens to the article body; keep every URL, the data model, metadata and JSON-LD. No new
library, no animation beyond the existing 150 ms hover/focus, no client JavaScript added.

### 4.1 Template (top to bottom)

```
WIDE (≥1081)                                          NARROW (≤760)
┌───────────────────────────────────────────┐         ┌──────────────────┐
│ Home / Blog                (short trail)   │ ground  │ Home / Blog      │
│ CATEGORY · 9 MIN READ      (kicker, text)  │         │ CATEGORY · 9 MIN │
│ H1 (b-h1 scale, max 22ch)                  │         │ H1               │
│ By Amit Gupta · Updated 24 Sep 2026        │         │ By … · Updated … │
├───────────────────────────────────────────┤         ├──────────────────┤
│ ━━━━━━━━━━ 3px ink rule                    │ paper   │ ━━━━━━━━━━━━━━━━ │
│ ┌ In this article ┐  Body column           │         │ ▸ In this article│ (closed <details>)
│ │ H2 links only   │  max 68ch, 17px/1.7    │         │ Body             │
│ │ (sticky, ≤ 12)  │  C+ headings H2/H3     │         │                  │
│ └─────────────────┘  tables: hairline      │         │                  │
│                      Related: [SEO →]      │         │ Related: [SEO →] │
├───────────────────────────────────────────┤         ├──────────────────┤
│ Close (b-close, ink): H2 + body | 2 CTAs   │ ink     │ H2, body, CTAs   │
└───────────────────────────────────────────┘         └──────────────────┘
```

| Element | Change | Reason |
|---|---|---|
| Breadcrumb | Reuse `components/cplus/Breadcrumb`; current item = "Article" or truncated title | TY8; matches `/blog` |
| Category badge + icon meta | One kicker line `CATEGORY · N MIN READ` (as `/blog` rows), then "By {author} · Updated {date}" in `--dc-dim` | VD2; one date, not two |
| Excerpt lede | Keep (it is the meta description too), `b-lede` style | — |
| TOC | **Fix ids** (one shared slug function for TOC and headings, de-duplicated). Show **H2 only**, cap ~12. Wide: left sticky rail beside the body. Narrow: closed `<details>` "In this article" (native, no JS). | A1, TY4 |
| Body | Max 68ch, 17 px / 1.7; C+ heading scale for H2–H4 with H4 smaller than H3; hairline tables; images square-cornered, no shadow | TY1–TY3, VD4 |
| Related services | Keep `lib/blog-services.ts` mapping. Render inline after the body as one line of C+ arrow links with the service name ("SEO →", "Paid social →"), not cards. Remove the sidebar duplicate. | CV, link text |
| Share row | Keep links; restyle as plain text buttons | low value, harmless |
| Author | Keep name + bio; **drop the cartoon avatar** (no third-party request); role only after owner confirms | BD7 |
| Related posts | Keep (category-based); C+ hairline rows like `/blog` | consistency |
| Newsletter | **Remove** | dead block |
| In-body `CTABlock`, sticky sidebar CTA, `CTASection` | **Replace all three with one C+ close** | CV |
| Motion | 150 ms hover/focus only; 3 px tangerine `:focus-visible`; reduced-motion and forced-colors blocks scoped `ba-` | IX2 |

### 4.2 Proposed customer-facing CTA copy (owner approval needed)

One close, same CTA pair as `/faq` and `/blog` (DEC-063 FQ-D4, DEC-066 BL-D5):

| Element | Proposed |
|---|---|
| Close H2 | **Want a second pair of eyes on this?** |
| Close body | Tell us what's happening with your marketing and what you've tried. We'll reply with an honest view — and if we're not the right fit, we'll say so. |
| Primary | **Tell us about your business** → `/contact` |
| Secondary | **Request a call** → `/schedule-call` |
| Related services line | "Related: {Service} →" (service names from `lib/services`) |

Alternative close H2 if the owner prefers reuse over new copy: the approved `/blog` close
"Reading about a problem you have?" with its approved body (zero new copy).

Proposed replacement for the Contentful "Book a Client Discovery Call (30 minutes)." (owner edits, §5):
**"Request a call and we'll get in touch to find a time."** linked to `/schedule-call` (matches the approved
`/schedule-call` description wording).

No new claims, numbers, durations or promises. "Free", "book", "review" and "strategy session" are not used.

---

## 5. Recommendations by workstream

Priority: **Must** (verified defect or governance conflict) · **Should** · **Could** · **Skip/Defer**.

### A. UI/UX and frontend (code; needs G1 → G2 approval)
| # | Change | Problem / evidence | Benefit | Complexity | Priority |
|---|---|---|---|---|---|
| A1 | Fix TOC anchors (shared slug fn, unique ids) | 126/126 links dead (`live-probe.json` `tocBroken`) | Navigation works; jump links usable by keyboard | Low | **Must** |
| A2 | Remove the newsletter section | Dead block on 7/7 | One less dead end | Low | **Must** |
| A3 | Replace in-body CTA + sidebar CTA + final band with one C+ close (§4.2) | 3 asks + duplicate, "Book a call" (DEC-062) | One clear next step; correct wording | Low–Med | **Must** |
| A4 | Reading column: 68ch measure, 17 px/1.7, C+ H2–H4 scale | TY1–TY3 | Easier reading; correct visual hierarchy | Med | **Should** |
| A5 | TOC: H2 only, sticky rail (wide), closed `<details>` (narrow) | TY4 (2,955 px before body on mobile) | Body starts within the first screen on mobile | Med | **Should** |
| A6 | C+ hero: breadcrumb, kicker meta, single date line | VD2, TY8 | Same site feel as `/blog` | Low | **Should** |
| A7 | Related services as named arrow links; drop sidebar duplicate and "Learn More" | Vague link text; duplicate | Clear, descriptive internal links | Low | **Should** |
| A8 | Tangerine 3 px focus ring on article controls | IX2 | Visible keyboard position | Low | **Should** |
| A9 | Remove dicebear fallback avatar | BD7; third-party request on every article | Credibility; one fewer external host | Low | **Should** |
| A10 | Demote "Table of Contents"/author/close headings so the body owns H2s | TY3 | Clean outline for SR and AI parsers | Low | **Should** |
| A11 | Related posts as C+ rows | VD2 | Consistency | Low | Could |
| A12 | Hairline C+ table style | VS2 | Comparison tables read well | Low | Could |

### B. Contentful content corrections (owner edits in Contentful; no code)
| # | Change | Evidence | Priority |
|---|---|---|---|
| B1 | Delete the editorial notes from the Facebook and SEO articles | BD1 | **Must (now — independent of design)** |
| B2 | Replace "Book a Client Discovery Call (30 minutes)" (SEO ×2, Facebook ×1 unlinked) with the §4.2 line | DEC-062, DEC-051 | **Must** |
| B3 | Confirm or remove the client list on the Facebook article (permission + accuracy) | BD2 | **Must** (O) |
| B4 | Remove/replace "Pune… 15 % in 2023" (or cite a Pune-level source); drop "guarantees" (perf vs digital); drop "This case demonstrates" | BD3, BD4 | **Must** |
| B5 | Fix quote attributions (email article) | BD6 | Should |
| B6 | Category clean-up to a small topic set mapped to services (e.g. SEO, Paid ads, Content, Conversion, Lead generation) | BD9 | Should (O) |
| B7 | Normalise heading levels in Contentful (one H2 per main section) | TY3 | Should |
| B8 | Rewrite stock excerpts/descriptions ("Boost Your Business Now", "MappedSkills gets results") | CL2 | Could |

### C. SEO and editorial (owner decisions; affect rankings)
| # | Decision | Notes | Priority |
|---|---|---|---|
| C1 | Future of the 3 Pune city-page articles: keep and correct · retitle to buyer guides ("How to choose an SEO company") · consolidate · unpublish with 301 | BD5. **Do not change slugs without a redirect plan** — they may hold search equity (traffic UNKNOWN; check Search Console before deciding) | **O** |
| C2 | Remove "Best" from the SEO article title/H1 | BD4 | Should (O) |
| C3 | Article 3 (career advice) — reframe for buyers or retire | CL3 | O |
| C4 | Editorial internal links from the 3 "approved omit" articles to relevant pages (e.g. content → `/seo` or `/ai-seo` where honest) | Internal linking | Could (needs owner mapping, BLOG-007 style) |
| C5 | Per-article `og:image` for the 2 articles falling back to the icon | `og:image` = `ms_icon.webp` | Could |

### D. Optional — skip or defer
Newsletter build; author pages; comments; reading-progress bar; scroll animations; hero images/illustrations;
category archives or filters; FAQ accordions/FAQPage schema (none of the articles uses the `faqs` field); related-post
algorithm changes; a real "last reviewed" workflow. **Skip** for this phase.

### Keep unchanged
All 7 URLs and canonicals; titles and descriptions (unless C-decisions change them in Contentful); Article,
BreadcrumbList (and conditional FAQPage) JSON-LD; `og:*`; ISR 60 s; `generateStaticParams`; `lib/contentful/*`
queries; `lib/blog-services.ts` mapping (BLOG-007/008); the HTTP 404 + `noindex` not-found branch; BLOG-012 internal
link behaviour; header/footer; analytics (no new events or `data-*`); the `/blog` listing.

---

## 6. Minimal implementation scope (if G1 and G2 are approved)

| File | Change |
|---|---|
| `app/(pages)/blog/[slug]/page.tsx` | Render a new `ArticleBody`; remove newsletter, `CTABlockFromType`, `StickySidebarCTA`, `CTASection` usage. Metadata, JSON-LD, `revalidate`, `notFound` unchanged. |
| `components/cplus/blog-article/ArticleBody.tsx` (new) | Hero, TOC (rail/`<details>`), body wrapper, related-services line, share, author, related posts, close (`ActionPair`, labels passed explicitly). |
| `components/cplus/blog-article/content.ts` (new) | Close copy, labels. |
| `components/cplus/blog-article/article.css` (new) | `ba-` scoped rules; body typography for `.blog-rich-text`; reduced-motion and forced-colors blocks. |
| `components/blog/RichTextContent.tsx` | Heading ids via a shared slug helper (de-duplicated); H4 renderer; class names moved to `ba-` CSS. |
| `lib/contentful/mappers.ts` | `extractTocFromDocument` uses the same slug helper; H2-only option. (Data shape unchanged.) |
| `lib/slug.ts` (new, tiny) | Shared `headingId()` used by both. |
| `components/blog/AuthorBio.tsx` | Remove dicebear fallback (or render initials). |
| `tests/blog-article.test.cjs` (new) | Every TOC href resolves to an element id; one H1; no "Book" label; no newsletter; close targets `/contact` and `/schedule-call`; JSON-LD and canonical unchanged; related-services map unchanged. |

Not touched: `CTASection`, shadcn `ui/*`, `EntryList`/`RouteHero`, `/blog` listing, Contentful model, APIs,
analytics, sitemap, dependencies. The now-unused `CTABlock`, `StickySidebarCTA`, `BlogNewsletterForm` files can stay
until a separate dead-code clean-up (owner choice).

Estimated size: ~4 new files, ~5 edited; comparable to the `/blog` G2.

---

## 7. Risks and dependencies

- **Heading ids change** (A1): any external deep link to an existing slug id (e.g. `#why-businesses-hire-an-seo-agency-in-pune`) keeps working only if the slug rule is preserved. Keep `slugify(text)` as the canonical id and change the TOC to match — **not** the other way round. `#section-N` links never worked, so nothing depends on them.
- **SEO:** template changes do not alter title, description, canonical, URL or JSON-LD. Heading **level** fixes (A10/B7) change the outline only. C1 (city pages) is the only change with real ranking risk; traffic data is **UNKNOWN** — check Search Console before deciding.
- **Content dependency:** the design cannot fix BD1–BD5. B1 and B2 should be done by the owner in Contentful regardless of G1 timing; they are live today.
- **D4 split:** the header and footer still say "Book a call" (DEC-062 D4 sitewide). Articles would say "Request a call" before the header does — the same state `/blog` and `/faq` are already in.
- **Local verification:** no Contentful credentials locally (DEC-063/066 notes); the G2 will need the repo's Contentful fixture preload with the 7 live documents, as the `/blog` G2 used.
- **GTM:** removing the sidebar and final band removes CTA elements that GTM may target by text or class; check E6 / GTM Preview (not done for this audit).
- **Rich text edge cases:** duplicate heading text (e.g. two "Conclusion" or "FAQs") needs suffixing to keep ids unique.
- **Evidence limits:** Chromium only for this audit; no real devices, screen readers, Safari/Firefox apps or GTM Preview.

---

## 8. GO / NO-GO

**GO for a G1 static mockup** of §4 (workstream A, A1–A10), built like the `/blog` G1 in `docs/blog-redesign/bl-d6/g1/`
using the live content of two contrasting articles (`seo-company-in-pune` — long, 40-item TOC, related service; and
`building-an-email-list` — short, no services), at 1440 / 768 / 375 / 320 px. No production source change.

**Not a redesign:** the hairline/ink C+ language, the existing data and every URL stay; the work is fix, remove,
consolidate and re-typeset.

### Owner decisions requested
| ID | Decision |
|---|---|
| BL-D6.1 | Approve direction §4 for a G1 mockup (Yes / changes) |
| BL-D6.2 | Close copy: new §4.2 copy **or** reuse the approved `/blog` close |
| BL-D6.3 | TOC behaviour: H2-only sticky rail + closed `<details>` on mobile (Yes / keep full list) |
| BL-D6.4 | Author: remove cartoon avatar (Yes); confirm the author's role/title and whether a real photo exists |
| BL-D6.5 | Contentful B1–B4 now, by the owner (Yes / defer) — B1 and B2 are live credibility and DEC-062 issues |
| BL-D6.6 | City-page articles C1: keep-and-correct · retitle · consolidate · unpublish + 301 (needs Search Console data) |
| BL-D6.7 | Category taxonomy B6 (approve a list) |

**Stopping here. Awaiting owner review; nothing implemented.**

---

### Appendix A — screenshots

| File | Shows |
|---|---|
| `screenshots/<slug>-1440-full.png`, `<slug>-375-full.png` | Every article, full page, desktop and mobile (14) |
| `screenshots/<slug>-1440-fold.png`, `<slug>-375-fold.png` | First screen of each (14) |
| `screenshots/m-fb-proof-editor-note.png` | BD1/BD2 — published editor note and client list (375 px) |
| `screenshots/seo-pune-discovery-call-link.png` | "Book a Client Discovery Call (30 minutes)" link + sidebar "Book a call" |
| `screenshots/seo-pune-toc-40-items.png`, `m-seo-pune-toc.png` | 40-item TOC, desktop and mobile |
| `screenshots/m-seo-pune-end-stack.png` | Mobile end stack: dead newsletter → sidebar CTA → related service |
| `screenshots/dead-newsletter-1440.png` | "Get More Growth Insights / There is no mailing list yet." |
| `screenshots/inbody-cta-1440.png`, `sidebar-1440.png`, `author-1440.png` | Legacy card components, cartoon avatar |
| `screenshots/toc-1440.png` | TOC (links whose targets do not exist) |
| `screenshots/m-fb-table.png` | Table scrolls in its own box at 375 px (no defect) |
| `screenshots/focus-*.png` | Keyboard focus on article buttons (50 % ink ring) |

### Appendix B — TOC defect (reproduction)
1. Open `https://mappedskills.com/blog/building-an-email-list`.
2. Click "3. Top 10 Benefits of Building an Email List".
3. URL becomes `#section-2`; `document.getElementById('section-2')` is `null`; the page does not move to the section
   (probe: `scrollY` goes from 0 to 73 px — the top of the page, not the section, which is far below).
Cause: `lib/contentful/mappers.ts` `extractTocFromDocument` (`id: section-${index}`) vs
`components/blog/RichTextContent.tsx` (`id={slugify(text)}`).
