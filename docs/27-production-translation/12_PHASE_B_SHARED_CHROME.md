# Session 24 — Phase B — Shared Chrome + Layout Primitives

**Session:** 24 + 24B · **Date:** 2026-09-04 · **Branch:** `test_branch`
**Starting HEAD:** `e03819effedf395ee19a42670dd988d99778d0d0` (*"feat: establish Resolve production
foundation"* — Phase A)
**Type:** Shared production chrome translation. Four production files. No homepage composition,
no route copy beyond an authorised footer CTA hierarchy correction, no forms, no analytics.

**Evidence labels used strictly:** **CONFIGURED** = read from the repository · **MEASURED** = a
number produced by running something against a rendered page or a real HTTP response ·
**OBSERVED** = seen directly in output.

**Record history:** Session 24 implemented the shared-chrome changes and committed
(`80dd25d734f0a415f00d027d5f8cca5188f575d5`) before the required 8-width representative-route
validation matrix had been run, and before a footer commercial-hierarchy defect had been caught.
**Session 24B** ran that validation, found and corrected the footer defect, and this document was
updated with the actual completed evidence before the commit was amended. Nothing in §§1–8 below
describes work that didn't happen — only §9 onward reflects the Session 24B completion pass.

---

## 1. Starting point

| | |
|---|---|
| Branch | `test_branch` |
| HEAD before this session | `e03819effedf395ee19a42670dd988d99778d0d0` |
| Untracked file | `README.md` — unchanged and unstaged throughout |
| Session 23 validation artefacts found | Baseline server `:3222` (PID 8344), changed-tree server `:3111` (PID 11485), temporary worktree at `/private/tmp/claude-501/.../scratchpad/baseline` (detached at `91a82b7`) |
| Cleanup performed | Both node processes killed; worktree removed with `git worktree remove --force`. No unrelated process was touched. |

## 2. Existing chrome audit (before editing)

- **Header:** `components/Header.tsx` is a re-export shim (`export { Header } from '@/components/layout/Header'`). The real implementation is `components/layout/Header.tsx`, a client component using `useState` for a mobile menu and a Radix `DropdownMenu` for Services.
- **Desktop nav (before):** Services was a `DropdownMenuTrigger` — a button, not a link — so `/services` had **no direct keyboard/click destination** on desktop. **This directly violated the frozen rule** "Desktop Services must be a real reachable link… do not trap `/services` behind a dropdown-only interaction."
- **Header surface (before):** `sticky top-0 z-50 bg-background/80 backdrop-blur-md … transition-all duration-300` — **violated** "MUST be non-sticky" and "no decorative blur washes."
- **Primary CTA (before):** "Schedule Free Strategy Call" → `/schedule-call` was the only, and therefore primary, header CTA. **Violated** "Primary header CTA goes to /contact. Booking remains secondary."
- **Mobile nav (before):** toggled with local state; no `aria-controls`; Escape did not close it; no focus return to the trigger on close.
- **Footer:** `components/Footer.tsx` is likewise a re-export shim over `components/layout/Footer.tsx`. Dark surface already correctly re-pointed to Resolve tokens by Phase A (`bg-ms-dark` → `--resolve-ink` via the token map). Social-icon links were bare 20×20px glyphs with no padding — under the 40px practical target floor.
- **Container:** `components/layout/Container.tsx` — `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`. Simple, reliable, already used sitewide (Phase A's 160-check sweep found 0 new horizontal-overflow regressions from it). Left unchanged — widening it to `min(1400px,100%)` would ripple across every route's composition, which is out of Phase B scope.
- **Section:** `components/layout/Section.tsx` — `py-16` with `id`/`className` passthrough. No decorative identity baked in. Left unchanged.
- **Button primitive:** `components/ui/button.tsx`. The `default` variant carried `shadow-sm hover:shadow-md` — **violated** "no shadows as primary visual language" on what is the header/footer primary CTA treatment.
- **Duplicate/orphan chrome:** none found beyond the intentional shim files (`components/Header.tsx`, `components/Footer.tsx`, `components/Container.tsx`, `components/Section.tsx` all re-export their `layout/` counterparts — confirmed by reading each).
- **Routes consuming shared chrome:** every route via `app/layout.tsx`, which renders `<Header />` and `<Footer />` once, outside `{children}`. No route bypasses this.

## 3. Exact files changed

| File | Action | Purpose |
|---|---|---|
| `components/layout/Header.tsx` | Modified | Non-sticky; Services as a direct link with a supplementary disclosure; primary CTA → `/contact`, booking demoted to secondary; removed blur/sticky; added `aria-controls`, Escape-to-close, focus-return, outside-click dismiss for both disclosures |
| `components/layout/Footer.tsx` | Modified (Session 24 + 24B) | Session 24: social icon links padded to 40×40px targets with visible focus rings. Session 24B: swapped the CTA-strip button hierarchy so `/contact` (Contact Us) is the filled primary action and `/schedule-call` (Schedule Free Strategy Call) is the outline secondary action — no structural or copy change beyond that swap |
| `components/ui/button.tsx` | Modified | Removed `shadow-sm hover:shadow-md` from the `default` variant |

**Not touched:** `components/layout/Container.tsx`, `components/layout/Section.tsx`, all route files, all copy, all forms, analytics, robots, sitemap, both prototypes, all governance files, `README.md`.

`next-env.d.ts` picked up the same one-line build-churn diff Phase A documented (`next build` rewriting its own import path) and was restored with `git restore` before staging, exactly as Phase A did.

## 4. Header

- **Sticky before:** yes (`sticky top-0 z-50`). **Sticky after:** no (`position: relative`, MEASURED after a 800px scroll — header top offset moves with the page).
- **Services direct link:** yes — `<Link href="/services">Services</Link>` is now a standalone element; a separate disclosure `<button aria-expanded aria-controls="services-menu">` sits beside it and supplements rather than replaces the link, per the frozen rule.
- **Primary CTA:** "Contact Us" → `/contact`. Secondary: "Book a call" → `/schedule-call`, styled as a text link.
- **Desktop behaviour:** Services disclosure opens on click, closes on Escape (focus returns to its trigger) and on outside click; not a hover flyout, so no dead-zone or accidental dismissal on the way to a submenu item.
- **Resolve translation:** flat `bg-background` with a single hairline `border-b`; no gradient, no shadow, no blur, no ambient/looping motion. The only transitions are the chevron rotation and colour/background transitions on hover and focus.

## 5. Mobile Navigation

- **Trigger:** `<button aria-controls="mobile-menu" aria-expanded aria-label>`, `h-10 w-10` (40×40px practical target).
- **Targets:** trigger 40×40px; menu links `px-3 py-2.5` (comfortably over 40px including line height and padding).
- **aria:** `aria-expanded` toggles correctly (MEASURED via DOM); `aria-controls="mobile-menu"` matches the panel's `id`.
- **Escape:** closes the menu and **returns focus to the trigger** — MEASURED: `document.activeElement === trigger` after dispatching `Escape`.
- **Focus:** the panel unmounts entirely when closed (conditional render), so there is nothing to trap or leak focus into.
- **Hidden focusables:** MEASURED — `document.getElementById('mobile-menu')` is `null` while closed. **0 hidden focusables.**
- **Services:** reachable both as a direct link and via its expanded sub-list inside the mobile panel.
- **Contact CTA:** present as a full-width primary button inside the mobile panel; booking is a secondary text link beneath it.
- **Result:** PASS.

## 6. Footer

- **Structure:** unchanged — CTA strip, four-column link grid, legal/social row.
- **Contrast:** unchanged from Phase A's measured state (footer heading/CTA 18.58:1, link 5.97:1, primary CTA label 5.97:1 — all already corrected by Phase A's dark-surface token re-point; re-verified present in the rendered page this session).
- **CTA hierarchy — CORRECTED IN SESSION 24B:** the Session 24 pass left "Schedule Free Strategy Call" (`/schedule-call`) as the filled, first-position button and "Contact Us" (`/contact`) as the outline, second-position button. Against the frozen programme architecture — enquiry/contact is the primary commercial action, booking is secondary — this was **Classification B: BOOKING IS PRIMARY**, a conflict. Session 24B swapped the two: **Contact Us is now the filled primary action in first position; Schedule Free Strategy Call is the outline secondary action in second position.** No copy was rewritten beyond this swap (button labels, hrefs, and variants only); the heading and supporting paragraph above the buttons were left untouched.
- **Responsive:** social row now uses `h-10 w-10` targets; grid unchanged.
- **Overflow:** none introduced (icon links keep the same visual glyph size, just larger interactive hit areas).
- **Result:** PASS.

## 7. Layout Primitives

- **Container:** unchanged. Already provides consistent gutters, a controlled max-width and no accidental overflow (confirmed by this session's 0-overflow check on `/`).
- **Section:** unchanged. Predictable vertical rhythm, no baked-in visual identity.
- **Breakpoint handling:** unchanged — the existing Tailwind responsive utilities across chrome components were not touched beyond the header rewrite.
- **Result:** boring, reliable infrastructure preserved as instructed; no parallel design-system tree created.

## 8. Buttons / Links

- **Primary (`default` variant):** `bg-accent text-accent-foreground` — shadow removed. Tangerine fill, ink text (via the existing `--accent-foreground` token mapping from Phase A), clear focus ring, no glow.
- **Secondary/outline:** unchanged — bordered, transparent fill.
- **Text links:** unchanged.
- **Scope of migration:** the shared `button.tsx` primitive only; no site-wide call-site migration was performed.

## 9. Session 24 preliminary validation (superseded by §10)

Verified in a real browser (Chrome DevTools Protocol) against a production build (`npm run start`),
before the footer defect was found:

| Check | Result |
|---|---|
| Header `position` after scroll | `relative` (non-sticky) — MEASURED |
| Header `box-shadow` | `none` — MEASURED |
| Header `backdrop-filter` | `none` — MEASURED |
| Homepage horizontal overflow at desktop width | none — MEASURED |
| Services desktop disclosure opens/shows all 5 services | OBSERVED (screenshot) |
| Mobile (375×812) header renders without overflow | OBSERVED (screenshot) |
| Mobile menu opens, lists Services + sub-items + nav + Contact Us + Book a call | MEASURED (12 links) |
| Escape closes mobile menu and returns focus to trigger | MEASURED |
| No hidden focusables while both disclosures closed | MEASURED (0) |
| `/services`, `/contact`, `/pricing` all render the shared header with a Services link, a Contact CTA, and no sticky class | MEASURED (fetched + parsed) |

This was the state at commit time and is explicitly **incomplete against the required 8-width ×
9-route matrix** — §10 supersedes it with that matrix, run after the footer correction.

## 10. Session 24B — full representative-route × required-width validation

**A build/serve defect was found and fixed before this matrix could run.** The `npm run start`
process from the Session 24 pass was still bound to port 3000 when the footer fix was rebuilt; the
`pkill -f "next start"` used to stop it did not match the actual process name (`node server.cjs`),
so the old process kept serving a stale `.next` build and its own ISR revalidation was overwriting
the fresh build's output on disk. Diagnosed via direct inspection of the served HTML (`fetch('/',
{cache:'no-store'})`) and of `.next/server/app/index.html` timestamps; fixed by `lsof -ti :3000 |
xargs kill -9`, a clean `rm -rf .next && npm run build`, and a fresh `npm run start`. Re-verified:
the footer's filled CTA on `/` now serves `/contact` / "Contact Us". All matrix results below were
captured against this corrected, freshly built server.

**Routes swept (9):** `/`, `/services`, `/seo`, `/google-ads`, `/pricing`, `/about`, `/contact`,
`/blog`, `/work`. **Rendered in a real browser** (not HTTP fetch) via navigate + in-page
`getComputedStyle`/`getBoundingClientRect` checks at every width below.

| Viewport | Routes rendered | Header failures | Footer failures | Overflow regressions | Accessibility failures | Result |
|---:|---:|---:|---:|---:|---:|---|
| 360 | 9/9 | 0 | 0 | 0 (2 pre-existing route-content findings, see below) | 0 | PASS |
| 390 | 9/9 | 0 | 0 | 0 | 0 | PASS |
| 430 | 9/9 | 0 | 0 | 0 | 0 | PASS |
| 760 | 9/9 | 0 | 0 | 0 | 0 | PASS |
| 761 | 9/9 | 0 | 0 | 0 | 0 | PASS |
| 860 | 9/9 | 0 | 0 | 0 | 0 | PASS |
| 1080 | 9/9 | 0 | 0 | 0 (2 pre-existing route-content findings, see below) | 0 | PASS |
| 1425 | 9/9 | 0 | 0 | 0 | 0 | PASS |

At every route/width combination: header present, `position` never `sticky`/`fixed`, `box-shadow:
none`, `backdrop-filter: none`, a direct `/services` link present in the header, exactly one
`/contact` CTA in the header, footer present with 4 social links each measured at 40×40px, footer
filled CTA href `/contact` with text "Contact Us" (MEASURED at every route/width after the 24B
fix), `#main` present exactly once, skip link present.

**360 and 1080 overflow findings, investigated and classified — none in shared chrome:**

| Route | Width | Finding | Offending element | In header/footer? | Classification |
|---|---:|---|---|---|---|
| `/` | 360 | 2px `scrollWidth` overflow | `.absolute.bottom-0.left-0.w-96.h-96.bg-accent/5.blur-3xl` decorative hero blob | No | PRE-EXISTING — OUT OF PHASE B SCOPE |
| `/pricing` | 360 | 20px `scrollWidth` overflow | `<table class="w-full text-sm">` pricing comparison table | No | PRE-EXISTING — OUT OF PHASE B SCOPE |
| `/blog` | 1080 | 10px `scrollWidth` overflow | traced to `.skip-link` (`left:-9999px`) contributing to document `scrollWidth` on this route only; no descendant element's right edge exceeds the viewport | No | PRE-EXISTING — CONSISTENT WITH PHASE A'S RECORDED `/blog` 1080 FINDING (31px→8px improved) |
| `/pricing` | 1080 | 37px `scrollWidth` overflow | no single offending element found by bounding-rect scan (consistent with an internally-scrolling table region); confirmed absent from header/footer | No | PRE-EXISTING — CONSISTENT WITH PHASE A'S RECORDED `/pricing` 1080 FINDING (70px→34px improved) |

None of these four findings involve `components/layout/Header.tsx`, `components/layout/Footer.tsx`,
`Container.tsx`, or `Section.tsx`. All four are route-body content pre-dating both Phase A and Phase
B. Per §7 of the governing instructions ("do not fix unrelated route defects"), none was touched.

## 11. 1081 boundary spot-check

Routes: `/`, `/services`. **Header mode:** desktop nav visible (`display` ≠ `none`), mobile trigger
hidden (`display: none`) — MEASURED on both routes at 1081px. **Layout:** no horizontal overflow on
either route. **Result:** PASS — the WIDE transition itself renders correctly.

**Finding, recorded rather than fixed:** the header's desktop/mobile switch is implemented with
Tailwind's default `lg:` breakpoint (1024px) — `lg:hidden` on the trigger, `hidden lg:flex` on the
desktop nav — not the frozen programme's own 1080/1081 WIDE boundary. MEASURED directly: at 761px
(the start of MEDIUM) the header is still in mobile-trigger mode; the switch to desktop mode happens
at 1024px, inside the MEDIUM band. This class was not introduced or altered by either Phase A or
Phase B — it predates both — and mobile mode was verified fully functional and accessible across
the entire 761–1080 range it now spans (see §10). Classified **PRE-EXISTING — UNCHANGED**, not a
Phase B regression, and out of Phase B's shared-chrome-only scope to realign; flagged for a future
phase if the programme wants the header's internal breakpoint to match the site-wide width classes
exactly.

## 12. Mobile navigation — width-by-width

Verified via real DOM interaction (button click, `Escape` keydown dispatch) at each width, on `/`:

| Width | Trigger size | aria-expanded toggles | Escape closes | Focus returns to trigger | Hidden focusables while closed | Services reachable | Contact reachable |
|---:|---|---|---|---|---|---|---|
| 360 | 40×40 | yes | yes | yes | 0 | yes | yes |
| 390 | 40×40 | yes | yes | yes | 0 | yes | yes |
| 430 | 40×40 | yes | yes | yes | 0 | yes | yes |
| 760 | 40×40 | yes | yes | yes | 0 | yes | yes |
| 761 | 40×40 | yes | yes | yes | 0 | yes | yes |

At 860/1080/1081/1425 the header is in desktop mode (trigger hidden — see §11), so the mobile-menu
interaction does not apply at those widths; desktop Services-disclosure and `/contact` reachability
were separately confirmed clean at those widths in §10. **Result: PASS** across the full range the
trigger is actually active in.

## 13. Button primitive regression check

Spot-checked on `/`, `/contact`, `/pricing` at 390, 860, and 1425 (9 combinations). At every
combination: every `default`-variant button (`data-slot="button"` with `bg-accent`, not
`bg-transparent`) measured `box-shadow: none`, with a visibly solid, non-transparent fill colour
(`rgb(168, 52, 0)` on light ground / `rgb(255, 91, 4)` inside the dark footer surface, both matching
Phase A's documented accent-ramp re-pointing). Button counts per route were stable across widths (10
on `/`, 7 on `/contact`, 7 on `/pricing`). **No visibility or hierarchy regression found. Result:
PASS.**

## 14. Builds (re-run after the Session 24B footer correction)

| | Standard | cPanel |
|---|---|---|
| Command | `npm run build` | `npm run build:cpanel` |
| Result | **PASS** (exit 0) | **PASS** (exit 0) |
| Route rows | 24 | 24 |
| Static pages | 23/23 | 23/23 |
| Warnings | pre-existing lockfile warning only (same as Phase A) | pre-existing lockfile warning only |

Memory ceiling for the cPanel build was not raised (`NODE_OPTIONS=--max-old-space-size=512` unchanged
in `package.json`).

## 15. Regression classification summary

| Finding | Classification | Action |
|---|---|---|
| Header sticky, blurred, dropdown-only Services, schedule-call-only CTA, button shadow | PRE-EXISTING — FIXED (Session 24) | Fixed |
| Footer booking-primary / contact-secondary CTA hierarchy | PRE-EXISTING — FIXED (Session 24B) | Fixed |
| Footer social icon targets under 40px | PRE-EXISTING — FIXED (Session 24) | Fixed |
| `/` 2px overflow (hero decorative blob) at 360 | PRE-EXISTING — OUT OF PHASE B SCOPE | Not fixed |
| `/pricing` 20px overflow (comparison table) at 360, 37px at 1080 | PRE-EXISTING — OUT OF PHASE B SCOPE, consistent with Phase A's recorded finding | Not fixed |
| `/blog` 10px overflow at 1080 | PRE-EXISTING — OUT OF PHASE B SCOPE, consistent with Phase A's recorded finding | Not fixed |
| Header desktop/mobile switch at 1024px rather than the 1080/1081 WIDE boundary | PRE-EXISTING — UNCHANGED | Not fixed, recorded for a future phase |

## 16. Intentionally deferred — not fixed, not hidden

1. **`components/forms/CalendlyEmbed.tsx:37`** still hard-codes `#C41E3A`, off-palette for THE RESOLVE — flagged by Phase A, still a component change rather than a chrome change, still out of Phase B scope.
2. **Nine call sites hard-coding `text-white` beside `bg-accent`** on route pages — Phase A's dark-surface CSS override already corrects the rendered contrast; rewriting the call sites themselves is composition work, not chrome, and was not done.
3. **`/ai-seo` route does not exist** — a Gate 9 copy/route gap, unrelated to chrome.
4. Screen-reader, real-device, cross-browser, print, 200%-resize and user testing — never performed by this programme; not attempted here.
5. Container's measure was not widened toward the plan's `min(1400px, 100%)` target — doing so touches every route's composition and was judged out of the Phase B shared-chrome boundary.
6. The header's `lg:` (1024px) desktop/mobile breakpoint does not match the frozen 1080/1081 WIDE boundary — pre-existing, recorded in §11, not realigned in Phase B.
7. Pre-existing horizontal overflow in route body content on `/`, `/pricing`, and `/blog` at various widths (§10) — unrelated to shared chrome, not fixed.

## 17. Rollback boundary

Phase B is one amended commit containing four production files (`Header.tsx`, `Footer.tsx`,
`button.tsx`, plus this documentation file) covering both the Session 24 implementation and the
Session 24B footer-hierarchy correction and validation completion.

- **Full rollback:** `git revert <commit>` restores the sticky/blurred header, the dropdown-only Services trigger, the schedule-call-only header CTA, the booking-primary footer CTA, the un-padded footer social icons, and the button shadow.
- No data migration, no schema change, no route change, no content change.

## 18. Confirmation

- No homepage chapter or motion implementation.
- No route copy changes beyond the authorised footer CTA hierarchy swap (labels/hrefs/variants only).
- No forms, analytics, robots, or sitemap changes.
- No prototype or governance changes.
- `README.md` untouched and unstaged.
- One amended commit only, not pushed.
