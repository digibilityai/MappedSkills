// G1 review artifact builder: assembles g1/mockup/index.html from the live C+ chrome (tools/live-chrome.json) and the proposed body parts.
// Run: node docs/conversion-redesign/g1/tools/build.cjs
const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '..', 'mockup');
const c = require('./live-chrome.json');
const fix = (h) => h.replace(/src="\/(mappedskills-logo-[a-z-]+\.webp)"/g, 'src="vendor/$1"').replace(/srcset="[^"]*"/g, '');
const parts = ['01-hero', '02-route', '03-work', '04-measure', '05-proof', '06-close'];
const body = '<!-- G1 REVIEW ARTIFACT. Proposed /conversion-optimization body. Not production code. -->\n' + parts.map((p) => fs.readFileSync(path.join(D, 'src/parts', p + '.html'), 'utf8')).join('\n');
fs.writeFileSync(path.join(D, 'src/body.html'), body);
const banner = c.banner.replace('<div', '<div data-consent=""');
const html = `<!doctype html>
<html lang="en" class="__variable_1243c3 __variable_5b504c">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Conversion Optimization Redesign Mockup (G1 review)</title>
<link rel="stylesheet" href="vendor/layout.css">
<link rel="stylesheet" href="vendor/page.css">
<link rel="stylesheet" href="src/co.css">
</head>
<body class="__variable_1243c3 __variable_5b504c font-sans antialiased bg-background text-foreground">
<div hidden></div>
${banner}
${fix(c.header)}
<main id="main"><div class="dc __variable_68b274 px px-b px-h">
<span aria-hidden="true" class="dc-font-prime dc-font-prime--hero"></span><span aria-hidden="true" class="dc-font-prime dc-font-prime--96"></span><span aria-hidden="true" class="dc-font-prime dc-font-prime--72"></span><span aria-hidden="true" class="dc-font-prime dc-font-prime--96b"></span>
${body}
</div></main>
${fix(c.footer)}
<script src="src/seq.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(D, 'index.html'), html);
console.log('wrote', path.join(D, 'index.html'), html.length);
