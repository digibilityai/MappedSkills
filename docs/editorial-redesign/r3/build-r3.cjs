// Editorial direction R3 mockups (proposal only): /blog, /press, press release, /research hub and report, desktop and mobile, with actual content
// read from the port-3500 pages (../mockup/data) inside the real header and footer. Nothing in the application is changed.
//   node docs/editorial-redesign/r3/build-r3.cjs
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(__dirname, '../../../node_modules/playwright-core'));
const BASE = 'http://localhost:3500';
const M = path.join(__dirname, '../mockup');
const D = (n) => JSON.parse(fs.readFileSync(path.join(M, 'data', n + '.json'), 'utf8'));
const BODY = JSON.parse(fs.readFileSync(path.join(M, 'data/bodies.json'), 'utf8'));
const CSS = fs.readFileSync(path.join(M, 'ed.css'), 'utf8') + fs.readFileSync(path.join(__dirname, 'ed3.css'), 'utf8');
const OUT = path.join(__dirname, 'shots'); fs.mkdirSync(OUT, { recursive: true }); const META = {};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MAIL = 'info@mappedskills.com';
const RTITLE = 'The Marketing Measurement Gap: What 120 Indian Business Websites Reveal About Analytics and Advertising Measurement';
const RDEK = 'Among the 120 Indian business websites audited, more than 4 in 10 had no observable Google Analytics, yet 97.5% preserved the UTM parameters used in testing.';

