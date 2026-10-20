// G1 review artifact builder: assembles g1/mockup/index.html from the live C+ chrome (tools/live-chrome.json, captured
// from the live site on 17 Oct 2026 for the Lead Generation G1 package) and the proposed body (mockup/src/body.html).
// Run inside g1: node tools/build.cjs
const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '..', 'mockup');
const c = require('./live-chrome.json');
const fix = (h) => h
  .replace(/src="\/(mappedskills-logo-[a-z-]+\.webp)"/g, 'src="vendor/$1"').replace(/srcset="[^"]*"/g, '')
  .replace(/ aria-current="page"/g, '').replace(/ data-current=""/g, '')
  .replace(/<a href="\/how-it-works">How It Works<\/a>/, '<a aria-current="page" href="/how-it-works">How It Works</a>');
const body = fs.readFileSync(path.join(D, 'src/body.html'), 'utf8');
const html = `<!doctype html>
<html lang="en" class="${c.htmlClass.replace(' px-js', '')}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>How It Works Redesign Mockup (G1 review)</title>
<link rel="stylesheet" href="vendor/live.css">
<link rel="stylesheet" href="src/hx.css">
<script>try{document.documentElement.classList.add('px-js')}catch(e){}</script>
</head>
<body class="${c.bodyClass}">
<div class="hx-banner" data-banner role="note">G1 review mockup. Proposed design only, not the live page. Nothing here is approved.</div>
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
console.log('wrote mockup/index.html', html.length, 'bytes');
