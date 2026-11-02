// Paste into a page (or Runtime.evaluate). Measures A3 type floors, A12 targets, H2 emphasis, long dashes and overflow in <main>.
(() => {
  const root = document.querySelector('main') || document.body;
  const out = { url: location.pathname, w: innerWidth, under12: [], under14: [], taps: [], em: [], dashes: [], overflow: document.documentElement.scrollWidth - innerWidth, h1: document.querySelectorAll('h1').length, headings: [] };
  const seen = new Set();
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n; (n = w.nextNode()); ) {
    const t = n.textContent.trim(); if (!t) continue;
    const el = n.parentElement; if (el.closest('svg,[aria-hidden="true"] svg,.sr-only,.cs-sr,[hidden]')) continue;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    const px = parseFloat(cs.fontSize);
    const cls = (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : '');
    const mock = !!el.closest('.pa-mock,.sam,.mam,[class*="mock"],[class*="-ad-"],.ga4-serp,.mr1-feed,[data-mock]');
    const key = el.tagName + cls + px.toFixed(1) + (mock ? 'M' : '');
    if (px < 14 && !seen.has(key)) { seen.add(key); (px < 12 ? out.under12 : out.under14).push(`${px.toFixed(1)} ${el.tagName.toLowerCase()}${cls}${mock ? ' [mock]' : ''} "${t.slice(0, 34)}"`); }
    if (/[–—]|--/.test(t)) out.dashes.push(t.slice(0, 70));
  }
  if (innerWidth < 760) root.querySelectorAll('a,button,summary').forEach((a) => {
    const cs = getComputedStyle(a); const r = a.getBoundingClientRect();
    if (cs.display === 'none' || r.width < 2 || a.closest('[hidden],[inert]') || cs.visibility === 'hidden' || a.classList.contains('cs-sr')) return;
    const inline = cs.display === 'inline' && a.closest('p,li') && a.parentElement.textContent.trim() !== a.textContent.trim();
    if (r.height < 44 && !inline) out.taps.push(`${Math.round(r.height)}h <${a.tagName.toLowerCase()}.${String(a.className).split(' ')[0]}> "${a.textContent.trim().slice(0, 30)}"`);
  });
  root.querySelectorAll('h1,h2').forEach((h) => { const e = h.querySelector('em,span,.pa-em'); if (e && e !== h) { const c1 = getComputedStyle(h).color, c2 = getComputedStyle(e).color; if (c1 !== c2) out.em.push(`${h.tagName} "${h.textContent.trim().slice(0, 60)}" em="${e.textContent.trim()}" ${c2}`); } });
  root.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => out.headings.push(h.tagName + ' ' + h.textContent.trim().slice(0, 40)));
  return JSON.stringify(out);
})()
