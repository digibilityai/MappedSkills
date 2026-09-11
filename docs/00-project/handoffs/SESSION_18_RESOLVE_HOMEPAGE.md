# SESSION 18 — COMPLETE HOMEPAGE EXPERIENCE — THE RESOLVE

**Date:** 2026-09-03 · **Branch:** `test_branch` · **HEAD at start:** `6f1179f`
**Model:** Claude Opus 5 · **Status:** **PROPOSED. Gate 10 remains NOT PASSED — IN PROGRESS.**
**Nothing was staged, committed or pushed. No production directory was touched.**

---

## 1. What this session was asked to do, and did

Build the **complete homepage** in THE RESOLVE, and validate F1 **inside it** rather than as a
fourth isolated prototype.

**Delivered:** `docs/26-resolve-homepage/prototype/index.html` — a browser-renderable complete
homepage: navigation → hero → commercial story → F1 → capture/convert/measure → evidence →
conversion close → footer. Ten regions, 10,449px at 1440×900, one inline script, no libraries.

Plus six specification documents in `docs/26-resolve-homepage/`.

## 2. The owner verdict, and how it was interpreted

> *"No, I think it is still bland, no animation, no exciting, no journey happening."*

**Binding. It supersedes the Session 17B/17C recommendation that F1 was ready.**

The load-bearing word is **journey**. Session 17C was answering *how do we animate a diagram?* The
owner was describing a **missing page**. A figure on a bounded slice of ivory, with nothing above
and nothing after, cannot be part of a journey because there is no journey to be part of.

**F1 status recorded, as the brief requires:**
- **F1 STRUCTURAL CONCEPT: PROMISING.**
- **F1 ISOLATED EXPERIENCE: REJECTED AS TOO BLAND / STATIC.**
- **F1 compatibility remains UNRESOLVED until the owner reviews it inside this homepage.**
- **Session 17B/17C is NOT approved.** Its structural lessons were reused; its isolated
  implementation was not mechanically copied.

## 3. The experience concept, in one line

> **ONE POPULATION, FOLLOWED DOWN, AT CHANGING ALTITUDE.**

The same atom — a small square — is a lattice mark, then a named object, then a route's progress,
then a re-sorted kind, then a point on a chain, then an arrival. The page changes **distance** from
it: FAR → LEAVING → NEARER → CLOSER → INSIDE → ACROSS → OUT.

**F1's treatment in context:** the reader does not meet a new diagram. The figure begins at 0.44
scale and 0.42 opacity and **scales to full as the page descends into it**, out of a chapter that
has already taught its entire vocabulary. It is approached, not introduced. **Block 4 is a STATE on
that same instance** — the pre-boundary chain recedes to 34% and the boundary becomes the subject —
which is exactly what `22_F1_USAGE_TAXONOMY.md` assigns to `/`.

**CAPTURE → CONVERT → MEASURE:** not three cards, columns, or a funnel. **Six rows, read three
times.** They travel to new positions and change state as the question above them changes. No bars,
no widths, no proportions, and exactly six rows in every reading, so nothing narrows.

## 4. Defects found by rendering, and fixed — eight

1. **No `color-scheme` declaration** — a browser in forced dark mode **inverted the entire
   light-first direction**. Would have shipped invisible.
2. The friction alignment was **measured before the marks resized** (4px off the rule).
3. The alignment depended on a cascade override and on `requestAnimationFrame`, which does not run
   in a non-rendering tab — a mark could be **left displaced**. Inverted so the **composed state is
   the CSS default**.
4. The re-read question **overlapped the content beneath it** at three lines.
5. **Content behind on-view reveals was invisible if the observer never fired.** Added a 4s floor.
6. **23 touch targets under 40px** at 390px → now 0.
7. **Four contrast failures**, including the 122px chapter numeral at **1.30:1** → 129 text nodes
   now pass.
8. **A heading level jump**, and the approved block headings were not the actual headings → the
   approved headings are now the real `<h2>`s.

## 5. The one governance item that needs an orchestrator decision

> ### The T3 transition count is 6 against a proposed budget of 3.

`02_RESOLVE_MOTION_BUDGET.md` is **PROPOSED**, and its own §9 says the reconciliation happens when
the complete homepage is composed. **This is that reconciliation, and it reports an overage rather
than hiding one.**

T1 = 1/1 ✅ · T2 = 2/3 ✅ · **T3 = 6/3 ❌** · ambient = 0 ✅ · pinned = 0 ✅ · inversions = 2/2 ✅ ·
signature interaction = 1/1 ✅

