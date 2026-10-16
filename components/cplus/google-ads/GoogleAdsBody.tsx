import type { ReactNode } from 'react';
import { ActionPair, InlineLink, TLink } from '@/components/direction-c/primitives';
import { GA_COPY as S } from './copy';
import './google-ads.css';
import { Breadcrumb } from '../Breadcrumb';
import { Icon } from '../Icons';
import { Tabs } from '../Interactive';

/**
 * C+ Google Ads (/google-ads), G1 revision 2 (DEC-053; owner-approved R2 proposal): the static composition of the page,
 * built from `copy.ts`. Nothing here moves (motion is a later stage), and nothing is a client component: the four selectors
 * are the existing WAI-ARIA `Tabs` (every panel is shown, stacked, when JavaScript is off) and a native radio group.
 * Page metadata and structured data live in `page.tsx` and are not touched.
 *
 * The boundary device, used identically on every graphic: a TICKED box, or a SOLID frame, is part of the service (core
 * service and oversight, covered by the management fee); a DASHED outline, with an EMPTY dashed box where a box is used,
 * is work that is agreed separately, and nothing else is ever drawn dashed. A plain empty box or a hatched swatch is
 * neutral (not recorded, not confirmed, or a placeholder).
 */

const Tick = ({ on = false, sep = false }: { on?: boolean; sep?: boolean }) => (
  <span className={'ga-tick' + (on ? ' is-on' : '') + (sep ? ' is-sep' : '')} aria-hidden="true" />
);

/* A two-colour C+ heading: `a` in the plain colour, `b` in orange (`.b-named`). */
function Heading({ id, h, className }: { id: string; h: { a: string; b: string }; className?: string }) {
  return (
    <h2 id={id} className={'b-h2' + (className ? ' ' + className : '')}>
      {h.a} <span className="b-named">{h.b}</span>
    </h2>
  );
}

/* "the click." must not be left alone on a line: the last two words travel together. */
function keepEnd(text: string) {
  const words = text.split(' ');
  if (words.length < 3) return text;
  return (
    <>
      {words.slice(0, -2).join(' ')} <span className="ga-nowrap">{words.slice(-2).join(' ')}</span>
    </>
  );
}

