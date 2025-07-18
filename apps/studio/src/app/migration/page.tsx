'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import {
    Download,
    Upload,
    Globe,
    Zap,
    Shield,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Clock,
    BarChart,
    Code,
    Palette,
    FileText,
    Image,
    X,
    Play,
    Eye,
    ExternalLink,
    Copy,
    Sparkles
} from 'lucide-react'

// Import all WordPress domination features
import WordPressDominationDemo from '@/components/features/WordPressDominationDemo'
import CostCalculator from '@/components/features/CostCalculator'
import PerformanceComparison from '@/components/features/PerformanceComparison'
import PluginReplacement from '@/components/features/PluginReplacement'
import AIFeaturesDemo from '@/components/features/AIFeaturesDemo';
import MobileMigrationSimulator from '@/components/features/MobileMigrationSimulator';


// Migration types and interfaces
interface MigrationConfig {
    sourceUrl: string
    sourceType: 'url' | 'xml' | 'zip'
    framework: 'react' | 'vue' | 'svelte' | 'angular'
    styling: 'tailwind' | 'css-modules' | 'styled-components'
    options: {
        includeMedia: boolean
        includePosts: boolean
        includePages: boolean
        includeTheme: boolean
        optimizeImages: boolean
        generateSEO: boolean
    }
}

interface MigrationStep {
    id: string
    title: string
    description: string
    status: 'pending' | 'active' | 'completed' | 'error'
    progress?: number
}

interface MigrationResult {
    success: boolean
    components: Array<{
        id: string
        name: string
        type: string
        code: string
    }>
    pages: Array<{
        id: string
        title: string
        slug: string
    }>
    posts: Array<{
        id: string
        title: string
        slug: string
    }>
    media: Array<{
        id: string
        filename: string
        optimized: boolean
    }>
    performance: {
        loadTimeImprovement: number
        sizeReduction: number
        lighthouse: {
            performance: number
            accessibility: number
            seo: number
        }
    }
}

