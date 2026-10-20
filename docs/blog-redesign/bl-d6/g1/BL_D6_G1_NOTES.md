# BL-D6 · Blog Article Template — G1 Static Mockup (2026-10-20)

**Status:** static review mockup only. No production source code, Contentful entry, metadata, structured data or
production data was changed. Nothing committed, pushed, merged or deployed. `DECISION_LOG.md` and `CURRENT_STATE.md`
are unchanged. This is not a DEC entry.

**Input (owner, 2026-10-20):** "Proceed with BL-D6 G1 design and static mockup only", directions 1–7 (reconciled in §1).
**Basis:** `../BL_D6_ARTICLE_AUDIT_AND_PROPOSAL.md`. **Editorial list:** `../BL_D6_EDITORIAL_CORRECTIONS.md`.

- Mockups: `mockup/index.html` (`/blog/seo-company-in-pune`: long, 11 main headings, a related service and a related
  article) and `mockup/email-list.html` (`/blog/building-an-email-list`: short, one H2, no related service).
  Flags: `?banner=0` hides the review banner · `?flags=0` hides the editorial-fix outlines · `?close=blog` shows the
  approved `/blog` close copy instead of the proposed copy.
- Source: `mockup/src/ba.css` (every rule `ba-` scoped), `mockup/src/ba.js` (review flags + "Copy link" only),
  `mockup/src/*.body.html` (generated). Header, footer and base styles: the live C+ chrome and stylesheet from the
  approved `/blog` G1 kit (`mockup/vendor/live.css`, `tools/live-chrome.json`); the `/blog` row styles reused unchanged
  (`mockup/vendor/bl.css`).
- Content: the live Contentful output captured from production on 2026-10-20 (`tools/capture-content.cjs` →
  `tools/content.json`), **wording unchanged**. Only Tailwind classes were stripped and heading ids reassigned.
- Rebuild and re-check: `node tools/build.cjs`, `node tools/capture.cjs`, `node tools/end-shots.cjs`.
- Screenshots: `screenshots/` (49 files) and `screenshots/checks.json`.

---

## 1. Reconciliation: owner directions vs the seven audit decisions

