# Session 22 — Phase A0 — Live Deployment Baseline

**Session:** 22 · **Date:** 2026-09-04 · **Branch:** `test_branch` · **HEAD:** `91a82b7`
**Type:** **OBSERVATION ONLY.** No production code, configuration, governance or prior planning
artefact was modified. No form was submitted. No conversion was triggered.

**Observation window:** 2026-09-04, 02:11:49 – 02:14 GMT (server `date` headers).
**Method:** `curl` against the live deployment. All headers below are copied from real responses.

**Evidence labels are used strictly and are never collapsed:**
**CONFIGURED** = read from the repository · **OBSERVED** = seen in a live response ·
**INFERRED** = a conclusion drawn from the two, and labelled as such.

---

## 1. Infrastructure

**OBSERVED.**

| | |
|---|---|
| Resolved IP | `68.66.216.9` |
| `server` | **`LiteSpeed`** |
| `x-powered-by` | `Next.js` |
| Protocol | HTTP/2, with `alt-svc: h3=":443"` advertised |
| **CDN in front** | **None detected.** **No `age`, no `x-cache`, no `cf-cache-status`, no `x-served-by` on any response tested.** Requests appear to reach the LiteSpeed origin directly |
| Next.js cache | `x-nextjs-cache: HIT`, `x-nextjs-prerender: 1`, `x-nextjs-stale-time: 300` |

**INFERRED:** this is the cPanel / LiteSpeed shared-host path that `package.json`'s `build:cpanel`
script exists for, served through `server.cjs`. Consistent with, but not proof of, that pipeline.

## 2. The cache finding — Session 21's RESEARCH REQUIRED item, now resolved

### 2.1 The question

`next.config.mjs` **CONFIGURED** `Cache-Control: public, max-age=31536000, immutable` for
`source: '/:path*'`, with an intended override for `'/:path*.(html|xml)'`. Session 21 recorded that
App Router document routes carry no `.html` extension and therefore could not match the override —
but declined to assert the runtime consequence, because Next.js sets its own `Cache-Control` on
rendered responses and **which one wins was not observed.**

### 2.2 The answer

> ### **OBSERVED: the custom header wins. `max-age=31536000, immutable` is served on live HTML document responses.**

Identical on every 200 HTML route tested, on **both** hosts:

```
GET https://mappedskills.com/            → cache-control: public, max-age=31536000, immutable
GET https://mappedskills.com/services    → cache-control: public, max-age=31536000, immutable
GET https://mappedskills.com/seo         → cache-control: public, max-age=31536000, immutable
GET https://mappedskills.com/contact     → cache-control: public, max-age=31536000, immutable
GET https://mappedskills.com/schedule-call → cache-control: public, max-age=31536000, immutable
```

`content-type: text/html; charset=utf-8` on all of them.

### 2.3 The override pattern works — for `.xml`, which proves the mechanism and the gap

**OBSERVED:**

```
GET /sitemap.xml → cache-control: public, max-age=3600, must-revalidate
```

The `'/:path*.(html|xml)'` override **does** match `/sitemap.xml`. It matches nothing else, because
**no App Router document route has a file extension.** This is direct evidence that the rule is
extension-matched and that HTML pages fall outside it — not an inference about pattern semantics.

### 2.4 Responses that are *not* affected

**OBSERVED:**

| Response type | `cache-control` |
|---|---|
| **404** (`/portfolio`, `/this-route-does-not-exist-a0check`) | `private, no-cache, no-store, max-age=0, must-revalidate` — **Next's own header wins here** |
| **308 redirects** (`/contact-us`, `/seo-services`, `/results`, `/digital-marketing-services`) | **No `cache-control` header at all.** Redirects are not cached immutable |
| `/robots.txt` | **No `cache-control`.** Served as a static file (`last-modified`, `accept-ranges: bytes`) |
| `/ms_Logo.webp` | **No `cache-control`.** Static file |
| `/_next/static/chunks/*.js` | `max-age=31536000, immutable` — **correct**; these are content-hashed |

