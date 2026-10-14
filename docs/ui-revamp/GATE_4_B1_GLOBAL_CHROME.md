# MappedSkills UI Revamp — Gate 4 · B1: Global Chrome Migration

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Authority** | **`DEC-037`**: B1 only, strategy S3; legacy fallback retained until B11; LIVE-1 open in production; no consent, GTM or page-body change; no staging, production or merge approval |
| **Status** | **COMPLETE WITH EXCEPTIONS** (§9). Every mandatory B1 acceptance check passes. The exceptions are pre-existing items and testing limits, not B1 defects |
| **Starting point** | `ui-revamp` @ `9656df7` (B0 checkpoint). Baseline of record: `gate-4/b0/evidence/baseline/` |
| **Candidate builds** | plain `4mYpl657fdSqeNVZnTsdH`, fixture `OXslnOFf-a-kaYdV3Rnqb`. Scratch copies of `9656df7` plus the three B1 files; served on `:3610` / `:3620` |
| **Evidence** | [`gate-4/b1/evidence/`](gate-4/b1/evidence/): [`EXPECTED_CHANGES.md`](gate-4/b1/evidence/EXPECTED_CHANGES.md) (declared before testing), `run/` (all results), [`compare/index.html`](gate-4/b1/evidence/compare/index.html) (six-route before/after) |

## 1. Scope and implementation

**What changed.** Every route now renders the approved Direction C header, navigation, mobile menu and footer. The Gate 2
allowlist (`DIRECTION_C_ROUTES`, three routes) is replaced by an explicit, **empty** exception list (`LEGACY_CHROME_ROUTES`). A
pathname in that list gets the legacy chrome back, so a single route can be rolled back in one line. The legacy `Header` and
`Footer` are untouched and retained, unrendered, until B11.

| File | Change |
|---|---|
| `components/direction-c/nav.ts` | `DIRECTION_C_ROUTES` (allowlist) → `LEGACY_CHROME_ROUTES: ReadonlySet<string>` (empty exception list), with its rules in a comment |
| `components/direction-c/ChromeSwitch.tsx` | Condition inverted: `legacy` only for pathnames in `LEGACY_CHROME_ROUTES`, otherwise `next`. Comment updated |
| `app/layout.tsx` | One JSX comment updated. **No code change** |

The diff is 3 files, +22 / −17, of which 1 line is logic.

**Not changed** (verified by an empty `git diff` and by §3):
- page bodies, copy, H1/H2, URLs and routing, link destinations;
- forms, `BookingLink`, analytics, GTM, consent;
- metadata, canonicals, OG, JSON-LD, Contentful;
- dependencies, the Direction C visual language and motion;
- legacy `components/layout/Header.tsx` and `Footer.tsx`;
- `next-env.d.ts`: an unrelated `next dev` modification, left unstaged and unreverted.

**Not added:** the optional High Contrast chevron border, declined in `DEC-037`.

## 2. Before and after

| Aspect | Before (B0) | After (B1, branch) |
|---|---|---|
| Header on 31 legacy-chrome targets | Legacy, `position: sticky`, 65px | Direction C, `position: relative`. 65px at ≤1199px; 73px at 1440 (full navigation) |
| Mobile menu | Inside the sticky header. **LIVE-1:** CTAs unreachable at 390×700 and 320×568 | In normal flow; Contact Us → Book a call first and in view; "Company" group; Escape returns focus |
| Desktop Services | Link + chevron with `role="menu"` | Link + "Services submenu" disclosure; `inert` when closed |
| Nav labels | "Social Media Ads", "Lead Generation", … | Approved names ("Paid social", "Lead generation", … `DEC-036`). **Destinations identical** |
| Footer | Legacy dark strip | Direction C footer: the same destinations, `mailto`/`tel` values, consent-preferences control |
| `/`, `/services`, `/seo` | Direction C | **Unchanged** |

Visual comparison (first screen; desktop 1440, mobile 390, mobile with menu open):
- [`compare/index.html`](gate-4/b1/evidence/compare/index.html) covers:
  - `/seo` (approved Direction C);
  - `/google-ads` (Resolve service);
  - `/contact` (conversion);
  - `/blog/fixture-article-full-structure` (CMS fixture);
  - `/privacy-policy` (legal);
  - the 404 page (special purpose).
- The "before" set was captured from the B0 build before any B1 server ran. 36 JPEGs, 1.4 MB.
- **Visible seam, expected (G4-1):** on legacy bodies, the header's content edge and the body's content edge do not align. The B0 legacy header was also misaligned (Gate 0 R7). This persists until each body migrates. It is branch-only; nothing ships before Gate 9.

