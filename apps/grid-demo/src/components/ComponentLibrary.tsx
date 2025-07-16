'use client'

import React, { useState } from 'react'
import { EditComponentModal } from './EditComponentModal'
import { Search, Grid as GridIcon, List, Plus, Star, Edit } from 'lucide-react'

// Define types locally for now
interface ComponentData {
    id: string
    name: string
    description: string
    category: string
    tags: string[]
    complexity: 'beginner' | 'intermediate' | 'advanced'
    isPremium: boolean
    popularity: number
}

// Sample data
const sampleComponents: ComponentData[] = [
    {
        id: 'hero-section',
        name: 'Hero Section',
        description: 'A beautiful hero section with gradient background and call-to-action buttons',
        category: 'layout',
        tags: ['hero', 'header', 'gradient'],
        complexity: 'beginner',
        isPremium: false,
        popularity: 95
    },
    {
        id: 'feature-card',
        name: 'Feature Card',
        description: 'A clean feature card with icon, title, and description',
        category: 'content',
        tags: ['card', 'feature', 'icon'],
        complexity: 'beginner',
        isPremium: false,
        popularity: 88
    },
    {
        id: 'contact-form',
        name: 'Contact Form',
        description: 'A responsive contact form with validation',
        category: 'forms',
        tags: ['form', 'contact', 'validation'],
        complexity: 'intermediate',
        isPremium: true,
        popularity: 75
    }
]

interface ComponentCardProps {
    component: ComponentData
    viewMode: 'grid' | 'list'
    isFavorite: boolean
    onToggleFavorite: (id: string) => void
    onEdit: () => void
    onUse: (id: string) => void
}

const ComponentCard: React.FC<ComponentCardProps> = ({
    component,
    viewMode,
    isFavorite,
    onToggleFavorite,
    onEdit,
    onUse
}) => {
    const complexityColors = {
        beginner: 'bg-green-100 text-green-800',
        intermediate: 'bg-yellow-100 text-yellow-800',
        advanced: 'bg-red-100 text-red-800'
    }

    return (
        <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{component.name}</h4>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(component.id)
                    }}
                    className={`p-1 rounded transition-colors ${isFavorite
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-300 hover:text-gray-500'
                        }`}
                >
                    <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
            </div>

            <p className="text-sm text-gray-600 mb-3">{component.description}</p>

            <div className="flex items-center justify-between mb-3">
                <span className={`inline-block px-2 py-1 text-xs rounded ${complexityColors[component.complexity]}`}>
                    {component.complexity}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star className="w-3 h-3" />
                    {component.popularity}
                </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
                {component.tags.slice(0, 3).map(tag => (
                    <span
                        key={tag}
                        className="inline-block px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onEdit}
                    className="flex-1 px-3 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1"
                >
                    <Edit className="w-3 h-3" />
                    Edit
                </button>
                <button
                    onClick={() => onUse(component.id)}
                    className="flex-1 px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                >
                    Use
                </button>
            </div>
        </div>
    )
}

interface ComponentLibraryProps {
    components?: ComponentData[]
    onComponentUpdate?: (id: string, updates: Partial<ComponentData>) => void
    viewMode?: 'grid' | 'list'
    showAddButton?: boolean
    className?: string
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({
    components = sampleComponents,
    onComponentUpdate = () => { },
    viewMode: initialViewMode = 'grid',
    showAddButton = true,
    className = ''
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode)
    const [favorites, setFavorites] = useState<Set<string>>(new Set())
    const [editingComponent, setEditingComponent] = useState<ComponentData | null>(null)

    // Filter components
    const filteredComponents = components.filter(component => {
        const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const categories = ['all', 'layout', 'content', 'forms', 'data', 'commerce']

    const handleToggleFavorite = (componentId: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev)
            if (newFavorites.has(componentId)) {
                newFavorites.delete(componentId)
            } else {
                newFavorites.add(componentId)
            }
            return newFavorites
        })
    }

    const handleEditComponent = (component: ComponentData) => {
        setEditingComponent(component)
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Search and Filter Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-1 max-w-lg items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    {showAddButton && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            <Plus className="w-4 h-4" />
                            Add Component
                        </button>
                    )}

                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <GridIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
                {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} found
            </div>

            {/* Component Grid */}
            <div className={
                viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
            }>
                {filteredComponents.map(component => (
                    <ComponentCard
                        key={component.id}
                        component={component}
                        viewMode={viewMode}
                        isFavorite={favorites.has(component.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onEdit={() => handleEditComponent(component)}
                        onUse={(id) => console.log('Using component:', id)}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredComponents.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No components found matching your criteria</p>
                    <button
                        onClick={() => {
                            setSearchQuery('')
                            setSelectedCategory('all')
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
            {/* Edit Modal */}
            {editingComponent && (
                <EditComponentModal
                    component={editingComponent}
                    isOpen={true}
                    onClose={() => setEditingComponent(null)}
                    onSave={(updatedComponent) => {
                        console.log('Component saved:', updatedComponent)
                        setEditingComponent(null)
                        onComponentUpdate(updatedComponent.id, updatedComponent)
                    }}
                />
            )}
        </div>
    )
}