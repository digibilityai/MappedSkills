# MappedSkills UI Revamp --- Master Handoff

> **OWNER ANNOTATION — GATE 0 CLOSURE, 2026-10-08.** The original text below is unchanged. Where it is ambiguous,
> these recorded decisions govern (`docs/00-project/DECISION_LOG.md`):
>
> - **`DEC-029`** — THE RESOLVE (`DEC-018`/`DEC-022`) is the foundation. Gate 1's "2–3 directions" are **evolutionary
>   directions within it**. They may substantially elevate presentation, but must not replace the identity or reopen
>   strategy, positioning, service taxonomy, conversion, SEO or analytics architecture.
> - **`DEC-030`** — the UI changes in commit `1557f74` (2026-10-05) are **unapproved regressions**. They are not the
>   baseline. They are corrected inside their workstreams, not reverted wholesale.
> - **`DEC-031`** — `DEC-012` governs proof. **No client performance figures are available**, so none may be invented,
>   restored or implied, including in prototypes. "Data/performance motion" below may use only verified, scoped
>   evidence.
> - **`DEC-032`** — "Business Context" below is contextual description, **not** a service list. Approved positioning
>   (`DEC-005`) and the service taxonomy (`docs/01-business/SERVICE_ARCHITECTURE.md`) govern. Standalone web development
>   and social media management remain **excluded** service lines.
> - **`DEC-033`** — Gate 0 is closed. Live issues and process risks: `docs/ui-revamp/PROGRAMME_RISKS_AND_LIVE_ISSUES.md`.
>   **Do not merge to `main` while `PROC-1` is open.**
> - Baseline evidence: `docs/ui-revamp/GATE_0_BASELINE_AUDIT.md`.
> - The `.pdf` copies of this document carry no annotation. **This `.md` file governs.**

## Purpose

This is the controlling design and quality handoff for the MappedSkills
UI revamp. The programme elevates the existing website; it is not a
redesign from scratch.

**Core principle: Preserve strategy. Elevate presentation.**

## Primary Objective

The finished website should communicate strategic competence, analytical
thinking, performance accountability, digital sophistication, trust and
clarity. It should remain recognisably MappedSkills while feeling
substantially more sophisticated, deliberate and credible.

## Business Context

MappedSkills operates across performance and digital marketing: paid
advertising, Google and Meta advertising, lead generation, social media,
websites, analytics, strategy and conversion optimisation. Its visual
language should draw meaningfully from measurement, optimisation,
experimentation, conversion, growth, signals, data and decision-making.

> **Annotation (`DEC-032`, 2026-10-08):** the paragraph above describes context, not approved service lines.
> "Websites" and "social media" do **not** authorise web development or social media management as services. Both are
> excluded by `SERVICE_ARCHITECTURE.md`. Paid social is an optional acquisition channel only.

## Source-of-Truth Hierarchy

1.  Latest explicitly approved decisions
2.  Current-state documentation
3.  Latest approved handoff
4.  Implemented production behaviour
5.  Older documentation

Do not resurrect superseded ideas merely because they remain in the
repository.

## Locked Areas

Do not materially change without explicit approval: overall information
architecture; page purpose; approved conversion journeys; approved
positioning and messaging; core approved copy; SEO-critical content;
URLs and route intent; service taxonomy; major approved section
sequencing; lead-generation mechanisms; tracking and analytics;
integrations; backend behaviour and data contracts.

## Areas to Elevate

Actively improve typography, spacing, grids, section composition, visual
hierarchy, navigation presentation, buttons, CTAs, cards, borders,
surfaces, backgrounds, colour application, iconography, imagery,
illustration, data visualisation, proof, case studies, testimonials,
metrics, interaction states, hover behaviour, transitions, animation,
responsive composition, mobile presentation, section transitions and
footer presentation.

## Design Quality Bar

Avoid generic AI-site tropes: purple/blue glows, excessive
gradients/glassmorphism, endless rounded cards, repetitive equal grids,
meaningless huge hero text, floating blobs, excessive pills, random icon
boxes, fake dashboards/data and pointless animation.

Prefer strong typography, intentional whitespace, disciplined grids,
contrast, controlled asymmetry, hierarchy, editorial composition,
meaningful proof/data presentation, thoughtful interaction and
restraint. The design should feel intentionally made for MappedSkills.

## Performance-Marketing Visual Language

Where useful, draw from dashboards, measurement, funnels, attribution,
optimisation, experimentation, conversion, growth, signals, data and
decision-making. These should support comprehension rather than become
decorative clichés.

