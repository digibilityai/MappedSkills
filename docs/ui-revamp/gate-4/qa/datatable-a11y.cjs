#!/usr/bin/env node
/**
 * GATE 4 · B3 — DataTable semantics and reflow probe (first consumer `/ai-seo`; KD-04 acceptance on that route).
 *
 * usage: node datatable-a11y.cjs --base <plain url> [--route /ai-seo] [--engine chromium|webkit|firefox] [--out file.json]
 *
 * Per width (320, 390, 599, 600, 768, 1440, plus 1440@200% = 720 CSS px and 1280@400% = 320 CSS px), for every `main table`:
 *  S  DOM semantics: caption text; column headers (`th[scope=col]`); per body row one `th[scope=row]` and the remaining cells;
 *     every `td[data-label]` equals the text of its column header.
 *  A  Playwright ARIA snapshot of the table (roles, names, row/column structure as an accessibility API would expose them).
 *  X  Chromium only: the browser's own accessibility tree (CDP Accessibility.getFullAXTree): role and name of every table,
 *     row, header and cell. A cell whose name starts with its column label would be announced twice → reported.
 *  C  the computed `::before` content of the first data cell: whether this engine accepted the alt-text form
 *     `attr(data-label) / ""` (label hidden from the accessibility tree) or fell back to plain `attr(data-label)`.
 *  L  layout: table display; page-level horizontal scroll; any table descendant wider than its box or than the viewport;
 *     column headers visible or visually hidden; smallest rendered text in the table; focusable elements in the table.
 *  T  the same L checks with WCAG 1.4.12 text spacing applied.
 * Read-only. Exit 1 if a structural check fails, the page scrolls horizontally, a table overflows, or a doubled name is found.
 */
const fs = require('fs');
const { launch, context, open, args } = require('./lib.cjs');

const a = args();
const engine = a.engine || 'chromium';
const route = a.route || '/ai-seo';
const VIEWS = [
  ['320', 320, 1], ['390', 390, 1], ['599', 599, 1], ['600', 600, 1], ['768', 768, 1], ['1440', 1440, 1],
  ['1440@200%', 720, 2], ['1280@400%', 320, 4],
];
const SPACING = '* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }';

async function measure(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    return [...document.querySelectorAll('main table')].map((t) => {
      const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : null);
      const cols = [...t.querySelectorAll('thead th')];
      const rows = [...t.querySelectorAll('tbody tr')];
      const bad = [];
      rows.forEach((tr, i) => {
        const rh = tr.querySelector(':scope > th');
        if (!rh || rh.getAttribute('scope') !== 'row') bad.push(`row ${i}: no th[scope=row]`);
        [...tr.querySelectorAll(':scope > td')].forEach((td, c) => {
          const want = txt(cols[c + 1]);
          if (td.hasAttribute('data-label') && td.getAttribute('data-label') !== want) bad.push(`row ${i} cell ${c}: data-label "${td.getAttribute('data-label')}" ≠ header "${want}"`);
        });
      });
      cols.forEach((th, i) => { if (th.getAttribute('scope') !== 'col') bad.push(`column header ${i}: no scope=col`); });
      const r = t.getBoundingClientRect();
      // visually hidden on purpose (the sr-only caption; the <600px clipped thead): a 1px clip box, not overflow
      const hidden = (el) => { const b = el.getBoundingClientRect(); return b.width <= 2 || b.height <= 2; };
      const wide = [t, ...t.querySelectorAll('*')].filter((el) => {
        const b = el.getBoundingClientRect();
        if (hidden(el) || (el.parentElement && el.parentElement !== t.parentElement && hidden(el.parentElement))) return false;
        return b.width > 0 && (b.right > vw + 0.5 || b.left < -0.5 || el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== 'visible');
      }).map((el) => el.nodeName + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''));
      const sizes = [...t.querySelectorAll('caption, th, td')].filter((el) => el.getClientRects().length && getComputedStyle(el).position !== 'absolute' && !el.closest('thead[style], .sr-only'))
        .filter((el) => { const h = el.closest('thead'); return !h || h.getBoundingClientRect().height > 2; })
        .map((el) => [parseFloat(getComputedStyle(el).fontSize), el.nodeName]);
      const before = t.querySelector('tbody td') ? getComputedStyle(t.querySelector('tbody td'), '::before').content : null;
      const thead = t.querySelector('thead');
      return {
        className: t.className,
        caption: txt(t.querySelector('caption')),
        captionVisible: !!t.querySelector('caption') && t.querySelector('caption').getBoundingClientRect().height > 2 && !t.querySelector('caption').classList.contains('sr-only'),
        columns: cols.map(txt),
        rowHeaders: rows.map((tr) => txt(tr.querySelector(':scope > th'))),
        cellsPerRow: rows.map((tr) => tr.querySelectorAll(':scope > td').length),
        structural: bad,
        display: getComputedStyle(t).display,
        headersVisible: thead ? thead.getBoundingClientRect().height > 2 : null,
        tableWidth: Math.round(r.width), viewport: vw,
        pageScroll: document.documentElement.scrollWidth > vw + 1,
        overflowing: [...new Set(wide)],
        minTextPx: sizes.length ? Math.min(...sizes.map((s) => s[0])) : null,
        focusable: t.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').length,
        scrollRegions: [t, ...t.querySelectorAll('*')].filter((el) => /auto|scroll/.test(getComputedStyle(el).overflowX) && el.scrollWidth > el.clientWidth + 1).length
          + (t.parentElement && /auto|scroll/.test(getComputedStyle(t.parentElement).overflowX) && t.parentElement.scrollWidth > t.parentElement.clientWidth + 1 ? 1 : 0),
        beforeContent: before,
      };
    });
  });
}

