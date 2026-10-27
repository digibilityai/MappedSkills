import Link from 'next/link';
import { RvReveal3 } from '@/components/resolve-home-r3/RvReveal3';
import { HeroSearchAnim } from '../google-ads-r4/HeroSearchAnim';
import { CampaignSelector } from './CampaignSelector';
import { JourneyTrack } from '../google-ads-r4/JourneyTrack';
import { HERO, INTENT, MANAGE, TYPES, JOURNEY, MEASURE, WORK, PROCESS, FAQS, CLOSE } from './content';
import '@/components/resolve-home-r3/resolve-home-r3.css';
import '../google-ads-r3/google-ads-r3.css';
import '../google-ads-r4/google-ads-r4.css';
import './google-ads-r41.css';

/**
 * /google-ads in THE RESOLVE R3 design language, refinement R4.1 (review variant, NOT live; R4 is kept for comparison; only hero, intent and selector differ). Reuses the R3 stylesheet
 * (`.rv3`), the R3 section styles (`.ga3`) for the unchanged sections, and adds `.ga4` rules. R3 is kept for comparison.
 * Order answers the visitor's questions: can it help, which approach, what do you manage, how does it connect, how is it
 * judged, what happens next. Grounds: Ink Deep, Ground, Ink Deep, Paper, Ground, Paper, Ground, Paper, Ink Deep, closing band.
 * Remove: see docs/google-ads-r3/REVIEW_R41.md.
 */
const REVEAL = { 'data-rv': '' } as const;

