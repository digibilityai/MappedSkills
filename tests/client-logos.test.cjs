const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const rd = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const reg = rd('lib/clients.ts');

const entries = reg.split(/\n  (?:\{\n|\{ |c\()/).slice(1);
const keyOf = (e) => /key: '([^']+)'/.exec(e)?.[1] ?? /^'([^']+)'/.exec(e)?.[1];

test('register: 33 entries = the 31 supplied logos + Omsai and Wanderlooms (already in the repo); 32 shown, Vibgyor High blocked', () => {
  const keys = entries.map(keyOf);
  assert.strictEqual(keys.length, 33);
  assert.strictEqual(new Set(keys).size, 33, 'no duplicate client');
  const blocked = entries.filter((e) => /display: 'blocked'/.test(e)).map(keyOf);
  assert.deepEqual(blocked, ['vibgyor-high']);
  assert.match(reg, /const c = .*display: 'show'/);
  // the two clients that are not in the ZIP: Wanderlooms uses its existing approved file; Omsai a transparent derivative (the frozen original is untouched)
  assert.ok(entries.find((e) => keyOf(e) === 'wanderlooms').includes('/images/resolve-r3/'));
  assert.ok(entries.find((e) => keyOf(e) === 'om-sai').includes('/images/clients/omsai-group.webp'));
});

test('register: the web copies in public/images/clients are the 30 shown ZIP logos plus the transparent Omsai copy; the blocked one is never copied', () => {
  const files = fs.readdirSync(path.join(root, 'public/images/clients'));
  assert.strictEqual(files.length, 31);
  for (const f of files) assert.ok(reg.includes(`/images/clients/${f}`), `${f} is in the register`);
  assert.ok(!files.some((f) => /vibgyor/i.test(f)));
  assert.doesNotMatch(reg, /vibgyor[^\n]*src:/i);
  assert.ok(!fs.existsSync(path.join(root, 'public/images/clients/Vibgyor.svg')));
});

test('register: verified services only; display authorisation is not a service claim', () => {
  const tagged = entries.filter((e) => /services: \[[^\]]/.test(e)).map(keyOf);
  assert.deepEqual(tagged.sort(), ['ameba-software', 'anybodycanbake', 'bakedemy', 'classpe', 'insuryo', 'om-sai']);
  assert.match(reg, /key: 'wanderlooms'[^]*?services: \[\]/);
  assert.match(reg, /clientsForService = .*shown.*services\.includes/s);
});

test('homepage: the section is titled and uses the register wall; there is no marquee', () => {
  const home = rd('components/resolve-home-r3/ResolveHomeR3.tsx');
  assert.match(home, /Businesses <em>we’ve worked with<\/em>/);
  assert.match(home, /<ClientLogoWall \/>/);
  const strip = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '');
  const css = strip(rd('components/clients/client-logos.css'));
  assert.doesNotMatch(strip(rd('components/clients/ClientLogoWall.tsx')) + css, /marquee|infinite|alternate|animation-iteration/);
  // the only motion: bounded, scroll-linked drift of the three bands, desktop and no-preference only, never an autoplay loop
  const anims = css.match(/animation\s*:[^;]+;/g) || [];
  assert.strictEqual(anims.length, 2);
  for (const a of anims) assert.match(a, /animation-timeline|linear both/);
  assert.match(css, /@media \(min-width: 1081px\) and \(prefers-reduced-motion: no-preference\)[^]*@supports \(animation-timeline: view\(\)\)/);
  assert.match(css, /translate: -22px 0; \} to \{ translate: 22px 0;/);
});

test('/work: the Home Decor study is unlisted at the source (count, pages, search, filters, next link); its page is untouched', () => {
  assert.match(rd('lib/case-study-eligibility.ts'), /UNLISTED_CASE_STUDY_IDS[^]*'4zQL4P8SR2xogxHN4qFfUl'/);
  assert.match(rd('components/cplus/work/load.ts'), /filter\(\(s\) => !UNLISTED_CASE_STUDY_IDS\.has\(s\.id\)\)/);
  assert.match(rd('lib/contentful/case-studies.ts'), /s\.slug === slug \|\| !UNLISTED_CASE_STUDY_IDS\.has\(s\.id\)/);
  // eligibility for the detail page and the sitemap is not changed by the unlisting
  assert.doesNotMatch(rd('lib/case-study-eligibility.ts').split('export const UNLISTED_CASE_STUDY_IDS')[0], /UNLISTED/);
});
