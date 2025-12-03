'use client';

import Link from 'next/link';

import { motion } from 'motion/react';

import { WaveFractal } from '@/components/effects/wave-fractal';
import { Button } from '@/components/ui/button';

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
      ],
    },
  },
};

export function Hero() {
  return (
    <section className="relative h-dvh overflow-hidden">
      {/* Fractal Background */}
      <div className="absolute inset-0 pointer-events-none">
        <WaveFractal className="absolute inset-0 opacity-60" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center h-full px-6 md:px-36 pt-20 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-xl">
          <motion.p
            className="text-xl uppercase tracking-widest text-stone-500 mb-6"
            variants={itemVariants}
          >
            Finance Executive
          </motion.p>

          <motion.h1
            className="font-display font-light text-7xl md:text-9xl tracking-tighter leading-none mb-8"
            variants={itemVariants}
          >
            <span className="block">Scott</span>
            <span className="block">Moore</span>
          </motion.h1>

          <motion.p
            className="text-lg text-stone-500 leading-7 max-w-md mb-10"
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
