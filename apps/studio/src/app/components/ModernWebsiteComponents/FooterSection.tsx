import { EternalUILogo } from '@/components/ui/EternalUILogo'
import React, { useState } from 'react'

const FooterSection: React.FC<{
  variant: 'simple' | 'comprehensive' | 'minimal'
  showNewsletter: boolean
  showSocial: boolean
}> = ({ variant, showNewsletter, showSocial }) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: ['Features', 'Pricing', 'Security', 'Roadmap', 'API'],
    company: ['About', 'Blog', 'Careers', 'Contact', 'Press'],
    resources: ['Documentation', 'Help Center', 'Community', 'Tutorials', 'Templates'],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Licenses']
  }

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'GitHub', icon: '🐙', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Discord', icon: '💬', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' }
  ]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    // Simulate newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 500))
    setSubscribed(true)
    setEmail('')
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubscribed(false), 3000)
  }

  if (variant === 'minimal') {
    return (
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <EternalUILogo size="sm" theme="light" />
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              {showSocial && (
                <div className="flex space-x-4">
                  {socialLinks.slice(0, 3).map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      aria-label={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                © {currentYear} Eternal UI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <EternalUILogo size="md" theme="dark" showText={true} />
            <p className="text-gray-300 mt-4 max-w-sm">
              Build beautiful, accessible, and performant web applications with our comprehensive component library and design system.
            </p>
            
            {showSocial && (
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors group"
                    aria-label={social.name}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter section */}
        {showNewsletter && (
          <div className="border-t border-gray-800 mt-12 pt-12">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Get the latest updates, feature releases, and design tips delivered straight to your inbox.
              </p>
              
              {subscribed ? (
                <div className="p-4 bg-green-900 border border-green-700 rounded-lg">
                  <p className="text-green-200 text-center">
                    ✅ Successfully subscribed! Thank you for joining our community.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Eternal UI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection;