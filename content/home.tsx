import React from "react";
import { JSONContent } from "@/lib/json-content";
import HomeActivityGrid from "@/components/HomeActivityGrid";
import HomeWorkSummary from "@/components/HomeWorkSummary";
import { aneeshKumarInfobox } from "./profile-infobox";

export const homeContent: JSONContent = {
  title: "Aneesh Kumar",
  subtitle: "Software Engineer",
  description: "Personal knowledge base and portfolio",
  url: "/",
  disambiguation:
    "This article is about the software engineer. For questions and answers, see [Aneesh Kumar (Ask Me Anything)](/blog). ",
  infobox: aneeshKumarInfobox,
  infoboxTitle: "Aneesh Kumar",
  sections: [
    {
      title: "Overview",
      description: (
        <>
          Aneesh Kumar is a San Francisco based computer scientist and platform engineer at{" "}
          [Quantifind](https://quantifind.com), developing infrastructure for high-scale{" "}
          [Artificial Intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence) inference and data operations.
          He also pursues early-stage research in artificial intelligence, with early research on emergent{" "}
          behaviors presented at the 2026 [AAAI](https://en.wikipedia.org/wiki/AAAI_Conference_on_Artificial_Intelligence) [XAI4Science Workshop](https://xai4science.github.io/).
          He also works on independent software and AI projects, developing both practical systems
          to conceptual experiments.
          <HomeWorkSummary />
        </>

      ),
    },
    {
      title: "Personal Life",
      description: (
        <>
          Outside of professional work, Kumar founded and serves as president of the{" "}
          [Artificial Intelligence Club](https://ai-at-sfsu.vercel.app/home) at{" "}
          [San Francisco State University](https://www.sfsu.edu),
          organizing weekly meetings and discussions on foundational and emerging AI topics.
          He also creates educational YouTube videos introducing core ideas in artificial intelligence.
          He maintains a broader personal interest in how AI systems reason, represent information,
          and relate to human cognition and broader [Theory of mind](https://en.wikipedia.org/wiki/Theory_of_mind).
        </>

      ),
    },
    {
      title: "",
      description: (
        <>
          <HomeActivityGrid />
        </>
      ),
    },
  ],
};
