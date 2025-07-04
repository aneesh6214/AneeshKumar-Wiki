import Link from 'next/link'
import { JSONContent, ContentBlock, ContentSection, Infobox } from '@/lib/json-content'

interface WikiContentProps {
  content: JSONContent
}

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
  )
}

function DisambiguationText({ text }: { text: string }) {
  // Simple link parsing for disambiguation text
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = text.split(linkRegex)
  
  return (
    <>
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          return part
        } else if (index % 3 === 1) {
          const url = parts[index + 1]
          return (
            <Link key={index} href={url} className="text-blue-600 hover:underline">
              {part}
            </Link>
          )
        }
        return null
      })}
    </>
  )
}

function WikiSection({ section, level }: { section: ContentSection; level: number }) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  
  const headingClass = level === 2 
    ? "text-xl font-bold mb-2 border-b border-gray-300 pb-1"
    : level === 3
    ? "text-lg font-semibold mb-2 border-b border-gray-200 pb-1"
    : "text-base font-medium mb-1"
  
  return (
    <div className="mb-4 first:mt-0">
      {section.title && (
        <HeadingTag id={id} className={headingClass}>
          {section.title}
        </HeadingTag>
      )}
      
      <div className="space-y-2">
        {section.content.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
      </div>
      
      {section.subsections && (
        <div className="mt-3">
          {section.subsections.map((subsection, index) => (
            <WikiSection key={index} section={subsection} level={Math.min(level + 1, 6)} />
          ))}
        </div>
      )}
    </div>
  )
}

function ContentBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-gray-900 leading-relaxed text-sm">{block.text}</p>
    
    case 'list':
      return (
        <ul className="list-disc list-inside space-y-1 text-gray-900 ml-4">
          {block.items?.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      )
    
    case 'quote':
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 bg-gray-50 py-2">
          {block.text}
        </blockquote>
      )
    
    default:
      return <p className="text-gray-900 leading-relaxed text-sm">{block.text}</p>
  }
}

function WikiInfobox({ infobox, title }: { infobox: Infobox; title: string }) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded p-4 sticky top-6 max-w-xs">
      <h3 className="font-bold text-center mb-4 text-lg border-b border-gray-300 pb-2">{title}</h3>
      
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
          <div key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
            <dt className="font-semibold text-sm text-gray-900 mb-1">{field.label}</dt>
            <dd className="text-sm text-gray-700">
              <InfoboxValue value={field.value} />
            </dd>
          </div>
        ))}
      </div>
    </div>
  )
}

function InfoboxValue({ value }: { value: string }) {
  // Simple link parsing for infobox values
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = value.split(linkRegex)
  
  return (
    <>
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          return part
        } else if (index % 3 === 1) {
          const url = parts[index + 1]
          return (
            <Link key={index} href={url} className="text-blue-600 hover:underline">
              {part}
            </Link>
          )
        }
        return null
      })}
    </>
  )
}