# Gate 4 · E6 — GTM, Analytics and Consent Risk Audit

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Type** | **Audit and planning only.** No application code, analytics, consent behaviour or GTM configuration was changed. Nothing committed, pushed or deployed |
| **Baseline** | Branch `ui-revamp`, HEAD `101a653` (`DEC-037` B1 docs), application at `f82d09b` (B1 chrome). `DEC-036` and `DEC-037` read. `next-env.d.ts` (pre-existing modification) and unrelated untracked files left as found |
| **Builds under test** | Scratch copies outside the repository: plain `101a653`; the same commit with an **inert placeholder** container id `GTM-E6AUDIT`; legacy-chrome B0 baseline `352bb25`. Build IDs: [`gate-4/e6/evidence/README.md`](gate-4/e6/evidence/README.md) |
| **Harness** | B0/B1 harness reused: `analytics-forms.cjs` (parity vs B1) and `lib.cjs`. New probe `gate-4/e6/e6-probe.cjs` (same safety contract). Chromium, WebKit and Firefox (Playwright engines, **not** real devices) |
| **Safety** | Every non-local request aborted. `gtm.js` answered **locally** by a stub that snapshots `dataLayer`. `/api/enquiry` answered by the probe. **No lead, no conversion, no Google request, no consent change on production.** One read-only `curl` of two production 404 URLs (no JavaScript) |
| **Restrictions honoured** | `LIVE-1`, `LIVE-2`, `PROC-1` untouched and OPEN. No merge, push or deploy. B2 not started |

Evidence labels follow `CLAUDE.md`: **VERIFIED FACT**, **APPROVED DECISION**, **WORKING HYPOTHESIS**, **RESEARCH REQUIRED**, **UNKNOWN**.

---

## 1. Executive summary

**E6 status: PARTIALLY VERIFIED.** The application layer is verified. Container-level verification of the current GTM configuration is **BLOCKED BY ACCESS**.

1. **The application's tracking contract is intact after B1 (VERIFIED FACT, three engines).** Consent ordering is correct on all 22 ordinary routes and the global 404. The gate behaves as designed for undecided, accept, reject and withdraw. Every `page_view` fired on 46 header, footer and mobile-menu navigations. `meeting_started` and `lead_form_*` behave as recorded, and duplicate prevention holds. The B0 analytics harness shows **0 differing sections** against the B1 baseline. Neither the legacy chrome nor the Direction C chrome emits any analytics event.
2. **New, higher-severity finding (E6-A1, VERIFIED locally; its preconditions are VERIFIED on production).** On route-level `notFound()` responses, a returning visitor who previously **accepted** analytics gets the GTM container loaded **with no consent commands in `dataLayer` at all**. That covers `/blog/*`, `/portfolio/*`, `/research/*`, `/press/*` and `/launch-checklist`. The state persists through client-side navigation to `/contact`, so a `lead_form_submitted` in that session is sent with no Consent Mode state. This goes beyond OBS-1 as registered, which assessed the exposure as low because "GTM loads only after an explicit granted". The explicit grant comes from storage, but the replayed `consent update` is never pushed.
3. **Root cause (VERIFIED FACT).** These responses are ISR or prerender cache entries whose cached document is Next's error shell, `<html id="__next_error__">`. The served shell contains no layout `<head>`, so the document is built client-side from the RSC payload. React inserts the bootstrap `<script>` into the DOM (it is present in the live DOM), but **the browser does not execute it**. Production serves the identical shell, and its layout chunk contains the live container ID.
4. **B1 chrome change against GTM.** No active tag is DOM-dependent **according to the repository's record of container Version 4** (`DEC-021`, 2026-09-06): six active tags, all on dataLayer custom-event triggers. 39 tags are paused, including the legacy social-click tags. This is a **documentary record, not a current export**. Whether the published container changed after the 2026-09-18 verification is **UNKNOWN**. The DOM differences that would matter to any click trigger are catalogued in §3.
5. **B2 may proceed locally** independent of the unresolved E6 items, with the conditions in §9 H. E6 remains a pre-staging requirement (`DEC-036`). E6-A1 is pre-existing and live on production. It needs an owner decision on whether to treat it as a production issue now, independent of the revamp.

---

## 2. Event and instrumentation inventory (VERIFIED FACT — code inspection + runtime)

### 2.1 Infrastructure

