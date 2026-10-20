/**
 * C1 (DEC-071) — browser checks for the consolidated /contact page. Not part of `npm test` (it needs a running
 * server). Run against a local production build:
 *
 *   npm run build && PORT=3241 HOSTNAME=127.0.0.1 node server.cjs &
 *   BASE_URL=http://127.0.0.1:3241 node tests/e2e/contact-consolidation.e2e.cjs [--shots <dir>]
 *
 * EVERY SUBMISSION IS MOCKED. `/api/enquiry` is intercepted with `page.route`, so nothing reaches a database, the
 * CRM or any analytics vendor. Refuses any BASE_URL that is not loopback.
 *
 * Engines: Chromium, Firefox and WebKit (playwright-core with locally installed browsers). Widths: 320, 360, 390,
 * 600, 768, 1024, 1440. Exit code 1 if any check fails; a JSON summary is printed.
 */
const { chromium, firefox, webkit } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3241';
if (!/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(BASE)) throw new Error('loopback BASE_URL only');
const shotsArg = process.argv.indexOf('--shots');
const SHOTS = shotsArg > 0 ? process.argv[shotsArg + 1] : null;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
const WIDTHS = [320, 360, 390, 600, 768, 1024, 1440];

const results = [];
function check(engine, name, ok, detail = '') {
  results.push({ engine, name, ok: Boolean(ok), detail: String(detail) });
}

async function events(page, name) {
  return page.evaluate((n) => (window.dataLayer || []).filter((e) => e && e.event === n), name);
}

async function fill(page, values) {
  for (const [id, v] of Object.entries(values)) {
    if (id === 'service') await page.selectOption('#service', v);
    else await page.fill(`#${id}`, v);
  }
}

const VALID = { name: 'Test Person', email: 'test@example.com', phone: '98765 43210', service: 'google_ads', message: 'More leads, please.' };