**A cap of 3 transitions across ten regions and the owner's "no journey" verdict cannot both be
satisfied.** `02_MOTION_SYSTEM.md` §3 proposes raising the homepage T3 cap to **6** with a
qualifier, and gives the exact cut order if the cap stands. **I have not made this decision.**

## 6. F2 and F3 tested against this homepage — assessment, not implementation

Neither figure appears on `/`, and neither should. Tested for **compatibility with this page's
established visual world**, as the brief requires.

| | **F2 — the four causes** (`/problems/traffic-but-no-enquiries`, `/conversion-optimization`) | **F3 — the four AI layers** (`/ai-seo`, `/research/{ai-visibility-baseline}`) |
|---|---|---|
| **On `/`?** | **No** — class D. Its subject is not the homepage's question | **No** — class D |
| **Vocabulary fit** | **Strong.** Its four causes — Demand · Page · Path · Measurement — are **already drawn on this homepage**, as chapter 3's three failure routes plus the measurement gap. F2 is the branching form of what chapter 3 shows as outcomes | **Partial.** Its subject is *a shape* — retrieval working while three layers sit at zero — which needs a **grid of states**, a geometry this homepage never uses |
| **Conflict risk** | **Low.** Same marks, same four states, same ivory ground, no new device needed | **Medium.** The six-systems × four-layers grid is the first tabular geometry in the system. It must not read as a dashboard |
| **The real constraint** | F2 must **not** reuse the friction alignment gesture for a different meaning (M3). On `/problems/*` it is a branch, not a convergence | F3 carries **two systems in a not-testable state that must not read as a value**. The 45° hatch already means exactly that in this page's evidence block — **reuse it, do not invent a second device** |
| **Verdict** | **Compatible.** Buildable in this vocabulary with no new primitives | **Compatible with one caveat** — it needs a grid geometry, and that geometry must be introduced deliberately as its own thing, not smuggled in as a variant of the run |

**Neither was built.** Building them is outside this session's scope and neither route is in
Gate 10's homepage question.

## 7. What is deliberately absent from the page

Owner-blocked or technically prerequisite, and per **B15 the reserved positions render nothing** —
no placeholder, silhouette or substitute:

- the published phone number and the WhatsApp action (Block 8, DIRECT CTA)
- the people element (Block 6) — *of everything blocking this page, the input that most affects
  whether it reads as a firm*
- the enquiry-response owner and business hours (Block 8) — the page states what happens next, not when
- the own-site diagnostic entry (Block 6) — blocked on shipping the fixes
- **the Gate 9A above-the-fold apparatus exception is PRESERVED AND UNSPENT.** Four first-screen
  elements and no fifth.

A prototype-only note in the footer lists these, so the owner can see what is missing rather than
inferring it.

## 8. Quantity safety

**No client result, logo, testimonial, photograph, rating, award, case study, dashboard, chart,
percentage, funnel width or invented quantity appears anywhere.** No axis, no scale, no rate.

The only numbers on the page are **the Session 04 first-party measurement** — 28 unbranded runs,
four assistants, five surfaces, one dated day, Pune, English, signed out, with the two untestable
systems named and not characterised, and *"no confidence interval is claimed and none is
available"* — plus list indices and chapter numbers.

**Residual risk, stated:** the protection in the re-read and the friction runs is a **stated
convention** ("kinds, not counts"; "how far a route gets, not how much demand there is"), not a
geometric impossibility. See `05_SELF_CRITIQUE.md` §3.2.

## 9. Files created and modified

**Created (untracked):**
```
docs/26-resolve-homepage/00_EXPERIENCE_CONCEPT.md
docs/26-resolve-homepage/01_PAGE_JOURNEY.md
docs/26-resolve-homepage/02_MOTION_SYSTEM.md
docs/26-resolve-homepage/03_RESPONSIVE.md
docs/26-resolve-homepage/04_ACCESSIBILITY_PERFORMANCE.md
docs/26-resolve-homepage/05_SELF_CRITIQUE.md
docs/26-resolve-homepage/prototype/index.html
docs/00-project/handoffs/SESSION_18_RESOLVE_HOMEPAGE.md
```

**Modified:** none. **The Session 17B/17C uncommitted work was read as research and left exactly as
found.** `docs/20-creative-convergence/prototype/convergence.html` was read and **not modified**.
`README.md` untouched and untracked.

## 10. What the owner should judge in the browser

