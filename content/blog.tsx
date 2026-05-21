import { JSONContent } from "@/lib/json-content";
import { aneeshKumarInfobox } from "./profile-infobox";

export const blogContent: JSONContent = {
  title: "Ask Me Anything",
  subtitle: "Anonymous questions and published answers",
  description: "Anonymous questions and published answers",
  url: "/blog",
  infobox: aneeshKumarInfobox,
  infoboxTitle: "Aneesh Kumar",
  sections: [
    {
      id: "ask-a-question",
      title: "Ask a Question",
      description:
        "Anonymous question submission for topics related to this site.",
    },
    {
      id: "answered-questions",
      title: "Answered Questions",
      description:
        "Published question and answer archive sorted by recency.",
    },
  ],
};
