'use client';

import type { InsightArticle } from '@/data/insights';

import { motion } from 'motion/react';

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
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

function ArticleCard({ article }: { article: InsightArticle }) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      className="group flex flex-col rounded-2xl border border-stone-300 bg-white transition-colors hover:border-stone-400 hover:bg-stone-50"
    >
      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-6">
        <p className="text-sm leading-5 text-stone-500">
          {article.category} · {article.date} · {article.source}
        </p>
        <h3 className="font-display text-4xl font-light leading-10 text-black">
          {article.title}
        </h3>
        <p className="text-base leading-6 text-stone-500">
          {article.description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <span className="text-sm font-medium underline">Read Article</span>
      </div>
    </motion.a>
  );
}

export function Insights() {
  return (
    <section className="bg-stone-100 py-24 md:py-32">
      <motion.div
        className="px-6 md:px-36"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: '-100px',
        }}
      >
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16">
          <motion.p
            className="text-xl uppercase leading-7 tracking-widest text-stone-500"
            variants={itemVariants}
          >
            Insights
          </motion.p>
          <motion.h2
            className="font-display text-5xl font-light leading-tight tracking-tight md:text-6xl"
            variants={itemVariants}
          >
            Insights That Drive Strategy
          </motion.h2>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
        >
          {insightArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