1. **Does the page have a journey?** That is the whole question.
2. **Does F1 read as a journey or still as a diagram** once you arrive at it by descent?
3. **Does capture → convert → measure feel different from being told about three states?**
4. **Is chapter 7 (capabilities, 1,750px) the new bland spot?** I think it is the likeliest one.
5. **Do the friction runs read as distances, or as amounts?** If amounts, they must be redrawn.

## 11. Recommended next session

1. **Orchestrator:** settle the T3 budget number (§5). Everything else is downstream of it.
2. **Owner:** browser review of the complete page at WIDE, then 390.
3. **Then, and only then:** F2/F3 construction, and the Gate 10 assessment.

**Do not pass Gate 10 on the strength of this document.**

---

# OWNER REVIEW, AND SESSION 18A — REFINEMENT

**Date:** 2026-09-03 · **Branch:** `test_branch` · **HEAD unchanged:** `6f1179f`
**Nothing staged, committed or pushed. No production directory touched.**

## 12. The owner review of the Session 18 homepage

> *"This is finally going in the right direction."*

**Recorded as POSITIVE DIRECTIONAL VALIDATION.** It is **not** homepage approval, **not** Gate 10,
**not** permission to implement production, and **not** permission to freeze current choices.

**What it validates:** the move from isolated diagrams to a continuous THE RESOLVE homepage
experience — the page-level journey, changing visual altitude, continuity between chapters, F1
encountered rather than introduced, CCM as experience rather than cards, motion with deliberate
stillness, and the full-bleed conversion culmination. **Session 18A refined this; it did not
replace it.**

## 13. What Session 18A found before editing

The page was re-profiled per chapter at all three widths. **Visual atoms** counts the non-text
marks, rules and figure elements a chapter actually draws.

> ### Chapters 6–9 were **43.6% of the page** and drew **2 visual atoms between them**.
> Chapters 1–5 were 41.4% and drew **527**. On mobile that was **6.2 screens of near-continuous
> text**.

That measurement turned Session 18's stated suspicion into the session's work list.

## 14. What Session 18A changed

| # | Change | Effect |
|---|---|---|
| **1** | **Capabilities → the intervention map.** The approved heading is *"Where each discipline comes in"* — a **spatial** statement, now answered spatially. The chain returns, recessive, once per group, marking the stretch that group acts on: **10% of the chain, then 60%, then all of it.** Reading down, the marked stretch **marches forward** | The chapter's progression is **positional, not animated** — so it gains visual material while staying the quiet beat. States what a card grid cannot: these are **interventions in one system**, not seven services. **Zero added height** |
| **2** | **The admission becomes the second half's typographic event** — *"We have no case studies to show you."* at **86px**, alone, with air, and **no motion, because the scale is the event** | The most commercially distinctive sentence on the page now reads that way |
| **3** | **The boundary and fit chapters inherit the page's state vocabulary** — open dashed marks for what is not promised, a solid tangerine mark for what is | Six chapters now share one vocabulary instead of four |
| **4** | **The close is arrived at.** The five marks now travel **down from above and land**, wider stagger, and the fit chapter hands over sooner | The page follows a population downward for nine chapters; the last movement on it is downward, and it stops |
| **5** | **The friction alignment now exists on mobile** — recomposed, not disabled | See §16 |
| **6** | **One transition cut** — the departure band's tangerine wipe | See §15 |

### Result

| | Session 18 | **Session 18A** |
|---|:--:|:--:|
| Second-half visual atoms (WIDE) | **2** | **41** |
| Second-half visual atoms (NARROW) | **2** | **41** |
| Capabilities chapter | 0 atoms, 1,750px | **27 atoms, 1,740px** |
| Points of anticipation | 2 | **4** |

## 15. The transition audit — and the budget recommendation

All six were audited rather than mechanically cut to three. Full table in
`docs/26-resolve-homepage/06_REFINEMENT_18A.md` §3.

**ESSENTIAL (3):** the hero departure · the F1 descent · the boundary state on the F1 instance.
**USEFUL (2):** the fall through the five promises · the close arrival *(strengthened)*.
**DECORATIVE (1) — CUT:** the departure band's tangerine wipe. No commercial meaning, partly
duplicated the carrier's arrival, and put a second tangerine gesture seconds after the hero's.

**T1 = 1 · T2 = 2 · T3 = 5 · ambient = 0 · pinned = 0 · inversions = 2 · signature interaction = 1.**

> ### Recommended: **T3 homepage maximum 5**, with the qualifier that a T3 must **join two
> chapters, change the reader's distance from an object, or change what an object means** — a T3
> that only makes a section appear is composition and is not counted.

**Three is too few** (hard cuts at seven of nine boundaries — the flatness the owner rejected).
**Six was one too many**, and the audit found which one.

