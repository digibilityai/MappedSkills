# Builds g1/CO_G1_REVIEW.html (self-contained apart from relative image links inside the package).
# Run: python3 docs/conversion-redesign/g1/tools/build-review.py
import json, os, html
G = os.path.join(os.path.dirname(__file__), '..')
chk = json.load(open(os.path.join(G, 'screenshots/g1-checks.json')))
e = html.escape

INV = [
  # pdf page, owner note, live section (screenshot), problem found, response, proposed section image, storyboard prefix, steps
  (1, 'The left illustration needs to follow the guidelines. (Plus the eight thumb rules.)', 1,
   'A wireframe of a web page with four orange numbered pins and a coded caption ("1 the wrong visitors · 2 the page doesn’t help…"). It reads like a technical diagram: there is no visitor, no story, and you need a key to decode it. Rounded browser frame and dashed chart do not follow the tile scheme. It also lists the same four points the next section explains.',
   'A three-tile story that needs no key: <b>Visitors arrive → Something stops them → They leave without enquiring</b>, ending on "And you never find out why", which the H1 answers. Cream, cream, ink tiles; tangerine marks only the stopping point. Tile 1 shows at once; the others follow 2 s apart, once. The coded caption is gone. Lede shortened to 24 words.',
   '1-hero', 3),
  (2, 'I feel this is the poorly done section.', 2,
   'Three huge struck-out lines and one sentence on a dark band. No picture, no story, and the payoff ("customers are being lost somewhere else") is vague. It makes the same point as the next section ("Your website isn’t always the problem"), so it does not earn a section of its own.',
   '<b>Removed as a section and merged (CO-D03).</b> The request becomes one speech bubble, "Can you redesign our website?", and the four-place journey ends with the answer: "It can help with 2 and 3. It won’t fix 1 or 4." The idea now has a picture and a payoff instead of crossed-out words.',
   '2-four-places', 5),
  (3, 'Looks good, journey steps automation is missing.', 3,
   'The design works but nothing moves. A toggle ("Show what a website redesign can fix") hides the most useful information behind a control.',
   'Design kept: same four stations, icons, wording and tags, now as framed cream tiles with arrows between them. Plays 1 → 2 → 3 → 4 two seconds apart, then the verdict appears and the tags show which two a redesign can help. Each number is a button. The toggle is no longer needed.',
   '2-four-places', 5),
  (4, 'Once again the journey steps automation is missing. Can we reduce the text on the paragraph', 4,
   'Four tabs that only change on click, each opening a paragraph of up to 49 words with long dashes.',
   'Four steps with one short line each (the longest is 18 words), next to a picture panel that shows what the step looks like: a test enquiry arriving, a list with the biggest problem first, the agreed changes ticked off, before and after measured the same way. Plays automatically, 2 s apart, once; each number is a button.',
   '3-how-we-work', 4),
  (5, 'This section needs improvement. This is just too text heavy. No story telling, no user journey', 5,
   'A 58-word paragraph, then a split band of two more statements and two footnotes. The idea is good (with few enquiries you cannot prove a change worked) but nothing shows it.',
   'A four-beat story every owner will recognise: <b>You make a change → Next week, more enquiries come in → Was it the change, or a lucky week? → The honest answer depends on how many enquiries you get.</b> It ends with two tiles: a few a month (we tell you what we saw) and plenty (we test two versions side by side). Envelopes, not numbers. The qualifier and the method link are kept.',
   '4-did-it-work', 4),
  ('6–7', 'This seems a section that seems the designed missed completing it. Not really clear of what we are saying and what user should understand.', 6,
   'Purpose: first-hand proof that a form can say "Thank you" and still lose every enquiry. It looked unfinished because a phone and an empty inbox outline sat far apart, "Nothing." landed below them, and the lesson was never said. The visitor had to work out why it mattered.',
   '<b>Kept and rebuilt (CO-D07)</b>, because it is the page’s only first-hand evidence. Four beats in order: a visitor sends an enquiry → our website says "Thank you" → our inbox stays empty → nothing was tracked, so nobody noticed. Then one takeaway: "A website can look fine and still lose enquiries. So our first check is simple: send a test enquiry and see if it arrives." Alternative B (fold it into How we work) is in the decision register.',
   '5-our-own-form', 5),
  (8, 'Follow the guidelines.', 7,
   'The body copy has a long dash. The heading is very large compared with the approved /ai-seo close. Nothing tells the visitor what happens after they get in touch.',
   'Dash removed; body shortened. Heading size matches the approved /ai-seo close (page-local; the shared component is unchanged). Optional (CO-D09): "What happens next" in four ink tiles, using only owner-confirmed facts (DEC-051): reply by email or WhatsApp, a call, findings and a proposal before any work starts.',
   '6-close', 4),
]

