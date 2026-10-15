/**
 * E6-A1 R1 (DEC-038) — consent initialisation before the GTM container.
 *
 * Runs the REAL `lib/consent.ts`, `lib/gtm.tsx` and `lib/analytics.ts`: each is
 * transpiled with the project's own TypeScript (the compiler `npm run typecheck`
 * already uses; no new dependency) and evaluated inside a fresh `vm` context
 * that stands in for one browser document. The inline scripts are executed as
 * strings, exactly as the browser receives them.
 *
 * A "page" is built from what the browser actually does:
 *   - a page that served the layout runs CONSENT_BOOTSTRAP_SCRIPT first;
 *   - a route-level 404 (the `__next_error__` shell) never runs it;
 *   - `AnalyticsRouteListener` then queues `page_view`;
 *   - the loader body (`gtmLoaderScript`) runs only when the consent gate opens.
 * The fake `document.insertBefore` snapshots `dataLayer` at the moment the
 * `gtm.js` element is created: that is what the container reads first.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const ROOT = path.join(__dirname, '..');
const compiled = {};
function source(rel) {
  if (!compiled[rel]) {
    const out = ts.transpileModule(fs.readFileSync(path.join(ROOT, rel), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2015, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    });
    compiled[rel] = out.outputText;
  }
  return compiled[rel];
}

const KEY = 'ms.consent.v1';
const GTM_ID = 'GTM-TEST000';

/** One browser document. `stored`: the localStorage value, or a function that throws. */
function page({ stored = null, consentState = 'granted' } = {}) {
  const store = new Map();
  if (typeof stored === 'string') store.set(KEY, stored);
  const throwing = stored === THROW;
  const session = new Map();
  const ctx = {
    console,
    localStorage: {
      getItem: (k) => { if (throwing) throw new Error('blocked'); return store.has(k) ? store.get(k) : null; },
      setItem: (k, v) => { if (throwing) throw new Error('blocked'); store.set(k, String(v)); },
    },
    sessionStorage: { getItem: (k) => (session.has(k) ? session.get(k) : null), setItem: (k, v) => session.set(k, String(v)) },
    process: { env: { NODE_ENV: 'production', NEXT_PUBLIC_GTM_ID: GTM_ID } },
    gtmLoads: [],
  };
  ctx.window = ctx;
  ctx.document = {
    getElementsByTagName: () => [{ parentNode: { insertBefore: (el) => ctx.gtmLoads.push({ src: el.src, seen: summary(ctx.dataLayer) }) } }],
    createElement: () => ({}),
  };
  vm.createContext(ctx);
  const modules = {};
  const load = (rel) => {
    if (modules[rel]) return modules[rel].exports;
    const mod = { exports: {} };
    modules[rel] = mod;
    const req = (id) => {
      if (id === '@/lib/consent') return load('lib/consent.ts');
      if (id === 'next/script') return { __esModule: true, default: 'Script' };
      if (id === 'react/jsx-runtime') return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (id === '@/components/analytics/ConsentProvider') return { useConsent: () => ({ state: consentState }) };
      throw new Error(`unexpected import ${id}`);
    };
    vm.runInContext(`(function (exports, require, module) {${source(rel)}\n})`, ctx)(mod.exports, req, mod);
    return mod.exports;
  };
  const consent = load('lib/consent.ts');
  const gtm = load('lib/gtm.tsx');
  const analytics = load('lib/analytics.ts');
  return {
    ctx, consent, gtm, analytics,
    run: (script) => vm.runInContext(script, ctx),
    bootstrap() { this.run(consent.CONSENT_BOOTSTRAP_SCRIPT); return this; },
    pageView(p = '/x') { analytics.track('page_view', { page_path: p, page_type: 'other' }); return this; },
    loadGtm() { this.run(gtm.gtmLoaderScript(GTM_ID)); return this; },
    dl: () => summary(ctx.dataLayer),
    raw: () => ctx.dataLayer,
    stored: () => store.get(KEY) ?? null,
  };
}
const THROW = Symbol('throw');

/** `cmd:consent default{…}` / `event:page_view` — plain, comparable values. */
function summary(layer) {
  // Host-realm array: the page's own array belongs to the vm realm.
  return Array.prototype.map.call(layer || [], (x) => {
    if (x && typeof x === 'object' && x.event) return `event:${x.event}`;
    const q = Array.prototype.slice.call(x);
    return `cmd:${q[0]} ${q[1]} ${JSON.stringify(q[2])}`;
  });
}
const DEFAULT = 'cmd:consent default {"ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","analytics_storage":"denied"}';
const GRANTED = 'cmd:consent update {"analytics_storage":"granted","ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied"}';
const DENIED = 'cmd:consent update {"analytics_storage":"denied","ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied"}';
const count = (list, s) => list.filter((x) => x === s).length;
const consentCmds = (list) => list.filter((x) => x.startsWith('cmd:'));

