'use client';

import type { Interview } from '@/data/interviews';

import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

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
      className="group flex h-96 w-80 shrink-0 cursor-pointer snap-start flex-col gap-2.5 rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-muted-foreground/30 hover:bg-secondary md:w-[368px]"
    >
      {/* Thumbnail */}
      <div className="flex h-44 w-full items-center justify-center rounded-lg bg-muted">
        <Play className="size-12 fill-none stroke-foreground stroke-[1.5] transition-transform group-hover:scale-110" />
      </div>

      {/* Content */}
      <div className="flex w-full flex-col gap-2">
        <p className="text-sm leading-5 text-muted-foreground">
          {interview.source} · {interview.year}
        </p>
        <h3 className="font-display text-xl leading-7 text-foreground">
          {interview.title}
        </h3>
        <p className="line-clamp-2 text-base leading-6 text-muted-foreground">
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
    <section
      id="interviews"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden md:snap-start"
    >
      {/* Content */}
      <motion.div
        className="relative z-10 py-24 md:py-32"
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
            className="mb-6 text-xl uppercase tracking-widest text-muted-foreground"
            variants={itemVariants}
          >
            Interviews
          </motion.p>
          <motion.h2
            className="font-display text-4xl font-light leading-tight tracking-tight md:text-6xl"
            variants={itemVariants}
          >
            Thoughts That
            <br />
            Move Markets
          </motion.h2>
        </div>

        {/* Scrollable Cards */}
        <motion.div
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-36"
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
