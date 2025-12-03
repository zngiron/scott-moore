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
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        }

        // Find the section that appears first in the DOM order among visible ones
        if (visibleSections.size > 0) {
          for (const sectionId of sections) {
            if (visibleSections.has(sectionId)) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      },
      {
        threshold: [
          0,
          0.1,
          0.25,
          0.5,
        ],
        rootMargin: '-80px 0px -40% 0px',
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