**Governance was NOT amended in this session, as instructed.** This is a recommendation for the
orchestrator, now backed by a per-transition audit against the rendered page.

## 16. Mobile — the one place a Session 18 event was disabled rather than designed

Session 18 switched the friction alignment off below 900px. **Recomposed in 18A:**

- The three outcomes **still travel to one column at 390px** — measured `margin-left` of
  **277 / 217 / 157px**, all landing at **right: 370px**.
- A tall rule would cross the copy at this width, so **the rule becomes a tick at the right of each
  run**; stacked, the three read as one broken vertical.
- The label becomes a right-aligned caption **following** the block, and was moved to the end of the
  DOM so its reading order matches.

**Same commercial event, in a form 390px can hold.**

## 17. Regression run — no regressions

| | WIDE (1425) | NARROW (390) |
|---|---|---|
| Text nodes checked | 129 | 121 |
| **Contrast failures** | **0** | **0** |
| Heading jumps / `<h1>` / `<h4>` | 0 / 1 / 0 | 0 / 1 / 0 |
| Touch targets < 40px | — | **0** |
| Horizontal overflow | none | none |
| `fixed` / `sticky` / `infinite` | 0 / 0 / 0 | 0 / 0 / 0 |

**Reduced motion and no-JS re-verified by rendering both**, including all new material: the three
intervention maps render their marked stretches (28 / 172 / 287px) with **no script at all**, and
the signature control still works under reduced motion.

**Three defects found and fixed in 18A** (numbered 9–11 in `05_SELF_CRITIQUE.md`): the disabled
mobile alignment; an **orphaned `aligned` class** left behind by Session 18's JS rewrite, which
would have prevented the new narrow ticks from ever appearing; and the friction caption sitting
**before** the routes in the DOM.

## 18. F2 and F3 — the Session 18A definitions

The brief redefined these for this pass. **Assessed against the refined page; nothing was built.**

**F2 — FIRST FIXATION.** *Does the visitor first perceive the intended commercial proposition and
brand confidence?* **Pass.** The first screen presents, in order of visual weight: the H1 at up to
102px, the dark stage with the population, then the two actions. **No date, sample, status mark or
method note appears on the first screen** — the Gate 9A apparatus exception remains unspent, so
there is nothing on it that could be mistaken for machinery. The first fixation is the proposition.

**F3 — VISUAL PROPORTION / WEIGHT.** *Does visual material carry enough of the experience relative
to text?* **Pass in the first half, marginal in the second.** Chapters 1–5 draw 527 visual atoms;
chapters 6–10 now draw 41, up from 2. **The direction of travel is right and the balance is not yet
even** — the second half remains 52% of the page and still holds the four most text-dense chapters.
**This is the single clearest remaining target.**

*(The earlier F2/F3 assessment in §6 above used the figure taxonomy's F2 and F3 — the four causes
and the four AI layers. Both readings are recorded; they answer different questions.)*

## 19. Files modified in Session 18A

**Modified:** `docs/26-resolve-homepage/prototype/index.html` ·
`docs/26-resolve-homepage/02_MOTION_SYSTEM.md` · `03_RESPONSIVE.md` ·
`04_ACCESSIBILITY_PERFORMANCE.md` · `05_SELF_CRITIQUE.md` · this handoff.
**Created:** `docs/26-resolve-homepage/06_REFINEMENT_18A.md`.

**Not touched:** `DECISION_LOG.md`, `QUALITY_GATES.md`, `docs/24-resolve-governance/`, the Session
15C and 15D prototypes, production, `README.md`. **The unrelated 17B/17C modifications were not
entangled.**

## 20. What the owner should judge next

1. **Does the second half now hold?** That was the session's primary target.
2. **Does the capabilities chapter read as *interventions in one system*** rather than a list?
3. **Do the intervention maps read as positions, or as amounts?** They are positions. If they read
   as amounts, they must be redrawn.
4. **Is the chain now appearing too often** — F1, its boundary state, then three maps?
5. **Does the page arrive at the tangerine close**, now that the marks land rather than rise?

**Gate 10 remains NOT PASSED — IN PROGRESS. Do not pass it on the strength of this document.**

---

# SESSION 18B — COMPRESSION AND ANTI-MONOTONY

**Date:** 2026-09-03 · **Branch:** `test_branch` · **HEAD unchanged:** `6f1179f`
**Nothing staged, committed or pushed. No production directory touched.**

## 21. The owner review of Session 18A

> *"The page seems too text heavy and long. After a point I am losing interest in reading the page.
> There is so much of monotony."*

