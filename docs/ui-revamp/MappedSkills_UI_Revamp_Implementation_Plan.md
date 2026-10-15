# MappedSkills UI Revamp --- Implementation Plan

> **OWNER ANNOTATION — GATE 0 CLOSURE, 2026-10-08.** The original text below is unchanged.
>
> - **Gate 0 is closed** (`DEC-033`); see `docs/ui-revamp/GATE_0_BASELINE_AUDIT.md` §24.
> - **Gate 1** directions are evolutionary directions **within THE RESOLVE** (`DEC-029`). Use the `DEC-018`/`DEC-022`
>   approved intent as the baseline, **not** the `1557f74` regressions (`DEC-030`).
> - Design proof without client figures (`DEC-031`). Approved positioning governs (`DEC-032`).
> - **Before any Gate 4–9 work and before any merge to `main`, read
>   `docs/ui-revamp/PROGRAMME_RISKS_AND_LIVE_ISSUES.md`.**
>   - `LIVE-1` and `LIVE-2` are live defects with their own authorisation path.
>   - `PROC-1` means a push to `main` currently deploys to production.

## Purpose

This is the execution companion to the **MappedSkills UI Revamp Master
Handoff**. The Master Handoff defines what may change, what is protected
and the quality bar. This plan defines how the programme is executed.

The operating model is **workstream-level execution**: enough autonomy
to finish a logical class of work across the site, with strict
boundaries between workstreams.

## Required Programme Sequence

**Audit → Design System → Representative Pages → Approval → Global
Workstreams → Responsive QA → Visual Polish → Regression → Staging →
Production**

Do not skip the representative-page approval gate.

## Core Execution Rule

A prompt represents a **complete logical type of work**, not a
micro-task.

Correct: complete typography across the entire relevant website.

Incorrect: separately prompt homepage H1, service headings, card labels
and mobile font sizes.

Claude must inspect every relevant page, component, token, stylesheet
and breakpoint required to complete the current workstream.

## Vertical Autonomy, Horizontal Discipline

**Vertical autonomy:** within the approved workstream Claude may inspect
the full codebase, modify many files, refactor shared primitives,
consolidate duplicated styles, update tokens/components, resolve routine
inconsistencies, make implementation decisions, validate responsive
implications and run relevant checks.

**Horizontal discipline:** Claude must not drift into adjacent
workstreams. Record adjacent opportunities for later instead of
implementing them.

## Workstream Completion Contract

Before reporting completion Claude must: - Inspect the entire relevant
site scope. - Identify shared primitives/tokens/components before local
fixes. - Implement across every applicable instance. - Resolve routine
inconsistencies within the workstream. - Check desktop/tablet/mobile
implications. - Run appropriate build/lint/type/test checks. - Visually
inspect representative and exception pages. - Protect locked strategy,
copy, SEO, analytics, integrations and conversion architecture. -
Document intentional exceptions. - Stop cleanly at the workstream
boundary.

## Status Vocabulary

**COMPLETE:** relevant scope implemented and validated without material
unresolved exception.

**COMPLETE WITH EXCEPTIONS:** substantially complete with clearly
documented justified exceptions.

**BLOCKED:** cannot safely complete without a decision, dependency,
conflict resolution or approval.

"PARTIALLY COMPLETE" should not be a normal stopping point.

## Gate 0 --- Baseline & Audit

Audit the entire repository and implementation: architecture,
framework/dependencies, design primitives, typography, colour, spacing,
layout, components, page families, navigation, footer, forms,
proof/case-study patterns, responsive behaviour, motion, accessibility,
performance, analytics/tracking, SEO-sensitive implementation,
integrations, build/test tooling and UI-relevant technical debt.

Capture representative baseline screenshots where practical and
establish a clean Git baseline.

**Constraint: Audit only. No design changes.**

Deliver: architecture summary, visual-system map, page-family map,
reusable-component map, responsive findings, motion findings,
high-impact UI weaknesses, technical constraints, protected areas,
performance/accessibility risks, legacy inconsistencies, ranked
opportunity map and genuine blockers/questions.

Finish with **Gate 0 Status: COMPLETE / COMPLETE WITH EXCEPTIONS /
BLOCKED** and readiness for Gate 1.

## Gate 1 --- Design System Proposal

Develop **2--3 coherent visual + motion directions**. Each should define
typography, colour/surfaces, layout/grid, spacing, components,
proof/data treatment, imagery/illustration, navigation, responsive
implications, motion language and technical/performance implications.
Recommend one. Do not globally implement it.

## Gate 2 --- Representative Page Prototype

Implement the selected direction on: 1. Homepage 2. Services page 3. One
detailed service page

Together prove brand expression, navigation, hero treatment, conversion,
service explanation, proof/metrics, long-form content, reusable
components, footer, responsive behaviour and at least one meaningful
motion prototype.

## Gate 3 --- Direction Approval

This is a **hard human approval gate**. Do not proceed globally until
the representative pages and motion direction are explicitly approved.
Incorporate feedback into the design system rather than patching
prototype pages independently.

## Gate 4 --- Global Workstreams

### 4A --- Typography System

Complete typefaces/font loading, scale, heading/body hierarchy, labels,
navigation, buttons, metrics, quotes, captions, line-height, weight,
letter spacing, measure, responsive typography and wrapping globally.

### 4B --- Colour & Surface System