| Element | Where | Behaviour |
|---|---|---|
| Consent bootstrap | `lib/consent.ts:196` (`CONSENT_BOOTSTRAP_SCRIPT`), rendered as the first `<head>` child by `app/layout.tsx:85` | Synchronous inline script: creates `dataLayer`; pushes `consent default` (four signals **denied**) as an `arguments` object; replays a stored `granted` as `consent update` (analytics granted, three ad signals denied) |
| `dataLayer` writers | `lib/analytics.ts:208` `track()`; `lib/consent.ts:137` `pushConsentUpdate()`; the bootstrap | `track` creates the array if absent, adds `environment`, and sanitises parameters (drops `@ < >`, 100-char cap). It is the only event writer. **No `window.gtag` global** is defined anywhere (0 call sites in `app/ components/ lib/`) |
| GTM loader | `lib/gtm.tsx:66` `GoogleTagManager` | Two gates: build-time `NEXT_PUBLIC_GTM_ID` **and** consent state `granted`. `next/script` `afterInteractive`, id `gtm-script`, `__msGtmLoaded` double-injection guard. No `<noscript>` iframe. The ID is **build-time inlined** (production chunk contains `GTM-K8ZQ…`) |
| Consent state | `components/analytics/ConsentProvider.tsx` | Reads `localStorage['ms.consent.v1']` in an effect after mount. `accept`/`reject` write storage, push `consent update` and close the banner. **Mount does not push a consent command**: it relies on the bootstrap's replay (the gap behind E6-A1) |
| Consent UI | `ConsentBanner.tsx` ("Accept analytics" / "Reject analytics"); `ConsentPreferencesLink.tsx` (footer button "Analytics preferences", rendered by both footers) | Banner not modal; reopen from footer |
| Meta Pixel | `lib/meta-pixel.tsx` | Consent-gated **and** env-gated; `NEXT_PUBLIC_META_PIXEL_ID` empty. Inert. *(`23_PHASE_H2_…` §4/§18.6 says "still not consent-gated". The current code is gated. That record is stale on this point)* |
| Attribution | `lib/attribution.ts` | `sessionStorage` `ms.h2.attribution.v1`, written on page view **regardless of consent** (pre-existing, recorded there as an owner/legal question; not an E6 change) |
| Other third-party scripts | — | **None rendered.** `CalendlyEmbed` (loads `assets.calendly.com`) is not rendered anywhere. Fonts are self-hosted. Across all 28 first loads, undecided, in three engines: **0 non-local requests attempted** |
| CSP | `next.config.mjs` | `base-uri`, `object-src`, `frame-ancestors`, `form-action` only. No `script-src`/`connect-src`, so nothing restricts GTM |
| `data-*` analytics hooks | — | **None** (OBS-5). Chrome `data-*` are `data-nimg`, `data-slot` (legacy) and `data-open` (Direction C); none analytics |

### 2.2 Events (approved taxonomy, `EVENT_TAXONOMY.md` / `DEC-011`; unchanged)

| Event | Emitter | Trigger and timing | Payload (after sanitising, plus `environment`) | Verified behaviour (this audit, 3 engines) |
|---|---|---|---|---|
| `page_view` | `AnalyticsRouteListener` (root layout) | `useEffect` on `usePathname()` change, after mount. Ref-guarded against repeats for the same path. First load: after hydration, **after** the bootstrap entries | `page_path` (path only), `page_type` | 1 per first load (28 targets); exactly 1 per navigation on **32 desktop header/footer steps and 14 mobile-menu steps**; 0 on same-page click; 1 on back, 1 on forward. Paths and types correct |
| `lead_form_started` | `ContactForm` `setValue` | First edit of a non-honeypot field, once per mounted form | `page_path`, `page_type`, `form_id=contact_enquiry` | Once per form |
| `lead_form_validation_error` | `ContactForm` | Per failing field on client validation; per field on a server 400 with `fieldErrors`; one form-scoped event on other non-2xx or network failure | + `field_name`, `error_type`, `error_scope`, `failure_reason` (no values) | 400 → `server:email`; 429 → `rate_limited`; 500 → `server:unavailable`; network → `server:network` |
| `lead_form_submitted` | `ContactForm` | **Only** on `response.ok` from `POST /api/enquiry`, via `trackOnce` keyed on the idempotency key (`sessionStorage`), before `router.push('/thank-you')` | `page_path`, `page_type`, `form_id`, `conversion_surface=form`, `qualification_status=not_evaluated`, `attribution_status`, `first_/latest_source/medium` (campaign when present) | 2xx → 1; **triple-click on a slow server → 1 request, 1 event**; network failure then retry → 2 requests, **1 key**, 1 event; 400/429/500 → 0; direct `/thank-you` + reload → 0; back + forward after success → no extra event; **no PII** (`@` or synthetic values absent) |
| `meeting_started` | `BookingLink` (only on `/schedule-call` `<main>`, "Open the booking page", Calendly, `target=_blank`) | `onClick`, synchronous, before the browser opens the tab | `page_path=/schedule-call`, `page_type=booking`, `cta_location=inline`, `cta_role=direct`, `conversion_surface=booking` | 1 per click; **two clicks → two events** (not de-duplicated, by design: a diagnostic, not a conversion). Header and footer "Book a call" go to `/schedule-call` → `page_view` only |
| `consent default` / `consent update` | Bootstrap; `pushConsentUpdate` | See §4 | `arguments`-shaped commands | See §4 |
| GTM-owned (`gtm.js`, `gtm.dom`, `gtm.load`, `gtm.linkClick`) | Container | Pushed by GTM after load; `gtm.linkClick` comes from GTM's auto-event listener (observed 2026-09-06, `20_PHASE_H2A…` §20.6) | — | `gtm.js` observed via the stub. Container-internal events are not testable locally |

