// READ-ONLY. Builds the exact Contentful migration manifest for the case-study release (DEC-117).
// Inputs: the approved local preview entries (code, development preview switched on in THIS process only) and the live published Contentful
// content read through the public Delivery API (the same read-only token the website build uses). Nothing is written anywhere except the two output files.
//   node docs/case-release/tools/build-manifest.cjs
process.env.NODE_ENV = 'development'; process.env.CASE_STUDY_LOCAL_PREVIEW = '1'; process.env.NEXT_PUBLIC_CASE_FINAL_FOUR = '1';
const fs = require('node:fs'); const path = require('node:path');
const root = path.join(__dirname, '../../..'); const outDir = path.join(__dirname, '../manifest');
for (const l of fs.readFileSync(path.join(root, '.env.local'), 'utf8').split('\n')) { const m = /^(CONTENTFUL_SPACE_ID|CONTENTFUL_ACCESS_TOKEN|CONTENTFUL_ENVIRONMENT)=(.*)$/.exec(l); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ''); }
const Module = require('node:module'); Module._extensions['.css'] = () => {}; const realLoad = Module._load;
Module._load = function (request, ...rest) { if (request === 'next/font/local' || request === 'next/font/google') return () => ({ className: '', variable: '', style: {} }); return realLoad.call(this, request, ...rest); };
const { load } = require(path.join(root, 'tests/helpers/ts-loader.cjs'));
const canon = (v) => JSON.stringify(v, (_k, x) => (x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.keys(x).sort().map((k) => [k, x[k]])) : x));
const stripEmpty = (n) => Array.isArray(n) ? n.map(stripEmpty) : n && typeof n === 'object' ? Object.fromEntries(Object.entries(n).filter(([k, v]) => !(k === 'data' && v && !Object.keys(v).length) && !(k === 'marks' && Array.isArray(v) && !v.length)).map(([k, v]) => [k, stripEmpty(v)])) : n;
const rt = (x) => canon(stripEmpty(x && x.json ? x.json : x));
const routeOf = (s) => (s || '').replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');
(async () => {
  const { SPACE = process.env.CONTENTFUL_SPACE_ID } = {}; const env = process.env.CONTENTFUL_ENVIRONMENT || 'master';
  const get = async (t) => (await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${env}/entries?content_type=${t}&limit=200&access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`)).json();
  const [cs, cl, ind] = await Promise.all([get('caseStudies'), get('caseClient'), get('caseIndustry')]);
  const live = cs.items.map((i) => ({ id: i.sys.id, rev: i.sys.revision, f: i.fields }));
  const clients = Object.fromEntries(cl.items.map((i) => [i.sys.id, i.fields.clientName])); const industries = Object.fromEntries(ind.items.map((i) => [i.sys.id, i.fields.name]));
  const liveByRoute = Object.fromEntries(live.map((e) => [routeOf(e.f.slug), e]));
  // the approved local entries: the same merge the preview applies, starting from the live published entries
  const P = load('lib/case-study-local-preview.ts'); const mk = (e) => ({ sys: { id: e.id }, title: e.f.title, slug: e.f.slug, listingOrder: e.f.listingOrder ?? null, clientName: { clientName: clients[e.f.clientName.sys.id], date: '' }, industry: { name: industries[e.f.industry.sys.id] }, summary: e.f.summary, problem: { json: e.f.problem }, whatWeDid: { json: e.f.whatWeDid }, impact: { json: e.f.impact }, evidenceNote: e.f.evidenceNote, showTestimonial: e.f.showTestimonial, sector: e.f.sector, serviceKey: e.f.serviceKey, periodStart: e.f.periodStart ?? null, periodEnd: e.f.periodEnd ?? null });
  const local = P.withLocalPreview(live.map(mk));
  const IMG = load('lib/case-study-images.ts'); const PRES = load('lib/case-study-presentation.ts');
  const ORDER = ['om-sai-developer-meta-ads', 'classpe-social-media-strategy', 'insuryo-organic-growth', 'seo-ameba-software', 'google-ads-for-online-courses', 'anybodycanbake-meta-ads', 'ekoching-google-ads', 'klenzmo-meta-ads', 'bakersville-google-ads', 'phoenix-laundry-google-ads', 'hutnhomes-meta-ads', 'anybodycanbake-seo', 'advit-prints-meta-ads', 'meticulous-business-plan-google-ads', 'libros-library-meta-ads', 'bakedemy-google-ads', 'bakedemy-meta-ads', 'bblewrap-google-ads', 'talreja-talreja-google-ads', 'wanderlooms-meta-ads'];
  const FIELDS = ['title', 'slug', 'summary', 'problem', 'whatWeDid', 'impact', 'evidenceNote', 'showTestimonial', 'sector', 'serviceKey', 'periodStart', 'periodEnd'];
  const inv = []; const used = new Set(); const newClients = new Map(), newIndustries = new Map(); const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
  for (const route of ORDER) {
    const e = local.find((x) => routeOf(x.slug) === route); if (!e) throw new Error('no local entry for ' + route);
    const lv = liveByRoute[route] || null; const order = ORDER.indexOf(route) + 1; const href = '/portfolio/' + route;
    const slots = IMG.imageSlotsFor(href); const pres = PRES.presentationFor(href);
    const files = [slots.card && slots.card.src, slots.feature && slots.feature.src, slots.feature && slots.feature.narrow && slots.feature.narrow.src, pres.impactMedia && pres.impactMedia.src].filter(Boolean);
    const missing = files.filter((f) => !fs.existsSync(path.join(root, 'public', f)));
    const clientName = e.clientName.clientName, industryName = e.industry.name;
    // identity: an existing entry keeps its ID, slug spelling and linked client; new entries get fixed, readable IDs (the batch-five convention)
    const changed = []; const liveVals = {};
    if (lv) for (const k of FIELDS) {
      const a = k === 'problem' || k === 'whatWeDid' || k === 'impact' ? rt(e[k]) : String(e[k] ?? ''); const b = k === 'problem' || k === 'whatWeDid' || k === 'impact' ? rt(lv.f[k]) : String(lv.f[k] ?? '');
      if (k === 'slug') continue; if (a !== b) changed.push(k);
    }
    const liveClient = lv ? clients[lv.f.clientName.sys.id] : null, liveIndustry = lv ? industries[lv.f.industry.sys.id] : null;
    if (lv && liveOrder(lv) !== order) changed.push('listingOrder');
    function liveOrder(x) { return x.f.listingOrder == null ? null : x.f.listingOrder; }
    const indMatch = Object.entries(industries).find(([, n]) => n === industryName);
    const slugKey = route;
    function clientRef(name) { const ex = Object.entries(clients).find(([, n]) => n === name); if (ex) return { id: ex[0], reuse: true }; if (!newClients.has(name)) newClients.set(name, `cs-client-${slugify(name)}`); return { id: newClients.get(name), create: true }; }
    function industryRef(name, m) { if (m) return { id: m[0], reuse: true }; if (!newIndustries.has(name)) newIndustries.set(name, `cs-industry-${slugify(name)}`); return { id: newIndustries.get(name), create: true }; }
    inv.push({
      listingOrder: order, route: href, action: lv ? (changed.length ? 'UPDATE existing entry' : 'NO CHANGE (already live)') : 'CREATE new entry',
      entryId: lv ? lv.id : `cs-${slugKey}`, liveRevision: lv ? lv.rev : null, slug: lv ? lv.f.slug : e.slug, title: e.title, client: clientName, industry: industryName,
      clientEntry: lv ? (liveClient === clientName ? { id: lv.f.clientName.sys.id, liveName: liveClient, change: 'none' } : { ...clientRef(clientName), replaces: lv.f.clientName.sys.id, liveName: liveClient, change: `link to a NEW client entry "${clientName}" (the existing client entry is left untouched)` }) : clientRef(clientName),
      industryEntry: lv ? { id: lv.f.industry.sys.id, liveName: liveIndustry, change: liveIndustry === industryName ? 'none' : 'KEEP (shared; card shows sector label, not this name)' } : industryRef(industryName, indMatch),
      sector: e.sector, serviceKey: e.serviceKey, periodStart: e.periodStart, periodEnd: e.periodEnd, showTestimonial: e.showTestimonial,
      changedFields: lv ? changed : 'all', listingEligibility: route === 'seo-for-home-decor-brand' ? 'unlisted' : 'listed', assetsInRepo: files, missingAssets: missing,
      fields: Object.fromEntries(FIELDS.filter((k) => k !== 'slug').concat(['clientName']).map((k) => [k, k === 'clientName' ? clientName : (k === 'problem' || k === 'whatWeDid' || k === 'impact' ? (e[k].json || e[k]) : e[k])])),
    });
    used.add(route);
  }
  const linked = { newClients: [...newClients].map(([name, id]) => ({ id, clientName: name })), newIndustries: [...newIndustries].map(([name, id]) => ({ id, name })) };
  const homeDecor = liveByRoute['seo-for-home-decor-brand'];
  const out = { generated: new Date().toISOString().slice(0, 10), space: process.env.CONTENTFUL_SPACE_ID, environment: env, liveSnapshot: { publishedCaseStudies: live.length, ids: live.map((l) => `${l.id}@v${l.rev}`) }, publicListing: inv.length, linkedEntriesToCreate: linked,
    unlisted: homeDecor ? [{ entryId: homeDecor.id, route: '/portfolio/seo-for-home-decor-brand', note: 'published, unlisted in code (UNLISTED_CASE_STUDY_IDS); no Contentful change; legacy route preserved' }] : [], entries: inv };
  fs.mkdirSync(outDir, { recursive: true }); fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(out, null, 1) + '\n');
  const md = ['# Contentful migration manifest (generated, read-only)', '', `Space \`${out.space}\`, environment \`${env}\`. Live snapshot: ${live.length} published case studies (${live.map((l) => l.id).join(', ')}). Public listing after release: ${inv.length}. Home Decor stays published and unlisted. New client entries: ${linked.newClients.length}; new industry entries: ${linked.newIndustries.length}.`, '', 'New caseClient entries: ' + linked.newClients.map((c) => '`' + c.id + '` (' + c.clientName + ')').join('; '), '', 'New caseIndustry entries: ' + linked.newIndustries.map((c) => '`' + c.id + '` (' + c.name + ')').join('; '), '', '| # | Route | Action | Entry ID | Client entry | Industry entry | Sector / service | Period | Changed fields | Missing assets |', '|---|---|---|---|---|---|---|---|---|---|', ...inv.map((r) => `| ${r.listingOrder} | ${r.route} | ${r.action} | \`${r.entryId}\` | ${r.clientEntry.create ? 'CREATE `' + r.clientEntry.id + '`' + (r.clientEntry.replaces ? ' (replaces link to `' + r.clientEntry.replaces + '`)' : '') : r.clientEntry.reuse ? 'reuse `' + r.clientEntry.id + '`' : '`' + r.clientEntry.id + '` none'} | ${r.industryEntry.create ? 'CREATE `' + r.industryEntry.id + '`' : r.industryEntry.reuse ? 'reuse `' + r.industryEntry.id + '`' : '`' + r.industryEntry.id + '` ' + r.industryEntry.change} | ${r.sector || '-'} / ${r.serviceKey || '-'} | ${r.periodStart || '-'} to ${r.periodEnd || '-'} | ${Array.isArray(r.changedFields) ? r.changedFields.join(', ') || '-' : 'all'} | ${r.missingAssets.length ? r.missingAssets.join(', ') : 'none'} |`)].join('\n');
  fs.writeFileSync(path.join(outDir, 'MANIFEST.md'), md + '\n'); console.log(md);
})().catch((e) => { console.error(e); process.exit(1); });
