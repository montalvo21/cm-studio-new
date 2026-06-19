import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cmstudio.digital';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          es: `${baseUrl}/es`,
        },
      },
    },
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
