import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { Container } from '@/components/layout/Container';

interface BlogHeroProps {
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  heroImage?: string;
  heroImageAlt?: string;
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
    <div className="pt-[70px] pb-[65px] border-b border-resolve-line bg-resolve-ground">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] leading-[1.5] text-resolve-dim mb-6">
          <a href="/" className="hover:text-resolve-ink transition-colors">Home</a>
          <span>/</span>
          <a href="/blog" className="hover:text-resolve-ink transition-colors">Blog</a>
          <span>/</span>
          <span className="text-resolve-ink font-medium truncate max-w-[300px] sm:max-w-none">{title}</span>
        </div>

        {/* Category Badge */}
        <Badge className="mb-4 bg-resolve-accent-deep/10 text-resolve-accent-deep hover:bg-resolve-accent-deep/20 border-none font-semibold">
          {category}
        </Badge>

        {/* Display/Hero H1: Wide 64px - Medium 52px - Narrow 40px, Line-height 1.00-1.06 */}
        <h1 className="text-[clamp(40px,4.2vw,64px)] leading-[1.02] font-heading font-extrabold tracking-[-0.035em] mb-6 text-resolve-ink text-balance">
          {title}
        </h1>

        {/* Meta Info: Small/note - 14px - Line-height 1.45-1.55 */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[14px] leading-[1.5] text-resolve-dim">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-resolve-dim" />
            <span className="font-medium text-resolve-ink">{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-resolve-dim" />
            <span>{publishedDate}</span>
          </div>
          {updatedDate && publishedDate !== updatedDate && (
            <div className="flex items-center gap-2">
              <span>(Updated {updatedDate})</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-resolve-dim" />
            <span>{readingTime}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