**This became the primary design problem, and it was not answered with more motion.** The owner
**lost interest while scrolling**; the text/visual ratios reported in 18A do not rebut that and were
not offered as a defence. The session solved the **information architecture of the experience**
first — what the homepage should carry at all — and only then looked at motion.

## 22. Result

Both pages measured by the same method — every disclosure open, transitions neutralised — so the
comparison is honest rather than flattering.

| | 18A | **18B** | Change |
|---|---:|---:|---:|
| **Document height, WIDE** | 11,056px | **7,714px** | **−30.2%** |
| **Visible words** | 1,435 | **681** | **−52.5%** |
| **Paragraphs** | 29 | **21** | −27.6% |
| **List items** | 22 | **10** | −54.5% |
| **Sections** | 10 | **8** | −20% |
| **Mobile screens at 390×844** | 14.4 | **9.3** | **−35.4%** |

**The 30–40% perceived-reduction target is met on height and mobile, and exceeded on words.**

## 23. How it was done — editorial, not typographic

Every visible block was classified **A must-know / B compress / C deeper page / D repetitive**
before any CSS was touched. Full audit in `docs/26-resolve-homepage/07_COMPRESSION_18B.md` §2.

**The central move: three chapters became one.** The re-read, F1 and the entire capabilities
chapter were **3,518px and 454 words explaining one system three times**. They are now **one system
view** — 1,313px, 155 words — with three stages the reader can drive:

> `01 CAPTURE` → `02 CONVERT` → `03 MEASURE`

The chain is drawn **once, complete and static**, satisfying F1's entry state at first paint.
Choosing a stage changes which **discrete marks** are the subject, shows **one short line**, and
surfaces the capabilities that intervene there as compact links to their own pages. It plays
through once on entering view, then rests; the stages are a keyboard-operable tablist.

**Moved to deeper pages** (§3 of the brief — approved copy is source material, not a homepage
obligation): the five-symptom list → `/problems/*` · the joins and engagement paragraphs →
`/how-it-works` · **the boundary's three-paragraph detail** → `/how-it-works` *(the single largest
cut)* · **the six-row provenance table and the marks legend** → `/research/ai-visibility-baseline` ·
the seven capability descriptions → their own pages.

## 24. Quantity-safety correction — required by §25

**The 18A intervention maps drew a continuous tangerine bar along ~10%, ~60% and ~100% of the
chain.** Those are lengths, and a length invites reading as an amount. **They are gone.**

> The replacement marks **discrete points and joins only. Verified on the rendered page: there is
> no continuous active bar anywhere** — every stage mark is an 18×18 point or a zero-width join
> tick. A point cannot express a percentage.

## 25. Anti-monotony

No two chapters share a silhouette: a dark stage that inverts · a full-width drawing · a control
column above one wide chain · two columns of type with a list falling · one 86px sentence alone,
then a dark territory · two short positions · full-bleed colour.

## 26. Validation

**WIDE / MEDIUM / NARROW / reduced motion / no-JS all re-rendered and re-measured.** Zero contrast
failures (91 and 83 text nodes), zero heading jumps, zero touch targets under 40px at narrow, zero
horizontal overflow, zero fixed/sticky, zero looping animation. Reduced motion and no-JS both
compose **all three stages open with all seven capability links reachable**.

**The thirty-second test was run rather than asserted.** Reading only display type and action
labels, in document order, a visitor receives: *Judge us on the enquiries, not the traffic* → *It
behaves like one* → *The joins decide the result* → **Capture / Convert / Measure** with all seven
capability names → *What we are accountable for, and where that stops* → **We have no case studies
to show you** → *Who this is built for* → *Two ways to start*. **That answers all six homepage
questions without reading a paragraph.**

## 27. Five defects found and fixed

| # | Defect | Fix |
|---|---|---|
| **12** | **All three chain drawings rendered at once** — `.chain svg{display:block}` out-ranked the breakpoint rules. **The exact Session 17B defect #1, reintroduced when the figure was rebuilt.** The chapter measured 2,415px | Removed `display` from the element-level rule. Chapter now 1,313px |
| **13** | The `/services` link was a stray grid child, squeezing the chain to 225px | Wrapped the stages and link in one column |
| **14** | **The chain's labels rendered at ~10px** in a column | The chapter is stacked at every width; the chain is full width and its labels render at ~17px |
| **15** | Under reduced motion the reader was never shown stages 01 and 02 | All three compose open, matching no-JS |
| **16** | The unselected stage numerals failed contrast at 3.13:1 | Moved to `--dim` |

