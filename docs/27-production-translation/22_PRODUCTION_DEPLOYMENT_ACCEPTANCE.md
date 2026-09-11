# Session 34 — Controlled Production Deployment and Live Acceptance

**Status: PASS — PRODUCTION DEPLOYMENT ACCEPTED.**

Deployment performed 2026-09-06. Manual, off-host build, artifact upload, release-directory
swap. No `git push`, no merge to `main`, no GitHub Actions run, no build on the production host.

**No credential value, no database password and no enquiry PII appears anywhere in this record.**
Environment variables are recorded by NAME only.

---

## 1. Starting state — VERIFIED FACT

| Item | Value |
|---|---|
| Branch | `test_branch` |
| HEAD | `1237624e0c6364a8fbb16ce4be910e8b935657ee` (`1237624`) |
| `origin/test_branch` | `4780d4b` — remote is BEHIND local; nothing was pushed in this session |
| Working tree | Clean except two pre-existing untracked items: `README.md`, `mappedskills-cpanel-20260906-101820.zip` |
| `README.md` | Untouched, unmodified, unstaged |
| Deployed artifact source | `1237624`, unmodified |

---

## 2. Pre-deployment live baseline

Captured before any production change.

| URL | Status | Redirect | `Cache-Control` | Notes |
|---|---|---|---|---|
| `https://mappedskills.com/` | 200 | none | `s-maxage=60, stale-while-revalidate=31535940` | correct |
| `https://www.mappedskills.com/` | **200** | **none** | same, **same `etag`** | **DEFECT — duplicate host, no canonicalisation** |
| `https://mappedskills.com/contact` | 200 | none | `s-maxage=31536000` | shared-cache only |
| `/schedule-call`, `/thank-you`, `/work` | 200 | none | — | — |
| `/robots.txt` | 200 | none | **absent** | **DEFECT — served as a static file, 681 bytes, none of the app's security headers** |
| `/sitemap.xml` | 200 | none | `public, max-age=3600, must-revalidate` | correct |
| unknown path | 404 | none | — | correct |
| `http://mappedskills.com/` | 301 → HTTPS | LiteSpeed | — | correct |

**Baseline security headers:** `X-XSS-Protection: 1; mode=block`, **no `Content-Security-Policy`**.
Both are Phase I changes not yet live at baseline.

**Baseline JSON-LD, robots meta and 404 behaviour** were consistent with the pre-Phase-I build
(`BUILD_ID J48kHGwAkButa5MuHEpEG`, deployed 2026-09-06 00:48 local host time).

---

## 3. Hosting resource limits — PARTIALLY UNKNOWN, stated honestly

The production account is CloudLinux + CageFS. **The numeric LVE limits are not readable from
this account.** Every available route was tried and each is recorded with its actual result:

| Probe | Result |
|---|---|
| `lveinfo`, `lveps`, `lvectl`, `cloudlinux-statistics` | not present in the user PATH (root-only tools) |
| `/proc/lve/list`, `/proc/lve/usage`, `/proc/lve/per-lve/` | `Operation not permitted` — blocked by CageFS |
| `/sys/fs/cgroup/**` | not mounted inside the cage |
| cPanel UAPI `LveInfo` | module `Cpanel::API::LveInfo` **not installed on this server** |
| cPanel UAPI `ResourceUsage` | returns disk, files, bandwidth, domains — **no memory/CPU/NPROC/EP limits** |

| Resource | Limit | Observed | Source | Result |
|---|---|---|---|---|
| LVE id | `lve1228` | — | `/proc/self/cgroup` | VERIFIED FACT |
| PMEM | **UNKNOWN** | 143 MB serving process; 308 MB across all three | `ps` | not readable from account |
| VMEM | **UNKNOWN** | — | — | not readable |
| NPROC | **UNKNOWN** (`ulimit -u` reports the host-wide 509533, not the LVE cap) | 3 node processes | `ps` | not readable |
| Entry processes | **UNKNOWN** | — | — | not readable |
| CPU | **UNKNOWN** | 0.4 % on the serving process | `ps` | not readable |
| IO / IOPS | **UNKNOWN** | — | — | not readable |
| File usage | 600,000 | 411,145 | UAPI `ResourceUsage` | headroom |

**Deployment implication, and why this did not stop the deployment.** The unknown is a *numeric*
one. The *behavioural* question — "does this application run stably within whatever the limit
is?" — was answered by measurement instead: **zero resource faults, zero crashes, zero restarts
across the full acceptance sweep** (§16–§28 below, 150+ live requests including a real form
submission). This is the same honest UNKNOWN recorded in `21_PHASE_I_LAUNCH_HARDENING.md` §C4.5,
carried forward unchanged rather than replaced with a guess.

**This also confirms the Phase I finding that "512 MB" is a V8 heap build flag, not a host limit.**
No host limit of 512 MB was found, because no host limit was readable at all.

---

## 4. Production environment architecture — VERIFIED FACT

