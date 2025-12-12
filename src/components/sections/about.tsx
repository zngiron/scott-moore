'use client';

import { animate, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface StatProps {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

function AnimatedStat({ value, label, prefix = '', suffix = '' }: StatProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  // Extract numeric value from string (e.g., "15" from "15+", "2" from "$2B")
  const numericValue = Number.parseInt(value.replace(/[^0-9]/g, ''), 10);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, numericValue, {
      duration: 2,
      ease: [
        0.25,
        0.4,
        0.25,
        1,
      ],
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [
    isInView,
    numericValue,
  ]);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2"
    >
      <motion.p
        className={cn(
          'font-display text-4xl font-light leading-tight tracking-tight',
          'md:text-5xl',
        )}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
              }
            : {}
        }
        transition={{
          duration: 0.6,
          ease: [
            0.25,
            0.4,
            0.25,
            1,
          ],
        }}
      >
        {prefix}
        {displayValue}
        {suffix}
      </motion.p>
      <motion.p
        className="text-base leading-6 text-white/60"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
              }
            : {}
        }
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [
            0.25,
            0.4,
            0.25,
            1,
          ],
        }}
      >
        {label}
      </motion.p>
    </div>
  );
}

const stats: StatProps[] = [
  {
    value: '15',
    label: 'Years Experiences',
    suffix: '+',
  },
  {
    value: '2',
    label: 'Assets Managed',
    prefix: '$',
    suffix: 'B',
  },
  {
    value: '400',
    label: 'Clients Served',
    suffix: '+',
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [
        0.25,
        0.4,
        0.25,
        1,
      ] as const,
    },
  },
};

export function About() {
  return (
    <section
      id="about"
      className={cn(
        'overflow-hidden',
        'relative',
        'flex min-h-dvh flex-col justify-center',
        'bg-zinc-900 text-white',
        'md:snap-start',
        'sticky top-0 z-20',
      )}
    >
      {/* Content */}
      <motion.div
        className={cn(
          'relative z-10',
          'mx-auto max-w-screen-2xl px-6 py-24',
          'lg:px-36 lg:py-32',
        )}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        <div className="ml-auto">
          {/* Header */}
          <motion.p
            className="mb-6 text-xl uppercase tracking-widest text-white/60"
            variants={itemVariants}
          >
            About
          </motion.p>

          {/* Title */}
          <motion.h2
            className={cn(
              'mb-6',
              'font-display text-4xl font-light leading-tight tracking-tight',
              'md:text-6xl',
            )}
            variants={itemVariants}
          >
            Building Wealth with Purpose
          </motion.h2>

          {/* Description */}
          <motion.p
            className={cn(
              'mb-12',
              'text-lg leading-7 text-white/70',
              'md:mb-16',
            )}
            variants={itemVariants}
          >
            A finance executive driven by strategy and results. Focused on
            turning complex financial goals into clear, achievable outcomes
            through insight, discipline, and a forward-looking mindset
          </motion.p>

          {/* Stats */}
          <motion.div
            className={cn('grid grid-cols-1 gap-8', 'sm:grid-cols-3 md:gap-6')}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                custom={index}
              >
                <AnimatedStat {...stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
