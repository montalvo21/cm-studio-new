'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV_LINKS = ['services', 'projects', 'about', 'contact'] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const cleanPathname = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/';
  const englishPath = cleanPathname === '/' ? '/en' : `/en${cleanPathname}`;
  const spanishPath = cleanPathname === '/' ? '/es' : `/es${cleanPathname}`;

  const handleLocaleChange = (targetLocale: 'es' | 'en') => {
    const targetPath = targetLocale === 'es' ? spanishPath : englishPath;

    if (targetLocale === locale) return;

    setIsOpen(false);
    router.push(targetPath);
    router.refresh();
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <nav
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-18"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href={locale === 'es' ? '/es' : '/'}
            className="flex items-center gap-2 group focus-ring rounded-lg"
            aria-label="CM Studio — Home"
          >
            <div className="w-8 h-8 rounded-lg bg-accent-green flex items-center justify-center">
              <span className="text-bg-primary font-bold text-sm font-heading">CM</span>
            </div>
            <span className="font-heading font-semibold text-lg text-text-primary group-hover:text-accent-green transition-colors duration-200">
              CM Studio
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-md focus-ring"
                >
                  {t(link)}
                </a>
              </li>
            ))}
          </ul>

          {/* Language switcher */}
          <div
            className="absolute right-4 sm:right-6 lg:right-8 top-[calc(100%+0.45rem)] flex items-center gap-1.5 rounded-full border border-white/10 bg-bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary backdrop-blur-md lg:top-[calc(100%+0.55rem)]"
            role="navigation"
            aria-label="Language switcher"
          >
            <button
              type="button"
              onClick={() => handleLocaleChange('es')}
              className={cn(
                'transition-colors duration-200 hover:text-text-primary focus-ring rounded-sm',
                locale === 'es' ? 'text-text-primary' : 'text-text-secondary'
              )}
              aria-label="Cambiar a Español"
              aria-current={locale === 'es' ? 'page' : undefined}
            >
              ES
            </button>
            <span className="h-2.5 w-px bg-white/20" aria-hidden="true" />
            <button
              type="button"
              onClick={() => handleLocaleChange('en')}
              className={cn(
                'transition-colors duration-200 hover:text-text-primary focus-ring rounded-sm',
                locale === 'en' ? 'text-text-primary' : 'text-text-secondary'
              )}
              aria-label="Switch to English"
              aria-current={locale === 'en' ? 'page' : undefined}
            >
              EN
            </button>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* CTA */}
            <a
              href="#contact"
              className="px-4 py-2 bg-accent-green text-bg-primary font-semibold text-sm rounded-lg hover:bg-accent-green/90 transition-all duration-200 hover:shadow-btn-primary focus-ring"
            >
              {t('cta')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-secondary hover:text-text-primary focus-ring rounded-lg"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden fixed inset-0 z-40 bg-bg-primary/97 backdrop-blur-xl pt-16"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col p-6 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="px-4 py-3 text-lg font-medium text-text-secondary hover:text-text-primary border-b border-border-subtle transition-colors duration-200 focus-ring rounded"
                >
                  {t(link)}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.2 }}
                className="mt-6 px-6 py-3 bg-accent-green text-bg-primary font-bold text-center rounded-xl text-base focus-ring"
              >
                {t('cta')}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
