'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

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
        className="absolute -bottom-1 left-0 h-px bg-current"
        initial={{
          width: 0,
        }}
        animate={{
          width: isHovered ? '100%' : 0,
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
      className="relative overflow-hidden bg-black py-24 md:snap-start md:py-32"
    >
      {/* Content */}
      <motion.div
        className="relative px-6 md:px-36"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
      >
        <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start">
          {/* Left - Title */}
          <motion.h2
            className="font-display text-4xl font-light leading-tight text-stone-50 md:text-6xl"
            variants={itemVariants}
          >
            Contact
          </motion.h2>

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
              <span className="text-sm leading-5 text-stone-400">Email</span>
              <AnimatedLink href="mailto:hi@scottmoore.com">
                hi@scottmoore.com
              </AnimatedLink>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              className="flex flex-col gap-1 text-white"
              variants={itemVariants}
            >
              <span className="text-sm leading-5 text-stone-400">LinkedIn</span>
              <AnimatedLink
                href="https://www.linkedin.com/in/scott-moore-78023a20"
                external
              >
                linkedin/in/scott-moore-78023a20
              </AnimatedLink>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Copyright */}
      <motion.p
        className="mt-16 px-6 text-sm text-stone-400 md:px-36"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
        }}
      >
        © 2025 Scott Moore. All rights reserved.
      </motion.p>
    </footer>
  );
}
