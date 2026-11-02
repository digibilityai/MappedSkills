import Image from 'next/image';
import Link from 'next/link';
import { plainRange, SECTORS, type SectorKey, type ServiceRoute } from '@/lib/case-study-library';
import { relatedStudies, type Audience } from '@/lib/case-study-related';
import { toLibCard } from '../b2/work-cards';
import { loadLibrary } from '../cplus/work/load';
import { ShowcaseTrack } from './ShowcaseTrack';
import { selectCases, viewAllFor } from './select';
import './case-showcase.css';

/**
 * REUSABLE CASE SHOWCASE (pilot: /social-media-ads and /seo, DEC-115). One section per page: a heading, one to three image-led cards, one "View all".
 *
 * Two parts, so a page can resolve its data on the server before it renders (no Suspense: the whole page is in the first HTML and hydrates in one pass):
 * `loadCaseShowcase(config)` reads the PUBLIC library only (`loadLibrary`, the same published, eligible set `/work` reads), so a study that is not
 * published, and any local preview content in a production build, can never appear; and `<CaseShowcase data={...} />` draws it.
 *
 * A card shows the study's own listing image whole, its client name, "service, sector", and EITHER its approved lead figure with its definition and
 * period (the wording `/work` shows) OR its approved summary. A figure can only be shown while the study has one (`lead` is null while its proof is
 * withheld), so a page's override can never reveal a withheld figure. Zero eligible cases: `loadCaseShowcase` returns null and nothing renders.
 *
 * Per page: the heading, the preferred cases, the tone, the View all service, and (optional) the approved wording for a case's outcome, period and the
 * one qualification that belongs to that case. No other content system.
 */
export type CaseOverride = {
  /** A page's approved wording for this case's figure; used only while the study has a figure. */
  outcome?: { v: string; c: string };
  period?: string;
  /** The concise qualification attached to this case's figure. */
  note?: string;
  /** The approved summary shown when there is no figure to show. */
  summary?: string;
};

export type ShowcaseConfig = {
  /** The heading's id (kept as the page's existing anchor). */
  id: string;
  /** Extra ids that already pointed at this part of the page (kept so existing links still land here). */
  aliases?: readonly string[];
  eyebrow: string;
  /** "03" in a page that numbers its sections. */
  number?: string;
  /** Plain part and accented part; a function lets a page choose by which cases are published. */
  heading: readonly [string, string] | ((hrefs: readonly string[]) => readonly [string, string]);
  /** Case detail routes, most relevant first. */
  preferred: readonly string[];
  fillService?: ServiceRoute;
  /** An industry page's fallback: the library's studies that belong to this audience (the same rule the old related-cases list used), when the preferred ones are not public. */
  fillAudience?: Audience;
  /** `service` or `sector` names an existing /work filter; neither means plain /work. */
  viewAll: { service?: ServiceRoute; sector?: SectorKey; label: string };
  /** `light` (paper) for a page whose neighbours are dark; `dark` for one whose neighbours are light. */
  tone?: 'light' | 'dark';
  /** The page's own content-width class (`rv3-wrap` or `pa-wrap`), so the section lines up with its neighbours. */
  wrapClass?: string;
  overrides?: Readonly<Record<string, CaseOverride>>;
};

type Card = {
  slug: string;
  href: string;
  client: string;
  eyebrow: string;
  art: { src: string; alt: string; w: number; h: number } | null;
  fig: { v: string; c: string; period: string; note: string } | null;
  summary: string;
};
export type ShowcaseData = {
  id: string;
  aliases: readonly string[];
  eyebrow: string;
  number?: string;
  heading: readonly [string, string];
  tone: 'light' | 'dark';
  wrapClass: string;
  cards: Card[];
  viewAll: { href: string; label: string };
};

