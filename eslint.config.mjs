/**
 * ESLint flat config — the supported Next.js 16 setup.
 *
 * `next lint` was REMOVED in Next.js 16, so the previous `"lint": "next lint"`
 * script failed with a misleading "Invalid project directory … /lint" error and
 * the repository had no working linter at all. Linting now runs through the
 * ESLint CLI with Next's own recommended presets:
 *
 *   core-web-vitals  — React, hooks, accessibility (jsx-a11y) and the Next.js
 *                      rules, with the Core Web Vitals rules raised to errors
 *   typescript       — typescript-eslint recommended rules
 *
 * No rule is relaxed here to make the existing code pass. Findings that
 * predate this config are reported, not mass-fixed.
 */
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // CommonJS by design: the custom server, the cPanel startup shim and the
    // Node maintenance scripts. `require` IS the module system in these files,
    // so the TypeScript-oriented `no-require-imports` rule does not apply.
    files: ['**/*.cjs', 'app.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Programme documentation, including standalone HTML/JS design
    // prototypes that are not part of the application.
    'docs/**',
    'doc/**',
    '__MACOSX/**',
  ]),
]);
