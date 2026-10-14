import Link from 'next/link';
import { ActionPair, InlineLink, Mark } from '@/components/direction-c/primitives';
import { HOME, SERVICE_PLAIN as P } from './content';
import './conversion.css';
import { Icon } from '../Icons';
import { PressToggle, Tabs } from '../Interactive';
import { Close } from '../Close';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Conversion Optimization (/conversion-optimization): the approved prototype's page body (proto/direction-c-plus
 * 0a8b611, ServiceH.tsx), unchanged in markup and copy. It already used production destinations (ActionPair, live
 * links), so the only changes are local import paths.
 */

/* Hero art: a stylised landing page with a form, four numbered loss points. Illustration only. */
function PageArt() {
  return (
    <svg className="hs-art" viewBox="0 0 520 400" role="img" aria-labelledby="hs-art-t">
      <title id="hs-art-t">Illustration: a landing page and its form, with four places a visit can be lost.</title>
      {/* browser frame */}
      <rect x="20" y="24" width="400" height="330" rx="14" className="hs-a-frame" />
      <path d="M20 62h400" className="hs-a-rule" />
      <circle cx="44" cy="43" r="5" className="hs-a-dot" />
      <circle cx="62" cy="43" r="5" className="hs-a-dot" />
      <circle cx="80" cy="43" r="5" className="hs-a-dot" />
      <rect x="104" y="35" width="210" height="16" rx="8" className="hs-a-url" />
      {/* page */}
      <rect x="48" y="88" width="230" height="22" rx="3" className="hs-a-head" />
      <rect x="48" y="118" width="170" height="22" rx="3" className="hs-a-head" />
      <path d="M48 160h200M48 178h170M48 196h188" className="hs-a-text" />
      {/* form */}
      <rect x="48" y="224" width="344" height="104" rx="10" className="hs-a-form" />
      <rect x="66" y="242" width="150" height="18" rx="4" className="hs-a-field" />
      <rect x="226" y="242" width="148" height="18" rx="4" className="hs-a-field" />
      <rect x="66" y="270" width="308" height="18" rx="4" className="hs-a-field" />
      <rect x="66" y="298" width="96" height="20" rx="10" className="hs-a-btn" />
      {/* report, outside the page, dashed: unmeasured */}
      <rect x="436" y="250" width="70" height="104" rx="8" className="hs-a-rep" />
      <path d="M454 334v-26M471 334v-44M488 334v-18" className="hs-a-bars" />
      {/* loss points */}
      {[
        [104, 43, '1'],
        [290, 99, '2'],
        [176, 308, '3'],
        [500, 250, '4'],
      ].map(([x, y, n], i) => (
        <g key={n as string} className="hs-pin" style={{ ['--k' as string]: i }}>
          <circle cx={x as number} cy={y as number} r="17" />
          <text x={x as number} y={(y as number) + 6}>
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ConversionBody() {
  return (
    <>
      {/* 1 — hero (ivory): the claim + where a visit is lost */}
      <section className="b-hero hs-hero" aria-labelledby="hs-h1">
        <div className="px-wrap b-hero-g h-hero-g">
          <div>
            <Breadcrumb trail={['What we do']} current={P.crumb} />
            <h1 id="hs-h1" className="b-h1">
              {P.h1.a} <span className="b-named">{P.h1.b}</span>
            </h1>
            <p className="b-lede">{P.lede}</p>
            <ActionPair primaryLabel={HOME.hero.primary} />
          </div>
          <figure className="hs-hero-fig">
            <PageArt />
            <figcaption className="px-cap">
              <span className="hs-cap-pins">{P.artCaption}</span> {P.artNote}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — the usual brief (ink): three solutions, struck once */}
      <section className="b-sec hs-brief" aria-labelledby="hs-h-brief">
        <div className="px-wrap">
          <p className="b-kicker" id="hs-h-brief">
            {P.briefKicker}
          </p>
          <ul className="hs-struck" data-rv="" aria-label="The usual request">
            {P.brief.map((t) => (
              <li key={t} data-rv-i="">
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="hs-turn">{P.briefTurn}</p>
        </div>
      </section>

      {/* 3 — two of the four are not the page (paper): one route, four stations, a toggle */}
      <section className="b-sec b-paper hs-route-sec" aria-labelledby="hs-h-four">
        <div className="px-wrap">
          <p className="b-kicker">{P.lossesKicker}</p>
          <h2 id="hs-h-four" className="b-h2">
            {P.lossesH.a} <span className="b-named">{P.lossesH.b}</span>
          </h2>
          <PressToggle label={P.toggle} className="hs-reach">
            <ol className="hs-route" data-rv="">
              {P.losses.map((l) => (
                <li key={l.n} data-rv-i="" className={(l.page ? 'is-page' : 'not-page') + (l.hidden ? ' is-hidden' : '')}>
                  <span className="hs-st-n" aria-hidden="true" data-n={l.n} />
                  <span className="hs-st-ic" aria-hidden="true">
                    <Icon name={l.icon} size={26} />
                  </span>
                  <h3 className="hs-st-t">{l.name}</h3>
                  <p className="hs-st-w">{l.what}</p>
                  <p className="hs-st-tag">{l.page ? P.tagFix : P.tagNot}</p>
                </li>
              ))}
            </ol>
          </PressToggle>
          <div className="hs-start">
            <p>
              <Mark state="open" /> {P.lossesNote}
            </p>
            <p>
              <Link href={P.start.href} className="hs-start-a">
                {P.start.label} →
              </Link>{' '}
              <span>{P.start.note}</span>
            </p>
          </div>
        </div>
      </section>

      {/* 4 — what the work involves: a step strip */}
      <section className="b-sec hs-work" aria-labelledby="hs-h-work">
        <div className="px-wrap">
          <p className="b-kicker">{P.workKicker}</p>
          <h2 id="hs-h-work" className="b-h2">
            {P.workH.a} <span className="b-named">{P.workH.b}</span>
          </h2>
          <Tabs
            label="The four steps of the work"
            className="hs-steps"
            items={P.steps.map((st, i) => ({
              id: 'hs' + i,
              tab: (
                <>
                  <span className="hs-tab-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <Icon name={st.icon} size={20} />
                  <span>{st.tab}</span>
                </>
              ),
              panel: (
                <div className="hs-panel">
                  <p className="hs-panel-t">{st.t}</p>
                  <p className="hs-panel-d">{st.d}</p>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* 5 — the testing threshold as a split band */}
      <section className="hs-thr" aria-labelledby="hs-h-thr">
        <div className="px-wrap hs-thr-head">
          <p className="b-kicker">{P.testKicker}</p>
          <h2 id="hs-h-thr" className="b-h2">
            {P.testH.a} <span className="b-named">{P.testH.b}</span>
          </h2>
          <p className="hs-thr-body">{P.testBody}</p>
        </div>
        <div className="hs-band" data-rv="">
          <div className="hs-below" data-rv-i="">
            <div className="hs-band-in">
              <p className="hs-band-k">
                <Mark state="open" /> {P.below.k}
              </p>
              <p className="hs-band-t">{P.below.t}</p>
            </div>
          </div>
          <div className="hs-line" aria-hidden="true">
            <span>{P.line}</span>
          </div>
          <div className="hs-above" data-rv-i="">
            <div className="hs-band-in">
              <p className="hs-band-k">
                <Mark state="named" /> {P.above.k}
              </p>
              <p className="hs-band-t">{P.above.t}</p>
            </div>
          </div>
        </div>
        <div className="px-wrap">
          <p className="hs-nobench">{P.noBench}</p>
          <p className="hs-nobench hs-nobench-l">
            <InlineLink href={P.methodLink.href}>{P.methodLink.label}</InlineLink>
          </p>
        </div>
      </section>

      {/* 6 — proof (ink): the real contact-form failure */}
      <section className="b-sec b-ink hs-proof" aria-labelledby="hs-h-own">
        <div className="px-wrap">
          <p className="b-kicker">{P.proofKicker}</p>
          <h2 id="hs-h-own" className="b-h2 hs-proof-h">
            {P.proofH.a} <span className="b-named">{P.proofH.b}</span>
          </h2>
          <div className="hs-story" data-rv="">
            <div className="hs-phone" data-rv-i="">
              <p className="hs-story-l">{P.saw}</p>
              <div className="hs-phone-s" aria-hidden="true">
                <span className="hs-ok">
                  <Icon name="check" size={30} />
                </span>
                <b>Thank you</b>
                <span>Your enquiry has been sent.</span>
              </div>
              <p className="px-sr">A message saying the enquiry had been sent.</p>
              <p className="px-cap px-cap-ink">{P.reconstruction}</p>
            </div>
            <div className="hs-vs" aria-hidden="true">
              <span />
            </div>
            <div className="hs-inbox" data-rv-i="">
              <p className="hs-story-l">{P.arrived}</p>
              <div className="hs-inbox-s" aria-hidden="true">
                <span className="hs-inbox-h">Inbox</span>
                <i />
                <i />
                <i />
              </div>
              <p className="hs-nothing">{P.arrivedValue}.</p>
            </div>
          </div>
          <p className="b-lede b-lede-ink hs-proof-b">{P.proofBody}</p>
        </div>
      </section>

      <Close h={P.close.h} body={P.close.body} />
    </>
  );
}
