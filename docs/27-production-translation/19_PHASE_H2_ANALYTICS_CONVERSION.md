# Session 32 — Phase H2 — Analytics and Conversion Instrumentation

**Session:** 32 · **Date:** 2026-09-06 · **Branch:** `test_branch`
**Starting HEAD:** `3381f42a8d077b1a81ef0028f818bfe85282c3af` — *feat: implement durable enquiry persistence*
**Result:** **BLOCKED — OWNER / PROVIDER INPUT REQUIRED.**
**Contact measurement architecture: implemented, tested and trustworthy. Zero analytics providers
are configured, so nothing this phase emits can reach any platform until the owner acts.**

> **⚠ CONTINUED IN SESSION 33 — `20_PHASE_H2A_CONSENT_AND_GTM.md`.**
> The consent decision recorded below as *unresolved* has since been made and implemented: Google
> Consent Mode v2 with all four signals denied by default, and GTM delivery gated on explicit
> analytics acceptance. **H2 IS STILL BLOCKED.** Live validation against the real
> `GTM-K8ZQPMXP` container found that it fires a **Meta Pixel and an X/Twitter ads tag** while
> advertising consent is denied — a new blocker that must be resolved in GTM before the container
> is published. Read the Session 33 document for the current state of every item below.

---

## 0. The finding, stated first

**The contact conversion is now rooted in the one fact this system can prove: a durable MariaDB row
exists.** `lead_form_submitted` is emitted from exactly one place in the codebase, reachable only
after `POST /api/enquiry` has returned 2xx, which `app/api/enquiry/route.ts` does only after the
driver has acknowledged the INSERT. It was verified in a real browser against the real route
handler that a click, a submit attempt, a passing client validation, a 400, a 429, a 503, a network
failure, a `/thank-you` refresh, a direct `/thank-you` visit and a back-navigation **all produce zero
conversions**, and that a triple-click and a retry-after-failure each produce **exactly one row and
exactly one event**.

**DEPLOYMENT ORDER MATTERS, AND GETTING IT WRONG TAKES THE FORM OFFLINE.** This phase adds
migration 002. **`npm run db:migrate` must be run on the server before or with this code.** If the
code ships without it, the enquiry INSERT references columns that do not exist and **every
submission fails with an honest 503** — no false success, but no enquiries either. See §29 action 1.

**And none of it can be delivered anywhere yet.** `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID` and
`NEXT_PUBLIC_META_PIXEL_ID` are all empty, no consent mechanism exists, and setting any of them
today would load a third-party script with no consent gate. **That is why this phase reports BLOCKED
rather than PASS:** the measurement layer is correct and inert, and only the owner can make it live.

---

## 1. Starting state — VERIFIED FACT

| Item | Observed |
|---|---|
| Branch | `test_branch` |
| HEAD | `3381f42` |
| `origin/test_branch` | `4780d4b` — local ahead; **nothing pushed in this session** |
| Working tree | `README.md` untracked · `mappedskills-cpanel-20260906-101820.zip` untracked · `next-env.d.ts` modified |
| `next-env.d.ts` | Pre-existing build churn from Session 31's builds (`.next/dev/types` → `.next/types`). **Restored before any work began**, and restored again after this session's builds |
| `README.md` | Untouched, unstaged, uncommitted — and still so at session end |

---

## 2. The H1 trusted boundary this phase instruments

| Property | State entering H2 |
|---|---|
| Durable persistence | **Yes** — MariaDB, `enquiries` table, migration 001 |
| Server authoritative | **Yes** — `lib/enquiry-validation.ts`, applied to the raw body, client never trusted |
| Persistence before success | **Yes** — 201 returned only after the driver acknowledges the write |
| Idempotency | **Yes** — client UUID reused across retries, `UNIQUE uq_enquiry_idempotency` enforces it |
| Fake-success path | **None. Deleted in H1** |
| Email notification | **UNRESOLVED — NON-BLOCKING.** No provider, no credential, no library |
| Booking | **OWNER-BLOCKED.** No vendor confirmed, no webhook, no server-side confirmation |

**H1 §31.25 left H2 exactly one thing to instrument: a server-confirmed persistence success.** That
is what this phase instruments, and it instruments nothing else as a conversion.

---

## 3. Analytics baseline audit — what was actually there

Repository-wide search for `gtm`, `gtag`, `dataLayer`, `fbq`, `GA4`, `@vercel/analytics`,
`utm_`, `gclid`, `fbclid`, `msclkid`, `consent`.

| Surface | Existed | Configured | Env-gated | Active | PII risk | H2 action |
|---|---|---|---|---|---|---|
| `lib/gtm.tsx` — container script | Yes | **No** — `NEXT_PUBLIC_GTM_ID` empty | Yes | No | None | **Retained**, helpers stripped |
| `lib/gtm.tsx` — 7 `dataLayer` helpers | Yes | n/a | No | No (no callers) | **`trackEmailClick(email)` pushed a RAW EMAIL; `trackPhoneClick(phone)` pushed a phone number; `trackFormSubmit` spread arbitrary `formData`** | **REMOVED** |
| `lib/tracking.ts` — 12 helpers | Yes | n/a | No | **Dead — zero call sites** | Same two leaks, plus `fbq('track','Lead')` on a client fetch to a non-existent `/api/contact` | **FILE DELETED** |
| `lib/meta-pixel.tsx` | Yes | **No** — `NEXT_PUBLIC_META_PIXEL_ID` empty | Yes | No | None while unconfigured | **Untouched — owner decision.** Two defects recorded, §14 |
| `@vercel/analytics` in `app/layout.tsx` | Yes | Auto | `NODE_ENV==='production'` | Yes in production | None | **REMOVED** — §15 |
| `ContactForm.tsx` — 3 `window.gtag` calls | **Already removed in H1** | — | — | — | — | None needed |
| `BlogNewsletterForm.tsx` — `gtag('newsletter_signup',{email})` | **Already removed in H1** | — | — | — | — | None needed — §17 |
| `SocialShare.tsx` — 2 `window.gtag` calls | Yes | n/a | No | **Live on `/blog/[slug]`, but inert** | None — sends `page_title` only | **Left. Recorded as debt** — §18 |
| `CategoryFilter.tsx` — `window.gtag` | Yes | n/a | No | **Dead** — re-export only, never rendered | None | **Left. Recorded as debt** — §18 |
| `CalendlyButton.tsx` — `window.gtag` | Yes | n/a | No | **Dead** — re-export only, never rendered | None | **Left. Recorded as debt** — §18 |
| UTM / attribution capture | **None** | — | — | — | — | **BUILT** — §10 |
| Consent mechanism | **None** | — | — | — | — | **NOT BUILT — owner/legal input** — §16 |
| Pageview on App Router navigation | **None** | — | — | — | — | **BUILT** — §17 |

