'use client';

import {
  BarChart3,
  Globe,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';

const expertiseItems = [
  {
    icon: BarChart3,
    title: 'Investment Strategy',
    description:
      'Creates tailored, data-driven investment plans designed for long-term performance and stability.',
  },
  {
    icon: Landmark,
    title: 'Wealth Management',
    description:
      'Manages diverse portfolios with a disciplined approach focused on capital preservation and growth.',
  },
  {
    icon: Globe,
    title: 'Global Markets',
    description:
      'Provides insights into international markets, helping clients diversify and seize global opportunities.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk & Capital Management',
    description:
      'Balances risk and reward through smart capital allocation and proactive financial oversight.',
  },
  {
    icon: TrendingUp,
    title: 'Financial Planning',
    description:
      'Builds actionable, goal-oriented financial roadmaps to ensure long-term success.',
  },
  {
    icon: Users,
    title: 'Client Advisory',
    description:
      'Enhances decision-making through clear communication, trust, and personalized guidance.',
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [
        0.25,
        0.4,
        0.25,
        1,
      ] as const,
    },
  },
};

export function Expertise() {
  return (
    <section
      id="expertise"
      className="flex min-h-dvh flex-col justify-center md:snap-start"
    >
      <motion.div
        className="px-6 py-24 md:px-36 md:py-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <motion.p
            className="mb-6 text-xl uppercase tracking-widest text-muted-foreground"
            variants={itemVariants}
          >
            Expertise
          </motion.p>

          <motion.h2
            className="font-display text-4xl font-light leading-tight tracking-tight md:text-6xl"
            variants={itemVariants}
          >
            Where Strategy
            <br />
            Meets Precision
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          variants={containerVariants}
        >
          {expertiseItems.map((item) => (
            <motion.div
              key={item.title}
              className="group rounded-xl border border-foreground/10 bg-background/70 p-6 backdrop-blur-xl transition-all hover:bg-background/80 dark:border-transparent md:p-8"
              variants={cardVariants}
            >
              <item.icon
                className="mb-5 size-7 text-foreground/80 transition-transform group-hover:scale-110"
                strokeWidth={1.5}
              />
              <h3 className="mb-3 font-display text-lg font-semibold">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
