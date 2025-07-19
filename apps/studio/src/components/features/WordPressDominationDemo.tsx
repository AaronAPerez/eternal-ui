'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Zap,
    Shield,
    DollarSign,
    Clock,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Sword,
    Target,
    Palette,
    Users,
    ShoppingCart,
    Upload,
    Play,
    Pause,
    Crown,
    Flame,
    Trophy,
    Rocket,
    Star,
    Heart,
    ThumbsUp,
    MessageSquare,
    Search,
    Smartphone,
    Monitor,
    Tablet
} from 'lucide-react'

// WordPress Pain Points vs Eternal UI Solutions
interface PainPoint {
    id: string
    category: 'performance' | 'security' | 'cost' | 'maintenance' | 'design' | 'seo'
    problem: string
    wpSolution: string
    wpRating: number
    eternalSolution: string
    eternalRating: number
    improvement: string
    icon: React.ComponentType<unknown>
    color: string
}

interface UserPersona {
    id: string
    name: string
    type: 'blogger' | 'ecommerce' | 'business' | 'agency'
    avatar: string
    currentPain: string[]
    eternalBenefits: string[]
    roi: string
    timesSaved: string
    icon: React.ComponentType<unknown>
    color: string
}

interface FeatureComparison {
    category: string
    wordpress: {
        solution: string
        problems: string[]
        cost: string
        complexity: number
    }
    eternal: {
        solution: string
        benefits: string[]
        cost: string
        complexity: number
    }
    improvement: string
}

// WordPress Pain Points Data
const PAIN_POINTS: PainPoint[] = [
    {
        id: 'performance',
        category: 'performance',
        problem: 'Slow Loading Times',
        wpSolution: 'Caching plugins, CDN setup, optimization plugins',
        wpRating: 35,
        eternalSolution: 'Static sites with edge computing - 10x faster by default',
        eternalRating: 98,
        improvement: '280% faster',
        icon: Zap,
        color: 'yellow'
    },
    {
        id: 'security',
        category: 'security',
        problem: 'Security Vulnerabilities',
        wpSolution: 'Security plugins, constant updates, monitoring',
        wpRating: 42,
        eternalSolution: 'Zero attack surface - unhackable static architecture',
        eternalRating: 99,
        improvement: '100% secure',
        icon: Shield,
        color: 'blue'
    },
    {
        id: 'cost',
        category: 'cost',
        problem: 'High Total Cost',
        wpSolution: 'Hosting fees, plugin licenses, maintenance costs',
        wpRating: 25,
        eternalSolution: 'Free hosting forever, everything built-in',
        eternalRating: 95,
        improvement: '90% savings',
        icon: DollarSign,
        color: 'green'
    },
    {
        id: 'maintenance',
        category: 'maintenance',
        problem: 'Constant Maintenance',
        wpSolution: 'Manual updates, backups, plugin management',
        wpRating: 30,
        eternalSolution: 'Zero maintenance required - fully automated',
        eternalRating: 100,
        improvement: '100% automated',
        icon: Clock,
        color: 'purple'
    },
    {
        id: 'design',
        category: 'design',
        problem: 'Limited Design Freedom',
        wpSolution: 'Theme limitations, child themes, custom CSS',
        wpRating: 45,
        eternalSolution: 'Unlimited visual customization with AI assistance',
        eternalRating: 96,
        improvement: 'Unlimited freedom',
        icon: Palette,
        color: 'pink'
    },
    {
        id: 'seo',
        category: 'seo',
        problem: 'SEO Complexity',
        wpSolution: 'Yoast, RankMath plugins, manual optimization',
        wpRating: 55,
        eternalSolution: 'Perfect SEO built-in automatically with AI',
        eternalRating: 97,
        improvement: '200% better SEO',
        icon: Search,
        color: 'indigo'
    }
]