### 2.5 Repeat-request behaviour

**OBSERVED.** Five requests to `/` at ~3s intervals, three to `/services`:

- `etag` **identical every time** (`"kft1e73gau50gl"` for `/`, `"v1ejflxew34own"` for `/services`).
- **No `age` header on any response.**
- `x-nextjs-cache: HIT` on every request.
- `date` advanced normally; no other header changed.

Cache-busting query string (`/?cb=<epoch>`): still `200`, still `immutable`, **same `etag`**, and
`x-nextjs-cache` reported `STALE` once — Next's own ISR revalidation at its 300s `stale-time`,
which is server-side and healthy.

### 2.6 What this actually means — stated precisely

**OBSERVED facts, then one clearly-labelled inference.**

The server-side caching is **fine**. `x-nextjs-cache`/`x-nextjs-stale-time: 300` is Next's ISR,
revalidating every 5 minutes, and a redeploy invalidates it.

**The hazard is the browser cache, and it is real.** `immutable` is a directive that tells a client
**not to revalidate at all** for the lifetime of the entry — it suppresses the conditional request
that `etag` would otherwise satisfy, including on an ordinary reload. A one-year `max-age` with
`immutable` on an HTML document means:

> **INFERRED (from the observed header, and from the defined semantics of `immutable`):** any
> visitor who has loaded a page keeps that exact HTML for up to one year, and a redeploy does not
> reach them. Only a hard refresh, a cleared cache, or a different URL would.

**This has not been reproduced end-to-end in a real browser in this session, and is labelled
INFERRED rather than OBSERVED for that reason.** The header is observed; the browser's response to
it is derived from the directive's specification.

**Severity: HIGH.** **Scope: the entire public site.** **Age of the defect: pre-existing** — it is
in `next.config.mjs` at `91a82b7` and predates all Resolve work.

## 3. Canonical host — no www redirect

**OBSERVED.**

| Test | Result |
|---|---|
| `http://mappedskills.com/` | **301** → `https://mappedskills.com/` — host preserved |
| `http://www.mappedskills.com/` | **301** → `https://www.mappedskills.com/` — **host preserved; it does not fold to the apex** |
| `https://www.mappedskills.com/` | **200. No redirect.** |
| `https://www.mappedskills.com/services` | **200. No redirect.** |
| `https://www.mappedskills.com/contact` | **200. No redirect.** |
| `https://www.mappedskills.com/seo?utm_source=test&x=1` | **200. No redirect.** Path and query preserved |

**Both hosts serve byte-identical content** — the `etag` for `/` is `"kft1e73gau50gl"` and the
`content-length` is `233929` on **both** apex and www.

**The mitigation that exists:** **OBSERVED** — the HTML `<link rel="canonical">` on `www` points to
the **apex**:

```
https://www.mappedskills.com/services  →  <link rel="canonical" href="https://mappedskills.com/services">
```

So the duplicate is declared, but not redirected. HTTPS is enforced; **host canonicalisation is
not.** This is **CONFIGURED absent** (no host redirect in `next.config.mjs` or `server.cjs`) and
**OBSERVED absent**.

## 4. Security headers

**OBSERVED on live HTML responses.**

| Header | Present | Value | Configured in repo? |
|---|:--:|---|---|
| `strict-transport-security` | **YES** | `max-age=63072000; includeSubDomains` | **NO** — added at the LiteSpeed/cPanel layer |
| `x-content-type-options` | YES | `nosniff` | yes |
| `x-frame-options` | YES | `SAMEORIGIN` | yes |
| `x-xss-protection` | YES | `1; mode=block` | yes |
| `referrer-policy` | YES | `strict-origin-when-cross-origin` | yes |
| `permissions-policy` | YES | `camera=(), microphone=(), geolocation=()` | yes |
| `content-security-policy` | **NO** | Checked explicitly on `/`, `/services`, `/contact` — **0 occurrences** | no |

