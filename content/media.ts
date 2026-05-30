import { ImagePosition, type JSONContent } from "@/lib/json-content";
import { aneeshKumarInfobox } from "./profile-infobox";

const SLIDES_ROOT = "/images/media/slides";
const VIDEO_THUMBNAILS_ROOT = "/images/media/youtube";

export interface MediaDeck {
  description: string;
  id: string;
  slides: string[];
  title: string;
}

export interface MediaVideo {
  description: string;
  id: string;
  thumbnail: string;
  title: string;
  url: string;
}

export interface MediaShowcaseContent {
  decks: MediaDeck[];
  videos: MediaVideo[];
}

export const mediaShowcaseContent: MediaShowcaseContent = {
  decks: [
    {
      id: "can-machines-think",
      title: "Can Machines Think?",
      description:
        "A lecture on machine understanding through John Searle's Chinese Room, with attention to syntax, semantics, language models, and apparent understanding.",
      slides: [
        `${SLIDES_ROOT}/can-machines-think/slide-01.svg`,
        `${SLIDES_ROOT}/can-machines-think/slide-02.svg`,
        `${SLIDES_ROOT}/can-machines-think/slide-03.svg`,
        `${SLIDES_ROOT}/can-machines-think/slide-04.svg`,
        `${SLIDES_ROOT}/can-machines-think/slide-05.svg`,
        `${SLIDES_ROOT}/can-machines-think/slide-06.svg`,
      ],
    },
    {
      id: "classical-ai",
      title: "Classical AI",
      description:
        "A lecture on symbolic AI, rational agents, state representations, actions, goals, rewards, and rule-based reasoning, illustrated through game-playing agents.",
      slides: [
        `${SLIDES_ROOT}/classical-ai/slide-01.svg`,
        `${SLIDES_ROOT}/classical-ai/slide-02.svg`,
        `${SLIDES_ROOT}/classical-ai/slide-03.svg`,
      ],
    },
    {
      id: "platonic-representation-hypothesis",
      title: "Platonic Representation Hypothesis",
      description:
        "A lecture on convergent representations in AI systems, connecting Plato's Theory of Forms, world modeling, latent spaces, and objective structure.",
      slides: [
        `${SLIDES_ROOT}/platonic-representation-hypothesis/slide-01.svg`,
        `${SLIDES_ROOT}/platonic-representation-hypothesis/slide-02.svg`,
        `${SLIDES_ROOT}/platonic-representation-hypothesis/slide-03.svg`,
        `${SLIDES_ROOT}/platonic-representation-hypothesis/slide-04.svg`,
        `${SLIDES_ROOT}/platonic-representation-hypothesis/slide-05.svg`,
        `${SLIDES_ROOT}/platonic-representation-hypothesis/slide-06.svg`,
      ],
    },
    {
      id: "aa-omniscience",
      title: "AA-Omniscience",
      description:
        "A paper presentation on factual recall and knowledge reliability in language models, covering AA-Omniscience, grading methods, results, and benchmark limitations.",
      slides: [
        `${SLIDES_ROOT}/aa-omniscience/slide-01.svg`,
        `${SLIDES_ROOT}/aa-omniscience/slide-02.svg`,
        `${SLIDES_ROOT}/aa-omniscience/slide-03.svg`,
        `${SLIDES_ROOT}/aa-omniscience/slide-04.svg`,
        `${SLIDES_ROOT}/aa-omniscience/slide-05.svg`,
        `${SLIDES_ROOT}/aa-omniscience/slide-06.svg`,
        `${SLIDES_ROOT}/aa-omniscience/slide-07.svg`,
        `${SLIDES_ROOT}/aa-omniscience/slide-08.svg`,
        `${SLIDES_ROOT}/aa-omniscience/slide-09.svg`,
      ],
    },
    {
      id: "chain-of-thought",
      title: "Chain-of-Thought",
      description:
        "A research presentation on chain-of-thought prompting, reasoning traces, model mechanisms, and variants including self-consistency, tree-of-thoughts, and reinforcement learning.",
      slides: [
        `${SLIDES_ROOT}/chain-of-thought/slide-01.svg`,
        `${SLIDES_ROOT}/chain-of-thought/slide-02.svg`,
        `${SLIDES_ROOT}/chain-of-thought/slide-03.svg`,
        `${SLIDES_ROOT}/chain-of-thought/slide-04.svg`,
        `${SLIDES_ROOT}/chain-of-thought/slide-05.svg`,
        `${SLIDES_ROOT}/chain-of-thought/slide-06.svg`,
      ],
    },
  ],
  videos: [
    {
      id: "hopfield-networks-1982",
      title: "Hopfield Networks (1982)",
      description: [
        "Episode 1 covers John Hopfield's 1982 paper \"Neural Networks and Physical Systems with Emergent Collective Computational Abilities.\"",
        "The series begins with Hopfield, rather than earlier neural models such as the perceptron, because its focus is AI architecture rather than learning algorithms.",
        "Hopfield presents a rigorous account of neural networks as dynamical systems, framing neural computation as an emergent property of a network's structure and dynamics.",
      ].join(" "),
      thumbnail: `${VIDEO_THUMBNAILS_ROOT}/ai-arch-1.png`,
      url: "https://www.youtube.com/watch?v=ykqiq_UrOjQ",
    },
    {
      id: "parallel-distributed-processing-1986",
      title: "Parallel Distributed Processing (1986)",
      description: [
        "Episode 2 covers the PDP research group's 1986 work \"Parallel Distributed Processing: Explorations in the Microstructure of Cognition.\"",
        "Following Hopfield, PDP represents a major chronological and conceptual development in AI architecture.",
        "It introduces distributed representations, which became an important conceptual foundation for later developments in deep learning.",
      ].join(" "),
      thumbnail: `${VIDEO_THUMBNAILS_ROOT}/ai-arch-2.png`,
      url: "https://www.youtube.com/watch?v=x--1xo51MEw",
    },
    {
      id: "long-short-term-memory-1997",
      title: "Long Short-Term Memory (1997)",
      description: [
        "Episode 3 covers the 1997 paper \"Long Short-Term Memory\" by Sepp Hochreiter and Jurgen Schmidhuber.",
        "The episode follows PDP because it addresses a limitation of distributed representations alone: learned representations are more useful when they can be preserved and related over time.",
        "LSTMs introduce a mechanism for maintaining and updating information across sequences.",
      ].join(" "),
      thumbnail: `${VIDEO_THUMBNAILS_ROOT}/ai-arch-3.png`,
      url: "https://www.youtube.com/watch?v=mzgLy4PWOCM",
    },
    {
      id: "modern-ai-paradigm-2003-2014",
      title: "Establishing the Modern AI Paradigm (2003 & 2014)",
      description: [
        "Episode 4 covers neural language modeling and sequence-to-sequence learning, moving from Bengio et al.'s 2003 paper \"A Neural Probabilistic Language Model\" to Sutskever et al.'s 2014 paper \"Sequence to Sequence Learning with Neural Networks.\"",
        "Episodes 1-3 covered representation and memory: PDP showed how concepts can be learned as distributed representations, while LSTMs showed how these representations can persist through time.",
        "Bengio et al.'s work applies these ideas to language through neural next-token prediction, helping establish a central paradigm in modern AI.",
        "Sutskever et al.'s seq2seq model extends this paradigm to more complex sequence tasks such as translation and summarization.",
      ].join(" "),
      thumbnail: `${VIDEO_THUMBNAILS_ROOT}/ai-arch-4.png`,
      url: "https://www.youtube.com/watch?v=gIJ78osmby0",
    },
  ],
};

