import { HeroContent } from '@/components/sections/hero-content';

import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section
      id="hero"
      className={cn(
        'relative overflow-hidden',
        'min-h-dvh',
        'flex flex-col',
        'lg:grid lg:grid-cols-2',
        'bg-background',
      )}
    >
      <HeroContent />
    </section>
  );
}
