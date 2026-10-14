# UI Revamp — QA Regression Runbook (Gate 2–3 Direction C checks)

| | |
|---|---|
| **Date** | 2026-10-08 (Gate 3 checkpoint, `DEC-036`) |
| **Scope** | How to re-run the essential Direction C regression checks from a clean checkout of `ui-revamp` |
| **Engine** | Blink only (Playwright Chromium 151.0.7922.34; optionally the installed Google Chrome). **No WebKit, Gecko, real device or screen reader.** That coverage is condition E1 of `DEC-036` and is manual |

## 1. Portability fix (what changed, and what did not)

Before this checkpoint, 29 scripts loaded `playwright-core` (and two loaded `axe-core`) from an absolute path in another
local repository (`…/Digi_Brain/node_modules`). They could not run from a clean checkout.

- **Dev dependencies added, pinned exactly** (the project's convention for `devDependencies`):
  - `playwright-core` `1.62.1`: the version that produced the recorded evidence (Chromium 151.0.7922.34);
  - `axe-core` `4.13.0`: already in the lockfile as a transitive dependency at this version; now declared directly.

  No other package changed in `package-lock.json`. Neither package is imported by application code, so the production bundle is unaffected.
- **Eight reusable scripts** (§3) now resolve both packages from the project's `node_modules`. In each one, only the
  dependency line changed, and it carries a comment saying so. Test logic, assertions and output format are unchanged.
  The re-runs on 2026-10-08 reproduced the recorded counts exactly (§3).
- **Recorded outputs (`*.txt`, `*.json`) were not modified.** They remain the evidence of the runs named in each gate report.
- **Archival scripts** (§4) are unchanged. They still contain the original absolute path and are **not expected to run
  from a clean checkout**.

## 2. Setup (clean checkout)

```bash
npm ci
npx playwright-core install chromium
npm run build
npx next start -p 3300
```

`npm run build` needs the same environment variables as any production build (`.env.local`, not committed). Leave the
server running and run the checks in another shell. Results go to stdout, so redirect them **outside** the evidence
folders to avoid overwriting recorded outputs.

## 3. Reusable checks

Each command takes the candidate base URL. "Recorded" is the result on the approved build `--Lpst9W4pkiythkOhmVS`
(`GATE_3_FINAL_ACCEPTANCE.md` §10.4).

| Check | Command | Recorded | Re-run 2026-10-08 |
|---|---|---|---|
| Gate 2 application suite: responsive ×6, menu, disclosure, focus, reduced motion, no-JS, names, CTAs | `node docs/ui-revamp/gate-2/validation/app-checks.cjs http://localhost:3300` | 192/192 | **192/192** |
| Gate 3 final acceptance (add `chrome` as the 2nd argument to use the installed Google Chrome) | `node docs/ui-revamp/gate-3-acceptance/evidence/acceptance-checks.cjs http://localhost:3300 chromium` | 261 PASS · 0 FAIL · 3 NOTE | **261 · 0 · 3** |
| Chrome seam: client navigation, back/forward, console | `node docs/ui-revamp/gate-3/evidence/chrome-nav.cjs http://localhost:3300` | 0 errors | **0 errors** |

These also need a **comparison build** served on a second port: the pre-change build, or baseline `142b9c8` for the
unrelated-routes check. Build it from a separate checkout or worktree with `next build`, then run `next start <dir> -p <port>`.

| Check | Command | Recorded | Re-run 2026-10-08 |
|---|---|---|---|
| Gate 3 remediation R1–R7 + axe (2nd base = prior build) | `node docs/ui-revamp/gate-3-remediation/evidence/r-checks.cjs <candidate> <prior>` | 80/80 | **80/80** (prior = `7-ZqzKB1mAXbcZeuiC77h`) |
| A1/A2 accessibility, candidate vs prior | `node docs/ui-revamp/gate-3-acceptance/evidence/a1a2-checks.cjs <candidate> AFTER <prior>` | 183 PASS · 3 logged differences (intended 320px change) | **183 · 3** |
| Unrelated routes, pixel + text + links (baseline first) | `node docs/ui-revamp/gate-2/validation/unrelated-routes.cjs <baseline> <candidate>` | 42/42 identical | Dependency resolution verified; not re-run |
| Independent probes: axe, scroll depth, `page_view`, font preloads | `node docs/ui-revamp/gate-3/evidence/probe.cjs <candidate> <baseline>` | 0 axe violations; `page_view` identical | Dependency resolution verified; not re-run |
| Slow-network CLS / LCP (about 10 min per route set) | `node docs/ui-revamp/gate-3-acceptance/evidence/final-run/cls-throttled-final.cjs <base> <label> 3` | ≤ 0.001 in all cells | Dependency resolution verified; not re-run |

Static gates run without a server: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run verify:build`.

## 4. Archival scripts (historical evidence; not portable)

These produced specific historical outputs against prototypes, or against builds that existed only in a session's
scratchpad. They are kept unmodified as the record of how that evidence was made. **Do not treat them as a runnable suite.**
Their logic is superseded by §3, or it was diagnostic only.

| Area | Scripts |
|---|---|
| Gate 1 prototypes (mobile refinement, pass 2, Gate 2 Phase A) | `gate-1/mobile-refinement/validation/{audit,kb,mmotion}.cjs`; `gate-1/mobile-refinement/pass-2/validation/{checks,diff,mmotion,peek,shots}.cjs`; `gate-1/mobile-refinement/gate2-phase-a/navfix.cjs` |
| Gate 2 capture and inventory | `gate-2/validation/{shots,compare-shots,inventory,vitals}.cjs` |
| Gate 3 remediation diagnostics and captures | `gate-3-remediation/evidence/{ba-shots,chdebug,cls-throttled,fontprobe,measure,sweep,sweep2}.cjs` (`cls-throttled.cjs` is superseded by `final-run/cls-throttled-final.cjs`) |
| Gate 3 review diagnostics | `gate-3/evidence/investigate.cjs` |

To re-run one, change its `require('…/playwright-core')` line to `require('playwright-core')`. That is the same one-line
change made in §3. Then supply the targets it expects; see the header comment of each script.

## 5. Gate 4 site-wide harness (B0, 2026-10-08)

Added in Gate 4 · B0 (`GATE_4_B0_QA_FOUNDATION.md`). It extends §3 from three routes to **all 28 page templates (34 targets)**,
in Chromium, WebKit and Firefox (Playwright engine builds: proxies, **not** real devices or Safari/Firefox releases). Scripts live in
`docs/ui-revamp/gate-4/qa/` and resolve `playwright-core` and `axe-core` from the project. There are no absolute paths. §3 is unchanged and still valid.

### 5.1 Two builds of the same commit

The plain build is the real local behaviour (no Contentful credentials, so CMS pages show their empty or not-found state). The fixture
build adds synthetic Contentful entries through the real client (`gate-4/b0/GATE_4_B0_CMS_FIXTURE_STRATEGY.md`). Build both in scratch
copies outside the repository, so the working tree's `.next` and any running server are untouched:

```bash
R="$PWD"; for d in plain fixture; do mkdir -p <scratch>/$d; git archive <commit> -- . ':!docs' | tar -x -C <scratch>/$d; ln -s "$R/node_modules" <scratch>/$d/node_modules; cp .env.local <scratch>/$d/; done
(cd <scratch>/plain && npm run build)
(cd <scratch>/fixture && CONTENTFUL_SPACE_ID=fixture CONTENTFUL_ACCESS_TOKEN=fixture NODE_OPTIONS="--require $R/docs/ui-revamp/gate-4/qa/cms-fixtures/preload.cjs" npm run build)
npx next start <scratch>/plain -p 3510
node docs/ui-revamp/gate-4/qa/cms-fixtures/serve-fixture.cjs <scratch>/fixture 3520
```

One-time engine install (user cache only; no project file changes): `npx playwright-core install chromium webkit firefox`.

### 5.2 Run the suite

```bash
node docs/ui-revamp/gate-4/qa/run-all.cjs --plain http://localhost:3510 --fixture http://localhost:3520 --out-dir <dir> --engines chromium,webkit,firefox [--shots]
```

About 7 minutes for three engines. `--shots` writes full-page JPEGs at 390/1440 and first-screen JPEGs at all 7 widths (Chromium).

| Script | Checks (brief items) | Output |
|---|---|---|
| `inventory.cjs` | 1–4, 9 (static): status, title, meta, canonical, robots, OG/Twitter, JSON-LD, headings, visible text by region, links, CTAs, forms, `data-*` hooks, font preloads, motion hooks, consent-bootstrap order, proof sentinels | `inventory.json` |
| `diff-inventory.cjs` | compare two inventories; `--ignore` declares expected facets | exit 0/1 |
| `chrome-consistency.cjs` | 4: one header and footer variant per chrome system; Direction C on the expected routes (`--expect-dc all` after B1); destination parity | exit 0/1 |
| `layout.cjs` | 1, 5, 8: 7 widths; page-scroll / past-edge / contained overflow; sticky/fixed; headings; targets; console; text spacing 320–390; 200%/400% reflow | findings JSON |
| `a11y.cjs` | 6, 7: axe, Tab walk with focus visibility, names, reduced motion, forced colours (Chromium), mobile menu reachability (LIVE-1 condition) | findings JSON |
| `analytics-forms.cjs` | 9, 10: consent states, `page_view` walk, BookingLink, ContactForm field contract and mocked outcomes. `--compare a b` | JSON; exit 0/1 |
| `pixel-main.cjs` | `<main>`-only pixel comparison of two live builds; `--hashes` records SHA-256 | exit 0/1 |
| `classify.cjs` | KNOWN / NEW / EXPECTED / RESOLVED against a baseline run, tagged with `known-defects.json` IDs | exit 1 on NEW |
| `report-routes.cjs` | regenerate `gate-4/b0/GATE_4_B0_ROUTE_QA_INVENTORY.md` from a run folder | Markdown |

**Baseline of record:** `docs/ui-revamp/gate-4/b0/evidence/baseline/` (`352bb25`; plain `Njk8Lb5t9GSJ5FzVFuAJQ`, fixture `ROOt5ByVDiOWDhQY7WFeT`).
Do not overwrite it. Write later runs to the batch's own folder and classify them against it.

**Safety:** the harness aborts every non-local request and fulfils `/api/enquiry` itself. Never point it at production.

### 5.3 Screenshots and `<main>` hashes (added at the B0 checkpoint)

- **Committed vs local.** 64 representative screenshots are committed; 242 more are reproducible and kept local only. Index and exact
  regeneration commands: `docs/ui-revamp/gate-4/b0/evidence/README.md`. Regenerate into a folder **outside** the evidence folder:
  `node docs/ui-revamp/gate-4/qa/layout.cjs --plain <p> --fixture <f> --out <dir>/layout-chromium.json --shots <dir>/screens`.
- **Page-body comparison without the baseline build running:**
  `node docs/ui-revamp/gate-4/qa/pixel-main.cjs --plain <candidate-plain> --fixture <candidate-fixture> --against docs/ui-revamp/gate-4/b0/evidence/baseline/pixel-main-hashes.json`.
  It reports identical or changed per capture. Use the two-build mode (`--cand-plain`/`--cand-fixture`) when a pixel count or diff images (`--save-diffs`) are needed.

### 5.4 Gate 4 B1 additions (chrome batches and later)

- **Baseline for B2 onward:** `docs/ui-revamp/gate-4/b1/evidence/run/` (`DEC-037`), with chrome now Direction C everywhere. Run
  `run-all.cjs … --expect-dc all`.
- **Page bodies when the chrome differs between builds:** `pixel-main.cjs --mask-chrome --align` (two live builds). When it does not
  differ: `--mask-chrome --against docs/ui-revamp/gate-4/b1/evidence/run/pixel-main-hashes-masked.json`. B0's unmasked hashes include
  the legacy sticky header painted over `<main>`; they are valid only against unmasked captures of the same chrome.
- **Served SEO head** (what crawlers receive): `served-head.cjs --plain <A> --fixture <A'> --cand-plain <B> --cand-fixture <B'>`.
  Use it alongside `inventory.cjs` (live DOM): dynamic not-found pages vary in the live DOM by server timing (OBS-6).
- **Navigation** (Direction C chrome): `nav-checks.cjs --plain <p> --fixture <f> --out <file> [--engine webkit|firefox]`.
- **Transfer sizes:** `bytes.cjs --plain <A> --cand-plain <B>`.
- **Owner review page:** `compare-shots.cjs capture --label before|after …` then `compare-shots.cjs page --dir <dir>`.
- **KD-02 (forced colours):** a11y's forced-colours check samples 12 Tab stops. KD-02 acceptance uses a full-page walk, recorded as
  `forced-colours-fullwalk-*.txt` in the batch evidence.

### 5.5 Gate 4 B2 additions (body batches)

- **Baseline for B3 onward:** `docs/ui-revamp/gate-4/b2/evidence/run/` (`DEC-039`). Masked `<main>` hashes:
  `run/pixel-main-hashes-masked.json`.
- **Route-level a11y and motion** (full-page Tab walk at 390/1440/200%, full forced-colours walk, reveal budget, text never in a
  pre-state, reduced motion, no-JS, print, 320px text floor):
  `node docs/ui-revamp/gate-4/qa/route-a11y-motion.cjs --base <url> --routes /a,/b [--engine webkit|firefox] --out <file>`.
  Add an approved route as a control.
- **Throttled CLS for any route list** (route-parametric copy of `cls-throttled-final.cjs`, same profile):
  `node docs/ui-revamp/gate-4/qa/cls-routes.cjs <base> <label> 3 /a,/b [widths]`. About 4 minutes per route at 7 widths × 3 runs.
- **Display-fallback calibration:** every migrated route brings new H1 strings. If above-fold CLS appears, sweep `size-adjust` for
  the route's H1 (B2 record: `gate-4/b2/evidence/run/fallback-sweep.txt`). Opted-in pages use `DC Display 96 Fallback B` (92%) via
  `<DcPage className="dc-fallback-b">`; the approved routes keep 90.5%.
- **Like-for-like inventory:** also inventory the previous batch's build in the same session (`inventory-before.json`) and diff
  with no `--ignore`; OBS-6 makes dynamic not-found titles differ between sessions, not between builds.

### 5.6 Gate 4 E1-a additions (device checkpoint, 2026-10-08)

- **Bind every local server to loopback** (`-H 127.0.0.1`), including the `npx next start` commands in §5.1: without `-H`,
  `next start` listens on all interfaces. LAN binding needs explicit owner approval for that session (`GATE_4_E1A_DEVICE_CHECKPOINT.md`
  §2.2). `cms-fixtures/serve-fixture.cjs` passes no host flag, so it also listens on all interfaces; until it takes a host argument
  (proposal R-7, not implemented), start the fixture build directly:
  `CONTENTFUL_SPACE_ID=fixture CONTENTFUL_ACCESS_TOKEN=fixture CONTENTFUL_PREVIEW_ACCESS_TOKEN= NODE_OPTIONS="--require $PWD/docs/ui-revamp/gate-4/qa/cms-fixtures/preload.cjs" npx next start <scratch>/fixture -p <port> -H 127.0.0.1`.
  A LAN preview for real phones is a deliberate, owner-approved step (`GATE_4_E1A_DEVICE_CHECKPOINT.md` §2.2).
- **Playwright WebKit is not authoritative for display-face line wrapping or CLS** (OBS-11: it renders the face ~5% wider than real
  Safari 26.2). Use real Safari or a real iPhone for those questions.
- **Firefox Tab-walk stop counts** in `route-a11y-motion.cjs` hit the 400-iteration cap (focus never returns to `<body>`); the visibility
  result is valid, the count is not.
- E1-a probes (`docs/ui-revamp/gate-4/e1a/evidence/`): `e1a-probe.cjs` (gutter, H1, reverse-pair gap, min text, CTA heights),
  `e1a-h1-wrap.cjs` (H1 line breaks per engine), `e1a-captures.cjs` (8-route comparison page), `e1a-ink-compare.cjs` (real-Safari vs engine ink width).

### 5.7 Gate 4 B3 additions (2026-10-09)

- **Baseline for B4 onward:** `docs/ui-revamp/gate-4/b3/evidence/run/` (`DEC-040`); masked `<main>` hashes: compare against
  `b2/evidence/run/pixel-main-hashes-masked.json` for the unchanged routes (B3 recorded a comparison, not a new masked hash set).
- **Verify the server before measuring.** A B3 development CLS run was invalidated because a stale server answered on the port. Before any
  measurement: `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:<port>/_next/static/$(cat <scratch>/.next/BUILD_ID)/_buildManifest.js` → `200`.
  Run throttled CLS **alone** (no other harness load).
- **DataTable semantics and reflow** (8 views incl. 200%/400%, Chromium's own accessibility tree, alt-text label support, text spacing):
  `node docs/ui-revamp/gate-4/qa/datatable-a11y.cjs --base <url> [--route /ai-seo] --engine chromium|webkit|firefox --out <file>`.
- **Accessible names, two builds** (headings with level, links, buttons, form controls, images; regions listed):
  `node docs/ui-revamp/gate-4/qa/accessible-names.cjs --before <url> --after <url> --routes /a,/b --engine <e> [--width 390]`.
- **Rendered figure text** (SVG text × screen scale; HTML minimum): `figure-text.cjs --base <url> --routes /a,/b`.
- **GTM DOM dependency inventory** (IDs, `data-*`, sections, classes, per-link Click Text / children, `<main>`): `dom-dependency.cjs` (see its header).
- **Display-fallback sweep** for new H1s: `fallback-sweep.cjs` (see its header; record in the batch's `run/fallback-sweep.txt`).
- **Visual comparison** (before / after / reference, first screen, two middle sections, close; plus full-page 320/360):
  `b3-visual-captures.cjs capture --label before|after|ref|narrow --base <url> --out <dir>`, then `… page --out <dir>`.
- **cPanel build check:** in a scratch copy of the working tree, `npm run build:cpanel && npm run verify:build && npm run verify:cpanel`.

### 5.8 Gate 4 B4 additions (2026-10-09)

- **Baseline for B5 onward:** `docs/ui-revamp/gate-4/b4/evidence/run/` (`DEC-041`). Masked `<main>` hashes: `run/pixel-main-hashes-masked.json`.
- **Content and commercial parity** (every `<main>` text node in DOM order, CSS-independent, JS and no-JS; headings, links, CTAs, tables, SVG text,
  figure-like tokens; served head + JSON-LD): `node docs/ui-revamp/gate-4/qa/b4-content.cjs record --base <url> --out <file>`, then
  `… compare <before.json> <after.json> --declared <keys.json>`. It joins text nodes with spaces, so it **cannot** see a missing space after inline
  markup (OBS-13): check that separately. Route list is in the script.
- **Visual comparison:** `b4-visual-captures.cjs capture --label before|after|ref|narrow --base <url> --out <dir>`, then `… page --out <dir>`.
- **Stop servers by port, not by name.** `pkill -f "next start <dir>"` did not match (the listening process is `next-server`) and a stale server kept
  the port: `pid=$(lsof -nP -iTCP:<port> -sTCP:LISTEN -t); kill $pid $(ps -o ppid= -p $pid)`, then verify the BUILD_ID manifest (§5.7).
- **zsh:** `set -- $var` does not word-split and `${PIPESTATUS[0]}` is empty; run such loops with `bash -c`.
- **Comparing two builds' HTML:** Next chunk filename hashes differ between builds of the same source; normalise `-[0-9a-f]{16}\.js` and BUILD_ID.
  Dynamic / not-found pages also vary between server instances (OBS-6 family).
- **Firefox `nav-checks` M5** can report "banner shown false" intermittently in full runs (OBS-15); re-run alone and compare with the previous build
  before classifying.

### 5.9 Gate 4 B4 closure additions (2026-10-09, `DEC-042`)

- **Baseline for B5 onward:** `docs/ui-revamp/gate-4/b4/closure/evidence/run/` (the B4 run plus the OBS-13 correction). Classify layout/a11y against it.
- **OBS-13 junctions** (live DOM, served no-JS HTML, figure accessible name; `--scan` lists every inline element followed directly by a letter or
  em dash on 17 static routes): `node docs/ui-revamp/gate-4/b4/closure/evidence/obs13-probe.cjs --base <url> --build-id <BUILD_ID> --scan --out <file.txt>`.
  React separates adjacent server-rendered text nodes with `<!-- -->`; compare served HTML with that in mind. When text after a closing inline tag spans a
  line break and contains an entity, write the space as `{' '}` (the compiler drops a literal one).
- **SVG figure text size and contrast** (axe does not evaluate SVG `<text>`): `node docs/ui-revamp/gate-4/b4/closure/evidence/figure-svg-text.cjs --base <url> --build-id <id> --out <file.txt>`.
- **Display-face swap re-wrap** (final vs blocked vs delayed face; WebKit box-based shift, Chromium `layout-shift` API):
  `node docs/ui-revamp/gate-4/b4/closure/evidence/webkit-h1-cls.cjs --base <url> --build-id <id> --out <dir> [--engines webkit,chromium] [--routes /a,/b] [--modes final,fallback] [--tag <name>]`.
- **Real Safari H1 check** (macOS; loopback proxy that frames the real pages at 320–768 and posts results back):
  `node docs/ui-revamp/gate-4/b4/closure/evidence/safari-h1-harness.cjs --target <url> --port 4195 --out <file.json>`, then
  `open -a Safari 'http://127.0.0.1:4195/__h1/?run=<n>'` (a new query string forces a fresh load; add `&candidate=1` to test the OBS-17 candidate by injection).
  **Do not use port 4190** ("sieve", on the Fetch bad-ports list: browsers refuse it although `curl` works).
- **§5.6 OBS-11 note, qualified:** for the Direction C display face at 32–47.6px, real Safari 26.2 and Playwright WebKit produced **identical** widths and
  line breaks (OBS-17). Both ignore `font-variation-settings: "opsz"` while `font-optical-sizing` is `auto`. Treat a WebKit-only H1 wrap as a candidate real
  Safari difference until checked with the harness above, not as an automatic proxy artefact.
- **Screen readers:** `sr-semantics.cjs` (Chromium AX tree via CDP + Playwright ARIA snapshots) is a supplementary semantic check only. It is **not** a
  VoiceOver/TalkBack test; the manual checklist is `GATE_4_B4_OWNER_CLOSURE.md` §F.

### 5.10 Gate 4 post-B4 remediation additions (2026-10-09, `DEC-043`)

- **Baseline for B5 onward:** `docs/ui-revamp/gate-4/post-b4/evidence/run/` (the B4 closure run plus the OBS-17 and OBS-13 #8 corrections). Classify layout/a11y against it.
- **Display-face swap, every Direction C route** (final / fallback / delayed, 7 widths, 3 engines; H1 and every display role, CTA move, overflow, clipping):
  `node docs/ui-revamp/gate-4/post-b4/evidence/obs17-swap.cjs --base <plain> --build-id <id> --out <dir> --engines <e> --tag obs17-swap-<label>-<e>`
  (one process per engine in parallel: about 9 minutes). Compare two builds with `sweep-summary.cjs <dir>` (expects `<dir>/sweep-{pre,post}/`).
  **Run it whenever a display heading or `.dc-statement` string is added or changed** (B5 adds both): Safari must stay at 0 H1 re-wraps.
- **Real Safari, every display role:** `node docs/ui-revamp/gate-4/post-b4/evidence/safari-roles-harness.cjs --target <plain> --port 4197 --out <file.json>`, then
  `open -a Safari 'http://127.0.0.1:4197/__h1/?run=<n>'`. **Check that every result's `clientWidth` equals its target width:** with a mouse attached macOS
  shows classic scrollbars, and the B4-closure harness then measures frames 15 px narrow (the new harness compensates; the old one does not).
- **`pixel-main.cjs` is Chromium-only.** It accepts `--engine` but always launches Chromium (line 80). For WebKit/Firefox visual parity compare the
  `obs17-swap.cjs` captures of two builds (same capture code), or fix the script in a separately authorised tooling change.
- **Firefox and the calibrated fallbacks (OBS-18):** in Playwright Firefox the `local()` fallback faces are not used while the display face is loading, so a
  delayed-face run shows Firefox shifts that Chromium and WebKit do not. Read Firefox swap results against `firefox-swap-probe.cjs` before classifying.
- **Opener captures can differ on `/` for timing reasons** (the hero widget's label state). Recapture before classifying a homepage capture difference.

### 5.11 Gate 4 OBS-18 Firefox diagnostic additions (2026-10-09, `DEC-044`)

- **Which face fills a pending display face, per engine:** `node docs/ui-revamp/gate-4/obs18/evidence/obs18-diagnostic.cjs --base <plain> --build-id <id> --out <prefix>
  --engines firefox,chromium,webkit [--conditions normal,d300,d2500,prime,normalprime,primecss] [--reps 3] [--no-intercept 1]`, summarised with
  `obs18-summary.cjs <prefix>.json`. About 6–10 s per run; **run one sweep at a time** — concurrent sweeps change `normal` timing (delayed conditions are unaffected).
- **Screenshots of a pending font state need `PW_TEST_SCREENSHOT_NO_FONTS_READY=1`.** Playwright's `page.screenshot` otherwise waits for `document.fonts.ready`
  and captures the post-swap state. (`obs17-swap.cjs` fallback captures are unaffected: there the face is aborted, not pending.)
- **An unsupported `PerformanceObserver` type does not throw:** check `PerformanceObserver.supportedEntryTypes` before reporting a `layout-shift` total
  (Firefox 153 and WebKit 26.5 have none).
- **A real browser (no automation):** `node docs/ui-revamp/gate-4/obs18/evidence/obs18-real-browser-harness.cjs --target <plain> --build-id <id> --port 4791 --out <file.json>`,
  then open `http://127.0.0.1:4791/__obs18/?run=1` with the window in the foreground. It makes every web font cache-cold per frame (including the RSC payload's
  resource hints) and holds the display face server-side. Validated with Playwright Firefox only; not yet run in a real Firefox.
