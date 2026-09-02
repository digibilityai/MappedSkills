# Performance-Aware UX — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `11_MOTION_AND_INTERACTION_PRINCIPLES.md` and `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` §4 (approved, `DEC-015`) · Core Web Vitals and very high page performance as named quality areas in `CLAUDE.md`.

> **No code is optimised in this session, no measurement was taken, and no performance budget is set.** Budgets belong to Gate 13. **Actual Core Web Vitals, bundle sizes, TTFB and compression settings for the current site are UNKNOWN** — no measurement has ever been run in this programme.

---

## 1. The position

> **The UX must not require what the site cannot afford.**

Performance is decided at UX time more than at optimisation time. A design that needs a hero video, a scroll-driven narrative, a client-rendered figure library and four carousels cannot be optimised into being fast — it can only be rebuilt. **This document constrains the UX so that the performance work later is tuning rather than reversal.**

---

## 2. What the UX must never require

Each entry is already prohibited by an approved rule; the performance harm is stated so the cost is legible.

| Never required | Performance harm |
|---|---|
| **A hero video, or any autoplay media** | Large payload on the first screen, competing for bandwidth with first paint. Prohibited independently (A21) |
| **An entrance animation on the H1 or first screen** | Delays the one message the page exists to deliver, and directly harms perceived performance and Core Web Vitals (A7) |
| **Ambient motion, particles, animated gradients, mesh movement** | Continuous main-thread and compositor cost for zero information (A4, A6) |
| **Scroll-jacking or scroll-scrubbed narrative** | Ties rendering to scroll position — the most expensive interaction pattern on the web, and hostile on trackpads and keyboards |
| **Parallax** | Cost with no information |
| **Counting-up numbers** | Repeated layout work, and prohibited independently (A8) |
| **Carousels for core information** | Content hidden from readers, crawlers and retrieval systems, plus a library (A19) |
| **Decorative 3D, WebGL, canvas backgrounds** | Disproportionate cost; nothing in the direction needs one |
| **A large image payload** | Photography is **highly selective by direction**, so image weight is low by design rather than by optimisation |
| **An icon font or decorative icon set** | The direction removes the need for one entirely |
| **A sitewide third-party embed** | The booking script loads on `/schedule-call` only. **The current codebase has a sitewide-CTA pattern worth not repeating** |
| **Client-side state for content the server can render** | Every page's content is static or ISR-rendered; nothing in the approved architecture requires client state to display content |
| **A chart library to draw a figure** | The figures are structural, not statistical plots. **A charting dependency for four figures is a dependency for four figures** |

---

## 3. What the UX genuinely requires

Stated positively, so the constraint is not read as "the UX may need nothing".

| Required | Why it is affordable |
|---|---|
| **Server-rendered content on every page** | Already the case — the site is server-rendered with content in the initial HTML, which is also what makes it retrievable |
| **Native disclosure behaviour** | No library. Works without JavaScript, which is the point |
| **Resolution-independent figures with real text** | Scale without payload; also the accessibility and citation requirement |
| **One form, with client validation as a convenience and server validation as the truth** | One surface, one bundle, one accessibility pass |
| **One booking embed, on one route** | Isolated cost |
| **Visible focus, hover feedback, form states** | Trivial cost, real value |
| **At most one non-blocking sequential reveal per page, on the page's one full-weight figure** | Optional, removable, and complete without it |

---

## 4. Progressive enhancement — what degrades to what

**The test: turn JavaScript off. What is lost?**