| Item | Value |
|---|---|
| Host | `mi3-cl9-ats2.a2hosting.com` (Hosting.com / A2 shared cPanel) |
| Stack | cPanel + CloudLinux (CageFS, LVE) + **LiteSpeed** + Passenger-compatible `lsnode` |
| Node application root | `/home/mappeds1/mappedskills.com` |
| Domain document root | `/home/mappeds1/public_html` — **separate from the app root; this matters, see §21** |
| Node | v22.23.2 (`~/nodevenv/mappedskills.com/22`) |
| npm | 10.9.8 |
| Startup file | `server.cjs` |
| Application mode | `production`, status `started` |
| Process mechanism | LiteSpeed `lsnode` under CloudLinux Node.js Selector |
| Restart mechanism | `cloudlinux-selector restart --interpreter nodejs --app-root mappedskills.com`, plus `tmp/restart.txt` |
| `node_modules` | symlink → `~/nodevenv/mappedskills.com/22/lib/node_modules` |
| Passenger config | `~/public_html/.htaccess` — `PassengerAppRoot`, `PassengerStartupFile server.cjs` |
| Environment variable NAMES on the app | `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `NODE_ENV` |
| Environment variable names ABSENT | `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `CONTENTFUL_*`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CALENDLY_URL`, `ENABLE_INTERNAL_PAGES` |
| Secret values printed | **None in this record** |

**The absent analytics names are the mechanism by which analytics stays dormant.** Nothing was
changed to achieve it and nothing was changed to preserve it.

### 4.1 One operational note recorded rather than hidden

The host's `cloudlinux-selector get --json` command **returns configured environment variable
values, including the database password, in its output.** It was run once during environment
discovery before that was known. The value was not recorded, not written to any file, and does
not appear in this document or in the repository. The same value is also stored in cleartext by
CloudLinux itself in `~/public_html/.htaccess` (`SetEnv DB_PASSWORD`), which is that platform's
normal behaviour for Node.js Selector environment variables. **`/.htaccess` was verified to
return 403 over HTTPS**, so it is not web-readable. No action was taken; recorded as a hosting
platform characteristic the owner should be aware of.

---

## 5. Database pre-flight

| Item | State |
|---|---|
| Connectivity | **PASS** — `npm run db:verify`, no credential echoed |
| Server | MariaDB `10.6.19-MariaDB-cll-lve` |
| Database | `mappeds1_enquiries` |
| Tables before | `enquiries`, `schema_migrations` |
| `enquiries` columns before | **16** |
| Rows before | **3** |
| Migration 001 | **applied** — `2026-09-06T05:10:04.509Z` |
| Migration 002 | **PENDING** — and the file was **not present on the server at all** |
| Ledger | `schema_migrations`, intact, checksums matched |

---

## 6. Database backup / recovery point

| Item | Value |
|---|---|
| Mechanism | `mysqldump --single-transaction --routines --triggers` |
| Credential handling | Written to a `mktemp` defaults-file at mode 600 by Node from the process environment, deleted immediately after; **never on a command line, never printed** |
| File | `~/production_backups_private/mappedskills_enquiries/enquiries-pre-002-20260906-094439.sql` |
| Size / perms | 4921 bytes, mode `600`, in a mode `700` directory |
| Integrity | 2 `CREATE TABLE`, 2 `INSERT INTO`, `-- Dump completed` marker present |
| sha256 | `2c609e7b9a635ea3aa97dcc68a0624c278c27a3ded340c417e32cd6b28e6f2f0` |
| Restore available | Yes — `mysql < file`, same account |
| PII exposure | **None.** The dump contains enquiry data and **stays on the server** in a mode-700 directory. It was never downloaded, never copied into the repository, and never printed |

A first dump attempt failed harmlessly (`No database selected`) and left an 842-byte fragment.
It was renamed `PARTIAL-DO-NOT-RESTORE-094421.sql.bad` so it can never be mistaken for a
recovery point.

---

## 7. Migration 002

**Ordering invariant held: the migration was applied BEFORE the new application was deployed.**

| # | Step | Result |
|---|---|---|
| 1 | Reviewed `002_add_enquiry_attribution.sql` | 14 `ADD COLUMN IF NOT EXISTS` (all NULLable, one `NOT NULL DEFAULT 'unavailable'` ENUM) + 1 `ADD INDEX IF NOT EXISTS`. **Additive only. No DROP / TRUNCATE / DELETE** |
| 2 | Uploaded the file only (not the application) | `scp` to `db/migrations/` |
| 3 | Checksum match, local vs server | `224973ec550c5c3765c897ada011ad797d3fed9c1ca5c9c60a2549c298943e2d` — identical |
| 4 | `npm run db:status` | `001 applied`, `002 PENDING` |
| 5 | **`npm run db:migrate`** | `skip 001` · `apply 002 (2 statements)` · `PASS — 1 migration(s) applied` |
| 6 | `npm run db:status` | both `applied` |
| 7 | Ledger | `002_add_enquiry_attribution.sql` @ `2026-09-06T13:47:30.337Z` |
| 8 | Schema verified | **30 columns** (16 + 14). All 14 present, none missing |
| 9 | Index | `idx_enquiry_first_source_created` **present, 2 parts** |
| 10 | Data | **Row count unchanged at 3.** No destructive side effect |

**Application deployed before migration: NO.**

---

## 8. Local build — off-host, from `1237624`

| Build | Command | Result |
|---|---|---|
| Standard | `npm run build` | Compiled successfully. 25 routes |
| **cPanel (authoritative)** | `npm run build:cpanel` | Compiled successfully. 25 routes. **`BUILD_ID OfnIUHO7IFlLn8PKhSASa`** |

- `prebuild` file check passed (`verify-server-files.cjs`).
- Route modes unchanged: all `○ Static` / `● SSG`; only `ƒ /api/enquiry` is dynamic.
- Warnings: `Detected additional lockfiles: pnpm-lock.yaml` (pre-existing, harmless — the
  lockfile is not shipped), and `[contentful] Missing CONTENTFUL_SPACE_ID or
  CONTENTFUL_ACCESS_TOKEN` (expected; fails soft to empty content).
- **Build ran on the developer machine. Nothing was built on the production host.**

**Node version note.** The artifact was built on Node v24.16.0 and runs on the host's Node
v22.23.2. `node_modules` is not shipped — the host resolves its own — and the build output is
portable JavaScript. Verified by the live acceptance sweep below, not assumed.

---

## 9. Deployment artifact

| Item | Value |
|---|---|
| Built from | `1237624` |
| File | `mappedskills-deploy-1237624-20260906-191558.tar.gz` |
| Size | 27 MB, 911 entries |
| sha256 (local) | `18cd5250fbc233708101873de9fa9c1b2f546c08067bbae5923b495d02afd3df` |
| sha256 (after upload) | **identical** |
| Contents | `app/ components/ hooks/ lib/ public/ scripts/ db/ .next/` + `server.cjs package.json package-lock.json next.config.mjs postcss.config.mjs tsconfig.json next-env.d.ts components.json` |
| `.git`, `.env*`, `README.md`, `docs/`, `node_modules`, `*.zip`, `.DS_Store`, `tsbuildinfo` | **all absent — verified by entry-list scan** |
| Real GTM / GA4 / UA / AW / Meta IDs | **NONE** |
| Placeholder IDs | `GTM-XXXXXXX`, `G-XXXXXXXXXX` — literal placeholders inside `/launch-checklist`, an internal page that **404s in production** (verified live, §22) |
| `db/migrations/002` included | Yes |

`styles/` was listed in the legacy `pack-cpanel.ps1` include list but **does not exist in the
repository at `1237624`**; it was omitted. A stale `styles/` directory from August remains in the
previous release directory only and is not referenced by the build.

---

## 10. Previous release and rollback assets

| Item | Value |
|---|---|
| Previous `BUILD_ID` | `J48kHGwAkButa5MuHEpEG` |
| Previous release retained at | `/home/mappeds1/mappedskills.com.prev-20260906-094959` (intact, in place) |
| Independent archive | `~/production_backups_private/mappedskills_app/app-pre-1237624-20260906-094639.tar.gz` (41 MB, 1847 entries, mode 600) |
| sha256 | `6b641cad6809b3d20d4723d5fefbf2130fe3ee4ee909ffa29da63ee8637208c4` |
| DB recovery point | §6 |

---

## 11. Deployment method

**Release-directory swap.** Chosen over extract-over-the-top because the previous release
contained files deleted at `1237624` — most importantly `public/robots.txt`, whose survival would
have silently defeated the Phase I robots change.

1. Artifact uploaded to `~/deploy_staging/`; checksum re-verified on the host.
2. Extracted to `~/mappedskills.com.new/` — **production untouched at this point**.
3. Runtime-only files carried across: `app.js`, `tmp/`, and the `node_modules` symlink.
4. Staged tree verified: `BUILD_ID` correct, `verify-server-files.cjs` passed, migration 002
   present, **no `public/robots.txt`**, **no `lib/constants.ts`**.
5. Swap: `mv mappedskills.com mappedskills.com.prev-20260906-094959` then
   `mv mappedskills.com.new mappedskills.com`.

| Constraint | Held |
|---|---|
| GitHub workflow used | **No** |
| `git push` / merge to `main` | **No** |
| Build on production host | **No** |
| `npm install` on host | **Not required** — the only dependency delta was the *removal* of `@vercel/analytics`; no new dependency was added, verified by diffing `package.json` |
| Production environment variables | **Preserved** — never read, written or overwritten |
| `~/public_html/.htaccess` (Passenger + env config) | **Untouched** |
| Persistent data | **Preserved** — database untouched by the application deploy |

---

## 12. Restart

| Item | Value |
|---|---|
| Mechanism | `cloudlinux-selector restart --interpreter nodejs --app-root mappedskills.com` → `"result": "success"`, plus `touch tmp/restart.txt` |
| Startup | Clean. No startup error, no crash loop |
| Serving process | 1 (`lsnode`), `cwd` → `/home/mappeds1/mappedskills.com` |
| Runtime RSS | 143 MB after the full acceptance sweep |
| Restarts / crashes during acceptance | **0** |

**Observation carried forward as an operational item, not a defect.** Two long-idle `lsnode`
processes survived the restart with `cwd` still pointing at the previous release directory
(0.0 % CPU; 0 s and 20 s total CPU time). They are **not serving**: 24 consecutive homepage
fetches returned the new build's asset hashes without exception, and the old build's CSS now
returns 404. LiteSpeed retires idle workers on its own. Left alone deliberately — killing
processes to tidy a healthy deployment is a needless risk.

---

## 13. Release identification — production is serving `1237624`

| Evidence | Value |
|---|---|
| `BUILD_ID` on the server | `OfnIUHO7IFlLn8PKhSASa` — identical to the local `build:cpanel` output |
| Live HTML asset reference | `/_next/static/css/c697332d8788be81.css` — **exists only in the new release** |
| Previous release CSS | `13552d45aa37ebcf.css`, `14fb342a1091f3d8.css`, `2ba1624713ee0a3c.css` — the first now returns **404** live |
| Stale-cache exclusion | 24 consecutive fetches, 24 referenced the new hashes; `etag` on `/contact` changed `czm40246hb1hxu` → `z6moazp7lx1g9s` immediately after deploy, with no purge |

---

## 14. Immediate health check

`/` 200 · `/contact` 200 · `/robots.txt` 200 · `/sitemap.xml` 200.
No 500. No startup loop. No missing asset. CSS present and applied. Fonts `document.fonts.status
== "loaded"`. No runtime exception in the log.

---

## 15. Live contact acceptance — **PASS**

One controlled submission through the real form, synthetic data, from a real browser.

| Check | Result |
|---|---|
| Form loads | Yes |
| Fields | name, work email, company, "what you're trying to fix" (required); phone, website (optional); marketing-consent checkbox; hidden honeypot |
| **Budget field** | **ABSENT** — matches Gate 6 |
| Client validation | Present (labels, required markers, live field errors) |
| `POST /api/enquiry` | **201** |
| Success navigation | Redirected to `/thank-you`, `<h1>` "Your enquiry has arrived.", `noindex, nofollow` |
| **Durable row** | **VERIFIED** — row count 3 → 4 |
| Row metadata (no PII) | `source_page=/contact`, `screening=clean`, `attribution_status=unavailable`, `notification_status=unconfigured`, `first_source=direct`, `first_medium=none`, `first_landing_page=/contact`, `latest_source=direct`, `marketing_consent=0` |
| **Migration 002 attribution columns** | **Populated by the live application** — proves code and schema agree |
| Duplicate rows | **None** — exactly one row in the window |
| Fake success | **None** — the 201 followed a real INSERT |
| PII printed | **None.** Name, email, company and message were never selected or displayed |

### 15.1 Failure acceptance — **PASS**

Tested without destabilising production. No connectivity was broken, no database was taken down.

| Test | Response | False success | Leakage |
|---|---|---|---|
| Malformed JSON body | `400 {"ok":false,"error":"malformed"}` | No | None |
| Missing required fields | `400 {"ok":false,"error":"validation","fieldErrors":{…}}` | No | None |
| Wrong `Content-Type` | `415 {"ok":false,"error":"unsupported_media_type"}` | No | None |
| `GET` on a POST-only route | `405` | No | None |

No SQL text, no driver message, no table name, no stack trace, no connection detail in any
response.

### 15.2 Idempotency — **PASS**

Two identical `POST`s with the same `idempotencyKey` (`825fc125-…`). Both returned `201 {"ok":true}`.
**Exactly one durable row exists for that key.** A `UNIQUE` constraint on `idempotency_key` is
confirmed present in `information_schema`. Production was not flooded — four writes total.

### 15.3 Synthetic rows left in production

**[SUPERSEDED — see §38. Both rows were removed during Session 34 closure.]**

At the time of acceptance, **two synthetic test rows remained** in `enquiries` (row count 3 → 5), both clearly marked in their
message text as Session 34 acceptance tests with `@example.com` addresses. They were left in
place rather than deleted: deleting production rows is destructive, was not requested, and the
migration runner deliberately refuses `DELETE`. **Owner action, optional:** remove them when
convenient.

---

## 16. WWW → apex — **PASS** (previously a live defect)

| Test | Chain | Final URL | Path | Query | Result |
|---|---|---|---|---|---|
| `http://www.mappedskills.com/` | 301 (LiteSpeed) → `https://www…` → **308 (app)** | `https://mappedskills.com/` | — | — | PASS |
| `https://www.mappedskills.com/` | **308 (app)** | `https://mappedskills.com/` | — | — | PASS |
| `https://www.mappedskills.com/contact?x=1` | **308 (app)** | `https://mappedskills.com/contact?x=1` | **preserved** | **preserved** | PASS |