| Audit decision | Owner direction | Result in G1 | Discrepancy |
|---|---|---|---|
| **BL-D6.1** Approve direction §4 for a G1 mockup | "Proceed with BL-D6 G1 design and static mockup only" | Built | None |
| **BL-D6.2** Close copy: new §4.2 copy **or** the approved `/blog` close | 4: one close with "Tell us about your business" → `/contact` and "Request a call" → `/schedule-call` | CTA pair and destinations exactly as directed. Default H2/body = the §4.2 proposal; `?close=blog` shows the `/blog` close | **Flag D-1:** the direction fixes the buttons but not the H2 and body. **Owner choice still needed.** |
| **BL-D6.3** Contents: H2-only sticky rail + closed `<details>` on mobile; audit suggested a cap of ~12 | 1–2: fix anchors, main headings only; collapsed panel on mobile, restrained sticky rail on desktop | Built. Anchors fixed (0 broken). No cap needed (the most H2s in any article is 12, Facebook) | **Flag D-2:** "main headings only" read strictly would leave 3 of the 7 articles with fewer than 3 contents items, and **hide the contents entirely on the email article (1 H2)**. G1 uses: H2s when an article has ≥ 3; otherwise H2 + H3 (never H4 or below). Affects email-list (6 items) and content-writing (5); content-marketing and performance-vs-digital have exactly 3 H2s and get a 3-item list. **Owner to confirm the fallback** (or accept no contents on those articles). |
| — (audit A7) Related services as named links, sidebar duplicate removed | 4: "replace overlapping conversion prompts with one closing CTA section" | Sidebar CTA, in-body CTA card, newsletter and final band removed. The owner-approved per-slug related **service link** (BLOG-007/008) is kept as one text link ("Related service · SEO →") | **Flag D-3:** treated as navigation (an approved internal link), not as a conversion prompt. If the owner means "nothing but the close", remove it; the internal-link loss would be noted. |
| **BL-D6.4** Remove the cartoon avatar; confirm the author's role and photo | 5: remove avatars; only verified author information | No avatar, no role, no generic bio, no author box. Byline "By Amit Gupta" (Contentful author name) · "Updated {date}" (Contentful `publishedAt`) | **Flag D-4:** the hard-coded role "Performance Marketing Strategist" and the code-generated bio ("contributes performance marketing insights…") are **not** verified Contentful data, so they are dropped. The visible **first-published** date is also dropped (the Article JSON-LD keeps `datePublished` unchanged). Owner to confirm both. |
| **BL-D6.5** Contentful B1–B4 now, by the owner | 6: prepare an exact list; **do not edit Contentful yet** | `BL_D6_EDITORIAL_CORRECTIONS.md` (24 items: 10 Must) | **Flag D-5: changes my recommendation.** I had recommended the internal notes and booking wording be fixed now; per the owner they stay **live** until the list is approved. The mockup shows them unchanged, with dashed review outlines. |
| **BL-D6.6** City-page articles: keep · retitle · consolidate · unpublish + 301 | 7: retain all Pune articles and URLs; no unpublishing, merging or retitling | Pune articles unchanged in the mockup; the correction list excludes titles, H1s, slugs and meta | **Flag D-6:** audit C2 ("remove 'Best' from the SEO title/H1") is **withdrawn into the held list**; the superlative stays live. The decision is deferred, not taken: BL-D6.6 stays open until Search Console evidence exists. |
| **BL-D6.7** Category taxonomy | not addressed | Live categories shown unchanged (the SEO article still shows "Content Marketing") | **Flag D-7:** still open. It also limits "More on this topic", which only matches articles in the same category (shown on 2 of 7). |

No other audit recommendation was changed. A1–A12 from the audit are all in the mockup except A11/A12, which are
included as low-cost defaults (`/blog` rows for related articles; hairline tables).

---

## 2. Visual direction — "One reading column, one close"

The approved `/blog` and `/faq` C+ language carried onto the article: ground hero → 3 px ink rule → paper reading
area → the shared tangerine close. Hairlines instead of cards. Tangerine only for events (hover, focus, the open
panel). No images added, no illustration, no animation beyond 150 ms colour/underline feedback.

### 2.1 Structure (top to bottom)
| # | Section | Content |
|---|---|---|
| A | Hero (ground) | Breadcrumb "Home / Blog / {title}" (title truncated with an ellipsis on one line) · kicker "{CATEGORY} · {N} MIN READ" · H1 (title) · lede (Contentful excerpt) · byline "By **{author}** · Updated {date}" |
| B | Article (paper) | 3 px ink rule. Wide: contents rail (15 rem, sticky) + reading column (62ch). Narrow and medium: closed "In this article · N sections" panel above the column. Body = Contentful rich text, restyled. After the body: "Related service · {Service} →" (only where `lib/blog-services.ts` has a service) and "Share this article · LinkedIn · Facebook · X · Copy link". |
| C | More on this topic (ground) | Same-category articles as the approved `/blog` rows. Only rendered when there are any. |
| D | Close (tangerine) | The shared C+ `b-close` and `ActionPair`, as `/faq` and `/blog`. The **one** conversion section. |

Removed from the live template: the TOC card, in-body CTA card, sticky sidebar CTA and its related-service card,
"Need Help With This?" card grid, author card with avatar, "Get More Growth Insights" newsletter block, and the
"Ready to Turn This Insight Into Action?" band.

