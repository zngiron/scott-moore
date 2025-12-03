'use client';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from 'next-themes';

import { SmoothScrollProvider } from '@/components/layout/smooth-scroll';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </ThemeProvider>
  );
}