Controlling layer: **the application** (`has: [{ type: 'host' }]` in `next.config.mjs`). LiteSpeed
does not intercept first. No loop. **No duplicate 200 host** — the baseline defect is closed.

## 17. HTTP → HTTPS — **PASS**

Apex and www both 301 to HTTPS. Controlling layer: **Hosting.com / LiteSpeed** (301 arrives before
the application). `Strict-Transport-Security: max-age=63072000; includeSubDomains` is set by the
host and **is not duplicated by the application**. The only two-hop chain is `http://www` →
`https://www` → apex, which is inherent to the host owning the scheme upgrade and the app owning
the host canonicalisation.

---

## 18. Cache — **PASS**

| URL | `Cache-Control` | `Age` | Layer | Result |
|---|---|---|---|---|
| `/` | `s-maxage=60, stale-while-revalidate=31535940` | absent | app | PASS |
| `/work` | `s-maxage=60, stale-while-revalidate=31535940` | absent | app | PASS |
| `/contact` | `s-maxage=31536000` | absent | app | PASS — shared-cache only |
| `/services` | `s-maxage=31536000` | absent | app | PASS |
| `/thank-you` | `s-maxage=31536000` | absent | app | PASS |
| `/sitemap.xml` | `public, max-age=3600, must-revalidate` | absent | app | PASS |
| `/robots.txt` | `public, max-age=0, must-revalidate` | absent | app | PASS |
| 404 | `private, no-cache, no-store, max-age=0, must-revalidate` | absent | app | PASS |
| `/api/enquiry` | `no-store` | absent | app | PASS |
| `/_next/static/css/*.css` | `public, max-age=31536000, immutable` | absent | app | PASS — content-hashed |

