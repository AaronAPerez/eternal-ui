'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Shield, Rocket, Download, ShoppingCart, Mail, 
  BarChart, Users, MessageSquare, Image, Settings, Zap 
} from 'lucide-react'

interface Plugin {
  category: string
  icon: React.ComponentType<any>
  plugins: Array<{
    name: string
    cost: number
    description: string
  }>
  eternalFeature: string
  savings: number
}

const PluginReplacement = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('seo')
  const [totalSavings, setTotalSavings] = useState(0)

  const pluginCategories: Record<string, Plugin> = {
    seo: {
      category: 'SEO & Analytics',
      icon: Search,
      plugins: [
        { name: 'Yoast SEO Premium', cost: 99, description: 'SEO optimization plugin' },
        { name: 'RankMath Pro', cost: 59, description: 'SEO toolkit' },
        { name: 'Google Analytics', cost: 0, description: 'Web analytics' }
      ],
      eternalFeature: 'Built-in SEO perfection with automatic optimization',
      savings: 158
    },
    security: {
      category: 'Security & Backup',
      icon: Shield,
      plugins: [
        { name: 'Wordfence Premium', cost: 119, description: 'Security firewall' },
        { name: 'Sucuri Security', cost: 200, description: 'Website protection' },
        { name: 'UpdraftPlus Premium', cost: 70, description: 'Backup solution' }
      ],
      eternalFeature: 'Unhackable static sites with built-in security',
      savings: 389
    },
    performance: {
      category: 'Performance & Speed',
      icon: Rocket,
      plugins: [
        { name: 'WP Rocket', cost: 59, description: 'Caching plugin' },
        { name: 'Cloudflare Pro', cost: 240, description: 'CDN and optimization' },
        { name: 'Smush Pro', cost: 60, description: 'Image optimization' }
      ],
      eternalFeature: 'Lightning-fast static sites with global CDN',
      savings: 359
    },
    ecommerce: {
      category: 'E-commerce',
      icon: ShoppingCart,
      plugins: [
        { name: 'WooCommerce', cost: 0, description: 'E-commerce platform' },
        { name: 'WooCommerce Extensions', cost: 299, description: 'Additional features' },
        { name: 'Easy Digital Downloads', cost: 99, description: 'Digital products' }
      ],
      eternalFeature: 'Built-in e-commerce with lightning-fast checkout',
      savings: 398
    },
    marketing: {
      category: 'Marketing & Email',
      icon: Mail,
      plugins: [
        { name: 'Mailchimp Pro', cost: 300, description: 'Email marketing' },
        { name: 'OptinMonster', cost: 228, description: 'Lead generation' },
        { name: 'MonsterInsights Pro', cost: 199, description: 'Analytics' }
      ],
      eternalFeature: 'Integrated marketing suite with automation',
      savings: 727
    },
    forms: {
      category: 'Forms & Contact',
      icon: MessageSquare,
      plugins: [
        { name: 'Gravity Forms', cost: 59, description: 'Advanced forms' },
        { name: 'WPForms Pro', cost: 99, description: 'Form builder' },
        { name: 'Ninja Forms', cost: 99, description: 'Form creation' }
      ],
      eternalFeature: 'Smart forms with advanced validation and analytics',
      savings: 257
    }
  }

  useEffect(() => {
    const total = Object.values(pluginCategories).reduce((sum, category) => sum + category.savings, 0)
    setTotalSavings(total)
  }, [])

  const AnimatedSavings = ({ amount }: { amount: number }) => {
    const [displayAmount, setDisplayAmount] = useState(0)

    useEffect(() => {
      let start = 0
      const end = amount
      const duration = 1500
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setDisplayAmount(end)
          clearInterval(timer)
        } else {
          setDisplayAmount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }, [amount])

    return <span>${displayAmount.toLocaleString()}</span>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
    >
      <div className="flex items-center justify-center mb-8">
        <Settings className="w-8 h-8 text-purple-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          🔌 Replace 58,000+ WordPress Plugins
        </h2>
      </div>

      {/* Category Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {Object.entries(pluginCategories).map(([key, category]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedCategory === key
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <category.icon className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
              {category.category}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Selected Category Details */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 border border-purple-200 dark:border-purple-800 mb-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* WordPress Plugins */}
          <div>
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4">
              ❌ WordPress Plugins Required
            </h3>
            <div className="space-y-3">
              {pluginCategories[selectedCategory].plugins.map((plugin, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-200 dark:border-red-800"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {plugin.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {plugin.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-red-600 dark:text-red-400">
                        ${plugin.cost}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        /year
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-red-200 dark:border-red-800 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-red-700 dark:text-red-400">
                    Total Annual Cost:
                  </span>
                  <span className="text-xl font-bold text-red-600 dark:text-red-400">
                    $<AnimatedSavings amount={pluginCategories[selectedCategory].savings} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Eternal UI Solution */}
          <div>
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4">
              ✅ Eternal UI Built-In Solution
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-green-200 dark:border-green-800 h-full">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Everything Built-In
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {pluginCategories[selectedCategory].eternalFeature}
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <span className="mr-2">✓</span>
                  No plugin conflicts
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <span className="mr-2">✓</span>
                  No compatibility issues
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <span className="mr-2">✓</span>
                  Perfect integration
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <span className="mr-2">✓</span>
                  Zero maintenance
                </div>
              </div>
              <div className="border-t border-green-200 dark:border-green-800 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    FREE
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Included in subscription
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Total Savings Summary */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8 border border-green-200 dark:border-green-800"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💰 Total Plugin Replacement Savings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                $<AnimatedSavings amount={totalSavings} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Annual WordPress Plugin Costs
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                $468
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Annual Eternal UI Cost
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                $<AnimatedSavings amount={totalSavings - 468} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Your Annual Savings
              </div>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg text-gray-600 dark:text-gray-400 mt-6"
          >
            That&atos;s enough to buy a <strong>new car</strong> every few years! 🚗
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PluginReplacement