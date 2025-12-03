'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface WaveFractalProps {
  className?: string;
}

// Check if device prefers reduced motion or is mobile
function useOptimizedRendering() {
  const [config, setConfig] = useState({
    lineCount: 20,
    stepSize: 6,
    enabled: true,
    frameSkip: 2,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // Simple mobile detection based on screen size and touch
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

    if (prefersReducedMotion) {
      setConfig({
        lineCount: 0,
        stepSize: 10,
        enabled: false,
        frameSkip: 1,
      });
    } else if (isMobile) {
      // Significantly reduced for mobile: fewer lines, bigger steps, skip frames
      setConfig({
        lineCount: 12,
        stepSize: 8,
        enabled: true,
        frameSkip: 3, // Only render every 3rd frame
      });
    } else {
      // Desktop: full quality
      setConfig({
        lineCount: 30,
        stepSize: 4,
        enabled: true,
        frameSkip: 1,
      });
    }
  }, []);

  return config;
}

export function WaveFractal({ className }: WaveFractalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
  });
  const animationRef = useRef<number>(0);
  const frameCountRef = useRef(0);

  const { lineCount, stepSize, enabled, frameSkip } = useOptimizedRendering();

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      time: number,
    ) => {
      ctx.clearRect(0, 0, width, height);

      if (lineCount === 0) return;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      const baseAmplitude = height * 0.15;
      const baseFrequency = 0.003;

      for (let i = 0; i < lineCount; i++) {
        const progress = i / lineCount;
        const yOffset = height * 0.3 + progress * height * 0.5;
        const opacity = 0.08 + progress * 0.12;
        const amplitude = baseAmplitude * (0.5 + progress * 0.8);
        const frequency = baseFrequency * (1 + progress * 0.5);
        const phase = time * 0.0005 + i * 0.15;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 162, 158, ${opacity})`;
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += stepSize) {
          const dx = x - mouseX;
          const dy = yOffset - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - distance / 300) * 50;

          const wave1 = Math.sin(x * frequency + phase) * amplitude;
          const wave2 =
            Math.sin(x * frequency * 2.1 + phase * 1.3) * amplitude * 0.3;
          const wave3 =
            Math.sin(x * frequency * 0.5 + phase * 0.7) * amplitude * 0.5;

          const mouseWave =
            Math.sin(distance * 0.02 - time * 0.003) * influence;

          const y = yOffset + wave1 + wave2 + wave3 + mouseWave;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }
    },
    [
      lineCount,
      stepSize,
    ],
  );

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      // Use lower DPR on mobile for better performance
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile
        ? Math.min(window.devicePixelRatio, 1.5)
        : window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Throttled touch handler for mobile
    let lastTouchTime = 0;
    const handleTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastTouchTime < 50) return; // Max 20fps for touch updates
      lastTouchTime = now;

      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      }
    };

    const animate = (time: number) => {
      frameCountRef.current++;

      // Skip frames on mobile for better performance
      if (frameCountRef.current % frameSkip === 0) {
        const rect = canvas.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, time);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    updateSize();
    animationRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });
    window.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [
    draw,
    enabled,
    frameSkip,
  ]);

  if (!enabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}
