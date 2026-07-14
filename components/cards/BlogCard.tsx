import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishDate?: string;
  author?: string;
  featured?: boolean;
  href: string;
}

export function BlogCard({
  title,
  excerpt,
  category,
  readingTime,
  publishDate,
  author,
  featured,
  href,
}: BlogCardProps) {
  if (featured) {
    return (
      <Card className="p-8 sm:p-12 flex flex-col h-full hover:shadow-lg transition-shadow bg-secondary/5 border-accent/20">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="secondary">{category}</Badge>
          <Badge variant="outline">Recommended First Read</Badge>
        </div>
        <h3 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-balance">
          {title}
        </h3>
        <p className="mb-6 text-muted-foreground leading-relaxed flex-grow">
          {excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
          {publishDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{publishDate}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
          {author && <span>{author}</span>}
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-accent font-semibold group w-fit"
        >
          Read Full Article
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
      <Badge className="w-fit mb-3" variant="secondary">
        {category}
      </Badge>
      <h3 className="mb-3 text-lg sm:text-xl font-semibold tracking-tight text-balance">
        {title}
      </h3>
      <p className="mb-6 text-muted-foreground leading-relaxed flex-grow text-sm">
        {excerpt}
      </p>
      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
        {publishDate && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{publishDate}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{readingTime}</span>
        </div>
        {author && <span>{author}</span>}
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-accent font-medium text-sm group w-fit"
      >
        Read Article
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </Card>
  );
}
