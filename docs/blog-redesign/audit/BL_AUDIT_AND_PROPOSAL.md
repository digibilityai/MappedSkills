# /blog · UX, Visual Design & Conversion Audit + One Design Direction (2026-10-20)

**Status:** audit and proposal only. No code, content, CMS entry or production data changed. Nothing committed, pushed or deployed.
The approved `/faq` (DEC-063) is used as the design reference only; it does **not** authorise any change to the blog.

**Inputs read:** `CURRENT_STATE.md`, `DECISION_LOG.md` (`origin/main` @ `e67dffc`: DEC-005, DEC-051, DEC-062, DEC-063),
`SERVICE_ARCHITECTURE.md`, `docs/faq-redesign` G1 notes, the `/blog` and `/blog/[slug]` source on `origin/main`, the live site.

**Brand DNA:** no standalone Brand DNA file exists in the repository (UNKNOWN location). It is cited in earlier redesign notes
(`about-redesign/g1/AB_G1_NOTES.md`, `lead-generation-redesign/g1/LG_G1_DECISIONS.md`). Brand checks below use DEC-005,
DEC-051 item 5, the THE RESOLVE tokens and the approved `/faq` as the working proxy.

**Evidence (screenshots kept outside Git; decisions recorded in DEC-066):** `screenshots/` (Playwright Chromium against production, 1440 / 768 / 375 px, `*-full.png` and
`*-fold-with-banner.png`) and `live-probe.json` (computed styles, headings, links, JSON-LD, overflow, console errors).
Consent was neither accepted nor declined.

---

## 1. Architecture (VERIFIED FACT)

| Item | Finding |
|---|---|
| Content source | **Contentful** (GraphQL) via `lib/contentful/posts.ts` → `getBlogListPosts()`. Not WordPress, not local files. ISR `revalidate = 60`. |
| Listing route | `app/(pages)/blog/page.tsx` — `RouteHero` + `CommercialSection` + `EntryList` (Session 29 "Phase G" Resolve primitives, **not** the C+ shell `/faq` uses). |
| Shared components | `EntryList` and `RouteHero` (`components/routes/primitives.tsx`) are also used by `/press`, `/research`, `/research/[slug]`, `/work` and `app/not-found.tsx`. **Changing them changes those routes.** |
| Data available to the list | slug, title, excerpt, category, readingTime, publishedDate, href, author. Reading time is fetched but not shown. |
| Article route | `app/(pages)/blog/[slug]/page.tsx` — legacy shadcn components in `components/blog/*` (BlogHero, TableOfContents, RichTextContent, CTABlock, StickySidebarCTA, RelatedPosts, RelatedServices, AuthorBio, FAQSection, SocialShare) and `BlogNewsletterForm`. |
| Published articles | **7**, all in `sitemap.xml`; all show "July 16, 2026". |
| SEO on `/blog` | Title "Writing \| MappedSkills"; description "Pieces on why websites receive visits and not enquiries…"; canonical `/blog`; `index, follow`; JSON-LD: Organization only. |
| SEO on articles | Own title/description/canonical; `og:type article`; JSON-LD Article + BreadcrumbList (+ FAQPage when the CMS `faqs` field is filled — none of the 7 have it). |
| Dead code | `components/cards/BlogCard.tsx` is imported nowhere. |

> `CURRENT_STATE.md` still records "/blog renders *No articles found*" (Session 05). That is **out of date**: production
> now publishes 7 articles. Recommend a state-doc correction when the owner next authorises documentation changes.

---

## 2. Current-state audit (seven dimensions)

Labels: **V** = verified problem (measured or observed) · **S** = subjective design judgement.

### 2.1 Visual design (THE RESOLVE)
| # | Finding | Type | Evidence |
|---|---|---|---|
| VD1 | Correct base identity: ivory `#F7F3EC` ground, ink `#141219`, Bricolage Grotesque H1 (62 px, 800), Manrope body. No off-brand colours. | V (positive) | `live-probe.json` blog@1440 |
| VD2 | **Left edge misaligned with the header.** Listing content starts ≈52 px from the edge at 1440; the header logo starts ≈98 px and `/faq` content ≈156 px. The page reads as a different site from `/faq`. | V | `blog-1440-full.png` vs `faq-1440-fold-with-banner.png` |
| VD3 | The "ARTICLES" label floats alone at the far right of the list at ≥1081 px (`CommercialSection mode="reverse"`), labelling nothing next to it. | V | `blog-1440-full.png` |
| VD4 | No tangerine anywhere in the main content, no breadcrumb, no H1 emphasis — the FAQ's signature moves (tangerine "named" phrase, ink-framed shapes, 3 px ink rule) are absent. | V (inconsistency) / S (whether it matters) | screenshots |
| VD5 | Page ends directly in the footer; no closing section (every C+ page has one). | V | `blog-1440-full.png` |

