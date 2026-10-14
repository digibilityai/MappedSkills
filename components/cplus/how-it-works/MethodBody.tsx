import { ActionPair, Mark } from '@/components/direction-c/primitives';
import { HOME } from '../home/content';
import { METHOD_PLAIN as M } from './content';
import './how-it-works.css';
import { Icon } from '../Icons';
import { Close } from '../Close';
import { PrioritySort } from './PrioritySort';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ How It Works (/how-it-works): the approved prototype's page body (proto/direction-c-plus 0a8b611, MethodH.tsx
 * `Method`, including the OD-03 refinement), unchanged in markup and copy. It already used production destinations
 * (ActionPair, live links), so the only changes are local import paths. Every working sheet, the priority sort and the
 * action list are labelled illustrations of an example business.
 */

const STAGES = 6;

/* Sheet progress: six squares in the kicker, filled up to this section's stage. Decorative. */
function Progress({ n }: { n: number }) {
  return (
    <span className="hw-prog" aria-hidden="true">
      {Array.from({ length: STAGES }).map((_, i) => (
        <i key={i} className={i < n ? 'on' : undefined} />
      ))}
    </span>
  );
}

function Kicker({ n, children, ink }: { n: number; children: string; ink?: boolean }) {
  return (
    <p className={'b-kicker hw-kicker' + (ink ? ' hw-kicker-ink' : '')}>
      <Progress n={n} />
      {children}
    </p>
  );
}

/* The sheet frame shared by every framing. */
function SheetHead({ small }: { small?: boolean }) {
  return (
    <div className={'hw-sh-head' + (small ? ' hw-sh-head-s' : '')}>
      <span className="hw-sh-title">{M.sheetTitle}</span>
      <span className="hw-sh-eg">{M.example}</span>
    </div>
  );
}

