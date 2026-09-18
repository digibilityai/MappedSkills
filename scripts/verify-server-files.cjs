/**
 * Fails fast with a clear message when the server tree is incomplete.
 * "Can't resolve '@/components/Hero'" almost always means components/ was not uploaded.
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
// REPOSITORY RECONCILIATION (2026-09-18). This list used to name
// `components/Hero.tsx`, `StatCard.tsx`, `TeamCard.tsx`, `Section.tsx` and
// `Container.tsx` — one-line re-export shims that NOTHING imports. A canary
// built on dead files proves nothing about whether the tree can run, and it
// kept those dead files alive, because deleting them failed `prebuild`.
// Every entry below is load-bearing: an entrypoint, the build configuration,
// the root layout and homepage, the enquiry API and its persistence layer,
// and the shared chrome every route renders.
const required = [
  "package.json",
  "package-lock.json",
  "server.cjs",
  "app.js",
  "tsconfig.json",
  "next.config.mjs",
  "app/layout.tsx",
  "app/page.tsx",
  "app/api/enquiry/route.ts",
  "lib/db.ts",
  "lib/enquiries.ts",
  "lib/enquiry-validation.ts",
  // SESSION 34 — PHASE I CLOSURE. Was "lib/constants.ts" (deleted dead code
  // carrying claims DEC-007 prohibits); repointed at a file every route imports.
  "lib/metadata.ts",
  "components/layout/Header.tsx",
  "components/layout/Footer.tsx",
  "components/layout/Container.tsx",
];

const missing = required.filter((rel) => !fs.existsSync(path.join(root, rel)));

console.log("");
console.log("=== Deploy file check ===");
console.log("cwd:", root);
console.log(
  "top-level:",
  fs
    .readdirSync(root)
    .filter((n) => !n.startsWith(".") || n === ".next" || n === ".env.local")
    .join(", ")
);

if (missing.length) {
  console.error("");
  console.error("MISSING FILES (" + missing.length + "):");
  for (const rel of missing) {
    console.error("  - " + rel);
  }
  console.error("");
  console.error("This is an incomplete upload — not a Next.js config bug.");
  console.error("Fix:");
  console.error("  1. On your PC run: npm run pack:cpanel");
  console.error("  2. Upload mappedskills-cpanel-*.zip into THIS directory");
  console.error("  3. Extract so 'app' and 'components' are siblings here");
  console.error("  4. Run: npm install");
  console.error("  5. Do NOT run npm run build on this host — restart Node with server.cjs");
  console.error("");
  process.exit(1);
}

console.log("OK: required source files are present.");
console.log("");
