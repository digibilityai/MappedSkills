import { ActionPair, InlineLink, TLink } from '@/components/direction-c/primitives';
import { GA_COPY as S } from './copy';
import './google-ads.css';
import { Breadcrumb } from '../Breadcrumb';
import { Tabs } from '../Interactive';

/**
 * C+ Google Ads (/google-ads), G1: the static composition of the seven approved blocks (DEC-053), built from `copy.ts`.
 * Nothing here moves: the receipt print-in, the Path Figure draw-in and the findings arrows are a later stage (G2). The
 * one interaction is the Path Figure's case selector, the existing WAI-ARIA `Tabs` (every panel is shown, stacked, when
 * JavaScript is off). Page metadata and structured data live in `page.tsx` and are not touched.
 *
 * The boundary device, used identically on every graphic: a TICKED box is part of the service (core service and
 * oversight, covered by the management fee); a DASHED, EMPTY box is work that is agreed separately, and nothing else is
 * ever drawn dashed-and-empty. A plain empty box is neutral: not recorded, not confirmed, or not part of the service.
 */

const Tick = ({ on = false, sep = false }: { on?: boolean; sep?: boolean }) => (
  <span className={'ga-tick' + (on ? ' is-on' : '') + (sep ? ' is-sep' : '')} aria-hidden="true" />
);

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

type PathCase = (typeof S.path.cases)[number];

/* One Path Figure state. `brk` is the step where the path breaks (0 = none). Steps after the break are dimmed and their
   connectors dashed, except the last: "we learn, and decide what to change" always happens. */
