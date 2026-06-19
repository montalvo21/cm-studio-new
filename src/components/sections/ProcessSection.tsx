'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function ProcessSection() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as Array<{ number: string; title: string; description: string }>;

  return (
    <section id="process" className="section-padding bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden group"
            >
              {/* Number watermark */}
              <div
                className="absolute top-3 right-4 font-heading font-bold text-6xl text-text-primary opacity-[0.04] select-none"
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Step number badge */}
              <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border flex items-center justify-center mb-4 group-hover:border-accent-green/30 transition-colors duration-200">
                <span className="font-heading font-bold text-sm text-accent-green">{step.number}</span>
              </div>

              <h3 className="font-heading font-semibold text-text-primary mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
