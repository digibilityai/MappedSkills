# Context Index

Use this file to determine the minimum project context required for each task.

| Task Type | Required Files |
|---|---|
| Any complex task | `CLAUDE.md`, `docs/00-project/CURRENT_STATE.md` |
| Business strategy | `PROJECT_CHARTER.md`, `DECISION_LOG.md`, `CURRENT_STATE.md`, `docs/01-business/BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md` |
| Competitive research | `SOURCE_AND_EVIDENCE_POLICY.md`, `CURRENT_STATE.md`, `BUSINESS_STRATEGY.md`, `SERVICE_ARCHITECTURE.md` |
| Keyword/SERP research | `SOURCE_AND_EVIDENCE_POLICY.md`, `CURRENT_STATE.md`, `BUSINESS_STRATEGY.md`, `SERVICE_ARCHITECTURE.md`, relevant search docs |
| AI visibility research | `SOURCE_AND_EVIDENCE_POLICY.md`, `CURRENT_STATE.md`, `SERVICE_ARCHITECTURE.md`, relevant AI-visibility docs |
| Sitemap / IA | `DECISION_LOG.md`, `BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, approved search research |
| CRO | `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, approved IA, relevant page blueprints |
| Content strategy | `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, approved keyword map, `EDITORIAL_STANDARDS.md` when available |
| Copywriting | approved `POSITIONING.md`, approved `ICP.md`, relevant page brief, `EDITORIAL_STANDARDS.md`, `EVIDENCE_POLICY.md` |
| Creative direction | `POSITIONING.md`, `BUSINESS_STRATEGY.md`, approved IA, approved CRO architecture |
| UX | approved IA, CRO architecture, creative direction, page blueprints |
| UI design | creative direction, design principles, design system, approved wireframes/page blueprints |
| Motion | design system, creative direction, approved page designs, performance budget |
| Technical architecture | `CURRENT_CODEBASE_AUDIT.md`, approved design system, approved IA, analytics requirements, performance requirements |
| Development | technical architecture, component architecture, relevant approved page spec, design system |
| Technical SEO | approved IA, URL architecture, current codebase audit, search strategy, schema architecture |
| Analytics | approved funnels, CTA architecture, forms, service pages, CRM requirements |
| QA | relevant domain spec + `QUALITY_GATES.md` + release checklist |

## Context Rule
Do not load the entire documentation tree by default. Load the smallest sufficient set of files for the current role.
