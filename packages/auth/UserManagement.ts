import { createHash, randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

/**
 * User Accounts & Migration History System
 * 
 * Comprehensive user management system with authentication,
 * migration history tracking, and user preference management.
 * Designed for scalability and security.
 */

// User types and interfaces
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: 'free' | 'pro' | 'team' | 'enterprise'
  status: 'active' | 'suspended' | 'pending_verification'
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  emailVerified: boolean
  twoFactorEnabled: boolean
  preferences: UserPreferences
  usage: UserUsage
  billing?: BillingInfo
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: {
    email: boolean
    browser: boolean
    migration: boolean
    deployment: boolean
    billing: boolean
  }
  defaultProvider: 'vercel' | 'netlify' | 'github-pages'
  autoDeployment: boolean
  privacySettings: {
    profileVisibility: 'public' | 'private'
    migrationHistoryPublic: boolean
    analyticsOptIn: boolean
  }
}

export interface UserUsage {
  migrationsThisMonth: number
  migrationsTotal: number
  deploymentsThisMonth: number
  deploymentsTotal: number
  storageUsed: number // in MB
  bandwidthUsed: number // in GB
  lastResetDate: string
  limits: {
    migrationsPerMonth: number
    deploymentsPerMonth: number
    storageLimit: number // in MB
    bandwidthLimit: number // in GB
  }
}

export interface BillingInfo {
  customerId: string
  subscriptionId?: string
  plan: string
  status: 'active' | 'past_due' | 'canceled' | 'trialing'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  paymentMethod?: {
    type: 'card' | 'paypal'
    last4?: string
    brand?: string
    expiryMonth?: number
    expiryYear?: number
  }
}

// Migration tracking interfaces
export interface Migration {
  id: string
  userId: string
  name: string
  sourceType: 'wordpress' | 'wix' | 'squarespace' | 'other'
  sourceUrl: string
  status: 'pending' | 'analyzing' | 'converting' | 'deploying' | 'completed' | 'failed'
  progress: number
  createdAt: string
  updatedAt: string
  completedAt?: string
  error?: string
  sourceData: {
    siteTitle: string
    siteDescription: string
    wordpressVersion?: string
    themeInfo?: {
      name: string
      version: string
    }
    pluginsDetected?: string[]
    contentStats: {
      posts: number
      pages: number
      media: number
      comments: number
    }
  }
  conversionResults?: {
    componentsGenerated: number
    pagesCreated: number
    mediaOptimized: number
    performanceScore: number
    accessibilityScore: number
    seoScore: number
  }
  deployment?: {
    provider: string
    deploymentId: string
    url: string
    customDomain?: string
    status: string
  }
  analytics: {
    timeSpent: number // in seconds
    stepsCompleted: string[]
    userFeedback?: {
      rating: number
      comment: string
    }
  }
}

export interface MigrationTemplate {
  id: string
  name: string
  description: string
  sourceType: string
  previewImage: string
  popularity: number
  tags: string[]
  configuration: {
    framework: string
    styling: string
    features: string[]
  }
  createdBy: string
  isPublic: boolean
  usageCount: number
}

// Authentication interfaces
export interface AuthSession {
  userId: string
  sessionId: string
  token: string
  refreshToken: string
  expiresAt: string
  deviceInfo: {
    userAgent: string
    ip: string
    location?: string
  }
  isActive: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
  twoFactorCode?: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  agreedToTerms: boolean
  marketingConsent?: boolean
}

/**
 * User Management Service
 */
export class UserManagementService {
  private readonly JWT_SECRET: string
  private readonly SALT_ROUNDS = 12
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours
  private readonly REFRESH_TOKEN_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days

  constructor(jwtSecret: string) {
    this.JWT_SECRET = jwtSecret
  }

  /**
   * Register new user
   */
  async registerUser(data: RegisterData): Promise<{ user: User; session: AuthSession }> {
    // Validate registration data
    const validation = this.validateRegistrationData(data)
    if (!validation.isValid) {
      throw new Error(`Registration validation failed: ${validation.errors.join(', ')}`)
    }

    // Check if user already exists
    const existingUser = await this.findUserByEmail(data.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, this.SALT_ROUNDS)

    // Create user
    const user: User = {
      id: this.generateId(),
      email: data.email.toLowerCase().trim(),
      name: data.name.trim(),
      plan: 'free',
      status: 'pending_verification',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailVerified: false,
      twoFactorEnabled: false,
      preferences: this.getDefaultPreferences(),
      usage: this.getDefaultUsage('free'),
      billing: undefined
    }

    // Save user to database
    await this.saveUser(user, passwordHash)

    // Create session
    const session = await this.createSession(user.id, {
      userAgent: 'Web Browser',
      ip: '0.0.0.0'
    })

    // Send verification email
    await this.sendVerificationEmail(user)

    return { user, session }
  }

