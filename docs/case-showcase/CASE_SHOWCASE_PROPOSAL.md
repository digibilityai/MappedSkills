# Reusable case-study showcase: audit and proposal (pilot: /social-media-ads)

**Status:** PILOT BUILT LOCALLY on /social-media-ads and /seo (DEC-115; see pilot/IMPLEMENTATION_REPORT.md), awaiting owner visual review. Original status: PROPOSAL FOR OWNER APPROVAL. No application code, git history, Contentful or deployment was changed. Written here: this document, the static mockups and the screenshots in `docs/case-showcase/`.
**Date:** 2026-10-31 · **Baseline:** `MappedSkills-six-cases` on port 3500 (the local preview, which includes the unpublished case batches). `/work`, its cards and its layout are out of scope and untouched.

Open the mockups in a browser: `mockup/pilot-meta-ads.html` (the pilot), `mockup/seo-compact.html` (the compact /seo adaptation), `mockup/rollout-google-ads.html` (a rollout preview). They use the repository's own card images and fonts. Screenshots: `mockup/shots/` (every state at 1440, 390, 360). Current-page screenshots: `current/`.

---

## 1. Audit: where case studies appear today

Heights are measured on port 3500 (1440×900 / 390×844 / 360×800 where measured).

| Page | Case-study sections today | Cases | Height of those sections (1440 / 390 / 360) |
|---|---|---|---|
| `/social-media-ads` | **Two:** bespoke "Meta Ads work we have done" (`mr2-work`) **and** auto list "More Meta Ads case studies" (`RelatedCaseCards`) | Om Sai, Wanderlooms (no detail page), then 6 cards | 1,098 + 1,375 = **2,473** / 1,354 + 3,281 = **4,635** / 1,366 + 3,143 = **4,509** |
| `/google-ads` | **Two:** bespoke AnybodyCanBake (`ga3-work`) **and** "More Google Ads case studies" | ABC, then 7 cards | 884 + 1,907 = **2,791** / 1,279 + 3,791 = **5,070** / 1,391 + 3,655 = **5,046** |
| `/seo` | **One** composed proof section (the section built today) | ABC SEO, Ameba | **1,456** / 1,705 / 1,774 |
| `/who-we-help/d2c` | **Two:** bespoke Wanderlooms (unlinked) **and** "D2C and ecommerce case studies" | Wanderlooms, then 3 | 785 + 1,024 = **1,809** (1440) |
| `/who-we-help/education` | **Two:** bespoke ABC Google Ads **and** "More education and training case studies" | ABC Google Ads, then 6 (two more AnybodyCanBake cases, Meta and SEO, are in the list) | 812 + 1,591 = **2,403** |
| `/who-we-help/real-estate` | **Two:** bespoke Om Sai **and** "More real estate case studies" | Om Sai, then 1 | 785 + 1,092 = **1,877** |
| `/who-we-help/enquiry-led-businesses` | One: "Enquiry-led business case studies" | 5 cards | 1,589 |
| `/services` | One: "The work behind the offer" | ABC Google Ads, Om Sai | 719 |
| `/about` | One: "The work behind the offer" | ABC Google Ads, Om Sai | 1,144 |
| `/` (frozen homepage) | One: "Featured work" (links go to `/work`, not to case pages) plus a client-logo wall | Wanderlooms, Om Sai | 1,068 |
| `/work`, `/portfolio/[slug]` | excluded | | |

All other pages inspected (`/how-it-works`, `/pricing`, `/lead-generation`, `/conversion-optimization`, `/ai-seo`, `/problems/...`, `/faq`, `/contact`, `/schedule-call`, `/press`, `/research`, `/blog`) have no case-study section.

### Duplicates to consolidate (VERIFIED on port 3500)
- **Five pages carry two case sections** (the three above plus D2C, education, real estate). In each, a bespoke section is followed by the auto-populating list, so the same client can be shown in two designs, and the list repeats what the bespoke section featured (on education, AnybodyCanBake appears three times: Google Ads, Meta Ads and SEO).
- **The sections are tall:** on mobile, `/social-media-ads` spends 4,635 px and `/google-ads` 5,070 px on cases (about five and a half screens).
- **Wanderlooms** appears on three pages as an unlinked card with a visible "Conceptual artwork" badge and no detail page, so it fails the "clear detail-page link" rule.
- **Visible conceptual badges** appear on the bespoke sections ("Conceptual artwork. Not a photograph of the project.").
- **Card images already carry the headline figure** (for example "3,957 products sold" on Klenzmo). On narrow screens that baked-in text shrinks below readable size, so the live text under the card must carry the outcome (see §3).

