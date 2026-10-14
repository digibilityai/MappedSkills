# Gate 4 · E1-a — early real-device checkpoint (after B2)

| | |
|---|---|
| **Date prepared** | 2026-10-08 |
| **Status** | **NOT RUN ON A DEVICE — E1 REMAINS OPEN.** This is the protocol and the recording sheet. **Update 2026-10-08:** the E1-a checkpoint ran what this Mac allows (real desktop Safari 26.2 rendering only, plus engine proxies) and superseded this checklist with a fuller manual owner pack: [`../../GATE_4_E1A_DEVICE_CHECKPOINT.md`](../../GATE_4_E1A_DEVICE_CHECKPOINT.md) §6 |
| **Authority** | `DEC-036` (E1 mandatory before staging), `DEC-039` (prepare an early checkpoint after B2), `GATE_4_QA_ACCEPTANCE_MATRIX.md` §6 |
| **Why now** | B1 made the chrome global and B2 is the first body migration. Shared defects (chrome, buttons, type, display-font fallbacks) found here are fixed once, before they reach 24 more routes |

## 1. What was and was not available in the B2 session

| Environment | Available to the B2 session? | Note |
|---|---|---|
| Android Chrome (physical) | **No** | No device attached |
| iPhone Safari (physical) | **No** | No device attached. The iOS Simulator is not a substitute for E1 |
| Desktop Safari (macOS) | **Not automated** | Needs the owner to enable *Develop → Allow Remote Automation* (Gate 3 §2). Not changed |
| Desktop Firefox (release) | **No** | Not installed. Playwright's Firefox build was used as an **engine proxy** only |
| VoiceOver (macOS / iOS) | **No** | Screen readers need a person driving them |
| Windows High Contrast | **No** | No Windows machine. Chromium `forced-colors` emulation was used as a proxy only |
| Larger text (iOS Dynamic Type / Android font scale) | **No** | Device setting |

**Browser emulation does not satisfy E1** (`DEC-036`). The B2 automated results (three engine builds, emulated forced colours,
200%/400% zoom equivalents, text spacing) are recorded in `GATE_4_B2_PAID_MEDIA_PAGES.md` and are proxies only.

## 2. Build under test

Serve a **local** production build of the B2 commit (never production, never with a real GTM ID):

```bash
npm ci
npm run build
npx next start -p 3300
```

For a phone on the same network, use the Mac's LAN address (`http://<mac-ip>:3300`). Do not submit the contact form to a real
backend: without `DB_*` variables the enquiry API answers 503 by design, which is the expected local result.

## 3. Routes

| # | Route | Why |
|---|---|---|
| 1 | `/` | Approved homepage; hero stage; reference |
| 2 | `/seo` | Approved capability page; reference for B2 |
| 3 | `/google-ads` | **B2** — longest of the two; scope disclosure; boundary with not-promised list; measurement limit beside its claim |
| 4 | `/social-media-ads` | **B2** — shortest capability page; two-column channel-fit boundary |
| 5 | `/about` | A legacy body under the Direction C chrome (the G4-1 seam) |
| 6 | `/blog` (or a live article if a credentialed build is used) | A CMS route |

## 4. Checklist (run on every environment in §1 unless marked)

Record PASS / FAIL / N/A with device, OS and browser version, and a screenshot for every FAIL.

### 4.1 Chrome (header, menu, footer) — all routes
- [ ] C1 Header is not sticky; scrolling does not pin it.
- [ ] C2 Mobile menu opens and closes; **Contact Us** then **Book a call** are first and visible without scrolling (LIVE-1 condition on the branch).
- [ ] C3 With the consent banner showing, open the menu: both CTAs remain reachable and not covered.
- [ ] C4 Services control (desktop): opens, Escape closes and returns focus; links go to the 6 capability routes + Measurement + All services.
- [ ] C5 Footer links, `mailto`/`tel` open the system handlers; "Analytics preferences" reopens the consent choice.

### 4.2 B2 page bodies — `/google-ads`, `/social-media-ads`
- [ ] B1 First screen: eyebrow, H1, lede, side paragraph, **Tell us what you’re trying to fix** and **Book a call** visible; no text clipped.
- [ ] B2 **Display-font swap (X2, Android especially):** on a cold load over mobile data, watch the H1 and the close heading. Record whether lines re-wrap when the display face arrives (Android has no Arial, so the calibrated fallback may not apply).
- [ ] B3 `/google-ads` scope rows: tap a row to open/close; one open at a time after load; every row reachable; plus/minus sign changes.
- [ ] B4 `/google-ads` boundary: below 900px the owned statement and its paragraphs come first, then "we do not promise" with **visible space** between them.
- [ ] B5 `/google-ads` measurement: the "unattributed" limit follows the claim on mobile and sits beside it on desktop/tablet landscape.
- [ ] B6 `/social-media-ads` boundary: the statement block and the three paragraphs read in order on mobile; nothing collapsed.
- [ ] B7 Tangerine close: the five arrival marks settle once when scrolled into view; nothing loops; text is never animated.
- [ ] B8 Every link: tap target comfortable (≥ 44px); the tertiary link "The method, including what cannot be attributed" goes to `/how-it-works`.
- [ ] B9 Rotate to landscape on phones: no horizontal page scroll; CTAs still usable.

### 4.3 Accessibility settings
- [ ] A1 **Larger text** (iOS Dynamic Type at the largest non-accessibility size and at AX1; Android font scale 1.3 and max): no overlap, no clipped H1 or buttons, no horizontal scroll.
- [ ] A2 **VoiceOver (iOS Safari and macOS Safari):** rotor headings list = H1 then the section labels (`/google-ads`: 5 × H2 + close label; `/social-media-ads`: 3 × H2); landmarks include "Breadcrumb" navigation and the named regions; the tertiary link is announced **without** "arrow"; decorative marks are silent; scope rows announce expanded/collapsed.
- [ ] A3 **Windows High Contrast** (Edge and Chrome, a dark and a light theme): every focus stop on the two B2 routes shows a visible outline (KD-02 method: Tab through the **whole** page); buttons and the scope rows keep visible boundaries; the not-promised and arrival marks may lose fill but meaning stays in text.
- [ ] A4 **Reduce Motion** (iOS / macOS / Android "Remove animations"): the close marks are static; no transitions.
- [ ] A5 Keyboard only (desktop Safari with "Press Tab to highlight each item", Firefox): full traversal, logical order, focus always visible and never hidden under the header.

## 5. Recording sheet

| Env | Device / OS | Browser + version | C1–C5 | B1–B9 | A1–A5 | Issues (link screenshots) | Tester / date |
|---|---|---|---|---|---|---|---|
| Android Chrome | | | | | | | |
| iPhone Safari | | | | | | | |
| macOS Safari | | | | | | | |
| macOS Firefox | | | | | | | |
| VoiceOver (iOS) | | | | | | | |
| VoiceOver (macOS) | | | | | | | |
| Windows HC (Edge) | | | | | | | |

## 6. Exit rule

E1-a passes when every row above is filled and every FAIL is either fixed and re-tested, or recorded by the owner as accepted.
Material shared-component findings must be fixed **before B3** (`GATE_4_IMPLEMENTATION_SEQUENCE.md`, B3 depends on "E1-a findings").
**E1 as a whole stays OPEN** until E1-c (full, before staging).
