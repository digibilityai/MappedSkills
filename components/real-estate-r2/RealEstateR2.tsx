import Link from 'next/link';
import { RvReveal3 } from '@/components/resolve-home-r3/RvReveal3';
import { InViewOnce } from './InViewOnce';
import { HERO, AUDIENCES, JOURNEYS, PLATFORMS, DECISIONS, MEASURE, WORK, FAQS, CLOSE } from './content';
import '@/components/resolve-home-r3/resolve-home-r3.css';
import './real-estate-r2.css';

/**
 * /who-we-help/real-estate, Real Estate R2 (review variant, NOT live). Reuses the approved R3 stylesheet (`.rv3`) for grounds,
 * type, buttons, FAQ and closing band; adds `.rer2` rules. Grounds: Ink Deep (hero), Paper, Ink Deep (journey), Paper, Ground,
 * Ink Deep (measure), Paper (work), Ink Deep (FAQ), closing band. Remove: see docs/real-estate-r2/REAL_ESTATE_R2_REPORT.md.
 */
const REVEAL = { 'data-rv': '' } as const;

function Cta({ href = '/contact', children, tone = 'tang' }: { href?: string; children: React.ReactNode; tone?: 'tang' | 'paper' }) {
  return <Link className={`rv3-btn rv3-btn--${tone}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link className={`rv3-tl${dark ? ' rv3-tl--dark' : ''}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
const H2 = ({ id, parts }: { id: string; parts: readonly [string, string] }) => <h2 id={id}>{parts[0]}<em>{parts[1]}</em></h2>;

/** Small line icons. */
function Icon({ k }: { k: string }) {
  const p = { className: 'rer2-ic', viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, focusable: false };
  if (k === 'tower') return <svg {...p}><rect x="9" y="4" width="14" height="24" rx="2" /><path d="M13 9h2M17 9h2M13 14h2M17 14h2M13 19h2M17 19h2M14 28v-4h4v4" /></svg>;
  if (k === 'keys') return <svg {...p}><circle cx="10" cy="20" r="5" /><path d="m13.5 16.5 12-12M21 9l3 3M18 12l3 3" /></svg>;
  if (k === 'search') return <svg {...p}><circle cx="14" cy="14" r="7" /><path d="m19.5 19.5 7 7" /></svg>;
  if (k === 'feed') return <svg {...p}><rect x="5" y="4" width="22" height="24" rx="4" /><rect x="9" y="8" width="14" height="9" rx="2" /><path d="M9 22h10M9 25h6" /></svg>;
  if (k === 'pin') return <svg {...p}><path d="M16 28s8-7 8-14a8 8 0 0 0-16 0c0 7 8 14 8 14z" /><circle cx="16" cy="14" r="3" /></svg>;
  if (k === 'home') return <svg {...p}><path d="m4 15 12-10 12 10M7 13v14h18V13M13 27v-7h6v7" /></svg>;
  if (k === 'people') return <svg {...p}><circle cx="12" cy="11" r="4" /><path d="M4 27c0-5 3.500-8 8-8s8 3 8 8M22 8a4 4 0 0 1 0 7M25 27c0-3-1.500-5.500-4-6.800" /></svg>;
  if (k === 'text') return <svg {...p}><rect x="4" y="6" width="24" height="20" rx="4" /><path d="M9 13h14M9 18h9" /></svg>;
  return <svg {...p}><path d="M5 9h14M25 9h2M5 16h4M15 16h12M5 23h18M27 23h0" /><circle cx="22" cy="9" r="3" /><circle cx="12" cy="16" r="3" /><circle cx="26" cy="23" r="2" /></svg>;
}
const Tick = () => <svg className="rer2-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/** Hero illustration: four fit factors (buyer, location, budget, property) meet at one property enquiry. The scene is a quiet
 * outline from the first frame; each part then comes to full strength once (about 2.4 s). Static final state under reduced motion
 * or without script. The conversation at the end is dashed: it may happen. No figures, no result. */
function HeroArt() {
  return <svg className="rer2-art" viewBox="0 0 560 360" role="img" aria-label="Four factors, the buyer, the location, the budget and the property, come together in one property enquiry. The enquiry may lead to a conversation with the sales team." focusable="false">
    {HERO.fit.map((f, i) => <g key={f} className={`rer2-n rer2-f${i + 1}`}>
      <rect x="16" y={22 + i * 80} width="148" height="52" rx="14" className="rer2-card" />
      <circle cx="42" cy={48 + i * 80} r="9" className="rer2-dot" /><path d={`m37.500 ${48 + i * 80} 3.500 3.500 6-7`} className="rer2-tk" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="62" y={54 + i * 80} className="rer2-tx">{f}</text>
    </g>)}
    {[0, 1, 2, 3].map((i) => <path key={i} className="rer2-link rer2-l" d={`M166 ${48 + i * 80}C206 ${48 + i * 80} 206 ${110 + i * 40} 244 ${110 + i * 40}`} style={{ animationDelay: `${0.9 + i * 0.12}s` }} />)}
    <g className="rer2-n rer2-enq">
      <rect x="244" y="64" width="150" height="190" rx="18" className="rer2-card rer2-card--hi" />
      <rect x="260" y="80" width="118" height="62" rx="9" className="rer2-img" />
      <path d="M284 130v-34h28v34M320 130v-22h24v22M272 130h96" className="rer2-bld" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="260" y="156" width="86" height="9" rx="4.500" className="rer2-line" /><rect x="260" y="174" width="112" height="8" rx="4" className="rer2-line" /><rect x="260" y="190" width="70" height="8" rx="4" className="rer2-line" />
      <rect x="260" y="216" width="118" height="24" rx="12" className="rer2-btn" /><text x="319" y="233" textAnchor="middle" className="rer2-tx rer2-tx--b">Enquire</text>
    </g>
    <g className="rer2-n rer2-out">
      <path className="rer2-link rer2-link--on" d="M396 160h34" />
      <rect x="432" y="128" width="116" height="64" rx="16" className="rer2-chip" />
      <path d="M452 150h38a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5h-22l-9 8v-8h-7a5 5 0 0 1-5-5v-14a5 5 0 0 1 5-5z" className="rer2-stroke" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="490" y="214" textAnchor="middle" className="rer2-tx rer2-tx--s">May talk</text>
    </g>
  </svg>;
}

/** Conceptual illustration for the case card: an original tower, not the Om Sai project. */
function CaseArt() {
  return <svg className="rer2-case-art" viewBox="0 0 320 300" role="img" aria-label="Conceptual illustration of a residential tower. It is not the Om Sai project." focusable="false">
    <rect width="320" height="300" fill="#1B1822" />
    <path d="M0 250h320" stroke="#3A3544" strokeWidth="2" />
    <rect x="110" y="40" width="100" height="210" rx="6" fill="#2A2633" stroke="#3A3544" />
    <rect x="52" y="120" width="52" height="130" rx="5" fill="#221F2B" stroke="#3A3544" />
    <rect x="216" y="150" width="52" height="100" rx="5" fill="#221F2B" stroke="#3A3544" />
    {[0, 1, 2, 3, 4, 5].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={122 + c * 30} y={58 + r * 30} width="16" height="16" rx="3" fill={r === 2 && c === 1 ? '#FF5B04' : '#3A3544'} />))}
    <rect x="148" y="220" width="24" height="30" rx="3" fill="#FF5B04" opacity=".85" />
  </svg>;
}

