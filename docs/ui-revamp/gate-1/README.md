# Gate 1 — Design-Direction Package

**Status:** delivered 2026-10-08 · **Direction C selected by the owner (`DEC-034`, 2026-10-08)** for Gate 2 implementation. The approved reference is `prototypes/direction-c-resolution-approved.html` (frozen). Directions A and B are retained as exploration. Nothing else here is approved.
**Decision document:** [`../GATE_1_DESIGN_DIRECTIONS.md`](../GATE_1_DESIGN_DIRECTIONS.md)

This folder is isolated review material. **Nothing here is imported by the application**, and no application code, dependency, configuration or protected system was changed by Gate 1.

## Contents

| Path | What it is |
|---|---|
| `prototypes/index.html` | Start here: the three directions side by side, the comparison table and the owner decision |
| `prototypes/direction-a-ledger.html` | Direction A — Ledger |
| `prototypes/direction-b-instrument.html` | Direction B — Instrument |
| `prototypes/direction-c-resolution.html` | Direction C — Resolution, working copy. **Selected (`DEC-034`).** Mobile-refined 2026-10-08 (pass 1 + pass 2 + Gate 2 Phase A nav rulings) |
| `prototypes/direction-c-resolution-v1.html` | Direction C exactly as delivered at Gate 1, frozen as the "before" for the mobile refinement |
| `prototypes/direction-c-resolution-r1.html` | Direction C after mobile pass 1, frozen as the "before" for pass 2 |
| `prototypes/direction-c-resolution-r2.html` | Direction C after mobile pass 2, exactly as the owner reviewed it. Frozen |
| **`prototypes/direction-c-resolution-approved.html`** | **The approved Direction C reference (`DEC-034`), frozen.** r2 plus the two owner navigation rulings: one Contact Us while the mobile menu is open, and a "Company" label in the mobile menu. sha256 `193b4ab8…da205a3` |
| `mobile-refinement/gate2-phase-a/` | Gate 2 Phase A regression run on the approved prototype (audit, keyboard, pass-2 checks, motion, nav-fix checks) |
| `mobile-refinement/MOBILE_UX_RESOLUTION.md` | Mobile UX refinement report: defects, changes, validation, exceptions, recommendation |
| `mobile-refinement/compare.html` | Before/after at 360, 390, 430 (+ menus, + 768/1024/1440 regression check) |
| `mobile-refinement/validation/` | Audit, keyboard and motion scripts with their raw output |
| `mobile-refinement/pass-2/MOBILE_UX_PASS_2.md` | Mobile pass 2 (refinement & final validation): audit, change log, validation, exceptions |
| `mobile-refinement/pass-2/compare.html` | Pass-2 before/after at 360, 390, 430 (menu, chain, /seo, proof, services, close, footer) + 768/1024/1440 |
| `screenshots/{a-ledger,b-instrument,c-resolution}-{1440,1024,768,430,390,360}-fold.png` | First viewport at each programme width (design-only mode, reduced motion = composed state) |
| `screenshots/*-{1440,390}-full.jpg` | Full-page captures |
| `screenshots/*-390-menu-open.png` | Mobile menu open: CTAs first, in normal flow (the LIVE-1 structure cannot occur) |
| `screenshots/motion/*-NNNNms.png` | Timed frames of each direction's signature and data motion |

## Each prototype contains

1. Homepage hero.
2. Strategy section (friction + the chain and its accountability boundary).
3. Proof / evidence section.
4. Services overview (4a) and a detailed service page excerpt, `/seo` (4b).
5. Conversion close.
6. Global chrome: header, services panel, mobile menu and footer.
7. Three live 390px mobile frames.
8. A system sheet.

Every prototype also has:
- a top **review bar** (not part of the design) with **Replay motion** and a **Reduced motion** toggle;
- striped **review tags** naming each section.

`?frame=1` hides all review material and shows the design only. `&menu=1` opens the mobile menu.

## How to view

The mobile frames and the index thumbnails use relative paths. Serve the folder over HTTP instead of opening the files directly:

```bash
python3 -m http.server 8765 --bind 127.0.0.1 --directory docs/ui-revamp/gate-1
```

Then open `http://127.0.0.1:8765/prototypes/index.html`. Resize the window to see each direction recompose at 1440, 1024, 768, 430, 390 and 360.

Fonts load from Google Fonts for review only. Production self-hosts them through `next/font`.

## Rules the prototypes follow

- **Copy:** verbatim from the repository where it exists. Text in **[brackets]** is structural placeholder, not proposed copy.
- **LIVE-2:** the contradictory proof headline is **not** reproduced.
- **Numbers:** first-party and already published only, always with their scope: 4 assistants, 28 runs, 0 named, 15 of 28 with directory sources, 2 untestable, 4 of 5 own-site checks. **No client figure appears anywhere.** Mark fields are captioned *"illustrative, not counts"*.
- **Motion:** no dependencies, no images, no canvas. Motion is transform, opacity and colour only, and every element renders composed without JS or with reduced motion.

## Verification performed (VERIFIED)

- Playwright Chromium at the six programme widths found **zero horizontal overflow** and **zero console errors** in every direction.
- Header, content and footer left-edge alignment was measured (see the decision document §3).

**Not performed:** real devices, other browsers, screen readers, Core Web Vitals and user testing.
