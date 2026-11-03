const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

/* Release fixes F2 (/ai-seo tablet overflow) and F3 (mobile menu focus). Source-level guards;
 * the rendered behaviour is checked by tests/e2e/release-f2-f3.e2e.cjs against a production build. */

const css = fs.readFileSync('components/cplus/ai-seo/ai-seo.css', 'utf8');
const header = fs.readFileSync('components/direction-c/SiteHeader.tsx', 'utf8');

test('F2: the reporting mini card grid can shrink below its content', () => {
  assert.match(css, /\.b2\.ai \.ax-mini \{[^}]*display: grid; grid-template-columns: minmax\(0, 1fr\);/);
});

test('F2: the tracking table wraps and tightens only between 768px and 1023px', () => {
  const m = css.match(/@media \(min-width: 768px\) and \(max-width: 1023px\) \{ \.b2\.ai \.ax-trk td \{ white-space: normal; \}[^\n]*\}/);
  assert.ok(m, 'tablet range rule');
  assert.match(m[0], /\.ax-trk thead th \{ letter-spacing: \.04em; \}/);
  assert.match(m[0], /\.ax-trk th, \.b2\.ai \.ax-trk td \{ padding: 8px 4px; \}/);
  assert.match(m[0], /\.ax-mini \{ padding: 12px; \}/);
  assert.match(css, /\.b2\.ai \.ax-trk td \{ white-space: nowrap; \}/, 'desktop rule unchanged');
});

test('F3: opening the mobile menu moves focus in and makes the page behind it inert', () => {
  assert.match(header, /getElementById\('dc-mnav'\)\?\.querySelector<HTMLElement>\('a\[href\], button'\)/);
  assert.match(header, /firstControl\(\)\?\.focus\(\);\n\s+const behind/);
  assert.match(header, /'#main, body > footer'/);
  assert.match(header, /setAttribute\('inert', ''\)/);
  assert.match(header, /removeAttribute\('inert'\)/);
});

test('F3: Tab and Shift+Tab wrap inside the consent banner and header while the menu is open', () => {
  assert.match(header, /document\.addEventListener\('keydown', onTab\)/);
  assert.match(header, /\[banner\(\), header\.current\]/);
  assert.doesNotMatch(header, /onKeyDown=\{onHeaderKey\}/);
  assert.match(header, /e\.shiftKey && document\.activeElement === first/);
  assert.match(header, /!e\.shiftKey && document\.activeElement === last/);
});

test('F3: Escape still returns focus to the Menu button, and links do not take focus', () => {
  assert.match(header, /setMenuOpen\(false\);\s*setMSvcOpen\(false\);\s*menuBtn\.current\?\.focus\(\);/);
  const closeMenu = header.slice(header.indexOf('const closeMenu'), header.indexOf('useEffect'));
  assert.doesNotMatch(closeMenu, /focus\(/);
});

test('F3: the banner is not made inert, and focus returns to the menu when a consent choice removes it', () => {
  assert.doesNotMatch(header, /'#main, body > footer, [^']*consent/);
  assert.match(header, /new MutationObserver/);
  assert.match(header, /hadBanner && !has && \(!document\.activeElement \|\| document\.activeElement === document\.body\)\) firstControl\(\)\?\.focus\(\)/);
});
