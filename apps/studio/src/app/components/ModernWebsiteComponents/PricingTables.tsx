import React, { useState } from 'react'

const PricingTables: React.FC<{
  variant: 'simple' | 'featured' | 'toggle' | 'comparison'
  billing: 'monthly' | 'yearly'
  showPopular: boolean
}> = ({ variant, billing, showPopular }) => {
  const [billingPeriod, setBillingPeriod] = useState(billing)

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 29, yearly: 290 },
      description: 'Perfect for small teams getting started',
      features: ['Up to 5 team members', '10GB storage', 'Basic support', 'Core features'],
      popular: false
    },
    {
      name: 'Professional',
      price: { monthly: 99, yearly: 990 },
      description: 'Best for growing businesses',
      features: ['Up to 25 team members', '100GB storage', 'Priority support', 'Advanced features', 'Analytics'],
      popular: showPopular
    },
    {
      name: 'Enterprise',
      price: { monthly: 299, yearly: 2990 },
      description: 'For large organizations',
      features: ['Unlimited team members', '1TB storage', '24/7 support', 'Custom integrations', 'Advanced analytics', 'White label'],
      popular: false
    }
  ]

  const handleToggle = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')
  }

  const handleKeyDownToggle = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose the perfect plan for your needs
          </p>

          {variant === 'toggle' && (
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`${billingPeriod === 'monthly' ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={handleToggle}
                onKeyDown={handleKeyDownToggle}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                role="switch"
                aria-checked={billingPeriod === 'yearly'}
                aria-label="Toggle billing period"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`${billingPeriod === 'yearly' ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
                Yearly <span className="text-green-600">(Save 20%)</span>
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-indigo-500 bg-white dark:bg-gray-900 shadow-xl scale-105 z-10'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {plan.description}
                </p>
                
                <div className="mt-4 mb-8">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${plan.price[billingPeriod]}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                  aria-label={`Get started with ${plan.name} plan`}
                >
                  Get Started
                </button>
              </div>

              <ul className="mt-8 space-y-3" role="list">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingTables;