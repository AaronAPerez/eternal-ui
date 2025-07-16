import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ComponentDetailPage } from '@/components/ComponentsPage/ComponentDetailPage'
import { componentRegistry } from '@/data/components'

interface ComponentPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return componentRegistry.map((component) => ({
    slug: component.id,
  }))
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const component = componentRegistry.find(comp => comp.id === params.slug)
  
  if (!component) {
    return {
      title: 'Component Not Found - Eternal UI'
    }
  }

  return {
    title: `${component.name} - Eternal UI Component Library`,
    description: component.description,
    keywords: [component.name, ...component.tags, 'React component'],
    openGraph: {
      title: `${component.name} - Eternal UI`,
      description: component.description,
      type: 'website',
    },
  }
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const component = componentRegistry.find(comp => comp.id === params.slug)
  
  if (!component) {
    notFound()
  }

  return <ComponentDetailPage componentId={params.slug} />
}