function assertNoAdGrant(list) {
  for (const c of consentCmds(list)) for (const k of ['ad_storage', 'ad_user_data', 'ad_personalization']) assert.ok(c.includes(`"${k}":"denied"`), `${k} not denied in ${c}`);
}

// ---------------------------------------------------------------- ordinary pages (bootstrap ran): unchanged
test('ordinary page, returning accepted: guard is a no-op; container sees default → update → page_view', () => {
  const p = page({ stored: 'granted' }).bootstrap().pageView().loadGtm();
  assert.deepEqual(p.ctx.gtmLoads[0].seen, [DEFAULT, GRANTED, 'event:page_view', 'event:gtm.js']);
  assert.deepEqual(p.dl(), [DEFAULT, GRANTED, 'event:page_view', 'event:gtm.js']);
});

test('ordinary page, first-time visitor accepts: identical to pre-R1 order', () => {
  const p = page().bootstrap().pageView();
  p.consent.writeStoredConsent('granted');
  p.consent.pushConsentUpdate('granted');
  p.loadGtm();
  assert.deepEqual(p.ctx.gtmLoads[0].seen, [DEFAULT, 'event:page_view', GRANTED, 'event:gtm.js']);
  assert.equal(count(p.dl(), DEFAULT), 1);
});

// ---------------------------------------------------------------- route-level 404 (bootstrap never ran)
test('route-level 404, returning accepted: container sees exactly what the bootstrap would have written', () => {
  const p = page({ stored: 'granted' }).pageView().loadGtm();
  assert.equal(p.ctx.gtmLoads.length, 1);
  assert.deepEqual(p.ctx.gtmLoads[0].seen, [DEFAULT, GRANTED, 'event:page_view', 'event:gtm.js']);
  // parity with an ordinary page built from the real bootstrap
  const q = page({ stored: 'granted' }).bootstrap().pageView().loadGtm();
  assert.deepEqual(p.ctx.gtmLoads[0].seen, q.ctx.gtmLoads[0].seen);
});

test('route-level 404 → client navigation to /contact: initialisation persists, nothing is re-added', () => {
  const p = page({ stored: 'granted' }).pageView('/blog/x').loadGtm();
  p.pageView('/contact');
  p.loadGtm(); // a remount of the loader on the next route
  const list = p.dl();
  assert.equal(count(list, DEFAULT), 1);
  assert.equal(count(list, GRANTED), 1);
  assert.equal(p.ctx.gtmLoads.length, 1, 'container requested once');
});

test('route-level 404, first-time visitor accepts from the banner: default precedes the update', () => {
  const p = page().pageView();
  p.consent.writeStoredConsent('granted');
  p.consent.pushConsentUpdate('granted');
  p.loadGtm();
  assert.deepEqual(p.ctx.gtmLoads[0].seen, [DEFAULT, 'event:page_view', GRANTED, 'event:gtm.js']);
  assert.equal(count(p.dl(), GRANTED), 1, 'the loader does not replay a second update');
});

test('route-level 404, first-time visitor rejects: default then denied update; no container', () => {
  const p = page().pageView();
  p.consent.writeStoredConsent('denied');
  p.consent.pushConsentUpdate('denied');
  assert.deepEqual(p.dl(), [DEFAULT, 'event:page_view', DENIED]);
  assert.equal(p.ctx.gtmLoads.length, 0);
});

// ---------------------------------------------------------------- the gate itself is unchanged
test('returning rejected / undecided: GoogleTagManager renders nothing, so no loader runs', () => {
  for (const state of ['denied', 'unset']) {
    const p = page({ stored: state === 'denied' ? 'denied' : null, consentState: state });
    assert.equal(p.gtm.GoogleTagManager(), null);
  }
  const g = page({ stored: 'granted', consentState: 'granted' });
  const el = g.gtm.GoogleTagManager();
  assert.equal(el.props.id, 'gtm-script');
  assert.equal(el.props.strategy, 'afterInteractive');
  assert.ok(el.props.dangerouslySetInnerHTML.__html.startsWith(g.consent.CONSENT_GUARD_SCRIPT), 'guard is the first thing in the loader');
});

test('returning rejected: the guard alone never replays a grant', () => {
  const p = page({ stored: 'denied' }).pageView();
  p.run(p.consent.CONSENT_GUARD_SCRIPT);
  assert.deepEqual(p.dl(), [DEFAULT, 'event:page_view']);
});

// ---------------------------------------------------------------- stored value edge cases
test('missing, malformed or unreadable stored choice: default only, never a grant', () => {
  for (const stored of [null, '', 'GRANTED', 'true', '{"granted":true}', ' granted', THROW]) {
    const p = page({ stored }).pageView();
    p.run(p.consent.CONSENT_GUARD_SCRIPT);
    assert.deepEqual(p.dl(), [DEFAULT, 'event:page_view'], `stored=${String(stored)}`);
  }
});

test('a non-array dataLayer is replaced, never thrown on', () => {
  const p = page({ stored: 'granted' });
  p.ctx.dataLayer = { push() {} };
  assert.doesNotThrow(() => p.loadGtm());
  assert.deepEqual(p.ctx.gtmLoads[0].seen, [DEFAULT, GRANTED, 'event:gtm.js']);
});

