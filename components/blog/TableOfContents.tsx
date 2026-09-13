import Link from 'next/link';
import type { TocItem } from '@/lib/contentful/types';

interface TableOfContentsProps {
  items: Array<string | TocItem>;
}

const TOC_MIN_ITEMS = 2;

export function TableOfContents({ items }: TableOfContentsProps) {
  if (!items || items.length < TOC_MIN_ITEMS) {
    return null;
  }

  const normalized = items.map((item, idx) =>
    typeof item === 'string'
      ? { id: `section-${idx}`, text: item }
      : { id: item.id || `section-${idx}`, text: item.text }
  );

  return (
    <div className="bg-resolve-ground border border-resolve-line rounded-lg p-6 sm:p-8">
      {/* H4: Wide 22px - Medium 21px - Narrow 20px - Line-height 1.25-1.30 */}
      <h4 className="text-[clamp(20px,1.4vw,22px)] leading-[1.28] font-heading font-bold mb-4 text-resolve-ink">
        Table of Contents
      </h4>
      <nav className="space-y-1">
        {normalized.map((item, idx) => (
          <div key={item.id}>
            {/* Small/note: Wide 14px - Medium 14px - Narrow 14px - Line-height 1.45-1.55 */}
            <Link
              href={`#${item.id}`}
              className="text-[14px] leading-[1.50] text-resolve-accent-dark font-medium hover:underline block py-1"
            >
              {idx + 1}. {item.text}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
