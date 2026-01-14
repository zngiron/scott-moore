'use client';

import type { Interview } from '@/data/static/interviews';

import { useState } from 'react';
import Image from 'next/image';

import { motion } from 'motion/react';

import { PlayIcon } from '@/components/icons/play';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { getMediaUrl } from '@/lib/media';
import { containerVariants, easeOut, hoverTransition, itemVariantsSlow } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { interviews } from '@/data/static/interviews';

function InterviewCard({ interview, onSelect }: { interview: Interview; onSelect: (interview: Interview) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (interview.video) {
      onSelect(interview);
    }
  };

  return (
    <motion.button
      type="button"
      variants={itemVariantsSlow}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group',
        'flex w-full flex-col overflow-hidden rounded-2xl border border-foreground/10 text-left',
        'bg-background/70 backdrop-blur-xl',
        'cursor-pointer',
        'dark:border-transparent',
      )}
      whileHover={{
        scale: 1.02,
      }}
      transition={hoverTransition}
    >
      <div className="relative flex aspect-video w-full items-center justify-center bg-muted">
        {interview.video ? (
          <Image
            src={interview.video}
            alt={interview.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
        {interview.video && !interview.video ? (
          <video
            src={getMediaUrl(interview.video)}
            preload="metadata"
            muted
            playsInline
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}
        <motion.div
          className="absolute z-10 flex size-14 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={hoverTransition}
        >
          <PlayIcon
            className="text-foreground"
            size={24}
          />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-5 text-muted-foreground">
            Interview · {interview.source} · {interview.year}
          </p>
          <h3 className="font-display text-xl font-light leading-7 text-foreground">{interview.title}</h3>
          <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">{interview.description}</p>
        </div>

        <div>
          <span className="relative text-sm font-medium">
            Watch Video
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
      </div>
    </motion.button>
  );
}

export function InterviewsContent() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  return (
    <>
      <motion.div
        className={cn('mx-auto max-w-screen-2xl px-6 py-24', 'lg:px-36 lg:py-32')}
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
            className={cn('font-display text-4xl font-light leading-tight tracking-tight', 'md:text-6xl')}
            variants={itemVariantsSlow}
          >
            Thoughts That
            <br />
            Move Markets
          </motion.h2>
        </div>

        <motion.div
          className={cn('grid grid-cols-1 gap-4', 'md:grid-cols-2 md:gap-6 xl:grid-cols-3')}
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
        open={selectedInterview !== null && selectedInterview.video !== undefined}
        onOpenChange={(open) => !open && setSelectedInterview(null)}
      >
        <DialogContent
          className={cn(
            'overflow-hidden',
            'w-full max-w-4xl gap-0 border-none p-0',
            'sm:max-w-5xl lg:max-w-6xl',
            'bg-background/70 backdrop-blur-xl',
          )}
        >
          {selectedInterview?.video && (
            <div className="aspect-video w-full">
              <video
                src={getMediaUrl(selectedInterview.video)}
                controls
                autoPlay
                className="size-full"
              >
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <DialogHeader className="p-6">
            <p className="text-sm text-muted-foreground">
              {selectedInterview?.source} · {selectedInterview?.year}
            </p>
            <DialogTitle className="font-display text-xl font-normal">{selectedInterview?.title}</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {selectedInterview?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
