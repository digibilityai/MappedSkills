# MappedSkills UI Revamp — Gate 4: Phase-by-Phase Implementation Sequence

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Status** | **PLANNING ONLY.** Each batch needs its own owner instruction. Nothing here starts Gate 4 |
| **Principles** | Small, independently verifiable batches · chrome before bodies · lowest design risk first · conversion surfaces after their analytics are understood · legacy-system rebuilds last · deletion only at the end |

Workstream codes are the Implementation Plan's (4A typography, 4B colour/surface, 4C spacing/layout, 4D chrome, 4E
components, 4F page composition, 4G proof, 4H motion). Gate 4 runs them **by batch of routes**, not as eight site-wide sweeps:
each batch applies 4A–4C/4E/4H to its routes, so every change is verified on a real page. This is a deliberate reading of the
Implementation Plan's "workstream-level execution"; it is recorded here as a proposal for the owner to accept or reject.

---

## 0. Order at a glance

| Batch | Name | Routes | Size | Depends on | Owner review |
|---|---|---|---|---|---|
| **B0** | QA harness and baselines | none (tooling + evidence) | M | — | Light: approve the harness and baseline |
| **B1** | Global chrome (4D) | chrome on all 28 templates; no bodies | S code / L verification | B0; approval of strategy S3 | **Yes** |
| **B2** | Capability pages I | `/google-ads`, `/social-media-ads` | S | B1 | **Yes** (first body migration) |
| — | **E1-a checkpoint** | devices + engines on chrome and B2 | — | B2 | Owner/tester |
| **B3** | Capability pages II | `/ai-seo`, `/lead-generation`, `/conversion-optimization` | M | B2, E1-a findings | Yes |
| **B4** | Decision pages | `/problems/traffic-but-no-enquiries`, `/pricing` | M | B3 (`Figure`, `DataTable`) | Yes |
| **B5** | Trust and method | `/how-it-works`, `/about`, `/faq` | L | B4 (`Sequence`, `FindingRows`) | Yes (+ S2 signature decision) |
| **B6** | Conversion | `/contact`, `/schedule-call`, `/thank-you` | L | B1; **E6 strongly recommended first** | **Yes** (analytics-sensitive) |
| **B7** | Editorial indexes, research, press | `/blog`, `/research`, `/research/[slug]`, `/press`, `/press/[slug]` | L | CMS QA access (C1) | Yes |
| **B8** | Blog article | `/blog/[slug]` | XL | B7 (`Prose`, `EntryRows`) | Yes |
| **B9** | Proof | `/work`, `/portfolio/[slug]` | L/XL | B7/B8; marks rule; `LIVE-2` position | **Yes** (proof governance) |
| **B10** | Utility and legal | `/privacy-policy`, `/terms`, 404, (`/launch-checklist`) | M | B8 (`Contents`) | Yes |
| **B11** | Consolidation and cleanup | none visible (fonts, deletions, CSS) | M | all | **Yes** (deletions, font decision) |

B6 is placed after B5 for analytics readiness, not for value. If the owner wants conversion pages earlier, B6 can move
directly after B2 **provided E6 is done first**. It depends only on B1 and the `Field` primitive.

---

## 1. Batch specifications

Common to every batch (not repeated below): content preservation per `GATE_4_QA_ACCEPTANCE_MATRIX.md` §1; route-level and
batch-level checks (§2.2–§2.3); visual criteria V1–V10 (§3); one local commit set on `ui-revamp` (application, then
evidence), staged by explicit path; **no push, merge or deploy**; a batch report `docs/ui-revamp/GATE_4_B<n>_<NAME>.md`;
rollback = revert the batch commit (legacy components are retained until B11, so a revert is always clean).

### B0 — QA harness and baselines (no application change)

| | |
|---|---|
| **Scope** | Build the route-parametric reusable checks listed as "Build in B0" in `GATE_4_QA_ACCEPTANCE_MATRIX.md` §4 under `docs/ui-revamp/gate-4/qa/`. Capture the **baseline** on a production build of `23c937d`/`352bb25`: content/SEO/JSON-LD/link inventory for all 27 templates; screenshots at seven widths; `<main>` crops; `dataLayer` journeys; bytes |
| **Components** | none |
| **Dependencies** | Contentful read access for the CMS templates (C1), or an agreed fixture approach. If neither is available, baseline the static routes now and record the CMS gap |
| **Accessibility / responsive / SEO checks** | Run the new suite against the baseline; it must reproduce the recorded Gate 3 results on `/`, `/services`, `/seo` (calibration of the harness) |
| **Acceptance** | Harness reproduces 192/192 (Gate 2) and 261/0/3 (Gate 3) equivalents on the approved routes; baseline stored; `QA_REGRESSION_RUNBOOK.md` updated |
| **Rollback** | Not applicable (docs and scripts only) |

