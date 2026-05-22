import Link from "next/link";
import {
  adminContent,
  type AdminTabItem,
  type AdminTabKey,
} from "@/content/admin";
import { adminLinkClass } from "./AdminPrimitives";

interface AdminArticleHeaderProps {
  title: string;
  subtitle?: string;
  activeTab?: AdminTabKey;
  tabs?: readonly AdminTabItem[];
}

export default function AdminArticleHeader({
  title,
  subtitle = adminContent.sourceLine,
  activeTab = "dashboard",
  tabs = adminContent.tabs,
}: AdminArticleHeaderProps) {
  return (
    <div className="px-4 sm:px-6 pt-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl sm:text-3xl font-serif text-black">{title}</h1>
        <div className="flex items-center gap-2 text-sm">
          <button className={`${adminLinkClass} hidden sm:inline`}>
            watch
          </button>
          <span className="text-gray-300">·</span>
          <button className={`${adminLinkClass} hidden sm:inline`}>
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
                : `pb-2 ${adminLinkClass}`
            }
          >
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
