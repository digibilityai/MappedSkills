/**
 * GATE 4 · B0 — shared library for the site-wide regression harness.
 *
 * Extends the Gate 2–3 checks (QA_REGRESSION_RUNBOOK.md §3) from three routes
 * to all 28 page templates. Dependencies resolve from the project
 * (`playwright-core`, `axe-core` devDependencies); no absolute paths.
 *
 * TWO SERVERS. A plain production build (no Contentful credentials: this is the
 * real local behaviour) and a FIXTURE build of the same commit (synthetic CMS
 * entries through the real client; see cms-fixtures/). Each target names the
 * server it runs on and how its CMS content is sourced, so an empty CMS page is
 * never mistaken for a rendered one.
 *
 * FINDINGS. Checks emit findings with a stable fingerprint
 * `check|target|width|key`. A later run is classified against a baseline run
 * (classify.cjs): fingerprints present in the baseline are KNOWN (and are
 * mapped to a register ID where known-defects.json names one), new ones are
 * NEW (a regression until explained), missing ones are RESOLVED.
 */
const fs = require('fs');
const path = require('path');
const pw = require('playwright-core');

const WIDTHS = [320, 360, 390, 430, 768, 1024, 1440];
const heightFor = (w) => (w >= 1024 ? 900 : w >= 768 ? 1024 : 800);

/**
 * The 28 page templates (27 `page.tsx` + not-found). `server`: which build
 * serves the target. `cms`: static | fixture | empty-cms (plain build, no
 * credentials: the empty state is real local behaviour) | not-covered.
 */
const TEMPLATES = [
  { n: 1, template: '/', cat: 'A', system: 'direction-c', targets: [{ id: 'home', url: '/' }] },
  { n: 2, template: '/services', cat: 'A', system: 'direction-c', targets: [{ id: 'services', url: '/services' }] },
  { n: 3, template: '/seo', cat: 'A', system: 'direction-c', targets: [{ id: 'seo', url: '/seo' }] },
  { n: 4, template: '/google-ads', cat: 'B', system: 'resolve', targets: [{ id: 'google-ads', url: '/google-ads' }] },
  { n: 5, template: '/social-media-ads', cat: 'B', system: 'resolve', targets: [{ id: 'social-media-ads', url: '/social-media-ads' }] },
  { n: 6, template: '/ai-seo', cat: 'B', system: 'resolve', targets: [{ id: 'ai-seo', url: '/ai-seo' }] },
  { n: 7, template: '/lead-generation', cat: 'B', system: 'resolve', targets: [{ id: 'lead-generation', url: '/lead-generation' }] },
  { n: 8, template: '/conversion-optimization', cat: 'B', system: 'resolve', targets: [{ id: 'conversion-optimization', url: '/conversion-optimization' }] },
  { n: 9, template: '/problems/traffic-but-no-enquiries', cat: 'C', system: 'resolve', targets: [{ id: 'problems', url: '/problems/traffic-but-no-enquiries' }] },
  { n: 10, template: '/pricing', cat: 'C', system: 'resolve', targets: [{ id: 'pricing', url: '/pricing' }] },
  { n: 11, template: '/how-it-works', cat: 'D', system: 'resolve', targets: [{ id: 'how-it-works', url: '/how-it-works' }] },
  { n: 12, template: '/about', cat: 'D', system: 'resolve', targets: [{ id: 'about', url: '/about' }] },
  { n: 13, template: '/faq', cat: 'D', system: 'resolve', targets: [{ id: 'faq', url: '/faq' }] },
  { n: 14, template: '/contact', cat: 'E', system: 'resolve', targets: [{ id: 'contact', url: '/contact' }] },
  { n: 15, template: '/schedule-call', cat: 'E', system: 'resolve', targets: [{ id: 'schedule-call', url: '/schedule-call' }] },
  { n: 16, template: '/thank-you', cat: 'E', system: 'resolve', targets: [{ id: 'thank-you', url: '/thank-you' }] },
  { n: 17, template: '/blog', cat: 'F', system: 'resolve', targets: [
    { id: 'blog', url: '/blog', cms: 'empty-cms' },
    { id: 'blog~fixture', url: '/blog', server: 'fixture', cms: 'fixture' },
  ] },
  { n: 18, template: '/research', cat: 'F', system: 'resolve', targets: [{ id: 'research', url: '/research', cms: 'empty-cms' }] },
  { n: 19, template: '/research/[slug]', cat: 'F', system: 'resolve', targets: [
    { id: 'research-slug~not-found', url: '/research/b0-no-such-report', cms: 'not-covered', status: 404, note: 'Only the not-found path is testable: no credentials and no research fixture' },
  ] },
  { n: 20, template: '/press', cat: 'F', system: 'resolve', targets: [{ id: 'press', url: '/press', cms: 'empty-cms' }] },
  { n: 21, template: '/press/[slug]', cat: 'F', system: 'resolve', targets: [
    { id: 'press-slug~not-found', url: '/press/b0-no-such-release', cms: 'not-covered', status: 404, note: 'Only the not-found path is testable: no credentials, no press fixture, and 0 entries on production' },
  ] },
  { n: 22, template: '/blog/[slug]', cat: 'F', system: 'legacy', targets: [
    { id: 'blog-slug~fixture-full', url: '/blog/fixture-article-full-structure', server: 'fixture', cms: 'fixture' },
    { id: 'blog-slug~fixture-minimal', url: '/blog/fixture-article-minimal', server: 'fixture', cms: 'fixture' },
    { id: 'blog-slug~not-found', url: '/blog/b0-no-such-post', cms: 'empty-cms', status: 404 },
  ] },
  { n: 23, template: '/work', cat: 'H', system: 'resolve', targets: [
    { id: 'work', url: '/work', cms: 'empty-cms' },
    { id: 'work~fixture', url: '/work', server: 'fixture', cms: 'fixture' },
  ] },
  { n: 24, template: '/portfolio/[slug]', cat: 'H', system: 'legacy', targets: [
    { id: 'portfolio-slug~fixture-open', url: '/portfolio/fixture-case-study-open', server: 'fixture', cms: 'fixture' },
    { id: 'portfolio-slug~fixture-withheld', url: '/portfolio/google-ads-for-online-courses', server: 'fixture', cms: 'fixture' },
    { id: 'portfolio-slug~not-found', url: '/portfolio/b0-no-such-study', cms: 'empty-cms', status: 404 },
  ] },
  { n: 25, template: '/privacy-policy', cat: 'G', system: 'legacy', targets: [{ id: 'privacy-policy', url: '/privacy-policy' }] },
  { n: 26, template: '/terms', cat: 'G', system: 'legacy', targets: [{ id: 'terms', url: '/terms' }] },
  { n: 27, template: 'not-found (404)', cat: 'G', system: 'resolve', targets: [{ id: '404', url: '/b0-no-such-page', status: 404 }] },
  { n: 28, template: '/launch-checklist', cat: 'G', system: 'resolve', targets: [
    { id: 'launch-checklist~gated', url: '/launch-checklist', cms: 'not-covered', status: 404, note: 'Gated by ENABLE_INTERNAL_PAGES at build time; the production build serves 404. Internal content not covered' },
  ] },
];