async function axChromium(page) {
  const cdp = await page.context().newCDPSession(page);
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  const keep = new Set(['table', 'row', 'rowgroup', 'columnheader', 'rowheader', 'cell', 'gridcell', 'caption']);
  const list = nodes.filter((n) => !n.ignored && n.role && keep.has(n.role.value)).map((n) => [n.role.value, n.name ? n.name.value : '']);
  await cdp.detach();
  return list;
}

(async () => {
  const browser = await launch(engine);
  const out = { at: new Date().toISOString(), engine, base: a.base, route, views: {} };
  let fail = 0;
  for (const [label, width, scale] of VIEWS) {
    const ctx = await context(browser, { width, engine, deviceScaleFactor: scale });
    const page = await ctx.newPage();
    await open(page, a.base + route);
    const v = { tables: await measure(page) };
    const loc = page.locator('main table');
    v.aria = [];
    for (let i = 0; i < await loc.count(); i++) v.aria.push(await loc.nth(i).ariaSnapshot());
    if (engine === 'chromium') {
      v.ax = await axChromium(page);
      const cols = v.tables.flatMap((t) => t.columns.slice(1)).filter(Boolean);
      v.doubled = v.ax.filter(([role, name]) => (role === 'cell' || role === 'gridcell') && cols.some((c) => name.toLowerCase().startsWith(c.toLowerCase())));
    }
    await page.addStyleTag({ content: SPACING });
    await page.waitForTimeout(150);
    v.spacing = (await measure(page)).map((t) => ({ pageScroll: t.pageScroll, overflowing: t.overflowing }));
    for (const t of v.tables) {
      if (t.structural.length || t.pageScroll || t.overflowing.length || t.scrollRegions) fail++;
    }
    for (const t of v.spacing) if (t.pageScroll || t.overflowing.length) fail++;
    if (v.doubled && v.doubled.length) fail++;
    out.views[label] = v;
    const t0 = v.tables[0] || {};
    console.log(`${route} [${engine}] ${label.padEnd(10)} tables ${v.tables.length} · display ${t0.display} · headers ${t0.headersVisible ? 'visible' : 'visually hidden'} · cols ${JSON.stringify(t0.columns)} · rows ${t0.rowHeaders ? t0.rowHeaders.length : 0} cells ${JSON.stringify(t0.cellsPerRow)}`
      + ` · structural ${t0.structural ? t0.structural.length : '-'} · pageScroll ${t0.pageScroll} · overflow ${JSON.stringify(t0.overflowing)} · scrollRegions ${t0.scrollRegions} · minText ${t0.minTextPx}px · focusable ${t0.focusable}`
      + ` · ::before ${JSON.stringify(t0.beforeContent)} · spacing ${JSON.stringify(v.spacing[0])}` + (v.doubled ? ` · doubled names ${v.doubled.length}` : ''));
    await ctx.close();
  }
  await browser.close();
  if (a.out) fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
  console.log(`datatable [${engine}] ${route}: ${VIEWS.length} views · ${fail ? fail + ' FAILURES' : '0 failures'}`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