### 2.2 UI/UX
| # | Finding | Type | Evidence |
|---|---|---|---|
| UX1 | **Hover gives no feedback.** Computed styles of a row link are identical before and during hover (colour, background, decoration). | V | hover probe (Appendix) |
| UX2 | Focus ring is present (3 px) but at 50 % ink opacity — weaker than the FAQ's 3 px tangerine. | V | hover probe |
| UX3 | Meta column wraps mid-date at 1440/768 ("EMAIL MARKETING · JULY / 16, 2026"). | V | `blog-1440-full.png` |
| UX4 | Every row shows the same date (July 16, 2026), so the date column carries no information; reading time (useful, already fetched) is not shown. | V | probe text |
| UX5 | No horizontal overflow at 1440/768/375; no text under 12 px; 0 console errors; row targets 139–192 px tall. | V (positive) | probe |
| UX6 | H1 "Writing" vs nav "Blog" vs article breadcrumb "Blog" — three labels for one place. | V | probe |
| UX7 | Category filtering/search: **not needed** at 7 articles. | S | — |

### 2.3 Customer language
| # | Finding | Type |
|---|---|---|
| CL1 | **The lede is false for the content that exists.** "A deliberately small set of pieces on two subjects: why websites receive visits and not enquiries, and how buyers are finding suppliers through AI-assisted search." The 7 articles cover content marketing, email lists, content writing, performance vs digital marketing, real estate, SEO in Pune and Facebook ads — none is about AI-assisted search. The meta description repeats the same claim. | V |
| CL2 | "Where something rests on a measurement we ran, it links to the measurement" — internal-voice, and no article links to a measurement. | V (no link found) / S (tone) |
| CL3 | Excerpts (CMS content) use generic agency phrasing: "Unlock the potential…", "Boost Your Business Now", "MappedSkills gets results". Not the FAQ's plain voice. | V (text) / S (tone) |

### 2.4 Visual storytelling
| # | Finding | Type |
|---|---|---|
| VS1 | No imagery on the listing. Featured images are **not reliable enough to add**: of 7 articles, 3 have a specific image, 2 share a generic `blog-details-img.webp`, 2 fall back to the site icon (`og:image`). Thumbnails would look uneven and partly fake. | V |
| VS2 | Real storytelling opportunities are inside articles (e.g. a performance-vs-digital comparison), not on the index. Out of scope here. | S |

### 2.5 Conversions
| # | Finding | Type |
|---|---|---|
| CV1 | **The listing has no route to a service or to contact** other than the global header/footer. A reader who scrolls the list hits the footer. | V |
| CV2 | Article pages over-correct: up to five CTAs (in-body CMS link, CTABlock, sticky sidebar, Related Services, final CTASection) plus a dead newsletter section. | V (`art-*-1440-full.png`) |

### 2.6 Brand DNA / positioning / accuracy
| # | Finding | Type |
|---|---|---|
| BD1 | Listing lede and meta description misdescribe the content (CL1). | V |
| BD2 | Several articles are city-page / generic-agency SEO pieces ("Best SEO Company in Pune", "Facebook Advertising Agency in Pune", "Content Marketing Services in Pune"). `SERVICE_ARCHITECTURE.md` lists "scaled location or city-page SEO" and "content-volume production" as explicitly excluded, and DEC-005 rejects "full-service digital marketing agency" positioning. **Content decision for the owner, not a design problem.** | V (text) — owner decision |
| BD3 | Category taxonomy is inconsistent: 6 categories for 7 posts, mixing topic (PPC), industry (Real Estate) and format (Insights); "Best SEO Company in Pune" is filed under "Content Marketing". | V |
| BD4 | Article `/blog/seo-company-in-pune` body says "Book a Client Discovery Call (30 minutes)" (twice). DEC-062: nothing may imply an appointment is booked; DEC-051: no unconfirmed operational facts (30-minute duration is not confirmed). CMS content. | V |
| BD5 | Article sidebar button "Book a call" (`StickySidebarCTA.tsx`) — the D4 sitewide relabel (DEC-062 item 5) is still pending. | V |
| BD6 | Author role hard-coded as "Performance Marketing Strategist"; "performance marketing" is rejected company-level positioning (DEC-005 §14). Owner to confirm the person's title. | V (text) / owner check |