**Container-side mapping (APPROVED DECISION `DEC-021`, a documentary record):** `GA4 - Configuration` (`send_page_view=false`) plus `GA4 - H2 - {page_view, lead_form_started, lead_form_validation_error, lead_form_submitted, meeting_started}` on five `CE - …` custom-event triggers. There are 14 Data Layer Variables and 13 GA4 custom dimensions. The record names no CSS-selector, click or form-submission trigger among the active tags.

---

## 3. B1 DOM compatibility assessment

**Method:** live DOM of `/about` captured in the legacy build (`352bb25`) and the B1 build (`101a653`), at 1440 and at 390 with the menu open (`e6-probe-chromium.json` → `t9_chrome`). Code inspection confirmed that **neither chrome emits analytics events or carries tracking attributes**.

### 3.1 What changed (VERIFIED FACT)

| Facet | Legacy | Direction C (B1) |
|---|---|---|
| Header root | `<header class="sticky top-0 z-50 …">`, `position: sticky` | `<header class="dc dc-hdr">` (`dc-menu-open` while open), `position: relative` |
| Element IDs | `#mobile-menu` (menu nav), `#services-menu` (desktop services list) | `#dc-mnav`, `#dc-svc-panel`, `#dc-m-co`. **`#mobile-menu` no longer exists** (verified in 3 engines) |
| Menu button | icon-only; `aria-label` "Open menu"/"Close menu"; `aria-controls=mobile-menu` | visible text "Close menu"/"Menu", **no `aria-label`**; `class=dc-menu-btn`; `aria-controls=dc-mnav` |
| Services toggle | `aria-label` "Show/Hide services list"; `aria-controls=services-menu` | `aria-label` "Services submenu"; `aria-controls=dc-svc-panel`; `class=dc-svc-btn`; panel `data-open`, `inert` when closed |
| Desktop header links | 9 visible: logo, Services, nav links, Book a call, Contact Us | The same 9 (identical `href` + text) **plus 8 services-panel links in the header DOM** (Organic search (SEO), Google Ads, Paid social, AI search, Conversion optimisation, Lead generation, Measurement → `/how-it-works`, All services → `/services`) |
| Mobile menu order and text | Services, service list, How It Works, Case Studies, Pricing, Blog, About, Contact Us, Book a call (CTAs last) | **Contact Us and Book a call first**, then "Services →", services, "How It Works →", "Case Studies →", "Pricing →", "Blog →", "About →", plus "Measurement" |
| Service link text (header and footer) | Social Media Ads · AI Search · Conversion Optimization · Lead Generation | Paid social · AI search · Conversion optimisation · Lead generation (`DEC-036`, R-series) |
| Footer social links | icon-only, accessible name from `aria-label` (LinkedIn, Facebook, Instagram), **empty text** | visible text "LinkedIn", "Facebook", "Instagram"; same `href` |
| Footer `mailto` | icon link (`aria-label` "Email") **and** text link | text link only (D10, approved) |
| Header CTAs | "Contact Us" → `/contact` (shadcn `Button asChild`, `data-slot=button`); "Book a call" → `/schedule-call` | same text and `href`; Direction C classes; no `data-slot` |
| Classes | Tailwind utilities | `dc-*` |
| Footer "Analytics preferences" | button | button, same text |

### 3.2 GTM dependency classification

