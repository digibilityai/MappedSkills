// Metadata, structured data and substantive text parity against the previous R3 build (saved HTML in /tmp/base-r3 or BASEDIR). Usage: node parity.cjs [port]
const fs = require('fs');
const dir = process.env.BASEDIR || '/tmp/base-r3'; const port = process.argv[2] || '3500';
const meta = (h) => ({ title: (/<title>([\s\S]*?)<\/title>/.exec(h) || [])[1], metas: [...h.matchAll(/<meta\s+([^>]*?)\/?>/g)].map((m) => m[1]).filter((x) => /name="(description|robots)"|property="og:|name="twitter:/.test(x)).sort(), canon: (/<link rel="canonical" href="([^"]*)"/.exec(h) || [])[1], ld: [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).sort() });
const segs = (h) => { const body = (/<body[\s\S]*<\/body>/.exec(h) || [h])[0].replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<(header|footer)[\s\S]*?<\/\1>/g, ''); return body.replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').split('\n').map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean); };
(async () => {
  const out = {};
  for (const f of fs.readdirSync(dir).sort()) {
    const route = f.replace(/\.html$/, '').replace(/_/g, '/'); const a = fs.readFileSync(`${dir}/${f}`, 'utf8'); const b = await (await fetch(`http://localhost:${port}${route}`)).text();
    const ma = meta(a), mb = meta(b); const same = (k) => JSON.stringify(ma[k]) === JSON.stringify(mb[k]);
    const sa = segs(a), sb = segs(b), jb = sb.join(' '), ja = sa.join(' ');
    const removed = sa.filter((s) => !sb.includes(s) && !jb.includes(s)); const added = sb.filter((s) => !sa.includes(s) && !ja.includes(s));
    out[route] = { title: same('title'), metas: same('metas'), canon: same('canon'), ld: same('ld'), removed, added };
    console.log(route.slice(0, 66).padEnd(66), 'title', same('title'), 'metas', same('metas'), 'canon', same('canon'), 'ld', same('ld'), '| removed', removed.length, 'added', added.length);
    if (removed.length) console.log('   REMOVED', JSON.stringify(removed).slice(0, 700));
    if (added.length) console.log('   ADDED  ', JSON.stringify(added).slice(0, 500));
  }
  fs.writeFileSync(__dirname + '/../data/parity-' + port + '.json', JSON.stringify(out));
})();