- **OBS-18 is expected in Firefox delayed-face runs** (Arial Narrow while the face is pending; `GATE_4_OBS18_FIREFOX_DIAGNOSTIC.md`). Do not classify those Firefox
  shifts as new unless they exceed `gate-4/obs18/evidence/runs/post-firefox-allroutes.txt`.

### 5.12 Gate 4 OBS-18 real-Firefox additions (2026-10-09, `DEC-045`)

- **Real Firefox, no automation:** `node docs/ui-revamp/gate-4/obs18-real-firefox/evidence/rf-run-real.cjs --firefox /Applications/Firefox.app/Contents/MacOS/firefox
  --profile <empty temp dir> --target <plain> --build-id <id> --port <p> --out <file.json> --label <name> [--routes … --widths … --holds 0,300,2500 --cands none,inflow --reps 3]`.
  Use a **temporary profile** (copy `docs/ui-revamp/gate-4/obs18-real-firefox/evidence/firefox-temp-profile-user.js` into it as `user.js`: first-run, telemetry and update activity off; **no** font, privacy or rendering pref). **Keep the
  Firefox window visible**: a covered window pauses animation frames; such runs are recorded as stalled/throttled and excluded by `rf-summary.cjs`.
- **The same page in a Playwright engine:** start `rf-harness.cjs`, then `node …/rf-drive-playwright.cjs <engine> <port> 2`. Summaries: `node …/rf-summary.cjs <files.json>`.
- **Name the face from the element's own lines, and analyse every transition.** A freshly inserted clone can see a newer font state than an element laid out
  earlier in the same reflow; and "last pending frame vs final" misses pending → pending moves. `rf-analyse.cjs` supersedes the `obs18` method for transitions.