// ---------------------------------------------------------------- idempotence and ordering
test('repeated initialisation writes nothing twice', () => {
  const p = page({ stored: 'granted' }).pageView();
  for (let i = 0; i < 3; i++) { p.run(p.consent.CONSENT_GUARD_SCRIPT); p.consent.ensureConsentDefault(); p.loadGtm(); }
  const list = p.dl();
  assert.equal(count(list, DEFAULT), 1);
  assert.equal(count(list, GRANTED), 1);
  assert.equal(count(list, 'event:gtm.js'), 1);
  assert.equal(p.ctx.gtmLoads.length, 1);
});

test('consent update queued before any default: the default is placed ahead of it', () => {
  const p = page({ stored: 'granted' }).pageView();
  p.ctx.dataLayer.push((function () { return arguments; })('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }));
  p.loadGtm();
  const seen = p.ctx.gtmLoads[0].seen;
  assert.equal(seen[0], DEFAULT);
  assert.equal(count(seen, GRANTED), 1, 'an update already queued is not replayed again');
  const q = page().pageView();
  q.ctx.dataLayer.push((function () { return arguments; })('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }));
  q.consent.ensureConsentDefault();
  assert.deepEqual(q.dl(), [DEFAULT, 'event:page_view', DENIED]);
});

test('withdrawal after the container loaded: one denied update appended, no second default', () => {
  const p = page({ stored: 'granted' }).bootstrap().pageView().loadGtm();
  p.consent.writeStoredConsent('denied');
  p.consent.pushConsentUpdate('denied');
  const list = p.dl();
  assert.equal(list[list.length - 1], DENIED);
  assert.equal(count(list, DEFAULT), 1);
  assert.equal(p.stored(), 'denied');
});

test('if a container were already running, a missing default is appended (never inserted behind it)', () => {
  const p = page().pageView();
  p.ctx.__msGtmLoaded = true;
  p.consent.ensureConsentDefault();
  assert.deepEqual(p.dl(), ['event:page_view', DEFAULT]);
});

test('GTM loading order: guard → gtm.start → gtm.js element; container id unchanged', () => {
  const p = page({ stored: 'granted' }).pageView().loadGtm();
  assert.equal(p.ctx.gtmLoads[0].src, `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
  const seen = p.ctx.gtmLoads[0].seen;
  assert.ok(seen.indexOf(DEFAULT) === 0 && seen.indexOf(GRANTED) < seen.indexOf('event:gtm.js'));
  assert.equal(p.ctx.__msGtmLoaded, true);
});

// ---------------------------------------------------------------- what the guard may write
test('the guard writes only consent commands, with the three advertising signals denied', () => {
  for (const stored of ['granted', 'denied', null]) {
    const p = page({ stored }).pageView();
    const before = p.raw().length;
    p.loadGtm();
    const added = p.dl().filter((x) => x.startsWith('cmd:'));
    assert.equal(p.raw().length - before, added.length + 1, 'only consent commands plus GTM\'s own gtm.js');
    assertNoAdGrant(p.dl());
    assert.ok(!JSON.stringify(p.dl()).includes('@'));
  }
});

test('ensureConsentDefault and the guard write the same default as the bootstrap', () => {
  const a = page().bootstrap().dl();
  const b = page(); b.consent.ensureConsentDefault();
  const c = page(); c.run(c.consent.CONSENT_GUARD_SCRIPT);
  assert.deepEqual(b.dl(), a);
  assert.deepEqual(c.dl(), a);
  const d = page({ stored: 'granted' }).bootstrap().dl();
  const e = page({ stored: 'granted' }); e.run(e.consent.CONSENT_GUARD_SCRIPT);
  assert.deepEqual(e.dl(), d);
});

// ---------------------------------------------------------------- duplicate-event prevention (unchanged contract)
test('trackOnce: one lead_form_submitted per idempotency key; payload never carries the key', () => {
  const p = page();
  const key = '3f1c1d52-6c52-4a5e-9a39-0b8f7a1d2e10';
  for (let i = 0; i < 3; i++) p.analytics.trackOnce('lead_form_submitted', key, { form_id: 'contact_enquiry', conversion_surface: 'form' });
  p.analytics.trackOnce('lead_form_submitted', 'another-key', { form_id: 'contact_enquiry' });
  const events = p.raw().filter((x) => x.event === 'lead_form_submitted');
  assert.equal(events.length, 2);
  assert.ok(!JSON.stringify(events).includes(key));
  assert.ok(events.every((e) => e.environment === 'production'));
});

test('track: no PII survives sanitising', () => {
  const p = page();
  p.analytics.track('lead_form_started', { page_path: '/contact', note: 'a@b.example <x>' });
  const e = p.raw()[0];
  assert.ok(!JSON.stringify(e).includes('@'));
  assert.ok(!JSON.stringify(e).includes('<'));
});