### What the data supports (VERIFIED)
- Every published or preview case has a dedicated card image (1586×992, shown whole) except the code-drawn conceptual cards (Ameba, ClassPe, InsurYo), which have a logo and a drawn motif.
- **Production today:** Contentful (delivery API, read only) has **6 published studies**: ABC Google Ads, Om Sai, ClassPe, InsurYo, Ameba Software and the Home Decor SEO study. The 14 newer cases exist only in the local preview. So in production `/social-media-ads` has one Meta case (Om Sai) until the new ones are published. The component must therefore show **one, two or three cards and hide itself at zero**.
- **Evidence restrictions** (`lib/case-study-proof.ts`, `DEC-012`, `DEC-102`): Ameba and Home Decor figures, quotes and ratings stay withheld. ABC's Google Ads figures are approved and attributed; ABC's SEO figures are approved with a caveat.

---

## 2. Proposed design

One section per page: a dark **stage** inside the light page (the same inversion the hero stage uses), a one-line heading, two or three **image-led cards in one row**, and one "View all" action. Brand: THE RESOLVE tokens only (ink-deep ground, paper cards, tangerine accent, Bricolage Grotesque and Manrope), no gradients, no counters, no ambient motion.

**Card anatomy (top to bottom):** dedicated card image **shown whole** (never cropped) with the client's logo chip where the case has one → eyebrow (service · industry) → client name (H3) → **either** one approved outcome with its period **or**, where there is no approved figure, the approved one-line summary → one text link "Read the case study ↗" (the whole card is the link, one link per card, client name in the accessible name).

**Desktop (≥1081 px):** a three-column row of equal cards; two cases fill two columns and the third cell becomes the **single "View all" tile** (with the reading note where a page needs one); one case becomes one card plus the link. *In-page screenshots (real header, real neighbouring sections): `mockup/inpage/*-header-and-section.png`, plus `-fullpage` and `-inview`.*

**Mobile and tablet (≤1080 px):** a horizontal row of snap-scrolling cards, each 82% wide so the next card shows; Previous and Next buttons (44 px) and an off-screen "1 of 3" live region; never moves by itself. The "View all" link sits under the row.

**Drama, within the brand:** the dark stage makes the artwork the brightest thing on the page; one large heading with a tangerine phrase; generous space; images shown whole at full size. Interaction: the image eases to 1.035 scale and the border turns tangerine on hover (about 420 ms); a 3 px tangerine ring plus white border on keyboard focus; with reduced motion no scaling and instant scrolling.

**No visible conceptual badges** in the shared card. The accurate alt text stays on every image ("Conceptual artwork of…", "An illustrative scene of…"), and each case's own page keeps its disclosure. (Some supplied card artwork has its own tiny caption baked into the picture, for example "Illustrative learning scene" on AnybodyCanBake Meta. The supplied artwork is not edited.)

**Type floor:** essential text is 15 px or larger (period line 15 px, summaries 16 px, outcomes 18.4 px, client names 23 to 30 px). The only 12 px text is the uppercase eyebrow, the site's existing label size, and the section's own eyebrow.

### Target section heights (measured on the mockups)
| Page | 1440×900 | 390×844 | 360×800 | Today (1440 / 390 / 360) |
|---|---|---|---|---|
| `/social-media-ads` pilot (3 cards) | **760** (84% of the viewport) | **663** (79%) | **705** (88%) | 2,473 / 4,635 / 4,509 |
| `/seo` compact (2 cards + tile) | **781** (87%) | **778** (92%) | **779** (97%) | 1,456 / 1,705 / 1,774 |
| `/google-ads` rollout preview (3 cards) | **760** | **722** (86%) | **722** (90%) | 2,791 / 5,070 / 5,046 |

Targets for the build: **≤ 800 px at 1440×900, ≤ 760 px at 390×844 and ≤ 800 px at 360×800** (SEO ≤ 800 on mobile too). Nothing is clipped to reach them: every card is its natural height, and the largest contributors are the artwork at its own ratio and the 16 px body text. No horizontal page overflow at any width in the mockups.

---

## 3. Actual copy for the pilot (`/social-media-ads`)