- **No HTML is served `immutable`. No HTML carries a browser `max-age`.** The Phase A defect
  (`public, max-age=31536000, immutable` on documents) is absent.
- **`s-maxage=31536000` on static routes is the documented Phase I residual** (§11 of the Phase I
  record). It is ignored by browsers.
- **The deployment verification that residual required is now answered: LiteSpeed is NOT holding
  HTML.** No `Age` header appears on any HTML response, no `X-LiteSpeed-Cache` header is present,
  and the new build appeared immediately after the swap with a changed `etag`. Three repeated
  `/contact` fetches returned a stable, current `etag`.
- **Cache purge required: NO. Cache purge performed: NO.**

---

## 19. Robots — **PASS, after a host-configuration fix**

### 19.1 The defect: two shadows, not one

Phase I deleted `public/robots.txt` so that `app/robots.ts` would finally be live. Deploying that
change exposed a **second shadow that Phase I could not have seen**: LiteSpeed serves static files
from the domain document root (`~/public_html`) *before* handing the request to the Node
application, and `~/public_html/robots.txt` had existed since **19 November 2021**.

Removing only the application-level shadow therefore did not reveal `app/robots.ts` — it revealed
the older document-root file:

| Stage | Served | Bytes |
|---|---|---|
| Baseline | `mappedskills.com/public/robots.txt` (app-level shadow) | 681 |
| After the release swap | `public_html/robots.txt` (**document-root shadow**) | 31 |
| After the fix | **`app/robots.ts`** | — |

