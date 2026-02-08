import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotionRenderer } from "@/components/notion";
import { getProjectDetail, getAllProjectIds } from "@/lib/notion-projects";
import { ProjectDetailContent } from "./project-detail-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 정적 생성을 위한 경로 목록
export async function generateStaticParams() {
  try {
    const ids = await getAllProjectIds();
    return ids.map((id) => ({ id }));
  } catch {
    return [];
  }
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getProjectDetail(id);

  if (!result) {
    return { title: "프로젝트를 찾을 수 없습니다" };
  }

  return {
    title: `${result.project.title} | 포트폴리오`,
    description: result.project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getProjectDetail(id);

  if (!result) {
    notFound();
  }

  const { project, blocks } = result;

  return (
    <ProjectDetailContent project={project}>
      <NotionRenderer blocks={blocks} />
    </ProjectDetailContent>
  );
}
