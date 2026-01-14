import { ExpertiseContent } from '@/components/sections/expertise-card';

import { cn } from '@/lib/utils';

export function Expertise() {
  return (
    <section
      id="expertise"
      className={cn('relative', 'flex min-h-dvh flex-col justify-center', 'bg-background')}
    >
      <ExpertiseContent />
    </section>
  );
}
