# MappedSkills UI Revamp — Gate 4: QA and Acceptance Matrix

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Status** | **PLANNING ONLY.** No test was run for this document; it defines what each Gate 4 batch must run |
| **Builds on** | `QA_REGRESSION_RUNBOOK.md` (eight portable scripts; archival scripts listed in its §4) · `GATE_3_FINAL_ACCEPTANCE.md` §2 and §10 · Gate 0 §16 protection map |
| **Engines available locally** | Playwright Chromium 151 and installed Google Chrome 154 (Blink). `playwright-core` 1.62.1 can also install WebKit and Firefox builds (engine proxies; **not** real devices) |

---

## 1. Protection matrix — what must not change, and how it is checked

**Existing** = an automated check already in the repository that can be reused (`QA_REGRESSION_RUNBOOK.md` §3).
**Gap** = no route-general check exists; B0 must build it. **Manual** = needs a person or a device.

| Protected surface | Rule | Existing automated check | Gap / new check (B0) | Manual |
|---|---|---|---|---|
| **Approved page copy** (incl. `LIVE-2`, legal text) | Byte-identical visible text; words move, never change | `gate-2/validation/inventory.cjs` + `compare.py` (3 routes; `inventory.cjs` is archival) | **Route-parametric content inventory** for all 27 templates: visible text blocks, normalised whitespace, diffed against the B0 baseline | Owner read-through of each batch's compare page |
| **Route URLs** | No route added, removed or renamed; status codes unchanged (404 stays 404) | none | Route list from `app/**` + HTTP status per route, diffed | — |
| **Internal links** | `<main>` href multiset identical per route; chrome link set identical to the approved chrome | `app-checks.cjs` (3 routes), `unrelated-routes.cjs` (links) | Route-parametric link multiset for `<main>`, header and footer separately | — |
| **Metadata and canonicals** | `title`, `description`, canonical, `robots` identical | `compare.py` (3 routes) | In the inventory above, all routes | — |
| **Open Graph / Twitter** | All `og:*`, `twitter:*` identical (incl. `resolveOgImageUrl` output) | `compare.py` (3 routes) | In the inventory | — |
| **JSON-LD** | Every `application/ld+json` block byte-identical (Organization; BreadcrumbList from 3 sources; FAQPage; Article/FAQ on blog; ResearchReport; NewsArticle) | Gate 2 "JSON-LD identical on 8 routes" | In the inventory, all routes + CMS fixtures | Google Rich Results Test on staging (Gate 7) |
| **Heading semantics** | One `h1`; identical heading sequence (level + text) | `app-checks.cjs` (3 routes) | In the inventory | — |
| **Analytics and GTM** | `page_view` sequence identical; `lead_form_*` and `meeting_started` fire with identical parameters under the same conditions; consent bootstrap first in `<head>` | `probe.cjs` §5 (`page_view`, 3 routes) | **`dataLayer` capture harness**: route walk (`page_view`), a scripted form journey with `/api/enquiry` intercepted (2xx and 4xx/5xx), a booking click; diff against baseline. Assert the bootstrap is the first `<head>` child | **E6: GTM container trigger audit + GTM Preview** against a local build (needs owner container access) |
| **Forms and lead capture** | Field set, `name`s, order, required flags, labels, hints, errors, honeypot, consent text, endpoint, payload shape (incl. attribution/UTM), success only on 2xx → `/thank-you` | none in UI QA. `npm test` covers CRM delivery only (11 tests) | **Form contract check**: DOM field inventory + an intercepted submit asserting the request body keys and the redirect only on 2xx | One real submission on staging (Gate 7), not locally against production systems |
| **Backend integrations** | `/api/enquiry`, MariaDB, CRM webhook, Contentful queries untouched | `npm test` (CRM), `verify:build`, `verify-server-files` | File-change guard: the batch diff must not touch the Gate 0 §17 list | — |
| **Blog and CMS** | Rich-text node → element mapping, heading IDs, link props, image `alt`; ISR `revalidate = 60`; `generateStaticParams`; `noindex` on not-found slugs | none | Inventory on CMS fixtures or a credentialed build; renderer DOM snapshot (element tags + IDs) per fixture | Owner check of one live article in staging |
| **Mobile navigation** | Menu reachable, CTAs first and in view, Escape/focus return, closed panel `inert`, landscape | `app-checks.cjs` + `acceptance-checks.cjs` (3 routes) | Route-parametric menu suite (all routes after B1) | E1 device pass |
| **Accessibility** | 0 axe violations; keyboard order; ≥2px focus visible; targets ≥ 44px; contrast; text spacing; reflow at 320; forced colours; reduced motion | `probe.cjs` (axe), `acceptance-checks.cjs`, `a1a2-checks.cjs`, `r-checks.cjs` (3 routes) | Route-parametric versions (§5) | VoiceOver / TalkBack (E1) |
| **Performance** | Throttled CLS ≤ 0.01 (target ≤ 0.001); no font reflow above the fold; per-route JS/CSS/HTML bytes reported | `cls-throttled-final.cjs` (route list as arguments) | Port `sweep.cjs` (fallback calibration) to the portable harness; byte report per route | Field CWV only after production (Gate 9) |
| **Consent behaviour** | Banner, preferences link, two-gate GTM loading unchanged | none dedicated | Consent states (undecided / accepted / declined): assert GTM script presence/absence and banner state per route | — |

