# Session 33 — Phase H2A — Consent Mode v2 and Consent-Gated GTM Delivery

**Session:** 33 · **Date:** 2026-09-06 · **Branch:** `test_branch`
**Starting HEAD:** `c816633` — *feat: add conversion measurement foundation*
**Scope:** wire the existing GTM container into the application behind a consent gate, and
implement Google Consent Mode v2. Continuation of `19_PHASE_H2_ANALYTICS_CONVERSION.md`.

**Result: H2 REMAINS BLOCKED.**
The application side is implemented and verified. **A new blocker was found during live validation:
the published `GTM-K8ZQPMXP` container fires advertising tags — a Meta Pixel and an X/Twitter ads
tag — that this phase's binding consent decision does not permit.** See §12. **The container must
not be enabled in production until the owner resolves that.**

> ### ⚠ SESSION 34 UPDATE — SEE §18–§21
> A second real-container validation run was performed on 2026-09-06 **after** the owner's GTM
> workspace cleanup and the GA4 Enhanced Measurement change. **The blocker is NOT resolved, and the
> reason is important: a browser loads the PUBLISHED container, never the workspace.** The owner's
> pauses and the five new H2 tags are unpublished and therefore had **no effect on what was
> measured**. Worse, the Meta Pixel that fires is served by a **community GTM template**
> (`a=tmSimo-GTM-WebTemplate`), so it is **not one of the 15 `FB - …` tags that were paused** — it
> is a further tag the audit had not identified. **Meta fired a PageView on every one of eight route
> changes and re-created `_fbp`.** Full evidence in §19. The three dormant `window.gtag` call sites
> were removed in Session 34 — §21.

---

## 0. The finding, stated first

**Analytics delivery is now a refusal-respecting gate, not a consent banner painted over an
always-on container.** Consent Mode v2 defaults — `analytics_storage`, `ad_storage`,
`ad_user_data`, `ad_personalization`, **all DENIED** — are the first entry in `dataLayer` on every
page load, established by a synchronous inline script in the document head before React exists.
**And the container script itself is not requested at all unless the visitor has explicitly accepted
analytics.** Undecided and declined behave identically: no request to `googletagmanager.com`, no
cookie, no ping.

**Then the real container was loaded once, deliberately, against a local build — and it turned out
to contain advertising tags nobody in this programme has approved.** `GTM-K8ZQPMXP` loaded
`connect.facebook.net/en_US/fbevents.js` (pixel `983625902710561`) and
`static.ads-twitter.com/uwt.js`, and set a `_fbp` cookie, **while `ad_storage` was denied** — because
neither vendor's tag honours Google Consent Mode unless the container is configured to check it.
The binding decision for this phase is *"Advertising consent remains denied"* and *"We are not
enabling Meta Pixel in this phase."* **Publishing the container as it stands would violate both.**

---

## 1. Starting state — VERIFIED FACT

| Item | Observed |
|---|---|
| Branch | `test_branch` |
| HEAD at session start | `c816633` — **matches the expected value in the brief** |
| Working tree at start | `README.md` untracked · `mappedskills-cpanel-20260906-101820.zip` untracked · nothing else |
| `README.md` | **Untouched, unstaged, uncommitted — and still so at session end** |
| Local database | **None.** No `mysqld`/`mariadbd`, no Docker, no `.env.local`. See §10 for what this does and does not allow |

---

## 2. Audit of the existing H2 implementation — performed before any edit

**The architecture in the repository MATCHES the brief's description.** No discrepancy was found
that required stopping. Four things were found that the brief did not state, and all four are
recorded below rather than assumed away.

### 2.1 What was already there

| Surface | File | State found |
|---|---|---|
| Event boundary | `lib/analytics.ts` | `track()` / `trackOnce()`, pushes to `window.dataLayer` only. Hard parameter sanitiser. Swallows all errors |
| Container loader | `lib/gtm.tsx` | **ALREADY EXISTED**, already env-gated on `NEXT_PUBLIC_GTM_ID`, `afterInteractive`, plus a `<noscript>` iframe |
| Pageview authority | `components/analytics/AnalyticsRouteListener.tsx` | `usePathname()` + a last-reported ref. Deliberately avoids `useSearchParams()` |
| Attribution | `lib/attribution.ts` | `sessionStorage`, `attributionForAnalytics()` exposes 7 fields |
| Form events | `components/forms/ContactForm.tsx` | `lead_form_started`, `lead_form_validation_error`, `lead_form_submitted` |
| Booking | `components/analytics/BookingLink.tsx` | `meeting_started`, diagnostic only |
| Consent | **nothing anywhere** | No storage, no banner, no `gtag` consent command, no CMP |
| CSP | `next.config.mjs` | **No `Content-Security-Policy` header exists.** Five security headers, none affecting GTM. No CSP change was needed or made |

### 2.2 Four findings the brief did not state

1. **A GTM loader already existed and already used `NEXT_PUBLIC_GTM_ID`.** The brief said *"do not
   hard-code the container ID if the current H2 design already expects an env var"* — it does, so
   the variable was reused and the loader was modified rather than replaced.
2. **It rendered a `<noscript>` GTM iframe.** That fires for every visitor with JavaScript
   disabled — visitors who cannot be shown a banner, cannot answer and cannot have an answer read
   back. **It was removed.** There is no honest way to gate it. See §6.4.
3. **`NEXT_PUBLIC_GA4_ID` is declared in `.env.example` and read by nothing.** Left that way, and
   `.env.example` now says why: GA4 arrives through the container, and a second direct `gtag.js`
   loader would double-count and bypass the consent gate.
4. **`lib/meta-pixel.tsx` is still mounted in the root layout and has no consent gate.** Untouched,
   per the brief's *"Do not implement Meta consent or Meta Pixel"*. `.env.example` and
   `app/layout.tsx` now carry an explicit warning that `NEXT_PUBLIC_META_PIXEL_ID` must remain empty.

---

## 3. The consent architecture

```
document <head>            inline <script>  — synchronous, first element in the head
                           ├─ dataLayer = dataLayer || []
                           ├─ gtag('consent','default', ALL FOUR DENIED)     ← unconditional
                           └─ if localStorage['ms.consent.v1'] === 'granted'
                                 gtag('consent','update', {analytics_storage:'granted'})
                                                                    ↓
React tree                 <ConsentProvider>          — reads the same key after mount
                             <ConsentBanner/>         — shown only when the value is 'unset'
                             <GoogleTagManager/>      — renders the container script ONLY when 'granted'
                             …app…
                             <Footer> → <ConsentPreferencesLink/>  — reopens the banner
```

**Application → `dataLayer` → GTM → GA4 is preserved unchanged.** No `gtag.js` is loaded by
application code, no `window.gtag` global is defined by this application, no vendor SDK is called
below the `lib/analytics.ts` boundary, and no event name was added, renamed or removed.

### 3.1 Why the defaults are a raw inline `<script>` and not `next/script`

Ordering is the entire guarantee, and it must be a property of the **document**, not of a framework
strategy. A synchronous inline script in `<head>` executes before the body parses, before React
hydrates and before any `afterInteractive` script is inserted. **Verified in the served HTML:** the
bootstrap sits at byte offset 2,377, `</head>` at 4,269, `<body>` at 4,276, and it precedes both
JSON-LD blocks. It is therefore structurally impossible for a Google tag to observe a granted state
the visitor did not give.

### 3.2 Why a real `arguments` object

A consent command is not an event. Google's tag recognises consent commands by the `arguments`
object shape produced by `function gtag(){dataLayer.push(arguments)}`. Pushing
`['consent','update',…]` or `{event:'consent_update'}` **fails silently** — the site looks
consent-aware and the tag keeps its previous state. Both call sites (the inline bootstrap and
`pushConsentUpdate`) push a real `arguments` object. **Verified live:** every consent entry read back
from `dataLayer` reports `[object Arguments]`.

### 3.3 `window.gtag` is deliberately not defined by this application

Three components still carry pre-H2 `typeof window.gtag === 'function'` guards emitting names that
are **not** in the approved taxonomy — `SocialShare.tsx` (`share_click`), `CategoryFilter.tsx`
(`blog_filter_click`), `CalendlyButton.tsx` (`schedule_call_click`). Publishing a shim under that
global would activate all three. The shim is a closure-local function.