- **macOS Firefox shows classic scrollbars** with a mouse attached: hide the frame's scrollbar from the first frame (served `<head>` style), not at `onload`
  (which waits for a held font), or every pending frame is 15 px narrow.
- **Screenshots of a pending font in real Firefox:** `rf-capture-bidi.cjs` (built-in WebDriver BiDi, separate temporary profile; `captureScreenshot` does not wait
  for fonts). Pair each capture with the element's lines read at the same moment, as the script does.
- **Injected test markup and React 19:** leading `<span>` elements in `<body>` survived hydration; an injected wrapper `<div>` caused minified error #418 and a
  client re-render. Judge any injected-markup result by its console errors (recorded per run).


### 5.13 Gate 4 OBS-18 implementation and OBS-19 diagnostic additions (2026-10-09, `DEC-046`)

- **The production correction (OBS-18).** `DcPage` (`components/direction-c/primitives.tsx`) renders four `span.dc-font-prime[aria-hidden="true"]` as the first
  children of `.dc`, one per calibrated display fallback; their glyph is CSS generated content (`app/direction-c.css`). **Every Direction C route must keep
  rendering through `DcPage`** (B5 included), and a new calibrated display fallback face needs its own prime. Expected on every DC route: exactly 4 primes, all
  `aria-hidden`, `visibility: hidden`, 0 px high, no text node, `::before` content `"a"`, first child of `.dc`; none on legacy routes.
