import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";
import {
  AdminArticleBody,
  AdminLeadNote,
  AdminPanel,
  AdminPanelHeader,
  AdminStatusDot,
  adminLinkClass,
} from "@/components/admin/AdminPrimitives";
import { adminContent } from "@/content/admin";
import {
  createWikiBannerArticle,
  getAdminWikiBannerArticles,
  getTodayWikiBannerArticle,
  removeWikiBannerArticle,
  setTodayWikiBannerArticle,
} from "@/lib/wiki-banner/queries";

export const dynamic = "force-dynamic";

interface AdminBannerPageProps {
  searchParams: Promise<{
    added?: string;
    duplicate?: string;
    error?: string;
    removed?: string;
    restored?: string;
    set?: string;
  }>;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "America/Los_Angeles",
  year: "numeric",
});

function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

function statusMessage(params: Awaited<AdminBannerPageProps["searchParams"]>) {
  if (params.added === "1") {
    return <span className="font-medium text-[#14866d]">Article added.</span>;
  }

  if (params.duplicate === "1") {
    return (
      <span className="font-medium text-[#b37d00]">
        Article already exists.
      </span>
    );
  }

  if (params.restored === "1") {
    return <span className="font-medium text-[#14866d]">Article restored.</span>;
  }

  if (params.set === "1") {
    return (
      <span className="font-medium text-[#14866d]">
        Article set for today.
      </span>
    );
  }

  if (params.removed === "1") {
    return <span className="font-medium text-[#14866d]">Article removed.</span>;
  }

  if (params.error === "invalid") {
    return (
      <span className="font-medium text-[#b32424]">
        Enter a valid en.wikipedia.org article URL.
      </span>
    );
  }

  return null;
}

async function addBannerArticle(formData: FormData) {
  "use server";

  const url = String(formData.get("url") ?? "").trim();
  if (!url) {
    redirect("/admin/banner?error=invalid");
  }

  let result: Awaited<ReturnType<typeof createWikiBannerArticle>>;
  try {
    result = await createWikiBannerArticle(url);
  } catch {
    redirect("/admin/banner?error=invalid");
  }

  revalidatePath("/admin/banner");
  revalidatePath("/");

  if (result.status === "duplicate") {
    redirect("/admin/banner?duplicate=1");
  }

  if (result.status === "restored") {
    redirect("/admin/banner?restored=1");
  }

  redirect("/admin/banner?added=1");
}

async function setBannerArticleForToday(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    redirect("/admin/banner?error=invalid");
  }

  await setTodayWikiBannerArticle(id);
  revalidatePath("/admin/banner");
  revalidatePath("/");
  revalidatePath("/api/wiki-banner");
  redirect("/admin/banner?set=1");
}

async function removeBannerArticle(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    redirect("/admin/banner?error=invalid");
  }

  await removeWikiBannerArticle(id);
  revalidatePath("/admin/banner");
  revalidatePath("/");
  revalidatePath("/api/wiki-banner");
  redirect("/admin/banner?removed=1");
}

export default async function AdminBannerPage({
  searchParams,
}: AdminBannerPageProps) {
  const params = await searchParams;
  const articles = await getAdminWikiBannerArticles();
  const currentArticle = await getTodayWikiBannerArticle();
  const message = statusMessage(params);

  return (
    <AdminPageLayout currentWindow="" activePath="banner">
      <AdminArticleHeader
        title={adminContent.articleTitle}
        subtitle="Curated Wikipedia banner articles"
        activeTab="banner"
      />

      <AdminArticleBody>
        <AdminLeadNote>{adminContent.notes.banner}</AdminLeadNote>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
          <span>
            <strong>{articles.length}</strong> curated articles
          </span>
          {message && (
            <>
              <AdminStatusDot />
              {message}
            </>
          )}
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <section className="min-w-0">
            <h2 className="border-b border-gray-300 pb-1 font-serif text-xl font-medium">
              Articles
            </h2>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse border border-[#a2a9b1] bg-white text-left text-sm">
                <thead>
                  <tr className="bg-[#eaecf0]">
                    <th className="border border-[#a2a9b1] px-3 py-1.5 font-semibold">
                      Added
                    </th>
                    <th className="border border-[#a2a9b1] px-3 py-1.5 font-semibold">
                      Article
                    </th>
                    <th className="border border-[#a2a9b1] px-3 py-1.5 font-semibold">
                      Status
                    </th>
                    <th className="border border-[#a2a9b1] px-3 py-1.5 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {articles.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="border border-[#a2a9b1] px-3 py-5 text-center italic text-gray-600"
                      >
                        No banner articles have been added yet.
                      </td>
                    </tr>
                  ) : (
                    articles.map((article) => {
                      const isCurrent = article.id === currentArticle?.id;
                      return (
                        <tr key={article.id} className="hover:bg-[#f8f9fa]">
                          <td className="w-32 border border-[#a2a9b1] px-3 py-2 text-xs text-gray-600">
                            {formatDate(article.createdAt)}
                          </td>
                          <td className="border border-[#a2a9b1] px-3 py-2 leading-6">
                            <Link
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={adminLinkClass}
                            >
                              {article.articleTitle.replace(/_/g, " ")}
                            </Link>
                            <div className="break-all font-mono text-[11px] leading-5 text-gray-500">
                              {article.url}
                            </div>
                          </td>
                          <td className="w-28 border border-[#a2a9b1] px-3 py-2 text-xs font-medium">
                            <span
                              className={
                                isCurrent ? "text-[#3366cc]" : "text-[#14866d]"
                              }
                            >
                              {isCurrent ? "Today" : "Listed"}
                            </span>
                          </td>
                          <td className="w-44 border border-[#a2a9b1] px-3 py-2">
                            <div className="flex flex-wrap gap-2">
                              <form action={setBannerArticleForToday}>
                                <input
                                  type="hidden"
                                  name="id"
                                  value={article.id}
                                />
                                <button
                                  type="submit"
                                  disabled={isCurrent}
                                  className="text-xs text-[#3366cc] hover:underline disabled:text-gray-500 disabled:hover:no-underline"
                                >
                                  Set today
                                </button>
                              </form>
                              <form action={removeBannerArticle}>
                                <input
                                  type="hidden"
                                  name="id"
                                  value={article.id}
                                />
                                <button
                                  type="submit"
                                  className="text-xs text-[#b32424] hover:underline"
                                >
                                  Remove
                                </button>
                              </form>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <AdminPanel className="min-w-0">
            <AdminPanelHeader>Add article</AdminPanelHeader>
            <form action={addBannerArticle} className="space-y-3 p-3">
              <label
                htmlFor="url"
                className="block text-xs font-semibold uppercase tracking-wide text-gray-600"
              >
                Wikipedia URL
              </label>
              <input
                id="url"
                name="url"
                type="url"
                required
                placeholder="https://en.wikipedia.org/wiki/Mind"
                className="w-full border border-[#a2a9b1] bg-white px-3 py-2 text-sm text-[#202122] outline-none focus:border-[#3366cc] focus:ring-1 focus:ring-[#3366cc]"
              />
              <button
                type="submit"
                className="border border-[#a2a9b1] bg-[#eaecf0] px-3 py-1.5 text-sm font-medium hover:bg-[#dce1e5]"
              >
                Add to banner set
              </button>
              <p className="text-xs italic leading-5 text-gray-600">
                Duplicate articles are ignored by normalized Wikipedia title.
              </p>
            </form>
          </AdminPanel>
        </div>
      </AdminArticleBody>
    </AdminPageLayout>
  );
}
