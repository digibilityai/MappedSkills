# Minimum Integration Plan

27 October 2026. **Plan only.** Nothing here is authorised. Implementation and deployment are separate steps, each needing the explicit owner authorisation listed in section 5.

Guiding rules: preserve the seven approved designs exactly; change shared code only where integration needs it; keep every live URL, redirect, integration, form and SEO signal unless the owner approves otherwise; add no optional enhancement.

## 1. Owner decisions that gate the plan

| # | Decision | Recommended | Why it gates work |
|---|---|---|---|
| D1 | Title, description and H1 policy for `/google-ads`, `/social-media-ads`, `/who-we-help/d2c`, `/who-we-help/education` | Keep live title, description and canonical; adopt the frozen H1 only where the design needs it; log each | WP3 cannot finish without it (P1-02) |
| D2 | Enquiry-Led slug, title, description | Keep `/who-we-help/enquiry-led-businesses`; use the R1.1 working title; SERP validation after release | WP4 (P1-01) |
| D3 | Links to retained service pages | One footer "More services" group (four pages) | WP5 (P1-07) |
| D4 | Homepage reporting sentence | Reporting Policy A wording | WP6 (P1-04) |
| D5 | Uncommitted homepage R2.1 and dev hooks | R2.1 superseded by R3; keep navigation work; remove dev hooks; discard nothing without explicit instruction | WP1 (P1-05) |

## 2. Work packages

Estimated size is relative (S small, M medium), not a time promise.

