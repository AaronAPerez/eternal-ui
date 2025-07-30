/**
 * 🤖 AI Component Generator Tests
 * 
 * Testing AI-powered component generation:
 * - Natural language processing
 * - Component code generation
 * - Performance targets (<2s generation)
 * - Error handling and fallbacks
 */

import { AIComponentGenerator } from '../aiComponentGenerator'

// Mock OpenAI
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn()
        }
      }
    }))
  }
})

describe('AI Component Generator', () => {
  let generator: AIComponentGenerator
  let mockOpenAI: any

  beforeEach(() => {
    const OpenAI = require('openai').default
    mockOpenAI = new OpenAI()
    generator = new AIComponentGenerator('test-api-key')
  })

  describe('Component Generation', () => {
    it('generates valid React component from natural language', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              type: 'hero-section',
              props: {
                title: 'Welcome to Our Website',
                subtitle: 'Build amazing things',
                ctaText: 'Get Started'
              },
              styles: {
                className: 'bg-blue-600 text-white py-20 text-center'
              },
              children: []
            })
          }
        }]
      }

      mockOpenAI.chat.completions.create.mockResolvedValue(mockResponse)

      const result = await generator.generateComponent(
        'Create a hero section for a tech startup',
        {
          existingComponents: [],
          brandColors: ['#3B82F6'],
          framework: 'react'
        }
      )

      expect(result).toEqual({
        type: 'hero-section',
        props: expect.objectContaining({
          title: expect.any(String),
          subtitle: expect.any(String)
        }),
        styles: expect.objectContaining({
          className: expect.any(String)
        }),
        children: expect.any(Array)
      })
    })

    it('meets performance target of <2s generation time', async () => {
      const mockResponse = {
        choices: [{ message: { content: '{"type":"test","props":{},"styles":{}}' } }]
      }
      mockOpenAI.chat.completions.create.mockResolvedValue(mockResponse)

      const startTime = performance.now()
      
      await generator.generateComponent('Create a simple button', {
        existingComponents: [],
        brandColors: [],
        framework: 'react'
      })

      const endTime = performance.now()
      const duration = endTime - startTime

      // Should complete in under 2000ms as per checklist target
      expect(duration).toBeLessThan(2000)
    })

    it('handles AI service errors gracefully', async () => {
      mockOpenAI.chat.completions.create.mockRejectedValue(new Error('API Error'))

      await expect(
        generator.generateComponent('Create a component', {
          existingComponents: [],
          brandColors: [],
          framework: 'react'
        })
      ).rejects.toThrow('Failed to generate component')
    })

    it('validates generated component schema', async () => {
      const invalidResponse = {
        choices: [{
          message: {
            content: '{"invalid": "schema"}'
          }
        }]
      }
      mockOpenAI.chat.completions.create.mockResolvedValue(invalidResponse)

      await expect(
        generator.generateComponent('Create invalid component', {
          existingComponents: [],
          brandColors: [],
          framework: 'react'
        })
      ).rejects.toThrow()
    })
  })

  describe('Component Variations', () => {
    it('generates multiple variations of a base component', async () => {
      const baseComponent = {
        id: 'base-1',
        type: 'button',
        props: { text: 'Click me' },
        styles: { className: 'btn-primary' },
        position: { x: 0, y: 0 },
        size: { width: 100, height: 40 },
        children: [],
        metadata: { created: new Date(), modified: new Date(), version: 1 }
      }

      const mockResponses = [
        { choices: [{ message: { content: '{"type":"button","props":{"text":"Primary Button"},"styles":{"className":"btn-primary"}}' } }] },
        { choices: [{ message: { content: '{"type":"button","props":{"text":"Secondary Button"},"styles":{"className":"btn-secondary"}}' } }] }
      ]

      mockOpenAI.chat.completions.create
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1])

      const variations = await generator.generateVariations(
        baseComponent,
        ['primary', 'secondary']
      )

      expect(variations).toHaveLength(2)
      expect(variations[0].props.text).toContain('Primary')
      expect(variations[1].props.text).toContain('Secondary')
    })
  })

  describe('Context Awareness', () => {
    it('considers existing components for consistency', async () => {
      const existingComponents = [
        {
          id: 'existing-1',
          type: 'header',
          props: { brand: 'TechCorp' },
          styles: { className: 'bg-blue-600' },
          position: { x: 0, y: 0 },
          size: { width: 1200, height: 80 },
          children: [],
          metadata: { created: new Date(), modified: new Date(), version: 1 }
        }
      ]

      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              type: 'footer',
              props: { brand: 'TechCorp' },
              styles: { className: 'bg-blue-600 text-white' }
            })
          }
        }]
      }

      mockOpenAI.chat.completions.create.mockResolvedValue(mockResponse)

      const result = await generator.generateComponent(
        'Create a matching footer',
        {
          existingComponents,
          brandColors: ['#3B82F6'],
          framework: 'react'
        }
      )

      // Should maintain brand consistency
      expect(result.props.brand).toBe('TechCorp')
      expect(result.styles.className).toContain('bg-blue-600')
    })
  })
})