| Potential GTM dependency | Classification | Basis |
|---|---|---|
| The six active tags in Version 4 (custom-event triggers on `page_view`, `lead_form_*`, `meeting_started`) | **Demonstrably unaffected at the application level.** Every source event fires identically before and after B1 (analytics parity 0 diffs; 46 navigations in 3 engines). **Container state itself is not re-verified** | Runtime + `DEC-021` record |
| Triggers on Page Path / Page URL (e.g. legacy "… Page Visit" tags) | **Demonstrably unaffected:** URLs unchanged. Those tags are recorded as paused | Inventory 0 URL changes; `DEC-021` |
| Triggers on Click URL / `href` (header CTAs, footer social, booking) | **Demonstrably unaffected:** every destination is preserved, except the removed duplicate `mailto` icon (the `mailto` text link remains) | §3.1 |
| Triggers on Click Text = "Contact Us" / "Book a call" (header) | **Demonstrably unaffected** for exact-match text on the header CTAs | Identical text |
| Triggers on Click Text for service links, mobile-menu items ("Blog" vs "Blog →") or footer social (empty → "LinkedIn") | **Possible but unverified:** these would break | Text changed |
| Triggers on Click ID / Click Element matching `#mobile-menu …`, `#services-menu`, `header.sticky`, Tailwind classes, `[data-slot=button]` | **Possible but unverified:** these would break | IDs and classes removed |
| Legacy `GA4 - FB/Insta/LinkedIn/Twitter/YouTube Click` tags | **Possible but unverified**, and recorded as **paused** in Version 4. If they key on Click URL they still match; on Click Text or icon element they do not | `20_PHASE_H2A…` §14, `DEC-021` |
| `gtm.linkClick` auto-event listener (observed 2026-09-06) | **UNKNOWN:** a Just Links trigger exists or existed; which tags consume it now is unverified | `20_PHASE_H2A…` §20.6 |
| Native GTM Form Submission trigger on `/contact` | **Possible but unverified.** The form uses `preventDefault` + `fetch`, so a DOM submit trigger may never fire or may fire without persistence. Not a B1 change | Code |
| Element Visibility triggers (legacy "Lead Confirmation Mesage", tag `GA4 - Lead Form Submit`) | **Possible but unverified**; recorded as paused | `DEC-021` |

**No GTM compatibility is claimed.** Nothing above is "confirmed from configuration": no live container or export was inspected in this session.

---

## 4. Consent initialisation findings

| Question | Finding | Label |
|---|---|---|
| Where is the default-denied consent initialised? | Inline bootstrap, first child of `<head>` (`app/layout.tsx:85`) | VERIFIED FACT |
| Does it precede analytics execution? | On every route that serves the layout `<head>`: yes. It is the **first `dataLayer` entry** on 22/22 ordinary routes and the global 404 in 3 engines, before `page_view` and before any `gtm.js`. No synchronous script precedes it (B0) | VERIFIED FACT |
| Ordinary routes: undecided | default (all denied) → `page_view`; banner; **0 GTM requests, 0 third-party requests** | VERIFIED FACT |
| Accept (banner) | default → `page_view` → update (analytics granted, ads denied) → `gtm.js`. The container stub saw the default and update **before** `gtm.js`. 1 GTM request across 3 later navigations | VERIFIED FACT |
| Reject (banner) | update (all denied); 0 GTM requests, then and after 3 navigations | VERIFIED FACT |
| Returning granted | default → update → `page_view` → `gtm.js` (bootstrap replay) | VERIFIED FACT |
| Returning denied | default only; 0 GTM requests | VERIFIED FACT |
| Withdrawal (footer → Reject) | update (all denied) pushed; stored `denied`; the container cannot be unloaded on that page (documented). After reload: 0 GTM script elements, no new request | VERIFIED FACT |
| **Route-level 404, returning granted** | **`dataLayer` at container load = [`page_view`, `gtm.js`]: no default, no update.** After client navigation to `/contact`: still 0 consent commands. Identical on all 5 targets × 3 engines | **VERIFIED FACT (local)** |
| Route-level 404, accept from the banner | update (analytics granted, **ads explicitly denied**) → `gtm.js`; **no default** | VERIFIED FACT |
| Route-level 404, undecided / reject / returning denied | No container loads (gate holds) | VERIFIED FACT |
| Can any tag execute before consent initialisation? | **From the application: no third-party script loads before an explicit or stored grant, on any route.** On route-level 404s, consent initialisation **never happens** for the stored-grant case. Container tags then run with no Consent Mode state | VERIFIED FACT (application); container behaviour **RESEARCH REQUIRED** |
| Does the missing default affect enforcement? | **Yes, in the stored-grant case, and the effect is not limited to a missing log entry.** Google's documentation states that "by default, no consent mode values are set", and that if consent code is called out of order, "consent defaults won't work" ([developers.google.com — consent mode](https://developers.google.com/tag-platform/security/guides/consent)). With no command at all, `ad_storage`, `ad_user_data` and `ad_personalization` are **not denied**. That conflicts with the binding rule that advertising stays denied unconditionally (`DEC-020`; `lib/consent.ts` header). What GA4/Google tags in *this* container actually do with unset consent (e.g. Google signals, ads-data pings such as the `pagead2…/ccm/collect` seen on 2026-09-06, `_gcl_*` writes) is **RESEARCH REQUIRED** in GTM Preview | Mixed, as labelled |
| Does it affect a visitor in the undecided state? | No. The banner path pushes an explicit update with ads denied. Exposure is the **returning-accepted visitor whose session starts on a route-level 404** (e.g. a stale or mistyped blog or case-study link) | VERIFIED FACT (local); traffic volume **UNKNOWN** |