**`window.gtag` is undefined everywhere in this application.** No `gtag.js` is loaded from any
source. The three surviving `window.gtag` call sites are guarded by `typeof window.gtag` and are
therefore inert today; they would only begin firing if a GTM container loaded a GA4 tag that defines
the global. **They carry no PII**, which is why the session brief's mandate — *"dead **unsafe**
tracking cleanup"* — is satisfied without rewriting blog and filter instrumentation that has no
approved taxonomy and is outside a contact-conversion phase.

---

## 4. Provider configuration — NAMES ONLY, NO VALUES ANYWHERE

**No secret, id or credential was read, written, guessed, logged or recorded. `.env.example` was NOT
modified.**

| Provider | Variable | Value in repo | Read by code | Status |
|---|---|---|---|---|
| Google Tag Manager | `NEXT_PUBLIC_GTM_ID` | **empty** | `lib/gtm.tsx` | **NOT CONFIGURED** |
| GA4 | `NEXT_PUBLIC_GA4_ID` | **empty** | **NOTHING — declared and wired nowhere** | **NOT CONFIGURED / NOT APPLICABLE** |
| Meta Pixel | `NEXT_PUBLIC_META_PIXEL_ID` | **empty** | `lib/meta-pixel.tsx` | **NOT CONFIGURED** |
| Vercel Analytics | — | — | — | **NOT APPLICABLE — removed, §15** |
| Consent platform | **none declared** | — | — | **DOES NOT EXIST** |

**Nothing was invented.** No container id, measurement id, pixel id, CAPI token, Measurement
Protocol secret or consent-platform id was created, requested or placed in any file.

**Session 01B verified in a live browser that `dataLayer`, `gtag` and `fbq` were all undefined in
production.** No analytics has ever run on this site, so there is no historical container
configuration to protect and no baseline to preserve.

---

## 5. Event taxonomy — five events

**Every name is taken unchanged from `EVENT_TAXONOMY.md` §2 (Gate 6 / `DEC-011`), which states:
"Event names are a contract. Renaming breaks historical continuity. Deprecate rather than rename."
No name was invented for this session.** Events that document lists but this phase cannot fire
honestly are **absent**, not approximated.

| Event | Purpose — the decision it supports | Authority | Class | Implemented |
|---|---|---|---|---|
| `page_view` | Which pages are read, and the denominator for every funnel rate | **Client** | Navigation / diagnostic | **Yes** |
| `lead_form_started` | How many people who see the form begin it — separates a traffic problem from a form problem | **Client** | Diagnostic | **Yes** |
| `lead_form_validation_error` | Which field, or which server failure, stops people — the single most actionable CRO signal on the site | **Client** | Diagnostic | **Yes** |
| **`lead_form_submitted`** | **The primary contact conversion** | **SERVER-AUTHORED** — a 2xx from `/api/enquiry` after durable persistence | **★ PRIMARY CONVERSION** | **Yes** |
| `meeting_started` | How much demand is being routed to a booking page nobody has confirmed works — evidence for resolving the booking blocker | **Client** | Diagnostic / navigation | **Yes** |

### 5.1 Deliberately NOT implemented

| Event | Why not |
|---|---|
| **`meeting_booked`** ★ | **Requires a booking webhook. No vendor selected, no webhook, no secret.** Emitting anything here would be a fabricated conversion — §13 |
| `qualified_enquiry` | **No authoritative qualification state exists** — §9 |
| `lead_form_abandoned` | Needs `visibilitychange`/`beforeunload` instrumentation whose reliability varies by browser, for a signal `lead_form_started` minus `lead_form_submitted` already gives at lower cost |
| `primary_cta_clicked`, `pricing_cta_clicked`, `proof_opened`, `research_opened` | Sitewide CTA instrumentation across every route. Out of a contact-conversion phase's scope and would touch shared chrome, which §39 of the brief forbids |
| `phone_clicked`, `email_clicked` | **The published phone number and email are OWNER-BLOCKED and render nowhere.** There is no control to instrument |
| `meeting_rescheduled`, `meeting_cancelled`, `meeting_no_show` | Webhook events. Same blocker as `meeting_booked` |
| `research_subscribed` | **No mailing list exists.** H1 replaced the false-success newsletter form with a card saying so |

### 5.2 Parameters, and the one extension

Standard parameters used, all from `EVENT_TAXONOMY.md` §3: `page_path` · `page_type` ·
`cta_location` · `cta_role` · `conversion_surface` · `first_source` / `first_medium` /
`first_campaign` · `latest_source` / `latest_medium` / `latest_campaign` · `attribution_status` ·
`field_name` · `error_type`.

Additions, each recorded rather than quietly taken:

| Parameter | Value | Why |
|---|---|---|
| `environment` | `production` / `development` | On every event, so a container can exclude non-production traffic with one trigger condition. A developer running locally with a real container id cannot silently pollute a production property |
| `form_id` | `contact_enquiry` | Distinguishes this form from any future one without a taxonomy change |
| `error_scope` | `field` / `form` | A whole-form failure (503, 429) is not a field error, and merging the two would make both unreadable |
| `failure_reason` | The server's own error code, allow-listed | Categories only. An unrecognised code reports `unexpected` rather than passing through, so a future code cannot leak by default |
| `page_type: 'other'` | — | For `/work`, `/portfolio/*`, `/faq`, `/terms`, `/privacy-policy`, `/thank-you`, `/launch-checklist` and 404, which have no approved page type. **Honest as unclassified rather than forced into the nearest bucket.** `page_path` still distinguishes them |
| `qualification_status: 'not_evaluated'` | — | **See §9. Deliberately outside the approved enum** |

---

## 6. Architecture

```
  MariaDB acknowledges the INSERT
        │
        ▼
  POST /api/enquiry returns 201          ← THE CONVERSION AUTHORITY
        │
        ▼
  ContactForm: if (response.ok) → trackOnce(...)   ← the ONLY emit site
        │
        ▼
  lib/analytics.ts  → sanitiseParams → window.dataLayer.push
        │
        ▼
  GTM container (external, unconfigured) → decides vendor routing
```

**One boundary, `lib/analytics.ts`.** It knows about `window.dataLayer` and nothing else. There is no
`gtag`, no `fbq` and no vendor SDK call anywhere below it. The application states, in approved
vocabulary, **what happened**; the tag manager decides **who hears about it**. That is what lets a
provider be added, swapped or removed without touching a route component, and it is what makes the
consent question tractable — see §16.

**Session 21 found three competing event surfaces. There is now one.**

---

## 7. Contact conversion — the mechanism

| | |
|---|---|
| **Event** | `lead_form_submitted` |
| **Trigger** | `response.ok` from `POST /api/enquiry` |
| **Server-confirmed** | **Yes.** That endpoint returns 2xx on exactly one path — after `insertEnquiry` resolves, which requires the driver to acknowledge the row |
| **Click-based** | **No** |
| **Submit-attempt based** | **No** |
| **Client-validation based** | **No** |
| **Thank-you-page based** | **No.** `/thank-you` is a separate document with no conversion code on it |
| **One-shot mechanism** | `trackOnce`, keyed on the enquiry's idempotency key in `sessionStorage` |
| **Emit sites in the whole codebase** | **One** |

