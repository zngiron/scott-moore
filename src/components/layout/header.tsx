'use client';

import Link from 'next/link';

import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const navigation = [
  {
    name: 'About',
    href: '/#about',
  },
  {
    name: 'Expertise',
    href: '/#expertise',
  },
  {
    name: 'Career',
    href: '/#career',
  },
  {
    name: 'Interviews',
    href: '/#interviews',
  },
  {
    name: 'Insights',
    href: '/#insights',
  },
  {
    name: 'Contact',
    href: '/#contact',
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/50">
      <div className="flex items-center justify-between px-6 md:px-36 py-4">
        <Link
          href="/"
          className="font-display font-semibold text-xl"
        >
          Scott Moore
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm py-1"
              onMouseEnter={() => setHoveredLink(item.name)}
            >
              {item.name}
              {hoveredLink === item.name && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute left-0 -bottom-0.5 h-px w-full bg-current"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2"
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
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <X className="size-6" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{
                  opacity: 0,
                  rotate: 90,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: -90,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <Menu className="size-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden overflow-hidden"
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
              className="flex flex-col px-6 pb-6 gap-4"
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
                  <Link
                    href={item.href}
                    className="block text-lg py-2 hover:opacity-70 transition-opacity"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
