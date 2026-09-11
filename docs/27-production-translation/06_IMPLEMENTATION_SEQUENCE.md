# Session 21 — Implementation Sequence

**Session:** 21 · **Date:** 2026-09-04 · **Status:** **PLANNING ARTEFACT — PROPOSED.**
**Nothing in this document has been executed.**

The recommended shape (Phases A–I) is adopted, **with two adjustments justified by repository
reality** and recorded here rather than made silently:

1. **A new Phase A0 precedes everything.** The redesign must not be built on top of an unverified
   one-year `immutable` cache rule (`05_FORMS_ANALYTICS.md` §3.2). Verifying it is one HTTP request
   and it gates whether anything shipped is reachable by returning visitors.
2. **Phase H (forms/analytics) splits into H1 (backend + forms) and H2 (analytics).** The two ★
   conversion events are **server-only by definition**, so analytics is strictly downstream of a
   backend that does not exist. Running them in parallel would produce client-side conversion
   tracking — the exact defect the taxonomy exists to fix.

**Every phase ends at a commit boundary on `test_branch`. Nothing is pushed without instruction.**

---

## Phase A0 — Deployment reality check *(no code)*

| | |
|---|---|
| **Scope** | Observe the **live** `Cache-Control` on a document response. Confirm whether `app/robots.ts` or `public/robots.txt` is served. Confirm `next lint` still functions on Next 16 |
| **Files** | **NONE** |
| **Dependencies** | Access to a deployed instance |
| **Acceptance** | Three answers recorded as VERIFIED FACT, with the raw response headers |
| **Rollback** | n/a |

## Phase A — Foundation: tokens, fonts, the light-first flip

| | |
|---|---|
| **Scope** | Resolve token set in `@theme` · Bricolage Grotesque + Manrope via `next/font/google` · **remove `dark` from `<html>`, add `color-scheme: light`** · delete both dark-repair blocks · retire `lib/design-system.ts` and `styles/globals.css` · minimise `@layer base` (remove global `section{py-16}` and the two blanket `a{}` rules) · add the skip link and `<main id="main">` · Resolve breakpoint tokens |
| **Files** | `app/globals.css` · `app/layout.tsx` · `lib/design-system.ts` *(delete)* · `styles/globals.css` *(delete)* · `components/layout/Container.tsx` |
| **Dependencies** | A0 |
| **Acceptance** | **All 21 existing routes render at 360/390/430/760/761/860/1080/1425 with 0 contrast failures and 0 horizontal overflow** · `0` monospace on any public route · fonts self-hosted and preloaded · `npm run build` succeeds · **no route 500s** |
| **Rollback** | Single commit revert. **This is the widest-blast-radius phase in the programme** — it must be one commit, and it must not be mixed with component work |

> Phase A **will** temporarily make existing crimson/dark-styled pages look wrong. That is expected
> and is why Phase B follows immediately. It is a **legibility** gate, not a beauty gate.

## Phase B — Shared chrome

| | |
|---|---|
| **Scope** | `ResolveHeader` (**non-sticky**; parent is a real link + separate adjacent disclosure; `Escape` closes and restores focus; hover is a fine-pointer enhancement only; in-place mobile panel with the one permitted escapable focus containment) · `ResolveFooter` (**two columns on NARROW**) · `CTA` / `CTA--outline` / `CTA--sm` / `ProofLink` · restyle `button`, `input`, `textarea`, `label`, `select`, `accordion`, `badge`, `separator` · `Section` tone/rhythm props |
| **Files** | `components/layout/{Header,Footer,Section,Container}.tsx` · `components/Logo.tsx` · `components/ui/{button,input,textarea,label,select,accordion,badge,separator}.tsx` · `app/globals.css` |
| **Dependencies** | A |
| **Acceptance** | **0 `position:sticky` / `position:fixed`** site-wide · **`/services` reachable from the desktop nav** · `Escape` closes the panel, restores body scroll, returns focus · **0 targets under 40×40** at all eight widths · nav fully keyboard-operable · **nav usable with JS off** |
| **Rollback** | Per-component; the re-export shims mean pages need no edits either way |

## Phase C — Homepage static composition

