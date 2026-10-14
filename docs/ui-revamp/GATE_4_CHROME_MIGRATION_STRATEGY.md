# MappedSkills UI Revamp — Gate 4: Global Chrome Migration Strategy (4D)

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Status** | **PLANNING ONLY.** `ChromeSwitch` was **not** modified or removed in this phase |
| **Scope** | Header, primary navigation, Services disclosure, mobile menu, footer, and the `ChromeSwitch` seam that selects them |
| **Open items touched** | `LIVE-1` (stays OPEN; §6), E14 (+bytes on legacy routes), Gate 3 X3 (opsz prefetch on legacy routes), Gate 0 R2 (header overflow at 1024), Gate 3 E4 (forced-colours chevron border) |

---

## 1. What `ChromeSwitch` is (VERIFIED, `components/direction-c/ChromeSwitch.tsx`, 28 lines)

```tsx
'use client';
export function ChromeSwitch({ legacy, next }) {
  const pathname = usePathname();
  return <>{pathname && DIRECTION_C_ROUTES.has(pathname) ? next : legacy}</>;
}
```

- **Why it was introduced.** Gate 2 had to prove Direction C's chrome on three routes **without changing any other route's
  chrome** (Implementation Plan Gate 2; global chrome is Gate 4D). The header and footer are rendered once, by the root
  layout, so the choice had to be made per pathname. A route group was rejected because moving `app/page.tsx` breaks
  `scripts/verify-server-files.cjs`, which the deploy path depends on (`GATE_2_IMPLEMENTATION.md` §3.1). Its own comment
  says: *"a two-line seam that Gate 4D deletes."*
- **How it decides.** `usePathname()` runs during server rendering, so the right chrome is in the first HTML response; there
  is no client swap and no flash (verified by `gate-3/evidence/chrome-nav.cjs`: correct chrome at every client navigation
  and back/forward step, one header, 0 console errors).
- **Matching.** Exact string match against `DIRECTION_C_ROUTES = new Set(['/', '/services', '/seo'])` in
  `components/direction-c/nav.ts:86`.

### 1.1 Dependents (VERIFIED by search of `app/`, `components/`, `lib/`, `scripts/`)

| Dependent | How |
|---|---|
| `app/layout.tsx:164, :168` | Two instances: `legacy={<Header />} next={<SiteHeader />}` and `legacy={<Footer />} next={<SiteFooter />}` |
| `components/direction-c/nav.ts:86` | `DIRECTION_C_ROUTES` (used only by `ChromeSwitch`) |
| **Routes depending on it** | **All 28 templates.** Three receive `next`; 25 receive `legacy` (every other `page.tsx`, every `[slug]` page, and `not-found`) |
| Tests | `gate-3/evidence/chrome-nav.cjs` (reusable), `gate-2/validation/unrelated-routes.cjs` (asserts legacy chrome is pixel-identical on 21 routes) |

`SERVICE_ROUTES` (same file) is **not** part of the seam: `SiteHeader` uses it to mark the Services control as current. It stays.

### 1.2 How the two chromes coexist

| Aspect | Legacy (`components/layout/Header.tsx`, `Footer.tsx`) | Direction C (`SiteHeader`, `SiteFooter`) |
|---|---|---|
| Position | **`sticky top-0 z-50`** (the `1557f74` regression, `DEC-030`) | `position: relative`, normal flow (`DEC-018` §4.5) |
| Desktop nav from | 1024 (`lg`). Overflows 1024–~1080 (Gate 0 R2) | 1200. Compact header (Contact Us + Menu) below |
| Services | link + chevron with **`role="menu"`** without arrow keys (Gate 0 §14) | link + "Services submenu" disclosure; `inert` when closed |
| Mobile menu | inside the sticky header → **LIVE-1** | in flow; CTAs first; bar CTAs withdrawn while open (ruling 4); "Company" label (ruling 6) |
| Service labels | "Social Media Ads", "Conversion Optimization", "Lead Generation" + legacy descriptions | Approved names (`DEC-036`, D4): "Paid social", "Conversion optimisation", "Lead generation", …; names only (Gate 2 E3) |
| Destinations | — | **Identical set** (Gate 2 §3.4, VERIFIED) |
| Footer | dark strip, four columns, three social icons + a second `mailto` icon | ink footer; social profiles as text links; duplicate `mailto` icon dropped (D10, approved) |
| Consent control | `ConsentPreferencesLink` | Same component |
| CSS | Tailwind utilities | `app/direction-c.css` (already global) |
| Bytes on a legacy route | — | +0.8 KB gz HTML: **both** chrome trees are serialised into the RSC payload, because `ChromeSwitch` is a client component receiving both as props (Gate 2 §7, E14) |

