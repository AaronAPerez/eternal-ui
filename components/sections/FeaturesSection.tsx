import { Code, Globe, Layers, Shield, Sparkles, Zap } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from '../ui'
// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Ready",
      description: "Production-tested components used by Fortune 500 companies with enterprise-grade security and support."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for performance with tree-shaking, lazy loading, and sub-50KB bundle sizes."
    },
    {
      icon: Code,
      title: "TypeScript First",
      description: "Full TypeScript support with intelligent autocomplete, type safety, and superior developer experience."
    },
    {
      icon: Globe,
      title: "Accessible",
      description: "WCAG 2.1 AA compliant with screen reader support, keyboard navigation, and focus management."
    },
    {
      icon: Layers,
      title: "Composable",
      description: "Build complex UIs from simple components. Mix, match, and customize without limitations."
    },
    {
      icon: Sparkles,
      title: "Delightful",
      description: "Smooth animations, micro-interactions, and attention to detail that users notice and love."
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Modern UI?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built for the modern web with performance, accessibility, and developer experience in mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <feature.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection