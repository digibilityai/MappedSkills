# Wireframe — MASTER 06 — Index (W6, modelled on `/research`) — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`.
**Source of structure:** `03_PAGE_TYPE_ARCHITECTURE.md` §7, §9 · `17_REUSABLE_UX_PATTERNS.md` P9 (metadata-forward entry card).

**Covers structurally:** `/research`, `/blog` (variant — byline IMMEDIATE only, pagination required before scale per Contentful's 100-item ceiling).

---

## Margin notes

- **Page type:** Index. Metadata-forward cards, the one legitimate use of cards on this site, pagination.
- **First screen:** what research means here and the standard applied; entries begin immediately after.
- **F1 class:** **D — NONE.**
- **CTA roles/locations:** [SEC] RESEARCH primary (open entry/subscribe) · [ACT] PRIMARY well below fold if at all. **Sticky prohibited.**
- **Omitted slots:** which entries publish [BLK — CONDITIONAL, cannot publish before entries exist]; named authorship [BLK — owner input].
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P5 *("what this is not yet")* · P9 · R1 · R2. **No breadcrumb (P12)** — top-level route.
- **Width class shown:** WIDE (primary). NARROW: cards stack; metadata stays on the card, not truncated (`03` §7).
- **What this artefact uniquely proves:** P9 is the one legitimate card pattern on the site — metadata (date/systems/sample/version) IMMEDIATE on every card, distinguishing this index from a generic blog listing; a module that cannot be filled with genuinely relevant items does not render (no padding, no "coming soon").

---

## WIDE structural diagram

```
┌───────────────────────────────────────────────────────────┐
│ [NAV] Header — no breadcrumb (top level)                    │
├───────────────────────────────────────────────────────────┤
│ WHAT RESEARCH MEANS HERE                           [ARG]    │
│  the standard · what is/is not research here                 │
├───────────────────────────────────────────────────────────┤
│ ENTRY CARDS — [P9 metadata-forward entry card]                │
│ ┌───card 1───┐ ┌───card 2───┐ ┌───card 3───┐                  │
│ │ image: crop │ │ image: crop │ │ image: crop │                │
│ │ of actual   │ │ of actual   │ │ of actual   │                │
│ │ figure      │ │ figure      │ │ figure      │                │
│ │ [EVD:IMMED] │ │ [EVD:IMMED] │ │ [EVD:IMMED] │                │
│ │ date·systems│ │ date·systems│ │ date·systems│                │
│ │ ·sample·ver │ │ ·sample·ver │ │ ·sample·ver │                │
│ └─────────────┘ └─────────────┘ └─────────────┘                │
│  (as many rows as genuinely exist — no filler cards)           │
│  [pagination control if the set exceeds one page]              │
├───────────────────────────────────────────────────────────┤
│ HOW TO CITE                                        [ARG]    │
│  citation format, plain text, copyable — no gate               │
├───────────────────────────────────────────────────────────┤
│ WHAT THIS IS NOT YET                                [LIM]    │
├───────────────────────────────────────────────────────────┤
│ [ACT] PRIMARY — well below fold, if at all · NO sticky         │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer                                                    │
└───────────────────────────────────────────────────────────┘
```

**`/blog` variant note:** byline IMMEDIATE only (no research metadata schema); pagination is **required before the stream scales** — the Contentful query ceiling silently truncates the index, `generateStaticParams`, and the sitemap together (`03` §9).

**Prohibited on this wireframe (checked):** no gate/email wall/download form (`03` §7), no sticky CTA, no decorated stubs, no "coming soon", no more entries shown than genuinely exist, no stock/abstract card images.
