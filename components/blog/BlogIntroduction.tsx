import { Card } from '@/components/ui/card';

interface BlogIntroductionProps {
  hook: string;
  problem: string;
  promise: string;
}

export function BlogIntroduction({ hook, problem, promise }: BlogIntroductionProps) {
  return (
    <div className="py-8 border-b border-resolve-line mb-10">
      <div className="max-w-none">
        {/* Hook: Lede - Wide 22px - Medium 21px - Narrow 20px - Line-height 1.45-1.55 */}
        <p className="text-[clamp(20px,1.4vw,22px)] leading-[1.50] text-resolve-ink font-semibold mb-4">
          {hook}
        </p>

        {/* Problem: Body large/Intro/support - Wide 18px - Medium 18px - Narrow 17px - Line-height 1.55-1.65 */}
        <p className="text-[clamp(17px,1.15vw,18px)] leading-[1.60] text-resolve-dim mb-6">
          {problem}
        </p>

        <Card className="p-6 bg-resolve-accent-deep/5 border-resolve-accent-deep/20 rounded-lg">
          <p className="text-[16px] leading-[1.60] font-semibold text-resolve-ink">What you&apos;ll learn:</p>
          <p className="text-[16px] leading-[1.60] text-resolve-dim mt-2">{promise}</p>
        </Card>
      </div>
    </div>
  );
}
