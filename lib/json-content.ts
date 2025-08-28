
export enum ContentType {
  PARAGRAPH = 'paragraph',
  LIST = 'list',
  HEADING = 'heading',
  QUOTE = 'quote',
  SKILLS_GRID = 'skillsGrid',
  CONTACT_INFO = 'contactInfo',
  LINK = 'link'
}

export enum ImagePosition {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface ContentBlock {
  type: ContentType
  text?: string
  items?: string[]
  level?: number
  categories?: Array<{
    name: string
    skills: string[]
  }>
  email?: string
  phone?: string
  socialLinks?: Array<{
    platform: string
    url: string
    username: string
  }>
  url?: string
  linkText?: string
  linkType?: 'github' | 'external' | 'demo'
}

export interface ContentSection {
  title: string
  content: ContentBlock[]
  date?: string
  subsections?: ContentSection[]
  image?: {
    src: string
    alt: string
    caption?: string
    position: ImagePosition
    link?: string
  }
}

export interface InfoboxField {
  label: string
  value: string
}

export interface Infobox {
  image?: string
  imageCaption?: string
  fields: InfoboxField[]
}

export interface JSONContent {
  title: string
  subtitle?: string
  description: string
  url: string
  disambiguation?: string
  infobox?: Infobox
  sections: ContentSection[]
}

export async function getJSONContent(slug: string): Promise<JSONContent> {
  try {
    switch (slug) {
      case 'home':
        const { homeContent } = await import('../content/home')
        return homeContent
      case 'industry-work':
        const { industryWorkContent } = await import('../content/industry-work')
        return industryWorkContent
      case 'research':
        const { researchContent } = await import('../content/research')
        return researchContent
      case 'projects':
        const { projectsContent } = await import('../content/projects')
        return projectsContent
      case 'blog':
        const { blogContent } = await import('../content/blog')
        return blogContent
      case 'contact':
        const { contactContent } = await import('../content/contact')
        return contactContent
      default:
        throw new Error(`Content file not found: ${slug}`)
    }
  } catch (error) {
    throw new Error(`Failed to load content: ${slug}`)
  }
}

export async function getAllJSONContent(): Promise<Record<string, JSONContent>> {
  const slugs = ['home', 'industry-work', 'research', 'projects', 'blog', 'contact']
  const allContent: Record<string, JSONContent> = {}

  for (const slug of slugs) {
    allContent[slug] = await getJSONContent(slug)
  }

  return allContent
}

export function extractSearchableText(content: JSONContent): string {
  let text = content.title + ' ' + (content.subtitle || '') + ' ' + content.description + ' '
  
  if (content.disambiguation) {
    text += content.disambiguation + ' '
  }

  if (content.infobox) {
    content.infobox.fields.forEach(field => {
      text += field.label + ' ' + field.value + ' '
    })
  }

  function extractFromSections(sections: ContentSection[]): string {
    let sectionText = ''
    sections.forEach(section => {
      sectionText += section.title + ' '
      section.content.forEach(block => {
        if (block.text) {
          sectionText += block.text + ' '
        }
        if (block.items) {
          sectionText += block.items.join(' ') + ' '
        }
      })
      if (section.subsections) {
        sectionText += extractFromSections(section.subsections)
      }
    })
    return sectionText
  }

  text += extractFromSections(content.sections)
  
  return text
}

export function extractSections(content: JSONContent): Array<{id: string, title: string, content: string, url: string}> {
  const sections: Array<{id: string, title: string, content: string, url: string}> = []
  
  function processSections(sectionList: ContentSection[], parentTitle?: string) {
    sectionList.forEach(section => {
      const fullTitle = parentTitle ? `${parentTitle} > ${section.title}` : section.title
      const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      
      let sectionContent = ''
      section.content.forEach(block => {
        if (block.text) {
          sectionContent += block.text + ' '
        }
        if (block.items) {
          sectionContent += block.items.join(' ') + ' '
        }
      })
      
      sections.push({
        id,
        title: fullTitle,
        content: sectionContent.trim(),
        url: content.url
      })
      
      if (section.subsections) {
        processSections(section.subsections, fullTitle)
      }
    })
  }
  
  processSections(content.sections)
  return sections
}