**Measured with the real container loaded:** `typeof window.gtag` was still `"undefined"` after
GTM's own GA4 tag had loaded `gtag/js?id=G-6H7WFH2BHQ`. **The three call sites therefore remained
inert.** This is a VERIFIED FACT about the container as published today, not a guarantee — a
container configured to expose the Google tag global would activate them. Recorded as owner action
7 in §14.

---

## 4. Consent storage — mechanism, key, values

| Property | Value |
|---|---|
| Mechanism | **`localStorage`**, first-party, origin-scoped |
| Key | **`ms.consent.v1`** |
| Values | **`granted`** · **`denied`** — bare strings, nothing else |
| Absent / unreadable / unrecognised | Treated as **`unset`** — nothing is granted, nothing is loaded, the banner is shown |
| PII stored | **None.** No timestamp, no id, no fingerprint. The value cannot identify anybody |
| Server involvement | **None.** No database write, no cookie, no request |

**Why `localStorage` and not a cookie.** A cookie is sent on every request and invites a server-side
read; reading it in the root layout means calling `cookies()`, which opts **every route in this
application** out of static rendering. `AnalyticsRouteListener` already refuses `useSearchParams()`
for that exact reason. **Verified: all 25 routes are still `○ (Static)` / `● (SSG)` after this
session** — the route table is unchanged.

**Why a bare string and not JSON.** The key is read by the most ordering-sensitive script on the
page. A bare value has no parse step and therefore no parse-failure branch.

**Why the version is in the key.** If the set of signals ever changes, the new question ships under
`ms.consent.v2` and every visitor is asked again, rather than a stale answer being reinterpreted as
an answer to a question never put to them.

---

## 5. Consent states and transitions

| Situation | `analytics_storage` | `ad_storage` / `ad_user_data` / `ad_personalization` | Container |
|---|---|---|---|
| Before any decision | **denied** | **denied** | **not requested** |
| Visitor accepts | **granted** | **denied** | requested |
| Visitor rejects | **denied** | **denied** | **not requested** |
| Returning, accepted | **granted** (replayed in `<head>`) | **denied** | requested |
| Returning, rejected | **denied** | **denied** | **not requested** |
| Storage unreadable | **denied** | **denied** | **not requested** — asked again |
| Accepted, then withdraws | **denied** immediately | **denied** | not requested on later loads; already-executed script cannot be unloaded |

**There is no code path in this repository that can grant an advertising signal.** All three are
written as the literal string `'denied'` at every site, never derived from a variable. Enabling
advertising consent requires a code edit and a review.

**Advertising is restated as denied on every `consent update`**, not just at default, so no ordering
of commands and no future update site can leave an advertising signal granted by omission.

### 5.1 Basic consent mode, and the one artefact it produces

The container is gated, not merely restrained (Google's "basic" implementation rather than
"advanced"). A refusal is a refusal: nothing is fetched and nothing is transmitted.

**The accepted trade-off, recorded rather than hidden.** `lib/analytics.ts` queues events into
`dataLayer` whether or not a container exists, and GTM reads the queue from the beginning when it
loads. A visitor who navigates several pages **before** deciding and then accepts will have those
queued `page_view`s processed at the moment of acceptance — real pages, but stamped with the
acceptance time. **The upside is why it was kept:** the landing page and its attribution survive
acceptance instead of being lost. The effect is bounded to sessions where the visitor navigates
before answering. **It was not worked around with a queue-clearing hack.**

---

## 6. The consent interface

`components/analytics/ConsentBanner.tsx`.

| Requirement | How it is met | Verified |
|---|---|---|
| Two choices | `Accept analytics` · `Reject analytics` | ✔ |
| No dark pattern | Two-column **grid**, so both buttons occupy the same track. Identical element, classes, border, weight, colour and text size | ✔ **measured identical to the pixel at every width** |
| No hidden accept | No close button, no timed auto-accept, no accept-on-scroll, nothing pre-ticked | ✔ |
| Keyboard operable | Native `<button type="button">`, `tabIndex 0`, reached in **3 tabs** from page top | ✔ real `Tab` keypresses |
| Visible focus | Site's global 3px ink outline — measured `rgb(20,18,25) solid 3px` on the focused button | ✔ |
| Semantic controls | `role="region"` + `aria-labelledby` on a real `<h2>` named *Analytics cookies* | ✔ |
| Readable at 320px+ | No horizontal overflow at any tested width | ✔ **10 widths** |
| Usable at zoom | 320px CSS reflow (WCAG 1.4.10, = 400% at 1280px) passes | ✔ |
| Screen-reader appropriate | Named landmark, real heading, real buttons, no `aria-hidden` | ✔ |
| No focus trap | Not a dialog, no `aria-modal`, no backdrop, nothing made inert, focus never moved | ✔ |
| Not a giant modal | 14%–32% of viewport height | ✔ |
| Reduced motion | **No animation and no transition of its own** — only the global link-colour transition, which the site's reduced-motion floor collapses | ✔ measured |
| Contrast | `#141219` on `#FFFDF9` ≈ 16.5:1 | ✔ |

### 6.1 Two deliberate deviations, both recorded

1. **`position: fixed` is the one exception to THE RESOLVE's "no fixed/sticky" rule.** That rule
   governs page composition — no part of the page's own argument may pin itself. This is not part of
   the argument: it is a one-time question that must be visible without hunting, it carries no
   content, and it removes itself permanently once either button is pressed.
2. **It is a `div role="region"`, not a `<section>`.** `app/globals.css` carries a legacy base rule
   `section { @apply py-16 }`. A `<section>` inherited 128px of padding and measured **414px tall at
   320px — 52% of the viewport.** With the `div` it is **254px (32%)**. Identical to assistive
   technology, and immune to a rule that would otherwise silently re-break it.

### 6.2 Placement

First in the DOM, immediately after the skip link, so keyboard and screen-reader visitors reach the
question in three tabs rather than after the entire header — and painted at the bottom of the
viewport so it does not displace the first screen. **Measured tab order:** skip link → *Privacy
Policy* → *Accept analytics* → *Reject analytics* → header.

### 6.3 Withdrawal

*Analytics preferences* in the footer's legal row reopens the same banner from any page, so a
refusal can become an acceptance and an acceptance can be withdrawn. **It renders nothing until the
stored value has been read**, which means it is absent from the server HTML and absent entirely
without JavaScript — a control that could do nothing there would be a lie in the footer. Verified:
`Analytics preferences` appears **0 times** in the served HTML of `/`, `/contact` and `/thank-you`.

### 6.4 No-JS behaviour

| Surface | Without JavaScript |
|---|---|
| Consent banner | Not rendered — absent from the server HTML |
| GTM container script | Not rendered |
| GTM `<noscript>` iframe | **REMOVED THIS SESSION.** Previously loaded unconditionally |
| Consent bootstrap | Present in `<head>` but inert (it is a script) |
| Preferences control | Not rendered |
| Contact form | Unchanged from H1 |

**Verified by inspecting the served HTML:** `googletagmanager` **0 occurrences**, `ns.html` **0**,
banner text **0** on `/`, `/contact` and `/thank-you`. **Without JavaScript this site now contacts
no analytics provider at all** — an improvement on the state before this session, and the honest
behaviour when consent cannot be asked for.

---

## 7. Event inventory found in code — exact, unchanged

**No event was added, renamed or removed. Five events, all pre-existing.**

| Event | Authority | Conversion? | Emitted from |
|---|---|---|---|
| `page_view` | client | **No** | `AnalyticsRouteListener.tsx` |
| `lead_form_started` | client | **No** | `ContactForm.tsx` — first non-honeypot interaction, once |
| `lead_form_validation_error` | client + server codes | **No** | `ContactForm.tsx` — 4 call sites |
| `lead_form_submitted` | **server-confirmed persistence** | **YES — the only one** | `ContactForm.tsx` — one call site, after 2xx |
| `meeting_started` | client | **No — diagnostic** | `BookingLink.tsx` |

`meeting_booked` is **not implemented** and was not added. No qualified-lead automation was added.

### 7.1 Exact payload fields, captured live from `dataLayer`

Every event also carries `event` and `environment` (`production` | `development`).

