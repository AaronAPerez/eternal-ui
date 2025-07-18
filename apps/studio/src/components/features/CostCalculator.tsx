'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, DollarSign, TrendingDown, Calculator } from 'lucide-react'

interface CostBreakdown {
  hosting: number
  plugins: number
  security: number
  backup: number
  cdn: number
  maintenance: number
  total: number
}

const CostCalculator = () => {
  const [monthlyVisitors, setMonthlyVisitors] = useState(10000)
  const [siteComplexity, setSiteComplexity] = useState<'basic' | 'business' | 'enterprise'>('business')
  const [showAnimation, setShowAnimation] = useState(false)

  const wordpressCosts: Record<string, CostBreakdown> = {
    basic: {
      hosting: 25,
      plugins: 30,
      security: 15,
      backup: 10,
      cdn: 0,
      maintenance: 50,
      total: 130
    },
    business: {
      hosting: 45,
      plugins: 80,
      security: 25,
      backup: 15,
      cdn: 20,
      maintenance: 150,
      total: 335
    },
    enterprise: {
      hosting: 100,
      plugins: 200,
      security: 50,
      backup: 30,
      cdn: 50,
      maintenance: 400,
      total: 830
    }
  }

  const eternalUICosts = {
    basic: 19,
    business: 39,
    enterprise: 79
  }

  const currentWordPressCost = wordpressCosts[siteComplexity]
  const currentEternalUICost = eternalUICosts[siteComplexity]
  const monthlySavings = currentWordPressCost.total - currentEternalUICost
  const yearlySavings = monthlySavings * 12

  useEffect(() => {
    setShowAnimation(true)
  }, [siteComplexity])

  const AnimatedNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      let start = 0
      const end = value
      const duration = 1000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setDisplayValue(end)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }, [value])

    return <span>{displayValue.toLocaleString()}{suffix}</span>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
    >
      <div className="flex items-center justify-center mb-8">
        <Calculator className="w-8 h-8 text-indigo-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          💰 Calculate Your WordPress Savings
        </h2>
      </div>

      {/* Site Complexity Selector */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Select Your Site Type:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(wordpressCosts).map(([complexity, costs]) => (
            <motion.button
              key={complexity}
              onClick={() => setSiteComplexity(complexity as 'basic' | 'business' | 'enterprise')}
              className={`p-4 rounded-lg border-2 transition-all ${
                siteComplexity === complexity
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                {complexity} Site
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ${costs.total}/month
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* WordPress Costs */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
          <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            WordPress Monthly Costs
          </h3>
          <div className="space-y-3">
            {Object.entries(currentWordPressCost).map(([key, value]) => {
              if (key === 'total') return null
              return (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    ${value}/month
                  </span>
                </div>
              )
            })}
            <div className="border-t border-red-200 dark:border-red-800 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-red-700 dark:text-red-400">Total:</span>
                <span className="text-xl font-bold text-red-600 dark:text-red-400">
                  $<AnimatedNumber value={currentWordPressCost.total} />/month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Eternal UI Costs */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4 flex items-center">
            <TrendingDown className="w-5 h-5 mr-2" />
            Eternal UI Monthly Cost
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Everything Included:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                ${currentEternalUICost}/month
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>✅ Hosting (Free)</div>
              <div>✅ All Features Built-in</div>
              <div>✅ Security (Unhackable)</div>
              <div>✅ Backups (Git versioning)</div>
              <div>✅ CDN (Global)</div>
              <div>✅ Maintenance (Zero required)</div>
            </div>
            <div className="border-t border-green-200 dark:border-green-800 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-700 dark:text-green-400">Total:</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  $<AnimatedNumber value={currentEternalUICost} />/month
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Summary */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-indigo-200 dark:border-indigo-800"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🎉 Your Annual Savings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                $<AnimatedNumber value={monthlySavings} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                $<AnimatedNumber value={yearlySavings} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Yearly Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                <AnimatedNumber value={Math.round((monthlySavings / currentWordPressCost.total) * 100)} suffix="%" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Cost Reduction</div>
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            That&atos;s enough to buy a <strong>new laptop</strong> every year! 💻
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CostCalculator