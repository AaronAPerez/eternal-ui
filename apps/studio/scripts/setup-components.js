const fs = require('fs-extra');
const path = require('path');

const components = [
  'BrowserGridSystem.tsx',
  'ComponentLibrary.tsx', 
  'SectionManager.tsx',
  'DarkModeGridControlsPanel.tsx',
  'DarkModePropertiesPanel.tsx',
  'DraggableResizableComponent.tsx',
  'CollapsibleSection.tsx',
  'SnapConfigTab.tsx',
  'GridSnapSystem.tsx'
];

async function setupComponents() {
  // Create directories
  await fs.ensureDir('src/components/grid');
  await fs.ensureDir('src/components/ui');
  await fs.ensureDir('src/hooks');
  await fs.ensureDir('src/types');
  await fs.ensureDir('src/utils');

  console.log('✅ Created component directories');
  console.log('📋 Copy the component files from Claude to:');
  
  components.forEach(component => {
    console.log(`   → src/components/grid/${component}`);
  });
  
  console.log('📋 Copy supporting files to:');
  console.log('   → src/types/grid.ts');
  console.log('   → src/hooks/useTheme.ts');
  console.log('   → src/hooks/useGridConfig.ts');
  console.log('   → src/components/ui/LoadingSpinner.tsx');
}

setupComponents().catch(console.error);