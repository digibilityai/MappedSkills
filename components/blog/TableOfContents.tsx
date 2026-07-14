import Link from 'next/link';

interface TableOfContentsProps {
  items: string[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div className="bg-secondary/5 border border-border rounded-lg p-6 sm:p-8">
      <h3 className="font-semibold text-lg mb-4">Table of Contents</h3>
      <nav className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx}>
            <Link
              href={`#section-${idx}`}
              className="text-accent hover:underline text-sm block py-1"
            >
              {idx + 1}. {item}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
