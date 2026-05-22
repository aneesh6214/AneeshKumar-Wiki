import AdminSidebar from "./AdminSidebar";
import type { AdminTabKey } from "@/content/admin";

interface AdminPageLayoutProps {
  currentWindow?: string;
  activePath?: AdminTabKey;
  children: React.ReactNode;
}

export default function AdminPageLayout({
  currentWindow,
  activePath,
  children,
}: AdminPageLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar currentWindow={currentWindow} activePath={activePath} />
      <main className="flex-1 w-full md:w-4/5">{children}</main>
    </div>
  );
}
