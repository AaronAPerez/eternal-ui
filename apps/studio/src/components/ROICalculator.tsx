/**
 * ROI Calculator for Framework Export
 * Demonstrates cost savings and time benefits
 */

'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface ROIMetrics {
  timeSaved: number // hours
  costSaved: number // dollars
  productivityGain: number // percentage
  competitorComparison: {
    framer: number
    webflow: number
    wordpress: number
  }
}

/**
 * ROI Calculator Component
 * 
 * Calculates and displays the return on investment for using
 * Eternal UI's framework export feature vs. competitors
 */
const ROICalculator = () => {
  const [teamSize, setTeamSize] = useState(5)
  const [projectsPerMonth, setProjectsPerMonth] = useState(3)
  const [developerHourlyRate, setDeveloperHourlyRate] = useState(100)

  // Calculate ROI metrics
  const roiMetrics = useMemo((): ROIMetrics => {
    // Time savings calculations
    const hoursPerProjectWithoutTool = 40 // Manual coding
    const hoursPerProjectWithTool = 4 // Using export feature
    const hoursSavedPerProject = hoursPerProjectWithoutTool - hoursPerProjectWithTool
    
    const monthlyTimeSaved = hoursSavedPerProject * projectsPerMonth
    const monthlyCostSaved = monthlyTimeSaved * developerHourlyRate * teamSize

    // Productivity calculations
    const productivityGain = (hoursSavedPerProject / hoursPerProjectWithoutTool) * 100

    return {
      timeSaved: monthlyTimeSaved * teamSize,
      costSaved: monthlyCostSaved,
      productivityGain,
      competitorComparison: {
        framer: monthlyCostSaved * 0.85, // 85% savings vs Framer
        webflow: monthlyCostSaved * 0.75, // 75% savings vs Webflow
        wordpress: monthlyCostSaved * 0.60 // 60% savings vs WordPress agencies
      }
    }
  }, [teamSize, projectsPerMonth, developerHourlyRate])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Calculate Your ROI</h2>
        
        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Team Size
            </label>
            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-gray-200"
              min="1"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Projects per Month
            </label>
            <input
              type="number"
              value={projectsPerMonth}
              onChange={(e) => setProjectsPerMonth(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-gray-200 "
              min="1"
              max="50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Developer Hourly Rate ($)
            </label>
            <input
              type="number"
              value={developerHourlyRate}
              onChange={(e) => setDeveloperHourlyRate(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 bg-gray-200"
              min="50"
              max="300"
            />
          </div>
        </div>

        {/* ROI Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {roiMetrics.timeSaved.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Hours Saved per Month</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              ${roiMetrics.costSaved.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Cost Saved per Month</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">
              {roiMetrics.productivityGain.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">Productivity Gain</div>
          </div>
        </div>
      </Card>

      {/* Competitor Comparison */}
      <Card className="p-6 text-gray-900 bg-gray-200">
        <h3 className="text-xl font-semibold mb-4">Savings vs. Competitors</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 text-gray-900 rounded-lg">
            <div>
              <span className="font-medium">vs. Framer</span>
              <Badge variant="destructive" className="ml-2">85% More Expensive</Badge>
            </div>
            <div className="text-xl font-bold text-green-600">
              ${roiMetrics.competitorComparison.framer.toLocaleString()} saved
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 text-gray-900 rounded-lg">
            <div>
              <span className="font-medium">vs. Webflow</span>
              <Badge variant="destructive" className="ml-2">75% More Expensive</Badge>
            </div>
            <div className="text-xl font-bold text-green-600">
              ${roiMetrics.competitorComparison.webflow.toLocaleString()} saved
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 text-gray-900 rounded-lg">
            <div>
              <span className="font-medium">vs. WordPress Agencies</span>
              <Badge variant="destructive" className="ml-2">60% More Expensive</Badge>
            </div>
            <div className="text-xl font-bold text-green-600">
              ${roiMetrics.competitorComparison.wordpress.toLocaleString()} saved
            </div>
          </div>
        </div>
      </Card>

      {/* Annual Projections */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Annual Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Time Savings</h4>
            <div className="text-2xl font-bold text-green-600">
              {(roiMetrics.timeSaved * 12).toLocaleString()} hours/year
            </div>
            <div className="text-sm text-gray-500">
              Equivalent to {Math.round(roiMetrics.timeSaved * 12 / 40)} work weeks
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Cost Savings</h4>
            <div className="text-2xl font-bold text-green-600">
              ${(roiMetrics.costSaved * 12).toLocaleString()}/year
            </div>
            <div className="text-sm text-gray-500">
              ROI: {((roiMetrics.costSaved * 12) / (29 * 12) * 100).toFixed(0)}% annually
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ROICalculator