- **Verify the committed correction in a real browser:** `docs/ui-revamp/gate-4/obs18-impl/evidence/impl-run-real.cjs` (as §5.12's `rf-run-real.cjs`, with `impl-harness.cjs`:
  same measurement, plus production-prime detection, `<main>`/`.dc` top and document height, and a `cand=inflowcss` test form). Run it with `--cands none` on the
  built correction. **Pass:** 0 H1 line changes under 0 / 300 / 2,500 ms on all 10 routes × 7 widths; the calibrated face painted while the display face is pending.
- **Before/after side checks of two builds** (ariaSnapshot, 40 Tab stops, layout incl. reduced motion, `<main>` innerText/textContent, heading inventory, console and
  hydration messages, prime properties, no-JS pending face): `impl-checks.cjs --before <A> --after <B> --before-harness <impl-harness on A> --after-harness <… on B> --out <file>`.
- **Served HTML / rendered `<main>` diff with the declared primes removed** (markup and RSC flight payload separately; normalises chunk/CSS hashes, BUILD_ID,
  `next/font` class hashes): `impl-html-diff.cjs --plain <A> --fixture <A'> --cand-plain <B> --cand-fixture <B'> --out <file>`.
- **Keep a measurement Firefox in front.** A real Firefox window covered by another app (here the Claude desktop app) pauses its animation frames: a sweep ran
  ~5× slower and its runs stalled. Bring the window to the front after launch and keep it there for the sweep (`osascript -e 'tell application "Firefox" to activate'`).
  The `rf-run-real.cjs` / `impl-run-real.cjs` logs must be written unbuffered (to a file, not through `grep`) to see stalls as they happen.
