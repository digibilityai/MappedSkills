# MappedSkills Website Transformation — Claude Operating Instructions

## Purpose
This repository is the source of truth for the MappedSkills website transformation program.

Claude must treat repository documentation as durable project memory. Conversation history is secondary and must not override approved project documentation.

## Core Operating Principle
Before doing any substantial work:
1. Read `docs/00-project/CONTEXT_INDEX.md`.
2. Read only the task-relevant documents listed there.
3. Read `docs/00-project/CURRENT_STATE.md`.
4. Read `docs/00-project/DECISION_LOG.md` when the task may be affected by prior decisions.
5. Inspect existing implementation before modifying it.

## Evidence Labels
All important project statements must be classified as one of:
- **VERIFIED FACT** — supported by repository inspection, first-party data, or reliable external evidence.
- **OWNER REQUIREMENT** — explicitly required by the project owner.
- **APPROVED DECISION** — approved and recorded in `DECISION_LOG.md`.
- **WORKING HYPOTHESIS** — plausible but not yet validated.
- **RESEARCH REQUIRED** — must be investigated before use in a strategic decision.
- **UNKNOWN** — insufficient information exists.

Never silently promote a hypothesis into an approved decision.

## Non-Negotiable Rules
- Do not invent search volumes, rankings, conversion rates, client results, testimonials, market size, AI citations, traffic, revenue, keyword difficulty, or competitor performance.
- Do not fabricate citations or sources.
- Preserve existing functionality, URLs, integrations, forms, APIs, and SEO equity unless a change is explicitly approved.
- Inspect before modifying.
- Prefer reusable systems and components over page-specific hacks.
- Do not make major strategic, design, IA, or technical changes beyond the current approved phase.
- Stop at approval gates.
- Do not claim tests passed unless they were actually run.
- Record meaningful approved decisions in `docs/00-project/DECISION_LOG.md`.
- Update `docs/00-project/CURRENT_STATE.md` when a phase materially changes.
- Use `docs/00-project/SOURCE_AND_EVIDENCE_POLICY.md` for research.
- At session end, use `docs/00-project/SESSION_HANDOFF_TEMPLATE.md`.

## Project Quality Areas
The final website must be engineered for:
- Google SEO
- technical SEO
- topical authority
- SEO-led customer acquisition
- AEO / GEO / AI-search discoverability
- AI visibility measurement across relevant systems
- strong Core Web Vitals
- very high page performance
- conversion optimisation
- service-specific landing pages
- coherent website funnels
- analytics and event tracking
- attribution readiness
- CRM and automation readiness
- structured data
- Open Graph and social metadata
- accessibility
- security
- privacy/consent
- responsive design
- cross-browser quality
- maintainability
- monitoring and regression testing

## Current Strategic Status
The emerging business direction is:
1. AI + Search Visibility
2. Conversion Rate Optimisation
3. Marketing Automation

Working customer journey:
**GET FOUND → CONVERT → AUTOMATE → GROW**

This is a **WORKING HYPOTHESIS**, not yet a final immutable business decision. It must be validated through market research, search opportunity research, competitive analysis, commercial analysis, and AI-visibility research.

## Role Boundaries
Claude may be assigned different specialist roles across separate sessions. Follow only the role and task scope in the current prompt.

The project orchestrator will decide:
- which role runs next;
- which Claude model is appropriate;
- when a new Claude session is required;
- which files must be read;
- whether an output passes the quality gate.

Claude should not autonomously advance into the next project phase unless explicitly instructed.
