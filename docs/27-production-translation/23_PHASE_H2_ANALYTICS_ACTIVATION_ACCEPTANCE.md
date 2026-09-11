# Session 35 — Phase H2 — Analytics Activation and Final Measurement Acceptance

**Session:** 35 · **Date:** 2026-09-06 · **Branch:** `test_branch`
**Starting HEAD:** `c4f9259` — *docs: record production deployment acceptance*
**Application source deployed:** `1237624`, unchanged. **No application source file was modified in
this session.**

**Result: PHASE H2 — MEASUREMENT ACTIVE IN PRODUCTION AND ACCEPTED, with one time-bound
provider-side item (the GA4 key-event flag) that Google will not permit to be set until it has
processed the event. Everything upstream of that flag is verified live.**

---

## 0. The three findings that govern this record

**1. Session 34's diagnosis of the blocker was wrong, and the blocker is closed.**
Session 34 (§20.5) concluded that "the paused tags were the wrong ones" — that some *other*,
unidentified Meta and X tags were firing, because the Meta hits carried
`a=tmSimo-GTM-WebTemplate` and were therefore assumed not to be the fifteen `FB - …` tags the owner
had paused. **That inference was incorrect.** With container access, the `FB - …` tags are of tag
**type `Facebook Pixel` from the `facebookarchive` gallery** — that *is* the community template
whose signature Session 34 observed, and `FB - Lead` carries pixel id `9836…0561` (redacted), the exact
id seen on the wire. The X tag was likewise identified: **`Twitter Base Pixel`** (type
`Twitter Base Pixel`, trigger *All Pages*) — Session 34 was right that it is not one of the eight
`Twitter - …` tags, and it is a ninth tag without that prefix.

**The owner had paused the correct tags. The only reason they still fired was that the pauses were
never published**, which is the mechanism Session 34 itself identified in its own §18: *a browser
loads the published container, never a workspace.* Publishing the workspace resolved it, and the
resolution is verified on the live site in §9 below.

**2. `NEXT_PUBLIC_GTM_ID` is a BUILD-TIME input, and this was proven, not assumed.**
The brief (§17) asked whether the production environment variable alone could activate analytics.
**It cannot.** In the release running before this session, the compiled client chunk contained the
expression `o.env.NEXT_PUBLIC_GTM_ID` resolving through webpack's `process` shim, which falls back
to the `process/browser` stub whose `env` is `{}` — so in a browser it is permanently `undefined`.
Rebuilding with the variable set inlines the literal `GTM-K8ZQ…` (redacted) into
`.next/static/chunks/app/layout-*.js`. **A rebuild and redeploy was therefore mandatory**, and was
performed by the approved off-host method.

**3. The five H2 tags were sending the event NAME only.**
No event parameters were configured on any of them. `page_type`, `conversion_surface`,
`qualification_status`, `attribution_status` and the first-touch attribution fields were reaching
`dataLayer` and stopping there. The approved mapping in `20_PHASE_H2A_CONSENT_AND_GTM.md` §8 had
never been implemented. **It is implemented now** (§7), on owner instruction given during this
session.

---

## 1. Starting state — VERIFIED FACT

| Item | Value |
|---|---|
| Branch | `test_branch` |
| HEAD at start and at end | `c4f9259` (unchanged) |
| Working tree | Clean except the two pre-existing untracked items: `README.md`, `mappedskills-cpanel-20260906-101820.zip` |
| `README.md` | **Untouched, still untracked** |
| Pushed | **No** |
| Production before this session | Analytics **DORMANT** — verified live: zero `googletagmanager` references, zero third-party `<script src>`, no container id in any served asset |

---

## 2. Provider inputs and provenance

| Input | State | Provenance |
|---|---|---|
| GTM container | **SET** — `GTM-K8ZQ…` (redacted) | Account **MS**, container name **MappedSkills**. Matches the id recorded in Sessions 33 and 34 exactly. **One unambiguous match**; the only other container under the signed-in identity belongs to a different business |
| GA4 property | **SET** — property *Mapped Skills - GA4*, web stream *Mapped Skills - GA4*, measurement id `G-6H7W…` (redacted) | Matches the id on the GTM Google tag and the `tid` observed on the wire in Session 34 |
| `NEXT_PUBLIC_META_PIXEL_ID` | **UNSET**, local and production | Deliberate |
| `NEXT_PUBLIC_GA4_ID` | **UNSET** | Declared in `.env.example`, wired nowhere by design — GA4 is reached only through GTM |