Only approved wording is reused; **A** = existing approved text, **NEW** = new wording for approval.
- Eyebrow **NEW**: Client work · Meta Ads
- Heading **A**: Meta Ads work **we have done**
- View all **NEW**: View all Meta Ads case studies → `/work?service=social-media-ads`

| Card | Eyebrow | Name | Visible line | Period | Link |
|---|---|---|---|---|---|
| 1 | Meta Ads · Real estate | Om Sai Developer | **A:** "A Chembur developer that needed enquiries from people interested in its project." (no figure) | none | Read the case study ↗ |
| 2 | Meta Ads · D2C and ecommerce | Klenzmo | **A (headline wording):** "Meta Ads linked to 3,957 products sold." | September 2024 to March 2025 | Read the case study ↗ |
| 3 | Meta Ads · Education and training | AnybodyCanBake | **A (meta description):** "3,892 paid enrolments attributed to Facebook Ads." | September 2021 to October 2026 | Read the case study ↗ |

**Compact /seo adaptation (copy):** heading **NEW** "SEO work, **measured**" (alternative: the existing "Here is what changed, and how we measured it."); AnybodyCanBake: "46.15% more tracked organic course enquiries." with "91 to 133, May–July 2026 versus August–October 2026"; Ameba Software: "A B2B software company that wasn't being found in search for the solutions it sells." with "We do not publish figures for this engagement." The third cell: **View all SEO case studies** → `/work?service=seo`, with the reading note: "AnybodyCanBake compares two three-month periods. This is not proof that the work alone caused the change, and the figures have not been independently checked."
This keeps the lead figure and the caveat on `/seo`; the two supporting rows (clicks and nonbrand clicks) and the full evidence basis stay on the case page (see decision D2).

---

## 4. Proposed featured cases (2 to 3 per page, with relevance)

Chosen from the library, in this order of precedence: the page's own service or industry, then the segments the Brand DNA names (D2C and commerce, education, enquiry-led), then one case per segment. Each page also lists alternates so a case can swap without code.

| Page | Featured (in order) | Why | Alternates |
|---|---|---|---|
| `/social-media-ads` | Om Sai Developer; Klenzmo; AnybodyCanBake (Meta) | Real estate enquiries (published today), D2C purchases, education enrolments: the three buyer outcomes Meta Ads is judged on | Advit Prints, HutnHomes, Bakedemy, Libros |
| `/google-ads` | AnybodyCanBake (Google Ads); Meticulous Business Plan; Bakersville | The established flagship (approved figures, published), search to signed work, search to product sales | EKoching, Bakedemy, Phoenix Laundry, Bblewrap, Talreja & Talreja |
| `/seo` | AnybodyCanBake (SEO); Ameba Software | The two SEO cases; ABC measured to enquiries, Ameba described without figures | none |
| `/who-we-help/d2c` | Klenzmo; Bakersville; Advit Prints | The three ecommerce cases (Meta, Google, Meta) | none |
| `/who-we-help/education` | AnybodyCanBake (Google Ads); EKoching; Bakedemy (Meta) | Search and social, three different education businesses (three different businesses, not one client three times) | AnybodyCanBake (Meta, SEO), Bakedemy (Google), ClassPe |
| `/who-we-help/real-estate` | Om Sai Developer; HutnHomes | The only two real-estate cases | none |
| `/who-we-help/enquiry-led-businesses` | Meticulous Business Plan; Phoenix Laundry; Talreja & Talreja | Signed work from enquiries; new customers for a local service | Bblewrap, Libros |

**Selection rule for the build:** the page's preferred list in order, skipping any case that is not published; then fill from the library by the page's service or industry (`relatedStudies`, existing) up to three; hide at zero. Nothing is listed by hand per case in the component.

---

## 5. /work filtering: what exists and what the link needs

Inspected `components/b2/WorkLibrary.tsx`, `lib/case-study-library.ts` and ran each URL on port 3500.

| View-all link | Result today (checked) |
|---|---|
| `/work?service=social-media-ads` | filters to 7 (Om Sai, ABC, Klenzmo, HutnHomes, Advit, Libros, Bakedemy) |
| `/work?service=google-ads` | 8 |
| `/work?service=seo` | 2 (Ameba, ABC) |
| `/work?industry=education` | 7 |
| `/work?industry=real-estate` | 2 |
| `/work?industry=ecommerce-retail` | 3 |
| `/work?industry=professional-services` | 3 (of 5 enquiry-led cases) |
| `?service=seo&industry=education` | 1 (parameters combine; the URL is written back in the same form) |
| `?service=bogus` | ignored; the full library shows (safe) |

