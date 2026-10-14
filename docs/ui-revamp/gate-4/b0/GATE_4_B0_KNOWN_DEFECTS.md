# Gate 4 · B0 — Known-Defects Register (baseline before B1)

| | |
|---|---|
| **Date** | 2026-10-08 (formalised at the B0 checkpoint) |
| **Baseline** | `ui-revamp` @ `352bb25` (application `23c937d`). Plain build `Njk8Lb5t9GSJ5FzVFuAJQ`, fixture build `ROOt5ByVDiOWDhQY7WFeT` |
| **Machine-readable** | [`../qa/known-defects.json`](../qa/known-defects.json). `classify.cjs` tags every baseline finding with one of these IDs |
| **Status of every item** | **Recorded, not fixed.** B0 changed no application behaviour. Closing an item needs its own authorisation and DEC ([`PROGRAMME_RISKS_AND_LIVE_ISSUES.md`](../../PROGRAMME_RISKS_AND_LIVE_ISSUES.md) § Closing an item) |

**How regressions are told apart from these.** Every check emits findings with a stable fingerprint (`check|target|width|key`).
A later batch is classified against this baseline:
- **KNOWN**: the fingerprint is in the baseline;
- **NEW**: the fingerprint is new. This fails the batch until it is explained;
- **RESOLVED**: the fingerprint has disappeared. The batch report must say whether that was intended.

An identical second run produced 0 NEW, 0 RESOLVED and 0 unregistered findings ([`evidence/validation/determinism.txt`](evidence/validation/determinism.txt)).
"Reproduce" commands assume the two B0 servers ([`QA_REGRESSION_RUNBOOK.md` §5.1](../../QA_REGRESSION_RUNBOOK.md)).

**Blocking key:**
- **B1** = blocks starting or accepting B1;
- **Stg** = must be resolved, or explicitly accepted by the owner, before staging approval (Gate 8);
- **Prod** = before production.

## 1. Summary

| ID | Short title | Pre-existing | Blocks B1 | Blocks staging | Blocks production | Resolution phase |
|---|---|---|---|---|---|---|
| **LIVE-1** | Legacy mobile-menu CTAs unreachable | Yes (`1557f74`) | No | **Yes** for any route still on legacy chrome; production fix separately authorised | **Yes**, until fixed on production | B1 retires the cause **on the branch**; production needs its own fix and DEC (`DEC-033`, owner path O4) |
| DEC-030-STICKY | Legacy header is sticky | Yes | No | Yes (with LIVE-1) | Yes (with LIVE-1) | B1 (branch) |
| LIVE-2 | Proof-copy contradiction | Yes | No | Owner decision (copy LOCKED) | Owner decision | Separately authorised wording; then B9 or a content fix |
| **KD-02** | Legacy focus ring lost in High Contrast | Yes | No | **Yes: remediation and retest gate defined below** | Yes | B1 (chrome), then B2–B10 (bodies), B6 (form) |
| KD-03 | `--resolve-gap` text contrast 3.13:1 | Yes | No | Yes | Yes | B4/B5 (migration) |
| KD-04 | Table scroll regions not focusable | Yes | No | Yes | Yes | B3, B4, B8, B9 (`DataTable`) |
| KD-05 | SVG figure text clipped under text spacing (Gate 3 A3) | Yes (A3 accepted as P3) | No | Owner-accepted P3 or fixed | Same | 4G `Figure` rule (B3/B4/B5) |
| KD-06 | Case page scrolls sideways at 320px with text spacing | Yes | No | Yes | Yes | B9 |
| KD-07 | Blog article skips heading levels | Yes | No | Yes (SEO review) | Yes | B8 |
| KD-08 | Legacy targets under 44px | Yes | No | Yes (WCAG 2.5.8 floor is 24px; programme floor is 44px) | Yes | B1 (chrome), batches (bodies) |
| KD-01 | Blog sidebar `sticky top-8` | Yes | No | Owner REVIEW decision | Same | B8 |
| **OBS-1** | `consent default` missing on dynamic not-found pages | Yes | No | **Yes: part of E6** | **Yes** | E6 investigation, then an owner decision; consent is LOCKED |
| OBS-2 | Gate 0 R2 1024 overflow not reproducible headless | Yes | No | E1 check | — | E1 |
| OBS-3 | Local canonicals/OG on `localhost:3000` | Not a defect | No | Verified on staging | — | Gate 7 |
| OBS-4 | `/press` → `page_type=other` | Behaviour as written | No | No | No | No action unless the owner changes the taxonomy |
| OBS-5 | No `data-*` analytics hooks anywhere | Fact | No (raises E6 priority) | Via E6 | — | E6 |

## 2. Detail

### LIVE-1 — Legacy mobile navigation: Contact Us / Book a call unreachable while the menu is open

| | |
|---|---|
| **Affected** | `components/layout/Header.tsx` (sticky, menu inside the header). **Every legacy-chrome target (31 of 34)**. Not `/`, `/services` or `/seo` |
| **Reproduce** | `node docs/ui-revamp/gate-4/qa/a11y.cjs --only about --out /tmp/a.json`. In fingerprints `menu-cta|*|390x700|/contact` and `…/schedule-call`, both at 390×700 and 320×568. Visual: [`gate-0-evidence/screenshots/defect-mobile-menu-sticky-header-390x700.jpg`](../../gate-0-evidence/screenshots/defect-mobile-menu-sticky-header-390x700.jpg) |
| **Count** | 124 findings in each of Chromium, WebKit and Firefox |
| **Impact** | The primary conversion path from navigation is unreachable on most phones until the page is scrolled to its end. WCAG 1.4.10 / 2.1.1 in practice. **Live on production** |
| **Pre-existing** | Yes: commit `1557f74`, recorded as a regression (`DEC-030`); tracked as LIVE-1 (`DEC-033`) |
| **Resolution phase** | **Branch:** B1 stops rendering the legacy header, so the fingerprints RESOLVE. **This does not close LIVE-1. Production:** the owner chooses path O4 (`GATE_4_CHROME_MIGRATION_STRATEGY.md` §6); note that a push to `main` deploys directly (PROC-1) |
| **Acceptance test** | (a) Branch: `classify.cjs` on B1 a11y shows every `menu-cta` fingerprint RESOLVED and none NEW, in three engines. (b) **Closure:** a production check at 390×700 and 320×568, where the menu's Contact Us and Book a call are in the viewport and reachable by Tab, recorded with its own DEC |
| **Blocks** | B1: no. Staging: no route may ship with the defect. Production: open until fixed there |

### KD-02 — Legacy focus indicators disappear in High Contrast (forced colours)

| | |
|---|---|
| **Affected** | Legacy components that use `outline-none` plus a Tailwind `ring` (a `box-shadow`). Forced colours removes box-shadows, so the indicator disappears. Affected: <br>• legacy header links, services toggle and menu button (`components/layout/Header.tsx`); <br>• `ContactForm` inputs, textarea and submit (`components/forms/ContactForm.tsx`, `components/ui/input.tsx`/`textarea.tsx`/`button.tsx`); <br>• blog share links and Copy Link, and case-study links and CTAs. <br>**Direction C controls are not affected:** they keep a real outline |
| **Reproduce** | `node docs/ui-revamp/gate-4/qa/a11y.cjs --only contact,about --out /tmp/a.json` (Chromium). Fingerprints `forced-colours-focus|<target>|<w>|<region:tag:href:name>`. Manual: Windows High Contrast, Tab through `/contact` |
| **Count** | 329 findings (Chromium; forced colours is emulated in Chromium only) |
| **Impact** | Keyboard users in High Contrast cannot see where focus is: in the header, and **on every enquiry-form field**. WCAG 2.4.7 (Focus Visible) in that mode |
| **Pre-existing** | Yes. Gate 0 §14 recorded "two focus treatments"; B0 is the first evidence of loss in forced colours |
| **Resolution phase** | **B1** for the chrome portion (`forced-colours-focus|*|*|header:*` RESOLVES). Bodies in their batches as they move to Direction C focus styles: B2–B5, **B6 for the form**, B7–B10. No standalone fix is authorised |
| **Acceptance test (remediation and retest gate)** | **Before staging approval:** <br>(1) `a11y.cjs` in Chromium on the release candidate has **zero `forced-colours-focus` findings** on all 34 targets; <br>(2) `classify.cjs` shows every KD-02 fingerprint RESOLVED and none NEW; <br>(3) the E1 pass includes a **real Windows High Contrast** Tab traversal of `/contact` and one capability page, with focus visible on every stop. <br>Anything left is an owner-accepted exception recorded in a DEC |
| **Blocks** | B1: no. **Staging: yes** (gate above). Production: yes |

