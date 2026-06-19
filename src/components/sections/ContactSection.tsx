'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

type FormData = {
  name: string; company: string; email: string; phone: string;
  service: string; budget: string; message: string;
};

const INITIAL: FormData = {
  name: '', company: '', email: '', phone: '',
  service: '', budget: '', message: '',
};

export function ContactSection() {
  const t = useTranslations('contact');
  const form = useTranslations('contact.form');
  const locale = useLocale();

  const serviceOptions = form.raw('service_options') as string[];
  const budgetOptions = form.raw('budget_options') as string[];

  const [data, setData] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const whatsappNumber = '50376655109';
  const discoveryCallMessage = encodeURIComponent(
    'Hola Carlos, quiero agendar una llamada de descubrimiento para hablar sobre un proyecto digital.'
  );
  const discoveryCallUrl = `https://wa.me/${whatsappNumber}?text=${discoveryCallMessage}`;

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.message) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale, source: 'cmstudio.digital' }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setData(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-bg-secondary border border-border rounded-xl text-text-primary text-sm placeholder-text-secondary focus:outline-none focus:border-accent-green/50 focus:ring-1 focus:ring-accent-green/20 transition-all duration-200';

  return (
    <section id="contact" className="section-padding bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('description')} />

        {/* Top CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8 mb-12">
          <a
            href={discoveryCallUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 glass-card rounded-xl text-text-primary font-semibold text-sm hover:border-accent-green/30 hover:text-accent-green transition-all duration-200 focus-ring"
            aria-label="Agendar llamada de descubrimiento por WhatsApp"
          >
            <Calendar size={15} aria-hidden="true" />
            {t('cta_call')}
          </a>
          <a
            href="https://wa.me/50376655109?text=Hi+CM+Studio,+I'd+like+to+request+a+quote+for+a+digital+project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 glass-card rounded-xl text-text-primary font-semibold text-sm hover:border-accent-green/30 hover:text-accent-green transition-all duration-200 focus-ring"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {t('cta_whatsapp')}
          </a>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-5">
            <h3 className="font-heading font-semibold text-text-primary">{t('cta_quote')}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-text-secondary mb-1.5">
                  {form('name')} <span className="text-accent-green">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={data.name}
                  onChange={set('name')}
                  placeholder="Juan García"
                  className={inputClass}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contact-company" className="block text-xs font-medium text-text-secondary mb-1.5">
                  {form('company')}
                </label>
                <input
                  id="contact-company"
                  type="text"
                  value={data.company}
                  onChange={set('company')}
                  placeholder="My Business"
                  className={inputClass}
                  autoComplete="organization"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-text-secondary mb-1.5">
                  {form('email')} <span className="text-accent-green">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={data.email}
                  onChange={set('email')}
                  placeholder="you@company.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-medium text-text-secondary mb-1.5">
                  {form('phone')}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={data.phone}
                  onChange={set('phone')}
                  placeholder="+503 0000-0000"
                  className={inputClass}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="contact-service" className="block text-xs font-medium text-text-secondary mb-1.5">
                  {form('service')}
                </label>
                <select
                  id="contact-service"
                  value={data.service}
                  onChange={set('service')}
                  className={inputClass}
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-budget" className="block text-xs font-medium text-text-secondary mb-1.5">
                  {form('budget')}
                </label>
                <select
                  id="contact-budget"
                  value={data.budget}
                  onChange={set('budget')}
                  className={inputClass}
                >
                  <option value="">Select range...</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-text-secondary mb-1.5">
                {form('message')} <span className="text-accent-green">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={data.message}
                onChange={set('message')}
                placeholder="Tell us about your project, goals, and timeline..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <div className="flex items-center gap-2.5 p-3 bg-accent-green/10 border border-accent-green/20 rounded-xl text-accent-green text-sm" role="alert">
                <CheckCircle size={16} aria-hidden="true" />
                {form('success')}
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2.5 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm" role="alert">
                <AlertCircle size={16} aria-hidden="true" />
                {form('error')}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent-green text-bg-primary font-bold rounded-xl hover:bg-accent-green/90 transition-all duration-200 hover:shadow-btn-primary focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={status === 'submitting'}
            >
              <Send size={14} aria-hidden="true" />
              {status === 'submitting' ? form('submitting') : form('submit')}
            </button>

            <p className="text-text-secondary text-xs text-center">
              We typically respond within 24 hours. Your information is kept private.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
