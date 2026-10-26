import Link from 'next/link';
import { ActionLink } from '../ActionLink';
import { SectionHeading } from '../SectionHeading';
import { PaReveal } from '../PaReveal';
import { HeroArt, Icon, Venn } from './RealEstateArt';
import { HERO, AUDIENCE, READY, PLATFORMS, JOURNEY, PROOF, MEASURE, RE_FAQS, CLOSE } from './content';
import '../paid-advertising.css';
import './real-estate.css';

export function PaidAdvertisingRealEstate() {
  return <div className="pa pa-re">
    <PaReveal />
    {/* 1 Hero */}
    <section className="pa-hero pa-wrap" aria-labelledby="re-h1">
      <div className="pa-hero-copy">
        <p className="pa-eyebrow">{HERO.eyebrow}</p>
        <h1 id="re-h1">More property enquiries. <span>More of the right buyers.</span></h1>
        <p className="pa-lede">{HERO.body}</p>
        <div className="pa-actions"><ActionLink href="/contact">Discuss Property Advertising</ActionLink><ActionLink href="/contact?intent=call" variant="text">Request a Call</ActionLink></div>
      </div>
      <div className="pa-hero-visual"><div className="re-hero-art"><HeroArt /></div></div>
    </section>

    {/* 2 Audience strip */}
    <div className="re-strip pa-wrap" role="region" aria-label="Real estate businesses this page is for">
      <p className="re-strip-k">{AUDIENCE.label}</p>
      <ul>{AUDIENCE.items.map(a => <li key={a.k}><Icon k={a.k} /><span>{a.t}</span></li>)}</ul>
    </div>

    {/* 3 Project readiness */}
    <section className="pa-section pa-wrap" aria-labelledby="re-ready">
      <div className="re-ready-grid">
        <div><SectionHeading id="re-ready" eyebrow="Readiness">A good campaign starts with <span className="pa-em">a clear property offer.</span></SectionHeading><p className="re-ready-intro">{READY.intro}</p></div>
        <ul className="re-ready">{READY.items.map(r => <li key={r.t} data-reveal><Icon k={r.k} /><div><h3>{r.t}</h3><p>{r.d}</p></div></li>)}</ul>
      </div>
      <p className="re-ready-close">{READY.closing}</p>
    </section>

    {/* 4 Platforms */}
    <section className="pa-section pa-wrap" aria-labelledby="re-platforms">
      <div className="re-plat">
        <div><SectionHeading id="re-platforms" eyebrow="Where each fits">Two platforms. <span className="pa-em">Different buyer moments.</span></SectionHeading><p className="re-plat-close">{PLATFORMS.closing}</p></div>
        <div className="re-panels">
          <article className="re-panel re-panel--g" data-reveal><p className="re-tag">{PLATFORMS.google.tag}</p><h3>{PLATFORMS.google.t}</h3><p>{PLATFORMS.google.d}</p><ActionLink href={PLATFORMS.google.href} variant="text">{PLATFORMS.google.cta}</ActionLink></article>
          <article className="re-panel re-panel--m" data-reveal><p className="re-tag">{PLATFORMS.meta.tag}</p><h3>{PLATFORMS.meta.t}</h3><p>{PLATFORMS.meta.d}</p><ActionLink href={PLATFORMS.meta.href} variant="text">{PLATFORMS.meta.cta}</ActionLink></article>
        </div>
      </div>
    </section>

    {/* 5 Journey: the signature */}
    <section className="pa-section pa-wrap" aria-labelledby="re-journey">
      <SectionHeading id="re-journey" eyebrow="The journey">From property discovery to <span className="pa-em">a serious sales conversation.</span></SectionHeading>
      <div className="re-track">
        <ol className="re-stages" aria-label="From discovery to decision" data-reveal="line">{JOURNEY.stages.map((s, i) => <li key={s.k} className={`re-stage re-stage--${s.side}`} style={{ '--i': i } as React.CSSProperties}><span className="re-ring" aria-hidden="true"><Icon k={s.icon} /></span><h3>{s.k}</h3><p>{s.d}</p></li>)}</ol>
        <div className="re-brackets" aria-hidden="true"><p className="re-br re-br--ours"><b>{JOURNEY.ours.t}</b>{JOURNEY.ours.d}</p><p className="re-br re-br--yours"><b>{JOURNEY.yours.t}</b>{JOURNEY.yours.d}</p></div>
      </div>
      <p className="re-boundary">{JOURNEY.boundary}</p>
      <p className="re-caveat">{JOURNEY.caveat}</p>
      <div className="re-who" role="group" aria-label="Who does what">
        <div className="re-who-we" data-reveal><h3>{JOURNEY.we.t}</h3><p>{JOURNEY.we.d}</p></div>
        <div className="re-who-you" data-reveal><h3>{JOURNEY.you.t}</h3><p>{JOURNEY.you.d}</p></div>
        <div className="re-who-sep" data-reveal><h3>{JOURNEY.sep.t}</h3><p>{JOURNEY.sep.d}</p></div>
      </div>
    </section>

    {/* 6 Experience (the page's one dark band) */}
    <section className="pa-section pa-ink re-proof" aria-labelledby="re-proof"><div className="pa-wrap">
      <SectionHeading id="re-proof" eyebrow="Experience">Experience with <span className="pa-em">residential property advertising.</span></SectionHeading>
      <div className="re-proof-grid" data-reveal>
        <article className="re-case"><p className="re-case-tags">{PROOF.tags.map(t => <span key={t}>{t}</span>)}</p><h3>{PROOF.name}</h3><p>{PROOF.body}</p><div className="re-case-links"><ActionLink href="/portfolio/om-sai-developer-meta-ads" variant="text">{PROOF.ctaCase}</ActionLink><ActionLink href="/work" variant="text">{PROOF.ctaWork}</ActionLink></div></article>
        <div className="re-ask"><p className="re-ask-k">{PROOF.qs.k}</p><h3>{PROOF.qs.h}</h3><ol>{PROOF.qs.items.map(q => <li key={q}>{q}</li>)}</ol></div>
      </div>
    </div></section>

    {/* 7 Measurement */}
    <section className="pa-section pa-wrap" aria-labelledby="re-measure">
      <SectionHeading id="re-measure" eyebrow="Measurement">Cost per lead is only <span className="pa-em">the starting point.</span></SectionHeading>
      <p className="re-measure-lede">{MEASURE.lede}</p>
      <div className="re-measure">
        <div className="re-venn-wrap" data-reveal>
          <Venn />
          <p className="re-v re-v--a"><b>{MEASURE.venn.a}</b></p><p className="re-v re-v--m"><b>{MEASURE.venn.mid}</b></p><p className="re-v re-v--b"><b>{MEASURE.venn.b}</b></p>
        </div>
        <div className="re-measure-copy">
          <ol className="re-levels">{MEASURE.levels.map(l => <li key={l.t}><b>{l.t}</b><span>{l.d}</span></li>)}</ol>
          <ul className="re-checks">{MEASURE.checks.map(c => <li key={c.t} className={c.sep ? 'is-sep' : undefined}>{c.sep ? <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 4.500v11M4.500 10h11" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" /></svg> : <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.500 10.500 3.600 3.600 7.400-8" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" /></svg>}{c.t}</li>)}</ul>
          <p className="re-cost">{MEASURE.cost}</p>
          <ActionLink href="/pricing" variant="text">Understand Our Pricing Approach</ActionLink>
        </div>
      </div>
    </section>

    {/* 8 FAQ and close */}
    <section className="pa-section pa-wrap re-faq-wrap" aria-labelledby="re-faq">
      <SectionHeading id="re-faq" eyebrow="Questions">Frequently <span className="pa-em">asked questions</span></SectionHeading>
      <div className="pa-faq re-faq" data-reveal>{RE_FAQS.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}{'link' in f && f.link && <> <Link href={f.link.href}>{f.link.label}</Link></>}</p></details>)}</div>
    </section>
    <section className="pa-close pa-wrap" aria-labelledby="re-close" data-reveal><div><h2 id="re-close">{CLOSE.h}</h2><p>{CLOSE.body}</p></div><ActionLink href="/contact" variant="dark">Discuss Property Advertising</ActionLink></section>
  </div>;
}