The 31-byte file was `User-agent: *` + `Crawl-Delay: 20` — **no `Sitemap:` line and no bad-bot
rules at all.**

### 19.2 The fix — authorised by the owner before it was made

Classified **A — HOST CONFIGURATION DEFECT**. `~/public_html/robots.txt` was backed up to
`~/production_backups_private/robots.txt.docroot-shadow-20260906-100849.bak` (mode 600) and moved
out of the document root to
`~/production_backups_private/robots.txt.docroot-removed-20260906-100849`. No file was deleted.
Fully reversible by moving it back. **No application file and no crawler policy was edited.**

### 19.3 Live result

`GET /robots.txt` now returns `app/robots.ts` output, with the application's `X-Content-Type-Options`
and `cache-control: public, max-age=0, must-revalidate` — matching the Phase I specification
exactly:

```
User-Agent: *          Allow: /   Disallow: /admin/   Disallow: /api/
User-Agent: Bingbot    Allow: /   Disallow: /admin/   Disallow: /api/   Crawl-delay: 1
User-Agent: MJ12bot    Disallow: /
User-Agent: AhrefsBot  Disallow: /
User-Agent: SemrushBot Disallow: /
Host: https://mappedskills.com
Sitemap: https://mappedskills.com/sitemap.xml
```

**GPTBot: not named. CCBot: not named.** Both were absent from the old file and are absent from
the new one, so **live crawler policy for them is unchanged** and the open owner/programme
decision (**R20**) is untouched. **No crawler policy was invented or altered during deployment.**

---

## 20. Sitemap — **PASS**

| Check | Result |
|---|---|
| Status | 200, `application/xml` |
| `<loc>` count | **16** — exactly as specified |
| Host | **apex only**; zero `www` URLs |
| `/work` | **absent** (correct — it is `noindex`) |
| `/thank-you` | **absent** |
| `/privacy-policy`, `/terms` | absent (correct — both `noindex`) |
| Broken URLs | **ZERO** — all 16 crawled, all 200 |

---

## 21. Indexability — **PASS**

| Route | Expected | Live status | Robots meta | Canonical | In sitemap | Result |
|---|---|---|---|---|---|---|
| `/` | index | 200 | `index, follow` | apex `/` | yes | PASS |
| `/services` | index | 200 | `index, follow` | apex | yes | PASS |
| `/seo` | index | 200 | `index, follow` | apex | yes | PASS |
| `/ai-seo` | index | 200 | `index, follow` | apex | yes | PASS |
| `/google-ads` | index | 200 | `index, follow` | apex | yes | PASS |
| `/social-media-ads` | index | 200 | `index, follow` | apex | yes | PASS |
| `/lead-generation` | index | 200 | `index, follow` | apex | yes | PASS |
| `/conversion-optimization` | index | 200 | `index, follow` | apex | yes | PASS |
| `/problems/traffic-but-no-enquiries` | index | 200 | `index, follow` | apex | yes | PASS |
| `/contact` | index | 200 | `index, follow` | apex | yes | PASS |
| `/blog` | index | 200 | `index, follow` | apex | yes | PASS |
| **`/work`** | **noindex** | 200 | **`noindex, nofollow`** | apex | **no** | **PASS** |
| **`/thank-you`** | **noindex** | 200 | **`noindex, nofollow`** | apex | **no** | **PASS** |
| `/privacy-policy` | noindex | 200 | `noindex, nofollow` | apex | no | PASS |
| `/terms` | noindex | 200 | `noindex, nofollow` | apex | no | PASS |
| **`/launch-checklist`** | **404 in production** | **404** | `noindex` | — | no | **PASS** — internal page correctly gated |

