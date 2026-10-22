import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { BLOCKS, INLINES, MARKS, type Block, type Document, type Text } from '@contentful/rich-text-types';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { SECTORS } from '@/lib/case-study-library';
import { splitImpact, type Outcome } from '@/lib/case-study-outcomes';
import { linkTargetProps } from '@/lib/internal-links';
import type { CmsCaseStudy } from '@/lib/contentful/types';
import './case-study.css';

/**
 * The case-study page for a study on the new template (approved G7 design, "Spotlight"; R2 composition). Every word is
 * the editor's own Contentful text; nothing here computes, derives, rounds or infers a figure, a result or an approval.
 *
 * R3 COMPOSITION. Each section is read from the existing rich-text fields; no field is added. Two editor conventions,
 * both optional, change only the presentation:
 * - a FIRST paragraph that is entirely bold is the section's takeaway headline; the paragraph after it is the intro;
 * - a bulleted list whose every item starts with bold text is shown as bullets: a bold lead and its explanation.
 * Without them a section renders as ordinary prose, so short, long and qualitative-only studies all work.
 *
 * OUTCOMES. If the first bulleted list in `impact` is a clean outcome list (`lib/case-study-outcomes.ts`), figures are
 * shown as a results panel (the first one large) and statements as documented outcomes beneath it; the first outcome
 * also leads the hero. A bold number is a figure the editor emphasised: labelled "Reported figure", never "verified",
 * and always shown with everything the editor wrote after it. A before → after figure is laid out as its two values;
 * its type is sized to its length so it never leaves its block.
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

const isBold = (r: { nodeType: string; marks?: Array<{ type: string }> }) => r.nodeType === 'text' && Boolean(r.marks?.some((m) => m.type === 'bold'));

/** A list whose every item starts with a bold run is a set of labelled blocks. */
const isLedList = (node: Block) =>
  node.nodeType === 'unordered-list' &&
  (node.content as Block[]).every((li) => {
    const first = (li.content?.[0] as Block | undefined)?.content?.[0] as { nodeType: string; marks?: Array<{ type: string }> } | undefined;
    return Boolean(first && isBold(first));
  });

/** A takeaway: a first paragraph made only of bold text, short enough to be a headline. */
const TAKEAWAY_MAX = 140;
function takeaway(doc: Document | null | undefined): { headline: string | null; rest: Document } {
  const blocks = (doc?.content ?? []) as Block[];
  const first = blocks[0];
  const runs = (first?.content ?? []) as Array<{ nodeType: string; value?: string; marks?: Array<{ type: string }> }>;
  const text = first ? textOf(first).trim() : '';
  const all = first?.nodeType === 'paragraph' && runs.length > 0 && runs.every((r) => isBold(r) || !(r.value ?? '').trim());
  if (all && text && text.length <= TAKEAWAY_MAX) return { headline: text, rest: { ...(doc as Document), content: blocks.slice(1) } as Document };
  return { headline: null, rest: (doc ?? { nodeType: 'document', data: {}, content: [] }) as Document };
}

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
    [BLOCKS.UL_LIST]: (node, children) => <ul className={isLedList(node as Block) ? 'ct-bullets' : 'ct-ul'}>{children}</ul>,
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

const hasText = (doc: Document | null | undefined) => (doc?.content ?? []).some((b) => textOf(b as Block).trim());

function Prose({ doc }: { doc: Document }) {
  return hasText(doc) ? <div className="ct-prose">{documentToReactComponents(doc, options)}</div> : null;
}

/**
 * Blocks of a section, in the editor's order. A labelled list (every item starts with bold text) is shown as a
 * bulleted list: each bullet is the editor's own item, its bold lead followed by the explanation. Every other block is
 * prose. The first paragraph after a takeaway is the section's introduction.
 *
 * No `data-count` (or any other `data-*` hook) on these elements: `[data-count]` is the site-wide count-up hook in
 * `components/cplus/CplusMotion.tsx`, which replaces an element's content with its number when it scrolls into view.
 */
