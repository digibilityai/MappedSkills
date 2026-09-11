# Layout, Spacing and Surfaces — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED

> **This is not "container + card + grid".** The system supports full-width visual events,
> controlled reading widths, deliberate asymmetry, visual fields, evidence substrates and a
> conversion inversion — because the direction needs all six.

---

## 1. Page frame

| Token | Value | Role |
|---|---|---|
| `page-gutter` | `clamp(18px, 3.6vw, 52px)` | The page's outer margin at every width |
| `page-max` | `min(1460px, 100%)` | The working width. **Centred** |
| `reading-max` | `56–60ch` | Body copy. Never stretched to fill |
| `lede-max` | `40–44ch` | Hero support and section ledes |
| `stage-max` | full page width | Visual fields and progression rails |
| `bleed` | `100vw` | Surface changes only — see §5 |

**Content is centred within `page-max`; composition inside it is frequently asymmetric.** The
left-anchored spine of the earlier direction is **not** carried forward — it was part of the
document geometry.

## 2. The four layout regions

Everything on a page is one of these. There is no fifth, and there is no generic grid.

| Region | Structure | Used for |
|---|---|---|
| **Reading region** | One column at `reading-max`, generous space around it | Argument copy, the boundary's paragraphs |
| **Split region** | Two columns, deliberately unequal (≈0.86 / 1.14 or 0.92 / 1.08) | Copy beside an apparatus; five refusals beside one commitment |
| **Stage region** | Full `page-max`, a defined height, the field drawn inside it | The hero apparatus, the capture/convert/measure sequence |
| **Inversion region** | Full-bleed surface change, content still on `page-max` | The conversion moment |

**Split ratios are never 50/50.** Equal columns read as a grid; unequal columns read as a
composition. This is a small rule that does a lot of work.

## 3. Spacing

A **4px base** with large jumps: `4 · 8 · 12 · 16 · 20 · 26 · 34 · 44 · 60 · 80 · 110 · 150`.

Section padding is expressed as ranges, not fixed values:

| Rhythm | Range | Used for |
|---|---|---|
| Tight | `clamp(24px, 3vw, 42px)` | Seams and handoffs |
| Standard | `clamp(56px, 8vw, 120px)` | Ordinary sections |
| Major | `clamp(64px, 9vw, 150px)` | The commercial argument, evidence, conversion |
| Stage | `100svh` with `clamp(20px, 4vh, 48px)` internal padding | Pinned sequences only |

**Two binding rhythm rules:**

1. **The space before the conversion moment is the largest gap on the page.** The pause is what
   makes the action read as intentional rather than pushy. Carried unchanged from the approved CRO
   architecture.
2. **A reading region always has more space around it than inside it.** Copy is never crowded by
   the visual system.

## 4. The surface system

Dark-first must not mean one endless black canvas. **Four surfaces, each with a job.**

| Surface | Value | Job | Budget |
|---|---|---|---|
| **Primary field** | `background-primary` `#0B0908` | The site's ground and the home of the signal field | unlimited |
| **Raised region** | `background-raised` `#151110` | A distinct region of argument. Marks "this is a different kind of thinking" | **max 2 per page** |
| **Evidence substrate** | `background-raised` + a warm amber wash falling off from the top edge | **Only** beneath a claim being inspected. It is the surface *under* the claim | **max 2 per page**, and only under a claim |
| **Conversion inversion** | Full-bleed `commercial-accent`, ground colour as ink | The one full-colour event. The end of the story the field tells | **exactly 1 per page**, at the conversion moment |

### 4.1 Surface rules

- **A surface change must mean something.** Alternating grounds for rhythm is prohibited.
- **The evidence substrate is never a card.** It has no border, no radius, no shadow and no
  elevation — it is the ground being lit.
- **The conversion inversion is the only full-colour surface.** One per page, always at the
  conversion moment, always full-bleed.
- **Light inversion:** permitted in principle for a strategic reason, **not designed, and none may
  ship until its rules are written** (`01` Part 3, item 1).

### 4.2 Explicitly prohibited surfaces

Cards as a general container · glassmorphism, frosting or blur · floating panels · drop shadows and
elevation of any kind · SaaS dashboard chrome · bento grids · tinted section bands used for rhythm ·
any surface with a radius above ~4px other than the pill-free controls defined in `09`.

**Radius:** `2px` on controls and fields, `0` on surfaces. There is no pill and no rounded card in
this system.

## 5. Full-bleed rules

A surface may bleed to the viewport edge; **content never does**.

- Bleeding elements use `width: 100vw` with the section's own horizontal padding restoring the
  page gutter, and the page root carries `overflow-x: clip` so the bleed can never produce a
  horizontal scrollbar. *(A band that stops short of the viewport edge reads as a rendering defect —
  a real finding from Session 15C.)*
- **Verified in the approved prototype: no horizontal body overflow at 1440 or 390.**

## 6. Overlap and layering

Layering is allowed and is part of the composition, under three rules:

1. **The field never sits on top of reading text.** It is masked so it *emerges from* the copy and
   gathers toward the apparatus. Where they meet, the field yields.
2. **Only two z-layers exist in a region:** the field (behind) and the content (in front).
   Navigation sits above both. There is no third.
3. **Nothing overlaps a control**, and nothing overlaps text that must be read.

## 7. Responsive layout transitions

Behaviour, not pixels — the numbers are an implementation output (`13_RESPONSIVE.md`).

| At NARROW | |
|---|---|
| Split regions | become a single column, in the same reading order |
| Stage regions | **recompose** — the field becomes a tight band that feeds the apparatus, not a scattered version of the wide field |
| Reading regions | keep their measure; gutters shrink to their minimum |
| Multi-column detail | collapses to one column |
| The inversion | unchanged; it is already full-bleed |
