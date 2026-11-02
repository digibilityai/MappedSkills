import Link from 'next/link';
import { ActionLink } from '../ActionLink';
import { SectionHeading } from '../SectionHeading';
import { PaReveal } from '../PaReveal';
import { SearchAdMockup, MetaAdMockup } from '../AdMockups';
import { CaseShowcase, type ShowcaseData } from '@/components/case-showcase/CaseShowcase';
import type { CSSProperties } from 'react';
import { DIAGRAM, HERO, PATH, CARDS, WHICH, SEO_SUPPORT, TERMS, SERVICES_FAQS, CLOSE } from './content';
import '../paid-advertising.css';
import './services.css';

const Tick = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/** `showcase` is resolved on the server by the route (`loadCaseShowcase(SERVICES_SHOWCASE)`); null or absent hides the work section. */
export function PaidAdvertisingServices({ showcase }: { showcase?: ShowcaseData | null } = {}) {
  return <div className="pa pa-sx">
    <PaReveal />
    {/* 1 Hero: one conceptual diagram. Capture and Convert lead to the enquiry; Measure observes the whole path. */}
    <section className="pa-hero pa-wrap" aria-labelledby="sx-h1">
      <div className="pa-hero-copy">
        <p className="pa-eyebrow">{HERO.eyebrow}</p>
        {/* Brand DNA 4.0 A4.1: the emphasis carries the customer outcome, not the product names (wording unchanged) */}
        <h1 id="sx-h1">Reach more of <span>the right customers</span> with Google Ads and Meta Ads.</h1>
        <p className="pa-lede">{HERO.lede}</p>
        <div className="pa-actions"><ActionLink /><ActionLink href="#path" variant="text">{HERO.anchor}</ActionLink></div>
      </div>
      <div className="pa-hero-visual">
        {/* B2 R2: two journeys (one per core service) converge through Capture and Convert towards an enquiry; Measure frames the
            whole path. Plays once on load (CSS only, off under reduced motion); everything is present without it. */}
        <figure className="x3-flow" aria-labelledby="x2-cap">
          <div className="x3-measured">
            <ol className="x3-lanes" aria-label="Two ways customers arrive">
              {DIAGRAM.entries.map(e => <li key={e.id} className={`x3-lane x3-lane--${e.id}`}><span className="x3-pill">{e.k}</span><b>{e.ch}</b><span className="x3-d">{e.d}</span></li>)}
            </ol>
            <svg className="x3-merge" viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M50 0 C50 28, 100 22, 100 48" /><path d="M150 0 C150 28, 100 22, 100 48" />
            </svg>
            <ol className="x3-spine" aria-label="The shared path">
              {DIAGRAM.stations.map((st, i) => <li key={st.k} className="x3-st" style={{ '--i': i } as CSSProperties}><b>{st.k}</b> <span>{st.d}</span></li>)}
              <li className="x3-end" style={{ '--i': DIAGRAM.stations.length } as CSSProperties}><b>{DIAGRAM.end}</b></li>
            </ol>
            <p className="x3-measure"><b>{DIAGRAM.measure.k}</b> <span>{DIAGRAM.measure.d}</span></p>
          </div>
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
        <div className="sx-card-visual">{c.id === 'google' ? <SearchAdMockup illustrative /> : <MetaAdMockup illustrative />}</div>
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
      {/* SEO as a supporting service (B2, DEC-120): below the two core services and visibly secondary; its case studies stay on /seo */}
      <aside className="x2-seo" aria-labelledby="sx-seo" data-reveal>
        <p className="x2-seo-k">{SEO_SUPPORT.label}</p>
        <h3 id="sx-seo">{SEO_SUPPORT.name}</h3>
        <p className="x2-seo-d">{SEO_SUPPORT.body} {SEO_SUPPORT.proof}</p>
        <ActionLink href={SEO_SUPPORT.href} variant="text">{SEO_SUPPORT.cta}</ActionLink>
      </aside>
    </div></section>

    {/* 3b Which one first: a decision between the two core services, then "not every business needs both" and the audiences */}
    <section id="which-first" className="pa-section pa-wrap x2-decide" aria-labelledby="sx-which">
      <div className="x2-decide-head">
        <SectionHeading id="sx-which" eyebrow={WHICH.eyebrow}>{WHICH.h}</SectionHeading>
        <p className="x2-decide-lead">{WHICH.lead}</p>
      </div>
      <div className="x2-fork">
        {WHICH.options.map((o, i) => <article key={o.id} className={`x2-opt x2-opt--${o.id}`} aria-labelledby={`sx-opt-${o.id}`} data-reveal>
          {i === 1 && <span className="x2-or" aria-hidden="true">or</span>}
          <p className="x2-opt-cue"><span className="x3-pill">{o.cue}</span><span>{o.when}</span></p>
          <h3 id={`sx-opt-${o.id}`}>{o.name}</h3>
          <p className="x2-opt-role">{o.role}</p>
          <p className="x2-opt-d">{o.d}</p>
          <ActionLink href={o.href} variant="text">{o.cta}</ActionLink>
        </article>)}
      </div>
      <div className="x2-both" data-reveal>
        <p><b>{WHICH.both.k}</b> {WHICH.both.d}</p>
        <div className="x2-aud-row"><p className="x2-aud-k" id="sx-aud">{WHICH.audLabel}</p>
          <ul className="x2-aud" aria-labelledby="sx-aud">{WHICH.audiences.map(a => <li key={a.href}><Link href={a.href}>{a.label}</Link></li>)}</ul></div>
      </div>
    </section>

    {/* 4 Work: the shared case showcase (DEC-115, DEC-116), one Google Ads and one Meta Ads case from the public library */}
    <CaseShowcase data={showcase} />

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
      <div className="x2-steps" data-reveal><p>{TERMS.stepsLead}</p>
        <ol>{TERMS.steps.map((s, i) => <li key={s}><span aria-hidden="true">{i + 1}</span>{s}</li>)}</ol>
        <ActionLink href="/how-it-works" variant="text">See How We Work</ActionLink></div>
    </section>

    {/* 6 FAQ and final CTA */}
    <section className="pa-section pa-wrap sx-faq-wrap" aria-labelledby="sx-faq">
      <SectionHeading id="sx-faq" eyebrow="Questions">A few questions before we talk</SectionHeading>
      <div className="pa-faq sx-faq" data-reveal>{SERVICES_FAQS.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div>
    </section>
    <section className="pa-close pa-wrap" aria-labelledby="sx-close" data-reveal><div><h2 id="sx-close">{CLOSE.h}</h2><p>{CLOSE.body}</p></div><ActionLink variant="dark" /></section>
  </div>;
}