## 3. Regression results

Everything was declared in [`EXPECTED_CHANGES.md`](gate-4/b1/evidence/EXPECTED_CHANGES.md) **before** the first run. Targets: all 28 templates / 34 targets.

### 3.1 Classified findings against the B0 baseline (`classify.cjs`)

| Run | Engine | NEW | RESOLVED | KNOWN | Notes |
|---|---|---|---|---|---|
| Layout (7 widths + text spacing + 200%/400%) | Chromium | **0** | 2,387 | 532 | All RESOLVED are declared patterns: DEC-030-STICKY 217; KD-08 header/footer 2,170 |
| | WebKit | **0** | 2,387 | 532 | identical |
| | Firefox | **0** | 2,387 | 532 | identical |
| A11y (axe, Tab walk, names, reduced motion, forced colours, menu) | Chromium | **0** | 436 | 31 | 434 declared (LIVE-1 124, KD-02 header 310). **2 outside the declaration: a sampling artefact, NOT fixes** (§5.2) |
| | WebKit | **0** | 124 | 14 | LIVE-1 124 |
| | Firefox | **0** | 124 | 14 | LIVE-1 124. The first run showed 1 transient NEW (§5.1) |

Remaining KNOWN findings are body defects that B1 does not touch: KD-01, KD-03 … KD-08 (body), KD-02 (body).
Files: `run/classify-*.txt`, `run/resolved-vs-declared.txt`.

### 3.2 Content, SEO, analytics

| Check | Result |
|---|---|
| Inventory (`diff-inventory.cjs`, chrome facets declared) | **0 unexpected differences**: 695 facets identical; 155 expected chrome differences, **all on the 31 legacy-chrome targets, none on `/`, `/services`, `/seo`**. Main-region text, headings, links, CTAs, buttons, forms, metadata, OG, JSON-LD, font preloads, motion hooks, scripts, consent bootstrap order and proof sentinels are identical. The first run showed 12 differences on the 4 dynamic not-found pages (§5.3, OBS-6) |
| Served `<head>`: status, titles, meta, canonical/alternate, JSON-LD (`served-head.cjs`, new) | **34/34 identical** to B0 |
| Chrome consistency (`--expect-dc all`) | **0 failures**: 1 header variant and 1 footer variant across 34 targets; skip link present everywhere |
| Analytics and forms (`analytics-forms.cjs --compare`) | **0 differing sections**. Consent states, the `page_view` walk (7 events; no chrome seam now), BookingLink `meeting_started`, ContactForm field contract and every mocked outcome are identical |
| Bytes (`bytes.cjs`) | CSS, JS and font preloads unchanged on every route. Served HTML on legacy-chrome routes **0.6–1.2 KB gz smaller**. Approved routes ±0.1 KB |

### 3.3 Page-body pixels

| Method | Result |
|---|---|
| Against the B0 recorded hashes (`--against`) | **10/68.** Not comparable: a B0 harness defect (§5.4). Investigated, not overridden |
| **Live two-build comparison, chrome masked, offset aligned** (`pixel-main.cjs --mask-chrome --align`; B0 builds vs B1 builds) | **68/68 pixel-identical** (56 plain + 12 fixture). 31 captures at 1440 were aligned by +8px (the header is 8px taller) |
| Translation proof | B0 shifted down 8px is **byte-identical** to B1 on all three pages where rasterisation differed (`run/pixel-main-translation-probe.txt`) |
| B1 masked hashes for later batches | `run/pixel-main-hashes-masked.json` (68); self-check 68/68 |

### 3.4 Existing suites and static gates

| Check | Result |
|---|---|
| Gate 2 `app-checks.cjs` (approved routes) | **192/192 PASS** |
| Gate 3 `acceptance-checks.cjs` (Chromium) | **261 PASS · 0 FAIL · 3 NOTE**, identical to B0 |
| Gate 3 `chrome-nav.cjs` | 0 console errors across client navigation and back/forward. It now reports `header=DirectionC position=relative` on legacy routes (`/about`, `/pricing`). This is the intended state, declared in advance |
| `npm run typecheck` · `npx eslint .` · `npm test` · build (plain + fixture) · `verify:build` | exit 0 · exit 0 · **11/11** · exit 0 / exit 0 · OK (23 prerendered pages) |

## 4. Navigation and accessibility (`nav-checks.cjs`, new; all 34 targets; three engines)

