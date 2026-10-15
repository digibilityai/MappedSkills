# MappedSkills UI Revamp — Gate 4 · E1-a: Early Real-Device Checkpoint

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Authority** | Owner E1-a brief (after B2, before B3); `DEC-036` (E1 mandatory before staging), `DEC-039` (prepare an early checkpoint after B2); protocol `gate-4/b2/E1A_EARLY_DEVICE_CHECKPOINT.md` |
| **Status** | **PARTIAL.** One real browser was used (desktop Safari 26.2, rendering only). No physical phone, no screen reader, no Windows, no Firefox release, no OS larger-text setting was available. **E1 remains OPEN.** Nothing here closes E1, E6, LIVE-1, KD-02 or PROC-1 |
| **Build under test** | `ui-revamp` @ `146a892` (application = B2 `63df52a`). Scratch copies outside the repo (`git archive`, `docs` excluded). Plain build `gkvOedvd-8CrMJ_2rU35n` on `127.0.0.1:3910`; CMS-fixture build `IsXlp5yPt8RaccFzwaok_` on `127.0.0.1:3920`. `.env.local` carries **no** GTM ID, no Contentful credentials and no DB credentials (checked by variable name, values not printed) |
| **Changes made** | Documentation and QA evidence only. **No application, analytics, consent, dependency or configuration change.** No push, merge or deploy. No preview exposed beyond this Mac (see §2.3 for a 5-second exception) |
| **Evidence** | [`gate-4/e1a/evidence/`](gate-4/e1a/evidence/): `run/` (machine results) · `safari-desktop/` (19 real-Safari window captures) · `visual/index.html` (8-route comparison) · three probe scripts |

---

## 1. Baseline verified

| Item | Result |
|---|---|
| Branch / HEAD | `ui-revamp` @ `146a892` — **VERIFIED** |
| B2 application commit | `63df52a` — VERIFIED (`git log`) |
| B1 / R1 | `f82d09b` (B1 app), `afb08ed` (R1), `DEC-037`, `DEC-038` — VERIFIED in log and `DECISION_LOG.md` |
| B2 report / decision | `GATE_4_B2_PAID_MEDIA_PAGES.md`, `DEC-039` — read |
| E1-a protocol | `gate-4/b2/E1A_EARLY_DEVICE_CHECKPOINT.md` — read; its checklist IDs (C1–C5, B1–B9, A1–A5) are reused in §6 |
| E1 / E6 requirements | `DEC-036` table; KD-02 acceptance gate (`gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md`); E6 audit — read |
| Working tree | Only `next-env.d.ts` (modified, unrelated) and the excluded screenshot collections were dirty before this task. **Both left untouched** |

## 2. Test environments actually available

### 2.1 Capability audit (what this Mac can genuinely do)

| Environment | Available? | Evidence of the check | What was done |
|---|---|---|---|
| **Physical Android phone + Chrome** | **No** | No `adb`, no Android SDK, nothing on USB | Manual pack §6.1 |
| **Physical iPhone + Safari** | **No** | Nothing on USB; only Command Line Tools (no Xcode, so no iOS Simulator, which would not count anyway) | Manual pack §6.2 |
| **Desktop Safari** | **Partly**: Safari **26.2** on macOS **15.7.3** (24G419) is installed and was used for **rendering only** | `safaridriver` refused a session: *"You must enable 'Allow remote automation' in the Developer section of Safari Settings"*. That is an owner setting and was **not changed**. No keyboard, VoiceOver or interaction could be driven | 19 genuine window captures by opening URLs (§3.1) and an ink-width measurement (§5.2). Keyboard + VoiceOver: manual pack §6.3 |
| **Desktop Firefox (release)** | **No** | Not in `/Applications`. Installing it would be a download needing approval | Manual pack §6.4. Playwright Firefox used as an engine proxy only |
| **macOS VoiceOver** | **No (not drivable)** | Present in the OS, but a screen reader needs a person listening; no automation permission exists, and switching it on would take over the owner's machine | Manual pack §6.3 |
| **iOS VoiceOver** | **No** | No iPhone | Manual pack §6.2 |
| **Windows High Contrast** | **No** | No Windows machine or VM | Manual pack §6.5. Chromium `forced-colors` emulation used as a proxy only |
| **OS larger-text settings** | **No** | Phone setting | Manual pack §6.1/§6.2. 200% and 400% zoom proxies already in the B2 record |

