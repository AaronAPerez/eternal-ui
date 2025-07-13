'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowRight,
    Play,
    Zap,
    Code,
    Layers,
    Rocket,
    Users,
    Star,
    Check,
    Download,
    Palette,
    Smartphone,
    Globe,
    Shield,
    TrendingUp
} from 'lucide-react'

// Simple inline components to avoid import issues
function Button({ children, className = '', variant = 'default', size = 'default', asChild = false, ...props }: any) {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-black',
        secondary: 'bg-gray-100 text-black hover:bg-gray-200'
    }

    const sizes = {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8'
    }

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

    if (asChild) {
        return <span className={classes} {...props}>{children}</span>
    }

    return <button className={classes} {...props}>{children}</button>
}

function Badge({ children, className = '', variant = 'default' }: any) {
    const variants = {
        default: 'bg-blue-100 text-blue-800 border-blue-200',
        outline: 'border border-gray-200 text-gray-700'
    }

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    )
}

function Card({ children, className = '', ...props }: any) {
    return (
        <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`} {...props}>
            {children}
        </div>
    )
}

// Stats data
const stats = [
    { label: 'Active Users', value: 50000, suffix: '+' },
    { label: 'Websites Built', value: 250000, suffix: '+' },
    { label: 'Code Lines Generated', value: 10000000, suffix: '+' },
    { label: 'Customer Satisfaction', value: 98, suffix: '%' }
]

// Features data
const features = [
    {
        icon: Zap,
        title: 'AI-Powered Layouts',
        description: 'Smart layout suggestions with 95% accuracy using advanced machine learning',
        badge: 'AI',
        gradient: 'from-yellow-400 to-orange-500'
    },
    {
        icon: Code,
        title: 'Clean Code Export',
        description: 'Export production-ready code to React, Vue, Svelte, or Angular',
        badge: 'Export',
        gradient: 'from-blue-400 to-purple-500'
    },
    {
        icon: Layers,
        title: 'Component Library',
        description: '500+ pre-built components with full customization capabilities',
        badge: 'Library',
        gradient: 'from-green-400 to-teal-500'
    },
    {
        icon: Smartphone,
        title: 'Mobile-First Design',
        description: 'Responsive designs that work perfectly on all devices',
        badge: 'Responsive',
        gradient: 'from-pink-400 to-red-500'
    },
    {
        icon: Globe,
        title: 'Global CDN',
        description: 'Lightning-fast loading with 99.9% uptime worldwide',
        badge: 'Performance',
        gradient: 'from-indigo-400 to-blue-500'
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'SOC 2 compliant with enterprise-grade security measures',
        badge: 'Security',
        gradient: 'from-purple-400 to-indigo-500'
    }
]
/**
 * Homepage Client Component
 * 
 * This component handles all client-side interactions and state management
 */
export default function HomepageClient() {
    const [activeDemo, setActiveDemo] = useState<'visual' | 'code' | 'export'>('visual')

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-black/90 dark:via-gray-700 dark:to-black">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Hero Content */}
                        <div className="space-y-8">

                            {/* Badges */}
                            <div className="flex items-center space-x-4">
                                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                                    <Zap className="w-3 h-3 mr-1" />
                                    AI-Powered
                                </Badge>
                                <Badge className="bg-green-50 text-green-700 border-green-200">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    85% Cost Savings
                                </Badge>
                            </div>

                            {/* Headline */}
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight">
                                    Build Websites{' '}
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        10x Faster
                                    </span>
                                    {' '}with AI
                                </h1>

                                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                                    Create stunning, responsive websites with our AI-powered visual builder.
                                    Export clean code to any framework. No vendor lock-in, no monthly fees.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                                    asChild
                                >
                                    <Link href="/builder" className="flex items-center space-x-2">
                                        <Rocket className="w-5 h-5" />
                                        <span>Start Building Free</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                >
                                    <Link href="/demo" className="flex items-center space-x-2">
                                        <Play className="w-5 h-5" />
                                        <span>Watch Demo</span>
                                    </Link>
                                </Button>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-black"
                                            />
                                        ))}
                                    </div>
                                    <span>50k+ users</span>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span>4.9/5 rating</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="relative">

                            {/* Demo Tabs */}
                            <div className="mb-6">
                                <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                                    {[
                                        { id: 'visual', label: 'Visual Builder', icon: Palette },
                                        { id: 'code', label: 'Code View', icon: Code },
                                        { id: 'export', label: 'Export', icon: Download }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveDemo(tab.id as any)}
                                            className={`
                        flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                        ${activeDemo === tab.id
                                                    ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                                                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                                                }
                      `}
                                        >
                                            <tab.icon className="w-4 h-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Demo Interface */}
                            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex items-center space-x-2">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-red-400 rounded-full" />
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                                    </div>
                                    <div className="flex-1 text-center">
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            eternal-ui.com/builder
                                        </div>
                                    </div>
                                </div>

                                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-black dark:to-gray-800 p-8">
                                    {activeDemo === 'visual' && (
                                        <div className="h-full flex items-center justify-center">
                                            <div className="text-center space-y-4">
                                                <Palette className="w-16 h-16 mx-auto text-blue-500" />
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Interactive drag & drop builder
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {activeDemo === 'code' && (
                                        <div className="h-full bg-black rounded-lg p-4 overflow-hidden">
                                            <div className="space-y-2 font-mono text-sm">
                                                <div className="text-green-400">import React from 'react'</div>
                                                <div className="text-blue-400">export default function Component() </div>
                                                <div className="text-gray-300 ml-4">return (</div>
                                                <div className="text-yellow-400 ml-8">&lt;div className="hero-section"&gt;</div>
                                                <div className="text-purple-400 ml-12">&lt;h1&gt;Beautiful Website&lt;/h1&gt;</div>
                                                <div className="text-yellow-400 ml-8">&lt;/div&gt;</div>
                                                <div className="text-gray-300 ml-4">)</div>
                                                <div className="text-blue-400">
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeDemo === 'export' && (
                                        <div className="h-full flex items-center justify-center">
                                            <div className="text-center space-y-4">
                                                <Download className="w-16 h-16 mx-auto text-green-500" />
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Export to any framework
                                                </p>
                                                <div className="flex space-x-4 justify-center">
                                                    <Badge>React</Badge>
                                                    <Badge>Vue</Badge>
                                                    <Badge>Svelte</Badge>
                                                    <Badge>Angular</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                                Live Demo
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-2">
                                    {stat.value.toLocaleString()}{stat.suffix}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Features Section */}
            <section className="py-24 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
                            Features
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-6">
                            Everything You Need to Build
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {' '}Amazing Websites
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            From AI-powered design to clean code export, we've got every aspect of web development covered.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={feature.title}
                                className="group p-6 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-900"
                            >
                                <div className="space-y-4">

                                    {/* Icon with gradient background */}
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Badge and Title */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                {feature.title}
                                            </h3>
                                            <Badge variant="outline" className="text-xs">
                                                {feature.badge}
                                            </Badge>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


            {/* Final CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    {/* CTA Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold">
                                Ready to Build Something Amazing?
                            </h2>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                Join 50,000+ creators who are already building faster, better websites with Eternal UI.
                                Start your free account today.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-black text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
                                asChild
                            >
                                <Link href="/builder" className="flex items-center space-x-2">
                                    <Rocket className="w-5 h-5" />
                                    <span>Start Building Free</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                                asChild
                            >
                                <Link href="/contact" className="flex items-center space-x-2">
                                    <Users className="w-5 h-5" />
                                    <span>Talk to Sales</span>
                                </Link>
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center justify-center space-x-8 text-sm text-blue-100 pt-8">
                            <div className="flex items-center space-x-2">
                                <Check className="w-4 h-4" />
                                <span>Free forever plan</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Check className="w-4 h-4" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Check className="w-4 h-4" />
                                <span>30-day money back</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}