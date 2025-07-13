'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'
import { Button } from './Button'

const competitors = {
  framer: { name: 'Framer', price: 20 },
  webflow: { name: 'Webflow', price: 14 },
  wordpress: { name: 'WordPress', price: 25 }
}

export function PricingCalculator() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<keyof typeof competitors>('framer')
  const [teamSize, setTeamSize] = useState(5)
  const [projectsPerMonth, setProjectsPerMonth] = useState(3)

  const competitorCost = competitors[selectedCompetitor].price * teamSize * 12
  const eternalUICost = 0 // Free plan
  const savings = competitorCost - eternalUICost
  const savingsPercentage = Math.round((savings / competitorCost) * 100)

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Calculate Your Savings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Calculator Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Solution
              </label>
              <select
                value={selectedCompetitor}
                onChange={(e) => setSelectedCompetitor(e.target.value as keyof typeof competitors)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {Object.entries(competitors).map(([key, competitor]) => (
                  <option key={key} value={key}>
                    {competitor.name} (${competitor.price}/month per user)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Team Size: {teamSize} users
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Projects per Month: {projectsPerMonth}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={projectsPerMonth}
                onChange={(e) => setProjectsPerMonth(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Annual Cost Comparison
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {competitors[selectedCompetitor].name}:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${competitorCost.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Eternal UI:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  $0 (Free Plan)
                </span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">You Save:</span>
                  <span className="text-green-600 dark:text-green-400">
                    ${savings.toLocaleString()} ({savingsPercentage}%)
                  </span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Saving Today
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}