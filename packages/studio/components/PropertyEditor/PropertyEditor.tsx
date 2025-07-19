'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import {
  Settings,
  Palette,
  Layout,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  RotateCcw,
  Code,
  Layers,
  Move,
  Maximize,
  Type,
  Image,
  Link,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Info,
  AlertCircle
} from 'lucide-react'
import { useCanvas, CanvasElement } from '../Canvas/CanvasSystem'
import { COMPONENT_LIBRARY } from '../DragDrop/DragDropInterface'
import PropertySchema from '../DragDrop/DragDropInterface'

/**
 * Property Editor Types and Interfaces
 */

interface PropertyGroup {
  name: string
  icon: React.ComponentType<{ className?: string }>
  properties: string[]
  collapsed?: boolean
}

interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning' | 'info'
}

interface PropertyFieldProps {
  name: string
  schema: PropertySchema[string]
  value: any
  onChange: (value: any) => void
  error?: string
  disabled?: boolean
}

/**
 * Individual Property Field Components
 */

const StringField: React.FC<PropertyFieldProps> = ({ name, schema, value, onChange, error, disabled }) => {
  const [localValue, setLocalValue] = useState(value || schema.default || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
  }

  const isMultiline = schema.validation?.max ? schema.validation.max > 100 : false

  return (
    <div className="property-field">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {schema.label}
        {schema.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {schema.description && (
        <p className="text-xs text-gray-500 mb-2">{schema.description}</p>
      )}
      {isMultiline ? (
        <textarea
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          className={`w-full p-2 border rounded-lg resize-vertical min-h-[80px] ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100' : ''}`}
          placeholder={`Enter ${schema.label.toLowerCase()}...`}
        />
      ) : (
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          className={`w-full p-2 border rounded-lg ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100' : ''}`}
          placeholder={`Enter ${schema.label.toLowerCase()}...`}
        />
      )}
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

const NumberField: React.FC<PropertyFieldProps> = ({ name, schema, value, onChange, error, disabled }) => {
  const [localValue, setLocalValue] = useState(value || schema.default || 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="property-field">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {schema.label}
        {schema.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {schema.description && (
        <p className="text-xs text-gray-500 mb-2">{schema.description}</p>
      )}
      <input
        type="number"
        value={localValue}
        onChange={handleChange}
        disabled={disabled}
        min={schema.validation?.min}
        max={schema.validation?.max}
        className={`w-full p-2 border rounded-lg ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'bg-gray-100' : ''}`}
        placeholder={`Enter ${schema.label.toLowerCase()}...`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

const BooleanField: React.FC<PropertyFieldProps> = ({ name, schema, value, onChange, error, disabled }) => {
  const [localValue, setLocalValue] = useState(value ?? schema.default ?? false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="property-field">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={localValue}
          onChange={handleChange}
          disabled={disabled}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-700">
          {schema.label}
          {schema.validation?.required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
      {schema.description && (
        <p className="text-xs text-gray-500 mt-1 ml-6">{schema.description}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 mt-1 ml-6 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

const ColorField: React.FC<PropertyFieldProps> = ({ name, schema, value, onChange, error, disabled }) => {
  const [localValue, setLocalValue] = useState(value || schema.default || '#000000')
  const [showPicker, setShowPicker] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
  }

  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ]

  return (
    <div className="property-field">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {schema.label}
        {schema.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {schema.description && (
        <p className="text-xs text-gray-500 mb-2">{schema.description}</p>
      )}
      
      <div className="flex items-center space-x-2">
        <div
          className="w-10 h-10 border rounded-lg cursor-pointer shadow-sm"
          style={{ backgroundColor: localValue }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          className={`flex-1 p-2 border rounded-lg ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100' : ''}`}
          placeholder="#000000"
        />
        <input
          type="color"
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          className="w-10 h-10 border rounded-lg cursor-pointer"
        />
      </div>

      {showPicker && (
        <div className="mt-2 p-2 border rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-5 gap-1 mb-2">
            {presetColors.map(color => (
              <button
                key={color}
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setLocalValue(color)
                  onChange(color)
                  setShowPicker(false)
                }}
              />
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

const SelectField: React.FC<PropertyFieldProps> = ({ name, schema, value, onChange, error, disabled }) => {
  const [localValue, setLocalValue] = useState(value || schema.default || '')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="property-field">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {schema.label}
        {schema.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {schema.description && (
        <p className="text-xs text-gray-500 mb-2">{schema.description}</p>
      )}
      <select
        value={localValue}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full p-2 border rounded-lg ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'bg-gray-100' : ''}`}
      >
        <option value="">Select {schema.label.toLowerCase()}...</option>
        {schema.options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

const ImageField: React.FC<PropertyFieldProps> = ({ name, schema, value, onChange, error, disabled }) => {
  const [localValue, setLocalValue] = useState(value || schema.default || '')
  const [isUploading, setIsUploading] = useState(false)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // In a real implementation, this would upload to a cloud service
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setLocalValue(result)
        onChange(result)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload failed:', error)
      setIsUploading(false)
    }
  }

  return (
    <div className="property-field">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {schema.label}
        {schema.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {schema.description && (
        <p className="text-xs text-gray-500 mb-2">{schema.description}</p>
      )}
      
      {/* Image Preview */}
      {localValue && (
        <div className="mb-2">
          <img
            src={localValue}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg border"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* URL Input */}
      <input
        type="url"
        value={localValue}
        onChange={handleUrlChange}
        disabled={disabled}
        className={`w-full p-2 border rounded-lg mb-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'bg-gray-100' : ''}`}
        placeholder="Enter image URL..."
      />

      {/* File Upload */}
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={disabled || isUploading}
          className="hidden"
          id={`file-${name}`}
        />
        <label
          htmlFor={`file-${name}`}
          className={`px-3 py-1 text-xs border rounded cursor-pointer ${
            disabled || isUploading
              ? 'bg-gray-100 text-gray-400'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </label>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

const ArrayField: React.FC<PropertyFieldProps> = ({ name, schema, value, onChange, error, disabled }) => {
  const [localValue, setLocalValue] = useState<any[]>(value || schema.default || [])

  const addItem = () => {
    const newValue = [...localValue, '']
    setLocalValue(newValue)
    onChange(newValue)
  }

  const removeItem = (index: number) => {
    const newValue = localValue.filter((_, i) => i !== index)
    setLocalValue(newValue)
    onChange(newValue)
  }

  const updateItem = (index: number, itemValue: any) => {
    const newValue = [...localValue]
    newValue[index] = itemValue
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="property-field">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {schema.label}
        {schema.validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {schema.description && (
        <p className="text-xs text-gray-500 mb-2">{schema.description}</p>
      )}
      
      <div className="space-y-2">
        {localValue.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              disabled={disabled}
              className="flex-1 p-2 border rounded-lg"
              placeholder={`Item ${index + 1}`}
            />
            <button
              onClick={() => removeItem(index)}
              disabled={disabled}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        <button
          onClick={addItem}
          disabled={disabled}
          className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mx-auto" />
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Property Group Component
 */
const PropertyGroup: React.FC<{
  group: PropertyGroup
  element: CanvasElement
  componentDef: any
  onPropertyChange: (property: string, value: any) => void
  validationErrors: ValidationError[]
  collapsed: boolean
  onToggleCollapse: () => void
}> = ({ group, element, componentDef, onPropertyChange, validationErrors, collapsed, onToggleCollapse }) => {
  const renderPropertyField = (propertyName: string) => {
    const schema = componentDef.propSchema[propertyName]
    if (!schema) return null

    const value = element.props[propertyName]
    const error = validationErrors.find(e => e.field === propertyName)?.message

    const commonProps = {
      name: propertyName,
      schema,
      value,
      onChange: (newValue: any) => onPropertyChange(propertyName, newValue),
      error,
      disabled: element.constraints.locked
    }

    switch (schema.type) {
      case 'string':
        return <StringField key={propertyName} {...commonProps} />
      case 'number':
        return <NumberField key={propertyName} {...commonProps} />
      case 'boolean':
        return <BooleanField key={propertyName} {...commonProps} />
      case 'color':
        return <ColorField key={propertyName} {...commonProps} />
      case 'select':
        return <SelectField key={propertyName} {...commonProps} />
      case 'image':
        return <ImageField key={propertyName} {...commonProps} />
      case 'array':
        return <ArrayField key={propertyName} {...commonProps} />
      default:
        return <StringField key={propertyName} {...commonProps} />
    }
  }

  // Filter properties that should show in this group
  const groupProperties = group.properties.filter(prop => {
    const schema = componentDef.propSchema[prop]
    if (!schema) return false
    
    // Check conditional visibility
    if (schema.conditional) {
      const conditionValue = element.props[schema.conditional.field]
      return conditionValue === schema.conditional.value
    }
    
    return true
  })

  if (groupProperties.length === 0) return null

  return (
    <div className="property-group border rounded-lg overflow-hidden">
      <button
        onClick={onToggleCollapse}
        className="w-full px-3 py-2 bg-gray-50 border-b text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <group.icon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{group.name}</span>
        </div>
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      
      {!collapsed && (
        <div className="p-3 space-y-4">
          {groupProperties.map(renderPropertyField)}
        </div>
      )}
    </div>
  )
}

/**
 * Main Property Editor Component
 */
export const PropertyEditor: React.FC<{
  className?: string
}> = ({ className }) => {
  const { selectedElement, updateElement, deleteElement, duplicateElement } = useCanvas()
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

  // Get component definition
  const componentDef = useMemo(() => {
    if (!selectedElement) return null
    return COMPONENT_LIBRARY.find(comp => comp.type === selectedElement.type)
  }, [selectedElement])

  // Define property groups
  const propertyGroups: PropertyGroup[] = useMemo(() => {
    if (!componentDef) return []

    const groups: PropertyGroup[] = [
      {
        name: 'Content',
        icon: Type,
        properties: Object.keys(componentDef.propSchema).filter(prop => {
          const schema = componentDef.propSchema[prop]
          return !schema.group || schema.group === 'content'
        })
      },
      {
        name: 'Appearance',
        icon: Palette,
        properties: Object.keys(componentDef.propSchema).filter(prop => {
          const schema = componentDef.propSchema[prop]
          return schema.group === 'appearance'
        })
      },
      {
        name: 'Layout',
        icon: Layout,
        properties: Object.keys(componentDef.propSchema).filter(prop => {
          const schema = componentDef.propSchema[prop]
          return schema.group === 'layout'
        })
      },
      {
        name: 'Behavior',
        icon: Settings,
        properties: Object.keys(componentDef.propSchema).filter(prop => {
          const schema = componentDef.propSchema[prop]
          return schema.group === 'behavior'
        })
      }
    ]

    return groups.filter(group => group.properties.length > 0)
  }, [componentDef])

  // Validate properties
  useEffect(() => {
    if (!selectedElement || !componentDef) {
      setValidationErrors([])
      return
    }

    const errors: ValidationError[] = []

    Object.entries(componentDef.propSchema).forEach(([property, schema]) => {
      const value = selectedElement.props[property]

      // Required validation
      if (schema.validation?.required && (!value || value === '')) {
        errors.push({
          field: property,
          message: `${schema.label} is required`,
          severity: 'error'
        })
      }

      // Pattern validation
      if (value && schema.validation?.pattern && !schema.validation.pattern.test(value)) {
        errors.push({
          field: property,
          message: `${schema.label} format is invalid`,
          severity: 'error'
        })
      }

      // Min/Max validation for numbers
      if (schema.type === 'number' && value !== undefined) {
        if (schema.validation?.min && value < schema.validation.min) {
          errors.push({
            field: property,
            message: `${schema.label} must be at least ${schema.validation.min}`,
            severity: 'error'
          })
        }
        if (schema.validation?.max && value > schema.validation.max) {
          errors.push({
            field: property,
            message: `${schema.label} must be at most ${schema.validation.max}`,
            severity: 'error'
          })
        }
      }
    })

    setValidationErrors(errors)
  }, [selectedElement, componentDef])

  const handlePropertyChange = useCallback((property: string, value: any) => {
    if (!selectedElement) return

    const newProps = { ...selectedElement.props, [property]: value }
    updateElement(selectedElement.id, { props: newProps })
  }, [selectedElement, updateElement])

  const handleToggleCollapse = useCallback((groupName: string) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev)
      if (newSet.has(groupName)) {
        newSet.delete(groupName)
      } else {
        newSet.add(groupName)
      }
      return newSet
    })
  }, [])

  const handleToggleLock = useCallback(() => {
    if (!selectedElement) return
    updateElement(selectedElement.id, {
      constraints: {
        ...selectedElement.constraints,
        locked: !selectedElement.constraints.locked
      }
    })
  }, [selectedElement, updateElement])

  const handleToggleVisibility = useCallback(() => {
    if (!selectedElement) return
    // This would typically toggle a visibility property
    const isVisible = selectedElement.props.visible !== false
    handlePropertyChange('visible', !isVisible)
  }, [selectedElement, handlePropertyChange])

  const handleDuplicate = useCallback(() => {
    if (!selectedElement) return
    duplicateElement(selectedElement.id)
  }, [selectedElement, duplicateElement])

  const handleDelete = useCallback(() => {
    if (!selectedElement) return
    deleteElement(selectedElement.id)
  }, [selectedElement, deleteElement])

  const handleReset = useCallback(() => {
    if (!selectedElement || !componentDef) return
    updateElement(selectedElement.id, { props: { ...componentDef.defaultProps } })
  }, [selectedElement, componentDef, updateElement])

  if (!selectedElement) {
    return (
      <div className={`property-editor h-full flex flex-col ${className || ''}`}>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No element selected</p>
            <p className="text-sm">Select an element to edit its properties</p>
          </div>
        </div>
      </div>
    )
  }

  if (!componentDef) {
    return (
      <div className={`property-editor h-full flex flex-col ${className || ''}`}>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <p className="text-lg font-medium">Unknown component</p>
            <p className="text-sm">Component type "{selectedElement.type}" not found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`property-editor h-full flex flex-col ${className || ''}`}>
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-blue-100 rounded">
              <componentDef.icon />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{selectedElement.name}</h3>
              <p className="text-xs text-gray-500">{componentDef.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={handleToggleVisibility}
              className="p-1 rounded hover:bg-gray-100"
              title="Toggle Visibility"
            >
              {selectedElement.props.visible !== false ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
            
            <button
              onClick={handleToggleLock}
              className="p-1 rounded hover:bg-gray-100"
              title="Toggle Lock"
            >
              {selectedElement.constraints.locked ? (
                <Lock className="w-4 h-4" />
              ) : (
                <Unlock className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDuplicate}
            className="flex-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center"
          >
            <Copy className="w-3 h-3 mr-1" />
            Duplicate
          </button>
          <button
            onClick={handleReset}
            className="flex-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-600 rounded flex items-center justify-center"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </button>
        </div>

        {/* Validation Errors Summary */}
        {validationErrors.length > 0 && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
            <div className="flex items-center text-red-600 text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              {validationErrors.length} validation error{validationErrors.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      {/* Property Groups */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {propertyGroups.map(group => (
          <PropertyGroup
            key={group.name}
            group={group}
            element={selectedElement}
            componentDef={componentDef}
            onPropertyChange={handlePropertyChange}
            validationErrors={validationErrors}
            collapsed={collapsedGroups.has(group.name)}
            onToggleCollapse={() => handleToggleCollapse(group.name)}
          />
        ))}

        {/* Element Info */}
        <div className="border rounded-lg p-3 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Info className="w-4 h-4 mr-1" />
            Element Info
          </h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div>ID: <code className="bg-white px-1 rounded">{selectedElement.id}</code></div>
            <div>Type: <code className="bg-white px-1 rounded">{selectedElement.type}</code></div>
            <div>Created: {new Date(selectedElement.metadata.createdAt).toLocaleDateString()}</div>
            <div>Version: {selectedElement.metadata.version}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyEditor
export type { PropertyFieldProps, ValidationError }