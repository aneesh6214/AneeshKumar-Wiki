import Link from "next/link";

interface AdminArticleHeaderProps {
  title: string;
  subtitle?: string;
  activeTab?: "dashboard" | "ama" | "raw" | "live";
}

const tabs = [
  { key: "dashboard", label: "Dashboard", href: "/admin" },
  { key: "ama", label: "AMA", href: "/admin/ama" },
  { key: "raw", label: "Raw data", href: "/admin/raw" },
  { key: "live", label: "Live", href: "/admin/live" },
] as const;

export default function AdminArticleHeader({
  title,
  subtitle = "From the administrator's observatory",
  activeTab = "dashboard",
}: AdminArticleHeaderProps) {
  return (
    <div className="px-4 sm:px-6 pt-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl sm:text-3xl font-serif text-black">{title}</h1>
        <div className="flex items-center gap-2 text-sm">
          <button className="text-blue-600 hover:underline hidden sm:inline">
            watch
          </button>
          <span className="text-gray-300">·</span>
          <button className="text-blue-600 hover:underline hidden sm:inline">
            history
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4 italic">{subtitle}</div>

      <div className="flex items-center gap-6 border-b border-gray-300 text-sm">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={t.href}
            className={
              t.key === activeTab
                ? "pb-2 border-b-2 border-black font-medium text-black"
                : "pb-2 text-blue-600 hover:underline"
            }
          >
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
