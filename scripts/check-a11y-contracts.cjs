#!/usr/bin/env node
'use strict';

/**
 * ACCESSIBILITY CONTRACT GUARD.
 *
 * This repository has no test runner, so this file is deliberately a plain
 * Node script with no dependencies. It exists to stop two specific corrections
 * from being silently undone:
 *
 *   1. THE STAGE LIST IS A DISCLOSURE SET, NOT A TABLIST. A `tablist` may own
 *      nothing but `tab` children, and this design needs each panel to sit
 *      inside its own stage row, so the tablist markup could never be made
 *      conformant. Reinstating `role="tab"` would bring back three axe
 *      failures at once: aria-required-children, aria-required-parent and
 *      listitem.
 *   2. THE ACCOUNTABILITY DISPLAY LINE USES THE ON LIGHT TOKEN. On the light
 *      ground `--resolve-accent` measures 2.81:1, under the 3:1 large text
 *      minimum. `--resolve-accent-deep` is the documented on light display
 *      value and measures 3.97:1.
 *
 * WHAT THIS CANNOT CHECK. These are source assertions, not behaviour. Two of
 * the things worth guarding need a real DOM, which needs a test runner this
 * repository does not have: that selecting a stage still opens its panel and
 * moves the chain, and that keyboard selection still walks the headings. Both
 * were verified by hand in a browser with axe-core for the change that
 * introduced this file. Wiring up a runner is a separate decision.
 *
 * Run: node scripts/check-a11y-contracts.cjs
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const failures = [];
const passes = [];

function read(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    failures.push(`${rel}: file not found`);
    return null;
  }
  return fs.readFileSync(p, 'utf8');
}

function check(label, condition) {
  if (condition) passes.push(label);
  else failures.push(label);
}

/* ---------------------------------------------------------------- stages -- */
const stages = read('components/homepage/SystemStages.tsx');
if (stages) {
  const f = 'SystemStages';

  // 1. no tab semantics anywhere in the component
  for (const banned of ['role="tablist"', 'role="tab"', 'role="tabpanel"', 'aria-selected']) {
    check(`${f}: does not use ${banned}`, !stages.includes(banned));
  }

  // 2. the list is a real list again, and it keeps its group label
  check(`${f}: stage list is a ul`, /<ul\s/.test(stages));
  check(`${f}: stage rows are li`, /<li key=\{s\.n\}/.test(stages));
  check(
    `${f}: stage list keeps its accessible name`,
    stages.includes('aria-label="The three stages of the work"')
  );

  // 3. each heading button reports its own expanded state, and tracks `open`
  //    rather than `selected`, because the composed state opens all three
  check(`${f}: heading button carries aria-expanded`, stages.includes('aria-expanded={open}'));
  check(`${f}: heading button is wrapped in a heading`, /<h3 className="m-0">/.test(stages));
  check(
    `${f}: every heading stays in the page tab sequence`,
    !/tabIndex=\{selected \? 0 : -1\}/.test(stages)
  );

  // 4. the panel is a named region owned by its own heading, and the button
  //    still declares both the panel and the chain it controls
  check(`${f}: panel is a region`, stages.includes('role="region"'));
  check(
    `${f}: panel is labelled by its own heading`,
    stages.includes('aria-labelledby={`rsv-stg-${s.n}`}')
  );
  check(
    `${f}: button still controls its panel and the chain`,
    stages.includes('aria-controls={`rsv-panel-${s.n} rsv-chain`}')
  );

  // 5. a collapsed panel is still unreachable by focus
  check(`${f}: collapsed panel is still inert`, stages.includes('inert={!open}'));

  // 6. keyboard selection still addresses the headings
  check(
    `${f}: keyboard selection still finds the headings`,
    stages.includes("querySelectorAll<HTMLButtonElement>('button[data-rsv-stg]')") &&
      stages.includes('data-rsv-stg={s.n}')
  );
}

/* -------------------------------------------------------- accountability -- */
const acct = read('components/homepage/HomepageAccountability.tsx');
if (acct) {
  const f = 'HomepageAccountability';

  // the display line on the LIGHT ground takes the on light token
  const light = acct.match(
    /We would rather show evidence than manufacture <span style=\{\{ color: 'var\((--resolve-accent[a-z-]*)\)' \}\}>/
  );
  check(
    `${f}: light ground display line uses --resolve-accent-deep`,
    !!light && light[1] === '--resolve-accent-deep'
  );

  // the on dark uses are correct as they stand and must not be swept along
  check(
    `${f}: on dark line keeps --resolve-accent`,
    /<em className="not-italic" style=\{\{ color: 'var\(--resolve-accent\)' \}\}>\s*We weren/.test(acct)
  );
}

/* ------------------------------------------------------------------ out --- */
for (const p of passes) console.log(`  ok    ${p}`);
for (const f of failures) console.error(`  FAIL  ${f}`);
console.log(`\n${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
