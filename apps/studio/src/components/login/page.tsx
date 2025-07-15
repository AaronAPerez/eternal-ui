import { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic import to ensure client component loads properly
const LoginForm = dynamic(() => import('./LoginForm'), {
  ssr: false,
  loading: () => <div className="p-8">Loading...</div>
})

export const metadata: Metadata = {
  title: 'Sign In | Eternal UI',
  description: 'Sign in to your Eternal UI account and continue building amazing websites.',
  robots: { index: false }
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  )
}