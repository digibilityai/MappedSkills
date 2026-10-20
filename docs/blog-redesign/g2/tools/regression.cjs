// Blog G2 regression: origin/main (0b27cfd) vs feat/blog-g2, both built with the same "live7" Contentful fixture
// (base :3234, g2 :3231). Compares the served SEO head, JSON-LD, <main> text, data-* hooks and the dataLayer after load
// (no consent given) on /blog, every article, the other routes that share the list primitives, and the sitemap.
const { chromium } = require('/Users/amitguptaamit/gitrepo/MappedSkills/node_modules/playwright-core');
const fs = require('fs'), path = require('path');
const A = 'http://127.0.0.1:3234', B = 'http://127.0.0.1:3231';
const SLUGS = ['content-marketing-services-in-pune', 'building-an-email-list', 'importance-of-content-writing', 'performance-marketing-vs-digital-marketing', '7-proven-strategies-of-digital-marketing-for-real-estate-developers', 'seo-company-in-pune', 'facebook-advertising-agency-pune'];
const ROUTES = ['/blog', ...SLUGS.map((s) => '/blog/' + s), '/press', '/research', '/work', '/faq', '/', '/this-page-does-not-exist'];
const head = (html) => {
  const pick = (re) => [...html.matchAll(re)].map((m) => m[0]).sort();
  return {
    title: pick(/<title>[^<]*<\/title>/g),
    meta: pick(/<meta (name|property)="(description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/g),
    canonical: pick(/<link rel="canonical"[^>]*>/g),
    jsonld: [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).sort(),
  };
};
(async () => {
  const out = { routes: {} }; const b = await chromium.launch();
  for (const r of ROUTES) {
    const [ha, hb] = await Promise.all([A, B].map((o) => fetch(o + r).then(async (x) => ({ s: x.status, h: await x.text() }))));
    const HA = head(ha.h), HB = head(hb.h);
    const page = async (o) => { const c = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await c.newPage(); await p.goto(o + r, { waitUntil: 'load' }); await p.waitForTimeout(500);
      const v = await p.evaluate(() => ({ main: (document.querySelector('main') || document.body).innerText.replace(/\s+/g, ' ').trim(),
        dataAttrs: [...document.querySelectorAll('main [data-]'), ...document.querySelectorAll('main *')].flatMap((e) => [...e.attributes].filter((a) => a.name.startsWith('data-')).map((a) => a.name)).sort().join(','),
        dl: JSON.stringify((window.dataLayer || []).map((x) => (x && x[0] !== undefined ? Array.from(x).slice(0, 2) : x))) }));
      await c.close(); return v; };
    const [pa, pb] = [await page(A), await page(B)];
    out.routes[r] = { status: [ha.s, hb.s], title: JSON.stringify(HA.title) === JSON.stringify(HB.title), meta: JSON.stringify(HA.meta) === JSON.stringify(HB.meta), canonical: JSON.stringify(HA.canonical) === JSON.stringify(HB.canonical),
      jsonld: JSON.stringify(HA.jsonld) === JSON.stringify(HB.jsonld), mainText: pa.main === pb.main, dataAttrs: pa.dataAttrs === pb.dataAttrs, dataLayer: pa.dl === pb.dl,
      ...(r === '/blog' ? { metaDiff: { base: HA.meta, g2: HB.meta }, jsonldCount: [HA.jsonld.length, HB.jsonld.length], dataAttrsG2: pb.dataAttrs, dlBase: pa.dl, dlG2: pb.dl } : {}) };
  }
  const sm = await Promise.all([A, B].map((o) => fetch(o + '/sitemap.xml').then((x) => x.text())));
  out.sitemapIdentical = sm[0] === sm[1]; out.sitemapBlogUrls = (sm[1].match(/<loc>[^<]*\/blog[^<]*<\/loc>/g) || []).length;
  fs.writeFileSync(path.join(__dirname, '..', 'regression.json'), JSON.stringify(out, null, 1)); await b.close(); console.log('ok');
})();