function PathPanel({ c }: { c: PathCase }) {
  const P = S.path;
  const brk = c.key === 'searches' ? 2 : c.key === 'page' ? 3 : c.key === 'record' ? 4 : 0;
  const last = P.steps.length;
  const recorded = c.key === 'record';
  const dimAds = c.key === 'searches' || c.key === 'page';
  const dimYou = dimAds;
  return (
    <div className="ga-pf" data-case={c.key}>
      <h3 className="ga-pf-h">{c.tab}</h3>
      <ol className="ga-pf-steps">
        {P.steps.map((name, i) => {
          const n = i + 1;
          const cls = [
            brk && n === brk ? 'is-break' : '',
            brk && n > brk && n < last ? 'is-dim' : '',
            brk && n + 1 > brk && n < last ? 'is-seg-dashed' : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <li key={name} className={cls || undefined}>
              <span className="ga-pf-node" aria-hidden="true" />
              <span className="ga-pf-name">{name}</span>
            </li>
          );
        })}
      </ol>

      <div className="ga-pf-lane">
        <p className="ga-label">{P.laneAds.label}</p>
        <ul>
          <li className="c2">
            <span className="ga-pf-it">
              <Tick on />
              <span>{P.laneAds.items[0]}</span>
            </span>
            <span className="ga-pf-it">
              <Tick on />
              <span>{P.laneAds.items[1]}</span>
            </span>
          </li>
          <li className={'c4' + (dimAds ? ' is-dim' : '')}>
            <span className="ga-pf-it">
              <Tick on={recorded} />
              <span>{P.laneAds.items[2]}</span>
            </span>
            {!recorded ? <span className="ga-pf-note">{P.laneAds.note}</span> : null}
          </li>
        </ul>
      </div>

      <div className="ga-pf-lane">
        <p className="ga-label">{P.laneYou.label}</p>
        <ul>
          <li className={'c4' + (dimYou ? ' is-dim' : '')}>
            <span className="ga-pf-it">
              <Tick on={c.key === 'intended'} />
              <span>{P.laneYou.item}</span>
            </span>
          </li>
        </ul>
      </div>

      <div className="ga-pf-case">
        <p className="ga-pf-text">{c.text}</p>
        {c.actor ? (
          <div className="ga-pf-act">
            <p>
              <Tick on />
              <span>{c.actor}</span>
            </p>
            {c.separately ? (
              <p>
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

export function GoogleAdsBody() {
  const H = S.hero;
  const R = H.receipt;
  const F = S.factors;
  const P = S.path;
  const C = S.scope;
  const A = S.answer;
  const G = S.reporting;
  const N = S.next;
  const groups = [
    { key: 'core', cls: 'is-acct', k: C.core.k, t: C.core.t, items: C.core.items, sep: false },
    { key: 'oversight', cls: '', k: C.oversight.k, t: C.oversight.t, items: C.oversight.items, sep: false },
    { key: 'separate', cls: 'is-sep', k: C.separate.k, t: '', items: C.separate.items, sep: true },
  ];

  return (
    <>
      {/* 1 — hero (ground): the offer, and the One Click receipt */}
      <section className="b-hero ga-hero" aria-labelledby="ga-h1">
        <div className="px-wrap b-hero-g h-hero-g ga-hero-g">
          <div>
            <Breadcrumb trail={['What we do']} current={H.crumb} />
            <p className="b-kicker">{H.kicker}</p>
            <h1 id="ga-h1" className="b-h1">
              <span className="ga-h1-a">{H.h1.a}</span> <span className="b-named ga-h1-b">{keepEnd(H.h1.b)}</span>
            </h1>
            <p className="b-lede">{H.lede[0]}</p>
            <p className="b-lede ga-lede-2">{H.lede[1]}</p>
            <ActionPair primaryLabel={H.primary} secondaryLabel={H.secondary} />
          </div>

          <figure className="ga-fig">
            <div className="ga-rc">
              <p className="ga-rc-title">{R.title}</p>
              <div className="ga-rc-part">
                <p className="ga-rc-k">
                  <span className="ga-label">{R.topK}</span>
                  <span className="ga-tag">{R.topTag}</span>
                </p>
                <ul className="ga-rc-l">
                  {R.top.map((t) => (
                    <li key={t}>
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
                  {R.bottom.map((t) => (
                    <li key={t}>
                      <span>{t}</span>
                      <span className="ga-dots" aria-hidden="true" />
                      <Tick on />
                    </li>
                  ))}
                </ul>
              </div>
              <p className="ga-sep">
                <Tick sep />
                <span>{R.separately}</span>
              </p>
            </div>
            <figcaption className="px-cap">{R.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — what we look at before suggesting Google Ads (paper): an educational list; no score, no verdict */}
      <section className="b-sec b-paper ga-fac" aria-labelledby="ga-h-fac">
        <div className="px-wrap ga-fac-g">
          <div>
            <h2 id="ga-h-fac" className="b-h2">
              {F.h}
            </h2>
            <p className="b-lede ga-fac-lede">{F.lede}</p>
            <p className="ga-fac-close">{F.close}</p>
          </div>
          <dl className="dc-qa ga-qa">
            {F.items.map((it) => (
              <div key={it.q}>
                <dt>{it.q}</dt>
                <dd>
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
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 — from budget to enquiry (ink): the Path Figure. Cases are the existing Tabs; all panels show without JavaScript */}
      <section className="b-sec b-ink ga-path" aria-labelledby="ga-h-path">
        <div className="px-wrap">
          <h2 id="ga-h-path" className="b-h2">
            {P.h}
          </h2>
          <p className="ga-path-lede">{P.lede}</p>
          <Tabs
            className="ga-pf-tabs"
            label={P.tabsLabel}
            items={P.cases.map((c) => ({ id: c.key, tab: c.tab, panel: <PathPanel c={c} /> }))}
          />
          <p className="ga-term">{P.term}</p>
          <p className="ga-pf-close">{P.close}</p>
        </div>
      </section>

      {/* 4 — what the work covers (ground): core service and oversight are in the fee; the rest is agreed separately */}
      <section className="b-sec ga-scope" aria-labelledby="ga-h-scope">
        <div className="px-wrap">
          <h2 id="ga-h-scope" className="b-h2">
            {C.h}
          </h2>
          <p className="ga-sc-sub">{C.sub}</p>
          <div className="ga-groups">
            {groups.map((g) => (
              <div key={g.key} className={'ga-group' + (g.cls ? ' ' + g.cls : '')}>
                <h3 className="ga-label ga-group-k">{g.k}</h3>
                {g.t ? <p className="ga-group-t">{g.t}</p> : null}
                <ul className="ga-items">
                  {g.items.map((it) => (
                    <li key={it}>
                      <Tick on={!g.sep} sep={g.sep} />
                      <span className="ga-item-t">{it}</span>
                    </li>
                  ))}
                </ul>
                {g.key === 'core' ? (
                  <p className="ga-vtear" aria-hidden="true">
                    <span>{C.tear}</span>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          <p className="ga-callout">{C.callout}</p>
        </div>
      </section>

      {/* 5 — what we answer for (paper): commitments, one qualification, one fee line */}
      <section className="b-sec b-paper ga-ans" aria-labelledby="ga-h-ans">
        <div className="px-wrap ga-ans-g">
          <div>
            <h2 id="ga-h-ans" className="b-h2">
              {A.h}
            </h2>
            <p className="b-lede ga-ans-lede">{A.lede}</p>
            <aside className="ga-limit">
              <p>{A.qualification}</p>
            </aside>
            <p className="ga-fee">
              {A.fee.text} <InlineLink href={A.fee.link.href}>{A.fee.link.label}</InlineLink>.
            </p>
          </div>
          <ul className="ga-led">
            {A.items.map((it) => (
              <li key={it.t}>
                <Tick on />
                <p>
                  <strong>{it.t}</strong> {it.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — what you learn each month (ground): findings lead to decisions; attribution limits sit here */}
      <section className="b-sec ga-rep" aria-labelledby="ga-h-rep">
        <div className="px-wrap ga-rep-g">
          <div>
            <h2 id="ga-h-rep" className="b-h2">
              {G.h}
            </h2>
            <p className="b-lede ga-rep-lede">{G.lede}</p>
            <ul className="ga-q">
              {G.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
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
          <div>
            <p className="ga-label ga-pairs-k">{G.pairsK}</p>
            <ul className="ga-pairs">
              {G.pairs.map((p) => (
                <li key={p.find}>
                  <p className="ga-pair-f">{p.find}</p>
                  <span className="ga-pair-arr" aria-hidden="true" />
                  <p className="ga-pair-d">{p.do}</p>
                </li>
              ))}
            </ul>
            <aside className="ga-limit">
              <p>{G.limit}</p>
            </aside>
          </div>
        </div>
      </section>

      {/* 7 — next step (the shared close): both starting points, the confirmed process, both CTAs */}
      <section className="b-close ga-next" aria-labelledby="ga-h-next">
        <div className="px-wrap">
          <div className="b-close-in">
            <div>
              <h2 id="ga-h-next" className="b-h2">
                {N.h}
              </h2>
            </div>
            <ActionPair primaryLabel={N.primary} secondaryLabel={N.secondary} />
          </div>
          <div className="ga-start">
            <div className="ga-card">
              <p className="ga-card-k">{N.already.k}</p>
              <p>{N.already.t}</p>
            </div>
            <div className="ga-card">
              <p className="ga-card-k">{N.thinking.k}</p>
              <p>{N.thinking.t}</p>
            </div>
          </div>
          <ol className="ga-steps">
            {N.steps.map((s, i) => (
              <li key={s.t}>
                <span className="ga-step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="ga-step-t">{s.t}</p>
                <p className="ga-step-d">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="ga-next-line">{N.line}</p>
        </div>
      </section>
    </>
  );
}
