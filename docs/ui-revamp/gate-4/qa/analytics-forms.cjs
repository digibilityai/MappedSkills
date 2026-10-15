#!/usr/bin/env node
/**
 * GATE 4 · B0 — CHECKS 9 and 10: analytics instrumentation, consent, BookingLink, ContactForm boundaries.
 *
 * usage: node analytics-forms.cjs --plain <url> --out <result.json> [--engine chromium]
 *
 * SAFETY. Nothing leaves the machine and no lead is created:
 *   - every non-local request is aborted (lib.cjs context), so Calendly, GTM and any vendor are unreachable;
 *   - POST /api/enquiry is intercepted with page.route() and FULFILLED by the harness (2xx / 400 / 429 / 500 /
 *     network abort). The request never reaches the application server or its database;
 *   - form values are synthetic (`b0-fixture@example.invalid`).
 *
 * Records the dataLayer (events + consent commands) for:
 *   A. consent states: undecided / denied / granted (bootstrap default, update replay, banner, GTM script presence)
 *   B. page_view on first load and across client-side navigations (one per navigation, path + page_type)
 *   C. BookingLink: every booking anchor on /schedule-call fires meeting_started with its parameters
 *   D. ContactForm: field contract; lead_form_started once; empty submit → validation errors + summary focus;
 *      honeypot properties; request body keys; outcome per mocked response
 * The JSON output is the baseline; diff two runs with `node analytics-forms.cjs --compare a.json b.json`.
 */
const fs = require('fs');
const { args, launch, context } = require('./lib.cjs');

const a = args();