### 2.7 Animation
| # | Finding | Type |
|---|---|---|
| AN1 | Row links have a 150 ms colour transition declared, but nothing changes on hover (UX1), so there is no perceptible feedback. | V |
| AN2 | Reduced motion is respected globally (`app/globals.css` sets transitions to 0.01 ms); confirmed 1e-05 s on rows with `reducedMotion: reduce`. | V (positive) |

---

## 3. Article-page dependencies (two+ articles inspected)

Inspected: `/blog/performance-marketing-vs-digital-marketing`, `/blog/seo-company-in-pune`, `/blog/building-an-email-list` (1440/768/375).

**The proposed listing work needs no change to any article component.** It touches only `/blog/page.tsx` and new
blog-scoped files. `EntryList` / `RouteHero` must **not** be edited (shared with five other routes).

Verified article issues (recorded, **not** proposed for this phase — no wholesale article redesign):
- Heading outline: H3 "Table of Contents" precedes the first H2; H4s follow H3s; CTA blocks add extra H2/H3s; the sidebar's H3/H4 come after the footer-adjacent sections in DOM order.
- Dead section: H2 "Get More Growth Insights" followed by "There is no mailing list yet."
- Legacy look (rounded cards, pill badges, shadcn buttons) vs C+ — a brand-consistency gap, but large in scope.
- 40-item table of contents on the SEO article.
- BD4, BD5, BD6 above.

Recommended for a **separate, small, owner-approved change** (not part of this proposal): remove the dead newsletter
section; apply the already-decided D4 relabel ("Request a call"); owner edits BD4 in Contentful.

---

## 4. Recommended direction: "Plain guides, one list"

The `/faq` C+ shell and tokens applied to the blog index, with the existing hairline-row archetype kept (no card grid,
no thumbnails, no filters). One idea: **the list is the page** — make each row clearly clickable, tell the reader what
they'll get and how long it takes, then offer one honest next step.

### 4.1 Proposed customer-facing copy (all subject to owner approval)

| Element | Live | Proposed |
|---|---|---|
| Breadcrumb | — | Home / Blog |
| Kicker | WRITING | BLOG |
| H1 | Writing | Marketing guides, **written plainly.** (tangerine on "written plainly.") |
| Lede | A deliberately small set of pieces on two subjects… + measurement line | Practical reads on search, ads, content and turning website visits into enquiries — for business owners deciding what to do next. |
| List label | ARTICLES (floating right) | 7 guides (count from data, left, above the rule) |
| Row meta | CATEGORY · JULY 16, 2026 | CATEGORY · 6 min read |
| Row action | — | "Read" + arrow box (visual; the whole row is the link) |
| Close H2 | — | Reading about a problem you have? |
| Close body | — | Tell us what's happening with your marketing. If we're not the right fit, we'll say so. |
| Close CTAs | — | **Tell us about your business** → `/contact` · **Request a call** → `/schedule-call` (same pair as `/faq`, FQ-D4) |
| Meta description | Pieces on why websites receive visits… | Practical guides on search, paid ads, content and turning website visits into enquiries, written for business owners. |
| Title | Writing \| MappedSkills | **Owner choice:** keep, or "Blog: Practical Marketing Guides \| MappedSkills" |

"If we're not the right fit, we'll say so" reuses approved `/faq` close wording. No new claims, numbers or promises.

### 4.2 Layout specification

Breakpoints as `/faq` (Brand DNA): narrow ≤760, medium 761–1080, wide ≥1081. Container `px-wrap` (same gutter as `/faq` and the header).

```
WIDE (≥1081)                                              NARROW (≤760)
┌────────────────────────────────────────────────┐        ┌────────────────────┐
│ Home / Blog                                     │ ground │ Home / Blog        │
│ BLOG                                            │        │ BLOG               │
│ Marketing guides,                               │        │ Marketing guides,  │
│ written plainly.  (tangerine)                   │        │ written plainly.   │
│ Lede (max 46ch)                                 │        │ Lede               │
├────────────────────────────────────────────────┤        ├────────────────────┤
│ 7 GUIDES                                        │ paper  │ 7 GUIDES           │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3px ink   │ ━━━━━━━━━━━━━━━━━━ │
│ CATEGORY   │ Title (Bricolage 700, 46ch)  │ [→] │        │ CATEGORY · 6 MIN   │
│ 6 min read │ Excerpt (dim, 58ch)          │     │        │ Title              │
│────────────┼──────────────────────────────┼─────│ 1px    │ Excerpt            │
│ …7 rows, CMS order (unchanged)                  │        │ Read →             │
├────────────────────────────────────────────────┤        ├────────────────────┤
│ Close (b-close, ink): H2 + body | two CTAs      │ ink    │ H2, body, CTAs     │
└────────────────────────────────────────────────┘        └────────────────────┘
```

