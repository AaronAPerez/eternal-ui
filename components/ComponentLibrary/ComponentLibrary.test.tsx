// // =================================================================
// // TESTING UTILITIES
// // =================================================================

// /**
//  * Test utilities for component library functionality
//  * Supports comprehensive testing of search, filter, and interaction features
//  */
// export const componentLibraryTestUtils = {
//   /**
//    * Create test component metadata
//    */
//   createTestComponent: (overrides: Partial<ComponentMeta> = {}): ComponentMeta => ({
//     id: 'test-component',
//     name: 'Test Component',
//     description: 'A test component for unit testing',
//     category: 'layout',
//     tags: ['test', 'component'],
//     complexity: 'basic',
//     popularity: 50,
//     isPremium: false,
//     propsSchema: {
//       text: {
//         type: 'string',
//         label: 'Text',
//         default: 'Test text'
//       }
//     },
//     defaultProps: {
//       text: 'Test text'
//     },
//     variants: [
//       {
//         id: 'test-variant',
//         name: 'Test Variant',
//         description: 'Test variant description',
//         isDefault: true,
//         props: {}
//       }
//     ],
//     accessibility: {
//       wcagLevel: 'AA',
//       screenReader: true,
//       keyboardNav: true,
//       colorContrast: true,
//       focusManagement: true,
//       ariaSupport: true
//     },
//     seo: {
//       semanticHTML: true,
//       structuredData: false,
//       openGraph: false,
//       coreWebVitals: true,
//       imageOptimization: false
//     },
//     performance: {
//       bundleSize: 1.0,
//       renderScore: 95,
//       memoryImpact: 'low',
//       lazyLoading: false
//     },
//     ...overrides
//   }),

//   /**
//    * Mock component library state for testing
//    */
//   createTestState: (overrides: Partial<ComponentLibraryState> = {}): ComponentLibraryState => ({
//     searchQuery: '',
//     selectedCategory: 'all',
//     viewMode: 'grid',
//     complexityFilter: 'all',
//     premiumOnly: false,
//     sortBy: 'popularity',
//     sortDirection: 'desc',
//     ...overrides
//   }),

//   /**
//    * Filter components by search query for testing
//    */
//   filterBySearch: (components: ComponentMeta[], query: string): ComponentMeta[] => {
//     if (!query) return components
    
//     const lowercaseQuery = query.toLowerCase()
//     return components.filter(component =>
//       component.name.toLowerCase().includes(lowercaseQuery) ||
//       component.description.toLowerCase().includes(lowercaseQuery) ||
//       component.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
//     )
//   },

//   /**
//    * Filter components by category for testing
//    */
//   filterByCategory: (components: ComponentMeta[], category: ComponentCategory | 'all'): ComponentMeta[] => {
//     if (category === 'all') return components
//     return components.filter(component => component.category === category)
//   },

//   /**
//    * Sort components for testing
//    */
//   sortComponents: (
//     components: ComponentMeta[], 
//     sortBy: ComponentLibraryState['sortBy'],
//     direction: 'asc' | 'desc' = 'desc'
//   ): ComponentMeta[] => {
//     const multiplier = direction === 'asc' ? 1 : -1
    
//     return [...components].sort((a, b) => {
//       switch (sortBy) {
//         case 'popularity':
//           return (b.popularity - a.popularity) * multiplier
//         case 'name':
//           return a.name.localeCompare(b.name) * multiplier
//         case 'category':
//           return a.category.localeCompare(b.category) * multiplier
//         default:
//           return 0
//       }
//     })
//   }
// }