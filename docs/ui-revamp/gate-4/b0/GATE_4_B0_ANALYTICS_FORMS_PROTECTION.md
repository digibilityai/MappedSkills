# Gate 4 · B0 — Analytics and Form Protection Report

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Script** | `docs/ui-revamp/gate-4/qa/analytics-forms.cjs` · baseline `evidence/baseline/analytics-forms.json` |
| **Build** | Plain production build `Njk8Lb5t9GSJ5FzVFuAJQ` of `352bb25`, Chromium 151 (Playwright) |
| **Safety** | Every non-local request was aborted by the harness (Calendly, GTM, social, vendors). `POST /api/enquiry` was **intercepted and answered by the harness**, so no request reached the application server or a database. Values were synthetic (`b0-fixture@example.invalid`). **No lead was created, no booking was opened, no analytics left the machine** |
| **Reproducibility** | A second run is identical: `analytics-forms.cjs --compare` → 0 differing sections. A deliberately removed `lead_form_submitted` event is detected (exit 1, `evidence/validation/negative-controls.txt`) |

## 1. What the application instruments (VERIFIED)

| Surface | Emitter | Events |
|---|---|---|
| Every route | `AnalyticsRouteListener` (path-based) | `page_view` |
| `/contact` | `ContactForm` | `lead_form_started` (once per mounted form), `lead_form_validation_error`, `lead_form_submitted` (2xx only, `trackOnce`) |
| `/schedule-call` | `BookingLink` | `meeting_started` |
| All | Consent bootstrap (inline, `<head>`), `ConsentProvider`, `ConsentBanner`, footer `ConsentPreferencesLink`; `GoogleTagManager` and `MetaPixel` (both gated) | `consent default` / `consent update` commands |

**No `data-*` analytics attributes exist anywhere** (inventory, 34 targets). Any GTM trigger must key on URL, `href`, text, class, ID
or element position (see §6).

## 2. Consent (baseline)

| State (`ms.consent.v1`) | `dataLayer` commands | Banner | GTM script | Meta Pixel |
|---|---|---|---|---|
| undecided | `consent default` (ad_storage, ad_user_data, ad_personalization, analytics_storage all **denied**) | shown | absent | absent |
| denied | `consent default` (all denied) | hidden | absent | absent |
| granted | `consent default` (all denied) → `consent update` (analytics_storage **granted**, ads denied) | hidden | **absent: `NEXT_PUBLIC_GTM_ID` is empty locally** | absent |
| Banner interaction | buttons "Accept analytics", "Reject analytics". Accept → `consent update` granted, banner removed, stored `granted` | — | — | — |

- Served-HTML order: the inline bootstrap is preceded by **0 synchronous scripts** on every route that renders it. Next's chunk
  scripts before it are all `async`.
- **OBS-1 (pre-existing):** on dynamically rendered not-found responses, the bootstrap is not executed (`GATE_4_B0_KNOWN_DEFECTS.md`).
- **Not testable locally:** GTM container load, tags and triggers. The container ID is empty, and loading Google's script is
  out of bounds for this harness. **This is E6.**

## 3. `page_view`

**First load** (one event per route; `page_path|page_type`):

| Route | page_type |
|---|---|
| `/` | homepage |
| `/services`, `/seo`, `/google-ads` | commercial |
| `/problems/traffic-but-no-enquiries` | problem |
| `/pricing` | pricing |
| `/how-it-works` | methodology |
| `/about` | about |
| `/contact` | contact |
| `/schedule-call` | booking |
| `/blog` | editorial |
| `/research` | research |
| `/faq`, `/thank-you`, `/press`, `/work`, `/privacy-policy`, `/terms`, 404 | other |

**Client navigation walk:** `/` → `/services` → `/seo` → `/about` → `/how-it-works` → `/`, then browser back → `/how-it-works`.
That gave **exactly one `page_view` per navigation (7)**, with correct path and type. It crosses the Direction C ↔ legacy chrome seam
in both directions. `environment` = `production` (a production build).

## 4. BookingLink

`/schedule-call` renders **one** Calendly anchor in `<main>` ("Open the booking page", `target=_blank`, `rel="noopener noreferrer"`).
Activating it emitted exactly one `meeting_started`:

