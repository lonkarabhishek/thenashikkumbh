import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thenashikkumbh.com";
  const lastModified = new Date("2027-01-15");

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: { en: baseUrl, hi: baseUrl, mr: baseUrl },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { en: `${baseUrl}/about`, hi: `${baseUrl}/about`, mr: `${baseUrl}/about` },
      },
    },
    {
      url: `${baseUrl}/ghats`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { en: `${baseUrl}/ghats`, hi: `${baseUrl}/ghats`, mr: `${baseUrl}/ghats` },
      },
    },
    {
      url: `${baseUrl}/dates`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: { en: `${baseUrl}/dates`, hi: `${baseUrl}/dates`, mr: `${baseUrl}/dates` },
      },
    },
    {
      url: `${baseUrl}/guide`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { en: `${baseUrl}/guide`, hi: `${baseUrl}/guide`, mr: `${baseUrl}/guide` },
      },
    },
    {
      url: `${baseUrl}/events`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: { en: `${baseUrl}/events`, hi: `${baseUrl}/events`, mr: `${baseUrl}/events` },
      },
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: { en: `${baseUrl}/gallery`, hi: `${baseUrl}/gallery`, mr: `${baseUrl}/gallery` },
      },
    },
    {
      url: `${baseUrl}/games`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: { en: `${baseUrl}/games`, hi: `${baseUrl}/games`, mr: `${baseUrl}/games` },
      },
    },
    {
      url: `${baseUrl}/businesses`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: { en: `${baseUrl}/businesses`, hi: `${baseUrl}/businesses`, mr: `${baseUrl}/businesses` },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: { en: `${baseUrl}/blog`, hi: `${baseUrl}/blog`, mr: `${baseUrl}/blog` },
      },
    },
  ];
}
