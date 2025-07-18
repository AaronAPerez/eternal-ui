'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Zap, Clock, TrendingUp, Gauge } from 'lucide-react'

const PerformanceComparison = () => {
  const [isLoadingWordPress, setIsLoadingWordPress] = useState(false)
  const [isLoadingEternal, setIsLoadingEternal] = useState(false)
  const [wordpressLoadTime, setWordpressLoadTime] = useState(0)
  const [eternalLoadTime, setEternalLoadTime] = useState(0)

  const performanceData = [
    { metric: 'Load Time', wordpress: 3.2, eternal: 0.8, unit: 's' },
    { metric: 'Lighthouse Score', wordpress: 45, eternal: 95, unit: '/100' },
    { metric: 'Bundle Size', wordpress: 2.5, eternal: 0.25, unit: 'MB' },
    { metric: 'Time to Interactive', wordpress: 4.1, eternal: 1.2, unit: 's' },
    { metric: 'First Paint', wordpress: 2.8, eternal: 0.5, unit: 's' },
    { metric: 'Requests', wordpress: 87, eternal: 12, unit: '' }
  ]

  const monthlyPerformance = [
    { month: 'Jan', wordpress: 3.4, eternal: 0.8 },
    { month: 'Feb', wordpress: 3.6, eternal: 0.7 },
    { month: 'Mar', wordpress: 3.8, eternal: 0.8 },
    { month: 'Apr', wordpress: 4.1, eternal: 0.9 },
    { month: 'May', wordpress: 4.3, eternal: 0.8 },
    { month: 'Jun', wordpress: 4.5, eternal: 0.7 }
  ]

  const simulateWordPressLoad = async () => {
    setIsLoadingWordPress(true)
    setWordpressLoadTime(0)
    
    // Simulate slow WordPress loading
    const targetTime = 3200 // 3.2 seconds
    const interval = 50
    const increment = targetTime / (targetTime / interval)
    
    for (let i = 0; i <= targetTime; i += increment) {
      await new Promise(resolve => setTimeout(resolve, interval))
      setWordpressLoadTime(i)
    }
    
    setIsLoadingWordPress(false)
  }

  const simulateEternalLoad = async () => {
    setIsLoadingEternal(true)
    setEternalLoadTime(0)
    
    // Simulate fast Eternal UI loading
    const targetTime = 800 // 0.8 seconds
    const interval = 50
    const increment = targetTime / (targetTime / interval)
    
    for (let i = 0; i <= targetTime; i += increment) {
      await new Promise(resolve => setTimeout(resolve, interval))
      setEternalLoadTime(i)
    }
    
    setIsLoadingEternal(false)
  }

  const LoadingBar = ({ isLoading, loadTime, maxTime, color }: {
    isLoading: boolean
    loadTime: number
    maxTime: number
    color: string
  }) => {
    const progress = (loadTime / maxTime) * 100
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
    >
      <div className="flex items-center justify-center mb-8">
        <Zap className="w-8 h-8 text-yellow-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          ⚡ Performance Comparison
        </h2>
      </div>

      {/* Live Load Test */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
          <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4">
            🐌 WordPress Load Test
          </h3>
            <div className="space-y-4">
        <LoadingBar 
          isLoading={isLoadingWordPress}
          loadTime={wordpressLoadTime}
          maxTime={3200}
          color="bg-red-500"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Load Time: {(wordpressLoadTime / 1000).toFixed(1)}s
          </span>
          <span className="text-sm text-red-600 dark:text-red-400">
            Target: 3.2s
          </span>
        </div>
        <button
          onClick={simulateWordPressLoad}
          disabled={isLoadingWordPress}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingWordPress ? 'Loading...' : 'Test WordPress Load'}
        </button>
      </div>
    </div>

    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
      <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4">
        🚀 Eternal UI Load Test
      </h3>
      <div className="space-y-4">
        <LoadingBar 
          isLoading={isLoadingEternal}
          loadTime={eternalLoadTime}
          maxTime={800}
          color="bg-green-500"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Load Time: {(eternalLoadTime / 1000).toFixed(1)}s
          </span>
          <span className="text-sm text-green-600 dark:text-green-400">
            Target: 0.8s
          </span>
        </div>
        <button
          onClick={simulateEternalLoad}
          disabled={isLoadingEternal}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingEternal ? 'Loading...' : 'Test Eternal UI Load'}
        </button>
      </div>
    </div>
  </div>

  {/* Performance Metrics Chart */}
  <div className="mb-8">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
      📊 Performance Metrics Comparison
    </h3>
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis />
          <Tooltip 
            formatter={(value: number, name: string) => [
              `${value}${performanceData.find(d => d.metric === name)?.unit || ''}`,
              name === 'wordpress' ? 'WordPress' : 'Eternal UI'
            ]}
          />
          <Bar dataKey="wordpress" fill="#ef4444" name="WordPress" />
          <Bar dataKey="eternal" fill="#10b981" name="Eternal UI" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Performance Trend */}
  <div className="mb-8">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
      📈 Performance Trend Over Time
    </h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyPerformance}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value: number, name: string) => [
              `${value}s`,
              name === 'wordpress' ? 'WordPress' : 'Eternal UI'
            ]}
          />
          <Line 
            type="monotone" 
            dataKey="wordpress" 
            stroke="#ef4444" 
            strokeWidth={3}
            name="WordPress"
          />
          <Line 
            type="monotone" 
            dataKey="eternal" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Eternal UI"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Performance Summary */}
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800"
  >
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🎯 Performance Impact
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">75%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Faster Loading</div>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">+110%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">SEO Score Boost</div>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Gauge className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">90%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Size Reduction</div>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">86%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Fewer Requests</div>
        </div>
      </div>
    </div>
  </motion.div>
</motion.div>
)
}
export default PerformanceComparison