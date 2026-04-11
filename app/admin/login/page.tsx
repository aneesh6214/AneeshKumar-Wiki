import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col md:flex-row">
      <main className="flex-1 w-full">
        <div className="px-4 sm:px-6 pt-4 max-w-3xl">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl sm:text-3xl font-serif text-black">
              Log in
            </h1>
          </div>
          <div className="text-sm text-gray-600 mb-4 italic">
            From the administrator&apos;s observatory
          </div>

          <div className="flex items-center gap-6 border-b border-gray-300 text-sm mb-6">
            <span className="pb-2 border-b-2 border-black font-medium">
              Log in
            </span>
            <Link
              href="/"
              className="pb-2 text-blue-600 hover:underline"
            >
              Return to site
            </Link>
          </div>

          <div className="text-sm italic text-gray-600 mb-6 pl-6 border-l-2 border-[#eaecf0]">
            This page is restricted to the site administrator. For the public
            Wikipedia article, see{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            .
          </div>

          <p className="leading-7 mb-6">
            Enter the administrator password to view the observability
            dashboard for <strong>aneeshkumar.com</strong>. Authentication is
            handled by a signed session cookie with a one-hour sliding expiry.
            No username is required.
          </p>

          {/* Fake edit-conflict-style error box, hidden by default */}
          {false && (
            <div className="border border-[#b32424] bg-[#fee7e6] text-[#b32424] px-4 py-3 mb-4 text-sm">
              <strong>Incorrect password.</strong> Please try again.
            </div>
          )}

          <form
            action="#"
            method="post"
            className="border border-[#a2a9b1] bg-[#f8f9fa] p-6 max-w-md"
          >
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-[#202122] mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-3 py-1.5 border border-[#a2a9b1] rounded-none bg-white text-sm focus:outline-none focus:border-[#3366cc]"
                autoFocus
              />
              <p className="text-xs text-gray-600 mt-1">
                Set via the{" "}
                <code className="bg-white px-1 border border-[#eaecf0] text-xs">
                  ADMIN_PASSWORD
                </code>{" "}
                environment variable.
              </p>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="border border-[#a2a9b1]" />
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

          <div className="mt-8 text-sm text-gray-600 border-t border-[#eaecf0] pt-4">
            <p className="italic leading-6">
              This page was last edited on April 11, 2026, at 14:02 (UTC).{" "}
              <a href="#" className="text-blue-600 hover:underline not-italic">
                view source
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
