export interface ColorPalette {
  name: string
  value: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
}

export const gridColorPresets: ColorPalette[] = [
  { name: 'Blue', value: '#3B82F6', rgb: { r: 59, g: 130, b: 246 }, hsl: { h: 217, s: 91, l: 60 } },
  { name: 'Purple', value: '#8B5CF6', rgb: { r: 139, g: 92, b: 246 }, hsl: { h: 258, s: 90, l: 66 } },
  { name: 'Green', value: '#10B981', rgb: { r: 16, g: 185, b: 129 }, hsl: { h: 160, s: 84, l: 39 } },
  { name: 'Red', value: '#EF4444', rgb: { r: 239, g: 68, b: 68 }, hsl: { h: 0, s: 84, l: 60 } },
  { name: 'Yellow', value: '#F59E0B', rgb: { r: 245, g: 158, b: 11 }, hsl: { h: 38, s: 92, l: 50 } },
  { name: 'Pink', value: '#EC4899', rgb: { r: 236, g: 72, b: 153 }, hsl: { h: 330, s: 81, l: 60 } },
  { name: 'Indigo', value: '#6366F1', rgb: { r: 99, g: 102, b: 241 }, hsl: { h: 239, s: 84, l: 67 } },
  { name: 'Gray', value: '#6B7280', rgb: { r: 107, g: 114, b: 128 }, hsl: { h: 220, s: 9, l: 46 } }
]

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export function adjustColorOpacity(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
}

export function generateSectionColors(count: number): string[] {
  const colors: string[] = []
  const hueStep = 360 / count
  
  for (let i = 0; i < count; i++) {
    const hue = i * hueStep
    const saturation = 60 + (i % 3) * 15 // Vary saturation
    const lightness = 50 + (i % 2) * 10 // Vary lightness
    
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
  }
  
  return colors
}

export function getContrastColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor)
  if (!rgb) return '#000000'
  
  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}