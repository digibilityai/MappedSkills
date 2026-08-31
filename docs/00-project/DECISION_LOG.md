# Decision Log

Use this file only for meaningful project decisions.

## Template
### DEC-000
- **Date:** YYYY-MM-DD
- **Status:** Proposed / Approved / Rejected / Superseded
- **Decision:**
- **Reason:**
- **Evidence:**
- **Impacted files:**
- **Supersedes:**
- **Approved by:**

---

### DEC-001
- **Date:** 2026-08-30
- **Status:** Approved
- **Decision:** Run the website transformation as a documentation-first, multi-session Claude program with ChatGPT orchestrating and reviewing specialist execution.
- **Reason:** Reduce context drift, improve quality control, and make long-running work token-efficient.
- **Evidence:** Owner operating requirements.
- **Impacted files:** `CLAUDE.md`, all project documentation.
- **Supersedes:** Ad-hoc single-session website redesign approach.
- **Approved by:** Project owner.

### DEC-002
- **Date:** 2026-08-30
- **Status:** Approved
- **Decision:** Repository documentation, not Claude conversation history, will be the durable source of project context.
- **Reason:** Avoid long-session context bloat and memory inconsistency.
- **Evidence:** Owner operating requirements.
- **Impacted files:** `CLAUDE.md`, `CONTEXT_INDEX.md`, `SESSION_HANDOFF_TEMPLATE.md`.
- **Supersedes:** None.
- **Approved by:** Project owner.

### DEC-003
- **Date:** 2026-08-30
- **Status:** Approved
- **Decision:** Initial Claude work must audit the existing website/codebase before redesign or implementation.
- **Reason:** Existing routes, functionality, integrations, SEO equity, and architecture must be understood and protected.
- **Evidence:** Owner requirement to preserve existing website structure/functionality unless justified.
- **Impacted files:** future `CURRENT_CODEBASE_AUDIT.md`.
- **Supersedes:** Starting with visual design before codebase audit.
- **Approved by:** Project owner.

### DEC-004
- **Date:** 2026-08-30
- **Status:** Proposed / Not Yet Final
- **Decision:** Evaluate MappedSkills around three pillars: AI + Search Visibility, CRO, and Marketing Automation.
- **Reason:** Potential focus, scalability, SEO acquisition opportunity, and service expansion path.
- **Evidence:** Strategic discussion only; requires market and search validation.
- **Impacted files:** business, search, content, IA.
- **Supersedes:** Broader performance/revenue-marketing architecture if later approved.
- **Approved by:** Not yet final.
