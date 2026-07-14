'use client';

import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            onCategoryChange(category);
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'blog_filter_click', {
                event_category: 'engagement',
                event_label: category,
              });
            }
          }}
          className="transition-all"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
