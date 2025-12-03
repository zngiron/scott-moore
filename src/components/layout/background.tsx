'use client';

import { WaveFractal } from '@/components/effects/wave-fractal';

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <WaveFractal className="absolute inset-0 opacity-80" />
    </div>
  );
}
