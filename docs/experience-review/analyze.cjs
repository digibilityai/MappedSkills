// Turns data/measure.json into data/analysis.json and FOLD_AUDIT.md (route-by-section PASS / FAIL with measured heights).
const fs = require('fs'); const path = require('path');
const d = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/measure.json'), 'utf8'));
const chrome = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/chrome.json'), 'utf8'));
const W = [1440, 820, 390, 360]; const VH = { 1440: 900, 820: 1180, 390: 844, 360: 800 };
const type = (r) => r === '/' ? 'Home' : /^\/(google-ads|social-media-ads|seo|ai-seo|lead-generation|conversion-optimization|services|pricing)$/.test(r) ? 'Service' : /^\/who-we-help/.test(r) ? 'Audience' : /^\/(about|how-it-works|faq|problems)/.test(r) ? 'Trust and process' : /^\/(work|portfolio)/.test(r) ? 'Work and case studies' : /^\/(blog|press|research)/.test(r) ? 'Editorial' : 'Utility';
const longForm = (r, s) => (/^\/blog\/[^/]+$/.test(r) && s.words > 200) || (/^\/(privacy-policy|terms)/.test(r) && s.words > 500) || (r === '/work' && /All case studies/.test(s.label)) || (/^\/work\/page/.test(r) && s.words > 300) || (/^\/press\/[^/]+$/.test(r) && s.words > 200 && /text|findings|matters|research|note/i.test(s.label)) || (/^\/research\/[^/]+$/.test(r) && !/^industry/.test(r.slice(10)) && /^(Finding|Why|What|Executive|A Note|Methodology|Limitations|How the audit)/i.test(s.label) && s.words > 200);
const library = (r, s) => /case stud|all case|library|every guide|case studies, page/i.test(s.label) && s.h > 1.4 * 800;
const out = { routes: {}, byType: {}, banner: chrome };
for (const r of Object.keys(d).sort()) {
  const per = {};
  for (const w of W) {
    const x = d[r][w]; const hdr = chrome[w].hdr; const ban = chrome[w].banner.h;
    per[w] = x.secs.map((s, i) => {
      const use = i === 0 ? VH[w] - hdr : VH[w];
      const heightOk = s.h <= use; const flags = [];
      if (s.clipped) flags.push('hidden-overflow'); if (s.nested) flags.push('nested-scroll'); if (s.tiny) flags.push('text<12px'); if (/vh/.test(s.minH) || s.fixedH) flags.push('vh-height');
      const lib = !heightOk && library(r, s); const lf = !heightOk && (lib || longForm(r, s));
      const hard = flags.filter((f) => f !== 'text<12px');
      const status = lf ? 'LONG-FORM' : heightOk && !hard.length ? 'PASS' : 'FAIL';
      return { kind: lf ? (lib ? 'library' : 'reading') : undefined, i: s.i, label: s.label || s.id || s.cls, h: s.h, use, over: s.h - use, status, flags, first: use - ban >= s.h || i === 0 ? undefined : undefined, firstVisitOk: s.h <= use - ban, words: s.words, expanders: s.expanders + s.details + s.tabs };
    });
  }
  out.routes[r] = { type: type(r), docH: Object.fromEntries(W.map((w) => [w, d[r][w].docH])), sections: per, overflowX: W.filter((w) => d[r][w].overflowX), fixed: W.map((w) => d[r][w].fixed.map((f) => f.t.slice(0, 20) + ':' + f.h)), h1: (d[r][1440].h1 || '').trim().slice(0, 90), motion: d[r][1440].motion };
}
// summary
const tally = {};
for (const [r, v] of Object.entries(out.routes)) for (const w of W) for (const s of v.sections[w]) { const t = (tally[v.type] = tally[v.type] || {}); const k = (t[w] = t[w] || { PASS: 0, FAIL: 0, 'LONG-FORM': 0, firstVisitFail: 0 }); k[s.status]++; if (s.status === 'PASS' && !s.firstVisitOk) k.firstVisitFail++; }
out.byType = tally;
fs.writeFileSync(path.join(__dirname, 'data/analysis.json'), JSON.stringify(out));
// markdown: section heights as reference data only (the owner's correction removed fold scoring)
const flagTxt = (s) => [s.flags.includes('hidden-overflow') ? 'clipped content' : '', s.flags.includes('text<12px') ? 'text under 12 px' : ''].filter(Boolean).join(', ');
let md = `# Section heights: reference data (31 October 2026)\n\nMeasured on port 3500 at 1440 x 900, 820 x 1180, 390 x 844 and 360 x 800. **Not a score.** The owner's correction (DEC-111) removed fold PASS / FAIL: sections may be as tall as their content needs. Heights are kept as context for length and density. The only flags kept are real reading problems: clipped content, nested scrolling, text under 12 px, page overflow.\n\n`;
for (const [r, v] of Object.entries(out.routes)) {
  md += `### ${r} (${v.type})\n\nH1: ${v.h1}. Page height: ${W.map((w) => v.docH[w]).join(' / ')} px.${v.overflowX.length ? ' **Horizontal overflow at ' + v.overflowX.join(', ') + '.**' : ''}\n\n| # | Section | 1440 | 820 | 390 | 360 | Words | Reading flags |\n|---|---|---|---|---|---|---|---|\n`;
  const n = Math.max(...W.map((w) => v.sections[w].length));
  for (let i = 0; i < n; i++) {
    const row = W.map((w) => v.sections[w][i]); const first = row.find(Boolean);
    md += `| ${i + 1} | ${first.label.replace(/\|/g, '/').slice(0, 44)} | ` + row.map((x) => (x ? x.h : 'n/a')).join(' | ') + ` | ${first.words} | ${[...new Set(row.filter(Boolean).map(flagTxt).filter(Boolean))].join('; ')} |\n`;
  }
  md += '\n';
}
fs.writeFileSync(path.join(__dirname, 'SECTION_HEIGHTS.md'), md);
console.log('written');
