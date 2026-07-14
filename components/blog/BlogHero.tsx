import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogHeroProps {
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  heroImage: string;
  heroImageAlt: string;
}

export function BlogHero({
  title,
  category,
  author,
  publishedDate,
  updatedDate,
  readingTime,
}: BlogHeroProps) {
  return (
    <div className="py-12 sm:py-16 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground">Home</a>
          <span>/</span>
          <a href="/blog" className="hover:text-foreground">Blog</a>
          <span>/</span>
          <span className="text-foreground">{title}</span>
        </div>

        {/* Category Badge */}
        <Badge className="mb-4">{category}</Badge>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-balance">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{publishedDate}</span>
          </div>
          {updatedDate && publishedDate !== updatedDate && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Updated {updatedDate}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
