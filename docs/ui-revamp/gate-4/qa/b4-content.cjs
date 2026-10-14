#!/usr/bin/env node
/**
 * GATE 4 · B4 — content and commercial parity record for the decision pages (`/problems/traffic-but-no-enquiries`, `/pricing`).
 *
 * record:  node b4-content.cjs record --base <plain url> --out <file.json> [--engine chromium]
 * compare: node b4-content.cjs compare <before.json> <after.json> [--declared <expected.json>]
 *
 * Per route, with JavaScript (1440 and 390) and without JavaScript (1440):
 *   - served head (from the HTML a crawler receives): status, title, description, canonical, robots, OG/Twitter, every JSON-LD block
 *   - `copy`: every text node in <main>, in DOM order, whitespace-normalised, skipping aria-hidden subtrees, <script>, <style>
 *     and SVG (CSS-independent, so `text-transform` and layout cannot hide a wording change). The parity gate.
 *   - `ariaHidden`: the aria-hidden text that `copy` skips (arrows, ordinals), recorded separately
 *   - `srOnly`: visually hidden text
 *   - `sections`: the h2 sequence (section order); `headings`: level + text
 *   - `links`: accessible text (aria-hidden removed), href, the h2 it sits under; `ctas`: links to /contact or /schedule-call
 *   - `tables`: caption, column headers, row headers, cells, scope attributes
 *   - `svg`: <title>, <desc> and <text> content of each SVG
 *   - `figures`: every figure-like token in the copy (digits, currency symbols, number words, "per month", "from", %)
 *   - `lists`: ul / ol / dl with their item counts
 * Read-only. Consent "denied" (lib.cjs); every non-local request is blocked.
 */
const fs = require('fs');
const { launch, context, open } = require('./lib.cjs');

const ROUTES = ['/problems/traffic-but-no-enquiries', '/pricing'];
const mode = process.argv[2];
const a = Object.fromEntries(process.argv.slice(3).reduce((acc, v, i, arr) => (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));

const FIGURE_RE = /[₹$€£¥]|\b\d[\d,.]*\b|%|\bper (month|year|hour|day)\b|\bfrom\b|\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|fifty|hundred|thousand|fifteen)\b/gi;

function served(html) {
  const pick = (re) => { const m = html.match(re); return m ? m[1] : null; };
  const metas = {};
  for (const m of html.matchAll(/<meta\s+([^>]+?)\/?>/g)) {
    const attr = Object.fromEntries([...m[1].matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)].map((x) => [x[1], x[2]]));
    const k = attr.name || attr.property;
    if (k && /^(description|robots|og:|twitter:)/.test(k)) metas[k] = attr.content;
  }
  return {
    title: pick(/<title>([^<]*)<\/title>/),
    canonical: pick(/<link rel="canonical" href="([^"]*)"/),
    metas,
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]),
  };
}

function snapshot() {
  const main = document.querySelector('main');
  const hidden = (n) => { for (let e = n.nodeType === 1 ? n : n.parentElement; e && e !== main.parentElement; e = e.parentElement) if (e.getAttribute && e.getAttribute('aria-hidden') === 'true') return true; return false; };
  const inTag = (n, tags) => { for (let e = n.parentElement; e && e !== main.parentElement; e = e.parentElement) if (tags.includes(e.tagName.toLowerCase())) return true; return false; };
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const words = [], ariaHidden = [];
  const tw = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  for (let t; (t = tw.nextNode());) {
    if (inTag(t, ['script', 'style', 'svg'])) continue;
    const s = norm(t.data); if (!s) continue;
    (hidden(t) ? ariaHidden : words).push(s);
  }
  const accText = (el) => { const c = el.cloneNode(true); c.querySelectorAll('[aria-hidden="true"]').forEach((x) => x.remove()); return norm(c.textContent); };
  const h2Before = (el) => { let last = null; for (const h of main.querySelectorAll('h2')) if (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) last = norm(h.textContent); return last; };
  const srOnly = [...main.querySelectorAll('*')].filter((e) => { const cs = getComputedStyle(e); return (cs.clipPath === 'inset(50%)' || cs.clip === 'rect(0px, 0px, 0px, 0px)') && cs.position === 'absolute'; }).map((e) => norm(e.textContent)).filter(Boolean);
  return {
    copy: words.join(' '),
    ariaHidden,
    srOnly,
    sections: [...main.querySelectorAll('h2')].map((h) => norm(h.textContent)),
    headings: [...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => `${h.tagName.toLowerCase()} ${norm(h.textContent)}`),
    links: [...main.querySelectorAll('a[href]')].map((l) => ({ text: accText(l), href: l.getAttribute('href'), under: h2Before(l) })),
    ctas: [...main.querySelectorAll('a[href="/contact"], a[href="/schedule-call"]')].map((l) => `${accText(l)} → ${l.getAttribute('href')}`),
    buttons: [...main.querySelectorAll('button')].map((b) => accText(b)),
    forms: main.querySelectorAll('form').length,
    tables: [...main.querySelectorAll('table')].map((t) => ({
      caption: t.caption ? norm(t.caption.textContent) : null,
      cols: [...t.querySelectorAll('thead th')].map((th) => `${norm(th.textContent)} [scope=${th.getAttribute('scope')}]`),
      rows: [...t.querySelectorAll('tbody tr')].map((tr) => [...tr.children].map((c) => `${c.tagName.toLowerCase()}${c.getAttribute('scope') ? '[scope=' + c.getAttribute('scope') + ']' : ''}: ${norm(c.textContent)}`)),
    })),
    svg: [...main.querySelectorAll('svg')].map((s) => ({
      visible: s.getBoundingClientRect().width > 0,
      title: s.querySelector('title') ? norm(s.querySelector('title').textContent) : null,
      desc: s.querySelector('desc') ? norm(s.querySelector('desc').textContent) : null,
      text: [...s.querySelectorAll('text')].map((x) => norm(x.textContent)),
    })),
    lists: [...main.querySelectorAll('ul,ol,dl')].map((l) => `${l.tagName.toLowerCase()}:${l.tagName === 'DL' ? l.querySelectorAll(':scope > div > dt, :scope > dt').length : l.querySelectorAll(':scope > li').length}`),
    figuresCount: main.querySelectorAll('figure').length,
  };
}