| Event | Fields observed |
|---|---|
| `page_view` | `page_path`, `page_type` |
| `lead_form_started` | `page_path`, `page_type`, `form_id` |
| `lead_form_validation_error` (field) | `page_path`, `page_type`, `form_id`, `field_name`, `error_type`, `error_scope` |
| `lead_form_validation_error` (form) | `page_path`, `page_type`, `form_id`, `error_type`, `error_scope`, `failure_reason` |
| `lead_form_submitted` | `page_path`, `page_type`, `form_id`, `conversion_surface`, `qualification_status`, `attribution_status`, `first_source`, `first_medium`, `first_campaign`, `latest_source`, `latest_medium`, `latest_campaign` |
| `meeting_started` | `page_path`, `page_type`, `cta_location`, `cta_role`, `conversion_surface` |

**`qualification_status: 'not_evaluated'` is CONFIRMED as the actual code payload** — captured
verbatim from a live conversion. The campaign fields are **absent** when null (the sanitiser drops
nulls), which is why a direct visit's conversion showed `first_source: 'direct'`,
`first_medium: 'none'` and **no** `first_campaign`.

---

## 8. GA4 parameter mapping — recommendation

**Derived from the payloads above. Nothing here is invented.** GA4 custom dimensions are capped
(50 event-scoped), and a parameter that is not registered as a dimension is not reportable — so
sending everything is a cost with no return.

| dataLayer field | Send to GA4? | Why |
|---|---|---|
| `page_path` | **Yes** | The app-owned page identity. Path-only, no query string |
| `page_type` | **Yes** | The one categorisation the reporting model is built on |
| `environment` | **Yes — as a filter, not a report dimension** | Lets a container or GA4 filter exclude non-production traffic with one condition. **Register it before publishing**, or this session's own localhost hits cannot be excluded (§10.4) |
| `form_id` | **Yes** | One form today; needed the moment there is a second |
| `conversion_surface` | **Yes** | Separates `form` from `booking` |
| `qualification_status` | **Yes, on `lead_form_submitted` only** | Its whole purpose is to make a report that counts these as *qualified* enquiries fail loudly. Dropping it defeats that |
| `attribution_status` | **Yes** | Distinguishes *unattributed* from *not measured*. Without it, `direct` is ambiguous |
| `first_source` / `first_medium` / `first_campaign` | **Yes** | First-touch, which GA4 does not model this way itself |
| `latest_source` / `latest_medium` / `latest_campaign` | **No — not initially** | GA4 already models last-touch. Six dimensions is a real budget; add these only if GA4's own attribution proves insufficient |
| `field_name` | **Yes, on `lead_form_validation_error` only** | The point of the event. Field **name** only — never a value |
| `error_type` / `error_scope` / `failure_reason` | **Yes** | Closed sets, no free text |
| **Anything not listed** | **No** | There is nothing else. No id, no token, no user field |

**Do not rename any event to a GA4 recommended name.** `lead_form_submitted` stays.
`generate_lead` must not replace it.

---

## 9. Page-view authority — measured

The GTM Google configuration tag has been manually set to `send_page_view = false` (unpublished).
The application's `page_view` is the route-change authority.

| Action | `page_view` events emitted | Paths, in order |
|---|---|---|
| Initial load of `/` | **1** | `/` |
| App Router navigation to `/contact` | **1** | `/`, `/contact` |
| Browser **back** | **1** | `/`, `/contact`, `/` |
| Browser **forward** | **1** | `/`, `/contact`, `/`, `/contact` |
| Reload on `/thank-you` | **1** | `/thank-you` |

**Exactly one per navigation. No duplicates, no misses.**

### 9.1 Duplicate risk that this repository cannot close — OWNER ACTION

**GA4 Enhanced Measurement includes "Page changes based on browser history events".** With it on,
GA4 emits its own `page_view` on every App Router route change **in addition** to the app's — every
navigation counted twice, and the two disagree because GA4's would carry the full URL including the
query string this application deliberately strips.

**The exact owner-side setting to turn off:**
`GA4 Admin → Data Streams → [the web stream for G-6H7WFH2BHQ] → Enhanced measurement → gear icon →`
**uncheck "Page changes based on browser history events"**. Leave the other Enhanced Measurement
options as the owner wishes; only this one collides.

**This was not worked around in client code.** No suppression hack was added.

---

## 10. Verification performed — and its exact limits

### 10.1 Conversion integrity

| Scenario | Conversions | Verified |
|---|---|---|
| Direct visit to `/thank-you` | **0** | ✔ live |
| Refresh on `/thank-you` | **0** | ✔ live |
| Back-navigation from `/thank-you` | **0** | ✔ live |
| Forward-navigation | **0** | ✔ live |
| Client validation failure (2 empty required fields) | **0** — 2 `lead_form_validation_error`, field names only | ✔ live |
| **Real database failure** (`POST /api/enquiry` → **503 `{"ok":false,"error":"unavailable"}`**) | **0** — one form-scoped error, `failure_reason: 'unavailable'` | ✔ live, real handler |
| Three submits fired in immediate succession | **1 API request, 1 conversion** | ✔ live |
| `lead_form_started` | **exactly 1** across many keystrokes | ✔ live |

### 10.2 The honest limit on the success path

**No database exists in this environment** — no `mysqld`, no `mariadbd`, no Docker, no `.env.local`.
The **failure** path was therefore exercised for real (a genuine 503 from the real route handler).
The **success** path was exercised with a stub at the `fetch` boundary returning `201`, standing in
for a server-confirmed durable write.

**What that does and does not prove.** It proves everything on the client side of the 2xx: that one
2xx produces exactly one conversion, that three rapid submits produce one request and one event,
that the payload contains no PII, and that navigation follows. **It does not re-prove that the
server returns 2xx only after MariaDB acknowledges a row** — that was verified in Session 32 against
a real database and the route handler is unchanged in this session. **It is not claimed as re-tested
here.**

### 10.3 Analytics-failure invariant — sabotage test

`window.dataLayer` was replaced with a non-configurable accessor returning an object whose `push()`
**throws**, assignment to `window.dataLayer` was made to **throw**, `window.localStorage` and
`window.sessionStorage` were made to **throw on every access**, and GTM was permanently blocked.
Then an enquiry was submitted.

| Observation | Result |
|---|---|
| Form usable, values accepted | **Yes** |
| `POST /api/enquiry` issued | **Yes — 1 request, body present** |
| Success path ran | **Yes** |
| Navigated to `/thank-you` | **Yes** |
| Uncaught window errors | **0** |

**The invariant holds: analytics is observational only and is not part of the enquiry transaction.**

The shipped consent bootstrap string was also executed verbatim with `localStorage` throwing: **it
did not throw, and still established all four signals as denied.** Accepting consent while storage
**writes** throw: no error, banner closes, `consent update` pushed, container loads — **the decision
is honoured for that page load even though it cannot be remembered.**

### 10.4 What was actually sent to the owner's Google, Meta and X accounts

**Stated plainly because it happened.** To satisfy the brief's *"validate against the real
unpublished container if technically possible"*, `NEXT_PUBLIC_GTM_ID=GTM-K8ZQPMXP` was set **as a
process environment variable on a local dev server only** — never written to any file — and consent
was accepted once on `http://localhost:3111/`. The container loaded and its tags fired.

- **One page-load's worth of hits reached GA4 `G-6H7WFH2BHQ`, the Meta pixel and the X ads tag**,
  with `hostname = localhost` and the app's own `page_view` carrying `environment: development`.
- On discovering the advertising tags, the run was **stopped immediately**: consent was withdrawn,
  every cookie and storage key on the origin was cleared, the dev server was killed, and **all
  remaining testing used an inert placeholder container id**.
- **Nothing was published, and no Google, Meta or X account configuration was read or changed.**
- The owner can exclude these hits in GA4 by `hostname = localhost`, or by `environment` once it is
  registered as a dimension (§8).

### 10.5 Responsive and accessibility sweep — 10 widths, live

| Width | Overflow-X | Banner height | % of viewport | Buttons | Equal | ≥40×40 |
|---|---|---|---|---|---|---|
| 320 | none | 254px | 32% | 138×66 | ✔ | ✔ |
| 360 | none | 209px | 26% | 158×43 | ✔ | ✔ |
| 390 | none | 209px | 25% | 173×43 | ✔ | ✔ |
| 430 | none | 209px | 22% | 193×43 | ✔ | ✔ |
| 760 | none | 186px | 21% | 351×43 | ✔ | ✔ |
| 761 | none | 186px | 21% | 351×43 | ✔ | ✔ |
| 860 | none | 127px | 14% | 158×43 | ✔ | ✔ |
| 1080 | none | 127px | 14% | 158×43 | ✔ | ✔ |
| 1081 | none | 127px | 14% | 158×43 | ✔ | ✔ |
| 1425 | none | 127px | 14% | 158×43 | ✔ | ✔ |

