import { useState, useCallback } from 'react'

export interface GridSection {
  id: string
  name: string
  startRow: number
  endRow: number
  color: string
  locked?: boolean
  visible?: boolean
}

export function useGridSections(initialSections: GridSection[] = []) {
  const [sections, setSections] = useState<GridSection[]>(initialSections)

  const addSection = useCallback((section: Omit<GridSection, 'id'>) => {
    const newSection: GridSection = {
      ...section,
      id: `section-${Date.now()}`,
      visible: true
    }
    setSections(prev => [...prev, newSection])
    return newSection.id
  }, [])

  const updateSection = useCallback((id: string, updates: Partial<GridSection>) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }, [])

  const removeSection = useCallback((id: string) => {
    setSections(prev => prev.filter(s => s.id !== id))
  }, [])

  const duplicateSection = useCallback((id: string) => {
    const section = sections.find(s => s.id === id)
    if (section) {
      const newSection: GridSection = {
        ...section,
        id: `section-${Date.now()}`,
        name: `${section.name} Copy`
      }
      setSections(prev => [...prev, newSection])
      return newSection.id
    }
  }, [sections])

  const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
    setSections(prev => {
      const newSections = [...prev]
      const [moved] = newSections.splice(fromIndex, 1)
      newSections.splice(toIndex, 0, moved)
      return newSections
    })
  }, [])

  return {
    sections,
    setSections,
    addSection,
    updateSection,
    removeSection,
    duplicateSection,
    reorderSections
  }
}