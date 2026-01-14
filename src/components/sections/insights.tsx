import { InsightsContent } from '@/components/sections/insights-card';

import { cn } from '@/lib/utils';

export function Insights() {
  return (
    <section
      id="insights"
      className={cn('flex min-h-dvh flex-col justify-center', 'bg-secondary', 'relative')}
    >
      <InsightsContent />
    </section>
  );
}
