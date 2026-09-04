# Session 23 — Phase A — Resolve Foundation + Cache Correction

**Session:** 23 · **Date:** 2026-09-04 · **Branch:** `test_branch`
**Starting HEAD:** `91a82b7f0037c896a7501fccd357dd0c159c0968` (*"docs: close Gate 10 and validate
Resolve homepage"*)
**Type:** **FIRST PRODUCTION CODE CHANGE OF THE PROGRAMME.** Six production files. No page
composition, no copy, no route, no form, no analytics, no governance.

**Evidence labels are used strictly and are never collapsed:**
**CONFIGURED** = read from the repository · **MEASURED** = a number produced by running something
against a rendered page or a real HTTP response · **OBSERVED** = seen directly in output ·
**INFERRED** = a conclusion drawn from those, and labelled as such.

> **This session was interrupted mid-validation and recovered.** A separate observation-only
> recovery pass re-established state from Git and the filesystem before validation resumed. Every
> number in this document was **re-measured after that recovery**, against the final built tree.
> No figure is carried over from the interrupted session's narrative.

---

## 1. Starting point

| | |
|---|---|
| Branch | `test_branch` |
| HEAD before this session | `91a82b7f0037c896a7501fccd357dd0c159c0968` |
| `origin/test_branch` | `4780d4b37346dbb4e2ac332d8490191de3a85f9e` — local was already 10 ahead; **nothing was pushed** |
| Active visual direction | **THE RESOLVE** (`DEC-018`) |
| Authoritative creative reference | `docs/20-creative-convergence/prototype/convergence.html`, md5 `c6d29fd34cf7c5e481d8244773f7d357` — **re-verified unchanged at the end of this session** |
| Validated homepage | `docs/26-resolve-homepage/prototype/index.html` (Gate 10, `DEC-019`) — **unmodified** |
| Known non-blocking issue carried in | Session 22's live cache defect. Phase A was authorised to proceed with it |

## 2. Exact production files changed

| File | Action | Purpose |
|---|---|---|
| `app/globals.css` | Modified (+333 / −238 net across the file) | The single canonical Resolve token source; light-first; focus; skip link; dark-surface state |
| `app/layout.tsx` | Modified | Fonts swapped to Bricolage Grotesque + Manrope; `dark` class removed from `<html>`; skip link added; `<main id="main" tabIndex={-1}>` |
| `next.config.mjs` | Modified | Cache correction |
| `components/theme-provider.tsx` | **Deleted** | Orphan |
| `lib/design-system.ts` | **Deleted** | Orphan |
| `styles/globals.css` | **Deleted** | Orphan |

**`next-env.d.ts` was deliberately EXCLUDED.** `next build` rewrites its import from
`./.next/dev/types/routes.d.ts` to `./.next/types/routes.d.ts` whenever a production build follows a
dev run. **PROOF that this is build churn and not a Phase A change:** the same one-line diff appeared
in the **untouched baseline worktree** (checked out at `91a82b7`, no Phase A edits) purely from
running a build there. The file was restored to HEAD with `git restore next-env.d.ts` before staging.
The file itself says *"This file should not be edited."*

**Not touched, and verified so:** `public/robots.txt`, `app/robots.ts`, every route's copy, every
form, every analytics call, both prototypes, all governance files, and `README.md`.

## 3. Resolve token mapping

`app/globals.css` is now the **only** design-token source in the application. The Resolve primitives
are declared once, then the shadcn/ui semantic names are **re-pointed at them** rather than replaced,
so the palette changes without a page-by-page rewrite.

| Primitive | Value | Role |
|---|---|---|
| `--resolve-ground` | `#F7F3EC` | The body ground — light-first |
| `--resolve-paper` | `#FFFDF9` | Raised light surface |
| `--resolve-ink` | `#141219` | Type and structure |
| `--resolve-ink-deep` | `#0F0D14` | Substrate beneath a dark surface |
| `--resolve-line` | `#DED6C8` | Rules on light |
| `--resolve-rule` | `#2C2833` | Rules on dark |
| `--resolve-accent` | `#FF5B04` | Fills, marks, and text on a **dark** ground |
| `--resolve-accent-deep` | `#D94400` | Graphical objects + display text on light |
| `--resolve-accent-dark` | `#A83400` | Small text on light |
| `--resolve-dim` | `#5C5665` | Support neutral — the traffic register |
| `--resolve-gap` | `#8E8798` | Support neutral — not measured / unattributed |

**The accent ramp is contrast-driven, not decorative.** **MEASURED** (WCAG 2.x relative luminance,
computed with the same code path used for the rendered sweep, and cross-checked against browser
`getComputedStyle` values):

| Pair | Ratio | Verdict |
|---|---:|---|
| `#A83400` text on ground | **6.02:1** | passes small text |
| White on `#A83400` | **6.65:1** | passes small text |
| `#D94400` text on ground | **3.97:1** | large/graphical only — matches the prototype's own note |
| `#FF5B04` text on ground | **2.81:1** | **never** small text on light |
| `#FF5B04` text on ink | **5.97:1** | passes small text |
| `#A83400` text on ink | **2.79:1** | fails — this is why dark surfaces re-point |
| Ink on `#FF5B04` | **5.97:1** | passes |
| White on `#FF5B04` | **3.11:1** | **fails** — see §9 |
| Ink on ground | **16.80:1** | |
| White on ink | **18.58:1** | |

`--accent` is mapped to `#A83400`, because it is consumed as **text 329 times** and as a **fill 245
times** (`grep -rEo "text-accent([^-a-zA-Z]|$)"` / `"bg-accent([^-a-zA-Z]|$)"` over `app/` and
`components/`, excluding `-foreground`), and `#A83400` is the only ramp step legible in **both**
roles on the light ground.

Legacy `--ms-*` brand aliases are retained but re-pointed at Resolve values. **MEASURED: exactly one
call site still uses one** — `components/layout/Footer.tsx`'s `bg-ms-dark`.

## 4. Typography

`Montserrat` + `Inter` → **`Bricolage_Grotesque`** (display) + **`Manrope`** (body), both via
`next/font/google`, so they are self-hosted and preloaded at build time and **no runtime request is
made to Google Fonts**. Both are variable fonts; weight is set in CSS rather than by shipping extra
static cuts.

**OBSERVED on the rendered page:** `font-family` on `<body>` resolves to
`Manrope, "Manrope Fallback", ui-sans-serif, system-ui, …` and on `<h1>/<h2>` to
`"Bricolage Grotesque", "Bricolage Grotesque Fallback", …`, at every one of the 160 route × width
checks.

## 5. Light-first

- `dark` **removed** from the `<html>` class list.
- `color-scheme: light` declared explicitly on `html`.
- **OBSERVED:** `body` background is `rgb(247, 243, 236)` = `#F7F3EC` on **160/160** checks, and a
  `.dark` class is present on **0/160**.

**This is a genuine inversion, not a recolour.** The pre-change tree was rendering in **dark mode**:
its `body` colour **MEASURED** `rgb(245, 245, 245)` on `#0F0F0F`. Several of the pre-existing
contrast failures in §9 exist only because a light-theme value was landing on a dark-theme surface.

## 6. Dark-mode compatibility decision

`@custom-variant dark (&:is(.dark *));` is **retained deliberately**. It scopes every `dark:` utility
to a `.dark` ancestor. No such ancestor exists any more, so the **41 `dark:` classes across 19 files
in `components/ui/`** (MEASURED) compile and stay **inert**.

**Removing that line would be a regression, not a cleanup:** it would hand `dark:` back to Tailwind's
default `prefers-color-scheme` behaviour and let a visitor's OS dark mode re-activate the superseded
dark theme. This is also why `color-scheme: light` is declared — `07_VALIDATION_GATES.md` §4 requires
that forced dark **must not** invert the direction.

## 7. Orphan files removed, and the proof they were orphans

| File | Proof |
|---|---|
| `components/theme-provider.tsx` | `grep -rn "theme-provider" app components lib hooks scripts` → **0 matches** |
| `lib/design-system.ts` | `grep -rn "design-system" app components lib hooks scripts` → **0 matches** |
| `styles/globals.css` | `grep -rn "styles/globals" app components lib hooks scripts` → **0 matches**; `app/layout.tsx` imports `./globals.css` only |

All three were dead weight that could have become a second, competing token source. Both production
builds succeed with them gone, which is the second proof.

## 8. Skip link, main target, focus

- `<a href="#main" class="skip-link">Skip to main content</a>` is the **first element in `<body>`**.
- `<main id="main" tabIndex={-1}>` — one per document.
- `.skip-link` is positioned off-canvas until focused, then lands at 16px/16px with a
  `var(--resolve-target)` = 40px minimum height.
- Global `:focus-visible` — `3px solid var(--resolve-ink)`, `outline-offset: 3px`, never suppressed.
  On dark surfaces the outline colour flips to the ground so it cannot vanish.

**MEASURED across all 160 route × width checks:**

| Check | Result |
|---|---|
| Skip link present | **160/160** |
| Skip link is the first focusable element | **160/160** |
| Off-screen when blurred | **160/160** |
| On-screen when focused | **160/160** |
| Exactly one `<main id="main">` | **160/160** |
| Focus ring not suppressed on a real control | **160/160** |
| No global focus suppression anywhere in the stylesheets | **160/160** |
| Skip-link contrast when focused | **16.80:1** |

## 9. The `.bg-foreground` question, and the one real regression it uncovered

### 9.1 `.bg-foreground` — NO RENDERED DEFECT

The recovery pass reported that the authored dark-surface rule listed five selectors but the compiled
rule appeared to omit `.bg-foreground`.

**That was a measurement artefact of the recovery pass's own `grep`,** which anchored on
`.bg-ms-dark` and therefore truncated everything the minifier had sorted ahead of it. The compiled
and **served** CSS contains all five:

```
.bg-foreground,.bg-ms-dark,.bg-ms-navy,.bg-resolve-ink,.bg-resolve-ink-deep{--accent:var(--resolve-accent);…}
```

**Classification: A — NO RENDERED DEFECT. No change was required on this account.**

Worth recording: the translucent tints `.bg-foreground/5` and `.bg-foreground/10` are correctly **not**
re-pointed (**MEASURED: 0 matches**). A 10% ink tint on a light ground is still a light surface and
must keep the light token.

### 9.2 What the investigation did find — a real Phase A regression

Measuring the dark surfaces properly surfaced a genuine new failure, on **all 20 rendered routes**:

> **`#FFFFFF` on `#FF5B04` = 3.11:1 — FAIL.**

**Cause.** The dark-surface block re-points `--accent` to the bright mark `#FF5B04` (correct, and
required — `#A83400` on ink is only 2.79:1). But nine call sites hard-code `text-white` beside
`bg-accent`. On the pre-change tree that pairing was white on `#C41E3A` = **5.84:1 (PASS)**; brightening
the fill dropped it to **3.11:1 (FAIL)**. Attributable to Phase A, not pre-existing.

**The fix, taken from the approved prototype rather than invented.** `index.html` pairs a tangerine
fill with **ink** type every time it uses one — `background:var(--tang);color:#141219` at lines 97,
243, 516 and 562. Phase A now does the same, in the token foundation:

- `--accent-foreground: var(--resolve-ink)` inside the dark-surface block; and
- a rule re-pointing `.bg-accent` **inside a dark surface** to ink type, which is what actually
  overrides the hard-coded `text-white`.

The nine pages were **not** edited. On the light ground `text-white` on `bg-accent` is still correct
(white on `#A83400` = 6.65:1), so only the dark case is re-pointed. Rewriting those call sites is
Phase B composition work.

**One implementation note that cost a build cycle, recorded so it is not repeated:** the correcting
rule **must live in `@layer utilities`**. Cascade layers outrank specificity, so the same rule in
`@layer base` — even at specificity (0,2,0) against `.text-white`'s (0,1,0) — still loses, because
`utilities` is declared later. This was not theory: the base-layer version compiled correctly and the
rendered page **still MEASURED 3.11:1**. The comment in `globals.css` says so at the rule.

**MEASURED after the fix: 5.97:1 (PASS),** and 5.04:1 against the `/90` hover step.

## 10. Cache correction

### 10.1 What was wrong

**CONFIGURED before:** `Cache-Control: public, max-age=31536000, immutable` on `source: '/:path*'`,
with an intended exemption for `'/:path*.(html|xml)'`. App Router document routes carry no file
extension, so the exemption could never match. Session 22 **OBSERVED** the consequence live: every
HTML document was served `immutable`, so a redeploy would not reach returning visitors for up to a
year.

### 10.2 The principle applied

> **Stop overriding what Next.js already gets right.**

- **Documents** carry no application-level `Cache-Control`. Next.js sets the correct per-route policy
  itself — and that is also what preserves the `no-store` behaviour already **OBSERVED** on 404s.
- **`/_next/static/*` is deliberately NOT listed either.** Next.js already serves content-hashed
  assets as `public, max-age=31536000, immutable` in production and as `no-cache, must-revalidate`
  under `next dev`, and it applies neither if something else set the header first
  (`node_modules/next/dist/server/lib/router-server.js`, the
  `matchedOutput.type === 'nextStaticFolder'` branch — read directly, not assumed). An explicit rule
  is therefore redundant in production and **actively wrong in development**, where it would pin dev
  chunks as immutable. An interim version of this correction did include such a rule; `next build`
  emitted *"Custom Cache-Control headers detected for the following routes: /_next/static/:path*"*,
  and removing the rule cleared that warning while leaving production behaviour identical.
- **`.xml`** keeps its short revalidating policy, because Next.js does not set one for it.
- **Security headers** remain on `/:path*` and are unchanged.

### 10.3 LOCAL RUNTIME EVIDENCE

Two real Next.js production servers were run side by side and driven with `curl` — `:3222` from a
worktree checked out at `91a82b7` with no Phase A changes, `:3111` from the Phase A tree.

| Surface | Before (`:3222`) | After (`:3111`) |
|---|---|---|
| `GET /` | `public, max-age=31536000, immutable` | `s-maxage=60, stale-while-revalidate=31535940` |
| `GET /pricing`, `GET /about` | `public, max-age=31536000, immutable` | `s-maxage=31536000` (no `immutable`) |
| `GET /sitemap.xml` | — | `public, max-age=3600, must-revalidate` |
| `GET /robots.txt` | — | `public, max-age=0` |
| 404 | — | `private, no-cache, no-store, max-age=0, must-revalidate` |
| `/_next/static/chunks/*.js` | `public, max-age=31536000, immutable` | `public, max-age=31536000, immutable` |
| `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy` | present | **present, unchanged** |

**`immutable` now appears on fingerprinted static output only, and on nothing else.** 404 behaviour is
unchanged. Sitemap behaviour is unchanged.

> ### **THIS IS LOCAL RUNTIME EVIDENCE ONLY. NOTHING HAS BEEN DEPLOYED.**
> The live defect Session 22 observed at `https://mappedskills.com/` **is still live.** It is fixed in
> the repository, not in production. See §16.

## 11. Route inventory

**MEASURED** from `.next/app-path-routes-manifest.json`, not from a list written by hand. The build
reports **24 route rows** and prerenders **23 pages**.

**20 rendered routes were swept** — every user-facing page, plus the 404:

`/` · `/services` · `/seo` · `/google-ads` · `/social-media-ads` · `/lead-generation` ·
`/conversion-optimization` · `/how-it-works` · `/work` · `/blog` · `/pricing` · `/about` · `/contact` ·
`/schedule-call` · `/thank-you` · `/faq` · `/launch-checklist` · `/privacy-policy` · `/terms` ·
**404** (via an unrouted path)

**Excluded, with reason:** `/robots.txt` and `/sitemap.xml` (not visual — validated by header/content
checks instead); `/_global-error` (not reachable as a page); `/blog/[slug]` and `/portfolio/[slug]`
(dynamic, and Contentful credentials are absent in this environment — a pre-existing condition
recorded in `CURRENT_STATE.md`, not introduced here).

> **`/ai-seo` does not exist as a route.** Gate 9 approved copy for it, but no `page.tsx` was ever
> implemented. **Recorded as a finding, not fixed** — creating a route is Phase B/C scope.

## 12. Responsive regression sweep — 20 routes × 8 widths = 160 checks per tree

Driven through the Chrome DevTools Protocol against **both** running servers, so every row is a real
rendered measurement of the same page on the pre-change and post-change trees.

| Viewport | Routes | Rendered | New regressions | Pre-existing overflow | Contrast-fail samples |
|---:|---:|---:|---:|---:|---:|
| 360 | 20 | 20/20 | **0** | 0 | 1 (false positive, §13.3) |
| 390 | 20 | 20/20 | **0** | 0 | 1 |
| 430 | 20 | 20/20 | **0** | 0 | 1 |
| 760 | 20 | 20/20 | **0** | 0 | 1 |
| 761 | 20 | 20/20 | **0** | 0 | 1 |
| 860 | 20 | 20/20 | **0** | 0 | 1 |
| 1080 | 20 | 20/20 | **0** | 3 | 1 |
| 1425 | 20 | 20/20 | **0** | 0 | 1 |

**Every route rendered on both trees. 0 load failures, 0 probe failures.**

**Console / runtime errors: identical on both trees** — 176 resource-404s and 160 MIME warnings on
*each*, all from `/_vercel/insights/script.js`, which does not exist outside Vercel hosting.
**Pre-existing and environmental; nothing attributable to Phase A.**

## 13. A/B classification of every finding

### 13.1 Horizontal overflow

| Route | Width | Before | After | Classification |
|---|---:|---:|---:|---|
| `/google-ads` | 860 | 19px | **0px** | **PRE-EXISTING — FIXED** |
| `/blog` | 1080 | 31px | 8px | **PRE-EXISTING — IMPROVED** |
| `/how-it-works` | 1080 | 67px | 30px | **PRE-EXISTING — IMPROVED** |
| `/pricing` | 1080 | 70px | 34px | **PRE-EXISTING — IMPROVED** |

**NEW or WORSE overflow findings: 0.**

**The homepage has 0px horizontal overflow at all eight widths on BOTH trees.** The interrupted
session's narrative of *"homepage ~23px → ~17px"* and *"pricing ~43px → ~36px"* **could not be
reproduced** and is superseded by the table above. That narrative was never backed by a surviving
artefact; these numbers are.

### 13.2 Contrast failures ELIMINATED by Phase A

All **PRE-EXISTING**, all consequences of the pre-change dark theme, all now gone:

| Pair | Ratio | Routes affected |
|---|---:|---:|
| `#C41E3A` on `#2C2C2C` (footer links) | 2.39:1 | **19** |
| `#C41E3A` on `#1A1A1A` (12px) | 2.98:1 | **13** |
| `#C41E3A` on `#0F0F0F` (14px) | 3.28:1 | **11** |
| `#C41E3A` on `#1A1A1A` (24px display) | 2.98:1 | **9** |
| `#1A1A1A` on `#0F0F0F` — light-on-dark collision | **1.10:1** | **3** |

### 13.3 The one remaining flagged pair — FALSE POSITIVE

`#141219` on `#C41E3A` = 3.18:1 on `/schedule-call`, at all eight widths.

This is the **Calendly badge**, third-party DOM injected by
`https://assets.calendly.com/assets/external/widget.js`. It has no colour of its own in our CSS and
inherits `body`, which light-first flips from `#F5F5F5` to ink.

**Why it is a false positive, proven rather than asserted:** Calendly's own published stylesheet sets
`.calendly-badge-content{…color:#fff…font-size:14px…}`. In the harness that stylesheet **did not
load** — `document.styleSheets` contained only our two files, `getMatchedStyles` returned **0** rules
for the selector, and the measured `font-size` was 16px (inherited) instead of Calendly's 14px. With
the vendor CSS applied, the badge is white on `#C41E3A` = **5.84:1 (PASS)**. This is exactly the
"vendor-injected UI" exclusion in the sweep brief.

**Residual worth carrying forward (NOT a Phase A defect):** `components/forms/CalendlyEmbed.tsx:37`
hard-codes `color: '#C41E3A'`, which is now off-palette for THE RESOLVE. Deferred to Phase B — §15.

### 13.4 New regression found and fixed within Phase A

| Pair | Before | After Phase A (uncorrected) | After correction |
|---|---:|---:|---:|
| Accent-filled CTA label, all 20 routes | 5.84:1 | **3.11:1 (FAIL)** | **5.97:1 (PASS)** |

Detail in §9.2.

## 14. Footer and dark-surface contrast — before and after

Homepage footer @1425, **MEASURED** on the rendered page:

| Element | Before (`:3222`) | After (`:3111`) |
|---|---|---|
| Footer ground | `#2C2C2C` | `#141219` |
| Heading | `#FFFFFF` on `#2C2C2C` — 13.97:1 | `#FFFFFF` on `#141219` — **18.58:1** |
| Secondary CTA | `#FFFFFF` on `#2C2C2C` — 13.97:1 | `#FFFFFF` on `#141219` — **18.58:1** |
| Footer link | `#C41E3A` on `#2C2C2C` — **2.39:1 FAIL** | `#FF5B04` on `#141219` — **5.97:1 PASS** |
| Primary CTA label | `#FFFFFF` on `#C41E3A` — 5.84:1 | `#141219` on `#FF5B04` — **5.97:1 PASS** |

**Contrast failures in the homepage footer after Phase A: 0.**

The dark-surface token re-point **does** reach the rendered footer — that is what moved the footer
link from 2.39:1 to 5.97:1, and it is confirmed on the rendered page rather than inferred from source
tokens.

## 15. Builds

| | Standard | cPanel |
|---|---|---|
| Command | `npm run build` | `npm run build:cpanel` |
| Result | **PASS** (exit 0) | **PASS** (exit 0) |
| Constraints | none | `NODE_OPTIONS=--max-old-space-size=512`, `CPANEL_BUILD=1`, `cpus: 1`, `workerThreads: false`, `RAYON_NUM_THREADS=1`, `UV_THREADPOOL_SIZE=1` |
| Route rows | 24 | 24 |
| Static pages generated | 23/23 | 23/23, single worker, 422ms |
| Memory anomalies | none | **none — the 512 MB ceiling was not raised** |

**Warnings — one, on both, and PRE-EXISTING:**

> `⚠ Warning: Next.js inferred your workspace root … We detected multiple lockfiles`

Caused by a stray `package-lock.json` in the user's **home directory**, outside this repository,
alongside the repo's own `pnpm-lock.yaml`. **PROOF it is pre-existing:** the same warning appears in
the baseline server log captured from the untouched `91a82b7` worktree. Not introduced here, and not
fixable from inside the repository. `[contentful] Missing CONTENTFUL_SPACE_ID …` is likewise a
pre-existing environment condition already recorded in `CURRENT_STATE.md`.

The *"Custom Cache-Control headers detected"* warning that an interim version of this work introduced
was **eliminated** — see §10.2.

`07_VALIDATION_GATES.md` **P14** additionally requires the type checker to be green with
`ignoreBuildErrors` removed. **That was NOT attempted and is NOT claimed.** `ignoreBuildErrors: true`
is still set. P14 is therefore **partially** evidenced: both builds pass, the type-check clause does
not.

## 16. Intentionally deferred — not fixed, not hidden

1. **Pre-existing horizontal overflow at 1080px** on `/pricing` (34px), `/how-it-works` (30px) and
   `/blog` (8px). Improved by Phase A, not caused by it. Repairing legacy page composition is
   Phase B/C.
2. **`#C41E3A` hard-coded** in `components/forms/CalendlyEmbed.tsx:37` — off-palette; a component
   change, not a token change.
3. **Nine call sites hard-coding `text-white` beside `bg-accent`.** Correct on light, re-pointed on
   dark. Rewriting them is composition work.
4. **`/ai-seo` route does not exist** although Gate 9 approved its copy.
5. **`ignoreBuildErrors: true`** still set (P14).
6. **Contentful credentials absent**; `/blog/[slug]` and `/portfolio/[slug]` were not swept.
7. **Vercel Analytics 404s** locally — an artefact of not running on Vercel.
8. **Never performed by this programme and still not performed:** real-hardware performance and Core
   Web Vitals, screen-reader testing, real-device testing, cross-browser testing, print, 200% text
   resize, user testing. `07_VALIDATION_GATES.md` §5 lists these; **none may be reported as passed.**
9. **Modes not tested in this sweep:** reduced motion, no-JS, forced dark, print, 200% resize. The
   foundation contains the mechanisms (`prefers-reduced-motion` floor, `color-scheme: light`) but
   they were **not** exercised as rendered modes here.

## 17. Live deployment status

> ### **NOT VERIFIED. NOTHING HAS BEEN DEPLOYED.**

- No push. The commit exists on the local `test_branch` only.
- The **live** site still serves `immutable` on HTML — Session 22's finding stands until a deploy.
- www/apex behaviour: **unchanged and untested** — no redirect or host configuration was touched.
- `public/robots.txt` still shadows `app/robots.ts`, exactly as before. **Deliberately not changed.**
- Analytics baseline still does not exist.

`P15 (Deployment readiness)` is **not** claimed.

## 18. Rollback boundary

Phase A is **one commit** containing **six production files** and this documentation set.

- **Full rollback:** `git revert <commit>` — restores the previous palette, fonts, dark theme,
  the three deleted orphan files, and the previous cache configuration in one step.
- **No data migration, no schema change, no route change, no content change** — nothing outside the
  repository was mutated, so rollback is purely a code revert.
- **The cache correction is independently revertible** — it is confined to `next.config.mjs`'s
  `headers()`.
- **Restoring the dark theme would require more than a revert of `layout.tsx`:** the `dark` class,
  the `.dark` token block **and** the `@custom-variant` line work together. Revert the whole commit
  rather than part of it.
- The pre-change tree remains reproducible from `91a82b7`, which is what the `:3222` baseline server
  in this session was built from.

## 19. What a worker may claim from this document

**Claimed:** both builds pass · 0 new responsive regressions across 160 checks · 5 classes of
pre-existing contrast failure eliminated · the one new contrast regression found and fixed · cache
correction verified **against local HTTP responses** · foundation accessibility primitives present on
160/160 checks.

**Not claimed:** any gate is passed · anything about the live site · performance · Core Web Vitals ·
screen readers · real devices · cross-browser · print · 200% resize · reduced-motion and no-JS
rendered modes · visual parity with the Resolve prototype, which Phase A does not attempt.

**Gate P2/P3 are reported, not passed.** `07_VALIDATION_GATES.md` §1 reserves passing to the
orchestrator.