### 7.1 Why the key is the right de-duplication token, and why it never leaves the browser

The one-shot key is **the same UUID the database's unique index uses**. One enquiry therefore
produces one row and one event, and the two agree by construction rather than by coincidence: a
double-click is stopped earlier by H1's synchronous `inFlightRef`; a retry after a failure re-sends
the *same* key, so the server's duplicate path returns 2xx again and `trackOnce` suppresses the
second event.

**It is never put in an event payload.** It is stored against the row, so it is a database
identifier resolvable to a person — prohibited in analytics. It is used only as a local comparison
key inside `trackOnce`, which does not return it and has no caller that wants it.

`trackOnce` **fails open**: if `sessionStorage` is unavailable (private window, blocked site data)
the event is emitted rather than suppressed. A conversion measured twice is a reporting defect; one
silently never measured is worse.

### 7.2 Server-AUTHORED, client-DELIVERED — a deviation, stated plainly

`05_FORMS_ANALYTICS.md` §2.2 and `06_IMPLEMENTATION_SEQUENCE.md` specify that this conversion is
**delivered by a server** ("0 conversion events fire from the client").

**It is not, and it cannot be today.** Server-side delivery requires a configured provider endpoint
and credential — a GA4 Measurement Protocol API secret, a server-side GTM container, or a Meta CAPI
access token. **None exists, and inventing one is prohibited outright.** Building a server delivery
path with no destination would be a stub that measures nothing.

**What this phase implements instead:** the server **authors** the conversion — it is true if and
only if the server said so — and the browser **carries** it into `dataLayer`. The approved rule's
three stated reasons are met on two counts and not the third:

| The approved objection to client-side conversions | Met? |
|---|---|
| "can be triggered by a refresh" | **Met.** Verified: refresh, direct visit and back-navigation all produce zero |
| "would fire even when persistence failed" | **Met.** Verified: 400, 429, 503 and network failure all produce zero |
| "fires inconsistently under ad blocking" | **NOT MET.** An ad-blocked or offline visitor's conversion is **never delivered to any platform** |

**The consequence of the third, stated rather than hidden: browser analytics will undercount
enquiries.** It is not a data loss — the row is in MariaDB either way, and **the `enquiries` table,
not an analytics property, is the system of record for how many enquiries exist.** Analytics is for
channel and behaviour, and it is known to undercount.

> **This is a deviation from approved wording and is recorded as requiring orchestrator
> confirmation. It is not treated as an approved decision.** Full server-side delivery becomes
> implementable the moment a provider credential exists, and the emit site is one function call.

---

## 8. Persisted vs qualified — the distinction is preserved

| Question | Answer |
|---|---|
| Is a **persisted enquiry** authoritative? | **YES.** A durable MariaDB row, confirmed by the driver before any success is returned |
| Is a **qualified enquiry** authoritative? | **NO** |
| Is `qualified_enquiry` emitted? | **NO. Never** |

**Why not.** `QUALIFIED_ENQUIRY_DEFINITION.md` §2 sets five WQE conditions. Four are evaluable
server-side today. **Condition 5 — "no existing open enquiry from the same email within the
deduplication window" — depends on a window §10 decision 1 leaves deliberately unset**, and no
column, workflow, reviewer or admin surface exists to resolve it. H1 declined to create a
`qualification_status` column for exactly this reason, and H2 does not create one either: **a phase
that renamed every stored enquiry "qualified" would inflate the primary business KPI by definition.**

**How the distinction is enforced in the emitted data.** The conversion event carries
`qualification_status: 'not_evaluated'` — **deliberately outside the approved enum**
(`qualified` / `unqualified` / `review_required`). Sending `qualified` would fabricate a verdict;
omitting the parameter would let a container default it. An explicit out-of-enum value is visible in
every report and makes any attempt to count these as qualified enquiries **fail loudly instead of
quietly**. Reconciling it with the approved enum is work for whichever phase builds real
qualification.

**`EVENT_TAXONOMY.md` §4 remains correct as written and is not amended:** `lead_form_submitted` is a
business conversion **only** with `qualification_status = qualified`. **No event this phase emits
meets that condition.**

**QUALIFIED ENQUIRY MEASUREMENT: NOT YET AUTOMATABLE — QUALIFICATION STATE NOT AUTHORITATIVE.**

---

## 9. Booking — unchanged, still blocked

| | |
|---|---|
| Vendor confirmed | **No.** Calendly is in the code and has never been recorded as an approved selection |
| Real bookable URL confirmed | **No.** `NEXT_PUBLIC_CALENDLY_URL` is empty; the route falls back to a hard-coded `https://calendly.com/mappedskills` that **no record in this repository confirms is real** |
| Server booking confirmation | **Does not exist.** No webhook, no secret, no endpoint |
| Click tracked | **Yes** — `meeting_started` |
| Click classification | **DIAGNOSTIC / NAVIGATION INTENT. Explicitly NOT a business conversion** (`EVENT_TAXONOMY.md` §4) |
| `meeting_booked` emitted | **NO** |
| Booking backend added | **None** |

The destination is a third-party origin. **A click is the last thing observable from here**, so it is
the only thing claimed. `EVENT_TAXONOMY.md` §2 row 6 defines exactly that event — "Booking surface
opened" — and the approved name is used rather than a new one invented.

**BOOKING PRIMARY CONVERSION: NOT IMPLEMENTED — SERVER-CONFIRMED BOOKING UNAVAILABLE.**

**Still deserving the owner's attention, carried from H1 unchanged:** `/schedule-call` sends every
visitor to a booking URL nobody has confirmed exists. `meeting_started` will now at least measure how
much demand is going there.

---

## 10. Attribution

**Model: first-touch + conversion-touch. No multi-touch** — `ATTRIBUTION_MODEL.md` §2.

| Field | Captured | Stored on the row | Sent to analytics |
|---|---|---|---|
| `utm_source` | Yes | `first_source` / `latest_source` | Yes |
| `utm_medium` | Yes | `first_medium` / `latest_medium` | Yes |
| `utm_campaign` | Yes | `first_campaign` / `latest_campaign` | Yes |
| `utm_content` | Yes | `first_content` | **No** |
| `utm_term` | Yes | `first_term` | **No** |
| `gclid` / `wbraid` / `gbraid` | **PRESENCE ONLY** | **Value NEVER stored** | **No** |
| `fbclid` | **PRESENCE ONLY** | **Value NEVER stored** | **No** |
| `msclkid` | **PRESENCE ONLY** | **Value NEVER stored** | **No** |
| Landing page | Yes | `first_landing_page` (path only) | **No** |
| Referrer | **HOST ONLY** | `first_referrer_host` / `latest_referrer_host` | **No** |
| Conversion page | Yes | `source_page` (migration 001 — not duplicated) | Yes, as `page_path` |
| `attribution_status` | Derived server-side | `attribution_status` | Yes |

**Persistence:** `sessionStorage` in the browser (collection), **MariaDB on the enquiry row (system
of record)** — `ATTRIBUTION_MODEL.md` §4.

