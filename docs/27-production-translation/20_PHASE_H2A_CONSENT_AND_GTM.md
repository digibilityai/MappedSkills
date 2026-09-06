# Session 33 — Phase H2A — Consent Mode v2 and Consent-Gated GTM Delivery

**Session:** 33 · **Date:** 2026-09-06 · **Branch:** `test_branch`
**Starting HEAD:** `c816633` — *feat: add conversion measurement foundation*
**Scope:** wire the existing GTM container into the application behind a consent gate, and
implement Google Consent Mode v2. Continuation of `19_PHASE_H2_ANALYTICS_CONVERSION.md`.

**Result: H2 REMAINS BLOCKED.**
The application side is implemented and verified. **A new, previously unrecorded blocker was found
during live validation: the published `GTM-K8ZQPMXP` container fires advertising tags — a Meta
Pixel and an X/Twitter ads tag — that this phase's binding consent decision does not permit.**
See §12. **The container must not be enabled in production until the owner resolves that.**

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
