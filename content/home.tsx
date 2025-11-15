import React from "react";
import { JSONContent } from "@/lib/json-content";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import YouTubeLatestVideo from "@/components/YouTubeLatestVideo";

export const homeContent: JSONContent = {
  title: "Aneesh Kumar",
  subtitle: "Software Engineer",
  description: "Personal knowledge base and portfolio",
  url: "/",
  disambiguation:
    "This article is about the software engineer. For his technical blog, see [Aneesh Kumar (blog)](/blog). ",
  infobox: {
    image: "/profile-photo.jpg",
    imageCaption: "Aneesh Kumar in 2025",
    fields: [
      {
        label: "Born",
        value:
          "Aneesh Kumar\nJune 21, 2004 (age 21)\nSan Francisco, California, U.S.",
      },
      { label: "Location", value: "San Francisco Bay Area" },
      {
        label: "Position",
        value: "SWE Intern at [Quantifind](https://www.quantifind.com/)",
      },
      { label: "University", value: "San Francisco State University" },
    ],
  },
  sections: [
    {
      title: "Overview",
      description: (
        <>
          Aneesh Kumar is a San Francisco based computer scientist and platform engineer at{" "}
          [Quantifind](https://quantifind.com), developing infrastructure for high-scale{" "}
          [Artificial Intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence) inference and data operations.
          He also pursues early-stage research in artificial intelligence, with early research on emergent{" "}
          behaviors led to a paper and poster presentation at the [AAAI](https://en.wikipedia.org/wiki/AAAI_Conference_on_Artificial_Intelligence) [XAI4Science Workshop](https://xai4science.github.io/).
          He also works on independent software and AI projects, developing both practical systems
          to conceptual experiments.
          <br />
          <br />
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
          <div className="space-y-4">
            <SpotifyNowPlaying />
            <YouTubeLatestVideo />
          </div>
        </>
      ),
    },
  ],
};