**Missing attribution blocks a submission: NO.** Verified: an enquiry submitted with attribution
absent, malformed, an array, and with storage throwing on every access **all persisted normally**
with `attribution_status = 'unavailable'`.

### 10.1 Two deliberate narrowings of the approved model

**A. Session-scoped storage, not cross-session.** §4 specifies a first-touch persisting "across
sessions for a defined window" — which means `localStorage` or a cookie, **device storage that
outlives the visit**, and **no consent mechanism exists**. Whether persistent device storage may be
written before consent is a legal question this programme has recorded as owner input, and an
implementation session may not answer it by picking a default. `sessionStorage` is used instead.
**Consequence, stated: a visitor who arrives from a campaign today and enquires next week is
recorded as `direct`. That is a real undercount of campaign attribution and must not be presented as
anything else.** The storage swap is one function once consent is settled.

**B. Click identifier values are never stored.** Their presence derives a channel
(`google/cpc`, `bing/cpc`, `facebook/paid_social`); the value is discarded in the browser.
**Consequence, stated: offline conversion import into Google Ads or Meta is NOT possible with what is
stored.** That capability needs the identifier and therefore an explicit owner decision with consent
settled. **Deferred, not done.**

### 10.2 A real defect found by runtime testing, and fixed

**Source inspection did not show it; the browser did.** `document.referrer` is a property of the
**document**, not the route — after an App Router client navigation it still reports the *original*
page's referrer. Navigating `/seo?utm_source=newsletter...` → `/contact` inside the app therefore
re-ran acquisition detection against that stale referrer, found nothing external, and **wrote the
`direct` residual over a known campaign.** `ATTRIBUTION_MODEL.md` §5 names that exact failure as
*"the most commonly broken rule in practice and the one that silently destroys attribution quality"*.

Two guards now close it, each covering a different route to the same bug:

1. **Only the first page view of a DOCUMENT can be an acquisition.** Everything after is in-app
   movement by definition.
2. **The `direct` residual never displaces a stored touch.** `direct` does not mean "arrived
   directly"; it means *no acquisition context was observed*. Absence of evidence is not evidence of
   a new visit. It may establish a first-touch when nothing is stored, never overwrite one.

**Verified after the fix:** landing on `/seo` with a campaign then navigating to `/contact` and
`/how-it-works` leaves both first- and latest-touch intact, while a genuinely new declared campaign
correctly updates latest-touch and leaves first-touch untouched.

### 10.3 Not built

Multi-touch weighting · `session_page_count` / `pricing_viewed` / `proof_viewed` soft signals ·
cross-device stitching · UTMs carried into the booking surface as hidden fields (blocked on the
vendor decision) · any visitor or session identifier.

---

## 11. PII — audited against a live payload

**Method: a real enquiry was submitted in a real browser with deliberately distinctive values, then
the entire serialised `dataLayer` was searched for every one of them.**

| Value submitted | Present in `dataLayer` |
|---|---|
| Name — `Zaphod Beeblebrox` | **No** |
| Email — `zaphod@heartofgold-testcorp.example` | **No** |
| Phone — `+91 9876500011` | **No** |
| Company — `Heart Of Gold Testcorp` | **No** |
| Website — `heartofgold-testcorp.example` | **No** |
| Message — `SENTINEL_MESSAGE_TEXT ...` | **No** |
| Idempotency key (any UUID) | **No** |
| The character `@` | **No — not one occurrence** |
| Hashed PII | **None. No hashing anywhere** — hashed email remains derived personal data |

**Every parameter key emitted, across all five events:** `event` · `environment` · `page_path` ·
`page_type` · `form_id` · `field_name` · `error_type` · `error_scope` · `failure_reason` ·
`conversion_surface` · `qualification_status` · `cta_location` · `cta_role` · `first_source` ·
`first_medium` · `first_campaign` · `latest_source` · `latest_medium` · `latest_campaign` ·
`attribution_status`. **All categorical or technical. No free text. No raw form value. No database
id.**

### 11.1 How it is enforced rather than merely intended

`sanitiseParams` is applied to every parameter of every event with **no caller opt-out**:

- `null` / `undefined` dropped, so an absent value is absent rather than the string `"undefined"`.
- **Anything not a string, finite number or boolean is dropped** — an object or array cannot be
  flattened into a payload by accident, which is how raw form values reach analytics in practice.
- Strings: control characters, `@`, `<` and `>` stripped, then capped at 100 characters. **`@`
  matters specifically: without it an email address cannot survive intact inside a campaign value**,
  which is the realistic route by which PII enters UTM data.
- `page_path` is path-only. **Verified: a visit to `/contact?utm_source=...&gclid=...` emitted
  `page_path: "/contact"`.**

**Honest limit:** the `@` strip and the length cap are a **mitigation, not a proof**. A crafted
`utm_source=victim@example.com` is stored and reported as `victimexample.com` — no longer a valid
address, but recognisably derived from one. Campaign values are written by whoever builds the link,
so they are inherently influenceable. `utm_content`, `utm_term`, referrer host and landing page are
**not sent to analytics at all** for this reason; they stay on the first-party row.

### 11.2 Server side

Logs remain **categories only** — verified live: `[enquiry] persistence failed { code:
'ECONNREFUSED' }`. No driver message (which can embed the database user and host), no SQL, no
parameters, no PII. Response bodies carry a closed set of machine-readable codes and no server
detail.

---

## 12. GTM — runtime verified

**Not configured. Verified anyway**, by building with a syntactically valid but **non-existent** test
container id supplied only as a shell variable, never written to any file, and rebuilt clean
afterwards. **Verified absent from the final build.**

| Check | Result |
|---|---|
| Container loads once | **PASS** — exactly one `gtm.js` request, one inline snippet (`id="gtm-script"`), one injected loader |
| Duplicate container | **None** |
| `noscript` fallback | **Present**, one |
| `dataLayer` is a real array | **PASS** — `gtm.start` present, application events queued after it |
| Application events reach the same queue | **PASS** — a conversion completed with the container loaded landed in the same `dataLayer` |
| Environment gating | **PASS** — with the variable empty: **zero** `googletagmanager` references in the served HTML of `/`, `/contact`, `/thank-you`, `/schedule-call` |
| Missing provider breaks the app | **No.** Events accumulate in an in-memory array and nothing observes them |
| Conversion id hard-coded | **None.** The application emits events; the container routes them |

### 12.1 Required container configuration — OWNER ACTION, cannot be enforced from here

**The GA4 configuration tag must have automatic page-view sending DISABLED, and a page-view tag must
trigger on the custom `page_view` event.** Leaving both the container's own load trigger *and* this
event enabled **double counts the first page of every visit**. This repository cannot see the
container, so this is stated as an owner action rather than claimed as done.

---

## 13. GA4

