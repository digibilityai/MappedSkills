# Wireframe — STATE 04 — Navigation (S4) — closed / dropdown open / mobile panel open · breadcrumb model · non-sticky default — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`. Referenced by name in `30`§3 [NAV].
**Source of structure:** `07_NAVIGATION_ARCHITECTURE.md` §1–§2, §4 *(sticky decision)*, §5, **§6 *(breadcrumbs)*** · `21_ORCHESTRATOR_DECISIONS_H1_H5.md` §H2, §H3, §H4.

---

## 1. Margin notes

- **Page type:** Sitewide region (R1 — header/navigation).
- **First screen / apparatus:** N/A — [EVD: ABSENT] in navigation always.
- **F1 class:** N/A.
- **CTA roles/locations:** [ACT] header CTA present in every state, unchanged position, routes to `/contact` (H2). **It is not sticky** — see §4.
- **Omitted slots:** none — all six items present in every state (mobile removes nothing, `07`§5).
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** R1 *(this artefact is R1's complete state set)* · P12 *(§3)*.
- **Width class shown:** WIDE (states 1–2) and NARROW (state 3, mobile panel).
- **What this artefact uniquely proves:** the parent-is-a-link fix (`07`§2 — the verified keyboard defect); the mobile panel's focus-containment behaviour, which is the one permitted focus containment on the site and must be escapable; **the approved breadcrumb model (§3)**; and **that the header does not stick (§4)**.

---

## 2. Three states

```
STATE 1 — CLOSED (default, WIDE)
┌───────────────────────────────────────────────────────────┐
│ [NAV] logo · What we do (LINK, not button) [▾ disclosure,    │
│  separate control, aria-expanded=false] · How it works ·      │
│  Evidence · Pricing · Insights · About  ·  [ACT] header CTA    │
│  · utility: contact / phone / WhatsApp                          │
└───────────────────────────────────────────────────────────┘

STATE 2 — DROPDOWN OPEN (WIDE)
┌───────────────────────────────────────────────────────────┐
│ [NAV] ... What we do [▴ disclosure, aria-expanded=true] ...   │
│  ┌─────────────────────────────┐                                │
│  │ Overview (= /services, first  │  ← "first child" rule,        │
│  │  child, explicit repeat)      │    `07`§2                      │
│  │ [capability item]              │                                │
│  │ [capability item]              │                                │
│  │ [capability item]              │                                │
│  │ [capability item]              │                                │
│  │ [conditional 6th item — config │  ← manufacturing gate,         │
│  │  flag, removable in one change]│    `07`§3                       │
│  └─────────────────────────────┘                                  │
│  Escape closes, returns focus to disclosure. Arrow keys move       │
│  within list. Tab leaves without trapping.                          │
└───────────────────────────────────────────────────────────┘

STATE 3 — MOBILE PANEL OPEN (NARROW)
┌───────────────────────┐
│ [NAV] logo  [X close]   │
├───────────────────────┤
│ What we do [▾]           │  ← same two-control rule as desktop
│ How it works              │
│ Evidence                   │
│ Pricing                     │
│ Insights                     │
│ About                          │
├───────────────────────┤
│ utility: contact / phone /      │
│  WhatsApp                        │
├───────────────────────┤
│ [ACT] CTA — last in panel order,  │
│  first in visual priority in the   │
│  header bar itself                  │
└───────────────────────┘
 (page beneath does not scroll while open; focus contained but
  escapable via Escape or explicit close; focus returns to
  trigger on close)
```

## 3. The breadcrumb model — approved, and confirmed here

**Carried unchanged from `07` §6. Required, and currently absent from the production site**, which emits `BreadcrumbList` on 11 routes with no visible breadcrumb anywhere. **Structured data must describe the page, not assert navigation the page lacks.**

| Route family | Breadcrumb | Trail |
|---|---|---|
| `/` | **None** | — |
| `/services` | **None** | Top level |
| Capability pages (`/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`) | **Yes** | Home → What we do → *page* |
| `/problems/{slug}` | **Yes** | Home → **Problems** *(text, not a link)* → *page* |
| `/industries/{slug}` *(conditional)* | **Yes** | Home → **Industries** *(text, not a link)* → *page* |
| `/research`, `/blog`, `/pricing`, `/about`, `/how-it-works` | **None** | Top level |
| `/research/{slug}`, `/blog/{slug}` | **Yes** | Home → Evidence / Insights → *entry* |
| `/contact`, `/schedule-call`, `/thank-you`, legal, 404 | **None** | Utility |

**Three binding rules, restated as wireframe checks:**

1. **One source.** The visible breadcrumb and the emitted `BreadcrumbList` are generated from the same source. Two sources drift, and the mismatch is the defect this fix exists to remove.
2. **A breadcrumb may express a hierarchy the URL does not have.** `/seo` is flat by deliberate IA decision; `Home → What we do → Search` is the correct trail and is what the schema already describes. **This is why the trail appears on the commercial master (`32`) even though the URL is one segment.**
3. **A segment that is not a real page is not a link.** `Problems` and `Industries` have no hub at launch — `/industries` 404s by design — and render as **text**.

**Prohibited:** a breadcrumb on the homepage · a breadcrumb used as a substitute for the header · a breadcrumb whose last item links to itself · a breadcrumb carrying a keyword phrase rather than the page's name.

**Where each wireframe stands:** `32` (capability trail) · `33` (`Problems` as text) · `35` (`Evidence` trail) · `39` (capability trail) · `36`, `40`, `42` (top level — **no breadcrumb**, correctly) · `34`, `41`, `44` (utility — **no breadcrumb**) · `31` (homepage — **no breadcrumb**).

---

## 4. Sticky behaviour — the header does NOT stick

**APPROVED DEFAULT (H3, `21` §H3; `07` §4 option B): the header is NON-STICKY on every page.** "Persistent", as `CTA_SYSTEM.md` §3 requires, is satisfied by **presence on every page** — not by fixing it to the viewport.

**Consequence, stated plainly:** on a long page the header scrolls away and a reader who wants to navigate scrolls back up. That is ordinary behaviour, and the architecture already provides the alternative — a conversion route at the end of every page, and, where the CRO rules permit one, a quiet sticky element **below the fold**.

**Why the default is non-sticky rather than a preference:** a fixed header carrying the primary CTA is a **persistent sales control**, which H2 prohibits, and it would place that control over `/how-it-works`, `/research`, `/research/*`, `/blog` and `/blog/*`, where **B16 is a hard ban** — including over the page that publishes the firm's own measured zero.

### 4.1 The one permitted experiment, and its hard limits

H3 permits a compact sticky navigation to be **tested** on genuinely long commercial pages. **It is not drawn as a launch default in any wireframe in this set.** If it is ever tested, all six constraints bind, and **failing any one ends the experiment**:

| # | Constraint |
|---|---|
| 1 | **Long commercial pages only.** Never on `/how-it-works`, `/research`, `/research/*`, `/blog`, `/blog/*` — B16 is a hard ban and this experiment does not reach it |
| 2 | **Orientation only** — where the reader is, and how to leave |
| 3 | **NO SALES CTA OF ANY KIND.** A compact bar carrying the primary CTA *is* the persistent sales control H2 prohibits. **The experiment tests navigation without the CTA, or it does not run** |
| 4 | **Compact and quiet.** Never expanding, pulsing, animating or changing on scroll |
| 5 | **Never two sticky elements at once**, and never obscuring content, a form field, the submit control, or anything while a mobile keyboard is open (U6, `48` §M4) |
| 6 | **Evaluable against a stated question** — *does a reader on a long commercial page lose orientation without it?* If the wireframe pass cannot answer that from structure alone, the experiment does not run |

**Default if the experiment is inconclusive: non-sticky. An inconclusive experiment does not promote itself.**

---

## 5. Parent link and disclosure control remain separate — confirmed

**This is the verified production keyboard defect and its structural fix** (`07` §2, criterion C2).

| | Control | Behaviour |
|---|---|---|
| **"What we do"** | **A LINK** to `/services` | Activating it navigates. It is reachable and operable by keyboard as a link |
| **▾ / ▴** | **A SEPARATE disclosure control** | Carries `aria-expanded`. Activating it opens or closes the list and never navigates |

**Neither substitutes for the other.** The parent is not a button; the disclosure is not a link. `Escape` closes the list and returns focus to the disclosure control; arrow keys move within the list; `Tab` leaves without trapping. **`Overview` repeats `/services` as the first child**, so the destination is reachable from inside the open list as well (`07` §2). **The same two-control rule holds in the mobile panel (STATE 3) — mobile does not collapse them into one.**

---

**Prohibited on this wireframe (checked):** the "What we do" parent rendered as a button-only control (the verified defect this fix removes), **the parent and the disclosure collapsed into one control at any width**, a mega-menu, a second nesting level, promotional content/imagery/CTA inside the dropdown, a bottom tab bar, gesture-only access, a full-screen takeover with no visible close, any item removed on mobile for width, **a sticky header as a launch default**, **any sticky element carrying a sales CTA**, **two sticky elements at once**, a breadcrumb on the homepage, a breadcrumb segment linking to a page that does not exist, and a breadcrumb standing in for the header.
