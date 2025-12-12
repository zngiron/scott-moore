'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

function AnimatedLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
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
          ease: [
            0.25,
            0.4,
            0.25,
            1,
          ],
        }}
      />
    </a>
  );
}

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

export function Footer() {
  return (
    <footer
      id="contact"
      className={cn(
        'overflow-hidden',
        'relative',
        'flex min-h-dvh flex-col justify-center py-24',
        'bg-black',
        'md:snap-start md:py-32',
        'sticky top-0 z-[70]',
      )}
    >
      {/* Content */}
      <motion.div
        className={cn('relative', 'mx-auto max-w-screen-2xl px-6', 'lg:px-36')}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        <div
          className={cn(
            'flex w-full flex-col justify-between gap-12',
            'lg:flex-row lg:items-start',
          )}
        >
          {/* Left - Title & Copyright (desktop) */}
          <div className="flex flex-col gap-6">
            <motion.h2
              className={cn(
                'font-display text-4xl font-light leading-tight text-white',
                'md:text-6xl',
              )}
              variants={itemVariants}
            >
              Contact
            </motion.h2>
            <motion.p
              className={cn('hidden', 'text-sm text-white/60', 'lg:block')}
              variants={itemVariants}
            >
              © 2025 Scott Moore.
            </motion.p>
          </div>

          {/* Right - Content */}
          <div className="flex max-w-xl flex-col gap-6">
            <motion.p
              className="text-lg leading-7 text-white"
              variants={itemVariants}
            >
              Let's discuss how we can optimize your financial strategy and
              preserve your wealth for generations to come.
            </motion.p>

            {/* Email */}
            <motion.div
              className="flex flex-col gap-1 text-white"
              variants={itemVariants}
            >
              <span className="text-sm leading-5 text-white/60">Email</span>
              <AnimatedLink href="mailto:hi@scottmoore.com">
                hi@scottmoore.com
              </AnimatedLink>
            </motion.div>

            {/* LinkedIn */}
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

        {/* Copyright (mobile) */}
        <motion.p
          className={cn('mt-12', 'text-sm text-white/60', 'lg:hidden')}
          variants={itemVariants}
        >
          © 2025 Scott Moore.
        </motion.p>
      </motion.div>
    </footer>
  );
}
