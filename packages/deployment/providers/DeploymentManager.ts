// =================================================================
// DEPLOYMENT APIS INTEGRATION (VERCEL/NETLIFY)
// packages/deployment/src/providers/DeploymentManager.ts
// =================================================================

import axios, { AxiosInstance } from 'axios'
import FormData from 'form-data'
import { Readable } from 'stream'

/**
 * Deployment APIs Integration
 * 
 * Comprehensive deployment management supporting Vercel, Netlify,
 * and other major hosting providers. Handles automated deployment
 * of migrated WordPress sites to modern hosting platforms.
 */

// Deployment provider types
export type DeploymentProvider = 'vercel' | 'netlify' | 'github-pages' | 'aws-s3' | 'firebase'

// Deployment status types
export type DeploymentStatus = 'queued' | 'building' | 'ready' | 'error' | 'cancelled'

// Common interfaces
export interface DeploymentConfig {
  provider: DeploymentProvider
  name: string
  framework?: 'nextjs' | 'react' | 'vue' | 'svelte' | 'static'
  buildCommand?: string
  outputDirectory?: string
  environmentVariables?: Record<string, string>
  domain?: string
  customDomain?: string
}

export interface DeploymentFile {
  path: string
  content: string | Buffer
  encoding?: 'utf8' | 'base64'
}

export interface DeploymentResult {
  id: string
  url: string
  status: DeploymentStatus
  provider: DeploymentProvider
  createdAt: string
  buildLogs?: string[]
  error?: string
  domain?: string
  previewUrl?: string
}

export interface DeploymentCredentials {
  vercel?: {
    token: string
    teamId?: string
  }
  netlify?: {
    token: string
    siteId?: string
  }
  github?: {
    token: string
    owner: string
    repo: string
  }
  aws?: {
    accessKeyId: string
    secretAccessKey: string
    region: string
    bucketName: string
  }
  firebase?: {
    projectId: string
    serviceAccountKey: string
  }
}

/**
 * Base Deployment Provider
 */
abstract class BaseDeploymentProvider {
  protected api: AxiosInstance
  protected credentials: any

  constructor(credentials: any) {
    this.credentials = credentials
    this.api = this.createApiClient()
  }

  abstract createApiClient(): AxiosInstance
  abstract deploy(config: DeploymentConfig, files: DeploymentFile[]): Promise<DeploymentResult>
  abstract getDeploymentStatus(deploymentId: string): Promise<DeploymentStatus>
  abstract getDeploymentLogs(deploymentId: string): Promise<string[]>
  abstract deleteDeployment(deploymentId: string): Promise<boolean>
  abstract updateDomain(deploymentId: string, domain: string): Promise<boolean>
}

/**
 * Vercel Deployment Provider
 */
export class VercelDeploymentProvider extends BaseDeploymentProvider {
  constructor(credentials: DeploymentCredentials['vercel']) {
    if (!credentials?.token) {
      throw new Error('Vercel token is required')
    }
    super(credentials)
  }

