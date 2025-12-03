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
    <section className="bg-stone-50 py-24 md:py-32">
      <motion.div
        className="px-6 md:px-36"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.p
            className="text-sm uppercase tracking-widest text-stone-500 mb-6"
            variants={itemVariants}
          >
            Expertise
          </motion.p>

          <motion.h2
            className="font-display font-light text-5xl md:text-7xl tracking-tighter leading-[1.1]"
            variants={itemVariants}
          >
            Where Strategy
            <br />
            Meets Precision
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
        >
          {expertiseItems.map((item) => (
            <motion.div
              key={item.title}
              className="group bg-white rounded-xl border border-stone-200 p-6 md:p-8 transition-colors hover:bg-stone-50 hover:border-stone-300"
              variants={cardVariants}
            >
              <item.icon
                className="w-7 h-7 text-stone-700 mb-5 transition-transform group-hover:scale-110"
                strokeWidth={1.5}
              />
              <h3 className="font-display font-semibold text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
