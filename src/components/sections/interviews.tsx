'use client';

import type { Interview } from '@/data/interviews';

import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

import { WaveFractal } from '@/components/effects/wave-fractal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { interviews } from '@/data/interviews';

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
      duration: 0.8,
      ease: [
        0.25,
        0.4,
        0.25,
        1,
      ] as const,
    },
  },
};

function InterviewCard({
  interview,
  onSelect,
}: {
  interview: Interview;
  onSelect: (interview: Interview) => void;
}) {
  const handleClick = () => {
    if (interview.type === 'linkedin') {
      window.open(interview.url, '_blank', 'noopener,noreferrer');
    } else {
      onSelect(interview);
    }
  };

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={handleClick}
      className="group flex min-h-[420px] w-[320px] shrink-0 cursor-pointer snap-start flex-col gap-2.5 rounded-2xl border border-stone-300 bg-white p-6 text-left transition-colors hover:border-stone-400 hover:bg-stone-50 md:w-[368px]"
    >
      {/* Thumbnail */}
      <div className="flex h-[180px] w-full items-center justify-center rounded-lg bg-black/5">
        <Play className="size-12 stroke-stone-900 stroke-[1.5] fill-none transition-transform group-hover:scale-110" />
      </div>

      {/* Content */}
      <div className="flex w-full flex-col gap-2">
        <p className="text-sm leading-5 text-stone-500">
          {interview.source} · {interview.year}
        </p>
        <h3 className="min-h-14 font-display text-xl leading-7 text-black">
          {interview.title}
        </h3>
        <p className="text-base leading-6 text-stone-500">
          {interview.description}
        </p>
      </div>
    </motion.button>
  );
}

export function Interviews() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null,
  );

  return (
    <section className="relative min-h-[800px] overflow-hidden py-24 md:py-32">
      {/* WaveFractal Background */}
      <div className="pointer-events-none absolute inset-0">
        <WaveFractal className="absolute inset-0 opacity-40" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: '-100px',
        }}
      >
        {/* Header */}
        <div className="mb-12 px-6 md:mb-16 md:px-36">
          <motion.p
            className="mb-6 text-xl uppercase leading-7 tracking-widest text-stone-500"
            variants={itemVariants}
          >
            Interviews
          </motion.p>
          <motion.h2
            className="font-display text-4xl font-light leading-tight tracking-tight md:text-6xl md:leading-[60px]"
            variants={itemVariants}
          >
            Thoughts That
            <br />
            Move Markets
          </motion.h2>
        </div>

        {/* Scrollable Cards */}
        <motion.div
          className="flex gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide md:px-36"
          variants={itemVariants}
        >
          {interviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              onSelect={setSelectedInterview}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <Dialog
        open={
          selectedInterview !== null && selectedInterview.type === 'youtube'
        }
        onOpenChange={(open) => !open && setSelectedInterview(null)}
      >
        <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0">
          {selectedInterview?.videoId && (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedInterview.videoId}?autoplay=1`}
                title={selectedInterview.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
          )}
          <DialogHeader className="p-6">
            <p className="text-sm text-stone-500">
              {selectedInterview?.source} · {selectedInterview?.year}
            </p>
            <DialogTitle className="font-display text-xl font-normal">
              {selectedInterview?.title}
            </DialogTitle>
            <DialogDescription className="text-base text-stone-500">
              {selectedInterview?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