> **Correction to the Session 21 audit.** `00_REPOSITORY_AUDIT.md` §9 recorded *"No CSP. No HSTS"*.
> That was accurate **as a statement about the repository** and is wrong as a statement about the
> deployment: **HSTS is live** with a two-year max-age and `includeSubDomains`, applied outside the
> application. **CSP remains genuinely absent.** The prior document is not edited — this record
> supersedes that one line.

`vary` on HTML: `rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch,
Accept-Encoding`. `etag` present on HTML; `last-modified` present only on statically-served files.

## 5. robots.txt — the static file wins, and the GPTBot flag was wrong

**OBSERVED.** `GET /robots.txt` → `200`, `content-type: text/plain`, `content-length: 681`,
`last-modified: Fri, 21 Aug 2026 05:37:20 GMT`, `accept-ranges: bytes`, **no `cache-control`, and
none of the Next.js security headers.**

The **served body is `public/robots.txt`, not `app/robots.ts`.** It contains:

```
User-agent: *          Allow: /
Sitemap: https://mappedskills.com/sitemap.xml
Crawl-delay: 0.1
Googlebot Allow: /   ·   Bingbot Allow: /  (Crawl-delay: 1)
Disallow (bad bots): MJ12bot · AhrefsBot · SemrushBot
Disallow: /admin/    ·    Disallow: /api/
Allow: /api/sitemap  ·    Allow: /api/rss
```

| Agent | Live status |
|---|---|
| **GPTBot** | **NOT mentioned. NOT disallowed.** Permitted by `User-agent: * Allow: /` |
| **CCBot** | **NOT mentioned. NOT disallowed.** Permitted by `User-agent: * Allow: /` |

> **Correction to the Session 21 audit and risk register.** `00_REPOSITORY_AUDIT.md` §9 and
> `08_RISK_REGISTER.md` **R20** both treated the GPTBot/CCBot disallow in `app/robots.ts` as live.
> **It is not live.** The static file shadows the route handler on this deployment.
>
> **This does not make the finding go away — it changes its shape into a latent trap.** The
> disallow **still exists in `app/robots.ts` at `91a82b7`**. Anyone who deletes
> `public/robots.txt` as tidy-up — an entirely reasonable-looking change, since two robots sources
> is obvious duplication — **activates a site-wide GPTBot and CCBot block as a side effect.**
> **R20 is re-rated: likelihood MEDIUM → LOW-but-latent; impact unchanged at HIGH; and the
> mitigation changes from "decide the policy" to "decide the policy *before* anyone deletes the
> static file".**

**Note for Phase H1:** the live robots.txt carries `Disallow: /api/`. That does not affect form
`POST`s (robots.txt governs crawling, not user agents submitting forms), but the future enquiry
endpoint lives under a path the file disallows, and that should be a deliberate choice.

## 6. sitemap.xml

**OBSERVED.** `200`, `content-type: application/xml`,
`cache-control: public, max-age=3600, must-revalidate`, `x-nextjs-cache: HIT`.

**15 `<loc>` entries**, all static:

`/` · `/services` · `/google-ads` · `/social-media-ads` · `/lead-generation` · `/seo` ·
`/conversion-optimization` · `/how-it-works` · `/work` · `/pricing` · `/about` · `/blog` ·
`/contact` · `/schedule-call` · `/faq`

**Zero blog entries and zero case-study entries.** `app/sitemap.ts` **CONFIGURED** appends both
from Contentful; **OBSERVED** neither appears.
**INFERRED:** Contentful returns nothing in production — consistent with `/blog` rendering
*"No articles found"* (**OBSERVED**) and with `lib/contentful/client.ts` failing soft to `null`
when credentials are absent. Whether the cause is missing credentials or an empty space **was not
determined and is not asserted.**

Correctly absent: `/thank-you`, `/terms`, `/privacy-policy`, `/launch-checklist`.
**Present and problematic: `/work`** — see §7.

