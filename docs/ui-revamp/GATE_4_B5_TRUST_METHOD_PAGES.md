# MappedSkills UI Revamp — Gate 4 · B5: Trust and Method Pages (`/how-it-works`, `/about`, `/faq`)

| | |
|---|---|
| **Date** | 2026-10-12 |
| **Authority** | `DEC-050`: B5 authorised, with the owner's temporary sequencing exception for SR-1 – SR-5. Local work and local commits only |
| **Base** | `ui-revamp` @ `ad24166` (A1: `e9ce6d5` + `ad24166`). The R0 worktree was not touched |
| **Status** | **COMPLETE — awaiting owner review.** **SR-1 – SR-5 remain OUTSTANDING (deferred by owner decision; not passed, not waived).** The site is not claimed to be fully accessible or production-approved. Nothing pushed, merged or deployed |

## 1. What changed

| Route | Register | Composition |
|---|---|---|
| `/how-it-works` | Method — the chain is the spine | **Opener:** `ServiceOpener` with no CTA, as production.<br>**§1:** two observations.<br>**§3 spine:** `Stages` (Capture / Convert / Measure, equal columns), then `MethodChain`, then `FindingRows` for the six measured points.<br>**§4:** the owned statement beside `NotPromised`.<br>**§5:** `MethodChainState` and the six attribution gaps, with the "measurement gap never disqualifies" principle on an owned (tangerine) rule.<br>**§6 and §8:** `StatedRows`.<br>**§7 and §10:** statements.<br>**Close:** the tangerine close.<br>§2 and §9 still render nothing (owner-blocked) |
| `/about` | Firm — calm, fewest components | **Opener:** `ServiceOpener` with no CTA.<br>**§1:** why we work this way.<br>**§2:** the owned statement "Accountable up to the qualified enquiry".<br>**§3:** how we work, with `TLink` to the method.<br>**§5:** titled check rows.<br>**§7:** `Compare` (the same two arrays and labels as production).<br>**§8:** where we are today.<br>**Close.**<br>§4 (people) and §6 (company facts) still render nothing; no entity JSON-LD |
| `/faq` | Question — groups of disclosures | **Opener:** `ServiceOpener`.<br>**Questions:** five groups, each with its label beside a `DisclosureGroup` (native `<details>`, **collapsed on load as production**).<br>**After the groups:** "Something not answered here", then the close.<br>`FAQPage` JSON-LD is still generated from the same `QAS` array |

**Files changed:**
- `components/direction-c/primitives.tsx`: **additions only** — `Stages`, `Compare`, `DisclosureGroup`, `StatedRows`.
- `app/direction-c-pages.css`: **appended selectors only**, plus one modifier, `.dc-callout.owned`.
- The three route files.

The three pages opt into the existing 92 % display fallback (`dc-fallback-b`): the 90.5 % default re-wrapped the H1 at `/how-it-works` 320 and `/about` 360 (`run/fallback-sweep.txt`). **S2** (the chain drawing in) is not authorised, so the figures are static. The only motion is the shared close arrival (`DcMotion`).

**Preserved, verified identical:**
- copy;
- headings (levels and text);
- links and destinations;
- CTA labels;
- metadata, canonicals and JSON-LD;
- analytics and consent;
- the collapsed-on-load FAQ behaviour.

No dependency, lead-capture, CRM, database, workflow or deployment change.

## 2. Verification

Local production builds: `ad24166` against the B5 tree, served on loopback. Engines are Playwright proxies, not real devices.

| Check | Result |
|---|---|
| typecheck · lint · unit tests · build · cPanel build | pass · pass · 30/30 · pass · pass |
| Inventory, 34 targets (text, headings, links, CTAs, JSON-LD, meta) | 845 identical; **5 declared differences:** shared close motion present ×3 (as every Direction C close); `/about`'s two method links gain `TLink`'s `aria-hidden` arrow ×2 (the B2 `ProofLink` → `TLink` swap). Accessible names unchanged |
| Served head | 34/34 identical |
| Analytics / forms / consent compare | 0 differing sections |
| Accessible names (headings, links, buttons, form controls) × Chromium, WebKit, Firefox | identical; `/how-it-works` 13 headings, same levels |
| `layout.cjs` (7 widths, overflow, text spacing, 200/400 % zoom) × 3 engines, 10 targets (B5 + 7 B1–B4 controls) | **NEW 0** in every engine |
| `a11y.cjs` (axe, Tab walk and focus visibility, reduced motion, forced colours) × 3 engines | **NEW 0**; **RESOLVED 4**: KD-03 grey-text contrast on `/how-it-works` and `/about` |
| `/faq` disclosures (`b5/faq-disclosure.cjs`) | **23/23 PASS**:<br>• served HTML has 11 `<details>`, none open;<br>• `FAQPage` names equal the visible summaries, in order;<br>• × 3 engines × 390/1440: Tab reaches every summary in order with a visible outline, Enter opens and Space closes;<br>• × 3 engines with JavaScript off: every answer opens |
| A1 figure probe on `/how-it-works` (new column widths) | text < 12px **0**, < 4.5:1 **0**, clipped/overlaps/crossings **0** (Chromium, WebKit); 1.4.12 text spacing at 320–430: **0** clipped |
| Throttled CLS (3 routes × 7 widths × 2 runs) | max **0.028 → 0.004** |
| B1–B4 unaffected: `<main>` pixels, 11 routes × 390/1440 (Chromium) | **22/22 identical** |

**Screenshots** (`gate-4/b5/evidence/shots/`):
- after, Chromium: 390, 768 and 1440 (wide captures downscaled to 900px), plus `/faq` with one answer opened;
- after, Firefox and WebKit: 390;
- before, Chromium: 390 and 1440, for comparison.

## 3. Outstanding

- **SR-1 – SR-5 (VoiceOver / TalkBack): OUTSTANDING.** Deferred by the owner as a temporary sequencing exception (`DEC-050`). Required for release readiness; not a pass or a waiver. B5 reuses `NotPromised` (`/how-it-works` §4), which SR-5 covers.
- **E1** real-device and cross-browser testing: outstanding.
- **KD-02:** forced-colours focus on B6/B8–B10 bodies; still gated "before staging".
- **Unchanged from earlier records:** OBS-20 (non-blocking); KD-09 / KD-10 closure awaiting owner confirmation (A1); LIVE-1, LIVE-2 and PROC-1 open; `/how-it-works` §2/§9 and `/about` §4/§6 owner-blocked content.

**B6 can begin only on owner approval of B5.** E6 (the GTM container check) is strongly recommended before B6 acceptance.
