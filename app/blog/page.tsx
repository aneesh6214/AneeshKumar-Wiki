import { redirect } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import ArticleHeader from "@/components/ArticleHeader";
import { WikiInfobox } from "@/components/WikiContent";
import { aneeshKumarInfobox } from "@/content/profile-infobox";
import {
  createAmaQuestion,
  getAnsweredAmaQuestions,
  type AmaQuestion,
} from "@/lib/ama/queries";

export const dynamic = "force-dynamic";

interface AskMeAnythingPageProps {
  searchParams: Promise<{ error?: string; submitted?: string }>;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Los_Angeles",
});

function formatDate(value: string | null): string {
  if (!value) return "";
  return dateFormatter.format(new Date(value));
}

async function submitQuestion(formData: FormData) {
  "use server";

  const question = String(formData.get("question") ?? "").trim();
  if (question.length === 0) {
    redirect("/blog?error=empty");
  }
  if (question.length > 1000) {
    redirect("/blog?error=too-long");
  }

  try {
    await createAmaQuestion(question);
  } catch (error) {
    console.error("Failed to submit AMA question", error);
    redirect("/blog?error=unavailable");
  }

  redirect("/blog?submitted=1");
}

function QuestionList({
  questions,
  unavailable,
}: {
  questions: AmaQuestion[];
  unavailable: boolean;
}) {
  if (unavailable) {
    return (
      <div className="border-y border-[#a2a9b1] px-3 py-5 text-center text-sm italic text-gray-600">
          The answered question archive is temporarily unavailable.
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="border-y border-[#a2a9b1] px-3 py-5 text-center text-sm italic text-gray-600">
          No answered questions have been published yet.
      </div>
    );
  }

  return (
    <div className="border-y border-[#a2a9b1]">
      {questions.map((item) => (
        <article
          key={item.id}
          className="grid gap-3 border-b border-[#eaecf0] px-3 py-3 last:border-b-0 hover:bg-[#f8f9fa] sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]"
        >
          <div>
            <h3 className="font-serif text-base font-medium leading-6 text-[#202122]">
              {item.question}
            </h3>
            <p className="mt-1 text-xs italic text-gray-600">
              Asked {formatDate(item.askedAt)}
            </p>
          </div>

          <div className="text-sm leading-6 text-[#202122]">
            <p>{item.answer}</p>
            {item.answeredAt && (
              <p className="mt-2 text-xs italic text-gray-600">
                Answered {formatDate(item.answeredAt)}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function AskMeAnythingPage({
  searchParams,
}: AskMeAnythingPageProps) {
  const params = await searchParams;
  let questions: AmaQuestion[] = [];
  let questionsUnavailable = false;

  try {
    questions = await getAnsweredAmaQuestions();
  } catch (error) {
    questionsUnavailable = true;
    console.error("Failed to load AMA questions", error);
  }

  return (
    <PageLayout currentPath="/blog">
      <ArticleHeader title="Ask Me Anything" />

      <div className="flex flex-col gap-6 px-4 pt-3 sm:px-6 lg:flex-row">
        <div className="min-w-0 flex-1">
          <form
            action={submitQuestion}
            className="mt-1"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="question" className="sr-only">
                Question
              </label>
              <input
                id="question"
                name="question"
                type="text"
                maxLength={1000}
                required
                placeholder="Ask a question"
                className="min-w-0 flex-1 border border-[#a2a9b1] bg-white px-3 py-2 text-sm text-[#202122] outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
              />
              <button
                type="submit"
                className="border border-[#3366cc] bg-[#3366cc] px-3 py-2 text-sm font-medium text-white hover:bg-[#254fa3]"
              >
                Ask a question
              </button>
            </div>
            <p className="mt-2 text-xs italic text-gray-600">
              Questions are submitted anonymously. Only questions that receive a
              response are published here.
            </p>
            {params.submitted === "1" && (
              <p className="mt-2 text-xs font-medium text-[#14866d]">
                Question submitted.
              </p>
            )}
            {params.error === "empty" && (
              <p className="mt-2 text-xs font-medium text-[#b32424]">
                Please enter a question before submitting.
              </p>
            )}
            {params.error === "too-long" && (
              <p className="mt-2 text-xs font-medium text-[#b32424]">
                Please keep the question under 1000 characters.
              </p>
            )}
            {params.error === "unavailable" && (
              <p className="mt-2 text-xs font-medium text-[#b32424]">
                Question submission is temporarily unavailable.
              </p>
            )}
          </form>

          <section className="mt-6">
            <h2 className="border-b border-gray-300 pb-1 font-serif text-xl font-medium text-[#202122]">
              Answered Questions
            </h2>
            <div className="mt-3">
              <QuestionList
                questions={questions}
                unavailable={questionsUnavailable}
              />
            </div>
          </section>
        </div>

        <aside className="lg:w-80 lg:flex-shrink-0">
          <WikiInfobox infobox={aneeshKumarInfobox} title="Aneesh Kumar" />
        </aside>
      </div>
    </PageLayout>
  );
}
