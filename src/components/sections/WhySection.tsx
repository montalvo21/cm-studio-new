'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target, Search, Smartphone, Zap, MessageCircle, Layers } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

const ICON_MAP: Record<string, React.ElementType> = {
  target: Target,
  search: Search,
  smartphone: Smartphone,
  zap: Zap,
  'message-circle': MessageCircle,
  layers: Layers,
};

export function WhySection() {
  const t = useTranslations('why');
  const items = t.raw('items') as Array<{ icon: string; title: string; description: string }>;

  return (
    <section id="why" className="section-padding bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Target;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card glass-card-hover rounded-2xl p-6 group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center mb-4 group-hover:bg-accent-green/15 transition-colors duration-200">
                  <Icon size={18} className="text-accent-green" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
