import React from 'react'
import { Metadata } from 'next'
import { ComponentsPage } from '../../components/ComponentsPage/ComponentsPage'





export const metadata: Metadata = {
  title: 'Component Library - Eternal UI',
  description: 'Professional-grade components for modern web development',
  keywords: ['React components', 'UI library', 'design system', 'TypeScript'],
  openGraph: {
    title: 'Component Library - Eternal UI',
    description: 'Professional-grade components for modern web development',
    type: 'website',
  },
}

export default function Components() {
  return <ComponentsPage />
}
