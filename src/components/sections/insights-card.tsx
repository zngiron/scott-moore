'use client';

import type { InsightArticle } from '@/lib/types';

import { motion } from 'motion/react';
import { useState } from 'react';

import {
  containerVariantsFast,
  easeOut,
  hoverTransition,
  itemVariantsSubtle,
} from '@/lib/motion';
import { cn } from '@/lib/utils';
import { insightArticles } from '@/data/insights';

function ArticleCard({ article }: { article: InsightArticle }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariantsSubtle}
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
      transition={hoverTransition}
    >
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
              ease: easeOut,
            }}
          />
        </span>
      </div>
    </motion.a>
  );
}

export function InsightsContent() {
  return (
    <motion.div
      className={cn('mx-auto max-w-screen-2xl px-6 py-24', 'lg:px-36 lg:py-32')}
      variants={containerVariantsFast}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: '-100px',
      }}
    >
      <div className={cn('mb-12 flex flex-col gap-6', 'md:mb-16')}>
        <motion.p
          className="text-xl uppercase tracking-widest text-muted-foreground"
          variants={itemVariantsSubtle}
        >
          Insights
        </motion.p>
        <motion.h2
          className={cn(
            'font-display text-4xl font-light leading-tight tracking-tight',
            'md:text-6xl',
          )}
          variants={itemVariantsSubtle}
        >
          Insights That Drive Strategy
        </motion.h2>
      </div>

      <motion.div
        className={cn(
          'grid grid-cols-1 gap-4',
          'md:grid-cols-2 md:gap-6 lg:grid-cols-3',
        )}
        variants={containerVariantsFast}
      >
        {insightArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
