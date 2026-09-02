# Search and AI-Discovery UX — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `SEARCH_ARCHITECTURE.md` and `WEBSITE_INFORMATION_ARCHITECTURE.md` (approved, `DEC-010`) · `AI_CITATION_CONTENT_PRINCIPLES.md` · `AI_SEARCH_LANGUAGE.md`.

**Purpose: make sure no UX decision undermines the approved search architecture.** This document creates no page, targets no query, and changes no route.

> **The constraint that governs the whole document, carried from the approved search architecture:** a material part of what this strategy needs from search and AI discovery is **off-site** — directory profiles, Google Business Profile, reviews, third-party listicles. **No UX decision can deliver it, and the UX must not be designed as though it could.**

---

## 1. Visible content versus hidden content

**The rule:** content that a reader needs in order to evaluate a claim is **in the DOM and visible by default**. Content that is genuinely supplementary may be **in the DOM and revealed on demand**. **Nothing is fetched on reveal.**

| Mechanism | Indexable / retrievable | Permitted for |
|---|---|---|
| **Visible content** | Yes | Everything load-bearing |
| **Native disclosure, content in the DOM** | **Yes** | The evidence apparatus · article sourcing · `/faq` answers |
| **Content fetched when opened** | **No** | **Nothing. Prohibited** |
| **Tabbed regions** | Only if all panels are in the DOM | **Not used** — nothing in the architecture needs tabs |
| **Carousel / paged region where content is not simultaneously present** | **No** | **Prohibited outright** (A19) |
| **Scroll container, all content present, no paging** | Yes | Wide tables and comparisons at narrow widths — **explicitly permitted and not a carousel** |

**Why this matters here more than on a normal site:** MappedSkills is written to be quoted accurately by systems that read the HTML. **Content hidden behind a fetch is content the argument loses**, in search and in AI answers simultaneously.

---

## 2. Accordions and disclosures — where they are permitted

| Context | Permitted | Rule |
|---|---|---|
| **`/faq`** | **Yes**, collapsed on load | Each item is a genuine discrete question the reader chooses between (A20 CONDITIONAL) |
| **Evidence apparatus** | **Yes**, as EXPANDABLE disclosure | Permitted disclosure, not an accordion hiding content |
| **Article sourcing** | Yes | Byline stays in the reading path |
| **Limits, the accountability boundary, attribution honesty** | **Never** | B29. A collapsed limit is a hidden limit |
| **Method, on `/how-it-works`** | **Never** | The page *is* the apparatus |
| **The four causes, the five checks, their findings** | **Never** | The page's core value |
| **Anything a reader needs in order to evaluate a claim** | **Never** | A20 |
| **Primary page content of any kind** | **Never** | |

---

## 3. Internal linking as UX

**Links follow buyer movement, not a link graph designed for crawlers.** No artificial hub-and-spoke, no footer link farm, no reciprocal scheme.

| Relationship | UX expression |
|---|---|
| `/services` ↔ capability pages | The only true hub. Capability routing on `/services`; a breadcrumb and an up-link on each capability page |
| Commercial ↔ problem | Contextual, at the point the relevant claim is made |
| Commercial → proof | Prominent, **as an offer, never a step** |
| Problem → enquiry, optionally via method | The method is available, never interposed |
| Research → commercial | **One or two contextual links in a whole entry** |
| Article ↔ article | Within a cluster only |
| Any page → enquiry | Every indexable page routes to one primary conversion outcome |
| **Conditional vertical page** | **Every internal link to it must be removable in a single change**, and no unconditional page may break if the gate does not clear |

**Prohibited:** a related-content module that exists to distribute link equity rather than to help a reader · "you might also like" grids on commercial pages · a link block appended to every page regardless of relevance · keyword-anchored links whose text does not describe the destination.

---

## 4. Related-content modules

| Module | Where | Rule |
|---|---|---|
| **Related articles** | Articles only | Within the cluster. Genuinely related, not filled to a fixed count |
| **Related research** | Research entries, articles | At most one or two |
| **Capability routing** | `/`, `/services` | **Not a card grid.** Routes by contribution |
| **"What to read next"** | `/thank-you` | **Exactly one link**, chosen from the page the enquiry came from |
| **Nothing** | Commercial pages, `/pricing`, `/contact`, `/schedule-call` | A related-content module on a commercial page is a second competing goal |

**A module that cannot be filled with genuinely relevant items does not render.** It is not padded, and it does not display "coming soon".

---

## 5. Breadcrumbs

**Required and currently absent** — `BreadcrumbList` is emitted on 11 routes with no visible breadcrumb anywhere. Full rules in `07_NAVIGATION_ARCHITECTURE.md` §6. The search-relevant requirements:

1. **The visible breadcrumb and the emitted schema come from one source.** Schema describing navigation the page does not have is the defect this fix exists to remove.
2. **A breadcrumb may express a hierarchy the flat URL does not have** — `Home → What we do → Search` for `/seo` is correct.
3. **A segment with no page is text, not a link.** `Industries` and `Problems` have no hub at launch.

---

## 6. Title and H1 alignment

| Requirement | Detail |
|---|---|
| **The `<h1>` matches the page's subject and the title's promise** | A title that promises one thing and an H1 that delivers another is a bounce |
| **One `<h1>` per page** | |
| **A page's category term may appear in the title where the residual query requires it, and not in the body** | `/conversion-optimization` is the live case: "CRO" is permitted in the title and meta description only, and appears nowhere in the copy, headings, breadcrumbs, nav labels, figure captions or CTAs |
| **No rejected company category in any title, heading, nav label, meta description or CTA** | GEO, AEO, LLMO, "performance marketing agency" |
| **No prohibited claim in any title or metadata** | **VERIFIED live exposure:** the current homepage title carries "300%+ ROI" and the sitewide default title carries a rejected positioning. **Blocked on the owner's `DEC-007` decision** |
| **Headings describe their sections** | Which is what makes heading-only navigation deliver the argument |

