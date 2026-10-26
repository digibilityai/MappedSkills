/** Original illustrations for the featured-work cards. Deliberately NOT photographs: they must not be mistaken for the actual
 * Wanderlooms or Om Sai campaigns, products or projects. Decorative (aria-hidden); no captions. */
export function FeaturedArt({ kind }: { kind: 'wanderlooms' | 'om-sai' }) {
  return <div className={`pa-photo pa-art pa-art--${kind}`} aria-hidden="true">
    {kind === 'wanderlooms' ? <svg viewBox="0 0 680 400" preserveAspectRatio="xMidYMid slice" focusable="false">
      <circle className="fa-sun" cx="520" cy="110" r="52" />
      <path className="fa-far" d="M0 290 120 170l70 70 90-110 110 130 80-70 120 110 90-60V400H0z" />
      <path className="fa-near" d="M0 340 150 230l90 80 110-120 140 150 90-60 100 70v50H0z" />
      <path className="fa-trail" d="M80 380C200 340 260 350 330 300S470 260 600 200" />
      <g className="fa-jacket"><path d="M270 150l36-22h56l36 22 26 70-30 12-10-34v112h-100V198l-10 34-30-12z" /><path d="M334 128v120M334 128c-10 14-10 26 0 36M362 128c10 14 10 26 0 36" /></g>
      <g className="fa-pack"><rect x="470" y="200" width="70" height="92" rx="22" /><path d="M486 200v-14a20 20 0 0 1 38 0v14M486 236h38" /></g>
    </svg> : <svg viewBox="0 0 680 400" preserveAspectRatio="xMidYMid slice" focusable="false">
      <circle className="fa-sun" cx="560" cy="86" r="46" />
      <g className="fa-block fa-block--a"><rect x="60" y="150" width="130" height="250" rx="4" />{[0, 1, 2, 3, 4].map(r => [0, 1].map(c => <rect key={`a${r}${c}`} className="fa-w" x={82 + c * 52} y={176 + r * 42} width="32" height="26" rx="3" />))}</g>
      <g className="fa-block fa-block--b"><rect x="236" y="70" width="170" height="330" rx="4" /><path className="fa-cap" d="M236 70h170v30H236z" />{[0, 1, 2, 3, 4, 5].map(r => [0, 1, 2].map(c => <rect key={`b${r}${c}`} className="fa-w" x={256 + c * 48} y={122 + r * 42} width="30" height="26" rx="3" />))}</g>
      <g className="fa-block fa-block--c"><rect x="452" y="170" width="140" height="230" rx="4" />{[0, 1, 2, 3].map(r => [0, 1].map(c => <rect key={`c${r}${c}`} className="fa-w" x={474 + c * 58} y={196 + r * 42} width="34" height="26" rx="3" />))}</g>
      <path className="fa-ground" d="M0 400V372h680v28z" />
      <circle className="fa-tree" cx="214" cy="364" r="18" /><circle className="fa-tree" cx="432" cy="368" r="14" />
    </svg>}
  </div>;
}
