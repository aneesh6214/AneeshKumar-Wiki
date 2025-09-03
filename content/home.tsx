import React from "react";
import { JSONContent } from "@/lib/json-content";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";

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
          <strong>Aneesh Kumar</strong> is an AI researcher and engineer whose
          work spans independent research, interpretability, and agent design.
          His projects range from studying [emergent
          behaviors](https://en.wikipedia.org/wiki/Emergent_behavior) in [large
          language models](https://en.wikipedia.org/wiki/Large_language_model)
          and theoretical questions about intelligence to building practical
          systems in computer science and engineering. He is especially
          interested in the intersection of
          [philosophy](https://en.wikipedia.org/wiki/Philosophy_of_artificial_intelligence)
          and AI, exploring how ideas about reasoning, memory, and learning can
          inform the design of artificial systems.
          <br />
          <br />
          He is the founder and president of the [Artificial Intelligence
          Club](https://ai-at-sfsu.vercel.app/home) at{" "}
          <strong>San Francisco State University</strong>, where he leads
          initiatives to engage students with machine learning, symbolic AI, and
          agent systems. Alongside his academic pursuits, Aneesh is a{" "}
          <strong>Platform Engineering Intern</strong> at
          [Quantifind](https://quantifind.com), where he contributes to the
          scalable infrastructure that supports AI-driven solutions.
        </>
      ),
    },
    {
      title: "",
      description: (
        <>
          <SpotifyNowPlaying />
        </>
      ),
    },
  ],
};
