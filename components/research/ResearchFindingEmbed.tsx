import type { CmsResearchFinding } from '@/lib/contentful/types';

export function ResearchFindingEmbed({ finding }: { finding: CmsResearchFinding }) {
  const chartAlt = finding.chart?.description || finding.chart?.title || finding.headline;

  return (
    <figure className="my-8 border-t-2 border-resolve-ink border-b border-resolve-line py-[clamp(18px,2.2vw,28px)]">
      {finding.statistic ? (
        <p className="m-0 font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-resolve-ink">
          {finding.statistic}
        </p>
      ) : null}
      <figcaption className="mt-3">
        <p className="m-0 max-w-[46ch] font-heading text-[clamp(1.1rem,1.9vw,1.42rem)] font-bold leading-[1.2] tracking-[-0.03em]">
          {finding.headline}
        </p>
        {finding.description ? (
          <p className="m-0 mt-3 max-w-none text-[1.02rem] leading-relaxed text-resolve-dim">
            {finding.description}
          </p>
        ) : null}
        {(finding.baseSample || finding.sourceNote) && (
          <p className="m-0 mt-3 text-[.86rem] leading-[1.45] text-resolve-gap">
            {[finding.baseSample, finding.sourceNote].filter(Boolean).join(' · ')}
          </p>
        )}
      </figcaption>
      {finding.chart?.url && finding.chart.isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={finding.chart.url}
          alt={chartAlt}
          width={finding.chart.width}
          height={finding.chart.height}
          className="mt-5 w-full h-auto rounded-lg border border-resolve-line"
          loading="lazy"
        />
      ) : null}
    </figure>
  );
}