**The banner does not block the contact form.** At 320px with the banner open, the submit button
scrolls to `top 200 / bottom 248` while the banner starts at `546`, and `elementFromPoint` at the
button's centre returns the submit button itself — **it is the hit target, not the banner.**

**No Phase E/F/G regression:** no width gained horizontal overflow, no page-composition file was
modified, and the only change to existing chrome is one button appended to the footer's legal row.

### 10.6 Pre-existing conditions observed, not introduced

- **Hydration warning on `/`** — `data-rsv-hero="traffic"`, set by the Phase D/E pre-paint script in
  `components/homepage/HomepageHero.tsx` (commit `63a441d`). Development-only, pre-existing.
- **Build warning** — *"Next.js inferred your workspace root"*, caused by both `package-lock.json`
  and `pnpm-lock.yaml` existing. Pre-existing.
- **11 TypeScript errors** under `tsc --noEmit`, all in files this session did not touch
  (`SocialShare`, `CategoryFilter`, `CalendlyButton`, `lib/metadata.ts`). **Zero in the new files.**
  `next.config.mjs` sets `ignoreBuildErrors: true`.

---

## 11. PII re-audit — the whole `dataLayer`, adversarially

A full session was driven at
`/contact?utm_source=newsletter&utm_medium=email&utm_campaign=spring&utm_content=victim@example.com&gclid=ABC123&secret=tok_live_123`
— an email address planted in a UTM parameter, which is the realistic route by which PII reaches
analytics — and the form was completed with a full name, a real-shaped email, a company, a phone
number, a personal website and a message containing a budget figure and a phone number, then
submitted successfully.

**Every key present in the entire `dataLayer` afterwards:**
`event`, `environment`, `page_path`, `page_type`, `form_id`, `conversion_surface`,
`qualification_status`, `attribution_status`, `first_source`, `first_medium`, `first_campaign`,
`latest_source`, `latest_medium`, `latest_campaign` — plus the two consent commands.

**Automated needle search across the serialised `dataLayer`:**

| Needle | Found |
|---|---|
| name · surname · email local part · company · phone · budget figure · message text · website field | **none** |
| `victim`, `example.com`, `utm_content` | **none** — `utm_content` is not in the payload schema at all |
| `gclid`, `ABC123`, `secret`, `tok_live` | **none** |
| **`@` — any at-sign anywhere** | **none** |
| any query string | **none** |
| any database identifier | **none** — the idempotency key stays in `sessionStorage` under `ms.h2.once.*` and never enters a payload |

**Result: PASS. No new PII leak was discovered, and none was introduced.** Nothing is logged to the
console: no request body, no form values, no PII.

---

## 12. ⚠ GTM Preview result — and the new blocker

**The real, currently-published `GTM-K8ZQPMXP` was loaded once against a local build.** Tag
Assistant's own UI could not be driven from this environment, but the container's actual runtime
behaviour was observed directly, which answers the same questions.

### 12.1 Confirmed

| Question | Answer |
|---|---|
| Does the container load from this application? | **Yes** — `googletagmanager.com/gtm.js?id=GTM-K8ZQPMXP`, exactly one script tag |
| Does it read the app's queued events? | **Yes** — the queued `page_view` was assigned `gtm.uniqueEventId: 4`, i.e. GTM processed it |
| Order of the queue when GTM loaded | `consent default (all denied)` → `page_view` → `consent update (analytics granted)` → `gtm.js` → `gtm.dom` → `gtm.load` |
| Which GA4 property | **`G-6H7WFH2BHQ`** — the container loaded `gtag/js?id=G-6H7WFH2BHQ` |
| Did analytics storage follow consent? | **Yes** — `_ga` and `_ga_6H7WFH2BHQ` appeared only after acceptance |
| Double-injection guard | **Held** — one `gtm.js` tag, `__msGtmLoaded` set |
| Is `window.gtag` exposed? | **No** — still `undefined` after GA4 loaded |

### 12.2 THE BLOCKER — advertising tags fire in the published container

| Third-party script loaded | Source |
|---|---|
| `https://connect.facebook.net/en_US/fbevents.js` | **Meta Pixel `983625902710561`** |
| `https://connect.facebook.net/signals/config/983625902710561?…&domain=localhost` | Meta Pixel config |
| `https://static.ads-twitter.com/uwt.js` | **X / Twitter ads tag** |
| `https://www.googletagmanager.com/gtag/js?id=G-6H7WFH2BHQ` | GA4 |

`window.fbq` and `window._fbq` became functions and a **`_fbp` cookie was written — while
`ad_storage`, `ad_user_data` and `ad_personalization` were all denied.** Neither Meta's nor X's tag
honours Google Consent Mode unless the container is configured to check consent explicitly.

**This directly contradicts the binding decision for this phase** — *"Advertising consent remains
denied in this phase"* and *"We are not enabling Meta Pixel in this phase."* The application's own
Meta Pixel is unconfigured and inert; **the pixel is coming from inside the container.**

**Consequence: accepting *analytics* on the live site would silently start Meta and X advertising
tracking.** The consent gate protects an undecided or refusing visitor completely, and does not and
cannot protect an accepting one from tags the container chooses to fire. **This must be resolved in
GTM before the container is published or `NEXT_PUBLIC_GTM_ID` is set in production.**

### 12.3 Events not yet confirmed in Preview

`page_view` was confirmed as read by the container. **`lead_form_started`, `lead_form_submitted` and
`meeting_started` were not confirmed against the real container**, because the run was stopped as
soon as the advertising tags were found, and because the H2 tags that would receive them exist only
in the **unpublished** workspace. The owner must confirm these in Preview — §13.

---

## 13. Owner-side GTM Preview procedure

The workspace changes are unpublished, so only Preview can exercise them.

1. In GTM, open workspace `GTM-K8ZQPMXP` → **Preview**.
2. Enter the URL to connect to. **Use a build where `NEXT_PUBLIC_GTM_ID=GTM-K8ZQPMXP` is set** —
   Preview cannot attach if the container never loads. **`https://mapskills.com` currently reports
   `Google tag: GTM-K8ZQPMXP not found`, which is correct**: the deployed build has no container id.
3. **Accept analytics in the site's own banner.** Until you do, the container is not requested and
   Tag Assistant will stay unconnected. This is the intended behaviour, not a fault.
4. Confirm, in Tag Assistant's dataLayer view, in this order:
   `consent default` (all four denied) → `consent update` (`analytics_storage: granted`, three ad
   signals denied) → `gtm.js`.
5. Walk the site and check each event and the tag that should fire:

| Trigger | Expected event | Expected tag |
|---|---|---|
| Load any page, then navigate client-side | `page_view` — **once per navigation** | `GA4 - H2 - page_view` |
| Type in the first contact field | `lead_form_started` — **once** | `GA4 - H2 - lead_form_started` |
| Submit a real enquiry that persists | `lead_form_submitted` — **once** | `GA4 - H2 - lead_form_submitted` |
| Click a booking link | `meeting_started` | `GA4 - H2 - meeting_started` |
| Submit with fields empty | `lead_form_validation_error` | **no tag exists — expected; not an error** |

6. Confirm the Google configuration tag does **not** also send a page view (`send_page_view = false`).
7. Confirm the paused `GA4 - Lead Form Submit` does not fire.
8. **Confirm the Meta and X tags. Do not publish until §12.2 is resolved.**

---

## 14. Owner action list

### Legacy GTM tag audit — §15 of the brief

The published container's legacy tags, assessed against the new H2 measurement surface.

