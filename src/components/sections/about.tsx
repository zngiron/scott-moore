'use client';

import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { CircleFractal } from '@/components/effects/circle-fractal';

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

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - (1 - progress) ** 4;
      const currentValue = Math.floor(easeOutQuart * numericValue);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [
    isInView,
    numericValue,
  ]);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2"
    >
      <p className="font-display font-light text-5xl md:text-6xl leading-tight tracking-normal">
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="text-base text-stone-500 leading-6">{label}</p>
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
    <section className="relative min-h-[600px] md:min-h-[768px] bg-stone-100 overflow-hidden">
      {/* Circle Fractal Background */}
      <div className="absolute inset-0 pointer-events-none">
        <CircleFractal className="absolute inset-0 opacity-80" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 md:px-36 py-24 md:py-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        <div className="max-w-xl ml-auto">
          {/* Header */}
          <motion.p
            className="text-xl uppercase tracking-widest text-stone-500 mb-6"
            variants={itemVariants}
          >
            About
          </motion.p>

          {/* Title */}
          <motion.h2
            className="font-display font-light text-5xl md:text-6xl leading-tight tracking-normal mb-6"
            variants={itemVariants}
          >
            Building Wealth with Purpose
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-stone-500 leading-7 mb-16 md:mb-24"
            variants={itemVariants}
          >
            A finance executive driven by strategy and results. Focused on
            turning complex financial goals into clear, achievable outcomes
            through insight, discipline, and a forward-looking mindset
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6"
            variants={containerVariants}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
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
