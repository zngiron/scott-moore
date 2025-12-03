import type { Metadata, Viewport } from 'next';

import { Inter, Space_Grotesk } from 'next/font/google';

import { Background } from '@/components/layout/background';
import { Header } from '@/components/layout/header';
import { Providers } from '@/components/layout/providers';
import { Scripts } from '@/components/layout/scripts';
import { env } from '@/lib/env';
import { cn } from '@/lib/utils';

import '@/app/globals.css';

const inter = Inter({
  display: 'swap',
  variable: '--font-sans',
  weight: [
    '400',
    '600',
  ],
  subsets: [
    'latin',
  ],
});

const spaceGrotesk = Space_Grotesk({
  display: 'swap',
  variable: '--font-display',
  weight: [
    '400',
    '600',
  ],
  subsets: [
    'latin',
  ],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'Scott Moore',
    template: '%s | Scott Moore',
  },
  description: 'Scott Moore',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Front-End Development',
    locale: 'en',
    images: [
      {
        url: '/static/frontend-dev-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Front-End Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/static/frontend-dev-icon.svg',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, spaceGrotesk.variable)}
    >
      <body
        className={cn(
          'overflow-x-hidden touch-pan-y',
          'bg-background font-sans antialiased',
          // Disable snap scrolling on mobile for smoother experience
          'overflow-y-scroll scrollbar-hide',
          'md:snap-y md:snap-mandatory md:scroll-smooth',
        )}
      >
        <Providers>
          <Background />
          <Header />
          <main className="relative z-10">{children}</main>
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}
