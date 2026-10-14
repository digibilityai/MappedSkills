#!/usr/bin/env node
/**
 * GATE 4 · B0 — CHECKS 1–4 and 9 (static part): route inventory and preservation snapshot.
 *
 * usage: node inventory.cjs --plain <url> --fixture <url> --out <file.json> [--only id,id] [--engine chromium]
 *
 * For every target (lib.cjs TARGETS) at 1440×900, JavaScript on, consent preset to "denied":
 *   status · title · meta (name/property) · canonical · robots · lang · JSON-LD (raw, in order)
 *   headings (level, text, region) · visible text lines by region (main / header / footer)
 *   links by region (href, accessible name) · CTAs (contact / booking / mailto / tel / external)
 *   forms (fields, names, types, required, labels) · buttons · data-* attribute names
 *   font preloads · motion hooks · non-framework scripts · proof sentinels (fixture routes)
 * Compare two inventories with diff-inventory.cjs.
 */
const fs = require('fs');
const path = require('path');
const { args, selectTargets, baseFor, launch, context, watchErrors, pool } = require('./lib.cjs');
const { WITHHELD_SENTINELS, OPEN_SENTINELS } = require('./cms-fixtures/fixtures.cjs');

const a = args();
if (!a.out) { console.error('--out required'); process.exit(2); }

