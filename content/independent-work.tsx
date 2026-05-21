import React from "react";
import { ImagePosition, JSONContent } from "@/lib/json-content";
import { aneeshKumarInfobox } from "./profile-infobox";

const placeholderDescription = (
  <>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </>
);

export const independentWorkContent: JSONContent = {
  title: "Independent Work",
  subtitle: "Products, repositories, and self-directed research",
  description: "Independent products, technical artifacts, and research prototypes",
  url: "/independent-work",
  disambiguation:
    "This article covers independent technical work by [Aneesh Kumar](/). For employment and publications, see [Aneesh Kumar (Professional Work)](/professional-work).",
  infobox: aneeshKumarInfobox,
  infoboxTitle: "Aneesh Kumar",
  sections: [
    {
      title: "LitReviewer",
      date: "Full-stack platform",
      description: placeholderDescription,
      technologies: "React, TypeScript, FastAPI, LLMs",
      websiteUrl: "https://www.mypapergrader.com/",
      githubUrl: "https://github.com/aneesh6214/Paper-Reviewer",
      image: {
        src: "/placeholder.jpg",
        alt: "Placeholder preview for LitReviewer",
        caption: "LitReviewer platform preview",
        position: ImagePosition.RIGHT,
      },
    },
    {
      title: "CSC648 Showcase Team Lead",
      date: "Project management",
      description: placeholderDescription,
      technologies: "Pull Requests, Tickets, Planning, Team Leadership",
      image: {
        src: "/placeholder.jpg",
        alt: "Placeholder artifact for CSC648 showcase leadership",
        caption: "Selected project artifact",
        position: ImagePosition.RIGHT,
      },
    },
    {
      title: "SURI Concept Formation Model",
      date: "Research repository",
      description: placeholderDescription,
      technologies: "Unsupervised Learning, Concept Formation, Python, PyTorch",
      githubUrl: "https://github.com/aneesh6214",
      image: {
        src: "/placeholder.svg",
        alt: "Placeholder diagram for concept formation model",
        caption: "Model architecture placeholder",
        position: ImagePosition.RIGHT,
      },
    },
    {
      title: "Biological Timescale Synaptic Plasticity",
      date: "Independent writeup",
      description: placeholderDescription,
      technologies: "BTSP, Neuroscience, Memory, Learning Systems",
      image: {
        src: "/btsp-preview.png",
        alt: "BTSP writeup preview",
        caption: "BTSP writeup preview",
        position: ImagePosition.RIGHT,
        link: "https://drive.google.com/file/d/1dOQOKhdXwFE195OMDPaQB8ppldkzHcSZ/view",
      },
    },
  ],
};
