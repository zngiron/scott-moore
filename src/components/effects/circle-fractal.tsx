'use client';

import { useCallback, useEffect, useRef } from 'react';

interface CircleFractalProps {
  className?: string;
}

export function CircleFractal({ className }: CircleFractalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({
    x: 0,
    y: 0,
  });

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      time: number,
    ) => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.3;
      const centerY = height * 0.55;
      const maxRadius = Math.min(width, height) * 0.45;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const mouseDistance = Math.sqrt(dx * dx + dy * dy);
      const mouseInfluence = Math.max(0, 1 - mouseDistance / (maxRadius * 1.5));

      // Draw concentric circles with subtle animation
      const circleCount = 8;

      for (let i = 0; i < circleCount; i++) {
        const progress = (i + 1) / circleCount;
        const baseRadius = maxRadius * progress;

        // Subtle breathing animation
        const breathe = Math.sin(time * 0.0008 + i * 0.3) * 3;
        const mouseWobble = mouseInfluence * Math.sin(time * 0.002 + i) * 8;
        const radius = baseRadius + breathe + mouseWobble;

        // Fade opacity based on distance from center
        const opacity = 0.08 + progress * 0.15;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 162, 158, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw radiating lines from center
      const lineCount = 24;
      for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2;
        const waveOffset = Math.sin(time * 0.001 + i * 0.5) * 5;
        const innerRadius = maxRadius * 0.15 + waveOffset;
        const outerRadius = maxRadius + waveOffset;

        const startX = centerX + Math.cos(angle) * innerRadius;
        const startY = centerY + Math.sin(angle) * innerRadius;
        const endX = centerX + Math.cos(angle) * outerRadius;
        const endY = centerY + Math.sin(angle) * outerRadius;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(168, 162, 158, ${0.04 + (i % 4 === 0 ? 0.06 : 0)})`;
        ctx.lineWidth = 1;
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
