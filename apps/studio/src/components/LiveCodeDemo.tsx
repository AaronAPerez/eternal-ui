import { useState } from "react"

const LiveCodeDemo = () => {
  const [framework, setFramework] = useState('react')
  
  const codeExamples = {
    react: `import React from 'react'
import { Hero, Features, CTA } from '@eternal-ui/components'

export default function HomePage() {
  return (
    <div>
      <Hero 
        title="Welcome to Your New Site"
        subtitle="10x faster than WordPress"
        cta="Get Started"
      />
      <Features items={features} />
      <CTA />
    </div>
  )
}`,
    vue: `<template>
  <div>
    <Hero 
      :title="'Welcome to Your New Site'"
      :subtitle="'10x faster than WordPress'"
      :cta="'Get Started'"
    />
    <Features :items="features" />
    <CTA />
  </div>
</template>`,
    svelte: `<script>
  import { Hero, Features, CTA } from '@eternal-ui/components'
</script>

<Hero 
  title="Welcome to Your New Site"
  subtitle="10x faster than WordPress"
  cta="Get Started"
/>
<Features items={features} />
<CTA />`
  }
  
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex space-x-2 mb-4">
        {Object.keys(codeExamples).map(fw => (
          <button
            key={fw}
            onClick={() => setFramework(fw)}
            className={`px-3 py-1 rounded text-sm ${
              framework === fw 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            {fw.charAt(0).toUpperCase() + fw.slice(1)}
          </button>
        ))}
      </div>
      <pre className="text-green-400 text-sm overflow-x-auto">
        <code>{codeExamples[framework]}</code>
      </pre>
    </div>
  )
}