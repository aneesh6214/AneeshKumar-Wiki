import React from "react";
import { ImagePosition, JSONContent } from "@/lib/json-content";

export const researchContent: JSONContent = {
  title: "Research Work",
  subtitle: "Academic Research and Publications",
  description: "Research contributions and academic work",
  url: "/research",
  disambiguation:
    "This article covers the research work of [Aneesh Kumar](/). For his industry experience, see [Aneesh Kumar (Industry Work)](/industry-work).",
  sections: [
    {
      title: "Paper: Predicting Emergent Capabilities Using Sparse Features",
      date: "Fall 2025",
      description: (
        <>
          Aneesh Kumar co-authored <em>Exploring Sparse Feature Topology as a Predictor for Emergence</em>,
          a paper accepted to the [AAAI XAI4Science 2026 Workshop](https://xai4science.github.io/), now
          publicly available on [OpenReview](https://openreview.net/forum?id=12xpM8a6YK&noteId=12xpM8a6YK). The study investigates whether
          “emergent” capabilities in
          [transformer-based models](https://en.wikipedia.org/wiki/Transformer_(machine_learning_model))
          can be predicted before they occur by analyzing internal representations rather than
          measuring them post hoc.
          <br />
          <br />
          The authors train sparse autoencoders on model activations at each checkpoint of a
          two-layer transformer trained on a modular addition task, constructing co-activation
          graphs to track metrics such as density, clustering, and modularity. Across eight
          initialization seeds, they test for lead–lag correlations between graph-metric changes
          and subsequent accuracy shifts. The results find no statistically significant predictive
          relationship, suggesting that global topological measures of sparse features do not
          forecast emergent behavior and that potential pre-hoc indicators may reside in finer-grained,
          task-specific network structures.
        </>

      ),
      image: {
        src: "/predicting_emergence.png",
        alt: "Sparse feature visualization",
        caption: "SAE-based Graphs for Emergence Prediction",
        position: ImagePosition.RIGHT,
        link: "https://drive.google.com/file/d/125hRUSI4SOv8I-OLyzysT12cKY8yUay2/view?usp=sharing",
      },
    },
    {
      title:
        "Report: Biological Timescale Synaptic Plasticity",
        date: "Spring 2025",
      description: (
        <>
          Aneesh Kumar authored a comprehensive review of{" "}
          [Behavioral Time-Scale Synaptic Plasticity] (https://www.nature.com/articles/s41467-024-55563-6) (BTSP), a
          neural mechanism that enables memory formation over multi-second
          intervals, authored by Yujie Wu and Wolfgang Maass (2025). His work provides a clear overview of BTSP’s biological
          foundations in the
          [hippocampus](https://en.wikipedia.org/wiki/Hippocampus), explaining
          how plateau potentials in [CA1 pyramidal
          neurons](https://en.wikipedia.org/wiki/Pyramidal_cell) gate windows of
          plasticity that allow temporally scattered activity to be linked. The
          writeup details how this mechanism differs from conventional learning
          rules such as [Hebbian
          learning](https://en.wikipedia.org/wiki/Hebbian_theory) and
          [STDP](https://en.wikipedia.org/wiki/Spike-timing-dependent_plasticity),
          highlighting its role in addressing the problem of temporal credit
          assignment.
          <br />
          <br />
          Beyond biological mechanisms, Kumar extends the discussion into
          computational and applied domains. He reproduces a computational model
          of BTSP using binary weights and stochastic update rules,
          demonstrating how the system achieves one-shot, content-addressable
          memory formation. The analysis further explores how BTSP could inform
          the design of [foundation
          models](https://en.wikipedia.org/wiki/Foundation_model) and
          [memory-augmented AI
          systems](https://en.wikipedia.org/wiki/Memory-augmented_neural_networks),
          proposing that BTSP-inspired architectures could enable more
          biologically plausible, context-sensitive forms of rapid learning.
          This dual perspective—bridging neuroscience and artificial
          intelligence—positions the work as both an explanatory resource and a
          forward-looking exploration of BTSP’s implications for computational
          models of learning.
        </>
      ),
      image: {
        src: "/btsp-preview.png",
        alt: "BTSP writeup preview",
        caption: "Report: Biological Timescale Synaptic Plasticity",
        position: ImagePosition.LEFT,
        link: "https://drive.google.com/file/d/1dOQOKhdXwFE195OMDPaQB8ppldkzHcSZ/view",
      },
    },
  ],
};
