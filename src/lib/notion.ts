import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
  QueryDataSourceParameters,
} from "@notionhq/client/build/src/api-endpoints";

// Notion 클라이언트 초기화
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// 데이터소스 쿼리 (Notion API v3에서는 dataSources.query 사용)
export async function queryDataSource(
  dataSourceId: string,
  filter?: QueryDataSourceParameters["filter"],
  sorts?: QueryDataSourceParameters["sorts"]
) {
  const pages: PageObjectResponse[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter,
      sorts,
      start_cursor: cursor,
    });

    for (const page of response.results) {
      if ("properties" in page) {
        pages.push(page as PageObjectResponse);
      }
    }

    cursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined;
  } while (cursor);

  return pages;
}

// 페이지의 블록(본문) 조회
export async function getPageBlocks(pageId: string) {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });

    for (const block of response.results) {
      if ("type" in block) {
        blocks.push(block as BlockObjectResponse);
      }
    }

    cursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined;
  } while (cursor);

  return blocks;
}

// Rich Text 배열을 평문 문자열로 변환
export function richTextToPlainText(richText: RichTextItemResponse[]): string {
  return richText.map((item) => item.plain_text).join("");
}
