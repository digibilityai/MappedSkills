# Case showcase rollout report (DEC-116)

Status: LOCAL, not released. Pilot accepted by Amit (DEC-115); rollout to five pages with the same component. Nothing committed, pushed, deployed or published; no Contentful write. `/services`, `/about` and the homepage are untouched.

## Page, case and View-all table
Routes verified before editing (canonical, all 200): `/google-ads`, `/who-we-help/d2c`, `/who-we-help/education`, `/who-we-help/real-estate`, `/who-we-help/enquiry-led-businesses`. (`/education`, `/enquiry-led`, `/real-estate`, `/d2c` are 404.)

| Page | Featured cases (card order) | Tone | View all (local, 20-study library) | Result of the link |
|---|---|---|---|---|
| `/google-ads` | AnybodyCanBake Google Ads, Meticulous Business Plan, Bakersville | dark (neighbours are paper) | `/work?service=google-ads` "View all Google Ads case studies" | 8 of 20, equals every Google Ads study in the library |
| `/who-we-help/d2c` | Klenzmo, Bakersville, Advit Prints | light | `/work?industry=ecommerce-retail` "View all eCommerce and retail case studies" | 4 of 20, equals every study in that industry (the three plus Wanderlooms) |
| `/who-we-help/education` | AnybodyCanBake Google Ads, EKoching, Bakedemy **Meta Ads** (`bakedemy-meta-ads`; not Bakedemy Google Ads) | light | `/work?industry=education` "View all education case studies" | 7 of 20, equals every education study |
| `/who-we-help/real-estate` | Om Sai Developer, HutnHomes | light | `/work?industry=real-estate` "View all real estate case studies" | 2 of 20, equals every real estate study |
| `/who-we-help/enquiry-led-businesses` | Meticulous Business Plan, Phoenix Laundry, Talreja & Talreja | light | plain `/work` "View all case studies" | no existing filter represents the group (professional services alone would leave out Phoenix Laundry, which has no sector key) |

Fallback rule: the library studies the old related list matched for that audience fill any gap after the preferred cases (at most three). View all promises a filter only when `/work` shows its controls (7 or more public studies) and, for an industry, offers it (2 or more studies); otherwise it is the plain link with "View all case studies". `/work` itself was not changed in this batch.

## What changed
- Shared: `select.ts` gained `fillWhere` and `viewAllFor` (service, industry or plain); `CaseShowcase.tsx` gained `fillAudience` and a `sector` View-all option. The pilot's pages behave as before.
- Per page: `components/<page>/showcase.ts` (config) and the page file loads it. Each component replaced its bespoke case card and its "More case studies" list with one `<CaseShowcase>`. Anchors kept: `ga3-work-h`, `ga41-more-h`, `d2c1-wk-h`, `d2c1-more-h`, `edr2-wk-h`, `edr2-more-h`, `rer2-wk-h`, `rer2-more-h`, `client-work`, `e11-more-h`.
- The page's existing card is kept only while the showcase has nothing to show (D2C today in production), so a page never loses its published proof. Cards use each study's own artwork, approved outcome, period and attached qualification from the `/work` entry; no blanket disclaimer.
- Pilot design, desktop row alignment, mobile row with buttons, focus ring, reduced motion and natural heights are unchanged.

## Production-rendered result (isolated build, `CONTENTFUL_CASE_STUDY_NEW_FIELDS=1`, preview switches absent)
Published and listed: AnybodyCanBake Google Ads, Om Sai, Ameba, ClassPe, InsurYo (6 published, Home Decor unlisted).
| Page | Rendered |
|---|---|
| `/google-ads` | 1 card: AnybodyCanBake Google Ads; plain `/work` link (5 listed, below 7) |
| `/who-we-help/d2c` | no showcase (no D2C study published); the page's existing Wanderlooms card remains, as today |
| `/who-we-help/education` | 2 cards: AnybodyCanBake Google Ads, ClassPe (fallback by audience); plain `/work` link |
| `/who-we-help/real-estate` | 1 card: Om Sai Developer; plain `/work` link |
| `/who-we-help/enquiry-led-businesses` | no section (none published), as before |
Home Decor appears nowhere.

