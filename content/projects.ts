import { ContentType, JSONContent, ImagePosition } from '@/lib/json-content'

export const projectsContent: JSONContent = {
  title: "Projects",
  subtitle: "Portfolio and Work",
  description: "Collection of personal and professional projects",
  url: "/projects",
  sections: [
    {
      title: "The Emergent Machine",
      image: {
        src: "/emergent-machine-preview.png",
        alt: "The Emergent Machine project preview showing AI agent interactions",
        caption: "Real-time AI agent identity emergence through Twitter interactions",
        position: ImagePosition.RIGHT
      },
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "This project explores the emergence of high-level structured identity in LLMs, coming about through persistent memory and human interaction. An AI agent was put on twitter to interact in real-time, exploring the convergence of the AI agent towards a cohesive identity."
        },
        {
          type: ContentType.PARAGRAPH,
          text: "More technically, this is a multi-phase LLM agent with real-time perception and long term memory, maintaining continuity and internal reasoning. This was built primarily using Mixtral-7B-Instruct and LangChain."
        },
        {
          type: ContentType.LINK,
          url: "https://github.com/aneesh6214/The-Emergent-Machine",
          linkText: "View on GitHub",
          linkType: "github"
        }
      ]
    },
    {
      title: "Browser Automation Tools w/MCP",
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "Aneesh built out MCP tools to enable the Dex AI agent software to interact with the browser in real time. The agent interacted with the web through websockets and called tools via an exposed MCP server developed using FastMCP with Python."
        },
        {
          type: ContentType.LINK,
          url: "https://github.com/aneesh6214/Browser-MCP-Automation",
          linkText: "View on GitHub",
          linkType: "github"
        }
      ]
    },
    {
      title: "League of Legends Match Outcome Predictor",
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "Aneesh built a supervised deep learning model to predict win/loss outcomes from League of Legends match statistics and historical data. The model achieved 82% accuracy, trained using tensorflow on a dataset of over 200,000 matches."
        },
        {
          type: ContentType.LINK,
          url: "https://github.com/aneesh6214/lol-game-predicter",
          linkText: "View on GitHub",
          linkType: "github"
        }
      ]
    },
    {
      title: "SoFreakingCratic",
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "SoFreakingCratic is a comparative experiment of different types of memory systems for multi-agent systems. Memory systems explored include: Episodc memory, Semantic memory, Procedural memory, Working memory, and Distributed memory."
        },
        {
          type: ContentType.LINK,
          url: "https://github.com/aneesh6214",
          linkText: "View on GitHub",
          linkType: "github"
        }
      ]
    },
    {
      title: "WheelScore",
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "Aneesh introduces a new metric for urban plannning, scoring 3d environments based on wheelchair accessibility."
        },
        {
          type: ContentType.LINK,
          url: "https://github.com/aneesh6214",
          linkText: "View on GitHub",
          linkType: "github"
        }
      ]
    },
  ]
}