import Link from 'next/link';
import { RvReveal3 } from '@/components/resolve-home-r3/RvReveal3';
import { HeroFeedAnim } from '../meta-ads-r1/HeroFeedAnim';
import { FormatSelector } from '../meta-ads-r21/FormatSelector';
import { JourneyMeta } from '../meta-ads-r1/JourneyMeta';
import Image from 'next/image';
import { HERO, INTENT, FORMATS, JOURNEY, MANAGE, MEASURE, WORK, PROCESS, FAQS, CLOSE, PRICE } from './content';
import '@/components/resolve-home-r3/resolve-home-r3.css';
import '../meta-ads-r1/meta-ads-r1.css';
import '../meta-ads-r2/meta-ads-r2.css';
import '../meta-ads-r21/meta-ads-r21.css';
import './meta-ads-r22.css';

/**
 * /social-media-ads in THE RESOLVE R3 design language, Meta Ads R2.2 (review variant: R2.1 with a simplified section 2; R2 with the load-scroll fix and the homepage client images; only section 7 differs from R1, which is kept for comparison, NOT live). Reuses the approved R3 stylesheet
 * (`.rv3`) for grounds, type, buttons, process and FAQ, and adds `.mr1` rules. Order answers the visitor's questions: why Meta,
 * which format, how does it connect to an enquiry, what do you manage, how is it judged, who have you done it for, what next.
 * Grounds: Ink Deep, Ground, Ink Deep, Paper, Ground, Ink Deep, Paper, Ground, Ink Deep, closing band.
 * Remove: see docs/meta-ads-r1/REVIEW.md.
 */
const REVEAL = { 'data-rv': '' } as const;

