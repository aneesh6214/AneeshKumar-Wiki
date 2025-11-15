import Link from "next/link";
import React from "react";
import {
  JSONContent,
  ContentSection,
  Infobox,
  ImagePosition,
} from "@/lib/json-content";
import { AiOutlineGlobal } from "react-icons/ai";

// Component to parse JSX content with embedded markdown-style links
function ParsedContent({ children }: { children: React.ReactNode }) {
  const transformNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") {
      return parseJSXText(node);
    }

    if (React.isValidElement(node)) {
      const newChildren =
        React.Children.map(node.props.children, transformNode) || [];
      return React.cloneElement(node, node.props, ...newChildren);
    }

    return node;
  };

  return transformNode(children);
}

// Quote component for styled quotes
function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-blue-300 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700 rounded-r">
      <ParsedContent>{children}</ParsedContent>
    </blockquote>
  );
}

// Parser function for JSX-like tags and Wikipedia-style links in text
function parseJSXText(text: string): React.ReactNode {
  if (!text) return text;

  // First handle Wikipedia-style links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const linkParts = text.split(linkRegex);

  const processedElements: React.ReactNode[] = [];

  for (let i = 0; i < linkParts.length; i++) {
    const part = linkParts[i];

    if (i % 3 === 0) {
      // Regular text that may contain JSX tags
      if (part) {
        processedElements.push(parseJSXTags(part, `text-${i}`));
      }
    } else if (i % 3 === 1) {
      // Link text
      const linkText = part;
      const linkUrl = linkParts[i + 1];
      processedElements.push(
        <Link
          key={`link-${i}`}
          href={linkUrl}
          className="text-blue-600 hover:underline"
        >
          {parseJSXTags(linkText, `link-text-${i}`)}
        </Link>,
      );
    }
    // Skip URL parts (i % 3 === 2) as they're handled above
  }

  return processedElements.length === 1
    ? processedElements[0]
    : processedElements;
}

