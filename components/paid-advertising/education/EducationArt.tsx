/** Original editorial illustrations (no photographs, no faces of real people, no brand marks). Decorative unless labelled. */

export function HeroArt() {
  return <svg className="ed-art" viewBox="0 0 580 440" role="img" aria-label="Illustration: a learner with a tablet, and floating course cards for online courses, coaching classes and skill training, leading from interest to enrolment.">
    <circle className="ed-blob" cx="250" cy="250" r="190" />
    <circle className="ed-blob ed-blob--2" cx="470" cy="380" r="70" />
    <g className="ed-learner">
      <path className="ed-body" d="M110 420c0-70 40-112 98-112s98 42 98 112z" />
      <path className="ed-fill" d="M160 330l14 36M256 330l-14 36" />
      <circle className="ed-fill" cx="208" cy="236" r="46" />
      <path className="ed-hair" d="M160 232c-8-44 14-72 48-72s56 28 48 72c-8-24-22-34-48-34s-40 10-48 34z" />
      <path className="ed-line" d="M192 252q16 14 32 0" />
      <g className="ed-tablet"><rect className="ed-fill" x="198" y="316" width="104" height="76" rx="9" transform="rotate(-8 250 354)" /><path className="ed-acc" d="M238 338l22 11-22 11z" transform="rotate(-8 250 354)" /></g>
    </g>
    <g className="ed-card ed-card--1"><rect className="ed-fill" x="318" y="46" width="190" height="82" rx="12" transform="rotate(-5 413 87)" /><rect className="ed-thumb" x="330" y="58" width="64" height="54" rx="8" transform="rotate(-5 362 85)" /><text x="404" y="84" className="ed-t" transform="rotate(-5 413 87)">Online</text><text x="404" y="104" className="ed-t" transform="rotate(-5 413 87)">courses</text></g>
    <g className="ed-card ed-card--2"><rect className="ed-fill" x="352" y="156" width="190" height="82" rx="12" transform="rotate(3 447 197)" /><rect className="ed-thumb ed-thumb--b" x="364" y="168" width="64" height="54" rx="8" transform="rotate(3 396 195)" /><text x="438" y="192" className="ed-t" transform="rotate(3 447 197)">Coaching</text><text x="438" y="212" className="ed-t" transform="rotate(3 447 197)">classes</text></g>
    <g className="ed-card ed-card--3"><rect className="ed-fill" x="332" y="266" width="190" height="82" rx="12" transform="rotate(-3 427 307)" /><rect className="ed-thumb ed-thumb--c" x="344" y="278" width="64" height="54" rx="8" transform="rotate(-3 376 305)" /><text x="418" y="302" className="ed-t" transform="rotate(-3 427 307)">Skill</text><text x="418" y="322" className="ed-t" transform="rotate(-3 427 307)">training</text></g>
    <path className="ed-route" pathLength="1" d="M262 214 C300 170, 300 110, 330 96" />
    <text className="ed-hand" x="330" y="26">From interest to enrolment</text>
  </svg>;
}

export function Icon({ k }: { k: string }) {
  return <svg className="ed-icon" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    {k === 'courses' && <><rect x="5" y="8" width="30" height="21" rx="3" /><path d="M16 14l9 4.500-9 4.500zM13 34h14" /></>}
    {k === 'coaching' && <><circle cx="14" cy="14" r="5" /><circle cx="28" cy="16" r="4" /><path d="M5 33c0-6 4-10 9-10s9 4 9 10M24 24c5-1 10 2 10 9" /></>}
    {k === 'training' && <><circle cx="20" cy="20" r="6" /><path d="M20 5v5M20 30v5M5 20h5M30 20h5M9.500 9.500l3.500 3.500M27 27l3.500 3.500M9.500 30.500l3.500-3.500M27 13l3.500-3.500" /></>}
    {k === 'programmes' && <><path d="M5 9c5-2 10-2 15 2v21c-5-4-10-4-15-2zM35 9c-5-2-10-2-15 2v21c5-4 10-4 15-2z" /></>}
    {k === 'reach' && <><circle cx="20" cy="20" r="13" /><circle cx="20" cy="20" r="7" /><circle cx="20" cy="20" r="2" /></>}
    {k === 'enquire' && <><path d="M6 8h28v18H17l-7 6v-6H6z" /><path d="M13 15h14M13 20h9" /></>}
    {k === 'review' && <><path d="M7 33V20M16 33V12M25 33V24M34 33V8" /></>}
    {k === 'search' && <><circle cx="17" cy="17" r="10" /><path d="m25 25 10 10" /></>}
    {k === 'compare' && <><rect x="4" y="9" width="32" height="20" rx="3" /><path d="M2 33h36M12 16h16M12 22h10" /></>}
    {k === 'chat' && <><path d="M6 8h28v18H17l-7 6v-6H6z" /><path d="M13 15h14M13 20h9" /></>}
    {k === 'counsel' && <><circle cx="15" cy="13" r="6" /><path d="M4 34c0-8 5-12 11-12s11 4 11 12M26 10h10v8h-4l-4 4v-4h-2z" /></>}
    {k === 'enrol' && <><path d="m3 16 17-8 17 8-17 8zM10 20v9c4 4 16 4 20 0v-9" /><path d="M37 16v10" /></>}
    {k === 'feed' && <><rect x="10" y="3" width="20" height="34" rx="5" /><rect x="14" y="8" width="12" height="9" rx="2" /><path d="M14 22h12M14 27h8" /></>}
  </svg>;
}

export function Venn() {
  return <svg className="ed-venn" viewBox="0 0 420 240" aria-hidden="true" focusable="false">
    <circle className="ed-vc ed-vc--a" cx="160" cy="120" r="96" />
    <circle className="ed-vc ed-vc--b" cx="260" cy="120" r="96" />
    <path className="ed-vmid" d="M210 38A96 96 0 0 1 210 202A96 96 0 0 1 210 38z" />
  </svg>;
}
