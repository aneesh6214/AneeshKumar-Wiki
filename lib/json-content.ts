import fs from 'fs'
import path from 'path'

export interface ContentBlock {
  type: 'paragraph' | 'list' | 'heading' | 'quote'
  text?: string
  items?: string[]
  level?: number
}

export interface ContentSection {
  title: string
  content: ContentBlock[]
  subsections?: ContentSection[]
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

const contentDirectory = path.join(process.cwd(), 'content')

export async function getJSONContent(slug: string): Promise<JSONContent> {
  const filePath = path.join(contentDirectory, `${slug}.json`)
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Content file not found: ${slug}.json`)
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const content = JSON.parse(fileContents) as JSONContent

  return content
}

export async function getAllJSONContent(): Promise<Record<string, JSONContent>> {
  const contentFiles = fs.readdirSync(contentDirectory)
  const allContent: Record<string, JSONContent> = {}

  for (const fileName of contentFiles) {
    if (fileName.endsWith('.json')) {
      const slug = fileName.replace('.json', '')
      allContent[slug] = await getJSONContent(slug)
    }
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