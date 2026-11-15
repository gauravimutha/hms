import { MetadataRoute } from "next";
import { FEATURES_DATA, SOLUTIONS_DATA, LOCATIONS_DATA } from "@/lib/seoData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bizlume.in";
  const now = new Date();

  // Core Static Marketing Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Feature Pages
  const featurePages: MetadataRoute.Sitemap = Object.keys(FEATURES_DATA).map((slug) => ({
    url: `${baseUrl}/features/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Solution Pages
  const solutionPages: MetadataRoute.Sitemap = Object.keys(SOLUTIONS_DATA).map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Geographic High-Quality City Hubs
  const locationPages: MetadataRoute.Sitemap = Object.keys(LOCATIONS_DATA).map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...featurePages, ...solutionPages, ...locationPages];
}