export const mediaContent: JSONContent = {
  title: "Media",
  url: "/media",
  disambiguation:
    "This article covers lectures and educational media by [Aneesh Kumar](/). For technical projects, see [Projects](/projects).",
  infobox: aneeshKumarInfobox,
  infoboxTitle: "Aneesh Kumar",
  sections: [
    {
      title: "AI Club Lectures",
      date: "Slide series",
      description:
        "A collection of lecture and presentation decks on artificial intelligence, symbolic reasoning, model behavior, and AI systems.",
      technologies: "Artificial Intelligence, Slides, Student Teaching",
      image: {
        src: mediaShowcaseContent.decks[0].slides[0],
        alt: "Title slide from Can Machines Think",
        caption: "AI Club slide deck preview",
        position: ImagePosition.RIGHT,
      },
    },
    {
      title: "AI Architecture Series",
      date: "YouTube series",
      description:
        "A YouTube series presenting major AI architecture papers through historical and conceptual progression.",
      technologies: "AI Architecture, YouTube, Technical Communication",
      websiteUrl: "https://www.youtube.com/@Aneesh6214",
      image: {
        src: mediaShowcaseContent.videos[0].thumbnail,
        alt: "Thumbnail for Hopfield Networks episode",
        caption: "AI Architecture Series preview",
        position: ImagePosition.RIGHT,
      },
    },
  ],
};