## Results
| Check | Result |
|---|---|
| Local, 5 pages x 1440/820/390/360 (cases, order, artwork loaded and unskewed, outcomes, periods, qualifications, one link per card, one showcase, no old bespoke section, equal-height rows, buttons, keyboard, no overflow, no console error, no conceptual badge text, type and contrast floors) | PASS 20 of 20 |
| View-all destinations apply the filter across the full library (counts above) | PASS 4 of 4; enquiry-led plain link |
| Production-rendered showcases, 5 pages x 4 sizes | PASS 20 of 20 |
| Metadata, canonical, JSON-LD and single h1 on the five production pages | PASS (unchanged) |
| Banner-focus guard on the five pages (1440, 390, 360, banner visible) | PASS on the criteria that matter: 0 obscured controls, 0 over-tall controls, 0 guard scrolls, focus rings present, menu and consent behaviour fine, no console errors. The script prints 15 "DEFECT" lines for one reason only: it expects each target page to add the guard's listener, which applies to the four guarded pages; these pages are not guarded, so the correct count is the base count. Not a page defect. |
| Tests | PASS 607 (606 pass, 1 existing skip); tests updated deliberately for the consolidation and three new rollout tests added |
| TypeScript, ESLint (changed areas) | PASS |
| Editorial regression | NOT RERUN: shared changes do not touch those pages (52 of 52 and focus guard 15 of 15 from the previous run stand) |
| Real devices, Safari, Firefox, screen readers | NOT RUN |

## Unresolved issues and owner decisions
1. **Removed unique context on `/google-ads`:** the bespoke card's challenge, "what the work put in place" list and "what we did" steps no longer render while the showcase shows (they stay as the zero-case fallback and in the case study itself). Say if that narrative should return in another form.
2. **Artwork versus text:** the AnybodyCanBake Google Ads artwork leads with "1,410 paid enrolments" while the card text states the approved 5.24x return on ad spend; Meticulous artwork shows "3.38x revenue ROAS" beside the text's 27 signed engagements; HutnHomes artwork adds "23 reported sales". Treated as valid and unchanged, as with the pilot.
3. **D2C filter:** the closest existing industry is "eCommerce and retail", which also includes Wanderlooms; the label says so.
4. **Production education** shows ClassPe beside AnybodyCanBake because ClassPe is the published education study (the old list did the same).
5. **New wording for approval:** the five headings ("Google Ads work we have done", "D2C and ecommerce work we have done", "Education and training work we have done", "Real estate work we have done", "Enquiry-led business work we have done") and the View-all labels in the table.
6. D2C and enquiry-led show nothing new in production until their cases are published.
7. Recording of mobile navigation: Education and Google Ads (`rollout/recordings/`).

Screenshots: `rollout/screenshots/` (`local-*` and `production-*`; desktop, tablet, mobile, each with neighbouring sections). Tools: `tools/verify-rollout.cjs`, `tools/verify-rollout-production.cjs`, `tools/capture-rollout.cjs`.

---
## Final pass (2026-11-01)
- **Wanderlooms in production (`/who-we-help/d2c`):** no D2C study is public, so the page keeps its existing client-work card: no link to a case, no figures (the local final-case figure does not appear in production), image served (200), "See our work" goes to `/work`. The local final Wanderlooms study (`/portfolio/wanderlooms-meta-ads`, 200 locally, 404 in production) is untouched.
- **Focus-guard script:** now expects the guard listener only on the four guarded routes, and treats an obscured control as a defect on every route. Rerun on the five rollout pages (1440, 390, 360, banner visible): **PASS 15 of 15, 0 defects**, 0 obscured, 0 over-tall controls, 0 guard scrolls. The earlier 15 "DEFECT" lines were the script's listener assumption, not obstruction.
- **Google Ads narrative:** not restored on `/google-ads`; the case page already carries its published "What we did" section (keyword and targeting detail).
- **Links and leakage:** every `/portfolio` link on the five pages, `/social-media-ads` and `/seo` returns 200 on both the local server and the production build; no preview-only case in production; Home Decor absent from every page and from the `/work` index.
- **No regression:** pilot pages local 8 of 8 and production 8 of 8 rerun after the shared changes; `/work` filter destinations rerun (8, 4, 7 and 2 of 20); editorial regression (52 of 52) unaffected, not rerun.
- **Application code:** unchanged in this pass, so the production build from the rollout stands (tests 607, 606 pass, 1 skip; tsc and ESLint clean).
- **Review PDF:** `rollout/ROLLOUT_REVIEW.pdf`.
