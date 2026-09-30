import Link from 'next/link';
import { siteMetadata } from '@/lib/metadata';

export function JournalistsCta({ subject }: { subject?: string }) {
  const mailto = subject
    ? `mailto:${siteMetadata.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${siteMetadata.email}`;

  return (
    <div className="max-w-[58ch]">
      <p className="m-0 text-[1.02rem] leading-relaxed text-resolve-dim">
        For media enquiries, embargoed materials, or comment, email{' '}
        <a href={mailto} className="font-semibold text-resolve-ink underline decoration-2 underline-offset-4">
          {siteMetadata.email}
        </a>
        {' '}or use the contact form.
      </p>
      <Link
        href="/contact"
        className="mt-5 inline-flex min-h-[44px] items-center border-b-2 border-current pb-1 text-[.98rem] font-semibold no-underline"
        style={{ color: 'var(--resolve-accent-dark)' }}
      >
        Media enquiry
      </Link>
    </div>
  );
}
