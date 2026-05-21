import Link from "next/link";
import React from "react";

function parseMarkupText(text: string, keyPrefix: string): React.ReactNode {
  if (!text) return text;

  const parts = text.split(/(<\/?(?:strong|em|br)\s*\/?>)/g);
  const elements: React.ReactNode[] = [];
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

export function InlineMarkdownText({ text }: { text: string }) {
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

export function InlineMarkdownWithBreaks({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <React.Fragment key={`${line}-${index}`}>
          <InlineMarkdownText text={line} />
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

export function ParsedContent({ children }: { children: React.ReactNode }) {
  const transformNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") {
      return <InlineMarkdownText text={node} />;
    }

    if (Array.isArray(node)) {
      return node.map(transformNode);
    }

    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
      return React.cloneElement(
        node,
        {},
        React.Children.map(node.props.children, transformNode),
      );
    }

    return node;
  };

  return transformNode(children);
}