function Cta({ href = '/contact', children, tone = 'tang' }: { href?: string; children: React.ReactNode; tone?: 'tang' | 'paper' }) {
  return <Link className={`rv3-btn rv3-btn--${tone}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link className={`rv3-tl${dark ? ' rv3-tl--dark' : ''}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
const H2 = ({ id, parts }: { id: string; parts: readonly [string, string] }) => <h2 id={id}>{parts[0]}<em>{parts[1]}</em></h2>;
const Tick = () => <svg className="ga3-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Mag = () => <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 5 5" /></svg>;

export function GoogleAdsR41() {
  return <div className="rv3 ga3 ga4 ga41">
    <RvReveal3 />

    {/* 1. Ink Deep: hero with one short paragraph and the animated search journey */}
    <section className="rv3-hero rv3-dark" aria-labelledby="ga41-h1">
      <div className="rv3-wrap rv3-hero-grid">
        <div className="rv3-hero-copy">
          <p className="rv3-eyebrow">{HERO.eyebrow}</p>
          <h1 id="ga41-h1">{HERO.h1[0]}<em>{HERO.h1[1]}</em></h1>
          <p className="rv3-lede">{HERO.lede}</p>
          <div className="rv3-actions"><Cta>{HERO.cta}</Cta><TextLink href="/contact?intent=call" dark>{HERO.secondary}</TextLink></div>
        </div>
        <figure className="rv3-hero-fig ga4-hero-fig">
          <HeroSearchAnim />
          <figcaption><small>{HERO.caption}</small></figcaption>
        </figure>
      </div>
    </section>

    {/* 2. Ground: customer intent, three lanes (not the homepage audience cards) */}
    <section className="ga4-intent rv3-ground" aria-labelledby="ga41-intent-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{INTENT.eyebrow}</p><H2 id="ga41-intent-h" parts={INTENT.h2} /><p className="rv3-intro">{INTENT.lede}</p></header>
      <ol className="ga4-lanes">
        {INTENT.rows.map((r) => <li key={r.id} className={`ga4-lane ga4-lane--${r.id}`} {...REVEAL}>
          <p className="ga4-lane-who">{r.who}</p>
          <p className="ga4-lane-q"><span className="ga4-lane-lbl">They search</span><span className="ga4-pill"><Mag />{r.query}</span></p>
          <p className="ga4-lane-c"><span className="ga4-lane-lbl">Your ad can</span>{r.chance}</p>
          <p className="ga4-lane-n"><span className="ga4-lane-lbl">Then they may</span>{r.next}</p>
        </li>)}
      </ol>
      <p className="ga3-note" {...REVEAL}>{INTENT.note}</p>
    </div></section>

    {/* 3. Ink Deep: the interactive campaign-type selector */}
    <section id="campaign-types" className="ga4-types rv3-dark" aria-labelledby="ga41-types-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{TYPES.eyebrow}</p><H2 id="ga41-types-h" parts={TYPES.h2} /><p className="rv3-intro ga3-intro-dark">{TYPES.lede}</p></header>
      <CampaignSelector />
    </div></section>

    {/* 4. Paper: what MappedSkills manages, in five outcomes, and where the business's own responsibility starts */}
    <section className="ga3-man rv3-paper" aria-labelledby="ga3-man-h"><div className="rv3-wrap ga3-man-grid">
      <div className="ga3-man-lead" {...REVEAL}>
        <p className="rv3-eyebrow">{MANAGE.eyebrow}</p><H2 id="ga3-man-h" parts={MANAGE.h2} />
        <p className="rv3-intro">{MANAGE.lede}</p>
        <div className="ga3-split">
          <div className="ga3-split-ours"><h3><Tick />{MANAGE.ours.h}</h3><p>{MANAGE.ours.d}</p></div>
          <div className="ga3-split-yours"><h3>{MANAGE.yours.h}</h3><p>{MANAGE.yours.d}</p></div>
          <p className="ga3-split-sep">{MANAGE.separate}</p>
        </div>
      </div>
      <ol className="ga3-man-list">{MANAGE.items.map((m, i) => <li key={m.k} {...REVEAL}><span className="ga3-man-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><div><h3>{m.k}</h3><p>{m.d}</p></div></li>)}</ol>
    </div></section>

    {/* 5. Ground: the connected journey from need to outcome */}
    <section className="ga4-jny rv3-ground" aria-labelledby="ga41-jny-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{JOURNEY.eyebrow}</p><H2 id="ga41-jny-h" parts={JOURNEY.h2} /></header>
      <JourneyTrack />
      <p className="ga4-tools" {...REVEAL}>{JOURNEY.tools}</p>
    </div></section>

    {/* 6. Paper: measurement, simplified */}
    <section className="ga4-mea rv3-paper" aria-labelledby="ga41-mea-h"><div className="rv3-wrap ga4-mea-grid">
      <div {...REVEAL}>
        <p className="rv3-eyebrow">{MEASURE.eyebrow}</p><H2 id="ga41-mea-h" parts={MEASURE.h2} />
        <ul className="ga4-outs">{MEASURE.outcomes.map((o) => <li key={o}><Tick />{o}</li>)}</ul>
      </div>
      <div className="ga4-lim" {...REVEAL}>
        <h3>{MEASURE.limits.h}</h3><p>{MEASURE.limits.d}</p><p className="ga4-lim-b">{MEASURE.limits.promise}</p>
        <p className="ga3-report">{MEASURE.report}</p>
      </div>
    </div></section>

    {/* 7. Ground: the verified case study, unchanged */}
    <section className="ga3-work rv3-ground" aria-labelledby="ga3-work-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{WORK.eyebrow}</p><H2 id="ga3-work-h" parts={WORK.h2} /></header>
      <div className="ga3-work-grid" {...REVEAL}>
        <div className="ga3-work-main">
          <p className="ga3-tags">{WORK.tags.map((t) => <span key={t}>{t}</span>)}</p>
          <h3>{WORK.name}</h3>
          <p>{WORK.challenge}</p>
          <div className="ga3-delivered"><h4>What the work put in place</h4><ul>{WORK.delivered.map((d) => <li key={d}><Tick />{d}</li>)}</ul></div>
          <p className="ga3-honest">{WORK.honest}</p>
          <div className="ga3-links"><TextLink href={WORK.link.href}>{WORK.link.label}</TextLink><TextLink href={WORK.all.href}>{WORK.all.label}</TextLink></div>
        </div>
        <div className="ga3-work-did"><h4>What we did</h4><ol>{WORK.approach.map((a, i) => <li key={a.k}><span aria-hidden="true">{i + 1}</span><div><b>{a.k}</b><p>{a.d}</p></div></li>)}</ol></div>
      </div>
    </div></section>

    {/* 8. Paper: the engagement process */}
    <section className="rv3-proc rv3-paper" aria-labelledby="ga41-proc-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{PROCESS.eyebrow}</p><H2 id="ga41-proc-h" parts={PROCESS.h2} /><p className="rv3-intro">{PROCESS.lede}</p></header>
      <ol className="rv3-steps" {...REVEAL}>{PROCESS.steps.map((s, i) => <li key={s.k} style={{ '--i': i } as React.CSSProperties}><span className="rv3-step-n" aria-hidden="true">{i + 1}</span><h3>{s.k}</h3><p>{s.d}</p></li>)}</ol>
      <div className="rv3-proc-foot"><p>{PROCESS.cost}</p><div className="ga3-links"><TextLink href={PROCESS.costLink.href}>{PROCESS.costLink.label}</TextLink><TextLink href={PROCESS.link.href}>{PROCESS.link.label}</TextLink></div></div>
    </div></section>

    {/* 9. Ink Deep: questions */}
    <section className="rv3-fit rv3-dark" aria-labelledby="ga41-faq-h"><div className="rv3-wrap rv3-fit-grid">
      <div className="rv3-fit-price" {...REVEAL}>
        <p className="rv3-eyebrow">Questions</p><h2 id="ga41-faq-h">A few questions <em>before we talk</em></h2>
        <p>Cannot find your question? Ask us when you get in touch.</p>
      </div>
      <div className="rv3-faq" {...REVEAL}>{FAQS.map((f) => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div>
    </div></section>

    {/* 10. Closing band */}
    <section className="rv3-close" aria-labelledby="ga41-close-h"><div className="rv3-wrap rv3-close-in" {...REVEAL}>
      <div><h2 id="ga41-close-h">{CLOSE.h}</h2><p>{CLOSE.body}</p></div>
      <Cta tone="paper">{CLOSE.cta}</Cta>
    </div></section>
  </div>;
}