### B1 — Global chrome (4D)

| | |
|---|---|
| **Routes** | Chrome on all 28 templates; **no body changes** |
| **Components** | Reuse `SiteHeader`, `SiteFooter`, `nav.ts`. Invert `ChromeSwitch` to an empty deny-list (`GATE_4_CHROME_MIGRATION_STRATEGY.md` §4). Optional: E4 chevron border (needs approval) |
| **Dependencies** | B0; owner approval of S3 |
| **Content preservation** | Every legacy `<main>` unchanged; chrome labels/destinations = approved chrome |
| **Accessibility** | Menu suite on all routes incl. 390×600; CH1 anchors; CH3 consent banner + menu; skip link; `aria-current` |
| **Responsive** | 320–1440 on every route; legacy header's 1024 overflow (R2) gone |
| **SEO / analytics** | Inventories identical; `page_view` walk identical; E6 note for chrome-keyed triggers |
| **Visual acceptance** | Chrome identical to `/` on every route; owner reviews a six-route sample of the chrome/body seam |
| **Owner review** | Yes. Also: the B1 report states LIVE-1 accurately (not fixed on production) |
| **Rollback** | One-line deny-list entry per route, or revert the commit |

### B2 — Capability pages I: `/google-ads`, `/social-media-ads`

| | |
|---|---|
| **Components** | Reuse only: `Crumb`, `ServiceOpener`, `Section`, `Label`/`Statement`/`Body`, `NotPromised`-class reverse boundary, `ScopeRows`, `TLink`, `Close`, `DcMotion` |
| **Dependencies** | B1 |
| **Content preservation** | Section order as production (boundary before scope on `/google-ads`); `ProofLink` → `TLink` same destination; breadcrumb labels "Paid search" / "Paid social" unchanged |
| **Accessibility** | Route-level suite; contrast now from tokens |
| **Responsive** | Seven widths; ≤599px composition decisions recorded |
| **SEO / analytics** | `BreadcrumbList` byte-identical; `page_type = commercial` |
| **Visual acceptance** | V1–V10; the two pages must not look like copies of `/seo` (each keeps its own boundary and scope emphasis) |
| **Owner review** | Yes. This is the first proof that Direction C extends **by composition** |
| **Rollback** | Revert batch commit |

**→ E1-a checkpoint** (`GATE_4_QA_ACCEPTANCE_MATRIX.md` §6). Findings feed the token/component layer before B3.

### B3 — Capability pages II: `/ai-seo`, `/lead-generation`, `/conversion-optimization`

| | |
|---|---|
| **Components** | New: **`Figure`**, **`DataTable`**; `ScopeRows numbered`. Figures `AiLayers`, `CrawlerTable`, `ChainTerminus`, `ChainLossZones` reused inside `Figure` (no redraw) |
| **Dependencies** | B2; E1-a fixes |
| **Specific checks** | Table semantics and stacked layout at ≤599px; figure text ≥ 12px at 320 (or recorded as an inherited X5-class exception); A3-class SVG text under text spacing |
| **Owner review** | Yes |

### B4 — Decision pages: `/problems/traffic-but-no-enquiries`, `/pricing`

