import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

// Notion 색상을 Tailwind 클래스로 매핑
const colorMap: Record<string, string> = {
  default: "",
  gray: "text-gray-500",
  brown: "text-amber-700",
  orange: "text-orange-500",
  yellow: "text-yellow-500",
  green: "text-green-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
  red: "text-red-500",
  gray_background: "bg-gray-100 dark:bg-gray-800",
  brown_background: "bg-amber-100 dark:bg-amber-900/30",
  orange_background: "bg-orange-100 dark:bg-orange-900/30",
  yellow_background: "bg-yellow-100 dark:bg-yellow-900/30",
  green_background: "bg-green-100 dark:bg-green-900/30",
  blue_background: "bg-blue-100 dark:bg-blue-900/30",
  purple_background: "bg-purple-100 dark:bg-purple-900/30",
  pink_background: "bg-pink-100 dark:bg-pink-900/30",
  red_background: "bg-red-100 dark:bg-red-900/30",
};

// Rich Text 아이템 하나를 렌더링
function NotionRichTextItem({ item }: { item: RichTextItemResponse }) {
  const { annotations, plain_text } = item;
  const colorClass = colorMap[annotations.color] ?? "";

  let content: React.ReactNode = plain_text;

  // 링크 처리
  if (item.type === "text" && item.text.link) {
    content = (
      <a
        href={item.text.link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2"
      >
        {content}
      </a>
    );
  }

  if (annotations.code) {
    content = (
      <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
        {content}
      </code>
    );
  }
  if (annotations.bold) {
    content = <strong>{content}</strong>;
  }
  if (annotations.italic) {
    content = <em>{content}</em>;
  }
  if (annotations.strikethrough) {
    content = <s>{content}</s>;
  }
  if (annotations.underline) {
    content = <u>{content}</u>;
  }

  if (colorClass) {
    content = <span className={colorClass}>{content}</span>;
  }

  return <>{content}</>;
}

// Rich Text 배열을 렌더링
export function NotionRichText({
  richText,
}: {
  richText: RichTextItemResponse[];
}) {
  if (!richText || richText.length === 0) return null;

  return (
    <>
      {richText.map((item, index) => (
        <NotionRichTextItem key={index} item={item} />
      ))}
    </>
  );
}