const crumb = (...c) => `<nav class="e3-crumb" aria-label="Breadcrumb">${c.map(([t, h]) => (h ? `<a href="${h}">${esc(t)}</a>` : `<span aria-current="page">${esc(t)}</span>`)).join('')}</nav>`;
const chips = (arr) => `<div class="e3-chips">${arr.map(([t, plain]) => `<span class="e3-chip${plain ? ' plain' : ''}">${esc(t)}</span>`).join('')}</div>`;
const hero = ({ c, k, ch, h1, long, lede, act, right, wide, narrow }) => `<section class="e3-hero"><div class="e3-w">${c}<div class="e3-hg"><div class="e3-hl${wide ? ' wide' : ''}">${k ? `<p class="e3-k">${k}</p>` : ''}${ch || ''}<h1 class="${long ? 'long' : ''}">${h1}</h1>${lede ? `<p class="e3-lede">${esc(lede)}</p>` : ''}${act || ''}</div>${right ? `<div class="e3-hr${narrow ? ' narrow' : ''}">${right}</div>` : ''}</div></div></section>`;
const band = (tone, inner) => `<section class="e3-band ${tone}"><div class="e3-w">${inner}</div></section>`;
const chead = (n, label, h2, extra) => `<div class="e3-head"><div><p class="e3-ch"><span>${n}</span>${label}</p><h2 class="e3-h2">${h2}</h2></div>${extra || ''}</div>`;
const close = (h, body, a, b) => `<section class="e3-close"><div class="e3-w"><h2>${h}</h2><p>${esc(body)}</p><div class="e3-act"><a class="e3-btn" href="#">${a}</a>${b ? `<a class="e3-link" href="#">${b} ↗</a>` : ''}</div></div></section>`;
const waffle = (on) => `<div class="waffle" role="img" aria-label="${on} of 120 squares highlighted">${Array.from({ length: 120 }, (_, i) => `<i${i < on ? ' class="on"' : ''}></i>`).join('')}</div>`;
const strip = (t) => t.replace(/<[^>]+>/g, '');
const idsOf = (html) => [...html.matchAll(/<h2[^>]*?(?: id="([^"]*)")?[^>]*>(.*?)<\/h2>/g)].map((m) => ({ id: m[1], t: strip(m[2]) }));
const railOf = (items, open) => `<aside class="rail"><h2 class="rail-h">On this page</h2><ol class="rail-d">${items.map((i) => `<li><a href="#${i.id}">${esc(i.t)}</a></li>`).join('')}</ol><details class="rail-m"${open ? ' open' : ''}><summary><span>On this page</span><span class="rail-n">${items.length} sections</span></summary><ol>${items.map((i) => `<li><a href="#${i.id}">${esc(i.t)}</a></li>`).join('')}</ol></details></aside>`;
const related = (title, items) => `<section class="related"><div class="w"><h2 class="aside-k" style="font-family:Manrope;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:#5C5665;font-weight:800">${title}</h2><div class="rel-g">${items.map(([k, t]) => `<a href="#"><span class="rk">${k}</span><span class="rt">${esc(t)}</span></a>`).join('')}</div></div></section>`;

// ---------------------------------------------------------------- BLOG
const IMG = {
  'real-estate': 'https://images.ctfassets.net/owww06rzpjnj/4XTbYWClKHjQR4s2dNqbGZ/be798754fcbbc371eb0e297acd43fef3/Mappedskills_Digital-Marketing-Strategies-for-Real-Estate.webp',
  team: 'https://images.ctfassets.net/owww06rzpjnj/4JhD04rM8Z8AhDq5pr0A2J/2f1f15492161bc6ce60b35fab5fd284b/blog-details-img.webp',
  content: 'https://images.ctfassets.net/owww06rzpjnj/DaZDs4Sdt7PkGkPmQSRHJ/f86f377333da5bf6db9dec80ee6cd3c9/MappedSkills_Content_Marketing_Services_Cost_of_Content_Creation.webp',
  seo: 'https://images.ctfassets.net/owww06rzpjnj/61hi8K3M07Udh4v9RTIQh6/a34547cb2fd2e923a684ca84879d9bcb/Best_SEO_Company_in_Pune.jpeg',
};
const BL = [
  ['Content Marketing', '6 min read', 'Content Marketing Services in Pune | Boost Your Business Now', IMG.content],
  ['Email Marketing', '3 min read', 'Building an Email List: A Comprehensive Guide', IMG.team],
  ['Brand Strategy', '5 min read', 'The Importance of Content Writing: A Guide for Business Owners and Marketing Managers', null],
  ['Insights', '4 min read', 'Performance Marketing vs. Digital Marketing: Which is Right for Your Business?', IMG.team],
  ['Real Estate', '13 min read', '7 Proven Strategies of Digital Marketing for Real Estate Developers', IMG.team && IMG['real-estate']],
  ['Content Marketing', '9 min read', 'Best SEO Company in Pune for Businesses That Want Qualified Leads, Not Just Rankings', IMG.seo],
  ['PPC', '8 min read', 'Facebook Advertising Agency in Pune for Facebook & Instagram Ads That Drive Qualified Leads', null],
];
const blogItems = () => D('blog').blocks.filter((b) => b.t === 'li').map((b) => b.x).map((x, i) => x.match(/^(.*?) · (\d+ min read)(.*)$/)[3].slice(BL[i][2].length).trim().replace(/Read$/, '').trim());
const card = ([topic, read, title, img], ex) => `<article class="e3-card"><div class="im">${img ? `<img src="${img}" alt="">` : `<div class="e3-cover"><i></i><b>${esc(topic)}</b></div>`}</div><div class="t"><p class="ey"><span>${esc(topic)}</span><span>${read}</span></p><h3><a href="#">${esc(title)}</a></h3><p class="x">${esc(ex)}</p></div></article>`;
const blogList = () => {
  const ex = blogItems(); const f = 4;
  const feat = `<article class="e3-feat"><div class="e3-shot"><img src="${BL[f][3]}" alt=""></div><div class="t"><p class="e3-pk">Featured read · ${BL[f][0]} · ${BL[f][1]}</p><h2><a href="#">${esc(BL[f][2])}</a></h2><p class="x">${esc(ex[f])}</p><div class="e3-act"><a class="e3-btn" href="#">Read the article</a></div></div></article>`;
  const rest = BL.map((b, i) => [b, i]).filter(([, i]) => i !== f);
  return `<div class="ed e3">
  ${hero({ c: crumb(['Home', '/'], ['Blog']), k: 'The blog', h1: 'Marketing guides, <em>written plainly.</em>', lede: 'Practical reads on search, ads, content and turning website visits into enquiries — for business owners deciding what to do next.', right: feat })}
  ${band('', chead('01', 'The collection', 'Every guide, <em>in one place.</em>', `<p class="e3-ch" style="margin-bottom:8px">${BL.length} articles</p>`) + `<div class="e3-grid">${rest.map(([b, i]) => card(b, ex[i])).join('')}</div>`)}
  ${close('Reading about <br>a problem you have?', 'Tell us what’s happening with your marketing. If we’re not the right fit, we’ll say so.', 'Tell us about your business', 'Request a call')}
  </div>`;
};
const blogDetail = (open) => {
  const bl = D('blog-detail').blocks; const P = (s) => bl.find((b) => b.x.startsWith(s)).x; const body = BODY.blog[0];
  return `<div class="ed e3">
  ${hero({ c: crumb(['Home', '/'], ['Blog', '/blog'], ['Performance Marketing vs. Digital Marketing']), ch: chips([['Insights'], ['4 min read', 1], ['Updated October 20, 2026', 1]]), h1: 'Performance Marketing vs. Digital Marketing: <em>Which is Right for Your Business?</em>', long: 1, lede: P('Performance Marketing vs. Digital Marketing, their pros'), wide: 1, narrow: 1,
    act: '<p class="e3-lede" style="margin-top:22px;font-size:1rem">By <b style="color:#fff">Amit Gupta</b></p>' })}
  <section class="e3-body"><div class="e3-w"><div class="shell">${railOf(idsOf(body), open)}<div class="col rich"><figure class="e3-stage"><img src="${IMG.team}" alt=""></figure>${body}
    <div class="e3-sup"><div class="e3-note"><p class="e3-pk">Related service</p><p><a href="/google-ads"><b>Google Ads</b></a> · <a href="/social-media-ads"><b>Social Media Ads</b></a></p></div><div class="e3-note"><p class="e3-pk">Share this article</p><p><a href="#">LinkedIn</a> · <a href="#">Facebook</a> · <a href="#">Copy link</a></p></div></div></div></div></div></section>
  ${band('', chead('02', 'Keep reading', 'Two more <em>guides.</em>') + `<div class="e3-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">${[0, 2].map((i) => card(BL[i], blogItems()[i])).join('')}</div>`)}
  ${close('Reading about <br>a problem you have?', 'Tell us what’s happening with your marketing. If we’re not the right fit, we’ll say so.', 'Tell us about your business', 'Request a call')}
  </div>`;
};

// ---------------------------------------------------------------- PRESS
const REL_TITLE = 'MappedSkills Research Finds No Observable Google Analytics on 42.5% of 120 Indian Business Websites Audited';
const REL_EX = 'New study finds that 97.5% of audited websites preserved campaign tracking parameters, while advertising measurement technologies were less consistently observable.';
const pressList = () => {
  const img = D('press-detail').imgs[0];
  const ann = `<article class="e3-feat e3-ann"><div class="e3-shot"><img src="${img.s}" alt="${esc(img.a)}"></div><div class="t"><p class="e3-pk">Latest announcement · October 23, 2026</p><h2><a href="#">${esc(REL_TITLE)}</a></h2><p class="x">${esc(REL_EX)}</p><div class="e3-act"><a class="e3-btn" href="#">Read the release</a></div></div></article>`;
  return `<div class="ed e3">
  ${hero({ c: crumb(['Home', '/'], ['Press']), k: 'Newsroom', h1: 'News from MappedSkills, <em>on the record.</em>', lede: 'Our press releases and announcements, newest first. Writing a story? Email us for comment or background.', act: `<div class="e3-act"><a class="e3-btn" href="mailto:${MAIL}">Email the media desk</a><a class="e3-link" href="#">${MAIL}</a></div>`, right: ann })}
  ${band('paper', chead('01', 'Background', 'Useful for <em>your story.</em>') + `<div class="e3-two"><ul class="e3-rec"><li><a href="#"><p class="ty">Research<small>October 5, 2026</small></p><div><h3>The Marketing Measurement Gap</h3><p>What we checked, how many, when, and where the evidence stops.</p></div><span class="ar" aria-hidden="true">→</span></a></li><li><a href="#"><p class="ty">Company<small>About us</small></p><div><h3>About MappedSkills</h3><p>What we do, how we work and what we promise our clients.</p></div><span class="ar" aria-hidden="true">→</span></a></li></ul><div class="e3-note"><p class="e3-pk">About MappedSkills</p>${[...BODY.press[5].matchAll(/<p>(.*?)<\/p>/g)].map((m) => strip(m[1])).filter((t) => t && !/^Website|^https?:/.test(t) && t !== 'About MappedSkills').map((t) => `<p>${esc(t)}</p>`).join('')}</div></div>`)}
  ${close('Working on a story? <br>Talk to us.', 'Email us for comment or background. Tell us your publication and your deadline.', 'Email a media enquiry', 'Use the contact form')}
  </div>`;
};
const pressDetail = (open) => {
  const bl = D('press-detail').blocks; const img = D('press-detail').imgs[0];
  const rel = bl.filter((b) => b.t === 'p' && /^(PUNE|The research found|At the same time|The findings highlight)/.test(b.x)).map((b) => b.x);
  const dl = rel[0].replace(/^PUNE, INDIA — /, '');
  const [, why, quote, about, , boiler, media] = BODY.press;
  const part1 = `<h2 id="the-release">The release</h2><p class="dateline">PUNE, INDIA —</p><p>${esc(dl)}</p><p>${esc(rel[1])}</p><p>${esc(rel[2])}</p><p>${esc(rel[3])}</p>`;
  const part2 = [why, quote].join('');
  const heads = [{ id: 'the-release', t: 'The release' }, { id: 'key-findings', t: 'Key findings' }, ...idsOf(part2), { id: 'about-the-research', t: 'About the research' }, { id: 'about-mappedskills', t: 'About MappedSkills' }, { id: 'media-enquiries', t: 'Media enquiries' }];
  const ev = `<section class="e3-band dark"><div class="e3-w"><span id="pd-h-ev"></span><p class="e3-ch"><span>02</span>The evidence in brief</p><h2 class="e3-h2" id="key-findings">Key <em>findings.</em></h2>
    <div class="e3-ev" role="list"><div role="listitem"><div class="e3-fig v">42.5%</div><p class="c">No observable Google Analytics</p><p class="s">51 of 120 websites. n=120 Indian business websites · MSR-001 Audit Protocol v1.1</p></div><div role="listitem"><div class="e3-fig v">97.5%</div><p class="c">Preserved the test UTM parameters</p><p class="s">117 of 120 websites. Harmless predefined UTM parameters.</p></div><div role="listitem"><div class="e3-fig v">120</div><p class="c">Indian business websites audited</p><p class="s">30 each from Manufacturing, Jewellery, Fashion and Technology, 2025–2026.</p></div></div>
    <dl class="facts" style="grid-template-columns:minmax(0,13rem) 1fr;margin-top:32px;font-size:1.0625rem;border-top:1px solid #3a3544;padding-top:18px;color:#E9E4DC"><dt style="color:#CFC8D6">Google Analytics</dt><dd>Observable on 55.8% of audited websites.</dd><dt style="color:#CFC8D6">Meta Pixel</dt><dd>Observable on 35.8%.</dd><dt style="color:#CFC8D6">Google Ads-related measurement</dt><dd>Observable on 27.5%.</dd><dt style="color:#CFC8D6">Sector differences</dt><dd>Meta Pixel was observable on 66.7% of Fashion websites and 60% of Jewellery websites, compared with 10% of Technology websites and 6.7% of Manufacturing websites.</dd></dl>
    <p style="margin-top:16px;color:#CFC8D6;font-size:.9375rem">These findings describe the websites included in the study. They are not estimates for all Indian businesses.</p></div></section>`;
  return `<div class="ed e3">
  ${hero({ c: crumb(['Home', '/'], ['Press', '/press'], ['Press release']), ch: chips([['Press release'], ['October 23, 2026', 1], ['Research ID MSR-001', 1]]), h1: 'MappedSkills Research Finds No Observable Google Analytics on <em>42.5% of 120 Indian Business Websites Audited</em>', long: 1, lede: REL_EX, wide: 1, narrow: 1,
    act: `<div class="e3-act"><a class="e3-btn" href="#media-enquiries">Media enquiries</a><a class="e3-link" href="#about-the-research">About the research</a></div>`, right: `<figure class="e3-ann e3-feat" style="margin:0"><div class="e3-shot"><img src="${img.s}" alt="${esc(img.a)}"></div></figure>` })}
  <section class="e3-body"><div class="e3-w"><div class="shell">${railOf(heads, open)}<div class="col rich">${part1}</div></div></div></section>
  ${ev}
  <section class="e3-body"><div class="e3-w"><div class="shell"><div class="rail" aria-hidden="true"></div><div class="col rich">${part2}
    <div class="e3-sup"><div class="e3-note" id="about-the-research"><p class="e3-pk">About the research</p>${about.replace(/<h2[^>]*>.*?<\/h2>/, '').replace(/<a /g, '<a ')}</div><div class="e3-note"><p class="e3-pk">About MappedSkills</p>${boiler.replace(/<h2[^>]*>.*?<\/h2>/, '')}</div></div>
    <div class="e3-sup" style="grid-template-columns:1fr"><div class="e3-note dk" id="media-enquiries"><p class="e3-pk">Media enquiries</p>${media.replace(/<h2[^>]*>.*?<\/h2>/, '')}</div></div></div></div></div></section>
  ${close('Working on a story? <br>Talk to us.', 'Email us for comment or background. Tell us your publication and your deadline.', 'Email a media enquiry', 'Use the contact form')}
  </div>`;
};

// ---------------------------------------------------------------- RESEARCH
const rd = D('research').blocks; const rb = (i) => rd[i].x;
const FIND = [[18, 19, 21], [23, 24, 26], [28, 29, 31], [33, 34, 36]].map(([v, t, s]) => ({ v: rb(v), t: rb(t), s: rb(s).replace(/^Sample /, '').replace(' Source ', ' · ') }));
const researchList = () => `<div class="ed e3">
  ${hero({ c: crumb(['Home', '/'], ['Research']), k: 'Research', h1: 'We look at real business websites. <em>Then we publish what we find.</em>', lede: rb(1), act: '<div class="e3-act"><a class="e3-btn" href="#latest-report">Read the latest report</a><a class="e3-link" href="/press">Visit the newsroom</a></div>',
    right: `<div class="e3-panel"><p class="e3-pk">The headline finding</p><div class="e3-fig" style="font-size:clamp(4.2rem,8vw,6.8rem);margin-top:18px">42.5%</div><h2 style="margin-top:12px;color:#fff;font-size:1.6rem;line-height:1.12;letter-spacing:-.02em;max-width:22ch">${esc(rb(5))}</h2>${waffle(51)}<p class="waffle-c">${esc(rb(8))}</p><p style="margin-top:18px;color:#E9E4DC">${esc(rb(9))}</p><p class="waffle-c" style="margin-top:10px">${esc(rb(14))}</p></div>` })}
  ${band('paper', `<span id="latest-report"></span>` + chead('01', 'The latest report', 'The Marketing <em>Measurement Gap.</em>') + `<div class="e3-two"><div><p style="font-size:1.25rem;line-height:1.5;max-width:46ch">${esc(RTITLE.split(': ')[1])}. ${esc(RDEK)}</p>
    <dl class="facts" style="margin-top:28px;font-size:1rem;border-top:1px solid #DED6C8;padding-top:16px;max-width:520px"><dt>Author</dt><dd>Amit Gupta</dd><dt>Published</dt><dd>October 5, 2026</dd><dt>Research period</dt><dd>2025–2026</dd><dt>Geography</dt><dd>India</dd><dt>Sample size</dt><dd>120 websites</dd><dt>Category</dt><dd>Industry Benchmarks</dd></dl>
    <div class="e3-act"><a class="e3-btn" href="/research/marketing-measurement-gap-indian-business-websites">Read the full report</a><a class="e3-link dk" href="/research/marketing-measurement-gap-indian-business-websites#rr-h-method">How the audit was done</a><a class="e3-link dk" href="/research/marketing-measurement-gap-indian-business-websites#rr-h-limits">What the study can’t tell you</a></div></div>
    <div style="display:grid;gap:20px"><div class="e3-note"><p class="e3-pk">${esc(rb(10))}</p><p>${esc(rb(11))}</p></div><div class="e3-note"><p class="e3-pk">${esc(rb(12))}</p><p>${esc(rb(13))}</p></div></div></div>`)}
  ${band('dark', chead('02', 'From the same study', 'What else <em>we found.</em>') + `<div class="e3-ev e3-ev4">${FIND.map((f) => `<div><div class="e3-fig v">${esc(f.v)}</div><p class="c">${esc(f.t)}</p><p class="s">${esc(f.s)}</p></div>`).join('')}</div>`)}
  ${band('', chead('03', 'How we work', 'What we checked. <em>What we can’t claim.</em>') + `<ul class="e3-three" style="--c:#DED6C8"><li style="border-color:#DED6C8"><div class="n">01</div><h3 style="color:#141219">${esc(rb(56))}</h3><p style="color:#3a3542">${esc(rb(57))}</p></li><li style="border-color:#DED6C8"><div class="n">02</div><h3 style="color:#141219">${esc(rb(59))}</h3><p style="color:#3a3542">${esc(rb(60))}</p></li><li style="border-color:#DED6C8"><div class="n">03</div><h3 style="color:#141219">${esc(rb(62))}</h3><p style="color:#3a3542">${esc(rb(63))}</p></li></ul><p style="margin-top:32px;color:#3a3542">${esc(rb(65)).replace(MAIL, `<a href="mailto:${MAIL}"><b>${MAIL}</b></a>`)} <a class="e3-link dk" href="/press">Visit the newsroom ↗</a></p>`)}
  ${close('Not sure what your marketing is actually measuring?', rb(67), 'Tell us about your business', 'Request a call')}
  </div>`;
const researchDetail = (open) => {
  const finds = [['42.5%', r5(), rb(14), 'body-2', 1], ...[[18, 19, 21, 'body-3', 2], [23, 24, 26, 'body-3', 2], [28, 29, 31, 'body-4', 3], [33, 34, 36, 'body-5', 4]].map(([v, t, s, id, n]) => [rb(v), rb(t), rb(s).replace(/^Sample /, '').replace(' Source ', ' · '), id, n])];
  function r5() { return rb(5); }
  const sections = BODY.research.map((h, i) => (i === 0 ? h.replace('<p>The full report</p>', '') : h.replace(/<p>(Methodology|Limitations)<\/p>/, '')));
  const bodyHtml = sections.join(''); const all = idsOf(bodyHtml);
  const items = [{ id: 'rr-h-more', t: 'What the research found.' }, ...all, { id: 'rr-h-cite', t: 'How to reference this report.' }];
  const idOf = (n) => items.find((i) => i.t.includes(n)).id;
  const facts = `<div class="e3-panel"><p class="e3-pk">Report facts</p><dl class="facts" style="margin-top:18px;color:#fff;font-size:1rem"><dt style="color:#CFC8D6">Author</dt><dd>Amit Gupta</dd><dt style="color:#CFC8D6">Published</dt><dd>October 5, 2026</dd><dt style="color:#CFC8D6">Research period</dt><dd>2025–2026</dd><dt style="color:#CFC8D6">Geography</dt><dd>India</dd><dt style="color:#CFC8D6">Sample size</dt><dd>120</dd><dt style="color:#CFC8D6">Research ID</dt><dd>MSR-001</dd></dl><p class="jump" style="margin-top:20px"><a href="#rr-h-more" style="color:#FF5B04">Key findings ↓</a><a href="#${idOf('How the audit')}" style="color:#FF5B04">Methodology ↓</a><a href="#${idOf('tell you')}" style="color:#FF5B04">Limitations ↓</a><a href="#rr-h-cite" style="color:#FF5B04">Cite this report ↓</a></p></div>`;
  return `<div class="ed e3">
  ${hero({ c: crumb(['Home', '/'], ['Research', '/research'], ['Industry Benchmarks'], ['The Marketing Measurement Gap']), ch: chips([['Research report'], ['Industry Benchmarks', 1]]), h1: '<em>The Marketing Measurement Gap:</em> What 120 Indian Business Websites Reveal About Analytics and Advertising Measurement', long: 1, lede: RDEK, wide: 1, narrow: 1, right: facts })}
  <section class="e3-band dark"><div class="e3-w"><p class="e3-ch"><span>01</span>The findings</p><h2 class="e3-h2" id="rr-h-more">What the research <em>found.</em></h2>
    <div class="e3-cards5">${finds.map(([v, t, s, id, n]) => `<div><div class="e3-fig v">${esc(v)}</div><p class="c">${esc(t)}</p><p class="s">${esc(s)}</p><a href="#${id}">Read finding ${n} ↓</a></div>`).join('')}</div></div></section>
  <section class="e3-body"><div class="e3-w"><div class="shell">${railOf(items.slice(1), open)}<div class="col wide rich">${bodyHtml}
    <h2 id="rr-h-cite">How to reference this report.</h2><div class="box"><span class="aside-k">Cite this report</span><p>Amit Gupta. ${esc(RTITLE)}. MappedSkills Research, October 5, 2026. https://mappedskills.com/research/marketing-measurement-gap-indian-business-websites</p><p><a class="btn o" href="#rr-h-cite">Copy citation</a> <a class="btn o" href="#rr-h-cite">Copy link</a></p></div>
    <div class="e3-sup" style="grid-template-columns:1fr"><div class="e3-note dk"><p class="e3-pk">For journalists</p><p>For media enquiries, embargoed materials, or comment, email <a href="mailto:${MAIL}"><b>${MAIL}</b></a> or use the contact form. <a href="/press"><b>Visit the newsroom →</b></a></p></div></div></div></div></div></section>
  ${close('Not sure what your marketing is actually measuring?', 'We can help you understand what’s visible, what’s missing and what to look at next.', 'Tell us about your business', 'Request a call')}
  </div>`;
};

const PAGES = [
  ['blog-listing', '/blog', () => blogList()], ['blog-detail', '/blog/performance-marketing-vs-digital-marketing', () => blogDetail(false)],
  ['press-listing', '/press', () => pressList()], ['press-detail', '/press/marketing-measurement-gap-indian-websites', () => pressDetail(false)],
  ['research-listing', '/research', () => researchList()], ['research-detail', '/research/marketing-measurement-gap-indian-business-websites', () => researchDetail(false)],
  ['research-detail-nav-open', '/research/marketing-measurement-gap-indian-business-websites', () => researchDetail(true)],
];
(async () => {
  const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }); const rows = [];
  for (const [w, h, tag, k] of [[1440, 900, 'desktop', 1], [390, 844, 'mobile', 2]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: k });
    for (const [name, url, fn] of PAGES) {
      const html = fn(); const p = await ctx.newPage(); await p.goto(BASE + url, { waitUntil: 'networkidle' });
      const rej = p.getByRole('button', { name: /reject analytics/i }); if (await rej.count()) await rej.click().catch(() => {});
      await p.evaluate(({ css, html }) => { const st = document.createElement('style'); st.textContent = css + 'nextjs-portal{display:none!important}'; document.head.appendChild(st); document.querySelector('main').innerHTML = html; }, { css: CSS, html });
      await p.waitForLoadState('networkidle'); await p.mouse.move(2, 2); await p.waitForTimeout(900);
      const m = await p.evaluate(() => ({ h: document.documentElement.scrollHeight, ox: document.documentElement.scrollWidth > innerWidth, broken: [...document.querySelectorAll('.e3 img')].filter((i) => !i.naturalWidth).length, rail: Math.round(document.querySelector('.rail-m') ? document.querySelector('.rail-m').getBoundingClientRect().top + scrollY : 0), off: [...document.querySelectorAll('.e3 *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 2).map((e) => e.tagName + '.' + String(e.className).slice(0, 24)).join(',') }));
      await p.screenshot({ path: path.join(OUT, `${name}-${tag}.png`), fullPage: true }); META[`${name}-${tag}`] = { h: m.h, rail: m.rail }; rows.push(`${tag} ${name} h=${m.h} ox=${m.ox} broken=${m.broken}${m.off ? ' OFF:' + m.off : ''}`); await p.close();
    }
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(META, null, 1)); console.log(rows.join('\n')); await b.close();
})();
