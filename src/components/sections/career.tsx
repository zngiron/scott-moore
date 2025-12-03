'use client';

import { type MotionValue, motion, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { type CareerItem, careerItems } from '@/data/career';

function TimelineItem({
  item,
  isLast,
  index,
  progress,
}: {
  item: CareerItem;
  isLast: boolean;
  index: number;
  progress: number;
}) {
  // Each item gets a portion of the scroll (0-1 divided by number of items)
  const itemCount = careerItems.length;
  const itemStart = index / itemCount;
  const itemEnd = (index + 1) / itemCount;

  // Calculate visibility for this item (0 to 1)
  const itemProgress = Math.max(0, Math.min(1, (progress - itemStart) / (itemEnd - itemStart)));

  // Sub-animations within item progress
  const bulletVisible = itemProgress > 0;
  const lineProgress = Math.max(0, Math.min(1, (itemProgress - 0.2) / 0.5));
  const contentVisible = itemProgress > 0.3;

  return (
    <div className="flex flex-col w-full">
      {/* Year Row */}
      <div className="flex items-center gap-6">
        {/* Circle */}
        <motion.div
          className="size-[10px] rounded-full bg-black shrink-0"
          animate={{
            scale: bulletVisible ? 1 : 0,
            opacity: bulletVisible ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        />
        {/* Year */}
        <motion.p
          className="text-stone-500 text-base"
          animate={{
            opacity: bulletVisible ? 1 : 0,
            x: bulletVisible ? 0 : -10,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {item.year}
        </motion.p>
      </div>

      {/* Content Row */}
      <div className="flex gap-6">
        {/* Line Container */}
        <div className="flex items-center justify-center w-[10px] shrink-0">
          {!isLast && (
            <motion.div
              className="w-[2px] bg-stone-300 origin-top"
              style={{ height: '100%' }}
              animate={{ scaleY: lineProgress }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          )}
        </div>

        {/* Text Content */}
        <motion.div
          className="flex flex-col pb-6"
          animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? 0 : 10,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="font-display text-xl text-black leading-7">
            {item.position}
          </p>
          <p className="text-stone-500 text-base leading-6">{item.company}</p>
          <p className="text-stone-500 text-base leading-6">
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function Career() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      className="bg-stone-100 relative"
      // Height = viewport + extra scroll space for each item
      style={{ height: `${100 + careerItems.length * 50}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-dvh flex items-center">
        <div className="px-6 md:px-36 w-full">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left Column - Header */}
            <div className="flex flex-col gap-6">
              <p className="text-xl uppercase tracking-widest text-stone-500">
                Career
              </p>

              <h2 className="font-display font-light text-5xl md:text-6xl tracking-tight leading-[1.1]">
                A Journey Built on Financial Leadership
              </h2>
            </div>

            {/* Right Column - Timeline */}
            <div className="flex flex-col gap-6">
              {careerItems.map((item, index) => (
                <TimelineItemWrapper
                  key={`${item.year}-${item.position}`}
                  item={item}
                  index={index}
                  isLast={index === careerItems.length - 1}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Wrapper to subscribe to motion value
function TimelineItemWrapper({
  item,
  index,
  isLast,
  scrollProgress,
}: {
  item: CareerItem;
  index: number;
  isLast: boolean;
  scrollProgress: MotionValue<number>;
}) {
  return (
    <TimelineItemWithProgress
      item={item}
      index={index}
      isLast={isLast}
      progressValue={scrollProgress}
    />
  );
}

function TimelineItemWithProgress({
  item,
  index,
  isLast,
  progressValue,
}: {
  item: CareerItem;
  index: number;
  isLast: boolean;
  progressValue: MotionValue<number>;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return progressValue.on('change', (v) => setProgress(v));
  }, [progressValue]);

  return (
    <TimelineItem item={item} index={index} isLast={isLast} progress={progress} />
  );
}