  /**
   * Authenticate user login
   */
  async loginUser(credentials: LoginCredentials, deviceInfo: { userAgent: string; ip: string }): Promise<{ user: User; session: AuthSession }> {
    // Find user by email
    const user = await this.findUserByEmail(credentials.email)
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Verify password
    const passwordHash = await this.getUserPasswordHash(user.id)
    const isValidPassword = await bcrypt.compare(credentials.password, passwordHash)
    if (!isValidPassword) {
      throw new Error('Invalid email or password')
    }

    // Check 2FA if enabled
    if (user.twoFactorEnabled) {
      if (!credentials.twoFactorCode) {
        throw new Error('Two-factor authentication code required')
      }
      const isValidTwoFactor = await this.verifyTwoFactorCode(user.id, credentials.twoFactorCode)
      if (!isValidTwoFactor) {
        throw new Error('Invalid two-factor authentication code')
      }
    }

    // Check user status
    if (user.status === 'suspended') {
      throw new Error('Account has been suspended')
    }

    // Update last login
    user.lastLoginAt = new Date().toISOString()
    user.updatedAt = new Date().toISOString()
    await this.updateUser(user)

    // Create session
    const session = await this.createSession(user.id, deviceInfo, credentials.rememberMe)

    return { user, session }
  }

  /**
   * Create user session
   */
  async createSession(userId: string, deviceInfo: { userAgent: string; ip: string }, rememberMe = false): Promise<AuthSession> {
    const sessionId = this.generateId()
    const duration = rememberMe ? this.REFRESH_TOKEN_DURATION : this.SESSION_DURATION

    const session: AuthSession = {
      userId,
      sessionId,
      token: this.generateJWT(userId, sessionId),
      refreshToken: this.generateRefreshToken(),
      expiresAt: new Date(Date.now() + duration).toISOString(),
      deviceInfo,
      isActive: true
    }

    await this.saveSession(session)
    return session
  }

  /**
   * Verify session token
   */
  async verifySession(token: string): Promise<User | null> {
    try {
      const payload = jwt.verify(token, this.JWT_SECRET) as { userId: string; sessionId: string }
      
      // Check if session exists and is active
      const session = await this.getSession(payload.sessionId)
      if (!session || !session.isActive || new Date(session.expiresAt) < new Date()) {
        return null
      }

      // Get user
      const user = await this.findUserById(payload.userId)
      return user
    } catch {
      return null
    }
  }

  /**
   * Logout user (invalidate session)
   */
  async logoutUser(sessionId: string): Promise<void> {
    await this.invalidateSession(sessionId)
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<User> {
    const user = await this.findUserById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    user.preferences = { ...user.preferences, ...preferences }
    user.updatedAt = new Date().toISOString()
    
    await this.updateUser(user)
    return user
  }

  // Database operations (implement with your preferred database)
  private async saveUser(user: User, passwordHash: string): Promise<void> {
    // Implementation depends on your database choice
    // Example: PostgreSQL, MongoDB, etc.
    console.log('Saving user to database:', user.id)
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    // Database query implementation
    return null
  }

  private async findUserById(id: string): Promise<User | null> {
    // Database query implementation
    return null
  }

  private async updateUser(user: User): Promise<void> {
    // Database update implementation
    console.log('Updating user:', user.id)
  }

  private async getUserPasswordHash(userId: string): Promise<string> {
    // Database query implementation
    return ''
  }

  private async saveSession(session: AuthSession): Promise<void> {
    // Database save implementation
    console.log('Saving session:', session.sessionId)
  }

  private async getSession(sessionId: string): Promise<AuthSession | null> {
    // Database query implementation
    return null
  }

  private async invalidateSession(sessionId: string): Promise<void> {
    // Database update implementation
    console.log('Invalidating session:', sessionId)
  }

  // Utility methods
  private generateId(): string {
    return randomBytes(16).toString('hex')
  }

  private generateJWT(userId: string, sessionId: string): string {
    return jwt.sign({ userId, sessionId }, this.JWT_SECRET, { expiresIn: '24h' })
  }

  private generateRefreshToken(): string {
    return randomBytes(32).toString('hex')
  }

  private validateRegistrationData(data: RegisterData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Valid email is required')
    }

    if (!data.password || data.password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }

    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long')
    }

    if (!data.agreedToTerms) {
      errors.push('You must agree to the terms of service')
    }

    return {
      isValid: errors.length === 0,
      errors
    
    }
  } 
}