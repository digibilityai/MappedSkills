# BL-D6 · Production Readiness Audit (read-only, 2026-10-20)

**Scope:** read-only. Nothing was changed: no code, Contentful, configuration, governance documents, commits, pushes,
merges, deployments or rollbacks. Production was only read: HTTP GETs, an SSH read of the host, and the public GTM
container. The consent "Accept" path was exercised only on a **local** build, with every Google request blocked.

## 1. Production today

| Item | Value | Evidence |
|---|---|---|
| Live BUILD_ID | **`e5Y6oQ42T0UiiCD7NYY8G`** | `~/mappedskills.com/.next/BUILD_ID` on the host (mtime 2026-10-20 00:34 EDT) |
| Deployed commit | **`8349853`** (the `/blog` index redesign, DEC-066) | Latest production deployment `7191627717` (04:34Z), dispatch run `39370198396` |
| Retained releases | `.prev` = `HWV2k-ss7ZmkbNHQXInEm` (`0b27cfd`); `.prev2` = `icztRBLn9sS1dBFF8WuF3` (`1dcd10e`) | Host |
| `main` | `619715d` (PR #28, merged 08:23Z by `digibilityai`) | `git log origin/main` |
| Runs since the last deploy | `39392462091` (PR, verify), `39393063488` (push: verify ✔; release and rollback jobs skipped) | `gh run list` |
| Pending/staged release | none (`~/mappedskills.com.new` absent; no waiting run) | Host, `gh` |

## 2. BL-D6 is NOT live

On `/blog/seo-company-in-pune` and `/blog/building-an-email-list`, production still serves the legacy template:

- "Table of Contents" heading, with the broken `href="#section-0"` contents links;
- the "Growth Insights" newsletter;
- 0 `ba-` classes.

Nothing between `8349853` and `619715d` has been deployed. The only commits in that range are `edb7c3f` (docs) and
`619715d`.

## 3. GTM and consent

**Container `GTM-K8ZQPMXP`** (live version 4, public `gtm.js`, 53 tags):

- **The only active tags** are the Google tag (`G-6H7WFH2BHQ`, on `gtm.js`) and five GA4 event tags. Those five fire
  on the custom dataLayer events `page_view`, `lead_form_started`, `lead_form_submitted`,
  `lead_form_validation_error` and `meeting_started`.
- **The other 39 tags are paused.** They are WordPress-era (`/seo-services/`, `/ppc-marketing/`, `/blog/`,
  `.tve-success-message`, social link clicks).
- **No active tag depends on any article-page selector, class or click text.** The removed CTA blocks and the
  newsletter had no event wiring. Legacy `SocialShare`'s `share_click` gtag calls were already removed (H2A), so the
  share line loses no measurement.
- **The only article event is `page_view`.** It was verified identical to `main` in Chromium, Firefox and WebKit,
  including on the GTM-enabled cPanel build.

**Consent:**

- **Production (live article, Chromium and WebKit):** consent default is all denied, then `page_view`. No request to
  googletagmanager.com or google-analytics.com and no `_ga` cookie before consent. The banner ("Analytics cookies …")
  renders.
- **Merged code (local GTM-enabled cPanel build, `619715d` sources, Google requests blocked; Chromium, Firefox and
  WebKit):** Accept loads only `gtm.js?id=GTM-K8ZQPMXP` and pushes
  `consent update {analytics_storage: granted, ads: denied}`; the banner closes. Nothing loads before consent.

**Not done:** **GTM Preview / Tag Assistant.** It needs the owner's Google account and accepting consent on the real
site. The container analysis above makes it low risk, but it is still a manual check.

## 4. Device, shipping-browser and screen-reader checks

| Check | Status |
|---|---|
| Playwright Chromium, Firefox, WebKit × 6 widths × 7 articles | **Done** (G2 report) |
| **Google Chrome 155** (shipping, headless, throwaway profile) × 7 articles × 1440/1024/375/320 against the merged code | **Done: 28/28 pass.** No overflow; one H1; 0 broken contents links; panel closed on load; jump lands at 24 px; focus ring; 0 errors |
| Shipping **Firefox 158**, **Safari 26.2** (installed) | **Outstanding.** Playwright cannot drive them, and Safari automation needs a system setting change |
| **Edge** | **Outstanding.** Not installed on this Mac |
| **Real devices** (OnePlus 12 Chrome, iPhone Safari) | **Outstanding** (owner) |
| **Screen readers** (VoiceOver macOS/iOS, TalkBack) | **Outstanding** (owner) |
| Forced colours (Windows) | **Outstanding** |

Only shipping Safari, real devices, screen readers, Edge and forced colours can find something new. They can all be
done post-release on production, because the change is reversible (§5).

## 5. Rollback readiness and the release artifact

**Release artifact.**

- The CI candidate is **`mappedskills-619715d.tar.gz`** from push run `39393063488`: sha256
  `9b593a92d4053c0c8c6b647bfa89c66fe6e9b0f9067dde450a250288e3b09287`, BUILD_ID `1J2SJm3eyEV-56PA6pAu2`, 35 prerendered
  pages, GTM inlined. GitHub artifact `release-619715d…` (7.8 MB), which expires 2026-11-19.
- **However, the deploy dispatch rebuilds:** its own verify job produces the artifact it releases. That artifact will be
  named `mappedskills-619715d.tar.gz` but will have a **different sha256 and BUILD_ID**. The values to record are the
  ones printed by the dispatch run, as for the previous releases.

**Dispatch input:** `action=deploy`, `confirm=619715d`. Approval is by the `production` environment reviewer
(`digibilityai`).

**Dependencies:** the lockfile is unchanged (`cf206545f758`), so the live `node_modules` symlink is carried and no new
`~/deps` tree is needed. There are no `db/` or migration changes.

**Rollback:**

- The host `release.sh` is byte-identical to `main`'s (sha256 prefix `6641e119…`).
- After the release, `.prev` will be the current live `e5Y6oQ42…` (`8349853`). Its `node_modules` →
  `deps/cf206545f758` resolves, with `next` present, so all the rollback preconditions hold.
- `.prev2` will then be `HWV2k…` (`0b27cfd`).
- Rollback options: dispatch `action=rollback`, `confirm=ROLLBACK`; or the automatic rollback if the post-release
  smoke test fails.

**Host:** the shared volume is 99% used, with 43 GB free; one release is about 28 MB. Not a blocker.

## 6. Recommendation: **GO for production deployment of `619715d`**, subject to owner authorisation

Residual risks:

1. **Real Contentful content vs the fixture.** The CI build prerendered the 7 articles from live Contentful
   (35 pages), but the browser checks used the fixture. **Mitigation:** run the 3-engine production verify right after
   the release; rollback is ready.
2. **GTM Preview not run.** The container shows no dependency; confirm in Tag Assistant after the release.
3. **Manual accessibility and device checks are outstanding** (§4). They are low risk; do them on production after the
   release.
4. **Editorial items remain live, as directed.** The 10 Must items include the "Book a Client Discovery Call
   (30 minutes)" text and the published writer notes. Proposed additions ED-A1/A2 cover asset descriptions shown as
   captions.
5. **DEC entry for BL-D6 not yet recorded** (needs authorisation).

Post-release checks:

- the live BUILD_ID changes, and `.prev` = `e5Y6oQ42…`;
- `tools/verify.cjs`-style checks against production in 3 engines;
- `/blog/<slug>` contents links resolve;
- GTM Tag Assistant;
- the manual checks in §4.
