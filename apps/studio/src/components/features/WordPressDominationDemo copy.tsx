// 'use client'

// import React, { useState, useEffect } from 'react'
// import { motion, useInView } from 'framer-motion'
// import { useRef } from 'react'
// import {
//   Zap, Shield, BarChart, Brain, CheckCircle, AlertCircle,
//   Clock, Users, TrendingUp, Smartphone, Code, Palette
// } from 'lucide-react'

// interface FeatureData {
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
//   title: string
//   description: string
//   comparison: {
//     wordpress: string
//     eternal: string
//     improvement: string
//   }
//   features: string[]
// }

// const WordPressDominationDemo = () => {
//   const [activeFeature, setActiveFeature] = useState<string>('performance')
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true })

//   const killerFeatures: Record<string, FeatureData> = {
//     performance: {
//       icon: Zap,
//       title: "10x Performance Boost",
//       description: "Transform your 3.2s WordPress site into a 0.8s lightning-fast experience",
//       comparison: {
//         wordpress: "3.2s average load time",
//         eternal: "0.8s average load time",
//         improvement: "75% faster"
//       },
//       features: [
//         "Static site generation",
//         "Global CDN distribution",
//         "Automatic image optimization",
//         "Code splitting & lazy loading",
//         "Prefetching & caching"
//       ]
//     },
//     security: {
//       icon: Shield,
//       title: "Unhackable Architecture",
//       description: "Eliminate all security vulnerabilities with our static site approach",
//       comparison: {
//         wordpress: "50,000+ vulnerabilities annually",
//         eternal: "Zero attack surface",
//         improvement: "100% secure"
//       },
//       features: [
//         "No server to hack",
//         "No database vulnerabilities",
//         "Automatic SSL everywhere",
//         "DDoS protection built-in",
//         "Enterprise-grade security"
//       ]
//     },
//     cost: {
//       icon: BarChart,
//       title: "90% Cost Reduction",
//       description: "Eliminate hosting fees, plugin costs, and maintenance expenses",
//       comparison: {
//         wordpress: "$300-800/year total cost",
//         eternal: "$39/month ($468/year)",
//         improvement: "Save $2,000+ annually"
//       },
//       features: [
//         "Free global hosting",
//         "No plugin fees",
//         "Zero maintenance costs",
//         "No security subscriptions",
//         "Unlimited bandwidth"
//       ]
//     },
//     features: {
//       icon: Brain,
//       title: "AI-Powered Everything",
//       description: "Next-generation features WordPress simply cannot offer",
//       comparison: {
//         wordpress: "58,000 conflicting plugins",
//         eternal: "Everything built-in + AI",
//         improvement: "Zero conflicts"
//       },
//       features: [
//         "AI content generation",
//         "Smart SEO optimization",
//         "Automated design suggestions",
//         "Intelligent image creation",
//         "Performance optimization"
//       ]
//     }
//   }

//   const wordpressPainPoints = [
//     {
//       icon: AlertCircle,
//       problem: "Plugin Conflicts & Compatibility",
//       solution: "Everything Built-In",
//       description: "No more plugin nightmares - all features work together perfectly"
//     },
//     {
//       icon: Clock,
//       problem: "Constant Updates & Maintenance",
//       solution: "Zero Maintenance Required",
//       description: "Set it and forget it - your site stays secure and updated automatically"
//     },
//     {
//       icon: Shield,
//       problem: "Security Vulnerabilities",
//       solution: "Unhackable Static Sites",
//       description: "No server, no database, no attack surface - completely secure by design"
//     },
//     {
//       icon: TrendingUp,
//       problem: "Poor Performance & SEO",
//       solution: "Perfect Performance & SEO",
//       description: "Lightning-fast loading with built-in SEO optimization"
//     },
//     {
//       icon: BarChart,
//       problem: "Expensive Hosting & Plugins",
//       solution: "Free Global Hosting",
//       description: "Host anywhere for free with unlimited bandwidth and storage"
//     },
//     {
//       icon: Smartphone,
//       problem: "Mobile Responsiveness Issues",
//       solution: "Mobile-First Design",
//       description: "Perfect on all devices with visual responsive editing tools"
//     }
//   ]

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//       transition={{ duration: 0.6 }}
//       className="space-y-16"
//     >
//       {/* WordPress vs Eternal UI Comparison */}
//       <div className="bg-gradient-to-r from-red-50 to-green-50 dark:from-red-900/20 dark:to-green-900/20 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
//         <motion.h2 
//           className="text-3xl font-bold text-center mb-8"
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <span className="text-red-600">WordPress Problems</span> → <span className="text-green-600">Eternal UI Solutions</span>
//         </motion.h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {wordpressPainPoints.map((point, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
//             >
//               <point.icon className="w-8 h-8 text-red-600 mb-4" />
//               <h3 className="font-bold text-red-700 dark:text-red-400 mb-2 text-sm">
//                 ❌ {point.problem}
//               </h3>
//               <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">
//                 ✅ {point.solution}
//               </h4>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {point.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Interactive Feature Showcase */}
//       <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
//           🚀 Why Eternal UI Crushes WordPress
//         </h2>
        
//         {/* Feature Tabs */}
//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           {Object.entries(killerFeatures).map(([key, feature]) => (
//             <motion.button
//               key={key}
//               onClick={() => setActiveFeature(key)}
//               className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
//                 activeFeature === key
//                   ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-800'
//                   : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <feature.icon className="w-5 h-5" />
//               <span>{feature.title}</span>
//             </motion.button>
//           ))}
//         </div>

//         {/* Active Feature Details */}
//         <motion.div
//           key={activeFeature}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.3 }}
//           className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-indigo-200 dark:border-indigo-800"
//         >
//           <div className="flex items-start space-x-6">
//             <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
//               {React.createElement(killerFeatures[activeFeature].icon, { 
//                 className: "w-8 h-8 text-white" 
//               })}
//             </div>
            
//             <div className="flex-1">
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                 {killerFeatures[activeFeature].title}
//               </h3>
//               <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
//                 {killerFeatures[activeFeature].description}
//               </p>
              
//               {/* Comparison */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                 <div className="text-center p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
//                   <h4 className="font-semibold text-red-700 dark:text-red-400 mb-1">WordPress</h4>
//                   <p className="text-sm text-red-600 dark:text-red-300">
//                     {killerFeatures[activeFeature].comparison.wordpress}
//                   </p>
//                 </div>
//                 <div className="text-center p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
//                   <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">Eternal UI</h4>
//                   <p className="text-sm text-green-600 dark:text-green-300">
//                     {killerFeatures[activeFeature].comparison.eternal}
//                   </p>
//                 </div>
//                 <div className="text-center p-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
//                   <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1">Improvement</h4>
//                   <p className="text-sm text-indigo-600 dark:text-indigo-300 font-bold">
//                     {killerFeatures[activeFeature].comparison.improvement}
//                   </p>
//                 </div>
//               </div>
              
//               {/* Features List */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {killerFeatures[activeFeature].features.map((feature, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-center space-x-2"
//                   >
//                     <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                     <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

// export default WordPressDominationDemo