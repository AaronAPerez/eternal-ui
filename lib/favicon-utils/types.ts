// src/lib/favicon-utils/types.ts
export interface FaviconSize {
  size: number
  name: string
  description: string
  priority: 'high' | 'medium' | 'low'
  platform: 'web' | 'ios' | 'android' | 'windows'
}

export interface ColorScheme {
  primary: string
  secondary: string
  background: string
}

export interface FaviconFile {
  name: string
  size?: number
  description: string
  priority: 'high' | 'medium' | 'low'
  blob?: Blob
  url?: string
  content?: string
  type?: 'png' | 'ico' | 'json' | 'xml'
  fileSize?: number
}

export interface ProjectSettings {
  name: string
  description: string
  keywords: string
  author: string
  colors: ColorScheme
}