- **OBS-19 (site fonts) harness:** `docs/ui-revamp/gate-4/obs19/evidence/obs19-harness.cjs` holds ONE web face per run (`--faces manrope,bricolage,dc,none`), records
  every face's FontFace status per frame and the boxes of four element classes kept apart (H1, paragraphs, buttons/CTAs, h2), names the body face from the
  first paragraph's own lines, and attributes each moving transition to the face whose status changed. Real Firefox: `obs19-run-real.cjs`; Playwright:
  `obs19-drive-playwright.cjs <engine> <port>`; summary: `obs19-summary.cjs <files.json>`. Runtime-only candidates (`--cands prime,prime400,optional,block,order`)
  are served test markup/CSS only — **no OBS-19 application change is authorised** (`DEC-046`).
- **OBS-19 has two mechanisms — test both.** Firefox's system-ui interval (mechanism 1) only shows in Firefox; the fallback-metric mismatch (mechanism 2) shows in **every**
  engine when Manrope arrives after first paint, and its largest effect is the **consent banner** on a first visit (no stored consent): Chromium native layout-shift up to
  0.10–0.12. Hold Manrope (`--faces manrope --holds 300,2500`) and keep the banner visible when judging any font change; `layout.cjs`/`cls-routes.cjs` pre-set consent and
  therefore never see the banner.