ARCH = [
  ('1', 'Hero', 'Plenty of visitors, not enough enquiries? We find out why.', 'Name the problem in one glance.', 'Yes, that is my situation.', 'Three-tile story, auto 2 s'),
  ('2', 'Four places', 'Your website isn’t always the problem.', 'Show where visitors can be lost, and that a new website only helps in two of them.', 'Before I redesign, I should find out where they are lost.', 'Route of four tiles, auto 2 s, then verdict'),
  ('3', 'How we work', 'First we find the problem. Then we fix that problem.', 'Show what MappedSkills actually does, in order.', 'I know what working with them looks like.', 'Steps plus picture panel, auto 2 s'),
  ('4', 'Did it work?', 'With only a few enquiries, luck can look like improvement.', 'Set honest expectations about proving results.', 'They will not oversell me.', 'Four-beat story with a fork, auto 2 s'),
  ('5', 'Our own form', 'Our own form said “Thank you”. Every enquiry was lost.', 'Prove the risk is real, with our own mistake.', 'My form could be doing this too. Easy to check.', 'Four-beat story plus takeaway, auto 2 s'),
  ('6', 'Close', 'Let’s find out where your enquiries are going.', 'Ask for the enquiry and remove uncertainty about what follows.', 'Getting in touch is low-risk.', 'CTAs plus "What happens next", auto 2 s'),
]

RULES = [
  ('1 Follow Brand DNA', 'THE RESOLVE tokens only (ground, paper, ink, tangerine), Bricolage Grotesque and Manrope, light-first with one dark stage and one orange CTA band. CTAs go to /contact, with booking second. No invented proof or decorative numbers.'),
  ('2 Sections not loaded with text', f'No paragraph is over 25 words (the live page has 7). Longest block: 24 words. Readable words: 525 (live 568), although the page now also carries picture labels and a "What happens next" row.'),
  ('3 No jargon', 'The page never uses funnel, CTA, UX, A/B test, heatmap or friction. "Conversion optimisation" appears once, explained in the next words.'),
  ('4 Keep text short', 'Every journey step is one line. Paragraphs replaced: hero art caption, brief, tab paragraphs, threshold paragraph and band, proof paragraph.'),
  ('5 No double or long dashes', f'Checked by script on the rendered page: long dashes {chk["copy"]["longDash"]}, double hyphens {chk["copy"]["doubleHyphen"]}.'),
  ('6 Every section tells a story', 'Each section has its own arc (see Architecture); no two sections repeat the drop-off story.'),
  ('7 Journeys auto-progress, 2 s', 'Six sequences. Step 1 is visible at once; then steps follow every 2 s once the block is in view. Each plays once and stops. Measured (below).'),
  ('8 Dual-colour tiles', 'Every tile is cream (ink frame) or ink. Tangerine marks only the event inside a tile. Dashed frame = a genuine gap. (CO-D10)'),
]

def img(src, alt, cls=''):
    return f'<a href="{src}"><img src="{src}" alt="{e(alt)}" loading="lazy" class="{cls}"></a>'

def timing_rows():
    out = []
    names = {'.co-story': 'Hero', '.co-route': 'Four places', '.co-work': 'How we work', '.co-meas': 'Did it work?', '.co-proof': 'Our own form', '.co-next': 'What happens next'}
    for k, v in chk['timing'].items():
        out.append(f'<tr><th>{names[k]}</th>' + ''.join(f'<td>{int(s) + 1}</td>' for _, s in v) + '</tr>')
    return '\n'.join(out)

