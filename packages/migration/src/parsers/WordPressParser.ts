import * as cheerio from 'cheerio'
import axios from 'axios'
import { parseStringPromise } from 'xml2js'

/**
 * WordPress Parser with Cheerio Integration
 * 
 * Comprehensive WordPress site parsing that extracts content, structure,
 * and styling information to generate modern React components.
 * Supports both live site parsing and XML export processing.
 */

// WordPress content types
export interface WordPressPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  date: string
  author: string
  categories: string[]
  tags: string[]
  featuredImage?: string
  meta: Record<string, any>
}

export interface WordPressPage {
  id: string
  title: string
  content: string
  slug: string
  parent?: string
  template?: string
  meta: Record<string, any>
}

export interface WordPressTheme {
  name: string
  version: string
  description: string
  author: string
  template: string
  stylesheet: string
  screenshot?: string
  customizations: {
    colors: Record<string, string>
    fonts: string[]
    customCSS: string
    widgets: Record<string, any>
  }
}

export interface WordPressMedia {
  id: string
  url: string
  filename: string
  type: string
  size: number
  dimensions?: { width: number; height: number }
  alt?: string
  caption?: string
  optimized?: {
    webp?: string
    avif?: string
    sizes?: Record<string, string>
  }
}

export interface WordPressMenu {
  id: string
  name: string
  items: Array<{
    title: string
    url: string
    target?: string
    children?: Array<{
      title: string
      url: string
      target?: string
    }>
  }>
}

export interface WordPressSite {
  info: {
    title: string
    description: string
    url: string
    language: string
    charset: string
    wpVersion: string
    theme: WordPressTheme
  }
  posts: WordPressPost[]
  pages: WordPressPage[]
  media: WordPressMedia[]
  menus: WordPressMenu[]
  widgets: Record<string, any>
  customizer: Record<string, any>
  plugins: Array<{
    name: string
    version: string
    active: boolean
  }>
}

export interface ParseOptions {
  includeContent: boolean
  includeMedia: boolean
  includeTheme: boolean
  includePlugins: boolean
  optimizeImages: boolean
  extractCustomCSS: boolean
  followRedirects: boolean
  timeout: number
  userAgent: string
}

export const DEFAULT_PARSE_OPTIONS: ParseOptions = {
  includeContent: true,
  includeMedia: true,
  includeTheme: true,
  includePlugins: false,
  optimizeImages: true,
  extractCustomCSS: true,
  followRedirects: true,
  timeout: 30000,
  userAgent: 'Eternal UI Migration Bot/1.0'
}

/**
 * WordPress Parser Class
 */
export class WordPressParser {
  private options: ParseOptions
  private baseUrl: string
  private $: cheerio.CheerioAPI | null = null

  constructor(options: Partial<ParseOptions> = {}) {
    this.options = { ...DEFAULT_PARSE_OPTIONS, ...options }
    this.baseUrl = ''
  }

