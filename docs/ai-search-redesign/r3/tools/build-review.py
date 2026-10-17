# Builds R3_REVIEW.html from R3_COPY.md and R3_DECISIONS.md plus the static narrative below. Run: python3 tools/build-review.py
import re, html, json, os
D = os.path.join(os.path.dirname(__file__), '..')
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'`(.+?)`', r'<code>\1</code>', s)
    return s
def md(text, h_off=1):
    out, lines, i = [], text.split('\n'), 0
    ul = None
    def close():
        nonlocal ul
        if ul: out.append('</%s>' % ul); ul = None
    while i < len(lines):
        l = lines[i]
        if l.startswith('|'):
            close(); rows = []
            while i < len(lines) and lines[i].startswith('|'):
                if not re.match(r'^\|[-| ]+\|$', lines[i]): rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')])
                i += 1
            out.append('<div class="tw"><table><thead><tr>' + ''.join('<th>%s</th>' % inline(c) for c in rows[0]) + '</tr></thead><tbody>' + ''.join('<tr>' + ''.join('<td>%s</td>' % inline(c) for c in r) + '</tr>' for r in rows[1:]) + '</tbody></table></div>'); continue
        m = re.match(r'^(#+) (.*)', l)
        if m: close(); n = len(m.group(1)) + h_off; out.append('<h%d>%s</h%d>' % (n, inline(m.group(2)), n))
        elif re.match(r'^\s*[-*] ', l): 
            if ul != 'ul': close(); out.append('<ul>'); ul = 'ul'
            out.append('<li>%s</li>' % inline(re.sub(r'^\s*[-*] ', '', l)))
        elif re.match(r'^\d+\. ', l):
            if ul != 'ol': close(); out.append('<ol>'); ul = 'ol'
            out.append('<li>%s</li>' % inline(re.sub(r'^\d+\. ', '', l)))
        elif l.strip() == '': close()
        else: close(); out.append('<p>%s</p>' % inline(l))
        i += 1
    close(); return '\n'.join(out)
copy = md(open(D + '/R3_COPY.md').read(), 1)
dec = md(open(D + '/R3_DECISIONS.md').read(), 1)
M = json.load(open(D + '/screenshots/r3-measurements.json'))
def img(p, cap, cls=''): return '<figure class="%s"><a href="%s"><img src="%s" alt="%s" loading="lazy"></a><figcaption>%s</figcaption></figure>' % (cls, p, p, html.escape(cap), cap)
def pair(k, label, extra=''):
    return '<div class="pair">' + img('screenshots/sections/baseline-%s-1440.png' % k, 'Current (PR #14), desktop: ' + label) + img('screenshots/sections/proposed-%s-1440.png' % k, 'Proposed R3, desktop') + '</div>'
def sb(k, n, tag):
    return '<div class="strip">' + ''.join(img('screenshots/storyboard/%s-%s-step-%d.png' % (k, tag, s), 'Step %d' % s) for s in range(1, n + 1)) + '</div>'
tpl = open(D + '/tools/review-template.html').read()
page = tpl.replace('{{COPY}}', copy).replace('{{DEC}}', dec)
for k, v in {'{{BH}}': M['baseline1440']['pageHeight'], '{{PH}}': M['proposed1440']['pageHeight'], '{{BW}}': M['baseline1440']['words'], '{{PW}}': M['proposed1440']['words'], '{{BHM}}': M['baseline375']['pageHeight'], '{{PHM}}': M['proposed375']['pageHeight']}.items(): page = page.replace(k, '{:,}'.format(v))
for k, (n, tag) in {'{{SB_JOURNEY}}': (5, 'desktop'), '{{SB_REPORTING}}': (3, 'desktop'), '{{SB_SCENARIO}}': (4, 'desktop'), '{{SB_INDUSTRY}}': (4, 'desktop')}.items():
    page = page.replace(k, sb(k[5:-2].lower(), n, tag))
for k in ['{{SB_JOURNEY_M}}', '{{SB_REPORTING_M}}', '{{SB_SCENARIO_M}}', '{{SB_INDUSTRY_M}}']:
    nm = {'journey': 5, 'reporting': 3, 'scenario': 4, 'industry': 4}[k[5:-4].lower()]
    page = page.replace(k, sb(k[5:-4].lower(), nm, 'mobile'))
for k, label in {'{{PAIR_IND}}': ('where-answers-and-self-test', 'self-test and sources section'), '{{PAIR_JR}}': ('journey', 'five steps'), '{{PAIR_RP}}': ('reporting', 'reporting'), '{{PAIR_FIT}}': ('suitability', 'suitability')}.items():
    kk = label[0]; lab = label[1]; key = {'{{PAIR_IND}}': 'industry', '{{PAIR_JR}}': 'journey', '{{PAIR_RP}}': 'reporting', '{{PAIR_FIT}}': 'scenario'}[k]
    page = page.replace(k, '<div class="pair">' + img('screenshots/sections/baseline-%s-1440.png' % kk, 'Current (PR #14), desktop: ' + lab) + img('screenshots/sections/proposed-%s-1440.png' % key, 'Proposed R3, desktop') + '</div><div class="pair pair-m">' + img('screenshots/sections/baseline-%s-375.png' % kk, 'Current, mobile') + img('screenshots/sections/proposed-%s-375.png' % key, 'Proposed R3, mobile') + '</div>')
open(D + '/R3_REVIEW.html', 'w').write(page); print('ok', len(page))