| | |
|---|---|
| Architecture | **Through GTM.** No direct `gtag.js`, no `gtag()` call added anywhere |
| `NEXT_PUBLIC_GA4_ID` | **Declared in `.env.example`, read by no source file.** Unchanged by this session |
| Direct `gtag` calls added | **None** |
| Conversion / key event marked in application code | **None.** Key-event configuration belongs in the platform |
| Duplicate delivery | **None** — one boundary, one push per occurrence |
| Runtime verified | **N/A — not configured** |

**Owner input:** decide whether GA4 is routed through GTM (recommended, and what this architecture
assumes) or configured directly. `NEXT_PUBLIC_GA4_ID` is currently misleading configuration: it
declares a provider nothing reads.

---

## 14. Meta

| | |
|---|---|
| Pixel | **NOT CONFIGURED** — `NEXT_PUBLIC_META_PIXEL_ID` empty |
| Environment gated | **Yes** — `lib/meta-pixel.tsx` returns early with no id |
| Changed this session | **Nothing.** Retained-or-removed is an **open OWNER decision** (`EVENT_TAXONOMY.md` §9 decision 4) |
| `Lead` on click | **No.** The only `fbq('track','Lead')` in the codebase was in `lib/tracking.ts` — **deleted** |
| `Lead` on failed submission | **No** |
| `Lead` on persisted success | **No.** No `fbq` call exists anywhere. If Meta is ever adopted, the container routes `lead_form_submitted` |
| PII | **None.** `fbq` is undefined; no payload exists |
| Conversions API | **NOT IMPLEMENTED.** No credential exists, consent is unresolved, and §17 of the brief forbids widening H2 to add it |
| Runtime verified | **NOT CONFIGURED — reported, not faked** |

**Two defects recorded, deliberately not repaired**, because repairing them means building on a
provider nobody has chosen:

1. `PageView` fires **once per document** and so misses every App Router client navigation.
2. **No consent gate.** Setting the pixel id today loads a third-party tracker unconditionally.

---

## 15. Vercel Analytics — removed

| | |
|---|---|
| Existed | **Yes** — `@vercel/analytics@1.6.1`, rendered in `app/layout.tsx` under `NODE_ENV==='production'` |
| Effective on cPanel | **NO** |
| Action | **REMOVED** — component, import and dependency |

**Evidence.** The client posts to `/_vercel/insights/event`, an endpoint that exists only on Vercel's
platform. This site is served by `server.cjs` under cPanel/Passenger: there is **no `vercel.json`, no
`.vercel` directory**, a dedicated `build:cpanel` script, a `pack-cpanel.ps1`, and
`CURRENT_INTEGRATIONS.md` §1 names the host. **Every beacon it sent could only 404.**

It was a third-party script and a dependency that **could never produce a number** — measurement
theatre on a site whose positioning is measurement honesty. **Nothing replaced it**; the dataLayer
boundary already carries pageviews.

---

## 16. Consent — UNRESOLVED, OWNER / LEGAL INPUT REQUIRED

| | |
|---|---|
| Existing mechanism | **NONE** |
| Analytics loading before consent | **Not currently possible — no provider is configured** |
| Meta loading before consent | **Same** |
| Built this session | **NOTHING.** No banner, no copy, no consent mode, no legal position |

**Why nothing was built.** Consent copy is buyer-facing legal text and the mode is a legal decision.
This programme records consent, retention and legal review as owner input. §19 of the brief forbids
inventing a legal position or silently introducing a banner with invented copy. **A cookie banner
written by an implementation session would be exactly that.**

**The safest technically neutral architecture, which is what was implemented.** The application
event boundary writes **only to `window.dataLayer`** — a first-party JavaScript array in the
visitor's own tab. **It sets no cookie, writes no persistent storage, sends no request and
identifies nobody.** Nothing is processed until a container loads, and no container loads unless the
environment variable is set. Attribution uses `sessionStorage` rather than a cookie or
`localStorage`, which is the smallest storage footprint that captures anything useful (§10.1 A).

> **BLOCKER, stated at full strength: `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` MUST NOT
> BE SET IN PRODUCTION UNTIL A CONSENT MECHANISM EXISTS.** Setting either loads a third-party script
> on every page with no gate. The site's own privacy policy states a banner is required before
> launch.

---

## 17. Pageviews

| Case | Behaviour | Verified |
|---|---|---|
| Initial page load | One `page_view` | **PASS** |
| App Router client navigation | One `page_view` per route | **PASS** — `/seo` → `/contact` → `/how-it-works` produced exactly three |
| Back / forward | One `page_view` | **PASS** |
| Refresh | One `page_view`, **no conversion** | **PASS** |
| Duplicate pageviews | **None** — a ref guards the last reported pathname, so React Strict Mode's deliberate double-effect cannot double count | **PASS** |
| Query string in `page_path` | **Never** | **PASS** — `/contact?utm_source=...&gclid=...` emitted `/contact` |

**Why this component exists at all.** GTM's container-load trigger fires **once per document**. Under
the App Router every subsequent navigation is a client render with no new document, so **without
this, a GTM site measures one pageview per visit** no matter how many pages are read. That is not
visible by reading the GTM snippet, which is why the brief required pageview behaviour to be audited
rather than assumed.

**`useSearchParams()` was deliberately NOT used.** Reading search params through the Next hook opts
every route containing it out of static rendering — it would have converted this site's static pages
to dynamic **as a side effect of adding analytics**. The query string is read from
`window.location.search` inside the effect instead. **Route modes are unchanged — §22.**

---

## 18. Contact funnel diagnostics

| Step | Event | Verified |
|---|---|---|
| Page viewed | `page_view` (`page_type: contact`) | **PASS** |
| Form started | `lead_form_started` — **once per mounted form**, on the first real field edit | **PASS — one event across six field edits** |
| Validation failure | `lead_form_validation_error` per failing field | **PASS — an empty submit produced exactly four, one per required field** |
| Server failure | `lead_form_validation_error`, `error_scope: form` | **PASS** |
| Persisted | `lead_form_submitted` | **PASS** |
| Qualification | **Not emitted** | §8 |

**Proportionality.** No keystroke tracking. No field-content tracking. No scroll depth. No focus
events — a focus fires when someone tabs past a field they never intended to fill. **The honeypot is
excluded from `lead_form_started`**: it is invisible to people, so a fill there is a machine and must
not be reported as a human starting the form.

**Error payloads are field NAME and error CATEGORY only.** `EVENT_TAXONOMY.md` §7 states that rule in
those words, and it is enforced by the reporting function's signature — it takes a `FieldName`, so
there is no parameter a value could pass through.

### 18.1 Newsletter — re-audited, no change needed

`BlogNewsletterForm.tsx` was repaired in H1: the input, the fabricated success message and the
`gtag('newsletter_signup', { email })` call that leaked a raw address are all gone. It is now a
static card stating there is no mailing list yet. **No PII can reach analytics from it, no false
success exists, and no newsletter infrastructure was built.**

---

## 19. Idempotency and duplicate control

