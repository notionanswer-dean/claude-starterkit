import type { MetadataRoute } from "next";
import { getCachedAllProjectIds } from "@/lib/notion-projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://your-domain.com";

  // 정적 라우트
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 동적 라우트 (프로젝트)
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const ids = await getCachedAllProjectIds();
    projectRoutes = ids.map((id) => ({
      url: `${baseUrl}/projects/${id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Notion API 실패 시 빈 배열 유지
  }

  return [...staticRoutes, ...projectRoutes];
}
