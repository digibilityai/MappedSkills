import Link from 'next/link';

/**
 * The C+ visible breadcrumb ("Home / … / Current"), as a breadcrumb landmark: a `nav` named "Breadcrumb" holding an
 * ordered list, the current page marked `aria-current="page"`. It renders the same text, separators and styles as the
 * approved prototype's paragraph (`.b-crumb`); the list items are inline. Intermediate steps stay plain text, as
 * approved. The `BreadcrumbList` JSON-LD is separate (`BreadcrumbJsonLd`) and unchanged.
 */
export function Breadcrumb({ trail = [], current }: { trail?: string[]; current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="b-crumb">
      <ol>
        {/* Spaces sit where the prototype's paragraph had them (after each item), so the text runs and rendering match. */}
        <li>
          <Link href="/">Home</Link>{' '}
        </li>
        {trail.map((step) => (
          <li key={step}>
            <span aria-hidden="true">/</span> {step}{' '}
          </li>
        ))}
        <li>
          <span aria-hidden="true">/</span> <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