### KD-03 — Small text in `--resolve-gap` fails contrast (3.13:1 on ground)

| | |
|---|---|
| **Affected** | `/about`, `/problems/traffic-but-no-enquiries`, `/how-it-works` (`components/routes/primitives.tsx` captions, `/about` notes) |
| **Reproduce** | `a11y.cjs --only about,problems,how-it-works` → `axe|*|*|color-contrast` (10 findings in each engine) |
| **Impact** | Low-vision readability; WCAG 1.4.3 |
| **Pre-existing** | Yes (Gate 0 §14) |
| **Resolution phase** | B4/B5. Migration to `--dc-gap-text` (4.90:1) |
| **Acceptance test** | Zero `color-contrast` axe violations on the migrated routes; the fingerprints RESOLVE |
| **Blocks** | Staging, production |

### KD-04 — Wide tables: scroll region not keyboard-focusable; table wider than viewport

| | |
|---|---|
| **Affected** | `/ai-seo` (`CrawlerTable`), `/pricing` (`FactorMatrix`), rich-text tables on `/blog/[slug]` and `/portfolio/[slug]` (fixtures) at ≤430px and 400% zoom |
| **Reproduce** | `layout.cjs --only ai-seo,pricing` (`contained:table*`) and `a11y.cjs` (`axe …scrollable-region-focusable`) |
| **Impact** | Keyboard users cannot scroll the hidden columns; WCAG 2.1.1. No page-level scroll |
| **Pre-existing** | Yes |
| **Resolution phase** | `DataTable` in B3 (`/ai-seo`), B4 (`/pricing`), B8 and B9 (rich-text tables) |
| **Acceptance test** | No `scrollable-region-focusable`. Either no contained overflow at 320px (stacked rows), or a focusable, labelled scroll region |
| **Blocks** | Staging, production |

### KD-05 — SVG figure text clipped under WCAG 1.4.12 text spacing

| | |
|---|---|
| **Affected** | Figures on `/seo` (approved route; Gate 3 **A3**), `/lead-generation`, `/conversion-optimization`, `/problems/…`, `/how-it-works`, at 320–390 |
| **Reproduce** | `layout.cjs --only seo` → `text-spacing|seo|390|contained:text` |
| **Impact** | With user text-spacing overrides, a few figure labels are cut by the SVG box. The figures have text alternatives nearby |
| **Pre-existing** | Yes; A3 is recorded as P3 in `GATE_3_FINAL_ACCEPTANCE.md` and accepted under `DEC-036` |
| **Resolution phase** | 4G `Figure` rule (B3/B4/B5), or an owner-accepted P3 |
| **Acceptance test** | No `contained:text` / `contained:g` under text spacing, or an explicit owner acceptance in the staging DEC |
| **Blocks** | Staging only if not accepted |

### KD-06 — Case-study page scrolls horizontally at 320px with text spacing

| | |
|---|---|
| **Affected** | `/portfolio/[slug]` (legacy; both fixtures). 8px page scroll |
| **Reproduce** | `layout.cjs --only portfolio-slug~fixture-open` → `text-spacing|…|320|page-scroll` |
| **Impact** | WCAG 1.4.10 / 1.4.12 at narrow widths with spacing overrides |
| **Pre-existing** | Yes |
| **Resolution phase** | B9 |
| **Acceptance test** | No `page-scroll` finding at any width or mode |
| **Blocks** | Staging, production |

### KD-07 — Blog article skips heading levels

| | |
|---|---|
| **Affected** | `/blog/[slug]` (legacy layout; both fixtures) |
| **Reproduce** | `layout.cjs --only blog-slug~fixture-full` → `headings|…|level-jump` |
| **Impact** | Screen-reader heading navigation; WCAG 1.3.1 (advisory) |
| **Pre-existing** | Yes |
| **Resolution phase** | B8. **A heading-level change needs SEO review** (headings are protected) |
| **Acceptance test** | No `level-jump`, with the SEO reviewer's sign-off recorded |
| **Blocks** | Staging, production |

### KD-08 — Legacy controls under 44px

| | |
|---|---|
| **Affected** | Legacy header nav (~31px), menu and services toggles, footer social icons (40px), legal contents anchors, breadcrumbs, share links, form checkbox |
| **Reproduce** | `layout.cjs` → `target-size|*` (2,625 findings across widths) |
| **Impact** | Touch accuracy. The programme floor is 44px; WCAG 2.5.8 requires 24px |
| **Pre-existing** | Yes (Gate 0 §14) |
| **Resolution phase** | B1 (chrome: `header:*` / `footer:*` RESOLVE); bodies in their batches |
| **Acceptance test** | No `target-size` findings outside inline links in running text |
| **Blocks** | Staging, production |

### KD-01 — Blog article sidebar is `sticky top-8`

| | |
|---|---|
| **Affected** | `/blog/[slug]` (`StickySidebarCTA` wrapper) |
| **Reproduce** | `layout.cjs` → `pinned|blog-slug*|*|div.sticky.top-8:sticky` |
| **Impact** | Conflicts with the Resolve "0 sticky" budget (`DEC-018`). Behaviour is otherwise benign |
| **Pre-existing** | Yes |
| **Resolution phase** | B8 REVIEW item (owner decision O9) |
| **Acceptance test** | Owner decision recorded; if retired, no `pinned` finding |
| **Blocks** | Owner decision before staging |

### OBS-1 — `consent default` never reaches `dataLayer` on dynamically rendered not-found pages

| | |
|---|---|
| **Affected** | Responses rendered by `notFound()` at request time: unknown `/blog/*`, `/portfolio/*`, `/research/*` and `/press/*` slugs, and `/launch-checklist` while gated. **Not** the static 404 (`/b0-no-such-page`), which is correct. Mechanism: the inline bootstrap from `app/layout.tsx` exists only inside the RSC payload in these responses, so the browser never executes it. Script inserted by React on the client does not run |
| **Reproduce** | (1) `inventory.json`: `consentBootstrap.present = false` on those 5 targets. (2) Load `http://localhost:3510/blog/b0-no-such-post` in a fresh profile and evaluate `dataLayer`. Result: `[page_view]` with no `["consent","default",…]`. `/b0-no-such-page` returns `[["consent","default",…], page_view]` |
| **Impact** | On those pages Google Consent Mode has no default state. GTM loads only after an explicit "granted" (two-gate loader), so the practical exposure is **WORKING HYPOTHESIS: low**. But the documented contract ("consent default first, on every page") is not met there |
| **Pre-existing** | Yes. Present at `352bb25`; B0 changed nothing |
| **Resolution phase** | **E6 investigation (mandatory before staging).** Confirm the container's consent settings and the effect on not-found traffic, then an owner decision. Any code change touches LOCKED consent and needs separate authorisation. **Not changed at this checkpoint** |
| **Acceptance test** | After an owner-approved resolution, `inventory.cjs` shows `consentBootstrap.present = true` on every target, including the 5 dynamic not-found targets, and a fresh-profile `dataLayer` probe shows `consent default` first. Or an owner DEC accepts the behaviour |
| **Blocks** | B1: no. **Staging: yes** (as part of E6). Production: yes |

### OBS-2 … OBS-5

