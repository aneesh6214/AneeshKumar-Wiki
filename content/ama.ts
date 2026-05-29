import type { JSONContent } from "@/lib/json-content";
import { aneeshKumarInfobox } from "./profile-infobox";

export const amaPageCopy = {
  questionPlaceholder: "Ask a question",
  submitLabel: "Ask a question",
  anonymousNotice:
    "Questions are submitted anonymously. Only questions that receive a response are published here.",
  submittedMessage: "Question submitted.",
  errors: {
    empty: "Please enter a question before submitting.",
    tooLong: "Please keep the question under 1000 characters.",
    unavailable: "Question submission is temporarily unavailable.",
  },
  archiveUnavailable: "The answered question archive is temporarily unavailable.",
  emptyArchive: "No answered questions have been published yet.",
  answeredFallbackTitle: "Answered Questions",
};

export const amaContent: JSONContent = {
  title: "Ask Me Anything",
  url: "/ama",
  disambiguation:
    "This article is for anonymous questions and published answers. For general information about Aneesh Kumar, see [Aneesh Kumar](/).",
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