function snapshot() {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const regionOf = (el) => (el.closest('main') ? 'main' : el.closest('footer') ? 'footer' : el.closest('header') ? 'header' : 'other');
  const main = document.querySelector('main');
  const header = [...document.querySelectorAll('header')].find((h) => !h.closest('main'));
  const footer = [...document.querySelectorAll('footer')].reverse().find((f) => !f.closest('main'));
  const accName = (e) => {
    const lb = e.getAttribute('aria-labelledby');
    if (lb) return norm(lb.split(/\s+/).map((id) => document.getElementById(id)?.textContent || '').join(' '));
    return norm(e.getAttribute('aria-label') || e.innerText || [...e.querySelectorAll('img[alt]')].map((i) => i.alt).join(' ') || e.getAttribute('title') || '');
  };
  const lines = (el) => (el ? el.innerText.split('\n').map(norm).filter(Boolean) : []);
  const links = (el) => (el ? [...el.querySelectorAll('a[href]')].map((x) => `${x.getAttribute('href')} :: ${accName(x)}`).sort() : []);
  const meta = [...document.querySelectorAll('meta[name], meta[property]')]
    .map((m) => `${m.getAttribute('name') || m.getAttribute('property')}=${m.getAttribute('content')}`)
    .filter((s) => !/^next-size-adjust/.test(s))
    .sort();
  const ctaKind = (h) => (h === '/contact' ? 'contact' : h === '/schedule-call' ? 'booking-page' : /calendly\.com/.test(h) ? 'booking-external' : h.startsWith('mailto:') ? 'mailto' : h.startsWith('tel:') ? 'tel' : /^https?:/.test(h) ? 'external' : null);
  const ctas = [...document.querySelectorAll('a[href]')]
    .map((x) => ({ k: ctaKind(x.getAttribute('href')), r: regionOf(x), h: x.getAttribute('href'), n: accName(x), t: x.getAttribute('target') || '' }))
    .filter((x) => x.k)
    .map((x) => `${x.r} ${x.k} ${x.h} :: ${x.n}${x.t ? ' [target=' + x.t + ']' : ''}`)
    .sort();
  const labelFor = (f) => norm((f.id && document.querySelector(`label[for="${CSS.escape(f.id)}"]`)?.textContent) || f.closest('label')?.textContent || f.getAttribute('aria-label') || '');
  const forms = [...document.querySelectorAll('form')].map((f) => ({
    region: regionOf(f),
    action: f.getAttribute('action'),
    method: f.getAttribute('method'),
    noValidate: f.noValidate,
    fields: [...f.querySelectorAll('input, select, textarea, button')].map((x) => ({
      tag: x.tagName.toLowerCase(), type: x.getAttribute('type'), name: x.getAttribute('name'), id: x.id || null,
      required: x.required, ariaRequired: x.getAttribute('aria-required'), autocomplete: x.getAttribute('autocomplete'),
      tabindex: x.getAttribute('tabindex'), ariaHidden: x.closest('[aria-hidden="true"]') ? true : false,
      label: x.tagName === 'BUTTON' ? norm(x.textContent) : labelFor(x),
    })),
  }));
  const dataAttrs = {};
  for (const el of document.body.querySelectorAll('*')) for (const at of el.attributes) if (at.name.startsWith('data-')) dataAttrs[at.name] = (dataAttrs[at.name] || 0) + 1;
  const analyticsAttrs = Object.fromEntries(Object.entries(dataAttrs).filter(([k]) => /track|analytic|gtm|event|cta|ga-|conversion/i.test(k)));
  return {
    title: document.title,
    lang: document.documentElement.lang,
    canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href') || null,
    robots: document.querySelector('meta[name=robots]')?.getAttribute('content') || null,
    meta,
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
    headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => `${regionOf(h)} h${h.tagName[1]} ${norm(h.textContent)}`),
    h1count: document.querySelectorAll('h1').length,
    text: { main: lines(main), header: lines(header), footer: lines(footer) },
    links: { main: links(main), header: links(header), footer: links(footer) },
    ctas,
    forms,
    buttons: [...document.querySelectorAll('button')].map((b) => `${regionOf(b)} ${b.getAttribute('type') || 'submit'} :: ${accName(b)} ${b.getAttribute('aria-expanded') != null ? '[expanded=' + b.getAttribute('aria-expanded') + ']' : ''}${b.getAttribute('aria-pressed') != null ? '[pressed]' : ''}`.trim()).sort(),
    dataAttrs, analyticsAttrs,
    chrome: {
      header: header ? { cls: header.className.split(/\s+/).filter((c) => /^dc|sticky|relative/.test(c)).join(' '), position: getComputedStyle(header).position } : null,
      footer: footer ? { cls: footer.className.split(/\s+/).filter((c) => /^dc/.test(c)).join(' ') } : null,
      skipLink: !!document.querySelector('a.skip-link[href="#main"]'),
      consentBanner: !!document.querySelector('[role="region"][aria-labelledby="consent-banner-title"]'),
    },
    fontPreloads: [...document.querySelectorAll('link[rel=preload][as=font]')].map((l) => l.getAttribute('href').replace(/^.*\/media\//, 'media/')).sort(),
    motion: { dcMotion: document.querySelectorAll('[data-dc-motion]').length, dcPreAfterLoad: document.querySelectorAll('.dc-pre').length },
    scripts: [...document.querySelectorAll('script[src]')].map((s) => s.getAttribute('src')).filter((s) => !s.startsWith('/_next/')).sort(),
  };
}

(async () => {
  const browser = await launch(a.engine);
  const targets = selectTargets(a);
  const results = await pool(targets, 4, async (t) => {
    const ctx = await context(browser, { width: 1440, engine: a.engine, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errors = watchErrors(page, { expectDocumentStatus: t.status });
    const resp = await page.goto(baseFor(a, t) + t.url, { waitUntil: 'networkidle' });
    const raw = resp ? await resp.text() : '';
    const snap = await page.evaluate(snapshot);
    const dom = await page.content();
    // Consent bootstrap order, from the SERVED html (the live DOM gains scripts after load).
    const head = raw.split('</head>')[0];
    const at = head.search(/<script>[^<]*ms\.consent\.v1/);
    const consentBootstrap = {
      present: at >= 0,
      syncScriptsBefore: at < 0 ? null : (head.slice(0, at).match(/<script\b[^>]*\bsrc="[^"]*"[^>]*>/g) || []).filter((tag) => !/\b(async|defer)\b|type="module"/.test(tag)).length,
    };
    const sentinels = t.cms === 'fixture' ? {
      withheldInHtml: WITHHELD_SENTINELS.filter((s) => raw.includes(s) || dom.includes(s)),
      openInHtml: OPEN_SENTINELS.filter((s) => raw.includes(s)),
    } : undefined;
    await ctx.close();
    process.stderr.write(`· ${t.id}\n`);
    return { consentBootstrap, id: t.id, template: t.template, n: t.n, url: t.url, server: t.server, cms: t.cms, expectedStatus: t.status, status: resp ? resp.status() : 0, errors, ...snap, sentinels };
  });
  await browser.close();
  const out = { meta: { tool: 'gate-4/qa/inventory.cjs', engine: a.engine, plain: a.plain, fixture: a.fixture, at: new Date().toISOString(), targets: results.length }, routes: results };
  fs.mkdirSync(path.dirname(a.out), { recursive: true });
  fs.writeFileSync(a.out, JSON.stringify(out, null, 1));
  const bad = results.filter((r) => r.status !== r.expectedStatus);
  console.log(`inventory: ${results.length} targets; status as expected: ${results.length - bad.length}; unexpected: ${bad.map((r) => `${r.id}=${r.status}`).join(', ') || 'none'}`);
  for (const r of results.filter((x) => x.sentinels)) console.log(`  proof sentinels ${r.id}: withheld found [${r.sentinels.withheldInHtml}] · open found [${r.sentinels.openInHtml}]`);
})().catch((e) => { console.error(e); process.exit(1); });
