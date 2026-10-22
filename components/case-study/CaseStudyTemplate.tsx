import Link from 'next/link';
import type { ReactNode } from 'react';
import { BLOCKS, INLINES, MARKS, type Block, type Document } from '@contentful/rich-text-types';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { SECTORS } from '@/lib/case-study-library';
import { splitImpact, type Outcome } from '@/lib/case-study-outcomes';
import { linkTargetProps } from '@/lib/internal-links';
import type { CmsCaseStudy } from '@/lib/contentful/types';
import './case-study.css';

/**
 * The case-study page for a study on the new template (approved G7 design, "Spotlight"). Every word is the editor's own
 * Contentful text; nothing here computes, derives, rounds or infers a figure, a result or an approval.
 *
 * OUTCOMES. If the first bulleted list in `impact` is a clean outcome list (`lib/case-study-outcomes.ts`: every item
 * starts with bold text, no links, a figure always followed by its context), it is shown as an outcome board and as the
 * hero's lead outcome, and the rest of `impact` stays ordinary prose. Anything less certain than that, and `impact` is
 * rendered as the rich text it is. A bold number is a figure the editor emphasised: it is labelled "Reported figure",
 * never "verified", and it is always shown with everything the editor wrote after it (metric, period, source).
 */
export type NextStudy = { href: string; title: string; client: string };

type Props = {
  study: CmsCaseStudy;
  content: NonNullable<CmsCaseStudy['newLayout']>;
  service: { title: string; link: string } | null;
  showTestimonial: boolean;
  next: NextStudy | null;
};

const textOf = (n: { nodeType: string; value?: string; content?: unknown[] }): string =>
  n.nodeType === 'text' ? (n.value ?? '') : ((n.content ?? []) as Array<typeof n>).map(textOf).join('');

/** A list whose every item starts with a bold run is drawn as a sequence of named moves. */
const isLedList = (node: Block) =>
  (node.content as Block[]).every((li) => {
    const first = (li.content?.[0] as Block | undefined)?.content?.[0] as { nodeType: string; marks?: Array<{ type: string }> } | undefined;
    return first?.nodeType === 'text' && first.marks?.some((m) => m.type === 'bold');
  });

const options: Options = {
  renderMark: { [MARKS.BOLD]: (text) => <strong>{text}</strong> },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_n, children) => <p>{children}</p>,
    [BLOCKS.HEADING_1]: (_n, children) => <h3 className="ct-sub">{children}</h3>,
    [BLOCKS.HEADING_2]: (_n, children) => <h3 className="ct-sub">{children}</h3>,
    [BLOCKS.HEADING_3]: (_n, children) => <h3 className="ct-sub">{children}</h3>,
    [BLOCKS.HEADING_4]: (_n, children) => <h4 className="ct-sub">{children}</h4>,
    [BLOCKS.HEADING_5]: (_n, children) => <h4 className="ct-sub">{children}</h4>,
    [BLOCKS.HEADING_6]: (_n, children) => <h4 className="ct-sub">{children}</h4>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className={isLedList(node as Block) ? 'ct-moves' : 'ct-ul'}>{children}</ul>,
    [BLOCKS.OL_LIST]: (_n, children) => <ol className="ct-ol">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (_n, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_n, children) => <blockquote>{children}</blockquote>,
    [BLOCKS.TABLE]: (_n, children) => (
      <div className="ct-table">
        <table>
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (_n, children) => <tr>{children}</tr>,
    [BLOCKS.TABLE_HEADER_CELL]: (_n, children) => <th>{children}</th>,
    [BLOCKS.TABLE_CELL]: (_n, children) => <td>{children}</td>,
    [INLINES.HYPERLINK]: (node, children) => {
      const href = node.data?.uri as string | undefined;
      return (
        <a href={href} {...linkTargetProps(href)}>
          {children}
        </a>
      );
    },
  },
};

function Prose({ doc }: { doc: Document }) {
  const hasText = (doc?.content ?? []).some((b) => textOf(b).trim());
  return hasText ? <div className="ct-prose">{documentToReactComponents(doc, options)}</div> : null;
}

