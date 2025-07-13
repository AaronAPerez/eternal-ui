/**
 * 🔍 ERROR SEARCH HOOK
 * 
 * Custom hook for searching and filtering error solutions
 */
import { useState, useMemo } from 'react'
import { ErrorSolution } from '@/types/errors'

export function useErrorSearch(solutions: ErrorSolution[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSeverity, setSelectedSeverity] = useState('All')
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'severity'>('relevance')

  const filteredAndSortedSolutions = useMemo(() => {
    let filtered = solutions.filter(solution => {
      const matchesSearch = searchQuery === '' || 
        solution.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solution.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
        solution.errorMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        solution.symptoms.some(symptom => symptom.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === 'All' || solution.category === selectedCategory
      const matchesSeverity = selectedSeverity === 'All' || solution.severity.toLowerCase() === selectedSeverity.toLowerCase()

      return matchesSearch && matchesCategory && matchesSeverity
    })

    // Sort results
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    } else if (sortBy === 'severity') {
      const severityOrder = { high: 3, medium: 2, low: 1 }
      filtered.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity])
    }
    // relevance is default order

    return filtered
  }, [solutions, searchQuery, selectedCategory, selectedSeverity, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedSeverity('All')
    setSortBy('relevance')
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSeverity,
    setSelectedSeverity,
    sortBy,
    setSortBy,
    filteredSolutions: filteredAndSortedSolutions,
    totalResults: filteredAndSortedSolutions.length,
    clearFilters
  }
}