export async function loadCaseShowcase(c: ShowcaseConfig): Promise<ShowcaseData | null> {
  try {
    const { all } = await loadLibrary();
    const audience = c.fillAudience;
    const picked = selectCases(all, c.preferred, { fillService: c.fillService, fillWhere: audience ? (s) => relatedStudies([s], { audience }).length > 0 : undefined });
    if (!picked.length) return null;
    const target = viewAllFor(all, { service: c.viewAll.service, sector: c.viewAll.sector }, c.viewAll.label);
    const overrides = c.overrides ?? {};
    const cards: Card[] = picked.map((s) => {
      const lib = toLibCard(s);
      const o = overrides[s.href] ?? {};
      const lead = s.lead ? (o.outcome ?? s.lead) : null;
      return {
        slug: s.slug,
        href: s.href,
        client: s.client,
        eyebrow: [lib.service, s.sector ? SECTORS[s.sector] : s.industry].filter(Boolean).join(' · '),
        art: lib.art ? { src: lib.art.src, alt: lib.art.alt, w: lib.art.w, h: lib.art.h } : null,
        fig: lead ? { v: lead.v, c: lead.c, period: plainRange(o.period ?? s.period), note: o.note ?? '' } : null,
        summary: o.summary ?? lib.summary,
      };
    });
    const heading = typeof c.heading === 'function' ? c.heading(cards.map((x) => x.href)) : c.heading;
    return { id: c.id, aliases: c.aliases ?? [], eyebrow: c.eyebrow, number: c.number, heading, tone: c.tone ?? 'light', wrapClass: c.wrapClass ?? '', cards, viewAll: target };
  } catch {
    return null;
  }
}

export function CaseShowcase({ data }: { data: ShowcaseData | null | undefined }) {
  if (!data || !data.cards.length) return null;
  const { id, cards } = data;
  return (
    <section className={`cs cs--${data.tone}${cards.length === 2 ? ' cs--two' : ''}${cards.length === 1 ? ' cs--one' : ''}`} aria-labelledby={id} data-cs>
      {data.aliases.map((a) => (
        <span key={a} id={a} className="cs-anchor" />
      ))}
      <div className={`cs-wrap ${data.wrapClass}`.trim()}>
        <header className="cs-head">
          <p className="cs-eyebrow-k">
            {data.number ? <span className="cs-num">{data.number}</span> : null}
            {data.eyebrow}
          </p>
          <h2 id={id}>
            {data.heading[0]}
            <em>{data.heading[1]}</em>
          </h2>
          <span className="cs-rule" aria-hidden="true" />
        </header>
        <Link className="cs-all" href={data.viewAll.href}>
          {data.viewAll.label} <span aria-hidden="true">↗</span>
        </Link>
        <ShowcaseTrack count={cards.length} trackId={`${id}-cases`} label="Case studies">
          {cards.map((s, i) => {
            const nameId = `${id}-c${i}`;
            return (
              <li key={s.slug} style={{ ['--i' as string]: i }}>
                <article className="cs-card" aria-labelledby={nameId}>
                  {s.art ? (
                    <div className="cs-img">
                      <Image src={s.art.src} alt={s.art.alt} width={s.art.w} height={s.art.h} sizes="(min-width: 1081px) 440px, 82vw" />
                    </div>
                  ) : null}
                  <div className="cs-body">
                    {s.eyebrow ? <p className="cs-eyebrow">{s.eyebrow}</p> : null}
                    <h3 className="cs-name" id={nameId}>
                      {s.client}
                    </h3>
                    {s.fig ? (
                      <>
                        <p className="cs-fig">{s.fig.v}</p>
                        <p className="cs-def">{s.fig.c}</p>
                        {s.fig.period ? <p className="cs-per">{s.fig.period}</p> : null}
                        {s.fig.note ? <p className="cs-note">{s.fig.note}</p> : null}
                      </>
                    ) : (
                      <p className="cs-sum">{s.summary}</p>
                    )}
                    <Link className="cs-cta" href={s.href}>
                      Read the case study<span className="cs-sr">: {s.client}</span> <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ShowcaseTrack>
      </div>
    </section>
  );
}
