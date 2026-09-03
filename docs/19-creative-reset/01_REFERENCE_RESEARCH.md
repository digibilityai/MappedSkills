# Reference Research — Session 15B — RECORDED

**Session:** 15B · **Date of all observations:** 2026-09-02 · **Branch:** `test_branch`

> ### What this research is, and what it is not
> **VERIFIED FACT:** these sources were retrieved and read on 2026-09-02. The principles below are
> extracted from what those sources state.
>
> **STATED LIMIT, so it is not overclaimed:** this was **desk research on written sources and
> roundups**, not a hands-on audit of each referenced website in a browser. Where a principle is
> attributed to a specific company's site (Stripe, Linear, Vercel, Obys, The Pudding), it is
> attributed **as that source describes it** — not as something this session independently
> verified by using those products.
>
> **No proprietary visual asset was reproduced, and no reference was copied.** Every entry below is
> a *principle* with a note on where it changed a decision in this session.

---

## 1. The references, and the principle taken from each

### R1 — Awwwards, Sites of the Year and the design-agency directory
`https://www.awwwards.com/websites/sites_of_the_year/` · `https://www.awwwards.com/websites/design-agencies/`
Observed 2026-09-02.

**Principle extracted — DIRECTED MOTION.** What separates award-level work from decorated work is
*choreography, not animation*: transitions that carry meaning, scroll sequences that pace a story,
micro-interactions that reward attention.

**Where it changed thinking:** every motion in all three prototypes had to answer *"what does this
tell the reader?"* before it was allowed. Direction A's field motion carries loss and accumulation;
Direction B's switch carries a change of subject; Direction C's trace carries the passage of time
and the reader's own behaviour. **No prototype contains a purely decorative animation.**

### R2 — Obys Agency, as characterised in an agency-website roundup
`https://mycodelesswebsite.com/agency-websites/` · Observed 2026-09-02.

**Principle extracted — THE STILL FRAME MUST ALREADY WORK.** The source describes Obys as work
where *the static frames already look like posters*, with typographic motion on top.

**Where it changed thinking:** this became self-critique question H — *would the design still have
character with every effect removed?* Direction B was rebuilt around it: the switch is a
composition change, so both of its states are complete stills.

### R3 — "Four design principles behind Stripe, Linear and Vercel"
`https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel`
Observed 2026-09-02.

**Principles extracted, four, as stated by the source:** high contrast, *"nothing muddy in
between"* · generous whitespace, *"take the spacing that feels like enough, then double it"* ·
a monochrome base with **one** accent, because *"one color used sparingly hits harder than five
colors used everywhere"* · sharp, technical typography.

**Where it changed thinking:** each direction is built on **one accent on a near-monochrome base**
— A: signal green on near-black; B: tangerine on ink/ivory; C: a highlighter yellow on
black-and-paper. **This is also the direct answer to "vibrant does not mean many colours."**

### R4 — Metabole Studio, on scrollytelling for premium sites
`https://metabole.studio/en/blog/scrollytelling` · Observed 2026-09-02.

**Principles extracted, four:**
1. **The removal test.** Real scrollytelling has *"a narrative intent… a beginning, a tension, a
   reveal, a resolution"*; if removing the scroll mechanic does not collapse the narrative, the
   motion was decoration.
2. **User agency.** Never *"lock users into a tunnel"*; keep breathing space, exit points and
   visible CTAs.
3. **Performance is part of the feeling.** *"A site that stutters never feels premium, no matter
   how striking the aesthetics."*
4. **Ration it.** Pick *one* moment that genuinely deserves the treatment and execute it with
   rigour; keep the rest ordinary.

**Where it changed thinking:** principle 4 is why each direction has **one** scroll-linked set
piece rather than a scroll-driven page. Principle 2 is why **no prototype hijacks the scroll**, all
CTAs stay reachable, and A's sticky stage is bounded rather than endless. Principle 1 is the reason
A's gate interaction exists at all: closing a gate and watching the recorded count stop rising is a
tension and a reveal.

### R5 — The Pudding, on structuring stories as visual essays
`https://www.storybench.org/pudding-structures-stories-visual-essays/` · `https://pudding.cool/`
Observed 2026-09-02.

**Principles extracted:** visual essays *use fewer words than conventional journalism* and let
**the reader's scroll trigger changes to visual elements**, so the reader paces the explanation.

**Where it changed thinking:** this is the answer to *"how do we keep substantive content without
being text-heavy?"* — **do not delete the words; give them a visual state to change.** Direction
B's recognition section keeps every word of the approved Block 2 copy but turns three sentences
into three objects that resolve into one; Direction A turns the four-paragraph accountability
boundary into five things struck through and one thing owned.

### R6 — Kinetic and oversized variable typography, as reported of Linear
`https://toimi.pro/blog/best-saas-website-designs/` · Observed 2026-09-02.

**Principle extracted:** type is moving from a static element to **the primary design element**,
carried by kinetic and oversized variable typography.

**Where it changed thinking:** in all three directions the largest object on the first screen is
the approved H1, and in each it **behaves** — A: a masked word-rise; B: the highlighted word swaps
sides when the state switches; C: a highlighter stroke is drawn across "enquiries".

### R7 — `prefers-reduced-motion`, WCAG 2.3.3 and reduced-motion alternatives
`https://web.dev/learn/accessibility/motion` · `https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion` · `https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html`
Observed 2026-09-02.

**Principles extracted:** motion can cause real harm (vestibular disorders, photosensitivity) ·
the honest response is often **removal**, but **cross-fades, opacity changes and shortened
durations are safe alternatives** that keep a state change legible · define the static state first
and add motion only when the user has not opted out.

**Where it changed thinking:** every prototype declares a `prefers-reduced-motion` block, and
**none of them merely freezes**: A composes a static frame of the whole field at once, B applies
the state change instantly with no sweep, C draws the highlighter and the chain fully. **No content
and no navigation depends on motion in any direction.**

### R8 — "AI slop web design" — used as a NEGATIVE reference
`https://www.925studios.co/blog/ai-slop-web-design-guide` · Observed 2026-09-02.

**Principle extracted:** the current generic look is identifiable and should be avoided on purpose.

**Where it changed thinking:** it is the checklist behind the brief's prohibitions. **Verified
absent from all three prototypes:** gradient blobs, glowing orbs, glassmorphism, bento grids,
generic SaaS cards, fake dashboards, fake analytics, funnels with a taper, AI brains, robots,
circuitry, 3D objects, stock photography, abstract "innovation" illustration, parallax, cursor
gimmicks and scroll hijacking. **Counted at zero in each file.**

---

## 2. What the research did *not* provide

- **No evidence about conversion.** None of these sources measured whether any of this sells
  anything, and no such claim is made anywhere in this session.
- **No India-specific or B2B-services-specific evidence.** Every reference is from a general
  design-quality context.
- **No performance measurements of the referenced sites.** The performance principle (R4.3) is
  adopted as a design constraint, not as a benchmark.
- **No competitor analysis.** That work is already in `docs/11-creative/03_COMPETITOR_VISUAL_PATTERNS.md`
  and was not re-run here.