- **Keep the machine awake for long chains** (`caffeinate -i <chain>`): an idle sleep on battery during this gate stretched steps to hours and produced timeouts; those steps
  were re-run. Check `pmset -g log` when a chain is unexpectedly slow.
- **HTML diffs across builds:** normalise every `-[0-9a-f]{16}.(js|css)` hash (page and layout chunks included), compare the RSC flight payload by its decoded values (React
  renumbers rows and may outline a long string into its own row when the payload size changes), and count React's `<!-- -->` separators separately (`impl-html-diff.cjs`).

### 5.14 Gate 4 OBS-19 remediation additions (2026-10-11, `DEC-047`)

- **The production correction (OBS-19).** `app/layout.tsx` turns off `next/font`'s automatic Manrope fallback (`adjustFontFallback: false`,
  `fallback: ['"Manrope Fallback"']`; the emitted stack is unchanged) and renders two `span.site-font-prime[aria-hidden="true"]` as the first children
  of `<body>`. `app/globals.css` declares `"Manrope Fallback"` as two calibrated faces (Arial 100–500 at 103.25 %, Arial Bold 600–900 at 99 %) and the
  prime rules. Expected on **every** route: exactly 2 site primes (weights 400 / 700, `visibility: hidden`, 0 px, no text node, `::before` "a"),
  both fallback faces `loaded` once the page is laid out; 4 `dc-font-prime` on Direction C routes only.
