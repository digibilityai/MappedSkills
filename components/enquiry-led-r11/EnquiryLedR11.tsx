import Link from 'next/link';
import { RvReveal3 } from '@/components/resolve-home-r3/RvReveal3';
import { InViewOnce } from './InViewOnce';
import { HERO, RELEVANCE, WHO, PATH, ROLES, DECISIONS, METHOD, FAQS, CLOSE } from './content';
import '@/components/resolve-home-r3/resolve-home-r3.css';
import './enquiry-led-r11.css';

/**
 * Proposed /who-we-help/enquiry-led-businesses, R1.1 (review variant, NOT live). Reuses the approved R3 stylesheet (`.rv3`) for
 * grounds, type, buttons, FAQ and closing band; adds `.e11` rules. Grounds: Ink Deep (hero), Paper (relevance), Ground
 * (recognise), Ink Deep (the narrowing path), Paper (two moments), Ground (decisions), Paper (method), Ink Deep (FAQ), closing
 * band. Every settled picture is the base style, so no script, reduced motion and the end of each animation are one state.
 * Remove: see docs/enquiry-led-r11/ENQUIRY_LED_R11_REPORT.md.
 */
const REVEAL = { 'data-rv': '' } as const;
const at = (n: number, k = '--n') => ({ [k]: n } as React.CSSProperties);