  /**
   * Parse WordPress site from URL
   */
  async parseFromUrl(url: string): Promise<WordPressSite> {
    this.baseUrl = this.normalizeUrl(url)
    
    try {
      // Fetch the main page
      const response = await axios.get(this.baseUrl, {
        timeout: this.options.timeout,
        headers: {
          'User-Agent': this.options.userAgent
        },
        maxRedirects: this.options.followRedirects ? 5 : 0
      })

      this.$ = cheerio.load(response.data)

      // Extract site information
      const siteInfo = await this.extractSiteInfo()
      
      // Extract content
      const posts = this.options.includeContent ? await this.extractPosts() : []
      const pages = this.options.includeContent ? await this.extractPages() : []
      
      // Extract media
      const media = this.options.includeMedia ? await this.extractMedia() : []
      
      // Extract theme and customizations
      const theme = this.options.includeTheme ? await this.extractThemeInfo() : this.getDefaultTheme()
      
      // Extract menus
      const menus = await this.extractMenus()
      
      // Extract widgets and customizer data
      const widgets = await this.extractWidgets()
      const customizer = await this.extractCustomizerData()
      
      // Extract plugins (if accessible)
      const plugins = this.options.includePlugins ? await this.extractPlugins() : []

      return {
        info: {
          ...siteInfo,
          theme
        },
        posts,
        pages,
        media,
        menus,
        widgets,
        customizer,
        plugins
      }

    } catch (error) {
      throw new Error(`Failed to parse WordPress site: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Parse WordPress XML export
   */
  async parseFromXML(xmlContent: string): Promise<Partial<WordPressSite>> {
    try {
      const parsed = await parseStringPromise(xmlContent, {
        explicitArray: false,
        mergeAttrs: true
      })

      const channel = parsed.rss?.channel
      if (!channel) {
        throw new Error('Invalid WordPress XML export format')
      }

      // Extract site info from XML
      const siteInfo = {
        title: channel.title || '',
        description: channel.description || '',
        url: channel.link || '',
        language: channel.language || 'en',
        charset: 'UTF-8',
        wpVersion: channel['wp:wxr_version'] || 'unknown',
        theme: this.getDefaultTheme()
      }

      // Extract posts and pages
      const items = Array.isArray(channel.item) ? channel.item : [channel.item].filter(Boolean)
      const posts: WordPressPost[] = []
      const pages: WordPressPage[] = []

      for (const item of items) {
        if (!item) continue

        const postType = item['wp:post_type']
        const status = item['wp:status']

        if (status !== 'publish') continue

        if (postType === 'post') {
          posts.push(this.parsePostFromXML(item))
        } else if (postType === 'page') {
          pages.push(this.parsePageFromXML(item))
        }
      }

      return {
        info: siteInfo,
        posts,
        pages,
        media: [],
        menus: [],
        widgets: {},
        customizer: {},
        plugins: []
      }

    } catch (error) {
      throw new Error(`Failed to parse WordPress XML: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Extract site information
   */
  private async extractSiteInfo() {
    if (!this.$) throw new Error('Cheerio not initialized')

    const title = this.$('title').text() || this.$('meta[property="og:site_name"]').attr('content') || ''
    const description = this.$('meta[name="description"]').attr('content') || 
                      this.$('meta[property="og:description"]').attr('content') || ''
    
    // Detect WordPress version
    const generator = this.$('meta[name="generator"]').attr('content') || ''
    const wpVersion = generator.match(/WordPress\s+([\d.]+)/)?.[1] || 'unknown'

    // Detect language
    const language = this.$('html').attr('lang') || 'en'
    const charset = this.$('meta[charset]').attr('charset') || 'UTF-8'

    return {
      title: title.trim(),
      description: description.trim(),
      url: this.baseUrl,
      language,
      charset,
      wpVersion
    }
  }

  /**
   * Extract posts from WordPress API or HTML
   */
  private async extractPosts(): Promise<WordPressPost[]> {
    const posts: WordPressPost[] = []

    try {
      // Try WordPress REST API first
      const apiUrl = `${this.baseUrl}/wp-json/wp/v2/posts`
      const response = await axios.get(apiUrl, {
        timeout: this.options.timeout,
        headers: { 'User-Agent': this.options.userAgent }
      })

      for (const post of response.data) {
        posts.push({
          id: post.id.toString(),
          title: this.decodeHTML(post.title.rendered),
          content: post.content.rendered,
          excerpt: this.decodeHTML(post.excerpt.rendered),
          slug: post.slug,
          date: post.date,
          author: post.author.toString(),
          categories: post.categories || [],
          tags: post.tags || [],
          featuredImage: post.featured_media ? await this.getMediaUrl(post.featured_media) : undefined,
          meta: post.meta || {}
        })
      }
    } catch (error) {
      // Fallback to HTML parsing
      console.warn('WordPress API not accessible, falling back to HTML parsing')
      // Implementation for HTML-based post extraction would go here
    }

    return posts
  }

  /**
   * Extract pages from WordPress API or HTML
   */
  private async extractPages(): Promise<WordPressPage[]> {
    const pages: WordPressPage[] = []

    try {
      // Try WordPress REST API first
      const apiUrl = `${this.baseUrl}/wp-json/wp/v2/pages`
      const response = await axios.get(apiUrl, {
        timeout: this.options.timeout,
        headers: { 'User-Agent': this.options.userAgent }
      })

      for (const page of response.data) {
        pages.push({
          id: page.id.toString(),
          title: this.decodeHTML(page.title.rendered),
          content: page.content.rendered,
          slug: page.slug,
          parent: page.parent ? page.parent.toString() : undefined,
          template: page.template || undefined,
          meta: page.meta || {}
        })
      }
    } catch (error) {
      // Fallback to HTML parsing
      console.warn('WordPress API not accessible, falling back to HTML parsing')
    }

    return pages
  }

  /**
   * Extract media files
   */
  private async extractMedia(): Promise<WordPressMedia[]> {
    const media: WordPressMedia[] = []

    if (!this.$) return media

    // Extract images from HTML
    const images = this.$('img')
    for (let i = 0; i < images.length; i++) {
      const img = images.eq(i)
      const src = img.attr('src')
      const alt = img.attr('alt')

      if (src && this.isWordPressMedia(src)) {
        const mediaItem: WordPressMedia = {
          id: `img-${i}`,
          url: this.resolveUrl(src),
          filename: this.extractFilename(src),
          type: this.getImageType(src),
          size: 0, // Would need to fetch to get actual size
          alt: alt || undefined
        }

        // Extract dimensions if available
        const width = img.attr('width')
        const height = img.attr('height')
        if (width && height) {
          mediaItem.dimensions = {
            width: parseInt(width),
            height: parseInt(height)
          }
        }

        media.push(mediaItem)
      }
    }

    // Try to get media from WordPress API
    try {
      const apiUrl = `${this.baseUrl}/wp-json/wp/v2/media`
      const response = await axios.get(apiUrl, {
        timeout: this.options.timeout,
        headers: { 'User-Agent': this.options.userAgent }
      })

      for (const mediaItem of response.data) {
        media.push({
          id: mediaItem.id.toString(),
          url: mediaItem.source_url,
          filename: this.extractFilename(mediaItem.source_url),
          type: mediaItem.mime_type,
          size: mediaItem.media_details?.filesize || 0,
          dimensions: mediaItem.media_details?.width ? {
            width: mediaItem.media_details.width,
            height: mediaItem.media_details.height
          } : undefined,
          alt: mediaItem.alt_text || undefined,
          caption: mediaItem.caption?.rendered || undefined
        })
      }
    } catch (error) {
      console.warn('Could not fetch media from WordPress API')
    }

    return media
  }

  /**
   * Extract theme information
   */
  private async extractThemeInfo(): Promise<WordPressTheme> {
    if (!this.$) return this.getDefaultTheme()

    // Extract theme name from various sources
    const themeName = this.$('link[rel="stylesheet"]').attr('href')?.match(/themes\/([^\/]+)/)?.[1] || 'unknown'
    
    // Extract custom CSS
    const customCSS = this.$('style').map((_, el) => this.$(el).html()).get().join('\n')
    
    // Extract color scheme from CSS
    const colors = this.extractColorsFromCSS(customCSS)
    
    // Extract font information
    const fonts = this.extractFontsFromHTML()

    return {
      name: themeName,
      version: 'unknown',
      description: '',
      author: 'unknown',
      template: themeName,
      stylesheet: themeName,
      customizations: {
        colors,
        fonts,
        customCSS,
        widgets: {}
      }
    }
  }

  /**
   * Extract navigation menus
   */
  private async extractMenus(): Promise<WordPressMenu[]> {
    const menus: WordPressMenu[] = []

    if (!this.$) return menus

    // Look for common WordPress menu selectors
    const menuSelectors = [
      '.menu',
      '#primary-menu',
      '.primary-navigation',
      '.main-navigation ul',
      '.nav-menu'
    ]

    for (const selector of menuSelectors) {
      const menuElement = this.$(selector).first()
      if (menuElement.length > 0) {
        const menuItems = this.extractMenuItems(menuElement)
        if (menuItems.length > 0) {
          menus.push({
            id: `menu-${menus.length + 1}`,
            name: `Menu ${menus.length + 1}`,
            items: menuItems
          })
        }
      }
    }

    return menus
  }

  /**
   * Extract menu items recursively
   */
  private extractMenuItems(menuElement: cheerio.Cheerio): WordPressMenu['items'] {
    const items: WordPressMenu['items'] = []

    menuElement.children('li').each((_, li) => {
      const $li = this.$(li)
      const $link = $li.children('a').first()
      
      if ($link.length > 0) {
        const title = $link.text().trim()
        const url = $link.attr('href') || '#'
        const target = $link.attr('target')

        const item: WordPressMenu['items'][0] = {
          title,
          url: this.resolveUrl(url),
          target: target || undefined
        }

        // Check for sub-menu
        const subMenu = $li.children('ul').first()
        if (subMenu.length > 0) {
          item.children = this.extractMenuItems(subMenu)
        }

        items.push(item)
      }
    })

    return items
  }

  /**
   * Extract widgets data
   */
  private async extractWidgets(): Promise<Record<string, any>> {
    const widgets: Record<string, any> = {}

    if (!this.$) return widgets

    // Look for common WordPress widget areas
    const widgetAreas = [
      '.sidebar',
      '.widget-area',
      '#secondary',
      '.footer-widgets',
      '.widget'
    ]

    for (const selector of widgetAreas) {
      this.$(selector).each((i, element) => {
        const $widget = this.$(element)
        const widgetId = $widget.attr('id') || `widget-${i}`
        const widgetClass = $widget.attr('class') || ''
        const content = $widget.html() || ''

        widgets[widgetId] = {
          class: widgetClass,
          content: content.trim(),
          type: this.detectWidgetType(widgetClass, content)
        }
      })
    }

    return widgets
  }

  /**
   * Extract WordPress Customizer data
   */
  private async extractCustomizerData(): Promise<Record<string, any>> {
    const customizer: Record<string, any> = {}

    if (!this.$) return customizer

    // Extract CSS custom properties
    const cssVariables: Record<string, string> = {}
    const styleElements = this.$('style')
    
    styleElements.each((_, element) => {
      const css = this.$(element).html() || ''
      const variableMatches = css.match(/--[\w-]+:\s*[^;]+/g)
      
      if (variableMatches) {
        variableMatches.forEach(match => {
          const [property, value] = match.split(':').map(s => s.trim())
          if (property && value) {
            cssVariables[property] = value
          }
        })
      }
    })

    customizer.cssVariables = cssVariables

    // Extract theme customizations from style attributes
    const bodyStyle = this.$('body').attr('style')
    if (bodyStyle) {
      customizer.bodyStyles = this.parseInlineStyles(bodyStyle)
    }

    return customizer
  }

  /**
   * Extract plugins information (limited without admin access)
   */
  private async extractPlugins(): Promise<Array<{ name: string; version: string; active: boolean }>> {
    const plugins: Array<{ name: string; version: string; active: boolean }> = []

    if (!this.$) return plugins

    // Detect common plugins by their footprints
    const pluginDetectors = [
      {
        name: 'Yoast SEO',
        detector: () => this.$('script[src*="yoast"]').length > 0 || this.$('meta[name="generator"][content*="Yoast"]').length > 0
      },
      {
        name: 'WooCommerce',
        detector: () => this.$('body').hasClass('woocommerce') || this.$('script[src*="woocommerce"]').length > 0
      },
      {
        name: 'Contact Form 7',
        detector: () => this.$('form[class*="wpcf7"]').length > 0 || this.$('script[src*="contact-form-7"]').length > 0
      },
      {
        name: 'Elementor',
        detector: () => this.$('body').hasClass('elementor-default') || this.$('link[href*="elementor"]').length > 0
      },
      {
        name: 'WP Rocket',
        detector: () => this.$('meta[name="generator"][content*="WP Rocket"]').length > 0
      },
      {
        name: 'Jetpack',
        detector: () => this.$('script[src*="jetpack"]').length > 0 || this.$('link[href*="jetpack"]').length > 0
      }
    ]

    for (const plugin of pluginDetectors) {
      if (plugin.detector()) {
        plugins.push({
          name: plugin.name,
          version: 'unknown',
          active: true
        })
      }
    }

    return plugins
  }

  /**
   * Parse post from XML
   */
  private parsePostFromXML(item: any): WordPressPost {
    return {
      id: item['wp:post_id'] || '',
      title: this.decodeHTML(item.title || ''),
      content: item['content:encoded'] || '',
      excerpt: item['excerpt:encoded'] || '',
      slug: item['wp:post_name'] || '',
      date: item['wp:post_date'] || '',
      author: item['dc:creator'] || '',
      categories: this.extractCategoriesFromXML(item.category),
      tags: this.extractTagsFromXML(item.category),
      meta: this.extractMetaFromXML(item['wp:postmeta'])
    }
  }

  /**
   * Parse page from XML
   */
  private parsePageFromXML(item: any): WordPressPage {
    return {
      id: item['wp:post_id'] || '',
      title: this.decodeHTML(item.title || ''),
      content: item['content:encoded'] || '',
      slug: item['wp:post_name'] || '',
      parent: item['wp:post_parent'] !== '0' ? item['wp:post_parent'] : undefined,
      meta: this.extractMetaFromXML(item['wp:postmeta'])
    }
  }

  /**
   * Utility methods
   */

  private normalizeUrl(url: string): string {
    if (!url.startsWith('http')) {
      url = `https://${url}`
    }
    return url.replace(/\/$/, '')
  }

  private resolveUrl(url: string): string {
    if (url.startsWith('http')) return url
    if (url.startsWith('//')) return `https:${url}`
    if (url.startsWith('/')) return `${this.baseUrl}${url}`
    return `${this.baseUrl}/${url}`
  }

  private isWordPressMedia(src: string): boolean {
    return src.includes('/wp-content/uploads/') || 
           src.includes('/wp-includes/') ||
           src.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) !== null
  }

  private extractFilename(url: string): string {
    return url.split('/').pop() || ''
  }

  private getImageType(src: string): string {
    const extension = src.split('.').pop()?.toLowerCase()
    const mimeTypes: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml'
    }
    return mimeTypes[extension || ''] || 'image/unknown'
  }

  private async getMediaUrl(mediaId: number): Promise<string | undefined> {
    try {
      const response = await axios.get(`${this.baseUrl}/wp-json/wp/v2/media/${mediaId}`, {
        timeout: 5000,
        headers: { 'User-Agent': this.options.userAgent }
      })
      return response.data.source_url
    } catch {
      return undefined
    }
  }

  private extractColorsFromCSS(css: string): Record<string, string> {
    const colors: Record<string, string> = {}
    const colorPattern = /(color|background-color|border-color):\s*(#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|rgba\([^)]+\))/g
    
    let match
    while ((match = colorPattern.exec(css)) !== null) {
      const property = match[1]
      const value = match[2]
      colors[property] = value
    }

    return colors
  }

  private extractFontsFromHTML(): string[] {
    if (!this.$) return []

    const fonts: Set<string> = new Set()

    // Extract from Google Fonts links
    this.$('link[href*="fonts.googleapis.com"]').each((_, element) => {
      const href = this.$(element).attr('href') || ''
      const fontMatch = href.match(/family=([^&:]+)/g)
      if (fontMatch) {
        fontMatch.forEach(match => {
          const fontName = match.replace('family=', '').replace(/\+/g, ' ')
          fonts.add(fontName)
        })
      }
    })

    // Extract from CSS font-family declarations
    this.$('style').each((_, element) => {
      const css = this.$(element).html() || ''
      const fontFamilyPattern = /font-family:\s*([^;]+)/g
      let match
      while ((match = fontFamilyPattern.exec(css)) !== null) {
        const fontFamily = match[1].replace(/['"]/g, '').split(',')[0].trim()
        if (fontFamily && !fontFamily.includes('serif') && !fontFamily.includes('sans-serif')) {
          fonts.add(fontFamily)
        }
      }
    })

    return Array.from(fonts)
  }

  private detectWidgetType(widgetClass: string, content: string): string {
    if (widgetClass.includes('search')) return 'search'
    if (widgetClass.includes('categories')) return 'categories'
    if (widgetClass.includes('recent-posts')) return 'recent-posts'
    if (widgetClass.includes('tag-cloud')) return 'tag-cloud'
    if (widgetClass.includes('calendar')) return 'calendar'
    if (content.includes('<form')) return 'form'
    if (content.includes('<img')) return 'image'
    return 'text'
  }

  private parseInlineStyles(styleString: string): Record<string, string> {
    const styles: Record<string, string> = {}
    const declarations = styleString.split(';')
    
    declarations.forEach(declaration => {
      const [property, value] = declaration.split(':').map(s => s.trim())
      if (property && value) {
        styles[property] = value
      }
    })

    return styles
  }

  private extractCategoriesFromXML(categories: any): string[] {
    if (!categories) return []
    const categoryArray = Array.isArray(categories) ? categories : [categories]
    return categoryArray
      .filter((cat: any) => cat.domain === 'category')
      .map((cat: any) => cat.nicename || cat._)
  }

  private extractTagsFromXML(categories: any): string[] {
    if (!categories) return []
    const categoryArray = Array.isArray(categories) ? categories : [categories]
    return categoryArray
      .filter((cat: any) => cat.domain === 'post_tag')
      .map((cat: any) => cat.nicename || cat._)
  }

  private extractMetaFromXML(postmeta: any): Record<string, any> {
    const meta: Record<string, any> = {}
    if (!postmeta) return meta

    const metaArray = Array.isArray(postmeta) ? postmeta : [postmeta]
    metaArray.forEach((item: any) => {
      if (item['wp:meta_key'] && item['wp:meta_value']) {
        meta[item['wp:meta_key']] = item['wp:meta_value']
      }
    })

    return meta
  }

  private decodeHTML(text: string): string {
    if (!text) return ''
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&nbsp;/g, ' ')
  }

  private getDefaultTheme(): WordPressTheme {
    return {
      name: 'unknown',
      version: 'unknown',
      description: '',
      author: 'unknown',
      template: 'unknown',
      stylesheet: 'unknown',
      customizations: {
        colors: {},
        fonts: [],
        customCSS: '',
        widgets: {}
      }
    }
  }
}

/**
 * WordPress Content Converter
 * 
 * Converts WordPress content to modern React components
 */
export class WordPressConverter {
  /**
   * Convert WordPress post content to React components
   */
  static convertPostContent(content: string): {
    components: Array<{
      type: string
      props: Record<string, any>
      content: string
    }>
    metadata: {
      wordCount: number
      estimatedReadTime: number
      hasImages: boolean
      hasVideos: boolean
    }
  } {
    const $ = cheerio.load(content)
    const components: Array<{ type: string; props: Record<string, any>; content: string }> = []

    // Convert paragraphs
    $('p').each((_, element) => {
      const $p = $(element)
      const text = $p.text().trim()
      if (text) {
        components.push({
          type: 'paragraph',
          props: {
            className: 'prose-paragraph'
          },
          content: $p.html() || ''
        })
      }
    })

    // Convert headings
    $('h1, h2, h3, h4, h5, h6').each((_, element) => {
      const $heading = $(element)
      const level = element.tagName.toLowerCase()
      components.push({
        type: 'heading',
        props: {
          level: parseInt(level.charAt(1)),
          className: `prose-${level}`
        },
        content: $heading.text()
      })
    })

    // Convert images
    $('img').each((_, element) => {
      const $img = $(element)
      components.push({
        type: 'image',
        props: {
          src: $img.attr('src') || '',
          alt: $img.attr('alt') || '',
          width: $img.attr('width') ? parseInt($img.attr('width')!) : undefined,
          height: $img.attr('height') ? parseInt($img.attr('height')!) : undefined,
          className: 'prose-image'
        },
        content: ''
      })
    })

    // Convert lists
    $('ul, ol').each((_, element) => {
      const $list = $(element)
      const items = $list.children('li').map((_, li) => $(li).text()).get()
      components.push({
        type: element.tagName.toLowerCase() === 'ul' ? 'unordered-list' : 'ordered-list',
        props: {
          items,
          className: 'prose-list'
        },
        content: ''
      })
    })

    // Convert blockquotes
    $('blockquote').each((_, element) => {
      const $quote = $(element)
      components.push({
        type: 'blockquote',
        props: {
          className: 'prose-blockquote'
        },
        content: $quote.html() || ''
      })
    })

    // Generate metadata
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const estimatedReadTime = Math.ceil(wordCount / 200) // 200 words per minute
    const hasImages = $('img').length > 0
    const hasVideos = $('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length > 0

    return {
      components,
      metadata: {
        wordCount,
        estimatedReadTime,
        hasImages,
        hasVideos
      }
    }
  }

  /**
   * Convert WordPress menu to navigation component
   */
  static convertMenu(menu: WordPressMenu): {
    type: 'navigation'
    props: {
      items: Array<{
        label: string
        href: string
        target?: string
        children?: Array<{
          label: string
          href: string
          target?: string
        }>
      }>
    }
  } {
    return {
      type: 'navigation',
      props: {
        items: menu.items.map(item => ({
          label: item.title,
          href: item.url,
          target: item.target,
          children: item.children?.map(child => ({
            label: child.title,
            href: child.url,
            target: child.target
          }))
        }))
      }
    }
  }

  /**
   * Generate React component code from WordPress content
   */
  static generateReactComponent(
    name: string,
    components: Array<{ type: string; props: Record<string, any>; content: string }>
  ): string {
    const imports = new Set(['React'])
    let componentCode = ''

    components.forEach((comp, index) => {
      switch (comp.type) {
        case 'paragraph':
          componentCode += `      <p className="${comp.props.className || ''}">\n`
          componentCode += `        ${comp.content}\n`
          componentCode += `      </p>\n`
          break

        case 'heading':
          const HeadingTag = `h${comp.props.level}`
          componentCode += `      <${HeadingTag} className="${comp.props.className || ''}">\n`
          componentCode += `        ${comp.content}\n`
          componentCode += `      </${HeadingTag}>\n`
          break

        case 'image':
          imports.add('Image')
          componentCode += `      <Image\n`
          componentCode += `        src="${comp.props.src}"\n`
          componentCode += `        alt="${comp.props.alt}"\n`
          if (comp.props.width) componentCode += `        width={${comp.props.width}}\n`
          if (comp.props.height) componentCode += `        height={${comp.props.height}}\n`
          componentCode += `        className="${comp.props.className || ''}"\n`
          componentCode += `      />\n`
          break

        case 'unordered-list':
        case 'ordered-list':
          const ListTag = comp.type === 'unordered-list' ? 'ul' : 'ol'
          componentCode += `      <${ListTag} className="${comp.props.className || ''}">\n`
          comp.props.items.forEach((item: string) => {
            componentCode += `        <li>${item}</li>\n`
          })
          componentCode += `      </${ListTag}>\n`
          break

        case 'blockquote':
          componentCode += `      <blockquote className="${comp.props.className || ''}">\n`
          componentCode += `        ${comp.content}\n`
          componentCode += `      </blockquote>\n`
          break
      }
    })

    return `import ${Array.from(imports).join(', ')} from 'react'

export const ${name}: React.FC = () => {
  return (
    <div className="prose max-w-none">
${componentCode}    </div>
  )
}

export default ${name}`
  }
}

// Export parser utilities
export default {
  WordPressParser,
  WordPressConverter,
  DEFAULT_PARSE_OPTIONS
}