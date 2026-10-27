import Link from 'next/link';
import Image from 'next/image';
import { RvReveal3 } from '@/components/resolve-home-r3/RvReveal3';
import { InViewOnce } from './InViewOnce';
import { HERO, CHALLENGE, DISCOVER, JOURNEYS, CHANNELS, READY, MANAGE, MEASURE, WORK, FAQS, CLOSE } from './content';
import '@/components/resolve-home-r3/resolve-home-r3.css';
import './education-r2.css';

/**
 * /who-we-help/education, Education and Training R2 (review variant, NOT live). Reuses the approved R3 stylesheet (`.rv3`) for
 * grounds, type, buttons, FAQ and closing band; adds `.edr2` rules. Grounds: Ink Deep, Paper, Ground, Ink Deep, Paper, Ground,
 * Paper, Ink Deep, Paper, Ink Deep, closing band. Remove: see docs/education-r2/EDUCATION_R2_REPORT.md.
 */
const REVEAL = { 'data-rv': '' } as const;

function Cta({ href = '/contact', children, tone = 'tang' }: { href?: string; children: React.ReactNode; tone?: 'tang' | 'paper' }) {
  return <Link className={`rv3-btn rv3-btn--${tone}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link className={`rv3-tl${dark ? ' rv3-tl--dark' : ''}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
const H2 = ({ id, parts }: { id: string; parts: readonly [string, string] }) => <h2 id={id}>{parts[0]}<em>{parts[1]}</em></h2>;
const Tick = () => <svg className="edr2-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/** Small line icons for the four advertising roles and the two entry behaviours. */
function Icon({ k }: { k: string }) {
  const p = { className: 'edr2-ic', viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, focusable: false };
  if (k === 'search') return <svg {...p}><circle cx="14" cy="14" r="7" /><path d="m19.5 19.5 7 7" /></svg>;
  if (k === 'feed' || k === 'browse') return <svg {...p}><rect x="5" y="4" width="22" height="24" rx="4" /><rect x="9" y="8" width="14" height="9" rx="2" /><path d="M9 22h10M9 25h6" /></svg>;
  if (k === 'video') return <svg {...p}><rect x="3" y="7" width="26" height="18" rx="5" /><path d="m13 12 7 4-7 4z" /></svg>;
  return <svg {...p}><path d="M5 8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H14l-6 5v-5a3 3 0 0 1-3-3z" /><path d="M11 12h10M11 16h6" /></svg>;
}

/** Hero illustration: two ways in (searching, browsing) resolve into one course page, which may lead to a purchase, an enquiry or a
 * registration. The whole scene is a quiet outline from the first frame, then each step comes to full strength once (about 2.6 s).
 * Static final state under reduced motion or without script. No figures, no guarantee: outcomes are dashed, they may happen. */
function HeroArt() {
  return <svg className="edr2-art" viewBox="0 0 560 360" role="img" aria-label="A learner who is searching for a course and a learner who finds one while browsing both reach a course page. From there a learner may buy online, enquire, or register for a demo class or webinar." focusable="false">
    <g className="edr2-n edr2-n1">
      <rect x="16" y="24" width="188" height="128" rx="18" className="edr2-card" />
      <rect x="34" y="42" width="152" height="30" rx="15" className="edr2-field" />
      <circle cx="54" cy="57" r="6" className="edr2-stroke" fill="none" /><path d="m59 62 5 5" className="edr2-stroke" strokeLinecap="round" />
      <rect x="74" y="53" width="70" height="8" rx="4" className="edr2-line" />
      <rect x="34" y="88" width="120" height="8" rx="4" className="edr2-line" /><rect x="34" y="106" width="150" height="8" rx="4" className="edr2-line" /><rect x="34" y="124" width="90" height="8" rx="4" className="edr2-line" />
    </g>
    <g className="edr2-n edr2-n2">
      <rect x="16" y="208" width="188" height="128" rx="18" className="edr2-card" />
      <rect x="34" y="226" width="152" height="68" rx="10" className="edr2-img" />
      <circle cx="110" cy="260" r="16" className="edr2-btn" /><path d="m105 252 12 8-12 8z" className="edr2-play" />
      <rect x="34" y="306" width="104" height="8" rx="4" className="edr2-line" />
    </g>
    <path className="edr2-link edr2-l1" d="M206 100c24 0 28 54 52 70" /><path className="edr2-link edr2-l2" d="M206 272c24 0 28-54 52-70" />
    <g className="edr2-n edr2-n3">
      <rect x="256" y="88" width="136" height="184" rx="18" className="edr2-card edr2-card--hi" />
      <rect x="272" y="104" width="104" height="54" rx="8" className="edr2-img" />
      <rect x="272" y="172" width="80" height="9" rx="4.5" className="edr2-line" /><rect x="272" y="190" width="104" height="8" rx="4" className="edr2-line" /><rect x="272" y="206" width="64" height="8" rx="4" className="edr2-line" />
      <rect x="272" y="230" width="104" height="22" rx="11" className="edr2-btn" />
    </g>
    <g className="edr2-n edr2-n4">
      <path className="edr2-link edr2-link--on" d="M394 150c20 0 12-80 34-80M394 180h34M394 210c20 0 12 80 34 80" />
      <g className="edr2-out">
        <rect x="430" y="40" width="114" height="60" rx="14" className="edr2-chip" />
        <path d="M456 60h5l5 18h18l4-12h-24" className="edr2-stroke" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="468" cy="84" r="2.6" className="edr2-fill" /><circle cx="480" cy="84" r="2.6" className="edr2-fill" />
        <rect x="498" y="62" width="32" height="7" rx="3.5" className="edr2-line" /><rect x="498" y="76" width="22" height="7" rx="3.5" className="edr2-line" />
      </g>
      <g className="edr2-out">
        <rect x="430" y="150" width="114" height="60" rx="14" className="edr2-chip" />
        <path d="M452 165h34a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5h-20l-9 8v-8a5 5 0 0 1-5-5v-14a5 5 0 0 1 5-5z" className="edr2-stroke" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="498" y="172" width="32" height="7" rx="3.5" className="edr2-line" /><rect x="498" y="186" width="22" height="7" rx="3.5" className="edr2-line" />
      </g>
      <g className="edr2-out">
        <rect x="430" y="260" width="114" height="60" rx="14" className="edr2-chip" />
        <rect x="450" y="276" width="38" height="30" rx="6" className="edr2-stroke" fill="none" /><path d="M450 286h38M460 272v8M478 272v8" className="edr2-stroke" strokeLinecap="round" />
        <rect x="498" y="282" width="32" height="7" rx="3.5" className="edr2-line" /><rect x="498" y="296" width="22" height="7" rx="3.5" className="edr2-line" />
      </g>
    </g>
  </svg>;
}

export function EducationR2() {
  return <div className="rv3 edr2">
    <RvReveal3 />

    {/* 1. Ink Deep: hero. Two ways in, one course page, several possible outcomes. */}
    <section className="rv3-hero rv3-dark edr2-hero" aria-labelledby="edr2-h1">
      <div className="rv3-wrap rv3-hero-grid">
        <div className="rv3-hero-copy">
          <p className="rv3-eyebrow">{HERO.eyebrow}</p>
          <h1 id="edr2-h1">{HERO.h1[0]}<em>{HERO.h1[1]}</em></h1>
          <p className="rv3-lede">{HERO.lede}</p>
          <div className="rv3-actions"><Cta>{HERO.cta}</Cta><TextLink href={HERO.secondary.href} dark>{HERO.secondary.label}</TextLink></div>
        </div>
        <figure className="rv3-hero-fig edr2-fig">
          <HeroArt />
          <figcaption>
            <ol className="edr2-cap-steps">{HERO.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            <small>{HERO.caption}</small>
          </figcaption>
        </figure>
      </div>
    </section>

    {/* 2. Paper: the central idea. Same number of enquiries can mean very different student numbers. */}
    <section className="edr2-ch rv3-paper" aria-labelledby="edr2-ch-h"><div className="rv3-wrap edr2-ch-grid">
      <div {...REVEAL}>
        <p className="rv3-eyebrow">{CHALLENGE.eyebrow}</p><H2 id="edr2-ch-h" parts={CHALLENGE.h2} />
        <p className="edr2-lede">{CHALLENGE.lede}</p>
      </div>
      <div className="edr2-chart" {...REVEAL}>
        <p className="edr2-chart-l">{CHALLENGE.chart.label}</p>
        <InViewOnce className="edr2-chart-in">
          <ul>{CHALLENGE.chart.rows.map((r, i) => <li key={r.k} style={{ '--r': i } as React.CSSProperties}>
            <h3>{r.t}</h3>
            <div className="edr2-bars" aria-hidden="true">
              <span className="edr2-bar edr2-bar--e"><i style={{ width: `${r.e}%` }} /></span>
              <span className="edr2-bar edr2-bar--s"><i style={{ width: `${r.s}%` }} /></span>
            </div>
          </li>)}</ul>
        </InViewOnce>
        <p className="edr2-legend"><span className="edr2-sw edr2-sw--e" aria-hidden="true" />{CHALLENGE.chart.e}<span className="edr2-sw edr2-sw--s" aria-hidden="true" />{CHALLENGE.chart.s}</p>
        <p className="edr2-cap">{CHALLENGE.chart.caption}</p>
      </div>
    </div></section>

    {/* 3. Ground: how learners arrive and what they weigh up. */}
    <section className="edr2-dc rv3-ground" aria-labelledby="edr2-dc-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{DISCOVER.eyebrow}</p><H2 id="edr2-dc-h" parts={DISCOVER.h2} /><p className="rv3-intro">{DISCOVER.lede}</p></header>
      <div className="edr2-dc-grid">
        <ul className="edr2-entries">{DISCOVER.entries.map((e) => <li key={e.k} {...REVEAL}><Icon k={e.k} /><div><h3>{e.t}</h3><p>{e.d}</p><span className="edr2-tag">{e.tag}</span></div></li>)}</ul>
        <div className="edr2-weigh" {...REVEAL}><h3>{DISCOVER.weigh.t}</h3><ul>{DISCOVER.weigh.items.map((w) => <li key={w}>{w}</li>)}</ul></div>
      </div>
    </div></section>

    {/* 4. Ink Deep: three alternative routes, each revealed on its own. */}
    <section className="edr2-jr rv3-dark" aria-labelledby="edr2-jr-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{JOURNEYS.eyebrow}</p><H2 id="edr2-jr-h" parts={JOURNEYS.h2} /><p className="rv3-intro">{JOURNEYS.lede}</p></header>
      <ul className="edr2-paths">
        {JOURNEYS.paths.map((p) => <li key={p.id} className={`edr2-path edr2-path--${p.id}`}>
          <InViewOnce className="edr2-path-in" threshold={0.35}>
            <p className="edr2-chan">{p.tag}</p>
            <h3>{p.t}</h3>
            <ol>{p.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            <p className="edr2-end"><span aria-hidden="true" />{p.end}</p>
            <p className="edr2-who">{p.who}</p>
          </InViewOnce>
        </li>)}
      </ul>
    </div></section>

    {/* 5. Paper: which kind of advertising does which job. */}
    <section className="edr2-ch2 rv3-paper" aria-labelledby="edr2-ch2-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{CHANNELS.eyebrow}</p><H2 id="edr2-ch2-h" parts={CHANNELS.h2} /><p className="rv3-intro">{CHANNELS.lede}</p></header>
      <ul className="edr2-roles">
        {CHANNELS.items.map((r) => <li key={r.k} {...REVEAL}>
          <Icon k={r.k} />
          <p className="edr2-plat">{r.platform}</p>
          <h3>{r.t}</h3>
          <p className="edr2-role-d">{r.d}</p>
          <p className="edr2-role-f"><strong>Fits when</strong> {r.fit}</p>
        </li>)}
      </ul>
      <div className="edr2-links" {...REVEAL}><TextLink href={CHANNELS.links.google.href}>{CHANNELS.links.google.label}</TextLink><TextLink href={CHANNELS.links.meta.href}>{CHANNELS.links.meta.label}</TextLink></div>
    </div></section>

    {/* 6. Ground: readiness. */}
    <section className="edr2-rd rv3-ground" aria-labelledby="edr2-rd-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{READY.eyebrow}</p><H2 id="edr2-rd-h" parts={READY.h2} /><p className="rv3-intro">{READY.lede}</p></header>
      <ul className="edr2-checks">{READY.items.map((c) => <li key={c.t} {...REVEAL}><Tick /><div><h3>{c.t}</h3><p>{c.d}</p></div></li>)}</ul>
      <div className="edr2-rd-cta" {...REVEAL}><p>{READY.cta.lead}</p><Cta>{READY.cta.label}</Cta></div>
    </div></section>

    {/* 7. Paper: the handoff. Advertising, then the learner's action, then the institute's own step. Once-only, alternatives not steps. */}
    <section className="edr2-mg rv3-paper" aria-labelledby="edr2-mg-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{MANAGE.eyebrow}</p><H2 id="edr2-mg-h" parts={MANAGE.h2} /><p className="rv3-intro">{MANAGE.lede}</p></header>
      <InViewOnce className="edr2-hand" threshold={0.3}>
        <div className="edr2-h-col edr2-h-us">
          <p className="edr2-h-tag">{MANAGE.us.tag}</p><h3>{MANAGE.us.t}</h3><p>{MANAGE.us.d}</p>
          <ul>{MANAGE.us.items.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <span className="edr2-h-arrow" aria-hidden="true"><i /></span>
        <div className="edr2-h-col edr2-h-act">
          <p className="edr2-h-tag">{MANAGE.action.tag}</p><h3>{MANAGE.action.t}</h3>
          <ul>{MANAGE.action.items.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="edr2-h-sm">{MANAGE.action.note}</p>
        </div>
        <span className="edr2-h-arrow" aria-hidden="true"><i /></span>
        <div className="edr2-h-col edr2-h-you">
          <p className="edr2-h-tag">{MANAGE.you.tag}</p><h3>{MANAGE.you.t}</h3><p>{MANAGE.you.d}</p>
          <ul className="edr2-h-cases">{MANAGE.you.cases.map((c) => <li key={c.k}><b>{c.t}</b><span>{c.d}</span></li>)}</ul>
        </div>
      </InViewOnce>
    </div></section>

    {/* 8. Ink Deep: measurement. */}
    <section className="edr2-ms rv3-dark" aria-labelledby="edr2-ms-h"><div className="rv3-wrap edr2-ms-grid">
      <div {...REVEAL}>
        <p className="rv3-eyebrow">{MEASURE.eyebrow}</p><H2 id="edr2-ms-h" parts={MEASURE.h2} />
        <p className="edr2-lede">{MEASURE.lede}</p>
        <div className="edr2-warn"><h3>{MEASURE.warn.h}</h3><p>{MEASURE.warn.d}</p></div>
      </div>
      <div {...REVEAL}>
        <ol className="edr2-ladder">{MEASURE.ladder.map((m, i) => <li key={m.t} style={{ '--i': i } as React.CSSProperties}><span className="edr2-ladder-n" aria-hidden="true" /><div><h3>{m.t}</h3><p>{m.d}</p></div></li>)}</ol>
      </div>
    </div></section>

    {/* 9. Paper: AnyBodyCanBake, the only education example. No figures. */}
    <section id="client-work" className="edr2-wk rv3-paper" aria-labelledby="edr2-wk-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{WORK.eyebrow}</p><H2 id="edr2-wk-h" parts={WORK.h2} /></header>
      <article className="edr2-card-w" {...REVEAL}>
        <div className="edr2-w-img">
          <Image src={WORK.item.img.src} alt={WORK.item.img.alt} fill sizes="(min-width: 861px) 640px, 100vw" />
          <span className="edr2-w-note">{WORK.item.img.note}</span>
        </div>
        <div className="edr2-w-body">
          <p className="edr2-plat">{WORK.item.tag}</p>
          <h3>{WORK.item.name}</h3>
          <p className="edr2-w-text">{WORK.item.body}</p>
          <ul className="edr2-w-did">{WORK.item.did.map((d) => <li key={d}><Tick />{d}</li>)}</ul>
          <p className="edr2-w-foot">{WORK.note}</p>
          <div className="edr2-w-links"><TextLink href={WORK.link.href}>{WORK.link.label}</TextLink><TextLink href={WORK.all.href}>{WORK.all.label}</TextLink></div>
        </div>
      </article>
    </div></section>

    {/* 10. Ink Deep: questions. */}
    <section className="rv3-fit rv3-dark" aria-labelledby="edr2-faq-h"><div className="rv3-wrap rv3-fit-grid">
      <div className="rv3-fit-price" {...REVEAL}>
        <p className="rv3-eyebrow">Questions</p><h2 id="edr2-faq-h">A few questions <em>before we talk</em></h2>
        <p>Cannot find your question? Ask us when you get in touch.</p>
      </div>
      <div className="rv3-faq" {...REVEAL}>{FAQS.map((f) => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}{'link' in f && f.link && <> <Link className="rv3-tl" href={f.link.href}>{f.link.label}<span aria-hidden="true">↗</span></Link></>}</p></details>)}</div>
    </div></section>

    {/* 11. Closing band, one CTA. */}
    <section className="rv3-close" aria-labelledby="edr2-close-h"><div className="rv3-wrap rv3-close-in" {...REVEAL}>
      <div><h2 id="edr2-close-h">{CLOSE.h}</h2><p>{CLOSE.body}</p></div>
      <Cta tone="paper">{CLOSE.cta}</Cta>
    </div></section>
  </div>;
}
