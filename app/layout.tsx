import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/context';


export const metadata: Metadata = {
  title: 'Eternal UI - The Ultimate Visual Builder',
  description: 'Create stunning, production-ready websites with our AI-powered visual builder.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F9FAFB" />
      </head>
      <body className="font-sans antialiased bg-background-primary text-text-primary">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}