No contradiction anywhere between sitemap membership and robots meta.

---

## 22. Structured data — **PASS**

One JSON-LD block on `/`, **valid JSON**, `@type: Organization`:
`@id`, `name`, `url`, `logo`, `email`, `telephone`, `description`, `contactPoint`, `sameAs: []`.

| Prohibited fact | `/` | `/contact` | `/about` | `/services` |
|---|---|---|---|---|
| `LocalBusiness` | absent | absent | absent | absent |
| `PostalAddress` | absent | absent | absent | absent |
| `postalCode` | absent | absent | absent | absent |
| `priceRange` | absent | absent | absent | absent |
| `aggregateRating` | absent | absent | absent | absent |
| `review` | absent | absent | absent | absent |

`sameAs: []` collapses honestly because the social URL variables are unset. **No company fact was
added during deployment.**

---

## 23. Security headers — **PASS**

| Header | Live value | Layer | Result |
|---|---|---|---|
| `Content-Security-Policy` | `base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'` | **APP — new this deployment** | PASS |
| `X-Content-Type-Options` | `nosniff` | APP | PASS |
| `X-Frame-Options` | `SAMEORIGIN` | APP | PASS |
| `X-XSS-Protection` | **`0`** (was `1; mode=block`) | APP | PASS — Phase I change now live |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | APP | PASS |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | APP | PASS |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` | **HOST / LiteSpeed** | PASS — **present once, not duplicated by the app**; host HSTS left unchanged |

Identical on `/` and `/contact`.

### 23.1 CSP live check — **PASS**

The partial CSP breaks nothing. Every route renders, fonts load (`document.fonts.status ==
"loaded"`), the contact form submits successfully to same-origin `/api/enquiry` under
`form-action 'self'`, and no critical resource is blocked. **No CSP rule for GTM/GA4/Meta was
added** — that is Stage 2, deferred with analytics.

---

## 24. Analytics — **DEFERRED / DORMANT AS AUTHORISED**

| Check | `/` | `/contact` | `/thank-you` |
|---|---|---|---|
| `gtm.js` requested | no | no | no |
| `googletagmanager.com` in HTML | no | no | no |
| `fbevents` / Meta Pixel | no | no | no |
| Real `GTM-` container id | none | none | none |
| Real `G-` measurement id | none | none | none |
| Throwaway / test ids | none | none | none |
| **Third-party `<script src>` hosts in served HTML** | **ZERO** | **ZERO** | **ZERO** |
| Analytics PII | none | none | none |

The only `gtag` reference is the inline **Consent Mode v2 default block**, which sets
`ad_storage`, `ad_user_data`, `ad_personalization` and `analytics_storage` all to **`denied`** and
loads nothing. The consent banner from the approved H2A work is present and functional.
**Provider activation state was not changed by this deployment.**

---

## 25. Booking

| Item | Result |
|---|---|
| `/schedule-call` | 200, `<h1>` "Book a time to talk." |
| Calendly URL | `https://calendly.com/mappedskills` |
| External page | Resolves, **HTTP 200** |
| Broken CTA | None |
| **BOOKING JOURNEY FUNCTIONAL** | **YES** |
| **BOOKING CONVERSION MEASUREMENT NOT IMPLEMENTED** | **TRUE** — unchanged, deferred with the CRM/webhook decision |

No webhook implemented, no vendor changed, no analytics configured.

## 26. Email

| Item | Result |
|---|---|
| Transactional provider | **None configured** — not configured in this session either |
| Persistence independent of email | **Verified** — the live enquiry persisted with `notification_status = 'unconfigured'` |
| Blocking | **No** |
| **EMAIL NOTIFICATION: UNCONFIGURED / NON-BLOCKING** | Confirmed by production behaviour |

---

## 27. Internal link crawl — **PASS**

20 launch pages crawled (homepage, header, footer, all service pages, the problem page, contact,
schedule-call, blog, work, thank-you, privacy, terms). **25 unique internal link targets**
extracted and requested.

**Broken links: 0. Unintended 404s: 0. Unexpected redirect chains: 0.**

---

## 28. Responsive live smoke — **PASS**

| Width | Route | Horizontal overflow | `<h1>` | Header | Footer | Fonts |
|---|---|---|---|---|---|---|
| **390** | `/contact` | **none** (`scrollWidth == 390`) | 1 | present | present | loaded |
| **860** | `/` | **none** (`scrollWidth == 860`) | 1 | present | present | loaded |
| **1425** | `/schedule-call` | **none** (`scrollWidth == 1425`) | 1 | present | present | loaded |

Contact form renders and submits at 390. Submit control measures **48 px** tall. Thank-you state
verified live at desktop width. No missing asset, no CSS failure, no font failure, no visual
regression attributable to deployment packaging.

## 29. Accessibility live smoke — **PASS (observed, not certified)**