## 28. Declared for the orchestrator

1. **Two reader-driven controls now exist** — the Traffic/Enquiries signature and the stage
   tablist. The budget permits one *signature interaction*. The tablist is classified as
   **progressive disclosure**, which §19 asked for, not as a second signature. **Declared, not
   buried; the orchestrator may rule otherwise.**
2. **Block 4's approved detail paragraphs are no longer on the homepage.** A deliberate editorial
   decision under §3 of the brief. **It should be confirmed, not assumed.**
3. **T3 is now 4 and was deliberately not settled**, per §24. The 18A recommendation of 5 stands
   unconfirmed, and the evidence has changed under it.

## 29. What the owner should judge next

1. **Does the page still feel long?** If so, `07_COMPRESSION_18B.md` §9-L names the next 1,100px to
   cut, in order.
2. **Is the interest still lost, and where?** My own estimate is the evidence chapter, ~60% down.
3. **Does the system view carry Capture → Convert → Measure, F1 and the capabilities at once**, or
   does it now carry too much?
4. **Do the stage marks read as locations rather than amounts?** They are points and joins by
   construction.

**Gate 10 remains NOT PASSED — IN PROGRESS.**

---

# SESSION 18C — MOBILE DE-CLUTTER AND FINAL POLISH

**Date:** 2026-09-03 · **Branch:** `test_branch` · **HEAD unchanged:** `6f1179f`
**Nothing staged, committed or pushed. No production directory touched.**

## 30. The owner review of Session 18B

> *"The monotony has reduced and the page is also now shorter than earlier. Visually the page has
> become better than earlier. The mobile view looks a little cluttered."*

**Desktop: positive. Mobile: not yet ready.** Treated as a **mobile-first refinement pass with
surgical desktop changes only** — and in the event, **zero desktop changes were needed**. No
approved copy was restored, no chapter recreated, no length added, THE RESOLVE not redesigned.

## 31. The clutter audit — measured before any CSS was touched

The page was profiled **screenful by screenful** at 390×844, counting what a person actually sees
(content clipped inside collapsed disclosures excluded).

**Worst five, with the cause of each:**

| Rank | Screen | Cause |
|---:|---|---|
| **1** | **The system stages (score 50)** | **Fifteen bordered objects in one viewport** — seven capability links were outlined pills, against the list's rules — and **all three stage titles rendered at the same 27px**, so nothing was primary |
| **2** | **The hero (39)** | **The entire hero fitted inside one viewport**: headline, lede, two buttons, a third link, stage label, a two-button control, four row labels and a note, in six type sizes |
| **3** | **The footer (28 + 28)** | Four link columns **stacked in one column across two full screens** — 21% of the mobile page |
| **4** | **The chain (20)** | **Fifteen text elements, all at 13px** — figure labels, a three-item legend and a two-line note, with no dominant object |
| **5** | **Evidence (22)** | **Six distinct type sizes** in one viewport |

> **The cause was not spacing. It was the number of objects competing at equal weight.**

## 32. What changed — mobile only, and nothing meaningful removed

Seven outlined pills → underlined text links · **one stage is the subject (24px) while the other
two are an 18.4px index** · stage numerals hidden as redundant · per-row rules halved · the
`/services` link separated from the capability cluster · **the hero's stage now begins at 651px, so
the first viewport is the statement and the population is teased at the fold** · the figure's
legend cut to the one item its own labels do not name · **the footer moved to two columns with a
deep top margin**, ending two full screens of stacked links · more space above the system block.

**No copy was cut, no link dropped, no honesty device simplified away.**

## 33. Result

| | 18B | **18C** |
|---|---:|---:|
| **Mobile height, 390×844** | 7,824px / 9.3 screens | **7,566px / 9.0 screens** |
| 360×800 | — | 7,720px / 9.7 screens |
| 430×932 | — | 7,387px / 7.9 screens |
| **WIDE 1425** | 7,714px | **7,714px — delta 0** |
| **MEDIUM 845** | 7,103px | **7,103px — delta 0** |
| Worst screen score | 50 | **36** *(the footer seam)* |
| System-stages screen | **50** | **26** |

**Mobile got shorter while gaining breathing room** — the two-column footer paid for the whitespace.

**Desktop restraint verified numerically**, not assumed: every chapter height identical, and every
mobile rule confirmed inactive at 1425 and 845 (pills keep outlines, numerals visible, inactive
stage title still 40px, three legend items, four footer columns).

## 34. One-second test — seven of nine pass outright

