/**
 * Release fixes F2 and F3 browser checks. Not part of `npm test` (needs a running server). Run against a local production build:
 *
 *   npm run build && PORT=3621 HOSTNAME=127.0.0.1 node server.cjs &
 *   BASE_URL=http://127.0.0.1:3621 node tests/e2e/release-f2-f3.e2e.cjs [--shots <dir>]
 *
 * F2: /ai-seo has no horizontal overflow and the third reporting card's table stays inside its card (360 to 1440px).
 * F3: the open mobile menu moves focus in, cycles Tab and Shift+Tab inside the header (and the consent banner while it shows), makes the page behind it inert,
 *     closes on Escape (focus back on the trigger) and on link selection (focus is not stolen).
 * Nothing is submitted. Refuses any BASE_URL that is not loopback. Exit code 1 if any check fails.
 */
const { chromium } = require('playwright-core');
const fs = require('node:fs');

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3621';
if (!/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(BASE)) throw new Error('loopback BASE_URL only');
const shotsArg = process.argv.indexOf('--shots');
const SHOTS = shotsArg > 0 ? process.argv[shotsArg + 1] : null;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: Boolean(ok), detail: String(detail) });

async function open(browser, width, path) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const problems = [];
  page.on('pageerror', (e) => problems.push(e.message));
  page.on('console', (m) => m.type() === 'error' && problems.push(m.text()));
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('.dc-menu-btn') && Object.keys(document.querySelector('.dc-menu-btn')).some((k) => k.startsWith('__react')));
  return { page, problems };
}

const where = (page) =>
  page.evaluate(() => {
    const a = document.activeElement;
    return a.closest('.consent-banner') ? 'banner:' + (a.textContent || '').trim().slice(0, 24) : a.closest('#dc-mnav') ? 'menu:' + (a.textContent || '').trim().slice(0, 24) : a.classList.contains('dc-menu-btn') ? 'trigger' : a.closest('header') ? 'header:' + (a.textContent || '').trim().slice(0, 12) : 'PAGE:' + a.tagName;
  });

async function f2(browser) {
  for (const w of [360, 390, 767, 768, 800, 820, 844, 845, 900, 1024, 1280, 1440]) {
    const { page, problems } = await open(browser, w, '/ai-seo');
    const r = await page.evaluate(() => {
      const d = document.documentElement;
      const mini = document.querySelector('.b2.ai .ax-rp-i:nth-child(3) .ax-mini');
      const trk = mini.querySelector('.ax-trk');
      const cs = getComputedStyle(mini);
      const inner = mini.getBoundingClientRect().right - parseFloat(cs.paddingRight) - parseFloat(cs.borderRightWidth);
      return { over: d.scrollWidth - d.clientWidth, trkOut: Math.round(trk.getBoundingClientRect().right - inner), cells: trk.querySelectorAll('th, td').length, text: trk.textContent.replace(/\s+/g, ' ').trim() };
    });
    check(`F2 ${w}px no page overflow`, r.over <= 0, r.over);
    check(`F2 ${w}px table inside card content box`, r.trkOut <= 0, r.trkOut);
    check(`F2 ${w}px table keeps 9 labelled cells`, r.cells === 9 && /Not named/.test(r.text) && /Named/.test(r.text), r.cells);
    if (SHOTS && [768, 820, 845, 1024].includes(w)) await page.locator('.b2.ai .ax-rp').screenshot({ path: `${SHOTS}/f2-${w}.png` });
    check(`F2 ${w}px no console errors`, problems.length === 0, problems.join(' | '));
    await page.close();
  }
}

