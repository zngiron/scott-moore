import { InterviewsContent } from '@/components/sections/interviews-card';

import { cn } from '@/lib/utils';

export function Interviews() {
  return (
    <section
      id="interviews"
      className={cn('flex min-h-dvh flex-col justify-center', 'relative', 'bg-background')}
    >
      <InterviewsContent />
    </section>
  );
}
