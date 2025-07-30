import { useState, useCallback, useRef } from 'react';
import { MultiFrameworkExporter, ExportConfig, ExportResult } from '@/services/export/multiFrameworkExporter';
import { Template } from '@/services/templates/advancedTemplateEngine';

interface ExportState {
  isExporting: boolean;
  progress: number;
  currentStep: string;
  result: ExportResult | null;
  error: string | null;
  downloadUrl: string | null;
}

/**
 * 🚀 USE MULTI-FRAMEWORK EXPORT HOOK
 */
export function useMultiFrameworkExport() {
  const [state, setState] = useState<ExportState>({
    isExporting: false,
    progress: 0,
    currentStep: '',
    result: null,
    error: null,
    downloadUrl: null,
  });

  const exporterRef = useRef<MultiFrameworkExporter | null>(null);

  // Initialize exporter
  useEffect(() => {
    if (!exporterRef.current) {
      exporterRef.current = new MultiFrameworkExporter();
    }
  }, []);

  /**
   * 📤 EXPORT PROJECT
   */
  const exportProject = useCallback(async (
    template: Template,
    config: ExportConfig
  ) => {
    if (!exporterRef.current) {
      setState(prev => ({ ...prev, error: 'Exporter not initialized' }));
      return null;
    }

    setState(prev => ({
      ...prev,
      isExporting: true,
      progress: 0,
      currentStep: 'Preparing export...',
      error: null,
      downloadUrl: null,
    }));

    try {
      setState(prev => ({ ...prev, currentStep: 'Generating code...', progress: 20 }));

      const result = await exporterRef.current.exportProject(template, config);

      setState(prev => ({ ...prev, currentStep: 'Creating package...', progress: 60 }));

      const packageBlob = await exporterRef.current.createDownloadablePackage(template, config);
      const downloadUrl = URL.createObjectURL(packageBlob);

      setState(prev => ({
        ...prev,
        isExporting: false,
        progress: 100,
        currentStep: 'Export completed!',
        result,
        downloadUrl,
      }));

      return { result, downloadUrl };

    } catch (error) {
      setState(prev => ({
        ...prev,
        isExporting: false,
        error: error instanceof Error ? error.message : 'Export failed',
        progress: 0,
        currentStep: '',
      }));
      return null;
    }
  }, []);

  /**
   * 💾 DOWNLOAD PACKAGE
   */
  const downloadPackage = useCallback((filename?: string) => {
    if (!state.downloadUrl) return;

    const link = document.createElement('a');
    link.href = state.downloadUrl;
    link.download = filename || 'eternal-ui-project.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [state.downloadUrl]);

  /**
   * 🧹 CLEANUP
   */
  const cleanup = useCallback(() => {
    if (state.downloadUrl) {
      URL.revokeObjectURL(state.downloadUrl);
      setState(prev => ({ ...prev, downloadUrl: null }));
    }
  }, [state.downloadUrl]);

  return {
    ...state,
    exportProject,
    downloadPackage,
    cleanup,
    canExport: !state.isExporting && exporterRef.current !== null,
  };
}
