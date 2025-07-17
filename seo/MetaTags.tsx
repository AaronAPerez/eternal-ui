interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords = [],
  image = '/og-image.png'
}) => {
  return (
    <Helmet>
      <title>{title} | EternalUI Component Library</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};