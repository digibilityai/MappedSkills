import type { CmsFileAsset } from '@/lib/contentful/types';

function FileLink({ asset, label }: { asset: CmsFileAsset; label: string }) {
  return (
    <li className="max-w-none border-b border-resolve-line py-[clamp(12px,1.6vw,18px)] text-[1.02rem] leading-relaxed">
      <a href={asset.url} className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
        {label}
      </a>
      {asset.description ? <span className="mt-1 block text-resolve-dim">{asset.description}</span> : null}
    </li>
  );
}

export function ResearchDownloads({
  reportPdf,
  dataFile,
  mediaAssets,
}: {
  reportPdf?: CmsFileAsset;
  dataFile?: CmsFileAsset;
  mediaAssets: CmsFileAsset[];
}) {
  if (!reportPdf && !dataFile && mediaAssets.length === 0) return null;

  return (
    <ul className="m-0 mt-[clamp(20px,2.4vw,32px)] list-none border-t border-resolve-line p-0">
      {reportPdf ? <FileLink asset={reportPdf} label={reportPdf.title || 'Report PDF'} /> : null}
      {dataFile ? <FileLink asset={dataFile} label={dataFile.title || 'Data file'} /> : null}
      {mediaAssets.map((asset) => (
        <FileLink key={asset.url} asset={asset} label={asset.title || 'Media asset'} />
      ))}
    </ul>
  );
}
