'use client';

import type { InsightArticle } from '@/lib/types';

import { motion } from 'motion/react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { insightArticles } from '@/data/insights';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
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

function ArticleCard({ article }: { article: InsightArticle }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group',
        'flex h-64 flex-col justify-between rounded-2xl border border-foreground/10 p-6',
        'bg-background/70 backdrop-blur-xl',
        'dark:border-transparent',
      )}
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
        ease: [
          0.25,
          0.4,
          0.25,
          1,
        ],
      }}
    >
      {/* Content */}
      <div className="flex flex-col gap-2">
        <p className="text-sm leading-5 text-muted-foreground">
          {article.category} · {article.source} · {article.date}
        </p>
        <h3 className="font-display text-xl font-light leading-7 text-foreground">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
          {article.description}
        </p>
      </div>

      {/* Footer */}
      <div>
        <span className="relative text-sm font-medium">
          Read Article
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
        </span>
      </div>
    </motion.a>
  );
}

export function Insights() {
  return (
    <section
      id="insights"
      className={cn(
        'flex min-h-dvh flex-col justify-center',
        'bg-secondary',
        'md:snap-start',
        'sticky top-0 z-60',
      )}
    >
      <motion.div
        className={cn('px-6 py-24', 'lg:px-36 lg:py-32')}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: '-100px',
        }}
      >
        {/* Header */}
        <div className={cn('mb-12 flex flex-col gap-6', 'md:mb-16')}>
          <motion.p
            className="text-xl uppercase tracking-widest text-muted-foreground"
            variants={itemVariants}
          >
            Insights
          </motion.p>
          <motion.h2
            className={cn(
              'font-display text-4xl font-light leading-tight tracking-tight',
              'md:text-6xl',
            )}
            variants={itemVariants}
          >
            Insights That Drive Strategy
          </motion.h2>
        </div>

        {/* Grid - 3 columns on larger screens */}
        <motion.div
          className={cn(
            'grid grid-cols-1 gap-4',
            'md:grid-cols-2 md:gap-6 lg:grid-cols-3',
          )}
          variants={containerVariants}
        >
          {insightArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
