import Image from "next/image";
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionRichText } from "./notion-rich-text";

// 블록 타입별 렌더링 컴포넌트
function renderBlock(block: BlockObjectResponse) {
  const { type } = block;

  switch (type) {
    case "paragraph": {
      const { rich_text } = block.paragraph;
      if (rich_text.length === 0) return <div className="h-4" />;
      return (
        <p className="text-muted-foreground mb-4 leading-7">
          <NotionRichText richText={rich_text as RichTextItemResponse[]} />
        </p>
      );
    }

    case "heading_1": {
      const { rich_text } = block.heading_1;
      return (
        <h1 className="mt-8 mb-6 text-3xl font-bold tracking-tight">
          <NotionRichText richText={rich_text as RichTextItemResponse[]} />
        </h1>
      );
    }

    case "heading_2": {
      const { rich_text } = block.heading_2;
      return (
        <h2 className="mt-6 mb-4 text-2xl font-semibold tracking-tight">
          <NotionRichText richText={rich_text as RichTextItemResponse[]} />
        </h2>
      );
    }

    case "heading_3": {
      const { rich_text } = block.heading_3;
      return (
        <h3 className="mt-4 mb-3 text-xl font-semibold">
          <NotionRichText richText={rich_text as RichTextItemResponse[]} />
        </h3>
      );
    }

    case "bulleted_list_item": {
      const { rich_text } = block.bulleted_list_item;
      return (
        <li className="text-muted-foreground ml-6 list-disc leading-7">
          <NotionRichText richText={rich_text as RichTextItemResponse[]} />
        </li>
      );
    }

    case "numbered_list_item": {
      const { rich_text } = block.numbered_list_item;
      return (
        <li className="text-muted-foreground ml-6 list-decimal leading-7">
          <NotionRichText richText={rich_text as RichTextItemResponse[]} />
        </li>
      );
    }

    case "code": {
      const { rich_text, language } = block.code;
      const text = rich_text
        .map((item: RichTextItemResponse) => item.plain_text)
        .join("");
      return (
        <div className="mb-4">
          {language && (
            <span className="bg-muted text-muted-foreground inline-block rounded-t-md px-3 py-1 font-mono text-xs">
              {language}
            </span>
          )}
          <pre className="bg-muted overflow-x-auto rounded-md rounded-tl-none p-4">
            <code className="font-mono text-sm">{text}</code>
          </pre>
        </div>
      );
    }

    case "image": {
      const { image } = block;
      const src = image.type === "file" ? image.file.url : image.external.url;
      const caption = image.caption as RichTextItemResponse[];
      return (
        <figure className="mb-6">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={
                caption.length > 0
                  ? caption.map((c) => c.plain_text).join("")
                  : "프로젝트 이미지"
              }
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
          {caption.length > 0 && (
            <figcaption className="text-muted-foreground mt-2 text-center text-sm">
              <NotionRichText richText={caption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "quote": {
      const { rich_text } = block.quote;
      return (
        <blockquote className="border-primary text-muted-foreground mb-4 border-l-4 pl-4 italic">
          <NotionRichText richText={rich_text as RichTextItemResponse[]} />
        </blockquote>
      );
    }

    case "callout": {
      const { rich_text, icon } = block.callout;
      const emoji = icon?.type === "emoji" ? icon.emoji : "💡";
      return (
        <div className="bg-muted/50 mb-4 flex gap-3 rounded-lg p-4">
          <span className="text-xl">{emoji}</span>
          <div className="text-muted-foreground leading-7">
            <NotionRichText richText={rich_text as RichTextItemResponse[]} />
          </div>
        </div>
      );
    }

    case "divider":
      return <hr className="border-border my-8" />;

    case "bookmark": {
      const { url, caption } = block.bookmark;
      const captionText = (caption as RichTextItemResponse[])
        .map((c) => c.plain_text)
        .join("");
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border bg-muted/30 hover:bg-muted/50 mb-4 block rounded-lg border p-4 transition-colors"
        >
          <span className="text-primary text-sm break-all">{url}</span>
          {captionText && (
            <span className="text-muted-foreground mt-1 block text-xs">
              {captionText}
            </span>
          )}
        </a>
      );
    }

    case "to_do": {
      const { rich_text, checked } = block.to_do;
      return (
        <div className="mb-1 flex items-start gap-2">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="mt-1.5"
          />
          <span
            className={
              checked
                ? "text-muted-foreground line-through"
                : "text-muted-foreground"
            }
          >
            <NotionRichText richText={rich_text as RichTextItemResponse[]} />
          </span>
        </div>
      );
    }

    case "toggle": {
      const { rich_text } = block.toggle;
      return (
        <details className="mb-4">
          <summary className="cursor-pointer font-medium">
            <NotionRichText richText={rich_text as RichTextItemResponse[]} />
          </summary>
        </details>
      );
    }

    default:
      return null;
  }
}

// Notion 블록 배열을 렌더링하는 메인 컴포넌트
export function NotionRenderer({ blocks }: { blocks: BlockObjectResponse[] }) {
  if (!blocks || blocks.length === 0) return null;

  // 연속된 리스트 아이템을 그룹핑
  const groupedBlocks: (BlockObjectResponse | BlockObjectResponse[])[] = [];
  let currentList: BlockObjectResponse[] = [];
  let currentListType: string | null = null;

  for (const block of blocks) {
    const isListItem =
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item";

    if (isListItem) {
      if (currentListType === block.type) {
        currentList.push(block);
      } else {
        if (currentList.length > 0) {
          groupedBlocks.push([...currentList]);
        }
        currentList = [block];
        currentListType = block.type;
      }
    } else {
      if (currentList.length > 0) {
        groupedBlocks.push([...currentList]);
        currentList = [];
        currentListType = null;
      }
      groupedBlocks.push(block);
    }
  }
  if (currentList.length > 0) {
    groupedBlocks.push([...currentList]);
  }

  return (
    <div className="notion-content">
      {groupedBlocks.map((item, index) => {
        if (Array.isArray(item)) {
          const listType = item[0].type;
          const Tag = listType === "numbered_list_item" ? "ol" : "ul";
          return (
            <Tag key={index} className="mb-4">
              {item.map((block) => (
                <>{renderBlock(block)}</>
              ))}
            </Tag>
          );
        }
        return <div key={item.id}>{renderBlock(item)}</div>;
      })}
    </div>
  );
}
