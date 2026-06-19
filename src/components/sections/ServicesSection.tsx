'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function ServicesSection() {
  const t = useTranslations('services');
  const items = t.raw('items') as Array<{
    id: string; title: string; price: string;
    description: string; benefits: string[]; cta: string;
  }>;

  const isCustom = (price: string) =>
    price.toLowerCase().includes('custom') || price.toLowerCase().includes('cotización');

  return (
    <section id="services" className="section-padding bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {items.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-5 ${
                i === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-heading font-semibold text-lg text-text-primary">
                    {service.title}
                  </h3>
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold ${
                      isCustom(service.price)
                        ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/20'
                        : 'bg-accent-green/15 text-accent-green border border-accent-green/20'
                    }`}
                  >
                    {service.price}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-2 flex-1" aria-label={`${service.title} benefits`}>
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <Check size={13} className="text-accent-green shrink-0" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className="group mt-auto flex items-center justify-between px-4 py-3 rounded-xl border border-border hover:border-accent-green/30 hover:bg-accent-green/5 transition-all duration-200 focus-ring"
              >
                <span className="text-sm font-semibold text-text-primary group-hover:text-accent-green transition-colors duration-200">
                  {service.cta}
                </span>
                <ArrowRight
                  size={14}
                  className="text-text-secondary group-hover:text-accent-green group-hover:translate-x-1 transition-all duration-200"
                  aria-hidden="true"
                />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
