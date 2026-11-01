// Reads the real body HTML of the three representative detail pages from the running port-3500 site and saves it sanitised (data/bodies.json),
// so the full-length mockups use every real paragraph, list, chart and heading rather than a sample.
const fs = require('node:fs'); const path = require('node:path');
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const KEEP = /^(rr-bars|rr-bar-l|rr-bar-v|rr-bar-t|rr-barfig|rr-barcap|rr-barcap-k|rr-chart)$/;
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const out = {};
  const run = async (key, url, sel) => {
    await p.goto('http://localhost:3500' + url, { waitUntil: 'networkidle' });
    out[key] = await p.evaluate(({ sel, keep }) => {
      const re = new RegExp(keep);
      const ALLOW = new Set(['H2', 'H3', 'H4', 'P', 'UL', 'OL', 'LI', 'DL', 'DT', 'DD', 'A', 'STRONG', 'EM', 'B', 'I', 'BLOCKQUOTE', 'FIGURE', 'FIGCAPTION', 'IMG', 'SPAN', 'BR', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'DIV', 'SECTION']);
      const clean = (n) => {
        if (n.nodeType === 3) return document.createTextNode(n.textContent);
        if (n.nodeType !== 1 || !ALLOW.has(n.tagName)) return null;
        if (n.getAttribute('aria-hidden') === 'true' && n.tagName === 'SPAN' && !n.className.includes('rr-bar-t')) return null;
        const e = document.createElement(n.tagName);
        if (n.tagName === 'A') e.setAttribute('href', n.getAttribute('href') || '#');
        if (n.tagName === 'IMG') { e.setAttribute('src', n.getAttribute('src')); e.setAttribute('alt', n.getAttribute('alt') || ''); }
        if (n.tagName === 'I' && n.style.cssText) e.setAttribute('style', n.getAttribute('style'));
        if (/^H[234]$/.test(n.tagName) && n.id) e.id = n.id;
        const cls = [...n.classList].filter((c) => re.test(c)); if (cls.length) e.className = cls.join(' ');
        if (n.tagName === 'SPAN' && n.className.includes('rr-bar-t')) { const i = n.querySelector('i'); const ni = document.createElement('i'); ni.setAttribute('style', i.getAttribute('style')); e.appendChild(ni); return e; }
        n.childNodes.forEach((c) => { const x = clean(c); if (x) e.appendChild(x); });
        return e;
      };
      return [...document.querySelectorAll(sel)].map((el) => { const c = clean(el); return c ? c.innerHTML : ''; }).filter(Boolean);
    }, { sel, keep: KEEP.source });
  };
  await run('research', '/research/marketing-measurement-gap-indian-business-websites', '.rr-sum, .rr-ch, .rr-method, .rr-limits');
  await run('blog', '/blog/performance-marketing-vs-digital-marketing', '.ba-prose');
  await run('press', '/press/marketing-measurement-gap-indian-websites', '.pd-sec, .pd-quote, [aria-labelledby="about-the-research"]');
  fs.writeFileSync(path.join(__dirname, 'data/bodies.json'), JSON.stringify(out, null, 1));
  for (const [k, v] of Object.entries(out)) console.log(k, v.length, v.map((h) => h.length).join(','));
  await b.close();
})();