async function record() {
  const engine = a.engine || 'chromium';
  const browser = await launch(engine);
  const out = { at: new Date().toISOString(), base: a.base, engine, routes: {} };
  for (const r of ROUTES) {
    const res = await fetch(a.base + r);
    const html = await res.text();
    const rec = { status: res.status, served: served(html), views: {} };
    for (const [label, width, js] of [['js-1440', 1440, true], ['js-390', 390, true], ['nojs-1440', 1440, false]]) {
      const ctx = await context(browser, { width, engine, javaScriptEnabled: js, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await open(page, a.base + r);
      const s = await page.evaluate(snapshot);
      s.figures = (s.copy.match(FIGURE_RE) || []).map((x) => x.toLowerCase());
      rec.views[label] = s;
      await ctx.close();
    }
    out.routes[r] = rec;
    const v = rec.views['js-1440'];
    console.log(`${r}: ${res.status} · ${v.copy.split(' ').length} words · ${v.sections.length} sections · ${v.headings.length} headings · ${v.links.length} links · ${v.ctas.length} CTAs · ${v.tables.length} tables · ${v.svg.length} svg · figures [${[...new Set(v.figures)].join(', ')}]`);
  }
  await browser.close();
  fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
  console.log(`written ${a.out}`);
}

function compare() {
  const [bf, af] = process.argv.slice(3).filter((x) => !x.startsWith('--'));
  const B = JSON.parse(fs.readFileSync(bf, 'utf8')), A = JSON.parse(fs.readFileSync(af, 'utf8'));
  const declared = a.declared ? JSON.parse(fs.readFileSync(a.declared, 'utf8')) : {};
  let diffs = 0, undeclared = 0;
  const line = (r, k, b, x) => {
    const key = `${r}|${k}`;
    const ok = declared[key] !== undefined;
    diffs++; if (!ok) undeclared++;
    console.log(`${ok ? 'DECLARED  ' : 'DIFFERENT '} ${key}${ok ? '  (' + declared[key] + ')' : ''}\n   before: ${JSON.stringify(b).slice(0, 600)}\n   after:  ${JSON.stringify(x).slice(0, 600)}`);
  };
  for (const r of ROUTES) {
    const b = B.routes[r], x = A.routes[r];
    if (b.status !== x.status) line(r, 'status', b.status, x.status);
    for (const k of ['title', 'canonical']) if (b.served[k] !== x.served[k]) line(r, `served.${k}`, b.served[k], x.served[k]);
    if (JSON.stringify(b.served.metas) !== JSON.stringify(x.served.metas)) line(r, 'served.metas', b.served.metas, x.served.metas);
    if (JSON.stringify(b.served.jsonLd) !== JSON.stringify(x.served.jsonLd)) line(r, 'served.jsonLd', b.served.jsonLd, x.served.jsonLd);
    for (const view of Object.keys(b.views)) for (const k of Object.keys(b.views[view])) {
      const bv = JSON.stringify(b.views[view][k]), xv = JSON.stringify(x.views[view][k]);
      if (bv !== xv) line(r, `${view}.${k}`, b.views[view][k], x.views[view][k]);
    }
  }
  console.log(`\nSUMMARY: ${diffs} differences · ${diffs - undeclared} declared · ${undeclared} undeclared`);
  process.exit(undeclared ? 1 : 0);
}

(mode === 'record' ? record() : mode === 'compare' ? Promise.resolve(compare()) : Promise.reject(new Error('mode: record | compare'))).catch((e) => { console.error(e); process.exit(2); });
