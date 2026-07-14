import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Zap, BarChart3 } from 'lucide-react';

export function HeroDashboard() {
  const metrics = [
    {
      icon: Users,
      label: 'Total Leads',
      value: '1,247',
      change: '+32% this month',
      color: 'text-accent'
    },
    {
      icon: TrendingUp,
      label: 'Average ROI',
      value: '300%+',
      change: 'Across all campaigns',
      color: 'text-accent'
    },
    {
      icon: Zap,
      label: 'Active Campaigns',
      value: '42',
      change: '15 optimizing',
      color: 'text-accent'
    },
    {
      icon: BarChart3,
      label: 'Revenue Influenced',
      value: '₹100Cr+',
      change: 'Cumulative results',
      color: 'text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <Card
            key={idx}
            className="p-5 sm:p-6 bg-card border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">
                  {metric.label}
                </p>
                <p className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
                  {metric.value}
                </p>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/15 transition-colors">
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-accent font-medium">
              {metric.change}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
