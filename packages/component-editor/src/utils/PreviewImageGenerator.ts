export const PreviewImageGenerator = {
  async generatePreviewImage(componentCode: string, componentName: string): Promise<string> {
    try {
      const response = await fetch('/api/generate-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          html: `<div>${componentCode}</div>`, 
          componentName,
          width: 400,
          height: 300
        })
      })
      
      if (!response.ok) throw new Error('Failed to generate preview')
      
      const { imageUrl } = await response.json()
      return imageUrl
    } catch (error) {
      console.error('Preview generation failed:', error)
      return '/placeholder-preview.png'
    }
  },

  async generateBatchPreviewImages(components: Array<{id: string, code: string, name: string}>): Promise<Record<string, string>> {
    const results: Record<string, string> = {}
    
    for (const component of components) {
      try {
        const imageUrl = await this.generatePreviewImage(component.code, component.name)
        results[component.id] = imageUrl
      } catch (error) {
        console.error(`Failed to generate preview for ${component.name}:`, error)
        results[component.id] = '/placeholder-preview.png'
      }
    }
    
    return results
  }
}