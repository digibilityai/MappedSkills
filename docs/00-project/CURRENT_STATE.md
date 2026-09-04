# Current Project State

> ## ⚠ ACTIVE OWNER-APPROVED VISUAL DIRECTION — READ FIRST
>
> ### **SESSION 15C — THE RESOLVE.**
> **Approved prototype (the reference — the file, not a session label):**
> **`docs/20-creative-convergence/prototype/convergence.html`**
> Recorded as **`DEC-018`** (2026-09-03). Governance: **`docs/24-resolve-governance/`**.
>
> **THE RESOLVE is LIGHT-FIRST** — ivory `#F7F3EC` ground, warm near-black ink `#141219`, one
> accent **tangerine `#FF5B04`**, Bricolage Grotesque + Manrope, a dark hero stage that
> **inverts to light as the population resolves**, and **no ambient motion, no canvas, no
> looping animation and no sticky elements**. Its one move is **RESOLUTION — the same
> population, resolved**: traffic is a field of identical anonymous marks, enquiries are a few
> distinct named objects.
>
> ### **SESSION 15D — THE ARRIVAL: SUPERSEDED AS ACTIVE DIRECTION**
> after an owner prototype-label clarification. `DEC-017` recorded it on the mistaken label
> *"15D"*; the owner then reopened the live prototypes and confirmed **“Yes this is the one. I
> like THE CONVERGENCE — ‘The Resolve’.”** `DEC-017` is **retained unchanged as historical
> record**. `docs/21-creative-convergence-a/` is **retained exploration**, unchanged and openable.
>
> ### **SESSION 16 ARRIVAL DESIGN SYSTEM (`docs/22-design-system/`): HISTORICAL / PARTIALLY REUSABLE**
> **Arrival-specific rules are SUPERSEDED** — dark-first, the espresso world, amber, the eight
> signal states, the capture line / horizon / ledger / streak / band primitives, canvas, ambient
> regions, pinned sequences, and the Arrival colour, surface, type and motion-budget systems.
> **Direction-independent rules may survive, subject to the `DEC-018` audit** at
> `docs/24-resolve-governance/01_SESSION16_AUDIT.md`.
>
> > **`docs/22-design-system/` still opens with "THE ARRIVAL" and a BINDING list headed by
> > *dark-first*, and carries no in-file warning. DO NOT APPLY IT TO THE RESOLVE WITHOUT READING
> > THE AUDIT FIRST.**
>
> ### **GATE 10: PASSED — 2026-09-04 (`DEC-019`).**
> **THE RESOLVE is validated as the production visual and experience direction, and the approved
> homepage baseline is `docs/26-resolve-homepage/prototype/index.html` (Session 19B state).**
> The creative reference above remains the authoritative direction file and is unmodified.
> **Passing Gate 10 approves NO production implementation and resolves NO owner blocker.**

## Current Phase
**SESSION 20 — GATE 10 FORMAL CLOSURE — COMPLETE (2026-09-04). RESULT: GATE 10 PASSED (`DEC-019`). THE RESOLVE VALIDATED AS THE PRODUCTION VISUAL AND EXPERIENCE DIRECTION.**

**The approved homepage baseline is `docs/26-resolve-homepage/prototype/index.html`** — the Session 19B state. The authoritative creative reference remains `docs/20-creative-convergence/prototype/convergence.html`, **verified byte-identical (`c6d29fd34cf7c5e481d8244773f7d357`) across every session from 17B to 19B and never modified.**

**The validation chain, in order:** **Session 18** built the complete homepage after the owner rejected the isolated F1 experience as *"still bland… no journey happening"*; **18A** refined it on *"finally going in the right direction"*; **18B** compressed it on *"too text heavy and long… so much of monotony"*, taking the page from 11,056px to 7,714px and visible copy from 1,435 words to 681 by merging three chapters into one system view; **18C** de-cluttered mobile on *"the mobile view looks a little cluttered"*, taking 390px from 9.3 screens to 9.0 while adding breathing room; **19** was a read-only closure audit; **19A** corrected quantity-safety geometry, the interaction floor and a dead transition; **19B** closed the last blocker, an invalid interactive nesting. **The owner's final verdict — *"the mobile now feels right"* — is the validated mobile state.**

**Gate 10 evidence, all rendered and measured:** **F2 first fixation PASS** at WIDE (5.05× dominance) and NARROW (2.05×) · **F3 visual proportion PASS** at both widths · **quantity safety PASS** (every comparable set non-comparative, zero inline size styles) · **evidence/proof safety PASS** (no fabricated proof of any kind) · **accessibility PASS** (0 contrast failures, 0 heading jumps, **0 interactive targets under 40×40 across eight widths**, 0 overflow, 0 fixed/sticky, 0 looping animation) · **no-JS and reduced motion PASS** (both compose the complete page) · **marketing-company blur, digital/PDF and static-quality tests PASS** · **two reader-driven controls ACCEPTED** as doing distinct informational jobs.

**Motion governance reconciled:** the homepage **T3 budget moves 3 → 4** — a validated **ceiling**, not headroom — recorded in `docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md` §5.0. The four live transitions are the hero departure, the departure carrier, the chain descent and draw, and the close arrival; **the boundary chapter is intentionally still.** Ambient regions remain 0, pinned sequences remain 0, and the anti-tic rules M1–M7 are unchanged.

**Two defects that had survived several sessions of reporting were found during closure and corrected, and are recorded rather than hidden:** a boundary transition **documented as live in Sessions 18–18C had never rendered**, and was removed in 19A rather than repaired — taking with it a no-JS inconsistency and a **reduced-motion contrast failure of 2.66:1 against a 3:1 floor**; and **seven capability links were nested inside `<button role="tab">` elements**, invalid HTML that gave each tab a **126-character accessible name**, corrected in 19B to a valid tab/tabpanel structure.

**NO PRODUCTION IMPLEMENTATION HAS BEGUN, AND NONE IS COMMITTED.** No file under `app/`, `components/`, `public/`, `styles/`, `hooks/`, `lib/`, `scripts/` or `config/` has been created or modified at any point in Sessions 17B–20. **The next phase is PRODUCTION TRANSLATION / IMPLEMENTATION PLANNING — not further homepage creative iteration.** Homepage creative exploration is **closed**.

**Owner blockers remain open and were not resolved by Gate 10:** **`/pricing` facts** · **F17, the real `/how-it-works` process, which remains BLOCKED and undrawn** · **the conditional manufacturing route.** Also still outstanding and carried into production translation: real-hardware performance profiling and Core Web Vitals, screen-reader / real-device / cross-browser / print / 200%-resize testing, and **user testing, which this programme has never performed.**

**Prior record, preserved — SESSION 17C — F1 MOTION REFINEMENT — COMPLETE (2026-09-03). RESULT: F1 MOTION REFINED — READY FOR OWNER REVIEW. GATE 10 REMAINS NOT PASSED — IN PROGRESS.** **OWNER FEEDBACK, BINDING: "F1 works but feels too static."** Interpreted as stated: **the F1 visual direction is ACCEPTED**; the figure was **not redesigned**, its structural concept is unchanged, no alternative was created, and **motion only was refined**. **The composition is untouched** — geometry, node positions, spacing, labels, legend, colours and copy are unchanged.

**The diagnosis was that 17B's motion lacked causality, not quantity.** The chain drew while the annotations faded in on **fixed delays unrelated to where the drawing had reached**, so everything happened at once and nothing appeared to be caused by anything else — it read as "a figure appearing" rather than "a system being traversed". **Every event is now keyed to the position of the drawing front.** Three coordinated events and no more: **PROGRESSION** (the chain draws; each point registers as the front reaches it) → **INTERVENTION** (each tick is *struck* as the front passes that join — "something can be changed here", not "a conversion happened here") → **BOUNDARY** (the rule grows outward from the chain, then the client's own segment draws beyond it). **Total 2140ms**, inside the 1.8–3.0s target, then **stillness**. **Budget unchanged and within limits: 0 major Resolve moments · 1 sectional sequence · 3 internal events**, with **0 ambient regions, 0 loops, 0 `@keyframes`, 0 `requestAnimationFrame`, 0 pinned or scroll-scrubbed sequences, 0 animation libraries, 0 canvas and 0 fixed/sticky elements** verified in the rendered page. **There is no travelling dot, orb, comet or particle: what moves is the drawing of the structure itself.**

**The Resolve-repetition test passes.** The hero changes a **population's state** across a two-dimensional field with a ground inversion; F1 changes **no state at all** — one path, drawn, on an unchanged ground. The staggered reveal is the one place drift could occur, and the defence is recorded as a designer's reading rather than a measurement: F1's stagger runs **strictly along a single line tied to a drawing front**, not across a field in waves. **F1 is not louder than the hero** — no ground change, no inversion, no population, and its largest moving element is a 2px line.

**One defect was introduced by the refinement, found by rendering, and fixed — and it is the most important finding of the session.** The draw technique sets `stroke-dasharray` in order to animate `stroke-dashoffset`; applied to the two `--gapc` lines it **overwrote their 5-5 dash pattern**, which is the shape channel carrying **"not measured"** and **"unattributed"**. Both rendered solid, silently converting two honesty states into ordinary strokes. **Fixed: dashed elements fade and are never drawn**, with the constraint recorded in the stylesheet so it cannot be reintroduced; verified afterwards as `5px, 5px` at every width. **The general lesson carried to the design system: a motion technique may not occupy a property that carries meaning.**

**Verified in the browser at WIDE 1440×900, MEDIUM 850×1000 and NARROW 390×844** — all three settle correctly with dashes intact and no horizontal overflow. **The trigger fires once** at 40% of the drawing inside a viewport inset 12% at the bottom — a genuine reading position rather than one pixel, reachable at every width (measured ratio 0.96 at NARROW), and the observer **unobserves on first intersection** so it cannot replay while scrolling. **No-JS renders the complete final composition** (verified visually). **Reduced motion resolves immediately**, both halves of the path exercised directly. **No accessibility regression:** graphics chain 16.8:1 · qualified point 3.97:1 · ticks 3.97:1 · not-measured 3.13:1 · your-system 6.38:1, all ≥3:1; text labels 6.38:1 and boundary label 16.8:1, all ≥4.5:1; minimum SVG text **16.8px** and minimum HTML text **13.1px**; 0 monospace, 0 images, 0 canvas, 0 hover rules.

**A tooling limitation is stated rather than glossed:** the animation **could not be sampled frame by frame**, because the browser pane throttles `requestAnimationFrame` and returns **stale `getComputedStyle` values** while hidden — several readings during the session reported an un-started animation that screenshots then showed complete. What **was** verified: the initial state, the settled state at all three widths, the **order** of events across successive forced paints, and the **complete timing configuration** read from computed `transition-delay`/`transition-duration`, which is state-independent. **Real-time playback smoothness on real hardware is unverified.** **One 17B position is superseded:** 17B reported the motion as *marginal* because the static and animated end states were identical — true of the draw alone, and why the draw alone was not enough. **What the sequence adds is causality — the order in which a system is traversed and acted on — which is F1's actual argument and is absent from the static frame.** **Remaining risks:** F1 has still never been seen beside the actual hero (the largest limit); the staggered-reveal defence is a reading, not a measurement; and no owner has seen the refinement. **No production file was touched; `DECISION_LOG.md`, `QUALITY_GATES.md`, `docs/24-resolve-governance/`, `docs/22-design-system/` and both the Session 15C and 15D prototypes are unmodified; nothing was staged, committed or pushed; README.md remains untouched and untracked.** Full record: `docs/00-project/handoffs/SESSION_17B_RESOLVE_F1_VALIDATION.md`.

**Prior record, preserved — SESSION 17B — F1 "THE RUN" VALIDATED AGAINST THE RESOLVE — COMPLETE (2026-09-03). RESULT: COMPATIBLE BUT DISTINCT. GATE 10 REMAINS NOT PASSED — IN PROGRESS.** The bounded question `DEC-018` left open is answered: **F1 can live inside THE RESOLVE.** The compatibility problem was real and specific — THE RESOLVE's signature gesture is a **population changing state**, and Session 15C already spends it **seven times**, so an F1 drawn as marks that resolve would have been the eighth instance and would have made the gesture the tic the motion budget exists to prevent. **The answer taken: the signature is about STATE — what a thing is; F1 is about STRUCTURE — how things connect; so F1 contains no state change at all.** One continuous object, six points, read along. The separation is carried on **seven channels** — object count, state change, geometry, silhouette, ground, direction and motion class — and **none of them depends on animation**, so it survives with every animation switched off. **Motion budget spent: 0 major resolve moments, 1 sectional explanatory event** (the chain draws once on view; nothing loops, nothing is ambient, nothing is scroll-scrubbed, it never replays).

**Every element of the approved F1 specification is preserved and was checked item by item** (fifteen items, `01_COMPATIBILITY_AUDIT.md` §8): six approved points in order · one continuous object · the accountability boundary drawn · the unmeasured stretch dashed · an arrival with no upstream segment · the client-data segment marked as theirs · intervention marks at the joins · complete and readable statically · a tabular text equivalent · no taper · no per-stage colour · not three services or a three-step process · **no implied delivery process, and `F17` neither drawn nor sketched** · no branded name · not ambient. **F1's approved meaning, taxonomy and route assignment were not reopened.**

**Rendered and inspected in a browser at 1440×900, 880×1000 and 390×844, plus a static/no-script state and a literal blurred-copy render.** Minimum rendered text anywhere, at any width, **13.1px**; every figure label **≥16.6px** — solved by construction, each of the three drawings being authored to a viewBox narrower than the smallest container in its band so it can only ever scale **up**. Contrast: ink 16.8:1 · labels 6.38:1 · link 6.02:1 · chain 16.8:1 · accent point and ticks 3.97:1 · not-measured dash 3.13:1 · client-data doubled line 6.38:1 — **all text ≥4.5:1 and all graphics ≥3:1**. No horizontal overflow at any width; node spacing equal at every width; **0 monospace, 0 images, 0 canvases, 0 fixed/sticky elements, 0 looping animations, 0 `:hover` rules**. The **no-JavaScript path was verified** complete, and **both halves of the reduced-motion path were exercised directly**. **All four standing tests pass** — static quality, document drift, tech/SaaS drift, and the marketing-company test, the last **performed literally as a blur render rather than approximated**.

**Seven defects were found by rendering the page and fixed:** all three responsive drawings rendering at once through a CSS specificity error (the section was 3335px tall); an IntersectionObserver threshold a tall section could never reach, so the draw silently never fired; the unattached-arrival mark reading as a bullet for the boundary label; intervention marks distinguished from the six points by size and colour only, changed to a tick crossing the line (**a diamond was rejected as a flowchart-decision shape**); **`--tang` failing the non-text contrast floor at 2.81:1 on ivory, moved to `--tang-ink` at 3.97:1** using THE RESOLVE's own darkened ramp; MEDIUM being the sparse-tablet failure the brief warned about, rebuilt so annotations sit beneath the point they name; and NARROW carrying an unequal final node gap of 124 units against 76, rebuilt at a constant 80. **One judgement is reported rather than defended: the motion is marginal** — the static and animated end states are identical, so the draw adds no information, and **it is the first thing to cut if the homepage feels busy after the hero.**

**The repository-safety defect carried from Session 17A is closed:** `docs/22-design-system/00_OVERVIEW.md` now opens with an unmistakable **SUPERSEDED** banner naming THE RESOLVE, `DEC-018` and `docs/24-resolve-governance/` as authoritative, warning specifically against applying **dark-first**, and pointing to the audit. **0 content lines were removed and the historical body is untouched**; no other file in `docs/22-design-system/` was modified. **Not done and not claimed:** no homepage, no design system, no F2 or F3 re-run, no owner review; and **a keyboard-driven focus ring and an OS-level reduced-motion run could not be positively confirmed** through this session's tooling, nor were screen readers, real devices, other browsers, print, 200% text resize, hardware profiling or **any user testing**. **The largest remaining risk is that F1 has never been seen next to the actual hero** — the compatibility finding rests on channel separation measured in isolation. **No production file was touched; the Session 15C and 15D prototypes are unmodified; `DECISION_LOG.md` and `QUALITY_GATES.md` were not modified; nothing was staged, committed or pushed; README.md remains untouched and untracked.** Full record: `docs/00-project/handoffs/SESSION_17B_RESOLVE_F1_VALIDATION.md`.

**Prior record, preserved — SESSION 17A — OWNER DIRECTION CORRECTION — COMPLETE (2026-09-03). RESULT: THE RESOLVE RESTORED AS THE ACTIVE VISUAL DIRECTION (`DEC-018`). GATE 10 REMAINS NOT PASSED — IN PROGRESS.** **OWNER CLARIFICATION, BINDING:** the owner **reopened the actual browser prototypes** and confirmed **“Yes this is the one. I like THE CONVERGENCE — ‘The Resolve’.”** The earlier *"15D"* reference recorded in `DEC-017` was a **mistaken prototype label**, not a change of mind. **The approved direction is SESSION 15C — THE RESOLVE**, and the approved reference is a **file path, not a session label**: `docs/20-creative-convergence/prototype/convergence.html`. **No history was rewritten:** `DEC-017` is retained unchanged, Session 15D and Session 16 are retained in full, nothing was amended, reset or deleted, and the mistaken approval is **superseded forward** so the record shows what happened.

**The direction's binding characteristics were verified by reading the prototype, not by copying a brief** (`docs/24-resolve-governance/00_ACTIVE_DIRECTION.md` §4): **light-first**, ivory `#F7F3EC` body ground (confirmed as the rendered `body` background), warm near-black ink `#141219`, **one accent tangerine `#FF5B04`** with a darkening ramp (`#D94400` display, `#A83400` small) so the same mark clears contrast at every size, **Bricolage Grotesque + Manrope**, a **dark hero stage that inverts to light as the population resolves**, CAPTURE → CONVERT → MEASURE as sequential resolution, claim / what-it-stands-on evidence, and a full-bleed tangerine CTA. **Verified absent in the source:** canvas (0), images (0), `box-shadow` ever set (0), `position:fixed`/`sticky` (0), looping animation (0 `infinite`), monospace (0) and ambient motion (an idle hero shimmer existed in an earlier draft and was deliberately removed). **One correction to the shorthand is recorded:** `repeating-linear-gradient` **is** used four times, as **dashed and hatched pattern fills encoding "not measured" and "unattributed"** — honesty devices that must not be stripped as "gradients"; what is prohibited is the decorative colour gradient.

**Session 16 was audited rule by rule against the actual 15C prototype** (`docs/24-resolve-governance/01_SESSION16_AUDIT.md`), classifying every material rule DIRECTION-INDEPENDENT, RESOLVE-COMPATIBLE or ARRIVAL-SPECIFIC. **Retained as written:** the accessibility floor A1–A14, the document-drift register D1–D8, the fabricated-quantity register Q1–Q8, activity-versus-commercial-consequence, commercial consequence as a state change rather than a replacement, evidence as a supporting layer with no monospace register, mandatory stillness, nothing dependent on motion, the approved upstream not reopened by design, narrow-must-recompose, and the no-library / `transform`-`opacity` / one-`rAF` performance rules. **Retained but restated in Resolve's terms:** the demand metaphor, one-accent-means-one-thing, the state-semantics rule, the motion-budget concept, inversion, counted surfaces, and the pattern-mapping discipline. **SUPERSEDED:** **dark-first**, the espresso world, amber, the eight Arrival signal states, the capture line / horizon / ledger / streak / band primitives, canvas, ambient regions, pinned sequences, Familjen Grotesk + Instrument Sans, and the Arrival colour, surface and motion-budget systems.

**A Resolve-specific motion and repetition budget was re-derived rather than inherited** (`docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md`), closing the gap **Session 15C named as its own highest risk R1** — the resolve gesture appearing **seven times** in the prototype and threatening to become a sitewide tic. **Homepage maximums: 1 major resolve · 3 sectional resolutions · 3 transitions · 1 signature interaction. Secondary pages: 0 / 1 / 2 / 0. Editorial and conversion surfaces: 0 / 0 / 1 / 0. Zero ambient regions and zero pinned sequences everywhere**, plus anti-tic rules M1–M7 — chief among them that **no two consecutive regions may run the same resolve gesture**. **The 15C prototype exceeds this budget by design and must not be edited to fit it;** the budget governs the design system and the homepage built from it, and the reconciliation happens when the homepage is composed.

**The uncommitted Session 17 F1 work was removed, not committed.** It tested F1 against THE ARRIVAL and is no longer a valid Gate 10 test. Before removal the diff was inspected and confirmed to be only the described uncommitted outputs: `docs/23-f1-validation/` (5 files, all untracked), `docs/00-project/handoffs/SESSION_17_F1_VALIDATION.md` (untracked), and a single Session 17 annotation hunk in `CURRENT_STATE.md`, which was reverted. **No tracked file existed under either removed path, so no committed history was lost. F1 must now be revalidated against THE RESOLVE — not in that session's form, and not yet.** The validation order is fixed at `docs/24-resolve-governance/03_NEXT_VALIDATIONS.md`: revalidate F1 → resolve findings → complete homepage in THE RESOLVE → render WIDE/MEDIUM/NARROW → re-run F2 → re-run F3 with the existing rubric unchanged → owner browser review → only then consider Gate 10 → only then consider production.

**Not done, and not claimed:** no design system was built, no homepage was designed, no F1 was drawn, F2 and F3 were not re-run, no MEDIUM width has ever been rendered in any direction, and no screen-reader, real-device, print, text-resize, performance-profiling or user testing has ever been performed in this programme. **The Session 15C and Session 15D prototypes were verified byte-for-byte unchanged by SHA-256 before and after this session. No production file was touched. README.md remains untouched and untracked.** **One residual governance risk is recorded rather than closed:** `docs/22-design-system/` still opens as "THE ARRIVAL" with a BINDING list headed by *dark-first* and carries no in-file warning; adding a superseded banner there is outside this session's staged scope and is a recommended follow-up. Full record: `docs/00-project/handoffs/SESSION_17A_OWNER_DIRECTION_CORRECTION.md`.

**Prior record, preserved — SESSION 16 — THE ARRIVAL FROZEN + DESIGN SYSTEM BUILT — COMPLETE (2026-09-03). RESULT: THE ARRIVAL DESIGN SYSTEM READY FOR ORCHESTRATOR REVIEW. GATE 10 IS NOT PASSED; THE DESIGN SYSTEM IS PROPOSED.** **OWNER APPROVAL, BINDING AND RECORDED AS `DEC-017`:** the owner reviewed four live prototypes side by side — original Direction A, Direction B, the Session 15C convergence and Session 15D — and stated **"Yes, 15D is clearly better."** **THE ARRIVAL is the approved visual direction for MappedSkills. CREATIVE-DIRECTION EXPLORATION IS CLOSED — there is no Session 15E**, no further territories, no further alternatives, no reopening of THE WORKING SHEET and no reopening of B as the foundation. **The approved prototype was re-verified before freezing** at 1440x900 and 390x844 and under the reduced-motion and no-JavaScript paths: **no defect was found and nothing was changed.** **The direction is now frozen with an explicit BINDING versus FLEXIBLE split** (`docs/22-design-system/01_CREATIVE_DIRECTION_FROZEN.md`): binding are dark-first, the demand/signal metaphor, activity versus commercial consequence, **one accent (amber) meaning commercially meaningful**, the eight signal-state semantics distinguished by **shape as well as colour**, commercial consequence as a **state change rather than a replacement**, **no fabricated quantitative visuals**, evidence as a supporting layer with **no monospace register anywhere**, the motion roles and budgets, mandatory stillness, nothing dependent on motion, the accessibility floor, the approved upstream not reopened by design, and the anti-pattern register; flexible are field geometry, signal counts, exact type sizes and durations within range, exact hex values, and the composition of individual secondary pages. **THE RECORD's redefinition is retained unchanged: a CREDIBILITY SYSTEM, never the sitewide visual genre.** **The motion budget is now binding as MAXIMUMS** — homepage 2 ambient regions / 5 major motion events / 2 signature interactions / 1 pinned sequence / 1 full-colour inversion; service page 1 / 2 / 1 / 0 / 1; editorial 0 / 1 / 0 / 0 — with stillness mandatory in reading-heavy regions, after major transformations and off-screen, and secondary pages inheriting the language as a composed still rather than replaying the show. **This closes the governance gap Sessions 14A, 15B and 15C each identified and left open.** **A 17-document design system was produced** in `docs/22-design-system/`, covering colour (semantic roles with measured contrast — text 17.36:1, secondary 8.69:1, small recessive 6.58:1, accent 8.43:1 — and a stated register of where amber is permitted and prohibited), typography (Familjen Grotesk + Instrument Sans, roles as ranges, **monospace prohibited outright** as the register that produced both the document and the developer-tool readings), layout and four counted surfaces, **signal semantics for all eight states** with their commercial meanings, shapes, labels, accessibility fallbacks and prohibited interpretations, the motion system, twelve visual primitives, the pattern inventory **mapped onto the approved Gate 9B patterns without adding any**, navigation and actions, forms, evidence, figures, the responsive system, accessibility and performance, the anti-pattern register, and a homepage-readiness assessment. **HOMEPAGE READINESS: the system is sufficient to design the complete homepage without inventing another visual language, with five named gaps** — the significant one being that **F1 (the run) has never been drawn in THE ARRIVAL's materials**, which is composition work rather than language work and must be done first. **Not tested and not claimed:** screen readers, real devices, other browsers, print, text resize, MEDIUM width, and **any user testing**; the prototype's signal budget (170 wide / 64 narrow) is **prototype evidence, not a production limit**, and profiling on real hardware is a binding prerequisite to implementation. **Governance updated:** `DEC-017` recorded; `QUALITY_GATES.md` now shows **Gate 10 as NOT PASSED, IN PROGRESS** with the F2/F3 re-tests still mandatory and not yet run against this direction. **All superseded explorations are retained unchanged as decision history** — `docs/17-visual-validation/`, `docs/18-design-system/`, `docs/19-creative-reset/`, `docs/20-creative-convergence/` and `docs/21-creative-convergence-a/`. **No production code was touched. Nothing was staged, committed or pushed; README.md remains untouched and untracked.** Full record: `docs/00-project/handoffs/SESSION_16_DESIGN_SYSTEM.md`.

