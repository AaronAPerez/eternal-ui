// src/lib/favicon-utils/generator.ts
import { FaviconSize, FaviconFile, ProjectSettings } from './types'

export const FAVICON_SIZES: FaviconSize[] = [
  { size: 16, name: 'favicon-16x16.png', description: 'Browser tab (standard)', priority: 'high', platform: 'web' },
  { size: 32, name: 'favicon-32x32.png', description: 'Browser tab (retina)', priority: 'high', platform: 'web' },
  { size: 48, name: 'favicon-48x48.png', description: 'Windows shortcut', priority: 'medium', platform: 'windows' },
  { size: 96, name: 'favicon-96x96.png', description: 'Android home screen', priority: 'medium', platform: 'android' },
  { size: 120, name: 'apple-touch-icon-120x120.png', description: 'iPhone home screen', priority: 'high', platform: 'ios' },
  { size: 152, name: 'apple-touch-icon-152x152.png', description: 'iPad home screen', priority: 'high', platform: 'ios' },
  { size: 180, name: 'apple-touch-icon.png', description: 'iOS home screen (latest)', priority: 'high', platform: 'ios' },
  { size: 192, name: 'android-chrome-192x192.png', description: 'Android home screen', priority: 'high', platform: 'android' },
  { size: 512, name: 'android-chrome-512x512.png', description: 'Android splash screen', priority: 'high', platform: 'android' },
]

export class FaviconGenerator {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
    
    // High-quality rendering settings
    this.ctx.imageSmoothingEnabled = true
    this.ctx.imageSmoothingQuality = 'high'
  }

  async generateFromImage(
    imageFile: File, 
    settings: ProjectSettings
  ): Promise<FaviconFile[]> {
    const files: FaviconFile[] = []
    const img = await this.loadImage(imageFile)

    // Generate all favicon sizes
    for (const sizeConfig of FAVICON_SIZES) {
      const blob = await this.generateSizedFavicon(img, sizeConfig, settings.colors)
      files.push({
        name: sizeConfig.name,
        size: sizeConfig.size,
        description: sizeConfig.description,
        priority: sizeConfig.priority,
        blob: blob,
        url: URL.createObjectURL(blob),
        type: 'png',
        fileSize: blob.size
      })
    }

    // Generate additional files
    files.push(
      {
        name: 'site.webmanifest',
        description: 'PWA manifest for installable web app',
        content: this.generateWebManifest(settings),
        type: 'json',
        priority: 'high'
      },
      {
        name: 'browserconfig.xml',
        description: 'Microsoft browser configuration',
        content: this.generateBrowserConfig(settings),
        type: 'xml',
        priority: 'medium'
      },
      {
        name: 'favicon.ico',
        description: 'Legacy ICO format for older browsers',
        content: 'ICO_PLACEHOLDER', // In production, convert PNG to ICO
        type: 'ico',
        priority: 'high'
      }
    )

    return files
  }

  private async loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  private async generateSizedFavicon(
    img: HTMLImageElement, 
    sizeConfig: FaviconSize, 
    colors: ColorScheme
  ): Promise<Blob> {
    this.canvas.width = sizeConfig.size
    this.canvas.height = sizeConfig.size
    
    // Clear canvas
    this.ctx.clearRect(0, 0, sizeConfig.size, sizeConfig.size)
    
    // Apply background if not transparent
    if (colors.background !== 'transparent') {
      this.ctx.fillStyle = colors.background
      this.ctx.fillRect(0, 0, sizeConfig.size, sizeConfig.size)
    }
    
    // Draw image with proper scaling and centering
    const aspectRatio = img.width / img.height
    let drawWidth = sizeConfig.size
    let drawHeight = sizeConfig.size
    let x = 0
    let y = 0
    
    if (aspectRatio > 1) {
      drawHeight = sizeConfig.size / aspectRatio
      y = (sizeConfig.size - drawHeight) / 2
    } else {
      drawWidth = sizeConfig.size * aspectRatio
      x = (sizeConfig.size - drawWidth) / 2
    }
    
    this.ctx.drawImage(img, x, y, drawWidth, drawHeight)
    
    return new Promise(resolve => {
      this.canvas.toBlob(blob => resolve(blob!), 'image/png', 0.95)
    })
  }

  private generateWebManifest(settings: ProjectSettings): string {
    return JSON.stringify({
      name: settings.name,
      short_name: settings.name.length > 12 ? settings.name.substring(0, 12) : settings.name,
      description: settings.description,
      start_url: '/',
      display: 'standalone',
      background_color: settings.colors.background,
      theme_color: settings.colors.primary,
      orientation: 'portrait-primary',
      scope: '/',
      lang: 'en-US',
      dir: 'ltr',
      categories: ['productivity', 'business', 'utilities'],
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }, null, 2)
  }

  private generateBrowserConfig(settings: ProjectSettings): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/mstile-150x150.png"/>
            <TileColor>${settings.colors.primary}</TileColor>
        </tile>
    </msapplication>
</browserconfig>`
  }
}