import React from 'react';
import { Palette, Play, Download } from 'lucide-react';

interface ActionButtonsProps {
  onToggleTemplateLibrary: () => void;
  onTogglePreview: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onToggleTemplateLibrary,
  onTogglePreview
}) => {
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export functionality to be implemented');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggleTemplateLibrary}
        className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
      >
        <Palette className="w-4 h-4" />
        Templates
      </button>

      <button
        onClick={onTogglePreview}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Play className="w-4 h-4" />
        {/* Preview */}
      </button>

      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        Export
      </button>
    </div>
  );
};