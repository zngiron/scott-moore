'use client';

import { useEffect, useState } from 'react';

const sections = [
  'hero',
  'about',
  'expertise',
  'career',
  'interviews',
  'insights',
  'contact',
];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    // Use elementFromPoint to detect which section is actually visible at the header position
    // This handles sticky/stacked sections correctly
    const detectSection = () => {
      // Check at a point below the header (around 100px from top)
      const checkPoint = 100;
      const element = document.elementFromPoint(
        window.innerWidth / 2,
        checkPoint,
      );

      if (element) {
        // Walk up the DOM tree to find the section
        let current: Element | null = element;
        while (current) {
          if (current.tagName === 'SECTION' || current.tagName === 'FOOTER') {
            const id = current.id;
            if (id && sections.includes(id)) {
              setActiveSection(id);
              return;
            }
          }
          current = current.parentElement;
        }
      }
    };

    // Run on scroll and resize
    const handleScroll = () => {
      requestAnimationFrame(detectSection);
    };

    // Initial detection
    detectSection();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    window.addEventListener('resize', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return activeSection;
}