Implement brand/text colours, backgrounds, surfaces, cards, borders,
dividers, interactive/form/focus states, data/proof surfaces and
contrast globally.

### 4C --- Spacing & Layout System

Implement containers, max widths, grids, columns, gutters,
section/component spacing, alignment, content measure, vertical rhythm
and responsive spacing/breakpoints globally.

### 4D --- Navigation & Global Chrome

Implement header, primary navigation, dropdowns where applicable, mobile
navigation, persistent/global UI, footer, global CTA surfaces and
utilities.

### 4E --- Component System

Consolidate buttons, links, cards, forms, CTAs, metrics, testimonials,
proof blocks, accordions, tabs, labels, badges and recurring patterns.
Prefer reusable primitives where they improve maintainability without
over-abstraction.

### 4F --- Page Composition

Apply the approved system to remaining page families by communication
purpose, not by copying one template everywhere. Preserve page purpose,
approved content intent, conversion logic, SEO-critical content and
required section relationships.

### 4G --- Proof & Data Presentation

Complete case studies, verified results, metrics, before/after
comparisons, testimonials, credibility indicators, methodology evidence
and data visualisation. Never fabricate proof; keep context attached to
numbers.

### 4H --- Motion System

Implement micro-interactions, hover/focus transitions, navigation
motion, meaningful scroll reveals, data/performance motion, approved
signature moments, reduced-motion behaviour, mobile adaptations and
performance safeguards.

## Gate 5 --- Site-Wide Responsive Visual QA

Inspect representative behaviour at **1440, 1024, 768, 430, 390 and
360px** across page families. Review hierarchy, wrapping, spacing,
alignment, overflow, density, CTA/proof visibility, navigation, forms,
motion, section length, footer and touch usability.

## Gate 6 --- Visual Polish

Perform one bounded convergence pass: optical alignment, fine spacing,
wrapping, border/radius consistency, icon alignment, interaction timing,
section transitions, small compositional refinements and edge-case
cleanup. Do not introduce a new visual direction.

## Gate 7 --- Regression

Validate navigation, mobile navigation, forms/validation/submission,
conversion journeys, WhatsApp/phone/email/booking/external links,
GTM/analytics consent/events/UTM behaviour,
metadata/headings/canonicals/schema/crawl/internal links, accessibility,
existing build/lint/typecheck/tests/production verification, performance
risks and integrations.

## Gate 8 --- Staging Approval

Deploy the approved branch to staging and review against the Master
Handoff, approved direction, representative-page approval, responsive QA
and regression. Do not use production as staging.

## Gate 9 --- Production

Establish a rollback point; confirm release commit, environment
configuration, production build, regression status and staging approval.
After release, smoke-test critical routes, navigation, conversion
surfaces, analytics/consent and responsive basics.

## Git and Checkpoint Discipline

Recommended checkpoints: clean baseline; representative-page prototype;
one checkpoint per global workstream; responsive-QA completion; polish
completion; regression-approved state; pre-production release/rollback
point.

Use system-level commit messages. Never blindly reset or discard
unrelated concurrent work. If concurrent changes create material
conflict risk, stop as BLOCKED.

## Reusable Workstream Prompt Template

> **WORKSTREAM: \[NAME\]**
>
> Read and obey the MappedSkills UI Revamp Master Handoff and
> Implementation Plan before editing.
>
> Complete this workstream end-to-end across the entire relevant website
> scope. Inspect the full codebase for every page, component, token and
> breakpoint affected by this workstream. Make all routine
> implementation decisions needed to achieve the approved design
> direction consistently.
>
> Do not stop after individual files, components or pages. Do not ask
> for approval for routine decisions that fall inside the approved
> system.
>
> Stay strictly inside this workstream. Do not redesign or implement
> adjacent workstreams. Record adjacent opportunities for later rather
> than acting on them.
>
> Protect all LOCKED strategy, copy, SEO, analytics, conversion
> architecture, backend behaviour and integrations unless explicit
> approval says otherwise.
>
> Before reporting completion: validate the full relevant scope, run
> appropriate repository checks, inspect desktop/tablet/mobile
> implications, resolve routine inconsistencies, and document any
> intentional exceptions.
>
> Finish with exactly one status: **COMPLETE, COMPLETE WITH EXCEPTIONS,
> or BLOCKED**. Summarise what changed at system level, validation
> performed, exceptions/risks, and the recommended next approved
> workstream.

## When Claude Must Stop and Ask

Stop when a requested change touches a LOCKED area; repository evidence
conflicts with an approved decision; a material new dependency affects
performance/maintenance; a meaningful business/UX trade-off cannot be
resolved; concurrent changes create merge risk; a critical test fails
outside the workstream and proceeding risks damage; or genuinely
required information/credentials are missing.

Routine implementation choices inside the approved workstream are not
reasons to stop.

## Gate 0 Starting Instruction

The first Claude Code assignment is **Gate 0 --- Baseline & Full-Site UI
Audit**. Read both controlling documents and relevant repository
documentation, inspect the entire current implementation, establish the
baseline and produce the audit deliverable.

**Do not implement visual changes during Gate 0.**

## Programme Completion Standard

Complete only when the approved visual/motion system is implemented
globally; relevant page families are reviewed; responsive QA and polish
are complete; regression is clean; staging is approved; production
deployment succeeds; and production smoke testing succeeds.

## Final Operating Principle

**Claude should think broadly within the current workstream, finish
deeply, validate rigorously, and stop cleanly at the boundary.**
