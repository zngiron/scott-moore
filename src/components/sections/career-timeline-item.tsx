'use client';

import type { MotionValue } from 'motion/react';
import type { CareerItem } from '@/lib/types';

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';

import { cn } from '@/lib/utils';
import { careerItems } from '@/data/career';

function TimelineItem({
  item,
  isLast,
  index,
  scrollProgress,
  itemCount,
}: {
  item: CareerItem;
  isLast: boolean;
  index: number;
  scrollProgress: MotionValue<number>;
  itemCount: number;
}) {
  const itemStart = index / itemCount;
  const itemEnd = (index + 1) / itemCount;

  const bulletScale = useTransform(
    scrollProgress,
    [
      itemStart,
      itemStart + 0.01,
    ],
    [
      0,
      1,
    ],
  );
  const bulletOpacity = useTransform(
    scrollProgress,
    [
      itemStart,
      itemStart + 0.01,
    ],
    [
      0,
      1,
    ],
  );
  const yearOpacity = useTransform(
    scrollProgress,
    [
      itemStart,
      itemStart + 0.02,
    ],
    [
      0,
      1,
    ],
  );
  const yearX = useTransform(
    scrollProgress,
    [
      itemStart,
      itemStart + 0.02,
    ],
    [
      -10,
      0,
    ],
  );
  const lineScaleY = useTransform(
    scrollProgress,
    [
      itemStart + (itemEnd - itemStart) * 0.2,
      itemStart + (itemEnd - itemStart) * 0.7,
    ],
    [
      0,
      1,
    ],
  );
  const contentOpacity = useTransform(
    scrollProgress,
    [
      itemStart + (itemEnd - itemStart) * 0.3,
      itemStart + (itemEnd - itemStart) * 0.5,
    ],
    [
      0,
      1,
    ],
  );
  const contentY = useTransform(
    scrollProgress,
    [
      itemStart + (itemEnd - itemStart) * 0.3,
      itemStart + (itemEnd - itemStart) * 0.5,
    ],
    [
      10,
      0,
    ],
  );

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center gap-4">
        <motion.div
          className="size-2 shrink-0 rounded-full bg-white will-change-transform"
          style={{
            scale: bulletScale,
            opacity: bulletOpacity,
          }}
        />
        <motion.p
          className="text-sm text-white/60 will-change-transform"
          style={{
            opacity: yearOpacity,
            x: yearX,
          }}
        >
          {item.year}
        </motion.p>
      </div>

      <div className="flex gap-4">
        <div className="flex w-2 shrink-0 items-center justify-center">
          {!isLast && (
            <motion.div
              className="h-full w-px origin-top bg-white/20 will-change-transform"
              style={{
                scaleY: lineScaleY,
              }}
            />
          )}
        </div>

        <motion.div
          className="flex flex-col pb-4 will-change-transform"
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          <p className="font-display text-lg leading-6 text-white">
            {item.position}
          </p>
          <p className="text-sm leading-5 text-white/60">{item.company}</p>
          <p className="text-sm leading-5 text-white/60">{item.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export function CareerContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [
      'start start',
      'end end',
    ],
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
  });

  const effectiveProgress = prefersReducedMotion
    ? scrollYProgress
    : smoothedProgress;

  const reversedItems = [
    ...careerItems,
  ].reverse();

  return (
    <section
      ref={sectionRef}
      id="career"
      className={cn('relative', 'bg-section-dark text-white', 'z-40')}
      style={{
        height: `${100 + careerItems.length * 40}vh`,
      }}
    >
      <div className="sticky top-0 flex h-dvh items-center">
        <div className={cn('mx-auto w-full max-w-screen-2xl px-6', 'lg:px-36')}>
          <div
            className={cn(
              'grid grid-cols-1 gap-12',
              'lg:grid-cols-2 lg:gap-24',
            )}
          >
            <div className="flex flex-col gap-6">
              <p className="text-xl uppercase tracking-widest text-white/60">
                Career
              </p>
              <h2
                className={cn(
                  'font-display text-4xl font-light leading-tight tracking-tight',
                  'md:text-6xl',
                )}
              >
                A Journey Built on Financial Leadership
              </h2>
            </div>

            <div className="flex flex-col">
              {reversedItems.map((item, index) => (
                <TimelineItem
                  key={`${item.year}-${item.position}`}
                  item={item}
                  index={index}
                  isLast={index === careerItems.length - 1}
                  scrollProgress={effectiveProgress}
                  itemCount={careerItems.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