if (a.compare) {
  const [x, y] = [a.compare, process.argv[process.argv.indexOf('--compare') + 2]].map((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
  const strip = (o) => JSON.parse(JSON.stringify(o, (k, v) => (['at', 'plain', 'elapsedMs'].includes(k) ? undefined : v)));
  const A = strip(x.results), B = strip(y.results);
  let d = 0;
  for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) {
    const same = JSON.stringify(A[k]) === JSON.stringify(B[k]);
    if (!same) d++;
    console.log(`${same ? 'SAME' : 'DIFF'} ${k}${same ? '' : `\n  baseline:  ${JSON.stringify(A[k]).slice(0, 600)}\n  candidate: ${JSON.stringify(B[k]).slice(0, 600)}`}`);
  }
  console.log(`\nSUMMARY: ${d} differing sections`);
  process.exit(d ? 1 : 0);
}
if (!a.out) { console.error('--out required'); process.exit(2); }

const dl = () => (window.dataLayer || []).map((x) => {
  if (x && typeof x === 'object' && !Array.isArray(x) && x.event) { const { 'gtm.uniqueEventId': _, ...rest } = x; return rest; }
  const arr = Array.from(x || []); return { command: arr.slice(0, 2).join(' '), args: arr[2] };
});
const events = (list, names) => list.filter((e) => e.event && (!names || names.includes(e.event)));

const VALID = { name: 'B0 Fixture Person', email: 'b0-fixture@example.invalid', company: 'B0 Fixture Co', message: 'B0 regression harness synthetic message. Not a real enquiry.' };

(async () => {
  const browser = await launch(a.engine);
  const R = {};
  const base = a.plain;

  // ---------------------------------------------------------- A. consent states
  R.consent = {};
  for (const state of ['undecided', 'denied', 'granted']) {
    const ctx = await context(browser, { width: 390, consent: state === 'undecided' ? null : state });
    const page = await ctx.newPage();
    await page.goto(base + '/about', { waitUntil: 'networkidle' });
    R.consent[state] = await page.evaluate((dlSrc) => {
      const f = new Function(`return (${dlSrc})()`);
      return {
        dataLayer: f().filter((e) => e.command),
        banner: !!document.querySelector('[role="region"][aria-labelledby="consent-banner-title"]'),
        gtmScript: [...document.scripts].some((s) => /googletagmanager\.com\/gtm\.js/.test(s.src)),
        metaPixel: [...document.scripts].some((s) => /fbevents\.js/.test(s.src)),
      };
    }, dl.toString());
    R.consent[state].blockedExternal = ctx.blocked.length;
    await ctx.close();
  }
  // banner interaction: accept → update pushed, banner gone; reload → no banner
  {
    const ctx = await context(browser, { width: 1440, consent: null });
    const page = await ctx.newPage();
    await page.goto(base + '/about', { waitUntil: 'networkidle' });
    const buttons = await page.locator('[aria-labelledby="consent-banner-title"] button').allInnerTexts();
    R.consentBannerButtons = buttons.map((s) => s.trim());
    const accept = page.locator('[aria-labelledby="consent-banner-title"] button').first();
    await accept.click(); await page.waitForTimeout(200);
    R.consentAfterFirstButton = await page.evaluate((dlSrc) => ({ cmds: new Function(`return (${dlSrc})()`)().filter((e) => e.command), banner: !!document.querySelector('[aria-labelledby="consent-banner-title"]'), stored: localStorage.getItem('ms.consent.v1') }), dl.toString());
    await ctx.close();
  }

  // ---------------------------------------------------------- B. page_view
  {
    const ctx = await context(browser, { width: 1440 });
    const page = await ctx.newPage();
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const walk = ['/services', '/seo', '/about', '/how-it-works', '/'];
    for (const href of walk) {
      const link = page.locator(`header a[href="${href}"], footer a[href="${href}"], main a[href="${href}"]`).filter({ visible: true }).first();
      await link.click(); await page.waitForURL((u) => new URL(u).pathname === href); await page.waitForTimeout(250);
    }
    await page.goBack(); await page.waitForTimeout(300);
    R.pageView = events(await page.evaluate(dl), ['page_view']).map(({ event, page_path, page_type, environment }) => ({ event, page_path, page_type, environment }));
    await ctx.close();
  }
  // first-load page_view on every page type (path → page_type mapping)
  R.pageViewFirstLoad = {};
  for (const path of ['/', '/services', '/seo', '/google-ads', '/problems/traffic-but-no-enquiries', '/pricing', '/how-it-works', '/about', '/faq', '/contact', '/schedule-call', '/thank-you', '/blog', '/research', '/press', '/work', '/privacy-policy', '/terms', '/b0-no-such-page']) {
    const ctx = await context(browser, { width: 1440 });
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: 'networkidle' });
    R.pageViewFirstLoad[path] = events(await page.evaluate(dl), ['page_view']).map((e) => `${e.page_path}|${e.page_type}`);
    await ctx.close();
  }

  // ---------------------------------------------------------- C. BookingLink
  {
    const ctx = await context(browser, { width: 1440 });
    const page = await ctx.newPage();
    await page.goto(base + '/schedule-call', { waitUntil: 'networkidle' });
    const anchors = await page.$$eval('a[target="_blank"]', (xs) => xs.filter((x) => /calendly\.com/i.test(x.href)).map((x) => ({ href: x.href, text: x.textContent.replace(/\s+/g, ' ').trim(), rel: x.rel, region: x.closest('main') ? 'main' : 'chrome' })));
    R.booking = { anchors, clicks: [] };
    const loc = page.locator('a[target="_blank"][href*="calendly.com"]');
    const n = await loc.count();
    for (let i = 0; i < n; i++) {
      const before = (await page.evaluate(dl)).length;
      const [popup] = await Promise.all([ctx.waitForEvent('page', { timeout: 3000 }).catch(() => null), loc.nth(i).click()]);
      if (popup) await popup.close();
      await page.waitForTimeout(100);
      R.booking.clicks.push(events((await page.evaluate(dl)).slice(before)));
    }
    R.booking.externalRequestsBlocked = ctx.blocked.filter((u) => /calendly/.test(u)).length;
    // header/footer "Book a call" goes to /schedule-call (an internal link), so it emits page_view, not meeting_started
    await ctx.close();
  }

  // ---------------------------------------------------------- D. ContactForm
  const formContract = async (page) => page.evaluate(() => [...document.querySelectorAll('main form input, main form textarea, main form select, main form button')].map((x) => ({
    tag: x.tagName.toLowerCase(), type: x.getAttribute('type'), name: x.getAttribute('name'), id: x.id, required: x.required, ariaRequired: x.getAttribute('aria-required'),
    autocomplete: x.getAttribute('autocomplete'), tabindex: x.getAttribute('tabindex'),
    hiddenFromPeople: (() => { const q = x.getBoundingClientRect(); const cs = getComputedStyle(x); return q.width < 2 || q.height < 2 || cs.opacity === '0' || !!x.closest('[aria-hidden="true"]') || cs.position === 'absolute' && (q.right < 0 || q.left > innerWidth); })(),
  })));
  R.form = {};
  {
    const ctx = await context(browser, { width: 1440 });
    const page = await ctx.newPage();
    let apiCalls = 0;
    await page.route('**/api/enquiry', (r) => { apiCalls++; return r.fulfill({ status: 500, body: '{}' }); });
    await page.goto(base + '/contact', { waitUntil: 'networkidle' });
    R.form.contract = await formContract(page);
    // empty submit
    await page.locator('main form button[type="submit"]').click(); await page.waitForTimeout(250);
    const v = await page.evaluate(dl);
    R.form.emptySubmit = {
      events: events(v, ['lead_form_started', 'lead_form_validation_error', 'lead_form_submitted']),
      apiCalls,
      alert: await page.evaluate(() => { const al = document.querySelector('main [role="alert"]'); return al ? { text: al.innerText.replace(/\s+/g, ' ').trim().slice(0, 300), focused: al.contains(document.activeElement) || al === document.activeElement } : null; }),
      invalid: await page.evaluate(() => [...document.querySelectorAll('main [aria-invalid="true"]')].map((x) => x.name)),
    };
    // typing → lead_form_started exactly once
    await page.fill('#name', VALID.name); await page.fill('#email', VALID.email);
    R.form.startedCount = events(await page.evaluate(dl), ['lead_form_started']).length;
    await ctx.close();
  }
  const outcomes = [['2xx', { status: 201, body: '{"ok":true}' }], ['400-field', { status: 400, body: '{"error":"validation","fieldErrors":{"email":"Enter a valid email"}}' }], ['429', { status: 429, body: '{"error":"rate_limited"}' }], ['500', { status: 500, body: '{"error":"server"}' }], ['network-abort', null]];
  R.form.outcomes = {};
  for (const [name, resp] of outcomes) {
    const ctx = await context(browser, { width: 1440 });
    const page = await ctx.newPage();
    const bodies = [];
    await page.route('**/api/enquiry', async (r) => {
      bodies.push(JSON.parse(r.request().postData() || '{}'));
      return resp ? r.fulfill({ status: resp.status, contentType: 'application/json', body: resp.body }) : r.abort('failed');
    });
    await page.goto(base + '/contact?utm_source=b0&utm_medium=harness&utm_campaign=fixture', { waitUntil: 'networkidle' });
    for (const [k, val] of Object.entries(VALID)) await page.fill(`#${k}`, val);
    await page.waitForTimeout(3200); // past any minimum-elapsed-time guard a real person would also exceed
    await page.locator('main form button[type="submit"]').click();
    await page.waitForTimeout(900);
    const ev = await page.evaluate(dl).catch(() => []);
    R.form.outcomes[name] = {
      requests: bodies.length,
      bodyKeys: bodies[0] ? Object.keys(bodies[0]).sort() : [],
      attributionKeys: bodies[0]?.attribution ? Object.keys(bodies[0].attribution).sort() : [],
      sourcePage: bodies[0]?.sourcePage,
      honeypotEmpty: bodies[0] ? bodies[0].contactReference === '' : null,
      finalPath: new URL(page.url()).pathname,
      events: events(ev, ['lead_form_started', 'lead_form_validation_error', 'lead_form_submitted']).map(({ event, page_path, page_type, form_id, error_type, field_name, conversion_surface, qualification_status }) => ({ event, page_path, page_type, form_id, error_type, field_name, conversion_surface, qualification_status })),
      alert: await page.evaluate(() => document.querySelector('main [role="alert"]')?.innerText.replace(/\s+/g, ' ').trim().slice(0, 200) || null).catch(() => null),
    };
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(a.out, JSON.stringify({ meta: { tool: 'gate-4/qa/analytics-forms.cjs', engine: a.engine, plain: base, at: new Date().toISOString() }, results: R }, null, 1));
  // human summary
  console.log('consent:', Object.fromEntries(Object.entries(R.consent).map(([k, v]) => [k, `${v.dataLayer.map((c) => c.command).join('+')} banner=${v.banner} gtm=${v.gtmScript}`])));
  console.log('page_view walk:', R.pageView.map((e) => e.page_path).join(' → '));
  console.log('booking clicks:', R.booking.clicks.map((c) => c.map((e) => e.event).join('+') || 'none').join(' | '), `(${R.booking.anchors.length} anchors)`);
  console.log('form empty submit:', R.form.emptySubmit.events.map((e) => e.event + (e.field_name ? ':' + e.field_name : '')).join(', '), `apiCalls=${R.form.emptySubmit.apiCalls}`, 'summaryFocused=' + R.form.emptySubmit.alert?.focused);
  for (const [k, o] of Object.entries(R.form.outcomes)) console.log(`form ${k}: requests=${o.requests} → ${o.finalPath}; events ${o.events.map((e) => e.event + (e.error_type ? ':' + e.error_type : '')).join(', ')}`);
})().catch((e) => { console.error(e); process.exit(1); });