## 7. Live page sanity

**OBSERVED.**

| Route | Title | Canonical | Robots meta | H1 | JSON-LD `@type`s |
|---|---|---|---|:--:|---|
| `/` | **`Performance Marketing Agency \| 300%+ ROI \| MappedSkills`** | `https://mappedskills.com/` | `index, follow` | **1** | Organization · LocalBusiness · PostalAddress · ContactPoint · City |
| `/services` | `Performance Marketing Services \| Google Ads, Meta Ads, SEO & Lead Generation \| MappedSkills` | `.../services` | `index, follow` | **1** | + Service · OfferCatalog · Offer · FAQPage · Question · Answer · BreadcrumbList · ListItem · Country |
| `/seo` | `SEO Services for Businesses \| Organic Traffic Growth \| MappedSkills` | `.../seo` | `index, follow` | **1** | **Only the global set — no page-specific schema** |
| `/contact` | `Contact Performance Marketing Agency \| MappedSkills` | `.../contact` | `index, follow` | **1** | + FAQPage · Question · Answer · BreadcrumbList · ListItem |
| `/schedule-call` | — | — | — | **1** | — |
| `/thank-you` | — | — | **`noindex, nofollow`** | — | — |
| `/work` | — | — | **`index, follow`** | — | — |

`<meta name="viewport" content="width=device-width, initial-scale=1">` present on all four tested.

**Confirmations of prior findings, now OBSERVED live rather than read from source:**

1. **The `300%+ ROI` claim is live in the homepage `<title>`** — the `DEC-007`-prohibited claim.
2. **`"postalCode":"India"`** is live in the emitted `Organization`/`LocalBusiness` schema, together
   with `"addressCountry":"IN"`. The malformed value the owner-blocker register prohibits carrying
   forward is currently being published. **No `foundingDate` is emitted** — correct, given that
   fact is blocked and unverified.
3. **`/seo` emits no page-specific structured data** — only the two global blocks from the layout.
4. **`/work` is `index, follow` and is in the sitemap.** Session 21 flagged this as a risk to fix;
   it is **live now**, not a future risk.
5. **`/blog` renders *"No articles found"*.**

### 7.1 Contact form — client-stubbed, confirmed live

**OBSERVED** in the served HTML of `/contact`:

```html
<form class="space-y-6">
```

**No `action`. No `method`.** Fields carrying `name=`: `name`, `email`, `phone`, `company`,
`website`, `message`. Two further controls carry `id="service"` and `id="budget"` (Radix `Select`
components, whose hidden inputs are created client-side) — **8 fields total, including the budget
field the approved CRO architecture removes.**

**Verdict: client-stubbed only.** This is the live defect where a visitor sees
*"Thank You! We've received your enquiry"* while nothing is transmitted. **No form was submitted
in this session.**

### 7.2 Booking — non-functional

**OBSERVED** on `/schedule-call`: the page renders the fallback string
**"Calendly booking link is not configured yet."** No Calendly script is loaded.

### 7.3 Analytics — nothing is live

**OBSERVED.** Every `<script src>` on `/` is a first-party Next.js chunk:

```
/_next/static/chunks/{webpack,main-app,polyfills,layout,page,210,334,597,638,795,907,6b68e428}*.js
```

| Signal | Occurrences in served HTML |
|---|:--:|
| `googletagmanager.com/gtm.js` · `GTM-` · GTM `<noscript>` iframe | **0** |
| `connect.facebook.net` · `fbq(` | **0** |
| `gtag(` | **0** |
| `assets.calendly.com` · `calendly.com` | **0** |
| `_vercel/insights` | **0** |

**INFERRED:** `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` are unset in production, so
`lib/gtm.tsx` and `lib/meta-pixel.tsx` return `null` as designed. Vercel Analytics is
production-gated in `app/layout.tsx` and this host is not Vercel.

