import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteMetadata } from '@/lib/metadata';

interface LogoProps {
  className?: string;
  href?: string;
  priority?: boolean;
  /** Use the white-text variant for placement on a dark surface (e.g. the footer). */
  onDark?: boolean;
}

/** Intrinsic size of the resized WebP (3× the largest display height, h-12). */
const LOGO_WIDTH = 555;
const LOGO_HEIGHT = 144;

export function Logo({ className, href = '/', priority = false, onDark = false }: LogoProps) {
  const image = (
    <Image
      src={onDark ? siteMetadata.logoPathOnDark : siteMetadata.logoPath}
      alt="MappedSkills Marketing"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes="185px"
      priority={priority}
      className={cn('h-9 w-auto transition-transform duration-300 group-hover:scale-105', className)}
    />
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center group flex-shrink-0">
        {image}
      </Link>
    );
  }

  return image;
}