// User Personas Data
const USER_PERSONAS: UserPersona[] = [
    {
        id: 'blogger',
        name: 'Content Creator',
        type: 'blogger',
        avatar: '✍️',
        currentPain: ['Slow loading kills SEO', 'Plugin conflicts break site', 'Expensive hosting fees'],
        eternalBenefits: ['Lightning-fast 0.5s loads', 'Built-in SEO perfection', 'Free hosting forever'],
        roi: '$2,400/year saved',
        timesSaved: '15 hours/month',
        icon: MessageSquare,
        color: 'blue'
    },
    {
        id: 'ecommerce',
        name: 'Online Store Owner',
        type: 'ecommerce',
        avatar: '🛒',
        currentPain: ['WooCommerce complexity', 'Slow checkout = lost sales', 'Security nightmares'],
        eternalBenefits: ['Lightning checkout', '50% fewer abandoned carts', 'Banking-grade security'],
        roi: '$15,000/year revenue increase',
        timesSaved: '25 hours/month',
        icon: ShoppingCart,
        color: 'green'
    },
    {
        id: 'business',
        name: 'Business Owner',
        type: 'business',
        avatar: '🏢',
        currentPain: ['Maintenance overhead', 'Security liability', 'Slow support response'],
        eternalBenefits: ['Zero maintenance', 'Enterprise security', '24/7 expert support'],
        roi: '$8,500/year saved',
        timesSaved: '20 hours/month',
        icon: Users,
        color: 'purple'
    },
    {
        id: 'agency',
        name: 'Web Agency',
        type: 'agency',
        avatar: '🎨',
        currentPain: ['Client site management hell', 'Security liability', 'Recurring issues'],
        eternalBenefits: ['White-label platform', 'Zero liability', 'Recurring revenue tools'],
        roi: '$50,000/year profit increase',
        timesSaved: '100 hours/month',
        icon: Crown,
        color: 'orange'
    }
]

// Feature Comparisons Data
const FEATURE_COMPARISONS: FeatureComparison[] = [
    {
        category: 'Content Management',
        wordpress: {
            solution: 'Clunky editor, limited formatting, media library mess',
            problems: ['Gutenberg blocks complexity', 'Media organization nightmare', 'No version control'],
            cost: '$200+/year in plugins',
            complexity: 8
        },
        eternal: {
            solution: 'Visual content editor with AI assistance',
            benefits: ['Edit directly on page', 'Smart media management', 'Git-based versioning'],
            cost: 'Built-in free',
            complexity: 2
        },
        improvement: '75% easier to use'
    },
    {
        category: 'E-commerce',
        wordpress: {
            solution: 'WooCommerce plugin with extensions',
            problems: ['Complex setup', 'Slow performance', 'Limited customization'],
            cost: '$500+/year in extensions',
            complexity: 9
        },
        eternal: {
            solution: 'Native e-commerce with AI optimization',
            benefits: ['One-click store setup', 'Lightning checkout', 'Smart recommendations'],
            cost: 'Built-in free',
            complexity: 3
        },
        improvement: '10x easier setup'
    },
    {
        category: 'SEO & Analytics',
        wordpress: {
            solution: 'Yoast/RankMath + Google Analytics setup',
            problems: ['Manual optimization', 'Plugin conflicts', 'Complex setup'],
            cost: '$300+/year',
            complexity: 7
        },
        eternal: {
            solution: 'AI-powered SEO with built-in analytics',
            benefits: ['Automatic optimization', 'Real-time insights', 'Conversion tracking'],
            cost: 'Built-in free',
            complexity: 1
        },
        improvement: '200% better SEO performance'
    },
    {
        category: 'Security & Backups',
        wordpress: {
            solution: 'Security plugins + backup services',
            problems: ['Vulnerabilities remain', 'Backup failures', 'False security'],
            cost: '$400+/year',
            complexity: 8
        },
        eternal: {
            solution: 'Unhackable static architecture',
            benefits: ['No attack surface', 'Git-based backups', 'Zero vulnerabilities'],
            cost: 'Built-in free',
            complexity: 0
        },
        improvement: '100% more secure'
    }
]

/**
 * WordPressDominationDemo Component
 * 
 * Comprehensive demonstration of how Eternal UI dominates WordPress
 * across every pain point and user persona. Shows the complete
 * superior alternative to WordPress with interactive comparisons.
 */
