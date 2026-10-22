import { loadLibrary } from '@/components/cplus/work/load';

export const revalidate = 60;
export const dynamic = 'force-static';

/**
 * `/work/index.json` (G7): the public library, in page order, for the in-browser search and filters on `/work`. Built
 * from the same eligibility rule and order as the pages, so it can hold nothing they do not show: only the preview
 * fields of `WorkStudy` (no study body, conclusion, review, audience or withheld proof). Not for indexing.
 */
export async function GET() {
  const { all } = await loadLibrary();
  return Response.json(
    { studies: all },
    { headers: { 'X-Robots-Tag': 'noindex' } }
  );
}
