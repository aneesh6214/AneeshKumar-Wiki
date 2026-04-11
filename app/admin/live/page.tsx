import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminArticleHeader from "@/components/admin/AdminArticleHeader";

const liveVisitors = [
  { vid: "a3f2...b91", country: "United States", path: "/blog/manifesto", since: "0:43", device: "desktop" },
  { vid: "8d17...c42", country: "United States", path: "/research", since: "1:12", device: "desktop" },
  { vid: "7b2d...e55", country: "United Kingdom", path: "/projects", since: "0:18", device: "desktop" },
  { vid: "f91a...2cd", country: "Canada", path: "/", since: "2:04", device: "mobile" },
  { vid: "3c8e...190", country: "Germany", path: "/blog", since: "3:27", device: "desktop" },
  { vid: "b04d...7a3", country: "India", path: "/industry-work", since: "0:56", device: "mobile" },
];

export default function AdminLivePage() {
  return (
    <AdminPageLayout currentWindow="30d">
      <AdminArticleHeader title="aneeshkumar.com" activeTab="live" />

      <article className="px-4 sm:px-6 py-4 text-[#202122]">
        <div className="text-sm italic text-gray-600 mb-4 pl-6 border-l-2 border-[#eaecf0]">
          Live view. Visitors active in the last 5 minutes.
        </div>

        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-5xl font-serif text-[#202122]">
            {liveVisitors.length}
          </span>
          <span className="text-lg text-gray-600">
            visitors on site right now
          </span>
          <span className="ml-auto text-xs text-gray-500 italic">
            auto-refreshing every 10s
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="border-collapse border border-[#a2a9b1] bg-white text-sm w-full">
            <thead>
              <tr className="bg-[#eaecf0]">
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Visitor
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Country
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Current page
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-left font-bold">
                  Device
                </th>
                <th className="border border-[#a2a9b1] px-3 py-1.5 text-right font-bold">
                  On page for
                </th>
              </tr>
            </thead>
            <tbody>
              {liveVisitors.map((v) => (
                <tr key={v.vid} className="hover:bg-[#f8f9fa]">
                  <td className="border border-[#a2a9b1] px-3 py-1.5 font-mono text-xs text-gray-600">
                    {v.vid}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5">
                    {v.country}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5 font-mono text-xs">
                    {v.path}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5 italic text-gray-600">
                    {v.device}
                  </td>
                  <td className="border border-[#a2a9b1] px-3 py-1.5 text-right font-mono text-xs">
                    {v.since}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-600 italic mt-4">
          Visitor IDs are truncated for display. A visitor is considered
          &ldquo;active&rdquo; if their last recorded event is within the last
          5 minutes.
        </p>
      </article>
    </AdminPageLayout>
  );
}