**SESSION 15D — CREATIVE CONVERGENCE REVERSAL (A FOUNDATION + B SOPHISTICATION) — COMPLETE (2026-09-03). RESULT: A-FOUNDATION CONVERGENCE READY FOR OWNER REVIEW. NO DESIGN SYSTEM WAS BUILT, NO HOMEPAGE WAS DESIGNED, AND GATE 10 REMAINS NOT PASSED.** **OWNER VERDICT, BINDING: "Option A was much better than option B."** **Session 15C started from the wrong foundation, is SUPERSEDED, and was not defended** — it is preserved unchanged for comparison. **Direction A — THE SIGNAL FIELD is now the visual foundation; Direction B contributes principles only** (state transformation, commercial clarity, static quality, restraint, claim/evidence, compositional confidence). The formula is **A's visual world + B's commercial sophistication**, not "B plus A's energy" — **no energy was added for its own sake**; the field's density was reduced and calm states introduced. **The refined idea is THE ARRIVAL:** demand is light travelling across a dark plane, almost all of it passes through, and a few are **caught** — gaining a colour, a name and a place on a ledger. Six drawn states each carry a commercial name (travelling, passed, stalled, caught, tagged, unattributed), and the two honest states — **not measured** and **unattributed** — are drawn as **shapes**, so they survive colour removal and cannot be read as values. **The AI/tech-startup drift was solved by art direction rather than by removing the field:** the world moved from blue-black to **espresso with warm bone light**; A's mint-green/orange pair was replaced by **one accent, amber, used only where demand becomes commercially yours**; **monospace was removed entirely** (0 elements); the field became **streaks in a masked band with a horizon** rather than dots in a void; and density fell while presence rose. **Measured in the browser at 1440x900 and 390x844: 0 text elements below the WCAG threshold (73 audited at each width), 0 rendered text under 12px, no horizontal overflow, 0 images, 0 fixed elements, 0 monospace, and the focus ring confirmed at 3px solid amber with 3px offset.** **Reduced-motion and no-JavaScript fallbacks were exercised structurally** — the pinned sequence unpins, and the ledger, the commitment, the seam, all six evidence rows and the CTA marks all retain real geometry; nothing disappears. **Twelve defects were found by inspecting the rendered page and fixed**, including a ledger drawn as a bar chart of unequal lengths (a fabricated-metric pattern — every mark is now identical), invisible stalls, a measure beat with no transformation, and beat copy that an interrupted animation could leave permanently invisible. **All four standing tests pass:** static quality, the digital test (it could not be print), the marketing-company test with copy blurred, and the AI/tech drift test — with the residual risk named, that a dark page with a moving light field is adjacent to that category by construction and is held out of it only by discipline. **The thing this session actually closed is the MOTION BUDGET**, stated as numbers for the first time: max 2 ambient regions, 5 major motion events, 2 signature interactions, 1 full-colour event and 1 pinned sequence on the homepage; 1 / 2 / 1 / 1 / 0 on a service page; 0 / 1 / 0 on editorial; with mandatory stillness in reading columns, after every resolution, and off-screen. Sessions 14A, 15B and 15C each identified that gap and left it open. **Signal budget: 170 live signals at WIDE, 64 at NARROW, both fields paused entirely off-screen.** **Not tested and not claimed:** screen readers, real devices, other browsers, print, text resize, OS-level prefers-reduced-motion, and **any user testing**. **Sessions 14, 15, 15B and 15C are all unchanged; original A, original B and 15C are preserved and openable side by side** at `docs/21-creative-convergence-a/prototype/index.html`. **Nothing was staged, committed or pushed; README.md remains untouched and untracked.** Full record: `docs/00-project/handoffs/SESSION_15D_CREATIVE_CONVERGENCE_A.md`.

**SESSION 15C — CREATIVE CONVERGENCE (B FOUNDATION + A ENERGY) — COMPLETE (2026-09-02). RESULT: CONVERGENCE PROTOTYPE READY FOR OWNER REVIEW. NO DESIGN SYSTEM WAS BUILT, NO HOMEPAGE WAS DESIGNED, AND GATE 10 REMAINS NOT PASSED.** **OWNER DECISION, BINDING: "B feels like the right foundation, but A has the energy I want."** Direction B — THE SWITCH is the creative foundation; Direction A is **not** merged wholesale, and selected **energy principles** from A were extracted and introduced as behaviour rather than as a second visual system. **The convergence idea is THE RESOLVE:** traffic is a field of identical, anonymous marks; enquiries are a few distinct, named objects; the site's one move is **resolution** — the same population, resolved — applied to the hero, to CAPTURE → CONVERT → MEASURE, to the commercial argument, to the evidence and to the CTA. **Kept from B:** palette (ivory / ink / one tangerine accent), Bricolage Grotesque + Manrope, the two-state surface as a token change, the claim-and-what-it-stands-on evidence relationship, and strong static composition. **Extracted from A as principles:** signals behave, kinetic hierarchy, visible progression, reactive feedback, stronger section handoff, and loss drawn rather than deleted. **Explicitly rejected from A:** the dark tech aesthetic as the site's ground, particle wallpaper, any canvas, ambient motion, A's green, and A's gate interaction — **counted in the prototype: 0 canvases, 0 images, 0 icons, 0 gradients, 0 shadows, 0 fixed or sticky elements, 0 looping animations.** **Measured in the browser at 1440x900 and 390x844: 0 text elements below the WCAG contrast threshold, 0 rendered text under 12px, no horizontal overflow at either width, and the focus ring confirmed with real keyboard Tab.** **Three standing tests all pass:** static quality (it remains a finished premium composition with motion removed), vibrancy (materially more energetic than original B — a different mechanic, roughly eight events against four, and the marks are the same objects before and after), and the document test (it could not survive as a PDF). **Ten defects were found by inspecting the rendered page and fixed**, including approved copy that had been pushed to opacity 0.34, a 3.97:1 eyebrow, invalid main nesting, and a hero moment that played to an empty screen on a phone; **one motion was removed as gratuitous.** **Not tested and not claimed:** screen readers, real devices, other browsers, print, text resize, OS-level prefers-reduced-motion (implemented and partially exercised only), and **any user testing.** **Highest open risk: the resolve has no budget** — it appears seven times in the prototype and needs a stated rule before it becomes a design system. **Session 15B, Session 15 and Session 14 artefacts are all unchanged; original Direction B is preserved for side-by-side comparison.** **Nothing was staged, committed or pushed; README.md remains untouched and untracked.** Full record: `docs/00-project/handoffs/SESSION_15C_CREATIVE_CONVERGENCE.md`.

**SESSION 15B — DIGITAL CREATIVE RESET — COMPLETE (2026-09-02). RESULT: THREE DIGITAL DIRECTIONS READY FOR OWNER REVIEW. NO DIRECTION IS CHOSEN, NO DESIGN SYSTEM WAS BUILT, AND GATE 10 REMAINS NOT PASSED.** **OWNER VERDICT, BINDING: the Session 15 homepage is NOT APPROVED** — the owner viewed it and reported that it looks like a document / journal / textbook, that the design concepts feel lost, that there is effectively no animation, that it is not vibrant, and that it feels typeset rather than digitally designed. **This overrides Session 15's own "no material drift" finding and was not defended** using F2, F3, device budgets, accessibility or Direction 2 compliance. **The diagnosis is recorded in `docs/19-creative-reset/00_WHY_SESSION_15_FAILED.md`:** THE RECORD, and specifically Direction 2 "THE WORKING SHEET", was promoted from a credibility system into the visual GENRE of the website, and the F2/F3 measurement rewards typographic hierarchy — so a page optimised against it converges on well-set prose. **RESET: Direction 2 is no longer binding as the sitewide visual treatment.** **NOT RESET, and still binding:** strategy, positioning, IA, approved messaging, approved copy, UX architecture, CRO architecture, CTA architecture, evidence discipline, measurement discipline, blocked-content rules and the F1 taxonomy. **THE RECORD is redefined as a CREDIBILITY SYSTEM** governing evidence, provenance, measurement, limitations and accountability — not typography, geometry, composition, animation or atmosphere everywhere. **Three materially different, browser-rendered creative directions with working motion were produced** in `docs/19-creative-reset/prototype/`: **A — THE SIGNAL FIELD** (a live canvas field of demand with three operable gates and an accumulating ledger of tagged and untagged arrivals), **B — THE SWITCH** (the whole surface inverts between the traffic view and the enquiries view, making the approved H1 the mechanic of the site), and **C — THE TRACE** (the page instruments the visit and replays it back as the approved enquiry chain, including what it could not see, with nothing sent anywhere). Each carries 5 signature digital moments, a defined motion system, an evidence treatment, one content-heavy section transformed, and a distinct mobile transformation. **Measured in the browser at 1440x900 and 390x844 on all three: zero text below the WCAG contrast threshold, zero rendered text under 12px, no horizontal overflow, zero images, zero fixed sales CTAs, and zero of the prohibited generic devices.** **Not tested and not claimed:** screen readers, real devices, other browsers, OS-level prefers-reduced-motion (declared and code-reviewed only), a full keyboard walk-through, print, and **any user testing.** **Claude's recommendation is B, stated with reasons; the owner chooses and all three remain available, unmerged.** **Session 15 is preserved intact as the negative reference** — `docs/18-design-system/` is unchanged. **Nothing was staged, committed or pushed; README.md remains untouched and untracked.** Full record: `docs/00-project/handoffs/SESSION_15B_CREATIVE_RESET.md`.

**SESSION 15 — DESIGN-SYSTEM FOUNDATION + COMPLETE HOMEPAGE DESIGN — COMPLETE (2026-09-02). RESULT: A — HOMEPAGE DESIGN READY FOR ORCHESTRATOR REVIEW, subject to the twelve open risks in `docs/18-design-system/07_OPEN_DESIGN_RISKS.md`. GATE 10 IS STILL NOT PASSED, NOT APPROACHED AND NOT IMPLIED, AND `/` IS NOT PUBLICATION READY.** The **complete approved homepage** — blocks 1 to 8, header and footer, approved copy verbatim — was designed and rendered as an isolated prototype (`docs/18-design-system/prototype/homepage.html`), alongside a production-capable **design-system foundation** (`prototype/foundation.css`, documented in `01_DESIGN_SYSTEM_FOUNDATION.md`). **F2 and F3 were re-run against the Session 14A rubric applied unchanged and both PASS at WIDE (1400x900) and NARROW (390x844):** 9 of 9 bands emphasis-led by COMMERCIAL at WIDE; 12 of 13 at NARROW with 1 LIMIT and **0 EVIDENTIAL**. **No register label is the heaviest element in any band at either width.** Device census on the rendered page: **4 hairlines - 2 set-piece rules - 2 register labels - 2 ground changes - 1 full-weight figure - 2 PRIMARY actions - 0 cards - 0 icons - 0 photographs - 0 shadows - 0 fixed or sticky elements - 0 animations - 1 script that nothing depends on.** Every budget met, none exceeded. **Drift test: no material drift; the primary perception is a modern commercial marketing firm.** **Nine defects were found by rendering the page and fixed**, the two most serious being a narrow header that pushed its own menu control off-screen (making every destination unreachable at 390px) and a second hero action falling below the narrow fold; the H1 cap was raised from 76px to 88px because at 76px the first screen read as empty rather than confident. **Measured in the browser:** ink 15.89:1, apparatus 8.81:1 (AAA), accent and focus ring 6.60:1, no rendered text below 16px, focus ring confirmed with real keyboard Tab, no horizontal body overflow at 1400/1024/768/390, greyscale legible. **Not tested, and not claimed:** screen readers, real devices, other browsers, print, text resize, and **no user testing of any kind.** MEDIUM (1024 and 768) was inspected for structural breakage and none was found. **Three upstream issues were REPORTED, not fixed** - see the Session 15 handoff. **Nothing was staged, committed or pushed; README.md remains untouched and untracked.** Full record: `docs/00-project/handoffs/SESSION_15_DESIGN_FOUNDATION.md`.

**SESSION 14A — NARROW VISUAL CLOSURE — COMPLETE (2026-09-02). RESULT: A — VISUAL TERRITORY READY FOR DESIGN-SYSTEM DEVELOPMENT, subject to the scope limits in `docs/17-visual-validation/11_SESSION_14A_CLOSURE_ASSESSMENT.md` §5. THIS SUPERSEDES SESSION 14's "B" VERDICT. GATE 10 IS STILL NOT PASSED, NOT APPROACHED AND NOT IMPLIED.** The two issues Session 14 left open are closed. **(1) The register-label defect is resolved:** a five-part binding rule (`08_REGISTER_LABEL_RULE.md`) derived from the defect's mechanism — RL-1, a label never appears without an argument-register heading; RL-4, at most two labels per page, on set-piece regions only. **(2) "Visual weight" is now defined at programme level** (`09_VISUAL_WEIGHT_RUBRIC.md`): it separates **STRUCTURAL AREA** from **PERCEPTUAL EMPHASIS**, establishes **"emphasis governs, area informs"**, uses the viewport-height band as its unit, and contains **no numeric pass thresholds** — the defect that made F3 undecidable. **Both documents were written and saved before the test page was built; file timestamps are the evidence.**

**A complete `/seo` page was rendered** (`prototype/05-seo-complete.html`) — all approved moves, header, breadcrumb, action region and footer, carrying no validation chrome so that measured bands are the bands a reader experiences. **F2 and F3 were re-run against it at 1400×900 and 390×844 and both PASS at both widths.** F2: the heaviest element per band is **COMMERCIAL in 5 of 6 bands at WIDE and 8 of 9 at NARROW; EVIDENTIAL in none**. F3: all three rubric conditions met at both widths. **The narrowest margin is stated rather than smoothed** — at NARROW, bands 3–4 are roughly 1.7 screens in which boundary prose leads the area, and it passes by one band. **Drift test: the page reads as a modern commercial marketing firm**, on a counted repetition census of 4 hairline rules, 1 set-piece rule, **1 register label**, 2 ground changes, 1 figure, 2 disclosures (both closed by default), **0 cards, 0 icons and 0 scripts** across nine mobile screens.

**Three defects were found by rendering and fixed:** the figure's tabular equivalent occupied a full screenful and became an expandable disclosure (still in the DOM, open in print); the figure scrolled sideways at NARROW and was replaced by a **genuine vertical drawing**; and **there was no narrow header at all**, so a wrapped link list consumed half the first screen and pushed both hero actions below the fold — replaced with the approved `46` STATE 3 native `<details>` panel. **One of Session 14's own selection reasons was corrected rather than defended:** the register label was named as Direction 2's scan layer and, rationed to at most two per page, cannot be — scannability is carried by the rules, the verb-led headings and the type-scale jumps. **The direction comparison was not re-run.**

**Verified in the browser:** contrast ink 15.86:1 / apparatus 8.77:1 (AAA) / accent 6.58:1 · focus ring confirmed with **real keyboard Tab** (solid 3px accent, 3px offset) · no horizontal body scroll at 1400/900/390 · no `:hover` rule reveals any content · greyscale legible · limits open at every width and never inside a disclosure · **zero scripts**, so the dead-control failure `45` STATE 4 prohibits cannot occur. **Not verified:** print output, and **no user testing occurred or is claimed.** **Still unvalidated and explicitly not covered by this result:** the **complete homepage** (its elements were rendered in Session 14 but never assembled into one page — this is the recommended first specimen of the design-system phase), cumulative drift across 22 routes, and the **`changed` state pair (F7)**, which stays blocked. **Scope discipline held:** no production file, no approved artefact, no `DECISION_LOG.md`, no `QUALITY_GATES.md`, nothing in `docs/16-ux/` or `docs/11-creative/`, nothing invented, `F17` still BLOCKED and undrawn. **The two upstream items remain REPORTED, not fixed** — neither affects the `/seo` validation, though the AI-system enumeration **still blocks F3, the figure**. **Nothing was staged, committed or pushed; README.md remains untouched and untracked.**

**Prior record, preserved — SESSION 14 — BOUNDED VISUAL VALIDATION OF THE APPROVED CREATIVE TERRITORY ("THE RECORD") — COMPLETE (2026-09-02). RESULT: B — PROMISING, NARROW CORRECTIONS REQUIRED. GATE 10 IS NOT PASSED, NOT APPROACHED AND NOT IMPLIED.** Three materially different interpretations of THE RECORD were developed; **one was selected — Direction 2, "THE WORKING SHEET"** — and the other two were rejected on stated grounds rather than merged. A **provisional** visual language was defined to the minimum needed for a proof, and **four bounded visual slices were rendered at WIDE and NARROW** as self-contained static HTML in `docs/17-visual-validation/prototype/`: the homepage hero, the evidence apparatus, F1 "the run" (FULL + STATE on one instance), and the `/seo` boundary-and-measurement section pair. **Eight canonical artefacts exist in `docs/17-visual-validation/`.**

**What was verified in a browser rather than asserted:** WCAG contrast computed from the palette (ink 15.86:1; **apparatus register 8.77:1, AAA**; accent 6.58:1) · no horizontal body scroll at 1400px, 900px or 390px · the apparatus margin collapsing inline at MEDIUM with DOM order unchanged · a visible focus indicator · body 18px / apparatus 16px / tabular lining numerals active · greyscale distinction between a **measured zero** and a **not-testable** state · and that every page is **script-free**, so no disclosure can render inert.

**The two Gate-9B-deferred perceptual tests were re-run against rendered screens, and neither was passed automatically. F2 (first fixation) passes on every dense screen and FAILS on sparse screens**, where an apparatus register label becomes the heaviest element by default; a narrow correction is proposed and **not applied**. **F3 (proportion) is NOT PASSED:** on the limit-heaviest section on the site, capability wins on emphasis-weighted measure 51.9% to 48.1% and loses on raw rendered area 37.5% to 62.5% — **the two reasonable measures disagree, and the programme has not defined which governs.** Both remain mandatory Gate 10 re-tests. **F3 is the principal reason this session does not return A.**

**Scope discipline held.** No production page, component, style, asset or configuration was created or modified; the prototype is self-contained and imported by nothing. **No approved artefact was altered** — `DECISION_LOG.md`, `QUALITY_GATES.md`, all of `docs/16-ux/`, all of `docs/11-creative/`, approved messaging, approved copy, strategy and IA are unchanged. **Nothing was invented:** every claim, limit, date, sample and finding rendered is approved copy or first-party measurement already in this repository, and **no photography, metric, proportion, testimonial, logo or client result appears anywhere.** **`F17` remains BLOCKED and was not designed, sketched, prototyped or placeholdered.** **Two items are REPORTED, not fixed:** the hero action-weighting wording difference between the Session 14 brief and approved wireframe `31`/`21` H1, and the AI-system enumeration precision item ("four AI assistants" in approved copy versus 28 runs across five surfaces and "six named systems" in the research baseline) — **the second must be resolved in writing before F3, the figure, can be designed.** **The `changed` state pair (F7) was deliberately not visually validated**, because the asset is blocked and rendering an "after" condition would have fabricated it. **Nothing was staged, committed or pushed; README.md remains untouched and untracked.** Full record: `docs/00-project/handoffs/SESSION_14_VISUAL_VALIDATION.md`.

**Prior record, preserved — SESSION 13 — GATE 9B FORMAL APPROVAL — COMPLETE (2026-09-02). GATE 9B — UX: PASSED.** Recorded as `DEC-016` in `DECISION_LOG.md`. The orchestrator reviewed the narrow-closure assessment below and formally approved Gate 9B at: **48 PASS · 0 PARTIAL · 0 FAIL · 3 NOT ASSESSABLE** across the 51 criteria in `docs/16-ux/20_GATE_9B_QUALITY_GATE.md`; **durable criteria 6 PASS · 0 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE**. **The three NOT ASSESSABLE items are explicitly non-blocking:** B6 (`/pricing` self-placement) is owner-blocked, not a UX defect; F2 (first-fixation) and F3's perceptual/visual-weight portion are perceptual tests requiring a rendered visual hierarchy and are **mandatory re-tests carried forward to Gate 10**. **This approval does NOT approve high-fidelity visual design** — no layout, grid, type, colour, spacing, component, style frame, mockup or prototype exists or is approved. `F17` (`/how-it-works` stage figure) **remains BLOCKED**. `/pricing`'s commercial facts remain owner-blocked and none was invented.

**Next intended phase: BOUNDED VISUAL VALIDATION OF THE APPROVED CREATIVE TERRITORY — "THE RECORD."** Not unrestricted high-fidelity production. Purpose: prove that the approved creative rule *"emphasis is commercial, presence is evidential"* can be rendered successfully, without academic/archive drift, SaaS drift, or generic-agency drift. **The visual solution itself is not yet defined or approved** — that is the work of the next phase, not a conclusion reached here.

**Prior record, preserved — SESSION 13 — GATE 9B FINAL NARROW CLOSURE — COMPLETE (2026-09-02). GATE 9B — UX: NOT PASSED (superseded by `DEC-016` above).** Following the targeted remediation pass below, the orchestrator issued six narrow rulings resolving the remaining four PARTIAL and one NOT ASSESSABLE items in `51_GATE_9B_FINAL_ASSESSMENT.md`, and a closure pass applied them. **No redesign, no re-authoring, no reopened strategy and no general UX audit occurred.** A3 and A5 recompute to PASS (rulings 1–2: DEFERRED is a scheduling term, not a fourth disclosure state; a first-screen check action is not required). B6 recomputes to NOT ASSESSABLE / owner-blocked, not PARTIAL (ruling 3) — the gap is a missing owner-approved commercial fact, not a UX defect, and does not block the gate. F3 recomputes to NOT ASSESSABLE AT GATE 9B (ruling 4) — its structural portion (count/order) PASSES; its perceptual portion (visual weight) defers to a mandatory Gate 10 re-test. F2's NOT ASSESSABLE disposition is confirmed non-blocking with a mandatory Gate 10 re-test (ruling 5). The durable "usable at target breakpoints" criterion recomputes to PASS (ruling 6): all six master types in `48` demonstrate NARROW/MEDIUM/WIDE, and numeric breakpoints remain a deliberately deferred Gate 10 output. **Recomputed totals: 48 PASS · 0 PARTIAL · 0 FAIL · 3 NOT ASSESSABLE across the 51 criteria; durable criteria 6 PASS · 0 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE.** Every remaining NOT ASSESSABLE item is, by explicit ruling, non-blocking for Gate 9B. Minimum documentation clarifications were made to `40_WIREFRAME_VARIANT_PRICING.md` and `50_CROSS_PAGE_WIREFRAME_AUDIT.md` so DEFERRED reads as apparatus scheduling rather than a fourth evidence-disclosure state; no other file in `30`–`49` was edited. **Nothing was staged or committed; `DECISION_LOG.md` and `QUALITY_GATES.md` were not modified; README.md remains untouched; Gate 9B status is not changed to PASSED — Claude does not pass gates.**

**Prior record, preserved — SESSION 13 — GATE 9B TARGETED REMEDIATION AND RE-ASSESSMENT — COMPLETE (2026-09-02). GATE 9B — UX: NOT PASSED.** A cold second-reader audit of the Gate 9B completion pass found substantive and documentation defects, and a targeted remediation pass was run on orchestrator instruction. **The UX architecture was not redesigned and no approved strategy, messaging, CRO, creative direction, IA, content strategy or conversion architecture was reopened.**