---

## 7. Research citability as a UX property

The research entries are the assets most likely to be cited by systems, and the ones the firm can publish without anyone's permission.

| Requirement |
|---|
| **Provenance IMMEDIATE** — sample, date, location, method in the entry itself, never in an appendix |
| **Every figure has a text or tabular equivalent** — this is how a system that cannot see the figure quotes it correctly |
| **Stable, addressable fragments** for findings and figures |
| **A copyable plain-text citation format**, with **no account, no email, no gate** |
| **Versions, not edits** — a revised finding gets a dated version and previous versions remain readable at a stable address |
| **No text rendered as an image**, ever |
| **The not-testable state must survive extraction** — a system reading the text equivalent must not be able to read it as a zero |

**This last requirement is where discovery and honesty are the same rule.** Whatever the site asserts is what AI systems redistribute — **verified in this programme**, where the site's own unsupported title claim was surfaced by Google AI Mode and repeated by Perplexity. **A figure that is ambiguous in its text equivalent will be redistributed ambiguously.**

---

## 8. Content discoverability and pagination

| Requirement | Detail |
|---|---|
| **Pagination on `/blog` is required before the editorial stream scales** | The Contentful query ceiling is 100 items and **silently truncates the index, `generateStaticParams` and the sitemap together** |
| **`/research` needs no pagination at launch** | Two entries |
| **Category filtering** | **Either real paths or non-indexable filtering. Do not build both** a `?category=` parameter and a path |
| **No parameterised indexable URLs** | Filtering must not become a crawlable variant set |
| **No infinite scroll on any index** | It hides content from crawlers, breaks the back button, and makes an item unaddressable |
| **Every article and entry is reachable without JavaScript** | Through the index, and through the sitemap |

---

## 9. Indexable and non-indexable routes

| Route | Status | UX consequence |
|---|---|---|
| 22 unconditional indexable pages | Indexable | Normal |
| 2 conditional pages | Indexable **if the gate clears** | Links removable in one change |
| **`/work`** | **`noindex`, out of the sitemap, out of navigation** | **No content. No "coming soon" placeholder.** An indexed case-study hub with zero case studies is a credibility exposure |
| **`/thank-you`** | **`noindex`, out of the sitemap** | Reached only from a confirmed conversion. Never linked, never in navigation |
| `/privacy-policy` | `noindex` today; **indexability is an open IA decision** | Footer only |
| `/terms` | `noindex` | Footer only |
| 404 | `noindex` | **Recovery links generated from live routes** — the current page hard-codes three slugs that all 404 |
| `/industries` | **404 at launch** | One child, no hub. **An accepted, recorded condition, not a defect** |
| `/launch-checklist` | Environment-gated | Not a public route |

---

## 10. Schema, where UX touches it

**No schema is specified here.** Three UX-adjacent requirements only:

1. **`BreadcrumbList` must be paired with visible breadcrumb UI.** Currently it is not.
2. **`WebSite` must not declare a `SearchAction`** unless a real site search exists. **None does, and none is built.**
3. **No `AggregateRating` or `Review` markup without genuine, permissioned, first-party review data.** None exists — which is also why no rating, review count or client count appears anywhere in the UX.

**`FAQPage` eligibility must be re-verified at implementation** (Project Rule 19). The UX does not depend on it: `/faq`'s accordion is justified by reader behaviour, not by a rich result.

---

## 11. What the UX must not create

| Prohibited | Reason |
|---|---|
| A page for any AI acronym — GEO, AEO, LLMO, AIO | Rejected by the IA. Upstream intent is courses and jobs |
| An AI visibility score, checker, dashboard or badge | Rejected on the SERP, inside AI answers, and methodologically. **The single most likely architecture mistake given how visible AI Search is in the strategy** |
| A city-page grid | The Pune SERP is decided by tenure, reviews and GBP |
| An industry grid or an `/industries` hub | One beachhead |
| A `/resources` hub, glossary, or statistics page | No query family; borrowed figures are prohibited |
| A comparison or listicle naming competitors | Not at launch |
| Thin service permutations | Cannibalise their parents |
| A tool of any kind | Zero tools at launch |
| A site search | None exists; declaring one in schema would claim a feature the site lacks |

---

## 12. The technical search requirements the UX inherits

**Recorded so the UX phase does not assume they are solved.** All are technical-phase items from the approved search architecture.

- Structured data absent from five service pages and `/portfolio/[slug]`.
- Four sitemap defects, including a 100-item cap on both Contentful collections.
- `metadataBase` unset; the base URL hard-coded as a fallback in five files.
- `https://www.mappedskills.com/` returns **200**, not a redirect.
- HTML served with a one-year immutable cache directive.
- **`public/robots.txt` must be preserved** — deleting it silently activates a site-wide `GPTBot`/`CCBot` block from the inert `app/robots.ts`.
- `openGraph.locale` is `en_US` for an India-only business.
- Image optimisation disabled sitewide.
- **No analytics runs in production**, so no search or conversion claim on any page is verifiable.

**One UX decision depends directly on the sixth item.** The architecture's entire AI-discovery position rests on crawler access already being full — **it is, and it produced zero appearances in 28 unbranded runs.** Access is necessary and demonstrably not sufficient, which is why no UX element on this site is designed to "improve AI visibility". **That work is off-site.**