**Result:** 560 checks per engine pass; **0 findings** in Chromium, WebKit and Firefox.

| # | Check | Result (each engine) |
|---|---|---|
| D1 | Header in flow (not sticky/fixed); does not overlap `<main>` at 1440 | PASS 34/34 |
| D2 | Primary links (How It Works, Case Studies, Pricing, Blog, About); no `role=menu`/`menuitem` | PASS 34/34 |
| D3 | Services disclosure: inert when closed; opens; panel = 6 capability routes + Measurement (`/how-it-works`) + All services; Escape closes and returns focus | PASS 34/34 |
| D4 | `aria-current="page"` only on the link for the current path; none on non-nav routes | PASS 34/34 |
| M1 | Mobile menu expands and collapses; Escape closes and returns focus (390×700, 320×568) | PASS 68/68 |
| M2 | Menu starts with Contact Us → `/contact`, then Book a call → `/schedule-call` | PASS 68/68 |
| M3 | Tab from the open menu button reaches the menu's Contact Us | PASS 34/34 |
| M4 | Last menu link reachable; **scroll position restored after open + close 68/68; no scroll lock** (by design: the menu is in normal flow) | PASS |
| M5 | Consent banner showing (undecided) + menu open: Contact Us / Book a call not covered by the banner (390×700, 320×568) | PASS 68/68 |
| A1 | In-page anchors in `<main>` (legal contents, blog TOC): target in view, not under the header | PASS (every anchor found) |
| E1 | No console errors, page errors or hydration warnings | PASS 34/34 |

**Also verified:**
- **Keyboard and focus.** The a11y Tab walk on all targets at 390 and 1440 finds no unindicated stops outside known body defects.
- **Focus order.** M3, plus the Gate 3 acceptance suite's full traversal on the approved routes. The skip link is present on all 34 targets.
- **Reduced motion.** No element keeps a transition over 10 ms; 0 `.dc-pre`.
- **Forced colours.** Full-page walk: **0 header/footer stops** lose focus. Body stops are §6 KD-02.
- **Content not hidden by the header.** D1, A1, plus `<main>` pixel identity.
- **Real devices: none used.** All of the above is browser automation (Playwright Chromium, WebKit and Firefox builds). **E1 stays mandatory.**

## 5. Findings during B1 — product or harness?

| # | Observation | Investigation | Disposition |
|---|---|---|---|
| 5.1 | Firefox a11y run 1: `menu|press-slug~not-found|320|no-menu-button` (1 NEW) | Present and visible in 18/18 targeted Firefox loads. The harness counted visible buttons immediately after `networkidle` | **Harness.** It now waits up to 3 s before declaring the button absent; an absent button still fails. Re-run in three engines: 0 NEW |
| 5.2 | Chromium: 2 RESOLVED outside the declaration (KD-02 on blog-fixture **body** links) | The forced-colours check samples the first 12 Tab stops, and the chrome changed how many come first. A full-page walk shows the **identical** body lost-focus set before and after (8 per article) | **Not a fix.** KD-02 body remains open. The register corrects B0's undercount: legal pages have 3 each (`forced-colours-fullwalk-*.txt`) |
| 5.3 | Inventory run 1: 4 dynamic not-found pages showed the route's "… Not Found" title, `noindex, nofollow` and no canonical | Served HTML is identical in B0 and B1. 10 later runs (4 B0, 6 B1, incl. a fresh server) all show "Page Not Found \| MappedSkills". **The B0 fixture build shows the same variant deterministically** | **Pre-existing timing behaviour (OBS-6)**, not caused by B1. Both variants are `noindex`. A served-head check is added |
| 5.4 | B0 recorded `<main>` hashes match only 10/68 | In B0, the element screenshot scrolls `<main>` into view and the **sticky legacy header is painted over its top 65px** (visual proof in the B1 investigation). The 10 matches are exactly the targets with no sticky header or no scroll | **B0 harness defect.** Recorded hashes were not edited. The proof uses a fair live comparison (§3.3). New masked hashes are recorded for B2 |
| 5.5 | After masking, 3 legacy pages differed by 22–156 px at 1440 | `<main>` starts 8px lower (73px vs 65px header). Blur/gradient surfaces rasterise by absolute position. B0 shifted by 8px equals B1 byte for byte | **Rendering translation, not content.** `--align` added |

No product defect caused by B1 was found. **No route needed the legacy exception list.**

## 6. Known defects — status after B1 (register §4)