/* ---------------------------------------------------------------- 1 hero -- */
function Hero() {
  const H = S.hero;
  const R = H.receipt;
  return (
    <section className="b-hero ga-hero" aria-labelledby="ga-h1">
      <div className="px-wrap b-hero-g h-hero-g ga-hero-g">
        <div>
          <Breadcrumb trail={['What we do']} current={H.crumb} />
          <p className="b-kicker">{H.kicker}</p>
          <h1 id="ga-h1" className="b-h1">
            <span className="ga-h1-a">{H.h1.a}</span> <span className="b-named ga-h1-b">{keepEnd(H.h1.b)}</span>
          </h1>
          <p className="b-lede">{H.lede}</p>
          <ActionPair primaryLabel={H.primary} secondaryLabel={H.secondary} />
        </div>

        {/* The receipt follows one search. The stage selector is a native radio group: the chosen stage lights the receipt
            lines that belong to it (CSS `:has()`), so it works with scripts off and with a keyboard. */}
        <figure className="ga-fig ga-follow">
          <fieldset className="ga-st">
            <legend className="ga-label">{H.stagesLabel}</legend>
            <div className="ga-st-row">
              {H.stages.map((s, i) => (
                <label key={s.key} className="ga-st-b">
                  <input type="radio" name="ga-stage" value={s.key} defaultChecked={i === 0} className="ga-st-in" />
                  <Icon name={s.icon} size={22} />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="ga-rc">
            <p className="ga-rc-title">{R.title}</p>
            <div className="ga-rc-part">
              <p className="ga-rc-k">
                <span className="ga-label">{R.topK}</span>
                <span className="ga-tag" data-st="click">
                  {R.topTag}
                </span>
              </p>
              <ul className="ga-rc-l">
                {R.top.map((t, i) => (
                  <li key={t} data-st={i === 0 ? 'search' : 'click'}>
                    <span>{t}</span>
                    <span className="ga-dots" aria-hidden="true" />
                    <Tick />
                  </li>
                ))}
              </ul>
            </div>
            <p className="ga-tear">
              <span>{R.tear}</span>
            </p>
            <div className="ga-rc-part ga-rc-ours">
              <p className="ga-rc-k">
                <span className="ga-label">{R.bottomK}</span>
                <span className="ga-tag ga-tag-ours">{R.bottomTag}</span>
              </p>
              <ul className="ga-rc-l">
                {R.bottom.map((t, i) => (
                  <li key={t} data-st={['search', 'click', 'click', 'visit enquiry'][i]}>
                    <span>{t}</span>
                    <span className="ga-dots" aria-hidden="true" />
                    <Tick on />
                  </li>
                ))}
              </ul>
            </div>
            <p className="ga-sep" data-st="enquiry">
              <Tick sep />
              <span>{R.separately}</span>
            </p>
          </div>
          <figcaption className="px-cap">{R.cap}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 2 factors -- */
function Factors() {
  const F = S.factors;
  return (
    <section className="b-sec b-paper ga-fac" aria-labelledby="ga-h-fac">
      <div className="px-wrap">
        <Heading id="ga-h-fac" h={F.h} />
        <p className="b-lede ga-fac-lede">{F.lede}</p>
        <Tabs
          className="ga-fx"
          label={F.tabsLabel}
          items={F.items.map((it) => ({
            id: it.key,
            tab: (
              <span className="ga-fx-tab">
                <Icon name={it.icon} size={22} />
                <span className="ga-fx-tt">
                  <span className="ga-fx-eyebrow">{it.group}</span>
                  <span className="ga-fx-label">{it.label}</span>
                </span>
              </span>
            ),
            panel: (
              <div className="ga-fx-panel">
                <h3 className="ga-fx-h">{it.label}</h3>
                <p className="ga-fx-q">{it.q}</p>
                <p className="ga-fx-a">
                  {it.a}
                  {'links' in it && it.links ? (
                    <>
                      {' '}
                      See{' '}
                      {it.links.map((l, i) => (
                        <span key={l.href}>
                          {i ? ' and ' : ''}
                          <InlineLink href={l.href}>{l.label}</InlineLink>
                        </span>
                      ))}
                      .
                    </>
                  ) : null}
                </p>
              </div>
            ),
          }))}
        />
        <p className="ga-fac-close">{F.close}</p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- 3 path -- */
type PathCase = (typeof S.path.cases)[number];

/* One ending of one search: where it stopped, what Google Ads recorded, what the business sees, and who acts. */
function Ending({ c }: { c: PathCase }) {
  const P = S.path;
  const status = P.laneYou.status[c.genuine as 'yes' | 'no' | 'not'];
  const ends = c.stop === 3;
  return (
    <div className="ga-jy" data-end={c.key}>
      <h3 className="ga-pf-h">{c.tab}</h3>
      <ol className="ga-jy-st">
        {P.stations.map((st, i) => {
          const cls = i < c.stop ? 'is-done' : i === c.stop ? 'is-stop' : 'is-off';
          const mark = i === c.stop && ends ? (c.genuine === 'yes' ? 'check' : 'cross') : null;
          return (
            <li key={st.key} className={cls + (mark ? ' has-' + mark : '')}>
              <span className="ga-jy-node" aria-hidden="true">
                <Icon name={mark || st.icon} size={22} />
              </span>
              <span className="ga-jy-name">{st.label}</span>
            </li>
          );
        })}
      </ol>

      <div className="ga-jy-read">
        <div className="ga-jy-box">
          <p className="ga-label">{P.laneAds.label}</p>
          <ul>
            <li>
              <Tick on />
              <span>{P.laneAds.items[0]}</span>
            </li>
            <li className={c.stop >= 1 ? '' : 'is-off'}>
              <Tick on={c.stop >= 1} />
              <span>{P.laneAds.items[1]}</span>
            </li>
            <li className={c.recorded ? '' : 'is-off'}>
              <Tick on={c.recorded} />
              <span>{P.laneAds.items[2]}</span>
            </li>
          </ul>
          <p className="ga-jy-note">{P.laneAds.note}</p>
        </div>
        <div className={'ga-jy-box ga-jy-you is-' + c.genuine}>
          <p className="ga-label">{P.laneYou.label}</p>
          <p>{P.laneYou.item}</p>
          <p className="ga-jy-status">
            <span className="ga-jy-ico" aria-hidden="true">
              <Icon name={c.genuine === 'yes' ? 'check' : 'cross'} size={20} />
            </span>
            {status}
          </p>
        </div>
      </div>

      <div className="ga-jy-case">
        <p className="ga-pf-text">{c.text}</p>
        {c.actor ? (
          <div className="ga-pf-act">
            <p>
              <Tick on />
              <span>{c.actor}</span>
            </p>
            {c.separately ? (
              <p className="ga-pf-sep">
                <Tick sep />
                <span>{c.separately}</span>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Path() {
  const P = S.path;
  return (
    <section className="b-sec b-ink ga-path" aria-labelledby="ga-h-path">
      <div className="px-wrap">
        <Heading id="ga-h-path" h={P.h} />
        <p className="ga-path-lede">{P.lede}</p>
        <Tabs
          className="ga-jy-tabs"
          label={P.tabsLabel}
          items={P.cases.map((c) => ({
            id: c.key,
            tab: (
              <span className="ga-jy-tab">
                <Icon name={c.icon} size={22} />
                <span>{c.tab}</span>
              </span>
            ),
            panel: <Ending c={c} />,
          }))}
        />
        <p className="ga-term">{P.term}</p>
        <p className="ga-pf-close">{P.close}</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- 4 scope -- */
type Chip = { chip: string; full: string; icon: string };

function Chips({ items }: { items: Chip[] }) {
  return (
    <ul className="ga-chips">
      {items.map((it) => (
        <li key={it.chip}>
          <Icon name={it.icon} size={20} />
          {/* the chip is the short label; assistive technology gets the full approved sentence instead, once */}
          <span aria-hidden="true">{it.chip}</span>
          <span className="px-sr">{it.full}</span>
        </li>
      ))}
    </ul>
  );
}

function Scope() {
  const C = S.scope;
  return (
    <section className="b-sec ga-scope" aria-labelledby="ga-h-scope">
      <div className="px-wrap">
        <Heading id="ga-h-scope" h={C.h} />
        <p className="ga-sc-sub">{C.sub}</p>
        <div className="ga-sc-g">
          <div className="ga-frame">
            <p className="ga-frame-k">{C.frame}</p>
            <div className="ga-frame-in">
              <div className="ga-layer">
                <h3 className="ga-label ga-layer-k">{C.core.k}</h3>
                <p className="ga-layer-t">{C.core.t}</p>
                <Chips items={C.core.items} />
              </div>
              <p className="ga-vtear" aria-hidden="true">
                <span>{C.tear}</span>
              </p>
              <div className="ga-layer">
                <h3 className="ga-label ga-layer-k">{C.oversight.k}</h3>
                <p className="ga-layer-t">{C.oversight.t}</p>
                <Chips items={C.oversight.items} />
              </div>
            </div>
          </div>
          <div className="ga-sepbox">
            <h3 className="ga-label ga-layer-k">{C.separate.k}</h3>
            <Chips items={C.separate.items} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- 5 answer -- */
function Answer() {
  const A = S.answer;
  return (
    <section className="b-sec b-ink ga-ans" aria-labelledby="ga-h-ans">
      <div className="px-wrap">
        <div className="ga-ans-top">
          <Heading id="ga-h-ans" h={A.h} />
          <p className="ga-ans-lede">{A.lede}</p>
        </div>
        <ul className="ga-pledges">
          {A.pledges.map((p) => (
            <li key={p.t} className="ga-pledge">
              <span className="ga-pledge-ico" aria-hidden="true">
                <Icon name={p.icon} size={26} />
              </span>
              <h3 className="ga-pledge-t">{p.t}</h3>
              {p.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </li>
          ))}
        </ul>
        <aside className="ga-qual">
          <p>{A.qualification}</p>
        </aside>
        <p className="ga-fee">
          {A.fee.text} <InlineLink href={A.fee.link.href}>{A.fee.link.label}</InlineLink>.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- 6 reporting -- */
function Reporting() {
  const G = S.reporting;
  return (
    <section className="b-sec b-paper ga-rep" aria-labelledby="ga-h-rep">
      <div className="px-wrap">
        <Heading id="ga-h-rep" h={G.h} />
        <p className="b-lede ga-rep-lede">{G.lede}</p>
        <div className="ga-rep-wrap">
          {/* the report: a header, the three things it covers (hatched bars are placeholders, not data), then the findings */}
          <div className="ga-mock-head">
            <p className="ga-mock-bar">
              <span className="ga-label">{G.report.k}</span>
              <span className="ga-tag ga-tag-solid">{G.report.note}</span>
            </p>
            <ul className="ga-mock-sec">
              {G.report.sections.map((t, i) => (
                <li key={t}>
                  <span>{t}</span>
                  <span className={'ga-hatch h' + (i + 1)} aria-hidden="true" />
                </li>
              ))}
            </ul>
            <p className="ga-label ga-mock-k">{G.findingsK}</p>
          </div>
          <Tabs
            className="ga-mock-tabs"
            label={G.tabsLabel}
            items={G.findings.map((f) => ({
              id: f.key,
              tab: <span className="ga-find-tab">{f.find}</span>,
              panel: (
                <div className="ga-dec">
                  <h3 className="ga-pf-h">{f.find}</h3>
                  <p className="ga-label">{G.findingLabel}</p>
                  <p className="ga-dec-f">{f.find}</p>
                  <span className="ga-dec-arr" aria-hidden="true" />
                  <p className="ga-label">{G.decisionLabel}</p>
                  <p className="ga-dec-d">{f.do}</p>
                </div>
              ),
            }))}
          />
          <p className="ga-mock-src">
            <span className="ga-hatch ga-hatch-sw" aria-hidden="true" />
            <span>{G.unknown}</span>
          </p>
          <p className="ga-mock-cap px-cap">{G.report.illus}</p>
        </div>
        <aside className="ga-limit">
          <p>{G.limit}</p>
        </aside>
        <p className="b-tlink">
          <TLink href={G.link.href}>{G.link.label}</TLink>
        </p>
        <p className="ga-related">
          {G.related.a}{' '}
          {G.related.links.map((l, i) => (
            <span key={l.href}>
              {i ? ' · ' : ''}
              <InlineLink href={l.href}>{l.label}</InlineLink>
            </span>
          ))}
          .
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 7 process -- */
function Process() {
  const P = S.process;
  return (
    <section className="b-sec ga-proc" aria-labelledby="ga-h-proc">
      <div className="px-wrap">
        <Heading id="ga-h-proc" h={P.h} />
        <ol className="ga-steps">
          {P.steps.map((s) => (
            <li key={s.t}>
              <span className="ga-step-ico" aria-hidden="true">
                <Icon name={s.icon} size={24} />
              </span>
              <p className="ga-step-t">{s.t}</p>
              <p className="ga-step-d">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="ga-proc-line">{P.line}</p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- 8 close -- */
function Close() {
  const N = S.close;
  return (
    <section className="b-close ga-next" aria-labelledby="ga-h-next">
      <div className="px-wrap b-close-in">
        <div>
          <h2 id="ga-h-next" className="b-h2">
            {N.h.a} {N.h.b}
          </h2>
          <p className="ga-prompt">
            <strong>{N.already.k}</strong> {N.already.t}
          </p>
          <p className="ga-prompt">
            <strong>{N.thinking.k}</strong> {N.thinking.t}
          </p>
        </div>
        <ActionPair primaryLabel={N.primary} secondaryLabel={N.secondary} />
      </div>
    </section>
  );
}

export function GoogleAdsBody(): ReactNode {
  return (
    <>
      <Hero />
      <Factors />
      <Path />
      <Scope />
      <Answer />
      <Reporting />
      <Process />
      <Close />
    </>
  );
}
