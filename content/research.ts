import { ContentType, ImagePosition, JSONContent } from '@/lib/json-content'

export const researchContent: JSONContent = {
  title: "Research Work",
  subtitle: "Academic Research and Publications",
  description: "Research contributions and academic work",
  url: "/research",
  disambiguation: "This article covers the research work of [Aneesh Kumar](/). For his industry experience, see [Aneesh Kumar (Industry Work)](/industry-work).",
  sections: [
    {
      title: "Predicting Emergent Capabilities Using Sparse Features",
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "Research on understanding and predicting emergent capabilities in machine learning models through sparse feature analysis and interpretability techniques. This is Aneesh's current work. It is in the experimentation phase."
        }
      ],
      image: {
        src: "/Algoverse-paper.png",
        alt: "Sparse feature visualization",
        caption: "Feature analysis and model interpretation",
        position: ImagePosition.RIGHT
      }
    },
    {
      title: "Biological Timescale Synaptic Plasticity (BTSP) Independent Research",
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: "Comprehensive analysis of biological timescale synaptic plasticity (BTSP) mechanisms and their implications for neural computation and learning. This covers what BTSP is, how it works mechanistically, a computational model of BTSP, and potential integrations with foundation models. "
        }
      ],
      image: {
        src: "/btsp-preview.png",
        alt: "BTSP writeup preview",
        caption: "BTSP Writeup",
        position: ImagePosition.LEFT,
        link: "https://drive.google.com/file/d/1dOQOKhdXwFE195OMDPaQB8ppldkzHcSZ/view"
      }
    }
  ]
}