Hero **2.1×** · *It behaves like one* **2.5×** · the chain **figure-dominant** · the admission
**2.5×** and **2.4×** · *Two ways to start* **2.2×**. Two screens are declared rather than claimed:
**the system screen at 1.3×** (chapter statement and active stage title share billing) and **the
close/footer seam**, where the dominant objects are the two CTA buttons rather than type.

## 35. F2 and F3, at both widths

**F2 — first fixation. PASS at WIDE and NARROW.** At 390 the first viewport now resolves to the
41px headline at 2.1× the runner-up, with nothing below it competing — the population is at the
fold, not in the composition. **This is the item that materially improved this session.**

**F3 — visual proportion. PASS at WIDE, IMPROVED-BUT-MARGINAL at NARROW.** Mobile still carries
more text than figure in the second half, and screen 4 — the chain's own screen — reads quieter
than the chapters around it. **The 18B finding stands: the second half is the remaining target.**

## 36. Three defects found and fixed

| # | Defect | Fix |
|---|---|---|
| **17** | **An 18B rule later in the same media block silently overrode the new stage size contrast** — inactive titles measured 27.3px against an intended 18.4px, so the change did nothing | Removed the duplicate `.stg__t` rule |
| **18** | **The first clutter audit counted content clipped inside collapsed disclosures**, overstating every screen and masking which fixes worked | Rewrote it to exclude anything clipped by a collapsed ancestor |
| **19** | **The first footer change concentrated clutter rather than removing it** — two columns put 17 links in one viewport | Kept two columns, added a 52px row gap and a deep top margin |

## 37. Declared for the orchestrator

1. **Unchanged from 18B:** two reader-driven controls, T3 at 4 and deliberately unsettled, and
   Block 4's approved detail living on `/how-it-works`. **No governance file was modified.**
2. **The system view is a mobile *hierarchy*, not a mobile *re-sequencing*.** I stopped short of
   collapsing the inactive stages into a numeric stepper. If mobile still reads dense, that is the
   next move, and it is listed with three others in `08_MOBILE_REFINEMENT_18C.md` §8-M.

## 38. What the owner should judge next

1. **Does mobile still feel cluttered, and on which screen?** The audit is per-screenful, so a
   pointer to a screen maps directly to a cause.
2. **Does the first mobile viewport now feel premium?** That was the largest single change.
3. **Is the system block readable on a phone**, with one stage forward and the others as an index?
4. **Desktop should look identical to what was approved** — if anything reads differently there,
   it is a defect, because nothing outside `max-width:760px` was touched.

**Gate 10 remains NOT PASSED — IN PROGRESS.**

---

# SESSION 19A — GATE 10 NARROW CLOSURE CORRECTIONS

**Date:** 2026-09-04 · **Branch:** `test_branch` · **HEAD unchanged:** `6f1179f`
**Nothing staged, committed or pushed. Production untouched. Gate 10 remains formally open.**

Three authorised corrections from the Session 19 closure audit. **Not a design session.** The
owner-approved 18C composition is unchanged: **every chapter height delta is 0px at WIDE, and the
page height delta is 0px at 360, 390 and 430.**

## 39. Correction A — hero quantity safety
The four hero rows carried inline widths `34/26/30/22%` beside named channels. **They are now one
equal length**, set once in CSS, with every inline width deleted — measured `[176,176,176,176]` at
WIDE and equal at all narrow widths. The bar now carries **state only**: solid tangerine = a named,
attributed object; dashed grey = unattributed. **Cold test — could a viewer infer one channel has
"more" than another without reading the disclaimer? NO.** Hero height unchanged at 895px.

## 40. Correction B — programme interaction floor
Pre-correction census: 0 undersized at 360/390/430 · 1 at 760 · **25 at 761/860/1080** · **33 at
1425**. Corrected with **invisible centred `::after` hit-area extenders** on `.logo`, `.navlink`,
`.util a`, `.proof`, `.ev__go` (zero layout, zero paint, type and underlines untouched), **real
padding** on the footer columns whose 30px pitch would have made extenders overlap and cause
mis-taps, and `min-width:40px` on `.disc` (44px tall but 24px wide).
**Result: 0 controls under 40×40 at all eight widths.** Cost: **+77px at WIDE, footer only**;
**0px at every narrow width**; `<main>` unchanged everywhere.

## 41. Correction C — dead boundary transition removed
The "fall" never rendered. **Removed, not repaired** — the boundary chapter is intentionally still.
Removal also closed **two previously unreported defects**: under no-JS the strike *did* draw, so
no-JS disagreed with the reviewed page; and under reduced motion `opacity:.6` dropped the five
promises to **2.66:1 against a 3:1 floor** — a WCAG 1.4.3 failure that survived four sessions
because every earlier sweep compared declared colours on the normal page. **All three modes now
agree.** A reduced-motion sweep that accounts for opacity has been added to the method.