**A second, stale web stream exists on the same property** — *MonsterInsights - https://mappedskills.com*,
"No data received in past 48 hours". It is **not** the stream in use and was not touched. It is
listed here as a tidy-up item, not a defect.

**Provider access.** This session had authenticated access to both the GTM container and the GA4
property through an existing signed-in browser session. **No credential was entered, requested or
read at any point.** Session 34 could not obtain this access and correctly said so.

---

## 3. Environment-variable state — names only

| Name | Local (repo) before | Production before | Production after |
|---|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | UNSET | UNSET | **SET at build time** (baked into the deployed bundle) |
| `NEXT_PUBLIC_GA4_ID` | UNSET | UNSET | UNSET |
| `NEXT_PUBLIC_META_PIXEL_ID` | UNSET | UNSET | **UNSET** |

**No value is printed in this record and no container id was committed to the repository.** The
build used a gitignored `.env.local`, which was **deleted after the build**; the repository contains
no real provider id, exactly as `lib/gtm.tsx` documents.

---

## 4. Existing measurement foundation — audited before any change

| Element | Finding |
|---|---|
| `dataLayer` creation | `lib/analytics.ts` is the sole writer; creates the array if absent so nothing queued before the container loads is lost |
| Consent defaults | Inline `<head>` script, all four signals **denied**, first entry in `dataLayer` |
| Consent update | Real `arguments`-shaped `gtag('consent','update',…)`; advertising restated as denied on every update |
| GTM loader | Two gates — id **and** explicit acceptance. Renders `null` otherwise. Double-injection guarded twice |
| Attribution | `sessionStorage`, key `ms.h2.attribution.v1`, first-touch **write-once** |
| Conversion authority | `lead_form_submitted` emitted only on `response.ok` from `POST /api/enquiry`, through `trackOnce` keyed on the idempotency key |
| Direct `gtag` call sites | **Zero** in `app/`, `components/`, `lib/` — removed in Session 34 |
| Meta Pixel | Component present, renders nothing while the id is empty, **still not consent-gated** — unchanged, and the id remains unset |
| Vercel Analytics | Absent — removed in Session 32 |
| **Result** | **Sound. No application source change was required for activation.** |

**CSP required no change.** Phase I deliberately shipped a policy with **no `default-src`, no
`script-src`, no `connect-src` and no `img-src`**, so nothing in it can restrict a provider. The
Stage-2 CSP work remains open as a hardening item, not a blocker.

---

## 5. Approved event taxonomy — unchanged

| Event | Meaning | Trigger | Conversion? | Status |
|---|---|---|---|---|
| `page_view` | Navigation | App route change, client authority | **No** | **Active, delivering** |
| `lead_form_started` | First meaningful field interaction | Once per mounted form | **No** | **Active, delivering** |
| `lead_form_validation_error` | Client or server validation rejected | Field- or form-scoped | **No** | **Active, delivering** |
| `lead_form_submitted` | **Server-confirmed durable persistence** | `POST /api/enquiry` returned 2xx | **YES — the primary enquiry conversion** | **Active, delivering** |
| `meeting_started` | Booking surface opened | Booking link activated | **No — diagnostic only** | **Active, delivering** |
| `meeting_booked` | Booking confirmed by webhook | — | Would be | **NOT IMPLEMENTED, correctly absent** |

**Nothing was renamed, added or removed.** `lead_form_submitted` was **not** renamed to
`generate_lead`.

---

## 6. GTM container configuration

| Item | Value |
|---|---|
| Container | `GTM-K8ZQ…` (redacted), account **MS** |
| Workspace state found | **64 pending changes, never published** — 50 staged by the owner before this session, plus 14 added here |
| Owner's staged work, verified correct | All 15 `FB - …`, all 8 `Twitter - …`, `Twitter Base Pixel`, `LinkedIn - Lead`, 13 legacy `GA4 - …` tags, `GA4 - Lead Form Submit` and `Conversion Linker` — **39 tags paused**; `GA4 - Configuration` set to `send_page_view = false`; five `CE - …` triggers and five `GA4 - H2 - …` tags created |
| Added in this session | **14 Data Layer Variables** and **event parameters on all five H2 tags** |
| Duplicate/competing tags | **None active.** `GA4 - Lead Form Submit` (the legacy conversion tag on the old "Lead Confirmation Mesage" trigger) is paused, so there is exactly one source of the enquiry conversion |
| **Published** | **YES — Version 4, "H2 measurement activation"**, 45 tags · 20 triggers · 32 variables |
| Preview-only? | **No.** Verified in Preview *and* published |