```
page_path=/schedule-call · page_type=booking · cta_location=inline · cta_role=direct · conversion_surface=booking
```

The Calendly request was blocked by the harness (1 blocked). Header and footer "Book a call" links go to `/schedule-call`, an internal
route, and emit `page_view`, not `meeting_started`. **B1 must not change this.**

## 5. ContactForm boundaries

**Field contract** (DOM order):

| # | Field | Type | Required | Autocomplete | Notes |
|---|---|---|---|---|---|
| 0 | `contactReference` | text | — | off | **honeypot**: `tabindex=-1`, hidden from people |
| 1 | `name` | text | `aria-required` | name | — |
| 2 | `email` | email | `aria-required` | email | — |
| 3 | `company` | text | `aria-required` | organization | — |
| 4 | `message` | textarea | `aria-required` | — | — |
| 5 | `phone` | tel | — | tel | — |
| 6 | `website` | url | — | url | — |
| 7 | `marketingConsent` | checkbox | — | — | — |
| 8 | submit | button | — | — | — |

The form uses `aria-required` (custom validation), not the HTML `required` attribute.

**Boundaries** (`/api/enquiry` mocked):

| Case | Requests | Ends on | Events | User-facing result |
|---|---|---|---|---|
| Empty submit | **0** | `/contact` | 4 × `lead_form_validation_error` (`required`, one per required field) | Error summary (`role=alert`) **receives focus**; 4 fields `aria-invalid` |
| Typing | — | — | `lead_form_started` **exactly once** | — |
| 2xx | 1 | **`/thank-you`** | `lead_form_started`, **`lead_form_submitted`** (`conversion_surface=form`, `qualification_status=not_evaluated`) | — |
| 400 with a field error | 1 | `/contact` | `lead_form_validation_error` (`server`, field `email`) | Field message shown |
| 429 | 1 | `/contact` | `lead_form_validation_error` (`rate_limited`) | "Wait a few minutes…" |
| 500 | 1 | `/contact` | `lead_form_validation_error` (`server`) | "Nothing you typed has been lost" |
| Network failure | 1 | `/contact` | `lead_form_validation_error` (`server`) | "Could not reach the server" |

- **No `lead_form_submitted` on any non-2xx outcome.**
- **Request body keys:** `attribution`, `company`, `contactReference`, `elapsedMs`, `email`, `idempotencyKey`, `marketingConsent`, `message`,
  `name`, `phone`, `sourcePage`, `website`.
- **Attribution keys:** 14 first- and latest-touch fields plus `status`.
- Honeypot sent empty.
- `sourcePage` = `/contact`.

## 6. E6 — exact outstanding work (not done; needs owner access)

1. Export the GTM container (owner) or grant read access.
2. Inventory every trigger. For **B1** in particular, list any trigger whose condition uses:
   - the legacy header or footer (classes such as `sticky`, Tailwind utilities, element position);
   - the "Contact Us" / "Book a call" link **text**. Direction C keeps the same text and `href`; the DOM nesting changes;
   - click classes or IDs on the mobile menu (`#mobile-menu` becomes `#dc-mnav`).
3. Native GTM **Form Submission** triggers: the form submits with `fetch` and `preventDefault`, so a DOM submit listener may never
   fire. Confirm which signal the container uses. The repository's contract is the `lead_form_submitted` `dataLayer` event.
4. Validate in **GTM Preview** against a local release-candidate build with `NEXT_PUBLIC_GTM_ID` set and consent accepted.
5. Decide OBS-1 (bootstrap on dynamic 404s) with the container's consent settings in view.

**B1 status against E6:** B1 changes chrome DOM on 25 templates. Any trigger keyed on legacy header or footer DOM would stop
firing there. E6 remains mandatory **before staging** (`DEC-036`). It does not block local B1 work. **Doing E6 before B1 acceptance
is recommended.**

## 7. Re-running

```bash
node docs/ui-revamp/gate-4/qa/analytics-forms.cjs --plain http://localhost:<port> --out <dir>/analytics-forms.json
node docs/ui-revamp/gate-4/qa/analytics-forms.cjs --compare docs/ui-revamp/gate-4/b0/evidence/baseline/analytics-forms.json <dir>/analytics-forms.json
```