**Not counted as E1 evidence (stated so it is not mistaken for it):** Playwright Chromium, WebKit and Firefox engine builds;
Chromium forced-colours emulation; Google Chrome on this Mac (not in the E1 list); the Claude in-app browser.

### 2.2 How the candidate can reach real devices (procedure, not executed)

The phones that E1 needs are not attached to this session, so **no LAN preview was started.**

**Default rule:** every local preview server binds to `127.0.0.1` (`-H 127.0.0.1`). Binding to the LAN (`-H 0.0.0.0`) is an
exception that needs the owner's **explicit approval for that test session**. Once approved, a developer (or this assistant)
runs this **on the Mac**, on the owner's private Wi-Fi only:

```bash
npx next start <scratch>/plain -p 3300 -H 0.0.0.0
```

- Phones on the **same Wi-Fi** open `http://<mac-ip>:3300` (today the Mac is `192.168.29.100`; check with `ipconfig getifaddr en0`). macOS may ask whether to allow incoming connections; allow it for `node` only for the session.
- **Why it is safe:** the build has no GTM ID (no analytics fires), no Contentful credentials (CMS pages show their empty state), no DB (the only API, `/api/enquiry`, returns 503, and `GET` 405). `/launch-checklist` is 404 (internal pages off). No admin route exists (`/admin`, `/studio` 404).
- **Do not** use public Wi-Fi, port-forwarding, ngrok/Cloudflare tunnels or any public URL without a separate owner approval.
- For a real blog article, run the fixture build the same way on port 3320 (synthetic content only).
- **Stop the server** when testing ends (Ctrl-C).

### 2.3 Disclosure: brief LAN exposure in this session