function Blocks({ doc }: { doc: Document }) {
  const groups: ReactNode[] = [];
  let prose: Block[] = [];
  const flush = (k: number) => {
    if (prose.length) groups.push(<Prose key={`p${k}`} doc={{ ...doc, content: prose } as Document} />);
    prose = [];
  };
  ((doc.content ?? []) as Block[]).forEach((b, k) => {
    if (!isLedList(b)) return void prose.push(b);
    flush(k);
    groups.push(
      <ul key={`l${k}`} className="ct-bullets">
        {(b.content as Block[]).map((li, i) => (
          <li key={i}>{documentToReactComponents({ nodeType: 'document', data: {}, content: li.content } as unknown as Document, options)}</li>
        ))}
      </ul>,
    );
  });
  flush(-1);
  return groups.length ? <>{groups}</> : null;
}

/** A section body: the takeaway headline (if the editor wrote one), then its blocks. */
function SectionBody({ doc }: { doc: Document }) {
  const { headline, rest } = takeaway(doc);
  return (
    <>
      {headline ? <p className="ct-take">{headline}</p> : null}
      <div className={headline ? 'ct-sec is-led' : 'ct-sec'}>
        <Blocks doc={rest} />
      </div>
    </>
  );
}

const Arrow = ({ down }: { down?: boolean }): ReactNode => <span aria-hidden="true">{down ? '↓' : '→'}</span>;

const KIND = { figure: 'Reported figure', statement: 'Documented outcome' } as const;

/** Split a before → after figure into its two values exactly as written; anything else stays whole. */
const PAIR = /^(.+?)\s*(?:→|->)\s*(.+)$|^(.+?)\s+to\s+(.+)$/i;
function pairOf(lead: string): [string, string] | null {
  const m = PAIR.exec(lead);
  if (!m) return null;
  return m[1] ? [m[1].trim(), m[2].trim()] : [m[3].trim(), m[4].trim()];
}

/**
 * A figure, sized to its length inside its own block (container units), so a long value or a before → after pair
 * shrinks rather than overflowing; if it still cannot fit at the minimum size, the pair wraps after the arrow.
 */
function Figure({ lead, size }: { lead: string; size: 'xl' | 'l' | 'm' }) {
  const pair = pairOf(lead);
  const units = pair ? pair[1].length + pair[0].length * 0.5 + 1.4 : lead.length;
  const style = { '--n': Math.max(units, 3.2).toFixed(2) } as CSSProperties;
  return (
    <div className={`ct-fig is-${size}`} style={style}>
      {pair ? (
        <p className="ct-fig-v is-pair">
          <span className="px-sr">{`${pair[0]} to ${pair[1]}`}</span>
          <span className="ct-fig-b" aria-hidden="true">
            {pair[0]}
          </span>
          <span className="ct-fig-x" aria-hidden="true">
            →
          </span>
          <span className="ct-fig-a" aria-hidden="true">
            {pair[1]}
          </span>
        </p>
      ) : (
        <p className="ct-fig-v">
          <span className="ct-fig-a">{lead}</span>
        </p>
      )}
    </div>
  );
}