  createApiClient(): AxiosInstance {
    return axios.create({
      baseURL: 'https://api.vercel.com',
      headers: {
        'Authorization': `Bearer ${this.credentials.token}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    })
  }

  async deploy(config: DeploymentConfig, files: DeploymentFile[]): Promise<DeploymentResult> {
    try {
      // Prepare deployment payload
      const deployment = {
        name: config.name,
        files: files.map(file => ({
          file: file.path,
          data: typeof file.content === 'string' 
            ? Buffer.from(file.content).toString('base64')
            : file.content.toString('base64'),
          encoding: 'base64'
        })),
        projectSettings: {
          framework: config.framework || 'react',
          buildCommand: config.buildCommand || 'npm run build',
          outputDirectory: config.outputDirectory || 'dist',
          ...(config.environmentVariables && {
            env: Object.entries(config.environmentVariables).map(([key, value]) => ({
              key,
              value,
              type: 'encrypted'
            }))
          })
        },
        ...(this.credentials.teamId && { teamId: this.credentials.teamId })
      }

      // Create deployment
      const response = await this.api.post('/v13/deployments', deployment)
      const deploymentData = response.data

      // Wait for deployment to complete
      const finalStatus = await this.waitForDeployment(deploymentData.id)

      return {
        id: deploymentData.id,
        url: `https://${deploymentData.url}`,
        status: finalStatus,
        provider: 'vercel',
        createdAt: new Date().toISOString(),
        previewUrl: `https://${deploymentData.url}`,
        domain: config.customDomain
      }

    } catch (error) {
      throw new Error(`Vercel deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getDeploymentStatus(deploymentId: string): Promise<DeploymentStatus> {
    try {
      const response = await this.api.get(`/v13/deployments/${deploymentId}`)
      const vercelStatus = response.data.readyState

      // Map Vercel status to our status
      const statusMap: Record<string, DeploymentStatus> = {
        'INITIALIZING': 'queued',
        'ANALYZING': 'building', 
        'BUILDING': 'building',
        'DEPLOYING': 'building',
        'READY': 'ready',
        'ERROR': 'error',
        'CANCELED': 'cancelled'
      }

      return statusMap[vercelStatus] || 'error'
    } catch (error) {
      throw new Error(`Failed to get Vercel deployment status: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getDeploymentLogs(deploymentId: string): Promise<string[]> {
    try {
      const response = await this.api.get(`/v2/deployments/${deploymentId}/events`)
      return response.data.map((event: any) => `[${event.created}] ${event.text}`)
    } catch (error) {
      console.warn('Could not fetch Vercel deployment logs:', error)
      return []
    }
  }

  async deleteDeployment(deploymentId: string): Promise<boolean> {
    try {
      await this.api.delete(`/v13/deployments/${deploymentId}`)
      return true
    } catch (error) {
      console.error('Failed to delete Vercel deployment:', error)
      return false
    }
  }

  async updateDomain(deploymentId: string, domain: string): Promise<boolean> {
    try {
      // Get deployment details first
      const deploymentResponse = await this.api.get(`/v13/deployments/${deploymentId}`)
      const projectId = deploymentResponse.data.projectId

      // Add domain to project
      await this.api.post(`/v9/projects/${projectId}/domains`, {
        name: domain
      })

      return true
    } catch (error) {
      console.error('Failed to update Vercel domain:', error)
      return false
    }
  }

  private async waitForDeployment(deploymentId: string, maxAttempts: number = 60): Promise<DeploymentStatus> {
    for (let i = 0; i < maxAttempts; i++) {
      const status = await this.getDeploymentStatus(deploymentId)
      
      if (status === 'ready' || status === 'error' || status === 'cancelled') {
        return status
      }

      // Wait 5 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 5000))
    }

    return 'error' // Timeout
  }
}

/**
 * Netlify Deployment Provider
 */
export class NetlifyDeploymentProvider extends BaseDeploymentProvider {
  constructor(credentials: DeploymentCredentials['netlify']) {
    if (!credentials?.token) {
      throw new Error('Netlify token is required')
    }
    super(credentials)
  }

  createApiClient(): AxiosInstance {
    return axios.create({
      baseURL: 'https://api.netlify.com/api/v1',
      headers: {
        'Authorization': `Bearer ${this.credentials.token}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    })
  }

  async deploy(config: DeploymentConfig, files: DeploymentFile[]): Promise<DeploymentResult> {
    try {
      let siteId = this.credentials.siteId

      // Create site if no siteId provided
      if (!siteId) {
        const siteResponse = await this.api.post('/sites', {
          name: config.name,
          custom_domain: config.customDomain
        })
        siteId = siteResponse.data.id
      }

      // Create a zip-like structure for Netlify
      const fileMap: Record<string, string> = {}
      files.forEach(file => {
        fileMap[file.path] = typeof file.content === 'string' 
          ? file.content 
          : file.content.toString('utf8')
      })

      // Deploy files
      const deployResponse = await this.api.post(`/sites/${siteId}/deploys`, {
        files: fileMap,
        ...(config.environmentVariables && {
          env: config.environmentVariables
        })
      })

      const deploymentData = deployResponse.data

      // Wait for deployment to complete
      const finalStatus = await this.waitForDeployment(deploymentData.id)

      return {
        id: deploymentData.id,
        url: deploymentData.deploy_ssl_url || deploymentData.deploy_url,
        status: finalStatus,
        provider: 'netlify',
        createdAt: deploymentData.created_at,
        previewUrl: deploymentData.deploy_url,
        domain: config.customDomain
      }

    } catch (error) {
      throw new Error(`Netlify deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getDeploymentLogs(deploymentId: string): Promise<string[]> {
    try {
      const response = await this.api.get(`/deploys/${deploymentId}`)
      const deploy = response.data
      
      const logs: string[] = []
      if (deploy.error_message) {
        logs.push(`[ERROR] ${deploy.error_message}`)
      }
      if (deploy.deploy_time) {
        logs.push(`[INFO] Deploy completed in ${deploy.deploy_time}s`)
      }
      
      return logs
    } catch (error) {
      console.warn('Could not fetch Netlify deployment logs:', error)
      return []
    }
  }

  async deleteDeployment(deploymentId: string): Promise<boolean> {
    try {
      await this.api.delete(`/deploys/${deploymentId}`)
      return true
    } catch (error) {
      console.error('Failed to delete Netlify deployment:', error)
      return false
    }
  }

  async updateDomain(deploymentId: string, domain: string): Promise<boolean> {
    try {
      // Get site ID from deployment
      const deployResponse = await this.api.get(`/deploys/${deploymentId}`)
      const siteId = deployResponse.data.site_id

      // Add custom domain to site
      await this.api.post(`/sites/${siteId}/domains`, {
        domain: domain
      })

      return true
    } catch (error) {
      console.error('Failed to update Netlify domain:', error)
      return false
    }
  }

  private async waitForDeployment(deploymentId: string, maxAttempts: number = 60): Promise<DeploymentStatus> {
    for (let i = 0; i < maxAttempts; i++) {
      const status = await this.getDeploymentStatus(deploymentId)
      
      if (status === 'ready' || status === 'error' || status === 'cancelled') {
        return status
      }

      // Wait 5 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 5000))
    }

    return 'error' // Timeout
  }
}

/**
 * GitHub Pages Deployment Provider
 */
export class GitHubPagesDeploymentProvider extends BaseDeploymentProvider {
  constructor(credentials: DeploymentCredentials['github']) {
    if (!credentials?.token || !credentials?.owner || !credentials?.repo) {
      throw new Error('GitHub token, owner, and repo are required')
    }
    super(credentials)
  }

  createApiClient(): AxiosInstance {
    return axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Authorization': `token ${this.credentials.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      timeout: 30000
    })
  }

  async deploy(config: DeploymentConfig, files: DeploymentFile[]): Promise<DeploymentResult> {
    try {
      const { owner, repo } = this.credentials

      // Create or update files in repository
      for (const file of files) {
        await this.createOrUpdateFile(owner, repo, file.path, file.content)
      }

      // Enable GitHub Pages if not already enabled
      await this.enableGitHubPages(owner, repo)

      // Generate deployment URL
      const url = `https://${owner}.github.io/${repo}`

      return {
        id: `${owner}-${repo}-${Date.now()}`,
        url,
        status: 'ready',
        provider: 'github-pages',
        createdAt: new Date().toISOString(),
        domain: config.customDomain
      }

    } catch (error) {
      throw new Error(`GitHub Pages deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getDeploymentStatus(deploymentId: string): Promise<DeploymentStatus> {
    // GitHub Pages deployments are typically ready immediately
    return 'ready'
  }

  async getDeploymentLogs(deploymentId: string): Promise<string[]> {
    return ['GitHub Pages deployment completed']
  }

  async deleteDeployment(deploymentId: string): Promise<boolean> {
    // Cannot delete GitHub Pages deployment without deleting repository
    return false
  }

  async updateDomain(deploymentId: string, domain: string): Promise<boolean> {
    try {
      const { owner, repo } = this.credentials

      // Update custom domain for GitHub Pages
      await this.api.put(`/repos/${owner}/${repo}/pages`, {
        source: {
          branch: 'main',
          path: '/'
        },
        cname: domain
      })

      return true
    } catch (error) {
      console.error('Failed to update GitHub Pages domain:', error)
      return false
    }
  }

  private async createOrUpdateFile(owner: string, repo: string, path: string, content: string | Buffer): Promise<void> {
    try {
      // Check if file exists
      let sha: string | undefined
      try {
        const existingFile = await this.api.get(`/repos/${owner}/${repo}/contents/${path}`)
        sha = existingFile.data.sha
      } catch {
        // File doesn't exist, no sha needed
      }

      // Create or update file
      await this.api.put(`/repos/${owner}/${repo}/contents/${path}`, {
        message: `Update ${path}`,
        content: Buffer.from(content).toString('base64'),
        ...(sha && { sha })
      })
    } catch (error) {
      throw new Error(`Failed to create/update file ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async enableGitHubPages(owner: string, repo: string): Promise<void> {
    try {
      await this.api.post(`/repos/${owner}/${repo}/pages`, {
        source: {
          branch: 'main',
          path: '/'
        }
      })
    } catch (error) {
      // Pages might already be enabled
      console.warn('Could not enable GitHub Pages (might already be enabled):', error)
    }
  }
}

/**
 * Deployment Manager
 * 
 * Central manager for handling deployments across multiple providers
 */
export class DeploymentManager {
  private providers: Map<DeploymentProvider, BaseDeploymentProvider> = new Map()
  private credentials: DeploymentCredentials

  constructor(credentials: DeploymentCredentials) {
    this.credentials = credentials
    this.initializeProviders()
  }

  private initializeProviders(): void {
    // Initialize Vercel provider
    if (this.credentials.vercel) {
      this.providers.set('vercel', new VercelDeploymentProvider(this.credentials.vercel))
    }

    // Initialize Netlify provider
    if (this.credentials.netlify) {
      this.providers.set('netlify', new NetlifyDeploymentProvider(this.credentials.netlify))
    }

    // Initialize GitHub Pages provider
    if (this.credentials.github) {
      this.providers.set('github-pages', new GitHubPagesDeploymentProvider(this.credentials.github))
    }
  }

  /**
   * Deploy to specified provider
   */
  async deploy(config: DeploymentConfig, files: DeploymentFile[]): Promise<DeploymentResult> {
    const provider = this.providers.get(config.provider)
    if (!provider) {
      throw new Error(`Provider ${config.provider} not configured`)
    }

    // Validate files
    if (!files || files.length === 0) {
      throw new Error('No files provided for deployment')
    }

    // Add default files if missing
    const enhancedFiles = this.addDefaultFiles(files, config)

    return provider.deploy(config, enhancedFiles)
  }

  /**
   * Get deployment status
   */
  async getStatus(provider: DeploymentProvider, deploymentId: string): Promise<DeploymentStatus> {
    const providerInstance = this.providers.get(provider)
    if (!providerInstance) {
      throw new Error(`Provider ${provider} not configured`)
    }

    return providerInstance.getDeploymentStatus(deploymentId)
  }

  /**
   * Get deployment logs
   */
  async getLogs(provider: DeploymentProvider, deploymentId: string): Promise<string[]> {
    const providerInstance = this.providers.get(provider)
    if (!providerInstance) {
      throw new Error(`Provider ${provider} not configured`)
    }

    return providerInstance.getDeploymentLogs(deploymentId)
  }

  /**
   * Delete deployment
   */
  async delete(provider: DeploymentProvider, deploymentId: string): Promise<boolean> {
    const providerInstance = this.providers.get(provider)
    if (!providerInstance) {
      throw new Error(`Provider ${provider} not configured`)
    }

    return providerInstance.deleteDeployment(deploymentId)
  }

  /**
   * Update custom domain
   */
  async updateDomain(provider: DeploymentProvider, deploymentId: string, domain: string): Promise<boolean> {
    const providerInstance = this.providers.get(provider)
    if (!providerInstance) {
      throw new Error(`Provider ${provider} not configured`)
    }

    return providerInstance.updateDomain(deploymentId, domain)
  }

  /**
   * Get available providers
   */
  getAvailableProviders(): DeploymentProvider[] {
    return Array.from(this.providers.keys())
  }

  /**
   * Validate deployment configuration
   */
  validateConfig(config: DeploymentConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!config.name || config.name.trim() === '') {
      errors.push('Deployment name is required')
    }

    if (!config.provider) {
      errors.push('Deployment provider is required')
    }

    if (!this.providers.has(config.provider)) {
      errors.push(`Provider ${config.provider} is not configured`)
    }

    // Provider-specific validation
    if (config.provider === 'vercel') {
      if (config.name && !/^[a-z0-9-]+$/.test(config.name)) {
        errors.push('Vercel project names must contain only lowercase letters, numbers, and hyphens')
      }
    }

    if (config.provider === 'netlify') {
      if (config.name && config.name.length > 63) {
        errors.push('Netlify site names must be 63 characters or less')
      }
    }

    if (config.customDomain) {
      const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/
      if (!domainRegex.test(config.customDomain)) {
        errors.push('Invalid custom domain format')
      }
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Add default files if missing
   */
  private addDefaultFiles(files: DeploymentFile[], config: DeploymentConfig): DeploymentFile[] {
    const fileMap = new Map(files.map(f => [f.path, f]))
    const enhancedFiles = [...files]

    // Add package.json if missing
    if (!fileMap.has('package.json')) {
      enhancedFiles.push({
        path: 'package.json',
        content: JSON.stringify({
          name: config.name,
          version: '1.0.0',
          private: true,
          scripts: {
            build: config.buildCommand || 'npm run build',
            start: 'npm run build'
          },
          dependencies: {
            react: '^18.2.0',
            'react-dom': '^18.2.0'
          },
          devDependencies: {
            '@types/react': '^18.0.0',
            '@types/react-dom': '^18.0.0',
            typescript: '^4.9.0',
            vite: '^4.0.0'
          }
        }, null, 2)
      })
    }

    // Add index.html if missing for static sites
    if (config.framework === 'static' && !fileMap.has('index.html')) {
      enhancedFiles.push({
        path: 'index.html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name}</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`
      })
    }

    // Add .gitignore if missing
    if (!fileMap.has('.gitignore')) {
      enhancedFiles.push({
        path: '.gitignore',
        content: `node_modules/
dist/
build/
.env
.env.local
.env.production
.DS_Store
*.log`
      })
    }

    return enhancedFiles
  }
}

/**
 * Deployment utilities and helpers
 */
export class DeploymentUtils {
  /**
   * Generate deployment preview URL
   */
  static generatePreviewUrl(provider: DeploymentProvider, deploymentId: string): string {
    switch (provider) {
      case 'vercel':
        return `https://${deploymentId}.vercel.app`
      case 'netlify':
        return `https://${deploymentId}--netlify.app`
      case 'github-pages':
        return `https://pages.github.com/preview/${deploymentId}`
      default:
        return `https://preview-${deploymentId}.example.com`
    }
  }

  /**
   * Estimate deployment time
   */
  static estimateDeploymentTime(provider: DeploymentProvider, fileCount: number): number {
    // Time in seconds
    const baseTime = {
      vercel: 30,
      netlify: 45,
      'github-pages': 60,
      'aws-s3': 20,
      firebase: 40
    }

    const perFileTime = {
      vercel: 0.5,
      netlify: 0.3,
      'github-pages': 1,
      'aws-s3': 0.1,
      firebase: 0.4
    }

    return (baseTime[provider] || 60) + (fileCount * (perFileTime[provider] || 0.5))
  }

  /**
   * Validate domain availability
   */
  static async isDomainAvailable(domain: string): Promise<boolean> {
    try {
      // Simple DNS lookup to check if domain resolves
      await axios.get(`https://${domain}`, { timeout: 5000 })
      return false // Domain is taken
    } catch {
      return true // Domain appears available
    }
  }

  /**
   * Generate deployment configuration suggestions
   */
  static suggestConfiguration(
    projectType: 'wordpress-migration' | 'react-app' | 'static-site',
    files: DeploymentFile[]
  ): Partial<DeploymentConfig> {
    const fileCount = files.length
    const hasReact = files.some(f => f.content.toString().includes('import React'))
    const hasNextJS = files.some(f => f.path === 'next.config.js')
    const hasVue = files.some(f => f.content.toString().includes('import Vue'))

    if (projectType === 'wordpress-migration') {
      return {
        framework: 'react',
        buildCommand: 'npm run build',
        outputDirectory: 'dist',
        provider: fileCount > 100 ? 'vercel' : 'netlify' // Vercel for larger projects
      }
    }

    if (hasNextJS) {
      return {
        framework: 'nextjs',
        buildCommand: 'npm run build',
        outputDirectory: '.next',
        provider: 'vercel' // Vercel is optimal for Next.js
      }
    }

    if (hasReact) {
      return {
        framework: 'react',
        buildCommand: 'npm run build',
        outputDirectory: 'build',
        provider: 'netlify'
      }
    }

    if (hasVue) {
      return {
        framework: 'vue',
        buildCommand: 'npm run build',
        outputDirectory: 'dist',
        provider: 'netlify'
      }
    }

    return {
      framework: 'static',
      provider: 'github-pages'
    }
  }
}

// Export all deployment utilities
export default {
  DeploymentManager,
  VercelDeploymentProvider,
  NetlifyDeploymentProvider,
  GitHubPagesDeploymentProvider,
  DeploymentUtils
}