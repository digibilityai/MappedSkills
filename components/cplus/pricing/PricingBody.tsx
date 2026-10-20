import type { CSSProperties } from 'react';
import { ActionPair } from '@/components/direction-c/primitives';
import { Breadcrumb } from '../Breadcrumb';
import { PR } from './content';
import { Glyph } from './icons';
import './pricing.css';

/**
 * C+ Pricing (/pricing): the owner-approved G1 R0 design (docs/pricing-redesign/g1/mockup/) as a server component with
 * no client JavaScript. Five sections: hero with a price tag that carries no number; what affects your price (three
 * factors on one less-to-more axis); what your fee covers (optional vs standard work, the proposal contents, ad spend vs
 * fee); how you get a quote (three steps ending in the client's decision); close. Fully customised pricing: no prices,
 * packages, ranges, currency or time promises. Absent by decision: page-level structured data (none before either).
 */
export function PricingBody() {
  const t = PR.tag;
  const a = PR.aff;
  const v = PR.cov;
  const h = PR.how;
  const c = PR.close;
  return (
    <>
      {/* 1: hero (ground) */}
      <section className="b-hero pr-hero" aria-labelledby="pr-h1">
        <div className="px-wrap b-hero-g pr-hero-g">
          <div className="pr-hero-tx">
            <Breadcrumb current={PR.crumb} />
            <p className="b-kicker">{PR.kicker}</p>
            <h1 id="pr-h1" className="b-h1 pr-h1">
              <span>{PR.h1.a}</span> <span className="b-named">{PR.h1.b}</span>
            </h1>
            <p className="b-lede">{PR.lede}</p>
            <ActionPair primaryLabel={PR.primary} />
          </div>

          <figure className="pr-tag-fig" aria-label={t.label}>
            <div className="pr-tag-w" aria-hidden="true">
              <div className="pr-tag">
                <span className="pr-tag-hole" />
                <p className="pr-tag-k">{t.k}</p>
                <p className="pr-tag-v">
                  {t.v.a} <span>{t.v.b}</span>
                </p>
                <ul className="pr-tag-l">
                  {t.lines.map((line) => (
                    <li key={line}>
                      <Glyph name="check" />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="pr-tag-f">
                  <Glyph name="ok" />
                  {t.foot}
                </p>
              </div>
            </div>
            <figcaption className="pr-cap">{t.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2: what affects your price (paper): three factors, each drawn still over one shared less-to-more axis */}
      <section className="b-sec b-paper pr-aff" aria-labelledby="pr-h-aff">
        <div className="px-wrap">
          <div className="pr-head">
            <div>
              <p className="b-kicker">{a.kicker}</p>
              <h2 id="pr-h-aff" className="b-h2">
                {a.h.a} <span className="b-named">{a.h.b}</span>
              </h2>
            </div>
            <p className="pr-head-l">{a.line}</p>
          </div>

          <ol className="pr-aff-g">
            <li className="pr-f">
              <span className="pr-f-n" aria-hidden="true">
                1
              </span>
              <h3 className="pr-f-t">{a.need.t}</h3>
              <p className="pr-f-p">{a.need.p}</p>
              <div className="pr-f-fig pr-f-need" aria-hidden="true">
                <div className="pr-need-a">
                  <span className="pr-blk" />
                </div>
                <div className="pr-need-b">
                  <span className="pr-blk" />
                  <span className="pr-blk" />
                  <span className="pr-blk" />
                </div>
              </div>
              <Scale ends={a.need.scale} />
            </li>
            <li className="pr-f">
              <span className="pr-f-n" aria-hidden="true">
                2
              </span>
              <h3 className="pr-f-t">{a.fix.t}</h3>
              <p className="pr-f-p">{a.fix.p}</p>
              <ul className="pr-f-fig pr-fix" aria-hidden="true">
                {a.fix.rows.map((row) => (
                  <li key={row.t} className={row.ok ? undefined : 'is-fixrow'}>
                    <span>{row.t}</span>
                    <b className={row.ok ? 'is-ok' : 'is-fix'}>{row.ok ? a.fix.okLabel : a.fix.fixLabel}</b>
                  </li>
                ))}
              </ul>
              <Scale ends={a.fix.scale} />
            </li>
            <li className="pr-f">
              <span className="pr-f-n" aria-hidden="true">
                3
              </span>
              <h3 className="pr-f-t">{a.load.t}</h3>
              <p className="pr-f-p">{a.load.p}</p>
              <ul className="pr-f-fig pr-load" aria-hidden="true">
                {a.load.rows.map((row) => (
                  <li key={row.t}>
                    <span>{row.t}</span>
                    <i style={{ '--v': row.v } as CSSProperties} />
                  </li>
                ))}
              </ul>
              <Scale ends={a.load.scale} />
            </li>
          </ol>
          <p className="pr-cap">{a.cap}</p>
        </div>
      </section>

      {/* 3: what your fee covers (ink): dashed = if you need it, solid = standard with ongoing work */}
      <section className="b-sec b-ink pr-cov" aria-labelledby="pr-h-cov">
        <div className="px-wrap">
          <div className="pr-head">
            <div>
              <p className="b-kicker">{v.kicker}</p>
              <h2 id="pr-h-cov" className="b-h2">
                {v.h.a} <span className="b-named">{v.h.b}</span>
              </h2>
            </div>
            <p className="pr-head-l">{v.line}</p>
          </div>

          <ol className="pr-chain">
            {v.chain.map((item) => (
              <li key={item.t} className={'pr-c' + (item.std ? ' is-std' : '')}>
                <span className="pr-c-i" aria-hidden="true">
                  <Glyph name={item.icon} />
                </span>
                <h3 className="pr-c-t">{item.t}</h3>
                <p className="pr-c-p">{item.p}</p>
                <p className="pr-c-tag">{item.tag}</p>
              </li>
            ))}
          </ol>

          <div className="pr-prop">
            <p className="pr-prop-t">
              <span className="pr-prop-i" aria-hidden="true">
                <Glyph name="plan" />
              </span>
              {v.prop.t}
            </p>
            <ul className="pr-prop-l">
              {v.prop.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li className="is-fee">{v.prop.fee}</li>
            </ul>
          </div>

          <div className="pr-spend" role="group" aria-label={v.spend.label}>
            <div className="pr-spend-a">
              <p className="pr-spend-k">{v.spend.a.k}</p>
              <p>{v.spend.a.p}</p>
            </div>
            <div className="pr-spend-b">
              <p className="pr-spend-k">{v.spend.b.k}</p>
              <p>{v.spend.b.p}</p>
            </div>
          </div>
          <p className="pr-cap pr-cap-ink">{v.cap}</p>
        </div>
      </section>

      {/* 4: how you get a quote (ground): one line through three numbers, tangerine at the client's decision */}
      <section className="b-sec pr-how" aria-labelledby="pr-h-how">
        <div className="px-wrap">
          <p className="b-kicker">{h.kicker}</p>
          <h2 id="pr-h-how" className="b-h2">
            {h.h.a} <span className="b-named">{h.h.b}</span>
          </h2>
          <ol className="pr-steps">
            {h.steps.map((step, i) => (
              <li key={step.n} className={'pr-s' + (i === h.steps.length - 1 ? ' is-you' : '')}>
                <span className="pr-s-n" aria-hidden="true">
                  {step.n}
                </span>
                <h3 className="pr-s-t">{step.t}</h3>
                <p className="pr-s-p">{step.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5: close (tangerine, the shared close's classes) */}
      <section className="b-close pr-close" aria-labelledby="b-close-h">
        <div className="px-wrap">
          <div className="b-close-in">
            <div>
              <p className="b-kicker pr-close-k">{c.kicker}</p>
              <h2 id="b-close-h" className="b-h2">
                {c.h.a} <span className="pr-close-2">{c.h.b}</span>
              </h2>
              <p className="b-lede">{c.lede}</p>
            </div>
            <ActionPair primaryLabel={c.primary} />
          </div>
        </div>
      </section>
    </>
  );
}

function Scale({ ends }: { ends: string[] }) {
  return (
    <p className="pr-scale" aria-hidden="true">
      <span>{ends[0]}</span>
      <span>{ends[1]}</span>
    </p>
  );
}
