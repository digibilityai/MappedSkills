// Offline rehearsal: an in-memory Contentful seeded with the REAL live schema and the REAL published entries (read through the public Delivery API,
// read-only), then check -> create -> snapshot -> stage -> publish -> rollback-publish against the manifest. Nothing is sent to the management API.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import * as T from '../release.mjs';

const SRC = JSON.parse(readFileSync(`${homedir()}/gitrepo/MappedSkills-six-cases/docs/case-release/manifest/manifest.json`, 'utf8'));
const env = Object.fromEntries(readFileSync(`${homedir()}/gitrepo/MappedSkills-six-cases/.env.local`, 'utf8').split('\n').map((l) => l.split(/=(.*)/s)).filter((x) => x[0]));
const CDA = async (p) => (await fetch(`https://cdn.contentful.com/spaces/${env.CONTENTFUL_SPACE_ID}/environments/master${p}${p.includes('?') ? '&' : '?'}access_token=${env.CONTENTFUL_ACCESS_TOKEN}`)).json();
const L = 'en-US';

async function seed() {
  const cts = (await CDA('/content_types')).items.map((c) => ({ sys: { id: c.sys.id }, fields: c.fields }));
  const store = new Map(); const pub = new Map();
  for (const t of ['caseStudies', 'caseClient', 'caseIndustry', 'caseCompanySize', 'caseTargetAudience', 'caseGeographicTarget', 'caseTestimonial']) for (const i of (await CDA(`/entries?content_type=${t}&limit=200`)).items) {
    const fields = Object.fromEntries(Object.entries(i.fields).map(([k, v]) => [k, { [L]: v }]));
    store.set(i.sys.id, { sys: { id: i.sys.id, contentType: { sys: { id: t } }, version: i.sys.revision + 1, publishedVersion: i.sys.revision }, fields });
  }
  return { cts, store };
}
const clone = (x) => JSON.parse(JSON.stringify(x));
function fakeFetch({ cts, store }, log, inj = {}) {
  const links = (e) => Object.values(e.fields).map((v) => v[L]).filter((v) => v && v.sys && v.sys.type === 'Link').map((v) => v.sys.id);
  const isPub = (e) => e && e.sys.publishedVersion != null;
  return async (url, init) => {
    const u = new URL(url); const path = u.pathname.replace(/^\/spaces\/[^/]+/, '').replace(/^\/environments\/master/, ''); const m = init.method;
    const body = init.body ? JSON.parse(init.body) : undefined; const ver = init.headers['X-Contentful-Version']; const ok = (j) => ({ ok: true, status: 200, json: async () => clone(j) });
    const err = (s, msg) => ({ ok: false, status: s, json: async () => ({ sys: { id: String(s) }, message: msg }) });
    if (m !== 'GET') log.push(`${m} ${path}`);
    if (path === '' && !u.pathname.includes('environments')) return ok({ sys: { id: 'owww06rzpjnj' }, name: 'space' });
    if (path === '') return ok({ sys: { id: 'master' } });
    if (path === '/locales') return ok({ items: [{ code: L, default: true }] });
    if (path.startsWith('/content_types')) return ok({ items: cts });
    let mm;
    if (m === 'GET' && path === '/entries') {
      const ct = u.searchParams.get('content_type'); let items = [...store.values()].filter((e) => e.sys.contentType.sys.id === ct);
      for (const [k, v] of u.searchParams) { const f = /^fields\.([a-zA-Z]+)(\[exists\])?$/.exec(k); if (!f) continue; items = items.filter((e) => (f[2] ? (e.fields[f[1]]?.[L] != null) === (v === 'true') : e.fields[f[1]]?.[L] === v)); }
      return ok({ items });
    }
    if ((mm = /^\/entries\/([^/]+)$/.exec(path))) {
      const id = decodeURIComponent(mm[1]); const cur = store.get(id);
      if (m === 'GET') return cur ? ok(cur) : err(404, 'not found');
      if (m === 'PUT') {
        if (cur) { if (String(cur.sys.version) !== ver) return err(409, 'version'); cur.fields = body.fields; cur.sys.version += 1; return ok(cur); }
        const e = { sys: { id, contentType: { sys: { id: init.headers['X-Contentful-Content-Type'] } }, version: 1 }, fields: body.fields }; store.set(id, e); return ok(e);
      }
    }
    if ((mm = /^\/entries\/([^/]+)\/published$/.exec(path))) {
      const id = decodeURIComponent(mm[1]); const cur = store.get(id);
      inj.calls = (inj.calls ?? 0) + 1; if (inj.failAt === inj.calls) return err(500, 'injected failure');
      if (m === 'PUT') { if (String(cur.sys.version) !== ver) return err(409, 'version'); for (const t of links(cur)) if (!isPub(store.get(t))) return err(422, `links to unpublished ${t}`); cur.sys.publishedVersion = cur.sys.version; cur.sys.version += 1; return ok(cur); }
      if (m === 'DELETE') { for (const e of store.values()) if (isPub(e) && links(e).includes(id)) return err(409, `referenced by published ${e.sys.id}`); delete cur.sys.publishedVersion; cur.sys.version += 1; return ok(cur); }
    }
    return err(400, `unhandled ${m} ${path}`);
  };
}
const mkApi = (fetchImpl, plan, mode) => {
  const ids = (xs) => new Set(xs.map((x) => x.id)); const nw = ids(plan.created), ex = ids(plan.staged);
  return T.makeApi({ space: 'owww06rzpjnj', token: 't', fetchImpl, allowWrite: new Set(mode === 'create' ? nw : mode.endsWith('-existing') || mode === 'rollback-publish' ? ex : []), allowPublish: new Set(mode === 'publish' || mode === 'rollback-publish' ? [...nw, ...ex] : []), allowUnpublish: new Set(mode === 'rollback-publish' ? nw : []) });
};