- **Re-calibrate when the copy changes.** The two `size-adjust` values are swept on the site's own copy: run
  `docs/ui-revamp/gate-4/obs19-remediation/evidence/o19r-sweep.cjs --plain <url> --engine <e> --steps 33 --out <f>` in Chromium, Firefox and WebKit and
  read `o19r-sweep-summary.cjs`; check a build's own fallback with `--steps 0` and `o19r-sweep-config.cjs` / `o19r-w400.cjs`. A new Manrope weight,
  a new surface (e.g. B5 pages) or substantial new body copy needs a re-sweep. The banner and button rows must stay at 0 re-wraps.
- **Expected residual (do not classify as new):** with Manrope held after first paint, ≈ 3 % of weight-400 elements change lines in every engine
  (largest single source: the footer tagline); paragraphs move ≤ 52 px and buttons ≤ 29 px; Chromium native layout-shift ≤ 0.05 in the 2.5 s case.
  The consent banner must not change height (0 px) and no Firefox pending frame may be system-ui.
- **The → arrow (U+2192) is outside Manrope's latin subset**: it is drawn by `"Manrope Fallback"` even when Manrope is loaded, so any fallback change
  shows in the loaded state there. `o19r-glyph-coverage.cjs <url>` lists such characters per route. A Chromium `<main>` pixel difference confined to
  arrows after a fallback change is expected; anything else is not.