The harness helper `cms-fixtures/serve-fixture.cjs` starts `next start` **without** a host flag, so on first start the
fixture server listened on **all interfaces** (`*:3920`). It was found by `lsof` immediately, stopped within seconds, and restarted
on `127.0.0.1` with the same command line plus `-H 127.0.0.1`. The build behind it contained synthetic fixture content only (no
credentials, no GTM, no DB). A LAN probe afterwards was refused. **Proposed (not done):** add an optional host argument to
`serve-fixture.cjs`, defaulting to loopback (docs tooling only, needs approval because it changes the runbook's command).

## 3. Tests completed

### 3.1 Real desktop Safari 26.2 (genuine; rendering only)

Window 1324×841 pt, Retina, classic scrollbar, consent **undecided** (banner showing). Pages opened by URL; deeper sections reached
by fragment links. **No keyboard, pointer, VoiceOver or form interaction** was possible (§2.1).

| Page | Captures (`safari-desktop/`) | Result |
|---|---|---|
| `/` | top, close | **PASS (render).** Hero, tangerine close, header and banner correct; display and body faces loaded |
| `/services` | top, boundary, fit | PASS (render). Reverse pair side by side at this width |
| `/seo` | top, horizon plate, questions | PASS (render) |
| `/google-ads` (B2) | top, boundary, measurement | PASS (render). Not-promised list beside the owned statement; limit beside its claim |
| `/social-media-ads` (B2) | top, boundary | PASS (render). Half/half boundary; tertiary link |
| `/contact` (legacy body) | top, form | PASS (render). Labels and hints visible. **G4-1 seam visible** (body edge 52px vs header 96px at 1440 in the proxy probe) |
| `/privacy-policy` (legacy) | top, end | PASS (render). G4-1 seam; legacy centred CTA band then the Direction C footer |
| `/blog/fixture-article-full-structure` (legacy, CMS fixture) | top, end | PASS (render). G4-1 seam |

Header (not sticky; fragment jumps scroll it away), footer and the consent banner rendered on every page. Fonts: no visible fallback
in any capture (loaded from localhost, so this says nothing about a cold mobile connection).

### 3.2 Engine proxies, re-run on `146a892` (NOT E1 evidence)

| Check | Population | Chromium | WebKit | Firefox |
|---|---|---|---|---|
| `nav-checks.cjs` (D1–D4, M1–M5 incl. LIVE-1 condition and banner-cover, A1, E1) | 10 targets: 5 DC + `/contact`, `/about`, `/privacy-policy`, `/terms`, blog fixture | **176 pass · 0 findings** | **176 · 0** | **176 · 0** |
| `route-a11y-motion.cjs` (F1 full Tab walk 390/1440/200 %, F2 forced colours, M1–M3 motion, N1 no-JS, P1 print, R1 320 px) | 5 DC + `/contact` + `/privacy-policy`; blog fixture | 8 + 2 fails — **all known or pre-existing** (§4) | 4 + 0 — same set | 4 + 0 — same set |
| B2 routes in that suite | `/google-ads`, `/social-media-ads` | **0 failures.** Walks 47/54/48 and 40/47/41 stops (= B2 record), 0 lost in forced colours, 1 motion target, 0 text in pre-state, reduced motion clean, no-JS complete, min text 12.48 px | 0 | 0 |
| `e1a-probe.cjs` (gutter, H1, reverse-pair gap, min text, CTA heights) | 8 routes × 320/390/768/1440 | §4–§5 | §4–§5 | §4–§5 |
| `e1a-h1-wrap.cjs` (H1 line breaks per engine) | 5 DC × 360/390/430 | §5.2 | §5.2 | §5.2 |
| `cls-routes.cjs` throttled CLS (400 ms RTT, 50 kB/s, 4× CPU, 3 runs, 7 widths) | 5 DC routes | §5.3 | CDP only | CDP only |
| `e1a-captures.cjs` | 8 routes: 390/1440 first screen + last section → footer; 390×700 menu open with banner | [`visual/index.html`](gate-4/e1a/evidence/visual/index.html) | — | — |

Harness note: in Firefox the full Tab walk reaches the 400-iteration cap on every route (focus never returns to `<body>`), exactly
as in the B2 record. 0 bad stops are reported, but the Firefox **stop count** is not meaningful. Real Firefox keyboard traversal is in §6.4.

## 4. Known observations reviewed

| ID | What was checked | Finding | Status |
|---|---|---|---|
| **LIVE-1** (branch condition) | `nav-checks` M2/M3/M5 on 10 targets × 3 engines; menu-with-banner captures (390×700) on 8 routes | Contact Us and Book a call are the first two menu items, in view, not covered by the banner, on every page incl. legacy bodies. **Proxy PASS.** Never tried on a phone | **OPEN.** Branch condition holds in proxies; production unchanged; real-phone check §6.1 C2/C3 |
| **KD-02** (High Contrast focus) | Full forced-colours walk (Chromium emulation) | Direction C chrome and all 5 DC bodies: **0** lost stops. Legacy bodies unchanged: `/contact` **7** per width (6 form fields + submit), `/privacy-policy` **3**, blog article **8** — identical to the B1 counts | **OPEN** (body part). Real Windows HC still required (§6.5). B6 owns the form |
| **OBS-7** (`/services` boundary spacing) | Probe, 3 engines | **Confirmed:** reverse pair stacked with **0 px** gap at 320, 390 and 768 in all three engines; `/google-ads` (opt-in `.dc-after-main`) 28 / 28 / 44 px. Visible in [`visual/`](gate-4/e1a/evidence/visual/index.html) | **OPEN**: needs owner approval (§8 R-1) |
| **OBS-8** (`/seo` small text) | Probe + route R1, 3 engines | **Confirmed, scope corrected:** the horizon-plate `dt` terms ("Horizon", "If it is urgent", "Not promised") are **11.52 px at every width** (320–1440), not only at 320 | **OPEN**: decide with the B3 figure-text standard |
| **OBS-9** (print timing) | Route P1, 3 engines | **Reproduced exactly:** close marks at opacity 0 on `beforeprint` (Chromium, WebKit), 1 (Firefox), settled 1 in all; same on `/seo` and both B2 routes | **OPEN.** Real print still RESEARCH REQUIRED (§6.3 step P) |
| **B2 font-loading stability** | Throttled CLS, 5 routes × 7 widths × 3; H1 line-break comparison; real-Safari ink width | §5.3 (CLS) and §5.2 (engine metrics). The Android fallback cannot be assessed here: the calibrated fallbacks are `local("Arial Bold")` / Liberation Sans, which **Android does not ship**, so Android falls through to its uncalibrated default sans | **OPEN**: Android cold-load test §6.1 B2 is mandatory |
| **G4-1** (seam, known) | Real Safari + probe | Re-observed: on `/contact`, `/privacy-policy` and the blog article the body edge differs from the header edge (e.g. −44 / +16 / +8 px at 1440; −7 px at 768) | Known, owner-acknowledged, branch-only |
| **X5** (Gate 3 exception) | Route R1 | `/services` figure SVG numerals "01"–"04" at **11 px** | Known; Gate 4 `Figure` work |

## 5. New observations (all pre-existing; none introduced by B2)

### OBS-10 — Homepage hides a text label in its scroll-reveal pre-state (approved route)

- **What:** on `/`, the chain figure's `<li class="dc-boundary"><span>We answer for this much</span></li>` gets `opacity: 0` from
  `.dc-pre .dc-chain .dc-boundary` (`app/direction-c-pages.css:379`) until the reveal runs. `route-a11y-motion.cjs` M2 fails on `/`
  in **all three engines** (`run/route-a11y-motion-*.txt`).
- **Why it matters:** `GATE_4_MOTION_SPECIFICATION.md` §4 states as VERIFIED that approved routes move "only marks, lines, joins and the
  boundary rule. **No text node is ever hidden**". That statement is **incorrect for the homepage**: the boundary item contains text.
- **Impact:** low. The text is in the DOM (screen readers get it), it is visible without JS, under reduced motion and once revealed
  (0 pre-states after scrolling). The risk is a visitor reading the figure before the reveal triggers, or a failed script.
- **Pre-existing:** introduced with the approved homepage (`23c937d`, Gate 2/3). Earlier runs did not include `/` in this check (B2 used `/seo` as its only control).
- **Proposed fix (approval needed; approved body):** target only the boundary **rule** (its border/pseudo-element) in the pre-state,
  not the `li`, so the label is never hidden; and correct the motion specification's statement. See §8 R-2.

### OBS-11 — Playwright WebKit draws the display face wider than real Safari (harness limitation)

- **Measured:** first H1 line on `/google-ads` at 62.4 px, same 1324 px viewport, same pixel method (`e1a-ink-compare.cjs`,
  `run/ink-compare.txt`): **real Safari 26.2 = 564.5 CSS px**; Chromium 574; Firefox 574; **Playwright WebKit 601**.
- **Effect in the proxy:** WebKit re-wraps H1s that Chromium/Firefox keep shorter, e.g. `/seo` and `/social-media-ads` at 390 go from
  2 to **3** lines, and `/services` at 360 from 2 to 3 (`run/h1-wrap.txt`).
- **Reading:** real desktop Safari agrees with Chromium/Firefox within ~2 %, so this is a **proxy artefact**, not a Safari defect.
  **iOS Safari is not established** (different OS font stack). Two consequences: WebKit-proxy line-wrap or CLS conclusions are not
  reliable for the display face; and the iPhone check §6.2 B1/B2 must look at the H1s.

### OBS-12 — Sub-12 px HTML labels on the homepage

`/` renders the chain labels and proof `dt` terms ("We answer for this much", "Evidence", "Method", "Limitation") at **11.84 px** at
every width. No programme floor applies to HTML labels (the 12 px rule is for figure text, X5 class), so this is **not a defect**;
recorded so that the B3 type standard (OBS-8 decision) covers the whole family: 11 px (X5), 11.52 px (OBS-8), 11.84 px (OBS-12).

### PROC-E1A-1 — The B2 visual comparison is viewable but not reproducible from the repository

`gate-4/b2/evidence/visual/index.html` opens and all **45/45** referenced images exist and are committed, but the script that
produced them is not in the repository (no tooling references the file names). The rest of the B2 record **is** reproducible: the
route-a11y, nav and probe results above match it. This checkpoint commits its own capture script (`e1a-captures.cjs`). **Reproduction verified (2026-10-09, before commit):** a fresh rebuild of `146a892` served on `127.0.0.1` reproduced the same 40 captures and an identical `index.html`; all 40 matched the committed images pixel for pixel (no pixel differing by more than 48 summed RGB levels).
**Proposed:** future batch comparisons commit their capture script beside the images.

### Five-page visual consistency (`visual/index.html`, real Safari captures)

Aesthetic observations only — **no functional or accessibility defect**, and none reopens an approved decision:
- Opening variants are by design: `/` (hero, no crumb), `/services` (hub eyebrow, no crumb), `/seo`, `/google-ads`, `/social-media-ads`
  (crumb + eyebrow + split opener). Gutters align on all five at every width (logo edge = body edge, probe Δ0).
- H1 length differs: `/google-ads` is 3 lines at 1440 where the others are 2 (longer approved copy), and 3–4 lines at 320.
- The tangerine close, CTA pair (52 px stacked on mobile, 48 px desktop) and footer seam are consistent across the five.
- The visible inconsistency on the site is between Direction C and legacy bodies (G4-1), not among the five DC pages.

### 5.3 Throttled CLS (font-loading stability, Chromium CDP proxy)

`run/cls-throttled.txt`: 5 routes × 7 widths × 3 runs = 105 runs, same profile as B2 (`cls-routes.cjs`).

| Route | CLS (all widths, all runs) | Comparison |
|---|---|---|
| `/google-ads`, `/social-media-ads` (B2) | **0.000** in 42/42 | = B2 run 2 record (the 92 % fallback fix holds) |
| `/seo` | 0.000 in 21/21 | = Gate 3 record |
| `/services` | 0.000, except **0.001** at 768 (3/3) | = Gate 3 record (`gate-3-acceptance/evidence/final-run/cls-throttled.txt`) |
| `/` | **0.001** at every width | = Gate 3 record |

All values are far below the 0.1 "good" threshold and identical to the approved records, so there is **no regression**. Limit: this is
Chromium with Mac fonts. It says nothing about Android (no Arial/Liberation, so the calibrated fallbacks do not apply) or about iOS
(OBS-11). Those are §6.1 B2 and §6.2 B2-i.

## 6. Manual owner test pack

**Who:** anyone who can follow steps on a phone or computer; no coding. **Build:** the local candidate from §2.2 (a developer starts it).
**Do not:** press **Send** on the contact form with real details, accept analytics on a production URL, or book a real call. On the
local build, Send is safe to press with dummy text (it reports that the enquiry did not go through; that is expected).
**Record** each step as PASS / FAIL / N/A on the sheet (§6.7), with a screenshot (or a screen recording for menus, motion and
screen readers) for every FAIL.

**Severity guide for a FAIL**

| Severity | Meaning | Examples | Effect |
|---|---|---|---|
| **S1 – blocker** | A visitor cannot contact us or cannot use the page | Contact Us / Book a call unreachable; menu won't open or close; text cut off so a CTA can't be read; keyboard focus invisible | Fix before B3 if in shared chrome/components; always before staging |
| **S2 – major** | Usable but clearly broken for some users | Screen reader reads the wrong thing; large text overlaps; heading jumps/re-wraps visibly after load; horizontal scrolling | Fix before staging; before B3 if shared |
| **S3 – minor** | Cosmetic | Spacing looks uneven; a decorative mark misbehaves | Record; owner decides |

### 6.1 Android phone — Chrome (current release)

Preview: `http://<mac-ip>:3300` (same Wi-Fi). Record: phone model, Android version, Chrome version (Chrome ⋮ → Settings → About Chrome).

| # | Steps | Expected | Sev. if fails |
|---|---|---|---|
| C2 | On `/`, `/google-ads`, `/contact`, `/privacy-policy`: tap the menu (☰) | Menu opens; **Contact Us** then **Book a call** are first and visible without scrolling | S1 |
| C3 | Clear site data first (Chrome ⋮ → Settings → Site settings → All sites → the IP → Clear) so the cookie banner shows; open the menu | Both CTAs visible, not covered by the banner | S1 |
| C1 | Scroll down any page | Header scrolls away (does not stick) | S3 |
| C4m | In the menu, tap each service link and **Services →** | Each opens the right page | S1 |
| C5 | Footer: tap the email, the phone number, "Analytics preferences" | Mail app / dialler opens; the banner reappears | S2 |
| **B2** | **Font swap (critical on Android).** Chrome ⋮ → Settings → Site settings → All sites → the IP → **Clear & reset**, then open `/social-media-ads`, `/google-ads` and `/seo` while **recording the screen**; watch the big heading. On fast Wi-Fi the swap can be too quick to see, so also do the precise version (needs a developer, ~10 min): phone in USB-debugging mode → on the Mac, Chrome → `chrome://inspect` → *inspect* the phone tab → Network → **Slow 4G**, *Disable cache* → reload | Heading may change typeface once, but **its lines must not re-wrap and push the text and buttons down**. Note the line count before and after the swap | S2 |
| B1 | First screen of `/google-ads` and `/social-media-ads` | Eyebrow, heading, intro, side paragraph and both buttons visible; nothing cut off | S1/S2 |
| B3 | `/google-ads` "What is in scope": tap rows | Each opens/closes; plus becomes minus | S2 |
| B4 | `/google-ads` "we do not promise" section | Owned statement first, then the list, with **visible space between them** | S3 |
| B4s | `/services` same section (OBS-7) | Note whether the paragraphs and "We do not promise" **touch** (expected today: they do) | S3 (known) |
| B8 | Tap every button and link on the two B2 pages | Easy to hit; "The method, including what cannot be attributed" opens `/how-it-works` | S2 |
| B9 | Rotate to landscape on `/google-ads` and `/contact` | No sideways scrolling; buttons usable | S2 |
| A1 | Settings → Display → **Font size** to the largest (and Display size larger, if offered). Re-open `/`, `/google-ads`, `/contact`, open the menu | Nothing overlaps or is cut off; no sideways scroll; the menu CTAs still visible | S1/S2 |
| A4 | Settings → Accessibility → **Remove animations** on. Scroll to the end of `/google-ads` | The five little squares above the last heading are already in place (no animation) | S3 |
| F1 | `/contact`: tap Send with all fields empty | Error messages appear next to the fields and are readable; nothing is sent | S2 |

### 6.2 iPhone — Safari (current iOS), then VoiceOver

Record: iPhone model, iOS version (Settings → General → About). Same preview URL.

| # | Steps | Expected | Sev. |
|---|---|---|---|
| C1–C5, B1–B9, F1 | As §6.1 (to reset the banner: Settings → Safari → Advanced → Website Data → remove the IP) | As §6.1 | as §6.1 |
| B2-i | Cold load `/seo`, `/social-media-ads`, `/services` (after clearing website data); look at the big heading | Note the **number of lines** of each heading (proxy engines disagree: 2 vs 3 at this width, OBS-11). No visible jump after load | S2 |
| A1 | Settings → Accessibility → Display & Text Size → **Larger Text** on, slider at the largest standard step, then AX1. In Safari also try **aA → larger text (150 %, 200 %)** | No overlap, no clipped heading or buttons, no sideways scroll | S1/S2 |
| A4 | Settings → Accessibility → Motion → **Reduce Motion** on; scroll `/` and `/google-ads` | No movement; marks already in place | S3 |
| **A2 (VoiceOver)** | Settings → Accessibility → VoiceOver on (triple-click side button can toggle). On `/google-ads`: rotor (two-finger twist) → **Headings**; swipe through | Headings: 1 main heading then 5 section headings (`/social-media-ads`: then 3). Landmarks include "Breadcrumb". The link "The method, including what cannot be attributed" is read **without** "arrow". Decorative squares are silent. Scope rows say "collapsed/expanded" | S2 |
| A2-m | VoiceOver: open the menu | Button announces "Menu, collapsed/expanded"; first items Contact Us, Book a call | S1 |
| A2-f | VoiceOver on `/contact`: move through the form; double-tap Send empty | Each field's label and "required" are read; errors are announced | S2 |
| A2-h | VoiceOver on `/` at the chain figure (OBS-10) | "We answer for this much" is read even before scrolling reveals it | S3 |

### 6.3 Mac — Safari 26.x keyboard, VoiceOver and print

Setup: Safari → Settings → Advanced → **"Press Tab to highlight each item on a webpage"** on.

| # | Steps | Expected | Sev. |
|---|---|---|---|
| A5 | On `/`, `/google-ads`, `/social-media-ads`, `/contact`: press Tab repeatedly from the top to the bottom | A clear dark outline on every item, in a sensible order, never hidden | S1 |
| C4 | Tab to the Services arrow, press Enter, then Escape | Panel opens; Escape closes and focus returns to the arrow; panel has 6 services + Measurement + All services | S2 |
| A2-mac | VoiceOver (Cmd-F5). VO-U → Headings and Landmarks on `/google-ads`, `/social-media-ads`, `/contact` | As §6.2 A2 / A2-f | S2 |
| P | File → Print preview on `/google-ads` **immediately** after load (OBS-9) | Note whether the five squares above the last heading are faint/missing in the preview | S3 |
| W | Window narrowed to phone width (drag the edge) on `/google-ads` | Menu button appears; no sideways scroll | S2 |

### 6.4 Firefox (current release, Mac or Windows)

Install from mozilla.org (owner action). Repeat §6.3 A5 and C4 on `/`, `/google-ads`, `/social-media-ads`, `/contact`, and check
the first screen of all five DC pages at full width and with the window narrowed. Expected as §6.3. Also Settings → Zoom 200 %: no sideways scroll (S2).

### 6.5 Windows — High Contrast (KD-02 acceptance)

Windows 11: Settings → Accessibility → **Contrast themes** → *Night sky* (dark) and *Desert* (light). Browsers: Edge and Chrome.

| # | Steps | Expected | Sev. |
|---|---|---|---|
| A3 | Press Tab through the **whole** of `/google-ads`, `/social-media-ads`, `/contact`, `/privacy-policy` and one blog article | Every focused item shows a visible outline. **Known today (KD-02):** `/contact` form fields and Send, privacy-page CTAs and blog share links/CTAs are expected to lose it; record each one | S1 (known for legacy bodies) |
| A3b | Look at buttons and scope rows | Visible boundaries; meaning still clear even if squares lose colour | S2 |
| O2 | (classic scrollbars) `/` at a 1024 px wide window | No sideways scroll (OBS-2) | S3 |

### 6.6 What counts as complete

E1-a is complete only when every row of §6.7 is filled by a person on the real environment, each FAIL has a screenshot or
recording, and each FAIL is either fixed and retested or accepted by the owner in writing.

### 6.7 Recording sheet

| Env | Device / OS | Browser + version | Steps PASS / FAIL / N/A | FAIL IDs + evidence link | Tester / date |
|---|---|---|---|---|---|
| Android Chrome (§6.1) | | | | | |
| iPhone Safari (§6.2) | | | | | |
| iOS VoiceOver (§6.2 A2) | | | | | |
| macOS Safari keyboard (§6.3) | macOS 15.7.3 (this Mac) | Safari 26.2 | Rendering only done here (§3.1); keyboard **not** done | | |
| macOS VoiceOver (§6.3) | | | | | |
| Firefox release (§6.4) | | | | | |
| Windows HC — Edge (§6.5) | | | | | |
| Windows HC — Chrome (§6.5) | | | | | |

## 7. Known defects and status after E1-a

**Closed by this checkpoint: none.**

| ID | Status |
|---|---|
| E1 | **OPEN** (no phone, screen reader, Windows or Firefox release evidence) |
| E6, OBS-1, OBS-6 | OPEN, not in scope; nothing changed |
| LIVE-1 | OPEN. Branch condition holds in all proxies; production unchanged |
| KD-02 | OPEN (body). Counts unchanged: `/contact` 7, `/privacy-policy` 3, blog 8 per width |
| OBS-7, OBS-8, OBS-9 | OPEN, confirmed; OBS-8 scope corrected (all widths) |
| OBS-10, OBS-11, OBS-12, PROC-E1A-1 | **NEW**, pre-existing (§5) |
| G4-1, X5, KD-08 (bodies) | Known, unchanged |
| PROC-1, LIVE-2 | OPEN, untouched |

## 8. Recommended remediations (proposals; none applied)

| # | Item | Proposal | Scope | Needs |
|---|---|---|---|---|
| R-1 | OBS-7 | Add `.dc-after-main` to the `/services` boundary's side column (the B2 helper; one class) | Approved `/services` body | Owner approval; `<main>` pixel change on `/services` <900 px only, declared |
| R-2 | OBS-10 | Change the homepage pre-state so only the boundary **rule** is hidden (e.g. move `opacity:0` from `.dc-boundary` to its border/pseudo-element), and correct `GATE_4_MOTION_SPECIFICATION.md` §4 | Approved `/` body + spec | Owner approval; re-run M2 and pixel checks on `/` |
| R-3 | OBS-8 / OBS-12 / X5 | Decide one small-text floor (figure **and** label text) before B3 standardises `Figure`; then apply per batch | Design-system decision | Owner decision |
| R-4 | OBS-9 | `@media print { .dc * { transition: none !important } }` (already proposed in B2) | Shared CSS | Owner approval + one real print test (§6.3 P) |
| R-5 | Android fallback (X2/G4-3) | **Only if §6.1 B2 shows a jump:** add `local("Roboto")` metric-calibrated fallback faces (one per existing fallback), measured like the B2 sweep | Shared font CSS | Real-Android evidence first |
| R-6 | OBS-11 | Treat Playwright WebKit wrap/CLS results for the display face as non-authoritative; prefer real Safari evidence | QA method | Note in the runbook (done in this checkpoint) |
| R-7 | §2.3 | Optional host argument for `serve-fixture.cjs`, default loopback | Docs tooling | Approval (changes a runbook command) |

## 9. B3 entry assessment

- **B2 itself:** nothing in this checkpoint contradicts B2. Both B2 routes are clean in every proxy check, reproduce their B2 numbers, and render correctly in real desktop Safari.
- **Shared-component risk that B3 inherits:** the display-face fallback on Android (R-5) and the iOS H1 wrapping (OBS-11) are **unknown**, not failed. B3 adds three capability pages with new H1 strings and the `Figure` component, so an Android/iOS font problem found later would be fixed once in shared CSS and would cascade to B3 pages: a moderate, contained rework risk.
- **Decisions B3 needs regardless:** R-3 (text floor) before `Figure` text is standardised; ideally R-1/R-2 decided so B3 copies the corrected patterns.
- **Recommendation:** B3 **may proceed locally**, on a separate owner instruction, while the outstanding E1 checks stay OPEN, **provided** (a) the owner accepts the Android/iOS font risk explicitly or runs §6.1 B2 and §6.2 B2-i first (≈15 minutes on two phones, the highest-value items), and (b) R-3 is decided before `Figure` ships. E1 remains a hard gate before staging (`DEC-036`). **B3 was not started.**

## 10. Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-08 · Claude (Opus 5.5) · Accessibility QA Lead / Cross-Browser Test Engineer / Release Quality Manager · Gate 4 E1-a.
- **Context read:** `CLAUDE.md`; `CONTEXT_INDEX.md`; `CURRENT_STATE.md` (Gate 4 blocks); `DEC-036`–`DEC-039`; B2 report; E1-a protocol;
  B0 known-defects register (§1, KD-02, §4, §6); QA runbook §5; motion specification §4; relevant CSS and header source (read only).
- **Completed:** §1–§9. **Files created:** this report; `gate-4/e1a/evidence/**` (scripts `e1a-probe.cjs`, `e1a-captures.cjs`,
  `e1a-h1-wrap.cjs`, `e1a-ink-compare.cjs`; `run/`; `safari-desktop/`; `visual/`). **Files modified (governance only):**
  `CURRENT_STATE.md`; `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` (§7); `gate-4/b2/E1A_EARLY_DEVICE_CHECKPOINT.md` (status line);
  `QA_REGRESSION_RUNBOOK.md` (§5.6).
- **Decisions approved during session:** none (no DEC recorded). **Proposed:** R-1 … R-7.
- **Tests actually run:** §3.1 (real Safari rendering), §3.2 (proxies). **Not run:** any physical-device, screen-reader, Windows HC,
  Firefox release, larger-text or real print test.
- **Stop condition honoured:** no B3; no application, analytics or consent change; no public preview; no push, merge or deploy.
  Servers on `127.0.0.1:3910/3920` are stopped at the end of the session.
