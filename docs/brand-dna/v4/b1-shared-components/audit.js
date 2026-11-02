(() => {
  const roots = { header: '.dc-hdr', footer: '.dc-ftr', showcase: '.cs' };
  const out = { w: innerWidth, small: [], taps: [], dashes: [], em: [] };
  for (const [name, sel] of Object.entries(roots)) {
    document.querySelectorAll(sel).forEach((root) => {
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const seen = new Set();
      for (let n; (n = w.nextNode()); ) {
        const t = n.textContent.trim();
        if (!t) continue;
        const el = n.parentElement;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[hidden]')) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) continue;
        const px = parseFloat(cs.fontSize);
        const key = name + '|' + (el.className || el.tagName) + '|' + px;
        if (px < 14 && !seen.has(key)) { seen.add(key); out.small.push(`${name} ${px.toFixed(2)}px <${el.tagName.toLowerCase()} .${String(el.className).slice(0, 40)}> "${t.slice(0, 40)}"`); }
        if (/[–—]/.test(t)) out.dashes.push(`${name} "${t.slice(0, 60)}"`);
      }
      root.querySelectorAll('a,button').forEach((a) => {
        const cs = getComputedStyle(a); const r = a.getBoundingClientRect();
        if (cs.display === 'none' || r.width < 2 || a.closest('[hidden]') || cs.visibility === 'hidden') return;
        if (cs.position === 'absolute' && a.className.includes('cs-sr')) return;
        if (r.height < 44 && !a.classList.contains('cs-cta')) out.taps.push(`${name} ${Math.round(r.height)}h x ${Math.round(r.width)}w <${a.tagName.toLowerCase()} .${String(a.className).slice(0, 30)}> "${a.textContent.trim().slice(0, 30)}"`);
      });
      root.querySelectorAll('h2 em').forEach((e) => out.em.push(`${name} em color ${getComputedStyle(e).color} vs h2 ${getComputedStyle(e.parentElement).color}: "${e.textContent}"`));
    });
  }
  out.small = [...new Set(out.small)]; out.taps = [...new Set(out.taps)];
  return JSON.stringify(out, null, 1);
})()