**Four orchestrator rulings applied, each resolving a contradiction between two approved statements:** **A** — on `/ai-seo`, evidence comes **before** the boundary; `docs/16-ux/05_COMMERCIAL_PAGE_UX.md` §4.2 controls, and the contradicting sequence row in `23` §3 was corrected. **B** — Gate criterion **E9's** prohibition on wireframes is superseded by the 27/28 scope reconciliation; E9 was narrowly amended so it cannot fail the gate for producing what the gate requires. **C** — `/social-media-ads` is **F1 = NONE**; the stale pre-taxonomy sentence in `05` §4.4 was corrected and **no run was introduced**. **D** — `/how-it-works` keeps the F1 class stated in `22`; `35`'s conflicting declaration was corrected **without inventing F17 and without unblocking the route**.

**Substantive corrections.** The **commercial master (`32`) was re-authored to the approved nine message moves** — move 3 is the buyer's actual problem, move 6 is how the work is measured, move 7 is evidence in context, and the move-7 compression rule is no longer misapplied to move 3; `/seo`'s **12-month-plus horizon** differentiator is restored and elevated at move 5; invariants are separated from intent-driven variation, and the four approved variation drivers are stated in words rather than cited by code. Consequential corrections followed in `37`, `38`, `39` and `42`, **without normalising the pages** — their differing move sets and boundary positions survive. **Blocked-slot notation was removed from eight artboards** and replaced with margin tables (`26` §5, `30` §4.1 convention added). A **focus state** and the **analytics/privacy contract** (no PII; no qualification/spam/review state on any client-visible channel) were added to `43`. A **no-JavaScript state** was added to `45`, prohibiting a rendered-but-inert disclosure control. The **breadcrumb model, the non-sticky header default and the no-CTA constraint on the sticky experiment** were carried onto `46`. **`48` was rebuilt to demonstrate NARROW / MEDIUM / WIDE for all six master types**, including the previously missing index-at-narrow case, with an eleven-point verification.

**`50` was re-run from the corrected artefacts and three previously-false PASS claims were corrected** — the uniform "exactly 2 `[ACT]` objects" claim, the blanket "no apparatus above any fold" claim (B27 is scoped to commercial pages; long-form and index carry IMMEDIATE first-screen apparatus **by requirement**), and a sequence-agreement claim whose stated evidence did not match the approved move order. Four fixes were applied and two findings plus one open item are carried.

