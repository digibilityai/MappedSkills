# Wireframe — STATE 03 — Evidence Disclosure (S3) — closed / open / print / no-JavaScript — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`. Applies to the [EVD: EXPANDABLE] pattern (P4) wherever it appears — e.g. `32_WIREFRAME_MASTER_COMMERCIAL.md`, `35_WIREFRAME_MASTER_LONGFORM.md`.
**Source of structure:** `10_EVIDENCE_INTERACTION_UX.md` §3–§4.

---

## Margin notes

- **Page type:** Applies sitewide, component-state artefact.
- **First screen / apparatus:** N/A — component states only.
- **F1 class:** N/A.
- **CTA roles/locations:** N/A — a disclosure is never a CTA object (P4 explicitly a link/control, not conversion).
- **Omitted slots:** none.
- **Technical dependency:** none that is load-bearing. **The pattern must function with no script** — see STATE 4. Script may improve it; it may not be required for the evidence to be read.
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P4 *(this artefact is P4's complete state set)*.
- **Width class shown:** WIDE and NARROW both shown (disclosure behaviour is width-independent per `10`§7 — no shift above the reader's line, at any width).
- **What this artefact uniquely proves:** in place, no shift above the reader's line, all open in print, **and still reachable with no JavaScript** — the disclosure pattern's binding contract (`10`§4) shown as four concrete states rather than prose. STATE 4 is the artefact's answer to test F7.

---

## Four states of one [EVD: EXPANDABLE] instance

```
STATE 1 — CLOSED (default)
┌─────────────────────────────────────┐
│ [claim text, full weight]             │
│ ▸ Method and sample   (control names   │
│    what it reveals — never "More")     │
└─────────────────────────────────────┘

STATE 2 — OPEN (in place, downward expansion only)
┌─────────────────────────────────────┐
│ [claim text, full weight — UNCHANGED,  │
│  same position — no layout shift above │
│  this line]                             │
│ ▾ Method and sample                     │
│  ┌───────────────────────────────┐      │
│  │ what · when · where · how many │      │
│  │ · by whom — content was always  │      │
│  │ in the DOM, not fetched on open │      │
│  └───────────────────────────────┘      │
│  (focus retained on the control;         │
│   aria-expanded=true)                     │
└─────────────────────────────────────┘

STATE 3 — PRINT (all disclosures forced open)
┌─────────────────────────────────────┐
│ [claim text]                            │
│  Method and sample:                     │
│  what · when · where · how many · by     │
│  whom  — RENDERED OPEN, no control shown, │
│  no chevron, no collapsed state exists     │
│  in print output                            │
└─────────────────────────────────────┘


STATE 4 — NO JAVASCRIPT (script blocked, failed, or not yet executed)
┌─────────────────────────────────────┐
│ [claim text, full weight — unchanged] │
│  Method and sample:                    │
│  what · when · where · how many · by    │
│  whom — REACHABLE WITHOUT SCRIPT         │
│                                            │
│  Either the native disclosure still opens   │
│  and closes with no script at all, or —      │
│  if the control cannot function — the         │
│  content RENDERS OPEN and the control is       │
│  not drawn.                                     │
│                                                  │
│  NEVER: a control that is present but inert,      │
│  and NEVER content that stays hidden behind it.    │
└─────────────────────────────────────┘
```

### Why STATE 4 exists

**`10_EVIDENCE_INTERACTION_UX.md` §4 already requires it:** *"Works without JavaScript — the disclosure is a native, semantic disclosure. If script fails, the evidence is still reachable. This is the site's differentiator; it must not depend on a bundle loading."* This artefact previously showed three states and left the no-script case in prose, which is the one place a dead control could survive into implementation unnoticed.

**Two acceptable implementations, one unacceptable outcome.**

| | Behaviour without script | Acceptable |
|---|---|---|
| **Preferred** | A native semantic disclosure that opens and closes with no script whatsoever. The reader gets the same STATE 1 → STATE 2 behaviour | **Yes** |
| **Fallback** | The control is not rendered and the apparatus renders open, as in STATE 3 (print) | **Yes** — the evidence and the limits are still present, in DOM order, beneath their claim |
| **Failure** | The control renders, does nothing when activated, and the content stays hidden | **No. This is the state this artefact exists to prohibit** — critical information behind a dead control |

**Three things STATE 4 must not weaken, and does not:**

1. **DOM presence is unchanged.** Content is always in the DOM and is never fetched on open (`10` §4) — which is *why* the fallback is possible at all.
2. **Limits are not a disclosure and are unaffected.** `[LIM]` content is **ADJACENT-SECONDARY and always open at every width, in every context** (`10` §5, B29). A limit is never inside a `[EVD: EXPANDABLE]` control, so no script failure can hide one. **STATE 4 changes nothing about limits; it only guarantees that `EXPANDABLE` apparatus degrades to visible rather than to unreachable.**
3. **Keyboard, print, deep-link and reduced-motion rules are unchanged.** With script, `Enter`/`Space` operate the control, focus is retained, fragments open and focus the target, all disclosures render open in print, and the open transition is instant under `prefers-reduced-motion`. Without script, the preferred implementation keeps keyboard operation natively; the fallback needs none, because nothing is closed.

**Test that decides it (F7, `20` Part F):** *no-script, no-hover, greyscale — fails if any evidence is unreachable, any status ambiguous, any limit invisible, any destination unreachable.* **STATE 4 is this artefact's answer to F7.**

**Deep-link state (annotated, not diagrammed separately):** a fragment link targeting a closed disclosure opens it and moves focus to it — same visual result as STATE 2, triggered by URL rather than click.

**Reduced-motion note:** STATE 1 → STATE 2 transition is instant appearance under `prefers-reduced-motion`; no easing, no delay.

**Prohibited on this wireframe (checked):** an "expand all" control, a global evidence toggle, nested disclosures, a modal or new-page presentation of STATE 2, a control labelled "More"/"Details"/bare chevron, any layout shift above the claim's line when opening, a collapsed disclosure in the print state, **a disclosure control that renders without script but cannot be operated**, **any apparatus that becomes unreachable when script fails**, and any limit placed inside a disclosure at any width.
