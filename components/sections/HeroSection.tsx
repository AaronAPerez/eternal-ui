'use client';

import Link from "next/link";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Download, Github, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

// Hero Section Component
function HeroSection() {
    const [email, setEmail] = useState('')

    return (
        <section className="relative py-20 px-4 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"></div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative max-w-6xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                    <Sparkles className="w-4 h-4" />
                    New: Professional Documentation Site
                </div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Build Beautiful
                    </span>
                    <br />
                    <span className="text-gray-900 dark:text-white">
                        User Interfaces
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Professional React component library with TypeScript support, accessibility built-in,
                    and animations that bring your ideas to life.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href="/docs">
                        <Button variant="primary" size="lg" icon={<Zap className="w-5 h-5" />} glow floating>
                            Explore Components
                        </Button>
                    </Link>
                    <Link href="/docs/installation">
                        <Button variant="outline" size="lg" icon={<Download className="w-5 h-5" />}>
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Quick Start Code Preview */}
                <div className="max-w-2xl mx-auto mt-12">
                    <Card variant="glass" className="backdrop-blur-xl">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Start</span>
                                <Button variant="ghost" size="sm" icon={<Github className="w-4 h-4" />}>
                                    View on GitHub
                                </Button>
                            </div>
                            <pre className="text-left bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                                <code>{`npm install @modern-ui/react

                                import { Button, Card } from '@modern-ui/react'

                                function App() {
                                return (
                                    <Card>
                                    <Button variant="primary">
                                        Hello Modern UI!
                                    </Button>
                                    </Card>
                                )
                                }`}</code>
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;