- **Dynamic before/after:** `o19r-harness.cjs` (adds `--modes cold,warm`), chains `o19r-chain-playwright.sh` (Playwright), `o19r-chain-real.sh`
  (official Firefox; keep the window in front), `o19r-chain-safari.sh` (`open -a Safari`; Safari pauses when its window is covered — keep it in
  front or the runs are excluded as throttled); tables `o19r-accept.cjs`, per-view `o19r-paired.cjs`; side checks `o19r-checks.cjs`; full regression
  `o19r-regression.sh`.
- **Sleep:** `caffeinate -dims` does not prevent clamshell (lid-close) sleep. Check `pmset -g log` for `Clamshell Sleep` against each result file's
  time and re-run anything written inside a sleep window (this gate moved two such files to `runs/excluded/`).
- **Fixture server binding:** `cms-fixtures/serve-fixture.cjs` passes no host, so `next start` listens on all interfaces. For loopback-only serving
  start `next start <dir> -p <port> -H 127.0.0.1` with the same environment (`CONTENTFUL_SPACE_ID=fixture`, `CONTENTFUL_ACCESS_TOKEN=fixture`,
  `CONTENTFUL_PREVIEW_ACCESS_TOKEN=`, `NODE_OPTIONS=--require …/cms-fixtures/preload.cjs`).

### 5.15 Gate 4 A1 additions (2026-10-11, `DEC-049`)

- **Figure text (KD-09 / KD-10 / KD-05).** `docs/ui-revamp/gate-4/a1/figure-a11y.cjs --base <url> --engine <e> --out <f.json>` measures every visible
  SVG figure in `<main>` on the 6 figure routes × 9 widths (incl. the 761 and 1100 drawing switches):
  - rendered text size (floor 12px);
  - contrast composited through every ancestor opacity (floor 4.5:1);
  - clipping at the drawing edge;
  - text–text overlaps and text crossing a `line`, `rect` or straight `path`;
  - the text inventory and accessible name.

  Add `--text-spacing 1 --widths 320,360,390,430` for KD-05. **Expected from A1 on, in Chromium and WebKit: 0 in every column.**
- **Firefox geometry is not comparable:** Gecko reports larger SVG text boxes (the unchanged `a4f9710` build already shows 44 clipped and 102 overlaps
  there). In Firefox read size and contrast only, and review geometry visually with `figure-shots.cjs`.
- **Adding or editing figure text:** keep vertical-drawing lines short enough for the 1.4.12 overrides (≈ 25 characters from x=72, 32 from the left
  edge at 14 units), and use `--dc-gap-text` / `--resolve-accent-dark` for text, never the mark colours. Re-run the probe in Chromium and WebKit.
- **B5 note:** `MethodChain` / `MethodChainState` switch drawings at 1100px (not 761px); their column at 1100 is 792–900px.