### 2.2 Typography and spacing (existing tokens only)
| Element | Spec |
|---|---|
| H1 | Bricolage 800, `clamp(2rem, 1.1rem + 2.6vw, 3.5rem)`/1.04, max 24ch, balanced. Smaller than `b-h1` because CMS titles are long (up to 84 characters). No tangerine phrase (CMS text). |
| Lede | `--dc-t-lede`, ink, max 58ch |
| Body | Manrope 400, 17 px (`--dc-t-body`) / 1.7; column 62ch = 643 px; **≈ 70 characters per line** measured (live: 16 px, 795 px, ≈ 95–100) |
| H2 / H3 / H4 / H5 | Bricolage 800 `clamp(1.5rem…2.1rem)` / Bricolage 700 `clamp(1.2rem…1.4rem)` / Manrope 700 1.0625rem / Manrope 700 1rem dim. **H4 is now smaller than H3** (live inverts them). |
| Links in body | `--dc-tang-small` (#a83400), 600, 1 px underline → ink with 2 px tangerine underline on hover |
| Tables | 3 px ink top rule, 1 px hairlines, no fills; scroll inside their own box below 500 px |
| Images | full column, square corners, 1 px hairline border, no shadow; lazy-loaded |
| Labels (contents, related, share) | Manrope 700 `--dc-t-label`, .12em, uppercase, dim |

### 2.3 Proposed copy (owner approval needed)
| Element | Copy | Status |
|---|---|---|
| Contents label | **In this article** | Proposed (owner wording in direction 2) |
| Mobile panel | **In this article · {N} sections** | Proposed |
| Byline | **By {author} · Updated {date}** | Proposed (D-4) |
| Related service | **Related service · {Service name} →** | Proposed (D-3) |
| Share | **Share this article** · LinkedIn · Facebook · X · Copy link → "Link copied" | Live labels, restyled |
| More on this topic | **More on this topic** | Proposed (live: "Related Articles") |
| Close H2 (default) | **Want a second pair of eyes on this?** | Proposed (D-1) |
| Close body (default) | Tell us what's happening with your marketing and what you've tried. We'll reply with an honest view — and if we're not the right fit, we'll say so. | Proposed (D-1) |
| Close H2 / body (alternative, `?close=blog`) | Reading about a problem you have? / Tell us what's happening with your marketing. If we're not the right fit, we'll say so. | Approved for `/blog` (DEC-066 BL-D5) |
| Primary CTA | **Tell us about your business** → `/contact` | Owner direction 4 |
| Secondary CTA | **Request a call** → `/schedule-call` | Owner direction 4 |

No "Book", "free", "review", "strategy", duration or promise appears in template copy. Booking wording that remains
on screen is Contentful text (SEO-1, SEO-3), outlined for review.

---

## 3. Responsive behaviour
| Width | Contents | Column | Notes |
|---|---|---|---|
| Wide ≥1081 | Sticky rail, left, `top: 24px`, scrolls internally if taller than the viewport | 62ch beside the rail | H1 and rule align with the C+ grid (156 px at 1440, as `/blog` and `/faq`) |
| Medium 761–1080 | Closed `<details>` panel | 62ch, single column | Rail dropped: it would squeeze the column below a comfortable width |
| Narrow ≤760 | Closed `<details>` panel, 44 px rows when open | full width (16 px gutters) | Share and related lines stack; close buttons full width |

Measured (Chromium, static mockup, `checks.json`):

| | Live 1440 | Mockup 1440 | Live 375 | Mockup 375 |
|---|---|---|---|---|
| SEO article page height | 19,457 px | 17,425 px | 24,093 px | 20,030 px |
| SEO article: body starts at | — | 628 px | **2,955 px** | **648 px** (first screen) |
| Email article page height | 5,955 px | 5,338 px | 8,080 px | 6,769 px |
| Asks to `/contact` or `/schedule-call` outside the body | 3 (+1–4 "Learn More") | **2 (one close)** | same | same |

No horizontal overflow at 1440, 1280, 768, 375 or 320 px; no text under 12 px; 0 console errors.

---

## 4. Accessibility
| Area | In the mockup | Checked |
|---|---|---|
| Contents anchors | One slug rule for heading ids and contents links, de-duplicated (`-2`, `-3`) | **0 broken links** (22 per page, rail + panel); a jump lands the heading 24 px from the top at 1440 and 375 |
| Landmarks | `nav[aria-labelledby]` for the rail, `nav[aria-label]` in the panel, `article[aria-labelledby=ba-h1]`, breadcrumb `nav` with `aria-current` | DOM |
| Heading outline | One H1; the contents label is **not** a heading; template adds only H2 "More on this topic" and the close H2 after the body | H1 → H2 → H3 (→ H4 in the email article); no template heading precedes the body H2s |
| Keyboard | Tab order: breadcrumb → contents (rail at wide, the panel summary below) → body links → related → share → more → close → footer. `<summary>` is natively operable (Enter/Space) | Tab order recorded; panel opens without JavaScript |
| Focus | 3 px tangerine `rgb(255,91,4)` outline, 2 px offset, on contents, body, related, share and summary; the close keeps its shared on-ink ring | Computed on every recorded stop |
| Feedback | 150 ms underline/colour change on hover for contents, body, share and related links | Computed styles differ between rest and hover |
| Reduced motion | Transitions resolve to ~0 s; smooth anchor scrolling only under `prefers-reduced-motion: no-preference` | `transitionDuration` 1e-05 s; `scroll-behavior: auto` under reduce |
| Forced colours | Panel marker and focus use system colours | CSS only (not rendered in forced-colours mode) |
| Contrast | Template text ≥ 4.5:1 on its background | Automated pass: 0 failures (outlined review blocks excluded) |
| Targets | Template controls ≥ 44 px except the shared breadcrumb (19 px, identical on live `/faq` and `/blog`) and rail links (43 px; WCAG 2.5.8 minimum is 24 px) | Measured |
| Tables | Scroll container is focusable (`tabindex=0`, `role=region`, label from the header row) so keyboard users can scroll it | DOM |
| New tabs | Share links say "(opens in a new tab)" to screen readers | DOM |
| No JavaScript | Article, contents panel, related, share links and close all work; only "Copy link" needs JS (as live) | JS-disabled run |

**Not done:** Firefox and WebKit, real devices, VoiceOver/TalkBack/NVDA, forced-colours rendering, GTM Preview, a
production build. None of these is a pass.

**Known limitation, by design:** the rail does not highlight the current section (that needs a scroll listener, so it
was left out to keep the template script-free). Deferred (D).

---

## 5. Implementation impact (if G1 is approved and G2 is authorised later)

| File | Change | Risk |
|---|---|---|
| `app/(pages)/blog/[slug]/page.tsx` | Render a new `ArticleBody`; drop `CTABlockFromType`, `StickySidebarCTA`, `RelatedServices` grid, `AuthorBio`, newsletter and `CTASection` from this route. **`generateMetadata`, the three JSON-LD generators, `revalidate = 60`, `generateStaticParams` and the `notFound()` branch unchanged.** | Low |
| `components/cplus/blog-article/ArticleBody.tsx` (new) | Hero, contents (rail + `<details>`), body wrapper, related service line, share, more-on-this-topic rows, close (`ActionPair`, labels passed explicitly) | Low |
| `components/cplus/blog-article/content.ts`, `article.css` (new) | Copy; `ba-` scoped CSS | Low |
| `components/blog/RichTextContent.tsx` | Heading ids from a shared helper with de-duplication; H4/H5 renderers; Tailwind classes replaced by `ba-prose` styling | **Medium:** see id note below |
| `lib/contentful/mappers.ts` | `extractTocFromDocument` uses the same helper and the main-heading rule (H2s if ≥ 3, else H2 + H3). Data shape unchanged | Low |
| `lib/heading-id.ts` (new, small) | Shared `headingId()` | Low |
| `components/blog/SocialShare.tsx` | Restyle (or a C+ copy inside `ArticleBody`) | Low |
| `tests/blog-article.test.cjs` (new) | Every contents href resolves to an element id; one H1; no "Book"/newsletter/avatar; close targets; metadata/canonical/JSON-LD identical to `origin/main` for the 7 slugs; `lib/blog-services.ts` mapping unchanged | — |

**Unchanged:** all 7 URLs and canonicals; titles, descriptions, `og:*`, Twitter cards; Article, BreadcrumbList and
conditional FAQPage JSON-LD; `lib/contentful/*` queries and the Contentful model; `lib/blog-services.ts`; BLOG-012 link
behaviour; header and footer (they still say "Book a call": the separate DEC-062 D4 relabel); `/blog` listing;
`CTASection`, shadcn `ui/*` and every other route; analytics (no new events, `dataLayer` pushes or `data-*` hooks); no
new dependency.

**Heading-id note:** production already gives H2/H3 ids with `slugify(text)`; G1 keeps exactly that rule and only
changes the contents links to match, so any existing external `#heading` link keeps working. The only id changes are
de-duplication suffixes on repeated headings (none in these two samples) and new ids on nothing else.

**Unused after G2:** `CTABlock.tsx`, `StickySidebarCTA.tsx`, `RelatedServices.tsx`, `AuthorBio.tsx`,
`BlogNewsletterForm.tsx`, `BlogHero.tsx`, `TableOfContents.tsx` — leave in place or remove in a separate clean-up
(owner choice).

**Dependencies:** Contentful fixture preload with the 7 live documents for local verification (no local credentials);
GTM/E6 check, because the removed CTA elements may be targeted by text or class; owner answers to D-1 to D-7.

**Estimated size:** about 5 new and 4–5 edited files; comparable to the `/blog` G2.

---

## 6. Screenshots (`screenshots/`)
| File | Shows |
|---|---|
| `seo-{1440,1280,768,375,320}-fold.png`, `-full.png` | SEO article, every width (review outlines off) |
| `email-{1440,1280,768,375,320}-fold.png`, `-full.png` | Email article, every width |
| `seo-1440-mid-sticky-rail.png`, `email-1440-mid-sticky-rail.png` | Rail stays at 24 px mid-article |
| `seo-375-contents-open.png`, `email-375-contents-open.png` | Mobile panel open |
| `*-after-contents-jump.png` | Heading in view after a contents click (1440 and 375) |
| `*-1440-focus-first-contents-link.png`, `*-1440-close-focus.png` | Keyboard focus |
| `*-1440-end.png`, `*-375-end.png`, `*-end-close.png` | Related service, share, more on this topic, close |
| `*-1440-close-proposed.png`, `*-1440-close-alt-blog-copy.png` | Close copy options for D-1 |
| `seo-1440-table.png`, `seo-375-table.png` | Table style; narrow scroll |
| `*-1440-review-flags-full.png` | Editorial-fix outlines on the live text (SEO-1 to SEO-4, EM-1 to EM-3) |

Live "before" evidence: `../screenshots/` (audit).

---

## 7. Owner decisions requested
| ID | Decision |
|---|---|
| **BL-G1-A** | Approve the G1 article template as shown, or list changes |
| **D-1** | Close H2 and body: proposed ("Want a second pair of eyes on this?") **or** the approved `/blog` close |
| **D-2** | Contents fallback for articles with fewer than 3 H2s: H2 + H3 (as built) **or** no contents |
| **D-3** | Keep the single "Related service →" link (as built) **or** remove it |
| **D-4** | Byline: name + "Updated" date only; drop the hard-coded role, generated bio and visible first-published date (as built) **or** supply a verified role/bio |
| **D-5** | Editorial list: approve, edit or defer (`../BL_D6_EDITORIAL_CORRECTIONS.md`); the internal notes and booking wording remain live meanwhile |
| **D-6** | Confirmed: Pune titles, H1s, slugs and meta held pending Search Console evidence |
| **D-7** | Category taxonomy (still open) |

**Stopping here. Awaiting owner review of G1. Nothing implemented.**