The query string is `service` (route without the slash) and `industry` (a sector key), with `q` and `p`; this is existing, shareable behaviour and **needs no change for the pilot**. The canonical stays `/work`. Existing filters, search and pagination are untouched, because the link sets only one parameter and filtered results page through `p` as before.

**Identified separately, none of it required for the pilot, none of it done:**
- **F1, enquiry-led pages have no single filter.** "Local services" and "Online Library" have no sector key, so `?industry=professional-services` would miss two of the five. Interim: that page's "View all" goes to `/work` with the label "View all case studies". Proper fix: a small filter-support addition in the library (for example an `audience` parameter). That touches `/work` code, so it needs its own approval.
- **F2, filter controls need seven published studies.** `CONTROLS_MIN_STUDIES = 7`. In production today (6 published studies) the controls are not rendered and a filter link lands on the unfiltered library. It works once 7 or more are published, and it never errors.
- **F3, the filter is applied after the page loads.** The server HTML is always the unfiltered first twelve; the filter applies in the next frame, so a visitor can see a brief unfiltered view and no-script visitors see all studies. A server-side filtered render would fix it but changes `/work`, which is excluded.
- **F4, naming.** The `/work` filter calls the service "Social media ads"; our link says "Meta Ads". The destination is correct; the label differs.

---

## 6. Component proposal (not built)

`<CaseShowcase>` (server) + a very small client part for the two buttons and the live region. Replaces `RelatedCaseCards` and the bespoke sections on the pages in §4; `WorkCard` and `/work` stay as they are (the showcase card is a separate component, so /work cannot change).
- Props: `id`, `heading: [plain, accent]`, `eyebrow`, `service?` / `audience?`, `preferred: href[]`, `exclude?`, `viewAll: { label, href }`, `note?`, `tone?`.
- Data: the published library (as `/seo`'s proof loader does), the card image slot already defined for each case, and a **per-case showcase record** `{ outcome?, period? }` added to `lib/case-study-presentation.ts` from the approved wording above. Cases with withheld proof (`lib/case-study-proof.ts`) cannot receive an outcome, and a test will enforce it.
- Behaviour: 0 cases hides the section; 1 shows one card; 2 shows a pair and the "View all" tile; 3 shows a trio; the row scrolls below 1081 px; no automatic movement; reduced motion respected; no new counters or ambient animation.
- Tests: the markup, accessible names, outcome-only-where-approved, no visible conceptual badge, alt text kept, `/work` link parameters valid, section hidden at zero.

**Rollout order after pilot approval:** (1) `/social-media-ads` (pilot, visual approval); (2) `/google-ads` and `/seo`; (3) the four `/who-we-help` pages. Nothing rolls out before the pilot is visually approved.

---

## 7. Decisions needed

| ID | Decision | Recommendation |
|---|---|---|
| D1 | **Wanderlooms** has no case page, so it cannot use a showcase card (every card needs a detail link). Drop it from `/social-media-ads` and `/who-we-help/d2c`? (The frozen homepage keeps it.) | Yes |
| D2 | **/seo:** accept the compact version, where the two supporting rows (organic clicks, nonbrand clicks) and the long evidence note move to the case page, and `/seo` keeps the 46.15% lead, 91 → 133, the period and the short caveat? | Yes, to meet one viewport. Alternative: keep the current 1,456 px stage |
| D3 | Include **/services** and **/about** (each has a two-case "work behind the offer" section) in the rollout, and leave the frozen **homepage** alone? | Include /services and /about after the pilot; leave the homepage |
| D4 | **Enquiry-led page:** interim "View all case studies" to `/work`, until a filter-support change (F1) is separately authorised? | Yes |
| D5 | **Revised after the in-page check:** a dark stage collides with a dark neighbour. On `/social-media-ads` the scene before it is dark and on `/seo` the scene before it is dark. So the component takes a **tone**: dark stage where the neighbours are light, **light variant** (paper ground, ivory cards with a rule) where a neighbour is dark. Both pilot pages use the light variant. Accept a tone prop chosen per page? | Yes |

**Not done and not authorised:** application code, commit, push, Contentful change, publication, deployment. The pilot, the other pages and the filter work all wait for your approval.
