import { ComponentLibrary, ComponentDataManager } from '@repo/component-editor'

export default function ComponentsTestPage() {
  const components = ComponentDataManager.getAllComponents()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Component Library Test</h1>
      <ComponentLibrary 
        components={components}
        onComponentUpdate={(id, updates) => {
          console.log('Component updated:', id, updates)
        }}
      />
    </div>
  )
}