**Key fact for the risk analysis:** the Direction C chrome **already renders under the full global legacy stylesheet** on the
three approved routes (`globals.css` is global). Its isolation (`dc-` prefixes, unlayered rules, `:where()` resets, `.dc` on
`<header>` and `<footer>`) is therefore proven against the same CSS it will meet on every other route. What is **not** yet
proven is its **adjacency** to legacy bodies (§3).

---

## 2. Strategies evaluated

### S1 — Atomic replacement

Delete `ChromeSwitch`, render `SiteHeader`/`SiteFooter` directly in `app/layout.tsx`, and delete the legacy `Header`/`Footer`
in the same change.

| For | Against |
|---|---|
| Simplest end state; removes E14 and X3 at once | No kill switch: rollback means reverting the deletion too |
| One nav vocabulary on every route immediately | Deletion and behaviour change in one commit; harder to review |
| `LIVE-1` condition gone from every route on the branch | 25 templates change chrome at once; the review set is large |

### S2 — Incremental per route

Keep `ChromeSwitch`; add each route to `DIRECTION_C_ROUTES` in the same batch that migrates its body. Delete the seam at
the end.

| For | Against |
|---|---|
| Chrome and body always match on every route | **Two navigation vocabularies live for the whole of Gate 4.** On the branch, a visitor moving `/seo` → `/google-ads` sees the Services labels change. This contradicts the owner's D4 direction (one name per destination) for months of branch life |
| Smallest per-batch diff | Each body batch also carries a chrome change, so a body regression and a chrome regression land together |
| — | The legacy sticky header, its `role="menu"` and its 1024 overflow persist on the branch until the last batch, and keep being re-tested |
| — | E14 and X3 persist throughout |

### S3 — Atomic flip, deferred deletion (**recommended**)

1. **B1 (one batch, chrome only):** make Direction C chrome global **through** `ChromeSwitch`, by inverting its rule:
   Direction C everywhere, with an **empty** legacy deny-list kept as a kill switch. No page body changes.
2. Through Gate 4, the deny-list remains available: if a route's legacy body proves incompatible with the new chrome, that
   one route can be put back on the legacy chrome in a one-line change while it is fixed.
3. **B11 (cleanup):** once every body is migrated and the deny-list has stayed empty since B1, delete `ChromeSwitch`, the
   legacy `Header`/`Footer`, `DIRECTION_C_ROUTES` and the root re-export shims, after an import-graph check.

| For | Against |
|---|---|
| One navigation vocabulary site-wide from B1 (D4) | For the duration of Gate 4, legacy bodies sit under Direction C chrome on the branch (a visible seam on 25 routes). Nothing ships until Gate 9, so no visitor sees it |
| Chrome change isolated from every body change: B1 is reviewable as "chrome only" | The kill switch keeps ~28 lines and +0.8 KB gz per route until B11 |
| Rollback without reverting a deletion: one line, or one commit | — |
| Retires `LIVE-1`'s **condition** on the branch, Gate 0 R2 and the `role="menu"` issue on every route at once | — |
| Every later body batch is built and judged against the **final** chrome | — |

**Incremental or atomic?** The recommendation is **atomic in behaviour, incremental in deletion.** Behaviour flips once
(B1), because a mixed navigation vocabulary is the larger product risk. Code is deleted last (B11), because a retained
fallback is the cheaper rollback.

---

## 3. What could break when the chrome becomes global, and how B1 checks it

