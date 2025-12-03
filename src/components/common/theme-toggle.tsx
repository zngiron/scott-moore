'use client';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className="relative flex size-9 items-center justify-center cursor-pointer"
        aria-label="Toggle theme"
      >
        <span className="size-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      type="button"
      className="relative flex size-9 items-center justify-center cursor-pointer"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{
        scale: 0.95,
      }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        duration: 0.15,
        ease: [
          0.25,
          0.4,
          0.25,
          1,
        ],
      }}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{
          opacity: 0,
          rotate: -90,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          rotate: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          rotate: 90,
          scale: 0.5,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
      </motion.span>
    </motion.button>
  );
}
