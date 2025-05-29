import type { Metadata } from 'next'
import './globals.css'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { locales } from '@/app/i18n/navigation';

export const metadata: Metadata = {
  title: 'none.bot::modern bot',
  description: 'mordern bot built with next.js',
  generator: 'none.bot',
  applicationName: 'none.bot',
  keywords: ['none.bot', 'modern bot', 'next.js'],
}

export default async function RootLayout({
  children,
  params: paramsProp, // Renamed from params to paramsProp to await it
}: Readonly<{
  children: React.ReactNode
  // The type { locale: string } refers to the resolved shape of params
  params: { locale: string } 
}>) {
  // Await paramsProp as suggested by the error message
  const params = await paramsProp;
  const locale = params.locale;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
