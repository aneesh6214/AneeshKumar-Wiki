import React from "react";
import { ImagePosition, JSONContent } from "@/lib/json-content";
import { aneeshKumarInfobox } from "./profile-infobox";

export const professionalWorkContent: JSONContent = {
  title: "Professional Work",
  subtitle: "Professional Experience",
  description: "Professional experience and career highlights",
  url: "/professional-work",
  disambiguation:
    "This article covers the professional work of [Aneesh Kumar](/). For independent projects, see [Aneesh Kumar (Independent Work)](/independent-work).",
  infobox: aneeshKumarInfobox,
  sections: [
    {
      title: "Quantifind",
      date: "May 2025-Ongoing",
      description: (
        <>
          Aneesh Kumar contributes to building and maintaining the core
          infrastructure that underpins [Quantifind](https://en.wikipedia.org/wiki/Quantifind)'s AI systems.
        </>
      ),
      image: {
        src: "/quantifind-logo.png",
        alt: "Quantifind logo",
        caption: "Quantifind",
        captionUrl: "https://www.quantifind.com/",
        position: ImagePosition.LEFT,
      },
      subsections: [
        {
          title: "Associate Platform Engineer",
          date: "Current Position",
          description: (
            <>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </>
          ),
          technologies: "Scala, Jenkins, Ansible, Azkaban",
        },
        {
          title: "Platform Engineering Intern",
          date: "May 2025 - March 2026",
        },
      ],
    },
    {
      title: "Oracle",
      date: "May 2024-August 2024",
      description: (
        <>
          Oracle was Aneesh's first software engineering internship. He came on
          as a back-end software engineering intern and transitioned into a
          full-stack role across databases and cloud services.
        </>
      ),
      image: {
        src: "/oracle-logo.svg",
        alt: "Oracle software development",
        caption: "Oracle",
        captionUrl: "https://www.oracle.com/",
        position: ImagePosition.RIGHT,
      },
      subsections: [
        {
          title: "Software Engineering Intern",
          date: "May 2024 - August 2024",
          description: (
            <>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </>
          ),
          technologies:
            "Python, GraphQL, FastAPI, TypeScript/JavaScript, React, OCI, Docker, Oracle Database",
        },
      ],
    },
    {
      title: "Exploring Sparse Feature Topology as a Predictor for Emergence",
      date: "AAAI XAI4Science 2026 Workshop",
      description: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </>
      ),
      image: {
        src: "/predicting_emergence.png",
        alt: "Sparse feature visualization",
        caption: "SAE-based graphs for emergence prediction",
        position: ImagePosition.RIGHT,
        link: "https://drive.google.com/file/d/125hRUSI4SOv8I-OLyzysT12cKY8yUay2/view?usp=sharing",
      },
      technologies:
        "Sparse Autoencoders, Mechanistic Interpretability, Transformer Models, Graph Metrics",
      websiteUrl: "https://openreview.net/forum?id=12xpM8a6YK&noteId=12xpM8a6YK",
    },
  ],
};
