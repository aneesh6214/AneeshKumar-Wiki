import { ContentType, ImagePosition, JSONContent } from '@/lib/json-content'

export const industryWorkContent: JSONContent = {
  title: "Industry Work",
  subtitle: "Professional Experience",
  description: "Professional experience and career highlights",
  url: "/industry-work",
  disambiguation: "This article covers the professional work experience of [Aneesh Kumar](/). For his personal projects, see [Aneesh Kumar (Projects)](/projects).",
  sections: [
    {
      title: "Platform Engineering Intern @ Quantifind",
      date: "May 2025-Ongoing",
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "As a Platform Engineering Intern at Quantifind, Aneesh is responsible for building out the backbone that keeps AI systems running smoothly. He works on scalable AI infrastructure by integrating APIs and data processing to serve solutions.\nIt is a mix of engineering grit and AI curiosity."
        },
        {
          type: ContentType.QUOTE,
          text: "It taught me how much impact the 'invisible' parts of a system have."
        },
        {
          type: ContentType.PARAGRAPH,
          text: "Aneesh initially started as a Summer Intern for 2025, and recieved an offer to work through the Fall 2025 semester, alongside of his academics."
        },
      ],
      image: {
        src: "/quantifind-logo.png",
        alt: "Quantifind logo",
        caption: "Quantifind - Risk Analytics and Consumer Insights",
        position: ImagePosition.LEFT
      }
    },
    {
      title: "Software Engineering Intern @ Oracle",
      date: "May 2024-August 2024",
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "Aneesh was a Software Engineering Intern at Oracle during the summer of 2025. Over the course of these 3 months, Aneesh went through the entire phase in the Software Development Lifecycle as the lead intern on a team of 3. He ideated and executed a Generative AI initiative to incorporate natural language data retrieval for customers on top of a fullstack data analytics page."
        },
        {
          type: ContentType.PARAGRAPH,
          text: "Over the course of the summer, Aneesh took leadership on multiple projects and delivered a Generative AI POC to the executive team."
        }
      ],
      image: {
        src: "/oracle-logo.png",
        alt: "Oracle software development",
        caption: "Enterprise software development environment",
        position: ImagePosition.RIGHT
      }
    }
  ]
}