| | |
|---|---|
| **Scope** | All eight regions as **server components**, complete and composed: hero DOM in the **resolved** state · departure · friction runs **aligned** · six re-read rows · **F1 fully drawn at full scale, all three width variants** · boundary · capabilities · evidence open · fit · close. **No JavaScript yet** |
| **Files** | `app/page.tsx` · `components/resolve/*` (new) · `lib/constants.ts` |
| **Dependencies** | B |
| **Acceptance** | **This phase's output IS the no-JS build** — it must already be complete and honest · exactly **1 `<h1>`**, **0 heading jumps** · **exactly one F1 drawing visible at each width** (verified by **measuring rendered widths**, not reading CSS) · **0 fabricated quantities** · measures ≤58ch · **F2 ≥ 2.0× at NARROW and ≥ 5.0× at WIDE**, F3 per the unchanged rubric |
| **Rollback** | `app/page.tsx` revert; new components are additive |

## Phase D — Homepage meaningful interaction and motion

| | |
|---|---|
| **Scope** | `useResolveOnView` (once-only + **4s forced fallback** + `visibilitychange`) · `useReducedMotion` · the five client leaves · **exactly** T1×1, T2×2, T3×4, signature×1, tablist×1 |
| **Files** | `hooks/use-resolve-on-view.ts` · `hooks/use-reduced-motion.ts` · `components/resolve/{ResolveStage,ResolveField,TrafficEnquiriesControl,FrictionRuns,SystemStages,EvidenceDisclosure,OnView}.tsx` |
| **Dependencies** | C |
| **Acceptance** | Counted on the **rendered** page: **T1 1 · T2 2 · T3 4 · sig 1 · tablist 1 · ambient 0 · pinned 0 · `infinite` 0** · nothing replays on scroll-back · **reduced motion opens resolved, all panels open, nothing `inert`, and the signature control still works** · a hidden tab resumes **composed, never displaced** · tab accessible names are exactly *"Capture" / "Convert" / "Measure"* · **0 interactive elements nested inside interactive elements** · **1** tablist tab stop (roving `tabindex`) · Home/End/arrows verified |
| **Rollback** | Remove the client leaves — **Phase C's page is a complete, shippable fallback.** This is the single most valuable property of the C/D split |

## Phase E — Responsive and fallback hardening

| | |
|---|---|
| **Scope** | 18C mobile de-clutter inside `max-width:760px` · footer two-column · hero pause so the stage begins ≈651px and the population is **teased at the fold** · the alignment threshold at 900px · F1 legend drops to one item on NARROW · `::after` target extenders |
| **Files** | `app/globals.css` · `components/resolve/*` |
| **Dependencies** | D |
| **Acceptance** | **0 horizontal overflow** and **0 targets < 40×40** at all eight widths · **no two adjacent extenders overlap** · **WIDE unchanged — measured, not asserted** (18C changed desktop by **0px**) · reduced-motion contrast re-tested (19A found a **2.66:1 failure against a 3:1 floor** in that mode) |
| **Rollback** | CSS-only revert |

> **GATE: the homepage is complete here.** It may be reviewed by the owner before Phase F begins.

## Phase F — Commercial archetypes

| | |
|---|---|
| **Scope** | `/services` · `/seo` · `/google-ads` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · **new `/ai-seo`** · breadcrumbs · `BoundaryBlock`, `FitBlock`, `EvidenceDisclosure`, `CapabilityList` proven as reusable · F1 **PARTIAL** and **STATE** variants |
| **Files** | `app/(pages)/*/page.tsx` (7) · `components/resolve/*` · `lib/metadata.ts` · `lib/schema.ts` · `app/sitemap.ts` |
| **Dependencies** | E. **`/services` is sequence-dependent on `/how-it-works`, which is BLOCKED** |
| **Acceptance** | Per page: **T1 0 · T2 ≤1 · T3 ≤2 · sticky 0** · F1 class matches the taxonomy exactly (`/ai-seo`, `/google-ads`, `/social-media-ads` = **NONE**) · zero apparatus on the first screen · boundary above the midpoint · JSON-LD present · **0 fabricated claims** |
| **Rollback** | Per route |

## Phase G — Remaining approved archetypes

| | |
|---|---|
| **Scope** | `/how-it-works` (**§2 renders nothing**) · **new** `/problems/traffic-but-no-enquiries` · `/pricing` (**every figure blocked**) · `/about` (**§4 renders nothing**) · `/faq` · `/work` (**`noindex`, out of sitemap**) · **new** `/work/[slug]` · `/blog`, `/blog/[slug]` · **new** `/research` + 2 entries · `/contact`, `/schedule-call`, `/thank-you` presentation · legal · `not-found` (**links generated from live routes**) · redirects: `/portfolio/:slug`→`/work/:slug`, `/portfolio`→`/work`, `/results/:slug` re-pointed |
| **Files** | remaining `app/(pages)/*` · new route dirs · `next.config.mjs` · `app/sitemap.ts` · `app/not-found.tsx` |
| **Dependencies** | F. `/portfolio`→`/work` requires the Contentful slug set to be enumerated first — **safe now only because zero case studies are published** |
| **Acceptance** | Every blocked slot **renders nothing** — no placeholder, no silhouette, no "coming soon" · **conversion surfaces carry zero figures and zero resolves (M6)** · editorial pages **T3 ≤1, no sticky** · every old URL resolves, **no redirect chain** · `/work` absent from the sitemap |
| **Rollback** | Per route; redirects revert as one config change |

