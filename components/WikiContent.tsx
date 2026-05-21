import Link from "next/link";
import React from "react";
import {
  JSONContent,
  ContentSection,
  Infobox,
  InfoboxSocialLink,
  ImagePosition,
} from "@/lib/json-content";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

function ParsedContent({ children }: { children: React.ReactNode }) {
  const transformNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") {
      return parseJSXText(node);
    }

    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
      const newChildren =
        React.Children.map(node.props.children, transformNode) || [];
      return React.cloneElement(node, node.props, ...newChildren);
    }

    return node;
  };

  return transformNode(children);
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-blue-300 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700 rounded-r">
      <ParsedContent>{children}</ParsedContent>
    </blockquote>
  );
}

function parseJSXText(text: string): React.ReactNode {
  if (!text) return text;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const linkParts = text.split(linkRegex);

  const processedElements: React.ReactNode[] = [];

  for (let i = 0; i < linkParts.length; i++) {
    const part = linkParts[i];

    if (i % 3 === 0) {
      if (part) {
        processedElements.push(parseJSXTags(part, `text-${i}`));
      }
    } else if (i % 3 === 1) {
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
  }

  return processedElements.length === 1
    ? processedElements[0]
    : processedElements;
}

function parseJSXTags(text: string, keyPrefix: string): React.ReactNode {
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
          {parseJSXTags(content, `${keyPrefix}-nested-${currentIndex}`)}
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
          {parseJSXTags(content, `${keyPrefix}-nested-${currentIndex}`)}
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

export { Quote };

export default function WikiContent({ content }: WikiContentProps) {
  return (
    <div className="flex flex-col gap-6 px-4 pt-3 sm:px-6 lg:flex-row">
      <div className="min-w-0 flex-1">
        <div>
          {content.disambiguation && (
            <p className="text-xs italic mb-2 text-gray-600">
              <DisambiguationText text={content.disambiguation} />
            </p>
          )}

          <div className="max-w-none">
            {content.sections.map((section, index) => (
              <WikiSection key={index} section={section} level={2} />
            ))}
          </div>
        </div>
      </div>

      {content.infobox && (
        <aside className="lg:w-80 lg:flex-shrink-0">
          <WikiInfobox infobox={content.infobox} title={content.title} />
        </aside>
      )}
    </div>
  );
}

function DisambiguationText({ text }: { text: string }) {
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
  const HeadingTag = `h${level}` as React.ElementType;
  const id = section.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

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
                ? "font-serif text-xl font-medium"
                : level === 3
                  ? "font-serif text-base font-medium"
                  : "font-serif text-sm font-medium"
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
            <div className="text-gray-900 leading-relaxed text-sm">
              <ParsedContent>{section.description}</ParsedContent>
            </div>

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
          <div className="text-gray-900 leading-relaxed text-sm">
            <ParsedContent>{section.description}</ParsedContent>
          </div>

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

export function WikiInfobox({
  infobox,
  title,
}: {
  infobox: Infobox;
  title: string;
}) {
  return (
    <div className="w-full max-w-xs border border-gray-400 bg-gray-50 text-[13px] lg:sticky lg:top-6">
      <h3 className="border-b border-gray-400 bg-gray-100 px-2 py-1.5 text-center text-sm font-bold text-gray-900">
        {title}
      </h3>

      {infobox.image && (
        <div className="px-2 pb-2 pt-2">
          <img
            src={infobox.image}
            alt={infobox.imageCaption || title}
            className="w-full border border-gray-300 object-contain"
          />
          {infobox.imageCaption && (
            <p className="mt-1.5 text-center text-xs italic text-gray-600">
              {infobox.imageCaption}
            </p>
          )}
        </div>
      )}

      <dl className="border-t border-gray-300">
        {infobox.fields.map((field, index) => (
          <div
            key={index}
            className="grid grid-cols-[5.75rem_minmax(0,1fr)] border-b border-gray-200 last:border-b-0"
          >
            <dt className="bg-gray-100 px-2 py-1.5 font-semibold text-gray-900">
              {field.label}
            </dt>
            <dd className="min-w-0 break-words px-2 py-1.5 text-gray-700">
              <InfoboxValue value={field.value} />
            </dd>
          </div>
        ))}
      </dl>

      {(infobox.email || infobox.socialLinks?.length) && (
        <div className="border-t border-gray-300">
          {infobox.email && (
            <div className="grid grid-cols-[5.75rem_minmax(0,1fr)] border-b border-gray-200">
              <div className="bg-gray-100 px-2 py-1.5 font-semibold text-gray-900">
                Email
              </div>
              <div className="min-w-0 break-words px-2 py-1.5 text-gray-700">
                <a
                  href={`mailto:${infobox.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {infobox.email}
                </a>
              </div>
            </div>
          )}

          {infobox.socialLinks?.length ? (
            <div className="flex items-center justify-center gap-3 bg-white px-2 py-2.5">
              {infobox.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="text-gray-700 transition-colors hover:text-blue-700"
                >
                  <SocialIcon link={link} />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function SocialIcon({ link }: { link: InfoboxSocialLink }) {
  const className = "h-5 w-5";

  if (link.platform === "linkedin") {
    return <FaLinkedin aria-hidden="true" className={className} />;
  }

  if (link.platform === "github") {
    return <FaGithub aria-hidden="true" className={className} />;
  }

  return <FaYoutube aria-hidden="true" className={className} />;
}

function InfoboxValue({ value }: { value: string }) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = value.split(linkRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (index % 3 === 0) {
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
