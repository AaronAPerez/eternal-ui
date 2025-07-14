// components/GridBuilderModal.tsx
import { Dialog } from '@headlessui/react';
import DarkModeEnhancedGridSystem from './grid/DarkModeEnhancedGridSystem';

interface GridBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GridBuilderModal: React.FC<GridBuilderModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-7xl h-full bg-white dark:bg-gray-900 rounded-lg">
          <DarkModeEnhancedGridSystem />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};