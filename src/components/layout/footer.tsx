'use client';

import type { ReactNode } from 'react';

import { useState } from 'react';

import { motion } from 'motion/react';

import { containerVariants, easeOut, itemVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

function AnimatedLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="relative inline-block w-fit text-sm leading-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-px w-full origin-left bg-current"
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: easeOut,
        }}
      />
    </a>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className={cn(
        'relative overflow-hidden',
        'flex min-h-dvh flex-col justify-center',
        'bg-section-darker',
        'sticky top-0 z-70',
      )}
    >
      <motion.div
        className={cn('relative safe-bottom', 'mx-auto w-full max-w-screen-2xl px-6 py-24', 'lg:px-36 lg:py-32')}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        <div className={cn('flex w-full flex-col justify-between gap-12', 'lg:flex-row lg:items-start')}>
          <div className="flex flex-col gap-6">
            <motion.h2
              className={cn('font-display text-4xl font-light leading-tight text-white', 'md:text-6xl')}
              variants={itemVariants}
            >
              Contact
            </motion.h2>
            <motion.p
              className={cn('hidden text-sm text-white/60', 'lg:block')}
              variants={itemVariants}
            >
              © 2025 Scott Moore.
            </motion.p>
          </div>

          <div className="flex max-w-xl flex-col gap-6">
            <motion.p
              className="text-lg leading-7 text-white"
              variants={itemVariants}
            >
              Let's discuss how we can optimize your financial strategy and preserve your wealth for generations to
              come.
            </motion.p>

            <motion.div
              className="flex flex-col gap-1 text-white"
              variants={itemVariants}
            >
              <span className="text-sm leading-5 text-white/60">Email</span>
              <AnimatedLink href="mailto:hi@scottmoore.com">hi@scottmoore.com</AnimatedLink>
            </motion.div>

            <motion.div
              className="flex flex-col gap-1 text-white"
              variants={itemVariants}
            >
              <span className="text-sm leading-5 text-white/60">LinkedIn</span>
              <AnimatedLink
                href="https://www.linkedin.com/in/scott-moore-78023a20"
                external
              >
                linkedin/in/scott-moore-78023a20
              </AnimatedLink>
            </motion.div>
          </div>
        </div>

        <motion.p
          className={cn('mt-12 text-sm text-white/60', 'lg:hidden')}
          variants={itemVariants}
        >
          © 2025 Scott Moore.
        </motion.p>
      </motion.div>
    </footer>
  );
}
