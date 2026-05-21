import Sidebar from "./Sidebar";

interface PageLayoutProps {
  currentPath: string;
  children: React.ReactNode;
}

export default function PageLayout({ currentPath, children }: PageLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar currentPath={currentPath} />
      <main className="min-w-0 flex-1 w-full">{children}</main>
    </div>
  );
}
