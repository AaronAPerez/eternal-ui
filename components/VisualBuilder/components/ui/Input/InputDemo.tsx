// 'use client';

// import { Input } from '@/components/ui/Input/Input'
// import { Button } from '@/components/ui/Button'
// import { 
//   Mail, 
//   Lock, 
//   User, 
//   Search, 
//   Phone, 
//   Check,
//   AlertCircle,
//   Globe,
//   DollarSign
// } from 'lucide-react'
// import { useCallback, useState } from 'react'

// /**
//  * 🎓 INPUT COMPONENT LEARNING DEMO
//  * 
//  * This demo teaches:
//  * 1. Form validation patterns
//  * 2. Accessibility best practices  
//  * 3. User experience principles
//  * 4. State management in forms
//  */
// export default function InputDemo() {
//   // 🧠 Form state management
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     firstName: '',
//     lastName: '',
//     phone: '',
//     website: '',
//     amount: '',
//     search: ''
//   })
  
//   // 🚨 Validation errors
//   const [errors, setErrors] = useState<{
//     email?: string | null
//     password?: string | null
//     confirmPassword?: string | null
//     firstName?: string | null
//     lastName?: string | null
//     phone?: string | null
//     website?: string | null
//     amount?: string | null
//     search?: string | null
//   }>({})
  
//   // ✅ Success states
//   const [successStates, setSuccessStates] = useState<{
//     email?: string | null
//     password?: string | null
//     confirmPassword?: string | null
//     firstName?: string | null
//     lastName?: string | null
//     phone?: string | null
//     website?: string | null
//     amount?: string | null
//     search?: string | null
//   }>({})
  
//   // ⏳ Loading states
//   const [loadingStates, setLoadingStates] = useState<{
//     email?: boolean
//     password?: boolean
//     confirmPassword?: boolean
//     firstName?: boolean
//     lastName?: boolean
//     phone?: boolean
//     website?: boolean
//     amount?: boolean
//     search?: boolean
//   }>({})
  
//   /**
//    * 🎯 FORM VALIDATION LOGIC
//    * 
//    * Real-world validation patterns that you can use in your apps
//    */
//   const validateField = useCallback((name: string, value: string) => {
//     switch (name) {
//       case 'email':
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//         if (!value) return 'Email is required'
//         if (!emailRegex.test(value)) return 'Please enter a valid email'
//         return null
        
//       case 'password':
//         if (!value) return 'Password is required'
//         if (value.length < 8) return 'Password must be at least 8 characters'
//         if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
//           return 'Password must contain uppercase, lowercase, and number'
//         }
//         return null
        
//       case 'confirmPassword':
//         if (!value) return 'Please confirm your password'
//         if (value !== formData.password) return 'Passwords do not match'
//         return null
        
//       case 'firstName':
//       case 'lastName':
//         if (!value) return `${name === 'firstName' ? 'First' : 'Last'} name is required`
//         if (value.length < 2) return 'Name must be at least 2 characters'
//         return null
        
//       case 'phone':
//         const phoneRegex = /^\+?[\d\s\-]+$/
//         if (value && !phoneRegex.test(value)) return 'Please enter a valid phone number'
//         return null
        
//       case 'website':
//         const urlRegex = /^https?:\/\/.+\..+$/
//         if (value && !urlRegex.test(value)) return 'Please enter a valid URL (e.g., https://example.com)'
//         return null
        
//       case 'amount':
//         const amount = parseFloat(value)
//         if (value && (isNaN(amount) || amount <= 0)) return 'Please enter a valid amount'
//         return null
        
//       default:
//         return null
//     }
//   }, [formData.password])
  
//   /**
//    * ⚡ REAL-TIME VALIDATION
//    * 
//    * Validate as users type for immediate feedback
//    */
//   const handleChange = (name: string, value: string) => {
//     // Update form data
//     setFormData(prev => ({ ...prev, [name]: value }))
    
//     // Clear previous error/success
//     setErrors(prev => ({ ...prev, [name]: null }))
//     setSuccessStates(prev => ({ ...prev, [name]: null }))
    
//     // Validate after a short delay (debouncing)
//     setTimeout(() => {
//       const error = validateField(name, value)
//       if (error) {
//         setErrors(prev => ({ ...prev, [name]: error }))
//       } else if (value) {
//         setSuccessStates(prev => ({ ...prev, [name]: 'Looks good!' }))
//       }
//     }, 500)
//   }
  
//   /**
//    * 🔍 ASYNC VALIDATION SIMULATION
//    * 
//    * Simulates checking email availability
//    */
//   const checkEmailAvailability = async (email: string) => {
//     if (!email || errors.email) return
    
//     setLoadingStates(prev => ({ ...prev, email: true }))
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500))
    
//     setLoadingStates(prev => ({ ...prev, email: false }))
    
