# UI Revamp — Programme Risks & Live Issues

> **READ BEFORE ANY GATE 1+ WORK, AND BEFORE ANY MERGE TO `main`.**
>
> - Opened at Gate 0 closure (`DEC-033`, 2026-10-08).
> - Source: `GATE_0_BASELINE_AUDIT.md`.
> - Nothing in this file has been fixed. Each item needs **its own explicit authorisation**.
> - Fixing an item must **not** become a redesign. A UI-revamp workstream must **not** absorb an item silently.

## How items are classified

| Class | Meaning | Who may act |
|---|---|---|
| **LIVE DEFECT** | Broken behaviour on production today, independent of the revamp | A separately authorised minimal fix (hotfix scope), **or** the named workstream if the owner chooses to wait |
| **PROCESS RISK** | Release/deployment behaviour that conflicts with approved process | Owner / release owner only. Never a UI task |
| **UI REVAMP** | Design-system work owned by a Gate 4 workstream | That workstream, inside its approved direction |

## Open items

### LIVE-1 — Mobile-menu CTAs unreachable under the sticky header — LIVE DEFECT (critical)

| | |
|---|---|
| **What** | `components/layout/Header.tsx:98` is `sticky top-0` and the mobile menu renders inside it. When the menu is open the header is ~800px tall. On viewports shorter than that (most phones), "Contact Us" and "Book a call" stay below the fold and cannot be scrolled into view until the page is scrolled to its very end |
| **Evidence** | Audit §12 R1; `gate-0-evidence/screenshots/defect-mobile-menu-sticky-header-390x700.jpg`; production HTML contains `sticky top-0` |
| **Origin** | Commit `1557f74` — recorded as an unapproved regression (`DEC-030`) |
| **Impact** | Primary conversion path from navigation; WCAG reflow/keyboard |
| **Status** | **OPEN — not fixed.** Needs an owner choice: a separately authorised minimal hotfix, or correction inside 4D Navigation |
| **Guardrail** | A fix must not redesign the header or navigation. CTA destinations and primacy are LOCKED |
| **Gate 2 interaction (2026-10-08, `DEC-034`)** | On branch `ui-revamp` only, `/`, `/services` and `/seo` render the approved non-sticky Direction C header, so the LIVE-1 condition cannot occur on those three routes there. **This is not a LIVE-1 fix:** the legacy `Header.tsx` is unchanged, every other route still renders it, and production is untouched. Status above is unchanged. See `GATE_2_IMPLEMENTATION.md` §8 E11 |
| **Gate 4 B1 interaction (2026-10-08, `DEC-037`)** | On branch `ui-revamp`, **every route** now renders the non-sticky Direction C header. The LIVE-1 condition no longer occurs on the branch: 124 findings resolved in Chromium, WebKit and Firefox (`GATE_4_B1_GLOBAL_CHROME.md`). **Production is unchanged and LIVE-1 remains OPEN** pending a separate production decision. The legacy `Header.tsx` is unchanged and retained until B11 |

### LIVE-2 — Proof-copy contradiction — LIVE DEFECT (content / proof, critical)

| | |
|---|---|
| **What** | The homepage reads *"We have no case studies to show you."* (`components/homepage/HomepageAccountability.tsx:108`). `/work` reads *"There are no published case studies here…"* (`app/(pages)/work/page.tsx:80`). On production, `/work` lists three published case studies directly below that sentence |
| **Evidence** | Audit §11; production `/work`, 2026-10-07 |
| **Governing decisions** | `DEC-012` + `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` and `DEC-031`. Withheld figures stay withheld |
| **Status** | **OPEN — not fixed.** Copy is LOCKED. The correction needs separately authorised content/proof wording, then the proof workstream (4G) or a minimal content fix |
| **Guardrail** | The fix must not expose, restore or paraphrase withheld figures, testimonials or ratings |

### PROC-1 — Push to `main` deploys to production — PROCESS RISK (high)

| | |
|---|---|
| **What** | Commit `eff9704` (2026-10-06) changed `.github/workflows/deploy.yml`: the release job now runs on `push` to `main`, and a missing required-reviewer rule on the `production` environment is downgraded from a hard failure to a warning |
| **Conflicts with** | `DEC-026` (production deploys only by manual `workflow_dispatch`, with environment reviewer approval); Master Handoff "→ QA → staging → production"; Implementation Plan Gates 8–9 |
| **Consequence for this programme** | **Merging `ui-revamp` (or any commit) into `main` may ship straight to production**, bypassing staging and approval. Whether CI can currently reach the host is a separate, unresolved question |
| **Status** | **OPEN — owner/release decision.** Not a UI task |
| **Guardrail** | **No merge or push of `ui-revamp` to `main` until PROC-1 is resolved or the owner explicitly accepts the risk** |

## Related open risks (lower priority, recorded in the audit)

| Ref | Item | Class |
|---|---|---|
| X2 | `DECISION_LOG.md` / `CURRENT_STATE.md` did not record repository activity between 2026-09-18 and 2026-10-07 (R1–R4 routing, CRM webhook, research/press, Contentful preview, `1557f74`, `eff9704`, OG images) | Documentation debt |
| X6 | Contentful Preview API: drafts may be "fetched alongside published content" if `CONTENTFUL_PREVIEW_ACCESS_TOKEN` is set in production (unknown) | Process / content risk — owner check |
| X10 | Ameba case-study CMS copy names "TechWave Solutions" | Content integrity — owner check |
| R2 | Header overflows and wraps at 1024–~1080px | UI REVAMP (4D) |
| — | Contrast: input borders 1.30:1; `--resolve-gap` small text 3.13:1 | UI REVAMP (4B) |
| KD-02 | Legacy focus indicators disappear in forced colours / High Contrast (legacy chrome, `ContactForm` fields). **Remediation and retest gate before staging** — `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` (Gate 4 B0, 2026-10-08) | UI REVAMP (B1 chrome; B2–B10 bodies; B6 form) |
| OBS-1 | `consent default` does not reach `dataLayer` on dynamically rendered not-found pages (consent bootstrap not executed there). **Part of the E6 investigation; consent is LOCKED** — same register | Process / analytics — owner decision via E6 |
| E6-A1 | **E6 audit (2026-10-08) extends OBS-1.** On route-level `notFound()` responses (`/blog/*`, `/portfolio/*`, `/research/*`, `/press/*`, `/launch-checklist`), a **returning visitor who previously accepted** gets the GTM container loaded with **no consent commands at all**. The state persists through client navigation to `/contact`. Verified locally in 3 engines; production serves the same `__next_error__` shell with the container ID compiled in. **Pre-existing, live on production. Open; owner to classify** — `GATE_4_E6_GTM_CONSENT_AUDIT.md` §4, §7. **R1 safeguard implemented and accepted LOCALLY on `ui-revamp` (`DEC-038`, `gate-4/e6/E6_R1_IMPLEMENTATION_ACCEPTANCE.md`); production unchanged; not deployed.** | Process / analytics (consent) — owner decision |

## Closing an item

Record the authorising decision in `docs/00-project/DECISION_LOG.md`. Then mark the item **CLOSED** here, with the date, decision ID and commit. Do not delete the entry.
