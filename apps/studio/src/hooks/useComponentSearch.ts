import { useState, useMemo } from 'react'
import { ComponentMetadata } from '../data/components'

export const useComponentSearch = (
  components: ComponentMetadata[],
  selectedCategory: string
) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredComponents = useMemo(() => {
    let filtered = components

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(component => 
        component.category === selectedCategory
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(component =>
        component.name.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query) ||
        component.tags.some(tag => tag.toLowerCase().includes(query)) ||
        component.category.toLowerCase().includes(query)
      )
    }

    // Sort by popularity
    return filtered.sort((a, b) => b.popularity - a.popularity)
  }, [components, selectedCategory, searchQuery])

  const searchStats = useMemo(() => ({
    total: components.length,
    filtered: filteredComponents.length
  }), [components.length, filteredComponents.length])

  return {
    searchQuery,
    setSearchQuery,
    filteredComponents,
    searchStats
  }
}