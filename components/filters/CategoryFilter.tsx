'use client';

/**
 * SESSION 34 — PHASE H2A — the direct `window.gtag` emitter is REMOVED.
 *
 * WHAT WAS HERE. `window.gtag('event','blog_filter_click', …)`, behind a
 * `typeof window.gtag` guard, sending `event_category` and `event_label`.
 *
 * WHY IT IS GONE RATHER THAN CONVERTED. `blog_filter_click` is not one of the
 * five approved H2 events, and a sixth was not invented to keep it. It also
 * bypassed `lib/analytics.ts`, which must be the sole analytics API — a `gtag`
 * command reaches GA4 directly, past the parameter sanitiser and past any GTM
 * tag configuration that could filter it.
 *
 * THIS COMPONENT IS NOT RENDERED ANYWHERE. `components/CategoryFilter.tsx` is a
 * re-export of it and nothing imports either. It was dead code containing a
 * live analytics API. **Only the emitter was removed** — the filter itself is
 * untouched and still behaves identically if it is ever used.
 */

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
          }}
          className="transition-all"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