**`51` was rebuilt and does not inherit the previous PASS distribution.** All **51** criteria in `20_GATE_9B_QUALITY_GATE.md` (A1–A8, B1–B9, C1–C7, D1–D8, E1–E10, F1–F9) are individually assessed: **46 PASS · 4 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE.** The durable criteria recompute to **5 PASS · 1 PARTIAL · 1 NOT ASSESSABLE**. The open items are an orchestrator decision (`40`'s DEFERRED apparatus state, absent from `10`'s three-state model), an approved consequence (`24`'s unspent first-screen exception), an owner blocker (`/pricing` values), and two Gate 10 perceptual re-tests (first-fixation, proportion). **The UX pattern inventory remains at exactly 16 entries.** **Nothing was staged or committed; `DECISION_LOG.md` and `QUALITY_GATES.md` were not modified; no production code, component, style, asset, test or configuration was touched.**

**GATE 9B REMAINS NOT PASSED. Claude does not pass gates. The artefacts are ready for orchestrator review.**

**Prior record, preserved — SESSION 13 — UX ARCHITECTURE + LOW-FIDELITY WIREFRAMES — READY FOR ORCHESTRATOR GATE REVIEW (2026-09-02). GATE 9B — UX: NOT PASSED.** A Gate 9B completion pass ran 2026-09-02, after the UX architecture was substantively approved and after the orchestrator correction/gate-scope reconciliation pass (below). It produced the remaining Gate 9B deliverables identified in `docs/16-ux/27_GATE_9B_SCOPE_RECONCILIATION.md` §4: **22 new artifacts in `docs/16-ux/` (files `30`–`51`)** — a shared wireframe legend, 24 low-fidelity structural wireframes (6 masters, 6 variants, 5 states, 7 mobile structural artefacts), a 16-entry UX pattern inventory (`49_UX_PATTERN_INVENTORY.md`), a cross-page consistency check (`50_CROSS_PAGE_WIREFRAME_AUDIT.md` — *this claim was **corrected 2026-09-02** by the remediation pass: three of its PASS statements were false as written, four fixes were required, and two findings plus one open item are now carried. See the Current Phase section above*), and a final Gate 9B assessment against the durable criteria in `QUALITY_GATES.md` (`51_GATE_9B_FINAL_ASSESSMENT.md` — *this claim was **corrected 2026-09-02**: the assessment gave file-level verdicts and did not assess the gate's 51 criteria at all. It has been rebuilt to 46 PASS / 4 PARTIAL / 0 FAIL / 1 NOT ASSESSABLE across all 51*). **Two orchestrator decisions were applied per this pass's instruction:** H1's scope extended to commercial pages — primary enquiry action routes to `/contact` sitewide, no inline form on commercial pages — and Gate 9B structural validation resolved to width classes **NARROW/MEDIUM/WIDE**, no pixel breakpoints. **Final recommendation recorded: "GATE 9B READY FOR ORCHESTRATOR REVIEW."** Gate 9B remains **NOT PASSED** — Claude has no authority to pass a gate. No visual design, no colour, no typography, no numeric breakpoint, no component implementation and no code was produced; F17 remains BLOCKED and does not appear in any wireframe. Full record: `docs/00-project/handoffs/SESSION_13_UX_ARCHITECTURE.md`, appended section "Gate 9B Completion Pass".

**Prior record, preserved — SESSION 13 — UX ARCHITECTURE: SUBSTANTIVELY APPROVED BY THE ORCHESTRATOR (2026-09-02). GATE 9B — UX: NOT PASSED.** An orchestrator correction / gate-scope reconciliation pass was run on 2026-09-02. **The UX architecture is substantively approved; Gate 9B cannot pass because the durable gate definition requires low-fidelity wireframes and a component/pattern inventory, and neither exists.** `docs/00-project/QUALITY_GATES.md` was inspected read-only and **was NOT modified — the gate is not reinterpreted, not narrowed and not weakened.**

**Decisions recorded (H1–H5), in `docs/16-ux/21_ORCHESTRATOR_DECISIONS_H1_H5.md`:** **H1** the homepage primary enquiry action routes to `/contact`, no inline form *(its extension to commercial pages is flagged as Claude's reading, for confirmation)* · **H2** the header CTA routes to the enquiry/contact surface, with no form or booking in navigation and no aggressive persistent control · **H3** non-sticky is the default, with one scoped wireframe experiment — orientation only, **carrying no CTA**, on long commercial pages · **H4** **B16 takes precedence over R7: direct contact is available, not omnipresent**, one instance per page outside the two conversion surfaces · **H5** the problem-page recording affordance is **NOT APPROVED for launch** — the diagnostic ships static, ungated and printable; **Phase 2 / research-required only**. **`DECISION_LOG.md` was not modified** — recording these there is an orchestrator action.

**Architectural risks resolved in the same pass:** a **binding F1 usage taxonomy** (FULL / PARTIAL / STATE / **NONE as the default**) reduces the run from **8 routes to 6, of which only 3 carry the full figure** — `/ai-seo`, `/google-ads` and `/social-media-ads` reclassified to NONE — which materially reduces the B24 ambient-branding risk · a **six-page commercial differentiation stress test** finds **no two pages sharing a UX sequence**, and produces two fixes · the **homepage first-screen apparatus exception is defined against seven criteria and found to have no qualifying occupant at launch**, so the homepage opens with **zero apparatus above the fold**, the Gate 9A exception **preserved and unspent** until the own-site diagnostic publishes · `/contact` and `/schedule-call` **separated** so they cannot become duplicate conversion pages · `/thank-you` routing **defined by conversion type**, with the booking variant carrying **no link at all** · the owner-blocked structure rule **sharpened into a three-way test — case 0 / A / B, with no case C** and omission strongly preferred.

**Remaining Gate 9B work:** low-fidelity structural wireframes *(a 24-artefact set — 6 masters, 6 variants, 5 states, 7 mobile)* · the **UX component/pattern inventory** *(16 entries against twelve fields; the existing 11 patterns are necessary but not sufficient — three are missing)* · a cross-page wireframe consistency check · mobile structural validation · final Gate 9B validation against the durable criteria. **One item requires an orchestrator answer first:** the acceptance criterion *"usable at target breakpoints"* depends on breakpoint values that are a **Gate 10** artifact; **the proposed resolution is that Gate 9B validates at structural width classes — narrow / medium / wide.**

**29 artifacts exist in `docs/16-ux/`.** **No visual design has started. No wireframe, layout, mockup, style frame, grid, breakpoint, type value, colour value or component was produced. F17 remains BLOCKED — nothing was produced for it.** No production code, configuration, content or asset was changed; production source was not read. No passed gate was altered.

**Original Session 13 record, preserved:** **SESSION 13 — UX ARCHITECTURE: PROPOSED / AWAITING ORCHESTRATOR REVIEW (2026-09-01).** Session 13 translated the approved business strategy, IA, CRO system, content strategy, messaging, page copy and creative direction into a UX architecture: seven user journeys, seventeen page types, the homepage UX, the commercial-page system, the problem-page UX, navigation, the CTA system, form/booking/thank-you UX, evidence interaction, Tier 1 figure UX, responsive/accessibility/performance requirements, the page structure matrix, eleven reusable patterns, twenty UX anti-patterns, the owner-blocker register and a proposed Gate 9B. **Twenty artifacts exist in `docs/16-ux/`, which did not exist before this session and was created empty — nothing was overwritten.** **Gate 9B (UX) is NOT PASSED.** No wireframe, layout, mockup, style frame, grid, breakpoint, type value, colour value or component specification was produced, and **no visual design has started**. No production code, configuration, content or asset was changed; production source was not read. No approved upstream document was modified, and no passed gate was altered. **F17 remains BLOCKED — nothing was produced for it.** Six decisions require orchestrator approval, including the scope of Gate 9B itself, whose existing definition asks for wireframes and a component inventory that the Session 13 brief prohibited. Handoff: `docs/00-project/handoffs/SESSION_13_UX_ARCHITECTURE.md`.

**Documentation-Directory Hygiene Reconciliation Completed (2026-09-01) — repository housekeeping only, no gate touched.** Executed the `DEC-015` future-housekeeping decision exactly: `docs/08-design/` retired (removed — the single placeholder README carried no substantive content); `docs/11-schema/` moved to `docs/15-schema/`, contents unchanged; `docs/11-creative/` and `docs/08-messaging/` left untouched. No strategy, creative direction, copy, IA, CRO or production code was changed. **Gate 9A remains PASSED; Gate 9B (UX) remains NOT STARTED** — this reconciliation satisfies Gate 9A's precondition for Gate 9B but does not itself begin Gate 9B.

**Session 12 Completed — CREATIVE / ART DIRECTION, including an orchestrator correction / stress-test pass on T1 (2026-09-01). The approved creative territory is **T1 "The Record" — a WORKING record, not an archive** — a firm that finds what is broken, fixes it, and records what changed. Twenty artifacts exist in `docs/11-creative/`. Quality Gate 9A (Creative Direction) is PASSED (2026-09-01; `DEC-015`). No page layout, wireframe, design system, component, final font or final colour value was produced — Gate 9B (UX) has not started. No production code, configuration, content or asset was changed. One explicitly authorised narrow correction was made to previously approved Session 11 homepage/`/services` copy (an unsupported quantity claim); the H1 and hero territory are unchanged. The documentation-directory hygiene reconciliation this gate required before Gate 9B was completed 2026-09-01 as a standalone change — see above.**
**Session 11 Completed — PAGE COPY PRODUCTION, including a second-reader / orchestrator correction pass (2026-09-01). Quality Gate 9 (Page Copy Production) is PASSED (2026-09-01; `DEC-014`). Gate approval is NOT publication readiness for every route — the documented PARTIALLY BLOCKED, BLOCKED and CONDITIONAL statuses are unchanged. No design was done, no production code, configuration or content was changed, and no prior gate decision was altered. Creative / Art Direction is the next intended substantive phase and has not begun.**
**Session 10 Completed — MESSAGING ARCHITECTURE, including a narrow orchestrator correction pass (2026-09-01). Quality Gate 8 (Messaging Architecture) is PASSED (2026-09-01; `DEC-013`). No page copy was written, no design was done, and no production code was changed.**
**Gates 5, 6 and 7 PASSED — 2026-09-01 (orchestrator approval, `DEC-010`/`DEC-011`/`DEC-012`). No visual design or production implementation has started as a result of these approvals.**
**Session 09 Completed — CONTENT STRATEGY & LAUNCH CONTENT ARCHITECTURE. Quality Gate 7 PASSED (2026-09-01).**
**Session 08 Completed — CRO & QUALIFIED-ENQUIRY FUNNEL SPECIFIED. Quality Gate 6 PASSED (2026-09-01).**
**Session 07 Completed — WEBSITE IA & SEARCH ARCHITECTURE. Quality Gate 5 PASSED (2026-09-01).**
**Session 06 Completed — BUSINESS STRATEGY GATE PASSED. Business strategy documents FROZEN.**

**Historical note, preserved:** at the time each of Sessions 07, 08 and 09 completed, its gate was open/not passed pending orchestrator and owner review — recorded accurately in the programme-status table and handoffs below. Gates 5, 6 and 7 were subsequently reviewed and approved by the orchestrator on 2026-09-01. The historical "OPEN" / "NOT PASSED" language elsewhere in this file describes that earlier state and is not rewritten; this section states the current state.

**The owner has approved the fundamental business direction.** Recorded as `DEC-005` in `DECISION_LOG.md`:

> **MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries.**

This is an **APPROVED DECISION**. It supersedes the previous working hypotheses where they conflict, and it is not to be reopened.

### Programme status
| Phase | Status |
|---|---|
| Session 01 + 01B — existing site/codebase audit | Complete (2026-08-31). Artifacts delivered |
| Session 02 — business, category and competitive validation | **Research complete** (2026-08-31) |
| Session 03 — search demand, SERP and commercial opportunity validation | **Research complete** (2026-08-31) |
| Session 04 — AI visibility, citation and discovery baseline | **Research complete** (2026-08-31) |
| Session 05 — final strategic synthesis | **Complete** (2026-08-31). `docs/01-business/FINAL_STRATEGY_SYNTHESIS.md`, preserved unmodified as the pre-approval record |
| **Owner fundamental strategy approval** | **COMPLETE** (2026-08-31) |
| **Session 06 — business strategy freeze** | **COMPLETE** (2026-08-31). Five business documents rewritten together in one pass |
| **Quality Gate 2 — business / market validation** | **PASSED** (2026-08-31) |
| **Session 07 — website IA, search architecture & page system** | **COMPLETE** (2026-08-31). Architecture **APPROVED — Gate 5 PASSED 2026-09-01 (`DEC-010`)** |
| **Quality Gate 5 — information architecture** | **PASSED — 2026-09-01.** See `DEC-010` |
| **Session 08 — CRO & qualified-enquiry funnel specification** | **COMPLETE** (2026-08-31). **APPROVED — Gate 6 PASSED 2026-09-01 (`DEC-011`)** |
| **Quality Gate 6 — CRO architecture** | **PASSED — 2026-09-01.** See `DEC-011` |
| **Session 09 — content strategy & launch content architecture** | **COMPLETE** (2026-09-01), including a narrow orchestrator correction pass. **APPROVED — Gate 7 PASSED 2026-09-01 (`DEC-012`)** |
| **Quality Gate 7 — content architecture** | **PASSED — 2026-09-01.** See `DEC-012` |
| **Session 10 — messaging architecture** | **COMPLETE** (2026-09-01), including a narrow orchestrator correction pass. **APPROVED — Gate 8 PASSED 2026-09-01 (`DEC-013`).** No page copy, no design, no production code |
| **Quality Gate 8 — messaging architecture** | **PASSED — 2026-09-01.** See `DEC-013` |
| **Session 11 — page copy production** | **COMPLETE** (2026-09-01), including a second-reader correction pass. **APPROVED — Gate 9 PASSED 2026-09-01 (`DEC-014`).** 18 page-copy files plus one conditional record; **7 routes with copy APPROVED (not automatically publication-ready), 8 PARTIALLY BLOCKED, 1 BLOCKED, 3 CONDITIONAL** |
| **Quality Gate 9 — page copy production** | **PASSED — 2026-09-01.** See `DEC-014`. Approval does not upgrade any route's blocked/partially-blocked/conditional status |
| **Session 12 — Creative / Art Direction** | **COMPLETE** (2026-09-01), including an orchestrator correction / stress-test pass on T1. **APPROVED — Gate 9A PASSED 2026-09-01 (`DEC-015`).** **20 artifacts** in `docs/11-creative/`; 4 territories developed and scored against 20 criteria; **T1 "The Record" APPROVED**, refined to 92/100. No UX, no layout, no design system, no implementation |
| **Quality Gate 9A — creative direction** | **PASSED — 2026-09-01.** See `DEC-015`. Gate at `docs/11-creative/15_CREATIVE_DIRECTION_QUALITY_GATE.md` |
| **Documentation-directory hygiene reconciliation** | **COMPLETE (2026-09-01).** `docs/08-design/` retired (removed); `docs/11-schema/` moved to `docs/15-schema/`, contents unchanged; `docs/11-creative/` and `docs/08-messaging/` untouched. Approved as `DEC-015` future housekeeping; executed as a standalone change, no new decision-log entry required |
| **Session 13 — UX architecture** | **COMPLETE (2026-09-01), plus an orchestrator correction / gate-scope reconciliation pass, a Gate 9B completion pass, a remediation/re-assessment pass, a narrow closure pass and formal approval (2026-09-02). GATE 9B — UX: PASSED (`DEC-016`).** **51 artifacts** in `docs/16-ux/`; 7 journeys, 17 page types, the page structure matrix, 11+3 reusable patterns + 2 regions (16 total), 20 UX anti-patterns, the H1–H5 decisions, a binding F1 usage taxonomy, the commercial differentiation stress test, the Gate 9B scope reconciliation, **24 low-fidelity structural wireframes, the 16-entry UX pattern inventory, the cross-page consistency check, and the final Gate 9B assessment**. No colour, typography, breakpoint, component implementation or code. **F17 still BLOCKED** |
| **Gate 9B — UX** | **PASSED — 2026-09-02.** See `DEC-016`. Across the 51 criteria in `docs/16-ux/20_GATE_9B_QUALITY_GATE.md`: **48 PASS · 0 PARTIAL · 0 FAIL · 3 NOT ASSESSABLE**; durable criteria **6 PASS · 0 PARTIAL · 0 FAIL · 1 NOT ASSESSABLE**. Every NOT ASSESSABLE item (B6 owner-blocked; F2 and F3's perceptual portions deferred to Gate 10) is explicitly ruled non-blocking. All five deliverables A–E (`docs/16-ux/27_GATE_9B_SCOPE_RECONCILIATION.md` §4) are complete: low-fidelity structural wireframes (`31`–`48`, with the shared legend at `30`) · the UX pattern inventory (`49`) · the cross-page consistency check (`50`) · mobile structural validation (`48` M1–M7) · final validation against the durable criteria (`51`). **The gate was not weakened.** This approval does **not** approve high-fidelity visual design; `F17` remains BLOCKED |
| **Session 16 — THE ARRIVAL frozen + design system** | **COMPLETE (2026-09-03). RESULT: THE ARRIVAL DESIGN SYSTEM READY FOR ORCHESTRATOR REVIEW.** **Owner approved THE ARRIVAL as the visual direction (`DEC-017`): "Yes, 15D is clearly better." Creative-direction exploration is closed.** 15D re-verified and unchanged. Direction frozen with a binding/flexible split; **the motion budget is now binding as maximums**, closing the gap Sessions 14A, 15B and 15C left open. 17-document design system in `docs/22-design-system/`, including signal semantics for all eight states and a binding anti-pattern register. **Homepage readiness: sufficient, with five named gaps — F1 has never been drawn in these materials.** `QUALITY_GATES.md` shows **Gate 10 NOT PASSED, IN PROGRESS**; F2/F3 re-tests still mandatory. No production change; all superseded explorations retained as history |
| **Session 15D — creative convergence reversal (A + B sophistication)** | **COMPLETE (2026-09-03). RESULT: A-FOUNDATION CONVERGENCE READY FOR OWNER REVIEW.** Owner verdict recorded and binding: **"Option A was much better than option B"** — **Session 15C is superseded and was not defended.** **Direction A is now the visual foundation; B contributes principles only.** One prototype in `docs/21-creative-convergence-a/` — **"THE ARRIVAL"**: demand as light crossing a dark plane, a few arrivals caught and named on a ledger. AI/tech drift solved by art direction (espresso world, one amber accent, zero monospace, a banded field with a horizon). **The motion budget is now stated as numbers** — the gap Sessions 14A, 15B and 15C all left open. 0 contrast failures and no overflow at either width; twelve defects found by inspection and fixed. **No design system built, no homepage designed.** Original A, original B and 15C preserved and openable side by side. No production change; no approved artefact altered; nothing invented. **APPROVED BY THE OWNER 2026-09-03 as the visual direction for MappedSkills — see `DEC-017`** |
| **Session 15C — creative convergence (B + A energy)** | **COMPLETE (2026-09-02). RESULT: CONVERGENCE PROTOTYPE READY FOR OWNER REVIEW.** Owner decision recorded and binding: **B is the foundation, A supplies energy.** One convergence prototype built in `docs/20-creative-convergence/` — **"THE RESOLVE"**: the same population of marks, resolved from anonymous traffic into named enquiries, reused across hero, capture/convert/measure, the argument, the evidence and the CTA. Static-quality, vibrancy and document tests all pass; 0 contrast failures and no overflow at either width; ten defects found by inspection and fixed. **No design system built, no homepage designed, no direction merged into a collage.** Original B preserved unchanged for comparison. No production change; no approved artefact altered; nothing invented |
| **Session 15B — digital creative reset** | **COMPLETE (2026-09-02). RESULT: THREE DIGITAL DIRECTIONS READY FOR OWNER REVIEW.** The owner rejected the Session 15 homepage as reading like a document/journal/textbook; that verdict is binding and overrides Session 15's internal drift finding. **Direction 2 is no longer binding as the sitewide visual treatment**; THE RECORD is redefined as a credibility system rather than a visual genre. Three browser-rendered directions with working motion produced in `docs/19-creative-reset/`. Recommendation stated (B); **no direction chosen, no design system built, no hybrid created**. Session 15 preserved unchanged as the negative reference. No production change; no approved artefact altered; nothing invented. **SUPERSEDED 2026-09-03 by the owner verdict in Session 15D: A, not B, is the visual foundation. The 15C prototype is retained for comparison only** |
| **Session 15 — design-system foundation + complete homepage** | **COMPLETE (2026-09-02). RESULT: A — HOMEPAGE DESIGN READY FOR ORCHESTRATOR REVIEW**, subject to `docs/18-design-system/07_OPEN_DESIGN_RISKS.md`. The complete approved homepage designed and rendered at WIDE and NARROW, plus a design-system foundation. **F2 PASS and F3 PASS at both widths** against the Session 14A rubric applied unchanged. No material drift; every device budget met and none exceeded; no accessibility blocker found in what was tested. Nine defects found by rendering and fixed. No production change; no approved artefact altered; `docs/17-visual-validation/` unchanged; nothing invented. **SUPERSEDED 2026-09-02 by the owner verdict in Session 15B: the homepage design is NOT APPROVED and Direction 2 is no longer the sitewide visual treatment. The artefacts are retained as the negative reference** |
| **Session 14A — narrow visual closure** | **COMPLETE (2026-09-02). RESULT: A — VISUAL TERRITORY READY FOR DESIGN-SYSTEM DEVELOPMENT**, subject to `11_SESSION_14A_CLOSURE_ASSESSMENT.md` §5; supersedes Session 14&rsquo;s B. Register-label rule defined and applied; **visual weight defined at programme level** (structural area vs perceptual emphasis, no numeric thresholds, written before the test page); **a complete /seo page rendered and F2 and F3 re-run — both PASS at WIDE and NARROW**. Three defects found by rendering and fixed. No production change; no approved artefact altered; nothing invented |
| **Session 14 — bounded visual validation of "THE RECORD"** | **COMPLETE (2026-09-02). RESULT: B — PROMISING, NARROW CORRECTIONS REQUIRED.** 8 artefacts in `docs/17-visual-validation/` plus a self-contained static prototype. Three directions explored, **one selected** (Direction 2, "THE WORKING SHEET"), four bounded slices rendered at WIDE and NARROW. **F2 re-run: passes on dense screens, fails on sparse ones. F3 re-run: NOT PASSED** — the two reasonable measures of visual weight disagree and the programme has not defined which governs. No production change; no approved artefact altered; nothing invented; `F17` still BLOCKED |
| **Gate 10 — UI / design system** | **NOT PASSED, NOT APPROACHED.** Sessions 14 and 14A selected a direction and validated it against four slices and one complete page. **No design system was produced and none is approved.** The Gate-9B-deferred re-tests **F2 and F3 now PASS on the complete `/seo` page** (`10_COMPLETE_PAGE_PROOF.md`) and **must be re-run on the complete homepage**, which has not been built, using `09_VISUAL_WEIGHT_RUBRIC.md` unchanged | **Session 15 added a design-system foundation and one complete homepage, both PROPOSED; the gate remains NOT PASSED and Claude does not pass gates.**
| Technical prerequisites the funnel and the content programme both depend on, plus the research and editorial assets not produced in Session 11 | **NOT STARTED.** Constrained: `/how-it-works`, `/about`, `/contact` and `/pricing` remain owner-blocked; the AI-visibility research entry and the problem page are not |

**Research is CLOSED for the business-strategy phase.** No further business-direction research is commissioned by this state.

### What is authoritative now
`docs/01-business/BUSINESS_STRATEGY.md` is the **primary strategic source of truth**. Alongside it, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md` and `OFFER_ARCHITECTURE.md` are approved and frozen (`DEC-006`).

Any session touching IA, search architecture, content, CRO, design, copy or development must read those five documents. The research artifacts remain intact as evidence and history; **they are no longer the strategic instruction.**

### Gates not passed
Gates 1, 3 and 4 artifacts were delivered and their conclusions were consumed by the approved strategy, but **Session 06 did not mark them passed** — that remains an orchestrator action.

**Gates 5, 6 and 7 are PASSED — 2026-09-01**, recorded as `DEC-010`, `DEC-011` and `DEC-012`. **Gates 8, 9, 9A and 9B are PASSED**, recorded as `DEC-013`, `DEC-014`, `DEC-015` and `DEC-016`. **Gate 10 is PASSED — 2026-09-04**, recorded as `DEC-019`. **No gate from 11 onwards is passed, approached or implied.**

## Production Website
**OWNER-SUPPLIED FACT:** the production website visitors use is **`https://mappedskills.com`**.

**VERIFIED FACT (live, 2026-08-31):** corroborated in production — the homepage canonical is `https://mappedskills.com/` and all 15 sitemap URLs use that host. `http://` redirects to `https://` (301) and HSTS is present. The `ms.mappedskills.com` reference in `doc/cpanel-deploy.md` is a repository/deployment artifact requiring explanation later, **not** an open question about the canonical production site.

**VERIFIED FACT (live):** the production edge is `Server: LiteSpeed` with HTTP/2 and HTTP/3, running Next.js behind it. Server-side ISR is functioning.

## Current Approved Business Direction
**APPROVED DECISION (`DEC-005`, 2026-08-31).**

> **MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries.**

- **Primary outcome:** measurable qualified enquiries. Revenue is measured, attributed where possible and reported — **never promised**.
- **Primary buyer:** considered-purchase businesses where each qualified opportunity has meaningful economic value, and which already have or can reasonably access market demand.
- **Core spearhead:** capture existing buyer/search demand and turn it into enquiries. Search is the strongest acquisition spearhead; **the company is not an SEO agency**.
- **AI Search:** highly visible supporting capability and differentiator — **not the company category**. No universal "AI Visibility Score" as the core proposition.
- **Conversion:** integrated into the core delivery system, in buyer/business language rather than the acronym "CRO".
- **Measurement:** a mandatory foundation of the operating model.
- **Paid media:** retained as a capability, removed from company-level positioning. **Existing paid-media URLs are not removed for positioning reasons.**
- **Automation:** limited downstream expansion capability only.
- **Vertical strategy:** horizontal proposition with vertical beachheads. **Manufacturing / industrial B2B is candidate vertical beachhead #1 — not approved exclusive specialisation.**
- **Geography:** India-first. No international SEO or location strategy yet.
- **Rejected company-level positioning:** full-service digital marketing agency · generic performance marketing agency · SEO agency · GEO/AEO/LLMO agency · marketing automation agency · RevOps consultancy · AI visibility dashboard company.

Full detail in `docs/01-business/BUSINESS_STRATEGY.md`. Full principle list in `DECISION_LOG.md` `DEC-005`.

### Superseded
The **three-pillar hypothesis** (AI + Search Visibility / CRO / Marketing Automation), the journey **"GET FOUND → CONVERT → AUTOMATE → GROW"** as a strategic structure, and the candidate line **"Get Found. Convert More. Automate Growth."** are **SUPERSEDED** and must not be reintroduced. `DEC-004` is closed as **never approved / not adopted**. The research that closed it is preserved unaltered.

## Current Positioning Status
**APPROVED at strategic level; NOT approved at copy level.**

The approved strategic sentence in the section above is a **foundation, not a headline**. **No final homepage copy, tagline, headline or page-level messaging exists or is approved.** Later messaging work may find a sharper buyer-facing articulation; the underlying meaning must be preserved.

Language rules that all later copy must obey are in `docs/01-business/POSITIONING.md` §5 and §9.

## Current Site Facts
**OWNER-SUPPLIED FACTS:**
- MappedSkills has an existing website.
- Current stack includes Next.js and Node.
- Existing pages and functionality should not be casually restructured.
- The owner wants a major visual/UI/UX transformation while protecting existing functionality and SEO value.

### Owner-Supplied Facts Added 2026-08-31 (Session 02)
**OWNER-SUPPLIED FACT:** The existing MappedSkills website contact form has not been generating enquiries for the owner.

**OWNER-SUPPLIED FACT:** There are no existing MappedSkills blog articles or case-study assets inside Contentful that must be preserved for the transformation.

*(Recorded verbatim. No further inference is drawn from these statements in this section. Their bearing on Session 01/01B critical findings C1 and C8 is noted where those findings are discussed, without extending beyond what the owner stated.)*

## Current Program Operating Model
- ChatGPT acts as program architect/orchestrator/reviewer.
- Claude acts as the execution team through bounded specialist roles.
- The owner runs Claude prompts and returns outputs for review.
- Claude sessions should be changed deliberately to control context and token use.
- Repository documents are the durable source of truth.

## Session 01 / 01B Artifacts (created 2026-08-31)
- `docs/10-technical/CURRENT_CODEBASE_AUDIT.md`
- `docs/10-technical/CURRENT_ROUTE_INVENTORY.md`
- `docs/10-technical/CURRENT_INTEGRATIONS.md`
- `docs/10-technical/CURRENT_SEO_IMPLEMENTATION.md`
- `docs/00-project/handoffs/SESSION_01_CODEBASE_AUDIT.md` (updated with the 01B verification record)

**Audit method limitation (VERIFIED FACT):** the audit was static file inspection only. `node_modules/` was not installed and the session was instructed not to install packages, so **no build, no lint, and no test was run**, and no page was loaded in a browser. The audit therefore contains no performance, Core Web Vitals, ranking, traffic, or conversion figures — none were available and none were estimated.

**Session 01B method limitation (VERIFIED FACT):** live verification was deliberately minimal — a small number of `curl` requests plus one browser session against ten URLs. **No crawler, no Lighthouse, no load testing, no form submission, no booking, no hosting-panel or environment-variable access, and no Contentful access.** Production environment-variable states noted below are **INFERENCES from observed behaviour**, not panel readings. No performance, ranking, traffic, or conversion figure was gathered in 01B either.

## Critical Findings — Status After Live Verification (Session 01B)
Recorded as state facts. Repository evidence in `CURRENT_CODEBASE_AUDIT.md` §21; live production evidence in §0 of the same file.

**Reclassification summary:** C1 PARTIALLY VERIFIED · C2 **CONFIRMED** · C3 **CLEARED as a live risk** (downgraded to latent) · C4 **CONFIRMED** · C5 **CLEARED** · C6 PARTIALLY VERIFIED (downgraded to pre-launch blocker). One finding was **escalated**: no analytics of any kind is running in production.

1. **VERIFIED FACT — the site has no backend.** There is no `app/api/` directory and no route handler anywhere. `components/forms/ContactForm.tsx` simulates submission with `setTimeout`; `components/forms/BlogNewsletterForm.tsx` does the same; a third form on `/blog` has no submit handler. **VERIFIED FACT (live):** the production `/contact` form has **no `action` and no `method`**, no CAPTCHA and no consent checkbox. **`DELIVERY NOT VERIFIED`** — no test enquiry was submitted, and lead capture is not inferred from the success UI. **Owner must confirm whether enquiries have been arriving at `info@mappedskills.com`.**
2. **VERIFIED FACT (live) — CONFIRMED.** `Cache-Control: public, max-age=31536000, immutable` is served on production HTML: `/`, `/seo`, `/contact`, `/schedule-call`, `/blog`. `/sitemap.xml` correctly receives `max-age=3600, must-revalidate`, proving the `.xml` branch of the override matches while extensionless HTML routes do not. Server-side ISR works, but browsers and intermediary caches are told not to revalidate HTML for a year.
3. **VERIFIED FACT (live) — RESOLVED.** `public/robots.txt` is the file production serves (static, LiteSpeed-served, bypassing Next.js); `app/robots.ts` is inert dead code. **`GPTBot` and `CCBot` are NOT blocked in production, and no AI-crawler directive of any kind is live.** The charter conflict is therefore **not currently active**. Residual latent risk: deleting `public/robots.txt` would silently activate the Next.js route's site-wide GPTBot/CCBot block.
4. **RESOLVED.** Production is `https://mappedskills.com` (owner-confirmed, live-corroborated). Migration planning is no longer blocked on this. **Residual Medium issue:** `https://www.mappedskills.com` returns 200 rather than redirecting to the apex, so the site is reachable on two hostnames — mitigated by the `www` response self-canonicalising to the apex.
5. **VERIFIED FACT — the five service landing pages and `/portfolio/[slug]` emit no structured data at all.**
6. **VERIFIED FACT — no consent management exists** while GTM and Meta Pixel load unconditionally. The site's own privacy policy states a banner is required before launch.
7. **VERIFIED FACT — no tests, no ESLint configuration, and `typescript.ignoreBuildErrors: true`.** There is no automated safety net for a redesign.
8. **VERIFIED FACT (live) — CONFIRMED, and this is the current production state.** `/blog` returns HTTP 200 rendering **"No articles found"** with zero article links; `/work` shows zero case studies; `/sitemap.xml` contains **exactly 15 static URLs and no CMS URLs**; the three blog slugs hard-coded in the 404 page all return **404**. **The production site currently publishes no blog articles and no case studies.** **UNKNOWN:** whether the cause is missing/invalid Contentful credentials or an empty Contentful space — the observable outcome is identical.

9. **VERIFIED FACT (live) — NEW, escalated.** **No analytics of any kind is running in production.** `window.dataLayer`, `window.gtag` and `window.fbq` are all undefined in a real browser, there is no GTM `<noscript>` iframe, and `/contact` loads zero third-party scripts. **INFERENCE:** `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` are unset in production. Consequences: **no analytics baseline exists for this site**, there is no GTM container configuration to protect during migration, and — because no tracking actually fires — the consent-management gap is a **pre-launch blocker rather than a live compliance breach**.

10. **VERIFIED FACT (live) — NEW.** **There is no working conversion path on the production site.** `/schedule-call` loads the Calendly script but the inline widget container renders **empty (0 children, zero iframes on the page)**; a misplaced badge bar appears at the top of the viewport instead. The pre-hydration HTML shows the "Calendly booking link is not configured yet" fallback, which is what non-JS crawlers see. Combined with a contact form that transmits nothing, **neither documented conversion path currently functions.**

## Stack Facts Confirmed (supersedes the prior OWNER-SUPPLIED summary)
**VERIFIED FACT:** Next.js 16.2.6 App Router, React 19, TypeScript 5.7.3, Tailwind CSS v4 (CSS-first, no `tailwind.config.js`), shadcn/ui + Radix, Contentful GraphQL CMS, custom `server.cjs` Node server, deployed by GitHub Actions over SSH to cPanel/Phusion Passenger. 22 routes. No API routes, no middleware, no Server Actions.

## Session 02 — Business, Category & Competitive Validation (completed 2026-08-31)

**Purpose:** challenge and validate the emerging business direction *before* website architecture begins. The session was explicitly instructed to look for evidence the hypothesis is wrong.

### Artifacts created
- `docs/02-research/MARKET_RESEARCH.md`
- `docs/02-research/COMPETITOR_RESEARCH.md`
- `docs/02-research/SOURCE_REGISTER.md`
- `docs/01-business/STRATEGIC_VALIDATION.md`
- `docs/00-project/handoffs/SESSION_02_STRATEGIC_VALIDATION.md`

### Research recommendation (NOT approved)
**RECOMMEND MODIFY CURRENT HYPOTHESIS.**

The customer journey **GET FOUND → CONVERT → AUTOMATE → GROW** survives. The spearhead framing, the three-pillar structure, and the assumed sources of defensibility do not. Five modifications are proposed in `STRATEGIC_VALIDATION.md` §13:
1. reframe the spearhead from a technique category to an outcome, deferring the category *term* to Session 03 buyer-language evidence;
2. promote CRO from third-listed value multiplier to co-lead inside the spearhead offer;
3. demote Marketing Automation from named pillar to expansion capability;
4. treat proof architecture as the gating constraint, ahead of positioning;
5. make a segment-narrowing decision a Gate 2 requirement.

**Flagged for explicit owner attention — SUBSEQUENTLY WITHDRAWN.** Session 02 stated that the recommended direction implied an order-of-magnitude price-point and ICP change against "₹2,500–₹5,000/month plans currently displayed on `/pricing`".

**CORRECTION (VERIFIED FACT, Session 05 live check, applied here in Session 06):** that premise is wrong. The production `/pricing` page displays **STARTER ₹50K–₹75K/month**, **GROWTH ₹1L–₹2L/month** and Custom Pricing, with "Starting From ₹50K" in the hero and an FAQ recommending a management fee of at least ₹50K/month excluding ad spend — confirmed live. The ₹2,500/₹5,000 figures live in `PRICING_PLANS` and `GOOGLE_ADS_PRICING_TIERS` in `lib/constants.ts` and are **referenced by no file in `app/`, `components/` or `lib/`** — dead code, displayed nowhere.

**Consequence:** there is **no order-of-magnitude price or ICP change**. MappedSkills already prices in the premium Indian band. The repositioning is a **proof and messaging change, not a business-model change**, and the "price and ICP discontinuity" risk is **withdrawn** — replaced by a sharper one: **a premium price already displayed and currently unbacked by any proof.** This is a live credibility exposure at the point of sale today.

**Still outstanding:** `docs/10-technical/CURRENT_ROUTE_INVENTORY.md` line 47 and `docs/01-business/STRATEGIC_VALIDATION.md` §10/§13 carry the uncorrected premise. **Session 06 was not permitted to modify research or technical documents**, so those two corrections remain open and are recorded in `ASSUMPTIONS_AND_OPEN_QUESTIONS.md`.

### Session 02 method limitation (VERIFIED FACT)
Web research and direct page retrieval only. **No paid research tool, no keyword tool, no rank tracker and no AI-visibility platform was used.** No search volume, keyword difficulty, ranking, traffic, backlink or AI-citation figure was gathered for MappedSkills or any competitor, and none was estimated. Twelve competitors were examined by direct page retrieval on a single date — a purposive sample, not a census — and no competitor's revenue, retention, headcount or actual client results were independently verified. No code was read for modification, no build/lint/test was run, and no application file was changed.

### Load-bearing Session 02 findings (evidence in `SOURCE_REGISTER.md`)
1. **The buyer's problem is real and independently evidenced.** Pew Research Center (2025-07-22, 900 US adults, 68,879 searches): a traditional result was clicked in 8% of searches carrying an AI summary versus 15% without; 1% clicked a link inside the summary.
2. **Google disputes the GEO/AEO sales narrative on its own surfaces.** Google Search Central (guide last updated 2026-07-10): "optimizing for generative AI search is optimizing for the search experience, and thus still SEO", with no new files, markup, chunking or schema required.
3. **Google is nationalising the measurement.** Search Console generative-AI performance reports announced June 2026.
4. **The measurement layer is a commodity.** Otterly from $29/month and Profound from $99/month (both verified at source), plus **free** AI-visibility checkers from Ahrefs and Semrush.
5. **The headline outcome resists rank-style reporting.** SparkToro/Gumshoe research reported 2026-01-28: identical brand lists recur under 1-in-100 on repeat runs (~1-in-1,000 for identical order), while leading names still appear in 60–90% of responses for a given intent.
6. **The hypothesis is already occupied inside Pune.** upGrowth publishes a full GEO ladder (₹5K–₹35K audit → ₹4L sprint → ₹1.5L+/mo retainer → ₹3L+/mo fractional CMO) plus a named free diagnostic; SEOTonic (Pune, est. 2005) sells AI SEO, GEO, AEO, LLM visibility **and** CRO from $199/month; DigiMark (Bengaluru) leads with "SEO, CRO and AI Search Growth".
7. **No credible agency examined sells all three pillars.** Search specialists do no CRO or automation; CRO specialists do no search; automation specialists do no search.
8. **The automation moat is structural, not verbal.** HubSpot Elite requires 2,750 sourced points, 11,000 total points, 80% GRR, 100+ certified employees, and an invitation.
9. **MappedSkills' own category is a weak AI-citation surface.** Similarweb reports Professional Services under 4% citation rate, against Travel ~23% and Automotive ~20%.
10. **The binding constraint is proof, not positioning.** MappedSkills would enter *any* category with no case studies, no articles, no analytics baseline, no credential and no research asset, against competitors who have several.
11. **Organic cannot be the launch acquisition channel.** Category SERPs are owned by competitor-written listicles and directories. Organic and AI visibility are a 12-month-plus compounding engine, and any plan assuming the new website generates demand on publication is wrong.

### Largest unresolved research gap
**RESEARCH REQUIRED.** The actual magnitude of AI referral traffic versus organic search is unverified. Figures circulating in search results ("0.13% of referral traffic", "11.4% vs 5.3% conversion", "345x") were **not present** on the Similarweb page retrieved and are excluded from all Session 02 artifacts. Until this is resolved, **no MappedSkills claim that AI visibility drives revenue today is supportable.** See `SOURCE_REGISTER.md` §D for the full list of claims explicitly rejected, so they are not accidentally revived later.

### Live documentation contradiction — RESOLVED 2026-08-31 (Session 06)
Between Sessions 02 and 05 the five business documents were **deliberately left unmodified** and continued to assert the unmodified three-pillar hypothesis while `STRATEGIC_VALIDATION.md` recommended changing it.

**This contradiction is now closed.** All five business documents were rewritten **together, in one pass** in Session 06 against the owner-approved direction, and the outcome is recorded in `DECISION_LOG.md` as `DEC-005` … `DEC-008`. `DEC-004` is **superseded** and closed as never approved.

`STRATEGIC_VALIDATION.md` remains **unmodified as a research record**. It is evidence and history, not strategic instruction. Where it conflicts with `BUSINESS_STRATEGY.md`, `BUSINESS_STRATEGY.md` governs.

## Session 03 — Search Demand, SERP & Commercial Opportunity Validation (completed 2026-08-31)

**Purpose:** determine where real organic-search opportunity exists, and use search evidence to challenge — not confirm — the business hypotheses.

### Artifacts created
- `docs/03-search/SEARCH_MARKET_RESEARCH.md`
- `docs/03-search/SERP_RESEARCH.md`
- `docs/03-search/KEYWORD_UNIVERSE.md`
- `docs/03-search/KEYWORD_PRIORITY_MATRIX.md`
- `docs/03-search/SEARCH_STRATEGY_VALIDATION.md`
- `docs/03-search/_raw_autocomplete_IN_2026-08-31.json` (raw Google Autocomplete API responses, preserved for reproduction)
- `docs/00-project/handoffs/SESSION_03_SEARCH_VALIDATION.md`
- `docs/02-research/SOURCE_REGISTER.md` — **appended** with a Session 03 addendum (S-31 … S-35). Session 02 entries were not altered.

### Research recommendation (NOT approved)
**RECOMMEND OPTION D** — vertical search-to-enquiry: *getting found and getting enquiries for industrial/B2B businesses*, with AI search as a **capability and credibility layer** rather than a category, conversion **integrated into a single outcome** rather than sold as "CRO", and **manufacturing as the leading vertical candidate requiring confirmation**.

Three qualifications attached by Claude:
- **absolute search volume is UNKNOWN** — no keyword tool was available; whether the manufacturing family can carry a business is unverified and is the largest risk to the recommendation;
- **the vertical is a leading candidate, not a validated choice** — healthcare's autocomplete is equally clean and its SERP was **not** tested;
- **Option D is gated on proof MappedSkills does not have** (a manufacturing case study, client benchmark data), which requires owner action.

### Session 03 method limitations (VERIFIED FACT)
- **SEARCH VOLUME NOT VERIFIED · KEYWORD DIFFICULTY NOT VERIFIED · CPC NOT VERIFIED.** No Ahrefs, Semrush, Keyword Planner or equivalent access existed. **No volume, difficulty or CPC figure appears in any Session 03 artifact, and none was estimated.** Demand judgements are qualitative, from Google Autocomplete depth/intent/contamination and live SERP composition.
- **Geographic lens:** session egress resolves to **Pune, Maharashtra, India (AS55836 Reliance Jio)**, confirmed via `ipinfo.io`. All autocomplete and SERP evidence is **India/Pune-localised**. The `gl=` parameter did **not** override IP localisation, so **international autocomplete was not obtained and no international SERP was observed directly.**
- **AI Overview presence could not be reliably observed** — the container rendered fallback text under automation. **No Session 03 artifact claims which queries trigger AI Overviews.** Carried to Session 04.
- No backlink or authority metric was measured; authority barriers are inferred from ranking-domain identity. Paid ads were not reliably visible and no claim is made about them. One observation per SERP, one day, one location.
- No production code was read for modification and none was changed. No build, lint or test was run.

### Load-bearing Session 03 findings
1. **Three audiences share one vocabulary, and the contamination falls precisely on the hypothesis's own terminology.** `generative engine optimization` → course, meaning, **jobs**, certification ahead of *agency*; `conversion rate optimization` → meaning, course, **jobs**; `lead automation` → entirely automation-engineering jobs; `seo consultant` → **salary, jobs** first. Ranking for these terms would attract students, job-seekers and competitors.
2. **"Search Visibility" and "organic growth" are already owned by other industries.** `search growth agency` returns **(NONE)**; `search visibility` returns **getcontact, Twitter/X, Instagram** profile settings; `organic growth agency` returns **TikTok and Twitter follower-growth services**. This is direct search evidence against the positioning territory in `POSITIONING.md`.
3. **"CRO" is a broken acronym in the Indian market.** `cro services` returns pharmaceutical **Contract Research Organisations**; `b2b cro` returns croissants and crown rings; `conversion rate optimization agency` returns **(NONE)**.
4. **AI-visibility demand resolves to free software, not agencies.** Autocomplete returns checker/score/tool/tracker/free with **no agency term in the top nine**, and page 1 of `ai visibility checker` is **ten free tools led by Ahrefs and Semrush** — including one already run by an Indian agency. **An AI Visibility Score is not a viable acquisition asset.**
5. **Buyers do not use the industry's acronyms.** They search "how to appear in ChatGPT" (8 clean variants) and "how to get cited by AI" (8 clean variants).
6. **The authority barrier is bimodal and tracks framing, not topic.** `how to improve website conversion rate` is held by CXL and Baymard; `why your website gets traffic but no leads` is held by small agencies publishing four days ago. Same discipline, opposite winnability.
7. **Specialisation substitutes for tenure — observed directly.** A 3-year-old Pune agency with 17 reviews holds a Local Pack slot for `seo agency for manufacturing companies`, beside 486- and 507-review generalists — while `seo company in pune` is held by firms trading since **1998 and 2004**.
8. **Manufacturing/industrial B2B is the cleanest commercial query family observed anywhere in the session** — eight variants, six explicitly provider-seeking, **zero contamination** — on an open SERP, in a city that is a major Indian engineering centre, with an RFQ-shaped (conversion) buyer outcome and a natural export bridge to international work.
9. **Marketing automation fails a second, independent test.** A **parked, expired domain ranks page 1** for `marketing automation agency india`; the credible ranking entity is a Salesforce implementation partner; `hubspot partner` shows buyers routing to the platform's own directory.
10. **MappedSkills' current category has strong Pune demand it is not capturing.** `digital marketing agency pune` and `performance marketing agency pune` are top autocomplete completions. **The owner-supplied absence of enquiries therefore cannot be attributed to absent search demand** — the barrier is tenure, reviews, Google Business Profile, and a website with no working conversion path.
11. **Google Search Console reporting and the local incumbents both confirm Session 02's commoditisation finding locally:** a Pune SEO incumbent (Itorix Infotech) already advertises "Local SEO, AEO & GEO strategies" on its core SEO page.

### Relationship to Session 02
Session 03 **independently corroborates Session 02's MODIFY recommendation from a different evidence base** — search behaviour rather than competitor positioning. It additionally supplies supporting evidence and a leading candidate for the **vertical narrowing decision** that Session 02 proposed as a Gate 2 requirement.

## Session 04 — AI Visibility, Citation & Discovery Baseline (completed 2026-08-31)

**Purpose:** determine what can actually and defensibly be measured about MappedSkills' visibility across AI-assisted discovery environments today, separating what was measured from what could not be measured.

### Artifacts created
- `docs/04-ai-visibility/AI_ACCESS_CAPABILITY.md`
- `docs/04-ai-visibility/AI_PROMPT_UNIVERSE.md`
- `docs/04-ai-visibility/AI_VISIBILITY_BASELINE.md`
- `docs/04-ai-visibility/AI_CITATION_RESEARCH.md`
- `docs/04-ai-visibility/AI_CRAWLER_POLICY.md`
- `docs/04-ai-visibility/AI_MEASUREMENT_FRAMEWORK.md`
- `docs/04-ai-visibility/AI_TOOLING_LANDSCAPE.md`
- `docs/04-ai-visibility/AI_STRATEGIC_VALIDATION.md`
- `docs/00-project/handoffs/SESSION_04_AI_VISIBILITY.md`
- `docs/02-research/SOURCE_REGISTER.md` — **appended** with a Session 04 addendum (§J–§M, sources S-36 … S-52). Session 02 and Session 03 entries were not altered.

### Research recommendation (NOT approved)
**AI SEARCH SHOULD BE A SUPPORTING CAPABILITY.**

This sits **one notch below** Session 03's "capability and credibility layer, never the category". The orchestrator should close that gap deliberately rather than let it drift. Reasoning in `AI_STRATEGIC_VALIDATION.md` §16.

### Session 04 method limitations (VERIFIED FACT)
- **Two of the six systems named in `PROJECT_CHARTER.md` were NOT TESTABLE.** `claude.ai` requires login; `grok.com` gates the first message behind sign-up and never returned an answer. **No baseline exists for Claude or Grok**, and no substitute was used for either.
- **Every system was tested SIGNED OUT**, at its lowest available tier. Gemini ran on "3.5 Flash-Lite" and exposed **no citations at all**; Perplexity's answers were markedly abbreviated; ChatGPT's model tier is undisclosed.
- **39 runs on one day inside a ~40-minute window**, from one location, in English only. **No day-to-day variance data exists** — the largest unmeasured quantity in the session.
- **Egress was Pune-locked again** (AS55836 Reliance Jio). **Session 03's international gap is NOT closed.** No Hindi or Marathi prompt was run.
- **Google surfaces exposed source domains but not anchor hrefs**, so linked-citation frequency was unmeasurable and is not reported.
- **A Google search-operator query triggered a bot check. It was NOT bypassed** and operator queries were abandoned, so **no exhaustive off-site mention count exists**.
- **No AI-visibility tool was trialled.** All vendor capability claims are unverified.
- **No production code, config or `robots.txt` was changed.** No build, lint or test was run.

### Load-bearing Session 04 findings
1. **MappedSkills has working branded retrieval and zero unbranded discovery.** Identified accurately in **7 of 8** branded runs; **0 appearances in 28 unbranded runs** across four systems and six prompt classes — including a 16-entry ChatGPT list of Pune SEO agencies. Retrieval, discovery, recommendation and citation are four different things and are not collapsed into a score.
2. **MappedSkills' AI presence is entirely retrieval-dependent.** ChatGPT with web search **disabled** did not know the company and read the name compositionally. No system tested carries it in parametric knowledge.
3. **Directory listings are the load-bearing citation source for agency prompts.** `agencies.semrush.com` appeared in **10 of 28** unbranded runs and `clutch.co` in **5** — together **15 of 28**. ChatGPT stated its own reasoning verbatim: *"Semrush... specifically identifies SEO Yodha, e intelligence, GO MO Group and others as serving manufacturing clients in India; Clutch's August 2026 B2B rankings also include e intelligence."* **MappedSkills has a profile on neither.**
4. **Selling GEO did not produce AI visibility.** upGrowth, SEOTonic and DigiMark each appeared **0 times in 28 unbranded runs**, including on GEO- and AI-SEO-specific prompts. Qoulomb — the narrow specialist — appeared 3 times.
5. **Google AI Overviews ARE observable — this closes the Session 03 blocker.** Present on national and informational queries; **ABSENT on `best SEO agencies in Pune`, which served a Local Pack instead.** For Pune local demand the observed lever is Google Business Profile, reviews and tenure — not AI optimisation. This corroborates Session 03 finding #10 from the AI surface.
6. **Within-system membership is often stable; order never was; cross-system agreement collapses.** Google AI Mode returned the same four Pune names in **3 of 3** runs with the same five source domains, in a different order each time — while **no agency appeared in three or more of the four systems tested**. A blended cross-system "AI Visibility Score" is therefore rejected on **methodological** grounds, not just commercial ones.
7. **AI systems are actively redistributing MappedSkills' unsubstantiated claims.** Google AI Mode surfaced the site's "300%+ ROI" title and Perplexity repeated it. Session 02 recorded that figure as copy of **unknown provenance**. Only ChatGPT qualified it as a self-reported marketing claim. **This is a live exposure and an owner decision.**
8. **A staging subdomain is being ingested.** Perplexity cited **`testing.mappedskills.com`** among ten sources. Verified live: resolves on the same host, returns HTTP 403 at the root and **404 for `/robots.txt`**.
9. **Crawler access is not the constraint.** Full server-rendered HTML is served to `OAI-SearchBot/1.4` and `ClaudeBot/1.0`; `robots.txt` blocks no AI crawler. **Access is necessary and demonstrably not sufficient** — every system has complete access and none mentions MappedSkills unprompted.
10. **Training crawlers and search crawlers are different and were kept separate.** `GPTBot`, `ClaudeBot`, `Google-Extended` and `CCBot` govern **training**; `OAI-SearchBot`, `Claude-SearchBot` and `PerplexityBot` govern **retrieval**. Google states verbatim that Google-Extended "does not impact a site's inclusion in Google Search". **xAI/Grok crawler policy is UNKNOWN** — no first-party documentation was found.
11. **The measurement tools now occupy the AI answer layer itself.** Google AI Mode answered *"companies that improve visibility in AI search"* with **Semrush, SE Ranking and Ahrefs** before naming any agency, and named **Profound** for *"who can help my company get found in Google and AI search"*. Session 03 found tool companies own the tool SERPs; Session 04 finds they are recommended over agencies inside AI answers.
12. **Manufacturing is thinly and unstably claimed.** Across Google AI Mode (2 runs), Perplexity and ChatGPT, **exactly one name — PageTraffic — was common to all three systems** (Techmagnate to two); AI Mode run 1 alone shared no name with Perplexity. Pune agencies do surface (Awrange in both AI Mode runs; Dimakh/Osumare/Koffeetech with street addresses), all three systems used **RFQ** language unprompted, and ChatGPT's top pick was framed for "a Pune-based industrial company". But manufacturing was also the **least stable** prompt tested (only 2 of ~5 names recurring), and the observed entry mechanism was a directory or a single listicle — **not vertical content**. Manufacturing remains a **WORKING HYPOTHESIS**; healthcare was again not tested; volume is still **UNKNOWN**.
13. **No research asset was observed being cited in any unbranded agency prompt.** Sessions 02 and 03 both proposed original benchmark research as the most durable moat. This is the first evidence gathered *against* that thesis. It is not a refutation — the prompt universe was vendor-selection-weighted — but it must be weighed at synthesis, not dropped.

### Session 02 / Session 03 open question now substantially answered
**AI referral traffic magnitude.** Ahrefs (2026-05-15), citing the chatgpt-vs-google.com panel of 74,752 websites: *"all AI chatbots combined sent 3.5 million visitors in March 2026 — just 0.28% of total web traffic"*, against Google's 345.2 million visitors and 28.12% share — **roughly 98× larger by volume**. This addresses `STRATEGIC_VALIDATION.md` §12 Q1 and `SEARCH_STRATEGY_VALIDATION.md` §20 Q7, open since Session 02.

**Caveats that must travel with the figure:** vendor blog, unaudited third-party panel, **re-verify before any client-facing use**. The accompanying conversion multipliers (23x from Ahrefs' own analytics; 185% from Buffer) are **single-company figures with self-selecting audiences and must NOT be quoted as benchmarks**.

**Two Session 02 rejections were re-tested and STAND:** the Similarweb page was re-fetched and still contains **no** "0.13% of referral traffic" and **no** "11.4% vs 5.3% conversion" figure. The rejected "345x" claim appears to have been a misreading of Google's **345.2 million** visitors.

### Relationship to Sessions 02 and 03
Session 04 **independently corroborates the MODIFY recommendation from a third distinct evidence base** — direct observation of AI answers, rather than competitor positioning (Session 02) or search behaviour (Session 03). It also corroborates Session 03's specific findings that AI-visibility demand resolves to software rather than agencies, that specialisation substitutes for tenure, and that Pune local demand is gated by Google Business Profile and reviews.

**One point of divergence the orchestrator must resolve:** Session 03 placed AI search as a "capability and credibility layer"; Session 04's direct measurement places it **one notch lower, as a supporting capability**.

## Session 05 — Final Strategic Synthesis (completed 2026-08-31)

**Purpose:** synthesise Sessions 02–04 into comparable strategic models and a single recommendation, without rerunning research.

**Artifact created:** `docs/01-business/FINAL_STRATEGY_SYNTHESIS.md`.

**Recommendation made (at the time, NOT approved):** a specialist enquiry-generation firm for considered-purchase B2B, taken to market through one vertical beachhead at a time.

**Status now:** the synthesis is the **pre-approval record**. It is preserved unmodified and must not be edited. Where it differs from the owner-approved direction — for example in treating "Enquiry Diagnostic" and "Enquiry System" as offer names, or in forcing a paid entry model — the **approved business documents govern**.

**Session 05 method limitation (VERIFIED FACT):** no research was rerun. One narrowly targeted factual check was performed — the `/pricing` verification recorded above. No business document, decision log entry or research artifact was modified in that session.

## Session 06 — Business Strategy Freeze (completed 2026-08-31)

**Purpose:** convert the owner-approved business direction into the authoritative business documents that every subsequent session will use. **Strategy was not reopened. Research was closed.**

### Owner approval received
**APPROVED DECISION:** *MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries.* Recorded with its full set of approved strategic principles as `DEC-005`.

### Files rewritten (together, in one pass)
- `docs/01-business/BUSINESS_STRATEGY.md` — now the primary strategic source of truth
- `docs/01-business/POSITIONING.md`
- `docs/01-business/ICP.md` — rewritten as an operational fit-assessment document
- `docs/01-business/SERVICE_ARCHITECTURE.md` — rewritten around the commercial system, not a service menu
- `docs/01-business/OFFER_ARCHITECTURE.md` — commercial architecture approved; names, packaging, pricing and the entry model deliberately left open

### Project files updated
`DECISION_LOG.md` (`DEC-004` superseded; `DEC-005`–`DEC-008` added) · `CURRENT_STATE.md` · `ASSUMPTIONS_AND_OPEN_QUESTIONS.md` · `QUALITY_GATES.md` · `handoffs/SESSION_06_STRATEGY_FREEZE.md`.

### Session 06 scope limitations (VERIFIED FACT)
- **No production code, configuration or content was changed.** No build, lint or test was run.
- **No research artifact was modified.** Sessions 02–04 documents and `FINAL_STRATEGY_SYNTHESIS.md` are untouched.
- **No design, IA, content or technical implementation document was modified.**
- **No new research was performed** and no new evidence was introduced.
- **No sitemap, URL architecture, page inventory, keyword map, content roadmap or website copy was produced.**
- History was not rewritten to make the approved strategy look inevitable. `DEC-004` is recorded as a reasonable hypothesis that evidence changed.

### Business strategy gate
**Quality Gate 2 (business / market validation) is marked PASSED** in `QUALITY_GATES.md`, on the basis that the repository now reflects the approved strategy consistently across the five business documents, the decision log and this state file.

## Session 07 — Website IA, Search Architecture & Page System (completed 2026-08-31)

**Purpose:** determine the complete website architecture required to deliver the approved business strategy. **Architecture only — no design, no copy, no code.** The approved business direction was **not** reopened.

### Artifacts created
- `docs/06-IA/WEBSITE_INFORMATION_ARCHITECTURE.md`
- `docs/06-IA/PAGE_INVENTORY.md`
- `docs/06-IA/PAGE_REASON_TO_EXIST_MATRIX.md`
- `docs/06-IA/CURRENT_TO_FUTURE_URL_MAP.md`
- `docs/06-IA/NAVIGATION_ARCHITECTURE.md`
- `docs/03-search/SEARCH_ARCHITECTURE.md`
- `docs/07-cro/FUNNEL_ARCHITECTURE.md`
- `docs/00-project/handoffs/SESSION_07_IA_SEARCH_ARCHITECTURE.md`

*(A narrow orchestrator correction pass was applied within Session 07 on 2026-08-31 — see "Session 07 correction pass" below. The architecture was not reopened.)*

### Major architectural recommendation (NOT approved)
**A 22-page unconditional indexable launch site — 24 if the manufacturing gate clears — organised around one outcome rather than a service menu**, with existing flat URLs preserved wherever they carry equity, and the proof deficit designed into the architecture rather than around it.

Five governing decisions:
1. `/services` is **repositioned** from an agency catalogue into the page that *is* the proposition; capability pages sit beneath it.
2. **Existing flat URLs are preserved.** Five commercial pages are already 308 targets; moving them under `/services/*` would create two-hop chains for no search benefit. Prefixed families (`/problems/`, `/industries/`, `/research/`) are introduced only where a family must scale.
3. **Launch scope is deliberately small.** The binding constraint is proof, not page count.
4. **Search landing pages and company positioning stay architecturally separate** (`DEC-008`). `/seo` and `/ai-seo` target their query families; neither is the company's category.
5. **`/research` launches with MappedSkills' own published diagnostics, `/how-it-works` becomes the published methodology including what cannot be attributed, and `/work` is NOT indexable until at least one permissioned case study exists.**

### Proposed launch inventory

| Figure | Count |
|---|---|
| **Unconditional indexable launch pages** | **22** |
| **Conditional launch pages** | **2** |
| **Non-indexable launch routes** | **5** |
| **Total routes if the manufacturing gate clears** | **29** |
| Total routes if it does not | 27 |

Of the 22 unconditional pages, 13 already exist; 9 are new. Both conditional pages are new.

| Group | Count |
|---|---|
| Homepage | 1 |
| Commercial | 8 |
| Problem | 1 |
| Proof | 4 |
| Editorial (index + 3 articles) | 4 |
| Company / conversion | 4 |
| **CONDITIONAL** (`/industries/manufacturing`, `/blog/{industrial-b2b-article}`) | **2** |
| Non-indexable (`/work` held back, `/thank-you`, `/privacy-policy`, `/terms`, 404) | 5 |

**PHASE 2:** 11 pages (13 if the manufacturing gate does not clear) · **FUTURE:** 8 · **DO NOT BUILD:** 17 named rejections.

### Determinations worth recording in state
- **No location pages of any kind.** Pune demand is decided by a Local Pack and by local listing data — Google Business Profile, reviews and complete NAP. Replaced with entity architecture, not page architecture.
- **Manufacturing gets exactly one indexable page** (`/industries/manufacturing`), classified **LAUNCH — CONDITIONAL** — not a cluster, not a grid, and **no `/industries` hub** until a second vertical exists. It ships only if the manufacturing validation gate clears before content freeze; otherwise it and its supporting article move to PHASE 2 with no other change. **Manufacturing remains candidate beachhead #1, not an approved specialisation — search evidence is not a business decision.**
- **AI Search occupies a four-surface minimum cluster** — one commercial page, two buyer-question guides, one published baseline (plus a PHASE 2 technical guide and checker). **No page per acronym or platform. No AI Visibility Score, ever.**
- **`/blog` is retained** (existing 308 target; the best-implemented SEO surface in the codebase), with `/research` added as a distinct family because the job, cadence, schema and evidence standard differ.
- **Zero tools at launch.** The `/tools/` namespace is reserved.
- **Analytics/attribution and follow-up automation get no pages** — no query family supports either, and `how to improve lead response time` returns **(NONE)**.
- **Primary conversion is qualified enquiry creation — outcome-defined and mechanism-independent.** Two surfaces satisfy it: a qualified form submission **or** a qualified meeting booking, both capturing source, landing context, interest and qualification data. Analytics distinguishes `lead_form_submitted` from `meeting_booked` while both roll into one business-level measure. The funnel is also **model-agnostic**, so the unresolved free/paid/hybrid entry decision forces no re-architecture.
- **Proof is prominently available and integrated into commercial pages — never a required navigational step.** Commercial page → qualified enquiry is the default path; commercial page → method/research → enquiry is available for evaluators who choose it. **Buyer intent determines evaluation depth.**

### Current URL decisions
**32 routes and redirect rules covered; every current route appears in the migration map.**
**KEEP 12 · REPOSITION 9 · MERGE 0 · REDIRECT 11 · RETIRE/410 0 · INVESTIGATE 4 flags.**

**Nothing is merged and nothing is retired, deliberately.** There is **no backlink, ranking, impression or traffic data for any URL on this site**, and no analytics in production. Every classification rests on intent, redirect history and strategic fit. The one structural change — consolidating `/portfolio/{slug}` into `/work/{slug}` with the legacy `/results/:slug` rule **re-pointed directly** so no chain is created — is safe only because zero case studies are currently published, and is **blocked** on enumerating the Contentful slug set.

### Session 07 method limitations (VERIFIED FACT)
- **No fresh research was performed.** Every architecture question was answered from Sessions 01–06 artifacts. **No volume, difficulty, ranking, traffic, backlink or AI-citation figure was gathered or estimated, and none appears in any Session 07 artifact.**
- **No backlink, ranking, impression or traffic data exists for any URL** — the largest limitation in the session, and the reason nothing is retired or merged.
- **The `/blog/{slug}` and `/portfolio/{slug}` slug sets are UNKNOWN;** production publishes zero of each.
- **Host-level redirects are UNKNOWN** — no `.htaccess` is committed.
- **No international lens.** All search judgements inherit Session 03's Pune-locked egress.
- **No production code, configuration or content was changed. No build, lint or test was run. No page was designed and no copy was written.**
- **The correction pass performed no research and added no page.** Its only filesystem change beyond documentation was the authorised removal of the obsolete stub IA directory.

### Session 07 correction pass (2026-08-31)
A narrow orchestrator correction pass was applied within the same session. **The architecture was not reopened, no research was performed, and no page was added.**

1. **Manufacturing reclassified LAUNCH — CONDITIONAL**, with launch counts now separating unconditional from conditional so an unvalidated business case is never folded into the headline launch number.
2. **The mandatory proof checkpoint was removed** from the funnel and from every affected document.
3. **Primary conversion redefined as qualified enquiry creation**, mechanism-independent across two surfaces.
4. **IA directory cleanup — RESOLVED.** `docs/06-information-architecture/` was inspected and contained exactly one file: a 115-byte two-line placeholder README from scaffold commit `566d3e3`, with **no substantive artifact** and no reference from any code or configuration. It was removed under explicit owner authorisation. **The project standardises on `docs/06-IA/`; one IA directory now exists.**

Unchanged by the correction pass: commercial-page decisions · problem-page decisions · geographic strategy · the AI-search cluster · research/proof architecture · schema recommendations · all current→future URL decisions · the frozen business strategy.

### Unresolved architecture decisions
1. `/work/{slug}` consolidation — requires the full Contentful case-study slug set.
2. The entry-offer model (free / paid / hybrid) — blocks a diagnostic tool; nothing else waits on it.
3. Whether `/social-media-ads` is eventually merged — needs backlink data.
4. Whether `/privacy-policy` becomes indexable.
5. Whether blog categories get real archive URLs — do not build both a parameter and a path.
6. **The manufacturing validation gate** — volume verification, a healthcare SERP comparison, and one publishable industrial result. **This determines whether the two conditional pages ship at launch or move to PHASE 2.**
7. If that gate does not clear: whether the editorial stream launches with 3 articles or a PHASE 2 article is promoted to hold the floor at 4.
8. **Whether the booking tool can carry source, landing context, interest and qualification data.** The two-surface conversion model depends on it; if it cannot, booking degrades to a secondary conversion.
9. FAQ schema eligibility — re-verify at implementation (Project Rule 19).

## Session 08 — CRO & Qualified-Enquiry Funnel Specification (completed 2026-08-31)

**Purpose:** define exactly how the website turns visitors into measurable qualified enquiries. **Specification only — no UI designed, no page or email copy written, no vendor selected, no code changed.** The frozen strategy and the approved IA were not reopened.

*Model note: the session brief specified Claude Sonnet 5; the session ran on Claude Opus 5. Recorded accurately.*

### Artifacts created
- `docs/07-cro/QUALIFIED_ENQUIRY_DEFINITION.md`
- `docs/07-cro/FORM_AND_BOOKING_SPEC.md`
- `docs/07-cro/CTA_SYSTEM.md`
- `docs/07-cro/PAGE_TYPE_CRO_RULES.md`
- `docs/07-cro/POST_SUBMISSION_AND_FOLLOWUP.md`
- `docs/12-analytics/ATTRIBUTION_MODEL.md`
- `docs/12-analytics/EVENT_TAXONOMY.md`
- `docs/13-automation/CRM_DATA_CONTRACT.md`
- `docs/13-automation/ENQUIRY_LIFECYCLE.md`
- `docs/13-automation/FOLLOWUP_ARCHITECTURE.md`
- `docs/00-project/handoffs/SESSION_08_CRO_FUNNEL_SPEC.md`

`docs/07-cro/FUNNEL_ARCHITECTURE.md` was updated with a pointer to the specification layer and three previously-open items marked resolved. **Its substance is unchanged.**

### The definition of a qualified enquiry (NOT approved)
**Website-Qualified Enquiry** — the business conversion, set automatically at submission when **all five** conditions hold: passes abuse screening · reachable identity (**email verification advisory and failing open**) · **business context (any one of** company name, website URL, or non-free-mail domain**)** · stated need · not a duplicate — and no hard disqualifier applies.

**Attribution is NOT a qualification condition.** `qualification_status` and `attribution_status` (`complete` / `partial` / `unavailable`) are **independent dimensions**. Direct traffic, a missing referrer, privacy restrictions, blocked analytics, unavailable campaign data and attribution-storage failure **can never disqualify a legitimate enquiry.** Measurement gaps are reported, never hidden by moving enquiries out of the qualified count.

**Sales-Qualified Enquiry** is a separate, human, downstream judgement against `ICP.md` §2. **The website is never reported as producing it.**

**The honest consequence:** `ICP.md` names *value per opportunity* as the single most important qualifier, and **the website cannot verify it.** It is excluded from the definition and handled in conversation rather than collected as an unverifiable self-reported number.

**Four states:** Qualified · Unqualified · Spam · Review Required. **No legitimate enquiry is ever deleted**; **Review Required does not count while unresolved**; reporting always shows all four **and breaks Qualified down by `attribution_status`**. **Confident spam creates no conversion, no CRM lead and no sales notification, and is quarantined under a defined retention policy then deleted or anonymised** — uncertain submissions go to Review Required instead.

**No scoring model** — MappedSkills has zero historical enquiries to calibrate against, so any weights would be invented.

### Determinations worth recording in state
- **Primary conversion remains qualified enquiry creation, mechanism-independent.** A qualified meeting booking is a qualified enquiry. **A booking whose attribution does not survive is still qualified** — it is recorded with `attribution_status = unavailable`. The booking capability requirements stand as a **measurement** requirement, not a qualification gate.
- **Form: 4 required fields** — name, work email, company, what you're trying to fix. **Budget is removed from the required set** (it is required in production today, is unverifiable, and cannot qualify anything). Phone is **optional on the form, required on the booking surface**. Service/problem is **pre-filled from page context, never asked**.
- **Persist-first architecture.** Validate → screen → **persist** → return success → *then* notify, email, CRM and analytics asynchronously. **A legitimate enquiry must never be silently lost because a secondary integration failed, and a false success is never acceptable.**
- **Email verification fails open.** Five outcomes — invalid / disposable / valid-looking / **verification unavailable** / suspicious. Domain-MX checking is advisory and asynchronous; **a DNS, network or API failure passes the enquiry with an advisory flag rather than rejecting it.** Disposable domains and specific negative signals route to **Review Required**, never automatic rejection. **No new visitor-facing field.**
- **Both conversion events fire server-side.** A `/thank-you` pageview can never inflate the business metric.
- **A phone click is conversion *intent*, never a qualified enquiry.** CTA clicks are diagnostic, never business conversions.
- **PII is prohibited in analytics**; an opaque `enquiry_id` is the only join to identified data.
- **Attribution: first-touch + conversion-touch, no multi-touch model**, with ten limitations published rather than hidden. Internal links must never carry UTMs, and the site's own hostnames are excluded as referrers — relevant because **`www.mappedskills.com` returns HTTP 200 rather than redirecting** and **`testing.mappedskills.com` was observed being cited by Perplexity**.
- **Lifecycle: seven stages.** System sets everything up to and including Website Qualified; **every stage beyond it is human.** No MQL stage, no scoring, no per-service funnels.
- **Follow-up: five automated touches and nothing else.** Nurture is **not built**; eligibility is recorded so it stays possible later.
- **Response time: internal target of one business day, no public numeric SLA** until one has been measured — publishing an unmeasured promise would demonstrate the failure MappedSkills sells the fix for.
- **CRM: a vendor-neutral data contract, no vendor selected.** Durable storage plus a spreadsheet would satisfy it at launch volume.

### Baseline — UNKNOWN, and no benchmark invented
**No analytics baseline exists.** Conversion rate, enquiry volume, traffic and source mix are all **UNKNOWN**. **A pre/post conversion comparison is impossible and must not be presented**; any future improvement claim must be measured from a post-launch baseline period forward. **No conversion benchmark or target was invented** — none exists in this programme's evidence base.

### Session 08 correction pass (2026-08-31)
A narrow orchestrator correction pass was applied within the same session. **The funnel strategy was not reopened, no research was performed, and no complexity was added.**

1. **Qualification separated from attribution completeness** — attribution removed as a WQE condition (six → five); `qualification_status` and `attribution_status` are now independent.
2. **Email verification fails open** — advisory, asynchronous, with uncertainty routed to Review Required rather than rejection.
3. **Spam retention made controlled** — quarantined, excluded from CRM and notifications, then deleted or anonymised under a defined retention policy.
4. **Production analytics wording corrected** — see below.

**Analytics production-state wording (corrected).** **Repository code contains GTM and Meta Pixel tracking implementation, while Session 01B live verification found no active third-party analytics scripts in production — `dataLayer`, `gtag` and `fbq` were all undefined.** Consent requirements must be implemented **before** any analytics or advertising tracking requiring consent is activated. Session 08 documents no longer state as current fact that these scripts load unconditionally in live production. **Session 01 historical audit artifacts were not altered** — the Session 01B critical findings above record the repository state and the live state separately, as they did originally.

**Preserved unchanged by the correction pass:** 4 required form fields · budget removed · phone optional · dual conversion surfaces · booking capability requirements · no weighted scoring · Website-Qualified vs Sales-Qualified · first-touch + conversion-touch attribution · UTM governance · server-confirmed conversion events · lifecycle simplicity · limited follow-up automation · no arbitrary benchmarks.

### Session 08 method limitations (VERIFIED FACT)
- **No fresh research was performed.** Two production files were read **read-only** to ground the specification: `components/forms/ContactForm.tsx` and `lib/gtm.tsx`.
- **No conversion rate, benchmark, traffic figure or industry statistic was gathered or estimated**, and none appears in any Session 08 artifact.
- **No production code, configuration or content was changed. No build, lint or test was run. No form was submitted and no page was rendered.**
- **No vendor was selected** for CRM, booking, email, analytics, consent or spam protection.

### Unresolved decisions
1. **There is no backend** — no `app/api/`, no route handler, no email capability. **Everything specified is unbuildable until a server endpoint exists.**
2. Removing budget from required fields, and phone remaining optional — both change existing production behaviour.
3. **Whether the booking tool supports runtime custom fields and a server-side webhook.** If not, booking demotes to a secondary conversion.
4. CRM selection, or the deliberate decision to defer one.
5. Internal response-time target and published business hours — an operating commitment.
6. Consent mechanism, and retention periods including the spam-quarantine duration — **privacy, security and legal review required**.
7. Length of the post-launch baseline period.

## Session 09 — Content Strategy & Launch Content Architecture (completed 2026-09-01)

**Purpose:** determine what MappedSkills must publish, why it deserves to exist, what evidence it requires, how it supports search and AI-assisted discovery, and how it contributes to qualified enquiries. **Strategy only — no final page copy, no complete article, no headline or tagline, no design, no code.** The frozen business strategy, the proposed IA and the proposed CRO funnel were **not** reopened.

### Artifacts created
- `docs/05-content/CONTENT_STRATEGY.md`
- `docs/05-content/LAUNCH_CONTENT_INVENTORY.md`
- `docs/05-content/CONTENT_CLUSTER_ARCHITECTURE.md`
- `docs/05-content/EDITORIAL_STRATEGY.md`
- `docs/05-content/RESEARCH_CONTENT_STRATEGY.md`
- `docs/05-content/AI_CITATION_CONTENT_PRINCIPLES.md`
- `docs/05-content/CLAIMS_AND_EVIDENCE_GOVERNANCE.md`
- `docs/05-content/CONTENT_QUALITY_GATE.md`
- `docs/05-content/OWNER_INPUT_REGISTER.md`
- `docs/05-content/CONTENT_EVIDENCE_GAPS.md`
- `docs/05-content/editorial-briefs/` — 4 briefs (3 unconditional, 1 conditional)
- `docs/05-content/research-briefs/` — 2 briefs
- `docs/09-content-pages/briefs/` — 18 page briefs (17 unconditional, 1 conditional)
- `docs/00-project/handoffs/SESSION_09_CONTENT_STRATEGY.md`

### Launch content inventory — reconciles to the approved IA
**22 unconditional indexable launch assets, 2 conditional, 5 non-indexable routes.** Brief coverage is **22 of 22 unconditional and 2 of 2 conditional**: 17 page briefs plus 3 editorial briefs plus 2 research briefs cover the unconditional set; 1 page brief plus 1 editorial brief cover the conditional pair. **No indexable URL was added, removed or renamed.**

### Determinations worth recording in state
- **Every asset must do at least one of seven named content jobs and be able to say which.** An asset that cannot name its job, its evidence and the page or decision it supports does not publish. "A keyword exists" is not a job.
- **An operational information-gain standard exists**, with five permitted sources — first-party measurement, first-party diagnosis, disclosed method, expert interpretation of primary sources, a reusable artefact — and a **delete-test**: remove every sentence that could have been written by someone who had not done the work, and if the asset still says the same thing it does not publish.
- **No word-count target appears anywhere, and none may be introduced.**
- **Three launch content clusters carrying one article each, plus one conditional** — website enquiry conversion, AI-assisted discovery, measurement and the search-to-enquiry chain, and industrial/B2B acquisition (conditional). Three more are PHASE 2, one is support-only, and four are DO NOT BUILD. **Six capabilities do not get six silos**; two of the six have no supporting query family at all, and one returns **(NONE)**.
- **The three launch article topics are determined within the three IA-assigned article slots.** The slot count was not changed — that would be an IA change. Article 3's narrower verification sub-intent carries an explicit **RESEARCH REQUIRED** flag and a recorded fallback: publish with **no primary query target claimed** rather than invent one.
- **Launch article 2 was replaced in the correction pass** (see below). The unconditional set remains **exactly three**, and **exactly one of them is primarily AI Search**.
- **The manufacturing article remains LAUNCH — CONDITIONAL**, shipping or deferring as a pair with `/industries/manufacturing`. **No fourth unconditional article was invented to fill the slot** if the gate does not clear; that promotion decision remains with the orchestrator.
- **The own-site enquiry diagnostic is classified as research** — a diagnostic protocol applied to MappedSkills itself — **not** a client-style case study (no baseline exists), not a build-in-public series (it would commit to an unproven cadence), and not marketing. **It must publish only once the fixes are shipped, or it is a list of live defects rather than proof.**
- **`/research` may launch with one entry** if those fixes slip. That is the correct outcome, not a compromise.
- **`/how-it-works` is the root dependency of the entire content programme.** Every commercial page's proof link, the attribution-limits statement and both research entries point to it — and it is **owner-blocked** on the real delivery process.
- **Claims governance is a six-class model** — first-party measured · client-supplied · primary-source verified · secondary-source supported · opinion/inference · **unsupported, prohibited** — assigned at brief stage, before the sentence is written. A **ten-point case-study evidence threshold** governs `/work`.
- **A fifteen-item content quality gate** applies per asset, with a generic-agency test. It does not score, and there is **no exception for launch pressure**.
- **Content-to-conversion intensity follows reader intent.** No sticky CTA on research, methodology or editorial pages; **a research asset must not become an advert halfway through the methodology**; and the correct response to poor editorial conversion is the hard disqualifier, **not more CTA pressure**.
- **Visual storytelling opportunities are identified per content type** — what is better shown than described — with **no design performed** and a standing rule that **no visualisation may depict a number that does not exist**.
- **Owned content and third-party authority are kept structurally separate.** Recorded plainly: **publishing more articles does not solve the authority problem.** Directory sources appeared in 15 of 28 unbranded AI runs and MappedSkills is on none.
- **Author pages are PHASE 2**; named team profiles on `/about` are sufficient at launch. A **"reviewed by" byline is used only where a genuine second reviewer exists** — a manufactured one is fabricated proof.

### Evidence gaps and owner inputs, made explicit
`CONTENT_EVIDENCE_GAPS.md` records **14 claims MappedSkills would want to make and cannot support**, each with what exists, what is missing, who can close it, and whether content is blocked. **Nine close only through owner action.** Consequences: two assets outright blocked (`/work`, `/work/{slug}`), two conditional, one sequence-blocked, every commercial page constrained to method and own-diagnostic proof, and **no number about volume, traffic, ranking, revenue or improvement permitted anywhere.**

`OWNER_INPUT_REGISTER.md` records ten priority inputs, of which **items 1, 3, 4, 5 and 9 cannot be delegated to any Claude session**: publishable client results · verified company facts · people and authorship · the decision on the production claims · confirmed prices · and the real delivery process.

### Session 09 correction pass (2026-09-01)
A narrow orchestrator correction pass was applied within the same session. **The content strategy was not reopened, no broad research was performed, and no launch article was added.**

1. **Launch articles 1 and 3 retained** — the `how to appear in chatgpt` guide and the enquiry-loss verification article.
2. **Launch article 2 replaced.** The proposed *"Which sources AI systems actually cite when recommending a supplier — measured across 28 runs"* was **withdrawn**, because the measured 28-run findings belong primarily to the **AI Visibility Baseline** research asset and an editorial article on substantially the same dataset would duplicate `/research` in `/blog`. **The superseded brief was deleted.** The replacement addresses **SEO / organic visibility → enquiries → qualified enquiries → measurement**, supports `/seo`, `/services`, `/lead-generation`, `/problems/traffic-but-no-enquiries` and `/how-it-works`, and — because **no recorded Session 03 family covers that intent** — carries **PRIMARY SEARCH TARGET = UNVALIDATED**, is classified as **buyer education and conversion support**, and records a targeted validation requirement before final copy. **No search demand was invented.**
3. **A canonical-research rule is now binding.** **An original first-party dataset or measured study has exactly one canonical research URL.** Editorial may interpret or apply it only where the user intent is materially different, and must summarise only what is necessary, link to the canonical research, and add materially different application — **never reproducing substantially the same dataset, methodology, findings, charts or conclusion to create another search page.** Recorded in the content strategy, the research strategy, the editorial strategy, the internal-linking rules and as **quality-gate item 9b**, taking the gate to sixteen items.
4. **AI Search kept proportionate.** The unconditional editorial launch set is **one AI-assisted discovery article, one search-to-qualified-enquiry article, one enquiry-loss diagnostic article.** **No second AI launch article**, and no article per capability for balance. **AI Search remains a highly visible supporting capability and is not the company category.**
5. **Unsupported pseudo-quantification removed.** "Roughly half of what the strategy needs from search is off-site" and its variants were replaced with **"a material part of search and AI-discovery authority is off-site and cannot be created through owned-site publishing alone."** **No replacement ratio was introduced**, and the underlying Session 04 evidence — directory sources in **15 of 28** unbranded runs, MappedSkills on none — is preserved.

**Cluster consequence, and the only one:** AI-assisted discovery dropped from 2 articles to 1, and the measurement territory was promoted from PHASE 2 to LAUNCH with **one** article to receive the replacement. **No cluster was added or removed and no other classification changed.**

**Research assets unchanged in substance.** The **AI Visibility Baseline remains the canonical home for the Session 04 measured dataset**; the own-site diagnostic remains **blocked until the relevant fixes exist** and remains classified as **research rather than a case study**; **`/research` may still launch with one genuine entry** if the second is not ready.

**The Gate 5 item this raised is now closed by the reconciliation pass below**, not left as a flag.

**Preserved unchanged by the correction pass:** the seven content jobs · the information-gain standard · three unconditional launch articles · the conditional manufacturing pair · claims governance · the evidence-gap register · the owner-input register · author strategy · freshness strategy · visual-information requirements · every commercial page brief · the page inventory · the IA · the CRO specification · the business strategy.

### Session 09 method limitations (VERIFIED FACT)
- **No fresh research was performed.** Every content decision was derived from Sessions 01–08 artifacts with their original evidence labels intact.
- **No search volume, keyword difficulty, CPC, ranking, traffic, backlink, conversion-rate, benchmark or AI-citation figure was gathered or estimated, and none appears in any Session 09 artifact.**
- **Two narrow phrasing checks were flagged for the writing phase rather than performed** — the long-tail phrasings for launch article 3 and for the conditional article 4 — because running them from this session's vantage point would have produced evidence not comparable with Session 03's India-lens observations. Both carry recorded fallbacks.
- **The correction pass performed no research and added no launch article.** Its only filesystem changes were within the Session 09 documentation paths, including the deletion of one superseded brief.
- **Two pre-existing occurrences of the "roughly half" wording were outside the correction pass's permitted scope and are now corrected in the reconciliation pass below.**
- **No application code, configuration or content was read for modification, and none was changed. No build, lint or test was run. No page was rendered and no copy was written.**

### Session 09 repository reconciliation pass (2026-09-01)
A second narrow orchestrator pass, run **before Quality Gate 7 review**, to make the repository accurately express the correction pass. **No research was performed. No strategy, IA, CRO or editorial decision was changed. No production code was touched.**

**1. The superseded editorial slot binding is now annotated everywhere it was authoritative.** Five locations across four artifacts — `docs/06-IA/PAGE_INVENTORY.md` §1.5 row 17 plus a new §1.5A, `docs/06-IA/PAGE_REASON_TO_EXIST_MATRIX.md` §5, `docs/06-IA/WEBSITE_INFORMATION_ARCHITECTURE.md` §10 and §12, and `docs/03-search/SEARCH_ARCHITECTURE.md` §2 plus a new §2A and §5 — each carrying **SUPERSEDED BY SESSION 09 — CONTENT STRATEGY REFINEMENT (2026-09-01)**. **Nothing was rewritten or deleted; the original statements stand beside the annotations.**

**What the annotations record, and it is the whole point of the pass:** the launch article count is **unchanged** (3 unconditional + 1 conditional) · **no URL was added** · **no IA route changed** · **no commercial-page intent changed** · **only the editorial topic occupying one existing slot changed** · **`how to get cited by ai` is UNBUILT at launch**, reconsiderable in PHASE 2 only if it can support a distinct asset without duplicating the canonical `/research/{ai-visibility-baseline}` dataset · and **the replacement has no validated primary search target and must not be represented as keyword-demand-led.**

**2. The unsupported "roughly half" wording is corrected in both remaining locations.** `SEARCH_ARCHITECTURE.md` §4 now reads that **a material part of what the strategy needs from search and AI-discovery authority is off-site and cannot be created through owned-site publishing alone**, with a dated correction note recording the original sentence. The historical `handoffs/SESSION_07_IA_SEARCH_ARCHITECTURE.md` **keeps its original sentence** and gains a dated §17 correction note, so the record is preserved rather than erased. **No substitute percentage, ratio or estimate was introduced.** The underlying Session 04 evidence is unaltered: directory sources appeared in **15 of 28** unbranded AI runs, `agencies.semrush.com` in 10 and `clutch.co` in 5, and MappedSkills has a profile on neither.

**3. The decision trail is recorded as `DEC-009`** — a **refinement, explicitly not a company-level strategic decision, not an IA decision and not a gate approval.** It records the earlier Gate 5 state, the three reasons for the replacement, and the explicit statements that it **does not validate search demand**, that the replacement remains **`PRIMARY SEARCH TARGET = UNVALIDATED`**, that **targeted validation is required before any search target is claimed**, and that publication is justified on **buyer-education and conversion-support** grounds without inventing keyword demand.

**4. Session 09 file accounting corrected.** **35 new files · 7 tracked files modified across all three passes · 1 file deleted (never tracked).** The earlier "Files Modified — 13" was wrong; the correction pass modified **16**. The untracked root `README.md` pre-dates this session and is excluded from every count.

**Research canonicalisation confirmed unchanged:** `/research/{ai-visibility-baseline}` remains the canonical future public home for the Session 04 measured dataset, and **no launch article may reproduce substantially the same dataset, methodology, findings, charts or conclusion.**

**Gate status was not changed by this pass, and Claude has no authority to change it.** At the time of this reconciliation pass the repository recorded **Gate 5 as OPEN**. **Gate 5, along with Gates 6 and 7, was subsequently reviewed and approved by the orchestrator on 2026-09-01**, recorded in `DECISION_LOG.md` as `DEC-010`, `DEC-011` and `DEC-012` and reflected in `QUALITY_GATES.md` and the summary above — a separate, later administrative reconciliation, not a Claude self-approval.

## Session 10 — Messaging Architecture (completed 2026-09-01)

**Purpose:** turn the approved business strategy, IA, funnel and content architecture into one coherent messaging system — what MappedSkills says, in what order, in what language, with what evidence, and at what degree of confidence. **Language only — no page copy, no complete page, no approved headline or tagline, no design, no code.** The frozen business strategy and the approved IA, CRO and content architectures were **not** reopened.

### Artifacts created
- `docs/08-messaging/MESSAGING_ARCHITECTURE.md`
- `docs/08-messaging/POSITIONING_MESSAGE_SYSTEM.md`
- `docs/08-messaging/VALUE_PROPOSITION_ARCHITECTURE.md`
- `docs/08-messaging/PROBLEM_AND_OUTCOME_LANGUAGE.md`
- `docs/08-messaging/CAPABILITY_LANGUAGE.md`
- `docs/08-messaging/AI_SEARCH_LANGUAGE.md`
- `docs/08-messaging/CLAIMS_LADDER.md`
- `docs/08-messaging/VOICE_AND_TONE.md`
- `docs/08-messaging/TERMINOLOGY_DICTIONARY.md`
- `docs/08-messaging/CTA_LANGUAGE_SYSTEM.md`
- `docs/08-messaging/HOMEPAGE_MESSAGE_ARCHITECTURE.md`
- `docs/08-messaging/COMMERCIAL_PAGE_MESSAGE_PATTERN.md`
- `docs/08-messaging/MESSAGE_CONSISTENCY_MATRIX.md`
- `docs/08-messaging/COPY_PLACEHOLDER_STANDARD.md`
- `docs/08-messaging/MESSAGE_QUALITY_GATE.md`
- `docs/00-project/handoffs/SESSION_10_MESSAGING_ARCHITECTURE.md`

### The central problem it solved
The approved direction defines the company by an **outcome**, while the buyers who will find it search almost entirely in **technique vocabulary**. Session 10 resolves this as a two-move rule binding on every commercial landing page: **confirm the searched capability in the first screen, in the searcher's own word — then bridge to the company outcome within one or two sentences.** Both failure modes are named and both are disqualifying: **category capture** (a strong `/seo` page pulls the homepage and `/services` into becoming an SEO agency by accumulation) and **coy positioning** (refusing to say "SEO" plainly, so the visitor cannot tell within one screen whether the page is relevant). **Protecting the positioning by being vague is explicitly not a defensible trade.**

### Determinations worth recording in state
- **A seven-level message hierarchy exists** — company proposition · commercial outcome · buyer problem · mechanism · capabilities · evidence · action. **Levels 1 and 2 are fixed sitewide**, and **no capability may rise to Level 1** on any page, in any profile, or in any company description. That is recorded as the single most damaging failure the system exists to prevent.
- **No new company category was invented**, and none may be introduced later without an owner decision in `DECISION_LOG.md`.
- **Three internal positioning statements were drafted and one recommended** — "Accountable to the enquiry". The rejected diagnostic-led formulation was **reassigned** to the entry offer and the problem page rather than discarded, because it positions the firm as a diagnostic practice rather than a delivery engagement. **Not approved.** **Corrected in the correction pass** so the approved buyer definition is not narrowed and no owner-blocked engagement model is asserted — see below.
- **Three versions of "what does MappedSkills do?"** — plain, slightly expanded and search-aware — all describing the same business. **Only the search-aware version may lead with capability vocabulary**, and even it ends on the outcome.
- **One primary value proposition and exactly four supporting propositions.** Three of the brief's candidate concepts were **excluded at company level** with reasons recorded — notably paid media, whose elevation to a value proposition would quietly recreate the rejected performance-marketing identity. **S1 was rewritten in the correction pass** to *"the joins between the parts are somebody's job"*.
- **"Enquiries" is the default buyer-facing noun. "Qualified enquiries" is used wherever qualification can be explained on the same page, and always where accountability is stated.** "Lead" is permitted only where the query requires it. **Internal analytics vocabulary — WQE, SQE, `qualification_status`, `attribution_status`, `lead_form_submitted` — never appears in buyer-facing copy.** The operational WQE definition is unchanged.
- **Outcome language is tiered into four strict bands**, with a per-term ruling on traffic, rankings, visibility, enquiries, qualified enquiries, leads, opportunities, pipeline, revenue, ROI, AI recommendations and AI citations. **Pipeline and ROI are prohibited outright.**
- **India-first language rulings on sixteen terms**, keeping necessary technical vocabulary — attribution, indexation, structured data — while excluding US SaaS and RevOps imports. **British/Indian spelling in prose; American spelling preserved only in URLs, code identifiers and query phrases a page must match.**
- **"AI search" is the preferred umbrella term.** GEO, AEO and LLMO are permitted **at most once each per asset, defined in place, inside explanatory content only** — never in a title, heading, navigation label, meta description or CTA, and never as MappedSkills' framing. **Seven permitted claims and ten prohibited claims are enumerated**, and **the four discovery layers are kept separate and never blended into a score.**
- **A six-level claims ladder** — FACT · OBSERVATION · CAPABILITY · EXPECTED EFFECT · CLIENT OUTCOME · PROHIBITED — **mapped onto the six-class evidence governance rather than replacing it.** Both are assigned per claim at brief stage. A **verb ladder** makes the most common failure — a claim climbing a level through its verb — checkable. **Level E is currently empty: no client outcome may be published in any form.**
- **A terminology dictionary with an eighteen-item PROHIBITED list and a fourteen-item USE-ONLY-WHEN-JUSTIFIED list**, each entry carrying its specific reason so a ban cannot be argued away. **Metadata is explicitly not a loophole.**
- **CTA language was mapped onto the approved CRO roles without creating a new one.** The brief's "meeting CTA" is PRIMARY on the booking surface; the "editorial CTA" is LOW-COMMITMENT. **All DIAGNOSTIC wording is blocked on the entry-offer decision, and no candidate may say "free" until it is made.**
- **The homepage message sequence was derived, not inherited.** Because the homepage is **not primarily a cold organic entry point**, it leads with the proposition rather than the problem — and **the accountability boundary sits high, at block 4**, because it is the differentiator and burying it wastes the only genuinely distinctive thing the page has to say.
- **Five genuinely different hero territories exist**, stress-tested in the correction pass on buyer comprehension. **Territory 1 is reframed as "Judged on the enquiries" and recommended — not approved.** **Territory 3 (measurement honesty) is explicitly recorded as the wrong lead** — Session 04 evidence says it is a proof principle, not a proposition — **Territory 4 belongs to the problem page**, and **Territory 5 is partly prohibited** because its name asserts that MappedSkills replaces three suppliers. **No sixth territory was invented.**
- **A reusable nine-move commercial-page pattern**, with mandatory and optional moves stated per page and per intent. **Identical structures are not forced where buyer intent differs.**
- **`/services` introduces capabilities positionally, under three groups — capture, convert, measure — never as a card grid of six.** Paid search, paid social and organic sit together as alternative demand sources.
- **Four structural separations keep the problem page from becoming `/conversion-optimization` with another title**, the load-bearing one being that **the page's own argument is that conversion work is the wrong fix in at least two of the four loss zones.**
- **A fourteen-row message consistency matrix**, plus the conditional manufacturing row, whose **prohibited-drift column is the operative guardrail for the copywriting session.**
- **`/faq` gets twelve recommended launch questions**, grouped, with an inclusion test — a real buyer has asked it, or it demonstrably stops a decision — and explicit prohibitions on SEO FAQ spam, definitions, service duplication and schema bait.
- **A six-type placeholder taxonomy** — OWNER INPUT · EVIDENCE · DECISION · VALIDATION · LEGAL REVIEW · TECHNICAL PREREQUISITE — with the rule that **a placeholder is never filled with a plausible default, and a gap is never written around so the missing fact stops being needed.**
- **A twenty-item message quality gate** with four named tests, complementing rather than replacing the approved content quality gate. **Both apply, in full, to every asset.**

### Owner inputs classified against copy
**Five BLOCK COPY:** the real delivery process · verified company facts · people and authorship · confirmed prices · the entry-offer model *(CTA wording only)*. **Ten proceed with placeholders. Four are not required yet.**

**The single most consequential line:** `/how-it-works` **cannot be written** — the delivery process is owner-blocked, and that page is the root dependency of the entire content programme.

### Session 10 orchestrator correction pass (2026-09-01)

A narrow orchestrator correction pass was applied within the same session. **The messaging architecture was not restarted, no research was performed, no scope was expanded, no page copy was written, no production code was touched, and no gate status was changed.** Three corrections:

**1. The approved buyer definition is no longer narrowed.** The internal positioning opened *"…businesses in India whose buyers are already searching…"*, making **findability in search an eligibility condition for the buyer**. It now reads to the approved definition — **considered-purchase businesses where each qualified opportunity has meaningful economic value, and where demand for what they sell already exists or can reasonably be reached.** India-first orientation is retained, existing buyer demand remains central to the acquisition story, **search remains the primary acquisition capability without being a test of market membership**, and **paid media is preserved as a legitimate route to that demand.** MappedSkills is **not** broadened into generic demand generation — demand capture, not creation, is unchanged. The same narrowing was corrected in Candidate B and in the expanded company explanation.

**2. Unproven engagement-model absolutes are removed.** *"One supplier owns the seams where enquiries are actually lost"* and *"acquisition, conversion and measurement are one engagement"* both went beyond what is currently supportable: **the real delivery process and engagement model are owner-blocked**, packaging and tiering are explicitly undecided in `OFFER_ARCHITECTURE.md` §9, and asserting that the loss *is* in the seams contradicts the approved four-zone diagnostic, whose credibility rests on not pre-judging the cause. The formulation is now: **the parts are connected rather than handed off, and the joins between them are somebody's job here.** A new `POSITIONING_MESSAGE_SYSTEM.md` §3.5 records **five prohibited absolutes** — every client buys all three · engagements cannot be scoped · MappedSkills replaces three suppliers · paid media is included by default · an engagement structure has been approved — with the counterpart that **the measurement is the part that is not optional**. Recorded as a binding rule in `MESSAGING_ARCHITECTURE.md` §5.

**3. The hero territory was stress-tested and reframed.** All five territories were tested on buyer comprehension, commercial relevance, differentiation, defensibility with today's proof, ability to bridge search + conversion + measurement, jargon avoidance and IA support — each now carrying its underlying buyer insight, what a visitor understands in about five seconds, its principal weakness and one illustrative headline direction. **The finding: Territory 1's content survived and its expression did not** — "accountable" is a governance word before a commercial one, and the original name sat one step from turning the approved outcome phrase into a slogan. **No strategic gap was revealed and no sixth territory was invented.** Territory 1 is reframed as **"Judged on the enquiries"**, with Territory 2's concrete opening as the supporting line; Territories 2–5 are placed rather than discarded.

**Preserved unchanged by the correction pass:** the message hierarchy · the company-message / search-landing-message rule · the primary value proposition and the other three supporting propositions · problem architecture · the outcome tiers · qualified-enquiry language · India-first rulings · capability and AI-search language · the claims ladder · voice and tone · the terminology dictionary and both language lists · the CTA system · the eight-block homepage sequence · the nine-move commercial-page pattern · every per-page message architecture · the placeholder taxonomy · the message quality gate · the frozen business strategy and every approved architecture.

**Files modified by the pass:** six documents in `docs/08-messaging/` — `POSITIONING_MESSAGE_SYSTEM.md`, `VALUE_PROPOSITION_ARCHITECTURE.md`, `HOMEPAGE_MESSAGE_ARCHITECTURE.md`, `MESSAGING_ARCHITECTURE.md`, `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` and `MESSAGE_CONSISTENCY_MATRIX.md` — plus the Session 10 handoff and this file. **No decision was approved, no decision-log entry was created, and no gate status was changed.**

### Session 10 method limitations (VERIFIED FACT)
- **No fresh research was performed.** Every language decision was derived from Sessions 01–09 artifacts with their original evidence labels intact.
- **No search volume, keyword difficulty, CPC, ranking, traffic, backlink, conversion-rate, benchmark or AI-citation figure was gathered or estimated, and none appears in any Session 10 artifact.** Existing figures are reproduced with their original scope, date and caveats.
- **No application code, configuration or content was read for modification, and none was changed. No build, lint or test was run. No page was rendered.**
- **No page copy, headline, tagline or meta title was written. No design was performed.**
- **No decision was approved and no gate status was changed.** Claude has no authority to change either.
- **The correction pass performed no research, wrote no copy, expanded no scope and created no decision-log entry.** Its only filesystem changes were within the Session 10 documentation paths.

## Session 11 — Page Copy Production (completed 2026-09-01)

**Status: PAGE COPY PRODUCTION — APPROVED. Quality Gate 9 (Page Copy Production) PASSED 2026-09-01, `DEC-014`.** Approval covers the page-copy system, copy standards, the approved routes' substantive copy, the homepage H1/direction and documented blocker handling — **it does not make any PARTIALLY BLOCKED, BLOCKED or CONDITIONAL route publication-ready.**

**Purpose:** turn the approved messaging architecture and the approved page briefs into actual page copy. **No strategy was restarted, no research was performed, no design was started, no route was added or removed, and no production code, configuration or content was changed.**

### Artifacts created
- `docs/09-content-pages/copy/` — **17 page-copy files**, plus `industries-manufacturing.md` as a **conditional record with no copy drafted**
- `docs/09-content-pages/PAGE_COPY_INDEX.md`
- `docs/09-content-pages/PAGE_COPY_AUDIT.md`
- `docs/00-project/handoffs/SESSION_11_PAGE_COPY_PRODUCTION.md`

### Copy statuses
- **FINAL-CANDIDATE (7)** — `/services` · `/seo` · `/ai-seo` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · `/problems/traffic-but-no-enquiries`. **Ready for orchestrator review; not approved, and several are sequence-blocked behind `/how-it-works`.**
- **PARTIALLY BLOCKED (7)** — `/` · `/google-ads` · `/pricing` · `/about` · `/contact` · `/schedule-call` · `/faq`
- **BLOCKED (1)** — `/how-it-works`. The real delivery process is owner-blocked, and **a methodology page describing an invented process would be fabricated proof**
- **CONDITIONAL (3)** — `/research` · `/blog` · `/industries/manufacturing`

**Not produced, and recorded as such:** the two research entries · the three unconditional launch articles · the conditional article · the five non-indexable routes, none of which has a page brief.

### Determinations worth recording in state
- **The homepage headline was determined inside the approved hero territory, not lifted from it.** Three options were drafted and critically compared; **Option A — *"Judge us on the enquiries, not the traffic."*** — is recommended. Option B fails the swap test; Option C reads as a promise of a result. **Not approved — selection is an owner and orchestrator decision**, and `DEC-013` item 2 already records that the territory phrase is not frozen as launch copy.
- **Every commercial page confirms its searched capability in the first screen, in the searcher's own word**, then bridges to the outcome within two sentences. No page delays confirmation to protect the positioning.
- **Zero claims at claims-ladder level E or F across the whole set.** No client outcome appears in any form, including anonymised.
- **No price, person, founding date, address, business hour or response time was invented anywhere.** Every missing fact carries a placeholder from the approved taxonomy, and no gap was written around so that a load-bearing fact stopped being needed.
- **`/lead-generation` publishes the qualified-enquiry definition in buyer language**, and it appears in full on no other page.
- **The problem page's five-check diagnostic is genuinely runnable without contact**, and two of its five findings point away from conversion work.
- **The attribution limitations are stated once, at full strength, on `/how-it-works`.** A draft of `/faq` that restated them was trimmed during the session's own audit.
- **Four defects were found and corrected inside the session** — a missing outcome bridge on `/conversion-optimization`, a missing boundary statement on `/social-media-ads`, the `/faq` duplication above, and two innocent uses of a prohibited superlative.

### Session 11 second-reader / orchestrator correction pass (2026-09-01)

A correction pass was run **within the same session, in a different role**: a skeptical second reading of every word of every copy file, instructed to distrust the session's own audit and summary until the sentences supported them. **No copy production was restarted, no research was performed, no approved document was modified, no production code was touched, and no gate status changed.**

**Orchestrator decisions applied:** the homepage H1 — *"Judge us on the enquiries, not the traffic."* — is **approved as a copy direction**, subject to the page surviving review · `/lead-generation` may use the query phrase in its H1 provided it bridges immediately to the outcome · **the conditional manufacturing page stays undrafted**, resolving the reported contradiction in favour of the approved `COPY_PLACEHOLDER_STANDARD.md` rule · `/thank-you` receives a dedicated copy artifact.

**What the second reading found, recorded because it matters more than the original pass's self-assessment:** the first pass **over-reported its own quality** — its audit recorded four defects, the second reading made **twenty-five substantive corrections**. The material ones were a **prohibited engagement-model absolute on `/services`** that the first audit claimed to have checked and passed; a **homepage hero that could pull the whole proposition towards SEO-only** and used "qualified enquiry" in the first screen against the approved terminology ruling; **three claims that went beyond their evidence**; **`/google-ads` printing a rejected company category in order to deny it**, which is a live risk given that this site's assertions are verifiably redistributed by AI systems; a **missing mandatory message move on `/lead-generation`**; and a **problem page with no honest "we cannot tell yet" outcome**, which has since gained one along with an outcome telling the reader to fix two findings themselves without hiring anyone.

**Revised statuses:** 7 FINAL-CANDIDATE · 8 PARTIALLY BLOCKED · 1 BLOCKED · 3 CONDITIONAL. **`/schedule-call` is recorded as structurally correct and substantively hollow** until its owner inputs arrive.

### Session 11 final orchestrator-directed check (2026-09-01)

A third, narrow pass was run on orchestrator direction: **no rewrite, no new positioning, no research.** It re-read the first screen and full copy of the seven FINAL-CANDIDATE pages plus the corrected homepage, against seven fixed tests — first-screen comprehension, category, claims, engagement model, terminology, swap and AI-writing.

**The one directed change: the ~0.28% AI-referral-traffic statistic was removed from `/ai-seo` and no replacement statistic was added.** The source was a vendor blog citing an unaudited third-party panel, and the page's argument does not depend on it. The page now sizes the opportunity qualitatively and states plainly that it will not publish a share figure it cannot stand behind. **The figure must not be reintroduced anywhere in page copy.** *(The Session 04 research record of that figure, elsewhere in this file, is evidence history and is unchanged.)*

**Four further corrections were made, all small:** `/social-media-ads` used "qualified enquiry" in its first screen where the approved ruling reserves it for pages that can explain qualification immediately · `/conversion-optimization` carried a stacked "not X, it is Y" construction · `/seo` repeated one rhetorical construction four times in body copy.

**All seven FINAL-CANDIDATE pages passed all seven tests after those corrections.** **Statuses were not upgraded**: every blocked and partially blocked page remains exactly as it was, because a review does not supply a missing owner fact.

**One standing rule recorded:** a claim carrying `[VALIDATION REQUIRED]` — currently Google's published statement, on `/ai-seo` and `/faq` — **remains documented but must not be represented as publication-ready evidence until it is re-verified.**

**Route counts unchanged** — 22 unconditional indexable, 2 conditional, 5 non-indexable. `/thank-you` is an existing non-indexable route and stays `noindex` and out of the sitemap.

### Contradictions reported rather than resolved
1. **The conditional vertical page.** The session brief's production sequence includes conditional pages; `COPY_PLACEHOLDER_STANDARD.md` §1 item 19 — approved at Gate 8 — states the two conditional assets are not written until the manufacturing gate clears. **Copy was not drafted**, a record file was created instead, and the conflict was referred to the orchestrator. **RESOLVED in the correction pass: the approved rule controls and the page stays undrafted until the gate clears.**
2. **`/thank-you`** had a launch content requirement and no page brief. **RESOLVED in the correction pass: drafted on orchestrator instruction, against the content requirement in `LAUNCH_CONTENT_INVENTORY.md` §3. PARTIALLY BLOCKED — the "what happens next" section is owner-blocked and was not filled with a default.**

### Production observation — recorded, not acted on (VERIFIED FACT)
Read-only inspection, performed solely to establish what must not migrate into new copy. **The prohibited "300%+ ROI" claim appears on at least seven production surfaces** — the homepage title and a homepage statistic block, the `/google-ads` title and a statistic block, statistic blocks on `/lead-generation`, `/about` (twice), `/how-it-works` and `/work`, and a hard-coded blog metadata description. The approved documentation records **the homepage title** only, so **the known exposure is materially wider than documented.** Separately, **the sitewide default title is *"MappedSkills - Performance Marketing for SaaS"*, carrying a rejected company-level positioning and a segment claim that contradicts the approved ICP.** **Remediation is an owner decision (`DEC-007`) and no production content was changed.**

### Session 11 method limitations (VERIFIED FACT)
- **No research was performed.** Every copy decision derives from Sessions 01–10 artifacts with their evidence labels intact.
- **No search volume, keyword difficulty, CPC, ranking, traffic, backlink, conversion-rate, benchmark or AI-citation figure was gathered, estimated or written.** Existing figures appear only with their original scope, date and caveats.
- **No production code, configuration, content or asset was modified. No build, lint or test was run. No page was rendered.** Production source was read only.
- **No design, layout, styling, component, typography or motion decision was made.** Where copy alone would be inefficient, the file notes *"visual explanation useful here"* and nothing more.
- **No approved upstream document was modified**, including `DECISION_LOG.md`, `QUALITY_GATES.md` and the existing page briefs.
- **No decision was approved and no gate status was changed.** Claude has no authority to change either.

## Session 12 — Creative / Art Direction (completed 2026-09-01)

**Status: CREATIVE / ART DIRECTION — APPROVED. Quality Gate 9A (Creative Direction) PASSED 2026-09-01 — see `DEC-015` in `DECISION_LOG.md`.**

**Purpose:** determine what the transformed MappedSkills website should look and feel like, strategically, **before** UX, page design, component design or implementation begins. **No strategy was reopened, no approved decision was altered, no page copy was changed, no route was added or removed, and no production code, configuration, content or asset was modified.**

### Artifacts created
- `docs/11-creative/` — **15 documents**: creative direction · visual research · competitor visual patterns · four creative territories · territory evaluation · recommended art direction · visual grammar · evidence design language · search/AI/conversion/measurement visual language · imagery, photography and illustration · motion and interaction · visual storytelling opportunities · responsive and accessibility principles · design anti-patterns · the proposed Gate 9A
- `docs/00-project/handoffs/SESSION_12_CREATIVE_ART_DIRECTION.md`

### The recommendation — APPROVED, Gate 9A, `DEC-015` (recorded below as a recommendation at the time it was made)
**T1 — "The Record".** The site behaves like the working record of a firm that measures things: kept, dated, revised in the open, and left available for inspection. Two typographic registers — a plain, commercially direct **argument** register leading every page, and an **apparatus** register carrying provenance, status, dates and limits. Structure from rules and space rather than cards. Light-first, warm, one accent, colour doing one job: distinguishing known from unknown. Explanatory weight carried by a small number of high-quality figures.

**The load-bearing idea:** provenance moves **out of the prose** into a persistent designed evidence layer — so the prose gets shorter (the owner's not-text-heavy requirement) while the honesty becomes *more* visible.

**Scored 90/100 overall and 30/30 on six load-bearing criteria**, against T2 "The Run" (65), T3 "The Standing" (64) and T4 "The Straight Answer" (58). **T1's two honest weaknesses are India-first register (3/5) and motion potential (3/5).**

**At the time this section was written, this was a recommendation only.** It was subsequently approved by the orchestrator on 2026-09-01 (`DEC-015`), together with the refined thesis recorded in the correction pass below — see the Gate 9A closure note at the end of this Session 12 section.

### Other recommendations, all PROPOSED ONLY
- **Visual metaphor:** one recurring figure — "the run", the continuous route from demand to qualified enquiry, with the accountability boundary, unmeasured stretches, unattributed arrivals and the client-data segment drawn on it. **Recommended AGAINST making it ambient or a brand device.**
- **Graphic motif:** the annotation tie, plus the dashed segment for honest absence. The tie is recommended to double as the focus indicator.
- **Photography: HIGHLY SELECTIVE** — named identified people and real specific places only; no stock, ever.
- **Illustration: LIMITED AND STRICTLY EXPLANATORY** — conventional illustration absent; the budget goes into five explanatory figures.
- **Iconography: MINIMAL AND FUNCTIONAL** — no capability icons, no icon-card grid.
- **Motion:** "motion resolves an uncertainty, or it does not ship"; the static state is the primary state.
- **22 visual storytelling opportunities** identified and classified against actual approved Session 11 copy — 12 already flagged by Session 11, 10 newly identified. **One (`/how-it-works` §2 stages) is BLOCKED and must not be designed** until the owner supplies the real delivery process.

### External research performed (VERIFIED FACT)
**17 websites loaded in a real browser and observed directly on 2026-09-01** — 11 references (deliberately weighted to research organisations, publications, documentation and search products rather than agencies) and 6 competitors already examined in Session 02.

**Method limits, recorded in the artifacts:** entry screens only in most cases; desktop only at 1440x900; one location, one date; **no consent banner was accepted or dismissed**; **no accessibility, performance or code inspection was run on any external site**; no colour value or font name was measured. A purposive sample supporting statements about convention and principle — **not** about prevalence or trend.

### Session 12 method limitations (VERIFIED FACT)
- **No build, lint or test was run. No page was rendered. No Lighthouse run, contrast measurement or accessibility audit was executed** — on MappedSkills' site or on any external site. Nothing in the artifacts is a compliance or performance assessment.
- **No production code, configuration, content or asset was modified.** Production source and styles were read only.
- **No page layout, wireframe, design system, component specification, final font, final colour value, type scale, spacing scale or grid definition was produced**, deliberately.
- **No search volume, ranking, traffic, conversion, benchmark or AI-citation figure was gathered, estimated or invented.**
- **No approved upstream document was modified**, including `DECISION_LOG.md`, `QUALITY_GATES.md`, the business documents, the IA, the CRO specification, the messaging system and all Session 11 page copy.
- **No decision was approved and no gate status was changed.** Claude has no authority to change either.

### Correction / stress-test pass (2026-09-01) — appended to the same session

**Scope:** T1 only. **The four-territory competition was not rerun, no fifth territory was created, no UX was begun, and no approved page copy was modified.**

**The finding.** The original T1 score of 3/5 on India-first appropriateness was correct and its diagnosis was incomplete. The defect was not register but **a genuine contradiction in the specification: the territory had a complete visual vocabulary for measurement and none for action.** A record of a firm that measures is a record of an observer; MappedSkills intervenes.

**The refined thesis — a RECOMMENDATION ONLY.**

> **THE RECORD — A WORKING RECORD, NOT AN ARCHIVE.** The site is the working record of a firm that **finds what is broken, fixes it, and records what changed**. **Commercial meaning leads every screen; the evidence stands beside it, always present and never in front.** Energy comes from consequence and contrast, never from colour, motion, scale or claim.

**Two new binding rules proposed:** *emphasis is commercial, presence is evidential* · *every page opens fast; no page opens slow.*

**Revised T1 scores — conditional on refinements R1–R10 being binding:** India-first appropriateness **3 → 4**; buyer comprehension **4 → 5**; total **90 → 92**. Commercial credibility unchanged at 5. **No other territory was rescored and the six load-bearing criteria are unchanged at 30/30.** If the refinements are not adopted, the original scores stand.

**Territory name:** retain **THE RECORD** with a binding qualifier (*a working record, not an archive*). Alternative if a rename is preferred: **THE WORKING RECORD**.

**Artifacts added (5):** `16_COMMERCIAL_ENERGY_SYSTEM.md` · `17_ARGUMENT_APPARATUS_HIERARCHY.md` · `18_HOMEPAGE_VISUAL_NARRATIVE.md` · `19_FIGURE_PRIORITISATION.md` · `20_CORRECTION_PASS_GOVERNANCE.md`. **Artifacts amended (8):** `01`, `04`, `05`, `06`, `08`, `12`, `14`, `15`, each with a dated revision note; **no original analysis, research record or score was deleted or rewritten.**

**Three findings recorded for the orchestrator at the time — status now updated:**

1. **Homepage copy concern — ACTED ON at Gate 9A closure (`DEC-015`).** The approved hero supporting line *"most of them never reach you"* was a second-person, unhedged quantity claim carrying no provenance, which `VOICE_AND_TONE.md` §12 and §8.1 prohibit. It appeared on `/` and `/services` and in `docs/08-messaging/HOMEPAGE_MESSAGE_ARCHITECTURE.md`. **The orchestrator authorised one narrow, explicitly scoped correction**, applied to exactly those files: corrected to *"There is buyer demand for what you sell, and some of it never reaches you."* The H1, hero territory and homepage messaging architecture were not reopened. See the Gate 9A closure note below.
2. **`DEC-007` exposure is component-level, not only page-level — still an owner decision, unresolved.** Read-only inspection found the prohibited claims **hard-coded inside `HeroDashboard` and `SocialProofStrip`**, which are imported by six routes; and `TestimonialCard` carries a `placeholder` prop rendering the literal string `Client Name`. Session 11 documented seven surfaces as page *content*; this is the mechanism beneath them. **The Gate 9A closure recorded a component classification (RETIRE / REPURPOSABLE-CONDITIONAL / NEUTRAL PRIMITIVE) as approved future implementation guidance. Remediation itself remains an owner decision under `DEC-007`. No production code was touched.**
3. **The directory collision, historically.** `docs/08-design/` and `docs/11-schema/` each held **one placeholder README and no substantive content**, with zero substantive inbound references. Recommendation: retire `08-design`, renumber `11-schema`, leave `11-creative` in place. **Approved as future housekeeping at Gate 9A closure (`DEC-015`); performed 2026-09-01 as a standalone documentation-directory hygiene reconciliation — see the note below.** `docs/08-design/` has been removed and `docs/11-schema/` moved to `docs/15-schema/`, contents unchanged.

### Gate 9A closure — 2026-09-01 (`DEC-015`)

**Gate 9A (Creative Direction) is PASSED.** The orchestrator approved: the creative territory **The Record**, qualified *"a working record, not an archive"*; the refined thesis above; the binding creative decisions (argument/apparatus hierarchy, Tier 1 figure prioritisation with its evidence constraints, India-first refinements R1–R10, the refined anti-pattern framework including the A19/A23 corrections, now binding on Gate 9B); the responder-portrait decision (approved in principle for `/contact` and `/schedule-call`, implementation BLOCKED on owner-supplied people/response-ownership information); the component-kit classification as approved future guidance with no code changed; and the directory-reconciliation recommendation as approved future standalone housekeeping, not executed now. **F17 (`/how-it-works` stages) remains BLOCKED.** One explicitly authorised narrow homepage/`/services` copy correction was applied, described above. **Before substantive Gate 9B work begins, the documentation-directory hygiene reconciliation must be performed as a standalone change.**

### Recorded, not resolved
`docs/11-schema/` already existed when `docs/11-creative/` was created as instructed, so two directories shared the `11-` prefix; `docs/08-design/` also existed as an empty placeholder overlapping this directory's purpose. **At the time Session 12 was written, nothing outside the permitted file set had been renamed, moved or modified; resolution was recorded as an orchestrator decision.** That decision was executed 2026-09-01 — `docs/08-design/` was removed and `docs/11-schema/` was moved to `docs/15-schema/`. See the note below.

---

## Session 13 — UX Architecture (completed 2026-09-01)

**Status: PROPOSED — AWAITING ORCHESTRATOR REVIEW. Gate 9B (UX) is NOT PASSED.**

*(The session ran 2026-09-01 into 2026-09-02; artifacts carry the session start date.)*

**Purpose:** translate the approved strategy, IA, CRO system, content strategy, messaging, page copy and creative direction into a coherent UX architecture — **before** visual design, component design or implementation begins. **No strategy was reopened, no approved decision was altered, no page copy was changed, no route was added or removed, and no production code, configuration, content or asset was modified.**

### Artifacts created
- `docs/16-ux/` — **20 documents**: UX architecture · primary user journeys · page-type architecture · homepage UX · commercial-page UX · problem-page UX · navigation architecture · CTA system · form and booking UX · evidence interaction UX · figure UX · responsive UX · accessibility requirements · performance-aware UX · search/discovery UX · page structure matrix · reusable UX patterns · UX anti-patterns · owner blockers and dependencies · the proposed Gate 9B
- `docs/00-project/handoffs/SESSION_13_UX_ARCHITECTURE.md`

**`docs/16-ux/` did not exist before this session.** It was created empty; nothing was overwritten and no directory collided.

### Determinations worth recording in state
- **The structural spine is shared and the middle varies.** Every indexable page runs OPEN → ESTABLISH → WORK → CHECK → ACT. **Thirteen invariants** bind all commercial pages; **variation is permitted only where driven by buyer sophistication, scepticism, misinformation or dispute risk — never by visual novelty or section-count parity.** `/social-media-ads` is deliberately the shortest page in the set and `/ai-seo` the longest.
- **Reader effort is treated as a designed budget.** The five apparatus visibility states are defined by what they cost the reader, and **limits are the one class that never costs anything and is never collapsible at any screen size.**
- **The problem page's diagnostic is static.** The four-cause figure carries no interaction; a **local, ungated, no-score outcome-recording affordance is permitted only on the five checks**, under eight binding constraints, and does not ship if any fails. **The three outcomes that point away from MappedSkills are protected by explicit rules** against demotion, collapse, reordering and adjacent CTAs.
- **The verified keyboard defect is fixed structurally:** the navigation dropdown parent is a link and the disclosure is a separate control, so `/services` becomes reachable from the header.
- **Screening outcomes are invisible to the visitor.** Qualified, unqualified, review-required and confident spam all receive the identical success state, and **no visitor-facing disposable-email message or additional field may exist** to support screening.
- **The evidence apparatus has four verbs — read, open, reach, cite — and one disclosure pattern sitewide**, which must work without JavaScript, keep its content in the DOM, and open in print.
- **F1 (the run) is one object across eight routes**, with seven emphases and one drawing. **F17 remains BLOCKED and nothing was produced for it** — no sketch, no prototype, no placeholder, no behavioural specification.
- **Route counts reconcile exactly to the approved IA and copy index** — 22 unconditional indexable, 2 conditional, 5 non-indexable, 29 / 27 totals. **No route was added, removed, renamed or reclassified.**
- **Two routes carry no blocker and should be built first:** `/problems/traffic-but-no-enquiries`, and `/research/{ai-visibility-baseline}` once named authorship exists.

### Contradictions reported rather than resolved
1. **The Gate 9B definition versus the Session 13 brief.** `QUALITY_GATES.md` requires wireframes and a component inventory for Gate 9B; the Session 13 brief explicitly prohibited both and directed UX architecture instead. **The session followed the brief.** Whether Gate 9B is satisfied by UX architecture (with wireframes and the component inventory moving to Gate 10) or is a two-part gate is **an orchestrator decision and was not made here.**
2. **`16_COMMERCIAL_ENERGY_SYSTEM.md` §5 R7 versus anti-pattern B16.** R7 requires phone and WhatsApp "persistent... sitewide"; B16 prohibits a sticky CTA on `/how-it-works`, `/research`, `/research/*`, `/blog` and `/blog/*`. **A reading is proposed — R7 means consistent presence at consistent weight, and B16 takes precedence — and it requires a recorded decision rather than a designer's judgement.**
3. **A copy-numbering artefact on the problem page.** `copy/problems-traffic-but-no-enquiries.md` numbers its sections 1, 2, 5, 6, 7, 8; the message pattern's moves 3 and 4 are **present in content**, folded into copy moves 2 and 1. **No content is missing.** This session has no authority to renumber approved copy and did not.

### Decisions requiring orchestrator approval
Six, each with a recommendation and its counter-argument: **(H1)** commercial pages route to `/contact` with context preserved rather than carrying an inline form · **(H2)** the header CTA leads to the form surface · **(H3)** the header does not stick on any page · **(H4)** the R7/B16 reading above · **(H5)** the problem page's optional recording affordance · **(H6)** Gate 9B's own scope. **A general gate pass should not be read as approving any of them.**

### Orchestrator correction / gate-scope reconciliation pass (2026-09-02)

**Scope:** the UX work was not restarted, no visual design was begun, no wireframe or high-fidelity UI was created, no code was implemented, and **Gate 9B was not marked passed.** **`QUALITY_GATES.md` and `DECISION_LOG.md` were not modified.**

**Artifacts added (9):** `21_ORCHESTRATOR_DECISIONS_H1_H5.md` · `22_F1_USAGE_TAXONOMY.md` · `23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md` · `24_HOMEPAGE_APPARATUS_DECISION.md` · `25_CONTACT_BOOKING_THANKYOU_RELATIONSHIP.md` · `26_OWNER_BLOCKED_STRUCTURE_RULE.md` · `27_GATE_9B_SCOPE_RECONCILIATION.md` · `28_WIREFRAME_SCOPE_AND_FIDELITY.md` · `29_UX_PATTERN_INVENTORY_SPEC.md`. **Artifacts amended (12)** by targeted revision note only, with no completed analysis rewritten: `01`, `04`, `05`, `06`, `07`, `08`, `09`, `11`, `16`, `17`, `19`, `20`.

**Corrections applied to Session 13's own output, recorded because they matter:**
1. **F1 was over-applied.** Session 13 claimed the run as one object across **eight routes**; the binding taxonomy reduces it to **six, of which three carry the full figure**, with **NONE as the default class a route must earn its way out of**. `/ai-seo`, `/google-ads` and `/social-media-ads` each already had their own justified figure.
2. **The homepage first-screen apparatus exception has no qualifying occupant at launch.** Seven criteria were defined and applied; the strongest unblocked candidate fails because its content is a number and it reports an observation rather than an act. **Launch default: zero apparatus above the fold.** The Gate 9A exception is preserved and unspent.
3. **R7's "persistent sitewide" wording** had been carried into two UX documents. **H4 supersedes it: B16 takes precedence, and direct contact is available, not omnipresent.**
4. **"Reserve the position, render nothing" was ambiguous** about whether a heading or container renders. **It does not.** Replaced by a three-way test with **no case C**.
5. **`/lead-generation`'s figure risked becoming a taxonomy** one step from the lead grading `B26` prohibits. It is now a **state at the chain's terminus**, keeping it a commercial promise-boundary.

**One consequence surfaced and recorded rather than resolved:** classifying every blocked slot shows that **five of the twenty-two unconditional routes are blocking today** — `/how-it-works`, `/pricing`, `/about`, `/contact`, `/schedule-call` — **and both conversion surfaces are among them.** This restates the approved position that the funnel is a launch prerequisite rather than a redesign deliverable; the omission rule does not soften it.

**Two items awaiting an orchestrator word:** whether H1's routing rule extends to commercial pages as read here, and whether Gate 9B may validate at structural width classes rather than numeric breakpoints, which are a Gate 10 artifact.

### Session 13 method limitations (VERIFIED FACT)
- **No research of any kind was performed.** Every decision derives from Sessions 01–12 artifacts with their evidence labels intact.
- **No user was observed, interviewed or tested.** Nothing in these artifacts is a usability finding; every statement about buyer behaviour traces to approved research or is labelled an inference.
- **No search volume, keyword difficulty, ranking, traffic, conversion, benchmark or AI-citation figure was gathered, estimated or written.**
- **No production code, configuration, content or asset was modified.** **Production source was not read in this session** — every technical fact used is quoted from the approved read-only Session 01/01B audit artifacts.
- **No build, lint or test was run. No page was rendered. No accessibility, performance or contrast measurement was executed.** Nothing here is a compliance or performance assessment, and no conformance claim is made.
- **No wireframe, layout, mockup, style frame, grid, breakpoint, type value, colour value or component specification was produced**, deliberately.
- **No approved upstream document was modified**, including `DECISION_LOG.md`, `QUALITY_GATES.md`, the business documents, the IA, the CRO specification, the messaging system, all page copy and all creative direction.
- **No decision was approved and no gate status was changed.** Claude has no authority to change either.

---

## Next Intended Phase

**Quality Gates 5, 6, 7, 8, 9 and 9A are PASSED (2026-09-01; `DEC-010`, `DEC-011`, `DEC-012`, `DEC-013`, `DEC-014`, `DEC-015`). Session 13 has delivered PROPOSED UX architecture for Gate 9B; Gate 9B is NOT PASSED and awaits orchestrator review.** **The approved documentation-directory hygiene reconciliation has been performed (2026-09-01)** — `docs/08-design/` retired (removed; the single placeholder README carried no substantive content) and `docs/11-schema/` moved to `docs/15-schema/`, contents unchanged; `docs/11-creative/` and `docs/08-messaging/` were left untouched. **That reconciliation did not itself begin Gate 9B; Session 13 did, and Gate 9B remains NOT PASSED.** **No visual design and no production implementation has started** — Session 13 produced UX architecture plus the Gate 9B low-fidelity structural wireframe set and UX pattern inventory (`docs/16-ux/30`–`51`); no mockup, style frame, grid, numeric breakpoint, type value, colour value, design system or component was produced.

**SESSION 11 — PAGE COPY PRODUCTION IS COMPLETE AND APPROVED (Gate 9 PASSED, `DEC-014`).** The orchestrator's independent review approved the homepage H1 as actual copy — *"Judge us on the enquiries, not the traffic."* — and the revised homepage supporting direction, approved substantive copy for `/services`, `/seo`, `/ai-seo`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization` and `/problems/traffic-but-no-enquiries`, and applied the twenty-item Message Quality Gate. **Gate passage is not publication readiness.** The homepage remains PARTIALLY BLOCKED; every other documented PARTIALLY BLOCKED, BLOCKED and CONDITIONAL status is unchanged, the removed ~0.28% AI-referral statistic stays removed, and Google's generative-AI/SEO claim stays `[VALIDATION REQUIRED]`. **One narrow correction was later applied at Gate 9A closure (`DEC-015`)** to an unsupported quantity claim in the homepage and `/services` hero support copy — see the Session 12 section for the exact wording.

**SESSION 12 — CREATIVE / ART DIRECTION IS COMPLETE AND APPROVED (Gate 9A PASSED, `DEC-015`).** **The next substantive phase was Gate 9B — UX, which has since begun and remains NOT PASSED (see the Current Phase section above).** The approved documentation-directory hygiene reconciliation (retire `docs/08-design/`; move `docs/11-schema/` → `docs/15-schema/`; leave `docs/11-creative/` in place) **was performed 2026-09-01 as a standalone governance/hygiene change**, ahead of Gate 9B. *(Statement as recorded at Session 12 close, 2026-09-01: no wireframe, mockup, style frame or design implementation had been produced and Gate 9B had not started. Superseded 2026-09-02 — the Gate 9B wireframe set now exists; no mockup, style frame or design implementation exists.)*

**The technical prerequisites remain the parallel priority** — a backend endpoint, durable enquiry storage, transactional email, analytics and the consent mechanism. They gate the own-site research entry, the worked example used on three pages, and every outcome claim.

**The copy phase is constrained by owner inputs and should be sequenced accordingly.** `/research/{ai-visibility-baseline}` is READY and requires no owner input or client permission; `/problems/traffic-but-no-enquiries` has no blocking owner input and sits on the most winnable surface in the programme. **`/how-it-works`, `/about`, `/contact` and `/pricing` must not be started until their owner inputs arrive.**

**Recommendation: scope the technical prerequisites early, and Session 09 strengthens the case.** The entire funnel specification is inert without them, and **the own-site research entry, the problem page's worked example and launch article 3 all depend on those fixes being shipped.** Fixing MappedSkills' own conversion and measurement layer is simultaneously a launch prerequisite, the hard precondition on every outcome claim, and the first available proof asset.

### Restrictions the next phase must respect
Carried forward, plus the Session 08 specification. **Added by Session 13, and binding on any later design or implementation phase:**

21. **Do not treat the proposed UX architecture as approved.** Gate 9B is NOT PASSED, and the six decisions recorded in the Session 13 section require explicit orchestrator approval — a general gate pass does not confer it.
22. **Do not design, sketch, prototype or specify F17** — the `/how-it-works` stage figure. It remains BLOCKED.
23. **Do not make proof a step, a gate, or a required interaction** anywhere in the UX, in any form.
24. **Do not make any limit collapsible**, at any screen size.
25. **Do not fill a blocked slot with a plausible default, and do not restructure a page so a missing load-bearing fact stops being needed.**

Original list:
1. **Do not reopen `DEC-005` or the approved IA.**
2. **Capabilities are not pages**; no page without a named query family and a reason to exist.
3. **Do not build anything in the DO NOT BUILD list** — 17 named rejections.
4. **The homepage must not rank for service terms** and must carry no technique category.
5. **`/work` stays `noindex`, out of navigation and out of the sitemap** until a permissioned case study exists.
5b. **Do not ship `/industries/manufacturing` or its supporting article** unless the manufacturing validation gate has cleared, and **never describe MappedSkills as a manufacturing agency.**
5c. **Do not make proof a required step** between a commercial page and the conversion.
5d. **Do not require one conversion mechanism.**
6. **Do not count a phone click, email click or CTA click as a qualified enquiry.**
7. **Do not fire a conversion event from a `/thank-you` pageview.**
8. **Do not put PII into analytics.**
8b. **Do not make attribution completeness a qualification condition**, and do not let an email-verification outage reject an enquiry.
8c. **Do not retain spam indefinitely, and do not send it to the CRM or to sales notifications.**
9. **Do not let a secondary integration failure lose an enquiry, and never show a false success.**
10. **Do not add form fields** without displacing one, and never re-add budget as required.
11. **Do not build nurture sequences, lead scoring or lifecycle automation** — outside the approved scope.
12. **Do not invent a conversion benchmark or a "before" figure.** Where data does not exist, write UNKNOWN.
13. **Do not publish a response-time SLA** until one has been measured.
14. **No page may promise revenue, guaranteed rankings, guaranteed AI citations or guaranteed enquiry counts**, or reuse "300%+ ROI", "₹100Cr+" or "₹10Cr+" (`DEC-007`).
15. **The homepage H1 is approved as actual copy** — *"Judge us on the enquiries, not the traffic."* (`DEC-014`), within the approved hero territory (`DEC-013`). Do not write alternative final homepage copy or taglines outside the approved territory, and do not treat the homepage's remaining PARTIALLY BLOCKED status as resolved.
16. **Do not let a capability rise to Level 1 of the message hierarchy** — not on the homepage, not on `/services`, not in any company description or external profile.
17. **Do not use GEO, AEO or LLMO as positioning**, in a title, heading, navigation label, meta description or CTA.
18. **Do not use "CRO" in body copy**, and do not use "leads" as MappedSkills' own outcome word.
19. **Do not fill a placeholder with a plausible default**, and do not reshape copy so a missing load-bearing fact stops being needed.
20. **The positioning statement, the hero territory and the homepage H1 are approved** (`DEC-013`, `DEC-014`). Do not treat any of them as open to reopening the underlying strategy. **Do not treat Gate 9 passing as publication approval for any PARTIALLY BLOCKED, BLOCKED or CONDITIONAL route** — see the Session 11 section and `DEC-014` for the preserved list.

### Actions that do not depend on the gates and should not wait for them
1. **The off-site listings, profiles and reviews programme** — Clutch, Semrush Agency Partners, GoodFirms, Google Business Profile. Directory sources appeared in **15 of 28** unbranded AI runs and gate the category SERPs and the Local Pack simultaneously.
2. **Fixing the conversion and measurement layer** — a working form with a real backend, a working booking path, analytics, enquiry-source capture, `/thank-you` wired up, and a consent mechanism.
3. **Collecting the owner inputs in `docs/05-content/OWNER_INPUT_REGISTER.md`.** Items 1–5 and 9 block content that cannot begin without them, and none of them requires a gate to be passed first.

### Owner actions that no Claude session can produce
1. **Which client results may be published**, with permissions. **The last remaining Session 02 owner blocker**; it gates all premium positioning and the `/work` indexation decision.
2. **Whether and when to remove or substantiate** "300%+ ROI", "₹100Cr+" and "₹10Cr+" in production (`DEC-007`). This also blocks the homepage title.
3. **Funding keyword tooling**, a second AI measurement round, and a healthcare SERP test.
4. **The entry-offer model decision** — free / paid / hybrid.
5. **Retrieving the server `.htaccess`** and the Contentful slug inventory, both of which gate the migration.
6. **Who owns enquiry response**, and the business hours to publish.
7. **Legal review** of consent, retention and WhatsApp follow-up.

### Gates
- **Gate 2 — PASSED** (2026-08-31).
- **Gates 1, 3 and 4** — artifacts delivered; conclusions consumed by the approved strategy; **not marked passed.** Orchestrator action.
- **Gate 5 — PASSED** (2026-09-01). See `DEC-010`.
- **Gate 6 — PASSED** (2026-09-01). See `DEC-011`.
- **Gate 7 — PASSED** (2026-09-01). See `DEC-012`.
- **Gate 8 — Messaging Architecture — PASSED** (2026-09-01, Session 10, including its correction pass). See `DEC-013`.
- **Gate 9 — Page Copy Production — PASSED** (2026-09-01, Session 11, including its correction pass). See `DEC-014`. **Approval is not publication readiness** — PARTIALLY BLOCKED, BLOCKED and CONDITIONAL routes are preserved unchanged.
- **Gate 9A — Creative Direction — PASSED** (2026-09-01, Session 12, including its stress-test/correction pass). See `DEC-015`. **This gate passing did not itself authorise Gate 9B (UX) work to begin.** The documentation-directory hygiene reconciliation this gate required first was performed 2026-09-01, as a standalone change — see below. **Gate 9B was subsequently worked in Session 13 and remains NOT PASSED.**
- **Gate 9B — UX — NOT PASSED** (Session 13, 2026-09-01, plus its correction / gate-scope reconciliation pass, 2026-09-02). **The UX architecture is substantively approved.** The gate remains open on five deliverables: low-fidelity structural wireframes · the UX component/pattern inventory · a cross-page consistency check · mobile structural validation · final validation against the durable criteria. **The durable definition was inspected read-only, not modified, and not weakened.** **Claude does not pass gates, and no gate status was changed.**
- **Gate 10 — UI / design system — NOT PASSED, IN PROGRESS (2026-09-03).** The **visual direction** is owner-approved (**THE ARRIVAL**, `DEC-017`); the Session 16 design system in `docs/22-design-system/` is **PROPOSED**. The Gate 9B-deferred **F2** and **F3** re-tests remain mandatory and have **not** been run against this direction. **Gates 11 onwards** — untouched, unapproached and not implied. See `QUALITY_GATES.md` for the numbering reconciliation.

## Status of the Two Session 01B Owner Confirmations
Both were addressed by the owner-supplied facts recorded above on 2026-08-31, within the limits of what the owner actually stated:
- **C1 (enquiries):** the owner states the contact form **has not been generating enquiries**. Recorded as an owner-supplied fact. Note the owner did not state that a delivery mechanism was tested, so the *technical* finding — the production form has no `action` and no `method` and transmits nothing — stands unchanged as the documented cause.
- **C8 (Contentful):** the owner states there are **no blog or case-study assets inside Contentful that must be preserved**. This resolves the **migration** question: there is no CMS content to protect. It does **not** by itself distinguish between an empty Contentful space and missing production credentials, so that root cause remains **UNKNOWN** and is a pre-launch engineering item rather than a strategy blocker.

## Open Items Explicitly Deferred (not gate-blocking)
Recorded so they are not lost, and judged safe to address during implementation rather than before strategy:
- `.htaccess` contents and host-level configuration review;
- why `www` is not normalised to the apex;
- cPanel environment-variable audit;
- Search Console verification status and property setup;
- Core Web Vitals and accessibility measurement;
- backlink inventory against the nine legacy redirect sources.

## Not Yet Approved
Approved and closed by Session 06: the fundamental business direction (`DEC-005`), the frozen business documents (`DEC-006`), the strategic rule on unsupported claims (`DEC-007`), and the page-targets-query rule (`DEC-008`).

**Approved 2026-09-01:** Quality Gate 5 (information architecture — the IA, page inventory, URL migration map, navigation, search architecture and funnel architecture), Quality Gate 6 (CRO architecture — the qualified-enquiry definition, form/booking spec, CTA system, page-type rules, attribution model, event taxonomy, CRM data contract, lifecycle and follow-up architecture), Quality Gate 7 (content architecture — the content strategy, launch content inventory, cluster architecture, editorial strategy, research strategy, AI citation principles, claims governance, content quality gate, and all 24 page, editorial and research briefs), Quality Gate 8 (messaging architecture — the corrected internal positioning, the hero strategic territory, engagement-model safeguards, default buyer-facing terminology, AI-search umbrella terminology, the prohibited/restricted language system, the claims ladder, and the twenty-item Message Quality Gate), and Quality Gate 9 (page copy production — the page-copy system, copy standards, approved substantive copy for `/services`, `/seo`, `/ai-seo`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`, `/problems/traffic-but-no-enquiries`, and the homepage H1 *"Judge us on the enquiries, not the traffic."* with its supporting direction), and Quality Gate 9A (creative direction — the territory "The Record" with its "a working record, not an archive" qualifier, the refined thesis, the argument/apparatus hierarchy, Tier 1 figure prioritisation, India-first refinements R1–R10, the refined design anti-pattern framework, the responder-portrait decision, and the component-kit classification). Recorded as `DEC-010`, `DEC-011`, `DEC-012`, `DEC-013`, `DEC-014`, `DEC-015`. **Gate 9 approval is explicitly not publication readiness** — see the preserved route statuses below. **Gate 9A approval did not itself authorise Gate 9B (UX) to begin.** The documentation-directory hygiene reconciliation Gate 9A required first was performed 2026-09-01 as a standalone change; **Gate 9B remains NOT STARTED regardless.**

Still **not** approved:
- Quality Gate 1 (existing site audit) — artifacts delivered, orchestrator review pending;
- Quality Gate 3 (search demand / SERP / commercial opportunity) — artifacts delivered, orchestrator review pending;
- Quality Gate 4 (AI visibility, citation & discovery baseline) — artifacts delivered, orchestrator review pending;
- **Quality Gate 9B (UX)** — UX architecture **substantively approved (2026-09-02)** and the six open decisions resolved; **the gate itself is NOT PASSED** pending low-fidelity wireframes and the UX pattern inventory. The width-class resolution for *"usable at target breakpoints"* awaits an orchestrator answer;
- Quality Gate 10 onwards — not started;
- **F17 (`/how-it-works` process-stage figure)** — remains BLOCKED, no sketch or placeholder;
- **implementation of a responder portrait or named human presence on `/contact` / `/schedule-call`** — approved in principle only, blocked until owner-supplied people/response-ownership information exists;
- **any component-kit change (retirement, repurposing or redesign of `HeroDashboard`, `SocialProofStrip`, `BeforeAfterMetric`, `TestimonialCard`, `StatCard`, `CaseStudyCard`)** — classification is approved future guidance only; no code was changed and the `DEC-007` remediation decision remains the owner's;
- **manufacturing as an exclusive or company-level specialisation** — it is candidate beachhead #1 only, gated on volume verification, a healthcare comparison, and one publishable industrial result;
- final offer names, packaging and the free/paid/hybrid entry model;
- final pricing;
- **publication of the PARTIALLY BLOCKED routes** (`/`, `/google-ads`, `/pricing`, `/about`, `/contact`, `/schedule-call`, `/faq`, `/thank-you`), **the BLOCKED route** (`/how-it-works`), and **the CONDITIONAL routes** (`/research`, `/blog`, `/industries/manufacturing`) — their copy status is unchanged by Gate 9 and remains gated on the documented owner inputs, the manufacturing validation gate, and technical prerequisites;
- **the two `[VALIDATION REQUIRED]` re-verifications on `/ai-seo` and `/faq`** (Google's published generative-AI/SEO position) — not publication-ready evidence until re-verified against the primary source;
- final information architecture, sitemap and URL architecture (proposed in Session 07, not approved);
- final keyword map and content plan (proposed in Session 09, not approved);
- international expansion, and any international SEO or location strategy;
- final design direction;
- the technical migration plan;
- any change to production code, content or configuration.
