import { ImagePosition, type JSONContent } from "@/lib/json-content";
import { aneeshKumarInfobox } from "./profile-infobox";

export const projectsContent: JSONContent = {
  title: "Projects",
  url: "/projects",
  disambiguation:
    "This article covers independent technical projects by [Aneesh Kumar](/). For employment and publications, see [Aneesh Kumar (Career)](/career).",
  infobox: aneeshKumarInfobox,
  infoboxTitle: "Aneesh Kumar",
  sections: [
    {
      title: "LitReviewer",
      date: "Full-stack platform",
      description:
        "LitReviewer is an independently developed full-stack web platform for AI-assisted literature review and research-paper analysis.",
      technologies: "React, TypeScript, FastAPI, LLMs",
      websiteUrl: "http://litreviewer.net/",
      githubUrl: "https://github.com/aneesh6214/Paper-Reviewer",
      image: {
        src: "/images/projects/litreviewer-landing-page.png",
        alt: "LitReviewer platform preview",
        caption: "Platform Preview",
        captionUrl: "http://litreviewer.net/",
        position: ImagePosition.RIGHT,
      },
    },
    {
      title: "Biological Timescale Synaptic Plasticity",
      date: "Independent writeup",
      description:
        "Biological Timescale Synaptic Plasticity is an independent technical writeup on synaptic plasticity, memory formation, and learning over behavioral timescales.",
      technologies: "BTSP, Neuroscience, Memory, Learning Systems",
      image: {
        src: "/images/projects/btsp-preview.png",
        alt: "BTSP writeup preview",
        caption: "PDF Writeup",
        captionUrl:
          "https://drive.google.com/file/d/1dOQOKhdXwFE195OMDPaQB8ppldkzHcSZ/view",
        position: ImagePosition.RIGHT,
      },
    },
  ],
};
