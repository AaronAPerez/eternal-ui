'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Smartphone,
    Tablet,
    Monitor,
    Wifi,
    Battery,
    Signal,
    Clock,
    Zap,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Play,
    Pause,
    RefreshCw,
    Gauge,
    Timer,
    TrendingUp,
    Users,
    ShoppingCart,
    Target,
    Globe,
    Layers,
    Code2,
    Eye
} from 'lucide-react'

// Device configurations for simulation
interface DeviceConfig {
    name: string
    width: number
    height: number
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    userAgent: string
    connection: '3G' | '4G' | '5G' | 'WiFi'
    screenDensity: number
}

// Performance metrics interface
interface PerformanceMetrics {
    loadTime: number
    firstContentfulPaint: number
    largestContentfulPaint: number
    cumulativeLayoutShift: number
    firstInputDelay: number
    timeToInteractive: number
    bounceRate: number
    conversionRate: number
}

// Migration comparison data
interface SiteComparison {
    wordpress: PerformanceMetrics
    modern: PerformanceMetrics
    improvement: {
        loadTime: number
        performance: number
        bounceRate: number
        conversion: number
    }
}

// Device presets
const DEVICES: DeviceConfig[] = [
    {
        name: 'iPhone 14',
        width: 375,
        height: 812,
        icon: Smartphone,
        userAgent: 'iPhone 14',
        connection: '5G',
        screenDensity: 3
    },
    {
        name: 'Samsung Galaxy S23',
        width: 393,
        height: 851,
        icon: Smartphone,
        userAgent: 'Samsung Galaxy S23',
        connection: '5G',
        screenDensity: 2.75
    },
    {
        name: 'iPad Pro',
        width: 768,
        height: 1024,
        icon: Tablet,
        userAgent: 'iPad Pro',
        connection: 'WiFi',
        screenDensity: 2
    },
    {
        name: 'MacBook Pro',
        width: 1200,
        height: 800,
        icon: Monitor,
        userAgent: 'MacBook Pro',
        connection: 'WiFi',
        screenDensity: 2
    }
]

// Network conditions
const NETWORK_CONDITIONS = {
    '3G': { speed: 1.6, latency: 300, reliability: 0.85 },
    '4G': { speed: 25, latency: 70, reliability: 0.95 },
    '5G': { speed: 100, latency: 10, reliability: 0.98 },
    'WiFi': { speed: 50, latency: 20, reliability: 0.99 }
}

// Mock performance data
const MOCK_PERFORMANCE: SiteComparison = {
    wordpress: {
        loadTime: 4200,
        firstContentfulPaint: 2100,
        largestContentfulPaint: 4800,
        cumulativeLayoutShift: 0.25,
        firstInputDelay: 180,
        timeToInteractive: 5200,
        bounceRate: 68,
        conversionRate: 2.3
    },
    modern: {
        loadTime: 850,
        firstContentfulPaint: 420,
        largestContentfulPaint: 980,
        cumulativeLayoutShift: 0.02,
        firstInputDelay: 15,
        timeToInteractive: 1100,
        bounceRate: 28,
        conversionRate: 8.7
    },
    improvement: {
        loadTime: 80,
        performance: 385,
        bounceRate: 59,
        conversion: 278
    }
}

/**
 * MobileMigrationSimulator Component
 * 
 * Interactive component that simulates WordPress vs Modern stack performance
 * across different devices and network conditions to demonstrate migration benefits.
 * 
 * Features:
 * - Real-time device simulation
 * - Network condition testing
 * - Performance comparison
 * - Visual load time demonstration
 * - Business impact metrics
 */
