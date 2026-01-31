import React from "react";
import { BlogPost } from "@/lib/blog-content";
import { Subtitle } from "@/components/BlogPostContent";

export const manifestoPost: BlogPost = {
  slug: "manifesto",
  title: "Manifesto",
  date: "January 16, 2026",
  topics: ["Philosophy", "AI", "Opinion"],
  searchableContent: `
    Manifesto
    Institutional incentives increasingly frame AI as a mere product category, ignoring the larger significance: we have built systems that test which claims about intelligence survive contact with reality.
    We borrow from organic minds to build artificial ones, and use artificial minds to illuminate the organic. This is where engineering must answer to philosophy: building AI forces us to operationalize decisions about what to optimize, how to measure it, and what counts as 'understanding'. Even if you reject the language of the mind entirely: you still cannot build a system without committing to criteria of success.
    These criteria manifest in design. Architectures privilege certain representational forms. Training policies privilege certain learning dynamics. Benchmarks and rewards define what competency matters. Philosophy makes these commitments explicit– and AI becomes more than engineering. Each system illustrates which assumptions are sufficient for which kinds of behavior, and which are not. Treating AI as a product category discards this epistemic weight. Building AI can refine our theories of cognition, pushing us to a more honest account of minds, and our place among them.
    Supplemental Meta-Manifesto
    This manifesto uses slightly metaphorical language to communicate a broader sentiment largely absent from the mainstream AI space (as of late 2026).
    Scope
    I do not aim to make any claims about intelligence. I aim to illustrate how building an AI system forces operational definitions (objectives, metrics, reward schemes) of philosophically complex concepts.
    I am not saying that AI systems will settle grand philosophical questions. Rather, AI systems can empirically stress-test these operational definitions by showing what kinds of behavior result from such definitions.
    I am not saying that AI systems provide universal evidence of effective intelligence. A model's success is evidence about sufficiency under constraints. Results are entangled with the empirics of the engineering; conclusions are bound by these empirics.
    Why Philosophy is Non-Optional
    AI work is saturated with conceptual choices impossible to justify with pure code. Empirical behavior alone cannot determine a conclusion about intelligence, and the gap is philosophical. The same external behavior can support competing explanations (memorization v.s. abstraction, poor heuristics v.s. robust competence). Finding out "it works" can support theories, but never uniquely determine one.
    What Integrating Philosophy Actually Means
    When I emphasize the importance of philosophy, I do not necessitate a commitment to a worldview. Instead, it means to justify design choices philosophically.
    Make the bridge between behavior and capacity explicit. Why does performance mean a model "understands" or "reasons"? Don't get bitten by underdetermination. Separate engineering sufficiency from explanatory sufficiency.
    When benchmarking a model, don't simply report metrics. Argue the metric's construct validity for the target concept. Distinguish semantic success from behavioral success.
    Justify the authority of your system's objective. Why could this objective lead to an intelligent system? Why is the objective an appropriate proxy for higher level capacity?
    What to Take from the Manifesto
    When we build systems that we aim to be intelligent, we make philosophical commitments about what intelligence is. We must approach this engineering with epistemic humility, and justify this engineering philosophically–all so we can discuss openly, design clearly, and progress further.
  `,
  sections: [
    {
      title: "Manifesto",
      content: (
        <>
          <p>
            Institutional incentives increasingly frame AI as a mere product
            category, ignoring the larger significance: we have built systems
            that test which claims about intelligence survive contact with
            reality.
          </p>
          <p>
            <strong>
              We borrow from organic minds to build artificial ones, and use
              artificial minds to illuminate the organic.
            </strong>{" "}
            This is where engineering must answer to philosophy: building AI
            forces us to operationalize decisions about what to optimize, how to
            measure it, and{" "}
            [what counts as 'understanding'](https://en.wikipedia.org/wiki/Philosophy_of_artificial_intelligence).
            Even if you reject the language of the <em>mind</em> entirely: you
            still cannot build a system without committing to criteria of
            success.
          </p>
          <p>
            These criteria manifest in design. Architectures privilege certain
            representational forms. Training policies privilege certain learning
            dynamics. Benchmarks and rewards define what competency matters.
            Philosophy makes these commitments explicit– and AI becomes more
            than engineering. Each system illustrates which assumptions are
            sufficient for which kinds of behavior, and which are not. Treating
            AI as a product category discards this epistemic weight.{" "}
            <span className="underline">
              Building AI can refine our theories of cognition, pushing us to a
              more honest account of minds, and our place among them.
            </span>
          </p>
        </>
      ),
    },
    {
      title: "Supplemental (Meta-Manifesto)",
      content: (
        <>
          <p>
            This manifesto uses slightly metaphorical language to communicate a
            broader sentiment largely absent from the mainstream AI space (as of
            late 2025).
          </p>
          <Subtitle>Scope</Subtitle>
          <p>
            I do not aim to make any claims about intelligence. I aim to
            illustrate how building an AI system forces{" "}
            <strong>operational definitions</strong> (objectives, metrics,
            reward schemes) of <strong>philosophically complex</strong>{" "}
            concepts.
          </p>
          <p>
            I am not saying that AI systems will settle grand philosophical
            questions. Rather, AI systems can empirically stress-test these
            operational definitions by showing what kinds of behavior result
            from such definitions.
          </p>
          <p>
            I am not saying that AI systems provide universal evidence of
            effective intelligence. A model's success is evidence about
            sufficiency under constraints. Results are entangled with the
            empirics of the engineering; conclusions are bound by these
            empirics.
          </p>
          <Subtitle>Why Philosophy is Non-Optional</Subtitle>
          <p>
            AI work is saturated with conceptual choices impossible to justify
            with pure code. Empirical behavior alone cannot determine a
            conclusion about intelligence, and the gap is philosophical. The
            same external behavior can support competing explanations
            (memorization v.s. abstraction, poor heuristics v.s. robust
            competence). Finding out "it works" can support theories, but never
            uniquely determine one.
          </p>
          <Subtitle>What Integrating Philosophy Actually Means</Subtitle>
          <p>
            When I emphasize the importance of philosophy, I do not necessitate
            a commitment to a worldview. Instead, it means to justify design
            choices <em>philosophically</em>.
          </p>
          <p>
            Make the bridge between behavior and capacity explicit. Why does
            performance mean a model "understands" or "reasons"? Don't get
            bitten by underdetermination. Separate engineering sufficiency from
            explanatory sufficiency.
          </p>
          <p>
            When benchmarking a model, don't simply report metrics. Argue the
            metric's construct validity for the target concept. Distinguish
            semantic success from behavioral success.
          </p>
          <p>
            Justify the authority of your system's objective. Why could this
            objective lead to an intelligent system? Why is the objective an
            appropriate proxy for higher level capacity?
          </p>
          <Subtitle>What to Take from the Manifesto</Subtitle>
          <p>
            When we build systems that we aim to be intelligent, we make
            philosophical commitments about what intelligence is. We must
            approach this engineering with epistemic humility, and justify this
            engineering philosophically–all so we can discuss openly, design
            clearly, and progress further.
          </p>
        </>
      ),
    },
  ],
};
