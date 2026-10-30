import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import type { CrumbStep } from '@/components/direction-c/primitives';
import { routeTrailJsonLd } from '@/components/routes/primitives';
import { Work } from '@/components/b2/Work';
import { loadLibrary, loadLibraryPage } from '@/components/cplus/work/load';
import { pageCount } from '@/lib/case-study-library';

export const revalidate = 60;

/**
 * `/work/page/{n}` (G7): page n ≥ 2 of the case-study library, statically generated and revalidated like `/work`.
 * Self-canonical and indexable, so every study has a crawlable path. `/work/page/1` is `/work` (308). A page number
 * that does not exist (or is not a plain number) is a 404 with `noindex`. New pages appear without a deployment when
 * the library grows (dynamic params render on first request, then are cached).
 */
type Props = { params: Promise<{ n: string }> };

const parse = (n: string): number | null => (/^[1-9][0-9]{0,3}$/.test(n) ? Number(n) : null);

const TRAIL: CrumbStep[] = [
  { name: 'Home', href: '/' },
  { name: 'Case studies', href: '/work' },
];

export async function generateStaticParams() {
  const { all } = await loadLibrary();
  return Array.from({ length: Math.max(0, pageCount(all.length) - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = parse((await params).n);
  if (!n || n < 2 || !(await loadLibraryPage(n))) return { title: 'Page Not Found', robots: 'noindex, nofollow' };
  return createMetadata(
    `Work – page ${n} | MappedSkills`,
    'Explore selected MappedSkills client projects, marketing challenges and approaches.',
    `/work/page/${n}`
  );
}

export default async function WorkLibraryPage({ params }: Props) {
  const n = parse((await params).n);
  if (n === 1) permanentRedirect('/work');
  const library = n ? await loadLibraryPage(n) : null;
  if (!library) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: routeTrailJsonLd(TRAIL) }} />
      <Work library={library} />
    </>
  );
}