| Feature | Without script | Verdict |
|---|---|---|
| **All page content** | Fully present | **Required to be true** |
| **Navigation, including dropdown children** | Reachable — the parent is a real link to `/services`, which lists every child | **Required** |
| **Evidence disclosures** | Native disclosure still opens; content is in the DOM regardless | **Required** |
| **Figures** | Complete static state, all labels, all provenance | **Required** |
| **Text equivalents** | Present | **Required** |
| **Breadcrumbs, footer, entity data** | Present | **Required** |
| **`tel:` and WhatsApp** | Work | **Required** |
| **The four-cause figure** | Complete | **Required** |
| **The five checks** | Complete, all outcomes, all findings | **Required** |
| **The problem page's optional outcome recording** | Absent | **Acceptable — it is an enhancement and nothing depends on it** |
| **Form submission** | **Degraded.** A native form post to the endpoint is the correct fallback *(depends on an endpoint that does not exist)* | **Acceptable, and specified rather than assumed** |
| **Figure sequential reveal** | Absent; the complete figure shows | **Acceptable** |
| **Figure variant switching** | Absent; all variants present in the DOM | **Acceptable — this is why all six systems must be in the DOM** |
| **Booking embed** | Absent; the page's own content, the form route and direct contact remain | **Acceptable, and it is why the page must be useful before the embed loads** |
| **Mobile nav panel** | **Degraded.** Needs a non-script path — the footer carries completeness | **Flagged for the implementation phase** |

---

## 5. First-screen budget as a UX rule

**No numeric budget is set here.** The rule is structural:

> **The first screen of every page is a small number of text elements and one or two controls. Nothing on it is an image, a video, a figure, an embed, or anything that must load before it is readable.**

This is already required by the fast-open rule and by the anti-pattern set. **It happens also to be the single largest performance decision the site makes**, and it is made once, here, rather than negotiated per page.

**The homepage's one dated item is text.** The figures begin at Block 3, below the fold.

---

## 6. Inherited performance context

**Recorded as context, from the approved Session 01/01B audit. None of it is fixed by UX, and none of it was measured in this session.**

| Finding | Status |
|---|---|
| **`Cache-Control: public, max-age=31536000, immutable` served on production HTML** | HTML pages told not to revalidate for a year, which would neutralise ISR and make content changes invisible to returning visitors. **A delivery-configuration defect, and a direct constraint on any UX that assumes content updates are seen** |
| **Image optimisation disabled site-wide**, including CMS assets, with two raw `<img>` tags on article bodies | The largest images on the site are unoptimised |
| **The logo is a full-resolution asset rendered small in the header and footer of every page** | |
| **57 shadcn primitives present, many unused**, including a chart library and a carousel library | Repository and dependency weight; tree-shaken at build, so not a runtime cost |
| **Page components are 593–733 lines** with content, layout and JSON-LD interleaved | A maintainability cost that becomes a performance cost when nobody can see what a page ships |
| **Content for the homepage and five service pages is hard-coded in a 1,263-line constants file** | Editing a headline requires a commit and a full remote rebuild on a host documented as frequently unable to complete one |
| **Actual Core Web Vitals, bundle sizes, TTFB, CDN presence, compression and HTTP version** | **UNKNOWN.** No measurement has been run |

**The UX consequence of the last row is the important one:** because no baseline exists, **no performance improvement may be claimed** for this redesign, before or after. The same rule that governs conversion claims governs this one.

---

## 7. Where performance and honesty meet

| Requirement | Both reasons |
|---|---|
| **Figures are resolution-independent with real text** | Fast, and citable, printable, screen-reader readable |
| **No text as an image** | Fast, and accessible, and quotable by retrieval systems |
| **Content in the DOM, not fetched on disclosure** | Fast, and indexable, and retrievable |
| **Server-rendered content** | Fast, and it is why AI systems already receive full HTML from this domain |
| **Highly selective photography** | Fast, and it is the direction's honesty rule about stock imagery |

**Nothing in the performance constraint costs the site an honesty property. That is not a coincidence — both derive from the same decision to carry meaning in structure and text rather than in assets.**

---

## 8. What this document does not decide

Performance budgets · bundle limits · image formats and sizes · caching strategy · rendering strategy per route · font loading · the build pipeline · monitoring. **Those belong to Gate 13 and the technical phase, and they require measurement that does not yet exist.**
