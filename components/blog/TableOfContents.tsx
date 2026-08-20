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
    <div className="bg-secondary/5 border border-border rounded-lg p-6 sm:p-8">
      <h3 className="font-semibold text-lg mb-4">Table of Contents</h3>
      <nav className="space-y-2">
        {normalized.map((item, idx) => (
          <div key={item.id}>
            <Link
              href={`#${item.id}`}
              className="text-accent hover:underline text-sm block py-1"
            >
              {idx + 1}. {item.text}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