| ID | Observation | Reproduce | Disposition |
|---|---|---|---|
| OBS-2 | Gate 0 R2 (legacy header overflow at 1024) is not reproducible headless: overlay scrollbars leave the full 1024 CSS px | — | E1 check with a classic-scrollbar desktop browser; moot after B1 |
| OBS-3 | Canonical, `og:url` and `og:image` hosts are `http://localhost:3000` locally (`NEXT_PUBLIC_SITE_URL` in `.env.local`) | `inventory.json` meta | Not a defect. Comparisons are build-to-build. Production hosts are verified on staging (Gate 7) |
| OBS-4 | `/press` reports `page_type = other`; `pageTypeOf` has no press type | `analytics-forms.json` | As written in `lib/analytics.ts`; recorded so that no batch changes it silently |
| OBS-5 | No `data-*` analytics hooks anywhere in the rendered site (34 targets) | `inventory.json` `analyticsAttrs` | GTM DOM triggers can only use classes, IDs, `href`, text or position. **That raises E6's importance for B1** |

## 3. Register maintenance

- A batch that **resolves** an item records it in its report and DEC, and updates this register's status.
- `known-defects.json` patterns are narrowed, never broadened, to absorb a new finding.
- A **NEW** finding is never added to make a run pass. It is fixed, or the owner accepts it in that batch's DEC, and only then is it registered.

## 4. Status after Gate 4 B1 (2026-10-08, `DEC-037`) — branch `ui-revamp` only

Evidence: [`../b1/evidence/run/`](../b1/evidence/run/). Report: [`../../GATE_4_B1_GLOBAL_CHROME.md`](../../GATE_4_B1_GLOBAL_CHROME.md).
**No item below is CLOSED.** "Resolved on the branch" means the fingerprints are absent from the B1 run. **Production is unchanged.**

| ID | After B1 (branch) | Evidence | Still blocks |
|---|---|---|---|
| **LIVE-1** | **Condition eliminated on the branch.** All 124 `menu-cta` fingerprints RESOLVED in Chromium, WebKit and Firefox. The menu's Contact Us / Book a call come first and are in view at 390×700 and 320×568 on all 34 targets (`nav-*.txt` M2) | `classify-a11y-*.txt`, `nav-*.json` | **Production: OPEN** (`DEC-033`/`DEC-037`). Needs a separate production decision and evidence |
| DEC-030-STICKY | Resolved on the branch: 217 `pinned` fingerprints per engine RESOLVED; header `position: relative` everywhere | `classify-layout-*.txt` | Production (with LIVE-1) |
| **KD-02** | **Chrome part resolved; body part OPEN.** 0 header/footer stops lose focus in forced colours. A full-page walk on all 34 targets (Chromium) finds **66 body stops** still losing it: `/contact` form (7 per width), blog articles (8), case studies (2), `/privacy-policy` and `/terms` (3 each). **Correction:** B0's a11y check samples only the first 12 Tab stops in forced colours, so B0 under-counted body instances; the legal pages were never sampled. The two Chromium body fingerprints classified RESOLVED (`blog-slug~fixture-*@390`) are a sampling-window artefact, **not fixes**: the full walk shows the identical lost-focus set before and after (`forced-colours-fullwalk-blog.txt`) | `forced-colours-fullwalk-all.txt` | **Staging** (gate unchanged: zero findings on a **full** walk + real Windows High Contrast) |
| KD-08 | Chrome part resolved: header/footer `target-size` fingerprints RESOLVED. Body targets unchanged (KNOWN) | `classify-layout-*.txt` | Staging |
| KD-01, KD-03 … KD-07 | Unchanged (KNOWN in every engine) | — | as §1 |
| **OBS-1** | Unchanged (served HTML identical before and after). **Extended:** on the same dynamically rendered not-found responses, the `Organization` JSON-LD and the stylesheet links are also only inside the RSC payload, not in the served `<head>`. Same mechanism | `served-head-plain.txt`, `bytes.txt` | Staging (E6) |
| **OBS-6 (new, pre-existing)** | On dynamically rendered not-found pages, the **live-DOM** `<title>`, robots and canonical depend on server timing. "Page Not Found \| MappedSkills" + `noindex` + canonical `/404` usually wins; the route's own `generateMetadata` ("Blog Post Not Found", `noindex, nofollow`, no canonical) wins when it resolves late. The **B0 fixture build shows the latter deterministically**. One B1 run, on a freshly started server under suite load, showed it on the plain build; 10 later runs (4 B0, 6 B1) did not. **Served HTML is identical** in B0 and B1 (34/34) | `notfound-metadata-variance.txt`, `inventory-diff-run1.txt`, `served-head-*.txt` | No B1 impact. Both variants are `noindex`. Owner/SEO note for staging; the harness now also compares served `<head>` (`served-head.cjs`) |

**Harness limitations found in B1 (no baseline value was changed):**
- B0's recorded `<main>` hashes for legacy-chrome targets include the **65px sticky header painted over the top of `<main>`**. The element screenshot scrolls `<main>` into view, and the sticky header overlaps it. Those hashes are not comparable after any chrome change.
  - B1 therefore proves page bodies with a **live two-build comparison** (`--mask-chrome --align`): 68/68 identical.
  - B1 records new masked hashes (`pixel-main-hashes-masked.json`) for later batches.
- The a11y forced-colours check samples the first 12 Tab stops. That is enough to catch chrome loss, but not body loss. **From B2, the KD-02 acceptance uses the full-walk evidence**, not that sample.

## 5. E6 audit findings (2026-10-08) — recorded, nothing closed

Report: [`../../GATE_4_E6_GTM_CONSENT_AUDIT.md`](../../GATE_4_E6_GTM_CONSENT_AUDIT.md). Evidence: [`../e6/evidence/`](../e6/evidence/).

| ID | Finding | Status |
|---|---|---|
| **OBS-1** | Mechanism confirmed. Segment-level `notFound()` responses are ISR/prerender cache entries whose document is `<html id="__next_error__">`. React inserts the bootstrap into the live DOM, but it is not executed. The same shell is served on production | **OPEN** (E6) |
| **E6-A1** (extends OBS-1) | A returning accepted visitor on those pages gets the container loaded with **0 consent commands**, which persists into `/contact`. The B0 assessment "practical exposure low" does not hold for that case | **OPEN**, High. Owner decision |
| **OBS-6** | Over 10 loads × 3 engines: blog/portfolio/research/press show "Page Not Found" 10/10 (variance not reproduced). **`/launch-checklist` deterministically shows the root fallback title and no canonical in the live DOM.** All variants are 404 + `noindex` | **OPEN**, SEO note |

**Update (2026-10-08, `DEC-038`):** the R1 safeguard is implemented and accepted locally on `ui-revamp`. On route-level 404s the container now reads `consent default` first in every state that loads it (3 engines). **E6-A1 stays open until production is fixed. OBS-1 and OBS-6 are unchanged.** `consentBootstrap.present = false` still holds on the 5 targets, where no container loads (R2 scope). Report: [`../e6/E6_R1_IMPLEMENTATION_ACCEPTANCE.md`](../e6/E6_R1_IMPLEMENTATION_ACCEPTANCE.md).

## 6. Status after Gate 4 B2 (2026-10-08, `DEC-039`) — branch `ui-revamp` only

B2 migrated the `/google-ads` and `/social-media-ads` bodies. Classified against the B1 run: **0 NEW, 0 RESOLVED** in layout and a11y,
in three engines (B1 recorded no findings on either route). Nothing in §1–§5 is closed by B2.

