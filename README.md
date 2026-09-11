# MappedSkills Context Pack

This pack contains the initial repository-level documentation for orchestrating the MappedSkills website transformation with Claude Code.

## Installation
Copy:
- `CLAUDE.md`
- `docs/`

into the **root of the existing MappedSkills website repository**.

The resulting structure should resemble:

```text
mappedskills/
├── CLAUDE.md
├── package.json
├── src/ or app/
├── public/
└── docs/
```

Do not run Claude from inside `/docs` or `/src`.

Run Claude Code from the repository root so it can inspect both the project documentation and the existing implementation.

## Current Stage
Foundation only.

The next Claude session should perform a **read-only current website/codebase audit**. It should not redesign or modify production code.
