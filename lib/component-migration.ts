import { EnhancedComponentMeta } from "@/components/studio/ComponentLibrary/ComponentLibrary";


export function migrateComponent(oldComponent: ComponentMeta): EnhancedComponentMeta {
  return {
    ...oldComponent,
    // Add new required fields
    framework: ['react', 'vue', 'angular', 'html'],
    accessibility: {
      screenReader: true,
      keyboardNavigation: true,
      focusManagement: true,
      colorContrast: 'AA'
    },
    performance: {
      bundleSize: oldComponent.bundleSize || 5,
      renderScore: oldComponent.renderScore || 90,
      lazyLoadable: true
    },
    variants: [],
    dependencies: [],
    documentation: {
      usage: `Use ${oldComponent.name} for ${oldComponent.description}`,
      examples: [oldComponent.codeExample],
      bestPractices: ['Follow accessibility guidelines', 'Use semantic HTML']
    }
  };
}