---

## 7. GA4 event parameters — the approved mapping, now implemented

Fourteen Data Layer Variables were created (`DLV - <field>`, Data Layer Version 2) and wired as
event parameters:

| Tag | Parameters sent |
|---|---|
| `GA4 - H2 - page_view` | `page_path`, `page_type`, `environment` |
| `GA4 - H2 - lead_form_started` | + `form_id` |
| `GA4 - H2 - lead_form_validation_error` | + `form_id`, `field_name`, `error_type`, `error_scope`, `failure_reason` |
| `GA4 - H2 - lead_form_submitted` | + `form_id`, `conversion_surface`, `qualification_status`, `attribution_status`, `first_source`, `first_medium`, `first_campaign` |
| `GA4 - H2 - meeting_started` | + `conversion_surface` |

**`latest_source` / `latest_medium` / `latest_campaign` are deliberately NOT sent**, per §8 of the
H2A record: GA4 already models last-touch, and the custom-dimension budget is real.

**One behaviour worth recording, because it is better than the plan.** `page_path` is **not** sent
as a custom parameter. Google's tag recognises it as a standard field and maps it to the collection
parameter `dp`, so it populates GA4's **native Page-path dimension** and needs no custom dimension
at all. Verified on the wire: `dp=/contact` on the conversion hit.

**Thirteen GA4 custom dimensions were registered** (all event-scoped): `page_type`, `environment`,
`form_id`, `conversion_surface`, `qualification_status`, `attribution_status`, `first_source`,
`first_medium`, `first_campaign`, `field_name`, `error_type`, `error_scope`, `failure_reason`.
Registration was done **before** production data began arriving, because custom dimensions are not
retroactive.

---

## 8. GTM Preview — the verification Session 34 could not perform

Tag Assistant was connected to a **local production build** (`next start`, real container id, real
published-workspace preview). This is the first successful Preview run in the programme.

| Consent state | Tags fired | Tags not fired |
|---|---|---|
| **Undecided** | **0** — "Google tag: GTM-K8ZQ… not found" | 45 |
| **Accepted** | `GA4 - Configuration`, `GA4 - H2 - page_view` ×5, `GA4 - H2 - lead_form_started` ×1, `GA4 - H2 - lead_form_validation_error` ×4, `GA4 - H2 - lead_form_submitted` ×1, `GA4 - H2 - meeting_started` ×1 | **39 — every Meta, X, LinkedIn and legacy GA4 tag** |

**Third-party hosts contacted across the whole accepted journey: `googletagmanager.com` and
`google-analytics.com` only.** `connect.facebook.net`, `facebook.com/tr` and
`static.ads-twitter.com`: **zero requests**. `fbq`, `twq`, `lintrk`: **undefined**. Cookies created:
`_ga` and `_ga_6H7W…` only — **no `_fbp`, no `_gcl_*`**.

**The queue-replay design was proven:** the app's first `page_view` is pushed before the container
exists, and `GA4 - H2 - page_view` still fired for it once the container loaded. No approved event
is lost to the race.

---

## 9. Live production verification — clean browser context

Performed on `https://mappedskills.com` after deployment, in a browser with no Tag Assistant session
and no prior state.

| State | Third-party requests | Cookies | Vendor globals | Result |
|---|---|---|---|---|
| **No choice** | **ZERO** | **ZERO** | `google_tag_manager`, `gtag`, `fbq`, `twq`, `lintrk` all **undefined**; **0** GTM `<script>` tags | **PASS** |
| **Reject**, then 3 route changes | **ZERO** | **ZERO** | all **undefined** | **PASS** |
| **Reopen preferences from the footer** | banner returns | — | — | **PASS** |
| **Accept** | `googletagmanager.com` + `google-analytics.com` **only** | `_ga`, `_ga_6H7W…` **only** | `fbq`, `twq`, `lintrk` **undefined** | **PASS** |

**GA4 hit parameters on the live site:** `tid` = the expected property · **`gcs=G101`** —
`ad_storage` DENIED, `analytics_storage` GRANTED, exactly `DEC-020` · **`npa=1`**.

