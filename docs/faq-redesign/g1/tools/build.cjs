// G1 review artifact builder: assembles faq g1/mockup/index.html from the live C+ chrome (tools/live-chrome.json,
// reused from the Schedule a Call G1 kit, captured from the live site on 17 Oct 2026) and the proposed body (mockup/src/body.html).
// Header and footer are left exactly as live. Run inside g1: node tools/build.cjs
const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '..', 'mockup');
const c = require('./live-chrome.json');
const fix = (h) => h
  .replace(/src="\/(mappedskills-logo-[a-z-]+\.webp)"/g, 'src="vendor/$1"').replace(/srcset="[^"]*"/g, '')
  .replace(/ aria-current="page"/g, '').replace(/ data-current=""/g, '');
const body = fs.readFileSync(path.join(D, 'src/body.html'), 'utf8');
const html = `<!doctype html>
<html lang="en" class="${c.htmlClass.replace(' px-js', '')}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>FAQ Mockup (G1 review)</title>
<link rel="stylesheet" href="vendor/live.css">
<link rel="stylesheet" href="src/fx.css">
<script>try{document.documentElement.classList.add('px-js')}catch(e){}</script>
</head>
<body class="${c.bodyClass}">
<div class="fx-banner" data-banner role="note">G1 review mockup. Proposed design and copy only, not the live page. “New” marks a question that is not on the live page.</div>
${fix(c.header)}
<main id="main"><div class="dc __variable_68b274 px px-b px-h">
<span aria-hidden="true" class="dc-font-prime dc-font-prime--hero"></span><span aria-hidden="true" class="dc-font-prime dc-font-prime--96"></span><span aria-hidden="true" class="dc-font-prime dc-font-prime--72"></span><span aria-hidden="true" class="dc-font-prime dc-font-prime--96b"></span>
${body}
</div></main>
${fix(c.footer)}
<script src="src/fx.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(D, 'index.html'), html);
console.log('wrote mockup/index.html', html.length, 'bytes');
