import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/context';
import { Toaster, ToasterProvider } from '@/components/ui/Toaster';


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
      <body className="font-sans antialiased bg-background-primary text-text-primary bg-gray-100 dark:bg/black text-gray-50">
         <ToasterProvider>  {/* App-wide toaster */}
        <ThemeProvider>
          {children}
          <Toaster />
        
        </ThemeProvider>
       </ToasterProvider>
      </body>
    </html>
  );
}