## Phase H1 — Backend and forms

| | |
|---|---|
| **Scope** | `app/api/enquiry/route.ts` · **persist-first** · the five WQE conditions · the two independent statuses · honeypot + timing + rate limit + idempotency key · fail-open email validation · notification · booking vendor selection and integration · `/thank-you` wired as the destination · the new 4+3 field form |
| **Files** | `app/api/**` (new) · `components/forms/*` · `app/(pages)/{contact,schedule-call,thank-you}/page.tsx` · `.env.example` |
| **Dependencies** | G. **Owner: datastore, CRM and booking-vendor decisions** |
| **Acceptance** | A real submission is **durably persisted and retrievable** · success shows **only after confirmed persistence** · **values survive a forced server error** · a double-tap creates **one** record · **no budget field exists** · suspected spam sees the **same** success state · keyboard-only completion works |
| **Rollback** | Feature-flag the new endpoint; the old form is already non-functional, so there is nothing to regress to |

## Phase H2 — Analytics and consent

| | |
|---|---|
| **Scope** | Consent gate before GTM/Pixel · **delete the two PII-leaking helpers** · one event surface (remove the direct `window.gtag` path) · rename to the approved taxonomy · **server-side `lead_form_submitted` and `meeting_booked`** · UTM capture/persistence · opaque `enquiry_id` |
| **Files** | `lib/gtm.tsx` · `lib/tracking.ts` *(rewritten)* · `app/api/**` · `app/layout.tsx` · new consent component |
| **Dependencies** | **H1. Not parallel.** Both ★ events are server-only |
| **Acceptance** | **0 PII in any `dataLayer` payload — verified by inspecting the live queue** · **0 conversion events fire from the client** · no analytics loads before consent · `page_path` never carries a query string · a declined consent yields `attribution_status = unavailable` and **does not** change `qualification_status` |
| **Rollback** | Per module |

## Phase I — Technical, SEO, performance and security hardening

| | |
|---|---|
| **Scope** | Fix the caching rule per A0 · **orchestrator decision on GPTBot/CCBot** · www/apex canonical redirect · CSP + HSTS · remove `ignoreBuildErrors` · `loading.tsx` / `error.tsx` for Contentful routes · `/blog` pagination · dependency pruning · font subsetting · real-hardware profiling and Core Web Vitals · screen-reader, real-device, cross-browser, print and 200% text-resize testing |
| **Files** | `next.config.mjs` · `app/robots.ts` · `package.json` · new boundary files |
| **Dependencies** | H2 |
| **Acceptance** | The performance budget in `07_VALIDATION_GATES.md` §7 met **on measured real hardware** · type checker green with `ignoreBuildErrors` removed · headers verified on a live response |
| **Rollback** | Per config change |

---

## Sequencing rationale

- **A before everything** because every later phase renders against the token set, and doing the
  ground flip late would force a second full-route regression sweep.
- **C before D** because it makes the **no-JS build an artefact of the process rather than a
  promise**, and it makes D independently revertible.
- **E after D** because 18C's de-clutter is a response to *rendered* clutter — it cannot be
  designed against a page that does not yet exist.
- **F before G** because the commercial archetypes are what prove the design-system components are
  genuinely reusable. If a component only ever works on `/`, that is discovered in F, when it is
  still cheap.
- **H after G** because forms are a **backend project**, not a styling project, and blocking the
  visual rollout on it would be exactly the mistake `05_FORMS_ANALYTICS.md` §3 warns against.
- **I last**, except for A0, which is pulled forward because its answer can invalidate a deployment.

## Owner inputs on the critical path

| Needed by | Input |
|---|---|
| **F** | `/google-ads` fee-vs-spend separation |
| **G** | `/pricing` figures · **F17 — the real `/how-it-works` process** · people and authorship · complete NAP and legal entity · manufacturing gate |
| **H1** | Datastore, CRM and booking-vendor decisions · notification address |
| **H2 / I** | Consent policy · **the GPTBot/CCBot decision** |

**No phase before F is blocked by any owner input.** Phases A0–E can begin immediately.