function Cta({ href = '/contact', children, tone = 'tang' }: { href?: string; children: React.ReactNode; tone?: 'tang' | 'paper' }) {
  return <Link className={`rv3-btn rv3-btn--${tone}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link className={`rv3-tl${dark ? ' rv3-tl--dark' : ''}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
const H2 = ({ id, parts }: { id: string; parts: readonly [string, string] }) => <h2 id={id}>{parts[0]}<em>{parts[1]}</em></h2>;

/** Small line icons, one per journey stage. */
function StageIcon({ k }: { k: string }) {
  const p = { className: 'e11-sic', viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, focusable: false };
  if (k === 'need') return <svg {...p}><circle cx="16" cy="16" r="11" /><path d="M12.5 12.5a3.5 3.5 0 1 1 5 3.2c-1.1.6-1.5 1.2-1.5 2.3M16 22.5v.1" /></svg>;
  if (k === 'compare') return <svg {...p}><circle cx="14" cy="14" r="7" /><path d="m19.5 19.5 7 7" /></svg>;
  if (k === 'fit') return <svg {...p}><circle cx="16" cy="16" r="11" /><path d="m11 16.5 3.6 3.6 6.6-7.4" /></svg>;
  if (k === 'ask') return <svg {...p}><rect x="5" y="7" width="22" height="18" rx="4" /><path d="m6 10 10 8 10-8" /></svg>;
  return <svg {...p}><path d="M5 8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H14l-6 5v-5a3 3 0 0 1-3-3z" /><path d="M11 12h10M11 16h6" /></svg>;
}
const Pin = () => <svg className="e11-pin" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 18s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" fill="currentColor" /><circle cx="10" cy="8" r="2.2" fill="#fff" /></svg>;

/** Scatter order so each stage keeps a subset of the people who were in the stage before. Fixed, not data. */
const SCATTER = [3, 11, 6, 0, 14, 9, 2, 12, 5, 8, 1, 13, 7, 10, 4];

/** Google moment: a search bar and one result. Meta moment: a feed post. Skeleton lines only, no brand marks or real text. */
function GoogleScene() {
  return <svg className="e11-scene" viewBox="0 0 240 150" aria-hidden="true" focusable="false">
    <rect className="e11-s-bar" x="8" y="8" width="224" height="32" rx="16" />
    <circle className="e11-s-st" cx="28" cy="24" r="6" fill="none" /><path className="e11-s-st" d="m33 29 5 5" strokeLinecap="round" />
    <rect className="e11-s-ln e11-s-q" x="46" y="20" width="96" height="8" rx="4" />
    <g className="e11-s-res">
      <rect className="e11-s-card" x="8" y="52" width="224" height="90" rx="12" />
      <rect className="e11-s-pill" x="20" y="64" width="30" height="12" rx="6" />
      <rect className="e11-s-ln" x="58" y="67" width="70" height="6" rx="3" />
      <rect className="e11-s-ink" x="20" y="86" width="150" height="9" rx="4.5" />
      <rect className="e11-s-ln" x="20" y="104" width="196" height="6" rx="3" /><rect className="e11-s-ln" x="20" y="118" width="130" height="6" rx="3" />
    </g>
  </svg>;
}
function MetaScene() {
  return <svg className="e11-scene" viewBox="0 0 240 150" aria-hidden="true" focusable="false">
    <rect className="e11-s-card" x="8" y="8" width="224" height="134" rx="12" />
    <circle className="e11-s-st" cx="28" cy="27" r="10" fill="none" />
    <rect className="e11-s-ink" x="46" y="19" width="80" height="8" rx="4" /><rect className="e11-s-ln" x="46" y="32" width="50" height="5" rx="2.5" />
    <g className="e11-s-res">
      <rect className="e11-s-img" x="18" y="50" width="204" height="58" rx="8" />
      <rect className="e11-s-ln" x="30" y="62" width="90" height="8" rx="4" /><rect className="e11-s-ln" x="30" y="78" width="130" height="6" rx="3" />
      <rect className="e11-s-pill" x="150" y="114" width="72" height="20" rx="10" />
    </g>
    <rect className="e11-s-ln" x="18" y="118" width="100" height="6" rx="3" />
  </svg>;
}

export function EnquiryLedR11() {
  return <div className="rv3 e11">
    <RvReveal3 />

    {/* 1. Ink Deep: hero. An inbox of mixed enquiries; the relevant one becomes a conversation. Plays once, about 2.5 s. */}
    <section className="rv3-hero rv3-dark e11-hero" aria-labelledby="e11-h1">
      <div className="rv3-wrap rv3-hero-grid">
        <div className="rv3-hero-copy">
          <p className="rv3-eyebrow">{HERO.eyebrow}</p>
          <h1 id="e11-h1">{HERO.h1[0]}<em>{HERO.h1[1]}</em></h1>
          <p className="rv3-lede">{HERO.lede}</p>
          <div className="rv3-actions"><Cta>{HERO.cta}</Cta><TextLink href={HERO.secondary.href} dark>{HERO.secondary.label}</TextLink></div>
        </div>
        <figure className="rv3-hero-fig e11-art" role="img" aria-label={HERO.alt}>
          <div className="e11-inbox" aria-hidden="true">
            <p className="e11-inbox-h">{HERO.inbox}</p>
            <ul>{HERO.rows.map((r, i) => <li key={r.t} className={r.on ? 'e11-hrow e11-hrow--on' : 'e11-hrow e11-hrow--dim'} style={at(i, '--i')}><span className="e11-hdot" />{r.t}</li>)}</ul>
          </div>
          <div className="e11-convo" aria-hidden="true">
            <p className="e11-convo-h">{HERO.convo}</p>
            <div className="e11-b e11-b--a"><i /><i /></div>
            <div className="e11-b e11-b--b"><i /><i /></div>
          </div>
        </figure>
      </div>
    </section>

    {/* 2. Paper: why relevance matters. One inbox, two views, switched with CSS only (radio inputs), so it works without script. */}
    <section className="e11-rel rv3-paper" aria-labelledby="e11-rel-h"><div className="rv3-wrap e11-rel-grid">
      <header {...REVEAL}><p className="rv3-eyebrow">{RELEVANCE.eyebrow}</p><H2 id="e11-rel-h" parts={RELEVANCE.h2} /><p className="rv3-intro">{RELEVANCE.lede}</p></header>
      <div className="e11-view" {...REVEAL}>
        <fieldset className="e11-seg">
          <legend className="e11-sr">{RELEVANCE.legend}</legend>
          <input type="radio" name="e11-view" id="e11-all" defaultChecked /><label htmlFor="e11-all">{RELEVANCE.views.all}</label>
          <input type="radio" name="e11-view" id="e11-relv" /><label htmlFor="e11-relv">{RELEVANCE.views.rel}</label>
        </fieldset>
        <ul className="e11-rows">{RELEVANCE.rows.map((r) => <li key={r.t} className={r.rel ? 'e11-row e11-row--rel' : 'e11-row'}><span className="e11-row-dot" aria-hidden="true" />{r.t}{r.rel && <span className="e11-row-tag">{RELEVANCE.tag}</span>}</li>)}</ul>
        <p className="e11-sum" aria-live="polite"><span className="e11-sum-all">{RELEVANCE.sum.all}</span><span className="e11-sum-rel">{RELEVANCE.sum.rel}</span></p>
      </div>
      <p className="e11-rel-line" {...REVEAL}>{RELEVANCE.line}</p>
    </div></section>

    {/* 3. Ground: recognise your business, in the customer's own words. */}
    <section className="e11-who rv3-ground" aria-labelledby="e11-who-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{WHO.eyebrow}</p><H2 id="e11-who-h" parts={WHO.h2} /><p className="rv3-intro">{WHO.lede}</p></header>
      <ul className="e11-asks">{WHO.asks.map((a) => <li key={a.l} {...REVEAL}><p className="e11-ask-l">{a.l}</p><p className="e11-ask-q">“{a.q}”</p></li>)}</ul>
      <div className="e11-ex" {...REVEAL}>
        <p className="e11-ex-l">{WHO.examples.lead}</p>
        <ul>{WHO.examples.items.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      <ul className="e11-else" {...REVEAL}>{WHO.elsewhere.map((e) => <li key={e.href}><span>{e.lead}</span> <TextLink href={e.href}>{e.label}</TextLink></li>)}</ul>
    </div></section>

    {/* 4. Ink Deep: the narrowing path. The same crowd at every stage; the ones who move on stay as faint places, so the narrowing
        explains itself. Stages play once, in order. */}
    <section className="e11-path-s rv3-dark" aria-labelledby="e11-path-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{PATH.eyebrow}</p><H2 id="e11-path-h" parts={PATH.h2} /><p className="rv3-intro">{PATH.lede}</p></header>
      <InViewOnce className="e11-path" threshold={0.3}>
        <svg className="e11-band e11-band--h" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><polygon points="0,0 100,34 100,66 0,100" /></svg>
        <svg className="e11-band e11-band--v" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><polygon points="0,0 100,0 74,100 26,100" /></svg>
        <ol className="e11-stages">
          {PATH.stages.map((s, n) => <li key={s.t} className="e11-stage" style={at(n, '--s')}>
            <div className={`e11-dots e11-dots--${n + 1}`} aria-hidden="true">
              {n === 4
                ? <span className="e11-talk"><StageIcon k="talk" /></span>
                : SCATTER.map((v, k) => <i key={k} className={v < s.on ? 'e11-dot' : 'e11-dot e11-dot--gone'} style={at(k, '--k')} />)}
            </div>
            <div className="e11-st-text"><p className="e11-st-n" aria-hidden="true"><StageIcon k={s.k} /></p><h3>{s.t}</h3><p>{s.d}</p></div>
          </li>)}
        </ol>
      </InViewOnce>
    </div></section>

    {/* 5. Paper: Google and Meta as two moments of one customer. */}
    <section className="e11-rl rv3-paper" aria-labelledby="e11-rl-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{ROLES.eyebrow}</p><H2 id="e11-rl-h" parts={ROLES.h2} /><p className="rv3-intro">{ROLES.lede}</p></header>
      <InViewOnce className="e11-moments" threshold={0.3}>
        {([['google', ROLES.google, <GoogleScene key="g" />], ['meta', ROLES.meta, <MetaScene key="m" />]] as const).map(([id, r, scene]) => <article key={id} className={`e11-mo e11-mo--${id}`}>
          <div className="e11-mo-art">{scene}</div>
          <p className="e11-plat">{r.platform}<span>{r.moment}</span></p>
          <h3>{r.t}</h3>
          <p className="e11-mo-d">{r.d}</p>
          <p className="e11-mo-f"><strong>{ROLES.fitLabel}</strong> {r.fit}</p>
        </article>)}
        <div className="e11-bridge">
          <p className="e11-bridge-l">{ROLES.bridge.lead}</p>
          <ol>{ROLES.bridge.steps.map((s, i) => <li key={s} style={at(i)}>{s}</li>)}</ol>
        </div>
      </InViewOnce>
      <p className="e11-note" {...REVEAL}>{ROLES.note}</p>
      <div className="e11-links" {...REVEAL}><TextLink href={ROLES.links.google.href}>{ROLES.links.google.label}</TextLink><TextLink href={ROLES.links.meta.href}>{ROLES.links.meta.label}</TextLink></div>
    </div></section>

    {/* 6. Ground: five connected choices that assemble one ad. Numbers link each choice to its part of the ad. */}
    <section className="e11-dc rv3-ground" aria-labelledby="e11-dc-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{DECISIONS.eyebrow}</p><H2 id="e11-dc-h" parts={DECISIONS.h2} /><p className="rv3-intro">{DECISIONS.lede}</p></header>
      <InViewOnce className="e11-dec" threshold={0.25}>
        <ol className="e11-dec-list">{DECISIONS.items.map((d, i) => <li key={d.k} className={`e11-d e11-d--${d.k}`} style={at(i)}>
          <span className="e11-d-n" aria-hidden="true">{i + 1}</span>
          <div><p className="e11-d-t">{d.t}<span>{d.q}</span></p><p className="e11-d-d">{d.d}</p></div>
        </li>)}</ol>
        <div className="e11-ad" aria-hidden="true">
          <p className="e11-ad-chip e11-p e11-p--aud" style={at(0)}><b>1</b>{DECISIONS.ad.aud}</p>
          <div className="e11-ad-img e11-p e11-p--offer" style={at(1)}><b>2</b><i /><i /></div>
          <p className="e11-ad-loc e11-p e11-p--loc" style={at(2)}><b>3</b><Pin />{DECISIONS.ad.loc}</p>
          <div className="e11-ad-msg e11-p e11-p--msg" style={at(3)}><b>4</b><i /><i /></div>
          <p className="e11-ad-btn e11-p e11-p--next" style={at(4)}><b>5</b>{DECISIONS.ad.cta}</p>
        </div>
      </InViewOnce>
    </div></section>

    {/* 7. Paper: method as steps that rise, with a return path, then what each round draws on. */}
    <section className="e11-mt rv3-paper" aria-labelledby="e11-mt-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">{METHOD.eyebrow}</p><H2 id="e11-mt-h" parts={METHOD.h2} /><p className="rv3-intro">{METHOD.lede}</p></header>
      <InViewOnce className="e11-stairs" threshold={0.3}>
        <ol className="e11-steps">{METHOD.steps.map((s, i) => <li key={s.t} style={at(i)}><span className="e11-step-n" aria-hidden="true">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>)}</ol>
        <p className="e11-loop"><span>{METHOD.loop}</span></p>
      </InViewOnce>
      <div className="e11-learn" {...REVEAL}>
        <h3 className="e11-learn-h">{METHOD.learn.h}</h3>
        <ul>
          {METHOD.learn.sources.map((s) => <li key={s.t} className="e11-src"><h4>{s.t}</h4><p>{s.d}</p></li>)}
          <li className="e11-res"><h4>{METHOD.learn.result.t}</h4><p>{METHOD.learn.result.d}</p></li>
        </ul>
        <p className="e11-learn-n">{METHOD.learn.note}</p>
      </div>
    </div></section>

    {/* 8. Ink Deep: questions. */}
    <section className="rv3-fit rv3-dark" aria-labelledby="e11-faq-h"><div className="rv3-wrap rv3-fit-grid">
      <div className="rv3-fit-price" {...REVEAL}>
        <p className="rv3-eyebrow">Questions</p><h2 id="e11-faq-h">A few questions <em>before we talk</em></h2>
        <p>Cannot find your question? Ask us when you get in touch.</p>
      </div>
      <div className="rv3-faq" {...REVEAL}>{FAQS.map((f) => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}{'link' in f && f.link && <> <Link className="rv3-tl" href={f.link.href}>{f.link.label}<span aria-hidden="true">↗</span></Link></>}</p></details>)}</div>
    </div></section>

    {/* 9. Closing band, one CTA. */}
    <section className="rv3-close" aria-labelledby="e11-close-h"><div className="rv3-wrap rv3-close-in" {...REVEAL}>
      <div><h2 id="e11-close-h">{CLOSE.h}</h2><p>{CLOSE.body}</p></div>
      <Cta tone="paper">{CLOSE.cta}</Cta>
    </div></section>
  </div>;
}
