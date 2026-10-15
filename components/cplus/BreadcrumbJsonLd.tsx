import { breadcrumbJsonLd, breadcrumbTrail } from '@/components/commercial/primitives';

/**
 * The capability routes' `BreadcrumbList`, from the same helpers the Direction C `Crumb` uses, so the structured data
 * is byte-identical to the pre-C+ page. C+ pages draw their own approved visible breadcrumb, so only the JSON-LD is
 * emitted here.
 */
export function BreadcrumbJsonLd({ label, path }: { label: string; path: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(breadcrumbTrail(label, path)) }}
    />
  );
}
