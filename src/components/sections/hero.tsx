'use client';

import Link from 'next/link';

import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
      duration: 0.8,
      ease: [
        0.25,
        0.4,
        0.25,
        1,
      ] as const,
    },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className={cn(
        'overflow-hidden',
        'relative',
        'flex min-h-dvh flex-col justify-center',
        'md:snap-start',
      )}
    >
      {/* Content */}
      <motion.div
        className={cn('relative z-10', 'px-6 py-24', 'lg:px-36 lg:py-32')}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-xl">
          <motion.p
            className="mb-6 text-xl uppercase tracking-widest text-muted-foreground"
            variants={itemVariants}
          >
            Finance Executive
          </motion.p>

          <motion.h1
            className={cn(
              'mb-8',
              'font-display text-7xl font-light leading-none tracking-tighter',
              'md:text-9xl',
            )}
            variants={itemVariants}
          >
            <span className="block">Scott</span>
            <span className="block">Moore</span>
          </motion.h1>

          <motion.p
            className="mb-10 max-w-md text-lg leading-7 text-muted-foreground"
            variants={itemVariants}
          >
            Experienced finance executive helping individuals and businesses
            navigate investments, risk, and global financial strategy.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button asChild>
              <Link href="/#contact">Let&apos;s Talk Strategy</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