- **Wide:** grid `minmax(0,3fr) minmax(0,8fr) 48px`; meta column no longer wraps mid-date (short meta).
- **Medium:** same three columns, meta column narrower; arrow box kept.
- **Narrow:** single column; meta on one line above title; arrow box replaced by an inline "Read →" (≥44 px target).
- Hero at wide: single column (no right-hand topic list — 6 uneven categories of 1–2 posts would add noise, see 4.3).

### 4.3 Category presentation
Plain text label on each row only. **No** category navigation, filter or archive URLs (none exist today; adding them is an open IA/SEO question recorded in `CURRENT_STATE.md`: "do not build both a parameter and a path"). Recommend the owner tidy the Contentful categories first (BD3); a topic list in the hero can be reconsidered at ~15+ articles.

### 4.4 Illustration treatment
None on the list (VS1: images are inconsistent). The visual interest comes from type, the ink rule and the arrow box — the same means `/faq` uses. If the owner wants one graphic element, reuse the FAQ's line-glyph style (2 px ink stroke, `aria-hidden`) in the close only. Optional, Skip by default.

### 4.5 Typography, colour, spacing (existing tokens only)
- H1 `b-h1` (Bricolage 800, `clamp(2.4rem, 1rem + 3.6vw, 4.6rem)` as `faq-h1`), named span `b-named` (tangerine).
- Row title Bricolage 700 `clamp(1.125rem, 1.02rem + .35vw, 1.3125rem)` (= `faq-q`); excerpt Manrope 1.0625rem/1.6 `--dc-dim`.
- Meta: Manrope 700, `--dc-t-label`, `.12em` tracking, uppercase, `--dc-dim`.
- Colours: `--dc-ground` hero, `--dc-paper` list, `--dc-ink` rules/close, `--dc-tang` for the H1 phrase and open/hover events only; `--dc-tang-small` for small arrows (contrast-safe).
- Rules: 3 px ink top rule, 1 px `--dc-line` between rows. Row padding `clamp(20px, 2.4vw, 32px)` block.

### 4.6 Hover, focus, reduced motion
- Hover (150 ms ease): row background → `--dc-ground`, padding-inline 4 → 12 px (as `.faq-d > summary:hover`); title underline colour → tangerine; arrow box fills ink with paper arrow.
- `:focus-visible`: 3 px `--dc-tang` outline, 2 px offset (as FAQ).
- `prefers-reduced-motion: reduce`: scoped rule removes all `bl-` transitions (the global rule already does; the scoped rule matches the FAQ pattern).
- `forced-colors`: arrow box uses `CanvasText` border.
- No sticky elements, no scroll reveals, no JavaScript.

---

## 5. Recommendations (classified)

| # | Change | Problem / evidence | Visitor benefit | Complexity | Priority |
|---|---|---|---|---|---|
| R1 | Replace the hero lede (and meta description) with accurate copy | CL1/BD1 — the page promises two subjects the articles don't cover | Knows what's here; trust | Low | **Must** |
| R2 | Visible hover + tangerine focus on rows | UX1, UX2, AN1 | Clear that rows are clickable; keyboard users see position | Low | **Must** |
| R3 | One close section with the FAQ CTA pair | CV1, VD5 | A next step without hunting the header | Low | **Must** |
| R4 | Move `/blog` into the C+ shell (`CplusPage`, `px-wrap`, breadcrumb, kicker, H1 with named phrase) | VD2, VD4, UX6 | Same site feel as `/faq`; aligned edges | Medium | **Should** |
| R5 | Reading time instead of the identical date on rows | UX3, UX4 | Useful decision info; no wrapping | Low | **Should** |
| R6 | Remove the floating "ARTICLES" label; count label above the rule | VD3 | Cleaner scan | Low | **Should** |
| R7 | H1 "Marketing guides, written plainly." (kicker "Blog") | UX6; H1 "Writing" says nothing | Clear purpose | Low (SEO approval needed) | **Should** |
| R8 | Title change | — | Marginal | Low | Skip unless owner wants it |
| R9 | Thumbnails, category filter, search, pagination, newsletter | VS1, UX7; 7 articles | None now | — | **Skip** |
| R10 | Article page hygiene (dead newsletter block, D4 relabel) | §3 | Fewer dead ends | Low | Should — **separate approval** |
| R11 | Contentful content fixes (BD2–BD4, excerpts CL3, categories BD3) | §2.6 | Accurate, on-brand content | Content work | Owner decision, outside design |

