'use client'

import React, { useState } from 'react'
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

// Import migration types (you'll need to install the migration package)
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
     * Setup Tab Component
     */
    const MigrationSetup = () => (
        <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Escape WordPress Hell
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    Transform your slow, vulnerable WordPress site into a lightning-fast, secure modern website.
                    <span className="text-indigo-600 font-semibold"> 10x faster, 90% cheaper, zero maintenance required.</span>
                </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
            </div>

            {/* Migration Form */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Start Your Migration
                </h2>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            <span className="text-red-700 dark:text-red-300">{error}</span>
                        </div>
                    </div>
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
                                <button
                                    key={type}
                                    onClick={() => setMigrationConfig(prev => ({ ...prev, sourceType: type as MigrationConfig['sourceType'] }))}
                                    className={`p-4 rounded-lg border-2 transition-all ${migrationConfig.sourceType === type
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {label}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {migrationConfig.sourceType === 'url' && (
                            <input
                                type="url"
                                placeholder="https://your-wordpress-site.com"
                                value={migrationConfig.sourceUrl}
                                onChange={(e) => setMigrationConfig(prev => ({ ...prev, sourceUrl: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        )}

                        {migrationConfig.sourceType === 'xml' && (
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
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
                            </div>
                        )}

                        {migrationConfig.sourceType === 'zip' && (
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
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
                            </div>
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
                                <button
                                    key={framework.id}
                                    onClick={() => setMigrationConfig(prev => ({ ...prev, framework: framework.id as MigrationConfig['framework'] }))}
                                    className={`p-4 rounded-lg border-2 transition-all text-left ${migrationConfig.framework === framework.id
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <Code className="w-6 h-6 mb-2 text-indigo-600 dark:text-indigo-400" />
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {framework.name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {framework.description}
                                    </div>
                                </button>
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
                                <button
                                    key={styling.id}
                                    onClick={() => setMigrationConfig(prev => ({ ...prev, styling: styling.id as MigrationConfig['styling'] }))}
                                    className={`p-4 rounded-lg border-2 transition-all text-left ${migrationConfig.styling === styling.id
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <Palette className="w-6 h-6 mb-2 text-indigo-600 dark:text-indigo-400" />
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {styling.name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {styling.description}
                                    </div>
                                </button>
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
                                <label key={key} className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
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
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Start Migration Button */}
                    <div className="pt-6">
                        <button
                            onClick={handleStartMigration}
                            disabled={!migrationConfig.sourceUrl && migrationConfig.sourceType === 'url'}
                            className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 text-lg"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>Start WordPress Migration</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
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
            </div>

            {/* Social Proof */}
            <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Join thousands of WordPress refugees who&apos;ve escaped to freedom
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
                    We&apos;re transforming your WordPress site into a modern, lightning-fast website
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl">
                <div className="space-y-8">
                    {migrationSteps.map((step, index) => (
                        <div key={step.id} className="flex items-start space-x-4">
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
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <span className="text-white font-semibold">{index + 1}</span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
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
                                        <div
                                            className="bg-indigo-500 h-2 rounded-full transition-all duration-300 ease-out"
                                            style={{ width: `${step.progress}%` }}
                                        />
                                    </div>
                                )}
                                {step.status === 'completed' && (
                                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                                        ✓ Completed successfully
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {isMigrating && (
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                            <div className="w-4 h-4 border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                            <span>Migration in progress... Please don&apos;t close this tab</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            This usually takes 2-5 minutes depending on your site size
                        </p>
                    </div>
                )}
            </div>
        </div>
    )

    /**
     * Results Tab Component
     */
    const MigrationResults = () => {
        if (!migrationResults) return null

        return (
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Migration Completed Successfully! 🎉
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Your WordPress site has been transformed into a modern, lightning-fast website
                    </p>
                </div>

                {/* Results Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
                        <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {migrationResults.components.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Components Generated</div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
                        <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {migrationResults.pages.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Pages Migrated</div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
                        <FileText className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {migrationResults.posts.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Posts Migrated</div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center">
                        <Image className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {migrationResults.media.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Media Files</div>
                    </div>
                </div>

                {/* Performance Improvements */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        🚀 Performance Improvements
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                                {migrationResults.performance.loadTimeImprovement}%
                            </div>
                            <div className="text-gray-700 dark:text-gray-300 font-medium">Faster Loading</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">3.2s → 0.8s average</div>
                        </div>

                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                                {migrationResults.performance.sizeReduction}%
                            </div>
                            <div className="text-gray-700 dark:text-gray-300 font-medium">Size Reduction</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">2.5MB → 250KB</div>
                        </div>

                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                                {migrationResults.performance.lighthouse.performance}
                            </div>
                            <div className="text-gray-700 dark:text-gray-300 font-medium">Lighthouse Score</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">45 → 95 points</div>
                        </div>
                    </div>
                </div>

                {/* Generated Components */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Code className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                            Generated Components
                        </h3>
                        <div className="space-y-3">
                            {migrationResults.components.map((component) => (
                                <div key={component.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {component.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                            {component.type}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                            Migrated Content
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Pages</h4>
                                <div className="space-y-1">
                                    {migrationResults.pages.map((page) => (
                                        <div key={page.id} className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
                                            <span>/{page.slug}</span>
                                            <span className="text-green-600 dark:text-green-400">✓</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Posts</h4>
                                <div className="space-y-1">
                                    {migrationResults.posts.slice(0, 3).map((post) => (
                                        <div key={post.id} className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between">
                                            <span className="truncate">{post.title}</span>
                                            <span className="text-green-600 dark:text-green-400">✓</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Download Actions */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                        Download Your New Website
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <button className="flex items-center justify-center space-x-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                            <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <span className="font-medium text-indigo-700 dark:text-indigo-300">
                                Download React Code
                            </span>
                        </button>

                        <button className="flex items-center justify-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                            <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <span className="font-medium text-green-700 dark:text-green-300">
                                Download Content
                            </span>
                        </button>

                        <button className="flex items-center justify-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                            <Image className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <span className="font-medium text-purple-700 dark:text-purple-300">
                                Download Media
                            </span>
                        </button>
                    </div>

                    <div className="text-center space-y-4">
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-3 mx-auto">
                            <Download className="w-5 h-5" />
                            <span>Download Complete Project</span>
                        </button>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Includes all React components, content files, and optimized media
                        </p>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 p-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                        🚀 What&apos;s Next?
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Play className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Deploy Instantly
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Deploy to Vercel, Netlify, or your hosting provider with one click
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Customize Further
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Use our visual builder to customize components and add new features
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Setup Analytics
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Add Google Analytics, tracking, and performance monitoring
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 mx-auto">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Migration Guide</span>
                        </button>
                    </div>
                </div>

                {/* Success Stories */}
                <div className="mt-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🎉 Join the WordPress Exodus
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                                2,847
                            </div>
                            <div>Sites successfully migrated</div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                85%
                            </div>
                            <div>Average speed improvement</div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                                98%
                            </div>
                            <div>Customer satisfaction rate</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Main component render
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-1 inline-flex">
                        {[
                            { id: 'setup', label: 'Setup', icon: Globe },
                            { id: 'progress', label: 'Progress', icon: Clock },
                            { id: 'results', label: 'Results', icon: CheckCircle }
                        ].map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id as 'setup' | 'progress' | 'results')}
                                disabled={id === 'progress' && !isMigrating && activeTab !== 'progress'}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                                    activeTab === id
                                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                } ${
                                    id === 'progress' && !isMigrating && activeTab !== 'progress' && !migrationResults
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                } ${
                                    id === 'results' && !migrationResults
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                                {id === 'results' && migrationResults && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'setup' && <MigrationSetup />}
                {activeTab === 'progress' && <MigrationProgress />}
                {activeTab === 'results' && <MigrationResults />}
            </div>
        </div>
    )
}