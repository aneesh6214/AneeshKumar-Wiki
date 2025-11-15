import React from "react";
import { ImagePosition, JSONContent } from "@/lib/json-content";
import { Quote } from "@/components/WikiContent";

export const industryWorkContent: JSONContent = {
  title: "Industry Work",
  subtitle: "Professional Experience",
  description: "Professional experience and career highlights",
  url: "/industry-work",
  disambiguation:
    "This article covers the professional work experience of [Aneesh Kumar](/). For his personal projects, see [Aneesh Kumar (Projects)](/projects).",
  sections: [
    {
      title: "Platform Engineering Intern @ Quantifind",
      date: "May 2025-Ongoing",
      description: (
        <>
          As a <strong>Platform Engineering Intern at Quantifind</strong>,
          Aneesh Kumar contributes to building and maintaining the core
          infrastructure that underpins [Quantifind](https://en.wikipedia.org/wiki/Quantifind)'s AI systems. His work focuses on
          large-scale API integration, managing data processing pipelines, and ensuring
          that large-scale AI services run efficiently and reliably. This role
          combines practical engineering with a deep curiosity about how systems
          operate at scale.
          <br />
          <Quote>
            "It taught me how much impact the 'invisible' parts of a system
            have." —Aneesh Kumar
          </Quote>
          Aneesh began his internship in Summer 2025 and was invited to continue
          part-time alongside his undergraduate studies. Working on production systems gave 
          him a clearer sense of how infrastructure supports every layer of AI development, from 
          experimentation to deployment, and how thoughtful engineering enables real-world impact.
        </>
      ),
      image: {
        src: "/quantifind-logo.png",
        alt: "Quantifind logo",
        caption: "The Risk Intelligence Company",
        position: ImagePosition.LEFT,
      },
    },
    {
      title: "Software Engineering Intern @ Oracle",
      date: "May 2024-August 2024",
      description: (
        <>
          Oracle was Aneesh's first software engineering internship. He came on
          as a <strong>back-end software engineering intern</strong> but quickly
          transitioned to a <em>full-stack role</em>, working with databases and
          cloud services. Over the course of the internship, he learned how to
          manage projects and software on a large scale, with a great emphasis
          on communication and collaboration.
          <br />
          <br />
          His primary project was a full-stack module with a
          chatbot to fetch and analyze user data from natural language. He was
          the
          <strong> lead developer</strong> on a team of three, developing an 
          efficient AI inference pipeline to achieve their project
          objective within a strict compute budget. Concluding the internship, they pitched the idea to the team of
          <strong> 50+ engineers from 8+ time zones</strong>. During the course
          of the internship, he also earned a certification as an
          <em>
            {" "}
            [OCI Gen AI
            Professional](https://www.linkedin.com/in/aneesh6214/overlay/1718754842103/single-media-viewer/?profileId=ACoAAEAq4kQBGCRNPnthzAkHVfXIZHHy40dMA8Y)
          </em>{" "}
          (and a few more on cloud infrastructure), expanding on his technical
          knowledge.
        </>
      ),
      technologies:
        "Python, GraphQL, FastAPI, TypeScript/JavaScript, React, OCI, Docker, Oracle Database",
      image: {
        src: "/oracle-logo.png",
        alt: "Oracle software development",
        caption: "Cloud Platform & Applications",
        position: ImagePosition.RIGHT,
      },
    },
  ],
};