> **Consequence worth stating plainly: there is currently no analytics of any kind in production.**
> This corroborates `CURRENT_TO_FUTURE_URL_MAP.md` §0 — *"no analytics of any kind runs in
> production"* — as an **OBSERVED** fact rather than a Session 07 claim. It also means the
> two live PII defects in `lib/tracking.ts` are **latent, not currently leaking**, because no
> `dataLayer` consumer is loaded. They must still be deleted in Phase H2.
>
> It also means **there is no measured baseline of any kind to regress against.** Nothing about the
> redesign's effect on traffic, rankings or conversion will be comparable to a "before".

## 8. Configured vs observed

| Area | CONFIGURED | OBSERVED | Conclusion |
|---|---|---|---|
| **Cache — HTML** | `immutable` intended for assets; `.html\|.xml` override intended to exempt pages | **`immutable` served on every HTML page**; override matches `.xml` only | **MISMATCH — the intent fails. Session 21's RESEARCH REQUIRED is resolved against the deployment** |
| **Cache — assets** | `immutable` | `immutable` on `/_next/static/*`; **no `cache-control` at all** on `/ms_Logo.webp` and `/robots.txt` | Partially as intended; static files bypass the rule |
| **Cache — errors/redirects** | not specified | 404 → `no-store`; 308 → no header | **Safe.** Next's own headers win for 404 |
| **HTTPS** | not configured in repo | **301 http→https, host preserved** | Enforced at the host layer |
| **www redirect** | **none** | **none — www serves 200** | **MATCH (both absent).** Duplicate host live, mitigated only by `<link rel="canonical">` → apex |
| **robots** | `app/robots.ts` disallows GPTBot + CCBot | **`public/robots.txt` is served; neither agent is disallowed** | **MISMATCH — the route handler is shadowed. R20 was wrong about live state and becomes a latent trap** |
| **sitemap** | 15 static + Contentful blog + case studies | **15 static only** | Contentful contributes nothing; `/work` is listed while empty |
| **Forms** | no backend; `setTimeout` stub | **`<form>` with no `action`/`method`; 8 fields incl. budget** | **MATCH — confirmed non-functional** |
| **Booking** | badge API against an inline container | **"not configured yet" fallback** | **MATCH — confirmed non-functional** |
| **Analytics** | GTM + Pixel + Vercel, all env-gated | **zero third-party scripts** | **MATCH — nothing live; no baseline exists** |
| **Security headers** | 5 in `next.config.mjs`; no CSP; no HSTS | **those 5 + HSTS live**; **CSP absent** | **HSTS is added outside the app — corrects the Session 21 audit.** CSP genuinely absent |
| **Entity schema** | `postalCode` malformed | **`"postalCode":"India"` live** | **MATCH — the prohibited value is being published now** |
| **Homepage title** | contains `300%+ ROI` | **live** | **MATCH — a prohibited claim is in production** |

## 9. Cache-risk conclusion

- **Is immutable HTML caching actually happening?** **YES, at the response-header level —
  OBSERVED**, on every HTML page tested, on both hosts.
- **Evidence:** `cache-control: public, max-age=31536000, immutable` with
  `content-type: text/html` on `/`, `/services`, `/seo`, `/contact`, `/schedule-call`; and
  `/sitemap.xml` receiving the intended `max-age=3600, must-revalidate`, which demonstrates the
  override matches file extensions only.
- **Not observed:** a real browser refusing to refresh. The client-side consequence is **INFERRED**
  from the `immutable` directive's defined behaviour, and is flagged as such.
- **Severity: HIGH. Pre-existing, not introduced by any Resolve work.**
- **Phase A impact: none.** Phase A is local, uncommitted foundation work on `test_branch` and its
  acceptance sweep runs locally. **Deployment impact: severe** — a redesign deployed under this
  header would not reach returning visitors, the owner could not reliably review it, and any
  measurement would mix two versions of the site.

## 10. A0 decision

> ### **B — PHASE A MAY PROCEED WITH A KNOWN NON-BLOCKING DEPLOYMENT ISSUE**

