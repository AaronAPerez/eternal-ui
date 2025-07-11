// Simple test to verify our components can be imported
try {
  console.log('🎨 Testing Eternal UI Core Components');
  
  // Test if we can require the main module
  const coreModule = require('./dist/index.js');
  console.log('✅ Core module loaded:', Object.keys(coreModule).length, 'exports');
  
  // List all exports
  console.log('📦 Available exports:', Object.keys(coreModule).join(', '));
  
  // Test specific imports
  const hasButton = 'Button' in coreModule;
  const hasInput = 'Input' in coreModule;
  const hasContainer = 'Container' in coreModule;
  const hasGrid = 'Grid' in coreModule;
  const hasCard = 'Card' in coreModule;
  
  console.log('✅ Button component:', hasButton ? 'LOADED' : 'FAILED');
  console.log('✅ Input component:', hasInput ? 'LOADED' : 'FAILED');
  console.log('✅ Container component:', hasContainer ? 'LOADED' : 'FAILED');
  console.log('✅ Grid component:', hasGrid ? 'LOADED' : 'FAILED');
  console.log('✅ Card component:', hasCard ? 'LOADED' : 'FAILED');
  
  if (hasButton && hasInput && hasContainer && hasGrid && hasCard) {
    console.log('\n🚀 All core components loaded successfully!');
    console.log('📦 Ready to build the visual builder interface!');
  } else {
    console.log('\n❌ Some components failed to load');
  }
  
} catch (error) {
  console.error('❌ Test failed:', error.message);
  console.log('\n🔍 Checking if dist folder exists...');
  
  const fs = require('fs');
  try {
    const files = fs.readdirSync('./dist');
    console.log('📁 Dist folder contents:', files);
  } catch (e) {
    console.log('❌ Dist folder not found');
  }
}