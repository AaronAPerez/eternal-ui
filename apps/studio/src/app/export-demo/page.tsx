import ExportDemo from '@/components/ExportDemo'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Export Demo | Eternal UI - See Code Generation in Action',
  description: 'Watch how Eternal UI generates clean, production-ready code for React, Vue, Svelte, and Angular.',
}

export default function ExportDemoPage() {
  return <ExportDemo />
}