| Check | Result |
|---|---|
| Skip link | Present — "Skip to main content" → `#main`, first in DOM order |
| Keyboard navigation | Working — `Tab` advances focus through 49 focusable elements |
| Visible focus | **3 px solid outline** on the focused control |
| Contact form labels | **8 of 8 controls labelled** — zero unlabelled |
| Keyboard submit | Submit control is focusable, `type="submit"`, not disabled |
| Footer touch targets | **Zero footer links under 24 px** — the Phase I geometry fix is live |
| Heading regression | None — one `<h1>` per page |

No certification is claimed. Screen-reader, real-device and cross-browser testing remain
outstanding since Gate 10.

---

## 30. Runtime resources

| Item | Value |
|---|---|
| Serving process count | 1 (plus 2 idle pre-swap workers — §12) |
| Serving process RSS | 143 MB |
| Total RSS, all node processes | 308 MB |
| CPU | 0.4 % on the serving process; 5 s cumulative across the whole acceptance sweep |
| PMEM faults | **0 observed** (numeric limit not readable — §3) |
| NPROC faults | **0 observed** |
| Entry-process faults | **0 observed** |
| Restarts / crashes | **0** |
| `pthread_create: Resource temporarily unavailable` | **0** — the historical shared-host build failure did not occur, because nothing was built on the host |

## 31. Production logs — **PASS**

New release `stderr.log`: **476 bytes**, containing only nine repetitions of
`[contentful] Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN`.

| Check | Result |
|---|---|
| Uncaught exceptions | **none** |
| Database failures | **none** |
| Schema / migration errors | **none** |
| Missing required env var errors | **none** |
| Repeated restarts | **none** |
| Asset 404s from required files | **none** |
| **Enquiry PII in logs** | **NONE** — scanned; zero matches |
| **Secret / credential in logs** | **NONE** — scanned; zero matches |

## 32. Contentful

`CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` are **not set on the production application**.
The client logs a warning and returns empty collections. `/blog` and `/work` both return **200**
and render their empty states. **No critical site failure.** Nothing was intentionally broken and
no CMS change was made.

Recorded as a non-blocking owner item: `/blog` is in the sitemap and currently has no posts.

---

## 33. Rollback readiness

| Item | Plan |
|---|---|
| Previous application | `/home/mappeds1/mappedskills.com.prev-20260906-094959` — **in place and intact** |
| Restore | `mv mappedskills.com mappedskills.com.failed && mv mappedskills.com.prev-20260906-094959 mappedskills.com` — two renames, same filesystem, near-instant |
| Independent archive | `app-pre-1237624-20260906-094639.tar.gz` if the directory is lost |
| Restart | `cloudlinux-selector restart --interpreter nodejs --app-root mappedskills.com` |
| **Database compatibility** | **Migration 002 is additive and every added column is NULLable (or has a default).** The previous application runs unchanged against the migrated schema |
| **Do NOT roll back migration 002** | Correct action is application rollback against the migrated schema |
| Robots fix rollback | Move `robots.txt.docroot-removed-20260906-100849` back to `~/public_html/robots.txt` |
| Limitation | The two idle pre-swap workers hold the previous directory open; a rollback should be followed by a restart, which it includes |

**Not exercised.** A healthy deployment was not rolled back merely to demonstrate the mechanism.

---

## 34. Production-only defects found and how each was handled

| # | Defect | Class | Action | Result |
|---|---|---|---|---|
| 1 | `www.mappedskills.com` served 200 with no canonicalisation | C — application, **already fixed at `1237624`** | Deployed the approved code | **CLOSED** — 308 to apex, path and query preserved |
| 2 | `/robots.txt` shadowed by `~/public_html/robots.txt` in the document root | **A — HOST CONFIGURATION** | Backed up, moved out of the docroot with owner authorisation. No app file edited | **CLOSED** |
| 3 | Previous release contained files deleted at `1237624` (`public/robots.txt`, `lib/constants.ts`) | **B — DEPLOYMENT PACKAGING** | Release-directory swap instead of extract-over-the-top | **CLOSED** |
| 4 | `~/public_html/wp-config.bak-a2.php` (unrelated legacy WordPress file) reachable at 200 | A — host hygiene, **pre-existing, not caused by this deployment** | Verified it is **executed as PHP, not served as source** (`text/html`, no body) — **no credential is exposed**. Not touched | **NON-BLOCKING — owner item** |
| 5 | LVE numeric limits unreadable from the account | **D — INFRASTRUCTURE** | Every probe attempted and recorded; behavioural stability measured instead | **NON-BLOCKING — owner item** |
| 6 | Two idle pre-swap `lsnode` workers hold the previous release directory | A — operational | Verified not serving (24/24 fetches new build). Left to LiteSpeed's idle recycling | **NON-BLOCKING** |

**No application source was hot-patched on production. No untracked production edit was made.**

---

## 35. Source changes during deployment

**NONE.** No source change was required, so no code commit was created. The only repository change
is this deployment record. `README.md` was not touched. Nothing was pushed.

---

## 36. Remaining owner items

