# Gate 2 — evidence package

Report: [`../GATE_2_IMPLEMENTATION.md`](../GATE_2_IMPLEMENTATION.md). Authority: `DEC-034`.

| Path | What it is |
|---|---|
| `screenshots/compare.html` | Approved prototype vs application, 53 section pairs at 360/390/430/768/1024/1440 (open in a browser; relative image paths) |
| `screenshots/compare/` | The pair images (JPEG) and `pairs.json` |
| `screenshots/app/` | Application captures, production build: `<route>-<width>-full.jpg`, `-fold.png`, and `-menu.png` (menu open, <1200). **Not in Git (`DEC-036`, 2026-10-08):** these captures of the Gate 2 build predate the Gate 3 remediation and are superseded by `gate-3-remediation/evidence/screens/after/` and `gate-3-acceptance/evidence/screens/`. The folder is excluded from the Git checkpoint and retained locally only. Regenerate with `validation/shots.cjs` (archival; see `../QA_REGRESSION_RUNBOOK.md` §4) |
| `validation/app-checks.cjs` → `app-checks-result.txt` | Application suite, 192 checks |
| `validation/unrelated-routes.cjs` → `unrelated-routes-result.txt` | 21 out-of-scope routes, baseline vs Gate 2, pixel/text/link identity |
| `validation/inventory.cjs`, `compare.py` → `inventory-{before,after}.json`, `compare-result.txt` | Content, metadata, JSON-LD, heading and link preservation |
| `jsonld-result.txt` · `bytes-result.txt` · `vitals-result.txt` | Structured data identity · transfer sizes · local-lab CLS/LCP |
| `shots.cjs`, `compare-shots.cjs`, `vitals.cjs` | Capture scripts |

Scripts use `playwright-core` from the sibling `Digi_Brain` checkout (nothing installed here). "Baseline" = commit `142b9c8`
built and served separately; "Gate 2" = this working tree, `next build` + `next start`. The capture browsers seed their own
storage with an analytics **decline** to keep the consent banner out of the images; no consent is ever granted.
