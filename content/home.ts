import { ContentType, JSONContent } from '@/lib/json-content'

export const homeContent: JSONContent = {
  title: "Aneesh Kumar",
  subtitle: "Software Engineer",
  description: "Personal knowledge base and portfolio",
  url: "/",
  disambiguation: "This article is about the software engineer. For his technical blog, see [Aneesh Kumar (blog)](/blog).",
  infobox: {
    image: "/profile-photo.jpg",
    imageCaption: "Aneesh Kumar in 2024",
    fields: [
      { label: "Born", value: "Aneesh Kumar\nJune 21, 2004 (age 21)\nSan Francisco, California, U.S." },
      { label: "Location", value: "San Francisco Bay Area" },
      { label: "Position", value: "SWE Intern at [Quantifind](https://www.quantifind.com/)" },
      { label: "University", value: "San Francisco State University" }
    ]
  },
  sections: [
    {
      title: "Overview",
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "Aneesh Kumar is an AI researcher and engineer whose work involves independent research and agent design. His projects range from exploring emergence in AI systems and theory work to concrete computer science work. Aneesh is particularly interested in the intersection of philosophy and AI.\nHe is the founder and president of the Artificial Intelligence club at San Francisco State University. He is currently a Platform Engineering Intern at Quantifind. "
        }
      ]
    }
  ]
}