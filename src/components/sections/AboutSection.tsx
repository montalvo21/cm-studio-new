'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Download, Calendar, Check } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { AvailabilityBadge } from '@/components/shared/AvailabilityBadge';

interface AboutSectionProps {
  availability: 'available' | 'booking';
}

export function AboutSection({ availability }: AboutSectionProps) {
  const t = useTranslations('about');
  const expertise = t.raw('expertise') as string[];
  const founder = t.raw('founder') as {
    name: string; role: string; location: string;
    badge_available: string; badge_booking: string;
    cv_btn: string; call_btn: string;
  };
  const whatsappNumber = '50376655109';
  const discoveryCallMessage = encodeURIComponent(
    'Hola Carlos, quiero agendar una llamada de descubrimiento para hablar sobre un proyecto digital.'
  );
  const discoveryCallUrl = `https://wa.me/${whatsappNumber}?text=${discoveryCallMessage}`;

  return (
    <section id="about" className="section-padding bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">{t('description')}</p>
            <p className="text-text-secondary leading-relaxed">{t('bio')}</p>

            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-4 text-sm uppercase tracking-widest text-accent-green">
                Areas of Expertise
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {expertise.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <Check size={13} className="text-accent-green shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right — Founder card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl p-6 space-y-5 border-gradient">
              {/* Avatar placeholder */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-green/20 to-accent-blue/20 border border-border flex items-center justify-center shrink-0">
                  <span className="font-heading font-bold text-xl text-accent-green">CM</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-text-primary text-lg">{founder.name}</h3>
                  <p className="text-text-secondary text-sm">{founder.role}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin size={12} className="text-text-secondary" aria-hidden="true" />
                    <span className="text-text-secondary text-xs">{founder.location}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-4">
                <AvailabilityBadge state={availability} />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={discoveryCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent-green text-bg-primary font-bold text-sm rounded-xl hover:bg-accent-green/90 transition-all duration-200 hover:shadow-btn-primary focus-ring"
                  aria-label="Agendar llamada de descubrimiento por WhatsApp"
                >
                  <Calendar size={14} aria-hidden="true" />
                  {founder.call_btn}
                </a>
                <a
                  href="/CV-Carlos-Montalvo.pdf"
                  download
                  className="flex items-center justify-center gap-2 px-4 py-3 glass-card text-text-secondary text-sm rounded-xl hover:text-text-primary hover:border-border-strong transition-all duration-200 focus-ring"
                  aria-label="Download CV (PDF)"
                >
                  <Download size={14} aria-hidden="true" />
                  {founder.cv_btn}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