//     // Simulate result (emails ending in 'test' are taken)
//     if (email.endsWith('test@example.com')) {
//       setErrors(prev => ({ ...prev, email: 'This email is already taken' }))
//       setSuccessStates(prev => ({ ...prev, email: null }))
//     } else {
//       setSuccessStates(prev => ({ ...prev, email: 'Email is available!' }))
//     }
//   }
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-8">
//       <div className="max-w-6xl mx-auto space-y-16">
        
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//             Input Component Mastery
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//             Learn form design patterns, validation techniques, and accessibility best practices 
//             with our comprehensive Input component.
//           </p>
//         </div>
        
//         {/* Basic Examples */}
//         <section className="space-y-8">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//             🎨 Visual Variants
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
//             {/* Basic Inputs */}
//             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Basic Inputs
//               </h3>
//               <div className="space-y-4">
//                 <Input 
//                   label="Full Name"
//                   placeholder="Enter your name"
//                   leftIcon={<User className="w-4 h-4" />}
//                 />
//                 <Input 
//                   label="Email Address"
//                   type="email"
//                   placeholder="you@example.com"
//                   leftIcon={<Mail className="w-4 h-4" />}
//                 />
//                 <Input 
//                   label="Phone Number"
//                   type="tel"
//                   placeholder="+1 (555) 123-4567"
//                   leftIcon={<Phone className="w-4 h-4" />}
//                 />
//               </div>
//             </div>
            
//             {/* Validation States */}
//             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Validation States
//               </h3>
//               <div className="space-y-4">
//                 <Input 
//                   label="Valid Input"
//                   value="john@example.com"
//                   success="Email is valid!"
//                   leftIcon={<Mail className="w-4 h-4" />}
//                   readOnly
//                 />
//                 <Input 
//                   label="Invalid Input"
//                   value="invalid-email"
//                   error="Please enter a valid email address"
//                   leftIcon={<Mail className="w-4 h-4" />}
//                 />
//                 <Input 
//                   label="Loading State"
//                   placeholder="Checking availability..."
//                   loading
//                   leftIcon={<User className="w-4 h-4" />}
//                 />
//               </div>
//             </div>
            
//             {/* Special Features */}
//             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Special Features
//               </h3>
//               <div className="space-y-4">
//                 <Input 
//                   label="Password"
//                   type="password"
//                   placeholder="Enter password"
//                   showPasswordToggle
//                   leftIcon={<Lock className="w-4 h-4" />}
//                   helperText="Click the eye icon to toggle visibility"
//                 />
//                 <Input 
//                   label="Search"
//                   placeholder="Search anything..."
//                   leftIcon={<Search className="w-4 h-4" />}
//                   rightIcon={<Globe className="w-4 h-4" />}
//                 />
//                 <Input 
//                   label="Amount"
//                   type="number"
//                   placeholder="0.00"
//                   leftIcon={<DollarSign className="w-4 h-4" />}
//                   helperText="Enter amount in USD"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* Interactive Form Demo */}
//         <section className="space-y-8">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//             🎮 Interactive Registration Form
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300">
//             Try filling out this form to see real-time validation, async checking, and accessibility features in action.
//           </p>
          
//           <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
//             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
//               {/* Personal Information */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
//                   Personal Information
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Input
//                     label="First Name"
//                     required
//                     value={formData.firstName}
//                     onChange={(e) => handleChange('firstName', e.target.value)}
//                     error={errors.firstName ?? undefined}
//                     success={successStates.firstName ?? undefined}
//                     leftIcon={<User className="w-4 h-4" />}
//                     placeholder="John"
//                   />
                  
//                   <Input
//                     label="Last Name"
//                     required
//                     value={formData.lastName}
//                     onChange={(e) => handleChange('lastName', e.target.value)}
//                     error={errors.lastName ?? undefined}
//                     success={successStates.lastName ?? undefined}
//                     leftIcon={<User className="w-4 h-4" />}
//                     placeholder="Doe"
//                   />
//                 </div>
                
//                 <Input
//                   label="Email Address"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => handleChange('email', e.target.value)}
//                   onBlur={(e) => checkEmailAvailability(e.target.value)}
//                   error={errors.email ?? undefined}
//                   success={successStates.email ?? undefined}
//                   loading={loadingStates.email}
//                   leftIcon={<Mail className="w-4 h-4" />}
//                   placeholder="john@example.com"
//                   helperText="Try 'test@example.com' to see an error"
//                 />
                
//                 <Input
//                   label="Phone Number"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) => handleChange('phone', e.target.value)}
//                   error={errors.phone ?? undefined}
//                   success={successStates.phone ?? undefined}
//                   leftIcon={<Phone className="w-4 h-4" />}
//                   placeholder="+1 (555) 123-4567"
//                   helperText="Optional - for account recovery"
//                 />
//               </div>
              
//               {/* Security */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
//                   Security
//                 </h3>
                
//                 <Input
//                   label="Password"
//                   type="password"
//                   required
//                   showPasswordToggle
//                   value={formData.password}
//                   onChange={(e) => handleChange('password', e.target.value)}
//                   error={errors.password ?? undefined}
//                   success={successStates.password ?? undefined}
//                   leftIcon={<Lock className="w-4 h-4" />}
//                   placeholder="Create a strong password"
//                   helperText="Must contain uppercase, lowercase, and number"
//                 />
                
