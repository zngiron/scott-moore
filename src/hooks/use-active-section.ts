'use client';

import { useEffect, useState } from 'react';

const sections = ['hero', 'about', 'expertise', 'career', 'interviews', 'insights', 'contact'];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const detectSection = () => {
      const checkPoint = 100;
      const element = document.elementFromPoint(window.innerWidth / 2, checkPoint);

      if (element) {
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

    const handleScroll = () => {
      requestAnimationFrame(detectSection);
    };

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
