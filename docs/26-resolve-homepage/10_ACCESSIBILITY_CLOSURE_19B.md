# THE RESOLVE — Complete Homepage — Session 19B Accessibility Closure

**Session:** 19B · **Date:** 2026-09-04 · **Branch:** `test_branch`
**Status:** **PROPOSED. Gate 10 remains formally OPEN. Claude does not pass Gate 10.**
**Scope:** one defect — invalid interactive-content nesting in the stage tablist. **DOM and
semantics only.** No design pass, no copy change, no route change, no new interaction.

---

## 1. The defect, as found in Session 19A

Seven capability `<a href>` links were nested inside `<button role="tab">` elements:

```
<li>
  <button role="tab">            ← interactive
    01  Capture
    Reach the buyers already looking…
    <a href="/seo">…</a> ×4      ← interactive inside interactive
  </button>
</li>
```

**Why it blocked Gate 10.** A `<button>`'s content model prohibits interactive descendants, so
this is invalid HTML with unpredictable browser and assistive-technology behaviour. The measured
consequence: **each tab's accessible name was 126 characters**, absorbing its whole panel —
*"01Capture Reach the buyers already looking. Some demand never reaches you at all. Organic
searchGoogle AdsPaid…"*. These seven links are the compressed homepage's entire capability routing.

## 2. The correction

```
<li>                                              ← row padding lives here now
  <button class="stg" role="tab" id="stg1"
          aria-controls="panel-capture chain">    ← identity only
    <span class="stg__n" aria-hidden="true">01</span>
    <span class="stg__t">Capture</span>
  </button>
  <div class="stg__b" id="panel-capture"
       role="tabpanel" aria-labelledby="stg1">    ← SIBLING, not descendant
    …copy…  <a href="/seo">Organic search</a> ×4
  </div>
</li>
```

**Preserving the composition.** The row's padding moved from `.stg` to `.stages li`, and the panel
carries `margin:4px 0 0 calc(var(--numw) + 16px)` so it still begins in the title's column. The
numeral track was pinned at a deterministic `20px` rather than `auto`.

**Additional semantics brought to a correct tab interface** (§4 of the brief):
`role="tabpanel"` + unique `id` + `aria-labelledby` on each panel · `aria-controls` naming both the
panel and the shared chain figure · a **roving `tabindex`** so the tablist is one tab stop ·
**`Home` / `End`** added alongside the existing arrow keys.

**`inert` on collapsed panels.** A clipped panel's links were still focusable — a focus ring on an
invisible control fails WCAG 2.4.7. Non-selected panels are now `inert`, which removes them from
the tab order and the accessibility tree **without touching layout or the collapse transition**.
**With no script, and under reduced motion, every panel is open and nothing is inert** — verified.

**`aria-hidden` on the ordinal numeral**, whose position in the tablist already conveys the order,
so the accessible name is exactly the stage identity.

## 3. Results

| Measure | Before | After |
|---|---:|---:|
| Interactive elements nested inside interactive elements | **7** | **0** |
| Tab accessible-name length | **126 chars** | **7 chars** |
| Tab accessible names | *"01Capture Reach the buyers already…"* | **"Capture" · "Convert" · "Measure"** |
| Duplicate IDs · broken `aria-controls` · orphan tabpanels · invalid hrefs | — | **0 · 0 · 0 · 0** |
| Tabs / tabpanels, correctly paired | 3 / 0 | **3 / 3** |
| Tablist tab stops | 3 | **1** (roving tabindex) |
| Capability links, routes | 7 | **7, all unchanged** |

**Keyboard, verified by dispatching real events:** `ArrowRight` → stg2 + chain 2 · `ArrowLeft` →
stg1 + chain 1 · `End` → stg3 + chain 3 · `Home` → stg1 + chain 1, focus following selection in
every case. Only the open panel's links are in the tab order; the other panels are `inert`.

## 4. Visual non-regression

Measured like-for-like with stage 03 selected in both builds and transitions neutralised.

| Viewport | Page height Δ | System height Δ | Next chapter Δ | Overflow |
|---|---:|---:|---:|---|
| 1425 | **0** | **0** | **0** | none |
| 1080 | **0** | **0** | **0** | none |
| 860 | **0** | **0** | **0** | none |
| 761 | **0** | **0** | **0** | none |
| 760 | **0** | **0** | **0** | none |
| 430 | **0** | **0** | **0** | none |
| 390 | **0** | **0** | **0** | none |
| 360 | **0** | **0** | **0** | none |

Chain box `61,1302×281` at 1425 — **identical**. Capability links begin at x=97, against 97–99
before (sub-pixel rounding). Stage row heights 86/86/217 against 85/85/216, which is the 1px
border now included because the measured box is the `<li>` rather than the button — confirmed by
the system-height and next-chapter deltas of exactly 0.

## 5. One regression introduced and fixed inside this session

Moving the padding to the `<li>` left the button containing only its title, so at display sizes
below 2.5rem **the tab's own box fell under the 40px interaction floor** — measured 35px at 1080,
28px at 860, 25px at 761 and 19px at 760. Fixed with the **same invisible centred `::after`
extender** used in 19A. **Verified: 0 controls under 40×40 at all eight widths, and 0 overlaps
between adjacent tab extenders**, so no tab can steal a neighbour's tap.

## 6. Regression suite

| Check | Result |
|---|---|
| Contrast, WIDE (91 nodes) / 390 (78 nodes) | **0 / 0 failures** |
| Heading jumps · `<h1>` | 0 · 1 |
| F2 WIDE / NARROW | **PASS** — 5.05× / 2.05×, hero stage still teased at y=651 |
| F3 WIDE / NARROW | **PASS** — type peaks 101/48/69/69/43/86/18/93 and 41/24/32/32/24/43/17/38, identical to 19A |
| Hero bars equal · inline size styles | **yes · 0** |
| Capability routes | **7/7 unchanged** |
| Live T3 | **4** — `dep on` · `chain on` · `close on` · the rAF hero departure. Boundary still |
| No-JS | 3/3 panels open · **7/7 links visible and tabbable** · 3/3 tabs tabbable · 0 inert · chain drawn · dashes `5px,5px` · bars equal |
| Reduced motion | `stages all` · 3/3 panels open · **7/7 links tabbable** · 0 inert · both controls work · panels stay open after use |

## 7. What was not changed

Page length · section order · copy · hero · mobile composition · typography · colour · F1
structure · motion (nothing added, nothing removed) · `docs/24-resolve-governance/` ·
`DECISION_LOG.md` · `QUALITY_GATES.md` · `CURRENT_STATE.md` ·
`docs/20-creative-convergence/prototype/convergence.html` (`c6d29fd34cf7c5e481d8244773f7d357`,
unchanged) · root `README.md`.
