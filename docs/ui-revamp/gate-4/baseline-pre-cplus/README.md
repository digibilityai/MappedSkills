# Site-wide regression baseline before Direction C+ — 2026-10-12

The comparison point for the C+ migration. Classify a later run against these files:

```bash
node docs/ui-revamp/gate-4/qa/classify.cjs --baseline docs/ui-revamp/gate-4/baseline-pre-cplus/<check>-<engine>.json --candidate <run>/<check>-<engine>.json --known docs/ui-revamp/gate-4/qa/known-defects.json
```

**Source:**
- branch `ui-revamp` @ `c07c00d` (application tree identical to `2eb9483`, B5);
- plain build `p0nMJiYAj1XuU0nv4-4ii`;
- fixture build `y4y75BgvDJebzjn4_Klq-` (CMS fixtures).

Both were served on 127.0.0.1. The run was `run-all.cjs --engines chromium,webkit,firefox --expect-dc all`: 34 targets (28 templates) at 7 widths, with no screenshots. `pixel-main-hashes.json` holds the `<main>` hashes (Chromium).

**Results** (classified against `post-b4/evidence/run`):

| Check | Result |
|---|---|
| layout | NEW 0 / RESOLVED 15 (KD-05) / KNOWN 501 in each engine |
| a11y | NEW 0 / RESOLVED 4 (KD-03) / KNOWN 23 Chromium (incl. forced colours) · 6 WebKit · 6 Firefox |
| chrome consistency | 0 failures |
| analytics/forms vs post-B4 | 0 differing sections |

**Every KNOWN finding is on a template not yet migrated** (`/contact`, `/blog/[slug]`, `/portfolio/[slug]`, `/work`, `/privacy-policy`, `/terms`). There are 0 findings on the 13 Direction C templates.