export function CaseStudyTemplate({ study, content: c, service, showTestimonial, next }: Props) {
  const impact = takeaway(c.impact);
  const split = splitImpact(impact.rest);
  const outcomes = split?.outcomes ?? [];
  const lead = outcomes[0] ?? null;
  const figures = outcomes.filter((o) => o.kind === 'figure');
  const statements = outcomes.filter((o) => o.kind === 'statement');

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
    figures.length && statements.length ? 'Reported figures and documented outcomes' : figures.length ? 'Reported figures' : 'Documented outcomes';
  // the quote's attribution: the named person (if any, and not just the company again), then the client
  const quoteBy = study.review?.name?.trim() || '';
  const quotePerson = quoteBy && quoteBy !== 'Client' && quoteBy.toLowerCase() !== client.toLowerCase() ? quoteBy : '';

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
        <SectionBody doc={c.problem} />
      </Band>

      <Band id="did" n={2} title="What we did" tone="paper">
        <SectionBody doc={c.whatWeDid} />
      </Band>

      <Band
        id="impact"
        n={3}
        title="The impact"
        tone="ground"
        after={
          split || c.evidenceNote ? (
            <div className="ct-impact-w">
              {split ? (
                <div id="ct-outcomes" className="ct-results">
                  <h3 className="ct-label">{boardTitle}</h3>
                  {figures.length ? (
                    <div className={figures.length > 1 ? 'ct-res' : 'ct-res is-one'}>
                      <div className="ct-res-lead">
                        <p className="ct-res-k">
                          <Mark state="owned" />
                          {KIND.figure}
                        </p>
                        <Figure lead={figures[0].lead} size="xl" />
                        <p className="ct-res-c">{figures[0].context}</p>
                      </div>
                      {figures.length > 1 ? (
                        <ul className="ct-res-more">
                          {figures.slice(1).map((o, i) => (
                            <li key={i}>
                              <Figure lead={o.lead} size="m" />
                              <p className="ct-res-c">{o.context}</p>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ) : null}
                  {statements.length ? (
                    <ul className={figures.length ? 'ct-said' : 'ct-said is-only'}>
                      {statements.map((o, i) => (
                        <li key={i}>
                          <p className="ct-said-k">
                            <Mark state="named" />
                            {KIND.statement}
                          </p>
                          <p className="ct-said-t">{o.lead}</p>
                          {o.context ? <p className="ct-said-c">{o.context}</p> : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
              <div className="ct-impact-tail">
                {split ? <Blocks doc={split.after} /> : null}
                {c.evidenceNote ? (
                  <aside className="ct-evidence" aria-labelledby="ct-h-ev">
                    <h3 id="ct-h-ev" className="ct-label">
                      Evidence basis
                    </h3>
                    <p>{c.evidenceNote}</p>
                  </aside>
                ) : null}
              </div>
            </div>
          ) : null
        }
      >
        {impact.headline ? <p className="ct-take">{impact.headline}</p> : null}
        <div className={impact.headline ? 'ct-sec is-led' : 'ct-sec'}><Blocks doc={split ? split.before : impact.rest} /></div>
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
            <p className="ct-label ct-quote-k">In the client’s words</p>
            <div className="ct-quote-b">
              <blockquote>
                <p>{study.review.quote}</p>
              </blockquote>
              <figcaption>
                {quotePerson ? <strong>{quotePerson}</strong> : null}
                <span className={quotePerson ? 'ct-quote-org' : 'ct-quote-org is-only'}>
                  {client}
                  {place ? <span className="ct-quote-pl">, {place}</span> : null}
                </span>
              </figcaption>
            </div>
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

      {/* close: the shared tangerine close, at the /work listing's proportions */}
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

function Spotlight({ o, total }: { o: Outcome; total: number }) {
  const fig = o.kind === 'figure';
  return (
    <aside className="ct-spot" aria-labelledby="ct-spot-k">
      <p id="ct-spot-k" className="ct-spot-k">
        {KIND[o.kind]}
      </p>
      {fig ? <Figure lead={o.lead} size="l" /> : <p className="ct-spot-st">{o.lead}</p>}
      {o.context ? <p className="ct-spot-c">{o.context}</p> : null}
      <a className="ct-spot-a" href="#ct-outcomes">
        {total > 1 ? `All ${total} outcomes and evidence` : 'See the evidence'} <Arrow down />
      </a>
    </aside>
  );
}

function Band({
  id,
  n,
  title,
  tone,
  children,
  after,
}: {
  id: string;
  n: number;
  title: string;
  tone: 'ground' | 'paper';
  children: ReactNode;
  after?: ReactNode;
}) {
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
      {/* outside .ct-band-g on purpose: the sticky header's containing block ends before this full-width content */}
      {after ? <div className="px-wrap ct-band-after">{after}</div> : null}
    </section>
  );
}
