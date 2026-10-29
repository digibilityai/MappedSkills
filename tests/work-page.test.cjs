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
  assert.match(body, /<nav aria-label="Breadcrumb" className="wk-crumb">[\s\S]*?<Link href="\/">Home<\/Link>[\s\S]*?aria-current="page">\{S\.crumb\}/);
  assert.match(copy, /crumb: 'Case studies'/);
  assert.match(nav, /\| `\/work` \| \*\*Yes\*\* \| Home → Case studies/);
});

test('approved H1, lede, evidence note and close; two-tone headings', () => {
  assert.match(copy, /h1: \{ a: 'Real work\.', b: 'Judge it for yourself\.' \}/);
  assert.match(body, /<h1 id="wk-h1">\{S\.hero\.h1\.a\} <span>\{S\.hero\.h1\.b\}<\/span><\/h1>/);
  assert.match(copy, /lede: 'Explore the challenges businesses brought to us, what we changed, and how we approached the work\.'/);
  assert.match(copy, /evidence: \{ ch: 'Our evidence rule', a: 'Good work', b: 'deserves honest evidence\.' \}/);
  assert.match(copy, /h: 'Tell us what you’re trying to fix\.'/);
  assert.match(copy, /body: 'Tell us what you’re working towards\. We’ll help you figure out where to start\.'/);
  assert.match(copy, /primary: 'Contact us'/);
  assert.match(copy, /secondary: 'Request a call'/);
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
  assert.match(read('components/cplus/work/load.ts'), /libraryStudies\(await fetchContentfulCaseStudies\(\), FEATURED_SLUG\)/);
  assert.doesNotMatch(all, /Ameba Software|AnybodyCanBake|AnyBodyCanBake|Om Sai|Home decor|Chandigarh|Bangalore|Pune|Chembur|\b(two|three|four|five|six) (projects|case studies|studies)\b/i);
  assert.doesNotMatch(all.replace(/placeholder=\{S\.library\.searchHint\}/g, ''), /placeholder/i);
  assert.match(copy, /count: \(n: number\) =>/);
});

test('withheld proof cannot reach the page (DEC-031); cards carry no outcome, figure or quote', () => {
  assert.doesNotMatch(code(studies).replace(/study\.newLayout\.summary/g, ''), /resultsMetrics|beforeAfter|highlightResult|review|businessGoals|summary|conclusion/);
  assert.match(code(studies), /study\.sections\.problemStatement/);
  assert.doesNotMatch(copy, /\d+\s*%|₹|ROI|testimonial|guarantee|★/i);
  // a card is the approved card (About) or eyebrow, client, challenge and link; nothing else from the study
  assert.doesNotMatch(code(cards), /outcomes|figures|review|quote|art:/);
  assert.match(code(cards), /title: s\.client,\s*body: s\.challenge,\s*href: s\.href,/);
});

test('the shared case-study card is reused, text-only unless the study has approved artwork', () => {
  assert.match(lib, /import \{ WorkCard \} from '\.\.\/resolve\/WorkCard';/);
  assert.match(lib, /<WorkCard s=\{toCard\(opening\[0\]\)\} lead \/>/);
  assert.match(lib, /<WorkCard s=\{toCard\(s\)\}/);
  assert.match(code(cards), /const APPROVED = Object\.values\(STUDIES\);/);
});

test('motion: keyframes only under no-preference, reduced motion clears it, nothing loops or sticks', () => {
  for (const [f, s] of [['work.css', css], ['case-study.css', tplCss]]) {
    const src = code(s);
    assert.doesNotMatch(src, /infinite|position:\s*sticky|position:\s*fixed/, f);
    const outside = src.replace(/@media \(prefers-reduced-motion: no-preference\) \{[\s\S]*?\n\}/g, '');
    assert.doesNotMatch(outside, /@keyframes/, `${f}: keyframes outside no-preference`);
    assert.match(src, /@media \(prefers-reduced-motion: reduce\) \{\s*\.b2\.(wk|cs) \*, \.b2\.\1 \*::before, \.b2\.\1 \*::after \{ animation: none !important; transition: none !important; \}/, f);
  }
});

test('the page stylesheets are scoped to their pages', () => {
  for (const [s, scope] of [[css, '.b2.wk'], [tplCss, '.b2.cs']]) {
    const sels = code(s).replace(/@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '').match(/(^|\}|\{)\s*([^{}@]+)\{/g) || [];
    assert.ok(sels.length > 40, String(sels.length));
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
  // the headline keeps the study's own words: split, never rewritten
  assert.match(src, /return i > 0 \? \[title\.slice\(0, i\), title\.slice\(i \+ 1\)\] : \[title, ''\];/);
  // artwork only from the approved card set, with its disclosure
  assert.match(src, /Object\.values\(STUDIES\)\.find\(\(c\) => c\.href === href\)\?\.art \?\? null/);
  assert.match(src, /<figcaption>\{art\.note\}<\/figcaption>/);
  // the existing actions stay
  assert.match(src, /<ActionLink href=\{CONTACT_HREF\} variant="dark">\s*Contact us/);
  assert.match(src, /<ActionLink href=\{BOOKING_HREF\} variant="text">\s*Request a call/);
});