| Legacy tag | Recommendation | Why |
|---|---|---|
| `GA4 - Lead Form Submit` | **KEEP PAUSED** (already done) | Visibility-based. It could fire without a database row and would contradict the persistence-rooted conversion. Do not delete — keep the history |
| `GA4 - About Page Visit` | **PAUSE** | Duplicates `page_view` + `page_type`. A separate tag per page is the pattern H2 replaces |
| `GA4 - Blog Page Visit` | **PAUSE** | As above |
| `GA4 - Contact Page Visit` | **PAUSE** | As above, and it competes with `page_type: contact` on the funnel's most important page |
| `GA4 - Content Writing Page Visit` | **PAUSE** | As above; the route no longer exists in this application |
| `GA4 - PPC Marketing Page Visit` | **PAUSE** | As above |
| `GA4 - SEO Service Page Visit` | **PAUSE** | As above — `page_type: commercial` covers it |
| `GA4 - SMM Page Visit` | **PAUSE** | As above |
| `GA4 - FB Click` · `Insta Click` · `LinkedIn Click` · `Twitter Click` · `YouTube Click` | **LEAVE ALONE** | Outbound social clicks. No H2 event covers them, so there is no duplication and no conflict. They are outside the approved taxonomy — revisit when an outbound-click event is approved, not now |
| `GA4 - YouTube Video` | **LEAVE ALONE** | Video engagement. No overlap with H2 |
| **Meta Pixel tag(s)** — pixel `983625902710561` | **PAUSE — BLOCKING** | §12.2. Fires on analytics acceptance with advertising consent denied |
| **X / Twitter ads tag** — `uwt.js` | **PAUSE — BLOCKING** | §12.2. Same |

**Nothing is recommended for deletion. No GTM history should be removed.**

### Remaining owner actions

| # | Action | Status |
|---|---|---|
| 1 | **Resolve §12.2** — pause the Meta Pixel and X ads tags, or give every advertising tag an explicit "require `ad_storage`" consent check in GTM | **NOT DONE — BLOCKING** |
| 2 | Pause the seven legacy page-visit tags above | **NOT DONE** |
| 3 | Complete GTM Preview per §13, including `lead_form_started`, `lead_form_submitted`, `meeting_started` | **NOT DONE** |
| 4 | GA4 → Data Streams → Enhanced measurement → **uncheck "Page changes based on browser history events"** (§9.1) | **NOT DONE** |
| 5 | Register the GA4 custom dimensions in §8, including `environment` | **NOT DONE** |
| 6 | **Publish the GTM container — only after 1–5** | **NOT DONE** |
| 7 | Confirm no published container configuration exposes a `window.gtag` global (§3.3) | **NOT DONE** |
| 8 | Set `NEXT_PUBLIC_GTM_ID=GTM-K8ZQPMXP` in production (cPanel → Setup Node.js App → Environment variables). **Leave `NEXT_PUBLIC_META_PIXEL_ID` empty** | **NOT DONE** |
| 9 | Apply DB migration 002 on the production database (`npm run db:migrate`) if not already applied — **before or with the code** | **NOT DONE — UNVERIFIED** |
| 10 | Perform one real production measurement verification: a genuine enquiry, one row, one `lead_form_submitted` in GA4 | **NOT DONE** |
| 11 | Legal review of the consent banner wording and the privacy policy. `/privacy-policy` still says a consent mechanism *"should be added before launch"* — that sentence is now out of date | **NOT DONE** |
| 12 | Decide whether the three unapproved `window.gtag` call sites (§3.3) should be removed in a follow-up commit | **NOT DONE** |

**None of the above is marked complete, because none of it was verified.**

---

## 15. Files changed in this session

| File | Change |
|---|---|
| `lib/consent.ts` | **NEW** — storage key, state helpers, `pushConsentUpdate`, the inline bootstrap string |
| `components/analytics/ConsentProvider.tsx` | **NEW** — the decision as React state |
| `components/analytics/ConsentBanner.tsx` | **NEW** — the interface |
| `components/analytics/ConsentPreferencesLink.tsx` | **NEW** — footer withdrawal control |
| `lib/gtm.tsx` | Consent-gated; `<noscript>` iframe removed; double-injection guard added |
| `app/layout.tsx` | Consent bootstrap first in `<head>`; `ConsentProvider` wraps the body tree; banner after the skip link |
| `components/layout/Footer.tsx` | One button appended to the legal links row |
| `.env.example` | Documentation only. **No id or secret added — the file still contains no values** |

**Not modified:** `lib/analytics.ts`, `lib/attribution.ts`, `AnalyticsRouteListener.tsx`,
`BookingLink.tsx`, `ContactForm.tsx`, `app/api/enquiry/route.ts`, `lib/meta-pixel.tsx`,
`next.config.mjs`, any page composition file, and the untracked root `README.md`.

---

## 16. Build validation

| Build | Result |
|---|---|
| `npm run build` | **Compiled successfully.** 25 routes, all still `○ Static` / `● SSG` — **no route-mode change** |
| `npm run build:cpanel` | **Compiled successfully** (`CPANEL_BUILD=1`, single worker, 512MB heap) |
| New warnings or errors | **None.** The one warning present is the pre-existing dual-lockfile workspace-root notice |

`next-env.d.ts` and `tsconfig.tsbuildinfo` were touched by the builds and **restored** before commit.

---

## 17. Verdict

**H2 IS STILL BLOCKED. It is not a PASS.**

| Area | State |
|---|---|
| Consent Mode v2 defaults, ordering, storage, updates | **Implemented and verified** |
| Consent UI — a11y, responsive, keyboard, no dark pattern | **Implemented and verified across 10 widths** |
| Consent-gated GTM delivery | **Implemented and verified** |
| Event taxonomy preserved | **Verified — unchanged** |
| Page-view authority | **Verified — exactly one per navigation** |
| PII | **Verified clean, adversarially** |
| Analytics-failure invariant | **Verified under full sabotage** |
| No-JS behaviour | **Improved — no analytics provider is contacted at all** |
| Builds | **Both pass** |
| **Advertising tags inside the published container** | **BLOCKING — §12.2** |
| GTM Preview of the H2 tags | **Not done — owner** |
| GA4 Enhanced Measurement page-view conflict | **Not done — owner** |
| Container published | **No** |
| Production `NEXT_PUBLIC_GTM_ID` | **Not set** |
| Migration 002 in production | **Unverified** |
| One real production measurement | **Not done** |
| Booking conversion | **Still owner-blocked** — unchanged |

**Nothing was pushed. No GTM container was published. No Google, Meta or X account configuration
was read or modified.**

---
---

# Session 34 — Real-container re-validation after the owner's GTM cleanup

**Session:** 34 · **Date:** 2026-09-06 · **Branch:** `test_branch`
**Starting HEAD:** `e956d2d` — *feat: add consent-gated GTM delivery*
**Result: H2 REMAINS BLOCKED. GTM IS NOT YET SAFE TO PUBLISH.**

---

## 18. The finding that governs everything below

**A browser loads the PUBLISHED container. It never loads a workspace.**

The owner completed a substantial GTM cleanup before this session — 15 `FB - …` tags paused, 8
`Twitter - …` tags paused, `LinkedIn - Lead` paused, 7 legacy GA4 page-visit tags paused, 6 further
legacy GA4 event tags paused, and a fifth H2 tag created
(`CE - lead_form_validation_error` → `GA4 - H2 - lead_form_validation_error`). **None of it was
published, and none of it was therefore visible to this test.** What loaded from
`googletagmanager.com/gtm.js?id=GTM-K8ZQPMXP` was the same published container as in Session 33.

**This is not a fault in the owner's work. It is the reason a separate Preview session is required,
and this environment cannot open one:** GTM Preview / Tag Assistant authenticates against the
owner's Google account, and **this worker must not and did not enter any credential.** Environment
tokens (`gtm_auth` / `gtm_preview`) would also have to be issued from the GTM UI by the owner.

**What this session CAN state, with evidence, is exactly what the container does TODAY** — which is
precisely what would happen if `NEXT_PUBLIC_GTM_ID` were set in production before publishing. That
is the question that actually gates deployment, and it is answered below.

**Method, stated plainly because Tag Assistant's UI was not used.** Delivery was measured at the
network and browser level, which is stronger evidence than a tag-name list: every request the page
made (`performance.getEntriesByType('resource')`, plus wrappers on `fetch`, `sendBeacon` and
`XMLHttpRequest` installed *before* consent), every cookie, every vendor global, and the full
`dataLayer`. A GA4 tag firing is a request to `google-analytics.com/g/collect` carrying `en=<event>`;
a Meta tag firing is a request to `facebook.com/tr` carrying `ev=<event>`. Nothing was inferred.

---

## 19. TEST A — REJECT ANALYTICS · **PASS, without qualification**