export default function WordPressDominationDemo() {
    // State management
    const [activeSection, setActiveSection] = useState<'overview' | 'painpoints' | 'personas' | 'features' | 'migration'>('overview')
    const [selectedPainPoint, setSelectedPainPoint] = useState<PainPoint>(PAIN_POINTS[0])
    const [selectedPersona, setSelectedPersona] = useState<UserPersona>(USER_PERSONAS[0])
    const [animationProgress, setAnimationProgress] = useState(0)
    const [autoPlay, setAutoPlay] = useState(false)
    const [showComparison, setShowComparison] = useState(false)

    // Animation control
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    /**
     * Auto-play functionality for presentations
     */
    useEffect(() => {
        if (autoPlay) {
            intervalRef.current = setInterval(() => {
                setAnimationProgress(prev => (prev + 1) % 100)
                
                // Cycle through pain points every 8 seconds
                if (animationProgress % 20 === 0) {
                    const currentIndex = PAIN_POINTS.findIndex(p => p.id === selectedPainPoint.id)
                    const nextIndex = (currentIndex + 1) % PAIN_POINTS.length
                    setSelectedPainPoint(PAIN_POINTS[nextIndex])
                }
            }, 200)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [autoPlay, animationProgress, selectedPainPoint])

    /**
     * Overview Section Component
     */
    const OverviewSection = () => (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                    <Sword className="w-10 h-10 text-white" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                >
                    ⚔️ Complete WordPress Domination
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-8"
                >
                    Every WordPress pain point solved. Every feature reimagined better. 
                    <span className="text-red-600 dark:text-red-400 font-semibold"> This is how we completely destroy WordPress and capture their 680 million websites.</span>
                </motion.p>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                    {[
                        { icon: Zap, value: '10x', label: 'Faster Loading', color: 'yellow' },
                        { icon: Shield, value: '100%', label: 'More Secure', color: 'blue' },
                        { icon: DollarSign, value: '90%', label: 'Cost Savings', color: 'green' },
                        { icon: Clock, value: '0', label: 'Maintenance', color: 'purple' }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className={`p-6 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-xl border border-${stat.color}-200 dark:border-${stat.color}-800 text-center`}
                        >
                            <stat.icon className={`w-8 h-8 text-${stat.color}-600 dark:text-${stat.color}-400 mx-auto mb-3`} />
                            <div className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-1`}>
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* WordPress vs Eternal UI Battle */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🥊 The Ultimate WordPress Destroyer
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Side-by-side comparison that shows why WordPress users will switch
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* WordPress Problems */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
                                    WordPress Problems
                                </h3>
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    Why 680M sites suffer daily
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { issue: 'Security Vulnerabilities', impact: '41% of sites get hacked' },
                                { issue: 'Slow Performance', impact: '3.2s average load time' },
                                { issue: 'Plugin Hell', impact: '58,000+ plugins = conflicts' },
                                { issue: 'Expensive Hosting', impact: '$50-200/month hosting fees' },
                                { issue: 'Constant Maintenance', impact: '15+ hours/month updates' },
                                { issue: 'Limited Design', impact: 'Template restrictions' }
                            ].map((problem, index) => (
                                <motion.div
                                    key={problem.issue}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4"
                                >
                                    <div className="font-medium text-red-900 dark:text-red-100 mb-1">
                                        ❌ {problem.issue}
                                    </div>
                                    <div className="text-sm text-red-700 dark:text-red-300">
                                        {problem.impact}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Eternal UI Solutions */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-green-700 dark:text-green-400">
                                    Eternal UI Solutions
                                </h3>
                                <p className="text-sm text-green-600 dark:text-green-400">
                                    Superior in every way
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { solution: 'Unhackable Architecture', benefit: '0 vulnerabilities possible' },
                                { solution: 'Lightning Performance', benefit: '0.8s average load time' },
                                { solution: 'Everything Built-In', benefit: 'No plugins needed' },
                                { solution: 'Free Forever Hosting', benefit: '$0/month hosting costs' },
                                { solution: 'Zero Maintenance', benefit: '0 hours/month required' },
                                { solution: 'Unlimited Design', benefit: 'Complete creative freedom' }
                            ].map((solution, index) => (
                                <motion.div
                                    key={solution.solution}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4"
                                >
                                    <div className="font-medium text-green-900 dark:text-green-100 mb-1">
                                        ✅ {solution.solution}
                                    </div>
                                    <div className="text-sm text-green-700 dark:text-green-300">
                                        {solution.benefit}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Market Domination Strategy */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-2xl border border-orange-200 dark:border-orange-800 p-8"
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🎯 Market Domination Plan
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        How we capture WordPress's 680 million websites
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            phase: 'Phase 1',
                            title: 'WordPress Migration Tool',
                            target: '1M migrations in Year 1',
                            strategy: 'Free migration + 3 months free',
                            timeline: 'Q1 2024',
                            icon: Upload,
                            color: 'blue'
                        },
                        {
                            phase: 'Phase 2',
                            title: 'Performance Campaign',
                            target: '10M WordPress users reached',
                            strategy: '"Escape WordPress Hell" messaging',
                            timeline: 'Q2 2024',
                            icon: Rocket,
                            color: 'green'
                        },
                        {
                            phase: 'Phase 3',
                            title: 'Total Domination',
                            target: '25% market share captured',
                            strategy: 'Feature superiority + cost advantage',
                            timeline: 'Q3-Q4 2024',
                            icon: Crown,
                            color: 'purple'
                        }
                    ].map((phase, index) => (
                        <motion.div
                            key={phase.phase}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center"
                        >
                            <div className={`w-12 h-12 bg-${phase.color}-100 dark:bg-${phase.color}-900/20 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                                <phase.icon className={`w-6 h-6 text-${phase.color}-600 dark:text-${phase.color}-400`} />
                            </div>
                            <div className={`text-sm font-medium text-${phase.color}-600 dark:text-${phase.color}-400 mb-2`}>
                                {phase.phase}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                                {phase.title}
                            </h3>
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <div>{phase.target}</div>
                                <div>{phase.strategy}</div>
                                <div className="font-medium">{phase.timeline}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )

    /**
     * Pain Points Section Component
     */
    const PainPointsSection = () => (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    💀 WordPress Pain Points → Our Superior Solutions
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Every WordPress weakness becomes our strength. Click any pain point to see our crushing advantage.
                </p>
            </div>

            {/* Pain Point Selector */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {PAIN_POINTS.map((painPoint) => (
                    <motion.button
                        key={painPoint.id}
                        onClick={() => setSelectedPainPoint(painPoint)}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                            selectedPainPoint.id === painPoint.id
                                ? `border-${painPoint.color}-500 bg-${painPoint.color}-50 dark:bg-${painPoint.color}-900/20`
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <painPoint.icon className={`w-8 h-8 mx-auto mb-2 ${
                            selectedPainPoint.id === painPoint.id
                                ? `text-${painPoint.color}-600 dark:text-${painPoint.color}-400`
                                : 'text-gray-600 dark:text-gray-400'
                        }`} />
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {painPoint.problem}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Selected Pain Point Comparison */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedPainPoint.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
                >
                    <div className="flex items-center space-x-4 mb-8">
                        <div className={`w-16 h-16 bg-${selectedPainPoint.color}-100 dark:bg-${selectedPainPoint.color}-900/20 rounded-xl flex items-center justify-center`}>
                            <selectedPainPoint.icon className={`w-8 h-8 text-${selectedPainPoint.color}-600 dark:text-${selectedPainPoint.color}-400`} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {selectedPainPoint.problem}
                            </h3>
                            <p className={`text-${selectedPainPoint.color}-600 dark:text-${selectedPainPoint.color}-400 font-medium`}>
                                {selectedPainPoint.improvement} improvement with Eternal UI
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* WordPress Solution */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                </div>
                                <h4 className="text-lg font-bold text-red-700 dark:text-red-400">
                                    WordPress "Solution"
                                </h4>
                            </div>

                            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6">
                                <p className="text-red-700 dark:text-red-300 mb-4">
                                    {selectedPainPoint.wpSolution}
                                </p>
                                
                                {/* WordPress Rating */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-red-800 dark:text-red-200">
                                            Effectiveness
                                        </span>
                                        <span className="text-sm text-red-600 dark:text-red-400">
                                            {selectedPainPoint.wpRating}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-red-200 dark:bg-red-800 rounded-full h-3">
                                        <div
                                            className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                                            style={{ width: `${selectedPainPoint.wpRating}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Eternal UI Solution */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                </div>
                                <h4 className="text-lg font-bold text-green-700 dark:text-green-400">
                                    Eternal UI Superior Solution
                                </h4>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-6">
                                <p className="text-green-700 dark:text-green-300 mb-4">
                                    {selectedPainPoint.eternalSolution}
                                </p>
                                
                                {/* Eternal UI Rating */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                            Effectiveness
                                        </span>
                                        <span className="text-sm text-green-600 dark:text-green-400">
                                            {selectedPainPoint.eternalRating}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-3">
                                        <motion.div
                                            className="bg-green-500 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${selectedPainPoint.eternalRating}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Improvement Highlight */}
                    <div className="mt-8 text-center">
                        <div className={`inline-flex items-center space-x-2 px-6 py-3 bg-${selectedPainPoint.color}-100 dark:bg-${selectedPainPoint.color}-900/20 text-${selectedPainPoint.color}-700 dark:text-${selectedPainPoint.color}-300 rounded-full`}>
                            <Trophy className="w-5 h-5" />
                            <span className="font-semibold">
                                Result: {selectedPainPoint.improvement} with Eternal UI
                            </span>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )

    /**
     * User Personas Section Component
     */
    const PersonasSection = () => (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    👥 WordPress User Liberation Stories
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Real WordPress users, real pain, real solutions. See how we solve every user type's biggest problems.
                </p>
            </div>

            {/* Persona Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {USER_PERSONAS.map((persona) => (
                    <motion.button
                        key={persona.id}
                        onClick={() => setSelectedPersona(persona)}
                        className={`p-6 rounded-xl border-2 transition-all text-center ${
                            selectedPersona.id === persona.id
                                ? `border-${persona.color}-500 bg-${persona.color}-50 dark:bg-${persona.color}-900/20`
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="text-4xl mb-3">{persona.avatar}</div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                            {persona.name}
                        </h3>
                        <div className={`px-3 py-1 text-xs rounded-full ${
                            selectedPersona.id === persona.id
                                ? `bg-${persona.color}-200 dark:bg-${persona.color}-800 text-${persona.color}-800 dark:text-${persona.color}-200`
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                            {persona.type}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Selected Persona Details */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedPersona.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
                >
                    {/* Persona Header */}
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="text-6xl">{selectedPersona.avatar}</div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {selectedPersona.name}
                            </h3>
                            <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-${selectedPersona.color}-100 dark:bg-${selectedPersona.color}-900/20 text-${selectedPersona.color}-700 dark:text-${selectedPersona.color}-300 rounded-full`}>
                                <selectedPersona.icon className="w-4 h-4" />
                                <span className="font-medium capitalize">{selectedPersona.type}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Current Pain Points */}
                        <div className="space-y-6">
                            <h4 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center space-x-2">
                                <AlertTriangle className="w-5 h-5" />
                                <span>WordPress Pain Points</span>
                            </h4>
                            <div className="space-y-3">
                                {selectedPersona.currentPain.map((pain, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start space-x-3"
                                    >
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-red-700 dark:text-red-300">
                                            {pain}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Eternal UI Benefits */}
                        <div className="space-y-6">
                            <h4 className="text-lg font-bold text-green-700 dark:text-green-400 flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5" />
                                <span>Eternal UI Benefits</span>
                            </h4>
                            <div className="space-y-3">
                                {selectedPersona.eternalBenefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start space-x-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-green-700 dark:text-green-300">
                                            {benefit}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ROI & Time Savings */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800">
                            <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                                {selectedPersona.roi}
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-300">
                                Annual ROI with Eternal UI
                            </div>
                        </div>
                        
                        <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
                            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                {selectedPersona.timesSaved}
                            </div>
                            <div className="text-sm text-blue-700 dark:text-blue-300">
                                Time saved every month
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )

    /**
     * Features Comparison Section Component
     */
    const FeaturesSection = () => (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    ⚔️ Feature-by-Feature Domination
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Every WordPress feature reimagined better. We don't just match - we completely destroy their offerings.
                </p>
            </div>

            {/* Feature Comparisons */}
            <div className="space-y-8">
                {FEATURE_COMPARISONS.map((comparison, index) => (
                    <motion.div
                        key={comparison.category}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {comparison.category}
                            </h3>
                            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full">
                                <Flame className="w-4 h-4" />
                                <span className="font-medium">{comparison.improvement}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* WordPress Approach */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                    </div>
                                    <h4 className="text-lg font-bold text-red-700 dark:text-red-400">
                                        WordPress Approach
                                    </h4>
                                </div>

                                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6">
                                    <p className="font-medium text-red-800 dark:text-red-200 mb-4">
                                        {comparison.wordpress.solution}
                                    </p>
                                    
                                    <div className="space-y-3 mb-4">
                                        <h5 className="text-sm font-medium text-red-700 dark:text-red-300">Problems:</h5>
                                        {comparison.wordpress.problems.map((problem, idx) => (
                                            <div key={idx} className="flex items-start space-x-2">
                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                                <span className="text-sm text-red-600 dark:text-red-400">{problem}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-red-200 dark:border-red-800">
                                        <span className="text-sm font-medium text-red-700 dark:text-red-300">Cost:</span>
                                        <span className="text-sm text-red-600 dark:text-red-400">{comparison.wordpress.cost}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm font-medium text-red-700 dark:text-red-300">Complexity:</span>
                                        <div className="flex space-x-1">
                                            {[...Array(10)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-2 h-2 rounded-full ${
                                                        i < comparison.wordpress.complexity
                                                            ? 'bg-red-500'
                                                            : 'bg-red-200 dark:bg-red-800'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Eternal UI Approach */}
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h4 className="text-lg font-bold text-green-700 dark:text-green-400">
                                        Eternal UI Approach
                                    </h4>
                                </div>

                                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-6">
                                    <p className="font-medium text-green-800 dark:text-green-200 mb-4">
                                        {comparison.eternal.solution}
                                    </p>
                                    
                                    <div className="space-y-3 mb-4">
                                        <h5 className="text-sm font-medium text-green-700 dark:text-green-300">Benefits:</h5>
                                        {comparison.eternal.benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-start space-x-2">
                                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-green-600 dark:text-green-400">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-green-200 dark:border-green-800">
                                        <span className="text-sm font-medium text-green-700 dark:text-green-300">Cost:</span>
                                        <span className="text-sm text-green-600 dark:text-green-400">{comparison.eternal.cost}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm font-medium text-green-700 dark:text-green-300">Complexity:</span>
                                        <div className="flex space-x-1">
                                            {[...Array(10)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-2 h-2 rounded-full ${
                                                        i < comparison.eternal.complexity
                                                            ? 'bg-green-500'
                                                            : 'bg-green-200 dark:bg-green-800'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )

    /**
     * Migration Section Component
     */
    const MigrationSection = () => (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    🚀 WordPress Migration Domination
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Make switching from WordPress so easy and beneficial that users can't resist.
                </p>
            </div>

            {/* Migration Strategy */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                    {
                        step: 'Step 1',
                        title: 'One-Click Import',
                        description: 'Automatically import WordPress content, themes, and settings',
                        features: [
                            'Complete content migration',
                            'Theme conversion to components',
                            'SEO data preservation',
                            'Media optimization'
                        ],
                        icon: Upload,
                        color: 'blue'
                    },
                    {
                        step: 'Step 2',
                        title: 'Instant Optimization',
                        description: 'Automatically optimize everything for 10x better performance',
                        features: [
                            '10x faster loading',
                            'Perfect SEO scores',
                            'Mobile optimization',
                            'Security hardening'
                        ],
                        icon: Zap,
                        color: 'yellow'
                    },
                    {
                        step: 'Step 3',
                        title: 'Zero Maintenance',
                        description: 'Enjoy a completely maintenance-free website forever',
                        features: [
                            'No more updates',
                            'No security patches',
                            'No backup anxiety',
                            'No hosting fees'
                        ],
                        icon: CheckCircle,
                        color: 'green'
                    }
                ].map((step, index) => (
                    <motion.div
                        key={step.step}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className={`bg-${step.color}-50 dark:bg-${step.color}-900/10 border border-${step.color}-200 dark:border-${step.color}-800 rounded-xl p-6`}
                    >
                        <div className="text-center mb-6">
                            <div className={`w-16 h-16 bg-${step.color}-100 dark:bg-${step.color}-900/20 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                <step.icon className={`w-8 h-8 text-${step.color}-600 dark:text-${step.color}-400`} />
                            </div>
                            <div className={`text-sm font-medium text-${step.color}-600 dark:text-${step.color}-400 mb-2`}>
                                {step.step}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {step.description}
                            </p>
                        </div>

                        <div className="space-y-3">
                            {step.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-3">
                                    <CheckCircle className={`w-4 h-4 text-${step.color}-600 dark:text-${step.color}-400 flex-shrink-0`} />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Migration ROI Calculator */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8"
            >
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        💰 Migration ROI Calculator
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        See exactly how much you'll save by switching from WordPress
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* WordPress Costs */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-red-700 dark:text-red-400">
                            Annual WordPress Costs
                        </h4>
                        <div className="space-y-4">
                            {[
                                { item: 'Hosting & Domain', cost: '$600' },
                                { item: 'Premium Plugins', cost: '$400' },
                                { item: 'Security & Backups', cost: '$300' },
                                { item: 'Maintenance Time (20h)', cost: '$1,000' },
                                { item: 'Performance Issues', cost: '$800' }
                            ].map((cost, index) => (
                                <div key={cost.item} className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                                    <span className="text-red-700 dark:text-red-300">{cost.item}</span>
                                    <span className="font-bold text-red-600 dark:text-red-400">{cost.cost}</span>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-red-200 dark:border-red-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-red-800 dark:text-red-200">Total Annual Cost</span>
                                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">$3,100</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Eternal UI Costs */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-green-700 dark:text-green-400">
                            Annual Eternal UI Costs
                        </h4>
                        <div className="space-y-4">
                            {[
                                { item: 'Hosting & Domain', cost: '$0' },
                                { item: 'All Features Built-in', cost: '$0' },
                                { item: 'Security & Backups', cost: '$0' },
                                { item: 'Maintenance Time (0h)', cost: '$0' },
                                { item: 'Eternal UI Pro Plan', cost: '$348' }
                            ].map((cost, index) => (
                                <div key={cost.item} className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                                    <span className="text-green-700 dark:text-green-300">{cost.item}</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">{cost.cost}</span>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-green-200 dark:border-green-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-green-800 dark:text-green-200">Total Annual Cost</span>
                                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">$348</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Savings Highlight */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl">
                        <DollarSign className="w-8 h-8" />
                        <div>
                            <div className="text-2xl font-bold">Save $2,752/year</div>
                            <div className="text-green-100">89% cost reduction</div>
                        </div>
                    </div>
                </div>
            </motion.div>

             {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-2xl border border-orange-200 dark:border-orange-800 p-8 text-center"
            >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    🎯 Ready to Dominate WordPress?
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    Start the WordPress massacre today. Migrate for free and watch your site become 10x better instantly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { icon: Rocket, title: 'Free Migration', description: 'Complete WordPress import in 5 minutes' },
                        { icon: Zap, title: '10x Performance', description: 'Instant speed improvements guaranteed' },
                        { icon: Shield, title: 'Zero Risk', description: '30-day money-back guarantee' }
                    ].map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800"
                        >
                            <benefit.icon className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
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
                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-colors text-lg flex items-center space-x-2 mx-auto"
                >
                    <Sword className="w-5 h-5" />
                    <span>Start WordPress Domination</span>
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
                <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ⚡ <span className="font-semibold">Free migration</span> • 
                        No credit card required • 
                        <span className="font-semibold">10x performance guarantee</span>
                    </p>
                </div>
            </motion.div>
        </div>
    )

    /**
     * Navigation Component
     */
    const NavigationTabs = () => (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-8">
                        {[
                            { id: 'overview', label: 'Domination Overview', icon: Target },
                            { id: 'painpoints', label: 'Pain Point Destroyer', icon: Sword },
                            { id: 'personas', label: 'User Liberation', icon: Users },
                            { id: 'features', label: 'Feature Annihilation', icon: Zap },
                            { id: 'migration', label: 'Migration Weapon', icon: Rocket }
                        ].map(({ id, label, icon: Icon }) => (
                            <motion.button
                                key={id}
                                onClick={() => setActiveSection(id as any)}
                                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                                    activeSection === id
                                        ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                                whileHover={{ y: -1 }}
                                whileTap={{ y: 0 }}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Auto-play control */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setAutoPlay(!autoPlay)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                autoPlay
                                    ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span>{autoPlay ? 'Auto Demo' : 'Start Auto'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation */}
            <NavigationTabs />

            {/* Main Content */}
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        {activeSection === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <OverviewSection />
                            </motion.div>
                        )}
                        {activeSection === 'painpoints' && (
                            <motion.div
                                key="painpoints"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PainPointsSection />
                            </motion.div>
                        )}
                        {activeSection === 'personas' && (
                            <motion.div
                                key="personas"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PersonasSection />
                            </motion.div>
                        )}
                        {activeSection === 'features' && (
                            <motion.div
                                key="features"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FeaturesSection />
                            </motion.div>
                        )}
                        {activeSection === 'migration' && (
                            <motion.div
                                key="migration"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MigrationSection />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer Statistics */}
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            🎯 WordPress Domination Statistics
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            The numbers that prove Eternal UI's complete superiority over WordPress
                        </p>
                    </div>

                    {/* Domination Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        {[
                            { number: '680M', label: 'WordPress Sites to Capture', icon: Target, color: 'red' },
                            { number: '10x', label: 'Performance Advantage', icon: Zap, color: 'yellow' },
                            { number: '89%', label: 'Cost Reduction', icon: DollarSign, color: 'green' },
                            { number: '100%', label: 'Security Improvement', icon: Shield, color: 'blue' }
                        ].map(({ number, label, icon: Icon, color }) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <div className={`w-12 h-12 bg-${color}-100 dark:bg-${color}-900/20 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                                    <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
                                </div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    {number}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Battle Cry */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
                        <div className="max-w-3xl mx-auto">
                            <h4 className="text-2xl font-bold mb-4">
                                ⚔️ The WordPress War Has Begun
                            </h4>
                            <p className="text-lg text-orange-100 mb-6">
                                Join the revolution that will liberate millions from WordPress suffering. 
                                Together, we&apos;ll build the future of web development.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-orange-600 py-3 px-8 rounded-lg font-bold hover:bg-orange-50 transition-colors"
                            >
                                🚀 Join the WordPress Massacre
                            </motion.button>
                        </div>
                    </div>

                    {/* Legal & Links */}
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                <a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                    Domination Strategy
                                </a>
                                <a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                    Migration Tools
                                </a>
                                <a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                    WordPress Comparison
                                </a>
                                <a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                    Battle Plans
                                </a>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                © 2025 Eternal UI. Liberating the world from WordPress, one site at a time.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

// Additional utility functions and data

/**
 * WordPress market analysis and targeting data
 */
export const wordPressMarketData = {
    totalSites: 680000000, // 680 million WordPress sites
    marketShare: 0.43, // 43% of all websites
    segments: {
        bloggers: { count: 200000000, avgSpend: 600 },
        ecommerce: { count: 80000000, avgSpend: 2400 },
        business: { count: 150000000, avgSpend: 1800 },
        agencies: { count: 25000000, avgSpend: 12000 }
    },
    painPoints: {
        security: 0.41, // 41% experience security issues
        performance: 0.73, // 73% have performance problems
        maintenance: 0.89, // 89% struggle with maintenance
        cost: 0.67 // 67% find WordPress expensive
    }
}

/**
 * Competitive advantage metrics
 */
export const competitiveAdvantages = {
    performance: {
        wordpress: { loadTime: 3200, coreWebVitals: 45 },
        eternal: { loadTime: 800, coreWebVitals: 95 },
        improvement: { speed: 4, vitals: 111 }
    },
    security: {
        wordpress: { vulnerabilities: 41, updates: 'weekly' },
        eternal: { vulnerabilities: 0, updates: 'never' },
        improvement: { security: 100, maintenance: 100 }
    },
    cost: {
        wordpress: { annual: 3100, breakdown: ['hosting', 'plugins', 'maintenance'] },
        eternal: { annual: 348, breakdown: ['platform'] },
        improvement: { savings: 89, roi: 792 }
    }
}

/**
 * Migration success factors
 */
export const migrationFactors = {
    ease: {
        timeToMigrate: '5 minutes',
        automationLevel: '100%',
        dataLoss: '0%',
        downtimeRequired: '0 seconds'
    },
    incentives: {
        freeMigration: true,
        freeMonths: 3,
        performanceGuarantee: '10x faster or money back',
        supportLevel: '24/7 white-glove migration'
    },
    results: {
        averageSpeedIncrease: '400%',
        costReduction: '89%',
        maintenanceElimination: '100%',
        securityImprovement: '100%'
    }
}