| # | Risk | Where | Check in B1 | Label |
|---|---|---|---|---|
| CH1 | **In-page anchor offsets.** Legacy bodies use `scroll-mt-28` (112px) for a 65px sticky header. With a non-sticky header the offset is no longer needed, but it is harmless: targets land 112px lower than the top | `/blog/[slug]` headings, `/research/[slug]` headings, legal `#id` contents, `ContactForm` error-summary links | Click every in-page anchor on those routes at 390 and 1440; assert the target heading is fully visible | VERIFIED source; behaviour to verify |
| CH2 | **`StickySidebarCTA` (`sticky top-8`)** used to stick below a sticky header | `/blog/[slug]` sidebar | Its own comment says the CTA "renders on zero routes today". Verify its render conditions; without a sticky header, `top-8` stays valid | WORKING HYPOTHESIS |
| CH3 | **Consent banner** (fixed bottom, `z-[150]`) over the in-flow mobile menu | all routes, first visit | Open the menu with the banner showing at 320×568 and 390×700: menu CTAs reachable; banner dismissible; focus order skip link → banner → header | Already in the Gate 2 suite for 3 routes; extend to all |
| CH4 | **Skip link** targets `#main` | all | Unchanged in `layout.tsx`; assert on every route | — |
| CH5 | **Header height change** shifts every legacy page's content | all legacy routes | Expected and intended. The `unrelated-routes.cjs` pixel-identity check **will fail by design** in B1; replace it with a "body unchanged below the header" check (crop or DOM-level) | Harness change in B0 |
| CH6 | **Active-state logic** (`aria-current`) for routes not in `nav.ts`: `/problems/…`, `/research/*`, `/press/*`, `/portfolio/*`, `/blog/[slug]`, legal, 404 | all non-nav routes | No item should be marked current; Services marked only for `SERVICE_ROUTES` | — |
| CH7 | **Legacy labels disappear** from 25 templates ("Social Media Ads" → "Paid social", etc.) | chrome only | Already approved for the chrome (`DEC-036`, D4; Gate 2 E1). Record it in the B1 report as an expected change, not a new decision | APPROVED DECISION |
| CH8 | **GTM triggers keyed on legacy header/footer DOM** (classes, IDs, element positions) | site-wide | Cannot be checked without the container. **E6** | RESEARCH REQUIRED |
| CH9 | **Font prefetch** (X3): with global chrome, legacy pages still do not load the opsz face themselves; prefetch behaviour unchanged | legacy routes | Throttled CLS on a sample legacy route at 7 widths | — |
| CH10 | **Body/chrome visual seam**: Resolve and legacy bodies under Direction C chrome | 25 templates | Accepted for the branch's Gate 4 life. Owner review of a 6-route sample in B1 | Owner acknowledgement (§7) |
| CH11 | **`/launch-checklist`** has an internal "Header QA" section that refers to the legacy header | internal route | Content only; not public. Flag for owner | — |
| CH12 | **Trailing-slash or query paths** | all | `usePathname()` excludes the query; the matcher is no longer per-route after the flip, so this risk disappears | — |

---

## 4. Proposed B1 change set (for approval; not implemented)

| File | Change |
|---|---|
| `components/direction-c/nav.ts` | Replace `DIRECTION_C_ROUTES` (allow-list) with `LEGACY_CHROME_ROUTES = new Set<string>()` (deny-list, empty), commented as the B1 kill switch to be removed in B11 |
| `components/direction-c/ChromeSwitch.tsx` | Invert: `legacy` only when the pathname is in `LEGACY_CHROME_ROUTES`; otherwise `next`. Comment updated |
| `app/layout.tsx` | Comment updated only. The two `ChromeSwitch` lines are unchanged |
| Legacy `Header.tsx` / `Footer.tsx` | **Unchanged and retained.** No LIVE-1 edit (§6) |

Expected diff: about 10 lines of code across two files, plus comments.

**Optional in B1, only with owner approval:** add a forced-colours border to the "Services submenu" chevron button
(Gate 3 E4, a NOTE). It is chrome, it is small, and it would otherwise be carried to B11.

