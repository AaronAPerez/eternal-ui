import { Metadata } from 'next'

// import { TemplatesSection } from '@/components/sections/TemplatesSection'
// import { PricingSection } from '@/components/sections/PricingSection'
import { Navigation } from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import FeaturesSection from '@/components/sections/FeaturesSection'
import HeroSection from '@/components/sections/HeroSection'


export const metadata: Metadata = {
  title: 'Eternal UI - Professional Visual Website Builder',
  description: 'Build beautiful, responsive websites 10x faster with AI-powered templates, drag-and-drop editor, and clean code generation.',
  keywords: ['website builder', 'visual editor', 'React components', 'responsive design', 'AI templates'],
  openGraph: {
    title: 'Eternal UI - Professional Visual Website Builder',
    description: 'Build beautiful, responsive websites 10x faster with AI-powered templates.',
    type: 'website',
    url: 'https://eternal-ui.com',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        {/* <TemplatesSection />
        <PricingSection /> */}
      </main>
      <Footer />
    </div>
  )
}

// src/app/page.tsx 
/**
 * 🏠 HOMEPAGE - CLIENT COMPONENT FIX
 * 
 * Fixed: Added 'use client' since it uses interactive components
 */
// 'use client'

// import React from 'react'
// import Link from 'next/link'
// import { Button } from '@/components/ui/Button'
// import { ArrowRight, Code, Sparkles, Zap } from 'lucide-react'
// import { Navigation } from '../components/layout/Navigation'

// export default function HomePage() {
//   return (
//   <>
//     <Navigation/>
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      
//       {/* Hero Section */}
//       <section className="relative py-24 px-4 overflow-hidden">
//         <div className="relative max-w-6xl mx-auto text-center space-y-8">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
//             <Sparkles className="w-4 h-4" />
//             Revolutionary Component Library
//           </div>
          
//           <h1 className="text-6xl md:text-7xl font-bold leading-tight">
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Build Beautiful
//             </span>
//             <br />
//             <span className="text-gray-900 dark:text-white">
//               User Interfaces
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Professional React components with TypeScript support, accessibility built-in, 
//             and animations that bring your ideas to life.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <Link href="/docs">
//               <Button variant="primary" size="lg" icon={<Zap className="w-5 h-5" />}>
//                 Explore Components
//               </Button>
//             </Link>
//             <Link href="/docs/installation">
//               <Button variant="outline" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
//                 Get Started
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//     </>
//   )
// }