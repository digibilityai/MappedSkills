import Link from 'next/link';
import { ActionPair } from '@/components/direction-c/primitives';
import { HOME } from './content';
import './home.css';
import { Icon } from '../Icons';
import { Close } from '../Close';
import { CountBar, Num, ReportPanel } from './HomeFigures';

/**
 * C+ Home (/): the approved prototype's page body (proto/direction-c-plus 0a8b611, ConceptH.tsx `Home`), unchanged in
 * markup and copy. It already used production destinations (ActionPair, live links). Production changes: local import
 * paths, and one owner-approved text link to /pricing under the accountability paragraph, in the hero's `b-tlink`
 * style.
 */
/* The approved fit sentences (content.ts HOME.fit), split at their own clauses — no new wording. */
const FIT_YES: { t: string; tag?: string }[] = [
  { t: 'A customer takes time to decide' },
  { t: 'One good enquiry is worth real money' },
  { t: 'You are willing to let us measure the path properly', tag: 'Not negotiable' },
];
const FIT_NO = ['Demand has to be created from nothing', 'What you sell is bought on impulse or price alone', 'You need the outcome guaranteed'];

export function HomeBody() {
  const h = HOME;
  return (
    <>
      {/* B — hero: value proposition + the traffic-vs-enquiry report */}
      <section className="b-hero" aria-labelledby="h-h1">
        <div className="px-wrap b-hero-g h-hero-g">
          <div>
            <h1 id="h-h1" className="b-h1">
              {h.hero.h1a} <span className="b-named">{h.hero.h1named}</span>
              {h.hero.h1b} <span className="b-traffic">{h.hero.h1traffic}</span>.
            </h1>
            <p className="b-lede">
              <b>{h.hero.lede}</b> {h.hero.ledeTail}
            </p>
            <ActionPair primaryLabel={h.hero.primary} />
            <p className="b-tlink">
              <Link href="/how-it-works">{h.hero.method} →</Link>
            </p>
          </div>
          <figure className="b-hero-fig">
            <ReportPanel />
            <figcaption className="px-cap">Illustration. Marks show kinds, not counts.</figcaption>
          </figure>
        </div>
      </section>

      {/* Diagnostic flow (round 2): one enquiry journey drawn left to right in the mark language. The three symptoms are
          three stretches of the SAME line; the tangerine bracket ties them to one problem. Art is aria-hidden; the
          meaning is the text under each stretch. Illustration only: mark counts carry no quantity. */}
      <section className="b-sec h-sym" aria-labelledby="h-h-sym">
        <div className="px-wrap">
          <p className="b-kicker">What this usually looks like from the inside</p>
          <h2 id="h-h-sym" className="b-h2">
            {h.symptomsTurn.a} <span className="b-named">{h.symptomsTurn.b}</span>
          </h2>
          <div className="h-flow" data-rv="">
            <ol>
              <li className="h-z h-z1" data-rv-i="">
                <div className="h-art" aria-hidden="true">
                  <span className="h-trk" />
                  <span className="h-branch" />
                  <span className="h-else">
                    <span>somebody else</span>
                  </span>
                  {[8, 20, 32].map((x, k) => (
                    <i key={'t' + k} className="dc-mk anon h-m" style={{ ['--x' as string]: x + '%', ['--k' as string]: k }} />
                  ))}
                  {[0, 1, 2].map((k) => (
                    <i key={'e' + k} className="dc-mk anon h-m h-m-else" style={{ ['--k' as string]: k + 3 }} />
                  ))}
                </div>
                <p className="h-z-st">{h.symptoms[0].stage}</p>
                <p className="h-z-t">
                  {h.symptoms[0].lead} <b>{h.symptoms[0].clause}</b>
                </p>
              </li>
              <li className="h-z h-z2" data-rv-i="">
                <div className="h-art" aria-hidden="true">
                  <span className="h-trk" />
                  <span className="h-page">
                    <span>page</span>
                  </span>
                  {[6, 14, 22, 30, 10, 18, 26].map((x, k) => (
                    <i key={k} className={'dc-mk anon h-m' + (k > 3 ? ' h-up' : '')} style={{ ['--x' as string]: x + '%', ['--k' as string]: k }} />
                  ))}
                  <i className="dc-mk open h-m h-m-none" style={{ ['--x' as string]: '78%', ['--k' as string]: 7 }} />
                  <span className="h-lab h-lab-none">enquiry</span>
                </div>
                <p className="h-z-st">{h.symptoms[1].stage}</p>
                <p className="h-z-t">
                  {h.symptoms[1].lead} <b>{h.symptoms[1].clause}</b>
                </p>
              </li>
              <li className="h-z h-z3" data-rv-i="">
                <div className="h-art" aria-hidden="true">
                  <span className="h-trk h-trk-lost" />
                  <span className="h-lab h-lab-q">source ?</span>
                  {[52, 66, 80].map((x, k) => (
                    <i key={k} className="dc-mk owned h-m" style={{ ['--x' as string]: x + '%', ['--k' as string]: k + 8 }} />
                  ))}
                </div>
                <p className="h-z-st">{h.symptoms[2].stage}</p>
                <p className="h-z-t">
                  {h.symptoms[2].lead} <b>{h.symptoms[2].clause}</b>
                </p>
              </li>
            </ol>
            <div className="h-one">
              <span className="h-one-br" aria-hidden="true" />
              <p>
                <b>One enquiry journey.</b> {h.symptomsNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* C — "Three skills. One route to an enquiry." (exact section), bridged by B's joins line */}
      <section className="c-sec c-paper h-skills" aria-labelledby="h-h-how">
        <div className="px-wrap">
          <p className="b-kicker">How the work produces an enquiry</p>
          <h2 id="h-h-how" className="c-h2">
            Three skills. <span className="c-tang">One route to an enquiry.</span>
          </h2>
          <ol className="c-tiles" data-rv="">
            {h.stages.map((s, i) => (
              <li key={s.key} className={'c-tile c-tile-' + i} data-rv-i="">
                <Icon name={['search', 'form', 'chart'][i]} size={56} className="c-tile-ic" />
                <h3 className="c-tile-t">{s.title}</h3>
                <p className="c-tile-s">{s.summary}</p>
                <p className="c-tile-l">
                  {s.links.map((l) => (
                    <Link key={l.href} href={l.href}>
                      {l.label}
                    </Link>
                  ))}
                </p>
              </li>
            ))}
          </ol>
          <div className="h-joins" data-rv="">
            {/* size container: the ribbon restacks when its own column cannot hold three chevrons (see proto.css) */}
            <div className="h-pipe-c">
              <div className="b-pipe" aria-hidden="true">
                <span className="on">Capture</span>
                <span className="on">Convert</span>
                <span className="on">Measure</span>
              </div>
            </div>
            <div>
              <p className="h-joins-t">
                {h.joins.a} <span className="b-named">{h.joins.b}</span>
              </p>
              <p className="b-body">{h.joins.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* B — accountability boundary */}
      <section className="b-sec" aria-labelledby="h-h-acc">
        <div className="px-wrap">
          <p className="b-kicker">{h.accountable.kicker}</p>
          <h2 id="h-h-acc" className="b-h2">
            {h.accountable.h} <span className="b-named">{h.accountable.named}</span>
          </h2>
          <div className="b-bound" data-rv="">
            <div className="b-bound-bar" aria-hidden="true">
              <span>Capture</span>
              <span>Convert</span>
              <span className="on">Enquiry</span>
              <span className="cl">Revenue · yours</span>
            </div>
            <p className="b-bound-lab" aria-hidden="true">
              ← the part we manage and measure
            </p>
          </div>
          <div className="b-acc-g">
            <div>
              <p className="b-body">{h.accountable.body}</p>
              <p className="b-body">{h.accountable.bodyLimits}</p>
              <p className="b-tlink">
                <Link href="/pricing">{h.accountable.pricing} →</Link>
              </p>
            </div>
            <ul className="b-np" aria-label="We do not promise">
              {h.notPromised.map((n) => (
                <li key={n}>
                  <span>{n}</span>
                  <em>not promised</em>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* B — proof: the published self-test as counts */}
      <section className="b-sec b-ink" aria-labelledby="h-h-proof">
        <div className="px-wrap">
          <p className="b-kicker">{h.proof.label}</p>
          <h2 id="h-h-proof" className="b-h2">
            {h.proof.claimA} <span className="b-named">{h.proof.claimNamed}</span>
          </h2>
          <p className="b-lede b-lede-ink">{h.proof.claimBody}</p>
          <p className="b-lede b-lede-ink">
            <b>{h.proof.ownTest}</b> {h.proof.method}
          </p>
          <p className="b-tlink">
            <Link href="/how-it-works">{h.proof.researchLink} →</Link>
          </p>
          <div className="b-proof-g" data-rv="">
            <div className="b-stats">
              <p>
                <b>
                  <Num value={h.proof.systems} />
                </b>
                AI assistants asked
              </p>
              <p>
                <b>
                  <Num value={h.proof.runs} />
                </b>
                runs, one day
              </p>
              <p>
                <b>
                  <Num value={h.proof.named} />
                </b>
                named us
              </p>
            </div>
            <div className="b-bars">
              <CountBar label="Runs that named MappedSkills" value={h.proof.named} of={h.proof.runs} mark="owned" />
              <CountBar label="Runs where directory sources appeared" value={h.proof.directories} of={h.proof.runs} mark="named" />
              <p className="b-limit">
                <b>Limitation.</b> {h.proof.limitation} Bars are counts; their order is not run order.
              </p>
            </div>
          </div>
          <p className="b-lede b-lede-ink">
            <b>{h.proof.cases}</b> {h.proof.casesBody}
          </p>
          <p className="b-tlink">
            <Link href="/work">{h.proof.casesLink} →</Link>
          </p>
        </div>
      </section>

      {/* Fit (round 4): an asymmetric editorial split. Good fit = a solid ink slab (dominant, bleeding left, anchored by
          one large owned mark); poor fit = a narrower dashed column, lower and muted. Solid = conditions we can work
          with; dashed = conditions we cannot. Neither ends in a result: each ends in "…for our approach". Criteria =
          the approved fit sentences, split at their own clauses. */}
      <section className="b-sec b-paper h-fit-sec" aria-labelledby="h-h-fit">
        <div className="px-wrap">
          <p className="b-kicker">Who this is built for</p>
          <h2 id="h-h-fit" className="b-h2 h-fit-h2">
            The right work starts with <span className="b-named">the right fit.</span>
          </h2>
        </div>
        <div className="px-wrap h-split" data-rv="">
          <div className="h-good" data-rv-i="">
            <span className="h-good-sq" aria-hidden="true" />
            <h3 className="h-good-h">This works where</h3>
            <ul className="h-rows">
              {FIT_YES.map((f) => (
                <li key={f.t} className={f.tag ? 'is-gate' : ''}>
                  <i className={'dc-mk ' + (f.tag ? 'owned' : 'named')} aria-hidden="true" />
                  <span>{f.t}</span>
                  {f.tag && <em className="h-fit-tag">{f.tag}</em>}
                </li>
              ))}
            </ul>
            <p className="h-good-end">A good fit for our approach.</p>
          </div>
          <div className="h-poor" data-rv-i="">
            <h3 className="h-poor-h">It is a poor fit where</h3>
            <ul className="h-rows h-rows-poor">
              {FIT_NO.map((t) => (
                <li key={t}>
                  <i className="dc-mk open" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="h-poor-end">A poor fit for our approach.</p>
          </div>
        </div>
      </section>
      <Close h={h.close.h} body={h.close.body} />
    </>
  );
}
