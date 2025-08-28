import Link from 'next/link'
import { JSONContent, ContentBlock, ContentSection, Infobox, ContentType, ImagePosition } from '@/lib/json-content'

interface SectionImageProps {
  image: {
    src: string
    alt: string
    caption?: string
    position: ImagePosition
    link?: string
  }
}

function SectionImage({ image }: SectionImageProps) {
  const imageElement = (
    <img 
      src={image.src} 
      alt={image.alt}
      className="w-full aspect-square object-contain rounded"
    />
  )

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
  )
}

interface SkillsGridProps {
  categories: Array<{
    name: string
    skills: string[]
  }>
}

function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {categories.map((category, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="font-semibold text-base mb-3 text-gray-900 border-b border-gray-300 pb-2">
            {category.name}
          </h4>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <span 
                key={skillIndex}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface ContactInfoProps {
  email?: string
  phone?: string
  socialLinks?: Array<{
    platform: string
    url: string
    username: string
  }>
}

function ContactInfo({ email, phone, socialLinks }: ContactInfoProps) {
  const getIconForPlatform = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        )
      case 'youtube':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        )
      case 'github':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        )
      case 'linkedin':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return 'hover:bg-blue-500 hover:text-white'
      case 'youtube': return 'hover:bg-red-500 hover:text-white'
      case 'github': return 'hover:bg-gray-800 hover:text-white'
      case 'linkedin': return 'hover:bg-blue-600 hover:text-white'
      default: return 'hover:bg-gray-500 hover:text-white'
    }
  }

  return (
    <div className="space-y-8 my-6">
      {/* Contact Text */}
      <div className="space-y-4">
        {email && (
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Email</h4>
            <a href={`mailto:${email}`} className="text-lg text-blue-600 hover:underline">
              {email}
            </a>
          </div>
        )}
        {phone && (
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Phone</h4>
            <a href={`tel:${phone}`} className="text-lg text-blue-600 hover:underline">
              {phone}
            </a>
          </div>
        )}
      </div>

      {/* Social Links */}
      {socialLinks && socialLinks.length > 0 && (
        <div className="text-center">
          <div className="flex justify-center gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 border border-gray-300 rounded-full text-gray-600 transition-all duration-200 ${getPlatformColor(link.platform)}`}
                title={`${link.platform}: ${link.username}`}
              >
                {getIconForPlatform(link.platform)}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

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
    ? "text-base font-semibold mb-2 border-b border-gray-200 pb-1"
    : "text-sm font-medium mb-1"
  
  return (
    <div className="mb-4 first:mt-0">
      {section.title && (
        <div className={`mb-2 ${level === 2 ? 'border-b border-gray-300 pb-1' : level === 3 ? 'border-b border-gray-200 pb-1' : ''} flex justify-between items-baseline`}>
          <HeadingTag id={id} className={level === 2 ? "text-xl font-bold" : level === 3 ? "text-base font-semibold" : "text-sm font-medium"}>
            {section.title}
          </HeadingTag>
          {section.date && (
            <span className="text-sm text-gray-600 italic">{section.date}</span>
          )}
        </div>
      )}
      
      {section.image ? (
        <div className={`flex gap-4 ${section.image.position === ImagePosition.LEFT ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="flex-1 space-y-2">
            {section.content.map((block, index) => (
              <ContentBlock key={index} block={block} />
            ))}
          </div>
          <div className="flex-shrink-0 w-48">
            <SectionImage image={section.image} />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {section.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
        </div>
      )}
      
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

interface ProjectLinkProps {
  url?: string
  linkText?: string
  linkType?: 'github' | 'external' | 'demo'
}

function ProjectLink({ url, linkText, linkType }: ProjectLinkProps) {
  if (!url || !linkText) return null

  const getIcon = () => {
    switch (linkType) {
      case 'github':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        )
      case 'demo':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )
    }
  }

  const getStyles = () => {
    switch (linkType) {
      case 'github':
        return 'bg-gray-800 hover:bg-gray-900 text-white'
      case 'demo':
        return 'bg-blue-600 hover:bg-blue-700 text-white'
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white'
    }
  }

  return (
    <div className="my-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${getStyles()}`}
      >
        {getIcon()}
        {linkText}
      </a>
    </div>
  )
}

function ContentBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case ContentType.PARAGRAPH:
      return <p className="text-gray-900 leading-relaxed text-sm">{block.text}</p>
    
    case ContentType.LIST:
      return (
        <ul className="list-disc list-inside space-y-1 text-gray-900 ml-4">
          {block.items?.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      )
    
    case ContentType.QUOTE:
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 bg-gray-50 py-2">
          {block.text}
        </blockquote>
      )
    
    case ContentType.SKILLS_GRID:
      return <SkillsGrid categories={block.categories || []} />
    
    case ContentType.CONTACT_INFO:
      return <ContactInfo email={block.email} phone={block.phone} socialLinks={block.socialLinks} />
    
    case ContentType.LINK:
      return <ProjectLink url={block.url} linkText={block.linkText} linkType={block.linkType} />
    
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
          // Handle newlines by splitting and adding <br> tags
          return part.split('\n').map((line, lineIndex, lines) => (
            <span key={`${index}-${lineIndex}`}>
              {line}
              {lineIndex < lines.length - 1 && <br />}
            </span>
          ))
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