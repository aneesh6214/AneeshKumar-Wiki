import { ImagePosition, type JSONContent } from "@/lib/json-content";
import { aneeshKumarInfobox } from "./profile-infobox";

export const careerContent: JSONContent = {
  title: "Career",
  url: "/career",
  disambiguation:
    "This article covers the career of [Aneesh Kumar](/). For independent projects, see [Aneesh Kumar (Projects)](/projects).",
  infobox: aneeshKumarInfobox,
  infoboxTitle: "Aneesh Kumar",
  sections: [
    {
      id: "employment",
      title: "Employment",
      group: "employment",
      subsections: [
        {
          title: "Quantifind",
          date: "May 2025-Ongoing",
          image: {
            src: "/images/career/quantifind-logo.png",
            alt: "Quantifind logo",
            caption: "Quantifind",
            captionUrl: "https://www.quantifind.com/",
            position: ImagePosition.LEFT,
          },
          subsections: [
            {
              title: "Associate Platform Engineer",
              date: "Current Position",
              description:
                "Kumar works on data and security infrastructure for Quantifind's API platform. His work includes data pipelines for parallel ML inference; systems for ingestion, migration, and entity resolution; and observability infrastructure for monitoring model performance, resource utilization, and API traffic.",
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
          date: "May 2024 - August 2024",
          image: {
            src: "/images/career/oracle-logo.svg",
            alt: "Oracle software development",
            caption: "Oracle",
            captionUrl: "https://www.oracle.com/",
            position: ImagePosition.RIGHT,
          },
          subsections: [
            {
              title: "Software Engineering Intern",
              date: "May 2024 - August 2024",
              description:
                "In 2024, Kumar worked as a software engineering intern at Oracle, where he developed backend services for real-time natural-language database querying and a full-stack dashboard for customer support workflows. His work culminated in a proof-of-concept system integrating AI inference pipelines into a customer-facing application, and he was later described by his manager as a top performer in his intern cohort.",
              technologies:
                "Python, GraphQL, FastAPI, TypeScript/JavaScript, React, OCI, Docker, Oracle Database",
            },
          ],
        },
      ],
    },
    {
      id: "publications",
      title: "Publications",
      group: "publications",
      subsections: [
        {
          title: "Predicting Emergent Capabilities Using Sparse Features",
          date: "2025",
          venue: "AAAI XAI4Science Workshop",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: {
            src: "/images/career/predicting-emergence.png",
            alt: "Sparse feature visualization",
            caption: "SAE-based graphs for emergence prediction",
            position: ImagePosition.RIGHT,
            link: "https://drive.google.com/file/d/125hRUSI4SOv8I-OLyzysT12cKY8yUay2/view?usp=sharing",
          },
          technologies:
            "Sparse Autoencoders, Transformers, Mechanistic Interpretability",
          websiteUrl: "https://openreview.net/forum?id=12xpM8a6YK&noteId=12xpM8a6YK",
        },
      ],
    },
  ],
};
