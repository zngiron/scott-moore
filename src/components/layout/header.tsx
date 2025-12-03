'use client';

import Link from 'next/link';

import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { ThemeToggle } from '@/components/common/theme-toggle';
import { cn } from '@/lib/utils';
import { useActiveSection } from '@/hooks/use-active-section';

const navigation = [
  {
    name: 'About',
    href: '/#about',
    section: 'about',
  },
  {
    name: 'Expertise',
    href: '/#expertise',
    section: 'expertise',
  },
  {
    name: 'Career',
    href: '/#career',
    section: 'career',
  },
  {
    name: 'Interviews',
    href: '/#interviews',
    section: 'interviews',
  },
  {
    name: 'Insights',
    href: '/#insights',
    section: 'insights',
  },
  {
    name: 'Contact',
    href: '/#contact',
    section: 'contact',
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const activeSection = useActiveSection();

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  const isContact = activeSection === 'contact';

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50',
        'shadow-2xs backdrop-blur-md',
        'transition-colors duration-300',
        isContact
          ? 'bg-black/50 text-white'
          : 'bg-background/50 text-foreground',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between px-6 py-4',
          'lg:px-36',
        )}
      >
        <Link
          href="/"
          className="whitespace-nowrap font-display text-xl font-semibold"
        >
          Scott Moore
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={cn('hidden items-center gap-6', 'lg:flex')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navigation.map((item) => {
            const isActive = activeSection === item.section;
            const isHovered = hoveredLink === item.name;
            const showUnderline = isActive || isHovered;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative py-1 text-sm"
                onMouseEnter={() => setHoveredLink(item.name)}
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px w-full origin-left bg-current"
                  initial={{
                    scaleX: 0,
                  }}
                  animate={{
                    scaleX: showUnderline ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [
                      0.25,
                      0.4,
                      0.25,
                      1,
                    ],
                  }}
                />
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className={cn('flex items-center gap-2', 'lg:hidden')}>
          <ThemeToggle />
          <button
            type="button"
            className="-mr-2 p-2 cursor-pointer"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
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
                  <X className="size-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
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
                  <Menu className="size-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            className={cn('overflow-hidden', 'lg:hidden')}
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className="flex flex-col gap-4 px-6 pb-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.03,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                    },
                    closed: {
                      opacity: 0,
                      y: -10,
                    },
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <motion.div
                    whileHover={{
                      opacity: 0.7,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block py-2 text-lg"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
