#!/usr/bin/env node
/**
 * GATE 4 — page-body DOM dependency inventory, for the E6 real-container audit (GTM triggers keyed on the DOM).
 * Committed so the before/after inventory is reproducible (the B2 equivalent was not: PROC-E1A-1).
 *
 * snapshot: node dom-dependency.cjs snapshot --base <url> --routes /a,/b --out <file.json> [--width 1440]
 * diff:     node dom-dependency.cjs diff <before.json> <after.json>        → text report on stdout
 *
 * Recorded per route, for <main> only (the chrome is out of scope for body batches):
 *   element IDs · data-* attribute names · <section> count and their labels · buttons / forms ·
 *   every class token · every link: href, class, child element structure, innerText (the GTM Click Text),
 *   accessible name, and nesting (an <a> inside another interactive element).
 * Read-only. Consent "denied"; every non-local request blocked (lib.cjs).
 */
const fs = require('fs');
const { launch, context, open } = require('./lib.cjs');

const mode = process.argv[2];

async function snapshot() {
  const a = Object.fromEntries(process.argv.slice(3).reduce((acc, v, i, arr) => (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
  const routes = a.routes.split(',');
  const width = Number(a.width || 1440);
  const browser = await launch('chromium');
  const out = { base: a.base, width, at: new Date().toISOString(), routes: {} };
  for (const r of routes) {
    const ctx = await context(browser, { width });
    const page = await ctx.newPage();
    await open(page, a.base + r);
    out.routes[r] = await page.evaluate(() => {
      const m = document.querySelector('main');
      const all = [...m.querySelectorAll('*')];
      const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
      const name = (el) => {
        const lb = el.getAttribute('aria-labelledby');
        if (lb) return norm(lb.split(/\s+/).map((id) => document.getElementById(id)?.textContent || '').join(' '));
        if (el.getAttribute('aria-label')) return norm(el.getAttribute('aria-label'));
        const c = el.cloneNode(true);
        c.querySelectorAll('[aria-hidden="true"]').forEach((x) => x.remove());
        return norm(c.textContent);
      };
      const shape = (el) => [...el.children].map((c) => `${c.tagName.toLowerCase()}${c.className && typeof c.className === 'string' ? '.' + c.className.trim().split(/\s+/).join('.') : ''}${c.getAttribute('aria-hidden') === 'true' ? '[aria-hidden]' : ''}${c.children.length ? '>' + c.children.length : ''}`).join(' ') || '(text)';
      return {
        ids: all.filter((e) => e.id).map((e) => e.id),
        data: [...new Set(all.flatMap((e) => [...e.attributes].map((x) => x.name).filter((n) => n.startsWith('data-'))))].sort(),
        sections: [...m.querySelectorAll('section')].map((s) => (s.getAttribute('aria-labelledby') ? `[labelledby=${s.getAttribute('aria-labelledby')}]` : '')),
        buttons: m.querySelectorAll('button').length,
        forms: m.querySelectorAll('form').length,
        classes: [...new Set(all.flatMap((e) => (typeof e.className === 'string' ? e.className.trim().split(/\s+/) : [])).filter(Boolean))].sort(),
        links: [...m.querySelectorAll('a[href]')].map((l) => ({
          href: l.getAttribute('href'),
          cls: l.getAttribute('class') || '',
          children: shape(l),
          text: norm(l.innerText),
          name: name(l),
          nestedIn: l.parentElement.closest('a,button,summary,label') ? l.parentElement.closest('a,button,summary,label').tagName.toLowerCase() : '',
        })),
      };
    });
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
  console.log(`dom-dependency: ${routes.length} routes → ${a.out}`);
}

function diff() {
  const [bf, af] = process.argv.slice(3);
  const B = JSON.parse(fs.readFileSync(bf, 'utf8'));
  const A = JSON.parse(fs.readFileSync(af, 'utf8'));
  const lines = [`# DOM dependency inventory — before ${B.base} (${B.at}) vs after ${A.base} (${A.at}), <main> only, ${A.width}px`, ''];
  for (const r of Object.keys(A.routes)) {
    const b = B.routes[r]; const x = A.routes[r];
    const rm = b.classes.filter((c) => !x.classes.includes(c)); const ad = x.classes.filter((c) => !b.classes.includes(c));
    lines.push(`## ${r}`,
      `element IDs   before: ${JSON.stringify(b.ids)}`, `              after:  ${JSON.stringify(x.ids)}`,
      `data-* attrs  before: ${b.data.join(' ')}`, `              after:  ${x.data.join(' ')}`,
      `sections      before: ${b.sections.length} ${JSON.stringify(b.sections)}`, `              after:  ${x.sections.length} ${JSON.stringify(x.sections)}`,
      `buttons/forms before: ${b.buttons} ${b.forms}  after: ${x.buttons} ${x.forms}`,
      `classes removed (${rm.length}): ${rm.slice(0, 12).join(' ')}${rm.length > 12 ? ' …' : ''}`,
      `classes added (${ad.length}): ${ad.join(' ')}`,
      `links         before: ${b.links.length}  after: ${x.links.length}`);
    const n = Math.max(b.links.length, x.links.length);
    for (let i = 0; i < n; i++) {
      const p = b.links[i] || {}; const q = x.links[i] || {};
      const flags = [];
      if (p.href !== q.href) flags.push('HREF');
      if (p.text !== q.text) flags.push('CLICK-TEXT');
      if (p.name !== q.name) flags.push('ACC-NAME');
      if (p.cls !== q.cls) flags.push('CLASS');
      if (p.children !== q.children) flags.push('CHILDREN');
      if (p.nestedIn !== q.nestedIn) flags.push('NESTING');
      lines.push(`  [${i}] ${q.href || p.href} — ${flags.length ? flags.join(',') : 'identical'}`);
      if (flags.includes('CLICK-TEXT') || flags.includes('ACC-NAME') || flags.includes('HREF')) lines.push(`        before text "${p.text}" name "${p.name}"`, `        after  text "${q.text}" name "${q.name}"`);
      if (flags.includes('CHILDREN')) lines.push(`        before <a class="${p.cls}"> ${p.children}`, `        after  <a class="${q.cls}"> ${q.children}`);
      if (flags.includes('NESTING')) lines.push(`        nested in: before "${p.nestedIn}" after "${q.nestedIn}"`);
    }
    lines.push('');
  }
  console.log(lines.join('\n'));
}

(mode === 'snapshot' ? snapshot() : mode === 'diff' ? Promise.resolve(diff()) : Promise.reject(new Error('mode: snapshot | diff'))).catch((e) => { console.error(e); process.exit(1); });
