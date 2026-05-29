import Link from "next/link";
import { Fragment } from "react";
import type { ReactNode } from "react";

interface InlineMarkdownTextProps {
  text: string;
}

interface InlineMarkdownWithBreaksProps {
  text: string;
}

interface MarkdownParagraphsProps {
  text?: string;
  className?: string;
}

function parseMarkupText(text: string, keyPrefix: string): ReactNode {
  if (!text) return text;

  const parts = text.split(/(<\/?(?:strong|em|br)\s*\/?>)/g);
  const elements: ReactNode[] = [];
  let currentIndex = 0;

  while (currentIndex < parts.length) {
    const part = parts[currentIndex];

    if (part === "<strong>") {
      let content = "";
      let nextIndex = currentIndex + 1;
      while (nextIndex < parts.length && parts[nextIndex] !== "</strong>") {
        content += parts[nextIndex];
        nextIndex++;
      }
      elements.push(
        <strong key={`${keyPrefix}-strong-${currentIndex}`}>
          {parseMarkupText(content, `${keyPrefix}-strong-${currentIndex}`)}
        </strong>,
      );
      currentIndex = nextIndex + 1;
    } else if (part === "<em>") {
      let content = "";
      let nextIndex = currentIndex + 1;
      while (nextIndex < parts.length && parts[nextIndex] !== "</em>") {
        content += parts[nextIndex];
        nextIndex++;
      }
      elements.push(
        <em key={`${keyPrefix}-em-${currentIndex}`}>
          {parseMarkupText(content, `${keyPrefix}-em-${currentIndex}`)}
        </em>,
      );
      currentIndex = nextIndex + 1;
    } else if (part === "<br>" || part === "<br />") {
      elements.push(<br key={`${keyPrefix}-br-${currentIndex}`} />);
      currentIndex++;
    } else if (part === "</strong>" || part === "</em>") {
      currentIndex++;
    } else if (part) {
      elements.push(part);
      currentIndex++;
    } else {
      currentIndex++;
    }
  }

  return elements.length === 1 ? elements[0] : elements;
}

export function InlineMarkdownText({ text }: InlineMarkdownTextProps) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = text.split(linkRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          return part ? parseMarkupText(part, `text-${index}`) : null;
        }

        if (index % 3 === 1) {
          const href = parts[index + 1];
          return (
            <Link
              key={`${part}-${index}`}
              href={href}
              className="text-blue-600 hover:underline"
            >
              {parseMarkupText(part, `link-${index}`)}
            </Link>
          );
        }

        return null;
      })}
    </>
  );
}

export function InlineMarkdownWithBreaks({
  text,
}: InlineMarkdownWithBreaksProps) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          <InlineMarkdownText text={line} />
          {index < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

export function MarkdownParagraphs({
  text,
  className = "",
}: MarkdownParagraphsProps) {
  const paragraphs = (text ?? "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={`${paragraph}-${index}`}
          className={`${index > 0 ? "mt-3" : ""} ${className}`.trim()}
        >
          <InlineMarkdownText text={paragraph} />
        </p>
      ))}
    </>
  );
}
