import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Studio - Eternal UI',
  description: 'Professional visual website builder studio',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {children}
    </div>
  )
}