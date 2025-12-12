'use client';

import type { Interview } from '@/lib/types';

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
import { cn } from '@/lib/utils';
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
      className={cn(
        'group',
        'flex w-full flex-col gap-3 rounded-2xl border border-foreground/10 p-6 text-left',
        'bg-background/70 backdrop-blur-xl',
        'cursor-pointer',
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
      {/* Thumbnail */}
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted">
        <motion.div
          whileHover={{
            scale: 1.1,
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
          <Play className="size-12 fill-none stroke-foreground stroke-[1.5]" />
        </motion.div>
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
      className={cn(
        'flex min-h-dvh flex-col justify-center',
        'md:snap-start',
        'relative z-50',
        'bg-background',
      )}
    >
      {/* Content */}
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
            Interviews
          </motion.p>
          <motion.h2
            className={cn(
              'font-display text-4xl font-light leading-tight tracking-tight',
              'md:text-6xl',
            )}
            variants={itemVariants}
          >
            Thoughts That
            <br />
            Move Markets
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          className={cn(
            'grid grid-cols-1 gap-4',
            'md:grid-cols-2 md:gap-6 lg:grid-cols-3',
          )}
          variants={containerVariants}
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
        <DialogContent
          className={cn(
            'overflow-hidden',
            'max-w-6xl gap-0 border-none p-0',
            'bg-background/70 backdrop-blur-xl',
          )}
        >
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
            <p className="text-sm text-muted-foreground">
              {selectedInterview?.source} · {selectedInterview?.year}
            </p>
            <DialogTitle className="font-display text-xl font-normal">
              {selectedInterview?.title}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {selectedInterview?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}
