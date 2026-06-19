'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function TrustBar() {
  const t = useTranslations('trust');
  const metrics = t.raw('metrics') as Array<{ value: string; label: string }>;

  return (
    <section
      id="trust"
      className="py-12 bg-bg-secondary border-y border-border"
      aria-label="Trust metrics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-secondary text-sm mb-8 font-medium">{t('title')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-heading font-bold text-3xl md:text-4xl text-gradient-green mb-1">
                {metric.value}
              </div>
              <div className="text-text-secondary text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