Fresh `localStorage`, `sessionStorage` and cookies. Container id `GTM-K8ZQPMXP` configured.

| Step | Observed |
|---|---|
| Fresh load, undecided | `consent default` — `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` **all denied** — first entry in `dataLayer`. Banner shown. **Zero third-party requests. Zero cookies.** |
| Chose **Reject analytics** | `consent update` — **all four denied**. `ms.consent.v1 = "denied"`. Banner gone |
| Navigated `/` → `/services` → `/seo` → `/about` → `/contact` | 5 `page_view` entries queued in `dataLayer` |
| Contact form: first keystroke | `lead_form_started` ×1 |
| Submitted with required fields empty | `lead_form_validation_error` ×3 — field names only (`email`, `company`, `message`) |
| Submitted complete form → **real 503** from the real handler | `lead_form_validation_error` ×1 (`error_scope: form`, `failure_reason: unavailable`). **`lead_form_submitted` ×0** |
| Booking link | `meeting_started` ×1 · **`meeting_booked` ×0** |

### 19.1 Required results — every one met

| Required | Observed | |
|---|---|---|
| No Meta Pixel fires | **`connect.facebook.net` — 0 requests. `fbq` undefined** | ✅ |
| No Twitter/X tag fires | **`static.ads-twitter.com` — 0 requests. `twq` undefined** | ✅ |
| No LinkedIn advertising tag fires | **`licdn` / `linkedin` ads — 0 requests. `lintrk` undefined** | ✅ |
| No `_fbp` or equivalent advertising cookie | **`document.cookie` contained no `_fbp`, no `_ga`, no `_gcl_*`, no advertising cookie of any kind** | ✅ |
| GA4 events not delivered while denied | **`google-analytics.com/g/collect` — 0 requests.** `googletagmanager.com` — 0 requests. `google_tag_manager` undefined | ✅ |
| Business functionality unaffected | All 6 navigations, form entry, validation, the real 503 and the booking link behaved identically | ✅ |

**Total third-party requests across the entire rejected journey: ZERO.** The only cookie present at
any point was `__next_hmr_refresh_hash__`, which is the Next.js dev-server hot-reload cookie and does
not exist in a production build.

**Under refusal, this site contacts no analytics or advertising provider at all.**

---

## 20. TEST B — ACCEPT ANALYTICS · **GA4 CONSENT SIGNALS CORRECT · ADVERTISING STILL FIRES**

Fresh state again, network recorder installed **before** the accept click.

### 20.1 Exact request tally for the whole accepted journey

| Request | Count | What it is |
|---|---|---|
| `www.googletagmanager.com/gtm.js` | **1** | The container. Double-injection guard held |
| `www.googletagmanager.com/gtag/js` | **1** | The Google tag, loaded by the container's GA4 configuration |
| `www.google-analytics.com/g/collect  en=page_view` | **1** | **The only GA4 hit in the entire session** |
| `pagead2.googlesyndication.com/ccm/collect  en=page_view` | **1** | Google Ads / cross-domain measurement ping from the Google tag. `npa=1`, `gcs=G101` |
| `connect.facebook.net/en_US/fbevents.js` | **1** | **Meta Pixel library** |
| `connect.facebook.net/signals/config/983625902710561` | **1** | **Meta Pixel `983625902710561` configuration** |
| `www.facebook.com/tr/  ev=PageView` | **8** | **Meta PageView — one per app route change** |
| `static.ads-twitter.com/uwt.js` | **1** | **X / Twitter universal website tag** |
| LinkedIn (`licdn`, `px.ads.linkedin.com`) | **0** | Not present — `lintrk` undefined |

**Cookies created: `_ga`, `_ga_6H7WFH2BHQ`, `_fbp`.** The two GA4 cookies are correct under granted
analytics consent. **`_fbp` is an advertising cookie and must not exist under this phase's decision.**

### 20.2 App events vs what was actually delivered — the gap

| App `dataLayer` event | Emitted | Delivered to GA4 | Tag responsible |
|---|---|---|---|
| `page_view` | **8** | **1** | The published `GA4 - Configuration`'s own initial page view. **`GA4 - H2 - page_view` did not fire — it is unpublished** |
| `lead_form_started` | **1** | **0** | `GA4 - H2 - lead_form_started` — unpublished |
| `lead_form_validation_error` | **4** | **0** | `GA4 - H2 - lead_form_validation_error` — unpublished |
| `lead_form_submitted` | **1** | **0** | `GA4 - H2 - lead_form_submitted` — unpublished |
| `meeting_started` | **1** | **0** | `GA4 - H2 - meeting_started` — unpublished |
| `meeting_booked` | **0** | **0** | Not implemented, and correctly absent |

**The single GA4 hit is consistent with the published `GA4 - Configuration` still having
`send_page_view = true`** — the change to `false` is unpublished. It fired once on container load and
never again, which is exactly the single-page-application defect the app's own `page_view` exists to
fix. **None of the five H2 events reached GA4, because none of their tags is published.**

### 20.3 Consent signals on the GA4 hit — CORRECT

| Parameter | Value | Meaning |
|---|---|---|
| `tid` | `G-6H7WFH2BHQ` | The expected property |
| `en` | `page_view` | |
| **`gcs`** | **`G101`** | **`ad_storage` DENIED · `analytics_storage` GRANTED** — exactly the decision |
| `gcd` | `13q3r3q3q5l1` | Consent-mode detail string; consistent with denied defaults plus one granted analytics update |
| `npa` | `1` | Non-personalised ads — correct under `ad_personalization: denied` |

**The consent plumbing works.** Google's own tag received, and reported back, precisely the state the
banner recorded.

### 20.4 Event-count verification (app layer)

| Check | Required | Observed |
|---|---|---|
| Exactly one `page_view` on initial load | 1 | **1** |
| Exactly one per App Router navigation | 1 each | **1 each** (`/services`, `/about`, `/contact`, `/schedule-call`, `/thank-you`) |
| Exactly one on **back** | 1 | **1** |
| Exactly one on **forward** | 1 | **1** |
| `lead_form_started` once per form start | 1 | **1** — across many keystrokes |
| `lead_form_validation_error` on the intended condition | ≥1 | **4** — 3 field-scoped, 1 form-scoped from the real 503 |
| Failed / non-persisted submission → zero conversions | 0 | **0** — real 503 |
| Successful persisted enquiry → exactly one conversion | 1 | **1** — from **three** submits fired in immediate succession |
| `meeting_started` diagnostic only | yes | **1**, no conversion semantics |
| `meeting_booked` | 0 | **0** |

**Success-path limitation, restated.** No database exists in this environment, so the 2xx was
supplied by a stub at the `fetch` boundary. The **failure** path was real. This proves everything on
the client side of a 2xx; it does not re-prove that the server returns 2xx only after MariaDB
acknowledges a row, which was verified in Session 32 against a real database with an unchanged route
handler.

### 20.5 ⚠ THE BLOCKER IS NOT RESOLVED — and the paused tags were the wrong ones

The Meta hits carry **`a=tmSimo-GTM-WebTemplate`**. That is a **community GTM template** for the
Facebook/Meta pixel — **not** a custom-HTML `FB - …` tag. **The 15 `FB - …` tags the owner paused are
therefore not the tags that are firing.** At least one further Meta tag exists in the container under
a different name, and `static.ads-twitter.com/uwt.js` shows the same is true for X.

**Consequences, stated exactly:**

- **Meta fired `PageView` 8 times — once per route change** — while `ad_storage`, `ad_user_data` and
  `ad_personalization` were all denied. Meta does not honour Google Consent Mode.
- **`_fbp` was created again**, which the phase's decision does not permit.
- **The consent gate still fully protects an undecided or refusing visitor** — Test A proves that.
  **It cannot protect an accepting visitor** from tags the container chooses to fire. Accepting
  *analytics* on the live site today would start Meta and X tracking.

**PII check on the advertising hits.** The Meta requests contained **no** advanced-matching
parameters (`aems=0;0` — automatic advanced matching is off) and **no** form values, name, email,
phone, company or message. They do send the **page title and meta description** (`pmd[title]`,
`pmd[description]`) and scraped on-page text in `ss=`. That is Meta's normal behaviour and carries no
visitor PII from this site — but it is data leaving the browser for an advertising vendor under
denied advertising consent.

