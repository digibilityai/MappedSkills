# Case showcase: local pilot report (DEC-115)

Status: LOCAL, not released. Pilot pages: `/social-media-ads`, `/seo` (port 3500). Nothing committed, pushed, deployed or published.

## What was built
- `components/case-showcase/`: `select.ts` (selection and View all rules), `CaseShowcase.tsx` (loader + view), `ShowcaseTrack.tsx` (mobile row, buttons, status, once-only reveal), `case-showcase.css`.
- Per-page config: `components/meta-ads-r22/showcase.ts`, `components/cplus/seo/showcase.ts` (heading, preferred cases, tone, View all service, per-case qualification wording).
- Bespoke proof and related-case sections removed from both pages; `components/cplus/seo/proof.ts` deleted.
- One-line /work fix: service select shows the `?service=` value.

## Verification
| Check | Result |
|---|---|
| Local, 2 pages x 1440/820/390/360 | 8 of 8 pass (`tools/verify-showcase.cjs`, data in `data/verify-local.json`) |
| Production build, preview switches off | 8 of 8 pass (`tools/verify-production.cjs`) |
| Tests / tsc | 604 tests, 603 pass, 1 existing skip; tsc clean |
| Metadata, canonical, JSON-LD count, h1 count | identical between dev and production output |
| Keyboard, mobile buttons, status text | pass at 820, 390, 360 |

SUPERSEDED by Revision 2 below (the first production check used an incomplete environment). Original text: /social-media-ads shows no showcase (none of the three Meta cases is published, so nothing is eligible); /seo shows the Ameba card with the held summary and a plain "View all case studies" link to /work.

## Items to review
1. On production today /social-media-ads loses its case-study section entirely until Meta cases are published. Intended by the rule "never expose unpublished content", but visible.
2. The AnybodyCanBake SEO artwork shows "25.49% more organic clicks" with a 46.15% enquiries line; the card text states the approved 46.15% enquiries figure. Consistent but two numbers appear.
3. New wording listed in DEC-115 needs approval.
4. Card heights differ when qualifications differ in length (links are not bottom-aligned across cards).
5. Not tested: real devices, Safari, Firefox, screen readers.

## Proposed rollout (not executed)
/google-ads (ABC Google Ads, Meticulous Business Plan, Bakersville); /who-we-help/d2c (Klenzmo, Bakersville, Advit Prints); /education (ABC Google Ads, EKoching, Bakedemy Meta); /real-estate (Om Sai, HutnHomes); /enquiry-led (Meticulous, Phoenix Laundry, Talreja & Talreja); /services and /about optional.

## Files
Screenshots: `screenshots/` (desktop, tablet, mobile section with neighbours). Recordings: `recordings/seo-mobile-navigation.webm`, `recordings/meta-mobile-navigation.webm`.


---
## Revision 2 (owner review points)

### 1. Production counts and the Meta empty state (corrected)
My first production check was **not faithful**: the scratch build copy lacked `CONTENTFUL_CASE_STUDY_NEW_FIELDS=1`, so only the two legacy studies were readable and the Meta showcase looked empty. That was a test-environment error, not a mapping or eligibility bug. Re-checked with the project's Contentful environment (`master`), preview switches off, flag on:

| Count | Value | Source |
|---|---|---|
| Published `caseStudies` entries (Contentful read-only query) | **6**: google-ads-for-online-courses, om-sai-developer-meta-ads, seo-for-home-decor-brand, seo-ameba-software, classpe-social-media-strategy, insuryo-organic-growth | Contentful delivery API |
| Listed in the public library (`/work/index.json`) | **5** (all of the above except Home Decor) | production-mode build |
| Home Decor | published, **unlisted** (`UNLISTED_CASE_STUDY_IDS`); not in `/work`, not in the index, not in either showcase; its detail page still answers 200 | verified |

With that environment, `/social-media-ads` in production mode shows **one card: Om Sai Developer** (published and eligible; the other two Meta cases, Klenzmo and AnybodyCanBake Meta Ads, are not published). `/seo` shows the Ameba held card. View all is the plain `/work` link because 5 is below the 7-study threshold for filter controls. Whether the live host's Contentful matches this environment was not independently checked; the host flag is recorded in memory as set.

