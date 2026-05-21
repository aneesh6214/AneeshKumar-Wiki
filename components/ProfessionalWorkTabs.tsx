import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import LanguageSelector from "./LanguageSelector";

interface ProfessionalWorkTabsProps {
  employment: ReactNode;
  sidePanel: ReactNode;
  title: string;
}

const publication = {
  title: "Exploring Sparse Feature Topology as a Predictor for Emergence",
  venue: "AAAI XAI4Science Workshop",
  year: "2025",
  url: "https://openreview.net/forum?id=12xpM8a6YK&noteId=12xpM8a6YK",
  topics: ["Sparse Autoencoders", "Transformers", "Mechanistic Interpretability"],
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ProfessionalHeader({ title }: { title: string }) {
  return (
    <div className="px-4 pt-4 sm:px-6">
      <div className="mb-2 flex items-start justify-between gap-4">
        <h1 className="min-w-0 font-serif text-2xl text-black sm:text-3xl">
          {title}
        </h1>
        <LanguageSelector />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        From Kumarpedia, the free encyclopedia
      </div>

      <div className="flex items-center gap-6 border-b border-gray-300">
        <button className="border-b-2 border-black pb-2 font-medium">
          Article
        </button>
      </div>
    </div>
  );
}

function WikiSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="mb-6 last:mb-0">
      <h2
        id={slugify(title)}
        className="mb-2 border-b border-gray-300 pb-1 font-serif text-xl font-medium text-black"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function TopicTags() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {publication.topics.map((topic) => (
        <span
          key={topic}
          className="inline-flex min-h-6 items-center border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-700"
        >
          {topic}
        </span>
      ))}
    </div>
  );
}

function PublicationsCatalogue() {
  return (
    <section className="overflow-x-auto py-4">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr className="border-y border-gray-300 bg-gray-100 text-left">
            <th className="px-2 py-2 font-semibold">Year</th>
            <th className="px-2 py-2 font-semibold">Publication</th>
            <th className="px-2 py-2 font-semibold">Venue</th>
            <th className="px-2 py-2 font-semibold">Topics</th>
            <th className="px-2 py-2 font-semibold">URL</th>
          </tr>
        </thead>
        <tbody>
          <tr
            id={slugify(publication.title)}
            className="border-b border-gray-200 align-top"
          >
            <td className="px-2 py-2 text-gray-700">{publication.year}</td>
            <td className="px-2 py-2">
              <div className="font-semibold text-blue-700">
                {publication.title}
              </div>
            </td>
            <td className="px-2 py-2 text-gray-700">{publication.venue}</td>
            <td className="px-2 py-2">
              <TopicTags />
            </td>
            <td className="px-2 py-2">
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
              >
                <span>View</span>
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default function ProfessionalWorkTabs({
  employment,
  sidePanel,
  title,
}: ProfessionalWorkTabsProps) {
  return (
    <>
      <ProfessionalHeader title={title} />
      <div className="flex flex-col gap-6 px-4 pt-3 sm:px-6 lg:flex-row">
        <div className="min-w-0 flex-1">
          <p className="mb-3 text-xs italic text-gray-600">
            This article covers the professional work of{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Aneesh Kumar
            </Link>
            . For his personal projects, see{" "}
            <Link href="/independent-work" className="text-blue-600 hover:underline">
              Aneesh Kumar (Independent Work)
            </Link>
            .
          </p>

          <WikiSection title="Employment">{employment}</WikiSection>
          <WikiSection title="Publications">
            <PublicationsCatalogue />
          </WikiSection>
        </div>
        {sidePanel}
      </div>
    </>
  );
}
