import Link from 'next/link';
import Image from 'next/image';
import { RvReveal3 } from '@/components/resolve-home-r3/RvReveal3';
import { InViewOnce } from './InViewOnce';
import { HERO, CHALLENGE, SHOPPERS, HELP, READY, MEASURE, WORK, FAQS, CLOSE } from './content';
import '@/components/resolve-home-r3/resolve-home-r3.css';
import './d2c-r1.css';

/**
 * /who-we-help/d2c, D2C & Ecommerce R1 (review variant, NOT live). Reuses the approved R3 stylesheet (`.rv3`) for grounds,
 * type, buttons, FAQ and closing band; adds `.d2c1` rules. One message per section. Grounds: Ink Deep, Ground, Ink Deep, Paper,
 * Ground, Ink Deep, Paper, Ink Deep, closing band. Remove: see docs/d2c-r1/REVIEW.md.
 */
const REVEAL = { 'data-rv': '' } as const;

function Cta({ href = '/contact', children, tone = 'tang' }: { href?: string; children: React.ReactNode; tone?: 'tang' | 'paper' }) {
  return <Link className={`rv3-btn rv3-btn--${tone}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link className={`rv3-tl${dark ? ' rv3-tl--dark' : ''}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
const H2 = ({ id, parts }: { id: string; parts: readonly [string, string] }) => <h2 id={id}>{parts[0]}<em>{parts[1]}</em></h2>;
const Tick = () => <svg className="d2c1-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/** Hero illustration: a shopper finds a product, visits the store, considers buying; then the order and its cost are weighed.
 * Pure CSS, plays once and settles. Static final state under reduced motion. No figures. */
function HeroArt() {
  return <svg className="d2c1-art" viewBox="0 0 560 360" role="img" aria-label="A shopper finds a product, visits a store and considers buying. Below, what the order brings in is weighed against what it cost to win." focusable="false">
    <g className="d2c1-n d2c1-n1">
      <rect x="20" y="20" width="150" height="150" rx="18" className="d2c1-card" />
      <circle cx="82" cy="78" r="22" className="d2c1-stroke" fill="none" /><path d="m98 94 24 24" className="d2c1-stroke" strokeLinecap="round" />
      <rect x="44" y="132" width="102" height="8" rx="4" className="d2c1-line" /><rect x="44" y="148" width="64" height="8" rx="4" className="d2c1-line" />
    </g>
    <path className="d2c1-link d2c1-l1" d="M172 95h46" /><path className="d2c1-link d2c1-l2" d="M342 95h46" />
    <g className="d2c1-n d2c1-n2">
      <rect x="205" y="20" width="150" height="150" rx="18" className="d2c1-card" />
      <rect x="229" y="44" width="102" height="62" rx="8" className="d2c1-img" /><path d="m240 98 26-30 20 22 14-14 22 22" className="d2c1-stroke" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="229" y="120" width="68" height="8" rx="4" className="d2c1-line" /><rect x="229" y="138" width="102" height="16" rx="8" className="d2c1-btn" />
    </g>
    <g className="d2c1-n d2c1-n3">
      <rect x="390" y="20" width="150" height="150" rx="18" className="d2c1-card" />
      <path d="M426 62h10l12 44h40l8-30h-56" className="d2c1-stroke" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="456" cy="122" r="6" className="d2c1-fill" /><circle cx="488" cy="122" r="6" className="d2c1-fill" />
      <rect x="414" y="140" width="102" height="8" rx="4" className="d2c1-line" />
    </g>
    <g className="d2c1-n d2c1-n4">
      <path className="d2c1-drop" d="M280 172v34" />
      <rect x="40" y="206" width="480" height="132" rx="20" className="d2c1-card d2c1-card--soft" />
      <line x1="280" y1="224" x2="280" y2="320" className="d2c1-divider" />
      <g className="d2c1-beam"><rect x="126" y="258" width="136" height="14" rx="7" className="d2c1-won" /><rect x="298" y="258" width="104" height="14" rx="7" className="d2c1-cost" /></g>
      <rect x="126" y="284" width="90" height="8" rx="4" className="d2c1-line" /><rect x="298" y="284" width="70" height="8" rx="4" className="d2c1-line" />
      <circle cx="84" cy="266" r="20" className="d2c1-won" /><path d="M76 267l6 6 11-13" className="d2c1-tickp" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="456" cy="266" r="20" className="d2c1-cost" /><text x="456" y="274" textAnchor="middle" className="d2c1-rupee">₹</text>
    </g>
  </svg>;
}

export function D2CR1() {
  return <div className="rv3 d2c1">
    <RvReveal3 />

    {/* 1. Ink Deep: hero. Copy left, one compact illustration right. */}
    <section className="rv3-hero rv3-dark d2c1-hero" aria-labelledby="d2c1-h1">
      <div className="rv3-wrap rv3-hero-grid">
        <div className="rv3-hero-copy">
          <p className="rv3-eyebrow">{HERO.eyebrow}</p>
          <h1 id="d2c1-h1">{HERO.h1[0]}<em>{HERO.h1[1]}</em></h1>
          <p className="rv3-lede">{HERO.lede}</p>
          <div className="rv3-actions"><Cta>{HERO.cta}</Cta><TextLink href={HERO.secondary.href} dark>{HERO.secondary.label}</TextLink></div>
        </div>
        <figure className="rv3-hero-fig d2c1-fig">
          <HeroArt />
          <figcaption>
            <ol className="d2c1-cap-steps">{HERO.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            <div className="d2c1-ledger"><span className="d2c1-dot d2c1-dot--won" aria-hidden="true" />{HERO.ledger.won}<span className="d2c1-dot d2c1-dot--cost" aria-hidden="true" />{HERO.ledger.cost}</div>
            <small>{HERO.caption}</small>
          </figcaption>
        </figure>
      </div>
    </section>

    {/* 2. Ground: the business challenge, one order as a receipt. Fits a desktop viewport. */}
    <section className="d2c1-ch rv3-ground" aria-labelledby="d2c1-ch-h"><div className="rv3-wrap d2c1-ch-grid">
      <div className="d2c1-ch-lead" {...REVEAL}>
        <p className="rv3-eyebrow">{CHALLENGE.eyebrow}</p><H2 id="d2c1-ch-h" parts={CHALLENGE.h2} />
        <p className="d2c1-lede">{CHALLENGE.lede}</p>
        <p className="d2c1-bound">{CHALLENGE.boundary}</p>
      </div>
      <div className="d2c1-receipt" {...REVEAL}>
        <p className="d2c1-receipt-l">{CHALLENGE.receipt.label}</p>
        <InViewOnce className="d2c1-rr-wrap"><ul>
          {CHALLENGE.receipt.rows.map((r, i) => <li key={r.k} className={`d2c1-rr d2c1-rr--${r.k}`} style={{ '--r': i } as React.CSSProperties}>
            <div><h3>{r.t}</h3><p>{r.d}</p></div>
            <span className="d2c1-bar" aria-hidden="true"><i style={{ width: `${r.w}%` }} /></span>
          </li>)}
          <li className="d2c1-rr d2c1-rr--left"><div><h3>{CHALLENGE.receipt.left}</h3></div><span className="d2c1-bar d2c1-bar--q" aria-hidden="true"><i /></span></li>
        </ul></InViewOnce>
        <p className="d2c1-receipt-c">{CHALLENGE.receipt.caption}</p>
      </div>
    </div></section>

    {/* 3. Ink Deep: three alternative buying paths, not a sequence. */}
    <section className="d2c1-sh rv3-dark" aria-labelledby="d2c1-sh-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{SHOPPERS.eyebrow}</p><H2 id="d2c1-sh-h" parts={SHOPPERS.h2} /><p className="rv3-intro">{SHOPPERS.lede}</p></header>
      <ul className="d2c1-paths">
        {SHOPPERS.paths.map((p) => <li key={p.id} className={`d2c1-path d2c1-path--${p.id}`} {...REVEAL}>
          <p className="d2c1-chan">{p.channel}</p>
          <h3>{p.t}</h3>
          <ol>{p.steps.map((s, j) => <li key={s} className={j === p.steps.length - 1 ? 'is-last' : undefined}>{s}</li>)}</ol>
        </li>)}
      </ul>
      <p className="d2c1-note" {...REVEAL}>{SHOPPERS.note}</p>
    </div></section>

    {/* 4. Paper: which campaign type does which job, and who manages what. */}
    <section className="d2c1-hp rv3-paper" aria-labelledby="d2c1-hp-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{HELP.eyebrow}</p><H2 id="d2c1-hp-h" parts={HELP.h2} /><p className="rv3-intro">{HELP.lede}</p></header>
      <ul className="d2c1-roles">
        {HELP.roles.map((r) => <li key={r.k} {...REVEAL}>
          <p className="d2c1-plat">{r.platform}</p>
          <h3>{r.t}</h3>
          <p className="d2c1-role-d">{r.d}</p>
          <p className="d2c1-role-f"><strong>Fits when</strong> {r.fit}</p>
        </li>)}
      </ul>
      <div className="d2c1-also" {...REVEAL}><p>{HELP.also}</p><div className="d2c1-links"><TextLink href={HELP.links.google.href}>{HELP.links.google.label}</TextLink><TextLink href={HELP.links.meta.href}>{HELP.links.meta.label}</TextLink></div></div>
      <div className="d2c1-split" {...REVEAL}>
        <div className="d2c1-split-we"><h3><Tick />{HELP.split.we.h}</h3><ul>{HELP.split.we.items.map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div className="d2c1-split-you"><h3>{HELP.split.you.h}</h3><ul>{HELP.split.you.items.map((x) => <li key={x}>{x}</li>)}</ul></div>
        <p className="d2c1-split-sep">{HELP.split.sep}</p>
      </div>
    </div></section>

    {/* 5. Ground: readiness checklist, a conversation not an audit. */}
    <section className="d2c1-rd rv3-ground" aria-labelledby="d2c1-rd-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{READY.eyebrow}</p><H2 id="d2c1-rd-h" parts={READY.h2} /><p className="rv3-intro">{READY.lede}</p></header>
      <ul className="d2c1-checks">
        {READY.items.map((c) => <li key={c.t} {...REVEAL}><Tick /><div><h3>{c.t}</h3><p>{c.d}</p></div></li>)}
      </ul>
      <div className="d2c1-rd-foot" {...REVEAL}>
        <p className="d2c1-note--ink">{READY.closing}</p>
        <div className="d2c1-rd-cta"><p>{READY.cta.lead}</p><Cta>{READY.cta.label}</Cta></div>
      </div>
    </div></section>

    {/* 6. Ink Deep: measurement, platform view against store view. */}
    <section className="d2c1-ms rv3-dark" aria-labelledby="d2c1-ms-h"><div className="rv3-wrap d2c1-ms-grid">
      <div {...REVEAL}>
        <p className="rv3-eyebrow">{MEASURE.eyebrow}</p><H2 id="d2c1-ms-h" parts={MEASURE.h2} />
        <p className="d2c1-lede">{MEASURE.lede}</p>
        <div className="d2c1-cmp">
          <div className="d2c1-cmp-a"><h3>{MEASURE.compare.platform.h}</h3><p>{MEASURE.compare.platform.d}</p></div>
          <span className="d2c1-cmp-x" aria-hidden="true">vs</span>
          <div className="d2c1-cmp-b"><h3>{MEASURE.compare.store.h}</h3><p>{MEASURE.compare.store.d}</p></div>
        </div>
        <p className="d2c1-cmp-n">{MEASURE.compare.note}</p>
        <div className="d2c1-warn"><h3>{MEASURE.warn.h}</h3><p>{MEASURE.warn.d}</p></div>
      </div>
      <div {...REVEAL}>
        <ul className="d2c1-ladder">
          {MEASURE.ladder.map((m) => <li key={m.t}><span className="d2c1-ladder-n" aria-hidden="true" /><div><h3>{m.t}</h3><p>{m.d}</p></div></li>)}
        </ul>
        <p className="d2c1-fine">{MEASURE.attribution}</p>
        <p className="d2c1-fine">{MEASURE.report}</p>
      </div>
    </div></section>

    {/* 7. Paper: Wanderlooms, unlinked, conceptual artwork disclosed. */}
    <section id="client-work" className="d2c1-wk rv3-paper" aria-labelledby="d2c1-wk-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{WORK.eyebrow}</p><H2 id="d2c1-wk-h" parts={WORK.h2} /></header>
      <article className="d2c1-card-w" {...REVEAL}>
        <div className="d2c1-w-img">
          <Image src={WORK.item.img.src} alt={WORK.item.img.alt} fill sizes="(min-width: 861px) 640px, 100vw" />
          <span className="d2c1-w-logo"><Image src={WORK.item.logo.src} alt={WORK.item.logo.alt} width={WORK.item.logo.w} height={WORK.item.logo.h} /></span>
          <span className="d2c1-w-note">{WORK.item.img.note}</span>
        </div>
        <div className="d2c1-w-body">
          <p className="d2c1-plat">{WORK.item.tag}</p>
          <h3>{WORK.item.name}</h3>
          <p className="d2c1-w-text">{WORK.item.body}</p>
          <p className="d2c1-w-fact">{WORK.item.fact}</p>
          <p className="d2c1-w-foot">{WORK.note}</p>
          <TextLink href={WORK.all.href}>{WORK.all.label}</TextLink>
        </div>
      </article>
    </div></section>

    {/* 8. Ink Deep: questions. */}
    <section className="rv3-fit rv3-dark" aria-labelledby="d2c1-faq-h"><div className="rv3-wrap rv3-fit-grid">
      <div className="rv3-fit-price" {...REVEAL}>
        <p className="rv3-eyebrow">Questions</p><h2 id="d2c1-faq-h">A few questions <em>before we talk</em></h2>
        <p>Cannot find your question? Ask us when you get in touch.</p>
      </div>
      <div className="rv3-faq" {...REVEAL}>{FAQS.map((f) => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div>
    </div></section>

    {/* 9. Closing band, one CTA. */}
    <section className="rv3-close" aria-labelledby="d2c1-close-h"><div className="rv3-wrap rv3-close-in" {...REVEAL}>
      <div><h2 id="d2c1-close-h">{CLOSE.h}</h2><p>{CLOSE.body}</p></div>
      <Cta tone="paper">{CLOSE.cta}</Cta>
    </div></section>
  </div>;
}