| ID | Branch | Production |
|---|---|---|
| **LIVE-1** | **Condition eliminated.** 124 fingerprints RESOLVED in each engine; menu CTAs first and in view on all 34 targets | **OPEN.** Unchanged; needs its own production decision (`DEC-033`/`DEC-037`) |
| DEC-030-STICKY | Resolved | Open (with LIVE-1) |
| **KD-02** | **Chrome resolved; body OPEN.** 66 body stops (`/contact` form, blog, case studies, legal) | Open. **Staging gate:** zero on a full walk + real Windows High Contrast |
| KD-08 | Chrome resolved; body open | Open |
| KD-01, KD-03 … KD-07 | Unchanged | Unchanged |
| **OBS-1** | Unchanged; extended (JSON-LD and CSS links also only in the payload on dynamic 404s) | Open; part of **E6** |
| OBS-6 (new, pre-existing) | Recorded | SEO note for staging |
| LIVE-2, PROC-1 | Unchanged, OPEN | OPEN |

## 7. Remaining limitations

- **E1** is not done: no real Android/iPhone, desktop Safari/Firefox releases, VoiceOver/TalkBack/NVDA, or Windows High Contrast.
  WebKit/Firefox here are Playwright engine builds.
- **E6** is not done (GTM container). The chrome DOM changed on 25 templates (`#mobile-menu` → `#dc-mnav`, new classes). No
  `data-*` hooks exist (OBS-5). **Any GTM trigger keyed on legacy header/footer DOM must be checked before staging.**
- CMS coverage as in B0: fixtures for blog and case studies; `/research/[slug]` and `/press/[slug]` cover only their not-found paths.
- The visual review is first-screen only. Bodies are proven by pixels and inventories rather than full-page images.
- The branch-only chrome/body seam on legacy bodies (G4-1) is expected until each body migrates.

## 8. Rollback

| Scope | Action |
|---|---|
| One route | Add its exact pathname to `LEGACY_CHROME_ROUTES` in `components/direction-c/nav.ts`. Record the reason in the next batch report. Rebuild |
| All of B1 | `git revert <B1 application commit>`. This restores the Gate 2 allowlist (Direction C on `/`, `/services`, `/seo` only). Legacy chrome was never deleted, so the revert is clean |

## 9. Status and B2 readiness

**B1: COMPLETE WITH EXCEPTIONS.**
- Every mandatory acceptance check passes: 0 NEW in three engines; page bodies 68/68; served SEO 34/34; inventory and analytics identical.
- The exceptions are the open items in §6–§7 (E1, E6, KD-02 body, OBS-1, OBS-6, LIVE-1 in production) and the harness corrections in §5. None is a B1 defect.

**B2 recommendation: READY for an owner instruction.** B2 covers `/google-ads` and `/social-media-ads`, the first body migration. Before B2:
1. use the **B1 run as B2's baseline of record**: `gate-4/b1/evidence/run/` (inventory, layout, a11y, analytics, masked `<main>` hashes);
2. run the KD-02 check as a **full-page walk**;
3. schedule the **E1-a** early device checkpoint after B2, as planned, now that the shared chrome is global;
4. E6 (GTM, including OBS-1 and the chrome DOM change) remains a pre-staging requirement. Doing it before more routes change is recommended.

## 10. Harness changes in B1 (`gate-4/qa/`)

- **New:**
  - `nav-checks.cjs`: §4;
  - `served-head.cjs`: served SEO head;
  - `bytes.cjs`: transfer report;
  - `compare-shots.cjs`: lean before/after page.
- **`pixel-main.cjs`:** `--mask-chrome` and `--align`, both documented in its header.
- **`a11y.cjs`:** bounded wait for the menu button (§5.1).
- **`run-all.cjs`:** `--expect-dc` pass-through. The first B1 run used the B0 default and reported 31 chrome-consistency failures (all legacy routes expected legacy). The run was repeated with `--expect-dc all`: 0 failures. `run/run-summary.txt` keeps the original line.
- **Re-run commands:** `QA_REGRESSION_RUNBOOK.md` §5.4.

## 11. Session handoff

- **Session:** 2026-10-08 · Claude (Opus 5.5) · Gate 4 B1.
- **Decision recorded:** `DEC-037`.
- **Application files:** the three files in §1. **Tests actually run:** everything in §§3–4.
- **Not done:** real devices (E1); GTM (E6); B2.
- **Next:** owner review of [`compare/index.html`](gate-4/b1/evidence/compare/index.html) and this report; then a separate B2 instruction.
