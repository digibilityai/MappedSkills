// Browser test of /work search and filters for the final four, from page 1 and page 2, at 1440 and 390.
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '../../../../node_modules/playwright-core'));
const BASE = process.argv[2] || 'http://localhost:3500';
const CASES = [
  ['/work?q=wanderlooms', ['Wanderlooms']],
  ['/work?q=adventure', ['Wanderlooms']],
  ['/work?q=insuryo', ['InsurYo']],
  ['/work?q=insurance', ['InsurYo']],
  ['/work?q=classpe', ['ClassPe']],
  ['/work?q=ameba', ['Ameba Software']],
  ['/work?service=seo', ['Ameba Software', 'AnybodyCanBake']],
  ['/work?service=social-media-ads', ['Wanderlooms']],
  ['/work?industry=education', ['ClassPe']],
  ['/work?industry=software-technology', ['Ameba Software']],
  ['/work?industry=financial-services', ['InsurYo']],
  ['/work?industry=ecommerce-retail', ['Wanderlooms']],
  ['/work?service=social-media-ads&industry=ecommerce-retail', ['Wanderlooms', 'Klenzmo', 'Advit Prints']],
  ['/work?service=seo&industry=software-technology', ['Ameba Software']],
  ['/work?service=seo&industry=ecommerce-retail', []],
  ['/work/page/2?service=social-media-ads', ['Wanderlooms']],
  ['/work/page/2?q=wanderlooms', ['Wanderlooms']],
  ['/work/page/2?industry=education', ['ClassPe']],
  ['/work/page/2?q=ameba', ['Ameba Software']],
];
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  let fail = 0;
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    for (const [url, expect] of CASES) {
      const p = await ctx.newPage();
      await p.goto(BASE + url, { waitUntil: 'networkidle' });
      const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {});
      await p.waitForTimeout(1200);
      const titles = await p.evaluate(() => [...document.querySelectorAll('#library a[href^="/portfolio/"] , main article h3, main li h3')].map((e) => e.textContent.trim()).filter(Boolean));
      const text = await p.evaluate(() => document.body.innerText);
      const ok = expect.every((t) => text.includes(t)) && (expect.length || /no case stud|no match|nothing/i.test(text) || titles.length === 0);
      const path2 = new URL(p.url()).pathname + new URL(p.url()).search;
      if (!ok) fail++;
      console.log(`${w} ${ok ? 'PASS' : 'FAIL'} ${url} -> ${path2} | expect ${JSON.stringify(expect)}`);
      await p.close();
    }
    await ctx.close();
  }
  console.log('FAILS', fail);
  await b.close();
})();
