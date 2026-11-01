// Read-only production check of the case-study release (plain HTTP GETs, no token). Node >= 20.
//   node verify-live.mjs https://mappedskills.com [--expect before|after] [--wait SECONDS]
// after  (default): the 20 studies are listed in order on /work/index.json, each /portfolio page is 200 with its own title, Ameba shows its released figures,
//                   Home Decor is not listed, every canonical is on the site origin, and the five showcase pages show their cases.
// before          : the content release has not happened (the 5 studies listed today only; new routes 404).
// --wait N        : poll every 20 s for up to N seconds until the check passes (pages revalidate every 60 s and may serve a stale copy once).
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';

const site = (process.argv[2] ?? '').replace(/\/+$/, ''); if (!site.startsWith('https://')) { console.error('usage: node verify-live.mjs https://host [--expect before|after] [--wait N]'); process.exit(1); }
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const expect = arg('--expect', 'after'); const waitS = Number(arg('--wait', '0'));
const M = JSON.parse(readFileSync(process.env.RELEASE_MANIFEST ?? `${homedir()}/gitrepo/MappedSkills-six-cases/docs/case-release/manifest/manifest.json`, 'utf8'));
const routes = M.entries.map((e) => e.route); const TODAY = new Set(['om-sai-developer-meta-ads', 'classpe-social-media-strategy', 'insuryo-organic-growth', 'seo-ameba-software', 'google-ads-for-online-courses'].map((s) => '/portfolio/' + s));
const get = async (p) => { const r = await fetch(site + p, { redirect: 'manual' }); return { status: r.status, body: await r.text() }; };
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ');

async function once() {
  const out = []; const ck = (n, ok, d = '') => out.push({ n, ok: !!ok, d });
  const idx = JSON.parse((await get('/work/index.json')).body).studies; const hrefs = idx.map((s) => s.href);
  const want = expect === 'after' ? routes : routes.filter((r) => TODAY.has(r));
  ck(`/work lists ${want.length} studies in the approved order`, JSON.stringify(hrefs) === JSON.stringify(want), `${hrefs.length} listed`);
  ck('Home Decor is not listed', !hrefs.some((h) => /home-decor/.test(h)));
  for (const r of want) {
    const g = await get(r); const t = text(g.body);
    ck(`${r} is 200`, g.status === 200, `HTTP ${g.status}`);
    const can = /rel="canonical" href="([^"]*)"/.exec(g.body); ck(`${r} canonical on ${site}`, can && can[1] === site + r, can ? can[1] : 'none');
  }
  if (expect === 'after') {
    for (const r of routes.filter((x) => !TODAY.has(x))) { const e = M.entries.find((x) => x.route === r); const g = await get(r); ck(`${r} shows its title`, text(g.body).includes(e.title.slice(0, 40)), ''); }
    const am = await get('/portfolio/seo-ameba-software'); ck('Ameba shows the released figures (7,300 to 12,800)', /7,300/.test(am.body) && /12,800/.test(am.body));
    const shows = { '/google-ads': ['Meticulous', 'Bakersville'], '/who-we-help/d2c': ['Klenzmo', 'Advit Prints'], '/who-we-help/education': ['EKoching', 'Bakedemy'], '/who-we-help/real-estate': ['HutnHomes'], '/who-we-help/enquiry-led-businesses': ['Phoenix Laundry', 'Talreja'], '/social-media-ads': ['Klenzmo', 'AnybodyCanBake'], '/seo': ['AnybodyCanBake', 'Ameba'] };
    for (const [p, names] of Object.entries(shows)) { const g = await get(p); ck(`${p} showcase shows ${names.join(', ')}`, names.every((n) => text(g.body).includes(n))); }
    const sm = (await get('/sitemap.xml')).body; ck('sitemap lists every new route', routes.every((r) => sm.includes(site + r)), 'the sitemap itself may be cached up to an hour'); ck('sitemap omits Home Decor', !/home-decor/.test(sm));
  } else for (const r of routes.filter((x) => !TODAY.has(x))) ck(`${r} is still 404`, (await get(r)).status === 404);
  return out;
}
const t0 = Date.now(); let out;
for (;;) { out = await once(); const bad = out.filter((x) => !x.ok); if (!bad.length || (Date.now() - t0) / 1000 >= waitS) break; console.error(`${bad.length} check(s) not yet true; waiting 20 s`); await new Promise((r) => setTimeout(r, 20000)); }
for (const x of out) console.log(`${x.ok ? 'PASS' : 'FAIL'}  ${x.n}${x.ok || !x.d ? '' : '  [' + x.d + ']'}`);
const f = out.filter((x) => !x.ok).length; console.log(f ? `${f} FAILED` : `ALL ${out.length} PASSED`); process.exit(f ? 2 : 0);
