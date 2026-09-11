import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * The legacy pages (/terms, /privacy-policy, /portfolio/[slug], /blog/[slug])
 * are composed from this component. Its padding was a flat `py-16`: 64px at
 * every width, which made those pages the only ones on the site whose vertical
 * rhythm did not respond to the viewport. It now takes the standard step of
 * the shared section scale, so a legacy page breathes like a Resolve one.
 */
export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-[var(--resolve-section-md)]', className)}
    >
      {children}
    </section>
  );
}