---

## 5. Route-level ("dynamic") not-found investigation

| Item | Finding | Label |
|---|---|---|
| Which responses | `notFound()` thrown inside a route segment: `/blog/[slug]`, `/portfolio/[slug]`, `/research/[slug]`, `/press/[slug]` (unknown slug) and `/launch-checklist` (gated). **Not** the global unmatched-URL 404 | VERIFIED FACT |
| What is served | HTTP 404, `x-nextjs-cache: HIT`, `x-nextjs-prerender: 1`, `Cache-Control: s-maxage=60, stale-while-revalidate=31535940` (`/launch-checklist`: `s-maxage=31536000`). Document: **`<html id="__next_error__">`**: no `lang`, no layout `<head>` (no bootstrap, no `Organization` JSON-LD, 0 stylesheet links), **no body content** (no skip link, header, `<main>` or footer). `<title>`, robots and canonical are present from the streamed metadata. The global 404 serves the full layout with `Cache-Control: private, no-store` | VERIFIED FACT |
| Why served HTML and hydrated DOM differ | The cached ISR/prerender entry for a segment-level `notFound()` is Next's error shell plus the RSC payload. The browser builds the whole document client-side from the payload. A `<script>` element that React inserts on the client **is not executed**: the bootstrap is present in the live DOM (`bootstrapScriptInDom=true`) while `dataLayer` has no default (10/10 loads × 5 targets × 3 engines) | VERIFIED FACT (behaviour); *why Next 16.2.12 caches the error shell rather than the not-found boundary* is a **WORKING HYPOTHESIS** (ISR/prerender path for segment `notFound()`) needing framework research |
| Production | `https://mappedskills.com/blog/e6-audit-no-such-post` → 404, `<html id="__next_error__">`, no bootstrap in `<head>`. The global 404 is correct. Production layout chunk contains `GTM-K8ZQ…` | **VERIFIED FACT** (read-only `curl`, `evidence/production-readonly-check.txt`) |
| OBS-6 metadata timing | Live-DOM title over 10 loads per target, in 3 engines: `/blog`, `/portfolio`, `/research`, `/press` → "Page Not Found \| MappedSkills", canonical `/404`, **10/10**. The "… Not Found" variant from B1 run 1 did **not** reproduce. **`/launch-checklist` deterministically shows the root-layout fallback title** ("MappedSkills \| Judge Us on the Enquiries, Not the Traffic") **and no canonical** in the live DOM. Served HTML says "Page Not Found". Robots metas are duplicated (`noindex` + `noindex, nofollow`); the same duplication exists on the global 404 | VERIFIED FACT |
| Independent SEO risk | **Low.** Every variant returns **HTTP 404** and carries `noindex`, so these URLs cannot be indexed whichever title wins. Residual items: (a) non-JS clients receive an empty 404 body (UX, not ranking); (b) the canonical points at `/404`, itself a 404 (pre-existing, harmless under 404 status); (c) these error shells are publicly cacheable. Whether anything upstream of Passenger caches them is **UNKNOWN** | Assessment: WORKING HYPOTHESIS (low); facts as stated |

---

## 6. GTM access requirements

**The repository contains no authoritative GTM export** (no container JSON; the ID is not committed). The only container evidence consists of session records: `20_PHASE_H2A_CONSENT_AND_GTM.md` §§12–27, `23_PHASE_H2_ANALYTICS_ACTIVATION_ACCEPTANCE.md` §§6–8, and `DEC-020`/`DEC-021`. The last behavioural check, on 2026-09-18 (`DECISION_LOG.md`, release record), showed Google-only delivery after consent. **Container-level verification is BLOCKED BY ACCESS.**

Required, provided by the owner (this worker did not attempt to obtain credentials):

| Need | Minimum access | Used to verify |
|---|---|---|
| **Container export** of the **published** version (Admin → Export Container → *published* version, JSON) | Read access in container `GTM-K8ZQ…` (account **MS**), or the owner exports it | Tags (type, paused, firing/blocking triggers), triggers (type and conditions, including CSS-selector, Click ID/Classes/Text and Element Visibility), variables (DLVs, auto-event variables), built-in consent settings per tag, Conversion Linker state, any Custom HTML tags, the version number and publish date |
| **Version history** since Version 4 | Same | Whether anything changed after 2026-09-06 / 2026-09-18 |
| **GTM Preview / Tag Assistant** against a local release candidate | Owner signs in (Read is enough to Preview); the RC is built with the real ID **locally**, never deployed | Which tags fire per event; Consent tab state on (a) an ordinary page, (b) a route-level 404 with stored grant; whether any `gtm.linkClick`/form trigger fires on chrome clicks |
| **GA4** (*Mapped Skills - GA4*) | Viewer | Google signals, Google Ads links, key events (`lead_form_submitted` starred?), data redaction, localhost filter |
| **Google Ads** (only if linked) | Read | Whether any Ads conversion imports GA4 events or uses GTM tags |

