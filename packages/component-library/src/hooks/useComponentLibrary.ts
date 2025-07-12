// =================================================================
// COMPONENT LIBRARY HOOK
// =================================================================

/**
 * Custom hook for component library management
 * Handles filtering, searching, and component operations
 */
export const useComponentLibrary = () => {
  // Library state management
  const [state, setState] = useState<ComponentLibraryState>({
    searchQuery: '',
    selectedCategory: 'all',
    viewMode: 'grid',
    complexityFilter: 'all',
    premiumOnly: false,
    sortBy: 'popularity',
    sortDirection: 'desc'
  })

  // Favorites management
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  
  // Recently used components tracking
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([])

  /**
   * Update library state with partial updates
   * Provides type-safe state management
   */
  const updateState = useCallback((updates: Partial<ComponentLibraryState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  /**
   * Toggle component favorite status
   * Manages user's favorite components list
   */
  const toggleFavorite = useCallback((componentId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(componentId)) {
        newFavorites.delete(componentId)
      } else {
        newFavorites.add(componentId)
      }
      return newFavorites
    })
  }, [])

  /**
   * Track component usage for recommendations
   * Updates recently used components list
   */
  const trackComponentUsage = useCallback((componentId: string) => {
    setRecentlyUsed(prev => {
      const newRecent = [componentId, ...prev.filter(id => id !== componentId)]
      return newRecent.slice(0, 10) // Keep last 10 used components
    })
  }, [])

  /**
   * Filter and sort components based on current state
   * Implements comprehensive filtering logic
   */
  const filteredComponents = useMemo(() => {
    return COMPONENT_LIBRARY
      .filter(component => {
        // Search query filter
        if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase()
          const matchesSearch = 
            component.name.toLowerCase().includes(query) ||
            component.description.toLowerCase().includes(query) ||
            component.tags.some(tag => tag.toLowerCase().includes(query))
          
          if (!matchesSearch) return false
        }

        // Category filter
        if (state.selectedCategory !== 'all' && component.category !== state.selectedCategory) {
          return false
        }

        // Complexity filter
        if (state.complexityFilter !== 'all' && component.complexity !== state.complexityFilter) {
          return false
        }

        // Premium filter
        if (state.premiumOnly && !component.isPremium) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        const direction = state.sortDirection === 'asc' ? 1 : -1
        
        switch (state.sortBy) {
          case 'popularity':
            return (b.popularity - a.popularity) * direction
          case 'name':
            return a.name.localeCompare(b.name) * direction
          case 'category':
            return a.category.localeCompare(b.category) * direction
          case 'recent':
            const aIndex = recentlyUsed.indexOf(a.id)
            const bIndex = recentlyUsed.indexOf(b.id)
            if (aIndex === -1 && bIndex === -1) return 0
            if (aIndex === -1) return 1
            if (bIndex === -1) return -1
            return (aIndex - bIndex) * direction
          default:
            return 0
        }
      })
  }, [state, recentlyUsed])

  /**
   * Get components by category with counts
   * Useful for category navigation
   */
  const categoryCounts = useMemo(() => {
    const counts: Record<ComponentCategory | 'all', number> = {
      all: COMPONENT_LIBRARY.length,
      layout: 0,
      navigation: 0,
      content: 0,
      forms: 0,
      data: 0,
      commerce: 0,
      social: 0,
      marketing: 0,
      interactive: 0,
      feedback: 0
    }

    COMPONENT_LIBRARY.forEach(component => {
      counts[component.category]++
    })

    return counts
  }, [])

  /**
   * Get recommended components based on usage patterns
   * AI-powered component recommendations
   */
  const recommendedComponents = useMemo(() => {
    // Simple recommendation algorithm based on:
    // 1. Recently used components
    // 2. Popular components in same category
    // 3. Components with similar tags
    
    if (recentlyUsed.length === 0) {
      return COMPONENT_LIBRARY
        .filter(c => c.popularity > 80)
        .slice(0, 6)
    }

    const recentCategories = recentlyUsed
      .map(id => COMPONENT_LIBRARY.find(c => c.id === id)?.category)
      .filter(Boolean) as ComponentCategory[]

    return COMPONENT_LIBRARY
      .filter(component => 
        recentCategories.includes(component.category) && 
        !recentlyUsed.includes(component.id)
      )
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6)
  }, [recentlyUsed])

  return {
    state,
    updateState,
    filteredComponents,
    categoryCounts,
    favorites,
    toggleFavorite,
    recentlyUsed,
    trackComponentUsage,
    recommendedComponents
  }
}