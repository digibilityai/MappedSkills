#!/usr/bin/env node
/**
 * ABCB — /thank-you confirmation journey (the one-time confirmation marker, `lib/enquiry-confirmation.ts`).
 *
 * usage: node thank-you-journey.cjs --plain <url> --out <result.json> [--engine chromium|webkit|firefox]
 *
 * Checks, each separate:
 *   T1 direct visit                      → neutral state (H1 "Sending an enquiry?", no step sheet, no success claim,
 *                                          one onward link to /contact), noindex/nofollow, no conversion event
 *   T2 genuine 2xx submission from /contact → confirmed state ("Your enquiry has arrived.", step sheet), exactly one
 *                                          lead_form_submitted (emitted by the form, not the page), nothing in the URL
 *   T3 reload of that confirmed page     → neutral state, no conversion event
 *   T4 no JavaScript                     → neutral state (server HTML), no step sheet
 *   T5 failed submission (503)           → stays on /contact, no marker; a later /thank-you visit is neutral
 *
 * SAFETY. POST /api/enquiry is FULFILLED in the browser (page.route) and never reaches the application server or its
 * database; every non-local request is aborted (lib.cjs context); form values are synthetic (example.invalid).
 * Exit 1 if any check fails.
 */
const fs = require('fs');
const { args, launch, context } = require('./lib.cjs');

const a = args();
if (!a.out) { console.error('--out required'); process.exit(2); }

const VALID = { name: 'Thank-you Journey Fixture', email: 'thank-you-journey@example.invalid', company: 'Fixture Co', message: 'Regression harness synthetic message. Not a real enquiry.' };
const MARKER = 'ms.enquiry.confirmed.v1';
const CONVERSION = /lead_form_submitted|meeting_|conversion|generate_lead/;

const state = (marker) => {
  const px = document.querySelector('.px');
  let m = 'unreadable';
  try { m = sessionStorage.getItem(marker); } catch (e) { /* storage blocked */ }
  return {
    h1: document.querySelector('h1')?.textContent.trim() ?? null,
    sheet: !!document.querySelector('.ct-steps-fig'),
    claims: /arrived|Received|We have it|While you wait/.test(px ? px.innerText : ''),
    links: [...document.querySelectorAll('.px > section a[href]')].map((x) => x.getAttribute('href')),
    robots: document.querySelector('meta[name=robots]')?.content ?? null,
    events: (window.dataLayer || []).filter((x) => x && x.event).map((x) => x.event),
    marker: m,
  };
};
const neutral = (s) => s.h1 === 'Sending an enquiry?' && !s.sheet && !s.claims && s.links.join() === '/contact';
const confirmed = (s) => s.h1 === 'Your enquiry has arrived.' && s.sheet;

(async () => {
  const browser = await launch(a.engine);
  const R = {};
  let fails = 0;
  const check = (id, ok, detail) => { R[id] = { ok, detail }; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${a.engine} ${id}: ${JSON.stringify(detail)}`); };

  async function withEnquiry(status) {
    const ctx = await context(browser, { width: 1280, engine: a.engine });
    const posts = [];
    await ctx.route('**/api/enquiry', (route) => {
      posts.push(route.request().method());
      return route.fulfill({ status, contentType: 'application/json', body: status < 300 ? '{"ok":true}' : '{"ok":false,"error":"unavailable"}' });
    });
    ctx.posts = posts;
    return ctx;
  }
  async function submit(page) {
    await page.goto(a.plain + '/contact', { waitUntil: 'networkidle' });
    for (const [k, v] of Object.entries(VALID)) await page.fill('#' + k, v);
    await page.click('form.ct-form button[type=submit]');
  }

  // T1 direct visit
  {
    const ctx = await context(browser, { width: 1280, engine: a.engine });
    const page = await ctx.newPage();
    await page.goto(a.plain + '/thank-you', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const s = await page.evaluate(state, MARKER);
    check('T1-direct-visit-neutral', neutral(s) && s.robots === 'noindex, nofollow' && !s.events.some((e) => CONVERSION.test(e)) && s.marker === null, s);
    await ctx.close();
  }

  // T2 genuine 2xx submission → confirmed; T3 reload → neutral
  {
    const ctx = await withEnquiry(201);
    const page = await ctx.newPage();
    await submit(page);
    await page.waitForURL('**/thank-you', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);
    const s = await page.evaluate(state, MARKER);
    const url = new URL(page.url());
    check('T2-2xx-submission-confirmed', confirmed(s) && ctx.posts.length === 1 && url.pathname === '/thank-you' && url.search === '' && s.events.filter((e) => e === 'lead_form_submitted').length === 1 && s.marker === null, { ...s, posts: ctx.posts.length, url: url.pathname + url.search });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const r = await page.evaluate(state, MARKER);
    check('T3-reload-neutral', neutral(r) && !r.events.some((e) => CONVERSION.test(e)), r);
    await ctx.close();
  }

  // T4 no JavaScript
  {
    const ctx = await context(browser, { width: 1280, engine: a.engine, consent: null, javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto(a.plain + '/thank-you', { waitUntil: 'load' });
    const s = await page.evaluate(() => ({
      sections: document.querySelectorAll('.px > section').length,
      h1: document.querySelector('h1')?.textContent.trim() ?? null,
      sheet: !!document.querySelector('.ct-steps-fig'),
      claims: /arrived|Received|While you wait/.test(document.querySelector('.px')?.innerText || ''),
      links: [...document.querySelectorAll('.px > section a[href]')].map((x) => x.getAttribute('href')),
    }));
    check('T4-no-javascript-neutral', s.sections === 1 && s.h1 === 'Sending an enquiry?' && !s.sheet && !s.claims && s.links.join() === '/contact', s);
    await ctx.close();
  }

  // T5 failed submission → no confirmation
  {
    const ctx = await withEnquiry(503);
    const page = await ctx.newPage();
    await submit(page);
    await page.waitForTimeout(900);
    const path = await page.evaluate(() => location.pathname);
    const marker = await page.evaluate((m) => sessionStorage.getItem(m), MARKER);
    await page.goto(a.plain + '/thank-you', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const s = await page.evaluate(state, MARKER);
    check('T5-failed-submission-no-confirmation', path === '/contact' && marker === null && neutral(s), { path, marker, h1: s.h1 });
    await ctx.close();
  }

  await browser.close();
  fs.writeFileSync(a.out, JSON.stringify({ meta: { engine: a.engine, plain: a.plain, at: new Date().toISOString() }, fails, results: R }, null, 1));
  console.log(`\nthank-you-journey [${a.engine}]: ${Object.keys(R).length - fails}/${Object.keys(R).length} checks pass`);
  process.exit(fails ? 1 : 0);
})().catch((x) => { console.error(x); process.exit(2); });
