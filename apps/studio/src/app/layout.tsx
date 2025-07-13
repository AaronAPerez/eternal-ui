import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { StudioNavigation } from '@/components/StudioNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eternal UI Studio - Visual Website Builder',
  description: 'Build beautiful websites with drag & drop components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StudioNavigation/>
        {children}
      </body>
    </html>
  )
}