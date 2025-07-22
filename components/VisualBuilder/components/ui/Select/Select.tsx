// // src/components/ui/Select/Select.tsx
// import React, { forwardRef, useState, useRef, useEffect } from 'react'
// import { cva, type VariantProps } from 'class-variance-authority'
// import { ChevronDown, Check, X } from 'lucide-react'
// import { cn } from '@/utils/cn'
// import { generateId, trapFocus } from '@/utils/accessibility'
// import { BaseComponentProps, AccessibilityProps } from '@/types/component'

// /**
//  * Select variant styles using class-variance-authority
//  */
// const selectVariants = cva(
//   [
//     'flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2',
//     'ring-offset-background transition-colors',
//     'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
//     'disabled:cursor-not-allowed disabled:opacity-50',
//     'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive',
//   ],
//   {
//     variants: {
//       size: {
//         sm: 'h-8 px-2 text-xs',
//         md: 'h-9 px-3 text-sm',
//         lg: 'h-10 px-4 text-base',
//       },
//       variant: {
//         default: '',
//         error: 'border-destructive focus:ring-destructive',
//       },
//     },
//     defaultVariants: {
//       size: 'md',
//       variant: 'default',
//     },
//   }
// )

// const optionVariants = cva(
//   [
//     'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm',
//     'outline-none transition-colors',
//     'focus:bg-accent focus:text-accent-foreground',
//     'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
//     'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
//   ]
// )

// export interface SelectOption {
//   value: string
//   label: string
//   disabled?: boolean
//   group?: string
// }

// export interface SelectProps
//   extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
//     VariantProps<typeof selectVariants>,
//     BaseComponentProps,
//     AccessibilityProps {
//   /** Array of options to display */
//   options: SelectOption[]
//   /** Currently selected value */
//   value?: string
//   /** Default selected value */
//   defaultValue?: string
//   /** Placeholder text when no option is selected */
//   placeholder?: string
//   /** Whether the select is required */
//   required?: boolean
//   /** Whether multiple selections are allowed */
//   multiple?: boolean
//   /** Whether the select is searchable */
//   searchable?: boolean
//   /** Whether to show a clear button */
//   clearable?: boolean
//   /** Loading state */
//   loading?: boolean
//   /** Error message */
//   error?: string
//   /** Label for the select */
//   label?: string
//   /** Helper text */
//   helperText?: string
//   /** Callback when selection changes */
//   onChange?: (value: string | string[] | null) => void
//   /** Callback when dropdown opens */
//   onOpen?: () => void
//   /** Callback when dropdown closes */
//   onClose?: () => void
//   /** Custom filter function for searchable select */
//   filterFn?: (option: SelectOption, query: string) => boolean
// }

// /**
//  * Select component with comprehensive accessibility and features
//  * 
//  * Features:
//  * - Full keyboard navigation (Arrow keys, Enter, Escape, Space)
//  * - Screen reader compatibility with proper ARIA attributes
//  * - Searchable options with filtering
//  * - Multi-select support
//  * - Grouped options
//  * - Loading and error states
//  * - Clearable selections
//  * - Custom filtering
//  * 
//  * @example
//  * ```tsx
//  * const options = [
//  *   { value: 'apple', label: 'Apple' },
//  *   { value: 'banana', label: 'Banana' },
//  *   { value: 'orange', label: 'Orange' },
//  * ]
//  * 
//  * <Select
//  *   label="Choose a fruit"
//  *   options={options}
//  *   placeholder="Select fruit..."
//  *   onChange={(value) => console.log(value)}
//  * />
//  * ```
//  */
// export const Select = forwardRef<HTMLButtonElement, SelectProps>(
//   (
//     {
//       className,
//       size,
//       variant,
//       options = [],
//       value,
//       defaultValue,
//       placeholder = 'Select an option...',
//       required,
//       multiple = false,
//       searchable = false,
//       clearable = false,
//       loading = false,
//       disabled,
//       error,
//       label,
//       helperText,
//       onChange,
//       onOpen,
//       onClose,
//       filterFn,
//       id,
//       'data-testid': testId,
//       'aria-label': ariaLabel,
//       'aria-describedby': ariaDescribedBy,
//       ...props
//     },
//     ref
//   ) => {
//     // State management
//     const [isOpen, setIsOpen] = useState(false)
//     const [selectedValue, setSelectedValue] = useState<string | string[]>(
//       multiple ? (defaultValue ? [defaultValue] : []) : (defaultValue || '')
//     )
//     const [searchQuery, setSearchQuery] = useState('')
//     const [highlightedIndex, setHighlightedIndex] = useState(-1)
    
//     // Refs
//     const dropdownRef = useRef<HTMLDivElement>(null)
//     const searchInputRef = useRef<HTMLInputElement>(null)
//     const optionRefs = useRef<(HTMLDivElement | null)[]>([])
    