| Case | Rows | Conversion events | Result |
|---|---|---|---|
| Rapid triple-click on submit | **1** | **1** | **PASS** |
| Retry with the same idempotency key (API) | **1** | n/a | **PASS** — server returns 201 from the duplicate path |
| Submit → 503 → retry after recovery | **1** | **1** | **PASS** — the failed attempt emitted none |
| `/thank-you` refresh | 0 | **0** | **PASS** |
| Direct `/thank-you` visit | 0 | **0** | **PASS** |
| Back navigation to `/contact` | 0 | **0** | **PASS** |
| Two genuine enquiries in one session | **2** | **2** | **PASS** — one marker each in `sessionStorage` |

**Not claimed:** cross-device or cross-browser conversion de-duplication. **It is not implemented.**
The guard is per-tab (`sessionStorage`) plus the database's unique index. A visitor who submits the
same enquiry from two devices creates two rows and two conversions, which is correct at this layer —
that is business duplicate detection, and **WQE condition 5 remains unimplemented** (§8).

---

## 20. Provider failure and no-JS

**The mandatory invariant: ENQUIRY PERSISTENCE SUCCESS MUST NOT DEPEND ON ANALYTICS DELIVERY
SUCCESS.**

**Tested by sabotage, not by inspection.** `window.dataLayer.push` was replaced with a function that
throws on every call, **and** `window.sessionStorage` was replaced with an accessor that throws on
every access. A full enquiry was then submitted through the real form.

| Result | |
|---|---|
| Typing threw | **No** |
| Submission completed | **Yes** |
| Row persisted | **Yes** |
| Visitor reached `/thank-you` | **Yes** |
| `attribution_status` | **`unavailable`** — degraded honestly, and **did not block or downgrade the enquiry** |

| Failure mode | Behaviour |
|---|---|
| GTM blocked / unavailable | Events queue in an in-memory array. Enquiry unaffected |
| GA4 unavailable | No direct GA4 code exists. Enquiry unaffected |
| Meta unavailable / blocked | No `fbq` call exists. Enquiry unaffected |
| Missing env configuration | `GoogleTagManager` and `MetaPixel` render `null`. **Zero third-party scripts. No console error, no crash** |
| `sessionStorage` unavailable | `trackOnce` fails **open**; attribution degrades to `unavailable` |
| No JavaScript | Content readable — 2,088 characters of visible text on `/contact`. The booking link is a real server-rendered `<a href>` with `target` and `rel` intact and **works without JavaScript**. The form requires JavaScript to submit, which is **H1's pre-existing architecture and unchanged here** |

**Analytics never sits inside the persistence path.** `track` and `trackOnce` swallow their own
errors and return `void`; nothing is awaited.

---

## 21. Responsive, accessibility and no-JS regression

**Analytics adds no rendered output.** `AnalyticsRouteListener` returns `null`. `BookingLink`
reproduces the Phase G markup verbatim behind a client boundary — same element, href, target, rel,
classes and inline style, with one added click handler.

| Width | `/contact` | Result |
|---|---|---|
| 390 | `scrollWidth` 390, no horizontal overflow, 1 form, 1 submit button | **PASS** |
| 860 | `scrollWidth` 845, no overflow | **PASS** |
| 1425 | `scrollWidth` 1410, no overflow | **PASS** |

| Route | Width | Result |
|---|---|---|
| `/schedule-call` | 1425 | No overflow. **One** booking link, 235×52 px — above the 44 px touch target | **PASS** |
| `/thank-you` | 1425 | No overflow. One `page_view`, **zero conversions** | **PASS** |

**Layout shift from analytics: none.** No script is loaded, no element is rendered, no style changes.
**No duplicate UI. No broken pending or success state.**

| Accessibility check | Result |
|---|---|
| Keyboard submission | **PASS** — a keyboard-driven submit produced exactly one conversion |
| Focus management on failed submit | **PASS** — focus moves to the `role="alert"` summary (`tabIndex -1`), with 4 in-summary links to the failing fields |
| Live regions | **PASS** — `aria-live="assertive"` summary and `aria-live="polite"` pending region both intact |
| `aria-required` | **PASS** — 4, in the server-rendered HTML |
| Pending / disabled state | **Unchanged** |
| Analytics interference | **None.** No event handler alters focus, announcement or activation |

---

## 22. Performance

| Metric | Delta |
|---|---|
| Dependencies | **−1 direct** (`@vercel/analytics`), 59 remaining. **Nothing added** |
| Third-party scripts | **−1** in production. **Zero loaded** with no provider configured |
| Client components added | **2** — `AnalyticsRouteListener` (returns `null`), `BookingLink` (one anchor) |
| New client modules | `lib/analytics.ts`, `lib/attribution.ts` — plain functions, no framework, no polling, no timers, no observers |
| Blocking scripts | **None.** GTM remains `afterInteractive` |
| Analytics libraries added | **None** |
| Route entries | **27 — unchanged** |
| Static / SSG routes | **26 — unchanged** |
| Dynamic routes | **1 — unchanged** (`/api/enquiry`) |

**`/contact`, `/thank-you` and `/schedule-call` all remain `○ Static`.** Adding a client component to
`/schedule-call` did **not** change its route mode, and avoiding `useSearchParams()` is why (§17).

**The Resolve performance character is preserved:** zero motion, zero polling, zero ambient work.
The route listener runs one effect per navigation and does nothing on internal moves beyond one
array push.

---

## 23. Security

