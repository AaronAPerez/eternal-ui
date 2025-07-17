export const ComponentLibraryStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EternalUI",
    "description": "Professional React TypeScript component library with 120+ accessible components",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "programmingLanguage": "TypeScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};