const TARGETS = TEMPLATES.flatMap((t) =>
  t.targets.map((x) => ({ server: 'plain', cms: 'static', status: 200, ...x, template: t.template, n: t.n, cat: t.cat, system: t.system }))
);

/** Parse `--plain <url> --fixture <url> --out <path> --engine <name> --only id,id --widths 390,1440`. */
function args(argv = process.argv.slice(2)) {
  const a = { plain: 'http://localhost:3510', fixture: 'http://localhost:3520', engine: 'chromium', out: null, only: null, widths: null };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i].replace(/^--/, '');
    a[k] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  }
  if (typeof a.only === 'string') a.only = a.only.split(',');
  if (typeof a.widths === 'string') a.widths = a.widths.split(',').map(Number);
  return a;
}

const selectTargets = (a) => (a.only ? TARGETS.filter((t) => a.only.includes(t.id) || a.only.includes(t.template)) : TARGETS);
const baseFor = (a, t) => (t.server === 'fixture' ? a.fixture : a.plain);

async function launch(engine = 'chromium') {
  const type = pw[engine];
  if (!type) throw new Error(`unknown engine ${engine}`);
  return type.launch();
}

/**
 * A context with: consent pre-set (default `denied`, so the banner does not
 * cover the layout under test; pass `consent: null` to leave it undecided),
 * every non-local request blocked, and Contentful images answered locally.
 * Nothing leaves the machine: no Calendly, no GTM, no external analytics.
 */
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGO4cenYfwAIZgNwdBuzEgAAAABJRU5ErkJggg==', 'base64');
async function context(browser, { width = 1440, height, consent = 'denied', engine = 'chromium', ...opts } = {}) {
  const o = { viewport: { width, height: height || heightFor(width) }, ...opts };
  if (engine === 'firefox') delete o.hasTouch; // isMobile/hasTouch are Chromium/WebKit only
  if (engine === 'firefox') delete o.isMobile;
  const ctx = await browser.newContext(o);
  if (consent) await ctx.addInitScript((v) => { try { localStorage.setItem('ms.consent.v1', v); } catch (e) {} }, consent);
  const blocked = [];
  await ctx.route('**/*', (route) => {
    const u = route.request().url();
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(u) || u.startsWith('data:') || u.startsWith('blob:')) return route.continue();
    if (u.startsWith('https://images.ctfassets.net/')) return route.fulfill({ status: 200, contentType: 'image/png', body: PNG });
    blocked.push(u);
    return route.abort('blockedbyclient');
  });
  ctx.blocked = blocked;
  return ctx;
}

/** Collect console errors and page errors, ignoring the harness's own blocked external requests. */
function watchErrors(page, { expectDocumentStatus = 200 } = {}) {
  const errs = [];
  let docResourceSkipped = false;
  page.on('pageerror', (e) => errs.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (/ERR_BLOCKED_BY_CLIENT|net::ERR_FAILED/.test(t)) return; // harness blocking, not the page
    // The browser logs the document's own 404 as a console error on a not-found
    // target. That is the expected status, not a page error; skip it once.
    if (expectDocumentStatus === 404 && !docResourceSkipped && /status of 404/.test(t)) { docResourceSkipped = true; return; }
    errs.push(t.slice(0, 200));
  });
  return errs;
}

async function open(page, url, status) {
  const resp = await page.goto(url, { waitUntil: 'networkidle' });
  try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch (e) {}
  return resp ? resp.status() : 0;
}

/** Run `fn(target)` over targets with a small worker pool. */
async function pool(items, size, fn) {
  const out = [];
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); }
  }));
  return out;
}

class Findings {
  constructor(meta) { this.meta = meta; this.items = []; this.passes = 0; }
  pass() { this.passes++; }
  add(check, target, width, key, detail) {
    this.items.push({ fp: `${check}|${target}|${width ?? '-'}|${key}`, check, target, width: width ?? null, key, detail });
  }
  write(file) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify({ meta: this.meta, passes: this.passes, findings: this.items }, null, 1));
  }
}

const slug = (s) => s.replace(/[^a-z0-9~-]+/gi, '_');

module.exports = { WIDTHS, heightFor, TEMPLATES, TARGETS, args, selectTargets, baseFor, launch, context, watchErrors, open, pool, Findings, slug };