---

## 5. B1 acceptance (summary; full matrix in `GATE_4_QA_ACCEPTANCE_MATRIX.md` §4)

- Every one of the 28 templates (CMS templates with at least one entry, or a fixture) renders **one** Direction C header and
  **one** Direction C footer, in the first HTML response, at 320–1440.
- The **body** of each of the 25 non-Direction C templates is unchanged: content inventory identical (title, description, canonical, robots,
  OG, JSON-LD, headings, `<main>` link multiset, visible text), and a pixel comparison of `<main>` is identical.
- Header and footer link multisets are identical on every route to the approved Direction C chrome on `/`.
- Menu suite (Gate 2 §2–§5 checks) passes on every route at 320/360/390/430/768/1024, including a short viewport (390×600):
  menu CTAs reachable, Escape closes and returns focus, closed panel `inert`.
- `chrome-nav.cjs` extended to a route walk across all categories: correct chrome at every step and back/forward; 0 console errors.
- `page_view` sequence identical to baseline across that walk.
- axe: 0 new violations on any route.
- Bytes: legacy-route HTML and CSS reported before/after.

---

## 6. LIVE-1 — options (owner decision; **not resolved by this plan**)

**Facts.** `LIVE-1` is a production defect in the legacy `Header.tsx` (`sticky top-0`; menu CTAs unreachable below the fold
on phones). It is OPEN (`DEC-033`). The approved Direction C header cannot exhibit it. B1 would stop the legacy header from
rendering on the `ui-revamp` branch, but **production would keep the defect until the branch is released (Gate 9)**, which is
after Gate 4, Gates 5–7, E1, E6 and staging. `PROC-1` means any commit pushed to `main` currently **deploys to production
directly**.

| Option | What happens | Production exposure | Interactions |
|---|---|---|---|
| **L1 — Separate minimal hotfix on production** | A separately authorised, minimal fix to legacy `Header.tsx`, e.g. restoring the pre-`1557f74` `relative z-40` (which `DEC-030` already records as the approved state), or making the open menu scrollable within the viewport. No redesign; CTA destinations and primacy unchanged | Shortest | **Collides with `PROC-1`:** a push to `main` deploys without staging. The owner must either resolve PROC-1 first or explicitly accept a direct deploy for this hotfix. The `ui-revamp` branch later merges `main`; the conflict is trivial because B1 stops rendering that file |
| **L2 — Absorb into Gate 4D** | B1 retires the legacy header on the branch. LIVE-1 closes on production only at release | Longest (until Gate 9) | No PROC-1 interaction now. The B1 report must **not** call LIVE-1 fixed: it stays OPEN until production is fixed |
| **L3 — Both** | L1 now, then B1 supersedes the file on the branch | Shortest | Same PROC-1 caveat as L1 |
| L4 — Defer | No action | Unbounded | — |

**Recommendation: L3**, provided the owner first decides how a hotfix reaches production under `PROC-1`. The defect is
critical, on the primary conversion path, and the fix restores an already-approved state. If PROC-1 cannot be settled, **L2**
is the safe fallback, and B1 should then be prioritised. **Either way, closing LIVE-1 needs its own `DEC` and its own
evidence on production.** B1 does not close it.

---

## 7. Owner review required for the chrome migration

1. Approve strategy **S3** (atomic flip through `ChromeSwitch` in B1; deletion in B11).
2. Acknowledge that legacy bodies will sit under Direction C chrome **on the branch** between B1 and their own batch (CH10).
3. Choose a LIVE-1 option (§6). This does not block B1 starting, but the B1 report must state LIVE-1's status accurately.
4. Optional: authorise the E4 chevron border inside B1.

## 8. Rollback

- **During Gate 4:** add a route to `LEGACY_CHROME_ROUTES` (one line) to return it to legacy chrome; or revert the B1 commit
  (legacy chrome everywhere except the three approved routes, i.e. exactly the `23c937d` state).
- **After B11:** revert the B11 commit (restores the seam and the legacy files together).
