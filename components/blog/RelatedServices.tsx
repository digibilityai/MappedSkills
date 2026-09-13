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
    <div className="border-t border-resolve-line pt-12">
      {/* H2: Wide 40px - Medium 34px - Narrow 30px - Line-height 1.10-1.18 */}
      <h2 className="text-[clamp(30px,2.6vw,40px)] leading-[1.14] font-heading font-bold tracking-[-0.03em] mb-8 text-resolve-ink">
        Need Help With This?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, idx) => (
          <Card key={idx} className="p-6 sm:p-8 bg-resolve-ground border-resolve-line hover:border-resolve-ink transition-colors flex flex-col justify-between rounded-lg">
            <div>
              {/* H4: Wide 22px - Medium 21px - Narrow 20px - Line-height 1.25-1.30 */}
              <h4 className="text-[clamp(20px,1.4vw,22px)] leading-[1.28] font-heading font-bold mb-2 text-resolve-accent-deep">
                {service.title}
              </h4>
              {/* Body/Primary reading: Wide 16px - Medium 16px - Narrow 16px - Line-height 1.55-1.65 */}
              <p className="text-[16px] leading-[1.60] text-resolve-dim mb-6">
                {service.description}
              </p>
            </div>
            <Button variant="outline" asChild size="sm" className="border-resolve-line hover:border-resolve-ink text-resolve-ink">
              <Link href={service.link}>
                Learn More
                <ArrowRight className="h-4 w-4 ml-2 text-resolve-accent-dark" />
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
