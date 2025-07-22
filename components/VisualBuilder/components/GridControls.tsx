import { useGridCanvas } from '@/components/builder/GridSystem';
import { GridSettings } from '@/lib/grid-system';

export function GridControls() {
  const { gridSettings, updateGridSettings } = useGridCanvas();

  return (
    <div className="grid-controls">
      <GridSettings
        gridEnabled={gridSettings.enabled}
        onToggleGrid={(enabled) => updateGridSettings({ enabled })}
        gridSize={gridSettings.size}
        onGridSizeChange={(size) => updateGridSettings({ size })}
        snapEnabled={gridSettings.snapEnabled}
        onToggleSnap={(snapEnabled) => updateGridSettings({ snapEnabled })}
        showGuides={gridSettings.showGuides}
        onToggleGuides={(showGuides) => updateGridSettings({ showGuides })}
      />
    </div>
  );
}