async function run(engineName, type) {
  const browser = await type.launch();
  const E = engineName;
  try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const consoleErrors = [];
    // The failure checks below make requests fail on purpose; the browser logs those as resource errors.
    page.on('console', (m) => m.type() === 'error' && !/Failed to load resource/.test(m.text()) && consoleErrors.push(m.text()));

    // 1. default intention
    await page.goto(`${BASE}/contact`);
    await page.waitForSelector('button.ct-send:not([disabled])');
    check(E, 'default is enquiry', await page.isChecked('input[name="intent"][value="enquiry"]'));
    check(E, 'enquiry submit label', (await page.textContent('button.ct-send')).trim() === 'Send enquiry');
    check(E, 'no preferred time on enquiry', (await page.$('#preferredContactTime')) === null);
    check(E, 'enquiry placeholder', (await page.getAttribute('#message', 'placeholder')) === 'What challenges are you facing, or what would you like to achieve?');

    // 4/5. dropdown
    check(E, 'service starts unselected', (await page.$eval('#service', (s) => s.value)) === '');
    const opts = await page.$$eval('#service option', (os) => os.map((o) => [o.value, o.textContent.trim(), o.disabled]));
    check(E, 'placeholder + 8 options', opts.length === 9 && opts[0][0] === '' && opts[0][1] === 'Select a service', JSON.stringify(opts));
    for (const [v] of opts.slice(1)) {
      await page.selectOption('#service', v);
      if ((await page.$eval('#service', (s) => s.value)) !== v) check(E, `select ${v}`, false);
    }
    check(E, 'all eight services selectable', true);
    check(E, 'select has accessible label', (await page.$eval('#service', (s) => s.labels[0].textContent)).includes('What do you need help with?'));

    // 6. required validation, no request sent
    await page.goto(`${BASE}/contact`);
    await page.waitForSelector('button.ct-send:not([disabled])');
    let posts = 0;
    await page.route('**/api/enquiry', (r) => { posts++; return r.fulfill({ status: 201, contentType: 'application/json', body: '{"ok":true}' }); });
    await page.click('button.ct-send');
    await page.waitForSelector('.ct-summary');
    const summary = await page.$$eval('.ct-summary li a', (as) => as.map((a) => a.getAttribute('href')));
    check(E, 'four required errors in summary', JSON.stringify(summary) === JSON.stringify(['#name', '#email', '#phone', '#service']), JSON.stringify(summary));
    check(E, 'summary focused', await page.evaluate(() => document.activeElement?.classList.contains('ct-summary')));
    check(E, 'summary is alert', (await page.getAttribute('.ct-summary', 'role')) === 'alert');
    check(E, 'aria-invalid + describedby', (await page.getAttribute('#phone', 'aria-invalid')) === 'true' && (await page.getAttribute('#phone', 'aria-describedby')).includes('phone-error'));
    check(E, 'no request on invalid submit', posts === 0);
    check(E, 'no conversion on invalid submit', (await events(page, 'lead_form_submitted')).length === 0);

    // 7/8. invalid email / phone
    await fill(page, { ...VALID, email: 'name@company', phone: '12345' });
    await page.click('button.ct-send');
    await page.waitForSelector('#email-error');
    check(E, 'invalid email message', (await page.textContent('#email-error')).includes('name@company.com'));
    check(E, 'invalid phone message', (await page.textContent('#phone-error')).includes('country code'));
    check(E, 'still no request', posts === 0);

    // 3/10. switching keeps values; preferred time only for call; URL follows
    await page.goto(`${BASE}/contact?utm_source=newsletter`);
    await page.waitForSelector('button.ct-send:not([disabled])');
    await fill(page, VALID);
    await page.check('input[name="intent"][value="call"]');
    await page.waitForSelector('#preferredContactTime');
    const kept = await page.evaluate(() => ['name', 'email', 'phone', 'service', 'message'].map((id) => document.getElementById(id).value));
    check(E, 'values kept on switch to call', JSON.stringify(kept) === JSON.stringify([VALID.name, VALID.email, VALID.phone, VALID.service, VALID.message]), JSON.stringify(kept));
    check(E, 'URL gets intent=call, keeps utm', page.url().endsWith('/contact?utm_source=newsletter&intent=call'), page.url());
    check(E, 'call submit label', (await page.textContent('button.ct-send')).trim() === 'Request a call');
    check(E, 'call placeholder', (await page.getAttribute('#message', 'placeholder')) === 'What would you like to discuss on the call?');
    await page.fill('#preferredContactTime', 'Weekdays, 2–5 PM IST');
    await page.check('input[name="intent"][value="enquiry"]');
    check(E, 'preferred time hidden on enquiry', (await page.$('#preferredContactTime')) === null);
    check(E, 'URL drops intent, keeps utm', page.url().endsWith('/contact?utm_source=newsletter'), page.url());
    await page.check('input[name="intent"][value="call"]');
    check(E, 'preferred time kept across switches', (await page.inputValue('#preferredContactTime')) === 'Weekdays, 2–5 PM IST');

    // keyboard: arrow keys move between the two intentions
    await page.focus('input[name="intent"][value="call"]');
    await page.keyboard.press(E === 'webkit' ? 'ArrowLeft' : 'ArrowLeft');
    check(E, 'arrow key switches intention', await page.isChecked('input[name="intent"][value="enquiry"]'));
    await page.keyboard.press('ArrowRight');
    check(E, 'arrow key back to call', await page.isChecked('input[name="intent"][value="call"]'));

    // 13/14. success: one request (double click), correct body, one conversion, call confirmation
    let bodies = [];
    await page.unroute('**/api/enquiry');
    await page.route('**/api/enquiry', async (r) => {
      bodies.push(JSON.parse(r.request().postData()));
      await new Promise((res) => setTimeout(res, 400));
      return r.fulfill({ status: 201, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.click('button.ct-send', { clickCount: 2, delay: 20 }).catch(() => {});
    await page.click('button.ct-send', { timeout: 300 }).catch(() => {});
    await page.waitForURL('**/thank-you');
    check(E, 'exactly one request', bodies.length === 1, bodies.length);
    const b = bodies[0] || {};
    check(E, 'body: call + structured fields', b.requestType === 'call' && b.service === 'google_ads' && b.preferredContactTime === 'Weekdays, 2–5 PM IST' && b.sourcePage === '/contact' && b.phone === VALID.phone, JSON.stringify({ ...b, attribution: undefined }));
    const conv = await events(page, 'lead_form_submitted');
    check(E, 'one conversion, call_request, no PII', conv.length === 1 && conv[0].form_id === 'call_request' && !JSON.stringify(conv).includes('example.com') && !JSON.stringify(conv).includes('98765'), JSON.stringify(conv));
    await page.waitForSelector('h1');
    check(E, 'call confirmation shown', (await page.textContent('h1')).includes('Your request is with us'));

    // enquiry success: preferred time not sent, enquiry confirmation
    bodies = [];
    await page.goto(`${BASE}/contact?intent=call`);
    await page.waitForSelector('#preferredContactTime');
    await fill(page, { ...VALID, preferredContactTime: 'Mornings' });
    await page.check('input[name="intent"][value="enquiry"]');
    await page.click('button.ct-send');
    await page.waitForURL('**/thank-you');
    check(E, 'enquiry body: no preferred time', bodies[0]?.requestType === 'enquiry' && bodies[0]?.preferredContactTime === '');
    await page.waitForSelector('h1');
    check(E, 'enquiry confirmation shown', (await page.textContent('h1')).includes('Your enquiry has arrived'));
    const conv2 = await events(page, 'lead_form_submitted');
    check(E, 'enquiry conversion form_id', conv2.length === 1 && conv2[0].form_id === 'contact_enquiry', JSON.stringify(conv2));

    // failed submission: 503 and network error; values kept, no conversion, no navigation
    for (const mode of ['503', 'network', '400-field']) {
      await page.goto(`${BASE}/contact`);
      await page.waitForSelector('button.ct-send:not([disabled])');
      await page.unroute('**/api/enquiry');
      await page.route('**/api/enquiry', (r) =>
        mode === 'network'
          ? r.abort()
          : mode === '503'
            ? r.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false,"error":"unavailable"}' })
            : r.fulfill({ status: 400, contentType: 'application/json', body: '{"ok":false,"error":"validation","fieldErrors":{"phone":"Check the number. Include the country code, for example +44 for the UK."}}' })
      );
      await fill(page, VALID);
      await page.click('button.ct-send');
      await page.waitForSelector('.ct-summary');
      const text = await page.textContent('.ct-summary');
      check(E, `failure ${mode}: message`, mode === '400-field' ? text.includes('Phone / WhatsApp number') : /was not sent/.test(text) && /(not been saved|could not save|not saved)/.test(text), text);
      check(E, `failure ${mode}: stays, values kept`, page.url().includes('/contact') && (await page.inputValue('#name')) === VALID.name);
      check(E, `failure ${mode}: no conversion`, (await events(page, 'lead_form_submitted')).length === 0);
      check(E, `failure ${mode}: button re-enabled`, !(await page.isDisabled('button.ct-send')));
    }

    // redirect from the old URL keeps campaign parameters and opens the call state
    await page.goto(`${BASE}/schedule-call?utm_source=google&utm_medium=cpc&gclid=t123`);
    await page.waitForSelector('button.ct-send:not([disabled])');
    check(E, 'redirect target', page.url() === `${BASE}/contact?utm_source=google&utm_medium=cpc&gclid=t123&intent=call`, page.url());
    check(E, 'redirect opens call state', await page.isChecked('input[name="intent"][value="call"]'));

    // header "Request a call" (in the menu below 64em, nav R2) while on /contact keeps typed values (shared layout)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}/contact`);
    await page.waitForSelector('button.ct-send:not([disabled])');
    await page.fill('#name', 'Kept Name');
    await page.click('button[aria-controls="dc-mnav"]');
    await page.click('#dc-mnav a.call');
    await page.waitForURL('**/contact?intent=call');
    await page.waitForSelector('#preferredContactTime');
    check(E, 'header menu link switches to call, keeps values', (await page.inputValue('#name')) === 'Kept Name');
    check(E, 'header link: call state checked', await page.isChecked('input[name="intent"][value="call"]'));
    await page.setViewportSize({ width: 1280, height: 900 });

    // in-page "Request a call" link (closing section)
    await page.goto(`${BASE}/contact`);
    await page.waitForSelector('button.ct-send:not([disabled])');
    await page.fill('#name', 'Kept Again');
    await page.click('.sc-calm a.sc-back');
    await page.waitForSelector('#preferredContactTime');
    check(E, 'closing-section link selects call, keeps values', (await page.inputValue('#name')) === 'Kept Again');

    check(E, 'no console errors', consoleErrors.length === 0, consoleErrors.join(' | '));
    await ctx.close();

    // widths: overflow, clipped controls, tap targets; both states
    for (const width of WIDTHS) {
      for (const state of ['enquiry', 'call']) {
        const c = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
        const p = await c.newPage();
        await p.goto(`${BASE}/contact${state === 'call' ? '?intent=call' : ''}`);
        await p.waitForSelector('button.ct-send:not([disabled])');
        const m = await p.evaluate(() => {
          const doc = document.documentElement;
          const rect = (s) => document.querySelector(s).getBoundingClientRect();
          const inside = (r) => r.left >= 0 && r.right <= doc.clientWidth + 0.5;
          const controls = [...document.querySelectorAll('.ct-form input:not([type=hidden]):not(#contactReference), .ct-form select, .ct-form textarea, .ct-form button, .ct-intent-o')];
          return {
            overflow: doc.scrollWidth - doc.clientWidth,
            clipped: controls.filter((el) => !inside(el.getBoundingClientRect())).map((el) => el.id || el.className),
            smallTargets: [...document.querySelectorAll('.ct-intent-o, .ct-input, .ct-send')].filter((el) => el.getBoundingClientRect().height < 44).map((el) => el.id || el.className),
            send: inside(rect('button.ct-send')),
            transition: getComputedStyle(document.querySelector('.ct-intent-o')).transitionDuration,
          };
        });
        check(E, `${width} ${state}: no horizontal overflow`, m.overflow <= 0, m.overflow);
        check(E, `${width} ${state}: no clipped controls`, m.clipped.length === 0 && m.send, JSON.stringify(m.clipped));
        check(E, `${width} ${state}: targets ≥44px`, m.smallTargets.length === 0, JSON.stringify(m.smallTargets));
        check(E, `${width} ${state}: reduced motion honoured`, /^0s|^1e-05s|^0\.00001s/.test(m.transition), m.transition);
        if (SHOTS && E === 'chromium' && [390, 1440].includes(width)) {
          await p.screenshot({ path: path.join(SHOTS, `contact-${state}-${width}-fold.png`) });
          await p.screenshot({ path: path.join(SHOTS, `contact-${state}-${width}-full.png`), fullPage: true });
        }
        await c.close();
      }
    }

    // 200% zoom equivalent (640 CSS px at 1280) and enlarged text
    const z = await browser.newContext({ viewport: { width: 640, height: 450 } });
    const zp = await z.newPage();
    await zp.goto(`${BASE}/contact?intent=call`);
    await zp.waitForSelector('button.ct-send:not([disabled])');
    await zp.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const zo = await zp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(E, '200% text at 640px: no horizontal overflow', zo <= 0, zo);
    if (SHOTS && E === 'chromium') await zp.screenshot({ path: path.join(SHOTS, 'contact-call-640-text200.png'), fullPage: true });
    await z.close();
  } catch (error) {
    check(E, 'run completed', false, error.stack);
  } finally {
    await browser.close();
  }
}

(async () => {
  for (const [name, type] of [['chromium', chromium], ['firefox', firefox], ['webkit', webkit]]) {
    await run(name, type);
  }
  const failed = results.filter((r) => !r.ok);
  const byEngine = {};
  for (const r of results) {
    byEngine[r.engine] ??= { pass: 0, fail: 0 };
    byEngine[r.engine][r.ok ? 'pass' : 'fail']++;
  }
  console.log(JSON.stringify({ byEngine, failed }, null, 2));
  if (SHOTS) fs.writeFileSync(path.join(SHOTS, 'e2e-results.json'), JSON.stringify(results, null, 2));
  process.exit(failed.length ? 1 : 0);
})();
