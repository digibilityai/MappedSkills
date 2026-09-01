# Motion and Interaction Principles — APPROVED

**Session:** 12 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** APPROVED — 2026-09-01 (Gate 9A, `DEC-015`). Direction level. **No animation library, no duration value, no easing curve and no component is specified here.**

---

## 1. The motion philosophy, in one sentence

> **Motion resolves an uncertainty, or it does not ship.**

MappedSkills' entire proposition is that it can show what actually happened. Motion that shows a relationship becoming clear — a source connecting to an enquiry, an unknown resolving into a measured value, a break being exposed — is an extension of the proposition. Motion that exists to make the site feel modern is a claim about energy that the firm is not making, and it costs performance, accessibility and comprehension.

**Core Web Vitals and very high page performance are named quality areas in `CLAUDE.md`.** Every motion decision is also a performance decision.

---

## 2. The four-question test — every proposed motion must pass all four

| # | Question | Fails if |
|---|---|---|
| 1 | **What information does it communicate?** | The answer is "it feels premium", "it adds polish", "it draws the eye" |
| 2 | **What happens without it?** | Nothing is lost. If the static state carries the same information, the motion is decoration |
| 3 | **Does it respect reduced-motion preferences?** | It cannot be reduced to a complete, meaningful static state. **A motion whose information is only available in motion is disqualified**, not merely wrapped in a media query |
| 4 | **Is it worth the implementation cost?** | It requires bespoke engineering, adds a dependency, or must be maintained across breakpoints for a marginal gain |

**Question 3 is the strict one.** Reduced-motion is not a fallback to be built last. **The static state is the primary state**, and the motion is an enhancement of something already complete — which is also why the figures survive being screenshotted, printed and cited.

---

## 3. ESSENTIAL EXPLANATORY MOTION

Four classes. Each communicates something a static state communicates less well, and each has a complete static equivalent.

### 3.1 Sequential reveal of a figure
**Information:** order and dependency — that discovery precedes landing precedes interaction precedes the enquiry.
**Where:** the run, on the homepage, `/services` and `/how-it-works`. The four-cause tree. The five-check sequence.
**Without it:** the reader parses six or more elements simultaneously and must infer the order.
**Reduced motion:** the complete figure, all stages visible, all labels present. **This is the primary state**; a reader who never sees the animation loses nothing but pacing.
**Trigger:** on entering view, **once**, or on the reader's own request. Never scroll-scrubbed, never repeating, never blocking.

### 3.2 State change — unknown resolving into measured
**Information:** that a value was not known and now is, and *when* it became known.
**Where:** anywhere the evidence apparatus shows a status transition; the version history of a re-measured finding.
**Without it:** the connection between the value and its date is spatial rather than causal.
**Reduced motion:** both states shown together, or the resolved state with its date attached.
**Constraint:** the value itself **never counts up, never tweens, never scrambles**. It appears complete, with its apparatus. Counting is prohibited (`14_DESIGN_ANTI_PATTERNS.md`).

### 3.3 Exposing a break
**Information:** *where* in a continuous path something fails or stops being measured.
**Where:** `/conversion-optimization`; the problem page; the unmeasured stretches of the run.
**Without it:** the reader must locate the break by reading a label.
**Reduced motion:** the break drawn statically, marked and labelled.
**Constraint:** the break is revealed, not dramatised. No shake, no flash, no alarm colour.

### 3.4 Evidence disclosure — bringing a claim's evidence forward
**Information:** that this evidence belongs to *this* claim, and that the reader has not left their place.
**Where:** the evidence apparatus, sitewide. The characteristic interaction of the whole site.
**Without it:** disclosure appears abruptly and the reader loses their position in a long document.
**Reduced motion:** instant appearance, in place, with focus managed correctly.
**Constraint:** in place. Never a modal, never a page navigation, never a layout shift that moves the text the reader is reading.

---

## 4. OPTIONAL ENHANCEMENT

Permitted, small, removable, and **nothing depends on any of them.**

- **Focus and hover feedback** on interactive elements — genuinely useful.
- **Smooth in-page anchoring** in long documents.
- **Progressive disclosure** of a method note or a footnote.
- **Loading and pending states** on the enquiry form and the booking surface. *(Arguably essential rather than optional: the firm's own published finding is that a success screen is not proof of delivery, and honest pending/confirmation states are the design expression of that.)*
- **A quiet transition when switching the system being examined** in a per-system figure — the variant-switching interaction observed on Stripe Docs (2026-09-01).

---

## 5. DECORATIVE — AVOID

Each of these was either observed in this session's research or is a named risk in the strategy.

| Prohibited | Why |
|---|---|
| **Entrance animations on the H1 or first screen** | **Observed on Linear (2026-09-01):** the headline renders blurred and resolves in. It gates the primary message, costs comprehension and perceived performance, and the homepage's job is proposition legibility in seconds |
| **Motion applied to headline text** | **Observed on Profound (2026-09-01):** a motion-blurred rotating platform name. It animates the one thing that most needs to be readable |
| **Counting-up numbers** | Directly violates `VOICE_AND_TONE.md` §8 — a number must arrive with its sample, date, location and method. A counting number arrives without them, repeatedly |
| **Scroll-jacking and scroll-scrubbed narratives** | Hostile on trackpads, unusable with a keyboard, and it takes control of reading pace from a reader who is evaluating a purchase |
| **Parallax** | Communicates nothing; costs performance |
| **Ambient background motion, particles, animated gradients, mesh movement** | Decoration by definition |
| **Marquees and logo tickers** | There are no logos, and motion cannot substitute for the absent proof |
| **Typing / terminal effects** | Fake technical credibility, prohibited independently |
| **Hover-dependent reveals of load-bearing content** | Excludes touch and keyboard users entirely |
| **Page-transition animations** | Delay on every navigation, on a site whose users are evaluating and comparing |
| **Anything on `/contact`, `/schedule-call` or `/thank-you` beyond form state** | These visitors have decided. `PAGE_TYPE_CRO_RULES.md` §9: "the only job left is not to lose them" |
| **Anything on `/research` or `/how-it-works` beyond disclosure and figures** | These pages are the credibility surfaces. Sticky CTAs are already prohibited there; ambient motion undercuts them the same way |

---

## 6. Interaction character

**Precise, quiet, immediate.** The site should feel like consulting a document, not operating an application.

| Aspect | Character |
|---|---|
| **Hover** | Reveals *supplementary* detail only. Never load-bearing. Every hover affordance has a click, tap and keyboard equivalent |
| **Focus** | **Visible, distinctive, and part of the identity** — the annotation tie doubles as the focus indicator (`07_VISUAL_GRAMMAR.md` §6.1). Accessibility becomes a design feature rather than a compliance layer |
| **Scroll** | Ordinary scroll. Nothing pinned that traps the reader; nothing that fights the input device |
| **Transitions** | Short, few, near-instant. Navigation should feel like turning a page |
| **Disclosure** | The characteristic interaction: evidence expands **in place**, without navigation, without a modal, without losing position |
| **Forms** | Honest states — pending, error, submitted, and a real confirmation of arrival. Errors are specific and adjacent to the field |
| **Touch** | Everything reachable by tap. No gesture is required to reach content |
| **Keyboard** | Full parity, sensible order, no traps. Figures are keyboard-reachable and have text equivalents |

---

## 7. The three rules a designer must not break

1. **Nothing on the first screen animates.** The H1 and the commercial statement are readable at first paint.
2. **No number ever moves.**
3. **Every explanatory motion has a complete static state that carries the same information.** If it does not, the figure is wrong — not the motion setting.
