import Link from 'next/link';
import type { CmsAuthor } from '@/lib/contentful/types';

export function ResearchAuthor({ author }: { author: CmsAuthor }) {
  const initials = author.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="mt-[clamp(20px,2.4vw,32px)] flex flex-col gap-4 sm:flex-row sm:gap-6">
      <div className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-full border border-resolve-line bg-resolve-paper text-sm font-semibold text-resolve-dim">
        {author.profileUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={author.profileUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </div>
      <div className="max-w-[58ch]">
        <p className="m-0 text-[clamp(17px,1.15vw,18px)] font-semibold leading-[1.60] text-resolve-ink">
          <Link href="/about" className="underline decoration-2 underline-offset-4">
            {author.name}
          </Link>
        </p>
        {author.description ? (
          <p className="mt-2 text-[16px] leading-[1.60] text-resolve-dim">{author.description}</p>
        ) : null}
      </div>
    </div>
  );
}