//                 <Input
//                   label="Confirm Password"
//                   type="password"
//                   required
//                   showPasswordToggle
//                   value={formData.confirmPassword}
//                   onChange={(e) => handleChange('confirmPassword', e.target.value)}
//                   error={errors.confirmPassword ?? undefined}
//                   success={successStates.confirmPassword ?? undefined}
//                   leftIcon={<Lock className="w-4 h-4" />}
//                   placeholder="Confirm your password"
//                 />
//               </div>
              
//               {/* Additional Info */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
//                   Additional Information
//                 </h3>
                
//                 <Input
//                   label="Website"
//                   type="url"
//                   value={formData.website}
//                   onChange={(e) => handleChange('website', e.target.value)}
//                   error={errors.website ?? undefined}
//                   success={successStates.website ?? undefined}
//                   leftIcon={<Globe className="w-4 h-4" />}
//                   placeholder="https://yourwebsite.com"
//                   helperText="Optional - share your portfolio or company website"
//                 />
                
//                 <Input
//                   label="Investment Amount"
//                   type="number"
//                   value={formData.amount}
//                   onChange={(e) => handleChange('amount', e.target.value)}
//                   error={errors.amount ?? undefined}
//                   success={successStates.amount ?? undefined}
//                   leftIcon={<DollarSign className="w-4 h-4" />}
//                   placeholder="1000"
//                   helperText="Minimum investment amount in USD"
//                 />
//               </div>
              
//               {/* Submit Button */}
//               <div className="pt-6">
//                 <Button 
//                   type="submit" 
//                   variant="primary" 
//                   size="lg" 
//                   fullWidth
//                   disabled={(Object.keys(errors) as (keyof typeof errors)[]).some(key => !!errors[key])}
//                 >
//                   Create Account
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </section>
        
//         {/* Size Variants */}
//         <section className="space-y-8">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//             📏 Size System
//           </h2>
          
//           <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-6">
//             <Input 
//               size="sm" 
//               label="Small Input"
//               placeholder="Small size for compact forms"
//               leftIcon={<User className="w-3 h-3" />}
//             />
//             <Input 
//               size="md" 
//               label="Medium Input (Default)"
//               placeholder="Standard size for most forms"
//               leftIcon={<User className="w-4 h-4" />}
//             />
//             <Input 
//               size="lg" 
//               label="Large Input"
//               placeholder="Large size for prominent forms"
//               leftIcon={<User className="w-5 h-5" />}
//             />
//           </div>
//         </section>
        
//         {/* Accessibility Demo */}
//         <section className="space-y-8">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//             ♿ Accessibility Features
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
//             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Keyboard Navigation
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Try using Tab, Shift+Tab, and arrow keys
//               </p>
//               <div className="space-y-3">
//                 <Input label="First Field" placeholder="Tab to next field" />
//                 <Input label="Second Field" placeholder="Continue tabbing" />
//                 <Input label="Third Field" placeholder="Last field" />
//               </div>
//             </div>
            
//             <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Screen Reader Support
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Proper labels, descriptions, and announcements
//               </p>
//               <div className="space-y-3">
//                 <Input 
//                   label="Accessible Input"
//                   placeholder="This has proper labeling"
//                   helperText="Helper text is announced to screen readers"
//                   aria-describedby="additional-info"
//                 />
//                 <p id="additional-info" className="text-xs text-gray-500">
//                   Additional context for screen readers
//                 </p>
                
//                 <Input 
//                   label="Error Example"
//                   error="Error messages are announced as alerts"
//                   value="invalid"
//                 />
                
//                 <Input 
//                   label="Success Example"
//                   success="Success messages provide positive feedback"
//                   value="valid@email.com"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* Best Practices */}
//         <section className="space-y-8">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//             💡 Form Design Best Practices
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
//             <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
//               <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
//                 <Check className="w-5 h-5" />
//                 Do This
//               </h3>
//               <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
//                 <li>• Provide clear, descriptive labels</li>
//                 <li>• Use real-time validation with helpful messages</li>
//                 <li>• Show loading states for async operations</li>
//                 <li>• Group related fields together</li>
//                 <li>• Use appropriate input types (email, tel, etc.)</li>
//                 <li>• Provide helpful placeholder text</li>
//                 <li>• Make required fields obvious</li>
//               </ul>
//             </div>
            
//             <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
//               <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
//                 <AlertCircle className="w-5 h-5" />
//                 Avoid This
//               </h3>
//               <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
//                 <li>• Generic error messages like &quot;Invalid input&quot;</li>
//                 <li>• Validating only on form submission</li>
//                 <li>• Hiding password requirements until error</li>
//                 <li>• Using placeholder text as labels</li>
//                 <li>• Making users guess required fields</li>
//                 <li>• Clearing fields on validation errors</li>
//                 <li>• Overwhelming users with too many fields</li>
//               </ul>
//             </div>
//           </div>
//         </section>
        
//       </div>
//     </div>
//   )
// }