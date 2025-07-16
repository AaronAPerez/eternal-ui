import { ComponentsPage } from '@/components/ComponentsPage/ComponentsPage'
import { componentCategories } from '@/data/categories'
import { GetStaticPaths, GetStaticProps } from 'next'


interface CategoryPageProps {
  category: string
}

export default function CategoryPage({ category }: CategoryPageProps) {
  return <ComponentsPage initialCategory={category} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = componentCategories.map(category => ({
    params: { category: category.id }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = componentCategories.find(cat => cat.id === params?.category)
  
  if (!category) {
    return { notFound: true }
  }

  return {
    props: {
      category: category.id,
      title: `${category.name} Components - Eternal UI`,
      description: category.description
    }
  }
}