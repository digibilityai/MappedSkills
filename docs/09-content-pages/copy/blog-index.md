# Route
`/blog`

**Session:** 11 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED COPY — NOT APPROVED. CONDITIONAL on the articles it lists.**
**Governed by:** `briefs/blog-index.md` · `PAGE_TYPE_CRO_RULES.md` §7 · `EDITORIAL_STRATEGY.md`.

> **The three launch articles are not written in this session** (Session 11 is page copy; the articles have their own briefs in `docs/05-content/editorial-briefs/`). This index describes what exists, so it is written last and its copy is conditional on those articles existing.
>
> **Recorded, because it is the page's most urgent problem:** production currently returns HTTP 200 on `/blog` rendering "No articles found" with zero article links, while the 404 page hard-codes three blog slugs that all return 404. **No copy fixes that; it is a technical prerequisite.**

---

# Page Role
The editorial hub — and, more urgently, to stop being an empty page that says so.

# Primary Intent
Navigation and routing.

# Search Intent / Search Status
**N / I. Not a keyword target.** The articles carry the intent; the index routes.

# Primary Audience
Returning readers, cluster browsers, and crawlers.

# Primary Message
A small, specific body of work about things this firm has actually done.

# H1
Writing

# Hero Supporting Copy
A deliberately small set of pieces on two subjects: why websites receive visits and not enquiries, and how buyers are finding suppliers through AI-assisted search. Where something rests on a measurement we ran, it links to the measurement rather than restating it.

# Primary CTA
**Role: LOW-COMMITMENT. Sticky CTA not permitted.** No booking prompt on this page or on any article.

---

## Section 1 — What is written about here

### Heading
What is here

### Copy
Two clusters at launch.

**Enquiries that do not arrive** — why visits fail to become enquiries, how to check which of four things is happening on your own site, and how to tell whether search work is producing anything commercially.

**Being found through AI search** — what actually determines whether a business appears when someone asks an assistant for a supplier, based on measurement rather than on what the category is currently selling.

`[CONDITIONAL — a third cluster on industrial and manufacturing B2B exists only if the manufacturing validation gate clears. If it does not, this line and its article do not appear, and nothing else on this page changes.]`

### Supporting Elements
- **No category taxonomy larger than the content it organises.** Two clusters, three articles.
- **Prohibited:** "insights" · "thought leadership" · "knowledge hub" · any implied archive · any "coming soon" stub.

---

## Section 2 — The articles

### Heading
Articles

### Copy
`[CONDITIONAL — article cards are generated from the three published launch articles, which are written separately. This page does not publish until at least three exist; fewer than three reads as abandoned.]`

### Supporting Elements
- Cards make the **cluster** and the **date** legible at a glance, so a small stream reads as focused rather than thin.
- `[OWNER INPUT REQUIRED — named authorship, so every card carries a real byline.]`
- **No stub, no placeholder, no "coming soon" entry.**

---

## Section 3 — The boundary with research

### Heading
Research is somewhere else

### Copy
Measurements we ran ourselves are published separately, with their method, sample and limits attached. Anything here that draws on one links to it rather than repeating it. → `/research`

---

# Evidence / Claim Notes

The index makes no claim requiring evidence. **No borrowed statistic, no cadence promise, no implied archive.**

# Owner-Input Placeholders
1. `[OWNER INPUT REQUIRED — named authorship]`
2. `[TECHNICAL PREREQUISITE — the index must render real articles; pagination is required before the stream scales, the CMS query ceiling silently truncates the index and the sitemap together, and `Article.dateModified` currently maps to any republish and must be fixed before any freshness policy means anything.]`
3. `[CONDITIONAL — the manufacturing article, only if the gate clears.]`

# Internal-Link Intent
**Out:** the three (or four) articles · `/research` · cluster-relevant commercial and problem pages.
**In:** header navigation · homepage · footer · every article.
**URL note:** the route does not move and is **not** renamed to `/insights` — that is agency vocabulary and renaming would create a redirect chain for no gain.

# Copy Status
**CONDITIONAL.** Index copy is complete; it cannot publish before the articles it lists exist.
