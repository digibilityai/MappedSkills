// Guards for /work (THE RESOLVE Stage 3, on the G2/G7 data rules): unchanged title, description and path; one trail,
// Home → Case studies, for the visible breadcrumb and the BreadcrumbList (WK-D5); the approved H1, lede and close; studies
// from Contentful with no fixed count, no hard-coded client facts and no withheld proof; the shared case-study card with
// no outcome, figure or quote on it; the close to /contact and /contact?intent=call; once-only motion that reduced motion
// clears; a page stylesheet that cannot reach other pages. Also the Stage 3 case-study presentation rules.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const page = read('app/(pages)/work/page.tsx');
const paged = read('app/(pages)/work/page/[n]/page.tsx');
const body = read('components/b2/Work.tsx');
const lib = read('components/b2/WorkLibrary.tsx');
const cards = read('components/b2/work-cards.ts');
const content = read('components/cplus/work/content.ts');
const studies = read('components/cplus/work/studies.ts');
const css = read('components/b2/work.css');
const tpl = read('components/case-study/CaseStudyTemplate.tsx');
const tplCss = read('components/case-study/case-study.css');
const nav = read('docs/16-ux/07_NAVIGATION_ARCHITECTURE.md');
const code = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
const copy = code(content);
const all = code(page) + code(body) + code(lib) + code(cards) + copy + code(studies);

test('title, description, path and revalidate unchanged', () => {
  assert.match(page, /'Work \| MappedSkills',\n\s+'Explore selected MappedSkills client projects, marketing challenges and approaches\.',\n\s+'\/work'/);
  assert.match(page, /export const revalidate = 60;/);
  assert.doesNotMatch(page, /noindex/);
});

test('WK-D5: one trail, Home → Case studies, for the breadcrumb and the BreadcrumbList', () => {
  for (const src of [page, paged]) {
    const trail = code(src).match(/const TRAIL: CrumbStep\[\] = \[([\s\S]*?)\];/)[1];
    const steps = [...trail.matchAll(/\{ name: '([^']+)', href: '([^']+)' \}/g)].map((m) => [m[1], m[2]]);
    assert.deepStrictEqual(steps, [['Home', '/'], ['Case studies', '/work']]);
    assert.match(src, /routeTrailJsonLd\(TRAIL\)/);
    assert.match(src, /<Work library=\{library\} \/>/);
  }
  // Batch 2: /work is a top-level index, so the visible breadcrumb is gone; the BreadcrumbList above stays
  assert.doesNotMatch(body, /aria-label="Breadcrumb"/);
  assert.match(copy, /crumb: 'Case studies'/);
  assert.match(nav, /\| `\/work` \| \*\*Yes\*\* \| Home → Case studies/);
});