---

## 2. Test levels

### 2.1 Component level (each new or changed primitive, in the batch that introduces it)

| Check | How |
|---|---|
| Renders on its first consumer route at 320/360/390/430/768/1024/1440 with no overflow | route suite |
| Semantics: the element contract in `GATE_4_DESIGN_SYSTEM_ARCHITECTURE.md` §4.3 (caption/scope for tables, `<ol>` for sequences, one name per row, etc.) | accessibility-tree assertions |
| Keyboard: every interactive part reachable, visible ≥2px focus, logical order | Tab walk |
| Forced colours: state not carried by fill alone | emulation |
| Text spacing (WCAG 1.4.12) at 320/360/390 | style injection |
| No raw hex / no `outline: none` / no `dc-` class outside the `.dc` scope | static grep in the batch diff |
| Approved routes unaffected when a shared primitive changes: served-HTML diff of `/`, `/services`, `/seo` | inventory + pixel |

### 2.2 Route level (each migrated route)

1. Content/SEO inventory **identical** to the B0 baseline (except approved, listed differences).
2. Pixel review: before/after at seven widths + menu-open at 390 and 1024; compare page for the owner.
3. Responsive audit at seven widths: no element past the right edge, no page horizontal scroll, one `h1`, no heading jumps, targets ≥ 44px, no sticky/fixed element except the consent banner.
4. Keyboard full traversal at 390 and 1440; 200% zoom (1440/1280/1024 layout-equivalents); 400% (320×256).
5. Text spacing at 320/360/390/768/1440; forced colours at 390/1440; reduced motion; no-JS; print emulation.
6. axe-core (wcag2a/aa, 21a/aa, 22aa) at 390/1440: 0 violations.
7. Throttled CLS (3 runs) at seven widths; display-font fallback re-wrap check above the fold.
8. Console: 0 errors, 0 hydration warnings.
9. Analytics: `page_view` identical; route-specific emitters (B6) per §1.

### 2.3 Batch level

- All route-level checks for the batch's routes.
- **Regression on all previously migrated routes** (the full suite, not a sample): content inventory, pixel identity
  where no shared primitive changed, axe, menu.