**The `DEC-020` blocker recorded at the end of that decision is resolved:** accepting analytics on
the live site now starts **no** Meta, X or LinkedIn tracking and sets **no** advertising cookie.

**A test artefact, recorded so it is not misread later.** In the *other* browser — the one running
Tag Assistant — the undecided state showed two requests to `googletagmanager.com/gtag/js?id=DUMMY`
and a defined `google_tag_manager`. These are **Tag Assistant's own debug instrumentation**, not the
application: the DOM contained **zero** GTM script tags and the app's `__msGtmLoaded` flag was
`false`. The clean-context result above is the one that describes real visitors.

---

## 10. Live conversion acceptance test

One clearly synthetic enquiry, entered through the real form on the live site, with the campaign
`utm_source=h2_test` · `utm_medium=qa` · `utm_campaign=measurement_acceptance`.

| Check | Required | Observed |
|---|---|---|
| Enquiries before | baseline | **3** |
| Submit clicks | 3, in immediate succession | 3 |
| Network `POST /api/enquiry` | 1 | **1** |
| Durable rows created | 1 | **1** (total 3 → 4) |
| `lead_form_submitted` in `dataLayer` | exactly 1 | **1** |
| GA4 receipt | yes | **Realtime: `lead_form_submitted` present** |
| Landed on `/thank-you` | yes | **yes** |
| PII in the event payload | none | **none** |

**Conversion payload — every field, verbatim:**
`event`, `environment=production`, `page_path=/contact`, `page_type=contact`,
`form_id=contact_enquiry`, `conversion_surface=form`, **`qualification_status=not_evaluated`**,
`first_source=h2_test`, `first_medium=qa`, `first_campaign=measurement_acceptance`,
`latest_source/medium/campaign` (same), `attribution_status=complete`.
**No name, no email, no company, no message, no phone, no website, no database identifier, no `@`.**

**Persisted attribution matched the analytics event exactly** — the database row carried
`first_source=h2_test`, `first_medium=qa`, `first_campaign=measurement_acceptance`,
`attribution_status=complete`, `first_source_derived=0`, `first_landing_page=/`. **The campaign
survived the reject→accept transition and three internal App Router navigations before submission,
and was never overwritten by a referrer.**

---

## 11. Live negative tests — zero conversions, every case

| Case | `lead_form_submitted` |
|---|---|
| Submit with required fields empty | **0** (4 field-scoped validation errors, field **names** only) |
| Direct visit to `/thank-you` | **0** |
| Refresh of `/thank-you` | **0** |
| Browser back navigation | **0** |
| Booking link activated | **0** — `meeting_started` ×1, `meeting_booked` ×0 |

**A booking click never becomes an enquiry conversion, and no booking completion is invented.**

---

## 12. Analytics-failure invariant — sabotaged on the live site

`dataLayer.push` was replaced with a function that throws; `Storage.prototype.setItem` and
`getItem` were replaced with functions that throw; `google_tag_manager` was set to `undefined`. Then
a complete enquiry was submitted.

| Check | Result |
|---|---|
| `dataLayer.push` calls that threw | **3** — the analytics layer genuinely failed |
| Uncaught errors reaching the page | **0** |
| `POST /api/enquiry` | **1** |
| Durable row created | **1** |
| User reached `/thank-you` with the success state rendered | **yes** |
| `attribution_status` persisted | **`unavailable`** — honest, because storage was unreadable |

**A total analytics failure cannot prevent an enquiry from being stored or a visitor from
succeeding.** The enquiry was still accepted with its attribution honestly marked unavailable rather
than being rejected — which is the behaviour `ATTRIBUTION_MODEL.md` requires.

---

## 13. Exactly-once

| Scenario | Logical enquiries | `dataLayer` conversions |
|---|---|---|
| Triple click, live production | 1 | **1** |
| Triple click, local Preview | 1 | **1** |
| Real server failure (503, local) | 0 | **0** |
| Thank-you refresh | 0 | **0** |

Provider **network** requests and logical `dataLayer` events are recorded separately and did not
diverge: GA4 batches several events into a single POST body, which is why request counts and event
counts do not match one-for-one and why **Realtime, not resource timing, is the authority on
receipt**.

---

## 14. PII audit

| Surface | Result |
|---|---|
| App `dataLayer` — every key across the whole live journey | **No name, email, phone, company, message, website, database id. No `@` anywhere** |
| GA4 collection parameters (`ep.*`, `dp`, `dt`, `dl`) | **Clean** |
| Browser network | **Clean** |
| Production application log | **Clean** — only the pre-existing Contentful credential warning |
| **PII found** | **NONE** |