### 20.6 PII re-audit under the real container — **PASS**

Full `dataLayer` after the complete accepted journey. **19 distinct keys, all approved:**
`event`, `environment`, `page_path`, `page_type`, `form_id`, `field_name`, `error_type`,
`error_scope`, `failure_reason`, `conversion_surface`, `qualification_status`, `attribution_status`,
`first_source`, `first_medium`, `latest_source`, `latest_medium`, `cta_location`, `cta_role`, plus
GTM's own `gtm.uniqueEventId`.

| Needle | In app `dataLayer` | In the GA4 hit | In the Meta hits |
|---|---|---|---|
| Name, email local part, company, phone, message text, website | **none** | **none** | **none** |
| **`@` — any at-sign** | **none** | **none** | **none** |
| Advanced-matching params (`ud[`, `em=`, `ph=`, `fn=`, `ln=`) | n/a | n/a | **none** |

**One observation, recorded because it is new.** Once the container loads, **GTM itself pushes
`gtm.js`, `gtm.dom`, `gtm.load` and `gtm.linkClick` into `dataLayer`, and the `gtm.linkClick` entries
carry live DOM element references** (`gtm.element`). That is GTM's Auto-Event Listener, not this
application, and it is what the container's legacy social-click tags consume. It stays in the tab
unless a tag reads it. **It is not something the application can prevent, and it is not a PII leak by
this application** — but the owner should know that pausing the social-click tags removes the
consumer, not the listener.

---

## 21. The three dormant `window.gtag` call sites — REMOVED

### 21.1 Reassessment

| Component | Rendered? | Verdict |
|---|---|---|
| `components/blog/SocialShare.tsx` | **YES** — `app/(pages)/blog/[slug]/page.tsx:382` | **Live component holding a live, unapproved analytics API** |
| `components/filters/CategoryFilter.tsx` | **No** — `components/CategoryFilter.tsx` re-exports it; nothing imports either | Dead code holding a live analytics API |
| `components/forms/CalendlyButton.tsx` | **No** — same re-export-only pattern | Dead code holding a live analytics API |

**Measured again with the real published container loaded: `typeof window.gtag === "undefined"`.**
So nothing was firing. **But that is a property of how the container happens to be configured today,
not a guarantee** — the container already loads `gtag/js`, and a Google tag or Google Ads tag
configured to expose the global would have turned all five call sites into live, unapproved GA4
events with no code change, no deploy and no warning. A `gtag` command also bypasses
`lib/analytics.ts` entirely: past the parameter sanitiser, and past any GTM tag configuration that
could filter it.

### 21.2 Disposition — removed, with no event invented

| Removed emitter | Replacement | Why |
|---|---|---|
| `share_click` ×2 (`SocialShare`) | **None** | Not in the approved five-event taxonomy. Converting it would have meant inventing a sixth event |
| `blog_filter_click` (`CategoryFilter`) | **None** | Same |
| `schedule_call_click` (`CalendlyButton`) | **None** | It *is* semantically `meeting_started`, which IS in the taxonomy — but **the component is not rendered anywhere**, and adding a conversion-adjacent emitter to unreachable code would create a second, untested source of it. `components/analytics/BookingLink.tsx` already does this job correctly and is the one actually rendered |

**THE FIVE-EVENT TAXONOMY IS UNCHANGED.** Nothing was added, renamed or removed.
**`window.dataLayer` via `lib/analytics.ts` is now the sole analytics API in this application** —
**zero `window.gtag(` call sites remain in `app/`, `components/` and `lib/`.**

### 21.3 User-facing behaviour — unchanged, and verified in a browser

`SocialShare` was rendered through a temporary throwaway route (created, tested, **deleted before
commit**), because `/blog/[slug]` cannot render locally without Contentful credentials.

| Check | Result |
|---|---|
| All four controls render | **LinkedIn · Facebook · Twitter · Copy Link** |
| Share destinations | All three URLs correct and correctly encoded |
| `target` / `rel` | `_blank` / `noopener noreferrer` on every one |
| Copy-link behaviour | Label became **"Copied!"**, reverted to **"Copy Link"** after 2s |
| `dataLayer` events produced by sharing | **0** |
| Errors thrown | **0** |

**Recorded as pre-existing debt, not introduced and not fixed here:** `SocialShare` does not await
`navigator.clipboard.writeText`, so it shows "Copied!" even when the clipboard write rejects (it
rejected in the automated browser, which is not focused). And `CalendlyButton` is a dead duplicate of
`BookingLink`; deleting a component is outside the scope of an analytics-surface change.

### 21.4 Side effect worth recording

**TypeScript errors under `tsc --noEmit` fell from 11 to 2.** The eight
`Property 'gtag' does not exist on type 'Window'` errors are gone with the call sites. The two that
remain are pre-existing and unrelated: a `size="md"` prop mismatch in `CalendlyButton` and
`canonical` in `lib/metadata.ts`.

---

## 22. `Conversion Linker` — recommendation: **PAUSE**

**What it does.** Conversion Linker reads a Google Ads click identifier (`gclid`, `wbraid`,
`gbraid`) from a landing URL and writes it into first-party `_gcl_*` cookies so that a **Google Ads
conversion tag** on a later page can attribute the conversion. It is a *storage* helper for
advertising, and it is gated on `ad_storage`.

**Why it has no purpose in the current architecture — VERIFIED FACT:**

1. **There is no consumer.** No Google Ads conversion tag, no remarketing tag and no Floodlight tag
   is part of the intended H2 surface. The five H2 tags are GA4 event tags; none reads `_gcl_*`.
2. **GA4 does not need it.** The Google tag reads `gclid` from the URL for GA4's own attribution
   without Conversion Linker.
3. **`ad_storage` is denied in this phase**, so it writes nothing today. **No `_gcl_*` cookie
   appeared in either test** — verified in both the rejected and the accepted runs.

**Recommendation: PAUSE it.** This is surface-minimisation and tidiness, not a privacy fix — it is
already inert under denied advertising consent, so pausing changes no observed behaviour.

**Condition for restoring it, stated so it is not lost:** **re-enable Conversion Linker before any
Google Ads conversion tracking is introduced**, and enable it together with the advertising consent
signals that would then have to be granted. Without it, Google Ads conversion attribution degrades.

**One honest limit.** The `pagead2.googlesyndication.com/ccm/collect` request observed in Test B
comes from the **Google tag** (`gtag/js`), which sends it when the GA4 property has Google Ads
linking or ads-data features enabled. **This session could not attribute that request to a specific
tag without Preview**, and it is *not* evidence that Conversion Linker fired. It is listed under
owner actions as its own question.

---

## 23. Files changed in Session 34

| File | Change |
|---|---|
| `components/blog/SocialShare.tsx` | Two `window.gtag('event','share_click',…)` emitters and the `trackShare` helper removed, with the three now-dangling `onClick` wirings. **Presentation, destinations, copy behaviour untouched** |
| `components/filters/CategoryFilter.tsx` | `window.gtag('event','blog_filter_click',…)` removed. Filter behaviour untouched |
| `components/forms/CalendlyButton.tsx` | `window.gtag('event','schedule_call_click',…)` removed. `window.open` behaviour untouched |
| `docs/27-production-translation/20_PHASE_H2A_CONSENT_AND_GTM.md` | This section |

**No change was made to `lib/analytics.ts`, `lib/consent.ts`, `lib/gtm.tsx`, the consent components,
`app/layout.tsx`, the contact form, the enquiry route, or the untracked root `README.md`.**

### 23.1 Build validation

| Build | Result |
|---|---|
| `npm run build` | **Compiled successfully.** 25 routes, unchanged, all still `○ Static` / `● SSG` |
| `npm run build:cpanel` | **Compiled successfully** |
| New warnings or errors | **None.** The only warning is the pre-existing dual-lockfile workspace-root notice |

---

## 24. Owner actions after Session 34

