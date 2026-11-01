// Builds the proposal mockups: actual content (read from the running port-3500 pages, saved in ./data) laid out in the proposed editorial
// system (./ed.css), injected into the REAL page so the real header and footer are visible. Proposal only: no application file is changed.
//   node docs/editorial-redesign/mockup/build.cjs [base url]
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const BASE = process.argv[2] || 'http://localhost:3500';
const D = (n) => JSON.parse(fs.readFileSync(path.join(__dirname, 'data', n + '.json'), 'utf8'));
const CSS = fs.readFileSync(path.join(__dirname, 'ed.css'), 'utf8');
const OUT = path.join(__dirname, 'shots'); const META = {};
fs.mkdirSync(OUT, { recursive: true });
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MAIL = 'info@mappedskills.com';

const crumb = (...c) => `<nav class="crumb" aria-label="Breadcrumb">${c.map(([t, h]) => (h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`)).join('')}</nav>`;
const hero = ({ c, tag, h1, long, lede, aside }) => `<section class="hero"><div class="w">${c}<div class="hero-g"><div class="hero-main"><p class="tag">${tag}</p><h1 class="${long ? 'long' : ''}">${h1}</h1><p class="lede">${esc(lede)}</p></div>${aside ? `<aside class="hero-aside">${aside}</aside>` : ''}</div></div></section>`;
const close = (h, body, a, b) => `<section class="close"><div class="w"><div class="close-g"><h2>${h}</h2><div class="cb"><p>${esc(body)}</p><a class="btn" href="#">${a}</a>${b ? `<a class="btn o" href="#">${b}</a>` : ''}</div></div></div></section>`;
const related = (title, items) => `<section class="related"><div class="w"><h2 class="aside-k" style="font-family:Manrope;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:#5C5665;font-weight:800">${title}</h2><div class="rel-g">${items.map(([k, t]) => `<a href="#"><span class="rk">${k}</span><span class="rt">${esc(t)}</span></a>`).join('')}</div></div></section>`;
const waffle = (on) => `<div class="waffle" role="img" aria-label="${on} of 120 squares highlighted">${Array.from({ length: 120 }, (_, i) => `<i${i < on ? ' class="on"' : ''}></i>`).join('')}</div>`;

// ---------------------------------------------------------------- PRESS
const pressList = () => {
  const title = 'MappedSkills Research Finds No Observable Google Analytics on 42.5% of 120 Indian Business Websites Audited';
  const ex = 'New study finds that 97.5% of audited websites preserved campaign tracking parameters, while advertising measurement technologies were less consistently observable.';
  const img = D('press-detail').imgs[0];
  return `<div class="ed">
  ${hero({ c: crumb(['Home', '/'], ['Press']), tag: 'Newsroom', h1: 'News from MappedSkills, <em>on the record.</em>', lede: 'Our press releases and announcements, newest first. Writing a story? Email us for comment or background.',
    aside: `<p class="aside-k">Media contact</p><dl class="facts"><dt>Email</dt><dd><a href="mailto:${MAIL}">${MAIL}</a></dd><dt>Based in</dt><dd>Pune, India</dd></dl>` })}
  <section class="sec paper"><div class="w"><div class="sec-h"><h2>Press releases</h2><span class="n">1 release, newest first</span></div>
    <ul class="rows"><li><a class="row" href="#"><div class="row-m"><b>Press release</b><span>October 23, 2026</span></div><div><h3>${esc(title)}</h3><p>${esc(ex)}</p><img class="row-img" src="${img.s}" alt="${esc(img.a)}"></div><span class="go" aria-hidden="true">→</span></a></li></ul></div></section>
  <section class="sec"><div class="w"><div class="sec-h"><h2>Background for your story</h2></div>
    <ul class="rows"><li><a class="row" href="#"><div class="row-m"><b>Research</b></div><div><h3>MappedSkills Research</h3><p>What we checked, how many, when, and where the evidence stops.</p></div><span class="go" aria-hidden="true">→</span></a></li>
    <li><a class="row" href="#"><div class="row-m"><b>Company</b></div><div><h3>About MappedSkills</h3><p>What we do, how we work and what we promise our clients.</p></div><span class="go" aria-hidden="true">→</span></a></li></ul></div></section>
  ${close('Working on a story? <br>Talk to us.', 'Email us for comment or background. Tell us your publication and your deadline.', 'Email a media enquiry', 'Use the contact form')}
  </div>`;
};

const pressDetail = () => {
  const bl = D('press-detail').blocks; const find = (s) => bl.find((b) => b.x.startsWith(s)).x; const img = D('press-detail').imgs[0];
  const title = bl.find((b) => b.t === 'h1').x;
  const rel = ['PUNE, INDIA —', ...bl.filter((b) => b.t === 'p' && /^(PUNE|The research found|At the same time|The findings highlight)/.test(b.x)).map((b) => b.x)];
  const dl = rel[1].replace(/^PUNE, INDIA — /, '');
  return `<div class="ed">
  <section class="hero"><div class="w">${crumb(['Home', '/'], ['Press', '/press'], ['Press release'])}<div class="hero-g"><div class="hero-main"><p class="tag">Press release · MappedSkills Research</p><h1 class="long">${esc(title)}</h1><p class="lede">${esc(bl.find((b) => b.t === 'p' && b.x.startsWith('New study finds')).x)}</p>
    <div class="meta-strip"><span><b>Published</b> October 23, 2026</span><span><b>Research ID</b> MSR-001</span><span><b>Media</b> <a href="mailto:${MAIL}">${MAIL}</a></span></div></div>
    <aside class="hero-aside" style="border-top:0;padding-top:0"><img src="${img.s}" alt="${esc(img.a)}" style="width:100%;height:auto;display:block;border:1px solid #D9D2C5;background:#fff"></aside></div></div></section>
  <section class="w"><div class="shell"><aside class="rail"><h2>In this release</h2><ol><li><a href="#">The release</a></li><li><a href="#">Other findings</a></li><li><a href="#">Why this matters</a></li><li><a href="#">A note from the founder</a></li><li><a href="#">About the research</a></li><li><a href="#">About MappedSkills</a></li></ol></aside>
    <div class="col"><h2 id="r">The release</h2>
      <p class="dateline">${esc(rel[0])}</p><p>${esc(dl)}</p><p>${esc(rel[2])}</p>
      <div class="figs" role="list" aria-label="The evidence in brief"><div role="listitem"><div class="v">42.5%</div><p class="c">No observable Google Analytics</p><p class="s">51 of 120 websites. n=120 Indian business websites · MSR-001 Audit Protocol v1.1</p></div><div role="listitem"><div class="v">97.5%</div><p class="c">Preserved the test UTM parameters</p><p class="s">117 of 120 websites. Harmless predefined UTM parameters.</p></div><div role="listitem"><div class="v">120</div><p class="c">Indian business websites audited</p><p class="s">30 each from Manufacturing, Jewellery, Fashion and Technology, 2025–2026.</p></div></div>
      <p>${esc(rel[3])}</p><p>${esc(rel[4])}</p>
      <h2>Other findings</h2>
      <dl class="facts" style="grid-template-columns:minmax(0,12rem) 1fr;margin-top:16px;font-size:1.0625rem;border-top:3px solid #141219;padding-top:14px"><dt>Google Analytics</dt><dd>Observable on 55.8% of audited websites.</dd><dt>Meta Pixel</dt><dd>Observable on 35.8%.</dd><dt>Google Ads-related measurement</dt><dd>Observable on 27.5%.</dd><dt>Sector differences</dt><dd>Meta Pixel was observable on 66.7% of Fashion websites and 60% of Jewellery websites, compared with 10% of Technology websites and 6.7% of Manufacturing websites.</dd></dl>
      <p class="rule-note" style="font-size:.9375rem">These findings describe the websites included in the study. They are not estimates for all Indian businesses.</p>
      <h2>Why this matters for businesses</h2><p>${esc(bl.find((b) => b.x.startsWith('Companies invest')).x)}</p><p>${esc(bl.find((b) => b.x.startsWith('But generating website traffic')).x)}</p>
      <blockquote class="pull">${esc(bl.find((b) => b.x.startsWith('Businesses often focus')).x.split(/(?<=\.)\s+/).slice(0, 2).join(' '))}<small>Amit Gupta, Founder, MappedSkills Marketing</small></blockquote>
      <div class="box"><span class="aside-k">About the research</span><p>${esc(bl.find((b) => b.x.startsWith('MappedSkills Research examined 120 purposively')).x)}</p><p><a class="btn o" href="#">Read the full research report →</a></p></div>
      <div class="byline"><span><b>About MappedSkills.</b> ${esc(bl.find((b) => b.x.startsWith('MappedSkills Marketing helps businesses')).x)}</span></div>
    </div></div></section>
  ${related('Related', [['Research report · October 5, 2026', 'The Marketing Measurement Gap: What 120 Indian Business Websites Reveal About Analytics and Advertising Measurement'], ['Newsroom', 'All press releases'], ['Media', 'Email a media enquiry']])}
  ${close('Working on a story? <br>Talk to us.', 'Email us for comment or background. Tell us your publication and your deadline.', 'Email a media enquiry', 'Use the contact form')}
  </div>`;
};

// ---------------------------------------------------------------- BLOG
const blogItems = () => D('blog').blocks.filter((b) => b.t === 'li').map((b) => b.x).map((x) => { const m = x.match(/^(.*?) · (\d+ min read)(.*)$/); return { topic: m[1], read: m[2], rest: m[3] }; });
const BL = [
  ['Content Marketing', '6 min read', 'Content Marketing Services in Pune | Boost Your Business Now', 'content-marketing-services-in-pune'],
  ['Email Marketing', '3 min read', 'Building an Email List: A Comprehensive Guide', 'building-an-email-list'],
  ['Brand Strategy', '5 min read', 'The Importance of Content Writing: A Guide for Business Owners and Marketing Managers', 'importance-of-content-writing'],
  ['Insights', '4 min read', 'Performance Marketing vs. Digital Marketing: Which is Right for Your Business?', 'performance-marketing-vs-digital-marketing'],
  ['Real Estate', '13 min read', '7 Proven Strategies of Digital Marketing for Real Estate Developers', '7-proven-strategies-of-digital-marketing-for-real-estate-developers'],
  ['Content Marketing', '9 min read', 'Best SEO Company in Pune for Businesses That Want Qualified Leads, Not Just Rankings', 'seo-company-in-pune'],
  ['PPC', '8 min read', 'Facebook Advertising Agency in Pune for Facebook & Instagram Ads That Drive Qualified Leads', 'facebook-advertising-agency-pune'],
];
const blogList = () => {
  const items = blogItems();
  const rows = BL.map(([t, r, title], i) => { const ex = items[i].rest.slice(title.length).trim().replace(/Read$/, '').trim(); return `<li><a class="row" href="#"><div class="row-m"><b>${esc(t)}</b><span>${r}</span></div><div><h3>${esc(title)}</h3><p>${esc(ex)}</p></div><span class="go" aria-hidden="true">→</span></a></li>`; }).join('');
  return `<div class="ed">
  ${hero({ c: crumb(['Home', '/'], ['Blog']), tag: 'Blog', h1: 'Marketing guides, <em>written plainly.</em>', lede: 'Practical reads on search, ads, content and turning website visits into enquiries — for business owners deciding what to do next.',
    aside: `<p class="aside-k">In the blog</p><dl class="facts"><dt>Articles</dt><dd>7</dd><dt>Topics</dt><dd>6</dd><dt>Reading time</dt><dd>3 to 13 minutes</dd></dl>` })}
  <section class="sec paper"><div class="w"><div class="sec-h"><h2>7 articles</h2></div><ul class="rows">${rows}</ul></div></section>
  ${close('Reading about <br>a problem you have?', 'Tell us what’s happening with your marketing. If we’re not the right fit, we’ll say so.', 'Tell us about your business', 'Request a call')}
  </div>`;
};
const blogDetail = () => {
  const bl = D('blog-detail').blocks; const P = (s) => bl.find((b) => b.x.startsWith(s)).x;
  const toc = ['What is Performance Marketing in Digital Marketing?', 'How Performance Marketing Works', 'Conclusion'];
  return `<div class="ed">
  <section class="hero"><div class="w">${crumb(['Home', '/'], ['Blog', '/blog'], ['Performance Marketing vs. Digital Marketing'])}<div class="hero-g"><div class="hero-main"><p class="tag">Article · Insights</p><h1 class="long">Performance Marketing vs. Digital Marketing: Which is Right for Your Business?</h1><p class="lede">${esc(P('Performance Marketing vs. Digital Marketing, their pros'))}</p>
    <div class="meta-strip"><span><b>By</b> Amit Gupta</span><span><b>Updated</b> October 20, 2026</span><span><b>Reading time</b> 4 min</span></div></div></div></div></section>
  <section class="w"><div class="shell"><aside class="rail"><h2>In this article</h2><details open><summary style="display:none"></summary><ol>${toc.map((t) => `<li><a href="#">${esc(t)}</a></li>`).join('')}</ol></details></aside>
    <div class="col"><p style="margin-top:0">${esc(P('Have you ever wondered'))}</p><p>${esc(P('In today'))}</p><p>${esc(P('This blog will help'))}</p>
      <h2>${esc(toc[0])}</h2><p>${esc(P('Performance marketing is a data-driven'))}</p><p>${esc(P('Often, performance-based'))}</p>
      <h3>What is Digital Marketing?</h3><p>${esc(P('Digital marketing is a broader term'))}</p>
      <p class="rule-note" style="font-size:.9375rem">The rest of the article is unchanged: headings, lists, links and wording come from the CMS as they are today.</p>
      <div class="byline"><span><b>Written by Amit Gupta</b>, Founder, MappedSkills Marketing. Updated October 20, 2026.</span><span class="share"><a href="#">LinkedIn</a><a href="#">X</a><a href="#">Copy link</a></span></div>
    </div></div></section>
  ${related('Keep reading', [['Content Marketing · 6 min read', 'Content Marketing Services in Pune | Boost Your Business Now'], ['Brand Strategy · 5 min read', 'The Importance of Content Writing: A Guide for Business Owners and Marketing Managers'], ['All articles', 'Back to the blog']])}
  ${close('Reading about <br>a problem you have?', 'Tell us what’s happening with your marketing. If we’re not the right fit, we’ll say so.', 'Tell us about your business', 'Request a call')}
  </div>`;
};

// ---------------------------------------------------------------- RESEARCH
const RTITLE = 'The Marketing Measurement Gap: What 120 Indian Business Websites Reveal About Analytics and Advertising Measurement';
const RDEK = 'Among the 120 Indian business websites audited, more than 4 in 10 had no observable Google Analytics, yet 97.5% preserved the UTM parameters used in testing.';
const rd = D('research').blocks; const rb = (i) => rd[i].x;
const FIND = [[18, 19, 20, 21], [23, 24, 25, 26], [28, 29, 30, 31], [33, 34, 35, 36]].map(([v, t, d, s]) => ({ v: rb(v), t: rb(t), d: rb(d), s: rb(s).replace(/^Sample /, '').replace(' Source ', ' · ') }));
const researchList = () => `<div class="ed">
  ${hero({ c: crumb(['Home', '/'], ['Research']), tag: 'Research', h1: 'We look at real business websites. <em>Then we publish what we find.</em>', lede: rb(1),
    aside: `<p class="aside-k">Latest report</p><dl class="facts"><dt>Title</dt><dd>The Marketing Measurement Gap</dd><dt>Published</dt><dd>October 5, 2026</dd></dl><p class="jump"><a href="#latest-report">Read the report ↓</a></p>` })}
  <section class="stage" id="latest-report"><div class="w"><div class="stage-g"><div class="stage-l"><p class="k"><b></b>Latest report · MSR-001</p><h2>${esc(RTITLE)}</h2><p class="dek">${esc(RDEK)}</p>
    <dl class="facts"><dt>Author</dt><dd>Amit Gupta</dd><dt>Published</dt><dd>October 5, 2026</dd><dt>Research period</dt><dd>2025–2026</dd><dt>Geography</dt><dd>India</dd><dt>Sample size</dt><dd>120 websites</dd><dt>Category</dt><dd>Industry Benchmarks</dd></dl>
    <p style="margin-top:26px;display:flex;gap:12px;flex-wrap:wrap"><a class="btn lt" href="/research/marketing-measurement-gap-indian-business-websites">Read the full report →</a><a class="btn o" style="color:#F7F3EC;border-color:#F7F3EC" href="/research/marketing-measurement-gap-indian-business-websites#rr-h-method">How the audit was done</a><a class="btn o" style="color:#F7F3EC;border-color:#F7F3EC" href="/research/marketing-measurement-gap-indian-business-websites#rr-h-limits">What the study can’t tell you</a></p></div>
    <div class="stage-r"><p class="k"><b></b>The headline finding</p><div class="disp" style="font-size:clamp(4rem,9vw,7rem);line-height:.9;color:#FF5B04;margin-top:14px">42.5%</div><p class="disp" style="font-size:1.5rem;line-height:1.15;margin-top:10px;font-weight:700">${esc(rb(5))}</p>${waffle(51)}<p class="waffle-c">${esc(rb(8))}</p></div></div>
    <div class="stage-g" style="margin-top:36px;padding-top:28px;border-top:1px solid #3a3544"><div class="stage-l"><p style="color:#d9d2c5;max-width:60ch">${esc(rb(9))}</p><p class="waffle-c" style="margin-top:12px">${esc(rb(14))}</p></div><div class="stage-r" style="display:grid;gap:16px"><div><p class="k">${esc(rb(10))}</p><p style="margin-top:6px">${esc(rb(11))}</p></div><div><p class="k">${esc(rb(12))}</p><p style="margin-top:6px">${esc(rb(13))}</p></div></div></div></div></section>
  <section class="sec paper"><div class="w"><div class="sec-h"><h2>${esc(rb(16))}</h2><span class="n">From the same study</span></div>
    <div class="figs f4">${FIND.map((f) => `<div><div class="v">${esc(f.v)}</div><p class="c">${esc(f.t)}</p><p class="s">${esc(f.s)}</p></div>`).join('')}</div></div></section>
  <section class="sec"><div class="w"><div class="sec-h"><h2>${esc(rb(54))}</h2></div><ul class="figs f3"><li><p class="c" style="font-weight:800">${esc(rb(56))}</p><p class="s" style="font-size:1rem;color:#26222c">${esc(rb(57))}</p></li><li><p class="c" style="font-weight:800">${esc(rb(59))}</p><p class="s" style="font-size:1rem;color:#26222c">${esc(rb(60))}</p></li><li><p class="c" style="font-weight:800">${esc(rb(62))}</p><p class="s" style="font-size:1rem;color:#26222c">${esc(rb(63))}</p></li></ul>
    <p class="rule-note">${esc(rb(65)).replace(MAIL, `<a href="mailto:${MAIL}">${MAIL}</a>`)} <a href="/press">Visit the newsroom →</a></p></div></section>
  ${close('Not sure what your marketing is actually measuring?', rb(67), 'Tell us about your business', 'Request a call')}
  </div>`;
const researchDetail = () => {
  const bl = D('research-detail').blocks; const at = (i) => bl[i].x;
  const finds = [['42.5%', 'More than 4 in 10 audited websites had no observable Google Analytics.', 'n=120 · MSR-001'], ['35.8%', 'Meta Pixel was observable on just over one-third of audited websites.', 'n=120'], ['27.5%', 'Google Ads-related measurement was observable on fewer than 3 in 10 websites.', 'n=120'], ['97.5%', 'Almost all audited websites preserved the UTM parameters used during testing.', 'n=120'], ['66.7% vs 6.7%', 'Observable Meta Pixel presence varied sharply across sectors.', 'n=30 per sector']];
  const toc = ['Executive summary', 'Why we conducted this research', 'Finding 1: No observable Google Analytics', 'Finding 2: Advertising measurement', 'Finding 3: UTM parameters', 'Finding 4: Sector differences', 'Finding 5: Technology sector', 'What about conversion measurement?', 'What founders should ask', 'A note from Amit Gupta', 'How the audit was done', 'What this study can’t tell you', 'How to reference this report'];
  return `<div class="ed">
  <section class="hero"><div class="w">${crumb(['Home', '/'], ['Research', '/research'], ['Industry Benchmarks'], ['The Marketing Measurement Gap'])}<div class="hero-g"><div class="hero-main"><p class="tag">Research report · Industry Benchmarks</p><h1 class="long" style="max-width:26ch">${esc(RTITLE)}</h1><p class="lede">${esc(RDEK)}</p></div>
    <aside class="hero-aside"><dl class="facts"><dt>Author</dt><dd>Amit Gupta</dd><dt>Published</dt><dd>October 5, 2026</dd><dt>Research period</dt><dd>2025–2026</dd><dt>Geography</dt><dd>India</dd><dt>Sample size</dt><dd>120</dd><dt>Research ID</dt><dd>MSR-001</dd></dl><p class="jump"><a href="#">Key findings ↓</a><a href="#">Methodology ↓</a><a href="#">Limitations ↓</a><a href="#">Cite this report ↓</a></p></aside></div></div></section>
  <section class="w"><div class="shell"><aside class="rail"><h2>In this report</h2><details open><summary style="display:none"></summary><ol>${toc.map((t) => `<li><a href="#">${esc(t)}</a></li>`).join('')}</ol></details></aside>
    <div class="col wide"><h2>Key findings</h2>
      <ol class="find" style="margin-top:14px;border-top:3px solid #141219">${finds.map(([v, t, s], i) => `<li class="fr"><span class="disp" style="font-size:2.2rem;line-height:1;font-weight:800;letter-spacing:-.03em">${v}</span><span style="font-weight:700;font-size:1.0625rem;line-height:1.3">${esc(t)}<br><a href="#" style="font-size:.8125rem;color:#A83400;font-weight:700">Finding ${i + 1} ↓</a></span><span style="font-size:.8125rem;color:#5C5665">${s}</span></li>`).join('')}</ol>
      <p class="rule-note">Each figure appears once here as an index and once, with its full wording, sample and source, in its own finding below. No finding is restated in a second summary.</p>
      <h2>${at(43)}</h2><div class="box" style="margin-top:20px"><p style="margin:0">${esc(at(44))}</p></div>
      <h2>${esc(at(54))}</h2><p style="max-width:700px">${esc(at(58 + 6))}</p><p style="max-width:700px">${esc(at(60 + 6))}</p>
      <h2>Finding 1: More than 4 in 10 audited websites had no observable Google Analytics</h2><p style="max-width:700px">${esc(at(69))}</p><p style="max-width:700px">${esc(at(70))}</p>
      <p class="rule-note" style="font-size:.9375rem">The remaining findings, charts and tables, the method, the limitations and the founder’s note continue as they are today; only their order and the removal of repeated summaries change.</p>
      <h2>What this study can’t tell you</h2><p style="max-width:700px">${esc(at(215))}</p><p style="max-width:700px">${esc(at(216))}</p>
      <div class="box"><span class="aside-k">How to reference this report</span><p>Amit Gupta. ${esc(RTITLE)}. MappedSkills Research, October 5, 2026. https://mappedskills.com/research/marketing-measurement-gap-indian-business-websites</p><p><a class="btn o" href="#">Copy citation</a> <a class="btn o" href="#">Copy link</a></p></div>
    </div></div></section>
  ${related('Related', [['Press release · October 23, 2026', 'MappedSkills Research Finds No Observable Google Analytics on 42.5% of 120 Indian Business Websites Audited'], ['Research', 'All research'], ['Media', 'Reporting on this? Visit the newsroom']])}
  ${close('Not sure what your marketing is actually measuring?', 'We can help you understand what’s visible, what’s missing and what to look at next.', 'Tell us about your business', 'Request a call')}
  </div>`;
};

// ---------------------------------------------------------------- WORK
const cards = (n) => D('work-' + n).cards.map((c) => { const L = (c.block || '').split('\n').map((s) => s.trim()).filter(Boolean); return { h: c.h, img: c.img, ey: L[0], t: L[1], sm: L[2], alt: c.alt }; });
const CARD = (c) => `<a class="card" href="#"><div class="im"><img src="${c.img}" alt="${esc(c.alt || c.t)}"></div><div class="tx"><span class="ey">${esc((c.ey || '').replace(/^(.*?)( · )/, (m, a, b) => a + b))}</span><h3>${esc(c.t)}</h3><p class="sm">${esc(c.sm)}</p><span class="go">Read case study →</span></div></a>`;
const workHead = (sel) => `<section class="hero wk-hero"><div class="w">${crumb(['Home', '/'], ['Case studies'])}<div class="hero-g"><div class="hero-main"><p class="tag">Case studies</p><h1>Real work. <em>Judge it for yourself.</em></h1><p class="lede">Explore the challenges businesses brought to us, what we changed, and how we approached the work.</p></div></div>
  <form class="ctl" role="search" aria-label="Filter case studies" style="margin-top:28px"><div class="fld q"><label>Search</label><div class="in${sel.q ? ' on' : ''}">${sel.q ? esc(sel.q) : '<span class="ph">Client, industry or problem</span>'}</div></div><div class="fld"><label>Service</label><div class="in${sel.service ? ' on' : ''}">${esc(sel.service || 'All services')}<span class="chev">▾</span></div></div><div class="fld"><label>Industry</label><div class="in${sel.ind ? ' on' : ''}">${esc(sel.ind || 'All industries')}<span class="chev">▾</span></div></div>${sel.service || sel.q || sel.ind ? '<a class="clr" href="#">Clear filters</a>' : '<span></span>'}</form>
  <div class="count"><span>${sel.count}</span><span>${sel.page || ''}</span></div></div></section>`;
const pager = (p, off) => `<nav class="pager" aria-label="Pages"><a class="pv ${p === 1 ? 'off' : ''}" href="#">← Previous</a><span class="pg"><a class="${p === 1 ? 'cur' : ''}" href="#">1</a><a class="${p === 2 ? 'cur' : ''}" href="#">2</a></span><span class="mid">Page ${p} of 2</span><a class="pv ${p === 2 ? 'off' : ''}" href="#">Next →</a></nav>`;
const workP1 = () => { const c = cards(1); return `<div class="ed">${workHead({ count: '<b>20</b> case studies', page: 'Showing 1–12' })}<section class="w"><div class="grid">${c.map(CARD).join('')}</div>${pager(1)}</section>${close('Tell us what you’re <br>trying to fix.', 'Tell us what you’re working towards. We’ll help you figure out where to start.', 'Contact us', 'Request a call')}</div>`; };
const workP2 = () => { const c = cards(2); return `<div class="ed">${workHead({ count: '<b>20</b> case studies', page: 'Showing 13–20' })}<section class="w"><div class="grid">${c.map(CARD).join('')}</div>${pager(2)}</section>${close('Tell us what you’re <br>trying to fix.', 'Tell us what you’re working towards. We’ll help you figure out where to start.', 'Contact us', 'Request a call')}</div>`; };
const workFiltered = () => { const c = cards(1).concat(cards(2)).filter((x) => /^SEO/i.test(x.ey || '')); return `<div class="ed">${workHead({ service: 'SEO', count: `<b>${c.length}</b> of 20 case studies match SEO`, page: '' })}<section class="w"><div class="grid">${c.map(CARD).join('')}</div></section>${close('Tell us what you’re <br>trying to fix.', 'Tell us what you’re working towards. We’ll help you figure out where to start.', 'Contact us', 'Request a call')}</div>`; };
const workEmpty = () => `<div class="ed">${workHead({ q: 'zzzzqq', count: '<b>0</b> of 20 case studies match', page: '' })}<section class="w"><div class="empty" role="status"><h3>No case studies match your search.</h3><p>Try fewer words, or clear the filters to see every case study.</p><div class="acts"><a class="btn" href="#">Show all 20 case studies</a></div></div></section>${close('Tell us what you’re <br>trying to fix.', 'Tell us what you’re working towards. We’ll help you figure out where to start.', 'Contact us', 'Request a call')}</div>`;


// ---------------------------------------------------------------- FULL-LENGTH DETAIL PAGES (every real paragraph, list, chart and heading; existing anchors kept)
const BODY = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'bodies.json'), 'utf8'));
const strip = (t) => t.replace(/<[^>]+>/g, '');
const idsOf = (html) => [...html.matchAll(/<h2[^>]*?(?: id="([^"]*)")?[^>]*>(.*?)<\/h2>/g)].map((m) => ({ id: m[1], t: strip(m[2]) }));
/** Desktop: a static list in the left rail. Mobile: one collapsed "On this page" control (a native details element, so it works without script). */
const railOf = (items, open) => `<aside class="rail"><h2 class="rail-h">On this page</h2><ol class="rail-d">${items.map((i) => `<li><a href="#${i.id}">${esc(i.t)}</a></li>`).join('')}</ol>
  <details class="rail-m"${open ? ' open' : ''}><summary><span>On this page</span><span class="rail-n">${items.length} sections</span></summary><ol>${items.map((i) => `<li><a href="#${i.id}">${esc(i.t)}</a></li>`).join('')}</ol></details></aside>`;
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const pressDetailFull = (open) => {
  const bl = D('press-detail').blocks; const img = D('press-detail').imgs[0];
  const title = bl.find((b) => b.t === 'h1').x;
  const rel = bl.filter((b) => b.t === 'p' && /^(PUNE|The research found|At the same time|The findings highlight)/.test(b.x)).map((b) => b.x);
  const dl = rel[0].replace(/^PUNE, INDIA — /, '');
  const [, why, quote, about, , boiler, media] = BODY.press;
  const first = `<h2 id="the-release">The release</h2><p class="dateline">PUNE, INDIA —</p><p>${esc(dl)}</p><p>${esc(rel[1])}</p>
    <h2 id="key-findings">Key findings</h2><div class="figs" role="list"><div role="listitem"><div class="v">42.5%</div><p class="c">No observable Google Analytics</p><p class="s">51 of 120 websites. n=120 Indian business websites · MSR-001 Audit Protocol v1.1</p></div><div role="listitem"><div class="v">97.5%</div><p class="c">Preserved the test UTM parameters</p><p class="s">117 of 120 websites. Harmless predefined UTM parameters.</p></div><div role="listitem"><div class="v">120</div><p class="c">Indian business websites audited</p><p class="s">30 each from Manufacturing, Jewellery, Fashion and Technology, 2025–2026.</p></div></div>
    <p>${esc(rel[2])}</p><p>${esc(rel[3])}</p>
    <dl class="facts" style="grid-template-columns:minmax(0,12rem) 1fr;margin-top:22px;font-size:1.0625rem;border-top:3px solid #141219;padding-top:14px"><dt>Google Analytics</dt><dd>Observable on 55.8% of audited websites.</dd><dt>Meta Pixel</dt><dd>Observable on 35.8%.</dd><dt>Google Ads-related measurement</dt><dd>Observable on 27.5%.</dd><dt>Sector differences</dt><dd>Meta Pixel was observable on 66.7% of Fashion websites and 60% of Jewellery websites, compared with 10% of Technology websites and 6.7% of Manufacturing websites.</dd></dl>
    <p class="pub-note">These findings describe the websites included in the study. They are not estimates for all Indian businesses.</p>`;
  const rest = [why, quote, about, boiler, media].join('');
  const html = first + rest;
  return `<div class="ed">
  <section class="hero"><div class="w">${crumb(['Home', '/'], ['Press', '/press'], ['Press release'])}<div class="hero-g"><div class="hero-main"><p class="tag">Press release · MappedSkills Research</p><h1 class="long">${esc(title)}</h1><p class="lede">${esc(bl.find((b) => b.t === 'p' && b.x.startsWith('New study finds')).x)}</p>
    <div class="meta-strip"><span><b>Published</b> October 23, 2026</span><span><b>Research ID</b> MSR-001</span><span><b>Media</b> <a href="mailto:${MAIL}">${MAIL}</a></span></div></div>
    <aside class="hero-aside" style="border-top:0;padding-top:0"><img src="${img.s}" alt="${esc(img.a)}" style="width:100%;height:auto;display:block;border:1px solid #D9D2C5;background:#fff"></aside></div></div></section>
  <section class="w"><div class="shell">${railOf(idsOf(html), open)}<div class="col rich">${html}</div></div></section>
  ${related('Related', [['Research report · October 5, 2026', RTITLE], ['Newsroom', 'All press releases'], ['Media', 'Email a media enquiry']])}
  ${close('Working on a story? <br>Talk to us.', 'Email us for comment or background. Tell us your publication and your deadline.', 'Email a media enquiry', 'Use the contact form')}
  </div>`;
};
const blogDetailFull = (open) => {
  const bl = D('blog-detail').blocks; const P = (s) => bl.find((b) => b.x.startsWith(s)).x;
  const body = BODY.blog[0];
  return `<div class="ed">
  <section class="hero"><div class="w">${crumb(['Home', '/'], ['Blog', '/blog'], ['Performance Marketing vs. Digital Marketing'])}<div class="hero-g"><div class="hero-main"><p class="tag">Article · Insights</p><h1 class="long">Performance Marketing vs. Digital Marketing: Which is Right for Your Business?</h1><p class="lede">${esc(P('Performance Marketing vs. Digital Marketing, their pros'))}</p>
    <div class="meta-strip"><span><b>By</b> Amit Gupta</span><span><b>Updated</b> October 20, 2026</span><span><b>Reading time</b> 4 min</span></div></div></div></div></section>
  <section class="w"><div class="shell">${railOf(idsOf(body), open)}<div class="col rich">${body}
    <div class="byline"><span><b>Related service:</b> <a href="/google-ads">Google Ads</a> · <a href="/social-media-ads">Social Media Ads</a></span><span class="share"><a href="#">LinkedIn</a><a href="#">Facebook</a><a href="#">Copy link</a></span></div>
  </div></div></section>
  ${related('Keep reading', [['Content Marketing · 6 min read', 'Content Marketing Services in Pune | Boost Your Business Now'], ['Brand Strategy · 5 min read', 'The Importance of Content Writing: A Guide for Business Owners and Marketing Managers'], ['All articles', 'Back to the blog']])}
  ${close('Reading about <br>a problem you have?', 'Tell us what’s happening with your marketing. If we’re not the right fit, we’ll say so.', 'Tell us about your business', 'Request a call')}
  </div>`;
};
const researchDetailFull = (open) => {
  const rdb = D('research').blocks; const r = (i) => rdb[i].x;
  const finds = [['42.5%', r(5), r(14)], ...[[18, 19, 21], [23, 24, 26], [28, 29, 31], [33, 34, 36]].map(([v, t, s]) => [r(v), r(t), r(s).replace(/^Sample /, '').replace(' Source ', ' · ')])];
  const sections = BODY.research.map((h, i) => (i === 0 ? h.replace('<p>The full report</p>', '') : h.replace(/<p>(Methodology|Limitations)<\/p>/, '')));
  const body = sections.join('');
  const all = idsOf(body);
  const items = [{ id: 'rr-h-more', t: 'What the research found.' }, ...all, { id: 'rr-h-cite', t: 'How to reference this report.' }];
  const find = (needle) => items.find((i) => i.t.includes(needle)).id;
  const findIds = ['body-2', 'body-3', 'body-3', 'body-4', 'body-5']; const findNo = [1, 2, 2, 3, 4];
  return `<div class="ed">
  <section class="hero"><div class="w">${crumb(['Home', '/'], ['Research', '/research'], ['Industry Benchmarks'], ['The Marketing Measurement Gap'])}<div class="hero-g"><div class="hero-main"><p class="tag">Research report · Industry Benchmarks</p><h1 class="long" style="max-width:26ch">${esc(RTITLE)}</h1><p class="lede">${esc(RDEK)}</p></div>
    <aside class="hero-aside"><dl class="facts"><dt>Author</dt><dd>Amit Gupta</dd><dt>Published</dt><dd>October 5, 2026</dd><dt>Research period</dt><dd>2025–2026</dd><dt>Geography</dt><dd>India</dd><dt>Sample size</dt><dd>120</dd><dt>Research ID</dt><dd>MSR-001</dd></dl><p class="jump"><a href="#rr-h-more">Key findings ↓</a><a href="#${find('How the audit')}">Methodology ↓</a><a href="#${find('tell you')}">Limitations ↓</a><a href="#rr-h-cite">Cite this report ↓</a></p></aside></div></div></section>
  <section class="w"><div class="shell">${railOf(items, open)}
    <div class="col wide rich"><h2 id="rr-h-more">What the research found.</h2>
      <ol class="find" style="margin-top:14px;border-top:3px solid #141219">${finds.map(([v, t, s], i) => `<li class="fr"><span class="disp" style="font-size:2.2rem;line-height:1;font-weight:800;letter-spacing:-.03em">${esc(v)}</span><span style="font-weight:700;font-size:1.0625rem;line-height:1.3">${esc(t)}<span class="fr-s">${esc(s)}</span><a href="#${findIds[i]}" style="display:inline-block;margin-top:6px;font-size:.875rem;color:#A83400;font-weight:700">Read finding ${findNo[i]} ↓</a></span></li>`).join('')}</ol>
      ${body}
      <h2 id="rr-h-cite">How to reference this report.</h2><div class="box"><span class="aside-k">Cite this report</span><p>Amit Gupta. ${esc(RTITLE)}. MappedSkills Research, October 5, 2026. https://mappedskills.com/research/marketing-measurement-gap-indian-business-websites</p><p><a class="btn o" href="#rr-h-cite">Copy citation</a> <a class="btn o" href="#rr-h-cite">Copy link</a></p></div>
      <p class="pub-note">For media enquiries, embargoed materials, or comment, email <a href="mailto:${MAIL}">${MAIL}</a> or use the contact form. <a href="/press">Visit the newsroom →</a></p>
    </div></div></section>
  ${related('Related', [['Press release · October 23, 2026', 'MappedSkills Research Finds No Observable Google Analytics on 42.5% of 120 Indian Business Websites Audited'], ['Research', 'All research'], ['Media', 'Reporting on this? Visit the newsroom']])}
  ${close('Not sure what your marketing is actually measuring?', 'We can help you understand what’s visible, what’s missing and what to look at next.', 'Tell us about your business', 'Request a call')}
  </div>`;
};

const PAGES = [
  ['press-listing', '/press', pressList], ['press-detail', '/press/marketing-measurement-gap-indian-websites', () => pressDetailFull(false)],
  ['blog-listing', '/blog', blogList], ['blog-detail', '/blog/performance-marketing-vs-digital-marketing', () => blogDetailFull(false)],
  ['research-listing', '/research', researchList], ['research-detail', '/research/marketing-measurement-gap-indian-business-websites', () => researchDetailFull(false)],
  ['research-detail-nav-open', '/research/marketing-measurement-gap-indian-business-websites', () => researchDetailFull(true)],
  ['work-page-1', '/work', workP1], ['work-filtered-seo', '/work', workFiltered], ['work-page-2', '/work/page/2', workP2], ['work-empty-search', '/work', workEmpty],
];
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const rows = [];
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: tag === 'mobile' ? 2 : 1 });
    for (const [name, url, fn] of PAGES) {
      const html = fn();
      fs.writeFileSync(path.join(__dirname, 'pages-' + name + '.html'), `<!doctype html><meta charset="utf-8"><title>${name}</title><style>${CSS}</style>${html}`);
      const p = await ctx.newPage();
      await p.goto(BASE + url, { waitUntil: 'networkidle' });
      const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {});
      await p.evaluate(({ css, html }) => { const st = document.createElement('style'); st.textContent = css + 'nextjs-portal{display:none!important}'; document.head.appendChild(st); const m = document.querySelector('main'); m.innerHTML = html; }, { css: CSS, html });
      await p.waitForTimeout(700);
      const m = await p.evaluate(() => ({ rail: Math.round((document.querySelector('.rail-m') ? document.querySelector('.rail-m').getBoundingClientRect().top + scrollY : 0)), h: document.documentElement.scrollHeight, ox: document.documentElement.scrollWidth > innerWidth, imgs: [...document.querySelectorAll('.ed img')].filter((i) => !(i.complete && i.naturalWidth > 0)).length, off: [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed').slice(0, 3).map((e) => e.tagName + '.' + String(e.className).slice(0, 30) + ' ' + Math.round(e.getBoundingClientRect().right)).join(' | ') }));
      await p.screenshot({ path: path.join(OUT, `${name}-${tag}.png`), fullPage: true });
      META[`${name}-${tag}`] = { h: m.h, rail: m.rail }; rows.push(`${tag} ${name} h=${m.h} overflowX=${m.ox} brokenImgs=${m.imgs}${m.ox ? ' OFF: ' + m.off : ''}`);
      await p.close();
    }
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(META, null, 1));
  console.log(rows.join('\n'));
  await b.close();
})();
