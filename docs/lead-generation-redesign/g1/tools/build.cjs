// G1 review artifact builder: assembles g1/mockup/index.html from the live C+ chrome (tools/live-chrome.json, captured
// from https://mappedskills.com/lead-generation on 17 Oct 2026) and the proposed body parts.  Run: node tools/build.cjs
const fs = require('fs'), path = require('path');
const D = path.join(__dirname, '..', 'mockup');
const c = require('./live-chrome.json');
const fix = (h) => h.replace(/src="\/(mappedskills-logo-[a-z-]+\.webp)"/g, 'src="vendor/$1"').replace(/srcset="[^"]*"/g, '');
const parts = fs.readdirSync(path.join(D, 'src/parts')).filter((f) => f.endsWith('.html')).sort();
const body = '<!-- G1 REVIEW ARTIFACT. Proposed /lead-generation body. Not production code. -->\n' + parts.map((p) => fs.readFileSync(path.join(D, 'src/parts', p), 'utf8')).join('\n');
fs.writeFileSync(path.join(D, 'src/body.html'), body);
const html = `<!doctype html>
<html lang="en" class="${c.htmlClass.replace(' px-js', '')}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Lead Generation Redesign Mockup (G1 review)</title>
<link rel="stylesheet" href="vendor/live.css">
<link rel="stylesheet" href="src/lx.css">
<script>try{document.documentElement.classList.add('px-js')}catch(e){}</script>
</head>
<body class="${c.bodyClass}">
<div class="lx-banner" data-banner role="note">G1 review mockup. Proposed design only, not the live page. Nothing here is approved.</div>
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
console.log('wrote', path.join(D, 'index.html'), html.length, 'parts:', parts.join(', '));