### Keep unchanged
URL `/blog` and all 7 article URLs; canonical; `index, follow`; Organization JSON-LD; article metadata, Article/BreadcrumbList/FAQPage JSON-LD; Contentful as source; `getBlogListPosts()` and its query; ISR 60 s; CMS order of posts; sitemap; the hairline-row (not card-grid) archetype; the empty-state behaviour (no placeholders when 0 posts); header/footer; consent and analytics (no new events, `data-*` hooks or `dataLayer` pushes); `EntryList`/`RouteHero` and every route that uses them; all article components.

---

## 6. Minimal implementation scope (if approved later)

| File | Change |
|---|---|
| `app/(pages)/blog/page.tsx` | Wrap in `CplusPage`; render new `BlogBody`; metadata description (if R1 approved); keep `revalidate = 60`, data call and empty state. |
| `components/cplus/blog/BlogBody.tsx` (new) | Hero (reuses `Breadcrumb`), list, close (reuses `ActionPair` from `direction-c/primitives` with "Tell us about your business" / "Request a call", as `/faq`). |
| `components/cplus/blog/content.ts` (new) | Copy strings. |
| `components/cplus/blog/blog.css` (new) | `bl-` scoped rules only (not `fx-`/`faq-`); reduced-motion and forced-colors blocks. |
| `tests/blog-page.test.cjs` (new) | One H1, list count = data count, hrefs unchanged, metadata/canonical, close CTA destinations, empty state renders no rows. |

No dependency, CMS model, API, backend, analytics or shared-component change. Empty state: keep today's honest copy, restyled in the shell (wording to confirm).

---

## 7. Risks and dependencies
- **SEO:** H1 and description changes alter how `/blog` is presented in search (low traffic risk; needs explicit owner approval per DEC-051).
- **Content mismatch persists:** even with accurate copy, BD2 (city-page / generic articles) remains a positioning issue only the owner can resolve; the redesign does not fix it.
- **Visual split:** a C+ listing next to legacy-styled articles makes the article gap more visible (R10/R11 reduce it).
- **Close label:** the shared `Close` component still uses "Book a call"; the blog close must pass labels explicitly (as `/faq` does) until D4 lands.
- **Hover probe method:** Chromium only, computed styles. Firefox/WebKit, real devices, VoiceOver/TalkBack and GTM Preview not run for this audit.
- **Build:** local builds have no Contentful credentials (`/blog` renders empty locally per DEC-063 notes); verification of a prototype needs the CMS fixture or production data.
- **Dependencies:** owner approval of copy (R1, R7, close), of the description, and of which recommendations proceed.

## 8. GO / NO-GO

**GO for a design prototype (G1 mockup)** limited to R1–R7, built as a static mockup in `docs/blog-redesign/` like the FAQ G1, with no production source change.

Conditions: owner approves (or edits) the copy in §4.1; R8–R11 stay out of the prototype; the article page is not
redesigned. Owner decisions requested:

| ID | Decision |
|---|---|
| BL-D1 | Approve direction §4 for prototyping (Yes / changes) |
| BL-D2 | Hero copy: H1 + lede as proposed, or edits |
| BL-D3 | Meta description change (Yes / keep) and title (keep / change) |
| BL-D4 | Rows show reading time instead of date (Yes / keep date / both) |
| BL-D5 | Close section copy and CTA pair as `/faq` |
| BL-D6 | Separately: article hygiene R10 and the content review R11 — schedule or defer |

**Stopping here. Awaiting owner approval; nothing implemented.**

---

### Appendix: hover / focus probe (Chromium, production, 1440 px, first row link)
| State | link bg | title colour | underline colour | outline |
|---|---|---|---|---|
| Rest | transparent | rgb(20,18,25) | rgb(222,214,200) | none |
| Hover | transparent | rgb(20,18,25) | rgb(222,214,200) | none |
| Keyboard focus | transparent | rgb(20,18,25) | rgb(222,214,200) | 3 px solid ink @ 50 % |
| Reduced motion | transition 1e-05 s | — | — | — |
