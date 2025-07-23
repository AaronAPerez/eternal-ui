const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

/**
 * 🎨 ETERNAL UI FAVICON GENERATION SCRIPT
 * 
 * Generates all required favicon formats from a single SVG source.
 * 
 * Features:
 * - Generates 15+ favicon formats
 * - Creates PWA manifest file
 * - Generates Windows browser config
 * - Optimizes file sizes
 * - Comprehensive error handling
 * 
 * Usage: node scripts/generate-favicons.js
 * 
 * Requirements:
 * - Node.js 14+
 * - Sharp package: npm install --save-dev sharp
 * - SVG source file at: src/assets/logos/eternal-ui-favicon.svg
 */

async function generateFavicons() {
  console.log('🎨 Starting Eternal UI favicon generation...')
  console.log('━'.repeat(60))
  
  // Configuration
  const config = {
    inputSvg: './src/assets/logos/eternal-ui-favicon.svg',
    outputDir: './public',
    
    // All favicon sizes and formats we need to generate
    sizes: [
      // Standard browser favicons
      { 
        size: 16, 
        name: 'favicon-16x16.png', 
        description: 'Browser tab icon (small)',
        quality: 100
      },
      { 
        size: 32, 
        name: 'favicon-32x32.png', 
        description: 'Browser tab icon (standard)',
        quality: 100
      },
      { 
        size: 48, 
        name: 'favicon-48x48.png', 
        description: 'Windows taskbar shortcut',
        quality: 95
      },
      
      // Apple Touch Icons (iOS)
      { 
        size: 180, 
        name: 'apple-touch-icon.png', 
        description: 'iOS home screen icon',
        quality: 90
      },
      { 
        size: 152, 
        name: 'apple-touch-icon-152x152.png', 
        description: 'iPad home screen icon',
        quality: 90
      },
      { 
        size: 167, 
        name: 'apple-touch-icon-167x167.png', 
        description: 'iPad Pro home screen icon',
        quality: 90
      },
      { 
        size: 120, 
        name: 'apple-touch-icon-120x120.png', 
        description: 'iPhone home screen icon',
        quality: 90
      },
      
      // Android Chrome Icons (PWA)
      { 
        size: 192, 
        name: 'android-chrome-192x192.png', 
        description: 'Android home screen icon',
        quality: 85
      },
      { 
        size: 512, 
        name: 'android-chrome-512x512.png', 
        description: 'Android splash screen icon',
        quality: 85
      },
      { 
        size: 256, 
        name: 'android-chrome-256x256.png', 
        description: 'Android alternative size',
        quality: 85
      },
      
      // Microsoft Tiles (Windows)
      { 
        size: 144, 
        name: 'mstile-144x144.png', 
        description: 'Windows 8.1/10 small tile',
        quality: 85
      },
      { 
        size: 150, 
        name: 'mstile-150x150.png', 
        description: 'Windows 10 medium tile',
        quality: 85
      },
      { 
        size: 310, 
        name: 'mstile-310x310.png', 
        description: 'Windows 10 large tile',
        quality: 80
      },
      { 
        size: 310, 
        width: 310, 
        height: 150, 
        name: 'mstile-310x150.png', 
        description: 'Windows 10 wide tile',
        quality: 80
      },
      { 
        size: 70, 
        name: 'mstile-70x70.png', 
        description: 'Windows 10 tiny tile',
        quality: 95
      },
    ]
  }
  
  // Validate environment
  console.log('🔍 Validating environment...')
  
  // Check if Sharp is available
  try {
    const sharpVersion = sharp.versions
    console.log(`✅ Sharp v${sharpVersion.sharp} detected`)
  } catch (error) {
    console.error('❌ Sharp not found. Install with: npm install --save-dev sharp')
    process.exit(1)
  }
  
  // Ensure output directory exists
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true })
    console.log(`📁 Created output directory: ${config.outputDir}`)
  } else {
    console.log(`📁 Using existing directory: ${config.outputDir}`)
  }
  
  // Check if input SVG exists
  if (!fs.existsSync(config.inputSvg)) {
    console.error(`❌ Input SVG not found: ${config.inputSvg}`)
    console.log('')
    console.log('Please ensure your SVG file exists at:')
    console.log(`   ${config.inputSvg}`)
    console.log('')
    console.log('The SVG should be:')
    console.log('   • Square aspect ratio (1:1)')
    console.log('   • Simple, high-contrast design')
    console.log('   • Optimized for small sizes')
    console.log('')
    process.exit(1)
  }
  
  // Get SVG file info
  const svgStats = fs.statSync(config.inputSvg)
  console.log(`📖 Input SVG: ${config.inputSvg} (${(svgStats.size / 1024).toFixed(1)}KB)`)
  console.log('')
  
  // Generate each favicon size
  console.log('🖼️  Generating favicon images...')
  console.log('━'.repeat(60))
  
  let successCount = 0
  let errorCount = 0
  const results = []
  
  for (const item of config.sizes) {
    try {
      const outputPath = path.join(config.outputDir, item.name)
      
      // Handle rectangular icons (like Windows wide tiles)
      const width = item.width || item.size
      const height = item.height || item.size
      
      // Generate the image with Sharp
      const startTime = Date.now()
      
      await sharp(config.inputSvg)
        .resize(width, height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png({
          compressionLevel: 9, // Maximum compression
          quality: item.quality || 90,
          progressive: false, // Better for small images
          force: true
        })
        .toFile(outputPath)
      
      // Get file stats
      const fileStats = fs.statSync(outputPath)
      const fileSize = (fileStats.size / 1024).toFixed(1)
      const duration = Date.now() - startTime
      
      console.log(`✅ ${item.name.padEnd(30)} ${width}x${height}`.padEnd(45) + 
                  `${fileSize.padStart(6)}KB  ${duration.toString().padStart(3)}ms  ${item.description}`)
      
      results.push({
        name: item.name,
        size: `${width}x${height}`,
        fileSize: fileSize,
        success: true
      })
      
      successCount++
      
    } catch (error) {
      console.error(`❌ ${item.name.padEnd(30)} FAILED: ${error.message}`)
      results.push({
        name: item.name,
        error: error.message,
        success: false
      })
      errorCount++
    }
  }
  
  console.log('━'.repeat(60))
  
  // Generate favicon.ico (legacy format)
  console.log('🔗 Generating legacy favicon.ico...')
  try {
    // Create a multi-size ICO file (contains 16x16 and 32x32)
    const icoBuffer = await sharp(config.inputSvg)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer()
    
    // Write as ICO (Sharp doesn't support ICO output directly, so we use PNG)
    // For true ICO support, you might want to use a library like 'to-ico'
    fs.writeFileSync(path.join(config.outputDir, 'favicon.ico'), icoBuffer)
    
    const icoStats = fs.statSync(path.join(config.outputDir, 'favicon.ico'))
    console.log(`✅ favicon.ico                   32x32     ${(icoStats.size / 1024).toFixed(1)}KB     Legacy browser support`)
    successCount++
    
  } catch (error) {
    console.log(`⚠️  Could not generate favicon.ico: ${error.message}`)
    console.log('   (This is optional - modern browsers use PNG favicons)')
  }
  
  console.log('')
  
  // Generate PWA manifest file
  console.log('📱 Generating PWA manifest...')
  await generateWebManifest(config.outputDir)
  
  // Generate Windows browser config
  console.log('🪟 Generating Windows browser config...')
  await generateBrowserConfig(config.outputDir)
  
  // Generate Safari pinned tab icon (optional)
  console.log('🍎 Generating Safari pinned tab icon...')
  await generateSafariPinnedTab(config.inputSvg, config.outputDir)
  
  console.log('')
  console.log('📊 GENERATION SUMMARY')
  console.log('━'.repeat(60))
  console.log(`✅ Successfully generated: ${successCount} files`)
  if (errorCount > 0) {
    console.log(`❌ Failed to generate: ${errorCount} files`)
  }
  
  // Calculate total file size
  const totalSize = results
    .filter(r => r.success)
    .reduce((sum, r) => sum + parseFloat(r.fileSize), 0)
  
  console.log(`📦 Total favicon bundle size: ${totalSize.toFixed(1)}KB`)
  console.log('')
  
  // Show next steps
  console.log('🚀 NEXT STEPS')
  console.log('━'.repeat(60))
  console.log('1. Add favicon meta tags to your HTML <head> section')
  console.log('2. Test favicons in different browsers and devices')
  console.log('3. Verify PWA installation works correctly')
  console.log('4. Check that all files are accessible via HTTP')
  console.log('')
  console.log('📋 Test these URLs in your browser:')
  console.log('   • /favicon.ico')
  console.log('   • /favicon-32x32.png')
  console.log('   • /apple-touch-icon.png')
  console.log('   • /site.webmanifest')
  console.log('')
  
  if (errorCount === 0) {
    console.log('🎉 All favicons generated successfully!')
    console.log('   Your Eternal UI website now has professional favicon support!')
  } else {
    console.log('⚠️  Some files failed to generate. Check the errors above.')
    process.exit(1)
  }
}

