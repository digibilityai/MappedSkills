import { Card } from '@/components/ui/card';
import { AlertCircle, Lightbulb, CheckCircle2 } from 'lucide-react';

interface ContentBlockProps {
  type: 'tip' | 'warning' | 'example' | 'formula' | 'checklist';
  title: string;
  content: string | string[];
}

export function ContentBlock({ type, title, content }: ContentBlockProps) {
  const configs = {
    tip: {
      icon: Lightbulb,
      bgClass: 'bg-green-50 border-green-200 dark:bg-green-950/20',
      iconClass: 'text-green-600 dark:text-green-400',
    },
    warning: {
      icon: AlertCircle,
      bgClass: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20',
      iconClass: 'text-amber-600 dark:text-amber-400',
    },
    example: {
      icon: CheckCircle2,
      bgClass: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20',
      iconClass: 'text-blue-600 dark:text-blue-400',
    },
    formula: {
      icon: CheckCircle2,
      bgClass: 'bg-purple-50 border-purple-200 dark:bg-purple-950/20',
      iconClass: 'text-purple-600 dark:text-purple-400',
    },
    checklist: {
      icon: CheckCircle2,
      bgClass: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20',
      iconClass: 'text-indigo-600 dark:text-indigo-400',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  if (type === 'formula') {
    return (
      <Card className={`${config.bgClass} border p-6 my-8`}>
        <div className="flex items-start gap-3">
          <Icon className={`${config.iconClass} h-5 w-5 mt-1 flex-shrink-0`} />
          <div className="flex-grow">
            <h4 className="font-semibold mb-3">{title}</h4>
            <div className="bg-white/50 dark:bg-black/20 rounded p-4 font-mono text-sm overflow-x-auto">
              {content}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (type === 'checklist' && Array.isArray(content)) {
    return (
      <Card className={`${config.bgClass} border p-6 my-8`}>
        <div className="flex items-start gap-3">
          <Icon className={`${config.iconClass} h-5 w-5 mt-1 flex-shrink-0`} />
          <div className="flex-grow">
            <h4 className="font-semibold mb-3">{title}</h4>
            <ul className="space-y-2">
              {content.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className={`${config.iconClass} h-4 w-4 mt-1 flex-shrink-0`} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`${config.bgClass} border p-6 my-8`}>
      <div className="flex items-start gap-3">
        <Icon className={`${config.iconClass} h-5 w-5 mt-1 flex-shrink-0`} />
        <div className="flex-grow">
          <h4 className="font-semibold mb-2">{title}</h4>
          <p className="text-sm leading-relaxed">{Array.isArray(content) ? content.join(' ') : content}</p>
        </div>
      </div>
    </Card>
  );
}
