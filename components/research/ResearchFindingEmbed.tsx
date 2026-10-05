import type { CmsResearchFinding } from '@/lib/contentful/types';

function FindingMeta({
  baseSample,
  sourceNote,
}: {
  baseSample?: string;
  sourceNote?: string;
}) {
  if (!baseSample && !sourceNote) return null;

  return (
    <dl className="border-t border-resolve-line pt-5">
      {baseSample ? (
        <div className="py-1.5">
          <dt className="m-0 text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-resolve-dim">
            Base / sample
          </dt>
          <dd className="m-0 mt-1 text-[.94rem] leading-[1.55] text-resolve-ink">{baseSample}</dd>
        </div>
      ) : null}
      {sourceNote ? (
        <div className="py-1.5">
          <dt className="m-0 text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-resolve-dim">
            Source note
          </dt>
          <dd className="m-0 mt-1 text-[.94rem] leading-[1.55] text-resolve-ink">{sourceNote}</dd>
        </div>
      ) : null}
    </dl>
  );
}

export function ResearchFindingEmbed({
  finding,
  inList = false,
}: {
  finding: CmsResearchFinding;
  inList?: boolean;
}) {
  const chartAlt = finding.chart?.description || finding.chart?.title || finding.headline;

  return (
    <article
      className={
        inList
          ? 'flex h-full min-w-0 flex-col border border-resolve-line bg-resolve-paper p-[clamp(18px,2.2vw,28px)]'
          : 'my-[clamp(24px,3vw,40px)] flex min-w-0 flex-col border border-resolve-line bg-resolve-paper p-[clamp(18px,2.2vw,28px)] min-[1081px]:w-[72%]'
      }
    >
      {finding.statistic ? (
        <p className="m-0 break-words font-heading text-[clamp(1.6rem,3.4vw,2.7rem)] font-extrabold leading-[1.0] tracking-[-0.035em] text-resolve-ink tabular-nums">
          {finding.statistic}
        </p>
      ) : null}
      <h3 className="m-0 mt-4 text-balance font-heading text-[clamp(1.15rem,2vw,1.55rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-resolve-ink">
        {finding.headline}
      </h3>
      {finding.description ? (
        <p className="m-0 !mt-3 text-[1.02rem] leading-relaxed text-resolve-dim">{finding.description}</p>
      ) : null}
      {finding.chart?.url && finding.chart.isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={finding.chart.url}
          alt={chartAlt}
          width={finding.chart.width}
          height={finding.chart.height}
          className="mt-5 h-auto w-full max-w-full object-contain"
          loading="lazy"
        />
      ) : null}
      <div className="min-h-[clamp(20px,2.4vw,28px)] flex-1" aria-hidden="true" />
      <FindingMeta baseSample={finding.baseSample} sourceNote={finding.sourceNote} />
    </article>
  );
}