| | |
|---|---|
| **Components** | New: **`Sequence`**, **`FindingRows`**; `Crumb` extended to accept a trail (`RouteBreadcrumb`'s builder untouched); `DataTable` reused for `FactorMatrix`; `CauseZones` in `Figure` |
| **Content preservation** | The `/problems` inline action pair stays inline (not converted into a close). No pricing figures introduced |
| **Owner review** | Yes. S3 signature candidate is **not** built unless the owner approves it |

### B5 — Trust and method: `/how-it-works`, `/about`, `/faq`

| | |
|---|---|
| **Components** | New: **`Compare`**, **`DisclosureGroup`**. `MethodChain`/`MethodChainState`/`StageSystem` in `Figure`. Optional **S2 signature** (`GATE_4_MOTION_SPECIFICATION.md` §6) only if approved |
| **Content preservation** | `/faq` `FAQPage` JSON-LD from the same data; disclosure default states as production |
| **Specific checks** | `/how-it-works` length and waypoints review (it is 14.6 screens at 390; words stay, composition adds orientation); disclosures without JS |
| **Owner review** | Yes, plus S2 decision |

### B6 — Conversion: `/contact`, `/schedule-call`, `/thank-you`

| | |
|---|---|
| **Components** | New: **`Field`** skin (+ error summary skin). `ActionPair`/`Close` secondary slot for `BookingLink`. `ContactForm` logic **untouched**; only class names / wrapper markup that the form contract check proves inert |
| **Dependencies** | B1; **E6 GTM audit strongly recommended before acceptance** |
| **Content preservation** | Field contract frozen (Gate 0 §16.3); `/thank-you` no second ask; booking anchors stay `BookingLink` |
| **Specific checks** | Form contract + `dataLayer` journeys (2xx, 4xx, 5xx, network failure, validation); honeypot; error-summary focus; input boundary ≥ 3:1; iOS zoom on focus (font-size ≥ 16px) |
| **Owner review** | **Yes** |
| **Rollback** | Revert; the form component itself never changed |

### B7 — Editorial indexes, research and press

| | |
|---|---|
| **Routes** | `/blog`, `/research`, `/research/[slug]` (report **and** category), `/press`, `/press/[slug]` |
| **Components** | New: **`EntryRows`**, **`Prose`** (`dc-prose`); `Plate` for research findings; `FindingRows` reused |
| **Dependencies** | Contentful read access or fixtures (C1); `/press/[slug]` needs a fixture (C2) |
| **Content preservation** | Rich-text mapping, heading IDs, link props; `ResearchReport`/`NewsArticle` JSON-LD; empty states as production words them |
| **Owner review** | Yes |

### B8 — Blog article: `/blog/[slug]`

| | |
|---|---|
| **Components** | New: **`Contents`**; `Prose`; article opener; `Close`; related rows via `EntryRows`. `RichTextContent`, `SocialShare`, `BlogNewsletterForm`, `AuthorBio`, `RelatedServices` restyled, logic unchanged |
| **REVIEW items needing owner approval inside the batch** | (1) Non-sticky contents/sidebar (retires `sticky top-8`, which renders on zero routes per its comment); (2) consolidating `CTASection`/`CTABlock`/`StickySidebarCTA` into `Close`/`ActionPair` with the same labels and destinations; (3) responsive image sizing for Contentful images (performance; separate from visuals) |
| **Specific checks** | Page-local Article/Breadcrumb/FAQ JSON-LD identical; newsletter submission path verified **before** any change; reading-column measure |
| **Owner review** | Yes |

### B9 — Proof: `/work`, `/portfolio/[slug]`

| | |
|---|---|
| **Components** | `EntryRows`, `Prose`, `Plate`, `Close`; case register opener |
| **Dependencies** | Owner confirmation of the marks usage rule (`GATE_4_DESIGN_SYSTEM_ARCHITECTURE.md` §4.4); owner position on `LIVE-2` (preserve verbatim, or a separately authorised wording); X10 owner check (CMS copy) |
| **Content preservation** | `lib/case-study-proof.ts` governs; withheld items absent from DOM and RSC payload; no `BreadcrumbList` added without approval |
| **Owner review** | **Yes** (proof governance, `DEC-012`/`DEC-031`) |

### B10 — Utility and legal: `/privacy-policy`, `/terms`, 404, `/launch-checklist` (optional)

| | |
|---|---|
| **Components** | New: **`DocumentLayout`**; `Contents`; `EntryRows` for 404 |
| **Content preservation** | Legal text byte-identical; `noindex`; page-local `BreadcrumbList` byte-identical; 404 status and `/404` canonical |
| **Owner review** | Yes; owner choice on `/launch-checklist` |

### B11 — Consolidation and cleanup

| | |
|---|---|
| **Scope** | Delete `ChromeSwitch`, `LEGACY_CHROME_ROUTES`, legacy `Header`/`Footer` and their root shims; `components/homepage/*` and `app/resolve-motion.css` (E16) after a selector check; legacy `commercial/*` and `routes/*` primitives **only** where the import graph shows no consumer (figures reused inside `Figure` stay); font consolidation F1 if approved; optionally dead `components/ui/*` and their dependencies (a `package.json` change = REVIEW) |
| **Checks** | Import graph; whole-site suite; CSS/JS/font bytes before/after; throttled CLS all routes |
| **Owner review** | **Yes** (deletions, dependencies, fonts) |
| **Rollback** | Revert the cleanup commit (restores files; behaviour was already Direction C) |

---

## 2. After Gate 4

Gate 5 (site-wide responsive QA) → Gate 6 (visual polish) → Gate 7 (regression, incl. E1-c, E6 completion) → Gate 8 (staging)
→ Gate 9 (production), per the Implementation Plan. **PROC-1 must be resolved, or explicitly accepted by the owner, before any
merge to `main`**, because a push to `main` currently deploys to production.

## 3. Estimated effort (WORKING HYPOTHESIS)

Relative only, from the complexity scores: B0 M · B1 S (+L verification) · B2 S · B3 M · B4 M · B5 L · B6 L · B7 L · B8 XL · B9 L/XL ·
B10 M · B11 M. No calendar estimate is given: CMS access, E1 device availability and owner review turnaround dominate the
schedule and are unknown.
