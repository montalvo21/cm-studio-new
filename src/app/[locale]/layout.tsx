import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import type { Metadata } from 'next';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isEs = locale === 'es';
  return {
    title: isEs
      ? 'CM Studio | Soluciones Web y Software para Empresas'
      : 'CM Studio | Web & Software Solutions for Growing Businesses',
    description: isEs
      ? 'CM Studio crea landing pages, sitios web corporativos, e-commerce, aplicaciones web y automatizaciones para empresas que quieren crecer digitalmente.'
      : 'CM Studio builds modern landing pages, business websites, e-commerce platforms, web applications, and automation solutions for companies ready to grow online.',
    alternates: {
      canonical: isEs ? 'https://cmstudio.digital/es' : 'https://cmstudio.digital',
      languages: {
        'en-US': 'https://cmstudio.digital',
        'es-SV': 'https://cmstudio.digital/es',
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
