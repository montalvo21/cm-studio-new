
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

function isValidLocale(locale: string | undefined): locale is Locale {
  return Boolean(locale && locales.includes(locale as Locale));
}

export default getRequestConfig(async (params) => {
  const requestedLocale = await params.requestLocale;

  if (!isValidLocale(requestedLocale)) {
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default,
    };
  }

  return {
    locale: requestedLocale,
    messages: (await import(`../messages/${requestedLocale}.json`)).default,
  };
});
