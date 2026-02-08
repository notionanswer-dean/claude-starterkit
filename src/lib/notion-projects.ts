import { unstable_cache } from "next/cache";
import type {
  PageObjectResponse,
  RichTextItemResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import {
  queryDataSource,
  getPageBlocks,
  richTextToPlainText,
  notion,
} from "./notion";
import type { Project } from "@/types";

// Data Source ID (Notion API v3에서는 DB가 아닌 Data Source 단위로 쿼리)
const PROJECTS_DS_ID = process.env.NOTION_PROJECTS_DB_ID!;

// Notion 페이지를 Project 타입으로 변환
export function transformNotionPageToProject(
  page: PageObjectResponse
): Project {
  const props = page.properties;

  // Title (이름)
  const titleProp = props["이름"];
  const title =
    titleProp?.type === "title"
      ? richTextToPlainText(titleProp.title as RichTextItemResponse[])
      : "";

  // Rich Text (설명)
  const descProp = props["설명"];
  const description =
    descProp?.type === "rich_text"
      ? richTextToPlainText(descProp.rich_text as RichTextItemResponse[])
      : "";

  // Files (이미지) — 첫 번째 파일의 URL 사용
  const imageProp = props["이미지"];
  let image = "/placeholder-project.jpg";
  if (imageProp?.type === "files" && imageProp.files.length > 0) {
    const file = imageProp.files[0];
    if (file.type === "file") {
      image = file.file.url;
    } else if (file.type === "external") {
      image = file.external.url;
    }
  }

  // Multi-select (기술스택)
  const tagsProp = props["기술스택"];
  const tags =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((opt) => opt.name)
      : [];

  // URL (데모 URL)
  const demoProp = props["데모 URL"];
  const demoUrl =
    demoProp?.type === "url" && demoProp.url ? demoProp.url : undefined;

  // URL (GitHub URL)
  const githubProp = props["GitHub URL"];
  const githubUrl =
    githubProp?.type === "url" && githubProp.url ? githubProp.url : undefined;

  // Checkbox (주요 프로젝트)
  const featuredProp = props["주요 프로젝트"];
  const featured =
    featuredProp?.type === "checkbox" ? featuredProp.checkbox : false;

  return {
    id: page.id,
    title,
    description,
    image,
    tags,
    demoUrl,
    githubUrl,
    featured,
  };
}

// 공개 프로젝트 목록 조회 (순서 정렬, 상태 필터)
// 에러 발생 시 throw하여 unstable_cache에 빈 결과가 캐시되지 않도록 함
export async function getProjects(): Promise<Project[]> {
  const pages = await queryDataSource(
    PROJECTS_DS_ID,
    {
      property: "상태",
      select: {
        equals: "공개",
      },
    },
    [
      {
        property: "순서",
        direction: "ascending",
      },
    ]
  );

  return pages.map(transformNotionPageToProject);
}

// 단일 프로젝트 속성 + 본문 블록 조회
export async function getProjectDetail(
  pageId: string
): Promise<{ project: Project; blocks: BlockObjectResponse[] } | null> {
  try {
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as PageObjectResponse;

    const project = transformNotionPageToProject(page);
    const blocks = await getPageBlocks(pageId);

    return { project, blocks };
  } catch {
    return null;
  }
}

// 모든 프로젝트 ID 조회 (정적 생성용)
export async function getAllProjectIds(): Promise<string[]> {
  const pages = await queryDataSource(PROJECTS_DS_ID, {
    property: "상태",
    select: {
      equals: "공개",
    },
  });

  return pages.map((page) => page.id);
}

// unstable_cache 래핑 (1시간 revalidate)
// getProjects()가 에러를 throw하면 캐시에 저장되지 않으므로, 다음 요청에서 재시도됨
const getCachedProjectsInner = unstable_cache(
  async () => getProjects(),
  ["projects"],
  { revalidate: 3600 }
);

// 캐시 조회 실패 시 빈 배열 반환 (페이지 렌더링은 유지)
export async function getCachedProjects(): Promise<Project[]> {
  try {
    return await getCachedProjectsInner();
  } catch (error) {
    console.error("Notion 프로젝트 조회 실패:", error);
    return [];
  }
}
