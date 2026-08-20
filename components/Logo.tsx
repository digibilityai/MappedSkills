'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteMetadata } from '@/lib/metadata';

interface LogoProps {
  className?: string;
  href?: string;
  priority?: boolean;
}

export function Logo({ className, href = '/', priority = false }: LogoProps) {
  const image = (
    <Image
      src={siteMetadata.logoPath}
      alt="MappedSkills Logo"
      width={1080}
      height={48}
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