**One residual exposure, stated rather than glossed.** GA4's own `dl` (document location) carries
the **full URL including the query string**, which the application deliberately strips from
`page_path`. A campaign URL that contained personal data in a UTM parameter would reach GA4 through
`dl` even though `lib/analytics.ts` would have stripped it. **Mitigation available and not yet
enabled:** the data stream's *Redact data* feature shows **Email: inactive** and **URL query
parameter keys: inactive**. Turning on email redaction is a one-click hardening item, listed in §18.

---

## 15. Production deployment

| Item | Value |
|---|---|
| Required | **YES** — proven, not assumed (§0.2) |
| Method | **Off-host build → audited artifact → manual release-directory swap**, the Session 34 approved method |
| Built from | `c4f9259`, application source identical to `1237624`; the only difference is the build-time container id |
| `npm run build` | Compiled successfully, 25 routes |
| `npm run build:cpanel` | Compiled successfully, **`BUILD_ID uECyJCAevQKC9-wGdaodE`** |
| Artifact | 29 MB, **918 entries**, sha256 verified **identical after upload** |
| Artifact hygiene | **No `.git`, no `.env*`, no `docs/`, no `node_modules`, no `README.md`, no `.zip`, no `.DS_Store`** — verified by entry-list scan |
| Real GA4 / Meta / Ads ids inside the artifact | **NONE** — only the GTM container id, which is the intended public value |
| Rollback point | Independent archive `app-pre-h2-*.tar.gz` (27 MB) **plus** the previous release retained in place at `mappedskills.com.prev-h2-20260906-141122` |
| Dependency delta | **None** — `package.json` dependencies byte-identical, so no `npm install` on the host |
| Migration 002 | Present in the artifact, **already applied, not re-run** |
| Database schema | **Untouched** |
| Production env vars / `.htaccess` | **Never read for values, never written** |
| Restart | `cloudlinux-selector restart --json` → `{"result": "success"}` |
| GitHub workflow used | **No** |
| `git push` / merge to `main` | **No** |
| Build on production host | **No** |

**Post-deploy live check:** `/`, `/contact`, `/thank-you`, `/schedule-call`, `/services` all **200**;
consent default block present; **zero third-party `<script src>` in served HTML** (correct — the
loader is client-side and consent-gated); the container id is present in the served
`layout-*.js` chunk.

---

## 16. Production regression sweep

Widths **390 · 860 · 1425**, routes `/`, `/contact`, `/thank-you`, `/schedule-call`.

| Check | Result |
|---|---|
| Horizontal overflow | **0 at every width and route** (`scrollWidth === clientWidth`) |
| Correct `<h1>` on every route | **yes** |
| Contact form fields render | **8, intact** |
| Footer *Analytics preferences* control | **present, reopens the banner** |
| Booking link | **present** |
| Console errors | **none** |
| Duplicate GTM injection | **none** — one container, guarded twice |
| CSP breakage | **none** — no CSP change was needed |
| Provider-induced functional delay | none observed |

---

## 17. Synthetic data cleanup

Two synthetic rows were created — one for the conversion test, one for the sabotage test — both
under the same unique company marker so cleanup could be a single precise operation.

| Check | Result |
|---|---|
| Rows before cleanup | **5** |
| Target rows matched (marker **and** explicit id list) | **2** |
| Rows deleted | **2** |
| Rows after | **3** — the exact pre-session baseline |
| Remaining rows matching the marker | **0** |
| Pre-existing production rows changed | **0** — surviving ids are the original three |
| Table columns | **30, unchanged** |
| Migration ledger rows | **2, unchanged** |

The deletion was scoped by marker **and** an explicit two-id allow-list, and aborted itself unless
exactly two rows matched. **No broad deletion was used.** The temporary host-side query scripts were
deleted afterwards. **No database credential was ever printed or placed in a report.**

**GA4 retains this session's synthetic events** — roughly one synthetic `lead_form_submitted` from
the live test plus one from local Preview, and their supporting diagnostic events. **They are not
removable safely and were not removed.** They are documented here as synthetic verification traffic
dated 2026-09-06. Local Preview traffic came from `localhost` and can be excluded with a hostname
filter (§18).

---

## 18. Remaining measurement limitations

