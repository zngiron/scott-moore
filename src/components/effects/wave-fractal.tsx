'use client';

import { useCallback, useEffect, useRef } from 'react';

interface WaveFractalProps {
  className?: string;
}

export function WaveFractal({ className }: WaveFractalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
  });
  const animationRef = useRef<number>(0);

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      time: number,
    ) => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      const lineCount = 40;
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

        for (let x = 0; x <= width; x += 3) {
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
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
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

    const handleTouchMove = (e: TouchEvent) => {
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
      const rect = canvas.getBoundingClientRect();
      draw(ctx, rect.width, rect.height, time);
      animationRef.current = requestAnimationFrame(animate);
    };

    updateSize();
    animationRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    window.addEventListener('mousemove', handleMouseMove);
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
  ]);

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
