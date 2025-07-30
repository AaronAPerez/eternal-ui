import React from 'react';
import { Save } from 'lucide-react';

export const AutoSaveIndicator: React.FC = () => {
  return (
    <span className="flex items-center gap-1">
      <Save className="w-3 h-3" />
      Auto-save enabled
    </span>
  );
};