**Why not C.** The cache rule does not affect Phase A's work or its acceptance criteria, which are
local. Blocking foundation work on a deployment-time defect would stall the programme for no
safety gain.

**Why not A.** This is not ordinary technical debt to be noted and deferred. It is a live
misconfiguration that **would make the visual rollout materially misleading at the moment it is
deployed** — which is exactly the standard the C criterion names. It is downgraded from C only
because that moment is not Phase A.

**The issue becomes a hard blocker at the first deployment boundary**, and the fix is one
`next.config.mjs` change — which is Phase A's own file. **It should be folded into Phase A rather
than deferred to Phase I**, where `06_IMPLEMENTATION_SEQUENCE.md` currently places it.

## 11. Required Phase A precautions

1. **Fold the cache fix into Phase A.** Scope the `immutable` rule to `/_next/static/:path*` and
   `/:path*.(js|css|woff2|png|jpg|svg|webp|ico)`, and give document routes a short
   `s-maxage` + `must-revalidate` policy. **Do not rely on the `'/:path*.(html|xml)'` override — it
   is now OBSERVED not to match document routes.**
2. **Verify the fix against a live response**, not against the config. That is the lesson this
   session exists to record.
3. **Do not delete `public/robots.txt` during Phase A cleanup.** Deleting it silently activates the
   GPTBot/CCBot disallow in `app/robots.ts`. Resolving the two-source duplication requires the
   orchestrator's AI-crawler policy decision **first**.
4. **Do not add a www redirect in Phase A.** It is a live-traffic change with SEO consequences and
   belongs in Phase I with the other host-level work, deliberately decided.
5. **Treat HSTS as already live and externally managed.** `max-age=63072000; includeSubDomains` is
   applied outside the application; do not duplicate it in `next.config.mjs` and do not assume the
   repository controls it.
6. **Run the Phase A 21-route acceptance sweep locally**, against a local build. The production
   cache would otherwise contaminate the comparison.
7. **Record that there is no analytics baseline.** No before/after traffic, ranking or conversion
   comparison will be available for the redesign. Do not promise one.
8. **Leave the live prohibited content alone in Phase A.** The `300%+ ROI` title and the
   `"postalCode":"India"` schema are live now and are Phase F/G scope. Phase A changes tokens,
   fonts and the ground — not copy or schema.
9. **`build:cpanel` must pass at the Phase A boundary**, given the 512 MB heap and single-worker
   constraints of the observed LiteSpeed host.

## 12. Corrections this session makes to Session 21 artefacts

**Recorded here rather than by editing the prior documents, which were not to be modified.**

| Artefact | Statement | Correction |
|---|---|---|
| `00_REPOSITORY_AUDIT.md` §9 | *"No CSP. No HSTS"* | **HSTS is live** (`max-age=63072000; includeSubDomains`), applied outside the application. **CSP remains absent.** The original sentence was true of the repository and false of the deployment |
| `00_REPOSITORY_AUDIT.md` §9 · `08_RISK_REGISTER.md` **R20** | GPTBot/CCBot are disallowed in production | **They are not.** `public/robots.txt` shadows `app/robots.ts`. **R20 changes from a live defect to a latent trap** triggered by deleting the static file |
| `05_FORMS_ANALYTICS.md` §3.2 · `08_RISK_REGISTER.md` **R4** | Cache rule effect **RESEARCH REQUIRED** | **RESOLVED — OBSERVED.** The custom header wins on HTML. R4's likelihood moves from MEDIUM to **CERTAIN**; its impact is unchanged |
| `06_IMPLEMENTATION_SEQUENCE.md` Phase I | Cache fix scheduled in Phase I | **Recommend moving into Phase A**, whose scope already includes `next.config.mjs`-adjacent foundation work |
| `08_RISK_REGISTER.md` **R14** (PII in analytics) | *"already live"* | **Latent, not leaking.** No analytics consumer is loaded in production. The deletion requirement in Phase H2 is unchanged |