//     // IDs for accessibility
//     const [internalId] = useState(() => id || generateId('select'))
//     const listboxId = `${internalId}-listbox`
//     const searchId = `${internalId}-search`
//     const helperTextId = `${internalId}-helper`
//     const errorId = `${internalId}-error`
    
//     // Controlled vs uncontrolled
//     const isControlled = value !== undefined
//     const currentValue = isControlled ? value : selectedValue
    
//     // Filter options based on search query
//     const filteredOptions = searchable && searchQuery
//       ? options.filter(option => 
//           filterFn ? filterFn(option, searchQuery) : 
//           option.label.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       : options
    
//     // Group options if they have groups
//     const groupedOptions = filteredOptions.reduce((groups, option) => {
//       const group = option.group || 'default'
//       if (!groups[group]) groups[group] = []
//       groups[group].push(option)
//       return groups
//     }, {} as Record<string, SelectOption[]>)
    
//     // Get display text for selected value(s)
//     const getDisplayText = () => {
//       if (multiple && Array.isArray(currentValue)) {
//         if (currentValue.length === 0) return placeholder
//         if (currentValue.length === 1) {
//           const option = options.find(opt => opt.value === currentValue[0])
//           return option?.label || currentValue[0]
//         }
//         return `${currentValue.length} selected`
//       } else {
//         const option = options.find(opt => opt.value === currentValue)
//         return option?.label || placeholder
//       }
//     }
    
//     // Handle option selection
//     const handleSelectOption = (optionValue: string) => {
//       let newValue: string | string[]
      
//       if (multiple && Array.isArray(currentValue)) {
//         newValue = currentValue.includes(optionValue)
//           ? currentValue.filter(v => v !== optionValue)
//           : [...currentValue, optionValue]
//       } else {
//         newValue = optionValue
//         setIsOpen(false)
//         onClose?.()
//       }
      
//       if (!isControlled) {
//         setSelectedValue(newValue)
//       }
      
//       onChange?.(newValue)
//       setSearchQuery('')
//     }
    
//     // Handle clear selection
//     const handleClear = (e: React.MouseEvent) => {
//       e.stopPropagation()
//       const newValue = multiple ? [] : ''
      
//       if (!isControlled) {
//         setSelectedValue(newValue)
//       }
      
//       onChange?.(multiple ? [] : null)
//     }
    
//     // Handle dropdown toggle
//     const handleToggle = () => {
//       if (disabled || loading) return
      
//       const newIsOpen = !isOpen
//       setIsOpen(newIsOpen)
      
//       if (newIsOpen) {
//         onOpen?.()
//         setHighlightedIndex(-1)
        
//         // Focus search input if searchable
//         setTimeout(() => {
//           if (searchable && searchInputRef.current) {
//             searchInputRef.current.focus()
//           }
//         }, 0)
//       } else {
//         onClose?.()
//         setSearchQuery('')
//       }
//     }
    
//     // Keyboard navigation
//     const handleKeyDown = (e: React.KeyboardEvent) => {
//       switch (e.key) {
//         case 'ArrowDown':
//           e.preventDefault()
//           if (!isOpen) {
//             setIsOpen(true)
//             onOpen?.()
//           } else {
//             setHighlightedIndex(prev => 
//               prev < filteredOptions.length - 1 ? prev + 1 : 0
//             )
//           }
//           break
          
//         case 'ArrowUp':
//           e.preventDefault()
//           if (isOpen) {
//             setHighlightedIndex(prev => 
//               prev > 0 ? prev - 1 : filteredOptions.length - 1
//             )
//           }
//           break
          
//         case 'Enter':
//         case ' ':
//           e.preventDefault()
//           if (!isOpen) {
//             setIsOpen(true)
//             onOpen?.()
//           } else if (highlightedIndex >= 0) {
//             handleSelectOption(filteredOptions[highlightedIndex].value)
//           }
//           break
          
//         case 'Escape':
//           e.preventDefault()
//           setIsOpen(false)
//           onClose?.()
//           setSearchQuery('')
//           break
          
//         case 'Tab':
//           if (isOpen) {
//             setIsOpen(false)
//             onClose?.()
//           }
//           break
//       }
//     }
    
//     // Handle clicks outside to close dropdown
//     useEffect(() => {
//       const handleClickOutside = (event: MouseEvent) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//           setIsOpen(false)
//           onClose?.()
//         }
//       }
      
//       if (isOpen) {
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//       }
//     }, [isOpen, onClose])
    
//     // Scroll highlighted option into view
//     useEffect(() => {
//       if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
//         optionRefs.current[highlightedIndex]?.scrollIntoView({
//           block: 'nearest',
//         })
//       }
//     }, [highlightedIndex])
    
//     // Build aria-describedby
//     const describedByIds = [
//       ariaDescribedBy,
//       helperText && helperTextId,
//       error && errorId,
//     ].filter(Boolean).join(' ')
    
//     // Determine if option is selected
//     const isOptionSelected = (optionValue: string) => {
//       if (multiple && Array.isArray(currentValue)) {
//         return currentValue.includes(optionValue)
//       }
//       return currentValue === optionValue
//     }
    
