import { AboutContent } from '@/components/sections/about-stat';
import { cn } from '@/lib/utils';

export function About() {
  return (
    <section
      id="about"
      className={cn(
        'relative overflow-hidden',
        'flex min-h-dvh flex-col justify-center',
        'bg-section-dark text-white',
      )}
    >
      <AboutContent />
    </section>
  );
}
