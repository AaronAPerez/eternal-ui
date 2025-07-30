/**
 * 🔄 Builder Integration Tests
 * 
 * Testing the complete website builder workflow:
 * - Component creation and editing
 * - Drag and drop operations
 * - AI generation integration
 * - Real-time collaboration
 * - Export functionality
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WebsiteBuilderStudio from '@/components/WebsiteBuilder/WebsiteBuilderStudio'


// Mock external dependencies
jest.mock('@/services/ai/aiComponentGenerator')
jest.mock('@/hooks/useCollaboration')

describe('Website Builder Integration', () => {
  describe('Complete Workflow', () => {
    it('completes full component creation workflow', async () => {
      const user = userEvent.setup()
      
      render(<WebsiteBuilderStudio />)

      // 1. Select AI generation tool
      const aiTool = screen.getByRole('button', { name: /ai generator/i })
      await user.click(aiTool)

      // 2. Enter natural language prompt
      const promptInput = screen.getByPlaceholderText(/describe your component/i)
      await user.type(promptInput, 'Create a hero section for a tech startup')

      // 3. Generate component
      const generateButton = screen.getByRole('button', { name: /generate/i })
      await user.click(generateButton)

      // 4. Wait for AI generation (should be <2s as per target)
      await waitFor(() => {
        expect(screen.getByText(/hero section generated/i)).toBeInTheDocument()
      }, { timeout: 2000 })

      // 5. Drag component to canvas
      const generatedComponent = screen.getByTestId('generated-component')
      const canvas = screen.getByTestId('builder-canvas')

      fireEvent.dragStart(generatedComponent)
      fireEvent.dragOver(canvas)
      fireEvent.drop(canvas)

      // 6. Verify component is added to project
      expect(screen.getByTestId('canvas-component')).toBeInTheDocument()
    })

    it('maintains performance targets during heavy usage', async () => {
      const user = userEvent.setup()
      
      const startTime = performance.now()
      render(<WebsiteBuilderStudio />)
      
      // Simulate heavy usage: multiple components, drag operations
      for (let i = 0; i < 10; i++) {
        const aiTool = screen.getByRole('button', { name: /ai generator/i })
        await user.click(aiTool)
        
        const promptInput = screen.getByPlaceholderText(/describe your component/i)
        await user.clear(promptInput)
        await user.type(promptInput, `Create component ${i}`)
        
        const generateButton = screen.getByRole('button', { name: /generate/i })
        await user.click(generateButton)
        
        await waitFor(() => {
          expect(screen.getByText(new RegExp(`component ${i}`, 'i'))).toBeInTheDocument()
        })
      }
      
      const endTime = performance.now()
      const totalTime = endTime - startTime
      
      // Should handle 10 component generations efficiently
      expect(totalTime).toBeLessThan(20000) // 20 seconds for 10 components
    })
  })

  describe('Collaboration Features', () => {
    it('handles real-time collaborative editing', async () => {
      const { rerender } = render(<WebsiteBuilderStudio />)

      // Simulate receiving a collaborative update
      const collaborativeUpdate = {
        type: 'component_update',
        componentId: 'comp-1',
        changes: { props: { title: 'Updated by collaborator' } },
        userId: 'user-2'
      }

      // This would be triggered by the collaboration system
      fireEvent(window, new CustomEvent('collaboration-update', {
        detail: collaborativeUpdate
      }))

      // Verify the UI updates reflect collaborative changes
      await waitFor(() => {
        expect(screen.getByText('Updated by collaborator')).toBeInTheDocument()
      })
    })
  })

  describe('Export Functionality', () => {
    it('exports project to multiple frameworks', async () => {
      const user = userEvent.setup()
      
      render(<WebsiteBuilderStudio />)

      // Add some components first
      const addButton = screen.getByRole('button', { name: /add component/i })
      await user.click(addButton)

      // Open export dialog
      const exportButton = screen.getByRole('button', { name: /export/i })
      await user.click(exportButton)

      // Select React framework
      const reactOption = screen.getByRole('radio', { name: /react/i })
      await user.click(reactOption)

      // Start export
      const downloadButton = screen.getByRole('button', { name: /download/i })
      await user.click(downloadButton)

      // Verify export process completes
      await waitFor(() => {
        expect(screen.getByText(/export complete/i)).toBeInTheDocument()
      })
    })
  })
})