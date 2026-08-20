/**
 * Fails fast with a clear message when the server tree is incomplete.
 * "Can't resolve '@/components/Hero'" almost always means components/ was not uploaded.
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const required = [
  "package.json",
  "server.cjs",
  "tsconfig.json",
  "next.config.mjs",
  "app/page.tsx",
  "components/Hero.tsx",
  "components/Section.tsx",
  "components/Container.tsx",
  "components/StatCard.tsx",
  "components/TeamCard.tsx",
  "components/sections/Hero.tsx",
  "lib/constants.ts",
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
