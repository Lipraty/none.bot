import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'none.bot::modern bot',
  description: 'mordern bot built with next.js',
  generator: 'none.bot',
  applicationName: 'none.bot',
  keywords: ['none.bot', 'modern bot', 'next.js'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
