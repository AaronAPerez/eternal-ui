/**
 * 🖼️ GENERATE OG IMAGES FOR ERROR SOLUTIONS
 * 
 * Script to generate Open Graph images for each error solution
 */
const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

const ERROR_SOLUTIONS = require('../data/errorSolutions.ts')

const generateOGImage = (solution) => {
  const width = 1200
  const height = 630
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1e40af') // blue-700
  gradient.addColorStop(1, '#3730a3') // indigo-700
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Title
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 48px Arial'
  ctx.textAlign = 'left'
  
  // Wrap text if too long
  const maxWidth = width - 100
  const words = solution.title.split(' ')
  let line = ''
  let y = 200
  
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, 50, y)
      line = words[n] + ' '
      y += 60
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, 50, y)

  // Category badge
  ctx.fillStyle = '#fbbf24' // amber-400
  ctx.fillRect(50, 100, 150, 40)
  ctx.fillStyle = '#1f2937'
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(solution.category, 125, 125)

  // Description
  ctx.fillStyle = '#e5e7eb' // gray-200
  ctx.font = '24px Arial'
  ctx.textAlign = 'left'
  
  const description = solution.description
  const descWords = description.split(' ')
  let descLine = ''
  let descY = y + 80
  
  for (let n = 0; n < descWords.length; n++) {
    const testLine = descLine + descWords[n] + ' '
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(descLine, 50, descY)
      descLine = descWords[n] + ' '
      descY += 35
      if (descY > height - 100) break // Don't go too far down
    } else {
      descLine = testLine
    }
  }
  ctx.fillText(descLine, 50, descY)

  // Severity indicator
  const severityColors = {
    high: '#ef4444',    // red-500
    medium: '#f59e0b',  // amber-500
    low: '#10b981'      // emerald-500
  }
  
  ctx.fillStyle = severityColors[solution.severity] || '#6b7280'
  ctx.beginPath()
  ctx.arc(width - 100, 100, 30, 0, 2 * Math.PI)
  ctx.fill()
  
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 16px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(solution.severity.toUpperCase(), width - 100, 105)

  return canvas.toBuffer('image/png')
}

const generateAllOGImages = () => {
  const outputDir = path.join(__dirname, '../public/og-images')
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  console.log('🖼️  Generating OG images for error solutions...')
  
  ERROR_SOLUTIONS.forEach(solution => {
    try {
      const buffer = generateOGImage(solution)
      const filename = `error-${solution.id}.png`
      const filepath = path.join(outputDir, filename)
      
      fs.writeFileSync(filepath, buffer)
      console.log(`✅ Generated: ${filename}`)
    } catch (error) {
      console.error(`❌ Failed to generate image for ${solution.id}:`, error.message)
    }
  })

  // Generate main troubleshooting hero image
  const heroBuffer = generateHeroImage()
  fs.writeFileSync(path.join(outputDir, 'troubleshooting-hero.png'), heroBuffer)
  console.log('✅ Generated: troubleshooting-hero.png')
  
  console.log(`🎉 Generated ${ERROR_SOLUTIONS.length + 1} OG images`)
}

const generateHeroImage = () => {
  const width = 1200
  const height = 630
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Background
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#0f172a') // slate-900
  gradient.addColorStop(1, '#1e293b') // slate-800
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Main title
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 56px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Fix Errors & Solutions', width / 2, 200)

  // Subtitle
  ctx.fillStyle = '#94a3b8' // slate-400
  ctx.font = '28px Arial'
  ctx.fillText('Comprehensive Troubleshooting Guide', width / 2, 250)

  // Features
  ctx.fillStyle = '#3b82f6' // blue-500
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'left'
  
  const features = [
    '🔍 Searchable Error Database',
    '🛠️  Step-by-Step Solutions',
    '💻 Copy-Paste Code Examples',
    '🎯 Expert Troubleshooting Tips'
  ]
  
  features.forEach((feature, index) => {
    ctx.fillText(feature, 100, 350 + (index * 50))
  })

  return canvas.toBuffer('image/png')
}

if (require.main === module) {
  generateAllOGImages()
}

module.exports = { generateOGImage, generateAllOGImages }