### 2. Ameba withheld line
"We do not publish figures for this engagement." appears only when the study's proof is withheld (production). In the local final-case preview the card shows its approved figure (75.34% organic click growth, 7,300 to 12,800) and the verifier now fails if the line appears there (8 of 8 local checks pass with that assertion).

### 3. AnybodyCanBake SEO caveat, exact wording for owner review
Shown on the card: "A comparison of two periods, not proof that the work alone caused the change. The figures were supplied by MappedSkills and have not been independently checked."
Previous page text: "This is a comparison of two periods, not proof that the work alone caused the change. The figures were supplied by MappedSkills and have not been independently checked against Search Console or analytics exports."
Change: "This is" dropped and "against Search Console or analytics exports" dropped. No blanket disclaimer; qualifications stay on their cards. Both AnybodyCanBake metrics (25.49% clicks in the artwork, 46.15% enquiries in the text) are valid; no artwork change.

### 4. Row alignment
Cause: a site rule gave the first list items a 12 px bottom margin, so cards in a row ended at different heights. `.cs-track > li` now has margin and padding 0. Measured: all cards in a row have equal height and the "Read the case study" links share one baseline (Meta 1440: 614 px x3, link 587 px; SEO 730 px x2, link 704 px; also at 1100). No clamping, cropping or fixed heights; mobile keeps natural heights.

### 5. Focus ring
The editorial focus-guard audit flagged "no ring" on the card link (the ring was drawn on the card, not the focused link). The link now has its own 3 px ring; the card border darkens with it.

### 6. Rollout routes (existing canonical routes only; `/education`, `/enquiry-led`, `/real-estate`, `/d2c` return 404)
| Route (200) | Proposed cases (library slug) | Published today |
|---|---|---|
| `/google-ads` | google-ads-for-online-courses (AnybodyCanBake Google Ads); meticulous-business-plan-google-ads; bakersville-google-ads | first only |
| `/who-we-help/d2c` | klenzmo-meta-ads; bakersville-google-ads; advit-prints-meta-ads | none |
| `/who-we-help/education` | google-ads-for-online-courses; ekoching-google-ads; **bakedemy-google-ads** (Google Ads) or **bakedemy-meta-ads** (Meta Ads) | first only (ClassPe, published, is also Education) |
| `/who-we-help/real-estate` | om-sai-developer-meta-ads; hutnhomes-meta-ads | Om Sai only |
| `/who-we-help/enquiry-led-businesses` | meticulous-business-plan-google-ads; phoenix-laundry-google-ads; talreja-talreja-google-ads | none |
| `/services`, `/about` | optional | |

Bakedemy has two separate studies with different slugs and services; my earlier "Bakedemy (Meta)" for the education page was a choice to confirm, not a rule. Pages whose cases are unpublished would show fewer cards or no section in production until publication.

---
## Final verification (2026-11-01, final code)
Isolated production build: `CONTENTFUL_CASE_STUDY_NEW_FIELDS=1`, preview switches absent, `next build --webpack`, served on a test port (only that process was stopped and restarted). Its library lists 5 studies (Om Sai, ClassPe, InsurYo, Ameba, AnybodyCanBake Google Ads).

| Check | Result |
|---|---|
| Editorial regression (blog, press, research; 13 routes x 4 sizes) | PASS 52 of 52, links 28 checked, 0 bad |
| Banner-focus guard (contact, social-media-ads, blog, press, work at 1440/390/360), including the new link focus ring | PASS 15 of 15, 0 defects |
| Showcase, production build (2 pages x 4 sizes): Om Sai on Meta, Ameba held card on SEO, plain /work link, no overflow or console errors | PASS 8 of 8 |
| Showcase, local preview (2 pages x 4 sizes), incl. no withheld line, one link per card, equal-height rows, mobile buttons and keyboard | PASS 8 of 8 |
| Tests | PASS 604 (603 pass, 1 existing skip) |
| TypeScript, ESLint (changed areas) | PASS |
| Production counts: 6 published, 5 listed, Home Decor unlisted (not in index, sitemap or showcases; detail page 200) | PASS |
| Real devices, Safari, Firefox, screen readers | NOT RUN |

One earlier capture run timed out while a second heavy check was running at the same time; it passed on rerun with the machine idle. Not a code failure.

Screenshots: `screenshots/` (local: meta/seo desktop, tablet, mobile; `production-*` for the production build). Recordings: `recordings/`.
