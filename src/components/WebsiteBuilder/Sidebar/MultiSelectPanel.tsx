import React from 'react';
import { Grid3X3, Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useStores } from '@/hooks/useStores';
import { useBulkOperations } from '@/hooks/useBulkOperations';

interface MultiSelectPanelProps {
  selectedComponents: string[];
}

export const MultiSelectPanel: React.FC<MultiSelectPanelProps> = ({ selectedComponents }) => {
  const { actions } = useStores();
  const bulkOperations = useBulkOperations();

  return (
    <div className="p-4 text-center">
      <div className="text-lg font-medium text-gray-900 mb-4">
        {selectedComponents.length} components selected
      </div>
      
      {/* Alignment Tools */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alignment
        </label>
        <div className="grid grid-cols-3 gap-1 mb-2">
          <button 
            onClick={() => bulkOperations.align('left')}
            className="p-2 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200 transition-colors flex items-center justify-center"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => bulkOperations.align('center')}
            className="p-2 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200 transition-colors flex items-center justify-center"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button 
            onClick={() => bulkOperations.align('right')}
            className="p-2 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200 transition-colors flex items-center justify-center"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Distribution Tools */}
      {selectedComponents.length >= 3 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distribution
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button 
              onClick={() => bulkOperations.distribute('horizontal')}
              className="px-3 py-2 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200 transition-colors"
            >
              Distribute ↔
            </button>
            <button 
              onClick={() => bulkOperations.distribute('vertical')}
              className="px-3 py-2 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200 transition-colors"
            >
              Distribute ↕
            </button>
          </div>
        </div>
      )}

      {/* Group/Delete Actions */}
      <div className="space-y-2">
        <button 
          onClick={bulkOperations.group}
          className="w-full px-3 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
        >
          <Grid3X3 className="w-4 h-4" />
          Group Components
        </button>
        
        <button 
          onClick={() => actions.deleteMultipleComponentsWithHistory(selectedComponents)}
          className="w-full px-3 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete Selected
        </button>
      </div>
    </div>
  );
};