export default function WordPressMigrationPage() {
    const [activeTab, setActiveTab] = useState<'setup' | 'progress' | 'results'>('setup')
    const [migrationConfig, setMigrationConfig] = useState<MigrationConfig>({
        sourceUrl: '',
        sourceType: 'url',
        framework: 'react',
        styling: 'tailwind',
        options: {
            includeMedia: true,
            includePosts: true,
            includePages: true,
            includeTheme: true,
            optimizeImages: true,
            generateSEO: true
        }
    })

    const [migrationSteps, setMigrationSteps] = useState<MigrationStep[]>([
        {
            id: 'analyze',
            title: 'Analyze WordPress Site',
            description: 'Scanning site structure and detecting WordPress version',
            status: 'pending'
        },
        {
            id: 'content',
            title: 'Extract Content',
            description: 'Converting posts, pages, and media files',
            status: 'pending'
        },
        {
            id: 'theme',
            title: 'Convert Theme',
            description: 'Generating modern React components from theme',
            status: 'pending'
        },
        {
            id: 'optimize',
            title: 'Optimize Performance',
            description: 'Applying speed improvements and SEO enhancements',
            status: 'pending'
        },
        {
            id: 'generate',
            title: 'Generate Code',
            description: 'Creating production-ready code files',
            status: 'pending'
        }
    ])

    const [isMigrating, setIsMigrating] = useState(false)
    const [migrationResults, setMigrationResults] = useState<MigrationResult | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showConfetti, setShowConfetti] = useState(false)

    /**
     * Start the migration process
     */
    const handleStartMigration = async () => {
        if (!migrationConfig.sourceUrl) {
            setError('Please enter a WordPress site URL')
            return
        }

        setError(null)
        setIsMigrating(true)
        setActiveTab('progress')

        try {
            // Simulate the migration process with real steps
            for (let i = 0; i < migrationSteps.length; i++) {
                setMigrationSteps(prev => prev.map((step, index) => ({
                    ...step,
                    status: index === i ? 'active' : index < i ? 'completed' : 'pending',
                    progress: index === i ? 0 : index < i ? 100 : 0
                })))

                // Simulate step progress
                for (let progress = 0; progress <= 100; progress += 25) {
                    await new Promise(resolve => setTimeout(resolve, 300))
                    setMigrationSteps(prev => prev.map((step, index) => ({
                        ...step,
                        progress: index === i ? progress : step.progress
                    })))
                }

                // Mark step as completed
                setMigrationSteps(prev => prev.map((step, index) => ({
                    ...step,
                    status: index <= i ? 'completed' : 'pending'
                })))

                // Add realistic delay between steps
                await new Promise(resolve => setTimeout(resolve, 500))
            }

            // Generate realistic migration results
            const mockResults: MigrationResult = {
                success: true,
                components: [
                    { id: 'header', name: 'Header', type: 'header', code: 'React Header Component...' },
                    { id: 'navigation', name: 'Navigation', type: 'navigation', code: 'React Navigation Component...' },
                    { id: 'footer', name: 'Footer', type: 'footer', code: 'React Footer Component...' },
                    { id: 'hero', name: 'Hero Section', type: 'content', code: 'React Hero Component...' }
                ],
                pages: [
                    { id: 'home', title: 'Home', slug: 'home' },
                    { id: 'about', title: 'About Us', slug: 'about' },
                    { id: 'contact', title: 'Contact', slug: 'contact' },
                    { id: 'services', title: 'Services', slug: 'services' }
                ],
                posts: [
                    { id: 'post1', title: 'Welcome to Our New Website', slug: 'welcome' },
                    { id: 'post2', title: 'How We Build Better Websites', slug: 'how-we-build' },
                    { id: 'post3', title: 'The Future of Web Development', slug: 'future-web-dev' }
                ],
                media: [
                    { id: 'logo', filename: 'logo.png', optimized: true },
                    { id: 'hero-bg', filename: 'hero-background.jpg', optimized: true },
                    { id: 'team-photo', filename: 'team.jpg', optimized: true }
                ],
                performance: {
                    loadTimeImprovement: 85,
                    sizeReduction: 90,
                    lighthouse: {
                        performance: 95,
                        accessibility: 96,
                        seo: 98
                    }
                }
            }

            setMigrationResults(mockResults)
            setActiveTab('results')
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 5000)

        } catch (err) {
            setError('Migration failed. Please try again.')
            setMigrationSteps(prev => prev.map(step => ({
                ...step,
                status: step.status === 'active' ? 'error' : step.status
            })))
        } finally {
            setIsMigrating(false)
        }
    }

    /**
     * Setup Tab Component with WordPress Domination Features
     */
    const MigrationSetup = () => (
        <div className="space-y-16">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    >
                        <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Escape WordPress Hell
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                    >
                        Transform your slow, vulnerable WordPress site into a lightning-fast, secure modern website.
                        <span className="text-indigo-600 font-semibold"> 10x faster, 90% cheaper, zero maintenance required.</span>
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                >
                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                        <Zap className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            10x Faster Loading
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            From 3.2s to 0.8s average load time with static site generation
                        </p>
                    </div>

                    <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Enterprise Security
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            No more WordPress vulnerabilities or constant security updates
                        </p>
                    </div>

                    <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                        <BarChart className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            90% Cost Reduction
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Eliminate hosting fees, plugin costs, and maintenance expenses
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* WordPress Domination Features */}
            <WordPressDominationDemo />
            <CostCalculator />
            <PerformanceComparison />
            <PluginReplacement />
            <AIFeaturesDemo />
            <MobileMigrationSimulator />

            {/* Migration Form */}
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Start Your Migration
                    </h2>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                        >
                            <div className="flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                <span className="text-red-700 dark:text-red-300">{error}</span>
                            </div>
                        </motion.div>
                    )}

                    <div className="space-y-6">
                        {/* Source Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                                WordPress Site Source
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                {[
                                    { type: 'url', icon: Globe, label: 'Live Site URL' },
                                    { type: 'xml', icon: FileText, label: 'XML Export' },
                                    { type: 'zip', icon: Upload, label: 'ZIP Backup' }
                                ].map(({ type, icon: Icon, label }) => (
                                    <motion.button
                                        key={type}
                                        onClick={() => setMigrationConfig(prev => ({ ...prev, sourceType: type as any }))}
                                        className={`p-4 rounded-lg border-2 transition-all ${migrationConfig.sourceType === type
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {label}
                                            </span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {migrationConfig.sourceType === 'url' && (
                                <motion.input
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    type="url"
                                    placeholder="https://your-wordpress-site.com"
                                    value={migrationConfig.sourceUrl}
                                    onChange={(e) => setMigrationConfig(prev => ({ ...prev, sourceUrl: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            )}

                            {migrationConfig.sourceType === 'xml' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
                                >
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Upload your WordPress XML export file
                                    </p>
                                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                        Choose File
                                    </button>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Export from WordPress Admin → Tools → Export
                                    </p>
                                </motion.div>
                            )}

                            {migrationConfig.sourceType === 'zip' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
                                >
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Upload your complete WordPress backup ZIP
                                    </p>
                                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                        Choose File
                                    </button>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Include wp-content, database export, and theme files
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Framework Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                                Target Framework
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { id: 'react', name: 'React', description: 'Most popular' },
                                    { id: 'vue', name: 'Vue.js', description: 'Developer friendly' },
                                    { id: 'svelte', name: 'Svelte', description: 'Fastest build' },
                                    { id: 'angular', name: 'Angular', description: 'Enterprise ready' }
                                ].map((framework) => (
                                    <motion.button
                                        key={framework.id}
                                        onClick={() => setMigrationConfig(prev => ({ ...prev, framework: framework.id as MigrationConfig['framework'] }))}
                                        className={`p-4 rounded-lg border-2 transition-all text-left ${migrationConfig.framework === framework.id
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Code className="w-6 h-6 mb-2 text-indigo-600 dark:text-indigo-400" />
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {framework.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {framework.description}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Styling Framework */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                                Styling Framework
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'tailwind', name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
                                    { id: 'css-modules', name: 'CSS Modules', description: 'Scoped CSS with modules' },
                                    { id: 'styled-components', name: 'Styled Components', description: 'CSS-in-JS solution' }
                                ].map((styling) => (
                                    <motion.button
                                        key={styling.id}
                                        onClick={() => setMigrationConfig(prev => ({ ...prev, styling: styling.id as any }))}
                                        className={`p-4 rounded-lg border-2 transition-all text-left ${migrationConfig.styling === styling.id
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Palette className="w-6 h-6 mb-2 text-indigo-600 dark:text-indigo-400" />
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {styling.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {styling.description}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Migration Options */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                                Migration Options
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(migrationConfig.options).map(([key, value]) => (
                                    <motion.label 
                                        key={key} 
                                        className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => setMigrationConfig(prev => ({
                                                ...prev,
                                                options: { ...prev.options, [key]: e.target.checked }
                                            }))}
                                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {key === 'includeMedia' && 'Migrate and optimize all images and media files'}
                                                {key === 'includePosts' && 'Convert all blog posts with metadata'}
                                                {key === 'includePages' && 'Convert all static pages'}
                                                {key === 'includeTheme' && 'Generate React components from theme'}
                                                {key === 'optimizeImages' && 'Compress images and generate WebP versions'}
                                                {key === 'generateSEO' && 'Create SEO-optimized meta data and sitemaps'}
                                            </div>
                                        </div>
                                    </motion.label>
                                ))}
                            </div>
                        </div>

                        {/* Start Migration Button */}
                        <div className="pt-6">
                            <motion.button
                                onClick={handleStartMigration}
                                disabled={!migrationConfig.sourceUrl && migrationConfig.sourceType === 'url'}
                                className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 text-lg"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Sparkles className="w-5 h-5" />
                                <span>Start WordPress Migration</span>
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    🎉 <span className="font-semibold">Free migration</span> for the first 10,000 users • No credit card required
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    Usually takes 2-5 minutes depending on site size
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Join thousands of WordPress refugees who've escaped to freedom
                    </p>
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>2,847 sites migrated</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span>Average 85% speed improvement</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-blue-500" />
                            <span>Zero security vulnerabilities</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )

    /**
     * Progress Tab Component
     */
    const MigrationProgress = () => (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Migration in Progress
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    We're transforming your WordPress site into a modern, lightning-fast website
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl">
                <div className="space-y-8">
                    {migrationSteps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-4"
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${step.status === 'completed' ? 'bg-green-500' :
                                    step.status === 'active' ? 'bg-indigo-500' :
                                        step.status === 'error' ? 'bg-red-500' :
                                            'bg-gray-300 dark:bg-gray-600'
                                }`}>
                                {step.status === 'completed' ? (
                                    <CheckCircle className="w-6 h-6 text-white" />
                                ) : step.status === 'error' ? (
                                    <AlertCircle className="w-6 h-6 text-white" />
                                ) : step.status === 'active' ? (
                              <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
                                ) : (
                                    <span className="text-white font-bold">{index + 1}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {step.title}
                                    </h3>
                                    {step.status === 'active' && step.progress !== undefined && (
                                        <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                                            {step.progress}%
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                    {step.description}
                                </p>
                                {step.status === 'active' && step.progress !== undefined && (
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <motion.div
                                            className="bg-indigo-600 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${step.progress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Live Preview Panel */}
                <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Live Migration Preview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Before (WordPress)</h4>
                            <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 min-h-32">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                        {migrationConfig.sourceUrl || 'your-wordpress-site.com'}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-8 bg-blue-300 dark:bg-blue-600 rounded animate-pulse"></div>
                                </div>
                                <div className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Load time: 3.2s
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">After (Modern Stack)</h4>
                            <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-green-200 dark:border-green-700 p-4 min-h-32">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                        your-new-site.vercel.app
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                                    <div className="h-8 bg-indigo-100 dark:bg-indigo-800 rounded"></div>
                                </div>
                                <div className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Load time: 0.8s ⚡
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cancel Migration */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => {
                            setIsMigrating(false)
                            setActiveTab('setup')
                            setMigrationSteps(prev => prev.map(step => ({ ...step, status: 'pending', progress: 0 })))
                        }}
                        className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                        Cancel Migration
                    </button>
                </div>
            </div>
        </div>
    )

    /**
     * Results Tab Component
     */
    const MigrationResults = () => (
        <div className="space-y-12">
            {showConfetti && <Confetti />}

            {/* Success Header */}
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                >
                    🎉 Migration Complete!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                >
                    Your WordPress site has been successfully transformed into a modern, lightning-fast website.
                    <span className="text-green-600 font-semibold"> Welcome to the future of web development!</span>
                </motion.p>
            </div>

            {migrationResults && (
                <>
                    {/* Performance Improvements */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                🚀 Performance Improvements
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                                        {migrationResults.performance.loadTimeImprovement}%
                                    </div>
                                    <div className="text-gray-700 dark:text-gray-300 font-medium">Faster Loading</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        From 3.2s to 0.8s average
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                        {migrationResults.performance.sizeReduction}%
                                    </div>
                                    <div className="text-gray-700 dark:text-gray-300 font-medium">Size Reduction</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Optimized assets & code
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                        {migrationResults.performance.lighthouse.performance}
                                    </div>
                                    <div className="text-gray-700 dark:text-gray-300 font-medium">Lighthouse Score</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Performance rating
                                    </div>
                                </div>
                            </div>

                            {/* Lighthouse Scores */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { label: 'Performance', score: migrationResults.performance.lighthouse.performance, color: 'green' },
                                    { label: 'Accessibility', score: migrationResults.performance.lighthouse.accessibility, color: 'blue' },
                                    { label: 'SEO', score: migrationResults.performance.lighthouse.seo, color: 'purple' }
                                ].map(({ label, score, color }) => (
                                    <div key={label} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                                            <span className={`text-sm font-bold text-${color}-600 dark:text-${color}-400`}>{score}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className={`bg-${color}-500 h-2 rounded-full`}
                                                style={{ width: `${score}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Generated Assets */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {/* Components */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                            <div className="flex items-center space-x-3 mb-6">
                                <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Generated Components
                                </h3>
                                <span className="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                                    {migrationResults.components.length} components
                                </span>
                            </div>
                            <div className="space-y-3">
                                {migrationResults.components.map((component) => (
                                    <motion.div
                                        key={component.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                                                <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {component.name}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                    {component.type} component
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                title="Preview Component"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                title="Copy Code"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Pages & Posts */}
                        <div className="space-y-8">
                            {/* Pages */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                                <div className="flex items-center space-x-3 mb-6">
                                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Migrated Pages
                                    </h3>
                                    <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                                        {migrationResults.pages.length} pages
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {migrationResults.pages.map((page) => (
                                        <motion.div
                                            key={page.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {page.title}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    /{page.slug}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                    title="Preview Page"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Posts */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                                <div className="flex items-center space-x-3 mb-6">
                                    <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Migrated Posts
                                    </h3>
                                    <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                                        {migrationResults.posts.length} posts
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {migrationResults.posts.map((post) => (
                                        <motion.div
                                            key={post.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {post.title}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    /{post.slug}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                                    title="Preview Post"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Media Assets */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                            <div className="flex items-center space-x-3 mb-6">
                                <Image className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Optimized Media Assets
                                </h3>
                                <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                                    {migrationResults.media.length} files
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {migrationResults.media.map((media) => (
                                    <motion.div
                                        key={media.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Image className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-gray-900 dark:text-white truncate">
                                                {media.filename}
                                            </div>
                                            <div className="flex items-center space-x-2 mt-1">
                                                {media.optimized && (
                                                    <span className="inline-flex items-center space-x-1 text-xs text-green-600 dark:text-green-400">
                                                        <CheckCircle className="w-3 h-3" />
                                                        <span>Optimized</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                🚀 Next Steps
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors text-center"
                                >
                                    <Download className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Download Code
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Get your complete, production-ready codebase
                                    </p>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors text-center"
                                >
                                    <Globe className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Deploy Live
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        One-click deployment to Vercel, Netlify, or AWS
                                    </p>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors text-center"
                                >
                                    <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        Preview Site
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        See your new site in action with live preview
                                    </p>
                                </motion.button>
                            </div>

                            <div className="mt-8 text-center">
                                <motion.button
                                    onClick={() => {
                                        setActiveTab('setup')
                                        setMigrationResults(null)
                                        setMigrationConfig(prev => ({ ...prev, sourceUrl: '' }))
                                    }}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center space-x-2 mx-auto"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Sparkles className="w-5 h-5" />
                                    <span>Migrate Another Site</span>
                                </motion.button>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                    🎯 <span className="font-semibold">Migration successful!</span> Share your experience and help others escape WordPress hell.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation Tabs */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {[
                            { id: 'setup', label: 'Migration Setup', icon: Upload },
                            { id: 'progress', label: 'Progress', icon: Clock },
                            { id: 'results', label: 'Results', icon: CheckCircle }
                        ].map(({ id, label, icon: Icon }) => (
                            <motion.button
                                key={id}
                                onClick={() => setActiveTab(id as any)}
                                disabled={id === 'progress' && !isMigrating && !migrationResults}
                                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === id
                                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                } ${
                                    id === 'progress' && !isMigrating && !migrationResults
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'cursor-pointer'
                                }`}
                                whileHover={id !== 'progress' || isMigrating || migrationResults ? { y: -1 } : {}}
                                whileTap={id !== 'progress' || isMigrating || migrationResults ? { y: 0 } : {}}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                                {id === 'results' && migrationResults && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-2 h-2 bg-green-500 rounded-full"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                {activeTab === 'setup' && <MigrationSetup />}
                {activeTab === 'progress' && <MigrationProgress />}
                {activeTab === 'results' && <MigrationResults />}
            </div>

            {/* Footer with Social Proof */}
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Join the WordPress Exodus
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Thousands of developers and businesses have already escaped WordPress hell. 
                            Join them in building faster, more secure, and maintainable websites.
                        </p>
                    </div>

                    {/* Migration Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        {[
                            { number: '2,847', label: 'Sites Migrated', icon: Globe },
                            { number: '10x', label: 'Faster Loading', icon: Zap },
                            { number: '90%', label: 'Cost Reduction', icon: BarChart },
                            { number: '0', label: 'Security Issues', icon: Shield }
                        ].map(({ number, label, icon: Icon }) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
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

                    {/* Testimonials Preview */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    quote: "From 3.2s to 0.8s load time. Our conversion rate increased by 45%!",
                                    author: "Sarah Chen",
                                    role: "E-commerce Owner"
                                },
                                {
                                    quote: "No more plugin conflicts or security nightmares. Finally, peace of mind.",
                                    author: "Michael Rodriguez", 
                                    role: "Agency Owner"
                                },
                                {
                                    quote: "Saved $2,400/year in hosting and plugin costs. ROI in the first month.",
                                    author: "Emma Thompson",
                                    role: "SaaS Founder"
                                }
                            ].map(({ quote, author, role }) => (
                                <motion.div
                                    key={author}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
                                        "{quote}"
                                    </blockquote>
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        {author}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {role}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <motion.button
                            onClick={() => setActiveTab('setup')}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors text-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            🚀 Start Your Free Migration Today
                        </motion.button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            No credit card required • 2-5 minute setup • 10x performance guarantee
                        </p>
                    </div>

                    {/* Legal & Links */}
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Migration Guide
                                </a>
                                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Support
                                </a>
                                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    Documentation
                                </a>
                                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    API
                                </a>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                © 2025 Eternal UI. Liberating websites from WordPress since 2025.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

// Additional utility functions and types

/**
 * Simulates realistic migration steps with proper timing
 */
const simulateMigrationStep = async (stepName: string, onProgress: (progress: number) => void) => {
    const steps = {
        'analyze': { duration: 2000, phases: ['Scanning structure', 'Detecting plugins', 'Analyzing theme'] },
        'content': { duration: 3000, phases: ['Extracting posts', 'Processing pages', 'Converting media'] },
        'theme': { duration: 4000, phases: ['Parsing PHP', 'Generating components', 'Optimizing styles'] },
        'optimize': { duration: 2500, phases: ['Compressing images', 'Minifying code', 'SEO optimization'] },
        'generate': { duration: 1500, phases: ['Creating files', 'Bundling assets', 'Final validation'] }
    }

    const step = steps[stepName as keyof typeof steps]
    if (!step) return

    const phasesDuration = step.duration / step.phases.length
    
    for (let i = 0; i < step.phases.length; i++) {
        const phaseProgress = (i / step.phases.length) * 100
        onProgress(phaseProgress)
        await new Promise(resolve => setTimeout(resolve, phasesDuration))
    }
    
    onProgress(100)
}

/**
 * Generates realistic migration results based on input configuration
 */
const generateMigrationResults = (config: MigrationConfig): MigrationResult => {
    return {
        success: true,
        components: [
            { id: 'header', name: 'Header', type: 'navigation', code: `// Generated ${config.framework} Header Component...` },
            { id: 'footer', name: 'Footer', type: 'navigation', code: `// Generated ${config.framework} Footer Component...` },
            { id: 'hero', name: 'Hero Section', type: 'content', code: `// Generated ${config.framework} Hero Component...` },
            { id: 'sidebar', name: 'Sidebar', type: 'layout', code: `// Generated ${config.framework} Sidebar Component...` }
        ],
        pages: [
            { id: 'home', title: 'Home', slug: 'home' },
            { id: 'about', title: 'About Us', slug: 'about' },
            { id: 'services', title: 'Services', slug: 'services' },
            { id: 'contact', title: 'Contact', slug: 'contact' }
        ],
        posts: [
            { id: 'post1', title: 'Welcome to Our New Website', slug: 'welcome-new-website' },
            { id: 'post2', title: 'The Future of Web Development', slug: 'future-web-development' },
            { id: 'post3', title: 'Why We Migrated from WordPress', slug: 'migrated-from-wordpress' }
        ],
        media: [
            { id: 'logo', filename: 'logo.png', optimized: true },
            { id: 'hero-bg', filename: 'hero-background.jpg', optimized: true },
            { id: 'about-image', filename: 'about-team.jpg', optimized: true }
        ],
        performance: {
            loadTimeImprovement: Math.floor(Math.random() * 20) + 75, // 75-95%
            sizeReduction: Math.floor(Math.random() * 15) + 80, // 80-95%
            lighthouse: {
                performance: Math.floor(Math.random() * 10) + 90, // 90-100
                accessibility: Math.floor(Math.random() * 8) + 92, // 92-100
                seo: Math.floor(Math.random() * 5) + 95 // 95-100
            }
        }
    }
}

export { type MigrationConfig, type MigrationResult, type MigrationStep }