| # | Action | Status |
|---|---|---|
| 1 | **Find and pause the Meta Pixel tag that actually fires.** It is a **community-template** tag (`tmSimo-GTM-WebTemplate`), **not** one of the 15 `FB - …` tags already paused. Filter the container's tag list by the template, or by pixel id `983625902710561` | **NOT DONE — BLOCKING** |
| 2 | **Find and pause the X/Twitter tag that actually fires** (`static.ads-twitter.com/uwt.js`) — likewise not one of the 8 `Twitter - …` tags already paused | **NOT DONE — BLOCKING** |
| 3 | Re-verify in **Preview** that **zero** advertising requests occur after accepting analytics | **NOT DONE — BLOCKING** |
| 4 | **Pause `Conversion Linker`** (§22), and note the restore condition | **NOT DONE** |
| 5 | Determine what causes `pagead2.googlesyndication.com/ccm/collect` — GA4↔Google Ads linking or an ads-data feature on the Google tag — and switch it off if Google Ads is not in use | **NOT DONE** |
| 6 | Run **GTM Preview** and confirm all five H2 tags fire, one per event, per §13. **This session could not do it: Preview requires the owner's Google authentication** | **NOT DONE** |
| 7 | Confirm in Preview that `GA4 - Configuration` sends **no** page view | **NOT DONE** |
| 8 | **Publish the container — only after 1–7** | **NOT DONE** |
| 9 | Confirm no published container configuration exposes a `window.gtag` global. **Lower risk now that the five call sites are removed, but still worth confirming** | **NOT DONE** |
| 10 | Register the GA4 custom dimensions in §8, including `environment` | **NOT DONE** |
| 11 | Set production `NEXT_PUBLIC_GTM_ID=GTM-K8ZQPMXP`. **Leave `NEXT_PUBLIC_META_PIXEL_ID` empty** | **NOT DONE** |
| 12 | Apply DB migration 002 on the production database, before or with the code | **NOT DONE — UNVERIFIED** |
| 13 | One real production measurement verification: a genuine enquiry → one row → one `lead_form_submitted` in GA4 | **NOT DONE** |
| 14 | Legal review of the banner wording; `/privacy-policy` still says a consent mechanism *"should be added before launch"* | **NOT DONE** |
| 15 | Exclude this session's localhost hits in GA4 (`hostname = localhost`) | **NOT DONE** |

**Confirmed complete by the owner and not re-verifiable from here** (they live in an unpublished
workspace): the 15 `FB - …` pauses, the 8 `Twitter - …` pauses, `LinkedIn - Lead`, the 7 legacy GA4
page-visit pauses, the 6 further legacy GA4 event pauses, `GA4 - Lead Form Submit`,
`send_page_view = false`, and the five `CE - …` triggers with their five `GA4 - H2 - …` tags.
**GA4 Enhanced Measurement "Page changes based on browser history events" is reported unchecked and
saved; it could not be observed from here because no GA4 SPA page-view hit was sent either way.**

---

## 25. Verdict after Session 34

**IS GTM SAFE TO PUBLISH? NO.**
Publishing today would publish a container whose Meta and X advertising tags still fire on analytics
acceptance. Actions 1–3 in §24 must be completed and verified in Preview first.

**IS H2 A PASS? NO — STILL BLOCKED.**

| Area | State |
|---|---|
| Consent Mode v2 — defaults, ordering, storage, update, withdrawal | **VERIFIED against the real Google tag** (`gcs=G101`, `npa=1`) |
| Rejected-consent behaviour | **PASS — zero third-party requests, zero advertising cookies** |
| Consent-gated GTM delivery | **VERIFIED with the real container** |
| App event taxonomy — five events | **VERIFIED unchanged** |
| Page-view authority | **VERIFIED — exactly one per load, navigation, back and forward** |
| Conversion integrity | **VERIFIED — 0 on failure, exactly 1 on success from three submits** |
| PII | **VERIFIED clean — app `dataLayer`, GA4 hit and Meta hits** |
| Sole analytics API | **ACHIEVED — zero `window.gtag` call sites remain** |
| Builds | **Both pass** |
| **Advertising tags in the published container** | **BLOCKING — the paused tags were not the ones firing** |
| H2 GA4 tags delivering | **UNVERIFIED — unpublished; needs owner Preview** |
| Container published · production env var · migration 002 · real production measurement | **All outstanding** |
| Booking conversion | **Still owner-blocked** — unchanged |

**Nothing was published. Nothing was pushed. No Google, Meta or X account configuration was read or
modified.**

---

# Session 35 — ACTIVATED. This document's blocker is closed.

**Session:** 35 · **Date:** 2026-09-06 · **Branch:** `test_branch` · **HEAD:** `c4f9259`
**Full record: `23_PHASE_H2_ANALYTICS_ACTIVATION_ACCEPTANCE.md`.**

## 26. §20.5 was wrong, and the correction matters

**§20.5 concluded that "the paused tags were the wrong ones."** It is not true, and it should not be
carried forward.

Session 34 reasoned that the Meta hits carrying `a=tmSimo-GTM-WebTemplate` could not be coming from
the fifteen `FB - …` tags, because those were assumed to be custom-HTML tags. **With container
access, those tags are of type `Facebook Pixel` from the `facebookarchive` gallery — that IS the
community template**, and `FB - Lead` carries pixel id `983625902710561`, the exact id observed on
the wire. **The owner had paused the correct tags all along.**

The real cause is the one Session 34 stated correctly in its own §18 and then did not apply to its
own conclusion: **a browser loads the published container, never a workspace.** The pauses were
staged and unpublished, so they could not affect what loaded. Publishing them resolved it.

The X tag was also identified: **`Twitter Base Pixel`** — Session 34 was right that it is not one of
the eight `Twitter - …` tags; it is a ninth without that prefix, and it too was already paused in the
workspace.

**§20.5 is retained above, unaltered, as the record of what that session concluded from what it could
see. This section supersedes its diagnosis.**

## 27. Owner-action list from §24 — final status

| # | Action | Status |
|---|---|---|
| 1 | Find and pause the Meta tag that actually fires | **DONE** — it was `FB - Page View` (All Pages) plus the other 14 `FB - …` tags, already paused by the owner; **published** in Session 35 |
| 2 | Find and pause the X tag that actually fires | **DONE** — `Twitter Base Pixel`, already paused by the owner; **published** |
| 3 | Re-verify zero advertising requests after accepting analytics | **DONE — verified in GTM Preview and again on the live site.** Zero Meta, X and LinkedIn requests; no `_fbp`, no `_gcl_*` |
| 4 | Pause `Conversion Linker` | **DONE** — was already paused by the owner; published |
| 5 | Determine the cause of `pagead2.googlesyndication.com/ccm/collect` | **NO LONGER OBSERVED** in either Preview or the live accepted journey. Not reproduced, so not diagnosed further |
| 6 | Run GTM Preview and confirm all five H2 tags fire | **DONE** — all five fired, 39 tags did not |
| 7 | Confirm `GA4 - Configuration` sends no page view | **DONE** — `send_page_view = false`, and GA4 Enhanced Measurement's *Page changes based on browser history events* is confirmed **unchecked** |
| 8 | Publish the container | **DONE — Version 4, "H2 measurement activation"** |
| 9 | Confirm no published configuration exposes `window.gtag` | **DONE** — `gtag` is `undefined` on the live site in every consent state |
| 10 | Register the §8 custom dimensions | **DONE — 13 registered**, before production data began arriving |
| 11 | Set production `NEXT_PUBLIC_GTM_ID`, leave Meta empty | **DONE — as a BUILD-TIME input.** A host environment variable alone does nothing; this was proven, and a rebuild and redeploy were required |
| 12 | Apply migration 002 | **ALREADY APPLIED** — ledger unchanged, not re-run |
| 13 | One real production measurement verification | **DONE** — one synthetic enquiry → one durable row → one `lead_form_submitted` → GA4 Realtime. Row deleted afterwards |
| 14 | Legal review of the banner wording | **NOT DONE — still open** |
| 15 | Exclude localhost hits in GA4 | **NOT DONE — still open.** Note `environment` is not a reliable filter; use hostname |

**§8's parameter mapping had never been implemented — the five tags were sending the event name
only. It is implemented now**, with one improvement on the plan: `page_path` is mapped by Google's
own tag to the native `dp` field, so it needs no custom dimension.

## 28. Verdict after Session 35

**IS GTM SAFE TO PUBLISH? YES — and it is published.**
**IS H2 A PASS? YES — measurement is active in production and accepted**, with one time-bound
provider item: GA4 will not offer `lead_form_submitted` for key-event flagging until it has
processed the event (≤24h). See `23_PHASE_H2_ANALYTICS_ACTIVATION_ACCEPTANCE.md` §18.
