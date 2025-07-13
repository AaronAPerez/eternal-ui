import { Metadata } from 'next'
import { FeaturesShowcase } from '@/components/features/FeaturesShowcase'

export const metadata: Metadata = {
  title: 'Features | Eternal UI - AI-Powered Website Builder',
  description: 'Discover all the powerful features that make Eternal UI the best visual website builder. AI layouts, code export, collaboration, and more.',
}

export default function FeaturesPage() {
  return <FeaturesShowcase />
}