---

## 7. Risk and remediation matrix

### 7.1 Application-level findings

| ID | Affected | Evidence | Severity | Status | Remediation (needs authorisation; consent is LOCKED) | Access | Acceptance test | Release impact |
|---|---|---|---|---|---|---|---|---|
| **E6-A1** | Returning accepted visitors whose session starts on any route-level 404 (5 templates); the rest of that SPA session, **including `/contact` conversions** | `e6-probe-*.json` T3; `evidence/production-readonly-check.txt` | **High** (consent-contract breach: ads not denied; affects conversion hits) | **CONFIRMED locally in 3 engines; production preconditions CONFIRMED; production behaviour not executed** (inferred, high confidence) | Owner decision. Options: **(R1)** defensive: before the loader injects the container, guarantee that a `consent default` exists in `dataLayer` and replay the stored decision (ConsentProvider/`gtm.tsx`, a small change to LOCKED consent code); **(R2)** root cause: make segment `notFound()` serve the full layout document (framework/route change, research first). R1 is the minimal fix; R2 also fixes E6-A2/A3 | None for the code. Preview to confirm the effect on tags | `e6-probe.cjs` T3: on all 5 route-level 404s, the stub's snapshot at load starts with `consent default` (all denied), then `update` (analytics granted, ads denied); after navigating to `/contact` the counts are 1/1. T1–T2 unchanged; `analytics-forms --compare` 0 diffs; Preview Consent tab shows ads denied on a route-level 404 | **Pre-existing and live on production.** Blocks staging (with E6). Owner to decide whether it becomes a production item (cf. LIVE class) |
| **E6-A2** | Same templates: undecided visitor who **accepts** on a route-level 404 | T2 `accept@dyn404` | Medium-low (ads explicitly denied by the update; analytics granted as chosen; no default) | CONFIRMED | Fixed by R1 or R2 | — | T2: default precedes update on the 404 | Staging (E6) |
| **E6-A3** (= OBS-1 extended) | Same 5 templates: served HTML is the `__next_error__` shell; bootstrap, JSON-LD, CSS and body absent from served HTML | T8; `served-head` B1 | Low (SEO: 404 + noindex) | CONFIRMED (branch and production) | R2, or owner acceptance | — | `inventory.cjs` `consentBootstrap.present=true` on all targets; `served-head.cjs` shows layout head | Staging (OBS-1 gate) |
| **E6-A4** (= OBS-6) | `/launch-checklist` live DOM: root fallback title, no canonical; other route-level 404s stable in this run | T8 (10 loads × 3 engines) | Low | CONFIRMED for `/launch-checklist`; timing variance on others **not reproduced** (0/150) | SEO note; resolved by R2 | — | Live-DOM title equals served title on all 5 | SEO note for staging |
| E6-A5 | `meeting_started` fires once per click; repeated clicks count twice | T6 | Info | CONFIRMED (designed) | None. Record so that no report treats it as unique bookings | — | — | None |
| E6-A6 | `23_PHASE_H2…` §4/§18.6 says `MetaPixel` is not consent-gated; the code is gated | `lib/meta-pixel.tsx:22-30` | Info (documentation) | CONFIRMED | Annotate that record when next touched | — | — | None |

### 7.2 GTM-container findings (all BLOCKED BY ACCESS)