async function f3(browser) {
  for (const w of [360, 390, 768]) {
    const { page, problems } = await open(browser, w, '/');
    const trigger = page.locator('.dc-menu-btn');
    await trigger.click();
    check(`F3 ${w}px focus moves into the menu on open`, (await where(page)).startsWith('menu:'), await where(page));
    check(`F3 ${w}px page behind is inert`, await page.evaluate(() => document.getElementById('main').inert && document.querySelector('body > footer').inert));
    const fwd = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      fwd.push(await where(page));
    }
    check(`F3 ${w}px Tab never leaves the header or banner`, fwd.every((x) => !x.startsWith('PAGE')), fwd.join(' > '));
    check(`F3 ${w}px Tab wraps through the trigger`, fwd.includes('trigger'), fwd.join(' > '));
    const rev = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Shift+Tab');
      rev.push(await where(page));
    }
    check(`F3 ${w}px Shift+Tab never leaves the header or banner`, rev.every((x) => !x.startsWith('PAGE')), rev.join(' > '));
    await page.keyboard.press('Escape');
    check(`F3 ${w}px Escape closes the menu`, (await trigger.getAttribute('aria-expanded')) === 'false');
    check(`F3 ${w}px Escape returns focus to the trigger`, (await where(page)) === 'trigger', await where(page));
    check(`F3 ${w}px inert removed on close`, await page.evaluate(() => !document.getElementById('main').inert && !document.querySelector('body > footer').inert));
    await trigger.click();
    await trigger.click();
    check(`F3 ${w}px trigger toggles closed`, (await trigger.getAttribute('aria-expanded')) === 'false');
    check(`F3 ${w}px console clean`, problems.length === 0, problems.join(' | '));
    await page.close();
  }

  const { page } = await open(browser, 390, '/');
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('#dc-mnav a[href]')].map((a) => a.getAttribute('href')));
  await page.locator('.dc-menu-btn').click();
  await page.locator('#dc-mnav .dc-m-svc-btn').first().click();
  const names = await page.evaluate(() => [...document.querySelectorAll('#dc-mnav a')].map((a) => a.textContent.trim().replace(/\s*→$/, '')));
  check('F3 390px menu destinations unchanged', hrefs.length >= 10 && names.length >= 10, hrefs.join(' '));
  await page.locator('#dc-mnav a[href="/about"]').first().click();
  await page.waitForURL('**/about');
  check('F3 link selection closes the menu', (await page.locator('.dc-menu-btn').getAttribute('aria-expanded')) === 'false');
  check('F3 link selection does not move focus to the trigger', (await where(page)) !== 'trigger', await where(page));
  check('F3 inert cleared after navigation', await page.evaluate(() => !document.getElementById('main').inert));
  await page.close();

  /* Consent banner (fresh state): it precedes the header, is not inert, and stays inside the Tab cycle while the menu is open. */
  for (const w of [360, 390, 768]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const b = await ctx.newPage();
    const problems = [];
    b.on('pageerror', (e) => problems.push(e.message));
    await b.goto(BASE + '/', { waitUntil: 'networkidle' });
    await b.waitForFunction(() => Object.keys(document.querySelector('.dc-menu-btn')).some((k) => k.startsWith('__react')));
    await b.locator('.dc-menu-btn').click();
    const seen = [];
    for (let i = 0; i < 16; i++) {
      await b.keyboard.press('Tab');
      seen.push(await b.evaluate(() => (document.activeElement.closest('.consent-banner') ? 'banner:' + document.activeElement.textContent.trim() : document.activeElement.closest('#main, footer') ? 'PAGE' : 'ok')));
    }
    check(`F3 ${w}px banner: Privacy Policy, Accept and Reject reachable by Tab with the menu open`, ['banner:Privacy Policy', 'banner:Accept analytics', 'banner:Reject analytics'].every((x) => seen.includes(x)), seen.join(' > '));
    check(`F3 ${w}px banner: Tab never reaches main or footer`, !seen.includes('PAGE'));
    const rev = [];
    for (let i = 0; i < 16; i++) {
      await b.keyboard.press('Shift+Tab');
      rev.push(await b.evaluate(() => (document.activeElement.closest('.consent-banner') ? 'banner' : document.activeElement.closest('#main, footer') ? 'PAGE' : 'ok')));
    }
    check(`F3 ${w}px banner: Shift+Tab stays in banner and header`, rev.includes('banner') && !rev.includes('PAGE'));
    await b.getByRole('button', { name: 'Reject analytics' }).focus();
    await b.keyboard.press('Enter');
    await b.waitForTimeout(150);
    check(`F3 ${w}px banner: after a choice the banner is gone, the menu stays open and focus is in it`, await b.evaluate(() => !document.querySelector('.consent-banner') && document.querySelector('.dc-menu-btn').getAttribute('aria-expanded') === 'true' && !!document.activeElement.closest('#dc-mnav') && document.getElementById('main').inert));
    check(`F3 ${w}px banner: choice stored as denied`, (await b.evaluate(() => localStorage.getItem('ms.consent.v1'))) === 'denied');
    check(`F3 ${w}px banner: no page errors`, problems.length === 0, problems.join(' | '));
    await ctx.close();
  }

  const d = await open(browser, 1024, '/');
  check('F3 1024px desktop nav shown, mobile trigger hidden', await d.page.evaluate(() => getComputedStyle(document.querySelector('.dc-menu-btn')).display === 'none' && document.querySelector('.dc-nav').getClientRects().length > 0));
  const svc = d.page.locator('.dc-svc-btn').first();
  await svc.click();
  check('F3 1024px Services disclosure still opens', (await svc.getAttribute('aria-expanded')) === 'true');
  await d.page.keyboard.press('Escape');
  check('F3 1024px Escape closes Services and restores focus', (await svc.getAttribute('aria-expanded')) === 'false' && (await d.page.evaluate(() => document.activeElement.classList.contains('dc-svc-btn'))));
  await d.page.close();

  const t = await open(browser, 390, '/');
  await t.page.locator('.dc-menu-btn').click();
  await t.page.setViewportSize({ width: 1100, height: 900 });
  await t.page.waitForFunction(() => document.querySelector('.dc-menu-btn').getAttribute('aria-expanded') === 'false');
  check('F3 resize to desktop closes the menu and clears inert', await t.page.evaluate(() => !document.getElementById('main').inert && !document.querySelector('body > footer').inert));
  await t.page.setViewportSize({ width: 390, height: 900 });
  await t.page.locator('.dc-menu-btn').click();
  check('F3 menu reopens after returning to mobile', (await where(t.page)).startsWith('menu:'), await where(t.page));
  await t.page.close();
}

(async () => {
  const browser = await chromium.launch();
  await f2(browser);
  await f3(browser);
  await browser.close();
  const failed = results.filter((r) => !r.ok);
  for (const r of failed) console.log('FAIL', r.name, r.detail);
  console.log(JSON.stringify({ total: results.length, passed: results.length - failed.length, failed: failed.length }));
  process.exit(failed.length ? 1 : 0);
})();
