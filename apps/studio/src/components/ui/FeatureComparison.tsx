'use client'

import { Check, X } from 'lucide-react'

interface ComparisonData {
  competitors: string[]
  features: Array<{
    name: string
    values: (boolean | string)[]
  }>
}

interface FeatureComparisonProps {
  data: ComparisonData
}

export function FeatureComparison({ data }: FeatureComparisonProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Features
              </th>
              {data.competitors.map((competitor, index) => (
                <th
                  key={competitor}
                  className={`px-6 py-4 text-center text-sm font-semibold ${
                    index === data.competitors.length - 1
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {competitor}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.features.map((feature, featureIndex) => (
              <tr key={feature.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {feature.name}
                </td>
                {feature.values.map((value, valueIndex) => (
                  <td
                    key={valueIndex}
                    className={`px-6 py-4 text-center ${
                      valueIndex === feature.values.length - 1
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : ''
                    }`}
                  >
                    {typeof value === 'boolean' ? (
                      value ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {value}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}