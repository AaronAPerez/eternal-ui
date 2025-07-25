import React from 'react'
import { Card, CardContent } from '../ui/Card/Card'
import Link from 'next/link'
import { Button } from '../ui/Button/Button'
// Stats Section
function StatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Card variant="glass" glow className="text-center backdrop-blur-xl">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold text-white mb-8">
              Trusted by Developers Worldwide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-white mb-2">10,000+</div>
                <div className="text-white/80">Developers</div>
                <div className="text-sm text-white/60">Using our components</div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80">Companies</div>
                <div className="text-sm text-white/60">In production</div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-white/80">Uptime</div>
                <div className="text-sm text-white/60">Reliability guarantee</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs">
                <Button variant="primary" size="lg" glow floating>
                  Start Building
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/20">
                View Examples
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default StatsSection