import Link from 'next/link';
import { ActionLink } from '../ActionLink';
import { SectionHeading } from '../SectionHeading';
import { PaReveal } from '../PaReveal';
import { HeroArt, Icon, Venn } from './EducationArt';
import { HERO, AUDIENCE, VALUE, READY, PLATFORMS, JOURNEY, PROOF, MEASURE, EDU_FAQS, CLOSE } from './content';
import '../paid-advertising.css';
import './education.css';

const Tick = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Plus = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 4.5v11M4.5 10h11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>;
const stageIcon = ['search', 'compare', 'chat', 'counsel', 'enrol'];

export function PaidAdvertisingEducation() {
  return <div className="pa pa-ed">
    <PaReveal />
    {/* 1 Hero */}
    <section className="pa-hero pa-wrap" aria-labelledby="ed-h1">
      <div className="pa-hero-copy">
        <p className="pa-eyebrow">{HERO.eyebrow}</p>
        <h1 id="ed-h1">More of the <span>right students.</span></h1>
        <p className="pa-lede">{HERO.body}</p>
        <div className="pa-actions"><ActionLink href="/contact">Discuss Education Advertising</ActionLink><ActionLink href="/contact?intent=call" variant="text">Request a Call</ActionLink></div>
      </div>
      <div className="pa-hero-visual"><div className="ed-hero-art"><HeroArt /></div></div>
    </section>

    {/* 2 Audience strip */}
    <div className="ed-strip pa-wrap" role="region" aria-label="Education businesses this page is for">
      <p className="ed-strip-k">{AUDIENCE.label}</p>
      <ul>{AUDIENCE.items.map(a => <li key={a.k}><Icon k={a.k} /><span>{a.t}</span></li>)}</ul>
    </div>

    {/* 3 Value */}
    <section className="pa-section pa-wrap" aria-labelledby="ed-value">
      <div className="ed-value">
        <div><SectionHeading id="ed-value" eyebrow="What we do">Turn interest <span className="pa-em">into opportunities.</span></SectionHeading><p className="ed-value-body">{VALUE.body}</p></div>
        <ul className="ed-benefits">{VALUE.items.map(v => <li key={v.k} data-reveal><Icon k={v.k} /><h3>{v.t}</h3><p>{v.d}</p></li>)}</ul>
      </div>
    </section>

    {/* 4 Readiness (compact) */}
    <section className="pa-section pa-wrap ed-ready-wrap" aria-labelledby="ed-ready">
      <SectionHeading id="ed-ready" eyebrow="Readiness">Before spending more on ads, <span className="pa-em">look at what happens after an enquiry.</span></SectionHeading>
      <p className="ed-ready-intro">{READY.intro}</p>
      <ul className="ed-ready">{READY.items.map(r => <li key={r.t} data-reveal><h3>{r.t}</h3><p>{r.d}</p></li>)}</ul>
      <p className="ed-ready-close">{READY.closing}</p>
    </section>

    {/* 5 Platforms */}
    <section className="pa-section pa-wrap" aria-labelledby="ed-platforms">
      <div className="ed-plat">
        <div><SectionHeading id="ed-platforms" eyebrow="Where each fits">Two platforms. <span className="pa-em">Different strengths.</span></SectionHeading><p className="ed-plat-close">{PLATFORMS.closing}</p></div>
        <div className="ed-panels">
          <article className="ed-panel ed-panel--g" data-reveal><span className="ed-panel-ic"><Icon k="search" /></span><div><p className="ed-tag">{PLATFORMS.google.tag}</p><h3>{PLATFORMS.google.t}</h3><p>{PLATFORMS.google.d}</p><ActionLink href={PLATFORMS.google.href} variant="text">{PLATFORMS.google.cta}</ActionLink></div></article>
          <article className="ed-panel ed-panel--m" data-reveal><span className="ed-panel-ic"><Icon k="feed" /></span><div><p className="ed-tag">{PLATFORMS.meta.tag}</p><h3>{PLATFORMS.meta.t}</h3><p>{PLATFORMS.meta.d}</p><ActionLink href={PLATFORMS.meta.href} variant="text">{PLATFORMS.meta.cta}</ActionLink></div></article>
        </div>
      </div>
    </section>

    {/* 6 Journey: the signature */}
    <section className="pa-section pa-wrap" aria-labelledby="ed-journey">
      <SectionHeading id="ed-journey" eyebrow="The journey">A clearer journey from <span className="pa-em">interest to enrolment.</span></SectionHeading>
      <div className="ed-track">
        <ol className="ed-stages" aria-label="From discovery to enrolment" data-reveal="line">{JOURNEY.stages.map((s, i) => <li key={s.k} className={`ed-stage ed-stage--${s.side}`} style={{ '--i': i } as React.CSSProperties}><span className="ed-ring" aria-hidden="true"><Icon k={stageIcon[i]} /></span><h3>{s.k}</h3><p>{s.d}</p></li>)}</ol>
        <div className="ed-brackets" aria-hidden="true"><p className="ed-br ed-br--ours"><b>{JOURNEY.ours.t}</b>{JOURNEY.ours.d}</p><p className="ed-br ed-br--yours"><b>{JOURNEY.yours.t}</b>{JOURNEY.yours.d}</p></div>
      </div>
      <p className="ed-caveat">{JOURNEY.caveat}</p>
      <div className="ed-who" role="group" aria-label="Who does what">
        <div className="ed-who-we" data-reveal><h3>{JOURNEY.we.t}</h3><p>{JOURNEY.we.d}</p></div>
        <div className="ed-who-you" data-reveal><h3>{JOURNEY.you.t}</h3><p>{JOURNEY.you.d}</p></div>
        <div className="ed-who-sep" data-reveal><h3>{JOURNEY.sep.t}</h3><p>{JOURNEY.sep.d}</p></div>
      </div>
    </section>

    {/* 7 Experience (the page's one dark band) */}
    <section className="pa-section pa-ink ed-proof" aria-labelledby="ed-proof"><div className="pa-wrap">
      <SectionHeading id="ed-proof" eyebrow="Experience">Experience with <span className="pa-em">specialist online education.</span></SectionHeading>
      <div className="ed-proof-grid" data-reveal>
        <article className="ed-case"><p className="ed-case-tags">{PROOF.tags.map(t => <span key={t}>{t}</span>)}</p><h3>{PROOF.name}</h3><p>{PROOF.body}</p><p className="ed-case-note">{PROOF.note}</p><ActionLink href="/portfolio/google-ads-for-online-courses" variant="text">{PROOF.cta}</ActionLink></article>
        <div className="ed-ask"><p className="ed-ask-k">{PROOF.qs.k}</p><h3>{PROOF.qs.h}</h3><ol>{PROOF.qs.items.map(q => <li key={q}>{q}</li>)}</ol></div>
      </div>
    </div></section>

    {/* 8 Measurement */}
    <section className="pa-section pa-wrap" aria-labelledby="ed-measure">
      <SectionHeading id="ed-measure" eyebrow="Measurement">Measure more than <span className="pa-em">the cost of an enquiry.</span></SectionHeading>
      <p className="ed-measure-lede">{MEASURE.lede}</p>
      <div className="ed-measure">
        <div className="ed-venn-wrap" data-reveal>
          <Venn />
          <p className="ed-v ed-v--a"><b>{MEASURE.venn.a}</b></p><p className="ed-v ed-v--m"><b>{MEASURE.venn.mid}</b></p><p className="ed-v ed-v--b"><b>{MEASURE.venn.b}</b><small>{MEASURE.venn.bnote}</small></p>
        </div>
        <div className="ed-measure-copy">
          <ol className="ed-levels">{MEASURE.levels.map(l => <li key={l.t}><b>{l.t}</b><span>{l.d}</span></li>)}</ol>
          <ul className="ed-checks">{MEASURE.checks.map(c => <li key={c.t} className={c.sep ? 'is-sep' : undefined}>{c.sep ? <Plus /> : <Tick />}{c.t}</li>)}</ul>
          <p className="ed-cost">{MEASURE.cost}</p>
          <ActionLink href="/pricing" variant="text">Understand Our Pricing Approach</ActionLink>
        </div>
      </div>
    </section>

    {/* 9 FAQ and close */}
    <section className="pa-section pa-wrap ed-faq-wrap" aria-labelledby="ed-faq">
      <SectionHeading id="ed-faq" eyebrow="Questions">A few questions <span className="pa-em">before we talk</span></SectionHeading>
      <div className="pa-faq ed-faq" data-reveal>{EDU_FAQS.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}{'link' in f && f.link && <> <Link href={f.link.href}>{f.link.label}</Link></>}</p></details>)}</div>
    </section>
    <section className="pa-close pa-wrap" aria-labelledby="ed-close" data-reveal><div><h2 id="ed-close">{CLOSE.h}</h2><p>{CLOSE.body}</p></div><ActionLink href="/contact" variant="dark">Discuss Education Advertising</ActionLink></section>
  </div>;
}
