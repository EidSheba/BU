import type { MetadataRoute } from "next";
import { SERVICES_DATA } from "@/data/services";
import { PROJECTS_DATA } from "@/data/projects";

const BASE = "https://umbrella.sa";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,        lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/about`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/projects`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${BASE}/career`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS_DATA.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
