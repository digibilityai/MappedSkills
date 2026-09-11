import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  clientName: string;
  industry: string;
  placeholder?: boolean;
}

export function TestimonialCard({
  quote,
  clientName,
  industry,
  placeholder = false,
}: TestimonialCardProps) {
  return (
    <Card className="p-8 sm:p-10 h-full hover:shadow-lg transition-shadow bg-white border border-border/50 flex flex-col">
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-accent/30 mb-6" />

      {/* Quote */}
      <blockquote className="mb-8 text-foreground/90 italic leading-relaxed flex-grow">
        &quot;{quote}&quot;
      </blockquote>

      {/* Client Info */}
      <div className="pt-6 border-t border-border/30">
        <p className={`font-bold font-heading text-foreground ${placeholder ? 'text-muted-foreground' : ''}`}>
          {placeholder ? `Client Name` : clientName}
        </p>
        <p className="text-sm font-medium text-accent mt-1">
          {industry}
        </p>
      </div>
    </Card>
  );
}