test('approved H1, lede, evidence note and close; two-tone headings', () => {
  assert.match(copy, /h1: \{ a: 'Real work\.', b: 'Judge it for yourself\.' \}/);
  assert.match(body, /<h1 id="wk-h1">\{S\.hero\.h1\.a\} <span>\{S\.hero\.h1\.b\}<\/span><\/h1>/);
  assert.match(copy, /lede: 'Explore the challenges businesses brought to us, what we changed, and how we approached the work\.'/);
  assert.doesNotMatch(copy, /evidence: \{|route: \{|featured: \{/, 'R2: the route panel, "start here" and evidence-rule copy are removed from the page');
  assert.match(copy, /h: 'Tell us what you’re trying to fix\.'/);
  assert.match(copy, /body: 'Tell us what you’re working towards\. We’ll help you figure out where to start\.'/);
  assert.match(copy, /primary: 'Discuss Your Advertising'/);
  assert.match(copy, /secondary: 'Request a Call'/);
  assert.match(body, /<ActionLink href=\{CONTACT_HREF\} variant="dark">\{S\.close\.primary\}<\/ActionLink>/);
  assert.match(body, /<ActionLink href=\{BOOKING_HREF\} variant="text">\{S\.close\.secondary\}<\/ActionLink>/);
});

test('removed: the C+ view, the hero index, the R3 filter bar and "Check us"', () => {
  for (const f of ['WorkBody.tsx', 'WorkCards.tsx', 'WorkLibrary.tsx', 'work.css']) assert.ok(!fs.existsSync(path.join(__dirname, '..', 'components/cplus/work', f)), f);
  assert.doesNotMatch(all, /CplusPage|On this page|wk-index|wk-filter|Filter by|Check us|wk-check|traffic-but-no-enquiries/);
  assert.doesNotMatch(all, /What we can show you|Permission, not results|no published case studies|Book a call/i);
});

test('studies come from Contentful: no fixed count, no hard-coded client facts', () => {
  assert.match(page, /const library = \(await loadLibraryPage\(1\)\)!;/);
  assert.match(read('components/cplus/work/load.ts'), /libraryStudies\(\(await fetchContentfulCaseStudies\(\)\)\.filter\(\(s\) => !UNLISTED_CASE_STUDY_IDS\.has\(s\.id\)\), FEATURED_SLUG\)/);
  assert.doesNotMatch(all, /Ameba Software|AnybodyCanBake|AnyBodyCanBake|Om Sai|Home decor|Chandigarh|Bangalore|Pune|Chembur|\b(two|three|four|five|six) (projects|case studies|studies)\b/i);
  assert.doesNotMatch(all.replace(/placeholder=\{S\.library\.searchHint\}/g, ''), /placeholder/i);
  assert.doesNotMatch(copy, /count: \(n: number\) =>/, 'the count line is composed from the library total, never a fixed number');
});

test('withheld proof cannot reach the page (DEC-031); a card shows only a study\u2019s own lead figure, never a withheld one, a quote or a rating', () => {
  assert.doesNotMatch(code(studies).replace(/study\.newLayout\.summary/g, ''), /resultsMetrics|beforeAfter|highlightResult|review|businessGoals|conclusion/);
  assert.match(code(studies), /study\.sections\.problemStatement/);
  assert.match(code(studies), /isCaseStudyProofWithheld\(study\.slug, studyCopy\(study\)\)/, 'the lead figure is dropped while a study\u2019s proof is withheld');
  assert.match(code(studies), /top\.kind === 'figure'/, 'only a figure the editor emphasised, as written');
  assert.doesNotMatch(copy, /\d+\s*%|₹|ROI|testimonial|guarantee|★/i);
  assert.doesNotMatch(code(cards), /review|quote|testimonial|rating/);
  assert.match(code(cards), /imageSlotsFor\(s\.href, undefined, s\.finalCopy\)\.card/, 'the card image comes from the listing slot only');
  assert.match(code(cards), /title: s\.client,\s*body: copy\?\.body \?\? s\.challenge,\s*href: s\.href,/);
});

test('R2: the library has its own card; the shared WorkCard (home, about, service pages) is unchanged and not used by /work', () => {
  assert.match(lib, /import \{ WorkLibCard \} from '\.\/WorkLibCard';/);
  assert.doesNotMatch(lib, /WorkCard\b(?!\w)(?<!WorkLibCard)/);
  assert.doesNotMatch(lib, /resolve\/WorkCard/);
  const shared = read('components/resolve/WorkCard.tsx');
  assert.match(shared, /rs-wc-cta/); assert.match(shared, /\{s\.eyebrow\}/, 'the shared card still has its eyebrow and call to action');
  const c = code(read('components/b2/WorkLibCard.tsx'));
  assert.doesNotMatch(c, /eyebrow|industry|Read the|Read case|fill\b|objectFit|scale\(|zoom/i, 'no eyebrow, no repeated link text, no crop or zoom');
  assert.match(c, /width=\{c\.art\.w\} height=\{c\.art\.h\}/, 'the image keeps its own ratio');
  assert.equal((c.match(/<Link /g) || []).length, 1, 'one link per card');
  assert.match(code(cards), /const APPROVED = Object\.values\(STUDIES\);/);
});

test('motion: nothing loops, sticks or zooms; the only transition is a 150 ms underline, removed for reduced motion', () => {
  const src = code(css);
  assert.doesNotMatch(src, /infinite|position:\s*sticky|position:\s*fixed|@keyframes|scale\(|(?<![-\w])transform:/);
  assert.match(src, /@media \(prefers-reduced-motion: reduce\) \{ \.b2\.wk \.wl-n a \{ transition: none; \} \}/);
  const src2 = code(tplCss);
  assert.doesNotMatch(src2, /infinite|position:\s*sticky|position:\s*fixed/, 'case-study.css');
  assert.doesNotMatch(src2.replace(/@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\n\}/g, ''), /@keyframes/, 'case-study.css: keyframes outside no-preference');
});

test('the page stylesheets are scoped to their pages', () => {
  for (const [s, scope] of [[css, '.b2.wk'], [tplCss, '.b2.cs']]) {
    const sels = code(s).replace(/@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '').match(/(^|\}|\{)\s*([^{}@]+)\{/g) || [];
    assert.ok(sels.length > 30, String(sels.length));
    for (const sel of sels.map((x) => x.replace(/^[}{]?\s*/, '').replace(/\{$/, '').trim())) {
      for (const part of sel.split(/,(?![^(]*\))/)) assert.ok(part.trim().replace(/^html /, '').startsWith(scope), part);
    }
  }
});

test('listing previews carry no year or date', () => {
  assert.doesNotMatch(code(studies), /\byear\b|clientDate/);
  assert.doesNotMatch(code(body) + code(lib), /\.year\b|\bdate\b/i);
});

test('simplified G6: a new-template study uses its approved summary; a legacy study never does', () => {
  const src = code(studies);
  assert.match(src, /study\.layout === 'new' && study\.newLayout\s*\?\s*study\.newLayout\.summary\s*:\s*excerptFromDocument\(study\.sections\.problemStatement/);
  assert.strictEqual((src.match(/newLayout\.summary/g) || []).length, 1);
});

test('case study (Stage 3): only a reported figure leads the hero; without figures the section and statements say so', () => {
  const src = code(tpl);
  assert.match(src, /const lead = figures\[0\] \?\? null;/);
  assert.match(src, /const impactTitle = figures\.length \? 'The impact' : 'Where it stands';/);
  assert.match(src, /: 'What we can document';/);
  assert.match(src, /\{figures\.length \? \(\s*<p className="ct-said-k">/);
  // the headline keeps the study's own words: split into runs by lib/case-study-headline.ts, never rewritten (B4-02)
  assert.match(src, /const h1 = headlineRuns\(study\.slug, study\.title\);/);
  // artwork only from the approved card set, with its disclosure
  assert.match(src, /imageSlotsFor\(study\.href, undefined, finalCopy\)\.feature/);
  assert.match(src, /\{stage\?\.note \? <figcaption>\{stage\.note\}<\/figcaption> : null\}/);
  // the existing actions stay
  // (a study with approved closing copy in lib/case-study-presentation.ts shows that copy and its one button instead)
  assert.match(src, /<ActionLink href=\{CONTACT_HREF\} variant="dark">\s*\{closeLabel\(service\?\.link\)\}/);
  assert.match(src, /<ActionLink href=\{BOOKING_HREF\} variant="text">\s*Request a Call/);
});

test('Stage 3 revision: illustrations are conceptual, labelled, code-drawn and limited to known studies; the title preview is development-only', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const rd = (f) => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  const art = rd('components/case-study/CaseArt.tsx');
  assert.match(art, /export const MOTIF_NOTE = 'Conceptual illustration drawn for this page\. Not client artwork, a screenshot or a result\.';/);
  assert.doesNotMatch(art, /<image|<text|href="http|xlink/i, 'no raster image, text or external reference in an illustration');
  assert.strictEqual(Object.keys(art.match(/MOTIF_BY_HREF: Record<string, Motif> = \{([\s\S]*?)\};/)[1].match(/'\/portfolio\/[^']+'/g)).length, 5);
  // the note stays on the detail-page stage (lib/case-study-images.ts); owner decision 31 October 2026: no disclosure beneath a /work card image
  assert.match(rd('lib/case-study-images.ts'), /MOTIF_NOTE/); assert.doesNotMatch(rd('components/resolve/WorkCard.tsx'), /MOTIF_NOTE/);
  assert.match(rd('components/b2/About.tsx'), /motifFor/, 'Batch 2: About gives AnybodyCanBake the same /work card illustration so both cards carry equal weight');
  assert.doesNotMatch(rd('components/resolve/work.ts'), /^\s+motif:/m, 'the approved About cards set no motif');
  const t = rd('lib/case-study-preview-titles.ts');
  assert.match(t, /process\.env\.NODE_ENV !== 'development'\) return title;/);
});

test('Stage 3B: two independent image slots per study (listing 8:5, detail 16:9), conceptual placeholders disclosed, no Contentful change', () => {
  const rd = (f) => require('node:fs').readFileSync(require('node:path').join(__dirname, '..', f), 'utf8');
  const img = rd('lib/case-study-images.ts');
  assert.match(img, /card: \{ w: 1600, h: 1000, ratio: '8:5' \}/);
  assert.match(img, /feature: \{ w: 1920, h: 1080, ratio: '16:9' \}/);
  // every retained study has its own card entry and its own feature entry (so either can be replaced alone)
  for (const h of ['om-sai-developer-meta-ads', 'classpe-social-media-strategy', 'insuryo-organic-growth', 'google-ads-for-online-courses', 'seo-ameba-software']) {
    assert.match(img, new RegExp(`'/portfolio/${h}': \\{ card: [^\\n]*feature: `), h);
  }
  assert.match(img, /kind: 'conceptual', motif, note: MOTIF_NOTE/);
  assert.match(img, /NOT queried or read today/);
  // Contentful is untouched: no image field is requested
  assert.doesNotMatch(rd('lib/contentful/queries.ts'), /listingImage|featureImage/);
});

test('Stage 3B: Home Decor is unlisted everywhere discovery happens, noindex follow, URL and canonical kept', () => {
  const rd = (f) => require('node:fs').readFileSync(require('node:path').join(__dirname, '..', f), 'utf8');
  assert.match(rd('lib/contentful/case-studies.ts'), /getCaseStudyListCards[^]*?filter\(\(s\) => !UNLISTED_CASE_STUDY_IDS\.has\(s\.id\)\)/);
  const page = rd('app/(pages)/portfolio/[slug]/page.tsx');
  assert.match(page, /UNLISTED_CASE_STUDY_IDS\.has\(caseStudy\.id\) \? \{ \.\.\.metadata, robots: \{ index: false, follow: true, googleBot: \{ index: false, follow: true \} \} \} : metadata/);
  assert.match(page, /createMetadata\(caseStudy\.metaTitle, presentationFor\(caseStudy\.href, finalCopy\)\.metaDescription \?\? caseStudy\.metaDescription, caseStudy\.href, og\?\.ogSrc \?\? og\?\.src, og\?\.alt\)/, 'canonical comes from createMetadata, unchanged');
  assert.match(rd('lib/case-study-eligibility.ts'), /UNLISTED_CASE_STUDY_IDS[^]*'4zQL4P8SR2xogxHN4qFfUl'/);
});

test('/work R2 (31 October 2026): two columns, no logo strip, route panel or "start here", a visible count, a service select, one link per card', () => {
  const rd = (f) => require('node:fs').readFileSync(require('node:path').join(__dirname, '..', f), 'utf8');
  const work = rd('components/b2/Work.tsx');
  assert.doesNotMatch(work, /ClientLogo|clientForHref|wk-mosaic|wk-route|CaseArt|PaReveal|HwSequence|S\.resolve/);
  const lib = rd('components/b2/WorkLibrary.tsx');
  assert.match(lib, /id="wk-service"/); assert.doesNotMatch(lib, /wk-chips|aria-pressed/, 'service chips are replaced by a select');
  assert.match(lib, /className="wk-count" role="status" aria-live="polite"/);
  assert.match(lib, /Showing \$\{\(p - 1\) \* PAGE_SIZE \+ 1\}/);
  assert.doesNotMatch(lib, /opening|S\.resolve/, 'one grid: no separate opening pair');
  const css = rd('components/b2/work.css');
  assert.match(css, /\.b2\.wk \.wk-grid \{ display: grid; grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\.wk-grid \{ grid-template-columns: 1fr;/);
  assert.match(css, /\.wl-n a::after \{ content: ''; position: absolute; inset: 0; \}/);
  assert.match(css, /\.wl-n a:focus-visible::after \{ outline: 3px solid var\(--v-tang\);/);
  assert.doesNotMatch(css, /wk-rules|wk-mosaic|wk-route|radial-gradient|box-shadow/);
});
