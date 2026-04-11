import AdminSidebar from "./AdminSidebar";

interface AdminPageLayoutProps {
  currentWindow?: string;
  children: React.ReactNode;
}

export default function AdminPageLayout({
  currentWindow,
  children,
}: AdminPageLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar currentWindow={currentWindow} />
      <main className="flex-1 w-full md:w-4/5">{children}</main>
    </div>
  );
}