test('plan: 7 industries, 13 clients, 15 new studies; four existing studies staged; Om Sai and Home Decor never written', () => {
  const p = T.buildPlan(SRC); const n = {}; for (const c of p.created) n[c.role] = (n[c.role] ?? 0) + 1;
  assert.deepEqual(n, { industry: 7, client: 13, study: 15 });
  assert.deepEqual(p.staged.map((s) => s.id).sort(), ['4DpPjLCWdakD6tBmZNMnko', '6Ycb7aYvXrslOXKchQnqmi', 'b5-classpe-study', 'b5-insuryo-study']);
  for (const id of ['Cv42tYFJsR1br2z5gsjtT', '4zQL4P8SR2xogxHN4qFfUl']) assert.ok(![...p.created, ...p.staged].some((x) => x.id === id));
  assert.deepEqual(p.created.filter((c) => c.role === 'study').map((c) => c.fields.listingOrder).sort((a, b) => a - b), [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
});

test('rehearsal against the real live schema: check passes, create (drafts only), stage, publish, rollback', async () => {
  const world = await seed(); const log = []; const f = fakeFetch(world, log); const plan = T.buildPlan(SRC); const out = [];
  const lg = (m) => out.push(m);
  const live = (id) => world.store.get(id);
  const before = Object.fromEntries(['Cv42tYFJsR1br2z5gsjtT', '4zQL4P8SR2xogxHN4qFfUl'].map((id) => [id, JSON.stringify(live(id))]));
  const chk = await T.runCheck({ api: mkApi(f, plan, 'check'), src: SRC });
  assert.equal(chk.ok, true, chk.problems.join('\n')); assert.equal(log.length, 0, 'check writes nothing');
  const cr = await T.runCreate({ api: mkApi(f, plan, 'create'), src: SRC, log: lg });
  assert.equal(cr.verify.ok, true, JSON.stringify(cr.verify)); assert.equal(plan.created.length, log.length);
  for (const c of plan.created) assert.equal(live(c.id).sys.publishedVersion, undefined, `${c.id} stays a draft`);
  const snap = await T.runSnapshot({ api: mkApi(f, plan, 'snapshot') }); assert.equal(snap.ok, true, snap.problems.join('\n'));
  const st = await T.runStage({ api: mkApi(f, plan, 'stage-existing'), src: SRC, snapshot: snap, log: lg }); assert.equal(st.ok, true, st.problems.join('\n'));
  for (const s of plan.staged) assert.equal(live(s.id).sys.publishedVersion, snap.entries[s.key].sys.publishedVersion, `${s.key}: live version unchanged by staging`);
  const pb = await T.runPublish({ api: mkApi(f, plan, 'publish'), src: SRC, snapshot: snap, log: lg }); assert.equal(pb.ok, true, pb.problems.join('\n'));
  assert.equal([...world.store.values()].filter((e) => e.sys.contentType.sys.id === 'caseStudies' && e.sys.publishedVersion).length, 6 + 15, '21 published case studies (20 listed + Home Decor)');
  const rb = await T.runRollbackPublish({ api: mkApi(f, plan, 'rollback-publish'), src: SRC, snapshot: snap, log: lg }); assert.equal(rb.ok, true, rb.problems.join('\n'));
  assert.equal([...world.store.values()].filter((e) => e.sys.contentType.sys.id === 'caseStudies' && e.sys.publishedVersion).length, 6, 'back to the 6 published');
  for (const [id, was] of Object.entries(before)) assert.equal(JSON.stringify(live(id)), was, `${id} never touched`);
  const forbidden = log.filter((l) => /Cv42tYFJsR1br2z5gsjtT|4zQL4P8SR2xogxHN4qFfUl/.test(l)); assert.deepEqual(forbidden, []);
});

// ---- partial failure and resumability ------------------------------------------------------------------------------------------------------------
const listing = (store) => [...store.values()].filter((e) => e.sys.contentType.sys.id === 'caseStudies' && e.sys.publishedVersion != null && e.sys.id !== '4zQL4P8SR2xogxHN4qFfUl');
const orders = (store) => listing(store).map((e) => e.fields.listingOrder?.[L]).filter((x) => x != null).sort((a, b) => a - b);
const contiguous = (o) => o.every((v, i) => v === i + 1);
const publishedSet = (store) => JSON.stringify([...store.values()].filter((e) => e.sys.publishedVersion != null).map((e) => [e.sys.id, e.sys.publishedVersion != null]).sort());

async function prepared() {
  const world = await seed(); const log = []; const inj = {}; const f = fakeFetch(world, log, inj); const plan = T.buildPlan(SRC); const nolog = () => {};
  await T.runCreate({ api: mkApi(f, plan, 'create'), src: SRC, log: nolog });
  const snap = await T.runSnapshot({ api: mkApi(f, plan, 'snapshot') });
  await T.runStage({ api: mkApi(f, plan, 'stage-existing'), src: SRC, snapshot: snap, log: nolog });
  return { world, f, inj, plan, snap, nolog };
}
const total = (() => { const p = T.buildPlan(SRC); return p.created.length + p.staged.length; })();

test('publish is sequential, not atomic: a failure at ANY step leaves a valid state (links resolve, listing contiguous) and a re-run completes it', async () => {
  for (const k of [1, 2, 8, 9, 20, 21, 22, 24, 29, 35, 38, total]) {
    const w = await prepared(); w.inj.calls = 0; w.inj.failAt = k;
    let threw = false;
    try { await T.runPublish({ api: mkApi(w.f, w.plan, 'publish'), src: SRC, snapshot: w.snap, log: w.nolog }); } catch (e) { threw = true; assert.match(e.message, /HTTP 500/); }
    assert.equal(threw, true, `failure at call ${k} surfaces`);
    assert.ok(contiguous(orders(w.world.store)), `after failure at ${k}: listing orders ${orders(w.world.store)} contiguous`);
    for (const e of w.world.store.values()) if (e.sys.publishedVersion != null && e.sys.version === e.sys.publishedVersion + 1) for (const t of Object.values(e.fields).map((v) => v[L]).filter((v) => v?.sys?.type === 'Link').map((v) => v.sys.id)) assert.ok(w.world.store.get(t).sys.publishedVersion != null, `${e.sys.id} links to published ${t}`);
    w.inj.failAt = undefined;
    const again = await T.runPublish({ api: mkApi(w.f, w.plan, 'publish'), src: SRC, snapshot: w.snap, log: w.nolog });
    assert.equal(again.ok, true, `resume after failure at ${k}: ${again.problems?.join('; ')}`);
    assert.equal(listing(w.world.store).length, 20, '20 listed (Home Decor is published but outside the listing)'); assert.deepEqual(orders(w.world.store), Array.from({ length: 20 }, (_, i) => i + 1));
    const third = await T.runPublish({ api: mkApi(w.f, w.plan, 'publish'), src: SRC, snapshot: w.snap, log: w.nolog });
    assert.equal(third.ok, true); assert.ok(Object.values(third.status).every((x) => /already published/.test(x)), 'a third run changes nothing');
  }
});

test('rollback is also sequential and resumable: failure at any step, then re-run; the result is exactly the verified snapshot; nothing deleted', async () => {
  for (const k of [1, 5, 15, 16, 17, 20, 24, 30]) {
    const w = await prepared(); const full = await T.runPublish({ api: mkApi(w.f, w.plan, 'publish'), src: SRC, snapshot: w.snap, log: w.nolog }); assert.equal(full.ok, true);
    const n = w.world.store.size; w.inj.calls = 0; w.inj.failAt = k;
    let threw = false;
    try { await T.runRollbackPublish({ api: mkApi(w.f, w.plan, 'rollback-publish'), src: SRC, snapshot: w.snap, log: w.nolog }); } catch (e) { threw = true; }
    assert.equal(threw, true, `rollback failure at ${k} surfaces`); assert.ok(contiguous(orders(w.world.store)), `rollback failure at ${k}: listing contiguous (${orders(w.world.store)})`);
    w.inj.failAt = undefined;
    const rb = await T.runRollbackPublish({ api: mkApi(w.f, w.plan, 'rollback-publish'), src: SRC, snapshot: w.snap, log: w.nolog });
    assert.equal(rb.ok, true, `resume rollback after failure at ${k}: ${rb.problems?.join('; ')}`);
    assert.equal(listing(w.world.store).length, 5, 'the 5 originally listed studies are live again (Home Decor is outside this count)');
    assert.equal(w.world.store.size, n, 'nothing deleted');
    for (const s of w.plan.staged) assert.equal(JSON.stringify(w.world.store.get(s.id).fields), JSON.stringify(w.snap.entries[s.key].fields), `${s.key} is exactly the snapshot`);
  }
});

test('the snapshot is verified before use: it must be clean, and a changed live entry stops stage and publish', async () => {
  const w = await prepared();
  const bad = { ...w.snap, ok: false };
  await assert.rejects(() => T.runPublish({ api: mkApi(w.f, w.plan, 'publish'), src: SRC, snapshot: bad, log: w.nolog }), /snapshot is not an ok snapshot/);
  // someone edits ClassPe after the snapshot: publish refuses
  const e = w.world.store.get('b5-classpe-study'); e.fields.summary = { [L]: 'edited by someone else' }; e.sys.version += 1;
  await assert.rejects(() => T.runPublish({ api: mkApi(w.f, w.plan, 'publish'), src: SRC, snapshot: w.snap, log: w.nolog }), /not the staged target|preflight stopped/);
  assert.equal(listing(w.world.store).length, 5, 'nothing was published');
});
