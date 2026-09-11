# Content Brief — `/blog` (Editorial Index)

**Session:** 09 · **Status:** **PROPOSED — NOT APPROVED.** · **Class:** LAUNCH — unconditional
**Page type:** Editorial index · **IA reference:** `WEBSITE_INFORMATION_ARCHITECTURE.md` §3.3, `EDITORIAL_STRATEGY.md`
**No copy or design is written in this brief.**

---

## 1. Page job
Be the editorial hub, and — more urgently — **stop being what it is today.** Production currently returns HTTP 200 on `/blog` rendering **"No articles found"** with zero article links, while the 404 page hard-codes three blog slugs that all return 404.

## 2. Audience
Returning readers, cluster browsers, and crawlers.

## 3. Search intent
**N / I.** Not a keyword target.

## 4. Primary query family
None.

## 5. Buyer problem
Indirect. The index exists to route to articles that answer real questions.

## 6. Desired belief change
From *"this agency does not publish"* to *"there is a small, specific body of work here, and it is about things this firm has actually done."*

## 7. Core proposition
A **deliberately small** editorial stream organised into two launch clusters — website enquiry conversion, and AI-assisted discovery — with a third that appears only if the manufacturing gate clears.

## 8. Required evidence
The articles themselves. **Launches with 3 articles, 4 if the conditional gate clears.** Fewer than 3 reads as abandoned.

## 9. Proof limitations
A very small body of work at launch, and it should not pretend otherwise. **No "insights hub" framing, no implied archive, no category taxonomy larger than the content.**

## 10. Questions the page must answer
1. What is written about here?
2. Who writes it?
3. Is it current?

## 11. Internal links in
Header navigation · homepage · footer · every article.

## 12. Internal links out
The three (or four) articles · cluster-relevant commercial and problem pages.

## 13. Primary CTA role
**LOW-COMMITMENT.** **Sticky CTA not permitted.**

## 14. Schema and content implications
`CollectionPage` · `ItemList` · `BreadcrumbList`. Existing 308 target from `/content-marketing-services`; **the URL does not move, and it is not renamed to `/insights`** — "Insights" is agency vocabulary, not buyer vocabulary, and renaming would create a chain for no gain.

**Recorded technical constraints affecting content:** pagination is required before the stream scales — the Contentful query ceiling is 100 items and silently truncates the index, `generateStaticParams` and the sitemap together. `?category=` filtering produces no crawlable hub URL; **either give categories real paths in PHASE 2 or leave filtering non-indexable — do not build both.** `Article.dateModified` currently maps to any CMS republish and must be fixed before the freshness policy means anything.

## 15. What NOT to claim
- **No "insights", "thought leadership" or "knowledge hub" framing.**
- No category taxonomy larger than the content it organises.
- No implied publishing cadence that has not been resourced.
- **No article stub, placeholder or "coming soon" entry.**

## 16. Dependencies and owner input
**Written last.** Depends on the three articles existing, and on named authorship being settled.

## 17. Visual opportunities
Cards that make the **cluster** and the **date** legible at a glance, so a small stream reads as focused rather than thin.
