import type { InsertSchema } from "@shared/schema";

export function generateSchemaFromTemplate(input: InsertSchema) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": input.type,
    "name": input.name,
  };

  switch (input.type) {
    case "Organization":
      return {
        ...baseSchema,
        "description": input.context,
        "url": "https://example.com",
      };

    case "LocalBusiness":
      return {
        ...baseSchema,
        "description": input.context,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Main St",
          "addressLocality": "City",
          "addressRegion": "State",
          "postalCode": "12345",
          "addressCountry": "US"
        }
      };

    case "Product":
      return {
        ...baseSchema,
        "description": input.context,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      };

    case "Article":
      return {
        ...baseSchema,
        "description": input.context,
        "author": {
          "@type": "Person",
          "name": "Author Name"
        },
        "datePublished": new Date().toISOString()
      };

    default:
      return baseSchema;
  }
}
