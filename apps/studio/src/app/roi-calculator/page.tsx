import ROICalculator from '@/components/ROICalculator'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'ROI Calculator | Eternal UI - Calculate Your Savings',
  description: 'See how much time and money you can save by switching to Eternal UI from your current solution.',
}

export default function ROICalculatorPage() {
  return <ROICalculator />
}