| ID | Affected | Evidence | Severity | Status | Remediation | Access | Acceptance test | Release impact |
|---|---|---|---|---|---|---|---|---|
| **E6-G1** | All tracking | No export in repo; last record 2026-09-06 / 09-18 | High until checked | **UNKNOWN (current container)** | Export the published version; diff against `DEC-021` (6 active / 39 paused / 20 triggers / 32 variables) | Container read | The export matches `DEC-021`, or every difference is explained | **Blocks staging** (E6) |
| **E6-G2** | Any trigger keyed on legacy chrome DOM (§3.2) | §3.1 DOM diff | Medium if any active tag depends on it; nil if all such tags are paused | Possible but unverified | For each active click/visibility trigger, re-key on `href`/Page Path or an approved dataLayer event; leave paused tags paused | Container read; edit only on approval | Preview on the B1 RC: every intended tag fires once per intended click, and no legacy click tag fires | Blocks staging |
| **E6-G3** | Effect of E6-A1 inside the container: Consent tab, GA4 behaviour with unset ads consent, Google signals / `ccm/collect`, `_gcl_*` | §4 | High (compliance) | RESEARCH REQUIRED | Preview a route-level 404 with stored grant: before (expected: unset) and after R1 (expected: ads denied) | Preview + GA4 viewer | Preview Consent tab: `ad_storage` denied at every event on a route-level 404 | Blocks staging |
| E6-G4 | `gtm.linkClick` auto-event listener / Just Links trigger(s) | §2.2 | Low | UNKNOWN | Identify the consuming tags; if none are active, record it | Container read | Export shows which tags use link-click triggers | Informational |
| E6-G5 | Native Form Submission or Element Visibility triggers on `/contact` / `/thank-you` | `DEC-021` (legacy tag paused) | Medium if active (double or false conversions) | Recorded paused; unverified now | Keep `lead_form_submitted` as the only conversion source | Container read | Preview: one `lead_form_submitted` tag hit per persisted enquiry, 0 on direct `/thank-you` | Blocks staging |
| E6-G6 | Google Ads conversion tracking / Conversion Linker | `DEC-021`: Conversion Linker paused; no Ads conversion tag active | Low | Recorded; unverified now | Confirm still paused or absent | Container + Ads read | Export or Preview: no Ads conversion tag, no `_gcl_*` | Staging |
| E6-G7 | Custom HTML tags | None recorded as active | Low | Unverified | Confirm none active, or review each one | Container read | Export | Staging |
| E6-G8 | Provider hygiene left open in `23_…` §18 (key event flag, email redaction, localhost filter, stale stream) | Record | Low | UNKNOWN | Owner check | GA4 | GA4 admin screenshots | Not blocking |

---

## 8. Safe validation results (tests performed)

All run against local builds. Results are identical in **Chromium, WebKit and Firefox** (`evidence/e6-probe-summary.txt`).

| # | Test | Result |
|---|---|---|
| 1 | Default denied first, undecided, 28 first loads (22 ordinary + 5 route-level 404 + global 404) | **23/23 pass**; **5/5 route-level 404s: no default** (E6-A1/A3) |
| 2 | No third-party request while undecided (all 28 loads) | **0 attempted** |
| 3 | Accept from banner (`/`) | Correct order; container loaded once; ads denied |
| 4 | Reject from banner (`/`) | Update denied; 0 container requests incl. 3 later navigations |
| 5 | Returning granted / denied on `/`, `/contact`, `/blog`, global 404 | Correct |
| 6 | Returning granted / denied on 5 route-level 404s, then client navigation to `/contact` | Granted: **container loads with 0 consent commands, still 0 on `/contact`**. Denied: no container |
| 7 | Withdrawal via footer "Analytics preferences" | Pass |
| 8 | Desktop navigation, header + footer (32 steps), same-page, back, forward | 1 `page_view` per real navigation, correct `page_type`; 0 on same page |
| 9 | Mobile navigation via `#dc-mnav` (14 links, 390px) | 1 `page_view` each; menu closes; `#mobile-menu` absent |
| 10 | BookingLink (2 clicks) and chrome "Book a call" (header, footer) | 2 × `meeting_started` with correct payload; chrome → `page_view` only; Calendly blocked |
| 11 | ContactForm: 2xx, triple-click slow 2xx, network-fail-then-retry, 400, 429, 500, back/forward/reload, direct `/thank-you` + reload | `lead_form_submitted` exactly 1 on success paths (1 request; retry reuses 1 key); 0 on every failure or revisit; no PII |
| 12 | B0 `analytics-forms.cjs` re-run vs B1 baseline | **0 differing sections** |
| 13 | Served HTML vs live DOM, route-level 404s, 10 loads each | §5 |
| 14 | Chrome DOM, legacy vs Direction C (1440, 390 menu open) | §3.1 |
| 15 | Production read-only `curl` (2 URLs + layout chunk) | §5 |

**Limitations:** no real devices, Safari or Firefox releases (E1). No real container; the stub records only what the container would *see*, not what its tags do. `/api/enquiry` was mocked, so server persistence is not re-proved (it was proved in `23_…` §10). The reload step of test 11 inspects only the reloaded document; the back and forward step was counted before the reload.

---

## 9. Outstanding verification

1. Published container export and version history (E6-G1). **Owner.**
2. GTM Preview on a local B1 release candidate with the real ID, consent accepted. Cover every chrome click path (desktop, mobile menu, footer), `/contact` success, `/schedule-call`, and a **route-level 404 with stored grant** (E6-G2/G3/G5). **Owner signs in.**
3. GA4 and Google Ads settings affecting unset-consent behaviour (Google signals, Ads links) (E6-G3/G6).
4. An owner decision on E6-A1 (production exposure) and on remediation route R1/R2. Then retest with `e6-probe.cjs` and the B1 harness.
5. Framework research: why Next 16.2.12 caches segment `notFound()` as `__next_error__` (supports R2).
6. Real-traffic exposure of route-level 404s (Search Console / server logs) to size E6-A1: **UNKNOWN**.

