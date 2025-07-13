import { Metadata } from 'next'
import { PricingPage } from '@/components/pricing/PricingPage'

export const metadata: Metadata = {
  title: 'Pricing | Eternal UI - Start Free, Scale as You Grow',
  description: 'Choose the perfect plan for your needs. Start free and upgrade as you grow. 85% cheaper than competitors with better features.',
}

export default function Pricing() {
  return <PricingPage />
}