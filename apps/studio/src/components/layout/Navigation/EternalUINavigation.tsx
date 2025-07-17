'use client';

import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import {
  Search, Filter, Grid, List, Monitor, Tablet, Smartphone,
  Download, Zap, Menu, X, Home, Layers, Code, Book,
  Settings, ChevronDown, Sun, Moon, Star, Bell, User,
  Command, Copy, Eye, Play, Pause, RotateCcw, Plus,
  HelpCircle, ExternalLink, Github, Twitter, Mail,
  BrainCircuit,
  BrainIcon
} from 'lucide-react';
import { EternalUILogo } from '@/components/Logo/eternal-ui-logo';

// =================================================================
// TYPES AND INTERFACES
// =================================================================

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  isActive?: boolean;
  children?: NavigationItem[];
}

interface ComponentPageActionsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
  onDeviceModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  isQuickBuildMode: boolean;
  onQuickBuildModeChange: (enabled: boolean) => void;
  onExportPage: () => void;
  pageSectionsCount: number;
}

interface EternalUINavigationProps {
  children?: ReactNode;
  className?: string;
}

// =================================================================
// NAVIGATION DATA
// =================================================================

const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    href: '/',
    isActive: false
  },
  {
    id: 'components',
    label: 'Components',
    icon: Layers,
    href: '/components',
    isActive: true,
    badge: '120+'
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: Code,
    href: '/templates',
    badge: '45'
  },
  // {
  //   id: 'documentation',
  //   label: 'Documentation',
  //   icon: Book,
  //   href: '/docs',
  //   children: [
  //     { id: 'getting-started', label: 'Getting Started', icon: Play, href: '/docs/getting-started' },
  //     { id: 'installation', label: 'Installation', icon: Download, href: '/docs/installation' },
  //     { id: 'customization', label: 'Customization', icon: Settings, href: '/docs/customization' },
  //     { id: 'theming', label: 'Theming', icon: Sun, href: '/docs/theming' }
  //   ]
  // },
  {
    id: 'AI Generate',
    label: 'AI Generate',
    icon: BrainIcon,
    href: '/ai-demo'
  }
  // {
  //   id: 'examples',
  //   label: 'Examples',
  //   icon: Eye,
  //   href: '/examples'
  // }
];

// =================================================================
// COMPONENT PAGE ACTIONS
// =================================================================

export function ComponentPageActions({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  viewMode,
  onViewModeChange,
  deviceMode,
  onDeviceModeChange,
  isQuickBuildMode,
  onQuickBuildModeChange,
  onExportPage,
  pageSectionsCount
}: ComponentPageActionsProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex items-center justify-between flex-1 ml-8">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2 ml-4">
        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory !== 'all'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">
              {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${selectedCategory === category ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                      }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View Mode */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-l-lg transition-colors ${viewMode === 'grid'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-r-lg transition-colors ${viewMode === 'list'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Device Mode */}
        <div className="flex items-center bg-white border border-gray-300 rounded-lg">
          <button
            onClick={() => onDeviceModeChange('desktop')}
            className={`p-2 rounded-l-lg transition-colors ${deviceMode === 'desktop'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeviceModeChange('tablet')}
            className={`p-2 transition-colors ${deviceMode === 'tablet'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeviceModeChange('mobile')}
            className={`p-2 rounded-r-lg transition-colors ${deviceMode === 'mobile'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Build Toggle */}
        <button
          onClick={() => onQuickBuildModeChange(!isQuickBuildMode)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isQuickBuildMode
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          title="Quick Build Mode"
        >
          <Zap className="w-4 h-4" />
          <span className="hidden sm:inline">Quick Build</span>
          {pageSectionsCount > 0 && (
            <span className="bg-white bg-opacity-20 text-xs px-1.5 py-0.5 rounded-full">
              {pageSectionsCount}
            </span>
          )}
        </button>

        {/* Export Button (only show in Quick Build mode with sections) */}
        {isQuickBuildMode && pageSectionsCount > 0 && (
          <button
            onClick={onExportPage}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            title="Export Page"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        )}
      </div>
    </div>
  );
}

// =================================================================
// MAIN NAVIGATION COMPONENT
// =================================================================

export default function EternalUINavigation({
  children,
  className = ''
}: EternalUINavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle expanded navigation items
  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  // Render navigation item
  const renderNavigationItem = useCallback((item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const Icon = item.icon;

    return (
      <div key={item.id}>
        <div
          className={`
            flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
            ${level > 0 ? 'ml-4' : ''}
            ${item.isActive
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else if (item.onClick) {
              item.onClick();
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          {hasChildren && (
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  }, [expandedItems, toggleExpanded]);

  // Render user menu
  const renderUserMenu = useCallback(() => {
    return (
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-medium">
            JD
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-gray-900">John Doe</div>
            <div className="text-xs text-gray-500">john@example.com</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-1">
              <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <User className="w-4 h-4 mr-3" />
                Profile
              </a>
              <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </a>
              <a href="/favorites" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Star className="w-4 h-4 mr-3" />
                Favorites
              </a>
              <div className="border-t border-gray-100 my-1"></div>
              <a href="/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <HelpCircle className="w-4 h-4 mr-3" />
                Help & Support
              </a>
              <a href="/logout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <X className="w-4 h-4 mr-3" />
                Sign Out
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }, [isUserMenuOpen]);

  return (
    <>
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {/* Logo */}

                <EternalUILogo className="w-10 h-10 transition-transform group-hover:scale-110"
                  size='lg' />

                {/* <div>
                  {/* <h1 className="text-xl font-bold text-gray-900">Eternal UI</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Component Library</p>
                </div> */}
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1 ml-8">
                {navigationItems.map(item => (
                  <div key={item.id} className="relative group">
                    <a
                      href={item.href}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${item.isActive
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>

                    {/* Dropdown for items with children */}
                    {item.children && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="py-1">
                          {item.children.map(child => (
                            <a
                              key={child.id}
                              href={child.href}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <child.icon className="w-4 h-4 mr-3" />
                              {child.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Page-specific Actions (will be replaced by children) */}
            {children}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-600" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              {renderUserMenu()}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <div className="space-y-2">
                {navigationItems.map(item => renderNavigationItem(item))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}