| ID | Status after B2 |
|---|---|
| **OBS-6** | Reproduced again on fresh servers: the live-DOM title/robots/canonical on dynamic not-found pages differed from the B1 run. **The pre-B2 HEAD build shows the identical variant (3/3 runs)**; served HTML 34/34 identical. Pre-existing, not B2 (`gate-4/b2/evidence/run/obs6-control.txt`) |
| **OBS-7 (new, pre-existing, approved route)** | Below 900px, the Direction C "reverse" pair in DOM order `dc-c-rev-main` → `dc-c-rev-side` stacks with **0px** between the columns. Measured on the approved `/services` boundary at 390 (owned paragraphs, then "we do not promise", touching). Not changed: the `/services` body is protected. B2 uses an opt-in helper (`.dc-after-main`), so a fix for `/services` is a one-class change needing owner approval |
| **OBS-8 (new, pre-existing, approved route)** | `/seo` at 320: the horizon plate's `dt` row terms render at **11.52px** (below the 12px figure-text floor used for B3 figures, X5 class). Found by the B2 control run of `route-a11y-motion.cjs`. Not changed: approved body. B2 routes: minimum 12.48px |
| **OBS-9 (new, pre-existing, approved shared motion)** | `DcMotion` releases a below-fold `.dc-pre` target on `beforeprint` by removing the class, so the close's arrival marks **transition** to their final state (~800ms) instead of switching. Measured opacity at `beforeprint`: 0 in Chromium and WebKit, 1 in Firefox; 1.00 after 800ms in all, on `/seo`, `/google-ads` and `/social-media-ads` alike (`gate-4/b2/evidence/run/print-timing-probe.txt`). An immediate print could show the decorative (`aria-hidden`) marks faded; no text is affected. Whether real print snapshots mid-transition is **RESEARCH REQUIRED** (an E1 print item). Not changed in B2: shared, approved code. Proposed fix (owner approval): a print-only `@media print { .dc * { transition: none !important } }` |
| E6 DOM note | B2 replaces every body class on the two routes and adds an `aria-hidden` span inside each CTA and tertiary link (`gate-4/b2/evidence/run/gtm-dom-dependency-inventory.txt`). There were no IDs or `data-*` hooks to lose (OBS-5). Any GTM Click Classes / Click Text / All Elements trigger on these routes must be checked in E6 |

## 7. Status after Gate 4 E1-a (2026-10-08) — verification only, branch `ui-revamp` @ `146a892`

Report: [`../../GATE_4_E1A_DEVICE_CHECKPOINT.md`](../../GATE_4_E1A_DEVICE_CHECKPOINT.md). Evidence: [`../e1a/evidence/`](../e1a/evidence/).
**Nothing is closed.** Only real desktop Safari 26.2 (rendering only) was available; every other result is an engine proxy.

| ID | Status after E1-a |
|---|---|
| LIVE-1 | Branch condition holds (nav M2/M3/M5, 10 targets × 3 engines, 0 findings). Not tested on a phone. **OPEN** |
| KD-02 | Body counts unchanged on a full forced-colours walk: `/contact` 7, `/privacy-policy` 3, blog article 8 per width; 0 on the five DC bodies. Real Windows HC not available. **OPEN** |
| OBS-7 | Confirmed in Chromium, WebKit and Firefox: `/services` reverse pair 0px at 320/390/768 |
| OBS-8 | **Scope corrected:** the `/seo` horizon-plate `dt` terms are 11.52px at **every** width (320–1440), not only at 320 |
| OBS-9 | Reproduced exactly (0 at `beforeprint` in Chromium/WebKit, 1 in Firefox; settled 1). Real print not tested |
| **OBS-10 (new, pre-existing, approved route)** | `/`: `.dc-pre .dc-chain .dc-boundary { opacity: 0 }` (`app/direction-c-pages.css:379`) hides the text "We answer for this much" until the reveal. M2 fails in 3 engines. Contradicts `GATE_4_MOTION_SPECIFICATION.md` §4 ("no text node is ever hidden"). Text stays in the DOM; no-JS and reduced motion are composed. Proposed fix needs owner approval |
| **OBS-11 (new, harness)** | Playwright WebKit renders the display face ~5% wider than real Safari 26.2 (H1 ink 601 vs 564.5 CSS px; Chromium/Firefox 574), so WebKit-proxy H1 wraps (e.g. `/seo`, `/social-media-ads` at 390: 3 lines vs 2) are not authoritative. iOS not established |
| **OBS-12 (new, pre-existing, approved route)** | `/` chain and proof labels at 11.84px at every width. No adopted floor for HTML labels; recorded for the B3 small-text decision with X5 and OBS-8 |
| **PROC-E1A-1 (new, process)** | The B2 visual comparison images (45/45 present) have no capture script in the repository |
| G4-1 | Re-observed in real Safari on `/contact`, `/privacy-policy`, blog article (known, acknowledged) |

## 8. Status after Gate 4 B3 (2026-10-09, `DEC-040`) — branch `ui-revamp` only

Report: [`../../GATE_4_B3_SERVICE_PAGES.md`](../../GATE_4_B3_SERVICE_PAGES.md). Evidence: [`../b3/evidence/`](../b3/evidence/).
B3 migrated `/ai-seo`, `/lead-generation` and `/conversion-optimization`. Classified against the B2 run: layout **NEW 0** (Chromium,
WebKit) / **NEW 1** (Firefox: the dynamic-404 `h1-count` timing flake, present in the B2 record at 768, not B3), a11y **NEW 0**, in three
engines. **Nothing below is CLOSED. Production is unchanged.**

| ID | Status after B3 |
|---|---|
| **KD-04** | **Resolved on the branch for `/ai-seo` only.** Every original fingerprint is RESOLVED in 3 engines (`overflow` @320/360/390/430, `text-spacing` @320/360/390, `zoom400` @320, axe `scrollable-region-focusable` @390). Acceptance test met: `DataTable` stacks below 600px — 0 scroll regions and 0 overflow at every width incl. 200%/400% and text spacing (`b3/evidence/run/datatable-*.txt`; the pre-B3 build reproduces the defect, `datatable-before-chromium.txt`). **OPEN** for `/pricing` (B4) and blog/portfolio rich-text tables (B8/B9). Not tested with a real screen reader (E1) |
| KD-05 / X5 | Unchanged on `/lead-generation` and `/conversion-optimization`: the inherited SVG figures are reused without redraw; `contained:text` @320/360/390 KNOWN in 3 engines; rendered SVG text 10.47px @320, 11.93px @360. R-3 (text floor) still an owner decision |
| OBS-6 | Re-observed during the loaded suite run (four dynamic not-found pages, live DOM); quiescent run and served HTML identical. Pre-existing |
| OBS-8 | Re-observed as the `/seo` control in `route-a11y-motion.cjs` (11.52px), 3 engines. Unchanged |
| OBS-9 | Re-observed on all three B3 routes and `/seo` (0 at `beforeprint` in Chromium/WebKit, 1 in Firefox). Unchanged |
| **OBS-13 (new record, pre-existing)** | The space after a bold run is missing in the rendered text in 5 places: `/lead-generation` ("the work.Fit", "came from.An", "wrong ones— job", "deleted— and") and `/conversion-optimization` ("threshold:research"). Served HTML byte-identical before and after B3. Source has a normal space; in all 9 bold runs on these routes the space is lost exactly when the following JSX text spans a newline and contains an HTML entity — WORKING HYPOTHESIS. Not fixed (visible text change; owner approval). Evidence `b3/evidence/run/bold-whitespace-obs13.txt` |
| **OBS-14 (new record, pre-existing)** | Inherited `ChainTerminus` SVG at ≤390px: the label "no usable trail — it still counts" is crossed by the figure's own spine. Identical before B3 (`b3/evidence/visual/before|after/lead-generation-390-2-mid-a.jpg`). Not changed (no redraw) |
| Focus-outline transition (note) | Links carry a 150ms colour transition that includes `outline-color`; a focus outline sampled immediately is 50% alpha, settling to solid 3px ink. Shared approved CSS, identical on `/seo` and `/google-ads` (`b3/evidence/run/focus-outline-transition.txt`). Not a defect on current evidence; real forced-colours/HC is an E1 item |
| E6 DOM note | B3 replaces every body class on the three routes, adds section IDs `dc-ai-*`/`dc-lg-*`/`dc-co-*`, an `aria-hidden` span in each CTA, and changes the `/lead-generation` tertiary link's Click Text (arrow appended; name and `href` unchanged) (`b3/evidence/run/gtm-dom-dependency-inventory.txt`). Container check remains E6 |
| E1, E6, OBS-1, LIVE-1, LIVE-2, KD-02, PROC-1 | **OPEN**, unchanged |

## 9. Status after Gate 4 B4 (2026-10-09, `DEC-041`) — branch `ui-revamp` only

