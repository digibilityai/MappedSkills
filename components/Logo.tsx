'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteMetadata } from '@/lib/metadata';

interface LogoProps {
  className?: string;
  href?: string;
  priority?: boolean;
  /** Use the white-text variant for placement on a dark surface (the footer). */
  onDark?: boolean;
}

/** Intrinsic size of the DEC-069 wordmark SVG. Both variants are 616x112 (5.5:1),
    so the space reserved before the image loads has the rendered aspect ratio. */
const LOGO_WIDTH = 616;
const LOGO_HEIGHT = 112;

export function Logo({ className, href = '/', priority = false, onDark = false }: LogoProps) {
  const image = (
    <Image
      src={onDark ? siteMetadata.logoPathOnDark : siteMetadata.logoPath}
      alt="MappedSkills Logo"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={cn('h-7 w-auto transition-transform duration-300 group-hover:scale-105', className)}
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