| # | Item | Blocking? | Exact action |
|---|---|---|---|
| 1 | **GA4 key event not yet flagged.** `lead_form_submitted` is confirmed arriving (Realtime), but GA4's Admin → Events list still shows only the five older event names. **This UI has no "new key event by name" control**; an event can only be starred once GA4 has *processed* it, which takes up to 24 hours | **No — provider processing latency, not an implementation gap** | Admin → Data display → Events → **Recent events** → star **`lead_form_submitted`**. Do **not** star `page_view`, `meeting_started` or any thank-you view. The legacy `Lead` and `purchase` key events should be unstarred once nothing depends on them |
| 2 | GA4 `dl` carries query strings the app strips | No | Data stream → **Redact data** → enable **Email** redaction |
| 3 | Local/dev traffic not excluded from the property | No | GA4 data filter on `hostname = localhost`, or a GTM trigger condition on Page Hostname. **`environment` is NOT a reliable filter** — a local *production* build reports `environment=production` |
| 4 | Stale second web stream *MonsterInsights - https://mappedskills.com* | No | Delete or archive it; it receives no data |
| 5 | `meeting_booked` not implemented | No | Requires a Calendly webhook and a server endpoint — the owner-blocked booking-measurement decision, unchanged |
| 6 | `MetaPixel` component still not consent-gated | **No, while the id stays unset** | If Meta is ever activated, gate it on consent **first**. Setting `NEXT_PUBLIC_META_PIXEL_ID` today would fire `PageView` for every visitor regardless of choice |
| 7 | Stage-2 CSP (`script-src` / `connect-src` for Google) | No | Decide together with the nonce-vs-static-rendering trade-off |
| 8 | Banner wording not legally reviewed; `/privacy-policy` still says a consent mechanism "should be added before launch" | No | Legal review, then correct the policy text |
| 9 | 39 paused legacy tags retained | No | They are paused, not deleted, so the container's history is intact and reversible. Delete only after a retention decision |

---

## 19. Meta

**META PIXEL: NOT ACTIVATED — OPTIONAL / OWNER-DEFERRED.** `NEXT_PUBLIC_META_PIXEL_ID` is unset,
`fbq` is undefined on the live site, no Meta request is made in any consent state, and no `_fbp`
cookie is created. **Meta does not block H2 and none was created.**

---

## 20. Files changed in this session

| File | Change |
|---|---|
| `docs/27-production-translation/23_PHASE_H2_ANALYTICS_ACTIVATION_ACCEPTANCE.md` | **New** — this record |
| `docs/27-production-translation/20_PHASE_H2A_CONSENT_AND_GTM.md` | Closing section added recording activation and the corrected §20.5 diagnosis |
| `docs/00-project/CURRENT_STATE.md` | H2 status updated |
| `docs/00-project/DECISION_LOG.md` | `DEC-021` added |

**No application source file was created, modified or deleted.** `README.md` untouched. Nothing
pushed. `main` unchanged.

---

## 21. Verdict

| Area | State |
|---|---|
| Real GTM container | **ACTIVE — published Version 4** |
| Real GA4 property | **ACTIVE — receiving, verified in Realtime** |
| Consent architecture | **VERIFIED LIVE** — undecided, reject, accept, reopen, change, reload, SPA navigation |
| Advertising tags under accepted analytics | **NONE FIRE** — the `DEC-020` blocker is closed |
| Conversion authority | **VERIFIED** — durable server persistence is the only trigger |
| Exactly-once | **VERIFIED** — 3 clicks → 1 row → 1 event |
| GA4 receipt of the conversion | **VERIFIED** |
| Event parameters and custom dimensions | **IMPLEMENTED AND VERIFIED** |
| Attribution | **VERIFIED** — campaign captured, write-once, database and analytics agree |
| PII | **ZERO** |
| Analytics failure blocking an enquiry | **IMPOSSIBLE — sabotage-tested live** |
| Negative cases | **ZERO conversions, every case** |
| Production functionality | **UNCHANGED — no regression at any width** |
| Synthetic data | **REMOVED — baseline exactly restored** |
| GA4 key event flag | **PENDING — provider processing latency, ≤24h** |

**PHASE H2 — MEASUREMENT IS ACTIVE IN PRODUCTION AND ACCEPTED**, with the single time-bound
provider action in §18 item 1 to complete the reporting layer. Everything the application, the
container and the property control is verified live.
