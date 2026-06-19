'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { AvailabilityBadge } from '@/components/shared/AvailabilityBadge';
import { HeroCanvas } from '@/components/shared/HeroCanvas';

interface HeroSectionProps {
  availability: 'available' | 'booking';
}

const TRUST_ITEMS = ['Landing Pages', 'Business Websites', 'E-Commerce', 'Web Applications', 'Automation', 'Cloud & Infrastructure'];

export function HeroSection({ availability }: HeroSectionProps) {
  const t = useTranslations('hero');

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary pt-16"
      aria-label="Hero"
    >
      {/* Background elements */}
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #00E5A8, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-8"
        style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text Content */}
          <div className="space-y-8">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <AvailabilityBadge state={availability} />
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-text-primary"
              >
                {t('headline').split(' & ').map((part, i, arr) => (
                  <span key={i}>
                    {i === 0 ? (
                      <span className="text-gradient">{part}</span>
                    ) : (
                      <>{' & '}{part}</>
                    )}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                custom={0.2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="font-heading text-xl sm:text-2xl text-text-secondary font-medium"
              >
                {t('tagline')}
              </motion.p>
            </div>

            <motion.p
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-lg"
            >
              {t('description')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-green text-bg-primary font-bold text-base rounded-xl hover:bg-accent-green/90 transition-all duration-200 hover:shadow-btn-primary focus-ring"
              >
                {t('cta_primary')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </a>
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 glass-card rounded-xl text-text-primary font-semibold text-base hover:border-accent-green/30 hover:text-accent-green transition-all duration-200 focus-ring"
              >
                <Play size={14} className="fill-current" aria-hidden="true" />
                {t('cta_secondary')}
              </a>
            </motion.div>

            {/* Trust items */}
            <motion.div
              custom={0.5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap gap-2 pt-2"
              aria-label="Services offered"
            >
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs font-medium text-text-secondary glass-card rounded-full border border-border-subtle"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Abstract Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[480px] lg:h-[580px] flex items-center justify-center"
            aria-hidden="true"
          >
            <HeroCanvas />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
