# SESSION 21 — PRODUCTION TRANSLATION / IMPLEMENTATION PLANNING — HANDOFF

**Date:** 2026-09-04 · **Branch:** `test_branch` · **HEAD:** `91a82b7`
**Model:** Claude Opus 5 · **Type:** planning and architecture. **No implementation.**

---

## 1. What this session did

Read the authoritative programme state (`CURRENT_STATE.md`, `DECISION_LOG.md`,
`QUALITY_GATES.md`, `docs/24-resolve-governance/`, `docs/26-resolve-homepage/`, the Gate 10
closure handoff, the Gate 9B UX architecture, the F1 taxonomy, the CRO and analytics
specifications, the IA inventory and URL map), then **inspected the real Next.js application** and
produced a production translation plan.

**Nine planning documents were created under `docs/27-production-translation/`. Nothing else was
created, modified, staged, committed or pushed.**

## 2. Repository state

| | |
|---|---|
| Branch | `test_branch` |
| HEAD | `91a82b7` — **unchanged** |
| Staged | none |
| Modified (tracked) | none |
| Untracked | `README.md` *(pre-existing, predates this programme, **not touched**)* · `docs/27-production-translation/` *(this session's artefacts)* |
| Production files changed | **NONE** |
| Prototype files changed | **NONE** |
| Governance files changed | **NONE** |

## 3. Key findings

1. **The stack is sufficient and unblocking.** Next.js 16.2.6, App Router, TypeScript, Tailwind v4
   (CSS-first, no JS config), shadcn/ui, Contentful via GraphQL, custom Node server. **No animation
   library is present and none is needed** — the approved page is CSS transitions plus
   `IntersectionObserver` plus one `rAF` scroll handler.
2. **The site is currently forced-dark**, with a hand-written 20-selector repair block that exists
   only because light Tailwind surfaces sit on dark tokens. THE RESOLVE is **light-first by
   decision**, so the flip and the deletion of that block are **one atomic change** — the
   highest-blast-radius step in the programme.
3. **The 27 apparent duplicate components are one-line re-export shims**, not duplicates. **They
   are the swap seam** — no de-duplication project is needed.
4. **The contact form submits nowhere.** `setTimeout`, then a success screen. **No `app/api/`, no
   route handler, no server action, no CAPTCHA, no honeypot, no rate limit.** The Calendly
   component calls the **badge** API against an **inline** container, so it never fills.
5. **Two live PII defects** — `lib/tracking.ts` pushes a raw email address and a phone number into
   `dataLayer`. **No event fires from a server**, so both ★ conversion events are currently
   unimplementable.
6. **Three inherited technical-debt items** the redesign must not be blamed for: a `max-age=
   31536000, immutable` rule configured for every path whose intended override cannot match App
   Router routes (**runtime effect RESEARCH REQUIRED**); `robots.ts` disallowing **GPTBot and
   CCBot**, contradicting the AI-visibility objective; and **no consent mechanism** while GTM and
   Meta Pixel load.
7. **Two direct conflicts with the approved direction**, recorded rather than silently resolved:
   the production header is `sticky` (the direction budgets sticky at **0** and requires a
   non-sticky header at every width), and its *Services* parent is a **button**, so `/services` is
   unreachable from the desktop nav — the exact Session 01 structural defect the prototype fixes.

## 4. Recommendation

> ### **READY FOR CONTROLLED PRODUCTION IMPLEMENTATION**

**No genuine architectural blocker exists.** The stack imposes no constraint on the validated
experience; the content model does not conflict with the approved IA; routing is preserved rather
than restructured; and the absence of a form backend is **unbuilt work on an available platform**
(a custom Node server, where route handlers and server actions are fully supported) — a Phase H1
dependency, correctly sequenced *after* the visual rollout, not a blocker to it.

## 5. Next suggested session — the smallest safe first step

> ### **SESSION 22 — PHASE A0 + PHASE A: DEPLOYMENT CHECK AND RESOLVE FOUNDATION**

**Scope, and nothing beyond it:**

1. **A0, no code:** observe the live `Cache-Control` on a document response; confirm whether
   `app/robots.ts` or `public/robots.txt` is served; confirm `next lint` still functions on Next 16.
   Record all three as VERIFIED FACT with raw headers.
2. **A:** the Resolve token set in `@theme`; Bricolage Grotesque + Manrope via `next/font/google`;
   **remove `dark` from `<html>` and add `color-scheme: light`**; delete both dark-repair blocks;
   retire `lib/design-system.ts` and `styles/globals.css`; minimise `@layer base`; add the skip
   link and `<main id="main">`; declare the Resolve breakpoint tokens; update `Container` to
   `1400px` / `clamp(18px,3.4vw,56px)`.

**Files:** `app/globals.css` · `app/layout.tsx` · `components/layout/Container.tsx` ·
delete `lib/design-system.ts` and `styles/globals.css`.

**Acceptance before anything else proceeds:** all 21 existing routes render at **360, 390, 430,
760, 761, 860, 1080, 1425** with **0 contrast failures**, **0 horizontal overflow**, **0 route
500s**, **0 monospace on any public route**, and both `npm run build` and `build:cpanel` succeed.

**Why this is the smallest safe step.** It is one commit, fully revertible, touches no component
logic and no route, and it is the prerequisite every later phase renders against. Doing the ground
flip later would force a second full-route regression sweep.

**Explicitly out of scope for Session 22:** any component replacement · any homepage work · any
form or analytics work · any new route · any redirect change · any push.

## 6. Carried forward, unresolved

**Owner blockers, all open:** `/pricing` facts · **F17 — the real `/how-it-works` process,
BLOCKED and undrawn** · the conditional manufacturing route · people, authorship and the responder
portrait · complete NAP and legal entity name (the current `postalCode` contains the word
*"India"* and **must not be carried forward**; the LinkedIn founding year of 2016 is **NOT
VERIFIED**) · `/google-ads` fee-vs-spend separation · `/ai-seo`'s `[VALIDATION REQUIRED]` claim.

**Orchestrator decisions needed:** the GPTBot/CCBot disallow · the datastore, CRM and
booking-vendor selections · the consent policy · confirmation that the non-sticky header governs
over the CRO rules' permission for sticky CTAs.

**Never performed by this programme:** real-hardware performance profiling and Core Web Vitals ·
screen-reader, real-device, cross-browser, print and 200% text-resize testing · **user testing**.
None may be reported as passed without being run.

## 7. Confirmation

- **No production implementation was performed.** `app/`, `components/`, `lib/`, `hooks/`,
  `styles/`, `public/`, `scripts/`, `next.config.mjs`, `package.json` — **all unchanged**.
- **No prototype was modified.** `docs/20-creative-convergence/prototype/convergence.html` and
  `docs/26-resolve-homepage/prototype/index.html` — **unchanged**.
- **No governance was modified.** `DECISION_LOG.md`, `QUALITY_GATES.md`, `CURRENT_STATE.md`,
  `docs/24-resolve-governance/` — **unchanged**.
- **Nothing staged. Nothing committed. Nothing pushed.**
- **`README.md` untouched.**
