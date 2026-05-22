import Link from "next/link";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";
import {
  AdminLeadNote,
  adminLinkClass,
} from "@/components/admin/AdminPrimitives";
import { adminContent } from "@/content/admin";

interface Props {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error, next } = await searchParams;
  const hasError = error === "1";

  return (
    <div className="flex flex-col md:flex-row">
      <main className="flex-1 w-full">
        <div className="max-w-3xl">
          <AdminArticleHeader
            title="Log in"
            activeTab="login"
            tabs={adminContent.loginTabs}
          />

          <div className="px-4 py-4 sm:px-6">
            <AdminLeadNote>
              {adminContent.notes.login}{" "}
              <Link
                href={adminContent.publicArticleHref}
                className={adminLinkClass}
              >
                {adminContent.publicArticleLabel}
              </Link>
              .
            </AdminLeadNote>

            {hasError && (
              <div className="border border-[#b32424] bg-[#fee7e6] text-[#b32424] px-4 py-3 mb-4 text-sm">
                <strong>Incorrect password.</strong> Please try again.
              </div>
            )}

            <form
              action="/api/admin/login"
              method="post"
              className="border border-[#a2a9b1] bg-[#f8f9fa] p-6 max-w-md"
            >
              {next && <input type="hidden" name="next" value={next} />}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-bold text-[#202122] mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-3 py-1.5 border border-[#a2a9b1] rounded-none bg-white text-sm focus:outline-none focus:border-[#3366cc]"
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="keep_me_logged_in" className="border border-[#a2a9b1]" />
                  <span>Keep me logged in for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#3366cc] text-white px-4 py-2 border border-[#2a4b8d] hover:bg-[#2a4b8d] text-sm font-medium"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
