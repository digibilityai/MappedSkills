import Link from 'next/link';
import { Mark, Note, Section, Statement, TLink } from '@/components/direction-c/primitives';

/**
 * UI REVAMP GATE 2 — DIRECTION C — homepage strategy chapter (paper):
 * FRICTION, then THE CHAIN and where accountability stops.
 *
 * COPY: production `HomepageFriction` and `HomepageIntervention`, verbatim —
 * headings, display lines, the three routes, the rule label, the note and its
 * link; the stage titles, bodies and all seven stage links; the chain's node
 * names, the unattributed arrival, the boundary label and the client-owned
 * qualifier; and the figure's legend and its "Structure only" note.
 *
 * WHAT CHANGED FROM PRODUCTION, AND WHY (Gate 2 handoff):
 * - The production stage TABLIST (auto-advancing, one panel open at a time) is
 *   replaced by the prototype's static "chain lines": all three stages are
 *   open, nothing auto-advances and nothing is gated behind a control. The
 *   stage names stay h3, as they are in production's no-JS rendering.
 * - The chain is the prototype's HTML figure (a real ordered list) instead of
 *   three SVG drawings. Its accessible name is production's figure title.
 * - APP corrections to the prototype, for accuracy: Capture spans discovery
 *   only and Convert spans landing → the enquiry (the split production's
 *   figure states); the three joins are marked, because the legend names
 *   them; the prototype's chain sub-lines and its "Measure — every join
 *   recorded / Reported, not promised" key are NOT used — they are new copy
 *   with no approval, and "every join recorded" is a stronger claim than the
 *   approved "each enquiry records where it came from".
 */

const ROUTES = [
  { lead: 'They are searching, and', clause: 'finding somebody else.', marks: 4, mark: 'anon' as const },
  { lead: 'The visits arrive and', clause: 'the enquiries do not.', marks: 7, mark: 'anon' as const },
  { lead: 'Enquiries arrive, and', clause: 'nobody can say which came from where.', marks: 5, mark: 'open' as const },
];

const STAGES = [
  {
    title: 'Capture',
    body: 'Reach the buyers already looking. Some demand never reaches you at all.',
    links: [
      { href: '/seo', label: 'Organic search' },
      { href: '/google-ads', label: 'Google Ads' },
      { href: '/social-media-ads', label: 'Paid social' },
      { href: '/ai-seo', label: 'AI search' },
    ],
  },
  {
    title: 'Convert',
    body: 'Make the route from that first visit to a sent enquiry work.',
    links: [
      { href: '/conversion-optimization', label: 'Conversion optimisation' },
      { href: '/lead-generation', label: 'Lead generation' },
    ],
  },
  {
    title: 'Measure',
    body: 'Each enquiry records where it came from. What arrives with no usable trail is marked unattributed, never assigned.',
    links: [{ href: '/how-it-works', label: 'How we measure it' }],
    unattributed: 'One arrived with no usable trail.',
  },
];

/* Points on the chain. `join` marks the three joins where the work is done
   (production figure: ticks after discovery, landing and interaction). */
const POINTS = [
  { name: 'Discovery and source', mark: 'named' as const, join: true },
  { name: 'Landing', mark: 'named' as const, join: true },
  { name: 'Interaction', mark: 'named' as const, join: true },
  { name: 'The enquiry', mark: 'named' as const, join: false },
  { name: 'The qualified enquiry', mark: 'owned' as const, join: false },
];

const CHAIN_LABEL = 'The chain from demand to a recorded enquiry, and where our accountability stops';

export function HomeStrategy() {
  return (
    <Section id="how" tone="paper" labelledBy="dc-h-fr">
      {/* ---- FRICTION — composition: split (statement left, the problem right) */}
      <div className="dc-g12">
        <div className="dc-c-main dc-stack-md">
          <h2 id="dc-h-fr" className="dc-label">
            What this usually looks like from the inside
          </h2>
          <Statement>
            That reads like three problems. <span className="dc-k-named">It behaves like one.</span>
          </Statement>
          <Note>
            With no measurement in place, <b>all three failures look identical from the outside.</b>
          </Note>
          <TLink href="/problems/traffic-but-no-enquiries">If that is the shape of it, this page is about exactly that</TLink>
        </div>
        <div className="dc-c-side dc-fr-side" style={{ alignSelf: 'end' }}>
          <ul className="dc-friction" data-dc-motion="">
            {ROUTES.map((r) => (
              <li key={r.clause}>
                <p className="dc-txt">
                  {r.lead} <span>{r.clause}</span>
                </p>
                <span className="dc-run" aria-hidden="true">
                  {Array.from({ length: r.marks }).map((_, i) => (
                    <i key={i} className={`dc-mk ${r.mark}`} />
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <p className="dc-label dc-friction-rule">from the outside, all three look identical</p>
        </div>
      </div>

      {/* ---- THE CHAIN — composition: statement, then wide */}
      <div className="dc-g12 dc-gap-top">
        <div className="dc-c-statement dc-stack-sm">
          <h2 className="dc-label">How the work produces an enquiry</h2>
          <Statement>
            They are different skills. <span className="dc-k-named">The joins decide the result.</span>
          </Statement>
        </div>
        <figure className="dc-c-statement dc-chain" data-dc-motion="" aria-label={CHAIN_LABEL}>
          <p className="dc-pre-demand">demand we cannot see</p>
          <div className="dc-stages" aria-hidden="true">
            <p className="dc-label cap">Capture</p>
            <p className="dc-label cnv">Convert</p>
          </div>
          <div className="dc-track">
          <div className="dc-line" aria-hidden="true" />
          <ol className="dc-pts">
            {POINTS.map((p) => (
              <li key={p.name} className={`dc-pt${p.join ? ' join' : ''}`}>
                <Mark state={p.mark} />
                <b>{p.name}</b>
              </li>
            ))}
            <li className="dc-boundary">
              <span>We answer for this much</span>
            </li>
            <li className="dc-pt client">
              <Mark state="withheld" />
              <b>Opportunity and revenue</b>
              <small>&mdash; your numbers, from your system</small>
            </li>
          </ol>
          </div>
          <ul className="dc-chain-key">
            <li>
              <Mark state="named" />a point on the chain
            </li>
            <li>
              <Mark state="open" />
              arrived with no usable trail
            </li>
            <li>
              <span className="dc-join" aria-hidden="true" /> a join, where the work is done
            </li>
          </ul>
          <p className="dc-chain-note">
            Structure only. <b>No quantity, proportion, rate or duration is drawn</b>, and the spacing between points
            carries no meaning.
          </p>
        </figure>
        <ul className="dc-c-statement dc-chain-lines">
          {STAGES.map((s) => (
            <li key={s.title}>
              <h3 className="dc-label">{s.title}</h3>
              <div>
                <p className="dc-body">{s.body}</p>
                {s.unattributed && (
                  <p className="dc-unattr">
                    <Mark state="open" />
                    {s.unattributed}
                  </p>
                )}
                <p className="dc-links">
                  {s.links.map((l) => (
                    <Link key={l.href} href={l.href}>
                      {l.label}
                    </Link>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