Report: [`../../GATE_4_B4_DECISION_PAGES.md`](../../GATE_4_B4_DECISION_PAGES.md). Evidence: [`../b4/evidence/`](../b4/evidence/).
B4 migrated `/problems/traffic-but-no-enquiries` and `/pricing`. Classified against the B3 run: layout and a11y **NEW 0** in Chromium, WebKit and
Firefox. **Nothing below is CLOSED. Production is unchanged.**

| ID | Status after B4 |
|---|---|
| **KD-04** | **Resolved on the branch for `/pricing`** (as for `/ai-seo` in B3). Every original fingerprint RESOLVED in 3 engines (`overflow` @320/360/390/430, `text-spacing` @320/360/390, `zoom400` @320, axe `scrollable-region-focusable` @390). Acceptance: `DataTable` stacks below 600px — 0 scroll regions, 0 overflow, 0 focusable at all 8 views incl. 200%/400% and text spacing, 3 engines (`b4/evidence/run/datatable-*.txt`; before: 10 failures, `b4/evidence/baseline/datatable-before-chromium.txt`). **OPEN** for blog/portfolio rich-text tables (B8/B9). No real screen reader (E1) |
| KD-03 | The `/problems` instance (legacy "Problems" breadcrumb label in `--resolve-gap`, axe `color-contrast` @390/1440) RESOLVED in 3 engines: the Direction C label uses `--dc-gap-text` (4.90:1). KD-03 open on other legacy routes |
| KD-05 / X5 | Unchanged on `/problems`: `CauseZones` reused without redraw; `contained:text` @320/360/390 KNOWN × 3; rendered SVG text 9.6px @320, 10.93 @360, 11.93 @390, 10.23 @768. Under the owner's R-3 working rule this stays a documented inherited exception |
| OBS-6 | Dynamic / not-found pages: streamed payload length varies between server instances (head, title, robots identical) — `b4/evidence/run/dynamic-pages-build-variance.txt`. Pre-existing family |
| OBS-8, OBS-9 | Re-observed (`/seo` control; OBS-9 on `/pricing`'s shared close). Unchanged |
| **OBS-13 (instance added)** | `/problems` check 2 outcome: "proof of delivery.A form" — served HTML identical before/after B4; same JSX-newline-plus-entity pattern. 6 known instances. Not fixed (visible text; owner approval) |
| **OBS-15 (new)** | Firefox `nav-checks` M5 "banner shown false" intermittently on non-B4 routes (B4 build 3, 1, 0, 0 findings in four full runs; before build 0 ×4; targeted 0/8; isolated 0/240 loads). Banner never covering the menu. Not reproducible as a B4 regression, not proven unrelated. WORKING HYPOTHESIS: suite-load timing (banner read at `networkidle` with no wait) — `b4/evidence/run/firefox-nav-m5-summary.txt` |
| **OBS-16 (new, performance)** | The shared Direction C primitives module references the `ScopeDisclosure` client component, so every DC route downloads its chunk (~1.1 KB raw) even when no disclosure renders (measured on `/problems`). Candidate module split; not in B4 scope |
| E6 DOM note | B4 replaces every body class on both routes, adds section IDs `dc-pb-*`/`dc-pr-*`, an `aria-hidden` span in each CTA, and changes the Click Text of three `/how-it-works` links (arrow appended; name and `href` unchanged) — `b4/evidence/run/gtm-dom-dependency-diff.txt`. Container check remains E6 |
| E1, E6, OBS-1, LIVE-1, LIVE-2, KD-02, PROC-1 | **OPEN**, unchanged |

## 10. Status after Gate 4 B4 owner closure (2026-10-09, `DEC-042`) — branch `ui-revamp` only

Report: [`../../GATE_4_B4_OWNER_CLOSURE.md`](../../GATE_4_B4_OWNER_CLOSURE.md). Evidence: [`../b4/closure/evidence/`](../b4/closure/evidence/).
B4 is owner-accepted with exceptions. The closure pass changed only OBS-13 whitespace. Classified against the B4 run: layout and a11y
**NEW 0 · RESOLVED 0** in Chromium, WebKit and Firefox. **Production is unchanged.**

| ID | Status after the closure pass |
|---|---|
| **OBS-13** | **The seven owner-approved instances are CORRECTED on the branch** (`DEC-042` decision 2): 4 on `/lead-generation`, 1 on `/conversion-optimization`, 2 on `/problems/traffic-but-no-enquiries` (incl. the `CauseZones` caption, which also fixes the figure's accessible name). Root cause verified in the compiled output: the JSX compiler drops the leading space of a text child that follows a closing inline tag when that text spans a line break and contains an HTML entity; the correction is an explicit `{' '}` (`b4/closure/evidence/OBS13_INVENTORY.md`, `obs13-{before,after}.txt`). **OBS-13 stays OPEN** for one further candidate found by the same scan and **not** in the approved seven: `/how-it-works` "AI search**occupies**" (a B5 route; not changed) |
| **KD-09 (new)** | **Inherited SVG figure text below the 12px R-3 floor.** `CauseZones` (`/problems`): 9.60px @320, 10.93 @360, 11.93 @390, 10.23 @768 (24–25 items); B3 chain figures: `/conversion-optimization` and `/lead-generation` 10.47px @320, 11.93 @360; approved `/seo` figure 11.52px @320. Previously carried as the KD-05/X5 note; now a defect in its own right. **Deferred** (`DEC-042` decision 3). Not detectable by axe. Evidence: `b4/closure/evidence/figure-svg-text.txt` |
| **KD-10 (new)** | **Inherited SVG figure text below WCAG 2.x AA contrast.** Text filled with `--resolve-gap` (#8E8798) measures **3.41:1** on the Direction C ground (`/problems`, `/conversion-optimization`, `/lead-generation`) and **3.13:1** on the approved `/seo` figure; the `CauseZones` tangerine-deep zone titles (#D94400) **4.33:1**. Present at every width. Method: computed `fill` (composited with opacity) vs the nearest opaque ancestor background, WCAG relative luminance. **axe-core does not evaluate SVG `<text>`**, so clean axe runs do not cover it. **Deferred** with KD-09 to one figure-remediation batch (all inherited figures) |
| **OBS-17 (new, systemic, pre-existing)** | **WebKit ignores `font-variation-settings: "opsz" 96/72` on the Direction C display roles** while `font-optical-sizing` is `auto` (the default). Measured in **real Safari 26.2 (macOS 15.7.3)** and in Playwright WebKit, identically: the face renders at an optical size near its font size, ~9% wider than the opsz-96 design and its calibrated fallback. Consequence: in WebKit the H1 can gain a line when the display face swaps in. B4 routes: 5 of 10 views (`/pricing` 390/430, `/problems` 320/360/768), +31–46px, approximate layout-shift score 0.009–0.021; earlier Direction C routes: 8 of 40 views. Chromium: 0. Occurs only when the face arrives after first paint. Candidate correction (`font-optical-sizing: none` on the display roles) verified **by injection only** in real Safari: 10/10 views then match the fallback and Chromium. **Not applied; owner decision.** Evidence: `b4/closure/evidence/webkit/` |
| OBS-11 | **Unchanged, but read with OBS-17.** OBS-11's interpretation (Playwright WebKit wraps differently because it draws the face wider than real Safari) is not supported for the B4 H1s at 320–768px: real Safari 26.2 and Playwright WebKit produced identical widths and line breaks there. The two measurements differ in route, size (62.4px desktop vs 32–47.6px) and method; reconciling them is an open question, not a reclassification |
| KD-05 / X5 | Unchanged (text-spacing clipping of SVG text). The size aspect is now tracked as KD-09 |
| OBS-15, OBS-16 | **OPEN**, unchanged, not re-tested. OBS-16: no performance refactor authorised (`DEC-042`) |
| E1 | **OPEN.** No VoiceOver/TalkBack test was possible in this environment; `DEC-042` makes the manual pass a prerequisite for B5 reuse of the DataTable (mobile), `Sequence`, the `/problems` crumb and `NotPromised` |
| E6, OBS-1, OBS-6, LIVE-1, LIVE-2, KD-02, PROC-1 | **OPEN**, unchanged |

## 11. Status after the Gate 4 post-B4 remediation (2026-10-09, `DEC-043`) — branch `ui-revamp` only

Report: [`../../GATE_4_POST_B4_REMEDIATION.md`](../../GATE_4_POST_B4_REMEDIATION.md). Evidence: [`../post-b4/evidence/`](../post-b4/evidence/).
Two application changes only: `font-optical-sizing: none` on `.dc-display` / `.dc-statement`, and one space on `/how-it-works`. Classified against the
B4 closure run: layout and a11y **NEW 0 · RESOLVED 0** in Chromium, WebKit and Firefox. Served head 34/34; analytics 0 diffs. **Production is unchanged.**

| ID | Status after the remediation pass |
|---|---|
| **OBS-17** | **CORRECTED ON THE BRANCH AND VERIFIED; closure recommended, owner to confirm.** Real Safari 26.2 (macOS 15.7.3), 10 Direction C routes × 7 widths: H1 swap re-wraps **16 → 0** of 70; final H1 lines = Chromium **70/70** (was 54/70); no overflow or clipping. Playwright WebKit delayed swap: views above 0.01 **8 → 0**, max shift 61 → 1 px. Chromium and Firefox final and fallback renders identical before and after. Seven below-the-fold statement re-wraps remain, identical in every engine before and after (Chromium calibration; `layout-shift` 0) — not OBS-17. iOS Safari not tested (E1) |
| **OBS-13** | **All eight approved instances CORRECTED ON THE BRANCH; closure recommended, owner to confirm.** The eighth (`/how-it-works` "AI search occupies") verified in served HTML, live DOM ×3 engines and `innerText`; `<main>` text = before + one space; no wrapping consequence at 7 widths × 3 engines. `obs13-probe.cjs --scan`: 7/7 earlier corrections hold; **0 candidates** on the 17 scanned static routes (CMS-driven pages not scanned) |
| **OBS-18 (new, pre-existing)** | **Playwright Firefox skips the calibrated display fallbacks while the display face is loading** and paints the roles in Arial Narrow (the `local()` fallback faces stay `unloaded`); when the face arrives late, H1s re-wrap: 27 of 70 views move, 19 above an approximate 0.01, max ≈ 0.041, first CTA up to 157 px. With the face blocked for good the calibrated fallback is used (0 re-wraps). Identical before and after `DEC-043`. Real Firefox not tested (**RESEARCH REQUIRED**). Not fixed: changing the fallback strategy is outside `DEC-043` — owner decision. Evidence: `post-b4/evidence/firefox-swap-probe.txt`, `sweep/obs17-swap-*-firefox.txt` |
| **KD-09 / KD-10** | **OPEN, deferred** (`DEC-043` decision 3) to a dedicated remediation batch **required before production approval**. No diagram changed. The route check still reports 11 px SVG text on `/problems` and `/how-it-works`; axe still cannot see either defect |
| OBS-11 | Unchanged as a record. Additional evidence: real Safari and Playwright WebKit agree on all 70 H1 line counts (320–1440) before and after the correction |
| E1 | **OPEN.** No VoiceOver/TalkBack test performed; SR-1 – SR-5 remain mandatory before B5 reuses the stacked `DataTable`, `Sequence`, the `/problems` crumb and `NotPromised` (`DEC-042`, `DEC-043`) |
| E6, OBS-1, OBS-6, OBS-15, OBS-16, LIVE-1, LIVE-2, KD-02, KD-05, PROC-1 | **OPEN**, unchanged |

## 12. Status after the post-B4 closure and OBS-18 Firefox diagnostic (2026-10-09, `DEC-044`) — branch `ui-revamp` only

Report: [`../../GATE_4_OBS18_FIREFOX_DIAGNOSTIC.md`](../../GATE_4_OBS18_FIREFOX_DIAGNOSTIC.md). Evidence: [`../obs18/evidence/`](../obs18/evidence/).
Governance and diagnostics only: **no application, CSS, font-asset or tooling change.** The post-B4 remediation gate is **owner-accepted with exceptions**.
Sections 1–11 are unchanged history. **Production is unchanged.**

| ID | Status after `DEC-044` |
|---|---|
| **OBS-17** | **CLOSED for the verified scope** (`DEC-044` B). Correction `font-optical-sizing: none` on `.dc-display` and `.dc-statement` (`0e8df27`); verified in real Safari 26.2 (macOS 15.7.3) and Playwright WebKit on the 10 Direction C routes at 320–1440 px (§11). **Not verified on iOS Safari, iPhone or iPad (E1).** This closure does not close OBS-18 or any other font-loading observation |
| **OBS-13** | **The eight verified instances CLOSED** (`DEC-044` C): `/lead-generation` ×4, `/conversion-optimization` ×1, `/problems/traffic-but-no-enquiries` ×2 (`98cfc82`); `/how-it-works` ×1 (`0e8df27`). The candidate scan found 0 further instances on 17 static routes; CMS-driven pages were not scanned. **Not a claim that every whitespace defect site-wide is excluded**; any new instance is a new record |
| **OBS-18** | **OPEN — diagnostic classification D. UNVERIFIED** (no real Firefox available; nothing installed). Mechanism identified in Gecko source (a later `@font-face` — our `local()` calibrated fallback — is not loaded while an earlier one is loading) and reproduced in Playwright Firefox 153.0 only: late face deterministic (27/70 views move, 19 above an approximate 0.01, max ≈ 0.041); normal loopback loading: Arial Narrow painted for 12–53 ms in about half of loads; Chromium and WebKit unaffected. Not a Playwright artefact on the evidence available (no font-code patch; no change without request interception). Runtime-only probes that load the calibrated faces first remove every re-wrap (0/70). **Not fixed**; next step real-Firefox verification (owner decision) |
| **KD-09 / KD-10** | **OPEN, deferred** to the dedicated pre-production remediation batch (`DEC-043`, `DEC-044` F). Unchanged |
| **E1** | **OPEN.** iOS/real-device verification not performed; **SR-1 – SR-5 remain mandatory before B5 reuses** the four affected components (`DEC-042` – `DEC-044`) |
| **TOOL-1 (record, not a product defect)** | `gate-4/qa/pixel-main.cjs` launches Chromium whatever `--engine` requests (line 80). **Correction deferred** (`DEC-044` E); not edited |
| E6, OBS-1, OBS-6, OBS-11, OBS-15, OBS-16, LIVE-1, LIVE-2, KD-02, KD-05, PROC-1 | **OPEN**, unchanged |

## 13. Status after the OBS-18 real-Firefox verification (2026-10-09, `DEC-045`) — branch `ui-revamp` only

Report: [`../../GATE_4_OBS18_REAL_FIREFOX_VERIFICATION.md`](../../GATE_4_OBS18_REAL_FIREFOX_VERIFICATION.md). Evidence: [`../obs18-real-firefox/evidence/`](../obs18-real-firefox/evidence/).
Diagnostics only: **no application, CSS, font-asset or tooling change.** Browser: official Firefox 157.0.1 (release). Sections 1–12 are unchanged history. **Production is unchanged.**

| ID | Status after `DEC-045` |
|---|---|
| **OBS-18** | **OPEN — CONFIRMED IN OFFICIAL FIREFOX 157.0.1; recommended classification A (confirmed real-Firefox defect).** While `dcDisplay` loads, the calibrated `local()` fallback stays `unloaded` and the display roles are laid out in Arial Narrow (every painted pending run). Late face (300 ms / 2.5 s): deterministic; 7/21 key views and 24/63 views on all Direction C routes change H1 lines; max ≈ 0.041 (geometric approximation, not native CLS); visible CTA moves up to 78 px. Normal cold loopback loads: pending face painted in 16/61 (≈ 16 ms), H1 re-wraps in 6 views. Playwright Firefox 153 representative; Chromium unaffected. **Not fixed.** A runtime-only candidate (in-flow hidden priming spans) removes every H1 re-wrap with no accessibility-tree, focus or layout difference and without JavaScript; correction requires a separate owner decision |
| **OBS-18 — correction to §12** | §12 and `GATE_4_OBS18_FIREFOX_DIAGNOSTIC.md` stated that runtime priming removed every re-wrap (0/70). That measurement could not see a first frame already laid out in Arial Narrow. Re-measured: the **out-of-flow** priming form is unreliable (Arial Narrow still painted first in 8/9 normal and 8/28 300-ms real-Firefox runs); the **in-flow** form is effective. §12 is left unchanged as history |
| **OBS-19 (new)** | **OPEN, new observation, RESEARCH REQUIRED.** The site faces loaded by `next/font/google` (`Manrope`, `Bricolage Grotesque`) declare automatic fallbacks as `local("Arial")` @font-face (`"Manrope Fallback"`, `"Bricolage Grotesque Fallback"`), which meet the same Gecko rule. Playwright Firefox ties lede/CTA moves of 29–54 px to Manrope's arrival; real Firefox shows non-H1 moves in the same views (up to ≈ 0.018; attribution not separately verified in real Firefox); Chromium none. Potentially every route. Not fixed; owner decision |
| OBS-17, OBS-13 | CLOSED within their verified scope (`DEC-044`) — unchanged |
| **KD-09 / KD-10** | **OPEN, deferred** to the dedicated pre-production accessibility batch — unchanged |
| **E1 / SR-1 – SR-5** | **OPEN; mandatory before B5 reuse** — unchanged |
| **TOOL-1** | `pixel-main.cjs` Chromium-only — **deferred, not edited** |
| E6, OBS-1, OBS-6, OBS-11, OBS-15, OBS-16, LIVE-1, LIVE-2, KD-02, KD-05, PROC-1 | **OPEN**, unchanged |

## 14. Status after the OBS-18 implementation and OBS-19 diagnostic (2026-10-10, `DEC-046`) — branch `ui-revamp` only

Reports: [`../../GATE_4_OBS18_IMPLEMENTATION.md`](../../GATE_4_OBS18_IMPLEMENTATION.md), [`../../GATE_4_OBS19_DIAGNOSTIC.md`](../../GATE_4_OBS19_DIAGNOSTIC.md).
Evidence: [`../obs18-impl/evidence/`](../obs18-impl/evidence/), [`../obs19/evidence/`](../obs19/evidence/). Application change: **`3b333c4`** (OBS-18 only).
Sections 1–13 are unchanged history. **Production is unchanged** (nothing pushed or deployed).

| ID | Status after `DEC-046` |
|---|---|
| **OBS-18** | **CORRECTED ON THE BRANCH (`3b333c4`) — CLOSURE RECOMMENDED, NOT RECORDED** (owner decision). `DcPage` renders four hidden, zero-height, `aria-hidden`, in-flow priming elements (one per calibrated display fallback; glyph from `::before`). Official Firefox 157.0.1, 10 DC routes × 7 widths × 0 / 300 / 2,500 ms: H1 line changes 10 / 25 / 25 views → **0 / 0 / 0**; calibrated face painted while pending; Playwright Firefox the same; Chromium, WebKit, real Safari 26.2 unchanged; accessibility tree, Tab order, text identical; 0 hydration errors; works without JavaScript. Verified scope: macOS, loopback, cold cache |
| **OBS-19** | **OPEN — diagnostic classification A (confirmed defect requiring remediation), recommended; not fixed.** Site-wide (body copy, DC chrome, consent banner, legacy headings). Mechanism 1 (Firefox): Manrope text laid out in system-ui while Manrope loads (the OBS-18 Gecko rule; `"Manrope Fallback"` loaded only where a U+2192 arrow is rendered). Mechanism 2 (all engines, late Manrope): `next/font`'s automatic fallback metrics do not hold line breaks — Chromium native layout-shift up to 0.10–0.12, mainly the consent banner (23 px at 430). Normal first visits: Firefox pending state painted in ≈ 20 % of cold loopback loads (moves ≤ 32 px); Chromium none. Runtime-only priming fixes mechanism 1 only. Remediation proposal in the report §10 — separate owner decision |
| OBS-6 | **OPEN**, unchanged; observed again: the Firefox layout check's `h1-count` finding on dynamic not-found pages comes and goes on both builds (B-classification NEW 1 in this gate, re-check shows it pre-existing) |
| OBS-17, OBS-13 | CLOSED within their verified scope — unchanged (OBS-17 correction re-verified in real Safari 26.2: H1 re-wraps 0) |
| **KD-09 / KD-10** | **OPEN, deferred** to the dedicated pre-production accessibility batch — unchanged |
| **E1 / SR-1 – SR-5** | **OPEN; not performed; mandatory before B5 reuse** — unchanged |
| **TOOL-1** | `pixel-main.cjs` Chromium-only — **deferred, not edited** (used only for a labelled Chromium comparison) |
| E6, OBS-1, OBS-11, OBS-15, OBS-16, LIVE-1, LIVE-2, KD-02, KD-05, PROC-1 | **OPEN**, unchanged |

## 15. Status after the OBS-18 closure and OBS-19 remediation (2026-10-11, `DEC-047`) — branch `ui-revamp` only

Report: [`../../GATE_4_OBS19_REMEDIATION.md`](../../GATE_4_OBS19_REMEDIATION.md). Evidence: [`../obs19-remediation/evidence/`](../obs19-remediation/evidence/).
Application change: **`46785af`** (OBS-19). Sections 1–14 are unchanged history. **Production is unchanged** (nothing pushed or deployed).

| ID | Status after `DEC-047` |
|---|---|
| **OBS-18** | **CLOSED** for the verified scope (official Firefox 157.0.1 and Playwright Firefox 153 on macOS; the 10 Direction C routes; 320–1440 px; loopback, cold cache) after re-verification of the `3b333c4` evidence. Still fixed on `46785af`: official Firefox, display face held 2.5 s, 0 H1 line changes, 0 display-caused moves |
| **OBS-19** | **OPEN — PARTIALLY REMEDIATED (`46785af`); closure NOT recommended.** Mechanism A (Firefox system-ui while Manrope loads) **RESOLVED**: official Firefox paints the calibrated face, never system-ui, in every pending run, JavaScript on and off. Mechanism B (fallback metrics) **MITIGATED**: consent banner height change 23 px → 0; button re-wraps 28 → 0; Chromium late-Manrope native layout-shift max 0.1215 → 0.049 (views > 0.01: 23 → 13; 3 views worse, `/blog`). **Residual:** ≈ 3 % of weight-400 element-views still re-wrap at a late swap in every engine (per-string Arial/Manrope variance; essentially unchanged); paragraph moves ≤ 52 px, button moves ≤ 29 px with late Manrope; Firefox normal loads: 3 of 84 views move (≤ 37 px). Loaded-state change: the U+2192 arrows (outside Manrope's latin subset) are drawn by the new faces (bold arrows 0.71 px narrower). Owner decision on the residual (report §13) |
| OBS-6 | **OPEN**, unchanged; the Firefox `h1-count` not-found finding was absent in this run (classified RESOLVED once; intermittent on both builds); live-DOM not-found metadata variance seen again in the inventory diff (served head identical) |
| OBS-17, OBS-13 | CLOSED within their verified scope — unchanged (OBS-17 re-verified in real Safari 26.2 on `46785af`: H1 re-wraps 0 → 0, display roles 7 → 7, `font-optical-sizing: none`) |
| **KD-09 / KD-10** | **OPEN, deferred** to the dedicated pre-production accessibility batch — unchanged (the reduced-motion/figure-text failures are identical on both builds) |
| **E1 / SR-1 – SR-5** | **OPEN; not performed; mandatory before B5 reuse** — unchanged |
| **TOOL-1** | `pixel-main.cjs` Chromium-only — **deferred, not edited** (used only for labelled Chromium comparisons) |
| E6, OBS-1, OBS-11, OBS-15, OBS-16, LIVE-1, LIVE-2, KD-02, KD-05, PROC-1 | **OPEN**, unchanged |

## 16. Status after the OBS-19 final disposition assessment (2026-10-11, owner brief — assessment only) — branch `ui-revamp` only

Report: [`../../GATE_4_OBS19_FINAL_DISPOSITION.md`](../../GATE_4_OBS19_FINAL_DISPOSITION.md). Evidence: [`../obs19-final/evidence/`](../obs19-final/evidence/).
**No application change; no defect status changed by this assessment.** Sections 1–15 are unchanged history.

| ID | Status after this assessment |
|---|---|
| **OBS-19** | **OPEN — final disposition ASSESSED, OWNER DECISION PENDING.** Realistic synthetic profiles (cold, Fast 4G, Slow 4G ± 4× CPU, Slow 3G, warm): Chromium, WebKit and real Safari 26.2 had Manrope ready at first paint in every run; Firefox painted the calibrated fallback 13–49 ms after first paint on some loads (one above-the-fold CTA case, `/ai-seo` 430, 27 px). Stress figures reproduce DEC-047. `/blog` "worse" values = empty plain-build artefact (CMS fixture: current ≤ pre). Official Firefox `/contact` 430 @2,500 / 768 @300 now paired: system-ui → calibrated, 0 px movement. `font-display: optional` and arrow-only faces tested as experiments, **not adopted**. **Recommended (not decided):** close for Manrope with a documented exception; keep `swap`; accept the U+2192 arrow difference (report §13–14) |
| *(proposed OBS-20, not registered)* | Bricolage Grotesque (unchanged by `46785af`) arrives after first paint on Slow 4G in every engine; `/contact` 430 form + paragraph 37 px, Chromium native 0.0285; `/faq` paragraphs 22–40 px. Registration awaits the owner (report §9.4, §14 item 4) |
| All other entries | Unchanged from §15 |

## 17. Status after the OBS-19 final closure (2026-10-11, `DEC-048`) — branch `ui-revamp` only, governance only

Decision: `DEC-048` (`docs/00-project/DECISION_LOG.md`). Report: [`../../GATE_4_OBS19_FINAL_DISPOSITION.md`](../../GATE_4_OBS19_FINAL_DISPOSITION.md). **No application change.**
Sections 1–16 are unchanged history.

| ID | Status after `DEC-048` |
|---|---|
| **OBS-19** | **CLOSED — with a documented residual exception (not an unconditional pass).** Closed for the Manrope fallback-font remediation (`46785af`). Accepted residual: with Manrope held 2.5 s, ≈ 3 % of regular-weight elements change lines and above-the-fold paragraphs/CTAs move up to ≈ 29 px (`/pricing` 768, `/ai-seo` 430, `/faq` 768, `/problems/…` 768), Chromium native ≤ 0.049; banner height and button wrapping stable. Realistic synthetic profiles: Manrope impact limited to one intermittent Firefox above-the-fold CTA movement (`/ai-seo` 430, 27 px). `font-display: swap` retained; U+2192 arrow difference (0.7 px; 1.2 px Firefox) accepted. Not verified: real devices, Windows/Linux, field data. The Bricolage part of the original title moves to OBS-20 |
| **OBS-20** *(new)* | **OPEN — NON-BLOCKING**, pending relevant future performance and conversion-page QA; no remediation authorised. **Bricolage Grotesque** (site heading face, `next/font` automatic fallback; pre-existing, unchanged by `46785af`) finished after first paint in 80/80 synthetic Slow 4G runs per engine. Above the fold: Chromium `/contact` 430 form fields + paragraph **37 px, native 0.0285** (deterministic); `/faq` 768/1024 paragraphs 22–24 px (native ≤ 0.0035); WebKit `/faq` 390–1024 paragraphs 22–40 px, `/blog` 390 26 px (plain build); Firefox none. Fast 4G, cold and warm loads: none. **Limitations:** synthetic loopback HTTP/1.1 throttling (not field data); macOS only; no real devices, Windows/Linux or Android; CMS routes other than `/blog` on the plain build; no Bricolage-specific diagnosis or candidate tested. Evidence: `../obs19-final/evidence/runs/bricolage-late-arrival.txt`, report §9.4 |
| **KD-09 / KD-10** | **OPEN, deferred** to the dedicated pre-production accessibility batch — unchanged |
| **E1 / SR-1 – SR-5** | **OPEN; not performed; SR-1 – SR-5 mandatory before B5 reuse**; E1 real-device testing not waived — unchanged |
| **TOOL-1** | `pixel-main.cjs` deferred, not edited — unchanged |
| All other entries | Unchanged from §15 |

## 18. Status after Gate 4 · A1 accessibility readiness (2026-10-11, `DEC-049`) — branch `ui-revamp` only

Report: [`../../GATE_4_A1_ACCESSIBILITY_READINESS.md`](../../GATE_4_A1_ACCESSIBILITY_READINESS.md). Evidence: [`../a1/evidence/`](../a1/evidence/).
Application change: three figure components (`ChainFigure.tsx`, `CauseZones.tsx`, `MethodChain.tsx`). Sections 1–17 are unchanged history. **Production is unchanged.**

| ID | Status after `DEC-049` |
|---|---|
| **KD-09** | **REMEDIATED ON THE BRANCH — closure recommended, owner to confirm.** Every SVG figure text item renders ≥ 12px on all 6 figure routes × 9 widths (320–1440, incl. the 761/1100 drawing switches) in Chromium, WebKit and Firefox: 377 → 0 items below 12px (min 7.84 → 12.00px). Includes the `/how-it-works` figures (were 7.8–9.9px at 761–1440), whose horizontal form now starts at 1100px |
| **KD-10** | **REMEDIATED ON THE BRANCH — closure recommended, owner to confirm.** Figure **text** uses the existing text-grade tokens (`--dc-gap-text` 4.90:1, `--resolve-accent-dark` 6.02:1); marks keep `--resolve-gap` / `--resolve-accent-deep` (non-text, ≥ 3:1). 464 → 0 items below 4.5:1 (min 1.67 → 4.90:1) × 3 engines. The `MethodChainState` 34 %-opacity labels (1.67:1) are fixed |
| **KD-05** | **Figure-text scope RESOLVED ON THE BRANCH (vertical drawings, 320–430px) — closure of that scope recommended.** Under the 1.4.12 stylesheet: clipped figure text 52 → 0 (Chromium), 46 → 0 (WebKit); `layout.cjs` RESOLVED 15/15 text-spacing fingerprints, NEW 0, in all three engines. Horizontal drawings under 1.4.12 at ≥ 761px not measured |
| **OBS-14** | **RESOLVED ON THE BRANCH** — the `/lead-generation` arrival label no longer crosses the spine (label moved right of the chain). Other figure label/line collisions found by the A1 probe (38 in Chromium) also 0 |
| **SR-1 – SR-5** | **OPEN — BLOCKED** (no real iPhone/Android screen reader here). Checklist and recording rules: report §5. Still mandatory before B5 reuses `DataTable` (stacked), `Sequence`, the label-crumb trail or `NotPromised` |
| **E1** | **OPEN**; not performed |
| OBS-8, OBS-12 | **OPEN**, unchanged: HTML labels, not SVG figure text; R-3 is not retroactive (`DEC-041`) |
| KD-02 | **OPEN**, unchanged; out of A1 scope (instances on B6/B8/B9/B10 routes; gate "before staging") |
| All other entries | Unchanged from §17 |

## 19. Status after Gate 4 · B5 (2026-10-12, `DEC-050`) — branch `ui-revamp` only

Report: [`../../GATE_4_B5_TRUST_METHOD_PAGES.md`](../../GATE_4_B5_TRUST_METHOD_PAGES.md). Sections 1–18 are unchanged history.

| ID | Status after `DEC-050` |
|---|---|
| **SR-1 – SR-5** | **OUTSTANDING — deferred by owner decision as a temporary sequencing exception** (B5 proceeded before them). Not passed, not waived; required for release readiness |
| KD-03 | **RESOLVED on `/how-it-works` and `/about`** (axe `color-contrast` × 3 engines); still open on routes not yet migrated |
| E1, KD-02, OBS-20, LIVE-1, LIVE-2, PROC-1 | **OPEN**, unchanged |
| All other entries | Unchanged from §18 |