const Arrow = ({ down }: { down?: boolean }): ReactNode => <span aria-hidden="true">{down ? '↓' : '→'}</span>;

const long = (o: Outcome) => (o.lead.length > 6 ? ' is-long' : '');

const KIND = { figure: 'Reported figure', statement: 'Documented outcome' } as const;

export function CaseStudyTemplate({ study, content: c, service, showTestimonial, next }: Props) {
  const split = splitImpact(c.impact);
  const outcomes = split?.outcomes ?? [];
  const lead = outcomes[0] ?? null;
  const figures = outcomes.filter((o) => o.kind === 'figure');
  const [client = study.title, ...rest] = study.clientName.split(',').map((s) => s.trim()).filter(Boolean);
  const place = rest.join(', ');
  const sector = study.library.sector ? SECTORS[study.library.sector] : '';
  const chips = [sector || study.industry, study.library.period].filter(Boolean);
  const ctx = [
    { k: 'Client', v: [client, place].filter(Boolean).join(', ') },
    { k: 'Industry', v: study.industry },
    { k: 'Service', v: service?.title ?? '', href: service?.link },
    { k: 'Period', v: study.library.period },
  ].filter((x) => x.v);
  const boardTitle =
    figures.length && figures.length < outcomes.length ? 'Reported figures and documented outcomes' : figures.length ? 'Reported figures' : 'Documented outcomes';

  return (
    <article className="ct" aria-labelledby="ct-h1">
      <header className="ct-hero">
        <div className="px-wrap">
          <nav aria-label="Breadcrumb" className="ct-crumb">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/work">Case studies</Link> <span aria-hidden="true">/</span>{' '}
            <span aria-current="page">{client}</span>
          </nav>
          <div className={lead ? 'ct-hero-g' : 'ct-hero-g is-solo'}>
            <div className="ct-hero-a">
              <p className="ct-chips">
                {service ? (
                  <Link className="ct-chip is-svc" href={service.link}>
                    {service.title}
                  </Link>
                ) : null}
                {chips.map((x) => (
                  <span key={x} className="ct-chip">
                    {x}
                  </span>
                ))}
              </p>
              <p className="ct-client">{client}</p>
              <h1 id="ct-h1" className="ct-h1">
                {study.title}
              </h1>
              <p className="ct-lede">{c.summary}</p>
            </div>
            {lead ? <Spotlight o={lead} total={outcomes.length} /> : null}
          </div>
          <dl className="ct-ctx">
            {ctx.map((x) => (
              <div key={x.k}>
                <dt>{x.k}</dt>
                <dd>{x.href ? <Link href={x.href}>{x.v}</Link> : x.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Band id="problem" n={1} title="The problem" tone="ground">
        <Prose doc={c.problem} />
      </Band>

      <Band id="did" n={2} title="What we did" tone="paper">
        <Prose doc={c.whatWeDid} />
      </Band>

      <Band id="impact" n={3} title="The impact" tone="ground">
        {split ? (
          <>
            <Prose doc={split.before} />
            <div id="ct-outcomes" className="ct-board-w">
              <h3 className="ct-label">{boardTitle}</h3>
              <ul className="ct-board" data-count={outcomes.length}>
                {outcomes.map((o, i) => (
                  <Tile key={i} o={o} first={i === 0} />
                ))}
              </ul>
            </div>
            <Prose doc={split.after} />
          </>
        ) : (
          <Prose doc={c.impact} />
        )}
        {c.evidenceNote ? (
          <aside className="ct-evidence" aria-labelledby="ct-h-ev">
            <h3 id="ct-h-ev" className="ct-label">
              Evidence basis
            </h3>
            <p>{c.evidenceNote}</p>
          </aside>
        ) : null}
      </Band>

      {/* the one mid-page prompt: after the proof, before the quote */}
      <aside className="ct-prompt" aria-label="Start a conversation">
        <div className="px-wrap ct-prompt-in">
          <p>
            <strong>Recognise this problem?</strong> Tell us what you’re trying to fix.
          </p>
          <Link href={CONTACT_HREF} className="ct-prompt-a">
            Contact us <Arrow />
          </Link>
        </div>
      </aside>

      {showTestimonial && study.review?.quote ? (
        <figure className="ct-quote">
          <div className="px-wrap ct-quote-g">
            <p className="ct-label" aria-hidden="true">
              In the client’s words
            </p>
            <blockquote>
              <p>“{study.review.quote}”</p>
            </blockquote>
            <figcaption>
              <strong>{study.review.name}</strong> {client}
            </figcaption>
          </div>
        </figure>
      ) : null}

      {/* back to the library (always) and the next study (when there is one) */}
      <nav className="ct-next" aria-label="More case studies">
        <div className="px-wrap ct-next-g">
          <Link className="ct-back" href="/work">
            <span className="ct-label">Case studies</span>
            <span className="ct-back-t">
              <span aria-hidden="true">←</span> Back to all case studies
            </span>
          </Link>
          {next ? (
            <Link className="ct-next-a" href={next.href}>
              <span className="ct-label">Next case study · {next.client}</span>
              <span className="ct-next-t">
                {next.title} <Arrow />
              </span>
            </Link>
          ) : null}
        </div>
      </nav>

      <section className="b-close ct-close" aria-labelledby="ct-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker">{service ? `${service.title} · Case study` : 'Have a problem like this one?'}</p>
            <h2 id="ct-h-close" className="b-h2">
              Tell us what you’re trying to fix.
            </h2>
            <p className="b-lede">
              Tell us what you’re working towards. We’ll help you figure out where to start.
              {service ? (
                <>
                  {' '}
                  This case study is part of our <Link href={service.link}>{service.title}</Link> work.
                </>
              ) : null}
            </p>
          </div>
          <div className="dc-actions">
            <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
              <Mark />
              Contact us
            </Link>
            <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
              Request a call
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function Tile({ o, first }: { o: Outcome; first: boolean }) {
  const fig = o.kind === 'figure';
  return (
    <li className={fig ? 'ct-tile is-m' : 'ct-tile is-q'} data-first={first || undefined}>
      <p className="ct-tile-k">
        <Mark state={fig ? 'owned' : 'named'} />
        {KIND[o.kind]}
      </p>
      <p className={fig ? `ct-tile-fig${long(o)}` : 'ct-tile-st'}>{o.lead}</p>
      {o.context ? <p className="ct-tile-c">{o.context}</p> : null}
    </li>
  );
}

function Spotlight({ o, total }: { o: Outcome; total: number }) {
  const fig = o.kind === 'figure';
  return (
    <aside className="ct-spot" aria-labelledby="ct-spot-k">
      <p id="ct-spot-k" className="ct-spot-k">
        {KIND[o.kind]}
      </p>
      <p className={fig ? `ct-spot-fig${long(o)}` : 'ct-spot-st'}>{o.lead}</p>
      {o.context ? <p className="ct-spot-c">{o.context}</p> : null}
      <a className="ct-spot-a" href="#ct-outcomes">
        {total > 1 ? `All ${total} outcomes and evidence` : 'See the evidence'} <Arrow down />
      </a>
    </aside>
  );
}

function Band({ id, n, title, tone, children }: { id: string; n: number; title: string; tone: 'ground' | 'paper'; children: ReactNode }) {
  return (
    <section id={`ct-${id}`} className={`ct-band is-${tone}`} aria-labelledby={`ct-h-${id}`}>
      <div className="px-wrap ct-band-g">
        <div className="ct-band-h">
          <p className="ct-num" aria-hidden="true">
            {String(n).padStart(2, '0')}
          </p>
          <h2 id={`ct-h-${id}`} className="ct-h2">
            {title}
          </h2>
        </div>
        <div className="ct-band-b">{children}</div>
      </div>
    </section>
  );
}
