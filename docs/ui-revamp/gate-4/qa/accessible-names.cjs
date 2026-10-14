#!/usr/bin/env node
/**
 * GATE 4 · B3 — accessible names before vs after (the B2 `accessible-names.txt` method, as a committed script).
 *
 * usage: node accessible-names.cjs --before <url> --after <url> --routes /a,/b [--engine chromium|webkit|firefox] [--width 1440]
 *
 * Per route: Playwright's ARIA snapshot of <main> in each build (roles and accessible names as an accessibility API exposes
 * them). Compared per role: heading (with level), link, button, textbox/combobox, img. Landmarks (region, navigation), figures
 * and tables are listed for the record; new named regions are reported, not failed (sections gain `aria-labelledby`).
 * Exit 1 if any heading, link, button or form-control name or order differs.
 */
const { launch, context, open, args } = require('./lib.cjs');

const a = args();
const engine = a.engine || 'chromium';
const width = Number(a.width || 1440);
const COMPARED = ['heading', 'link', 'button', 'textbox', 'combobox', 'img'];
const LISTED = ['region', 'navigation', 'figure', 'table', 'list'];

// A snapshot line whose name contains ': ' is YAML-quoted (- 'heading "AI search: …" [level=1]'); unquote it before matching.
const unquote = (l) => (/^- '.*'$/.test(l) ? '- ' + l.slice(3, -1).replace(/''/g, "'") : l);
const lines = (snap, role) => snap.split('\n').map((l) => unquote(l.trim().replace(/:$/, ''))).filter((l) => l.startsWith(`- ${role} `) || l === `- ${role}` || l.startsWith(`- ${role}:`))
  .map((l) => l.replace(/:$/, '').replace(/ \[ref=[^\]]+\]/g, ''));

(async () => {
  const browser = await launch(engine);
  let fail = 0;
  for (const route of String(a.routes).split(',')) {
    const snaps = {};
    for (const [k, base] of [['before', a.before], ['after', a.after]]) {
      const ctx = await context(browser, { width, engine });
      const page = await ctx.newPage();
      await open(page, base + route);
      snaps[k] = await page.locator('main').ariaSnapshot();
      await ctx.close();
    }
    console.log(`${route} [${engine}] @${width}`);
    for (const role of COMPARED) {
      const b = lines(snaps.before, role); const c = lines(snaps.after, role);
      const same = JSON.stringify(b) === JSON.stringify(c);
      if (!same) fail++;
      console.log(`  ${same ? 'SAME' : 'DIFF'} ${role}: before ${b.length} · after ${c.length}`);
      if (!same) {
        b.filter((x) => !c.includes(x)).forEach((x) => console.log(`       - ${x}`));
        c.filter((x) => !b.includes(x)).forEach((x) => console.log(`       + ${x}`));
        if (b.length === c.length && b.every((x) => c.includes(x))) console.log('       (same names, different order)');
      }
      if (role === 'heading') c.forEach((x) => console.log(`       ${x}`));
    }
    for (const role of LISTED) {
      const b = lines(snaps.before, role); const c = lines(snaps.after, role);
      console.log(`  list ${role}: before ${b.length} ${JSON.stringify(b)} · after ${c.length} ${JSON.stringify(c)}`);
    }
  }
  await browser.close();
  console.log(`accessible names [${engine}]: ${fail ? fail + ' differing role sets' : 'heading, link, button, form-control and img names identical'}`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