export function RealEstateR2() {
  return <div className="rv3 rer2">
    <RvReveal3 />

    {/* 1. Ink Deep: hero. The H1 is the live production H1, unchanged. */}
    <section className="rv3-hero rv3-dark rer2-hero" aria-labelledby="rer2-h1">
      <div className="rv3-wrap rv3-hero-grid">
        <div className="rv3-hero-copy">
          <p className="rv3-eyebrow">{HERO.eyebrow}</p>
          <h1 id="rer2-h1">{HERO.h1[0]}<em>{HERO.h1[1]}</em></h1>
          <p className="rv3-lede">{HERO.lede}</p>
          <div className="rv3-actions"><Cta>{HERO.cta}</Cta><TextLink href={HERO.secondary.href} dark>{HERO.secondary.label}</TextLink></div>
        </div>
        <figure className="rv3-hero-fig rer2-fig">
          <HeroArt />
        </figure>
      </div>
    </section>

    {/* 2. Paper: two audiences, side by side, not interchangeable. */}
    <section className="rer2-au rv3-paper" aria-labelledby="rer2-au-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{AUDIENCES.eyebrow}</p><H2 id="rer2-au-h" parts={AUDIENCES.h2} /><p className="rv3-intro">{AUDIENCES.lede}</p></header>
      <ul className="rer2-aud">
        {AUDIENCES.items.map((a) => <li key={a.id} className={`rer2-aud-c rer2-aud-c--${a.id}`} {...REVEAL}>
          <Icon k={a.k} />
          <p className="rer2-tag">{a.tag}</p>
          <h3>{a.t}</h3>
          <p className="rer2-aud-d">{a.d}</p>
          <p className="rer2-aud-u">{a.useful}</p>
        </li>)}
      </ul>
    </div></section>

    {/* 3. Ink Deep: two independent journeys, each drawn once when first mostly in view. */}
    <section className="rer2-jr rv3-dark" aria-labelledby="rer2-jr-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{JOURNEYS.eyebrow}</p><H2 id="rer2-jr-h" parts={JOURNEYS.h2} /><p className="rv3-intro">{JOURNEYS.lede}</p></header>
      <InViewOnce className="rer2-jny" threshold={0.4}>
        <ol aria-label={JOURNEYS.label}>
          {JOURNEYS.steps.map((st, i) => <li key={st.t} className={'may' in st && st.may ? 'is-may' : undefined} style={{ '--i': i } as React.CSSProperties}>
            <b>{i === JOURNEYS.steps.length - 1 && <Icon k="pin" />}{st.t}</b><span>{st.d}</span>
          </li>)}
        </ol>
      </InViewOnce>
    </div></section>

    {/* 4. Paper: Google and Meta at different buyer moments. */}
    <section className="rer2-pl rv3-paper" aria-labelledby="rer2-pl-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{PLATFORMS.eyebrow}</p><H2 id="rer2-pl-h" parts={PLATFORMS.h2} /><p className="rv3-intro">{PLATFORMS.lede}</p></header>
      <ul className="rer2-roles">
        {PLATFORMS.items.map((r) => <li key={r.platform} {...REVEAL}>
          <Icon k={r.k} />
          <p className="rer2-tag">{r.platform}</p>
          <h3>{r.t}</h3>
          <p className="rer2-role-d">{r.d}</p>
          <ul className="rer2-role-f"><li>{r.dev}</li><li>{r.broker}</li></ul>
          <TextLink href={r.href}>{r.label}</TextLink>
        </li>)}
      </ul>
    </div></section>

    {/* 5. Ground: campaign decisions and who does what. */}
    <section className="rer2-dc rv3-ground" aria-labelledby="rer2-dc-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{DECISIONS.eyebrow}</p><H2 id="rer2-dc-h" parts={DECISIONS.h2} /><p className="rv3-intro">{DECISIONS.lede}</p></header>
      <ul className="rer2-checks">{DECISIONS.items.map((c) => <li key={c.t} {...REVEAL}><Icon k={c.k} /><div><h3>{c.t}</h3><p>{c.d}</p></div></li>)}</ul>
      <div className="rer2-who3" role="group" aria-label="Who does what">
        <div className="rer2-w rer2-w--we" {...REVEAL}><h3>{DECISIONS.who.we.t}</h3><p>{DECISIONS.who.we.d}</p></div>
        <div className="rer2-w rer2-w--you" {...REVEAL}><h3>{DECISIONS.who.you.t}</h3><p>{DECISIONS.who.you.d}</p></div>
      </div>
    </div></section>

    {/* 6. Ink Deep: measurement. */}
    <section className="rer2-ms rv3-dark" aria-labelledby="rer2-ms-h"><div className="rv3-wrap rer2-ms-grid">
      <div {...REVEAL}>
        <p className="rv3-eyebrow">{MEASURE.eyebrow}</p><H2 id="rer2-ms-h" parts={MEASURE.h2} />
        <p className="rer2-lede">{MEASURE.lede}</p>
        <div className="rer2-warn"><h3>{MEASURE.warn.h}</h3><p>{MEASURE.warn.d}</p></div>
      </div>
      <div {...REVEAL}>
        <ol className="rer2-ladder">{MEASURE.ladder.map((m, i) => <li key={m.t} style={{ '--i': i } as React.CSSProperties}><span className="rer2-ladder-n" aria-hidden="true" /><div><h3>{m.t}</h3><p>{m.d}</p></div></li>)}</ol>
      </div>
    </div></section>

    {/* 7. Paper: Om Sai, verified developer context only. No figures, no testimonial, no broker evidence. */}
    <section id="client-work" className="rer2-wk rv3-paper" aria-labelledby="rer2-wk-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{WORK.eyebrow}</p><H2 id="rer2-wk-h" parts={WORK.h2} /></header>
      <article className="rer2-card-w" {...REVEAL}>
        <div className="rer2-w-img"><CaseArt /><span className="rer2-w-note">{WORK.item.note}</span></div>
        <div className="rer2-w-body">
          <p className="rer2-tag">{WORK.item.tag}</p>
          <h3>{WORK.item.name}</h3>
          <p className="rer2-w-text">{WORK.item.body}</p>
          <ul className="rer2-w-did">{WORK.item.did.map((d) => <li key={d}><Tick />{d}</li>)}</ul>
          <div className="rer2-w-links"><TextLink href={WORK.link.href}>{WORK.link.label}</TextLink><TextLink href={WORK.all.href}>{WORK.all.label}</TextLink></div>
        </div>
      </article>
    </div></section>

    {/* 8. Ink Deep: questions. */}
    <section className="rv3-fit rv3-dark" aria-labelledby="rer2-faq-h"><div className="rv3-wrap rv3-fit-grid">
      <div className="rv3-fit-price" {...REVEAL}>
        <p className="rv3-eyebrow">Questions</p><h2 id="rer2-faq-h">A few questions <em>before we talk</em></h2>
        <p>Cannot find your question? Ask us when you get in touch.</p>
      </div>
      <div className="rv3-faq" {...REVEAL}>{FAQS.map((f) => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}{'link' in f && f.link && <> <Link className="rv3-tl" href={f.link.href}>{f.link.label}<span aria-hidden="true">↗</span></Link></>}</p></details>)}</div>
    </div></section>

    {/* 9. Closing band, one CTA. */}
    <section className="rv3-close" aria-labelledby="rer2-close-h"><div className="rv3-wrap rv3-close-in" {...REVEAL}>
      <div><h2 id="rer2-close-h">{CLOSE.h}</h2><p>{CLOSE.body}</p></div>
      <Cta tone="paper">{CLOSE.cta}</Cta>
    </div></section>
  </div>;
}