| Check | Result |
|---|---|
| Secret env vars exposed to the browser | **None.** `.next/static/**` contains no occurrence of `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `mysql2` or `CONTACT_NOTIFICATION_EMAIL` |
| Access tokens bundled client-side | **None exist** |
| PII leakage | **None** — §11, verified against a live payload |
| Attribution sanitisation | **Server-authoritative.** The browser's cleaning is a convenience; every value is re-parsed, filtered and capped from the raw body |
| Length limits on campaign parameters | **100 characters**, enforced on both sides and matching the column widths |
| Injection risk | **`<` and `>` stripped** from every captured and emitted value. **SQL: 26 placeholders, 26 bound parameters, zero string literals** — asserted programmatically, not by eye |
| Client-supplied `attribution_status` | **Ignored.** Recomputed server-side from what actually survived validation, so it can never claim more context than is stored beside it |

**Hostile attribution payload, tested end to end:**

| Sent | Stored |
|---|---|
| `firstReferrerHost: "<script>alert(1)</script>"` | `"scriptalert1/script"` — cannot become markup |
| `firstSource: "victim@example.com"` | `"victimexample.com"` — no longer a valid address |
| `firstMedium: "e" × 400` | Capped at 100 |
| `firstLandingPage: "https://evil.test/x?a=1"` | `null` — not a same-origin path |
| `firstTerm: 12345` (number) | `null` |
| `firstSourceDerived: "yes"` (not boolean) | `null` |
| `latestSource: {a:1}` / `latestMedium: ["x"]` | `null` |
| `firstTouchAt: "not-a-date"` | `null` |
| `status: "complete"` (claimed) | **`"partial"` — recomputed** |
| `attribution: ["a","b"]` (array) | Enquiry **stored normally**, attribution `unavailable` |

**No Phase I security work was started** — no CSP, no HSTS, no global header changes.

---

## 24. Test matrix — contact conversion

Run against the **real** route handler, validation module, attribution parser and INSERT SQL, with a
recording fake pool injected through the `globalThis` slot `lib/db.ts` already uses for HMR. **No
production code was altered to make this testable.** Browser cases were run in a real browser against
the real production build served by `server.cjs`.

| # | Case | Row persisted | Conversion emitted | Count | PII | User flow | Result |
|---|---|---|---|---|---|---|---|
| 1 | `/contact` page load only | 0 | **No** | 0 | None | Normal | **PASS** |
| 2 | Form started (6 field edits) | 0 | **No** | 0 | None | Normal | **PASS** |
| 3 | Client validation failure (empty submit) | 0 | **No** | 0 | None | Errors shown, focus moved | **PASS** |
| 4 | Server validation failure (400) | 0 | **No** | 0 | None | Field errors returned | **PASS** |
| 5 | Malformed payload (not JSON) | 0 | **No** | 0 | None | 400 | **PASS** |
| 6 | Wrong content type | 0 | **No** | 0 | None | 415 | **PASS** |
| 7 | Oversized payload (>16 KB) | 0 | **No** | 0 | None | 413 | **PASS** |
| 8 | Rate limited | 0 | **No** | 0 | None | 429 | **PASS** |
| 9 | Database unavailable | 0 | **No** | 0 | None | 503, stays on `/contact`, **values preserved**, "not sent" stated | **PASS** |
| 10 | Successful persisted enquiry | **1** | **Yes** | **1** | None | → `/thank-you` | **PASS** |
| 11 | Rapid triple-click submit | **1** | **Yes** | **1** | None | → `/thank-you` | **PASS** |
| 12 | Same idempotency key replayed | **0 new** | n/a | — | None | 201 | **PASS** |
| 13 | Retry after 503, DB recovered | **1** | **Yes** | **1** | None | → `/thank-you` | **PASS** |
| 14 | `/thank-you` refresh | 0 | **No** | 0 | None | Normal | **PASS** |
| 15 | Direct `/thank-you` visit | 0 | **No** | 0 | None | Normal | **PASS** |
| 16 | Back navigation | 0 | **No** | 0 | None | Normal | **PASS** |
| 17 | Analytics provider unavailable (`dataLayer.push` throws) | **1** | Not delivered | 0 | None | **Unaffected — reached `/thank-you`** | **PASS** |
| 18 | Storage unavailable (`sessionStorage` throws) | **1** | Emitted (fails open) | 1 | None | **Unaffected** | **PASS** |
| 19 | Analytics env missing | n/a | Queued in memory | — | None | Unaffected, no console error | **PASS** |
| 20 | Keyboard-only submission | **1** | **Yes** | **1** | None | → `/thank-you` | **PASS** |
| 21 | Attribution absent / array / hostile | **1 each** | n/a | — | None | **Enquiry unaffected** | **PASS** |
| 22 | Conversion with GTM container loaded | **1** | **Yes** | **1** | **None** | → `/thank-you` | **PASS** |

**THE CRITICAL RULE HOLDS: only the legitimate server-confirmed persistence path produced a contact
conversion event.**

---

## 25. Test matrix — event payloads

| Event | Trigger | Authority | Payload keys | PII | Free text | Raw id | Duplicate risk | Result |
|---|---|---|---|---|---|---|---|---|
| `page_view` | Mount + pathname change | Client | `page_path`, `page_type`, `environment` | **No** | No | No | Guarded by a last-reported ref | **PASS** |
| `lead_form_started` | First real field edit | Client | + `form_id` | **No** | No | No | Once per mounted form | **PASS** |
| `lead_form_validation_error` (field) | Failed validation | Client | + `field_name`, `error_type`, `error_scope` | **No** | No | No | One per failing field per attempt | **PASS** |
| `lead_form_validation_error` (form) | Non-2xx / network | Client | + `error_type`, `error_scope`, `failure_reason` | **No** | No | No | One per attempt | **PASS** |
| **`lead_form_submitted`** | **2xx after durable persistence** | **SERVER** | + `conversion_surface`, `qualification_status`, 6 attribution keys, `attribution_status` | **No** | No | No | **`trackOnce` on the idempotency key** | **PASS** |
| `meeting_started` | Booking link click | Client | + `cta_location`, `cta_role`, `conversion_surface` | **No** | No | No | Per click, by design | **PASS** |

**Searched in the live serialised queue for test names, emails, phone numbers, company names,
websites, message strings and UUIDs. Expected: ZERO. Found: ZERO.**

---

## 26. Builds — VERIFIED FACT, both run

| Build | Result |
|---|---|
| `npm run build` | **Succeeds** |
| `npm run build:cpanel` | **Succeeds** under the unchanged `--max-old-space-size=512` ceiling |

| Metric | Before (H1) | After (H2) |
|---|---|---|
| Route entries | 27 | **27 — unchanged** |
| API routes | 1 | **1 — unchanged** |
| Dynamic (ƒ) routes | 1 | **1 — unchanged** |
| Static / SSG routes | 26 | **26 — unchanged** |
| Direct dependencies | 60 | **59** (−1) |
| Client components | — | **+2** |

**No route-mode change of any kind.** `/contact`, `/thank-you` and `/schedule-call` remain `○ Static`.

**Warnings — both pre-existing and unrelated to H2:** the Next workspace-root inference warning from
multiple lockfiles, and `[contentful] Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN`, the
documented fail-soft path.

**Type checking:** `tsc --noEmit` reports **10 errors, all pre-existing, all in files this session did
not touch** (`SocialShare.tsx`, `CategoryFilter.tsx`, `CalendlyButton.tsx`, `lib/metadata.ts`) —
**the same 10 H1 recorded. Zero new type errors.** `ignoreBuildErrors` remains on and remains Phase
I's to remove.

**Build churn restored:** `next-env.d.ts` and `tsconfig.tsbuildinfo` were rewritten by the builds and
restored. The `.next` directory and the pre-existing cPanel zip are untracked.

---

## 27. Files changed

| File | Action | Purpose |
|---|---|---|
| `lib/analytics.ts` | **Added** | The single provider-independent event boundary. Names, page types, path safety, the hard PII sanitiser, `track`, `trackOnce` |
| `lib/attribution.ts` | **Added** | Session-scoped acquisition capture: UTM, referrer derivation, click-id presence, self-referral exclusion, write-once first-touch |
| `components/analytics/AnalyticsRouteListener.tsx` | **Added** | One listener, mounted once. Pageviews under App Router navigation, and acquisition capture |
| `components/analytics/BookingLink.tsx` | **Added** | The booking link with one diagnostic `meeting_started`. Presentation byte-identical |
| `db/migrations/002_add_enquiry_attribution.sql` | **Added** | 14 nullable attribution columns + one index. No click ids, no referrer URL, no IP, no UA, no visitor id |
| `docs/27-production-translation/19_PHASE_H2_ANALYTICS_CONVERSION.md` | **Added** | This record |
| `lib/tracking.ts` | **DELETED** | Dead, and carried two live PII leaks plus an `fbq` Lead on a fetch to a non-existent endpoint |
| `lib/gtm.tsx` | Modified | **7 helper exports removed** (two leaked PII). Container loader only |
| `app/layout.tsx` | Modified | `@vercel/analytics` removed; `AnalyticsRouteListener` mounted; surfaces documented |
| `components/forms/ContactForm.tsx` | Modified | Four events; attribution attached to the submission. **The conversion sits inside `if (response.ok)`** |
| `app/api/enquiry/route.ts` | Modified | Passes attribution to the insert; documents the 201 as the conversion authority |
| `lib/enquiry-validation.ts` | Modified | Server-authoritative attribution parsing. **No failure return — it cannot fail a submission** |
| `lib/enquiries.ts` | Modified | Persists 14 attribution columns. 26 placeholders, 26 bound parameters, zero literals |
| `app/(pages)/schedule-call/page.tsx` | Modified | `<a>` → `<BookingLink>`. **No copy, layout, vendor, URL or variable change** |
| `package.json` · `package-lock.json` | Modified | `@vercel/analytics` removed |

**Not changed:** `Header` · `Footer` · `/contact` page · `/thank-you` page · homepage · commercial
routes · `CalendlyEmbed.tsx` · `BlogNewsletterForm.tsx` · `lib/meta-pixel.tsx` · `lib/schema.ts` ·
`next.config.mjs` · `.env.example` · `README.md` · migration 001 · `server.cjs` · `db-migrate.cjs`.

---

## 28. Boundaries not crossed

| H2 boundary | State |
|---|---|
| Email provider added | **None** |
| Booking backend added | **None** |
| CRM added | **None** |
| Server-side analytics delivery added | **None** — no credential exists |
| Meta CAPI | **None** |
| Consent banner | **None** — owner/legal |
| Shared footer / header changed | **None — byte-identical** |
| Route redesign | **None** |
| Prototypes / governance docs | **Untouched** |
| `README.md` | **Untouched, unstaged** |

| Phase I deferral | State |
|---|---|
| Global `Organization` / `LocalBusiness` schema | **Untouched** |
| Malformed `postalCode` containing "India" | **Untouched** |
| `robots` · `sitemap` · `/work` indexing · www redirect | **Untouched** |
| Cache / deployment headers · CSP · HSTS · canonical hardening | **Untouched** |
| `ignoreBuildErrors` | **Untouched** |
| Footer debts — F10 double close, ROI language, SEO/CRO language, heading jump, "free strategy call", `/thank-you` second ask | **Untouched — all remain Phase I's** |

---

## 29. Owner actions required — the minimum

**Nothing below is derivable from this repository.**

| # | Action | Unblocks |
|---|---|---|
| **1** | **Apply migration 002 on the production server: `npm run db:migrate`** | Attribution storage. Until it runs, the enquiry INSERT references columns that do not exist and **every submission will fail with an honest 503** |
| **2** | **Decide the consent mechanism and mode** (legal review). Until it exists, **do not set `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_META_PIXEL_ID` in production** | All analytics delivery |
| **3** | **Create a GTM container and supply `NEXT_PUBLIC_GTM_ID`**, then configure it: GA4 config tag with automatic page-view sending **DISABLED**, a page-view tag on the `page_view` event, and a conversion tag on `lead_form_submitted` | Any measurement reaching any platform |
| **4** | **Decide GA4 routing** — via GTM (assumed here) or direct. `NEXT_PUBLIC_GA4_ID` is currently read by no code | Removing misleading configuration |
| **5** | **Decide whether Meta Pixel is retained at all** (`EVENT_TAXONOMY.md` §9 decision 4) | Removing or gating `lib/meta-pixel.tsx` |
| **6** | **Booking: confirm or replace the vendor, supply the real account URL, and confirm webhook capability + signing secret** | `meeting_booked` — the second ★ conversion |
| **7** | **Set the deduplication window** for WQE condition 5 | `qualification_status`, and therefore `qualified_enquiry` |
| **8** | **Confirm or correct the §7.2 deviation** — server-AUTHORED / client-DELIVERED conversion, pending a provider credential | Reconciling the approved acceptance wording |

**Carried unchanged from H1:** transactional email provider + credential + verified sender identity;
a fallback contact route for persistence failures (blocked on the owner-blocked phone/email); CRM.

---

## 30. Rollback

Per module, and each is independent:

| To undo | Action |
|---|---|
| All analytics | Revert the commit. **H1's persistence path is untouched by it** — the conversion is additive to a 2xx that already existed |
| Just the events | Delete the `track` / `trackOnce` calls in `ContactForm.tsx`, `AnalyticsRouteListener.tsx` and `BookingLink.tsx`. The boundary becomes dead code |
| Just attribution | Remove `attribution` from the submitted payload. **The columns are nullable, so the INSERT still succeeds** |
| Just the schema | Migration 002 adds nullable columns and one index only. It **removes nothing and can be left in place** even if the application stops writing to it |
| Restore Vercel Analytics | `npm i @vercel/analytics@1.6.1` and restore the two lines in `app/layout.tsx` |

**No destructive statement exists in migration 002** — the runner refuses `DROP`, `TRUNCATE` and
`DELETE`, and there are none.

---

## 31. Result

| Measurement | Verdict |
|---|---|
| **Contact measurement** | **PASS — TRUSTWORTHY SERVER-CONFIRMED CONTACT MEASUREMENT** |
| **Qualified enquiry measurement** | **NOT YET AUTOMATABLE — QUALIFICATION STATE NOT AUTHORITATIVE** |
| **Booking measurement** | **OWNER-BLOCKED — NO SERVER-CONFIRMED BOOKING CONVERSION** |
| GTM | **NOT CONFIGURED** — application boundary verified against a test container |
| GA4 | **NOT CONFIGURED** — declared in `.env.example`, wired nowhere |
| Meta | **NOT CONFIGURED** — retained pending an owner decision |
| Vercel Analytics | **NOT APPLICABLE — removed, ineffective on cPanel** |
| Consent | **OWNER / LEGAL INPUT REQUIRED** |
| **PHASE H2** | **BLOCKED — OWNER / PROVIDER INPUT REQUIRED** |

**Why BLOCKED and not PASS.** The contact measurement architecture is complete, tested and
trustworthy, and every stop condition in the session brief was checked and none was met. But **zero
providers are configured and no consent mechanism exists**, so not one event this phase emits can
reach any platform, and the two variables that would change that **must not be set until a legal
decision exists**. Reporting PASS would imply the site is measured. It is not. It is *instrumented*,
correctly and honestly, and waiting on owner actions 1–3.

**Migration 002 is the load-bearing one.** Until it is applied on the server, the enquiry INSERT
references columns that do not exist and **the contact form will fail honestly on every
submission** — no false success, but no enquiries either.
