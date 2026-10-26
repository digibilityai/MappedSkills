/** Original editorial illustrations (no photographs, no real or concept property images, no people, no brand marks). */

export function HeroArt() {
  return <svg className="re-art" viewBox="0 0 580 450" role="img" aria-label="Illustration: a residential tower with floating cards for searching for homes, exploring projects, enquiring about details and planning a site visit.">
    <circle className="re-blob" cx="300" cy="250" r="190" />
    <g className="re-tower">
      <rect className="re-fill" x="250" y="70" width="170" height="330" rx="6" />
      <path className="re-acc" d="M250 70h170v34H250z" />
      <g className="re-win">
        {[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c => <rect key={`${r}${c}`} x={268 + c * 50} y={124 + r * 50} width="32" height="30" rx="3" />))}
      </g>
      <path className="re-line" d="M262 154h146M262 204h146M262 254h146M262 304h146" />
      <rect className="re-door" x="316" y="352" width="38" height="48" rx="3" />
      <path className="re-line" d="M200 400h300" />
    </g>
    <g className="re-tree"><circle className="re-leaf" cx="222" cy="372" r="24" /><path className="re-line" d="M222 396v6" /></g>
    <g className="re-tree"><circle className="re-leaf" cx="456" cy="378" r="18" /><path className="re-line" d="M456 396v6" /></g>
    <g className="re-card re-card--1"><rect className="re-fill" x="40" y="60" width="170" height="64" rx="12" transform="rotate(-4 125 92)" /><circle className="re-acc" cx="76" cy="92" r="16" transform="rotate(-4 125 92)" /><text x="102" y="88" className="re-t" transform="rotate(-4 125 92)">Search</text><text x="102" y="108" className="re-t" transform="rotate(-4 125 92)">for homes</text></g>
    <g className="re-card re-card--2"><rect className="re-fill" x="30" y="156" width="170" height="64" rx="12" transform="rotate(3 115 188)" /><rect className="re-acc" x="50" y="174" width="30" height="30" rx="6" transform="rotate(3 65 189)" /><text x="92" y="184" className="re-t" transform="rotate(3 115 188)">Explore</text><text x="92" y="204" className="re-t" transform="rotate(3 115 188)">projects</text></g>
    <g className="re-card re-card--3"><rect className="re-fill" x="40" y="254" width="180" height="64" rx="12" transform="rotate(-3 130 286)" /><path className="re-acc" d="M54 272h34v24H72l-8 8v-8h-10z" transform="rotate(-3 71 285)" /><text x="102" y="282" className="re-t" transform="rotate(-3 130 286)">Enquire</text><text x="102" y="302" className="re-t" transform="rotate(-3 130 286)">about details</text></g>
    <g className="re-card re-card--4"><rect className="re-fill" x="400" y="150" width="160" height="70" rx="12" transform="rotate(4 480 185)" /><rect className="re-acc" x="500" y="164" width="40" height="40" rx="6" transform="rotate(4 520 184)" /><text x="414" y="182" className="re-t" transform="rotate(4 480 185)">Plan a</text><text x="414" y="202" className="re-t" transform="rotate(4 480 185)">site visit</text></g>
    <path className="re-route" pathLength="1" d="M206 112 C236 120, 228 170, 256 188" />
  </svg>;
}

export function Icon({ k }: { k: string }) {
  return <svg className="re-icon" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    {k === 'tower' && <><rect x="10" y="5" width="20" height="30" rx="2" /><path d="M16 12h2M22 12h2M16 18h2M22 18h2M16 24h2M22 24h2M18 35v-6h4v6" /></>}
    {k === 'home' && <><path d="M5 19 20 6l15 13M9 17v17h22V17M16 34V24h8v10" /></>}
    {k === 'partner' && <><rect x="5" y="14" width="30" height="20" rx="3" /><path d="M14 14v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M5 24h30" /></>}
    {k === 'pin' && <><path d="M20 35c-8-8-12-14-12-19a12 12 0 0 1 24 0c0 5-4 11-12 19z" /><circle cx="20" cy="16" r="4" /></>}
    {k === 'price' && <><path d="M12 9h18M12 16h18M12 9c9 0 12 4 12 8s-4 8-12 8l12 10" /></>}
    {k === 'calendar' && <><rect x="6" y="9" width="28" height="25" rx="3" /><path d="M6 17h28M13 5v7M27 5v7" /></>}
    {k === 'present' && <><rect x="5" y="8" width="30" height="24" rx="3" /><path d="m8 29 9-9 6 6 4-4 6 7M26 15h.01" /></>}
    {k === 'phone' && <><path d="M12 6h6l3 8-4 3c2 4 5 7 9 9l3-4 8 3v6c0 2-2 3-4 3C16 34 6 22 6 10c0-2 2-4 6-4z" /></>}
    {k === 'discover' && <><rect x="12" y="3" width="16" height="34" rx="4" /><path d="M16 11h8M16 17h8M16 23h5" /></>}
    {k === 'explore' && <><path d="M7 34V14l13-8 13 8v20zM15 34v-9h10v9" /></>}
    {k === 'enquire' && <><path d="M6 8h28v18H17l-7 6v-6H6z" /><path d="M13 15h14M13 20h9" /></>}
    {k === 'visit' && <><path d="M20 35c-8-8-12-14-12-19a12 12 0 0 1 24 0c0 5-4 11-12 19z" /><path d="m14 16 4 4 8-8" /></>}
    {k === 'decide' && <><path d="M5 22l8-7 9 3 7-6 6 5-9 12-9 2z" /><path d="m13 15 5 13" /></>}
  </svg>;
}

export function Venn() {
  return <svg className="re-venn" viewBox="0 0 420 240" aria-hidden="true" focusable="false">
    <circle className="re-vc re-vc--a" cx="160" cy="120" r="96" />
    <circle className="re-vc re-vc--b" cx="260" cy="120" r="96" />
    <path className="re-vmid" d="M210 38A96 96 0 0 1 210 202A96 96 0 0 1 210 38z" />
  </svg>;
}
