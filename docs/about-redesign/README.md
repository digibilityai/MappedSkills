# /about redesign records

- `g0/`: audit (`AB_G0_AUDIT.html`), decision register (`AB_G0_DECISIONS.md`), capture tool and measurements.
- `g1/`: approved design notes (`AB_G1_NOTES.md`), the approved mockup frozen at R4 (`mockup/`), its build and capture tools, and the R0 sources (`r0/`).
- `g2/`: implementation report (`AB_G2_REPORT.md`), verification script (`tools/verify.cjs`) and results (`checks.json`).

## Screenshots and visual evidence (kept outside Git)
The review screenshots (115 PNG files across G0, G1, R0 and G2) are kept outside Git, as for `/how-it-works` and `/lead-generation`. The review pages here show them only when opened from a checkout that has them.
- **Archive:** `AB_G0_G2_evidence_archive.zip` (stored uncompressed, 18,444,656 bytes; SHA-256 `55f3271a316f8e2e9f3fd98576b8e814e32d379b6f174e35c251fd92af3ebcea`), with `MANIFEST.sha256` inside and alongside. It was verified on creation with 0 mismatches.
- **Location:** the project owner's local MappedSkills checkout, `docs/about-redesign/` (untracked). The original files are also kept there, unchanged.
- To regenerate: run `g0/tools/capture.cjs` (live page), `g1/tools/capture.cjs` (mockup) and `g2/tools/verify.cjs` (local build).

## Release blockers
1. Real profiles for the four team heads: photograph, name, role and one-sentence introduction each.
2. Written photo consent from each person shown.

Until both are supplied, `TEAM_HEADS` in `components/cplus/about/content.ts` stays as four marked placeholders, and the page must not be released.
