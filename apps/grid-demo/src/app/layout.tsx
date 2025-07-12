import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eternal UI Grid System Demo',
  description: 'Interactive demonstration of the advanced grid snapping system',
  keywords: ['eternal-ui', 'grid-system', 'drag-drop', 'visual-builder', 'react'],
  authors: [{ name: 'Eternal UI Team' }],
  openGraph: {
    title: 'Eternal UI Grid System Demo',
    description: 'See the advanced grid snapping system in action',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
