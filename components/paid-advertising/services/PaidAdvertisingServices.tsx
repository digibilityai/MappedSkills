import Link from 'next/link';
import { ActionLink } from '../ActionLink';
import { SectionHeading } from '../SectionHeading';
import { PaReveal } from '../PaReveal';
import { SearchAdMockup, MetaAdMockup } from '../AdMockups';
import { DIAGRAM, HERO, PATH, CARDS, ILLUSTRATION_NOTE, WHICH, WORK, TERMS, SERVICES_FAQS, CLOSE } from './content';
import '../paid-advertising.css';
import './services.css';

const Tick = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function PaidAdvertisingServices() {
  return <div className="pa pa-sx">
    <PaReveal />
    {/* 1 Hero: one conceptual diagram. Capture and Convert lead to the enquiry; Measure observes the whole path. */}
    <section className="pa-hero pa-wrap" aria-labelledby="sx-h1">
      <div className="pa-hero-copy">
        <p className="pa-eyebrow">{HERO.eyebrow}</p>
        <h1 id="sx-h1">Reach more of the right customers with <span>Google Ads and Meta Ads.</span></h1>
        <p className="pa-lede">{HERO.lede}</p>
        <div className="pa-actions"><ActionLink /><ActionLink href="#path" variant="text">{HERO.anchor}</ActionLink></div>
      </div>
      <div className="pa-hero-visual">
        <figure className="x2-path" aria-labelledby="x2-cap">
          <ol className="x2-in">{DIAGRAM.entries.map(e => <li key={e.k}><span>{e.k}</span>{e.d}</li>)}</ol>
          <svg className="x2-merge" viewBox="0 0 100 18" aria-hidden="true" focusable="false"><path d="M25 0 C25 10, 44 12, 50 17" /><path d="M75 0 C75 10, 56 12, 50 17" /></svg>
          <ol className="x2-stations">
            {DIAGRAM.stations.map(s => <li key={s.k}><b>{s.k}</b><span>{s.d}</span></li>)}
            <li className="x2-station-end"><b>{DIAGRAM.end}</b></li>
          </ol>
          <div className="x2-measure"><b>{DIAGRAM.measure.k}</b><span>{DIAGRAM.measure.d}</span></div>
          <figcaption id="x2-cap">{DIAGRAM.caption}</figcaption>
        </figure>
      </div>
    </section>

    {/* 2 The path: Capture, Convert, Measure with equal weight; supporting capabilities in context */}
    <section id="path" className="pa-section pa-wrap" aria-labelledby="sx-path"><div className="x2-path-grid">
      <div className="x2-path-intro">
        <SectionHeading id="sx-path" eyebrow={PATH.eyebrow}>From buyer demand to <span className="pa-em">a measurable enquiry</span></SectionHeading>
        <p>{PATH.intro}</p>
      </div>
      <ol className="x2-rows">{PATH.rows.map(r => <li key={r.k} className="x2-row" data-reveal>
        <div className="x2-stage"><span className="x2-dot" aria-hidden="true" /><h3>{r.k}</h3></div>
        <div className="x2-body"><p className="x2-q">{r.q}</p><p>{r.d}</p>
          {r.sup && <p className="x2-sup"><b>Supporting</b> {r.sup.lead}{' '}{r.sup.links.map((l, i) => <span key={l.href}>{i > 0 && ' and '}<Link href={l.href}>{l.label}</Link></span>)}.</p>}
        </div>
      </li>)}</ol>
    </div></section>

    {/* 3 Core services: the only place the two illustrative ad mockups appear */}
    <section id="services" className="pa-section pa-ink" aria-labelledby="sx-services"><div className="pa-wrap">
      <SectionHeading id="sx-services" eyebrow="Our core services">Two ways to <span className="pa-em">capture demand</span></SectionHeading>
      <div className="x2-cards">{CARDS.map(c => <article key={c.id} className={`pa-service sx-card sx-card--${c.id} x2-card x2-card--${c.id}`} data-reveal>
        <div className="sx-card-visual">{c.id === 'google' ? <SearchAdMockup illustrative /> : <MetaAdMockup illustrative />}<p className="x2-illus">{ILLUSTRATION_NOTE}</p></div>
        <div className="sx-card-copy">
          <p className="sx-badge">{c.badge}</p>
          <h3>{c.name}</h3>
          <p className="sx-benefit">{c.benefit}</p>
          <p className="sx-manage">{c.manage}</p>
          <ul className="sx-chips" aria-label={`${c.name} suits`}>{c.suits.map(s => <li key={s}>{s}</li>)}</ul>
          {'note' in c && <p className="sx-note">{c.note}</p>}
          <ActionLink href={c.href} variant="text">Explore {c.name}</ActionLink>
        </div>
      </article>)}</div>
      <div className="x2-which"><p><b>{WHICH.lead}</b> {WHICH.body}</p>
        <ul className="x2-aud" aria-label="Advertising by business type">{WHICH.audiences.map(a => <li key={a.href}><Link href={a.href}>{a.label}</Link></li>)}</ul></div>
    </div></section>

    {/* 4 Work: service and industry are separate tags. Cards are the verified entries; no outcome figures. */}
    <section id="our-work" className="pa-section pa-wrap" aria-labelledby="sx-work">
      <div className="pa-section-top"><SectionHeading id="sx-work" eyebrow="Our work">The work <span className="pa-em">behind the offer</span></SectionHeading><ActionLink href="/work" variant="text">View All Case Studies</ActionLink></div>
      <div className="x2-work">
        <article className="x2-case x2-case--lead" data-reveal><CaseBody w={WORK[0]} /></article>
        <div className="x2-case-side">
          {WORK.slice(1).map(c => <article key={c.id} className={`x2-case${c.href ? '' : ' x2-case--info'}`} data-reveal><CaseBody w={c} /></article>)}
        </div>
      </div>
    </section>

    {/* 5 Working with us: scope, cost and fit, then the five steps */}
    <section className="pa-section pa-wrap" aria-labelledby="sx-terms">
      <SectionHeading id="sx-terms" eyebrow="Working with us">What we manage, and <span className="pa-em">what it costs</span></SectionHeading>
      <div className="x2-terms">
        <div className="x2-in-list" data-reveal><h3>Included in management</h3><ul>{TERMS.included.map(t => <li key={t}><Tick />{t}</li>)}</ul></div>
        <div className="x2-terms-side">
          <div className="x2-sep" data-reveal><h3>Agreed separately</h3><p>{TERMS.separate}</p></div>
          <div className="x2-cost" data-reveal><h3>Costs</h3><p><b>{TERMS.cost.spend}</b> {TERMS.cost.spendD} <b>{TERMS.cost.fee}</b> {TERMS.cost.feeD}</p><ActionLink href="/pricing" variant="text">Understand Our Pricing Approach</ActionLink></div>
        </div>
      </div>
      <p className="x2-fit" data-reveal>{TERMS.fit}</p>
      <div className="x2-steps" data-reveal><p>{TERMS.stepsLead}</p>
        <ol>{TERMS.steps.map((s, i) => <li key={s}><span aria-hidden="true">{i + 1}</span>{s}</li>)}</ol>
        <ActionLink href="/how-it-works" variant="text">See How We Work</ActionLink></div>
    </section>

    {/* 6 FAQ and final CTA */}
    <section className="pa-section pa-wrap sx-faq-wrap" aria-labelledby="sx-faq">
      <SectionHeading id="sx-faq" eyebrow="Questions">A few questions <span className="pa-em">before we talk</span></SectionHeading>
      <div className="pa-faq sx-faq" data-reveal>{SERVICES_FAQS.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div>
    </section>
    <section className="pa-close pa-wrap" aria-labelledby="sx-close" data-reveal><div><h2 id="sx-close">{CLOSE.h}</h2><p>{CLOSE.body}</p></div><ActionLink variant="dark" /></section>
  </div>;
}

function CaseBody({ w }: { w: typeof WORK[number] }) {
  return <>
    <p className="x2-tags">
      {w.service && <span className="x2-tag x2-tag--svc"><span className="v">Service </span>{w.service}</span>}
      <span className="x2-tag x2-tag--ind"><span className="v">Industry </span>{w.industry}</span>
    </p>
    <h3>{w.name}</h3><p>{w.line}</p>
    {w.href && <ActionLink href={w.href} variant="text">{w.cta}</ActionLink>}
  </>;
}