| WP | Purpose | Contents | Depends on | Size | Preserves |
|---|---|---|---|---|---|
| **WP0** Decision records | Make the approvals durable (P1-08) | Draft append-only entries: seven frozen designs and versions; metadata and H1 policy (D1); Enquiry-Led route (D2); navigation structure and labels; wording supersessions (CTA labels, D2C H1, Reporting Policy A on the homepage). Owner confirms before logging | D1 to D5 | S | All earlier `DEC-` entries unaltered |
| **WP1** Branch and triage | Remove mixed state (P1-05) | New branch from `main`. Bring over: navigation edits (`nav.ts`, `SiteHeader.tsx`, `direction-c.css`), the seven preview folders, reports and images. Do **not** bring: R2.1 homepage edits, the five R2.1 test rewrites, `DesignSwitcher` import in `app/layout.tsx`, `?design=` rewrites in `next.config.mjs`, `next-env.d.ts`. The current working tree stays untouched as the source | D5 | S | Original worktree and all docs intact |
| **WP2** Shared modules | Stop interior pages depending on homepage-round and earlier-round paths (P1-05) | Move `RvReveal3` and `resolve-home-r3.css` (scoped `rv3-` rules), the `google-ads-r3/r4` art and journey modules, and the `meta-ads-r1/r2/r21` modules that G and M import into stable names. Pure moves; imports updated; no behaviour change. Earlier rounds stay on disk until WP9 | WP1 | S | Rendered output unchanged |
| **WP3** Swap six existing pages | Integrate H, G, M, D, E, R (P1-02, P1-03) | One route at a time: replace the page component **inside** the existing `page.tsx`; keep the wrapper, `BreadcrumbList`, `Service` and sitemap line; apply D1 to metadata; regenerate each `FAQPage` from the rendered content module; rewrite the matching `tests/paid-advertising-*.test.cjs` to the frozen design | WP1, WP2, D1 | M | Live URLs, canonicals, redirects, `/lead-generation` and all non-listed routes |
| **WP4** Enquiry-Led route | Add the missing page (P1-01) | `app/(pages)/who-we-help/enquiry-led-businesses/page.tsx` modelled on `real-estate/page.tsx`: metadata via `createMetadata`, `BreadcrumbList`, `FAQPage` of 7, component from WP2-stable path; one line in `app/sitemap.ts`; commercial page-type mapping; test file | WP1, WP2, D2 | S | Nothing existing changes |
| **WP5** Navigation, footer, homepage links | Reach the fourth audience and protect retained pages (P1-06, P1-07) | Add the fourth item to `WHO_WE_HELP_LINKS` and `WHO_WE_HELP_ROUTES`; add footer **Who We Help** column; add **More services** group if D3 approved; add the fourth homepage audience card or link and fix the `enquiry-led` id on the real-estate card | WP4 (route must exist), D3 | S | Existing links, labels and active-state pattern |
| **WP6** Homepage sentence | Reporting Policy A (P1-04) | Replace "Your engagement includes monthly reporting and a review call." with the approved wording | D4; lands inside WP3 for the homepage | S | Rest of R3 |
| **WP7** Verification | Prove it, in isolation | Updated tests green; `tsc`; scoped and then full `eslint`; production build **in a scratch copy** (never the dev server's `.next`); `next start` on a spare port; head, JSON-LD, internal-link and sitemap diff against the pre-swap capture for all seven routes plus `/lead-generation`, `/services`, `/seo`, `/ai-seo`, `/conversion-optimization`; all preview routes 404; browser pass at the six widths; keyboard, reduced-motion and no-JS re-run; manual list from `PRE_RELEASE_QA_MATRIX.md` section 5 | WP3 to WP6 | M | |
| **WP8** Deployment (separate) | Release | Commit, push, PR, merge and the dispatch-only deploy are individual authorisations. Record the pre-release `BUILD_ID` as the rollback target (currently UNKNOWN). Post-deploy: live head diff, sitemap, Search Console URL Inspection, rich-results test, consent and event checks. Confirm the readiness smoke list does not 404 on any path it checks | WP7, owner authorisation | S | Auto-rollback behaviour of the workflow |
| **WP9** Cleanup (after release is stable) | Remove scaffolding (P2-07) | Delete the 15 preview routes, earlier-round component folders no longer imported, `components/resolve-home`, `components/resolve-home-r2`, and the two dev hooks if not already gone. Keep reports and screenshots in `docs/` | WP8 stable | S | Docs history |

## 3. Dependency graph

```
D1 D2 D3 D4 D5 ─▶ WP0 (records)
D5 ─▶ WP1 ─▶ WP2 ─▶ WP3 (needs D1, D4) ─┐
              │                         ├─▶ WP7 ─▶ WP8 (authorised) ─▶ WP9
              └─▶ WP4 (needs D2) ─▶ WP5 (needs D3) ─┘
```

WP4 can be built in parallel with WP3 once WP2 exists. WP5 must follow WP4, because a navigation link to a non-existent route would be a broken destination.

## 4. What is deliberately left out

- No new pages beyond Enquiry-Led; no `/who-we-help` hub; no `/meta-ads` route; no `/ppc-marketing` redirect.
- No change to `/lead-generation`, `/services`, `/seo`, `/ai-seo`, `/conversion-optimization`, `/pricing`, `/contact`, the redirect list or `robots.ts`.
- No new funnel, form, tracking event, analytics change or CRM change.
- No redesign, no copy edit beyond P1-04 and the metadata decisions.
- No reciprocal link on `/lead-generation` (P2-06) unless separately authorised.
- Deferred wording on `/services` and the homepage free-account-review line (`DEC-080` follow-ups).

## 5. What requires explicit owner authorisation

| Action | Authorised today? |
|---|---|
| Decisions D1 to D5 | **No.** Awaiting the owner |
| Local implementation of WP0 to WP7 on a new branch | **No.** This audit is the request for it |
| Writing the decision entries to `DECISION_LOG.md` | **No** (owner confirms text first) |
| Discarding or reverting any uncommitted work in the current worktree | **No** (never without an explicit instruction) |
| Commit, push, PR | **No** (each separately) |
| Merge to `main` (note: `main` requires a PR; approvals currently 0, to be re-checked at the time) | **No** |
| Dispatching the production deployment workflow | **No** |
| Editing `/lead-generation` or any page outside the seven | **No** |
| Contentful or other CMS changes | Not needed; none planned |

## 6. Risks and mitigations

| Risk | Mitigation |
|---|---|
| A component swap drops schema or breadcrumbs | Swap inside the wrapper; schema diff in WP7 |
| Title or H1 change harms an indexed page | D1 default keeps live metadata; EG on Search Console is acknowledged |
| Deleting earlier rounds breaks an approved design | WP2 first; WP9 last |
| Navigation links to the new route before it exists | WP5 depends on WP4 |
| Tests silently encode the wrong version | WP3 rewrites them to the frozen design; WP7 requires green |
| A build overwrites the active dev server | All builds in a scratch copy with symlinked `node_modules` |
| Production behaviour differs from dev | WP7 runs `next start` on a spare port against an isolated build, as this audit did |
