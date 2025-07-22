// app/layout.tsx
import React from 'react';
import { ThemeProvider } from '@/lib/theme/context';
import { ClientFeatureFlagWrapper } from '@/components/ClientFeatureFlagWrapper';
import { ThemeScript } from '@/components/VisualBuilder/components/ThemeScript';
import './globals.css';

export const metadata = {
  title: 'Eternal UI Builder',
  description: 'The Ultimate Visual Builder for Modern Websites',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9FAFB' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <meta name="theme-color" content="#F9FAFB" />
      </head>
      <body className="font-sans antialiased bg-background-primary text-text-primary">
        <ThemeProvider>
          <ClientFeatureFlagWrapper>
            {children}
          </ClientFeatureFlagWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}