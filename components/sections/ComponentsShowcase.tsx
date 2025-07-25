import Link from "next/link"
import { Button } from "../ui/Button/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card/Card"
import { Zap, ArrowRight, Code, Heart } from "lucide-react"
import { Input } from "../ui"

// Component Showcase Section
function ComponentShowcase() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Components
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Each component demonstrates different aspects of our design system philosophy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Button Showcase */}
          <Card variant="elevated" float>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Button Component</CardTitle>
              <CardDescription>
                9 variants, infinite possibilities
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                From subtle interactions to eye-catching effects. Built with accessibility, 
                loading states, and smooth animations.
              </p>
              
              <div className="space-y-3">
                <Button variant="primary" size="sm" fullWidth>Primary Action</Button>
                <Button variant="gradient" size="sm" fullWidth>Gradient Magic</Button>
                <Button variant="glass" size="sm" fullWidth className="bg-blue-500/10">Glass Effect</Button>
              </div>
            </CardContent>
            
            <CardFooter>
              <Link href="/docs/components/button" className="w-full">
                <Button variant="outline" size="sm" fullWidth>
                  Explore Buttons
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Input Showcase */}
          <Card variant="elevated" float>
            <CardHeader>
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Input Component</CardTitle>
              <CardDescription>
                Smart validation & accessibility
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Real-time validation, password toggles, loading states, and 
                comprehensive accessibility. Forms reimagined.
              </p>
              
              <div className="space-y-3">
                <Input placeholder="Email address" size="sm" />
                <Input placeholder="Password" type="password" size="sm" showPasswordToggle />
                <Input placeholder="Success state" size="sm" success="Looks good!" readOnly />
              </div>
            </CardContent>
            
            <CardFooter>
              <Link href="/docs/components/input" className="w-full">
                <Button variant="outline" size="sm" fullWidth>
                  Explore Inputs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Card Showcase */}
          <Card variant="elevated" float>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Card Component</CardTitle>
              <CardDescription>
                Flexible layouts & compositions
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Glass morphism, hover animations, and flexible content patterns. 
                The perfect container for any content.
              </p>
              
              {/* Mini card demos */}
              <div className="space-y-3">
                <Card size="sm" variant="glass" className="bg-purple-500/10">
                  <CardContent>
                    <p className="text-xs">Glass Effect</p>
                  </CardContent>
                </Card>
                
                <Card size="sm" variant="interactive" tilt>
                  <CardContent>
                    <p className="text-xs">Interactive & Tilt</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            
            <CardFooter>
              <Link href="/docs/components/card" className="w-full">
                <Button variant="outline" size="sm" fullWidth>
                  Explore Cards
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ComponentShowcase;