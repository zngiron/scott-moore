'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'motion/react';

import { BackgroundAnimation } from '@/components/effects/background-animation';
import { Button } from '@/components/ui/button';
import { containerVariants, easeOut, itemVariantsSlow } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function HeroContent() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0">
        <BackgroundAnimation className="absolute inset-0 opacity-80" />
      </div>

      <motion.div
        className={cn(
          'relative z-10',
          'mx-auto w-full max-w-screen-2xl',
          'flex flex-1 flex-col justify-end',
          'px-6 py-12',
          'lg:flex-none lg:justify-center lg:px-36 lg:py-32',
          'lg:min-h-dvh',
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-xl">
          <motion.p
            className="mb-6 text-xl uppercase tracking-widest text-muted-foreground"
            variants={itemVariantsSlow}
          >
            Finance Executive
          </motion.p>

          <motion.h1
            className={cn(
              'mb-8',
              'font-display text-7xl font-light leading-none tracking-tighter',
              'md:text-9xl',
            )}
            variants={itemVariantsSlow}
          >
            <span className="block">Scott</span>
            <span className="block">Moore</span>
          </motion.h1>

          <motion.p
            className="mb-10 max-w-md text-lg leading-7 text-muted-foreground"
            variants={itemVariantsSlow}
          >
            Experienced finance executive helping individuals and businesses
            navigate investments, risk, and global financial strategy.
          </motion.p>

          <motion.div variants={itemVariantsSlow}>
            <Button asChild>
              <Link href="/#contact">Let&apos;s Talk Strategy</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative mt-auto flex items-end justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:w-1/2"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: easeOut,
        }}
      >
        <Image
          src="/static/scott-moore.png"
          alt="Scott Moore"
          width={3000}
          height={3750}
          className="h-auto w-full max-w-lg object-contain object-bottom lg:max-w-4xl"
          priority
        />
      </motion.div>
    </>
  );
}
