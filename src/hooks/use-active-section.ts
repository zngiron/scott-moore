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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || 'hero');
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px',
      },
    );

    // Observe all sections
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
