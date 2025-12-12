'use client';

import { animate, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { containerVariants, easeOut, itemVariants } from '@/lib/motion';
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
  const numericValue = Number.parseInt(value.replace(/[^0-9]/g, ''), 10);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, numericValue, {
      duration: 2,
      ease: easeOut,
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
          ease: easeOut,
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
          ease: easeOut,
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

export function AboutContent() {
  return (
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
        <motion.p
          className="mb-6 text-xl uppercase tracking-widest text-white/60"
          variants={itemVariants}
        >
          About
        </motion.p>

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

        <motion.p
          className={cn('mb-12 text-lg leading-7 text-white/70', 'md:mb-16')}
          variants={itemVariants}
        >
          A finance executive driven by strategy and results. Focused on turning
          complex financial goals into clear, achievable outcomes through
          insight, discipline, and a forward-looking mindset
        </motion.p>

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
  );
}