---

## 10. Recommended E6 remediation sequence

1. **Owner:** decide whether E6-A1 is handled as a production issue now (like the LIVE class) or held for staging. It is pre-existing and does not depend on the revamp.
2. **Owner:** export the published container and grant Preview (items 1–2 above). Map every active trigger against §3.2. Expected outcome per `DEC-021`: no DOM-dependent active tag.
3. **Authorise R1** (minimal, LOCKED consent code): guarantee default plus replay before the container loads, on every document. Re-run `e6-probe.cjs` (T1–T7), `analytics-forms.cjs --compare` and `inventory.cjs`. Run Preview to confirm ads are denied on a route-level 404.
4. **Research, then decide R2** (serve the layout document for segment `notFound()`). It also closes E6-A3/A4 (OBS-1/OBS-6) and restores JSON-LD/CSS/`lang` in served HTML. Run served-head and inventory acceptance.
5. If the export shows any **active** DOM-keyed trigger: re-key it to `href`/Page Path or an approved `dataLayer` event (**container change: owner approval**). Do not add `data-*` hooks or new events without a taxonomy decision.
6. Close E6 only with: export diff + Preview evidence + probe/harness pass + a DEC entry. **Do not close E6, OBS-1 or OBS-6 on this audit.**

---

## 11. Final recommendation

**A. E6 status: PARTIALLY VERIFIED.** The application layer is verified in 3 engines. The container layer is **BLOCKED BY ACCESS**.

**B. Confirmed tracking behaviour:**
- Consent ordering and gating are correct on 22 ordinary routes and the global 404.
- Accept, reject, returning and withdraw behave as designed.
- `page_view`: exactly one per navigation across every header, footer and mobile-menu link.
- `meeting_started` (one per booking click); chrome "Book a call" produces `page_view` only.
- `lead_form_submitted` exactly once, only on 2xx, with duplicates suppressed and no PII.
- Parity with B1: 0 diffs.
- No third-party request before consent.

**C. Unverified GTM dependencies:**
- the current published container (any change since Version 4);
- any Click ID/Classes/Text or CSS-selector trigger on legacy chrome (`#mobile-menu`, `#services-menu`, Tailwind classes, legacy link text, icon-only social links, the removed `mailto` icon);
- the `gtm.linkClick` consumers;
- Form Submission and Element Visibility triggers;
- consent settings per tag;
- Conversion Linker, Ads, Custom HTML.

**D. Consent and dynamic-route risks:**
- **E6-A1 (High):** container loads with no consent state for returning accepted visitors on route-level 404s, persisting into `/contact`. Its preconditions are present on production.
- **E6-A2:** accept on such a page leaves no default.
- **E6-A3/OBS-1:** error-shell document.
- **E6-A4/OBS-6:** `/launch-checklist` title and canonical drift. SEO risk is low (404 + noindex).

**E. Tests performed:** §8 (15 test groups × 3 engines, plus a harness parity run and a read-only production check).

**F. Access needed:** §6. Published container export plus version history, a GTM Preview session (owner-authenticated), GA4 viewer, and Google Ads read if linked.

**G. Recommended remediation:** §10. Owner decision on E6-A1 → container export and Preview → R1 (minimal consent replay) → research and decide R2 → re-key any active DOM trigger → close E6 with a DEC.

**H. Can B2 local development proceed independently?** **Yes, with conditions.**
- E6-A1 is pre-existing, lives in the root layout and consent code, and B2 does not touch it. No unresolved E6 item depends on B2 page bodies.
- **Conditions:**
  - B2 must not change analytics, consent, `BookingLink`, `ContactForm`, URLs or link text used by CTAs without approval;
  - run `analytics-forms --compare` plus `e6-probe.cjs` T5/T6 as part of B2 acceptance;
  - record any body-level link-text or ID changes in the B2 report, so they can be checked against the container export;
  - E6 stays a **pre-staging** requirement (`DEC-036`).

**I. Exact owner decisions required:**
1. Is **E6-A1** treated as a **production issue now** (separately authorised fix, independent of `ui-revamp`; `PROC-1` governs how it could ship), or held to the staging gate?
2. Authorise **R1** (a consent-replay change in LOCKED consent code), and/or commission **R2** research.
3. Provide the **published container export plus version history**, and schedule an owner-authenticated **GTM Preview** session on a local release candidate.
4. Confirm whether the legacy social-click tags (paused in Version 4) are to stay paused. If any will be re-enabled, approve re-keying them to `href`.
5. Accept, or require a fix for, **E6-A4** (`/launch-checklist` live title and canonical) as an SEO note.
6. Authorise B2 local development under the §11 H conditions (separate instruction; not started here).