function Cta({ href = '/contact', children, tone = 'tang' }: { href?: string; children: React.ReactNode; tone?: 'tang' | 'paper' }) {
  return <Link className={`rv3-btn rv3-btn--${tone}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link className={`rv3-tl${dark ? ' rv3-tl--dark' : ''}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
const H2 = ({ id, parts }: { id: string; parts: readonly [string, string] }) => <h2 id={id}>{parts[0]}<em>{parts[1]}</em></h2>;
const Tick = () => <svg className="mr1-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function MetaAdsR22() {
  return <div className="rv3 mr1 mr2 mr21 mr22">
    <RvReveal3 />

    {/* 1. Ink Deep: hero with one short paragraph and the animated feed journey */}
    <section className="rv3-hero rv3-dark" aria-labelledby="mr1-h1">
      <div className="rv3-wrap rv3-hero-grid">
        <div className="rv3-hero-copy">
          <p className="rv3-eyebrow">{HERO.eyebrow}</p>
          <h1 id="mr1-h1">{HERO.h1[0]}<em>{HERO.h1[1]}</em></h1>
          <p className="rv3-lede">{HERO.lede}</p>
          <div className="rv3-actions"><Cta>{HERO.cta}</Cta><TextLink href="/contact?intent=call" dark>{HERO.secondary}</TextLink></div>
        </div>
        <figure className="rv3-hero-fig mr1-hero-fig">
          <HeroFeedAnim />
          <figcaption><small>{HERO.caption}</small></figcaption>
        </figure>
      </div>
    </section>

    {/* 2. Ground: one headline, one sentence, one thread (R2.2: simplified). Illustrative, not the detailed journey shown later. */}
    <section className="mr22-why rv3-ground" aria-labelledby="mr1-intent-h"><div className="rv3-wrap">
      <header className="mr22-head" {...REVEAL}><p className="rv3-eyebrow">{INTENT.eyebrow}</p><H2 id="mr1-intent-h" parts={INTENT.h2} /><p className="mr22-lede">{INTENT.lede}</p></header>
      <ol className="mr22-thread" {...REVEAL}>
        {INTENT.steps.map((s, i) => <li key={s.k} style={{ '--i': i } as React.CSSProperties}><span className="mr22-dot" aria-hidden="true" /><h3>{s.k}</h3><p>{s.d}</p></li>)}
      </ol>
      <p className="mr22-note" {...REVEAL}>{INTENT.note}</p>
    </div></section>

    {/* 3. Ink Deep: the interactive ad-format selector */}
    <section id="ad-formats" className="mr1-formats rv3-dark" aria-labelledby="mr1-formats-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{FORMATS.eyebrow}</p><H2 id="mr1-formats-h" parts={FORMATS.h2} /><p className="rv3-intro">{FORMATS.lede}</p></header>
      <FormatSelector />
    </div></section>

    {/* 4. Paper: the customer journey, with who manages which part */}
    <section className="mr1-jny rv3-paper" aria-labelledby="mr1-jny-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{JOURNEY.eyebrow}</p><H2 id="mr1-jny-h" parts={JOURNEY.h2} /></header>
      <JourneyMeta />
      <p className="mr1-tools" {...REVEAL}>{JOURNEY.closing}</p>
    </div></section>

    {/* 5. Ground: what MappedSkills manages, nine items, and where the business's own responsibility starts */}
    <section className="mr1-man rv3-ground" aria-labelledby="mr1-man-h"><div className="rv3-wrap mr1-man-grid">
      <div className="mr1-man-lead" {...REVEAL}>
        <p className="rv3-eyebrow">{MANAGE.eyebrow}</p><H2 id="mr1-man-h" parts={MANAGE.h2} />
        <p className="rv3-intro">{MANAGE.lede}</p>
        <div className="mr1-split">
          <div className="mr1-split-ours"><h3><Tick />{MANAGE.ours.h}</h3><p>{MANAGE.ours.d}</p></div>
          <div className="mr1-split-yours"><h3>{MANAGE.yours.h}</h3><p>{MANAGE.yours.d}</p></div>
          <p className="mr1-split-sep">{MANAGE.separate}</p>
        </div>
      </div>
      <ol className="mr1-man-list">{MANAGE.items.map((m, i) => <li key={m.k} {...REVEAL}><span className="mr1-man-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><div><h3>{m.k}</h3><p>{m.d}</p></div></li>)}</ol>
    </div></section>

    {/* 6. Ink Deep: measurement */}
    <section className="mr1-mea rv3-dark" aria-labelledby="mr1-mea-h"><div className="rv3-wrap mr1-mea-grid">
      <div {...REVEAL}>
        <p className="rv3-eyebrow">{MEASURE.eyebrow}</p><H2 id="mr1-mea-h" parts={MEASURE.h2} />
        <p className="mr1-outs-l">{MEASURE.outcomesLabel}</p>
        <ul className="mr1-outs">{MEASURE.outcomes.map((o) => <li key={o}><Tick />{o}</li>)}</ul>
      </div>
      <div className="mr1-mea-side" {...REVEAL}>
      <div className="mr1-sigp">
        <p className="mr1-sig-l">{MEASURE.signals.label}</p>
        <ul className="mr1-sigs">{MEASURE.signals.items.map((o) => <li key={o}>{o}</li>)}</ul>
      </div>
      <div className="mr1-lim">
        <h3>{MEASURE.limits.h}</h3><p>{MEASURE.limits.d}</p><p className="mr1-lim-b">{MEASURE.limits.promise}</p>
        <p className="mr1-report">{MEASURE.report}</p>
      </div>
      </div>
    </div></section>

    {/* 7. Paper: relevant client work, two editorial cards (R2). Conceptual illustrations only, never client imagery. */}
    <section className="mr2-work rv3-paper" aria-labelledby="mr1-work-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{WORK.eyebrow}</p><H2 id="mr1-work-h" parts={WORK.h2} /></header>
      <ul className="mr2-cards">
        {WORK.items.map((w) => <li key={w.id} className={`mr2-card mr2-card--${w.id}${w.link ? ' mr2-card--link' : ''}`} {...REVEAL}>
          <div className="mr2-img">
            <Image className="mr21-photo" src={w.img.src} alt={w.img.alt} fill sizes="(min-width: 861px) 604px, 100vw" />
            <span className={`mr21-logo mr21-logo--${w.id}`}><Image src={w.logo.src} alt={w.logo.alt} width={w.logo.w} height={w.logo.h} /></span>
            <span className="mr2-label">{w.img.note}</span>
          </div>
          <div className="mr2-body">
            <p className="mr2-tag">{w.tag}</p>
            <h3>{w.name}</h3>
            <p className="mr2-text">{w.body}</p>
            <p className="mr2-foot">{w.link ? <Link className="rv3-tl mr2-cta" href={w.link.href}>{w.link.label}<span aria-hidden="true">↗</span></Link> : <span className="mr2-fact">{w.fact}</span>}</p>
          </div>
        </li>)}
      </ul>
      <div className="mr2-strip" {...REVEAL}><p>{WORK.note}</p><TextLink href={WORK.all.href}>{WORK.all.label}</TextLink></div>
    </div></section>

    {/* 7b. Ink Deep: the approved monthly management plan, with the full scope in a closed disclosure */}
    <section id="pricing" className="mr22-price rv3-dark" aria-labelledby="mr22-price-h"><div className="rv3-wrap">
      <div className="mr22-price-grid">
        <div {...REVEAL}>
          <p className="rv3-eyebrow">{PRICE.eyebrow}</p><H2 id="mr22-price-h" parts={PRICE.h2} />
          <p className="rv3-intro">{PRICE.lede}</p>
          <ul className="mr22-points">{PRICE.points.map((p) => <li key={p}><Tick />{p}</li>)}</ul>
          <div className="rv3-actions"><Cta href="/contact">{PRICE.cta}</Cta><TextLink href={PRICE.compare.href} dark>{PRICE.compare.label}</TextLink></div>
        </div>
        <div className="mr22-card" {...REVEAL}>
          <p className="mr22-card-k">{PRICE.card.label}</p>
          <p className="mr22-fee"><b>{PRICE.card.fee}</b> <span>{PRICE.card.per}</span></p>
          <ul className="mr22-figs">{PRICE.card.figs.map((f) => <li key={f}>{f}</li>)}</ul>
          <p className="mr22-card-note">{PRICE.card.note}</p>
        </div>
      </div>
      <div className="rv3-faq mr22-scope" {...REVEAL}>
        <details className="mr22-disclosure">
          <summary><h3>{PRICE.scope.summary}</h3><span aria-hidden="true">+</span></summary>
          <div className="mr22-scope-body">
            <ul>{PRICE.scope.items.map((i) => <li key={i}><Tick />{i}</li>)}</ul>
            <div><h4>{PRICE.scope.notesLabel}</h4><ul>{PRICE.scope.notes.map((n) => <li key={n}>{n}</li>)}</ul></div>
          </div>
        </details>
      </div>
    </div></section>

    {/* 8. Ground: the engagement process */}
    <section className="rv3-proc rv3-ground" aria-labelledby="mr1-proc-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{PROCESS.eyebrow}</p><H2 id="mr1-proc-h" parts={PROCESS.h2} /><p className="rv3-intro">{PROCESS.lede}</p></header>
      <ol className="rv3-steps" {...REVEAL}>{PROCESS.steps.map((s, i) => <li key={s.k} style={{ '--i': i } as React.CSSProperties}><span className="rv3-step-n" aria-hidden="true">{i + 1}</span><h3>{s.k}</h3><p>{s.d}</p></li>)}</ol>
      <div className="rv3-proc-foot"><p>{PROCESS.cost}</p><div className="mr1-links"><TextLink href={PROCESS.costLink.href}>{PROCESS.costLink.label}</TextLink><TextLink href={PROCESS.link.href}>{PROCESS.link.label}</TextLink></div></div>
    </div></section>

    {/* 9. Ink Deep: questions */}
    <section className="rv3-fit rv3-dark" aria-labelledby="mr1-faq-h"><div className="rv3-wrap rv3-fit-grid">
      <div className="rv3-fit-price" {...REVEAL}>
        <p className="rv3-eyebrow">Questions</p><h2 id="mr1-faq-h">A few questions <em>before we talk</em></h2>
        <p>Cannot find your question? Ask us when you get in touch.</p>
      </div>
      <div className="rv3-faq" {...REVEAL}>{FAQS.map((f) => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div>
    </div></section>

    {/* 10. Closing band */}
    <section className="rv3-close" aria-labelledby="mr1-close-h"><div className="rv3-wrap rv3-close-in" {...REVEAL}>
      <div><h2 id="mr1-close-h">{CLOSE.h}</h2><p>{CLOSE.body}</p></div>
      <Cta tone="paper">{CLOSE.cta}</Cta>
    </div></section>
  </div>;
}
