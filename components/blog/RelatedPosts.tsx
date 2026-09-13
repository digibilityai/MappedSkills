import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="border-t border-resolve-line pt-12">
      {/* H2: Wide 40px - Medium 34px - Narrow 30px - Line-height 1.10-1.18 */}
      <h2 className="text-[clamp(30px,2.6vw,40px)] leading-[1.14] font-heading font-bold tracking-[-0.03em] mb-8 text-resolve-ink">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="p-6 sm:p-8 h-full bg-resolve-ground border-resolve-line hover:border-resolve-ink transition-colors flex flex-col justify-between rounded-lg">
              <div>
                <Badge className="mb-3 bg-resolve-accent-deep/10 text-resolve-accent-deep border-none font-semibold">
                  {post.category}
                </Badge>
                {/* H4: Wide 22px - Medium 21px - Narrow 20px - Line-height 1.25-1.30 */}
                <h4 className="text-[clamp(20px,1.4vw,22px)] leading-[1.28] font-heading font-bold mb-3 line-clamp-2 text-resolve-ink group-hover:text-resolve-accent-deep transition-colors">
                  {post.title}
                </h4>
                {/* Body/Primary reading: Wide 16px - Medium 16px - Narrow 16px - Line-height 1.55-1.65 */}
                <p className="text-[16px] leading-[1.60] text-resolve-dim mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-resolve-line/50">
                {/* Small/note: Wide 14px - Medium 14px - Narrow 14px - Line-height 1.45-1.55 */}
                <div className="flex items-center gap-1.5 text-[14px] leading-[1.50] text-resolve-dim">
                  <Clock className="h-3.5 w-3.5 text-resolve-dim" />
                  <span>{post.readingTime}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-resolve-accent-deep group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
