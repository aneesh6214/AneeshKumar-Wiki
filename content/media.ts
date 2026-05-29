import { ImagePosition, type JSONContent } from "@/lib/json-content";
import { aneeshKumarInfobox } from "./profile-infobox";

const placeholderDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const mediaContent: JSONContent = {
  title: "Media",
  url: "/media",
  disambiguation:
    "This article covers lectures and educational media by [Aneesh Kumar](/). For technical projects, see [Projects](/projects).",
  infobox: aneeshKumarInfobox,
  infoboxTitle: "Aneesh Kumar",
  sections: [
    {
      title: "AI Club Lectures",
      date: "Slide series",
      description: placeholderDescription,
      technologies: "Artificial Intelligence, Slides, Student Teaching",
      image: {
        src: "/placeholder.jpg",
        alt: "Placeholder slide deck preview for AI Club lectures",
        caption: "AI Club slide deck placeholder",
        position: ImagePosition.RIGHT,
      },
    },
    {
      title: "AI Architecture Series",
      date: "YouTube series",
      description: placeholderDescription,
      technologies: "AI Architecture, YouTube, Technical Communication",
      websiteUrl: "https://www.youtube.com/@aneeshk6214",
      image: {
        src: "/placeholder.jpg",
        alt: "Placeholder preview for AI Architecture Series",
        caption: "AI Architecture Series placeholder",
        position: ImagePosition.RIGHT,
      },
    },
  ],
};
