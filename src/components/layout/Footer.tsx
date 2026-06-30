'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const NAV_LINKS = ['services', 'projects', 'process', 'about', 'contact'] as const;

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/montalvo21' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/carlos-montalvo-33a604123' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/cm_studio_digital?igsh=MTlmajluYXJsOTI2NQ==' },
  { icon: Mail, label: 'Email', href: 'mailto:cmont9941@gmail.com' },
];

export function Footer() {
  const t = useTranslations('nav');
  const tf = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-bg-secondary border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href={locale === 'es' ? '/es' : '/'}
              className="flex items-center gap-2 group w-fit"
              aria-label="CM Studio — Home"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-green flex items-center justify-center">
                <span className="text-bg-primary font-bold text-sm font-heading">CM</span>
              </div>
              <span className="font-heading font-semibold text-lg text-text-primary group-hover:text-accent-green transition-colors duration-200">
                CM Studio
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {tf('tagline')}
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-text-secondary hover:text-accent-green hover:border-accent-green/30 transition-all duration-200 focus-ring"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
              {/* WhatsApp icon as SVG */}
              <a
                href="https://wa.me/50376655109?text=Hi+CM+Studio,+I'd+like+to+request+a+quote+for+a+digital+project."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-text-secondary hover:text-accent-green hover:border-accent-green/30 transition-all duration-200 focus-ring"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-text-primary font-semibold text-sm mb-4 font-heading">Navigation</h3>
            <ul className="space-y-2" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200 focus-ring rounded"
                  >
                    {t(link)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact CTA */}
          <div className="space-y-4">
            <h3 className="text-text-primary font-semibold text-sm font-heading">Ready to start?</h3>
            <p className="text-text-secondary text-sm">
              Tell us about your project and let's build something great together.
            </p>
            <a
              href="#contact"
              className="inline-flex px-5 py-2.5 bg-accent-green text-bg-primary font-semibold text-sm rounded-lg hover:bg-accent-green/90 transition-all duration-200 hover:shadow-btn-primary focus-ring"
            >
              {t('cta')}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-xs">{tf('copyright')}</p>
          <p className="text-text-secondary text-xs">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
