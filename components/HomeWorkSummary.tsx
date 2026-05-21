import Link from "next/link";
import { Coming_Soon } from "next/font/google";
import { Minus, X } from "lucide-react";

const comingSoon = Coming_Soon({
  subsets: ["latin"],
  weight: "400",
});

const artifactShellClassName =
  "flex h-full min-h-[13rem] flex-col border border-gray-300 bg-white text-sm";
const artifactHeaderClassName =
  "flex h-9 items-center justify-between gap-2 border-b border-gray-300 bg-gray-100 px-3";

function SeeAlsoLinks({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="flex min-h-9 items-center border-t border-gray-200 px-2 py-1.5 text-xs leading-relaxed">
      <span className="mr-1 font-semibold text-gray-900">See also:</span>
      {links.map((link, index) => (
        <span key={link.href}>
          {index > 0 && <span className="text-gray-500"> · </span>}
          <Link href={link.href} className="text-blue-600 hover:underline">
            {link.label}
          </Link>
        </span>
      ))}
    </div>
  );
}

function ArtifactShell({
  children,
  title,
  titleMeta,
  titleVariant = "default",
}: {
  children: React.ReactNode;
  title: string;
  titleMeta?: string;
  titleVariant?: "default" | "terminal" | "paper" | "notebook";
}) {
  if (titleVariant === "terminal") {
    return (
      <section className={artifactShellClassName}>
        <div className={artifactHeaderClassName}>
          <h3 className="font-mono text-[12px] font-semibold text-gray-900">
            {title}
          </h3>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="grid size-4 place-items-center border border-gray-400 bg-white text-gray-700">
              <Minus size={10} strokeWidth={2} />
            </span>
            <span className="grid size-4 place-items-center border border-gray-400 bg-white text-gray-700">
              <X size={10} strokeWidth={2} />
            </span>
          </div>
        </div>
        {children}
      </section>
    );
  }

  if (titleVariant === "paper") {
    return (
      <section className={artifactShellClassName}>
        <div className={artifactHeaderClassName}>
          <h3 className="font-serif text-base font-semibold leading-none text-gray-900">
            {title}
          </h3>
          {titleMeta && (
            <span className="shrink-0 font-mono text-[10px] leading-none text-gray-500">
              {titleMeta}
            </span>
          )}
        </div>
        {children}
      </section>
    );
  }

  if (titleVariant === "notebook") {
    return (
      <section className={`${artifactShellClassName} overflow-hidden`}>
        <div className={artifactHeaderClassName}>
          <h3 className="font-serif text-base font-semibold leading-none text-gray-900">
            {title}
          </h3>
          <span
            className="grid shrink-0 grid-cols-3 gap-1"
            aria-hidden="true"
          >
            <span className="size-1.5 rounded-full border border-gray-400 bg-white" />
            <span className="size-1.5 rounded-full border border-gray-400 bg-white" />
            <span className="size-1.5 rounded-full border border-gray-400 bg-white" />
          </span>
        </div>
        {children}
      </section>
    );
  }

  return (
    <section className={artifactShellClassName}>
      <h3
        className={`${artifactHeaderClassName} text-center text-sm font-bold text-gray-900`}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function EngineeringBox() {
  const commands = [
    {
      command: "focus",
      flag: "--current",
      output: "platform systems, APIs, reliability",
    },
    {
      command: "build",
      flag: "--mode practical",
      output: "full-stack products and technical tools",
    },
  ];

  return (
    <ArtifactShell title="~/aneesh/engineering" titleVariant="terminal">
      <div className="flex-1 font-mono text-[12px] leading-relaxed text-gray-800">
        <div className="space-y-2 px-2 py-2.5">
          {commands.map((item) => (
            <div key={item.command}>
              <div>
                <span className="text-gray-500">$ </span>
                <span className="font-semibold text-blue-700">
                  {item.command}
                </span>{" "}
                <span className="text-purple-700">{item.flag}</span>
              </div>
              <div className="pl-3 text-gray-700">
                <span className="text-emerald-700">=&gt; </span>
                {item.output}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SeeAlsoLinks
        links={[
          { href: "/professional-work", label: "Professional Work" },
        ]}
      />
    </ArtifactShell>
  );
}

function ResearchBox() {
  return (
    <ArtifactShell
      title="Research"
      titleMeta="doi:10.6214/ak-research"
      titleVariant="paper"
    >
      <div className="flex flex-1 px-2.5 pb-1.5 pt-3 font-serif">
        <div className="flex min-h-0 w-full flex-1 flex-col">
          <h4 className="mb-1.5 text-center text-xs font-bold text-gray-900">
            Abstract
          </h4>
          <p className="text-justify text-[12.25px] leading-[1.45] indent-5 text-gray-800">
            I study model behavior, emergence, memory, and interpretability in
            systems where structure is learned rather than specified. My work
            looks for useful explanations inside messy representations.
          </p>
          <p className="mt-auto border-t border-gray-300 pt-1 font-serif text-[10.5px] leading-snug text-gray-700">
            <sup className="mr-1 text-[9px] leading-none">1</sup>
            <span className="font-bold">Keywords.</span> Sparse features;
            memory; emergence.
          </p>
        </div>
      </div>
      <SeeAlsoLinks
        links={[
          { href: "/professional-work", label: "Publications" },
        ]}
      />
    </ArtifactShell>
  );
}

function EducationBox() {
  return (
    <ArtifactShell title="Education" titleVariant="notebook">
      <div
        className="relative flex-1"
        style={
          {
            "--notebook-line": "1.45rem",
            backgroundImage:
              "repeating-linear-gradient(to bottom, #ffffff 0, #ffffff calc(var(--notebook-line) - 1px), #eaecf0 calc(var(--notebook-line) - 1px), #eaecf0 var(--notebook-line))",
          } as React.CSSProperties
        }
      >
        <div
          className="absolute bottom-0 left-8 top-0 border-l border-red-200"
          aria-hidden="true"
        />
        <p
          className={`relative pl-11 pr-3 pt-[0.3rem] text-[13px] leading-[var(--notebook-line)] text-gray-800 ${comingSoon.className}`}
        >
          AI lectures, architecture explainers, student-facing notes, and
          practical teaching around machine learning systems. I like turning
          technical ideas into material that feels approachable without losing
          the details.
        </p>
      </div>
      <SeeAlsoLinks
        links={[
          { href: "/media", label: "Media" },
        ]}
      />
    </ArtifactShell>
  );
}

export default function HomeWorkSummary() {
  return (
    <aside className="my-4 grid gap-3 md:grid-cols-3">
      <ResearchBox />
      <EngineeringBox />
      <EducationBox />
    </aside>
  );
}
