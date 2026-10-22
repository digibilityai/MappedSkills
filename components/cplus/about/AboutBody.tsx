import Image from 'next/image';
import Link from 'next/link';
import { ActionPair } from '@/components/direction-c/primitives';
import { Breadcrumb } from '../Breadcrumb';
import { AB, TEAM_HEADS } from './content';
import { Glyph } from './icons';
import './about.css';

/**
 * C+ About (/about): the owner-approved G1 design, frozen at R4 (DEC-060; docs/about-redesign/g1/mockup/), as a server
 * component with no client JavaScript. Five sections: hero with "the bigger picture" drawn still; why we work this way
 * (a still comparison); what you can count on us for (four commitments, the boundary, one line on guarantees); the four
 * team heads (placeholders until the owner supplies profiles: see TEAM_HEADS); close. The close uses the shared close's
 * classes and ActionPair, as /services does. Absent by decision: entity or Person JSON-LD.
 */
export function AboutBody() {
  const b = AB.big;
  const w = AB.why;
  const k = AB.count;
  const p = AB.people;
  const c = AB.close;
  const anyPlaceholder = TEAM_HEADS.some((t) => t.placeholder);
  return (
    <>
      {/* 1: hero (ground) */}
      <section className="b-hero ax-hero" aria-labelledby="ab-h1">
        <div className="px-wrap b-hero-g ax-hero-g">
          <div className="ax-hero-tx">
            <Breadcrumb current={AB.crumb} />
            <p className="b-kicker">{AB.kicker}</p>
            <h1 id="ab-h1" className="b-h1 ax-h1">
              <span>{AB.h1.a}</span> <span className="b-named">{AB.h1.b}</span>
            </h1>
            <p className="b-lede">{AB.lede}</p>
            <ActionPair primaryLabel={AB.primary} />
          </div>

          <figure className="ax-big" aria-label={b.label}>
            <div className="ax-big-frame">
              <span className="ax-big-k" aria-hidden="true">
                {b.k}
              </span>
              <ul className="ax-big-g" aria-hidden="true">
                {b.parts.map((part, i) => (
                  <li key={part.t} className={'ax-big-p' + (i + 1)}>
                    <span className="ax-big-i">
                      <Glyph name={part.icon} />
                    </span>
                    {part.t}
                  </li>
                ))}
                <li className="ax-big-c">
                  <span className="ax-big-i">
                    <Glyph name="mail" />
                  </span>
                  {b.centre}
                </li>
              </ul>
            </div>
            <figcaption className="ax-cap">{b.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2: why we work this way (ink): a still comparison, side by side on wide screens */}
      <section className="b-sec b-ink ax-why" aria-labelledby="ab-h-why">
        <div className="px-wrap">
          <div className="ax-why-head">
            <div>
              <p className="b-kicker">{w.kicker}</p>
              <h2 id="ab-h-why" className="b-h2">
                {w.h.a} <span className="b-named">{w.h.b}</span>
              </h2>
            </div>
            <div className="ax-why-l">
              <p>{w.body}</p>
            </div>
          </div>

          <div className="ax-cmp">
            {(['apart', 'together'] as const).map((key) => {
              const panel = w[key];
              return (
                <div key={key} className={'ax-cmp-p is-' + key}>
                  <h3 className="ax-cmp-h">{panel.t}</h3>
                  <ul className="ax-cmp-row">
                    {w.parts.map((part) => (
                      <li key={part.t}>
                        <span className="ax-cmp-i" aria-hidden="true">
                          <Glyph name={part.icon} />
                        </span>
                        {part.t}
                      </li>
                    ))}
                  </ul>
                  <p className="ax-cmp-end">
                    <span className="ax-cmp-q" aria-hidden="true">
                      {key === 'apart' ? '?' : <Glyph name="mail" />}
                    </span>
                    {panel.end}
                  </p>
                  <p className="ax-cmp-s">{panel.s}</p>
                </div>
              );
            })}
          </div>
          <p className="ax-cap ax-cap-ink">{w.cap}</p>
        </div>
      </section>

      {/* 3: what you can count on us for (paper) */}
      <section className="b-sec b-paper ax-count" aria-labelledby="ab-h-count">
        <div className="px-wrap">
          <p className="b-kicker">{k.kicker}</p>
          <h2 id="ab-h-count" className="b-h2">
            {k.h.a} <span className="b-named">{k.h.b}</span>
          </h2>

          <ol className="ax-commit">
            {k.items.map((item) => (
              <li key={item.t}>
                <span className="ax-commit-i" aria-hidden="true">
                  <Glyph name={item.icon} />
                </span>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </li>
            ))}
          </ol>

          <div className="ax-split" role="group" aria-label={k.splitLabel}>
            <div className="ax-ours">
              <p className="ax-split-t">{k.ours.t}</p>
              <p>{k.ours.d}</p>
            </div>
            <div className="ax-yours">
              <p className="ax-split-t">{k.yours.t}</p>
              <p>{k.yours.d}</p>
            </div>
          </div>
          <p className="ax-honest">
            {k.honest}{' '}
            <Link href={k.link.href}>
              {k.link.label} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* 4: the four team heads (ground). Placeholders until the owner supplies the profiles. */}
      <section className="b-sec ax-people" aria-labelledby="ab-h-people">
        <div className="px-wrap">
          <div className="ax-people-head">
            <div>
              <p className="b-kicker">{p.kicker}</p>
              <h2 id="ab-h-people" className="b-h2">
                {p.h.a} <span className="b-named">{p.h.b}</span>
              </h2>
              <p className="ax-people-l">{p.lede}</p>
            </div>
            {anyPlaceholder && <p className="ax-ph-tag">{p.placeholderTag}</p>}
          </div>
          <ul className="ax-team">
            {TEAM_HEADS.map((t, i) => (
              <li key={i} className={'ax-card' + (t.placeholder ? ' is-placeholder' : '')}>
                {t.photo ? (
                  <div className="ax-photo ax-photo-real">
                    <Image src={t.photo.src} alt={t.photo.alt} fill sizes="(max-width: 760px) 50vw, (max-width: 1080px) 50vw, 25vw" />
                  </div>
                ) : (
                  <div className="ax-photo">
                    <Glyph name="person" />
                    <span>{p.photo}</span>
                  </div>
                )}
                <h3 className="ax-card-n">{t.name}</h3>
                <p className="ax-card-r">{t.role}</p>
                <p className="ax-card-s">{t.intro}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* a slim, secondary pointer to /press (DEC-076) */}
      <aside className="ax-press" aria-labelledby="ab-h-press">
        <div className="px-wrap ax-press-in">
          <h2 id="ab-h-press" className="ax-press-k">
            {AB.press.h}
          </h2>
          <div className="ax-press-b">
            <p>{AB.press.body}</p>
            <Link className="ax-press-go" href="/press">
              <span>{AB.press.link}</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* 5: close (tangerine): contact primary, booking secondary; what happens next */}
      <section className="b-close ax-close" aria-labelledby="b-close-h">
        <div className="px-wrap">
          <div className="b-close-in">
            <div>
              <p className="b-kicker ax-close-k">{c.kicker}</p>
              <h2 id="b-close-h" className="b-h2">
                {c.h.a} <span className="ax-close-2">{c.h.b}</span>
              </h2>
              <p className="b-lede">{c.body}</p>
            </div>
            <ActionPair primaryLabel={AB.primary} />
          </div>
          <div className="ax-next">
            <p className="ax-next-k">{c.nextK}</p>
            <ol>
              {c.next.map((t, i) => (
                <li key={t}>
                  <b>{i + 1}</b>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