inv_rows = '\n'.join(f'<tr><th>p{p}</th><td>“{e(n)}”</td><td>{sec}</td><td>{prob}</td><td>{resp}</td></tr>' for p, n, sec, prob, resp, _, _ in INV)
ba = []
for p, n, sec, prob, resp, pref, steps in INV:
    sb = ''.join(f'<figure>{img(f"screenshots/storyboard/{pref}-1440-step{s}.png", f"{pref} step {s}")}<figcaption>Step {s}</figcaption></figure>' for s in range(1, steps + 1))
    sbm = ''.join(f'<figure>{img(f"screenshots/storyboard/{pref}-390-step{s}.png", f"{pref} mobile step {s}")}<figcaption>Step {s}</figcaption></figure>' for s in range(1, steps + 1))
    pdfimg = img(f'owner-pdf/page-{str(p).split("–")[0]}.png', f'Owner PDF page {p}', 'pdf')
    ba.append(f'''<section class="ba" id="pdf-{str(p).split("–")[0]}">
<h3>PDF page {p} · “{e(n)}”</h3>
<div class="ba-g"><div><p class="k">Owner annotation</p>{pdfimg}</div>
<div><p class="k">Before · live section {sec}</p>{img(f"screenshots/before/live-1440-s{sec}.png", "live section")}</div>
<div><p class="k">After · proposed</p>{img(f"screenshots/proposed/proposed-1440-{pref}.png", "proposed section")}</div></div>
<p><b>Problem:</b> {prob}</p><p><b>Response:</b> {resp}</p>
<details><summary>Storyboard, desktop (every step)</summary><div class="sb">{sb}</div></details>
<details><summary>Storyboard, mobile 390 px (every step)</summary><div class="sb sb-m">{sbm}</div></details>
</section>''')

arch_rows = '\n'.join(f'<tr><th>{a}</th><td><b>{b}</b></td><td>{e(c)}</td><td>{e(d)}</td><td>{e(f)}</td><td>{e(g)}</td></tr>' for a, b, c, d, f, g in ARCH)
rule_rows = '\n'.join(f'<tr><th>{e(a)}</th><td>{b}</td></tr>' for a, b in RULES)
f1, f2, f3 = chk['fold_1440x780'], chk['fold_1280x720'], chk['fold_375x812']

dec_md = open(os.path.join(G, 'CO_G1_DECISIONS.md')).read()
dec_rows = []
for line in dec_md.splitlines():
    if line.startswith('| CO-D'):
        c = [x.strip() for x in line.strip('|').split('|')]
        dec_rows.append('<tr>' + ''.join(f'<td>{e(x).replace("**", "")}</td>' for x in c) + '</tr>')

