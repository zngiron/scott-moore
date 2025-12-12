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
import {
  containerVariants,
  hoverTransition,
  itemVariantsSlow,
} from '@/lib/motion';
import { cn } from '@/lib/utils';
import { interviews } from '@/data/interviews';

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
      variants={itemVariantsSlow}
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
      transition={hoverTransition}
    >
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted">
        <motion.div
          whileHover={{
            scale: 1.1,
          }}
          transition={hoverTransition}
        >
          <Play className="size-12 fill-none stroke-foreground stroke-[1.5]" />
        </motion.div>
      </div>

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

export function InterviewsContent() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null,
  );

  return (
    <>
      <motion.div
        className={cn(
          'mx-auto max-w-screen-2xl px-6 py-24',
          'lg:px-36 lg:py-32',
        )}
        variants={containerVariants}
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
            variants={itemVariantsSlow}
          >
            Interviews
          </motion.p>
          <motion.h2
            className={cn(
              'font-display text-4xl font-light leading-tight tracking-tight',
              'md:text-6xl',
            )}
            variants={itemVariantsSlow}
          >
            Thoughts That
            <br />
            Move Markets
          </motion.h2>
        </div>

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
    </>
  );
}