- **Unmigrated routes:** `<main>` pixel-identical to the previous batch's build.
- Static gates: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run verify:build`.
- Bytes: per-route HTML, CSS, JS, fonts versus the previous batch.
- Anti-repetition review (§3).

### 2.4 Whole-site level (after B10, and again after B11)

- Every check in §2.2 on all 28 templates, CMS templates on at least one fixture each (and the research **category** variant).
- Route walk through every category with client navigation and back/forward (extended `chrome-nav.cjs`).
- Cross-engine automated run in Playwright **WebKit** and **Firefox** (engine proxy for E1; not a substitute for devices).
- Font consolidation (if F1 is approved) — throttled CLS on all routes.

### 2.5 Pre-staging level (Gate 7 entry; mandatory)

| Condition | Source |
|---|---|
| **E1 complete:** real Android Chrome, real iPhone Safari, desktop Safari, desktop Firefox, VoiceOver; larger-text and High Contrast checks; material issues fixed and retested | `DEC-036` |
| **E6 complete:** GTM container triggers inventoried; DOM-keyed triggers validated in GTM Preview against the release candidate; event semantics preserved | `DEC-036` |
| Whole-site suite green on the release candidate build | §2.4 |
| `LIVE-1`, `LIVE-2`, `PROC-1` status stated accurately; no merge to `main` while `PROC-1` is open | `DEC-033`, `DEC-036` |

---

## 3. Visual acceptance criteria (every batch)

| # | Criterion | Check |
|---|---|---|
| V1 | Direction C tokens only: no raw colours, no off-palette surfaces (e.g. the legacy `bg-blue-50` cards) | static grep + review |
| V2 | Type roles only (`Label`, `Statement`, `dc-title`, …); body measure ≤ 58ch; display measures in `em` | computed-style sampling |
| V3 | Section rhythm from tokens; no literal section padding | grep |
| V4 | ≤ 2 inversions per route; tangerine close only where production has a close | DOM count |
| V5 | Register rules (`GATE_4_DESIGN_SYSTEM_ARCHITECTURE.md` §6): no adjacent identical compositions; no equal-card grids; each register keeps its distinctive element; the hero stage only on `/`; bands only on `/services` | owner review + DOM check for adjacency |
| V6 | CTA set: exactly the route's production CTAs; primary `/contact`, secondary `/schedule-call`; no third button; no sticky CTA | link inventory |
| V7 | Proof: plates carry Limitation visibly; no number without scope; no withheld item implied | review against `lib/case-study-proof.ts` |
| V8 | Mobile is composed: explicit order decisions at ≤599px recorded in the batch report | report |
| V9 | No new visible copy (including structural labels) unless the owner approved it in that batch | content inventory diff |
| V10 | Motion per `GATE_4_MOTION_SPECIFICATION.md` §§2–4 | motion checks §4 below |

---

## 4. Check catalogue (what to run, and from where)

| Check | Viewports / modes | Reuse | Build in B0 |
|---|---|---|---|
| Responsive audit (overflow, targets, headings, sticky/fixed) | 320, 360, 390, 430, 768, 1024, 1440 | logic in `app-checks.cjs` §1 | make `ROUTES` an argument; add 320 |
| Menu + Services disclosure | 320–1024 incl. 390×600; 1440 | `app-checks.cjs` §2–§5, `acceptance-checks.cjs` landscape | route argument |
| Keyboard traversal + focus ring | 390, 1440, 200% zoom | `acceptance-checks.cjs` | route argument |
| Text spacing (1.4.12) | 320, 360, 390, 768, 1440 | `acceptance-checks.cjs` §3, `a1a2-checks.cjs` | route argument |
| Zoom / reflow (1.4.10) | 200% (1440/1280/1024), 400% (320×256) | `acceptance-checks.cjs` | route argument |
| Forced colours | 390, 1440 | `acceptance-checks.cjs` §4, `a1a2-checks.cjs` | generalise "state not by fill" |
| Reduced motion / motion on / no-JS / print | 390, 1440 | `app-checks.cjs` §6–§8 | route argument; add print and the text-node rule |
| axe | 390, 1440 | `probe.cjs` §1 | route argument |
| Font loading + throttled CLS + fallback re-wrap | seven widths × 3 runs | `cls-throttled-final.cjs`; `sweep.cjs` (archival) | port `sweep.cjs` |
| Content / SEO / JSON-LD / links inventory | 1440 (served HTML) | `inventory.cjs` + `compare.py` (archival) | **new route-general inventory + diff** |
| Pixel comparison (`<main>` and full page) | 390, 1440 (+ batch widths) | `unrelated-routes.cjs` | `<main>`-only mode (needed from B1 onward) |
| Chrome seam / route walk | client nav + back/forward | `chrome-nav.cjs` | extend to all categories |
| `dataLayer` capture (page_view, form, booking) | 390, 1440 | `probe.cjs` §5 (page_view) | **new** form + booking journeys with request interception |
| Consent states | 390 | none | **new** |
| Cross-engine | 390, 1440 | none | WebKit + Firefox runs of the responsive, menu, keyboard and axe checks |

**Reusable vs archival evidence.** Reusable scripts live in **`docs/ui-revamp/gate-4/qa/`**, take the base URL(s) and route
list as arguments, resolve dependencies from the project, and write to stdout. Each batch stores its **outputs** under
`docs/ui-revamp/gate-4/<batch>/evidence/` (text and JSON results, the compare page, the screenshots it references). Outputs are
never overwritten by a later run. `QA_REGRESSION_RUNBOOK.md` is updated in B0 to list the new scripts.

---

## 5. Batch-specific additions

| Batch | Extra checks |
|---|---|
| B1 chrome | All 28 templates; `<main>` unchanged; anchors (CH1); consent banner + menu (CH3); `aria-current` (CH6); legacy-route bytes |
| B2/B3 capability | `BreadcrumbList` byte-identical; figure text ≥ 12px at 320; tables: caption, `scope`, no page scroll at 320 |
| B4 decision | `RouteBreadcrumb` trail identical; `DataTable` stacked layout semantics |
| B5 trust | `FAQPage` identical and still generated from visible content; disclosures work without JS; contrast tokens (gap-as-text removed) |
| B6 conversion | Form contract check; `lead_form_*` sequences (start once; validation errors by field name/category; submitted on 2xx only; none on 4xx/5xx/network failure); `meeting_started` from every booking anchor; honeypot unchanged; error summary focus; input boundary ≥ 3:1; **E6 strongly recommended before acceptance** |
| B7 editorial | CMS fixtures incl. the research category; `CopyActions` clipboard behaviour; downloads; `ResearchReport`/`NewsArticle` identical; heading IDs |
| B8 article | Article/Breadcrumb/FAQ JSON-LD identical; TOC anchors; newsletter form submission path verified before change; image `alt` identical; reading-length review |
| B9 proof | Withheld fields absent in DOM **and** RSC payload; `LIVE-2` sentence identical (unless separately authorised); `noindex` for unknown slugs |
| B10 utility | `noindex` preserved; 404 status; legal text identical; `mailto`/`tel` values identical |
| B11 cleanup | Import graph shows no consumer of deleted files; CSS bytes before/after; full whole-site suite |

---

## 6. E1 — real-device and cross-browser plan

| Checkpoint | When | Scope | Purpose |
|---|---|---|---|
| **E1-a (early, recommended)** | After **B2** (global chrome + the first migrated capability pages) | Android Chrome, iPhone Safari, desktop Safari, desktop Firefox, VoiceOver (macOS) on: `/`, `/seo`, `/google-ads`, one legacy-body route (`/about`), one CMS route; menu, CTAs, display-font swap (Android fallback, X2), larger text, High Contrast | Catch shared-component defects (chrome, buttons, type, fallbacks) **before** they spread to 24 routes |
| E1-b (rolling) | After B6 (forms) and B8 (article) | `/contact` form on iOS/Android (keyboard, autofill, error summary, VoiceOver); a long article | The two most device-sensitive surfaces |
| **E1-c (mandatory, full)** | Before staging approval | Every register on every target; `GATE_3_FINAL_ACCEPTANCE.md` §2.1 checklist + §10.6 E1 additions | `DEC-036` condition |

Safari automation needs the owner to enable "Allow remote automation" (Gate 3 §2). Firefox is not installed. Neither is changed
by this plan.

## 7. E6 — GTM trigger validation plan

1. Owner exports the GTM container (or grants read access). **RESEARCH REQUIRED; owner action.**
2. Inventory every trigger and variable; classify: page-path based (safe), custom event `dataLayer` (safe if event names
   unchanged), click/link (safe if keyed on URL/text; **at risk** if keyed on CSS selectors, IDs, classes or element position),
   form submission (GTM's native form trigger depends on DOM submit events; the form uses `fetch`), element visibility, scroll depth.
3. For each at-risk trigger: map to the Direction C DOM; validate in GTM Preview against a local release-candidate build
   (consent accepted, `NEXT_PUBLIC_GTM_ID` set).
4. Outcome table: preserved / needs a container change (owner decision; a container change is outside the repository) /
   obsolete. **No application-side event or DOM hook may be added to satisfy a trigger without owner approval** (analytics LOCKED).

Timing: **before B6 acceptance** (forms and booking are the conversion triggers) and in all cases before staging.
