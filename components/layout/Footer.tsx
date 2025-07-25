import { ExternalLink, Github, Shield, Twitter } from 'lucide-react'
import { EternalUILogo } from '../ui/EternalUILogo'



// Footer Component
function Footer() {
  return (
    <footer
      className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* 🌟 FOOTER LOGO - Brand Reinforcement */}
          <div className="space-y-4">
            <EternalUILogo
              size="md"
              variant="mono"
              className="text-white"
            />
            <p className="text-gray-400 text-sm">
              Professional React components for the modern web. Built with TypeScript,
              accessibility, and performance in mind.
            </p>
            {/* Accessibility Statement */}
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mb-4">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>WCAG 2.1 AA Compliant</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/your-repo/modern-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Follow us on GitHub"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/modernui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-semibold mb-4">Documentation</h3>
            <div className="space-y-2">
              <a href="/docs" className="block text-gray-400 hover:text-white transition-colors">
                Getting Started
              </a>
              <a href="/docs/installation" className="block text-gray-400 hover:text-white transition-colors">
                Installation
              </a>
              <a href="/docs/theming" className="block text-gray-400 hover:text-white transition-colors">
                Theming
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Components</h3>
            <div className="space-y-2">
              <a href="/components/button" className="block text-gray-400 hover:text-white transition-colors">
                Button
              </a>
              <a href="/components/input" className="block text-gray-400 hover:text-white transition-colors">
                Input
              </a>
              <a href="/components/card" className="block text-gray-400 hover:text-white transition-colors">
                Card
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <a href="/community" className="block text-gray-400 hover:text-white transition-colors">
                Community
              </a>
              <a href="/support" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
              <a href="/changelog" className="block text-gray-400 hover:text-white transition-colors">
                Changelog
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Eternal UI. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>

  )
}


export default Footer