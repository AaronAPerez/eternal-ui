/**
 * Export Hook
 * 
 * Custom hook for managing export functionality with state management,
 * progress tracking, and error handling.
 */

import { useState, useCallback, useRef } from 'react'
import { ExportEngine } from '@eternal-ui/core/export'
import { ComponentNode, ExportConfig, ExportResult } from '@eternal-ui/core/types/types'

interface UseExportReturn {
  isExporting: boolean
  exportProgress: number
  progressMessage: string
  exportResult: ExportResult | null
  error: string | null
  exportProject: (components: ComponentNode[], config: ExportConfig) => Promise<void>
  downloadProject: () => Promise<void>
  clearError: () => void
  resetExport: () => void
}

/**
 * useExport Hook
 * 
 * Manages the complete export workflow including progress tracking,
 * error handling, and file generation.
 */
export const useExport = (): UseExportReturn => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [progressMessage, setProgressMessage] = useState('')
  const [exportResult, setExportResult] = useState<ExportResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const exportEngine = useRef(new ExportEngine())

  // Set up progress callback
  exportEngine.current.setProgressCallback((progress: number, message: string) => {
    setExportProgress(progress)
    setProgressMessage(message)
  })

  /**
   * Exports a project with the given components and configuration
   */
  const exportProject = useCallback(async (
    components: ComponentNode[], 
    config: ExportConfig
  ) => {
    try {
      setIsExporting(true)
      setError(null)
      setExportProgress(0)
      setProgressMessage('Initializing export...')

      const result = await exportEngine.current.export(components, config)
      setExportResult(result)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Export failed unexpectedly'
      setError(errorMessage)
    } finally {
      setIsExporting(false)
    }
  }, [])

  /**
   * Downloads the exported project as a ZIP file
   */
  const downloadProject = useCallback(async () => {
    if (!exportResult) {
      setError('No export result available for download')
      return
    }

    try {
      // Dynamically import JSZip to avoid blocking initial load
      const { default: JSZip } = await import('jszip')
      const zip = new JSZip()

      // Add all generated files to ZIP
      exportResult.files.forEach(file => {
        zip.file(file.path, file.content)
      })

      // Add package.json with dependencies
      const packageJson = {
        name: 'eternal-ui-export',
        version: '1.0.0',
        description: 'Exported project from Eternal UI',
        dependencies: exportResult.dependencies,
        devDependencies: exportResult.devDependencies,
        scripts: exportResult.scripts
      }
      zip.file('package.json', JSON.stringify(packageJson, null, 2))

      // Generate and trigger download
      const content = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      })
      
      const url = URL.createObjectURL(content)
      const link = document.createElement('a')
      link.href = url
      link.download = `eternal-ui-export-${Date.now()}.zip`
      link.click()
      
      // Cleanup
      URL.revokeObjectURL(url)

    } catch (err) {
      const errorMessage = 'Download failed. Please try again.'
      setError(errorMessage)
    }
  }, [exportResult])

  /**
   * Clears the current error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Resets the export state
   */
  const resetExport = useCallback(() => {
    setIsExporting(false)
    setExportProgress(0)
    setProgressMessage('')
    setExportResult(null)
    setError(null)
  }, [])

  return {
    isExporting,
    exportProgress,
    progressMessage,
    exportResult,
    error,
    exportProject,
    downloadProject,
    clearError,
    resetExport
  }
}