| Item | Classification | Blocks live site? | Exact action |
|---|---|---|---|
| GPTBot / CCBot crawler policy (**R20**) | OWNER / PROGRAMME DECISION | **No** — status quo preserved | Decide, then append two rules to `app/robots.ts` |
| GTM / GA4 / Meta activation | **ANALYTICS — DEFERRED BY OWNER** | **No** | Resume from `20_PHASE_H2A_CONSENT_AND_GTM.md` §24 when reopened |
| Transactional email provider | OPERATIONAL DEBT | **No** | Choose a provider; until then, monitor the database |
| Booking conversion measurement / webhook | OWNER / VENDOR | **No** | Deferred with the CRM decision |
| `NEXT_PUBLIC_CALENDLY_URL` unset | NON-BLOCKING | No | Set it so the URL is not a code constant |
| Contentful not configured on production | CONTENT / CONFIG | **No** — fails soft, `/blog` and `/work` return 200 | Set `CONTENTFUL_SPACE_ID` + `CONTENTFUL_ACCESS_TOKEN`, or accept empty blog |
| ~~Two synthetic acceptance rows in `enquiries`~~ | HOUSEKEEPING | No | **CLOSED — removed during Session 34 closure, §38** |
| `wp-config.bak-a2.php` and other legacy files in `~/public_html` | HOST HYGIENE | **No** — verified not leaking | Remove the stale WordPress remnants |
| LVE numeric limits unknown | INFRASTRUCTURE VISIBILITY | **No** | Read Resource Usage in the cPanel UI, or ask Hosting.com, and record the real figures |
| CI/CD: `.github/workflows/deploy.yml` **builds on the server** | **PROCESS DEBT** | **No** — not triggered; nothing was pushed | Rewrite to build off-host and ship an artifact, matching this session's method. **Not solved here** |
| `NEXT_PUBLIC_SITE_URL` unset on the host | NON-BLOCKING | No | Defaults correctly to `https://mappedskills.com` |
| Social profile URLs hard-coded in `Footer.tsx` | NON-BLOCKING | No | Confirm accounts, set the `NEXT_PUBLIC_*_URL` variables |
| Screen-reader, real-device, cross-browser, 200 % resize testing | POST-LAUNCH | No | Outstanding since Gate 10 |

---

## 37. Acceptance decision

| Gate | Result |
|---|---|
| Production serving the `1237624` artifact | **PASS** |
| Migration 002 applied and verified | **PASS** |
| Contact submission persists durably | **PASS** |
| No fake success | **PASS** |
| Idempotency valid | **PASS** |
| Homepage and critical routes work | **PASS** |
| www canonicalisation | **PASS** |
| HTML no longer one-year immutable | **PASS** |
| Sitemap correct | **PASS** |
| Robots matches the approved implementation | **PASS** (after the §19 host fix) |
| `/work` noindex | **PASS** |
| `/thank-you` noindex | **PASS** |
| Unsupported schema facts absent | **PASS** |
| No critical security regression | **PASS** |
| No production secret or PII leak | **PASS** |
| Runtime stable under host limits | **PASS** (limits numerically unknown; stability measured) |
| Analytics providers dormant | **PASS** |
| Booking status honest | **PASS** |
| Rollback path exists | **PASS** |

**PRODUCTION FUNCTIONAL STATUS: PASS — PRODUCTION WEBSITE FUNCTIONAL**
**PRODUCTION TECHNICAL STATUS: PASS — PRODUCTION TECHNICALLY ACCEPTED**
**CONTACT STATUS: PASS — LIVE DURABLE ENQUIRY PERSISTENCE VERIFIED**
**SESSION 34 RESULT: PASS — PRODUCTION DEPLOYMENT ACCEPTED**
**ANALYTICS: DEFERRED BY OWNER — PROVIDERS DORMANT**

Next session, only when the owner chooses to reopen measurement:
**SESSION 35 — ANALYTICS ACTIVATION + FINAL MEASUREMENT ACCEPTANCE.**

---

## 38. Session 34 closure — synthetic acceptance data removed

Administrative closure only. **No deployment decision in this record changed.** No application
code, configuration, robots, sitemap, headers, cache, analytics or booking setting was touched,
and production was not redeployed or restarted.

| Item | Result |
|---|---|
| Identification method | **Exact identifiers only.** One row by its exact Session 34 idempotency key; the other by its exact row id combined with its exact synthetic address. Cross-checked against a second synthetic address before deletion |
| Broad or pattern-based deletion | **None used** — no `LIKE`, no date-range, no name match |
| Expected target rows | 2 |
| Matched target rows | **2** |
| Recovery point taken first | Yes — full `mysqldump`, mode 600, in a mode-700 directory, integrity verified |
| Statement form | Parameterised `DELETE`, both statements inside one transaction with a commit guard that rolls back unless exactly 2 rows are affected |
| **Rows deleted** | **Exactly 2** |
| Total rows | 5 → **3** |
| **Real enquiry rows** | **UNCHANGED** — the same three row ids present before and after; none read, altered or printed |
| Schema | **Unchanged** — 30 columns, `idx_enquiry_first_source_created` present |
| Migration ledger | **Unchanged** — 001 and 002 both applied, timestamps intact |
| New test enquiry created to prove cleanup | **No** — deliberately not; persistence was already proven at acceptance |
| Post-cleanup sanity | `/` 200 · `/contact` 200 · `/robots.txt` 200 · `/sitemap.xml` 200 · `GET /api/enquiry` 405 (route present, POST-only) · still serving the accepted release |
| PII or credentials recorded | **None** |

**Deployment acceptance is unchanged: PASS — PRODUCTION DEPLOYMENT ACCEPTED.**