//     return (
//       <div className="space-y-2" ref={dropdownRef}>
//         {/* Label */}
//         {label && (
//           <label
//             htmlFor={internalId}
//             className={cn(
//               'text-sm font-medium leading-none',
//               error && 'text-destructive'
//             )}
//           >
//             {label}
//             {required && (
//               <span className="ml-1 text-destructive" aria-label="required">
//                 *
//               </span>
//             )}
//           </label>
//         )}
        
//         {/* Select Button */}
//         <div className="relative">
//           <button
//             ref={ref}
//             type="button"
//             id={internalId}
//             className={cn(
//               selectVariants({ size, variant: error ? 'error' : variant }),
//               className
//             )}
//             disabled={disabled || loading}
//             aria-haspopup="listbox"
//             aria-expanded={isOpen}
//             aria-labelledby={label ? undefined : ariaLabel}
//             aria-describedby={describedByIds || undefined}
//             aria-invalid={error ? 'true' : 'false'}
//             aria-required={required}
//             data-testid={testId}
//             onClick={handleToggle}
//             onKeyDown={handleKeyDown}
//             {...props}
//           >
//             <span className={cn(
//               'block truncate text-left',
//               !currentValue && 'text-muted-foreground'
//             )}>
//               {getDisplayText()}
//             </span>
            
//             <div className="flex items-center gap-1">
//               {/* Clear button */}
//               {clearable && currentValue && !disabled && !loading && (
//                 <button
//                   type="button"
//                   onClick={handleClear}
//                   className="flex h-4 w-4 items-center justify-center rounded-sm hover:bg-accent"
//                   aria-label="Clear selection"
//                   data-testid={testId ? `${testId}-clear` : undefined}
//                 >
//                   <X className="h-3 w-3" />
//                 </button>
//               )}
              
//               {/* Loading spinner */}
//               {loading && (
//                 <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
//               )}
              
//               {/* Dropdown arrow */}
//               <ChevronDown
//                 className={cn(
//                   'h-4 w-4 transition-transform',
//                   isOpen && 'rotate-180'
//                 )}
//                 aria-hidden="true"
//               />
//             </div>
//           </button>
          
//           {/* Dropdown */}
//           {isOpen && (
//             <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
//               {/* Search input */}
//               {searchable && (
//                 <div className="border-b p-2">
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     id={searchId}
//                     className="w-full rounded-sm border-0 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
//                     placeholder="Search options..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
//                         e.preventDefault()
//                         handleKeyDown(e)
//                       }
//                     }}
//                   />
//                 </div>
//               )}
              
//               {/* Options */}
//               <div
//                 role="listbox"
//                 id={listboxId}
//                 className="max-h-60 overflow-auto p-1"
//                 aria-multiselectable={multiple}
//               >
//                 {filteredOptions.length === 0 ? (
//                   <div className="px-2 py-1.5 text-sm text-muted-foreground">
//                     No options found
//                   </div>
//                 ) : (
//                   Object.entries(groupedOptions).map(([group, groupOptions]) => (
//                     <div key={group}>
//                       {group !== 'default' && (
//                         <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
//                           {group}
//                         </div>
//                       )}
//                       {groupOptions.map((option, index) => {
//                         const globalIndex = filteredOptions.indexOf(option)
//                         const isSelected = isOptionSelected(option.value)
//                         const isHighlighted = highlightedIndex === globalIndex
                        
//                         return (
//                           <div
//                             key={option.value}
//                             ref={(el) => (optionRefs.current[globalIndex] = el)}
//                             role="option"
//                             aria-selected={isSelected}
//                             data-highlighted={isHighlighted}
//                             data-disabled={option.disabled}
//                             className={cn(optionVariants())}
//                             onClick={() => !option.disabled && handleSelectOption(option.value)}
//                             onMouseEnter={() => setHighlightedIndex(globalIndex)}
//                           >
//                             <span className="flex-1 truncate">{option.label}</span>
//                             {isSelected && (
//                               <Check className="h-4 w-4 text-current" aria-hidden="true" />
//                             )}
//                           </div>
//                         )
//                       })}
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Helper Text */}
//         {helperText && !error && (
//           <p
//             id={helperTextId}
//             className="text-xs text-muted-foreground"
//             data-testid={testId ? `${testId}-helper-text` : undefined}
//           >
//             {helperText}
//           </p>
//         )}
        
//         {/* Error Message */}
//         {error && (
//           <p
//             id={errorId}
//             className="text-xs text-destructive"
//             role="alert"
//             aria-live="polite"
//             data-testid={testId ? `${testId}-error-message` : undefined}
//           >
//             {error}
//           </p>
//         )}
//       </div>
//     )
//   }
// )

// Select.displayName = 'Select'

// // Export variants and types
// export { selectVariants, optionVariants }
// export type { SelectProps, SelectOption }