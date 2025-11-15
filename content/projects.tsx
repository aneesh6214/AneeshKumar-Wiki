import React from "react";
import { JSONContent, ImagePosition } from "@/lib/json-content";

export const projectsContent: JSONContent = {
  title: "Projects",
  subtitle: "Portfolio and Work",
  description: "Collection of personal and professional projects",
  url: "/projects",
  disambiguation: "This article covers the personal projects of Aneesh Kumar.",
  sections: [
    {
      title: "AI Paper Review Website",
      websiteUrl: "https://www.mypapergrader.com/",
      githubUrl: "https://github.com/aneesh6214/Paper-Reviewer",
      image: {
        src: "/mypapergrader.png",
        alt: "mypapergrader",
        caption:
          "Home Page",
        position: ImagePosition.RIGHT,
      },
      description: (
        <>
          <>
  <strong>PaperGrader</strong> is a web application that aims to provide 
  automated academic paper reviews using 
  [large language models](https://en.wikipedia.org/wiki/Large_language_model). 
  The platform allows users to upload research papers, which are then processed through 
  multiple model inference steps to generate structured feedback and formatting assistance. 
  The system leverages an expert reviewing model, 
 [Llama-OpenReviewer-8B](https://arxiv.org/abs/2412.11948), to produce evaluations resembling those from peer reviewers. 
  The application is currently under development and is collecting email sign-ups from interested 
  users for future updates and early access.
</>

        </>
      ),
    },
    {
      title: "The Emergent Machine",
      githubUrl: "https://github.com/aneesh6214/The-Emergent-Machine",
      image: {
        src: "/emergent-machine-preview.png",
        alt: "The Emergent Machine project preview showing AI agent interactions",
        caption:
          "Exploring the Emergence of Identity in LLM-based Agents",
        position: ImagePosition.LEFT,
      },
      description: (
        <>
          This project explores the emergence of structured identity in [large
          language models](https://en.wikipedia.org/wiki/Large_language_model),
          developed through persistent memory and ongoing human interaction. An
          AI agent was deployed on [Twitter](https://twitter.com) to interact in
          real time, providing a live experiment in how an artificial identity
          can cohere through continuous engagement with people online.
          <br />
          <br />
          The system involves a multi-phase agent
          combining real-time perception with long-term memory to maintain
          continuity and internal reasoning. It was built using
          [Mixtral-7B-Instruct](https://mistral.ai/news/mixtral-of-experts/) and
          [LangChain](https://www.langchain.com/), with an architecture designed
          to track experiences, reflect, and adapt over time. This work
          highlights how identity in AI systems can emerge not only from
          internal mechanisms but also from external, social contexts.
          <br />
          <br />
          Kumar notes his primary purpose was not realistic or humanlike capability, but to observe
          how with minimal machinery, behaviors like identity, preference, and self-reference can emerge. 
          It was an experiment involving AI technologies as well as exploring Theory of Mind.
        </>
      ),
    },
    {
      title: "Browser Automation Tools w/MCP",
      githubUrl: "https://github.com/aneesh6214/Browser-MCP-Automation",
      description: (
        <>
          Aneesh developed tools for the [Model Context Protocol
          (MCP)](https://modelcontextprotocol.io/) to allow the
          Dex AI agent software to interact with a
          browser in real time. By exposing tools through a custom
          [FastMCP](https://pypi.org/project/fastmcp/) server built in Python,
          the agent could communicate via WebSockets and perform actions
          dynamically.
          <br />
          <br />
          This system enabled Dex to go beyond static reasoning by engaging
          directly with the web environment—navigating pages, clicking, and
          retrieving information as part of its reasoning process. It
          demonstrated how MCP tooling can extend AI agents into richer,
          interactive workflows.
        </>
      ),
    },
    {
      title: "League of Legends Machine Learning Model",
      githubUrl: "https://github.com/aneesh6214/lol-game-predicter",
      description: (
        <>
          Aneesh built a supervised deep learning model to predict win/loss
          outcomes in [League of
          Legends](https://en.wikipedia.org/wiki/League_of_Legends) based on
          match statistics and historical gameplay data. Using
          [TensorFlow](https://www.tensorflow.org/), the model was trained on a
          dataset of more than 500,000 matches and achieved 87% accuracy on
          held-out test data.
          <br />
          <br />
          The project involved preprocessing structured match data, designing a
          neural network architecture for binary classification, and tuning
          hyperparameters for performance. It highlighted the predictive
          potential of gameplay statistics and provided insight into how machine
          learning can model competitive dynamics in esports.
        </>
      ),
    },
    {
      title: "SoFreakingCratic",
      githubUrl: "https://github.com/aneesh6214",
      description: (
        <>
          SoFreakingCratic is an experiment comparing different memory systems
          in [multi-agent
          systems](https://en.wikipedia.org/wiki/Multi-agent_system). The
          project implemented and tested a range of memory types, including
          episodic, semantic, procedural, working, and distributed memory.
          <br />
          <br />
          By running controlled comparisons, the project explored how each
          memory system affects an agent’s ability to collaborate, reason, and
          adapt over time. While conceptual in focus, the work demonstrates how
          varying architectures can produce distinct behaviors in multi-agent
          frameworks.
        </>
      ),
    },
    {
      title: "WheelScore",
      githubUrl: "https://github.com/aneesh6214",
      description: (
        <>
          WheelScore introduces a new metric for [urban
          planning](https://en.wikipedia.org/wiki/Urban_planning), designed to
          evaluate 3D environments in terms of [wheelchair
          accessibility](https://en.wikipedia.org/wiki/Wheelchair_accessibility).
          The system analyzes simulated architectural spaces and assigns scores
          that reflect ease of navigation for wheelchair users.
          <br />
          <br />
          The project highlights accessibility as a measurable and technical
          design factor, providing a framework that could assist planners,
          architects, and engineers in ensuring equitable mobility within built
          environments.
        </>
      ),
    },
  ],
};