export default function MobileMigrationSimulator() {
    // State management
    const [selectedDevice, setSelectedDevice] = useState<DeviceConfig>(DEVICES[0])
    const [isSimulating, setIsSimulating] = useState(false)
    const [currentSite, setCurrentSite] = useState<'wordpress' | 'modern'>('wordpress')
    const [loadProgress, setLoadProgress] = useState(0)
    const [simulationComplete, setSimulationComplete] = useState(false)
    const [showMetrics, setShowMetrics] = useState(false)
    const [autoPlay, setAutoPlay] = useState(false)

    // Refs for animation control
    const simulatorRef = useRef<HTMLDivElement>(null)
    const progressInterval = useRef<NodeJS.Timeout | null>(null)

    /**
     * Simulates site loading with realistic timing
     */
    const simulateLoading = async (siteType: 'wordpress' | 'modern') => {
        setIsSimulating(true)
        setLoadProgress(0)
        setSimulationComplete(false)
        setCurrentSite(siteType)

        const performance = MOCK_PERFORMANCE[siteType]
        const networkCondition = NETWORK_CONDITIONS[selectedDevice.connection]
        
        // Adjust load time based on network conditions
        const adjustedLoadTime = performance.loadTime * (1 / networkCondition.speed * 10)
        const totalDuration = Math.min(adjustedLoadTime, 8000) // Cap at 8 seconds for demo

        return new Promise<void>((resolve) => {
            const startTime = Date.now()
            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime
                const progress = Math.min((elapsed / totalDuration) * 100, 100)
                
                setLoadProgress(progress)

                if (progress >= 100) {
                    clearInterval(interval)
                    setIsSimulating(false)
                    setSimulationComplete(true)
                    resolve()
                }
            }, 50)

            progressInterval.current = interval
        })
    }

    /**
     * Runs comparison simulation
     */
    const runComparison = async () => {
        setShowMetrics(false)
        
        // Simulate WordPress loading
        await simulateLoading('wordpress')
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simulate modern stack loading
        await simulateLoading('modern')
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setShowMetrics(true)
    }

    /**
     * Auto-play simulation
     */
    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(() => {
                runComparison()
            }, 12000)

            return () => clearInterval(interval)
        }
    }, [autoPlay, selectedDevice])

    /**
     * Cleanup intervals on unmount
     */
    useEffect(() => {
        return () => {
            if (progressInterval.current) {
                clearInterval(progressInterval.current)
            }
        }
    }, [])

    /**
     * Device Frame Component
     */
    const DeviceFrame = ({ children }: { children: React.ReactNode }) => {
        const isMobile = selectedDevice.width < 500
        const isTablet = selectedDevice.width >= 500 && selectedDevice.width < 1000

        return (
            <motion.div
                className={`relative bg-gray-900 rounded-3xl p-4 shadow-2xl ${
                    isMobile ? 'rounded-3xl' : isTablet ? 'rounded-2xl' : 'rounded-lg'
                }`}
                style={{
                    width: selectedDevice.width + 40,
                    height: selectedDevice.height + 80,
                    maxWidth: '100%',
                    maxHeight: '70vh'
                }}
                animate={{
                    width: selectedDevice.width + 40,
                    height: selectedDevice.height + 80
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                {/* Device Status Bar */}
                <div className="flex items-center justify-between text-white text-xs px-4 py-2 bg-black rounded-t-2xl">
                    <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date().toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: false
                        })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Signal className="w-3 h-3" />
                        <Wifi className="w-3 h-3" />
                        <span className="text-xs">{selectedDevice.connection}</span>
                        <Battery className="w-4 h-3" />
                    </div>
                </div>

                {/* Device Screen */}
                <div 
                    className="relative bg-white rounded-b-2xl overflow-hidden"
                    style={{
                        width: selectedDevice.width,
                        height: selectedDevice.height - 40
                    }}
                >
                    {children}
                </div>
            </motion.div>
        )
    }

    /**
     * Website Simulation Component
     */
    const WebsiteSimulation = () => {
        const isWordPress = currentSite === 'wordpress'
        
        return (
            <div className="h-full relative overflow-hidden">
                {/* Loading Progress Bar */}
                {isSimulating && (
                    <motion.div
                        className={`absolute top-0 left-0 h-1 z-50 ${
                            isWordPress ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${loadProgress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                )}

                {/* Browser Chrome */}
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center space-x-2">
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600 truncate">
                        {isWordPress ? 'your-wordpress-site.com' : 'your-modern-site.vercel.app'}
                    </div>
                    {isSimulating && (
                        <RefreshCw className="w-3 h-3 text-gray-500 animate-spin" />
                    )}
                </div>

                {/* Website Content */}
                <div className="h-full bg-white p-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {isSimulating ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center space-y-4"
                            >
                                {/* Loading Animation */}
                                <div className="relative">
                                    <div className={`w-16 h-16 border-4 rounded-full animate-spin ${
                                        isWordPress 
                                            ? 'border-red-200 border-t-red-500' 
                                            : 'border-green-200 border-t-green-500'
                                    }`}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {isWordPress ? (
                                            <AlertTriangle className="w-6 h-6 text-red-500" />
                                        ) : (
                                            <Zap className="w-6 h-6 text-green-500" />
                                        )}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className={`font-medium ${
                                        isWordPress ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                        {isWordPress ? 'Loading WordPress Site...' : 'Loading Modern Site...'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {loadProgress.toFixed(0)}% complete
                                    </p>
                                </div>

                                {/* Performance Indicator */}
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    isWordPress 
                                        ? 'bg-red-100 text-red-700' 
                                        : 'bg-green-100 text-green-700'
                                }`}>
                                    {isWordPress 
                                        ? `~${MOCK_PERFORMANCE.wordpress.loadTime}ms load time`
                                        : `~${MOCK_PERFORMANCE.modern.loadTime}ms load time`
                                    }
                                </div>
                            </motion.div>
                        ) : simulationComplete ? (
                            <motion.div
                                key="loaded"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="h-full"
                            >
                                {/* Simulated Website Content */}
                                <div className="space-y-4">
                                    {/* Header */}
                                    <div className={`h-12 rounded-lg flex items-center px-4 ${
                                        isWordPress 
                                            ? 'bg-blue-600 animate-pulse' 
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                                    }`}>
                                        <div className="text-white font-semibold text-sm">
                                            {isWordPress ? 'WordPress Site' : 'Modern Site'}
                                        </div>
                                    </div>

                                    {/* Hero Section */}
                                    <div className={`p-4 rounded-lg ${
                                        isWordPress 
                                            ? 'bg-gray-200 animate-pulse' 
                                            : 'bg-gradient-to-br from-blue-50 to-indigo-50'
                                    }`}>
                                        <div className={`h-4 rounded mb-2 ${
                                            isWordPress ? 'bg-gray-300' : 'bg-gray-200'
                                        }`}></div>
                                        <div className={`h-3 rounded w-3/4 ${
                                            isWordPress ? 'bg-gray-300' : 'bg-gray-200'
                                        }`}></div>
                                    </div>

                                    {/* Content Cards */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {[1, 2, 3, 4].map((index) => (
                                            <div
                                                key={index}
                                                className={`p-3 rounded-lg border ${
                                                    isWordPress 
                                                        ? 'bg-gray-100 border-gray-200 animate-pulse' 
                                                        : 'bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow'
                                                }`}
                                            >
                                                <div className={`h-16 rounded mb-2 ${
                                                    isWordPress ? 'bg-gray-300' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                                                }`}></div>
                                                <div className={`h-2 rounded mb-1 ${
                                                    isWordPress ? 'bg-gray-300' : 'bg-gray-200'
                                                }`}></div>
                                                <div className={`h-2 rounded w-2/3 ${
                                                    isWordPress ? 'bg-gray-300' : 'bg-gray-200'
                                                }`}></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Performance Badge */}
                                <div className="absolute bottom-4 right-4">
                                    <div className={`px-3 py-2 rounded-full flex items-center space-x-2 ${
                                        isWordPress 
                                            ? 'bg-red-100 text-red-700 border border-red-200' 
                                            : 'bg-green-100 text-green-700 border border-green-200'
                                    }`}>
                                        {isWordPress ? (
                                            <AlertTriangle className="w-4 h-4" />
                                        ) : (
                                            <CheckCircle className="w-4 h-4" />
                                        )}
                                        <span className="text-xs font-medium">
                                            {isWordPress ? 'Slow & Vulnerable' : 'Fast & Secure'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex items-center justify-center text-gray-500"
                            >
                                <div className="text-center">
                                    <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <p>Click &quot;Run Simulation&quot; to see the difference</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        )
    }

    /**
     * Performance Metrics Component
     */
    const PerformanceMetrics = () => {
        if (!showMetrics) return null

        const metrics = [
            {
                label: 'Load Time',
                wordpress: `${MOCK_PERFORMANCE.wordpress.loadTime}ms`,
                modern: `${MOCK_PERFORMANCE.modern.loadTime}ms`,
                improvement: `${MOCK_PERFORMANCE.improvement.loadTime}% faster`,
                icon: Timer,
                color: 'blue'
            },
            {
                label: 'Performance Score',
                wordpress: '23/100',
                modern: '98/100',
                improvement: `+${MOCK_PERFORMANCE.improvement.performance}%`,
                icon: Gauge,
                color: 'green'
            },
            {
                label: 'Bounce Rate',
                wordpress: `${MOCK_PERFORMANCE.wordpress.bounceRate}%`,
                modern: `${MOCK_PERFORMANCE.modern.bounceRate}%`,
                improvement: `-${MOCK_PERFORMANCE.improvement.bounceRate}%`,
                icon: TrendingUp,
                color: 'purple'
            },
            {
                label: 'Conversion Rate',
                wordpress: `${MOCK_PERFORMANCE.wordpress.conversionRate}%`,
                modern: `${MOCK_PERFORMANCE.modern.conversionRate}%`,
                improvement: `+${MOCK_PERFORMANCE.improvement.conversion}%`,
                icon: Target,
                color: 'orange'
            }
        ]

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg"
            >
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Gauge className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Performance Comparison
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Real impact on {selectedDevice.name} with {selectedDevice.connection} connection
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <metric.icon className={`w-4 h-4 text-${metric.color}-600`} />
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {metric.label}
                                    </span>
                                </div>
                                <div className={`px-3 py-1 bg-${metric.color}-100 dark:bg-${metric.color}-900/20 text-${metric.color}-700 dark:text-${metric.color}-300 rounded-full text-sm font-medium`}>
                                    {metric.improvement}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* WordPress */}
                                <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                                    <div className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">
                                        WordPress
                                    </div>
                                    <div className="text-lg font-bold text-red-700 dark:text-red-300">
                                        {metric.wordpress}
                                    </div>
                                </div>

                                {/* Modern */}
                                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                                    <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
                                        Modern Stack
                                    </div>
                                    <div className="text-lg font-bold text-green-700 dark:text-green-300">
                                        {metric.modern}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                    <Smartphone className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                >
                    📱 Mobile Performance Simulator
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                >
                    See exactly how your WordPress site performs vs a modern stack across different devices and network conditions.
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> The difference is shocking.</span>
                </motion.p>
            </div>

            {/* Device Selection */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Choose Device & Network
                    </h3>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setAutoPlay(!autoPlay)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                autoPlay
                                    ? 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span>{autoPlay ? 'Auto Playing' : 'Auto Play'}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {DEVICES.map((device) => (
                        <motion.button
                            key={device.name}
                            onClick={() => setSelectedDevice(device)}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                                selectedDevice.name === device.name
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center space-x-3 mb-3">
                                <device.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {device.name}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {device.width} × {device.height}
                                    </div>
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                                device.connection === '5G' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                                device.connection === '4G' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                                device.connection === 'WiFi' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' :
                                'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
                            }`}>
                                {device.connection}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Simulation Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Device Simulator */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center space-y-6"
                >
                    <DeviceFrame>
                        <WebsiteSimulation />
                    </DeviceFrame>

                    {/* Controls */}
                    <div className="flex flex-col items-center space-y-4">
                        <motion.button
                            onClick={runComparison}
                            disabled={isSimulating}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center space-x-2"
                            whileHover={{ scale: isSimulating ? 1 : 1.02 }}
                            whileTap={{ scale: isSimulating ? 1 : 0.98 }}
                        >
                            {isSimulating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    <span>Running Simulation...</span>
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                    <span>Run Performance Comparison</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>

                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Testing on {selectedDevice.name} with {selectedDevice.connection} connection
                            </p>
                            {isSimulating && (
                                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                                    Simulating {currentSite === 'wordpress' ? 'WordPress' : 'Modern Stack'} loading...
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Performance Metrics */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <PerformanceMetrics />
                </motion.div>
            </div>

            {/* Business Impact Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl border border-green-200 dark:border-green-800 p-8"
            >
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        💰 Real Business Impact
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        See how performance improvements translate to actual business results
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: Users,
                            label: 'User Retention',
                            before: '32%',
                            after: '72%',
                            improvement: '+125%',
                            description: 'Users stay longer on faster sites',
                            color: 'blue'
                        },
                        {
                            icon: ShoppingCart,
                            label: 'Sales Conversion',
                            before: '2.3%',
                            after: '8.7%',
                            improvement: '+278%',
                            description: 'Speed directly impacts purchases',
                            color: 'green'
                        },
                        {
                            icon: Globe,
                            label: 'SEO Ranking',
                            before: 'Page 3',
                            after: 'Page 1',
                            improvement: '+200%',
                            description: 'Google loves fast sites',
                            color: 'purple'
                        },
                        {
                            icon: Target,
                            label: 'Ad ROI',
                            before: '1.2x',
                            after: '4.8x',
                            improvement: '+300%',
                            description: 'Better landing page performance',
                            color: 'orange'
                        }
                    ].map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center"
                        >
                            <div className={`w-12 h-12 bg-${metric.color}-100 dark:bg-${metric.color}-900/20 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                                <metric.icon className={`w-6 h-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                {metric.label}
                            </h4>
                            <div className="space-y-2 mb-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-red-600 dark:text-red-400">Before:</span>
                                    <span className="font-medium">{metric.before}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-600 dark:text-green-400">After:</span>
                                    <span className="font-medium">{metric.after}</span>
                                </div>
                            </div>
                            <div className={`px-3 py-1 bg-${metric.color}-100 dark:bg-${metric.color}-900/20 text-${metric.color}-700 dark:text-${metric.color}-300 rounded-full text-sm font-medium mb-2`}>
                                {metric.improvement}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {metric.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Technical Deep Dive */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
            >
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🔧 Technical Comparison
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Why modern stack outperforms WordPress
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* WordPress Issues */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-red-700 dark:text-red-400 flex items-center space-x-2">
                            <AlertTriangle className="w-5 h-5" />
                            <span>WordPress Problems</span>
                        </h4>
                        <div className="space-y-4">
                            {[
                                {
                                    issue: 'PHP Server Processing',
                                    impact: 'Every page request requires server computation',
                                    metric: '+2-4s load time'
                                },
                                {
                                    issue: 'Database Queries',
                                    impact: 'Multiple database calls for each page load',
                                    metric: '+500-1500ms delay'
                                },
                                {
                                    issue: 'Plugin Overhead',
                                    impact: '20+ plugins adding unnecessary JavaScript',
                                    metric: '+1-3MB bundle size'
                                },
                                {
                                    issue: 'Render Blocking',
                                    impact: 'CSS/JS files block initial page render',
                                    metric: '+1-2s to first paint'
                                },
                                {
                                    issue: 'Unoptimized Images',
                                    impact: 'Large images without WebP or lazy loading',
                                    metric: '+2-5s load time'
                                }
                            ].map((problem, index) => (
                                <motion.div
                                    key={problem.issue}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-medium text-red-900 dark:text-red-100">
                                            {problem.issue}
                                        </h5>
                                        <span className="text-xs bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                                            {problem.metric}
                                        </span>
                                    </div>
                                    <p className="text-sm text-red-700 dark:text-red-300">
                                        {problem.impact}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Modern Stack Solutions */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-green-700 dark:text-green-400 flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>Modern Stack Solutions</span>
                        </h4>
                        <div className="space-y-4">
                            {[
                                {
                                    solution: 'Static Site Generation',
                                    benefit: 'Pre-built pages served instantly from CDN',
                                    metric: '50-200ms response'
                                },
                                {
                                    solution: 'Edge Computing',
                                    benefit: 'Content served from nearest global location',
                                    metric: '10-50ms latency'
                                },
                                {
                                    solution: 'Optimized JavaScript',
                                    benefit: 'Tree-shaken, code-split modern bundles',
                                    metric: '90% smaller bundles'
                                },
                                {
                                    solution: 'Smart Caching',
                                    benefit: 'Intelligent caching with instant invalidation',
                                    metric: '99.9% cache hit rate'
                                },
                                {
                                    solution: 'Image Optimization',
                                    benefit: 'WebP, AVIF, responsive images with lazy loading',
                                    metric: '80% size reduction'
                                }
                            ].map((solution, index) => (
                                <motion.div
                                    key={solution.solution}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-medium text-green-900 dark:text-green-100">
                                            {solution.solution}
                                        </h5>
                                        <span className="text-xs bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                                            {solution.metric}
                                        </span>
                                    </div>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        {solution.benefit}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Migration CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-8 text-center"
            >
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🚀 Ready to Escape WordPress Hell?
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Don&apos;t let your WordPress site continue to hurt your business. 
                        Migrate to a modern stack and see immediate improvements in speed, security, and conversions.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            {
                                icon: Zap,
                                title: 'Instant Performance',
                                description: '10x faster load times from day one'
                            },
                            {
                                icon: CheckCircle,
                                title: 'Zero Maintenance',
                                description: 'No more updates, backups, or security patches'
                            },
                            {
                                icon: Layers,
                                title: 'Complete Control',
                                description: 'Own your code, deploy anywhere, no vendor lock-in'
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 + index * 0.1 }}
                                className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800"
                            >
                                <benefit.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {benefit.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors text-lg"
                    >
                        🎯 Start Free Migration Now
                    </motion.button>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            ⚡ <span className="font-semibold">Free migration</span> • 
                            No credit card required • 
                            <span className="font-semibold">10x performance guarantee</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

// Additional utility functions and constants

/**
 * Core Web Vitals calculation based on device and network
 */
export const calculateCoreWebVitals = (
    deviceType: string, 
    networkCondition: string,
    siteType: 'wordpress' | 'modern'
) => {
    const baseMetrics = MOCK_PERFORMANCE[siteType]
    const networkMultiplier = NETWORK_CONDITIONS[networkCondition as keyof typeof NETWORK_CONDITIONS]
    
    return {
        lcp: baseMetrics.largestContentfulPaint * (1 / networkMultiplier.speed * 10),
        fid: baseMetrics.firstInputDelay,
        cls: baseMetrics.cumulativeLayoutShift,
        fcp: baseMetrics.firstContentfulPaint * (1 / networkMultiplier.speed * 10),
        tti: baseMetrics.timeToInteractive * (1 / networkMultiplier.speed * 10)
    }
}

/**
 * Business impact calculator
 */
export const calculateBusinessImpact = (currentMetrics: PerformanceMetrics) => {
    // Industry averages based on real studies
    const conversionImpactPerSecond = 0.07 // 7% conversion drop per second of load time
    const bounceRateImpactPerSecond = 0.06 // 6% bounce rate increase per second
    const revenueImpactPerSecond = 0.04 // 4% revenue impact per second
    
    const loadTimeImprovement = (MOCK_PERFORMANCE.wordpress.loadTime - MOCK_PERFORMANCE.modern.loadTime) / 1000
    
    return {
        conversionImprovement: loadTimeImprovement * conversionImpactPerSecond * 100,
        bounceRateReduction: loadTimeImprovement * bounceRateImpactPerSecond * 100,
        revenueIncrease: loadTimeImprovement * revenueImpactPerSecond * 100,
        seoRankingImprovement: Math.min(loadTimeImprovement * 15, 200) // Max 200% improvement
    }
}

/**
 * Device-specific performance adjustments
 */
export const getDevicePerformanceMultiplier = (device: DeviceConfig) => {
    // Lower-end devices perform worse with heavy JavaScript/WordPress
    const performanceMap = {
        'iPhone 14': { wordpress: 1.0, modern: 1.0 },
        'Samsung Galaxy S23': { wordpress: 1.1, modern: 0.95 },
        'iPad Pro': { wordpress: 0.8, modern: 0.9 },
        'MacBook Pro': { wordpress: 0.7, modern: 0.8 }
    }
    
    return performanceMap[device.name as keyof typeof performanceMap] || { wordpress: 1.0, modern: 1.0 }
}