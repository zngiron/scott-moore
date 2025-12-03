'use client';

import type { PropsWithChildren } from 'react';

import { useEffect } from 'react';

function easeOutQuart(t: number): number {
  return 1 - (1 - t) ** 4;
}

function animateScrollTo(targetY: number, duration = 1000) {
  const startY = window.scrollY;
  const difference = targetY - startY;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);

    window.scrollTo(0, startY + difference * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // Handle smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="/#"]');

      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const id = href.replace('/#', '');
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const targetY = window.scrollY + rect.top;
            animateScrollTo(targetY, 800);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