## 42. ⚠ CORRECTION TO SESSION 19 — the live T3 count is 4, not 3
**This corrects my own arithmetic error and falsifies a premise of the 19A brief.** Session 19
enumerated five transitions, found one dead, and reported three. **Five minus one is four.**

Live, each verified by trigger and by rendered class: **hero departure** (rAF scroll handler) ·
**departure carrier** (`dep on`) · **chain descent and draw** (`chain on`) · **close arrival**
(`close on`).

**The proposed governance budget of 3 is therefore still exceeded by one.** All four meet the
standard — three join two chapters, one changes reader distance — and Session 18A's per-transition
audit reached the same conclusion before the miscount. **Reconciliation 3 → 4 remains outstanding.
`docs/24-resolve-governance/` was not modified.**

## 43. Regression
F2 **PASS** (5.0× WIDE, 2.05× NARROW) · F3 **PASS** (type peaks identical to 18C) · contrast **0
failures** at WIDE, 390 and reduced motion **including opacity** · **0 touch targets under 40×40 at
eight widths** · no horizontal overflow · no-JS and reduced motion complete · quantity safety
**PASS** with zero inline size styles remaining.

## 44. Newly discovered — NOT authorised, NOT fixed, and blocking
**Seven `<a href>` capability links are nested inside `<button role="tab">` elements.** Invalid
HTML — a button's content model prohibits interactive descendants — with a measured consequence:
**each stage tab's accessible name is 126 characters**, absorbing its whole panel including all
four link labels (*"01Capture Reach the buyers already looking. Some demand never reaches you at
all. Organic searchGoogle AdsPaid…"*). These seven links are the homepage's entire capability
routing. **Reported rather than fixed, per §9 of the 19A brief** — it is outside the three
authorised corrections and touches interaction structure. See §11 of the Session 19A report for the
proposed minimal remedy.

---

# SESSION 19B — FINAL GATE 10 ACCESSIBILITY CLOSURE

**Date:** 2026-09-04 · **HEAD unchanged:** `6f1179f` · Nothing staged, committed or pushed.

**The single Gate 10 blocker reported in 19A is closed.** Seven capability `<a href>` links were
nested inside `<button role="tab">` elements — invalid HTML whose measured consequence was a
**126-character accessible name** on each tab, absorbing its whole panel.

**Corrected, DOM and semantics only.** Each panel is now a **sibling** of its tab, with
`role="tabpanel"`, a unique `id` and `aria-labelledby`; the row padding moved to the `<li>` so the
composition is preserved; the tablist gained a **roving tabindex** and **Home/End**; collapsed
panels are **`inert`** so no focus ring can land on an invisible link; and the ordinal numeral is
`aria-hidden`.

**Results:** nested interactive elements **7 → 0** · accessible names **126 chars → 7**
(*"Capture" · "Convert" · "Measure"*) · 0 duplicate IDs, 0 broken `aria-controls`, 0 orphan panels,
0 invalid hrefs · **7/7 capability routes unchanged** · **page height, system height and
next-chapter start delta 0px at all eight tested widths**.

**One regression introduced and fixed in-session:** with the padding moved, the tab's own box fell
to 19–35px between 760 and 1080; corrected with the same invisible hit-area extender used in 19A.
**0 controls under 40×40 at all eight widths, with no overlap between adjacent tabs.**

**Unchanged and reconfirmed:** F2 and F3 PASS at both widths · 0 contrast failures · live **T3 = 4**
· boundary still · no-JS and reduced motion both expose all three panels and all seven links.

Full record: `docs/26-resolve-homepage/10_ACCESSIBILITY_CLOSURE_19B.md`.


---

> ## ⚠ STATUS UPDATE — GATE 10 PASSED, 2026-09-04 (`DEC-019`)
>
> The sessions recorded above concluded with **Gate 10 PASSED**. The **Session 19B state of
> `docs/26-resolve-homepage/prototype/index.html` is the approved homepage baseline.**
>
> Two corrections apply to the T3 counts stated in the Session 18–18C sections above, and are
> already carried in the correction banners inside `docs/26-resolve-homepage/`: the boundary
> "fall" transition **was never live and has been removed**, and the **validated live T3 count is
> 4**, now the reconciled governance ceiling for the homepage.
>
> Full closure record: `SESSION_20_GATE10_CLOSURE.md`.
