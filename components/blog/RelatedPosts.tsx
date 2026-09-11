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
    <div className="border-t border-border pt-12">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="p-6 sm:p-8 h-full hover:shadow-lg transition-shadow">
              <Badge className="mb-3">{post.category}</Badge>
              <h3 className="text-lg font-semibold mb-3 line-clamp-2 hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-accent" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
