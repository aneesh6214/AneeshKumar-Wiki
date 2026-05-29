import type { JSONContent, RoleFocusItem } from "@/lib/json-content";
import { aneeshKumarInfobox } from "./profile-infobox";

const overviewDescription = [
  "Aneesh Kumar is a [computer scientist](https://en.wikipedia.org/wiki/Computer_scientist) whose engineering work centers around platform systems, [agentic](https://en.wikipedia.org/wiki/AI_agent) infrastructure, and applied [artificial intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence) interfaces. Professionally, he is a platform engineer at [Quantifind](https://quantifind.com), building infrastructure for high-scale AI [inference](https://en.wikipedia.org/wiki/Inference) and [DataOps](https://en.wikipedia.org/wiki/DataOps). His independent work includes software projects developed through both [agentic engineering](https://en.wikipedia.org/wiki/AI-assisted_software_development) workflows and hand-written code. Kumar approaches agentic engineering as its own subdiscipline, focusing on effective agent use while maintaining code quality, and without accumulating [cognitive debt](https://arxiv.org/abs/2603.22106).",
  "Outside of his engineering work, Kumar pursues early-stage artificial intelligence research focused on internal model behavior and [knowledge representations](https://en.wikipedia.org/wiki/Knowledge_representation_and_reasoning). His interest in [mechanistic interpretability](https://en.wikipedia.org/wiki/Mechanistic_interpretability) is motivated by broader questions about [emergence](https://en.wikipedia.org/wiki/Emergence), [human cognition](https://en.wikipedia.org/wiki/Cognition), and the [mind](https://en.wikipedia.org/wiki/Mind), which he explores through the lens of artificial systems. He complements this work with his [YouTube channel](https://www.youtube.com/@Aneesh6214), where he teaches AI from [first principles](https://en.wikipedia.org/wiki/First_principle) and presents technical knowledge as a process of discovery.",
].join("\n\n");

const homeRoleFocusItems: RoleFocusItem[] = [
  {
    role: "Engineering",
    statement: "Platform systems, agentic infrastructure, and AI applications.",
    seeAlso: { href: "/projects", label: "Projects" },
  },
  {
    role: "Research",
    statement: "Model behavior, representation, and interpretability.",
    seeAlso: { href: "/career#publications", label: "Publications" },
  },
  {
    role: "Education",
    statement:
      "AI from first principles, taught so learning feels like discovery.",
    seeAlso: { href: "/media", label: "Media" },
  },
];

export const homeContent: JSONContent = {
  title: "Aneesh Kumar",
  url: "/",
  disambiguation:
    "This article is about the software engineer. For questions and answers, see [Aneesh Kumar (Ask Me Anything)](/ama). ",
  infobox: aneeshKumarInfobox,
  infoboxTitle: "Aneesh Kumar",
  sections: [
    {
      title: "Overview",
      description: overviewDescription,
    },
    {
      title: "",
      variant: "home-role-focus",
      hideFromArticleNav: true,
      roleFocusItems: homeRoleFocusItems,
    },
    {
      title: "",
      variant: "home-activity-grid",
      hideFromArticleNav: true,
    },
  ],
};
