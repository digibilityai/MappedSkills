// Guards for the /seo seven-scene redesign (owner-approved 2026-10-31): approved metadata, scene order, proof rules and
// publication gating, link set and motion rules (no framework needed).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const content = read('components/cplus/seo/content.ts');
const body = read('components/cplus/seo/SeoBody.tsx');
const showcase = read('components/cplus/seo/showcase.ts');
const showcaseView = read('components/case-showcase/CaseShowcase.tsx');
const page = read('app/(pages)/seo/page.tsx');
const css = read('components/cplus/seo/seo.css');
const copy = content.replace(/\/\*[\s\S]*?\*\//g, '');

test('metadata is the owner-approved wording and the canonical path is unchanged', () => {
  assert.ok(page.includes("'SEO Judged on the Enquiries It Produces | MappedSkills'"));
  assert.ok(
    page.includes(
      "'We help your business appear for relevant searches, improve the pages visitors land on and measure whether organic search brings genuine enquiries.'"
    )
  );
  assert.ok(page.includes("'/seo'"));
  assert.ok(page.includes('<BreadcrumbJsonLd label="Search" path="/seo" />'));
});

test('hero keeps the core proposition and uses at most two supporting sentences', () => {
  assert.ok(/a: 'SEO that is judged on the'[\s\S]*b: 'enquiries'[\s\S]*c: 'it produces\.'/.test(copy));
  const lede = copy.match(/lede: \[([\s\S]*?)\],/)[1];
  assert.strictEqual((lede.match(/'[^']*'/g) || []).length, 2);
});

test('seven scenes in the approved order; the route graphic appears only in the hero', () => {
  const order = ['sk-h1', 'sk-h-prob', 'sk-h-work', 'sk-h-proof', 'sk-h-how', 'sk-h-qs', 'sk-h-close'];
  let at = -1;
  for (const id of order) {
    const i = id === 'sk-h-proof' ? body.indexOf('<CaseShowcase data={showcase} />') : body.indexOf(`id="${id}"`);
    assert.ok(i > at, `${id} present and in order`);
    at = i;
  }
  assert.strictEqual((body.match(/<h1\b/g) || []).length, 1);
  assert.strictEqual((body.match(/<ol className="sk-route"/g) || []).length, 1, 'the route is drawn once');
  assert.ok(!/sk-strip|sk-stages|sk-band-art|sk-sheet|sk-pledges|sk-pj/.test(body + css), 'removed scenes and the repeated route are gone');
});

test('removed content stays removed: review sheet, pledges, projects list, Bakedemy, auto-populating cards', () => {
  assert.ok(!/Illustrative layout|Results not yet published|Anybody Can Bake|Bakedemy|Historical SEO project/i.test(copy + body));
  assert.ok(!/RelatedCaseCards|<Suspense/.test(body), 'no auto-populating card section and no streamed boundary');
  assert.ok(!/Defined priorities|Transparent reporting/.test(copy));
});

test('the problems are the three approved questions and the work is five plain lines led by search intent', () => {
  for (const q of ['Your competitors appear in Google. Why don’t you?', 'Your website gets visitors. Why aren’t they contacting you?', 'Your SEO reports look positive. What has actually improved?']) {
    assert.ok(copy.includes(q), q);
  }
  const work = copy.slice(copy.indexOf('work: ['), copy.indexOf('proofKicker'));
  assert.strictEqual((work.match(/k: '/g) || []).length, 5);
  for (const k of ['Keyword research and page mapping', 'Technical SEO', 'Content and on-page optimisation', 'Selective authority building', 'Reporting and measurement']) assert.ok(work.includes(`k: '${k}'`), k);
  assert.ok(copy.includes("workIntent: 'Different searches come from different needs: learning, comparing, choosing."));
});

test('AnybodyCanBake proof: the approved SEO figures, period, caveat and link, spelled AnybodyCanBake', () => {
  const acb = copy.slice(copy.indexOf('acb: {'), copy.indexOf('ameba: {'));
  assert.ok(acb.includes("name: 'AnybodyCanBake'"));
  assert.ok(acb.includes("lead: { big: '46.15%', rest: 'more tracked organic course enquiries' }"));
  assert.ok(acb.includes("enquiries: { from: '91', to: '133'"));
  assert.ok(acb.includes("{ label: 'Organic clicks', from: '16,400', to: '20,580', pct: '+25.49%' }"));
  assert.ok(acb.includes("{ label: 'Nonbrand organic clicks', from: '15,348', to: '20,039', pct: '+30.56%' }"));
  assert.ok(acb.includes("period: 'May to July 2026 versus August to October 2026'"));
  assert.ok(/not proof that the work alone caused the change/.test(acb) && /not been independently checked/.test(acb));
  assert.ok(acb.includes("href: '/portfolio/anybodycanbake-seo'"));
  // the growth figures follow from the supplied totals
  const pct = (a, b) => ((b / a - 1) * 100).toFixed(2);
  assert.strictEqual(pct(16400, 20580), '25.49');
  assert.strictEqual(pct(15348, 20039), '30.56');
  assert.strictEqual(pct(91, 133), '46.15');
  // and match the case study's own record
  const fixture = read('lib/case-study-local-batch.ts');
  for (const f of ['16,400', '20,580', '15,348', '20,039', '25.49%', '30.56%', '46.15%']) assert.ok(fixture.includes(f), `${f} is in the case study`);
  // never the Google Ads case
  assert.ok(!/google-ads-for-online-courses|1,410|66,36,000|5\.24|898\.15/.test(copy + body), 'no Google Ads case or figure on /seo');
  assert.ok(!/AnyBodyCanBake/.test(copy + body));
  // the same approved figure, period and caveat are what the page's showcase card shows (DEC-115)
  for (const f of ["v: '46.15%'", 'from 91 to 133', "period: 'May to July 2026 versus August to October 2026'", 'not proof that the work alone caused the change', 'not been independently checked', "ACB = '/portfolio/anybodycanbake-seo'"]) assert.ok(showcase.includes(f), f);
});

test('Ameba Software (showcase): its own approved entry supplies any figure; the page adds only the qualification and the held summary', () => {
  const am = copy.slice(copy.indexOf('  ameba: {'), copy.indexOf('  amebaHeld: {'));
  assert.ok(am.includes("href: '/portfolio/seo-ameba-software'"));
  // the owner-supplied final figures remain recorded in the copy (31 October 2026): clicks 7,300 to 12,800 (+75.34%), enquiries 34 to 53 (+55.88%)
  for (const f of ['7,300', '12,800', '+75.34%', '34 to 53', '+55.88%', 'two three-month periods', 'not proof that the work alone caused the change']) assert.ok(am.includes(f), f);
  const ameba = showcase.slice(showcase.indexOf("'/portfolio/seo-ameba-software': {"));
  assert.ok(!/outcome:/.test(ameba), 'the page never supplies an Ameba figure: it comes from the library entry, which is empty while its proof is withheld');
  assert.ok(ameba.includes('A comparison of two three-month periods, not proof that the work alone caused the change.'));
  assert.ok(ameba.includes('We do not publish figures for this engagement.'), 'the held summary keeps the restriction');
  assert.ok(!/200%|30\+|18 keyword|testimonial|★|star|TechWave|Softwares|71\.92/i.test(showcase + showcaseView), 'no quote, rating or old claim');
});

test('proof is gated on the case studies being published: no unpublished link, figure or empty section', () => {
  assert.ok(showcaseView.includes("from '../cplus/work/load'") && /await loadLibrary\(\)/.test(showcaseView), 'reads the public library only');
  assert.ok(/catch \{\s*return null;/.test(showcaseView), 'an unreadable library shows no proof');
  assert.ok(!/local-preview|local-batch|withLocalPreview/.test(showcase + showcaseView + body + page), 'no preview-data import');
  assert.ok(/await loadCaseShowcase\(SEO_SHOWCASE\)/.test(page) && /<SeoBody showcase=\{showcase\} \/>/.test(page));
  assert.ok(body.includes('<CaseShowcase data={showcase} />'), 'one showcase section');
  assert.ok(body.includes("const showProof = !!showcase && showcase.cards.length > 0;"), 'the section itself is omitted when neither case is published');
  assert.ok(/const nHow = showProof \? '04' : '03'/.test(body), 'later chapters renumber');
  assert.ok(showcase.includes('S.proofHAlt') && copy.includes('proofHAlt'), 'a heading that does not promise results when the AnybodyCanBake case is absent');
  assert.ok(!fs.existsSync(path.join(root, 'components/cplus/seo/proof.ts')), 'the old proof loader is gone');
});

test('the proof figures are text, static and drawn by the shared showcase', () => {
  assert.ok(!/<text|<canvas|count-?up|data-count/i.test(body + css + showcaseView + read('components/case-showcase/case-showcase.css')));
  assert.ok(showcaseView.includes('<p className="cs-fig">{s.fig.v}</p>') && showcaseView.includes('<p className="cs-def">{s.fig.c}</p>'));
});

test('FAQ answers are the approved wording, closed on load', () => {
  assert.ok(content.includes("a: 'It depends on your website, competition and what needs improving. We’ll explain the priorities and realistic timelines before you start.'"));
  assert.ok(content.includes("a: 'No one can guarantee Google rankings. We commit to agreed improvements, clear reporting and regular reviews.'"));
  assert.ok(content.includes("a: 'Each package sets monthly allowances for keywords, page optimisation, new content, technical fixes and outreach, plus monthly reporting. The full list is in the packages above.'"));
  assert.ok(content.includes("a: 'SEO retainers have a minimum engagement of six months, because search work takes time to show in your data.'"));
  assert.ok(content.includes("a: 'No. All SEO prices exclude GST.'"));
  assert.ok(content.includes("a: 'Google Ads can generate visibility quickly. SEO builds visibility over time. Many businesses benefit from both.'"));
  assert.ok(!/<details[^>]*\bopen\b/.test(body));
});

test('no guarantee, traffic or sales promise anywhere on the page', () => {
  for (const banned of ['guarantee you', 'ROI', 'will rank', 'guaranteed', 'testimonial', 'Sonia', 'celebrit']) {
    assert.ok(!copy.toLowerCase().includes(banned.toLowerCase()), `"${banned}" must not appear`);
  }
  assert.ok(copy.includes('not a promise for yours'));
  assert.ok(copy.includes('Many businesses benefit from both.'));
});

test('every internal link is an approved existing destination', () => {
  const hrefs = new Set([...copy.matchAll(/href: '([^']+)'/g)].map((m) => m[1]));
  hrefs.delete('#packages'); // in-page anchor to the packages section
  const allowed = new Set(['/problems/traffic-but-no-enquiries', '/how-it-works', '/google-ads', '/ai-seo', '/services', '/portfolio/anybodycanbake-seo', '/portfolio/seo-ameba-software']);
  for (const h of hrefs) assert.ok(allowed.has(h), `unexpected link ${h}`);
  assert.strictEqual((body.match(/href=\{S\.howLink\.href\}/g) || []).length, 1, 'one process link');
  for (const h of ['/google-ads', '/ai-seo', '/services', '/how-it-works', '/problems/traffic-but-no-enquiries']) {
    assert.ok(fs.existsSync(path.join(root, 'app/(pages)', h.slice(1), 'page.tsx')), `${h} route exists`);
  }
  assert.ok(fs.existsSync(path.join(root, 'app/(pages)/portfolio/[slug]/page.tsx')), 'case-study detail route exists');
  assert.ok(body.includes('CONTACT_HREF') && body.includes('BOOKING_HREF'));
});

test('heading structure: one h1, an h2 per section and the case names as h3', () => {
  assert.strictEqual((body.match(/<h1\b/g) || []).length, 1);
  assert.strictEqual((body.match(/<h2\b/g) || []).length, 5, 'five here, the sixth is the showcase');
  assert.ok(showcaseView.includes('<h2 id={id}>') && showcaseView.includes('<h3 className="cs-name" id={nameId}>'));
  assert.ok(showcase.includes("id: 'sk-h-proof'"), 'the existing anchor is kept');
});

/* ---- THE RESOLVE composition: structure, motion rules ---- */
const seoDir = path.join(root, 'components/cplus/seo');

test('the page has no client component of its own; it reuses the approved once-only helpers', () => {
  const clients = fs.readdirSync(seoDir).filter((f) => /\.tsx?$/.test(f) && /^['"]use client['"]/.test(read('components/cplus/seo/' + f).trimStart()));
  assert.deepStrictEqual(clients, []);
  assert.ok(body.includes('<HwSequence scope=".sk" />') && body.includes('<PaReveal />'));
  assert.ok(body.includes('className="pa b2 sk"'));
});

test('seo.css is scoped to .b2.sk and has no looping, pinned or scroll-linked motion', () => {
  const code = css.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(!/infinite/.test(code), 'no infinite animation');
  assert.ok(!/position:\s*(sticky|fixed)/.test(code), 'no sticky or fixed positioning');
  assert.ok(!/animation-timeline|scroll-timeline|view-timeline/.test(code), 'no scroll-linked animation');
  assert.ok(!/import\s/.test(code), 'no css imports');
  for (const rule of code.matchAll(/(^|\})\s*([^{}@]+)\{/g)) {
    for (const part of rule[2].replace(/:(where|is)\([^)]*\)/g, '').split(',')) {
      const sel = part.trim();
      if (!sel || /^(from|to|\d+%|\d+% )/.test(sel) || /^[\d.]+%$/.test(sel)) continue;
      assert.match(sel, /\.sk\b/, `unscoped selector: ${sel}`);
    }
  }
});

test('every start (armed or running) state and keyframe is gated to motion-allowed visitors', () => {
  const at = css.indexOf('@media (prefers-reduced-motion: no-preference)');
  assert.ok(at > 0);
  const before = css.slice(0, at);
  assert.ok(!/data-anim=/.test(before), 'no armed/play styling outside the no-preference block');
  assert.ok(!/@keyframes|animation:/.test(before.replace(/\/\*[\s\S]*?\*\//g, '')), 'no animation outside the no-preference block');
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'));
});

test('the headline keeps its last words together (no single-word last line in Firefox)', () => {
  assert.ok(body.includes('<span className="sk-nw">{S.h1.c}</span>'));
  assert.ok(/span\.sk-nw \{[^}]*white-space: nowrap;/.test(css));
});

test('the local case-study previews cannot reach a build or a deployment (production behaviour)', () => {
  const preview = read('lib/case-study-local-preview.ts');
  assert.ok(/process\.env\.NODE_ENV === 'development' && process\.env\.CASE_STUDY_LOCAL_PREVIEW === '1'/.test(preview));
});

/* Batch 1: SEO packages, audit, terms and exclusions (single source: components/seo-packages/data.ts, shared with /pricing) */
{
  const { renderToStaticMarkup } = require('react-dom/server');
  const React = require('react');
  const Module = require('node:module');
  Module._extensions['.css'] = () => {};
  const realLoad = Module._load;
  Module._load = function (request, ...rest) {
    if (request === 'next/font/local' || request === 'next/font/google') return () => ({ className: '', variable: '', style: {} });
    return realLoad.call(this, request, ...rest);
  };
  const { load } = require('./helpers/ts-loader.cjs');
  const data = load('components/seo-packages/data.ts');
  const { SeoBody } = load('components/cplus/seo/SeoBody.tsx');
  const html = renderToStaticMarkup(React.createElement(SeoBody, { showcase: null }));
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');

  test('SEO packages: approved prices, GST wording, minimum term and audit credit', () => {
    assert.deepStrictEqual(data.SEO_PLANS.map((p) => [p.name, p.fee]), [['SEO Foundation', '₹19,999'], ['SEO Growth', '₹34,999'], ['SEO Scale', '₹59,999']]);
    assert.deepStrictEqual([data.SEO_AUDIT.name, data.SEO_AUDIT.fee, data.SEO_AUDIT.per], ['SEO Audit & Roadmap', '₹14,999', 'one time']);
    assert.match(text, /All prices exclude GST\./);
    assert.match(text, /minimum engagement of six months/);
    assert.match(content, /Major website rebuilds and migrations are separately scoped and quoted; routine technical SEO does not include managing a migration\./);
    assert.match(data.SEO_AUDIT.credit, /fully credited against your first SEO retainer invoice when you sign within 30 days of audit completion\. The credit is applied once and is not refundable in cash\./);
    assert.match(text, /Audit implementation is not included\./);
  });

  test('SEO packages: the approved monthly deliverables for Foundation, Growth and Scale', () => {
    const row = (k) => data.SEO_COMPARE.find((r) => r.k === k).v;
    assert.deepStrictEqual(row('Active target keywords'), ['Up to 15', 'Up to 30', 'Up to 60']);
    assert.deepStrictEqual(row('Initial page mapping'), ['Up to 10 pages', 'Up to 25 pages', 'Up to 50 pages']);
    assert.deepStrictEqual(row('Competitors analysed'), ['2', '3', '5']);
    assert.deepStrictEqual(row('Existing pages optimised each month'), ['Up to 2', 'Up to 4', 'Up to 8']);
    assert.deepStrictEqual(row('New content pieces each month'), ['1', '2', '4']);
    assert.deepStrictEqual(row('Eligible technical issues resolved each month'), ['Up to 3', 'Up to 6', 'Up to 12']);
    assert.deepStrictEqual(row('Outreach prospects researched each month'), ['5', '10', '20']);
    assert.deepStrictEqual(row('Personalised outreach attempts each month'), ['3', '8', '15']);
    assert.deepStrictEqual(row('Backlink profile review'), ['Quarterly', 'Monthly', 'Monthly']);
    assert.deepStrictEqual(row('Google Business Profile'), ['1 location', '1 location', 'Up to 2 locations']);
    assert.deepStrictEqual(row('Performance reporting'), ['Monthly', 'Monthly', 'Monthly']);
    assert.deepStrictEqual(row('Strategy review'), ['Quarterly', 'Monthly', 'Monthly']);
    assert.strictEqual(data.SEO_AUDIT.includes.length, 8);
  });

  test('SEO packages: no guarantees, no bought links, exclusions need separate scope, one H1 and no long dashes', () => {
    assert.match(text, /do not guarantee backlinks, rankings, traffic, enquiries or revenue/);
    assert.match(text, /do not buy links or use purchased-link schemes/);
    for (const x of ['Major website development or redesign', 'Website migrations', 'Paid advertising management', 'Multilingual or international SEO expansion']) assert.ok(text.includes(x), x);
    assert.match(text, /All additional work needs your approval before it starts\./);
    assert.strictEqual((html.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(JSON.stringify(data), /[–—]|--/);
    assert.doesNotMatch(text, /[–—]|--/);
  });
}
