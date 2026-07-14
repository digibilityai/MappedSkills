import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface RelatedService {
  title: string;
  description: string;
  link: string;
}

interface RelatedServicesProps {
  services: RelatedService[];
}

export function RelatedServices({ services }: RelatedServicesProps) {
  return (
    <div className="border-t border-border pt-12">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Need Help With This?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, idx) => (
          <Card key={idx} className="p-6 sm:p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-accent font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{service.description}</p>
            <Button variant="outline" asChild size="sm">
              <Link href={service.link}>
                Learn More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
