/** Product-neutral editorial illustrations. Decorative; each carries a text equivalent through its container. */

export function HeroArt() {
  return <svg className="dx-art" viewBox="0 0 540 420" role="img" aria-label="Illustration: simple products on a shelf, connected by a route to a storefront.">
    <g className="dx-shelf">
      <path d="M24 214h262" className="dx-line" />
      <path d="M44 214v34M266 214v34" className="dx-line" />
      <g className="dx-prod dx-prod--1"><rect x="48" y="132" width="44" height="82" rx="14" className="dx-fill" /><rect x="58" y="112" width="24" height="24" rx="5" className="dx-fill" /><rect x="52" y="160" width="36" height="22" rx="4" className="dx-acc" /></g>
      <g className="dx-prod dx-prod--2"><rect x="112" y="150" width="62" height="64" rx="5" className="dx-fill" /><path d="M112 168h62M143 150v18" className="dx-line" /></g>
      <g className="dx-prod dx-prod--3"><path d="M194 214l8-62h48l8 62z" className="dx-fill" /><path d="M214 152c0-24 24-24 24 0" className="dx-line" fill="none" /><circle cx="226" cy="186" r="8" className="dx-acc" /></g>
      <g className="dx-prod dx-prod--4"><rect x="50" y="62" width="36" height="34" rx="6" className="dx-fill" /><rect x="54" y="52" width="28" height="12" rx="4" className="dx-acc" /></g>
    </g>
    <g className="dx-store">
      <rect x="350" y="170" width="160" height="176" rx="6" className="dx-fill" />
      <path d="M340 170h180l-16-48H356z" className="dx-fill" />
      <path d="M356 122h30l-6 48h-30zM416 122h30l-4 48h-30zM476 122h28l4 48h-30z" className="dx-acc" />
      <rect x="372" y="206" width="60" height="62" rx="5" className="dx-win" />
      <rect x="448" y="224" width="40" height="122" rx="4" className="dx-door" />
      <path d="M350 346h160" className="dx-line" />
    </g>
    <path className="dx-route" pathLength="1" d="M286 196 C330 120, 330 330, 380 300 S 440 290, 468 300" />
    <path className="dx-arrow" d="m458 291 12 9-12 9" />
    <circle className="dx-dot" cx="286" cy="196" r="7" />
  </svg>;
}

export function RolesArt({ kind }: { kind: 'search' | 'feed' }) {
  return <svg className="dx-lane-art" viewBox="0 0 120 64" aria-hidden="true" focusable="false">
    {kind === 'search' ? <><rect x="6" y="14" width="108" height="30" rx="15" className="dx-fill" /><circle cx="28" cy="29" r="7" className="dx-line" fill="none" /><path d="m33 34 6 6" className="dx-line" /><path d="M50 29h52" className="dx-line" /></>
      : <><rect x="34" y="2" width="52" height="60" rx="9" className="dx-fill" /><rect x="40" y="10" width="40" height="18" rx="3" className="dx-acc" /><path d="M40 36h40M40 44h28" className="dx-line" /></>}
  </svg>;
}

export function BalanceArt() {
  return <svg className="dx-balance" viewBox="0 0 360 250" aria-hidden="true" focusable="false">
    <path d="M180 120v100M130 222h100" className="dx-bline" />
    <path d="M180 120l-16 26h32z" className="dx-bfill" />
    <g className="dx-beam">
      <path d="M50 120h260" className="dx-bline dx-bline--beam" />
      <path d="M50 120l-24 74M50 120l24 74M26 194h48" className="dx-bline" />
      <path d="M310 120l-24 74M310 120l24 74M286 194h48" className="dx-bline" />
      <rect x="22" y="194" width="56" height="12" rx="6" className="dx-bfill" />
      <rect x="282" y="194" width="56" height="12" rx="6" className="dx-bacc" />
    </g>
  </svg>;
}

export function Glyph({ k }: { k: string }) {
  return <svg className="dx-glyph" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    {k === 'demand' && <><path d="M6 30l9-9 6 6 13-15" /><path d="M26 12h8v8" /></>}
    {k === 'margin' && <><circle cx="20" cy="20" r="13" /><path d="M14 26L26 14M15 15h.01M25 25h.01" /></>}
    {k === 'store' && <><rect x="12" y="4" width="16" height="32" rx="4" /><path d="M17 31h6" /></>}
    {k === 'stock' && <><path d="M6 14l14-8 14 8v16l-14 8-14-8z" /><path d="M6 14l14 8 14-8M20 22v16" /></>}
    {k === 'trust' && <path d="m20 5 4.500 9.500L35 16l-7.500 7.200L29.500 34 20 29l-9.500 5 2-10.800L5 16l10.500-1.500z" />}
    {k === 'returns' && <><path d="M10 14h16a8 8 0 0 1 0 16H12" /><path d="m16 8-6 6 6 6" /></>}
    {k === 'offer' && <><path d="M5 20 20 5h14v14L19 34z" /><circle cx="27" cy="12" r="2" /></>}
  </svg>;
}
