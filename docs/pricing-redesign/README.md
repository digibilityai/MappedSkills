# /pricing redesign records

- `g1/`: approved design notes (`PR_G1_NOTES.md`), the approved G1 R0 mockup (`mockup/`), and its build and capture tools.
- `g2/`: implementation report (`PR_G2_REPORT.md`), verification script (`tools/verify.cjs`) and results (`checks.json`).

## Screenshots (kept outside Git)
The G1 and G2 review screenshots are kept outside Git, as for `/about`, `/how-it-works` and `/lead-generation`: in the project owner's local MappedSkills checkout, `docs/pricing-redesign/g1/screenshots/` and `docs/pricing-redesign/g2/screenshots/` (untracked). To regenerate: run `g1/tools/capture.cjs` (mockup) and `g2/tools/verify.cjs <localOrigin> <outDir>` (local production build).
