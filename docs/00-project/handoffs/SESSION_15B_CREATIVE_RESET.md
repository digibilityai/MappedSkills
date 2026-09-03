# Claude Session Handoff

## Session
- Session ID: 15B — Digital Creative Reset
- Date: 2026-09-02 · Branch: `test_branch` · HEAD unchanged: `a68dfaec673e2698653296b531bbd133ccb10d57`
- Model: Claude Opus 5
- Role: **Digital creative director / interaction designer / web art director.** Not design-system
  documentarian, not implementation, not homepage production.
- Purpose: after the owner rejected the Session 15 homepage as *"a document / journal / textbook"*,
  find the visual experience the website actually wants — as three genuinely different,
  browser-rendered creative directions with working motion.

## Owner verdict, carried as binding
The Session 15 homepage **is not approved.** It reads as a document, the concepts feel lost, there
is effectively no animation, it is not vibrant, and it feels typeset rather than digitally
designed. **This overrides Session 15's own "no material drift" finding and was not defended** with
F2, F3, device budgets, accessibility or Direction 2 compliance.

## What was reset, and what was not
**Reset:** the visual expression. **Direction 2 — "THE WORKING SHEET" is no longer binding as the
sitewide visual treatment.**
**Not reset, and binding on all three directions:** strategy, positioning, IA, approved messaging,
approved copy, UX architecture, CRO architecture, CTA architecture, evidence discipline,
measurement discipline, blocked-content rules, the F1 taxonomy.
**THE RECORD is redefined as a CREDIBILITY SYSTEM** governing evidence, provenance, measurement,
limitations and accountability — **not** the genre of every surface.

## Completed work — `docs/19-creative-reset/`
| File | What it is |
|---|---|
| `00_WHY_SESSION_15_FAILED.md` | The design diagnosis: the credibility system was promoted to the visual genre, and the F2/F3 metric rewards typographic hierarchy, so a page tuned to it converges on well-set prose |
| `01_REFERENCE_RESEARCH.md` | Eight sources, all observed 2026-09-02, each reduced to a **principle** and a note on where it changed a decision. Limits stated: desk research on written sources, not hands-on audits |
| `02_DIRECTION_A_THE_SIGNAL_FIELD.md` | Direction A, ten required points |
| `03_DIRECTION_B_THE_SWITCH.md` | Direction B, ten required points |
| `04_DIRECTION_C_THE_TRACE.md` | Direction C, ten required points |
| `05_DIRECTION_COMPARISON.md` | Signature moments, CAPTURE→CONVERT→MEASURE, motion, evidence, mobile, accessibility and performance — all measured |
| `06_SELF_CRITIQUE_AND_RECOMMENDATION.md` | The document test, self-critique A–H per direction, and the recommendation |
| `prototype/a-signal.html` | **Direction A**, browser-rendered, canvas signal field with operable gates |
| `prototype/b-switch.html` | **Direction B**, browser-rendered, whole-surface state inversion |
| `prototype/c-trace.html` | **Direction C**, browser-rendered, live self-instrumenting trace |
| `prototype/index.html` | Comparison sheet, all three side by side |
| `prototype/README.md` | How to run them and what to do in each |

## Measured in the browser at 1440×900 and 390×844
- Text below the WCAG threshold: **0 elements in each of the three** (after two fixes: A's readout
  colour and small control text; B's display accent darkened to `#D94400` for the light ground).
- Rendered text below 12px: **0 in each.**
- Horizontal overflow: **none in any direction, at either width.**
- `<img>` / stock photography / fixed sales CTA: **zero in all three.**
- C's network requests beyond the document and two webfonts: **0, verified.**
- Prohibited generic devices (gradient blobs, orbs, glassmorphism, bento, SaaS cards, fake
  dashboards, tapered funnels, AI brains, 3D, parallax, cursor gimmicks, scroll hijack):
  **counted at zero in all three.**

**Not tested, and not claimed:** screen readers, real devices, other browsers, OS-level
`prefers-reduced-motion` (declared and code-reviewed only), full keyboard walk-through, print, and
**any user testing whatsoever.**

## Recommendation
> **RECOMMENDED DIRECTION: B — THE SWITCH.** It answers the owner's verdict both statically and in
> motion, it is the only direction whose value survives having its animation switched off, it is
> the cheapest to run, and its idea comes directly from the approved H1.

**All three remain available, unmerged.** No hybrid was created and no direction was folded into
another. **The owner chooses; Claude did not.** If the priority is a moment people repeat rather
than a system that scales, **C** is the stronger answer.

## Scope discipline
No production file created, modified or read for the purpose of changing it — nothing in `app/`,
`components/`, `styles/`, `hooks/`, `lib/`, `public/`, `scripts/` or any config. **No approved
artefact altered** — `DECISION_LOG.md`, `QUALITY_GATES.md`, `docs/16-ux/`, `docs/11-creative/`,
approved messaging and approved copy are unchanged. **`docs/17-visual-validation/` and
`docs/18-design-system/` are both unchanged** — Session 15 is preserved intact as the negative
reference. Nothing invented. No design system was built. No route other than a creative-direction
fragment was designed. `F17` remains BLOCKED and undrawn.

**Nothing was staged, committed or pushed. `README.md` remains untouched and untracked.**

## Next session — recommended, not authorised
Owner review of all three. Only after a direction is chosen should the design system be developed
and the complete homepage rebuilt in it. Three rules should be written at that point, one per
direction, because each has a named "where may this device appear" gap:
**A** — where the signal field may appear · **B** — how often the switch may be used, and the
boundary that keeps it from becoming the retired `BeforeAfterMetric` pattern · **C** — the privacy
statement must stay literally true, and fonts must be self-hosted.

## Verdict
> **THREE DIGITAL DIRECTIONS READY FOR OWNER REVIEW**
