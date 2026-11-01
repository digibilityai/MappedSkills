# Brand DNA 4.0: site-wide compliance audit and implementation plan

**Status:** audit and plan only, 1 November 2026. No code, CMS content, URL, redirect or production change was made. Nothing committed. Awaiting owner review before any implementation.
**Scope:** every live route on mappedskills.com, audited against Brand DNA 4.0 revision 4 (DEC-118).

## 0. How to read this report

Evidence labels follow `CLAUDE.md`:

| Label | Meaning here |
|---|---|
| **VERIFIED FACT** | Measured in a browser on the live site this session, read from `main` source, or read from `DECISION_LOG.md` on `main` |
| **APPROVED DECISION** | Recorded in `DECISION_LOG.md` |
| **WORKING HYPOTHESIS** | A heuristic measurement or an inference that needs a human visual check |
| **UNKNOWN** | Not tested in this session |

Rule references (A1 to A14, D-01 to D-13) point to `docs/brand-dna/v4/BRAND_DNA_4_PROPOSAL.md`.

## 1. Phase A: canonical design authority

| Check | Finding | Label |
|---|---|---|
| Brand DNA 4.0 rev 4 | Found at `docs/brand-dna/v4/BRAND_DNA_4_PROPOSAL.md` (and `.pdf`). Identical copies (same MD5) in this checkout and in `../MappedSkills-brand-dna4`. **The file is not on `main`**: it exists only as an untracked file. | VERIFIED FACT |
| Approval | DEC-118 on `main`: rev 3 approved 1 November 2026 with four corrections (rev 4). Direction only; every implementation batch needs its own authorisation. OPEN items: D-04 values, D-06 card wording, D-09 punctuation (site-wide), D-11, D-12 H4/H5 roles. | APPROVED DECISION |
| Extends | Brand DNA 3.0 (owner's external file, not in repo) and DEC-091 conventions in `docs/resolve-sitewide/TYPOGRAPHY_AND_HEADLINE_CONVENTIONS.md` (on `main`). Both read. | VERIFIED FACT |
| Release | DEC-118 RELEASED: PR #73 (`92f3c38`) merged as `9104107`, run 41331688993, live BUILD_ID `lWidGu5WxuRhQExTiwjVO`. Rollback BUILD_ID `_pWpnXMkHfVZIUzx1uK7N`. | APPROVED DECISION |
| Canonical `main` | `bed50b6fe2b3e274eae2ff6c1a840ff7663e0af0` (PR #74, DEC-118 release record). `9104107..bed50b6` changes only `docs/00-project/DECISION_LOG.md`, so live code equals `main` code. | VERIFIED FACT |
| Visual reference | The deployed homepage (THE RESOLVE R3 plus the DEC-118 refinements). Used as the reference for tokens and rules, not as a layout to copy. | APPROVED DECISION |
| Frozen designs that constrain this plan | Google Ads R4.1, Meta Ads R2.2, D2C R1.1, Education R2B, Real Estate R2.1, Enquiry-Led R1.1 (DEC-085); How We Work (DEC-087); About (DEC-088); /work and case studies (DEC-089, DEC-108); /seo (DEC-092, scoped by DEC-105); /ai-seo (DEC-094); /lead-generation (DEC-096); /conversion-optimization (DEC-098); editorial (DEC-109, DEC-112, DEC-113); case showcase (DEC-115, DEC-116). DEC-118 says D-03 (type floors) "changes frozen pages slightly" and is to be applied page by page. | APPROVED DECISION |

**Blocker check:** none. The specification exists and was read in full. One housekeeping risk: the spec that DEC-118 names as its reference is not version-controlled (see OD-01).

## 2. Method and limits

- **Live crawl (VERIFIED):** 64 URLs (52 from the live sitemap plus 12 probes) fetched with curl: status, title, canonical, robots, description length, OG image, H1 to H6 counts and skips, JSON-LD types, long dashes in body text.
- **Browser audit (VERIFIED):** built-in browser, computed styles, at **1440 x 900** (all 33 unique templates), **1280 x 720** (11 heroes), **390 x 844** (32 templates) and **360 x 800** (8 high-risk templates). Measured: horizontal overflow, clipped text, text under 12 px, caption-like text under 14 px, off-palette text colours, section ground sequence and heights, viewport-tied minimum heights, H1 font and position, dual-tone emphasis phrase and colour per H1/H2, primary CTA label/colour/height/position, tap targets under 44 px.
- **Source reads (VERIFIED):** route files on `main`, component imports per route, CSS for the confirmed defects.
- **Limits (UNKNOWN):**
  - The browser pane was hidden, so IntersectionObserver reveals did not fire. Screenshots under-show animated content, and text still waiting for its entrance animation was excluded from counts. The counts are therefore lower bounds.
  - Consent banner not tested: a stored consent choice in the browser profile suppressed it, and it was not cleared.
  - Not run: reduced-motion emulation, motion timing, keyboard focus walk, screen reader, Safari, Firefox, real devices.
  - Line length is a heuristic (paragraph width divided by half an em), labelled WORKING HYPOTHESIS.

## 3. Deliverable 1: route and template inventory

### 3.1 Route groups

| Group | Routes (live status) | Count |
|---|---|---|
| Sitemap, indexable, 200 | 22 static pages + 7 blog articles + 20 case studies + 1 report + 1 benchmarks hub + 1 press release | 52 |
| Live, not in sitemap | `/privacy-policy`, `/terms` (noindex, nofollow); `/thank-you` (noindex, nofollow); `/portfolio/seo-for-home-decor-brand` (noindex, follow, DEC-089); `/work/page/2` (index, follow, self-canonical); `/contact?intent=call` (canonical `/contact`) | 6 |
| Redirect | `/contact/call` 308 to `/contact?intent=call` (DEC-071) | 1 |
| 404 by design | `/launch-checklist` (internal, gated by `ENABLE_INTERNAL_PAGES`); `/portfolio` (DEC-091 open question); `/work/page/3` | 3 |
| Non-page routes | `/work/index.json`, `/api/enquiry`, `/sitemap.xml`, `/robots.txt` | 4 |

The "59 prerendered pages" (DEC-118) is a build count. It is not the number of unique templates: those 59 pages render through **33 templates**, listed below.

### 3.2 Unique templates

| ID | Template (component on `main`) | Pages | Approval state |
|---|---|---|---|
| T01 | Homepage (`resolve-home-r3`) | `/` | DEC-085 frozen, DEC-118 refined. **Reference.** |
| T02 | Services hub (`paid-advertising/services`) | `/services` | Live; no Brand DNA 4.0 review recorded |
| T03 | Google Ads (`google-ads-r41`) | `/google-ads` | Frozen R4.1 (DEC-085) |
| T04 | Meta Ads (`meta-ads-r22`) | `/social-media-ads` | Frozen R2.2 (DEC-085) |
| T05 | D2C (`d2c-r1`) | `/who-we-help/d2c` | Frozen R1.1 |
| T06 | Education (`education-r2`) | `/who-we-help/education` | Frozen R2B |
| T07 | Real Estate (`real-estate-r2`) | `/who-we-help/real-estate` | Frozen R2.1 |
| T08 | Enquiry-Led (`enquiry-led-r11`) | `/who-we-help/enquiry-led-businesses` | Frozen R1.1 |
| T09 | SEO (`cplus/seo`) | `/seo` | DEC-092, redesign DEC-105 |
| T10 | AI search (`cplus/ai-seo`) | `/ai-seo` | Frozen DEC-094 |
| T11 | Lead generation (`cplus/lead-generation`) | `/lead-generation` | DEC-096 |
| T12 | Conversion optimisation (`cplus/conversion-optimization`) | `/conversion-optimization` | DEC-098 |
| T13 | Problem page (`cplus/traffic`, Direction C shell) | `/problems/traffic-but-no-enquiries` | DEC-072 era; never aligned to RESOLVE |
| T14 | How We Work (`b2/HowItWorks`) | `/how-it-works` | DEC-087 |
| T15 | About (`b2/About`) | `/about` | DEC-088 |
| T16 | Pricing (`pricing-r2`) | `/pricing` | Preserved for targeted QA only (DEC-091) |
| T17 | FAQ (`b2/Faq`) | `/faq` | Preserved for targeted QA only (DEC-091) |
| T18 | Contact (shared layout, two intents) | `/contact`, `/contact?intent=call` | DEC-071 |
| T19 | Thank you (`b2/Contact` ThanksB2) | `/thank-you` | C+ design |
| T20 | Work library (`b2/Work`) | `/work`, `/work/page/2` | DEC-108 |
| T21 | Case study detail (`case-study/*`, CMS) | 20 listed + 1 unlisted | DEC-089, DEC-107, DEC-117 |
| T22 | Blog index (`cplus/blog`) | `/blog` | DEC-109, DEC-112 |
| T23 | Blog article (`cplus/blog-article`, CMS) | 7 articles | DEC-109, DEC-112 |
| T24 | Research index (`cplus/research`) | `/research` | DEC-109, DEC-112 |
| T25 | Research report (`cplus/research-report`, CMS) | `/research/marketing-measurement-gap-indian-business-websites` | DEC-112, DEC-113 |
| T26 | Research category hub (same `[slug]` route) | `/research/industry-benchmarks` | Not separately approved |
| T27 | Press index (`cplus/press`) | `/press` | DEC-109 |
| T28 | Press release (`cplus/press-release`, CMS) | 1 release | DEC-109 |
| T29 | Legal (legacy `Container`/`Section`/`ui/card`) | `/privacy-policy`, `/terms` | DEC-086 direction recorded, not implemented |
| T30 | 404 (`app/not-found.tsx`) | all unknown URLs | Phase G |
| SC1 | Shared header and mobile menu (`direction-c/SiteHeader`) | all pages | DEC-069, DEC-091 |
| SC2 | Shared footer (`direction-c/SiteFooter`) | all pages | DEC-086 |
| SC3 | Case showcase (`case-showcase`) | `/google-ads`, `/social-media-ads`, `/seo`, four audience pages | DEC-115, DEC-116 |

## 4. Deliverable 2: Brand DNA 4.0 compliance matrix

### 4.1 Site-wide results that apply to every row (VERIFIED)

- **Pass everywhere:** no horizontal overflow at 1440, 390 or 360; exactly one H1 on every 200 page; no skipped heading levels; Bricolage Grotesque 800 headings and Manrope body on every template (`dcDisplay` is a second self-hosted copy of the same Bricolage file); every image in `main` has an `alt` attribute; self-referencing canonicals on indexable pages.
- **Fail everywhere, including the homepage:** the shared footer group labels (`.dc-ftr-h`, "Services", "Who We Help" and so on) render at **11.5 px**, below the 12 px label floor (A3, D-03). The desktop header Services panel label (`.dc-hdr .dc-label`, `.74rem`) is **11.8 px**.

Status key: **Pass** meets every A14 item checked; **Partial** has defects that a scoped fix resolves without redesign; **Fail** needs structural change; **Unverified** was not checked to an evidence standard. Priority: **P1** affects the core buying journey or many pages; **P2** a single commercial page or a cross-site consistency issue; **P3** cosmetic, editorial or legal. Approval: **G** design-direction decision needed; **F** touches a frozen design (owner visual approval); **S** scoped fix under existing direction (batch authorisation only); **C** content or SEO decision.

### 4.2 Matrix

| ID | URL | T | Status | Specific violations (evidence) | Recommended correction | SEO / conversion risk | Pri | Appr |
|---|---|---|---|---|---|---|---|---|
| P01 | `/` | T01 | Partial | Only the shared footer label (11.5 px). Main content: 0 text under 12 px at 1280. CTA fits the first screen at 1440 (765) and 1280 (708 of 720). | Fix in SC2. Do not reopen homepage decisions. | None | P1 (shared) | S |
| P02 | `/services` | T02 | Partial | 20 labels under 12 px (`.pa-eyebrow` 11.5, badges 11.5, table `v` 11); captions `figcaption` 12.5, `.x2-illus` 12, `.sx-note` 13.1. H1 emphasis is the product names "Google Ads and Meta Ads." (A4.1: outcome, not product). Every H2 is dual-tone, including "A few questions before we talk". 5 paragraphs exceed 72ch (WORKING). Generic OG image. | Type floors; single-colour FAQ heading; H1 emphasis "the right customers" (copy approval). | Low; H1 text unchanged if only colour moves | P1 | S + C |
| P03 | `/google-ads` | T03 | Partial | 23 labels under 12 px (`.ga4-lane-lbl` 11, `DT` 11.2, `.ga4-js-who` 11); `.ga4-cap` 12.8. Emphasis "we have done" (showcase H2) and "before we talk" (FAQ H2) are not outcomes. 6 adjacent ground changes correct; no Ink Deep pair. Showcase "View all" link 21 px tall at 390 (27 at 1280). Em dash in meta description and JSON-LD only. | Type floors; SC3 heading single-colour; FAQ H2 single-colour; target height. Hero, H1, labels unchanged (DEC-085). | None if titles and H1 kept | P1 | F (scoped) |
| P04 | `/social-media-ads` | T04 | Partial | 14 labels under 12 px (`DT` 11.5, `.mr1-js-who` 11, `.mr22-card-k` 11.8); captions `.mr22-note` 13.6, `.mr1-cap` 12.8. Same showcase and FAQ emphasis issue. "View all" 21 px. | As P03. | None | P1 | F (scoped) |
| P05 | `/who-we-help/d2c` | T05 | Partial | 14 under 12 px (`.d2c1-chan`, `.d2c1-plat` 11.5, receipt label 11.8). Showcase and FAQ emphasis. "View all" 21 px. | Type floors; SC3 and FAQ heading fixes. | None | P1 | F (scoped) |
| P06 | `/who-we-help/education` | T06 | Partial | 18 under 12 px (`.edr2-tag`, `.edr2-chan`, `.edr2-plat` 11.5); `.edr2-cap` 13.1. Showcase and FAQ emphasis. | As P05. | None | P1 | F (scoped) |
| P07 | `/who-we-help/real-estate` | T07 | Partial | 9 under 12 px (`.rer2-tag` 11.5). Showcase and FAQ emphasis. "View all" 21 px. | As P05. | None | P1 | F (scoped) |
| P08 | `/who-we-help/enquiry-led-businesses` | T08 | Partial | 15 under 12 px (`.e11-ask-l` 11.5, `.e11-plat` 11.8). Showcase and FAQ emphasis; "Five choices shape every enquiry" emphasises "shape every enquiry" (weak contrast). | As P05. | None | P1 | F (scoped) |
| P09 | `/seo` | T09 | Fail | Hero and closing band use `min-height: calc(100svh - 77px)` (`components/cplus/seo/seo.css:8,31`): viewport-tied heights (A6, DEC-111). 15 under 12 px; `figcaption` 12.5. CTA "Tell us what you're trying to fix" (not an A11 label; not Title Case). "03 [em dash] SEO case studies" eyebrow uses an em dash; showcase period "May [en dash] July 2026" uses en dashes. Closing band is the only ending; generic OG. | Remove the fold minimum heights (natural height); type floors; replace dashes; CTA label decision (OD-05). | Low; H1 and metadata unchanged | P2 | F |
| P10 | `/ai-seo` | T10 | Fail | Four sections tied to the viewport (`--ai-fold`, `ai-seo.css:31`). 34 under 12 px (most on the site): `.ax-q-k` 11, `.ax-tl` 11.5, `.ax-ind-n` 11.5. Industry tab "Manufacturing" clipped at 390 and 360. `.px-cap` 13. No dual-tone on 2 of 8 H2s; emphasis phrases run to six words. Same CTA label as P09. Description 194 characters. | Natural heights; type floors; fix the clipped tab; CTA decision. | Low | P2 | F |
| P11 | `/lead-generation` | T11 | Fail | Four viewport-tied sections (`--lg-fold`); at 390 they measure 779 px each, so mobile is also tied (A6 says mobile flows). Closing band emphasis colour `#FFD6BA` (`lead-gen.css:214`): not an A2 colour, and A4.3 requires white only on the closing band. H1 32 px at 390 (reference 40 px). 18 under 12 px; `.px-cap` 13. | Natural heights; closing H2 white; type floors. | Low | P2 | F |
| P12 | `/conversion-optimization` | T12 | Fail | Four viewport-tied sections (`--co-fold`). Label "So, a new website?" in `#FF9A62` (off-palette). 16 under 12 px; `.px-cap` 13. H1 32 px at 390. | As P11; recolour the label to `#FF5B04` on dark. | Low | P2 | F |
| P13 | `/problems/traffic-but-no-enquiries` | T13 | Fail | Direction C shell, not RESOLVE: light hero, no hero CTA (first CTA at 3,152 px at 1440, 3,604 px at 390). Primary pill is Ink `#141219`, 60 px tall (A11: Tangerine Deep, 52 px). `.px-cap` 13. Commercial-page recipe (A10): no proof, no fit and cost, CTA only at the end. | Re-template on RESOLVE section shell: dark hero with CTA, keep copy and checks, closing band. | Medium: organic problem-intent entry page with a weak path to `/contact` | P2 | G |
| P14 | `/how-it-works` | T14 | Partial | 38 under 12 px (highest after pricing): "You ask" labels 11, H4 "We do / You do / You receive" 11.2 (H4 rendered as a label; D-12 open); `figcaption` 12.5, `.b2-cap`/`.b2-note` 13. H2 emphasis colour `#A83400` on light (A4.3 says `#D94400` for display). | Type floors; H4 role per D-12; emphasis colour per OD-03. Story and hero unchanged (DEC-087). | None | P2 | F (scoped) |
| P15 | `/about` | T15 | Partial | 23 under 12 px (`.ab-field-k` 11, `.ab-ch` 11.5); `figcaption` 12.5, WorkCard note `.rs-wc-note` 12.5. Emphasis `#A83400` on light. Title "About MappedSkills \| Our Approach", description 93 characters. Team profiles still owed (memory: placeholders). | Type floors; emphasis colour per OD-03. | Low | P2 | F (scoped) |
| P16 | `/pricing` | T16 | Partial | 39 under 12 px (most labels on any page: `.prr-fig-q`, `.prr-plan-k`, `DT` 11.5); `small` 12.8, `.prr-cap` 13.6. Hero primary is Tangerine `#FF5B04` with Ink text, **48 px** tall (A11: Tangerine Deep, 52 px). The four summary cards are H2s ("Fixed monthly fee" and so on), so 11 H2s compete. Emphasis `#A83400` on light; "Asked before you choose a plan" emphasises "you choose a plan" (not an outcome). Off-palette text `#CDC6D8` (14 instances, on dark). | Button to the shared primary; cards to H3; type floors; emphasis fixes. Prices unchanged. | Medium: pricing is a decision page; button change is low risk | P1 | S + F |
| P17 | `/faq` | T17 | Partial | `.pa-eyebrow` 11.5; 12 FAQ answers measure over 72ch at 1440 (WORKING). Category chips are 44 px pills styled like primary buttons (Paper fill), which competes with A11's single primary. Description 212 characters. | Answer measure to 64ch; chips as secondary style; eyebrow 12 px. | Low | P3 | S |
| P18 | `/contact`, `?intent=call` | T18 | Partial | Only footer and header labels fail. Button labels "Send enquiry" and "Request a call" are not Title Case (A9). Call hint "weekdays 2 [en dash] 5 PM" uses an en dash. Small form links 20 to 27 px tall at 390. | Title Case labels (copy approval, DEC-071 owns copy); dash; target heights. | Low; form IDs and events must not change | P2 | C |
| P19 | `/thank-you` | T19 | Pass with note | Neutral state on direct visit is by design. CTA "Tell us what you're trying to fix ↗" (OD-05). | None beyond OD-05. | None | P3 | none |
| P20 | `/work`, `/work/page/2` | T20 | Partial | `.wk-close-k` 11.8. H1 emphasis `#A83400`. Closing CTA "Contact us" (not A11). "Showing 1 [en dash] 12" and the page 2 title "Work [en dash] page 2 \| MappedSkills" use en dashes. Title "Work \| MappedSkills" is weak. `/work/page/2` is indexable but absent from the sitemap. | Label floor; CTA label; dashes; title is a metadata decision (DEC-085 D1 preserves titles). | Low | P2 | S + C |
| P21 | 20 case studies (`/portfolio/*`) | T21 | Partial | Per page: 13 to 18 under 12 px (`.ct-chip`, `.ct-spot-k`, `DT` 11). H1 emphasis is the trailing phrase, not the outcome ("1,410 paid enrolments **attributed to Google Ads**"), on every study. Period chip and fact row use en dashes ("Feb 2020 [en dash] Aug 2021"). Closing CTA labels vary by study: "Discuss Your Advertising", "Discuss Your Google Ads Goals", "Discuss Your Meta Ads Goals". Links 29 px tall at 390. No BreadcrumbList JSON-LD although a visual breadcrumb shows (other pages have one). Hero is a light logo band then a dark stage (DEC-089 approved). | Template fixes once, all 20 pages: type floors; emphasis on the figure; "Apr 2026 to Sep 2026" formatter; one CTA rule (OD-06); BreadcrumbList node (C). No CMS write needed for any of these. | Low; H1 text and titles unchanged | P1 | F (template) + C |
| P22 | `/portfolio/seo-for-home-decor-brand` | T21 | Partial | As P21; closing CTA "Contact us". Unlisted, noindex (DEC-089). | Inherits the template fix. | None | P3 | S |
| P23 | `/blog` | T22 | Partial | Intro copy contains an em dash ("enquiries [em dash] for business owners"); a card excerpt from the CMS contains one too. Title "Writing \| MappedSkills". Buttons "Read the article", "Tell us about your business" not Title Case. Emphasis `#A83400` on light is the approved editorial treatment (A4.5). | Replace the code-side dash; casing per OD-07. | Low | P3 | S + C |
| P24 | 7 blog articles | T23 | Partial | Template passes the type floors (0 in main). **Content:** legacy CMS bodies use long dashes (27 on the real-estate article; 3; 1); titles lack the brand suffix and use superlatives or hype that A9 bans ("Best SEO Company in Pune", "Boost Your Business Now", "7 Proven Strategies", "FB & Insta Ads Experts"). Closing CTA is an Ink pill (A11: Tangerine Deep). | CMS editorial pass (needs Contentful authorisation); CTA style; title policy decision. | **High SEO risk if titles change:** these are the site's ranking articles. Change only with search evidence. | P3 | C |
| P25 | `/research` | T24 | Partial | **Two Ink Deep sections adjacent** (hero 678 px, then 942 px dark) (A5). Description em dash in metadata only. Title "MappedSkills Research". | Insert a Ground band or make the second section Paper (OD-04: editorial is approved). | Low | P3 | F |
| P26 | Research report | T25 | Partial | Two Ink Deep sections adjacent (952 + 832 px). H1 runs 8 lines at 390 and 1280; at 1280 x 720 the H1 ends at 771 px, below the first screen, with no hero CTA (A6 preference only). `.rr-barcap-k` 12 px (caption or label: to classify). Breadcrumb links 22 px. Text colour `rgba(20,18,25,.82)` (117 instances; an alpha of Ink, not a token). | Ground fix as P25; classify the bar caption; target heights. H1 is CMS. | Low | P3 | F |
| P27 | `/research/industry-benchmarks` | T26 | Fail | Thin hub: H1 "Industry Benchmarks", one report card, no introduction, no CTA, no closing band. Title "Industry Benchmarks" has no brand; description 47 characters. | Add a two-sentence intro and closing path; metadata decision. | Medium: indexable thin page | P2 | C |
| P28 | `/press` | T27 | Partial | Hero CTA at 816 px (1440) and 792 px (1280 x 720): below the first screen at 1280 (preference only). Buttons not Title Case. "2025 [en dash] 2026" en dash. | Dash; casing per OD-07. | Low | P3 | S |
| P29 | Press release | T28 | Partial | Dateline "PUNE, INDIA [em dash] MappedSkills..." and "2025 [en dash] 2026" (dashes in CMS body). H1 6 lines at 390. | CMS edit (dateline colon) needs Contentful authorisation; press convention is OD-07. | Low | P3 | C |
| P30 | `/privacy-policy`, `/terms` | T29 | Fail | Legacy shell: light only, no RESOLVE rhythm, legacy link styles (`text-accent`, targets 23 to 39 px), 10 and 15 paragraphs over 72ch (WORKING). Title suffix "\| MappedSkills Marketing" differs from the site. DEC-086 recorded "restrained Resolve styling for legal pages without content change" but nothing was built. | Restrained RESOLVE legal template, no wording change, robots unchanged. | None (noindex) | P3 | G |
| P31 | 404 | T30 | Partial | No primary CTA; H2 "The capabilities". 404s raised inside dynamic routes (`/work/page/3`, invalid `/research/*`, `/launch-checklist`) ship no H1 in the server HTML, so without script the page is blank (A14.8). 404 copy has an em dash. | Add a primary "Discuss Your Advertising" and a Ground/Ink rhythm; dash; investigate the streamed not-found (tech). | Low | P3 | S |
| P32 | Header and mobile menu | SC1 | Partial | Services panel label 11.8 px. Header CTA "Discuss Your Advertising" is consistent site-wide. Mobile menu not walked by keyboard (UNKNOWN). | `.dc-label` to `.75rem`. | None | P1 | S |
| P33 | Footer | SC2 | Fail | Group labels 11.5 px on all pages. | `.dc-ftr-h` to `.75rem`. | None | P1 | S |
| P34 | Case showcase | SC3 | Partial | H2 pattern "X work we have done" emphasises "we have done" (D-10: the homepage made the work heading single-colour). Period line uses en dashes. "View all" link 21 px tall at 390. Eyebrow "03 [em dash] " on `/seo` uses an em dash. | Single-colour heading; "to" in periods; 44 px target; plain eyebrow. One component, seven pages. | None | P1 | F (DEC-116 component) |
| P35 | Consent banner | shared | Unverified | Not shown in this session. Known limitation: banner over the homepage CTA at 1280 x 720 (DEC-085, DEC-118). | Re-test with a clean profile in the implementation QA. | Conversion | P2 | none |

## 5. Deliverable 3: site-wide design inconsistency register

| # | Inconsistency | Where (evidence) | Rule | Root cause | Fix location |
|---|---|---|---|---|---|
| R01 | Labels under 12 px | 24 of 33 templates; worst `/pricing` 39, `/how-it-works` 38, `/ai-seo` 34 at 1440. Editorial templates already pass (DEC-112). | A3, D-03 | Each page family set its own label size (.69 to .74rem) | Per page family CSS plus SC1, SC2 |
| R02 | Explanatory captions under 14 px | `figcaption` 12.5 (services, seo, how-it-works, about, case detail); `.px-cap` 13 (four supporting services, problems); `.b2-cap`/`.b2-note` 13; `.ga4-cap`, `.mr1-cap` 12.8; `.edr2-cap`, `.sx-note` 13.1; `.prr-cap`, `.mr22-note` 13.6; `.rs-wc-note` 12.5 | A3, D-03 | Same | Per family |
| R03 | Viewport-tied section heights | `/seo` (2), `/ai-seo`, `/lead-generation`, `/conversion-optimization` (4 each), `calc(100svh - 77px)` | A6, DEC-111 | These pages were frozen before DEC-111 | Four page CSS files |
| R04 | Emphasis on non-outcomes | "before we talk" (FAQ H2 on 7 pages, single-colour on the homepage); "we have done" (showcase on 6 pages); case H1 trailing phrase (20 pages); services H1 product names; pricing "you choose a plan" | A4.1, A4.4, D-10 | Phrase chosen by position, not meaning | SC3, case template, page copy |
| R05 | Two emphasis colours on light grounds | `#D94400` (homepage, ads, audiences, supporting services) vs `#A83400` (how-it-works, about, work, pricing, editorial) | A4.3 | B2 and pricing families used the small-text token for display | OD-03 |
| R06 | Off-palette colours | `#FFD6BA` (lead-gen closing band), `#FF9A62` (CRO label), `#CDC6D8` (pricing on dark), `rgba(20,18,25,.82)` (report body). Platform mock-up colours (Google blue and so on) are exempt (A3). | A2 | Local values | Page CSS |
| R07 | Primary button variants | Homepage standard: Tangerine Deep, white, 52 px. Variants: Tangerine with Ink text, 48 px (`/pricing`); Ink pill, 60 px (`/problems`); Ink pill (blog articles, report); Paper pill on light (FAQ chips) | A11, A12 | Pre-RESOLVE components | Shared button style per family |
| R08 | CTA labels | A11 set: "Discuss Your Advertising / Google Ads / Meta Ads", "Discuss Property Advertising". Also live: "Tell us what you're trying to fix" (5 pages), "Contact us" (2), "Discuss Your Google Ads Goals" and "Discuss Your Meta Ads Goals" (case studies), "Tell us about your business" (blog), "Talk to MappedSkills" (research), sentence-case buttons on contact, blog, press, research | A9, A11 | Each batch wrote its own | OD-05, OD-06, OD-07 |
| R09 | Long dashes in rendered copy | Code: case periods (all 20 studies and 6 showcase pages), `/work` count, page 2 title, `/seo` eyebrow, `/blog` intro, 404, call-form hint. CMS: blog bodies, press dateline, report and press "2025 [en dash] 2026" | A9 | Date formatter and copy | `lib` formatter plus copy; CMS needs authorisation |
| R10 | Adjacent Ink Deep sections | `/research`, research report | A5 | Editorial hero followed by a dark figures stage | OD-04 |
| R11 | Tap targets under 44 px | Showcase "View all" 21 px; breadcrumbs 22 px; editorial `ed-link` 27 px; case links 29 px; legal links 23 px | A12 | Inline-styled links | SC3, breadcrumb, editorial CSS |
| R12 | Legacy shells | `/problems` (Direction C), `/privacy-policy`, `/terms` (pre-RESOLVE) | A1, A5, A11 | Never migrated | New templates |
| R13 | Metadata gaps | 37 of 64 fetched pages share the generic OG image `ms_icon.webp` (all case studies and the report have their own); weak titles (`/work`, `/blog`, `/research`, benchmarks); no brand suffix on 7 blog titles and benchmarks; legal suffix "MappedSkills Marketing"; case pages lack BreadcrumbList JSON-LD; `/work/page/2` indexable but not in the sitemap | Brand DNA quality area 10 | Per-route metadata | OD-08 (DEC-085 D1 preserves live titles) |
| R14 | Mobile H1 scale | 40 px reference; 32 px on lead-gen, CRO, blog article, press release, legal; 29.6 px on 404 | A3 (DEC-091 allows approved variants) | Family clamps | Low priority; only with family batches |

## 6. Deliverable 4: prioritised implementation roadmap

Principles: fix shared components once; group frozen pages so each owner visual review covers one family; never change URLs, canonicals, titles, H1 text, form fields, event names or JSON-LD unless an OD approves it; one PR per batch; deploy per batch through the existing dispatch workflow with its rollback BUILD_ID recorded.

### B0. Governance (docs only)

- **Included:** commit `docs/brand-dna/v4/BRAND_DNA_4_PROPOSAL.md` (and `.pdf`) to `main` so DEC-118's reference is versioned; record the OD answers below as a DEC entry.
- **Acceptance:** file on `main`; DEC entry lists the approved ODs.
- **PR boundary:** documentation only.

### B1. Shared chrome and shared components (P1)

- **Pages:** all 59 through SC1 and SC2; SC3 on `/google-ads`, `/social-media-ads`, `/seo` and four audience pages.
- **Changes:** footer `.dc-ftr-h` and header `.dc-label` to 12 px; showcase H2 single-colour, period "Apr 2026 to Sep 2026", "View all" 44 px target, `/seo` eyebrow without a dash; one shared date-range formatter.
- **Reusable components:** `direction-c/SiteFooter`, `SiteHeader`, `case-showcase`.
- **Responsive verification:** 1440, 1280, 390, 360 on `/`, `/google-ads`, one audience page; footer wrapping at 360.
- **SEO protections:** no link, text or order change in header or footer; showcase links unchanged.
- **Acceptance:** 0 header or footer text under 12 px on every route; showcase headings single-colour; no long dash in showcase output; homepage visually unchanged except the footer labels.
- **PR boundary:** shared CSS and the showcase component plus their tests. No page component edits.

### B2. Core services and the services hub (P1)

- **Pages:** `/google-ads`, `/social-media-ads`, `/services`, `/pricing`.
- **Changes:** label and caption floors in `google-ads-r41`, `meta-ads-r22`, `paid-advertising/services`, `pricing-r2`; FAQ H2 "A few questions before we talk" single-colour (matching the homepage); pricing primary button to the shared primary (Tangerine Deep, white, 52 px); pricing summary cards to H3; pricing emphasis fixes; services H1 emphasis per OD-09.
- **Reusable:** shared button and label classes, not new tokens.
- **Responsive:** all four widths; pricing plan table at 360; the services H1 at 360 (5 lines).
- **SEO protections:** frozen H1s, titles, FAQPage and Service JSON-LD unchanged; FAQ text unchanged so FAQPage stays in sync.
- **Acceptance:** A14 items 1 to 3, 6, 9 and 10 pass; owner visual approval of each frozen page.
- **PR boundary:** four page families; one PR.

### B3. Industry pages (P1)

- **Pages:** the four `/who-we-help/*` routes.
- **Changes:** label and caption floors (`.d2c1-*`, `.edr2-*`, `.rer2-*`, `.e11-*`); FAQ H2 single-colour; review "shape every campaign" and "shape every enquiry" emphasis (OD-09).
- **Responsive:** 1440, 1280, 390, 360; the DEC-085 contrast fixes on illustration captions are re-checked after resizing.
- **SEO protections:** frozen H1s (DEC-085 D1) and JSON-LD unchanged.
- **Acceptance:** 0 labels under 12 px in `main`; captions at least 14 px; owner visual approval.
- **PR boundary:** four audience components only.

### B4. Case-study template and portfolio (P1)

- **Pages:** 21 `/portfolio/*` pages, `/work`, `/work/page/2`.
- **Changes:** chips, fact labels and spot labels to 12 px; H1 emphasis moves to the figure or outcome (template rule, OD-10); period formatter shared with B1; one closing CTA rule (OD-06); `/work` label floor, "Showing 1 to 12", page 2 title without an en dash, closing CTA; add BreadcrumbList JSON-LD to case pages (OD-08).
- **Reusable:** `case-study` template, `b2/Work`.
- **Responsive:** three representative studies (long H1, short H1, unlisted) at all four widths; `/work` filters at 360.
- **SEO protections:** DEC-117 content gate, eligibility and `UNLISTED_CASE_STUDY_IDS` unchanged; titles and H1 text unchanged; no CMS write.
- **Acceptance:** every study passes A14 items 1 to 3 and 7; no long dash in rendered case pages.
- **PR boundary:** template and `/work` only.

### B5. Supporting services and the problem page (P2)

- **Pages:** `/seo`, `/ai-seo`, `/lead-generation`, `/conversion-optimization`, `/problems/traffic-but-no-enquiries`.
- **Changes:** remove the four `--*-fold` minimum heights (natural height, DEC-111); type floors; lead-gen closing H2 white; CRO label to `#FF5B04`; fix the clipped `/ai-seo` industry tab; CTA label per OD-05. Problems page re-templated on the RESOLVE section shell per OD-11, keeping its copy, checks and metadata.
- **Responsive:** all four widths; confirm the scene animations still read once heights are natural; check `/ai-seo` tabs at 360.
- **SEO protections:** URLs, H1s, metadata and BreadcrumbList unchanged.
- **Acceptance:** no section with a viewport-based minimum height; A14 items 1 to 3, 6 and 8.
- **PR boundary:** five page families; split the problems page into its own PR if OD-11 approves a re-template.

### B6. Company pages (P2)

- **Pages:** `/how-it-works`, `/about`, `/faq`, `/contact` (both intents), `/thank-you`.
- **Changes:** type floors; H4 role per D-12; emphasis colour per OD-03; FAQ answer measure and chip styling; contact button casing and the call-hint dash (OD-07); contact target heights.
- **SEO and conversion protections:** form fields, IDs, `lead_form_submitted` event, `/api/enquiry`, DEC-071 intents, DEC-114 focus guard and `/thank-you` noindex unchanged.
- **Acceptance:** A14 items 1 to 3 and 9; a test enquiry is not required because the form is unchanged.
- **PR boundary:** b2 company components and contact CSS only.

### B7. Editorial, legal and utility (P3)

- **Pages:** `/blog`, `/research`, research report, `/research/industry-benchmarks`, `/press`, press release, `/privacy-policy`, `/terms`, 404.
- **Changes:** adjacent dark sections per OD-04; `/blog` intro dash; benchmarks intro and closing path (OD-08); legal pages on a restrained RESOLVE template without wording change (OD-12); 404 primary CTA and rhythm; streamed not-found investigation; editorial target heights.
- **CMS items (separate authorisation, not in the code PR):** blog body dashes, press dateline, blog title policy.
- **SEO protections:** blog slugs and titles unchanged unless OD-08 approves with search evidence; legal pages stay noindex; Report and NewsArticle JSON-LD unchanged.
- **PR boundary:** editorial CSS and legal template; CMS work is an owner-run Contentful step.

**Recommended order:** B0, B1, B2, B3, B4, B5, B6, B7. B1 first because the footer defect touches every page, the homepage included, and the showcase and formatter changes are reused by B2 to B5. B2 and B3 can share one owner review session.

## 7. Deliverable 5: open decisions requiring owner approval

| ID | Decision | Recommendation | Blocks |
|---|---|---|---|
| OD-01 | Commit the Brand DNA 4.0 spec to `main` | Yes, docs-only PR | B0 |
| OD-02 | Apply D-03 type floors to the frozen designs (DEC-085, DEC-087, DEC-088, DEC-092 to DEC-098) | Yes, family by family, each with a visual review | B2 to B6 |
| OD-03 | One display-emphasis colour on light grounds | `#D94400` for H1 and H2 emphasis (A4.3) on how-it-works, about, work and pricing; keep `#A83400` for editorial (A4.5) | B2, B4, B6 |
| OD-04 | Adjacent Ink Deep sections on `/research` and the report | Make the second section Paper or Ground; or record an editorial exception | B7 |
| OD-05 | CTA label "Tell us what you're trying to fix" on supporting services, `/work`, thank-you | Keep it as the supporting-service label but in Title Case ("Tell Us What You're Trying to Fix"), or change to "Discuss Your Advertising" | B5, B6 |
| OD-06 | Case-study closing CTA labels | One rule by service: "Discuss Your Google Ads" or "Discuss Your Meta Ads" (A11); "Discuss Your Advertising" otherwise | B4 |
| OD-07 | Title Case on editorial and contact buttons | Title Case everywhere (A9), including "Send Enquiry" and "Request a Call" | B6, B7 |
| OD-08 | Metadata changes | Allow: BreadcrumbList on case pages; brand suffix and description on benchmarks; `/work/page/2` sitemap or noindex decision; page-specific OG images. Defer blog title rewrites until search data supports them. DEC-085 D1 otherwise stands. | B4, B7 |
| OD-09 | Copy for emphasis-only fixes | Services H1 emphasis "the right customers"; audience "shape every..." headings single-colour | B2, B3 |
| OD-10 | Case-study H1 emphasis rule | Emphasise the figure and outcome ("1,410 paid enrolments") | B4 |
| OD-11 | `/problems/traffic-but-no-enquiries` | Re-template on RESOLVE with a hero CTA, keeping copy and URL | B5 |
| OD-12 | Legal styling | Implement the DEC-086 "restrained Resolve" direction; no wording change | B7 |
| OD-13 | Long dashes in date ranges | Treat en dashes as long dashes (A9); write "Apr 2026 to Sep 2026" | B1, B4 |
| OD-14 | Still open from DEC-118 | D-04 motion values, D-09 punctuation site-wide, D-11, D-12 H4/H5 roles | B2 to B6 |

## 8. Evidence register

**VERIFIED (this session, 1 November 2026):**
- Git: `main` `bed50b6`; `9104107..bed50b6` touches only `DECISION_LOG.md`; the spec is untracked; worktree copy identical.
- Live crawl: status, metadata, headings, JSON-LD and dashes for 64 URLs.
- Browser: computed-style measurements at 1440, 1280, 390 and 360 as cited per row.
- Source on `main`: `seo.css:8,31`, `ai-seo.css:31`, `lead-gen.css:25,214`, `conversion.css:26`, `direction-c.css:217`, `components/direction-c/fonts.ts`, route-to-component imports.

**WORKING HYPOTHESIS:** paragraph measure over 72ch (heuristic); the visual effect of each recommended fix (UNTESTED until implemented).

**UNKNOWN (not run):** reduced motion, motion timing, consent banner behaviour, keyboard focus walk, screen readers, Safari, Firefox, real devices, Core Web Vitals.
