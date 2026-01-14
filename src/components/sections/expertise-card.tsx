'use client';

import type { HTMLAttributes, RefObject } from 'react';
import type { ChartColumnIncreasingIconHandle } from '@/components/icons/chart-column-increasing';
import type { EarthIconHandle } from '@/components/icons/earth';
import type { HandCoinsIconHandle } from '@/components/icons/hand-coins';
import type { ShieldCheckIconHandle } from '@/components/icons/shield-check';
import type { TrendingUpIconHandle } from '@/components/icons/trending-up';
import type { UsersIconHandle } from '@/components/icons/users';

import { useRef } from 'react';

import { motion } from 'motion/react';

import { BackgroundAnimation } from '@/components/effects/background-animation';
import { ChartColumnIncreasingIcon } from '@/components/icons/chart-column-increasing';
import { EarthIcon } from '@/components/icons/earth';
import { HandCoinsIcon } from '@/components/icons/hand-coins';
import { ShieldCheckIcon } from '@/components/icons/shield-check';
import { TrendingUpIcon } from '@/components/icons/trending-up';
import { UsersIcon } from '@/components/icons/users';

import { cardVariants, containerVariantsFast, hoverTransition, itemVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

type IconHandles =
  | ChartColumnIncreasingIconHandle
  | EarthIconHandle
  | HandCoinsIconHandle
  | ShieldCheckIconHandle
  | TrendingUpIconHandle
  | UsersIconHandle;

interface ExpertiseItem {
  icon: React.ForwardRefExoticComponent<
    HTMLAttributes<HTMLDivElement> & { size?: number } & React.RefAttributes<IconHandles>
  >;
  iconRef: RefObject<IconHandles | null>;
  title: string;
  description: string;
}

export function ExpertiseContent() {
  const chartRef = useRef<ChartColumnIncreasingIconHandle>(null);
  const handCoinsRef = useRef<HandCoinsIconHandle>(null);
  const earthRef = useRef<EarthIconHandle>(null);
  const shieldRef = useRef<ShieldCheckIconHandle>(null);
  const trendingRef = useRef<TrendingUpIconHandle>(null);
  const usersRef = useRef<UsersIconHandle>(null);

  const expertiseItems: ExpertiseItem[] = [
    {
      icon: ChartColumnIncreasingIcon,
      iconRef: chartRef,
      title: 'Investment Strategy',
      description: 'Creates tailored, data-driven investment plans designed for long-term performance and stability.',
    },
    {
      icon: HandCoinsIcon,
      iconRef: handCoinsRef,
      title: 'Wealth Management',
      description: 'Manages diverse portfolios with a disciplined approach focused on capital preservation and growth.',
    },
    {
      icon: EarthIcon,
      iconRef: earthRef,
      title: 'Global Markets',
      description:
        'Provides insights into international markets, helping clients diversify and seize global opportunities.',
    },
    {
      icon: ShieldCheckIcon,
      iconRef: shieldRef,
      title: 'Risk & Capital Management',
      description: 'Balances risk and reward through smart capital allocation and proactive financial oversight.',
    },
    {
      icon: TrendingUpIcon,
      iconRef: trendingRef,
      title: 'Financial Planning',
      description: 'Builds actionable, goal-oriented financial roadmaps to ensure long-term success.',
    },
    {
      icon: UsersIcon,
      iconRef: usersRef,
      title: 'Client Advisory',
      description: 'Enhances decision-making through clear communication, trust, and personalized guidance.',
    },
  ];
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0">
        <BackgroundAnimation className="absolute inset-0 opacity-80" />
      </div>

      <motion.div
        className={cn('relative z-10', 'mx-auto max-w-screen-2xl px-6 py-24', 'lg:px-36 lg:py-32')}
        variants={containerVariantsFast}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
        <div className={cn('mb-12', 'md:mb-16')}>
          <motion.p
            className="mb-6 text-xl uppercase tracking-widest text-muted-foreground"
            variants={itemVariants}
          >
            Expertise
          </motion.p>

          <motion.h2
            className={cn('font-display text-4xl font-light leading-tight tracking-tight', 'md:text-6xl')}
            variants={itemVariants}
          >
            Where Strategy
            <br />
            Meets Precision
          </motion.h2>
        </div>

        <motion.div
          className={cn('grid grid-cols-1 gap-4', 'md:grid-cols-2 md:gap-6 xl:grid-cols-3')}
          variants={containerVariantsFast}
        >
          {expertiseItems.map((item) => (
            <motion.div
              key={item.title}
              className={cn(
                'group',
                'rounded-xl border border-foreground/10 p-6',
                'bg-background/70 backdrop-blur-xl',
                'dark:border-transparent',
                'md:p-8',
              )}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -4,
              }}
              onHoverStart={() => {
                item.iconRef.current?.startAnimation();
              }}
              onHoverEnd={() => {
                item.iconRef.current?.stopAnimation();
              }}
              transition={hoverTransition}
            >
              <motion.div
                className="mb-5 inline-block"
                whileHover={{
                  scale: 1.1,
                }}
                transition={hoverTransition}
              >
                <item.icon
                  ref={item.iconRef}
                  className="text-foreground/80"
                  size={28}
                />
              </motion.div>
              <h3 className="mb-3 font-display text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