page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Conversion Optimization G1 Review</title>
<style>
:root{{--g:#F7F3EC;--p:#FFFDF9;--i:#141219;--t:#FF5B04;--td:#D94400;--d:#5E5867;--l:#E2DCD1}}
@media (prefers-color-scheme: dark){{:root:not([data-theme="light"]){{--g:#141219;--p:#1D1A23;--i:#F7F3EC;--d:#C0B9CA;--l:#38333F;--td:#FF7A33}}}}
:root[data-theme="dark"]{{--g:#141219;--p:#1D1A23;--i:#F7F3EC;--d:#C0B9CA;--l:#38333F;--td:#FF7A33}}
*{{box-sizing:border-box}} body{{margin:0;background:var(--g);color:var(--i);font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}}
main{{max-width:1240px;margin:0 auto;padding:32px 16px 80px}} h1{{font-size:clamp(1.8rem,1.2rem+2.4vw,2.8rem);line-height:1.1;margin:.2em 0}}
h2{{font-size:1.6rem;margin:56px 0 12px;padding-top:16px;border-top:3px solid var(--i)}} h3{{font-size:1.2rem;margin:0 0 10px}}
.k{{font:700 .75rem/1.3 system-ui;letter-spacing:.12em;text-transform:uppercase;color:var(--td);margin:0 0 6px}}
.lead{{max-width:70ch;color:var(--d)}} table{{width:100%;border-collapse:collapse;font-size:.92rem;background:var(--p)}} .tw{{overflow-x:auto}}
th,td{{border:1px solid var(--l);padding:8px 10px;text-align:left;vertical-align:top}} thead th{{background:var(--i);color:var(--g)}}
img{{max-width:100%;height:auto;display:block;border:1px solid var(--l);background:#fff}} img.pdf{{max-height:420px;width:auto}}
.ba{{margin:28px 0;padding:20px;background:var(--p);border:3px solid var(--i)}} .ba-g{{display:grid;grid-template-columns:1fr 1.4fr 1.4fr;gap:16px;margin-bottom:12px}}
.sb{{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-top:10px}} .sb-m{{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}}
figure{{margin:0}} figcaption{{font-size:.8rem;color:var(--d)}} details{{margin-top:8px}} summary{{cursor:pointer;font-weight:700}}
.cards{{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}} .card{{background:var(--p);border:3px solid var(--i);padding:14px}}
.ink{{background:var(--i);color:var(--g)}} .ok{{color:#23744A;font-weight:700}} a{{color:inherit}} .two{{display:grid;grid-template-columns:2fr 1fr;gap:16px;align-items:start}}
@media (max-width:760px){{.ba-g,.two{{grid-template-columns:1fr}}}}
</style></head><body><main>
<p class="k">MappedSkills · /conversion-optimization · G1 visual redesign · 17 October 2026</p>
<h1>Conversion Optimization: G1 design proposal</h1>
<p class="lead">A design proposal for owner review. <b>Nothing is approved and no production code was changed.</b> Source of the problems: the owner’s eight-page annotated PDF (in <code>owner-pdf/</code>). Baseline: the live page at mappedskills.com, captured on 17 October 2026.</p>
<div class="cards">
<div class="card ink"><p class="k">Interactive mockup</p><a href="mockup/index.html">mockup/index.html</a><br><small>Flags: ?motion=reduce · ?step=N · ?banner=0</small></div>
<div class="card"><p class="k">Recordings</p><a href="recordings/co-g1-sequences-1440.webm">Desktop</a> · <a href="recordings/co-g1-sequences-390.webm">Mobile</a></div>
<div class="card"><p class="k">Copy</p><a href="CO_G1_COPY.md">CO_G1_COPY.md</a> (every word, marked kept, edited or new)</div>
<div class="card"><p class="k">Decisions</p><a href="CO_G1_DECISIONS.md">CO_G1_DECISIONS.md</a> (13 items, none approved)</div>
</div>

<h2>A. What the owner found, section by section</h2>
<p class="lead">The PDF’s eight pages map one-to-one onto the live page’s seven sections. Section 6 (pages 6–7) is a single section split across two screenshots.</p>
<div class="tw"><table><thead><tr><th>PDF</th><th>Owner note</th><th>Live §</th><th>What is wrong</th><th>Proposed response</th></tr></thead><tbody>{inv_rows}</tbody></table></div>

<h2>B. Proposed page architecture</h2>
<p class="lead">Live: 7 sections. Proposed: 6. The "usual brief" section merges into "Four places". The story runs: <b>the problem → where it happens → what we do → how we judge it honestly → proof it is real → what happens next.</b> Each section tells a different story.</p>
<div class="tw"><table><thead><tr><th>#</th><th>Section</th><th>Heading</th><th>Purpose</th><th>Customer takeaway</th><th>Visual</th></tr></thead><tbody>{arch_rows}</tbody></table></div>

<h2>C–F. Before and after, with every animation step</h2>
{''.join(ba)}

<h2>D. Full pages</h2>
<div class="two"><div><p class="k">Desktop 1440 · proposed (complete state)</p>{img("screenshots/proposed/proposed-full-1440.png","proposed full desktop")}</div>
<div><p class="k">Mobile 390 · proposed</p>{img("screenshots/proposed/proposed-full-390.png","proposed full mobile")}</div></div>
<details><summary>Live page for comparison (desktop and mobile)</summary><div class="two"><div>{img("screenshots/before/live-1440-full.png","live desktop")}</div><div>{img("screenshots/before/live-390-full.png","live mobile")}</div></div></details>
<details><summary>Without JavaScript (everything visible, nothing moves)</summary>{img("screenshots/proposed/proposed-nojs-full-1440.png","no JavaScript")}</details>
<h3 style="margin-top:24px">First screen</h3>
<div class="sb"><figure>{img("screenshots/proposed/proposed-fold-1440x780.png","fold 1440")}<figcaption>1440×780: hero ends at {f1["heroBottom"]} px, consent banner starts at {f1["consentTop"]} px</figcaption></figure>
<figure>{img("screenshots/proposed/proposed-fold-1280x720.png","fold 1280")}<figcaption>1280×720: hero ends at {f2["heroBottom"]} px, banner at {f2["consentTop"]} px</figcaption></figure>
<figure>{img("screenshots/proposed/proposed-fold-375x812.png","fold 375")}<figcaption>375×812: CTA ends at {f3["ctaBottom"]} px; the story tiles follow below the CTA</figcaption></figure></div>

<h2>G. Audit against the eight rules (whole page)</h2>
<div class="tw"><table><tbody>{rule_rows}</tbody></table></div>
<h3 style="margin-top:20px">Measured behaviour</h3>
<p class="lead">Each sequence was scrolled into view and sampled. Numbers are the active step (1 = first). Every sequence advanced every 2 s and stopped on its last step. "Our own form" started one step later because the tall section needed to be half on screen first.</p>
<div class="tw"><table><thead><tr><th>Sequence</th><th>0.1 s</th><th>1.9 s</th><th>2.5 s</th><th>4.5 s</th><th>6.5 s</th><th>8.5 s</th><th>11 s</th></tr></thead><tbody>{timing_rows()}</tbody></table></div>
<ul>
<li>Keyboard: {chk["keyboard"]["buttons"]} step buttons. Focusing step 3 of "Four places" and pressing Enter showed step 3 ({e(chk["keyboard"]["label"])}, aria-current="step"), stopped the sequence (still on step 3 after 4.5 s) and revealed the whole section. <span class="ok">Pass</span></li>
<li>Reduced motion (OS setting): {chk["reducedMotion"]["static"]} of {chk["reducedMotion"]["seqs"]} sequences static and complete; hidden elements: {chk["reducedMotion"]["hidden"]}. <span class="ok">Pass</span></li>
<li>No JavaScript: hidden elements: {chk["noJs_hidden"]}. <span class="ok">Pass</span></li>
<li>No sideways scrolling at 1440, 1280 or 375. No Pause, Play or Replay controls. No looping.</li>
<li>Not tested: real devices, VoiceOver or TalkBack, Firefox or Safari (Chromium only).</li>
</ul>

<h2>Decisions requiring approval</h2>
<div class="tw"><table><thead><tr><th>ID</th><th>Proposal</th><th>Type</th><th>Basis</th><th>Evidence</th></tr></thead><tbody>{''.join(dec_rows)}</tbody></table></div>
<p class="lead"><b>Unchanged:</b> H1, page title, meta description, canonical, URL, breadcrumb JSON-LD, all in-body link destinations, CTA labels and destinations. Heading wording changes only in the proof H2 (to remove a long dash). Four H3s are added.</p>

<h2>Boundaries</h2>
<p class="lead">Built as an isolated, noindex static mockup in <code>docs/conversion-redesign/g1/</code> (untracked). It reuses the live chrome and CSS captured for the AI Search review. Not touched: production code for /conversion-optimization, the Google Ads, Social Media Ads and AI Search pages, shared components, branches, commits, pushes, PRs and deployments.</p>
</main></body></html>'''
open(os.path.join(G, 'CO_G1_REVIEW.html'), 'w').write(page)
print('ok', len(page))