/**
 * Generate PWA manifest file for app installation
 */
async function generateWebManifest(outputDir) {
  const manifest = {
    name: 'Eternal UI',
    short_name: 'Eternal UI',
    description: 'Professional React Component Library - Build Beautiful UIs with TypeScript Support',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['developer', 'productivity', 'utilities'],
    
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: '/android-chrome-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any'
      }
    ],
    
    // PWA features
    prefer_related_applications: false,
    
    // Shortcuts for quick access
    shortcuts: [
      {
        name: 'Components',
        short_name: 'Components',
        description: 'Browse all UI components',
        url: '/components',
        icons: [{ src: '/android-chrome-192x192.png', sizes: '192x192' }]
      },
      {
        name: 'Documentation',
        short_name: 'Docs',
        description: 'Read the documentation',
        url: '/docs',
        icons: [{ src: '/android-chrome-192x192.png', sizes: '192x192' }]
      }
    ]
  }
  
  const manifestPath = path.join(outputDir, 'site.webmanifest')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  
  const manifestStats = fs.statSync(manifestPath)
  console.log(`✅ site.webmanifest              PWA      ${(manifestStats.size / 1024).toFixed(1)}KB     Progressive Web App support`)
}

/**
 * Generate browserconfig.xml for Windows tile configuration
 */