/* 1 — hero sheet: the six rows, all empty except the start mark. */
function HeroSheet() {
  return (
    <div className="hw-sheet hw-sheet-hero" aria-hidden="true">
      <SheetHead />
      <ol className="hw-rows">
        {M.rows.map((r, i) => (
          <li key={r} className={i === 0 ? 'is-start' : undefined}>
            <span className="hw-row-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="hw-row-l">{r}</span>
            <span className="hw-row-v">
              {i === 0 ? (
                <span className="hw-start">
                  <Mark state="owned" /> {M.startHere}
                </span>
              ) : (
                <span className="hw-blank" />
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* 3 — the annotated sheet: five numbered regions, matching the five onboarding steps beside it. */
function AuditSheet() {
  const s = M.audit.sheet;
  return (
    <div className="hw-sheet hw-sheet-audit" aria-hidden="true">
      <SheetHead small />
      <div className="hw-as">
        <div className="hw-as-r" data-rv-i="">
          <span className="hw-pin">1</span>
          <p className="hw-as-l">{M.rows[0]}</p>
          <p className="hw-as-v">{s.want}</p>
        </div>
        <div className="hw-as-r" data-rv-i="">
          <span className="hw-pin">2</span>
          <p className="hw-as-l">{M.rows[1]}</p>
          <ul className="hw-as-list">
            {s.found.map((f) => (
              <li key={f}>
                <Mark state="named" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="hw-as-r" data-rv-i="">
          <span className="hw-pin">3</span>
          <p className="hw-as-l">{M.rows[2]}</p>
          <p className="hw-as-v">{s.plan}</p>
        </div>
        <div className="hw-as-r" data-rv-i="">
          <span className="hw-pin">4</span>
          <p className="hw-as-l">Proposal</p>
          <p className="hw-as-v">{s.proposal}</p>
        </div>
        <div className="hw-as-r hw-as-ok" data-rv-i="">
          <span className="hw-pin">5</span>
          <p className="hw-as-l">{M.rows[3]}</p>
          <p className="hw-stamp">
            <Icon name="check" size={22} /> {s.approved}
          </p>
        </div>
      </div>
    </div>
  );
}

export function MethodBody() {
  return (
    <>
      {/* 1 — hero (ivory): the question, and an almost-empty sheet */}
      <section className="b-hero hw-hero" aria-labelledby="hw-h1">
        <div className="px-wrap b-hero-g h-hero-g">
          <div>
            <Breadcrumb current={M.kicker} />
            <h1 id="hw-h1" className="b-h1">
              {M.h1.a} <span className="b-named">{M.h1.b}</span>
            </h1>
            <p className="b-lede">{M.lede}</p>
            <ActionPair primaryLabel={HOME.hero.primary} />
          </div>
          <figure className="hw-hero-fig">
            <HeroSheet />
            <figcaption className="px-cap">{M.heroCaption}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — the first conversation (ink): three steps; the message becomes the first entry */}
      <section className="b-sec b-ink hw-first" aria-labelledby="hw-h-first">
        <div className="px-wrap">
          <Kicker n={1} ink>
            {M.first.kicker}
          </Kicker>
          <h2 id="hw-h-first" className="b-h2">
            {M.first.h.a} <span className="b-named">{M.first.h.b}</span>
          </h2>
          <p className="b-lede b-lede-ink hw-first-b">{M.first.body}</p>
          <div className="hw-first-g">
            <ol className="hw-chain" data-rv="">
              {M.first.steps.map((s, i) => (
                <li key={s.t} data-rv-i="" className={i === 2 ? 'is-call' : undefined}>
                  <span className="hw-chain-ic" aria-hidden="true">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <p className="hw-chain-t">{s.t}</p>
                  <p className="hw-chain-d">{s.d}</p>
                </li>
              ))}
            </ol>
            <figure className="hw-entry" data-rv="">
              <div className="hw-bubble" data-rv-i="" aria-hidden="true">
                {M.first.bubble}
              </div>
              <div className="hw-entry-arrow" aria-hidden="true" data-rv-i="" />
              <div className="hw-sheet hw-sheet-entry" data-rv-i="" aria-hidden="true">
                <SheetHead small />
                <div className="hw-entry-row">
                  <span className="hw-row-n">01</span>
                  <span className="hw-row-l">{M.first.entryLabel}</span>
                  <span className="hw-entry-v">{M.first.entry}</span>
                </div>
              </div>
              <figcaption className="px-cap px-cap-ink">
                {M.first.note} <span className="px-sr">Example: {M.first.bubble} becomes “{M.first.entry}”.</span> Illustration.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 3 — understand, audit, recommend, approve (paper): five steps beside the annotated sheet */}
      <section className="b-sec b-paper hw-audit" aria-labelledby="hw-h-audit">
        <div className="px-wrap">
          <Kicker n={4}>{M.audit.kicker}</Kicker>
          <h2 id="hw-h-audit" className="b-h2">
            {M.audit.h.a} <span className="b-named">{M.audit.h.b}</span>
          </h2>
          <p className="b-lede hw-audit-b">{M.audit.body}</p>
          <div className="hw-audit-g">
            <ol className="hw-steps" data-rv="">
              {M.audit.steps.map((s, i) => (
                <li key={s.t} data-rv-i="" className={i === M.audit.steps.length - 1 ? 'is-ok' : undefined}>
                  <span className="hw-pin" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="hw-steps-t">{s.t}</h3>
                    <p className="hw-steps-d">{s.d}</p>
                  </div>
                </li>
              ))}
              <li className="hw-steps-then" data-rv-i="">
                <Icon name="arrow" size={22} />
                <span>{M.audit.then}</span>
              </li>
            </ol>
            <figure className="hw-audit-fig" data-rv="">
              <AuditSheet />
              <figcaption className="px-cap">{M.audit.caption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 4 — the priority sort (ivory): the signature interaction */}
      <section className="b-sec hw-sort" aria-labelledby="hw-h-sort">
        <div className="px-wrap">
          <div className="hw-sort-head">
            <div>
              <Kicker n={4}>{M.sort.kicker}</Kicker>
              <h2 id="hw-h-sort" className="b-h2 hw-sort-h">
                {M.sort.h.a} <span className="b-named">{M.sort.h.b}</span>
              </h2>
            </div>
            <p className="b-lede hw-sort-b">{M.sort.body}</p>
          </div>
          <PrioritySort
            lanes={M.sort.lanes}
            items={M.sort.items}
            button={M.sort.button}
            pileLabel={M.sort.pileLabel}
            statusSorted={M.sort.statusSorted}
            statusPile={M.sort.statusPile}
          />
          <p className="px-cap hw-sort-cap">{M.sort.caption}</p>

          {/* OD-03 T8: the judgement calls, five visible points (no disclosure) */}
          <div className="hw-decides">
            <div className="hw-decides-head">
              <h3 id="hw-h-decides" className="hw-sub-h">
                {M.sort.decides.h}
              </h3>
              <p className="hw-sub-lead">{M.sort.decides.lead}</p>
            </div>
            <ol className="hw-decides-list" aria-labelledby="hw-h-decides">
              {M.sort.decides.items.map((d, i) => (
                <li key={d.t}>
                  <span className="hw-decides-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>
                    <b>{d.t}</b>
                    {d.d ? <> {d.d}</> : null}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 5 — doing the work (ink): approved actions become done */}
      <section className="b-sec b-ink hw-work" aria-labelledby="hw-h-work">
        <div className="px-wrap hw-work-g">
          <div>
            <Kicker n={5} ink>
              {M.work.kicker}
            </Kicker>
            <h2 id="hw-h-work" className="b-h2">
              {M.work.h.a} <span className="b-named">{M.work.h.b}</span>
            </h2>
            <p className="b-lede b-lede-ink hw-work-b">{M.work.body}</p>
          </div>
          <figure className="hw-acts-fig">
            <div className="hw-sheet hw-sheet-acts">
              <SheetHead small />
              <table className="hw-acts" data-rv="">
                <caption className="px-sr">Example approved actions and their status (illustration)</caption>
                <thead>
                  <tr>
                    <th scope="col">{M.work.head.action}</th>
                    <th scope="col">{M.work.head.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {M.work.rows.map((r) => (
                    <tr key={r.t} data-rv-i="" className={'is-' + r.state}>
                      <th scope="row">
                        <span className="hw-acts-t">{r.t}</span>
                        {r.note && <span className="hw-acts-n">{r.note}</span>}
                      </th>
                      <td>
                        <span className="hw-st">
                          <span className="hw-st-m" aria-hidden="true">
                            {r.state === 'done' ? <Icon name="check" size={16} /> : null}
                          </span>
                          {r.s}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="px-cap px-cap-ink">{M.work.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* 6 — measuring and reviewing (paper): the review band + the monthly rhythm */}
      <section className="b-sec b-paper hw-review" aria-labelledby="hw-h-review">
        <div className="px-wrap">
          <Kicker n={6}>{M.review.kicker}</Kicker>
          <h2 id="hw-h-review" className="b-h2">
            {M.review.h.a} <span className="b-named">{M.review.h.b}</span>
          </h2>
          <p className="b-lede hw-review-b">{M.review.body}</p>
          <figure className="hw-band-fig">
            <ol className="hw-band" data-rv="">
              {M.review.band.map((b, i) => (
                <li key={b.t} data-rv-i="" className={'hw-band-' + i}>
                  <p className="hw-band-t">
                    <span className="hw-band-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    {b.t}
                  </p>
                  <p className="hw-band-d">{b.d}</p>
                  <p className="hw-band-eg">{b.eg}</p>
                </li>
              ))}
            </ol>
            <figcaption className="px-cap">{M.review.bandCaption}</figcaption>
          </figure>
          {/* OD-03 T1: the six measured points as a ledger — real, so no sheet shadow and no illustration tag */}
          <div className="hw-measure">
            <div className="hw-measure-head">
              <h3 id="hw-h-measure" className="hw-sub-h">
                {M.review.measure.h}
              </h3>
              <p className="hw-sub-lead">{M.review.measure.lead}</p>
            </div>
            <ol className="hw-ledger" aria-label={M.review.measure.listLabel}>
              {M.review.measure.points.map((p) => (
                <li key={p.n} className={p.owned ? 'is-owned' : p.beyond ? 'is-beyond' : undefined}>
                  <span className="hw-ledger-n" aria-hidden="true">
                    {p.n}
                  </span>
                  <p className="hw-ledger-t">
                    {p.owned ? <Mark state="owned" /> : null}
                    <b>{p.t}</b> <span className="hw-ledger-g">{p.g}</span>
                  </p>
                  <p className="hw-ledger-d">{p.d}</p>
                  {p.owned ? (
                    <p className="hw-ledger-line">
                      <span>{M.review.measure.boundary}</span>
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
          <div className="hw-review-g">
            <div className="hw-monthly">
              <h3 className="hw-monthly-h">{M.review.monthlyH}</h3>
              <ul>
                {M.review.monthly.map((m) => (
                  <li key={m.t}>
                    <span className="hw-monthly-ic" aria-hidden="true">
                      <Icon name={m.icon} size={26} />
                    </span>
                    {m.t}
                  </li>
                ))}
              </ul>
            </div>
            {/* OD-03 T2 */}
            <div className="hw-base">
              <p className="hw-base-t">
                <Mark state="open" /> <span>{M.review.baseline.t}</span>
              </p>
              <p className="hw-base-d">{M.review.baseline.d}</p>
            </div>
          </div>
        </div>

        {/* OD-03 ink half — T3, T4, T5. Never collapsed, no reveal motion: the limits are the part that must never be
            left hidden if a script fails. */}
        <div className="b-ink hw-limits">
          <div className="px-wrap">
            <div className="hw-lim-block">
              <div className="hw-lim-head">
                <h3 id="hw-h-not" className="hw-sub-h">
                  {M.review.notPromised.h}
                </h3>
                <p className="hw-sub-lead">{M.review.notPromised.lead}</p>
              </div>
              <ul className="hw-not" aria-label={M.review.notPromised.listLabel}>
                {M.review.notPromised.items.map((n) => (
                  <li key={n.t}>
                    <p className="hw-not-t">
                      <Mark state="open" /> <span>{n.t}</span>
                    </p>
                    <p className="hw-not-d">{n.d}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hw-lim-block">
              <div className="hw-lim-head">
                <h3 id="hw-h-gaps" className="hw-sub-h">
                  {M.review.gaps.h}
                </h3>
                <p className="hw-sub-lead">{M.review.gaps.lead}</p>
                <p className="hw-lim-def">{M.review.gaps.define}</p>
              </div>
              <div className="hw-gaps-w">
                <p className="hw-gaps-cols" aria-hidden="true">
                  <span>{M.review.gaps.colA}</span>
                  <span>{M.review.gaps.colB}</span>
                </p>
                <ol className="hw-gaps" aria-label={M.review.gaps.listLabel}>
                  {M.review.gaps.items.map((g, i) => (
                    <li key={g.a}>
                      <span className="hw-gaps-n" aria-hidden="true">
                        {i + 1}
                      </span>
                      <p className="hw-gaps-a">{g.a}</p>
                      <p className="hw-gaps-b">{g.b}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="hw-counts">
              <p className="hw-counts-lead">{M.review.counts.lead}</p>
              <p className="hw-counts-d">{M.review.counts.d}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — working together (ivory): two sides, then the tangerine close */}
      <section className="b-sec hw-together" aria-labelledby="hw-h-tog">
        <div className="px-wrap">
          <Kicker n={6}>{M.together.kicker}</Kicker>
          <h2 id="hw-h-tog" className="b-h2">
            {M.together.h.a} <span className="b-named">{M.together.h.b}</span>
          </h2>
          <div className="hw-two" data-rv="">
            <div className="hw-you" data-rv-i="">
              <h3 className="hw-two-h">{M.together.youH}</h3>
              <p className="hw-you-lead">{M.together.youLead}</p>
              <ul>
                {M.together.you.map((y) => (
                  <li key={y.t}>
                    <span className="hw-you-ic" aria-hidden="true">
                      <Icon name={y.icon} size={24} />
                    </span>
                    <span>
                      <b>{y.t}.</b> {y.d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hw-us" data-rv-i="">
              <h3 className="hw-two-h">{M.together.usH}</h3>
              <ul>
                {M.together.us.map((u) => (
                  <li key={u}>
                    <Mark state="owned" /> <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* OD-03 T6: what we do not know — four unknowns, visible, no reveal motion */}
          <div className="hw-unknown">
            <div className="hw-unknown-head">
              <h3 id="hw-h-unknown" className="hw-sub-h">
                {M.together.unknown.h}
              </h3>
              <p className="hw-sub-lead">{M.together.unknown.lead}</p>
            </div>
            <ul className="hw-unknown-list" aria-label={M.together.unknown.listLabel}>
              {M.together.unknown.items.map((u) => (
                <li key={u.t}>
                  <p className="hw-unknown-t">
                    <Mark state="open" /> <span>{u.t}</span>
                  </p>
                  <p className="hw-unknown-d">{u.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Close h={M.close.h} body={M.close.body} />
    </>
  );
}
