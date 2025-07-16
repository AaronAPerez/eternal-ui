import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ComponentsPage } from '@/components/ComponentsPage/ComponentsPage'
import { componentCategories } from '@/data/categories'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return componentCategories.map((category) => ({
    slug: category.id,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = componentCategories.find(cat => cat.id === params.slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - Eternal UI'
    }
  }

  return {
    title: `${category.name} Components - Eternal UI`,
    description: category.description,
    keywords: [category.name, 'React components', 'UI library'],
    openGraph: {
      title: `${category.name} Components - Eternal UI`,
      description: category.description,
      type: 'website',
    },
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = componentCategories.find(cat => cat.id === params.slug)
  
  if (!category) {
    notFound()
  }

  return <ComponentsPage initialCategory={params.slug} />
}