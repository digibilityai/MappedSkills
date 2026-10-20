# BL-D6 · Blog Article Template — Production Release Report (2026-10-20)

**Authorisation (owner, 2026-10-20):** "Authorised: dispatch the production deploy of 619715d (action=deploy,
confirm=619715d), then run post-release verification. No DEC entry yet." The production environment gate was approved
by the owner (`digibilityai`) in GitHub. **No DEC entry and no `CURRENT_STATE.md` change were made.** Contentful was not
edited.

## 1. Release

| Item | Value |
|---|---|
| Commit | **`619715d`** (PR #28 squash on `main`) |
| Dispatch run | **`39397273456`**. Verify ✔ → owner approval → Release ✔ (smoke test ✔; rollback step skipped) |
| GitHub deployment | `7195708461` (production, 2026-10-20 09:00Z) |
| Artifact | `mappedskills-619715d.tar.gz`, sha256 **`77323c0a2c0317106bf4fc55c1b09c2d43f1cefee57ba0a22f872571d1861b4d`**; 35 prerendered pages; GTM `GTM-K8ZQPMXP` inlined |
| Live BUILD_ID | **`6jXxz2KR2GcpH1l1lD5r6`** (swap logged 09:01:49Z: `live=6jXxz2KR…  previous=e5Y6oQ42…`) |
| Rollback target (`.prev`) | **`e5Y6oQ42T0UiiCD7NYY8G`** (`8349853`); `.prev2` = `HWV2k-ss7ZmkbNHQXInEm` (`0b27cfd`). All three releases link to `deps/cf206545f758` |
| Dependencies | Lockfile unchanged (`cf206545f758`); the live `node_modules` symlink was carried. No migrations |

**Rollback** (if ever needed): dispatch `deploy.yml` with `action=rollback`, `confirm=ROLLBACK`, then approve the gate.

## 2. Post-release verification (production, real Contentful)

| Check | Result |
|---|---|
| Template live on all 7 articles (`ba-` markup) | ✔ 7/7 |
| Contents links | **Before: 126/126 broken. After: 0 broken** (rail + panel, 98 links) |
| Head (title, all meta, canonical/alternate), all JSON-LD, article body text, load-time dataLayer: before vs after (`prod-before.json` / `prod-after.json`) | **Identical 7/7** |
| 3 engines × 6 widths × 7 articles (`tools/prod-verify.cjs`, `prod-checks-*.json`, `screenshots/`) | **Chromium: 0 fails. Firefox: 0 fails.** **WebKit: 1** (the `7-proven…` 1440 rail hover reading). The same reading appeared in G2. Re-run in isolation against production, including the exact jump-then-hover sequence: hover changes to tangerine **9/9**. A harness timing artefact, not a defect. |
| Covered by those runs | No horizontal overflow; one H1; no duplicate ids; rail sticky at 24 px; closed panel opens by keyboard; jump lands at 24 px; focus ring on every Tab stop; 150 ms hover; reduced motion; related services; CTA pair `/contact` + `/schedule-call`; legacy blocks gone; canonical = live |
| Release really serving | Previous release's article CSS (`b2c7963c….css`) → **404**; all 5 new stylesheets → 200 |
| Other routes | 22 routes → 200 (`/`, services, `/blog`, `/contact`, `/schedule-call`, `/thank-you`, robots, sitemap …); unknown slug → 404; sitemap still lists 7 articles |
| Consent / GTM (live, Chromium + WebKit) | Default all denied → `page_view`; no Google request or `_ga` cookie before consent; banner renders. Unchanged from before the release |

## 3. Correction to the G2 report (ED-A1 / ED-A2)

The G2 fixture copied each image's title into its description, so local builds showed captions. **Real Contentful assets
have no description: production renders no captions**, and the email article's height matches G1 (5,307 px).

The issue is the **alt text**, which is the asset title:

- `alt="BlogDetailsA"` on the email article;
- keyword strings on the real-estate and content-marketing articles.

This is unchanged from before the release, and it remains a proposed editorial fix (accessibility, Should/Could).

## 4. Still open (owner)

1. **GTM Tag Assistant** on production. The container analysis shows no dependency on the removed elements.
2. Manual checks:
   - VoiceOver (macOS/iOS) and TalkBack;
   - OnePlus 12 and iPhone;
   - shipping Safari, Firefox and Edge;
   - Windows forced colours.

   Branded Chrome 155 was checked: 28/28 pass.
3. **DEC entry** for BL-D6 (merge and release): not authorised yet.
4. **Contentful editorial track:** 24 listed items, plus the revised ED-A1/ED-A2 (alt text). The "Book a Client
   Discovery Call (30 minutes)" text and the published writer notes remain live, as directed.
5. The legacy `components/blog/*` files are now unused (clean-up is optional).
