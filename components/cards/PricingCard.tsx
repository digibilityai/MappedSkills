import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: {
    text: string;
    href: string;
  };
  recommended?: boolean;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  recommended = false,
}: PricingCardProps) {
  return (
    <Card
      className={`relative flex flex-col p-8 ${
        recommended
          ? 'border-2 border-accent shadow-lg scale-105'
          : 'border border-border'
      }`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-accent text-background px-4 py-1 rounded-full text-sm font-semibold">
            Recommended
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-3xl font-bold text-accent mb-2">{price}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <ul className="mb-8 flex-grow space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button asChild size="lg" className={!recommended ? 'w-full' : ''}>
        <Link href={cta.href}>{cta.text}</Link>
      </Button>
    </Card>
  );
}
