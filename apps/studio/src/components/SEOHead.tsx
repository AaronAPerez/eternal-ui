import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title: string
    description: string
    image: string
  }
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  openGraph
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    {canonical && <link rel="canonical" href={canonical} />}
    
    {/* Open Graph */}
    {openGraph && (
      <>
        <meta property="og:title" content={openGraph.title} />
        <meta property="og:description" content={openGraph.description} />
        <meta property="og:image" content={openGraph.image} />
        <meta property="og:type" content="website" />
      </>
    )}
    
    {/* Schema.org */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareLibrary",
          "name": "Eternal UI Components",
          "description": description,
          "programmingLanguage": "JavaScript",
          "runtimePlatform": "React"
        })
      }}
    />
  </Head>
)