import { Metadata } from 'next'
import { DocsHomepage } from '@/components/docs/DocsHomepage'

export const metadata: Metadata = {
  title: 'Documentation | Eternal UI - Complete Guide',
  description: 'Complete documentation for Eternal UI. Learn how to build amazing websites with our visual builder.',
}

export default function DocsPage() {
  return <DocsHomepage />
}