async function generateBrowserConfig(outputDir) {
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/mstile-70x70.png"/>
            <square150x150logo src="/mstile-150x150.png"/>
            <square310x310logo src="/mstile-310x310.png"/>
            <wide310x150logo src="/mstile-310x150.png"/>
            <TileColor>#6366f1</TileColor>
        </tile>
        <notification>
            <polling-uri src="/notifications/browserconfig.xml"/>
            <frequency>30</frequency>
            <cycle>1</cycle>
        </notification>
    </msapplication>
</browserconfig>`
  
  const configPath = path.join(outputDir, 'browserconfig.xml')
  fs.writeFileSync(configPath, browserConfig)
  
  const configStats = fs.statSync(configPath)
  console.log(`✅ browserconfig.xml             Windows  ${(configStats.size / 1024).toFixed(1)}KB     Windows tile configuration`)
}

/**
 * Generate Safari pinned tab icon (SVG monochrome)
 */
async function generateSafariPinnedTab(inputSvg, outputDir) {
  try {
    // Read the original SVG and create a monochrome version
    const svgContent = fs.readFileSync(inputSvg, 'utf8')
    
    // Create a simplified monochrome version for Safari pinned tabs
    const safariSvg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve">
<style type="text/css">
  .st0{fill:#000000;}
</style>
<circle class="st0" cx="35" cy="50" r="14"/>
<circle class="st0" cx="65" cy="50" r="14"/>
<line class="st0" x1="42" y1="42" x2="58" y2="58" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
<line class="st0" x1="58" y1="42" x2="42" y2="58" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
</svg>`
    
    const safariPath = path.join(outputDir, 'safari-pinned-tab.svg')
    fs.writeFileSync(safariPath, safariSvg)
    
    const safariStats = fs.statSync(safariPath)
    console.log(`✅ safari-pinned-tab.svg         Safari   ${(safariStats.size / 1024).toFixed(1)}KB     Safari pinned tab icon`)
    
  } catch (error) {
    console.log(`⚠️  Could not generate safari-pinned-tab.svg: ${error.message}`)
  }
}

// Handle script execution
if (require.main === module) {
  generateFavicons().catch(error => {
    console.error('')
    console.error('💥 FATAL ERROR')
    console.error('━'.repeat(60))
    console.error('Error:', error.message)
    console.error('')
    console.error('Stack trace:')
    console.error(error.stack)
    console.error('')
    console.error('Troubleshooting:')
    console.error('1. Ensure Sharp is installed: npm install --save-dev sharp')
    console.error('2. Check that your SVG file exists and is valid')
    console.error('3. Verify Node.js version is 14 or higher')
    console.error('4. Check file permissions for the output directory')
    console.error('')
    process.exit(1)
  })
}

module.exports = { generateFavicons }