// Helper function to parse JSX tags within text
function parseJSXTags(text: string, keyPrefix: string): React.ReactNode {
  if (!text) return text;

  // Split by JSX tags while preserving the tags
  const parts = text.split(/(<\/?(?:strong|em|br)\s*\/?>)/g);

  const elements: React.ReactNode[] = [];
  let currentIndex = 0;

  while (currentIndex < parts.length) {
    const part = parts[currentIndex];

    if (part === "<strong>") {
      // Find the closing tag
      let content = "";
      let nextIndex = currentIndex + 1;
      while (nextIndex < parts.length && parts[nextIndex] !== "</strong>") {
        content += parts[nextIndex];
        nextIndex++;
      }
      elements.push(
        <strong key={`${keyPrefix}-strong-${currentIndex}`}>
          {parseJSXTags(content, `${keyPrefix}-nested-${currentIndex}`)}
        </strong>,
      );
      currentIndex = nextIndex + 1; // Skip the closing tag
    } else if (part === "<em>") {
      // Find the closing tag
      let content = "";
      let nextIndex = currentIndex + 1;
      while (nextIndex < parts.length && parts[nextIndex] !== "</em>") {
        content += parts[nextIndex];
        nextIndex++;
      }
      elements.push(
        <em key={`${keyPrefix}-em-${currentIndex}`}>
          {parseJSXTags(content, `${keyPrefix}-nested-${currentIndex}`)}
        </em>,
      );
      currentIndex = nextIndex + 1; // Skip the closing tag
    } else if (part === "<br>" || part === "<br />") {
      elements.push(<br key={`${keyPrefix}-br-${currentIndex}`} />);
      currentIndex++;
    } else if (part === "</strong>" || part === "</em>") {
      // Skip closing tags as they're handled above
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

interface SectionImageProps {
  image: {
    src: string;
    alt: string;
    caption?: string;
    position: ImagePosition;
    link?: string;
  };
}

function SectionImage({ image }: SectionImageProps) {
  const imageElement = (
    <img
      src={image.src}
      alt={image.alt}
      className="w-full h-auto object-contain rounded"
    />
  );

  return (
    <div className="border border-gray-300 rounded bg-gray-50 p-2">
      {image.link ? (
        <a
          href={image.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity cursor-pointer"
        >
          {imageElement}
        </a>
      ) : (
        imageElement
      )}
      {image.caption && (
        <div className="text-xs text-gray-600 mt-2 text-center italic">
          <div>{image.caption}</div>
          {image.link && (
            <a
              href={image.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:underline mt-1 cursor-pointer"
            >
              Click to view document
            </a>
          )}
        </div>
      )}
    </div>
  );
}

interface WikiContentProps {
  content: JSONContent;
}

// Export Quote for use in content files
export { Quote };

export default function WikiContent({ content }: WikiContentProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6">
      {/* Article Content */}
      <div className="flex-1 lg:w-2/3 lg:pr-3">
        <div>
          {/* Disambiguation */}
          {content.disambiguation && (
            <p className="text-xs italic mb-2 text-gray-600">
              <DisambiguationText text={content.disambiguation} />
            </p>
          )}

          {/* Article sections */}
          <div className="max-w-none">
            {content.sections.map((section, index) => (
              <WikiSection key={index} section={section} level={2} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Info Box */}
      {content.infobox && (
        <div className="lg:w-1/3 lg:pl-3">
          <WikiInfobox infobox={content.infobox} title={content.title} />
        </div>
      )}
    </div>
  );
}

function DisambiguationText({ text }: { text: string }) {
  // Simple link parsing for disambiguation text
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = text.split(linkRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          return part;
        } else if (index % 3 === 1) {
          const url = parts[index + 1];
          return (
            <Link
              key={index}
              href={url}
              className="text-blue-600 hover:underline"
            >
              {part}
            </Link>
          );
        }
        return null;
      })}
    </>
  );
}

function WikiSection({
  section,
  level,
}: {
  section: ContentSection;
  level: number;
}) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  const id = section.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const headingClass =
    level === 2
      ? "text-xl font-bold mb-2 border-b border-gray-300 pb-1"
      : level === 3
        ? "text-base font-semibold mb-2 border-b border-gray-200 pb-1"
        : "text-sm font-medium mb-1";

  return (
    <div className="mb-4 first:mt-0">
      {section.title && (
        <div
          className={`mb-2 ${level === 2 ? "border-b border-gray-300 pb-1" : level === 3 ? "border-b border-gray-200 pb-1" : ""} flex justify-between items-baseline`}
        >
          <HeadingTag
            id={id}
            className={
              level === 2
                ? "text-xl font-bold"
                : level === 3
                  ? "text-base font-semibold"
                  : "text-sm font-medium"
            }
          >
            {section.title}
          </HeadingTag>
          <div className="flex items-center gap-2">
            {section.githubUrl && (
              <a
                href={section.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="View on GitHub"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {section.websiteUrl && (
              <a
                href={section.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Open website"
              >
                <AiOutlineGlobal className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {section.date && (
              <span className="text-sm text-gray-600 italic">
                {section.date}
              </span>
            )}
          </div>
        </div>
      )}

      {section.image ? (
        <div
          className={`flex gap-4 ${section.image.position === ImagePosition.LEFT ? "flex-row-reverse" : "flex-row"}`}
        >
          <div className="flex-1 space-y-2">
            {/* Description with JSX formatting */}
            <div className="text-gray-900 leading-relaxed text-sm">
              <ParsedContent>{section.description}</ParsedContent>
            </div>

            {/* Technologies */}
            {section.technologies && (
              <div className="mt-3">
                <strong className="text-sm text-gray-900">
                  Technologies:{" "}
                </strong>
                <span className="text-sm text-gray-700">
                  {section.technologies}
                </span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 w-48">
            <SectionImage image={section.image} />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Description with JSX formatting */}
          <div className="text-gray-900 leading-relaxed text-sm">
            <ParsedContent>{section.description}</ParsedContent>
          </div>

          {/* Technologies */}
          {section.technologies && (
            <div className="mt-3">
              <strong className="text-sm text-gray-900">Technologies: </strong>
              <span className="text-sm text-gray-700">
                {section.technologies}
              </span>
            </div>
          )}
        </div>
      )}

      {section.subsections && (
        <div className="mt-3">
          {section.subsections.map((subsection, index) => (
            <WikiSection
              key={index}
              section={subsection}
              level={Math.min(level + 1, 6)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WikiInfobox({ infobox, title }: { infobox: Infobox; title: string }) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded p-4 sticky top-6 max-w-xs">
      <h3 className="font-bold text-center mb-4 text-lg border-b border-gray-300 pb-2">
        {title}
      </h3>

      {infobox.image && (
        <div className="mb-4">
          <img
            src="/profile-photo.png"
            alt={infobox.imageCaption || title}
            className="w-full aspect-square object-cover border border-gray-300 rounded"
          />
          {infobox.imageCaption && (
            <p className="text-xs text-gray-600 mt-2 text-center italic">
              {infobox.imageCaption}
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {infobox.fields.map((field, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-2 last:border-b-0"
          >
            <dt className="font-semibold text-sm text-gray-900 mb-1">
              {field.label}
            </dt>
            <dd className="text-sm text-gray-700">
              <InfoboxValue value={field.value} />
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoboxValue({ value }: { value: string }) {
  // Simple link parsing for infobox values
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = value.split(linkRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          // Handle newlines by splitting and adding <br> tags, then parse JSX formatting
          return part.split("\n").map((line, lineIndex, lines) => (
            <span key={`${index}-${lineIndex}`}>
              {parseJSXText(line)}
              {lineIndex < lines.length - 1 && <br />}
            </span>
          ));
        } else if (index % 3 === 1) {
          const url = parts[index + 1];
          return (
            <Link
              key={index}
              href={url}
              className="text-blue-600 hover:underline"
            >
              {parseJSXText(part)}
            </Link>
          );
        }
        return null;
      })}
    </>
  );
}