**Never fabricate performance data.** Any result presented as proof must
be verifiable.

## Proof and Credibility

Make verified outcomes, case studies, testimonials, methodology and
evidence easy to discover. Visually distinguish claim, evidence, context
and outcome.

## Design System First

Before global rollout establish an approved system for typography,
spacing, layout, colour, surfaces, components, interaction, motion and
responsive behaviour. Avoid page-by-page styling that creates unrelated
decisions.

## Responsive Design

Responsive design is part of the design, not a final compression
exercise. Validate at 1440px, 1024px, 768px, 430px, 390px and 360px.
Mobile must be intentionally composed rather than merely stacking
desktop sections. Review hierarchy, wrapping, spacing, density,
navigation, CTA/proof visibility, section length, motion, footer
behaviour and overflow.

## Motion Design System

Motion is a formal part of the system. Its language is **Performance ·
Optimisation · Progress · Measurement · Precision · Clarity**.

Use four layers: 1. **Micro-interactions** --- buttons, links,
navigation, forms, tabs, accordions, cards, hover/focus and interactive
data. 2. **Scroll storytelling** --- selectively for funnels,
optimisation, methodology, before/after, case-study progression,
measurement and decision flows. 3. **Data/performance motion** ---
animate verified metrics only when it improves comprehension. Never
imply unsupported results. 4. **Signature motion** --- approximately
2--3 memorable moments, such as Signal → Analysis → Optimisation →
Growth or Traffic → Measurement → Decision → Performance.

Create consistent timing categories such as Instant, Fast, Standard and
Expressive. Prefer transform and opacity. Before adding GSAP,
Motion/Framer Motion, Lenis, Lottie, WebGL or Three.js, prove the
dependency is justified.

Respect `prefers-reduced-motion`. Motion must not block navigation,
delay essential content or impair readability. Reduce heavy motion on
mobile. Avoid constant floating objects, excessive parallax, scroll
hijacking, gratuitous cursor effects, excessive text animation, repeated
generic fade-ups, unnecessary loading sequences and readability-reducing
animated backgrounds.

Each visual direction must include a corresponding motion direction and
at least one representative motion prototype before global approval.

## Performance

Treat performance as a design constraint. Pay attention to animation
JavaScript, large images/video, third-party libraries, fonts, layout
shifts, main-thread work, mobile performance and Core Web Vitals. Prefer
progressive enhancement.

## Accessibility

Maintain or improve semantic structure, keyboard usability, focus
visibility, contrast, touch targets, screen-reader clarity,
reduced-motion behaviour, forms and meaningful alternative text.

## SEO Protection

Do not casually change search intent, URLs, canonical behaviour,
metadata, heading semantics, structured data, crawlability,
internal-link intent or SEO-critical copy.

## Analytics, Tracking and Conversion Protection

Do not break or silently alter Google Tag Manager, GA4-related
configuration, consent behaviour, UTM handling, conversion events, lead
forms, WhatsApp/phone/email links, booking links or integrations.

## Development Environment

Use: **production/main → local repository → dedicated UI branch → local
implementation → QA → staging → production**. Do not experiment directly
on production. Use `ui-revamp`.

## Programme Phases

0.  Repository and design audit
1.  Visual/design-system directions
2.  Representative-page implementation
3.  Visual iteration and approval
4.  Systemisation
5.  Site-wide rollout
6.  Visual QA
7.  Functional regression
8.  Staging
9.  Production

## Change Classification

**SAFE:** routine implementation inside the approved
direction/workstream.

**REVIEW:** meaningful UX, technical, performance, maintenance or
business implications requiring review.

**LOCKED:** approved strategy, content intent, SEO, analytics,
conversion architecture, backend behaviour, integrations or other
protected areas; do not proceed without explicit approval.

## Representative Pages

Before site-wide rollout, prove the system on the Homepage, Services
page and one detailed service page. Together they must demonstrate brand
expression, navigation, conversion, service explanation, proof,
long-form content, responsive behaviour and at least one meaningful
motion prototype.

## First Task

The first task is **audit only**. Inspect the repository and current
implementation comprehensively. Establish the baseline; identify
design-system inconsistencies, page families, reusable components,
responsive issues, motion opportunities, technical constraints and
risks. Do not begin redesign implementation until the audit is complete.

## Success Standard

Desired reaction: **"This is clearly the same MappedSkills strategy,
content and website --- but it now feels dramatically more
sophisticated, deliberate and credible."**

Undesired reaction: **"Claude replaced MappedSkills with a different
generic template."**
